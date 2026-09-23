import Image from "next/image"
import Link from "next/link"
import { DateRangePicker } from "@/component/ui/date-range-picker"
import type { Prisma, PrismaClient } from "@prisma/client"
import { concernGroups } from "@/lib/concerns"
import { cloudinaryImages } from "@/lib/cloudinary-images"

const GOLD = "#C99045"
const inputClass =
  "h-11 w-full rounded-xl border border-[#E8E0D2] bg-[#FBF8F3] px-4 text-sm text-[#1F1F1F] outline-none transition focus:border-[#C99045] focus:bg-white focus:ring-4 focus:ring-[#C99045]/20"

/**
 * Admin dashboard for "Book a Consultation" leads (component/consultation-form.tsx).
 * Separate from the hair-scan dashboard (component/hairscan/scan-dashboard.tsx) —
 * these leads share the same underlying Scan table but are tagged
 * formName: "dermasolution-leads" by app/api/submissions/route.ts, so the
 * query below only ever pulls consultation-form submissions.
 */

const CONSULTATION_FORM_NAME = "dermasolution-leads"

type DashboardSearchParams = Promise<{
  q?: string
  concern?: string
  dateFrom?: string
  dateTo?: string
  page?: string
}>

const pageSize = 100

const leadSelect = {
  id: true,
  name: true,
  phone: true,
  problem: true,
  pageUrl: true,
  telecrmStatus: true,
  telecrmLeadIds: true,
  telecrmError: true,
  createdAt: true,
} satisfies Prisma.ScanSelect

type Lead = Prisma.ScanGetPayload<{ select: typeof leadSelect }>

function parseDateBoundary(date: string, boundary: "start" | "end") {
  if (!date) return undefined

  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return undefined

  if (boundary === "start") {
    parsed.setHours(0, 0, 0, 0)
  } else {
    parsed.setHours(23, 59, 59, 999)
  }

  return parsed
}

function parsePage(page: string | undefined) {
  const parsed = Number(page)
  if (!Number.isInteger(parsed) || parsed < 1) return 1

  return parsed
}

function buildDashboardUrl(
  basePath: string,
  params: { q?: string; concern?: string; dateFrom?: string; dateTo?: string },
  page: number,
) {
  const searchParams = new URLSearchParams()

  if (params.q) searchParams.set("q", params.q)
  if (params.concern) searchParams.set("concern", params.concern)
  if (params.dateFrom) searchParams.set("dateFrom", params.dateFrom)
  if (params.dateTo) searchParams.set("dateTo", params.dateTo)
  if (page > 1) searchParams.set("page", String(page))

  const queryString = searchParams.toString()
  return queryString ? `${basePath}?${queryString}` : basePath
}

function getDatabaseErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error)

  if (message.toLowerCase().includes("data transfer quota")) {
    return "Neon has paused database reads because this project exceeded its data transfer quota. Upgrade the Neon plan or wait for the quota reset, then refresh this dashboard."
  }

  return "The dashboard could not load lead records right now. Please refresh in a moment."
}

function getCleanDisplayUrl(url: string) {
  if (!url) return ""
  try {
    const parsed = new URL(url)
    return `${parsed.origin}${parsed.pathname}`
  } catch {
    return url.split("?")[0]
  }
}

