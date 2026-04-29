'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import TrackClick from '@/components/TrackClick'
import { RocketLaunch, Trophy, Microphone, Lightbulb, Target, Handshake, ChartBar, ArrowRight } from '@phosphor-icons/react'

const EASE = [0.22, 1, 0.36, 1] as const

/* ── Data ────────────────────────────────────────────────────────── */
const collaborationModels = [
  {
    id: 'accelerator',
    icon: RocketLaunch,
    title: '企業加速器共創',
    description: '由企業出題、新創解題，透過深度輔導計畫共同開發創新解決方案。視各期規格，輔導期間企業 PM 全程陪跑。',
    tag: '最深度合作',
    color: 'bg-teal text-white',
  },
  {
    id: 'competition',
    icon: Trophy,
    title: '創新競賽合辦',
    description: '與企業共同舉辦主題式創新競賽，發掘潛力新創並建立合作關係。台大創創協辦完整賽程：命題、初審、決賽。',
    tag: '快速接觸新創',
    color: 'bg-[#181614] text-white',
  },
  {
    id: 'event',
    icon: Microphone,
    title: '聯合活動',
    description: '共同舉辦產業論壇、Demo Day、交流活動，在台大指標性場合與新創圈、投資圈同台，強化品牌存在感。',
    tag: '品牌曝光首選',
    color: 'bg-amber-50 text-[#181614]',
  },
  {
    id: 'consulting',
    icon: Lightbulb,
    title: '創新顧問諮詢',
    description: '嫁接 NTUTEC 13 年加速器 know-how，協助企業內部團隊診斷創新卡點、設計驗證機制，縮短從構想到市場測試的週期。',
    tag: '內部創新診斷',
    color: 'bg-[#f9f8f6] text-[#181614]',
  },
]

const cases = [
  {
    badge: '企業垂直加速器',
    title: '宏碁 × 律果科技',
    subtitle: 'AI 法務科技共創',
    points: ['獲《哈佛商業評論》HBR 專文報導', '榮獲經濟部「白科技獎」潛力新創'],
    tags: ['#LegalTech', '#AI'],
    img: '/images/events/opening-2026-pitching.jpg',
  },
  {
    badge: '企業垂直加速器',
    title: '聯合報系 UDN × 新創',
    subtitle: '媒體集團第二成長曲線',
    points: ['《天下雜誌》專文報導', '2020 年起長期戰略夥伴'],
    tags: ['#Media', '#數位轉型'],
    img: '/images/events/opening-2026-biggroup.jpg',
  },
  {
    badge: '企業垂直加速器',
    title: '聯經出版 × 知識衛星',
    subtitle: '出版 × 線上課程共創',
    points: ['知識衛星 2024 年營業額突破 NT$7 億', '共創藝文教育市場新藍海'],
    tags: ['#EdTech', '#共創'],
    img: '/images/events/opening-2026-mentoring.jpg',
  },
  {
    badge: '創新競賽',
    title: '日月光 ASE × 社會創新',
    subtitle: 'ESG 主題競賽合辦',
    points: ['協辦完整賽程：初審、面審、輔導', '強化企業 ESG 與新創生態連結'],
    tags: ['#ESG', '#社會創新'],
    img: '/images/events/opening-2026-coaching.jpg',
  },
]

const howWeHelp = [
  { icon: Target,    title: '對接決策者',   description: '直接連結企業高階決策層，確保合作案獲得內部支持' },
  { icon: Target,    title: '產業實務傳授', description: '企業提供第一線產業知識，助新創快速理解市場脈絡' },
  { icon: Handshake, title: '企業 PM 共創', description: '企業 PM 與新創定期工作會議，共同推動合作案進展' },
  { icon: ChartBar,  title: '每月進展追蹤', description: '台大創創擔任陪跑角色，每月追蹤合作狀況確保成果' },
]

