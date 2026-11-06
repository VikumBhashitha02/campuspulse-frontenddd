import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OpportunityGrid, OpportunityList } from "@/components/opportunity/OpportunityCard";
import { EmptyState, ErrorState, GridSkeleton, PageHeader } from "@/components/common/States";
import { eventsApi } from "@/lib/api/events";
import { deadlineInfo } from "@/lib/format";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account/saved")({
  head: () => ({
    meta: [
      { title: "Saved opportunities — CampusPulse" },
      { name: "description", content: "Opportunities you've saved for later." },
      { property: "og:title", content: "Saved opportunities — CampusPulse" },
      { property: "og:description", content: "Your saved CampusPulse opportunities." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SavedPage,
});

const FILTERS = [
  { id: "all", label: "All" },
  { id: "open", label: "Still open" },
  { id: "closing", label: "Closing soon" },
] as const;

function SavedPage() {
  const { user } = useAuth();
  const query = useQuery({ queryKey: ["saved", user?.id], queryFn: () => eventsApi.saved() });
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const all = query.data ?? [];
  const events = all.filter((e) => {
    const tone = deadlineInfo(e.registrationDeadline).tone;
    if (filter === "open") return tone !== "closed";
    if (filter === "closing") return tone === "urgent" || tone === "soon";
    return true;
  });

  return (
    <div>
      <PageHeader
        title="Saved"
        description="Everything you've bookmarked, ready when you are."
        actions={
          <div className="hidden gap-1 rounded-lg border border-border p-1 sm:flex">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="icon"
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
            >
              <LayoutGrid className="size-4" />
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="icon"
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
            >
              <List className="size-4" />
            </Button>
          </div>
        }
      />

      <div className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
              filter === f.id
                ? "bg-navy text-navy-foreground"
                : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {query.isPending ? (
          <GridSkeleton count={3} />
        ) : query.isError ? (
          <ErrorState onRetry={() => query.refetch()} />
        ) : events.length === 0 ? (
          <EmptyState
            icon={<Bookmark className="size-6" aria-hidden />}
            title={all.length === 0 ? "Nothing saved yet" : "No saved items match this filter"}
            description={
              all.length === 0
                ? "Tap the bookmark icon on any opportunity to keep it here."
                : "Try a different filter to see the rest of your saved list."
            }
            action={
              all.length === 0 ? (
                <Button asChild>
                  <Link to="/explore">Explore opportunities</Link>
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setFilter("all")}>
                  Show all saved
                </Button>
              )
            }
          />
        ) : view === "list" ? (
          <OpportunityList events={events} />
        ) : (
          <OpportunityGrid events={events} />
        )}
      </div>
    </div>
  );
}
