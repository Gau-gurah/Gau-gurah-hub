import { solutions } from "@/config";
import { StatsBanner } from "@/components/dashboard/stats-banner";
import { FeaturedSolutions } from "@/components/dashboard/featured-solutions";
import { SolutionGrid } from "@/components/solutions/solution-grid";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-10 py-8">
      {/* Status + Title */}
      <div
        className="mb-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium text-[var(--green)]"
        style={{ background: "var(--green-bg)" }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
        All Systems Operational
      </div>
      <h1 className="text-[32px] font-semibold leading-[1.25] tracking-[-1.28px]">
        Solution Hub
      </h1>
      <p className="mt-1 text-[14px] text-[var(--gray-600)]">
        플랫폼의 모든 솔루션을 한곳에서 관리하고 모니터링합니다.
      </p>

      {/* Stats */}
      <div className="mt-6 mb-8">
        <StatsBanner />
      </div>

      {/* Featured Solutions */}
      <section className="mb-10">
        <div className="mb-4">
          <h2 className="text-[18px] font-semibold tracking-[-0.3px]">
            Featured Solutions
          </h2>
          <p className="mt-0.5 text-[13px] text-[var(--gray-400)]">
            가장 활발하게 사용되는 솔루션입니다.
          </p>
        </div>
        <FeaturedSolutions />
      </section>

      {/* All Solutions */}
      <section className="mb-10">
        <div className="mb-4">
          <h2 className="text-[18px] font-semibold tracking-[-0.3px]">
            All Solutions
          </h2>
          <p className="mt-0.5 text-[13px] text-[var(--gray-400)]">
            플랫폼에서 사용 가능한 모든 솔루션입니다.
          </p>
        </div>
        <SolutionGrid solutions={solutions} />
      </section>

      {/* Activity Feed */}
      <section>
        <div className="mb-4">
          <h2 className="text-[18px] font-semibold tracking-[-0.3px]">
            Recent Activity
          </h2>
          <p className="mt-0.5 text-[13px] text-[var(--gray-400)]">
            플랫폼 전체의 최근 이벤트입니다.
          </p>
        </div>
        <ActivityFeed />
      </section>
    </div>
  );
}
