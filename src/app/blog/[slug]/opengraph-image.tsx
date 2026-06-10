import { ImageResponse } from 'next/og'
import { POSTS } from '@/components/blog/blogData'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = POSTS.find(p => p.slug === slug)

  const title = post?.title ?? 'Emithran Blog'
  const category = (post?.category ?? 'Manufacturing Intelligence').toUpperCase()
  const author = post?.author?.name ?? 'Emithran'
  const date = post?.date ?? ''
  const readTime = post?.readTime ?? ''

  const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL ?? 'https://emithran.emuski.com'
  const domain = siteUrl.replace(/^https?:\/\//, '')

  const titleSize = title.length > 70 ? 40 : title.length > 50 ? 48 : 54

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f1b2d',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot-grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(45,212,191,0.12) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Teal glow top-right */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -120,
            width: 560,
            height: 560,
            background: 'radial-gradient(circle, rgba(13,158,138,0.22) 0%, transparent 68%)',
            borderRadius: '50%',
          }}
        />

        {/* Bottom-left subtle glow */}
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            left: -80,
            width: 360,
            height: 360,
            background: 'radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Header: logo + blog tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 'auto' }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: 7,
              }}
            >
              EMITHRAN
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#2dd4bf',
                background: 'rgba(45,212,191,0.1)',
                padding: '4px 12px',
                borderRadius: 100,
                letterSpacing: 2,
                textTransform: 'uppercase',
                border: '1px solid rgba(45,212,191,0.25)',
              }}
            >
              BLOG
            </div>
          </div>

          {/* Category label with bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 28,
                height: 3,
                background: '#2dd4bf',
                borderRadius: 2,
              }}
            />
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#2dd4bf',
                letterSpacing: 3,
              }}
            >
              {category}
            </div>
          </div>

          {/* Post title */}
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.2,
              letterSpacing: '-1px',
              marginBottom: 28,
              maxWidth: 940,
            }}
          >
            {title}
          </div>

          {/* Teal accent bar */}
          <div
            style={{
              width: 56,
              height: 4,
              background: '#0d9e8a',
              borderRadius: 2,
              marginBottom: 28,
            }}
          />

          {/* Author + meta row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: 15,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {/* Author dot */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              {author.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
            </div>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{author}</span>
            {date && (
              <>
                <span style={{ color: '#2dd4bf' }}>·</span>
                <span>{date}</span>
              </>
            )}
            {readTime && (
              <>
                <span style={{ color: '#2dd4bf' }}>·</span>
                <span>{readTime}</span>
              </>
            )}
          </div>

          {/* Domain badge - absolute bottom-right */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(13,158,138,0.12)',
              padding: '10px 22px',
              borderRadius: 100,
              border: '1.5px solid rgba(13,158,138,0.28)',
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                background: '#0d9e8a',
                borderRadius: '50%',
              }}
            />
            <div style={{ fontSize: 15, color: '#2dd4bf', fontWeight: 600 }}>
              {domain}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
