import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ogImageUrl } from "@/lib/og";
import BreadcrumbSchema from "@/components/public/BreadcrumbSchema";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 3600; // ISR: revalidate hourly

interface MentorRow {
  id: string;
  name: string;
  title: string | null;
  highlight: string | null;
  category: string;
  photo_url: string | null;
  social_url: string | null;
  bio: string | null;
  is_new_2026: boolean;
  slug: string;
  extended_profile: Record<string, unknown>;
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  vc:      { label: "投資人",  color: "bg-blue-100 text-blue-700" },
  founder: { label: "創業家",  color: "bg-orange-100 text-orange-700" },
  exec:    { label: "企業高管", color: "bg-purple-100 text-purple-700" },
  expert:  { label: "產業專家", color: "bg-teal-100 text-teal-700" },
};

async function getMentor(slug: string): Promise<MentorRow | null> {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase.from("mentors") as any)
    .select("id, name, title, highlight, category, photo_url, social_url, bio, is_new_2026, slug, extended_profile")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  return data as MentorRow | null;
}

async function getRelatedMentors(category: string, excludeId: string): Promise<MentorRow[]> {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase.from("mentors") as any)
    .select("id, name, title, highlight, category, photo_url, social_url, bio, is_new_2026, slug, extended_profile")
    .eq("is_active", true)
    .eq("category", category)
    .neq("id", excludeId)
    .order("sort_order", { ascending: true })
    .limit(3);
  return (data as MentorRow[]) || [];
}

