# Gau-gurah Hub

## 프로젝트 개요

- **프로젝트명**: Gau-gurah Hub
- **설명**: Gau-gurah 생태계의 허브 repo. Platform 앱(Nexus) + 공유 패키지(@gau-gurah/ui, @gau-gurah/types)를 포함
- **기술 스택**: Next.js 16 (App Router), React 19, TypeScript 5.x, Tailwind CSS v4, shadcn/ui (base-nova)
- **주요 의존성**: lucide-react, @base-ui/react, class-variance-authority, tailwind-merge, @xyflow/react, motion
- **아키텍처**: Turborepo 모노레포 — Platform 앱 + 공유 패키지

## 빌드 및 실행

```bash
pnpm install
pnpm dev                                    # 전체 개발 서버
pnpm turbo dev --filter=@gau-gurah/platform     # Platform 앱만
pnpm build                                  # 전체 빌드
pnpm lint                                   # 전체 린트
```

## 프로젝트 구조

```
gau-gurah-hub/
├── apps/
│   └── web/                  # Platform 앱 (@gau-gurah/platform, 포트 5000)
│       ├── src/
│       │   ├── app/          # 라우트 (/, /solutions, /settings, /launch)
│       │   ├── components/   # hub/, motion/, solutions/
│       │   ├── config/       # 솔루션 레지스트리, DynamicIcon
│       │   └── shell/        # PlatformShell, Header, ThemeToggle
│       └── next.config.ts
├── packages/
│   ├── ui/                   # @gau-gurah/ui → GitHub Packages 발행
│   └── types/                # @gau-gurah/types → GitHub Packages 발행
├── docs/                     # 생태계 공통 + Platform 문서
└── CLAUDE.md
```

## 공유 패키지 관리

### 발행 대상

| 패키지             | 역할                           | 발행처          |
| ------------------ | ------------------------------ | --------------- |
| `@gau-gurah/ui`    | shadcn/ui 공유 컴포넌트 + cn() | GitHub Packages |
| `@gau-gurah/types` | Solution, Category 공유 타입   | GitHub Packages |

### 발행 절차

1. `packages/ui/` 또는 `packages/types/` 수정
2. `package.json`의 version bump (SemVer)
3. `pnpm build --filter=@gau-gurah/ui` (tsup 빌드)
4. `npm publish` (CI 자동화 또는 수동)
5. 솔루션 repo에서 `pnpm update @gau-gurah/ui`

### 로컬 참조

`apps/web/`에서는 `workspace:*`로 직접 참조 (빌드 불필요, Turbopack 트랜스파일).

## 솔루션 레지스트리

`apps/web/src/config/solutions.ts`에서 정적 배열로 관리. 새 솔루션 추가 시 이 파일에 항목 추가.

## 디자인 시스템

- **디자인 지침**: `docs/DESIGN.md` (Vercel Design System 기반)
- Shadow-as-border: CSS `border` 대신 `box-shadow: 0 0 0 1px` 사용
- Multi-layer shadow stacks: ring + subtle + ambient + inner ring
- Typography: Geist + Geist Mono, `font-feature-settings: "liga"`, size별 negative letter-spacing
- Weight: 400(body) / 500(UI) / 600(heading) 제한
- Primary text: `#171717` (pure black 사용 금지)
- Pill badges: `border-radius: 9999px`

## 코드 스타일

- TypeScript strict 모드
- 파일명 kebab-case, 컴포넌트명 PascalCase
- 임포트 순서: React/Next → 외부 → @gau-gurah/\* → @/ 내부 → 상대경로 → type
- shadcn/ui: base-nova 스타일, `render` prop 패턴 (`asChild` 금지)
- 상세 규칙: `.claude/rules/code-style.md`

## 브랜드

- 플랫폼명: "Gau-gurah"
- 대시보드: "Nexus"

## 중요 컨텍스트

- **PlatformShell은 Platform 전용**: 솔루션 앱에서 사용하지 않음
- **Gau-gurah는 연결체**: 각 솔루션은 고유한 레이아웃을 가짐
- **경로 별칭**: 앱 내부 `@/*` → `./src/*`, 패키지 참조 `@gau-gurah/*`
- **인증**: 미구현 (플레이스홀더)

## 문서 관리

`docs/` 하위 3단 구조: `specs/` (명세) → `plans/` (계획) → `release/` (릴리즈). 모든 docs 파일은 frontmatter 필수 (title, description, version).

## Git 워크플로우

- 구현 작업은 `feat/<작업명>` 브랜치에서 진행
- main 브랜치 merge: 사용자 승인 필요

## Claude 워크플로우

- **구현 작업 요청 시**: `.claude/rules/pre-development-checklist.md` 수행 후 승인
- **에이전트 팀**: frontend-developer, package-developer, test-engineer, code-reviewer
- **세션 종료 전**: `/compound` 실행
