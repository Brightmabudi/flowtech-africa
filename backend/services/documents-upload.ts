import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@backend/services/db'
import { VALID_DOCUMENT_TYPES } from '@backend/services/document-types'
import type { DocumentUploadBody, DocumentUploadResult } from '@backend/services/document-types'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as DocumentUploadBody
    const { fileName, fileType, clientProfileId } = body

    const errors: Record<string, string> = {}
    if (!fileName?.trim())
      errors.fileName = 'File name is required.'
    if (!fileType || !(VALID_DOCUMENT_TYPES as readonly string[]).includes(fileType))
      errors.fileType = 'Invalid document type.'
    if (!clientProfileId || typeof clientProfileId !== 'number' || clientProfileId < 1)
      errors.clientProfileId = 'A valid client profile ID is required.'
    if (Object.keys(errors).length > 0)
      return NextResponse.json({ success: false, errors }, { status: 400 })

    const client = await prisma.clientProfile.findUnique({
      where: { id: clientProfileId }, select: { id: true },
    })
    if (!client)
      return NextResponse.json({ success: false, error: 'Client profile not found.' }, { status: 404 })

    const slug    = fileName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const fileUrl = `/uploads/documents/${clientProfileId}/${slug}-${Date.now()}.pdf`

    const doc = await prisma.document.create({
      data: { fileName: fileName.trim(), fileType, fileUrl, clientProfileId },
    })

    const result: DocumentUploadResult = {
      id: doc.id, fileName: doc.fileName, fileType: doc.fileType,
      fileUrl: doc.fileUrl, uploadedAt: doc.uploadedAt.toISOString(),
    }

    return NextResponse.json({ success: true, data: result }, { status: 201 })
  } catch (error) {
    console.error('[dashboard/documents/upload] POST failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to publish document.' }, { status: 500 })
  }
}
