import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/public/PageHero'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import { House, RocketLaunch, ChartBar, Fire, Target, Handshake, Buildings } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Startup Programs | NTUTEC',
  description:
    'NTU Accelerator and NTU Garage — free ten-month incubation programs with 40+ active mentors, 35 corporate partners, and a 150+ investor network. Find the right program for your stage.',
  alternates: {
    canonical: 'https://tec.ntu.edu.tw/en/programs',
    languages: {
      'zh-TW': 'https://tec.ntu.edu.tw/programs',
      en: 'https://tec.ntu.edu.tw/en/programs',
    },
  },
  openGraph: {
    title: 'Startup Programs | NTUTEC',
    description:
      'NTU Accelerator × NTU Garage · Free 10-month programs · 40+ active mentors · 35 corporate partners · 150+ investor network',
    url: 'https://tec.ntu.edu.tw/en/programs',
  },
}

const programs = [
  {
    icon: House,
    name: 'NTU Garage',
    subtitle: 'Early-Stage Incubator',
    duration: '10 months (March – December)',
    target: 'Early-stage teams (NTU students, alumni, or faculty; external teams considered case-by-case)',
    features: [
      'Domain mentor group consultations (4–5 teams in the same vertical)',
      'Free virtual residency with access to meeting rooms and event spaces',
      '3 key checkpoints: Problem-Solution Fit / Business Model Validation / Traction',
      'Priority pathway to the NTU Accelerator upon graduation',
    ],
    href: '/en/garage',
    primary: false,
    cta: 'Pre-register for 2027 Cohort',
  },
  {
    icon: RocketLaunch,
    name: 'NTU Accelerator',
    subtitle: 'Growth-Stage Accelerator',
    duration: '10 months (March – December)',
    target: 'Growth-stage startups (no NTU affiliation required; NTU-affiliated applicants receive priority)',
    features: [
      'Monthly one-on-one deep mentorship with dedicated mentors',
      'OKR Tracker for progress monitoring; monthly Office Hours by appointment',
      'Corporate resource connections and Demo Day fundraising pitch',
      '150+ investor network with NTUTEC Angels Club matching',
    ],
    href: '/en/accelerator',
    primary: true,
    cta: 'Pre-register for 2027 Cohort',
  },
]

export default function EnProgramsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://tec.ntu.edu.tw/en' },
          { name: 'Programs', url: 'https://tec.ntu.edu.tw/en/programs' },
        ]}
      />
      <PageHero
        title="Startup Programs"
        subtitle="Programs"
        description="We match the right resources to every stage of your startup journey — from early concept to market growth."
      />

      {/* Banner Photo */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '21/8' }}>
        <Image
          src="/images/events/opening-2026-biggroup.jpg"
          alt="2026 Program Launch — Over 60 participants group photo"
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
      </div>

      <section className="section-spacing">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {programs.map((program) => (
              <div key={program.name} className="flex flex-col rounded-2xl border bg-white p-8 card-hover">
                <program.icon size={36} weight="duotone" className="text-teal" />
                <h3 className="mt-4">{program.name}</h3>
                <p className="text-sm text-slate-muted">{program.subtitle}</p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="micro-label">Duration</span>
                    <span className="text-sm text-charcoal">{program.duration}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="micro-label mt-0.5 shrink-0">Eligibility</span>
                    <span className="text-sm text-charcoal">{program.target}</span>
                  </div>
                </div>
                <ul className="mt-6 flex-1 space-y-2">
                  {program.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm leading-relaxed text-slate-muted">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={program.href} className={`mt-8 ${program.primary ? 'btn-pill-primary' : 'btn-pill-outline'}`}>
                  {program.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Methodology */}
          <section className="mt-16 rounded-2xl bg-stone p-8">
            <p className="micro-label mb-4 text-center">Methodology</p>
            <h2 className="text-center mb-8">Our Coaching Framework</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: ChartBar,
                  title: 'OKR Tracker',
                  description: 'All coaching is structured around key results and milestone tracking. Teams submit progress reports before each session.',
                },
                {
                  icon: Fire,
                  title: 'Mentor Diagnostic Sessions',
                  description: '3-minute update + 12-minute mentor deep-dive + 5-minute peer sharing — 20 minutes of high-intensity structured review.',
                },
                {
                  icon: Target,
                  title: 'Three Key Review Checkpoints',
                  description: 'Problem-Solution Fit → Business Model Validation → Traction. Each checkpoint builds on the last with increasing rigor.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-6">
                  <item.icon size={28} weight="duotone" className="text-teal" />
                  <h4 className="mt-3 mb-2">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Coaching Mechanisms */}
          <section className="mt-16 rounded-2xl bg-stone p-8">
            <p className="micro-label mb-4 text-center">Coaching Mechanism</p>
            <h2 className="text-center mb-8">How We Support Your Startup</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: 'Program Manager Accompaniment',
                  badge: 'NTU Garage',
                  description: 'A dedicated program manager walks alongside your team throughout — monthly check-ins, MVP validation support, user interviews, and milestone pacing.',
                },
                {
                  icon: Handshake,
                  title: 'Mentor 1-on-1 Consultations',
                  badge: 'NTU Accelerator',
                  description: 'Matched with mentors carrying backgrounds from leading global firms, scheduled one-on-one sessions address your specific growth bottlenecks with precision.',
                },
                {
                  icon: Buildings,
                  title: 'Corporate Validation Environments',
                  badge: 'Corporate Vertical Accelerator',
                  description: 'Matched with large enterprises that provide real-world market testing environments. Corporate PMs co-drive projects, helping startups cross the valley of death and accelerate product-market fit.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-6">
                  <item.icon size={28} weight="duotone" className="text-teal" />
                  <div className="mt-3 mb-1 inline-block rounded-full bg-teal/10 px-2.5 py-0.5 text-xs font-medium text-teal">{item.badge}</div>
                  <h4 className="mb-2">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Application Timeline */}
          <section className="mt-16">
            <div className="text-center mb-8">
              <p className="micro-label mb-4">Application Timeline</p>
              <h2>When to Apply</h2>
              <p className="mt-3 text-base text-slate-muted">Programs run for ten months (March – December); application period is separate</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { month: 'Dec 2026 – Jan 2027 (2027 Cohort)', label: 'Applications Open', desc: 'Submit online application form' },
                { month: 'February', label: 'Results Announced', desc: 'Selected team list published' },
                { month: 'March – December', label: 'Program Begins', desc: 'Mentorship + checkpoint reviews' },
                { month: 'December', label: 'Demo Day', desc: 'Pitch to investors and graduate' },
              ].map((step) => (
                <div key={step.month} className="rounded-xl border bg-white p-5 text-center">
                  <p className="text-sm font-bold text-teal">{step.month}</p>
                  <p className="mt-1 font-semibold text-charcoal">{step.label}</p>
                  <p className="mt-1 text-xs text-slate-muted">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-16 rounded-2xl bg-teal-wash p-8 text-center">
            <h3 className="mb-3">Not sure which program fits you?</h3>
            <p className="mb-6 text-slate-muted">
              Browse our FAQ for details on eligibility, program content, and fees — or reach out directly and we&apos;ll help you find the right path.
            </p>
            <Link href="/en/faq" className="btn-pill-outline">View FAQ</Link>
            <div className="mt-6 flex justify-center gap-4 flex-wrap text-sm">
              <Link href="/en/corporate" className="text-teal hover:underline">Corporate Partnership Options →</Link>
              <Link href="/angel" className="text-teal hover:underline">Join NTUTEC Angels →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