// generateStaticParams: pre-render all mentor pages at build time.
// Uses admin client (service role) to avoid cookies() in static context.
export async function generateStaticParams() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = createAdminClient() as any;
    const { data } = await db
      .from("mentors")
      .select("slug")
      .eq("is_active", true)
      .not("slug", "is", null);
    return ((data as { slug: string }[]) || []).map((m) => ({ slug: m.slug }));
  } catch {
    // Supabase unavailable at build time — skip SSG, use ISR
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mentor = await getMentor(slug);
  if (!mentor) return { title: "業師 | NTUTEC" };

  const displayTitle = mentor.highlight || mentor.title;
  const description = mentor.bio
    ? mentor.bio.slice(0, 120)
    : displayTitle
    ? `${mentor.name}，${displayTitle}`
    : mentor.name;

  return {
    title: `${mentor.name} | 業師陣容 | NTUTEC`,
    description,
    openGraph: {
      title: `${mentor.name} — NTUTEC 業師`,
      description,
      images: [
        {
          url: ogImageUrl(mentor.name, displayTitle || "NTUTEC 業師", "mentor"),
          width: 1200,
          height: 630,
          alt: mentor.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImageUrl(mentor.name, displayTitle || "NTUTEC 業師", "mentor")],
    },
  };
}

export default async function MentorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mentor = await getMentor(slug);
  if (!mentor) notFound();

  const related = await getRelatedMentors(mentor.category, mentor.id);
  const displayTitle = mentor.highlight || mentor.title;
  const catMeta = CATEGORY_LABELS[mentor.category] || CATEGORY_LABELS.expert;
  const isFacebook = mentor.social_url?.includes("facebook.com");

  // JSON-LD for individual mentor
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: mentor.name,
    ...(displayTitle ? { jobTitle: displayTitle } : {}),
    ...(mentor.bio ? { description: mentor.bio } : {}),
    ...(mentor.photo_url
      ? { image: `https://tec.ntu.edu.tw${mentor.photo_url}` }
      : {}),
    ...(mentor.social_url ? { sameAs: [mentor.social_url] } : {}),
    worksFor: {
      "@type": "Organization",
      name: "NTUTEC 台大創創中心",
      url: "https://tec.ntu.edu.tw",
    },
    url: `https://tec.ntu.edu.tw/mentors/${mentor.slug}`,
  };

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "首頁", url: "https://tec.ntu.edu.tw" },
        { name: "業師陣容", url: "https://tec.ntu.edu.tw/mentors" },
        { name: mentor.name, url: `https://tec.ntu.edu.tw/mentors/${mentor.slug}` },
      ]} />
      <JsonLd data={personJsonLd} />

      {/* Back link */}
      <div className="border-b border-stone-warm/40 bg-white">
        <div className="container py-4">
          <Link
            href="/mentors"
            className="inline-flex items-center gap-1.5 text-sm text-slate-muted transition-colors hover:text-teal"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
            業師陣容
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              {/* Photo */}
              <div className="mx-auto w-48 shrink-0 md:mx-0 md:w-56">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-warm/40 shadow-md">
                  {mentor.photo_url ? (
                    <Image
                      src={mentor.photo_url}
                      alt={mentor.name}
                      fill
                      priority
                      sizes="224px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-wash to-stone">
                      <span className="text-6xl font-bold text-teal/40">
                        {mentor.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${catMeta.color}`}>
                    {catMeta.label}
                  </span>
                  {mentor.is_new_2026 && (
                    <span className="rounded-full bg-teal px-3 py-0.5 text-xs font-semibold text-white">
                      2026 新任業師
                    </span>
                  )}
                </div>

                <h1 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">
                  {mentor.name}
                </h1>

                {displayTitle && (
                  <p className="mt-2 text-base leading-relaxed text-slate-muted">
                    {displayTitle}
                  </p>
                )}

                {/* Social links */}
                {mentor.social_url && (
                  <div className="mt-4">
                    <a
                      href={mentor.social_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        isFacebook
                          ? "bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20"
                          : "bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]/20"
                      }`}
                    >
                      {isFacebook ? (
                        <>
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                            <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                          </svg>
                          Facebook
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                            <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.984V9h3.102v1.561h.046c.431-.818 1.484-1.681 3.054-1.681 3.266 0 3.867 2.149 3.867 4.944v6.627zM5.337 7.433a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm1.556 13.019H3.78V9h3.113v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          LinkedIn 個人頁
                        </>
                      )}
                    </a>
                  </div>
                )}

                {/* Bio */}
                {mentor.bio && (
                  <div className="mt-6">
                    <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-muted">
                      關於業師
                    </h2>
                    <p className="leading-relaxed text-charcoal/80">{mentor.bio}</p>
                  </div>
                )}

                {/* Extended profile fields */}
                {mentor.extended_profile &&
                  Object.keys(mentor.extended_profile).length > 0 && (
                    <div className="mt-6">
                      {Object.entries(mentor.extended_profile).map(([key, value]) => (
                        <div key={key} className="mb-3">
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-muted">
                            {key}
                          </span>
                          <p className="mt-1 text-sm text-charcoal/80">{String(value)}</p>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Mentors */}
      {related.length > 0 && (
        <section className="section-spacing bg-white">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-xl font-bold text-charcoal">
                同類型業師
              </h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {related.map((m) => {
                  const relatedDisplayTitle = m.highlight || m.title;
                  return (
                    <Link
                      key={m.id}
                      href={m.slug ? `/mentors/${m.slug}` : "#"}
                      className="card-hover group flex flex-col overflow-hidden rounded-xl border border-stone-warm/50 bg-stone transition-shadow hover:shadow-md"
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-warm/40">
                        {m.photo_url ? (
                          <Image
                            src={m.photo_url}
                            alt={m.name}
                            fill
                            sizes="(max-width: 640px) 50vw, 200px"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-wash to-stone">
                            <span className="text-3xl font-bold text-teal/40">{m.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="font-bold text-charcoal">{m.name}</p>
                        {relatedDisplayTitle && (
                          <p className="mt-1 text-xs leading-relaxed text-slate-muted line-clamp-2">
                            {relatedDisplayTitle}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
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
              <Link
                href="/mentors"
                className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10"
              >
                瀏覽所有業師
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
