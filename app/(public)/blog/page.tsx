import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'
import { NotePencil } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: '部落格',
  description: '台大創創中心最新消息、新創故事與產業觀點。探索創業生態系的最前線報導。',
  alternates: {
    types: {
      'application/rss+xml': '/blog/rss.xml',
    },
  },
}

const MOCK_POSTS = [
  {
    id: '1', slug: 'amazingtalker-a-round',
    title: 'AmazingTalker 完成 A 輪 NT$4.3 億融資，用戶遍及 190+ 國家',
    excerpt: '台大創創中心 2020 年輔導校友 AmazingTalker，成功完成 A 輪 NT$4.3 億（US$15.5M）融資，年營收突破 NT$10 億，成為台灣教育科技代表性案例。',
    feature_image: null,
    feature_image_alt: null,
    published_at: '2026-03-15T08:00:00Z',
    reading_time: 4,
    primary_tag: { name: '新創故事' },
    primary_author: { name: 'NTUTEC 編輯部' },
  },
  {
    id: '2', slug: 'demo-day-2025-recap',
    title: '2025 Demo Day 圓滿落幕：74 位投資人到場、51 件媒合意向',
    excerpt: '台大創創中心年度最重磅活動 Demo Day 於 12 月盛大舉行，12 組新創登台路演，吸引 74 位投資人到場，現場達成 51 件媒合意向，創歷年新高。',
    feature_image: null,
    feature_image_alt: null,
    published_at: '2025-12-20T08:00:00Z',
    reading_time: 5,
    primary_tag: { name: '活動報導' },
    primary_author: { name: 'NTUTEC 編輯部' },
  },
  {
    id: '3', slug: 'ecoco-pre-a',
    title: 'ECOCO 宜可可完成 Pre-A 億元融資，台塑生醫領投',
    excerpt: '2021 年輔導校友 ECOCO 宜可可，專注智慧回收與循環經濟，AI 回收再生率達 95%，日前宣布完成億元 Pre-A 融資，由台塑生醫領投，合作品牌超過 70 家。',
    feature_image: null,
    feature_image_alt: null,
    published_at: '2025-11-10T08:00:00Z',
    reading_time: 3,
    primary_tag: { name: '新創故事' },
    primary_author: { name: 'NTUTEC 編輯部' },
  },
  {
    id: '4', slug: '2026-accelerator-open',
    title: '2026 台大加速器開跑：20 組新創確認入選，展開十個月深度輔導',
    excerpt: '台大加速器 2026 梯次正式開跑，共錄取 20 組來自 AI、生醫、硬科技與創新商模的新創團隊，即日起展開為期十個月的業師陪跑輔導旅程。',
    feature_image: null,
    feature_image_alt: null,
    published_at: '2026-03-01T08:00:00Z',
    reading_time: 3,
    primary_tag: { name: '計畫公告' },
    primary_author: { name: 'NTUTEC 編輯部' },
  },
  {
    id: '5', slug: 'turing-space-who-digital-id',
    title: 'Turing Space 獲 WHO 委託，開發 160 國數位國際青年證',
    excerpt: '台大創創中心校友 Turing Space 胡耀傑團隊，在區塊鏈數位身份領域深耕多年，近日獲世界衛生組織（WHO）委託，主導開發覆蓋 160 國的數位國際青年證系統。',
    feature_image: null,
    feature_image_alt: null,
    published_at: '2025-10-05T08:00:00Z',
    reading_time: 4,
    primary_tag: { name: '新創故事' },
    primary_author: { name: 'NTUTEC 編輯部' },
  },
  {
    id: '6', slug: 'angel-club-portfolio-2026q1',
    title: '台大天使會 2026 Q1 投資回顧：三案出手，聚焦 AI 醫療與微創手術',
    excerpt: '台大天使會在 2026 年第一季完成三筆投資，分別是 AHEAD Medicine、MoBagel 及思輔科技，聚焦 AI 醫療診斷、數據平台與微創手術導航等高潛力賽道。',
    feature_image: null,
    feature_image_alt: null,
    published_at: '2026-04-01T08:00:00Z',
    reading_time: 5,
    primary_tag: { name: '天使投資' },
    primary_author: { name: 'NTUTEC 編輯部' },
  },
]

export default async function BlogListPage() {
  const posts = MOCK_POSTS
  const pagination = { page: 1, pages: 1, total: posts.length }

  return (
    <>
      <PageHero title="部落格" subtitle="Blog" description="最新消息、新創故事與產業觀點" />

      <section className="section-spacing">
        <div className="container">
          {posts.length === 0 ? (
            <div className="rounded-2xl bg-stone p-12 text-center">
              <p className="mb-4 text-2xl font-semibold text-charcoal">Coming Soon</p>
              <p className="mb-2 text-slate-muted">內容即將上線，敬請期待。</p>
              <p className="text-sm text-slate-muted">
                在此之前，歡迎{' '}
                <a href="/podcast" className="text-teal-deep underline underline-offset-4">
                  收聽 TEC Talk Podcast
                </a>{' '}
                或關注我們的社群媒體。
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="card-hover group block overflow-hidden rounded-xl border border-stone-warm/60 bg-white"
                >
                  {post.feature_image ? (
                    <div className="relative aspect-[16/9] overflow-hidden bg-stone">
                      <Image
                        src={post.feature_image}
                        alt={post.feature_image_alt ?? `${post.primary_tag?.name || '文章'} 封面：${post.title.slice(0, 60)}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-stone">
                      <NotePencil size={36} weight="duotone" className="opacity-20 text-slate-muted" />
                    </div>
                  )}

                  <div className="p-5">
                    {post.primary_tag && (
                      <span className="inline-block rounded-full bg-teal-wash px-2.5 py-0.5 text-xs font-medium text-teal">
                        {post.primary_tag.name}
                      </span>
                    )}

                    <h3 className="mt-3 line-clamp-2 font-semibold text-charcoal transition-colors group-hover:text-teal-deep">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-muted">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-muted">
                      {post.primary_author && (
                        <span className="font-medium">{post.primary_author.name}</span>
                      )}
                      <time dateTime={post.published_at}>
                        {new Date(post.published_at).toLocaleDateString('zh-TW', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      {post.reading_time > 0 && <span>{post.reading_time} 分鐘閱讀</span>}
                    </div>
                  </div>
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

      {/* Newsletter signup */}
      <section className="border-t border-stone-warm bg-stone py-16">
        <div className="container max-w-2xl text-center">
          <h2 className="mb-3 text-2xl font-bold text-charcoal">訂閱電子報</h2>
          <p className="mb-6 text-slate-muted">
            每月精選創業資訊、新創動態與活動報名，直送信箱。
          </p>
          <a
            href="https://ntutec.ghost.io/#/portal/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-teal px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-deep"
          >
            免費訂閱
          </a>
          <p className="mt-3 text-xs text-slate-muted">隨時可取消訂閱，不會有垃圾郵件。</p>
        </div>
      </section>
    </>
  )
}
