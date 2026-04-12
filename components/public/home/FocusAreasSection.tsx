"use client";

import { Cpu, HeartPulse, CircuitBoard, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "@/hooks/useInView";

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
    examples: "MoBagel · AmazingTalker · 律果科技",
    accentColor: "from-teal/30 to-teal-deep/10",
  },
  {
    icon: HeartPulse,
    label: "Biotech & Medical",
    title: "生技醫療",
    description:
      "醫材、AI 輔助診斷、精準醫療、數位健康與藥物開發。串接台大醫院臨床場域與天使俱樂部生醫投資網絡。",
    examples: "AHEAD Medicine · 艾斯創生醫 · 優照護",
    accentColor: "from-teal-wash to-stone-warm",
  },
  {
    icon: CircuitBoard,
    label: "Deep Tech",
    title: "硬科技",
    description:
      "半導體、先進製造、材料科學、機器人與物聯網。連結台大各工程研究資源與國內半導體產業鏈，提供硬體開發與量產驗證支援。",
    examples: "幻控科技 · 澤龍智能",
    accentColor: "from-teal-deep/20 to-teal/10",
  },
  {
    icon: Lightbulb,
    label: "New Business Models",
    title: "創新商模",
    description:
      "永續、循環經濟、ESG、社會創新與平台經濟。以創新商業模式解決產業痛點，接軌企業垂直加速器出題場域。",
    examples: "配客嘉 · 股股 · KryptoGO",
    accentColor: "from-stone-warm to-stone",
  },
];

export default function FocusAreasSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="section-spacing bg-stone">
      <div className="container">
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="micro-label mb-2">Focus Areas</p>
          <h2>2026 四大聚焦領域</h2>
          <p className="mt-4 text-lg text-slate-muted">
            聚焦台灣最有機會的四個新創垂直，搭配校內跨院系資源與業界合作網絡，把最硬的研究打造成可投資的公司。
          </p>
        </motion.div>

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.label}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 40, scale: 0.97 }
                }
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group cursor-default rounded-2xl border border-stone-warm/60 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
