import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getPosts } from '@/lib/ghost'
import PageHero from '@/components/public/PageHero'
import { NotePencil } from '@phosphor-icons/react/dist/ssr'

export const revalidate = 3600 // ISR: revalidate every hour

export const metadata: Metadata = {
  title: '部落格 | NTUTEC 台大創創中心',
  description: '台大創創中心最新消息、新創故事與產業觀點。探索創業生態系的最前線報導。',
  alternates: {
    types: {
      'application/rss+xml': '/blog/rss.xml',
    },
  },
}

export default async function BlogListPage() {
  let posts: Awaited<ReturnType<typeof getPosts>>['posts'] = []
  let pagination: Awaited<ReturnType<typeof getPosts>>['pagination'] = {
    page: 1,
    limit: 12,
    pages: 1,
    total: 0,
  }

  try {
    const result = await getPosts(1, 12)
    posts = result.posts
    pagination = result.pagination
  } catch {
    // Ghost may be unreachable — show empty state
  }

  return (
    <>
      <PageHero title="部落格" subtitle="Blog" description="最新消息、新創故事與產業觀點" />

      <section className="section-spacing">
        <div className="container">
          {posts.length === 0 ? (
            <div className="rounded-2xl bg-stone p-12 text-center">
              <p className="mb-4 text-2xl font-semibold text-charcoal">Coming Soon</p>
              <p className="mb-2 text-slate-muted">內容即將上線，敬請期待。</p>
              <p className="text-sm text-slate-muted">
                在此之前，歡迎{' '}
                <a href="/podcast" className="text-teal-deep underline underline-offset-4">
                  收聽 TEC Talk Podcast
                </a>{' '}
                或關注我們的社群媒體。
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="card-hover group block overflow-hidden rounded-xl border border-stone-warm/60 bg-white"
                >
                  {post.feature_image ? (
                    <div className="relative aspect-[16/9] overflow-hidden bg-stone">
                      <Image
                        src={post.feature_image}
                        alt={post.feature_image_alt ?? `${post.primary_tag?.name || '文章'} 封面：${post.title.slice(0, 60)}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-stone">
                      <NotePencil size={36} weight="duotone" className="opacity-20 text-slate-muted" />
                    </div>
                  )}

                  <div className="p-5">
                    {post.primary_tag && (
                      <span className="inline-block rounded-full bg-teal-wash px-2.5 py-0.5 text-xs font-medium text-teal">
                        {post.primary_tag.name}
                      </span>
                    )}

                    <h3 className="mt-3 line-clamp-2 font-semibold text-charcoal transition-colors group-hover:text-teal-deep">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-muted">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-muted">
                      {post.primary_author && (
                        <span className="font-medium">{post.primary_author.name}</span>
                      )}
                      <time dateTime={post.published_at}>
                        {new Date(post.published_at).toLocaleDateString('zh-TW', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      {post.reading_time > 0 && <span>{post.reading_time} 分鐘閱讀</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {pagination.pages > 1 && (
            <div className="mt-12 text-center text-sm text-slate-muted">
              第 {pagination.page} / {pagination.pages} 頁（共 {pagination.total} 篇）
            </div>
          )}
        </div>
      </section>

      {/* Newsletter signup */}
      <section className="border-t border-stone-warm bg-stone py-16">
        <div className="container max-w-2xl text-center">
          <h2 className="mb-3 text-2xl font-bold text-charcoal">訂閱電子報</h2>
          <p className="mb-6 text-slate-muted">
            每月精選創業資訊、新創動態與活動報名，直送信箱。
          </p>
          <a
            href="https://ntutec.ghost.io/#/portal/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-teal px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-deep"
          >
            免費訂閱
          </a>
          <p className="mt-3 text-xs text-slate-muted">隨時可取消訂閱，不會有垃圾郵件。</p>
        </div>
      </section>
    </>
  )
}
