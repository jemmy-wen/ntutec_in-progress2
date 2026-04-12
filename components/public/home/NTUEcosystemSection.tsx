import Image from "next/image";

const ECOSYSTEM_PARTNERS = [
  {
    label: "國立臺灣大學",
    href: "https://www.ntu.edu.tw",
    logo: "/images/ecosystem/ntu.svg",
    width: 120,
    height: 40,
  },
  {
    label: "研究發展處",
    href: "https://ord.ntu.edu.tw",
    logo: "/images/ecosystem/ord.png",
    width: 120,
    height: 24,
  },
  {
    label: "創新設計學院 D-School",
    href: "https://dschool.ntu.edu.tw",
    logo: "/images/ecosystem/dschool.png",
    width: 120,
    height: 29,
  },
  {
    label: "國際產學聯盟 ILO",
    href: "https://homepage.ntu.edu.tw/~ntuilo/ntuilo/Default.html",
    logo: "/images/ecosystem/ilo.png",
    width: 120,
    height: 24,
  },
  {
    label: "創新育成中心",
    href: "https://ntuiic.ntu.edu.tw",
    logo: "/images/ecosystem/ntuiic.png",
    width: 120,
    height: 26,
  },
  {
    label: "台大校友創投",
    href: "https://ntu.vc",
    logo: "/images/ecosystem/ntuvc.png",
    width: 40,
    height: 40,
  },
];

export default function NTUEcosystemSection() {
  return (
    <section className="section-spacing border-t border-border bg-stone">
      <div className="container">
        <div className="mb-8 text-center">
          <p className="micro-label mb-2">台大創新生態系</p>
          <p className="text-sm text-slate-muted">
            NTUTEC 與台大各創新單位緊密協作，共同構建校園創業生態系
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {ECOSYSTEM_PARTNERS.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 opacity-85 transition-all hover:opacity-100"
              aria-label={p.label}
            >
              <Image
                src={p.logo}
                alt={p.label}
                width={p.width}
                height={p.height}
                className="object-contain"
              />
              <span className="text-xs text-slate-muted group-hover:text-teal transition-colors">
                {p.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
