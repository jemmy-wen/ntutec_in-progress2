'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { motion } from 'motion/react'
import PreRegisterForm from '@/components/public/PreRegisterForm'

const EASE = [0.22, 1, 0.36, 1] as const

const tracks = [
  {
    label: '01',
    name: '台大加速器',
    en: 'Accelerator Program',
    description: '適合已有 MVP 或初期營收的成長期新創。為期十個月（每年 3 月 ~ 12 月），提供業師輔導、企業對接與募資機會。',
    learnHref: '/accelerator',
    note: '2027 梯次申請：2026 年 12 月 ~ 2027 年 1 月開放',
  },
  {
    label: '02',
    name: '台大車庫',
    en: 'Garage Incubator',
    description: '適合概念驗證至 MVP 階段的早期團隊。年度梯次制（每年 3 月 ~ 12 月），虛擬進駐、會議室使用與創業社群資源。',
    learnHref: '/garage',
    note: '2027 梯次申請：2026 年 12 月 ~ 2027 年 1 月開放',
  },
]

const timeline = [
  { step: '1', label: '線上申請', description: '填寫申請表單，提交團隊與計畫資料' },
  { step: '2', label: '書面審查', description: '中心團隊進行初步書面審核' },
  { step: '3', label: '面試邀約', description: '通過書審者將受邀進行線上或實體面談' },
  { step: '4', label: '結果通知', description: '面試後三週內通知錄取結果並安排入駐' },
]

export default function ApplyPageClient() {
  return (
    <main>
      {/* Hero */}
      <section className="flex border-b border-[#e0ddd8]" style={{ height: 'calc(100vh - 80px)' }}>
        <motion.div
          className="relative flex w-1/2 flex-col justify-between border-r border-[#e0ddd8] px-12 py-16"
          style={{ backgroundImage: 'linear-gradient(to right, #e0ddd8 1px, transparent 1px)', backgroundSize: '25% 100%' }}
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Apply / Pre-register</p>
          <div>
            <h1 className="text-5xl font-bold leading-tight text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              申請與<br />提前登記
            </h1>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate-500">
              加速器與車庫採年度梯次制，非隨時招生。2027 梯次正式申請於 2026 年 12 月開放。
            </p>
          </div>
          <a href="#preregister" className="inline-block rounded-full bg-[#00AA95] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]">
            提前登記通知
          </a>
        </motion.div>
        <motion.div className="relative w-1/2 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>
          <Image src="/images/events/opening-2026-pitching.jpg" alt="申請台大創創" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#181614]/20" />
        </motion.div>
      </section>

      {/* Batch Notice */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8 py-16">
          <div className="mx-auto max-w-3xl rounded-lg border border-[#00AA95]/20 bg-[#e8f7f5] p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#00AA95]">關於申請時程</p>
            <p className="mb-4 text-[#181614]">台大創創中心的加速器與車庫採用<strong>年度梯次制</strong>，每年 3 月進駐、12 月結束，<strong>不接受隨時插班</strong>。</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• <strong className="text-[#181614]">2026 梯次</strong>：進行中（3 月 ~ 12 月），現有團隊輔導中</li>
              <li>• <strong className="text-[#181614]">2027 梯次申請期</strong>：2026 年 12 月 ~ 2027 年 1 月</li>
              <li>• <strong className="text-[#181614]">2027 梯次公布結果</strong>：2027 年 2 月</li>
            </ul>
            <p className="mt-4 text-sm text-slate-500">提前登記不等同申請，正式申請仍須在申請期內提交完整文件。</p>
          </div>
        </div>
      </section>

      {/* Two tracks */}
      {tracks.map((track, i) => (
        <section key={track.label} className="border-b border-[#e0ddd8]">
          <div className="mx-auto max-w-screen-xl px-8">
            <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
              <motion.div
                className="border-r border-[#e0ddd8] py-24 pr-16"
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">{track.en}</p>
                <div className="mb-4 text-6xl font-bold text-[#e0ddd8]">{track.label}</div>
                <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>{track.name}</h2>
              </motion.div>
              <motion.div
                className="flex flex-col justify-between py-24 pl-16"
                initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="text-lg leading-relaxed text-slate-500">{track.description}</p>
                <p className="mt-4 text-xs text-slate-400">{track.note}</p>
                <div className="mt-8 flex gap-4">
                  <a href="#preregister" className="rounded-full bg-[#00AA95] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]">
                    提前登記通知
                  </a>
                  <Link href={track.learnHref} className="rounded-full border border-[#e0ddd8] px-6 py-2.5 text-sm font-semibold text-[#181614] transition-colors hover:border-[#00AA95] hover:text-[#00AA95]">
                    先了解計畫細節
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Application flow */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8 py-24">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Process</p>
            <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>申請流程</h2>
          </div>
          <div className="grid grid-cols-2 gap-px bg-[#e0ddd8] md:grid-cols-4">
            {timeline.map((t, i) => (
              <motion.div key={t.step} className="bg-[#f9f8f6] p-8 text-center" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#00AA95] text-lg font-bold text-white">{t.step}</div>
                <h4 className="mb-2 font-bold text-[#181614]">{t.label}</h4>
                <p className="text-xs leading-relaxed text-slate-400">{t.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-register form */}
      <section id="preregister" className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Pre-register</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>提前登記</h2>
              <p className="mt-6 text-base leading-relaxed text-slate-500">
                2027 梯次申請將於 2026 年 12 月開放。提前登記不等同申請，正式開放時優先通知。
              </p>
            </div>
            <div className="py-24 pl-16">
              <Suspense fallback={<div className="py-8 text-center text-slate-400">正在載入登記表單...</div>}>
                <PreRegisterForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ link */}
      <section className="relative overflow-hidden" style={{ minHeight: '280px' }}>
        <Image src="/images/photos/ntu-fuzhong-fountain.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0A192F]/80" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-8 py-20 text-center">
          <h3 className="mb-4 text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif TC', serif" }}>還有疑問？</h3>
          <p className="mb-6 text-white/70">查看常見問題，了解更多關於申請條件、計畫內容與費用的細節。</p>
          <Link href="/faq" className="inline-block rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10">
            查看常見問題
          </Link>
        </div>
      </section>
    </main>
  )
}
