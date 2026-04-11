'use client'
import Link from 'next/link'
import Image from 'next/image'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { CursorSpotlight } from '@/components/ui/cursor-spotlight'
import { MagneticButton } from '@/components/ui/magnetic-button'

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Layers: gradient → beams → spotlight → content */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/90 to-teal-deep/30" />
      <BackgroundBeams className="z-[1]" />
      <CursorSpotlight />

      <div className="container relative z-10 py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* Left: text */}
          <div>
            <p className="micro-label text-teal-light mb-4 animate-[fadeUp_0.6s_ease-out_both]">
              NTU TAIDAH ENTREPRENEURSHIP CENTER · 台大創業生態系實戰基地
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl animate-[fadeUp_0.6s_ease-out_0.1s_both]">
              把台大最硬的研究
              <br />
              打造成世界級的新創
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-stone/80 animate-[fadeUp_0.6s_ease-out_0.2s_both]">
              13 年來累計輔導近 600 支新創團隊。以台大加速器、台大車庫、企業垂直加速器與天使投資俱樂部四大業務，幫助技術團隊從實驗室走進市場、對接產業與資本。
            </p>

            <div className="mt-10 flex flex-wrap gap-4 animate-[fadeUp_0.6s_ease-out_0.3s_both]">
              <MagneticButton strength={0.4}>
                <Link href="/apply" className="btn-pill-primary px-8 py-4 text-base block">
                  申請加入輔導計畫
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <Link
                  href="/about"
                  className="btn-pill-outline px-8 py-4 text-base block border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50"
                >
                  認識 NTUTEC
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* Right: illustration (desktop only) */}
          <div className="hidden lg:flex lg:justify-center lg:items-center animate-[fadeUp_0.8s_ease-out_0.4s_both]">
            <Image
              src="/images/photos/hero-main.jpg"
              alt="台大創創中心 — 新創起飛"
              width={600}
              height={300}
              className="rounded-2xl opacity-90 shadow-2xl"
              priority
            />
          </div>

        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
