'use client'
import Link from 'next/link'
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
        <Container className="max-w-3xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 rounded-control text-[13px] text-ink-400 transition-colors hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to FlowTech Africa
          </Link>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-600">Our Services</span>
            <h1 className="mb-5 font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-ink-950">
              Enterprise ICT, End to End
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
              Nine core service areas covering every dimension of modern ICT — delivered with local expertise and global standards.
            </p>
          </motion.div>
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
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
