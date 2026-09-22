/**
 * POST /api/consultation — receives the "Book a Consultation" form.
 *
 * Body (JSON): { name, phone, concern, website }   (`website` is a honeypot)
 *
 * Where the details go:
 *  - If CONSULTATION_WEBHOOK_URL is set, the details are POSTed there as JSON
 *    (works with Google Apps Script, Zapier, Make, Slack/Discord webhooks, a
 *    CRM endpoint, etc.).
 *  - If it is not set, they are only written to the server log — so set it
 *    before going live, or requests will not reach the clinic.
 */

import { allConcerns } from "@/lib/concerns"

const PHONE_RE = /^\+?\d{10,13}$/

type Body = {
  name?: unknown
  phone?: unknown
  concern?: unknown
  website?: unknown
}

const asText = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : ""

export async function POST(request: Request) {
  let body: Body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 })
  }

  // honeypot: bots fill every field. Pretend it worked, send nothing.
  if (asText(body.website, 200) !== "") {
    return Response.json({ ok: true })
  }

  const name = asText(body.name, 100)
  const phone = asText(body.phone, 20).replace(/[\s\-().]/g, "")
  const concern = asText(body.concern, 1000)

  if (name.length < 2 || !PHONE_RE.test(phone) || !allConcerns.includes(concern)) {
    return Response.json(
      { error: "Please check your name, phone number and concern." },
      { status: 400 }
    )
  }

  const lead = {
    name,
    phone,
    concern,
    source: "website",
    submittedAt: new Date().toISOString(),
  }

  const webhook = process.env.CONSULTATION_WEBHOOK_URL
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      })
      if (!res.ok) throw new Error(`webhook responded ${res.status}`)
    } catch (error) {
      console.error("[consultation] delivery failed", error)
      return Response.json(
        { error: "Could not send your request. Please try again." },
        { status: 502 }
      )
    }
  } else {
    console.log("[consultation] no CONSULTATION_WEBHOOK_URL set — lead:", lead)
  }

  return Response.json({ ok: true })
}
