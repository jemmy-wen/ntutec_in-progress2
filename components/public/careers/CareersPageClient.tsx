'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { Plus, Minus } from '@phosphor-icons/react'

const EASE = [0.22, 1, 0.36, 1] as const

const whyJoin = [
  { label: '01', title: '深度接觸創業生態系', desc: '每天與新創創辦人、天使投資人和業師互動，學習課堂學不到的實戰知識。' },
  { label: '02', title: '實際參與高影響力工作', desc: '不是打雜的實習——你的工作直接影響輔導計畫的品質、天使例會的準備和對外溝通。' },
  { label: '03', title: '台大資源與人脈', desc: '深入台大創業社群，連結校內外優秀校友與產業資源，建立長期職涯人脈。' },
  { label: '04', title: '多元角色學習機會', desc: '從事業發展、行銷、研究到投資評估，依你的興趣和能力發展跨域能力。' },
]

const testimonials = [
  { quote: '主管直接告訴我：「你不可以把這裡當工讀生，要真正在工作中有收穫。」進來一個單位，離開變成故鄉——這八個字精準描述了我在台大創創中心的實習。', author: '葉思宏', role: '2022 秋季實習生｜事業發展暨行銷部門' },
  { quote: '在這裡不只是執行任務，而是不斷被要求思考：「為什麼要提這個案例？這個方法帶來什麼價值？」這種批判性思維是我帶走的最重要資產。', author: '林君燕', role: '2023 春季實習生｜事業發展暨行銷部門' },
  { quote: '你能在這裡感受到真實的團隊文化，而不只是打雜。從客戶痛點到服務價值，每個思考都在鍛鍊商業邏輯。', author: '施奕丞', role: '2022 秋季實習生｜事業發展暨行銷部門' },
  { quote: '會計系學生在行銷部門做企業創新文案、電子報與社群策略，工作節奏快、挑戰大，但也因此累積了跨域能力，成為我職涯最有價值的半年。', author: '許安聆', role: '2022 秋 + 2023 春季實習生｜事業發展暨行銷部門' },
]

const positions = [
  {
    badge: '工讀生',
    badgeBg: 'bg-[#e8f7f5] text-[#00AA95]',
    count: '1–2 位',
    title: '行政工讀生',
    desc: '協助中心全體經理進行日常行政支援，包含文件整理、活動佈場協助、會議記錄與資料庫維護。適合希望深入了解新創生態系、對創業領域有熱忱的在學學生。',
    requirements: ['每週 10–15 小時，可配合課堂時間', '台大水源校區卓越研究大樓 7F', '歡迎各系所在學學生投遞'],
    email: 'ntutec@ntutec.com?subject=應徵工讀生',
    featured: false,
  },
  {
    badge: '全職／兼職',
    badgeBg: 'bg-[#00AA95] text-white',
    count: '1–2 位',
    title: '輔導專員',
    desc: '協助加速器與台大車庫輔導計畫的全流程執行，包含課程規劃與場務、業師媒合排程、新創團隊追蹤，以及活動籌辦與對外溝通，直接支援輔導經理與營運經理。',
    requirements: ['1–2 年專案執行或新創相關經驗佳', '具強溝通與多工管理能力', '應屆畢業生亦歡迎投遞'],
    email: 'ntutec@ntutec.com?subject=應徵輔導專員',
    featured: true,
  },
  {
    badge: '全職',
    badgeBg: 'bg-[#e8f7f5] text-[#00AA95]',
    count: '1 位',
    title: '投資經理（非生醫領域）',
    desc: '負責台大天使會的案源開發與評估，聚焦 AI／軟體、硬科技、先進製造與創新商模等領域。主責投資案篩選、盡職調查、天使例會報告準備及投資人關係維護。',
    requirements: ['2 年以上創投、顧問或新創工作經驗', '具獨立完成案件評估報告之能力', '生醫領域以外之產業背景優先'],
    email: 'ntutec@ntutec.com?subject=應徵投資經理',
    featured: false,
  },
]

