"use client";

import { useState } from "react";
import PageHero from "@/components/public/PageHero";

interface FaqItem {
  question: string;
  answer: string;
  answerLink?: { text: string; href: string };
  category: string;
}

const faqs: FaqItem[] = [
  // ── Programs ──────────────────────────────────────────────────────────
  {
    category: "Programs",
    question: "What is the difference between the NTU Accelerator and NTU Garage?",
    answer:
      "The NTU Accelerator is designed for growth-stage startups that have completed an MVP or achieved early revenue. It runs for ten months (March–December) and provides one-on-one deep mentorship, corporate resource connections, and fundraising opportunities — open to any team regardless of NTU affiliation. The NTU Garage is designed for early-stage teams at the concept validation to MVP stage. It offers free virtual residency and community support, with priority given to NTU students, alumni, and faculty; exceptional external teams may be considered case-by-case.",
  },
  {
    category: "Programs",
    question: "Are there any fees or equity requirements?",
    answer:
      "Both NTU Garage and NTU Accelerator are completely free. There are no program fees and no equity taken. NTUTEC's mission is to foster NTU's entrepreneurship ecosystem — we are not profit-driven. If you believe in our mission, you're welcome to support us through a donation to NTU.",
    answerLink: {
      text: "Donate to NTU",
      href: "https://my.ntu.edu.tw/donation2/donationFormTW.aspx?dit=88",
    },
  },
  {
    category: "Programs",
    question: "How long are the programs? How many cohorts run per year?",
    answer:
      "Both the NTU Accelerator and NTU Garage run one cohort per year, from March to December — ten months total. Applications typically open from December through January, with results announced around the end of February.",
  },
  {
    category: "Programs",
    question: "Is full-time on-site attendance required during the program?",
    answer:
      "No. Both programs use a virtual residency model — there are no dedicated desks and no daily attendance requirements. Participants primarily join scheduled mentorship sessions and center activities. Meeting rooms and event spaces are available by reservation, keeping the program flexible around your startup's rhythm.",
  },
  {
    category: "Programs",
    question: "What support is available after the program ends?",
    answer:
      "Graduates remain connected to the center's alumni network, mentor consultations, and NTUTEC Angels Club fundraising opportunities. NTU Garage graduates receive priority consideration for the NTU Accelerator. NTUTEC maintains ongoing relationships with alumni and facilitates introductions to venture capital and corporate partnership opportunities.",
  },
  {
    category: "Programs",
    question: "What is the Corporate Vertical Accelerator, and how is it different from the general programs?",
    answer:
      "The Corporate Vertical Accelerator is a specialized program run in partnership with major corporate partners — 27 batches to date. Corporations define real business challenges; startup teams respond with solutions. Teams that succeed can access corporate resources, real-world validation environments, and potential co-development opportunities. Partner companies change each year based on industry trends, spanning technology, finance, telecommunications, manufacturing, and more.",
  },
  {
    category: "Programs",
    question: "Which industries does NTUTEC focus on?",
    answer:
      "NTUTEC's four focus areas in 2026 are: AI Software (enterprise AI, SaaS, data infrastructure), Biotech & Healthcare (AI diagnostics, precision medicine, medical devices), Hard Tech (semiconductors, advanced manufacturing, robotics, display technology), and Innovative Business Models (ESG, circular economy, FinTech, social innovation). High-potential teams from other industries are also welcome to apply — assessed case by case.",
  },

  // ── Applications ──────────────────────────────────────────────────────
  {
    category: "Applications",
    question: "What materials are required to apply?",
    answer:
      "Basic application materials include: team introduction (member backgrounds and roles), product or service description, target market and business model, current progress, and future roadmap. NTU Accelerator applicants are encouraged to include a Pitch Deck. Specific requirements are detailed in each program's online application form.",
  },
  {
    category: "Applications",
    question: "Can teams without NTU backgrounds apply?",
    answer:
      "The NTU Accelerator is fully open — any team with innovative technology or a novel business model is welcome to apply, regardless of NTU affiliation. NTU Garage primarily targets teams composed of NTU students, alumni, or faculty; exceptional external teams may be evaluated on a case-by-case basis.",
  },
  {
    category: "Applications",
    question: "What does the review process look like after applying?",
    answer:
      "The application process has four stages: Online Application → Document Review → Interview Invitation (for applicants who pass document review) → Results Notification (within three weeks of the interview). Document review is conducted by NTUTEC's investment team; interviews are held online or in person, followed by an onboarding briefing for accepted teams.",
    answerLink: { text: "Pre-register now", href: "/en/apply" },
  },
  {
    category: "Applications",
    question: "How many teams are selected each year? Is it competitive?",
    answer:
      "NTU Garage selects approximately 20 teams per year; the NTU Accelerator also selects approximately 20 teams — roughly 40 startups in total per cohort. Spots are deliberately limited to ensure every team receives meaningful mentorship resources. NTUTEC values quality and diversity; we recommend preparing early and clearly articulating your core problem and solution.",
  },
  {
    category: "Applications",
    question: "Can student teams participate while still in school?",
    answer:
      "Yes. Many selected team members are still enrolled as students. The program is designed to be flexible; mentorship sessions and activities are scheduled with academic commitments in mind. In fact, NTU Garage is specifically designed for early-stage founders who are still in school.",
  },
  {
    category: "Applications",
    question: "Can a team reapply after being rejected?",
    answer:
      "Yes. A rejection does not affect eligibility for future cohorts. We encourage teams to review any written feedback provided (where available), continue advancing their product, and reapply in the next cycle.",
  },

  // ── NTUTEC Angels ──────────────────────────────────────────────────────
  {
    category: "NTUTEC Angels",
    question: "What is NTUTEC Angels?",
    answer:
      "NTUTEC Angels is an angel investment community founded by NTUTEC in 2023, bringing together 40+ angel members (150+ investor network). The club holds monthly closed-door meetings featuring startups that have passed three rigorous screening stages — offering members curated deal flow, a mentor network, and a peer investor community.",
  },
  {
    category: "NTUTEC Angels",
    question: "How can I join NTUTEC Angels as a member?",
    answer:
      "Interested parties can complete a membership inquiry form on the website or contact NTUTEC's investment managers directly. We will arrange a one-on-one consultation to walk you through membership criteria, annual fee structure, and member benefits. NTUTEC Angels prioritizes quality over quantity — spots are limited.",
    answerLink: { text: "Apply for membership", href: "/angel-apply" },
  },
  {
    category: "NTUTEC Angels",
    question: "How are deals screened? What information do members receive?",
    answer:
      "All deals are reviewed individually by investment managers through initial screening and in-person evaluation, followed by a comprehensive due diligence report (market analysis, competitive landscape, investment thesis). Deals that pass are presented at the monthly meeting; members can access six information cards and the full evaluation report on the members-only platform.",
  },
  {
    category: "NTUTEC Angels",
    question: "How often does the Angels Club meet? Are there investment size limits?",
    answer:
      "NTUTEC Angels hosts monthly meetings where startup teams pitch and answer Q&A. Members invest with personal capital directly — no institutional co-investment constraints apply. Investment amounts are negotiated individually between members and each startup.",
  },
  {
    category: "NTUTEC Angels",
    question: "How can a startup get in front of NTUTEC Angels?",
    answer:
      "Startups can apply at any time via the website submission form — no prior participation in NTUTEC programs required. All submissions are reviewed by the NTUTEC investment team; those that advance are moved through deeper diligence before being recommended to the Angels Club. Teams with a history in NTUTEC programs receive priority recommendation.",
    answerLink: { text: "Submit your startup", href: "/pitch" },
  },

  // ── Corporate Partnership ──────────────────────────────────────────────
  {
    category: "Corporate Partnership",
    question: "How can a corporation partner with NTUTEC?",
    answer:
      "Partnership models include: Corporate Vertical Accelerator (define challenges, co-create solutions), joint events (Demo Day, hackathons, forums), deal sourcing (priority access to startups in specific verticals), and consulting services (innovation strategy, open innovation advisory). Fill out the partnership inquiry form and we will arrange a dedicated briefing.",
    answerLink: { text: "Explore corporate partnership options", href: "/en/corporate" },
  },
  {
    category: "Corporate Partnership",
    question: "What is the Corporate Vertical Accelerator and how does a company participate?",
    answer:
      "In the Corporate Vertical Accelerator, corporations define specific innovation challenges and NTUTEC recruits and coaches matching startups to address them. Corporate partners receive early technology access, joint development opportunities, and potential investment or procurement advantages. Interested companies should contact the NTUTEC business development team to discuss a proposal.",
  },
  {
    category: "Corporate Partnership",
    question: "Can a corporation directly hire from or invest in accelerator startups?",
    answer:
      "NTUTEC does not restrict commercial partnerships or investments between corporations and startups, but encourages transparent arrangements handled with NTUTEC's awareness. Direct acquisitions or recruitment of core team members should be discussed with NTUTEC in advance, to maintain a healthy and sustainable startup ecosystem.",
  },
  {
    category: "Corporate Partnership",
    question: "What does the innovation consulting service include?",
    answer:
      "NTUTEC offers corporate innovation strategy consulting spanning: open innovation planning, startup ecosystem development, intrapreneurship programs, and CVC (Corporate Venture Capital) strategy. Engagement formats include workshops, advisory retainers, and customized research — suited for large enterprises or government agencies seeking to systematically advance their innovation capabilities.",
  },

  // ── Mentors & Coaching ──────────────────────────────────────────────────
  {
    category: "Mentors & Coaching",
    question: "How do mentors work with startups? How frequent are sessions?",
    answer:
      "NTUTEC matches mentors with accepted startups for monthly one-on-one deep mentorship sessions, focused on business strategy, market entry, technical validation, or fundraising preparation. All mentors average 20+ years of industry or venture capital experience; session focus is adapted flexibly to each startup's evolving needs.",
  },
  {
    category: "Mentors & Coaching",
    question: "How can I become an NTUTEC mentor?",
    answer:
      "If you have experience in entrepreneurship, investing, technology, or industry management and want to give back to the startup ecosystem, fill out the mentor application form or reach out directly to the center. Mentors are selected primarily based on alignment with NTUTEC's focus areas and the depth of their hands-on experience.",
  },
  {
    category: "Mentors & Coaching",
    question: "What role does the Advisory Board play?",
    answer:
      "The Advisory Board consists of senior industry leaders, academics, and investors who provide external perspective on NTUTEC's strategic direction, program design, and major decisions. They do not participate in day-to-day mentorship, but can offer high-level guidance on specific issues when needed.",
  },

  // ── Contact & Other ──────────────────────────────────────────────────
  {
    category: "Contact & Other",
    question: "How can I contact NTUTEC?",
    answer:
      "You can reach us via the website contact form, email (ntutec@ntutec.com), or visit the NTUTEC office in person. Office hours are Monday to Friday, 9:00 AM – 6:00 PM. We also host regular open days — feel free to schedule a visit.",
  },
  {
    category: "Contact & Other",
    question: "Where is the NTUTEC office located?",
    answer:
      "NTUTEC is located on the 7th floor of the Excellence Research Building, NTU Shiyuan Campus, 18 Siyuan Street, Zhongzheng District, Taipei. Programs operate on a virtual residency model — participants can reserve center meeting rooms and event spaces as needed.",
  },
  {
    category: "Contact & Other",
    question: "What is Demo Day? Can the public attend?",
    answer:
      "Demo Day is NTUTEC's annual showcase and investor matching event held every December, where selected startups from the cohort pitch to investors, with interactive booths and matching sessions. The event is open for registration — investors, corporate representatives, and media are welcome to apply. General public attendance is subject to available capacity.",
  },
  {
    category: "Contact & Other",
    question: "Does NTUTEC produce a podcast or other media content?",
    answer:
      "Yes. TEC Talk is NTUTEC's official podcast, launched in 2021. Episodes feature mentors, well-known founders, and industry experts sharing frontline insights on entrepreneurship, investing, and market trends. Listen on Firstory (https://open.firstory.me/user/ntutec), Spotify, and other major platforms, or browse transcripts on the NTUTEC blog.",
  },
];

