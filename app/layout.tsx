import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NTUTEC Platform',
  description: '台大創創中心統一平台 — 天使俱樂部、業師健診、新創服務',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
