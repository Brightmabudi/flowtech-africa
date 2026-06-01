import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySession } from '@backend/services/auth'
import { prisma } from '@backend/services/db'

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('session')?.value

  if (!token) return NextResponse.json({ success: false, error: 'Unauthorised' }, { status: 401 })

  const session = verifySession(token)
  if (!session) return NextResponse.json({ success: false, error: 'Invalid session' }, { status: 401 })

  try {
    const profile = await prisma.clientProfile.findUnique({
      where:  { email: session.email },
      select: { id: true },
    })

    if (!profile) return NextResponse.json({ success: true, data: [] })

    const docs = await prisma.document.findMany({
      where:   { clientProfileId: profile.id },
      orderBy: { uploadedAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: docs.map((d) => ({
        id: d.id, fileName: d.fileName, fileType: d.fileType,
        fileUrl: d.fileUrl, uploadedAt: d.uploadedAt.toISOString(),
      })),
    })
  } catch (error) {
    console.error('[portal/documents] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load documents.' }, { status: 500 })
  }
}
