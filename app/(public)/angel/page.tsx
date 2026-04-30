import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import AngelPageClient from '@/components/public/angel/AngelPageClient'
import { ogImageUrl } from '@/lib/og'

export const metadata: Metadata = {
  title: 'NTUTEC ANGELS 台大天使會 | NTUTEC',
  description: 'NTUTEC ANGELS 台大天使會：每月精選台大生態系優質新創、三段嚴格盡調、記名投票機制，與 40+ 位天使投資人共同佈局早期新創。個人會員 NT$50,000/年。',
  alternates: {
    canonical: 'https://tec.ntu.edu.tw/angel',
    languages: { 'zh-TW': 'https://tec.ntu.edu.tw/angel', 'en': 'https://tec.ntu.edu.tw/en/angel' },
  },
  openGraph: {
    images: [{ url: ogImageUrl('NTUTEC ANGELS 台大天使會', '40+ 位天使投資人 · 每月例會 · 三段盡調'), width: 1200, height: 630 }],
  },
}

export default function AngelPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: 'NTUTEC ANGELS 台大天使會', url: 'https://tec.ntu.edu.tw/angel' },
      ]} />
      <AngelPageClient />
    </>
  )
}
