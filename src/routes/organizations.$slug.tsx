import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Users,
  Building2,
  ShieldCheck,
  Plus,
  Globe,
  CheckCircle2,
  UserPlus,
  Check,
  LogOut,
  Crown,
  Sparkles,
  Pencil,
  Trash2,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { OrgAvatar, VerificationBadge } from "@/components/common/Badges";
import { OpportunityGrid } from "@/components/opportunity/OpportunityCard";
import { EmptyState, GridSkeleton } from "@/components/common/States";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { directoryApi } from "@/lib/api/directory";
import { eventsApi } from "@/lib/api/events";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/organizations/$slug")({
  loader: async ({ params }) => {
    let organization = await directoryApi.organization(params.slug);
    if (!organization) {
      const all = await directoryApi.organizations();
      organization =
        all.find((o) => o.slug === params.slug) ?? all.find((o) => o.id === params.slug) ?? null;
    }
    if (!organization) throw notFound();
    return { organization };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Organisation not found — CampusPulse" }, { name: "robots", content: "noindex" }] };
    }
    const { organization } = loaderData;
    return {
      meta: [
        { title: `${organization.name} — CampusPulse` },
        { name: "description", content: organization.description },
        { property: "og:title", content: `${organization.name} — CampusPulse` },
        { property: "og:description", content: organization.description },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-extrabold">Organisation not found</h1>
    </div>
  ),
  component: OrganizationDetailPage,
});

function OrganizationDetailPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { organization } = Route.useLoaderData();
  const [submittingAction, setSubmittingAction] = useState(false);

  // Dialog states for Leader Member Management
  const [removeConfirmMember, setRemoveConfirmMember] = useState<any | null>(null);
  const [removeBusy, setRemoveBusy] = useState(false);

  const [permissionConfirmMember, setPermissionConfirmMember] = useState<any | null>(null);
  const [permissionBusy, setPermissionBusy] = useState(false);

  const eventsQuery = useQuery({
    queryKey: ["events", "organization", organization.id],
    queryFn: () => eventsApi.list({ organization: organization.id }),
  });

  const membersQuery = useQuery({
    queryKey: ["organization", organization.id, "members"],
    queryFn: () => directoryApi.organizationMembers(organization.id),
  });

  const myOrgsQuery = useQuery({
    queryKey: ["myOrganizations"],
    queryFn: () => directoryApi.myOrganizations(),
    enabled: Boolean(user),
  });

  const isMember = useMemo(() => {
    if (!myOrgsQuery.data) return false;
    return myOrgsQuery.data.some(
      (m: any) => m.organizationId === organization.id && m.status === "ACTIVE",
    );
  }, [myOrgsQuery.data, organization.id]);

  const membersList = membersQuery.data?.activeMembers || membersQuery.data?.members || (
    Array.isArray(membersQuery.data) && membersQuery.data.length > 0
      ? membersQuery.data
      : organization.leadership || []
  );

  // Determine if the logged-in user is an authorized leader of THIS specific society
  const isSocietyLeader = useMemo(() => {
    if (!user) return false;
    if (membersQuery.data?.isAuthorizedLeader) return true;
    const currentMember = membersList.find(
      (m: any) => (m.userId === user.id || m.user?.id === user.id) && m.status === "ACTIVE",
    );
    if (currentMember) {
      return ["ADMIN", "LEADER", "PRESIDENT"].includes(currentMember.role);
    }
    return false;
  }, [user, membersQuery.data, membersList]);

  // Separate members into Official Roles / Committee vs Active Member Roster
  const officialRolesList = useMemo(() => {
    return membersList.filter((m: any) => {
      const role = m.role || "MEMBER";
      return (
        ["ADMIN", "LEADER", "PRESIDENT", "VICE_PRESIDENT", "TREASURER", "SECRETARY", "MANAGER"].includes(
          role,
        ) || m.isFounder
      );
    });
  }, [membersList]);

  const activeRosterList = useMemo(() => {
    return membersList.filter((m: any) => {
      const role = m.role || "MEMBER";
      return (
        !["ADMIN", "LEADER", "PRESIDENT", "VICE_PRESIDENT", "TREASURER", "SECRETARY", "MANAGER"].includes(
          role,
        ) && !m.isFounder
      );
    });
  }, [membersList]);

  const handleJoinDirectly = async () => {
    if (!user) {
      toast.error("Please log in to join student societies");
      return;
    }
    setSubmittingAction(true);
    try {
      await directoryApi.joinOrganization(organization.id);
      toast.success(`Joined ${organization.name}! 🎉`, {
        description: "You are now an active member of this society.",
      });
      void myOrgsQuery.refetch();
      void membersQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to join society.");
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleLeave = async () => {
    if (!confirm(`Are you sure you want to leave ${organization.name}?`)) return;
    setSubmittingAction(true);
    try {
      await directoryApi.leaveOrganization(organization.id);
      toast.success(`Left ${organization.name}`);
      void myOrgsQuery.refetch();
      void membersQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to leave society.");
    } finally {
      setSubmittingAction(false);
    }
  };

  // Handler: Confirm Member Removal
  const handleConfirmRemove = async () => {
    if (!removeConfirmMember) return;
    const memberName = removeConfirmMember.user?.name || removeConfirmMember.name || "Member";
    setRemoveBusy(true);
    try {
      await directoryApi.removeMember(organization.id, removeConfirmMember.id);
      toast.success(`Removed ${memberName} from ${organization.name}`);
      setRemoveConfirmMember(null);
      void membersQuery.refetch();
      void myOrgsQuery.refetch();
      void queryClient.invalidateQueries({ queryKey: ["organization", organization.id] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to remove member.");
    } finally {
      setRemoveBusy(false);
    }
  };

  // Handler: Confirm Toggle Event-Creation Permission
  const handleConfirmTogglePermission = async () => {
    if (!permissionConfirmMember) return;
    const nextPermission = !Boolean(permissionConfirmMember.canCreateEvents);
    const memberName = permissionConfirmMember.user?.name || permissionConfirmMember.name || "Member";
    setPermissionBusy(true);
    try {
      await directoryApi.updateMember(organization.id, permissionConfirmMember.id, {
        canCreateEvents: nextPermission,
      });
      toast.success(
        nextPermission
          ? `Granted event-creation permission to ${memberName}`
          : `Revoked event-creation permission for ${memberName}`,
      );
      setPermissionConfirmMember(null);
      void membersQuery.refetch();
      void myOrgsQuery.refetch();
      void queryClient.invalidateQueries({ queryKey: ["organization", organization.id] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to update event-creation permission.");
    } finally {
      setPermissionBusy(false);
    }
  };

  const allEvents = eventsQuery.data ?? [];
  const now = new Date();
  const upcomingEvents = allEvents.filter((e) => new Date(e.startDate) >= now);
  const pastEvents = allEvents.filter((e) => new Date(e.startDate) < now);

  const isPending = organization.status === "PENDING";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <header className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <OrgAvatar initials={organization.initials} className="size-16 text-lg" />
            <div className="min-w-0">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <h1 className="truncate text-2xl font-black tracking-tight">{organization.name}</h1>
                <VerificationBadge verified={organization.verified} />
                {isPending && (
                  <span className="rounded bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    ⏳ Awaiting Platform Approval
                  </span>
                )}
              </div>
              <p className="truncate text-sm text-muted-foreground">{organization.universityName}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isPending ? (
              <span className="text-xs text-muted-foreground italic">Society is pending platform approval</span>
            ) : isMember ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Check className="size-3.5" /> Joined
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-destructive hover:border-destructive/30"
                  disabled={submittingAction}
                  onClick={handleLeave}
                >
                  <LogOut className="size-3.5 mr-1" /> Leave Society
                </Button>
              </div>
            ) : (
              <Button
                className="gap-1.5 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={submittingAction}
                onClick={handleJoinDirectly}
              >
                <UserPlus className="size-4" />
                {submittingAction ? "Joining…" : "Join Society"}
              </Button>
            )}
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {organization.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="size-4" aria-hidden />
            {organization.memberCount} members
          </span>
          <span className="flex items-center gap-1.5">
            <Building2 className="size-4" aria-hidden />
            {organization.universityName}
          </span>
          {organization.verified && (
            <span className="flex items-center gap-1.5 text-primary font-medium">
              <CheckCircle2 className="size-4" aria-hidden />
              Verified Society
            </span>
          )}
        </div>
      </header>

      {/* Society Committee & Members Section */}
      <section className="mt-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold tracking-tight">Society Committee & Members</h2>
              {isSocietyLeader ? (
                <span className="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary border border-primary/20">
                  Leader View
                </span>
              ) : isMember ? (
                <span className="rounded bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border">
                  Member View
                </span>
              ) : null}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Official roles and active member roster within {organization.name}.
            </p>
          </div>
        </div>

        {/* 1. Official Roles / Committee Members */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Crown className="size-3.5 text-primary" />
            Official Roles / Committee Members ({officialRolesList.length})
          </h3>

          {officialRolesList.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card/50 p-6 text-center text-xs text-muted-foreground">
              No official committee roles registered yet.
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {officialRolesList.map((m: any) => {
                const memberName = m.user?.name || m.name || "Member";
                const memberRole = m.role || "LEADER";
                const memberTitle = m.title;
                const isLeader = ["ADMIN", "LEADER", "PRESIDENT"].includes(memberRole);
                const initials = memberName
                  .split(" ")
                  .map((p: string) => p[0])
                  .join("")
                  .slice(0, 2);
                const isSelf = m.userId === user?.id || m.user?.id === user?.id;

                return (
                  <div
                    key={m.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <OrgAvatar initials={initials} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground flex items-center gap-1">
                          {memberName}
                          {m.user?.universityEmailVerified && (
                            <span title="Verified University Student">
                              <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
                            </span>
                          )}
                          {isSelf && (
                            <span className="text-[10px] text-muted-foreground font-semibold bg-surface px-1.5 py-0.5 rounded shrink-0">
                              (You)
                            </span>
                          )}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                          <span
                            className={cn(
                              "text-[10px] font-bold rounded px-1.5 py-0.5 flex items-center gap-1",
                              isLeader
                                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                                : "bg-primary/10 text-primary border border-primary/20",
                            )}
                          >
                            {isLeader && <Crown className="size-2.5" />}
                            {memberRole.replace(/_/g, " ")}
                          </span>
                          {m.isFounder && (
                            <span className="text-[10px] font-bold rounded px-1.5 py-0.5 bg-primary/10 text-primary border border-primary/20 flex items-center gap-0.5">
                              <Sparkles className="size-2.5" /> Founder
                            </span>
                          )}
                          {memberTitle && (
                            <span className="text-xs text-muted-foreground truncate">· {memberTitle}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. Active Member Roster */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Users className="size-3.5 text-primary" />
            Active Member Roster ({activeRosterList.length})
          </h3>

          {activeRosterList.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card/50 p-6 text-center text-xs text-muted-foreground">
              No regular members in this society roster yet.
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {activeRosterList.map((m: any) => {
                const memberName = m.user?.name || m.name || "Member";
                const memberRole = m.role || "MEMBER";
                const memberTitle = m.title;
                const canCreateEvents = Boolean(m.canCreateEvents);
                const initials = memberName
                  .split(" ")
                  .map((p: string) => p[0])
                  .join("")
                  .slice(0, 2);
                const isSelf = m.userId === user?.id || m.user?.id === user?.id;

                return (
                  <div
                    key={m.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <OrgAvatar initials={initials} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground flex items-center gap-1">
                          {memberName}
                          {m.user?.universityEmailVerified && (
                            <span title="Verified University Student">
                              <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
                            </span>
                          )}
                          {isSelf && (
                            <span className="text-[10px] text-muted-foreground font-semibold bg-surface px-1.5 py-0.5 rounded shrink-0">
                              (You)
                            </span>
                          )}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-bold rounded px-1.5 py-0.5 bg-surface text-muted-foreground border border-border/40">
                            {memberRole.replace(/_/g, " ")}
                          </span>
                          {canCreateEvents && (
                            <span
                              title="Authorized to create and publish events for this society"
                              className="text-[10px] font-bold rounded px-1.5 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1"
                            >
                              <Sparkles className="size-2.5" /> Can create events
                            </span>
                          )}
                          {memberTitle && (
                            <span className="text-xs text-muted-foreground truncate">· {memberTitle}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Leader Management Controls (✏️ Permission & 🗑️ Remove) - only shown for society LEADERs */}
                    {isSocietyLeader && (
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "h-8 w-8 p-0 rounded-lg transition-colors",
                            canCreateEvents
                              ? "text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20"
                              : "text-muted-foreground hover:text-primary hover:bg-primary/10",
                          )}
                          onClick={() => setPermissionConfirmMember(m)}
                          title={
                            canCreateEvents
                              ? "Revoke event-creation permission"
                              : "Grant event-creation permission"
                          }
                          aria-label={
                            canCreateEvents
                              ? `Revoke event-creation permission for ${memberName}`
                              : `Grant event-creation permission to ${memberName}`
                          }
                        >
                          <Pencil className="size-3.5" />
                        </Button>

                        {!isSelf && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={() => setRemoveConfirmMember(m)}
                            title="Remove member"
                            aria-label={`Remove ${memberName} from society`}
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Remove Member Confirmation Dialog */}
      <Dialog
        open={Boolean(removeConfirmMember)}
        onOpenChange={(open) => !open && setRemoveConfirmMember(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="size-5" />
              <DialogTitle>Remove Member</DialogTitle>
            </div>
            <DialogDescription className="text-sm pt-2">
              Are you sure you want to remove{" "}
              <strong>
                {removeConfirmMember?.user?.name || removeConfirmMember?.name || "this member"}
              </strong>{" "}
              from {organization.name}?
            </DialogDescription>
          </DialogHeader>

          <p className="text-xs text-muted-foreground">
            This will revoke their membership and any committee permissions for{" "}
            <strong>{organization.name}</strong>. Their CampusPulse student account will remain active.
          </p>

          <DialogFooter className="mt-4 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setRemoveConfirmMember(null)}
              disabled={removeBusy}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmRemove}
              disabled={removeBusy}
            >
              {removeBusy ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-1" /> Removing…
                </>
              ) : (
                "Remove Member"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Grant / Revoke Event-Creation Permission Dialog */}
      <Dialog
        open={Boolean(permissionConfirmMember)}
        onOpenChange={(open) => !open && setPermissionConfirmMember(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Pencil className="size-5 text-primary" />
              <DialogTitle>
                {permissionConfirmMember?.canCreateEvents
                  ? "Revoke Event-Creation Permission"
                  : "Grant Event-Creation Permission"}
              </DialogTitle>
            </div>
            <DialogDescription className="text-sm pt-2">
              {permissionConfirmMember?.canCreateEvents
                ? `Are you sure you want to revoke event-creation permission for ${
                    permissionConfirmMember?.user?.name || permissionConfirmMember?.name || "this member"
                  }? They will no longer be able to create events for ${organization.name}.`
                : `This action will grant ${
                    permissionConfirmMember?.user?.name || permissionConfirmMember?.name || "this member"
                  } permission to create and draft events on behalf of ${organization.name}.`}
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-border bg-surface/50 p-3 text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground">Permission Scope Details:</p>
            <p>
              • Specific to <strong>{organization.name}</strong> only.
            </p>
            <p>• Does not change their membership role or grant administrative permissions.</p>
            <p>• Does not grant permissions in any other club or society.</p>
          </div>

          <DialogFooter className="mt-4 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPermissionConfirmMember(null)}
              disabled={permissionBusy}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant={permissionConfirmMember?.canCreateEvents ? "destructive" : "default"}
              onClick={handleConfirmTogglePermission}
              disabled={permissionBusy}
            >
              {permissionBusy ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-1" /> Updating…
                </>
              ) : permissionConfirmMember?.canCreateEvents ? (
                "Revoke Permission"
              ) : (
                "Grant Permission"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upcoming Events */}
      <section className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">Upcoming Opportunities</h2>
        <div className="mt-4">
          {eventsQuery.isPending ? (
            <GridSkeleton count={3} />
          ) : upcomingEvents.length === 0 ? (
            <EmptyState title="No upcoming events" description="Check back soon for upcoming hackathons and workshops." />
          ) : (
            <OpportunityGrid events={upcomingEvents} />
          )}
        </div>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-extrabold tracking-tight text-muted-foreground">Past Opportunities</h2>
          <div className="mt-4">
            <OpportunityGrid events={pastEvents} />
          </div>
        </section>
      )}
    </div>
  );
}
