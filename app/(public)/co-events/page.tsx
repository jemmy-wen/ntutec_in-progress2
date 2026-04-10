import type { Metadata } from "next";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "聯合活動 | NTUTEC",
  description:
    "臺大創創中心與企業夥伴共同舉辦的創新活動，促進產學交流與新創媒合。",
};

const eventTypes = [
  "產業論壇 — 邀請業界領袖與學術專家，探討前沿趨勢與創新機會。",
  "Demo Day — 新創團隊公開展示成果，與企業及投資人面對面交流。",
  "工作坊 — 主題式實作課程，涵蓋技術、商業模式與募資策略。",
  "交流媒合會 — 促進新創團隊、企業與投資人之間的深度互動與合作機會。",
];

const pastEvents = [
  {
    title: "2025 AI x HealthTech 產業論壇",
    date: "2025 年 11 月 15 日",
    partner: "國泰金控",
    description: "探討 AI 在醫療健康領域的最新應用與商業機會，吸引超過 200 位參與者。",
  },
  {
    title: "綠色科技 Demo Day",
    date: "2025 年 9 月 20 日",
    partner: "台達電子",
    description: "十組綠色科技新創團隊展示成果，促成三項企業合作意向書。",
  },
  {
    title: "FinTech 創新工作坊",
    date: "2025 年 7 月 8 日",
    partner: "中華電信",
    description: "為期兩天的密集工作坊，聚焦開放銀行與數位支付創新。",
  },
  {
    title: "新創媒合之夜",
    date: "2025 年 5 月 12 日",
    partner: "AWS",
    description: "超過 30 組新創與 15 家企業的一對一媒合，促進合作與投資對話。",
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

      {/* Past Events Grid */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Past Events</p>
            <h2>精選活動回顧</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {pastEvents.map((event) => (
              <div
                key={event.title}
                className="card-hover overflow-hidden rounded-2xl bg-white"
              >
                {/* Image placeholder */}
                <div className="flex h-48 items-center justify-center bg-teal-wash">
                  <span className="text-sm text-slate-muted">
                    Event Photo
                  </span>
                </div>
                <div className="p-6">
                  <p className="micro-label mb-1">{event.date}</p>
                  <h3 className="mb-2 text-lg font-semibold">{event.title}</h3>
                  <span className="mb-3 inline-block rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal-deep">
                    {event.partner}
                  </span>
                  <p className="text-sm text-slate-muted leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
