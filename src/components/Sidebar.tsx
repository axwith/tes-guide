'use client'

import { useEffect, useRef, useState } from 'react'
import type { GroupMeta, SectionGroup, SectionMeta, SectionTier, TierMeta } from '@/types'
import { isTrackVisible } from '@/types'
import { trackTocClick } from '@/lib/analytics'
import { SearchBar } from './SearchBar'
import { useTrack } from './TrackContext'

interface SidebarProps {
  sections: SectionMeta[]
  tiers: Record<SectionTier, TierMeta>
  groups: Record<SectionGroup, GroupMeta>
  onLinkClick?: () => void
  isMobile?: boolean
}

export function Sidebar({ sections, tiers, groups, onLinkClick, isMobile = false }: SidebarProps) {
  const { track } = useTrack()
  const [activeId, setActiveId] = useState<string>('')
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})
  const [matchedIds, setMatchedIds] = useState<string[] | null>(null)
  const navRef = useRef<HTMLElement>(null)

  // Auto-scroll sidebar to keep active item visible
  useEffect(() => {
    if (!activeId || !navRef.current) return
    const activeEl = navRef.current.querySelector(`a[href="#${activeId}"]`) as HTMLElement | null
    if (!activeEl) return

    const scrollContainer = navRef.current.parentElement
    if (!scrollContainer) return

    const containerRect = scrollContainer.getBoundingClientRect()
    const elRect = activeEl.getBoundingClientRect()

    if (elRect.top < containerRect.top || elRect.bottom > containerRect.bottom) {
      const offset =
        elRect.top - containerRect.top - containerRect.height / 2 + elRect.height / 2
      scrollContainer.scrollBy({ top: offset, behavior: 'smooth' })
    }
  }, [activeId])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -70% 0%' }
    )

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  const trackSections = sections.filter((s) => isTrackVisible(s.track, track))
  const visibleSections =
    matchedIds === null ? trackSections : trackSections.filter((s) => matchedIds.includes(s.id))

  const groupKeys = (Object.keys(groups) as SectionGroup[]).sort(
    (a, b) => groups[a].order - groups[b].order
  )
  const tierKeys = Object.keys(tiers).sort((a, b) => tiers[a].order - tiers[b].order)

  const grouped = groupKeys.map((groupKey) => {
    const group = groups[groupKey]
    const groupTiers = tierKeys
      .filter((tierKey) => tiers[tierKey].group === groupKey)
      .map((tierKey) => ({
        key: tierKey,
        meta: tiers[tierKey],
        sections: visibleSections.filter((s) => s.tier === tierKey),
      }))
      .filter((t) => t.sections.length > 0)
    return { key: groupKey, meta: group, tiers: groupTiers }
  })

  // 참고 묶음은 접을 수 있다
  const isCollapsible = (key: string) => key === 'reference'

  return (
    <nav ref={navRef} className="flex flex-col gap-1">
      {/* 과정별 안내 공개 전까지 과정 선택 숨김(TrackSelector) */}
      <SearchBar onResults={setMatchedIds} track={track} />
      {matchedIds !== null && visibleSections.length === 0 ? (
        <p className="px-2 py-2 text-sm text-zinc-400 dark:text-zinc-500">검색 결과 없음</p>
      ) : (
        grouped.map(({ key, meta, tiers: groupTiers }) => {
          if (groupTiers.length === 0) return null
          const collapsed = collapsedGroups[key] ?? false
          const collapsible = isCollapsible(key)
          // 과정 묶음처럼 작은 묶음이 묶음 이름과 같으면 작은 머리말은 생략한다
          const showTierLabels = groupTiers.some((t) => t.meta.label !== meta.label)

          return (
            <div key={key} data-track-item={meta.track} className="mb-3">
              {collapsible ? (
                <button
                  onClick={() => setCollapsedGroups((s) => ({ ...s, [key]: !collapsed }))}
                  className="mb-2 flex w-full items-center justify-between px-2 text-xs font-bold tracking-wide text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  <span>{meta.label}</span>
                  <span className="text-zinc-400 dark:text-zinc-500">{collapsed ? '▸' : '▾'}</span>
                </button>
              ) : (
                <p className="mb-2 flex items-center gap-2 px-2 text-xs font-bold tracking-wide text-zinc-500 dark:text-zinc-400">
                  {meta.track !== 'common' && (
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                  )}
                  {meta.label}
                </p>
              )}
              {!collapsed &&
                groupTiers.map(({ key: tierKey, meta: tierMeta, sections: tierSections }) => (
                  <div key={tierKey} className="mb-1.5">
                    {showTierLabels && (
                      <p className="mb-1 px-2 text-[11px] text-zinc-400 dark:text-zinc-500">
                        {tierMeta.label}
                      </p>
                    )}
                    {tierSections.map((section) => (
                      <SidebarItem
                        key={section.id}
                        section={section}
                        isActive={activeId === section.id}
                        onLinkClick={onLinkClick}
                        isMobile={isMobile}
                      />
                    ))}
                  </div>
                ))}
            </div>
          )
        })
      )}
    </nav>
  )
}

/** 사이드바 번호: 공통 준비는 'P-CL'(예: 1-01), 과정 안내는 '안내', 교시는 'N교시', 참고는 '참고' */
export function sidebarNumLabel(section: SectionMeta): string {
  if (section.type === 'reference' || section.part == null || section.clip == null) return '참고'
  if (section.track === 'common') return `${section.part}-${String(section.clip).padStart(2, '0')}`
  if (section.part === 0) return '안내'
  return section.clip > 1 ? `${section.part}교시·${section.clip}` : `${section.part}교시`
}

function SidebarItem({
  section,
  isActive,
  onLinkClick,
  isMobile = false,
}: {
  section: SectionMeta
  isActive: boolean
  onLinkClick?: () => void
  isMobile?: boolean
}) {
  const handleClick = () => {
    trackTocClick({ target_section: section.id, is_mobile: isMobile })
    onLinkClick?.()
  }

  return (
    <a
      href={`#${section.id}`}
      onClick={handleClick}
      data-track-item={section.track}
      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
        isActive
          ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
          : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-ide-hover dark:hover:text-zinc-200'
      }`}
    >
      <span className="w-10 shrink-0 text-center font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
        {sidebarNumLabel(section)}
      </span>
      <span className="truncate">{section.title}</span>
      {section.badge && (
        <span className="ml-auto shrink-0 rounded bg-brand-500/20 px-1 py-0.5 text-[10px] text-brand-600 dark:text-brand-400">
          {section.badge}
        </span>
      )}
    </a>
  )
}
