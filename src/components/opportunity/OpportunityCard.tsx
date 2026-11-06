import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bookmark,
  Share2,
  Trophy,
  CalendarDays,
  MapPin,
  Users,
  Music,
  Theater,
  GraduationCap,
  BookOpenCheck,
  Sparkles,
  Ticket,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  CategoryBadge,
  DeadlineBadge,
  MatchBadge,
  ModeBadge,
  OpportunityTypeBadge,
  OrgAvatar,
  ScopeBadge,
  VerificationBadge,
} from "@/components/common/Badges";
import { useSaveEvent } from "@/lib/hooks/use-save-event";
import { formatRange, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CampusEvent } from "@/lib/types";

async function shareEvent(event: CampusEvent) {
  const url = `${window.location.origin}/events/${event.slug}`;
  try {
    if (navigator.share) await navigator.share({ title: event.title, url });
    else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  } catch {
    /* user dismissed the share sheet */
  }
}

export function SaveButton({
  event,
  className,
}: {
  event: CampusEvent;
  className?: string;
}) {
  const { saved, toggle, pending } = useSaveEvent(event);
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("min-h-9 min-w-9 rounded-lg hover:bg-surface", className)}
      aria-label={saved ? `Remove ${event.title} from saved` : `Save ${event.title}`}
      aria-pressed={saved}
      disabled={pending}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
    >
      <Bookmark
        className={cn(
          "size-4 transition-transform",
          saved ? "scale-110 fill-primary text-primary" : "text-muted-foreground hover:text-foreground"
        )}
      />
    </Button>
  );
}

export function getEventLifecycle(event: CampusEvent): {
  label: "Upcoming" | "Ongoing" | "Finished" | "Cancelled";
  variant: "upcoming" | "ongoing" | "finished" | "cancelled";
} {
  if (event.status === "CANCELLED" || event.status === "REJECTED") {
    return { label: "Cancelled", variant: "cancelled" };
  }
  const now = Date.now();
  const start = event.startDate ? new Date(event.startDate).getTime() : 0;
  const end = event.endDate ? new Date(event.endDate).getTime() : 0;

  if (end && end < now) {
    return { label: "Finished", variant: "finished" };
  }
  if (start && start <= now && (!end || end >= now)) {
    return { label: "Ongoing", variant: "ongoing" };
  }
  return { label: "Upcoming", variant: "upcoming" };
}

function getCategoryFallbackGradient(opportunityType?: string): string {
  switch (opportunityType) {
    case "MUSIC":
      return "from-pink-700 via-rose-600 to-purple-800";
    case "DRAMA":
      return "from-violet-800 via-purple-700 to-indigo-900";
    case "HIGHER_STUDIES":
      return "from-sky-800 via-blue-700 to-indigo-900";
    case "UNIVERSITY_COURSE":
      return "from-teal-700 via-emerald-700 to-cyan-900";
    case "HACKATHON":
    case "COMPETITION":
      return "from-blue-800 via-indigo-700 to-violet-900";
    case "VOLUNTEERING":
      return "from-emerald-700 via-teal-700 to-blue-900";
    default:
      return "from-slate-800 via-slate-900 to-navy";
  }
}

function getCategoryIcon(opportunityType?: string) {
  switch (opportunityType) {
    case "MUSIC":
      return <Music className="size-8 text-white/90" />;
    case "DRAMA":
      return <Theater className="size-8 text-white/90" />;
    case "HIGHER_STUDIES":
      return <GraduationCap className="size-8 text-white/90" />;
    case "UNIVERSITY_COURSE":
      return <BookOpenCheck className="size-8 text-white/90" />;
    case "HACKATHON":
      return <Sparkles className="size-8 text-white/90" />;
    case "COMPETITION":
      return <Trophy className="size-8 text-white/90" />;
    default:
      return <CalendarDays className="size-8 text-white/90" />;
  }
}

/**
 * High-performance Poster Image Component with Overlay Badges and Gradient Fallback.
 */
