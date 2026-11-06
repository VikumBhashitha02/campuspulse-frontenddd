import {
  BadgeCheck,
  CalendarClock,
  Globe,
  MapPin,
  Users,
  Code2,
  Trophy,
  Wrench,
  Presentation,
  FlaskConical,
  Briefcase,
  HeartHandshake,
  Award,
  GraduationCap,
  UserPlus,
  Sparkles,
  Layers,
  CheckCircle2,
  Music,
  Theater,
  BookOpenCheck,
  Film,
} from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { deadlineInfo } from "@/lib/format";
import type { EventMode, EventStatus, OpportunityMatchExplanation, OpportunityType, ParticipationScope } from "@/lib/types";

const OTHER_CONFIG = {
  label: "Opportunity",
  icon: Sparkles,
  style: "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30",
};

export const OPPORTUNITY_TYPE_CONFIG: Record<
  string,
  { label: string; icon: React.ComponentType<{ className?: string }>; style: string }
> = {
  HACKATHON: {
    label: "Hackathon",
    icon: Code2,
    style: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
  },
  COMPETITION: {
    label: "Competition",
    icon: Trophy,
    style: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  },
  WORKSHOP: {
    label: "Workshop",
    icon: Wrench,
    style: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
  },
  CONFERENCE: {
    label: "Conference",
    icon: Presentation,
    style: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
  },
  RESEARCH: {
    label: "Research",
    icon: FlaskConical,
    style: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30",
  },
  CAREER: {
    label: "Career",
    icon: Briefcase,
    style: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  },
  VOLUNTEERING: {
    label: "Volunteering",
    icon: HeartHandshake,
    style: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
  },
  SCHOLARSHIP: {
    label: "Scholarship",
    icon: Award,
    style: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/30",
  },
  TRAINING: {
    label: "Training",
    icon: GraduationCap,
    style: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
  },
  TEAM_OPPORTUNITY: {
    label: "Team Call",
    icon: UserPlus,
    style: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30",
  },
  MUSIC: {
    label: "Live Music & Concert",
    icon: Music,
    style: "bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30",
  },
  DRAMA: {
    label: "Drama & Theatre",
    icon: Theater,
    style: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30",
  },
  HIGHER_STUDIES: {
    label: "Higher Studies (MSc/PhD)",
    icon: GraduationCap,
    style: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
  },
  UNIVERSITY_COURSE: {
    label: "University Course",
    icon: BookOpenCheck,
    style: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30",
  },
  MOVIE: {
    label: "Film & Screening",
    icon: Film,
    style: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
  },
  OTHER: OTHER_CONFIG,
};

export function OpportunityTypeBadge({
  type,
  className,
}: {
  type?: OpportunityType | string | null | undefined;
  className?: string | undefined;
}) {
  if (!type) return null;
  const config = OPPORTUNITY_TYPE_CONFIG[type] ?? OTHER_CONFIG;
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-bold tracking-wide transition-colors",
        config.style,
        className,
      )}
    >
      <Icon className="size-3" />
      {config.label}
    </span>
  );
}

const SCOPE_CONFIG: Record<string, { label: string; style: string }> = {
  UNIVERSITY_ONLY: {
    label: "Host Campus Only",
    style: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30",
  },
  INTRA_UNIVERSITY: {
    label: "Host Campus Only",
    style: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30",
  },
  SELECTED_UNIVERSITIES: {
    label: "Selected Universities",
    style: "bg-blue-500/15 text-blue-800 dark:text-blue-300 border-blue-500/30",
  },
  ANY_UNIVERSITY_STUDENT: {
    label: "All Universities",
    style: "bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border-cyan-500/30",
  },
  INTER_UNIVERSITY: {
    label: "Inter-University",
    style: "bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border-cyan-500/30",
  },
  STUDENTS_AND_ALUMNI: {
    label: "Students & Alumni",
    style: "bg-teal-500/15 text-teal-800 dark:text-teal-300 border-teal-500/30",
  },
  PUBLIC: {
    label: "Open to Public",
    style: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
  },
  OPEN_PUBLIC: {
    label: "Open to Public",
    style: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
  },
  INVITATION_ONLY: {
    label: "Invitation Only",
    style: "bg-purple-500/15 text-purple-800 dark:text-purple-300 border-purple-500/30",
  },
  FACULTY_ONLY: {
    label: "Faculty Only",
    style: "bg-orange-500/15 text-orange-800 dark:text-orange-300 border-orange-500/30",
  },
  DEPARTMENT_ONLY: {
    label: "Department Only",
    style: "bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/30",
  },
};

