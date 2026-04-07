import type { Solution, Category } from "@gau-gurah/types";
import { DynamicIcon } from "@/config";

type Props = {
  solution: Solution;
  category: Category | undefined;
};

function StatusBadge({ status }: { status: Solution["status"] }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-green-300 px-2 py-0.5 text-[11px] font-medium text-green-700 dark:border-green-700 dark:text-green-400">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Active
      </span>
    );
  }

  if (status === "beta") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-yellow-300 px-2 py-0.5 text-[11px] font-medium text-yellow-700 dark:border-yellow-700 dark:text-yellow-400">
        Beta
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-[#f0f0f0] px-2 py-0.5 text-[11px] font-medium text-muted-foreground dark:bg-[#222]">
      Upcoming
    </span>
  );
}

export function SolutionHeader({ solution, category }: Props) {
  const isAvailable =
    solution.status === "active" || solution.status === "beta";

  return (
    <div
      className="flex gap-4 rounded-lg bg-[var(--white)] p-6 dark:bg-[#111]"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Icon */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f5f5f5] dark:bg-[#1a1a1a]">
        <DynamicIcon name={solution.icon} className="h-6 w-6" />
      </div>

      {/* Center content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-[20px] font-semibold tracking-[-0.8px]">
            {solution.name}
          </h1>
          <StatusBadge status={solution.status} />
        </div>
        {category && (
          <div className="mt-0.5 text-[13px] text-muted-foreground">
            {category.name}
          </div>
        )}
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          {solution.description}
        </p>
      </div>

      {/* Open button */}
      {isAvailable ? (
        <a
          href={`http://localhost:${solution.port}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
        >
          Open {solution.name} &#8599;
        </a>
      ) : (
        <span className="shrink-0 self-start cursor-not-allowed rounded-lg bg-[#f5f5f5] px-4 py-2 text-[13px] font-medium text-muted-foreground dark:bg-[#1a1a1a]">
          Coming Soon
        </span>
      )}
    </div>
  );
}
