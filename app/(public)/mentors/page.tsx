import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/public/PageHero";
import cohort from "@/data/cohort_2026.json";

export const metadata: Metadata = {
  title: "業師陣容 | NTUTEC",
  description:
    "2026 年度 39 位業師，涵蓋創投、半導體、AI、生技醫療、金融、法律、行銷、供應鏈等領域。結合產業實戰經驗與台大學術視野，為新創團隊提供一對一深度輔導。",
};

interface Mentor {
  name: string;
  display_name?: string;
  title?: string | null;
  specialties: string[];
  industries: string | null;
  biz_model: string | null;
  market: string[] | null;
  bio: string;
  wp_description?: string | null;
  avatar: string | null;
  wp_photo?: string | null;
}

const mentors = cohort.mentors as Mentor[];

// Pick best photo: WP photo (higher quality) > Supabase avatar > null
function getPhoto(m: Mentor): string | null {
  return m.wp_photo || m.avatar || null;
}

const domains = [
  "創投與早期投資",
  "半導體與硬科技",
  "AI / 機器學習",
  "網路科技與 SaaS",
  "生技醫療",
  "金融創投",
  "國際市場拓展",
  "法律與智財",
  "供應鏈與製造",
  "品牌與行銷",
  "商業模式設計",
  "募資與退場",
];

export default function MentorsPage() {
  return (
    <>
      <PageHero
        title="業師陣容"
        subtitle="Mentors"
        description={`2026 年度 ${mentors.length} 位業師，平均具備豐富的產業實戰經驗，為新創團隊提供一對一深度輔導與策略建議。`}
      />

      {/* Intro */}
      <section className="section-spacing">
        <div className="container">
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-slate-muted">
            臺大創創中心業師網絡涵蓋創投、半導體、AI、生技醫療、金融、法律、供應鏈等多元領域。每位業師皆具備豐富的產業實戰經驗，透過定期的一對一輔導，協助新創團隊解決從技術驗證到市場擴展的各種挑戰。
          </p>

          {/* Mentor grid — minimal cards */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {mentors.map((mentor) => {
              const photo = getPhoto(mentor);
              const displayName = mentor.display_name || mentor.name;
              return (
                <div
                  key={mentor.name}
                  className="card-hover flex flex-col items-center rounded-2xl border border-stone-warm/60 bg-white p-5 text-center"
                  title={mentor.title || undefined}
                >
                  {photo ? (
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-stone">
                      <Image
                        src={photo}
                        alt={`${displayName} 照片`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-teal-wash">
                      <span className="text-2xl font-bold text-teal">
                        {displayName.charAt(0)}
                      </span>
                    </div>
                  )}

                  <h3 className="mt-4 text-base font-semibold text-charcoal line-clamp-2">
                    {displayName}
                  </h3>

                  {mentor.title && (
                    <p className="mt-1 text-xs leading-snug text-slate-muted line-clamp-2">
                      {mentor.title}
                    </p>
                  )}

                  {mentor.specialties.length > 0 && (
                    <div className="mt-3 flex flex-wrap justify-center gap-1">
                      {mentor.specialties.slice(0, 3).map((sp) => (
                        <span
                          key={sp}
                          className="rounded-full bg-stone px-2 py-0.5 text-[11px] text-charcoal"
                        >
                          {sp}
                        </span>
                      ))}
                      {mentor.specialties.length > 3 && (
                        <span className="rounded-full bg-stone px-2 py-0.5 text-[11px] text-slate-muted">
                          +{mentor.specialties.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="micro-label mb-4">Coverage</p>
            <h2 className="mb-6">涵蓋領域</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {domains.map((domain) => (
                <span
                  key={domain}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-charcoal"
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
