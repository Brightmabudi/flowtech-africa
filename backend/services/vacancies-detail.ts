import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@backend/services/db'
import { requireAdmin } from '@backend/middleware/require-auth'
import { VALID_VACANCY_STATUSES } from '@backend/services/vacancy-types'

function toVacancyJson(row: {
  id: number; title: string; department: string; location: string; type: string
  description: string; requirements: string; contactEmail: string; isActive: boolean; status: string
  closingDate: Date | null; createdAt: Date; _count?: { applications: number }
}) {
  return {
    id: row.id, title: row.title, department: row.department, location: row.location,
    type: row.type, description: row.description,
    requirements: row.requirements.split('\n').map((r) => r.trim()).filter(Boolean),
    contactEmail: row.contactEmail, isActive: row.isActive, status: row.status,
    applicationCount: row._count?.applications,
    closingDate: row.closingDate ? row.closingDate.toISOString() : null,
    createdAt: row.createdAt.toISOString(),
  }
}

// ── GET /api/dashboard/vacancies/[id] ────────────────────────────────────────
// Admin only.

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const authCheck = requireAdmin()
  if (authCheck instanceof NextResponse) return authCheck

  const id = Number(params.id)
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ success: false, error: 'Invalid vacancy ID.' }, { status: 400 })
  }

  try {
    const vacancy = await prisma.jobVacancy.findUnique({
      where: { id },
      include: { _count: { select: { applications: true } } },
    })
    if (!vacancy) {
      return NextResponse.json({ success: false, error: 'Vacancy not found.' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: toVacancyJson(vacancy) })
  } catch (error) {
    console.error('[dashboard/vacancies/[id]] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load vacancy.' }, { status: 500 })
  }
}

// ── PATCH /api/dashboard/vacancies/[id] ──────────────────────────────────────
// Admin only. Status updates only. Keeps `isActive` in sync so the public
// careers listing and the apply-flow's active-vacancy check stay correct.

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const authCheck = requireAdmin()
  if (authCheck instanceof NextResponse) return authCheck

  const id = Number(params.id)
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ success: false, error: 'Invalid vacancy ID.' }, { status: 400 })
  }

  let body: { status?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const status = body.status
  if (!status || !(VALID_VACANCY_STATUSES as readonly string[]).includes(status)) {
    return NextResponse.json({ success: false, error: 'Invalid status value.' }, { status: 400 })
  }

  try {
    const existing = await prisma.jobVacancy.findUnique({ where: { id }, select: { id: true } })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Vacancy not found.' }, { status: 404 })
    }

    const updated = await prisma.jobVacancy.update({
      where: { id },
      data: { status, isActive: status === 'ACTIVE' },
      include: { _count: { select: { applications: true } } },
    })
    return NextResponse.json({ success: true, data: toVacancyJson(updated) })
  } catch (error) {
    console.error('[dashboard/vacancies/[id]] PATCH failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to update vacancy.' }, { status: 500 })
  }
}
