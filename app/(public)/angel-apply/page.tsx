import type { Metadata } from "next";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "加入 NTUTEC ANGELS 台大天使會 | NTUTEC",
  description:
    "申請加入 NTUTEC ANGELS 台大天使會，瞭解入會資格、平台功能與申請流程。",
  robots: { index: false, follow: false },
};

const requirements = [
  "對早期新創投資有興趣，願意投入時間與資源",
  "認同台大創創中心的使命與價值觀",
  "願意參與每月天使例會及相關活動",
  "繳納年度會費（個人會員 NT$50,000/年；企業會員 NT$100,000/年）",
];

export default function AngelApplyPage() {
  return (
    <>
      <PageHero
        title="加入 NTUTEC ANGELS 台大天使會"
        subtitle="Apply to Join"
        description="歡迎有志參與早期新創投資的投資人，一同加入以台大創業生態系為核心的天使投資社群。"
      />

      {/* Requirements */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <p className="micro-label mb-4">Requirements</p>
            <h2 className="mb-8">入會資格</h2>
            <ul className="space-y-4">
              {requirements.map((req) => (
                <li
                  key={req}
                  className="flex items-start gap-3 text-lg text-slate-muted leading-relaxed"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What you get after joining */}
      <section className="section-spacing bg-teal-wash">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <p className="micro-label mb-4">Member Platform</p>
            <h2 className="mb-8">入會後，你可以做什麼</h2>
            <div className="space-y-3">
              {[
                { icon: '📋', title: '瀏覽候選新創', desc: '每月天使例會前，上架精選新創的六張資訊卡片。' },
                { icon: '🗳️', title: '投資意向投票', desc: '天使例會後進行記名投票，表達對各新創的投資意向。投票結果供參考，實際是否投資與金額由會員自行決定。' },
                { icon: '📊', title: '本月 Pipeline', desc: '即時查看當月評估中的新創列表與各階段篩選進度。' },
                { icon: '📚', title: '學習中心', desc: '天使投資入門、盡職調查方法論與產業趨勢資源。' },
                { icon: '🔔', title: '即時通知', desc: '卡片上架、投票開放、天使例會等重要事件即時推送。' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-xl bg-white p-4">
                  <div className="text-xl mt-0.5">{item.icon}</div>
                  <div>
                    <span className="font-semibold text-charcoal">{item.title}</span>
                    <span className="mx-2 text-stone-warm">·</span>
                    <span className="text-sm text-slate-muted">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto max-w-xl">
            <p className="micro-label mb-4 text-center">Application</p>
            <h2 className="mb-3 text-center">申請入會</h2>
            <p className="mb-8 text-center text-slate-muted">
              依據您的身分選擇對應申請表，填寫後中心將於 3 個工作日內聯繫您安排說明。
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="https://forms.gle/zgjGP7RW7sgG911YA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center rounded-2xl border-2 border-teal bg-white p-8 text-center transition-colors hover:bg-teal-wash"
              >
                <span className="text-4xl">👤</span>
                <h3 className="mt-4 text-lg font-bold text-charcoal">個人會員</h3>
                <p className="mt-2 text-sm text-slate-muted">NT$50,000 / 年</p>
                <span className="mt-6 inline-block rounded-xl bg-teal px-5 py-2 text-sm font-semibold text-white">
                  填寫個人申請表 →
                </span>
              </a>
              <a
                href="https://forms.gle/n38sNQznLG62ypyK9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center rounded-2xl border-2 border-charcoal bg-charcoal p-8 text-center transition-colors hover:bg-charcoal/90"
              >
                <span className="text-4xl">🏢</span>
                <h3 className="mt-4 text-lg font-bold text-white">企業會員</h3>
                <p className="mt-2 text-sm text-white/60">NT$100,000 / 年 · 可指派 3 位代表</p>
                <span className="mt-6 inline-block rounded-xl bg-white px-5 py-2 text-sm font-semibold text-charcoal">
                  填寫企業申請表 →
                </span>
              </a>
            </div>
            <p className="mt-6 text-center text-xs text-slate-muted">
              申請審核通過後，中心將引導您完成年費繳納流程（台大捐款平台）。
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4">有任何問題嗎？</h2>
            <p className="mb-2 text-lg text-slate-muted">
              歡迎來信或致電，我們將盡快回覆您的詢問。
            </p>
            <p className="text-slate-muted">
              Email：
              <a
                href="mailto:ntutec@ntutec.com"
                className="font-medium text-teal-deep underline underline-offset-4"
              >
                ntutec@ntutec.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
