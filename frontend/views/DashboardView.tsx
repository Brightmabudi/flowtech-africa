'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import DashboardLayout from '@frontend/components/DashboardLayout'
import type { EnquiryListPayload, ContactEnquiryRecord } from '@backend/services/enquiry-types'
import type { ApplicationListPayload, JobApplicationRecord } from '@backend/services/application-types'
import type { VacancyPayload, Vacancy } from '@backend/services/vacancy-types'
import {
  Mail, Briefcase, Users, RefreshCw, AlertCircle, ArrowUpRight,
  Plus, Eye, ClipboardList, Loader2,
} from 'lucide-react'

const SAST = 'Africa/Johannesburg'

interface StatsPayload {
  enquiries:    { total: number; new: number; unread: number }
  vacancies:    { total: number; active: number; closed: number }
  applications: { total: number; new: number; shortlisted: number }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', { timeZone: SAST, day: '2-digit', month: 'short', year: 'numeric' })
}

function getSASTGreeting(): string {
  const hour = Number(new Date().toLocaleString('en-ZA', { timeZone: SAST, hour: 'numeric', hour12: false }))
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

// ── Status colour maps (subtle, matching each entity's own status vocabulary) ─

const ENQUIRY_STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  NEW:       { bg: 'rgba(59,130,246,0.08)',  text: '#1D4ED8', border: 'rgba(59,130,246,0.2)' },
  READ:      { bg: 'rgba(148,163,184,0.1)',  text: '#475569', border: 'rgba(148,163,184,0.25)' },
  RESPONDED: { bg: 'rgba(16,185,129,0.08)',  text: '#047857', border: 'rgba(16,185,129,0.2)' },
  ARCHIVED:  { bg: 'rgba(15,23,42,0.05)',    text: '#475569', border: 'rgba(15,23,42,0.12)' },
}

const APPLICATION_STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  NEW:         { bg: 'rgba(59,130,246,0.08)',  text: '#1D4ED8', border: 'rgba(59,130,246,0.2)' },
  REVIEWED:    { bg: 'rgba(245,158,11,0.08)',  text: '#B45309', border: 'rgba(245,158,11,0.2)' },
  SHORTLISTED: { bg: 'rgba(16,185,129,0.08)',  text: '#047857', border: 'rgba(16,185,129,0.2)' },
  REJECTED:    { bg: 'rgba(239,68,68,0.08)',   text: '#DC2626', border: 'rgba(239,68,68,0.2)'  },
  ARCHIVED:    { bg: 'rgba(15,23,42,0.05)',    text: '#475569', border: 'rgba(15,23,42,0.12)' },
}

const VACANCY_STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  DRAFT:    { bg: 'rgba(148,163,184,0.1)',  text: '#475569', border: 'rgba(148,163,184,0.25)' },
  ACTIVE:   { bg: 'rgba(16,185,129,0.08)',  text: '#047857', border: 'rgba(16,185,129,0.2)' },
  CLOSED:   { bg: 'rgba(245,158,11,0.08)',  text: '#B45309', border: 'rgba(245,158,11,0.2)' },
  ARCHIVED: { bg: 'rgba(15,23,42,0.05)',    text: '#475569', border: 'rgba(15,23,42,0.12)' },
}

function StatusBadge({ status, colors }: { status: string; colors: Record<string, { bg: string; text: string; border: string }> }) {
  const c = colors[status] ?? colors.NEW ?? { bg: 'rgba(148,163,184,0.1)', text: '#475569', border: 'rgba(148,163,184,0.25)' }
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap">
      {status.replace('_', ' ')}
    </span>
  )
}

// ── Skeletons ─────────────────────────────────────────────────────────────────

function Sk({ className }: { className?: string }) {
  return <div className={['rounded animate-pulse bg-[#F1F5F9]', className].join(' ')} />
}

