'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Footer from '@frontend/components/Footer'
import type { Vacancy, VacancyPayload } from '@backend/services/vacancy-types'

// ── Colour map for department badges ─────────────────────────────────────────

const DEPT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Engineering:      { bg: 'rgba(91,53,213,0.12)',  text: '#8B6FE8', border: 'rgba(91,53,213,0.25)'  },
  Security:         { bg: 'rgba(232,64,26,0.12)',   text: '#F07A5A', border: 'rgba(232,64,26,0.25)'  },
  Sales:            { bg: 'rgba(16,185,129,0.12)',  text: '#34D399', border: 'rgba(16,185,129,0.25)' },
  Operations:       { bg: 'rgba(59,130,246,0.12)',  text: '#60A5FA', border: 'rgba(59,130,246,0.25)' },
  Finance:          { bg: 'rgba(245,158,11,0.12)',  text: '#FCD34D', border: 'rgba(245,158,11,0.25)' },
  'Human Resources':{ bg: 'rgba(139,92,246,0.12)',  text: '#C4B5FD', border: 'rgba(139,92,246,0.25)' },
  Marketing:        { bg: 'rgba(236,72,153,0.12)',  text: '#F9A8D4', border: 'rgba(236,72,153,0.25)' },
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, padding: 'clamp(20px,3vw,32px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ background: 'rgba(255,255,255,.07)', borderRadius: 8, height: 22, width: 260, animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ background: 'rgba(255,255,255,.07)', borderRadius: 100, height: 22, width: 90, animation: 'pulse 1.5s ease-in-out infinite' }} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {[80, 100, 70].map((w, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,.05)', borderRadius: 100, height: 22, width: w, animation: 'pulse 1.5s ease-in-out infinite' }} />
        ))}
      </div>
      <div style={{ background: 'rgba(255,255,255,.05)', borderRadius: 8, height: 14, width: '100%', animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ background: 'rgba(255,255,255,.05)', borderRadius: 8, height: 14, width: '75%', animation: 'pulse 1.5s ease-in-out infinite' }} />
    </div>
  )
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
}

// ── Vacancy card ──────────────────────────────────────────────────────────────

