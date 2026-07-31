import type { Metadata } from 'next'
import VacancyDetailView from '@frontend/views/VacancyDetailView'

export const metadata: Metadata = {
  title: 'Apply | FlowTech Africa Careers',
  description: 'Apply for open positions at FlowTech Africa.',
}

export default function VacancyDetailPage({ params }: { params: { id: string } }) {
  return <VacancyDetailView id={params.id} />
}
