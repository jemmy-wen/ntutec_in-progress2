import type { Metadata } from "next";
import PageHero from "@/components/public/PageHero";
import AngelApplyForm from "@/components/public/AngelApplyForm";

export const metadata: Metadata = {
  title: "加入 NTUTEC ANGELS 臺大天使會 | NTUTEC",
  description:
    "申請加入 NTUTEC ANGELS 臺大天使會，瞭解入會資格、平台功能與申請流程。",
};

const requirements = [
  "具備合格投資人資格（依金管會規定）",
  "對早期新創投資有興趣，願意投入時間與資源",
  "認同臺大創創中心的使命與價值觀",
  "願意參與每月天使例會及相關活動",
  "經兩位現有會員推薦，或由臺大創創中心邀請",
  "繳納年度會費（詳情請洽詢）",
];

export default function AngelApplyPage() {
  return (
    <>
      <PageHero
        title="加入 NTUTEC ANGELS 臺大天使會"
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
                { icon: '📋', title: '瀏覽候選新創', desc: '每月天使例會前，上架 3–5 家精選新創的六張資訊卡片。' },
                { icon: '🗳️', title: '投資意向投票', desc: '天使例會後進行記名投票，可選擇 50萬以下 / 50–100萬 / 100–200萬 / 200萬以上投資金額。' },
                { icon: '📊', title: '本月 Pipeline', desc: '即時查看當月 Gate 評估中的新創列表與篩選進度。' },
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
            <p className="micro-label mb-4">Application</p>
            <h2 className="mb-8">申請表單</h2>
            <AngelApplyForm />
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
