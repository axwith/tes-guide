import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 text-center dark:bg-ide-bg">
      <p className="font-mono text-sm text-brand-600 dark:text-brand-400">404</p>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-ide-text">페이지를 찾을 수 없습니다</h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">주소가 바뀌었거나 없는 페이지입니다.</p>
      <Link
        href="/"
        className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        실습 안내로 돌아가기
      </Link>
    </main>
  )
}
