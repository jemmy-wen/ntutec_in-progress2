import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Brand colors (hex equivalents of the NTUTEC teal palette)
const COLORS = {
  teal: '#0d9488',       // primary brand teal (approx. oklch 0.55 0.10 178)
  tealDeep: '#0f766e',   // deeper teal for gradients
  tealLight: '#ccfbf1',  // light teal for accents
  white: '#ffffff',
  charcoal: '#1c1917',
  slateLight: '#94a3b8',
  // Per-type accent overlays
  mentor: '#7c3aed',     // violet
  startup: '#0369a1',    // blue
  angel: '#b45309',      // amber
  default: '#0d9488',    // teal
}

function getAccentColor(type: string): string {
  switch (type) {
    case 'mentor': return COLORS.mentor
    case 'startup': return COLORS.startup
    case 'angel': return COLORS.angel
    default: return COLORS.default
  }
}

function getTypeLabel(type: string): string {
  switch (type) {
    case 'mentor': return 'Mentor Network'
    case 'startup': return 'Startup Program'
    case 'angel': return 'Angel Investment'
    default: return 'Innovation Hub'
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const title = searchParams.get('title') || '台大創創中心 NTUTEC'
  const subtitle = searchParams.get('subtitle') || 'Bridging NTU Deep Tech to Global Impact'
  const type = searchParams.get('type') || 'default'

  const accent = getAccentColor(type)
  const typeLabel = getTypeLabel(type)

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: `linear-gradient(135deg, ${COLORS.tealDeep} 0%, ${COLORS.teal} 60%, ${accent} 100%)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background geometric decoration */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '-60px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }}
        />
        {/* Accent stripe */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '6px',
            background: COLORS.tealLight,
          }}
        />

        {/* Content area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            padding: '56px 72px 52px',
          }}
        >
          {/* Top: type badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.18)',
                borderRadius: '100px',
                padding: '8px 20px',
                color: COLORS.white,
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {typeLabel}
            </div>
          </div>

          {/* Middle: title + subtitle */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxWidth: '900px',
            }}
          >
            <div
              style={{
                color: COLORS.white,
                fontSize: title.length > 30 ? '52px' : '64px',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: '26px',
                  fontWeight: 400,
                  lineHeight: 1.4,
                  maxWidth: '800px',
                }}
              >
                {subtitle}
              </div>
            )}
          </div>

          {/* Bottom: brand identity */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              {/* Logo mark — simple teal square with "T" */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: COLORS.tealLight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: COLORS.tealDeep,
                  fontSize: '24px',
                  fontWeight: 800,
                }}
              >
                T
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    color: COLORS.white,
                    fontSize: '22px',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                  }}
                >
                  NTUTEC 台大創創中心
                </span>
                <span
                  style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: '15px',
                    fontWeight: 400,
                  }}
                >
                  tec.ntu.edu.tw
                </span>
              </div>
            </div>

            <div
              style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: '14px',
              }}
            >
              NTU Taidah Entrepreneurship Center
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
