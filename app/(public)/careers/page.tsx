import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import CareersPageClient from '@/components/public/careers/CareersPageClient'

export const metadata: Metadata = {
  title: '加入我們 | NTUTEC',
  description: '加入台大創創中心團隊或實習計畫，在台大創業生態系的核心，與創業者、投資人和業師並肩工作。',
}

export default function CareersPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '加入我們', url: 'https://tec.ntu.edu.tw/careers' },
      ]} />
      <CareersPageClient />
    </>
  )
}
