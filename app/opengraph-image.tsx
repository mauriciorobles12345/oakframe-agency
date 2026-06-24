import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#070707',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(125,223,255,0.12) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Label */}
        <p
          style={{
            fontSize: 13,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#7DDFFF',
            marginBottom: 24,
            fontFamily: 'monospace',
          }}
        >
          Puebla, México
        </p>

        {/* Wordmark */}
        <h1
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          Oakframe Agency
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: 22,
            color: '#555',
            marginTop: 20,
            marginBottom: 0,
          }}
        >
          Diseño y Desarrollo Web · La primera impresión que no se olvida.
        </p>

        {/* Bottom line */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ width: 32, height: 1, background: '#7DDFFF' }} />
          <span style={{ fontSize: 13, color: '#7DDFFF', letterSpacing: '0.2em', fontFamily: 'monospace' }}>
            oakframe.mx
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
