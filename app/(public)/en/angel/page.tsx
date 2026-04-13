import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'
import Image from 'next/image'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import { Target, ClipboardText, Handshake, TrendUp, Flask, Microphone, Briefcase } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'NTUTEC ANGELS | NTUTEC',
  description:
    'NTUTEC ANGELS: monthly curated deals from NTU\'s ecosystem, three-stage rigorous due diligence, named voting mechanism — join 40+ angel investors co-investing in early-stage startups. Individual membership NT$50,000/year.',
  alternates: {
    canonical: 'https://tec.ntu.edu.tw/en/angel',
    languages: {
      'zh-TW': 'https://tec.ntu.edu.tw/angel',
      'en': 'https://tec.ntu.edu.tw/en/angel',
    },
  },
  openGraph: {
    title: 'NTUTEC ANGELS',
    description: '40+ angel investors, monthly meetings, three-stage rigorous due diligence. The most active early-stage investment community in NTU\'s ecosystem.',
    url: 'https://tec.ntu.edu.tw/en/angel',
  },
}

const recentInvestments = [
  {
    name: 'AHEAD Medicine',
    round: '2025 Q4',
    sector: 'Biotech · AI Diagnostics',
    description: 'AI medical diagnostic platform founded by NTU Medical School alumna Andrea Wang, helping physicians reduce X-ray interpretation time. Received investment from the Angels Club.',
  },
  {
    name: 'MoBagel',
    round: '2026 Q1',
    sector: 'AI · Data Analytics',
    description: 'Founded by NTU Garage and Accelerator alumnus, serving over 200 enterprise clients with an AI/data analytics platform. Recently completed Angels Club investment.',
  },
  {
    name: 'SAVFE',
    round: '2026 Q1',
    sector: 'Hard Tech · Surgical Navigation',
    description: 'Founded by NTU Garage and Accelerator alumnus, developing image-guided intelligent robotic arms with mechanical positioning technology for minimally invasive surgical navigation. Completed Angels Club investment and actively expanding into the US market.',
  },
]

const highlights = [
  {
    icon: Target,
    title: 'Curated Quality Deals',
    description: 'Every deal goes through three rigorous screening stages, personally due-diligenced by investment managers. Skip the time cost of self-screening and directly access quality startups that have passed high-threshold evaluation.',
  },
  {
    icon: ClipboardText,
    title: 'Complete Investment Memos',
    description: 'Every startup presented at monthly meetings comes with a complete DD memo: market analysis, financial models, competitive advantages, risk assessment, and Term Sheet recommendations to support your investment decisions.',
  },
  {
    icon: Handshake,
    title: 'Flexible Direct Investment',
    description: 'Members invest directly with personal funds, unconstrained by institutional co-investment restrictions. Investment amounts are self-determined with complete control over timing and scale.',
  },
  {
    icon: TrendUp,
    title: 'Long-term Ecosystem Support',
    description: 'Connected to 13 years of accumulated mentor networks, alumni resources, and 35 corporate partners — portfolio companies receive not just capital, but sustained ecosystem momentum.',
  },
]

const monthlySteps = [
  { icon: ClipboardText, title: 'Deal Sourcing', desc: 'Applications, mentor referrals, or alumni introductions' },
  { icon: Flask, title: 'Three-Stage Screening', desc: 'Investment managers lead the full due diligence process' },
  { icon: ClipboardText, title: 'Information Cards', desc: 'Available before monthly meeting with complete investment summary' },
  { icon: Microphone, title: 'Angel Meeting', desc: 'Startup pitch and Q&A with real-time member interaction' },
  { icon: ClipboardText, title: 'Named Voting', desc: 'Members indicate interest in investing and explain their preferences' },
  { icon: Briefcase, title: 'Direct Investment', desc: 'Members invest directly as individuals; center assists with documentation' },
]

const gateProcess = [
  {
    stage: 'Gate 1',
    title: 'Initial Screening (Hard Filter)',
    description: 'Basic qualification and domain fit screening — confirming deals align with focus areas (AI software, biotech & healthcare, hard tech, innovative business models).',
  },
  {
    stage: 'Gate 2',
    title: 'Rapid Scoring',
    description: 'Multi-dimensional scoring on team, business model, market size, competitive advantages, execution capability — investment managers evaluate readiness for the next stage.',
  },
  {
    stage: 'Gate 3',
    title: 'Full DD Report',
    description: 'Complete investment evaluation report including market analysis, financial models, and Term Sheet recommendations. Approved deals proceed to pitch at monthly meetings.',
  },
]

