import type { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: '活動 | NTUTEC',
  description: '臺大創創中心最新活動資訊，包含產業論壇、Demo Day、工作坊與交流活動。',
}

export default function EventsPage() {
  return (
    <>
      <PageHero title="活動" subtitle="Events" description="掌握臺大創創中心最新活動資訊，與創新生態系保持連結。" />

      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <iframe
              src="https://luma.com/embed/calendar/cal-3Is19rXjZT4OLAg/events"
              width="100%"
              height="600"
              frameBorder="0"
              style={{ border: '1px solid #bfcbda88', borderRadius: '12px' }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
              title="NTUTEC 活動日曆"
            />
          </div>
        </div>
      </section>
    </>
  )
}
