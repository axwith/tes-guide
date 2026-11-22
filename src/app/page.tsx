import type { Metadata } from 'next'
import { GuidePage } from '@/components/GuidePage'

export const metadata: Metadata = {
  title: 'TES Codex 실습 안내',
  description:
    '테스 Codex 실습 교육 참가자용 사전 준비·설치 안내',
}

export default function Page() {
  return <GuidePage track="common" />
}
