import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Send } from "lucide-react";
import { UsersThree, Buildings, CurrencyCircleDollar, MapPin } from "@phosphor-icons/react/dist/ssr";
import FeaturedAlumni, { type AlumniStory } from "@/components/public/FeaturedAlumni";
import Image from "next/image";
import BreadcrumbSchema from "@/components/public/BreadcrumbSchema";
import { ogImageUrl } from "@/lib/og";
import { FadeIn } from "@/components/ui/fade-in";

const acceleratorAlumni: AlumniStory[] = [
  {
    name: "配客嘉 PackAge+",
    category: "A 輪募資",
    highlight: "離開輔導計畫後，於 2025 年完成 A 輪募資逾新台幣 1 億元，引領台灣循環包裝產業。",
    sector: "循環包裝 · ESG",
    icon: "funding",
  },
  {
    name: "AHEAD Medicine 先勁智能",
    category: "天使輪投資",
    highlight: "AI 醫療輔助診斷平台，獲台大天使俱樂部投資，深耕精準醫療領域，持續拓展亞太市場。",
    sector: "生技醫療 · AI",
    icon: "funding",
  },
  {
    name: "MoBagel 行動貝果",
    category: "天使輪投資",
    highlight: "企業 AI 與數據分析平台，獲台大天使俱樂部投資，服務橫跨製造、金融、零售等多個垂直產業。",
    sector: "AI · 數據分析",
    icon: "funding",
  },
  {
    name: "思輔科技 SAVFE",
    category: "天使輪募資",
    highlight: "手術導航系統新創，完成天使輪募資，以 AI 影像辨識輔助微創手術，正進行台灣與美國醫院臨床試驗。",
    sector: "生技醫療 · 手術導航",
    icon: "funding",
  },
  {
    name: "繁晶科技 Ranictek",
    category: "APICTA 國際獎項",
    highlight: "5G 毫米波 IC 設計新創，奪得 APICTA 亞太資通訊大獎 2 金 1 銀，技術獲國際肯定。",
    sector: "硬科技 · 半導體",
    icon: "award",
  },
  {
    name: "澹心科技",
    category: "CES 2025 展出",
    highlight: "受邀參展 CES 2025，以穿戴式感測技術切入心率監測市場，獲國際媒體高度關注。",
    sector: "硬科技 · 醫療穿戴",
    icon: "award",
  },
  {
    name: "台灣醫用電子",
    category: "FDA 510k 認證",
    highlight: "取得美國 FDA 510k 醫療器材認證，為台灣少數自主研發並打入北美醫療市場的新創之一。",
    sector: "生技醫療 · 醫療器材",
    icon: "award",
  },
  {
    name: "三維人",
    category: "Pre-A 輪募資",
    highlight: "完成 Pre-A 輪 US$3M 募資，提供 3D 人體數位建模技術，已服務多家國際時尚與運動品牌。",
    sector: "AI · 3D 視覺",
    icon: "funding",
  },
  {
    name: "Picsee",
    category: "全球規模化",
    highlight: "智慧連結管理平台，月觸及用戶逾 1 億人次，產品擴展至 5 國，成為東亞最大同類產品之一。",
    sector: "SaaS · 數位行銷",
    icon: "award",
  },
  {
    name: "賦語科技 ByteLingo",
    category: "天使輪募資",
    highlight: "AI 企業語言培訓平台，完成天使輪募資，已服務逾 50 家企業客戶，進軍東南亞市場。",
    sector: "AI · EdTech",
    icon: "funding",
  },
];

export const metadata: Metadata = {
  title: "台大加速器 | NTUTEC",
  description:
    "台大創創中心台大加速器為期十個月，提供成長期新創深度業師輔導、企業資源對接與募資機會。",
  alternates: {
    canonical: "https://tec.ntu.edu.tw/accelerator",
    languages: {
      'zh-TW': 'https://tec.ntu.edu.tw/accelerator',
      'en': 'https://tec.ntu.edu.tw/en/accelerator',
    },
  },
  openGraph: {
    title: "台大加速器 | NTUTEC",
    description: "為期十個月，業師深度輔導 + 企業資源對接 + 募資機會。成長期新創最強後盾。",
    url: "https://tec.ntu.edu.tw/accelerator",
    images: [
      {
        url: ogImageUrl(
          "台大加速器",
          "十個月業師輔導 · 企業對接 · 募資機會",
          "startup"
        ),
        width: 1200,
        height: 630,
        alt: "台大加速器 | NTUTEC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      ogImageUrl(
        "台大加速器",
        "十個月業師輔導 · 企業對接 · 募資機會",
        "startup"
      ),
    ],
  },
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
    Icon: UsersThree,
    title: "業師網絡",
    description:
      "歷年 80+ 位業師深厚陣容，2026 陪跑 40+ 位，平均逾 20 年產業深耕，涵蓋創投、AI、生技、半導體等領域，一對一深度輔導。",
  },
  {
    Icon: Buildings,
    title: "企業資源",
    description:
      "35 家合作企業（含 Nvidia、Synopsys、鴻海等），提供技術驗證場域與潛在客戶資源。",
  },
  {
    Icon: CurrencyCircleDollar,
    title: "募資對接",
    description:
      "天使投資俱樂部與 300+ 投資人網絡，涵蓋種子輪到 A 輪的募資機會。",
  },
  {
    Icon: MapPin,
    title: "虛擬進駐",
    description:
      "免費虛擬進駐台大水源校區，享有中心會議室與活動場地使用權，彈性配合創業節奏。",
  },
];

