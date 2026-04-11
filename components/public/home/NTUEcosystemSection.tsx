const ECOSYSTEM_PARTNERS = [
  { label: "國立臺灣大學", href: "https://www.ntu.edu.tw" },
  { label: "研究發展處", href: "https://ord.ntu.edu.tw" },
  { label: "國際產學聯盟 ILO", href: "https://homepage.ntu.edu.tw/~ntuilo/ntuilo/Default.html" },
  { label: "創新育成中心", href: "https://ntuiic.ntu.edu.tw" },
  { label: "台大校友創投", href: "https://ntu.vc" },
  { label: "創新設計學院 D-School", href: "https://dschool.ntu.edu.tw" },
];

export default function NTUEcosystemSection() {
  return (
    <section className="section-spacing border-t border-border bg-stone">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="micro-label mb-1">台大創新生態系</p>
            <p className="text-sm text-slate-muted">
              NTUTEC 與台大各創新單位緊密協作，共同構建校園創業生態系
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {ECOSYSTEM_PARTNERS.map((p) => (
              <a
                key={p.href}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-charcoal transition-colors hover:border-teal hover:text-teal"
              >
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
