import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/public/home/HeroSection'
import ThreeConnectionsSection from '@/components/public/home/ThreeConnectionsSection'
import FocusAreasSection from '@/components/public/home/FocusAreasSection'
import AudienceCards from '@/components/public/home/AudienceCards'
import StatsSection from '@/components/public/home/StatsSection'
import NewsSection from '@/components/public/home/NewsSection'
import PartnersSection from '@/components/public/home/PartnersSection'
import NTUEcosystemSection from '@/components/public/home/NTUEcosystemSection'

export const metadata: Metadata = {
  title: '台大創創中心 NTUTEC — 台大創業生態系實戰基地',
  description:
    '13 年來累計輔導近 600 支新創團隊。台大創創中心以台大加速器、台大車庫、企業垂直加速器與天使投資俱樂部四大業務，連結台大、連結產業、連結資本，把最好的技術與人才轉化為可投資的新創。',
  alternates: {
    canonical: 'https://tec.ntu.edu.tw',
  },
  openGraph: {
    title: '台大創創中心 NTUTEC — 台大創業生態系實戰基地',
    description:
      '13 年來累計輔導近 600 支新創團隊，35 家企業合作，40+ 位業師網絡。連結台大、連結產業、連結資本。',
    url: 'https://tec.ntu.edu.tw',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="bg-charcoal border-t border-white/10 py-6">
        <div className="container flex flex-wrap justify-center gap-4">
          <Link href="/corporate" className="btn-pill-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50">
            企業轉型合作
          </Link>
          <Link href="/angel" className="btn-pill-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50">
            早期投資入會
          </Link>
        </div>
      </div>
      <ThreeConnectionsSection />
      <FocusAreasSection />
      <AudienceCards />
      <StatsSection />
      <NewsSection />
      <NTUEcosystemSection />
      <PartnersSection />
    </>
  )
}
