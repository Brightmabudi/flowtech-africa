'use client'
import { useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Award, ChevronDown, ArrowRight } from 'lucide-react'
import { Container } from '@frontend/components/ui/Container'
import { cn } from '@frontend/lib/cn'

// ── Link data ─────────────────────────────────────────────────────────────────
// Every href below points at a real, existing route or anchor. Where FlowTech
// doesn't yet have a dedicated page for an item, it falls back to the closest
// real listing page (marked TODO) rather than a dead link.

const SOLUTIONS = [
  { label: 'Digital Business Platform', href: '/services' },                    // TODO: no dedicated page yet
  { label: 'Recruitment Management',    href: '/services' },                    // TODO: no dedicated page yet
  { label: 'Document Management',       href: '/services' },                    // TODO: no dedicated page yet
  { label: 'HR Solutions',              href: '/services' },                    // TODO: no dedicated page yet
  { label: 'AI Solutions',              href: '/services/ai-solutions' },
  { label: 'Cloud Solutions',           href: '/services/cloud-computing' },
  { label: 'Custom Software',           href: '/services/software-development' },
]

const SERVICES = [
  { label: 'Software Development',   href: '/services/software-development' },
  { label: 'Cloud & Infrastructure', href: '/services/cloud-computing' },
  { label: 'Cybersecurity',          href: '/services/cyber-security' },
  { label: 'Systems Integration',    href: '/services' },                       // TODO: no dedicated page yet
  { label: 'Managed ICT Services',   href: '/services/managed-it-services' },
  { label: 'Data & Analytics',       href: '/services/data-analytics' },
  { label: 'IT Consulting',          href: '/services/digital-transformation' },
]

const COMPANY = [
  { label: 'About Us',     href: '/#about' },
  { label: 'Our Purpose',  href: '/#purpose' },
  { label: 'Our Approach', href: '/#approach' },
  { label: 'Partners',     href: '/' },                                        // TODO: no dedicated page yet
  { label: 'Case Studies', href: '/#case-studies' },
  { label: 'News',         href: '/' },                                        // TODO: no news/blog yet
  { label: 'Contact',      href: '/#contact' },
]

const CAREERS_LINKS = [
  { label: 'Careers',             href: '/careers' },
  { label: 'Graduate Programme',  href: '/careers' },                          // TODO: no dedicated page yet
  { label: 'Available Positions', href: '/careers' },
  { label: 'Submit CV',           href: 'mailto:michellef@flowtech.africa?subject=Speculative Application — FlowTech Africa' },
  { label: 'Life at FlowTech',    href: '/careers' },                          // TODO: no dedicated page yet
]

const CREDENTIALS = ['Level 1 B-BBEE', 'ISO 27001', 'ISO 9001', 'COBIT 5', 'ITIL v4']

// ── Animated-underline link ──────────────────────────────────────────────────

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith('mailto:') || href.startsWith('tel:')
  const className = 'group/link relative inline-flex w-fit items-center text-[13px] text-white/55 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 focus-visible:rounded-control'
  const underline = (
    <span aria-hidden="true" className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-brand-400 to-accent-400 transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
  )
  if (isExternal) {
    return <a href={href} className={className}>{children}{underline}</a>
  }
  return <Link href={href} className={className}>{children}{underline}</Link>
}

// ── Column (accordion on mobile, static on desktop) ──────────────────────────

interface FooterColumnProps {
  title: string
  links: { label: string; href: string }[]
  defaultOpen?: boolean
}

