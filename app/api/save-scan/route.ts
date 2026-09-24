import { NextRequest, NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

const FORM_NAME = "hair-scan"
const SOURCE = "Hair Scan"

type ScanLead = {
  name: string
  phone: string
  location: string
  problem: string
  pageUrl: string
}

type TelecrmResult = {
  status: "created" | "failed" | "not_configured"
  leadIds: string | null
  error: string | null
}

function toText(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

// "excessive-shedding" -> "Excessive Shedding"
function toProblemLabel(problem: string) {
  return problem
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function normalizePhoneForTeleCRM(phone: string) {
  const digits = phone.replace(/\D/g, "")
  if (digits.length === 10) return `91${digits}`
  return digits
}

function extractLeadIds(data: unknown): string | null {
  if (!data || typeof data !== "object") return null
  const record = data as Record<string, unknown>

  for (const key of ["modifiedLeadIds", "leadIds"]) {
    const ids = record[key]
    if (Array.isArray(ids) && ids.length > 0) return ids.map(String).join(", ")
  }

  const direct = record.leadId || record.id || record.LeadID
  if (direct) return String(direct)

  if (record.data && typeof record.data === "object") {
    const nested = record.data as Record<string, unknown>
    const nestedId = nested.leadId || nested.id || nested.LeadID
    if (nestedId) return String(nestedId)
  }

  return null
}

function isTelecrmConfirmed(data: unknown) {
  if (!data || typeof data !== "object") return false
  if (extractLeadIds(data)) return true

  const record = data as Record<string, unknown>
  if (record.success === true) return true

  // TeleCRM replies { "result": "Accepted" } when it queues the lead.
  const result = String(record.result || "").toLowerCase()
  if (result === "accepted" || result === "success") return true

  const status = String(record.status || "").toLowerCase()
  return status === "created" || status === "updated" || status === "success" || status === "200"
}

async function pushToTeleCRM(lead: ScanLead): Promise<TelecrmResult> {
  const url = process.env.TELECRM_API_URL
  const key = process.env.TELECRM_API_KEY
  if (!url || !key) return { status: "not_configured", leadIds: null, error: null }

  const phone = normalizePhoneForTeleCRM(lead.phone)
  if (!phone) return { status: "failed", leadIds: null, error: "Invalid phone number" }

  const problemLabel = toProblemLabel(lead.problem)
  const details = [
    `Form Name: ${FORM_NAME}`,
    `Source: ${SOURCE}`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Location: ${lead.location}`,
    `Hair Concern: ${problemLabel}`,
    `URL: ${lead.pageUrl || "Not specified"}`,
  ].join(" | ")

  const payload = {
    fields: { phone, name: lead.name },
    actions: [
      { type: "SYSTEM_NOTE", text: `Details: ${details}` },
      { type: "SYSTEM_NOTE", text: `Form Name: ${FORM_NAME}` },
      { type: "SYSTEM_NOTE", text: `Source: ${SOURCE}` },
      { type: "SYSTEM_NOTE", text: `Name: ${lead.name}` },
      { type: "SYSTEM_NOTE", text: `Phone: ${lead.phone}` },
      { type: "SYSTEM_NOTE", text: `Location: ${lead.location}` },
      { type: "SYSTEM_NOTE", text: `Condition: ${problemLabel}` },
      { type: "SYSTEM_NOTE", text: `URL: ${lead.pageUrl || "Not specified"}` },
    ],
  }

  console.log("[TeleCRM][hair-scan] Sending payload:", JSON.stringify(payload))

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
        "X-Client-ID": "nextjs-website-integration",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (res.status === 204) {
      console.log("[TeleCRM][hair-scan] Response: 204 No Content (lead accepted)")
      return { status: "created", leadIds: null, error: null }
    }

    const text = await res.text()
    let data: unknown = null
    try {
      data = text.trim() ? JSON.parse(text) : null
    } catch {
      console.warn("[TeleCRM][hair-scan] Non-JSON response:", res.status, text.slice(0, 300))
      return { status: "failed", leadIds: null, error: `Non-JSON TeleCRM response (${res.status})` }
    }

    console.log("[TeleCRM][hair-scan] Response:", res.status, JSON.stringify(data))

    if (res.ok && isTelecrmConfirmed(data)) {
      return { status: "created", leadIds: extractLeadIds(data), error: null }
    }
    return {
      status: "failed",
      leadIds: null,
      error: `TeleCRM did not confirm lead (${res.status}): ${text.slice(0, 300)}`,
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn("[TeleCRM][hair-scan] Fetch failed:", message)
    return { status: "failed", leadIds: null, error: `TeleCRM fetch failed: ${message}` }
  } finally {
    clearTimeout(timeout)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const name = toText(body.name)
    const phone = toText(body.phone)
    const location = toText(body.location)
    const problem = toText(body.problem)
    const imageData = typeof body.imageData === "string" ? body.imageData : ""
    const pageUrl = toText(body.pageUrl)

    if (!name || !phone || !location || !problem) {
      return NextResponse.json({ error: "Name, phone, location, and problem are required" }, { status: 400 })
    }

    const scan = await prisma.scan.create({
      data: { name, phone, location, problem, imageData, pageUrl, formName: FORM_NAME },
    })

    // Lead is already saved; a TeleCRM failure is recorded on the scan but
    // must not block the user from reaching the thank-you page.
    const telecrm = await pushToTeleCRM({ name, phone, location, problem, pageUrl })
    try {
      await prisma.scan.update({
        where: { id: scan.id },
        data: {
          telecrmStatus: telecrm.status,
          telecrmLeadIds: telecrm.leadIds,
          telecrmError: telecrm.error,
        },
      })
    } catch (dbErr) {
      console.warn("TeleCRM status save skipped:", (dbErr as Error).message)
    }

    return NextResponse.json({ success: true, id: scan.id, telecrm: telecrm.status })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "This mobile number has already been used" },
        { status: 409 },
      )
    }

    console.error("Failed to save scan:", error)
    return NextResponse.json({ error: "Failed to save scan" }, { status: 500 })
  }
}
