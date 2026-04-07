# Worktree 격리 규칙

## 에이전트별 담당 영역

| 에이전트             | 주 작업 디렉토리           |
| -------------------- | -------------------------- |
| frontend-developer   | apps/web/                  |
| package-developer    | packages/ui/, packages/types/ |
| test-engineer        | 전체 (테스트 파일)         |
| code-reviewer        | 전체 (읽기 전용)           |

## 충돌 매트릭스

| 조합                                      | 충돌 위험 |
| ----------------------------------------- | --------- |
| frontend-developer + package-developer    | 높음      |
| frontend-developer + test-engineer        | 중간      |
| code-reviewer + 모든 에이전트             | 없음      |

## 권장 작업 순서

```
Phase 1: package-developer (packages/ 수정)
  ↓
Phase 2: frontend-developer (apps/web/ 수정)
  ↓
Phase 3: test-engineer → code-reviewer
```