function FooterColumn({ title, links, defaultOpen = false }: FooterColumnProps) {
  const [open, setOpen] = useState(defaultOpen)
  const idPrefix = useId()
  const reducedMotion = useReducedMotion()
  const panelId = `${idPrefix}-panel`
  const buttonId = `${idPrefix}-button`

  const list = (
    <ul className="flex list-none flex-col gap-3 p-0 m-0">
      {links.map(({ label, href }) => (
        <li key={label}><FooterLink href={href}>{label}</FooterLink></li>
      ))}
    </ul>
  )

  return (
    <div className="border-b border-white/[0.06] py-5 lg:border-none lg:py-0">
      {/* Mobile: accordion trigger */}
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between gap-4 text-left font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/85 lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 focus-visible:rounded-control"
      >
        {title}
        <ChevronDown size={16} aria-hidden="true" className={cn('flex-shrink-0 text-white/40 transition-transform duration-300', open && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <div className="pt-4">{list}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop: always visible */}
      <h3 className="mb-5 hidden font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/85 lg:block">
        {title}
      </h3>
      <div className="hidden lg:block">{list}</div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#08050F] px-5 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
      {/* Subtle animated gradient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [animation:heroGradientDrift_24s_ease-in-out_infinite] bg-[length:160%_160%]"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 10% 0%,rgba(91,53,213,.18) 0%,transparent 55%), radial-gradient(ellipse 50% 40% at 95% 100%,rgba(232,64,26,.08) 0%,transparent 50%)' }}
      />

      <Container className="relative z-[1] max-w-[1400px]">

        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-7 lg:gap-x-10">

          {/* Column 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="col-span-1 border-b border-white/[0.06] pb-6 sm:col-span-2 sm:pb-8 lg:col-span-2 lg:border-none lg:pb-0"
          >
            <Link href="/" className="mb-5 inline-block rounded-control focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              <Image src="/logo-light.png" alt="FlowTech Africa" width={172} height={46} className="h-[46px] w-auto object-contain" />
            </Link>
            <p className="mb-6 max-w-[300px] text-[13px] leading-relaxed text-white/55">
              A proudly South African ICT company delivering enterprise technology solutions across Africa.
            </p>
            {/* Full contact details live in the Contact column — not repeated here */}
            <div className="flex flex-wrap gap-2">
              {CREDENTIALS.map(c => (
                <span key={c} className="flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] text-white/60">
                  <Award size={10} aria-hidden="true" /> {c}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Column 2 — Solutions */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.05 }} className="lg:col-span-1">
            <FooterColumn title="Solutions" links={SOLUTIONS} />
          </motion.div>

          {/* Column 3 — Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-1">
            <FooterColumn title="Services" links={SERVICES} />
          </motion.div>

          {/* Column 4 — Company */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.15 }} className="lg:col-span-1">
            <FooterColumn title="Company" links={COMPANY} />
          </motion.div>

          {/* Column 5 — Careers */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-1">
            <FooterColumn title="Careers" links={CAREERS_LINKS} />
          </motion.div>

          {/* Column 6 — Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="py-5 lg:col-span-1 lg:py-0"
          >
            <h3 className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/85">
              Contact
            </h3>
            <div className="mb-6 flex flex-col gap-3.5">
              <div className="flex items-start gap-2.5 text-[13px] leading-relaxed text-white/55">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-accent-400" aria-hidden="true" />
                <span>Faerie Glen, Pretoria</span>
              </div>
              <div className="flex items-start gap-2.5 text-[13px] leading-relaxed text-white/55">
                <Phone size={14} className="mt-0.5 flex-shrink-0 text-accent-400" aria-hidden="true" />
                <span>012 881 1930</span>
              </div>
              <div className="flex items-start gap-2.5 text-[13px] leading-relaxed text-white/55">
                <Mail size={14} className="mt-0.5 flex-shrink-0 text-accent-400" aria-hidden="true" />
                <span className="break-all">michellef@flowtech.africa</span>
              </div>
              <div className="flex items-start gap-2.5 text-[13px] leading-relaxed text-white/55">
                <Clock size={14} className="mt-0.5 flex-shrink-0 text-accent-400" aria-hidden="true" />
                <span>Mon&ndash;Fri: 08:00&ndash;17:00 SAST<br />24/7 NOC &amp; Helpdesk Support</span>
              </div>
            </div>
            <Link
              href="/#contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-control bg-gradient-to-br from-brand-600 to-brand-800 px-5 py-3 text-sm font-semibold text-white shadow-brand-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-brand-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:w-auto"
            >
              Talk to Our Experts
              <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

        </div>

        {/* Bottom bar — certifications live in column 1 only, not repeated here */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/[0.06] pt-7 sm:flex-row sm:justify-between lg:mt-16">
          <p className="text-center font-mono text-[11px] text-white/45 sm:text-left">
            &copy; {new Date().getFullYear()} FlowTech Africa (Pty) Ltd.<br className="sm:hidden" /> All Rights Reserved.
          </p>

          {/*
            Social links intentionally omitted: no verified official FlowTech Africa
            social accounts were confirmed. Add here once real URLs are provided —
            e.g. { icon: Linkedin, href: 'https://linkedin.com/company/...' }.
          */}
        </div>

      </Container>
    </footer>
  )
}
