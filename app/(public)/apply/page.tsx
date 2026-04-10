import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "立即申請 | NTUTEC",
  description:
    "申請加入臺大創創中心的加速器計畫或車庫孵化器，開啟你的創業成長之旅。",
};

const tracks = [
  {
    icon: "🚀",
    name: "申請加速器",
    subtitle: "Accelerator Program",
    description:
      "適合已有 MVP 或初期營收的成長期新創。為期十個月，提供業師輔導、企業對接與募資機會。",
    href: "#",
    note: "外部申請表單（即將開放）",
  },
  {
    icon: "🏠",
    name: "申請車庫",
    subtitle: "Garage Incubator",
    description:
      "適合概念驗證至 MVP 階段的早期團隊。彈性六至十二個月，提供共創空間與社群資源。",
    href: "#",
    note: "外部申請表單（即將開放）",
  },
];

const timeline = [
  { step: "1", label: "線上申請", description: "填寫申請表單，提交團隊與計畫資料" },
  { step: "2", label: "書面審查", description: "中心團隊進行初步書面審核（約 2 週）" },
  { step: "3", label: "面試邀約", description: "通過書審者將受邀進行線上或實體面談" },
  { step: "4", label: "結果通知", description: "面試後一週內通知錄取結果並安排入駐" },
];

export default function ApplyPage() {
  return (
    <>
      <PageHero
        title="立即申請"
        subtitle="Apply Now"
        description="選擇最適合你的計畫，踏出創業的下一步。"
      />

      {/* Two-path Selection */}
      <section className="section-spacing">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {tracks.map((track) => (
              <a
                key={track.name}
                href={track.href}
                className="group flex flex-col rounded-2xl border-2 border-transparent bg-white p-8 shadow-sm transition-all hover:border-teal hover:shadow-lg"
              >
                <span className="text-4xl">{track.icon}</span>
                <h3 className="mt-4">{track.name}</h3>
                <p className="text-sm text-slate-muted">{track.subtitle}</p>
                <p className="mt-4 flex-1 leading-relaxed text-slate-muted">
                  {track.description}
                </p>
                <div className="mt-6">
                  <span className="btn-pill-primary group-hover:bg-teal-deep">
                    前往申請
                  </span>
                </div>
                <p className="mt-3 text-xs text-slate-muted">{track.note}</p>
              </a>
            ))}
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
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t) => (
              <div key={t.step} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal text-lg font-bold text-white">
                  {t.step}
                </div>
                <h4 className="mb-1 text-lg">{t.label}</h4>
                <p className="text-sm leading-relaxed text-slate-muted">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
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
