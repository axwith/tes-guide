/** 섹션이 속한 과정. common은 모든 과정이 함께 보는 준비·참고 섹션이다. */
export type SectionTrack = 'common' | 'lab' | 'mixed'

/** 화면에서 고르는 보기. all이면 모든 섹션을 보인다. */
export type TrackFilter = 'all' | 'lab' | 'mixed'

/** 사이드바 큰 묶음 */
export type SectionGroup = 'common' | 'lab' | 'mixed' | 'reference'

/** 묶음 안의 작은 묶음. sections.json의 tiers 키와 같다(예: start, setup, check, lab, mixed, reference).
 *  교시 묶음이 필요하면 sections.json tiers에 키만 더하면 된다. */
export type SectionTier = string

export type SectionType = 'lecture' | 'reference'

export interface SectionMeta {
  id: string
  track: SectionTrack
  tier: SectionTier
  /** 공통 섹션은 준비 단계 번호, 과정 섹션은 교시 번호(0 = 과정 안내) */
  part: number | null
  /** 같은 part 안의 순번 */
  clip: number | null
  order: number
  slug: string
  title: string
  subtitle: string
  duration_min: number | null
  icon: string
  badge: string | null
  file: string
  type: SectionType
}

export interface SectionFrontmatter {
  course_clip_ref?: string
  result_path?: string
  next_clip_id?: string
}

export interface SectionContent {
  meta: SectionMeta
  markdown: string
  frontmatter: SectionFrontmatter
}

export interface TrackMeta {
  label: string
  description: string
}

export interface GroupMeta {
  label: string
  track: SectionTrack
  order: number
}

export interface TierMeta {
  label: string
  description: string
  group: SectionGroup
  order: number
}

export interface SectionsConfig {
  site: {
    name: string
    url: string
    description: string
    course_version: string
    version: string
    lastUpdated: string
  }
  sections: SectionMeta[]
  tracks: Record<SectionTrack, TrackMeta>
  groups: Record<SectionGroup, GroupMeta>
  tiers: Record<SectionTier, TierMeta>
}

export function isTrackVisible(track: SectionTrack, filter: TrackFilter): boolean {
  return filter === 'all' || track === 'common' || track === filter
}
