'use client'
import { motion } from 'framer-motion'
import { MapPin, Zap, Lock, Headphones } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import SectionHeader from '@frontend/components/ui/SectionHeader'
import Card from '@frontend/components/ui/Card'

const WHY = [
  {
    icon: <MapPin size={24} />, color: '#E8401A',
    title: 'African-First Approach',
    sub: 'We design solutions for African infrastructure realities — load-shedding resilience, bandwidth constraints, multi-currency, and local compliance built in by default.',
  },
  {
    icon: <Zap size={24} />, color: '#5B35D5',
    title: 'Speed to Value',
    sub: 'From contract signature to live environment in under 30 days. Our proven deployment frameworks eliminate the lengthy timelines typical of large integrators.',
  },
  {
    icon: <Lock size={24} />, color: '#0EA5E9',
    title: 'Security by Design',
    sub: 'Every solution we deliver is architected with zero-trust principles from day one. Security is not an add-on — it is baked into every layer of our stack.',
  },
  {
    icon: <Headphones size={24} />, color: '#10B981',
    title: '24/7 Human Support',
    sub: 'Real engineers, not bots. Our NOC and helpdesk teams operate around the clock from Johannesburg and Cape Town, with an average first response of under 15 minutes.',
  },
]

export default function WhyUs() {
  return (
    <Section bg="tint">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Why FlowTech Africa"
          title="The FlowTech Difference"
          subtitle="Four reasons 500+ organisations across Africa choose us as their ICT partner."
          className="mx-auto"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map(({ icon, color, title, sub }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, delay: i * 0.1 }}>
              <Card topAccent className="h-full text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-control" style={{ background: `${color}15`, border: `1px solid ${color}25`, color }} aria-hidden="true">
                  {icon}
                </div>
                <h3 className="mb-2 font-display text-base font-bold text-ink-950">{title}</h3>
                <p className="text-sm leading-relaxed text-ink-500">{sub}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
