import type { Metadata } from 'next'
import { GuidePage } from '@/components/GuidePage'
import { CourseHero } from '@/components/CourseHero'

export const metadata: Metadata = {
  title: '연구소 과정 안내 · TES Codex 실습',
  description: '테스 Codex 실습 교육 연구소 과정(1·2회차)의 직무별 데이터 트랙과 1~3교시 안내',
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
            { num: '1', title: '1교시 몸풀기', desc: '다운로드 폴더 정리로 5단계 한 바퀴, 플러그인 설치하고 써 보기' },
            { num: '2', title: '2교시 데이터 트랙 선택', desc: 'CVD 공정 데이터 또는 장비개발·제어 데이터 중 직무에 맞는 트랙으로 분석·대시보드·한 장 보고' },
            { num: '3', title: '3교시 내 업무 공간', desc: '온보딩, 2교시 분석을 내 스킬로, 내 업무 한 건' },
          ]}
          other={{ href: '/biz/', label: '운영·재무 등 업무 적용 과정 안내' }}
        />
      }
    />
  )
}
