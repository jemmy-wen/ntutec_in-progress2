"use client";

import Link from "next/link";
import { GraduationCap, Building2, Coins, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "@/hooks/useInView";

interface Connection {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  proof: string;
  href: string;
  cta: string;
  glowColor: string;
}

const connections: Connection[] = [
  {
    icon: GraduationCap,
    label: "Connect to NTU",
    title: "連結台大",
    description:
      "串接台大各院系研究能量與校內創新單位，不設領域門檻，把最好的技術與人才轉化為可投資的新創。",
    proof: "逾 600 支輔導團隊（2013 至今）· 全校各院系開放申請",
    href: "/programs",
    cta: "了解輔導計畫",
    glowColor: "oklch(0.66 0.12 180 / 0.15)",
  },
  {
    icon: Building2,
    label: "Connect to Industry",
    title: "連結產業",
    description:
      "累計 35 家企業合作，首創企業垂直加速器，以企業出題、新創解題的模式共創。合作夥伴含 Nvidia、Synopsys、鴻海、玉山銀行、遠傳電信等國內外大廠。",
    proof: "35 家企業合作 · 27 期企業垂直加速器",
    href: "/corporate",
    cta: "探索企業合作",
    glowColor: "oklch(0.66 0.12 180 / 0.12)",
  },
  {
    icon: Coins,
    label: "Connect to Capital",
    title: "連結資本",
    description:
      "台大天使投資俱樂部提供會員優質案源、三段嚴格篩選機制與每月投資例會。所有案件經投資經理深度盡調，串接 150+ 投資人網絡與後續創投對接。",
    proof: "三段嚴選 · 月例會 · 150+ 投資人網絡",
    href: "/angel",
    cta: "獲取案源與對接資本",
    glowColor: "oklch(0.75 0.15 85 / 0.12)",
  },
];

export default function ThreeConnectionsSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="section-spacing bg-white">
      <div className="container">
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="micro-label mb-2">Three Connections</p>
          <h2>我們做的事情 — 三個連結</h2>
          <p className="mt-4 text-lg text-slate-muted">
            連結台大、連結產業、連結資本。用 13 年的累積，把最好的技術能量與人才，轉化成可投資的新創公司。
          </p>
        </motion.div>

        <div ref={ref} className="grid gap-8 lg:grid-cols-3">
          {connections.map((conn, i) => {
            const Icon = conn.icon;
            return (
              <motion.div
                key={conn.label}
                initial={{ opacity: 0, y: 36 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 36 }
                }
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative overflow-hidden rounded-2xl border border-stone-warm/60 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-400"
              >
                {/* Bottom glow that appears on hover */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 50% 100%, ${conn.glowColor} 0%, transparent 70%)`,
                  }}
                />

                {/* Animated top accent line */}
                <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gradient-to-r from-teal to-teal-deep rounded-t-2xl" />

                <div className="relative">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-wash text-teal-deep transition-all duration-300 group-hover:bg-teal-deep group-hover:text-white group-hover:shadow-[0_0_20px_oklch(0.46_0.12_180/0.3)]">
                    <Icon className="h-7 w-7" />
                  </div>

                  <p className="micro-label text-teal mb-2">{conn.label}</p>
                  <h3 className="mb-3 text-2xl font-bold text-charcoal">{conn.title}</h3>

                  <p className="mb-5 leading-relaxed text-slate-muted">
                    {conn.description}
                  </p>

                  <div className="mb-6 rounded-lg bg-stone px-4 py-3">
                    <p className="text-sm font-medium text-charcoal">{conn.proof}</p>
                  </div>

                  <Link
                    href={conn.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep transition-colors hover:text-teal"
                  >
                    {conn.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
