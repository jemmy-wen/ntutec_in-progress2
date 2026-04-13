'use client'
import Link from 'next/link'
import Image from 'next/image'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { CursorSpotlight } from '@/components/ui/cursor-spotlight'
import { MagneticButton } from '@/components/ui/magnetic-button'

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden">
      {/* Background: NTU campus photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/photos/ntu-about-cover.jpg"
          alt="台大校園 — 椰林大道與圖書館"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Dark gradient overlay */}
      {/* Lighter overlay — let the campus photo show through clearly */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#0A192F]/70 via-[#0A192F]/50 to-[#0A192F]/30" />

      {/* Subtle background beams */}
      <BackgroundBeams className="z-[3] opacity-20" />
      <CursorSpotlight />

      <div className="container relative z-[5] py-24">
        <div className="max-w-2xl">

          {/* Label */}
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#14B8A6] animate-[fadeUp_0.6s_ease-out_both] drop-shadow-md">
            NTU TAIDAH ENTREPRENEURSHIP CENTER
          </p>

          {/* Headline */}
          <h1 className="animate-[fadeUp_0.6s_ease-out_0.1s_both]">
            <span className="block text-5xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl" style={{ letterSpacing: '-0.03em' }}>
              台大創創中心
            </span>
            <span className="mt-4 block text-xl font-medium tracking-wide text-white/90 drop-shadow-md sm:text-2xl lg:text-3xl">
              Bridging NTU Innovation to Global Impact
            </span>
          </h1>

          {/* Sub-subtitle */}
          <p className="mt-6 text-lg leading-relaxed text-white/80 drop-shadow-md animate-[fadeUp_0.6s_ease-out_0.2s_both] lg:text-xl">
            從台大出發。連結產業。走向市場。
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4 animate-[fadeUp_0.6s_ease-out_0.3s_both]">
            <MagneticButton strength={0.4}>
              <Link href="/apply" className="btn-pill-primary px-8 py-4 text-base block">
                申請輔導計畫
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <Link
                href="/about"
                className="btn-pill-outline px-8 py-4 text-base block border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50"
              >
                走進 NTUTEC
              </Link>
            </MagneticButton>
          </div>

        </div>
      </div>

      {/* Bottom white gradient fade */}
      <div className="absolute inset-x-0 bottom-0 z-[4] h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
