interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ message = '載入失敗，請稍後再試', onRetry }: ErrorStateProps) {
  return (
    <div className="bg-white rounded-xl border border-red-200 p-8 text-center">
      <div className="text-red-500 mb-2">
        <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-sm text-gray-600 mb-3">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          重新載入
        </button>
      )}
    </div>
  )
}
