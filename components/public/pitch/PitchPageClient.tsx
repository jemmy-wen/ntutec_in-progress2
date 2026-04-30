'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import TrackClick from '@/components/TrackClick'

const EASE = [0.22, 1, 0.36, 1] as const

const recentInvestments = [
  { name: 'AHEAD Medicine 先勁智能', round: '2025 Q4', sector: '生技醫療 · AI 診斷', description: '台大醫學院校友 Andrea Wang 創辦，AI 醫療輔助診斷平台，協助醫師縮短 X 光片判讀時間，獲台大天使會投資。', sources: [] as { label: string; url: string }[] },
  { name: 'MoBagel 行動貝果', round: '2026 Q1', sector: 'AI · 數據分析', description: '鍾哲民創辦的 AI/數據分析平台，累計募資 US$21M+，服務 3,000+ 品牌。台大車庫與加速器歷屆校友，2026 Q1 接受台大天使會投資。', sources: [{ label: 'INSIDE 報導', url: 'https://www.inside.com.tw/article/27055-mobagel' }, { label: '工商時報專訪', url: 'https://ctee.com.tw/industrynews/technology/317716.html' }] },
  { name: '思輔科技 SAVFE', round: '2026 Q1', sector: '硬科技 · 手術導航', description: '周皓凱創辦的微創手術導航技術公司，2025 國家新創獎，亞東醫院場域驗證，2026 Q1 獲台大天使會投資。', sources: [{ label: '國家新創獎官方頁', url: 'https://innoaward.taiwan-healthcare.org/award_detail.php?REFDOCTYPID=0mge2rck644mcfl0&num=1&REFDOCID=0sq2hwdu6fedv1i8' }] },
]

const whyPitch = [
  { label: '01', title: '接觸認真的投資人', desc: '40+ 位天使會員每月定期出席例會，帶著明確投資意圖。這不是瀏覽履歷的平台，而是有人主動為你的案件背書、安排上台的機制。' },
  { label: '02', title: '投資經理全程主導', desc: '有投資經理親自審閱、安排面談、撰寫評估報告並向天使會員呈現。你不是自己冷投，而是有人幫你把案件帶進對的場合。' },
  { label: '03', title: '台大校友網絡加持', desc: '進入 NTUTEC 評估流程，即接觸超過 13 年累積的台大創業校友網絡。獲投後除資金外，可對接業師與企業合作夥伴。' },
  { label: '04', title: '隨時投遞，無截止日', desc: '不設申請梯次或截止日，隨時投遞隨時進入評估。符合條件的新創，投資經理會主動聯繫，不需要等待。' },
]

const afterSubmit = [
  { step: '01', title: '投資經理審閱', description: '投資經理逐一審閱投遞資料，主動與符合條件的新創聯繫，安排進一步了解。' },
  { step: '02', title: '一對一面談', description: '與投資經理進行面談，深入討論產品現況、市場策略與融資需求，雙方確認契合度。' },
  { step: '03', title: '天使月例會 Pitch', description: '通過評估後，安排在天使月例會向 40+ 位天使投資人現場 Pitch。例會後若有投資人表達意向，中心協助雙方建立後續聯繫。' },
]

const eligibility = [
  '具備技術創新或商業模式創新，有清晰的問題定義與解決方案',
  '聚焦領域：AI 軟體、生技醫療、硬科技、創新商模；其他具潛力領域歡迎個案評估',
  '台大創創中心輔導計畫（台大加速器、台大車庫）校友享優先推薦資格',
  '有核心團隊與明確的創辦人，具備推進產品與市場的執行能力',
  '願意配合盡調流程，並對外部投資保持開放態度',
]

