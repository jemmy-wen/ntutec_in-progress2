'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

const PHOTOS = [
  { src: '/images/events/opening-2026-coaching.jpg', alt: '業師輔導現場' },
  { src: '/images/events/opening-2026-audience.jpg', alt: '開幕式現場' },
  { src: '/images/photos/new hero.png', alt: '台大創創中心' },
]

export default function HeroSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="relative h-svh w-full overflow-hidden">

      {/* Three photos — accordion on hover */}
      <div className="absolute inset-0 flex">
        {PHOTOS.map((photo, i) => (
          <div
            key={photo.src}
            className="relative overflow-hidden"
            style={{
              flex: hovered === null ? 1 : hovered === i ? 2.2 : 0.7,
              transition: 'flex 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="33vw"
            />
          </div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Text — bottom left */}
      <div className="pointer-events-none absolute bottom-10 left-10 z-10 lg:bottom-12 lg:left-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mb-3 flex flex-col items-start gap-2"
        >
          <span
            className="inline-block bg-[#00AA95] px-3 py-1.5 text-xl font-bold text-white lg:text-2xl"
            style={{ fontFamily: "'Noto Serif TC', serif" }}
          >
            從台大出發，
          </span>
          <span
            className="inline-block bg-[#00AA95] px-3 py-1.5 text-xl font-bold text-white lg:text-2xl"
            style={{ fontFamily: "'Noto Serif TC', serif" }}
          >
            連結產業、走向市場。
          </span>
        </motion.div>

        <motion.p
          className="text-4xl font-semibold text-white lg:text-6xl"
          style={{ fontFamily: 'var(--font-geist-sans)', lineHeight: 1.2 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
        >
          Bridging NTU Innovation<br />
          to Global Impact
        </motion.p>
      </div>

      {/* Copyright */}
      <motion.p
        className="pointer-events-none absolute bottom-4 right-20 text-[10px] tracking-widest text-white/40 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
      >
        © 台大創創中心 NTU TAIDAH ENTREPRENEURSHIP CENTER
      </motion.p>
    </section>
  )
}
