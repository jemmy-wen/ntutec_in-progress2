import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "常見問題 | NTUTEC",
  description:
    "關於台大創創中心計畫、申請流程、費用與其他常見疑問的完整解答。",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