function KPICardSkeleton() {
  return (
    <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between mb-5">
        <Sk className="h-11 w-11 rounded-xl" />
        <Sk className="h-5 w-16 rounded-full" />
      </div>
      <Sk className="h-8 w-20 mb-2" />
      <Sk className="h-4 w-32 mb-4" />
      <div className="pt-4 border-t border-[rgba(15,23,42,0.06)]"><Sk className="h-3.5 w-28" /></div>
    </div>
  )
}

function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3 px-4 border-b border-[rgba(15,23,42,0.05)] last:border-0">
      <Sk className="h-8 w-8 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-1.5"><Sk className="h-3.5 w-32" /><Sk className="h-3 w-48" /></div>
      <Sk className="h-5 w-16 rounded-full flex-shrink-0" />
    </div>
  )
}

// ── Empty / error primitives ─────────────────────────────────────────────────

function PanelEmpty({ icon: Icon, message }: { icon: React.ComponentType<{ className?: string }>; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-10 h-10 rounded-xl bg-[rgba(59,31,168,0.06)] flex items-center justify-center mb-3">
        <Icon className="w-4.5 h-4.5 text-[#3B1FA8]" />
      </div>
      <p className="text-[13px] text-[#94A3B8]">{message}</p>
    </div>
  )
}

function PanelError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex items-start gap-3 p-4">
      <AlertCircle className="w-4 h-4 text-[#FF5C3A] flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#0F172A]">Failed to load</p>
        <p className="text-xs text-[#475569] mt-0.5">{message}</p>
      </div>
      <button onClick={onRetry} className="flex items-center gap-1 text-xs font-semibold text-[#3B1FA8] hover:text-[#FF5C3A] transition-colors flex-shrink-0">
        <RefreshCw className="w-3 h-3" />Retry
      </button>
    </div>
  )
}

// ── KPI card (clickable) ──────────────────────────────────────────────────────

interface KPICardProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
  accentClass: string
  iconBgClass: string
  iconColorClass: string
  total: number
  label: string
  sub: string
  tag: string
  tagClass: string
  footer: string
}

function KPICard({ href, icon: Icon, accentClass, iconBgClass, iconColorClass, total, label, sub, tag, tagClass, footer }: KPICardProps) {
  return (
    <Link
      href={href}
      className="group relative block rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B1FA8]"
    >
      <div className={['absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl', accentClass].join(' ')} />
      <div className="flex items-start justify-between mb-5">
        <div className={['w-11 h-11 rounded-xl flex items-center justify-center', iconBgClass].join(' ')}>
          <Icon className={['w-5 h-5', iconColorClass].join(' ')} />
        </div>
        <span className={['text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide', tagClass].join(' ')}>{tag}</span>
      </div>
      <p className="text-3xl font-black text-[#0F172A] leading-none mb-1.5 tabular-nums">{total.toLocaleString('en-ZA')}</p>
      <p className="text-sm font-semibold text-[#0F172A] mb-0.5">{label}</p>
      <p className="text-xs text-[#94A3B8]">{sub}</p>
      <div className="mt-4 pt-4 border-t border-[rgba(15,23,42,0.06)] flex items-center gap-1.5">
        <ArrowUpRight className="w-3.5 h-3.5 text-[#CBD5E1] group-hover:text-[#3B1FA8] transition-colors" />
        <span className="text-[11px] text-[#94A3B8] group-hover:text-[#475569] transition-colors">{footer}</span>
      </div>
    </Link>
  )
}

// ── Panel wrapper ─────────────────────────────────────────────────────────────

