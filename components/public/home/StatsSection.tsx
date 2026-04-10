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
  { value: 200, suffix: "+", label: "輔導新創團隊" },
  { value: 30, suffix: "億+", label: "累計募資金額", prefix: "NT$" },
  { value: 80, suffix: "+", label: "天使投資人" },
  { value: 10, suffix: "年+", label: "加速器經驗" },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function AnimatedCounter({
  value,
  suffix,
  prefix = "",
  duration = 2000,
  start,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  duration?: number;
  start: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.round(easeOutCubic(progress) * value));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [value, duration]);

  useEffect(() => {
    if (start) animate();
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [start, animate]);

  return (
    <span className="font-mono text-4xl font-bold tabular-nums text-charcoal md:text-5xl lg:text-6xl">
      {prefix}{display}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="section-spacing bg-stone">
      <div className="container">
        <div className="mb-12 text-center">
          <p className="micro-label mb-2">Social Proof</p>
          <h2>用數據說話</h2>
        </div>

        <div
          ref={ref}
          className={`grid grid-cols-2 gap-8 md:grid-cols-4 transition-all duration-600 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                start={isInView}
              />
              <span className="mt-3 inline-block h-1.5 w-1.5 rounded-full bg-teal" />
              <p className="mt-2 text-sm font-medium text-slate-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
