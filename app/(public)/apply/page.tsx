import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AlertCircle } from "lucide-react";
import PageHero from "@/components/public/PageHero";
import PreRegisterForm from "@/components/public/PreRegisterForm";

export const metadata: Metadata = {
  title: "提前登記 2027 梯次 | NTUTEC",
  description:
    "目前開放 2027 梯次提前登記，正式申請將於 2026 年 12 月開放。提前登記不等同申請，正式開放時第一時間通知你。",
};

const tracks = [
  {
    icon: "🚀",
    name: "申請加速器",
    subtitle: "Accelerator Program",
    description:
      "適合已有 MVP 或初期營收的成長期新創。為期十個月（每年 3 月 ~ 12 月），提供業師輔導、企業對接與募資機會。",
    href: "#preregister",
    learnHref: "/accelerator",
    note: "2027 梯次申請：2026 年 12 月 ~ 2027 年 1 月開放",
  },
  {
    icon: "🏠",
    name: "申請車庫",
    subtitle: "Garage Incubator",
    description:
      "適合概念驗證至 MVP 階段的早期團隊。年度梯次制（每年 3 月 ~ 12 月），提供共創空間與社群資源。",
    href: "#preregister",
    learnHref: "/garage",
    note: "2027 梯次申請：2026 年 12 月 ~ 2027 年 1 月開放",
  },
];

const timeline = [
  { step: "1", label: "線上申請", description: "填寫申請表單，提交團隊與計畫資料" },
  { step: "2", label: "書面審查", description: "中心團隊進行初步書面審核" },
  { step: "3", label: "面試邀約", description: "通過書審者將受邀進行線上或實體面談" },
  { step: "4", label: "結果通知", description: "面試後三週內通知錄取結果並安排入駐" },
];

export default function ApplyPage() {
  return (
    <>
      <PageHero
        title="申請與提前登記"
        subtitle="Apply / Pre-register"
        description="加速器與車庫採年度梯次制，非隨時招生。2027 梯次正式申請於 2026 年 12 月開放。"
      />

      {/* Batch Notice */}
      <section className="section-spacing pb-0">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl border border-teal/30 bg-teal-wash/50 p-6">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-2 text-base font-semibold text-charcoal">
                  關於申請時程
                </h3>
                <p className="text-sm leading-relaxed text-slate-muted">
                  台大創創中心的加速器與車庫採用<strong className="text-charcoal">年度梯次制</strong>，每年 3 月進駐、12 月結束，<strong className="text-charcoal">不接受隨時插班</strong>。
                </p>
                <ul className="mt-3 space-y-1 text-sm text-slate-muted">
                  <li>• <strong className="text-charcoal">2026 梯次</strong>：進行中（3 月 ~ 12 月），現有團隊輔導中</li>
                  <li>• <strong className="text-charcoal">2027 梯次申請期</strong>：2026 年 12 月 ~ 2027 年 1 月</li>
                  <li>• <strong className="text-charcoal">2027 梯次公布結果</strong>：2027 年 2 月</li>
                </ul>
                <p className="mt-3 text-sm leading-relaxed text-slate-muted">
                  若你有興趣加入下一梯次，歡迎先<strong className="text-charcoal">提前登記</strong>——正式申請開放時，我們將第一時間通知你。提前登記<strong className="text-charcoal">不等同申請</strong>，正式申請仍須在申請期內提交完整文件。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-path Selection */}
      <section className="section-spacing">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {tracks.map((track) => (
              <div
                key={track.name}
                className="flex flex-col rounded-2xl border-2 border-transparent bg-white p-8 shadow-sm"
              >
                <span className="text-4xl">{track.icon}</span>
                <h3 className="mt-4">{track.name}</h3>
                <p className="text-sm text-slate-muted">{track.subtitle}</p>
                <p className="mt-4 flex-1 leading-relaxed text-slate-muted">
                  {track.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={track.href} className="btn-pill-primary">
                    提前登記通知
                  </a>
                  <a href={track.learnHref} className="btn-pill-outline text-sm">
                    先了解計畫細節
                  </a>
                </div>
                <p className="mt-3 text-xs text-slate-muted">{track.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-register Form */}
      <section id="preregister" className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto max-w-xl">
            <p className="micro-label mb-4 text-center">Pre-register</p>
            <h2 className="mb-2 text-center">提前登記</h2>
            <p className="mb-8 text-center text-slate-muted">
              2027 梯次申請將於 2026 年 12 月開放。提前登記不等同申請，正式開放時優先通知。
            </p>
            <div className="mb-6 rounded-xl border border-stone-warm/60 bg-white p-4 text-sm">
              <p className="mb-2 text-xs font-semibold text-charcoal">正式申請後流程</p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-muted">
                <span>① 線上申請</span><span className="text-stone-warm/60">→</span>
                <span>② 書面審查</span><span className="text-stone-warm/60">→</span>
                <span>③ 面試邀約</span><span className="text-stone-warm/60">→</span>
                <span>④ 三週內通知</span>
              </div>
            </div>
            <Suspense fallback={<div className="text-center py-8 text-slate-muted">正在載入登記表單...</div>}>
              <PreRegisterForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Application Timeline */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Process</p>
            <h2>申請流程</h2>
          </div>
          <ol className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none">
            {timeline.map((t) => (
              <li key={t.step} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal text-lg font-bold text-white" aria-hidden="true">
                  {t.step}
                </div>
                <h4 className="mb-1 text-lg">{t.label}</h4>
                <p className="text-sm leading-relaxed text-slate-muted">
                  {t.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="section-spacing">
        <div className="container text-center">
          <h3 className="mb-4">還有疑問？</h3>
          <p className="mb-6 text-slate-muted">
            查看常見問題，了解更多關於申請條件、計畫內容與費用的細節。
          </p>
          <Link href="/faq" className="btn-pill-outline">
            查看常見問題
          </Link>
        </div>
      </section>
    </>
  );
}
