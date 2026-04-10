import { TrendingUp, Trophy, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface AlumniStory {
  name: string;
  category: string;
  highlight: string;
  sector: string;
  icon?: "funding" | "award" | "exit";
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
