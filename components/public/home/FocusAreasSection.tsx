'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

const AREAS = [
  {
    key: 'ai',
    title: 'AI 軟體',
    description: '從基礎模型到垂直應用，涵蓋企業生成式 AI、Agent、資料基礎設施與 SaaS 平台。連結台大各院系研究能量與產業應用場域。',
    bg: '/images/events/opening-2026-coaching.jpg',
  },
  {
    key: 'biotech',
    title: '生技醫療',
    description: '結合台大醫學院、生命科學院與工學院的跨域研究，聚焦醫療器材、精準醫療與數位健康應用。',
    bg: '/images/events/opening-2026-audience.jpg',
  },
  {
    key: 'deeptech',
    title: '硬科技',
    description: '半導體、光電、材料科學與先進製造——台大理工研究能量直接轉化為可投資的硬科技新創。',
    bg: '/images/events/opening-2026-mentoring.jpg',
  },
  {
    key: 'newbiz',
    title: '創新商模',
    description: '電商、循環經濟、訂閱制與平台模式——以商業模式創新驅動市場與社會影響力。',
    bg: '/images/events/opening-2026-pitching.jpg',
  },
]

export default function FocusAreasSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-screen-xl px-8 lg:px-16">

        {/* Header — label + title left, description right */}
        <div className="mb-14 flex items-end justify-between gap-16">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#00AA95]">
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
              Focus Areas
            </p>
            <h2 className="text-3xl font-bold text-[#181614] lg:text-4xl">
              2026 四大聚焦領域
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#181614]/50">
            AI 軟體、生技醫療、硬科技、創新商模——結合台大跨院系研究能量與業界合作網絡，陪伴新創從概念走向市場。
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 items-stretch">
          {AREAS.map((area, i) => (
            <motion.div
              key={area.key}
              className="flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            >
              {/* Text block with left accent — fixed height so all cards align */}
              <div className="border-l-2 border-[#00AA95] pl-4 pb-6 min-h-[160px]">
                <h3 className="mb-3 text-base font-bold text-[#181614]">{area.title}</h3>
                <p className="text-xs leading-relaxed text-[#181614]/55">{area.description}</p>
              </div>

              {/* Photo — flex-1 fills remaining space */}
              <div className="relative flex-1 overflow-hidden" style={{ minHeight: '200px' }}>
                <Image
                  src={area.bg}
                  alt={area.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
