import type { Solution } from "@gau-gurah/types";
import { SolutionCard } from "./solution-card";

export function SolutionGrid({ solutions }: { solutions: Solution[] }) {
  if (solutions.length === 0) {
    return (
      <div className="py-12 text-center text-[13px] text-[var(--gray-400)]">
        No solutions found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {solutions.map((s) => (
        <SolutionCard key={s.id} solution={s} />
      ))}
    </div>
  );
}