function WhyItem({ label, title, desc }: { label: string; title: string; desc: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-[#e0ddd8]">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 py-6 text-left">
        <div className="flex items-baseline gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</span>
          <span className="text-lg font-semibold text-[#181614]">{title}</span>
        </div>
        {open ? <Minus size={16} className="text-[#00AA95]" /> : <Plus size={16} className="text-slate-400" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
            <p className="pb-6 text-sm leading-relaxed text-slate-500">{desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function CareersPageClient() {
  return (
    <main>
      {/* Hero */}
      <section className="flex border-b border-[#e0ddd8]" style={{ height: 'calc(100vh - 80px)' }}>
        <motion.div
          className="relative flex w-1/2 flex-col justify-between border-r border-[#e0ddd8] px-12 py-16"
          style={{ backgroundImage: 'linear-gradient(to right, #e0ddd8 1px, transparent 1px)', backgroundSize: '25% 100%' }}
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Careers & Internships</p>
          <div>
            <h1 className="text-5xl font-bold leading-tight text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>加入我們</h1>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate-500">
              無論是全職工作或學期實習，在台大創創中心你將接觸到最前沿的新創生態系，與頂尖創業者和投資人共事。
            </p>
          </div>
          <a href="mailto:ntutec@ntutec.com" className="inline-block rounded-full bg-[#00AA95] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]">
            登記下一梯次招募通知
          </a>
        </motion.div>
        <motion.div className="relative w-1/2 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>
          <Image src="/images/events/opening-2026-networking.jpg" alt="加入台大創創中心" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#181614]/20" />
        </motion.div>
      </section>

      {/* Why Join */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Why Join Us</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>為什麼加入<br />台大創創中心</h2>
            </div>
            <div className="py-24 pl-16">
              {whyJoin.map((item) => <WhyItem key={item.label} {...item} />)}
              <div className="border-t border-[#e0ddd8]" />
            </div>
          </div>
        </div>
      </section>

      {/* Internship testimonials */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Internship Program</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>實習計畫</h2>
              <p className="mt-6 text-base leading-relaxed text-slate-500">每學期招募實習生，加入事業發展暨行銷部門，深度參與中心日常運營。</p>
              <div className="mt-8 space-y-4 text-sm text-slate-500">
                <div className="flex gap-3"><span className="font-semibold text-[#181614]">招募時間</span><span>依學期滾動開放，正式開放時以 Email 通知</span></div>
                <div className="flex gap-3"><span className="font-semibold text-[#181614]">實習時數</span><span>每週 2–3 天，可配合課堂時間彈性調整</span></div>
                <div className="flex gap-3"><span className="font-semibold text-[#181614]">工作地點</span><span>台北市中正區思源街 18 號，台大水源校區卓越研究大樓 7 樓</span></div>
              </div>
            </div>
            <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
              {testimonials.map((t, i) => (
                <motion.div key={t.author} className="py-8 first:pt-0 last:pb-0" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}>
                  <p className="text-sm italic leading-relaxed text-slate-500">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-4 text-sm font-bold text-[#181614]">{t.author}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8 py-24">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Open Positions</p>
            <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>常態開放職缺</h2>
            <p className="mt-4 text-slate-500">以下職缺長期徵才，歡迎隨時投遞。我們將於收到履歷後 5 個工作日內回覆。</p>
          </div>
          <div className="grid gap-px bg-[#e0ddd8] md:grid-cols-3">
            {positions.map((pos, i) => (
              <motion.div key={pos.title} className="flex flex-col bg-white p-10" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}>
                <div className="mb-4 flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${pos.badgeBg}`}>{pos.badge}</span>
                  <span className="text-xs text-slate-400">{pos.count}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#181614]">{pos.title}</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-500">{pos.desc}</p>
                <ul className="mb-8 space-y-1.5">
                  {pos.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00AA95]" />{r}
                    </li>
                  ))}
                </ul>
                <a href={`mailto:${pos.email}`} className={`rounded-full py-3 text-center text-sm font-semibold transition-colors ${pos.featured ? 'bg-[#00AA95] text-white hover:bg-[#008f7d]' : 'border border-[#e0ddd8] text-[#181614] hover:border-[#00AA95] hover:text-[#00AA95]'}`}>
                  投遞履歷
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
