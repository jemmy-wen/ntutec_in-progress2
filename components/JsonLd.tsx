/**
 * Generic JSON-LD injector for structured data.
 * Use for any schema.org types not already handled by dedicated components.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

const BASE_URL = 'https://tec.ntu.edu.tw'

/**
 * Build a BreadcrumbList JSON-LD object.
 * First item should be the home page; last item is the current page.
 */
export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  }
}
