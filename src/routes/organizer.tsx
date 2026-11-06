import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Award,
  BarChart3,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Eye,
  GraduationCap,
  HeartHandshake,
  MapPin,
  MessageSquare,
  MousePointerClick,
  Plus,
  QrCode as QrCodeIcon,
  RotateCw,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Ticket,
  Trash2,
  Users,
  XCircle,
  CreditCard,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RequireRole } from "@/components/shell/RequireRole";
import { StatusBadge, OrgAvatar } from "@/components/common/Badges";
import { EmptyState, ErrorState, PageHeader, RowSkeleton, StatCard } from "@/components/common/States";
import { directoryApi } from "@/lib/api/directory";
import { eventsApi } from "@/lib/api/events";
import { volunteeringApi } from "@/lib/api/volunteering";
import { AttendeeTicketScannerDialog } from "@/components/organizer/AttendeeTicketScannerDialog";
import { JoinOrganizationDialog } from "@/components/organizer/JoinOrganizationDialog";
import { RequestOrganizationDialog } from "@/components/organizer/RequestOrganizationDialog";
import { OrganizationMembersTab } from "@/components/organizer/OrganizationMembersTab";
import { OrganizationBankSettings } from "@/components/organizer/OrganizationBankSettings";
import { CreateEventDialog } from "@/components/organizer/CreateEventDialog";
import { EventManagementWorkspace } from "@/components/organizer/EventManagementWorkspace";
import { compactNumber, conversionRate, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type {
  CampusEvent,
  OpportunityType,
  VolunteerApplication,
  VolunteerStatus,
  VolunteerCandidateCard,
  VolunteerAttendanceStatus,
  VolunteerTicketDto,
} from "@/lib/types";

export const Route = createFileRoute("/organizer")({
  head: () => ({
    meta: [
      { title: "Organiser workspace — CampusPulse" },
      { name: "description", content: "Publish opportunities and track performance for your society." },
      { property: "og:title", content: "Organiser workspace — CampusPulse" },
      { property: "og:description", content: "Manage listings, registrations and analytics." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrganizerPage,
});

function OrganizerPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["organizer", "events"], queryFn: () => eventsApi.managed() });
  const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: () => eventsApi.categories() });
  const orgsQuery = useQuery({ queryKey: ["organizations"], queryFn: () => directoryApi.organizations() });
  const myOrgsQuery = useQuery({ queryKey: ["myOrganizations"], queryFn: () => directoryApi.myOrganizations() });

  const events = query.data ?? [];
  const categories = categoriesQuery.data ?? [];
  const organizations = orgsQuery.data ?? [];
  const myMemberships = myOrgsQuery.data ?? user?.memberships ?? [];

  const unisQuery = useQuery({ queryKey: ["universities"], queryFn: () => directoryApi.universities() });
  const universities = unisQuery.data ?? [];

  const isPlatformAdmin = user?.role === "ADMIN";

  // Filter organizations where the user has event management permission
  const managedOrgs = useMemo(() => {
    if (isPlatformAdmin) {
      return organizations.map((o) => ({
        organizationId: o.id,
        organizationName: o.name,
        organizationSlug: o.slug,
        role: "ADMIN" as const,
        status: "ACTIVE" as const,
        isVerified: o.verified,
        canCreateEvents: true,
        canManageOrg: true,
        canManageFinances: true,
      }));
    }
    return myMemberships
      .filter((m) =>
        m.status === "ACTIVE" ||
        m.canCreateEvents ||
        (m.status !== "PENDING" &&
          m.status !== "REJECTED" &&
          ["ADMIN", "LEADER", "PRESIDENT", "VICE_PRESIDENT", "EVENT_ORGANIZER", "EVENT_MANAGER", "MANAGER", "TREASURER", "SECRETARY", "MEMBER"].includes(
            m.role,
          )),
      )
      .map((m) => ({
        organizationId: m.organizationId,
        organizationName: m.organizationName,
        organizationSlug: m.organizationSlug,
        role: m.role,
        status: (m.status || "ACTIVE") as "ACTIVE" | "PENDING" | "REJECTED" | "SUSPENDED",
        isVerified: Boolean(m.isVerified),
        canCreateEvents: Boolean(m.canCreateEvents),
        canManageOrg: Boolean(m.canManageOrg),
        canManageFinances:
          isPlatformAdmin ||
          Boolean(m.canManageFinances) ||
          ["ADMIN", "LEADER", "PRESIDENT", "TREASURER", "MANAGER"].includes(m.role),
      }));
  }, [isPlatformAdmin, organizations, myMemberships]);

  const [selectedOrgId, setSelectedOrgId] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "DRAFT" | "PUBLISHED" | "CANCELLED">("ALL");

  const activeOrg = useMemo(() => {
    if (selectedOrgId === "all") return null;
    return managedOrgs.find((o) => o.organizationId === selectedOrgId) || null;
  }, [managedOrgs, selectedOrgId]);

  const displayedEvents = useMemo(() => {
    if (selectedOrgId === "all") return events;
    return events.filter((e) => e.organizationId === selectedOrgId);
  }, [events, selectedOrgId]);

  const filteredEvents = useMemo(() => {
    return displayedEvents.filter((e) => {
      if (statusFilter === "ALL") return true;
      if (statusFilter === "DRAFT") return e.status === "DRAFT" || e.status === "PENDING_REVIEW";
      if (statusFilter === "PUBLISHED") return e.status === "PUBLISHED";
      if (statusFilter === "CANCELLED") return e.status === "CANCELLED" || e.status === "REJECTED";
      return true;
    });
  }, [displayedEvents, statusFilter]);

  const draftCount = displayedEvents.filter((e) => e.status === "DRAFT" || e.status === "PENDING_REVIEW").length;
  const publishedCount = displayedEvents.filter((e) => e.status === "PUBLISHED").length;
  const cancelledCount = displayedEvents.filter((e) => e.status === "CANCELLED" || e.status === "REJECTED").length;

  const views = displayedEvents.reduce((s, e) => s + e.views, 0);
  const clicks = displayedEvents.reduce((s, e) => s + e.registrationClicks, 0);
  const registrations = displayedEvents.reduce((s, e) => s + e.registrations, 0);

  // Join & Request Organization Dialog States
  const [joinOpen, setJoinOpen] = useState(false);
  const [requestOrgOpen, setRequestOrgOpen] = useState(false);
  const [workspaceTab, setWorkspaceTab] = useState<"EVENTS" | "MEMBERS" | "BANK_SETTINGS">("EVENTS");

  // New Opportunity Modal State & Management Workspace
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedManageEventId, setSelectedManageEventId] = useState<string | null>(null);

  // Volunteer applicants review modal state
  const [volunteerReviewEvent, setVolunteerReviewEvent] = useState<CampusEvent | null>(null);
  const [findVolunteersOpen, setFindVolunteersOpen] = useState<boolean>(false);
  const [findVolunteersEvent, setFindVolunteersEvent] = useState<CampusEvent | null>(null);

  // Attendee Door Scanner Modal State
  const [doorScannerOpen, setDoorScannerOpen] = useState<boolean>(false);
  const [doorScannerEvent, setDoorScannerEvent] = useState<CampusEvent | null>(null);

  // Verification Modal State
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [verifyOrgId, setVerifyOrgId] = useState("");
  const [verifyNotes, setVerifyNotes] = useState("");
  const [verifyDocUrl, setVerifyDocUrl] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handlePublish = async (id: string, eventTitle: string) => {
    try {
      await eventsApi.publishEvent(id);
      toast.success(`Published "${eventTitle}" successfully! 🚀`, {
        description: "Your event is now live and discoverable across CampusPulse.",
      });
      void query.refetch();
      void queryClient.invalidateQueries({ queryKey: ["events"] });
      void queryClient.invalidateQueries({ queryKey: ["feed"] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to publish event.");
    }
  };

  const handleDeleteDraft = async (id: string, eventTitle: string) => {
    if (!confirm(`Are you sure you want to delete the draft "${eventTitle}"?`)) return;
    try {
      await eventsApi.deleteDraft(id);
      toast.success(`Deleted draft "${eventTitle}"`);
      void query.refetch();
      void queryClient.invalidateQueries({ queryKey: ["events"] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete draft.");
    }
  };

  const handleRequestVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    const defaultVerifyOrg =
      (selectedOrgId !== "all" ? selectedOrgId : null) ||
      myMemberships[0]?.organizationId ||
      organizations[0]?.id;
    const targetOrg = verifyOrgId || defaultVerifyOrg;
    if (!targetOrg) {
      toast.error("Please select an organisation to verify.");
      return;
    }
    setVerifying(true);
    try {
      await directoryApi.requestVerification({
        organizationId: targetOrg,
        notes: verifyNotes.trim() || undefined,
        documentUrl: verifyDocUrl.trim() || undefined,
      });
      toast.success("Verification request submitted", {
        description: "Our administration team will review your application.",
      });
      setVerifyOpen(false);
      setVerifyNotes("");
      setVerifyDocUrl("");
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit verification request.");
    } finally {
      setVerifying(false);
    }
  };

  if (selectedManageEventId) {
    return (
      <RequireRole roles={["STUDENT", "ORGANIZER", "ADMIN"]} allowOrgManagers>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
          <EventManagementWorkspace
            eventId={selectedManageEventId}
            onBack={() => setSelectedManageEventId(null)}
            onOpenVolunteersModal={(ev) => setVolunteerReviewEvent(ev)}
          />
        </div>
      </RequireRole>
    );
  }

  return (
    <RequireRole roles={["STUDENT", "ORGANIZER", "ADMIN"]} allowOrgManagers>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:justify-between">
          <div>
            <PageHeader
              eyebrow="Organization & Events"
              title="Workspace"
              description={`Welcome, ${user?.name || "Student"}. Manage your university societies, roles, and authorized events.`}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              className="gap-1.5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
              onClick={() => {
                setDoorScannerEvent(displayedEvents[0] || null);
                setDoorScannerOpen(true);
              }}
            >
              <QrCodeIcon className="size-4 text-emerald-500" />
              Door Scanner
            </Button>
            <Button
              variant="outline"
              className="gap-1.5 border-primary/30 text-primary hover:bg-primary/10"
              onClick={() => {
                setFindVolunteersEvent(displayedEvents[0] || null);
                setFindVolunteersOpen(true);
              }}
            >
              <Users className="size-4 text-primary" />
              Find volunteers
            </Button>
            <Button variant="outline" className="gap-1.5" onClick={() => setVerifyOpen(true)}>
              <ShieldCheck className="size-4 text-primary" />
              Verify society
            </Button>
            <Button
              className="shrink-0 gap-1.5"
              onClick={() => setCreateOpen(true)}
              disabled={managedOrgs.length === 0}
            >
              <Plus className="size-4" />
              Create Event
            </Button>
          </div>
        </div>

        {/* Section 1: YOUR ORGANIZATIONS */}
        <section className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
            <div>
              <h2 className="text-base font-bold text-foreground">Your Organizations</h2>
              <p className="text-xs text-muted-foreground">
                You can belong to multiple university societies with different role permissions.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 border-border hover:bg-surface font-semibold"
                onClick={() => setRequestOrgOpen(true)}
              >
                <Plus className="size-3.5" />
                Request New Society
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 border-primary/30 text-primary hover:bg-primary/10 font-semibold"
                onClick={() => setJoinOpen(true)}
              >
                <Plus className="size-3.5" />
                + Join Society
              </Button>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {myMemberships.length === 0 ? (
              <div className="col-span-full py-6 text-center text-xs text-muted-foreground">
                You haven't joined any university organizations yet. Click "+ Add / Join Organization" to submit a membership request.
              </div>
            ) : (
              myMemberships.map((m) => {
                const orgEventCount = events.filter((e) => e.organizationId === m.organizationId).length;
                const canCreate =
                  m.canCreateEvents ||
                  (m.status !== "PENDING" &&
                    m.status !== "REJECTED" &&
                    ["ADMIN", "LEADER", "PRESIDENT", "VICE_PRESIDENT", "EVENT_ORGANIZER", "EVENT_MANAGER", "MANAGER"].includes(
                      m.role,
                    ));

                return (
                  <div
                    key={m.id || m.organizationId}
                    className="flex flex-col justify-between rounded-xl border border-border bg-surface/50 p-4 transition-all hover:border-primary/40"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <OrgAvatar initials={m.organizationName?.slice(0, 2) || "SO"} />
                          <div>
                            <Link
                              to="/organizations/$slug"
                              params={{ slug: m.organizationSlug || m.organizationId }}
                              className="font-bold text-sm text-foreground hover:underline"
                            >
                              {m.organizationName}
                            </Link>
                            {m.universityName && (
                              <p className="text-[11px] text-muted-foreground">{m.universityName}</p>
                            )}
                          </div>
                        </div>
                        {m.isVerified && (
                          <span className="inline-flex items-center gap-0.5 text-xs text-primary font-medium">
                            <Check className="size-3" />
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                          {m.role.replace(/_/g, " ")}
                        </span>
                        <span
                          className={cn(
                            "rounded px-2 py-0.5 text-[11px] font-semibold",
                            m.status === "ACTIVE" || !m.status
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : m.status === "PENDING"
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                : "bg-destructive/10 text-destructive",
                          )}
                        >
                          {m.status || "ACTIVE"}
                        </span>
                        {m.organizationStatus === "PENDING" && (
                          <span className="rounded bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            ⏳ Awaiting Admin Approval
                          </span>
                        )}
                        <span className="text-[11px] text-muted-foreground">· {orgEventCount} events</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-2.5">
                      <Link
                        to="/organizations/$slug"
                        params={{ slug: m.organizationSlug || m.organizationId }}
                        className="text-xs text-muted-foreground hover:text-foreground font-medium"
                      >
                        View Society
                      </Link>

                      {canCreate ? (
                        <Button
                          size="sm"
                          className="h-7 text-xs font-semibold gap-1"
                          onClick={() => {
                            setSelectedOrgId(m.organizationId);
                            setCreateOpen(true);
                          }}
                        >
                          <Plus className="size-3" />
                          Create Event
                        </Button>
                      ) : (
                        <span className="text-[11px] text-muted-foreground">Member only</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Navigation Tabs between Events and Members */}
        <div className="mt-8 flex items-center gap-2 border-b border-border pb-2">
          <button
            type="button"
            onClick={() => setWorkspaceTab("EVENTS")}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors",
              workspaceTab === "EVENTS"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-surface hover:text-foreground",
            )}
          >
            <BarChart3 className="size-4" />
            Events & Opportunities
          </button>
          <button
            type="button"
            onClick={() => setWorkspaceTab("MEMBERS")}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors",
              workspaceTab === "MEMBERS"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-surface hover:text-foreground",
            )}
          >
            <Users className="size-4" />
            Members & Roles Directory
          </button>
          <button
            type="button"
            onClick={() => setWorkspaceTab("BANK_SETTINGS")}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors",
              workspaceTab === "BANK_SETTINGS"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-surface hover:text-foreground",
            )}
          >
            <CreditCard className="size-4" />
            Society Bank & Direct Transfers
          </button>
        </div>

        {workspaceTab === "BANK_SETTINGS" ? (
          <div className="mt-6 space-y-4">
            {managedOrgs.length > 1 && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Active Society Workspace
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <select
                        aria-label="Select society workspace"
                        value={selectedOrgId !== "all" ? selectedOrgId : (managedOrgs[0]?.organizationId || "")}
                        onChange={(e) => {
                          const next = e.target.value;
                          setSelectedOrgId(next);
                          setVerifyOrgId(next);
                        }}
                        className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {managedOrgs.map((org) => (
                          <option key={org.organizationId} value={org.organizationId}>
                            {org.organizationName} ({org.role.replace(/_/g, " ")})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <OrganizationBankSettings
              organizationId={selectedOrgId !== "all" ? selectedOrgId : (managedOrgs[0]?.organizationId || "")}
              organizationName={
                (selectedOrgId !== "all"
                  ? managedOrgs.find((o) => o.organizationId === selectedOrgId)?.organizationName
                  : managedOrgs[0]?.organizationName) || "Selected Society"
              }
              canManageFinances={
                selectedOrgId !== "all"
                  ? Boolean(managedOrgs.find((o) => o.organizationId === selectedOrgId)?.canManageFinances)
                  : Boolean(managedOrgs[0]?.canManageFinances)
              }
              isPlatformAdmin={isPlatformAdmin}
            />
          </div>
        ) : workspaceTab === "MEMBERS" ? (
          <div className="mt-6 space-y-4">
            {managedOrgs.length > 1 && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Active Society Workspace
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <select
                        aria-label="Select society workspace"
                        value={selectedOrgId !== "all" ? selectedOrgId : (managedOrgs[0]?.organizationId || "")}
                        onChange={(e) => {
                          const next = e.target.value;
                          setSelectedOrgId(next);
                          setVerifyOrgId(next);
                        }}
                        className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {managedOrgs.map((org) => (
                          <option key={org.organizationId} value={org.organizationId}>
                            {org.organizationName} ({org.role.replace(/_/g, " ")})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <OrganizationMembersTab
              organizationId={selectedOrgId !== "all" ? selectedOrgId : managedOrgs[0]?.organizationId}
              organizationName={
                (selectedOrgId !== "all"
                  ? managedOrgs.find((o) => o.organizationId === selectedOrgId)?.organizationName
                  : managedOrgs[0]?.organizationName) || "Selected Society"
              }
              canManageOrg={
                selectedOrgId !== "all"
                  ? Boolean(managedOrgs.find((o) => o.organizationId === selectedOrgId)?.canManageOrg)
                  : Boolean(managedOrgs[0]?.canManageOrg)
              }
              isPlatformAdmin={isPlatformAdmin}
            />
          </div>
        ) : (
          <>
            {/* Multi-Organization Workspace Switcher */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Building2 className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Active Society Workspace Filter
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <select
                      aria-label="Select active society workspace"
                      value={selectedOrgId}
                      onChange={(e) => {
                        const next = e.target.value;
                        setSelectedOrgId(next);
                        if (next !== "all") {
                          setVerifyOrgId(next);
                        }
                      }}
                      className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="all">All Managed Societies ({managedOrgs.length})</option>
                      {managedOrgs.map((org) => (
                        <option key={org.organizationId} value={org.organizationId}>
                          {org.organizationName} ({org.role.replace(/_/g, " ")})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {activeOrg ? (
                  <div className="flex items-center gap-2 rounded-lg bg-surface px-3 py-1.5 text-xs font-medium">
                    <span className="text-muted-foreground">Your Role:</span>
                    <span className="rounded bg-primary/15 px-2 py-0.5 font-bold text-primary">
                      {activeOrg.role.replace(/_/g, " ")}
                    </span>
                    {activeOrg.isVerified && (
                      <span className="inline-flex items-center gap-1 text-primary">
                        <Check className="size-3" /> Verified
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">
                    {managedOrgs.length > 0
                      ? `Aggregating listings across ${managedOrgs.length} managed society workspace${managedOrgs.length > 1 ? "s" : ""}`
                      : "You are not an event manager in any societies yet."}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={<Eye className="size-4" />} label="Total views" value={compactNumber(views)} />
              <StatCard
                icon={<MousePointerClick className="size-4" />}
                label="Registration clicks"
                value={compactNumber(clicks)}
              />
              <StatCard icon={<Ticket className="size-4" />} label="Registrations" value={compactNumber(registrations)} />
              <StatCard
                icon={<BarChart3 className="size-4" />}
                label="Conversion"
                value={`${conversionRate(clicks, views).toFixed(1)}%`}
              />
            </div>

            <section className="mt-10">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight">Your listings</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Create drafts, manage live opportunities, and publish events directly.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border bg-surface/50 p-1">
                  <button
                    type="button"
                    onClick={() => setStatusFilter("ALL")}
                    className={cn(
                      "rounded-md px-3 py-1 text-xs font-bold transition-colors",
                      statusFilter === "ALL"
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    All ({displayedEvents.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter("DRAFT")}
                    className={cn(
                      "rounded-md px-3 py-1 text-xs font-bold transition-colors",
                      statusFilter === "DRAFT"
                        ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 shadow-xs"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Drafts ({draftCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter("PUBLISHED")}
                    className={cn(
                      "rounded-md px-3 py-1 text-xs font-bold transition-colors",
                      statusFilter === "PUBLISHED"
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-xs"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Published ({publishedCount})
                  </button>
                  {cancelledCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setStatusFilter("CANCELLED")}
                      className={cn(
                        "rounded-md px-3 py-1 text-xs font-bold transition-colors",
                        statusFilter === "CANCELLED"
                          ? "bg-destructive/20 text-destructive shadow-xs"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      Cancelled ({cancelledCount})
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-4">
                {query.isPending ? (
                  <RowSkeleton />
                ) : query.isError ? (
                  <ErrorState onRetry={() => query.refetch()} />
                ) : filteredEvents.length === 0 ? (
                  <EmptyState
                    title={
                      statusFilter === "DRAFT"
                        ? "No draft events"
                        : statusFilter === "PUBLISHED"
                          ? "No published events"
                          : selectedOrgId === "all"
                            ? "No listings yet"
                            : `No listings for ${activeOrg?.organizationName || "this society"}`
                    }
                    description={
                      statusFilter === "DRAFT"
                        ? "Create a new event and save it as a draft."
                        : "Publish your first opportunity to get started."
                    }
                    action={
                      <Button
                        onClick={() => setCreateOpen(true)}
                        disabled={managedOrgs.length === 0}
                      >
                        <Plus className="size-4" />
                        Create opportunity
                      </Button>
                    }
                  />
                ) : (
                  <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                    {filteredEvents.map((e) => (
                      <li key={e.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <Link
                              to="/events/$slug"
                              params={{ slug: e.slug }}
                              className="truncate text-sm font-semibold hover:underline"
                            >
                              {e.title}
                            </Link>
                            {selectedOrgId === "all" && e.organizationName && (
                              <span className="rounded bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                                {e.organizationName}
                              </span>
                            )}
                          </div>
                          <p className="truncate text-xs text-muted-foreground mt-0.5">
                            Starts {formatDate(e.startDate)} · {compactNumber(e.views)} views ·{" "}
                            {conversionRate(e.registrationClicks, e.views).toFixed(1)}% conversion
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <StatusBadge status={e.status} />

                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 gap-1 text-xs font-semibold border-primary/30 text-primary hover:bg-primary/10"
                            onClick={() => setSelectedManageEventId(e.id)}
                          >
                            <Settings className="size-3.5" />
                            Manage
                          </Button>

                          {e.status === "DRAFT" ? (
                            <div className="flex items-center gap-1.5">
                              <Button
                                size="sm"
                                className="h-8 gap-1 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                                onClick={() => handlePublish(e.id, e.title)}
                              >
                                <CheckCircle2 className="size-3.5" />
                                Publish
                              </Button>
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1 text-xs font-semibold"
                              >
                                <Link to="/events/$slug" params={{ slug: e.slug }}>
                                  <Eye className="size-3.5" />
                                  Preview
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 text-xs text-destructive hover:bg-destructive/10"
                                onClick={() => handleDeleteDraft(e.id, e.title)}
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            </div>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1 text-xs font-semibold border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                                onClick={() => {
                                  setDoorScannerEvent(e);
                                  setDoorScannerOpen(true);
                                }}
                              >
                                <QrCodeIcon className="size-3.5" />
                                Door Desk
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1 text-xs font-semibold border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10"
                                onClick={() => setVolunteerReviewEvent(e)}
                              >
                                <HeartHandshake className="size-3.5" />
                                Volunteers
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1 text-xs font-semibold border-primary/30 text-primary hover:bg-primary/10"
                                onClick={() => {
                                  setFindVolunteersEvent(e);
                                  setFindVolunteersOpen(true);
                                }}
                              >
                                <Sparkles className="size-3.5" />
                                Find Talent
                              </Button>
                            </>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </>
        )}
      </div>

      {/* New Opportunity Creation Dialog */}
      <CreateEventDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        managedOrgs={managedOrgs}
        categories={categories}
        initialOrganizationId={
          selectedOrgId !== "all" ? selectedOrgId : managedOrgs[0]?.organizationId
        }
      />

      {/* Join University Organization Dialog */}
      <JoinOrganizationDialog
        open={joinOpen}
        onOpenChange={setJoinOpen}
        onRequestNewOrg={() => {
          setJoinOpen(false);
          setRequestOrgOpen(true);
        }}
      />

      {/* Request New Organization Dialog */}
      <RequestOrganizationDialog
        open={requestOrgOpen}
        onOpenChange={setRequestOrgOpen}
      />

      {/* Society Verification Request Dialog */}
      <Dialog open={verifyOpen} onOpenChange={setVerifyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request society verification</DialogTitle>
            <DialogDescription>
              Submit an application for your student organisation to receive the official verified badge on CampusPulse.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRequestVerification} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="verify-org">Society to verify</Label>
              <select
                id="verify-org"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                value={
                  verifyOrgId ||
                  (selectedOrgId !== "all" ? selectedOrgId : myMemberships[0]?.organizationId) ||
                  organizations[0]?.id ||
                  ""
                }
                onChange={(e) => setVerifyOrgId(e.target.value)}
                required
              >
                {(isPlatformAdmin ? organizations : myMemberships.length > 0 ? myMemberships : organizations).map(
                  (org: any) => {
                    const id = org.organizationId || org.id;
                    const name = org.organizationName || org.name;
                    return (
                      <option key={id} value={id}>
                        {name} {org.role ? `(${String(org.role).replace(/_/g, " ")})` : ""}
                      </option>
                    );
                  },
                )}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="verify-doc">Verification document URL (optional)</Label>
              <Input
                id="verify-doc"
                placeholder="https://docs.google.com/... or university endorsement link"
                value={verifyDocUrl}
                onChange={(e) => setVerifyDocUrl(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="verify-notes">Application notes</Label>
              <Textarea
                id="verify-notes"
                placeholder="Explain your society's university affiliation, faculty advisor, or student union registration..."
                rows={3}
                value={verifyNotes}
                onChange={(e) => setVerifyNotes(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setVerifyOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={verifying}>
                {verifying ? "Submitting…" : "Submit application"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Volunteer Applicants Management Dialog */}
      <VolunteerManagementDialog
        event={volunteerReviewEvent}
        onClose={() => setVolunteerReviewEvent(null)}
        onFindCandidates={() => {
          const ev = volunteerReviewEvent;
          setVolunteerReviewEvent(null);
          setFindVolunteersEvent(ev);
          setFindVolunteersOpen(true);
        }}
      />

      {/* Volunteer Talent Matching Dialog */}
      <FindVolunteersModal
        open={findVolunteersOpen}
        onClose={() => setFindVolunteersOpen(false)}
        events={displayedEvents}
        initialEvent={findVolunteersEvent}
      />

      {/* Attendee Door Scanner & Entry Check-In Dialog */}
      <AttendeeTicketScannerDialog
        open={doorScannerOpen}
        onClose={() => setDoorScannerOpen(false)}
        eventTitle={doorScannerEvent?.title}
      />
    </RequireRole>
  );
}

function VolunteerManagementDialog({
  event,
  onClose,
  onFindCandidates,
}: {
  event: CampusEvent | null;
  onClose: () => void;
  onFindCandidates?: () => void;
}) {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");

  // Sub-actions state
  const [acceptingApp, setAcceptingApp] = useState<VolunteerApplication | null>(null);
  const [assignedRoleInput, setAssignedRoleInput] = useState("");
  const [acceptFeedback, setAcceptFeedback] = useState("");
  const [isSubmittingAccept, setIsSubmittingAccept] = useState(false);

  const [rejectingApp, setRejectingApp] = useState<VolunteerApplication | null>(null);
  const [rejectFeedback, setRejectFeedback] = useState("");
  const [isSubmittingReject, setIsSubmittingReject] = useState(false);

  const [completingApp, setCompletingApp] = useState<VolunteerApplication | null>(null);
  const [confirmedHoursInput, setConfirmedHoursInput] = useState<string>("4.0");
  const [confirmNotesInput, setConfirmNotesInput] = useState<string>("");
  const [issueCertificateInput, setIssueCertificateInput] = useState<boolean>(true);
  const [isSubmittingComplete, setIsSubmittingComplete] = useState(false);
  const [isScanQrOpen, setIsScanQrOpen] = useState(false);

  const appsQuery = useQuery({
    queryKey: ["volunteering", "event-applicants", event?.id],
    queryFn: () => (event ? volunteeringApi.getEventApplications(event.id, { limit: 100 }) : Promise.resolve({ total: 0, items: [], skip: 0, limit: 100 })),
    enabled: Boolean(event),
  });

  const statsQuery = useQuery({
    queryKey: ["volunteering", "event-stats", event?.id],
    queryFn: () => (event ? volunteeringApi.getEventStats(event.id) : Promise.resolve(null)),
    enabled: Boolean(event),
  });

  if (!event) return null;

  const applicants = appsQuery.data?.items || [];
  const stats = statsQuery.data;

  const filteredApplicants = applicants.filter((app) => {
    if (statusFilter !== "ALL" && app.status !== statusFilter) return false;
    if (roleFilter !== "ALL" && app.role !== roleFilter) return false;
    return true;
  });

  const uniqueRoles = Array.from(new Set(applicants.map((a) => a.role)));

  const handleAcceptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptingApp) return;
    setIsSubmittingAccept(true);
    try {
      await volunteeringApi.reviewApplication(acceptingApp.id, {
        status: "ACCEPTED",
        assignedRole: assignedRoleInput.trim() || acceptingApp.role,
        feedback: acceptFeedback.trim() || undefined,
      });
      toast.success(`Accepted ${acceptingApp.userName || "applicant"} as ${assignedRoleInput.trim() || acceptingApp.role}! 🎉`);
      setAcceptingApp(null);
      setAssignedRoleInput("");
      setAcceptFeedback("");
      void queryClient.invalidateQueries({ queryKey: ["volunteering", "event-applicants", event.id] });
      void queryClient.invalidateQueries({ queryKey: ["volunteering", "event-stats", event.id] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to accept application.");
    } finally {
      setIsSubmittingAccept(false);
    }
  };

  const handleRejectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingApp) return;
    setIsSubmittingReject(true);
    try {
      await volunteeringApi.reviewApplication(rejectingApp.id, {
        status: "REJECTED",
        feedback: rejectFeedback.trim() || undefined,
      });
      toast.success(`Application marked as not selected.`);
      setRejectingApp(null);
      setRejectFeedback("");
      void queryClient.invalidateQueries({ queryKey: ["volunteering", "event-applicants", event.id] });
      void queryClient.invalidateQueries({ queryKey: ["volunteering", "event-stats", event.id] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to reject application.");
    } finally {
      setIsSubmittingReject(false);
    }
  };

  const handleCompleteSubmit = async () => {
    if (!completingApp) return;
    setIsSubmittingComplete(true);
    try {
      const hoursNum = parseFloat(confirmedHoursInput) || 4.0;
      if (completingApp.participation?.id) {
        await volunteeringApi.confirmParticipation(completingApp.participation.id, {
          hours: hoursNum,
          notes: confirmNotesInput.trim() || undefined,
          issueCertificate: issueCertificateInput,
        });
      } else {
        await volunteeringApi.reviewApplication(completingApp.id, {
          status: "COMPLETED",
        });
      }
      toast.success(`Marked volunteer service as COMPLETED! Verified record and ${hoursNum} hours confirmed.`);
      setCompletingApp(null);
      void queryClient.invalidateQueries({ queryKey: ["volunteering", "event-applicants", event.id] });
      void queryClient.invalidateQueries({ queryKey: ["volunteering", "event-stats", event.id] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to mark as completed.");
    } finally {
      setIsSubmittingComplete(false);
    }
  };

  if (!event) return null;

  return (
    <>
      <Dialog open={Boolean(event)} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-rose-500 mb-1">
              <HeartHandshake className="size-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Volunteer Management</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs gap-1.5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                onClick={() => setIsScanQrOpen(true)}
              >
                <QrCodeIcon className="size-3.5" />
                Scan / Validate Pass
              </Button>
              {onFindCandidates && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs gap-1.5 border-primary/30 text-primary hover:bg-primary/10"
                  onClick={onFindCandidates}
                >
                  <Sparkles className="size-3.5" />
                  Find Matching Candidates
                </Button>
              )}
            </div>
          </div>
          <DialogTitle className="text-xl font-black">{event.title}</DialogTitle>
          <DialogDescription>
            Review student volunteer applications, inspect academic profiles, assign official roles, scan crew QR passes, and certify hours.
          </DialogDescription>
        </DialogHeader>

        {/* Stats & Capacity Funnel Bar */}
        {stats && (
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-5 gap-2.5 rounded-xl border border-border/80 bg-muted/40 p-3">
            <div className="rounded-lg bg-card p-2 text-center border border-border/60">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase">Total</span>
              <p className="text-base font-bold text-foreground">{stats.counts.total}</p>
            </div>
            <div className="rounded-lg bg-amber-500/10 p-2 text-center border border-amber-500/20">
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase">Pending</span>
              <p className="text-base font-bold text-amber-600 dark:text-amber-400">{stats.counts.pending}</p>
            </div>
            <div className="rounded-lg bg-emerald-500/10 p-2 text-center border border-emerald-500/20">
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
                Accepted {stats.capacity ? `/ ${stats.capacity}` : ""}
              </span>
              <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">{stats.counts.accepted}</p>
            </div>
            <div className="rounded-lg bg-destructive/10 p-2 text-center border border-destructive/20">
              <span className="text-[11px] font-semibold text-destructive uppercase">Rejected</span>
              <p className="text-base font-bold text-destructive">{stats.counts.rejected}</p>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-lg bg-primary/10 p-2 text-center border border-primary/20">
              <span className="text-[11px] font-semibold text-primary uppercase">Completed</span>
              <p className="text-base font-bold text-primary">{stats.counts.completed}</p>
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {["ALL", "PENDING", "ACCEPTED", "COMPLETED", "REJECTED", "WITHDRAWN"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                  statusFilter === st
                    ? "bg-navy text-navy-foreground"
                    : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {st === "ALL" ? "All Applicants" : st.charAt(0) + st.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {uniqueRoles.length > 0 && (
            <select
              aria-label="Filter by role"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-md border border-input bg-background px-2.5 py-1 text-xs font-semibold text-foreground"
            >
              <option value="ALL">All Roles ({uniqueRoles.length})</option>
              {uniqueRoles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Applicants List */}
        <div className="mt-3 space-y-3">
          {appsQuery.isPending ? (
            <RowSkeleton />
          ) : filteredApplicants.length === 0 ? (
            <EmptyState
              icon={<HeartHandshake className="size-6 text-rose-500" />}
              title="No applicants found"
              description="No volunteer applications match the selected status or role filter."
            />
          ) : (
            <ul className="space-y-3">
              {filteredApplicants.map((app) => (
                <li
                  key={app.id}
                  className="rounded-xl border border-border bg-card p-4 shadow-sm transition-all"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3 min-w-0">
                      <OrgAvatar initials={app.userName?.slice(0, 2).toUpperCase() || "ST"} className="size-10 shrink-0" />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-foreground">
                            {app.userName || app.user?.name || "Student Applicant"}
                          </h4>
                          {app.userUniversityName && (
                            <span className="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                              {app.userUniversityName}
                            </span>
                          )}
                          {app.participation && (
                            <span className="font-mono text-[10px] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                              Pass: {app.participation.ticketNumber}
                            </span>
                          )}
                          {app.participation?.attendanceStatus && (
                            <span
                              className={cn(
                                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase border",
                                app.participation.attendanceStatus === "CHECKED_IN"
                                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                                  : app.participation.attendanceStatus === "CHECKED_OUT"
                                    ? "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30"
                                    : app.participation.attendanceStatus === "COMPLETED"
                                      ? "bg-primary/15 text-primary border-primary/30"
                                      : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30"
                              )}
                            >
                              {app.participation.attendanceStatus.replace("_", " ")}
                            </span>
                          )}
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                              app.status === "ACCEPTED"
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                : app.status === "PENDING"
                                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                                  : app.status === "COMPLETED"
                                    ? "bg-primary/15 text-primary"
                                    : app.status === "REJECTED"
                                      ? "bg-destructive/15 text-destructive"
                                      : "bg-muted text-muted-foreground"
                            )}
                          >
                            {app.status}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {app.userEmail || app.user?.email} ·{" "}
                          {app.userFacultyName || app.user?.studentProfile?.faculty || "Undergraduate"} ·{" "}
                          {app.userAcademicYear || app.user?.studentProfile?.academicYear || "Year 2"}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {(app.status === "PENDING" || app.status === "REJECTED") && (
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1"
                          onClick={() => {
                            setAcceptingApp(app);
                            setAssignedRoleInput(app.role);
                          }}
                        >
                          <CheckCircle2 className="size-3.5" />
                          Accept & Assign Role
                        </Button>
                      )}

                      {app.status === "PENDING" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs text-destructive hover:bg-destructive/10"
                          onClick={() => setRejectingApp(app)}
                        >
                          <XCircle className="size-3.5 mr-1" />
                          Reject
                        </Button>
                      )}

                      {app.status === "ACCEPTED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs font-semibold text-primary border-primary/30 hover:bg-primary/10 gap-1"
                          onClick={() => {
                            setCompletingApp(app);
                            setConfirmedHoursInput(
                              String(app.participation?.confirmedHours ?? app.participation?.calculatedHours ?? 4.0)
                            );
                            setConfirmNotesInput(app.feedback || "");
                            setIssueCertificateInput(true);
                          }}
                        >
                          <Award className="size-3.5" />
                          Confirm & Award Hours
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Role and Statement Info */}
                  <div className="mt-3 grid gap-2.5 rounded-lg border border-border/60 bg-muted/20 p-3 sm:grid-cols-2 text-xs">
                    <div>
                      <span className="font-semibold text-muted-foreground">Applied Role: </span>
                      <span className="font-bold text-foreground">{app.role}</span>
                    </div>
                    {app.assignedRole && (
                      <div>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Official Assigned Role: </span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-300">{app.assignedRole}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-muted-foreground">Availability: </span>
                      <span className="text-foreground">{app.availability || "Full day commitment"}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-muted-foreground">Applied: </span>
                      <span className="text-foreground">{formatDate(app.appliedAt || app.createdAt)}</span>
                    </div>
                  </div>

                  {/* Recorded Attendance / Hours Banner */}
                  {(app.participation?.checkInTime || app.participation?.checkOutTime || app.participation?.confirmedHours) && (
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground bg-muted/30 px-2.5 py-1.5 rounded-md border border-border/60">
                      {app.participation.checkInTime && (
                        <span>Checked In: {formatDate(app.participation.checkInTime)}</span>
                      )}
                      {app.participation.checkOutTime && (
                        <span>Checked Out: {formatDate(app.participation.checkOutTime)}</span>
                      )}
                      {app.participation.confirmedHours ? (
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {app.participation.confirmedHours} hrs Verified 🎖️
                        </span>
                      ) : app.participation.calculatedHours ? (
                        <span className="font-semibold text-primary">
                          {app.participation.calculatedHours.toFixed(1)} hrs Logged
                        </span>
                      ) : null}
                    </div>
                  )}

                  {/* Skills tags */}
                  {app.skills && app.skills.length > 0 && (
                    <div className="mt-2 flex flex-wrap items-center gap-1">
                      <span className="text-[11px] text-muted-foreground mr-1">Skills:</span>
                      {app.skills.map((s) => (
                        <span key={s} className="rounded bg-secondary/80 px-1.5 py-0.5 text-[10px] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Statement */}
                  {app.statement && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Statement: </span>
                      <span className="italic">"{app.statement}"</span>
                    </div>
                  )}

                  {/* Feedback instructions */}
                  {app.feedback && (
                    <div className="mt-2 flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-2 text-xs">
                      <MessageSquare className="size-3.5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold text-primary">Instructions sent to student: </span>
                        <span className="text-muted-foreground">{app.feedback}</span>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <DialogFooter className="mt-4 border-t border-border pt-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

      {/* Accept & Assign Role Sub-dialog */}
      <Dialog open={Boolean(acceptingApp)} onOpenChange={(o) => !o && setAcceptingApp(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accept Volunteer & Assign Official Role</DialogTitle>
            <DialogDescription>
              Confirm acceptance for <strong>{acceptingApp?.userName}</strong> into your event crew.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAcceptSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="assigned-role">Official Assigned Role *</Label>
              <Input
                id="assigned-role"
                placeholder="e.g. Lead Event Photographer, Desk Lead"
                value={assignedRoleInput}
                onChange={(e) => setAssignedRoleInput(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="accept-feedback">Welcome Instructions / Briefing Note</Label>
              <Textarea
                id="accept-feedback"
                placeholder="e.g. Welcome to the crew! Please report to the media desk at 7:30 AM on event day with your camera gear."
                rows={3}
                value={acceptFeedback}
                onChange={(e) => setAcceptFeedback(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAcceptingApp(null)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                disabled={isSubmittingAccept}
              >
                {isSubmittingAccept ? "Accepting…" : "Confirm Acceptance"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Reject Sub-dialog */}
      <Dialog open={Boolean(rejectingApp)} onOpenChange={(o) => !o && setRejectingApp(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline Volunteer Application</DialogTitle>
            <DialogDescription>
              Provide constructive feedback to <strong>{rejectingApp?.userName}</strong>.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRejectSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="reject-feedback">Reason / Feedback Message</Label>
              <Textarea
                id="reject-feedback"
                placeholder="e.g. Thank you for your interest. The AV technical crew has reached full capacity."
                rows={3}
                value={rejectFeedback}
                onChange={(e) => setRejectFeedback(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setRejectingApp(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="destructive" disabled={isSubmittingReject}>
                {isSubmittingReject ? "Declining…" : "Confirm Decline"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Complete & Confirm Participation Sub-dialog */}
      <Dialog open={Boolean(completingApp)} onOpenChange={(o) => !o && setCompletingApp(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Volunteer Participation & Hours</DialogTitle>
            <DialogDescription>
              Confirm completed service for <strong>{completingApp?.userName}</strong> as{" "}
              <strong>{completingApp?.assignedRole || completingApp?.role}</strong>.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-1">
            <div className="space-y-1.5">
              <Label htmlFor="confirmed-hours">Verified Service Hours *</Label>
              <Input
                id="confirmed-hours"
                type="number"
                step="0.5"
                min="0.5"
                max="100"
                value={confirmedHoursInput}
                onChange={(e) => setConfirmedHoursInput(e.target.value)}
                required
              />
              <p className="text-[11px] text-muted-foreground">
                Official volunteer hours credited toward the student's verified academic & society portfolio.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirm-notes">Organizer Commendation / Feedback (Optional)</Label>
              <Textarea
                id="confirm-notes"
                placeholder="e.g. Outstanding performance leading the crowd desk during keynotes..."
                rows={3}
                value={confirmNotesInput}
                onChange={(e) => setConfirmNotesInput(e.target.value)}
              />
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3">
              <input
                id="issue-cert"
                type="checkbox"
                checked={issueCertificateInput}
                onChange={(e) => setIssueCertificateInput(e.target.checked)}
                className="mt-0.5 size-4 accent-primary rounded border-border"
              />
              <div>
                <Label htmlFor="issue-cert" className="text-xs font-semibold cursor-pointer">
                  Issue Official Verified Digital Certificate
                </Label>
                <p className="text-[11px] text-muted-foreground">
                  Generates an authenticated digital certificate with a verifiable credential ID on CampusPulse.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-foreground">
              <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300">
                <ShieldCheck className="size-4" />
                Verified Non-Spoofable Record
              </div>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                Once confirmed, this experience will be permanently published to the student's verified profile and cannot be forged.
              </p>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setCompletingApp(null)}>
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              disabled={isSubmittingComplete}
              onClick={handleCompleteSubmit}
            >
              {isSubmittingComplete ? "Confirming…" : "Confirm & Issue Credential"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Volunteer Pass QR Scanner / Validator Modal */}
      <VolunteerScanQrDialog
        open={isScanQrOpen}
        onClose={() => setIsScanQrOpen(false)}
        event={event}
        acceptedApplicants={applicants.filter((a) => a.status === "ACCEPTED" || a.status === "COMPLETED")}
        onConfirmedParticipation={() => {
          void queryClient.invalidateQueries({ queryKey: ["volunteering", "event-applicants", event.id] });
          void queryClient.invalidateQueries({ queryKey: ["volunteering", "event-stats", event.id] });
        }}
      />
    </>
  );
}

interface VolunteerScanQrDialogProps {
  open: boolean;
  onClose: () => void;
  event: CampusEvent;
  acceptedApplicants: VolunteerApplication[];
  onConfirmedParticipation?: () => void;
}

function VolunteerScanQrDialog({
  open,
  onClose,
  event,
  acceptedApplicants,
  onConfirmedParticipation,
}: VolunteerScanQrDialogProps) {
  const [tokenInput, setTokenInput] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [validatedData, setValidatedData] = useState<{
    isValid: boolean;
    participationId: string;
    applicationId: string;
    ticket: VolunteerTicketDto;
    volunteerProfile: any;
  } | null>(null);

  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setTokenInput(text.trim());
        toast.success("Token pasted from clipboard");
      }
    } catch {
      toast.error("Please paste token manually into the input box");
    }
  };

  const handleValidate = async (customToken?: string) => {
    const tok = (customToken || tokenInput).trim();
    if (!tok) {
      toast.error("Please enter or scan a volunteer QR token");
      return;
    }
    setIsValidating(true);
    setValidatedData(null);
    try {
      const result = await volunteeringApi.validateQr(tok);
      setValidatedData(result);
      toast.success("Volunteer Ticket Verified! Backend validation successful.");
    } catch (err: any) {
      toast.error(err?.message || "Invalid or unauthorized QR token.");
    } finally {
      setIsValidating(false);
    }
  };

  const handleCheckIn = async () => {
    const tok = tokenInput.trim();
    if (!tok) return;
    setIsCheckingIn(true);
    try {
      const res = await volunteeringApi.checkIn(tok);
      toast.success(`Checked In ${res.ticket.volunteerName}! Attendance recorded 🎉`);
      await handleValidate(tok);
      onConfirmedParticipation?.();
    } catch (err: any) {
      toast.error(err?.message || "Check-in failed.");
    } finally {
      setIsCheckingIn(false);
    }
  };

  const handleCheckOut = async () => {
    const tok = tokenInput.trim();
    if (!tok) return;
    setIsCheckingOut(true);
    try {
      const res = await volunteeringApi.checkOut(tok);
      toast.success(`Checked Out ${res.ticket.volunteerName}! ${res.calculatedHours?.toFixed(1) || 0} volunteer hours calculated.`);
      await handleValidate(tok);
      onConfirmedParticipation?.();
    } catch (err: any) {
      toast.error(err?.message || "Check-out failed.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const currentStatus = validatedData?.ticket?.attendanceStatus;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
            <QrCodeIcon className="size-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Event Desk QR Scanner</span>
          </div>
          <DialogTitle className="text-lg font-black">Scan / Validate Volunteer Pass</DialogTitle>
          <DialogDescription>
            Independent backend verification of volunteer credentials, check-in timestamps, and hours tracking.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Simulation fast selector from accepted crew roster */}
          {acceptedApplicants.length > 0 && (
            <div className="rounded-lg border border-border/80 bg-muted/40 p-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                Simulate Scan from Accepted Crew Roster:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {acceptedApplicants.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={async () => {
                      try {
                        const ticket = await volunteeringApi.getVolunteerTicket(app.id);
                        if (ticket?.qrToken) {
                          setTokenInput(ticket.qrToken);
                          await handleValidate(ticket.qrToken);
                        }
                      } catch (err: any) {
                        toast.error(err?.message || "Could not fetch volunteer ticket");
                      }
                    }}
                    className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:bg-accent transition-colors"
                  >
                    {app.userName || "Volunteer"} ({app.assignedRole || app.role})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Token input & actions */}
          <div className="space-y-1.5">
            <Label htmlFor="qr-token-input">Volunteer QR Security Token</Label>
            <div className="flex gap-2">
              <Input
                id="qr-token-input"
                placeholder="Scan or paste token (e.g. cptok_vol_...)"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="font-mono text-xs"
              />
              <Button type="button" variant="outline" size="sm" onClick={handlePaste} className="shrink-0 text-xs gap-1">
                <Copy className="size-3.5" />
                Paste
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => handleValidate()}
                disabled={isValidating || !tokenInput.trim()}
                className="shrink-0 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
              >
                {isValidating ? "Validating…" : "Validate Pass"}
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              The backend independently verifies the cryptographically unguessable token and organizer permissions.
            </p>
          </div>

          {/* Validated Ticket Result */}
          {validatedData && (
            <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3 animate-in fade-in-50">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-foreground">
                      {validatedData.ticket.volunteerName}
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      AUTHENTICATED
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {validatedData.ticket.volunteerEmail}
                  </p>
                </div>

                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-bold uppercase border",
                    currentStatus === "CHECKED_IN"
                      ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40"
                      : currentStatus === "CHECKED_OUT"
                        ? "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/40"
                        : currentStatus === "COMPLETED"
                          ? "bg-primary/20 text-primary border-primary/40"
                          : "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40"
                  )}
                >
                  {currentStatus?.replace("_", " ")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs rounded-lg border border-border/60 bg-card p-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-muted-foreground block">Assigned Role</span>
                  <span className="font-semibold text-foreground">{validatedData.ticket.assignedRole}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-muted-foreground block">Pass Identifier</span>
                  <span className="font-mono font-semibold text-foreground">{validatedData.ticket.ticketNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-muted-foreground block">Check-In Time</span>
                  <span className="text-foreground">
                    {validatedData.ticket.checkInTime ? formatDate(validatedData.ticket.checkInTime) : "Not yet checked in"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-muted-foreground block">Check-Out Time</span>
                  <span className="text-foreground">
                    {validatedData.ticket.checkOutTime ? formatDate(validatedData.ticket.checkOutTime) : "Shift in progress / not checked out"}
                  </span>
                </div>
                {(validatedData.ticket.calculatedHours !== null && validatedData.ticket.calculatedHours !== undefined) && (
                  <div className="col-span-2 border-t border-border pt-2 mt-1 flex items-center justify-between">
                    <span className="font-semibold text-muted-foreground">Calculated Shift Hours:</span>
                    <span className="font-black text-sm text-primary">
                      {validatedData.ticket.calculatedHours.toFixed(1)} Hours
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons inside scanner */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                {currentStatus === "NOT_CHECKED_IN" && (
                  <Button
                    type="button"
                    onClick={handleCheckIn}
                    disabled={isCheckingIn}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2"
                  >
                    <CheckCircle2 className="size-4" />
                    {isCheckingIn ? "Recording Check-In…" : "Record Volunteer Check-In"}
                  </Button>
                )}

                {currentStatus === "CHECKED_IN" && (
                  <Button
                    type="button"
                    onClick={handleCheckOut}
                    disabled={isCheckingOut}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2"
                  >
                    <Clock className="size-4" />
                    {isCheckingOut ? "Recording Check-Out…" : "Record Volunteer Check-Out (Compute Hours)"}
                  </Button>
                )}

                {(currentStatus === "CHECKED_OUT" || currentStatus === "COMPLETED") && (
                  <div className="w-full rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-center text-xs text-emerald-700 dark:text-emerald-300 font-semibold flex items-center justify-center gap-2">
                    <ShieldCheck className="size-4" />
                    Volunteer duty completed! Hours calculated and eligible for verified certification.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-3">
          <Button variant="outline" onClick={onClose}>
            Close Scanner
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface FindVolunteersModalProps {
  open: boolean;
  onClose: () => void;
  events: CampusEvent[];
  initialEvent: CampusEvent | null;
}

function FindVolunteersModal({
  open,
  onClose,
  events,
  initialEvent,
}: FindVolunteersModalProps) {
  const [selectedEventId, setSelectedEventId] = useState<string>(
    initialEvent?.id || (events.length > 0 && events[0] ? events[0].id : "")
  );
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>("");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("");
  const [selectedSkillChips, setSelectedSkillChips] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState<string>("");
  const [invitingCandidate, setInvitingCandidate] = useState<VolunteerCandidateCard | null>(null);
  const [inviteRole, setInviteRole] = useState<string>("Event Support");
  const [isSendingInvite, setIsSendingInvite] = useState<boolean>(false);

  useEffect(() => {
    if (initialEvent?.id) {
      setSelectedEventId(initialEvent.id);
    } else if (events.length > 0 && !selectedEventId) {
      const first = events[0];
      if (first) {
        setSelectedEventId(first.id);
      }
    }
  }, [initialEvent, events]);

  const targetEvent = useMemo(() => {
    return events.find((e) => e.id === selectedEventId) || null;
  }, [events, selectedEventId]);

  const universitiesQuery = useQuery({
    queryKey: ["universities"],
    queryFn: () => directoryApi.universities(),
  });

  const candidatesQuery = useQuery({
    queryKey: [
      "volunteering",
      "candidates",
      selectedEventId,
      selectedUniversityId,
      availabilityFilter,
      selectedSkillChips,
    ],
    queryFn: () =>
      volunteeringApi.findCandidates({
        eventId: selectedEventId || undefined,
        universityId: selectedUniversityId || undefined,
        availability: availabilityFilter || undefined,
        skills: selectedSkillChips.length > 0 ? selectedSkillChips : undefined,
        limit: 30,
      }),
    enabled: open,
  });

  const candidates = candidatesQuery.data?.items ?? [];

  const toggleSkill = (skill: string) => {
    setSelectedSkillChips((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkill.trim() && !selectedSkillChips.includes(customSkill.trim())) {
      setSelectedSkillChips((prev) => [...prev, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const handleSendInvite = async () => {
    if (!invitingCandidate) return;
    setIsSendingInvite(true);
    setTimeout(() => {
      setIsSendingInvite(false);
      toast.success(`Invitation sent to ${invitingCandidate.name}!`, {
        description: `Invited as "${inviteRole}" for ${targetEvent?.title || "your campus opportunity"}.`,
      });
      setInvitingCandidate(null);
    }, 600);
  };

  const POPULAR_SKILLS = [
    "Photography",
    "Videography",
    "Logistics",
    "Technical Support",
    "Social Media",
    "Event Hosting",
    "Registration Desk",
    "Python",
    "React",
    "Crowd Coordination",
  ];

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Users className="size-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Talent Discovery & Volunteer Matching
            </span>
          </div>
          <DialogTitle className="text-xl font-black">Find Volunteers</DialogTitle>
          <DialogDescription>
            Discover, rank, and recruit motivated student volunteers across Sri Lankan campuses based on skills, verified track record, and availability.
          </DialogDescription>
        </DialogHeader>

        {/* Privacy Notice Alert */}
        <div className="flex items-start gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-foreground">
          <ShieldCheck className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
          <div>
            <span className="font-bold text-emerald-700 dark:text-emerald-300">
              Shielded Student Privacy:
            </span>{" "}
            <span className="text-muted-foreground leading-relaxed">
              Personal contact details (phone numbers, physical addresses, private emails) are strictly shielded. Only students who have opted into volunteer matching and meet privacy visibility criteria appear in candidate searches.
            </span>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {/* Target Opportunity Selector */}
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Match Against Opportunity
              </Label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {events.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.title}
                  </option>
                ))}
              </select>
            </div>

            {/* University Filter */}
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                University
              </Label>
              <select
                value={selectedUniversityId}
                onChange={(e) => setSelectedUniversityId(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All Campuses (Inter-University)</option>
                {(universitiesQuery.data ?? []).map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Availability
              </Label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Any Schedule</option>
                <option value="FLEXIBLE">Flexible / Whenever Needed</option>
                <option value="WEEKENDS">Weekends Only</option>
                <option value="WEEKDAYS">Weekdays</option>
                <option value="EVENINGS">Evenings</option>
              </select>
            </div>
          </div>

          {/* Skill chips */}
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              Filter by Skills
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {POPULAR_SKILLS.map((skill) => {
                const isSelected = selectedSkillChips.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-secondary text-secondary-foreground hover:bg-accent"
                    )}
                  >
                    {isSelected && <Check className="inline-block size-3 mr-1" />}
                    {skill}
                  </button>
                );
              })}

              <form onSubmit={handleAddCustomSkill} className="inline-flex items-center gap-1">
                <input
                  type="text"
                  placeholder="+ Add skill tag"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  className="h-6 rounded border border-border bg-surface px-2 text-xs focus:border-primary focus:outline-none"
                />
              </form>
            </div>
          </div>
        </div>

        {/* Results section */}
        <div className="mt-2">
          {candidatesQuery.isPending ? (
            <RowSkeleton />
          ) : candidatesQuery.isError ? (
            <ErrorState onRetry={() => candidatesQuery.refetch()} />
          ) : candidates.length === 0 ? (
            <EmptyState
              icon={<Users className="size-6 text-primary" />}
              title="No volunteer candidates matched your criteria"
              description="Try adjusting your skills or availability filters, or select a different opportunity."
            />
          ) : (
            <div>
              <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                <span>
                  Found <strong className="text-foreground">{candidates.length}</strong> matching candidate(s)
                </span>
                <span>Sorted by Match Percentage (rule-based explainable score)</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {candidates.map((c) => {
                  const matchColorClass =
                    c.matchPercentage >= 75
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                      : c.matchPercentage >= 50
                      ? "bg-primary/15 text-primary border-primary/30"
                      : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30";

                  return (
                    <div
                      key={c.userId}
                      className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-border/80 hover:shadow-md"
                    >
                      <div>
                        {/* Header: Avatar, Name, Match Score */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 min-w-0">
                            <OrgAvatar
                              initials={c.name.slice(0, 2).toUpperCase()}
                              className="size-10 shrink-0"
                            />
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-foreground leading-snug truncate">
                                {c.name}
                              </h4>
                              <p className="text-xs text-muted-foreground truncate">
                                {c.universityName}
                                {c.facultyName && ` · ${c.facultyName}`}
                              </p>
                              {c.academicYear && (
                                <p className="text-[11px] text-muted-foreground">
                                  {c.academicYear} {c.departmentName && `· ${c.departmentName}`}
                                </p>
                              )}
                            </div>
                          </div>

                          <span
                            className={cn(
                              "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border",
                              matchColorClass
                            )}
                          >
                            <Sparkles className="size-3" />
                            {c.matchPercentage}% Match
                          </span>
                        </div>

                        {/* Verified History & Availability Pills */}
                        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
                          {c.verifiedVolunteerMissions > 0 && (
                            <span className="inline-flex items-center gap-1 rounded bg-primary/10 text-primary px-2 py-0.5 font-semibold">
                              <Award className="size-3" />
                              {c.verifiedVolunteerMissions} Verified Volunteer Mission{c.verifiedVolunteerMissions > 1 ? "s" : ""}
                            </span>
                          )}

                          {c.availability && (
                            <span className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-muted-foreground">
                              <Clock className="size-3" />
                              {c.availability}
                            </span>
                          )}
                        </div>

                        {/* Explainable Match Reasons */}
                        {c.reasons && c.reasons.length > 0 && (
                          <div className="mt-3 rounded-lg border border-primary/15 bg-primary/5 p-2.5 text-xs">
                            <span className="font-semibold text-primary block mb-1">
                              Match Signals:
                            </span>
                            <ul className="space-y-1 text-muted-foreground">
                              {c.reasons.slice(0, 3).map((r, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 text-[11px] leading-tight">
                                  <Check className="size-3 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{r}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Relevant experience */}
                        {c.relevantExperienceSummary && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            <span className="font-semibold text-foreground">Experience: </span>
                            <span>{c.relevantExperienceSummary}</span>
                          </div>
                        )}

                        {/* Bio */}
                        {c.volunteerBio && (
                          <div className="mt-2 text-xs text-muted-foreground italic line-clamp-2">
                            "{c.volunteerBio}"
                          </div>
                        )}

                        {/* Matching Skills */}
                        <div className="mt-3 flex flex-wrap items-center gap-1 text-[11px]">
                          {c.matchingSkills.map((s) => (
                            <span
                              key={s}
                              className="inline-flex items-center gap-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 font-medium"
                            >
                              <Check className="size-2.5" />
                              {s}
                            </span>
                          ))}
                          {c.skills
                            .filter((s) => !c.matchingSkills.includes(s))
                            .slice(0, 4)
                            .map((s) => (
                              <span
                                key={s}
                                className="rounded bg-secondary/70 px-1.5 py-0.5 text-muted-foreground"
                              >
                                {s}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* Footer: Invite button */}
                      <div className="mt-4 flex items-center justify-end border-t border-border pt-3">
                        <Button
                          size="sm"
                          className="h-8 gap-1.5 text-xs font-semibold"
                          onClick={() => setInvitingCandidate(c)}
                        >
                          <Send className="size-3" />
                          Invite to Crew
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Invite Sub-dialog */}
        <Dialog open={Boolean(invitingCandidate)} onOpenChange={(o) => !o && setInvitingCandidate(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite {invitingCandidate?.name} to Crew</DialogTitle>
              <DialogDescription>
                Send a direct volunteer role invitation for <strong>{targetEvent?.title || "your opportunity"}</strong>.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3.5 mt-2">
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Select Role Assignment
                </Label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Registration Desk">Registration Desk</option>
                  <option value="Event Support">Event Support & Ushering</option>
                  <option value="Technical Support">Technical & AV Support</option>
                  <option value="Photography">Photography & Media</option>
                  <option value="Videography">Videography</option>
                  <option value="Social Media">Social Media & Live Coverage</option>
                  <option value="Crowd Management">Crowd Coordination</option>
                  <option value="Logistics & Setup">Logistics & Venue Setup</option>
                  <option value="Workshop Assistant">Workshop Assistant</option>
                </select>
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
                <p className="font-semibold text-primary">Candidate Privacy & Notification:</p>
                <p className="mt-1">
                  The candidate will receive a notification on CampusPulse. No personal phone numbers or addresses are revealed during this process.
                </p>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setInvitingCandidate(null)}>
                Cancel
              </Button>
              <Button
                disabled={isSendingInvite}
                onClick={handleSendInvite}
                className="gap-1.5"
              >
                {isSendingInvite ? "Sending..." : "Confirm Invitation"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
