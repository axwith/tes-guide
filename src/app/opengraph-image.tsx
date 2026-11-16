import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const alt = 'TES Codex 실습 안내'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#09090b',
          backgroundImage:
            'radial-gradient(ellipse at 25% 0%, rgba(255, 0, 60, 0.55) 0%, rgba(9, 9, 11, 0) 55%), radial-gradient(ellipse at 90% 100%, rgba(255, 58, 102, 0.35) 0%, rgba(9, 9, 11, 0) 55%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          padding: 96,
        }}
      >
        {/* Top brand row — CSS triangle + text */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            color: '#fc1c49',
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: '12px solid transparent',
              borderBottom: '12px solid transparent',
              borderLeft: '20px solid #fc1c49',
            }}
          />
          <span>TES Codex 실습</span>
        </div>

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: -3,
            marginBottom: 36,
            color: '#ffffff',
          }}
        >
          <div style={{ display: 'flex' }}>
            <span style={{ color: '#fc1c49' }}>Codex</span>
            <span>&nbsp;실습 교육</span>
          </div>
          <div>사전 준비 안내</div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            color: '#a1a1aa',
            fontWeight: 500,
          }}
        >
          테스 · 11월 24~26일
        </div>

        {/* Bottom stats row */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 96,
            display: 'flex',
            gap: 32,
            color: '#71717a',
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ color: '#fc1c49' }}>3</span>
            <span>준비 단계</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ color: '#fc1c49' }}>Windows</span>
            <span>기준</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
