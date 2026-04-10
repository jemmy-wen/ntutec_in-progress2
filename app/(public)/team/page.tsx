import type { Metadata } from "next";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "執行團隊 | NTUTEC",
  description:
    "認識臺大創創中心的執行團隊。我們結合產業經驗與學術視野，全力支持新創團隊成長。",
};

const teamMembers = [
  {
    initials: "陳",
    name: "陳OO",
    title: "中心主任",
    bio: "臺大管理學院教授，專長創新管理與策略。致力於推動校園創業生態系的建構。",
  },
  {
    initials: "林",
    name: "林OO",
    title: "副主任",
    bio: "連續創業家，曾成功創辦兩家科技公司並完成出場。專注於新創輔導與國際連結。",
  },
  {
    initials: "張",
    name: "張OO",
    title: "計畫經理",
    bio: "負責加速器計畫的整體規劃與執行，具備豐富的專案管理與新創生態系經驗。",
  },
  {
    initials: "王",
    name: "王OO",
    title: "投資經理",
    bio: "天使投資俱樂部營運管理，協助新創團隊與投資人的媒合與溝通。",
  },
  {
    initials: "李",
    name: "李OO",
    title: "社群經理",
    bio: "負責校友網絡經營與活動策劃，串接創業社群的交流與合作機會。",
  },
  {
    initials: "黃",
    name: "黃OO",
    title: "行政專員",
    bio: "負責中心行政營運與空間管理，確保團隊與新創進駐者獲得最佳支持。",
  },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="執行團隊"
        subtitle="Our Team"
        description="一群熱愛創新、支持創業的夥伴，是臺大創創中心最重要的資產。"
      />

      <section className="section-spacing">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border bg-white p-6 card-hover"
              >
                {/* Avatar */}
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-teal-wash">
                  <span className="text-2xl font-bold text-teal">
                    {member.initials}
                  </span>
                </div>

                <h3 className="text-xl">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-teal">
                  {member.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-muted">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
