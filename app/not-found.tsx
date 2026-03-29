import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-6">
        <div className="text-7xl font-bold text-gray-200 mb-4">404</div>
        <h1 className="text-2xl font-bold mb-2">找不到頁面</h1>
        <p className="text-gray-500 text-sm mb-8">
          您所尋找的頁面可能已移動或不存在。
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          回到首頁
        </Link>
      </div>
    </div>
  )
}
