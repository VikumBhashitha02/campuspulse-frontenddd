import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Bookmark,
  CalendarDays,
  Clock,
  Eye,
  Flag,
  MapPin,
  Share2,
  Trophy,
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building2,
  GraduationCap,
  Sparkles,
  Lock,
  HeartHandshake,
  Music,
  Theater,
  BookOpenCheck,
  BookOpen,
  Award,
  ExternalLink,
  FileCheck,
  CheckSquare,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  CategoryBadge,
  DeadlineBadge,
  ModeBadge,
  OrgAvatar,
  VerificationBadge,
  ScopeBadge,
  OpportunityTypeBadge,
} from "@/components/common/Badges";
import { CardSkeleton, ErrorState } from "@/components/common/States";
import { OpportunityCard, getEventLifecycle } from "@/components/opportunity/OpportunityCard";
import { directoryApi } from "@/lib/api/directory";
import { eventsApi } from "@/lib/api/events";
import { volunteeringApi } from "@/lib/api/volunteering";
import { EventRegistrationModal } from "@/components/events/EventRegistrationModal";
import { useAuth } from "@/lib/auth";
import { compactNumber, formatDate, formatDateTime, formatRange } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events/$slug")({
  loader: async ({ params }) => {
    const event = await eventsApi.bySlug(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Opportunity not found — CampusPulse" }, { name: "robots", content: "noindex" }],
      };
    }
    const { event } = loaderData;
    return {
      meta: [
        { title: `${event.title} — CampusPulse` },
        { name: "description", content: event.summary },
        { property: "og:title", content: `${event.title} — CampusPulse` },
        { property: "og:description", content: event.summary },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-extrabold">Opportunity not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        It may have been unpublished or the link is incorrect.
      </p>
      <Button asChild className="mt-6">
        <Link to="/explore">Browse opportunities</Link>
      </Button>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <ErrorState message={error.message} />
    </div>
  ),
  component: EventDetailPage,
});