export function OpportunityPoster({
  event,
  className,
  priority = false,
}: {
  event: CampusEvent;
  className?: string;
  priority?: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const posterSrc = !imgError ? (event.posterUrl || event.coverImageUrl || event.bannerUrl) : null;
  const lifecycle = getEventLifecycle(event);
  const gradient = getCategoryFallbackGradient(event.opportunityType);

  return (
    <div className={cn("relative overflow-hidden bg-muted aspect-[16/9] w-full select-none", className)}>
      {posterSrc ? (
        <img
          src={posterSrc}
          alt={event.title}
          loading={priority ? "eager" : "lazy"}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center bg-gradient-to-br p-4 text-center text-white",
            gradient
          )}
        >
          <div className="rounded-full bg-white/15 p-3 backdrop-blur-md shadow-inner">
            {getCategoryIcon(event.opportunityType)}
          </div>
          <span className="mt-2 text-xs font-black tracking-wider uppercase text-white/90">
            {event.categoryName || event.opportunityType || "Campus Opportunity"}
          </span>
        </div>
      )}

      {/* Subtle overlay gradient to ensure badges remain clearly legible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/35" />

      {/* Top badges: Status & Delivery Mode */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-1.5 pointer-events-none z-10">
        {/* Status Lifecycle Badge */}
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide backdrop-blur-md shadow-md border",
            lifecycle.variant === "ongoing" &&
              "bg-emerald-950/85 text-emerald-200 border-emerald-500/50 shadow-emerald-950/40",
            lifecycle.variant === "upcoming" &&
              "bg-blue-950/85 text-blue-200 border-blue-500/50 shadow-blue-950/40",
            lifecycle.variant === "finished" &&
              "bg-slate-900/90 text-slate-300 border-slate-600/50",
            lifecycle.variant === "cancelled" &&
              "bg-rose-950/90 text-rose-200 border-rose-500/50"
          )}
        >
          {lifecycle.variant === "ongoing" && (
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
          )}
          {lifecycle.label}
        </span>

        {/* Delivery Format Badge */}
        <span className="inline-flex items-center gap-1 rounded-full bg-black/65 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-white/95 border border-white/20 shadow-md">
          {event.mode === "ONLINE" ? "🌐 Online" : event.mode === "HYBRID" ? "⚡ Hybrid" : "📍 In Person"}
        </span>
      </div>

      {/* Bottom overlay: Category badge + Prize/Fee snippet */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none z-10">
        <span className="rounded-md bg-black/75 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-white border border-white/15 shadow-sm">
          {event.categoryName || event.opportunityType}
        </span>

        {event.prize && (
          <span className="rounded-md bg-amber-400 text-amber-950 font-black px-2 py-0.5 text-[10px] shadow-sm flex items-center gap-1">
            <Trophy className="size-3 shrink-0" />
            <span className="truncate max-w-[130px]">{event.prize}</span>
          </span>
        )}
      </div>
    </div>
  );
}

