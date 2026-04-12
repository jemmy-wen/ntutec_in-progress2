import { Suspense } from 'react'
import type { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'
import ContactForm from '../../contact/ContactForm'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Contact Us | NTUTEC',
  description: 'Contact NTUTEC — address, phone, email, and office hours.',
  alternates: {
    canonical: 'https://tec.ntu.edu.tw/en/contact',
    languages: {
      'zh-TW': 'https://tec.ntu.edu.tw/contact',
      'en': 'https://tec.ntu.edu.tw/en/contact',
    },
  },
  robots: { index: false, follow: false },
}

export default function EnContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tec.ntu.edu.tw/en' },
        { name: 'Contact Us', url: 'https://tec.ntu.edu.tw/en/contact' },
      ]} />
      <PageHero title="Contact Us" subtitle="Contact" description="For inquiries or partnership proposals, we welcome you to get in touch." />

      <section className="section-spacing">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6">Send a Message</h2>
              <Suspense fallback={<div className="text-center py-8 text-slate-muted">Loading...</div>}>
                <ContactForm />
              </Suspense>
            </div>

            <div>
              <h2 className="mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-1 font-semibold">Address</h4>
                  <p className="text-slate-muted">
                    7F, Excellence Research Building<br />
                    NTU Shiyuan Campus<br />
                    18 Siyuan St, Zhongzheng District, Taipei
                  </p>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Email</h4>
                  <p><a href="mailto:ntutec@ntutec.com" className="text-teal-deep underline underline-offset-4">ntutec@ntutec.com</a></p>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Office Hours</h4>
                  <p className="text-slate-muted">Monday–Friday 09:00–18:00<br />Closed on weekends and public holidays</p>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-xl border border-stone-warm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.4!2d121.5338!3d25.0129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9b0e00000%3A0x0!2z5Y-w5YyX5biC5Lit5q2j5Y2A5oCd5rqQ5q61MTjomZ8!5e0!3m2!1szh-TW!2stw!4v1"
                  width="100%"
                  height="256"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NTUTEC Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
