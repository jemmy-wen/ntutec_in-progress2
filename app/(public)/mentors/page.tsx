import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/public/PageHero";
import mentorsData from "@/data/mentors_all.json";
import BreadcrumbSchema from "@/components/public/BreadcrumbSchema";
import { JsonLd } from "@/components/JsonLd";
import { ogImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "業師陣容 | NTUTEC",
  description:
    "NTUTEC 歷年累計 80+ 位業師，涵蓋投資人、創業家、企業高管與產業專家。2026 陪跑業師 40+，平均逾 20 年產業深耕，為新創團隊提供一對一深度輔導。",
  openGraph: {
    title: "業師陣容 | NTUTEC",
    description: "80+ 位業師，涵蓋投資人、創業家、企業高管。2026 陪跑業師 40+，平均逾 20 年產業深耕。",
    images: [
      {
        url: ogImageUrl(
          "NTUTEC 業師陣容",
          "80+ 位業師，平均逾 20 年產業深耕，一對一深度輔導",
          "mentor"
        ),
        width: 1200,
        height: 630,
        alt: "NTUTEC 業師陣容",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      ogImageUrl(
        "NTUTEC 業師陣容",
        "80+ 位業師，平均逾 20 年產業深耕，一對一深度輔導",
        "mentor"
      ),
    ],
  },
};

interface Mentor {
  name: string;
  title: string | null;
  highlight: string | null;
  photo: string | null;
  social_url: string | null;
  is_new_2026: boolean;
  hidden?: boolean;
}

interface Category {
  key: string;
  title: string;
  subtitle: string;
  emoji: string;
  description: string;
  display_count?: string;
  mentors: Mentor[];
}

const categories = (mentorsData.categories as Category[]).map((cat) => ({
  ...cat,
  mentors: cat.mentors.filter((m) => !m.hidden),
}));
const stats = mentorsData.stats;

function MentorCard({ mentor }: { mentor: Mentor }) {
  const initial = mentor.name.charAt(0);
  // Use highlight as display title if available; fall back to title
  const displayTitle = mentor.highlight || mentor.title;

  return (
    <div className="card-hover group relative flex flex-col overflow-hidden rounded-2xl border border-stone-warm/50 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Photo area — 4:5 portrait ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone">
        {mentor.photo ? (
          <Image
            src={mentor.photo}
            alt={`${mentor.name}${mentor.title ? `，${mentor.title}` : ""}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-wash to-stone">
            <span className="text-5xl font-bold text-teal/40">{initial}</span>
          </div>
        )}

        {/* New badge */}
        {mentor.is_new_2026 && (
          <span className="absolute left-3 top-3 rounded-full bg-teal px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-white shadow">
            2026 新任
          </span>
        )}
      </div>

      {/* Info area */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-snug text-charcoal">
            {mentor.name}
          </h3>
          {mentor.social_url && (() => {
            const isFacebook = mentor.social_url.includes("facebook.com");
            return (
              <a
                href={mentor.social_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${mentor.name} ${isFacebook ? "Facebook" : "LinkedIn"}`}
                className={`shrink-0 rounded-md p-1 text-slate-muted/60 transition-colors ${
                  isFacebook
                    ? "hover:bg-[#1877F2]/10 hover:text-[#1877F2]"
                    : "hover:bg-[#0077B5]/10 hover:text-[#0077B5]"
                }`}
              >
                {isFacebook ? (
                  /* Facebook "f" icon */
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                  </svg>
                ) : (
                  /* LinkedIn "in" icon */
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.984V9h3.102v1.561h.046c.431-.818 1.484-1.681 3.054-1.681 3.266 0 3.867 2.149 3.867 4.944v6.627zM5.337 7.433a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm1.556 13.019H3.78V9h3.113v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )}
              </a>
            );
          })()}
        </div>
        {displayTitle && (
          <p className="mt-1.5 text-xs leading-relaxed text-slate-muted line-clamp-2">
            {displayTitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default function MentorsPage() {
  // Build ItemList JSON-LD with Person schema for all visible mentors
  const allVisibleMentors = categories.flatMap((cat) => cat.mentors)
  const mentorsItemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'NTUTEC 台大創創中心業師陣容',
    description: '台大創創中心 2026 陪跑業師名單，涵蓋投資人、創業家、企業高管與產業專家',
    url: 'https://tec.ntu.edu.tw/mentors',
    numberOfItems: allVisibleMentors.length,
    itemListElement: allVisibleMentors.map((mentor, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        name: mentor.name,
        ...(mentor.title || mentor.highlight
          ? { jobTitle: mentor.highlight ?? mentor.title }
          : {}),
        worksFor: {
          '@type': 'Organization',
          name: 'NTUTEC 台大創創中心',
          url: 'https://tec.ntu.edu.tw',
        },
        ...(mentor.social_url ? { sameAs: [mentor.social_url] } : {}),
      },
    })),
  }

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "首頁", url: "https://tec.ntu.edu.tw" },
        { name: "業師陣容", url: "https://tec.ntu.edu.tw/mentors" }
      ]} />
      <JsonLd data={mentorsItemListJsonLd} />
      <PageHero
        title="業師陣容"
        subtitle="Mentors"
        description={`歷年累計 ${stats.total_historical}+ 位業師，${stats.total}+ 位活躍陪跑 2026，涵蓋投資人、創業家、企業高管與產業專家，為新創團隊提供一對一深度輔導。`}
      />

      {/* Intro + Stats */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-slate-muted">
              NTUTEC 歷年累計 80+ 位業師組成深厚資料庫，2026 陪跑業師 40+ 位正在進行中。
              業師網絡依「背景類型」劃分，幫助新創快速找到最適合的諮詢對象——
              找投資人談融資、找創業家學實戰、找企業高管開通路、找領域專家補深度。
              每位業師皆具備豐富產業實戰經驗，平均逾 20 年深耕，一對一陪跑全程。
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-muted">
              陣容涵蓋 Yahoo VP、微軟研究院副院長、台積電研發主管等頂尖產業領袖，帶來第一手的市場洞察與人脈資源。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((cat) => (
              <a
                key={cat.key}
                href={`#${cat.key}`}
                aria-label={`${cat.title}：${cat.display_count ?? cat.mentors.length} 位`}
                className="card-hover rounded-xl border border-stone-warm/60 bg-stone p-4 text-center transition-colors"
              >
                <div className="text-3xl" aria-hidden="true">{cat.emoji}</div>
                <div className="mt-2 text-sm font-semibold text-charcoal">
                  {cat.title}
                </div>
                <div className="text-xs text-slate-muted">
                  {cat.display_count ?? cat.mentors.length} 位 · {cat.subtitle}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Mentoring Photos */}
      <section className="section-spacing bg-teal-wash">
        <div className="container">
          <div className="mb-8 text-center">
            <p className="micro-label mb-4">Mentoring in Action</p>
            <h2 className="mb-3">業師輔導現場</h2>
            <p className="text-slate-muted">一對一深度諮詢，從策略到執行，業師全程陪跑。</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/opening-2026-mentoring.jpg"
                alt="業師輔導現場 — 新創展示產品給業師"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/opening-2026-mentor-session.jpg"
                alt="業師輔導現場 — 深度討論"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.map((cat, idx) => (
        <section
          key={cat.key}
          id={cat.key}
          className={`section-spacing scroll-mt-20 ${idx % 2 === 0 ? "bg-stone" : "bg-white"}`}
        >
          <div className="container">
            <div className="mb-10 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="micro-label mb-2 text-teal">{cat.subtitle}</p>
                <h2 className="flex items-center gap-3">
                  <span className="text-4xl" aria-hidden="true">{cat.emoji}</span>
                  <span>{cat.title}</span>
                  <span className="text-lg font-normal text-slate-muted">
                    · {cat.display_count ?? cat.mentors.length} 位
                  </span>
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-muted">
                  {cat.description}
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cat.mentors.map((mentor) => (
                <MentorCard key={mentor.name} mentor={mentor} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Mentor CTA */}
      <section className="section-spacing bg-charcoal text-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-3 text-white">與頂尖業師並肩創業</h2>
            <p className="mb-8 text-base text-white/60">
              申請台大加速器或台大車庫，通過錄取後由中心依需求為你媒合最適合的業師。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/apply"
                className="rounded-full bg-teal px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-deep"
              >
                立即申請輔導計畫
              </a>
              <a
                href="/contact?type=mentor"
                className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10"
              >
                有意成為業師？洽詢中心
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl border border-stone-warm/60 bg-stone p-8 text-center">
            <p className="text-sm leading-relaxed text-slate-muted">
              <span className="font-semibold text-charcoal">關於業師陣容</span>
              <br />
              本頁呈現 NTUTEC 歷年業師累計名單（2025–2026）。
              業師背景分類依其主要身份判斷，部分業師可能具備跨類型經驗。
              業師配對由中心依新創團隊需求與業師專長安排，非公開申請制。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
