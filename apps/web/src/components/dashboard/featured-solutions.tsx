"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { DynamicIcon, getCategoryById, solutions } from "@/config";
import type { Solution } from "@gau-gurah/types";

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

function FeaturedCard({ solution }: { solution: Solution }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const category = getCategoryById(solution.category);
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
      className="group relative overflow-hidden rounded-lg bg-[var(--white)] p-6 transition-all duration-250 hover:-translate-y-px dark:bg-[#111]"
      style={{ boxShadow: "var(--shadow-card)" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "var(--shadow-card-full)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "var(--shadow-card)")
      }
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(0,112,243,0.06), transparent 40%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-3.5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[var(--blue-bg)] text-[var(--blue)]">
            <DynamicIcon name={solution.icon} className="h-5 w-5" />
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${status.className}`}
          >
            {status.label}
          </span>
          {category && (
            <span className="rounded-full bg-[var(--gray-50)] px-2 py-0.5 text-[10px] font-medium text-[var(--gray-400)]">
              {category.name}
            </span>
          )}
        </div>
        <div className="mb-1.5 text-[17px] font-semibold tracking-[-0.3px]">
          {solution.name}
        </div>
        <p className="text-[13px] leading-relaxed text-[var(--gray-600)]">
          {solution.description}
        </p>

        {/* Footer */}
        <div
          className="mt-4 flex items-center gap-3 pt-3.5"
          style={{ boxShadow: "inset 0 1px 0 0 var(--gray-100)" }}
        >
          <span className="text-[11px] text-[var(--gray-400)]">
            Port{" "}
            <strong className="font-semibold text-[var(--gray-600)]">
              {solution.port}
            </strong>
          </span>
          <span className="text-[11px] text-[var(--gray-400)]">
            Status{" "}
            <strong className="font-semibold text-[var(--gray-600)]">
              {status.label}
            </strong>
          </span>
          <span className="ml-auto text-[14px] text-[var(--gray-400)] transition-all duration-200 group-hover:text-[var(--black)] group-hover:translate-x-[3px]">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedSolutions() {
  const featured = solutions
    .filter((s) => s.status === "active" || s.status === "beta")
    .slice(0, 2);

  if (featured.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4">
      {featured.map((s) => (
        <FeaturedCard key={s.id} solution={s} />
      ))}
    </div>
  );
}
