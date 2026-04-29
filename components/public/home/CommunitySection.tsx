'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

// ── Desktop orbit arc ──────────────────────────────────────────────
// SVG arc: viewBox="0 0 100 60", path="M 2,58 C 25,4 75,4 98,58"
// Avatars placed at bezier t = 0.05, 0.25, 0.50, 0.75, 0.95
const AVATARS = [
  { src: '/images/events/opening-2026-networking.jpg', left: '0%',    top: '72%',   size: 60 },
  { src: '/images/events/opening-2026-mentoring.jpg',  left: '23.5%', top: '35%',   size: 48 },
  { src: '/images/events/opening-2026-biggroup.jpg',   left: '50%',   top: '18%',   size: 56 },
  { src: '/images/events/opening-2026-coaching.jpg',   left: '76.5%', top: '46.0%', size: 48 },
  { src: '/images/events/opening-2026-pitching.jpg',   left: '94.4%', top: '83.8%', size: 60 },
]

const PILLS = [
  { text: '2026 開幕式',   icon: '🎉', left: '13%',  top: '56%', green: false },
  { text: '業師配對完成', icon: '✓',   left: '35%',  top: '26%', green: true  },
  { text: 'Demo Day ✓',   icon: '📊',  left: '62%',  top: '26%', green: false },
  { text: '80+ 創業者',   icon: '👥',  left: '85%',  top: '54%', green: false },
]

// ── Mobile circle — pentagon positions ────────────────────────────
// Container: 300×300px, center=(150,150), ring radius=105px
// angle[i] = -90° + i*72°  (top → clockwise)
const CX = 150, CY = 150, R = 105
const PENTAGON = [
  { x: CX,                                  y: CY - R                                }, // top
  { x: CX + R * Math.cos((-18 * Math.PI) / 180), y: CY + R * Math.sin((-18 * Math.PI) / 180) }, // top-right
  { x: CX + R * Math.cos((54  * Math.PI) / 180), y: CY + R * Math.sin((54  * Math.PI) / 180) }, // bot-right
  { x: CX + R * Math.cos((126 * Math.PI) / 180), y: CY + R * Math.sin((126 * Math.PI) / 180) }, // bot-left
  { x: CX + R * Math.cos((198 * Math.PI) / 180), y: CY + R * Math.sin((198 * Math.PI) / 180) }, // top-left
]


export default function CommunitySection() {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="container">

        {/* Header */}
        <div className="mb-16 text-center">
          <motion.p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-teal"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Community
          </motion.p>
          <motion.h2
            className="text-2xl font-bold text-[#181614] md:text-3xl lg:text-4xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, delay: 0.06 }}
          >
            讓好想法，長出改變世界的力量
          </motion.h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/svg/Vector.svg" alt="" aria-hidden="true" className="mt-3 h-4 w-auto mx-auto" />
          <motion.p
            className="mt-4 mx-auto max-w-lg text-base leading-relaxed text-slate-500"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            2026 輔導計畫，逾 80 位創業者與業師齊聚台大，展開為期十個月的創業加速旅程。
          </motion.p>
        </div>

        {/* ── Desktop: orbit arc ── */}
        <motion.div
          className="relative mx-auto hidden w-full max-w-3xl md:block"
          style={{ height: '280px' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 60" preserveAspectRatio="none" fill="none">
            <path d="M 2,58 C 25,4 75,4 98,58" stroke="#e5e7eb" strokeWidth="0.6" />
          </svg>

          {AVATARS.map((a, i) => (
            <motion.div
              key={i}
              className="absolute overflow-hidden rounded-full border-2 border-white shadow-md"
              style={{ left: a.left, top: a.top, width: a.size, height: a.size, transform: 'translate(-50%, -50%)' }}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.34, 1.4, 0.64, 1] }}
            >
              <Image src={a.src} alt="" fill className="object-cover" sizes="80px" loading="lazy" />
            </motion.div>
          ))}

          {PILLS.map((p, i) => (
            <motion.div
              key={i}
              className={`absolute flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm whitespace-nowrap ${
                p.green ? 'border-green-200 bg-green-50 text-green-700' : 'border-gray-200 bg-white text-slate-600'
              }`}
              style={{ left: p.left, top: p.top, transform: 'translate(-50%, -50%)' }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.3 + i * 0.1 }}
            >
              <span>{p.icon}</span>
              {p.text}
            </motion.div>
          ))}
        </motion.div>

        {/* ── Mobile: circle with pentagon avatars ── */}
        <motion.div
          className="relative mx-auto block md:hidden"
          style={{ width: 300, height: 300 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {/* Circle ring — 210×210px centered in 300×300 */}
          <div
            className="absolute rounded-full border border-gray-200"
            style={{ width: R * 2, height: R * 2, top: CY - R, left: CX - R }}
          />

          {/* Center label */}
          <div
            className="absolute flex flex-col items-center justify-center gap-0.5"
            style={{ width: R * 2, height: R * 2, top: CY - R, left: CX - R }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">NTUTEC</span>
            <span className="text-[9px] text-slate-300">2026</span>
          </div>

          {/* Pentagon avatars — all 56px, centered on ring */}
          {AVATARS.map((a, i) => (
            <motion.div
              key={i}
              className="absolute overflow-hidden rounded-full border-2 border-white shadow-md"
              style={{ width: 56, height: 56, top: PENTAGON[i].y - 28, left: PENTAGON[i].x - 28 }}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.34, 1.4, 0.64, 1] }}
            >
              <Image src={a.src} alt="" fill className="object-cover" sizes="56px" loading="lazy" />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats row */}
        <div className="mt-10 flex flex-wrap justify-center gap-10 sm:gap-16">
          {[
            { value: '600+', unit: '支', label: '新創團隊加速' },
            { value: '350+', unit: '位', label: '投資人網路' },
            { value: '35+',  unit: '家', label: '企業夥伴' },
            { value: '13',   unit: '年', label: '深耕台大創業生態' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <div className="flex items-baseline gap-0.5">
                <span className="text-3xl font-bold text-[#181614] md:text-4xl lg:text-5xl">{s.value}</span>
                <span className="text-sm text-slate-400 ml-1">{s.unit}</span>
              </div>
              <span className="mt-1 text-xs text-slate-400">{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Tag pills row */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {['台大加速器', '台大車庫', '企業垂直加速器', '台大天使會', 'Demo Day'].map((tag) => (
            <span key={tag} className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-slate-500">
              {tag}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
