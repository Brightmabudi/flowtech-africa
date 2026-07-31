'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  LogOut, FileText, CreditCard, Clock, AlertCircle, ChevronRight, Mail,
  FolderLock, Download, Tag, ShieldCheck,
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface BillingRecord {
  id:            number
  amount:        number
  currency:      string
  invoiceStatus: string
  issuedAt:      string
}

interface RegistrationRequest {
  id:             number
  type:           string
  status:         string
  trackingNumber: string
  submittedAt:    string
  billingRecords: BillingRecord[]
}

interface DocumentRecord {
  id:         number
  fileName:   string
  fileType:   string
  fileUrl:    string
  uploadedAt: string
}

interface Profile {
  id:               number
  name:             string
  email:            string
  organizationName: string
}

interface PortalData {
  profile:  Profile | null
  requests: RegistrationRequest[]
  billing:  BillingRecord[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  'Pending':      { bg: 'rgba(245,200,66,0.12)',  text: '#F5C842', dot: '#F5C842' },
  'Under Review': { bg: 'rgba(14,165,233,0.12)',  text: '#38BDF8', dot: '#38BDF8' },
  'Processed':    { bg: 'rgba(16,185,129,0.12)',  text: '#10B981', dot: '#10B981' },
  'Rejected':     { bg: 'rgba(239,68,68,0.12)',   text: '#f87171', dot: '#f87171' },
}

const INVOICE_COLORS: Record<string, string> = {
  Draft:     '#94a3b8',
  Issued:    '#38BDF8',
  Paid:      '#10B981',
  Overdue:   '#f87171',
  Cancelled: '#6b7280',
}

// Document type colour map (portal-dark theme)
const DOC_TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'CIPC Company Registration': { bg: 'rgba(91,53,213,0.15)',  text: '#A78BFA', border: 'rgba(91,53,213,0.3)' },
  'SARS Tax Clearance':        { bg: 'rgba(16,185,129,0.12)', text: '#34D399', border: 'rgba(16,185,129,0.3)' },
  'B-BBEE Affidavit':          { bg: 'rgba(245,158,11,0.12)', text: '#FCD34D', border: 'rgba(245,158,11,0.3)' },
  'Compliance Filing':         { bg: 'rgba(56,189,248,0.12)', text: '#38BDF8', border: 'rgba(56,189,248,0.3)' },
}

