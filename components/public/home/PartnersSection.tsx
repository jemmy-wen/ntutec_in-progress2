"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import partnersData from "@/data/partners_historical.json";

interface Company {
  name_zh: string;
  name_en: string;
  type: string;
}

interface Category {
  key: string;
  label: string;
  companies: Company[];
}

// Logo wall: companies with successfully downloaded logos
const CORPORATE_PARTNERS = [
  { name: "聯合報系 UDN", logo: "/images/partners/udn.svg", width: 120, height: 40 },
  { name: "聯經出版", logo: "/images/partners/linking-books.png", width: 120, height: 36 },
  { name: "經濟日報", logo: "/images/partners/economic-daily.png", width: 100, height: 25 },
  { name: "圓展 AVer", logo: "/images/partners/aver.svg", width: 100, height: 40 },
  { name: "時報出版", logo: "/images/partners/reading-times.png", width: 100, height: 32 },
  { name: "農純鄉", logo: "/images/partners/nongchunxiang.png", width: 100, height: 40 },
  { name: "三泰科技 Sunix", logo: "/images/partners/sunix.png", width: 120, height: 33 },
  { name: "東方線上", logo: "/images/partners/eastern-online.png", width: 120, height: 28 },
  { name: "友達光電 AUO", logo: "/images/partners/auo.svg", width: 100, height: 40 },
  { name: "遠傳電信 FET", logo: "/images/partners/fetnet.png", width: 100, height: 32 },
  { name: "康寧 Corning", logo: "/images/partners/corning.svg", width: 110, height: 32 },
  { name: "宏碁 Acer", logo: "/images/partners/acer.svg", width: 90, height: 30 },
  { name: "玉山銀行 E.SUN", logo: "/images/partners/esun-bank.svg", width: 110, height: 36 },
  { name: "AmazingTalker", logo: "/images/partners/amazingtalker.png", width: 130, height: 18 },
  { name: "天下雜誌 CommonWealth", logo: "/images/partners/commonwealth.svg", width: 120, height: 36 },
];

const categories = partnersData.categories as Category[];
const allCompanies = categories.flatMap((c) => c.companies);
const totalCount = allCompanies.length;

// Split into two rows for staggered scroll
const row1 = allCompanies.filter((_, i) => i % 2 === 0).map((c) => ({
  name: c.name_zh,
  name_en: c.name_en,
  type: c.type,
}));
const row2 = allCompanies.filter((_, i) => i % 2 === 1).map((c) => ({
  name: c.name_zh,
  name_en: c.name_en,
  type: c.type,
}));

export default function PartnersSection() {
  return (
    <section className="section-spacing bg-white">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="micro-label mb-2">Trusted Since 2013</p>
          <h2>歷年合作企業</h2>
          <p className="mt-4 text-lg text-slate-muted">
            13 年來累計 {totalCount}+ 家企業夥伴參與垂直加速器、企業創新教育、創業競賽與案源媒合。
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <InfiniteMovingCards items={row1} direction="left" speed="slow" />
        <InfiniteMovingCards items={row2} direction="right" speed="slow" />
      </div>

      <div className="container mt-10 text-center">
        <Link
          href="/corporate-partners"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep transition-colors hover:text-teal"
        >
          探索企業合作方式
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* 歷年合作企業 logo wall */}
      <div className="container mt-16">
        <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-slate-500 mb-8">
          精選合作企業
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {CORPORATE_PARTNERS.map((p) => (
            <div
              key={p.name}
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={p.width}
                height={p.height}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
