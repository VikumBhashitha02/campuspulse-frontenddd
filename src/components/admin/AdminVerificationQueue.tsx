import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  FileText,
  ExternalLink,
  GraduationCap,
  Building2,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Calendar,
  AlertCircle,
  Mail,
  Copy,
  Check,
  FileCheck2,
  FileSpreadsheet,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminApi,
  type VerificationItem,
  type VerificationStats,
  type VerificationListResponse,
  type VerificationDetailResponse,
} from "@/lib/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AdminDateFilter, type DateFilterValues } from "./AdminDateFilter";
import { cn } from "@/lib/utils";
import { PageHeader, RowSkeleton, ErrorState, EmptyState } from "@/components/common/States";

interface AdminVerificationQueueProps {
  universities?: Array<{ id: string; name: string; code: string }>;
  faculties?: Array<{ id: string; name: string; code: string }>;
  departments?: Array<{ id: string; name: string; code: string }>;
}

export function AdminVerificationQueue({
  universities = [],
  faculties = [],
  departments = [],
}: AdminVerificationQueueProps) {
  const queryClient = useQueryClient();

  // Filters State
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("ALL");
  const [type, setType] = useState<string>("ALL");
  const [universityId, setUniversityId] = useState<string>("ALL");
  const [dateFilter, setDateFilter] = useState<DateFilterValues>({
    preset: "ALL",
    year: "",
    month: "",
    startDate: "",
    endDate: "",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Inspection & Action Modal State
  const [selectedVerificationId, setSelectedVerificationId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<"APPROVE" | "REJECT" | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [reviewNotes, setReviewNotes] = useState("");
  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const handleExport = async (format: "csv" | "pdf") => {
    const totalCount = verificationsQuery.data?.total || 0;
    if (totalCount === 0) {
      toast.info("No verification requests match the active filters to export.");
      return;
    }
    if (format === "csv") setIsExportingCsv(true);
    else setIsExportingPdf(true);

    try {
      toast.info(`Generating ${format.toUpperCase()} export...`, {
        description: `Exporting all ${totalCount.toLocaleString()} filtered verification records.`,
      });
      const filename = await adminApi.exportData("verifications", format, {
        search: search.trim() || undefined,
        status: status !== "ALL" ? status : undefined,
        type: type !== "ALL" ? type : undefined,
        universityId: universityId !== "ALL" ? universityId : undefined,
        startDate: dateFilter.startDate || undefined,
        endDate: dateFilter.endDate || undefined,
        year: dateFilter.year || undefined,
        month: dateFilter.month || undefined,
        datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
      });
      toast.success(`Export ready!`, { description: `Downloaded ${filename}` });
    } catch (err: any) {
      toast.error(`Export failed`, { description: err?.message || "Failed to generate export" });
    } finally {
      if (format === "csv") setIsExportingCsv(false);
      else setIsExportingPdf(false);
    }
  };

  // Query Verifications List
  const verificationsQuery = useQuery<VerificationListResponse>({
    queryKey: [
      "admin",
      "verifications",
      {
        search: search.trim() || undefined,
        status: status !== "ALL" ? status : undefined,
        type: type !== "ALL" ? (type as any) : undefined,
        universityId: universityId !== "ALL" ? universityId : undefined,
        startDate: dateFilter.startDate || undefined,
        endDate: dateFilter.endDate || undefined,
        year: dateFilter.year || undefined,
        month: dateFilter.month || undefined,
        datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
        page,
        limit: pageSize,
      },
    ],
    queryFn: () =>
      adminApi.getVerifications({
        search: search.trim() || undefined,
        status: status !== "ALL" ? status : undefined,
        type: type !== "ALL" ? (type as any) : undefined,
        universityId: universityId !== "ALL" ? universityId : undefined,
        startDate: dateFilter.startDate || undefined,
        endDate: dateFilter.endDate || undefined,
        year: dateFilter.year || undefined,
        month: dateFilter.month || undefined,
        datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
        page,
        limit: pageSize,
      }),
  });

  // Query Stats
  const statsQuery = useQuery<VerificationStats>({
    queryKey: ["admin", "verifications", "stats"],
    queryFn: () => adminApi.getVerificationStats(),
    refetchInterval: 30000,
  });

  // Query Selected Item Details
  const detailQuery = useQuery<VerificationDetailResponse>({
    queryKey: ["admin", "verification-detail", selectedVerificationId],
    queryFn: () => adminApi.getVerificationDetails(selectedVerificationId!),
    enabled: !!selectedVerificationId,
  });

  // Mutation: Respond to Verification (Approve / Reject)
  const respondMutation = useMutation({
    mutationFn: ({
      id,
      status,
      reviewNotes,
      rejectionReason,
    }: {
      id: string;
      status: "APPROVED" | "REJECTED";
      reviewNotes?: string | undefined;
      rejectionReason?: string | undefined;
    }) => adminApi.respondVerification(id, status, reviewNotes, rejectionReason),
    onSuccess: (data, variables) => {
      toast.success(
        variables.status === "APPROVED"
          ? "Verification approved successfully! Institutional credential badge granted."
          : "Verification rejected. Notification dispatched to student.",
      );
      void queryClient.invalidateQueries({ queryKey: ["admin", "verifications"] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
      setSelectedVerificationId(null);
      setActionType(null);
      setRejectionReason("");
      setReviewNotes("");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to process verification decision.");
    },
  });

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success("Verification ID copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatus("ALL");
    setType("ALL");
    setUniversityId("ALL");
    setDateFilter({ preset: "ALL", year: "", month: "", startDate: "", endDate: "" });
    setPage(1);
  };

  const handleOpenDetail = (id: string) => {
    setSelectedVerificationId(id);
    setActionType(null);
    setRejectionReason("");
    setReviewNotes("");
  };

  const handleQuickApprove = (v: VerificationItem, e: React.MouseEvent) => {
    e.stopPropagation();
    respondMutation.mutate({
      id: v.id,
      status: "APPROVED",
      reviewNotes: "Fast-track approved by platform administrator.",
    });
  };

  const handleExecuteDecision = () => {
    if (!selectedVerificationId || !actionType) return;
    if (actionType === "REJECT" && !rejectionReason.trim() && !reviewNotes.trim()) {
      toast.error("Please provide a rejection reason or justification explanation.");
      return;
    }

    respondMutation.mutate({
      id: selectedVerificationId,
      status: actionType === "APPROVE" ? "APPROVED" : "REJECTED",
      rejectionReason: rejectionReason.trim() || undefined,
      reviewNotes: reviewNotes.trim() || undefined,
    });
  };

  const stats = statsQuery.data || verificationsQuery.data?.stats;
  const verifications = verificationsQuery.data?.data || [];
  const totalRecords = verificationsQuery.data?.total || 0;
  const totalPages = verificationsQuery.data?.totalPages || 1;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institutional Verification Queue"
        description="Review student smart-card credentials, enrollment verifications, and society charter applications with authoritative database synchronization."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                void verificationsQuery.refetch();
                void statsQuery.refetch();
                toast.success("Verification queue refreshed");
              }}
              className="gap-1.5 h-8 text-xs font-medium"
            >
              <RotateCcw className="size-3.5" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("csv")}
              disabled={isExportingCsv || verificationsQuery.isLoading}
              className="gap-1.5 h-8 text-xs font-medium text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
            >
              {isExportingCsv ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <FileSpreadsheet className="size-3.5 text-emerald-600 dark:text-emerald-400" />
              )}
              CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("pdf")}
              disabled={isExportingPdf || verificationsQuery.isLoading}
              className="gap-1.5 h-8 text-xs font-medium text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40 hover:bg-amber-50 dark:hover:bg-amber-950/30"
            >
              {isExportingPdf ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <FileText className="size-3.5 text-amber-600 dark:text-amber-400" />
              )}
              PDF
            </Button>
          </div>
        }
      />

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {/* Total */}
        <div
          onClick={() => { setStatus("ALL"); setPage(1); }}
          className={cn(
            "group cursor-pointer rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md",
            status === "ALL" ? "border-primary ring-1 ring-primary/20" : "border-border",
          )}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground">Total Requests</p>
            <div className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary">
              <FileCheck2 className="size-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black tracking-tight text-foreground">
            {stats?.total ?? "—"}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {stats ? `${stats.studentRequests} student • ${stats.organizationRequests} org` : "All submissions"}
          </p>
        </div>

        {/* Pending Review */}
        <div
          onClick={() => { setStatus("PENDING"); setPage(1); }}
          className={cn(
            "group cursor-pointer rounded-xl border bg-card p-4 transition-all hover:border-amber-500/50 hover:shadow-md",
            status === "PENDING" ? "border-amber-500 ring-1 ring-amber-500/20" : "border-border",
          )}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">Pending Review</p>
            <div className="grid size-7 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
              <Clock className="size-4 animate-pulse" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black tracking-tight text-amber-600 dark:text-amber-400">
            {stats?.pending ?? "—"}
          </p>
          <p className="mt-0.5 text-[11px] font-medium text-amber-600/80">
            Action required by admins
          </p>
        </div>

        {/* Approved */}
        <div
          onClick={() => { setStatus("APPROVED"); setPage(1); }}
          className={cn(
            "group cursor-pointer rounded-xl border bg-card p-4 transition-all hover:border-emerald-500/50 hover:shadow-md",
            status === "APPROVED" ? "border-emerald-500 ring-1 ring-emerald-500/20" : "border-border",
          )}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Approved</p>
            <div className="grid size-7 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="size-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
            {stats?.approved ?? "—"}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Verified institutional identities
          </p>
        </div>

        {/* Rejected */}
        <div
          onClick={() => { setStatus("REJECTED"); setPage(1); }}
          className={cn(
            "group cursor-pointer rounded-xl border bg-card p-4 transition-all hover:border-rose-500/50 hover:shadow-md",
            status === "REJECTED" ? "border-rose-500 ring-1 ring-rose-500/20" : "border-border",
          )}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">Rejected</p>
            <div className="grid size-7 place-items-center rounded-lg bg-rose-500/10 text-rose-600">
              <XCircle className="size-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black tracking-tight text-rose-600 dark:text-rose-400">
            {stats?.rejected ?? "—"}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Invalid credentials / notes
          </p>
        </div>

        {/* Approval Rate % */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground">Approval Rate</p>
            <div className="grid size-7 place-items-center rounded-lg bg-indigo-500/10 text-indigo-600">
              <ShieldCheck className="size-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black tracking-tight text-foreground">
            {stats && stats.total > 0
              ? `${Math.round((stats.approved / (stats.approved + stats.rejected || 1)) * 100)}%`
              : "100%"}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Trust & compliance benchmark
          </p>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-12">
          {/* Search Input */}
          <div className="relative md:col-span-4">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by student name, email, student ID, org..."
              className="pl-9 text-xs"
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="md:col-span-2">
            <select
              value={type}
              onChange={(e) => { setType(e.target.value); setPage(1); }}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="ALL">All Types</option>
              <option value="STUDENT">Student Credentials</option>
              <option value="ORGANIZATION">Society Verification</option>
            </select>
          </div>

          {/* University Filter */}
          <div className="md:col-span-2">
            <select
              value={universityId}
              onChange={(e) => { setUniversityId(e.target.value); setPage(1); }}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="ALL">All Universities</option>
              {universities.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.code ? `${u.code} - ${u.name}` : u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Page Size & Reset */}
          <div className="flex items-center gap-2 md:col-span-2">
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="rounded-md border border-input bg-background px-2.5 py-2 text-xs font-medium text-foreground"
            >
              <option value="10">10 / page</option>
              <option value="15">15 / page</option>
              <option value="25">25 / page</option>
              <option value="50">50 / page</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              title="Reset all filters"
              className="h-9 px-2 text-xs"
            >
              <RotateCcw className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* Date Range & Period Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-3 text-xs text-muted-foreground">
          <AdminDateFilter
            values={dateFilter}
            onChange={(val) => {
              setDateFilter(val);
              setPage(1);
            }}
          />

          {(search ||
            status !== "ALL" ||
            type !== "ALL" ||
            universityId !== "ALL" ||
            dateFilter.startDate ||
            dateFilter.endDate ||
            dateFilter.year ||
            dateFilter.month ||
            (dateFilter.preset && dateFilter.preset !== "ALL")) && (
            <span className="ml-auto font-medium text-primary">
              Filtered: {totalRecords} matching request{totalRecords === 1 ? "" : "s"}
            </span>
          )}
        </div>
      </div>

      {/* VERIFICATION QUEUE DATA TABLE */}
      {verificationsQuery.isPending ? (
        <RowSkeleton />
      ) : verificationsQuery.isError ? (
        <ErrorState onRetry={() => verificationsQuery.refetch()} />
      ) : verifications.length === 0 ? (
        <EmptyState
          icon={<ShieldCheck className="size-8 text-emerald-500" />}
          title="No verification applications found"
          description={
            status === "PENDING"
              ? "All pending student identity and society verification requests have been cleared!"
              : "No verification requests match your filter parameters."
          }
        />
      ) : (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border bg-muted/40 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="p-3.5">Student / Applicant</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Academic Affiliation</th>
                    <th className="p-3.5">Proof Document</th>
                    <th className="p-3.5">Submitted</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {verifications.map((v) => {
                    const isOrg = !!v.organizationId;
                    const uni =
                      v.requestedBy?.studentProfile?.university ||
                      v.requestedBy?.university ||
                      v.organization?.university;
                    const faculty = v.requestedBy?.studentProfile?.faculty;
                    const department = v.requestedBy?.studentProfile?.department;
                    const studentIdNum = v.requestedBy?.studentProfile?.studentIdNumber;

                    return (
                      <tr
                        key={v.id}
                        onClick={() => handleOpenDetail(v.id)}
                        className="group cursor-pointer hover:bg-muted/30 transition-colors"
                      >
                        {/* Student / Requester */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            {v.requestedBy?.avatarUrl ? (
                              <img
                                src={v.requestedBy.avatarUrl}
                                alt={v.requestedBy.name}
                                className="size-8 shrink-0 rounded-full object-cover border border-border"
                              />
                            ) : (
                              <div className="grid size-8 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-navy-foreground">
                                {v.requestedBy?.name?.[0]?.toUpperCase() || "U"}
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="font-semibold text-foreground truncate">{v.requestedBy?.name || "Unknown User"}</p>
                                {v.requestedBy?.universityEmailVerified && (
                                  <span title="Verified University Student">
                                    <ShieldCheck className="size-3.5 text-gold shrink-0" />
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-muted-foreground truncate">{v.requestedBy?.email}</p>
                              {studentIdNum && (
                                <p className="text-[10px] font-mono text-muted-foreground">ID: {studentIdNum}</p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="p-3.5">
                          {isOrg ? (
                            <span className="inline-flex items-center gap-1 rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                              <Building2 className="size-3" />
                              Society
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                              <GraduationCap className="size-3" />
                              Student ID
                            </span>
                          )}
                        </td>

                        {/* Academic Affiliation */}
                        <td className="p-3.5">
                          <div className="max-w-xs space-y-0.5">
                            <p className="font-medium text-foreground truncate">
                              {uni?.code ? `${uni.code} · ${uni.name}` : uni?.name || "Independent"}
                            </p>
                            {(faculty || department) && (
                              <p className="text-[11px] text-muted-foreground truncate">
                                {[faculty?.name, department?.name].filter(Boolean).join(" · ")}
                              </p>
                            )}
                            {v.organization && (
                              <p className="text-[11px] font-semibold text-primary truncate">
                                Club: {v.organization.name}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Proof Document */}
                        <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                          {v.documentUrl ? (
                            <a
                              href={v.documentUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-muted transition-colors"
                            >
                              <FileText className="size-3.5 text-primary" />
                              <span>View Proof</span>
                              <ExternalLink className="size-3 text-muted-foreground" />
                            </a>
                          ) : (
                            <span className="text-[11px] text-muted-foreground italic">No document attached</span>
                          )}
                        </td>

                        {/* Submitted Date */}
                        <td className="p-3.5 text-muted-foreground">
                          <p>{new Date(v.createdAt).toLocaleDateString()}</p>
                          <p className="text-[10px]">{new Date(v.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </td>

                        {/* Status */}
                        <td className="p-3.5">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                              v.status === "PENDING" && "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
                              v.status === "APPROVED" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
                              v.status === "REJECTED" && "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
                            )}
                          >
                            {v.status === "PENDING" && <Clock className="size-3 animate-pulse" />}
                            {v.status === "APPROVED" && <CheckCircle2 className="size-3" />}
                            {v.status === "REJECTED" && <XCircle className="size-3" />}
                            {v.status}
                          </span>
                          {v.reviewedBy && (
                            <p className="mt-0.5 text-[10px] text-muted-foreground">
                              by {v.reviewedBy.name}
                            </p>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs gap-1"
                              onClick={() => handleOpenDetail(v.id)}
                            >
                              <Eye className="size-3" />
                              Inspect
                            </Button>

                            {v.status === "PENDING" && (
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                                onClick={(e) => handleQuickApprove(v, e)}
                                disabled={respondMutation.isPending}
                              >
                                <CheckCircle2 className="size-3" />
                                Approve
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* PAGINATION BAR */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
            <div>
              Showing <span className="font-semibold text-foreground">{(page - 1) * pageSize + 1}</span> to{" "}
              <span className="font-semibold text-foreground">{Math.min(page * pageSize, totalRecords)}</span> of{" "}
              <span className="font-semibold text-foreground">{totalRecords}</span> verification records
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="size-3.5 mr-1" />
                Previous
              </Button>

              <span className="px-2 font-medium text-foreground">
                Page {page} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
                <ChevronRight className="size-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* INSPECTION & DECISION MODAL */}
      <Dialog
        open={!!selectedVerificationId}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedVerificationId(null);
            setActionType(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                <FileCheck2 className="size-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold">
                  Verification Application Details
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Review applicant proof document, academic background, and record formal review decision.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {detailQuery.isPending ? (
            <RowSkeleton />
          ) : detailQuery.isError || !detailQuery.data ? (
            <ErrorState onRetry={() => detailQuery.refetch()} />
          ) : (
            <div className="space-y-5 text-xs">
              {/* Header Profile Ribbon */}
              {(() => {
                const v: any = (detailQuery.data as any)?.verification || detailQuery.data;
                const student = v?.requestedBy;
                const profile = student?.studentProfile;
                const uni = profile?.university || student?.university || v?.organization?.university;

                return (
                  <div className="rounded-xl border border-border bg-muted/40 p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {student?.avatarUrl ? (
                          <img
                            src={student.avatarUrl}
                            alt={student.name}
                            className="size-12 rounded-full object-cover border-2 border-border"
                          />
                        ) : (
                          <div className="grid size-12 place-items-center rounded-full bg-navy text-sm font-bold text-navy-foreground">
                            {student?.name?.[0]?.toUpperCase() || "U"}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-foreground">{student?.name}</h3>
                            <span
                              className={cn(
                                "rounded px-1.5 py-0.5 text-[9px] font-bold uppercase",
                                v.status === "PENDING" && "bg-amber-500/10 text-amber-600",
                                v.status === "APPROVED" && "bg-emerald-500/10 text-emerald-600",
                                v.status === "REJECTED" && "bg-rose-500/10 text-rose-600",
                              )}
                            >
                              {v.status}
                            </span>
                          </div>
                          <p className="text-muted-foreground flex items-center gap-1.5 mt-0.5">
                            <Mail className="size-3" />
                            {student?.email}
                          </p>
                        </div>
                      </div>

                      <div className="text-right text-[11px] text-muted-foreground">
                        <p className="font-mono">Ref: #{v.id.slice(0, 10)}</p>
                        <p>{new Date(v.createdAt).toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Academic Details Matrix */}
                    <div className="grid grid-cols-2 gap-2 border-t border-border/50 pt-2 text-[11px] sm:grid-cols-4">
                      <div>
                        <p className="text-muted-foreground uppercase text-[9px] font-bold">University</p>
                        <p className="font-semibold text-foreground">{uni?.code || uni?.name || "Independent"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground uppercase text-[9px] font-bold">Faculty</p>
                        <p className="font-semibold text-foreground">{profile?.faculty?.name || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground uppercase text-[9px] font-bold">Department</p>
                        <p className="font-semibold text-foreground">{profile?.department?.name || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground uppercase text-[9px] font-bold">Student ID No.</p>
                        <p className="font-semibold text-foreground font-mono">{profile?.studentIdNumber || "Not entered"}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Applicant Statement / Notes */}
              <div className="rounded-lg border border-border bg-card p-3 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Applicant Submission Statement
                </p>
                <p className="text-foreground leading-relaxed">
                  {((detailQuery.data as any)?.verification || detailQuery.data)?.notes || "No additional text statement provided by applicant."}
                </p>
              </div>

              {/* Document Proof Section */}
              <div className="rounded-lg border border-border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-primary" />
                    <span className="font-bold text-foreground">Attached Credential Proof</span>
                  </div>
                  {((detailQuery.data as any)?.verification || detailQuery.data)?.documentUrl && (
                    <a
                      href={((detailQuery.data as any)?.verification || detailQuery.data).documentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline font-semibold text-xs"
                    >
                      <span>Open Full Size</span>
                      <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>

                {((detailQuery.data as any)?.verification || detailQuery.data)?.documentUrl ? (
                  <div className="rounded-md border border-border overflow-hidden bg-muted/20 flex flex-col items-center justify-center p-2">
                    {((detailQuery.data as any)?.verification || detailQuery.data).documentUrl.match(/\.(jpg|jpeg|png|webp|gif)$/i) ||
                    ((detailQuery.data as any)?.verification || detailQuery.data).documentUrl.includes("images.unsplash.com") ? (
                      <img
                        src={((detailQuery.data as any)?.verification || detailQuery.data).documentUrl}
                        alt="Student ID Proof"
                        className="max-h-72 w-auto rounded object-contain shadow-sm border border-border"
                      />
                    ) : (
                      <div className="py-6 text-center space-y-2">
                        <FileText className="size-10 text-muted-foreground mx-auto" />
                        <p className="font-medium text-foreground">Document Attachment (PDF or External Credential)</p>
                        <a
                          href={((detailQuery.data as any)?.verification || detailQuery.data).documentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                        >
                          <ExternalLink className="size-3.5" />
                          View Secure Document
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded border border-dashed border-border p-4 text-center text-muted-foreground">
                    No document proof attachment was provided with this application.
                  </div>
                )}
              </div>

              {/* Review History / Notes if already reviewed */}
              {((detailQuery.data as any)?.verification || detailQuery.data)?.reviewNotes && (
                <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Recorded Moderator Notes
                  </p>
                  <p className="text-foreground">{((detailQuery.data as any)?.verification || detailQuery.data).reviewNotes}</p>
                  {((detailQuery.data as any)?.verification || detailQuery.data).reviewedBy && (
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Reviewed by {((detailQuery.data as any)?.verification || detailQuery.data).reviewedBy.name} on{" "}
                      {((detailQuery.data as any)?.verification || detailQuery.data).reviewedAt
                        ? new Date(((detailQuery.data as any)?.verification || detailQuery.data).reviewedAt).toLocaleString()
                        : "—"}
                    </p>
                  )}
                </div>
              )}

              {/* ACTION DECISION FORM */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="size-4 text-primary" />
                  <p className="font-bold text-sm text-foreground">Administrative Decision</p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant={actionType === "APPROVE" ? "default" : "outline"}
                    className={cn(
                      "flex-1 h-9 gap-1.5",
                      actionType === "APPROVE" && "bg-emerald-600 hover:bg-emerald-700 text-white",
                    )}
                    onClick={() => setActionType("APPROVE")}
                  >
                    <CheckCircle2 className="size-4" />
                    Approve Credential
                  </Button>

                  <Button
                    type="button"
                    variant={actionType === "REJECT" ? "default" : "outline"}
                    className={cn(
                      "flex-1 h-9 gap-1.5",
                      actionType === "REJECT" && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    )}
                    onClick={() => setActionType("REJECT")}
                  >
                    <XCircle className="size-4" />
                    Reject Submission
                  </Button>
                </div>

                {actionType === "REJECT" && (
                  <div className="space-y-2 pt-2 border-t border-border/50">
                    <Label htmlFor="reject-reason" className="text-xs font-bold text-destructive">
                      Rejection Reason (Required)*
                    </Label>
                    <select
                      id="reject-reason"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-destructive"
                    >
                      <option value="">-- Select a primary rejection reason --</option>
                      <option value="Student ID card image is unreadable or blurry">Student ID card image is unreadable or blurry</option>
                      <option value="ID expired or academic year mismatch with records">ID expired or academic year mismatch with records</option>
                      <option value="Name on document does not match account name">Name on document does not match account name</option>
                      <option value="Unofficial document submitted (library pass / gym card)">Unofficial document submitted (library pass / gym card)</option>
                      <option value="University domain or affiliation unverified">University domain or affiliation unverified</option>
                      <option value="Suspicious or edited document detected">Suspicious or edited document detected</option>
                      <option value="Other administrative policy violation">Other administrative policy violation</option>
                    </select>
                  </div>
                )}

                {actionType && (
                  <div className="space-y-1 pt-1">
                    <Label htmlFor="review-notes" className="text-xs font-semibold text-foreground">
                      Moderator Explanatory Notes (Optional)
                    </Label>
                    <Textarea
                      id="review-notes"
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="Add internal notes or specific guidance dispatched to the applicant..."
                      rows={2}
                      className="text-xs"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedVerificationId(null)}
            >
              Close
            </Button>

            {actionType && (
              <Button
                size="sm"
                className={cn(
                  "gap-1.5",
                  actionType === "APPROVE" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-destructive hover:bg-destructive/90 text-white",
                )}
                onClick={handleExecuteDecision}
                disabled={respondMutation.isPending}
              >
                {respondMutation.isPending
                  ? "Recording..."
                  : actionType === "APPROVE"
                    ? "Confirm & Grant Verified Badge"
                    : "Confirm & Reject Application"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
