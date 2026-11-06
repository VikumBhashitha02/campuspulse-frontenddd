import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Megaphone,
  CheckCircle2,
  Clock,
  FileText,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Send,
  Archive,
  RefreshCw,
  Plus,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Building2,
  Users,
  Calendar,
  Sparkles,
  AlertTriangle,
  History,
  Check,
  X,
  Radio,
  Flame,
  Globe,
  GraduationCap,
  Briefcase,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminApi,
  type AnnouncementItem,
  type AnnouncementStats,
  type AnnouncementListResponse,
  type AnnouncementDetailResponse,
} from "@/lib/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import { PageHeader, RowSkeleton, ErrorState, EmptyState } from "@/components/common/States";

interface AdminAnnouncementsProps {
  universities?: Array<{ id: string; name: string; code?: string; shortName?: string }> | undefined;
}

export function AdminAnnouncements({ universities = [] }: AdminAnnouncementsProps) {
  const queryClient = useQueryClient();

  // Query universities for audience targeting dropdown
  const universitiesListQuery = useQuery({
    queryKey: ["admin", "universities", "dropdown"],
    queryFn: () => adminApi.getUniversities({ limit: 100 }),
    enabled: universities.length === 0,
  });

  const availableUniversities = useMemo(() => {
    if (universities && universities.length > 0) return universities;
    return (universitiesListQuery.data?.data || []).map((u: any) => ({
      id: u.id,
      name: u.name,
      code: u.code || u.shortName || u.name,
    }));
  }, [universities, universitiesListQuery.data]);

  // Filters & Pagination State
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | "PUBLISHED" | "SCHEDULED" | "DRAFT" | "EXPIRED">("ALL");
  const [priority, setPriority] = useState<string>("ALL");
  const [targetAudience, setTargetAudience] = useState<string>("ALL");
  const [universityId, setUniversityId] = useState<string>("ALL");
  const [roleTarget, setRoleTarget] = useState<string>("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState<string>("startsAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Dialog & Modal States
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<AnnouncementItem | null>(null);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AnnouncementItem | null>(null);
  const [archiveTarget, setArchiveTarget] = useState<AnnouncementItem | null>(null);
  const [publishTarget, setPublishTarget] = useState<AnnouncementItem | null>(null);

  // Form Fields State
  const [formTitle, setFormTitle] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formAudience, setFormAudience] = useState<string>("ALL");
  const [formUniversityId, setFormUniversityId] = useState<string>("");
  const [formRoleTarget, setFormRoleTarget] = useState<string>("");
  const [formPriority, setFormPriority] = useState<string>("NORMAL");
  const [formLinkUrl, setFormLinkUrl] = useState<string>("");
  const [formIsActive, setFormIsActive] = useState<boolean>(true);
  const [formStartsAt, setFormStartsAt] = useState<string>("");
  const [formExpiresAt, setFormExpiresAt] = useState<string>("");
  const [formSendEmail, setFormSendEmail] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"compose" | "preview">("compose");

  // Reset form fields
  const resetForm = () => {
    setFormTitle("");
    setFormMessage("");
    setFormAudience("ALL");
    setFormUniversityId("");
    setFormRoleTarget("");
    setFormPriority("NORMAL");
    setFormLinkUrl("");
    setFormIsActive(true);
    setFormStartsAt("");
    setFormExpiresAt("");
    setFormSendEmail(false);
    setActiveTab("compose");
  };

  // Open Create Dialog
  const handleOpenCreate = () => {
    resetForm();
    setEditingAnnouncement(null);
    setCreateDialogOpen(true);
  };

  // Open Edit Dialog
  const handleOpenEdit = (ann: AnnouncementItem) => {
    setEditingAnnouncement(ann);
    setFormTitle(ann.title);
    setFormMessage(ann.message);
    setFormAudience(ann.targetAudience);
    setFormUniversityId(ann.universityId || "");
    setFormRoleTarget(ann.roleTarget || "");
    setFormPriority(ann.priority);
    setFormLinkUrl(ann.linkUrl || "");
    setFormIsActive(ann.isActive);
    setFormStartsAt(ann.startsAt ? new Date(ann.startsAt).toISOString().slice(0, 16) : "");
    setFormExpiresAt(ann.expiresAt ? new Date(ann.expiresAt).toISOString().slice(0, 16) : "");
    setFormSendEmail(false);
    setActiveTab("compose");
    setCreateDialogOpen(true);
  };

  // 1. Fetch KPI Statistics Query
  const statsQuery = useQuery<AnnouncementStats>({
    queryKey: ["admin", "announcements", "stats"],
    queryFn: () => adminApi.getAnnouncementStats(),
    refetchInterval: 30000,
  });

  // 2. Fetch Announcements List Query
  const announcementsQuery = useQuery<AnnouncementListResponse>({
    queryKey: [
      "admin",
      "announcements",
      {
        search,
        status,
        priority: priority === "ALL" ? undefined : priority,
        targetAudience: targetAudience === "ALL" ? undefined : targetAudience,
        universityId: universityId === "ALL" ? undefined : universityId,
        roleTarget: roleTarget === "ALL" ? undefined : roleTarget,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        sortBy,
        sortOrder,
        page,
        limit: pageSize,
      },
    ],
    queryFn: () =>
      adminApi.getAnnouncements({
        search: search.trim() || undefined,
        status: status === "ALL" ? undefined : status,
        priority: priority === "ALL" ? undefined : priority,
        targetAudience: targetAudience === "ALL" ? undefined : targetAudience,
        universityId: universityId === "ALL" ? undefined : universityId,
        roleTarget: roleTarget === "ALL" ? undefined : roleTarget,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        sortBy,
        sortOrder,
        page,
        limit: pageSize,
      }),
  });

  // 3. Fetch Announcement Details Query (Modal)
  const detailQuery = useQuery<AnnouncementDetailResponse>({
    queryKey: ["admin", "announcements", "detail", selectedAnnouncementId],
    queryFn: () => adminApi.getAnnouncementDetails(selectedAnnouncementId!),
    enabled: !!selectedAnnouncementId,
  });

  // 4. Create / Update Mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!formTitle.trim()) throw new Error("Announcement title is required.");
      if (!formMessage.trim()) throw new Error("Announcement message body is required.");
      if (formAudience === "UNIVERSITY" && !formUniversityId) {
        throw new Error("Target University must be selected when audience is UNIVERSITY.");
      }

      if (editingAnnouncement) {
        return adminApi.updateAnnouncement(editingAnnouncement.id, {
          title: formTitle,
          message: formMessage,
          targetAudience: formAudience,
          universityId: formAudience === "UNIVERSITY" ? formUniversityId : null,
          roleTarget: formRoleTarget || null,
          priority: formPriority,
          linkUrl: formLinkUrl || null,
          isActive: formIsActive,
          startsAt: formStartsAt ? new Date(formStartsAt).toISOString() : undefined,
          expiresAt: formExpiresAt ? new Date(formExpiresAt).toISOString() : null,
        });
      } else {
        return adminApi.createAnnouncement({
          title: formTitle,
          message: formMessage,
          targetAudience: formAudience,
          universityId: formAudience === "UNIVERSITY" ? formUniversityId : undefined,
          roleTarget: formRoleTarget || undefined,
          priority: formPriority,
          linkUrl: formLinkUrl || undefined,
          isActive: formIsActive,
          startsAt: formStartsAt ? new Date(formStartsAt).toISOString() : undefined,
          expiresAt: formExpiresAt ? new Date(formExpiresAt).toISOString() : undefined,
          sendEmailNotification: formSendEmail,
        });
      }
    },
    onSuccess: () => {
      toast.success(
        editingAnnouncement
          ? "Announcement updated successfully."
          : "Announcement broadcast created successfully."
      );
      setCreateDialogOpen(false);
      resetForm();
      void queryClient.invalidateQueries({ queryKey: ["admin", "announcements"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to save announcement.");
    },
  });

  // 5. Publish Mutation
  const publishMutation = useMutation({
    mutationFn: (id: string) => adminApi.publishAnnouncement(id),
    onSuccess: () => {
      toast.success("Announcement published immediately.");
      setPublishTarget(null);
      void queryClient.invalidateQueries({ queryKey: ["admin", "announcements"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to publish announcement.");
    },
  });

  // 6. Archive Mutation
  const archiveMutation = useMutation({
    mutationFn: (id: string) => adminApi.archiveAnnouncement(id),
    onSuccess: () => {
      toast.success("Announcement unshared/archived.");
      setArchiveTarget(null);
      void queryClient.invalidateQueries({ queryKey: ["admin", "announcements"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to archive announcement.");
    },
  });

  // 7. Toggle Mutation
  const toggleMutation = useMutation({
    mutationFn: (id: string) => adminApi.toggleAnnouncement(id),
    onSuccess: (updated) => {
      toast.success(
        updated.isActive
          ? "Announcement activated successfully."
          : "Announcement deactivated."
      );
      void queryClient.invalidateQueries({ queryKey: ["admin", "announcements"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to toggle announcement state.");
    },
  });

  // 8. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteAnnouncement(id),
    onSuccess: () => {
      toast.success("Announcement deleted permanently.");
      setDeleteTarget(null);
      void queryClient.invalidateQueries({ queryKey: ["admin", "announcements"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete announcement.");
    },
  });

  const handleResetFilters = () => {
    setSearch("");
    setStatus("ALL");
    setPriority("ALL");
    setTargetAudience("ALL");
    setUniversityId("ALL");
    setRoleTarget("ALL");
    setStartDate("");
    setEndDate("");
    setSortBy("startsAt");
    setSortOrder("desc");
    setPage(1);
  };

  // Helper Badge Renderers
  const getStatusBadge = (computedStatus: string, isActive: boolean) => {
    switch (computedStatus) {
      case "PUBLISHED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Published
          </span>
        );
      case "SCHEDULED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Clock className="size-3" />
            Scheduled
          </span>
        );
      case "DRAFT":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
            <FileText className="size-3" />
            Draft
          </span>
        );
      case "EXPIRED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-zinc-500/10 text-zinc-500 border border-zinc-500/20">
            Expired
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-muted text-muted-foreground">
            {isActive ? "Active" : "Archived"}
          </span>
        );
    }
  };

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case "URGENT":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 uppercase tracking-wider">
            <Flame className="size-3 text-rose-500" />
            Urgent
          </span>
        );
      case "HIGH":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 uppercase tracking-wider">
            <AlertTriangle className="size-3 text-amber-500" />
            High
          </span>
        );
      case "LOW":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/10 text-slate-500 uppercase tracking-wider">
            Low
          </span>
        );
      case "NORMAL":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Normal
          </span>
        );
    }
  };

  const getAudienceDisplay = (ann: AnnouncementItem) => {
    switch (ann.targetAudience) {
      case "ALL":
        return (
          <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
            <Globe className="size-3.5 text-blue-500 shrink-0" />
            <span>All Users (Global)</span>
          </div>
        );
      case "UNIVERSITY":
        return (
          <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
            <Building2 className="size-3.5 text-purple-500 shrink-0" />
            <span className="truncate max-w-[160px]" title={ann.university?.name || "Target University"}>
              {ann.university?.code || ann.university?.name || "University"}
            </span>
          </div>
        );
      case "STUDENTS":
        return (
          <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
            <GraduationCap className="size-3.5 text-emerald-500 shrink-0" />
            <span>Students Only</span>
          </div>
        );
      case "ORGANIZERS":
        return (
          <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
            <Briefcase className="size-3.5 text-amber-500 shrink-0" />
            <span>Organizers Only</span>
          </div>
        );
      case "ADMINS":
        return (
          <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
            <ShieldCheck className="size-3.5 text-indigo-500 shrink-0" />
            <span>Admins Only</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
            <Users className="size-3.5 text-muted-foreground shrink-0" />
            <span>{ann.targetAudience}</span>
          </div>
        );
    }
  };

  const stats = statsQuery.data;

  return (
    <div className="space-y-6">
      {/* 1. Header with Title and Create Action */}
      <PageHeader
        title="Platform Announcements & Broadcasts"
        description="Author, schedule, target, and distribute institutional notices and platform broadcasts to students, society leaders, and university administrators."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                void statsQuery.refetch();
                void announcementsQuery.refetch();
                toast.success("Announcements synchronized.");
              }}
              disabled={announcementsQuery.isFetching}
              className="text-xs"
            >
              <RefreshCw
                className={cn("size-3.5 mr-1.5", announcementsQuery.isFetching && "animate-spin")}
              />
              Refresh
            </Button>
            <Button size="sm" onClick={handleOpenCreate} className="text-xs font-semibold shadow-sm">
              <Plus className="size-3.5 mr-1.5" />
              New Announcement
            </Button>
          </div>
        }
      />

      {/* 2. KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Announcements */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Broadcasts
            </p>
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Megaphone className="size-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-foreground font-mono">
              {statsQuery.isPending ? "..." : (stats?.total || 0).toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">All records</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
            <span>High priority: {stats?.byPriority?.["HIGH"] || 0}</span>
            <span>·</span>
            <span>Urgent: {stats?.byPriority?.["URGENT"] || 0}</span>
          </div>
        </div>

        {/* Published & Active */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-emerald-500/40">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Active / Published
            </p>
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-emerald-600 dark:text-emerald-400 font-mono">
              {statsQuery.isPending ? "..." : (stats?.published || 0).toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">Currently live</span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground truncate">
            Visible in student & organizer feeds
          </p>
        </div>

        {/* Scheduled Future Releases */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-amber-500/40">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Scheduled Queued
            </p>
            <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="size-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-amber-600 dark:text-amber-400 font-mono">
              {statsQuery.isPending ? "..." : (stats?.scheduled || 0).toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">Future release</span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground truncate">
            Automated start date triggers
          </p>
        </div>

        {/* Drafts & Expired */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-purple-500/40">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Drafts & Archived
            </p>
            <div className="flex size-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <FileText className="size-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-purple-600 dark:text-purple-400 font-mono">
              {statsQuery.isPending ? "..." : ((stats?.drafts || 0) + (stats?.expired || 0)).toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">Unpublished</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
            <span>Drafts: {stats?.drafts || 0}</span>
            <span>·</span>
            <span>Expired: {stats?.expired || 0}</span>
          </div>
        </div>
      </div>

      {/* 3. Comprehensive Filter & Search Bar */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-3.5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search announcements by title, message body, or author..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-9 text-xs h-9"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Quick Status Pill Filters */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {(
              [
                { key: "ALL", label: "All" },
                { key: "PUBLISHED", label: "Published" },
                { key: "SCHEDULED", label: "Scheduled" },
                { key: "DRAFT", label: "Drafts" },
                { key: "EXPIRED", label: "Expired" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setStatus(tab.key);
                  setPage(1);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all",
                  status === tab.key
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Detailed Filter Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-2 border-t border-border/50 text-xs">
          {/* Priority */}
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground font-semibold uppercase">Priority</Label>
            <select
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="ALL">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="NORMAL">Normal</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>

          {/* Target Audience */}
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground font-semibold uppercase">Audience</Label>
            <select
              value={targetAudience}
              onChange={(e) => {
                setTargetAudience(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="ALL">All Audiences</option>
              <option value="UNIVERSITY">University Specific</option>
              <option value="STUDENTS">Students Only</option>
              <option value="ORGANIZERS">Organizers Only</option>
              <option value="ADMINS">Admins Only</option>
            </select>
          </div>

          {/* University Filter */}
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground font-semibold uppercase">Campus</Label>
            <select
              value={universityId}
              onChange={(e) => {
                setUniversityId(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="ALL">All Campuses</option>
              {availableUniversities.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.code || u.name}
                </option>
              ))}
            </select>
          </div>

          {/* From Date */}
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground font-semibold uppercase">From Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setPage(1);
              }}
              className="h-8 text-xs px-2"
            />
          </div>

          {/* To Date */}
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground font-semibold uppercase">To Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setPage(1);
              }}
              className="h-8 text-xs px-2"
            />
          </div>

          {/* Sort & Reset */}
          <div className="flex items-end gap-1.5">
            <div className="flex-1 space-y-1">
              <Label className="text-[10px] text-muted-foreground font-semibold uppercase">Sort</Label>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [f = "startsAt", o = "desc"] = e.target.value.split("-");
                  setSortBy(f);
                  setSortOrder((o as "asc" | "desc") || "desc");
                }}
                className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="startsAt-desc">Newest First</option>
                <option value="startsAt-asc">Oldest First</option>
                <option value="priority-desc">Highest Priority</option>
                <option value="title-asc">Title (A-Z)</option>
              </select>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              title="Reset all filters"
              className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* 4. Announcements Data Table & Feed */}
      {announcementsQuery.isPending ? (
        <RowSkeleton />
      ) : announcementsQuery.isError ? (
        <ErrorState onRetry={() => announcementsQuery.refetch()} />
      ) : !announcementsQuery.data?.data || announcementsQuery.data.data.length === 0 ? (
        <EmptyState
          icon={<Megaphone className="size-6 text-muted-foreground" />}
          title="No platform announcements found"
          description={
            search || status !== "ALL" || priority !== "ALL" || targetAudience !== "ALL"
              ? "No announcements matched your selected filters. Try clearing search or filter criteria."
              : "No announcements have been created yet. Click 'New Announcement' to publish your first broadcast."
          }
          action={
            <Button
              size="sm"
              onClick={search || status !== "ALL" ? handleResetFilters : handleOpenCreate}
            >
              {search || status !== "ALL" ? "Reset Filters" : "Create Announcement"}
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5 pl-4">Announcement</th>
                    <th className="p-3.5">Audience & Campus</th>
                    <th className="p-3.5">Priority</th>
                    <th className="p-3.5">Schedule / Expiry</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Author</th>
                    <th className="p-3.5 pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {announcementsQuery.data.data.map((ann) => (
                    <tr
                      key={ann.id}
                      className="hover:bg-muted/30 transition-colors group cursor-pointer"
                      onClick={() => setSelectedAnnouncementId(ann.id)}
                    >
                      {/* Title & Preview */}
                      <td className="p-3.5 pl-4 max-w-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                              {ann.title}
                            </span>
                            {ann.linkUrl && (
                              <a
                                href={ann.linkUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-muted-foreground hover:text-primary transition-colors"
                                title={`External Link: ${ann.linkUrl}`}
                              >
                                <ExternalLink className="size-3" />
                              </a>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1 font-normal">
                            {ann.message}
                          </p>
                        </div>
                      </td>

                      {/* Audience */}
                      <td className="p-3.5">
                        <div className="space-y-0.5">
                          {getAudienceDisplay(ann)}
                          {ann.roleTarget && (
                            <span className="inline-block text-[10px] text-muted-foreground font-mono">
                              Role: {ann.roleTarget}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Priority */}
                      <td className="p-3.5 whitespace-nowrap">
                        {getPriorityBadge(ann.priority)}
                      </td>

                      {/* Dates */}
                      <td className="p-3.5 whitespace-nowrap text-muted-foreground">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1 font-medium text-foreground text-[11px]">
                            <Calendar className="size-3 text-muted-foreground" />
                            <span>{formatDate(ann.startsAt)}</span>
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {ann.expiresAt ? `Expires: ${formatDate(ann.expiresAt)}` : "Permanent notice"}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-3.5 whitespace-nowrap">
                        {getStatusBadge(ann.computedStatus, ann.isActive)}
                      </td>

                      {/* Author */}
                      <td className="p-3.5 whitespace-nowrap text-muted-foreground">
                        <div className="text-[11px] font-medium text-foreground">
                          {ann.createdBy?.name || "Platform Admin"}
                        </div>
                        <div className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                          {ann.createdBy?.email || "System"}
                        </div>
                      </td>

                      {/* Actions Menu */}
                      <td
                        className="p-3.5 pr-4 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedAnnouncementId(ann.id)}
                            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                            title="Inspect reach and audit log"
                          >
                            <Eye className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEdit(ann)}
                            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                            title="Edit announcement"
                          >
                            <Edit className="size-3.5" />
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 px-2 text-xs font-semibold">
                                Manage
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 text-xs">
                              <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                Broadcast Controls
                              </DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => setSelectedAnnouncementId(ann.id)}>
                                <Eye className="size-3.5 mr-2 text-muted-foreground" />
                                View Details & Reach
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenEdit(ann)}>
                                <Edit className="size-3.5 mr-2 text-muted-foreground" />
                                Edit Content
                              </DropdownMenuItem>

                              {ann.computedStatus !== "PUBLISHED" && (
                                <DropdownMenuItem onClick={() => setPublishTarget(ann)}>
                                  <Send className="size-3.5 mr-2 text-emerald-500" />
                                  Publish Immediately
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuItem
                                onClick={() => {
                                  toggleMutation.mutate(ann.id);
                                }}
                              >
                                {ann.isActive ? (
                                  <>
                                    <Archive className="size-3.5 mr-2 text-amber-500" />
                                    Deactivate / Hide
                                  </>
                                ) : (
                                  <>
                                    <Check className="size-3.5 mr-2 text-emerald-500" />
                                    Activate Broadcast
                                  </>
                                )}
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                onClick={() => setDeleteTarget(ann)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="size-3.5 mr-2" />
                                Delete Announcement
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Metadata */}
            <div className="border-t border-border bg-muted/20 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
              <div>
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {Math.min(
                    (announcementsQuery.data.page - 1) * announcementsQuery.data.limit + 1,
                    announcementsQuery.data.total
                  )}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-foreground">
                  {Math.min(
                    announcementsQuery.data.page * announcementsQuery.data.limit,
                    announcementsQuery.data.total
                  )}
                </span>{" "}
                of <span className="font-semibold text-foreground">{announcementsQuery.data.total}</span> announcements
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="h-8 text-xs"
                >
                  Previous
                </Button>
                <span className="text-xs font-medium text-foreground px-2">
                  Page {page} of {announcementsQuery.data.totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(announcementsQuery.data.totalPages, p + 1))}
                  disabled={page >= announcementsQuery.data.totalPages}
                  className="h-8 text-xs"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. CREATE & EDIT ANNOUNCEMENT DIALOG WITH LIVE PREVIEW */}
      {/* ========================================================================= */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Megaphone className="size-5 text-primary" />
              {editingAnnouncement ? "Edit Announcement Broadcast" : "New Platform Announcement"}
            </DialogTitle>
            <DialogDescription>
              Broadcast important notices, system updates, or emergency information to university members.
            </DialogDescription>
          </DialogHeader>

          {/* Form / Preview Tabs */}
          <div className="flex border-b border-border text-xs mb-4">
            <button
              type="button"
              onClick={() => setActiveTab("compose")}
              className={cn(
                "pb-2.5 px-3 font-semibold transition-all border-b-2",
                activeTab === "compose"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Compose & Settings
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={cn(
                "pb-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5",
                activeTab === "preview"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="size-3.5" />
              Live User Preview
            </button>
          </div>

          {activeTab === "compose" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveMutation.mutate();
              }}
              className="space-y-4 text-xs"
            >
              {/* Title */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Announcement Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  required
                  placeholder="e.g. Annual Inter-University Hackathon 2026 Registration Open"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="text-xs"
                />
              </div>

              {/* Message Body */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Message / Details <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  required
                  rows={4}
                  placeholder="Write clear and informative details for the audience..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="text-xs font-sans leading-relaxed"
                />
              </div>

              {/* Audience & Scope */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Target Audience</Label>
                  <select
                    value={formAudience}
                    onChange={(e) => setFormAudience(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus:ring-1 focus:ring-primary"
                  >
                    <option value="ALL">All Platform Users (Global)</option>
                    <option value="UNIVERSITY">Specific University Campus</option>
                    <option value="STUDENTS">Undergraduates & Students Only</option>
                    <option value="ORGANIZERS">Society Leaders & Organizers Only</option>
                    <option value="ADMINS">Campus Administrators Only</option>
                  </select>
                </div>

                {formAudience === "UNIVERSITY" && (
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">
                      Target Campus <span className="text-destructive">*</span>
                    </Label>
                    <select
                      required
                      value={formUniversityId}
                      onChange={(e) => setFormUniversityId(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Select University...</option>
                      {availableUniversities.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name} ({u.code})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Priority Level</Label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus:ring-1 focus:ring-primary"
                  >
                    <option value="LOW">Low (General FYI)</option>
                    <option value="NORMAL">Normal (Standard broadcast)</option>
                    <option value="HIGH">High (Important campus notice)</option>
                    <option value="URGENT">Urgent (Immediate attention)</option>
                  </select>
                </div>
              </div>

              {/* Action Link */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Call to Action / Link URL (Optional)</Label>
                <Input
                  type="url"
                  placeholder="https://campuspulse.lk/events/hackathon-2026 or https://uoc.lk/notice"
                  value={formLinkUrl}
                  onChange={(e) => setFormLinkUrl(e.target.value)}
                  className="text-xs font-mono"
                />
              </div>

              {/* Scheduling & Expiry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-border">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">
                    Publication / Start Time (Optional)
                  </Label>
                  <Input
                    type="datetime-local"
                    value={formStartsAt}
                    onChange={(e) => setFormStartsAt(e.target.value)}
                    className="text-xs"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Leave blank to publish immediately upon saving.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Expiration Time (Optional)</Label>
                  <Input
                    type="datetime-local"
                    value={formExpiresAt}
                    onChange={(e) => setFormExpiresAt(e.target.value)}
                    className="text-xs"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Announcement will automatically hide after this date.
                  </p>
                </div>
              </div>

              {/* Active Toggle & Email Dispatch */}
              <div className="space-y-3 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-foreground">Active Status</span>
                    <p className="text-[10px] text-muted-foreground">
                      Enable to make this announcement active and discoverable.
                    </p>
                  </div>
                  <Switch checked={formIsActive} onCheckedChange={setFormIsActive} />
                </div>

                {!editingAnnouncement && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 font-semibold text-primary">
                        <Send className="size-3.5" />
                        <span>Send Email Notification Dispatch</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        Queues reliable email broadcast via Brevo to registered users in target scope.
                      </p>
                    </div>
                    <Switch checked={formSendEmail} onCheckedChange={setFormSendEmail} />
                  </div>
                )}
              </div>

              <DialogFooter className="pt-3 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateDialogOpen(false)}
                  disabled={saveMutation.isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saveMutation.isPending} className="font-semibold">
                  {saveMutation.isPending
                    ? "Saving..."
                    : editingAnnouncement
                    ? "Save Changes"
                    : "Create Announcement"}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            /* Live User Preview Tab */
            <div className="space-y-4 py-2">
              <div className="p-3 rounded-lg bg-muted/40 border border-border text-xs text-muted-foreground">
                This preview reflects how the announcement banner card appears in the Student Workspace and Organizer Workspace dashboards.
              </div>

              {/* Mock Banner Card */}
              <div
                className={cn(
                  "p-4 rounded-xl border shadow-sm transition-all space-y-3",
                  formPriority === "URGENT"
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100"
                    : formPriority === "HIGH"
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100"
                    : "bg-card border-border text-card-foreground"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(formPriority)}
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Audience: {formAudience}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-foreground mt-1">
                      {formTitle || "Announcement Title Preview"}
                    </h3>
                  </div>
                  <Megaphone className="size-5 text-primary shrink-0 opacity-80" />
                </div>

                <p className="text-xs leading-relaxed whitespace-pre-wrap text-foreground/90">
                  {formMessage || "Your formatted announcement message body will be rendered here for users."}
                </p>

                {formLinkUrl && (
                  <div className="pt-2 border-t border-border/50">
                    <a
                      href={formLinkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      <span>Learn More / Open Resource</span>
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                )}

                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Broadcast by University Administration</span>
                  <span>
                    Starts: {formStartsAt ? formatDate(formStartsAt) : "Immediately upon publish"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <Button type="button" onClick={() => setActiveTab("compose")} variant="outline" size="sm">
                  Back to Compose
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* 6. INSPECTION & AUDIT DETAILS MODAL */}
      {/* ========================================================================= */}
      <Dialog open={!!selectedAnnouncementId} onOpenChange={() => setSelectedAnnouncementId(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="size-5 text-primary" />
              Announcement Details & Estimated Reach
            </DialogTitle>
            <DialogDescription>
              Inspect configuration parameters, targeted student audience reach, and immutable administrative audit history.
            </DialogDescription>
          </DialogHeader>

          {detailQuery.isPending ? (
            <RowSkeleton />
          ) : detailQuery.isError || !detailQuery.data ? (
            <ErrorState onRetry={() => detailQuery.refetch()} />
          ) : (
            <div className="space-y-5 text-xs">
              {/* Header Box */}
              <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getPriorityBadge(detailQuery.data.announcement.priority)}
                      {getStatusBadge(
                        detailQuery.data.announcement.computedStatus,
                        detailQuery.data.announcement.isActive
                      )}
                    </div>
                    <h2 className="font-bold text-lg text-foreground">
                      {detailQuery.data.announcement.title}
                    </h2>
                  </div>
                </div>

                <p className="text-xs text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {detailQuery.data.announcement.message}
                </p>

                {detailQuery.data.announcement.linkUrl && (
                  <div className="pt-2 border-t border-border">
                    <a
                      href={detailQuery.data.announcement.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      <ExternalLink className="size-3.5" />
                      <span>{detailQuery.data.announcement.linkUrl}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Configuration Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                    Target Scope
                  </span>
                  <div className="font-semibold text-foreground">
                    {detailQuery.data.announcement.targetAudience}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                    Estimated Reach
                  </span>
                  <div className="font-bold text-primary font-mono text-sm">
                    {detailQuery.data.estimatedReach.toLocaleString()} Users
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                    Publication Start
                  </span>
                  <div className="font-medium text-foreground text-[11px]">
                    {formatDate(detailQuery.data.announcement.startsAt)}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                    Expiration Date
                  </span>
                  <div className="font-medium text-foreground text-[11px]">
                    {detailQuery.data.announcement.expiresAt
                      ? formatDate(detailQuery.data.announcement.expiresAt)
                      : "Permanent"}
                  </div>
                </div>
              </div>

              {/* Creator Metadata */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10 text-muted-foreground">
                <div>
                  <span className="font-semibold text-foreground">Author:</span>{" "}
                  {detailQuery.data.announcement.createdBy?.name || "System"} (
                  {detailQuery.data.announcement.createdBy?.email || "Platform"})
                </div>
                <div className="text-[11px]">
                  Created: {formatDate(detailQuery.data.announcement.createdAt)}
                </div>
              </div>

              {/* Immutable Audit Log Trail */}
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <History className="size-4 text-primary" />
                  <span>Administrative Audit Log Trail</span>
                </div>
                {detailQuery.data.auditLogs.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    No specific audit trail records found for this announcement.
                  </p>
                ) : (
                  <div className="rounded-lg border border-border overflow-hidden bg-card">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-muted/40 text-[10px] uppercase text-muted-foreground font-semibold border-b border-border">
                        <tr>
                          <th className="p-2.5 pl-3">Timestamp</th>
                          <th className="p-2.5">Action</th>
                          <th className="p-2.5">Administrator</th>
                          <th className="p-2.5 pr-3">Reason / Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {detailQuery.data.auditLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-muted/30">
                            <td className="p-2.5 pl-3 text-muted-foreground font-mono text-[11px]">
                              {formatDate(log.timestamp)}
                            </td>
                            <td className="p-2.5 font-semibold text-primary text-[11px]">
                              {log.action}
                            </td>
                            <td className="p-2.5 text-foreground font-medium">
                              {log.user?.name || "Platform Admin"}
                            </td>
                            <td className="p-2.5 pr-3 text-muted-foreground truncate max-w-xs">
                              {log.reason || (log.details ? JSON.stringify(log.details) : "—")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <DialogFooter className="pt-3 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setSelectedAnnouncementId(null)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    const ann = detailQuery.data.announcement;
                    setSelectedAnnouncementId(null);
                    handleOpenEdit(ann);
                  }}
                  className="font-semibold"
                >
                  Edit Announcement
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* 7. PUBLISH IMMEDIATELY CONFIRMATION DIALOG */}
      {/* ========================================================================= */}
      <Dialog open={!!publishTarget} onOpenChange={() => setPublishTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="size-5 text-emerald-500" />
              Publish Announcement Immediately
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to publish "{publishTarget?.title}" right now? It will instantly appear in student and organizer feeds.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPublishTarget(null)}
              disabled={publishMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (publishTarget) publishMutation.mutate(publishTarget.id);
              }}
              disabled={publishMutation.isPending}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              {publishMutation.isPending ? "Publishing..." : "Confirm & Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* 8. DELETE CONFIRMATION DIALOG */}
      {/* ========================================================================= */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="size-5" />
              Delete Announcement
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete "{deleteTarget?.title}"? This action cannot be undone and will be recorded in the security audit trail.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteTarget) deleteMutation.mutate(deleteTarget.id);
              }}
              disabled={deleteMutation.isPending}
              className="font-semibold"
            >
              {deleteMutation.isPending ? "Deleting..." : "Permanently Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
