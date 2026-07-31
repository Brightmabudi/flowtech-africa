'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, MapPin, Briefcase, Calendar, AlertTriangle, Send } from 'lucide-react'
import Link from 'next/link'
import Footer from '@frontend/components/Footer'
import { Container, Section } from '@frontend/components/ui/Container'
import Card from '@frontend/components/ui/Card'
import Badge from '@frontend/components/ui/Badge'
import Button from '@frontend/components/ui/Button'
import Skeleton from '@frontend/components/ui/Skeleton'
import GradientCTABanner from '@frontend/components/ui/GradientCTABanner'
import { useStaggeredReveal } from '@frontend/hooks/useStaggeredReveal'
import type { Vacancy, VacancyPayload } from '@backend/services/vacancy-types'

const DEPT_COLORS: Record<string, string> = {
  Engineering:        '#5B35D5',
  Security:           '#E8401A',
  Sales:              '#10B981',
  Operations:         '#0EA5E9',
  Finance:            '#F59E0B',
  'Human Resources':  '#8B5CF6',
  Marketing:          '#EC4899',
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
}

function VacancyCardSkeleton() {
  return (
    <Card hoverLift={false} className="flex flex-col gap-3.5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-3.5 w-full" />
      <Skeleton className="h-3.5 w-3/4" />
    </Card>
  )
}

