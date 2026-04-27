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
    <section className="bg-[#F6F5F1] py-16 md:py-24">
      <div className="container">

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-teal">
              Latest Updates
            </p>
            <h2 className="text-2xl font-bold text-[#181614] md:text-3xl lg:text-4xl">最新動態</h2>
          </div>
          <Link
            href="/news"
            className="hidden items-center gap-1.5 text-sm font-medium text-teal transition-colors hover:text-teal-deep sm:inline-flex"
          >
            查看全部 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {displayPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-[20px] bg-white transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {post.feature_image ? (
                <div className="aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.feature_image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <div className="aspect-[16/9] bg-stone" />
              )}

              <div className="p-6">
                {post.primary_tag && (
                  <span className="inline-block rounded-full bg-teal-light px-2.5 py-0.5 text-[10px] font-semibold text-teal">
                    {post.primary_tag.name}
                  </span>
                )}
                <h3 className="mt-3 font-semibold leading-snug text-[#181614] transition-colors group-hover:text-teal line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400">{formatDate(post.published_at)}</p>
                {post.excerpt && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-teal">
            查看全部 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
