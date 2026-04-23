'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

export default function HeroSection() {
  return (
    <section className="bg-teal -mt-16 xl:-mt-20 pt-16 xl:pt-20 min-h-screen flex flex-col rounded-b-[20px]">

      {/* Text area — on teal background */}
      <div className="hidden lg:flex items-end justify-between gap-8 px-10 pt-10 pb-8 lg:px-14 lg:pt-12 lg:pb-10">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="text-[52px] font-bold leading-tight text-white"
            style={{ letterSpacing: '-0.02em' }}
          >
            台大創創中心
          </h1>
          <p className="mt-3 text-lg text-white/80">
            Bridging NTU Innovation to Global Impact
          </p>
        </motion.div>

        <motion.div
          className="shrink-0 text-right"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-base font-bold text-white">從台大出發。連結產業。走向市場。</p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
            NTU TAIDAH<br />ENTREPRENEURSHIP CENTER
          </p>
          <div className="mt-5 flex flex-wrap justify-end gap-3">
            <Link
              href="/apply"
              className="rounded-full bg-white/20 border border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/30 hover:scale-[1.02]"
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

      {/* Mobile text */}
      <div className="lg:hidden px-5 pt-6 pb-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="text-3xl font-bold leading-tight text-white sm:text-4xl"
            style={{ letterSpacing: '-0.02em' }}
          >
            台大創創中心
          </h1>
          <p className="mt-2 text-sm text-white/75">
            Bridging NTU Innovation to Global Impact
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="rounded-full bg-white/20 border border-white/40 px-5 py-2.5 text-sm font-semibold text-white"
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

      {/* Image block — fills remaining height */}
      <motion.div
        className="relative flex-1 mx-3 mb-3 sm:mx-6 sm:mb-6 overflow-hidden rounded-2xl sm:rounded-3xl"
        style={{ minHeight: '320px' }}
        initial={{ opacity: 0, scale: 1.03 }}
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

    </section>
  )
}
