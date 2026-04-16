/**
 * Historical Alumni page — 歷年新創校友（2016–2025）
 *
 * Redesign 2026-04-15:
 *   - 卡片改為上下 layout（logo 上、文字下）→ 文字可用寬度最大化，不再被 truncate/line-clamp 吃掉
 *   - 公司名取消 truncate，允許 2 行自動換行
 *   - 描述 line-clamp 放寬到 3 行，並附 title attr 可 hover 看全
 *   - Logo fallback 改用品牌字樣 + 漸層底色，不再顯示「無 Logo」
 *   - 加年份快速導覽 pills（sticky）+ 頂部 stats 條，對齊 startups page 風格
 *   - Grid：sm 2 欄 / lg 3 欄 / xl 4 欄，呼吸感更好
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PageHero from "@/components/public/PageHero";
import { DOMAIN_TAG_STYLE } from "@/lib/classify";

export const metadata: Metadata = {
  title: "歷年新創校友 | NTUTEC",
  description:
    "台大創創中心 2016–2025 累積輔導的歷年新創團隊，涵蓋 AI、生醫、硬科技與創新商模。",
};

export const revalidate = 3600;

interface HistoricalStartup {
  id: string;
  year: string;
  year_sortable: number;
  name: string;
  logo_url: string | null;
  logo_local_path: string | null;
  description: string | null;
  external_link: string | null;
  tags: string[] | null;
}

function resolveLogo(s: HistoricalStartup): string | null {
  if (s.logo_local_path) return s.logo_local_path;
  if (s.logo_url && !s.logo_url.includes("construction.png")) return s.logo_url;
  return null;
}

// 從公司名取 2 字作為 fallback 標記（中文取前 2 字，英文取首字母 + 次字母）
function initials(name: string): string {
  const trimmed = name.trim();
  // 中文優先
  const zh = trimmed.match(/[\u4e00-\u9fa5]/g);
  if (zh && zh.length >= 2) return zh.slice(0, 2).join("");
  if (zh && zh.length === 1) return zh[0];
  // 英文縮寫
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return trimmed.slice(0, 2).toUpperCase();
}

// 用公司名 hash 決定 fallback 底色（在 5 個品牌配色間循環）
const FALLBACK_BG = [
  "from-teal/15 to-teal-deep/20 text-teal-deep",
  "from-oxford/10 to-oxford/20 text-oxford",
  "from-amber-gold/15 to-amber-gold/25 text-amber-gold",
  "from-stone-warm to-stone text-charcoal",
  "from-teal-wash to-teal-light text-teal-deep",
];
function fallbackBg(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return FALLBACK_BG[Math.abs(h) % FALLBACK_BG.length];
}

export default async function HistoricalAlumniPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("historical_startups")
    .select(
      "id, year, year_sortable, name, logo_url, logo_local_path, description, external_link, tags"
    )
    .order("year_sortable", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    console.error("[historical] query failed", error);
  }

  const rows = (data ?? []) as HistoricalStartup[];

  // Group by year, preserve DESC order from query
  const buckets = new Map<string, HistoricalStartup[]>();
  for (const r of rows) {
    if (!buckets.has(r.year)) buckets.set(r.year, []);
    buckets.get(r.year)!.push(r);
  }
  const years = Array.from(buckets.keys());

  // Stats
  const withLogo = rows.filter((r) => resolveLogo(r)).length;
  const withLink = rows.filter((r) => r.external_link).length;

  return (
    <>
      <PageHero
        title="歷年新創校友"
        subtitle="Historical Alumni · 2016–2025"
        description={`${rows.length} 組新創團隊從台大創創中心起步，涵蓋 AI 軟體、生醫、硬科技與創新商模。`}
      />

      {/* Stats bar */}
      <section className="bg-teal-wash py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <p className="text-4xl font-bold text-teal-deep">{rows.length}</p>
              <p className="mt-2 text-sm text-slate-muted">歷年輔導新創</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-teal-deep">{years.length}</p>
              <p className="mt-2 text-sm text-slate-muted">涵蓋年度</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-teal-deep">{withLink}</p>
              <p className="mt-2 text-sm text-slate-muted">仍在營運／可連結</p>
            </div>
          </div>
        </div>
      </section>

      {/* Year quick-nav */}
      {years.length > 0 && (
        <section className="sticky top-0 z-20 border-b border-stone-warm bg-white/90 backdrop-blur">
          <div className="container flex flex-wrap gap-2 py-4">
            {years.map((y) => (
              <a
                key={y}
                href={`#year-${y}`}
                className="rounded-full border border-stone-warm bg-white px-3 py-1 text-sm font-medium text-charcoal transition hover:border-teal hover:bg-teal-wash hover:text-teal-deep"
              >
                {y}
                <span className="ml-1.5 text-xs text-slate-muted">
                  {buckets.get(y)!.length}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="section-spacing">
        <div className="container">
          {buckets.size === 0 && (
            <p className="py-16 text-center text-slate-muted">
              資料載入中或暫無資料。
            </p>
          )}

          {Array.from(buckets.entries()).map(([year, teams]) => (
            <section key={year} id={`year-${year}`} className="mb-20 scroll-mt-24">
              <div className="mb-8 flex items-baseline justify-between border-b-2 border-teal/30 pb-3">
                <h2 className="text-3xl font-bold text-charcoal">
                  {year}
                  <span className="ml-3 text-base font-normal text-slate-muted">
                    {teams.length} 組
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {teams.map((t) => {
                  const logo = resolveLogo(t);
                  const hasLink = Boolean(t.external_link);
                  const CardEl: any = hasLink ? Link : "article";
                  const cardProps: any = hasLink
                    ? {
                        href: t.external_link!,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {};

                  return (
                    <CardEl
                      key={t.id}
                      {...cardProps}
                      className={`group flex flex-col rounded-2xl border border-stone-warm bg-white p-5 transition-all duration-200 ${
                        hasLink
                          ? "hover:-translate-y-1 hover:border-teal/40 hover:shadow-lg"
                          : ""
                      }`}
                    >
                      {/* Logo area — fixed height, centered */}
                      <div className="mb-4 flex h-24 items-center justify-center rounded-xl bg-stone/50">
                        {logo ? (
                          <Image
                            src={logo}
                            alt={`${t.name} logo`}
                            width={160}
                            height={96}
                            className="max-h-20 max-w-[80%] object-contain"
                            unoptimized
                          />
                        ) : (
                          <div
                            className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${fallbackBg(
                              t.name
                            )} text-xl font-bold`}
                            aria-hidden="true"
                          >
                            {initials(t.name)}
                          </div>
                        )}
                      </div>

                      {/* Text area — no truncate, allow wrap */}
                      <div className="flex flex-1 flex-col">
                        <h3
                          className="mb-2 text-base font-semibold leading-snug text-charcoal transition-colors group-hover:text-teal-deep"
                          title={t.name}
                        >
                          {t.name}
                        </h3>

                        {t.description && (
                          <p
                            className="line-clamp-3 flex-1 text-sm leading-relaxed text-slate-muted"
                            title={t.description}
                          >
                            {t.description}
                          </p>
                        )}

                        {t.tags && t.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {t.tags.map((tag) => {
                              const style = DOMAIN_TAG_STYLE[tag];
                              return (
                                <span
                                  key={tag}
                                  className="inline-block rounded-full px-2 py-0.5 text-[11px] font-medium"
                                  style={
                                    style
                                      ? { backgroundColor: style.bg, color: style.text }
                                      : { backgroundColor: "#f1f5f9", color: "#475569" }
                                  }
                                >
                                  {tag}
                                </span>
                              );
                            })}
                          </div>
                        )}

                        {hasLink && (
                          <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-teal-deep opacity-70 transition-opacity group-hover:opacity-100">
                            造訪官網
                            <svg
                              className="h-3 w-3"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.22 4.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 9 6.22 5.28a.75.75 0 010-1.06z"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    </CardEl>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
