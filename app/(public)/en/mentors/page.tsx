import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import PageHero from "@/components/public/PageHero";
import BreadcrumbSchema from "@/components/public/BreadcrumbSchema";
import MentorFilterTabs from "@/components/public/MentorFilterTabs";
import { JsonLd } from "@/components/JsonLd";
import { Target, RocketLaunch, Buildings, Flask } from "@phosphor-icons/react/dist/ssr";
import { MENTORS_STATIC, type StaticMentor } from "@/lib/data/mentors-static";

// Static page: no DB queries; data maintained in lib/data/mentors-static.ts
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Mentor Network | NTUTEC",
  description:
    "NTUTEC's mentor network has grown to 80+ mentors over the years, spanning investors, serial founders, corporate executives, and domain experts. 40+ active mentors in 2026, averaging 20+ years of industry experience — providing one-on-one deep mentorship for startup teams.",
  alternates: {
    canonical: "https://tec.ntu.edu.tw/en/mentors",
    languages: {
      "zh-TW": "https://tec.ntu.edu.tw/mentors",
      en: "https://tec.ntu.edu.tw/en/mentors",
    },
  },
  openGraph: {
    title: "Mentor Network | NTUTEC",
    description:
      "80+ mentors spanning investors, serial founders, and corporate executives. 40+ active in 2026, averaging 20+ years of industry experience.",
    url: "https://tec.ntu.edu.tw/en/mentors",
  },
};

interface Category {
  key: string;
  title: string;
  subtitle: string;
  Icon: React.ComponentType<{
    size?: number;
    weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
    className?: string;
  }>;
  description: string;
  display_count?: string;
}

const CATEGORY_META: Record<string, Category> = {
  vc: {
    key: "vc",
    title: "Investors",
    subtitle: "VC Partners",
    Icon: Target,
    description:
      "Current or former venture capitalists, angel investors, and accelerator principals. They can invest, make LP introductions, and provide fundraising strategy.",
    display_count: "10+",
  },
  founder: {
    key: "founder",
    title: "Serial Founders",
    subtitle: "Serial Founders",
    Icon: RocketLaunch,
    description:
      "Founders with successful exits or who are on their second or third venture. They&apos;ve made the mistakes so you don&apos;t have to.",
    display_count: "10+",
  },
  exec: {
    key: "exec",
    title: "Corporate Executives",
    subtitle: "Corporate Executives",
    Icon: Buildings,
    description:
      "C-level and VP executives from large enterprises and conglomerates. They open doors to customers, distribution channels, and strategic partnerships.",
    display_count: "10+",
  },
  expert: {
    key: "expert",
    title: "Domain Experts",
    subtitle: "Domain Experts",
    Icon: Flask,
    description:
      "Deep specialists in technology, law, finance, and operations. Advisor-level depth in their specific domains.",
    display_count: "5+",
  },
};

const CATEGORY_ORDER = ["vc", "founder", "exec", "expert"];

