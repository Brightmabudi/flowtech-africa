import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SERVICES, getServiceBySlug } from '@frontend/data/services'
import ServicePageTemplate from '@frontend/components/ServicePageTemplate'

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}
  return {
    title: `${service.title} | FlowTech Africa`,
    description: service.tagline,
    keywords: `${service.title}, ${service.technologies.join(', ')}, FlowTech Africa`,
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()
  return <ServicePageTemplate service={service} />
}