export function ScopeBadge({
  scope,
  className,
}: {
  scope?: ParticipationScope | string | null | undefined;
  className?: string | undefined;
}) {
  if (!scope) return null;
  const config = SCOPE_CONFIG[scope] ?? {
    label: scope,
    style: "bg-secondary/80 text-secondary-foreground border-transparent",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide transition-colors",
        config.style,
        className,
      )}
      title={`Participation scope: ${config.label}`}
    >
      <Layers className="size-3 shrink-0 opacity-80" />
      {config.label}
    </span>
  );
}

export function CategoryBadge({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-accent px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-accent-foreground",
        className,
      )}
    >
      {name}
    </span>
  );
}

export function VerificationBadge({ verified, label }: { verified: boolean; label?: string }) {
  if (!verified) return null;
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium text-info"
      title="Verified organisation"
    >
      <BadgeCheck className="size-4" aria-hidden />
      <span className="sr-only sm:not-sr-only">{label ?? "Verified"}</span>
    </span>
  );
}

const deadlineToneClass: Record<string, string> = {
  closed: "bg-muted text-muted-foreground",
  urgent: "bg-destructive/10 text-destructive",
  soon: "bg-warning/15 text-[oklch(0.45_0.13_62)]",
  open: "bg-success/12 text-[oklch(0.42_0.11_155)]",
};

export function DeadlineBadge({ deadline, className }: { deadline: string; className?: string }) {
  const info = deadlineInfo(deadline);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold",
        deadlineToneClass[info.tone],
        className,
      )}
    >
      <CalendarClock className="size-3.5" aria-hidden />
      {info.label}
    </span>
  );
}

export function ModeBadge({ mode }: { mode: EventMode }) {
  const Icon = mode === "ONLINE" ? Globe : mode === "HYBRID" ? Users : MapPin;
  const label = mode === "ONLINE" ? "Online" : mode === "HYBRID" ? "Hybrid" : "In person";
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      <Icon className="size-3.5" aria-hidden />
      {label}
    </span>
  );
}

const statusStyles: Record<EventStatus, string> = {
  DRAFT: "bg-muted text-muted-foreground",
  PENDING_REVIEW: "bg-warning/15 text-[oklch(0.45_0.13_62)]",
  PUBLISHED: "bg-success/12 text-[oklch(0.42_0.11_155)]",
  REJECTED: "bg-destructive/10 text-destructive",
  CANCELLED: "bg-destructive/15 text-destructive font-semibold",
  COMPLETED: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  ONGOING: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 font-semibold",
  EXPIRED: "bg-secondary text-secondary-foreground",
};

const statusLabels: Record<EventStatus, string> = {
  DRAFT: "Draft",
  PENDING_REVIEW: "Pending review",
  PUBLISHED: "Published",
  REJECTED: "Rejected",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
  ONGOING: "Live Now",
  EXPIRED: "Expired",
};

export function StatusBadge({ status }: { status: EventStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold",
        statusStyles[status],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {statusLabels[status]}
    </span>
  );
}

export function OrgAvatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-surface text-sm font-bold text-navy-muted",
        className,
      )}
    >
      {initials}
    </span>
  );
}

export function MatchBadge({
  explanation,
  className,
}: {
  explanation?: OpportunityMatchExplanation | null | undefined;
  className?: string | undefined;
}) {
  if (!explanation) return null;

  const score = explanation.score || explanation.percentage || 0;
  const isHighMatch = score >= 80;
  const isMedMatch = score >= 60;

  const badgeStyle = isHighMatch
    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25"
    : isMedMatch
      ? "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30 hover:bg-blue-500/25"
      : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/25";

  return (
    <HoverCard openDelay={150} closeDelay={150}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-bold tracking-wide transition-all shadow-xs",
            badgeStyle,
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <Sparkles className="size-3 shrink-0" aria-hidden />
          <span>{explanation.badgeLabel || `${score}% Match`}</span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        align="start"
        className="w-72 p-3 text-xs shadow-xl border-border bg-popover text-popover-foreground z-50 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="font-bold flex items-center gap-1.5 text-foreground text-xs">
            <Sparkles className="size-3.5 text-primary" aria-hidden />
            Personalized Compatibility
          </span>
          <span className="font-extrabold text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
            {score}%
          </span>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Rule-based match calculated from your university, skills, and activity:
        </p>
        <ul className="mt-2 space-y-1.5">
          {(explanation.reasons || []).map((reason, idx) => (
            <li key={idx} className="flex items-start gap-1.5 text-foreground text-[11px] leading-tight">
              <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" aria-hidden />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
}

