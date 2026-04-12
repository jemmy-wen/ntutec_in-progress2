import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import Image from "next/image";

export const metadata: Metadata = {
  title: "企業合作方案 | NTUTEC",
  description:
    "台大創創中心企業合作方案：加速器共創、創新競賽、聯合活動與顧問諮詢，助企業對接前沿新創技術。",
  alternates: {
    canonical: "https://tec.ntu.edu.tw/corporate",
  },
};

const valueProps = [
  {
    title: "前沿技術對接",
    description:
      "直接接觸台大校內最新研究成果與新創團隊，搶先佈局未來技術趨勢，加速企業創新轉型。",
  },
  {
    title: "第一手人才管道",
    description:
      "深度合作期間直接接觸台大新創人才——有實力的直接留才，少了仲介、省了搜尋成本。歷屆合作企業已從車庫、加速器延攬多位技術共同創辦人。",
  },
  {
    title: "Demo Day 與論壇曝光",
    description:
      "共同舉辦 Demo Day（74 位投資人到場）、產業論壇，在台大指標性的新創場合與新創圈、投資圈同台——不只品牌，更是真實的合作信號。",
  },
];

const collaborationModels = [
  {
    icon: "🚀",
    title: "企業加速器共創",
    description:
      "由企業出題、新創解題，透過十個月深度輔導計畫（每年 3–12 月），共同開發創新解決方案。",
  },
  {
    icon: "🏆",
    title: "創新競賽合辦",
    description:
      "與企業共同舉辦主題式創新競賽，發掘潛力新創並建立合作關係。",
  },
  {
    icon: "🎤",
    title: "聯合活動",
    description:
      "共同舉辦產業論壇、Demo Day、交流活動，促進企業與新創的深度互動。",
  },
  {
    icon: "💡",
    title: "創新顧問諮詢",
    description:
      "嫁接 NTUTEC 13 年加速器 know-how，協助企業內部團隊診斷創新卡點、設計驗證機制，縮短從構想到市場測試的週期。",
  },
];