export async function ConsultationDashboard({
  searchParams,
  prismaClient,
  basePath,
  title,
}: {
  searchParams?: DashboardSearchParams
  prismaClient: PrismaClient
  basePath: string
  title: string
}) {
  const resolvedSearchParams = (await searchParams) ?? {}
  const query = resolvedSearchParams.q?.trim().toLowerCase() ?? ""
  const selectedConcern = resolvedSearchParams.concern ?? ""
  const selectedDateFrom = resolvedSearchParams.dateFrom ?? ""
  const selectedDateTo = resolvedSearchParams.dateTo ?? ""
  const currentPage = parsePage(resolvedSearchParams.page)

  const createdAt: Prisma.DateTimeFilter = {}
  const dateFrom = parseDateBoundary(selectedDateFrom, "start")
  const dateTo = parseDateBoundary(selectedDateTo, "end")

  if (dateFrom) createdAt.gte = dateFrom
  if (dateTo) createdAt.lte = dateTo

  const where: Prisma.ScanWhereInput = {
    formName: CONSULTATION_FORM_NAME,
    ...(selectedConcern ? { problem: selectedConcern } : {}),
    ...(dateFrom || dateTo ? { createdAt } : {}),
    ...(query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { phone: { contains: query, mode: "insensitive" } },
            { pageUrl: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
  }

  let leads: Lead[] = []
  let filteredCount = 0
  let totalCount = 0
  let databaseError = ""

  try {
    const [leadRows, matchingRows, allRows] = await Promise.all([
      prismaClient.scan.findMany({
        where,
        select: leadSelect,
        orderBy: { createdAt: "desc" },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      }),
      prismaClient.scan.count({ where }),
      prismaClient.scan.count({ where: { formName: CONSULTATION_FORM_NAME } }),
    ])

    leads = leadRows
    filteredCount = matchingRows
    totalCount = allRows
  } catch (error) {
    console.error("Failed to load consultation leads:", error)
    databaseError = getDatabaseErrorMessage(error)
  }

  const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize))
  const hasNewerPage = currentPage > 1
  const hasOlderPage = currentPage < totalPages
  const newerPageUrl = buildDashboardUrl(basePath, resolvedSearchParams, currentPage - 1)
  const olderPageUrl = buildDashboardUrl(basePath, resolvedSearchParams, currentPage + 1)

  return (
    <div className="min-h-screen bg-[#FBF8F3]">
      {/* header — logo + title, matching the site navbar */}
      <header className="sticky top-0 z-10 w-full border-b border-[#E8E0D2] bg-[#FBF8F3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/" aria-label="Dr. Sindhu's Derma Solutions — home" className="shrink-0">
            <Image
              src={cloudinaryImages.logo}
              alt="Dr. Sindhu's Derma Solutions — Medical & Aesthetic Dermatology"
              width={901}
              height={277}
              priority
              className="h-11 w-auto"
            />
          </Link>
          <div className="text-right">
            <h1 className="text-xl font-bold leading-tight text-[#1F1F1F] sm:text-2xl">{title}</h1>
            <p className="mt-0.5 text-sm text-[#5A5650]">
              {databaseError ? (
                "Database records are temporarily unavailable."
              ) : (
                <>
                  {filteredCount} filtered {filteredCount === 1 ? "record" : "records"}
                  {" "}from {totalCount} total
                  {filteredCount > 0 && (
                    <>. Page {currentPage} of {totalPages}.</>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-6 py-8">
        {databaseError && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {databaseError}
          </div>
        )}

        <form className="grid gap-4 rounded-[24px] border border-[#E8E0D2] bg-white p-6 shadow-[0_8px_30px_rgba(31,31,31,0.05)] md:grid-cols-4">
          <div>
            <label htmlFor="consult-dashboard-search" className="mb-2 block text-sm font-bold text-[#1F1F1F]">
              Search by name or phone
            </label>
            <input
              id="consult-dashboard-search"
              name="q"
              defaultValue={resolvedSearchParams.q ?? ""}
              placeholder="Search leads..."
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="consult-dashboard-concern" className="mb-2 block text-sm font-bold text-[#1F1F1F]">
              Concern
            </label>
            <select
              id="consult-dashboard-concern"
              name="concern"
              defaultValue={selectedConcern}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="">All concerns</option>
              {concernGroups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-[#1F1F1F]">
              Date range
            </label>
            <DateRangePicker
              defaultFrom={selectedDateFrom}
              defaultTo={selectedDateTo}
            />
          </div>

          <div className="flex flex-wrap items-end gap-3 md:col-span-4">
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#C99045] px-6 text-sm font-bold text-white transition hover:bg-[#B5802F]"
            >
              Apply Filters
            </button>
            <a
              href={basePath}
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#E8E0D2] px-6 text-sm font-bold text-[#1F1F1F] transition hover:bg-[#FBF8F3]"
            >
              Reset
            </a>
          </div>
        </form>

        {!databaseError && filteredCount > pageSize && (
          <nav className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-[#E8E0D2] bg-white p-4 text-sm shadow-[0_8px_30px_rgba(31,31,31,0.05)]">
            <p className="text-[#5A5650]">
              Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filteredCount)} of {filteredCount}
            </p>
            <div className="flex gap-3">
              {hasNewerPage ? (
                <a
                  href={newerPageUrl}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-[#E8E0D2] px-4 font-semibold text-[#1F1F1F] transition hover:bg-[#FBF8F3]"
                >
                  Newer
                </a>
              ) : (
                <span className="inline-flex h-10 items-center justify-center rounded-full border border-[#E8E0D2] px-4 font-semibold text-[#9A968F] opacity-60">
                  Newer
                </span>
              )}
              {hasOlderPage ? (
                <a
                  href={olderPageUrl}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-[#C99045] px-4 font-semibold text-white transition hover:bg-[#B5802F]"
                >
                  Older
                </a>
              ) : (
                <span className="inline-flex h-10 items-center justify-center rounded-full bg-[#F0EAE0] px-4 font-semibold text-[#9A968F] opacity-60">
                  Older
                </span>
              )}
            </div>
          </nav>
        )}

        {!databaseError && (
          leads.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-[24px] border border-dashed border-[#E8E0D2] bg-white/70 text-center text-sm text-[#5A5650]">
              No leads match the current filters.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-[24px] border border-[#E8E0D2] bg-white shadow-[0_8px_30px_rgba(31,31,31,0.05)]">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-[#E8E0D2] bg-[#FBF8F3] text-xs font-bold uppercase tracking-wide text-[#8A602B]">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Concern</th>
                    <th className="px-4 py-3">TeleCRM</th>
                    <th className="px-4 py-3">Page</th>
                    <th className="px-4 py-3">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-[#F0EAE0] last:border-0 hover:bg-[#FBF8F3]/60">
                      <td className="px-4 py-3 font-semibold text-[#1F1F1F]">{lead.name}</td>
                      <td className="px-4 py-3 text-[#5A5650]">{lead.phone}</td>
                      <td className="px-4 py-3 text-[#5A5650]">{lead.problem}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            lead.telecrmStatus.toLowerCase() === "created" ||
                            lead.telecrmStatus.toLowerCase() === "updated" ||
                            lead.telecrmStatus.toLowerCase() === "submitted"
                              ? "bg-emerald-500/15 text-emerald-600"
                              : "bg-red-500/10 text-red-600"
                          }`}
                        >
                          {lead.telecrmStatus || "pending"}
                        </span>
                        {lead.telecrmLeadIds && (
                          <p className="mt-1 text-xs text-[#5A5650]">CRM ID: {lead.telecrmLeadIds}</p>
                        )}
                        {lead.telecrmError && (
                          <p className="mt-1 text-xs text-red-600">{lead.telecrmError}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {lead.pageUrl && (
                          <a
                            href={lead.pageUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="break-all font-medium text-[#8A602B] hover:underline"
                          >
                            {getCleanDisplayUrl(lead.pageUrl)}
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[#5A5650]">
                        {new Date(lead.createdAt).toLocaleString(undefined, {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </main>
    </div>
  )
}
