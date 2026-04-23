'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

export default function AudienceCards() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">

        <motion.p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Your Next Step
        </motion.p>

        <motion.h2
          className="mb-8 text-3xl font-bold text-[#181614] md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          你是哪一種夥伴？
        </motion.h2>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:grid-rows-2">

          {/* 新創團隊 — large, col 1-7, row 1-2 */}
          <motion.div
            className="group relative overflow-hidden rounded-[20px] md:col-span-7 md:row-span-2"
            style={{ minHeight: '420px' }}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/events/demo-day-2025-booth2.jpg"
              alt="新創團隊"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 58vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <span className="mb-3 inline-block w-fit rounded-full bg-teal px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                For Startups
              </span>
              <h3 className="text-3xl font-bold text-white">新創團隊</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
                從技術驗證到市場擴展，台大加速器與台大車庫提供完整的輔導資源、業師網絡與募資對接。
              </p>
              <Link
                href="/apply"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#181614] transition-all hover:bg-teal hover:text-white"
              >
                搶先預約 2027 梯次
              </Link>
            </div>
          </motion.div>

          {/* 企業夥伴 — col 8-12, row 1 */}
          <motion.div
            className="group relative overflow-hidden rounded-[20px] md:col-span-5 md:row-span-1"
            style={{ minHeight: '200px' }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/events/demo-day-2025-booth1.jpg"
              alt="企業夥伴"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 42vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="mb-2 inline-block w-fit rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                For Corporates
              </span>
              <h3 className="text-xl font-bold text-white">企業夥伴</h3>
              <Link href="/corporate" className="mt-2 text-xs font-medium text-white/75 hover:text-white transition-colors">
                開啟外部創新之路 →
              </Link>
            </div>
          </motion.div>

          {/* 投資人 — col 8-12, row 2，背景圖 */}
          <motion.div
            className="group relative overflow-hidden rounded-[20px] md:col-span-5 md:row-span-1"
            style={{ minHeight: '200px' }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/events/demo-day-2025-03.jpg"
              alt="投資人"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 42vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="mb-2 inline-block w-fit rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                For Investors
              </span>
              <h3 className="text-xl font-bold text-white">投資人</h3>
              <Link href="/angel" className="mt-2 text-xs font-medium text-white/75 hover:text-white transition-colors">
                深入了解天使會 →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
