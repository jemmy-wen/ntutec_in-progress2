import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'NTUTEC — NTU\'s Entrepreneurship Ecosystem Hub',
  description:
    'Over 600 startup teams mentored in 13 years. NTUTEC connects NTU innovation to global impact through the NTU Accelerator, NTU Garage, Corporate Vertical Accelerator, and Angels Club.',
  alternates: {
    canonical: 'https://tec.ntu.edu.tw/en',
    languages: {
      'zh-TW': 'https://tec.ntu.edu.tw',
      'en': 'https://tec.ntu.edu.tw/en',
    },
  },
  openGraph: {
    title: 'NTUTEC — NTU\'s Entrepreneurship Ecosystem Hub',
    description:
      'Over 600 startup teams mentored in 13 years. Connecting NTU, industry, and capital.',
    url: 'https://tec.ntu.edu.tw/en',
    type: 'website',
  },
}

const connections = [
  {
    label: 'Connect to NTU',
    title: 'NTU Connection',
    description:
      "Bridging NTU's research energy and campus innovation units across all departments. No domain restrictions — transforming the best technologies and talents into investable startups.",
    proof: '600+ mentored teams (since 2013) · Open to all NTU departments',
    href: '/en/accelerator',
    cta: 'Learn About Programs',
    ctaBtn: 'Pre-register for 2027 Batch',
    ctaBtnHref: '/apply',
  },
  {
    label: 'Connect to Industry',
    title: 'Industry Connection',
    description:
      '35 corporate partnerships and counting. Pioneer of the Corporate Vertical Accelerator — corporations define challenges, startups solve them. Partners span technology, manufacturing, finance, and media sectors.',
    proof: '35 corporate partners · 27 batches of Corporate Vertical Accelerator',
    href: '/corporate',
    cta: 'Explore Corporate Partnerships',
    ctaBtn: 'Discuss Corporate Partnership',
    ctaBtnHref: '/corporate',
  },
  {
    label: 'Connect to Capital',
    title: 'Capital Connection',
    description:
      'NTUTEC Angels Club provides members with curated deal flow, rigorous three-stage due diligence, and monthly investment meetings. Access to 150+ investor network and VC connections.',
    proof: 'Three-stage screening · Monthly meetings · 150+ investor network',
    href: '/en/angel',
    cta: 'Access Deal Flow & Capital',
    ctaBtn: 'Apply for Angel Membership',
    ctaBtnHref: '/angel-apply',
  },
]

const stats = [
  { value: '600+', label: 'Startup Teams Mentored', sub: 'Since 2013' },
  { value: '300+', label: 'Investors & Angels Network', sub: '' },
  { value: '35+', label: 'Corporate Partners', sub: '' },
  { value: '13', label: 'Years at NTU', sub: 'Since 2013' },
]

export default function EnHomePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tec.ntu.edu.tw/en' },
      ]} />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/90 to-teal-deep/30" />
        <div className="container relative z-10 py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="micro-label text-teal-light mb-4">
                NTU TAIDAH ENTREPRENEURSHIP CENTER · NTU&apos;s Entrepreneurship Ecosystem Hub
              </p>
              <h1>
                <span className="block text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  NTUTEC
                </span>
                <span className="mt-2 block text-xl font-medium tracking-wide text-stone/70 sm:text-2xl">
                  Bridging NTU Innovation to Global Impact
                </span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-stone/80">
                From NTU to the world. Connecting industry. Reaching markets.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/apply" className="btn-pill-primary px-8 py-4 text-base block">
                  Apply for Incubation Program
                </Link>
                <Link
                  href="/en/about"
                  className="btn-pill-outline px-8 py-4 text-base block border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50"
                >
                  Learn About NTUTEC
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex lg:justify-center lg:items-center">
              <Image
                src="/images/photos/hero-main.jpg"
                alt="NTUTEC — Where Startups Take Off"
                width={600}
                height={300}
                className="rounded-2xl opacity-90 shadow-2xl"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Community Photo */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-8 text-center">
            <p className="micro-label mb-4">Community</p>
            <h2 className="mb-4">600+ Startups, Growing Together</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-muted">
              At the 2026 Incubation Program Launch, over 80 founders and mentors gathered at NTU to begin a ten-month entrepreneurship acceleration journey.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '21/9' }}>
            <Image
              src="/images/events/opening-2026-biggroup.jpg"
              alt="2026 Incubation Program Launch — Group Photo"
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          </div>
        </div>
      </section>

      {/* Three Connections */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="micro-label mb-2">Three Connections</p>
            <h2>What We Do — Three Connections</h2>
            <p className="mt-4 text-lg text-slate-muted">
              Connecting NTU, industry, and capital. With 13 years of experience, we transform the best technologies and talents into investable startups.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {connections.map((conn) => (
              <div
                key={conn.label}
                className="group relative overflow-hidden rounded-2xl border border-stone-warm/60 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-400"
              >
                <div className="relative">
                  <p className="micro-label text-teal mb-2">{conn.label}</p>
                  <h3 className="mb-3 text-2xl font-bold text-charcoal">{conn.title}</h3>
                  <p className="mb-5 leading-relaxed text-slate-muted">{conn.description}</p>
                  <div className="mb-6 rounded-lg bg-stone px-4 py-3">
                    <p className="text-sm font-medium text-charcoal">{conn.proof}</p>
                  </div>
                  <Link
                    href={conn.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep transition-colors hover:text-teal"
                  >
                    {conn.cta} →
                  </Link>
                  <Link
                    href={conn.ctaBtnHref}
                    className="mt-4 block w-full rounded-xl border border-teal text-center py-2 text-sm font-semibold text-teal hover:bg-teal hover:text-white transition-colors"
                  >
                    {conn.ctaBtn}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-spacing relative overflow-hidden bg-charcoal pb-24">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-10 h-64 w-64 rounded-full bg-teal-deep/15 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
        <div className="container relative">
          <div className="mb-12 text-center">
            <p className="micro-label mb-2 text-teal-light">Social Proof</p>
            <h2 className="text-white">By the Numbers</h2>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center"
              >
                <span className="font-mono text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  {stat.value}
                </span>
                <span className="mt-3 inline-block h-1.5 w-1.5 rounded-full bg-teal" />
                <p className="mt-2 text-sm font-medium text-stone/70">{stat.label}</p>
                {stat.sub && <p className="text-xs text-stone/50 mt-1">{stat.sub}</p>}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-center">
            <div className="flex items-center gap-2 text-sm text-stone/70">
              <span className="text-teal">✦</span>
              <span>Largest alumni fundraise <strong className="text-white">NT$100M+</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone/70">
              <span className="text-teal">✦</span>
              <span>Corporate vertical accelerator <strong className="text-white">27 batches</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* NTU Ecosystem Partners (reuse visual from Chinese page) */}
      <section className="section-spacing">
        <div className="container text-center">
          <p className="micro-label mb-4">Get Started</p>
          <h2 className="mb-6">Ready to Join NTUTEC?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">
            Whether you&apos;re a startup founder, corporate partner, or investor — NTUTEC has a path for you.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/apply" className="btn-pill-primary">Apply for Incubation Program</Link>
            <Link href="/en/angel" className="btn-pill-outline">Join Angels Club</Link>
            <Link href="/corporate" className="btn-pill-outline">Corporate Partnership</Link>
          </div>
        </div>
      </section>
    </>
  )
}
