import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Globe,
  MapPin,
  Mail,
  GraduationCap,
  Users,
  Layers,
  Edit,
  ExternalLink,
  Trash2,
  AlertTriangle,
  RefreshCw,
  MoreVertical,
  Eye,
  Info,
  Calendar,
  Building,
  Check,
  X,
  Sparkles,
  ArrowUpDown,
  BookOpen,
  FileSpreadsheet,
  FileText,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { adminApi, type UniversityItem, type UniversityEmailDomainItem, type UniversityStats } from "@/lib/api/admin";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AdminDateFilter, type DateFilterValues } from "./AdminDateFilter";
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
import { cn } from "@/lib/utils";
import { EmptyState, ErrorState, RowSkeleton } from "@/components/common/States";

interface AdminUniversitiesProps {
  onOpenCreateFaculty?: (universityId?: string) => void;
}

export function AdminUniversities({ onOpenCreateFaculty }: AdminUniversitiesProps) {
  const queryClient = useQueryClient();

  // Filter & Search State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const limit = 24;

  const [dateFilter, setDateFilter] = useState<DateFilterValues>({
    preset: "ALL",
    year: "",
    month: "",
    startDate: "",
    endDate: "",
  });

  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalUni, setEditModalUni] = useState<UniversityItem | null>(null);
  const [detailModalId, setDetailModalId] = useState<string | null>(null);
  const [domainModalUni, setDomainModalUni] = useState<{ id: string; name: string } | null>(null);
  const [statusConfirmUni, setStatusConfirmUni] = useState<UniversityItem | null>(null);
  const [deleteConfirmUni, setDeleteConfirmUni] = useState<UniversityItem | null>(null);

  // Form states for create
  const [createForm, setCreateForm] = useState({
    name: "",
    code: "",
    slug: "",
    city: "",
    country: "Sri Lanka",
    domain: "",
    websiteUrl: "",
    description: "",
    logoUrl: "",
    isVerified: true,
  });

  // Form states for edit
  const [editForm, setEditForm] = useState({
    name: "",
    code: "",
    slug: "",
    city: "",
    country: "Sri Lanka",
    domain: "",
    websiteUrl: "",
    description: "",
    logoUrl: "",
    bannerUrl: "",
    isVerified: true,
  });

  // Form state for add domain
  const [newDomain, setNewDomain] = useState("");
  const [isPrimaryDomain, setIsPrimaryDomain] = useState(false);

  // Active Detail Tab
  const [detailTab, setDetailTab] = useState<"overview" | "domains" | "faculties" | "organizations" | "audit">("overview");

  // Query: Universities List
  const universitiesQuery = useQuery({
    queryKey: [
      "admin",
      "universities",
      {
        search: searchTerm || undefined,
        isVerified: statusFilter === "all" ? undefined : statusFilter === "verified",
        city: cityFilter === "all" ? undefined : cityFilter,
        sortBy,
        sortOrder,
        startDate: dateFilter.startDate || undefined,
        endDate: dateFilter.endDate || undefined,
        year: dateFilter.year || undefined,
        month: dateFilter.month || undefined,
        datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
        page,
        limit,
      },
    ],
    queryFn: () =>
      adminApi.getUniversities({
        search: searchTerm || undefined,
        isVerified: statusFilter === "all" ? undefined : statusFilter === "verified",
        city: cityFilter === "all" ? undefined : cityFilter,
        sortBy,
        sortOrder,
        startDate: dateFilter.startDate || undefined,
        endDate: dateFilter.endDate || undefined,
        year: dateFilter.year || undefined,
        month: dateFilter.month || undefined,
        datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
        page,
        limit,
      }),
  });

  const handleExport = async (format: "csv" | "pdf") => {
    const totalCount = universitiesQuery.data?.meta?.total ?? 0;
    if (totalCount === 0) {
      toast.info("No universities match the active filters to export.");
      return;
    }

    if (format === "csv") setIsExportingCsv(true);
    else setIsExportingPdf(true);

    try {
      toast.info(`Generating ${format.toUpperCase()} export...`, {
        description: `Exporting all ${totalCount.toLocaleString()} filtered universities.`,
      });

      const filename = await adminApi.exportData("universities", format, {
        search: searchTerm || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        isVerified: statusFilter === "all" ? undefined : statusFilter === "verified",
        city: cityFilter !== "all" ? cityFilter : undefined,
        sortBy,
        sortOrder,
        startDate: dateFilter.startDate || undefined,
        endDate: dateFilter.endDate || undefined,
        year: dateFilter.year || undefined,
        month: dateFilter.month || undefined,
        datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
      });

      toast.success("Export ready!", { description: `Downloaded ${filename}` });
    } catch (err: any) {
      toast.error("Export failed", { description: err?.message || "Failed to generate export" });
    } finally {
      if (format === "csv") setIsExportingCsv(false);
      else setIsExportingPdf(false);
    }
  };

  // Query: University Stats
  const statsQuery = useQuery({
    queryKey: ["admin", "universities-stats"],
    queryFn: () => adminApi.getUniversityStats(),
  });

  // Query: Selected University Detail
  const detailQuery = useQuery({
    queryKey: ["admin", "university-detail", detailModalId],
    queryFn: () => (detailModalId ? adminApi.getUniversityDetails(detailModalId) : null),
    enabled: !!detailModalId,
  });

  const universities = universitiesQuery.data?.data || [];
  const totalRecords = universitiesQuery.data?.total || 0;
  const totalPages = universitiesQuery.data?.totalPages || 1;
  const stats: UniversityStats = statsQuery.data ||
    universitiesQuery.data?.stats || {
      total: totalRecords,
      verified: 0,
      unverified: 0,
      totalFaculties: 0,
      totalDepartments: 0,
      totalDomains: 0,
    };

  // Get distinct cities for filter dropdown
  const distinctCities = useMemo(() => {
    const set = new Set<string>();
    universities.forEach((u) => {
      if (u.city) set.add(u.city);
    });
    return Array.from(set).sort();
  }, [universities]);

  // Invalidate queries helper
  const invalidateQueries = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin", "universities"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "universities-stats"] });
    void queryClient.invalidateQueries({ queryKey: ["universities"] });
    void queryClient.invalidateQueries({ queryKey: ["university"] });
    void queryClient.invalidateQueries({ queryKey: ["organizations"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "faculties"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "departments"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "overview-stats"] });
    if (detailModalId) {
      void queryClient.invalidateQueries({ queryKey: ["admin", "university-detail", detailModalId] });
    }
  };

  // Mutation: Create University
  const createMutation = useMutation({
    mutationFn: (data: typeof createForm) => adminApi.createUniversity(data),
    onSuccess: (res) => {
      toast.success(`Campus "${res.name}" created successfully!`);
      setCreateModalOpen(false);
      setCreateForm({
        name: "",
        code: "",
        slug: "",
        city: "",
        country: "Sri Lanka",
        domain: "",
        websiteUrl: "",
        description: "",
        logoUrl: "",
        isVerified: true,
      });
      invalidateQueries();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create university campus");
    },
  });

  // Mutation: Update University
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: typeof editForm }) => adminApi.updateUniversity(id, data),
    onSuccess: (res) => {
      toast.success(`Campus "${res.name}" updated successfully!`);
      setEditModalUni(null);
      invalidateQueries();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update university details");
    },
  });

  // Mutation: Toggle Status (Activate / Deactivate)
  const toggleStatusMutation = useMutation({
    mutationFn: (id: string) => adminApi.toggleUniversityStatus(id),
    onSuccess: (res) => {
      toast.success(
        res.isVerified
          ? `Institution "${res.name}" is now active and verified.`
          : `Institution "${res.name}" has been deactivated.`
      );
      setStatusConfirmUni(null);
      invalidateQueries();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to toggle university status");
    },
  });

  // Mutation: Delete University
  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteUniversity(id),
    onSuccess: (res) => {
      toast.success(res.message || "University removed successfully.");
      setDeleteConfirmUni(null);
      if (detailModalId) setDetailModalId(null);
      invalidateQueries();
    },
    onError: (err: any) => {
      toast.error(err.message || "Cannot delete university");
    },
  });

  // Mutation: Add Domain
  const addDomainMutation = useMutation({
    mutationFn: ({ universityId, domain, isPrimary }: { universityId: string; domain: string; isPrimary: boolean }) =>
      adminApi.addUniversityDomain(universityId, domain, isPrimary),
    onSuccess: (res) => {
      toast.success(`Authorized email domain "@${res.domain}" added successfully!`);
      setDomainModalUni(null);
      setNewDomain("");
      setIsPrimaryDomain(false);
      invalidateQueries();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to authorize email domain");
    },
  });

  // Mutation: Delete Domain
  const deleteDomainMutation = useMutation({
    mutationFn: ({ domainId, universityId }: { domainId: string; universityId: string }) =>
      adminApi.deleteUniversityDomain(domainId, universityId),
    onSuccess: () => {
      toast.success("Authorized email domain removed.");
      invalidateQueries();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to remove email domain");
    },
  });

  // Auto-generate slug and code from name in create form
  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const code = name
      .split(/\s+/)
      .filter((w) => !["of", "and", "the", "for", "in"].includes(w.toLowerCase()))
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 8);

    setCreateForm((prev) => ({
      ...prev,
      name,
      slug: prev.slug === "" || prev.slug === name.toLowerCase().replace(/\s+/g, "-").slice(0, -1) ? slug : prev.slug,
      code: prev.code === "" ? code : prev.code,
    }));
  };

  const handleOpenEdit = (uni: UniversityItem) => {
    setEditForm({
      name: uni.name,
      code: uni.code,
      slug: uni.slug,
      city: uni.city,
      country: uni.country || "Sri Lanka",
      domain: uni.domain || "",
      websiteUrl: uni.websiteUrl || "",
      description: uni.description || "",
      logoUrl: uni.logoUrl || "",
      bannerUrl: uni.bannerUrl || "",
      isVerified: uni.isVerified,
    });
    setEditModalUni(uni);
  };

  const handleOpenAddDomain = (uni: { id: string; name: string }) => {
    setDomainModalUni(uni);
    setNewDomain("");
    setIsPrimaryDomain(false);
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* KPI METRIC CARDS */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Campuses</span>
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Building2 className="size-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">{stats.total}</span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">Partner institutions</p>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 shadow-sm transition-all hover:border-emerald-500/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Active / Verified
            </span>
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="size-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{stats.verified}</span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {stats.total > 0 ? Math.round((stats.verified / stats.total) * 100) : 100}%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-emerald-600/80 dark:text-emerald-400/80">Operational directory</p>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 shadow-sm transition-all hover:border-amber-500/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Inactive Campuses
            </span>
            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
              <XCircle className="size-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-700 dark:text-amber-300">{stats.unverified}</span>
          </div>
          <p className="mt-1 text-[11px] text-amber-600/80 dark:text-amber-400/80">Pending/Suspended</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Faculties</span>
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
              <GraduationCap className="size-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">{stats.totalFaculties}</span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">Academic divisions</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Departments</span>
            <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400">
              <Layers className="size-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">{stats.totalDepartments}</span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">Specialized curricula</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Authorized Domains</span>
            <div className="rounded-lg bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400">
              <Mail className="size-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">{stats.totalDomains}</span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">Verified email suffixes</p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FILTER & ACTION TOOLBAR */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative min-w-[240px] flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search campuses by name, code, domain, city..."
              className="h-9 pl-9 text-xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Statuses</option>
            <option value="verified">Verified / Active</option>
            <option value="unverified">Inactive / Pending</option>
          </select>

          {/* City Filter */}
          {distinctCities.length > 0 && (
            <select
              value={cityFilter}
              onChange={(e) => {
                setCityFilter(e.target.value);
                setPage(1);
              }}
              className="h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Locations</option>
              {distinctCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          )}

          {/* Sorting */}
          <select
            value={`${sortBy}:${sortOrder}`}
            onChange={(e) => {
              const parts = e.target.value.split(":");
              if (parts[0] && parts[1]) {
                setSortBy(parts[0]);
                setSortOrder(parts[1] as "asc" | "desc");
              }
            }}
            className="h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="name:asc">Name (A-Z)</option>
            <option value="name:desc">Name (Z-A)</option>
            <option value="code:asc">Code (A-Z)</option>
            <option value="createdAt:desc">Newest First</option>
            <option value="faculties:desc">Most Faculties</option>
          </select>

          {/* Date Filter */}
          <AdminDateFilter
            values={dateFilter}
            onChange={(val) => {
              setDateFilter(val);
              setPage(1);
            }}
            compact
          />

          {/* Reset Filters */}
          {(searchTerm ||
            statusFilter !== "all" ||
            cityFilter !== "all" ||
            dateFilter.startDate ||
            dateFilter.endDate ||
            dateFilter.year ||
            dateFilter.month ||
            (dateFilter.preset && dateFilter.preset !== "ALL")) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setCityFilter("all");
                setDateFilter({ preset: "ALL", year: "", month: "", startDate: "", endDate: "" });
                setPage(1);
              }}
              className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="mr-1 size-3.5" /> Reset
            </Button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Export CSV Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("csv")}
            disabled={isExportingCsv || universitiesQuery.isLoading}
            className="h-9 text-xs font-semibold gap-1.5"
            title="Export filtered universities as CSV"
          >
            {isExportingCsv ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <FileSpreadsheet className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            )}
            Export CSV
          </Button>

          {/* Export PDF Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("pdf")}
            disabled={isExportingPdf || universitiesQuery.isLoading}
            className="h-9 text-xs font-semibold gap-1.5"
            title="Export filtered universities as branded PDF"
          >
            {isExportingPdf ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <FileText className="size-3.5 text-rose-600 dark:text-rose-400" />
            )}
            Export PDF
          </Button>

          {onOpenCreateFaculty && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenCreateFaculty()}
              className="h-9 text-xs"
            >
              <GraduationCap className="mr-1.5 size-4 text-primary" /> Add Faculty
            </Button>
          )}
          <Button
            size="sm"
            onClick={() => setCreateModalOpen(true)}
            className="h-9 text-xs shadow-sm"
          >
            <Plus className="mr-1.5 size-4" /> Add Campus
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* UNIVERSITIES LIST / GRID */}
      {/* ------------------------------------------------------------- */}
      {universitiesQuery.isPending ? (
        <RowSkeleton />
      ) : universitiesQuery.isError ? (
        <ErrorState onRetry={() => universitiesQuery.refetch()} />
      ) : universities.length === 0 ? (
        <EmptyState
          title="No universities match your filters"
          description={
            searchTerm || statusFilter !== "all" || cityFilter !== "all"
              ? "Try adjusting your search criteria or resetting filters."
              : "No universities registered in the platform database yet. Click 'Add Campus' to get started."
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {universities.map((u) => {
            const facultyCount = u._count?.faculties ?? u.faculties?.length ?? 0;
            const orgCount = u._count?.organizations ?? u.organizations?.length ?? 0;
            const studentCount = u._count?.studentProfiles ?? u._count?.users ?? 0;
            const domains = u.emailDomains || [];

            return (
              <div
                key={u.id}
                className={cn(
                  "group relative flex flex-col justify-between rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md",
                  u.isVerified
                    ? "border-border hover:border-primary/40"
                    : "border-amber-500/30 bg-amber-500/[0.02] hover:border-amber-500/50"
                )}
              >
                {/* Header: Identity & Status */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      {/* Logo or Initial Avatar */}
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted/60 shadow-xs">
                        {u.logoUrl ? (
                          <img
                            src={u.logoUrl}
                            alt={u.name}
                            className="size-10 rounded-lg object-contain p-0.5"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <Building className="size-5 text-primary" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
                            {u.code}
                          </span>
                          {u.isVerified ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                              <ShieldCheck className="size-3" /> Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                              <XCircle className="size-3" /> Inactive
                            </span>
                          )}
                        </div>

                        <h3 className="mt-1 text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {u.name}
                        </h3>

                        <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <MapPin className="size-3 text-muted-foreground/80 shrink-0" />
                          <span>
                            {u.city}, {u.country || "Sri Lanka"}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Actions Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-foreground">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="text-xs">Campus Governance</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setDetailModalId(u.id);
                            setDetailTab("overview");
                          }}
                          className="text-xs cursor-pointer"
                        >
                          <Eye className="mr-2 size-3.5 text-primary" /> Inspect Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenEdit(u)} className="text-xs cursor-pointer">
                          <Edit className="mr-2 size-3.5 text-blue-500" /> Edit Campus
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenAddDomain(u)} className="text-xs cursor-pointer">
                          <Mail className="mr-2 size-3.5 text-purple-500" /> Add Email Domain
                        </DropdownMenuItem>
                        {onOpenCreateFaculty && (
                          <DropdownMenuItem
                            onClick={() => onOpenCreateFaculty(u.id)}
                            className="text-xs cursor-pointer"
                          >
                            <GraduationCap className="mr-2 size-3.5 text-emerald-500" /> Add Faculty
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setStatusConfirmUni(u)}
                          className="text-xs cursor-pointer"
                        >
                          {u.isVerified ? (
                            <span className="flex items-center text-amber-600 dark:text-amber-400">
                              <XCircle className="mr-2 size-3.5" /> Deactivate Campus
                            </span>
                          ) : (
                            <span className="flex items-center text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="mr-2 size-3.5" /> Activate Campus
                            </span>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeleteConfirmUni(u)}
                          className="text-xs text-rose-600 dark:text-rose-400 cursor-pointer"
                        >
                          <Trash2 className="mr-2 size-3.5" /> Delete Campus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Description snippet if present */}
                  {u.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {u.description}
                    </p>
                  )}

                  {/* Authorized Email Domains */}
                  <div className="rounded-lg bg-muted/40 p-2.5 border border-border/40 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                        <Mail className="size-3" /> Authorized Email Domains ({domains.length})
                      </span>
                      <button
                        onClick={() => handleOpenAddDomain(u)}
                        className="text-[11px] font-semibold text-primary hover:underline"
                      >
                        + Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {domains.length === 0 ? (
                        <span className="text-[11px] italic text-muted-foreground">
                          {u.domain ? `@${u.domain}` : "No email domains registered"}
                        </span>
                      ) : (
                        domains.map((d) => (
                          <span
                            key={d.id}
                            className={cn(
                              "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-mono",
                              d.isPrimary
                                ? "bg-primary/10 text-primary font-bold border border-primary/20"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            @{d.domain}
                            {d.isPrimary && <span className="text-[8px] uppercase tracking-tighter">[Primary]</span>}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer: Hierarchy Counts & Action Buttons */}
                <div className="mt-4 border-t border-border/50 pt-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="size-3 text-muted-foreground/80" />
                      <strong className="text-foreground font-semibold">{facultyCount}</strong> Faculties
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="size-3 text-muted-foreground/80" />
                      <strong className="text-foreground font-semibold">{orgCount}</strong> Societies
                    </span>
                    <span className="flex items-center gap-1">
                      <strong className="text-foreground font-semibold">{studentCount}</strong> Students
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs px-2.5"
                    onClick={() => {
                      setDetailModalId(u.id);
                      setDetailTab("overview");
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PAGINATION */}
      {/* ------------------------------------------------------------- */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            Showing <strong className="text-foreground">{universities.length}</strong> of{" "}
            <strong className="text-foreground">{totalRecords}</strong> campuses
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-8 text-xs"
            >
              Previous
            </Button>
            <span className="text-xs font-medium text-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="h-8 text-xs"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: CREATE CAMPUS */}
      {/* ------------------------------------------------------------- */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Building2 className="size-5 text-primary" /> Add Higher Education Campus
            </DialogTitle>
            <DialogDescription className="text-xs">
              Register a new university partner institution, campus code, and default email domain for student onboarding.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!createForm.name || !createForm.code || !createForm.city) {
                toast.error("Please fill in all required fields (Name, Code, City).");
                return;
              }
              createMutation.mutate(createForm);
            }}
            className="space-y-4 py-2"
          >
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                University Full Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                required
                value={createForm.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. University of Colombo"
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Campus Code <span className="text-rose-500">*</span>
                </Label>
                <Input
                  required
                  value={createForm.code}
                  onChange={(e) => setCreateForm({ ...createForm, code: e.target.value.toUpperCase().trim() })}
                  placeholder="e.g. UOC"
                  className="font-mono text-xs uppercase"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  URL Slug <span className="text-rose-500">*</span>
                </Label>
                <Input
                  required
                  value={createForm.slug}
                  onChange={(e) => setCreateForm({ ...createForm, slug: e.target.value.toLowerCase().trim() })}
                  placeholder="e.g. university-of-colombo"
                  className="font-mono text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  City <span className="text-rose-500">*</span>
                </Label>
                <Input
                  required
                  value={createForm.city}
                  onChange={(e) => setCreateForm({ ...createForm, city: e.target.value })}
                  placeholder="e.g. Colombo"
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Country</Label>
                <Input
                  value={createForm.country}
                  onChange={(e) => setCreateForm({ ...createForm, country: e.target.value })}
                  placeholder="Sri Lanka"
                  className="text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Primary Email Domain
                </Label>
                <Input
                  value={createForm.domain}
                  onChange={(e) => setCreateForm({ ...createForm, domain: e.target.value.toLowerCase().trim() })}
                  placeholder="e.g. cmb.ac.lk or sliit.lk"
                  className="font-mono text-xs"
                />
                <p className="text-[10px] text-muted-foreground">Used for auto-verifying student registrations.</p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Official Website</Label>
                <Input
                  value={createForm.websiteUrl}
                  onChange={(e) => setCreateForm({ ...createForm, websiteUrl: e.target.value })}
                  placeholder="https://www.cmb.ac.lk"
                  className="text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Logo Image URL</Label>
              <Input
                value={createForm.logoUrl}
                onChange={(e) => setCreateForm({ ...createForm, logoUrl: e.target.value })}
                placeholder="https://storage.campuspulse.lk/logos/uoc.png"
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Description</Label>
              <Textarea
                rows={2}
                value={createForm.description}
                onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                placeholder="Brief summary about the campus, history, or faculties..."
                className="text-xs"
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <Label className="text-xs font-semibold">Active & Verified Institution</Label>
                <p className="text-[10px] text-muted-foreground">
                  Enable active directory listing and allow students to select this campus.
                </p>
              </div>
              <Switch
                checked={createForm.isVerified}
                onCheckedChange={(checked) => setCreateForm({ ...createForm, isVerified: checked })}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creating..." : "Create Campus"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 2: EDIT CAMPUS */}
      {/* ------------------------------------------------------------- */}
      <Dialog open={!!editModalUni} onOpenChange={(open) => !open && setEditModalUni(null)}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Edit className="size-5 text-primary" /> Edit Campus Details
            </DialogTitle>
            <DialogDescription className="text-xs">
              Update institutional metadata, location, code, or active directory status for {editModalUni?.name}.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!editModalUni) return;
              updateMutation.mutate({ id: editModalUni.id, data: editForm });
            }}
            className="space-y-4 py-2"
          >
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                University Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                required
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Campus Code <span className="text-rose-500">*</span>
                </Label>
                <Input
                  required
                  value={editForm.code}
                  onChange={(e) => setEditForm({ ...editForm, code: e.target.value.toUpperCase().trim() })}
                  className="font-mono text-xs uppercase"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  URL Slug <span className="text-rose-500">*</span>
                </Label>
                <Input
                  required
                  value={editForm.slug}
                  onChange={(e) => setEditForm({ ...editForm, slug: e.target.value.toLowerCase().trim() })}
                  className="font-mono text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  City <span className="text-rose-500">*</span>
                </Label>
                <Input
                  required
                  value={editForm.city}
                  onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Country</Label>
                <Input
                  value={editForm.country}
                  onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Primary Email Domain</Label>
                <Input
                  value={editForm.domain}
                  onChange={(e) => setEditForm({ ...editForm, domain: e.target.value.toLowerCase().trim() })}
                  placeholder="e.g. sliit.lk"
                  className="font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Official Website</Label>
                <Input
                  value={editForm.websiteUrl}
                  onChange={(e) => setEditForm({ ...editForm, websiteUrl: e.target.value })}
                  placeholder="https://..."
                  className="text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Logo URL</Label>
                <Input
                  value={editForm.logoUrl}
                  onChange={(e) => setEditForm({ ...editForm, logoUrl: e.target.value })}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Banner URL</Label>
                <Input
                  value={editForm.bannerUrl}
                  onChange={(e) => setEditForm({ ...editForm, bannerUrl: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Description</Label>
              <Textarea
                rows={2}
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="text-xs"
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <Label className="text-xs font-semibold">Active & Verified Status</Label>
                <p className="text-[10px] text-muted-foreground">
                  Controls whether students and societies can affiliate with this institution.
                </p>
              </div>
              <Switch
                checked={editForm.isVerified}
                onCheckedChange={(checked) => setEditForm({ ...editForm, isVerified: checked })}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setEditModalUni(null)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 3: ADD AUTHORIZED DOMAIN */}
      {/* ------------------------------------------------------------- */}
      <Dialog open={!!domainModalUni} onOpenChange={(open) => !open && setDomainModalUni(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Mail className="size-5 text-purple-500" /> Authorize Institutional Email Domain
            </DialogTitle>
            <DialogDescription className="text-xs">
              Add an authorized email suffix for <strong>{domainModalUni?.name}</strong>. Student registrations matching
              this domain or its subdomains will automatically link to this university.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!domainModalUni || !newDomain.trim()) return;
              addDomainMutation.mutate({
                universityId: domainModalUni.id,
                domain: newDomain.trim(),
                isPrimary: isPrimaryDomain,
              });
            }}
            className="space-y-4 py-2"
          >
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                Email Domain Suffix <span className="text-rose-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground">
                  @
                </span>
                <Input
                  required
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value.toLowerCase().replace(/^@+/, ""))}
                  placeholder="student.uoc.lk or my.sliit.lk"
                  className="pl-7 font-mono text-xs"
                />
              </div>
              <p className="text-[10px] text-muted-foreground">
                Do not include the "@" sign. Matches exact domain and child subdomains.
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <Label className="text-xs font-semibold">Set as Primary Campus Domain</Label>
                <p className="text-[10px] text-muted-foreground">
                  Marks this as the default domain on the university public profile.
                </p>
              </div>
              <Switch checked={isPrimaryDomain} onCheckedChange={setIsPrimaryDomain} />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setDomainModalUni(null)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={addDomainMutation.isPending || !newDomain.trim()}>
                {addDomainMutation.isPending ? "Authorizing..." : "Authorize Domain"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 4: ACTIVATE / DEACTIVATE CONFIRMATION */}
      {/* ------------------------------------------------------------- */}
      <Dialog open={!!statusConfirmUni} onOpenChange={(open) => !open && setStatusConfirmUni(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              {statusConfirmUni?.isVerified ? (
                <>
                  <AlertTriangle className="size-5 text-amber-500" /> Deactivate Institution
                </>
              ) : (
                <>
                  <ShieldCheck className="size-5 text-emerald-500" /> Activate Institution
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-xs leading-relaxed">
              {statusConfirmUni?.isVerified ? (
                <>
                  Are you sure you want to deactivate <strong>{statusConfirmUni.name}</strong>?
                  <br />
                  <br />
                  Deactivation will temporarily hide this university from registration selectors and suspend automated
                  email domain matching. Existing student profiles and historical event records will remain intact.
                </>
              ) : (
                <>
                  Are you sure you want to activate and verify <strong>{statusConfirmUni?.name}</strong>?
                  <br />
                  <br />
                  Students will be able to select this university during onboarding and affiliated email domains will be
                  automatically verified.
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-2">
            <Button variant="outline" size="sm" onClick={() => setStatusConfirmUni(null)}>
              Cancel
            </Button>
            <Button
              variant={statusConfirmUni?.isVerified ? "destructive" : "default"}
              size="sm"
              disabled={toggleStatusMutation.isPending}
              onClick={() => {
                if (statusConfirmUni) toggleStatusMutation.mutate(statusConfirmUni.id);
              }}
            >
              {toggleStatusMutation.isPending
                ? "Updating..."
                : statusConfirmUni?.isVerified
                ? "Confirm Deactivation"
                : "Confirm Activation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 5: DELETE UNIVERSITY CONFIRMATION */}
      {/* ------------------------------------------------------------- */}
      <Dialog open={!!deleteConfirmUni} onOpenChange={(open) => !open && setDeleteConfirmUni(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base text-rose-600">
              <Trash2 className="size-5" /> Delete University Campus
            </DialogTitle>
            <DialogDescription className="text-xs leading-relaxed">
              Are you sure you want to permanently delete <strong>{deleteConfirmUni?.name}</strong>?
              <br />
              <br />
              <strong>Safety Protection:</strong> If this university has associated students, societies, or events in the
              database, deletion will be blocked by the server to protect historical records. Deactivate the university
              instead if it is no longer operational.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-2">
            <Button variant="outline" size="sm" onClick={() => setDeleteConfirmUni(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={deleteMutation.isPending}
              onClick={() => {
                if (deleteConfirmUni) deleteMutation.mutate(deleteConfirmUni.id);
              }}
            >
              {deleteMutation.isPending ? "Deleting..." : "Permanently Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 6: DETAILED UNIVERSITY INSPECTION & GOVERNANCE */}
      {/* ------------------------------------------------------------- */}
      <Dialog open={!!detailModalId} onOpenChange={(open) => !open && setDetailModalId(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          {detailQuery.isPending ? (
            <div className="p-8">
              <RowSkeleton />
            </div>
          ) : detailQuery.isError || !detailQuery.data ? (
            <div className="p-8">
              <ErrorState onRetry={() => detailQuery.refetch()} />
            </div>
          ) : (
            (() => {
              const u = detailQuery.data.university;
              const audit = detailQuery.data.auditHistory || [];
              const faculties = u.faculties || [];
              const organizations = u.organizations || [];
              const domains = u.emailDomains || [];

              return (
                <div className="flex flex-col">
                  {/* Header Banner */}
                  <div className="relative border-b border-border bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                          {u.logoUrl ? (
                            <img
                              src={u.logoUrl}
                              alt={u.name}
                              className="size-12 rounded-xl object-contain p-1"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <Building2 className="size-7 text-primary" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="rounded bg-primary/15 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                              {u.code}
                            </span>
                            {u.isVerified ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                <ShieldCheck className="size-3.5" /> Verified Campus
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                                <XCircle className="size-3.5" /> Inactive
                              </span>
                            )}
                          </div>

                          <h2 className="mt-1 text-lg font-black text-foreground">{u.name}</h2>
                          <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                            <MapPin className="size-3 text-muted-foreground shrink-0" />
                            <span>
                              {u.city}, {u.country || "Sri Lanka"}
                            </span>
                            {u.websiteUrl && (
                              <>
                                <span>•</span>
                                <a
                                  href={u.websiteUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center gap-1 text-primary hover:underline"
                                >
                                  <Globe className="size-3" /> Website <ExternalLink className="size-2.5" />
                                </a>
                              </>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEdit(u)}
                          className="h-8 text-xs"
                        >
                          <Edit className="mr-1.5 size-3.5" /> Edit
                        </Button>
                      </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="mt-6 flex items-center gap-2 border-t border-border/60 pt-3">
                      <button
                        onClick={() => setDetailTab("overview")}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                          detailTab === "overview"
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setDetailTab("domains")}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5",
                          detailTab === "domains"
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <Mail className="size-3.5" /> Domains ({domains.length})
                      </button>
                      <button
                        onClick={() => setDetailTab("faculties")}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5",
                          detailTab === "faculties"
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <GraduationCap className="size-3.5" /> Faculties ({faculties.length})
                      </button>
                      <button
                        onClick={() => setDetailTab("organizations")}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5",
                          detailTab === "organizations"
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <Users className="size-3.5" /> Societies ({organizations.length})
                      </button>
                      <button
                        onClick={() => setDetailTab("audit")}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5",
                          detailTab === "audit"
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <Info className="size-3.5" /> Audit History
                      </button>
                    </div>
                  </div>

                  {/* Body Content by Tab */}
                  <div className="p-6">
                    {/* TAB 1: OVERVIEW */}
                    {detailTab === "overview" && (
                      <div className="space-y-6">
                        {/* Counts Metrics */}
                        <div className="grid grid-cols-4 gap-3">
                          <div className="rounded-xl border border-border bg-card p-3 text-center">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              Faculties
                            </span>
                            <p className="text-xl font-bold text-foreground mt-1">
                              {u._count?.faculties || faculties.length}
                            </p>
                          </div>
                          <div className="rounded-xl border border-border bg-card p-3 text-center">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              Societies
                            </span>
                            <p className="text-xl font-bold text-foreground mt-1">
                              {u._count?.organizations || organizations.length}
                            </p>
                          </div>
                          <div className="rounded-xl border border-border bg-card p-3 text-center">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              Students
                            </span>
                            <p className="text-xl font-bold text-foreground mt-1">
                              {u._count?.studentProfiles || u._count?.users || 0}
                            </p>
                          </div>
                          <div className="rounded-xl border border-border bg-card p-3 text-center">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              Events
                            </span>
                            <p className="text-xl font-bold text-foreground mt-1">{u._count?.events || 0}</p>
                          </div>
                        </div>

                        {/* Description */}
                        {u.description && (
                          <div className="space-y-1.5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              About Institution
                            </h4>
                            <p className="text-xs text-foreground leading-relaxed rounded-xl bg-muted/30 p-3 border border-border/40">
                              {u.description}
                            </p>
                          </div>
                        )}

                        {/* Quick Metadata */}
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-1">
                            <span className="text-[10px] font-bold uppercase text-muted-foreground">Internal Slug</span>
                            <p className="font-mono font-medium text-foreground">{u.slug}</p>
                          </div>
                          <div className="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-1">
                            <span className="text-[10px] font-bold uppercase text-muted-foreground">Registered On</span>
                            <p className="font-medium text-foreground">{formatDate(u.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 2: DOMAINS */}
                    {detailTab === "domains" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-foreground">Authorized Email Suffixes</h3>
                            <p className="text-xs text-muted-foreground">
                              Student registrations using emails under these domains are automatically linked and verified.
                            </p>
                          </div>
                          <Button size="sm" onClick={() => handleOpenAddDomain(u)} className="h-8 text-xs">
                            <Plus className="mr-1 size-3.5" /> Add Domain
                          </Button>
                        </div>

                        {domains.length === 0 ? (
                          <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                            No authorized email domains registered yet.
                          </div>
                        ) : (
                          <div className="divide-y divide-border/50 rounded-xl border border-border bg-card">
                            {domains.map((d: any) => (
                              <div key={d.id} className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-2.5">
                                  <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold">
                                    @
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-mono text-xs font-bold text-foreground">{d.domain}</span>
                                      {d.isPrimary && (
                                        <span className="rounded bg-primary/10 px-1.5 py-0.2 text-[9px] font-bold text-primary uppercase">
                                          Primary
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">
                                      Added on {formatDate(d.createdAt)}
                                    </p>
                                  </div>
                                </div>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-7 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                                  onClick={() => {
                                    if (confirm(`Remove authorized domain "@${d.domain}"?`)) {
                                      deleteDomainMutation.mutate({ domainId: d.id, universityId: u.id });
                                    }
                                  }}
                                >
                                  <Trash2 className="size-3.5" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB 3: FACULTIES */}
                    {detailTab === "faculties" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-foreground">Academic Faculties & Departments</h3>
                            <p className="text-xs text-muted-foreground">
                              Organizational branches and degree awarding divisions within this university.
                            </p>
                          </div>
                          {onOpenCreateFaculty && (
                            <Button
                              size="sm"
                              onClick={() => {
                                setDetailModalId(null);
                                onOpenCreateFaculty(u.id);
                              }}
                              className="h-8 text-xs"
                            >
                              <Plus className="mr-1 size-3.5" /> Add Faculty
                            </Button>
                          )}
                        </div>

                        {faculties.length === 0 ? (
                          <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                            No academic faculties configured yet for this campus.
                          </div>
                        ) : (
                          <div className="grid gap-3">
                            {faculties.map((f: any) => (
                              <div
                                key={f.id}
                                className="rounded-xl border border-border bg-card p-4 space-y-2.5 shadow-xs"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-mono text-[11px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                                        {f.code}
                                      </span>
                                      <h4 className="font-bold text-xs text-foreground">{f.name}</h4>
                                    </div>
                                    {f.description && (
                                      <p className="text-[11px] text-muted-foreground mt-1">{f.description}</p>
                                    )}
                                  </div>

                                  <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                    {f.departments?.length || f._count?.departments || 0} Departments
                                  </span>
                                </div>

                                {f.departments && f.departments.length > 0 && (
                                  <div className="border-t border-border/40 pt-2 flex flex-wrap gap-1.5">
                                    {f.departments.map((d: any) => (
                                      <span
                                        key={d.id}
                                        className="inline-flex items-center gap-1 rounded bg-muted/70 px-2 py-0.5 text-[11px] text-muted-foreground"
                                      >
                                        <BookOpen className="size-2.5 text-primary" /> {d.name} ({d.code})
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB 4: SOCIETIES */}
                    {detailTab === "organizations" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-foreground">Affiliated Student Societies</h3>
                            <p className="text-xs text-muted-foreground">
                              Registered clubs, student chapters, and official bodies affiliated with this campus.
                            </p>
                          </div>
                        </div>

                        {organizations.length === 0 ? (
                          <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                            No student societies registered yet under this campus.
                          </div>
                        ) : (
                          <div className="grid gap-2 sm:grid-cols-2">
                            {organizations.map((org: any) => (
                              <div
                                key={org.id}
                                className="flex items-center justify-between rounded-xl border border-border bg-card p-3"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted border border-border/60">
                                    {org.logoUrl ? (
                                      <img
                                        src={org.logoUrl}
                                        alt={org.name}
                                        className="size-7 rounded object-contain"
                                      />
                                    ) : (
                                      <Users className="size-4 text-primary" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-1">
                                      <h5 className="font-bold text-xs text-foreground line-clamp-1">{org.name}</h5>
                                      {org.isVerified && (
                                        <ShieldCheck className="size-3 text-emerald-500 shrink-0" />
                                      )}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">
                                      {org.type} • {org._count?.members || 0} Members
                                    </p>
                                  </div>
                                </div>

                                <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                                  {org.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB 5: AUDIT LOGS */}
                    {detailTab === "audit" && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-bold text-foreground">Administrative Governance Trail</h3>
                        {audit.length === 0 ? (
                          <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                            No historical audit events logged for this institution yet.
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {audit.map((log: any) => (
                              <div
                                key={log.id}
                                className="flex items-start justify-between rounded-xl border border-border/60 bg-muted/20 p-3 text-xs"
                              >
                                <div className="space-y-0.5">
                                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                                    {log.action}
                                  </span>
                                  <p className="text-muted-foreground text-[11px]">
                                    By: {log.user?.name || log.user?.email || "Platform System"}
                                  </p>
                                  {log.reason && (
                                    <p className="text-[11px] text-foreground mt-1">Reason: {log.reason}</p>
                                  )}
                                </div>
                                <span className="text-[10px] text-muted-foreground">{formatDate(log.createdAt)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border p-4 bg-muted/20 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => setDetailModalId(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              );
            })()
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
