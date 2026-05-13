import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPosts } from '@/lib/ghost'
import { MOCK_POSTS } from '@/lib/mock-posts'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function NewsSection() {
  let posts: Awaited<ReturnType<typeof getPosts>>['posts'] = []

  try {
    const result = await getPosts(1, 3)
    posts = result.posts
  } catch {
    // Ghost unreachable — fall through to mock data
  }

  const displayPosts = posts.length > 0
    ? posts
    : MOCK_POSTS.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        feature_image: p.feature_image,
        feature_image_alt: p.feature_image_alt,
        published_at: p.published_at,
        reading_time: p.reading_time,
        primary_tag: p.primary_tag,
        primary_author: p.primary_author,
        tags: p.tags,
        html: p.html,
        og_image: null,
        meta_title: null,
        meta_description: null,
        updated_at: p.published_at,
      }))

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-screen-xl px-8 lg:px-16">

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#00AA95]">
              <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
                <circle cx="3" cy="3" r="1.5" fill="currentColor"/>
                <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                <circle cx="13" cy="3" r="1.5" fill="currentColor"/>
                <circle cx="3" cy="8" r="1.5" fill="currentColor"/>
                <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                <circle cx="13" cy="8" r="1.5" fill="currentColor"/>
                <circle cx="3" cy="13" r="1.5" fill="currentColor"/>
                <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                <circle cx="13" cy="13" r="1.5" fill="currentColor"/>
              </svg>
              Latest Updates
            </p>
            <h2 className="text-3xl font-bold text-[#181614] lg:text-4xl">最新動態</h2>
          </div>
          <Link
            href="/news"
            className="hidden items-center gap-1.5 text-sm font-medium text-[#00AA95] transition-colors hover:opacity-70 sm:inline-flex"
          >
            查看全部 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards — no gap, no rounded corners, divided by border */}
        <div className="grid grid-cols-1 divide-x divide-[#e0ddd8] border border-[#e0ddd8] md:grid-cols-3">
          {displayPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block bg-white transition-colors hover:bg-[#f9f8f6]"
            >
              {post.feature_image ? (
                <div className="relative h-60 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.feature_image}
                    alt={post.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <div className="h-60 bg-[#e0ddd8]" />
              )}

              <div className="p-6">
                <p className="mb-3 text-xs text-[#181614]/40">{formatDate(post.published_at)}</p>
                <h3 className="mb-3 text-base font-bold leading-snug text-[#181614] transition-colors group-hover:text-[#00AA95] line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mb-4 text-sm leading-relaxed text-[#181614]/50 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                {post.primary_tag && (
                  <span className="inline-block rounded-full bg-[#00AA95]/10 px-3 py-0.5 text-[10px] font-semibold text-[#00AA95]">
                    {post.primary_tag.name}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00AA95]">
            查看全部 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
