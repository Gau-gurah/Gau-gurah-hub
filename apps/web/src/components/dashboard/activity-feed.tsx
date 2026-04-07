const ACTIVITIES = [
  {
    icon: "C",
    iconBg: "var(--blue-bg)",
    iconColor: "var(--blue)",
    title: "Codex",
    event: "새 버전 배포 완료",
    sub: "Production 환경에 성공적으로 배포되었습니다.",
    tag: "Deploy",
    tagBg: "var(--green-bg)",
    tagColor: "var(--green)",
    time: "12m ago",
  },
  {
    icon: "L",
    iconBg: "var(--purple-bg)",
    iconColor: "var(--purple)",
    title: "LLM Gateway",
    event: "새 모델 엔드포인트 추가",
    sub: "신규 엔드포인트가 게이트웨이에 등록되었습니다.",
    tag: "Update",
    tagBg: "var(--blue-bg)",
    tagColor: "var(--blue)",
    time: "1h ago",
  },
  {
    icon: "P",
    iconBg: "var(--orange-bg)",
    iconColor: "var(--orange)",
    title: "Platform",
    event: "정기 유지보수 완료",
    sub: "인프라 패치가 적용되어 안정성이 향상되었습니다.",
    tag: "Maint.",
    tagBg: "var(--orange-bg)",
    tagColor: "var(--orange)",
    time: "3h ago",
  },
  {
    icon: "D",
    iconBg: "var(--cyan-bg)",
    iconColor: "var(--cyan-text)",
    title: "Data Pipeline",
    event: "Beta → Active 전환",
    sub: "안정성 검증 완료 후 정식 서비스로 전환되었습니다.",
    tag: "Release",
    tagBg: "var(--purple-bg)",
    tagColor: "var(--purple)",
    time: "Yesterday",
  },
];

export function ActivityFeed() {
  return (
    <div
      className="overflow-hidden rounded-lg bg-[var(--white)] dark:bg-[#111]"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ boxShadow: "inset 0 -1px 0 0 var(--gray-100)" }}
      >
        <span className="text-[14px] font-semibold tracking-[-0.28px]">
          Activity Feed
        </span>
        <button
          type="button"
          className="text-[12px] font-medium text-[var(--link-blue)] transition-opacity duration-150 hover:opacity-70"
        >
          View All →
        </button>
      </div>
      {ACTIVITIES.map((act, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-5 py-3 transition-colors duration-150 hover:bg-[var(--gray-50)]"
          style={
            i < ACTIVITIES.length - 1
              ? { boxShadow: "inset 0 -1px 0 0 var(--gray-100)" }
              : undefined
          }
        >
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] text-[10px] font-semibold"
            style={{ background: act.iconBg, color: act.iconColor }}
          >
            {act.icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px]">
              <strong className="font-semibold">{act.title}</strong> {act.event}
            </div>
            <div className="mt-0.5 text-[11px] text-[var(--gray-400)]">
              {act.sub}
            </div>
          </div>
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={{ background: act.tagBg, color: act.tagColor }}
          >
            {act.tag}
          </span>
          <span className="shrink-0 text-[11px] text-[var(--gray-400)]">
            {act.time}
          </span>
        </div>
      ))}
    </div>
  );
}
