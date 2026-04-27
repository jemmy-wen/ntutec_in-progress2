'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

/* ── Card data ───────────────────────────────────────────────────────── */
const CARDS = [
  {
    label: 'FOR STARTUPS',
    title: '新創團隊',
    desc: '從技術驗證到市場擴展，台大加速器與台大車庫提供完整的輔導資源、業師網絡與募資對接。',
    cta: '搶先預約 2027 梯次',
    href: '/apply',
    bg: '/images/events/demo-day-2025-booth2.jpg',
  },
  {
    label: 'FOR CORPORATES',
    title: '企業夥伴',
    desc: '以企業垂直加速器與共同開發模式，深化台大研發能量與企業戰略創新的連結。',
    cta: '開啟外部創新之路',
    href: '/corporate',
    bg: '/images/events/demo-day-2025-booth1.jpg',
  },
  {
    label: 'FOR INVESTORS',
    title: '投資人',
    desc: '加入台大天使會，接觸頂尖早期新創，參與示範日、業師評選與投資對接活動。',
    cta: '深入了解天使會',
    href: '/angel',
    bg: '/images/events/demo-day-2025-03.jpg',
  },
]

/* ── Desktop layout config ──────────────────────────────────────────── */
const CARD_W = 370
const CARD_H = 500
const OVERLAP = 20
const CARD_STEP = CARD_W - OVERLAP         // 350px
const STAGE_W = CARD_W + CARD_STEP * 2    // 1070px
const STAGE_H = CARD_H + 80

const TILT: { rotate: number; z: number }[] = [
  { rotate: -7, z: 2 },
  { rotate:  0, z: 3 },
  { rotate:  7, z: 1 },
]

/* ── Mobile tilt per card (alternating, subtle) ─────────────────────── */
const MOBILE_ROTATE = [-3, 0, 3]

export default function AudienceCards() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="bg-white py-14 md:py-24">
      <div className="container mx-auto px-6 md:px-8 lg:px-16">

        {/* ── Header ── */}
        <div className="mb-12 md:mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">
            Your Next Step
          </p>
          <h2
            className="text-[32px] md:text-[38px] lg:text-[48px] font-bold text-[#1a1a1a] leading-tight"
            style={{ fontFamily: "'Noto Serif TC', 'GenWanMin2 TW', serif" }}
          >
            你是哪一種夥伴？
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/svg/Vector.svg" alt="" aria-hidden="true" className="mt-3 h-4 w-auto mx-auto" />
          <p className="mt-4 text-[14px] md:text-[15px] text-[#666] leading-relaxed">
            新創、企業、投資人——不同的角色，同一個生態系。找到屬於你的資源。
          </p>
        </div>

        {/* ══════════════ MOBILE layout (< md) ══════════════ */}
        <div ref={ref} className="md:hidden flex flex-col gap-5 relative">

          {/* Thunder — top-left of section */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/Thunder--Streamline-Beveled-Scribbles [Vectorized].svg"
            alt="" aria-hidden="true"
            className="absolute pointer-events-none select-none"
            style={{ width: 52, top: -8, left: -16, zIndex: 10 }}
          />
          {/* Asterisk — top-right */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/Frame 27.svg"
            alt="" aria-hidden="true"
            className="absolute pointer-events-none select-none"
            style={{ width: 56, top: -8, right: -16, zIndex: 10 }}
          />

          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="relative overflow-hidden rounded-2xl"
              style={{
                height: 220,
                rotate: MOBILE_ROTATE[i],
                zIndex: CARDS.length - i,
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 160, damping: 22, delay: i * 0.1 }}
            >
              <Image
                src={card.bg}
                alt={card.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/15" />

              <div className="absolute inset-0 flex flex-col justify-between p-5">
                <div>
                  <span className="w-fit rounded-full border border-white/60 bg-white/15 backdrop-blur-sm px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                    {card.label}
                  </span>
                  <h3 className="mt-2 text-[24px] font-bold text-white leading-tight">
                    {card.title}
                  </h3>
                </div>
                <div>
                  <p className="text-[12px] text-white/75 leading-relaxed mb-2 line-clamp-2">
                    {card.desc}
                  </p>
                  <Link
                    href={card.href}
                    className="text-[12px] font-semibold text-[#00AA95]"
                  >
                    {card.cta} →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Bracket — below last card */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/Bracket-Doodle-Doodle--Streamline-Beveled-Scribbles [Vectorized].svg"
            alt="" aria-hidden="true"
            className="pointer-events-none select-none mx-auto mt-2"
            style={{ width: 52 }}
          />
        </div>

        {/* ══════════════ DESKTOP layout (≥ md) ══════════════ */}
        <div
          className="hidden md:block relative mx-auto"
          style={{ width: STAGE_W, height: STAGE_H }}
        >
          {/* Thunder — outside left edge */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/Thunder--Streamline-Beveled-Scribbles [Vectorized].svg"
            alt="" aria-hidden="true"
            className="absolute pointer-events-none select-none"
            style={{ width: 72, top: 55, left: -65, zIndex: 10 }}
          />
          {/* Asterisk — outside right edge */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/Frame 27.svg"
            alt="" aria-hidden="true"
            className="absolute pointer-events-none select-none"
            style={{ width: 80, top: 30, right: -70, zIndex: 10 }}
          />
          {/* Bracket — between card 2 and 3, bottom */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/Bracket-Doodle-Doodle--Streamline-Beveled-Scribbles [Vectorized].svg"
            alt="" aria-hidden="true"
            className="absolute pointer-events-none select-none"
            style={{ width: 68, bottom: -10, left: CARD_STEP * 2 - 10, zIndex: 10 }}
          />

          {CARDS.map((card, i) => {
            const t = TILT[i]
            return (
              <motion.div
                key={card.title}
                className="absolute top-0 overflow-hidden rounded-3xl"
                style={{
                  left: i * CARD_STEP,
                  width: CARD_W,
                  height: CARD_H,
                  zIndex: t.z,
                  transformOrigin: 'bottom center',
                }}
                initial={{ opacity: 0, y: 60, rotate: t.rotate }}
                animate={inView
                  ? { opacity: 1, y: 0, rotate: t.rotate }
                  : { opacity: 0, y: 60, rotate: t.rotate }
                }
                transition={{ type: 'spring', stiffness: 150, damping: 22, delay: i * 0.1 }}
              >
                <Image
                  src={card.bg}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="370px"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />

                <div className="absolute inset-0 flex flex-col p-7">
                  <span className="w-fit rounded-full border border-white/60 bg-white/15 backdrop-blur-sm px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                    {card.label}
                  </span>
                  <h3 className="mt-4 text-[28px] font-bold text-white">
                    {card.title}
                  </h3>
                  <div className="flex-1" />
                  <p className="text-[13px] text-white/75 leading-relaxed mb-4">
                    {card.desc}
                  </p>
                  <Link
                    href={card.href}
                    className="text-[13px] font-semibold text-[#00AA95] hover:text-white transition-colors"
                  >
                    {card.cta} →
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