function EventDetailPage() {
  const { user } = useAuth();
  const { event } = Route.useLoaderData();
  const [saved, setSaved] = useState(Boolean(event.bookmarked));
  const [reportOpen, setReportOpen] = useState(false);
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [volunteerRole, setVolunteerRole] = useState(event.volunteerRoles?.[0] || "");
  const [volunteerAvailability, setVolunteerAvailability] = useState(event.volunteerAvailability || "");
  const [volunteerStatement, setVolunteerStatement] = useState("");
  const [volunteerSkills, setVolunteerSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [volunteerNotes, setVolunteerNotes] = useState("");
  const [submittingVolunteer, setSubmittingVolunteer] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  useEffect(() => {
    void eventsApi.trackView(event.id);
  }, [event.id]);

  const rolesQuery = useQuery({
    queryKey: ["volunteering", "roles"],
    queryFn: () => volunteeringApi.getRoleTemplates(),
  });

  const relatedQuery = useQuery({
    queryKey: ["events", "related", event.id],
    queryFn: () => eventsApi.related(event),
  });

  const eligibilityQuery = useQuery({
    queryKey: ["events", "eligibility", event.id, user?.id],
    queryFn: () => eventsApi.checkEligibility(event.id),
  });

  const myVolunteerAppsQuery = useQuery({
    queryKey: ["volunteering", "my-applications", user?.id],
    queryFn: () => volunteeringApi.getMyApplications(),
    enabled: !!user,
  });

  const existingVolunteerApp = myVolunteerAppsQuery.data?.find(
    (app) => app.eventId === event.id || app.event?.id === event.id
  );

  const eligibility = eligibilityQuery.data;
  const queryClient = useQueryClient();

  useEffect(() => {
    setSaved(Boolean(event.bookmarked));
  }, [event.bookmarked]);

  const toggleSave = async () => {
    const next = !saved;
    setSaved(next);
    try {
      await eventsApi.toggleBookmark(event.id, next);
      toast.success(next ? "Saved to your list" : "Removed from saved");
      void queryClient.invalidateQueries({ queryKey: ["saved"] });
      void queryClient.invalidateQueries({ queryKey: ["events"] });
      void queryClient.invalidateQueries({ queryKey: ["feed"] });
    } catch {
      setSaved(!next);
      toast.error("Couldn't update your saved opportunities");
    }
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: event.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      /* dismissed */
    }
  };

  const [reportReasonCategory, setReportReasonCategory] = useState("Misleading information");
  const [reportDetails, setReportDetails] = useState("");
  const [reportEvidenceUrl, setReportEvidenceUrl] = useState("");
  const [submittingReport, setSubmittingReport] = useState(false);

  const handleReportSubmit = async () => {
    if (!reportReasonCategory) {
      toast.error("Please select a reason for reporting.");
      return;
    }
    setSubmittingReport(true);
    try {
      await directoryApi.fileReport({
        targetType: "EVENT",
        targetId: event.id,
        reason: reportReasonCategory,
        details: reportDetails.trim() || undefined,
        evidenceUrl: reportEvidenceUrl.trim() || undefined,
      });
      setReportOpen(false);
      setReportDetails("");
      setReportEvidenceUrl("");
      toast.success("Report submitted for review", {
        description: "Our moderation team will review your report and evidence.",
      });
    } catch {
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setSubmittingReport(false);
    }
  };

  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      await eventsApi.trackRegistrationClick(event.id);
      toast.success("Registration confirmed! 🎉", {
        description: "You have been registered for this opportunity.",
      });
      setSaved(true);
      void eligibilityQuery.refetch();
    } catch (err: any) {
      toast.error("Registration failed", {
        description: err?.message || "You do not meet the eligibility criteria for this opportunity.",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleVolunteerSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to apply as a volunteer.");
      return;
    }
    if (!volunteerRole.trim()) {
      toast.error("Please specify a volunteer role.");
      return;
    }
    setSubmittingVolunteer(true);
    try {
      await volunteeringApi.apply(event.id, {
        role: volunteerRole.trim(),
        availability: volunteerAvailability.trim() || undefined,
        skills: volunteerSkills.length > 0 ? volunteerSkills : undefined,
        statement: volunteerStatement.trim() || undefined,
        notes: volunteerNotes.trim() || undefined,
      });
      setVolunteerOpen(false);
      toast.success("Volunteer Application Submitted! 🎉", {
        description: `Your application for "${volunteerRole.trim()}" has been submitted to ${event.organizationName}.`,
      });
      void queryClient.invalidateQueries({ queryKey: ["volunteering", "my-applications"] });
      void queryClient.invalidateQueries({ queryKey: ["volunteering", "recommended"] });
      void myVolunteerAppsQuery.refetch();
    } catch (err: any) {
      toast.error("Application failed", {
        description: err?.message || "Could not submit volunteer application.",
      });
    } finally {
      setSubmittingVolunteer(false);
    }
  };

  const lifecycle = getEventLifecycle(event);
  const [posterError, setPosterError] = useState(false);
  const posterSrc = !posterError ? (event.posterUrl || event.coverImageUrl || event.bannerUrl) : null;

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/explore" className="hover:text-foreground hover:underline">
          Explore
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-foreground">{event.categoryName}</span>
      </nav>

      {/* Prominent Poster Hero Header */}
      <header className="mt-4 rounded-2xl border border-border/80 bg-card overflow-hidden shadow-lg">
        <div className="grid lg:grid-cols-[1fr_420px] items-stretch">
          {/* Left Column: Event Information */}
          <div className="p-6 sm:p-9 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {/* Lifecycle status badge */}
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide border",
                    lifecycle.variant === "ongoing" &&
                      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
                    lifecycle.variant === "upcoming" &&
                      "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
                    lifecycle.variant === "finished" &&
                      "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30",
                    lifecycle.variant === "cancelled" &&
                      "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30"
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

                <CategoryBadge name={event.categoryName} />
                {event.opportunityType && (
                  <OpportunityTypeBadge type={event.opportunityType} />
                )}
                <ModeBadge mode={event.mode} />
                <ScopeBadge scope={event.participationScope} />
                <DeadlineBadge deadline={event.registrationDeadline} />
              </div>

              <h1 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl text-foreground">
                {event.title}
              </h1>

              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {event.summary || event.description?.slice(0, 200)}
              </p>

              {/* Quick Info Strip */}
              <div className="grid gap-3 sm:grid-cols-2 pt-3 border-t border-border/70 text-xs">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <CalendarDays className="size-4 text-primary shrink-0" />
                  <span>{formatRange(event.startDate, event.endDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <MapPin className="size-4 text-primary shrink-0" />
                  <span className="truncate">
                    {event.location || event.venue || (event.mode === "ONLINE" ? "Online Virtual Meeting" : event.universityName)}
                  </span>
                </div>
              </div>
            </div>

            {/* Organizer Row & Save / Share Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/70">
              <Link
                to="/organizations/$slug"
                params={{ slug: event.organizationId }}
                className="flex min-w-0 items-center gap-3 hover:opacity-85 transition-opacity"
              >
                <OrgAvatar initials={event.organizationInitials} className="size-9 text-xs" />
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-bold text-foreground">{event.organizationName}</span>
                    <VerificationBadge verified={event.organizationVerified} />
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {event.universityName}
                  </span>
                </span>
              </Link>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleSave}
                  className={cn("gap-1.5 font-semibold text-xs h-9", saved && "text-primary border-primary")}
                >
                  <Bookmark className={cn("size-4", saved && "fill-primary text-primary")} />
                  {saved ? "Saved" : "Save"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={share}
                  className="gap-1.5 font-semibold text-xs h-9"
                >
                  <Share2 className="size-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Poster Image Display */}
          <div className="relative bg-muted lg:border-l border-border/80 flex items-center justify-center overflow-hidden min-h-[260px] lg:min-h-full">
            {posterSrc ? (
              <img
                src={posterSrc}
                alt={event.title}
                onError={() => setPosterError(true)}
                className="w-full h-full object-cover max-h-[440px] lg:max-h-none"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-white bg-gradient-to-br from-slate-800 via-indigo-950 to-slate-900 min-h-[260px]">
                <div className="rounded-full bg-white/15 p-4 backdrop-blur-md shadow-inner">
                  <CalendarDays className="size-10 text-white/90" />
                </div>
                <span className="mt-3 text-sm font-black tracking-wider uppercase text-white/90">
                  {event.categoryName || event.opportunityType || "CampusPulse Event"}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
        <div className="min-w-0 space-y-8">
          <Section title="About this opportunity">
            <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {event.description}
            </p>
          </Section>

          {/* Music & Entertainment Showcase Section */}
          {(event.opportunityType === "MUSIC" || (Array.isArray(event.artistNames) && event.artistNames.length > 0) || event.musicGenre) && (
            <Section title="Live Music & Performer Lineup">
              <div className="space-y-4">
                <div className="rounded-xl border border-pink-500/25 bg-pink-500/5 p-5 space-y-4">
                  <div className="flex items-center gap-2 text-pink-700 dark:text-pink-300 font-bold text-xs uppercase tracking-wider">
                    <Music className="size-4" />
                    <span>Concert & Entertainment Showcase</span>
                  </div>

                  {Array.isArray(event.artistNames) && event.artistNames.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Featured Artists & Performing Bands
                      </h4>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {event.artistNames.map((artist) => (
                          <div
                            key={artist}
                            className="flex items-center gap-2 rounded-lg border border-pink-500/30 bg-card px-3 py-1.5 text-xs font-bold text-foreground shadow-xs"
                          >
                            <span className="flex size-5 items-center justify-center rounded-full bg-pink-500/15 text-pink-600 text-[10px]">
                              🎵
                            </span>
                            <span>{artist}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {event.musicGenre && (
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs font-semibold text-muted-foreground">Music Genre / Style:</span>
                      <span className="rounded-md bg-pink-500/10 border border-pink-500/20 px-2.5 py-0.5 text-xs font-bold text-pink-700 dark:text-pink-300">
                        {event.musicGenre}
                      </span>
                    </div>
                  )}

                  {event.performanceSchedule && (
                    <div className="pt-2 border-t border-border/70 space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Performance Schedule & Set Times
                      </span>
                      <p className="whitespace-pre-line text-xs leading-relaxed text-foreground bg-surface/50 rounded-lg p-3 border border-border/60">
                        {event.performanceSchedule}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Section>
          )}

          {/* Drama & Performing Arts Production Showcase Section */}
          {(event.opportunityType === "DRAMA" || event.productionTitle || event.dramaGenre) && (
            <Section title="Drama & Theatre Production Showcase">
              <div className="space-y-4">
                <div className="rounded-xl border border-violet-500/25 bg-violet-500/5 p-5 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300 font-bold text-xs uppercase tracking-wider">
                      <Theater className="size-4" />
                      <span>{event.productionTitle || "Theatrical Production"}</span>
                    </div>
                    {event.dramaGenre && (
                      <span className="rounded-md bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 text-xs font-bold text-violet-700 dark:text-violet-300">
                        {event.dramaGenre}
                      </span>
                    )}
                  </div>

                  {event.director && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted-foreground">Directed / Produced by:</span>
                      <span className="text-xs font-bold text-foreground">{event.director}</span>
                    </div>
                  )}

                  {Array.isArray(event.castMembers) && event.castMembers.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Cast Members & Principal Performers
                      </h4>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {event.castMembers.map((member) => (
                          <span
                            key={member}
                            className="rounded-lg border border-violet-500/30 bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-xs"
                          >
                            🎭 {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {event.synopsis && (
                    <div className="pt-2 border-t border-border/70 space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Synopsis & Story Overview
                      </span>
                      <p className="whitespace-pre-line text-xs leading-relaxed text-foreground bg-surface/50 rounded-lg p-3 border border-border/60">
                        {event.synopsis}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Section>
          )}

          {/* Higher Studies (MSc, PhD, Master's) Academic Program Section */}
          {(event.opportunityType === "HIGHER_STUDIES" || event.programType || event.degreeAwarded) && (
            <Section title="Academic Program & Admissions Information">
              <div className="space-y-5">
                <div className="rounded-xl border border-sky-500/25 bg-sky-500/5 p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sky-700 dark:text-sky-300 font-bold text-xs uppercase tracking-wider">
                      <GraduationCap className="size-4" />
                      <span>{event.programType || "Postgraduate"} Opportunity</span>
                    </div>
                    {event.fundingType && (
                      <span className="rounded-md bg-sky-500/15 border border-sky-500/30 px-3 py-1 text-xs font-bold text-sky-700 dark:text-sky-300">
                        🎓 {event.fundingType}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {event.degreeAwarded && (
                      <div className="rounded-lg border border-border/70 bg-card p-3">
                        <span className="text-[11px] font-semibold uppercase text-muted-foreground">Degree Awarded</span>
                        <p className="text-xs font-bold text-foreground mt-0.5">{event.degreeAwarded}</p>
                      </div>
                    )}
                    {event.studyMode && (
                      <div className="rounded-lg border border-border/70 bg-card p-3">
                        <span className="text-[11px] font-semibold uppercase text-muted-foreground">Study Mode</span>
                        <p className="text-xs font-bold text-foreground mt-0.5">{event.studyMode}</p>
                      </div>
                    )}
                    {event.programDuration && (
                      <div className="rounded-lg border border-border/70 bg-card p-3">
                        <span className="text-[11px] font-semibold uppercase text-muted-foreground">Expected Duration</span>
                        <p className="text-xs font-bold text-foreground mt-0.5">{event.programDuration}</p>
                      </div>
                    )}
                    {event.intakePeriod && (
                      <div className="rounded-lg border border-border/70 bg-card p-3">
                        <span className="text-[11px] font-semibold uppercase text-muted-foreground">Intake Period</span>
                        <p className="text-xs font-bold text-foreground mt-0.5">{event.intakePeriod}</p>
                      </div>
                    )}
                  </div>

                  {event.tuitionFee && (
                    <div className="rounded-lg border border-border/70 bg-muted/40 p-3">
                      <span className="text-[11px] font-semibold uppercase text-muted-foreground">Tuition Fee</span>
                      <p className="text-xs font-bold text-foreground mt-0.5">{event.tuitionFee}</p>
                    </div>
                  )}

                  {event.scholarshipDetails && (
                    <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 space-y-1">
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                        <Award className="size-3.5" /> Scholarship & Stipend Package
                      </span>
                      <p className="text-xs text-foreground leading-relaxed whitespace-pre-line">{event.scholarshipDetails}</p>
                    </div>
                  )}

                  {event.entryQualifications && (
                    <div className="space-y-1.5 pt-2 border-t border-border/70">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <CheckSquare className="size-3.5 text-primary" /> Minimum Entry Qualifications
                      </h4>
                      <p className="whitespace-pre-line text-xs leading-relaxed text-foreground bg-card rounded-lg p-3 border border-border/70">
                        {event.entryQualifications}
                      </p>
                    </div>
                  )}

                  {event.applicationRequirements && (
                    <div className="space-y-1.5 pt-2 border-t border-border/70">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <FileCheck className="size-3.5 text-primary" /> Application Documents & Checklist
                      </h4>
                      <p className="whitespace-pre-line text-xs leading-relaxed text-foreground bg-card rounded-lg p-3 border border-border/70">
                        {event.applicationRequirements}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {event.officialApplicationUrl && (
                      <Button asChild size="sm" className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs gap-1.5">
                        <a href={event.officialApplicationUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-3.5" />
                          Apply on Official University Portal
                        </a>
                      </Button>
                    )}
                    {event.programUrl && (
                      <Button asChild variant="outline" size="sm" className="text-xs font-bold gap-1.5">
                        <a href={event.programUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-3.5" />
                          Official Program Page & Brochure
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Section>
          )}

          {/* University Courses & Professional Learning Section */}
          {(event.opportunityType === "UNIVERSITY_COURSE" || event.courseLevel) && (
            <Section title="University Course & Learning Curriculum">
              <div className="space-y-5">
                <div className="rounded-xl border border-teal-500/25 bg-teal-500/5 p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-teal-700 dark:text-teal-300 font-bold text-xs uppercase tracking-wider">
                      <BookOpenCheck className="size-4" />
                      <span>{event.courseLevel || "University Course"}</span>
                    </div>
                    {event.hasCertificate && (
                      <span className="rounded-md bg-teal-500/15 border border-teal-500/30 px-3 py-1 text-xs font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1">
                        <Award className="size-3.5" /> Verified Digital Certificate Included
                      </span>
                    )}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {event.courseCode && (
                      <div className="rounded-lg border border-border/70 bg-card p-3">
                        <span className="text-[11px] font-semibold uppercase text-muted-foreground">Course Code</span>
                        <p className="text-xs font-bold text-foreground mt-0.5">{event.courseCode}</p>
                      </div>
                    )}
                    {event.courseDuration && (
                      <div className="rounded-lg border border-border/70 bg-card p-3">
                        <span className="text-[11px] font-semibold uppercase text-muted-foreground">Duration & Schedule</span>
                        <p className="text-xs font-bold text-foreground mt-0.5">{event.courseDuration}</p>
                      </div>
                    )}
                    {event.workloadHoursPerWeek && (
                      <div className="rounded-lg border border-border/70 bg-card p-3">
                        <span className="text-[11px] font-semibold uppercase text-muted-foreground">Workload</span>
                        <p className="text-xs font-bold text-foreground mt-0.5">{event.workloadHoursPerWeek}</p>
                      </div>
                    )}
                    {event.instructor && (
                      <div className="rounded-lg border border-border/70 bg-card p-3">
                        <span className="text-[11px] font-semibold uppercase text-muted-foreground">Lead Instructor</span>
                        <p className="text-xs font-bold text-foreground mt-0.5">{event.instructor}</p>
                      </div>
                    )}
                  </div>

                  {event.prerequisites && (
                    <div className="space-y-1.5 pt-2 border-t border-border/70">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Prerequisites & Target Audience
                      </h4>
                      <p className="whitespace-pre-line text-xs leading-relaxed text-foreground bg-card rounded-lg p-3 border border-border/70">
                        {event.prerequisites}
                      </p>
                    </div>
                  )}

                  {event.syllabus && (
                    <div className="space-y-1.5 pt-2 border-t border-border/70">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Syllabus & Core Modules
                      </h4>
                      <p className="whitespace-pre-line text-xs leading-relaxed text-foreground bg-card rounded-lg p-3 border border-border/70">
                        {event.syllabus}
                      </p>
                    </div>
                  )}

                  {event.enrollmentUrl && (
                    <div className="pt-2">
                      <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs gap-1.5">
                        <a href={event.enrollmentUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-3.5" />
                          Enroll on Official Course Portal
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Section>
          )}

          {/* Volunteer Opportunity & Call for Crew Section (strictly optional & only shown if configured) */}
          {(event.opportunityType === "VOLUNTEERING" || (Array.isArray(event.volunteerRoles) && event.volunteerRoles.length > 0)) && (
            <Section title="Volunteer Opportunity & Open Tracks">
              <div className="space-y-6">
                {/* Banner & Call to action preview */}
                <div className="rounded-xl border border-rose-500/20 bg-gradient-to-r from-rose-500/10 via-primary/5 to-transparent p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-500">
                        <HeartHandshake className="size-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                          Recruitment Call
                        </span>
                        <h3 className="text-base font-bold text-foreground">
                          Join the {event.organizationName} Volunteer Crew
                        </h3>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-rose-600 hover:bg-rose-700 text-white font-semibold"
                      onClick={() => setVolunteerOpen(true)}
                    >
                      <HeartHandshake className="size-4 mr-1.5" />
                      Apply for a Role
                    </Button>
                  </div>
                </div>

                {/* Available Volunteer Tracks / Roles */}
                {Array.isArray(event.volunteerRoles) && event.volunteerRoles.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Available Volunteer Roles & Squads
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {event.volunteerRoles.map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            setVolunteerRole(role);
                            setVolunteerOpen(true);
                          }}
                          className={cn(
                            "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all hover:scale-[1.02]",
                            volunteerRole === role
                              ? "border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400"
                              : "border-border/80 bg-card hover:border-rose-500/50 hover:bg-rose-500/5"
                          )}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Responsibilities & Duties */}
                {Array.isArray(event.volunteerResponsibilities) && event.volunteerResponsibilities.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Core Responsibilities & Duties
                    </h4>
                    <ul className="mt-2.5 space-y-2 text-xs text-muted-foreground">
                      {event.volunteerResponsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="size-4 shrink-0 text-rose-500 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Volunteer Benefits & Perks */}
                {Array.isArray(event.volunteerBenefits) && event.volunteerBenefits.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Volunteer Benefits & Recognition
                    </h4>
                    <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                      {event.volunteerBenefits.map((benefit, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 rounded-lg border border-border/70 bg-card/60 p-2.5 text-xs font-medium"
                        >
                          <Sparkles className="size-3.5 shrink-0 text-amber-500" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Availability & Capacity Grid */}
                {(event.volunteerAvailability || event.volunteerCapacity) && (
                  <div className="grid gap-3 sm:grid-cols-2 pt-1 border-t border-border/70">
                    {event.volunteerAvailability && (
                      <div className="rounded-lg border border-border/70 bg-muted/30 p-3">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Time & Availability Requirement
                        </span>
                        <p className="mt-1 text-xs font-medium text-foreground">
                          {event.volunteerAvailability}
                        </p>
                      </div>
                    )}

                    {event.volunteerCapacity && (
                      <div className="rounded-lg border border-border/70 bg-muted/30 p-3">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Volunteer Capacity
                        </span>
                        <p className="mt-1 text-xs font-medium text-foreground">
                          Recruiting up to {event.volunteerCapacity} student volunteers
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* Eligibility & Participation Rules Section */}
          <Section title="Eligibility & Participation Rules">
            <div className="space-y-4">
              {/* Plain language summary bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/80 bg-muted/40 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Participation Rule
                    </span>
                    <p className="text-sm font-bold text-foreground">
                      {event.eligibilitySummary || eligibility?.summary || "Open to all university students"}
                    </p>
                  </div>
                </div>
                <ScopeBadge scope={event.participationScope} />
              </div>

              {/* Live personalized evaluation state */}
              {eligibility ? (
                eligibility.isEligible === true ? (
                  <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-emerald-950 dark:text-emerald-300">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div className="text-xs leading-relaxed">
                      <span className="font-bold">You are eligible to register!</span>
                      <p className="mt-0.5 text-emerald-800/80 dark:text-emerald-300/80">
                        Your university affiliation and profile meet all eligibility requirements for this opportunity.
                      </p>
                    </div>
                  </div>
                ) : eligibility.isEligible === false ? (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3.5 text-destructive">
                    <div className="flex items-start gap-2.5">
                      <XCircle className="mt-0.5 size-4 shrink-0" />
                      <div>
                        <span className="text-xs font-bold">You do not meet the criteria to register:</span>
                        <ul className="mt-1.5 list-disc space-y-1 pl-4 text-xs">
                          {eligibility.reasons.map((reason, idx) => (
                            <li key={idx}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-info/30 bg-info/10 p-3 text-xs text-info">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="size-4 shrink-0" />
                      <span>Sign in with your university account to verify your personal eligibility.</span>
                    </span>
                    <Button asChild size="sm" variant="outline" className="h-7 text-xs">
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </div>
                )
              ) : null}

              {/* Structured Criteria Breakdown Grid */}
              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                {/* Allowed Universities */}
                {(event.allowedUniversities && event.allowedUniversities.length > 0) ||
                event.participationScope === "UNIVERSITY_ONLY" ||
                event.participationScope === "SELECTED_UNIVERSITIES" ? (
                  <div className="rounded-lg border border-border/70 bg-card p-3.5">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <Building2 className="size-3.5" /> Eligible Universities
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {event.allowedUniversities && event.allowedUniversities.length > 0 ? (
                        event.allowedUniversities.map((uni) => (
                          <span
                            key={uni.id}
                            className="rounded border border-border/80 bg-secondary/60 px-2 py-0.5 text-xs font-medium"
                          >
                            {uni.name}
                          </span>
                        ))
                      ) : (
                        <span className="rounded border border-border/80 bg-secondary/60 px-2 py-0.5 text-xs font-medium">
                          {event.universityName}
                        </span>
                      )}
                    </div>
                  </div>
                ) : null}

                {/* Academic Years / Batches */}
                {event.allowedAcademicYears && event.allowedAcademicYears.length > 0 ? (
                  <div className="rounded-lg border border-border/70 bg-card p-3.5">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <GraduationCap className="size-3.5" /> Permitted Batches / Years
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {event.allowedAcademicYears.map((yr) => (
                        <span
                          key={yr}
                          className="rounded border border-border/80 bg-secondary/60 px-2 py-0.5 text-xs font-medium"
                        >
                          {yr}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Required Skills */}
                {event.requiredSkills && event.requiredSkills.length > 0 ? (
                  <div className="rounded-lg border border-border/70 bg-card p-3.5">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <Sparkles className="size-3.5" /> Required Skills
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {event.requiredSkills.map((sk) => (
                        <span
                          key={sk}
                          className="rounded border border-border/80 bg-secondary/60 px-2 py-0.5 text-xs font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Team Requirements */}
                {event.minTeamSize || event.maxTeamSize || event.teamSize ? (
                  <div className="rounded-lg border border-border/70 bg-card p-3.5">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <Users className="size-3.5" /> Team Participation Limits
                    </span>
                    <p className="mt-2 text-xs font-medium">
                      {event.minTeamSize && event.maxTeamSize
                        ? `Squads of ${event.minTeamSize} to ${event.maxTeamSize} members`
                        : event.teamSize || "Individual or Squad registration"}
                    </p>
                  </div>
                ) : null}
              </div>

              {/* Additional requirements notes */}
              {event.eligibility && event.eligibility.length > 0 && (
                <div className="pt-1">
                  <span className="text-xs font-semibold text-muted-foreground">Additional Organizer Guidelines:</span>
                  <ul className="mt-1.5 space-y-1.5 text-xs text-muted-foreground">
                    {event.eligibility.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Section>

          <Section title="Requirements">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {event.requirements.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Timeline">
            <ol className="relative space-y-5 border-l border-border pl-6">
              {event.timeline.map((step) => (
                <li key={step.label}>
                  <span
                    aria-hidden
                    className="absolute -left-[7px] mt-1.5 size-3.5 rounded-full border-2 border-background bg-primary"
                  />
                  <p className="text-sm font-semibold">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(step.date)}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Organiser">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <OrgAvatar initials={event.organizationInitials} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{event.organizationName}</p>
                  <p className="truncate text-xs text-muted-foreground">{event.universityName}</p>
                </div>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/organizations/$slug" params={{ slug: event.organizationId }}>
                  View organiser
                </Link>
              </Button>
            </div>
          </Section>
        </div>

        {/* Sticky action rail */}
        <aside className="mt-8 lg:mt-0">
          <div className="lg:sticky lg:top-24">
            <div className="rounded-xl border border-border bg-card p-5">
              <dl className="space-y-4 text-sm">
                <Detail icon={CalendarDays} label="Dates" value={formatRange(event.startDate, event.endDate)} />
                <Detail icon={Clock} label="Registration closes" value={formatDateTime(event.registrationDeadline)} />
                <Detail icon={MapPin} label="Location" value={event.location} />
                {event.prize && <Detail icon={Trophy} label="Prize pool" value={event.prize} />}
                {event.teamSize && <Detail icon={Users} label="Team size" value={event.teamSize} />}
                <Detail
                  icon={Eye}
                  label="Interest"
                  value={`${compactNumber(event.views)} views · ${compactNumber(event.registrations)} registered`}
                />
              </dl>

              <Separator className="my-5" />

              {/* Registration & Application CTAs */}
              {event.officialApplicationUrl ? (
                <div className="space-y-2">
                  <Button asChild className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold gap-2" size="lg">
                    <a href={event.officialApplicationUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="size-4" /> Apply on University Portal
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-xs"
                    size="sm"
                    disabled={Boolean(user) && eligibility?.isEligible === false}
                    onClick={() => setRegisterModalOpen(true)}
                  >
                    Register for Info Session / Updates
                  </Button>
                </div>
              ) : event.enrollmentUrl ? (
                <div className="space-y-2">
                  <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold gap-2" size="lg">
                    <a href={event.enrollmentUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="size-4" /> Enroll on Course Portal
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-xs"
                    size="sm"
                    disabled={Boolean(user) && eligibility?.isEligible === false}
                    onClick={() => setRegisterModalOpen(true)}
                  >
                    CampusPulse Registration
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full"
                  size="lg"
                  disabled={Boolean(user) && eligibility?.isEligible === false}
                  onClick={() => setRegisterModalOpen(true)}
                >
                  {user && eligibility?.isEligible === false ? (
                    <span className="flex items-center gap-2">
                      <Lock className="size-4" /> Ineligible to Register
                    </span>
                  ) : event.opportunityType === "MUSIC" || event.opportunityType === "DRAMA" ? (
                    event.isFree ? "Register for Free Ticket" : "Get Tickets"
                  ) : (
                    "Register now"
                  )}
                </Button>
              )}

              {user && eligibility?.isEligible === false && !event.officialApplicationUrl && (
                <p className="mt-2 text-center text-xs text-destructive">
                  Registration locked: You do not meet the opportunity eligibility criteria.
                </p>
              )}

              {/* Volunteer Application Button (only if event has volunteering configured) */}
              {(event.opportunityType === "VOLUNTEERING" || (Array.isArray(event.volunteerRoles) && event.volunteerRoles.length > 0) || Boolean(event.volunteerCapacity && event.volunteerCapacity > 0)) && (
                existingVolunteerApp && (existingVolunteerApp.status === "PENDING" || existingVolunteerApp.status === "ACCEPTED") ? (
                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      "mt-2 w-full",
                      existingVolunteerApp.status === "ACCEPTED"
                        ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 font-semibold"
                        : "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 font-semibold"
                    )}
                  >
                    <Link to="/account/volunteering">
                      {existingVolunteerApp.status === "ACCEPTED" ? (
                        <>
                          <CheckCircle2 className="size-4 text-emerald-500 mr-2" />
                          Volunteer Crew Member 🎫
                        </>
                      ) : (
                        <>
                          <Clock className="size-4 text-amber-500 mr-2" />
                          Volunteer Request Pending ⏳
                        </>
                      )}
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="mt-2 w-full border-dashed border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10"
                    onClick={() => {
                      if (!user) {
                        toast.error("Please sign in to apply as a volunteer.");
                        return;
                      }
                      setVolunteerOpen(true);
                    }}
                  >
                    <HeartHandshake className="size-4 text-rose-500 mr-2" />
                    Apply as Volunteer
                  </Button>
                )
              )}

              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={toggleSave} aria-pressed={saved}>
                  <Bookmark className={saved ? "size-4 fill-current" : "size-4"} />
                  {saved ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" onClick={share}>
                  <Share2 className="size-4" />
                  Share
                </Button>
              </div>

              {/* Volunteer Application Dialog */}
              <Dialog open={volunteerOpen} onOpenChange={setVolunteerOpen}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-center gap-2 text-rose-500 mb-1">
                      <HeartHandshake className="size-5" />
                      <span className="text-xs font-bold uppercase tracking-wider">Volunteer Application</span>
                    </div>
                    <DialogTitle>Apply for Volunteer Crew</DialogTitle>
                    <DialogDescription>
                      Join the event organizing crew for "{event.title}" hosted by {event.organizationName}.
                    </DialogDescription>
                  </DialogHeader>

                  {/* Eligibility Alert Banner */}
                  {user && eligibility?.isEligible === false ? (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3.5 text-destructive text-xs">
                      <div className="flex items-start gap-2.5">
                        <XCircle className="size-4 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Ineligible to apply:</span>
                          <ul className="mt-1 list-disc pl-4 space-y-0.5">
                            {eligibility.reasons.map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="space-y-4 py-1">
                    {/* Role Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="volunteer-role">Select Volunteer Role *</Label>
                      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 rounded-md border border-border/70 bg-muted/20">
                        {(
                          event.volunteerRoles && event.volunteerRoles.length > 0
                            ? event.volunteerRoles
                            : (rolesQuery.data?.map((r) => r.name) || [
                                "Registration Desk",
                                "Event Support",
                                "Technical Support",
                                "Photography",
                                "Videography",
                                "Social Media",
                                "Marketing",
                                "Crowd Management",
                                "Event Setup",
                                "Workshop Assistant",
                                "Team Leader",
                              ])
                        ).map((roleName) => (
                          <button
                            key={roleName}
                            type="button"
                            onClick={() => setVolunteerRole(roleName)}
                            className={cn(
                              "rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors",
                              volunteerRole === roleName
                                ? "border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold"
                                : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            {roleName}
                          </button>
                        ))}
                      </div>
                      <Input
                        id="volunteer-role"
                        placeholder="Or type a custom role (e.g. Stage Sound Engineer, Livestream Operator)"
                        value={volunteerRole}
                        onChange={(e) => setVolunteerRole(e.target.value)}
                        className="mt-1.5"
                      />
                    </div>

                    {/* Relevant Skills */}
                    <div className="space-y-1.5">
                      <Label htmlFor="volunteer-skills">Relevant Skills & Experience</Label>
                      <div className="flex gap-2">
                        <Input
                          id="volunteer-skills"
                          placeholder="Type a skill and press Enter (e.g. Photography, Audio, Fast Typing)"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (skillInput.trim() && !volunteerSkills.includes(skillInput.trim())) {
                                setVolunteerSkills([...volunteerSkills, skillInput.trim()]);
                                setSkillInput("");
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            if (skillInput.trim() && !volunteerSkills.includes(skillInput.trim())) {
                              setVolunteerSkills([...volunteerSkills, skillInput.trim()]);
                              setSkillInput("");
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      {volunteerSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {volunteerSkills.map((sk) => (
                            <span
                              key={sk}
                              className="inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs text-primary font-medium"
                            >
                              {sk}
                              <button
                                type="button"
                                onClick={() => setVolunteerSkills(volunteerSkills.filter((s) => s !== sk))}
                                className="text-primary hover:text-destructive"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Availability */}
                    <div className="space-y-1.5">
                      <Label htmlFor="volunteer-avail">Availability & Shifts</Label>
                      <div className="flex flex-wrap gap-1.5 mb-1.5">
                        {["Full Day on Event Dates", "Morning Shift (8AM - 1PM)", "Afternoon Shift (1PM - 6PM)", "Rehearsal + Full Event"].map(
                          (preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => setVolunteerAvailability(preset)}
                              className="rounded border border-border/80 bg-secondary/50 px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground hover:bg-secondary"
                            >
                              {preset}
                            </button>
                          )
                        )}
                      </div>
                      <Input
                        id="volunteer-avail"
                        placeholder="e.g. All day Saturday, Weekday evenings after 4 PM"
                        value={volunteerAvailability}
                        onChange={(e) => setVolunteerAvailability(e.target.value)}
                      />
                    </div>

                    {/* Statement of Motivation */}
                    <div className="space-y-1.5">
                      <Label htmlFor="volunteer-statement">Statement of Motivation</Label>
                      <Textarea
                        id="volunteer-statement"
                        placeholder="Why are you interested in this role and what past relevant experiences do you bring?..."
                        rows={3}
                        value={volunteerStatement}
                        onChange={(e) => setVolunteerStatement(e.target.value)}
                      />
                    </div>

                    {/* Equipment / Notes */}
                    <div className="space-y-1.5">
                      <Label htmlFor="volunteer-notes">Equipment or Additional Notes (Optional)</Label>
                      <Input
                        id="volunteer-notes"
                        placeholder="e.g. Will bring Canon EOS R6 with 24-70mm lens and flash unit"
                        value={volunteerNotes}
                        onChange={(e) => setVolunteerNotes(e.target.value)}
                      />
                    </div>
                  </div>

                  <DialogFooter className="mt-3">
                    <Button variant="outline" onClick={() => setVolunteerOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      disabled={submittingVolunteer || (Boolean(user) && eligibility?.isEligible === false)}
                      className="bg-rose-600 hover:bg-rose-700 text-white font-semibold"
                      onClick={handleVolunteerSubmit}
                    >
                      {submittingVolunteer ? "Submitting…" : "Submit Application"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={reportOpen} onOpenChange={setReportOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="mt-2 w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                    <Flag className="size-4" />
                    Report this listing
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Report this event</DialogTitle>
                    <DialogDescription>
                      Help maintain platform integrity. Reports create a moderation record for admin review.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3.5">
                    <div className="space-y-1.5">
                      <Label htmlFor="report-reason-select">Reason for report *</Label>
                      <select
                        id="report-reason-select"
                        value={reportReasonCategory}
                        onChange={(e) => setReportReasonCategory(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Fake event">Fake event</option>
                        <option value="Misleading information">Misleading information</option>
                        <option value="Organization is not actually associated">Organization is not actually associated</option>
                        <option value="Impersonation">Impersonation</option>
                        <option value="Wrong ticket information">Wrong ticket information</option>
                        <option value="Suspicious payment request">Suspicious payment request</option>
                        <option value="Incorrect event information">Incorrect event information</option>
                        <option value="Inappropriate content">Inappropriate content</option>
                        <option value="Spam">Spam</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="report-details">Description / Explanation</Label>
                      <Textarea
                        id="report-details"
                        placeholder="Provide details about why you are reporting this event..."
                        rows={3}
                        value={reportDetails}
                        onChange={(e) => setReportDetails(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="report-evidence">Evidence URL (Optional)</Label>
                      <Input
                        id="report-evidence"
                        type="url"
                        placeholder="e.g. Official Instagram post, society Facebook link, or club website"
                        value={reportEvidenceUrl}
                        onChange={(e) => setReportEvidenceUrl(e.target.value)}
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Optional link to substantiate your report (Instagram, Facebook, or web page).
                      </p>
                    </div>
                  </div>
                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setReportOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      disabled={submittingReport || !reportReasonCategory}
                      onClick={handleReportSubmit}
                    >
                      {submittingReport ? "Submitting…" : "Submit report"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Trust Indicators Card */}
            <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <ShieldCheck className="size-4" />
                <span>Event Trust Indicators</span>
              </div>
              <ul className="space-y-1.5 text-xs text-foreground/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                  <span>University Affiliated ({event.universityName})</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                  <span>Organized by {event.organizationName} Member</span>
                </li>
                {event.organizationVerified && (
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>Verified University Society</span>
                  </li>
                )}
                {(event.isReviewed || event.eventVerificationStatus === "VERIFIED") && (
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                    <span className="font-semibold text-primary">Admin Reviewed & Verified</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Supporting Information Card */}
            {(event.contactEmail || event.contactPhone || event.instagramUrl || event.facebookUrl || event.websiteUrl || event.supportingLecturer) && (
              <div className="mt-4 rounded-xl border border-border bg-card p-4 space-y-2 text-xs">
                <p className="font-semibold text-foreground">Supporting Contacts & Links</p>
                <div className="space-y-1 text-muted-foreground">
                  {event.contactEmail && <p>Email: <a href={`mailto:${event.contactEmail}`} className="text-primary hover:underline">{event.contactEmail}</a></p>}
                  {event.contactPhone && <p>Phone: <span>{event.contactPhone}</span></p>}
                  {event.supportingLecturer && <p>Advisor/Lecturer: <span>{event.supportingLecturer}</span></p>}
                  {event.instagramUrl && <p>Instagram: <a href={event.instagramUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">{event.instagramUrl}</a></p>}
                  {event.facebookUrl && <p>Facebook: <a href={event.facebookUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">{event.facebookUrl}</a></p>}
                  {event.websiteUrl && <p>Website: <a href={event.websiteUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">{event.websiteUrl}</a></p>}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      <section className="mt-14">
        <h2 className="text-xl font-extrabold tracking-tight">Related opportunities</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedQuery.isPending && <CardSkeleton />}
          {(relatedQuery.data ?? []).map((e) => (
            <OpportunityCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-border bg-card/95 p-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" aria-label="Save opportunity" onClick={toggleSave}>
            <Bookmark className={saved ? "size-4 fill-current" : "size-4"} />
          </Button>
          <Button
            className="flex-1"
            disabled={Boolean(user) && eligibility?.isEligible === false}
            onClick={() => setRegisterModalOpen(true)}
          >
            {user && eligibility?.isEligible === false
              ? "Ineligible to Register"
              : "Register now"}
          </Button>
        </div>
      </div>

      {/* Participation & Ticketing Modal */}
      <EventRegistrationModal
        event={event}
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        currentUser={user}
        onSuccess={() => void eligibilityQuery.refetch()}
      />
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
      <div className="min-w-0">
        <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
        <dd className="text-sm font-medium">{value}</dd>
      </div>
    </div>
  );
}
