import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "最新消息 | NTUTEC",
  description:
    "掌握台大創創中心最新消息——輔導計畫錄取公告、Demo Day 報名、天使例會活動與媒體報導，第一時間不錯過。",
  robots: { index: false, follow: false },
};

const MOCK_NEWS = [
  {
    id: '1', slug: '2026-accelerator-open',
    title: '【錄取公告】2026 台大加速器 20 組新創正式入選',
    excerpt: '2026 梯次台大加速器錄取結果公告，共 20 組新創入選，3 月正式開跑十個月深度輔導。',
    published_at: '2026-03-01T08:00:00Z',
    primary_tag: { name: '計畫公告' },
  },
  {
    id: '2', slug: 'demo-day-2025-recap',
    title: '【活動報導】2025 Demo Day 圓滿落幕，74 位投資人到場',
    excerpt: '年度 Demo Day 於 12 月舉行，12 組新創路演，達成 51 件媒合意向，創歷年新高。',
    published_at: '2025-12-20T08:00:00Z',
    primary_tag: { name: '活動報導' },
  },
  {
    id: '3', slug: '2027-garage-apply',
    title: '【申請開放】2027 台大車庫申請即將開放，12 月起受理',
    excerpt: '2027 梯次台大車庫將於 12 月至 1 月開放申請，歡迎具台大身分的早期創業團隊報名。',
    published_at: '2025-11-15T08:00:00Z',
    primary_tag: { name: '申請公告' },
  },
  {
    id: '4', slug: 'angel-monthly-nov2025',
    title: '【天使例會】11 月天使例會報名開放，3 組新創上台路演',
    excerpt: '11 月天使例會將於台大水源校區卓越研究大樓舉行，本期共 3 組優質新創上台，歡迎會員出席。',
    published_at: '2025-10-28T08:00:00Z',
    primary_tag: { name: '天使例會' },
  },
  {
    id: '5', slug: 'media-coverage-oct2025',
    title: '【媒體報導】台大創創中心獲《數位時代》專題報導，深耕 13 年生態系成果獲肯定',
    excerpt: '《數位時代》特別企劃專訪台大創創中心執行長林文欽，深度剖析中心如何在 13 年間輔導 600+ 新創、建立三方生態系。',
    published_at: '2025-10-10T08:00:00Z',
    primary_tag: { name: '媒體報導' },
  },
]

export default async function NewsPage() {
  const posts = MOCK_NEWS;
  const pagination = { page: 1, pages: 1, total: posts.length };

  return (
    <>
      <PageHero
        title="最新消息"
        subtitle="News"
        description="掌握台大創創中心的最新動態與重要公告。"
      />

      <section className="section-spacing">
        <div className="container">
          {posts.length === 0 ? (
            <div className="rounded-2xl bg-stone p-12 text-center">
              <p className="mb-4 text-slate-muted">目前沒有最新消息，敬請期待。</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/blog" className="btn-pill-outline text-sm">瀏覽部落格</a>
                <a href="/podcast" className="btn-pill-outline text-sm">收聽 Podcast</a>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="card-hover group block rounded-2xl bg-white p-6"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <time className="text-sm text-slate-muted">
                      {new Date(post.published_at).toLocaleDateString("zh-TW", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    {post.primary_tag && (
                      <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal-deep">
                        {post.primary_tag.name}
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold group-hover:text-teal-deep transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="line-clamp-2 text-slate-muted leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}

          {pagination.pages > 1 && (
            <div className="mt-12 text-center text-sm text-slate-muted">
              第 {pagination.page} / {pagination.pages} 頁（共 {pagination.total} 篇）
            </div>
          )}
        </div>
      </section>
    </>
  );
}
