import type { Metadata } from "next";
import PageHero from "@/components/public/PageHero";
import cohort from "@/data/cohort_2026.json";

export const metadata: Metadata = {
  title: "2026 年度新創團隊 | NTUTEC",
  description: `2026 年度台大創創中心輔導的 ${cohort.teams.length} 個新創團隊，涵蓋 AI 軟體、生技醫療、硬科技與創新商模四大聚焦領域。`,
};

interface Team {
  name: string;
  display_name: string;
  contact_title: string | null;
  industry_sectors: string[] | null;
  business_model: string[] | null;
  target_market: string | null;
  product_description: string | null;
  ntu_identity: string | null;
  stage: string | null;
  website_url: string | null;
}

const teams = cohort.teams as Team[];

export default function StartupsPage() {
  const ntuCount = teams.filter((t) => t.ntu_identity && t.ntu_identity !== "無").length;
  const stageCount = teams.filter((t) => t.stage).length;

  return (
    <>
      <PageHero
        title="2026 年度新創團隊"
        subtitle="2026 Cohort"
        description={`${teams.length} 個正在輔導的新創團隊，涵蓋 AI 軟體、生技醫療、硬科技與創新商模四大聚焦領域。`}
      />

      {/* Stats bar */}
      <section className="bg-teal-wash py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <p className="text-4xl font-bold text-teal-deep">{teams.length}</p>
              <p className="mt-2 text-sm text-slate-muted">輔導新創團隊</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-teal-deep">{ntuCount}</p>
              <p className="mt-2 text-sm text-slate-muted">具台大身份團隊</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-teal-deep">{stageCount}</p>
              <p className="mt-2 text-sm text-slate-muted">已進入加速器</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teams grid */}
      <section className="section-spacing">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2">
            {teams.map((team) => (
              <div
                key={team.name}
                className="card-hover rounded-2xl border border-stone-warm/60 bg-white p-6"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-charcoal">
                      {team.display_name}
                    </h3>
                    {team.display_name !== team.name && (
                      <p className="mt-0.5 text-xs text-slate-muted">
                        {team.name}
                      </p>
                    )}
                  </div>
                  {team.stage && (
                    <span className="shrink-0 rounded-full bg-teal/10 px-2.5 py-0.5 text-xs font-medium text-teal-deep">
                      {team.stage}
                    </span>
                  )}
                </div>

                {team.product_description && (
                  <p className="mb-4 text-sm leading-relaxed text-slate-muted line-clamp-4">
                    {team.product_description}
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {team.ntu_identity && team.ntu_identity !== "無" && (
                    <span className="rounded-full bg-teal-wash px-2.5 py-0.5 text-xs font-medium text-teal-deep">
                      台大 {team.ntu_identity.replace(/^有[，,]?\s*/, "")}
                    </span>
                  )}
                  {team.industry_sectors?.map((sector) => (
                    <span
                      key={sector}
                      className="rounded-full bg-stone px-2.5 py-0.5 text-xs text-charcoal"
                    >
                      {sector}
                    </span>
                  ))}
                  {team.business_model?.map((bm) => (
                    <span
                      key={bm}
                      className="rounded-full border border-border px-2.5 py-0.5 text-xs text-slate-muted"
                    >
                      {bm}
                    </span>
                  ))}
                  {team.target_market && (
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-slate-muted">
                      {team.target_market}
                    </span>
                  )}
                </div>

                {team.website_url && (
                  <div className="mt-4 pt-4 border-t border-stone-warm/60">
                    <a
                      href={team.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-teal-deep hover:text-teal transition-colors"
                    >
                      造訪官網 →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-slate-muted">
            * 以上為 2026 年度正在輔導的新創團隊。資料來源：台大創創中心 2026 導師健診媒合系統。
          </p>
        </div>
      </section>
    </>
  );
}
