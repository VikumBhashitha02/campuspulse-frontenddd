import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FileText,
  Calendar,
  Building,
  CreditCard,
  Ticket,
  MoreVertical,
  Ban,
  CheckCircle2,
  Clock,
  XCircle,
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

interface AdminRegistrationsTableProps {
  universities?: { id: string; name: string }[];
  onCancelRegistration?: (reg: { id: string; userName: string; eventTitle: string }) => void;
}

export function AdminRegistrationsTable({
  universities = [],
  onCancelRegistration,
}: AdminRegistrationsTableProps) {
  // Filter state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
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
    setPaymentStatus("");
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

  const hasActiveFilters = Boolean(
    debouncedSearch || status || paymentStatus || universityId || isDateActive
  );

  const queryParams = {
    search: debouncedSearch || undefined,
    status: status || undefined,
    paymentStatus: paymentStatus || undefined,
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
    queryKey: ["admin", "registrations-table", queryParams],
    queryFn: () => adminApi.getRegistrations(queryParams),
  });

  const columns: ColumnDef<any>[] = [
    {
      key: "id",
      header: "Registration & Student",
      render: (r) => (
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 font-bold text-xs uppercase border border-blue-200 dark:border-blue-800/40">
            <FileText className="size-4" />
          </div>
          <div className="min-w-0">
            <span className="font-semibold text-foreground truncate block">{r.user?.name || "Student Attendee"}</span>
            <p className="text-[11px] text-muted-foreground truncate">{r.user?.email}</p>
            <p className="text-[10px] font-mono text-muted-foreground/70 truncate">ID: {r.id?.slice(0, 8)}...</p>
          </div>
        </div>
      ),
    },
    {
      key: "event",
      header: "Opportunity / Event",
      render: (r) => (
        <div>
          <div className="flex items-center gap-1 font-medium text-foreground">
            <Calendar className="size-3 text-muted-foreground shrink-0" />
            <span className="truncate">{r.event?.title || "Event Booking"}</span>
          </div>
          <p className="text-[11px] text-muted-foreground truncate">{r.event?.university?.name || "Campus Community"}</p>
        </div>
      ),
    },
    {
      key: "tier",
      header: "Ticket Tier",
      render: (r) => (
        <span className="text-xs font-semibold text-foreground">
          {r.tier?.name || r.ticketTier || "General Admission"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Registration Status",
      render: (r) => <StatusBadge status={r.status || "CONFIRMED"} />,
    },
    {
      key: "paymentStatus",
      header: "Payment Status",
      render: (r) => {
        const payStatus = r.payment?.status || r.paymentStatus || "FREE";
        return <StatusBadge status={payStatus} />;
      },
    },
    {
      key: "ticket",
      header: "Ticket Pass",
      render: (r) => (
        r.ticket ? (
          <span className="inline-flex items-center gap-1 rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
            <Ticket className="size-3 text-emerald-500" /> Issued
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
            Pending
          </span>
        )
      ),
    },
    {
      key: "registeredAt",
      header: "Registered Date",
      sortable: true,
      render: (r) => (
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
          {formatDate(r.registeredAt || r.createdAt)}
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
            <DropdownMenuLabel>Registration Options</DropdownMenuLabel>
            {onCancelRegistration && r.status !== "CANCELLED" && (
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() =>
                  onCancelRegistration({
                    id: r.id,
                    userName: r.user?.name || "Attendee",
                    eventTitle: r.event?.title || "Event",
                  })
                }
              >
                <Ban className="size-3.5 mr-2" /> Cancel Registration
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AdminDataTable
      moduleKey="registrations"
      title="Event Registrations & Admissions"
      description="Track student registration records, ticket issuance statuses, admission passes, and booking lifecycles."
      icon={<FileText className="size-5" />}
      columns={columns}
      data={data?.data || []}
      totalRecords={data?.total || 0}
      loading={isLoading}
      error={error}
      onRefresh={() => refetch()}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search registrations by student, email, event, or ID..."
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
            <option value="">All Registration Statuses</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PENDING">Pending</option>
            <option value="WAITLISTED">Waitlisted</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <select
            value={paymentStatus}
            onChange={(e) => handleFilterChange(setPaymentStatus, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Payment Statuses</option>
            <option value="PAID">Paid Only</option>
            <option value="PENDING">Pending Payment</option>
            <option value="FREE">Free Event</option>
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
