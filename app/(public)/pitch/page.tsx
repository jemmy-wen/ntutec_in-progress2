import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import BreadcrumbSchema from "@/components/public/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "新創投遞 | NTUTEC ANGELS 台大天使會",
  description:
    "將你的新創提交給 NTUTEC ANGELS 台大天使會。40+ 位天使投資人，每月定期例會，三段嚴格盡調。台大創創中心校友優先推薦。",
  alternates: { canonical: "https://tec.ntu.edu.tw/pitch" },
};

const gateProcess = [
  {
    stage: "第一關",
    title: "初篩（硬過濾）",
    description:
      "投資經理審閱投遞資料，確認新創符合聚焦領域（AI 軟體、生技醫療、硬科技、創新商模）及基本門檻。通常於 5 個工作日內回覆。",
  },
  {
    stage: "第二關",
    title: "快速評分",
    description:
      "針對團隊背景、商業模式、市場規模、競爭優勢與執行力進行多維度評分，通過者安排與投資經理進一步面談。",
  },
  {
    stage: "第三關",
    title: "完整 DD 報告",
    description:
      "投資經理撰寫完整盡調報告，包含市場分析、財務模型與投資建議。通過後，安排上架天使月例會向 40+ 位天使投資人 Pitch。",
  },
];

const whatYouGet = [
  {
    icon: "🎤",
    title: "天使例會 Pitch 機會",
    description:
      "通過三段篩選後，在每月天使例會向 40+ 位天使投資人進行現場 Pitch 與 Q&A，直接接觸有意投資早期新創的專業投資人。",
  },
  {
    icon: "📋",
    title: "完整 DD 備忘錄",
    description:
      "中心投資經理協助撰寫完整投資備忘錄，梳理你的市場定位、競爭優勢與財務預測，讓投資人快速理解你的價值主張。",
  },
  {
    icon: "🤝",
    title: "投資人媒合協助",
    description:
      "例會後若投資人表達興趣，中心協助撮合後續洽談流程，包含文件準備與 Term Sheet 討論，減少早期新創的法律摩擦。",
  },
  {
    icon: "🌐",
    title: "生態系資源對接",
    description:
      "進入天使俱樂部評估流程的新創，同步獲得中心業師網絡、企業合作夥伴與校友資源的對接機會，超越單純資金層面的支持。",
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
      "台大車庫與加速器校友鍾哲民創辦，服務超過 200 家企業客戶的 AI/數據分析平台，完成天使俱樂部投資。",
  },
  {
    name: "思輔科技 SAVFE",
    round: "2026 Q1",
    sector: "硬科技 · 手術導航",
    description:
      "台大車庫與加速器校友周皓凱創辦，影像導引智慧機器臂，以機械式定位技術切入微創手術導航市場，完成天使俱樂部投資。",
  },
];

const eligibility = [
  "具備明確的技術創新或商業模式創新，處於 MVP 驗證階段至 A 輪之間",
  "台大創創中心輔導計畫（台大加速器、台大車庫）校友享優先推薦資格",
  "聚焦領域：AI 軟體、生技醫療、硬科技、創新商模；其他具潛力領域歡迎個案評估",
  "團隊有明確的創辦人與核心成員，並具備全職投入的承諾",
  "接受天使投資架構（以個人名義直接持股），並願意配合 DD 流程",
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

      <PageHero
        title="投遞你的新創"
        subtitle="Pitch to NTUTEC ANGELS"
        description="將你的新創提交給 NTUTEC ANGELS 台大天使會。通過三段嚴格審查，在每月天使例會向 40+ 位天使投資人現場 Pitch，接觸真正有意投資早期新創的專業買方。"
      />

      {/* Stats */}
      <section className="border-b border-border/40 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 divide-x divide-border/40 md:grid-cols-4">
            {[
              { value: "40+", label: "天使會員" },
              { value: "每月", label: "定期天使例會" },
              { value: "3 關", label: "嚴格盡調篩選" },
              { value: "隨時", label: "開放投遞，無截止日" },
            ].map((s) => (
              <div key={s.label} className="px-6 py-5 text-center">
                <div className="text-2xl font-bold text-charcoal">{s.value}</div>
                <div className="mt-0.5 text-xs text-slate-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Investments — dark */}
      <section className="section-spacing bg-charcoal text-white">
        <div className="container">
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

      {/* What you get */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">What You Get</p>
            <h2>投遞後，你可以獲得什麼</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {whatYouGet.map((item) => (
              <div key={item.title} className="card-hover rounded-2xl bg-white p-8">
                <span className="mb-4 block text-4xl">{item.icon}</span>
                <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                <p className="text-slate-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-stage process */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="micro-label mb-4">Screening Process</p>
            <h2 className="mb-4">三段嚴格篩選機制</h2>
            <p className="text-lg text-slate-muted">
              投遞後，每個案件都由投資經理親自主導審查。我們不輕易上架，確保進入天使例會的案件具備足夠品質。
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {gateProcess.map((gate, idx) => (
              <div
                key={gate.stage}
                className="relative rounded-2xl border border-stone-warm/60 bg-white p-6"
              >
                <div className="mb-4 inline-flex h-10 items-center justify-center rounded-full bg-teal px-4 text-sm font-bold text-white">
                  {gate.stage}
                </div>
                <h4 className="mb-2 text-lg font-semibold">{gate.title}</h4>
                <p className="text-sm leading-relaxed text-slate-muted">{gate.description}</p>
                {idx < gateProcess.length - 1 && (
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
      <section className="section-spacing">
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
      <section id="submit" className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto max-w-xl">
            <p className="micro-label mb-4 text-center">Submit</p>
            <h2 className="mb-3 text-center">立即投遞</h2>
            <p className="mb-8 text-center text-slate-muted">
              填寫表單約需 10–15 分鐘。提交後投資經理將於 5 個工作日內回覆，說明是否進入下一審查階段。
            </p>
            <a
              href="https://forms.gle/yu4ftYfVdsWaynxY8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-primary flex w-full items-center justify-center gap-2 py-4 text-base"
            >
              填寫新創投遞表單 →
            </a>
            <p className="mt-4 text-center text-xs text-slate-muted">
              台大創創中心校友（加速器、車庫畢業生）享優先審查資格。<br />
              投遞不代表保證進入天使例會，所有案件均需通過完整三關篩選。
            </p>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="section-spacing">
        <div className="container text-center">
          <h3 className="mb-4">還沒準備好投遞？</h3>
          <p className="mb-6 text-slate-muted mx-auto max-w-lg">
            先加入台大車庫或台大加速器計畫，接受完整輔導後再接觸天使俱樂部，成功率更高。
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
