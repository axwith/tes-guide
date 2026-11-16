import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import fs from 'fs'
import path from 'path'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tes.axwith.com'),
  title: 'TES Codex 실습 안내',
  description:
    '테스 Codex 실습 교육 참가자용 사전 준비·설치 안내',
  keywords: 'Codex, ChatGPT, 테스, TES, 실습, 설치 안내, AI',
  authors: [{ name: 'AXWITH' }],
  openGraph: {
    title: 'TES Codex 실습 안내',
    description: '테스 Codex 실습 교육 참가자용 사전 준비·설치 안내',
    url: 'https://tes.axwith.com',
    siteName: 'TES Codex 실습 안내',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TES Codex 실습 안내',
    description: '테스 Codex 실습 교육 참가자용 사전 준비·설치 안내',
  },
}

// 테마·과정 보기를 첫 페인트 전에 붙이려고 <head>에 인라인 동기 스크립트로 넣는다.
// next/script beforeInteractive는 정적 export에서 런타임이 나중에 불러와 느린 망에서 깜빡였다.
const initScript = ['theme-init.js', 'track-init.js']
  .map((file) => fs.readFileSync(path.join(process.cwd(), 'public', file), 'utf-8'))
  .join('\n')

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
