'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight,
  Code, Sparkles, Cloud, Shield, Settings, Network, Boxes, BarChart3, Lightbulb,
  type LucideIcon,
} from 'lucide-react'
import Footer from '@frontend/components/Footer'
import { Container, Section } from '@frontend/components/ui/Container'
import Card from '@frontend/components/ui/Card'
import { SERVICES } from '@frontend/data/services'

const ICONS: Record<string, LucideIcon> = {
  Code, Sparkles, Cloud, Shield, Settings, Network, Boxes, BarChart3, Lightbulb,
}

export default function ServicesIndexView() {
  return (
    <main className="min-h-screen bg-white">
      <Section className="!pb-10 !pt-28 sm:!pt-32">
        <Container>
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 rounded-control text-[13px] text-ink-400 transition-colors hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to FlowTech Africa
          </Link>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-600">Our Services</span>
              <h1 className="mb-5 font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-ink-950">
                Enterprise ICT, <span className="text-brand-600">end to end.</span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
                End-to-end digital solutions designed to optimise operations and deliver impactful outcomes, with local expertise and global standards.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative mx-auto w-full max-w-[560px]">
              <div className="overflow-hidden rounded-[28px] rounded-tl-[100px] shadow-brand-lg">
                <Image src="/images/workplace.webp" alt="" width={852} height={568} sizes="(min-width: 1024px) 560px, 100vw" priority className="h-[260px] w-full object-cover sm:h-[320px]" />
              </div>
              <Image src="/images/network.webp" alt="" aria-hidden="true" width={640} height={543} sizes="150px" className="absolute -bottom-6 -right-3 w-[130px] animate-[floatBadge_5s_ease-in-out_infinite] drop-shadow-[0_20px_30px_rgba(0,0,0,.3)]" />
            </motion.div>
          </div>
        </Container>
      </Section>

      <Section className="!pt-6">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = ICONS[service.icon] ?? Code
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.4) }}
                >
                  <Link href={`/services/${service.slug}`} className="block h-full rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
                    <Card topAccent className="h-full">
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-control"
                        style={{ background: `${service.color}15`, border: `1px solid ${service.color}25`, color: service.color }}
                        aria-hidden="true"
                      >
                        <Icon size={24} />
                      </div>
                      <h2 className="mb-2 font-display text-base font-bold text-ink-950">{service.navTitle}</h2>
                      <p className="mb-4 text-sm leading-relaxed text-ink-500">{service.tagline}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600">
                        Learn more <ArrowRight size={12} aria-hidden="true" />
                      </span>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-panel bg-gradient-to-r from-[#2D1580] via-brand-700 to-[#4A2AB0] px-7 py-7 sm:flex-row sm:items-center sm:px-10">
          <p className="font-display text-lg font-bold text-white sm:text-xl">Let's build what's next. Together.</p>
          <a href="/#contact" className="inline-flex items-center gap-2 rounded-control border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/20">
            Contact Us <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
