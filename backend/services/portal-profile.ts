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
      where:   { email: session.email },
      include: {
        registrationRequests: {
          orderBy: { submittedAt: 'desc' },
          include: { billingRecords: true },
        },
      },
    })

    if (!profile)
      return NextResponse.json({ success: true, data: { profile: null, requests: [], billing: [] } })

    const requests = profile.registrationRequests
    const billing  = requests.flatMap((r) => r.billingRecords)

    return NextResponse.json({
      success: true,
      data: {
        profile:  { id: profile.id, name: profile.name, email: profile.email, organizationName: profile.organizationName },
        requests,
        billing,
      },
    })
  } catch (error) {
    console.error('[portal/profile] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load profile.' }, { status: 500 })
  }
}
