import type { Metadata } from 'next'
import './globals.css'
import { Geist } from "next/font/google";
import { Noto_Sans_TC } from "next/font/google";
import { cn } from "@/lib/utils";
import OrganizationSchema from '@/components/public/OrganizationSchema'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-zh',
  preload: true,
});

export const metadata: Metadata = {
  title: 'NTUTEC Platform',
  description: '台大創創中心統一平台 — 天使俱樂部、業師健診、新創服務',
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
  openGraph: {
    images: [
      {
        url: 'https://tec.ntu.edu.tw/images/events/opening-2026-biggroup.jpg',
        width: 1200,
        height: 630,
        alt: '台大創創中心 2026 開幕式全體大合照',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW" className={cn("font-sans", geist.variable, notoSansTC.variable)}>
      <head>
        {/* DNS prefetch for third-party services */}
        <link rel="dns-prefetch" href="https://ntutec.ghost.io" />
        <link rel="dns-prefetch" href="https://nofhimlnrmltaktzkhbw.supabase.co" />
        <OrganizationSchema />
      </head>
      <body className="antialiased">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  )
}
