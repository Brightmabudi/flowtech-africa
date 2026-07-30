import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.flowtech.africa'
  return [
    { url: base,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 1   },
    { url: `${base}/careers`,  lastModified: new Date(), changeFrequency: 'daily',   priority: 0.7 },
  ]
}
