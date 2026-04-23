'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'

const AREAS = [
  {
    key: 'ai',
    label: 'AI SOFTWARE',
    title: 'AI 軟體',
    description:
      '從基礎模型到垂直應用，涵蓋企業生成式 AI、Agent、資料基礎設施與 SaaS 平台。連結台大各院系研究能量與產業應用場域。',
    cases: 'MoBagel、漸強實驗室、AmazingTalker 等',
    bg: '/images/photos/ntu-research-cover.jpg',
  },
  {
    key: 'biotech',
    label: 'BIOTECH & MEDICAL',
    title: '生技醫療',
    description:
      '結合台大醫學院、生命科學院與工學院的跨域研究，聚焦醫療器材、精準醫療與數位健康應用。',
    cases: '思輔科技、Home心 等',
    bg: '/images/photos/ntu-campus-aerial.jpg',
  },
  {
    key: 'deeptech',
    label: 'DEEP TECH',
    title: '硬科技',
    description:
      '半導體、光電、材料科學與先進製造——台大理工研究能量直接轉化為可投資的硬科技新創。',
    cases: '歐姆佳科技、3drens 等',
    bg: '/images/photos/ntu-library-bright.jpg',
  },
  {
    key: 'newbiz',
    label: 'NEW BUSINESS MODELS',
    title: '創新商模',
    description:
      '電商、循環經濟、訂閱制與平台模式——以商業模式創新驅動市場與社會影響力。',
    cases: '配客嘉、方格子、Hotcake 等',
    bg: '/images/photos/ntu-gate-bright.jpg',
  },
]

export default function FocusAreasSection() {
  const [active, setActive] = useState('ai')

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container">

        {/* Header row */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00aa95]">
              Focus Areas
            </p>
            <h2 className="text-3xl font-bold text-[#181614] md:text-4xl">
              2026 四大聚焦領域
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-slate-500 lg:mt-8">
            AI 軟體、生技醫療、硬科技、創新商模——結合台大跨院系研究能量與業界合作網絡，陪伴新創從概念走向市場。
          </p>
        </div>

        {/* Accordion cards — desktop horizontal fan, mobile vertical stack */}
        <div className="hidden gap-3 md:flex" style={{ height: '480px' }}>
          {AREAS.map((area) => {
            const isActive = active === area.key
            return (
              <motion.div
                key={area.key}
                className="relative overflow-hidden rounded-2xl cursor-pointer flex-shrink-0"
                animate={{ flexGrow: isActive ? 3 : 1 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                onHoverStart={() => setActive(area.key)}
              >
                <Image
                  src={area.bg}
                  alt={area.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/45" />

                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                      {area.label}
                    </p>
                    <h3 className="text-2xl font-bold text-white">{area.title}</h3>
                  </div>

                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                    transition={{ duration: 0.25, delay: isActive ? 0.2 : 0 }}
                  >
                    <p className="text-sm leading-relaxed text-white/80">{area.description}</p>
                    <div className="my-4 border-t border-white/20" />
                    <p className="text-sm text-white/70">
                      <span className="font-semibold text-white">代表案例：</span>
                      {area.cases}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-4 md:hidden">
          {AREAS.map((area) => (
            <div key={area.key} className="relative h-48 overflow-hidden rounded-2xl">
              <Image src={area.bg} alt={area.title} fill className="object-cover" loading="lazy" sizes="100vw" />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 flex flex-col justify-between p-5">
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/60">{area.label}</p>
                  <h3 className="text-xl font-bold text-white">{area.title}</h3>
                </div>
                <p className="text-xs text-white/70">
                  <span className="font-semibold text-white">代表案例：</span>{area.cases}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
