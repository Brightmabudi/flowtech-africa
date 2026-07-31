'use client'
import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import SectionHeader from '@frontend/components/ui/SectionHeader'
import Button from '@frontend/components/ui/Button'

const INFO = [
  { icon: <MapPin size={15} />, title: 'HEAD OFFICE', body: 'Unit 3, Boardwalk office park\n107 Boardwalk Blvd, Faerie Glen, Pretoria, 0034' },
  { icon: <Phone size={15} />,  title: 'PHONE',        body: '012 881 1930' },
  { icon: <Mail size={15} />,   title: 'EMAIL',        body: 'michellef@flowtech.africa' },
  { icon: <Clock size={15} />,  title: 'SUPPORT',      body: '24/7 NOC & Helpdesk\nRound-the-clock human support' },
]

const inputClass = 'w-full rounded-control border border-brand-600/15 bg-ink-50 px-4 py-3 font-sans text-sm text-ink-950 outline-none transition-shadow focus:border-brand-600 focus:shadow-[0_0_0_3px_rgba(91,53,213,.15)]'
const labelClass = 'font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-950/40'

const Req = () => <span aria-hidden="true" className="ml-0.5 text-accent-600">*</span>

const INITIAL_FORM = { firstName: '', lastName: '', email: '', phone: '', companySize: '1 - 50 employees', service: 'Cloud Infrastructure', message: '' }

