'use client'

import { useSyncExternalStore } from 'react'

// 기본은 라이트. theme-init.js가 첫 페인트 전에 html.dark를 정하고, 이 버튼은 그 값을 따라 그린다.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}
const getSnapshot = () => document.documentElement.classList.contains('dark')
const getServerSnapshot = () => false

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = () => {
    const next = !isDark
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch (_) {}
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <button
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-ide-line dark:bg-ide-hover dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
      aria-label={isDark ? '라이트 모드로 바꾸기' : '다크 모드로 바꾸기'}
      title={isDark ? '라이트 모드로 바꾸기' : '다크 모드로 바꾸기'}
    >
      {isDark ? (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}
