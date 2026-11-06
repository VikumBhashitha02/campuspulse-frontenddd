import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  HeartHandshake,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  Sparkles,
  MapPin,
  MessageSquare,
  Undo2,
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  Building,
  Check,
  SlidersHorizontal,
  ChevronRight,
  Info,
  QrCode as QrCodeIcon,
  Copy,
  ExternalLink,
  Printer,
  Ticket,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmptyState, ErrorState, PageHeader, RowSkeleton } from "@/components/common/States";
import { OrgAvatar, OpportunityTypeBadge } from "@/components/common/Badges";
import { formatDate } from "@/lib/format";
import { volunteeringApi } from "@/lib/api/volunteering";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { QrCode } from "@/components/common/QrCode";
import type {
  VolunteerApplication,
  VolunteerStatus,
  RecommendedVolunteerOpportunity,
  VolunteerPreferencesDto,
  VolunteerTicketDto,
  VerifiedVolunteerExperience,
  VolunteerAttendanceStatus,
} from "@/lib/types";

export const Route = createFileRoute("/account/volunteering")({
  head: () => ({
    meta: [
      { title: "My Volunteering & Matching — CampusPulse" },
      { name: "description", content: "Track volunteer applications, recommended crew opportunities, crew passes, and verified service certificates." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VolunteeringPage,
});

const STATUS_CONFIG: Record<
  VolunteerStatus,
  { label: string; badgeClass: string; icon: any; description: string }
> = {
  PENDING: {
    label: "Under Review",
    badgeClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
    icon: Clock,
    description: "The organizing committee is reviewing your application.",
  },
  ACCEPTED: {
    label: "Accepted & Assigned",
    badgeClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
    icon: CheckCircle2,
    description: "Congratulations! You are officially part of the event crew.",
  },
  REJECTED: {
    label: "Not Selected",
    badgeClass: "bg-destructive/15 text-destructive border border-destructive/30",
    icon: XCircle,
    description: "Thank you for applying. The team reached maximum volunteer capacity.",
  },
  WITHDRAWN: {
    label: "Withdrawn",
    badgeClass: "bg-muted text-muted-foreground border border-border",
    icon: Undo2,
    description: "You withdrew this volunteer application.",
  },
  COMPLETED: {
    label: "Service Completed",
    badgeClass: "bg-primary/15 text-primary border border-primary/30",
    icon: Award,
    description: "Volunteer service successfully completed and verified on your student profile!",
  },
};

const ATTENDANCE_STATUS_CONFIG: Record<
  VolunteerAttendanceStatus,
  { label: string; badgeClass: string }
> = {
  NOT_CHECKED_IN: {
    label: "Ready for Check-In",
    badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30",
  },
  CHECKED_IN: {
    label: "Checked-In & On Duty",
    badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30",
  },
  CHECKED_OUT: {
    label: "Shift Completed (Checked Out)",
    badgeClass: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30",
  },
  COMPLETED: {
    label: "Verified & Completed",
    badgeClass: "bg-primary/15 text-primary border border-primary/30",
  },
};

const TABS = [
  { id: "recommended", label: "Recommended for You ✨" },
  { id: "all", label: "All Applications" },
  { id: "active", label: "Active & Pending" },
  { id: "accepted", label: "Accepted & Crew 🎫" },
  { id: "completed", label: "Completed" },
  { id: "verified", label: "Verified Experience 🎖️" },
  { id: "preferences", label: "Availability & Privacy ⚙️" },
] as const;

function VolunteeringPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("recommended");
  const [withdrawingApp, setWithdrawingApp] = useState<VolunteerApplication | null>(null);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  // Crew Pass / QR state
  const [viewingTicketAppId, setViewingTicketAppId] = useState<string | null>(null);

  // Digital Certificate state
  const [viewingCertExp, setViewingCertExp] = useState<VerifiedVolunteerExperience | null>(null);

  // Applications Query
  const appsQuery = useQuery({
    queryKey: ["volunteering", "my-applications", user?.id],
    queryFn: () => volunteeringApi.getMyApplications(),
    enabled: !!user,
  });

  // Recommended Opportunities Query
  const recsQuery = useQuery({
    queryKey: ["volunteering", "recommended", user?.id],
    queryFn: () => volunteeringApi.getRecommendedOpportunities({ limit: 12 }),
    enabled: !!user,
  });

  // Verified Volunteer History Query
  const verifiedHistoryQuery = useQuery({
    queryKey: ["volunteering", "verified-history", user?.id],
    queryFn: () => volunteeringApi.getVerifiedVolunteerHistory(),
    enabled: !!user,
  });

  // Single Ticket Query for modal
  const ticketQuery = useQuery({
    queryKey: ["volunteering", "ticket", viewingTicketAppId, user?.id],
    queryFn: () => (viewingTicketAppId ? volunteeringApi.getVolunteerTicket(viewingTicketAppId) : null),
    enabled: Boolean(viewingTicketAppId && user),
  });

  // Preferences Query
  const prefsQuery = useQuery({
    queryKey: ["volunteering", "preferences", user?.id],
    queryFn: () => volunteeringApi.getPreferences(),
    enabled: !!user,
  });

  // Preferences form state
  const [prefForm, setPrefForm] = useState<VolunteerPreferencesDto>({
    isVolunteerAvailable: true,
    volunteerAvailability: "FLEXIBLE",
    profileVisibility: "CAMPUS",
    volunteerBio: "",
  });
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);

  useEffect(() => {
    if (prefsQuery.data) {
      setPrefForm({
        isVolunteerAvailable: prefsQuery.data.isVolunteerAvailable ?? true,
        volunteerAvailability: prefsQuery.data.volunteerAvailability ?? "FLEXIBLE",
        profileVisibility: prefsQuery.data.profileVisibility ?? "CAMPUS",
        volunteerBio: prefsQuery.data.volunteerBio ?? "",
      });
    }
  }, [prefsQuery.data]);

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingPrefs(true);
    try {
      await volunteeringApi.updatePreferences(prefForm);
      toast.success("Volunteer preferences updated", {
        description: "Your discovery availability and privacy controls have been saved.",
      });
      void queryClient.invalidateQueries({ queryKey: ["volunteering", "preferences"] });
      void queryClient.invalidateQueries({ queryKey: ["volunteering", "recommended"] });
    } catch (err: any) {
      toast.error("Failed to update preferences", {
        description: err?.message || "Could not save settings.",
      });
    } finally {
      setIsSavingPrefs(false);
    }
  };

  const applications = appsQuery.data ?? [];
  const recommendedItems = recsQuery.data?.items ?? [];
  const verifiedExperiences = verifiedHistoryQuery.data ?? [];

  const filteredApps = applications.filter((app) => {
    if (tab === "active") return app.status === "PENDING";
    if (tab === "accepted") return app.status === "ACCEPTED";
    if (tab === "completed") return app.status === "COMPLETED";
    return true;
  });

  const handleWithdraw = async () => {
    if (!withdrawingApp) return;
    setIsWithdrawing(true);
    try {
      await volunteeringApi.withdraw(withdrawingApp.id);
      toast.success("Application withdrawn successfully", {
        description: "You can re-apply in the future if your availability changes.",
      });
      setWithdrawingApp(null);
      void queryClient.invalidateQueries({ queryKey: ["volunteering", "my-applications"] });
    } catch (err: any) {
      toast.error("Withdrawal failed", {
        description: err?.message || "Could not withdraw volunteer application.",
      });
    } finally {
      setIsWithdrawing(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div>
      <PageHeader
        title="My Volunteering & Crew Matching"
        description="Discover tailored volunteer calls, access digital crew passes & QR codes, manage discovery, and review verified service certificates."
      />

      <div className="mt-5 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
              tab === t.id
                ? "bg-navy text-navy-foreground shadow-sm"
                : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {/* TAB 1: RECOMMENDED FOR YOU */}
        {tab === "recommended" && (
          <div>
            {recsQuery.isPending ? (
              <RowSkeleton />
            ) : recsQuery.isError ? (
              <ErrorState onRetry={() => recsQuery.refetch()} />
            ) : recommendedItems.length === 0 ? (
              <EmptyState
                icon={<Sparkles className="size-6 text-primary" aria-hidden />}
                title="No recommended volunteer opportunities right now"
                description="We match opportunities using your skills, university, faculty, and availability. Update your volunteer profile or explore all events."
                action={
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="outline" onClick={() => setTab("preferences")}>
                      Update Volunteer Preferences
                    </Button>
                    <Button asChild>
                      <Link to="/explore">Explore All Opportunities</Link>
                    </Button>
                  </div>
                }
              />
            ) : (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Opportunities scored using explainable multi-signal matching (skills match, host university eligibility, previous volunteer history, and availability).
                  </p>
                  <Button variant="ghost" size="sm" onClick={() => setTab("preferences")} className="text-xs gap-1.5">
                    <SlidersHorizontal className="size-3.5" />
                    Tune Match Signals
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {recommendedItems.map((rec) => {
                    const event = rec.event;
                    const matchColorClass =
                      rec.matchPercentage >= 75
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                        : rec.matchPercentage >= 50
                        ? "bg-primary/15 text-primary border-primary/30"
                        : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30";

                    return (
                      <div
                        key={event.id}
                        className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:border-border/80 hover:shadow-md"
                      >
                        <div>
                          {/* Header: Match percentage & University Scope */}
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border",
                                matchColorClass
                              )}
                            >
                              <Sparkles className="size-3" />
                              {rec.matchPercentage}% Match
                            </span>

                            {rec.deadlineUrgencyDays !== null && rec.deadlineUrgencyDays !== undefined && (
                              <span
                                className={cn(
                                  "text-[11px] font-medium px-2 py-0.5 rounded border",
                                  rec.deadlineUrgencyDays <= 3
                                    ? "bg-rose-500/10 text-rose-600 border-rose-500/20 font-semibold"
                                    : "bg-muted text-muted-foreground border-border"
                                )}
                              >
                                {rec.deadlineUrgencyDays === 0
                                  ? "Deadline today!"
                                  : `Deadline in ${rec.deadlineUrgencyDays}d`}
                              </span>
                            )}
                          </div>

                          {/* Title and Organizer */}
                          <h3 className="mt-3 text-base font-bold leading-snug line-clamp-2">
                            <Link
                              to="/events/$slug"
                              params={{ slug: event.slug }}
                              className="hover:text-primary transition-colors"
                            >
                              {event.title}
                            </Link>
                          </h3>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {event.organizationName || "Campus Organization"} ·{" "}
                            {event.universityName || "Sri Lanka"}
                          </p>

                          {/* Matching Reasons */}
                          {rec.reasons && rec.reasons.length > 0 && (
                            <div className="mt-3 rounded-lg border border-primary/15 bg-primary/5 p-2.5 text-xs">
                              <span className="font-semibold text-primary block mb-1">
                                Why it matches your profile:
                              </span>
                              <ul className="space-y-1 text-muted-foreground">
                                {rec.reasons.slice(0, 3).map((r, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5 text-[11px] leading-tight">
                                    <Check className="size-3 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Role / Required Skills tags */}
                          {event.volunteerRoles && event.volunteerRoles.length > 0 && (
                            <div className="mt-3">
                              <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                                Open Roles:
                              </span>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {event.volunteerRoles.map((role) => (
                                  <span
                                    key={role}
                                    className="rounded bg-secondary/80 px-2 py-0.5 text-[11px] font-medium"
                                  >
                                    {role}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Matching Skills */}
                          {rec.matchingSkills && rec.matchingSkills.length > 0 && (
                            <div className="mt-2.5 flex flex-wrap items-center gap-1 text-[11px]">
                              <span className="text-muted-foreground">Matching skills:</span>
                              {rec.matchingSkills.map((s) => (
                                <span
                                  key={s}
                                  className="inline-flex items-center gap-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 font-medium"
                                >
                                  <Check className="size-2.5" />
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Card Footer */}
                        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-3">
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <MapPin className="size-3" />
                            {event.location || (event.mode === "ONLINE" ? "Online" : "Campus")}
                          </span>

                          <Button asChild size="sm" className="h-8 gap-1.5 text-xs">
                            <Link to="/events/$slug" params={{ slug: event.slug }}>
                              Apply as Volunteer
                              <ChevronRight className="size-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: VERIFIED VOLUNTEER EXPERIENCE */}
        {tab === "verified" && (
          <div>
            {verifiedHistoryQuery.isPending ? (
              <RowSkeleton />
            ) : verifiedHistoryQuery.isError ? (
              <ErrorState onRetry={() => verifiedHistoryQuery.refetch()} />
            ) : verifiedExperiences.length === 0 ? (
              <EmptyState
                icon={<Award className="size-6 text-amber-500" aria-hidden />}
                title="No verified volunteer experiences yet"
                description="When you complete your volunteer service and the event organizers confirm your hours, non-spoofable verified records and digital certificates will be awarded here."
                action={
                  <Button asChild>
                    <Link to="/explore">Explore Volunteer Opportunities</Link>
                  </Button>
                }
              />
            ) : (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Official volunteer records verified directly by registered university student societies and event organizers.
                  </p>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 border border-emerald-500/20">
                    <ShieldCheck className="size-3.5" />
                    {verifiedExperiences.length} Verified Experience{verifiedExperiences.length === 1 ? "" : "s"}
                  </span>
                </div>

                <div className="space-y-4">
                  {verifiedExperiences.map((exp) => {
                    const hours = exp.hours ?? 0;
                    return (
                      <div
                        key={exp.id}
                        className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:border-border/80"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                              <Award className="size-6" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-base font-bold leading-snug">
                                  {exp.eventSlug ? (
                                    <Link
                                      to="/events/$slug"
                                      params={{ slug: exp.eventSlug }}
                                      className="hover:text-primary transition-colors"
                                    >
                                      {exp.eventTitle}
                                    </Link>
                                  ) : (
                                    <span>{exp.eventTitle}</span>
                                  )}
                                </h3>
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold">
                                  <ShieldCheck className="size-3" />
                                  VERIFIED RECORD
                                </span>
                              </div>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {exp.organizationName}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary border border-primary/20">
                              <Clock className="size-3.5" />
                              {hours.toFixed(1)} Hours Verified
                            </span>
                          </div>
                        </div>

                        {/* Role and Verified Details */}
                        <div className="mt-4 grid gap-3 rounded-lg border border-border/70 bg-muted/20 p-3.5 sm:grid-cols-3 text-xs">
                          <div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Assigned Role
                            </span>
                            <p className="text-sm font-bold text-foreground mt-0.5">{exp.role}</p>
                          </div>
                          <div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Verified Status
                            </span>
                            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                              {exp.status.replace("_", " ")}
                            </p>
                          </div>
                          <div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Verified Date
                            </span>
                            <p className="text-sm font-medium text-foreground mt-0.5">
                              {exp.verifiedAt ? formatDate(exp.verifiedAt) : "Completed"}
                            </p>
                          </div>
                        </div>

                        {/* Certificate and Action Row */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3.5">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CalendarDays className="size-3.5" />
                            <span>Event Date: {formatDate(exp.date)}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {exp.certificate ? (
                              <Button
                                size="sm"
                                className="h-8 gap-1.5 text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-sm"
                                onClick={() => setViewingCertExp(exp)}
                              >
                                <Award className="size-3.5" />
                                View Digital Certificate 🏅
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 gap-1.5 text-xs font-semibold"
                                onClick={() => setViewingCertExp(exp)}
                              >
                                <Award className="size-3.5 text-primary" />
                                View Credential
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: VOLUNTEER AVAILABILITY & PRIVACY SETTINGS */}
        {tab === "preferences" && (
          <div className="max-w-2xl">
            <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Volunteer Availability & Privacy Controls</h3>
                  <p className="text-xs text-muted-foreground">
                    Control who can discover you for university event crews and configure your volunteer availability.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSavePreferences} className="mt-6 space-y-6">
                {/* 1. Open to volunteer roles toggle */}
                <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-muted/30 p-4">
                  <div>
                    <label htmlFor="avail-toggle" className="text-sm font-semibold cursor-pointer">
                      Open to Volunteer Opportunities
                    </label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      When enabled, your profile can receive matching volunteer recommendations and appear in organizers' "Find Volunteers" search based on your privacy settings.
                    </p>
                  </div>
                  <input
                    id="avail-toggle"
                    type="checkbox"
                    checked={prefForm.isVolunteerAvailable}
                    onChange={(e) => setPrefForm({ ...prefForm, isVolunteerAvailable: e.target.checked })}
                    className="size-5 rounded border-border accent-primary cursor-pointer mt-0.5"
                  />
                </div>

                {/* 2. Availability Schedule */}
                <div>
                  <label htmlFor="avail-schedule" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Your Typical Volunteer Availability
                  </label>
                  <select
                    id="avail-schedule"
                    value={prefForm.volunteerAvailability || "FLEXIBLE"}
                    onChange={(e) => setPrefForm({ ...prefForm, volunteerAvailability: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="FLEXIBLE">Flexible / Whenever Needed</option>
                    <option value="WEEKENDS">Weekends Only (Saturday & Sunday)</option>
                    <option value="WEEKDAYS">Weekdays (Monday to Friday)</option>
                    <option value="EVENINGS">Evenings & After Class</option>
                  </select>
                </div>

                {/* 3. Profile Visibility Scope */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Volunteer Discovery Visibility
                  </label>
                  <div className="space-y-2.5">
                    {[
                      {
                        val: "CAMPUS",
                        title: "Campus Only (Recommended)",
                        desc: "Visible only to verified organizers and student clubs from your own university.",
                        badge: "Standard",
                      },
                      {
                        val: "ORGANIZATIONS_ONLY",
                        title: "Inter-Campus Student Clubs & Organizers",
                        desc: "Visible to verified student organizations across all partner universities in Sri Lanka.",
                        badge: "Recommended for inter-campus hackathons",
                      },
                      {
                        val: "PUBLIC",
                        title: "Public Community",
                        desc: "Discoverable by all campus community members and student event organizers.",
                        badge: "Maximum reach",
                      },
                      {
                        val: "PRIVATE",
                        title: "Private (Hidden from Discovery)",
                        desc: "Never appear in organizer candidate search. You can still apply directly to open volunteer calls.",
                        badge: "Stealth",
                      },
                    ].map((opt) => (
                      <label
                        key={opt.val}
                        className={cn(
                          "flex items-start gap-3 rounded-lg border p-3.5 cursor-pointer transition-colors",
                          prefForm.profileVisibility === opt.val
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-muted/40"
                        )}
                      >
                        <input
                          type="radio"
                          name="profileVisibility"
                          value={opt.val}
                          checked={prefForm.profileVisibility === opt.val}
                          onChange={(e) => setPrefForm({ ...prefForm, profileVisibility: e.target.value as any })}
                          className="mt-1 size-4 accent-primary"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{opt.title}</span>
                            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                              {opt.badge}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 4. Volunteer Bio / Pitch */}
                <div>
                  <label htmlFor="vol-bio" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Volunteer Bio & Experiences (Optional)
                  </label>
                  <textarea
                    id="vol-bio"
                    rows={3}
                    placeholder="Tell student societies what roles you excel at (e.g. event photography, stage logistics, technical desk, crowd coordination)..."
                    value={prefForm.volunteerBio || ""}
                    onChange={(e) => setPrefForm({ ...prefForm, volunteerBio: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Privacy Guarantee Notice */}
                <div className="flex items-start gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3.5 text-xs text-foreground">
                  <ShieldCheck className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-700 dark:text-emerald-300">Privacy Guarantee: </span>
                    <span className="text-muted-foreground leading-relaxed">
                      Your phone number, residential address, and private email are strictly hidden from candidate searches. Only your university, faculty, verified skills, and volunteer track record are shared with approved student organizers.
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setTab("recommended")}
                  >
                    Back to Recommendations
                  </Button>
                  <Button type="submit" disabled={isSavingPrefs} className="gap-2">
                    {isSavingPrefs ? "Saving..." : "Save Volunteer Preferences"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: APPLICATIONS LIST */}
        {tab !== "recommended" && tab !== "preferences" && tab !== "verified" && (
          <div>
            {appsQuery.isPending ? (
              <RowSkeleton />
            ) : appsQuery.isError ? (
              <ErrorState onRetry={() => appsQuery.refetch()} />
            ) : filteredApps.length === 0 ? (
              <EmptyState
                icon={<HeartHandshake className="size-6 text-rose-500" aria-hidden />}
                title={applications.length === 0 ? "No volunteer applications yet" : "No applications in this tab"}
                description={
                  applications.length === 0
                    ? "Explore university hackathons, conferences, and career expos looking for passionate student volunteer leaders."
                    : "Switch to another tab to view your other volunteer applications."
                }
                action={
                  <Button asChild>
                    <Link to="/explore">Discover Volunteer Calls</Link>
                  </Button>
                }
              />
            ) : (
              <ul className="space-y-4">
                {filteredApps.map((app) => {
                  const statusCfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.PENDING;
                  const StatusIcon = statusCfg.icon;
                  const attendanceCfg = app.participation?.attendanceStatus
                    ? ATTENDANCE_STATUS_CONFIG[app.participation.attendanceStatus]
                    : null;

                  return (
                    <li
                      key={app.id}
                      className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:border-border/80"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
                            <HeartHandshake className="size-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base font-bold leading-snug">
                                {app.eventSlug ? (
                                  <Link
                                    to="/events/$slug"
                                    params={{ slug: app.eventSlug }}
                                    className="hover:underline hover:text-primary transition-colors"
                                  >
                                    {app.eventTitle || "Campus Opportunity"}
                                  </Link>
                                ) : (
                                  <span>{app.eventTitle || "Campus Opportunity"}</span>
                                )}
                              </h3>
                            </div>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {app.eventOrganizationName || "Organizing Committee"} ·{" "}
                              {app.eventUniversityName || "Sri Lanka"}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          {attendanceCfg && (
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                attendanceCfg.badgeClass
                              )}
                            >
                              {attendanceCfg.label}
                            </span>
                          )}
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
                              statusCfg.badgeClass
                            )}
                          >
                            <StatusIcon className="size-3.5" />
                            {statusCfg.label}
                          </span>
                        </div>
                      </div>

                      {/* Role Assignment and Application Highlights */}
                      <div className="mt-4 grid gap-3 rounded-lg border border-border/70 bg-muted/30 p-3.5 sm:grid-cols-2">
                        <div>
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Requested Role
                          </span>
                          <p className="text-sm font-semibold text-foreground">{app.role}</p>
                        </div>

                        {app.assignedRole ? (
                          <div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                              Official Assigned Role
                            </span>
                            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                              {app.assignedRole}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Availability
                            </span>
                            <p className="text-sm font-medium text-foreground">
                              {app.availability || "Full event commitment"}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Skills badges */}
                      {app.skills && app.skills.length > 0 && (
                        <div className="mt-3 flex flex-wrap items-center gap-1.5">
                          <span className="text-xs text-muted-foreground mr-1">Provided Skills:</span>
                          {app.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded border border-border/80 bg-secondary/70 px-2 py-0.5 text-[11px] font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Statement */}
                      {app.statement && (
                        <div className="mt-3 text-xs text-muted-foreground leading-relaxed">
                          <span className="font-semibold text-foreground">Your Statement: </span>
                          <span className="italic">"{app.statement}"</span>
                        </div>
                      )}

                      {/* Feedback / Organizer Note */}
                      {app.feedback && (
                        <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-foreground">
                          <MessageSquare className="size-4 shrink-0 text-primary mt-0.5" />
                          <div>
                            <span className="font-bold text-primary">Organizer Feedback / Instructions:</span>
                            <p className="mt-0.5 text-muted-foreground">{app.feedback}</p>
                          </div>
                        </div>
                      )}

                      {/* Footer Timestamps and Actions */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3.5 text-xs text-muted-foreground">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                          <span>Applied on {formatDate(app.appliedAt || app.createdAt)}</span>
                          {app.respondedAt && (
                            <span>Reviewed {formatDate(app.respondedAt)}</span>
                          )}
                          {app.participation?.ticketNumber && (
                            <span className="font-mono text-primary font-semibold">
                              Pass: {app.participation.ticketNumber}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {(app.status === "ACCEPTED" || app.status === "COMPLETED") && (
                            <Button
                              size="sm"
                              className="h-8 gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                              onClick={() => setViewingTicketAppId(app.id)}
                            >
                              <QrCodeIcon className="size-3.5" />
                              View Crew Pass & QR
                            </Button>
                          )}

                          {app.eventSlug && (
                            <Button asChild variant="outline" size="sm" className="h-8 text-xs">
                              <Link to="/events/$slug" params={{ slug: app.eventSlug }}>
                                View Event
                              </Link>
                            </Button>
                          )}

                          {app.status === "PENDING" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => setWithdrawingApp(app)}
                            >
                              Withdraw
                            </Button>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* MODAL 1: Volunteer Crew Pass & Secure QR Ticket */}
      <Dialog open={Boolean(viewingTicketAppId)} onOpenChange={(o) => !o && setViewingTicketAppId(null)}>
        <DialogContent className="max-w-md p-0 overflow-hidden bg-card border-border">
          {ticketQuery.isPending ? (
            <div className="p-8">
              <RowSkeleton />
            </div>
          ) : ticketQuery.isError || !ticketQuery.data ? (
            <div className="p-6">
              <ErrorState onRetry={() => ticketQuery.refetch()} />
            </div>
          ) : (
            <div>
              {/* Pass Header Banner */}
              <div className="relative bg-gradient-to-br from-navy via-slate-900 to-indigo-950 p-6 text-white text-center">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30 mb-2">
                  <Ticket className="size-3.5" />
                  OFFICIAL CREW PASS
                </div>
                <h3 className="text-lg font-black tracking-tight">
                  {ticketQuery.data.eventTitle || ticketQuery.data.event?.title || "Volunteer Opportunity"}
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  {ticketQuery.data.organizationName || ticketQuery.data.event?.organization?.name || "Official Host"}
                </p>

                {/* Role badge */}
                <div className="mt-3 inline-block rounded-md bg-white/10 px-3 py-1 backdrop-blur-sm">
                  <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">Assigned Role</span>
                  <span className="text-sm font-bold text-emerald-400">{ticketQuery.data.assignedRole}</span>
                </div>
              </div>

              {/* QR Code Body */}
              <div className="p-6 flex flex-col items-center">
                <div className="rounded-2xl border-2 border-border bg-white p-4 shadow-md dark:border-border/80">
                  <QrCode
                    value={ticketQuery.data.qrToken}
                    size={190}
                    fgColor="#0f172a"
                    bgColor="#ffffff"
                    className="rounded-lg"
                  />
                </div>

                {/* Ticket and Status */}
                <div className="mt-4 text-center">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block">
                    Pass Identifier
                  </span>
                  <p className="text-base font-mono font-black text-foreground mt-0.5 tracking-wide">
                    {ticketQuery.data.ticketNumber}
                  </p>

                  <div className="mt-2 flex justify-center">
                    {ATTENDANCE_STATUS_CONFIG[ticketQuery.data.attendanceStatus] && (
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-bold",
                          ATTENDANCE_STATUS_CONFIG[ticketQuery.data.attendanceStatus].badgeClass
                        )}
                      >
                        {ATTENDANCE_STATUS_CONFIG[ticketQuery.data.attendanceStatus].label}
                      </span>
                    )}
                  </div>
                </div>

                {/* Secure QR Token with Copy */}
                <div className="mt-4 w-full rounded-xl border border-border/80 bg-muted/40 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                        Secure QR Token (Unguessable)
                      </span>
                      <p className="truncate font-mono text-xs text-foreground mt-0.5 font-medium">
                        {ticketQuery.data.qrToken}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 shrink-0 text-xs gap-1"
                      onClick={() => copyToClipboard(ticketQuery.data!.qrToken, "Secure QR Token")}
                    >
                      <Copy className="size-3.5" />
                      Copy
                    </Button>
                  </div>
                </div>

                {/* Timestamps & Logged Hours */}
                {(ticketQuery.data.checkInTime || ticketQuery.data.checkOutTime) && (
                  <div className="mt-3 w-full grid grid-cols-2 gap-2 text-xs rounded-lg border border-border/60 bg-muted/20 p-2.5">
                    <div>
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase">Check-In</span>
                      <p className="font-medium text-foreground">
                        {ticketQuery.data.checkInTime ? formatDate(ticketQuery.data.checkInTime) : "—"}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase">Check-Out</span>
                      <p className="font-medium text-foreground">
                        {ticketQuery.data.checkOutTime ? formatDate(ticketQuery.data.checkOutTime) : "Active"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Instruction note */}
                <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-primary/5 border border-primary/15 rounded-lg p-2.5">
                  <Info className="size-4 shrink-0 text-primary mt-0.5" />
                  <p>
                    Present this secure QR code at the event organizer registration desk upon arrival. Organizers will scan it to record attendance and compute verified hours.
                  </p>
                </div>
              </div>

              <DialogFooter className="p-4 border-t border-border bg-muted/20">
                <Button variant="outline" className="w-full" onClick={() => setViewingTicketAppId(null)}>
                  Close Crew Pass
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* MODAL 2: Digital Certificate View */}
      <Dialog open={Boolean(viewingCertExp)} onOpenChange={(o) => !o && setViewingCertExp(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-card border-border">
          {viewingCertExp && (
            <div>
              {/* Top certificate bar */}
              <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 px-6 py-3 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="size-5" />
                  <span className="text-xs font-black uppercase tracking-widest">
                    CampusPulse Verified Certificate of Service
                  </span>
                </div>
                <span className="text-[11px] font-mono bg-white/20 px-2 py-0.5 rounded font-bold">
                  {viewingCertExp.certificate?.credentialId || viewingCertExp.id}
                </span>
              </div>

              {/* Certificate Inner Canvas */}
              <div className="p-8 sm:p-12 text-center bg-gradient-to-b from-amber-500/5 via-background to-amber-500/5 border-b border-border">
                <div className="mx-auto max-w-lg rounded-2xl border-4 border-double border-amber-500/40 p-6 sm:p-8 bg-card shadow-lg">
                  <div className="mx-auto grid size-16 place-items-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3 border-2 border-amber-500/30">
                    <Award className="size-8" />
                  </div>

                  <p className="text-xs uppercase tracking-widest font-black text-amber-700 dark:text-amber-400">
                    Certificate of Volunteer Excellence
                  </p>

                  <p className="mt-3 text-xs text-muted-foreground font-serif italic">
                    This official certificate is proudly conferred upon
                  </p>

                  <h3 className="mt-1 text-2xl font-black text-foreground tracking-tight underline decoration-amber-500/40 decoration-wavy underline-offset-8">
                    Volunteer Crew Member
                  </h3>

                  <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                    for dedicated campus community service, exceptional contribution, and leadership as
                  </p>

                  <div className="mt-2 inline-block rounded-full bg-primary/10 border border-primary/20 px-4 py-1 text-sm font-bold text-primary">
                    {viewingCertExp.role}
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground">
                    during <strong className="text-foreground">{viewingCertExp.eventTitle}</strong>
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Conferred by {viewingCertExp.organizationName}
                  </p>

                  {/* Highlights Banner */}
                  <div className="mt-6 grid grid-cols-2 gap-2 border-t border-b border-amber-500/20 py-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                        Verified Hours
                      </span>
                      <span className="text-base font-black text-amber-700 dark:text-amber-400">
                        {viewingCertExp.hours.toFixed(1)} Hours
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                        Issue Date
                      </span>
                      <span className="text-base font-bold text-foreground">
                        {viewingCertExp.verifiedAt ? formatDate(viewingCertExp.verifiedAt) : formatDate(viewingCertExp.date)}
                      </span>
                    </div>
                  </div>

                  {/* Cryptographic verification seal */}
                  <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <ShieldCheck className="size-4" />
                    <span>Cryptographically Authenticated on CampusPulse Student Record</span>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <DialogFooter className="p-4 flex flex-wrap items-center justify-between gap-3 bg-muted/20">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs gap-1.5"
                  onClick={() => window.print()}
                >
                  <Printer className="size-3.5" />
                  Print / Save as PDF
                </Button>

                <Button size="sm" onClick={() => setViewingCertExp(null)}>
                  Close Certificate
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Withdraw confirmation dialog */}
      <Dialog open={Boolean(withdrawingApp)} onOpenChange={(o) => !o && setWithdrawingApp(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Volunteer Application?</DialogTitle>
            <DialogDescription>
              Are you sure you want to withdraw your application for{" "}
              <strong className="text-foreground">{withdrawingApp?.eventTitle}</strong> as{" "}
              <strong className="text-foreground">{withdrawingApp?.role}</strong>?
            </DialogDescription>
          </DialogHeader>
          <p className="text-xs text-muted-foreground">
            Withdrawing will remove you from the active applicant review queue. You may re-apply later if the opportunity is still open.
          </p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setWithdrawingApp(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isWithdrawing}
              onClick={handleWithdraw}
            >
              {isWithdrawing ? "Withdrawing…" : "Confirm Withdrawal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
