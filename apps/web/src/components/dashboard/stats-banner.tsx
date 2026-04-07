import { getSolutionStats } from "@/config";

export function StatsBanner() {
  const { total, active, upcoming } = getSolutionStats();

  const cells = [
    {
      value: `${total > 0 ? Math.round((active / total) * 100) : 0}%`,
      label: "Cross-Solution Adoption",
      trend: { text: "\u2191 5% this month", type: "up" as const },
    },
    {
      value: "2,847",
      label: "Weekly Sessions",
      trend: { text: "\u2191 8% vs last week", type: "up" as const },
    },
    {
      value: "99.95%",
      label: "Platform Uptime",
      trend: { text: "30d average", type: "neutral" as const },
    },
    {
      value: active,
      valueSuffix: ` / ${total}`,
      label: "Active Solutions",
      trend: { text: `${upcoming} upcoming`, type: "neutral" as const },
    },
  ];

  return (
    <div
      className="grid grid-cols-4 gap-px overflow-hidden rounded-xl bg-[var(--gray-100)]"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="bg-[var(--white)] p-5 transition-colors duration-200 hover:bg-[var(--gray-50)] dark:bg-[#111] dark:hover:bg-[#1a1a1a]"
        >
          <div className="text-[32px] font-semibold leading-none tracking-[-1.28px]">
            {cell.value}
            {"valueSuffix" in cell && cell.valueSuffix && (
              <span className="text-[16px] text-[var(--gray-400)]">
                {cell.valueSuffix}
              </span>
            )}
          </div>
          <div className="mt-1.5 text-[12px] text-[var(--gray-400)]">
            {cell.label}
          </div>
          <div
            className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
              cell.trend.type === "up"
                ? "bg-[var(--green-bg)] text-[var(--green)]"
                : "bg-[var(--gray-50)] text-[var(--gray-400)]"
            }`}
          >
            {cell.trend.text}
          </div>
        </div>
      ))}
    </div>
  );
}
