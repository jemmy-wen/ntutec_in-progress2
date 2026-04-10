import type { Metadata } from "next";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "諮詢委員會 | NTUTEC",
  description:
    "臺大創創中心諮詢委員會由產學界重量級人士組成，為中心策略方向提供指引。",
};

interface Advisor {
  initials: string;
  name: string;
  title: string;
  organization: string;
}

// Source: ntutec_advisory_committee_111.md (111 年諮詢委員會名單)
const advisors: Advisor[] = [
  {
    initials: "蔡",
    name: "蔡明興",
    title: "董事長",
    organization: "富邦金控",
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
  {
    initials: "龔",
    name: "龔明鑫",
    title: "前主任委員",
    organization: "前國家發展委員會主任委員",
  },
  {
    initials: "曾",
    name: "曾煜棋",
    title: "院長",
    organization: "臺灣大學電機資訊學院",
  },
  {
    initials: "陳",
    name: "陳銘薰",
    title: "院長",
    organization: "臺北大學商學院",
  },
  {
    initials: "盧",
    name: "盧超群",
    title: "董事長",
    organization: "鈺創科技",
  },
  {
    initials: "陳",
    name: "陳良沛",
    title: "董事長",
    organization: "偉康科技",
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
            * 諮詢委員會名單每年校友會後更新，以上為歷屆重要委員代表。
          </p>
        </div>
      </section>
    </>
  );
}
