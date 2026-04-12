import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/public/PageHero";
import mentorsData from "@/data/mentors_all.json";

export const metadata: Metadata = {
  title: "業師陣容 | NTUTEC",
  description:
    "NTUTEC 40+ 位業師，依背景分為創投家、連續創業家、企業高管、產業專家四大類。結合產業實戰經驗與台大學術視野，為新創團隊提供一對一深度輔導。",
};

interface Mentor {
  name: string;
  title: string | null;
  highlight: string | null;
  photo: string | null;
  is_new_2026: boolean;
}

interface Category {
  key: string;
  title: string;
  subtitle: string;
  emoji: string;
  description: string;
  mentors: Mentor[];
}

const categories = mentorsData.categories as Category[];
const stats = mentorsData.stats;

function MentorCard({ mentor }: { mentor: Mentor }) {
  const initial = mentor.name.charAt(0);
  return (
    <div
      className="card-hover relative flex flex-col rounded-2xl border border-stone-warm/60 bg-white p-5"
      title={mentor.title || undefined}
    >
      {mentor.is_new_2026 && (
        <span className="absolute right-3 top-3 rounded-full bg-teal px-2 py-0.5 text-[10px] font-semibold text-white">
          2026 新任
        </span>
      )}

      <div className="flex items-start gap-4">
        {mentor.photo ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-stone">
            <Image
              src={mentor.photo}
              alt={`${mentor.name} 照片`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-wash">
            <span className="text-xl font-bold text-teal">{initial}</span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-charcoal line-clamp-1">
            {mentor.name}
          </h3>
          {mentor.title && (
            <p className="mt-1 text-xs leading-snug text-slate-muted line-clamp-2">
              {mentor.title}
            </p>
          )}
        </div>
      </div>

      {mentor.highlight && (
        <p className="mt-3 border-t border-stone-warm/40 pt-3 text-xs leading-relaxed text-slate-muted line-clamp-3">
          {mentor.highlight}
        </p>
      )}
    </div>
  );
}

export default function MentorsPage() {
  return (
    <>
      <PageHero
        title="業師陣容"
        subtitle="Mentors"
        description={`累計 ${stats.total}+ 位業師，依背景類型分為創投家、連續創業家、企業高管與產業專家四大類，為新創團隊提供全方位的深度輔導。`}
      />

      {/* Intro + Stats */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-slate-muted">
              NTUTEC 業師網絡以「背景類型」劃分，幫助新創團隊快速找到最適合的諮詢對象——
              找創投家談融資、找連續創業家學實戰、找企業高管開通路、找產業專家補深度。
              每位業師皆具備豐富的產業實戰經驗，平均逾 20 年產業深耕，為眾多新創團隊提供一對一深度輔導。
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
                aria-label={`${cat.title}：${cat.mentors.length} 位`}
                className="card-hover rounded-xl border border-stone-warm/60 bg-stone p-4 text-center transition-colors"
              >
                <div className="text-3xl" aria-hidden="true">{cat.emoji}</div>
                <div className="mt-2 text-sm font-semibold text-charcoal">
                  {cat.title}
                </div>
                <div className="text-xs text-slate-muted">
                  {cat.mentors.length} 位 · {cat.subtitle}
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
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/opening-2026-mentor-session.jpg"
                alt="業師輔導現場 — 深度討論"
                fill
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
                    · {cat.mentors.length} 位
                  </span>
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-muted">
                  {cat.description}
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cat.mentors.map((mentor) => (
                <MentorCard key={mentor.name} mentor={mentor} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Mentor CTA */}
      <section className="py-12 bg-gray-50 text-center">
        <p className="text-lg text-gray-600 mb-4">與頂尖業師並肩創業</p>
        <a href="/apply" className="inline-block bg-teal text-white px-6 py-3 rounded-lg hover:bg-teal-deep transition-colors">立即申請</a>
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
