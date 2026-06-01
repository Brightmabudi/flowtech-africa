// ── Auth guard utilities ───────────────────────────────────────────────────────
// Thin wrappers over the session library that standardise the auth-check
// pattern in API route handlers so each route doesn't repeat cookie reads.

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { verifySession } from '@backend/services/auth'
import type { SessionPayload } from '@backend/services/auth'

export function getSession(): SessionPayload | null {
  const token = cookies().get('session')?.value
  if (!token) return null
  return verifySession(token)
}

export function requireAdmin(): { session: SessionPayload } | NextResponse {
  const session = getSession()
  if (!session) return unauthorised()
  if (session.role !== 'ADMIN') return forbidden()
  return { session }
}

export function unauthorised() {
  return NextResponse.json({ success: false, error: 'Unauthorised' }, { status: 401 })
}

export function forbidden() {
  return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
}
