"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  href: string;
}

const news: NewsItem[] = [
  {
    id: "1",
    title: "2026 春季加速器 Demo Day 圓滿落幕",
    excerpt:
      "本屆 Demo Day 共有 12 組新創團隊登台發表，吸引超過 50 位投資人與企業代表參與。",
    date: "2026-04-01",
    category: "加速器",
    href: "/news/demo-day-2026-spring",
  },
  {
    id: "2",
    title: "天使俱樂部三月份例會精華回顧",
    excerpt:
      "三月例會聚焦生技醫療與 AI 兩大領域，三家新創獲得天使投資人高度關注。",
    date: "2026-03-28",
    category: "天使俱樂部",
    href: "/news/angel-club-march-2026",
  },
  {
    id: "3",
    title: "攜手國際企業推動開放式創新合作計畫",
    excerpt:
      "與三家跨國企業簽訂合作備忘錄，共同探索新創技術在產業端的應用場景。",
    date: "2026-03-15",
    category: "企業合作",
    href: "/news/corporate-innovation-partnership",
  },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="section-spacing bg-white">
      <div className="container">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="micro-label mb-2">Latest Updates</p>
            <h2>最新動態</h2>
          </div>
          <Link
            href="/news"
            className="hidden items-center gap-1.5 text-sm font-medium text-teal transition-colors hover:text-teal-deep sm:inline-flex"
          >
            查看全部
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div ref={ref} className="grid gap-8 md:grid-cols-3">
          {news.map((item, i) => (
            <div
              key={item.id}
              className={`transition-all duration-500 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Link
                href={item.href}
                className="card-hover group block overflow-hidden rounded-xl border border-stone-warm/60 bg-white"
              >
                <div className="h-48 bg-stone" />

                <div className="p-5">
                  <span className="inline-block rounded-full bg-teal-wash px-2.5 py-0.5 text-xs font-medium text-teal">
                    {item.category}
                  </span>
                  <h3 className="mt-3 font-semibold text-charcoal group-hover:text-teal-deep transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-muted">
                    {formatDate(item.date)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-muted line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal"
          >
            查看全部
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