function fmtAmount(cents: number, currency: string) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency, minimumFractionDigits: 2 }).format(cents / 100)
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function PortalPage() {
  const router = useRouter()
  const [data,       setData]       = useState<PortalData | null>(null)
  const [docs,       setDocs]       = useState<DocumentRecord[]>([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState('')
  const [loggingOut, setLoggingOut] = useState(false)
  const [activeTab,  setActiveTab]  = useState<'applications' | 'billing' | 'vault' | 'activity'>('applications')

  useEffect(() => {
    document.title = 'Client Portal — FlowTech Africa'
    Promise.all([
      fetch('/api/portal/profile').then((r) => r.json()),
      fetch('/api/portal/documents').then((r) => r.json()),
    ])
      .then(([profileJson, docsJson]) => {
        if (profileJson.success) setData(profileJson.data)
        else setError(profileJson.error ?? 'Failed to load your profile.')
        if (docsJson.success) setDocs(docsJson.data)
      })
      .catch(() => setError('Network error. Please refresh the page.'))
      .finally(() => setLoading(false))
  }, [])

  async function handleLogout() {
    if (!window.confirm('Are you sure you want to sign out?')) return
    setLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const topStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    background: 'rgba(8,5,15,0.9)',
    borderBottom: '1px solid rgba(91,53,213,0.15)',
    backdropFilter: 'blur(12px)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 32px', height: 64,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#08050F', fontFamily: "'Inter', sans-serif" }}>
      {/* Glow */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 100% 50% at 50% -5%, rgba(91,53,213,0.1) 0%, transparent 65%)' }} />

      {/* Top bar */}
      <header style={topStyle}>
        <Image src="/logo-light.png" alt="FlowTech Africa" width={127} height={34}
          style={{ objectFit: 'contain', height: 34, width: 'auto' }} />
        <button onClick={handleLogout} disabled={loggingOut}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500, padding: '8px 14px', cursor: loggingOut ? 'not-allowed' : 'pointer', transition: 'background .2s, color .2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }}
        >
          <LogOut size={15} />
          {loggingOut ? 'Signing out…' : 'Sign out'}
        </button>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '88px 24px 60px', position: 'relative', zIndex: 1 }}>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 40 }}>
            {[300, 200, 200].map((w, i) => (
              <div key={i} style={{ height: 24, width: w, background: 'rgba(255,255,255,0.06)', borderRadius: 8, animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 14, padding: '20px 24px', color: '#f87171', fontSize: 14 }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {/* Main content */}
        {!loading && !error && data && (
          <>
            {/* Hero */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: 'inline-block', background: 'rgba(91,53,213,0.15)', border: '1px solid rgba(91,53,213,0.3)', borderRadius: 20, padding: '4px 14px', color: '#A78BFA', fontSize: 12, fontWeight: 600, marginBottom: 14, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Client Portal
              </div>
              <h1 style={{ color: '#ffffff', fontSize: 30, fontWeight: 800, margin: '0 0 6px', lineHeight: 1.2 }}>
                Welcome{data.profile ? `, ${data.profile.name.split(' ')[0]}` : ' back'}
              </h1>
              {data.profile && (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: 0 }}>
                  {data.profile.organizationName}
                </p>
              )}
            </div>

            {/* Summary cards */}
            {data.profile && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 36 }}>
                {[
                  { icon: FileText,   label: 'Applications', value: data.requests.length },
                  { icon: CreditCard, label: 'Invoices',      value: data.billing.length  },
                  { icon: Clock,      label: 'Pending',
                    value: data.requests.filter(r => r.status === 'Pending' || r.status === 'Under Review').length },
                  { icon: FolderLock, label: 'Documents',     value: docs.length          },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(91,53,213,0.15)', borderRadius: 14, padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <Icon size={18} color="#7C5CFC" />
                    <div style={{ color: '#fff', fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{value}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tabs */}
            {data.profile && (
              <>
                <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 0, overflowX: 'auto' }}>
                  {([
                    ['applications', FileText,   'My Applications'],
                    ['billing',      CreditCard,  'Billing & Invoices'],
                    ['vault',        FolderLock,  'Document Vault'],
                    ['activity',     Clock,       'Recent Activity'],
                  ] as const).map(([key, Icon, label]) => (
                    <button key={key} onClick={() => setActiveTab(key)}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: 'none', border: 'none', borderBottom: activeTab === key ? '2px solid #5B35D5' : '2px solid transparent', color: activeTab === key ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: 14, fontWeight: activeTab === key ? 600 : 400, cursor: 'pointer', transition: 'color .2s', marginBottom: -1, whiteSpace: 'nowrap' }}>
                      <Icon size={15} /> {label}
                    </button>
                  ))}
                </div>

                {/* Applications tab */}
                {activeTab === 'applications' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {data.requests.length === 0 ? (
                      <EmptyState icon={FileText} title="No applications yet" desc="Your registration requests will appear here once submitted." />
                    ) : data.requests.map(req => {
                      const sc = STATUS_COLORS[req.status] ?? STATUS_COLORS['Pending']
                      return (
                        <div key={req.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(91,53,213,0.15)', borderRadius: 14, padding: '20px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                            <span style={{ color: '#fff', fontSize: 15, fontWeight: 600 }}>{req.type}</span>
                            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, fontFamily: 'monospace' }}>{req.trackingNumber}</span>
                            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{fmtDate(req.submittedAt)}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: sc.bg, border: `1px solid ${sc.dot}30`, borderRadius: 20, padding: '5px 12px', flexShrink: 0 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: sc.dot }} />
                            <span style={{ color: sc.text, fontSize: 12, fontWeight: 600 }}>{req.status}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Billing tab */}
                {activeTab === 'billing' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {data.billing.length === 0 ? (
                      <EmptyState icon={CreditCard} title="No invoices yet" desc="Your billing records and invoices will appear here." />
                    ) : data.billing.map(b => {
                      const statusColor = INVOICE_COLORS[b.invoiceStatus] ?? '#94a3b8'
                      return (
                        <div key={b.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(91,53,213,0.15)', borderRadius: 14, padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>{fmtDate(b.issuedAt)}</span>
                            <span style={{ color: statusColor, fontSize: 12, fontWeight: 600 }}>{b.invoiceStatus}</span>
                          </div>
                          <span style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{fmtAmount(b.amount, b.currency)}</span>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Document Vault tab */}
                {activeTab === 'vault' && (
                  <div>
                    {/* Vault header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: '16px 20px', background: 'rgba(91,53,213,0.08)', border: '1px solid rgba(91,53,213,0.2)', borderRadius: 14 }}>
                      <div style={{ width: 40, height: 40, background: 'rgba(91,53,213,0.2)', border: '1px solid rgba(91,53,213,0.35)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <ShieldCheck size={20} color="#A78BFA" />
                      </div>
                      <div>
                        <p style={{ color: '#fff', fontSize: 15, fontWeight: 700, margin: 0 }}>Compliance Document Vault</p>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: '2px 0 0' }}>
                          {docs.length === 0 ? 'No documents assigned yet' : `${docs.length} document${docs.length !== 1 ? 's' : ''} available`}
                        </p>
                      </div>
                    </div>

                    {docs.length === 0 ? (
                      <VaultEmptyState />
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(91,53,213,0.12)', borderRadius: 14, overflow: 'hidden' }}>

                        {/* Table header */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 16, padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}>
                          {['Document Name', 'Category', 'Uploaded', 'Action'].map((h) => (
                            <span key={h} style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
                          ))}
                        </div>

                        {/* Rows */}
                        {docs.map((doc, idx) => {
                          const typeClr = DOC_TYPE_COLORS[doc.fileType] ?? { bg: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.6)', border: 'rgba(255,255,255,0.15)' }
                          return (
                            <div key={doc.id}
                              style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: idx < docs.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', transition: 'background .15s' }}
                              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'}
                              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                            >
                              {/* Name */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                                <div style={{ width: 36, height: 36, background: 'rgba(91,53,213,0.12)', border: '1px solid rgba(91,53,213,0.25)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <FileText size={16} color="#A78BFA" />
                                </div>
                                <span style={{ color: '#fff', fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.fileName}</span>
                              </div>

                              {/* Category pill */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: typeClr.bg, border: `1px solid ${typeClr.border}`, borderRadius: 20, padding: '4px 10px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                                <Tag size={11} color={typeClr.text} />
                                <span style={{ color: typeClr.text, fontSize: 11, fontWeight: 600 }}>{doc.fileType}</span>
                              </div>

                              {/* Date */}
                              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, whiteSpace: 'nowrap', flexShrink: 0 }}>{fmtDate(doc.uploadedAt)}</span>

                              {/* Download button */}
                              <a
                                href={doc.fileUrl}
                                download
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'linear-gradient(135deg,#2D1580,#5B35D5)', border: '1px solid rgba(91,53,213,0.4)', borderRadius: 8, color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none', transition: 'opacity .2s', flexShrink: 0 }}
                                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.8'}
                                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
                              >
                                <Download size={13} />
                                Download PDF
                              </a>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Activity tab */}
                {activeTab === 'activity' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {data.requests.length === 0 ? (
                      <EmptyState icon={Clock} title="No recent activity" desc="Status updates and changes will appear here." />
                    ) : data.requests.map(req => {
                      const sc = STATUS_COLORS[req.status] ?? STATUS_COLORS['Pending']
                      return (
                        <div key={req.id} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: sc.bg, border: `1px solid ${sc.dot}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: sc.dot }} />
                          </div>
                          <div style={{ flex: 1, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 10 }}>
                            <div style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>{req.type} — <span style={{ color: sc.text }}>{req.status}</span></div>
                            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 2 }}>{fmtDate(req.submittedAt)} · {req.trackingNumber}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </>
            )}

            {/* No profile — onboarding CTA */}
            {!data.profile && (
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(91,53,213,0.2)', borderRadius: 20, padding: '48px 36px', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
                <div style={{ width: 56, height: 56, background: 'rgba(91,53,213,0.15)', border: '1px solid rgba(91,53,213,0.3)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <FileText size={24} color="#7C5CFC" />
                </div>
                <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: '0 0 10px' }}>No profile linked yet</h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, margin: '0 0 28px', lineHeight: 1.7 }}>
                  Your account hasn&apos;t been linked to a client profile. Contact our team to get your applications and billing set up.
                </p>
                <a href="mailto:info@flowtechafrica.co.za?subject=Portal Access Request"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'linear-gradient(135deg,#2D1580,#5B35D5)', color: '#fff', borderRadius: 10, textDecoration: 'none', fontSize: 14, fontWeight: 600, boxShadow: '0 4px 20px rgba(91,53,213,0.3)' }}>
                  <Mail size={15} /> Contact Support
                  <ChevronRight size={14} />
                </a>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

// ── Empty state helpers ────────────────────────────────────────────────────────

function EmptyState({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px', color: 'rgba(255,255,255,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <Icon size={32} color="rgba(91,53,213,0.4)" />
      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 13, maxWidth: 320 }}>{desc}</div>
    </div>
  )
}

function VaultEmptyState() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '56px 24px', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(91,53,213,0.25)', borderRadius: 14, textAlign: 'center' }}>
      {/* Layered icon */}
      <div style={{ position: 'relative', width: 64, height: 64 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(91,53,213,0.12)', borderRadius: 18, border: '1px solid rgba(91,53,213,0.25)' }} />
        <div style={{ position: 'absolute', inset: 6, background: 'rgba(91,53,213,0.18)', borderRadius: 14, border: '1px solid rgba(91,53,213,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FolderLock size={24} color="#A78BFA" />
        </div>
      </div>
      <div>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, fontWeight: 700, margin: '0 0 6px' }}>
          Vault is empty
        </p>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, margin: 0, maxWidth: 300, lineHeight: 1.6 }}>
          No compliance documents have been assigned to your account yet. Contact your FlowTech consultant for assistance.
        </p>
      </div>
      <a
        href="mailto:info@flowtechafrica.co.za?subject=Document Vault Request"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'rgba(91,53,213,0.15)', border: '1px solid rgba(91,53,213,0.3)', borderRadius: 8, color: '#A78BFA', fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'background .2s' }}
      >
        <Mail size={14} /> Request Documents
      </a>
    </div>
  )
}
