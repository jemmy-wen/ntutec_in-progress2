import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import CorporatePageClient from '@/components/public/corporate/CorporatePageClient'

export const metadata: Metadata = {
  title: '企業合作方案 | NTUTEC',
  description:
    '台大創創中心企業合作方案：加速器共創、創新競賽、聯合活動與顧問諮詢，助企業對接前沿新創技術。',
  alternates: {
    canonical: 'https://tec.ntu.edu.tw/corporate',
  },
}

export default function CorporatePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '企業合作方案', url: 'https://tec.ntu.edu.tw/corporate' },
      ]} />
      <CorporatePageClient />
    </>
  )
}
