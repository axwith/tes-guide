'use client'

import type { TrackFilter } from '@/types'
import { useTrack } from './TrackContext'

const options: { value: TrackFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'lab', label: '연구소 과정' },
  { value: 'mixed', label: '혼합직무 과정' },
]

interface TrackSelectorProps {
  size?: 'large' | 'compact'
  onSelect?: () => void
}

/**
 * 과정 선택기. 선택 표시는 globals.css의 html[data-track] 규칙이 그려서
 * 하이드레이션 전에도 깜빡이지 않는다. aria-pressed는 하이드레이션 뒤 React 상태로 맞춘다.
 */
export function TrackSelector({ size = 'compact', onSelect }: TrackSelectorProps) {
  const { track, setTrack } = useTrack()
  const large = size === 'large'

  return (
    <div
      role="group"
      aria-label="과정 선택"
      className={`track-selector grid rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-ide-line dark:bg-ide-bg ${
        large ? 'w-full max-w-xl grid-cols-3 gap-1' : 'w-full grid-cols-[auto_1fr_1fr] gap-0.5'
      }`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          data-option={option.value}
          aria-pressed={track === option.value}
          onClick={() => {
            setTrack(option.value)
            onSelect?.()
          }}
          className={`track-option whitespace-nowrap rounded-md font-semibold text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white ${
            large ? 'px-4 py-2.5 text-sm sm:text-base' : 'px-2 py-1.5 text-xs'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
