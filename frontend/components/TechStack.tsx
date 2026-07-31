'use client'
import { motion } from 'framer-motion'
import { Cloud, ShieldCheck, Database, Network, GitBranch } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import SectionHeader from '@frontend/components/ui/SectionHeader'
import Card from '@frontend/components/ui/Card'
import Badge from '@frontend/components/ui/Badge'

const STACK = [
  { icon: <Cloud size={22} />,       color: '#5B35D5', title: 'Cloud & Infrastructure', items: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Private Cloud'] },
  { icon: <ShieldCheck size={22} />, color: '#E8401A', title: 'Security & Compliance',   items: ['Zero Trust', 'SIEM', 'SOC', 'Pen Testing', 'ISO 27001'] },
  { icon: <Database size={22} />,    color: '#F5C842', title: 'Data & Analytics',         items: ['Power BI', 'Databricks', 'SQL', 'AI / ML', 'Data Lakes'] },
  { icon: <Network size={22} />,     color: '#0EA5E9', title: 'Network & Connectivity',   items: ['SD-WAN', 'MPLS', 'Fibre', '5G Ready'] },
  { icon: <GitBranch size={22} />,   color: '#10B981', title: 'DevOps & Delivery',         items: ['CI/CD', 'Terraform', 'GitOps', 'ITSM', 'RPA'] },
]

export default function TechStack() {
  return (
    <Section>
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Technology Stack"
          title="Built on the Tools Enterprises Trust"
          subtitle="A modern, vendor-diverse stack — chosen for reliability at scale, not lock-in."
          className="mx-auto"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {STACK.map(({ icon, color, title, items }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card topAccent className="h-full">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-control" style={{ background: `${color}15`, border: `1px solid ${color}25`, color }} aria-hidden="true">
                  {icon}
                </div>
                <h3 className="mb-3 font-display text-sm font-bold text-ink-950">{title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map(item => (
                    <Badge key={item} color={color} size="sm">{item}</Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
