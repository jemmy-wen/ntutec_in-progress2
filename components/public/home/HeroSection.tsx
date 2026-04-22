'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="bg-[#00aa95]">
      {/* Text block — two columns, 20px side margin, space-between */}
      <div className="flex items-end justify-between px-5 pt-10 pb-8 gap-8">
        {/* Left: main title */}
        <div className="shrink-0">
          <h1 className="text-5xl font-bold text-white leading-tight md:text-6xl lg:text-[72px]" style={{ letterSpacing: '-0.03em' }}>
            台大創創中心
          </h1>
          <p className="mt-3 text-lg font-medium text-white/80 md:text-xl lg:text-2xl">
            Bridging NTU Innovation to Global Impact
          </p>
        </div>

        {/* Right: label + description + CTAs */}
        <div className="max-w-xs lg:max-w-sm shrink-0 text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 leading-relaxed">
            NTU TAIDAH<br />ENTREPRENEURSHIP CENTER
          </p>
          <p className="mt-3 text-base text-white/80 leading-relaxed lg:text-lg">
            從台大出發。連結產業。走向市場。
          </p>
          <div className="mt-4 flex flex-wrap justify-end gap-3">
            <Link
              href="/apply"
              className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#00aa95] transition-all hover:bg-white/90 hover:scale-[1.02]"
            >
              申請輔導計畫
            </Link>
            <Link
              href="/about"
              className="rounded-full border-2 border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/70 hover:scale-[1.02]"
            >
              走進 NTUTEC
            </Link>
          </div>
        </div>
      </div>

      {/* Photo block — 20px margin all sides */}
      <div className="mx-5 mb-5">
        <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '1404/455' }}>
          <Image
            src="/images/photos/ntu-about-cover.jpg"
            alt="台大校園 — 椰林大道與圖書館"
            fill
            className="object-cover object-center"
            priority
            sizes="calc(100vw - 40px)"
          />
        </div>
      </div>
    </section>
  )
}
