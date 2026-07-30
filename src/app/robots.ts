import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/dashboard', '/portal', '/login', '/api'] },
    ],
    sitemap: 'https://www.flowtech.africa/sitemap.xml',
  }
}
