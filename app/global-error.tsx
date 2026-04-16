'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="zh-TW">
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-stone">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-charcoal mb-2">系統發生嚴重錯誤</h1>
            <h2 className="text-lg text-slate-muted mb-4">A critical error occurred</h2>
            <p className="text-sm text-slate-muted mb-6">
              我們已記錄此問題，如持續發生請聯繫 ntutec@ntutec.com<br/>
              We&apos;ve logged the issue. Please contact ntutec@ntutec.com if it persists.
            </p>
            {error.digest && (
              <p className="text-xs text-slate-muted mb-4 font-mono">Error ID: {error.digest}</p>
            )}
            <button
              onClick={reset}
              className="px-6 py-2 rounded-lg bg-teal-deep text-white hover:opacity-90"
            >
              重新載入 · Retry
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
