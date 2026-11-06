import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Users,
  ShieldCheck,
  Search,
  Filter,
  Crown,
  Sparkles,
  Loader2,
  Edit2,
  Trash2,
  Pencil,
  Mail,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrgAvatar } from "@/components/common/Badges";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { directoryApi } from "@/lib/api/directory";
import { useAuth } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import type { OrganizationMember } from "@/lib/types";
import { cn } from "@/lib/utils";

interface OrganizationMembersTabProps {
  organizationId?: string | undefined;
  organizationName?: string | undefined;
  canManageOrg?: boolean | undefined;
  isPlatformAdmin?: boolean | undefined;
}

export function OrganizationMembersTab({
  organizationId = "",
  organizationName = "Selected Society",
  canManageOrg = false,
  isPlatformAdmin = false,
}: OrganizationMembersTabProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  // Remove Member Confirmation Dialog State
  const [removeConfirmMember, setRemoveConfirmMember] = useState<OrganizationMember | null>(null);
  const [removeBusy, setRemoveBusy] = useState(false);

  // Permission (Grant / Revoke Event-Creation) Dialog State
  const [permissionConfirmMember, setPermissionConfirmMember] = useState<OrganizationMember | null>(null);
  const [permissionBusy, setPermissionBusy] = useState(false);

  // Edit Role & Portfolio Dialog State
  const [editingMember, setEditingMember] = useState<OrganizationMember | null>(null);
  const [selectedRole, setSelectedRole] = useState("MEMBER");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [editingBusy, setEditingBusy] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["organization", organizationId, "members"],
    queryFn: () => directoryApi.organizationMembers(organizationId),
    enabled: Boolean(organizationId),
  });

  const membersData = data || {
    activeMembers: [],
    members: [],
    totalActive: 0,
    leaderCount: 0,
    maxLeaders: 2,
    isLeaderLimitReached: false,
    isAuthorizedManager: false,
    isAuthorizedLeader: false,
  };

  const activeMembers: OrganizationMember[] = membersData.activeMembers || membersData.members || [];

  // Determine if the current user is an authorized leader in this specific society
  const currentUserMembership = useMemo(() => {
    if (!user) return null;
    return activeMembers.find((m) => m.userId === user.id);
  }, [activeMembers, user]);

  const isLeader = useMemo(() => {
    if (isPlatformAdmin) return true;
    if (membersData.isAuthorizedLeader) return true;
    if (currentUserMembership) {
      return ["ADMIN", "LEADER", "PRESIDENT"].includes(currentUserMembership.role);
    }
    return Boolean(canManageOrg);
  }, [isPlatformAdmin, membersData.isAuthorizedLeader, currentUserMembership, canManageOrg]);

  // Calculate leaders count
  const leaderCount =
    membersData.leaderCount ??
    activeMembers.filter((m) => ["LEADER", "PRESIDENT"].includes(m.role || "")).length;
  const maxLeaders = membersData.maxLeaders ?? 2;
  const isLeaderLimitReached = leaderCount >= maxLeaders;

  // Filter Active Members
  const filteredActiveMembers = useMemo(() => {
    return activeMembers.filter((m) => {
      const memberName = m.name || "";
      const memberTitle = m.title || "";
      const memberEmail = m.email || "";

      const matchesSearch =
        memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        memberTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        memberEmail.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "ALL" || (m.role || "MEMBER") === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [activeMembers, searchQuery, roleFilter]);

  // Handler: Open Edit Role
  const handleOpenEdit = (m: OrganizationMember) => {
    setEditingMember(m);
    setSelectedRole(m.role || "MEMBER");
    setSelectedTitle(m.title || "");
  };

  // Handler: Update Role
  const handleUpdateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    setEditingBusy(true);
    try {
      await directoryApi.updateMember(organizationId, editingMember.id, {
        role: selectedRole,
        title: selectedTitle.trim() || undefined,
      });

      toast.success(`Updated ${editingMember.name || "Member"}'s role to ${selectedRole.replace(/_/g, " ")}`);
      setEditingMember(null);
      void refetch();
      void queryClient.invalidateQueries({ queryKey: ["myOrganizations"] });
      void queryClient.invalidateQueries({ queryKey: ["organization", organizationId] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to update member role.");
    } finally {
      setEditingBusy(false);
    }
  };

  // Handler: Confirm Remove Member
  const handleConfirmRemove = async () => {
    if (!removeConfirmMember) return;

    setRemoveBusy(true);
    try {
      await directoryApi.removeMember(organizationId, removeConfirmMember.id);
      toast.success(`Removed ${removeConfirmMember.name || "Member"} from the society`);
      setRemoveConfirmMember(null);
      void refetch();
      void queryClient.invalidateQueries({ queryKey: ["myOrganizations"] });
      void queryClient.invalidateQueries({ queryKey: ["organization", organizationId] });
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
    setPermissionBusy(true);

    try {
      await directoryApi.updateMember(organizationId, permissionConfirmMember.id, {
        canCreateEvents: nextPermission,
      });

      toast.success(
        nextPermission
          ? `Granted event-creation permission to ${permissionConfirmMember.name || "Member"}`
          : `Revoked event-creation permission for ${permissionConfirmMember.name || "Member"}`,
      );

      setPermissionConfirmMember(null);
      void refetch();
      void queryClient.invalidateQueries({ queryKey: ["myOrganizations"] });
      void queryClient.invalidateQueries({ queryKey: ["myManagedOrganizations"] });
      void queryClient.invalidateQueries({ queryKey: ["organization", organizationId] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to update event-creation permission.");
    } finally {
      setPermissionBusy(false);
    }
  };

  if (!organizationId) {
    return (
      <div className="py-12 text-center text-xs text-muted-foreground rounded-xl border border-dashed border-border bg-surface/50">
        Please select a society above to view its committee and member directory.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Users className="size-5 text-primary" />
              Society Committee & Members
            </h3>
            {isLeader ? (
              <span className="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary border border-primary/20">
                Leader View
              </span>
            ) : (
              <span className="rounded bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border">
                Member View
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isLeader
              ? `Manage active committee officers, permissions, and member roster for ${organizationName}.`
              : `View official leadership and active member roster for ${organizationName}.`}
          </p>
        </div>
      </div>

      {/* Leadership Capacity Indicator Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card/60 p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-lg font-bold text-sm",
              isLeaderLimitReached
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                : "bg-primary/10 text-primary border border-primary/20",
            )}
          >
            <Crown className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Society Leadership Capacity
              </h4>
              <span
                className={cn(
                  "rounded px-2 py-0.5 text-[11px] font-extrabold",
                  isLeaderLimitReached
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                    : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
                )}
              >
                {leaderCount} / {maxLeaders} Active Leaders
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isLeaderLimitReached
                ? "Maximum 2 leaders reached. To appoint a new leader, an existing leader must be demoted or removed."
                : `${maxLeaders - leaderCount} leadership position available. Authorized leaders can assign a co-leader.`}
            </p>
          </div>
        </div>
      </div>

      {/* Search & Role Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search member name or title…"
            className="pl-8 text-xs h-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="size-3.5 text-muted-foreground" />
          <select
            aria-label="Filter members by role"
            className="rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground font-medium"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="ALL">All Roles ({activeMembers.length})</option>
            <option value="LEADER">Leader ({activeMembers.filter((m) => m.role === "LEADER").length})</option>
            <option value="PRESIDENT">President</option>
            <option value="EVENT_ORGANIZER">Event Organizer</option>
            <option value="TREASURER">Treasurer</option>
            <option value="SECRETARY">Secretary</option>
            <option value="MEMBER">Member</option>
          </select>
        </div>
      </div>

      {/* Active Members Grid */}
      {isLoading ? (
        <div className="py-12 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
          <Loader2 className="size-4 animate-spin text-primary" /> Loading member directory…
        </div>
      ) : filteredActiveMembers.length === 0 ? (
        <div className="py-10 text-center text-xs text-muted-foreground rounded-xl border border-dashed border-border bg-surface/50">
          No members match your search or filter.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredActiveMembers.map((m) => {
            const memberRole = m.role || "MEMBER";
            const memberName = m.name || "Member";
            const memberIsLeader = ["ADMIN", "LEADER", "PRESIDENT", "VICE_PRESIDENT"].includes(memberRole);
            const isRoleOrganizer = ["EVENT_ORGANIZER", "EVENT_MANAGER"].includes(memberRole);
            const hasEventPermission = Boolean(m.canCreateEvents);
            const isSelf = m.userId === user?.id;

            return (
              <div
                key={m.id}
                className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 shadow-xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <OrgAvatar initials={memberName.slice(0, 2)} />
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-foreground flex items-center gap-1">
                          <span className="truncate">{memberName}</span>
                          {m.universityEmailVerified && (
                            <span title="Verified University Student">
                              <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
                            </span>
                          )}
                          {isSelf && (
                            <span className="text-[10px] text-muted-foreground font-semibold bg-surface px-1.5 py-0.5 rounded shrink-0">
                              (You)
                            </span>
                          )}
                        </h4>
                        {m.title && <p className="text-xs font-medium text-muted-foreground truncate">{m.title}</p>}
                      </div>
                    </div>

                    {m.isFounder && (
                      <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary flex items-center gap-0.5 shrink-0">
                        <Sparkles className="size-2.5" /> Founder
                      </span>
                    )}
                  </div>

                  {/* Badges: Role & Event Creation Permission */}
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {/* Role Badge */}
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 text-[11px] font-bold flex items-center gap-1",
                        memberIsLeader
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                          : isRoleOrganizer
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "bg-surface text-muted-foreground border border-border/40",
                      )}
                    >
                      {memberIsLeader && <Crown className="size-3" />}
                      {memberRole.replace(/_/g, " ")}
                    </span>

                    {/* Explicit Event Permission Badge */}
                    {hasEventPermission && !memberIsLeader && !isRoleOrganizer && (
                      <span
                        title="Authorized to create and publish events for this society"
                        className="rounded bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1"
                      >
                        <Sparkles className="size-3" /> Can create events
                      </span>
                    )}

                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Active
                    </span>
                  </div>

                  {isLeader && m.email && (
                    <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Mail className="size-3 text-primary/70" />
                      <span className="truncate">{m.email}</span>
                    </div>
                  )}
                </div>

                {/* Footer Section */}
                <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-2.5 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    Joined {m.joinedAt ? formatDate(m.joinedAt) : "Recently"}
                  </span>

                  {/* Leader View Controls (Strictly rendered only for authorized leaders) */}
                  {isLeader && (
                    <div className="flex items-center gap-1">
                      {/* Manage Role Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs gap-1 font-medium hover:text-primary"
                        onClick={() => handleOpenEdit(m)}
                        title="Manage committee role & portfolio"
                      >
                        <Edit2 className="size-3" /> Role
                      </Button>

                      {/* Grant / Revoke Event-Creation Permission Pencil Icon */}
                      {!memberIsLeader && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "h-7 px-2 text-xs gap-1 font-medium transition-colors",
                            hasEventPermission
                              ? "text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20"
                              : "text-muted-foreground hover:text-primary hover:bg-primary/10",
                          )}
                          onClick={() => setPermissionConfirmMember(m)}
                          title={
                            hasEventPermission
                              ? "Revoke event creation permission"
                              : "Grant event creation permission"
                          }
                        >
                          <Pencil className="size-3" />
                        </Button>
                      )}

                      {/* Remove Member Bin/Trash Icon */}
                      {!memberIsLeader && !isSelf && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => setRemoveConfirmMember(m)}
                          title="Remove member"
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 1. Remove Member Confirmation Dialog */}
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
              Are you sure you want to remove <strong>{removeConfirmMember?.name}</strong> from the society?
            </DialogDescription>
          </DialogHeader>

          <p className="text-xs text-muted-foreground">
            This will revoke their membership and all associated committee permissions for <strong>{organizationName}</strong>. Their CampusPulse student account will remain active.
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

      {/* 2. Grant / Revoke Event-Creation Permission Dialog */}
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
                ? `Are you sure you want to revoke event-creation permission for ${permissionConfirmMember?.name}? They will no longer be able to create events for ${organizationName}.`
                : `This action will grant ${permissionConfirmMember?.name} permission to create and draft events on behalf of ${organizationName}.`}
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-border bg-surface/50 p-3 text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground">Permission Scope Details:</p>
            <p>
              • Specific to <strong>{organizationName}</strong> only.
            </p>
            <p>• Does not grant leader permissions, member removal, or settings management.</p>
            <p>• Does not count towards the 2-leader society limit.</p>
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

      {/* 3. Edit Role & Portfolio Dialog */}
      <Dialog open={Boolean(editingMember)} onOpenChange={(o) => !o && setEditingMember(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Role & Portfolio</DialogTitle>
            <DialogDescription className="text-xs">
              Update organization role and committee title for <strong>{editingMember?.name}</strong>.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdateRole} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="edit-role-select">Organization Role</Label>
              <select
                id="edit-role-select"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="MEMBER">Member (Standard Membership)</option>
                <option value="EVENT_ORGANIZER">Event Organizer (Publish & Manage Events)</option>
                <option value="TREASURER">Treasurer (Finances & Ticketing)</option>
                <option value="SECRETARY">Secretary (Communications)</option>
                <option
                  value="LEADER"
                  disabled={
                    isLeaderLimitReached &&
                    !["LEADER", "PRESIDENT"].includes(editingMember?.role || "")
                  }
                >
                  Leader{" "}
                  {isLeaderLimitReached &&
                  !["LEADER", "PRESIDENT"].includes(editingMember?.role || "")
                    ? "(Maximum 2 leaders reached)"
                    : "(Full Management & Executive)"}
                </option>
                <option
                  value="PRESIDENT"
                  disabled={
                    isLeaderLimitReached &&
                    !["LEADER", "PRESIDENT"].includes(editingMember?.role || "")
                  }
                >
                  President{" "}
                  {isLeaderLimitReached &&
                  !["LEADER", "PRESIDENT"].includes(editingMember?.role || "")
                    ? "(Limit reached)"
                    : ""}
                </option>
                <option value="OTHER">Other Contributor</option>
              </select>
              {isLeaderLimitReached &&
                !["LEADER", "PRESIDENT"].includes(editingMember?.role || "") && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400">
                    ⚠️ This society already has the maximum of 2 active leaders.
                  </p>
                )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-title-input">Committee Title / Portfolio</Label>
              <Input
                id="edit-title-input"
                placeholder="e.g. Lead Coordinator, Head of Media, Tech Lead"
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
              />
            </div>

            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setEditingMember(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={editingBusy}>
                {editingBusy ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-1" /> Saving…
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
