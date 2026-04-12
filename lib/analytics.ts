// lib/analytics.ts — GA4 helper
// Uses NEXT_PUBLIC_GA_ID env var. Safe to import from client or server;
// all window-touching calls are guarded by typeof window checks.

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''

/** Send a page-view hit. Call from route-change handlers or layout effects. */
export function pageview(url: string) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url })
}

/** Fire a custom event. `params` maps to gtag event parameters. */
export function event(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return
  window.gtag('event', action, params)
}

// Augment the global Window type so TypeScript knows about gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      target: string | Date,
      params?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}
