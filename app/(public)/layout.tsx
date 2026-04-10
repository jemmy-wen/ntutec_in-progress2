import type { Metadata } from 'next'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'

export const metadata: Metadata = {
  title: {
    template: '%s | 台大創創中心 NTUTEC',
    default: '台大創創中心 | Taidah Entrepreneurship Center',
  },
  description: '台灣大學創意創業中心以創業教育、育成輔導、天使投資三軌並行，打造台灣最具影響力的大學創業生態系。',
  openGraph: {
    siteName: 'NTUTEC 台大創創中心',
    locale: 'zh_TW',
    type: 'website',
  },
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
