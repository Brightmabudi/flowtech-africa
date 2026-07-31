import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@backend/services/db'
import { requireAdmin } from '@backend/middleware/require-auth'
import { VALID_STATUSES } from '@backend/services/application-types'
import type { ApplicationListPayload } from '@backend/services/application-types'

// ── GET /api/dashboard/applications ──────────────────────────────────────────
// Admin only. Filters: ?vacancyId=, ?status=, ?from=&to= (ISO dates), ?q= (name/email search)

export async function GET(req: NextRequest) {
  const authCheck = requireAdmin()
  if (authCheck instanceof NextResponse) return authCheck

  try {
    const { searchParams } = new URL(req.url)
    const vacancyIdParam = searchParams.get('vacancyId')
    const statusParam    = searchParams.get('status')
    const fromParam      = searchParams.get('from')
    const toParam        = searchParams.get('to')
    const q              = searchParams.get('q')?.trim()

    const where: Prisma.JobApplicationWhereInput = {}

    if (vacancyIdParam) {
      const vacancyId = Number(vacancyIdParam)
      if (Number.isInteger(vacancyId) && vacancyId > 0) where.vacancyId = vacancyId
    }

    if (statusParam && (VALID_STATUSES as readonly string[]).includes(statusParam)) {
      where.status = statusParam
    }

    if (fromParam || toParam) {
      where.createdAt = {}
      if (fromParam) {
        const from = new Date(fromParam)
        if (!isNaN(from.getTime())) where.createdAt.gte = from
      }
      if (toParam) {
        const to = new Date(toParam)
        if (!isNaN(to.getTime())) where.createdAt.lte = to
      }
    }

    if (q) {
      where.OR = [
        { firstName: { contains: q, mode: 'insensitive' } },
        { lastName:  { contains: q, mode: 'insensitive' } },
        { email:     { contains: q, mode: 'insensitive' } },
      ]
    }

    const rows = await prisma.jobApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { vacancy: { select: { id: true, title: true } } },
    })

    const applications = rows.map((r) => ({
      id: r.id, vacancyId: r.vacancyId, firstName: r.firstName, lastName: r.lastName,
      email: r.email, phone: r.phone, location: r.location, coverLetter: r.coverLetter,
      cvUrl: r.cvUrl, status: r.status,
      createdAt: r.createdAt.toISOString(), updatedAt: r.updatedAt.toISOString(),
      vacancy: r.vacancy,
    }))

    const payload: ApplicationListPayload = { applications, total: applications.length }
    return NextResponse.json({ success: true, data: payload })
  } catch (error) {
    console.error('[dashboard/applications] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load applications.' }, { status: 500 })
  }
}
