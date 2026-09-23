import { ConsultationDashboard } from "@/component/consultation-dashboard"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"
export const revalidate = 0

type DashboardSearchParams = Promise<{
  q?: string
  concern?: string
  dateFrom?: string
  dateTo?: string
  page?: string
}>

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams?: DashboardSearchParams
}) {
  return (
    <ConsultationDashboard
      searchParams={searchParams}
      prismaClient={prisma}
      basePath="/admin-dashboard"
      title="Consultation Leads Dashboard"
    />
  )
}
