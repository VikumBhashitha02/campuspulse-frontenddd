import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, List, Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { OpportunityGrid, OpportunityList } from "@/components/opportunity/OpportunityCard";
import { EmptyState, ErrorState, GridSkeleton, PageHeader } from "@/components/common/States";
import { eventsApi, type EventFilters } from "@/lib/api/events";
import { directoryApi } from "@/lib/api/directory";
import { cn } from "@/lib/utils";

interface ExploreSearch {
  q?: string | undefined;
  category?: string | undefined;
  university?: string | undefined;
  organization?: string | undefined;
  mode?: string | undefined;
  opportunityType?: string | undefined;
  participationScope?: string | undefined;
  musicGenre?: string | undefined;
  dramaGenre?: string | undefined;
  programType?: string | undefined;
  fundingType?: string | undefined;
  courseLevel?: string | undefined;
  sort?: EventFilters["sort"] | undefined;
}

export const Route = createFileRoute("/explore")({
  validateSearch: (search: Record<string, unknown>): ExploreSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    university: typeof search["university"] === "string" ? search["university"] : undefined,
    organization: typeof search["organization"] === "string" ? search["organization"] : undefined,
    mode: typeof search["mode"] === "string" ? search["mode"] : undefined,
    opportunityType: typeof search["opportunityType"] === "string" ? search["opportunityType"] : undefined,
    participationScope: typeof search["participationScope"] === "string" ? search["participationScope"] : undefined,
    musicGenre: typeof search["musicGenre"] === "string" ? search["musicGenre"] : undefined,
    dramaGenre: typeof search["dramaGenre"] === "string" ? search["dramaGenre"] : undefined,
    programType: typeof search["programType"] === "string" ? search["programType"] : undefined,
    fundingType: typeof search["fundingType"] === "string" ? search["fundingType"] : undefined,
    courseLevel: typeof search["courseLevel"] === "string" ? search["courseLevel"] : undefined,
    sort: (["recommended", "deadline", "newest", "trending"] as const).includes(
      search["sort"] as never,
    )
      ? (search["sort"] as EventFilters["sort"])
      : "recommended",
  }),
  head: () => ({
    meta: [
      { title: "Explore Opportunities — CampusPulse" },
      {
        name: "description",
        content:
          "Search and discover university music shows, drama performances, MSc/PhD higher studies, university courses, hackathons, and campus opportunities.",
      },
      { property: "og:title", content: "Explore Opportunities — CampusPulse" },
      {
        property: "og:description",
        content: "Discover music, drama, higher studies, university courses and competitions across universities.",
      },
    ],
  }),
  component: ExplorePage,
});

const MODES = [
  { value: "all", label: "All Modes" },
  { value: "ONLINE", label: "Online" },
  { value: "PHYSICAL", label: "Physical" },
  { value: "HYBRID", label: "Hybrid" },
];

const OPPORTUNITY_TYPES = [
  { value: "all", label: "All Types" },
  { value: "MUSIC", label: "🎵 Music & Shows" },
  { value: "DRAMA", label: "🎭 Drama & Theatre" },
  { value: "HIGHER_STUDIES", label: "🎓 Higher Studies (MSc/PhD)" },
  { value: "UNIVERSITY_COURSE", label: "📖 University Courses" },
  { value: "HACKATHON", label: "💻 Hackathons" },
  { value: "COMPETITION", label: "🏆 Competitions" },
  { value: "WORKSHOP", label: "🛠️ Workshops" },
  { value: "CONFERENCE", label: "🎤 Conferences" },
  { value: "RESEARCH", label: "🔬 Research" },
  { value: "CAREER", label: "💼 Career" },
  { value: "VOLUNTEERING", label: "🤝 Volunteering" },
  { value: "SCHOLARSHIP", label: "🎖️ Scholarships" },
  { value: "TRAINING", label: "📚 Training" },
  { value: "TEAM_OPPORTUNITY", label: "👥 Team Calls" },
  { value: "OTHER", label: "✨ Other" },
];

