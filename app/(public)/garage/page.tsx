import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "車庫孵化器 | NTUTEC",
  description:
    "臺大創創中心車庫孵化器為早期團隊提供免費共創空間、創業社群與技術資源，助你從概念走向 MVP。",
};

export default function GaragePage() {
  return (
    <>
      <PageHero
        title="車庫孵化器"
        subtitle="Garage Incubator"
        description="專為早期團隊設計的彈性孵化空間，從概念驗證到 MVP，陪你走過最關鍵的第一步。"
      />

      {/* Overview */}
      <section className="section-spacing">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="micro-label mb-4">Overview</p>
              <h2 className="mb-6">計畫概覽</h2>
              <p className="mb-4 text-lg leading-relaxed text-slate-muted">
                NTU Garage 成立於 2013 年，是臺大創創中心為早期創業團隊打造的共享孵化空間。13 年來，超過百支新創團隊曾於此起步，從概念驗證走向 MVP 與市場驗證。不同於加速器的密集輔導，車庫提供更彈性的時程安排，讓團隊在校園中安心探索、驗證與迭代。
              </p>
              <p className="text-lg leading-relaxed text-slate-muted">
                車庫由經理 Raven 主責，含必修課程規劃與整體輔導設計。我們提供安全的試錯空間，搭配同儕社群、業師諮詢與基礎資源，幫助團隊在正式進入市場前建立扎實的根基。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["共創工作區", "會議討論室", "活動交流空間", "創業社群"].map(
                (label) => (
                  <div
                    key={label}
                    className="aspect-square rounded-xl bg-teal-wash flex items-center justify-center"
                  >
                    <span className="text-sm text-slate-muted">{label}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Benefits</p>
            <h2>你將獲得的資源</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🏠",
                title: "免費共創空間",
                description:
                  "位於臺大校園內的專屬工作空間，含高速網路、會議室與基礎辦公設備。",
              },
              {
                icon: "🤝",
                title: "創業社群",
                description:
                  "與其他新創團隊共處一室，自然形成互助社群，分享經驗與資源。",
              },
              {
                icon: "📚",
                title: "工作坊與課程",
                description:
                  "定期舉辦技術開發、商業模式設計、財務規劃等主題工作坊。",
              },
              {
                icon: "👥",
                title: "業師諮詢",
                description:
                  "可申請業師一對一諮詢時段，針對特定議題獲得專業建議。",
              },
              {
                icon: "🔗",
                title: "加速器銜接",
                description:
                  "畢業後優先銜接加速器計畫，延續成長動能。",
              },
              {
                icon: "🎓",
                title: "校園資源",
                description:
                  "連結臺大各學院實驗室、研究中心與跨領域人才資源。",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-xl border bg-white p-6 card-hover"
              >
                <span className="text-3xl">{b.icon}</span>
                <h4 className="mt-3 mb-2">{b.title}</h4>
                <p className="text-sm leading-relaxed text-slate-muted">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Apply */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="micro-label mb-4">Eligibility</p>
            <h2 className="mb-6">誰可以申請？</h2>
            <ul className="space-y-3">
              {[
                "臺大在校生、校友或教職員組成的創業團隊",
                "處於概念驗證至 MVP 開發階段",
                "團隊至少 2 人，願意定期使用車庫空間",
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

      {/* CTA */}
      <section className="section-spacing bg-teal-wash">
        <div className="container text-center">
          <h2 className="mb-4">開始你的創業旅程</h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-slate-muted">
            提交申請，加入臺大最活躍的創業社群。
          </p>
          <Link href="/apply" className="btn-pill-primary">
            立即申請
          </Link>
        </div>
      </section>
    </>
  );
}
