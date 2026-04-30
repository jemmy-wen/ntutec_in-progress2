'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

const stats2025 = [
  { value: '74', unit: '位', label: '投資人到場', sub: 'VC 44 位 + 天使 30 位' },
  { value: '51', unit: '件', label: '媒合意向', sub: '現場直接促成' },
  { value: '356', unit: '人', label: '報名參加', sub: '233 人到場出席' },
  { value: '9.06', unit: '/10', label: '活動滿意度', sub: '51 份現場問卷' },
]

const eventStructure = [
  { badge: '新創 Pitch 舞台', items: [{ num: '14', title: '組新創路演', desc: 'NTUTEC 11 組 + 鳥巢 / EiMBA 3 組' }, { num: '15', title: '個互動攤位', desc: '新創與投資人一對一深度交流' }, { num: '2', title: '大競賽獎項', desc: '最佳創業簡報獎 · 最具投資價值獎' }] },
]

const yearHistory = ['2022', '2023', '2024（2屆）', '2025', '2026（預計）']

const ctas = [
  { label: 'For Startups', title: '我是新創團隊', desc: '想在 Demo Day 向投資人 Pitch？每年 10 月截止收件，先申請輔導計畫、通過 Gate 審核，即可獲得舞台。', href: '/apply', cta: '申請輔導計畫', style: 'bg-[#00AA95] text-white' as const },
  { label: 'For Investors', title: '我是投資人', desc: '想出席下一屆 Demo Day？名額有限，採邀請制。歡迎聯繫我們取得出席邀請。', href: '/angel-apply', cta: '申請天使入會', style: 'border border-[#e0ddd8] text-[#181614]' as const },
  { label: 'For Enterprises', title: '企業贊助洽詢', desc: '想共同主辦 Demo Day 或企業垂直加速器？我們提供冠名、攤位與論壇講台，直接對接 600+ 校友新創生態。', href: '/corporate', cta: '了解企業合作', style: 'border border-[#e0ddd8] text-[#181614]' as const },
]

