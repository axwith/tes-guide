import Link from 'next/link'

interface CourseHeroProps {
  /** 과정 이름, 예: 연구소 과정 */
  courseLabel: string
  /** 회차·날짜 한 줄 */
  dateLine: string
  /** 교시별 한 줄 요약(1~3교시) */
  periods: { num: string; title: string; desc: string }[]
  /** 이 과정의 다른 과정 페이지 */
  other: { href: string; label: string }
}

/** 과정 페이지(/rnd/, /biz/) 머리 영역. 메인 Hero와 같은 카드 모양을 쓰고 움직이는 배경은 뺐다. */
export function CourseHero({ courseLabel, dateLine, periods, other }: CourseHeroProps) {
  return (
    <section className="relative z-[2] overflow-hidden border-b border-zinc-200 bg-white pb-14 pt-28 dark:border-ide-line dark:bg-ide-bg">
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-6">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-600 dark:text-brand-400">
          <span className="font-mono">▸</span>
          <span>테스 Codex 실습 교육 · {dateLine}</span>
        </div>

        <h1 className="mb-5 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
          <span className="text-brand-500 dark:text-brand-400">{courseLabel}</span> 당일 안내
        </h1>

        <p className="mb-8 text-lg text-zinc-500 dark:text-zinc-400">
          1교시부터 3교시까지 순서대로 따라 합니다. 실습 폴더를 먼저 받아 두세요.
        </p>

        <ol className="mx-auto mb-8 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
          {periods.map((p) => (
            <li
              key={p.num}
              className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm dark:border-ide-line dark:bg-ide-panel"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 font-mono text-sm font-bold text-white">
                  {p.num}
                </span>
                <span className="font-semibold text-zinc-900 dark:text-white">{p.title}</span>
              </div>
              <p className="break-keep text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{p.desc}</p>
            </li>
          ))}
        </ol>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/downloads/tes-lab.zip"
            download
            className="min-w-[10rem] rounded-lg bg-brand-600 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            실습 폴더 받기 (tes-lab.zip)
          </a>
          <Link
            href="/"
            className="min-w-[10rem] rounded-lg border border-zinc-300 px-6 py-3 text-center text-sm font-semibold text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-ide-line dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
          >
            설치·준비 안내로
          </Link>
          <Link
            href={other.href}
            className="text-sm text-zinc-400 underline-offset-4 hover:text-zinc-700 hover:underline dark:text-zinc-500 dark:hover:text-zinc-300"
          >
            {other.label} →
          </Link>
        </div>
      </div>
    </section>
  )
}
