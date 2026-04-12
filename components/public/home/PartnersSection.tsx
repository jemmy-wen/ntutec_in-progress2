"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Partners with real logos — split into 2 rows for staggered infinite scroll
const ROW1 = [
  { name: "聯合報系 UDN", logo: "/images/partners/udn.svg", w: 120, h: 40 },
  { name: "友達光電 AUO", logo: "/images/partners/auo.svg", w: 100, h: 40 },
  { name: "遠傳電信 FET", logo: "/images/partners/fetnet.png", w: 100, h: 32 },
  { name: "康寧 Corning", logo: "/images/partners/corning.svg", w: 110, h: 32 },
  { name: "宏碁 Acer", logo: "/images/partners/acer.svg", w: 90, h: 30 },
  { name: "玉山銀行 E.SUN", logo: "/images/partners/esun-bank.svg", w: 110, h: 36 },
  { name: "天下雜誌 CommonWealth", logo: "/images/partners/commonwealth.svg", w: 120, h: 36 },
  { name: "聯經出版", logo: "/images/partners/linking-books.png", w: 120, h: 36 },
];

const ROW2 = [
  { name: "圓展 AVer", logo: "/images/partners/aver.svg", w: 100, h: 40 },
  { name: "AmazingTalker", logo: "/images/partners/amazingtalker.png", w: 130, h: 18 },
  { name: "三泰科技 Sunix", logo: "/images/partners/sunix.png", w: 120, h: 33 },
  { name: "東方線上", logo: "/images/partners/eastern-online.png", w: 120, h: 28 },
  { name: "農純鄉", logo: "/images/partners/nongchunxiang.png", w: 100, h: 40 },
  { name: "時報出版", logo: "/images/partners/reading-times.png", w: 100, h: 32 },
  { name: "經濟日報", logo: "/images/partners/economic-daily.png", w: 100, h: 25 },
];

function LogoRow({
  items,
  direction = "left",
}: {
  items: typeof ROW1;
  direction?: "left" | "right";
}) {
  // duplicate for seamless loop
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
      <ul
        className="flex w-max gap-12 py-4"
        style={{
          animation: `logo-scroll-${direction} 30s linear infinite`,
        }}
      >
        {doubled.map((p, i) => (
          <li
            key={`${p.name}-${i}`}
            className="shrink-0 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
          >
            <Image
              src={p.logo}
              alt={p.name}
              width={p.w}
              height={p.h}
              className="object-contain"
            />
          </li>
        ))}
      </ul>
      <style jsx>{`
        @keyframes logo-scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes logo-scroll-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        ul:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          ul { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section className="section-spacing bg-white">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="micro-label mb-2">Corporate Partners</p>
          <h2>精選合作企業夥伴</h2>
          <p className="mt-4 text-lg text-slate-muted">
            35 家歷年合作企業——從半導體、金融科技、媒體到消費品，
            以企業垂直加速器、創新競賽與案源媒合深度共創。
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <LogoRow items={ROW1} direction="left" />
        <LogoRow items={ROW2} direction="right" />
      </div>

      <div className="container mt-10 text-center">
        <Link
          href="/corporate"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep transition-colors hover:text-teal"
        >
          了解企業合作方案
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
