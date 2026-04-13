import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/public/PageHero'
import BreadcrumbSchema from '@/components/public/BreadcrumbSchema'
import { Plant, LinkSimple, RocketLaunch } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'About NTUTEC | NTUTEC',
  description:
    'NTUTEC supports startups through the HI3 cultivation model (Incubation × Integration × Ignition). From NTU Garage in 2013 to 35 corporate partners and 27 batches of vertical accelerators — 13 years deepening NTU\'s entrepreneurship ecosystem.',
  alternates: {
    canonical: 'https://tec.ntu.edu.tw/en/about',
    languages: {
      'zh-TW': 'https://tec.ntu.edu.tw/about',
      'en': 'https://tec.ntu.edu.tw/en/about',
    },
  },
}

const hi3Model = [
  {
    key: 'Incubation',
    label: 'Incubation',
    en: 'Incubation',
    icon: Plant,
    description:
      'Through dedicated program managers, one-on-one mentor consultations, and professional workshops (business models, fundraising, legal), we accompany early-stage teams from idea to prototype validation.',
  },
  {
    key: 'Integration',
    label: 'Integration',
    en: 'Integration',
    icon: LinkSimple,
    description:
      "Connecting NTU's multi-disciplinary resources, corporate vertical accelerators, and EiMBA entrepreneurship programs — linking government initiatives (FITI, TTA) and international partners to help startups quickly engage with real-world environments.",
  },
  {
    key: 'Ignition',
    label: 'Ignition',
    en: 'Ignition',
    icon: RocketLaunch,
    description:
      'Hosting Demo Day (74 investors attended, 2025), closed-door investment matching, and the Angels Club — igniting the first round of capital for ready teams and propelling them to market.',
  },
]

const alumniHighlights = [
  {
    name: 'PackAge+',
    tag: 'Circular Packaging · ESG',
    result: 'Series A over NT$100M (2025)',
    detail:
      'With National Development Fund and strategic investors on board, bringing circular packaging into Taiwan\'s mainstream e-commerce supply chain.',
  },
  {
    name: 'Aistrom',
    tag: 'Medical Devices · International',
    result: 'Raised USD $2.5M (2024)',
    detail:
      'SelectUSA MedTech champion, with investment from NBA team-designated physicians and international orthopedic authorities.',
  },
  {
    name: 'Botbonnie',
    tag: 'Chatbot · AI',
    result: 'Acquired by Appier (2023)',
    detail:
      'NTU alumni team successfully acquired by Appier, a Japanese publicly-listed AI company, achieving a complete exit.',
  },
]

const milestones = [
  { year: '2013', title: 'NTU Garage Launches', description: 'Established NTU Garage at NTU Shiyuan Campus as a shared entrepreneurship space for students, building the foundation of NTU\'s entrepreneurship ecosystem.' },
  { year: '2014', title: 'NTUTEC Officially Established', description: 'National Taiwan University officially established the Innovation & Entrepreneurship Center as a university-level unit under the Office of Research & Development, integrating campus entrepreneurship resources.' },
  { year: '2016', title: 'NTU Challenge Campus Competition', description: 'Co-hosted NTU Challenge with the College of Design, combining education, mentorship, and competition to discover campus entrepreneurship potential.' },
  { year: '2017', title: 'NTU Accelerator Launches', description: 'Launched the NTU Accelerator, providing growth-stage startup teams with market validation, business model iteration, and fundraising resources.' },
  { year: '2019', title: 'Corporate Vertical Accelerator Pioneer', description: 'Pioneered the Corporate Vertical Accelerator model — corporations define challenges, startups solve them. Cumulatively partnered deeply with 35 companies including Foxconn, Nvidia, and Synopsys.' },
  { year: '2020', title: 'Corporate Innovation Consulting', description: 'Launched corporate open innovation consulting services, helping medium and large enterprises adopt startup thinking and agile innovation methodologies.' },
  { year: '2022', title: 'Co-Creation Sandbox', description: 'Launched the Co-Creation Sandbox membership program, providing startups with a safe product and market validation environment.' },
  { year: '2026', title: 'Four Focus Areas & Three-University Alliance', description: 'Focusing on AI software, biotech & healthcare, hard tech, and innovative business models — deepening the three-university entrepreneurship ecosystem alliance with NTNU and NTUST.' },
]

