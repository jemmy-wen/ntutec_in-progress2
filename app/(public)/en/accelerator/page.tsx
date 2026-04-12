import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Send } from 'lucide-react'
import PageHero from '@/components/public/PageHero'
import Image from 'next/image'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'NTU Accelerator | NTUTEC',
  description:
    "NTUTEC's NTU Accelerator is a ten-month intensive program providing growth-stage startups with deep mentorship, corporate resource connections, and fundraising opportunities.",
  alternates: {
    canonical: 'https://tec.ntu.edu.tw/en/accelerator',
    languages: {
      'zh-TW': 'https://tec.ntu.edu.tw/accelerator',
      'en': 'https://tec.ntu.edu.tw/en/accelerator',
    },
  },
  openGraph: {
    title: 'NTU Accelerator | NTUTEC',
    description: 'Ten months of deep mentorship + corporate resource connections + fundraising opportunities. The strongest support for growth-stage startups.',
    url: 'https://tec.ntu.edu.tw/en/accelerator',
  },
}

const phases = [
  {
    phase: 'Phase 1',
    title: 'Diagnosis & Positioning',
    duration: 'Months 1–2',
    description: 'Deep understanding of team current situation, setting growth goals and milestones, and matching with the most suitable mentors.',
  },
  {
    phase: 'Phase 2',
    title: 'Validation & Iteration',
    duration: 'Months 3–5',
    description: 'Focused on product-market fit validation, continuously optimizing the business model through customer interviews and data analysis.',
  },
  {
    phase: 'Phase 3',
    title: 'Scaling Preparation',
    duration: 'Months 6–8',
    description: 'Building scalable operational frameworks, deepening corporate partnerships, and preparing fundraising materials.',
  },
  {
    phase: 'Phase 4',
    title: 'Demo Day & Graduation',
    duration: 'Months 9–10',
    description: 'Pitching to angel investors and strategic partners, completing the program and securing ongoing support resources.',
  },
]

const benefits = [
  {
    icon: '👥',
    title: 'Mentor Network',
    description: 'An extensive roster of 80+ mentors accumulated over the years, with 40+ active in 2026. Averaging over 20 years of industry experience covering venture capital, AI, biotech, semiconductors, and more — one-on-one deep mentorship.',
  },
  {
    icon: '🏢',
    title: 'Corporate Resources',
    description: '35 partner companies (including Nvidia, Synopsys, Foxconn, and others), providing technology validation environments and potential customer resources.',
  },
  {
    icon: '💰',
    title: 'Fundraising Connections',
    description: 'Angels Club and 300+ investor network covering fundraising opportunities from seed to Series A rounds.',
  },
  {
    icon: '🏢',
    title: 'Virtual Residency',
    description: 'Free virtual residency at NTU Shiyuan Campus, with access to the center\'s meeting rooms and event spaces — flexible to fit your startup\'s pace.',
  },
]

const acceleratorAlumni = [
  { name: 'PackAge+', category: 'Series A Fundraising', highlight: 'Raised over NT$100M in Series A — the largest alumni fundraising case of 2025, leading the circular packaging industry.', sector: 'Circular Packaging · ESG', icon: 'funding' },
  { name: 'AHEAD Medicine', category: 'Angel Investment', highlight: 'AI-powered medical diagnostic platform, received investment from NTUTEC Angels Club, expanding into precision medicine and the Asia-Pacific market.', sector: 'Biotech · AI', icon: 'funding' },
  { name: 'MoBagel', category: 'Angel Investment', highlight: 'Enterprise AI and data analytics platform, received investment from NTUTEC Angels Club, serving manufacturing, finance, retail, and multiple vertical industries.', sector: 'AI · Data Analytics', icon: 'funding' },
  { name: 'SAVFE', category: 'Angel Round Fundraising', highlight: 'Surgical navigation startup completed angel round, using AI image recognition to assist minimally invasive surgery, conducting clinical trials in Taiwan and the US.', sector: 'Biotech · Surgical Navigation', icon: 'funding' },
  { name: 'Ranictek', category: 'APICTA International Award', highlight: '5G millimeter wave IC design startup won 2 gold and 1 silver at APICTA Asia Pacific ICT Awards, gaining international recognition.', sector: 'Hard Tech · Semiconductors', icon: 'award' },
  { name: 'Damson Technology', category: 'CES 2025 Exhibition', highlight: 'Invited to exhibit at CES 2025, entering the heart rate monitoring market with wearable sensing technology, attracting significant international media attention.', sector: 'Hard Tech · Medical Wearables', icon: 'award' },
  { name: 'Taiwan Medical Electronics', category: 'FDA 510k Clearance', highlight: 'Obtained US FDA 510k medical device clearance — one of the few Taiwan startups to independently develop and break into the North American medical market.', sector: 'Biotech · Medical Devices', icon: 'award' },
  { name: '3DRENS', category: 'Pre-A Round Fundraising', highlight: 'Completed Pre-A round raising US$3M, providing 3D human body digital modeling technology, already serving multiple international fashion and sportswear brands.', sector: 'AI · 3D Vision', icon: 'funding' },
  { name: 'Picsee', category: 'Global Scale', highlight: 'Smart link management platform reaching over 100M monthly users, expanding to 5 countries, becoming one of the largest platforms of its kind in East Asia.', sector: 'SaaS · Digital Marketing', icon: 'award' },
  { name: 'ByteLingo', category: 'Angel Round Fundraising', highlight: 'AI enterprise language training platform completed angel round, serving 50+ enterprise clients, expanding into Southeast Asia.', sector: 'AI · EdTech', icon: 'funding' },
]

