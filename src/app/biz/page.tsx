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
            { num: '1', title: '1교시 Codex 시작하기', desc: '예제 폴더로 다운로드 폴더를 정리하고, 플러그인을 설치해 오늘 화제 이슈를 리서치하고 그림을 곁들인 한 장 설명 자료를 만듭니다.' },
            { num: '2', title: '2교시 Codex 응용하기', desc: '무신사·크림·네이버 증권 가운데 하나를 골라 insane-search로 웹 자료를 모으고, 분석 하나를 골라 한 장 자료로 만든 뒤 숫자를 대조해 한 곳을 고칩니다.' },
            { num: '3', title: '3교시 Codex 활용하기', desc: '강사 시범을 보며 다 같이 내 업무 공간을 온보딩하고, 업무 보고서를 만들어 고칩니다.' },
          ]}
          introLines={[
            '1교시부터 3교시까지 강사 화면을 보며 같은 순서로 따라 합니다.',
            '교시마다 실습 폴더가 따로 있습니다. 3교시 설치는 1교시가 끝난 휴식 시간에 합니다.',
          ]}
          downloads={[{ href: '/downloads/1교시-Codex-시작하기.zip', label: '1교시 폴더 받기' }]}
          other={{ href: '/', label: '사전 준비 안내' }}
        />
      }
    />
  )
}
