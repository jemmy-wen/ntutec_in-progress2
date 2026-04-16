import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BreadcrumbSchema from "@/components/public/BreadcrumbSchema";
import { RocketLaunch, Trophy, Microphone, Lightbulb, Target, Handshake, ChartBar } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "Corporate Partnership | NTUTEC",
  description:
    "NTUTEC corporate partnership programs: Corporate Vertical Accelerator co-creation, innovation competitions, joint events, and innovation consulting — helping enterprises connect with frontier startup technologies.",
  alternates: {
    canonical: "https://tec.ntu.edu.tw/en/corporate",
    languages: {
      "zh-TW": "https://tec.ntu.edu.tw/corporate",
      en: "https://tec.ntu.edu.tw/en/corporate",
    },
  },
  openGraph: {
    title: "Corporate Partnership | NTUTEC",
    description:
      "Partner with NTU's entrepreneurship ecosystem. 35 corporate partners, 27 batches of Corporate Vertical Accelerator, 600+ startup talent pool.",
    url: "https://tec.ntu.edu.tw/en/corporate",
  },
};

const valueProps = [
  {
    title: "Access to Frontier Technology",
    description:
      "Direct access to NTU's latest research breakthroughs and startup teams — enabling enterprises to get ahead of emerging technology trends and accelerate innovation transformation.",
  },
  {
    title: "A First-Hand Talent Pipeline",
    description:
      "Deep partnership gives direct exposure to NTU startup talent. Strong performers can be hired directly, cutting out intermediaries and search costs. Past corporate partners have recruited multiple technical co-founders from Garage and Accelerator cohorts.",
  },
  {
    title: "Demo Day & Forum Visibility",
    description:
      "Co-host Demo Day (74 investors attended in 2025 — a record high) and industry forums, placing your brand on stage alongside NTU's startup and investor community. More than brand exposure — it signals genuine collaboration intent.",
  },
];

const collaborationModels = [
  {
    icon: RocketLaunch,
    title: "Corporate Vertical Accelerator Co-creation",
    description:
      "Corporations define the challenge; startups solve it. Through a structured deep mentorship program, both sides co-develop innovative solutions together.",
  },
  {
    icon: Trophy,
    title: "Co-hosted Innovation Competitions",
    description:
      "Partner with NTUTEC to run themed innovation competitions — surfacing high-potential startups and building collaborative relationships.",
  },
  {
    icon: Microphone,
    title: "Joint Events",
    description:
      "Co-host industry forums, Demo Days, and networking events that foster meaningful engagement between enterprises and startups.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Advisory Consulting",
    description:
      "Drawing on NTUTEC's 13 years of accelerator expertise, we help enterprise teams identify innovation bottlenecks, design validation frameworks, and shorten the cycle from idea to market test.",
  },
];