export default function DemoDayPageClient() {
  return (
    <main>
      {/* Hero */}
      <section className="flex border-b border-[#e0ddd8]" style={{ height: 'calc(100vh - 80px)' }}>
        <motion.div
          className="relative flex w-1/2 flex-col justify-between border-r border-[#e0ddd8] px-12 py-16"
          style={{ backgroundImage: 'linear-gradient(to right, #e0ddd8 1px, transparent 1px)', backgroundSize: '25% 100%' }}
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Annual Demo Day</p>
          <div>
            <h1 className="text-5xl font-bold leading-tight text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              Demo Day<br />年度路演日
            </h1>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate-500">
              台大校園年度最大新創投資媒合活動，精選新創與投資人面對面，7 屆持續創下新高。
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/apply" className="rounded-full bg-[#00AA95] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]">
              申請輔導計畫
            </Link>
            <Link href="/angel-apply" className="rounded-full border border-[#e0ddd8] px-7 py-3 text-sm font-semibold text-[#181614] transition-colors hover:border-[#00AA95] hover:text-[#00AA95]">
              投資人出席
            </Link>
          </div>
        </motion.div>
        <motion.div className="relative w-1/2 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>
          <Image src="/images/events/demo-day-2025-group.jpg" alt="Demo Day 2025" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#181614]/20" />
        </motion.div>
      </section>

      {/* 2025 Stats */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="border-b border-[#e0ddd8] py-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">2025 Demo Day 成果</p>
            <p className="mt-2 text-sm text-slate-400">2025 年 12 月 10 日，正大講堂 & 國學講堂（台大校內），創下 7 屆以來多項最高紀錄。</p>
          </div>
          <div className="grid grid-cols-2 divide-x divide-[#e0ddd8] md:grid-cols-4">
            {stats2025.map((s) => (
              <motion.div key={s.label} className="py-12 text-center" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}>
                <span className="text-5xl font-bold text-[#181614]">{s.value}</span>
                <span className="text-xl font-semibold text-[#00AA95]">{s.unit}</span>
                <p className="mt-2 text-sm font-semibold text-[#181614]">{s.label}</p>
                <p className="mt-1 text-xs text-slate-400">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Structure */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Event Structure</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>活動架構</h2>
            </div>
            <div className="py-24 pl-16">
              <div className="mb-6">
                <span className="inline-block rounded-full bg-[#00AA95] px-4 py-1 text-sm font-bold text-white">新創 Pitch 舞台</span>
                <ul className="mt-6 space-y-5">
                  {[{ num: '14', title: '組新創路演', desc: 'NTUTEC 11 組 + 鳥巢 / EiMBA 3 組' }, { num: '15', title: '個互動攤位', desc: '新創與投資人一對一深度交流' }, { num: '2', title: '大競賽獎項', desc: '最佳創業簡報獎 · 最具投資價值獎' }].map((item) => (
                    <li key={item.num} className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f7f5] text-sm font-bold text-[#00AA95]">{item.num}</span>
                      <div>
                        <p className="font-semibold text-[#181614]">{item.title}</p>
                        <p className="mt-0.5 text-sm text-slate-400">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 border-t border-[#e0ddd8] pt-8">
                <span className="inline-block rounded-full bg-[#00AA95] px-4 py-1 text-sm font-bold text-white">產業論壇</span>
                <div className="mt-6 space-y-3 text-sm">
                  <div><p className="font-semibold text-[#181614]">2025 論壇主題</p><p className="mt-1 text-slate-500">「創業 x AI：加速、放大、重新定義」</p></div>
                  <div><p className="font-semibold text-[#181614]">共同主辦</p><p className="mt-1 text-slate-500">EiMBA 創業創新 · 台大鳥巢</p></div>
                  <div><p className="font-semibold text-[#181614]">特邀講者</p><p className="mt-1 text-slate-500">鍾哲民 · 史大俠</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8 py-24">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">2025 現場紀實</p>
            <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>Demo Day 現場</h2>
            <p className="mt-4 text-slate-500">2025 年 12 月 10 日，356 人次見證台大年度最大新創投資媒合盛事。</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:col-span-2">
              <Image src="/images/events/demo-day-2025-group.jpg" alt="2025 Demo Day 大合照" fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="66vw" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src="/images/events/demo-day-2025-01.jpg" alt="林文欽開幕致詞" fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="33vw" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src="/images/events/demo-day-2025-04.jpg" alt="主舞台路演現場" fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="50vw" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src="/images/events/demo-day-2025-05.jpg" alt="論壇對談" fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8 py-20 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Our History</p>
          <h2 className="mb-6 text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>7 屆持續成長</h2>
          <p className="mx-auto mb-10 max-w-2xl text-slate-500">自 2022 年起連續舉辦，7 屆逐年成長。2025 年 Accupass 瀏覽 9,775 次，創近 7 屆最高。下一屆預計於 2026 年 12 月舉辦。</p>
          <div className="flex flex-wrap justify-center gap-2">
            {yearHistory.map((y) => (
              <span key={y} className="rounded-full border border-[#00AA95]/30 bg-white px-4 py-1.5 text-sm font-medium text-[#00AA95]">{y}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Three-way CTA */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-px bg-[#e0ddd8] md:grid-cols-3">
            {ctas.map((c, i) => (
              <motion.div key={c.label} className="bg-white p-12" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{c.label}</p>
                <h3 className="mb-4 text-2xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>{c.title}</h3>
                <p className="mb-8 text-sm leading-relaxed text-slate-500">{c.desc}</p>
                <Link href={c.href} className={`inline-block rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${c.style} ${i === 0 ? 'hover:bg-[#008f7d]' : 'hover:border-[#00AA95] hover:text-[#00AA95]'}`}>
                  {c.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
