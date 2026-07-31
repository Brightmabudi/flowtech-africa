'use client'
import { motion } from 'framer-motion'
import { Mountain, Landmark, ShoppingBag, Building2, HeartPulse, Radio, Factory, Zap } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import SectionHeader from '@frontend/components/ui/SectionHeader'
import Card from '@frontend/components/ui/Card'

const INDUSTRIES = [
  { icon: <Mountain size={22} />,   color: '#5B35D5', title: 'Mining & Resources',        desc: 'Resilient connectivity and systems built for remote-site operational realities.' },
  { icon: <Landmark size={22} />,   color: '#E8401A', title: 'Financial Services',          desc: 'Regulatory-aligned security and uptime for mission-critical banking systems.' },
  { icon: <ShoppingBag size={22} />, color: '#0EA5E9', title: 'Retail & Consumer',          desc: 'Multi-site connectivity and POS reliability across large store networks.' },
  { icon: <Building2 size={22} />,  color: '#10B981', title: 'Government & Public Sector', desc: 'Secure, compliant infrastructure for public service delivery.' },
  { icon: <HeartPulse size={22} />, color: '#F5C842', title: 'Healthcare',                  desc: 'Protecting patient data while keeping critical systems always available.' },
  { icon: <Radio size={22} />,      color: '#5B35D5', title: 'Telecommunications',          desc: 'Network engineering and support at carrier-grade scale.' },
  { icon: <Factory size={22} />,    color: '#E8401A', title: 'Manufacturing',               desc: 'OT/IT convergence, automation, and supply-chain visibility.' },
  { icon: <Zap size={22} />,        color: '#0EA5E9', title: 'Energy & Utilities',          desc: 'Infrastructure resilience for load-shedding and grid realities.' },
]

export default function Industries() {
  return (
    <Section bg="tint">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Industries Served"
          title="Deep Sector Expertise Across Africa"
          subtitle="We design for the operational realities of each industry we work in — not one-size-fits-all IT."
          className="mx-auto"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map(({ icon, color, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.4) }}
            >
              <Card topAccent className="h-full">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-control" style={{ background: `${color}15`, border: `1px solid ${color}25`, color }} aria-hidden="true">
                  {icon}
                </div>
                <h3 className="mb-2 font-display text-sm font-bold text-ink-950">{title}</h3>
                <p className="text-xs leading-relaxed text-ink-500">{desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
