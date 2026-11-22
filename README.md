# TES Codex 실습 안내

테스 Codex 실습 교육 참가자용 안내 사이트입니다. Next.js 정적 export(`out/`)로 만들고 GitHub Pages(`tes.axwith.com`)에 올립니다.

```bash
pnpm install
pnpm dev     # 로컬 미리보기
pnpm build   # 검색 색인(public/search-index.json) 생성 후 out/ 정적 export
```

## 내용 구조

- `content/sections.json`: 섹션 목록과 묶음 정의
- `content/parts/*.md`, `content/reference/*.md`: 섹션 본문(마크다운). 첫 `#` 제목과 바로 아래 인용 블록은 화면에서 섹션 머리말과 겹치므로 빠집니다.

섹션마다 `track`이 있습니다.

| track | 뜻 | 보이는 때 |
|---|---|---|
| `common` | 공통 준비(교육 안내·설치·첫 요청·점검표)와 참고 | 항상 |
| `lab` | 연구소 과정 | "전체" 또는 "연구소 과정"을 골랐을 때 |
| `mixed` | 혼합직무 과정 | "전체" 또는 "혼합직무 과정"을 골랐을 때 |

사이드바는 `groups`(공통 준비 · 연구소 과정 · 혼합직무 과정 · 참고) 아래에 `tiers`를 모아 보여 줍니다. 각 tier는 `group`으로 어느 묶음에 들어갈지 정합니다.

과정 선택은 주소 `?track=lab`, `?track=mixed`와 브라우저 localStorage에 남습니다. 링크를 그대로 공유하면 그 과정이 바로 열립니다. 첫 화면 깜빡임을 줄이려고 `public/track-init.js`가 페이지를 그리기 전에 `<html data-track>`을 붙이고, 숨김은 `src/app/globals.css`의 `[data-track-item]` 규칙이 처리합니다.

## 새 교시 추가하기

예: 연구소 과정 1교시 실습을 추가합니다.

1. 본문 파일을 만듭니다. 이름 규칙은 `<과정>-<교시>-<순번 2자리>-<짧은 영문>.md`입니다.
   - 연구소 과정: `content/parts/lab-1-01-thickness.md`, `lab-2-01-workspace.md`
   - 혼합직무 과정: `content/parts/mixed-1-01-dashboard.md`, `mixed-2-01-workspace.md`
   - 과정 안내는 0교시 자리입니다: `lab-0-01-overview.md`, `mixed-0-01-overview.md`
2. `content/sections.json`의 `sections`에 한 줄을 더합니다. `id`는 파일 이름에서 `.md`를 뺀 값입니다.

```json
{
  "id": "lab-1-01-thickness",
  "track": "lab",
  "tier": "lab",
  "part": 1,
  "clip": 1,
  "order": 110,
  "slug": "lab-thickness",
  "title": "1교시 실습",
  "subtitle": "한 줄 설명",
  "duration_min": null,
  "icon": "flask-conical",
  "badge": null,
  "file": "parts/lab-1-01-thickness.md",
  "type": "lecture"
}
```

- `track`: `lab` 또는 `mixed`
- `tier`: 연구소는 `lab`, 혼합직무는 `mixed`. 교시별로 사이드바 소제목을 나누고 싶으면 `tiers`에 `"lab-1": { "label": "1교시 코덱스 기초", "description": "…", "group": "lab", "order": 11 }`처럼 더하고 그 키를 씁니다.
- `part`: 교시 번호(과정 안내는 0), `clip`: 같은 교시 안의 순번. 화면에는 "1교시", "1교시 · 2"처럼 붙습니다.
- `order`: 페이지 안 순서입니다. 공통 준비는 1~99, 연구소 과정은 100번대, 혼합직무 과정은 200번대, 참고는 900번대를 씁니다. 교시 N(1~9)·순번(1~9)이면 연구소는 100 + N×10 + 순번, 혼합직무는 200 + N×10 + 순번입니다. 연구소 과정은 199, 혼합직무 과정은 299를 넘지 않게 씁니다.

3. `pnpm build`로 확인합니다. 검색 색인은 빌드 때 다시 만들어집니다.

본문에서 다른 섹션으로 갈 때는 `[제목](#섹션-id)` 형태로 씁니다. 다른 과정 섹션으로 가는 링크를 누르면 보기가 잠시 "전체"로 바뀌어 그 섹션이 열립니다. 고른 과정은 저장된 채로 남아 다음 방문에 다시 적용됩니다.

## 내용 작성 원칙

- 교육 내용 사실은 교육 담당 정본 문서에서만 가져옵니다. 정본에 없는 절차·날짜를 적지 않습니다.
- 공개 사이트입니다. 개인정보와 금액을 넣지 않습니다.

## 과정 페이지

메인(`/`)은 `track: common` 섹션만 보여 줍니다. 과정별 당일 안내는 주소가 따로 있습니다.

| 주소 | 파일 | 보이는 섹션 |
|---|---|---|
| `/rnd/` | `src/app/rnd/page.tsx` | `track: lab` (연구소 과정, 1·2회차) |
| `/biz/` | `src/app/biz/page.tsx` | `track: mixed` (혼합직무 과정, 3회차) |

두 페이지는 `GuidePage`(섹션 렌더)와 `CourseHero`(머리 영역)를 같이 씁니다. `public/track-init.js`가 주소를 보고 과정을 고정하므로 저장된 과정 선택과 상관없이 그 과정만 보입니다. 실습 폴더는 `public/downloads/tes-lab.zip`입니다(정답표·강사용 폴더를 뺀 배포본).

## 과정 선택 다시 켜기

과정별 안내가 준비되기 전이라 과정 선택(전체·연구소 과정·혼합직무 과정)은 숨겨 두었습니다. 기능 코드(`TrackSelector`·`TrackBand`·`track-init.js`)는 그대로 있습니다.

1. `track`이 `lab`·`mixed`인 섹션을 `sections.json`에 넣습니다.
2. `src/components/PageClient.tsx`의 `<TrackBand />`와 `src/components/Sidebar.tsx`의 `<TrackSelector />`를 다시 넣습니다.
