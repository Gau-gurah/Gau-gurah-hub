import type { Solution, Category } from "@gau-gurah/types";

type Props = {
  solution: Solution;
  category: Category | undefined;
};

function statusLabel(status: Solution["status"]): string {
  if (status === "active") return "Active";
  if (status === "beta") return "Beta";
  return "Upcoming";
}

export function MetadataBanner({ solution, category }: Props) {
  const isComingSoon = solution.status === "coming-soon";

  return (
    <div
      className="grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-[var(--gray-100)]"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Cell 1: Category */}
      <div className="bg-[var(--white)] p-4 dark:bg-[#111]">
        <div className="text-[11px] text-[var(--gray-400)]">Category</div>
        <div className="mt-1 text-[14px] font-medium">
          {category?.name || solution.category}
        </div>
      </div>

      {/* Cell 2: Status */}
      <div className="bg-[var(--white)] p-4 dark:bg-[#111]">
        <div className="text-[11px] text-[var(--gray-400)]">Status</div>
        <div className="mt-1 text-[14px] font-medium">
          {statusLabel(solution.status)}
        </div>
      </div>

      {/* Cell 3: Route */}
      <div className="bg-[var(--white)] p-4 dark:bg-[#111]">
        <div className="text-[11px] text-[var(--gray-400)]">Route</div>
        <div className="mt-1 font-mono text-[13px] text-[var(--gray-500)]">
          {isComingSoon ? "\u2014" : `localhost:${solution.port}`}
        </div>
      </div>
    </div>
  );
}
