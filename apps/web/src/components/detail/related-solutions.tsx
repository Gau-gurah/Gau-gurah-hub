import Link from "next/link";
import { getRelatedSolutions, getCategoryById, DynamicIcon } from "@/config";

type Props = {
  slug: string;
};

export function RelatedSolutions({ slug }: Props) {
  const related = getRelatedSolutions(slug);
  if (related.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-[13px] font-semibold text-muted-foreground">
        Related Solutions
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {related.map((s) => {
          const cat = getCategoryById(s.category);
          return (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="flex items-center gap-3 rounded-lg bg-[var(--white)] p-3 transition-shadow duration-200 hover:shadow-[var(--shadow-card)] dark:bg-[#111]"
              style={{ boxShadow: "var(--shadow-ring)" }}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[#f5f5f5] dark:bg-[#1a1a1a]">
                <DynamicIcon name={s.icon} className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-semibold">{s.name}</div>
                {cat && (
                  <div className="text-[10px] text-muted-foreground">
                    {cat.name}
                  </div>
                )}
              </div>
              <span className="ml-auto text-[12px] text-faint">&#8594;</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
