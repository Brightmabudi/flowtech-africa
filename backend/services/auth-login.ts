import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@backend/services/db'
import { signSession, cookieOptions } from '@backend/services/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = (await req.json()) as { email?: string; password?: string }

    if (!email?.trim() || !password)
      return NextResponse.json({ success: false, error: 'Email and password are required.' }, { status: 400 })

    const account = await prisma.account.findUnique({
      where: { email: email.trim().toLowerCase() },
    })

    const dummyHash = '$2a$12$invaliddummyhashfortimingequalityXXXXXXXXXXXXXXXXXXXX'
    const hashToCheck = account?.passwordHash ?? dummyHash
    const valid = await bcrypt.compare(password, hashToCheck)

    if (!account || !valid)
      return NextResponse.json({ success: false, error: 'Invalid email or password.' }, { status: 401 })

    const token = signSession({
      id:    account.id,
      name:  account.name,
      email: account.email,
      role:  account.role,
      iat:   Date.now(),
    })

    const res = NextResponse.json({
      success: true,
      data: { role: account.role, name: account.name },
    })

    res.cookies.set({ ...cookieOptions(), value: token })

    return res
  } catch (error) {
    console.error('[auth/login] POST failed:', error)
    return NextResponse.json({ success: false, error: 'Login failed. Please try again.' }, { status: 500 })
  }
}
