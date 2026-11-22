import { Suspense } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import {
  getSectionsConfig,
  getSectionMetas,
  getAllSectionMarkdowns,
} from '@/lib/content'
import { PageClient } from '@/components/PageClient'
import type { SectionTrack } from '@/types'
import { SectionBlock } from '@/components/SectionBlock'
import { CodeBlock } from '@/components/CodeBlock'
import { getImageSize } from '@/lib/image-size'

function MarkdownImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, ...rest } = props
  if (typeof src !== 'string') return <img alt={alt ?? ''} {...rest} />
  const size = getImageSize(src)
  return (
    <a href={src} target="_blank" rel="noopener noreferrer" title="원본 크기로 보기">
      <img
        src={src}
        alt={alt ?? ''}
        width={size?.width}
        height={size?.height}
        loading="lazy"
        decoding="async"
        {...rest}
      />
    </a>
  )
}

interface GuidePageProps {
  /** 이 페이지에 보일 섹션의 과정. 메인은 common, 과정 페이지는 lab·mixed */
  track: SectionTrack
  /** 머리 영역. 없으면 메인 Hero */
  hero?: React.ReactNode
}

export function GuidePage({ track, hero }: GuidePageProps) {
  const config = getSectionsConfig()
  const sections = getSectionMetas().filter((s) => s.track === track)
  const sectionContents = getAllSectionMarkdowns().filter(({ meta }) => meta.track === track)
  const fixedTrack = track === 'common' ? undefined : track

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PageClient
        sections={sections}
        tiers={config.tiers}
        groups={config.groups}
        hero={hero}
        fixedTrack={fixedTrack}
      >
        {sectionContents.map(({ meta, markdown, frontmatter }) => (
          <SectionBlock
            key={meta.id}
            id={meta.id}
            order={meta.order}
            tier={meta.tier}
            track={meta.track}
            trackLabel={config.tracks[meta.track]?.label ?? ''}
            title={meta.title}
            subtitle={meta.subtitle}
            part={meta.part}
            clip={meta.clip}
            badge={meta.badge}
            type={meta.type}
            frontmatter={frontmatter}
          >
            <MDXRemote
              source={markdown}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              components={{ pre: CodeBlock as any, img: MarkdownImage as any }}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </SectionBlock>
        ))}
      </PageClient>
    </Suspense>
  )
}
