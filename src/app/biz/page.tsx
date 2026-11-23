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
            { num: '1', title: '1교시 Codex 시작하기', desc: 'Codex의 기본 흐름을 익히고, 다운로드 폴더를 살펴보며 플러그인을 설치해 봅니다.' },
            { num: '2', title: '2교시 Codex 응용하기', desc: '운영 또는 재무 자료를 분석하고 대시보드와 한 장 보고서로 정리합니다.' },
            { num: '3', title: '3교시 Codex 활용하기', desc: '내 업무 공간을 만들고, 반복해서 쓸 수 있는 스킬과 결과물을 만듭니다.' },
          ]}
          other={{ href: '/rnd/', label: '연구소 과정 안내' }}
        />
      }
    />
  )
}
