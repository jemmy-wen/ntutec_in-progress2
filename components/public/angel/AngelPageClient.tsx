'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import TrackClick from '@/components/TrackClick'

const EASE = [0.22, 1, 0.36, 1] as const

const recentInvestments = [
  { name: 'AHEAD Medicine 先勁智能', round: '2025 Q4', sector: '生技醫療 · AI 診斷', description: '台大醫學院校友 Andrea Wang 創辦的 AI 醫療輔助診斷平台，協助醫師縮短 X 光片判讀時間，獲台大天使會投資。', sources: [] as { label: string; url: string }[] },
  { name: 'MoBagel 行動貝果', round: '2026 Q1', sector: 'AI · 數據分析', description: '鍾哲民創辦的 AI/數據分析平台，累計募資 US$21M+，服務 3,000+ 品牌。台大車庫與加速器歷屆校友，2026 Q1 接受台大天使會投資。', sources: [{ label: 'INSIDE 報導', url: 'https://www.inside.com.tw/article/27055-mobagel' }, { label: '工商時報專訪', url: 'https://ctee.com.tw/industrynews/technology/317716.html' }] },
  { name: '思輔科技 SAVFE', round: '2026 Q1', sector: '硬科技 · 手術導航', description: '周皓凱創辦的微創手術導航技術公司，2025 國家新創獎，亞東醫院場域驗證，2026 Q1 獲台大天使會投資。', sources: [{ label: '國家新創獎官方頁', url: 'https://innoaward.taiwan-healthcare.org/award_detail.php?REFDOCTYPID=0mge2rck644mcfl0&num=1&REFDOCID=0sq2hwdu6fedv1i8' }] },
]

const highlights = [
  { label: '01', title: '嚴選優質案源', desc: '每案皆經三段嚴格篩選，由投資經理親自盡調。省去自行篩選的時間成本，直接接觸已通過高門檻評估的優質新創。' },
  { label: '02', title: '完整投資備忘錄', desc: '每個上架月會的新創均附完整 DD 備忘錄：市場分析、財務模型、競爭優勢、風險評估與 Term Sheet 建議，支援你的投資決策。' },
  { label: '03', title: '彈性個人直接投資', desc: '會員以個人資金直接投資，不受機構共投限制，投資金額自主決定，完全掌握決策時機與規模。' },
  { label: '04', title: '生態系長期支持', desc: '連結 13 年累積的業師網絡、校友資源與 35 家企業合作夥伴，被投企業獲得的不只是資金，而是持續成長的生態系動能。' },
]

const monthlySteps = [
  { step: '01', title: '案源進入', desc: '申請、業師推薦或校友引薦' },
  { step: '02', title: '三段篩選', desc: '投資經理全程主導盡職調查' },
  { step: '03', title: '上架資訊卡', desc: '月會前開放閱覽，附完整投資評估摘要' },
  { step: '04', title: '天使例會', desc: '新創 Pitch 與 Q&A，會員現場互動提問' },
  { step: '05', title: '記名投票', desc: '針對有意投資的案件表態與說明偏好' },
  { step: '06', title: '個人直接投資', desc: '會員以個人名義直接持股，中心協助撮合文件流程' },
]

const gateProcess = [
  { stage: '第一關', title: '初篩（硬過濾）', description: '基本資格與領域契合度篩選，確認案件符合聚焦領域（AI 軟體、生技醫療、硬科技、創新商模）。' },
  { stage: '第二關', title: '快速評分', description: '團隊、商業模式、市場規模、競爭優勢、執行力等多維度評分，由投資經理評估是否進入下一階段。' },
  { stage: '第三關', title: '完整 DD 報告', description: '含市場分析、財務模型、Term Sheet 建議的完整投資評估報告。通過後進入月例會向會員 Pitch。' },
]

const membershipTiers = [
  {
    name: '個人會員',
    subtitle: '天使投資人 · 企業高階主管',
    price: 'NT$50,000',
    period: '/年',
    featured: false,
    benefits: ['每月精選新創資訊卡片', '完整 DD 備忘錄與盡調資料', '月會出席與記名投票權', '40+ 天使投資人社群交流', '投後 Portfolio 追蹤更新', '月會後新創實地參訪'],
  },
  {
    name: '企業會員',
    subtitle: 'CVC · 創投 · 金融機構 · 企業集團',
    price: 'NT$100,000',
    period: '/年',
    featured: true,
    badge: '推薦',
    benefits: ['可指派 3 位代表出席', '包含所有個人會員權益', '優先企業參訪安排', '企業品牌曝光與共投機會', '專屬案源推薦通道', '年度投資趨勢報告'],
  },
]

