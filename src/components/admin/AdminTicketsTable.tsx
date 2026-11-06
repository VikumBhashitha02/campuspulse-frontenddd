import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Ticket,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Shield,
  QrCode,
} from "lucide-react";
import { AdminDataTable, type ColumnDef, type DateFilterValues } from "./AdminDataTable";
import { adminApi } from "@/lib/api/admin";
import { formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/common/Badges";

export function AdminTicketsTable() {
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
    queryKey: ["admin", "tickets-table", queryParams],
    queryFn: () => adminApi.getTickets(queryParams),
  });

  const columns: ColumnDef<any>[] = [
    {
      key: "ticketNumber",
      header: "Ticket Pass & Code",
      sortable: true,
      render: (t) => {
        // Safe masked ticket code: Never expose raw cryptographic QR tokens
        const rawCode = t.ticketNumber || t.id || "TK-0000";
        const masked = rawCode.length > 12 ? `${rawCode.slice(0, 4)}••••${rawCode.slice(-4)}` : rawCode;
        return (
          <div className="flex items-center gap-2.5">
            <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 font-bold text-xs border border-indigo-200 dark:border-indigo-800/40">
              <QrCode className="size-4" />
            </div>
            <div className="min-w-0">
              <span className="font-mono font-bold text-foreground text-xs">{masked}</span>
              <p className="text-[10px] text-muted-foreground font-mono truncate">Ref: {t.id?.slice(0, 8)}...</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "attendee",
      header: "Attendee Name",
      render: (t) => {
        const attendee = t.user || t.registration?.user;
        return (
          <div>
            <span className="font-semibold text-foreground block text-xs">{attendee?.name || "Student Attendee"}</span>
            <span className="text-[11px] text-muted-foreground">{attendee?.email}</span>
          </div>
        );
      },
    },
    {
      key: "event",
      header: "Opportunity / Event",
      render: (t) => {
        const event = t.event || t.registration?.event;
        return (
          <div>
            <div className="flex items-center gap-1 font-medium text-foreground">
              <Calendar className="size-3 text-muted-foreground shrink-0" />
              <span className="truncate">{event?.title || "University Opportunity"}</span>
            </div>
            {event?.startDate && (
              <p className="text-[10px] text-muted-foreground">{formatDate(event.startDate)}</p>
            )}
          </div>
        );
      },
    },
    {
      key: "tier",
      header: "Admission Tier",
      render: (t) => (
        <span className="text-xs font-semibold text-foreground">
          {t.tier?.name || t.tierName || "General Pass"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Pass Status",
      render: (t) => <StatusBadge status={t.status || "ISSUED"} />,
    },
    {
      key: "checkIn",
      header: "Gate Check-In",
      render: (t) => (
        t.checkedInAt || t.attendance ? (
          <span className="inline-flex items-center gap-1 rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
            <CheckCircle2 className="size-3 text-emerald-500" /> Checked-In
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border">
            <Clock className="size-3 text-muted-foreground" /> Not Scanned
          </span>
        )
      ),
    },
    {
      key: "issuedAt",
      header: "Issued Date",
      sortable: true,
      render: (t) => (
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
          {formatDate(t.issuedAt || t.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <AdminDataTable
      moduleKey="tickets"
      title="Tickets & Admission Passes"
      description="Inspect cryptographic admission passes, check-in statuses, ticket tiers, and authorized gate verification credentials."
      icon={<Ticket className="size-5" />}
      columns={columns}
      data={data?.data || []}
      totalRecords={data?.total || 0}
      loading={isLoading}
      error={error}
      onRefresh={() => refetch()}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search tickets by reference code, attendee, or event..."
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
          <option value="">All Ticket Statuses</option>
          <option value="ISSUED">Issued & Active</option>
          <option value="USED">Used / Checked In</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="REVOKED">Revoked</option>
        </select>
      }
    />
  );
}
