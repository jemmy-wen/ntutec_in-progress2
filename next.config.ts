import type { NextConfig } from 'next'

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://luma.com https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https: https://ntutec.ghost.io https://*.ghost.io https://www.google-analytics.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://ntutec.ghost.io https://www.google-analytics.com https://analytics.google.com",
  "frame-src https://luma.com https://www.google.com https://maps.googleapis.com",
  "frame-ancestors 'none'",
].join('; ')

const nextConfig: NextConfig = {
  // Skip ESLint during build — re-enable after SQL migration + @ts-nocheck removal
  eslint: { ignoreDuringBuilds: true },
  serverExternalPackages: ['nodemailer'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'ntutec.ghost.io' },
      { protocol: 'https', hostname: '*.ghost.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'static.ghost.org' },
    ],
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
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
