import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@backend/services/db'
import { requireAdmin } from '@backend/middleware/require-auth'

// ── GET /api/dashboard/applications/[id]/cv ──────────────────────────────────
// Admin only. Streams the CV file a candidate uploaded with their application.

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const authCheck = requireAdmin()
  if (authCheck instanceof NextResponse) return authCheck

  const applicationId = Number(params.id)
  if (!Number.isInteger(applicationId) || applicationId < 1) {
    return NextResponse.json({ success: false, error: 'Invalid application.' }, { status: 400 })
  }

  const cv = await prisma.applicationCv.findUnique({ where: { applicationId } })
  if (!cv) {
    return NextResponse.json({ success: false, error: 'No uploaded CV for this application.' }, { status: 404 })
  }

  const safeName = cv.fileName.replace(/[^\w.\- ]/g, '_')
  return new NextResponse(new Uint8Array(cv.data), {
    headers: {
      'Content-Type': cv.mimeType,
      'Content-Disposition': `inline; filename="${safeName}"`,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'private, no-store',
    },
  })
}
