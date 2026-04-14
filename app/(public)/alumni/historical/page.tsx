/**
 * PROPOSAL — Historical Alumni page
 * File ships as `.proposal` so Next.js does not register it as a route.
 * To activate: rename to `page.tsx`.
 *
 * Assumptions
 *   - `historical_startups` table exists (migration 010 + 011 applied).
 *   - `@/lib/supabase/server` exports `createClient()` (SSR helper).
 *   - Public read is allowed by RLS (USING (true)).
 *
 * Design
 *   - Server Component. One Supabase query, grouped in memory by `year`.
 *   - Years sorted DESC via `year_sortable`; "2016以前" surfaces last.
 *   - Cards: logo (or fallback), name, short description, external link.
 *   - Tailwind only; matches existing public-page aesthetics (see mentors/startups).
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "歷年新創校友 | NTUTEC",
  description:
    "台大創創中心 2016–2025 累積輔導的 479 組新創團隊，涵蓋 AI、生醫、硬科技與創新商模。",
};

export const revalidate = 3600; // ISR: refresh hourly

interface HistoricalStartup {
  id: string;
  year: string;
  year_sortable: number;
  name: string;
  logo_url: string | null;
  logo_local_path: string | null;
  description: string | null;
  external_link: string | null;
}

function resolveLogo(s: HistoricalStartup): string | null {
  if (s.logo_local_path) return s.logo_local_path;
  if (s.logo_url && !s.logo_url.includes("construction.png")) return s.logo_url;
  return null;
}

export default async function HistoricalAlumniPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("historical_startups")
    .select(
      "id, year, year_sortable, name, logo_url, logo_local_path, description, external_link"
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

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHero
        title="歷年新創校友"
        subtitle={`2016–2025 累積輔導 ${rows.length} 組新創團隊`}
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        {buckets.size === 0 && (
          <p className="text-center text-gray-500">資料載入中或暫無資料。</p>
        )}

        {Array.from(buckets.entries()).map(([year, teams]) => (
          <section key={year} className="mb-16">
            <div className="mb-6 flex items-baseline gap-3 border-b border-gray-200 pb-2">
              <h2 className="text-3xl font-bold text-gray-900">{year}</h2>
              <span className="text-sm text-gray-500">{teams.length} 組</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {teams.map((t) => {
                const logo = resolveLogo(t);
                return (
                  <article
                    key={t.id}
                    className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded bg-gray-100">
                      {logo ? (
                        <Image
                          src={logo}
                          alt={t.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 object-contain"
                          unoptimized
                        />
                      ) : (
                        <span className="text-xs text-gray-400">無 Logo</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-gray-900">
                        {t.name}
                      </h3>
                      {t.description && (
                        <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                          {t.description}
                        </p>
                      )}
                      {t.external_link && (
                        <Link
                          href={t.external_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-xs text-blue-600 hover:underline"
                        >
                          瞭解更多 →
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}
