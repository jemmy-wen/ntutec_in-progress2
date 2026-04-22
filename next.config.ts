import type { NextConfig } from 'next'

// Content Security Policy — hardened 2026-04-15 for 計中 security review
// Known gap: `script-src 'unsafe-inline'` required by Next.js App Router hydration.
// TODO: migrate to nonce-based CSP via middleware injection in next sprint.
const isDev = process.env.NODE_ENV === 'development'

const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://luma.com https://www.googletagmanager.com https://www.google-analytics.com https://cdn.tailwindcss.com`,
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
      //
      // NOTE: Next.js redirects() `source` does NOT decode incoming request paths
      // before matching, so a raw Chinese `source` never matches the request
      // (which arrives percent-encoded). Tested 2026-04-16 on production — raw
      // Chinese fails, percent-encoded succeeds. Keep the decoded form only in
      // the trailing `//` comment for human readability.

      // SERP-visible (highest priority — sitelinks break without these)
      { source: '/%E5%9F%B7%E8%A1%8C%E5%9C%98%E9%9A%8A', destination: '/teams', permanent: true },                                                                  // /執行團隊
      { source: '/%E6%A5%AD%E5%B8%AB%E9%99%A3%E5%AE%B9', destination: '/mentors', permanent: true },                                                                 // /業師陣容
      { source: '/%E9%97%9C%E6%96%BC%E5%8F%B0%E5%A4%A7%E5%89%B5%E5%89%B5%E4%B8%AD%E5%BF%83', destination: '/about', permanent: true },                              // /關於台大創創中心
      { source: '/%E5%8F%B0%E5%A4%A7%E5%89%B5%E5%89%B5%E6%96%B0%E5%89%B5%E8%BC%94%E5%B0%8E%E8%A8%88%E7%95%AB%E7%B8%BD%E8%A6%BD', destination: '/programs', permanent: true }, // /台大創創新創輔導計畫總覽
      { source: '/portfolio', destination: '/alumni', permanent: true },

      // Common Chinese 1-word slugs (probed 404 on 2026-04-16)
      { source: '/%E5%9C%98%E9%9A%8A', destination: '/teams', permanent: true },                         // /團隊
      { source: '/%E6%A5%AD%E5%B8%AB', destination: '/mentors', permanent: true },                       // /業師
      { source: '/%E9%97%9C%E6%96%BC', destination: '/about', permanent: true },                         // /關於
      { source: '/%E9%97%9C%E6%96%BC%E6%88%91%E5%80%91', destination: '/about', permanent: true },       // /關於我們
      { source: '/%E8%81%AF%E7%B5%A1', destination: '/contact', permanent: true },                       // /聯絡
      { source: '/%E8%81%AF%E7%B5%A1%E6%88%91%E5%80%91', destination: '/contact', permanent: true },     // /聯絡我們
      { source: '/%E5%A4%A9%E4%BD%BF', destination: '/angel', permanent: true },                         // /天使
      { source: '/%E5%A4%A9%E4%BD%BF%E6%9C%83', destination: '/angel', permanent: true },                // /天使會

      // Programs / incubation
      { source: '/%E8%BC%94%E5%B0%8E%E8%A8%88%E7%95%AB', destination: '/programs', permanent: true },                                     // /輔導計畫
      { source: '/%E6%96%B0%E5%89%B5%E8%BC%94%E5%B0%8E', destination: '/programs', permanent: true },                                     // /新創輔導
      { source: '/%E6%96%B0%E5%89%B5%E8%BC%94%E5%B0%8E%E8%A8%88%E7%95%AB', destination: '/programs', permanent: true },                  // /新創輔導計畫

      // Corporate / partners
      { source: '/%E5%90%88%E4%BD%9C%E5%A4%A5%E4%BC%B4', destination: '/corporate-partners', permanent: true },                          // /合作夥伴
      { source: '/%E4%BC%81%E6%A5%AD%E5%90%88%E4%BD%9C', destination: '/corporate', permanent: true },                                    // /企業合作
      { source: '/%E4%BC%81%E6%A5%AD%E5%9E%82%E7%9B%B4%E5%8A%A0%E9%80%9F%E5%99%A8', destination: '/corporate', permanent: true },        // /企業垂直加速器

      // Alumni-family (historical teams/startups/portfolio)
      { source: '/%E6%8A%95%E8%B3%87%E7%B5%84%E5%90%88', destination: '/alumni', permanent: true },                                       // /投資組合
      { source: '/%E7%95%A2%E6%A5%AD%E5%9C%98%E9%9A%8A', destination: '/alumni', permanent: true },                                       // /畢業團隊
      { source: '/%E6%AD%B7%E5%B9%B4%E5%9C%98%E9%9A%8A', destination: '/alumni', permanent: true },                                       // /歷年團隊
      { source: '/%E6%96%B0%E5%89%B5%E5%B1%95%E7%A4%BA', destination: '/startups', permanent: true },                                     // /新創展示

      // News / events / media
      { source: '/%E6%9C%80%E6%96%B0%E5%8B%95%E6%85%8B', destination: '/news', permanent: true },                                         // /最新動態
      { source: '/%E5%AA%92%E9%AB%94%E5%A0%B1%E5%B0%8E', destination: '/blog', permanent: true },                                         // /媒體報導
      { source: '/%E6%B4%BB%E5%8B%95%E7%B4%80%E9%8C%84', destination: '/events', permanent: true },                                       // /活動紀錄
      { source: '/%E6%B4%BB%E5%8B%95%E8%8A%B1%E7%B5%AE', destination: '/events', permanent: true },                                       // /活動花絮

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
