'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { Plus, Minus } from '@phosphor-icons/react'

const EASE = [0.22, 1, 0.36, 1] as const

const benefits = [
  { label: '01', title: '虛擬進駐', desc: '免費虛擬進駐台大水源校區，享有中心會議室預約與活動場地使用權，彈性配合創業節奏。' },
  { label: '02', title: '創業社群', desc: '與同梯團隊並肩創業，互介紹客戶、共解技術問題，是台大校園內最活躍的早期新創社群。' },
  { label: '03', title: '工作坊與課程', desc: '不定期主題工作坊，涵蓋商業模式設計、財務規劃、法務實務等議題，由業師與業界專家主講。' },
  { label: '04', title: '業師諮詢', desc: '可申請業師一對一諮詢時段，針對特定議題獲得專業建議。' },
  { label: '05', title: '加速器銜接', desc: '畢業後優先銜接台大加速器，延續成長動能。' },
  { label: '06', title: '校園資源', desc: '台大師生身分優先錄取，可接觸校內各院系資源與研究能量，有助推動跨領域合作。' },
]

const alumni = [
  { name: 'MoBagel 行動貝果', sector: 'AutoML / 企業 AI', highlight: '累計募資 US$21M+，服務 3,000+ 品牌（含 Fortune 500），2026 Q1 獲台大天使會投資。' },
  { name: '方格子 vocus', sector: '華文內容訂閱平台', highlight: '月均 200 萬不重複造訪、會員 72 萬、創作者 2 萬+。' },
  { name: '3drens 三維人', sector: '車聯網 × IoT × 大數據', highlight: '募得近 NT$1 億（台杉、活水、廣信領投），客戶含 yoxi、PChome。' },
  { name: 'Hotcake 夯客', sector: '美業預約與會員系統', highlight: 'Pre-A 輪 US$1M+，商家續訂率 98%，2025 拓展日泰。' },
]

const eligibility = [
  '台大在校生、校友或教職員組成的創業團隊（外部團隊可個案評估）',
  '處於概念驗證至 MVP 開發階段',
  '團隊至少 2 人，具備明確的共同創業承諾',
  '具備創新技術或商業模式構想',
  '願意參與車庫社群活動與分享交流',
]

const batchSchedule = [
  { status: 'active', label: '2026 年度梯次（進行中）', desc: '2026 年 3 月 ~ 12 月 · 現有團隊進駐中' },
  { status: 'upcoming', label: '2027 年度梯次申請期', desc: '2026 年 12 月 ~ 2027 年 1 月 · 正式開放線上申請' },
  { status: 'upcoming', label: '2027 年度梯次公布結果', desc: '2027 年 2 月 · 入選團隊名單公告' },
  { status: 'upcoming', label: '2027 年度梯次正式進駐', desc: '2027 年 3 月 ~ 12 月' },
]

