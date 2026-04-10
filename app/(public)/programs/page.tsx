import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: '新創輔導計畫 | NTUTEC',
  description: '臺大創創中心提供加速器與車庫孵化器兩大計畫，針對不同階段新創團隊量身打造輔導方案。',
}

const programs = [
  {
    icon: '🚀', name: '加速器計畫', subtitle: 'Accelerator Program',
    duration: '10 個月', target: '成長期新創（已有 MVP 或初期營收）',
    features: ['一對一業師深度輔導，每月定期會議', '企業資源對接與合作機會媒合', '天使投資人 Demo Day 募資對接', '國際加速器網絡與海外市場拓展'],
    href: '/accelerator', primary: true,
  },
  {
    icon: '🏠', name: '車庫孵化器', subtitle: 'Garage Incubator',
    duration: '彈性制（6-12 個月）', target: '早期團隊（概念驗證至 MVP 階段）',
    features: ['免費共創空間與基礎設施', '創業社群交流與同儕學習', '技術開發與商業模式工作坊', '畢業後銜接加速器計畫的優先通道'],
    href: '/garage', primary: false,
  },
]

export default function ProgramsPage() {
  return (
    <>
      <PageHero title="新創輔導計畫" subtitle="Programs" description="依據新創團隊的不同階段，提供最適合的輔導資源與成長路徑。" />

      <section className="section-spacing">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {programs.map((program) => (
              <div key={program.name} className="flex flex-col rounded-2xl border bg-white p-8 card-hover">
                <span className="text-4xl">{program.icon}</span>
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
                <Link href={program.href} className={`mt-8 ${program.primary ? 'btn-pill-primary' : 'btn-pill-outline'}`}>了解更多</Link>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-teal-wash p-8 text-center">
            <h3 className="mb-3">不確定適合哪個計畫？</h3>
            <p className="mb-6 text-slate-muted">查看常見問題，或直接與我們聯繫，讓我們協助你找到最適合的成長路徑。</p>
            <Link href="/faq" className="btn-pill-outline">查看常見問題</Link>
          </div>
        </div>
      </section>
    </>
  )
}
