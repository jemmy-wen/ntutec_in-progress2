import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: 'NTUTEC ANGELS 臺大天使會 | NTUTEC',
  description:
    'NTUTEC ANGELS 臺大天使會成立於 2023 年，以 Gate 0/1/2 三段預審、每月例會與生態系支持，為會員提供經過嚴謹篩選的優質早期案源。',
}

const highlights = [
  {
    icon: '🎯',
    title: '嚴選優質案源',
    description:
      '所有案件皆經過台大創創中心 Gate 0/1/2 三段預審流程，由投資經理親自盡調。會員搶先接觸台大校友與輔導團隊的優質早期新創。',
  },
  {
    icon: '🎪',
    title: '每月天使例會',
    description:
      '每月定期舉辦天使例會，由新創團隊進行 Pitch 與 Q&A，結合產業分享會與會員交流，打造高品質的投資人社群。',
  },
  {
    icon: '🤝',
    title: '彈性投資機制',
    description:
      '會員以個人資金直接投資，不受機構共投限制。結合例會後的實地參訪，會員可自主決策投資規模與時機。',
  },
  {
    icon: '📈',
    title: '生態系支持',
    description:
      '連結台大創創中心 13 年累積的業師網絡、校友資源與 35 家企業合作夥伴，協助被投企業加速成長。',
  },
]

const gateProcess = [
  {
    stage: 'Gate 0',
    title: '初篩（硬過濾）',
    description: '基本資格與領域契合度篩選，確認案件符合中心聚焦領域（AI 軟體、生技醫療、硬科技、創新商模）。',
  },
  {
    stage: 'Gate 1',
    title: '快速評分',
    description: '團隊、商業模式、市場規模、競爭優勢、執行力等多維度評分，由投資經理評估是否進入 Gate 2。',
  },
  {
    stage: 'Gate 2',
    title: '完整報告',
    description: '含市場分析、財務模型、Term Sheet 建議的完整投資評估報告。通過後進入月例會向會員 Pitch。',
  },
]

export default function AngelPage() {
  return (
    <>
      <PageHero
        title="NTUTEC ANGELS 臺大天使會"
        subtitle="Angel Investment Club"
        description="以台大創業生態系為核心的天使投資社群，結合 13 年輔導經驗、Gate 預審系統與業師網絡，為會員提供經過嚴謹篩選的投資案源。"
      />

      {/* Why Join */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="micro-label mb-4">Why Join</p>
            <h2 className="mb-6">為什麼加入天使俱樂部</h2>
            <p className="text-lg leading-relaxed text-slate-muted">
              台大創創中心天使投資俱樂部成立於 2023 年，是以台大創業生態系為核心的天使投資社群。我們結合 13 年累積的新創輔導經驗、Gate 預審系統與業師網絡，為會員提供經過嚴謹篩選的投資案源、深度的產業洞察，以及專屬的投資人交流場域。
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-muted">
              近期投資活躍度與會員留存率持續創新高，涵蓋 AI 軟體、生技醫療、硬科技與創新商模四大聚焦領域。
            </p>
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Member Benefits</p>
            <h2>會員權益</h2>
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

      {/* Gate Process */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="micro-label mb-4">Gate Review</p>
            <h2 className="mb-4">Gate 0/1/2 三段預審</h2>
            <p className="text-lg text-slate-muted">
              從初篩到完整投資評估，每個上架到月例會的案件都經過投資經理的深度盡調。
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
                <p className="text-sm leading-relaxed text-slate-muted">
                  {gate.description}
                </p>
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

      {/* Demo Day */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="micro-label mb-4">Demo Day</p>
            <h2 className="mb-4">一年一度的投資媒合盛會</h2>
            <p className="text-lg text-slate-muted">
              每年 12 月，台大創創中心在台大校園舉辦年度 Demo Day，由精選新創向投資人 Pitch，
              現場設置互動攤位與媒合機制。天使俱樂部會員可優先取得名額並參與投後追蹤。
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[
              { value: '74', unit: '位', label: '投資人單場到場', sub: 'VC 44 位 + 天使 30 位' },
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
            <Link href="/demo-day" className="btn-pill-outline">了解更多 Demo Day</Link>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="micro-label mb-4">Member Platform</p>
            <h2 className="mb-4">入會後，你可以做什麼</h2>
            <p className="text-lg text-slate-muted">
              NTUTEC ANGELS 提供專屬會員平台，從案源瀏覽到投資決策，一站完成。
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-4">
            {[
              { icon: '📋', title: '瀏覽候選新創', desc: '每月天使例會前，上架 3–5 家精選新創的六張資訊卡片，完整呈現團隊、市場與競爭優勢。' },
              { icon: '🗳️', title: '投資意向投票', desc: '天使例會後針對 Pitch 過的新創進行記名投票，並選擇投資金額範圍（50萬以下 / 50–100萬 / 100–200萬 / 200萬以上）。' },
              { icon: '📊', title: '本月 Pipeline', desc: '即時查看當月評估中的新創列表，了解 Gate 篩選進度與案源品質。' },
              { icon: '📚', title: '學習中心', desc: '天使投資入門、產業趨勢、盡職調查方法論等學習資源，持續更新。' },
              { icon: '🔔', title: '即時通知', desc: '卡片上架、投票開放、天使例會提醒——重要事件第一時間通知到你。' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-2xl bg-white p-5">
                <div className="text-2xl mt-0.5">{item.icon}</div>
                <div>
                  <h4 className="font-semibold text-charcoal">{item.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="micro-label mb-4">Strategic Partners</p>
            <h2 className="mb-4">生態系戰略夥伴</h2>
            <p className="text-lg text-slate-muted">
              天使俱樂部與台大創業生態系中的獨立投資機構保持戰略合作關係，為會員擴展更廣的投資視野與退場路徑。
            </p>
            <div className="mt-10 rounded-2xl border border-stone-warm bg-white p-8">
              <h3 className="mb-2 text-xl font-semibold">NTU Alumni Ventures</h3>
              <p className="text-sm text-slate-muted mb-3">獨立運營公司 · 戰略合作夥伴</p>
              <p className="text-slate-muted leading-relaxed">
                由台大校友發起的獨立投資機構，與台大創創中心保持戰略合作關係，共同推動台大創業生態系的資本對接。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-teal-wash">
        <div className="container text-center">
          <h2 className="mb-6">成為天使投資俱樂部的一員</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">
            與台大創業生態系的天使投資人一起，發掘改變未來的早期新創。
          </p>
          <Link href="/angel-apply" className="btn-pill-primary">
            預約入會諮詢
          </Link>
        </div>
      </section>
    </>
  )
}
