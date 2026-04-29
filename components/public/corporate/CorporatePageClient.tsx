'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import TrackClick from '@/components/TrackClick'
import { RocketLaunch, Trophy, Microphone, Lightbulb, Target, Handshake, ChartBar } from '@phosphor-icons/react'

const EASE = [0.22, 1, 0.36, 1] as const

/* ── Section header helper ───────────────────────────────────────── */
function SectionHeader({
  label,
  title,
  subtitle,
  light = false,
}: {
  label: string
  title: string
  subtitle?: string
  light?: boolean
}) {
  return (
    <div className="mb-14 text-center">
      <motion.p
        className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${light ? 'text-teal-light' : 'text-teal'}`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {label}
      </motion.p>
      <motion.h2
        className={`text-2xl font-bold md:text-3xl lg:text-4xl ${light ? 'text-white' : 'text-[#181614]'}`}
        style={{ fontFamily: "'Noto Serif TC', serif" }}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
      >
        {title}
      </motion.h2>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/svg/Vector.svg" alt="" aria-hidden="true" className="mx-auto mt-3 h-4 w-auto" />
      {subtitle && (
        <motion.p
          className={`mx-auto mt-4 max-w-xl text-base leading-relaxed ${light ? 'text-white/70' : 'text-slate-500'}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, delay: 0.12, ease: EASE }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

/* ── Data ────────────────────────────────────────────────────────── */
const valueProps = [
  {
    title: '前沿技術對接',
    description:
      '直接接觸台大校內最新研究成果與新創團隊，搶先佈局未來技術趨勢，加速企業創新轉型。',
  },
  {
    title: '第一手人才管道',
    description:
      '深度合作期間直接接觸台大新創人才——有實力的直接留才，少了仲介、省了搜尋成本。歷屆合作企業已從車庫、加速器延攬多位技術共同創辦人。',
  },
  {
    title: 'Demo Day 與論壇曝光',
    description:
      '共同舉辦 Demo Day（2025 年 74 位投資人到場，創歷屆最高）、產業論壇，在台大指標性的新創場合與新創圈、投資圈同台——不只品牌，更是真實的合作信號。',
  },
]

const collaborationModels = [
  {
    icon: RocketLaunch,
    title: '企業加速器共創',
    description:
      '由企業出題、新創解題，透過深度輔導計畫（視各期規格而定），共同開發創新解決方案。',
  },
  {
    icon: Trophy,
    title: '創新競賽合辦',
    description: '與企業共同舉辦主題式創新競賽，發掘潛力新創並建立合作關係。',
  },
  {
    icon: Microphone,
    title: '聯合活動',
    description: '共同舉辦產業論壇、Demo Day、交流活動，促進企業與新創的深度互動。',
  },
  {
    icon: Lightbulb,
    title: '創新顧問諮詢',
    description:
      '嫁接 NTUTEC 13 年加速器 know-how，協助企業內部團隊診斷創新卡點、設計驗證機制，縮短從構想到市場測試的週期。',
  },
]

const cases = [
  {
    badge: '企業垂直加速器',
    badgeAlt: '外部創新顧問',
    title: '宏碁 Acer Foundation × 律果科技 LegalSign.ai',
    subtitle: '企業贊助加速器 × AI 法務科技新創，共創法律合約智慧化',
    points: [
      '獲《哈佛商業評論》HBR 專文報導',
      '榮獲經濟部「白科技獎」潛力新創',
      '宏碁作為企業業師協助市場驗證，加速商業落地',
    ],
    tags: ['#LegalTech', '#AI', '#HBR報導', '#宏碁'],
    img: '/images/events/opening-2026-pitching.jpg',
  },
  {
    badge: '企業垂直加速器',
    badgeAlt: '數位轉型',
    title: '聯合報系 UDN × 新創外部創新',
    subtitle: '資深媒體集團的第二成長曲線，從內容到新商模的跨域共創',
    points: [
      '《天下雜誌》專文報導「UDN 與新創合作開啟第二成長曲線」',
      '旗下聯經出版、經濟日報同步導入外部創新顧問服務',
      '2020 年起迄今的長期戰略夥伴',
    ],
    tags: ['#Media', '#數位轉型', '#天下雜誌報導', '#長期夥伴'],
    img: '/images/events/opening-2026-biggroup.jpg',
  },
  {
    badge: '企業垂直加速器',
    badgeAlt: '跨產業共創',
    title: '聯經出版 × SAT. 知識衛星',
    subtitle: '傳統出版 × 線上課程平台，共築永續發展的知識生態',
    points: [
      '六個月深度共創，延伸藝文線上課程未開發市場',
      '知識衛星 2024 年營業額突破 NT$7 億',
      '外部創新「共生共創」典型示範案例',
    ],
    tags: ['#EdTech', '#出版轉型', '#永續發展', '#共創'],
    img: '/images/events/opening-2026-mentoring.jpg',
  },
  {
    badge: '創新競賽',
    badgeAlt: 'ESG / 社會創新',
    title: '日月光 ASE × 社會創新競賽',
    subtitle: '半導體龍頭攜手台大創創，用競賽挖掘社會影響力新創',
    points: [
      '台大創創協辦完整賽程：初審、面審、新創輔導',
      '以社會創新為主題，強化企業 ESG 與新創生態連結',
      '獎金 + 企業資源，協助入圍團隊實踐提案',
    ],
    tags: ['#ASE', '#ESG', '#社會創新', '#競賽'],
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
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/events/demo-day-2025-group.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0A192F]/90 via-[#0A192F]/65 to-transparent" />

        {/* Decorative Thunder */}
        <div
          className="pointer-events-none absolute right-[6%] top-[18%] z-[2] hidden md:block"
          style={{ width: 52, opacity: 0.22 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/Thunder--Streamline-Beveled-Scribbles [Vectorized].svg"
            alt=""
            aria-hidden="true"
            className="w-full"
          />
        </div>

        <div className="container relative z-[2] py-24 md:py-36">
          <motion.p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-teal-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Corporate Innovation
          </motion.p>
          <motion.h1
            className="max-w-2xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Noto Serif TC', serif" }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          >
            企業合作方案
          </motion.h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/Vector.svg"
            alt=""
            aria-hidden="true"
            className="mt-3 h-4 w-auto"
            style={{ filter: 'brightness(0) invert(1) opacity(0.45)' }}
          />
          <motion.p
            className="mt-5 max-w-xl text-lg leading-relaxed text-white/75"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          >
            與台大創創中心攜手，共同推動企業創新轉型，對接最前沿的技術與人才。
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease: EASE }}
          >
            <Link
              href="/contact"
              className="rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            >
              聯繫我們
            </Link>
            <Link
              href="#cases"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              查看合作案例
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Stats strip ── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container py-8">
          <div className="flex flex-wrap justify-center gap-10 sm:gap-16">
            {[
              { value: '35+',  unit: '家', label: '企業合作夥伴' },
              { value: '27',   unit: '期', label: '企業垂直加速器' },
              { value: '600+', unit: '支', label: '新創人才庫' },
              { value: '13',   unit: '年', label: '深耕台大生態系' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              >
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl font-bold text-[#181614] md:text-4xl">{s.value}</span>
                  <span className="ml-1 text-sm text-slate-400">{s.unit}</span>
                </div>
                <span className="mt-1 text-xs text-slate-400">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Why partner ── */}
      <section className="bg-[#f9f8f6] py-20 md:py-28">
        <div className="container">
          <SectionHeader
            label="Why Partner With Us"
            title="為什麼選擇台大創創中心"
            subtitle="直接連結國立臺灣大學頂尖研究技術與人才的企業創新加速平台"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {valueProps.map((prop, i) => (
              <motion.div
                key={prop.title}
                className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-teal/10">
                  <span className="text-base font-bold text-teal">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mb-3 text-lg font-bold text-[#181614]">{prop.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Collaboration models ── */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        {/* Decorative Frame 27 */}
        <div
          className="pointer-events-none absolute right-[-40px] top-[8%] hidden md:block"
          style={{ width: 160, opacity: 0.06 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/svg/Frame 27.svg" alt="" aria-hidden="true" className="w-full" />
        </div>

        <div className="container">
          <SectionHeader
            label="Collaboration Models"
            title="合作模式"
            subtitle="四種合作模式，由淺入深，從競賽到長期共創"
          />

          {/* Row 1: text left, photo right */}
          <div className="mb-16 grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-8">
              {collaborationModels.slice(0, 2).map((model, i) => (
                <motion.div
                  key={model.title}
                  className="flex gap-5"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                >
                  <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal/10">
                    <model.icon size={22} weight="duotone" className="text-teal" />
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-base font-bold text-[#181614]">{model.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-500">{model.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-3xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Image
                src="/images/events/opening-2026-04.jpg"
                alt="新創 Pitch 展示成果"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>

          {/* Row 2: photo left, text right */}
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-3xl order-last md:order-first"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Image
                src="/images/events/opening-2026-coaching.jpg"
                alt="業師輔導現場"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <div className="space-y-8">
              {collaborationModels.slice(2).map((model, i) => (
                <motion.div
                  key={model.title}
                  className="flex gap-5"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                >
                  <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal/10">
                    <model.icon size={22} weight="duotone" className="text-teal" />
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-base font-bold text-[#181614]">{model.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-500">{model.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Featured cases ── */}
      <section id="cases" className="bg-[#f9f8f6] py-20 md:py-28">
        <div className="container">
          <SectionHeader
            label="Featured Cases"
            title="企業合作成功案例"
            subtitle="累計 27 期、35 家企業夥伴的深度共創實績，涵蓋科技、媒體、金融等多元產業"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {cases.map((c, i) => (
              <motion.div
                key={c.title}
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease: EASE }}
              >
                {/* Photo strip */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={c.img}
                    alt=""
                    fill
                    loading="lazy"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                </div>

                <div className="p-7">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
                      {c.badge}
                    </span>
                    <span className="rounded-full border border-teal/25 bg-teal/8 px-3 py-1 text-xs font-semibold text-teal">
                      {c.badgeAlt}
                    </span>
                  </div>
                  <h3 className="mb-1 text-lg font-bold leading-snug text-[#181614]">{c.title}</h3>
                  <p className="mb-4 text-sm font-medium text-teal">{c.subtitle}</p>
                  <ul className="mb-5 space-y-2">
                    {c.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-sm leading-relaxed text-slate-500">
                        <span className="mt-0.5 shrink-0 text-teal">✓</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. How we help ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="container">
          <SectionHeader
            label="How We Help"
            title="台大創創中心如何協助企業創新？"
            subtitle="台大創創中心以外部創新顧問角色，全程陪跑企業與新創的合作歷程"
          />
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {howWeHelp.map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-3xl border border-gray-100 bg-[#f9f8f6] p-7 text-center"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10">
                  <item.icon size={24} weight="duotone" className="text-teal" />
                </div>
                <h3 className="mb-2 text-sm font-bold text-[#181614]">{item.title}</h3>
                <p className="text-xs leading-relaxed text-slate-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Success story ── */}
      <section className="bg-[#f9f8f6] py-20 md:py-28">
        <div className="container">
          <SectionHeader label="Success Story" title="真實案例：1,000 萬營收共創" />
          <motion.div
            className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Photo */}
            <div className="relative h-52 overflow-hidden">
              <Image
                src="/images/events/opening-2026-networking.jpg"
                alt=""
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/70 to-transparent" />
              <div className="absolute bottom-5 left-7 flex items-center gap-2">
                <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
                  企業垂直加速器
                </span>
                <span className="text-xs text-white/70">2022 梯次</span>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <h3
                className="mb-1 text-xl font-bold text-[#181614]"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                聯經出版 × SAT. 知識衛星
              </h3>
              <p className="mb-6 text-sm font-medium text-teal">
                出版業老字號 × 線上課程新創，共創藝文教育市場新藍海
              </p>
              <p className="mb-4 text-sm leading-relaxed text-slate-500">
                創立近半世紀的聯經出版，長期深耕人文藝術優質內容，卻苦於找不到數位延伸的突破口。透過台大創創中心企業垂直加速器，聯經與線上課程平台 SAT. 知識衛星在六個月輔導期間深度共創，共同發現藝文線上課程的未開發市場。
              </p>
              <p className="mb-7 text-sm leading-relaxed text-slate-500">
                雙方聯手推出「故事 × 聆賞 × 生活｜焦元溥的 37 堂古典音樂課」，上線約一年內達成{' '}
                <strong className="text-[#181614]">NT$1,000 萬營收</strong>，驗證了藝文教育市場的強勁需求。
              </p>
              <blockquote className="border-l-4 border-teal pl-5 italic text-[#181614]/80">
                「外部創新能加速異業合作，對本業的優劣勢帶來全新眼光，幫助我們找到可驗證的新商機。」
                <footer className="mt-2 text-xs not-italic text-slate-400">— 聯經出版總經理 陳芝宇</footer>
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 8. Impact metrics ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="container text-center">
          <SectionHeader label="Impact" title="合作成果" />
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {[
              { number: '35', suffix: ' 家', label: '累計合作企業' },
              { number: '27', suffix: ' 期', label: '企業垂直加速器' },
              { number: '逾 600', suffix: ' 支', label: '輔導新創團隊' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
              >
                <p className="text-4xl font-bold text-teal md:text-5xl">
                  {stat.number}{stat.suffix}
                </p>
                <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-lg text-xs text-slate-400">
            合作對象涵蓋科技、製造、金融、媒體等多元產業之國內外知名企業
          </p>
        </div>
      </section>

      {/* ── 9. Angel crosslink ── */}
      <div className="container pb-4">
        <motion.div
          className="mt-4 rounded-3xl bg-[#f9f8f6] p-8 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="mb-4 text-slate-500">尋找策略性投資機會？</p>
          <Link
            href="/angel"
            className="rounded-full border border-teal/40 px-6 py-2.5 text-sm font-semibold text-teal transition hover:bg-teal/8"
          >
            了解台大天使會
          </Link>
        </motion.div>
      </div>

      {/* ── 10. CTA ── */}
      <section className="relative mt-8 overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image src="/images/events/demo-day-2025-02.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-[#0A192F]/80" />

        {/* Decorative Bracket */}
        <div
          className="pointer-events-none absolute bottom-[10%] left-[8%] z-[2] hidden md:block"
          style={{ width: 60, opacity: 0.18 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/Bracket-Doodle-Doodle--Streamline-Beveled-Scribbles [Vectorized].svg"
            alt=""
            aria-hidden="true"
            className="w-full"
          />
        </div>

        <div className="container relative z-[2] text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold text-white md:text-4xl"
            style={{ fontFamily: "'Noto Serif TC', serif" }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            準備開啟合作了嗎？
          </motion.h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/Vector.svg"
            alt=""
            aria-hidden="true"
            className="mx-auto mb-6 h-4 w-auto"
            style={{ filter: 'brightness(0) invert(1) opacity(0.4)' }}
          />
          <motion.p
            className="mx-auto mb-10 max-w-xl text-base text-white/70"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            無論是探索新技術、尋找創新解決方案，或建立人才管道，台大創創中心都能量身打造合作方案。
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          >
            <TrackClick eventName="cta_consulting_click" eventParams={{ location: 'corporate_page_cta' }}>
              <Link
                href="/consulting"
                className="rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                了解諮詢服務
              </Link>
            </TrackClick>
            <TrackClick eventName="cta_contact_click" eventParams={{ location: 'corporate_page_cta' }}>
              <Link
                href="/contact"
                className="rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
              >
                聯繫我們
              </Link>
            </TrackClick>
          </motion.div>
        </div>
      </section>
    </>
  )
}
