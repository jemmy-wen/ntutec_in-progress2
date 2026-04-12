import Link from "next/link";

/* ── Social icons (inline SVG to avoid extra deps) ── */

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* ──────────────────────────── Footer ───────────────────────────── */

const FOOTER_LINKS = {
  programs: [
    { label: "企業合作", href: "/corporate" },
    { label: "天使俱樂部", href: "/angel" },
    { label: "台大加速器", href: "/accelerator" },
    { label: "台大車庫", href: "/garage" },
  ],
  about: [
    { label: "關於 TEC", href: "/about" },
    { label: "團隊", href: "/team" },
    { label: "業師", href: "/mentors" },
    { label: "最新動態", href: "/news" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-stone">
      <div className="container section-spacing">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* ── Brand ── */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold tracking-tight text-charcoal">
                NTUTEC
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-muted">
              台大創創中心連結新創團隊、企業夥伴與天使投資人，13 年深耕台灣最具底蘊的校園創業生態系。
            </p>
            <p className="text-xs text-slate-muted/70">
              隸屬{" "}
              <a
                href="https://www.ntu.edu.tw"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal transition-colors underline underline-offset-2"
              >
                國立臺灣大學
              </a>
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/ntutec.fanpage/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-muted hover:text-teal transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.linkedin.com/company/ntutec"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-muted hover:text-teal transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://www.instagram.com/ntu_tec/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-muted hover:text-teal transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.youtube.com/@ntutec9874/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-muted hover:text-teal transition-colors"
                aria-label="YouTube"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* ── 計畫與服務 ── */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-charcoal">
              計畫與服務
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-muted hover:text-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── 關於我們 ── */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-charcoal">
              關於我們
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-muted hover:text-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── 聯絡資訊 ── */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-charcoal">
              聯絡資訊
            </h4>
            <address className="space-y-2.5 not-italic text-sm text-slate-muted">
              <p>
                台北市中正區思源街 18 號
                <br />
                台大水源校區卓越研究大樓 7 樓
              </p>
              <p>
                <a
                  href="mailto:ntutec@ntutec.com"
                  className="hover:text-teal transition-colors"
                >
                  ntutec@ntutec.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* ── 台大生態系夥伴 ── */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-muted/60">
            台大創新生態系
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "國立臺灣大學", href: "https://www.ntu.edu.tw" },
              { label: "研究發展處", href: "https://ord.ntu.edu.tw" },
              { label: "國際產學聯盟 ILO", href: "https://homepage.ntu.edu.tw/~ntuilo/ntuilo/Default.html" },
              { label: "創新育成中心", href: "https://ntuiic.ntu.edu.tw" },
              { label: "台大校友創投", href: "https://ntu.vc" },
              { label: "創新設計學院 D-School", href: "https://dschool.ntu.edu.tw" },
            ].map((partner) => (
              <a
                key={partner.href}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-3 py-1.5 text-xs text-slate-muted transition-colors hover:border-teal hover:text-teal"
              >
                {partner.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-8 border-t border-border pt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-muted">
            &copy; {new Date().getFullYear()} 國立臺灣大學創意創業中心. All
            rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-muted">
            <Link href="/privacy" className="hover:text-teal transition-colors">
              隱私權政策
            </Link>
            <Link href="/terms" className="hover:text-teal transition-colors">
              使用條款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
