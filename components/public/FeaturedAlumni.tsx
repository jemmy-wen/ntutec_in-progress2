import { TrendingUp, Trophy, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface AlumniStory {
  name: string;
  category: string;
  highlight: string;
  sector: string;
  icon?: "funding" | "award" | "exit";
  sources?: { label: string; url: string }[];
}

interface FeaturedAlumniProps {
  stories: AlumniStory[];
  title?: string;
  subtitle?: string;
}

const iconMap: Record<NonNullable<AlumniStory["icon"]>, LucideIcon> = {
  funding: TrendingUp,
  award: Trophy,
  exit: Rocket,
};

const iconColorMap: Record<NonNullable<AlumniStory["icon"]>, string> = {
  funding: "bg-emerald-50 text-emerald-700",
  award: "bg-amber-50 text-amber-700",
  exit: "bg-purple-50 text-purple-700",
};

export default function FeaturedAlumni({
  stories,
  title = "校友成就",
  subtitle = "Featured Alumni",
}: FeaturedAlumniProps) {
  return (
    <section className="section-spacing bg-stone">
      <div className="container">
        <div className="mb-12 text-center">
          <p className="micro-label mb-2">{subtitle}</p>
          <h2>{title}</h2>
          <p className="mt-4 text-base text-slate-muted">
            13 年來，輔導團隊的實戰成果。以下為部分具代表性的校友案例。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => {
            const Icon = story.icon ? iconMap[story.icon] : TrendingUp;
            const iconColor = story.icon
              ? iconColorMap[story.icon]
              : iconColorMap.funding;

            return (
              <div
                key={story.name}
                className="card-hover rounded-2xl border border-stone-warm/60 bg-white p-6"
              >
                <div
                  className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${iconColor}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="micro-label text-teal mb-1">{story.category}</p>
                <h3 className="mb-2 text-lg font-semibold text-charcoal">
                  {story.name}
                </h3>
                <p className="mb-3 text-sm leading-relaxed text-slate-muted">
                  {story.highlight}
                </p>
                <span className="inline-block rounded-full bg-teal-wash px-3 py-0.5 text-xs font-medium text-teal-deep">
                  {story.sector}
                </span>
                {story.sources && story.sources.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {story.sources.map((source) => (
                      <a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-slate-muted hover:text-teal underline-offset-2 hover:underline"
                      >
                        {source.label}
                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"/>
                          <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"/>
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
