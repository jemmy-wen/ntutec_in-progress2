"use client";

import Link from "next/link";
import { Rocket, Building2, TrendingUp, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useRef, useState } from "react";

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

function TiltCard({
  card,
  i,
  hoveredIndex,
  setHoveredIndex,
  isInView,
}: {
  card: AudienceCard;
  i: number;
  hoveredIndex: number | null;
  setHoveredIndex: (v: number | null) => void;
  isInView: boolean;
}) {
  const Icon = card.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25, mass: 0.5 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 8);
    rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 6);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHoveredIndex(null);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setHoveredIndex(i)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Flowing glow between cards */}
      <AnimatePresence>
        {hoveredIndex === i && (
          <motion.span
            className="absolute inset-0 block rounded-2xl bg-teal-wash"
            layoutId="audienceHover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.05 } }}
          />
        )}
      </AnimatePresence>

      {/* 3D tilt card */}
      <motion.div
        ref={cardRef}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformPerspective: 1000,
        }}
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.55, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="group relative overflow-hidden rounded-2xl border border-stone-warm/60 bg-white will-change-transform"
      >
        {/* Shine overlay on tilt */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(135deg, oklch(1 0 0 / 0.07) 0%, transparent 60%)",
          }}
        />

        <div className={`relative h-48 lg:h-56 ${card.gradient}`}>
          <span className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wider text-charcoal">
            {card.label}
          </span>
        </div>

        <div className="p-6">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-wash text-teal">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-semibold text-charcoal">{card.title}</h3>
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
      </motion.div>
    </div>
  );
}

export default function AudienceCards() {
  const { ref, isInView } = useInView();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          {audiences.map((card, i) => (
            <TiltCard
              key={card.label}
              card={card}
              i={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