export default function PitchPageClient() {
  return (
    <main>
      {/* Hero */}
      <section className="flex border-b border-[#e0ddd8]" style={{ height: 'calc(100vh - 80px)' }}>
        <motion.div
          className="relative flex w-1/2 flex-col justify-between border-r border-[#e0ddd8] px-12 py-16"
          style={{ backgroundImage: 'linear-gradient(to right, #e0ddd8 1px, transparent 1px)', backgroundSize: '25% 100%' }}
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Pitch to NTUTEC Angels</p>
          <div>
            <h1 className="text-5xl font-bold leading-tight text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              投遞你的<br />新創
            </h1>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate-500">
              將你的新創提交給 NTUTEC ANGELS 台大天使會。投資經理親自審閱，符合條件者安排面談，通過評估後在每月天使例會向 40+ 位天使投資人現場 Pitch。
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            {[{ num: '150+', label: '投資人網絡' }, { num: '每月', label: '天使例會' }, { num: '3週', label: '初審回覆' }].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-[#181614]">{s.num}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div className="relative w-1/2 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>
          <Image src="/images/events/opening-2026-pitching.jpg" alt="新創投遞" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#181614]/20" />
        </motion.div>
      </section>

      {/* Track record */}
      <section className="border-b border-[#e0ddd8] bg-[#181614]">
        <div className="mx-auto max-w-screen-xl px-8 py-24">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Track Record</p>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "'Noto Serif TC', serif" }}>台大天使會近期投資案例</h2>
            <p className="mt-3 text-slate-400">這是進入天使例會後可能發生的事</p>
          </div>
          <div className="grid gap-px bg-white/10 md:grid-cols-3">
            {recentInvestments.map((inv, i) => (
              <motion.div key={inv.name} className="bg-[#181614] p-10" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}>
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-[#00AA95]/20 px-3 py-0.5 text-xs font-semibold text-[#00AA95]">{inv.round}</span>
                  <span className="text-xs text-white/40">{inv.sector}</span>
                </div>
                <h4 className="mb-3 text-lg font-bold text-white">{inv.name}</h4>
                <p className="text-sm leading-relaxed text-white/60">{inv.description}</p>
                {inv.sources.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {inv.sources.map((s) => (
                      <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-[#00AA95] hover:underline">{s.label} →</a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why pitch here */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Why NTUTEC ANGELS</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>為什麼<br />選擇這裡</h2>
            </div>
            <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
              {whyPitch.map((item, i) => (
                <motion.div key={item.label} className="py-8 first:pt-0 last:pb-0" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                  <h3 className="mt-2 text-xl font-bold text-[#181614]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* After submit flow */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8 py-24">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">What Happens Next</p>
            <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>投遞之後</h2>
            <p className="mt-4 text-slate-500">投遞沒有截止日。每份資料都會由投資經理親自看過，符合條件的新創我們會主動聯繫。</p>
          </div>
          <div className="grid gap-px bg-[#e0ddd8] md:grid-cols-3">
            {afterSubmit.map((item, i) => (
              <motion.div key={item.step} className="bg-[#f9f8f6] p-10" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}>
                <p className="mb-4 text-5xl font-bold text-[#e0ddd8]">{item.step}</p>
                <h4 className="mb-3 text-xl font-bold text-[#181614]">{item.title}</h4>
                <p className="text-sm leading-relaxed text-slate-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Eligibility</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>適合投遞<br />的新創</h2>
              <p className="mt-6 text-sm text-slate-400">不確定是否符合？歡迎直接投遞，投資經理審閱後會主動聯繫，說明下一步。</p>
            </div>
            <div className="py-24 pl-16">
              <ul className="space-y-5">
                {eligibility.map((item, i) => (
                  <motion.li key={i} className="flex items-start gap-4" initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}>
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#00AA95]" />
                    <span className="text-slate-500 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Submit CTA */}
      <section id="submit" className="relative overflow-hidden" style={{ minHeight: '400px' }}>
        <Image src="/images/events/opening-2026-05.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0A192F]/80" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-8 py-24 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Submit</p>
          <h2 className="mb-4 text-4xl font-bold text-white" style={{ fontFamily: "'Noto Serif TC', serif" }}>立即投遞</h2>
          <p className="mb-10 text-lg text-white/70">提交後，投資經理將逐一審閱並主動與你聯繫。</p>
          <TrackClick eventName="cta_pitch_click" eventParams={{ location: 'pitch_page_submit' }}>
            <a href="https://forms.gle/yu4ftYfVdsWaynxY8" target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-[#00AA95] px-10 py-4 text-base font-semibold text-white transition-colors hover:bg-[#008f7d]">
              填寫新創投遞表單 →
            </a>
          </TrackClick>
        </div>
      </section>

      {/* Cross links */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8 py-20 text-center">
          <h3 className="mb-3 text-2xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>還沒準備好投遞？</h3>
          <p className="mb-8 text-slate-500">先加入台大車庫或台大加速器計畫，接受完整輔導後再接觸台大天使會，準備更充分。</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/programs" className="rounded-full border border-[#e0ddd8] px-7 py-3 text-sm font-semibold text-[#181614] transition-colors hover:border-[#00AA95] hover:text-[#00AA95]">了解輔導計畫</Link>
            <Link href="/angel" className="rounded-full border border-[#e0ddd8] px-7 py-3 text-sm font-semibold text-[#181614] transition-colors hover:border-[#00AA95] hover:text-[#00AA95]">了解台大天使會</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
