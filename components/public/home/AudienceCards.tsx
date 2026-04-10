"use client";

import Link from "next/link";
import { Rocket, Building2, TrendingUp, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";

interface AudienceCard {
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  gradient: string;
}

const audiences: AudienceCard[] = [
  {
    label: "FOR STARTUPS",
    icon: Rocket,
    title: "新創團隊",
    description:
      "從技術驗證到市場擴展，加速器與車庫孵化器提供完整的輔導資源、業師網絡與募資對接。",
    href: "/programs",
    gradient: "bg-gradient-to-br from-teal/20 to-teal-deep/10",
  },
  {
    label: "FOR CORPORATES",
    icon: Building2,
    title: "企業夥伴",
    description:
      "透過創新競賽、聯合活動與諮詢服務，與頂尖新創團隊共創，驅動企業創新轉型。",
    href: "/corporate",
    gradient: "bg-gradient-to-br from-stone-warm to-stone",
  },
  {
    label: "FOR INVESTORS",
    icon: TrendingUp,
    title: "投資人",
    description:
      "加入天使俱樂部，優先接觸臺大頂尖硬科技新創，參與早期投資機會與獨家交流活動。",
    href: "/angel",
    gradient: "bg-gradient-to-br from-teal-deep/15 to-charcoal/5",
  },
];

export default function AudienceCards() {
  const { ref, isInView } = useInView();

  return (
    <section className="section-spacing bg-white">
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <p className="micro-label mb-2">Find Your Path</p>
          <h2>找到你的入口</h2>
          <p className="mt-4 text-lg text-slate-muted">
            無論你是新創團隊、企業或投資人，我們都有為你量身打造的資源與服務。
          </p>
        </div>

        <div ref={ref} className="grid gap-8 md:grid-cols-3">
          {audiences.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className={`card-hover group overflow-hidden rounded-2xl border border-stone-warm/60 bg-white transition-all duration-500 ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className={`relative h-48 lg:h-56 ${card.gradient}`}>
                  <span className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wider text-charcoal">
                    {card.label}
                  </span>
                </div>

                <div className="p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-wash text-teal">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-muted">
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal transition-colors hover:text-teal-deep"
                  >
                    了解更多
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
