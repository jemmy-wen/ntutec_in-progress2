import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: '天使投資俱樂部 | NTUTEC',
  description: '臺大創創中心天使投資俱樂部，匯聚頂尖天使投資人，提供優質案源、獨家活動與共同投資機會。',
}

const stats = [
  { value: '60+', label: '位會員' },
  { value: '24', label: '場活動/年' },
  { value: 'NT$3.2 億', label: '累計投資' },
  { value: '85+', label: '投資案件' },
]

const benefits = [
  { icon: '🎯', title: '優先案源', description: '搶先接觸經過嚴格篩選的優質新創團隊，獲得第一手的投資機會。所有案件皆經過臺大創創中心的 Gate 預審流程。' },
  { icon: '🎪', title: '獨家活動', description: '每月定期舉辦天使例會、產業深度分享會與新創 Pitch Night，與志同道合的投資人交流投資心得與產業洞察。' },
  { icon: '🤝', title: '共同投資', description: '透過俱樂部的共投機制，降低個人投資風險。由經驗豐富的領投人帶領，新手天使也能安心參與。' },
  { icon: '📈', title: '投後管理', description: '專業的投後管理團隊定期追蹤被投企業的營運狀況，提供季度報告與重大事項即時通知。' },
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
              臺大創創中心天使投資俱樂部成立於 2019 年，是臺灣最具學術底蘊的天使投資社群。我們結合臺大的研究能量與產業界的投資經驗，為會員提供經過嚴謹篩選的投資案源、深度的產業研究報告、以及專屬的投資人社群。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-teal-wash py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-teal-deep lg:text-5xl">{stat.value}</p>
                <p className="mt-2 text-lg text-slate-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Member Benefits</p>
            <h2>會員權益</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {benefits.map((benefit) => (
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