function BenefitItem({ label, title, desc }: { label: string; title: string; desc: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-[#e0ddd8]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <div className="flex items-baseline gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</span>
          <span className="text-lg font-semibold text-[#181614]">{title}</span>
        </div>
        {open ? <Minus size={16} className="text-[#00AA95]" /> : <Plus size={16} className="text-slate-400" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm leading-relaxed text-slate-500">{desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function GaragePageClient() {
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
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">NTU Garage</p>
          <div>
            <h1 className="text-5xl font-bold leading-tight text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              台大車庫
            </h1>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate-500">
              專為早期團隊設計的彈性孵化計畫。虛擬進駐、社群共學，從概念驗證到 MVP，陪你走過最關鍵的第一步。
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/apply" className="rounded-full bg-[#00AA95] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]">
              預約 2027 梯次通知
            </Link>
            <Link href="/accelerator" className="text-sm text-slate-400 hover:text-[#00AA95] transition-colors">
              了解加速器 →
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="relative w-1/2 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          <Image src="/images/photos/ntu-beauty-1.jpg" alt="台大車庫" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#181614]/20" />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-2 divide-x divide-[#e0ddd8] md:grid-cols-4">
            {[
              { value: '20', unit: '隊', label: '每年錄取' },
              { value: '10', unit: '個月', label: '進駐期間' },
              { value: '0', unit: '元', label: '完全免費' },
              { value: '100+', unit: '', label: '歷屆校友團隊' },
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

      {/* Overview */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <motion.div
              className="border-r border-[#e0ddd8] py-24 pr-16"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Overview</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                計畫概覽
              </h2>
              <div className="mt-8 relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image src="/images/events/demo-day-2025-02.jpg" alt="Demo Day 2025" fill className="object-cover" />
              </div>
            </motion.div>
            <motion.div
              className="py-24 pl-16"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="mb-6 text-lg leading-relaxed text-slate-500">
                台大車庫成立於 2013 年，是台大創創中心為早期創業團隊打造的共享孵化空間。13 年來，超過百支新創團隊曾於此起步，從概念驗證走向 MVP 與市場驗證。
              </p>
              <p className="mb-6 text-lg leading-relaxed text-slate-500">
                不同於加速器的密集輔導，車庫提供更彈性的時程安排，讓團隊在校園中安心探索、驗證與迭代。
              </p>
              <p className="text-lg leading-relaxed text-slate-500">
                我們提供安全的試錯空間，搭配同儕社群、業師諮詢與基礎資源，幫助團隊在正式進入市場前建立扎實根基。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Benefits</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                你將獲得的<br />資源
              </h2>
            </div>
            <div className="py-24 pl-16">
              {benefits.map((b) => (
                <BenefitItem key={b.label} {...b} />
              ))}
              <div className="border-t border-[#e0ddd8]" />
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Eligibility</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                誰可以申請？
              </h2>
            </div>
            <div className="py-24 pl-16">
              <ul className="space-y-5">
                {eligibility.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#00AA95]" />
                    <span className="text-slate-500 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Alumni</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                歷屆校友（列舉）
              </h2>
            </div>
            <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
              {alumni.map((a, i) => (
                <motion.div
                  key={a.name}
                  className="py-8 first:pt-0 last:pb-0"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{a.sector}</p>
                  <h3 className="mt-1 text-lg font-bold text-[#181614]">{a.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{a.highlight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Batch Schedule */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Batch Schedule</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                梯次時程
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-500">
                車庫採年度梯次制，每年 3 月進駐至 12 月結束。2027 梯次預計 2026 年 12 月開放申請。
              </p>
            </div>
            <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
              {batchSchedule.map((item, i) => (
                <div key={i} className="flex items-start gap-4 py-6 first:pt-0 last:pb-0">
                  <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.status === 'active' ? 'bg-[#00AA95]' : 'bg-[#e0ddd8]'}`} />
                  <div>
                    <p className={`font-semibold ${item.status === 'active' ? 'text-[#181614]' : 'text-slate-400'}`}>{item.label}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Angel crosslink */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8 py-20">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Investor Access</p>
              <h3 className="text-2xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>台大天使會優先觀察對象</h3>
              <p className="mt-3 max-w-lg text-slate-500">台大車庫孵育的早期新創，為台大天使會優先觀察與媒合的來源之一。</p>
            </div>
            <Link href="/angel" className="shrink-0 rounded-full border border-[#e0ddd8] px-7 py-3 text-sm font-semibold text-[#181614] transition-colors hover:border-[#00AA95] hover:text-[#00AA95]">
              了解台大天使會
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden" style={{ minHeight: '360px' }}>
        <Image src="/images/photos/ntu-beauty-1.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0A192F]/80" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-8 py-24 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Apply</p>
          <h2 className="mb-6 text-4xl font-bold text-white" style={{ fontFamily: "'Noto Serif TC', serif" }}>有興趣加入 2027 梯次？</h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-white/70">
            提前登記你的團隊，12 月正式申請開放時，我們將第一時間通知你。登記不等同申請，正式申請仍需依流程提交。
          </p>
          <Link href="/apply" className="inline-block rounded-full bg-[#00AA95] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]">
            預約 2027 梯次通知
          </Link>
        </div>
      </section>
    </main>
  )
}
