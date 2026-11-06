import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BellRing,
  Briefcase,
  Code2,
  FlaskConical,
  HeartHandshake,
  Mic,
  Presentation,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Wrench,
} from "lucide-react";
import { useState, type ComponentType } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OpportunityCard } from "@/components/opportunity/OpportunityCard";
import { OrganizationCard, UniversityCard } from "@/components/common/Cards";
import { CardSkeleton, ErrorState, GridSkeleton } from "@/components/common/States";
import { DeadlineBadge } from "@/components/common/Badges";
import { eventsApi } from "@/lib/api/events";
import { directoryApi } from "@/lib/api/directory";
import { formatRange } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusPulse — One Platform. Every University Opportunity." },
      {
        name: "description",
        content:
          "Discover competitions, hackathons, workshops, research opportunities, conferences and events happening across university communities in Sri Lanka.",
      },
      { property: "og:title", content: "CampusPulse — One Platform. Every University Opportunity." },
      {
        property: "og:description",
        content:
          "Find hackathons, competitions, workshops and research opportunities from verified university societies.",
      },
    ],
  }),
  component: HomePage,
});

const categoryIcons: Record<string, ComponentType<{ className?: string }>> = {
  Code2,
  Trophy,
  Wrench,
  Mic,
  FlaskConical,
  Presentation,
  HeartHandshake,
  Briefcase,
};

