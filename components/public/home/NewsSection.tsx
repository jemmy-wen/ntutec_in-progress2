import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/ghost";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsSection() {
  let posts: Awaited<ReturnType<typeof getPosts>>["posts"] = [];

  try {
    const result = await getPosts(1, 3);
    posts = result.posts;
  } catch {
    // Ghost unreachable — render empty state gracefully
  }

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

        {posts.length === 0 ? (
          <div className="rounded-2xl bg-stone p-12 text-center">
            <p className="text-slate-muted">最新動態整理中，敬請期待。</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card-hover group block overflow-hidden rounded-xl border border-stone-warm/60 bg-white"
              >
                {post.feature_image ? (
                  <div className="aspect-[16/9] overflow-hidden bg-stone">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.feature_image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-stone" />
                )}

                <div className="p-5">
                  {post.primary_tag && (
                    <span className="inline-block rounded-full bg-teal-wash px-2.5 py-0.5 text-xs font-medium text-teal">
                      {post.primary_tag.name}
                    </span>
                  )}
                  <h3 className="mt-3 font-semibold text-charcoal group-hover:text-teal-deep transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-muted">
                    {formatDate(post.published_at)}
                  </p>
                  {post.excerpt && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-muted line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

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
