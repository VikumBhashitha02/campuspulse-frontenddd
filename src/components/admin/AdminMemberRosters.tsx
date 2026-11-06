import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  Search,
  Building,
  GraduationCap,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  UserCheck,
  UserX,
  AlertTriangle,
  Award,
  Crown,
  Calendar,
  Layers,
  FileText,
  BadgeCheck,
  Filter,
  CheckCircle2,
  XCircle,
  Building2,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  adminApi,
  type OrganizationRosterItem,
  type OrganizationMemberRosterItem,
  type UniversityItem,
} from "@/lib/api/admin";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { EmptyState, ErrorState, RowSkeleton, StatCard } from "@/components/common/States";

interface AdminMemberRostersProps {
  universities?: UniversityItem[];
  initialOrgId?: string;
}

const ORG_ROLE_OPTIONS = [
  { value: "LEADER", label: "Leader / President (Leadership Role)", isLeader: true },
  { value: "PRESIDENT", label: "President (Leadership Role)", isLeader: true },
  { value: "ADMIN", label: "Admin (Leadership Role)", isLeader: true },
  { value: "VICE_PRESIDENT", label: "Vice President", isLeader: false },
  { value: "SECRETARY", label: "Secretary", isLeader: false },
  { value: "TREASURER", label: "Treasurer", isLeader: false },
  { value: "EVENT_ORGANIZER", label: "Event Organizer", isLeader: false },
  { value: "EVENT_MANAGER", label: "Event Manager", isLeader: false },
  { value: "VOLUNTEER_COORDINATOR", label: "Volunteer Coordinator", isLeader: false },
  { value: "MODERATOR", label: "Moderator", isLeader: false },
  { value: "MEMBER", label: "General Member", isLeader: false },
  { value: "OTHER", label: "Other Committee Member", isLeader: false },
];

