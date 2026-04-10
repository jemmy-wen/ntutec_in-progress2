import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "創新創業競賽 | NTUTEC",
  description:
    "臺大創創中心年度創新創業競賽，發掘最具潛力的新創團隊，提供獎金、輔導與投資媒合。",
};

const timeline = [
  { date: "3 月", title: "報名開始", description: "線上報名系統開放，提交團隊資料與商業企劃書。" },
  { date: "4 月", title: "初審", description: "書面審查，篩選進入複賽的團隊。" },
  { date: "5 月", title: "複賽 Pitch", description: "五分鐘簡報加五分鐘 Q&A，由評審團現場評分。" },
  { date: "6 月", title: "決賽 Demo Day", description: "入選團隊於 Demo Day 公開展示，角逐最終大獎。" },
];

const prizes = [
  { place: "冠軍", amount: "NT$300,000", extras: "加速器直接入選資格 + 業師輔導" },
  { place: "亞軍", amount: "NT$150,000", extras: "加速器優先面試資格 + 業師輔導" },
  { place: "季軍", amount: "NT$80,000", extras: "業師輔導三個月" },
  { place: "最佳人氣獎", amount: "NT$30,000", extras: "由現場觀眾投票選出" },
];

const pastWinners = [
  { year: "2025", team: "AI Health Co.", project: "AI 精準醫療平台" },
  { year: "2024", team: "GreenTech Labs", project: "碳足跡追蹤系統" },
  { year: "2023", team: "EduVerse", project: "沉浸式教育元宇宙" },
];

export default function CompetitionPage() {
  return (
    <>
      <PageHero
        title="創新創業競賽"
        subtitle="Innovation Competition"
        description="發掘最具潛力的創新團隊，提供舞台、資源與資金，助你從概念走向市場。"
      />

      {/* Overview */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="micro-label mb-4">About the Competition</p>
            <h2 className="mb-6">競賽簡介</h2>
            <p className="text-lg leading-relaxed text-slate-muted">
              臺大創創中心年度創新創業競賽，面向全國大專院校師生與早期新創團隊，不限產業領域。
              透過嚴謹的評審機制與豐富的獎勵資源，我們致力於發掘並支持最具潛力的創新構想。
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Schedule</p>
            <h2>競賽時程</h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-4">
            {timeline.map((item, i) => (
              <div key={item.date} className="relative rounded-2xl bg-white p-6 text-center">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal text-white font-bold">
                  {i + 1}
                </div>
                <p className="micro-label mb-1">{item.date}</p>
                <h4 className="mb-2 text-lg font-semibold">{item.title}</h4>
                <p className="text-sm text-slate-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Prizes</p>
            <h2>獎項</h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {prizes.map((prize) => (
              <div key={prize.place} className="card-hover rounded-2xl bg-white p-6">
                <h3 className="mb-1 text-lg font-semibold">{prize.place}</h3>
                <p className="mb-3 text-2xl font-bold text-teal">{prize.amount}</p>
                <p className="text-sm text-slate-muted">{prize.extras}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Winners */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Past Winners</p>
            <h2>歷屆得獎團隊</h2>
          </div>
          <div className="mx-auto max-w-2xl space-y-4">
            {pastWinners.map((winner) => (
              <div
                key={winner.year}
                className="flex items-center gap-6 rounded-xl bg-white p-6"
              >
                <span className="micro-label">{winner.year}</span>
                <div>
                  <h4 className="font-semibold">{winner.team}</h4>
                  <p className="text-sm text-slate-muted">{winner.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-teal-wash">
        <div className="container text-center">
          <h2 className="mb-6">準備好接受挑戰了嗎？</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">
            立即報名，展現你的創新實力，贏得資源與舞台。
          </p>
          <Link href="/apply" className="btn-pill-primary">
            立即報名
          </Link>
        </div>
      </section>
    </>
  );
}
