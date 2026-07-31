import { Cloud, Shield, Settings, Network, BarChart3, Lightbulb } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import SectionHeader from '@frontend/components/ui/SectionHeader'
import ServiceCardGrid, { type ServiceCardItem } from '@frontend/components/ui/ServiceCardGrid'
import Button from '@frontend/components/ui/Button'
import { ArrowRight } from 'lucide-react'

const SERVICES: ServiceCardItem[] = [
  { icon: <Cloud size={24} />,     color: '#5B35D5', title: 'Cloud Infrastructure',   desc: 'Scalable, resilient cloud environments built for African bandwidth realities — hybrid, multi-cloud, or full-cloud migration.',                       tags: ['AWS', 'Azure', 'GCP', 'Private Cloud'],        learnMoreHref: '/services/cloud-computing' },
  { icon: <Shield size={24} />,    color: '#E8401A', title: 'Cybersecurity',          desc: 'Enterprise-grade protection: SOC-as-a-Service, threat intelligence, zero-trust architecture, and 24/7 incident response.',                             tags: ['SOC', 'Zero Trust', 'SIEM', 'Pen Testing'],    learnMoreHref: '/services/cyber-security' },
  { icon: <Settings size={24} />,  color: '#0EA5E9', title: 'Managed IT Services',    desc: 'Full-stack IT operations management — monitoring, patching, helpdesk, and lifecycle management so your team can focus on growth.',                       tags: ['NOC', 'Remote Support', 'ITSM', 'Monitoring'], learnMoreHref: '/services/managed-it-services' },
  { icon: <Network size={24} />,   color: '#10B981', title: 'Network & Connectivity', desc: 'High-performance SD-WAN, MPLS, and fibre connectivity across 14 African countries with guaranteed SLAs.',                                               tags: ['SD-WAN', 'MPLS', 'Fibre', '5G Ready'],         learnMoreHref: '/services/networking' },
  { icon: <BarChart3 size={24} />, color: '#F5C842', title: 'Data & Analytics',       desc: 'Turn raw data into strategic decisions. BI dashboards, data lakes, real-time analytics, and AI-powered insights.',                                        tags: ['Power BI', 'Databricks', 'SQL', 'AI/ML'],      learnMoreHref: '/services/data-analytics' },
  { icon: <Lightbulb size={24} />, color: '#5B35D5', title: 'Digital Transformation', desc: 'End-to-end enablement — from process automation and ERP modernisation to mobile-first workforce solutions.',                                             tags: ['RPA', 'ERP', 'Low-Code', 'Change Mgmt'],       learnMoreHref: '/services/digital-transformation' },
]

export default function Services() {
  return (
    <Section id="services" bg="tint">
      <Container>
        <SectionHeader
          eyebrow="What We Do"
          title={<>Enterprise Services.{' '}<span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">African Scale.</span></>}
          subtitle="Six core pillars covering every dimension of modern ICT — delivered with local expertise and global standards."
        />

        <ServiceCardGrid items={SERVICES} showProgress />

        <div className="mt-12 text-center">
          <Button href="/services" icon={<ArrowRight size={16} />} iconPosition="right">
            Explore All Services
          </Button>
        </div>
      </Container>
    </Section>
  )
}
