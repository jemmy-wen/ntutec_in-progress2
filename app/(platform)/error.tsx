'use client'

export default function PlatformError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold mb-2">發生錯誤</h2>
        <p className="text-gray-500 text-sm mb-6">
          {error.message || '系統遇到未預期的錯誤，請稍後再試。'}
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 mb-4 font-mono">錯誤代碼：{error.digest}</p>
        )}
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          重新載入
        </button>
      </div>
    </div>
  )
}
