import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Send } from "lucide-react";
import PageHero from "@/components/public/PageHero";
import FeaturedAlumni, { type AlumniStory } from "@/components/public/FeaturedAlumni";

const acceleratorAlumni: AlumniStory[] = [
  {
    name: "配客嘉 PackAge+",
    category: "Pre-A 輪",
    highlight: "完成 A 輪募資逾新台幣 1 億元，是 2025 年最大單筆校友募資案例。",
    sector: "循環包裝 · ESG",
    icon: "funding",
  },
  {
    name: "AHEAD Medicine 先勁智能",
    category: "2025 Q4 投資案",
    highlight: "台大醫學院校友 Andrea Wang 創辦的 AI 醫療輔助診斷平台，獲台大天使俱樂部投資。",
    sector: "生技醫療 · AI",
    icon: "funding",
  },
  {
    name: "MoBagel 行動貝果",
    category: "2026 Q1 投資案",
    highlight: "台大車庫與加速器校友鍾哲民創辦的 AI/數據分析平台，近期完成台大天使俱樂部投資。",
    sector: "AI · 數據分析",
    icon: "funding",
  },
];

export const metadata: Metadata = {
  title: "台大加速器 | NTUTEC",
  description:
    "台大創創中心台大加速器為期十個月，提供成長期新創深度業師輔導、企業資源對接與募資機會。",
};

const phases = [
  {
    phase: "Phase 1",
    title: "診斷與定位",
    duration: "第 1-2 個月",
    description:
      "深入了解團隊現況，設定成長目標與里程碑，配對最合適的業師。",
  },
  {
    phase: "Phase 2",
    title: "驗證與迭代",
    duration: "第 3-5 個月",
    description:
      "聚焦產品市場契合度驗證，透過客戶訪談與數據分析持續優化商業模式。",
  },
  {
    phase: "Phase 3",
    title: "規模化準備",
    duration: "第 6-8 個月",
    description:
      "建立可規模化的營運架構，深化企業合作關係，準備募資相關材料。",
  },
  {
    phase: "Phase 4",
    title: "Demo Day & 畢業",
    duration: "第 9-10 個月",
    description:
      "向天使投資人與策略夥伴進行路演，完成計畫畢業並取得後續支持資源。",
  },
];

const benefits = [
  {
    icon: "👥",
    title: "業師網絡",
    description:
      "40+ 位平均 20 年經驗的業師，涵蓋創投、半導體、AI、生技等領域，提供一對一深度輔導。",
  },
  {
    icon: "🏢",
    title: "企業資源",
    description:
      "35 家合作企業（含 Nvidia、Synopsys、鴻海等），提供技術驗證場域與潛在客戶資源。",
  },
  {
    icon: "💰",
    title: "募資對接",
    description:
      "天使投資俱樂部與 150+ 投資人網絡，涵蓋種子輪到 Pre-A 輪的募資機會。",
  },
  {
    icon: "🏠",
    title: "共創空間",
    description:
      "位於台大水源校區卓越研究大樓的專屬辦公空間，享有會議室與活動場地使用權。",
  },
];

export default function AcceleratorPage() {
  return (
    <>
      <PageHero
        title="台大加速器"
        subtitle="NTU Accelerator"
        description="為期十個月的深度輔導計畫，幫助成長期新創加速邁向下一個里程碑。無台大身分亦可申請，有台大身分者優先。我們重視技術創新與市場潛力，不限台大背景。"
      />

      {/* Program Overview */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="micro-label mb-4">Overview</p>
            <h2 className="mb-6">計畫概覽</h2>
            <p className="text-lg leading-relaxed text-slate-muted">
              台大加速器自 2017 年啟動，專為已完成原型、進入市場驗證階段的成長期新創設計。計畫為期十個月，由 40+ 位業師提供一對一深度輔導，串接企業合作資源、天使投資俱樂部與創投網絡。2026 梯次進行中（3 月 ~ 12 月），現有團隊輔導中。
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Timeline</p>
            <h2>計畫時程</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {phases.map((p) => (
              <div
                key={p.phase}
                className="rounded-xl border bg-white p-6 card-hover"
              >
                <span className="micro-label">{p.phase}</span>
                <h4 className="mt-2 mb-1">{p.title}</h4>
                <p className="mb-3 text-xs font-semibold text-teal">
                  {p.duration}
                </p>
                <p className="text-sm leading-relaxed text-slate-muted">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Benefits</p>
            <h2>我們提供的資源</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <span className="text-4xl">{b.icon}</span>
                <h4 className="mt-4 mb-2 text-lg">{b.title}</h4>
                <p className="text-sm leading-relaxed text-slate-muted">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Criteria */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="micro-label mb-4">Criteria</p>
            <h2 className="mb-6">申請條件</h2>
            <ul className="space-y-3">
              {[
                "不限台大身分；有台大在校生、校友或教職員背景者優先錄取",
                "已完成 MVP 或原型開發，具有初期用戶或營收",
                "團隊至少 2 人，全職投入創業",
                "具有明確的市場機會與成長潛力",
                "願意接受十個月的系統化輔導",
                "產業不限，但需具備技術或模式創新",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-slate-muted"
                >
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-teal" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Alumni */}
      <FeaturedAlumni stories={acceleratorAlumni} title="台大加速器校友成就" />

      {/* Batch Timeline */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <p className="micro-label mb-2">Batch Schedule</p>
              <h2>梯次時程</h2>
              <p className="mt-3 text-base text-slate-muted">
                加速器每年僅開放一次，採用年度梯次制。現行梯次進行中，2027 梯次預計 2026 年 12 月開放申請。
              </p>
            </div>

            <div className="rounded-2xl border border-stone-warm/60 bg-stone p-8">
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-wash text-teal-deep">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">
                      2026 年度梯次（進行中）
                    </p>
                    <p className="text-sm text-slate-muted">
                      2026 年 3 月 ~ 2026 年 12 月 · 現有團隊輔導中，不開放插班
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-wash text-teal-deep">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">
                      2027 年度梯次申請期
                    </p>
                    <p className="text-sm text-slate-muted">
                      2026 年 12 月 ~ 2027 年 1 月 · 正式開放線上申請
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-wash text-teal-deep">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">
                      2027 年度梯次公布結果
                    </p>
                    <p className="text-sm text-slate-muted">
                      2027 年 2 月 · 入選團隊名單公告
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">
                      2027 年度梯次正式開始
                    </p>
                    <p className="text-sm text-slate-muted">
                      2027 年 3 月 ~ 2027 年 12 月 · 為期十個月
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-stone">
        <div className="container text-center">
          <h2 className="mb-4">有興趣加入 2027 梯次？</h2>
          <p className="mx-auto mb-6 max-w-xl text-lg text-slate-muted">
            提前登記你的團隊，12 月正式申請開放時，我們將第一時間通知你。登記不等同申請，正式申請仍需依流程提交。
          </p>
          <Link
            href="/apply"
            className="btn-pill-primary inline-flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            預約 2027 梯次通知
          </Link>
          <p className="mt-6 text-sm text-slate-muted">
            申請期尚未開放？{' '}
            <Link href="/contact" className="text-teal-deep underline underline-offset-4 hover:text-teal">
              預約諮詢，了解你的團隊是否適合 →
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-slate-muted">
            <Link href="/tec-deals" className="hover:text-teal underline underline-offset-4">進駐資源方案 →</Link>
            <Link href="/startups" className="hover:text-teal underline underline-offset-4">2026 現役新創團隊 →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
