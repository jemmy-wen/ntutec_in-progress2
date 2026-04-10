import type { Metadata } from "next";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "輔導新創作品集 | NTUTEC",
  description:
    "臺大創創中心歷屆輔導新創團隊作品集，涵蓋加速器、車庫與已募資新創。",
};

const filters = ["全部", "加速器", "車庫", "已募資"];

const startups = [
  {
    name: "MediAI",
    oneliner: "AI 驅動的精準醫療診斷平台",
    stage: "Pre-A",
    tags: ["醫療科技", "AI"],
  },
  {
    name: "GreenCharge",
    oneliner: "智慧電動車充電網路管理系統",
    stage: "種子輪",
    tags: ["綠色科技", "IoT"],
  },
  {
    name: "EduPlay",
    oneliner: "遊戲化兒童程式教育平台",
    stage: "加速器",
    tags: ["教育科技", "遊戲化"],
  },
  {
    name: "FoodSafe",
    oneliner: "區塊鏈食品溯源解決方案",
    stage: "車庫",
    tags: ["食品科技", "區塊鏈"],
  },
  {
    name: "FinBot",
    oneliner: "中小企業 AI 財務助理",
    stage: "Pre-A",
    tags: ["金融科技", "AI"],
  },
  {
    name: "AgroSense",
    oneliner: "精準農業感測與數據分析平台",
    stage: "種子輪",
    tags: ["農業科技", "大數據"],
  },
];

const stageColor: Record<string, string> = {
  "Pre-A": "bg-emerald-100 text-emerald-800",
  種子輪: "bg-amber-100 text-amber-800",
  加速器: "bg-teal/10 text-teal-deep",
  車庫: "bg-purple-100 text-purple-800",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        title="輔導新創作品集"
        subtitle="Portfolio"
        description="歷屆輔導新創團隊，橫跨多個產業領域，從早期概念到成功募資。"
      />

      <section className="section-spacing">
        <div className="container">
          {/* Filter Bar */}
          <div className="mb-10 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  filter === "全部"
                    ? "bg-teal text-white"
                    : "bg-stone text-charcoal hover:bg-teal-wash"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {startups.map((startup) => (
              <div
                key={startup.name}
                className="card-hover rounded-2xl bg-white overflow-hidden"
              >
                {/* Logo placeholder */}
                <div className="flex h-32 items-center justify-center bg-teal-wash rounded-t-2xl">
                  <span className="text-sm text-slate-muted">Logo</span>
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-lg font-semibold">
                    {startup.name}
                  </h3>
                  <p className="mb-3 text-sm text-slate-muted">
                    {startup.oneliner}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        stageColor[startup.stage] || "bg-stone text-charcoal"
                      }`}
                    >
                      {startup.stage}
                    </span>
                    {startup.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-stone px-3 py-1 text-xs text-slate-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
