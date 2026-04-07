import { notFound } from "next/navigation";
import Link from "next/link";
import { getSolutionBySlug, getCategoryById, solutions } from "@/config";
import { SolutionHeader } from "@/components/detail/solution-header";
import { MetadataBanner } from "@/components/detail/metadata-banner";
import { RelatedSolutions } from "@/components/detail/related-solutions";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();
  const category = getCategoryById(solution.category);

  return (
    <div className="mx-auto max-w-[1200px] px-10 py-8">
      {/* Breadcrumb */}
      <nav className="mb-5 flex items-center gap-1.5 text-[12px] text-muted-foreground">
        <Link
          href="/solutions"
          className="transition-colors hover:text-foreground"
        >
          Solutions
        </Link>
        <span>/</span>
        <span className="font-medium text-foreground">{solution.name}</span>
      </nav>

      {/* Solution Header */}
      <div className="mb-4">
        <SolutionHeader solution={solution} category={category} />
      </div>

      {/* Metadata */}
      <div className="mb-6">
        <MetadataBanner solution={solution} category={category} />
      </div>

      {/* Related Solutions */}
      <RelatedSolutions slug={slug} />
    </div>
  );
}
