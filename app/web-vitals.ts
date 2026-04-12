/**
 * Web Vitals reporting for Core Web Vitals monitoring.
 * Logs CLS, LCP, INP (FID) to console in development.
 * Extend this to send metrics to an analytics endpoint in production.
 *
 * Usage: export { reportWebVitals } from '@/app/web-vitals'
 * in app/layout.tsx (Next.js App Router instrumentation).
 */

interface WebVitalMetric {
  name: string
  value: number
  rating?: 'good' | 'needs-improvement' | 'poor'
  id: string
  delta: number
  navigationType?: string
}

export function reportWebVitals(metric: WebVitalMetric) {
  if (process.env.NODE_ENV === 'development') {
    const { name, value, rating } = metric
    const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌'
    console.log(`[Web Vitals] ${emoji} ${name}: ${Math.round(value)}ms (${rating ?? 'n/a'})`)
  }

  // TODO: send to your analytics endpoint in production, e.g.:
  // if (process.env.NODE_ENV === 'production') {
  //   fetch('/api/vitals', { method: 'POST', body: JSON.stringify(metric) })
  // }
}
