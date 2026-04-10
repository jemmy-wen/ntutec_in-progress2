import { Suspense } from 'react'

export const metadata = {
  title: '登入 | 台大創創中心 NTUTEC',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-400">載入中...</div>
      </main>
    }>
      {children}
    </Suspense>
  )
}
