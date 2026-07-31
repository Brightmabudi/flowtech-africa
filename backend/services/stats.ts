import { NextResponse } from 'next/server'
import { prisma } from '@backend/services/db'
import { requireAdmin } from '@backend/middleware/require-auth'

// ── GET /api/dashboard/stats ──────────────────────────────────────────────────
// Admin only. Summary counts for the dashboard's three KPI cards, sourced live
// from ContactEnquiry / JobVacancy / JobApplication — nothing hard-coded.

export async function GET() {
  const authCheck = requireAdmin()
  if (authCheck instanceof NextResponse) return authCheck

  try {
    const [enquiryGroups, vacancyGroups, applicationGroups] = await Promise.all([
      prisma.contactEnquiry.groupBy({ by: ['status'], _count: { id: true } }),
      prisma.jobVacancy.groupBy({ by: ['status'], _count: { id: true } }),
      prisma.jobApplication.groupBy({ by: ['status'], _count: { id: true } }),
    ])

    const enquiryCounts: Record<string, number> = {}
    for (const g of enquiryGroups) enquiryCounts[g.status] = g._count.id
    const enquiriesNew = enquiryCounts['NEW'] ?? 0

    const vacancyCounts: Record<string, number> = {}
    for (const g of vacancyGroups) vacancyCounts[g.status] = g._count.id

    const applicationCounts: Record<string, number> = {}
    for (const g of applicationGroups) applicationCounts[g.status] = g._count.id

    return NextResponse.json({
      success: true,
      data: {
        enquiries: {
          total:  Object.values(enquiryCounts).reduce((s, n) => s + n, 0),
          new:    enquiriesNew,
          unread: enquiriesNew, // no separate read/unread flag exists — NEW status is the "unread" signal
        },
        vacancies: {
          total:  Object.values(vacancyCounts).reduce((s, n) => s + n, 0),
          active: vacancyCounts['ACTIVE'] ?? 0,
          closed: vacancyCounts['CLOSED'] ?? 0,
        },
        applications: {
          total:       Object.values(applicationCounts).reduce((s, n) => s + n, 0),
          new:         applicationCounts['NEW'] ?? 0,
          shortlisted: applicationCounts['SHORTLISTED'] ?? 0,
        },
      },
    })
  } catch (error) {
    console.error('[dashboard/stats] query failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load dashboard statistics.' }, { status: 500 })
  }
}
