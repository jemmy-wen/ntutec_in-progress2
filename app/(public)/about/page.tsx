import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: '關於臺大創創中心 | NTUTEC',
  description: '了解臺大創創中心的使命、願景與發展歷程。我們致力於連結學術與產業，培育下一代創業家與創新企業。',
}

const milestones = [
  { year: '2014', title: '臺大創創中心成立', description: '由臺灣大學正式設立，以推動校園創新創業生態系為核心使命，提供新創團隊輔導與資源媒合。' },
  { year: '2016', title: '加速器計畫啟動', description: '推出首屆加速器計畫，為成長期新創提供十個月的深度輔導，串接業師網絡與企業資源。' },
  { year: '2019', title: '天使投資俱樂部成立', description: '成立天使投資俱樂部，匯聚校友與產業界天使投資人，為優質新創提供早期資金與策略支持。' },
  { year: '2022', title: '企業創新合作深化', description: '擴大與企業的創新合作模式，透過企業出題、新創解題的方式，促進產學共創與技術商業化。' },
  { year: '2025', title: '新階段啟動', description: '持續深化國際連結與跨域合作，打造更完整的創新創業生態系，培育具全球競爭力的新創企業。' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero title="關於臺大創創中心" subtitle="About NTUTEC" description="連結學術與產業，培育下一代創業家與創新企業。" />

      <section className="section-spacing">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="micro-label mb-4">Our Mission</p>
              <h2 className="mb-6">使命與願景</h2>
              <p className="mb-4 text-lg leading-relaxed text-slate-muted">臺大創創中心以「連結學術卓越與產業創新」為使命，致力於打造一個開放、跨域的創新創業生態系。</p>
              <p className="mb-4 text-lg leading-relaxed text-slate-muted">我們相信，最好的創新來自於學術研究與市場需求的深度對話。透過系統化的輔導機制、豐富的業師網絡，以及與企業的緊密合作，我們幫助新創團隊從概念走向市場。</p>
              <p className="text-lg leading-relaxed text-slate-muted">我們的願景是成為亞太地區最具影響力的大學創新樞紐，培育出改變世界的創業家與企業。</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="aspect-[4/3] w-full rounded-2xl bg-teal-wash flex items-center justify-center">
                <span className="text-slate-muted text-sm">Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">History</p>
            <h2>發展歷程</h2>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-teal/20 md:left-1/2 md:-translate-x-px" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative flex gap-6 md:gap-0">
                  <div className="absolute left-6 -translate-x-1/2 mt-1.5 h-3 w-3 rounded-full bg-teal ring-4 ring-white md:left-1/2" />
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                    <span className="micro-label">{m.year}</span>
                    <h4 className="mt-1 mb-2">{m.title}</h4>
                    <p className="text-slate-muted leading-relaxed">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container text-center">
          <p className="micro-label mb-4">Our People</p>
          <h2 className="mb-6">認識我們的團隊</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">臺大創創中心擁有一支充滿熱忱的執行團隊，結合產業經驗與學術視野，全力支持每一個新創團隊的成長。</p>
          <Link href="/team" className="btn-pill-primary">查看完整團隊</Link>
        </div>
      </section>
    </>
  )
}
