import Link from "next/link";
import { GraduationCap, Building2, Coins, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Connection {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  proof: string;
  href: string;
  cta: string;
}

const connections: Connection[] = [
  {
    icon: GraduationCap,
    label: "Connect to NTU",
    title: "連結台大",
    description:
      "整合台大工學院、醫學院、電機資訊、管理等跨院系資源，串接校內 D-School、ILO、EiMBA 等五大合作單位，把研究能量轉化為可投資的新創。",
    proof: "120+ 台大學生團隊 · 30+ 教授團隊 · 200+ 校友團隊",
    href: "/programs",
    cta: "了解輔導計畫",
  },
  {
    icon: Building2,
    label: "Connect to Industry",
    title: "連結產業",
    description:
      "累計 35 家企業合作，首創企業垂直加速器，以企業出題、新創解題的模式共創。合作夥伴含 Nvidia、Synopsys、鴻海、玉山銀行、遠傳電信等國內外大廠。",
    proof: "35 家企業合作 · 27 隻企業垂直加速器",
    href: "/corporate",
    cta: "探索企業合作",
  },
  {
    icon: Coins,
    label: "Connect to Capital",
    title: "連結資本",
    description:
      "台大天使投資俱樂部提供會員優質案源、Gate 0/1/2 三段預審與每月例會。所有案件經投資經理深度盡調，串接 350+ 投資人網絡與後續創投對接。",
    proof: "Gate 預審 · 月例會 · 350+ 投資人網絡",
    href: "/angel",
    cta: "認識天使俱樂部",
  },
];

export default function ThreeConnectionsSection() {
  return (
    <section className="section-spacing bg-white">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="micro-label mb-2">Three Connections</p>
          <h2>我們做的事情 — 三個連結</h2>
          <p className="mt-4 text-lg text-slate-muted">
            連結台大、連結產業、連結資本。用 13 年的累積，把最好的技術能量與人才，轉化成可投資的新創公司。
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {connections.map((conn) => {
            const Icon = conn.icon;
            return (
              <div
                key={conn.label}
                className="card-hover group rounded-2xl border border-stone-warm/60 bg-white p-8"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-wash text-teal-deep">
                  <Icon className="h-7 w-7" />
                </div>

                <p className="micro-label text-teal mb-2">{conn.label}</p>
                <h3 className="mb-3 text-2xl font-bold text-charcoal">{conn.title}</h3>

                <p className="mb-5 leading-relaxed text-slate-muted">
                  {conn.description}
                </p>

                <div className="mb-6 rounded-lg bg-stone px-4 py-3">
                  <p className="text-sm font-medium text-charcoal">{conn.proof}</p>
                </div>

                <Link
                  href={conn.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep transition-colors hover:text-teal"
                >
                  {conn.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
