import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "執行團隊 | NTUTEC",
  description:
    "台大創創中心執行團隊，由中心主任、CEO、輔導經理與投資經理組成，結合產業經驗、學術視野與創投背景，全力支持新創成長。",
};

interface TeamMember {
  initials: string;
  name: string;
  title: string;
  bio: string;
  photo?: string;
}

const leadership: TeamMember[] = [
  {
    initials: "莊",
    name: "莊裕澤",
    title: "中心主任",
    bio: "台大資訊管理學系暨研究所專任教授，具多年新創育成經驗。主任代表校方監督中心營運，負責對校層級的治理、財務、人事與組織規章。",
    photo: "/images/team/chuang-yuze.jpg",
  },
  {
    initials: "林",
    name: "林文欽 Vincent",
    title: "執行長 CEO",
    bio: "前騰訊副總經理、京東商城副總裁，台大 EMBA。負責中心日常營運、策略方向與投資決策，主導台大天使會與新創輔導整體規劃。",
    photo: "/images/team/vincent-lin.png",
  },
];

const team: TeamMember[] = [
  {
    initials: "陳",
    name: "陳盈盈 Yingying",
    title: "資深經理 Senior Manager",
    bio: "主責加速器、企業垂直加速器與中心行政營運。輔導小組帶領硬科技與先進製造組，串接企業合作夥伴資源。",
    photo: "/images/brand/ntutec-icon-teal.png",
  },
  {
    initials: "江",
    name: "江旻壕 Howard",
    title: "投資經理 Investment Manager",
    bio: "主責台大天使會與案源篩選評估，協同企業垂直加速器。輔導小組帶領生技醫療組，負責投資人關係經營與案源評估。",
    photo: "/images/brand/ntutec-icon-teal.png",
  },
  {
    initials: "許",
    name: "許瀞之 Raven",
    title: "輔導經理 Program Manager",
    bio: "主責台大車庫與整體輔導計畫設計，含必修課程規劃。輔導小組帶領創新商模組，打造新創團隊的成長路徑。",
    photo: "/images/brand/ntutec-icon-teal.png",
  },
  {
    initials: "楊",
    name: "楊智堯 Neil",
    title: "營運經理 Operations Manager",
    bio: "主責對外行銷、活動企劃與校友關懷（歷屆團隊追蹤與關係維護）。輔導小組帶領 AI 軟體組，連結校友網絡與生態系。",
    photo: "/images/brand/ntutec-icon-teal.png",
  },
];

function LeadershipCard({ member }: { member: TeamMember }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-warm/40 bg-white shadow-sm card-hover">
      {/* Large portrait photo */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`${member.name}，${member.title}`}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-teal-wash">
            <span className="text-6xl font-bold text-teal/40">{member.initials}</span>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-6">
        <p className="text-xs font-bold tracking-widest text-teal uppercase mb-1">{member.title}</p>
        <h3 className="text-2xl font-bold text-charcoal">{member.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-muted">{member.bio}</p>
      </div>
    </div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="rounded-xl border bg-white p-6 card-hover">
      <div className="mb-4 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-teal-wash">
        {member.photo ? (
          <Image src={member.photo} alt={`${member.name}，${member.title}`} width={80} height={80} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <span className="text-2xl font-bold text-teal">{member.initials}</span>
        )}
      </div>
      <h3 className="text-xl">{member.name}</h3>
      <p className="mt-1 text-sm font-semibold text-teal">{member.title}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-muted">{member.bio}</p>
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="執行團隊"
        subtitle="Our Team"
        description="結合學術視野、產業經驗與創投背景，全力支持每一支新創團隊的成長。"
      />

      {/* Leadership */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-10">
            <p className="micro-label mb-2">Leadership</p>
            <h2>中心領導</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {leadership.map((member) => (
              <LeadershipCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Core team */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-10">
            <p className="micro-label mb-2">Core Team</p>
            <h2>核心團隊</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-muted">
              四位經理依四大聚焦領域分工，分別帶領 AI 軟體、生技醫療、硬科技與創新商模輔導小組。
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}

          </div>
        </div>
      </section>
      <section className="py-12 bg-stone text-center">
        <p className="text-lg text-slate-muted mb-4">有任何問題，歡迎聯繫我們的輔導團隊</p>
        <a href="/contact" className="inline-block bg-teal text-white px-6 py-3 rounded-lg hover:bg-teal-deep transition-colors">聯繫輔導經理</a>
      </section>
    </>
  );
}
