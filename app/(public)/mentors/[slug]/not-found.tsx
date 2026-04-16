import Link from 'next/link'

export default function MentorNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-stone px-4 py-16">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-teal-wash mb-4">404</div>
        <h1 className="text-2xl font-bold text-charcoal mb-2">找不到這位業師</h1>
        <h2 className="text-base text-slate-muted mb-6">Mentor Not Found</h2>
        <p className="text-sm text-slate-muted mb-8 leading-relaxed">
          這位業師的頁面可能尚未上線，或已調整為不公開。<br/>
          This mentor profile may not yet be published or is currently unavailable.
        </p>
        <Link
          href="/mentors"
          className="inline-block rounded-full bg-teal-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
        >
          返回業師陣容 · Back to Mentors
        </Link>
      </div>
    </div>
  )
}
