'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from 'react'
import type { TrackFilter } from '@/types'
import { trackTrackSelect } from '@/lib/analytics'

interface TrackContextValue {
  track: TrackFilter
  setTrack: (next: TrackFilter) => void
}

const TrackContext = createContext<TrackContextValue | null>(null)
const CHANGE_EVENT = 'tes-track-change'

function parseTrack(value: string | null | undefined): TrackFilter {
  return value === 'lab' || value === 'mixed' ? value : 'all'
}

// 정본은 <html data-track>이다. public/track-init.js가 첫 페인트 전에 붙이고, 고르면 여기서 바꾼다.
function readTrack(): TrackFilter {
  return parseTrack(document.documentElement.getAttribute('data-track'))
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => window.removeEventListener(CHANGE_EVENT, onChange)
}

function syncUrl(next: TrackFilter) {
  const url = new URL(window.location.href)
  if (next === 'all') url.searchParams.delete('track')
  else url.searchParams.set('track', next)
  window.history.replaceState(window.history.state, '', url.toString())
}

function applyTrack(next: TrackFilter, persist = true) {
  document.documentElement.setAttribute('data-track', next)
  if (persist) {
    try {
      localStorage.setItem('track', next)
    } catch {}
  }
  syncUrl(next)
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function TrackProvider({
  children,
  fixedTrack,
}: {
  children: React.ReactNode
  /** 과정 페이지처럼 과정이 정해져 있으면 주소·저장값을 건드리지 않는다 */
  fixedTrack?: TrackFilter
}) {
  // 정적 export라 서버 렌더 값은 '전체'다. 클라이언트에서는 html[data-track]을 읽는다.
  const track = useSyncExternalStore(subscribe, readTrack, () => 'all' as TrackFilter)

  // localStorage에서 복원한 과정도 주소에 남겨 그대로 공유할 수 있게 한다
  useEffect(() => {
    if (fixedTrack) return
    syncUrl(readTrack())
  }, [fixedTrack])

  const setTrack = useCallback((next: TrackFilter) => {
    applyTrack(next)
    trackTrackSelect({ track: next })
  }, [])

  // 다른 과정 섹션으로 가는 링크(#mixed-… 등)를 누르면 그 섹션이 숨겨져 있으므로 '전체'로 풀어 보여 준다.
  // 이때는 잠시 펼친 보기라 저장하지 않는다. 다음 방문에는 사용자가 고른 과정이 그대로 남는다.
  useEffect(() => {
    if (fixedTrack) return
    const revealIfHidden = (id: string) => {
      if (!id) return null
      const el = document.getElementById(id)
      if (el && el.offsetParent === null && el.getAttribute('data-track-item') !== 'common') {
        applyTrack('all', false)
        return el
      }
      return null
    }
    // 해시가 이미 같은 값이면 hashchange가 오지 않으므로 클릭을 capture 단계에서 먼저 받는다.
    // 속성을 동기로 바꾸므로 브라우저 기본 앵커 이동이 펼쳐진 섹션으로 간다.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]')
      if (!link) return
      revealIfHidden(decodeURIComponent((link.getAttribute('href') ?? '').slice(1)))
    }
    // 주소로 바로 들어오거나 뒤로 가기로 해시가 바뀐 경우
    const onHash = () => {
      const el = revealIfHidden(decodeURIComponent(window.location.hash.slice(1)))
      if (el) requestAnimationFrame(() => el.scrollIntoView())
    }
    onHash()
    document.addEventListener('click', onClick, true)
    window.addEventListener('hashchange', onHash)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('hashchange', onHash)
    }
  }, [fixedTrack])

  const value = useMemo(() => ({ track, setTrack }), [track, setTrack])
  return <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
}

export function useTrack(): TrackContextValue {
  const context = useContext(TrackContext)
  if (!context) throw new Error('useTrack must be used within TrackProvider')
  return context
}
