import type { Metadata } from 'next'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import OrganizationSchema from '@/components/public/OrganizationSchema'

export const metadata: Metadata = {
  metadataBase: new URL('https://tec.ntu.edu.tw'),
  title: {
    template: '%s | 台大創創中心 NTUTEC',
    default: '台大創創中心 NTUTEC — 台大創業生態系實戰基地',
  },
  description:
    '13 年來累計輔導近 600 支新創團隊。台大創創中心以加速器、車庫孵化器、企業垂直加速器與天使投資俱樂部四大業務，連結台大、連結產業、連結資本。',
  openGraph: {
    siteName: 'NTUTEC 台大創創中心',
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <OrganizationSchema />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
