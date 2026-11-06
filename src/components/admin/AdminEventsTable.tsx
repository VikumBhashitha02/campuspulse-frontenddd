import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Building,
  Building2,
  Tag,
  Clock,
  MoreVertical,
  Ban,
  CheckCircle2,
  ExternalLink,
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

interface AdminEventsTableProps {
  universities?: { id: string; name: string }[];
  categories?: { id: string; name: string }[];
  onCancelEvent?: (event: { id: string; title: string }) => void;
}

export function AdminEventsTable({
  universities = [],
  categories = [],
  onCancelEvent,
}: AdminEventsTableProps) {
  // Filter state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isFree, setIsFree] = useState("");
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
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

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
    setCategoryId("");
    setIsFree("");
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
    debouncedSearch || status || universityId || categoryId || isFree || isDateActive
  );

  const queryParams = {
    search: debouncedSearch || undefined,
    status: status || undefined,
    universityId: universityId || undefined,
    categoryId: categoryId || undefined,
    isFree: isFree === "FREE" ? true : isFree === "PAID" ? false : undefined,
    startDate: dateFilter.startDate || undefined,
    endDate: dateFilter.endDate || undefined,
    year: dateFilter.year || undefined,
    month: dateFilter.month || undefined,
    datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
    sortBy,
    sortOrder,
    page,
    limit: pageSize,
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin", "events-table", queryParams],
    queryFn: () => adminApi.getEvents(queryParams),
  });

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setPage(1);
  };

  const columns: ColumnDef<any>[] = [
    {
      key: "title",
      header: "Event Opportunity",
      sortable: true,
      render: (e) => (
        <div className="flex items-center gap-2.5">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary font-bold text-xs uppercase border border-border">
            <Calendar className="size-4" />
          </div>
          <div className="min-w-0">
            <span className="font-semibold text-foreground truncate block">{e.title}</span>
            <p className="text-[11px] text-muted-foreground truncate">
              {e.organization?.name ? `${e.organization.name} • ` : ""}
              {e.university?.name || "All Campus"}
            </p>
            <p className="text-[10px] font-mono text-muted-foreground/70 truncate">ID: {e.id?.slice(0, 8)}...</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category & Type",
      render: (e) => (
        <div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground">
            <Tag className="size-3 text-muted-foreground shrink-0" />
            {e.category?.name || "General"}
          </span>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-0.5">
            {e.type || "EVENT"}
          </p>
        </div>
      ),
    },
    {
      key: "startDate",
      header: "Schedule",
      sortable: true,
      render: (e) => (
        <div className="text-xs">
          <p className="font-medium text-foreground whitespace-nowrap">{formatDate(e.startDate)}</p>
          {e.endDate && (
            <p className="text-[10px] text-muted-foreground whitespace-nowrap">to {formatDate(e.endDate)}</p>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Publication Status",
      render: (e) => <StatusBadge status={e.status || "PUBLISHED"} />,
    },
    {
      key: "isFree",
      header: "Admission",
      render: (e) => (
        e.isFree ? (
          <span className="inline-flex rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
            Free
          </span>
        ) : (
          <span className="inline-flex rounded bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 text-[11px] font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40">
            Paid ({e.currency || "LKR"} {e.ticketPrice || e.price || 0})
          </span>
        )
      ),
    },
    {
      key: "registrations",
      header: "Admissions",
      render: (e) => {
        const count = e._count?.registrations ?? e.registrationCount ?? 0;
        const capacity = e.capacity || e.maxCapacity;
        return (
          <div className="text-xs font-semibold text-foreground">
            {count} {capacity ? `/ ${capacity}` : "registered"}
          </div>
        );
      },
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      render: (e) => (
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
          {formatDate(e.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (e) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-7">
              <MoreVertical className="size-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-xs">
            <DropdownMenuLabel>Event Governance</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <a href={`/events/${e.slug || e.id}`} target="_blank" rel="noreferrer">
                <ExternalLink className="size-3.5 mr-2 text-primary" /> Open Public Listing
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {onCancelEvent && e.status !== "CANCELLED" && (
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onCancelEvent({ id: e.id, title: e.title })}
              >
                <Ban className="size-3.5 mr-2" /> Cancel Event
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AdminDataTable
      moduleKey="events"
      title="Events & Opportunities Catalog"
      description="Authoritative catalog of campus events, hackathons, academic conferences, workshops, and society orientations."
      icon={<Calendar className="size-5" />}
      columns={columns}
      data={data?.data || []}
      totalRecords={data?.total || 0}
      loading={isLoading}
      error={error}
      onRefresh={() => refetch()}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search events by title, organizer, organization, or ID..."
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
      sortBy={sortBy}
      sortOrder={sortOrder}
      onSortChange={handleSortChange}
      currentFilterQuery={queryParams}
      filterSlots={
        <>
          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => handleFilterChange(setStatus, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="COMPLETED">Completed</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryId}
            onChange={(e) => handleFilterChange(setCategoryId, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary max-w-[150px]"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* University Filter */}
          <select
            value={universityId}
            onChange={(e) => handleFilterChange(setUniversityId, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary max-w-[170px]"
          >
            <option value="">All Universities</option>
            {universities.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          {/* Pricing Filter */}
          <select
            value={isFree}
            onChange={(e) => handleFilterChange(setIsFree, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Free & Paid</option>
            <option value="FREE">Free Admission</option>
            <option value="PAID">Ticketed / Paid</option>
          </select>
        </>
      }
    />
  );
}