const membershipTiers = [
  {
    name: 'Individual Member',
    subtitle: 'Angel Investor · Corporate Executive',
    price: 'NT$50,000',
    period: '/year',
    featured: false,
    benefits: [
      'Monthly curated startup information cards',
      'Complete DD memos and due diligence materials',
      'Monthly meeting attendance and named voting rights',
      '40+ angel investor community networking',
      'Post-investment portfolio tracking updates',
      'Post-meeting startup site visits',
    ],
  },
  {
    name: 'Corporate Member',
    subtitle: 'CVC · VC · Financial Institutions · Corporate Groups',
    price: 'NT$100,000',
    period: '/year',
    featured: true,
    badge: 'Recommended',
    benefits: [
      'Up to 3 designated representatives',
      'All individual member benefits included',
      'Priority corporate visit arrangements',
      'Brand exposure and co-investment opportunities',
      'Dedicated deal referral channel',
      'Annual investment trend report',
    ],
  },
]

const requirements = [
  'Interest in early-stage startup investment and willingness to invest time and resources',
  'Alignment with NTUTEC\'s mission and values',
  'Willingness to participate in monthly angel meetings and related activities',
]

export default function EnAngelPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tec.ntu.edu.tw/en' },
        { name: 'NTUTEC ANGELS', url: 'https://tec.ntu.edu.tw/en/angel' },
      ]} />
      <PageHero
        title="NTUTEC ANGELS"
        subtitle="Angel Investment Club"
        description="An angel investment community centered on NTU's entrepreneurship ecosystem. Monthly curated quality deals, three-stage rigorous due diligence, named voting — co-invest with 40+ angel members (150+ investor network) in early-stage startups."
      />

      {/* Stat bar */}
      <section className="border-b border-border/40 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 divide-x divide-border/40 md:grid-cols-4">
            {[
              { value: '40+', label: 'Angel Members' },
              { value: 'Monthly', label: 'Regular Angel Meetings' },
              { value: '2023', label: 'Club Founded' },
              { value: '3 Gates', label: 'Rigorous Screening' },
            ].map((s) => (
              <div key={s.label} className="px-6 py-5 text-center">
                <div className="text-2xl font-bold text-charcoal">{s.value}</div>
                <div className="mt-0.5 text-xs text-slate-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Investments */}
      <section className="section-spacing bg-charcoal text-white">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-bold tracking-widest text-teal">TRACK RECORD</p>
            <h2 className="text-white">Recent Investments</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {recentInvestments.map((inv) => (
              <div
                key={inv.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-teal/20 px-3 py-0.5 text-xs font-semibold text-teal">{inv.round}</span>
                  <span className="text-xs text-white/40">{inv.sector}</span>
                </div>
                <h4 className="mb-3 text-lg font-semibold leading-snug text-white">{inv.name}</h4>
                <p className="text-sm leading-relaxed text-white/60">{inv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Member Benefits</p>
            <h2>Why Join the Angels Club</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {highlights.map((benefit) => (
              <div key={benefit.title} className="card-hover rounded-2xl bg-white p-8">
                <benefit.icon size={36} weight="duotone" className="mb-4 text-teal" />
                <h3 className="mb-3 text-xl font-semibold">{benefit.title}</h3>
                <p className="text-slate-muted leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Cycle */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">How It Works</p>
            <h2 className="mb-4">Monthly Process</h2>
            <p className="text-lg text-slate-muted">From deal sourcing to investment decision — every step has a clear process.</p>
          </div>

          {/* Desktop: horizontal flow */}
          <div className="hidden lg:flex items-start gap-0">
            {monthlySteps.map((s, i) => (
              <div key={s.title} className="flex flex-1 items-start">
                <div className="flex-1 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                    <s.icon size={24} weight="duotone" className="text-teal" />
                  </div>
                  <div className="mb-1 text-xs font-bold tracking-widest text-teal">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="mb-1 text-sm font-semibold">{s.title}</h4>
                  <p className="text-xs leading-relaxed text-slate-muted">{s.desc}</p>
                </div>
                {i < monthlySteps.length - 1 && (
                  <div className="mt-7 shrink-0 px-1 text-slate-300 text-lg">→</div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical list */}
          <div className="grid gap-4 lg:hidden">
            {monthlySteps.map((s, i) => (
              <div key={s.title} className="flex items-start gap-4 rounded-xl bg-white p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <s.icon size={20} weight="duotone" className="text-teal shrink-0" />
                    <h4 className="font-semibold">{s.title}</h4>
                  </div>
                  <p className="mt-1 text-sm text-slate-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three-Stage Screening */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="micro-label mb-4">Screening Process</p>
            <h2 className="mb-4">Three-Stage Rigorous Screening</h2>
            <p className="text-lg text-slate-muted">
              Every deal presented at monthly meetings has undergone complete due diligence by investment managers — rigorous screening, never presented lightly.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {gateProcess.map((gate, idx) => (
              <div key={gate.stage} className="relative rounded-2xl border border-stone-warm/60 bg-white p-6">
                <div className="mb-4 inline-flex h-10 items-center justify-center rounded-full bg-teal px-4 text-sm font-bold text-white">
                  {gate.stage}
                </div>
                <h4 className="mb-2 text-lg font-semibold">{gate.title}</h4>
                <p className="text-sm leading-relaxed text-slate-muted">{gate.description}</p>
                {idx < gateProcess.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block">
                    <div className="text-2xl text-teal/40">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Membership</p>
            <h2 className="mb-4">Membership Plans</h2>
            <p className="text-lg text-slate-muted">Annual fee structure, applications accepted at any time, subject to review.</p>
            <p className="mt-2 text-sm text-slate-muted">After submitting an application, the investment team will review your materials. Approved applicants will be scheduled for an interview to confirm mutual fit before formal membership.</p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {membershipTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 ${
                  tier.featured ? 'bg-charcoal text-white shadow-xl' : 'border-2 border-stone-warm bg-white'
                }`}
              >
                {'badge' in tier && tier.badge && (
                  <span className="absolute right-6 top-6 rounded-full bg-teal px-3 py-1 text-xs font-bold text-white">
                    {tier.badge}
                  </span>
                )}
                <h3 className={`text-xl font-bold ${tier.featured ? 'text-white' : 'text-charcoal'}`}>
                  {tier.name}
                </h3>
                <p className={`mt-1 text-sm ${tier.featured ? 'text-white/50' : 'text-slate-muted'}`}>
                  {tier.subtitle}
                </p>
                <div className="my-6 flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${tier.featured ? 'text-white' : 'text-charcoal'}`}>
                    {tier.price}
                  </span>
                  <span className={`text-sm ${tier.featured ? 'text-white/50' : 'text-slate-muted'}`}>
                    {tier.period}
                  </span>
                </div>
                <ul className="mb-8 space-y-3">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 shrink-0 text-teal">✓</span>
                      <span className={tier.featured ? 'text-white/75' : 'text-slate-muted'}>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/angel-apply"
                  className={`block w-full rounded-xl py-3 text-center font-semibold transition-colors ${
                    tier.featured
                      ? 'bg-teal text-white hover:bg-teal-deep'
                      : 'bg-charcoal text-white hover:bg-charcoal/90'
                  }`}
                >
                  Apply for Membership Review
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <p className="micro-label mb-4">Requirements</p>
            <h2 className="mb-6">Membership Eligibility</h2>
            <ul className="space-y-4">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3 text-slate-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-muted">
              For payment details and further information, please see the application page or contact us directly.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate cross-link */}
      <div className="container pb-4">
        <div className="mt-6 p-4 border border-teal/20 rounded-lg bg-teal/5">
          <p className="text-sm text-gray-600">
            Corporations may also participate in the early-stage investment ecosystem through the Corporate Vertical Accelerator program.{' '}
            <Link href="/corporate" className="text-teal hover:underline">Learn about corporate partnership options</Link>
          </p>
        </div>
      </div>

      {/* Demo Day */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="micro-label mb-4">Demo Day</p>
            <h2 className="mb-4">Annual Investment Matching Event</h2>
            <p className="text-lg text-slate-muted">
              Every December at NTU campus, selected startups pitch to investors. Angels Club members receive priority seats and post-investment tracking.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[
              { value: '74', unit: '', label: 'Investors in Attendance', sub: 'VCs and Angel Investors' },
              { value: '51', unit: '', label: 'Investment Matches', sub: '18 self-initiated + 33 center-facilitated' },
              { value: '9,775', unit: '', label: 'Accupass Views', sub: 'Highest record in 7 editions' },
              { value: '9.06', unit: '/10', label: 'Event Satisfaction', sub: '51 on-site surveys' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border bg-white p-6 text-center card-hover">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-teal">{stat.value}</span>
                  {stat.unit && <span className="text-xl font-semibold text-teal">{stat.unit}</span>}
                </div>
                <p className="mt-2 font-semibold text-charcoal">{stat.label}</p>
                <p className="mt-1 text-xs text-slate-muted">{stat.sub}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 mb-8">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image src="/images/events/demo-day-2025-group.jpg" alt="Demo Day 2025 — Group Photo" fill loading="lazy" className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
            </div>
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image src="/images/events/demo-day-2025-05.jpg" alt="Demo Day 2025 — Investor Panel" fill loading="lazy" className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
            </div>
          </div>
          <div className="text-center">
            <Link href="/demo-day" className="btn-pill-outline">Learn More About Demo Day</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container text-center">
          <h2 className="mb-4">Become a Member of the Angels Club</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">
            Join NTU&apos;s entrepreneurship ecosystem angels and discover early-stage startups that will shape the future. Individual membership NT$50,000/year, corporate membership NT$100,000/year — applications accepted at any time, subject to review.
          </p>
          <Link href="/angel-apply" className="btn-pill-primary">Apply for Membership Review</Link>
          <p className="text-xs text-slate-muted text-center mt-3">
            Angel investing carries significant risks. The investment cases above represent historical performance and do not guarantee future investment results.
          </p>
          <p className="mt-4 text-sm text-slate-muted">
            Have questions?{' '}
            <Link href="/faq" className="underline underline-offset-4 hover:text-teal">View FAQ</Link>
            {' '}or email ntutec@ntutec.com
          </p>
        </div>
      </section>
    </>
  )
}
