import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: '關於臺大創創中心 | NTUTEC',
  description: '臺大創創中心是台大創業生態系的實戰基地，13 年來累計輔導近 600 支新創團隊。以「連結台大、連結產業、連結資本」為核心，對標 Stanford StartX 與 Berkeley SkyDeck。',
}

const milestones = [
  { year: '2013', title: 'NTU Garage 車庫孵化器啟動', description: '於臺大水源校區設立 NTU Garage，作為學生創業共享空間，開啟台大創業生態系的基礎建設。' },
  { year: '2014', title: '臺大創創中心正式成立', description: '由臺灣大學以校級單位正式設立創創中心，整合校內創業資源，推動校園創新創業生態系。' },
  { year: '2016', title: 'NTU Challenge 校內創業競賽', description: '與創新設計學院合作舉辦 NTU Challenge，結合教育、業師輔導與競賽，發掘校園創業潛力。' },
  { year: '2017', title: 'NTU Accelerator 加速器啟動', description: '推出加速器計畫，為已有原型的新創團隊提供市場驗證、商業模式迭代與募資對接資源。' },
  { year: '2019', title: '企業垂直加速器首創', description: '首創企業垂直加速器，由企業出題、新創解題，累計與鴻海、Nvidia、Synopsys 等 35 家企業深度合作。' },
  { year: '2020', title: '企業創新諮詢服務', description: '推出企業開放式創新諮詢服務（Consulting），協助中大型企業導入新創思維與敏捷創新方法論。' },
  { year: '2022', title: 'Co-Creation Sandbox', description: '推出 Co-Creation Sandbox 會員制度，為新創提供安全的產品與市場驗證場域。' },
  { year: '2026', title: '四大聚焦領域與三校聯盟', description: '聚焦 AI 軟體、生技醫療、硬科技與創新商模四大領域，攜手臺師大、台科大深化三校聯盟創業生態系。' },
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
              <p className="mb-4 text-lg leading-relaxed text-slate-muted">臺大創創中心是台大創業生態系的實戰基地，以「連結台大、連結產業、連結資本」三個連結為核心，致力於把台大最好的技術能量與人才，轉化成可投資的新創公司。</p>
              <p className="mb-4 text-lg leading-relaxed text-slate-muted">13 年來，我們累計輔導近 600 支新創團隊，涵蓋 120+ 臺大學生團隊、30+ 教授團隊與 200+ 校友團隊。透過加速器、車庫孵化器、企業垂直加速器與天使投資俱樂部四大運營業務，我們支持新創從技術驗證走入市場。</p>
              <p className="text-lg leading-relaxed text-slate-muted">我們的願景是成為發掘與培育出更多未來能上市或成功出場的創業家，對標 Stanford StartX 與 Berkeley SkyDeck 等大學創業生態系，打造臺灣最具影響力的校園創業加速器。</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '600+', label: '輔導新創團隊', sub: '2013 年至今' },
                { value: '13', label: '年深耕', sub: 'Since 2013' },
                { value: '35+', label: '企業夥伴', sub: '垂直加速器合作' },
                { value: '120+', label: '臺大學生團隊', sub: '含教授、校友' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-teal-wash p-6 text-center">
                  <div className="text-3xl font-bold text-teal-deep">{stat.value}</div>
                  <div className="mt-1 text-sm font-semibold text-charcoal">{stat.label}</div>
                  <div className="mt-0.5 text-xs text-slate-muted">{stat.sub}</div>
                </div>
              ))}
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
