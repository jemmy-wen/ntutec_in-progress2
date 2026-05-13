'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

const stats = [
  { value: '80+', label: '創業者參與' },
  { value: '40+', label: '輔導業師' },
  { value: '10',  label: '個月加速' },
]

export default function CommunitySection() {
  return (
    <section className="flex min-h-[560px] bg-white">

      {/* Left: text */}
      <motion.div
        className="flex w-[52%] flex-col justify-center px-16 py-16 lg:px-24"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#00AA95]">
          <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
            <circle cx="3" cy="3" r="1.5" fill="currentColor"/>
            <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
            <circle cx="13" cy="3" r="1.5" fill="currentColor"/>
            <circle cx="3" cy="8" r="1.5" fill="currentColor"/>
            <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
            <circle cx="13" cy="8" r="1.5" fill="currentColor"/>
            <circle cx="3" cy="13" r="1.5" fill="currentColor"/>
            <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
            <circle cx="13" cy="13" r="1.5" fill="currentColor"/>
          </svg>
          Community
        </p>

        <h2
          className="mb-5 text-3xl font-bold leading-tight text-[#181614] lg:text-4xl"
        >
          讓好想法，長出改變世界的力量
        </h2>

        <p className="mb-12 max-w-md text-sm leading-relaxed text-[#181614]/60">
          2026 輔導計畫，逾 80 位創業者與業師齊聚台大，展開為期十個月的創業加速旅程。
        </p>

        {/* Stats with dividers */}
        <div className="flex divide-x divide-[#e0ddd8]">
          {stats.map((s) => (
            <div key={s.label} className="pr-10 first:pl-0 last:pr-0 [&:not(:first-child)]:pl-10">
              <p className="text-4xl font-bold text-[#00AA95]">{s.value}</p>
              <p className="mt-1 text-xs text-[#181614]/50">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right: photo */}
      <div className="relative flex-1">
        <Image
          src="/images/events/opening-2026-audience.jpg"
          alt="台大創創社群"
          fill
          className="object-cover"
          sizes="52vw"
        />
      </div>

    </section>
  )
}
