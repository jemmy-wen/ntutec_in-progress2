import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/public/PageHero";
import { VINCENT_ALUMNI, CATEGORY_META } from "@/data/vincent-alumni";

export const metadata: Metadata = {
  title: "成功校友 | NTUTEC",
  description:
    "從台大起步的 15 位代表校友：AmazingTalker、MoBagel、漸強實驗室、知識衛星、配客嘉、Turing Space 等。涵蓋教育、企業服務、永續、Web3、健康五大領域。",
};

// Helper: external link icon SVG
function ExternalLinkIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"/>
      <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"/>
    </svg>
  );
}

// Group alumni by category preserving order
const categoryOrder = ["edu", "enterprise", "sustainability", "web3", "health"] as const;
const alumniByCategory = categoryOrder.map((cat) => ({
  category: cat,
  meta: CATEGORY_META[cat],
  alumni: VINCENT_ALUMNI.filter((a) => a.category === cat),
}));

export default function AlumniPage() {
  return (
    <>
      {/* Section 1: PageHero */}
      <PageHero
        title="成功校友"
        subtitle="Success Stories"
        description="13 年來，逾 600 支團隊從台大起步。以下是執行長 Vincent 挑選的 15 位代表校友，每項數據皆附外部來源可供查證。"
      />

      {/* Section 2: Stats Banner */}
      <section className="section-spacing bg-teal-wash">
        <div className="container">
          <p className="mb-6 text-center text-xs text-slate-muted">
            ※ 以下亮點數據均為歷屆校友於畢業後在市場上的公開里程碑，資料來源可追溯外部公開媒體報導。
          </p>
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { number: "600+", label: "歷年輔導新創團隊" },
              { number: "15", label: "Vincent 欽點代表校友" },
              { number: "5", label: "涵蓋領域" },
              { number: "US$21M+", label: "單一校友最高累計募資（MoBagel）" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-teal">{stat.number}</p>
                <p className="mt-1 text-sm text-slate-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Alumni cards grouped by category */}
      <section className="section-spacing">
        <div className="container">
          {alumniByCategory.map(({ category, meta, alumni }) => (
            alumni.length === 0 ? null : (
              <div key={category} className="mb-16 last:mb-0">
                {/* Category heading */}
                <div className="mb-8 flex items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-sm font-semibold ${meta.color}`}>
                    {meta.label}
                  </span>
                  <div className="h-px flex-1 bg-stone-warm/60" />
                </div>

                {/* Cards grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {alumni.map((alumnus) => (
                    <div
                      key={alumnus.name}
                      className="flex flex-col rounded-2xl border border-stone-warm/60 bg-white p-6 card-hover"
                    >
                      {/* Company name + badge */}
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold text-charcoal">
                            {alumnus.companyUrl ? (
                              <a
                                href={alumnus.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-teal hover:underline underline-offset-2"
                              >
                                {alumnus.name}
                              </a>
                            ) : (
                              alumnus.name
                            )}
                          </h3>
                          {alumnus.nameEn && (
                            <p className="text-xs text-slate-muted">{alumnus.nameEn}</p>
                          )}
                        </div>
                        <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${meta.color}`}>
                          {meta.label}
                        </span>
                      </div>

                      {/* Founder info */}
                      <p className="mb-1 text-sm text-slate-muted">
                        <span className="font-medium text-charcoal">{alumnus.founder}</span>
                        {" · "}{alumnus.founderTitle}{" · "}{alumnus.batchYear} 梯次
                      </p>

                      {/* Sector */}
                      <p className="mb-3 text-xs text-slate-muted">{alumnus.sector}</p>

                      {/* Highlight */}
                      <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-muted">
                        {alumnus.highlight}
                      </p>

                      {/* Sources */}
                      {alumnus.sources.length > 0 && (
                        <div className="mt-auto border-t border-stone-warm/60 pt-3 flex flex-wrap gap-2">
                          {alumnus.sources.map((source) => (
                            <a
                              key={source.url}
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-slate-muted hover:text-teal underline-offset-2 hover:underline"
                            >
                              {source.label}
                              <ExternalLinkIcon />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Demo Day Booth Photos */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-8 text-center">
            <p className="micro-label mb-4">Demo Day 2025</p>
            <h2 className="mb-3">新創展示現場</h2>
            <p className="text-slate-muted">每年 12 月，校友團隊在 Demo Day 向投資人展示成果，開啟下一輪資本旅程。</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/demo-day-2025-booth1.jpg"
                alt="Demo Day 2025 — 新創展示攤位"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/demo-day-2025-booth2.jpg"
                alt="Demo Day 2025 — 新創創辦人"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="section-spacing bg-teal-wash">
        <div className="container text-center">
          <h2 className="mb-6">成為下一個成功校友</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">
            加入台大加速器或台大車庫，獲得業師輔導、資金媒合與生態系支持。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/apply" className="btn-pill-primary">
              成為下一個里程碑案例
            </Link>
            <Link href="/programs" className="btn-pill-outline">
              了解輔導計畫
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
