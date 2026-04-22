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
import PageHero from "@/components/public/PageHero";
import { DOMAIN_TAG_STYLE } from "@/lib/classify";

export const metadata: Metadata = {
  title: "歷年新創校友 | NTUTEC",
  description:
    "台大創創中心 2016–2025 累積輔導的歷年新創團隊，涵蓋 AI、生醫、硬科技與創新商模。",
};

const MOCK_HISTORICAL: HistoricalStartup[] = [
  { id:'1', year:'2024', year_sortable:2024, name:'思輔科技 SAVFE', logo_url:null, logo_local_path:null, description:'醫療機器人×微創手術導引，2025 國家新創獎得主', external_link:'https://savfe.com', tags:['生醫'] },
  { id:'2', year:'2021', year_sortable:2021, name:'ECOCO 宜可可', logo_url:null, logo_local_path:null, description:'智慧回收×循環經濟，Pre-A 億元融資（台塑生醫領投），AI 回收再生率 95%', external_link:'https://www.ecoco.com.tw', tags:['永續'] },
  { id:'3', year:'2021', year_sortable:2021, name:'配客嘉 PackAge+', logo_url:null, logo_local_path:null, description:'電商循環包裝生態系，Pre-A NT$5,200 萬，合作 200+ 企業', external_link:'https://www.package-plus.com', tags:['永續'] },
  { id:'4', year:'2021', year_sortable:2021, name:'Datayoo 悠由數據', logo_url:null, logo_local_path:null, description:'農業×AI×氣候韌性，服務 6,000+ 公頃農地，與 Qualcomm 合作', external_link:null, tags:['AI軟體'] },
  { id:'5', year:'2021', year_sortable:2021, name:'歐姆佳科技 OhmyAnt', logo_url:null, logo_local_path:null, description:'高速 RF 射頻測量技術，A 輪 NT$6,000 萬，2025 新北市新創之星首獎', external_link:null, tags:['硬科技'] },
  { id:'6', year:'2020', year_sortable:2020, name:'AmazingTalker', logo_url:null, logo_local_path:null, description:'線上語言家教平台，A 輪 NT$4.3 億，年營收 NT$10 億+，用戶 190+ 國', external_link:'https://www.amazingtalker.com', tags:['教育'] },
  { id:'7', year:'2020', year_sortable:2020, name:'知識衛星 SAT.', logo_url:null, logo_local_path:null, description:'精品大師線上課程，2024 年營業額 NT$7 億，2025 高峰會 1,500 人', external_link:null, tags:['教育'] },
  { id:'8', year:'2020', year_sortable:2020, name:'KryptoGO 重量科技', logo_url:null, logo_local_path:null, description:'虛擬資產監理科技（RegTech），客戶含 40+ 銀行/政府/虛擬資產業者', external_link:'https://www.kryptogo.com', tags:['Web3'] },
  { id:'9', year:'2020', year_sortable:2020, name:'Turing Space', logo_url:null, logo_local_path:null, description:'數位身份×區塊鏈信任科技，策略輪 NT$1 億+，WHO 委託開發 160 國數位國際青年證', external_link:null, tags:['Web3'] },
  { id:'10', year:'2020', year_sortable:2020, name:'Home心', logo_url:null, logo_local_path:null, description:'醫院看護×居家照護媒合，3,000+ 照服員、10,000+ 媒合案件', external_link:null, tags:['生醫'] },
  { id:'11', year:'2020', year_sortable:2020, name:'Hotcake 夯客', logo_url:null, logo_local_path:null, description:'美業預約與會員系統，Pre-A US$1M+，商家續訂率 98%', external_link:null, tags:['創新商模'] },
  { id:'12', year:'2019', year_sortable:2019, name:'MoBagel 行動貝果', logo_url:null, logo_local_path:null, description:'AutoML/企業 AI 數據平台，累計 US$21M+，3,000+ 品牌含 Fortune 500', external_link:'https://mobagel.com', tags:['AI軟體'] },
  { id:'13', year:'2019', year_sortable:2019, name:'漸強實驗室 Crescendo Lab', logo_url:null, logo_local_path:null, description:'AI 對話雲平台、行銷科技，服務 700+ 亞洲品牌（H&M、IKEA、Rakuten）', external_link:null, tags:['AI軟體'] },
  { id:'14', year:'2019', year_sortable:2019, name:'方格子 vocus', logo_url:null, logo_local_path:null, description:'華文內容訂閱平台，月均 200 萬不重複造訪、會員 72 萬', external_link:'https://vocus.cc', tags:['創新商模'] },
  { id:'15', year:'2019', year_sortable:2019, name:'3drens 三維人', logo_url:null, logo_local_path:null, description:'車聯網×IoT×大數據，近 NT$1 億融資', external_link:null, tags:['硬科技'] },
]

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
  const rows = MOCK_HISTORICAL;

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
