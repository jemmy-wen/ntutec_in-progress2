'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Plus, Minus } from '@phosphor-icons/react'

const EASE = [0.22, 1, 0.36, 1] as const

/* ── Accordion ──────────────────────────────────────────────────── */
function AccordionItem({
  label,
  title,
  duration,
  body,
  defaultOpen = false,
}: {
  label: string
  title: string
  duration: string
  body: string
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-t border-[#e0ddd8]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <div className="flex items-baseline gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</span>
          <span className="text-lg font-semibold text-[#181614]">{title}</span>
          <span className="hidden text-xs text-teal sm:inline">{duration}</span>
        </div>
        {open
          ? <Minus size={16} weight="bold" className="shrink-0 text-teal" />
          : <Plus  size={16} weight="bold" className="shrink-0 text-slate-400" />
        }
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
            <p className="pb-6 text-sm leading-relaxed text-slate-500">{body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function AcceleratorPageClient() {
  return (
    <div className="bg-white">

      {/* ══ 1. HERO — calc(100vh-80px), 文字 50% + 照片 50% ════════ */}
      <section
        className="flex border-b border-[#e0ddd8]"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        {/* Left 50%: grid texture + text */}
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
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.22em] text-teal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            NTU Accelerator
          </motion.p>

          <motion.h1
            className="text-5xl font-bold leading-[1.08] text-[#181614] lg:text-6xl xl:text-7xl"
            style={{ fontFamily: "'Noto Serif TC', serif" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
          >
            台大加速器
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: EASE }}
          >
            <p className="mb-6 text-sm leading-relaxed text-slate-500">
              為期十個月的深度輔導計畫，幫助成長期<br />新創加速邁向下一個里程碑。
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <ArrowRight size={14} weight="bold" />
              預約 2027 梯次通知
            </Link>
          </motion.div>
        </motion.div>

        {/* Right 50%: photo */}
        <motion.div
          className="relative w-1/2 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Image
            src="/images/events/opening-2026-classroom.jpg"
            alt="台大加速器輔導現場"
            fill
            priority
            className="object-cover"
            sizes="50vw"
          />
        </motion.div>
      </section>

      {/* ══ 2. OVERVIEW ══════════════════════════════════════════════ */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-16 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal">Overview</p>
              <h2
                className="text-3xl font-bold text-[#181614]"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                計畫概覽
              </h2>
            </div>
            <div className="py-16 pl-16">
              <p className="text-sm leading-relaxed text-slate-500">
                台大加速器自 2017 年啟動，專為已完成原型、進入市場驗證階段的成長期新創設計。計畫為期十個月，由 2026 陪跑業師 40+ 位提供一對一深度輔導，背後擁有歷年 80+ 位業師的深厚資料庫，串接企業合作資源、台大天使會與創投網絡。
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                無台大身分亦可申請，有台大身分者優先。我們重視技術創新與市場潛力，不限台大背景。2026 梯次進行中（3 月 ~ 12 月）。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. STATS BAR ═════════════════════════════════════════════ */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-2 divide-x divide-[#e0ddd8] md:grid-cols-4">
            {[
              { value: '10', unit: '個月', label: '深度輔導' },
              { value: '40+', unit: '位', label: '陪跑業師' },
              { value: '20', unit: '隊', label: '每年錄取' },
              { value: '0', unit: '元', label: '完全免費' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="py-12 text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              >
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-[#181614] md:text-5xl">{s.value}</span>
                  <span className="text-sm text-slate-400">{s.unit}</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. BENEFITS — big title left / stacked items right ═══════ */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">

            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <motion.p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                Benefits
              </motion.p>
              <motion.h2
                className="text-4xl font-bold leading-tight text-[#181614] lg:text-5xl"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.06, ease: EASE }}
              >
                我們提供的資源
              </motion.h2>
            </div>

            <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
              {[
                {
                  title: '業師網絡',
                  desc: '歷年 80+ 位業師深厚陣容，2026 陪跑 40+ 位，平均逾 20 年產業深耕，涵蓋創投、AI、生技、半導體等領域，一對一深度輔導。',
                },
                {
                  title: '企業資源',
                  desc: '35 家合作企業，涵蓋科技、製造、金融、媒體等多元產業，提供技術驗證場域與潛在客戶資源。',
                },
                {
                  title: '募資對接',
                  desc: '台大天使會與 150+ 投資人網絡，涵蓋種子輪到 Pre-IPO 的募資機會。Demo Day 直接向投資人 pitch。',
                },
                {
                  title: '虛擬進駐',
                  desc: '免費虛擬進駐台大水源校區，享有中心會議室與活動場地使用權，彈性配合創業節奏。',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="py-10"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                >
                  <h3 className="mb-3 text-xl font-semibold text-[#181614]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. TIMELINE — title+photo left / accordion right ════════ */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">

            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <motion.p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                Timeline
              </motion.p>
              <motion.h2
                className="mb-12 text-4xl font-bold leading-tight text-[#181614] lg:text-5xl"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.06, ease: EASE }}
              >
                計畫時程
              </motion.h2>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/events/opening-2026-coaching.jpg"
                  alt="一對一業師輔導"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="py-24 pl-16">
              <AccordionItem
                label="Phase 1"
                title="診斷與定位"
                duration="第 1–2 個月"
                body="深入了解團隊現況，設定成長目標與里程碑，配對最合適的業師。由中心顧問與創辦人一同盤點核心競爭力與市場定位。"
                defaultOpen
              />
              <AccordionItem
                label="Phase 2"
                title="驗證與迭代"
                duration="第 3–5 個月"
                body="聚焦產品市場契合度驗證，透過客戶訪談與數據分析持續優化商業模式。業師每月至少一次深度 1-on-1 會議。"
              />
              <AccordionItem
                label="Phase 3"
                title="規模化準備"
                duration="第 6–8 個月"
                body="建立可規模化的營運架構，深化企業合作關係，準備募資相關材料。協助對接台大天使會與創投網絡。"
              />
              <AccordionItem
                label="Phase 4"
                title="Demo Day & 畢業"
                duration="第 9–10 個月"
                body="向天使投資人與策略夥伴進行路演，完成計畫畢業並取得後續支持資源。Demo Day 為期一日，現場 74+ 位投資人到場（2025 年創歷屆最高）。"
              />
              <div className="border-t border-[#e0ddd8]" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. APPLICATION CRITERIA ══════════════════════════════════ */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">

            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <motion.p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                Criteria
              </motion.p>
              <motion.h2
                className="text-4xl font-bold leading-tight text-[#181614] lg:text-5xl"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.06, ease: EASE }}
              >
                申請條件
              </motion.h2>
            </div>

            <div className="py-24 pl-16">
              <ul className="divide-y divide-[#e0ddd8]">
                {[
                  '不限台大身分；有台大在校生、校友或教職員背景者優先錄取',
                  '已完成 MVP 或原型開發，具有初期用戶或營收',
                  '團隊至少 2 人，全職投入創業',
                  '具有明確的市場機會與成長潛力',
                  '願意接受十個月的系統化輔導',
                  '產業不限，但需具備技術或模式創新',
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-4 py-5"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    <span className="text-sm leading-relaxed text-slate-500">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 border-t border-[#e0ddd8] pt-6">
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition hover:opacity-70"
                >
                  <ArrowRight size={13} weight="bold" />
                  申請條件有疑問？查看常見問題
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. FEATURED ALUMNI ═══════════════════════════════════════ */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8 py-24">
          <div className="mb-16 grid grid-cols-1 md:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal">Alumni</p>
              <h2
                className="text-4xl font-bold text-[#181614] lg:text-5xl"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                歷屆台大加速器校友
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-sm leading-relaxed text-slate-500">
                部分列舉。歷年輔導逾 600 支新創團隊，涵蓋 AI、EdTech、FinTech、生技等多元領域。
              </p>
            </div>
          </div>

          <div className="divide-y divide-[#e0ddd8]">
            {[
              {
                name: 'AmazingTalker',
                sector: '線上語言家教平台',
                badge: 'A 輪募資',
                highlight: 'A 輪募資 NT$4.3 億（US$15.5M），年營收突破 NT$10 億，用戶遍及 190+ 國家。',
                img: '/images/events/opening-2026-pitching.jpg',
              },
              {
                name: 'MoBagel 行動貝果',
                sector: 'AutoML / 企業 AI 數據平台',
                badge: '台大天使會投資',
                highlight: '累計募資 US$21M+，服務 3,000+ 品牌（含 Fortune 500），2026 Q1 獲台大天使會投資。',
                img: '/images/events/opening-2026-mentoring.jpg',
              },
              {
                name: '配客嘉 PackAge+',
                sector: '電商循環包裝生態系',
                badge: 'Pre-A 輪募資',
                highlight: 'Pre-A 輪 NT$5,200 萬（國發基金、中信、彰銀），合作 200+ 企業，拓展東南亞。',
                img: '/images/events/opening-2026-coaching.jpg',
              },
              {
                name: '知識衛星 SAT. Knowledge',
                sector: '精品大師線上課程',
                badge: '規模化成長',
                highlight: '2024 年營業額突破 NT$7 億，2025 高峰會 1,500 人參與、32 位老師。',
                img: '/images/events/opening-2026-biggroup.jpg',
              },
            ].map((alumni, i) => (
              <motion.div
                key={alumni.name}
                className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="relative aspect-[4/3] overflow-hidden md:col-span-1">
                  <Image
                    src={alumni.img}
                    alt=""
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col justify-center">
                  <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                    {alumni.badge}
                  </span>
                  <h3 className="mb-1 text-2xl font-bold text-[#181614]">{alumni.name}</h3>
                  <p className="mb-4 text-sm text-slate-400">{alumni.sector}</p>
                  <p className="flex items-start gap-2 text-sm leading-relaxed text-slate-500">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    {alumni.highlight}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. BATCH SCHEDULE ════════════════════════════════════════ */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">

            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <motion.p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                Batch Schedule
              </motion.p>
              <motion.h2
                className="text-4xl font-bold leading-tight text-[#181614] lg:text-5xl"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.06, ease: EASE }}
              >
                梯次時程
              </motion.h2>
              <p className="mt-6 text-sm leading-relaxed text-slate-500">
                加速器每年僅開放一次，採年度梯次制。現行梯次進行中，2027 梯次預計 2026 年 12 月開放申請。
              </p>
            </div>

            <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
              {[
                { dot: 'bg-teal',    title: '2026 年度梯次（進行中）', desc: '2026 年 3 月 ~ 12 月 · 年度梯次進行中' },
                { dot: 'bg-[#e0ddd8]', title: '2027 梯次申請期',      desc: '2026 年 12 月 ~ 2027 年 1 月 · 開放線上申請' },
                { dot: 'bg-[#e0ddd8]', title: '2027 梯次公布結果',    desc: '2027 年 2 月 · 入選團隊名單公告' },
                { dot: 'bg-[#e0ddd8]', title: '2027 梯次正式開始',    desc: '2027 年 3 月 ~ 2027 年 12 月 · 為期十個月' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-5 py-7"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                >
                  <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${item.dot}`} />
                  <div>
                    <p className="text-sm font-semibold text-[#181614]">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. CTA ═══════════════════════════════════════════════════ */}
      <section>
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">

            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <h2
                className="text-4xl font-bold text-[#181614] lg:text-5xl"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                有興趣加入 2027 梯次？
              </h2>
            </div>

            <div className="flex flex-col justify-center py-24 pl-16">
              <p className="mb-8 text-sm leading-relaxed text-slate-500">
                提前登記你的團隊，12 月正式申請開放時，我們將第一時間通知你。登記不等同申請，正式申請仍需依流程提交。
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <ArrowRight size={14} weight="bold" />
                  預約 2027 梯次通知
                </Link>
                <Link
                  href="/corporate"
                  className="inline-flex items-center gap-2 rounded-full border border-[#e0ddd8] px-6 py-3 text-sm font-semibold text-[#181614] transition hover:border-teal/40"
                >
                  企業合作方案
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
