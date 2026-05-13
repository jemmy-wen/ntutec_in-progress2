'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

const stats = [
  { value: '15', unit: '位', label: '學員名額' },
  { value: '16', unit: '', label: '業師＋諮詢委員' },
  { value: '10', unit: '週', label: '含 7 週矽谷駐地' },
]

const infoBar = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342" />
      </svg>
    ),
    title: '招生對象',
    desc: '臺大大學部、碩博士班在學學生',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    title: '課程期間',
    desc: '2026 / 6 / 22 – 8 / 28（含行前＋矽谷＋成果）',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    title: '主辦單位',
    desc: 'D-School × 創意創業學程 × 台大創創中心',
  },
]

export default function FeaturedProgramSection() {
  return (
    <section className="relative overflow-hidden bg-[#00AA95]">

      {/* Dot texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1.2px, transparent 1.2px)',
          backgroundSize: '18px 18px',
        }}
      />

      <div className="relative z-10 flex min-h-[580px]">

        {/* Left: photo — full height */}
        <div className="relative w-[48%] shrink-0">
          <Image
            src="/images/events/opening-2026-coaching.jpg"
            alt="矽谷課程輔導現場"
            fill
            className="object-cover"
            sizes="48vw"
          />
        </div>

        {/* Right: content */}
        <motion.div
          className="flex flex-1 flex-col justify-center px-14 py-16 pb-24"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Badge */}
          <div className="mb-5 flex items-center gap-2">
            <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-white/70" aria-hidden="true">
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
            <span className="rounded-full border border-white/40 px-3 py-0.5 text-xs font-semibold text-white/90">
              2026 暑期招生中・4/29 報名開放
            </span>
          </div>

          {/* Title — white box fits text width */}
          <h2
            className="mb-5 self-start bg-white px-3 py-1.5 text-2xl font-bold text-[#00AA95] leading-snug"
            style={{ fontFamily: "'Noto Serif TC', serif" }}
          >
            把你的創業構想帶到矽谷驗證
          </h2>

          {/* Description */}
          <p className="mb-8 max-w-xs text-sm leading-relaxed text-white/80">
            10 週課程、其中 7 週為矽谷沉浸式探索，與 Stanford、Berkeley SkyDeck、Google、Meta 創新生態深度連結。駐地業師 14 位＋諮詢委員 2 位，補助機票上限 5 萬＋生活費 10 萬。
          </p>

          {/* Stats with dividers */}
          <div className="mb-10 flex divide-x divide-white/20">
            {stats.map((s) => (
              <div key={s.label} className="pr-10 first:pl-0 last:pr-0 [&:not(:first-child)]:pl-10">
                <p className="text-4xl font-bold text-white">
                  {s.value}<span className="text-xl font-semibold">{s.unit}</span>
                </p>
                <p className="mt-1 text-xs text-white/70">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#181614] transition-colors hover:bg-white/90"
            >
              立即申請 →
            </Link>
            <Link
              href="/accelerator"
              className="rounded-full border border-white/50 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              了解課程詳情
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Info bar — absolute bottom right */}
      <div className="absolute bottom-0 right-0 z-10 flex w-[62%] items-center divide-x divide-[#e0ddd8] bg-white px-10 py-5">
          {infoBar.map((item) => (
            <div key={item.title} className="flex flex-1 items-start gap-3 px-6 first:pl-2">
              <span className="text-[#00AA95]">{item.icon}</span>
              <div>
                <p className="text-xs font-semibold text-[#00AA95]">{item.title}</p>
                <p className="mt-0.5 text-xs text-[#181614]/60">{item.desc}</p>
              </div>
            </div>
          ))}
      </div>

    </section>
  )
}
