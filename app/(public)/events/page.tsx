import type { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: '活動 | NTUTEC',
  description: 'NTUTEC 活動日曆：天使例會、Demo Day、工作坊、產業論壇。查看 2026 年度活動並線上報名。',
}

export default function EventsPage() {
  return (
    <>
      <PageHero title="活動" subtitle="Events" description="掌握台大創創中心最新活動資訊，與創新生態系保持連結。" />

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
            <p className="mt-4 text-center text-sm text-slate-muted">
              若活動日曆無法顯示，請來信{' '}
              <a href="mailto:ntutec@ntutec.com" className="text-teal-deep underline underline-offset-4">ntutec@ntutec.com</a>
              {' '}或查看{' '}
              <a href="https://www.facebook.com/ntutec" target="_blank" rel="noopener noreferrer" className="text-teal-deep underline underline-offset-4">Facebook 活動頁</a>。
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
