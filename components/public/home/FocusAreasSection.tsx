import { Cpu, HeartPulse, CircuitBoard, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FocusArea {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  examples: string;
}

const focusAreas: FocusArea[] = [
  {
    icon: Cpu,
    label: "AI Software",
    title: "AI 軟體",
    description:
      "從基礎模型到垂直應用，涵蓋企業生成式 AI、Agent、資料基礎設施與 SaaS 平台。連結台大資工、電機、資管領域研究能量。",
    examples: "MoBagel · AmazingTalker · KryptoGO",
  },
  {
    icon: HeartPulse,
    label: "Biotech & Medical",
    title: "生技醫療",
    description:
      "醫材、AI 輔助診斷、精準醫療、數位健康與藥物開發。串接台大醫學院、醫院臨床場域與台大天使俱樂部生醫投資網絡。",
    examples: "AHEAD Medicine · 優照護",
  },
  {
    icon: CircuitBoard,
    label: "Deep Tech",
    title: "硬科技",
    description:
      "半導體、先進製造、材料科學、機器人與物聯網。連結台大工學院與國內半導體產業鏈，提供硬體開發與量產驗證資源。",
    examples: "PackAge+ · 循環材料新創",
  },
  {
    icon: Lightbulb,
    label: "New Business Models",
    title: "創新商模",
    description:
      "永續、循環經濟、ESG、社會創新與平台經濟。以創新商業模式解決產業痛點，接軌企業垂直加速器出題場域。",
    examples: "活水社企投資開發 · 循環經濟團隊",
  },
];

export default function FocusAreasSection() {
  return (
    <section className="section-spacing bg-stone">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="micro-label mb-2">Focus Areas</p>
          <h2>2026 四大聚焦領域</h2>
          <p className="mt-4 text-lg text-slate-muted">
            聚焦台灣最有機會的四個新創垂直，搭配校內跨院系資源與業界合作網絡，把最硬的研究打造成可投資的公司。
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.label}
                className="card-hover rounded-2xl border border-stone-warm/60 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-wash text-teal-deep">
                  <Icon className="h-6 w-6" />
                </div>

                <p className="micro-label text-teal mb-2">{area.label}</p>
                <h3 className="mb-3 text-xl font-bold text-charcoal">
                  {area.title}
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-slate-muted">
                  {area.description}
                </p>

                <div className="border-t border-stone-warm/60 pt-3">
                  <p className="text-xs text-slate-muted">
                    <span className="font-semibold text-charcoal">代表案例：</span>
                    {area.examples}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
