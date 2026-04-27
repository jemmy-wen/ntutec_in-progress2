'use client'

import Image from 'next/image'

export default function CommunitySection() {
  return (
    <section className="bg-[#f0faf9] py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-center">

          {/* ── Left: text ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">
              Community
            </p>

            <div>
              <h2
                className="text-[32px] lg:text-[38px] leading-[1.25] font-bold text-[#1a1a1a]"
                style={{ fontFamily: "'Noto Serif TC', 'GenWanMin2 TW', serif" }}
              >
                讓好想法，<br />
                長出改變世界的力量
              </h2>
              {/* 底線裝飾 SVG */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/Vector.svg"
                alt=""
                aria-hidden="true"
                className="mt-2 h-4 w-auto"
              />
            </div>

            <p className="text-[15px] text-[#555] leading-relaxed" style={{ maxWidth: '26em' }}>
              2026 輔導計畫開幕式，逾 80 位創業者與輔導業師齊聚台大，展開為期十個月的創業加速之旅。
            </p>
          </div>

          {/* ── Right: Bento photos ─────────────────────────────────────── */}
          <div className="grid grid-cols-[3fr_2fr] grid-rows-2 gap-3 h-[420px] lg:h-[460px]">

            {/* Large photo — spans 2 rows */}
            <div className="row-span-2 relative rounded-2xl overflow-hidden">
              <Image
                src="/images/events/opening-2026-01.jpg"
                alt="2026 輔導計畫開幕"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 35vw, 60vw"
                loading="lazy"
              />
            </div>

            {/* Top-right photo */}
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/images/events/opening-2026-group.jpg"
                alt="業師合影"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 22vw, 40vw"
                loading="lazy"
              />
            </div>

            {/* Bottom-right photo */}
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/images/events/opening-2026-pitching.jpg"
                alt="Demo Day"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 22vw, 40vw"
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