const categories = [
  "Programs",
  "Applications",
  "NTUTEC Angels",
  "Corporate Partnership",
  "Mentors & Coaching",
  "Contact & Other",
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const answerId = `faq-answer-${index}`;
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-teal"
      >
        <span className="pr-4 font-semibold text-charcoal">{item.question}</span>
        <span
          aria-hidden="true"
          className={`flex-shrink-0 text-xl text-teal transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        id={answerId}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="leading-relaxed text-slate-muted">{item.answer}</p>
        {item.answerLink && (
          <a
            href={item.answerLink.href}
            className="mt-3 inline-block text-sm font-medium text-teal-deep underline underline-offset-4 hover:text-teal"
          >
            {item.answerLink.text} →
          </a>
        )}
      </div>
    </div>
  );
}

export default function EnFaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Programs");

  const filteredFaqs = faqs.filter((f) => f.category === activeCategory);

  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="FAQ"
        description="Complete answers about program applications, angel investing, corporate partnership, mentorship, and other common questions."
      />

      <section className="section-spacing">
        <div className="container">
          {/* Category tabs */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                aria-pressed={activeCategory === cat}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-teal text-white"
                    : "bg-stone text-slate-muted hover:bg-teal-wash hover:text-teal-deep"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mx-auto max-w-3xl">
            <div>
              {filteredFaqs.map((item) => {
                const globalIndex = faqs.indexOf(item);
                return (
                  <AccordionItem
                    key={globalIndex}
                    item={item}
                    isOpen={openIndex === globalIndex}
                    onToggle={() =>
                      setOpenIndex(openIndex === globalIndex ? null : globalIndex)
                    }
                    index={globalIndex}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