function ExplorePage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [term, setTerm] = useState(search.q ?? "");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visible, setVisible] = useState(9);

  const setSearch = (patch: Partial<ExploreSearch>) => {
    setVisible(9);
    navigate({ to: ".", search: (prev) => ({ ...prev, ...patch }) });
  };

  const eventsQuery = useQuery({
    queryKey: ["events", "explore", search],
    queryFn: () => eventsApi.list(search as EventFilters),
  });
  const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: () => eventsApi.categories() });
  const universitiesQuery = useQuery({ queryKey: ["universities"], queryFn: () => directoryApi.universities() });
  const orgsQuery = useQuery({ queryKey: ["organizations"], queryFn: () => directoryApi.organizations() });

  const results = eventsQuery.data ?? [];
  const shown = results.slice(0, visible);

  const activeFilters = [
    search.category,
    search.university,
    search.organization,
    search.mode,
    search.opportunityType,
    search.participationScope,
    search.musicGenre,
    search.dramaGenre,
    search.programType,
    search.fundingType,
    search.courseLevel,
  ].filter(
    (v) => v && v !== "all",
  ).length;

  const filterPanel = (
    <div className="space-y-6">
      <FilterSelect
        label="Opportunity Type"
        value={search.opportunityType ?? "all"}
        onChange={(v) =>
          setSearch({
            opportunityType: v === "all" ? undefined : v,
            musicGenre: undefined,
            dramaGenre: undefined,
            programType: undefined,
            fundingType: undefined,
            courseLevel: undefined,
          })
        }
        options={OPPORTUNITY_TYPES}
      />

      {/* Category-Aware Contextual Filters */}
      {search.opportunityType === "MUSIC" && (
        <FilterSelect
          label="Music Style / Genre"
          value={search.musicGenre ?? "all"}
          onChange={(v) => setSearch({ musicGenre: v === "all" ? undefined : v })}
          options={[
            { value: "all", label: "All music genres" },
            { value: "Fusion Rock", label: "Fusion Rock" },
            { value: "Acoustic Pop", label: "Acoustic Pop" },
            { value: "Live Band", label: "Live Band" },
            { value: "DJ Night", label: "DJ Night" },
            { value: "Classical", label: "Classical Showcase" },
          ]}
        />
      )}

      {search.opportunityType === "DRAMA" && (
        <FilterSelect
          label="Theatre / Performing Arts Genre"
          value={search.dramaGenre ?? "all"}
          onChange={(v) => setSearch({ dramaGenre: v === "all" ? undefined : v })}
          options={[
            { value: "all", label: "All drama genres" },
            { value: "Musical Theatre", label: "Musical Theatre" },
            { value: "Stage Play", label: "Stage Play" },
            { value: "Short Film Screening", label: "Short Film Screening" },
            { value: "Comedy Drama", label: "Comedy Drama" },
          ]}
        />
      )}

      {search.opportunityType === "HIGHER_STUDIES" && (
        <>
          <FilterSelect
            label="Degree Award Level"
            value={search.programType ?? "all"}
            onChange={(v) => setSearch({ programType: v === "all" ? undefined : v })}
            options={[
              { value: "all", label: "All degrees" },
              { value: "MSc", label: "MSc — Master of Science" },
              { value: "Master's", label: "Master's Degree (MBA/MEng/MA)" },
              { value: "MPhil", label: "MPhil" },
              { value: "PhD", label: "PhD / Doctoral" },
              { value: "Postgraduate Diploma", label: "Postgraduate Diploma" },
              { value: "Open Day", label: "Postgraduate Open Day" },
            ]}
          />
          <FilterSelect
            label="Funding Type"
            value={search.fundingType ?? "all"}
            onChange={(v) => setSearch({ fundingType: v === "all" ? undefined : v })}
            options={[
              { value: "all", label: "All funding options" },
              { value: "Fully Funded", label: "Fully Funded" },
              { value: "Partially Funded", label: "Partially Funded" },
              { value: "Self-Funded", label: "Self-Funded" },
              { value: "Research Assistantship", label: "Research Assistantship" },
            ]}
          />
        </>
      )}

      {search.opportunityType === "UNIVERSITY_COURSE" && (
        <FilterSelect
          label="Course Credential Level"
          value={search.courseLevel ?? "all"}
          onChange={(v) => setSearch({ courseLevel: v === "all" ? undefined : v })}
          options={[
            { value: "all", label: "All course levels" },
            { value: "Certificate", label: "Certificate Program" },
            { value: "Professional Development", label: "Professional Development" },
            { value: "Diploma", label: "University Diploma" },
            { value: "Short Course", label: "Short Technical Course" },
            { value: "Undergraduate Module", label: "Undergraduate Module" },
          ]}
        />
      )}

      <FilterSelect
        label="Category"
        value={search.category ?? "all"}
        onChange={(v) => setSearch({ category: v })}
        options={[
          { value: "all", label: "All categories" },
          ...(categoriesQuery.data ?? []).map((c) => ({ value: c.id, label: c.name })),
        ]}
      />
      <FilterSelect
        label="University"
        value={search.university ?? "all"}
        onChange={(v) => setSearch({ university: v })}
        options={[
          { value: "all", label: "All universities" },
          ...(universitiesQuery.data ?? []).map((u) => ({ value: u.id, label: u.name })),
        ]}
      />
      <FilterSelect
        label="Organisation"
        value={search.organization ?? "all"}
        onChange={(v) => setSearch({ organization: v })}
        options={[
          { value: "all", label: "All organisations" },
          ...(orgsQuery.data ?? []).map((o) => ({ value: o.id, label: o.name })),
        ]}
      />
      <div>
        <p className="mb-2 text-sm font-semibold">Mode</p>
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              aria-pressed={(search.mode ?? "all") === m.value}
              onClick={() => setSearch({ mode: m.value })}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                (search.mode ?? "all") === m.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <FilterSelect
        label="Participation Scope"
        value={search.participationScope ?? "all"}
        onChange={(v) => setSearch({ participationScope: v === "all" ? undefined : v })}
        options={[
          { value: "all", label: "All scopes" },
          { value: "INTER_UNIVERSITY", label: "Inter-University" },
          { value: "INTRA_UNIVERSITY", label: "Campus Only" },
          { value: "OPEN_PUBLIC", label: "Open to All" },
        ]}
      />
      <Button
        variant="outline"
        className="w-full"
        onClick={() =>
          navigate({ to: ".", search: () => ({ q: search.q, sort: search.sort }) as ExploreSearch })
        }
      >
        <X className="size-4" />
        Clear filters
      </Button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <PageHeader
        eyebrow="Discovery"
        title="Discover Opportunities"
        description="Search across every published opportunity from verified university societies."
      />

      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSearch({ q: term || undefined });
        }}
      >
        <label htmlFor="explore-search" className="sr-only">
          Search opportunities
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            id="explore-search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search competitions, hackathons, workshops..."
            className="h-14 rounded-xl pl-12 pr-28 text-base"
          />
          <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
            Search
          </Button>
        </div>
      </form>

      {/* Opportunity Type Quick-Filter Pills */}
      <div className="mt-4 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {OPPORTUNITY_TYPES.map((t) => (
          <Pill
            key={t.value}
            active={(!search.opportunityType && t.value === "all") || search.opportunityType === t.value}
            onClick={() => setSearch({ opportunityType: t.value === "all" ? undefined : t.value })}
          >
            {t.label}
          </Pill>
        ))}
      </div>

      <div className="mt-8 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wider">Filters</h2>
            {filterPanel}
          </div>
        </aside>

        <div className="min-w-0">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
            <p className="min-w-0 truncate text-sm text-muted-foreground">
              {eventsQuery.isPending ? "Searching…" : `${results.length} opportunities`}
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="size-4" />
                    Filters{activeFilters > 0 && ` (${activeFilters})`}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="p-4">{filterPanel}</div>
                </SheetContent>
              </Sheet>

              <Select value={search.sort ?? "recommended"} onValueChange={(v) => setSearch({ sort: v as EventFilters["sort"] })}>
                <SelectTrigger className="w-[150px]" aria-label="Sort results">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>

              <div className="hidden items-center rounded-lg border border-border p-0.5 sm:flex">
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
            </div>
          </div>

          <div className="mt-5">
            {eventsQuery.isPending ? (
              <GridSkeleton />
            ) : eventsQuery.isError ? (
              <ErrorState onRetry={() => eventsQuery.refetch()} />
            ) : results.length === 0 ? (
              <EmptyState
                title="No opportunities match your filters"
                description="Try removing a filter or searching for something broader."
                action={
                  <Button onClick={() => navigate({ to: ".", search: () => ({}) })}>Reset search</Button>
                }
              />
            ) : view === "grid" ? (
              <OpportunityGrid events={shown} />
            ) : (
              <OpportunityList events={shown} />
            )}
          </div>

          {shown.length < results.length && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" onClick={() => setVisible((v) => v + 9)}>
                Load more opportunities
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-navy bg-navy text-navy-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const id = `filter-${label.toLowerCase()}`;
  return (
    <div>
      <Label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
