import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: '天使投資俱樂部 | NTUTEC',
  description: '臺大創創中心天使投資俱樂部，匯聚頂尖天使投資人，提供優質案源、獨家活動與共同投資機會。',
}

const highlights = [
  { icon: '🎯', title: '嚴選優質案源', description: '所有案件皆經過臺大創創中心 Gate 0/1/2 三段預審流程，由投資經理親自盡調。會員搶先接觸臺大校友與輔導團隊的優質早期新創。' },
  { icon: '🎪', title: '每月天使例會', description: '每月定期舉辦天使例會，由新創團隊進行 Pitch 與 Q&A，結合產業分享會與會員交流，打造高品質的投資人社群。' },
  { icon: '🤝', title: '彈性共投機制', description: '會員以個人資金直接投資，不受機構共投限制。結合例會後的實地參訪，會員可自主決策投資規模與時機。' },
  { icon: '📈', title: '生態系支持', description: '連結臺大創創中心 13 年累積的業師網絡、校友資源與企業合作夥伴，協助被投企業加速成長。' },
]

export default function AngelPage() {
  return (
    <>
      <PageHero title="天使投資俱樂部" subtitle="Angel Investment Club" description="匯聚臺大校友與產業界天使投資人，共同發掘並支持最具潛力的早期新創企業。" />

      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="micro-label mb-4">Why Join</p>
            <h2 className="mb-6">為什麼加入天使俱樂部</h2>
            <p className="text-lg leading-relaxed text-slate-muted">
              臺大創創中心天使投資俱樂部成立於 2023 年，是以臺大創業生態系為核心的天使投資社群。我們結合 13 年累積的新創輔導經驗、Gate 預審系統與業師網絡，為會員提供經過嚴謹篩選的投資案源、深度的產業洞察，以及專屬的投資人交流場域。
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-muted">
              近期投資活躍度與會員留存率持續創新高，涵蓋 AI 軟體、生技醫療、硬科技與創新商模四大聚焦領域。
            </p>
          </div>
        </div>
      </section>

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

      <section className="section-spacing bg-teal-wash">
        <div className="container text-center">
          <h2 className="mb-6">成為天使投資俱樂部的一員</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">與臺灣最優秀的早期投資人一起，發掘改變未來的新創企業。</p>
          <Link href="/angel-apply" className="btn-pill-primary">立即申請加入</Link>
        </div>
      </section>
    </>
  )
}
