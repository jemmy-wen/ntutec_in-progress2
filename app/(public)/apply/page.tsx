import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import ApplyPageClient from '@/components/public/apply/ApplyPageClient'
import { ogImageUrl } from '@/lib/og'

export const metadata: Metadata = {
  title: '提前登記 2027 梯次 | NTUTEC',
  description: '目前開放 2027 梯次提前登記，正式申請將於 2026 年 12 月開放。提前登記不等同申請，正式開放時第一時間通知你。',
  openGraph: {
    images: [{ url: ogImageUrl('申請 NTUTEC 2027 梯次', '加速器 · 車庫 · 企業垂直加速器 · 提前登記開放'), width: 1200, height: 630 }],
  },
}

export default function ApplyPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '申請加速器', url: 'https://tec.ntu.edu.tw/apply' },
      ]} />
      <ApplyPageClient />
    </>
  )
}
