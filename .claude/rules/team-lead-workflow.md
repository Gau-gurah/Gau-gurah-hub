# Team Lead 워크플로우

## Teammate 매핑

| 변경 대상            | Teammate           | subagent_type        |
| -------------------- | ------------------ | -------------------- |
| `apps/web/`          | frontend-developer | `frontend-developer` |
| `packages/*`         | package-developer  | `package-developer`  |
| 테스트               | test-engineer      | `test-engineer`      |
| 리뷰                 | code-reviewer      | `code-reviewer`      |

## 규칙

- 빌드 검증: `pnpm build && pnpm lint`
- 재시도 상한: 빌드 실패 최대 2회, review-fix 사이클 최대 2회
- 공유 패키지 변경 시: package-developer 먼저 → frontend-developer
