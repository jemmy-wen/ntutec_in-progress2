'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

// SVG arc: viewBox="0 0 100 60", path="M 2,58 C 25,4 75,4 98,58"
// preserveAspectRatio="none" → x% maps directly to left%, y/60*100 maps to top%
//
// Cubic bezier B(t): P0=(2,58) P1=(25,4) P2=(75,4) P3=(98,58)
// Avatars placed at t = 0.05, 0.25, 0.50, 0.75, 0.95
// Pills offset slightly above the curve (top - ~8%)
const AVATARS = [
  { src: '/images/events/opening-2026-networking.jpg', left: '0%',    top: '72%',   size: 60 },
  { src: '/images/events/opening-2026-mentoring.jpg',  left: '23.5%', top: '35%',   size: 48 },
  { src: '/images/events/opening-2026-biggroup.jpg',   left: '50%',   top: '18%',   size: 56 },
  { src: '/images/events/opening-2026-coaching.jpg',   left: '76.5%', top: '46.0%', size: 48 },
  { src: '/images/events/opening-2026-pitching.jpg',   left: '94.4%', top: '83.8%', size: 60 },
]

// t≈0.12, 0.35, 0.62, 0.87 — shifted up ~10% from curve
const PILLS = [
  { text: '2026 開幕式',   icon: '🎉', left: '13%',  top: '56%', green: false },
  { text: '業師配對完成', icon: '✓',   left: '35%',  top: '26%', green: true  },
  { text: 'Demo Day ✓',   icon: '📊',  left: '62%',  top: '26%', green: false },
  { text: '80+ 創業者',   icon: '👥',  left: '85%',  top: '54%', green: false },
]

const STATS = [
  { value: '80+', label: '創業者參與' },
  { value: '40+', label: '輔導業師' },
  { value: '10',  label: '個月加速' },
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
            className="text-3xl font-bold text-[#181614] md:text-4xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, delay: 0.06 }}
          >
            讓好想法，長出改變世界的力量
          </motion.h2>
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

        {/* Orbit arc — avatars + pills only */}
        <motion.div
          className="relative mx-auto w-full max-w-3xl"
          style={{ height: '280px' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {/* SVG arc line: viewBox 0 0 100 60, preserveAspectRatio none */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 60"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 2,58 C 25,4 75,4 98,58"
              stroke="#e5e7eb"
              strokeWidth="0.6"
            />
          </svg>

          {/* Avatar circles — centered on bezier points */}
          {AVATARS.map((a, i) => (
            <motion.div
              key={i}
              className="absolute overflow-hidden rounded-full border-2 border-white shadow-md"
              style={{
                left: a.left,
                top: a.top,
                width: a.size,
                height: a.size,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.34, 1.4, 0.64, 1] }}
            >
              <Image
                src={a.src}
                alt=""
                width={a.size}
                height={a.size}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}

          {/* Pill badges — floating near the arc */}
          {PILLS.map((p, i) => (
            <motion.div
              key={i}
              className={`absolute flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm whitespace-nowrap ${
                p.green
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-gray-200 bg-white text-slate-600'
              }`}
              style={{
                left: p.left,
                top: p.top,
                transform: 'translate(-50%, -50%)',
              }}
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

        {/* Stats row — below the arc */}
        <div className="mt-6 flex justify-center gap-14">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <span className="text-4xl font-bold text-[#181614] md:text-5xl">{s.value}</span>
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
            <span
              key={tag}
              className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-slate-500"
            >
              {tag}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
