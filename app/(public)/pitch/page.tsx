import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import PitchPageClient from '@/components/public/pitch/PitchPageClient'
import { ogImageUrl } from '@/lib/og'

export const metadata: Metadata = {
  title: '新創投遞 | NTUTEC ANGELS 台大天使會',
  description: '將你的新創提交給 NTUTEC ANGELS 台大天使會。40+ 位天使投資人，每月定期例會，三段嚴格盡調。台大創創中心校友優先推薦。',
  alternates: { canonical: 'https://tec.ntu.edu.tw/pitch' },
  openGraph: {
    images: [{ url: ogImageUrl('向天使投資人 Pitch', 'NTUTEC ANGELS · 40+ 天使 · 每月例會'), width: 1200, height: 630 }],
  },
}

export default function PitchPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '新創投遞', url: 'https://tec.ntu.edu.tw/pitch' },
      ]} />
      <PitchPageClient />
    </>
  )
}
