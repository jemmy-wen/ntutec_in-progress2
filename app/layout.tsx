import type { Metadata } from 'next'
import './globals.css'
import { Geist, Noto_Sans_TC } from "next/font/google";
import { cn } from "@/lib/utils";
import OrganizationSchema from '@/components/public/OrganizationSchema'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin', 'chinese-traditional'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-zh',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NTUTEC Platform',
  description: '台大創創中心統一平台 — 天使俱樂部、業師健診、新創服務',
  robots: {
    index: true,
    follow: true,
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
        <OrganizationSchema />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
