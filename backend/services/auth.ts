// ── Cookie-based session utilities ────────────────────────────────────────────
// Uses Node's built-in crypto (HMAC-SHA256) — no extra JWT dependencies.
// Safe for Next.js App Router route handlers (Node.js runtime).

import crypto from 'crypto'

const SECRET      = process.env.SESSION_SECRET ?? 'ft-africa-dev-fallback-secret!'
const COOKIE_NAME = 'session'
const MAX_AGE_SEC = 60 * 60 * 24 * 7   // 7 days

export interface SessionPayload {
  id:    number
  name:  string
  email: string
  role:  string
  iat:   number
}

// ── Sign ──────────────────────────────────────────────────────────────────────

export function signSession(payload: SessionPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig  = crypto.createHmac('sha256', SECRET).update(data).digest('base64url')
  return `${data}.${sig}`
}

// ── Verify ────────────────────────────────────────────────────────────────────

export function verifySession(token: string): SessionPayload | null {
  try {
    const dot = token.lastIndexOf('.')
    if (dot < 1) return null
    const data     = token.slice(0, dot)
    const sig      = token.slice(dot + 1)
    const expected = crypto.createHmac('sha256', SECRET).update(data).digest('base64url')
    // timingSafeEqual requires same-length buffers — catch TypeError if different
    try {
      const match = crypto.timingSafeEqual(
        Buffer.from(sig,      'utf8'),
        Buffer.from(expected, 'utf8'),
      )
      if (!match) return null
    } catch {
      return null
    }
    return JSON.parse(Buffer.from(data, 'base64url').toString('utf8')) as SessionPayload
  } catch {
    return null
  }
}

// ── Cookie helpers ────────────────────────────────────────────────────────────

export const SESSION_COOKIE  = COOKIE_NAME
export const SESSION_MAX_AGE = MAX_AGE_SEC

export function cookieOptions(maxAge = MAX_AGE_SEC) {
  return {
    name:     COOKIE_NAME,
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path:     '/',
    maxAge,
  }
}