function HomePage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const eventsQuery = useQuery({ queryKey: ["events", "home"], queryFn: () => eventsApi.list({ sort: "trending" }) });
  const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: () => eventsApi.categories() });
  const universitiesQuery = useQuery({ queryKey: ["universities"], queryFn: () => directoryApi.universities() });
  const orgsQuery = useQuery({ queryKey: ["organizations"], queryFn: () => directoryApi.organizations() });

  const featured = eventsQuery.data?.slice(0, 6) ?? [];
  const closing = [...(eventsQuery.data ?? [])]
    .sort((a, b) => +new Date(a.registrationDeadline) - +new Date(b.registrationDeadline))
    .slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-navy text-navy-foreground">
        <div aria-hidden className="absolute inset-0 grid-noise opacity-[0.35]" />
        <div
          aria-hidden
          className="absolute -right-24 -top-24 size-96 rounded-full bg-primary/25 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/20 bg-navy-foreground/5 px-3 py-1 text-xs font-semibold">
              <Sparkles className="size-3.5 text-primary" aria-hidden />
              246 open opportunities across 6 universities
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              One Platform.
              <br />
              <span className="text-primary">Every University Opportunity.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-foreground/75 sm:text-lg">
              Discover competitions, hackathons, workshops, research opportunities, conferences and
              events happening across university communities.
            </p>

            <form
              className="mt-8 flex max-w-lg flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/explore", search: { q } });
              }}
            >
              <label htmlFor="hero-search" className="sr-only">
                Search opportunities
              </label>
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  id="hero-search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search competitions, hackathons, workshops..."
                  className="h-12 border-transparent bg-background pl-9 text-foreground"
                />
              </div>
              <Button type="submit" size="lg" className="h-12">
                Explore Opportunities
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button asChild variant="outline" size="lg" className="border-navy-foreground/25 bg-transparent text-navy-foreground hover:bg-navy-foreground/10">
                <Link to="/register">Join CampusPulse</Link>
              </Button>
              <p className="text-xs text-navy-foreground/60">Free for every university student.</p>
            </div>
          </div>

          {/* Discovery preview stack */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-x-6 top-6 rounded-xl border border-navy-foreground/15 bg-navy-foreground/5 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Closing soon</p>
            </div>
            <div className="relative mt-16 space-y-3">
              {(eventsQuery.data ?? []).slice(0, 3).map((e, i) => (
                <div
                  key={e.id}
                  className="rounded-xl border border-navy-foreground/15 bg-navy-foreground/[0.07] p-4 backdrop-blur transition-transform hover:translate-x-1"
                  style={{ marginLeft: `${i * 14}px` }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                    {e.categoryName}
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold">{e.title}</p>
                  <p className="mt-1 truncate text-xs text-navy-foreground/60">
                    {e.organizationName} · {formatRange(e.startDate, e.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          title="Trending categories"
          description="Jump straight into the kind of opportunity you're looking for."
        />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(categoriesQuery.data ?? []).map((c) => {
            const Icon = categoryIcons[c.icon] ?? Trophy;
            return (
              <Link
                key={c.id}
                to="/explore"
                search={{ category: c.id }}
                className="card-interactive flex items-center gap-3 rounded-xl border border-border bg-card p-4"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{c.name}</span>
                  <span className="block text-xs text-muted-foreground">{c.count} open</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <SectionHeading
            title="Featured opportunities"
            description="Handpicked from verified university societies this month."
            action={
              <Button asChild variant="outline">
                <Link to="/explore">
                  See all <ArrowRight className="size-4" />
                </Link>
              </Button>
            }
          />
          <div className="mt-6">
            {eventsQuery.isPending ? (
              <GridSkeleton />
            ) : eventsQuery.isError ? (
              <ErrorState onRetry={() => eventsQuery.refetch()} />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {featured.map((e) => (
                  <OpportunityCard key={e.id} event={e} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Deadlines */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading title="Upcoming deadlines" description="Don't miss these registration windows." />
        <ul className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {eventsQuery.isPending && <li className="p-5"><CardSkeleton /></li>}
          {closing.map((e) => (
            <li key={e.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4 sm:p-5">
              <div className="min-w-0">
                <Link
                  to="/events/$slug"
                  params={{ slug: e.slug }}
                  className="truncate text-sm font-semibold hover:underline"
                >
                  {e.title}
                </Link>
                <p className="truncate text-xs text-muted-foreground">
                  {e.organizationName} · {e.universityName}
                </p>
              </div>
              <DeadlineBadge deadline={e.registrationDeadline} />
            </li>
          ))}
        </ul>
      </section>

      {/* Universities */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <SectionHeading
            title="Universities on CampusPulse"
            description="Explore campus communities, their faculties, and active societies."
            action={
              <Button asChild variant="outline">
                <Link to="/universities">
                  View All Universities <ArrowRight className="size-4" />
                </Link>
              </Button>
            }
          />
          <div className="mt-6">
            {universitiesQuery.isPending ? (
              <GridSkeleton count={6} />
            ) : universitiesQuery.isError ? (
              <ErrorState onRetry={() => universitiesQuery.refetch()} />
            ) : (universitiesQuery.data ?? []).length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No active universities available right now.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(universitiesQuery.data ?? []).slice(0, 6).map((u) => (
                  <UniversityCard key={u.id} university={u} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Organizations */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          title="Student organisations"
          description="Verified societies publishing opportunities every week."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(orgsQuery.data ?? []).slice(0, 3).map((o) => (
            <OrganizationCard key={o.id} organization={o} />
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <SectionHeading title="Why CampusPulse" description="Built around how students actually find and join things." />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon={Search}
              title="Everything in one place"
              body="Competitions, workshops, research and careers from every campus — no more scattered WhatsApp posters."
            />
            <Feature
              icon={ShieldCheck}
              title="Verified organisers"
              body="Societies are verified by university administrators before their listings go public."
            />
            <Feature
              icon={Users}
              title="Find your team"
              body="Match with teammates by role, skill and availability using a transparent compatibility score."
            />
            <Feature
              icon={BellRing}
              title="Never miss a deadline"
              body="Save opportunities and get reminders before registration windows close."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-navy px-6 py-14 text-center text-navy-foreground sm:px-12">
          <div aria-hidden className="absolute inset-0 grid-noise opacity-30" />
          <div className="relative">
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
              Your next opportunity is already listed.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-navy-foreground/70">
              Join CampusPulse to save opportunities, register in one tap and build teams with students
              across the country.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/register">Join CampusPulse</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-navy-foreground/25 bg-transparent text-navy-foreground hover:bg-navy-foreground/10"
              >
                <Link to="/explore">Explore Opportunities</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
      <div className="min-w-0">
        <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h2>
        {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  body,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <span className="grid size-10 place-items-center rounded-lg bg-accent text-accent-foreground">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-4 text-sm font-bold">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
