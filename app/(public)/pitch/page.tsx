import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BreadcrumbSchema from "@/components/public/BreadcrumbSchema";
import TrackClick from "@/components/TrackClick";
import { FadeIn } from "@/components/ui/fade-in";
import { ogImageUrl } from "@/lib/og";
import { Target, UserCircle, GraduationCap, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "新創投遞 | NTUTEC ANGELS 台大天使會",
  description:
    "將你的新創提交給 NTUTEC ANGELS 台大天使會。40+ 位天使投資人，每月定期例會，三段嚴格盡調。台大創創中心校友優先推薦。",
  alternates: { canonical: "https://tec.ntu.edu.tw/pitch" },
  openGraph: {
    title: "新創投遞 | NTUTEC ANGELS 台大天使會",
    description: "向 40+ 位天使投資人 Pitch。三段嚴格盡調，台大校友優先推薦。",
    url: "https://tec.ntu.edu.tw/pitch",
    images: [
      {
        url: ogImageUrl(
          "向天使投資人 Pitch",
          "NTUTEC ANGELS · 40+ 天使 · 每月例會",
          "angel"
        ),
        width: 1200,
        height: 630,
        alt: "新創投遞 | NTUTEC ANGELS 台大天使會",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      ogImageUrl(
        "向天使投資人 Pitch",
        "NTUTEC ANGELS · 40+ 天使 · 每月例會",
        "angel"
      ),
    ],
  },
};

const afterSubmit = [
  {
    step: "01",
    title: "投資經理審閱",
    description: "投資經理逐一審閱投遞資料，主動與符合條件的新創聯繫，安排進一步了解。",
  },
  {
    step: "02",
    title: "一對一面談",
    description: "與投資經理進行面談，深入討論產品現況、市場策略與融資需求，雙方確認契合度。",
  },
  {
    step: "03",
    title: "天使月例會 Pitch",
    description: "通過評估後，安排在天使月例會向 40+ 位天使投資人現場 Pitch。例會後若有投資人表達意向，中心協助雙方建立後續聯繫。",
  },
];

const whyPitch = [
  {
    icon: Target,
    title: "接觸認真的投資人",
    description:
      "40+ 位天使會員每月定期出席例會，帶著明確投資意圖。這不是瀏覽履歷的平台，而是有人主動為你的案件背書、安排上台的機制。",
  },
  {
    icon: UserCircle,
    title: "投資經理全程主導",
    description:
      "有投資經理親自審閱、安排面談、撰寫評估報告並向天使會員呈現。你不是自己冷投，而是有人幫你把案件帶進對的場合。",
  },
  {
    icon: GraduationCap,
    title: "台大校友網絡加持",
    description:
      "進入 NTUTEC 評估流程，即接觸超過 13 年累積的台大創業校友網絡。獲投後除資金外，可對接業師與企業合作夥伴。",
  },
  {
    icon: CalendarBlank,
    title: "隨時投遞，無截止日",
    description:
      "不設申請梯次或截止日，隨時投遞隨時進入評估。符合條件的新創，投資經理會主動聯繫，不需要等待。",
  },
];

const recentInvestments = [
  {
    name: "AHEAD Medicine 先勁智能",
    round: "2025 Q4",
    sector: "生技醫療 · AI 診斷",
    description:
      "台大醫學院校友 Andrea Wang 創辦，AI 醫療輔助診斷平台，協助醫師縮短 X 光片判讀時間，獲天使俱樂部投資。",
  },
  {
    name: "MoBagel 行動貝果",
    round: "2026 Q1",
    sector: "AI · 數據分析",
    description:
      "鍾哲民創辦的 AI/數據分析平台，服務超過 200 家企業客戶。創辦人為台大車庫與加速器**歷屆校友**，近期接受天使俱樂部投資。",
  },
  {
    name: "思輔科技 SAVFE",
    round: "2026 Q1",
    sector: "硬科技 · 手術導航",
    description:
      "周皓凱創辦的微創手術導航技術公司，以機械式定位技術服務醫療機構。創辦人為台大車庫與加速器**歷屆校友**，完成天使俱樂部投資後積極布局美國市場。",
  },
];

const eligibility = [
  "具備技術創新或商業模式創新，有清晰的問題定義與解決方案",
  "聚焦領域：AI 軟體、生技醫療、硬科技、創新商模；其他具潛力領域歡迎個案評估",
  "台大創創中心輔導計畫（台大加速器、台大車庫）校友享優先推薦資格",
  "有核心團隊與明確的創辦人，具備推進產品與市場的執行能力",
  "願意配合盡調流程，並對外部投資保持開放態度",
];

export default function PitchPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "首頁", url: "https://tec.ntu.edu.tw" },
          { name: "新創投遞", url: "https://tec.ntu.edu.tw/pitch" },
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/events/opening-2026-pitching.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-[#0A192F]/75" />
        <div className="container relative z-[2] py-20">
          <p className="micro-label mb-3 text-teal-light">Pitch to NTUTEC Angels</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">投遞你的新創</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            將你的新創提交給 NTUTEC ANGELS 台大天使會。投資經理親自審閱，符合條件者安排面談，通過評估後在每月天使例會向 40+ 位天使投資人現場 Pitch。
          </p>
          <div className="mt-8">
            <a href="/pitch#submit" className="btn-pill-primary px-8 py-4 text-base inline-block">
              立即投遞
            </a>
          </div>
        </div>
      </section>

      {/* Trust Signal Stats */}
      <FadeIn>
        <section className="border-b border-border/40 bg-white">
          <div className="container">
            <div className="grid grid-cols-2 divide-x divide-border/40 md:grid-cols-4">
              {[
                { num: "150+", label: "投資人網絡" },
                { num: "NT$2.5億+", label: "累計投資規模" },
                { num: "每月", label: "天使例會" },
                { num: "3週", label: "初審回覆" },
              ].map((s) => (
                <div key={s.label} className="px-6 py-5 text-center">
                  <div className="text-2xl font-bold text-charcoal">{s.num}</div>
                  <div className="mt-0.5 text-xs text-slate-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Recent Investments — dark with hard tech photo as subtle background */}
      <FadeIn>
        <section className="relative section-spacing overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/photos/ntu-spotlight/silicon-photonics-sensor.jpg"
              alt=""
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 z-[1] bg-charcoal/90" />
          <div className="container relative z-[2]">
            <div className="mb-12 text-center">
              <p className="mb-4 text-xs font-bold tracking-widest text-teal">TRACK RECORD</p>
              <h2 className="text-white">天使俱樂部近期投資案例</h2>
              <p className="mt-3 text-base text-white/60">這是進入天使例會後可能發生的事</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {recentInvestments.map((inv) => (
                <div
                  key={inv.name}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-teal/20 px-3 py-0.5 text-xs font-semibold text-teal">
                      {inv.round}
                    </span>
                    <span className="text-xs text-white/40">{inv.sector}</span>
                  </div>
                  <h4 className="mb-3 text-lg font-semibold leading-snug text-white">{inv.name}</h4>
                  <p className="text-sm leading-relaxed text-white/60">{inv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Why pitch here */}
      <FadeIn>
        <section className="section-spacing bg-warm-stone">
          <div className="container">
            <div className="mb-12 text-center">
              <p className="micro-label mb-4">Why NTUTEC ANGELS</p>
              <h2>為什麼選擇這裡</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {whyPitch.map((item) => (
                <div key={item.title} className="card-hover card-elevated rounded-2xl bg-white p-8">
                  <item.icon size={36} weight="duotone" className="mb-4 text-teal" />
                  <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                  <p className="text-slate-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* After submit */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="micro-label mb-4">What Happens Next</p>
            <h2 className="mb-4">投遞之後</h2>
            <p className="text-lg text-slate-muted">
              投遞沒有截止日。每份資料都會由投資經理親自看過，符合條件的新創我們會主動聯繫。
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {afterSubmit.map((item, idx) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-stone-warm/60 bg-white p-6"
              >
                <div className="mb-4 text-3xl font-bold text-teal/30">{item.step}</div>
                <h4 className="mb-2 text-lg font-semibold">{item.title}</h4>
                <p className="text-sm leading-relaxed text-slate-muted">{item.description}</p>
                {idx < afterSubmit.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block">
                    <div className="text-2xl text-teal/40">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section-spacing bg-warm-stone">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <p className="micro-label mb-4">Eligibility</p>
            <h2 className="mb-8">適合投遞的新創</h2>
            <ul className="space-y-4">
              {eligibility.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-lg text-slate-muted leading-relaxed"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-muted">
              不確定是否符合？歡迎直接投遞，投資經理審閱後會主動聯繫，說明下一步。
            </p>
          </div>
        </div>
      </section>

      {/* CTA — form */}
      <section id="submit" className="relative section-spacing overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/events/opening-2026-05.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-[#0A192F]/80" />
        <div className="container relative z-[2]">
          <div className="mx-auto max-w-xl">
            <p className="micro-label mb-4 text-center text-white/60">Submit</p>
            <h2 className="mb-3 text-center text-white">立即投遞</h2>
            <p className="mb-8 text-center text-white/80">
              提交後，投資經理將逐一審閱並主動與你聯繫。
            </p>
            <TrackClick eventName="cta_pitch_click" eventParams={{ location: 'pitch_page_submit' }}>
              <a
                href="https://forms.gle/yu4ftYfVdsWaynxY8"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-primary flex w-full items-center justify-center gap-2 py-4 text-base"
              >
                填寫新創投遞表單 →
              </a>
            </TrackClick>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="section-spacing">
        <div className="container text-center">
          <h3 className="mb-4">還沒準備好投遞？</h3>
          <p className="mb-6 text-slate-muted mx-auto max-w-lg">
            先加入台大車庫或台大加速器計畫，接受完整輔導後再接觸天使俱樂部，準備更充分。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/programs" className="btn-pill-outline">
              了解輔導計畫
            </Link>
            <Link href="/angel" className="btn-pill-outline">
              了解天使俱樂部
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
