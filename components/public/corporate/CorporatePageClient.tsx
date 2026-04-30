'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import TrackClick from '@/components/TrackClick'
import { ArrowRight, Plus, Minus } from '@phosphor-icons/react'

const EASE = [0.22, 1, 0.36, 1] as const

/* ── Accordion item ─────────────────────────────────────────────── */
function AccordionItem({
  title,
  body,
  defaultOpen = false,
}: {
  title: string
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
        <span className="text-lg font-semibold text-[#181614]">{title}</span>
        {open ? (
          <Minus size={18} weight="bold" className="shrink-0 text-teal" />
        ) : (
          <Plus size={18} weight="bold" className="shrink-0 text-slate-400" />
        )}
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
export default function CorporatePageClient() {
  return (
    <div className="bg-white">

      {/* ══ 1. HERO ══════════════════════════════════════════════════
          Grid columns background + big title left / desc+CTA right  */}
      <section
        className="relative border-b border-[#e0ddd8]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e0ddd8 1px, transparent 1px)',
          backgroundSize: '12.5% 100%',
        }}
      >
        {/* Inner layout: constrained, tall */}
        <div
          className="mx-auto max-w-screen-xl px-8"
          style={{ minHeight: 'calc(100vh - 80px)' }}
        >
          {/* Two-column: title left, aside right */}
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2" style={{ minHeight: 'calc(100vh - 80px)' }}>

            {/* Left: big title */}
            <div className="flex flex-col justify-center border-r border-[#e0ddd8] py-24 pr-16">
              <motion.p
                className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-teal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Corporate Innovation
              </motion.p>
              <motion.h1
                className="text-5xl font-bold leading-[1.08] text-[#181614] lg:text-6xl xl:text-7xl"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
              >
                企業合作方案
              </motion.h1>
            </div>

            {/* Right: description + CTA */}
            <div className="flex flex-col justify-end py-24 pl-16">
              <motion.p
                className="mb-8 max-w-xs text-base leading-relaxed text-slate-500"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
              >
                與台大創創中心攜手，共同推動企業創新轉型，對接最前沿的技術與人才。
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32, ease: EASE }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <ArrowRight size={14} weight="bold" />
                  聯繫我們，開啟合作
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. HERO PHOTO ════════════════════════════════════════════
          Full-width, tall image                                      */}
      <section>
        <motion.div
          className="relative w-full overflow-hidden"
          style={{ height: '60vw', maxHeight: 720 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/events/demo-day-2025-group.jpg"
            alt="Demo Day 企業合作現場"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </section>

      {/* ══ 3. PARTNER HIGHLIGHT ═════════════════════════════════════
          2-col: text left / partner logo strip right                 */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 md:grid-cols-2">

            <div className="border-r border-[#e0ddd8] py-16 pr-16">
              <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-500">
                累計 27 期垂直加速器，35 家企業夥伴的深度共創實績，涵蓋科技、媒體、金融等多元產業。台大創創中心以外部創新顧問角色，全程陪跑企業與新創的合作歷程。
              </p>
              <Link
                href="#cases"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal transition hover:opacity-70"
              >
                <ArrowRight size={14} weight="bold" />
                查看合作案例
              </Link>
            </div>

            <div className="flex items-center py-16 pl-16">
              <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-500">
                {['宏碁 Acer', '聯合報系 UDN', '日月光 ASE', '聯經出版', '台達電', '緯創資通'].map((name) => (
                  <span
                    key={name}
                    className="rounded border border-[#e0ddd8] px-4 py-2 text-xs font-medium text-slate-500"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. WHY PARTNER ═══════════════════════════════════════════
          Big title left / stacked feature items right                */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">

            {/* Left: label + big title (sticky on scroll) */}
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <motion.p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                Why Partner With Us
              </motion.p>
              <motion.h2
                className="text-4xl font-bold leading-tight text-[#181614] lg:text-5xl"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.06, ease: EASE }}
              >
                與台大創創中心攜手，放大企業創新動能
              </motion.h2>
            </div>

            {/* Right: feature list */}
            <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
              {[
                {
                  title: '前沿技術對接',
                  desc: '直接接觸台大校內最新研究成果與新創團隊，搶先佈局未來技術趨勢，加速企業創新轉型。',
                },
                {
                  title: '第一手人才管道',
                  desc: '深度合作期間直接接觸台大新創人才——有實力的直接留才，少了仲介、省了搜尋成本。歷屆合作企業已從車庫、加速器延攬多位技術共同創辦人。',
                },
                {
                  title: 'Demo Day 與論壇曝光',
                  desc: '共同舉辦 Demo Day（2025 年 74 位投資人到場，創歷屆最高）、產業論壇，在台大指標性的新創場合與新創圈、投資圈同台。',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="py-10"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                >
                  <h3 className="mb-3 text-xl font-semibold text-[#181614]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. STATS BAR ═════════════════════════════════════════════ */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-2 divide-x divide-[#e0ddd8] md:grid-cols-4">
            {[
              { value: '35+', unit: '家', label: '企業合作夥伴' },
              { value: '27',  unit: '期', label: '企業垂直加速器' },
              { value: '600+', unit: '支', label: '新創人才庫' },
              { value: '13',  unit: '年', label: '深耕台大生態系' },
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

      {/* ══ 6. COLLABORATION MODELS (accordion) ══════════════════════ */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">

            {/* Left: label + title + photo */}
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <motion.p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                Collaboration Models
              </motion.p>
              <motion.h2
                className="mb-12 text-4xl font-bold leading-tight text-[#181614] lg:text-5xl"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.06, ease: EASE }}
              >
                合作模式
              </motion.h2>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/events/opening-2026-04.jpg"
                  alt=""
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right: accordion */}
            <div className="py-24 pl-16">
              <AccordionItem
                title="企業加速器共創"
                body="由企業出題、新創解題，透過深度輔導計畫（視各期規格而定），共同開發創新解決方案。輔導期間企業 PM 全程陪跑，台大創創中心擔任外部創新顧問角色每月追蹤進度。"
                defaultOpen
              />
              <AccordionItem
                title="創新競賽合辦"
                body="與企業共同舉辦主題式創新競賽，發掘潛力新創並建立合作關係。台大創創協辦完整賽程：命題、初審、面審、決賽全程執行。"
              />
              <AccordionItem
                title="聯合活動"
                body="共同舉辦產業論壇、Demo Day、交流活動，促進企業與新創的深度互動。在台大指標性的新創場合與新創圈、投資圈同台——不只品牌，更是真實的合作信號。"
              />
              <AccordionItem
                title="創新顧問諮詢"
                body="嫁接 NTUTEC 13 年加速器 know-how，協助企業內部團隊診斷創新卡點、設計驗證機制，縮短從構想到市場測試的週期。"
              />
              <div className="border-t border-[#e0ddd8]" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. FEATURED CASES ════════════════════════════════════════
          Photo grid + text, editorial                                */}
      <section id="cases" className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8 py-24">
          <div className="mb-16 grid grid-cols-1 md:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal">
                Featured Cases
              </p>
              <h2
                className="text-4xl font-bold text-[#181614] lg:text-5xl"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                企業合作成功案例
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-sm leading-relaxed text-slate-500">
                累計 27 期、35 家企業夥伴的深度共創實績，涵蓋科技、媒體、金融等多元產業。
              </p>
            </div>
          </div>

          {/* Case rows */}
          <div className="divide-y divide-[#e0ddd8]">
            {[
              {
                badge: '企業垂直加速器',
                title: '宏碁 Acer Foundation × 律果科技 LegalSign.ai',
                subtitle: 'AI 法務科技共創，共創法律合約智慧化',
                points: ['獲《哈佛商業評論》HBR 專文報導', '榮獲經濟部「白科技獎」潛力新創', '宏碁作為企業業師協助市場驗證'],
                img: '/images/events/opening-2026-pitching.jpg',
              },
              {
                badge: '企業垂直加速器',
                title: '聯合報系 UDN × 新創外部創新',
                subtitle: '資深媒體集團的第二成長曲線，從內容到新商模的跨域共創',
                points: ['《天下雜誌》專文報導', '旗下聯經出版、經濟日報同步導入', '2020 年起迄今的長期戰略夥伴'],
                img: '/images/events/opening-2026-biggroup.jpg',
              },
              {
                badge: '企業垂直加速器',
                title: '聯經出版 × SAT. 知識衛星',
                subtitle: '傳統出版 × 線上課程平台，共創 NT$1,000 萬營收',
                points: ['六個月深度共創，延伸藝文線上課程未開發市場', '知識衛星 2024 年營業額突破 NT$7 億', '共生共創典型示範案例'],
                img: '/images/events/opening-2026-mentoring.jpg',
              },
              {
                badge: '創新競賽',
                title: '日月光 ASE × 社會創新競賽',
                subtitle: '半導體龍頭攜手台大創創，用競賽挖掘社會影響力新創',
                points: ['台大創創協辦完整賽程：初審、面審、新創輔導', '強化企業 ESG 與新創生態連結'],
                img: '/images/events/opening-2026-coaching.jpg',
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] overflow-hidden md:col-span-1">
                  <Image
                    src={c.img}
                    alt=""
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                {/* Text */}
                <div className="md:col-span-2 flex flex-col justify-center">
                  <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                    {c.badge}
                  </span>
                  <h3 className="mb-2 text-2xl font-bold text-[#181614]">{c.title}</h3>
                  <p className="mb-5 text-sm font-medium text-slate-500">{c.subtitle}</p>
                  <ul className="space-y-2">
                    {c.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-sm leading-relaxed text-slate-500">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. SUCCESS STORY quote ════════════════════════════════════ */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8 py-24">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal">
                Success Story
              </p>
              <h2
                className="text-4xl font-bold leading-tight text-[#181614]"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                共創 NT$1,000 萬營收的出版×EdTech 案例
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <div className="relative aspect-video overflow-hidden mb-8">
                <Image
                  src="/images/events/opening-2026-networking.jpg"
                  alt=""
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <blockquote className="border-l-2 border-teal pl-6 text-base italic leading-relaxed text-[#181614]/70">
                「外部創新能加速異業合作，對本業的優劣勢帶來全新眼光，幫助我們找到可驗證的新商機。」
                <footer className="mt-3 text-xs not-italic text-slate-400">
                  — 聯經出版總經理 陳芝宇
                </footer>
              </blockquote>
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
                準備開啟合作了嗎？
              </h2>
            </div>

            <div className="flex flex-col justify-center py-24 pl-16">
              <p className="mb-8 text-sm leading-relaxed text-slate-500">
                無論是探索新技術、尋找創新解決方案，或建立人才管道，台大創創中心都能量身打造合作方案。
              </p>
              <div className="flex flex-wrap gap-3">
                <TrackClick eventName="cta_contact_click" eventParams={{ location: 'corporate_page_cta' }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    <ArrowRight size={14} weight="bold" />
                    聯繫我們
                  </Link>
                </TrackClick>
                <TrackClick eventName="cta_consulting_click" eventParams={{ location: 'corporate_page_cta' }}>
                  <Link
                    href="/consulting"
                    className="inline-flex items-center gap-2 rounded-full border border-[#e0ddd8] px-6 py-3 text-sm font-semibold text-[#181614] transition hover:border-teal/40"
                  >
                    了解諮詢服務
                  </Link>
                </TrackClick>
              </div>
              <div className="mt-10 border-t border-[#e0ddd8] pt-8">
                <p className="mb-3 text-xs text-slate-400">尋找策略性投資機會？</p>
                <Link
                  href="/angel"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition hover:opacity-70"
                >
                  <ArrowRight size={13} weight="bold" />
                  了解台大天使會
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
