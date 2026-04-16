"use client";

import { Cpu, HeartPulse, CircuitBoard, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { FadeIn } from "@/components/ui/fade-in";

interface FocusArea {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  examples: string;
  accentColor: string;
}

const focusAreas: FocusArea[] = [
  {
    icon: Cpu,
    label: "AI Software",
    title: "AI 軟體",
    description:
      "從基礎模型到垂直應用，涵蓋企業生成式 AI、Agent、資料基礎設施與 SaaS 平台。連結台大各院系研究能量與產業應用場域。",
    examples: "MoBagel、漸強實驗室、AmazingTalker 等",
    accentColor: "from-teal/30 to-teal-deep/10",
  },
  {
    icon: HeartPulse,
    label: "Biotech & Medical",
    title: "生技醫療",
    description:
      "醫材、AI 輔助診斷、精準醫療、數位健康與藥物開發。串接台大醫院臨床場域與台大天使會生醫投資網絡。",
    examples: "思輔科技、Home心、AHEAD Medicine 等",
    accentColor: "from-teal-wash to-stone-warm",
  },
  {
    icon: CircuitBoard,
    label: "Deep Tech",
    title: "硬科技",
    description:
      "半導體、先進製造、材料科學、機器人與物聯網。連結台大各工程研究資源與國內半導體產業鏈，提供硬體開發與量產驗證支援。",
    examples: "歐姆佳科技、3drens、Datayoo 等",
    accentColor: "from-teal-deep/20 to-teal/10",
  },
  {
    icon: Lightbulb,
    label: "New Business Models",
    title: "創新商模",
    description:
      "永續、循環經濟、ESG、社會創新與平台經濟。以創新商業模式解決產業痛點，接軌企業垂直加速器出題場域。",
    examples: "配客嘉、ECOCO、知識衛星 等",
    accentColor: "from-stone-warm to-stone",
  },
];

export default function FocusAreasSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="section-spacing bg-stone">
      <div className="container">
        <FadeIn className="mx-auto mb-16 max-w-2xl text-center">
          <p className="micro-label mb-2">Focus Areas</p>
          <h2>2026 四大聚焦領域</h2>
          <p className="mt-4 text-lg text-slate-muted">
            AI 軟體、生技醫療、硬科技、創新商模——結合台大跨院系研究能量與業界合作網絡，陪伴新創從概念走向市場。
          </p>
        </FadeIn>

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area, i) => {
            const Icon = area.icon;
            return (
              <div
                key={area.label}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
                  transition: `opacity 550ms cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s, transform 550ms cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s, box-shadow 300ms ease`,
                }}
                className="group cursor-default rounded-2xl border border-stone-warm/60 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 duration-200"
              >
                {/* Accent gradient top bar */}
                <div
                  className={`-mx-6 -mt-6 mb-5 h-1.5 rounded-t-2xl bg-gradient-to-r ${area.accentColor} opacity-70`}
                />

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-wash text-teal-deep transition-transform duration-300 group-hover:scale-110">
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
