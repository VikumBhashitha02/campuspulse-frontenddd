import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  HeartHandshake,
  Building,
  Building2,
  Calendar,
  Users,
} from "lucide-react";
import { AdminDataTable, type ColumnDef, type DateFilterValues } from "./AdminDataTable";
import { adminApi } from "@/lib/api/admin";
import { formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/common/Badges";

interface AdminVolunteeringTableProps {
  universities?: { id: string; name: string }[];
}

export function AdminVolunteeringTable({
  universities = [],
}: AdminVolunteeringTableProps) {
  // Filter state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [universityId, setUniversityId] = useState("");
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
    setUniversityId("");
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

  const hasActiveFilters = Boolean(debouncedSearch || status || universityId || isDateActive);

  const queryParams = {
    search: debouncedSearch || undefined,
    status: status || undefined,
    universityId: universityId || undefined,
    startDate: dateFilter.startDate || undefined,
    endDate: dateFilter.endDate || undefined,
    year: dateFilter.year || undefined,
    month: dateFilter.month || undefined,
    datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
    page,
    limit: pageSize,
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin", "volunteering-table", queryParams],
    queryFn: () => adminApi.getVolunteering(queryParams),
  });

  const columns: ColumnDef<any>[] = [
    {
      key: "title",
      header: "Volunteering Opportunity / Role",
      sortable: true,
      render: (v) => (
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 font-bold text-xs uppercase border border-rose-200 dark:border-rose-800/40">
            <HeartHandshake className="size-4" />
          </div>
          <div className="min-w-0">
            <span className="font-semibold text-foreground truncate block">{v.title}</span>
            <p className="text-[10px] font-mono text-muted-foreground/70 truncate">ID: {v.id?.slice(0, 8)}...</p>
          </div>
        </div>
      ),
    },
    {
      key: "event",
      header: "Associated Event / Host",
      render: (v) => (
        <div>
          <div className="flex items-center gap-1 font-medium text-foreground">
            <Calendar className="size-3 text-muted-foreground shrink-0" />
            <span className="truncate">{v.event?.title || "Community Engagement Initiative"}</span>
          </div>
          {v.event?.organization?.name && (
            <p className="text-[11px] text-muted-foreground">{v.event.organization.name}</p>
          )}
        </div>
      ),
    },
    {
      key: "slots",
      header: "Volunteers Needed",
      render: (v) => {
        const required = v.spots || v.requiredSlots || v.maxVolunteers || 10;
        const accepted = v.acceptedCount || v._count?.volunteers || 0;
        return (
          <div className="text-xs">
            <span className="font-semibold text-foreground">{accepted}</span> / {required} filled
          </div>
        );
      },
    },
    {
      key: "applications",
      header: "Applications",
      render: (v) => {
        const count = v.applicationCount ?? v._count?.applications ?? 0;
        return <span className="text-xs font-semibold text-foreground">{count} applied</span>;
      },
    },
    {
      key: "status",
      header: "Status",
      render: (v) => <StatusBadge status={v.status || "OPEN"} />,
    },
    {
      key: "createdAt",
      header: "Created Date",
      sortable: true,
      render: (v) => (
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
          {formatDate(v.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <AdminDataTable
      moduleKey="volunteering"
      title="Volunteering Hub & Community Engagement"
      description="Track university volunteer recruitment, event coordination shifts, applicant vetting, and service hours."
      icon={<HeartHandshake className="size-5" />}
      columns={columns}
      data={data?.data || []}
      totalRecords={data?.total || 0}
      loading={isLoading}
      error={error}
      onRefresh={() => refetch()}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search volunteering opportunities by role or host..."
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
            <option value="">All Opportunity Statuses</option>
            <option value="OPEN">Open for Applications</option>
            <option value="FILLED">Filled / Completed</option>
            <option value="CLOSED">Closed</option>
          </select>

          <select
            value={universityId}
            onChange={(e) => handleFilterChange(setUniversityId, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary max-w-[180px]"
          >
            <option value="">All Universities</option>
            {universities.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </>
      }
    />
  );
}
