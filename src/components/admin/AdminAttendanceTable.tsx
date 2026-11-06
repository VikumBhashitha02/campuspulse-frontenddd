import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  Calendar,
  Building,
  UserCheck,
  Clock,
  Ticket,
} from "lucide-react";
import { AdminDataTable, type ColumnDef, type DateFilterValues } from "./AdminDataTable";
import { adminApi } from "@/lib/api/admin";
import { formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/common/Badges";

interface AdminAttendanceTableProps {
  universities?: { id: string; name: string }[];
}

export function AdminAttendanceTable({ universities = [] }: AdminAttendanceTableProps) {
  // Filter state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isPresent, setIsPresent] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilterValues>({
    preset: "ALL",
    year: "",
    month: "",
    startDate: "",
    endDate: "",
  });

  // Pagination state
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
    setIsPresent("");
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

  const hasActiveFilters = Boolean(debouncedSearch || isPresent || universityId || isDateActive);

  const queryParams = {
    search: debouncedSearch || undefined,
    isPresent: isPresent === "PRESENT" ? true : isPresent === "ABSENT" ? false : undefined,
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
    queryKey: ["admin", "attendance-table", queryParams],
    queryFn: () => adminApi.getAttendance(queryParams),
  });

  const columns: ColumnDef<any>[] = [
    {
      key: "attendee",
      header: "Attendee Identity",
      render: (a) => (
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 font-bold text-xs uppercase border border-emerald-200 dark:border-emerald-800/40">
            <UserCheck className="size-4" />
          </div>
          <div className="min-w-0">
            <span className="font-semibold text-foreground truncate block">
              {a.user?.name || a.attendeeName || "Attendee"}
            </span>
            <p className="text-[11px] text-muted-foreground truncate">{a.user?.email || a.attendeeEmail}</p>
            <p className="text-[10px] font-mono text-muted-foreground/70 truncate">ID: {a.id?.slice(0, 8)}...</p>
          </div>
        </div>
      ),
    },
    {
      key: "event",
      header: "Opportunity / Event",
      render: (a) => (
        <div>
          <div className="flex items-center gap-1 font-medium text-foreground">
            <Calendar className="size-3 text-muted-foreground shrink-0" />
            <span className="truncate">{a.event?.title || "Event Roster"}</span>
          </div>
          {a.event?.university?.name && (
            <p className="text-[11px] text-muted-foreground">{a.event.university.name}</p>
          )}
        </div>
      ),
    },
    {
      key: "ticket",
      header: "Ticket / Reference",
      render: (a) => (
        <span className="text-xs font-mono font-medium text-foreground">
          {a.ticket?.ticketNumber || a.registration?.id?.slice(0, 8) || "Direct Pass"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Attendance Status",
      render: (a) => (
        a.isPresent !== false ? (
          <span className="inline-flex items-center gap-1 rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
            <CheckCircle2 className="size-3 text-emerald-500" /> Present
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 text-[11px] font-semibold text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40">
            Absent
          </span>
        )
      ),
    },
    {
      key: "checkedInAt",
      header: "Check-In Timestamp",
      sortable: true,
      render: (a) => (
        <div>
          <span className="text-[11px] text-foreground font-medium whitespace-nowrap block">
            {formatDate(a.checkedInAt || a.createdAt)}
          </span>
          {a.checkedInBy?.name && (
            <span className="text-[10px] text-muted-foreground">Scanned by {a.checkedInBy.name}</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminDataTable
      moduleKey="attendance"
      title="Attendance & Gate Scanner Records"
      description="Live audit logs of physical gate check-ins, attendee rosters, and digital smart-card verifications."
      icon={<CheckCircle2 className="size-5" />}
      columns={columns}
      data={data?.data || []}
      totalRecords={data?.total || 0}
      loading={isLoading}
      error={error}
      onRefresh={() => refetch()}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search attendance by attendee, email, or event..."
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
            value={isPresent}
            onChange={(e) => handleFilterChange(setIsPresent, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Attendance Records</option>
            <option value="PRESENT">Present / Checked-In</option>
            <option value="ABSENT">Absent / No-Show</option>
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
