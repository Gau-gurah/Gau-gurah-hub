"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { cn } from "@gau-gurah/ui";
import type { Solution } from "@gau-gurah/types";
import { DynamicIcon, getCategoryById } from "@/config";

const STATUS_CONFIG = {
  active: {
    label: "Active",
    className: "bg-[var(--green-bg)] text-[var(--green)]",
  },
  beta: {
    label: "Beta",
    className: "bg-[var(--orange-bg)] text-[var(--orange)]",
  },
  "coming-soon": {
    label: "Upcoming",
    className: "bg-[var(--gray-50)] text-[var(--gray-400)]",
  },
};

export function SolutionCard({ solution }: { solution: Solution }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const category = getCategoryById(solution.category);
  const isUpcoming = solution.status === "coming-soon";
  const status = STATUS_CONFIG[solution.status];

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/solutions/${solution.slug}`}
      className={cn(
        "group relative flex items-center gap-3 overflow-hidden rounded-lg bg-[var(--white)] p-4 transition-all duration-200 dark:bg-[#111]",
        isUpcoming ? "opacity-45 hover:opacity-65" : "hover:-translate-y-px",
      )}
      style={{ boxShadow: "var(--shadow-ring)" }}
      onMouseMove={!isUpcoming ? handleMouseMove : undefined}
      onMouseEnter={
        !isUpcoming
          ? (e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-card)";
            }
          : undefined
      }
      onMouseLeave={
        !isUpcoming
          ? (e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-ring)";
            }
          : undefined
      }
    >
      {/* Spotlight */}
      {!isUpcoming && (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-250 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(0,112,243,0.04), transparent 40%)",
          }}
        />
      )}

      {/* Icon */}
      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--gray-50)]">
        <DynamicIcon
          name={solution.icon}
          className="h-4 w-4 text-[var(--gray-500)]"
        />
      </div>

      {/* Info */}
      <div className="relative z-10 min-w-0 flex-1">
        <div className="text-[14px] font-semibold tracking-[-0.2px]">
          {solution.name}
        </div>
        <div className="mt-0.5 truncate text-[12px] text-[var(--gray-400)]">
          {solution.description}
        </div>
        <div className="mt-1 flex items-center gap-1.5">
          <span
            className={`rounded-full px-1.5 py-px text-[10px] font-medium ${status.className}`}
          >
            {status.label}
          </span>
          {category && (
            <span className="text-[10px] text-[var(--gray-400)]">
              {category.name}
            </span>
          )}
        </div>
      </div>

      {/* Arrow */}
      {!isUpcoming && (
        <span className="relative z-10 shrink-0 text-[13px] text-[var(--gray-400)] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5">
          →
        </span>
      )}
    </Link>
  );
}
