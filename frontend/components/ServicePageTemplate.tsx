'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2,
  Code, Sparkles, Cloud, Shield, Settings, Network, Boxes, BarChart3, Lightbulb,
  type LucideIcon,
} from 'lucide-react'
import Footer from '@frontend/components/Footer'
import { Container, Section } from '@frontend/components/ui/Container'
import SectionHeader from '@frontend/components/ui/SectionHeader'
import Card from '@frontend/components/ui/Card'
import Badge from '@frontend/components/ui/Badge'
import Button from '@frontend/components/ui/Button'
import FAQAccordion from '@frontend/components/ui/FAQAccordion'
import type { ServiceDefinition } from '@frontend/data/services'

const ICONS: Record<string, LucideIcon> = {
  Code, Sparkles, Cloud, Shield, Settings, Network, Boxes, BarChart3, Lightbulb,
}

// Brochure illustrations for the services that have a matching one
const HERO_ART: Record<string, string> = {
  'ai-solutions':     '/images/ai-chip.webp',
  'data-analytics':   '/images/ai-chip.webp',
  'cloud-computing':  '/images/cloud.webp',
  'networking':       '/images/network.webp',
  'managed-it-services': '/images/network.webp',
}

export default function ServicePageTemplate({ service }: { service: ServiceDefinition }) {
  const Icon = ICONS[service.icon] ?? Code

  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-white px-6 pb-16 pt-28 sm:px-10 sm:pt-32 lg:px-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full blur-3xl"
          style={{ background: `${service.color}22` }}
        />
        <Container className="relative z-[1] grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[13px] text-ink-400">
              <Link href="/" className="hover:text-brand-600">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/services" className="hover:text-brand-600">Services</Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink-700">{service.navTitle}</span>
            </nav>
            <div
              className="mb-6 flex h-14 w-14 items-center justify-center rounded-control"
              style={{ background: `${service.color}15`, border: `1px solid ${service.color}30`, color: service.color }}
              aria-hidden="true"
            >
              <Icon size={26} />
            </div>
            <h1 className="mb-5 font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-ink-950">
              {service.title}
            </h1>
            <p className="mb-9 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
              {service.tagline}
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Button href="/#contact" size="lg" icon={<ArrowRight size={16} />} iconPosition="right">
                Request a Consultation
              </Button>
              <Button href="#overview" variant="ghost" size="lg">
                Explore the Service
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative mx-auto w-full max-w-[560px]">
            <div className="overflow-hidden rounded-[28px] rounded-tl-[100px] shadow-brand-lg">
              <Image src="/images/workplace.webp" alt="" width={852} height={568} sizes="(min-width: 1024px) 560px, 100vw" priority className="h-[280px] w-full object-cover sm:h-[360px]" />
              <div className="absolute inset-0 rounded-[28px] rounded-tl-[100px]" style={{ background: `linear-gradient(135deg, ${service.color}30, transparent 60%)` }} />
            </div>
            {HERO_ART[service.slug] && (
              <Image src={HERO_ART[service.slug]} alt="" aria-hidden="true" width={640} height={640} sizes="170px" className="absolute -bottom-8 -right-3 w-[150px] animate-[floatBadge_5s_ease-in-out_infinite] drop-shadow-[0_20px_30px_rgba(0,0,0,.3)] sm:w-[170px]" />
            )}
          </motion.div>
        </Container>
      </section>

      {/* Overview */}
      <Section id="overview">
        <Container className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-600">Overview</span>
            <h2 className="mb-5 font-display text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-ink-950">
              {service.overview.heading}
            </h2>
            {service.overview.paragraphs.map((p, i) => (
              <p key={i} className="mb-4 text-base leading-relaxed text-ink-500 last:mb-0">{p}</p>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section bg="tint">
        <Container>
          <SectionHeader align="center" eyebrow="Benefits" title="Why It Matters" className="mx-auto" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map(({ title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Card topAccent className="h-full">
                  <CheckCircle2 size={20} className="mb-4 text-brand-600" style={{ color: service.color }} aria-hidden="true" />
                  <h3 className="mb-2 font-display text-sm font-bold text-ink-950">{title}</h3>
                  <p className="text-xs leading-relaxed text-ink-500">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Technologies */}
      <Section>
        <Container>
          <SectionHeader align="center" eyebrow="Technologies" title="What We Build With" className="mx-auto" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2.5"
          >
            {service.technologies.map(tech => (
              <Badge key={tech} color={service.color}>{tech}</Badge>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Process */}
      <Section bg="tint">
        <Container>
          <SectionHeader align="center" eyebrow="Our Process" title="How We Deliver" className="mx-auto" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map(({ step, title, desc }, i) => (
              <motion.div key={step} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card hoverLift={false} className="h-full">
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-control font-mono text-xs font-bold"
                    style={{ background: `${service.color}15`, border: `1px solid ${service.color}25`, color: service.color }}
                  >
                    {step}
                  </div>
                  <h3 className="mb-2 font-display text-sm font-bold text-ink-950">{title}</h3>
                  <p className="text-xs leading-relaxed text-ink-500">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Case Studies */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Case Studies"
            title="Representative Engagements"
            subtitle="Illustrative examples of our delivery approach. Client details withheld under confidentiality."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {service.caseStudies.map(({ title, category, desc, scope }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card topAccent className="h-full">
                  <Badge color={service.color} size="sm" className="mb-4">{category}</Badge>
                  <h3 className="mb-2 font-display text-lg font-bold text-ink-950">{title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-ink-500">{desc}</p>
                  <ul className="flex flex-wrap gap-1.5 p-0">
                    {scope.map(s => (
                      <li key={s} className="rounded-control border border-ink-950/10 bg-ink-100 px-2.5 py-1 text-[11px] text-ink-700">{s}</li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section bg="tint">
        <Container className="max-w-3xl">
          <SectionHeader align="center" eyebrow="FAQ" title="Common Questions" className="mx-auto" />
          <FAQAccordion items={service.faq} />
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section>
        <Container className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative overflow-hidden rounded-panel bg-gradient-to-br from-[#2D1580] to-brand-600 px-6 py-14 text-center sm:px-16 sm:py-16"
          >
            <h2 className="mb-4 font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.1] tracking-tight text-white">
              Ready to talk {service.navTitle.toLowerCase()}?
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
              Tell us about your requirements — our team will get back to you within one business day with a no-obligation consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <Button href="/#contact" size="lg" icon={<ArrowUpRight size={16} />} iconPosition="right">
                Get in Touch
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                Explore Other Services
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
