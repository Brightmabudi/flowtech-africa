import { NextResponse } from 'next/server'
import { prisma } from '@backend/services/db'

export async function GET() {
  try {
    const clients = await prisma.clientProfile.findMany({
      select:  { id: true, name: true, email: true, organizationName: true },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json({ success: true, data: clients })
  } catch (error) {
    console.error('[dashboard/clients] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load clients.' }, { status: 500 })
  }
}