function Panel({ title, viewAllHref, children }: { title: string; viewAllHref?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(15,23,42,0.06)]">
        <h2 className="text-sm font-bold text-[#0F172A]">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-[11px] font-semibold text-[#3B1FA8] hover:text-[#2D1580] transition-colors">
            View all
          </Link>
        )}
      </div>
      {children}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [stats, setStats]               = useState<StatsPayload | null>(null)
  const [statsError, setStatsError]     = useState<string | null>(null)
  const [enquiries, setEnquiries]       = useState<ContactEnquiryRecord[] | null>(null)
  const [enquiriesError, setEnquiriesError] = useState<string | null>(null)
  const [applications, setApplications] = useState<JobApplicationRecord[] | null>(null)
  const [applicationsError, setApplicationsError] = useState<string | null>(null)
  const [vacancies, setVacancies]       = useState<Vacancy[] | null>(null)
  const [vacanciesError, setVacanciesError] = useState<string | null>(null)
  const [loading, setLoading]           = useState(true)
  const [lastFetched, setLastFetched]   = useState<Date | null>(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setStatsError(null); setEnquiriesError(null); setApplicationsError(null); setVacanciesError(null)

    const [statsRes, enquiriesRes, applicationsRes, vacanciesRes] = await Promise.allSettled([
      fetch('/api/dashboard/stats', { cache: 'no-store' }).then(r => r.json()),
      fetch('/api/dashboard/enquiries', { cache: 'no-store' }).then(r => r.json()),
      fetch('/api/dashboard/applications', { cache: 'no-store' }).then(r => r.json()),
      fetch('/api/dashboard/vacancies?all=1', { cache: 'no-store' }).then(r => r.json()),
    ])

    if (statsRes.status === 'fulfilled' && statsRes.value.success) setStats(statsRes.value.data)
    else setStatsError(statsRes.status === 'fulfilled' ? statsRes.value.error : 'Network error')

    if (enquiriesRes.status === 'fulfilled' && enquiriesRes.value.success) {
      setEnquiries((enquiriesRes.value.data as EnquiryListPayload).enquiries.slice(0, 5))
    } else setEnquiriesError(enquiriesRes.status === 'fulfilled' ? enquiriesRes.value.error : 'Network error')

    if (applicationsRes.status === 'fulfilled' && applicationsRes.value.success) {
      setApplications((applicationsRes.value.data as ApplicationListPayload).applications.slice(0, 5))
    } else setApplicationsError(applicationsRes.status === 'fulfilled' ? applicationsRes.value.error : 'Network error')

    if (vacanciesRes.status === 'fulfilled' && vacanciesRes.value.success) {
      setVacancies((vacanciesRes.value.data as VacancyPayload).vacancies)
    } else setVacanciesError(vacanciesRes.status === 'fulfilled' ? vacanciesRes.value.error : 'Network error')

    setLoading(false)
    setLastFetched(new Date())
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const newEnquiries = stats?.enquiries.new ?? 0
  const newApplications = stats?.applications.new ?? 0

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3B1FA8] bg-[rgba(59,31,168,0.08)] px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Live
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight leading-tight">
              {getSASTGreeting()}, Admin
            </h1>
            <p className="text-sm text-[#475569] mt-1">Enquiries, vacancies, and applications at a glance</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {lastFetched && !loading && (
              <p className="text-[11px] text-[#94A3B8]">
                Updated {lastFetched.toLocaleTimeString('en-ZA', { timeZone: SAST, hour: '2-digit', minute: '2-digit', hour12: false })}
              </p>
            )}
            <button
              onClick={fetchAll}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#3B1FA8] transition-colors disabled:opacity-40 px-3 py-1.5 rounded-lg border border-[rgba(15,23,42,0.08)] bg-white hover:border-[rgba(59,31,168,0.2)] shadow-sm"
            >
              <RefreshCw className={['w-3.5 h-3.5', loading ? 'animate-spin' : ''].join(' ')} />
              Refresh
            </button>
          </div>
        </div>

        {statsError && <PanelError message={statsError} onRetry={fetchAll} />}

        {/* ── KPI cards ──────────────────────────────────────────────────── */}
        <section aria-label="Key metrics">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {loading ? (
              <><KPICardSkeleton /><KPICardSkeleton /><KPICardSkeleton /></>
            ) : (
              <>
                <KPICard
                  href="/dashboard/enquiries"
                  icon={Mail}
                  accentClass="bg-gradient-to-r from-[#3B1FA8] to-[#6D4AE8]"
                  iconBgClass="bg-[rgba(59,31,168,0.08)]"
                  iconColorClass="text-[#3B1FA8]"
                  total={stats?.enquiries.total ?? 0}
                  label="Enquiries"
                  sub={`${stats?.enquiries.new ?? 0} new · ${stats?.enquiries.unread ?? 0} unread`}
                  tag={newEnquiries > 0 ? 'Action needed' : 'Clear'}
                  tagClass={newEnquiries > 0 ? 'bg-[rgba(255,92,58,0.1)] text-[#FF5C3A]' : 'bg-[rgba(16,185,129,0.1)] text-[#10B981]'}
                  footer="View all enquiries"
                />
                <KPICard
                  href="/dashboard/vacancies"
                  icon={Briefcase}
                  accentClass="bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8]"
                  iconBgClass="bg-[rgba(14,165,233,0.08)]"
                  iconColorClass="text-[#0EA5E9]"
                  total={stats?.vacancies.total ?? 0}
                  label="Job Vacancies"
                  sub={`${stats?.vacancies.active ?? 0} active · ${stats?.vacancies.closed ?? 0} closed`}
                  tag={(stats?.vacancies.active ?? 0) > 0 ? 'Hiring' : 'None active'}
                  tagClass={(stats?.vacancies.active ?? 0) > 0 ? 'bg-[rgba(16,185,129,0.1)] text-[#10B981]' : 'bg-[rgba(148,163,184,0.15)] text-[#475569]'}
                  footer="Manage vacancies"
                />
                <KPICard
                  href="/dashboard/applications"
                  icon={Users}
                  accentClass="bg-gradient-to-r from-[#FF5C3A] to-[#F59E0B]"
                  iconBgClass="bg-[rgba(255,92,58,0.08)]"
                  iconColorClass="text-[#FF5C3A]"
                  total={stats?.applications.total ?? 0}
                  label="Applications"
                  sub={`${stats?.applications.new ?? 0} new · ${stats?.applications.shortlisted ?? 0} shortlisted`}
                  tag={newApplications > 0 ? 'New' : 'Clear'}
                  tagClass={newApplications > 0 ? 'bg-[rgba(59,130,246,0.1)] text-[#1D4ED8]' : 'bg-[rgba(16,185,129,0.1)] text-[#10B981]'}
                  footer="View all applications"
                />
              </>
            )}
          </div>
        </section>

        {/* ── Recent Enquiries + Recent Applications ────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4" aria-label="Recent activity">

          <Panel title="Recent Enquiries" viewAllHref="/dashboard/enquiries">
            {loading ? (
              <div>{[1, 2, 3].map(i => <RowSkeleton key={i} />)}</div>
            ) : enquiriesError ? (
              <PanelError message={enquiriesError} onRetry={fetchAll} />
            ) : !enquiries || enquiries.length === 0 ? (
              <PanelEmpty icon={Mail} message="No enquiries yet." />
            ) : (
              <ul className="list-none p-0 m-0">
                {enquiries.map(e => (
                  <li key={e.id} className="flex items-center gap-3 px-5 py-3 border-b border-[rgba(15,23,42,0.05)] last:border-0 hover:bg-[#F9FAFB] transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-[#0F172A] truncate">{e.firstName} {e.lastName}</p>
                      <p className="text-[11px] text-[#94A3B8] truncate">{e.email} · {e.serviceInterest}</p>
                      <p className="text-[10px] text-[#CBD5E1] mt-0.5">{formatDate(e.createdAt)}</p>
                    </div>
                    <StatusBadge status={e.status} colors={ENQUIRY_STATUS_COLORS} />
                    <Link href="/dashboard/enquiries" aria-label={`View enquiry from ${e.firstName} ${e.lastName}`} className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#3B1FA8] hover:bg-[rgba(59,31,168,0.06)] transition-colors flex-shrink-0">
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Recent Applications" viewAllHref="/dashboard/applications">
            {loading ? (
              <div>{[1, 2, 3].map(i => <RowSkeleton key={i} />)}</div>
            ) : applicationsError ? (
              <PanelError message={applicationsError} onRetry={fetchAll} />
            ) : !applications || applications.length === 0 ? (
              <PanelEmpty icon={Users} message="No applications yet." />
            ) : (
              <ul className="list-none p-0 m-0">
                {applications.map(a => (
                  <li key={a.id} className="flex items-center gap-3 px-5 py-3 border-b border-[rgba(15,23,42,0.05)] last:border-0 hover:bg-[#F9FAFB] transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-[#0F172A] truncate">{a.firstName} {a.lastName}</p>
                      <p className="text-[11px] text-[#94A3B8] truncate">{a.vacancy?.title ?? `Vacancy #${a.vacancyId}`}</p>
                      <p className="text-[10px] text-[#CBD5E1] mt-0.5">{formatDate(a.createdAt)}</p>
                    </div>
                    <StatusBadge status={a.status} colors={APPLICATION_STATUS_COLORS} />
                    <Link href="/dashboard/applications" aria-label={`View application from ${a.firstName} ${a.lastName}`} className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#3B1FA8] hover:bg-[rgba(59,31,168,0.06)] transition-colors flex-shrink-0">
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

        </section>

        {/* ── Vacancy Overview + Quick Actions ───────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4" aria-label="Vacancy overview and quick actions">

          <Panel title="Vacancy Overview" viewAllHref="/dashboard/vacancies">
            {loading ? (
              <div>{[1, 2, 3].map(i => <RowSkeleton key={i} />)}</div>
            ) : vacanciesError ? (
              <PanelError message={vacanciesError} onRetry={fetchAll} />
            ) : !vacancies || vacancies.length === 0 ? (
              <PanelEmpty icon={Briefcase} message="No vacancies yet." />
            ) : (
              <ul className="list-none p-0 m-0">
                {vacancies.map(v => (
                  <li key={v.id} className="flex items-center gap-3 px-5 py-3 border-b border-[rgba(15,23,42,0.05)] last:border-0 hover:bg-[#F9FAFB] transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-[#0F172A] truncate">{v.title}</p>
                      <p className="text-[11px] text-[#94A3B8]">
                        {v.applicationCount ?? 0} application{v.applicationCount === 1 ? '' : 's'}
                        {v.closingDate && <> · Closes {formatDate(v.closingDate)}</>}
                      </p>
                    </div>
                    <StatusBadge status={v.status} colors={VACANCY_STATUS_COLORS} />
                    <Link href="/dashboard/vacancies" aria-label={`Manage ${v.title}`} className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#3B1FA8] hover:bg-[rgba(59,31,168,0.06)] transition-colors flex-shrink-0">
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-[#0F172A] mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { icon: Plus,          label: 'Add New Vacancy',   sub: 'Post a new job opening',           iconBg: 'bg-[rgba(14,165,233,0.08)]',  iconColor: 'text-[#0EA5E9]', href: '/dashboard/vacancies/new' },
                { icon: Mail,          label: 'View New Enquiries', sub: `${newEnquiries} awaiting review`,  iconBg: 'bg-[rgba(59,31,168,0.08)]',   iconColor: 'text-[#3B1FA8]', href: '/dashboard/enquiries' },
                { icon: ClipboardList, label: 'Review Applications', sub: `${newApplications} awaiting review`, iconBg: 'bg-[rgba(255,92,58,0.08)]', iconColor: 'text-[#FF5C3A]', href: '/dashboard/applications' },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#F9FAFB] transition-colors group"
                >
                  <div className={['w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', action.iconBg].join(' ')}>
                    <action.icon className={['w-4 h-4', action.iconColor].join(' ')} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0F172A] group-hover:text-[#3B1FA8] transition-colors truncate">{action.label}</p>
                    <p className="text-[11px] text-[#94A3B8] truncate">{loading ? <Loader2 className="w-3 h-3 animate-spin inline" /> : action.sub}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#CBD5E1] group-hover:text-[#3B1FA8] transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>

        </section>

      </div>
    </DashboardLayout>
  )
}
