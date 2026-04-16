import type { MetadataRoute } from 'next'

const BASE_URL = 'https://tec.ntu.edu.tw'

/**
 * robots.txt
 *
 * Access policy:
 * - All crawlers (incl. Googlebot, Bingbot, AI assistants) are allowed on public content
 * - Auth-gated and API routes are disallowed for all user-agents
 * - AI assistant crawlers are explicitly listed (AEO requirement) so operators
 *   can see our stance even if the wildcard rule already permits them
 *
 * AI crawlers listed (2026-04 current list; review quarterly):
 * - GPTBot (OpenAI search/training), ChatGPT-User (ChatGPT inline browsing)
 * - ClaudeBot, Claude-Web (Anthropic)
 * - PerplexityBot (Perplexity.ai)
 * - Google-Extended (Google AI training; separate from Googlebot search)
 * - CCBot (Common Crawl, used by many LLM training pipelines)
 * - Applebot-Extended (Apple Intelligence)
 * - Bytespider (ByteDance)
 * - Amazonbot (Alexa/Amazon)
 */
const AI_USER_AGENTS = [
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'PerplexityBot',
  'Google-Extended',
  'CCBot',
  'Applebot-Extended',
  'Bytespider',
  'Amazonbot',
]

const DISALLOW_PATHS = [
  '/admin',
  '/admin/',
  '/angel/portal',
  '/angel/portal/',
  '/api',
  '/api/',
  '/callback',
  '/login',
  '/vote',
  '/vote/',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW_PATHS,
      },
      // Explicit allow for AI assistant crawlers — same policy as wildcard,
      // but listing them makes the stance machine-verifiable for AEO audits
      ...AI_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: DISALLOW_PATHS,
      })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