/* ── Main ────────────────────────────────────────────────────────── */
export default function CorporatePageClient() {
  const [activeModel, setActiveModel] = useState(0)

  return (
    <div className="bg-[#f5f4f1] min-h-screen">

      {/* ── 1. Hero bento (two 50% blocks, 32px margin all around) ── */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-screen">

          {/* Left: solid bg + text */}
          <motion.div
            className="relative flex flex-col justify-between rounded-3xl bg-[#0A192F] p-10 md:p-12 overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Subtle grid texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="relative z-[1]">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-teal-light">
                Corporate Innovation
              </p>
              <h1
                className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                企業合作方案
              </h1>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-white/60">
                與台大創創中心攜手，共同推動企業創新轉型，對接最前沿的技術與人才。
              </p>
            </div>
            <div className="relative z-[1] mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                聯繫我們 <ArrowRight size={14} weight="bold" />
              </Link>
              <Link
                href="#cases"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                查看案例
              </Link>
            </div>

            {/* Teal accent dot */}
            <div className="pointer-events-none absolute bottom-[-60px] right-[-60px] h-52 w-52 rounded-full bg-teal/10" />
          </motion.div>

          {/* Right: photo */}
          <motion.div
            className="relative overflow-hidden rounded-3xl min-h-[280px] md:min-h-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <Image
              src="/images/events/demo-day-2025-group.jpg"
              alt=""
              fill
              priority
              className="object-cover"
            />
            {/* Stats overlay bottom-left */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
              <div className="flex gap-6">
                {[
                  { v: '35+', l: '企業夥伴' },
                  { v: '27期', l: '垂直加速器' },
                  { v: '13年', l: '深耕台大' },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-xl font-bold text-white">{s.v}</div>
                    <div className="text-xs text-white/60">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 2. Value props bento ── */}
      <div className="px-8 pb-4">
        <motion.p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-teal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Why Partner With Us
        </motion.p>
        <motion.h2
          className="mb-6 text-2xl font-bold text-[#181614] md:text-3xl"
          style={{ fontFamily: "'Noto Serif TC', serif" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          為什麼選擇台大創創中心
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              num: '01',
              title: '前沿技術對接',
              description: '直接接觸台大校內最新研究成果與新創團隊，搶先佈局未來技術趨勢，加速企業創新轉型。',
              bg: 'bg-white',
            },
            {
              num: '02',
              title: '第一手人才管道',
              description: '深度合作期間直接接觸台大新創人才——有實力的直接留才，少了仲介、省了搜尋成本。',
              bg: 'bg-teal text-white',
              light: true,
            },
            {
              num: '03',
              title: 'Demo Day 曝光',
              description: '共同舉辦 Demo Day（2025 年 74 位投資人到場，創歷屆最高），與新創圈、投資圈同台。',
              bg: 'bg-white',
            },
          ].map((prop, i) => (
            <motion.div
              key={prop.num}
              className={`group relative rounded-3xl p-8 cursor-default transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg ${prop.bg}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            >
              <span className={`text-5xl font-bold tabular-nums select-none ${prop.light ? 'text-white/20' : 'text-gray-100'}`}>
                {prop.num}
              </span>
              <h3 className={`mt-3 mb-2 text-lg font-bold ${prop.light ? 'text-white' : 'text-[#181614]'}`}>
                {prop.title}
              </h3>
              <p className={`text-sm leading-relaxed ${prop.light ? 'text-white/75' : 'text-slate-500'}`}>
                {prop.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 3. Collaboration models (tab switcher) ── */}
      <div className="px-8 py-4">
        <motion.p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-teal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Collaboration Models
        </motion.p>
        <motion.h2
          className="mb-6 text-2xl font-bold text-[#181614] md:text-3xl"
          style={{ fontFamily: "'Noto Serif TC', serif" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          合作模式
        </motion.h2>

        {/* Tab buttons */}
        <div className="mb-4 flex flex-wrap gap-2">
          {collaborationModels.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setActiveModel(i)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeModel === i
                  ? 'border-teal bg-teal text-white shadow-sm'
                  : 'border-gray-200 bg-white text-slate-500 hover:border-teal/40'
              }`}
            >
              <m.icon size={14} weight="duotone" />
              {m.title}
            </button>
          ))}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModel}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* Text card */}
            <div className={`rounded-3xl p-8 md:p-10 ${collaborationModels[activeModel].color}`}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-current/20 px-3 py-1 text-xs font-semibold opacity-80">
                {collaborationModels[activeModel].tag}
              </div>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                {(() => {
                  const Icon = collaborationModels[activeModel].icon
                  return <Icon size={28} weight="duotone" />
                })()}
              </div>
              <h3 className="mb-3 text-2xl font-bold">{collaborationModels[activeModel].title}</h3>
              <p className="text-sm leading-relaxed opacity-80">{collaborationModels[activeModel].description}</p>
            </div>

            {/* Photo card */}
            <div className="relative min-h-[260px] overflow-hidden rounded-3xl">
              <Image
                src="/images/events/opening-2026-04.jpg"
                alt=""
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── 4. Featured cases bento ── */}
      <div id="cases" className="px-8 py-4">
        <motion.p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-teal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Featured Cases
        </motion.p>
        <motion.h2
          className="mb-6 text-2xl font-bold text-[#181614] md:text-3xl"
          style={{ fontFamily: "'Noto Serif TC', serif" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          企業合作成功案例
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              className="group relative overflow-hidden rounded-3xl bg-white cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              whileHover={{ y: -4 }}
            >
              {/* Photo */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={c.img}
                  alt=""
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-teal px-2.5 py-1 text-[11px] font-semibold text-white">
                  {c.badge}
                </span>
              </div>
              <div className="p-5">
                <h3 className="mb-0.5 text-base font-bold text-[#181614] leading-snug">{c.title}</h3>
                <p className="mb-3 text-xs font-medium text-teal">{c.subtitle}</p>
                <ul className="space-y-1.5">
                  {c.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-1.5 text-xs leading-relaxed text-slate-500">
                      <span className="mt-0.5 shrink-0 text-teal">✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-1">
                  {c.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 5. How we help + Success story bento (side by side) ── */}
      <div className="px-8 py-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* How we help */}
          <motion.div
            className="rounded-3xl bg-white p-8 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-teal">How We Help</p>
            <h2 className="mb-8 text-xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              台大創創如何協助企業創新？
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {howWeHelp.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="group rounded-2xl bg-[#f9f8f6] p-5 transition hover:bg-teal/8 cursor-default"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 transition group-hover:bg-teal/20">
                    <item.icon size={20} weight="duotone" className="text-teal" />
                  </div>
                  <h3 className="mb-1 text-sm font-bold text-[#181614]">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-500">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Success story */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-[#0A192F]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          >
            {/* Photo top half */}
            <div className="relative h-52">
              <Image
                src="/images/events/opening-2026-networking.jpg"
                alt=""
                fill
                loading="lazy"
                className="object-cover opacity-60"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A192F]" />
              <div className="absolute bottom-4 left-6 flex gap-2">
                <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
                  企業垂直加速器
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-white/70">
                  2022 梯次
                </span>
              </div>
            </div>

            <div className="p-8">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-teal-light">Success Story</p>
              <h3 className="mb-1 text-xl font-bold text-white" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                聯經出版 × SAT. 知識衛星
              </h3>
              <p className="mb-4 text-sm text-teal-light">出版業老字號 × 線上課程新創，共創 NT$1,000 萬營收</p>
              <blockquote className="border-l-2 border-teal pl-4 italic text-white/70 text-sm leading-relaxed">
                「外部創新能加速異業合作，對本業的優劣勢帶來全新眼光，幫助我們找到可驗證的新商機。」
                <footer className="mt-2 text-xs not-italic text-white/40">— 聯經出版總經理 陳芝宇</footer>
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 6. Impact + CTA bento ── */}
      <div className="p-8 pt-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Impact stats */}
          {[
            { number: '35', suffix: '家', label: '累計合作企業' },
            { number: '27', suffix: '期', label: '企業垂直加速器' },
            { number: '600+', suffix: '支', label: '輔導新創團隊' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-3xl bg-white p-8 text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            >
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-[#181614]">{stat.number}</span>
                <span className="text-lg text-slate-400">{stat.suffix}</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Angel crosslink + CTA row */}
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Angel crosslink */}
          <motion.div
            className="rounded-3xl bg-white p-8 flex items-center justify-between"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Also Explore</p>
              <p className="text-base font-bold text-[#181614]">尋找策略性投資機會？</p>
              <p className="mt-1 text-sm text-slate-500">了解台大天使會的投資網路</p>
            </div>
            <Link
              href="/angel"
              className="ml-4 shrink-0 inline-flex items-center gap-1.5 rounded-full border border-teal/40 px-5 py-2.5 text-sm font-semibold text-teal transition hover:bg-teal/8"
            >
              了解更多 <ArrowRight size={13} weight="bold" />
            </Link>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="relative overflow-hidden rounded-3xl min-h-[280px]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            <Image src="/images/events/demo-day-2025-02.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-[#0A192F]/80" />
            <div className="relative z-[1] flex h-full flex-col justify-between p-8">
              <p className="text-sm font-bold text-white">準備開啟合作了嗎？</p>
              <p className="mt-2 text-sm text-white/60">無論是探索新技術、尋找創新解方，台大創創中心都能量身打造合作方案。</p>
              <div className="mt-6 flex gap-3">
                <TrackClick eventName="cta_consulting_click" eventParams={{ location: 'corporate_page_cta' }}>
                  <Link
                    href="/consulting"
                    className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    了解諮詢服務
                  </Link>
                </TrackClick>
                <TrackClick eventName="cta_contact_click" eventParams={{ location: 'corporate_page_cta' }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    聯繫我們 <ArrowRight size={13} weight="bold" />
                  </Link>
                </TrackClick>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  )
}
