import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import GaragePageClient from '@/components/public/garage/GaragePageClient'

export const metadata: Metadata = {
  title: '台大車庫 | NTUTEC',
  description: '台大創創中心台大車庫為早期團隊提供虛擬進駐、創業社群與業師諮詢，助你從概念走向 MVP。完全免費，每年錄取 20 隊。',
}

export default function GaragePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '台大車庫', url: 'https://tec.ntu.edu.tw/garage' },
      ]} />
      <GaragePageClient />
    </>
  )
}
