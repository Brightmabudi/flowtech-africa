import type { MetadataRoute } from 'next'
import { SERVICES } from '@frontend/data/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.flowtech.africa'
  const now = new Date()
  return [
    { url: base,               lastModified: now, changeFrequency: 'weekly',  priority: 1   },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    ...SERVICES.map(s => ({ url: `${base}/services/${s.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: `${base}/careers`,  lastModified: now, changeFrequency: 'daily',   priority: 0.7 },
  ]
}
