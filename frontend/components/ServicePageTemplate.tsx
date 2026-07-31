'use client'
import Link from 'next/link'
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

export default function ServicePageTemplate({ service }: { service: ServiceDefinition }) {
  const Icon = ICONS[service.icon] ?? Code

  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#08050F] via-[#11091E] to-[#1A0A38] px-6 pb-20 pt-28 text-center sm:px-16 sm:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 90% 70% at 50% -10%, ${service.color}40 0%, transparent 60%)` }}
        />
        <Container className="relative z-[1] max-w-3xl">
          <Link
            href="/services"
            className="mb-8 inline-flex items-center gap-2 rounded-control text-[13px] text-white/50 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            All Services
          </Link>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div
              className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-control backdrop-blur-md"
              style={{ background: `${service.color}20`, border: `1px solid ${service.color}40`, color: service.color }}
              aria-hidden="true"
            >
              <Icon size={26} />
            </div>
            <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: service.color }}>
              Services
            </span>
            <h1 className="mb-5 font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-white">
              {service.title}
            </h1>
            <p className="mx-auto mb-9 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              {service.tagline}
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <Button href="/#contact" size="lg" icon={<ArrowRight size={16} />} iconPosition="right">
                Talk to an Expert
              </Button>
              <Button href="#overview" variant="secondary" size="lg">
                Explore the Service
              </Button>
            </div>
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
            className="relative overflow-hidden rounded-panel bg-gradient-to-br from-[#08050F] to-brand-800 px-6 py-14 text-center sm:px-16 sm:py-16"
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
