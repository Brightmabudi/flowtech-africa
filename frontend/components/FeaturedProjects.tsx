'use client'
import { motion } from 'framer-motion'
import { Cloud, Shield, Network, BarChart3 } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import SectionHeader from '@frontend/components/ui/SectionHeader'
import Card from '@frontend/components/ui/Card'
import Badge from '@frontend/components/ui/Badge'

const PROJECTS = [
  {
    icon: <Cloud size={22} />, color: '#5B35D5', category: 'Cloud Infrastructure',
    title: 'Enterprise Hybrid Cloud Migration',
    desc: 'A phased migration of on-premise workloads to a hybrid cloud environment, designed around zero-downtime cutover and African bandwidth realities.',
    scope: ['Workload assessment', 'Phased cutover', 'Cost optimisation'],
  },
  {
    icon: <Shield size={22} />, color: '#E8401A', category: 'Cybersecurity',
    title: '24/7 Managed Security Operations',
    desc: 'Continuous SOC monitoring, threat detection, and incident response deployed to bring mean-time-to-respond down across a distributed enterprise estate.',
    scope: ['SOC deployment', 'Threat monitoring', 'Incident response'],
  },
  {
    icon: <Network size={22} />, color: '#0EA5E9', category: 'Network & Connectivity',
    title: 'Multi-Site Network Modernisation',
    desc: 'SD-WAN rollout across a large multi-country store and branch network, replacing legacy MPLS links with resilient, centrally-managed connectivity.',
    scope: ['SD-WAN rollout', 'Multi-country delivery', 'Centralised monitoring'],
  },
  {
    icon: <BarChart3 size={22} />, color: '#F5C842', category: 'Data & Analytics',
    title: 'Enterprise BI & Analytics Platform',
    desc: 'A boardroom-ready business intelligence platform consolidating fragmented data sources into a single real-time reporting layer.',
    scope: ['Data consolidation', 'Real-time dashboards', 'Self-service reporting'],
  },
]

export default function FeaturedProjects() {
  return (
    <Section id="case-studies">
      <Container>
        <SectionHeader
          eyebrow="Featured Work"
          title="The Kind of Work We Deliver"
          subtitle="Representative engagements illustrating our delivery approach across core service areas. Client details withheld under confidentiality."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {PROJECTS.map(({ icon, color, category, title, desc, scope }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card topAccent className="h-full">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-control" style={{ background: `${color}15`, border: `1px solid ${color}25`, color }} aria-hidden="true">
                    {icon}
                  </div>
                  <Badge color={color} size="sm">{category}</Badge>
                </div>
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
  )
}
