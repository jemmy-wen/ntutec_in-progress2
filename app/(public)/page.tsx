import type { Metadata } from 'next'
import { ogImageUrl } from '@/lib/og'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import HomeFAQSchema from '@/components/public/HomeFAQSchema'
import HeroSection from '@/components/public/home/HeroSection'
import NTUEcosystemSection from '@/components/public/home/NTUEcosystemSection'
import CommunitySection from '@/components/public/home/CommunitySection'
import FocusAreasSection from '@/components/public/home/FocusAreasSection'
import StatsSection from '@/components/public/home/StatsSection'
import AudienceCards from '@/components/public/home/AudienceCards'
import NewsSection from '@/components/public/home/NewsSection'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '台大創創中心 NTUTEC — 台大創業生態系實戰基地',
  description:
    '13 年來累計輔導逾 600 支新創團隊。台大創創中心以台大加速器、台大車庫、企業垂直加速器與台大天使會四大業務，連結台大、連結產業、連結資本，把最好的技術與人才轉化為可投資的新創。',
  alternates: {
    canonical: 'https://tec.ntu.edu.tw',
    languages: {
      'zh-TW': 'https://tec.ntu.edu.tw',
      'en': 'https://tec.ntu.edu.tw/en',
    },
  },
  openGraph: {
    title: '台大創創中心 NTUTEC — 台大創業生態系實戰基地',
    description:
      '13 年來累計輔導逾 600 支新創團隊，35 家企業合作，80+ 位歷年業師資料庫、2026 陪跑業師 40+。連結台大、連結產業、連結資本。',
    url: 'https://tec.ntu.edu.tw',
    type: 'website',
    images: [
      {
        url: ogImageUrl('台大創創中心 NTUTEC', '13 年輔導逾 600 支新創，連結台大、產業、資本'),
        width: 1200,
        height: 630,
        alt: '台大創創中心 NTUTEC — 台大創業生態系實戰基地',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogImageUrl('台大創創中心 NTUTEC', '13 年輔導逾 600 支新創，連結台大、產業、資本')],
  },
}

export default function HomePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: '首頁', url: 'https://tec.ntu.edu.tw' }]} />
      <HomeFAQSchema />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Community */}
      <CommunitySection />

      {/* 4. Focus Areas */}
      <FocusAreasSection />

      {/* 5. Stats */}
      <StatsSection />

      {/* 6. Audience */}
      <AudienceCards />

      {/* 7. 台大創新生態系 */}
      <NTUEcosystemSection />

      {/* 8. News */}
      <NewsSection />

    </>
  )
}
