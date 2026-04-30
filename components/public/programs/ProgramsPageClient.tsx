'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

const programs = [
  {
    label: '01',
    name: '台大車庫',
    en: 'NTU Garage',
    duration: '10 個月（3 月至 12 月）',
    target: '早期創業團隊（台大在校生、校友或教職員優先）',
    features: [
      '領域業師小組諮詢（4-5 隊同領域共學）',
      '免費虛擬進駐，會議室與活動場地使用',
      '3 大 Checkpoint：PSF / BMV / Traction 驗證',
      '銜接台大加速器的優先通道',
    ],
    href: '/garage',
    cta: '了解台大車庫',
  },
  {
    label: '02',
    name: '台大加速器',
    en: 'NTU Accelerator',
    duration: '10 個月（3 月至 12 月）',
    target: '成長期新創（不限台大身分，有台大身分者優先）',
    features: [
      '陪跑業師每月一對一深度輔導',
      'OKR Tracker 追蹤進度，每月 Office Hour 預約制',
      '企業資源對接與 Demo Day 募資路演',
      '150+ 投資人網絡，台大天使會媒合',
    ],
    href: '/accelerator',
    cta: '了解台大加速器',
  },
]

const methodology = [
  {
    label: '方法 01',
    title: 'OKR Tracker',
    desc: '所有輔導圍繞關鍵結果與進度狀態展開，每次會議前繳交報告，確保每個里程碑按節奏推進。',
  },
  {
    label: '方法 02',
    title: '業師診斷會',
    desc: '3 分鐘報告 + 12 分鐘業師追問 + 5 分鐘同儕分享，20 分鐘高強度診斷，精準找出盲點。',
  },
  {
    label: '方法 03',
    title: '三個關鍵審查節點',
    desc: 'Problem-Solution Fit → Business Model Validation → Traction，逐關遞進，確認每個階段的核心假設。',
  },
]

const coachingMechanisms = [
  {
    badge: '台大車庫',
    title: '輔導經理陪跑',
    desc: '專任輔導經理全程陪跑，每月定期 check-in，協助 MVP 驗證與用戶訪談，確保里程碑按節奏推進。',
  },
  {
    badge: '台大加速器',
    title: '業師 1-on-1 諮詢',
    desc: '配對 20+ 位具 Yahoo、TSMC、微軟、BCG 背景業師，依需求安排一對一深度諮詢，精準解決成長瓶頸。',
  },
  {
    badge: '企業垂直加速器',
    title: '企業場域驗證',
    desc: '媒合大企業提供真實市場驗證場域，企業 PM 共同推動專案，協助新創跨越死亡之谷、加速商模落地。',
  },
]

const timeline = [
  { period: '2026 年 12 月 ~ 2027 年 1 月', label: '開放申請', desc: '線上提交報名表' },
  { period: '2027 年 2 月', label: '公布結果', desc: '入選團隊名單公告' },
  { period: '3–12 月', label: '輔導進行', desc: '業師諮詢 + Checkpoint 驗證' },
  { period: '12 月', label: 'Demo Day', desc: '向投資人路演，完成畢業' },
]

export default function ProgramsPageClient() {
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
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Programs</p>
          <div>
            <h1 className="text-5xl font-bold leading-tight text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              新創輔導計畫
            </h1>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate-500">
              依據新創團隊的不同階段，提供最適合的輔導資源與成長路徑。
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/apply" className="rounded-full bg-[#00AA95] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]">
              提前登記 2027 梯次
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="relative w-1/2 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          <Image src="/images/events/opening-2026-biggroup.jpg" alt="2026 輔導計畫" fill priority className="object-cover object-top" />
          <div className="absolute inset-0 bg-[#181614]/20" />
        </motion.div>
      </section>

      {/* Two programs */}
      {programs.map((program, i) => (
        <section key={program.label} className="border-b border-[#e0ddd8]">
          <div className="mx-auto max-w-screen-xl px-8">
            <div className={`grid grid-cols-1 gap-0 md:grid-cols-2 ${i % 2 === 1 ? 'direction-rtl' : ''}`}>
              <motion.div
                className="border-r border-[#e0ddd8] py-24 pr-16"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">{program.en}</p>
                <div className="mb-4 text-6xl font-bold text-[#e0ddd8]">{program.label}</div>
                <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                  {program.name}
                </h2>
                <div className="mt-8 space-y-3 text-sm text-slate-500">
                  <div className="flex gap-3"><span className="shrink-0 font-semibold text-[#181614]">期程</span><span>{program.duration}</span></div>
                  <div className="flex gap-3"><span className="shrink-0 font-semibold text-[#181614]">對象</span><span>{program.target}</span></div>
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col justify-between py-24 pl-16"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <ul className="space-y-4">
                  {program.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <span className="mt-2 h-px w-6 shrink-0 bg-[#00AA95]" />
                      <span className="text-slate-500 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={program.href} className="mt-10 inline-block rounded-full border border-[#e0ddd8] px-7 py-3 text-sm font-semibold text-[#181614] transition-colors hover:border-[#00AA95] hover:text-[#00AA95]">
                  {program.cta} →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Methodology */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Methodology</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                輔導框架
              </h2>
            </div>
            <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
              {methodology.map((m, i) => (
                <motion.div
                  key={m.label}
                  className="py-8 first:pt-0 last:pb-0"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{m.label}</p>
                  <h3 className="mt-2 text-xl font-bold text-[#181614]">{m.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coaching mechanisms */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Coaching Mechanism</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                如何輔導<br />你的新創？
              </h2>
            </div>
            <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
              {coachingMechanisms.map((m, i) => (
                <motion.div
                  key={m.title}
                  className="py-8 first:pt-0 last:pb-0"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}
                >
                  <span className="inline-block rounded-full bg-[#e8f7f5] px-2.5 py-0.5 text-xs font-semibold text-[#00AA95]">{m.badge}</span>
                  <h3 className="mt-3 text-xl font-bold text-[#181614]">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8 py-24">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Application Timeline</p>
            <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>申請時程</h2>
            <p className="mt-4 text-slate-500">計畫為期十個月（3 月至 12 月），申請期另計</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-[#e0ddd8] md:grid-cols-4">
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 text-center"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
              >
                <p className="text-xs font-bold text-[#00AA95]">{t.period}</p>
                <h4 className="mt-3 text-xl font-bold text-[#181614]">{t.label}</h4>
                <p className="mt-2 text-xs text-slate-400">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8 py-20 text-center">
          <h3 className="mb-3 text-2xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>不確定適合哪個計畫？</h3>
          <p className="mb-8 text-slate-500">查看常見問題，或直接與我們聯繫，讓我們協助你找到最適合的成長路徑。</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/faq" className="rounded-full border border-[#e0ddd8] px-7 py-3 text-sm font-semibold text-[#181614] transition-colors hover:border-[#00AA95] hover:text-[#00AA95]">
              查看常見問題
            </Link>
            <Link href="/apply" className="rounded-full bg-[#00AA95] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]">
              提前登記
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
