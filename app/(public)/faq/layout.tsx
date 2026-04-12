import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "常見問題 | NTUTEC",
  description:
    "關於台大加速器、台大車庫、天使投資俱樂部、企業合作與業師輔導的完整問答。",
  alternates: { canonical: "https://tec.ntu.edu.tw/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