export default function CorporatePage() {
  return (
    <>
      <PageHero
        title="企業合作方案"
        subtitle="Corporate Innovation"
        description="與台大創創中心攜手，共同推動企業創新轉型，對接最前沿的技術與人才。"
      />

      {/* Why partner with TEC */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Why Partner With Us</p>
            <h2>為什麼選擇台大創創中心</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-muted">
              全台唯一直接對接國立臺灣大學頂尖研究技術與人才的企業創新加速平台
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {valueProps.map((prop) => (
              <div key={prop.title} className="card-hover rounded-2xl bg-white p-8">
                <h3 className="mb-4 text-xl font-semibold">{prop.title}</h3>
                <p className="text-slate-muted leading-relaxed">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Models */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Collaboration Models</p>
            <h2>合作模式</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {collaborationModels.map((model) => (
              <div
                key={model.title}
                className="card-hover flex gap-6 rounded-2xl bg-white p-8"
              >
                <span className="text-4xl">{model.icon}</span>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">{model.title}</h3>
                  <p className="text-slate-muted leading-relaxed">
                    {model.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Photos */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-8 text-center">
            <p className="micro-label mb-4">場景實錄</p>
            <h2 className="mb-3">企業合作現場</h2>
            <p className="text-slate-muted">新創交流、成果展示、跨界媒合——每場活動都是深度合作的起點。</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/opening-2026-networking.jpg"
                alt="2026 開幕式 — 交流現場"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/opening-2026-pitching.jpg"
                alt="2026 開幕式 — 新創展示成果"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section A: 旗艦案例深挖 */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">FEATURED CASES</p>
            <h2>企業合作成功案例</h2>
          </div>
          <div className="mb-6 text-center">
            <p className="text-sm text-slate-muted">
              累計 27 期、35 家企業夥伴的深度共創實績，涵蓋科技、媒體、金融等多元產業。
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Card 1: 宏碁 × 律果科技 */}
            <div className="rounded-2xl border border-stone-warm p-6">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
                  企業垂直加速器
                </span>
                <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal-deep">
                  外部創新顧問
                </span>
              </div>
              <h3 className="mb-1 text-xl font-bold text-charcoal">
                宏碁 Acer Foundation × 律果科技 LegalSign.ai
              </h3>
              <p className="mb-4 text-sm font-medium text-teal-deep">
                企業贊助加速器 × AI 法務科技新創，共創法律合約智慧化
              </p>
              <ul className="mb-5 space-y-2 text-sm leading-relaxed text-slate-muted">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  獲《哈佛商業評論》HBR 專文報導
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  榮獲經濟部「白科技獎」潛力新創
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  宏碁作為企業業師協助市場驗證，加速商業落地
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {["#LegalTech", "#AI", "#HBR報導", "#宏碁"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-stone px-2.5 py-1 text-xs text-slate-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2: 聯經 × SAT */}
            <div className="rounded-2xl border border-stone-warm p-6">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
                  企業垂直加速器
                </span>
                <span className="rounded-full bg-stone px-3 py-1 text-xs font-semibold text-charcoal">
                  永續主題
                </span>
              </div>
              <h3 className="mb-1 text-xl font-bold text-charcoal">
                聯經出版 Linking Publishing × SAT. Knowledge 知識衛星
              </h3>
              <p className="mb-4 text-sm font-medium text-teal-deep">
                出版業老字號 × 線上課程新創，共創藝文教育市場新藍海
              </p>
              <ul className="mb-5 space-y-2 text-sm leading-relaxed text-slate-muted">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  企業新創互補共生典範案例，達成 NT$1,000 萬營收
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  年度企業外部創新旗艦合作，獲企業高度評價
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  協助聯經拓展數位知識服務版圖，開啟數位轉型新篇章
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {["#知識科技", "#永續發展", "#外部創新"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-stone px-2.5 py-1 text-xs text-slate-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section B: 外部創新顧問四大機制 */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">How We Help</p>
            <h2>我們如何協助企業創新？</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-muted">
              台大創創中心以外部創新顧問角色，全程陪跑企業與新創的合作歷程
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                icon: "🎯",
                title: "對接決策者",
                description: "直接連結企業高階決策層，確保合作案獲得內部支持",
              },
              {
                icon: "🏭",
                title: "產業實務傳授",
                description: "企業提供第一線產業知識，助新創快速理解市場脈絡",
              },
              {
                icon: "🤝",
                title: "企業 PM 共創",
                description: "企業 PM 與新創定期工作會議，共同推動合作案進展",
              },
              {
                icon: "📊",
                title: "每月進展追蹤",
                description: "台大創創擔任陪跑角色，每月追蹤合作狀況確保成果",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 text-center"
              >
                <span className="mb-4 block text-4xl">{item.icon}</span>
                <h3 className="mb-2 text-base font-semibold text-charcoal">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Success Story</p>
            <h2>真實案例：1,000 萬營收共創</h2>
          </div>
          <div className="mx-auto max-w-3xl rounded-2xl border border-stone-warm bg-stone p-8 md:p-10">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
                企業垂直加速器
              </span>
              <span className="text-sm text-slate-muted">2022 梯次</span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-charcoal">
              聯經出版 × SAT. 知識衛星
            </h3>
            <p className="mb-6 text-sm font-medium text-teal-deep">
              出版業老字號 × 線上課程新創，共創藝文教育市場新藍海
            </p>
            <p className="mb-4 leading-relaxed text-slate-muted">
              創立近半世紀的聯經出版，長期深耕人文藝術優質內容，卻苦於找不到數位延伸的突破口。透過台大創創中心企業垂直加速器，聯經與線上課程平台 SAT. 知識衛星在六個月輔導期間深度共創，共同發現藝文線上課程的未開發市場。
            </p>
            <p className="mb-6 leading-relaxed text-slate-muted">
              雙方聯手推出「故事 × 聆賞 × 生活｜焦元溥的 37 堂古典音樂課」，上線約一年內達成 <strong className="text-charcoal">NT$1,000 萬營收</strong>，驗證了藝文教育市場的強勁需求，也開啟了聯經數位轉型的新篇章。
            </p>
            <blockquote className="border-l-4 border-teal pl-4 italic text-charcoal/80">
              「外部創新能加速異業合作，對本業的優劣勢帶來全新眼光，幫助我們找到可驗證的新商機。」
              <footer className="mt-2 text-sm not-italic text-slate-muted">
                — 聯經出版總經理 陳芝宇
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="section-spacing">
        <div className="container text-center">
          <p className="micro-label mb-4">Impact</p>
          <h2 className="mb-12">合作成果</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { number: "35", label: "累計合作企業", suffix: " 家" },
              { number: "27", label: "企業垂直加速器", suffix: " 期" },
              { number: "逾 600", label: "輔導新創團隊", suffix: " 支" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-teal">{stat.number}{stat.suffix}</p>
                <p className="mt-2 text-slate-muted">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-muted">
            合作對象含 Nvidia、Synopsys、鴻海、台積電、玉山銀行、友達光電等國內外知名企業
          </p>
          <p className="mt-3 text-xs text-slate-muted/70">
            歷年逾 35 家合作企業，累計啟動 27 期企業垂直加速器（來源：2025年成果報告）
          </p>
        </div>
      </section>

      {/* Angel investor cross-link */}
      <div className="container pb-4">
        <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600 mb-3">尋找策略性投資機會？</p>
          <Link href="/angel" className="btn-pill-outline">了解天使俱樂部</Link>
        </div>
      </div>

      {/* CTA */}
      <section className="section-spacing bg-teal-wash">
        <div className="container text-center">
          <h2 className="mb-6">準備開啟合作了嗎？</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">
            無論您是想探索新技術、尋找創新解決方案，或是建立人才管道，我們都能為您量身打造合作方案。
          </p>
          <Link href="/consulting" className="btn-pill-outline mr-4">
            預約企業創新診斷
          </Link>
          <Link href="/contact" className="btn-pill-primary">
            聯繫我們
          </Link>
        </div>
      </section>
    </>
  );
}
