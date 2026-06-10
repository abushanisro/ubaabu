import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Emithran - End-to-End Manufacturing Intelligence'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  // Load the black logo from the deployment's static assets
  let logoSrc: string | null = null
  const deploymentUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL ?? null

  if (deploymentUrl) {
    try {
      const res = await fetch(
        `${deploymentUrl}/assets/infographics/logo/logo-black.png`,
        { cache: 'no-store' }
      )
      if (res.ok) {
        const buf = await res.arrayBuffer()
        const arr = new Uint8Array(buf)
        let binary = ''
        for (let i = 0; i < arr.length; i++) binary += String.fromCharCode(arr[i])
        logoSrc = `data:image/png;base64,${btoa(binary)}`
      }
    } catch {
      // fall through to text branding
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px 80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Logo or text fallback */}
        {logoSrc ? (
          <img
            src={logoSrc}
            width={180}
            height={45}
            style={{ objectFit: 'contain', objectPosition: 'left center', marginBottom: 44 }}
          />
        ) : (
          <div
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: '#0f1b2d',
              letterSpacing: 8,
              marginBottom: 44,
            }}
          >
            EMITHRAN
          </div>
        )}

        {/* Teal accent bar */}
        <div
          style={{
            width: 72,
            height: 5,
            background: '#0d9e8a',
            borderRadius: 3,
            marginBottom: 36,
          }}
        />

        {/* Headline */}
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: '#0f1b2d',
            lineHeight: 1.1,
            letterSpacing: '-2px',
            marginBottom: 24,
          }}
        >
          Manufacturing Intelligence
          <br />for the Future
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: 'rgba(15,27,45,0.45)',
            fontWeight: 400,
          }}
        >
          Space · Defence · Aerospace · Precision Manufacturing
        </div>

        {/* Domain badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 72,
            right: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#f0fdf9',
            padding: '10px 22px',
            borderRadius: 100,
            border: '1.5px solid rgba(13,158,138,0.3)',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: '#0d9e8a',
              borderRadius: '50%',
            }}
          />
          <div style={{ fontSize: 18, color: '#0d9e8a', fontWeight: 600 }}>
            emithran.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
