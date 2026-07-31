import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@backend/services/db'
import { requireAdmin } from '@backend/middleware/require-auth'
import { VALID_DEPARTMENTS, VALID_JOB_TYPES } from '@backend/services/vacancy-types'
import type { ValidDepartment, ValidJobType, Vacancy, VacancyPayload, VacancyNewBody, VacancyNewResult } from '@backend/services/vacancy-types'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(body: Partial<VacancyNewBody>): Record<string, string> {
  const e: Record<string, string> = {}
  if (!body.title?.trim())          e.title        = 'Job title is required.'
  else if (body.title.trim().length < 3) e.title   = 'Title must be at least 3 characters.'
  if (!body.department?.trim())     e.department   = 'Department is required.'
  else if (!VALID_DEPARTMENTS.includes(body.department as ValidDepartment)) e.department = 'Invalid department.'
  if (!body.location?.trim())       e.location     = 'Location is required.'
  if (!body.type?.trim())           e.type         = 'Job type is required.'
  else if (!VALID_JOB_TYPES.includes(body.type as ValidJobType)) e.type = 'Invalid job type.'
  if (!body.description?.trim())    e.description  = 'Job description is required.'
  else if (body.description.trim().length < 20) e.description = 'Description must be at least 20 characters.'
  if (!body.requirements?.trim())   e.requirements = 'At least one requirement is required.'
  if (!body.contactEmail?.trim())   e.contactEmail = 'Contact email is required.'
  else if (!EMAIL_RE.test(body.contactEmail.trim())) e.contactEmail = 'Please enter a valid email address.'
  if (!body.closingDate?.trim())    e.closingDate  = 'Closing date is required.'
  else {
    const d = new Date(body.closingDate)
    if (isNaN(d.getTime())) e.closingDate = 'Invalid closing date.'
    else if (d <= new Date()) e.closingDate = 'Closing date must be in the future.'
  }
  return e
}

function toVacancy(row: {
  id: number; title: string; department: string; location: string; type: string
  description: string; requirements: string; contactEmail: string; isActive: boolean; status: string
  closingDate: Date | null; createdAt: Date; _count?: { applications: number }
}): Vacancy {
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const showAll = searchParams.get('all') === '1'

  // The public careers listing (default, no ?all=1) stays unauthenticated.
  // ?all=1 exposes DRAFT/CLOSED/ARCHIVED vacancies too — admin only.
  if (showAll) {
    const authCheck = requireAdmin()
    if (authCheck instanceof NextResponse) return authCheck
  }

  try {
    const rows = await prisma.jobVacancy.findMany({
      where:   showAll ? {} : { isActive: true },
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { applications: true } } },
    })
    const vacancies = rows.map(toVacancy)
    const payload: VacancyPayload = { vacancies, total: vacancies.length }
    return NextResponse.json({ success: true, data: payload })
  } catch (error) {
    console.error('[dashboard/vacancies] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load vacancies.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const authCheck = requireAdmin()
  if (authCheck instanceof NextResponse) return authCheck

  try {
    const body: Partial<VacancyNewBody> = await req.json()
    const errors = validate(body)
    if (Object.keys(errors).length > 0)
      return NextResponse.json({ success: false, errors }, { status: 422 })

    const { title, department, location, type, description, requirements, contactEmail, closingDate } = body as VacancyNewBody

    const vacancy = await prisma.jobVacancy.create({
      data: {
        title: title.trim(), department: department.trim(), location: location.trim(),
        type: type.trim(), description: description.trim(), requirements: requirements.trim(),
        contactEmail: contactEmail.trim().toLowerCase(), isActive: true, closingDate: new Date(closingDate),
      },
    })

    const result: VacancyNewResult = { id: vacancy.id, title: vacancy.title }
    return NextResponse.json({ success: true, data: result }, { status: 201 })
  } catch (error) {
    console.error('[dashboard/vacancies] POST failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to create vacancy. Please try again.' }, { status: 500 })
  }
}

// ── DELETE /api/dashboard/vacancies ───────────────────────────────────────────
// Body: { id: number }  — permanently removes a vacancy listing. Admin only.

export async function DELETE(req: NextRequest) {
  const authCheck = requireAdmin()
  if (authCheck instanceof NextResponse) return authCheck

  try {
    const { id } = (await req.json()) as { id?: number }

    if (!id || typeof id !== 'number' || id < 1)
      return NextResponse.json({ success: false, error: 'A valid vacancy ID is required.' }, { status: 400 })

    const vacancy = await prisma.jobVacancy.findUnique({ where: { id }, select: { id: true, title: true } })
    if (!vacancy)
      return NextResponse.json({ success: false, error: 'Vacancy not found.' }, { status: 404 })

    await prisma.jobVacancy.delete({ where: { id } })

    return NextResponse.json({ success: true, data: { id, title: vacancy.title } })
  } catch (error) {
    console.error('[dashboard/vacancies] DELETE failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete vacancy.' }, { status: 500 })
  }
}
