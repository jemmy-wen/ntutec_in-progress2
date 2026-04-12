import Image from "next/image";

const ECOSYSTEM_PARTNERS = [
  {
    label: "國立臺灣大學",
    href: "https://www.ntu.edu.tw",
    logo: "/images/ecosystem/ntu.svg",
    width: 200,
    height: 64,
  },
  {
    label: "研究發展處",
    href: "https://ord.ntu.edu.tw",
    logo: "/images/ecosystem/ord.png",
    width: 200,
    height: 40,
  },
  {
    label: "創新設計學院 D-School",
    href: "https://dschool.ntu.edu.tw",
    logo: "/images/ecosystem/dschool.png",
    width: 200,
    height: 48,
  },
  {
    label: "國際產學聯盟 ILO",
    href: "https://homepage.ntu.edu.tw/~ntuilo/ntuilo/Default.html",
    logo: "/images/ecosystem/ilo.png",
    width: 200,
    height: 40,
  },
  {
    label: "創新育成中心",
    href: "https://ntuiic.ntu.edu.tw",
    logo: "/images/ecosystem/ntuiic.png",
    width: 200,
    height: 44,
  },
  {
    label: "台大校友創投",
    href: "https://ntu.vc",
    logo: "/images/ecosystem/ntuvc.png",
    width: 64,
    height: 64,
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
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {ECOSYSTEM_PARTNERS.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-3 rounded-xl bg-white px-4 py-6 opacity-90 shadow-sm transition-all hover:opacity-100 hover:shadow-md"
              aria-label={p.label}
            >
              <div className="flex h-16 items-center justify-center">
                <Image
                  src={p.logo}
                  alt={p.label}
                  width={p.width}
                  height={p.height}
                  className="max-h-14 w-auto object-contain"
                />
              </div>
              <span className="text-center text-xs font-medium text-slate-muted group-hover:text-teal transition-colors">
                {p.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
