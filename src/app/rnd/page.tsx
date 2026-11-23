import type { Metadata } from 'next'
import { GuidePage } from '@/components/GuidePage'
import { CourseHero } from '@/components/CourseHero'

export const metadata: Metadata = {
  title: '연구소 과정 안내 · TES Codex 실습',
  description: '테스 Codex 실습 교육 연구소 과정(1·2회차)의 1~3교시 안내와 실습 폴더',
}

export default function RndPage() {
  return (
    <GuidePage
      track="lab"
      hero={
        <CourseHero
          courseLabel="연구소 과정"
          dateLine="1회차 11월 24일(화) · 2회차 11월 25일(수)"
          periods={[
            { num: '1', title: '1교시 Codex 시작하기', desc: '예제 폴더로 다운로드 폴더를 정리하고, 플러그인을 설치해 오늘 화제 이슈를 리서치하고 그림을 곁들인 한 장 설명 자료를 만듭니다.' },
            { num: '2', title: '2교시 Codex 응용하기', desc: 'CVD 장비 데이터를 분석해 대시보드, 조정안, 한 장 보고를 만듭니다.' },
            { num: '3', title: '3교시 Codex 활용하기', desc: '내 업무 공간을 온보딩하고, 2교시 분석을 내 스킬로 만든 뒤 내 업무 한 건을 해 봅니다.' },
          ]}
          introLines={[
            '1교시부터 3교시까지 강사 화면을 보며 같은 순서로 따라 합니다.',
            '교시마다 실습 폴더가 따로 있습니다. 2교시 폴더와 3교시 설치는 1교시가 끝난 휴식 시간에 준비합니다.',
          ]}
          downloads={[
            { href: '/downloads/1교시-Codex-시작하기.zip', label: '1교시 폴더 받기' },
            { href: '/downloads/2교시-Codex-응용하기.zip', label: '2교시 폴더 받기' },
          ]}
          other={{ href: '/', label: '사전 준비 안내' }}
        />
      }
    />
  )
}
