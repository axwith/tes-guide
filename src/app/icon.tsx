import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1e1e1e',
          color: '#60a5fa',
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: -1,
          fontFamily: 'sans-serif',
        }}
      >
        TES
      </div>
    ),
    { ...size }
  )
}
