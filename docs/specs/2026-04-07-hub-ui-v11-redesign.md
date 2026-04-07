---
title: Hub UI v11 Redesign — DESIGN.md Compliant
description: v10 Sidebar 레이아웃을 제거하고 DESIGN.md(Vercel Design System)에 충실한 Top Nav + Centered Layout으로 전환
version: 1.0.0
---

# Hub UI v11 Redesign

## Context

Hub UI 리디자인 Phase 1(v10)이 완료된 상태. v10은 기본 Vercel Clean 스타일로 Dashboard + Marketplace 구조를 구현했으나, DESIGN.md에서 정의한 Vercel Design System(shadow-as-border, Geist 타이포그래피, multi-layer shadow stacks 등)과 괴리가 있었다.

v11은 DESIGN.md를 충실히 따르면서 UX를 풍부하게 개선한다.

## Design Decisions

| 결정 항목          | v10                       | v11                                                                               |
| ------------------ | ------------------------- | --------------------------------------------------------------------------------- |
| 레이아웃           | Top Nav + centered (완료) | Top Nav + centered 유지, Header inner container 추가                              |
| Font               | Geist (부분 적용)         | Geist + Geist Mono, `font-feature-settings: "liga"`, negative letter-spacing 체계 |
| Border 방식        | CSS `border`              | shadow-as-border (`box-shadow: 0 0 0 1px rgba(0,0,0,0.08)`)                       |
| Card Shadow        | 단순 border               | multi-layer stack (ring + subtle + ambient + inner #fafafa ring)                  |
| Text Color         | #000000 / #ededed         | #171717 / #ededed (DESIGN.md 준수)                                                |
| Weight 체계        | 자유 사용                 | 400(body) / 500(UI) / 600(heading) 제한                                           |
| Letter-spacing     | 없음                      | size별 negative tracking (-2.4px@48px, -1.28px@32px, -0.96px@24px)                |
| Pill radius        | 10px (rounded)            | 9999px (full pill, DESIGN.md 준수)                                                |
| Categories         | Header 탭 (드롭다운 없음) | Header dropdown (hover 시 패널 표시)                                              |
| Stats Banner       | 3열                       | 4열 (Adoption, Sessions, Uptime, Active)                                          |
| Featured Solutions | 없음                      | 2열 대형 카드 (spotlight effect)                                                  |
| All Solutions      | 2열                       | 3열                                                                               |
| Activity Feed      | 없음                      | 이벤트 패널 (placeholder)                                                         |
| Divider 방식       | CSS border-bottom         | `box-shadow: inset 0 -1px 0 0 var(--gray-100)`                                    |

## Reference

- Mockup: `temp/ui-style-v11-vercel.html`
- Design System: `DESIGN.md`
- Token Preview: `temp/preview.html`, `temp/preview-dark.html`

---

## Design Tokens

### Colors

DESIGN.md §2 기반. 현재 globals.css의 OKLch/hex 혼합 체계를 DESIGN.md hex 체계로 전환.

| Token        | Light     | Dark      | 용도                |
| ------------ | --------- | --------- | ------------------- |
| `--black`    | `#171717` | `#ededed` | Primary text        |
| `--white`    | `#ffffff` | `#0a0a0a` | Background          |
| `--gray-50`  | `#fafafa` | `#111111` | Subtle surface      |
| `--gray-100` | `#ebebeb` | `#2a2a2a` | Border (via shadow) |
| `--gray-400` | `#808080` | `#666666` | Placeholder         |
| `--gray-500` | `#666666` | `#808080` | Tertiary text       |
| `--gray-600` | `#4d4d4d` | `#a0a0a0` | Secondary text      |

Status colors: `--green: #0cce6b`, `--orange: #f5a623`, accent tinted backgrounds.

### Shadow System (DESIGN.md §6)

| Level         | Value (Light)                                                     | Dark 대응                                           | 용도                 |
| ------------- | ----------------------------------------------------------------- | --------------------------------------------------- | -------------------- |
| Ring          | `rgba(0,0,0,0.08) 0 0 0 1px`                                      | `rgba(255,255,255,0.1) 0 0 0 1px`                   | Shadow-as-border     |
| Ring Light    | `rgb(235,235,235) 0 0 0 1px`                                      | `rgba(255,255,255,0.08) 0 0 0 1px`                  | Input, 가벼운 border |
| Card          | ring + `rgba(0,0,0,0.04) 0 2px 2px` + `#fafafa 0 0 0 1px`         | ring + darker lift + `rgba(255,255,255,0.03)` inner | 기본 카드            |
| Card Full     | ring + lift + `rgba(0,0,0,0.04) 0 8px 8px -8px` + `#fafafa` inner | 동일 구조, dark 값                                  | Hover 카드, featured |
| Inset Divider | `inset 0 -1px 0 0 var(--gray-100)`                                | 동일                                                | 내부 구분선          |

### Typography (DESIGN.md §3)

Geist + Geist Mono. `font-feature-settings: "liga" 1` 전역 적용.

| 역할                  | Size | Weight  | Letter-spacing | Line-height |
| --------------------- | ---- | ------- | -------------- | ----------- |
| Page Title            | 32px | 600     | -1.28px        | 1.25        |
| Section Title         | 18px | 600     | -0.3px         | —           |
| Card Title (Featured) | 17px | 600     | -0.3px         | —           |
| Body/Description      | 14px | 400     | normal         | 1.6         |
| Nav Link              | 14px | 500     | normal         | 1.43        |
| Card Name             | 14px | 600     | -0.2px         | —           |
| Caption/Label         | 12px | 400-500 | normal         | 1.33        |
| Badge                 | 10px | 500     | normal         | —           |
| Mono Label            | 12px | 500     | 0.5px          | uppercase   |
| Stats Number          | 32px | 600     | -1.28px        | 1           |

### Spacing & Radius

- 페이지 패딩: `32px 40px` (main), `12px 40px` (header inner)
- Max-width: `1200px` (header inner + main 동일)
- Card padding: `24px` (featured), `16px` (solution)
- Section gap: `32px` (섹션 블록 간), `16px` (섹션 헤더 → 콘텐츠)
- Radius: `6px` (buttons, nav), `8px` (cards), `12px` (stats banner), `9999px` (pills, badges)

---

## Header

Full-width 배경(shadow-ring bottom) + inner container(max-width 1200px).

### 구성 (좌→우)

1. **Logo** — "G" 마크(20x20, rounded-sm, bg-black) + "Gau-gurah" (15px/600, -0.5px) + "Hub" (13px/400, gray-400)
2. **Nav** — Overview, Solutions, Categories(dropdown), Settings. Active: `color: var(--black)`. Hover: `bg: var(--bg2)`
3. **Categories Dropdown** — hover 시 아래로 패널(min-width 220px, shadow-card-full, radius-md). 항목: dot + name + count. `opacity:0 → 1`, `translateY(-4px → 0)` 트랜지션
4. **Spacer** (flex:1)
5. **Search Trigger** — shadow-ring-light 박스, "Search solutions..." + ⌘K badge. Hover: shadow-ring
6. **Theme Toggle** — shadow-ring-light 박스, Light/Dark 버튼. Active: bg-black, color-bg
7. **Avatar** — 28x28 원형, shadow-ring-light

### Spec

- Header bg: `rgba(255,255,255,0.85)` / Dark `rgba(10,10,10,0.88)`, `backdrop-filter: blur(12px)`
- Position: `sticky`, `top: 0`, `z-index: 100`
- Bottom border: `box-shadow: var(--shadow-ring)` (shadow-as-border)

---

## Dashboard Page (`/`)

### Section 1: Title + Status

- Status pill: "All Systems Operational", green-bg, green text, 9999px radius, 11px/500
- Title: "Solution Hub", 32px/600, -1.28px
- Description: 14px/400, gray-600

### Section 2: Filter Tabs

- All / Active / Beta / Recently Updated
- Active tab: `bg: var(--black), color: var(--bg)`, 9999px pill
- Inactive: transparent, hover `bg: var(--bg2)`
- Bottom divider: `box-shadow: inset 0 -1px 0 0 var(--gray-100)`

### Section 3: Stats Banner (4열)

4열 grid, `gap: 1px`, `bg: var(--gray-100)` (gap 색), `border-radius: 12px`, `overflow: hidden`, `box-shadow: var(--shadow-card)`.

| Cell                    | Value  | Label                   | Trend                     |
| ----------------------- | ------ | ----------------------- | ------------------------- |
| Cross-Solution Adoption | 43%    | Cross-Solution Adoption | ↑ 5% this month (green)   |
| Weekly Sessions         | 2,847  | Weekly Sessions         | ↑ 8% vs last week (green) |
| Platform Uptime         | 99.95% | Platform Uptime         | 30d average (neutral)     |
| Active Solutions        | 4/7    | Active Solutions        | 2 upcoming (neutral)      |

Phase 2에서 실제 데이터 연동. Phase 1은 config 기반 계산 + placeholder.

### Section 4: Featured Solutions (2열)

2열 grid, gap 16px. Active/Beta 중 주요 솔루션 2개.

카드 구성:

- `box-shadow: var(--shadow-card)`, hover → `var(--shadow-card-full)` + `translateY(-1px)`
- Radial gradient spotlight: `radial-gradient(600px circle at mouse, rgba(0,112,243,0.06), transparent 40%)`
- Icon (44x44, radius 10px, tinted bg) + Status badge (pill) + Category badge (pill)
- Name (17px/600) + Description (13px, gray-600)
- Footer (inset divider): Uptime + Version + Users + Arrow(→, slide on hover)

### Section 5: All Solutions (3열)

3열 grid, gap 12px. 전체 솔루션.

카드 구성:

- `box-shadow: var(--shadow-ring)`, hover → `var(--shadow-card)` + `translateY(-1px)`
- Radial gradient spotlight (400px circle, 더 약한 opacity)
- Icon (36x36, radius-md) + Name (14px/600) + Desc (12px, truncate) + Status badge (pill) + Category (10px, gray-400)
- Arrow: `opacity:0 → 1`, `translateX(2px)` on hover
- Upcoming: `opacity: 0.45`, hover `0.65`

### Section 6: Activity Feed

Panel: `box-shadow: var(--shadow-card)`, radius-md.

Header: "Activity Feed" (14px/600) + "View All →" (link-blue).

각 항목:

- Icon (28x28, radius 7px, tinted bg) + Body (strong name + event text, 13px) + Sub (11px, gray-400)
- Tag (pill, tinted bg + accent color): Deploy(green), Update(blue), Maint.(orange), Release(purple)
- Time (11px, gray-400)
- 항목 간 divider: `box-shadow: inset 0 -1px 0 0 var(--gray-100)`
- Hover: `bg: var(--card-hover)`

---

## Solutions Page (`/solutions`)

기존 구현 유지하되 v11 토큰으로 스타일 전환:

- CSS border → shadow-as-border
- Card shadow → multi-layer stack
- Typography → DESIGN.md 체계
- Filter pills → 9999px radius

## Solution Detail Page (`/solutions/[slug]`)

기존 구현 유지하되 v11 토큰 적용. 동일한 shadow/typography 전환.

## Settings / Not-Found Pages

기존 placeholder 유지, v11 토큰 적용.

---

## Interactions

- Card hover: `box-shadow` 변화 + `translateY(-1px)`, 200-250ms ease
- Featured spotlight: `radial-gradient` following mouse position via JS `mousemove`
- Arrow slide: `opacity 0→1` + `translateX(2px)`, 200ms
- Dropdown: `opacity 0→1` + `translateY(-4px→0)`, 150ms
- Tab switch: `background` + `color` transition, 200ms
- Logo mark: `border-radius 4px→10px` on hover, 300ms ease
- fadeUp animation: staggered entrance, `translateY(12px→0)` + `opacity 0→1`, 500ms

모든 interaction은 CSS transition 기반. JS는 mouse spotlight 좌표 계산에만 사용.

---

## Component Architecture

### 새로 생성

| Component                                     | 역할                            |
| --------------------------------------------- | ------------------------------- |
| `components/dashboard/stats-banner.tsx`       | 4열 Stats (기존 3열 → 4열 확장) |
| `components/dashboard/featured-solutions.tsx` | Featured 2열 대형 카드          |
| `components/dashboard/activity-feed.tsx`      | Activity Feed 패널              |

### 수정

| File                                       | 변경                                                                   |
| ------------------------------------------ | ---------------------------------------------------------------------- |
| `app/globals.css`                          | DESIGN.md 토큰 체계로 전면 전환 (shadow variables, typography, colors) |
| `shell/header.tsx`                         | Inner container + Categories dropdown + Theme toggle 위치 변경         |
| `app/page.tsx`                             | Featured Solutions + Activity Feed 추가, Stats 4열                     |
| `components/dashboard/quick-access.tsx`    | → All Solutions 3열 그리드로 전환 또는 제거                            |
| `components/dashboard/category-grid.tsx`   | → Categories가 Header dropdown으로 이동, 제거                          |
| `components/solutions/solution-card.tsx`   | shadow-as-border + spotlight effect                                    |
| `components/solutions/solution-filter.tsx` | pill tabs + shadow-ring inputs                                         |
| `app/solutions/page.tsx`                   | v11 토큰 적용                                                          |
| `app/solutions/[slug]/page.tsx`            | v11 토큰 적용                                                          |

### 제거

| File                                     | 이유                                  |
| ---------------------------------------- | ------------------------------------- |
| `components/dashboard/category-grid.tsx` | Categories가 Header dropdown으로 이동 |

---

## Dark Mode

preview-dark.html 참조. 핵심 역전:

- Shadow ring: `rgba(0,0,0,0.08)` → `rgba(255,255,255,0.1)`
- Inner ring: `#fafafa` → `rgba(255,255,255,0.04)`
- Card bg: `#ffffff` → `#111111`
- Background: `#ffffff` → `#0a0a0a`
- Nav bg: `rgba(255,255,255,0.85)` → `rgba(10,10,10,0.88)`

---

## Responsive

| Breakpoint | 변경                                                          |
| ---------- | ------------------------------------------------------------- |
| ≤768px     | Stats 2열, Featured 1열, Solutions 1열, Nav 숨김, Search 축소 |
| 768-1024px | Stats 4열 유지, Featured 2열, Solutions 2열                   |
| ≥1024px    | Full layout                                                   |
