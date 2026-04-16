import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-teal-wash mb-4">404</div>
        <h1 className="text-3xl font-bold text-charcoal mb-2">找不到頁面</h1>
        <h2 className="text-lg text-slate-muted mb-6">Page Not Found</h2>
        <p className="text-sm text-slate-muted mb-8 leading-relaxed">
          您所尋找的頁面可能已移動、更名或不存在。<br/>
          The page you&apos;re looking for may have moved, been renamed, or no longer exists.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-block rounded-full bg-teal-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
          >
            回到首頁 · Home
          </Link>
          <Link
            href="/programs"
            className="inline-block rounded-full border border-teal-deep px-6 py-3 text-sm font-semibold text-teal-deep transition-colors hover:bg-teal-wash"
          >
            查看輔導計畫 · Programs
          </Link>
          <Link
            href="/contact"
            className="inline-block rounded-full border border-stone-warm px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-stone-warm/20"
          >
            聯絡我們 · Contact
          </Link>
        </div>
      </div>
    </div>
  )
}
