import Link from 'next/link'
import type { Metadata } from 'next'
import { getPosts } from '@/lib/ghost'

// Prevent build-time static generation (Ghost URL not yet configured)
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '部落格',
  description: '台大創創中心最新消息、新創故事與產業觀點。',
}

export default async function BlogListPage() {
  const { posts, pagination } = await getPosts(1, 12)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">部落格</h1>
        <p className="text-lg text-gray-600">
          最新消息、新創故事與產業觀點
        </p>
      </div>

      {/* Post Grid */}
      {posts.length === 0 ? (
        <p className="text-gray-500">目前沒有文章。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Feature Image */}
              {post.feature_image && (
                <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.feature_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Tag */}
                {post.primary_tag && (
                  <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded mb-3">
                    {post.primary_tag.name}
                  </span>
                )}

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center text-xs text-gray-400 gap-3">
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
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination hint */}
      {pagination.pages > 1 && (
        <div className="mt-12 text-center text-sm text-gray-500">
          第 {pagination.page} / {pagination.pages} 頁（共 {pagination.total} 篇）
          {/* TODO: 實作分頁元件 */}
        </div>
      )}
    </section>
  )
}
