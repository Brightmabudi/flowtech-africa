import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@backend/services/db'
import { requireAdmin } from '@backend/middleware/require-auth'
import { VALID_STATUSES } from '@backend/services/application-types'

function toApplicationJson(r: {
  id: number; vacancyId: number; firstName: string; lastName: string; email: string
  phone: string | null; location: string | null; coverLetter: string | null; cvUrl: string
  status: string; createdAt: Date; updatedAt: Date
  vacancy?: { id: number; title: string } | null
}) {
  return {
    id: r.id, vacancyId: r.vacancyId, firstName: r.firstName, lastName: r.lastName,
    email: r.email, phone: r.phone, location: r.location, coverLetter: r.coverLetter,
    cvUrl: r.cvUrl, status: r.status,
    createdAt: r.createdAt.toISOString(), updatedAt: r.updatedAt.toISOString(),
    vacancy: r.vacancy,
  }
}

// ── GET /api/dashboard/applications/[id] ─────────────────────────────────────
// Admin only.

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const authCheck = requireAdmin()
  if (authCheck instanceof NextResponse) return authCheck

  const id = Number(params.id)
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ success: false, error: 'Invalid application ID.' }, { status: 400 })
  }

  try {
    const application = await prisma.jobApplication.findUnique({
      where: { id },
      include: { vacancy: { select: { id: true, title: true } } },
    })
    if (!application) {
      return NextResponse.json({ success: false, error: 'Application not found.' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: toApplicationJson(application) })
  } catch (error) {
    console.error('[dashboard/applications/[id]] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load application.' }, { status: 500 })
  }
}

// ── PATCH /api/dashboard/applications/[id] ───────────────────────────────────
// Admin only. Status updates only — no other field may be changed here.

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const authCheck = requireAdmin()
  if (authCheck instanceof NextResponse) return authCheck

  const id = Number(params.id)
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ success: false, error: 'Invalid application ID.' }, { status: 400 })
  }

  let body: { status?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const status = body.status
  if (!status || !(VALID_STATUSES as readonly string[]).includes(status)) {
    return NextResponse.json({ success: false, error: 'Invalid status value.' }, { status: 400 })
  }

  try {
    const existing = await prisma.jobApplication.findUnique({ where: { id }, select: { id: true } })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Application not found.' }, { status: 404 })
    }

    const updated = await prisma.jobApplication.update({
      where: { id },
      data: { status },
      include: { vacancy: { select: { id: true, title: true } } },
    })
    return NextResponse.json({ success: true, data: toApplicationJson(updated) })
  } catch (error) {
    console.error('[dashboard/applications/[id]] PATCH failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to update application.' }, { status: 500 })
  }
}
