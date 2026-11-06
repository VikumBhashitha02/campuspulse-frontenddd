import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpDown,
  BadgeAlert,
  Building,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  Flag,
  History,
  Info,
  Layers,
  MoreVertical,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Tag,
  Trash2,
  TrendingUp,
  User,
  UserCheck,
  Users,
  UserX,
  X,
  XCircle,
} from "lucide-react";
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
  type ReportItem,
  type ReportListResponse,
  type ReportDetailResponse,
  type ReportType,
  type QueryAdminReportDto,
} from "@/lib/api/admin";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { EmptyState, ErrorState, RowSkeleton, StatCard } from "@/components/common/States";
import { toast } from "sonner";

interface AdminReportsCenterProps {
  universities?: { id: string; name: string }[];
  categories?: { id: string; name: string }[];
}

export function AdminReportsCenter({ universities = [], categories = [] }: AdminReportsCenterProps) {
  const queryClient = useQueryClient();

  // Active Main Tab: "moderation-queue" (Report Centre) vs "data-exports" (Enterprise Telemetry Reports)
  const [activeTab, setActiveTab] = useState<"moderation-queue" | "data-exports">("moderation-queue");

  // ---------------------------------------------------------------------------
  // 1. Moderation Reports Filter & Pagination State
  // ---------------------------------------------------------------------------
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [targetTypeFilter, setTargetTypeFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(25);

  // Detail Modal & Action States
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [actionNotesInput, setActionNotesInput] = useState<string>("");
  const [newStatusSelection, setNewStatusSelection] = useState<string>("RESOLVED");
  const [targetEnforcementDialog, setTargetEnforcementDialog] = useState<{
    action: "SUSPEND_USER" | "CANCEL_EVENT" | "SUSPEND_ORGANIZATION";
    title: string;
    description: string;
    penaltyReason: string;
  } | null>(null);
  const [enforcementReason, setEnforcementReason] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // ---------------------------------------------------------------------------
  // 2. Data Queries
  // ---------------------------------------------------------------------------
  const reportsQuery = useQuery({
    queryKey: [
      "admin",
      "reports-center",
      { search, status: statusFilter, targetType: targetTypeFilter, startDate, endDate, page, limit },
    ],
    queryFn: () =>
      adminApi.getReports({
        search: search.trim() || undefined,
        status: statusFilter || undefined,
        targetType: targetTypeFilter || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        page,
        limit,
      }),
  });

  const reportDetailQuery = useQuery({
    queryKey: ["admin", "report-detail", selectedReportId],
    queryFn: () => adminApi.getReportDetails(selectedReportId!),
    enabled: !!selectedReportId,
  });

  // ---------------------------------------------------------------------------
  // 3. Actions & Handlers
  // ---------------------------------------------------------------------------
  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setTargetTypeFilter("");
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  const handleQuickStatusChange = async (reportId: string, newStatus: string, notes?: string) => {
    try {
      await adminApi.resolveReport(reportId, newStatus, notes);
      toast.success(`Report status updated to ${newStatus}`, {
        description: `Moderation state recorded for report #${reportId.slice(0, 8)}.`,
      });
      void queryClient.invalidateQueries({ queryKey: ["admin", "reports-center"] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "reports"] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      if (selectedReportId === reportId) {
        void reportDetailQuery.refetch();
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to update report status");
    }
  };

  const handleUpdateDetailStatus = async () => {
    if (!selectedReportId) return;
    setIsProcessing(true);
    try {
      await adminApi.resolveReport(
        selectedReportId,
        newStatusSelection,
        actionNotesInput.trim() || undefined,
      );
      toast.success(`Report #${selectedReportId.slice(0, 8)} marked as ${newStatusSelection}`, {
        description: "Moderator resolution notes have been recorded in the audit trail.",
      });
      setActionNotesInput("");
      void queryClient.invalidateQueries({ queryKey: ["admin", "reports-center"] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "reports"] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      void reportDetailQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update report");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExecuteTargetEnforcement = async () => {
    if (!selectedReportId || !targetEnforcementDialog) return;
    setIsProcessing(true);
    try {
      await adminApi.takeReportAction(
        selectedReportId,
        targetEnforcementDialog.action,
        enforcementReason.trim() || targetEnforcementDialog.penaltyReason,
        actionNotesInput.trim() || undefined,
      );
      toast.success(`Action applied: ${targetEnforcementDialog.title}`, {
        description: "Content/account updated across platform and notification dispatched.",
      });
      setTargetEnforcementDialog(null);
      setEnforcementReason("");
      setActionNotesInput("");
      void queryClient.invalidateQueries({ queryKey: ["admin", "reports-center"] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "reports"] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "organizations"] });
      void reportDetailQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to execute moderation enforcement");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExportCsv = () => {
    if (!reportsQuery.data?.data?.length) {
      toast.error("No reports to export in current view");
      return;
    }

    const headers = [
      "Report ID",
      "Submission Date",
      "Status",
      "Target Type",
      "Target Name / Title",
      "Target ID",
      "Reporter Name",
      "Reporter Email",
      "Reason",
      "Details",
      "Evidence URL",
      "Action Notes",
      "Resolved At",
    ];

    const rows = reportsQuery.data.data.map((r) => [
      r.id,
      r.createdAt,
      r.status,
      r.targetType,
      r.targetEntity?.name || "N/A",
      r.targetId,
      r.reporter?.name || "Anonymous",
      r.reporter?.email || "N/A",
      r.reason || "N/A",
      r.details || "",
      r.evidenceUrl || "",
      r.actionNotes || "",
      r.resolvedAt || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(","))].join(
        "\n",
      );

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CampusPulse_Moderation_Reports_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Moderation reports CSV exported successfully!");
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${label} to clipboard`);
  };

  // Stats from response or fallback zeroes
  const stats = reportsQuery.data?.stats || {
    total: 0,
    pending: 0,
    underReview: 0,
    resolved: 0,
    dismissed: 0,
    urgent: 0,
  };

  return (
    <div className="space-y-6">
      {/* ----------------------------------------------------------------- */}
      {/* Header & Sub-Tab Switcher */}
      {/* ----------------------------------------------------------------- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
              <Flag className="size-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">Report Centre & Moderation Desk</h1>
              <p className="text-xs text-muted-foreground">
                Investigate user-flagged events, student organizations, peer accounts, and inappropriate content.
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border bg-card p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("moderation-queue")}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                activeTab === "moderation-queue"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <ShieldAlert className="size-3.5" />
              <span>Moderation Reports</span>
              {stats.pending > 0 && (
                <span className="grid place-items-center rounded-full bg-destructive px-1.5 py-0.2 text-[10px] font-bold text-destructive-foreground">
                  {stats.pending}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("data-exports")}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                activeTab === "data-exports"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <FileSpreadsheet className="size-3.5" />
              <span>Telemetry & Data Reports</span>
            </button>
          </div>

          <Button variant="outline" size="sm" onClick={() => reportsQuery.refetch()} title="Refresh data">
            <RefreshCw className={cn("size-3.5 mr-1.5", reportsQuery.isFetching && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* TAB 1: MODERATION REPORTS CENTRE */}
      {/* ================================================================= */}
      {activeTab === "moderation-queue" && (
        <div className="space-y-6">
          {/* 6 Key Report KPI Metric Cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            <button
              type="button"
              onClick={() => {
                setStatusFilter("");
                setPage(1);
              }}
              className={cn(
                "flex flex-col p-4 rounded-xl border text-left transition-all",
                statusFilter === ""
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm"
                  : "border-border bg-card hover:border-primary/50",
              )}
            >
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Total Reports</span>
                <Flag className="size-4 text-primary" />
              </div>
              <span className="text-2xl font-extrabold text-foreground">{stats.total}</span>
              <span className="text-[10px] text-muted-foreground mt-1">All logged complaints</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setStatusFilter("PENDING");
                setPage(1);
              }}
              className={cn(
                "flex flex-col p-4 rounded-xl border text-left transition-all",
                statusFilter === "PENDING"
                  ? "border-rose-500 bg-rose-500/10 ring-2 ring-rose-500/20 shadow-sm"
                  : "border-border bg-card hover:border-rose-500/50",
              )}
            >
              <div className="flex items-center justify-between text-rose-600 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Open / Pending</span>
                <AlertCircle className="size-4 text-rose-500" />
              </div>
              <span className="text-2xl font-extrabold text-rose-600">{stats.pending}</span>
              <span className="text-[10px] text-muted-foreground mt-1">Awaiting review</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setStatusFilter("UNDER_REVIEW");
                setPage(1);
              }}
              className={cn(
                "flex flex-col p-4 rounded-xl border text-left transition-all",
                statusFilter === "UNDER_REVIEW"
                  ? "border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20 shadow-sm"
                  : "border-border bg-card hover:border-amber-500/50",
              )}
            >
              <div className="flex items-center justify-between text-amber-600 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Under Review</span>
                <Clock className="size-4 text-amber-500" />
              </div>
              <span className="text-2xl font-extrabold text-amber-600">{stats.underReview}</span>
              <span className="text-[10px] text-muted-foreground mt-1">Active investigation</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setStatusFilter("RESOLVED");
                setPage(1);
              }}
              className={cn(
                "flex flex-col p-4 rounded-xl border text-left transition-all",
                statusFilter === "RESOLVED"
                  ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20 shadow-sm"
                  : "border-border bg-card hover:border-emerald-500/50",
              )}
            >
              <div className="flex items-center justify-between text-emerald-600 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Resolved</span>
                <CheckCircle2 className="size-4 text-emerald-500" />
              </div>
              <span className="text-2xl font-extrabold text-emerald-600">{stats.resolved}</span>
              <span className="text-[10px] text-muted-foreground mt-1">Action completed</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setStatusFilter("DISMISSED");
                setPage(1);
              }}
              className={cn(
                "flex flex-col p-4 rounded-xl border text-left transition-all",
                statusFilter === "DISMISSED"
                  ? "border-slate-500 bg-slate-500/10 ring-2 ring-slate-500/20 shadow-sm"
                  : "border-border bg-card hover:border-slate-500/50",
              )}
            >
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Dismissed</span>
                <XCircle className="size-4 text-muted-foreground" />
              </div>
              <span className="text-2xl font-extrabold text-foreground">{stats.dismissed}</span>
              <span className="text-[10px] text-muted-foreground mt-1">No violation found</span>
            </button>

            <div className="flex flex-col p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between text-amber-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Urgent Attention</span>
                <BadgeAlert className="size-4 text-amber-500" />
              </div>
              <span className="text-2xl font-extrabold text-amber-500">{stats.urgent}</span>
              <span className="text-[10px] text-muted-foreground mt-1">&gt; 48h pending queue</span>
            </div>
          </div>

          {/* Search, Filter & Controls Bar */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-3">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Full Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by Report ID, reporter name, target entity, or reason..."
                  className="pl-9 text-xs h-9"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Filters Group */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Status Filter */}
                <select
                  aria-label="Filter by report status"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">All Statuses</option>
                  <option value="PENDING">Pending Review</option>
                  <option value="UNDER_REVIEW">Under Active Review</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="DISMISSED">Dismissed</option>
                </select>

                {/* Target Type Filter */}
                <select
                  aria-label="Filter by target category"
                  value={targetTypeFilter}
                  onChange={(e) => {
                    setTargetTypeFilter(e.target.value);
                    setPage(1);
                  }}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">All Categories</option>
                  <option value="EVENT">Events & Opportunities</option>
                  <option value="ORGANIZATION">Clubs & Societies</option>
                  <option value="USER">Student & User Profiles</option>
                  <option value="TEAM">Project Squads & Teams</option>
                </select>

                {/* Date Range Start */}
                <Input
                  type="date"
                  aria-label="Filter by start date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setPage(1);
                  }}
                  className="h-9 w-36 text-xs"
                  title="Start submission date"
                />

                {/* Date Range End */}
                <Input
                  type="date"
                  aria-label="Filter by end date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setPage(1);
                  }}
                  className="h-9 w-36 text-xs"
                  title="End submission date"
                />

                {/* Reset Filters */}
                {(search || statusFilter || targetTypeFilter || startDate || endDate) && (
                  <Button variant="ghost" size="sm" onClick={handleResetFilters} className="h-9 text-xs">
                    <RotateCcw className="size-3.5 mr-1" /> Reset
                  </Button>
                )}

                {/* Export CSV */}
                <Button variant="outline" size="sm" onClick={handleExportCsv} className="h-9 text-xs">
                  <Download className="size-3.5 mr-1.5" /> Export CSV
                </Button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* Main Reports Table */}
          {/* ------------------------------------------------------------- */}
          {reportsQuery.isPending ? (
            <RowSkeleton />
          ) : reportsQuery.isError ? (
            <ErrorState onRetry={() => reportsQuery.refetch()} />
          ) : !reportsQuery.data?.data || reportsQuery.data.data.length === 0 ? (
            <EmptyState
              icon={<ShieldCheck className="size-8 text-emerald-500" />}
              title="No reports matching filter criteria"
              description="All reported incidents have been reviewed, or your active filter query returned no results."
              action={
                search || statusFilter || targetTypeFilter || startDate || endDate ? (
                  <Button variant="outline" size="sm" onClick={handleResetFilters}>
                    Clear All Filters
                  </Button>
                ) : undefined
              }
            />
          ) : (
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border bg-muted/50 font-bold uppercase tracking-wider text-[10px] text-muted-foreground">
                    <tr>
                      <th className="p-3">Report ID</th>
                      <th className="p-3">Reporter</th>
                      <th className="p-3">Reported Entity</th>
                      <th className="p-3">Category & Reason</th>
                      <th className="p-3">Evidence</th>
                      <th className="p-3">Submitted</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {reportsQuery.data.data.map((r: ReportItem) => {
                      const isPending = r.status === "PENDING";
                      const isUnderReview = r.status === "UNDER_REVIEW";
                      const isResolved = r.status === "RESOLVED" || r.status === "REVIEWED";
                      const isDismissed = r.status === "DISMISSED";

                      return (
                        <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                          {/* Report ID */}
                          <td className="p-3">
                            <div className="flex items-center gap-1 font-mono">
                              <span className="font-bold text-foreground">#{r.id.slice(0, 8)}</span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(r.id, "Report ID")}
                                title="Copy Full ID"
                                className="text-muted-foreground hover:text-foreground"
                              >
                                <Copy className="size-3" />
                              </button>
                            </div>
                          </td>

                          {/* Reporter */}
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="grid size-7 shrink-0 place-items-center rounded-full bg-navy text-[11px] font-bold text-navy-foreground">
                                {r.reporter?.name?.[0] || "U"}
                              </div>
                              <div className="min-w-0">
                                <p className="truncate font-semibold text-foreground">{r.reporter?.name || "Anonymous Student"}</p>
                                <p className="truncate text-[10px] text-muted-foreground">{r.reporter?.email || "N/A"}</p>
                              </div>
                            </div>
                          </td>

                          {/* Reported Entity */}
                          <td className="p-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={cn(
                                    "rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase",
                                    r.targetType === "EVENT" && "bg-blue-500/10 text-blue-600 border border-blue-500/20",
                                    r.targetType === "ORGANIZATION" && "bg-indigo-500/10 text-indigo-600 border border-indigo-500/20",
                                    r.targetType === "USER" && "bg-purple-500/10 text-purple-600 border border-purple-500/20",
                                    r.targetType === "TEAM" && "bg-teal-500/10 text-teal-600 border border-teal-500/20",
                                  )}
                                >
                                  {r.targetType}
                                </span>
                                {r.targetEntity?.status && (
                                  <span className="text-[9px] font-medium text-muted-foreground">
                                    ({r.targetEntity.status})
                                  </span>
                                )}
                              </div>
                              <p className="font-semibold text-foreground max-w-xs truncate">
                                {r.targetEntity?.name || `Target ID: ${r.targetId.slice(0, 10)}...`}
                              </p>
                              {r.targetEntity?.subtitle && (
                                <p className="text-[10px] text-muted-foreground truncate">{r.targetEntity.subtitle}</p>
                              )}
                            </div>
                          </td>

                          {/* Category & Reason */}
                          <td className="p-3">
                            <div className="max-w-xs">
                              <p className="font-semibold text-foreground truncate">{r.reason}</p>
                              {r.details && (
                                <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{r.details}</p>
                              )}
                            </div>
                          </td>

                          {/* Evidence */}
                          <td className="p-3">
                            {r.evidenceUrl ? (
                              <a
                                href={r.evidenceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded bg-muted px-2 py-1 text-[11px] font-medium text-primary hover:underline"
                              >
                                <ExternalLink className="size-3" /> View Proof
                              </a>
                            ) : (
                              <span className="text-[11px] text-muted-foreground italic">None supplied</span>
                            )}
                          </td>

                          {/* Submission Date */}
                          <td className="p-3 whitespace-nowrap text-muted-foreground text-[11px]">
                            {formatDate(r.createdAt)}
                          </td>

                          {/* Status Badge */}
                          <td className="p-3 whitespace-nowrap">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                                isPending && "bg-rose-500/10 text-rose-600 border border-rose-500/20",
                                isUnderReview && "bg-amber-500/10 text-amber-600 border border-amber-500/20",
                                isResolved && "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
                                isDismissed && "bg-slate-500/10 text-slate-600 border border-slate-500/20",
                              )}
                            >
                              {isPending && <AlertCircle className="size-3 text-rose-500" />}
                              {isUnderReview && <Clock className="size-3 text-amber-500" />}
                              {isResolved && <CheckCircle2 className="size-3 text-emerald-500" />}
                              {isDismissed && <XCircle className="size-3 text-slate-500" />}
                              {r.status}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs"
                                onClick={() => setSelectedReportId(r.id)}
                              >
                                <Eye className="size-3 mr-1" /> Inspect
                              </Button>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="size-7" aria-label="Quick actions menu">
                                    <MoreVertical className="size-3.5" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 text-xs">
                                  <DropdownMenuLabel>Quick Resolution</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  {r.status !== "UNDER_REVIEW" && (
                                    <DropdownMenuItem
                                      onClick={() => handleQuickStatusChange(r.id, "UNDER_REVIEW", "Active moderator review started")}
                                    >
                                      <Clock className="size-3.5 mr-2 text-amber-500" /> Mark Under Review
                                    </DropdownMenuItem>
                                  )}
                                  {r.status !== "RESOLVED" && (
                                    <DropdownMenuItem
                                      onClick={() => handleQuickStatusChange(r.id, "RESOLVED", "Resolved via quick action")}
                                    >
                                      <CheckCircle2 className="size-3.5 mr-2 text-emerald-500" /> Resolve Report
                                    </DropdownMenuItem>
                                  )}
                                  {r.status !== "DISMISSED" && (
                                    <DropdownMenuItem
                                      onClick={() => handleQuickStatusChange(r.id, "DISMISSED", "No violation found")}
                                    >
                                      <XCircle className="size-3.5 mr-2 text-slate-500" /> Dismiss Report
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => setSelectedReportId(r.id)}>
                                    <ShieldAlert className="size-3.5 mr-2 text-primary" /> Full Investigation
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border px-4 py-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>
                    Showing {Math.min(reportsQuery.data.total, (page - 1) * limit + 1)} to{" "}
                    {Math.min(reportsQuery.data.total, page * limit)} of {reportsQuery.data.total} reports
                  </span>
                  <select
                    aria-label="Select page limit"
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                    className="h-7 rounded border border-input bg-background px-2 text-[11px] text-foreground focus:outline-none"
                  >
                    <option value={10}>10 / page</option>
                    <option value={25}>25 / page</option>
                    <option value={50}>50 / page</option>
                    <option value={100}>100 / page</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft className="size-3.5 mr-1" /> Previous
                  </Button>
                  <span className="px-2 font-medium text-foreground">
                    Page {page} of {reportsQuery.data.totalPages || 1}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    disabled={page >= reportsQuery.data.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next <ChevronRight className="size-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 2: SYSTEM TELEMETRY & DATA EXPORT REPORTS */}
      {/* ================================================================= */}
      {activeTab === "data-exports" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-foreground">Platform Telemetry & Audit Logs</h2>
                <p className="text-xs text-muted-foreground">
                  Generate on-demand datasets for participation, finances, volunteer registries, and campus health.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-2">
              <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">Users & Registrations</span>
                  <Users className="size-4 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Comprehensive student directory, verification statuses, and society affiliations.</p>
                <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => window.open("/api/v1/admin/reports-center/export?type=USERS", "_blank")}>
                  <Download className="size-3.5 mr-1.5" /> Download Users CSV
                </Button>
              </div>

              <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">Financial Ledger</span>
                  <CheckCircle2 className="size-4 text-emerald-500" />
                </div>
                <p className="text-xs text-muted-foreground">Verified payment transactions, provider references, and digital invoice records.</p>
                <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => window.open("/api/v1/admin/reports-center/export?type=PAYMENTS_REVENUE", "_blank")}>
                  <Download className="size-3.5 mr-1.5" /> Download Financial CSV
                </Button>
              </div>

              <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">QR Gate Attendance</span>
                  <Check className="size-4 text-blue-500" />
                </div>
                <p className="text-xs text-muted-foreground">Physical check-in scans, timestamps, gate checkers, and venue turnout ratios.</p>
                <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => window.open("/api/v1/admin/reports-center/export?type=ATTENDANCE", "_blank")}>
                  <Download className="size-3.5 mr-1.5" /> Download Attendance CSV
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* DIALOG: COMPLETE REPORT INSPECTION & MODERATION ACTION */}
      {/* ================================================================= */}
      <Dialog open={!!selectedReportId} onOpenChange={(open) => !open && setSelectedReportId(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {reportDetailQuery.isPending ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="size-8 text-primary animate-spin" />
              <p className="text-xs text-muted-foreground">Fetching full report data & target context...</p>
            </div>
          ) : reportDetailQuery.isError || !reportDetailQuery.data ? (
            <div className="py-8">
              <ErrorState onRetry={() => reportDetailQuery.refetch()} />
            </div>
          ) : (
            (() => {
              const r = reportDetailQuery.data.report;
              const target = reportDetailQuery.data.targetEntity;
              const audit = reportDetailQuery.data.auditHistory || [];

              return (
                <div className="space-y-6">
                  {/* Modal Header */}
                  <DialogHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                            #{r.id}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                              r.status === "PENDING" && "bg-rose-500/10 text-rose-600 border border-rose-500/20",
                              r.status === "UNDER_REVIEW" && "bg-amber-500/10 text-amber-600 border border-amber-500/20",
                              r.status === "RESOLVED" && "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
                              r.status === "DISMISSED" && "bg-slate-500/10 text-slate-600 border border-slate-500/20",
                            )}
                          >
                            {r.status}
                          </span>
                        </div>
                        <DialogTitle className="text-lg font-bold text-foreground">
                          Moderation Case: {r.reason}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                          Submitted on {formatDate(r.createdAt)} by {r.reporter?.name || "Anonymous User"}
                        </DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>

                  {/* Reporter Info Bar */}
                  <div className="rounded-xl border border-border bg-muted/20 p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="grid size-8 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-navy-foreground">
                        {r.reporter?.name?.[0] || "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{r.reporter?.name || "Anonymous Student"}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {r.reporter?.email} • {r.reporter?.university?.name || "Campus User"}
                        </p>
                      </div>
                    </div>
                    {r.resolvedBy && (
                      <div className="text-right text-[11px] text-muted-foreground">
                        <span>Reviewed by: <span className="font-semibold text-foreground">{r.resolvedBy.name}</span></span>
                        {r.resolvedAt && <p>{formatDate(r.resolvedAt)}</p>}
                      </div>
                    )}
                  </div>

                  {/* Target Entity Deep Dive Card */}
                  <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-border/50 pb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Tag className="size-3.5 text-primary" /> Reported Content / Target Details
                      </span>
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-extrabold text-primary uppercase">
                        {r.targetType}
                      </span>
                    </div>

                    {target ? (
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h2 className="font-bold text-sm text-foreground">
                              {target.title || target.name || `Target ID: ${r.targetId}`}
                            </h2>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {r.targetType === "EVENT" && `Organizer: ${target.organization?.name || "Independent"} • Campus: ${target.university?.name || "General"}`}
                              {r.targetType === "USER" && `${target.email} • Campus: ${target.university?.name || "General"} • Active: ${target.isActive ? "YES" : "NO"}`}
                              {r.targetType === "ORGANIZATION" && `University: ${target.university?.name || "General"} • Verified: ${target.isVerified ? "YES" : "NO"}`}
                              {r.targetType === "TEAM" && `Squad Leader: ${target.creator?.name || "Student"} • Status: ${target.isOpen ? "OPEN" : "CLOSED"}`}
                            </p>
                          </div>

                          {/* Quick external link */}
                          {r.targetType === "EVENT" && target.slug && (
                            <Button asChild size="sm" variant="outline" className="h-7 text-xs shrink-0">
                              <a href={`/events/${target.slug}`} target="_blank" rel="noreferrer">
                                <ExternalLink className="size-3 mr-1" /> View Event
                              </a>
                            </Button>
                          )}
                          {r.targetType === "ORGANIZATION" && target.slug && (
                            <Button asChild size="sm" variant="outline" className="h-7 text-xs shrink-0">
                              <a href={`/organizations/${target.slug}`} target="_blank" rel="noreferrer">
                                <ExternalLink className="size-3 mr-1" /> View Society
                              </a>
                            </Button>
                          )}
                        </div>

                        {/* Event or Org specific details */}
                        {r.targetType === "EVENT" && (
                          <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/30 p-2.5 text-xs">
                            <div>
                              <p className="text-[10px] text-muted-foreground uppercase font-bold">Status</p>
                              <p className="font-semibold text-foreground">{target.status}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-muted-foreground uppercase font-bold">Date & Venue</p>
                              <p className="font-semibold text-foreground truncate">{target.venue || "Online"}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-muted-foreground uppercase font-bold">Pricing</p>
                              <p className="font-semibold text-foreground">{target.isFree ? "Free" : `LKR ${target.price || target.studentPrice || 0}`}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-3 bg-muted/20 rounded-lg text-xs text-muted-foreground italic">
                        Target entity with ID <code className="font-mono">{r.targetId}</code> could not be found or has been deleted.
                      </div>
                    )}
                  </div>

                  {/* Violation Description & Evidence */}
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Report Details / Statement
                      </Label>
                      <div className="mt-1.5 rounded-xl border border-border bg-card p-3 text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                        {r.details || r.reason}
                      </div>
                    </div>

                    {r.evidenceUrl && (
                      <div>
                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Evidence / Proof Attachment
                        </Label>
                        <div className="mt-1.5 rounded-xl border border-border bg-card p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-primary truncate">{r.evidenceUrl}</span>
                            <Button asChild size="sm" variant="outline" className="h-6 text-[11px]">
                              <a href={r.evidenceUrl} target="_blank" rel="noreferrer">
                                <ExternalLink className="size-3 mr-1" /> Open URL
                              </a>
                            </Button>
                          </div>
                          {/* Image preview check */}
                          {/\.(jpg|jpeg|png|webp|gif)$/i.test(r.evidenceUrl) && (
                            <div className="mt-2 overflow-hidden rounded-lg border border-border max-h-48">
                              <img src={r.evidenceUrl} alt="Evidence preview" className="w-full object-cover max-h-48" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Moderation Actions & Status Transition Form */}
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-sm text-foreground flex items-center gap-2">
                        <Shield className="size-4 text-primary" /> Moderator Adjudication & Action Notes
                      </h2>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs font-bold">Change Report Status</Label>
                        <div className="grid grid-cols-4 gap-2 mt-1.5">
                          {[
                            { value: "PENDING", label: "Pending", color: "hover:border-rose-500" },
                            { value: "UNDER_REVIEW", label: "Under Review", color: "hover:border-amber-500" },
                            { value: "RESOLVED", label: "Resolved", color: "hover:border-emerald-500" },
                            { value: "DISMISSED", label: "Dismissed", color: "hover:border-slate-500" },
                          ].map((st) => (
                            <button
                              key={st.value}
                              type="button"
                              onClick={() => setNewStatusSelection(st.value)}
                              className={cn(
                                "flex items-center justify-center p-2 rounded-lg border text-xs font-semibold transition-all",
                                newStatusSelection === st.value
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                  : "bg-card border-border text-muted-foreground hover:text-foreground",
                                st.color,
                              )}
                            >
                              {st.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="action-notes" className="text-xs font-bold">
                          Moderation Notes / Resolution Reason
                        </Label>
                        <Textarea
                          id="action-notes"
                          value={actionNotesInput}
                          onChange={(e) => setActionNotesInput(e.target.value)}
                          placeholder="Record resolution rationale, steps taken, or communication with organizers..."
                          className="mt-1.5 text-xs min-h-20"
                          defaultValue={r.actionNotes || ""}
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/50">
                        {/* Direct Enforcement Penalties */}
                        <div className="flex items-center gap-2">
                          {r.targetType === "EVENT" && target && target.status !== "CANCELLED" && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() =>
                                setTargetEnforcementDialog({
                                  action: "CANCEL_EVENT",
                                  title: `Cancel & Remove "${target.title || 'Event'}"`,
                                  description: "This will revoke all active admission tickets, notify the creator, and set event status to CANCELLED.",
                                  penaltyReason: `Cancelled by administration: ${r.reason}`,
                                })
                              }
                            >
                              <Trash2 className="size-3.5 mr-1" /> Cancel Event
                            </Button>
                          )}

                          {r.targetType === "USER" && target && target.isActive && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() =>
                                setTargetEnforcementDialog({
                                  action: "SUSPEND_USER",
                                  title: `Suspend Account: ${target.name || 'User'}`,
                                  description: "This will deactivate user login permissions and send an account suspension notice.",
                                  penaltyReason: `Suspended by administration: ${r.reason}`,
                                })
                              }
                            >
                              <UserX className="size-3.5 mr-1" /> Suspend User
                            </Button>
                          )}

                          {r.targetType === "ORGANIZATION" && target && target.status !== "SUSPENDED" && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() =>
                                setTargetEnforcementDialog({
                                  action: "SUSPEND_ORGANIZATION",
                                  title: `Suspend Society: ${target.name || 'Organization'}`,
                                  description: "This will freeze organization publishing privileges and notify all society leaders.",
                                  penaltyReason: `Suspended by administration: ${r.reason}`,
                                })
                              }
                            >
                              <Building className="size-3.5 mr-1" /> Suspend Society
                            </Button>
                          )}
                        </div>

                        <Button
                          size="sm"
                          disabled={isProcessing}
                          onClick={handleUpdateDetailStatus}
                          className="h-8 text-xs"
                        >
                          <Check className="size-3.5 mr-1" /> Update Status & Notes
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Audit Trail History */}
                  {audit.length > 0 && (
                    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <History className="size-3.5 text-primary" /> Moderation Audit Trail ({audit.length})
                      </h3>
                      <ul className="divide-y divide-border/50 text-xs">
                        {audit.map((log: any) => (
                          <li key={log.id} className="py-2 flex items-start justify-between gap-3">
                            <div>
                              <span className="font-semibold text-foreground">{log.action}</span>
                              <span className="text-muted-foreground ml-1.5">by {log.user?.name || "System"}</span>
                              {log.reason && <p className="text-muted-foreground italic mt-0.5">"{log.reason}"</p>}
                            </div>
                            <span className="text-[10px] text-muted-foreground shrink-0">{formatDate(log.createdAt)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <DialogFooter className="pt-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedReportId(null)}>
                      Close
                    </Button>
                  </DialogFooter>
                </div>
              );
            })()
          )}
        </DialogContent>
      </Dialog>

      {/* ================================================================= */}
      {/* DIALOG: CONFIRM TARGET PENALTY ENFORCEMENT */}
      {/* ================================================================= */}
      <Dialog open={!!targetEnforcementDialog} onOpenChange={(open) => !open && setTargetEnforcementDialog(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-destructive flex items-center gap-2">
              <ShieldAlert className="size-5 text-destructive" />
              {targetEnforcementDialog?.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {targetEnforcementDialog?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div>
              <Label htmlFor="enforcement-reason" className="text-xs font-bold">
                Penalty Notice / Reason
              </Label>
              <Textarea
                id="enforcement-reason"
                value={enforcementReason}
                onChange={(e) => setEnforcementReason(e.target.value)}
                placeholder="Enter specific policy clause or violation details communicated to the user..."
                className="mt-1.5 text-xs min-h-20"
                defaultValue={targetEnforcementDialog?.penaltyReason || ""}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setTargetEnforcementDialog(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={isProcessing}
              onClick={handleExecuteTargetEnforcement}
            >
              Confirm & Execute Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
