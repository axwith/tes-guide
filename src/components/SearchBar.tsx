'use client'

import Fuse from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'
import type { JSX } from 'react'
import { trackSearchQuery } from '@/lib/analytics'
import type { SectionTrack, TrackFilter } from '@/types'
import { isTrackVisible } from '@/types'

interface SearchEntry {
  id: string
  track: SectionTrack
  track_label: string
  tier: string
  tier_label: string
  title: string
  subtitle: string
  headings: string[]
  body?: string
  url: string
}

interface SearchBarProps {
  onResults: (matchedIds: string[] | null) => void
  /** 고른 과정. 그 과정과 공통 섹션만 검색한다. */
  track: TrackFilter
}

export function SearchBar(props: SearchBarProps): JSX.Element {
  const { onResults, track } = props
  const [entries, setEntries] = useState<SearchEntry[]>([])
  const [indexLoaded, setIndexLoaded] = useState(false)
  const [query, setQuery] = useState('')
  const [isComposing, setIsComposing] = useState(false)

  const trackEntries = useMemo(
    () => entries.filter((entry) => isTrackVisible(entry.track ?? 'common', track)),
    [entries, track]
  )

  const fuse = useMemo(
    () =>
      new Fuse(trackEntries, {
        keys: [
          { name: 'title', weight: 3 },
          { name: 'subtitle', weight: 2 },
          { name: 'headings', weight: 1 },
          { name: 'tier_label', weight: 0.5 },
          { name: 'track_label', weight: 0.5 },
        ],
        threshold: 0.4,
        minMatchCharLength: 2,
        ignoreLocation: true,
      }),
    [trackEntries]
  )

  useEffect(() => {
    let cancelled = false

    fetch('/search-index.json')
      .then((response) => (response.ok ? response.json() : []))
      .then((data: SearchEntry[]) => {
        if (cancelled) return
        setEntries(data)
        setIndexLoaded(true)
      })
      .catch(() => {
        if (cancelled) return
        setEntries([])
        setIndexLoaded(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (isComposing) return

    const trimmedQuery = query.trim()
    const timer = window.setTimeout(() => {
      if (trimmedQuery.length === 0) {
        onResults(null)
        return
      }
      if (!indexLoaded) return

      // 본문은 길어서 퍼지 매칭이 과하게 걸리므로 정확히 포함된 섹션만 뒤에 더한다
      const fuzzyIds = fuse.search(trimmedQuery).map(({ item }) => item.id)
      const needle = trimmedQuery.toLowerCase()
      const bodyIds = trackEntries
        .filter((entry) => !fuzzyIds.includes(entry.id) && entry.body?.toLowerCase().includes(needle))
        .map((entry) => entry.id)
      const matchedIds = [...fuzzyIds, ...bodyIds]
      onResults(matchedIds)
      trackSearchQuery({ query: trimmedQuery, result_count: matchedIds.length })
    }, 200)

    return () => window.clearTimeout(timer)
  }, [trackEntries, fuse, indexLoaded, isComposing, onResults, query])

  return (
    <input
      type="text"
      value={query}
      onChange={(event) => setQuery(event.currentTarget.value)}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={(event) => {
        setIsComposing(false)
        setQuery(event.currentTarget.value)
      }}
      placeholder="검색..."
      aria-label="검색"
      className="mb-4 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ide-line dark:bg-ide-bg dark:text-zinc-100 dark:placeholder:text-zinc-500"
    />
  )
}
