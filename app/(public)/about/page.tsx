import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import AboutPageClient from '@/components/public/about/AboutPageClient'
import { ogImageUrl } from '@/lib/og'

export const metadata: Metadata = {
  title: '關於台大創創中心 | NTUTEC',
  description: '台大創創中心以 HI3 培育模型（輔導培育 × 對接整合 × 加速起飛）系統性支持新創。從 2013 年台大車庫到 35 家企業合作、27 期垂直加速器，深耕台大創業生態系 13 年。',
  alternates: {
    canonical: 'https://tec.ntu.edu.tw/about',
    languages: { 'zh-TW': 'https://tec.ntu.edu.tw/about', 'en': 'https://tec.ntu.edu.tw/en/about' },
  },
  openGraph: {
    images: [{ url: ogImageUrl('關於台大創創中心', 'HI3 培育模型 · 深耕台大創業生態系 13 年'), width: 1200, height: 630 }],
  },
}

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '關於台大創創中心', url: 'https://tec.ntu.edu.tw/about' },
      ]} />
      <AboutPageClient />
    </>
  )
}
