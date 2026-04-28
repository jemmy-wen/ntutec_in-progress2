'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

const LARGE_FRAME = {
  style: {
    left: '20.5%',
    top: '6.4%',
    width: '70.1%',
    height: '77.8%',
    clipPath:
      'polygon(0% 10.0%, 4.9% 0%, 19.0% 0%, 27.2% 3.7%, 87.4% 3.7%, 100% 21.3%, 100% 90.0%, 87.4% 96.6%, 37.5% 100%, 39.0% 86.7%, 0% 63.1%, 0% 59.4%)',
  },
}

const SMALL_FRAME = {
  style: {
    left: '5.4%',
    top: '52.6%',
    width: '39.6%',
    height: '42.8%',
    clipPath:
      'polygon(10.6% 0%, 15.4% 3.0%, 100% 56.8%, 94.9% 96.7%, 88.1% 100%, 0% 90.0%)',
  },
}

const EASE = [0.22, 1, 0.36, 1] as const

export default function HeroSection() {
  return (
    <section className="relative bg-white h-[calc(100svh-4rem)] md:h-[calc(100svh-5rem)] flex items-center overflow-hidden">
      <div className="w-full px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-0 items-center">

        {/* ── Left column ── */}
        <div className="flex flex-col gap-5 z-10">
          <motion.h1
            className="text-[40px] lg:text-[52px] xl:text-[58px] leading-[1.2] font-bold text-[#1a1a1a]"
            style={{ fontFamily: "'Noto Serif TC', 'GenWanMin2 TW', serif" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            從台大出發，<br />
            連結產業、走向市場。
          </motion.h1>

          <motion.p
            className="text-[20px] lg:text-[23px] text-[#00AA95] italic leading-tight"
            style={{ fontFamily: "'Permanent Marker', cursive" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          >
            Bridging NTU Innovation<br />
            to Global Impact
          </motion.p>

          <motion.p
            className="text-[14px] text-[#666] leading-relaxed"
            style={{ maxWidth: '22em' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          >
            台大創創中心串連學術能量、產業資源與國際網路，協助新創團隊從想法到市場，創造正面影響力
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 mt-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          >
            <Link
              href="/apply"
              className="rounded-full bg-[#00AA95] px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-[#009985] hover:scale-[1.02]"
            >
              申請輔導計畫
            </Link>
            <Link
              href="/about"
              className="rounded-full border-2 border-[#1a1a1a] px-7 py-3 text-sm font-semibold text-[#1a1a1a] transition-all hover:bg-[#1a1a1a]/5 hover:scale-[1.02]"
            >
              走進 NTUTEC
            </Link>
          </motion.div>
        </div>

        {/* ── Right column ── */}
        <motion.div
          className="relative w-full hidden lg:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
        >
          <div className="relative w-full" style={{ aspectRatio: '822 / 562' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/svg/Frame 13.svg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full"
            />
            <div className="absolute" style={LARGE_FRAME.style}>
              <Image
                src="/images/photos/new hero.png"
                alt="台大創創中心"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </div>
            <div className="absolute" style={SMALL_FRAME.style}>
              <Image
                src="/images/events/opening-2026-coaching.jpg"
                alt="輔導計畫開幕"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 24vw, 60vw"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── SCROLL indicator ── */}
      <motion.div
        className="absolute right-6 bottom-10 hidden lg:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
      >
        <span
          className="text-[10px] tracking-[0.2em] text-[#352B2B] uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          SCROLL
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/svg/Frame 12.svg" alt="" aria-hidden="true" className="w-5 h-auto" />
      </motion.div>
    </section>
  )
}
