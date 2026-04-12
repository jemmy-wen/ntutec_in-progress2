import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: 'NTUTEC ANGELS 臺大天使會 | NTUTEC',
  description:
    'NTUTEC ANGELS 臺大天使會：每月精選台大生態系優質新創、三段嚴格盡調、記名投票機制，與 40+ 位天使投資人共同佈局早期新創。個人會員 NT$50,000/年。',
}

/* ───────── data ───────── */

const recentInvestments = [
  {
    name: 'AHEAD Medicine 先勁智能',
    round: '2025 Q4',
    sector: '生技醫療 · AI 診斷',
    description:
      '台大醫學院校友 Andrea Wang 創辦的 AI 醫療輔助診斷平台，協助醫師縮短 X 光片判讀時間，獲天使俱樂部投資。',
  },
  {
    name: 'MoBagel 行動貝果',
    round: '2026 Q1',
    sector: 'AI · 數據分析',
    description:
      '台大車庫與加速器校友鍾哲民創辦，服務超過 200 家企業客戶的 AI/數據分析平台，近期完成天使俱樂部投資。',
  },
  {
    name: '配客嘉 PackAge+',
    round: '早期股東',
    sector: '循環包裝 · ESG',
    description:
      '台大加速器校友，天使俱樂部為早期股東並持股至 A 輪。2025 年完成逾新台幣 1 億元 A 輪募資。',
  },
]

const highlights = [
  {
    icon: '🎯',
    title: '嚴選優質案源',
    description:
      '每案皆經三段嚴格篩選，由投資經理親自盡調。省去自行篩選的時間成本，直接接觸已通過高門檻評估的優質新創。',
  },
  {
    icon: '📋',
    title: '完整投資備忘錄',
    description:
      '每個上架月會的新創均附完整 DD 備忘錄：市場分析、財務模型、競爭優勢、風險評估與 Term Sheet 建議，支援你的投資決策。',
  },
  {
    icon: '🤝',
    title: '彈性個人直接投資',
    description:
      '會員以個人資金直接投資，不受機構共投限制，投資金額自主決定，完全掌握決策時機與規模。',
  },
  {
    icon: '📈',
    title: '生態系長期支持',
    description:
      '連結 13 年累積的業師網絡、校友資源與 35 家企業合作夥伴，被投企業獲得的不只是資金，而是持續成長的生態系動能。',
  },
]

const monthlySteps = [
  { icon: '📥', title: '案源進入', desc: '申請、業師推薦或校友引薦' },
  { icon: '🔬', title: '三段篩選', desc: '投資經理全程主導盡職調查' },
  { icon: '📋', title: '上架資訊卡', desc: '月會前開放閱覽，附完整投資評估摘要' },
  { icon: '🎤', title: '天使例會', desc: '新創 Pitch 與 Q&A，會員現場互動提問' },
  { icon: '🗳️', title: '記名投票', desc: '針對有意投資的案件表態與說明偏好' },
  { icon: '💼', title: '個人直接投資', desc: '會員以個人名義直接持股，中心協助撮合文件流程' },
]

const gateProcess = [
  {
    stage: '第一關',
    title: '初篩（硬過濾）',
    description:
      '基本資格與領域契合度篩選，確認案件符合聚焦領域（AI 軟體、生技醫療、硬科技、創新商模）。',
  },
  {
    stage: '第二關',
    title: '快速評分',
    description:
      '團隊、商業模式、市場規模、競爭優勢、執行力等多維度評分，由投資經理評估是否進入下一階段。',
  },
  {
    stage: '第三關',
    title: '完整 DD 報告',
    description:
      '含市場分析、財務模型、Term Sheet 建議的完整投資評估報告。通過後進入月例會向會員 Pitch。',
  },
]

const membershipTiers = [
  {
    name: '個人會員',
    subtitle: '天使投資人 · 企業高階主管',
    price: 'NT$50,000',
    period: '/年',
    featured: false,
    benefits: [
      '每月精選新創資訊卡片',
      '完整 DD 備忘錄與盡調資料',
      '月會出席與記名投票權',
      '40+ 天使投資人社群交流',
      '投後 Portfolio 追蹤更新',
      '月會後新創實地參訪',
    ],
  },
  {
    name: '企業會員',
    subtitle: 'CVC · 創投 · 金融機構 · 企業集團',
    price: 'NT$100,000',
    period: '/年',
    featured: true,
    badge: '推薦',
    benefits: [
      '可指派 3 位代表出席',
      '包含所有個人會員權益',
      '優先企業參訪安排',
      '企業品牌曝光與共投機會',
      '專屬案源推薦通道',
      '年度投資趨勢報告',
    ],
  },
]

