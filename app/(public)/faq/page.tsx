import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import FaqPageClient from '@/components/public/faq/FaqPageClient'

export const metadata: Metadata = {
  title: '常見問題 | NTUTEC',
  description: '關於台大加速器、台大車庫、台大天使會、企業合作、業師輔導與申請流程的完整常見問題解答。',
}

export default function FaqPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '常見問題', url: 'https://tec.ntu.edu.tw/faq' },
      ]} />
      <FaqPageClient />
    </>
  )
}
