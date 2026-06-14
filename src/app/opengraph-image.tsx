import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Emithran - Manufacturing Intelligence Platform'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: '#0f1b2d',
            letterSpacing: '8px',
            marginBottom: '44px',
            display: 'flex',
          }}
        >
          EMITHRAN
        </div>

        <div
          style={{
            width: '72px',
            height: '5px',
            background: '#0d9e8a',
            borderRadius: '3px',
            marginBottom: '36px',
            display: 'flex',
          }}
        />

        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: '#0f1b2d',
            lineHeight: 1.1,
            letterSpacing: '-2px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Manufacturing Intelligence</span>
          <span>for the Future</span>
        </div>

        <div
          style={{
            fontSize: 24,
            color: 'rgba(15,27,45,0.45)',
            fontWeight: 400,
            display: 'flex',
          }}
        >
          Space · Defence · Aerospace · Precision Manufacturing
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f0fdf9',
            padding: '10px 22px',
            borderRadius: '100px',
            border: '1.5px solid rgba(13,158,138,0.3)',
            marginTop: '48px',
            width: 'fit-content',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              background: '#0d9e8a',
              borderRadius: '50%',
              display: 'flex',
            }}
          />
          <div style={{ fontSize: 18, color: '#0d9e8a', fontWeight: 600, display: 'flex' }}>
            www.emithran.com
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
