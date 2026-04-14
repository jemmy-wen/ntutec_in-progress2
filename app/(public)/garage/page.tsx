import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Send } from "lucide-react";
import FeaturedAlumni, { type AlumniStory } from "@/components/public/FeaturedAlumni";
import { FadeIn } from "@/components/ui/fade-in";
import { Buildings, Handshake, UsersThree, LinkSimple, GraduationCap } from "@phosphor-icons/react/dist/ssr";

const garageAlumni: AlumniStory[] = [
  {
    name: "MoBagel 行動貝果",
    category: "大額募資",
    highlight: "累計募資 US$21M+，服務 3,000+ 品牌（含 Fortune 500），2026 Q1 獲天使俱樂部投資。",
    sector: "AutoML / 企業 AI 數據平台",
    icon: "funding",
    sources: [
      { label: "INSIDE A+ 輪報導", url: "https://www.inside.com.tw/article/27055-mobagel" },
      { label: "工商時報 AI 專訪", url: "https://ctee.com.tw/industrynews/technology/317716.html" },
    ],
  },
  {
    name: "方格子 vocus",
    category: "規模化成長",
    highlight: "月均 200 萬不重複造訪、會員 72 萬、創作者 2 萬+。",
    sector: "華文內容訂閱平台",
    icon: "award",
    sources: [
      { label: "數位時代報導", url: "https://www.bnext.com.tw/article/63252/vocus-2021" },
    ],
  },
  {
    name: "3drens 三維人",
    category: "Pre-A 輪募資",
    highlight: "募得近 NT$1 億（台杉、活水、廣信領投），客戶含 yoxi、PChome。",
    sector: "車聯網 × IoT × 大數據",
    icon: "funding",
    sources: [
      { label: "AppWorks 專訪", url: "https://appworks.tw/3drens-interview/" },
    ],
  },
  {
    name: "Hotcake 夯客",
    category: "Pre-A 輪募資",
    highlight: "Pre-A 輪 US$1M+（統一國際開發領投），商家續訂率 98%，2025 拓展日泰。",
    sector: "美業預約與會員系統",
    icon: "funding",
    sources: [
      { label: "創業小聚 Pre-A 報導", url: "https://meet.bnext.com.tw/articles/view/52246" },
      { label: "Startup101 報導", url: "https://startup101.biz/en-US/news/240" },
    ],
  },
];

export const metadata: Metadata = {
  title: "台大車庫 | NTUTEC",
  description:
    "台大創創中心台大車庫為早期團隊提供虛擬進駐、創業社群與業師諮詢，助你從概念走向 MVP。",
};

