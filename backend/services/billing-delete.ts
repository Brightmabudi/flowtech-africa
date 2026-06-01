import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@backend/services/db'
import { requireAdmin } from '@backend/middleware/require-auth'

// ── DELETE /api/dashboard/billing ─────────────────────────────────────────────
// Body: { id: number }  — permanently removes a billing record. Admin only.

export async function DELETE(req: NextRequest) {
  const authCheck = requireAdmin()
  if (authCheck instanceof NextResponse) return authCheck

  try {
    const { id } = (await req.json()) as { id?: number }

    if (!id || typeof id !== 'number' || id < 1)
      return NextResponse.json({ success: false, error: 'A valid billing record ID is required.' }, { status: 400 })

    const record = await prisma.billingRecord.findUnique({ where: { id }, select: { id: true } })
    if (!record)
      return NextResponse.json({ success: false, error: 'Billing record not found.' }, { status: 404 })

    await prisma.billingRecord.delete({ where: { id } })

    return NextResponse.json({ success: true, data: { id } })
  } catch (error) {
    console.error('[dashboard/billing] DELETE failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete billing record.' }, { status: 500 })
  }
}
