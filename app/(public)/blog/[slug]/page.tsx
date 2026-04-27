import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/ghost'
import { getMockPostBySlug, MOCK_POSTS } from '@/lib/mock-posts'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import { ShareButtons } from '@/components/public/blog/ShareButtons'

export const revalidate = 3600 // ISR: revalidate every hour

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs().catch(() => [])
  const mockSlugs = MOCK_POSTS.map((p) => p.slug)
  const all = [...new Set([...slugs, ...mockSlugs])]
  return all.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: { absolute: '找不到文章 | NTUTEC' } }

  const description = post.meta_description ?? post.excerpt ?? ''
  const ogImage = post.og_image ?? post.feature_image ?? ''
  const baseTitle = post.meta_title ?? post.title

  return {
    // `absolute` bypasses the parent layout's title.template suffix to avoid
    // "NTUTEC" duplication (was: `{title} | NTUTEC Blog | 台大創創中心 NTUTEC`).
    title: { absolute: `${baseTitle} | NTUTEC` },
    description,
    openGraph: {
      title: post.title,
      description,
      images: ogImage ? [{ url: ogImage, alt: post.title }] : [],
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: post.primary_author ? [post.primary_author.name] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

/**
 * Rewrite Ghost-specific URLs in post HTML:
 *  - ntutec.ghost.io → tec.ntu.edu.tw
 *  - /p/<id>/ → /blog/<id>/ (Ghost preview paths that 404 on production)
 * Also inject `id` attributes on H2s so the TOC anchor links work.
 */
interface TocItem {
  id: string
  text: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]/g, '')
    .slice(0, 80)
}

