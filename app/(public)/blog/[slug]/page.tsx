import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPostBySlug } from '@/lib/ghost'

// Prevent build-time static generation (Ghost URL not yet configured)
export const dynamic = 'force-dynamic'

/* ---------- Dynamic Metadata ---------- */

type Params = Promise<{ slug: string }>

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: '找不到文章' }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
      type: 'article',
    },
  }
}

/* ---------- Page ---------- */

export default async function BlogPostPage({
  params,
}: {
  params: Params
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors"
      >
        &larr; 回到部落格
      </Link>

      {/* Header */}
      <header className="mb-10">
        {post.primary_tag && (
          <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded mb-4">
            {post.primary_tag.name}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center text-sm text-gray-500 gap-4">
          <time dateTime={post.published_at}>
            {new Date(post.published_at).toLocaleDateString('zh-TW', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.reading_time > 0 && (
            <span>{post.reading_time} 分鐘閱讀</span>
          )}
        </div>
      </header>

      {/* Feature Image */}
      {post.feature_image && (
        <div className="mb-10 rounded-xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.feature_image}
            alt={post.title}
            className="w-full"
          />
        </div>
      )}

      {/* Content — Ghost returns HTML */}
      <div
        className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag.slug}
                className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
