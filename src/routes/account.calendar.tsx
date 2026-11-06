import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Ticket, Bookmark, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState, PageHeader, RowSkeleton } from "@/components/common/States";
import { DeadlineBadge } from "@/components/common/Badges";
import { eventsApi } from "@/lib/api/events";
import { formatDate } from "@/lib/format";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account/calendar")({
  head: () => ({
    meta: [
      { title: "Opportunity & Registered Schedule Calendar — CampusPulse" },
      { name: "description", content: "See registered passes, saved opportunities and deadlines on a monthly calendar." },
      { property: "og:title", content: "Opportunity Calendar — CampusPulse" },
      { property: "og:description", content: "Your month at a glance on CampusPulse." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CalendarPage,
});

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CALENDAR_FILTERS = [
  { id: "all", label: "All Opportunities" },
  { id: "registered", label: "Registered Passes 🎫" },
  { id: "saved", label: "Saved Items 🔖" },
] as const;

function CalendarPage() {
  const { user } = useAuth();
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [filter, setFilter] = useState<(typeof CALENDAR_FILTERS)[number]["id"]>("all");

  const query = useQuery({ queryKey: ["events", "calendar"], queryFn: () => eventsApi.list({ limit: 60 }) });
  const registrationsQuery = useQuery({
    queryKey: ["registrations", user?.id],
    queryFn: () => eventsApi.registrations(),
    enabled: !!user,
  });
  const savedQuery = useQuery({
    queryKey: ["saved", user?.id],
    queryFn: () => eventsApi.saved(),
    enabled: !!user,
  });

  const rawEvents = query.data ?? [];
  const registeredEvents = (registrationsQuery.data ?? []).map((r) => r.event).filter(Boolean);
  const savedEvents = savedQuery.data ?? [];

  const registeredIds = new Set(registeredEvents.map((e) => e.id));
  const savedIds = new Set(savedEvents.map((e) => e.id));

  // Merge unique events
  const allEventsMap = new Map<string, typeof rawEvents[0]>();
  rawEvents.forEach((e) => { if (e?.id) allEventsMap.set(e.id, e); });
  registeredEvents.forEach((e) => { if (e?.id) allEventsMap.set(e.id, e); });
  savedEvents.forEach((e) => { if (e?.id) allEventsMap.set(e.id, e); });

  const allMergedEvents = Array.from(allEventsMap.values());

  const filteredEvents = allMergedEvents.filter((e) => {
    if (filter === "registered") return registeredIds.has(e.id);
    if (filter === "saved") return savedIds.has(e.id);
    return true;
  });

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (first.getDay() + 6) % 7;
  const cells = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const forDay = (day: number) =>
    filteredEvents.filter((e) => {
      if (!e?.startDate) return false;
      const start = new Date(e.startDate);
      if (isNaN(start.getTime())) return false;
      const end = e.endDate ? new Date(e.endDate) : start;
      const validEnd = isNaN(end.getTime()) ? start : end;

      const currentDayStart = new Date(year, month, day, 0, 0, 0, 0);
      const currentDayEnd = new Date(year, month, day, 23, 59, 59, 999);

      return start <= currentDayEnd && validEnd >= currentDayStart;
    });

  const monthStart = new Date(year, month, 1, 0, 0, 0, 0);
  const monthEnd = new Date(year, month + 1, 0, 23, 59, 59, 999);

  const monthEvents = filteredEvents
    .filter((e) => {
      if (!e?.startDate) return false;
      const start = new Date(e.startDate);
      if (isNaN(start.getTime())) return false;
      const end = e.endDate ? new Date(e.endDate) : start;
      const validEnd = isNaN(end.getTime()) ? start : end;

      return start <= monthEnd && validEnd >= monthStart;
    })
    .sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));

  const isCurrentMonth = () => {
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() === month;
  };

  const handleGoToday = () => {
    const today = new Date();
    setCursor(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const isError = query.isError && !query.data;

  return (
    <div>
      <PageHeader
        title="Schedule & Opportunity Calendar"
        description="Track your registered event dates, saved opportunities, and competition deadlines month by month."
      />

      {/* Filter Tabs & Navigation */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {CALENDAR_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                filter === f.id
                  ? "bg-navy text-navy-foreground shadow-sm"
                  : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border/50",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Month Navigation + Today Button */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={cn("text-xs font-semibold h-8", isCurrentMonth() && "opacity-60")}
            onClick={handleGoToday}
          >
            Today
          </Button>
          <h2 className="text-sm sm:text-base font-bold text-foreground min-w-32 text-center">
            {cursor.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
          </h2>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              aria-label="Previous month"
              onClick={() => setCursor(new Date(year, month - 1, 1))}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              aria-label="Next month"
              onClick={() => setCursor(new Date(year, month + 1, 1))}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {isError ? (
        <div className="mt-6">
          <ErrorState
            message="Failed to load calendar events. Please check your connection and try again."
            onRetry={() => {
              query.refetch();
              registrationsQuery.refetch();
              savedQuery.refetch();
            }}
          />
        </div>
      ) : (
        <>
          {/* Desktop Calendar Grid */}
          <div className="mt-5 hidden overflow-hidden rounded-xl border border-border bg-card sm:block shadow-sm">
            <div className="grid grid-cols-7 border-b border-border bg-surface">
              {DAY_LABELS.map((d) => (
                <div key={d} className="px-2 py-2 text-center text-xs font-bold text-muted-foreground">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {cells.map((day, i) => {
                const dayEvents = day ? forDay(day) : [];
                return (
                  <div
                    key={i}
                    className={cn(
                      "min-h-24 border-b border-r border-border p-1.5 last:border-r-0 transition-colors",
                      !day && "bg-surface/40",
                    )}
                  >
                    {day && (
                      <>
                        <span className="text-xs font-semibold text-muted-foreground">{day}</span>
                        <ul className="mt-1 space-y-1">
                          {dayEvents.slice(0, 2).map((e) => {
                            const isReg = registeredIds.has(e.id);
                            const isSaved = savedIds.has(e.id);
                            return (
                              <li key={e.id}>
                                <Link
                                  to="/events/$slug"
                                  params={{ slug: e.slug }}
                                  className={cn(
                                    "block truncate rounded px-1.5 py-0.5 text-[11px] font-medium transition-colors",
                                    isReg
                                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold hover:bg-emerald-500/25"
                                      : isSaved
                                        ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 hover:bg-amber-500/25"
                                        : "bg-primary/15 text-foreground hover:bg-primary/25",
                                  )}
                                >
                                  {isReg ? "🎫 " : isSaved ? "🔖 " : ""}
                                  {e.title}
                                </Link>
                              </li>
                            );
                          })}
                          {dayEvents.length > 2 && (
                            <li className="px-1.5 text-[10px] text-muted-foreground font-semibold">
                              +{dayEvents.length - 2} more
                            </li>
                          )}
                        </ul>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Event List */}
          <section className="mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Schedule for {cursor.toLocaleDateString("en-GB", { month: "long" })}
              </h2>
              <span className="text-xs text-muted-foreground font-semibold">
                {monthEvents.length} {monthEvents.length === 1 ? "Event" : "Events"}
              </span>
            </div>

            <div className="mt-3">
              {query.isPending ? (
                <RowSkeleton count={4} />
              ) : monthEvents.length === 0 ? (
                <EmptyState
                  icon={<CalendarIcon className="size-6" />}
                  title="Nothing scheduled this month"
                  description="No opportunities or registered events match your active calendar filter."
                />
              ) : (
                <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                  {monthEvents.map((e) => {
                    const isReg = registeredIds.has(e.id);
                    const isSaved = savedIds.has(e.id);

                    return (
                      <li key={e.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <Link
                              to="/events/$slug"
                              params={{ slug: e.slug }}
                              className="truncate text-sm font-bold text-foreground hover:text-primary transition-colors"
                            >
                              {e.title}
                            </Link>
                            {isReg && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                                <Ticket className="size-3" />
                                Registered
                              </span>
                            )}
                            {isSaved && !isReg && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.2 text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                <Bookmark className="size-3" />
                                Saved
                              </span>
                            )}
                          </div>
                          <p className="truncate text-xs text-muted-foreground mt-1">
                            {formatDate(e.startDate)} · {e.organizationName || "Campus Organizer"} · {e.location || "Online"}
                          </p>
                        </div>
                        <DeadlineBadge deadline={e.registrationDeadline} />
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

