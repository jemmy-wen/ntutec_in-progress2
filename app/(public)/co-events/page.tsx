import type { Metadata } from "next";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "聯合活動 | NTUTEC",
  description:
    "台大創創中心與企業夥伴共同舉辦的創新活動，促進產學交流與新創媒合。",
};

const eventTypes = [
  "產業論壇 — 邀請業界領袖與學術專家，探討前沿趨勢與創新機會。",
  "Demo Day — 新創團隊公開展示成果，與企業及投資人面對面交流。",
  "工作坊 — 主題式實作課程，涵蓋技術、商業模式與募資策略。",
  "交流媒合會 — 促進新創團隊、企業與投資人之間的深度互動與合作機會。",
];

const signatureEvents = [
  {
    title: "台大創新創業嘉年華",
    frequency: "年度旗艦",
    description: "中心年度最大規模創新活動，邀請創新設計學院、創創學程、國際產學聯盟與產學合作總中心跨單位參與，吸引眾多學生與企業夥伴出席，是台大校內重量級年度創業論壇。",
  },
  {
    title: "天使俱樂部月例會",
    frequency: "每月",
    description: "每月定期舉辦天使投資人例會，由新創團隊 Pitch + Q&A + 參訪，結合產業深度分享會，打造高品質的投資人交流場域。",
  },
  {
    title: "Demo Day",
    frequency: "每年 12 月",
    description: "加速器與車庫畢業團隊成果發表會，向天使投資人、創投與策略合作夥伴展示商業進展，促成後續投資與企業合作。",
  },
  {
    title: "產業論壇與工作坊",
    frequency: "不定期",
    description: "與企業夥伴共同舉辦產業論壇、技術工作坊與主題式創新競賽，聚焦 AI、半導體、生技醫療、ESG 等前沿議題。",
  },
];

export default function CoEventsPage() {
  return (
    <>
      <PageHero
        title="聯合活動"
        subtitle="Co-hosted Events"
        description="與產業夥伴攜手，打造高品質的創新交流場域。"
      />

      {/* Event Types */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="micro-label mb-4">Event Types</p>
            <h2 className="mb-8">活動類型</h2>
            <ul className="space-y-4">
              {eventTypes.map((type) => (
                <li
                  key={type}
                  className="flex items-start gap-3 text-lg text-slate-muted leading-relaxed"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Signature Events */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Signature Events</p>
            <h2>旗艦活動</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {signatureEvents.map((event) => (
              <div
                key={event.title}
                className="card-hover rounded-2xl bg-white p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <span className="shrink-0 rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal-deep">
                    {event.frequency}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-muted leading-relaxed">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-sm text-slate-muted">
            最新活動與報名資訊請見 <a href="/events" className="text-teal-deep underline underline-offset-4 hover:text-teal">活動日曆</a>。
          </p>
        </div>
      </section>
    </>
  );
}
