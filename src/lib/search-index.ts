import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface SectionMeta {
  id: string
  track: string
  tier: string
  title: string
  subtitle: string
  file: string
}

interface SectionsConfig {
  sections: SectionMeta[]
  tracks: Record<string, { label: string }>
  tiers: Record<string, { label: string }>
}

interface SearchEntry {
  id: string
  track: string
  track_label: string
  tier: string
  tier_label: string
  title: string
  subtitle: string
  headings: string[]
  body: string
  url: string
}

function extractHeadings(markdown: string): string[] {
  return (markdown.match(/^## .+$/gm) ?? [])
    .map((line) =>
      line
        .replace(/^##\s+/, '')
        .replace(/^(?:[\p{Extended_Pictographic}\uFE0F\u200D]+\s*)+/u, '')
        .trim()
    )
    .filter(Boolean)
}

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```\w*/g, ' '))
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/^\s*[-*]\s+(\[[ x]\]\s+)?/gm, '')
    .replace(/^\|?\s*-{3,}.*$/gm, '')
    .replace(/[|*`_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function readSection(file: string): { headings: string[]; body: string } {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'content', file), 'utf-8')
    const content = matter(raw).content
    return { headings: extractHeadings(content), body: stripMarkdown(content) }
  } catch {
    return { headings: [], body: '' }
  }
}

function buildSearchIndex(): SearchEntry[] {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', 'sections.json'), 'utf-8')
  const config = JSON.parse(raw) as SectionsConfig

  return config.sections.map((section) => {
    const { headings, body } = readSection(section.file)
    return {
      id: section.id,
      track: section.track,
      track_label: config.tracks[section.track]?.label ?? '',
      tier: section.tier,
      tier_label: config.tiers[section.tier]?.label ?? '',
      title: section.title,
      subtitle: section.subtitle,
      headings,
      body,
      url: `/#${section.id}`,
    }
  })
}

const outputPath = path.join(process.cwd(), 'public', 'search-index.json')
fs.writeFileSync(outputPath, `${JSON.stringify(buildSearchIndex(), null, 2)}\n`, 'utf-8')