export default function AcceleratorPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "首頁", url: "https://tec.ntu.edu.tw" },
        { name: "輔導計畫", url: "https://tec.ntu.edu.tw/programs" },
        { name: "台大加速器", url: "https://tec.ntu.edu.tw/accelerator" }
      ]} />
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/events/opening-2026-classroom.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-[#0A192F]/75" />
        <div className="container relative z-[2] py-20">
          <p className="micro-label mb-3 text-teal-light">NTU Accelerator</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">台大加速器</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            為期十個月的深度輔導計畫，幫助成長期新創加速邁向下一個里程碑。無台大身分亦可申請，有台大身分者優先。我們重視技術創新與市場潛力，不限台大背景。
          </p>
        </div>
      </section>

      {/* Key stats strip */}
      <div className="border-b border-stone-warm/40 bg-white">
        <div className="container flex flex-wrap justify-center gap-8 py-6 text-center md:gap-16">
          {[
            { num: "10", unit: "個月", label: "深度輔導" },
            { num: "40+", unit: "", label: "陪跑業師" },
            { num: "20", unit: "隊", label: "每年錄取" },
            { num: "0", unit: "元", label: "完全免費" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-teal">
                {s.num}
                <span className="text-lg">{s.unit}</span>
              </div>
              <div className="mt-1 text-xs text-slate-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Overview */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="micro-label mb-4">Overview</p>
            <h2 className="mb-6">計畫概覽</h2>
            <p className="text-lg leading-relaxed text-slate-muted">
              台大加速器自 2017 年啟動，專為已完成原型、進入市場驗證階段的成長期新創設計。計畫為期十個月，由 2026 陪跑業師 40+ 位提供一對一深度輔導，背後擁有歷年 80+ 位業師的深厚資料庫，串接企業合作資源、天使投資俱樂部與創投網絡。2026 梯次進行中（3 月 ~ 12 月）。
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

      {/* Mid-page split: text + coaching photo */}
      <FadeIn>
        <section className="section-spacing">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <p className="micro-label mb-4">Campus Life</p>
                <h2 className="mb-6">輔導計畫現場</h2>
                <p className="text-lg leading-relaxed text-slate-muted mb-4">
                  課程、輔導、討論——十個月的創業加速，從這裡開始。每位創辦人都有專屬業師一對一陪跑，結合群體課程與個別輔導，全面提升創業勝率。
                </p>
                <p className="text-slate-muted leading-relaxed">
                  2026 梯次進行中，共有 40+ 位資深業師輪流駐點，平均擁有逾 20 年產業深耕經驗，涵蓋創投、AI、生技、半導體等領域。
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/events/opening-2026-coaching.jpg"
                  alt="一對一業師輔導"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* What We Offer */}
      <section className="section-spacing bg-warm-stone">
        <div className="container">
          <FadeIn>
            <div className="mb-12 text-center">
              <p className="micro-label mb-4">Benefits</p>
              <h2>我們提供的資源</h2>
            </div>
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <span className="inline-block text-teal"><b.Icon size={40} weight="duotone" /></span>
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
      <FadeIn>
        <FeaturedAlumni stories={acceleratorAlumni} title="歷屆台大加速器校友" />
      </FadeIn>

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
                      2026 年 3 月 ~ 12 月 · 年度梯次進行中，次梯次申請於 2026 年 12 月開放
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

      {/* FAQ diversion */}
      <section className="py-6 text-center">
        <div className="container">
          <p className="text-sm text-slate-muted">
            申請條件有疑問？{' '}
            <a href="/faq" className="text-teal-deep underline underline-offset-4 font-medium">查看常見問題 →</a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-spacing overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/photos/ntu-research-cover.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-[#0A192F]/80" />
        <div className="container relative z-[2] text-center">
          <h2 className="mb-4 text-white">有興趣加入 2027 梯次？</h2>
          <p className="mx-auto mb-6 max-w-xl text-lg text-white/70">
            提前登記你的團隊，12 月正式申請開放時，我們將第一時間通知你。登記不等同申請，正式申請仍需依流程提交。
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/apply"
              className="btn-pill-primary inline-flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              預約 2027 梯次通知
            </Link>
            <Link href="/corporate" className="btn-pill-outline !border-white/60 !text-white hover:!bg-white/10">企業合作方案</Link>
          </div>
        </div>
      </section>
    </>
  );
}
