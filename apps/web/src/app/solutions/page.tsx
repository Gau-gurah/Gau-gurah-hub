"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { solutions } from "@/config";
import { SolutionFilter } from "@/components/solutions/solution-filter";
import { SolutionGrid } from "@/components/solutions/solution-grid";

const STATUS_ORDER: Record<string, number> = {
  active: 0,
  beta: 1,
  "coming-soon": 2,
};

function SolutionsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category"),
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const statusCounts = useMemo(
    () => ({
      all: solutions.length,
      active: solutions.filter((s) => s.status === "active").length,
      beta: solutions.filter((s) => s.status === "beta").length,
      upcoming: solutions.filter((s) => s.status === "coming-soon").length,
    }),
    [],
  );

  const filtered = useMemo(() => {
    return solutions
      .filter((s) => {
        const matchesCategory =
          !selectedCategory || s.category === selectedCategory;
        const matchesSearch =
          !searchQuery ||
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = !selectedStatus || s.status === selectedStatus;
        return matchesCategory && matchesSearch && matchesStatus;
      })
      .sort(
        (a, b) => (STATUS_ORDER[a.status] ?? 2) - (STATUS_ORDER[b.status] ?? 2),
      );
  }, [selectedCategory, searchQuery, selectedStatus]);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-[32px] font-semibold leading-[1.25] tracking-[-1.28px]">
          Solutions
        </h1>
        <p className="mt-1 text-[14px] text-[var(--gray-600)]">
          플랫폼에서 사용 가능한 모든 솔루션을 탐색합니다.
        </p>
      </div>

      <div className="mb-6">
        <SolutionFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          statusCounts={statusCounts}
        />
      </div>

      <SolutionGrid solutions={filtered} />
    </>
  );
}

export default function SolutionsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-10 py-8">
      <Suspense>
        <SolutionsContent />
      </Suspense>
    </div>
  );
}
