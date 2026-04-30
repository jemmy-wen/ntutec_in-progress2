import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import TeamPageClient from '@/components/public/team/TeamPageClient'
import { ogImageUrl } from '@/lib/og'

export const metadata: Metadata = {
  title: '執行團隊 | NTUTEC',
  description: '台大創創中心執行團隊，由中心主任、CEO、輔導經理與投資經理組成，結合產業經驗、學術視野與創投背景，全力支持新創成長。',
  openGraph: {
    images: [{ url: ogImageUrl('核心團隊 · Team', '學術視野 × 產業經驗 × 創投背景'), width: 1200, height: 630 }],
  },
}

export default function TeamPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '執行團隊', url: 'https://tec.ntu.edu.tw/team' },
      ]} />
      <TeamPageClient />
    </>
  )
}
