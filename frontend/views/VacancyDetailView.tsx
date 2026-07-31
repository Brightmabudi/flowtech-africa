'use client'

import { useCallback, useEffect, useRef, useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Briefcase, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import Footer from '@frontend/components/Footer'
import { Container, Section } from '@frontend/components/ui/Container'
import Card from '@frontend/components/ui/Card'
import Badge from '@frontend/components/ui/Badge'
import Button from '@frontend/components/ui/Button'
import Skeleton from '@frontend/components/ui/Skeleton'
import type { Vacancy, VacancyPayload } from '@backend/services/vacancy-types'

const DEPT_COLORS: Record<string, string> = {
  Engineering: '#5B35D5', Security: '#E8401A', Sales: '#10B981', Operations: '#0EA5E9',
  Finance: '#F59E0B', 'Human Resources': '#8B5CF6', Marketing: '#EC4899',
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
}

interface FormState {
  firstName: string
  lastName:  string
  email:     string
  phone:     string
  location:  string
  coverLetter: string
  cvUrl:     string
}

const EMPTY_FORM: FormState = { firstName: '', lastName: '', email: '', phone: '', location: '', coverLetter: '', cvUrl: '' }

export default function VacancyDetailView({ id }: { id: string }) {
  const [vacancy, setVacancy] = useState<Vacancy | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const renderedAtRef = useRef<number>(Date.now())

  useEffect(() => {
    setLoading(true)
    fetch('/api/dashboard/vacancies')
      .then((r) => r.json())
      .then((body) => {
        if (!body.success) throw new Error(body.error ?? 'Unknown error')
        const payload = body.data as VacancyPayload
        const match = payload.vacancies.find((v) => String(v.id) === id)
        if (!match) { setNotFound(true); return }
        setVacancy(match)
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load vacancy.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleChange = useCallback((field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value })), [])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitting(true)
    try {
      const res = await fetch(`/api/vacancies/${id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: '', renderedAt: renderedAtRef.current }),
      })
      const body = await res.json()
      if (!body.success) throw new Error(body.error ?? 'Failed to submit your application.')
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit your application.')
    } finally {
      setSubmitting(false)
    }
  }, [id, form])

  const isExpired = vacancy?.closingDate ? new Date(vacancy.closingDate) < new Date() : false

  return (
    <main className="min-h-screen bg-white">
      <Section className="!pb-10 !pt-24 sm:!pt-28">
        <Container className="max-w-3xl">
          <Link
            href="/careers"
            className="mb-8 inline-flex items-center gap-2 rounded-control text-[13px] text-ink-400 transition-colors hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Careers
          </Link>

          {loading && (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          )}

          {!loading && (notFound || error) && (
            <div className="flex flex-col items-center gap-4 rounded-card border border-accent-500/20 bg-accent-500/[0.06] px-6 py-10 text-center">
              <AlertTriangle size={28} className="text-accent-600" aria-hidden="true" />
              <div>
                <p className="mb-1 font-display font-bold text-ink-950">
                  {notFound ? 'Vacancy not found' : "Couldn't load this vacancy"}
                </p>
                <p className="text-sm text-ink-500">{error ?? 'This role may have been closed or removed.'}</p>
              </div>
              <Button href="/careers" variant="ghost" size="sm">Back to Careers</Button>
            </div>
          )}

          {!loading && vacancy && !notFound && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <Badge color={DEPT_COLORS[vacancy.department] ?? '#6B5F8A'} size="sm">{vacancy.department}</Badge>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-950/10 bg-ink-100 px-3 py-1 text-[11px] text-ink-500">
                  <MapPin size={11} aria-hidden="true" /> {vacancy.location}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-950/10 bg-ink-100 px-3 py-1 text-[11px] text-ink-500">
                  <Briefcase size={11} aria-hidden="true" /> {vacancy.type}
                </span>
                {vacancy.closingDate && (
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium" style={{ background: '#E8401A14', color: '#C7330F', border: '1px solid #E8401A33' }}>
                    <Calendar size={11} aria-hidden="true" /> {isExpired ? 'Closed' : 'Closes'} {fmtDate(vacancy.closingDate)}
                  </span>
                )}
              </div>

              <h1 className="mb-5 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.1] tracking-tight text-ink-950">
                {vacancy.title}
              </h1>

              <p className="mb-8 text-base leading-relaxed text-ink-500">{vacancy.description}</p>

              {vacancy.requirements.length > 0 && (
                <div className="mb-10">
                  <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-wide text-ink-400">Key Requirements</p>
                  <ul className="flex flex-col gap-2 p-0">
                    {vacancy.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                        <span aria-hidden="true" className="mt-0.5 text-[10px] text-brand-600">✦</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Apply form */}
              {isExpired ? (
                <div className="rounded-card border border-ink-950/10 bg-ink-50 px-6 py-8 text-center">
                  <p className="font-display font-bold text-ink-950">Applications for this role are closed.</p>
                </div>
              ) : submitted ? (
                <div className="flex flex-col items-center gap-3 rounded-card border border-brand-600/20 bg-brand-600/[0.06] px-6 py-10 text-center">
                  <CheckCircle2 size={28} className="text-brand-600" aria-hidden="true" />
                  <p className="font-display font-bold text-ink-950">Application submitted</p>
                  <p className="text-sm text-ink-500">Thanks {form.firstName} — we&apos;ll be in touch if there&apos;s a match.</p>
                </div>
              ) : (
                <Card>
                  <h2 className="mb-5 font-display text-lg font-bold text-ink-950">Apply for this role</h2>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="mb-1.5 block text-[13px] font-semibold text-ink-700">First name</label>
                        <input id="firstName" required value={form.firstName} onChange={handleChange('firstName')}
                          className="w-full rounded-control border border-ink-950/15 px-3.5 py-2.5 text-sm text-ink-950 outline-none focus:border-brand-600" />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="mb-1.5 block text-[13px] font-semibold text-ink-700">Last name</label>
                        <input id="lastName" required value={form.lastName} onChange={handleChange('lastName')}
                          className="w-full rounded-control border border-ink-950/15 px-3.5 py-2.5 text-sm text-ink-950 outline-none focus:border-brand-600" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-ink-700">Email</label>
                        <input id="email" type="email" required value={form.email} onChange={handleChange('email')}
                          className="w-full rounded-control border border-ink-950/15 px-3.5 py-2.5 text-sm text-ink-950 outline-none focus:border-brand-600" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-1.5 block text-[13px] font-semibold text-ink-700">Phone <span className="font-normal text-ink-400">(optional)</span></label>
                        <input id="phone" value={form.phone} onChange={handleChange('phone')}
                          className="w-full rounded-control border border-ink-950/15 px-3.5 py-2.5 text-sm text-ink-950 outline-none focus:border-brand-600" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="location" className="mb-1.5 block text-[13px] font-semibold text-ink-700">Location <span className="font-normal text-ink-400">(optional)</span></label>
                      <input id="location" value={form.location} onChange={handleChange('location')}
                        className="w-full rounded-control border border-ink-950/15 px-3.5 py-2.5 text-sm text-ink-950 outline-none focus:border-brand-600" />
                    </div>
                    <div>
                      <label htmlFor="cvUrl" className="mb-1.5 block text-[13px] font-semibold text-ink-700">CV / resume link</label>
                      <input id="cvUrl" type="url" required placeholder="https://drive.google.com/..." value={form.cvUrl} onChange={handleChange('cvUrl')}
                        className="w-full rounded-control border border-ink-950/15 px-3.5 py-2.5 text-sm text-ink-950 outline-none focus:border-brand-600" />
                      <p className="mt-1 text-xs text-ink-400">Link to your CV on Drive, Dropbox, LinkedIn, etc.</p>
                    </div>
                    <div>
                      <label htmlFor="coverLetter" className="mb-1.5 block text-[13px] font-semibold text-ink-700">Cover letter <span className="font-normal text-ink-400">(optional)</span></label>
                      <textarea id="coverLetter" rows={4} value={form.coverLetter} onChange={handleChange('coverLetter')}
                        className="w-full rounded-control border border-ink-950/15 px-3.5 py-2.5 text-sm text-ink-950 outline-none focus:border-brand-600" />
                    </div>

                    {/* Honeypot — hidden from real users */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                    </div>

                    {submitError && (
                      <div role="alert" className="rounded-control border border-accent-500/20 bg-accent-500/[0.06] px-4 py-3 text-sm text-accent-700">
                        {submitError}
                      </div>
                    )}

                    <Button type="submit" loading={submitting} disabled={submitting} className="self-start">
                      {submitting ? 'Submitting…' : 'Submit Application'}
                    </Button>
                  </form>
                </Card>
              )}
            </motion.div>
          )}
        </Container>
      </Section>
      <Footer />
    </main>
  )
}