const requirements = [
  '具備合格投資人資格（依金管會規定）',
  '對早期新創投資有興趣，願意投入時間與資源',
  '認同臺大創創中心的使命與價值觀',
  '願意參與每月天使例會及相關活動',
  '經兩位現有會員推薦，或直接來信申請由中心審核引薦',
]

/* ───────── page ───────── */

export default function AngelPage() {
  return (
    <>
      <PageHero
        title="NTUTEC ANGELS 臺大天使會"
        subtitle="Angel Investment Club"
        description="以台大創業生態系為核心的天使投資社群。每月精選優質新創、三段嚴格盡調、記名投票，與 40+ 位投資人共同佈局早期新創。"
      />

      {/* ── Stat bar ── */}
      <section className="border-b border-border/40 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 divide-x divide-border/40 md:grid-cols-4">
            {[
              { value: '40+', label: '天使投資人' },
              { value: '每月', label: '定期天使例會' },
              { value: '2023', label: '俱樂部成立年' },
              { value: '3 關', label: '嚴格篩選機制' },
            ].map((s) => (
              <div key={s.label} className="px-6 py-5 text-center">
                <div className="text-2xl font-bold text-charcoal">{s.value}</div>
                <div className="mt-0.5 text-xs text-slate-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Investments — dark section ── */}
      <section className="section-spacing bg-charcoal text-white">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-bold tracking-widest text-teal">TRACK RECORD</p>
            <h2 className="text-white">近期投資案例</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {recentInvestments.map((inv) => (
              <div
                key={inv.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-teal/20 px-3 py-0.5 text-xs font-semibold text-teal">
                    {inv.round}
                  </span>
                  <span className="text-xs text-white/40">{inv.sector}</span>
                </div>
                <h4 className="mb-3 text-lg font-semibold leading-snug text-white">{inv.name}</h4>
                <p className="text-sm leading-relaxed text-white/60">{inv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Member Benefits ── */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Member Benefits</p>
            <h2>加入天使俱樂部的理由</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {highlights.map((benefit) => (
              <div key={benefit.title} className="card-hover rounded-2xl bg-white p-8">
                <span className="mb-4 block text-4xl">{benefit.icon}</span>
                <h3 className="mb-3 text-xl font-semibold">{benefit.title}</h3>
                <p className="text-slate-muted leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Monthly Cycle — horizontal flow ── */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">How It Works</p>
            <h2 className="mb-4">每月如何運作</h2>
            <p className="text-lg text-slate-muted">從案源進入到投資決策，每一步都有清楚的流程。</p>
          </div>

          {/* Desktop: horizontal flow */}
          <div className="hidden lg:flex items-start gap-0">
            {monthlySteps.map((s, i) => (
              <div key={s.title} className="flex flex-1 items-start">
                <div className="flex-1 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                    {s.icon}
                  </div>
                  <div className="mb-1 text-xs font-bold tracking-widest text-teal">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="mb-1 text-sm font-semibold">{s.title}</h4>
                  <p className="text-xs leading-relaxed text-slate-muted">{s.desc}</p>
                </div>
                {i < monthlySteps.length - 1 && (
                  <div className="mt-7 shrink-0 px-1 text-slate-300 text-lg">→</div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical list */}
          <div className="grid gap-4 lg:hidden">
            {monthlySteps.map((s, i) => (
              <div key={s.title} className="flex items-start gap-4 rounded-xl bg-white p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <h4 className="font-semibold">{s.title}</h4>
                  </div>
                  <p className="mt-1 text-sm text-slate-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 三段篩選流程 ── */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="micro-label mb-4">Screening Process</p>
            <h2 className="mb-4">三段嚴格篩選機制</h2>
            <p className="text-lg text-slate-muted">
              每個上架到月例會的案件，都經過投資經理的完整盡調，嚴格篩選，不輕易上架。
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {gateProcess.map((gate, idx) => (
              <div
                key={gate.stage}
                className="relative rounded-2xl border border-stone-warm/60 bg-white p-6"
              >
                <div className="mb-4 inline-flex h-10 items-center justify-center rounded-full bg-teal px-4 text-sm font-bold text-white">
                  {gate.stage}
                </div>
                <h4 className="mb-2 text-lg font-semibold">{gate.title}</h4>
                <p className="text-sm leading-relaxed text-slate-muted">{gate.description}</p>
                {idx < gateProcess.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block">
                    <div className="text-2xl text-teal/40">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Membership Tiers ── */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Membership</p>
            <h2 className="mb-4">會員方案</h2>
            <p className="text-lg text-slate-muted">年費制，申請隨時開放，採審核制。</p>
            <p className="mt-2 text-sm text-slate-muted">來信申請後，投資團隊將審核資料，通過者安排面談，確認雙方契合度後正式入會。</p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {membershipTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 ${
                  tier.featured
                    ? 'bg-charcoal text-white shadow-xl'
                    : 'border-2 border-stone-warm bg-white'
                }`}
              >
                {tier.badge && (
                  <span className="absolute right-6 top-6 rounded-full bg-teal px-3 py-1 text-xs font-bold text-white">
                    {tier.badge}
                  </span>
                )}
                <h3
                  className={`text-xl font-bold ${
                    tier.featured ? 'text-white' : 'text-charcoal'
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    tier.featured ? 'text-white/50' : 'text-slate-muted'
                  }`}
                >
                  {tier.subtitle}
                </p>
                <div className="my-6 flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold ${
                      tier.featured ? 'text-white' : 'text-charcoal'
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={`text-sm ${
                      tier.featured ? 'text-white/50' : 'text-slate-muted'
                    }`}
                  >
                    {tier.period}
                  </span>
                </div>
                <ul className="mb-8 space-y-3">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 shrink-0 text-teal">✓</span>
                      <span
                        className={tier.featured ? 'text-white/75' : 'text-slate-muted'}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/angel-apply"
                  className={`block w-full rounded-xl py-3 text-center font-semibold transition-colors ${
                    tier.featured
                      ? 'bg-teal text-white hover:bg-teal-deep'
                      : 'bg-charcoal text-white hover:bg-charcoal/90'
                  }`}
                >
                  預約入會諮詢
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Requirements ── */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <p className="micro-label mb-4">Requirements</p>
            <h2 className="mb-6">入會資格</h2>
            <ul className="space-y-4">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3 text-slate-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-muted">
              年費繳納方式與詳細說明請見申請頁面，或來信洽詢。
            </p>
          </div>
        </div>
      </section>

      {/* ── Demo Day ── */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="micro-label mb-4">Demo Day</p>
            <h2 className="mb-4">一年一度的投資媒合盛會</h2>
            <p className="text-lg text-slate-muted">
              每年 12 月在台大校園舉辦年度 Demo Day，精選新創向投資人 Pitch。
              天使俱樂部會員優先取得名額並參與投後追蹤。
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[
              { value: '74', unit: '位', label: '投資人單場到場', sub: '創投與天使投資人' },
              { value: '51', unit: '件', label: '媒合意向', sub: '18 自行聯繫 + 33 中心協助' },
              { value: '9,775', unit: '次', label: 'Accupass 瀏覽', sub: '近 7 屆最高紀錄' },
              { value: '9.06', unit: '/10', label: '活動滿意度', sub: '51 份現場問卷' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border bg-white p-6 text-center card-hover">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-teal">{stat.value}</span>
                  <span className="text-xl font-semibold text-teal">{stat.unit}</span>
                </div>
                <p className="mt-2 font-semibold text-charcoal">{stat.label}</p>
                <p className="mt-1 text-xs text-slate-muted">{stat.sub}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/demo-day" className="btn-pill-outline">
              了解更多 Demo Day
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing">
        <div className="container text-center">
          <h2 className="mb-4">成為天使投資俱樂部的一員</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">
            與台大創業生態系的天使投資人一起，發掘改變未來的早期新創。
            個人會員 NT$50,000/年，企業會員 NT$100,000/年，隨時開放申請，採審核制。
          </p>
          <Link href="/angel-apply" className="btn-pill-primary">
            預約入會諮詢
          </Link>
          <p className="mt-4 text-sm text-slate-muted">
            有疑問？{' '}
            <Link href="/faq" className="underline underline-offset-4 hover:text-teal">
              查看常見問題
            </Link>
            {' '}或來信 ntutec@ntutec.com
          </p>
        </div>
      </section>
    </>
  )
}