export default function AngelPageClient() {
  return (
    <main>
      {/* Hero */}
      <section className="flex border-b border-[#e0ddd8]" style={{ height: 'calc(100vh - 80px)' }}>
        <motion.div
          className="relative flex w-1/2 flex-col justify-between border-r border-[#e0ddd8] px-12 py-16"
          style={{ backgroundImage: 'linear-gradient(to right, #e0ddd8 1px, transparent 1px)', backgroundSize: '25% 100%' }}
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Angel Investment Club</p>
          <div>
            <h1 className="text-4xl font-bold leading-tight text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              NTUTEC ANGELS<br />台大天使會
            </h1>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate-500">
              以台大創業生態系為核心的天使投資社群。每月精選優質新創、三段嚴格盡調、記名投票，與 40+ 位天使會員共同佈局早期新創。
            </p>
          </div>
          <TrackClick eventName="cta_angel_apply_click" eventParams={{ location: 'angel_hero' }}>
            <Link href="/angel-apply" className="inline-block rounded-full bg-[#00AA95] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]">
              申請入會審核
            </Link>
          </TrackClick>
        </motion.div>
        <motion.div className="relative w-1/2 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>
          <Image src="/images/events/opening-2026-audience.jpg" alt="台大天使會" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#181614]/30" />
          <div className="absolute bottom-12 left-12">
            <div className="flex gap-8 text-white">
              {[{ num: '150+', label: '投資人網絡' }, { num: '40+', label: '天使會員' }, { num: '每月', label: '天使例會' }].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-bold">{s.num}</p>
                  <p className="text-xs text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Track Record */}
      <section className="border-b border-[#e0ddd8] bg-[#181614]">
        <div className="mx-auto max-w-screen-xl px-8 py-24">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Track Record</p>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "'Noto Serif TC', serif" }}>近期投資案例</h2>
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

      {/* Member Benefits */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Member Benefits</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>加入天使會<br />的理由</h2>
            </div>
            <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
              {highlights.map((h, i) => (
                <motion.div key={h.label} className="py-8 first:pt-0 last:pb-0" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{h.label}</p>
                  <h3 className="mt-2 text-xl font-bold text-[#181614]">{h.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{h.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Monthly flow */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8 py-24">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">How It Works</p>
            <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>每月如何運作</h2>
            <p className="mt-4 text-slate-500">從案源進入到投資決策，每一步都有清楚的流程。</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-[#e0ddd8] md:grid-cols-3 lg:grid-cols-6">
            {monthlySteps.map((s, i) => (
              <motion.div key={s.step} className="bg-[#f9f8f6] p-8 text-center" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}>
                <p className="mb-3 text-xs font-bold text-[#00AA95]">{s.step}</p>
                <h4 className="mb-2 text-sm font-bold text-[#181614]">{s.title}</h4>
                <p className="text-xs leading-relaxed text-slate-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-gate screening */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Screening Process</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>三段嚴格<br />篩選機制</h2>
              <p className="mt-6 text-base leading-relaxed text-slate-500">每個上架到月例會的案件，都經過投資經理的完整盡調，嚴格篩選，不輕易上架。</p>
            </div>
            <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
              {gateProcess.map((g, i) => (
                <motion.div key={g.stage} className="py-8 first:pt-0 last:pb-0" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}>
                  <span className="inline-block rounded-full bg-[#00AA95] px-3 py-0.5 text-xs font-bold text-white">{g.stage}</span>
                  <h3 className="mt-3 text-xl font-bold text-[#181614]">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{g.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Membership tiers */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8 py-24">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Membership</p>
            <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>會員方案</h2>
            <p className="mt-4 text-slate-500">年費制，申請隨時開放，採審核制。</p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-px bg-[#e0ddd8] md:grid-cols-2">
            {membershipTiers.map((tier) => (
              <div key={tier.name} className={`relative p-10 ${tier.featured ? 'bg-[#181614]' : 'bg-white'}`}>
                {tier.badge && (
                  <span className="absolute right-6 top-6 rounded-full bg-[#00AA95] px-3 py-0.5 text-xs font-bold text-white">{tier.badge}</span>
                )}
                <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${tier.featured ? 'text-[#00AA95]' : 'text-slate-400'}`}>{tier.subtitle}</p>
                <h3 className={`mt-2 text-2xl font-bold ${tier.featured ? 'text-white' : 'text-[#181614]'}`}>{tier.name}</h3>
                <div className="my-6 flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${tier.featured ? 'text-white' : 'text-[#181614]'}`}>{tier.price}</span>
                  <span className={`text-sm ${tier.featured ? 'text-white/50' : 'text-slate-400'}`}>{tier.period}</span>
                </div>
                <ul className="mb-8 space-y-3">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 shrink-0 text-[#00AA95]">✓</span>
                      <span className={tier.featured ? 'text-white/70' : 'text-slate-500'}>{b}</span>
                    </li>
                  ))}
                </ul>
                {tier.featured && (
                  <Link href="/angel-apply" className="block rounded-full bg-[#00AA95] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]">
                    申請入會審核
                  </Link>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-slate-400">天使投資具有高度風險。以上投資案例為歷史績效，不代表未來投資結果之保證。</p>
        </div>
      </section>

      {/* Requirements + CTA */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Requirements</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>入會資格</h2>
              <ul className="mt-8 space-y-4">
                {['對早期新創投資有興趣，願意投入時間與資源', '認同台大創創中心的使命與價值觀', '願意參與每月天使例會及相關活動'].map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#00AA95]" />
                    <span className="text-slate-500 leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center py-24 pl-16">
              <h3 className="mb-4 text-2xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>成為台大天使會的一員</h3>
              <p className="mb-8 text-slate-500">與台大創業生態系的天使投資人一起，發掘改變未來的早期新創。個人會員 NT$50,000/年，企業會員 NT$100,000/年，隨時開放申請，採審核制。</p>
              <TrackClick eventName="cta_angel_apply_click" eventParams={{ location: 'angel_cta' }}>
                <Link href="/angel-apply" className="inline-block rounded-full bg-[#00AA95] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]">
                  申請入會審核
                </Link>
              </TrackClick>
              <p className="mt-4 text-sm text-slate-400">有疑問？來信 ntutec@ntutec.com 或 <Link href="/faq" className="text-[#00AA95] hover:underline">查看常見問題</Link></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
