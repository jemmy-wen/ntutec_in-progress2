import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getPostBySlug } from '@/lib/ghost'

export const dynamic = 'force-dynamic'

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: '找不到文章' }

  return {
    title: `${post.title} | NTUTEC Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
      type: 'article',
    },
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="section-spacing">
      <div className="container max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-teal hover:text-teal-deep mb-8 transition-colors"
        >
          &larr; 回到部落格
        </Link>

        <header className="mb-10">
          {post.primary_tag && (
            <span className="inline-block rounded-full bg-teal-wash px-2.5 py-0.5 text-xs font-medium text-teal mb-4">
              {post.primary_tag.name}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center text-sm text-slate-muted gap-4">
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString('zh-TW', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </time>
            {post.reading_time > 0 && (
              <span>{post.reading_time} 分鐘閱讀</span>
            )}
          </div>
        </header>

        {post.feature_image && (
          <div className="relative mb-10 rounded-xl overflow-hidden aspect-video">
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-charcoal prose-a:text-teal-deep prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag.slug} className="text-xs bg-teal-wash text-teal-deep px-3 py-1 rounded-full">
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
