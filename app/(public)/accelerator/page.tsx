import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import AcceleratorPageClient from '@/components/public/accelerator/AcceleratorPageClient'
import { ogImageUrl } from '@/lib/og'

export const metadata: Metadata = {
  title: '台大加速器 | NTUTEC',
  description:
    '台大創創中心台大加速器為期十個月，提供成長期新創深度業師輔導、企業資源對接與募資機會。',
  alternates: {
    canonical: 'https://tec.ntu.edu.tw/accelerator',
    languages: {
      'zh-TW': 'https://tec.ntu.edu.tw/accelerator',
      'en': 'https://tec.ntu.edu.tw/en/accelerator',
    },
  },
  openGraph: {
    title: '台大加速器 | NTUTEC',
    description: '為期十個月，業師深度輔導 + 企業資源對接 + 募資機會。成長期新創最強後盾。',
    url: 'https://tec.ntu.edu.tw/accelerator',
    images: [
      {
        url: ogImageUrl('台大加速器', '十個月業師輔導 · 企業對接 · 募資機會', 'startup'),
        width: 1200,
        height: 630,
        alt: '台大加速器 | NTUTEC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogImageUrl('台大加速器', '十個月業師輔導 · 企業對接 · 募資機會', 'startup')],
  },
}

export default function AcceleratorPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '輔導計畫', url: 'https://tec.ntu.edu.tw/programs' },
        { name: '台大加速器', url: 'https://tec.ntu.edu.tw/accelerator' },
      ]} />
      <AcceleratorPageClient />
    </>
  )
}
