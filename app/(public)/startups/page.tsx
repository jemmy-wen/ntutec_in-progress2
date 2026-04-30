import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import StartupsPageClient from '@/components/public/startups/StartupsPageClient'
import { ogImageUrl } from '@/lib/og'
import cohort from '@/data/cohort_2026.json'

const teamCount = cohort.teams.length || 43

export const metadata: Metadata = {
  title: '2026 年度新創團隊 | NTUTEC',
  description: `2026 年度台大創創中心輔導的 ${teamCount} 個新創團隊，涵蓋 AI 軟體、生技醫療、硬科技與創新商模四大聚焦領域。`,
  alternates: { canonical: 'https://tec.ntu.edu.tw/startups' },
  openGraph: {
    images: [{ url: ogImageUrl('2026 年度新創團隊', `${teamCount} 支團隊 · 四大聚焦領域`, 'startup'), width: 1200, height: 630 }],
  },
}

export default function StartupsPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '新創團隊', url: 'https://tec.ntu.edu.tw/startups' },
      ]} />
      <StartupsPageClient />
    </>
  )
}
