# 공유 패키지 개발 규칙

## 패키지 목록과 역할

| 패키지         | 역할                          | 발행            |
| -------------- | ----------------------------- | --------------- |
| `@gau-gurah/types` | Solution, Category 공유 타입  | GitHub Packages |
| `@gau-gurah/ui`    | shadcn/ui 공유 컴포넌트, cn() | GitHub Packages |

## 의존 방향 제한

- `apps/` 코드를 의존하면 안 됨
- `@gau-gurah/ui`는 `@gau-gurah/types`를 의존하지 않음 (독립)

## exports 관리

로컬 참조(apps/web/)와 외부 참조(솔루션 repo)를 위한 dual export:

```json
{
  "exports": {
    ".": {
      "import": "./src/index.ts",
      "default": "./dist/index.js"
    }
  }
}
```

## 발행 절차

1. 코드 수정 후 `package.json`의 `version` bump
2. `pnpm build --filter=@gau-gurah/{패키지}` (tsup 빌드)
3. `cd packages/{패키지} && npm publish` (또는 CI 자동화)
4. 솔루션 repo에서 `pnpm update @gau-gurah/{패키지}`

## UI 컴포넌트 추가

- `add-ui-component` 스킬 사용
- 스타일: base-nova (@base-ui/react 기반)
- `asChild` 사용 금지 — `render` prop + `nativeButton={false}`

## 하위 호환성

- export 시그니처 변경 전 소비자(솔루션 repo) 영향 확인
- breaking change 시 major 버전 bump
