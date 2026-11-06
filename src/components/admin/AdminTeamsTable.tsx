import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Building,
  Trophy,
  MoreVertical,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminDataTable, type ColumnDef, type DateFilterValues } from "./AdminDataTable";
import { adminApi } from "@/lib/api/admin";
import { formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/common/Badges";

export function AdminTeamsTable() {
  // Filter state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
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

  const hasActiveFilters = Boolean(debouncedSearch || status || isDateActive);

  const queryParams = {
    search: debouncedSearch || undefined,
    status: status || undefined,
    startDate: dateFilter.startDate || undefined,
    endDate: dateFilter.endDate || undefined,
    year: dateFilter.year || undefined,
    month: dateFilter.month || undefined,
    datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
    page,
    limit: pageSize,
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin", "teams-table", queryParams],
    queryFn: () => adminApi.getTeams(queryParams),
  });

  const columns: ColumnDef<any>[] = [
    {
      key: "name",
      header: "Team / Squad",
      sortable: true,
      render: (t) => (
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 font-bold text-xs uppercase border border-indigo-200 dark:border-indigo-800/40">
            {t.name?.charAt(0) || "T"}
          </div>
          <div className="min-w-0">
            <span className="font-semibold text-foreground truncate block">{t.name}</span>
            <p className="text-[10px] font-mono text-muted-foreground/70 truncate">ID: {t.id?.slice(0, 8)}...</p>
          </div>
        </div>
      ),
    },
    {
      key: "event",
      header: "Associated Competition / Event",
      render: (t) => (
        <div>
          <div className="flex items-center gap-1 font-medium text-foreground">
            <Trophy className="size-3 text-amber-500 shrink-0" />
            <span className="truncate">{t.event?.title || "Independent Project / General"}</span>
          </div>
          {t.event?.startDate && (
            <p className="text-[10px] text-muted-foreground">{formatDate(t.event.startDate)}</p>
          )}
        </div>
      ),
    },
    {
      key: "leader",
      header: "Team Captain / Leader",
      render: (t) => (
        <div>
          <span className="font-medium text-foreground block">{t.leader?.name || "Unassigned"}</span>
          <span className="text-[11px] text-muted-foreground">{t.leader?.email}</span>
        </div>
      ),
    },
    {
      key: "members",
      header: "Roster / Slots",
      render: (t) => {
        const count = t.members?.length ?? t._count?.members ?? 0;
        const max = t.maxMembers || t.maxCapacity || 5;
        const isFull = count >= max;
        return (
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-foreground">
              {count} / {max}
            </span>
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                isFull
                  ? "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300"
                  : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
              }`}
            >
              {isFull ? "Full" : "Open"}
            </span>
          </div>
        );
      },
    },
    {
      key: "requests",
      header: "Join Requests",
      render: (t) => {
        const reqCount = t._count?.joinRequests ?? 0;
        return (
          <span className="text-xs font-semibold text-foreground">
            {reqCount} {reqCount === 1 ? "request" : "requests"}
          </span>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (t) => <StatusBadge status={t.status || "OPEN"} />,
    },
    {
      key: "createdAt",
      header: "Created Date",
      sortable: true,
      render: (t) => (
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
          {formatDate(t.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <AdminDataTable
      moduleKey="teams"
      title="Teaming Board & Squad Formations"
      description="Monitor hackathon teams, project squads, vacancy rosters, and student collaboration join requests."
      icon={<Users className="size-5" />}
      columns={columns}
      data={data?.data || []}
      totalRecords={data?.total || 0}
      loading={isLoading}
      error={error}
      onRefresh={() => refetch()}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search teams by name, leader, or opportunity..."
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
        <select
          value={status}
          onChange={(e) => handleFilterChange(setStatus, e.target.value)}
          className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">All Team Statuses</option>
          <option value="OPEN">Open for Members</option>
          <option value="FORMED">Formed / Complete</option>
          <option value="LOCKED">Locked</option>
          <option value="DISBANDED">Disbanded</option>
        </select>
      }
    />
  );
}