function processPostHtml(html: string): { html: string; toc: TocItem[] } {
  let processed = html
    .replace(/https?:\/\/ntutec\.ghost\.io\//g, 'https://tec.ntu.edu.tw/')
    .replace(/https:\/\/tec\.ntu\.edu\.tw\/p\//g, 'https://tec.ntu.edu.tw/blog/')

  const toc: TocItem[] = []
  const usedIds = new Set<string>()

  processed = processed.replace(
    /<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/g,
    (_match, attrs: string | undefined, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, '').trim()
      let id = slugify(text) || `section-${toc.length + 1}`
      let n = 2
      while (usedIds.has(id)) {
        id = `${id}-${n++}`
      }
      usedIds.add(id)
      toc.push({ id, text })

      const existingAttrs = attrs ?? ''
      // If h2 already has an id, preserve it; else inject
      if (/\sid\s*=/.test(existingAttrs)) {
        return `<h2${existingAttrs}>${inner}</h2>`
      }
      return `<h2${existingAttrs} id="${id}">${inner}</h2>`
    },
  )

  return { html: processed, toc }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params

  let post = await getPostBySlug(slug).catch(() => null)
  if (!post) {
    const mock = getMockPostBySlug(slug)
    if (!mock) notFound()
    post = {
      ...mock,
      og_image: null,
      meta_title: null,
      meta_description: null,
      updated_at: mock.published_at,
    } as Awaited<ReturnType<typeof getPostBySlug>>
  }
  if (!post) notFound()

  const { html: articleHtml, toc } = processPostHtml(post.html)
  const showToc = toc.length >= 3

  const relatedPosts = await getRelatedPosts(post.primary_tag?.slug ?? null, post.slug, 3).catch(() => [])
  const canonicalUrl = `https://tec.ntu.edu.tw/blog/${post.slug}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            datePublished: post.published_at,
            dateModified: post.updated_at ?? post.published_at,
            author: post.primary_author
              ? { '@type': 'Person', name: post.primary_author.name }
              : { '@type': 'Organization', name: 'NTUTEC 編輯部' },
            image:
              post.feature_image ??
              'https://tec.ntu.edu.tw/images/events/opening-2026-biggroup.jpg',
            publisher: {
              '@type': 'Organization',
              name: 'NTUTEC 台大創創中心',
              '@id': 'https://tec.ntu.edu.tw',
            },
            description: post.excerpt ?? post.title,
            url: canonicalUrl,
          }),
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://tec.ntu.edu.tw/' },
          { name: '部落格', url: 'https://tec.ntu.edu.tw/blog' },
          { name: post.title, url: canonicalUrl },
        ]}
      />

      <article className="blog-article section-spacing">
        <div className="container max-w-2xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-teal-deep">
                  首頁
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-teal-deep">
                  部落格
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="truncate text-charcoal" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>
        </div>

        <div className="container max-w-2xl lg:max-w-6xl">
          <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
            <div className="mx-auto w-full max-w-2xl lg:mx-0">
              <header className="mb-10">
                {post.primary_tag && (
                  <span className="mb-4 inline-block rounded-full bg-teal-wash px-2.5 py-0.5 text-xs font-medium text-teal">
                    {post.primary_tag.name}
                  </span>
                )}

                <h1 className="mb-4 text-3xl font-bold leading-tight text-charcoal sm:text-4xl md:text-5xl">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="mb-6 text-xl leading-relaxed text-slate-muted">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-muted">
                  {post.primary_author && (
                    <span className="flex items-center gap-2">
                      {post.primary_author.profile_image && (
                        <Image
                          src={post.primary_author.profile_image}
                          alt={post.primary_author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      )}
                      <span>{post.primary_author.name}</span>
                    </span>
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
              </header>

              {post.feature_image && (
                <div className="relative mb-10 aspect-video overflow-hidden rounded-xl">
                  <Image
                    src={post.feature_image}
                    alt={post.feature_image_alt ?? post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority
                  />
                </div>
              )}

              {showToc && (
                <details className="mb-8 rounded-lg border border-stone-warm bg-stone-warm/30 p-4 lg:hidden">
                  <summary className="cursor-pointer text-sm font-semibold text-charcoal">
                    本文目錄（{toc.length}）
                  </summary>
                  <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-slate-muted">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="hover:text-teal-deep">
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              )}

              <div
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-charcoal prose-a:text-teal-deep prose-img:rounded-lg prose-code:rounded prose-code:bg-stone prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-pre:bg-charcoal prose-pre:text-stone prose-blockquote:border-l-4 prose-blockquote:border-teal prose-blockquote:bg-teal-wash/30 prose-blockquote:not-italic prose-blockquote:rounded-r-lg prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-p:leading-[1.9] prose-p:tracking-wide"
                dangerouslySetInnerHTML={{ __html: articleHtml }}
              />

              <div className="mt-12 border-t border-border pt-8">
                <ShareButtons url={canonicalUrl} title={post.title} />
              </div>

              {post.tags.length > 0 && (
                <div className="mt-8 border-t border-border pt-8">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.slug}
                        className="rounded-full bg-teal-wash px-3 py-1 text-xs text-teal-deep"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 border-t border-border pt-8 text-center">
                <p className="mb-4 text-slate-muted">
                  喜歡這篇文章？訂閱我們的電子報，不錯過最新內容。
                </p>
                <a
                  href="https://ntutec.ghost.io/#/portal/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-deep"
                >
                  免費訂閱電子報
                </a>
              </div>

              <div className="mt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-sm text-teal transition-colors hover:text-teal-deep"
                >
                  &larr; 回到部落格
                </Link>
              </div>
            </div>

            {showToc && (
              <aside className="hidden lg:block">
                <nav aria-label="本文目錄" className="sticky top-24">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-muted">
                    本文目錄
                  </h3>
                  <ol className="list-decimal space-y-2 pl-5 text-sm text-charcoal">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="transition-colors hover:text-teal-deep"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
            )}
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="container mt-16 max-w-2xl lg:max-w-6xl">
            <div className="border-t border-border pt-12">
              <h2 className="mb-8 text-2xl font-bold text-charcoal">延伸閱讀</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/blog/${rp.slug}`}
                    className="card-hover group block overflow-hidden rounded-xl border border-stone-warm/60 bg-white"
                  >
                    {rp.feature_image ? (
                      <div className="relative aspect-[16/9] overflow-hidden bg-stone">
                        <Image
                          src={rp.feature_image}
                          alt={rp.feature_image_alt ?? rp.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex h-40 items-center justify-center bg-stone" />
                    )}
                    <div className="p-5">
                      {rp.primary_tag && (
                        <span className="inline-block rounded-full bg-teal-wash px-2.5 py-0.5 text-xs font-medium text-teal">
                          {rp.primary_tag.name}
                        </span>
                      )}
                      <h3 className="mt-3 line-clamp-2 font-semibold text-charcoal transition-colors group-hover:text-teal-deep">
                        {rp.title}
                      </h3>
                      {rp.excerpt && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-muted">
                          {rp.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  )
}
