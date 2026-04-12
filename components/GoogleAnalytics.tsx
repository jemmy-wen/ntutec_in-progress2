'use client'

// components/GoogleAnalytics.tsx
// Injects the GA4 gtag.js script via next/script (afterInteractive strategy).
// Renders nothing if NEXT_PUBLIC_GA_ID is not set — safe for local dev.

import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/analytics'

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  )
}
