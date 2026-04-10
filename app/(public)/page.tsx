import HeroSection from '@/components/public/home/HeroSection'
import AudienceCards from '@/components/public/home/AudienceCards'
import StatsSection from '@/components/public/home/StatsSection'
import NewsSection from '@/components/public/home/NewsSection'
import PartnersSection from '@/components/public/home/PartnersSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AudienceCards />
      <StatsSection />
      <NewsSection />
      <PartnersSection />
    </>
  )
}
