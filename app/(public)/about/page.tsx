import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/public/PageHero'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import { Plant, LinkSimple, RocketLaunch } from '@phosphor-icons/react/dist/ssr'
import { FadeIn } from '@/components/ui/fade-in'
import { CountUp } from '@/components/ui/count-up'

export const metadata: Metadata = {
  title: '關於台大創創中心 | NTUTEC',
  description: '台大創創中心以 HI3 培育模型（輔導培育 × 對接整合 × 加速起飛）系統性支持新創。從 2013 年台大車庫到 35 家企業合作、27 期垂直加速器，深耕台大創業生態系 13 年。',
  alternates: {
    canonical: 'https://tec.ntu.edu.tw/about',
    languages: {
      'zh-TW': 'https://tec.ntu.edu.tw/about',
      'en': 'https://tec.ntu.edu.tw/en/about',
    },
  },
}

const hi3Model = [
  {
    key: 'Incubation',
    label: '輔導培育',
    en: 'Incubation',
    Icon: Plant,
    description: '透過輔導經理陪跑、業師一對一諮詢、專業課程（商業模式、募資、法務），陪伴早期創業團隊從構想走到原型驗證。',
  },
  {
    key: 'Integration',
    label: '對接整合',
    en: 'Integration',
    Icon: LinkSimple,
    description: '銜接台大各院系資源、企業垂直加速器、EiMBA 創業學程，連結政府計畫（FITI、TTA）與國際夥伴，讓新創快速接軌真實場域。',
  },
  {
    key: 'Ignition',
    label: '加速起飛',
    en: 'Ignition',
    Icon: RocketLaunch,
    description: '舉辦 Demo Day（74 位投資人到場，2025）、閉門投資媒合、天使投資俱樂部，為準備好的團隊引燃第一桶資本，走向市場起飛。',
  },
]

const alumniHighlights = [
  {
    name: '配客嘉 PackAge+',
    tag: '循環包裝 × ESG',
    result: 'A 輪逾 NT$1 億（2025）',
    detail: '獲國發基金 + 策略投資人入股，將循環包裝帶入台灣主流電商供應鏈。',
  },
  {
    name: '艾斯創生醫 Aistrom',
    tag: '醫療器材 × 國際',
    result: '募資 USD 250 萬（2024）',
    detail: 'SelectUSA MedTech 冠軍，NBA 球隊指定名醫等國際骨科權威投資。',
  },
  {
    name: 'Botbonnie',
    tag: '聊天機器人 × AI',
    result: '被 Appier 收購（2023）',
    detail: '台大創創校友團隊，成功被日本上市 AI 公司 Appier 收購，實現完整 Exit。',
  },
]

