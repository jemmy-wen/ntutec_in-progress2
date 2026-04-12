import type { Metadata } from 'next'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import OrganizationSchema from '@/components/public/OrganizationSchema'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'NTUTEC Platform',
  description: '台大創創中心統一平台 — 天使俱樂部、業師健診、新創服務',
  robots: {
    index: true,
    follow: true,
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
    <html lang="zh-TW" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <OrganizationSchema />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
