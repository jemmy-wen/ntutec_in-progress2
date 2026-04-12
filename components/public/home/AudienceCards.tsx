"use client";

import Link from "next/link";
import Image from "next/image";
import { Rocket, Building2, TrendingUp, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";

interface AudienceCard {
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  cta: string;
  gradient: string;
  photo: string;
  photoAlt: string;
}

const audiences: AudienceCard[] = [
  {
    label: "FOR STARTUPS",
    icon: Rocket,
    title: "新創團隊",
    description:
      "從技術驗證到市場擴展，台大加速器與台大車庫提供完整的輔導資源、業師網絡與募資對接。",
    href: "/programs",
    cta: "立即預約 2027 登記",
    gradient: "bg-gradient-to-br from-teal/20 to-teal-deep/10",
    photo: "/images/events/demo-day-2025-booth2.jpg",
    photoAlt: "Demo Day 2025 — 新創創辦人展示成果",
  },
  {
    label: "FOR CORPORATES",
    icon: Building2,
    title: "企業夥伴",
    description:
      "透過創新競賽、聯合活動與諮詢服務，與頂尖新創團隊共創，驅動企業創新轉型。",
    href: "/corporate",
    cta: "啟動企業外部創新",
    gradient: "bg-gradient-to-br from-stone-warm to-stone",
    photo: "/images/events/demo-day-2025-booth1.jpg",
    photoAlt: "Demo Day 2025 — 新創展示攤位",
  },
  {
    label: "FOR INVESTORS",
    icon: TrendingUp,
    title: "投資人",
    description:
      "加入天使俱樂部，優先接觸台大頂尖硬科技新創，參與早期投資機會與獨家交流活動。",
    href: "/angel",
    cta: "了解更多",
    gradient: "bg-gradient-to-br from-teal-deep/15 to-charcoal/5",
    photo: "/images/events/demo-day-2025-03.jpg",
    photoAlt: "Demo Day 2025 — 投資人與新創合影",
  },
];

function TiltCard({
  card,
  i,
  isInView,
}: {
  card: AudienceCard;
  i: number;
  isInView: boolean;
}) {
  const Icon = card.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25, mass: 0.5 });

  // Dynamic shadow moves opposite to tilt — creates convincing light-source illusion
  const shadowX = useTransform(springY, (v) => -v * 2.5);
  const shadowY = useTransform(springX, (v) => v * 2.5);
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 32px oklch(0 0 0 / 0.12), 0 2px 8px oklch(0 0 0 / 0.06)`;

  const onMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced) return;
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
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX: prefersReduced ? 0 : springX,
        rotateY: prefersReduced ? 0 : springY,
        boxShadow,
        transformPerspective: 1000,
      }}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.55, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative overflow-hidden rounded-2xl border border-stone-warm/60 bg-white will-change-transform"
    >
      {/* Specular shine overlay — top-left light source */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, oklch(1 0 0 / 0.08) 0%, transparent 55%)",
        }}
      />

      <div className="relative h-48 lg:h-56 overflow-hidden">
        <Image
          src={card.photo}
          alt={card.photoAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wider text-charcoal z-10">
          {card.label}
        </span>
      </div>

      <div className="p-6">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-wash text-teal transition-transform duration-200 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-charcoal">{card.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-muted">
          {card.description}
        </p>
        {card.label === 'FOR STARTUPS' ? (
          <Link
            href={card.href}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal transition-colors hover:text-teal-deep"
          >
            {card.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <Link
            href={card.href}
            className="mt-4 inline-block px-4 py-2 bg-teal text-white text-sm font-semibold rounded-lg hover:bg-teal-deep transition-colors"
          >
            {card.cta}
          </Link>
        )}
      </div>
    </motion.div>
  );
}

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
          {audiences.map((card, i) => (
            <TiltCard key={card.label} card={card} i={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