const milestones = [
  { year: '2013', title: '台大車庫（NTU Garage）啟動', description: '於台大水源校區設立 NTU Garage，作為學生創業共享空間，開啟台大創業生態系的基礎建設。' },
  { year: '2014', title: '台大創創中心正式成立', description: '由臺灣大學以校級單位正式設立創創中心，整合校內創業資源，推動校園創新創業生態系。' },
  { year: '2016', title: 'NTU Challenge 校內創業競賽', description: '與創新設計學院合作舉辦 NTU Challenge，結合教育、業師輔導與競賽，發掘校園創業潛力。' },
  { year: '2017', title: '台大加速器（NTU Accelerator）啟動', description: '推出台大加速器，為已有原型的新創團隊提供市場驗證、商業模式迭代與募資對接資源。' },
  { year: '2019', title: '企業垂直加速器首創', description: '首創企業垂直加速器，由企業出題、新創解題，累計與鴻海、Nvidia、Synopsys 等 35 家企業深度合作。' },
  { year: '2020', title: '企業創新諮詢服務', description: '推出企業開放式創新諮詢服務（Consulting），協助中大型企業導入新創思維與敏捷創新方法論。' },
  { year: '2022', title: 'Co-Creation Sandbox', description: '推出 Co-Creation Sandbox 會員制度，為新創提供安全的產品與市場驗證場域。' },
  { year: '2026', title: '四大聚焦領域與三校聯盟', description: '聚焦 AI 軟體、生技醫療、硬科技與創新商模四大領域，攜手臺師大、台科大深化三校聯盟創業生態系。' },
]

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '關於台大創創中心', url: 'https://tec.ntu.edu.tw/about' },
      ]} />
      <PageHero title="關於台大創創中心" subtitle="About NTUTEC" description="13 年 · 600+ 新創 · 35 家企業夥伴 · 150+ 投資人網絡（含 40+ 天使會員）——台大創業生態系的完整版圖。" />

      <section className="section-spacing bg-warm-stone">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="micro-label mb-4">Our Mission</p>
              <h2 className="mb-6">使命與願景</h2>
              <p className="mb-4 text-lg leading-relaxed text-slate-muted">台大創創中心是台大創業生態系的實戰基地，以「連結台大、連結產業、連結資本」三個連結為核心，將台大最好的技術能量與人才，轉化為可投資的新創公司。</p>
              <p className="mb-4 text-lg leading-relaxed text-slate-muted"><strong className="text-charcoal">13 年</strong>來，我們累計輔導逾 <strong className="text-charcoal">600+</strong> 支新創團隊。透過台大加速器、台大車庫、企業垂直加速器（<strong className="text-charcoal">27 期</strong>、<strong className="text-charcoal">35 家企業</strong>）與天使投資俱樂部（<strong className="text-charcoal">150+</strong> 投資人網絡），我們支持新創從技術驗證走入市場。</p>
              <p className="text-lg leading-relaxed text-slate-muted">我們的願景是成為臺灣創業生態圈受新創信賴的校園創業加速器，以 HI3 模型（輔導培育 → 對接整合 → 加速起飛）系統性支持新創，深耕台灣 13 年的大學創業基地。</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { end: 600, suffix: '+', label: '輔導新創團隊', sub: '2013 年至今' },
                { end: 13, suffix: '', label: '年深耕', sub: 'Since 2013' },
                { end: 35, suffix: '+', label: '企業夥伴', sub: '垂直加速器合作' },
                { end: 150, suffix: '+', label: '投資人網絡', sub: '含 40+ 天使會員' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-teal-wash p-6 text-center card-elevated">
                  <div className="text-3xl font-bold text-teal-deep">
                    <CountUp end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-sm font-semibold text-charcoal">{stat.label}</div>
                  <div className="mt-0.5 text-xs text-slate-muted">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NTU Affiliation Badge */}
      <div className="bg-stone border-b border-stone-warm/60">
        <div className="container py-4 flex items-center gap-3">
          <Image src="/images/partners/ntu.svg" alt="國立臺灣大學校徽" width={32} height={32} className="h-8 w-auto" />
          <p className="text-sm text-slate-muted">國立臺灣大學創意創業中心 — 校級單位，隸屬研究發展處</p>
        </div>
      </div>

      {/* HI3 Model Section */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Our Approach</p>
            <h2 className="mb-4">HI3 培育模型</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-muted">
              以人為本（Human-centric），透過三階段系統性支持，陪伴新創從構想走向市場起飛。
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {hi3Model.map((item) => (
              <div key={item.key} className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
                <div className="mb-4 text-teal"><item.Icon size={40} weight="duotone" /></div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-teal">{item.en}</div>
                <h3 className="mb-3 text-xl font-bold text-charcoal">{item.label}</h3>
                <p className="text-slate-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Success Highlights */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Alumni Impact</p>
            <h2 className="mb-4">校友成功案例</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-muted">
              從台大車庫與加速器起步，這些團隊已完成募資、收購或國際市場驗證。
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {alumniHighlights.map((alumni) => (
              <div key={alumni.name} className="rounded-2xl bg-teal-wash p-8">
                <div className="mb-3 inline-block rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">{alumni.tag}</div>
                <h4 className="mb-2 text-lg font-bold text-charcoal">{alumni.name}</h4>
                <div className="mb-3 text-2xl font-bold text-teal-deep">{alumni.result}</div>
                <p className="text-sm text-slate-muted leading-relaxed">{alumni.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-stone">
        <div className="container">
          <FadeIn>
            <div className="mb-12 text-center">
              <p className="micro-label mb-4">History</p>
              <h2>發展歷程</h2>
            </div>
          </FadeIn>
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

      {/* Activity Photo Grid */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="micro-label mb-4">2026 開幕式現場</p>
            <h2 className="mb-4">2026 輔導計畫開幕式</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-muted">
              2026 年 3 月，第一批輔導團隊在台大水源校區正式啟動——這是他們的起點。
            </p>
          </div>
          {/* Row 1: 大合照（寬）+ Vincent */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] lg:col-span-2">
              <Image
                src="/images/events/opening-2026-group.jpg"
                alt="2026 輔導計畫開幕式 — 逾 60 位學員大合照"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/opening-2026-vincent.jpg"
                alt="台大創創中心主任 林文欽致詞"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>
          {/* Row 2: 3 activity shots */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/opening-2026-audience.jpg"
                alt="2026 輔導計畫開幕式 — 全場聆聽"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/opening-2026-01.jpg"
                alt="2026 輔導計畫開幕式 — 小組討論"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] sm:col-span-2 lg:col-span-1">
              <Image
                src="/images/events/opening-2026-03.jpg"
                alt="2026 輔導計畫開幕式 — 業師分享"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-stone text-center">
        <div className="container">
          <h2 className="mb-6">立即探索計畫</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/apply" className="btn-pill-primary">啟動創業之旅</Link>
            <Link href="/corporate" className="btn-pill-outline">企業夥伴合作</Link>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container text-center">
          <FadeIn>
            <p className="micro-label mb-4">Our People</p>
            <h2 className="mb-6">認識我們的團隊</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">投資經理、輔導經理——每位成員都是新創的第一線戰友，不只給建議，更一起把關鍵路上每個節點走完。</p>
            <Link href="/team" className="btn-pill-primary">查看完整團隊</Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
