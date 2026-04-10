import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import { getPostsByTag } from "@/lib/ghost";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "最新消息 | NTUTEC",
  description:
    "臺大創創中心最新消息、活動公告與媒體報導。",
};

export default async function NewsPage() {
  let posts: Awaited<ReturnType<typeof getPostsByTag>>["posts"] = [];
  let pagination: Awaited<ReturnType<typeof getPostsByTag>>["pagination"] = {
    page: 1,
    limit: 12,
    pages: 1,
    total: 0,
  };

  try {
    const result = await getPostsByTag("news", 1, 12);
    posts = result.posts;
    pagination = result.pagination;
  } catch {
    // Ghost may be unreachable — show empty state
  }

  return (
    <>
      <PageHero
        title="最新消息"
        subtitle="News"
        description="掌握臺大創創中心的最新動態與重要公告。"
      />

      <section className="section-spacing">
        <div className="container">
          {posts.length === 0 ? (
            <div className="rounded-2xl bg-stone p-12 text-center">
              <p className="text-slate-muted">目前沒有最新消息，敬請期待。</p>
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
