import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
const totalCount = categories.reduce((sum, c) => sum + c.companies.length, 0);

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

        <div className="space-y-10">
          {categories.map((cat) => (
            <div key={cat.key}>
              <div className="mb-4 flex items-baseline justify-between border-b border-stone-warm/60 pb-2">
                <h3 className="text-base font-semibold text-charcoal">
                  {cat.label}
                </h3>
                <span className="text-xs text-slate-muted">
                  {cat.companies.length} 家
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {cat.companies.map((co) => (
                  <div
                    key={co.name_en}
                    className="flex flex-col items-center justify-center rounded-xl border border-stone-warm/40 bg-stone px-3 py-4 text-center transition-colors hover:bg-teal-wash/60"
                    title={`${co.name_en} · ${co.type}`}
                  >
                    <span className="text-sm font-semibold text-charcoal line-clamp-1">
                      {co.name_zh}
                    </span>
                    <span className="mt-1 text-[10px] uppercase tracking-wider text-slate-muted line-clamp-1">
                      {co.name_en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/corporate-partners"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep transition-colors hover:text-teal"
          >
            探索企業合作方式
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