export function AdminMemberRosters({
  universities = [],
  initialOrgId,
}: AdminMemberRostersProps) {
  const queryClient = useQueryClient();

  // Organizations query state
  const [orgSearch, setOrgSearch] = useState("");
  const [selectedUniId, setSelectedUniId] = useState<string>("ALL");
  const [selectedOrgStatus, setSelectedOrgStatus] = useState<string>("ALL");
  const [selectedOrgId, setSelectedOrgId] = useState<string>(initialOrgId || "");

  // Member roster query state
  const [memberSearch, setMemberSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("ALL");
  const [selectedMemberStatus, setSelectedMemberStatus] = useState<string>("ALL");
  const [memberPage, setMemberPage] = useState(1);
  const [memberLimit] = useState(15);
  const [memberSortBy, setMemberSortBy] = useState<string>("joinedAt");
  const [memberSortOrder, setMemberSortOrder] = useState<"asc" | "desc">("desc");

  // Modal dialog states
  const [inspectMember, setInspectMember] = useState<OrganizationMemberRosterItem | null>(null);
  const [editRoleMember, setEditRoleMember] = useState<OrganizationMemberRosterItem | null>(null);
  const [editRoleValue, setEditRoleValue] = useState<string>("MEMBER");
  const [editStatusValue, setEditStatusValue] = useState<string>("ACTIVE");
  const [editTitleValue, setEditTitleValue] = useState<string>("");
  const [editCanCreateEvents, setEditCanCreateEvents] = useState<boolean>(false);
  const [editReason, setEditReason] = useState<string>("");

  const [removeMemberTarget, setRemoveMemberTarget] = useState<OrganizationMemberRosterItem | null>(null);
  const [removeReason, setRemoveReason] = useState<string>("");

  const [changeOrgStatusTarget, setChangeOrgStatusTarget] = useState<OrganizationRosterItem | null>(null);
  const [newOrgStatus, setNewOrgStatus] = useState<"APPROVED" | "PENDING" | "REJECTED" | "SUSPENDED">("APPROVED");
  const [orgStatusReason, setOrgStatusReason] = useState<string>("");

  // 1. Fetch organizations
  const orgsQuery = useQuery({
    queryKey: [
      "admin",
      "organizations",
      "roster-selector",
      selectedUniId,
      selectedOrgStatus,
      orgSearch,
    ],
    queryFn: () =>
      adminApi.getOrganizations({
        universityId: selectedUniId !== "ALL" ? selectedUniId : undefined,
        status: selectedOrgStatus !== "ALL" ? selectedOrgStatus : undefined,
        search: orgSearch.trim() || undefined,
        limit: 100,
      }),
  });

  const organizations = orgsQuery.data?.data || [];

  // Auto-select first organization if none selected
  React.useEffect(() => {
    const firstId = organizations[0]?.id;
    if (!selectedOrgId && firstId) {
      setSelectedOrgId(firstId);
    }
  }, [selectedOrgId, organizations]);

  // 2. Fetch active organization details & member roster
  const membersQuery = useQuery({
    queryKey: [
      "admin",
      "organization-members",
      selectedOrgId,
      memberSearch,
      selectedRole,
      selectedMemberStatus,
      memberPage,
      memberLimit,
      memberSortBy,
      memberSortOrder,
    ],
    queryFn: () =>
      adminApi.getOrganizationMembers(selectedOrgId, {
        search: memberSearch.trim() || undefined,
        role: selectedRole !== "ALL" ? selectedRole : undefined,
        status: selectedMemberStatus !== "ALL" ? selectedMemberStatus : undefined,
        sortBy: memberSortBy,
        sortOrder: memberSortOrder,
        page: memberPage,
        limit: memberLimit,
      }),
    enabled: Boolean(selectedOrgId),
  });

  const activeOrg = membersQuery.data?.organization || organizations.find((o) => o.id === selectedOrgId);
  const membersList = membersQuery.data?.data || [];
  const totalMembers = membersQuery.data?.total || 0;
  const totalPages = membersQuery.data?.totalPages || 1;
  const leadersCount = membersQuery.data?.leadersCount || 0;
  const activeCount = membersQuery.data?.activeCount || 0;
  const maxLeaders = membersQuery.data?.maxLeaders || 2;

  // 3. Mutations
  const updateMemberMutation = useMutation({
    mutationFn: (vars: {
      orgId: string;
      memberId: string;
      dto: {
        role?: string | undefined;
        status?: string | undefined;
        title?: string | undefined;
        canCreateEvents?: boolean | undefined;
        reason?: string | undefined;
      };
    }) => adminApi.updateOrganizationMemberRole(vars.orgId, vars.memberId, vars.dto),
    onSuccess: (updated) => {
      toast.success(`Role updated for ${updated.user.name}! 🛡️`, {
        description: `Position changed to ${updated.role} (Events: ${updated.canCreateEvents ? "Enabled" : "Disabled"}).`,
      });
      setEditRoleMember(null);
      setEditReason("");
      void queryClient.invalidateQueries({ queryKey: ["admin", "organization-members", selectedOrgId] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "organizations"] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to update member role");
    },
  });

  const removeMemberMutation = useMutation({
    mutationFn: (vars: { orgId: string; memberId: string; reason?: string | undefined }) =>
      adminApi.removeOrganizationMember(vars.orgId, vars.memberId, vars.reason),
    onSuccess: (_, vars) => {
      toast.success("Member removed from society roster", {
        description: "Organization-scoped permissions have been revoked safely.",
      });
      setRemoveMemberTarget(null);
      setRemoveReason("");
      void queryClient.invalidateQueries({ queryKey: ["admin", "organization-members", vars.orgId] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "organizations"] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to remove organization member");
    },
  });

  const updateOrgStatusMutation = useMutation({
    mutationFn: (vars: {
      orgId: string;
      status: "APPROVED" | "PENDING" | "REJECTED" | "SUSPENDED";
      reason?: string | undefined;
    }) => adminApi.updateOrganizationStatus(vars.orgId, vars.status, vars.reason),
    onSuccess: (updated) => {
      toast.success(`Organization status updated to ${updated.status}`, {
        description: `Governance state updated for "${updated.name}".`,
      });
      setChangeOrgStatusTarget(null);
      setOrgStatusReason("");
      void queryClient.invalidateQueries({ queryKey: ["admin", "organization-members", selectedOrgId] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "organizations"] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to update organization status");
    },
  });

  const handleOpenEditRole = (member: OrganizationMemberRosterItem) => {
    setEditRoleMember(member);
    setEditRoleValue(member.role);
    setEditStatusValue(member.status);
    setEditTitleValue(member.title || "");
    setEditCanCreateEvents(Boolean(member.canCreateEvents));
    setEditReason("");
  };

  const handleSaveEditRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editRoleMember || !selectedOrgId) return;

    // Check frontend warning for 2-leader limit
    const isPromotingToLeader =
      ["LEADER", "PRESIDENT", "ADMIN"].includes(editRoleValue) &&
      editStatusValue === "ACTIVE" &&
      !["LEADER", "PRESIDENT", "ADMIN"].includes(editRoleMember.role);

    if (isPromotingToLeader && leadersCount >= maxLeaders) {
      toast.error(
        `Institutional Limit: Organization already has ${leadersCount} active leaders (max ${maxLeaders}). Demote an existing leader before promoting a new one.`,
      );
      return;
    }

    updateMemberMutation.mutate({
      orgId: selectedOrgId,
      memberId: editRoleMember.id,
      dto: {
        role: editRoleValue,
        status: editStatusValue,
        title: editTitleValue.trim() || undefined,
        canCreateEvents: editCanCreateEvents,
        reason: editReason.trim() || undefined,
      },
    });
  };

  const handleConfirmRemoveMember = () => {
    if (!removeMemberTarget || !selectedOrgId) return;
    if (!removeReason.trim()) {
      toast.error("Please provide a justification reason for moderation audit tracking.");
      return;
    }

    removeMemberMutation.mutate({
      orgId: selectedOrgId,
      memberId: removeMemberTarget.id,
      reason: removeReason.trim(),
    });
  };

  const handleConfirmChangeOrgStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!changeOrgStatusTarget) return;

    updateOrgStatusMutation.mutate({
      orgId: changeOrgStatusTarget.id,
      status: newOrgStatus,
      reason: orgStatusReason.trim() || undefined,
    });
  };

  // Compute stats across loaded organizations
  const statsOverview = useMemo(() => {
    const totalOrgs = organizations.length;
    const verifiedOrgs = organizations.filter((o) => o.isVerified && o.status === "APPROVED").length;
    const aggregateMembers = organizations.reduce((acc, o) => acc + (o._count?.members || 0), 0);
    return {
      totalOrgs,
      verifiedOrgs,
      aggregateMembers,
    };
  }, [organizations]);

  return (
    <div className="space-y-6">
      {/* ----------------------------------------------------------------- */}
      {/* Page Header */}
      {/* ----------------------------------------------------------------- */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Building2 className="size-6 text-primary" /> Society Member Rosters & Governance
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Inspect authoritative society membership rosters, adjust committee positions, and enforce the institutional 2-leader limit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => {
              void orgsQuery.refetch();
              if (selectedOrgId) void membersQuery.refetch();
            }}
          >
            <RefreshCw className={cn("size-3.5 mr-1.5", (orgsQuery.isFetching || membersQuery.isFetching) && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Overview Statistics KPI Cards */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Registered Societies"
          value={statsOverview.totalOrgs}
          hint="Total student bodies on platform"
          icon={<Building2 className="size-5 text-primary" />}
        />
        <StatCard
          label="Total Roster Members"
          value={statsOverview.aggregateMembers}
          hint="Enrolled student club members"
          icon={<Users className="size-5 text-emerald-500" />}
        />
        <StatCard
          label="Active Leaders in Society"
          value={`${leadersCount} / ${maxLeaders}`}
          hint={leadersCount >= maxLeaders ? "Maximum leadership capacity" : `${maxLeaders - leadersCount} leadership spot available`}
          icon={<Crown className={cn("size-5", leadersCount >= maxLeaders ? "text-amber-500" : "text-indigo-500")} />}
        />
        <StatCard
          label="Verified Organizations"
          value={statsOverview.verifiedOrgs}
          hint="Officially accredited student clubs"
          icon={<ShieldCheck className="size-5 text-sky-500" />}
        />
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Main Layout: Left Organization Selector + Right Roster Panel */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Organization Directory (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Building className="size-4 text-primary" /> Select Society
              </h2>
              <span className="text-[11px] font-semibold text-muted-foreground">
                {organizations.length} Bodies
              </span>
            </div>

            {/* Filters for Org Selector */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  value={orgSearch}
                  onChange={(e) => setOrgSearch(e.target.value)}
                  placeholder="Search societies..."
                  className="pl-8 text-xs h-8"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={selectedUniId}
                  onChange={(e) => setSelectedUniId(e.target.value)}
                  className="rounded-md border border-input bg-background px-2 py-1.5 text-[11px] font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="ALL">All Universities</option>
                  {universities.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.code || u.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedOrgStatus}
                  onChange={(e) => setSelectedOrgStatus(e.target.value)}
                  className="rounded-md border border-input bg-background px-2 py-1.5 text-[11px] font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="APPROVED">Approved / Active</option>
                  <option value="PENDING">Pending Approval</option>
                  <option value="SUSPENDED">Suspended</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            </div>

            {/* Organization Scrollable List */}
            <div className="max-h-[580px] overflow-y-auto space-y-1.5 pr-1">
              {orgsQuery.isPending ? (
                <RowSkeleton />
              ) : orgsQuery.isError ? (
                <ErrorState onRetry={() => orgsQuery.refetch()} />
              ) : organizations.length === 0 ? (
                <EmptyState
                  icon={<Building2 className="size-6 text-muted-foreground" />}
                  title="No societies found"
                  description="Try adjusting your search or filters."
                />
              ) : (
                organizations.map((org) => {
                  const isSelected = org.id === selectedOrgId;
                  return (
                    <button
                      key={org.id}
                      type="button"
                      onClick={() => {
                        setSelectedOrgId(org.id);
                        setMemberPage(1);
                      }}
                      className={cn(
                        "w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all",
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border/60 bg-card/60 hover:bg-muted/40 hover:border-border",
                      )}
                    >
                      {org.logoUrl ? (
                        <img
                          src={org.logoUrl}
                          alt={org.name}
                          className="size-9 rounded-lg object-cover border border-border shrink-0 mt-0.5"
                        />
                      ) : (
                        <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-navy text-xs font-bold text-navy-foreground mt-0.5">
                          {org.name?.[0]?.toUpperCase() || "S"}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1.5">
                          <p className="font-semibold text-xs text-foreground truncate">{org.name}</p>
                          {org.isVerified && (
                            <ShieldCheck className="size-3.5 text-primary shrink-0" />
                          )}
                        </div>

                        <p className="text-[11px] text-muted-foreground truncate">
                          {org.university?.code || org.university?.name || "Campus-Wide"}
                        </p>

                        <div className="flex items-center gap-2 mt-1.5 text-[10px]">
                          <span
                            className={cn(
                              "rounded px-1.5 py-0.2 font-bold uppercase",
                              org.status === "APPROVED"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : org.status === "SUSPENDED"
                                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                            )}
                          >
                            {org.status}
                          </span>
                          <span className="text-muted-foreground">
                            {org._count?.members ?? 0} members
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Member Roster & Society Detail (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Active Society Card Header */}
          {activeOrg && (
            <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-3.5 min-w-0">
                  {activeOrg.logoUrl ? (
                    <img
                      src={activeOrg.logoUrl}
                      alt={activeOrg.name}
                      className="size-14 rounded-xl object-cover border-2 border-border shrink-0"
                    />
                  ) : (
                    <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-navy text-lg font-bold text-navy-foreground">
                      {activeOrg.name?.[0]?.toUpperCase() || "S"}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-bold text-base text-foreground truncate">{activeOrg.name}</h2>
                      {activeOrg.isVerified && (
                        <span className="flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          <ShieldCheck className="size-3" /> Accredited
                        </span>
                      )}
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                          activeOrg.status === "APPROVED"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : activeOrg.status === "SUSPENDED"
                              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                        )}
                      >
                        {activeOrg.status}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground mt-0.5">
                      {activeOrg.university?.name || "Campus-Wide Institution"} • Established {formatDate(activeOrg.createdAt)}
                    </p>

                    {activeOrg.description && (
                      <p className="text-xs text-foreground/80 mt-1 line-clamp-2">
                        {activeOrg.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Society Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => {
                      setChangeOrgStatusTarget(activeOrg);
                      setNewOrgStatus(activeOrg.status);
                      setOrgStatusReason("");
                    }}
                  >
                    Change Status
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="h-8 text-xs">
                    <a href={`/organizations/${activeOrg.slug}`} target="_blank" rel="noreferrer">
                      <ExternalLink className="size-3.5 mr-1" /> Public Page
                    </a>
                  </Button>
                </div>
              </div>

              {/* Leadership Capacity Alert Bar */}
              <div
                className={cn(
                  "flex items-center justify-between rounded-lg p-3 text-xs border",
                  leadersCount >= maxLeaders
                    ? "border-amber-500/30 bg-amber-500/5 text-amber-900 dark:text-amber-200"
                    : "border-indigo-500/30 bg-indigo-500/5 text-indigo-900 dark:text-indigo-200",
                )}
              >
                <div className="flex items-center gap-2">
                  <Crown className="size-4 shrink-0" />
                  <span>
                    <strong>Leadership Quota:</strong> {leadersCount} of {maxLeaders} active leadership seats assigned.
                  </span>
                </div>
                <span className="text-[11px] font-semibold opacity-90">
                  {leadersCount >= maxLeaders ? "Ceiling Reached" : `${maxLeaders - leadersCount} Available`}
                </span>
              </div>
            </div>
          )}

          {/* Member Search & Filter Bar */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  value={memberSearch}
                  onChange={(e) => {
                    setMemberSearch(e.target.value);
                    setMemberPage(1);
                  }}
                  placeholder="Search roster by student name or email..."
                  className="pl-8 text-xs h-9"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <select
                  value={selectedRole}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    setMemberPage(1);
                  }}
                  className="rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary h-9"
                >
                  <option value="ALL">All Roles</option>
                  {ORG_ROLE_OPTIONS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedMemberStatus}
                  onChange={(e) => {
                    setSelectedMemberStatus(e.target.value);
                    setMemberPage(1);
                  }}
                  className="rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary h-9"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="PENDING">Pending</option>
                  <option value="SUSPENDED">Suspended</option>
                  <option value="REJECTED">Rejected</option>
                </select>

                {(memberSearch || selectedRole !== "ALL" || selectedMemberStatus !== "ALL") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 text-xs"
                    onClick={() => {
                      setMemberSearch("");
                      setSelectedRole("ALL");
                      setSelectedMemberStatus("ALL");
                      setMemberPage(1);
                    }}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>

            {/* Roster Table */}
            {membersQuery.isPending ? (
              <RowSkeleton />
            ) : membersQuery.isError ? (
              <ErrorState onRetry={() => membersQuery.refetch()} />
            ) : membersList.length === 0 ? (
              <EmptyState
                icon={<Users className="size-8 text-muted-foreground" />}
                title="No members match criteria"
                description={
                  memberSearch || selectedRole !== "ALL"
                    ? "Try adjusting your search or role filters."
                    : "This organization currently has no registered members."
                }
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Member & Identity</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Title / Office</th>
                      <th className="p-3">Event Rights</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Joined</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {membersList.map((m) => {
                      const isLeader = ["LEADER", "PRESIDENT", "ADMIN"].includes(m.role);
                      const isEventOrganizing = Boolean(m.canCreateEvents);

                      return (
                        <tr key={m.id} className="hover:bg-muted/30 transition-colors">
                          {/* Member Info */}
                          <td className="p-3">
                            <div className="flex items-center gap-2.5">
                              {m.user?.avatarUrl ? (
                                <img
                                  src={m.user.avatarUrl}
                                  alt={m.user.name}
                                  className="size-8 rounded-full object-cover border border-border shrink-0"
                                />
                              ) : (
                                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-navy-foreground">
                                  {m.user?.name?.[0]?.toUpperCase() || "M"}
                                </div>
                              )}
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <p className="font-semibold text-foreground truncate">{m.user?.name || "Unknown User"}</p>
                                  {m.isFounder && (
                                    <span className="rounded bg-primary/10 px-1 py-0.2 text-[9px] font-bold text-primary uppercase">
                                      Founder
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-muted-foreground truncate">{m.user?.email}</p>
                                {m.user?.studentProfile?.studentIdNumber && (
                                  <p className="text-[10px] font-mono text-muted-foreground">
                                    ID: {m.user.studentProfile.studentIdNumber}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Role */}
                          <td className="p-3">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                                isLeader
                                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                                  : [
                                      "VICE_PRESIDENT",
                                      "SECRETARY",
                                      "TREASURER",
                                      "EVENT_ORGANIZER",
                                      "EVENT_MANAGER",
                                    ].includes(m.role)
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "bg-muted text-muted-foreground",
                              )}
                            >
                              {isLeader && <Crown className="size-3 shrink-0" />}
                              {m.role}
                            </span>
                          </td>

                          {/* Title / Office */}
                          <td className="p-3">
                            <span className="text-foreground font-medium">
                              {m.title || "—"}
                            </span>
                          </td>

                          {/* Event Rights */}
                          <td className="p-3">
                            {isEventOrganizing ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="size-3" /> Can Publish
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                                <XCircle className="size-3" /> None
                              </span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="p-3">
                            <span
                              className={cn(
                                "rounded px-2 py-0.5 text-[10px] font-bold uppercase",
                                m.status === "ACTIVE"
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                  : m.status === "SUSPENDED"
                                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                              )}
                            >
                              {m.status}
                            </span>
                          </td>

                          {/* Joined */}
                          <td className="p-3 text-muted-foreground whitespace-nowrap">
                            {formatDate(m.joinedAt)}
                          </td>

                          {/* Actions */}
                          <td className="p-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="size-7">
                                  <MoreVertical className="size-3.5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-44 text-xs">
                                <DropdownMenuLabel>Member Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => setInspectMember(m)}>
                                  <Eye className="size-3.5 mr-2" /> Inspect Identity
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleOpenEditRole(m)}>
                                  <Edit className="size-3.5 mr-2" /> Edit Role & Rights
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => {
                                    setRemoveMemberTarget(m);
                                    setRemoveReason("");
                                  }}
                                >
                                  <Trash2 className="size-3.5 mr-2" /> Remove Member
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                <span>
                  Showing {(memberPage - 1) * memberLimit + 1} to{" "}
                  {Math.min(memberPage * memberLimit, totalMembers)} of {totalMembers} members
                </span>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7"
                    disabled={memberPage <= 1}
                    onClick={() => setMemberPage((p) => Math.max(p - 1, 1))}
                  >
                    <ChevronLeft className="size-3.5" />
                  </Button>
                  <span className="px-2 text-xs font-semibold text-foreground">
                    {memberPage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7"
                    disabled={memberPage >= totalPages}
                    onClick={() => setMemberPage((p) => Math.min(p + 1, totalPages))}
                  >
                    <ChevronRight className="size-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* DIALOG: Edit Member Role & Governance Status */}
      {/* ----------------------------------------------------------------- */}
      <Dialog open={!!editRoleMember} onOpenChange={(open) => !open && setEditRoleMember(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="size-5 text-primary" /> Adjust Member Role & Privileges
            </DialogTitle>
            <DialogDescription>
              Modify committee positioning in <strong>{activeOrg?.name}</strong>. Enforces the institutional 2-leader limit.
            </DialogDescription>
          </DialogHeader>

          {editRoleMember && (
            <form onSubmit={handleSaveEditRole} className="space-y-3.5 py-2 text-xs">
              <div className="rounded-lg border border-border bg-muted/30 p-3 flex items-center gap-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-navy-foreground">
                  {editRoleMember.user?.name?.[0]?.toUpperCase() || "M"}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{editRoleMember.user?.name}</p>
                  <p className="text-[11px] text-muted-foreground">{editRoleMember.user?.email}</p>
                </div>
              </div>

              {/* 2-Leader Warning indicator in dialog */}
              {["LEADER", "PRESIDENT", "ADMIN"].includes(editRoleValue) && (
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 text-amber-900 dark:text-amber-200">
                  <p className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="size-3.5 shrink-0" /> Leadership Governance Rule
                  </p>
                  <p className="text-[11px] mt-0.5">
                    Promoting to a Leader role consumes a leadership seat. Currently {leadersCount} of {maxLeaders} seats are assigned in this organization.
                  </p>
                </div>
              )}

              <div className="space-y-1">
                <Label className="text-xs">Committee Role</Label>
                <select
                  required
                  value={editRoleValue}
                  onChange={(e) => setEditRoleValue(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {ORG_ROLE_OPTIONS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Membership Status</Label>
                <select
                  required
                  value={editStatusValue}
                  onChange={(e) => setEditStatusValue(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="ACTIVE">ACTIVE (Full Membership Rights)</option>
                  <option value="PENDING">PENDING (Awaiting Review)</option>
                  <option value="SUSPENDED">SUSPENDED (Temporarily Disabled)</option>
                  <option value="REJECTED">REJECTED (Declined Admission)</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Custom Title / Office (Optional)</Label>
                <Input
                  value={editTitleValue}
                  onChange={(e) => setEditTitleValue(e.target.value)}
                  placeholder="e.g. Vice President 2026, Head of Logistics"
                  className="text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="canCreateEventsToggle"
                  checked={editCanCreateEvents}
                  onChange={(e) => setEditCanCreateEvents(e.target.checked)}
                  className="rounded border-input text-primary focus:ring-primary size-4"
                />
                <Label htmlFor="canCreateEventsToggle" className="text-xs font-normal cursor-pointer">
                  Grant event creation and draft submission permissions
                </Label>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Reason / Audit Log Justification</Label>
                <Textarea
                  value={editReason}
                  onChange={(e) => setEditReason(e.target.value)}
                  placeholder="Reason for changing member role..."
                  className="text-xs"
                  rows={2}
                />
              </div>

              <DialogFooter className="pt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditRoleMember(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={updateMemberMutation.isPending}
                >
                  {updateMemberMutation.isPending ? "Updating..." : "Save Role & Permissions"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ----------------------------------------------------------------- */}
      {/* DIALOG: Inspect Member Identity */}
      {/* ----------------------------------------------------------------- */}
      <Dialog open={!!inspectMember} onOpenChange={(open) => !open && setInspectMember(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="size-5 text-primary" /> Member Profile Inspection
            </DialogTitle>
            <DialogDescription>
              Institutional student verification and membership records.
            </DialogDescription>
          </DialogHeader>

          {inspectMember && (
            <div className="space-y-4 py-2 text-xs">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3.5">
                {inspectMember.user?.avatarUrl ? (
                  <img
                    src={inspectMember.user.avatarUrl}
                    alt={inspectMember.user.name}
                    className="size-12 rounded-full object-cover border-2 border-border"
                  />
                ) : (
                  <div className="grid size-12 place-items-center rounded-full bg-navy text-sm font-bold text-navy-foreground">
                    {inspectMember.user?.name?.[0]?.toUpperCase() || "M"}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-sm text-foreground">{inspectMember.user?.name}</h3>
                  <p className="text-muted-foreground">{inspectMember.user?.email}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="rounded bg-primary/10 px-1.5 py-0.2 text-[9px] font-bold text-primary uppercase">
                      {inspectMember.role}
                    </span>
                    <span className="rounded bg-muted px-1.5 py-0.2 text-[9px] font-bold uppercase">
                      {inspectMember.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border p-3 space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Student ID</p>
                  <p className="font-semibold text-foreground">
                    {inspectMember.user?.studentProfile?.studentIdNumber || "Not recorded"}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-3 space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Academic Year</p>
                  <p className="font-semibold text-foreground">
                    {inspectMember.user?.studentProfile?.academicYear || "Undergraduate"}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-3 space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Faculty</p>
                  <p className="font-semibold text-foreground">
                    {inspectMember.user?.studentProfile?.faculty?.name || "Campus-Wide"}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-3 space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Department</p>
                  <p className="font-semibold text-foreground">
                    {inspectMember.user?.studentProfile?.department?.name || "General"}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-border p-3 space-y-1.5">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Enrolled Date:</span>
                  <span className="font-semibold text-foreground">{formatDate(inspectMember.joinedAt)}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Custom Office Title:</span>
                  <span className="font-semibold text-foreground">{inspectMember.title || "None"}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Event Publishing Rights:</span>
                  <span className="font-semibold text-foreground">
                    {inspectMember.canCreateEvents ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setInspectMember(null)}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    const m = inspectMember;
                    setInspectMember(null);
                    handleOpenEditRole(m);
                  }}
                >
                  <Edit className="size-3.5 mr-1.5" /> Edit Role
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ----------------------------------------------------------------- */}
      {/* DIALOG: Remove Member with Moderation Justification */}
      {/* ----------------------------------------------------------------- */}
      <Dialog open={!!removeMemberTarget} onOpenChange={(open) => !open && setRemoveMemberTarget(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <UserX className="size-5" /> Remove Member from Society
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove <strong>{removeMemberTarget?.user?.name}</strong> from{" "}
              <strong>{activeOrg?.name}</strong>?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs">
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-destructive">
              <p className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="size-3.5 shrink-0" /> Permission Revocation Notice
              </p>
              <p className="text-[11px] mt-0.5">
                Removing this member will immediately revoke all their organization-scoped leadership permissions and draft event management capabilities in this society.
              </p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">
                Justification / Moderation Reason <span className="text-destructive">*</span>
              </Label>
              <Textarea
                required
                value={removeReason}
                onChange={(e) => setRemoveReason(e.target.value)}
                placeholder="State the reason for removing this member (recorded in audit logs)..."
                className="text-xs"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setRemoveMemberTarget(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={removeMemberMutation.isPending || !removeReason.trim()}
              onClick={handleConfirmRemoveMember}
            >
              {removeMemberMutation.isPending ? "Removing..." : "Confirm Member Removal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ----------------------------------------------------------------- */}
      {/* DIALOG: Change Organization Status */}
      {/* ----------------------------------------------------------------- */}
      <Dialog open={!!changeOrgStatusTarget} onOpenChange={(open) => !open && setChangeOrgStatusTarget(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldAlert className="size-5 text-primary" /> Society Governance Status
            </DialogTitle>
            <DialogDescription>
              Update platform operating status for <strong>{changeOrgStatusTarget?.name}</strong>.
            </DialogDescription>
          </DialogHeader>

          {changeOrgStatusTarget && (
            <form onSubmit={handleConfirmChangeOrgStatus} className="space-y-3.5 py-2 text-xs">
              <div className="space-y-1">
                <Label className="text-xs">Organization Status</Label>
                <select
                  required
                  value={newOrgStatus}
                  onChange={(e) => setNewOrgStatus(e.target.value as any)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="APPROVED">APPROVED (Active & Operational)</option>
                  <option value="SUSPENDED">SUSPENDED (Temporarily Frozen)</option>
                  <option value="PENDING">PENDING (Under Review)</option>
                  <option value="REJECTED">REJECTED (Declined Accreditation)</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Reason / Audit Notes (Optional)</Label>
                <Textarea
                  value={orgStatusReason}
                  onChange={(e) => setOrgStatusReason(e.target.value)}
                  placeholder="Explain status update justification..."
                  className="text-xs"
                  rows={2}
                />
              </div>

              <DialogFooter className="pt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setChangeOrgStatusTarget(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={updateOrgStatusMutation.isPending}
                >
                  {updateOrgStatusMutation.isPending ? "Updating..." : "Update Status"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
