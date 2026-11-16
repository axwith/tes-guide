'use client'

import { useState, useRef } from 'react'
import { trackCtaClick } from '@/lib/analytics'

const steps = [
  { num: '1', title: '앱 설치', desc: 'ChatGPT 데스크톱 앱을 내려받아 설치합니다' },
  { num: '2', title: '로그인', desc: '회사 계정으로 로그인하고 Codex를 엽니다' },
  { num: '3', title: '폴더 연결', desc: 'codex-교육 폴더를 만들어 작업 폴더로 연결합니다' },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative z-[2] overflow-hidden border-b border-zinc-200 bg-white pb-16 pt-32 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <style>{`
        @keyframes aurora-move {
          from { background-position: 50% 50%, 50% 50%; }
          to   { background-position: 350% 50%, 350% 50%; }
        }
      `}</style>

      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: [
              'repeating-linear-gradient(100deg, #09090b 0%, #09090b 7%, transparent 10%, transparent 12%, #09090b 16%)',
              'repeating-linear-gradient(100deg, #fc1c49 10%, #fd4f6f 15%, #fc1c49 20%, #e00f3b 25%, #fc1c49 30%)',
            ].join(', '),
            backgroundSize: '300%, 200%',
            animation: 'aurora-move 60s linear infinite',
            filter: 'blur(10px) opacity(0.22) saturate(180%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 40%, transparent 80%)',
            maskImage: 'radial-gradient(ellipse at 50% 0%, black 40%, transparent 80%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: [
              'repeating-linear-gradient(100deg, #09090b 0%, #09090b 7%, transparent 10%, transparent 12%, #09090b 16%)',
              'repeating-linear-gradient(100deg, #fc1c49 10%, #fd4f6f 15%, #fc1c49 20%, #e00f3b 25%, #fc1c49 30%)',
            ].join(', '),
            backgroundSize: '200%, 100%',
            animation: 'aurora-move 60s linear infinite',
            filter: 'blur(8px) opacity(0.10) saturate(180%)',
            mixBlendMode: 'screen',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 40%, transparent 80%)',
            maskImage: 'radial-gradient(ellipse at 50% 0%, black 40%, transparent 80%)',
          }}
        />
      </div>

      {/* Mouse glow */}
      <div
        className="pointer-events-none absolute z-0 hidden h-[400px] w-[400px] rounded-full bg-brand-500 blur-[100px] opacity-20 md:block"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          transition:
            'left 1s cubic-bezier(0.25,0.46,0.45,0.94), top 1s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-6">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-500 dark:text-brand-400">
          <span className="font-mono">▸</span>
          <span>테스 Codex 실습 교육</span>
        </div>

        {/* Title */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
          <span className="text-brand-500 dark:text-brand-400">Codex</span> 실습 교육
          <br />
          사전 준비 안내
        </h1>

        {/* Subtitle */}
        <p className="mb-10 text-lg text-zinc-500 sm:text-xl dark:text-zinc-400">
          테스 · 2026년 11월 24~26일 · 교육 전에 아래 세 가지를 준비해 주세요
        </p>

        {/* Steps */}
        <ol className="mx-auto mb-10 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.num}
              className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 font-mono text-sm font-bold text-white">
                  {step.num}
                </span>
                <span className="font-semibold text-zinc-900 dark:text-white">{step.title}</span>
              </div>
              <p className="break-keep text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{step.desc}</p>
            </li>
          ))}
        </ol>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#part-1-01-windows"
            onClick={() =>
              trackCtaClick({
                cta_id: 'start_install',
                destination: '#part-1-01-windows',
              })
            }
            className="min-w-[10rem] rounded-lg bg-brand-500 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-400"
          >
            Windows 설치 시작 →
          </a>
          <a
            href="/docs/tes-codex-windows-install.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackCtaClick({
                cta_id: 'install_pdf',
                destination: '/docs/tes-codex-windows-install.pdf',
              })
            }
            className="min-w-[10rem] rounded-lg border border-zinc-300 px-6 py-3 text-center text-sm font-semibold text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
          >
            설치 설명서 PDF
          </a>
        </div>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-400 dark:text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-brand-500 dark:text-brand-400">3</span>
            <span>준비 단계</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-500 dark:text-brand-400">Windows</span>
            <span>기준</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-500 dark:text-brand-400">KO</span>
          </div>
        </div>
      </div>
    </section>
  )
}
