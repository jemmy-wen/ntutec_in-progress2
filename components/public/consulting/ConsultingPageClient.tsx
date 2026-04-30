'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

const services = [
  {
    label: '01',
    title: '企業創新策略諮詢',
    en: 'Innovation Strategy',
    description: '協助企業制定創新轉型策略，導入新創思維與敏捷開發方法論，建立內部創新機制。',
    features: ['創新文化診斷', '內部創業機制設計', '開放式創新策略'],
  },
  {
    label: '02',
    title: '技術商業化輔導',
    en: 'Technology Commercialization',
    description: '將學術研究成果轉化為具商業價值的產品或服務，提供從概念驗證到市場進入的完整輔導。',
    features: ['技術評估與定位', '商業模式設計', '市場進入策略'],
  },
  {
    label: '03',
    title: '新創加速輔導',
    en: 'Startup Acceleration',
    description: '為早期新創團隊提供系統化的輔導計畫，涵蓋產品開發、團隊建設、募資策略與市場拓展。',
    features: ['產品市場適配', '募資簡報優化', '業師一對一輔導'],
  },
]

export default function ConsultingPageClient() {
  return (
    <main>
      {/* Hero */}
      <section className="flex border-b border-[#e0ddd8]" style={{ height: 'calc(100vh - 80px)' }}>
        <motion.div
          className="relative flex w-1/2 flex-col justify-between border-r border-[#e0ddd8] px-12 py-16"
          style={{
            backgroundImage: 'linear-gradient(to right, #e0ddd8 1px, transparent 1px)',
            backgroundSize: '25% 100%',
          }}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Consulting</p>
          <div>
            <h1 className="text-5xl font-bold leading-tight text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              企業創新<br />諮詢服務
            </h1>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate-500">
              突破創新卡點，結合 13 年台大加速器 know-how 與產業實務，提供企業端對端的創新轉型解決方案。
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:ntutec@ntutec.com?subject=諮詢服務洽詢"
              className="rounded-full bg-[#00AA95] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]"
            >
              來信洽詢
            </a>
            <Link href="/corporate" className="text-sm text-slate-400 hover:text-[#00AA95] transition-colors">
              了解企業合作 →
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="relative w-1/2 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          <Image src="/images/events/opening-2026-04.jpg" alt="諮詢服務" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#181614]/20" />
          <div className="absolute bottom-12 left-12 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Since 2019</p>
            <p className="mt-2 text-3xl font-bold" style={{ fontFamily: "'Noto Serif TC', serif" }}>27 期垂直加速器</p>
            <p className="mt-1 text-sm text-white/70">累計 35 家企業夥伴</p>
          </div>
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-3 divide-x divide-[#e0ddd8]">
            {[
              { value: '27', unit: '期', label: '企業垂直加速器' },
              { value: '35', unit: '+', label: '企業合作夥伴' },
              { value: '13', unit: '年', label: '台大加速器 Know-how' },
            ].map((s) => (
              <motion.div
                key={s.label}
                className="py-12 text-center"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="text-5xl font-bold text-[#181614]">{s.value}</span>
                <span className="text-xl font-semibold text-[#00AA95]">{s.unit}</span>
                <p className="mt-2 text-xs text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      {services.map((service, i) => (
        <section key={service.label} className="border-b border-[#e0ddd8]">
          <div className="mx-auto max-w-screen-xl px-8">
            <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
              <motion.div
                className="border-r border-[#e0ddd8] py-24 pr-16"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">{service.en}</p>
                <div className="mb-4 text-6xl font-bold text-[#e0ddd8]">{service.label}</div>
                <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                  {service.title}
                </h2>
              </motion.div>
              <motion.div
                className="py-24 pl-16"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="mb-8 text-lg leading-relaxed text-slate-500">{service.description}</p>
                <ul className="space-y-4">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-slate-600">
                      <span className="h-px w-6 bg-[#00AA95]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Vertical Accelerator crosslink */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-20 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Track Record</p>
              <h2 className="text-3xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                垂直加速器<br />成功案例
              </h2>
            </div>
            <div className="py-20 pl-16">
              <p className="mb-6 text-lg leading-relaxed text-slate-500">
                自 2019 年首創企業垂直加速器，累計 27 期、35 家企業夥伴，涵蓋科技、媒體、金融等多元產業。透過深度共創，協助企業發現新市場、孵育新事業。
              </p>
              <Link href="/corporate" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00AA95] hover:underline">
                查看企業合作案例 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-b border-[#e0ddd8]" style={{ minHeight: '360px' }}>
        <Image src="/images/events/opening-2026-04.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0A192F]/80" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-8 py-24 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Get in Touch</p>
          <h2 className="mb-6 text-4xl font-bold text-white" style={{ fontFamily: "'Noto Serif TC', serif" }}>洽詢諮詢服務</h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-white/70">
            請來信說明您的需求（企業規模、創新議題、期望時程），我們評估後安排合適窗口。通常於 3 個工作日內回覆。
          </p>
          <a
            href="mailto:ntutec@ntutec.com?subject=諮詢服務洽詢"
            className="inline-block rounded-full bg-[#00AA95] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]"
          >
            來信洽詢
          </a>
          <p className="mt-6 text-xs text-white/40">ntutec@ntutec.com　·　週一至週五 9:00–18:00</p>
        </div>
      </section>
    </main>
  )
}
