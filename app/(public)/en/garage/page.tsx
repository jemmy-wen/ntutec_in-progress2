import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Send } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { Buildings, Handshake, UsersThree, LinkSimple, GraduationCap } from "@phosphor-icons/react/dist/ssr";
import BreadcrumbSchema from "@/components/public/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "NTU Garage | NTUTEC",
  description:
    "NTU Garage is NTUTEC's flexible incubation program for early-stage teams — virtual residency, peer community, and mentor access to help you move from idea to MVP.",
  alternates: {
    canonical: "https://tec.ntu.edu.tw/en/garage",
    languages: {
      "zh-TW": "https://tec.ntu.edu.tw/garage",
      en: "https://tec.ntu.edu.tw/en/garage",
    },
  },
  openGraph: {
    title: "NTU Garage | NTUTEC",
    description:
      "A flexible incubation program for early-stage founders — free virtual residency, peer community, and mentor consultations.",
    url: "https://tec.ntu.edu.tw/en/garage",
  },
};

export default function EnGaragePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tec.ntu.edu.tw/en" },
          { name: "Programs", url: "https://tec.ntu.edu.tw/en/programs" },
          { name: "NTU Garage", url: "https://tec.ntu.edu.tw/en/garage" },
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/photos/ntu-beauty-1.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-[#0A192F]/70" />
        <div className="container relative z-[2] py-20">
          <p className="micro-label mb-3 text-teal-light">NTU Garage</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">NTU Garage</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            A flexible incubation program built for early-stage founders. Virtual residency, peer learning, and hands-on support from concept validation to MVP — we walk with you through the most critical first steps.
          </p>
        </div>
      </section>

      {/* Key Stats Strip */}
      <FadeIn>
        <section className="border-b border-border/40 bg-white">
          <div className="container">
            <div className="grid grid-cols-2 divide-x divide-border/40 md:grid-cols-4">
              {[
                { num: "20", unit: " teams", label: "Selected annually" },
                { num: "10", unit: " months", label: "Program duration" },
                { num: "0", unit: "", label: "Completely free" },
                { num: "100+", unit: "", label: "Alumni teams to date" },
              ].map((s) => (
                <div key={s.label} className="px-6 py-5 text-center">
                  <div className="text-2xl font-bold text-charcoal">
                    {s.num}
                    <span className="text-lg text-teal ml-0.5">{s.unit}</span>
                  </div>
                  <div className="mt-0.5 text-xs text-slate-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Overview */}
      <FadeIn>
        <section className="section-spacing bg-warm-stone">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="micro-label mb-4">Overview</p>
                <h2 className="mb-6">Program Overview</h2>
                <p className="mb-4 text-lg leading-relaxed text-slate-muted">
                  Founded in 2013, NTU Garage is NTUTEC&apos;s shared incubation space designed for early-stage startup teams. Over 13 years, more than 100 startup teams have launched from here — progressing from concept validation through MVP and into market testing. Unlike the intensive NTU Accelerator, the Garage offers a more flexible schedule, giving teams the freedom to explore, validate, and iterate within the campus environment.
                </p>
                <p className="text-lg leading-relaxed text-slate-muted">
                  We provide a safe space to experiment and fail fast, complemented by a peer community, mentor consultations, and foundational resources — helping teams build a solid foundation before entering the market.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/events/demo-day-2025-02.jpg"
                  alt="Demo Day 2025"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Benefits */}
      <FadeIn>
        <section className="section-spacing bg-stone">
          <div className="container">
            <div className="mb-12 text-center">
              <p className="micro-label mb-4">Benefits</p>
              <h2>Resources We Provide</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Buildings,
                  title: "Virtual Residency",
                  description:
                    "Free virtual residency at NTU Shiyuan Campus, with access to the center&apos;s meeting rooms and event spaces — flexible to fit your startup&apos;s pace.",
                },
                {
                  icon: Handshake,
                  title: "Founder Community",
                  description:
                    "Build alongside fellow cohort teams. Sharing customer leads and collaborating on technical challenges happens naturally — this is NTU&apos;s most active early-stage startup community.",
                },
                {
                  icon: Buildings,
                  title: "Workshops & Courses",
                  description:
                    "Regular themed workshops covering business model design, financial planning, legal fundamentals, and more — led by mentors and industry experts.",
                },
                {
                  icon: UsersThree,
                  title: "Mentor Consultations",
                  description:
                    "Request one-on-one sessions with mentors to get targeted, expert advice on specific challenges you&apos;re facing.",
                },
                {
                  icon: LinkSimple,
                  title: "Accelerator Pathway",
                  description:
                    "NTU Garage graduates receive priority consideration for the NTU Accelerator — a natural next step for continued growth.",
                },
                {
                  icon: GraduationCap,
                  title: "Campus Resources",
                  description:
                    "NTU students and alumni receive priority admission, with access to cross-disciplinary research resources across NTU&apos;s colleges — ideal for interdisciplinary collaboration.",
                },
              ].map((b) => (
                <div
                  key={b.title}
                  className="rounded-xl border bg-white p-6 card-hover"
                >
                  <b.icon size={28} weight="duotone" className="text-teal" />
                  <h4 className="mt-3 mb-2">{b.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-muted">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Who Can Apply */}
      <section className="section-spacing bg-warm-stone">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="micro-label mb-4">Eligibility</p>
            <h2 className="mb-6">Who Can Apply?</h2>
            <ul className="space-y-3">
              {[
                "Teams composed of NTU current students, alumni, or faculty (external teams may be considered on a case-by-case basis — contact us to inquire)",
                "At the concept validation to MVP development stage",
                "At least 2 team members with a clear, shared commitment to building together",
                "A compelling innovative technology or business model concept",
                "Willing to actively participate in Garage community events and peer sharing sessions",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-slate-muted"
                >
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-teal" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Alumni Highlights */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Alumni Impact</p>
            <h2>NTU Garage Alumni (Selected)</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "MoBagel",
                category: "Major Fundraising",
                highlight: "Raised US$21M+ cumulatively, serving 3,000+ brands including Fortune 500 companies. Received investment from NTUTEC Angels Club in Q1 2026.",
                sector: "AutoML / Enterprise AI",
              },
              {
                name: "Vocus",
                category: "Scale Growth",
                highlight: "2M+ monthly unique visitors, 720K+ members, 20K+ creators — the leading Chinese-language content subscription platform.",
                sector: "Content Subscription",
              },
              {
                name: "3drens",
                category: "Pre-A Fundraising",
                highlight: "Raised ~NT$100M (led by Taiwania, Living Water, and Kuangsin Capital). Clients include yoxi and PChome.",
                sector: "Connected Vehicle × IoT × Big Data",
              },
              {
                name: "Hotcake",
                category: "Pre-A Fundraising",
                highlight: "Pre-A round US$1M+ (led by President International Development). 98% merchant renewal rate. Expanded to Japan and Thailand in 2025.",
                sector: "Salon Booking & CRM",
              },
            ].map((alumni) => (
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
      <section className="section-spacing bg-warm-stone">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <p className="micro-label mb-2">Batch Schedule</p>
              <h2>Cohort Schedule</h2>
              <p className="mt-3 text-base text-slate-muted">
                The Garage operates on an annual cohort basis, running from March to December each year. Applications for the 2027 cohort are expected to open in December 2026.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-warm/60 bg-stone p-8">
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-wash text-teal-deep">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">
                      2026 Annual Cohort (In Progress)
                    </p>
                    <p className="text-sm text-slate-muted">
                      March – December 2026 · Current teams in residence
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-wash text-teal-deep">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">
                      2027 Annual Cohort Application Period
                    </p>
                    <p className="text-sm text-slate-muted">
                      December 2026 – January 2027 · Online applications open
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-wash text-teal-deep">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">
                      2027 Annual Cohort Results
                    </p>
                    <p className="text-sm text-slate-muted">
                      February 2027 · Selected team list announced
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">
                      2027 Annual Cohort Officially Begins
                    </p>
                    <p className="text-sm text-slate-muted">
                      March – December 2027 · Ten months
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Angel investor diversion */}
      <section className="section-spacing bg-stone">
        <div className="container text-center">
          <p className="micro-label mb-4">Investor Access</p>
          <h2 className="mb-4">Priority Pipeline for NTUTEC Angels</h2>
          <p className="mx-auto mb-6 max-w-xl text-lg text-slate-muted">
            Early-stage startups nurtured through NTU Garage are among the priority sources observed and matched by NTUTEC Angels Club.
          </p>
          <Link href="/angel" className="btn-pill-outline">Learn About NTUTEC Angels</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-spacing overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/photos/ntu-beauty-1.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-[#0A192F]/80" />
        <div className="container relative z-[2] text-center">
          <h2 className="mb-4 text-white">Interested in the 2027 Cohort?</h2>
          <p className="mx-auto mb-6 max-w-xl text-lg text-white/80">
            Pre-register your team now, and we&apos;ll notify you as soon as official applications open in December. Pre-registration does not constitute an application — formal applications must still be submitted following the process.
          </p>
          <Link
            href="/en/apply"
            className="btn-pill-primary inline-flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Pre-register for 2027 Cohort Notification
          </Link>
        </div>
      </section>
    </>
  );
}
