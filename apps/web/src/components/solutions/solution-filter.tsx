"use client";

import { Search } from "lucide-react";
import { cn } from "@gau-gurah/ui";
import { categories } from "@/config";

type SolutionFilterProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
  statusCounts: { all: number; active: number; beta: number; upcoming: number };
};

export function SolutionFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  statusCounts,
}: SolutionFilterProps) {
  return (
    <div className="space-y-4">
      {/* Search — shadow-ring input */}
      <div
        className="flex items-center gap-2 rounded-md bg-[var(--white)] px-3.5 py-2.5 transition-shadow duration-150 focus-within:shadow-[0_0_0_2px_var(--focus-blue)] dark:bg-[#111]"
        style={{ boxShadow: "var(--shadow-ring)" }}
      >
        <Search className="h-3.5 w-3.5 text-[var(--gray-400)]" />
        <input
          type="text"
          placeholder="Search solutions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 bg-transparent text-[14px] font-normal outline-none placeholder:text-[var(--gray-400)]"
        />
      </div>

      {/* Category pills — 9999px */}
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => onCategoryChange(null)}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors duration-150",
            !selectedCategory
              ? "bg-[var(--black)] text-[var(--white)]"
              : "text-[var(--gray-500)] hover:text-[var(--black)] hover:bg-[var(--gray-50)]",
          )}
          style={
            selectedCategory
              ? { boxShadow: "var(--shadow-ring-light)" }
              : undefined
          }
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() =>
              onCategoryChange(selectedCategory === cat.id ? null : cat.id)
            }
            className={cn(
              "rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors duration-150",
              selectedCategory === cat.id
                ? "bg-[var(--black)] text-[var(--white)]"
                : "text-[var(--gray-500)] hover:text-[var(--black)] hover:bg-[var(--gray-50)]",
            )}
            style={
              selectedCategory !== cat.id
                ? { boxShadow: "var(--shadow-ring-light)" }
                : undefined
            }
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Status tabs — pill style */}
      <div
        className="flex gap-1 pb-5"
        style={{ boxShadow: "inset 0 -1px 0 0 var(--gray-100)" }}
      >
        {(
          [
            { key: null, label: "All", count: statusCounts.all },
            { key: "active", label: "Active", count: statusCounts.active },
            { key: "beta", label: "Beta", count: statusCounts.beta },
            {
              key: "coming-soon",
              label: "Upcoming",
              count: statusCounts.upcoming,
            },
          ] as const
        ).map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => onStatusChange(tab.key)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200",
              selectedStatus === tab.key
                ? "bg-[var(--black)] text-[var(--white)]"
                : "text-[var(--gray-500)] hover:text-[var(--black)] hover:bg-[var(--gray-50)]",
            )}
          >
            {tab.label} <span className="opacity-60">{tab.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
