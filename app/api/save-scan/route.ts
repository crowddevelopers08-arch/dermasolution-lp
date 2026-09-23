import { NextRequest, NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

function toText(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
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
      data: { name, phone, location, problem, imageData, pageUrl, formName: "hair-scan" },
    })

    return NextResponse.json({ success: true, id: scan.id })
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
