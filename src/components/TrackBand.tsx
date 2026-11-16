'use client'

import { TrackSelector } from './TrackSelector'

/** Hero 바로 아래 과정 선택 띠. 고른 과정과 공통 준비만 본문·목차·검색에 보인다. */
export function TrackBand() {
  return (
    <div className="relative z-[2] border-b border-zinc-200 bg-zinc-50 dark:border-ide-line dark:bg-ide-panel">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 py-6 text-center lg:px-6">
        <p className="text-sm font-semibold text-zinc-800 sm:text-base dark:text-zinc-100">
          내 과정을 고르면 그 과정 안내와 공통 준비만 보입니다
        </p>
        <TrackSelector size="large" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          연구소 과정은 1·2회차, 혼합직무 과정은 3회차입니다. 설치와 점검표는 두 과정이 같습니다.
        </p>
      </div>
    </div>
  )
}
