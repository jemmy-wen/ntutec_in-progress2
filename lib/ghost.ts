/**
 * Ghost Content API Client — POC
 *
 * 環境變數：
 *   GHOST_URL — Ghost 站台 URL（如 https://blog.tec.ntu.edu.tw）
 *   GHOST_CONTENT_API_KEY — Ghost Content API Key
 *
 * 使用原生 fetch，不依賴 @tryghost/content-api 套件。
 */

const GHOST_URL = process.env.GHOST_URL ?? ''
const GHOST_CONTENT_API_KEY = process.env.GHOST_CONTENT_API_KEY ?? ''
const GHOST_API_VERSION = 'v5.0'

function ghostApiUrl(resource: string, params: Record<string, string> = {}): string {
  const url = new URL(`${GHOST_URL}/ghost/api/content/${resource}/`)
  url.searchParams.set('key', GHOST_CONTENT_API_KEY)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v)
  }
  return url.toString()
}

/* ---------- Types ---------- */

export interface GhostPost {
  id: string
  uuid: string
  title: string
  slug: string
  html: string
  excerpt: string
  feature_image: string | null
  published_at: string
  reading_time: number
  primary_tag: { name: string; slug: string } | null
  tags: { name: string; slug: string }[]
}

export interface GhostPagination {
  page: number
  limit: number
  pages: number
  total: number
}

/* ---------- Fetchers ---------- */

/**
 * 取得文章列表（分頁）
 */
export async function getPosts(
  page = 1,
  limit = 10,
): Promise<{ posts: GhostPost[]; pagination: GhostPagination }> {
  const url = ghostApiUrl('posts', {
    page: String(page),
    limit: String(limit),
    include: 'tags',
    fields: 'id,uuid,title,slug,excerpt,feature_image,published_at,reading_time',
  })

  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`Ghost API error: ${res.status} ${res.statusText}`)

  const data = await res.json()
  return {
    posts: data.posts as GhostPost[],
    pagination: data.meta.pagination as GhostPagination,
  }
}

/**
 * 依 tag 取得文章列表（分頁）
 */
export async function getPostsByTag(
  tag: string,
  page = 1,
  limit = 10,
): Promise<{ posts: GhostPost[]; pagination: GhostPagination }> {
  const url = ghostApiUrl('posts', {
    page: String(page),
    limit: String(limit),
    include: 'tags',
    filter: `tag:${tag}`,
    fields: 'id,uuid,title,slug,excerpt,feature_image,published_at,reading_time',
  })

  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`Ghost API error: ${res.status} ${res.statusText}`)

  const data = await res.json()
  return {
    posts: data.posts as GhostPost[],
    pagination: data.meta.pagination as GhostPagination,
  }
}

/**
 * 依 slug 取得單篇文章（含 HTML 內文）
 */
export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  const url = ghostApiUrl('posts/slug/' + slug, {
    include: 'tags',
  })

  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error(`Ghost API error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  return (data.posts?.[0] as GhostPost) ?? null
}
