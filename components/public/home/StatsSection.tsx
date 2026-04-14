"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "@/hooks/useInView";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const stats: Stat[] = [
  { value: 600, prefix: "近 ", suffix: " 支", label: "累計輔導新創團隊" },
  { value: 300, suffix: "+", label: "投資人與天使網絡" },
  { value: 35, suffix: " 家", label: "企業合作夥伴" },
  { value: 13, suffix: " 年", label: "深耕台大創業生態" },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function AnimatedCounter({
  value,
  suffix,
  prefix = "",
  duration = 1400,
  start,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  duration?: number;
  start: boolean;
}) {
  // Start from 85% of target to avoid "near 0" flash on large numbers.
  const startValue = Math.floor(value * 0.85);
  const [display, setDisplay] = useState(startValue);
  const rafRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    const startTime = performance.now();
    const delta = value - startValue;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(startValue + Math.round(easeOutCubic(progress) * delta));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [value, startValue, duration]);

  useEffect(() => {
    if (start) animate();
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [start, animate]);

  return (
    <span className="font-mono text-4xl font-bold tabular-nums text-white md:text-5xl lg:text-6xl">
      {prefix}{display}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="section-spacing relative overflow-hidden bg-charcoal pb-24">
      {/* Background ambient orbs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-10 h-64 w-64 rounded-full bg-teal-deep/15 blur-3xl" />
      {/* Fade to white for next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />

      <div className="container relative">
        <div className="mb-12 text-center">
          <p className="micro-label mb-2 text-teal-light">Social Proof</p>
          <h2 className="text-white">數字，見證我們的影響力。</h2>
        </div>

        <div
          ref={ref}
          className={`grid grid-cols-2 gap-8 md:grid-cols-4 transition-all duration-600 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Glow ring on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 ring-1 ring-teal/40 shadow-[0_0_30px_oklch(0.66_0.12_180/0.15)]" />

              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                start={isInView}
              />
              <span className="mt-3 inline-block h-1.5 w-1.5 rounded-full bg-teal" />
              <p className="mt-2 text-sm font-medium text-stone/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Exit Badge Row */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-center">
          <div className="flex items-center gap-2 text-sm text-stone/70">
            <span className="text-teal">✦</span>
            <span>歷屆校友最高單筆募資 <strong className="text-white">NT$1 億+</strong></span>
          </div>
          <div className="flex items-center gap-2 text-sm text-stone/70">
            <span className="text-teal">✦</span>
            <span>企業垂直加速器累計 <strong className="text-white">27 期</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
