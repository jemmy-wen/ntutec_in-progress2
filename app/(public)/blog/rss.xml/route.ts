import { getAllPosts } from '@/lib/ghost'

export const revalidate = 3600

const BASE_URL = 'https://tec.ntu.edu.tw'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = await getAllPosts()

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`
      const pubDate = new Date(post.published_at).toUTCString()
      const description = post.excerpt
        ? escapeXml(post.excerpt)
        : escapeXml(post.title)

      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag.name)}</category>`)
        .join('')

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      ${categories}
      ${post.feature_image ? `<enclosure url="${escapeXml(post.feature_image)}" type="image/jpeg" length="0" />` : ''}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NTUTEC 台大創創中心 部落格</title>
    <link>${BASE_URL}/blog</link>
    <description>台大創創中心最新消息、新創故事與產業觀點</description>
    <language>zh-TW</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/images/ntutec-logo.png</url>
      <title>NTUTEC 台大創創中心</title>
      <link>${BASE_URL}</link>
    </image>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
