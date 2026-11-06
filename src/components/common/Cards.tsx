import { Link } from "@tanstack/react-router";
import { Building2, GraduationCap, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrgAvatar, VerificationBadge } from "@/components/common/Badges";
import { cn } from "@/lib/utils";
import type { Organization, Team, University } from "@/lib/types";

export function UniversityCard({ university }: { university: University }) {
  return (
    <article className="card-interactive group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:border-primary/40 hover:shadow-md">
      {university.bannerUrl && (
        <div className="h-20 w-full overflow-hidden border-b border-border/50 bg-muted">
          <img
            src={university.bannerUrl}
            alt={`${university.name} banner`}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          {university.logoUrl ? (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-white p-1 shadow-xs overflow-hidden">
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
              aria-hidden
              className="grid size-12 shrink-0 place-items-center rounded-lg text-sm font-extrabold text-navy-foreground shadow-xs"
              style={{ backgroundColor: university.logoColor || "#1E3A8A" }}
            >
              {university.shortName || university.code || "UNI"}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-bold text-foreground">
              <Link
                to="/universities/$slug"
                params={{ slug: university.slug }}
                className="after:absolute after:inset-0 after:content-[''] hover:text-primary transition-colors"
              >
                {university.name}
              </Link>
            </h3>
            <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3.5 shrink-0 text-muted-foreground/80" aria-hidden />
              <span className="truncate">{university.location}</span>
            </p>
          </div>
        </div>

        {university.about && (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {university.about}
          </p>
        )}

        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-border/60 pt-3 text-center">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Faculties</dt>
            <dd className="mt-0.5 text-base font-bold text-foreground">
              {university.facultyCount ?? university.faculties?.length ?? 0}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Societies</dt>
            <dd className="mt-0.5 text-base font-bold text-foreground">{university.organizationCount ?? 0}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Opportunities</dt>
            <dd className="mt-0.5 text-base font-bold text-primary">{university.eventCount ?? 0}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export function OrganizationCard({ organization }: { organization: Organization }) {
  return (
    <article className="card-interactive relative rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start gap-3">
        <OrgAvatar initials={organization.initials} className="size-12" />
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-1.5">
            <h3 className="truncate text-base font-bold">
              <Link
                to="/organizations/$slug"
                params={{ slug: organization.slug }}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {organization.name}
              </Link>
            </h3>
            <VerificationBadge verified={organization.verified} label="" />
          </div>
          <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <GraduationCap className="size-3.5" aria-hidden />
            {organization.universityName}
          </p>
        </div>
      </div>
      <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{organization.description}</p>
      <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Users className="size-3.5" aria-hidden />
        {organization.memberCount} members
      </p>
    </article>
  );
}

export function CompatibilityScore({ value, className }: { value: number; className?: string }) {
  const tone =
    value >= 85 ? "text-success" : value >= 70 ? "text-primary" : "text-muted-foreground";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className="relative h-2 w-24 overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={`Compatibility ${value} out of 100`}
      >
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-primary"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={cn("text-sm font-bold", tone)}>{value}% match</span>
    </div>
  );
}

export function TeamCard({
  team,
  onRequest,
  isMember = false,
  isLeader = false,
}: {
  team: Team;
  onRequest?: (team: Team) => void;
  isMember?: boolean;
  isLeader?: boolean;
}) {
  const isFull = (team.maxMembers && team.members.length >= team.maxMembers) || team.openSlots <= 0;
  const isRecruiting = team.isOpen !== false && !isFull;

  return (
    <article className="card-interactive flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-bold">{team.name}</h3>
              {isRecruiting ? (
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  Recruiting
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                  {isFull ? "Full" : "Closed"}
                </span>
              )}
            </div>
            <p className="mt-1 inline-flex items-center gap-1.5 truncate text-xs text-muted-foreground">
              <Building2 className="size-3.5 shrink-0 text-primary" aria-hidden />
              {team.eventTitle || "Open Campus Squad"}
            </p>
          </div>
          <span className="shrink-0 rounded-md bg-surface px-2.5 py-1 text-xs font-semibold text-foreground border border-border/60">
            {team.members.length}/{team.maxMembers || 4} members
          </span>
        </div>

        {team.description && (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {team.description}
          </p>
        )}

        <CompatibilityScore value={team.compatibility} className="mt-3.5" />

        <div className="mt-4 space-y-2 text-sm">
          {team.requiredRoles && team.requiredRoles.length > 0 && (
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Roles:</span>{" "}
              {team.requiredRoles.join(", ")}
            </p>
          )}
          {team.skills && team.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {team.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/40"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-border pt-3.5">
        <div className="flex items-center gap-2 truncate">
          {team.leaderAvatarUrl ? (
            <img
              src={team.leaderAvatarUrl}
              alt={team.leader}
              className="size-6 rounded-full object-cover border border-border"
            />
          ) : (
            <OrgAvatar initials={team.leader?.slice(0, 2).toUpperCase() || "LD"} className="size-6 text-[10px]" />
          )}
          <span className="truncate text-xs text-muted-foreground">
            Led by <span className="font-medium text-foreground">{team.leader}</span>
          </span>
        </div>

        <div className="flex shrink-0 gap-2">
          <Button asChild variant="outline" size="sm" className="h-8 text-xs font-semibold">
            <Link to="/account/teams/$id" params={{ id: team.id }}>
              View squad
            </Link>
          </Button>

          {!isMember && (
            <Button
              size="sm"
              className="h-8 text-xs font-semibold"
              disabled={!isRecruiting}
              onClick={() => onRequest?.(team)}
            >
              {isRecruiting ? "Request to join" : "Squad full"}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

