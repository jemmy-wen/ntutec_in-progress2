import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/public/PageHero'
import { House, RocketLaunch, ChartBar, Fire, Target, Handshake, Buildings } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: '新創輔導計畫 | NTUTEC',
  description: '想把技術變成新創？台大加速器（不限身分）與台大車庫（台大身分優先）提供免費十個月輔導，歷年 80+ 位業師資料庫、2026 陪跑 40+、35 家企業夥伴、150+ 投資人網絡。',
  alternates: {
    canonical: 'https://tec.ntu.edu.tw/programs',
  },
}

const programs = [
  {
    icon: House, name: '台大車庫', subtitle: 'NTU Garage',
    duration: '10 個月（3月至12月）',
    target: '早期創業團隊（需具台大在校生、校友或教職員身分）',
    features: [
      '領域業師小組諮詢（4-5 隊同領域共學）',
      '免費虛擬進駐，會議室與活動場地使用',
      '3 大 Checkpoint：PSF / BMV / Traction 驗證',
      '銜接台大加速器的優先通道',
    ],
    href: '/garage', primary: false, cta: '立即預約 2027 梯次',
  },
  {
    icon: RocketLaunch, name: '台大加速器', subtitle: 'NTU Accelerator',
    duration: '10 個月（3月至12月）',
    target: '成長期新創（不限台大身分，有台大身分者優先）',
    features: [
      '陪跑業師每月一對一深度輔導',
      'OKR Tracker 追蹤進度，每月 Office Hour 預約制',
      '企業資源對接與 Demo Day 募資路演',
      '150+ 投資人網絡，天使俱樂部媒合',
    ],
    href: '/accelerator', primary: true, cta: '立即預約 2027 梯次',
  },
]

export default function ProgramsPage() {
  return (
    <>
      <PageHero title="新創輔導計畫" subtitle="Programs" description="依據新創團隊的不同階段，提供最適合的輔導資源與成長路徑。" />

      {/* Banner Photo */}
      <div className="relative w-full overflow-hidden" style={{aspectRatio:'21/8'}}>
        <Image
          src="/images/events/opening-2026-biggroup.jpg"
          alt="2026 輔導計畫開幕式 — 逾 60 位學員大合照"
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
      </div>

      <section className="section-spacing">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {programs.map((program) => (
              <div key={program.name} className="flex flex-col rounded-2xl border bg-white p-8 card-hover">
                <program.icon size={36} weight="duotone" className="text-teal" />
                <h3 className="mt-4">{program.name}</h3>
                <p className="text-sm text-slate-muted">{program.subtitle}</p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2"><span className="micro-label">期程</span><span className="text-sm text-charcoal">{program.duration}</span></div>
                  <div className="flex items-center gap-2"><span className="micro-label">對象</span><span className="text-sm text-charcoal">{program.target}</span></div>
                </div>
                <ul className="mt-6 flex-1 space-y-2">
                  {program.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm leading-relaxed text-slate-muted">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal" />{f}
                    </li>
                  ))}
                </ul>
                <Link href={program.href} className={`mt-8 ${program.primary ? 'btn-pill-primary' : 'btn-pill-outline'}`}>{program.cta}</Link>
              </div>
            ))}
          </div>

          <section className="mt-16 rounded-2xl bg-stone p-8">
            <p className="micro-label mb-4 text-center">Methodology</p>
            <h2 className="text-center mb-8">輔導框架</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: ChartBar,
                  title: 'OKR Tracker',
                  description: '所有輔導圍繞關鍵結果與進度狀態展開，每次會議前繳交報告。',
                },
                {
                  icon: Fire,
                  title: '業師診斷會',
                  description: '3 分鐘報告 + 12 分鐘業師追問 + 5 分鐘同儕分享，20 分鐘高強度診斷。',
                },
                {
                  icon: Target,
                  title: '三個關鍵審查節點',
                  description: 'Problem-Solution Fit 問題驗證 → Business Model Validation 商業模式驗證 → Traction 成長牽引，逐關遞進。',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-6">
                  <item.icon size={28} weight="duotone" className="text-teal" />
                  <h4 className="mt-3 mb-2">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 rounded-2xl bg-stone p-8">
            <p className="micro-label mb-4 text-center">Coaching Mechanism</p>
            <h2 className="text-center mb-8">如何輔導你的新創？</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: '輔導經理陪跑',
                  badge: '台大車庫',
                  description: '專任輔導經理全程陪跑，每月定期 check-in，協助 MVP 驗證與用戶訪談，確保里程碑按節奏推進。',
                },
                {
                  icon: Handshake,
                  title: '業師 1-on-1 諮詢',
                  badge: '台大加速器',
                  description: '配對 20+ 位具 Yahoo、TSMC、微軟、BCG 背景業師，依需求安排一對一深度諮詢，精準解決成長瓶頸。',
                },
                {
                  icon: Buildings,
                  title: '企業場域驗證',
                  badge: '企業垂直加速器',
                  description: '媒合大企業提供真實市場驗證場域，企業 PM 共同推動專案，協助新創跨越死亡之谷、加速商模落地。',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-6">
                  <item.icon size={28} weight="duotone" className="text-teal" />
                  <div className="mt-3 mb-1 inline-block rounded-full bg-teal/10 px-2.5 py-0.5 text-xs font-medium text-teal">{item.badge}</div>
                  <h4 className="mb-2">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <div className="text-center mb-8">
              <p className="micro-label mb-4">Application Timeline</p>
              <h2>申請時程</h2>
              <p className="mt-3 text-base text-slate-muted">計畫為期十個月（3月至12月），申請期另計</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { month: '2026 年 12 月 ~ 2027 年 1 月（2027 梯次）', label: '開放申請', desc: '線上提交報名表' },
                { month: '2 月', label: '公布結果', desc: '入選團隊名單公告' },
                { month: '3–12 月', label: '輔導進行', desc: '業師諮詢 + Checkpoint 驗證' },
                { month: '12 月', label: 'Demo Day', desc: '向投資人路演，完成畢業' },
              ].map((step) => (
                <div key={step.month} className="rounded-xl border bg-white p-5 text-center">
                  <p className="text-sm font-bold text-teal">{step.month}</p>
                  <p className="mt-1 font-semibold text-charcoal">{step.label}</p>
                  <p className="mt-1 text-xs text-slate-muted">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-16 rounded-2xl bg-teal-wash p-8 text-center">
            <h3 className="mb-3">不確定適合哪個計畫？</h3>
            <p className="mb-6 text-slate-muted">查看常見問題，或直接與我們聯繫，讓我們協助你找到最適合的成長路徑。</p>
            <Link href="/faq" className="btn-pill-outline">查看常見問題</Link>
            <div className="mt-6 flex justify-center gap-4 flex-wrap text-sm">
              <Link href="/corporate" className="text-teal hover:underline">企業合作方案 →</Link>
              <Link href="/angel" className="text-teal hover:underline">天使投資入會 →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
