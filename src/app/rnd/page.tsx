import type { Metadata } from 'next'
import { GuidePage } from '@/components/GuidePage'
import { CourseHero } from '@/components/CourseHero'

export const metadata: Metadata = {
  title: '연구소 과정 안내 · TES Codex 실습',
  description: '테스 Codex 실습 교육 연구소 과정(1·2회차) 1~3교시 안내',
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
            { num: '2', title: '2교시 데이터 실습', desc: '가상 증착 장비 런 데이터(웨이퍼 두께)로 분석·대시보드·한 장 보고' },
            { num: '3', title: '3교시 내 업무 공간', desc: '온보딩, 2교시 분석을 내 스킬로, 내 업무 한 건' },
          ]}
          other={{ href: '/biz/', label: '혼합직무 과정 안내' }}
        />
      }
    />
  )
}
