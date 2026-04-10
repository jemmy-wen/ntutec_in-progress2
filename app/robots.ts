import type { MetadataRoute } from 'next'

const BASE_URL = 'https://tec.ntu.edu.tw'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/',
          '/angel/portal',
          '/angel/portal/',
          '/api',
          '/api/',
          '/callback',
          '/login',
          '/vote',
          '/vote/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