export default function EnAboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tec.ntu.edu.tw/en' },
        { name: 'About NTUTEC', url: 'https://tec.ntu.edu.tw/en/about' },
      ]} />
      <PageHero
        title="About NTUTEC"
        subtitle="About NTUTEC"
        description="13 Years · 600+ Startups · 35 Corporate Partners · 150+ Investor Network (including 40+ Angel Members) — the complete picture of NTU's entrepreneurship ecosystem."
      />

      <section className="section-spacing">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="micro-label mb-4">Our Mission</p>
              <h2 className="mb-6">Mission &amp; Vision</h2>
              <p className="mb-4 text-lg leading-relaxed text-slate-muted">
                NTUTEC is the operational hub of NTU&apos;s entrepreneurship ecosystem. Our core mission — &ldquo;Connecting NTU, Connecting Industry, Connecting Capital&rdquo; — transforms NTU&apos;s best technological capabilities and talent into investable startups.
              </p>
              <p className="mb-4 text-lg leading-relaxed text-slate-muted">
                Over <strong className="text-charcoal">13 years</strong>, we have cumulatively mentored over{' '}
                <strong className="text-charcoal">600+</strong> startup teams. Through the NTU Accelerator, NTU Garage, Corporate Vertical Accelerator (<strong className="text-charcoal">27 batches</strong>, <strong className="text-charcoal">35 companies</strong>), and Angels Club (<strong className="text-charcoal">150+</strong> investor network), we support startups from technical validation to market entry.
              </p>
              <p className="text-lg leading-relaxed text-slate-muted">
                Our vision is to become Taiwan&apos;s most trusted campus-based startup accelerator — systematically supporting startups through the HI3 model (Incubation → Integration → Ignition), rooted in 13 years of university entrepreneurship development in Taiwan.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '600+', label: 'Startup Teams Mentored', sub: 'Since 2013' },
                { value: '13', label: 'Years of Experience', sub: 'Since 2013' },
                { value: '35+', label: 'Corporate Partners', sub: 'Vertical Accelerator Partners' },
                { value: '150+', label: 'Investor Network', sub: 'Including 40+ Angel Members' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-teal-wash p-6 text-center">
                  <div className="text-3xl font-bold text-teal-deep">{stat.value}</div>
                  <div className="mt-1 text-sm font-semibold text-charcoal">{stat.label}</div>
                  <div className="mt-0.5 text-xs text-slate-muted">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NTU Affiliation Badge */}
      <div className="bg-stone border-b border-stone-warm/60">
        <div className="container py-4 flex items-center gap-3">
          <Image src="/images/partners/ntu.svg" alt="National Taiwan University" width={32} height={32} className="h-8 w-auto" />
          <p className="text-sm text-slate-muted">National Taiwan University Innovation &amp; Entrepreneurship Center — University-level unit under the Office of Research &amp; Development</p>
        </div>
      </div>

      {/* HI3 Model Section */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Our Approach</p>
            <h2 className="mb-4">HI3 Cultivation Model</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-muted">
              Human-centric approach — three-stage systematic support guiding startups from concept to market launch.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {hi3Model.map((item) => (
              <div key={item.key} className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
                <item.icon size={36} weight="duotone" className="mb-4 text-teal" />
                <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-teal">{item.en}</div>
                <h3 className="mb-3 text-xl font-bold text-charcoal">{item.label}</h3>
                <p className="text-slate-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Success Highlights */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Alumni Impact</p>
            <h2 className="mb-4">Alumni Success Stories</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-muted">
              Starting from NTU Garage and Accelerator, these teams have completed fundraising, acquisitions, or international market validation.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {alumniHighlights.map((alumni) => (
              <div key={alumni.name} className="rounded-2xl bg-teal-wash p-8">
                <div className="mb-3 inline-block rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">{alumni.tag}</div>
                <h4 className="mb-2 text-lg font-bold text-charcoal">{alumni.name}</h4>
                <div className="mb-3 text-2xl font-bold text-teal-deep">{alumni.result}</div>
                <p className="text-sm text-slate-muted leading-relaxed">{alumni.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">History</p>
            <h2>Our Journey</h2>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-teal/20 md:left-1/2 md:-translate-x-px" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative flex gap-6 md:gap-0">
                  <div className="absolute left-6 -translate-x-1/2 mt-1.5 h-3 w-3 rounded-full bg-teal ring-4 ring-white md:left-1/2" />
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                    <span className="micro-label">{m.year}</span>
                    <h4 className="mt-1 mb-2">{m.title}</h4>
                    <p className="text-slate-muted leading-relaxed">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activity Photo Grid */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="micro-label mb-4">2026 Program Launch</p>
            <h2 className="mb-4">2026 Incubation Program Launch</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-muted">
              In March 2026, the first cohort of mentored teams officially launched at NTU Shiyuan Campus — this is where their journey begins.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] lg:col-span-2">
              <Image
                src="/images/events/opening-2026-group.jpg"
                alt="2026 Incubation Program Launch — Group Photo"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/opening-2026-vincent.jpg"
                alt="NTUTEC Director's Opening Remarks"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/opening-2026-audience.jpg"
                alt="2026 Incubation Program Launch — Full Audience"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/events/opening-2026-01.jpg"
                alt="2026 Incubation Program Launch — Group Discussion"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] sm:col-span-2 lg:col-span-1">
              <Image
                src="/images/events/opening-2026-03.jpg"
                alt="2026 Incubation Program Launch — Mentor Sharing"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-stone text-center">
        <div className="container">
          <h2 className="mb-6">Explore Our Programs</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/apply" className="btn-pill-primary">Start Your Entrepreneurship Journey</Link>
            <Link href="/corporate" className="btn-pill-outline">Corporate Partnership</Link>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container text-center">
          <p className="micro-label mb-4">Our People</p>
          <h2 className="mb-6">Meet Our Team</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">
            Investment managers, program managers — every team member is a frontline partner for startups, not just giving advice, but walking through every critical milestone together.
          </p>
          <Link href="/team" className="btn-pill-primary">View Full Team</Link>
        </div>
      </section>
    </>
  )
}
