# 개발 착수 전 체크리스트

## Phase 0: 문서 확인

- [ ] `.claude/rules/` 모든 규칙 파일 읽기
- [ ] `CLAUDE.md` 읽기
- [ ] `docs/` 관련 문서 읽기 (specs, plans)
- [ ] 현재 브랜치 확인 (main 직접 작업 금지)
- [ ] `git status`로 미커밋 변경사항 확인

## Phase 1: 계획 수립 & 승인

- [ ] 영향 범위 분석 (어떤 패키지/앱이 변경되는가)
- [ ] 실행 계획을 사용자에게 보고하고 승인 받기

## Phase 2: 실행

- [ ] `feat/<작업명>` 브랜치 생성
- [ ] Agent Teams로 작업 (필요 시)

## Phase 3: 완료

- [ ] `pnpm build && pnpm lint` 통과
- [ ] 공유 패키지 변경 시: 버전 bump + 발행
- [ ] CLAUDE.md "현재 구현 상태" 갱신
