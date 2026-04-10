import type { Metadata } from "next";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "諮詢委員會 | NTUTEC",
  description:
    "臺大創創中心諮詢委員會由產學界重量級人士組成，為中心策略方向提供寶貴建議。",
};

const advisors = [
  {
    name: "王OO",
    title: "董事長",
    organization: "OO 科技股份有限公司",
  },
  {
    name: "李OO",
    title: "執行長",
    organization: "OO 創投管理顧問",
  },
  {
    name: "陳OO",
    title: "特聘教授",
    organization: "臺灣大學管理學院",
  },
  {
    name: "林OO",
    title: "總經理",
    organization: "OO 金融控股",
  },
  {
    name: "張OO",
    title: "合夥人",
    organization: "OO 國際法律事務所",
  },
  {
    name: "黃OO",
    title: "執行董事",
    organization: "OO 天使投資集團",
  },
];

export default function AdvisoryBoardPage() {
  return (
    <>
      <PageHero
        title="諮詢委員會"
        subtitle="Advisory Board"
        description="由產學界重量級人士組成的諮詢委員會，為中心的策略方向與發展提供指引。"
      />

      <section className="section-spacing">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {advisors.map((advisor) => (
              <div
                key={advisor.name}
                className="rounded-xl border bg-white p-6 card-hover"
              >
                {/* Photo placeholder */}
                <div className="mb-4 aspect-square w-24 rounded-xl bg-teal-wash flex items-center justify-center">
                  <span className="text-3xl font-bold text-teal">
                    {advisor.name.charAt(0)}
                  </span>
                </div>

                <h3 className="text-xl">{advisor.name}</h3>
                <p className="mt-1 text-sm font-semibold text-teal">
                  {advisor.title}
                </p>
                <p className="mt-1 text-sm text-slate-muted">
                  {advisor.organization}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
