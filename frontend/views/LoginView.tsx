'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email,       setEmail]       = useState('')
  const [password,    setPassword]    = useState('')
  const [error,       setError]       = useState('')
  const [loading,     setLoading]     = useState(false)
  const [showPass,    setShowPass]    = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res  = await fetch('/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      })
      const json = await res.json()
      if (!json.success) {
        setError(json.error ?? 'Login failed. Please try again.')
        return
      }
      router.push(json.data.role === 'ADMIN' ? '/dashboard' : '/portal')
    } catch {
      setError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#08050F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(91,53,213,0.18) 0%, transparent 70%)',
      }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Image src="/logo-light.png" alt="FlowTech Africa" width={149} height={40}
            style={{ objectFit: 'contain', height: 40, width: 'auto' }} />
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(91,53,213,0.2)',
          borderRadius: 20,
          padding: '40px 36px',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}>
          <h1 style={{ color: '#ffffff', fontSize: 26, fontWeight: 700, margin: '0 0 6px' }}>
            Welcome back
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, margin: '0 0 32px' }}>
            Sign in to your FlowTech Africa account
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Email */}
            <div>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500, marginBottom: 8 }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(91,53,213,0.3)',
                  borderRadius: 10,
                  color: '#ffffff',
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color .2s',
                }}
                onFocus={e  => (e.currentTarget.style.borderColor = '#5B35D5')}
                onBlur={e   => (e.currentTarget.style.borderColor = 'rgba(91,53,213,0.3)')}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500, marginBottom: 8 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '12px 44px 12px 16px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(91,53,213,0.3)',
                    borderRadius: 10,
                    color: '#ffffff',
                    fontSize: 14,
                    outline: 'none',
                    transition: 'border-color .2s',
                  }}
                  onFocus={e  => (e.currentTarget.style.borderColor = '#5B35D5')}
                  onBlur={e   => (e.currentTarget.style.borderColor = 'rgba(91,53,213,0.3)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div role="alert" style={{
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 10,
                padding: '12px 14px',
                color: '#f87171',
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <AlertCircle size={15} style={{ flexShrink: 0 }} />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 4,
                padding: '13px 24px',
                background: loading
                  ? 'rgba(91,53,213,0.5)'
                  : 'linear-gradient(135deg,#2D1580,#5B35D5)',
                color: 'white',
                border: 'none',
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(91,53,213,0.35)',
                transition: 'opacity .2s, transform .2s',
              }}
              onMouseEnter={e => { if (!loading) { (e.currentTarget as HTMLElement).style.opacity = '.88'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' } }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 24 }}>
          © {new Date().getFullYear()} FlowTech Africa. All rights reserved.
        </p>
      </div>
    </div>
  )
}
