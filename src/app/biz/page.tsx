import type { Metadata } from 'next'
import { GuidePage } from '@/components/GuidePage'
import { CourseHero } from '@/components/CourseHero'

export const metadata: Metadata = {
  title: '혼합직무 과정 안내 · TES Codex 실습',
  description: '테스 Codex 실습 교육 혼합직무 과정(3회차) 1~3교시 안내',
}

export default function MixedPage() {
  return (
    <GuidePage
      track="mixed"
      hero={
        <CourseHero
          courseLabel="혼합직무 과정"
          dateLine="3회차 11월 26일(목)"
          periods={[
            { num: '1', title: '1교시 몸풀기', desc: '다운로드 폴더 정리로 5단계 한 바퀴, 플러그인 설치하고 써 보기' },
            { num: '2', title: '2교시 데이터 실습', desc: '운영(출하·CS·불량) 또는 재무(장비사 5곳 실적) 자료로 분석·대시보드·한 장 보고' },
            { num: '3', title: '3교시 내 업무 공간', desc: '온보딩, 2교시 분석을 내 스킬로, 내 업무 한 건' },
          ]}
          other={{ href: '/rnd/', label: '연구소 과정 안내' }}
        />
      }
    />
  )
}
