import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Flag,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MoreVertical,
  ShieldAlert,
  Clock,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminDataTable, type ColumnDef, type DateFilterValues } from "./AdminDataTable";
import { adminApi } from "@/lib/api/admin";
import { formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/common/Badges";

interface AdminReportsTableProps {
  onResolveReport?: (report: { id: string; reason: string; status: "RESOLVED" | "DISMISSED" }) => void;
}

export function AdminReportsTable({ onResolveReport }: AdminReportsTableProps) {
  // Filter state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [targetType, setTargetType] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilterValues>({
    preset: "ALL",
    year: "",
    month: "",
    startDate: "",
    endDate: "",
  });

  // Pagination & Sorting state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(handler);
  }, [search]);

  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<any>>, value: any) => {
    setter(value);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setStatus("");
    setTargetType("");
    setDateFilter({ preset: "ALL", year: "", month: "", startDate: "", endDate: "" });
    setPage(1);
  };

  const isDateActive = Boolean(
    dateFilter.startDate ||
      dateFilter.endDate ||
      dateFilter.year ||
      dateFilter.month ||
      (dateFilter.preset && dateFilter.preset !== "ALL")
  );

  const hasActiveFilters = Boolean(debouncedSearch || status || targetType || isDateActive);

  const queryParams = {
    search: debouncedSearch || undefined,
    status: status || undefined,
    targetType: targetType || undefined,
    startDate: dateFilter.startDate || undefined,
    endDate: dateFilter.endDate || undefined,
    year: dateFilter.year || undefined,
    month: dateFilter.month || undefined,
    datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
    page,
    limit: pageSize,
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin", "reports-table", queryParams],
    queryFn: () => adminApi.getReports(queryParams),
  });

  const columns: ColumnDef<any>[] = [
    {
      key: "id",
      header: "Report ID & Target",
      render: (r) => (
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 font-bold text-xs uppercase border border-rose-200 dark:border-rose-800/40">
            <Flag className="size-4" />
          </div>
          <div className="min-w-0">
            <span className="font-semibold text-foreground truncate block">
              {r.targetType}: {r.targetEntity?.name || r.targetId || "Target Object"}
            </span>
            <p className="text-[10px] font-mono text-muted-foreground/70 truncate">ID: {r.id?.slice(0, 8)}...</p>
          </div>
        </div>
      ),
    },
    {
      key: "targetType",
      header: "Content Type",
      render: (r) => <StatusBadge status={r.targetType || "CONTENT"} />,
    },
    {
      key: "reason",
      header: "Reason & Specifics",
      render: (r) => (
        <div className="max-w-xs">
          <span className="font-medium text-foreground block text-xs">{r.reason}</span>
          {r.details && (
            <p className="text-[11px] text-muted-foreground truncate line-clamp-1">{r.details}</p>
          )}
        </div>
      ),
    },
    {
      key: "reporter",
      header: "Reporter",
      render: (r) => (
        <div>
          <span className="font-medium text-foreground block text-xs">
            {r.reporter?.name || "Campus Community Member"}
          </span>
          <span className="text-[10px] text-muted-foreground">{r.reporter?.email || "Anonymous flag"}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Review Status",
      render: (r) => <StatusBadge status={r.status || "PENDING"} />,
    },
    {
      key: "createdAt",
      header: "Reported Date",
      sortable: true,
      render: (r) => (
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
          {formatDate(r.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (r) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-7">
              <MoreVertical className="size-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-xs">
            <DropdownMenuLabel>Moderation Actions</DropdownMenuLabel>
            {onResolveReport && r.status !== "RESOLVED" && (
              <DropdownMenuItem
                className="text-emerald-600 focus:text-emerald-600"
                onClick={() => onResolveReport({ id: r.id, reason: r.reason, status: "RESOLVED" })}
              >
                <CheckCircle2 className="size-3.5 mr-2" /> Resolve & Enforce Action
              </DropdownMenuItem>
            )}
            {onResolveReport && r.status !== "DISMISSED" && (
              <DropdownMenuItem
                className="text-muted-foreground focus:text-foreground"
                onClick={() => onResolveReport({ id: r.id, reason: r.reason, status: "DISMISSED" })}
              >
                <XCircle className="size-3.5 mr-2" /> Dismiss Report
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AdminDataTable
      moduleKey="reports"
      title="Content Moderation & Safety Reports"
      description="Review user-submitted infringement reports, inappropriate content flags, community safety alerts, and enforcement history."
      icon={<ShieldAlert className="size-5" />}
      columns={columns}
      data={data?.data || []}
      totalRecords={data?.total || 0}
      loading={isLoading}
      error={error}
      onRefresh={() => refetch()}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search moderation reports by keyword or reference..."
      hasActiveFilters={hasActiveFilters}
      onResetFilters={handleResetFilters}
      dateFilter={dateFilter}
      onDateFilterChange={(df) => handleFilterChange(setDateFilter, df)}
      page={page}
      pageSize={pageSize}
      onPageChange={setPage}
      onPageSizeChange={(size) => {
        setPageSize(size);
        setPage(1);
      }}
      currentFilterQuery={queryParams}
      filterSlots={
        <>
          <select
            value={status}
            onChange={(e) => handleFilterChange(setStatus, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Review Statuses</option>
            <option value="PENDING">Pending Review</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="RESOLVED">Resolved / Action Taken</option>
            <option value="DISMISSED">Dismissed / Inapplicable</option>
          </select>

          <select
            value={targetType}
            onChange={(e) => handleFilterChange(setTargetType, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Target Types</option>
            <option value="EVENT">Event Opportunities</option>
            <option value="ORGANIZATION">Societies & Clubs</option>
            <option value="USER">User Accounts</option>
            <option value="TEAM">Teams & Projects</option>
          </select>
        </>
      }
    />
  );
}
