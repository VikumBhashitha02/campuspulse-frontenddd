import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { UniversityCard } from "@/components/common/Cards";
import { EmptyState, ErrorState, GridSkeleton, PageHeader } from "@/components/common/States";
import { directoryApi } from "@/lib/api/directory";

export const Route = createFileRoute("/universities/")({
  head: () => ({
    meta: [
      { title: "Universities — CampusPulse" },
      {
        name: "description",
        content:
          "Browse universities on CampusPulse, their faculties, student societies and published opportunities.",
      },
      { property: "og:title", content: "Universities — CampusPulse" },
      {
        property: "og:description",
        content: "Explore university communities and the societies publishing opportunities.",
      },
    ],
  }),
  component: UniversitiesPage,
});

function UniversitiesPage() {
  const [q, setQ] = useState("");
  const query = useQuery({ queryKey: ["universities", q], queryFn: () => directoryApi.universities(q) });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <PageHeader
        eyebrow="Directory"
        title="Universities"
        description="Every campus community on CampusPulse, with their faculties and active societies."
      />

      <div className="relative mt-6 max-w-md">
        <label htmlFor="uni-search" className="sr-only">
          Search universities
        </label>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          id="uni-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or city"
          className="pl-9"
        />
      </div>

      <div className="mt-8">
        {query.isPending ? (
          <GridSkeleton count={6} />
        ) : query.isError ? (
          <ErrorState onRetry={() => query.refetch()} />
        ) : (query.data ?? []).length === 0 ? (
          <EmptyState title="No universities found" description="Try a different search term." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(query.data ?? []).map((u) => (
              <UniversityCard key={u.id} university={u} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