export default function GaragePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/photos/ntu-beauty-1.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-[#0A192F]/70" />
        <div className="container relative z-[2] py-20">
          <p className="micro-label mb-3 text-teal-light">NTU Garage</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">台大車庫</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            專為早期團隊設計的彈性孵化計畫，虛擬進駐、社群共學，從概念驗證到 MVP，陪你走過最關鍵的第一步。
          </p>
        </div>
      </section>

      {/* Key Stats Strip */}
      <FadeIn>
        <section className="border-b border-border/40 bg-white">
          <div className="container">
            <div className="grid grid-cols-2 divide-x divide-border/40 md:grid-cols-4">
              {[
                { num: "20", unit: "隊", label: "每年錄取" },
                { num: "10", unit: "個月", label: "進駐期間" },
                { num: "0", unit: "元", label: "完全免費" },
                { num: "100+", unit: "", label: "歷屆校友團隊" },
              ].map((s) => (
                <div key={s.label} className="px-6 py-5 text-center">
                  <div className="text-2xl font-bold text-charcoal">
                    {s.num}
                    <span className="text-lg text-teal ml-0.5">{s.unit}</span>
                  </div>
                  <div className="mt-0.5 text-xs text-slate-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Overview */}
      <FadeIn>
        <section className="section-spacing bg-warm-stone">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="micro-label mb-4">Overview</p>
                <h2 className="mb-6">計畫概覽</h2>
                <p className="mb-4 text-lg leading-relaxed text-slate-muted">
                  台大車庫成立於 2013 年，是台大創創中心為早期創業團隊打造的共享孵化空間。13 年來，超過百支新創團隊曾於此起步，從概念驗證走向 MVP 與市場驗證。不同於加速器的密集輔導，車庫提供更彈性的時程安排，讓團隊在校園中安心探索、驗證與迭代。
                </p>
                <p className="text-lg leading-relaxed text-slate-muted">
                  我們提供安全的試錯空間，搭配同儕社群、業師諮詢與基礎資源，幫助團隊在正式進入市場前建立扎實的根基。
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/events/demo-day-2025-02.jpg"
                  alt="2026 輔導計畫開幕式大合照"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Benefits */}
      <FadeIn>
        <section className="section-spacing bg-stone">
          <div className="container">
            <div className="mb-12 text-center">
              <p className="micro-label mb-4">Benefits</p>
              <h2>你將獲得的資源</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Buildings,
                  title: "虛擬進駐",
                  description:
                    "免費虛擬進駐台大水源校區，享有中心會議室預約與活動場地使用權，彈性配合創業節奏。",
                },
                {
                  icon: Handshake,
                  title: "創業社群",
                  description:
                    "與同梯團隊並肩創業，互介紹客戶、共解技術問題時常發生，是台大校園內最活躍的早期新創社群。",
                },
                {
                  icon: Buildings,
                  title: "工作坊與課程",
                  description:
                    "不定期主題工作坊，涵蓋商業模式設計、財務規劃、法務實務等議題，由業師與業界專家主講。",
                },
                {
                  icon: UsersThree,
                  title: "業師諮詢",
                  description:
                    "可申請業師一對一諮詢時段，針對特定議題獲得專業建議。",
                },
                {
                  icon: LinkSimple,
                  title: "加速器銜接",
                  description:
                    "畢業後優先銜接台大加速器，延續成長動能。",
                },
                {
                  icon: GraduationCap,
                  title: "校園資源",
                  description:
                    "台大師生身分優先錄取，可接觸校內各院系資源與研究能量，有助推動跨領域合作。",
                },
              ].map((b) => (
                <div
                  key={b.title}
                  className="rounded-xl border bg-white p-6 card-hover"
                >
                  <b.icon size={28} weight="duotone" className="text-teal" />
                  <h4 className="mt-3 mb-2">{b.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-muted">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Who Can Apply */}
      <section className="section-spacing bg-warm-stone">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="micro-label mb-4">Eligibility</p>
            <h2 className="mb-6">誰可以申請？</h2>
            <ul className="space-y-3">
              {[
                "台大在校生、校友或教職員組成的創業團隊（外部團隊可個案評估，歡迎來信洽詢）",
                "處於概念驗證至 MVP 開發階段",
                "團隊至少 2 人，具備明確的共同創業承諾",
                "具備創新技術或商業模式構想",
                "願意參與車庫社群活動與分享交流",
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
      <FeaturedAlumni stories={garageAlumni} title="歷屆台大車庫校友（列舉部分）" />

      {/* Batch Timeline */}
      <section className="section-spacing bg-warm-stone">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <p className="micro-label mb-2">Batch Schedule</p>
              <h2>梯次時程</h2>
              <p className="mt-3 text-base text-slate-muted">
                車庫採年度梯次制，每年 3 月進駐至 12 月結束。2027 梯次預計 2026 年 12 月開放申請。
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
                      2026 年 3 月 ~ 2026 年 12 月 · 現有團隊進駐中
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
                      2027 年度梯次正式進駐
                    </p>
                    <p className="text-sm text-slate-muted">
                      2027 年 3 月 ~ 2027 年 12 月
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Angel investor diversion */}
      <section className="section-spacing bg-stone">
        <div className="container text-center">
          <p className="micro-label mb-4">Investor Access</p>
          <h2 className="mb-4">天使俱樂部優先觀察對象</h2>
          <p className="mx-auto mb-6 max-w-xl text-lg text-slate-muted">台大車庫孵育的早期新創，為天使投資俱樂部優先觀察與媒合的來源之一。</p>
          <Link href="/angel" className="btn-pill-outline">了解天使俱樂部</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-spacing overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/photos/ntu-beauty-1.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-[#0A192F]/80" />
        <div className="container relative z-[2] text-center">
          <h2 className="mb-4 text-white">有興趣加入 2027 梯次？</h2>
          <p className="mx-auto mb-6 max-w-xl text-lg text-white/80">
            提前登記你的團隊，12 月正式申請開放時，我們將第一時間通知你。登記不等同申請，正式申請仍需依流程提交。
          </p>
          <Link
            href="/apply"
            className="btn-pill-primary inline-flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            預約 2027 梯次通知
          </Link>
        </div>
      </section>
    </>
  );
}
