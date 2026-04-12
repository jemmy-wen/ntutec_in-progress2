import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Send } from "lucide-react";
import PageHero from "@/components/public/PageHero";
import FeaturedAlumni, { type AlumniStory } from "@/components/public/FeaturedAlumni";

const garageAlumni: AlumniStory[] = [
  {
    name: "Dapp Pocket",
    category: "成功 Exit",
    highlight: "被 Turn Capital 收購，是車庫孵化團隊重要的退場案例。",
    sector: "區塊鏈錢包",
    icon: "exit",
  },
  {
    name: "Botbonnie",
    category: "成功 Exit",
    highlight: "被 Appier 收購，展現從車庫起步到策略退場的完整路徑。",
    sector: "聊天機器人",
    icon: "exit",
  },
  {
    name: "KryptoGO",
    category: "大額募資",
    highlight: "完成 NT$8,970 萬募資，持續成長為區塊鏈合規領域的代表團隊。",
    sector: "區塊鏈合規",
    icon: "funding",
  },
];

export const metadata: Metadata = {
  title: "台大車庫 | NTUTEC",
  description:
    "台大創創中心台大車庫為早期團隊提供免費共創空間、創業社群與技術資源，助你從概念走向 MVP。",
};

export default function GaragePage() {
  return (
    <>
      <PageHero
        title="台大車庫"
        subtitle="NTU Garage"
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
                台大車庫成立於 2013 年，是台大創創中心為早期創業團隊打造的共享孵化空間。13 年來，超過百支新創團隊曾於此起步，從概念驗證走向 MVP 與市場驗證。不同於加速器的密集輔導，車庫提供更彈性的時程安排，讓團隊在校園中安心探索、驗證與迭代。
              </p>
              <p className="text-lg leading-relaxed text-slate-muted">
                車庫由經理 Raven 主責，含必修課程規劃與整體輔導設計。我們提供安全的試錯空間，搭配同儕社群、導師諮詢與基礎資源，幫助團隊在正式進入市場前建立扎實的根基。
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
                  "位於台大水源校區，24/7 專屬工作座位、會議室預約、活動場地使用權，台大校內最近距離接觸各院系資源。",
              },
              {
                icon: "🤝",
                title: "創業社群",
                description:
                  "與同梯 20 支團隊並肩創業，台大最活躍的早期新創社群——互介紹客戶、共解技術問題都是日常。",
              },
              {
                icon: "📚",
                title: "工作坊與課程",
                description:
                  "每月主題工作坊：技術開發、商業模式設計、財務規劃、法務實務——由導師與業界專家主講。",
              },
              {
                icon: "👥",
                title: "導師諮詢",
                description:
                  "可申請導師一對一諮詢時段，針對特定議題獲得專業建議。",
              },
              {
                icon: "🔗",
                title: "加速器銜接",
                description:
                  "畢業後優先銜接台大加速器，延續成長動能。",
              },
              {
                icon: "🎓",
                title: "校園資源",
                description:
                  "直通工學院、醫學院、電機資訊三院實驗室，台大師生身分優先錄取，跨領域合作觸手可及。",
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
                "台大在校生、校友或教職員組成的創業團隊",
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

      {/* Featured Alumni */}
      <FeaturedAlumni stories={garageAlumni} title="台大車庫校友成就" />

      {/* Batch Timeline */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <p className="micro-label mb-2">Batch Schedule</p>
              <h2>梯次時程</h2>
              <p className="mt-3 text-base text-slate-muted">
                車庫採年度梯次制，每年 3 月進駐至 12 月結束。2027 梯次預計 2026 年 12 月開放申請。
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
                      2026 年 3 月 ~ 2026 年 12 月 · 現有團隊進駐中
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
                      2027 年度梯次正式進駐
                    </p>
                    <p className="text-sm text-slate-muted">
                      2027 年 3 月 ~ 2027 年 12 月
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-teal-wash">
        <div className="container text-center">
          <h2 className="mb-4">有興趣加入 2027 梯次？</h2>
          <p className="mx-auto mb-6 max-w-xl text-lg text-slate-muted">
            提前登記你的團隊，12 月正式申請開放時，我們將第一時間通知你。登記不等同申請，正式申請仍需依流程提交。
          </p>
          <Link
            href="/apply"
            className="btn-pill-primary inline-flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            預約 2027 梯次通知
          </Link>
        </div>
      </section>
    </>
  );
}
