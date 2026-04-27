'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'

/* ── Data ───────────────────────────────────────────────────────────── */
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

/* ── Dimensions ─────────────────────────────────────────────────────── */
const CARD_W = 320
const CARD_H = Math.round((409 / 366) * CARD_W) // ≈ 358
const CARD_STEP = 235  // step between card left edges (~73% visible per card)

/* ── Mouse-cursor SVG icon ──────────────────────────────────────────── */
function CursorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 22" fill="none" aria-hidden>
      <path
        d="M1 1L1 17L5.5 13L8.5 20L10.5 19L7.5 12H13L1 1Z"
        fill="#1a1a1a"
        stroke="#1a1a1a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ── Section ────────────────────────────────────────────────────────── */
export default function FocusAreasSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [tilts, setTilts] = useState(AREAS.map(() => ({ x: 0, y: 0 })))
  const sectionRef = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback((i: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (activeIdx !== null) return
    const r = e.currentTarget.getBoundingClientRect()
    const tx = (e.clientX - r.left - r.width / 2) / (r.width / 2)
    const ty = (e.clientY - r.top - r.height / 2) / (r.height / 2)
    setTilts(prev => prev.map((t, idx) => idx === i ? { x: tx, y: ty } : t))
  }, [activeIdx])

  const onMouseLeave = useCallback((i: number) => {
    setTilts(prev => prev.map((t, idx) => idx === i ? { x: 0, y: 0 } : t))
  }, [])

  const totalW = CARD_W + CARD_STEP * (AREAS.length - 1)
  const activeArea = activeIdx !== null ? AREAS[activeIdx] : null

  return (
    <section ref={sectionRef} className="relative bg-[#f0faf9] py-14 md:py-20 overflow-hidden">
      <div className="container mx-auto px-8 lg:px-16">

        {/* ── Header ── */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">
            Focus Areas
          </p>
          <h2
            className="text-[32px] lg:text-[38px] font-bold text-[#1a1a1a] leading-tight"
            style={{ fontFamily: "'Noto Serif TC', 'GenWanMin2 TW', serif" }}
          >
            關注的創新方向
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/svg/Vector.svg" alt="" aria-hidden="true" className="mt-2 h-4 w-auto" />
          <p className="mt-4 text-[14px] text-[#666] leading-relaxed" style={{ maxWidth: '28em' }}>
            AI 軟體、生技醫療、硬科技、創新商模——結合台大跨院系研究能量與業界合作網絡，陪伴新創從概念走向市場。
          </p>
        </div>

        {/* ── Cards row ── */}
        <div
          className="relative mx-auto"
          style={{ width: totalW, height: CARD_H + 32 }}
        >
          {AREAS.map((area, i) => {
            const isActive = activeIdx === i
            const t = tilts[i]

            return (
              <motion.div
                key={area.key}
                className="absolute top-0"
                style={{
                  left: i * CARD_STEP,
                  width: CARD_W,
                  height: CARD_H,
                  zIndex: isActive ? 1 : i + 1,  // active card stays in row (invisible), expanded card is in overlay
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d',
                  perspective: '500px',
                }}
                animate={{
                  rotateY: activeIdx !== null ? 0 : t.x * 18,
                  rotateX: activeIdx !== null ? 0 : -t.y * 13,
                  opacity: activeIdx !== null && !isActive ? 0.3 : isActive ? 0 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onMouseMove={e => onMouseMove(i, e)}
                onMouseLeave={() => onMouseLeave(i)}
                onClick={() => setActiveIdx(i)}
              >
                {/* Card shape — mask uses the actual Vector 11.svg */}
                <div
                  className="relative w-full h-full"
                  style={{
                    WebkitMaskImage: "url('/svg/Vector 11.svg')",
                    maskImage:        "url('/svg/Vector 11.svg')",
                    WebkitMaskSize:   '100% 100%',
                    maskSize:         '100% 100%',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat:       'no-repeat',
                  }}
                >
                  <Image
                    src={area.bg}
                    alt={area.title}
                    fill
                    className="object-cover"
                    sizes="320px"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                </div>

                {/* Cursor + pill — outside bottom-left of card */}
                <div
                  className="absolute flex items-center gap-2"
                  style={{ bottom: -4, left: -4 }}
                >
                  <CursorIcon />
                  <span className="rounded-full border border-[#1a1a1a] bg-white px-4 py-1.5 text-[15px] font-semibold text-[#1a1a1a] whitespace-nowrap">
                    {area.title}
                  </span>
                </div>
              </motion.div>
            )
          })}

          {/* ── Expanded card — floats above row ── */}
          <AnimatePresence>
            {activeArea && activeIdx !== null && (
              <motion.div
                key="expanded"
                className="absolute overflow-hidden rounded-2xl"
                style={{
                  // Start from the clicked card's position
                  top: 0,
                  left: activeIdx * CARD_STEP,
                  zIndex: 30,
                  cursor: 'pointer',
                }}
                initial={{
                  width: CARD_W,
                  height: CARD_H,
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0.92,
                }}
                animate={{
                  width: 580,
                  height: 380,
                  x: totalW / 2 - activeIdx * CARD_STEP - 290,
                  y: (CARD_H - 380) / 2,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                }}
                transition={{ type: 'spring', stiffness: 240, damping: 28 }}
                onClick={() => setActiveIdx(null)}
              >
                <Image
                  src={activeArea.bg}
                  alt={activeArea.title}
                  fill
                  className="object-cover"
                  sizes="580px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55 mb-2">
                    {activeArea.label}
                  </p>
                  <h3 className="text-[30px] font-bold text-white mb-3">
                    {activeArea.title}
                  </h3>
                  <p className="text-[13px] text-white/80 leading-relaxed mb-3">
                    {activeArea.description}
                  </p>
                  <p className="text-[12px] text-white/55">
                    代表案例：{activeArea.cases}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Click outside to close */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setActiveIdx(null)}
        />
      )}
    </section>
  )
}
