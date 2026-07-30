'use client'
import { motion } from 'framer-motion'
import { Cloud, Lock, Settings, Wifi, Database, Sparkles, TrendingUp } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import SectionHeader from '@frontend/components/ui/SectionHeader'
import Card from '@frontend/components/ui/Card'

const CARDS = [
  {
    span: 'lg:col-span-2', tag: 'FLAGSHIP',
    icon: <Cloud size={32} />, color: '#5B35D5',
    title: 'Hybrid Cloud & Infrastructure',
    sub: 'Seamlessly blend on-premise, private, and public cloud to build an elastic, cost-optimised environment purpose-built for African enterprise.',
    num: '1,247', numLabel: 'active cloud nodes',
  },
  {
    span: '', tag: 'SECURITY',
    icon: <Lock size={26} />, color: '#E8401A',
    title: 'Security Operations',
    sub: '24/7 SOC monitoring, threat hunting, and incident response managed by certified analysts.',
    num: '0', numLabel: 'unresolved threats',
  },
  {
    span: '', tag: 'MANAGED',
    icon: <Settings size={24} />, color: '#0EA5E9',
    title: 'Managed Services',
    sub: 'NOC, helpdesk, and lifecycle management at scale.',
    num: '15min', numLabel: 'avg response SLA',
  },
  {
    span: '', tag: 'NETWORK',
    icon: <Wifi size={24} />, color: '#10B981',
    title: 'Connectivity',
    sub: 'SD-WAN and MPLS across 14 countries.',
    num: '14', numLabel: 'countries connected',
  },
  {
    span: '', tag: 'DATA',
    icon: <Database size={24} />, color: '#F5C842',
    title: 'Data & Analytics',
    sub: 'From raw ingestion to boardroom-ready dashboards.',
    num: '2PB+', numLabel: 'data managed',
  },
  {
    span: 'lg:col-span-2', tag: 'INNOVATION',
    icon: <Sparkles size={26} />, color: '#5B35D5',
    title: 'AI & Intelligent Automation',
    sub: 'Deploy AI-driven workflows, predictive maintenance, and intelligent document processing to unlock operational efficiency across your entire stack.',
    num: '40%', numLabel: 'avg cost reduction',
  },
  {
    span: 'lg:col-span-2', tag: 'GROWTH',
    icon: <TrendingUp size={26} />, color: '#E8401A',
    title: 'Digital Transformation Consulting',
    sub: 'From strategy to execution — we align your technology roadmap with business outcomes, regulatory requirements, and African market realities.',
    num: '100%', numLabel: 'project delivery rate',
  },
]

export default function Solutions() {
  return (
    <Section id="solutions" bg="tint">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Our Solutions"
          title={<>Built for Africa.<br /><span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">Trusted Globally.</span></>}
          subtitle="A complete portfolio spanning cloud, security, connectivity, and intelligence — all under one SLA."
          className="mx-auto"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ span, tag, icon, color, title, sub, num, numLabel }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: Math.min(i * 0.08, 0.4) }}
              className={span}
            >
              <Card topAccent className="h-full">
                <div
                  className="mb-1 inline-block rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em]"
                  style={{ color, background: `${color}14` }}
                >
                  {tag}
                </div>
                <div className="my-3.5" style={{ color }} aria-hidden="true">{icon}</div>
                <h3 className="mb-2 font-display text-lg font-bold text-ink-950">{title}</h3>
                <p className="text-sm leading-relaxed text-ink-500">{sub}</p>
                {num && (
                  <div className="mt-5 flex items-end gap-2">
                    <div className="bg-gradient-to-br from-brand-600 to-accent-500 bg-clip-text font-display text-2xl font-bold leading-none text-transparent">{num}</div>
                    <div className="pb-1 font-mono text-[11px] text-ink-400">{numLabel}</div>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
