import type { MetadataRoute } from 'next'

const BASE_URL = 'https://tec.ntu.edu.tw'

/**
 * Public routes only (no /admin, /angel/portal, /vote, /login).
 * Sync with app/(public)/* and middleware publicPaths.
 */
const publicRoutes: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/team', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/mentors', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/advisory-board', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/programs', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/accelerator', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/garage', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/startups', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/apply', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/angel', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/angel-apply', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/corporate', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/corporate-partners', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/consulting', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/co-events', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/news', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/events', changeFrequency: 'weekly', priority: 0.7 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return publicRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
