import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import ProgramsPageClient from '@/components/public/programs/ProgramsPageClient'
import { ogImageUrl } from '@/lib/og'

export const metadata: Metadata = {
  title: '新創輔導計畫 | NTUTEC',
  description: '台大加速器（不限身分）與台大車庫（台大身分優先）提供免費十個月輔導，歷年 80+ 位業師、35 家企業夥伴、150+ 投資人網絡。',
  alternates: { canonical: 'https://tec.ntu.edu.tw/programs' },
  openGraph: {
    images: [{ url: ogImageUrl('新創輔導計畫', '台大加速器 × 台大車庫 · 免費 10 個月輔導'), width: 1200, height: 630 }],
  },
}

export default function ProgramsPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '新創輔導計畫', url: 'https://tec.ntu.edu.tw/programs' },
      ]} />
      <ProgramsPageClient />
    </>
  )
}
