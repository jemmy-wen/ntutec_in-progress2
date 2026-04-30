import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import ConsultingPageClient from '@/components/public/consulting/ConsultingPageClient'

export const metadata: Metadata = {
  title: '諮詢服務 | NTUTEC',
  description: '台大創創中心提供企業創新策略、技術商業化與新創加速等專業諮詢服務。13 年累積 know-how，27 期垂直加速器，35 家企業夥伴。',
}

export default function ConsultingPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '諮詢服務', url: 'https://tec.ntu.edu.tw/consulting' },
      ]} />
      <ConsultingPageClient />
    </>
  )
}
