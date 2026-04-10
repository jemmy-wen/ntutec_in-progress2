"use client";
import Link from "next/link";
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
    </section>
  );
}