function MentorCard({ mentor }: { mentor: StaticMentor }) {
  const initial = mentor.name.charAt(0);
  const displayTitle = mentor.highlight || mentor.title;

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-stone-warm/50 bg-white shadow-sm">
      {/* Photo — 4:5 portrait */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone">
        {mentor.photo_url ? (
          <Image
            src={mentor.photo_url}
            alt={`${mentor.name}${mentor.title ? `, ${mentor.title}` : ""}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-wash to-stone">
            <span className="text-5xl font-bold text-teal/40">{initial}</span>
          </div>
        )}
        {mentor.is_new_2026 && (
          <span className="absolute left-3 top-3 rounded-full bg-teal px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-white shadow">
            New 2026
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        {/* Name + social icon */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-snug text-charcoal">
            {mentor.name}
          </h3>
          {mentor.social_url &&
            (() => {
              const isFacebook = mentor.social_url!.includes("facebook.com");
              return (
                <a
                  href={mentor.social_url!}
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
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.984V9h3.102v1.561h.046c.431-.818 1.484-1.681 3.054-1.681 3.266 0 3.867 2.149 3.867 4.944v6.627zM5.337 7.433a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm1.556 13.019H3.78V9h3.113v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                </a>
              );
            })()}
        </div>

        {/* Title / highlight */}
        {displayTitle && (
          <p className="mt-1 text-xs leading-relaxed text-slate-muted line-clamp-2">
            {displayTitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default function EnMentorsPage() {
  const allMentors = MENTORS_STATIC;

  // Group mentors by category
  const grouped: Record<string, StaticMentor[]> = {};
  for (const m of allMentors) {
    if (!grouped[m.category]) grouped[m.category] = [];
    grouped[m.category].push(m);
  }

  // Build categories in fixed order
  const categories = CATEGORY_ORDER.map((key) => ({
    ...CATEGORY_META[key],
    mentors: grouped[key] || [],
  })).filter((cat) => cat.mentors.length > 0);

  const totalActive = allMentors.length;

  // Build ItemList JSON-LD
  const mentorsItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NTUTEC Mentor Network",
    description:
      "NTUTEC 2026 active mentor roster, spanning investors, serial founders, corporate executives, and domain experts",
    url: "https://tec.ntu.edu.tw/en/mentors",
    numberOfItems: totalActive,
    itemListElement: allMentors.map((mentor, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: mentor.name,
        ...(mentor.title || mentor.highlight
          ? { jobTitle: mentor.highlight ?? mentor.title }
          : {}),
        worksFor: {
          "@type": "Organization",
          name: "NTUTEC",
          url: "https://tec.ntu.edu.tw",
        },
        ...(mentor.social_url ? { sameAs: [mentor.social_url] } : {}),
      },
    })),
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tec.ntu.edu.tw/en" },
          { name: "Mentor Network", url: "https://tec.ntu.edu.tw/en/mentors" },
        ]}
      />
      <JsonLd data={mentorsItemListJsonLd} />
      <PageHero
        title="Mentor Network"
        subtitle="Mentors"
        description={`80+ mentors accumulated over the years, with ${totalActive}+ actively mentoring in 2026 — spanning investors, serial founders, corporate executives, and domain experts, providing one-on-one deep mentorship for startup teams.`}
      />

      {/* Intro + Stats */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-slate-muted">
              NTUTEC has built a deep roster of 80+ mentors over the years, with 40+ actively mentoring the 2026 cohort.
              Our mentor network is organized by background type — helping startups quickly find the right advisor:
              investors for fundraising, founders for real-world tactics, executives for channel and customer access, and domain specialists for deep technical expertise.
              Every mentor brings substantial industry experience, averaging 20+ years, and commits to one-on-one accompaniment throughout the program.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((cat) => (
              <div
                key={cat.key}
                className="rounded-xl border border-stone-warm/60 bg-stone p-4 text-center"
              >
                <div className="flex justify-center text-teal" aria-hidden="true">
                  <cat.Icon size={32} weight="duotone" />
                </div>
                <div className="mt-2 text-sm font-semibold text-charcoal">{cat.title}</div>
                <div className="text-xs text-slate-muted">
                  {cat.display_count ?? cat.mentors.length} · {cat.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentoring Photos */}
      <section className="section-spacing bg-teal-wash">
        <div className="container">
          <div className="mb-8 text-center">
            <p className="micro-label mb-4">Mentoring in Action</p>
            <h2 className="mb-3">Mentorship Sessions</h2>
            <p className="text-slate-muted">One-on-one deep consultations — from strategy to execution, mentors walk alongside you.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/opening-2026-mentoring.jpg"
                alt="Mentorship session — startup presenting product to mentor"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/opening-2026-01.jpg"
                alt="Mentorship session — in-depth discussion"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories with filter tabs */}
      <MentorFilterTabs
        categories={categories.map((cat) => ({
          key: cat.key,
          title: cat.title,
          subtitle: cat.subtitle,
          iconName: cat.key,
          mentorCount: cat.mentors.length,
        }))}
      >
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
                    <span className="text-teal" aria-hidden="true">
                      <cat.Icon size={40} weight="duotone" />
                    </span>
                    <span>{cat.title}</span>
                    <span className="text-lg font-normal text-slate-muted">
                      · {cat.display_count ?? cat.mentors.length}
                    </span>
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-muted">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.mentors.map((mentor) => (
                  <MentorCard key={mentor.slug} mentor={mentor} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </MentorFilterTabs>

      {/* Mentor CTA */}
      <section className="section-spacing bg-charcoal text-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-3 text-white">Build Your Startup Alongside World-Class Mentors</h2>
            <p className="mb-8 text-base text-white/60">
              Apply to the NTU Accelerator or NTU Garage — once accepted, NTUTEC will match you with the mentor best suited to your needs and goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/en/apply"
                className="rounded-full bg-teal px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-deep"
              >
                Apply to a Program
              </a>
              <a
                href="/contact?type=mentor"
                className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10"
              >
                Interested in becoming a mentor?
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
              <span className="font-semibold text-charcoal">About This Roster</span>
              <br />
              This page presents NTUTEC&apos;s cumulative mentor list (2025–2026). Mentors are categorized by their primary professional background; some mentors may span multiple categories. Mentor matching is arranged by NTUTEC based on each startup&apos;s needs and mentor expertise — it is not an open application process.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
