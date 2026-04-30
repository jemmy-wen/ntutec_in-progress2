import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import MentorsPageClient from '@/components/public/mentors/MentorsPageClient'
import { JsonLd } from '@/components/JsonLd'
import { ogImageUrl } from '@/lib/og'
import { MENTORS_STATIC } from '@/lib/data/mentors-static'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: '業師陣容 | NTUTEC',
  description: 'NTUTEC 歷年累計 80+ 位業師，涵蓋投資人、創業家、企業高管與產業專家。2026 陪跑業師 40+，平均逾 20 年產業深耕，為新創團隊提供一對一深度輔導。',
  alternates: { canonical: 'https://tec.ntu.edu.tw/mentors' },
  openGraph: {
    images: [{ url: ogImageUrl('NTUTEC 業師陣容', '80+ 位業師，平均逾 20 年產業深耕，一對一深度輔導', 'mentor'), width: 1200, height: 630 }],
  },
}

export default function MentorsPage() {
  const allMentors = MENTORS_STATIC

  const mentorsItemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'NTUTEC 台大創創中心業師陣容',
    description: '台大創創中心 2026 陪跑業師名單，涵蓋投資人、創業家、企業高管與產業專家',
    url: 'https://tec.ntu.edu.tw/mentors',
    numberOfItems: allMentors.length,
    itemListElement: allMentors.map((mentor, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        name: mentor.name,
        ...(mentor.title || mentor.highlight ? { jobTitle: mentor.highlight ?? mentor.title } : {}),
        worksFor: { '@type': 'Organization', name: 'NTUTEC 台大創創中心', url: 'https://tec.ntu.edu.tw' },
        ...(mentor.social_url ? { sameAs: [mentor.social_url] } : {}),
      },
    })),
  }

  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '業師陣容', url: 'https://tec.ntu.edu.tw/mentors' },
      ]} />
      <JsonLd data={mentorsItemListJsonLd} />
      <MentorsPageClient />
    </>
  )
}
