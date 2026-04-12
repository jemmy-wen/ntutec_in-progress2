import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getPostBySlug, getAllPostSlugs } from '@/lib/ghost'

export const revalidate = 3600 // ISR: revalidate every hour

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: '找不到文章 | NTUTEC' }

  const description = post.meta_description ?? post.excerpt ?? ''
  const ogImage = post.og_image ?? post.feature_image ?? ''

  return {
    title: post.meta_title ? `${post.meta_title} | NTUTEC Blog` : `${post.title} | NTUTEC Blog`,
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

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

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
            url: `https://tec.ntu.edu.tw/blog/${post.slug}`,
          }),
        }}
      />

      <article className="section-spacing">
        <div className="container max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center text-sm text-teal transition-colors hover:text-teal-deep"
          >
            &larr; 回到部落格
          </Link>

          <header className="mb-10">
            {post.primary_tag && (
              <span className="mb-4 inline-block rounded-full bg-teal-wash px-2.5 py-0.5 text-xs font-medium text-teal">
                {post.primary_tag.name}
              </span>
            )}

            <h1 className="mb-4 text-3xl font-bold leading-tight text-charcoal sm:text-4xl">
              {post.title}
            </h1>

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
                      unoptimized
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
                unoptimized
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-charcoal prose-a:text-teal-deep prose-img:rounded-lg prose-code:rounded prose-code:bg-stone prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-pre:bg-charcoal prose-pre:text-stone"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {post.tags.length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
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
            <p className="mb-4 text-slate-muted">喜歡這篇文章？訂閱我們的電子報，不錯過最新內容。</p>
            <a
              href="https://ntutec.ghost.io/#/portal/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-deep"
            >
              免費訂閱電子報
            </a>
          </div>
        </div>
      </article>
    </>
  )
}
