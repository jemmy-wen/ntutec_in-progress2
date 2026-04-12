import type { Metadata } from 'next'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://tec.ntu.edu.tw'),
  title: {
    template: '%s | 台大創創中心 NTUTEC',
    default: '台大創創中心 NTUTEC — 台大創業生態系實戰基地',
  },
  description:
    '13 年來累計輔導逾 600 支新創團隊。台大創創中心以台大加速器、台大車庫、企業垂直加速器與天使投資俱樂部四大業務，連結台大、連結產業、連結資本。',
  openGraph: {
    siteName: 'NTUTEC 台大創創中心',
    locale: 'zh_TW',
    type: 'website',
    images: [
      {
        url: 'https://tec.ntu.edu.tw/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '台大創創中心 NTUTEC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Preload the hero image for LCP improvement */}
      {/* Note: Next.js Image with priority handles preload automatically for hero-main.jpg */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:text-teal focus:font-medium"
      >
        跳至主要內容
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