function VacancyCard({ job }: { job: Vacancy }) {
  const dept      = DEPT_COLORS[job.department] ?? { bg: 'rgba(255,255,255,.08)', text: 'rgba(255,255,255,.5)', border: 'rgba(255,255,255,.12)' }
  const isExpired = job.closingDate ? new Date(job.closingDate) < new Date() : false

  return (
    <article
      style={{
        background:   'rgba(255,255,255,.03)',
        border:       isExpired ? '1px solid rgba(255,255,255,.05)' : '1px solid rgba(255,255,255,.08)',
        borderRadius: 16,
        padding:      'clamp(20px,3vw,32px)',
        transition:   'border-color .2s, background .2s',
        opacity:      isExpired ? 0.55 : 1,
        filter:       isExpired ? 'grayscale(0.4)' : 'none',
      }}
      onMouseEnter={e => {
        if (isExpired) return
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(91,53,213,0.35)'
        el.style.background  = 'rgba(91,53,213,0.05)'
      }}
      onMouseLeave={e => {
        if (isExpired) return
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,.08)'
        el.style.background  = 'rgba(255,255,255,.03)'
      }}
    >
      {/* Expired banner */}
      {isExpired && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          marginBottom: 14,
          background: 'rgba(100,100,100,0.15)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 100,
          padding: '5px 14px',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.35)', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: 'JetBrains Mono, monospace' }}>
            Application Closed
          </span>
        </div>
      )}

      {/* Header row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 14 }}>
        <div>
          <h3 style={{ fontSize: 'clamp(16px,2vw,20px)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 10 }}>
            {job.title}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 11, padding: '3px 12px', borderRadius: 100, background: dept.bg, color: dept.text, border: `1px solid ${dept.border}`, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '.08em' }}>
              {job.department}
            </span>
            <span style={{ fontSize: 11, padding: '3px 12px', borderRadius: 100, background: 'rgba(255,255,255,.05)', color: 'rgba(255,255,255,.45)', border: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', gap: 5 }}>
              📍 {job.location}
            </span>
            <span style={{ fontSize: 11, padding: '3px 12px', borderRadius: 100, background: 'rgba(255,255,255,.05)', color: 'rgba(255,255,255,.45)', border: '1px solid rgba(255,255,255,.08)' }}>
              {job.type}
            </span>
            {job.closingDate && (
              <span style={{ fontSize: 11, padding: '3px 12px', borderRadius: 100, background: isExpired ? 'rgba(100,100,100,0.1)' : 'rgba(232,64,26,0.08)', color: isExpired ? 'rgba(255,255,255,0.3)' : 'rgba(232,64,26,0.8)', border: isExpired ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(232,64,26,0.2)', display: 'flex', alignItems: 'center', gap: 5 }}>
                {isExpired ? 'Closed' : 'Closes'}: {fmtDate(job.closingDate)}
              </span>
            )}
          </div>
        </div>

        {isExpired ? (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(100,100,100,0.12)',
            color: 'rgba(255,255,255,0.3)',
            fontWeight: 700, fontSize: 13,
            padding: '10px 20px', borderRadius: 10,
            whiteSpace: 'nowrap', flexShrink: 0,
            border: '1px solid rgba(255,255,255,0.08)',
            cursor: 'not-allowed',
          }}>
            Closed
          </span>
        ) : (
          <a
            href={`mailto:${job.contactEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg,#5B35D5,#3B1FA8)',
              color: 'white', textDecoration: 'none', fontWeight: 700,
              fontSize: 13, padding: '10px 20px', borderRadius: 10,
              whiteSpace: 'nowrap', flexShrink: 0,
              boxShadow: '0 4px 16px rgba(91,53,213,0.3)',
              transition: 'opacity .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Apply Now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>

      {/* Description */}
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.75, marginBottom: 16 }}>
        {job.description}
      </p>

      {/* Requirements */}
      {job.requirements.length > 0 && (
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 10 }}>
            Key Requirements
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {job.requirements.map((req, i) => (
              <li key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 8, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: isExpired ? 'rgba(255,255,255,0.2)' : '#5B35D5', fontSize: 10 }}>✦</span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/dashboard/vacancies')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((body) => {
        if (!body.success) throw new Error(body.error ?? 'Unknown error')
        setVacancies((body.data as VacancyPayload).vacancies)
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load vacancies.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main style={{ background: '#08050F', minHeight: '100vh', color: 'white' }}>

      {/* ── Nav back link ── */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,.06)', padding: '0 clamp(20px,5vw,100px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', height: 64, gap: 24 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'rgba(255,255,255,.4)', fontSize: 13, transition: 'color .2s' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to FlowTech Africa
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <section style={{ padding: 'clamp(56px,8vw,112px) clamp(20px,5vw,100px) clamp(40px,5vw,72px)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(91,53,213,0.12)', border: '1px solid rgba(91,53,213,0.25)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5B35D5', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8B6FE8', fontFamily: 'JetBrains Mono, monospace' }}>
              We&apos;re Hiring
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: 20 }}>
            Build the future of<br />
            <span style={{ background: 'linear-gradient(135deg,#5B35D5,#E8401A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              African technology
            </span>
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,.45)', lineHeight: 1.75, maxWidth: 560, marginBottom: 32 }}>
            FlowTech Africa is a proudly South African ICT company with over 20 years of experience. Join a team that powers enterprise digital transformation across the continent.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { label: 'Pretoria HQ', icon: '📍' },
              { label: 'B-BBEE Level 1', icon: '🏅' },
              { label: '20+ Years', icon: '⚡' },
              { label: 'Remote-Friendly', icon: '💻' },
            ].map(({ label, icon }) => (
              <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, padding: '6px 14px', border: '1px solid rgba(255,255,255,.1)', borderRadius: 100, color: 'rgba(255,255,255,.45)' }}>
                {icon} {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Job listings ── */}
      <section style={{ padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,100px)', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
          <h2 style={{ fontSize: 'clamp(20px,3vw,28px)', fontWeight: 800, letterSpacing: '-.02em' }}>
            Open Positions
            {!loading && (
              <span style={{ marginLeft: 12, fontSize: 14, fontWeight: 700, color: '#5B35D5', background: 'rgba(91,53,213,0.12)', border: '1px solid rgba(91,53,213,0.2)', borderRadius: 100, padding: '2px 10px' }}>
                {vacancies.length}
              </span>
            )}
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.3)', fontFamily: 'JetBrains Mono, monospace' }}>
            Updated live
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div style={{ background: 'rgba(232,64,26,0.08)', border: '1px solid rgba(232,64,26,0.2)', borderRadius: 12, padding: '20px 24px', color: 'rgba(255,255,255,.6)', fontSize: 14 }}>
            ⚠ {error}
          </div>
        )}

        {/* No vacancies */}
        {!loading && !error && vacancies.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,.3)', marginBottom: 8 }}>No open positions at this time</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,.2)' }}>Check back soon or send a speculative CV below.</p>
          </div>
        )}

        {/* Vacancy cards */}
        {!loading && !error && vacancies.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {vacancies.map((job) => <VacancyCard key={job.id} job={job} />)}
          </div>
        )}
      </section>

      {/* ── Speculative CV CTA ── */}
      <section style={{ padding: '0 clamp(20px,5vw,100px) clamp(56px,7vw,96px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(91,53,213,0.15), rgba(232,64,26,0.08))',
            border: '1px solid rgba(91,53,213,0.2)',
            borderRadius: 20,
            padding: 'clamp(32px,5vw,56px)',
            textAlign: 'center',
          }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 12 }}>
              Don&apos;t see the right role?
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 28px' }}>
              We&apos;re always on the lookout for exceptional talent. Send us your CV and we&apos;ll reach out when a suitable opportunity opens up.
            </p>
            <a
              href="mailto:michellef@flowtech.africa?subject=Speculative Application — FlowTech Africa"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,.08)', color: 'white',
                textDecoration: 'none', fontWeight: 700, fontSize: 14,
                padding: '12px 28px', borderRadius: 12,
                border: '1px solid rgba(255,255,255,.15)',
                transition: 'background .2s, border-color .2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = 'rgba(91,53,213,0.2)'
                e.currentTarget.style.borderColor = 'rgba(91,53,213,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = 'rgba(255,255,255,.08)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)'
              }}
            >
              Send Speculative CV
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
