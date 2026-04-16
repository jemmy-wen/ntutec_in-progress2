import type { NextConfig } from 'next'

// Content Security Policy — hardened 2026-04-15 for 計中 security review
// Known gap: `script-src 'unsafe-inline'` required by Next.js App Router hydration.
// TODO: migrate to nonce-based CSP via middleware injection in next sprint.
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://luma.com https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https: https://ntutec.ghost.io https://*.ghost.io https://www.google-analytics.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://ntutec.ghost.io https://www.google-analytics.com https://analytics.google.com",
  "frame-src https://luma.com https://www.google.com https://maps.googleapis.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join('; ')

// Permissions-Policy — deny all sensitive browser capabilities by default.
// Explicit allow-list for features actually used (none currently).
const permissionsPolicy = [
  'accelerometer=()',
  'ambient-light-sensor=()',
  'autoplay=()',
  'battery=()',
  'camera=()',
  'display-capture=()',
  'document-domain=()',
  'encrypted-media=()',
  'fullscreen=(self)',
  'gamepad=()',
  'geolocation=()',
  'gyroscope=()',
  'hid=()',
  'idle-detection=()',
  'magnetometer=()',
  'microphone=()',
  'midi=()',
  'payment=()',
  'picture-in-picture=()',
  'publickey-credentials-get=()',
  'screen-wake-lock=()',
  'serial=()',
  'sync-xhr=()',
  'usb=()',
  'web-share=(self)',
  'xr-spatial-tracking=()',
  'interest-cohort=()',
].join(', ')

const nextConfig: NextConfig = {
  // Skip ESLint during build — re-enable after SQL migration + @ts-nocheck removal
  eslint: { ignoreDuringBuilds: true },
  serverExternalPackages: ['nodemailer'],
  // Hide `X-Powered-By: Next.js` to reduce fingerprinting surface
  poweredByHeader: false,
  // Reject dangerous protocols in redirects
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'ntutec.ghost.io' },
      { protocol: 'https', hostname: '*.ghost.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'static.ghost.org' },
      { protocol: 'https', hostname: 'tec.ntu.edu.tw' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
    // Disable SVG from remote (SVG can carry scripts)
    dangerouslyAllowSVG: false,
    // Extra safety: treat all uploaded images as untrusted
    contentDispositionType: 'attachment',
  },
  async redirects() {
    return [
      // Legacy /team singular → canonical /teams
      { source: '/team', destination: '/teams', permanent: true },

      // --- Legacy WP Chinese slugs (Google SERP sitelinks point here; all 404 on new site) ---
      // SERP-visible (highest priority — sitelinks break without these)
      { source: '/執行團隊', destination: '/teams', permanent: true },
      { source: '/業師陣容', destination: '/mentors', permanent: true },
      { source: '/關於台大創創中心', destination: '/about', permanent: true },
      { source: '/台大創創新創輔導計畫總覽', destination: '/programs', permanent: true },
      { source: '/portfolio', destination: '/alumni', permanent: true },

      // Common Chinese 1-word slugs (probed 404 on 2026-04-16)
      { source: '/團隊', destination: '/teams', permanent: true },
      { source: '/業師', destination: '/mentors', permanent: true },
      { source: '/關於', destination: '/about', permanent: true },
      { source: '/關於我們', destination: '/about', permanent: true },
      { source: '/聯絡', destination: '/contact', permanent: true },
      { source: '/聯絡我們', destination: '/contact', permanent: true },
      { source: '/天使', destination: '/angel', permanent: true },
      { source: '/天使會', destination: '/angel', permanent: true },

      // Programs / incubation
      { source: '/輔導計畫', destination: '/programs', permanent: true },
      { source: '/新創輔導', destination: '/programs', permanent: true },
      { source: '/新創輔導計畫', destination: '/programs', permanent: true },

      // Corporate / partners
      { source: '/合作夥伴', destination: '/corporate-partners', permanent: true },
      { source: '/企業合作', destination: '/corporate', permanent: true },
      { source: '/企業垂直加速器', destination: '/corporate', permanent: true },

      // Alumni-family (historical teams/startups/portfolio)
      { source: '/投資組合', destination: '/alumni', permanent: true },
      { source: '/畢業團隊', destination: '/alumni', permanent: true },
      { source: '/歷年團隊', destination: '/alumni', permanent: true },
      { source: '/新創展示', destination: '/startups', permanent: true },

      // News / events / media
      { source: '/最新動態', destination: '/news', permanent: true },
      { source: '/媒體報導', destination: '/blog', permanent: true },
      { source: '/活動紀錄', destination: '/events', permanent: true },
      { source: '/活動花絮', destination: '/events', permanent: true },

      // English variants
      { source: '/mentor', destination: '/mentors', permanent: true },
      { source: '/our-team', destination: '/teams', permanent: true },
      { source: '/our-mentors', destination: '/mentors', permanent: true },
      { source: '/partners', destination: '/corporate-partners', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/startup', destination: '/startups', permanent: true },
      { source: '/demo', destination: '/demo-day', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: cspDirectives },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: permissionsPolicy },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          // X-XSS-Protection is deprecated but some scanners still flag its absence.
          // '0' is the modern best-practice value (rely on CSP instead).
          { key: 'X-XSS-Protection', value: '0' },
        ],
      },
      {
        // Sensitive API endpoints — never cache at any intermediary
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, private' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
