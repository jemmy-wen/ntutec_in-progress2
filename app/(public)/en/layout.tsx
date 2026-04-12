import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://tec.ntu.edu.tw'),
  title: {
    template: '%s | NTUTEC',
    default: 'NTUTEC — NTU\'s Entrepreneurship Ecosystem Hub',
  },
  description:
    'Over 600 startup teams mentored in 13 years. NTUTEC connects NTU innovation to global impact through the NTU Accelerator, NTU Garage, Corporate Vertical Accelerator, and Angels Club.',
  openGraph: {
    siteName: 'NTUTEC',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://tec.ntu.edu.tw/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NTUTEC — NTU Innovation & Entrepreneurship Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  // Inherits Navbar and Footer from the parent (public) layout
  return <>{children}</>
}
