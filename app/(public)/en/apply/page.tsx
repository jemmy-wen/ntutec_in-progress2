import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { AlertCircle } from "lucide-react";
import PageHero from "@/components/public/PageHero";
import PreRegisterForm from "@/components/public/PreRegisterForm";
import BreadcrumbSchema from "@/components/public/BreadcrumbSchema";
import { RocketLaunch, House } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Apply / Pre-register for 2027 Cohort | NTUTEC",
  description:
    "Pre-register for the 2027 cohort now. Official applications open in December 2026. Pre-registration is not an application — we will notify you when formal applications open.",
  alternates: {
    canonical: "https://tec.ntu.edu.tw/en/apply",
    languages: {
      "zh-TW": "https://tec.ntu.edu.tw/apply",
      en: "https://tec.ntu.edu.tw/en/apply",
    },
  },
  openGraph: {
    title: "Apply / Pre-register | NTUTEC",
    description:
      "NTU Accelerator, NTU Garage, and Corporate Vertical Accelerator — 2027 cohort pre-registration now open.",
    url: "https://tec.ntu.edu.tw/en/apply",
  },
};

const tracks = [
  {
    icon: RocketLaunch,
    name: "Apply to NTU Accelerator",
    subtitle: "Accelerator Program",
    description:
      "Designed for growth-stage startups with an MVP or early revenue. A ten-month program (March – December) providing mentor mentorship, corporate connections, and fundraising opportunities. No NTU affiliation required.",
    href: "#preregister",
    learnHref: "/en/accelerator",
    note: "2027 cohort applications: December 2026 – January 2027",
  },
  {
    icon: House,
    name: "Apply to NTU Garage",
    subtitle: "Garage Incubator",
    description:
      "Built for early-stage teams at the concept validation to MVP stage. Annual cohort (March – December) with free virtual residency, meeting room access, and peer community resources. NTU affiliation prioritized.",
    href: "#preregister",
    learnHref: "/en/garage",
    note: "2027 cohort applications: December 2026 – January 2027",
  },
];

const timeline = [
  { step: "1", label: "Online Application", description: "Complete the application form and submit your team and project information" },
  { step: "2", label: "Document Review", description: "NTUTEC investment team conducts initial screening" },
  { step: "3", label: "Interview Invitation", description: "Applicants who pass document review are invited for an online or in-person interview" },
  { step: "4", label: "Results Notification", description: "Acceptance decisions communicated within three weeks of the interview" },
];

export default function EnApplyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tec.ntu.edu.tw/en" },
          { name: "Apply", url: "https://tec.ntu.edu.tw/en/apply" },
        ]}
      />
      <PageHero
        title="Apply & Pre-register"
        subtitle="Apply / Pre-register"
        description="Both the Accelerator and Garage operate on an annual cohort basis — not rolling admissions. Official applications for the 2027 cohort open in December 2026."
      />

      <noscript>
        <div className="bg-teal-wash border border-teal-deep/20 rounded-lg p-6 my-8 mx-auto max-w-2xl">
          <h2 className="font-semibold text-charcoal mb-2">JavaScript Required</h2>
          <p className="text-sm text-slate-muted mb-3">
            The online form requires JavaScript. If you cannot enable it, please email us directly:
          </p>
          <a href="mailto:ntutec@ntutec.com" className="text-teal-deep font-medium">ntutec@ntutec.com</a>
        </div>
      </noscript>

      {/* Batch Notice */}
      <section className="section-spacing pb-0">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl border border-teal/30 bg-teal-wash/50 p-6">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-2 text-base font-semibold text-charcoal">
                  About Application Timing
                </h3>
                <p className="text-sm leading-relaxed text-slate-muted">
                  NTUTEC&apos;s Accelerator and Garage programs operate on an <strong className="text-charcoal">annual cohort basis</strong> — residency runs from March to December each year, and <strong className="text-charcoal">mid-cohort enrollment is not available</strong>.
                </p>
                <ul className="mt-3 space-y-1 text-sm text-slate-muted">
                  <li>• <strong className="text-charcoal">2026 Cohort</strong>: In progress (March – December); current teams actively in program</li>
                  <li>• <strong className="text-charcoal">2027 Cohort Application Period</strong>: December 2026 – January 2027</li>
                  <li>• <strong className="text-charcoal">2027 Cohort Results</strong>: February 2027</li>
                </ul>
                <p className="mt-3 text-sm leading-relaxed text-slate-muted">
                  If you&apos;re interested in joining the next cohort, we encourage you to <strong className="text-charcoal">pre-register now</strong> — we will notify you as soon as official applications open. Pre-registration <strong className="text-charcoal">is not an application</strong>; formal applications must still be submitted with complete materials during the application window.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-path Selection */}
      <section className="section-spacing">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {tracks.map((track) => (
              <div
                key={track.name}
                className="flex flex-col rounded-2xl border-2 border-transparent bg-white p-8 shadow-sm"
              >
                <track.icon size={36} weight="duotone" className="text-teal" />
                <h3 className="mt-4">{track.name}</h3>
                <p className="text-sm text-slate-muted">{track.subtitle}</p>
                <p className="mt-4 flex-1 leading-relaxed text-slate-muted">
                  {track.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={track.href} className="btn-pill-primary">
                    Pre-register for Notification
                  </a>
                  <a href={track.learnHref} className="btn-pill-outline text-sm">
                    Learn More About This Program
                  </a>
                </div>
                <p className="mt-3 text-xs text-slate-muted">{track.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-register Form */}
      <section id="preregister" className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto max-w-xl">
            <p className="micro-label mb-4 text-center">Pre-register</p>
            <h2 className="mb-2 text-center">Pre-register Now</h2>
            <p className="mb-8 text-center text-slate-muted">
              2027 cohort applications open in December 2026. Pre-registration is not an application — we&apos;ll notify you first when the window opens.
            </p>
            <div className="mb-6 rounded-xl border border-stone-warm/60 bg-white p-4 text-sm">
              <p className="mb-2 text-xs font-semibold text-charcoal">Formal Application Process</p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-muted">
                <span>① Online Application</span><span className="text-stone-warm/60">→</span>
                <span>② Document Review</span><span className="text-stone-warm/60">→</span>
                <span>③ Interview</span><span className="text-stone-warm/60">→</span>
                <span>④ Decision within 3 weeks</span>
              </div>
            </div>
            <Suspense fallback={<div className="text-center py-8 text-slate-muted">Loading registration form...</div>}>
              <PreRegisterForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Application Timeline */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Process</p>
            <h2>Application Process</h2>
          </div>
          <ol className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none">
            {timeline.map((t) => (
              <li key={t.step} className="text-center">
                <div
                  className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal text-lg font-bold text-white"
                  aria-hidden="true"
                >
                  {t.step}
                </div>
                <h4 className="mb-1 text-lg">{t.label}</h4>
                <p className="text-sm leading-relaxed text-slate-muted">
                  {t.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="relative section-spacing overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/photos/ntu-fuzhong-fountain.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-[#0A192F]/80" />
        <div className="container relative z-[2] text-center">
          <h3 className="mb-4 text-white">Still have questions?</h3>
          <p className="mb-6 text-white/80">
            Browse our FAQ for details on eligibility, program content, and costs.
          </p>
          <Link href="/en/faq" className="btn-pill-outline">
            View FAQ
          </Link>
        </div>
      </section>
    </>
  );
}
