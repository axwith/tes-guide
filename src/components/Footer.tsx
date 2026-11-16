'use client'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200 bg-white py-12 dark:border-ide-line dark:bg-ide-bg">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <div className="font-mono text-xl font-bold text-zinc-900 dark:text-white">
            <span className="text-brand-600 dark:text-brand-400">▸</span> TES Codex 실습 안내
          </div>

          {/* Description */}
          <p className="max-w-md text-sm text-zinc-500">
            테스 Codex 실습 교육 참가자용 사전 준비·설치 안내입니다.
            교육 전에 앱 설치와 로그인을 마쳐 주세요.
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400 dark:text-zinc-500">
            <a
              href="https://chatgpt.com/ko-KR/download"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              ChatGPT 다운로드
            </a>
            <a
              href="https://help.openai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              OpenAI 도움말
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-300 dark:text-zinc-500">
            © {year} AXWITH · 테스 Codex 실습 교육
          </p>
        </div>
      </div>
    </footer>
  )
}
