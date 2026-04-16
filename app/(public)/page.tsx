import type { Metadata } from 'next'
import Link from 'next/link'
import { ogImageUrl } from '@/lib/og'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'

export const revalidate = 3600 // ISR: revalidate every hour (NewsSection fetches from Ghost)
import HeroSection from '@/components/public/home/HeroSection'
import FocusAreasSection from '@/components/public/home/FocusAreasSection'
import AudienceCards from '@/components/public/home/AudienceCards'
import StatsSection from '@/components/public/home/StatsSection'
import NewsSection from '@/components/public/home/NewsSection'
// import PartnersSection from '@/components/public/home/PartnersSection' // 暫時隱藏 — 待確認廠商揭露意願
import NTUEcosystemSection from '@/components/public/home/NTUEcosystemSection'
import Image from 'next/image'
import { FadeIn } from '@/components/ui/fade-in'

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
        url: ogImageUrl(
          '台大創創中心 NTUTEC',
          '13 年輔導逾 600 支新創，連結台大、產業、資本'
        ),
        width: 1200,
        height: 630,
        alt: '台大創創中心 NTUTEC — 台大創業生態系實戰基地',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      ogImageUrl(
        '台大創創中心 NTUTEC',
        '13 年輔導逾 600 支新創，連結台大、產業、資本'
      ),
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
      ]} />
      <HeroSection />

      {/* Activity Highlight */}
      <section className="section-spacing bg-warm-stone">
        <div className="container">
          <FadeIn className="mb-8 text-center">
            <p className="micro-label mb-4">Community</p>
            <h2 className="mb-4">讓好想法，長出改變世界的力量</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-muted">2026 輔導計畫開幕式，逾 80 位創業者與輔導業師齊聚台大，展開為期十個月的創業加速之旅。</p>
          </FadeIn>
          <div className="relative overflow-hidden rounded-2xl" style={{aspectRatio:'21/9'}}>
            <Image
              src="/images/events/opening-2026-biggroup.jpg"
              alt="2026 輔導計畫開幕式 — 逾 80 位創業者齊聚"
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          </div>
        </div>
      </section>

      <FadeIn>
        <FocusAreasSection />
      </FadeIn>
      <AudienceCards />
      <FadeIn>
        <StatsSection />
      </FadeIn>
      <NewsSection />
      <NTUEcosystemSection />
      {/* <PartnersSection /> */} {/* 暫時隱藏 — 待確認廠商揭露意願 */}
    </>
  )
}
