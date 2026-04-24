'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

export default function HeroSection() {
  return (
    <section className="bg-white px-3 pb-3 sm:px-6 sm:pb-6">
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl"
        style={{ height: 'calc(100svh - 5rem - 12px)', minHeight: '480px' }}
      >
        {/* 1. Image fades in first */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/photos/new hero.png"
            alt="台大創創中心"
            fill
            className="object-cover object-center"
            priority
            sizes="calc(100vw - 24px)"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

        {/* Mobile: 垂直堆疊，文字全在左下 */}
        <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-8 lg:hidden">
          {/* 2. Left text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-2xl font-bold leading-tight text-white sm:text-3xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              從台大出發。<br />連結產業、走向市場。
            </h1>
            <p className="mt-2 text-sm text-white/75">
              Bridging NTU Innovation to Global Impact
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="rounded-full bg-[#00aa95] px-5 py-2.5 text-sm font-semibold text-white"
              >
                申請輔導計畫
              </Link>
              <Link
                href="/about"
                className="rounded-full border-2 border-white/50 px-5 py-2.5 text-sm font-semibold text-white"
              >
                走進 NTUTEC
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Desktop: 左右兩欄 */}
        <div className="relative z-10 hidden h-full items-end justify-between gap-8 p-10 lg:flex lg:p-14">
          {/* 2. Left text */}
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-[52px] font-bold leading-tight text-white"
              style={{ letterSpacing: '-0.02em' }}
            >
              從台大出發。<br />連結產業、走向市場。
            </h1>
            <p className="mt-3 text-lg text-white/80">
              Bridging NTU Innovation to Global Impact
            </p>
          </motion.div>

          {/* 3. Right text */}
          <motion.div
            className="shrink-0 text-right"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-base font-bold text-white">台大創創中心</p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
              NTU TAIDAH<br />ENTREPRENEURSHIP CENTER
            </p>
            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <Link
                href="/apply"
                className="rounded-full bg-[#00aa95] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#009985] hover:scale-[1.02]"
              >
                申請輔導計畫
              </Link>
              <Link
                href="/about"
                className="rounded-full border-2 border-white/50 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/80 hover:scale-[1.02]"
              >
                走進 NTUTEC
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
