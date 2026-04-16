import Link from 'next/link'

export default function BlogPostNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-stone px-4 py-16">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-teal-wash mb-4">404</div>
        <h1 className="text-2xl font-bold text-charcoal mb-2">找不到這篇文章</h1>
        <h2 className="text-base text-slate-muted mb-6">Article Not Found</h2>
        <p className="text-sm text-slate-muted mb-8 leading-relaxed">
          這篇文章可能已下架或網址已變更。<br/>
          This article may have been removed or the URL has changed.
        </p>
        <Link
          href="/blog"
          className="inline-block rounded-full bg-teal-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
        >
          返回部落格列表 · Back to Blog
        </Link>
      </div>
    </div>
  )
}