export function OpportunityCard({
  event,
  layout = "grid",
}: {
  event: CampusEvent;
  layout?: "grid" | "list";
}) {
  const isFree = event.isFree !== false;
  const priceDisplay = isFree
    ? "Free"
    : event.studentPrice !== null && event.studentPrice !== undefined && Number(event.studentPrice) > 0
      ? `Rs. ${Number(event.studentPrice).toLocaleString()}`
      : event.price !== null && event.price !== undefined && Number(event.price) > 0
        ? `Rs. ${Number(event.price).toLocaleString()}`
        : "Paid";

  return (
    <article
      className={cn(
        "card-interactive group relative flex flex-col rounded-2xl border border-border/80 bg-card shadow-[var(--shadow-card)] overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/30",
        layout === "list" && "sm:flex-row sm:items-stretch"
      )}
    >
      {/* 1. Poster Area */}
      <div className={cn("relative shrink-0 overflow-hidden", layout === "list" ? "sm:w-72 sm:min-w-[280px]" : "w-full")}>
        <Link to="/events/$slug" params={{ slug: event.slug }} tabIndex={-1} className="block w-full h-full">
          <OpportunityPoster event={event} className={layout === "list" ? "h-full min-h-[190px]" : "aspect-[16/9]"} />
        </Link>
      </div>

      {/* 2. Card Content & Metadata Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="space-y-3">
          {/* Metadata Strip below poster */}
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs text-muted-foreground font-medium">
            <div className="flex items-center gap-1.5 shrink-0 text-foreground/90 font-semibold">
              <CalendarDays className="size-3.5 text-primary shrink-0" />
              <span>{formatRange(event.startDate, event.endDate)}</span>
            </div>

            <div className="flex items-center gap-1 shrink-0 truncate max-w-[170px]">
              <MapPin className="size-3 text-muted-foreground shrink-0" />
              <span className="truncate">{event.location || event.venue || (event.mode === "ONLINE" ? "Online" : event.universityName)}</span>
            </div>

            <div className="flex items-center gap-1 shrink-0 ml-auto">
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-[11px] font-bold",
                  isFree
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                    : "bg-primary/10 text-primary border border-primary/20"
                )}
              >
                {priceDisplay}
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-base font-bold leading-snug tracking-tight text-foreground line-clamp-2">
              <Link
                to="/events/$slug"
                params={{ slug: event.slug }}
                className="hover:text-primary transition-colors focus-visible:underline"
              >
                {event.title}
              </Link>
            </h3>

            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {event.summary || event.description || "University opportunity hosted on CampusPulse."}
            </p>
          </div>

          {/* Category-Specific Pills (if relevant) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {event.matchExplanation && <MatchBadge explanation={event.matchExplanation} />}
            {event.programType && (
              <span className="rounded-md bg-sky-500/10 border border-sky-500/25 px-2 py-0.5 text-[11px] font-bold text-sky-700 dark:text-sky-300">
                🎓 {event.programType} {event.fundingType ? `· ${event.fundingType}` : ""}
              </span>
            )}
            {event.courseLevel && (
              <span className="rounded-md bg-teal-500/10 border border-teal-500/25 px-2 py-0.5 text-[11px] font-bold text-teal-700 dark:text-teal-300">
                📖 {event.courseLevel}
              </span>
            )}
            {event.musicGenre && (
              <span className="rounded-md bg-pink-500/10 border border-pink-500/25 px-2 py-0.5 text-[11px] font-bold text-pink-700 dark:text-pink-300">
                🎵 {event.musicGenre}
              </span>
            )}
            {event.dramaGenre && (
              <span className="rounded-md bg-violet-500/10 border border-violet-500/25 px-2 py-0.5 text-[11px] font-bold text-violet-700 dark:text-violet-300">
                🎭 {event.dramaGenre}
              </span>
            )}
            <ScopeBadge scope={event.participationScope} />
          </div>
        </div>

        {/* 3. Card Footer: Organizer & Action Buttons */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/70 pt-3.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <OrgAvatar initials={event.organizationInitials} className="size-7 text-[10px]" />
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="truncate text-xs font-semibold text-foreground">{event.organizationName}</span>
                <VerificationBadge verified={event.organizationVerified} label="" />
              </div>
              <span className="block truncate text-[11px] text-muted-foreground">{event.universityName}</span>
            </div>
          </div>

          <div className="relative z-10 flex shrink-0 items-center gap-1">
            <SaveButton event={event} />
            <Button
              variant="ghost"
              size="icon"
              className="min-h-9 min-w-9 rounded-lg hover:bg-surface"
              aria-label={`Share ${event.title}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                shareEvent(event);
              }}
            >
              <Share2 className="size-4 text-muted-foreground hover:text-foreground" />
            </Button>
            <Button asChild size="sm" className="font-semibold text-xs h-8 px-3 gap-1 shadow-xs">
              <Link to="/events/$slug" params={{ slug: event.slug }}>
                {event.registered
                  ? "View"
                  : event.opportunityType === "HIGHER_STUDIES"
                    ? "Apply"
                    : event.opportunityType === "UNIVERSITY_COURSE"
                      ? "Enroll"
                      : event.opportunityType === "MUSIC" || event.opportunityType === "DRAMA"
                        ? event.isFree
                          ? "Register"
                          : "Tickets"
                        : "Register"}
                <ChevronRight className="size-3 opacity-70" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Condensed card used inside horizontal feed rails and side panels. */
export function OpportunityMiniCard({ event }: { event: CampusEvent }) {
  return (
    <article className="card-interactive group relative flex h-full flex-col rounded-xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden transition-all duration-200 hover:shadow-md">
      <Link to="/events/$slug" params={{ slug: event.slug }} tabIndex={-1} className="block shrink-0">
        <OpportunityPoster event={event} className="aspect-[16/9]" />
      </Link>
      <div className="flex flex-1 flex-col justify-between p-3.5">
        <div>
          <div className="flex min-w-0 items-center gap-2">
            <OrgAvatar initials={event.organizationInitials} className="size-6 text-[9px]" />
            <p className="min-w-0 flex-1 truncate text-xs font-semibold text-muted-foreground">
              {event.organizationName}
            </p>
            <SaveButton event={event} className="min-h-7 min-w-7 -mr-1" />
          </div>
          <h3 className="mt-2 line-clamp-2 text-xs font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
            <Link to="/events/$slug" params={{ slug: event.slug }}>
              {event.title}
            </Link>
          </h3>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/60">
          <span>{formatDate(event.startDate)}</span>
          <DeadlineBadge deadline={event.registrationDeadline} />
        </div>
      </div>
    </article>
  );
}

/** Horizontally scrollable rail — social-app style browsing on any width. */
export function OpportunityRail({ events }: { events: CampusEvent[] }) {
  return (
    <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      {events.map((e) => (
        <li key={e.id} className="w-[280px] shrink-0 snap-start sm:w-[320px]">
          <OpportunityMiniCard event={e} />
        </li>
      ))}
    </ul>
  );
}

export function OpportunityGrid({ events }: { events: CampusEvent[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {events.map((e, index) => (
        <OpportunityCard key={e.id} event={e} />
      ))}
    </div>
  );
}

export function OpportunityList({ events }: { events: CampusEvent[] }) {
  return (
    <div className="space-y-4">
      {events.map((e) => (
        <OpportunityCard key={e.id} event={e} layout="list" />
      ))}
    </div>
  );
}
