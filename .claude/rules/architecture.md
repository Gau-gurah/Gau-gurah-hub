# 아키텍처 규칙

## 패키지 의존 방향

```
@gau-gurah/types ← apps/web/src/config/
                          ↑
@gau-gurah/ui   ← apps/web/src/shell/ ← apps/web/
```

### 규칙

- `packages/` → `apps/` 방향 의존 금지
- `@gau-gurah/ui`는 독립 패키지 — `@gau-gurah/types`를 의존하지 않음
- `apps/web/src/config/`는 `@gau-gurah/types`만 의존

## Internal Packages 패턴

- `packages/ui/`, `packages/types/`는 로컬에서 `workspace:*`로 직접 참조
- 외부 repo(솔루션)에서는 GitHub Packages에서 설치

## Turbopack 설정

- `apps/web/next.config.ts`에서 `turbopack.root`를 모노레포 루트로 설정
