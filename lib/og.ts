/**
 * OG image URL helper
 * Generates dynamic social preview images via /api/og
 *
 * Types:
 *   default  — generic teal gradient (homepage, apply, etc.)
 *   mentor   — violet accent (mentor network pages)
 *   startup  — blue accent (accelerator, programs)
 *   angel    — amber accent (angel / pitch pages)
 */
export function ogImageUrl(
  title: string,
  subtitle?: string,
  type?: 'default' | 'mentor' | 'startup' | 'angel'
): string {
  const params = new URLSearchParams({ title })
  if (subtitle) params.set('subtitle', subtitle)
  if (type) params.set('type', type)
  return `/api/og?${params.toString()}`
}
