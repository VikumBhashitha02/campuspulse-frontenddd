import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Building2, ExternalLink, Globe, GraduationCap, MapPin, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrganizationCard } from "@/components/common/Cards";
import { OpportunityGrid } from "@/components/opportunity/OpportunityCard";
import { EmptyState, GridSkeleton } from "@/components/common/States";
import { directoryApi } from "@/lib/api/directory";
import { eventsApi } from "@/lib/api/events";

export const Route = createFileRoute("/universities/$slug")({
  loader: async ({ params }) => {
    const university = await directoryApi.university(params.slug);
    if (!university) throw notFound();
    return { university };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "University not found — CampusPulse" }, { name: "robots", content: "noindex" }] };
    }
    const { university } = loaderData;
    return {
      meta: [
        { title: `${university.name} — CampusPulse` },
        { name: "description", content: university.about },
        { property: "og:title", content: `${university.name} — CampusPulse` },
        { property: "og:description", content: university.about },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-extrabold">University not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The requested university community does not exist or has been deactivated.
      </p>
    </div>
  ),
  component: UniversityDetailPage,
});

function UniversityDetailPage() {
  const { university: initialUniversity } = Route.useLoaderData();

  // Connected to synchronized React Query cache
  const uniQuery = useQuery({
    queryKey: ["university", initialUniversity.slug],
    queryFn: async () => {
      const u = await directoryApi.university(initialUniversity.slug);
      return u ?? initialUniversity;
    },
    initialData: initialUniversity,
  });

  const university = uniQuery.data ?? initialUniversity;

  const orgsQuery = useQuery({
    queryKey: ["organizations", university.id],
    queryFn: () => directoryApi.organizations(university.id),
  });

  const eventsQuery = useQuery({
    queryKey: ["events", "university", university.id],
    queryFn: () => eventsApi.list({ university: university.id }),
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      {/* University Banner if supported */}
      {university.bannerUrl && (
        <div className="mb-6 h-48 w-full overflow-hidden rounded-2xl border border-border shadow-sm sm:h-64">
          <img
            src={university.bannerUrl}
            alt={`${university.name} banner`}
            className="size-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>
      )}

      {/* Header Profile */}
      <header className="relative overflow-hidden rounded-2xl border border-border bg-navy p-6 text-navy-foreground sm:p-9 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
          {university.logoUrl ? (
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white p-2.5 shadow-md overflow-hidden">
              <img
                src={university.logoUrl}
                alt={university.name}
                className="size-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
          ) : (
            <span
              className="grid size-20 shrink-0 place-items-center rounded-2xl text-xl font-black text-navy shadow-md"
              style={{ backgroundColor: university.logoColor || "#FBBF24" }}
              aria-hidden
            >
              {university.shortName || university.code || "UNI"}
            </span>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight sm:text-3xl text-white">
                {university.name}
              </h1>
              {university.code && (
                <span className="rounded bg-primary/20 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                  {university.code}
                </span>
              )}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-navy-foreground/75">
              <p className="flex items-center gap-1.5">
                <MapPin className="size-4 text-primary" aria-hidden />
                {university.location}
              </p>

              {university.websiteUrl && (
                <a
                  href={university.websiteUrl.startsWith("http") ? university.websiteUrl : `https://${university.websiteUrl}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1.5 text-primary hover:underline"
                >
                  <Globe className="size-4" aria-hidden />
                  <span className="truncate max-w-[220px]">
                    {university.websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </span>
                  <ExternalLink className="size-3" aria-hidden />
                </a>
              )}
            </div>
          </div>
        </div>

        {university.about && (
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-navy-foreground/80">
            {university.about}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-6 border-t border-navy-foreground/15 pt-5 text-sm">
          <span className="flex items-center gap-2">
            <GraduationCap className="size-4 text-primary" aria-hidden />
            <strong className="text-white">
              {university.facultyCount ?? university.faculties?.length ?? 0}
            </strong> faculties
          </span>
          <span className="flex items-center gap-2">
            <Users className="size-4 text-primary" aria-hidden />
            <strong className="text-white">{university.organizationCount ?? 0}</strong> active societies
          </span>
          <span className="flex items-center gap-2">
            <Building2 className="size-4 text-primary" aria-hidden />
            <strong className="text-white">{university.eventCount ?? 0}</strong> open opportunities
          </span>
        </div>
      </header>

      {/* Tabs */}
      <Tabs defaultValue="opportunities" className="mt-8">
        <TabsList className="bg-muted/80 p-1">
          <TabsTrigger value="opportunities">Opportunities ({university.eventCount ?? 0})</TabsTrigger>
          <TabsTrigger value="organizations">Societies & Clubs ({university.organizationCount ?? 0})</TabsTrigger>
          <TabsTrigger value="faculties">Faculties & Departments ({university.facultyCount ?? university.faculties?.length ?? 0})</TabsTrigger>
        </TabsList>

        {/* Opportunities Tab */}
        <TabsContent value="opportunities" className="mt-6">
          {eventsQuery.isPending ? (
            <GridSkeleton />
          ) : (eventsQuery.data ?? []).length === 0 ? (
            <EmptyState
              title="No open opportunities"
              description="This campus community has no published opportunities at the moment."
            />
          ) : (
            <OpportunityGrid events={eventsQuery.data ?? []} />
          )}
        </TabsContent>

        {/* Organisations Tab */}
        <TabsContent value="organizations" className="mt-6">
          {orgsQuery.isPending ? (
            <GridSkeleton count={3} />
          ) : (orgsQuery.data ?? []).length === 0 ? (
            <EmptyState
              title="No societies registered"
              description="No student clubs or societies are currently registered under this university."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(orgsQuery.data ?? []).map((o) => (
                <OrganizationCard key={o.id} organization={o} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Faculties Tab */}
        <TabsContent value="faculties" className="mt-6">
          {(university.faculties ?? []).length === 0 ? (
            <EmptyState
              title="No faculties listed yet"
              description="Faculties and academic departments for this university are being organized."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(university.faculties ?? []).map((f) => (
                <div key={f.id} className="rounded-xl border border-border bg-card p-5 shadow-xs">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm font-bold text-foreground">{f.name}</h2>
                    {f.code && (
                      <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground">
                        {f.code}
                      </span>
                    )}
                  </div>
                  {(f.departments ?? []).length === 0 ? (
                    <p className="mt-3 text-xs text-muted-foreground/75 italic">
                      No departments added under this faculty yet.
                    </p>
                  ) : (
                    <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                      {f.departments.map((d) => (
                        <li key={d.id} className="flex items-center gap-1.5">
                          <span className="size-1 rounded-full bg-primary/60 shrink-0" />
                          <span className="truncate">{d.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