export default function Contact() {
  const idPrefix = useId()
  const [form, setForm]       = useState(INITIAL_FORM)
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [website, setWebsite] = useState('') // honeypot: hidden from real visitors, bots tend to fill it in
  const [renderedAt]          = useState(() => Date.now())

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website, renderedAt }),
      })
      const data = await res.json()
      if (data.success) setSent(true)
      else setError(data.error || 'Failed to send. Please email us directly at michellef@flowtech.africa')
    } catch {
      setError('Failed to send. Please email us directly at michellef@flowtech.africa')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section id="contact" bg="tint">
      <Container>
        <SectionHeader
          eyebrow="Get In Touch"
          title={<>Let us Build Something{' '}<span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">Extraordinary</span></>}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-14">

          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            <p className="mb-7 text-[15px] leading-relaxed text-ink-500">
              Whether you need a quick quote, a full solution design, or just want to understand what is possible for your organisation — our team is here.
            </p>
            <div className="flex flex-col gap-3.5">
              {INFO.map(({ icon, title, body }) => (
                <div key={title} className="flex items-start gap-3.5 rounded-card border border-brand-600/10 bg-white p-[18px] shadow-brand-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/30">
                  <div className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-control border border-brand-600/15 bg-gradient-to-br from-brand-800/10 to-accent-500/10 text-brand-600" aria-hidden="true">
                    {icon}
                  </div>
                  <div>
                    <h3 className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wide text-accent-600">{title}</h3>
                    <p className="whitespace-pre-line text-[13px] leading-relaxed text-ink-700">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 overflow-hidden rounded-card border border-brand-600/15 shadow-brand-sm">
              <iframe
                title="FlowTech Africa office location"
                src="https://maps.google.com/maps?q=Unit+3+Boardwalk+Office+Park+107+Boardwalk+Blvd+Faerie+Glen+Pretoria+0034+South+Africa&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="220"
                className="block border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://maps.google.com/maps?q=Unit+3+Boardwalk+Office+Park+107+Boardwalk+Blvd+Faerie+Glen+Pretoria+0034+South+Africa"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border-t border-brand-600/10 bg-white px-4 py-2.5 transition-colors hover:bg-brand-600/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                <MapPin size={14} className="flex-shrink-0 text-brand-600" aria-hidden="true" />
                <span className="text-xs font-semibold text-brand-600">Get Directions</span>
                <span className="ml-auto text-[11px] text-ink-400">Unit 3, Boardwalk office park · Faerie Glen, Pretoria</span>
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="rounded-card border border-brand-600/10 bg-white p-6 shadow-brand-md sm:p-10">
              <h3 className="mb-7 font-display text-xl font-bold tracking-tight text-ink-950">Send us a message</h3>

              {sent ? (
                <div className="rounded-card border border-emerald-500/20 bg-emerald-500/[0.06] p-8 text-center">
                  <div className="mb-4 text-5xl" aria-hidden="true">✅</div>
                  <div className="mb-2 font-display text-xl font-bold text-ink-950">Message Sent!</div>
                  <p className="text-sm leading-relaxed text-ink-500">A FlowTech consultant will contact you within one business day.</p>
                  <button
                    onClick={() => { setSent(false); setForm(INITIAL_FORM) }}
                    className="mt-5 rounded-control border border-brand-600/30 px-6 py-2.5 text-[13px] font-semibold text-brand-600 transition-colors hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate={false}>
                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-px w-px opacity-0"
                  />
                  <p className="mb-3 font-mono text-[11px] text-ink-950/40">
                    Fields marked <span className="text-accent-600">*</span> are required
                  </p>
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div className="mb-4 flex flex-col gap-1.5">
                      <label htmlFor={`${idPrefix}-firstName`} className={labelClass}>First Name<Req /></label>
                      <input id={`${idPrefix}-firstName`} type="text" placeholder="Sipho" required autoComplete="given-name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} className={inputClass} />
                    </div>
                    <div className="mb-4 flex flex-col gap-1.5">
                      <label htmlFor={`${idPrefix}-lastName`} className={labelClass}>Last Name<Req /></label>
                      <input id={`${idPrefix}-lastName`} type="text" placeholder="Nkosi" required autoComplete="family-name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} className={inputClass} />
                    </div>
                  </div>
                  <div className="mb-4 flex flex-col gap-1.5">
                    <label htmlFor={`${idPrefix}-email`} className={labelClass}>Work Email<Req /></label>
                    <input id={`${idPrefix}-email`} type="email" placeholder="sipho@company.co.za" required autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} />
                  </div>
                  <div className="mb-4 flex flex-col gap-1.5">
                    <label htmlFor={`${idPrefix}-phone`} className={labelClass}>
                      Cell Phone Number <span className="font-normal normal-case tracking-normal text-ink-950/35">(optional)</span>
                    </label>
                    <input id={`${idPrefix}-phone`} type="tel" placeholder="+27 xx xxx xxxx" autoComplete="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div className="mb-4 flex flex-col gap-1.5">
                      <label htmlFor={`${idPrefix}-companySize`} className={labelClass}>Company Size<Req /></label>
                      <select id={`${idPrefix}-companySize`} value={form.companySize} onChange={e => setForm({ ...form, companySize: e.target.value })} className={`${inputClass} text-ink-500`}>
                        <option>1 - 50 employees</option>
                        <option>51 - 200 employees</option>
                        <option>201 - 1000 employees</option>
                        <option>1000+ employees</option>
                      </select>
                    </div>
                    <div className="mb-4 flex flex-col gap-1.5">
                      <label htmlFor={`${idPrefix}-service`} className={labelClass}>Service Interest<Req /></label>
                      <select id={`${idPrefix}-service`} value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} className={`${inputClass} text-ink-500`}>
                        <option>Cloud Infrastructure</option>
                        <option>Cybersecurity / SOC</option>
                        <option>Managed IT Services</option>
                        <option>Network & Connectivity</option>
                        <option>Data & Analytics</option>
                        <option>Digital Transformation</option>
                        <option>Software Development</option>
                        <option>Consulting Services</option>
                        <option>Training Services</option>
                        <option>Support</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4 flex flex-col gap-1.5">
                    <label htmlFor={`${idPrefix}-message`} className={labelClass}>Message<Req /></label>
                    <textarea id={`${idPrefix}-message`} placeholder="Tell us about your challenge or project..." required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className={`${inputClass} min-h-[120px] resize-y`} />
                  </div>
                  {error && (
                    <div role="alert" className="mb-4 rounded-control border border-accent-500/20 bg-accent-500/[0.08] p-3.5 text-[13px] text-accent-600">
                      {error}
                    </div>
                  )}
                  <Button type="submit" loading={loading} className="w-full">
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  )
}
