import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import DemoDayPageClient from '@/components/public/demo-day/DemoDayPageClient'

export const metadata: Metadata = {
  title: 'Demo Day | NTUTEC',
  description: '台大創創中心年度 Demo Day：台灣最大校園新創投資媒合活動，7 屆累計，每年 12 月台大校園。精選新創向 74 位投資人路演，51 件媒合意向，9.06/10 滿意度。',
  alternates: { canonical: 'https://tec.ntu.edu.tw/demo-day' },
}

export default function DemoDayPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '活動', url: 'https://tec.ntu.edu.tw/events' },
        { name: 'Demo Day', url: 'https://tec.ntu.edu.tw/demo-day' },
      ]} />
      <DemoDayPageClient />
    </>
  )
}