export default function EnCorporatePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tec.ntu.edu.tw/en" },
          { name: "Corporate Partnership", url: "https://tec.ntu.edu.tw/en/corporate" },
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/events/demo-day-2025-group.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-[#0A192F]/75" />
        <div className="container relative z-[2] py-20">
          <p className="micro-label mb-3 text-teal-light">Corporate Innovation</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Corporate Partnership</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Partner with NTUTEC to co-drive corporate innovation — connecting your organization to the frontier technologies and talent emerging from NTU.
          </p>
        </div>
      </section>

      {/* Enterprise stats strip */}
      <div className="border-b border-stone-warm/40 bg-white">
        <div className="container flex flex-wrap justify-center gap-8 py-6 text-center md:gap-16">
          {[
            { num: "35+", label: "Corporate Partners" },
            { num: "27", label: "Batches of Vertical Accelerator" },
            { num: "600+", label: "Startup Talent Pool" },
            { num: "13 yrs", label: "Deepening NTU's Ecosystem" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-teal">{s.num}</div>
              <div className="mt-1 text-xs text-slate-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why partner with TEC */}
      <FadeIn>
        <section className="section-spacing bg-warm-stone">
          <div className="container">
            <div className="mb-12 text-center">
              <p className="micro-label mb-4">Why Partner With Us</p>
              <h2>Why Partner With NTUTEC</h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-muted">
                The enterprise innovation acceleration platform with direct access to NTU&apos;s top research talent and technologies
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {valueProps.map((prop) => (
                <div key={prop.title} className="card-hover card-elevated rounded-2xl bg-white p-8">
                  <h3 className="mb-4 text-xl font-semibold">{prop.title}</h3>
                  <p className="text-slate-muted leading-relaxed">{prop.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Collaboration Models */}
      <FadeIn>
        <section className="section-spacing bg-stone">
          <div className="container">
            <div className="mb-12 text-center">
              <p className="micro-label mb-4">Collaboration Models</p>
              <h2>Partnership Models</h2>
            </div>

            {/* Row 1: text left + pitching photo right */}
            <div className="grid gap-12 md:grid-cols-2 items-center mb-16">
              <div className="space-y-8">
                {collaborationModels.slice(0, 2).map((model) => (
                  <div key={model.title} className="flex gap-5">
                    <model.icon size={36} weight="duotone" className="shrink-0 text-teal mt-1" />
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">{model.title}</h3>
                      <p className="text-slate-muted leading-relaxed">{model.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/events/opening-2026-04.jpg"
                  alt="Startup pitch presentation"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Row 2: mentor photo left + text right */}
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl order-last md:order-first">
                <Image
                  src="/images/events/opening-2026-coaching.jpg"
                  alt="Mentor coaching session"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-8">
                {collaborationModels.slice(2).map((model) => (
                  <div key={model.title} className="flex gap-5">
                    <model.icon size={36} weight="duotone" className="shrink-0 text-teal mt-1" />
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">{model.title}</h3>
                      <p className="text-slate-muted leading-relaxed">{model.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Featured Cases */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">FEATURED CASES</p>
            <h2>Corporate Partnership Success Stories</h2>
          </div>
          <div className="mb-6 text-center">
            <p className="text-sm text-slate-muted">
              27 batches and 35 corporate partners — spanning technology, media, finance, and more.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {/* Card 1 */}
            <div className="rounded-2xl border border-stone-warm p-6 card-elevated">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
                  Corporate Vertical Accelerator
                </span>
                <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal-deep">
                  External Innovation Consulting
                </span>
              </div>
              <h3 className="mb-1 text-xl font-bold text-charcoal">
                Acer Foundation × LegalSign.ai
              </h3>
              <p className="mb-4 text-sm font-medium text-teal-deep">
                Corporate-sponsored accelerator × AI legal tech startup — co-creating intelligent contract automation
              </p>
              <ul className="mb-5 space-y-2 text-sm leading-relaxed text-slate-muted">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  Featured in Harvard Business Review
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  Named a &ldquo;White Tech Award&rdquo; high-potential startup by Taiwan&apos;s Ministry of Economic Affairs
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  Acer provided market validation support as corporate mentor, accelerating commercial deployment
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {["#LegalTech", "#AI", "#HBR", "#Acer"].map((tag) => (
                  <span key={tag} className="rounded-full bg-stone px-2.5 py-1 text-xs text-slate-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-stone-warm p-6 card-elevated">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
                  Corporate Vertical Accelerator
                </span>
                <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal-deep">
                  Digital Transformation
                </span>
              </div>
              <h3 className="mb-1 text-xl font-bold text-charcoal">
                UDN Media Group × Startup External Innovation
              </h3>
              <p className="mb-4 text-sm font-medium text-teal-deep">
                A legacy media group&apos;s second growth curve — cross-industry co-creation from content to new business models
              </p>
              <ul className="mb-5 space-y-2 text-sm leading-relaxed text-slate-muted">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  Featured in CommonWealth Magazine: &ldquo;UDN opens a second growth curve through startup collaboration&rdquo;
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  Extended external innovation consulting to subsidiary publishing and news brands
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  Long-term strategic partner since 2020
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {["#Media", "#DigitalTransformation", "#LongTermPartner"].map((tag) => (
                  <span key={tag} className="rounded-full bg-stone px-2.5 py-1 text-xs text-slate-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-stone-warm p-6 card-elevated">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
                  Corporate Vertical Accelerator
                </span>
                <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal-deep">
                  Cross-Industry Co-creation
                </span>
              </div>
              <h3 className="mb-1 text-xl font-bold text-charcoal">
                Linking Publishing × SAT. Knowledge Satellite
              </h3>
              <p className="mb-4 text-sm font-medium text-teal-deep">
                Traditional publishing × online learning platform — building a sustainable knowledge ecosystem together
              </p>
              <ul className="mb-5 space-y-2 text-sm leading-relaxed text-slate-muted">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  Six months of deep co-creation, unlocking an untapped market for arts and culture online courses
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  SAT. surpassed NT$700M in revenue in 2024
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  A flagship example of external innovation &ldquo;symbiotic co-creation&rdquo;
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {["#EdTech", "#Publishing", "#Sustainability", "#CoCreation"].map((tag) => (
                  <span key={tag} className="rounded-full bg-stone px-2.5 py-1 text-xs text-slate-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-stone-warm p-6 card-elevated">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
                  Innovation Competition
                </span>
                <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal-deep">
                  ESG / Social Innovation
                </span>
              </div>
              <h3 className="mb-1 text-xl font-bold text-charcoal">
                ASE Group × Social Innovation Competition
              </h3>
              <p className="mb-4 text-sm font-medium text-teal-deep">
                Semiconductor leader partners with NTUTEC to discover social impact startups through open competition
              </p>
              <ul className="mb-5 space-y-2 text-sm leading-relaxed text-slate-muted">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  NTUTEC managed the full competition process: application screening, interviews, and startup coaching
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  Social innovation theme strengthened ASE&apos;s ESG commitments and startup ecosystem linkage
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  Prize money and corporate resources helped finalist teams bring proposals to life
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {["#ASE", "#ESG", "#SocialInnovation", "#Competition"].map((tag) => (
                  <span key={tag} className="rounded-full bg-stone px-2.5 py-1 text-xs text-slate-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">How We Help</p>
            <h2>How NTUTEC Supports Corporate Innovation</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-muted">
              NTUTEC acts as an external innovation partner — accompanying enterprises and startups through every stage of collaboration
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                icon: Target,
                title: "Connect Decision-Makers",
                description: "Direct linkage to senior corporate leadership, ensuring collaboration projects receive internal buy-in",
              },
              {
                icon: Target,
                title: "Industry Knowledge Transfer",
                description: "Corporations share frontline industry knowledge, helping startups rapidly understand market context and customer needs",
              },
              {
                icon: Handshake,
                title: "Corporate PM Co-creation",
                description: "Regular working sessions between corporate PMs and startup teams, jointly driving collaboration project progress",
              },
              {
                icon: ChartBar,
                title: "Monthly Progress Tracking",
                description: "NTUTEC serves as the ongoing facilitator — monthly check-ins to track collaboration outcomes and ensure results",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-6 text-center">
                <item.icon size={36} weight="duotone" className="mb-4 mx-auto text-teal" />
                <h3 className="mb-2 text-base font-semibold text-charcoal">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Success Story</p>
            <h2>Case Study: NT$10M Revenue Co-created</h2>
          </div>
          <div className="mx-auto max-w-3xl rounded-2xl border border-stone-warm bg-stone p-8 md:p-10">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
                Corporate Vertical Accelerator
              </span>
              <span className="text-sm text-slate-muted">2022 Cohort</span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-charcoal">
              Linking Publishing × SAT. Knowledge Satellite
            </h3>
            <p className="mb-6 text-sm font-medium text-teal-deep">
              A near-50-year-old publishing house × an online learning startup — co-discovering a new blue ocean in arts education
            </p>
            <p className="mb-4 leading-relaxed text-slate-muted">
              Linking Publishing had spent decades building a rich catalog of humanities and arts content — but struggled to find a digital breakthrough. Through NTUTEC&apos;s Corporate Vertical Accelerator, Linking and online learning platform SAT. co-created intensively over six months, jointly uncovering an untapped market for arts and culture online courses.
            </p>
            <p className="mb-6 leading-relaxed text-slate-muted">
              Together, they launched &ldquo;Classical Music: 37 Lectures by Chiao-fu Chien&rdquo; — within roughly a year of launch, the course achieved <strong className="text-charcoal">NT$10M in revenue</strong>, validating strong demand for premium arts education content and opening a new chapter in Linking&apos;s digital transformation.
            </p>
            <blockquote className="border-l-4 border-teal pl-4 italic text-charcoal/80">
              &ldquo;External innovation accelerates cross-industry collaboration, brings a fresh perspective on our own strengths and weaknesses, and helps us discover new opportunities we can actually validate.&rdquo;
              <footer className="mt-2 text-sm not-italic text-slate-muted">
                — CEO, Linking Publishing
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="section-spacing">
        <div className="container text-center">
          <p className="micro-label mb-4">Impact</p>
          <h2 className="mb-12">Partnership Results</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { number: "35", label: "Corporate Partners to Date", suffix: "" },
              { number: "27", label: "Corporate Vertical Accelerator Batches", suffix: "" },
              { number: "600+", label: "Startup Teams Mentored", suffix: "" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-teal">{stat.number}{stat.suffix}</p>
                <p className="mt-2 text-slate-muted">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-muted">
            Partners span technology, manufacturing, finance, and media sectors
          </p>
          <p className="mt-3 text-xs text-slate-muted/70">
            35 corporate partners to date, 27 batches of Corporate Vertical Accelerator (Source: 2025 Impact Report)
          </p>
        </div>
      </section>

      {/* Angel investor cross-link */}
      <div className="container pb-4">
        <div className="mt-8 p-6 bg-stone rounded-lg text-center">
          <p className="text-slate-muted mb-3">Looking for strategic investment opportunities?</p>
          <Link href="/angel" className="btn-pill-outline">Learn About NTUTEC Angels</Link>
        </div>
      </div>

      {/* CTA */}
      <section className="relative section-spacing overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/events/demo-day-2025-02.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-[#0A192F]/80" />
        <div className="container relative z-[2] text-center">
          <h2 className="mb-6 text-white">Ready to Start a Partnership?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
            Whether you&apos;re exploring new technologies, seeking innovative solutions, or building a talent pipeline — NTUTEC can design a partnership model tailored to your needs.
          </p>
          <Link href="/contact" className="btn-pill-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
