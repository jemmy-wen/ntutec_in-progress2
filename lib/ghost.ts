/**
 * Ghost Content API Client
 *
 * 環境變數：
 *   GHOST_URL — Ghost 站台 URL（如 https://ntutec.ghost.io）
 *   GHOST_CONTENT_API_KEY — Ghost Content API Key
 *
 * 使用原生 fetch，不依賴 @tryghost/content-api 套件。
 */

const GHOST_URL = process.env.GHOST_URL ?? 'https://ntutec.ghost.io'
const GHOST_CONTENT_API_KEY = process.env.GHOST_CONTENT_API_KEY ?? ''

function ghostApiUrl(resource: string, params: Record<string, string> = {}): string {
  const url = new URL(`${GHOST_URL}/ghost/api/content/${resource}/`)
  url.searchParams.set('key', GHOST_CONTENT_API_KEY)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v)
  }
  return url.toString()
}

/* ---------- Types ---------- */

export interface GhostTag {
  id: string
  name: string
  slug: string
}

export interface GhostAuthor {
  id: string
  name: string
  slug: string
  profile_image: string | null
}

export interface GhostPost {
  id: string
  uuid: string
  title: string
  slug: string
  html: string
  excerpt: string
  feature_image: string | null
  feature_image_alt: string | null
  published_at: string
  updated_at: string
  reading_time: number
  primary_tag: GhostTag | null
  tags: GhostTag[]
  primary_author: GhostAuthor | null
  authors: GhostAuthor[]
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
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
  limit = 12,
): Promise<{ posts: GhostPost[]; pagination: GhostPagination }> {
  try {
    const url = ghostApiUrl('posts', {
      page: String(page),
      limit: String(limit),
      include: 'tags,authors',
      fields:
        'id,uuid,title,slug,excerpt,feature_image,feature_image_alt,published_at,updated_at,reading_time,meta_title,meta_description,og_image',
    })

    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error(`Ghost API error: ${res.status} ${res.statusText}`)

    const data = await res.json()
    return {
      posts: data.posts as GhostPost[],
      pagination: data.meta.pagination as GhostPagination,
    }
  } catch {
    return {
      posts: [],
      pagination: { page: 1, limit, pages: 1, total: 0 },
    }
  }
}

/**
 * 依 slug 取得單篇文章（含 HTML 內文）
 */
export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  try {
    const url = ghostApiUrl('posts/slug/' + slug, {
      include: 'tags,authors',
    })

    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error(`Ghost API error: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    return (data.posts?.[0] as GhostPost) ?? null
  } catch {
    return null
  }
}

/**
 * 依 tag 取得文章列表
 */
export async function getPostsByTag(
  tag: string,
  page = 1,
  limit = 12,
): Promise<{ posts: GhostPost[]; pagination: GhostPagination }> {
  try {
    const url = ghostApiUrl('posts', {
      page: String(page),
      limit: String(limit),
      include: 'tags,authors',
      filter: `tag:${tag}`,
      fields:
        'id,uuid,title,slug,excerpt,feature_image,feature_image_alt,published_at,updated_at,reading_time,meta_title,meta_description,og_image',
    })

    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error(`Ghost API error: ${res.status} ${res.statusText}`)

    const data = await res.json()
    return {
      posts: data.posts as GhostPost[],
      pagination: data.meta.pagination as GhostPagination,
    }
  } catch {
    return {
      posts: [],
      pagination: { page: 1, limit, pages: 1, total: 0 },
    }
  }
}

/**
 * 取得所有文章 slug（供 generateStaticParams 和 sitemap 使用）
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const url = ghostApiUrl('posts', {
      fields: 'slug',
      limit: 'all',
    })

    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return []

    const data = await res.json()
    return (data.posts ?? []).map((p: { slug: string }) => p.slug)
  } catch {
    return []
  }
}

/**
 * 取得所有文章（供 RSS feed 使用）
 */
export async function getAllPosts(): Promise<GhostPost[]> {
  try {
    const url = ghostApiUrl('posts', {
      limit: 'all',
      include: 'tags,authors',
      fields:
        'id,uuid,title,slug,excerpt,feature_image,feature_image_alt,published_at,updated_at,reading_time,meta_title,meta_description,og_image,html',
    })

    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return []

    const data = await res.json()
    return data.posts as GhostPost[]
  } catch {
    return []
  }
}