export default function EnAcceleratorPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tec.ntu.edu.tw/en' },
        { name: 'Programs', url: 'https://tec.ntu.edu.tw/programs' },
        { name: 'NTU Accelerator', url: 'https://tec.ntu.edu.tw/en/accelerator' },
      ]} />
      <PageHero
        title="NTU Accelerator"
        subtitle="NTU Accelerator"
        description="A ten-month intensive mentorship program helping growth-stage startups accelerate toward their next milestone. NTU affiliation not required — NTU-affiliated applicants receive priority. We value technological innovation and market potential."
      />

      {/* Program Overview */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="micro-label mb-4">Overview</p>
            <h2 className="mb-6">Program Overview</h2>
            <p className="text-lg leading-relaxed text-slate-muted">
              The NTU Accelerator, launched in 2017, is designed for growth-stage startups that have completed prototyping and entered market validation. The ten-month program offers one-on-one deep mentorship from 40+ active mentors in the 2026 cohort (backed by a database of 80+ mentors over the years), corporate partnership resources, the Angels Club, and VC network connections. The 2026 cohort is currently in progress (March–December).
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Timeline</p>
            <h2>Program Schedule</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {phases.map((p) => (
              <div key={p.phase} className="rounded-xl border bg-white p-6 card-hover">
                <span className="micro-label">{p.phase}</span>
                <h4 className="mt-2 mb-1">{p.title}</h4>
                <p className="mb-3 text-xs font-semibold text-teal">{p.duration}</p>
                <p className="text-sm leading-relaxed text-slate-muted">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Photos */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-8 text-center">
            <p className="micro-label mb-4">Campus Life</p>
            <h2 className="mb-3">Program in Action</h2>
            <p className="text-slate-muted">Workshops, mentorship sessions, discussions — ten months of startup acceleration begins here.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/opening-2026-classroom.jpg"
                alt="2026 Incubation Program — Full Class"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/opening-2026-coaching.jpg"
                alt="2026 Incubation Program — Group Coaching Session"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Benefits</p>
            <h2>Resources We Provide</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <span className="text-4xl">{b.icon}</span>
                <h4 className="mt-4 mb-2 text-lg">{b.title}</h4>
                <p className="text-sm leading-relaxed text-slate-muted">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Criteria */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="micro-label mb-4">Criteria</p>
            <h2 className="mb-6">Application Requirements</h2>
            <ul className="space-y-3">
              {[
                'NTU affiliation not required; applicants with NTU student, alumni, or faculty background receive priority',
                'Completed MVP or prototype development with initial users or revenue',
                'Team of at least 2 members, fully committed to the startup',
                'Clear market opportunity and growth potential',
                'Willing to commit to a ten-month systematic mentorship program',
                'No industry restrictions, but must demonstrate technological or model innovation',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-muted">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-teal" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Alumni */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Alumni Impact</p>
            <h2>NTU Accelerator Alumni Achievements</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {acceleratorAlumni.map((alumni) => (
              <div key={alumni.name} className="rounded-2xl bg-teal-wash p-6">
                <div className="mb-2 inline-block rounded-full bg-teal/10 px-3 py-0.5 text-xs font-semibold text-teal">{alumni.category}</div>
                <h4 className="mb-1 font-bold text-charcoal">{alumni.name}</h4>
                <p className="mb-2 text-xs text-slate-muted">{alumni.sector}</p>
                <p className="text-sm text-slate-muted leading-relaxed">{alumni.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Batch Timeline */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <p className="micro-label mb-2">Batch Schedule</p>
              <h2>Cohort Schedule</h2>
              <p className="mt-3 text-base text-slate-muted">
                The accelerator opens applications once per year on an annual cohort basis. The current cohort is in progress; the 2027 cohort applications are expected to open in December 2026.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-warm/60 bg-stone p-8">
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-wash text-teal-deep">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">2026 Annual Cohort (In Progress)</p>
                    <p className="text-sm text-slate-muted">March – December 2026 · Annual cohort in progress; next batch applications open in December 2026</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-wash text-teal-deep">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">2027 Annual Cohort Application Period</p>
                    <p className="text-sm text-slate-muted">December 2026 – January 2027 · Online applications open</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-wash text-teal-deep">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">2027 Annual Cohort Results</p>
                    <p className="text-sm text-slate-muted">February 2027 · Selected team list announced</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">2027 Annual Cohort Officially Begins</p>
                    <p className="text-sm text-slate-muted">March – December 2027 · Ten months</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ diversion */}
      <section className="py-6 text-center">
        <div className="container">
          <p className="text-sm text-slate-muted">
            Questions about requirements?{' '}
            <a href="/faq" className="text-teal-deep underline underline-offset-4 font-medium">View FAQ →</a>
          </p>
        </div>
      </section>

      {/* Audience diversion */}
      <section className="py-10 bg-gray-50 text-center border-t">
        <p className="text-gray-600 mb-6">Are you a corporation or investor? We have more suitable partnership options for you.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/corporate" className="btn-pill-outline">Corporate Vertical Accelerator Partnership</Link>
          <Link href="/en/angel" className="btn-pill-outline">Join Angels Club</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-stone">
        <div className="container text-center">
          <h2 className="mb-4">Interested in the 2027 Cohort?</h2>
          <p className="mx-auto mb-6 max-w-xl text-lg text-slate-muted">
            Pre-register your team now, and we&apos;ll notify you as soon as official applications open in December. Pre-registration does not constitute an application — formal applications must still be submitted following the process.
          </p>
          <Link href="/apply" className="btn-pill-primary inline-flex items-center gap-2">
            <Send className="h-4 w-4" />
            Pre-register for 2027 Cohort Notification
          </Link>
        </div>
      </section>
    </>
  )
}
