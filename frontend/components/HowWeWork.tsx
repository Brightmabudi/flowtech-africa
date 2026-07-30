'use client'
import { motion } from 'framer-motion'
import { GraduationCap, Lightbulb, Code, HeadphonesIcon } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import ServiceCardGrid, { type ServiceCardItem } from '@frontend/components/ui/ServiceCardGrid'
import GradientCTABanner from '@frontend/components/ui/GradientCTABanner'

const SERVICES: ServiceCardItem[] = [
  { icon: <Code size={24} />,           color: '#5B35D5', title: 'Software Development & Business Solutions', desc: 'Delivering secure, adaptable, and tailor-made software solutions designed to streamline operations, automate workflows, and drive innovation.', tags: ['Custom Software', 'Automation', 'Integration', 'Secure Design'], learnMoreHref: '#contact' },
  { icon: <Lightbulb size={24} />,      color: '#E8401A', title: 'Consulting Services',                       desc: 'Guiding businesses with over 20 years of expertise in process design, change management, and strategic consulting to unlock growth and efficiency.', tags: ['Process Design', 'Change Management', 'Strategy', 'Growth'], learnMoreHref: '#contact' },
  { icon: <GraduationCap size={24} />,  color: '#0EA5E9', title: 'Training Services',                         desc: 'Empowering teams through customized training programs that blend theory with practice, enabling staff to work smarter, faster, and more effectively.', tags: ['Team Training', 'Theory & Practice', 'Upskilling', 'Enablement'], learnMoreHref: '#contact' },
  { icon: <HeadphonesIcon size={24} />, color: '#10B981', title: 'Support',                                    desc: 'Providing proactive IT support and ongoing assistance to ensure business continuity, minimize downtime, and keep systems running at peak performance.', tags: ['Proactive Support', 'Business Continuity', 'Uptime', 'Assistance'], learnMoreHref: '#contact' },
]

const STEPS = [
  { step: '01', label: 'Understand your requirements',  color: '#5B35D5' },
  { step: '02', label: 'Propose a suitable solution',   color: '#E8401A' },
  { step: '03', label: 'Deliver and support long-term', color: '#10B981' },
]

export default function HowWeWork() {
  return (
    <Section bg="tint">
      <Container>
        <div className="mb-16 grid grid-cols-1 items-center gap-10 lg:mb-20 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65 }}>
            <span className="mb-3.5 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-600">
              A Solutions Driven Company
            </span>
            <h2 className="mb-4 font-display text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-tight text-ink-950">
              Understanding You{' '}
              <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">Before We Build</span>
            </h2>
            <p className="text-base leading-relaxed text-ink-500">
              FlowTech Africa is a solutions driven company. We believe in understanding our client requirements first, and only then do we propose a suitable solution. We have structured our company to provide both product-solutions and services-solutions.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {STEPS.map(({ step, label, color }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="flex items-center gap-4 rounded-card border border-brand-600/10 bg-white p-5 shadow-brand-sm"
              >
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-control font-mono text-xs font-bold"
                  style={{ background: `${color}15`, border: `1px solid ${color}25`, color }}
                >
                  {step}
                </div>
                <div className="font-display text-sm font-semibold text-ink-950">{label}</div>
                <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: color }} />
              </motion.div>
            ))}
          </div>
        </div>

        <ServiceCardGrid items={SERVICES} showProgress />

        <div className="mt-12">
          <GradientCTABanner
            heading="Ready to find the right solution for your business?"
            body="Let us understand your requirements first — then we'll propose what fits best."
            ctaLabel="Talk to Us"
            ctaHref="#contact"
          />
        </div>
      </Container>
    </Section>
  )
}
