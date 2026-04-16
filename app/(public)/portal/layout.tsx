import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "資料更新 | NTUTEC",
  description: "台大創創中心校友/業師資料自助更新",
  robots: { index: false, follow: false },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
