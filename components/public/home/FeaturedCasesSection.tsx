'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

const CASES = [
  {
    key: 'udn',
    num: '01',
    tags: ['企業垂直加速器', '數位轉型'],
    title: '聯合報系 UDN × 新創外部創新',
    subtitle: '資深媒體集團的第二成長曲線，從內容到新商模的跨域共創',
    body: null,
    highlights: [
      '《天下雜誌》專文報導「UDN 與新創合作開啟第二成長曲線」',
      '旗下聯經出版、經濟日報同步導入外部創新顧問服務',
      '2020 年起迄今的長期戰略夥伴',
    ],
    quote: null,
    quoteBy: null,
    hashtags: ['#Media', '#數位轉型', '#天下雜誌報導', '#長期夥伴'],
    img: '/images/events/opening-2026-networking.jpg',
  },
  {
    key: 'ase',
    num: '02',
    tags: ['創新競賽', 'ESG / 社會創新'],
    title: '日月光 ASE × 社會創新競賽',
    subtitle: '半導體龍頭攜手台大創創，用競賽挖掘社會影響力新創',
    body: null,
    highlights: [
      '台大創創協辦完整賽程：初審、面審、新創輔導',
      '以社會創新為主題，強化企業 ESG 與新創生態連結',
      '獎金＋企業資源，協助入圍團隊實踐提案',
    ],
    quote: null,
    quoteBy: null,
    hashtags: ['#ASE', '#ESG', '#社會創新', '#競賽'],
    img: '/images/events/opening-2026-biggroup.jpg',
  },
  {
    key: 'sat',
    num: '03',
    tags: ['企業垂直加速器', '2022 梯次'],
    title: '聯經出版 × SAT. 知識衛星',
    subtitle: '出版業老字號 × 線上課程新創，共創藝文教育市場藍海',
    body: '創立近半世紀的聯經出版，長期深耕人文藝術優質內容，卻苦於找不到數位延伸的突破口。透過台大創創中心企業垂直加速器，聯經與線上課程平台 SAT. 知識衛星在六個月輔導期間深度共創，共同發現藝文線上課程的未開發市場。\n\n雙方聯手推出「故事 × 聆賞 × 生活｜焦元溥的 37 堂古典音樂課」，上線約一年內達成 NT$1,000 萬營收，驗證了藝文教育市場的強勁需求，也開啟了聯經數位轉型的新篇章。',
    highlights: null,
    quote: '外部創新能加速異業合作，對本業的優勢帶來全新眼光，幫助我們找到可驗證的新商機。',
    quoteBy: '聯經出版總經理 陳芝宇',
    hashtags: [],
    img: '/images/events/opening-2026-coaching.jpg',
  },
  {
    key: 'acer',
    num: '04',
    tags: ['企業垂直加速器', '外部創新顧問'],
    title: '宏碁 Acer Foundation × 律果科技 LegalSign.ai',
    subtitle: '企業贊助加速器 × AI 法務科技新創，共創法律合約智慧化',
    body: null,
    highlights: [
      '獲《哈佛商業評論》HBR 專文報導',
      '榮獲經濟部「百棧拔獎」潛力新創',
      '宏碁作為企業導師協助市場驗證，加速商業落地',
    ],
    quote: null,
    quoteBy: null,
    hashtags: ['#LegalTech', '#AI', '#HBR報導', '#宏碁'],
    img: '/images/events/opening-2026-pitching.jpg',
  },
]

export default function FeaturedCasesSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1)
    setCurrent(next)
  }
  const prev = () => go((current - 1 + CASES.length) % CASES.length)
  const next = () => go((current + 1) % CASES.length)

  const c = CASES[current]

  return (
    <section className="relative overflow-hidden bg-[#00AA95] px-8 py-16 md:py-24 lg:px-16">

      {/* Header */}
      <div className="mx-auto mb-10 flex max-w-screen-xl items-end justify-between">
        <div>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
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
            Featured Cases
          </p>
          <h2 className="text-3xl font-bold text-white lg:text-4xl">企業合作成功案例</h2>
          <p className="mt-3 max-w-lg text-sm text-white/60">
            累計 27 期、35 家企業夥伴的深度共創實績，涵蓋科技、媒體、金融等多元產業。
          </p>
        </div>

        {/* Counter */}
        <div className="flex items-baseline gap-1 select-none" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          <span className="text-5xl font-bold text-white">{c.num}</span>
          <span className="text-xl text-white/40">/ {String(CASES.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Card stack */}
      <div className="relative mx-auto" style={{ maxWidth: 860, height: 520 }}>

        {/* Background ghost cards — rotated */}
        {[2, 1].map((offset) => (
          <div
            key={offset}
            className="absolute inset-0 rounded-2xl bg-white shadow-lg"
            style={{
              transform: `translateX(${offset * 3}%) translateY(${offset * 8}px) rotateZ(${offset * 1.6}deg)`,
              transformOrigin: 'center bottom',
              opacity: 1 - offset * 0.1,
              zIndex: offset,
            }}
          />
        ))}

        {/* Active card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={c.key}
            custom={direction}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -80 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-0 z-10 flex"
          >
            {/* Photo box */}
            <div className="relative z-10 w-[44%] shrink-0 overflow-hidden rounded-2xl shadow-xl">
              <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
                <span className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>{c.num}</span>
                <span className="text-xs font-medium text-white/70">Featured Cases</span>
              </div>
              <Image
                src={c.img}
                alt={c.title}
                fill
                className="object-cover"
                sizes="380px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </div>

            {/* Text box — overlaps photo on left */}
            <div className="relative z-0 -ml-6 flex flex-1 flex-col justify-center overflow-y-auto rounded-2xl bg-white px-12 py-10 shadow-xl">
              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-2">
                {c.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#00AA95]/10 px-3 py-0.5 text-xs font-semibold text-[#00AA95]">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="mb-2 text-xl font-bold text-[#181614]">{c.title}</h3>
              <p className="mb-5 text-sm font-medium text-[#00AA95]">{c.subtitle}</p>

              {c.body && (
                <div className="mb-5 space-y-3 text-sm leading-relaxed text-[#181614]/60">
                  {c.body.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
              )}

              {c.highlights && (
                <ul className="mb-5 space-y-2">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-[#181614]/70">
                      <span className="mt-0.5 shrink-0 text-[#00AA95]">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {c.quote && (
                <blockquote className="border-l-2 border-[#00AA95] pl-4">
                  <p className="text-sm font-medium leading-relaxed text-[#181614]">「{c.quote}」</p>
                  <p className="mt-2 text-xs text-[#181614]/50">— {c.quoteBy}</p>
                </blockquote>
              )}

              {c.hashtags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1">
                  {c.hashtags.map((h) => (
                    <span key={h} className="text-xs text-[#181614]/30">{h}</span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="relative z-20 mx-auto mt-8 flex max-w-[860px] items-center justify-between">
        <button onClick={prev} aria-label="上一個" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition-colors">←</button>
        <div className="flex gap-2">
          {CASES.map((_, i) => (
            <button key={i} onClick={() => go(i)} aria-label={`第 ${i + 1} 張`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`} />
          ))}
        </div>
        <button onClick={next} aria-label="下一個" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition-colors">→</button>
      </div>

    </section>
  )
}
