import type { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/ghost'
import { createClient } from '@/lib/supabase/server'

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
  { path: '/teams', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/mentors', changeFrequency: 'monthly', priority: 0.7 },
  // { path: '/advisory-board', changeFrequency: 'yearly', priority: 0.5 }, // 暫時隱藏
  { path: '/programs', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/accelerator', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/garage', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/startups', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/apply', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/angel', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/angel-apply', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/corporate', changeFrequency: 'monthly', priority: 0.8 },
  // { path: '/corporate-partners', changeFrequency: 'monthly', priority: 0.6 }, // 暫時隱藏 — 待逐家確認 logo 揭露意願
  { path: '/consulting', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/co-events', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/alumni', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/demo-day', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/careers', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/pitch', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/podcast', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/tec-deals', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/news', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/events', changeFrequency: 'weekly', priority: 0.7 },
  // English pages
  { path: '/en', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/en/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/en/accelerator', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/en/angel', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/en/contact', changeFrequency: 'yearly', priority: 0.5 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = publicRoutes.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }),
  )

  // Dynamically add blog post URLs from Ghost
  const blogSlugs = await getAllPostSlugs()
  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Dynamically add individual mentor pages
  let mentorRoutes: MetadataRoute.Sitemap = []
  try {
    const supabase = await createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: mentorSlugs } = await (supabase.from('mentors') as any)
      .select('slug, updated_at')
      .eq('is_active', true)
      .not('slug', 'is', null)
    if (mentorSlugs) {
      mentorRoutes = (mentorSlugs as { slug: string; updated_at: string }[]).map((m) => ({
        url: `${BASE_URL}/mentors/${m.slug}`,
        lastModified: new Date(m.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }))
    }
  } catch {
    // Supabase unavailable at build time — skip mentor routes gracefully
  }

  return [...staticRoutes, ...blogRoutes, ...mentorRoutes]
}
