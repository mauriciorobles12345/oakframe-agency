import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#070707',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: '#7DDFFF',
            fontFamily: 'sans-serif',
            letterSpacing: '-0.05em',
          }}
        >
          O
        </div>
      </div>
    ),
    { ...size }
  )
}
