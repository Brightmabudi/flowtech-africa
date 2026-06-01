import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@backend/services/db'
import { requireAdmin } from '@backend/middleware/require-auth'

export interface AdminDocument {
  id:         number
  fileName:   string
  fileType:   string
  fileUrl:    string
  uploadedAt: string
  client: {
    id:               number
    name:             string
    email:            string
    organizationName: string
  }
}

// ── GET /api/dashboard/documents ──────────────────────────────────────────────
// Returns every published document with the owning client profile. Admin only.

export async function GET() {
  const authCheck = requireAdmin()
  if (authCheck instanceof NextResponse) return authCheck

  try {
    const rows = await prisma.document.findMany({
      orderBy: { uploadedAt: 'desc' },
      include: {
        clientProfile: {
          select: { id: true, name: true, email: true, organizationName: true },
        },
      },
    })

    const data: AdminDocument[] = rows.map((d) => ({
      id:         d.id,
      fileName:   d.fileName,
      fileType:   d.fileType,
      fileUrl:    d.fileUrl,
      uploadedAt: d.uploadedAt.toISOString(),
      client: {
        id:               d.clientProfile.id,
        name:             d.clientProfile.name,
        email:            d.clientProfile.email,
        organizationName: d.clientProfile.organizationName,
      },
    }))

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[dashboard/documents] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load documents.' }, { status: 500 })
  }
}

// ── DELETE /api/dashboard/documents ───────────────────────────────────────────
// Body: { id: number }  — permanently removes the document record. Admin only.

export async function DELETE(req: NextRequest) {
  const authCheck = requireAdmin()
  if (authCheck instanceof NextResponse) return authCheck

  try {
    const { id } = (await req.json()) as { id?: number }

    if (!id || typeof id !== 'number' || id < 1)
      return NextResponse.json({ success: false, error: 'A valid document ID is required.' }, { status: 400 })

    const doc = await prisma.document.findUnique({ where: { id }, select: { id: true, fileName: true } })
    if (!doc)
      return NextResponse.json({ success: false, error: 'Document not found.' }, { status: 404 })

    await prisma.document.delete({ where: { id } })

    return NextResponse.json({ success: true, data: { id, fileName: doc.fileName } })
  } catch (error) {
    console.error('[dashboard/documents] DELETE failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to revoke document.' }, { status: 500 })
  }
}