function VacancyCard({ job }: { job: Vacancy }) {
  const color     = DEPT_COLORS[job.department] ?? '#6B5F8A'
  const isExpired = job.closingDate ? new Date(job.closingDate) < new Date() : false

  return (
    <Card as="article" hoverLift={!isExpired} className={isExpired ? 'opacity-60 grayscale-[0.3]' : ''}>
      {isExpired && (
        <div className="mb-3.5 inline-flex items-center gap-1.5 rounded-full border border-ink-950/10 bg-ink-100 px-3.5 py-1">
          <span aria-hidden="true" className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ink-400" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-ink-400">Application Closed</span>
        </div>
      )}

      <div className="mb-3.5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="mb-2.5 text-[clamp(16px,2vw,20px)] font-bold tracking-tight text-ink-950">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-2">
            <Badge color={color} size="sm">{job.department}</Badge>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-950/10 bg-ink-100 px-3 py-1 text-[11px] text-ink-500">
              <MapPin size={11} aria-hidden="true" /> {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-950/10 bg-ink-100 px-3 py-1 text-[11px] text-ink-500">
              <Briefcase size={11} aria-hidden="true" /> {job.type}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-950/10 bg-ink-100 px-3 py-1 text-[11px] text-ink-500">
              <Calendar size={11} aria-hidden="true" /> Posted {fmtDate(job.createdAt)}
            </span>
            {job.closingDate && (
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium"
                style={isExpired
                  ? { background: '#F0EDF8', color: '#6B5F8A', border: '1px solid rgba(13,7,32,.1)' }
                  : { background: '#E8401A14', color: '#C7330F', border: '1px solid #E8401A33' }}
              >
                {isExpired ? 'Closed' : 'Closes'} {fmtDate(job.closingDate)}
              </span>
            )}
          </div>
        </div>

        {isExpired ? (
          <Button disabled size="sm" className="flex-shrink-0" aria-label={`Applications closed for ${job.title}`}>
            Closed
          </Button>
        ) : (
          <Button
            href={`/careers/${job.id}`}
            size="sm"
            icon={<ArrowUpRight size={14} />}
            iconPosition="right"
            className="flex-shrink-0"
          >
            Apply Now
          </Button>
        )}
      </div>

      <p className="mb-4 text-sm leading-relaxed text-ink-500">{job.description}</p>

      {job.requirements.length > 0 && (
        <div>
          <p className="mb-2.5 font-mono text-[11px] font-bold uppercase tracking-wide text-ink-400">Key Requirements</p>
          <ul className="flex flex-wrap gap-2 p-0">
            {job.requirements.map((req, i) => (
              <li key={i} className="flex items-center gap-1.5 rounded-control border border-ink-950/10 bg-ink-100 px-3 py-1.5 text-xs text-ink-500">
                <span aria-hidden="true" className="text-[10px]" style={{ color: isExpired ? '#94a3b8' : '#5B35D5' }}>✦</span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
}

export default function CareersPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState<string | null>(null)

  const loadVacancies = useCallback(() => {
    setLoading(true)
    setError(null)
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

  useEffect(() => { loadVacancies() }, [loadVacancies])

  const { ref: listRef, visibleCount } = useStaggeredReveal({ count: vacancies.length, staggerMs: 80, maxDelayMs: 480 })

  return (
    <main className="min-h-screen bg-white">

      <Section className="!py-0 !pb-10 !pt-24 sm:!pt-28">
        <Container>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-control text-[13px] text-ink-400 transition-colors hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to FlowTech Africa
          </Link>
        </Container>
      </Section>

      <Section className="!pt-6">
        <Container>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-600/25 bg-brand-600/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-600" />
              We&apos;re Hiring
            </span>
            <h1 className="mb-5 font-display text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.08] tracking-tight text-ink-950">
              Build the future of<br />
              <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">African technology</span>
            </h1>
            <p className="mb-8 max-w-xl text-[clamp(15px,2vw,18px)] leading-relaxed text-ink-500">
              FlowTech Africa is a proudly South African ICT company with over 20 years of experience. Join a team that powers enterprise digital transformation across the continent.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Pretoria HQ', icon: <MapPin size={13} /> },
                { label: 'B-BBEE Level 1', icon: <Briefcase size={13} /> },
              ].map(({ label, icon }) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-brand-600/15 bg-ink-100 px-3.5 py-1.5 text-xs font-medium text-ink-700">
                  <span aria-hidden="true" className="text-brand-600">{icon}</span> {label}
                </span>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink-950">
              Open Positions
              {!loading && !error && (
                <span className="ml-3 rounded-full border border-brand-600/20 bg-brand-600/10 px-2.5 py-0.5 align-middle font-mono text-sm font-bold text-brand-600">
                  {vacancies.length}
                </span>
              )}
            </h2>
            <p className="font-mono text-[13px] text-ink-400">Updated live</p>
          </div>

          {loading && (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => <VacancyCardSkeleton key={i} />)}
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center gap-4 rounded-card border border-accent-500/20 bg-accent-500/[0.06] px-6 py-10 text-center">
              <AlertTriangle size={28} className="text-accent-600" aria-hidden="true" />
              <div>
                <p className="mb-1 font-display font-bold text-ink-950">Couldn&apos;t load open positions</p>
                <p className="text-sm text-ink-500">{error}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={loadVacancies}>Try again</Button>
            </div>
          )}

          {!loading && !error && vacancies.length === 0 && (
            <div className="rounded-card border border-brand-600/10 bg-ink-50 px-6 py-16 text-center">
              <p className="mb-2 font-display text-lg font-bold text-ink-950">No open positions right now</p>
              <p className="mb-6 text-sm text-ink-500">Check back soon, or send us a speculative CV and we&apos;ll reach out when a role opens up.</p>
              <Button
                href="mailto:michellef@flowtech.africa?subject=Speculative Application — FlowTech Africa"
                variant="ghost"
                icon={<Send size={15} />}
              >
                Send Speculative CV
              </Button>
            </div>
          )}

          {!loading && !error && vacancies.length > 0 && (
            <div ref={listRef} className="flex flex-col gap-4">
              {vacancies.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={i < visibleCount ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <VacancyCard job={job} />
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {!loading && !error && vacancies.length > 0 && (
        <Section className="!pt-0">
          <Container>
            <GradientCTABanner
              heading="Don't see the right role?"
              body="We're always on the lookout for exceptional talent. Send us your CV and we'll reach out when a suitable opportunity opens up."
              ctaLabel="Send Speculative CV"
              ctaHref="mailto:michellef@flowtech.africa?subject=Speculative Application — FlowTech Africa"
            />
          </Container>
        </Section>
      )}

      <Footer />
    </main>
  )
}
