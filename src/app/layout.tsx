import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
