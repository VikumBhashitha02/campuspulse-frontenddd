import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  Bookmark,
  Building2,
  Clock3,
  Flame,
  Globe,
  HeartHandshake,
  Search,
  Sparkles,
  Ticket,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  OpportunityCard,
  OpportunityRail,
} from "@/components/opportunity/OpportunityCard";
import { EmptyState, ErrorState, GridSkeleton, RowSkeleton } from "@/components/common/States";
import { PanelCard, RailSkeleton, SectionHeading } from "@/components/common/Section";
import { DeadlineBadge, OrgAvatar } from "@/components/common/Badges";
import { eventsApi } from "@/lib/api/events";
import { socialApi } from "@/lib/api/social";
import { deadlineInfo } from "@/lib/format";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { CampusEvent, FeedMode } from "@/lib/types";

export const Route = createFileRoute("/account/")({
  head: () => ({
    meta: [
      { title: "Personalized Feed — CampusPulse" },
      { name: "description", content: "Your personalized feed of university opportunities and campus activity." },
      { property: "og:title", content: "Personalized Feed — CampusPulse" },
      { property: "og:description", content: "Recommended opportunities, university updates and team activity." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FeedPage,
});

const FEED_MODES: Array<{
  id: FeedMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}> = [
  { id: "FOR_YOU", label: "For You", icon: Sparkles, description: "Personalized recommendations prioritizing your campus" },
  { id: "MY_UNIVERSITY", label: "My Campus", icon: Building2, description: "Opportunities exclusively from or open to your university" },
  { id: "FOLLOWING", label: "Following", icon: UserCheck, description: "Updates from student clubs and organizations you follow" },
  { id: "TRENDING", label: "Trending", icon: Flame, description: "Highest student engagement velocity right now" },
  { id: "ALL_OPPORTUNITIES", label: "All Opportunities", icon: Globe, description: "Comprehensive open university catalog" },
  { id: "VOLUNTEERING", label: "Volunteering", icon: HeartHandshake, description: "Campus leadership and community initiatives" },
];

function useGreeting() {
  const [greeting, setGreeting] = useState("Welcome back");
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);
  return greeting;
}

function FeedPage() {
  const { user } = useAuth();
  const greeting = useGreeting();
  const [activeMode, setActiveMode] = useState<FeedMode>("FOR_YOU");
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(8);

  // Personalized Feed query
  const feedQuery = useQuery({
    queryKey: ["feed", activeMode, searchTerm, limit, user?.id],
    queryFn: () =>
      eventsApi.getFeed({
        mode: activeMode,
        search: searchTerm || undefined,
        limit,
      }),
  });

  const saved = useQuery({ queryKey: ["saved", user?.id], queryFn: () => eventsApi.saved() });
  const regs = useQuery({ queryKey: ["registrations", user?.id], queryFn: () => eventsApi.registrations() });
  const teams = useQuery({ queryKey: ["teams"], queryFn: () => socialApi.teams() });
  const notifications = useQuery({
    queryKey: ["notifications"],
    queryFn: () => socialApi.notifications(),
  });

  const firstName = user?.name.split(" ")[0] ?? "there";
  const userUni = feedQuery.data?.context?.userUniversityName || "Your University";

  const feedItems = feedQuery.data?.items ?? [];
  const totalItems = feedQuery.data?.pagination?.total ?? feedItems.length;
  const hasMore = feedQuery.data?.pagination?.hasMore ?? false;

  const feedEvents: CampusEvent[] = feedItems.map((i) => i.event);

  const closingSoon = feedEvents
    .filter((e: CampusEvent) => {
      const info = deadlineInfo(e.registrationDeadline);
      return info.tone === "urgent" || info.tone === "soon";
    })
    .sort((a: CampusEvent, b: CampusEvent) => +new Date(a.registrationDeadline) - +new Date(b.registrationDeadline))
    .slice(0, 8);

  const myDeadlines = [...(saved.data ?? []), ...(regs.data ?? []).map((r) => r.event)]
    .filter((e, i, arr) => arr.findIndex((x) => x.id === e.id) === i)
    .filter((e) => deadlineInfo(e.registrationDeadline).tone !== "closed")
    .sort((a, b) => +new Date(a.registrationDeadline) - +new Date(b.registrationDeadline))
    .slice(0, 4);

  const topTeams = [...(teams.data ?? [])].sort((a, b) => b.compatibility - a.compatibility).slice(0, 3);
  const recentActivity = (notifications.data ?? []).slice(0, 4);

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-8">
      <div className="min-w-0">
        {/* Greeting & Header banner */}
        <header className="rounded-2xl border border-border bg-navy p-6 text-navy-foreground sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                <Sparkles className="size-4" aria-hidden />
                CampusPulse Feed Engine
              </p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                {greeting}, {firstName}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-navy-foreground/75">
                {userUni ? `Connecting you with opportunities at ${userUni} and leading campuses.` : "Here's what's happening across universities today."}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link to="/explore">Explore all opportunities</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-navy-foreground/25 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"
            >
              <Link to="/account/teams">Find teammates</Link>
            </Button>
          </div>
        </header>

        {/* Quick Activity Stats */}
        <section className="mt-6">
          <h2 className="sr-only">Your activity</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Saved", value: saved.data?.length ?? 0, icon: Bookmark, to: "/account/saved" as const },
              {
                label: "Registered",
                value: regs.data?.length ?? 0,
                icon: Ticket,
                to: "/account/registrations" as const,
              },
              { label: "Team matches", value: teams.data?.length ?? 0, icon: Users, to: "/account/teams" as const },
              {
                label: "Deadlines nearby",
                value: myDeadlines.length,
                icon: Clock3,
                to: "/account/calendar" as const,
              },
            ].map((s) => (
              <li key={s.label}>
                <Link
                  to={s.to}
                  className="card-interactive flex flex-col rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
                >
                  <s.icon className="size-4 text-primary" aria-hidden />
                  <span className="mt-3 text-2xl font-extrabold tracking-tight">{s.value}</span>
                  <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ========================================================================= */}
        {/* Personalized Opportunity Feed with 6 Mode Switchers */}
        {/* ========================================================================= */}
        <section className="mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  Opportunity Feed
                </h2>
                {feedQuery.data?.context?.isPersonalized && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    <Sparkles className="size-3" aria-hidden />
                    Rule-Based Personalized
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {FEED_MODES.find((m) => m.id === activeMode)?.description}
              </p>
            </div>

            {/* Quick in-feed search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                type="search"
                placeholder="Filter feed..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="mt-5 -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 sm:flex-wrap">
            {FEED_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => {
                    setActiveMode(mode.id);
                    setLimit(8);
                  }}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          {/* Feed Content Grid & States */}
          <div className="mt-5">
            {feedQuery.isPending ? (
              <GridSkeleton count={4} />
            ) : feedQuery.isError ? (
              <ErrorState onRetry={() => feedQuery.refetch()} />
            ) : feedItems.length === 0 ? (
              <EmptyState
                title={
                  activeMode === "FOLLOWING"
                    ? "Not following any campus clubs yet"
                    : activeMode === "MY_UNIVERSITY"
                      ? "No campus opportunities found"
                      : "No opportunities match this filter"
                }
                description={
                  activeMode === "FOLLOWING"
                    ? "Follow student clubs, IEEE chapters, and campus societies to populate your following feed."
                    : activeMode === "MY_UNIVERSITY"
                      ? `There are currently no active opportunities listed specifically for ${userUni}. Explore all campuses!`
                      : "Try switching feed modes or clearing your search filter."
                }
                action={
                  activeMode === "FOLLOWING" ? (
                    <Button asChild>
                      <Link to="/explore">Explore student clubs</Link>
                    </Button>
                  ) : activeMode === "FOR_YOU" ? (
                    <Button asChild>
                      <Link to="/account/profile">Update profile skills</Link>
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => setActiveMode("FOR_YOU")}>
                      View For You feed
                    </Button>
                  )
                }
              />
            ) : (
              <div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {feedItems.map((item) => (
                    <OpportunityCard key={item.event.id} event={item.event} />
                  ))}
                </div>

                {/* Pagination Controls / Load More */}
                <div className="mt-8 flex flex-col items-center justify-center gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Showing <span className="font-semibold text-foreground">{feedItems.length}</span> of{" "}
                    <span className="font-semibold text-foreground">{totalItems}</span> opportunities
                  </p>
                  {hasMore && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLimit((prev) => prev + 6)}
                      className="font-semibold"
                    >
                      Load more opportunities
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Closing soon Rail */}
        <section className="mt-12">
          <SectionHeading
            title="Closing soon"
            description="Deadlines in the next three weeks."
            linkTo="/explore"
            linkLabel="Browse all"
          />
          <div className="mt-5">
            {feedQuery.isPending ? (
              <RailSkeleton />
            ) : closingSoon.length === 0 ? (
              <EmptyState
                title="No deadlines nearby"
                description="Nothing in your feed closes in the next few weeks."
                icon={<Clock3 className="size-6" aria-hidden />}
              />
            ) : (
              <OpportunityRail events={closingSoon} />
            )}
          </div>
        </section>

        {/* Activity & Team matches sidebar */}
      </div>

      {/* Right side panel */}
      <aside className="mt-10 space-y-5 xl:sticky xl:top-24 xl:mt-0 xl:self-start">
        <PanelCard
          title="Your deadlines"
          icon={<Clock3 className="size-4" aria-hidden />}
          footer={
            <Link to="/account/calendar" className="text-sm font-semibold hover:underline">
              Open calendar
            </Link>
          }
        >
          {myDeadlines.length === 0 ? (
            <p className="text-sm text-muted-foreground">No upcoming deadlines.</p>
          ) : (
            <ul className="space-y-3">
              {myDeadlines.map((e) => (
                <li key={e.id} className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/events/$slug"
                      params={{ slug: e.slug }}
                      className="block truncate text-sm font-semibold hover:underline"
                    >
                      {e.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">{e.organizationName}</p>
                  </div>
                  <DeadlineBadge deadline={e.registrationDeadline} />
                </li>
              ))}
            </ul>
          )}
        </PanelCard>

        <PanelCard
          title="Recommended teammates"
          icon={<Users className="size-4" aria-hidden />}
          footer={
            <Link to="/account/teams" className="text-sm font-semibold hover:underline">
              View all team calls
            </Link>
          }
        >
          {teams.isPending ? (
            <RowSkeleton count={3} />
          ) : topTeams.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active squads currently seeking members.</p>
          ) : (
            <ul className="space-y-3">
              {topTeams.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/account/teams/$id"
                      params={{ id: t.id }}
                      className="block truncate text-sm font-semibold hover:underline"
                    >
                      {t.name}
                    </Link>
                    <p className="truncate text-xs text-muted-foreground">{t.eventTitle || "Campus Opportunity"}</p>
                  </div>
                  <span className="text-xs font-bold text-primary">{t.compatibility}% match</span>
                </li>
              ))}
            </ul>
          )}
        </PanelCard>
      </aside>
    </div>
  );
}
