import Link from 'next/link'
import type { Metadata } from "next";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "諮詢委員會 | NTUTEC",
  description:
    "台大創創中心諮詢委員會由產學界重量級人士組成，為中心策略方向提供指引。",
  alternates: { canonical: "https://tec.ntu.edu.tw/advisory-board" },
};

interface Advisor {
  initials: string;
  name: string;
  title: string;
  organization: string;
}

// Source: 114年成果報告書_委員意見回覆（2025 年諮詢委員會名單）
const advisors: Advisor[] = [
  {
    initials: "江",
    name: "江茂雄",
    title: "工學院院長",
    organization: "國立臺灣大學",
  },
  {
    initials: "胡",
    name: "胡星陽",
    title: "管理學院院長",
    organization: "國立臺灣大學",
  },
  {
    initials: "張",
    name: "張耀文",
    title: "電機資訊學院院長",
    organization: "國立臺灣大學",
  },
  {
    initials: "趙",
    name: "趙如媛",
    title: "執行長",
    organization: "時代基金會",
  },
  {
    initials: "瞿",
    name: "瞿志豪",
    title: "總經理",
    organization: "創新工業技術移轉股份有限公司（ITIC）",
  },
  {
    initials: "李",
    name: "李吉仁",
    title: "董事長",
    organization: "財團法人誠致教育基金會",
  },
  {
    initials: "陳",
    name: "陳良基",
    title: "前部長",
    organization: "前科技部部長（現國科會）",
  },
  {
    initials: "簡",
    name: "簡立峰",
    title: "前總經理",
    organization: "前 Google 台灣董事總經理",
  },
];

export default function AdvisoryBoardPage() {
  return (
    <>
      <PageHero
        title="諮詢委員會"
        subtitle="Advisory Board"
        description="由產學界重量級人士組成的諮詢委員會，為中心的策略方向與長期發展提供指引。"
      />

      <section className="section-spacing">
        <div className="container">
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-slate-muted">
            諮詢委員會成員橫跨金融、半導體、科技、政府、學術等領域，提供中心跨領域的戰略視野與產業洞察，共同推動臺灣創新創業生態系的長期發展。
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {advisors.map((advisor) => (
              <div key={advisor.name} className="rounded-xl border bg-white p-6 card-hover">
                <div className="mb-4 aspect-square w-24 rounded-xl bg-teal-wash flex items-center justify-center">
                  <span className="text-3xl font-bold text-teal">{advisor.initials}</span>
                </div>
                <h3 className="text-xl">{advisor.name}</h3>
                <p className="mt-1 text-sm font-semibold text-teal">{advisor.title}</p>
                <p className="mt-1 text-sm text-slate-muted">{advisor.organization}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-xs text-slate-muted">
            本頁資料依最新任職資訊更新，職稱以實際任職時為準。
          </p>
        </div>
      </section>

      <section className="section-spacing bg-stone text-center">
        <div className="container">
          <h2 className="mb-6">準備好了嗎？</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/apply" className="btn-pill-primary">申請輔導計畫</Link>
            <Link href="/corporate" className="btn-pill-outline">企業合作洽談</Link>
          </div>
        </div>
      </section>
    </>
  );
}
