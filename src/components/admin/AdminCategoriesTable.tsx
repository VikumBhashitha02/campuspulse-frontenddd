import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Tag,
  Plus,
  Calendar,
  MoreVertical,
  CheckCircle2,
  XCircle,
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

interface AdminCategoriesTableProps {
  onCreateCategory?: () => void;
}

export function AdminCategoriesTable({ onCreateCategory }: AdminCategoriesTableProps) {
  // Filter state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [type, setType] = useState("");
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
    setType("");
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

  const hasActiveFilters = Boolean(debouncedSearch || type || isDateActive);

  const queryParams = {
    search: debouncedSearch || undefined,
    type: type || undefined,
    startDate: dateFilter.startDate || undefined,
    endDate: dateFilter.endDate || undefined,
    year: dateFilter.year || undefined,
    month: dateFilter.month || undefined,
    datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin", "categories-table", queryParams],
    queryFn: () => adminApi.getCategories(queryParams),
  });

  const rawList = Array.isArray(data) ? data : [];
  const filteredList = rawList.filter((c: any) => {
    if (!isDateActive) return true;
    const created = c.createdAt ? new Date(c.createdAt).getTime() : 0;
    if (dateFilter.startDate && created < new Date(dateFilter.startDate).getTime()) return false;
    if (dateFilter.endDate && created > new Date(dateFilter.endDate + "T23:59:59.999Z").getTime()) return false;
    if (dateFilter.year) {
      const yr = new Date(c.createdAt).getUTCFullYear();
      if (String(yr) !== String(dateFilter.year)) return false;
    }
    if (dateFilter.month) {
      const mo = String(new Date(c.createdAt).getUTCMonth() + 1).padStart(2, "0");
      if (mo !== String(dateFilter.month).padStart(2, "0")) return false;
    }
    return true;
  });

  const totalRecords = filteredList.length;
  const paginatedList = filteredList.slice((page - 1) * pageSize, page * pageSize);

  const columns: ColumnDef<any>[] = [
    {
      key: "name",
      header: "Category Name & Slug",
      sortable: true,
      render: (c) => (
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 font-bold text-xs uppercase border border-amber-200 dark:border-amber-800/40">
            <Tag className="size-4" />
          </div>
          <div className="min-w-0">
            <span className="font-semibold text-foreground truncate block">{c.name}</span>
            <p className="text-[10px] font-mono text-muted-foreground/70 truncate">slug: {c.slug || c.name?.toLowerCase().replace(/\s+/g, "-")}</p>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Opportunity Domain",
      render: (c) => <StatusBadge status={c.type || "EVENT"} />,
    },
    {
      key: "description",
      header: "Description",
      render: (c) => (
        <span className="text-xs text-muted-foreground line-clamp-1 max-w-sm">
          {c.description || "Platform taxonomy classification"}
        </span>
      ),
    },
    {
      key: "eventsCount",
      header: "Associated Opportunities",
      render: (c) => {
        const count = c._count?.events ?? c.eventCount ?? 0;
        return (
          <span className="text-xs font-semibold text-foreground">
            {count} {count === 1 ? "opportunity" : "opportunities"}
          </span>
        );
      },
    },
    {
      key: "isActive",
      header: "Active Status",
      render: (c) => (
        c.isActive === false ? (
          <span className="inline-flex rounded bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 text-[11px] font-semibold text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40">
            Disabled
          </span>
        ) : (
          <span className="inline-flex rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
            Active
          </span>
        )
      ),
    },
    {
      key: "createdAt",
      header: "Created Date",
      sortable: true,
      render: (c) => (
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
          {formatDate(c.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <AdminDataTable
      moduleKey="categories"
      title="Opportunity Categories & Taxonomy"
      description="Manage the official platform tags, academic disciplines, event categories, and competition classifications."
      icon={<Tag className="size-5" />}
      columns={columns}
      data={paginatedList}
      totalRecords={totalRecords}
      loading={isLoading}
      error={error}
      onRefresh={() => refetch()}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search categories by name or slug..."
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
      extraActions={
        onCreateCategory && (
          <Button size="sm" onClick={onCreateCategory} className="h-8 text-xs font-semibold gap-1.5">
            <Plus className="size-3.5" />
            Add Category
          </Button>
        )
      }
      filterSlots={
        <select
          value={type}
          onChange={(e) => handleFilterChange(setType, e.target.value)}
          className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">All Category Domains</option>
          <option value="ACADEMIC">Academic & Conferences</option>
          <option value="HACKATHON">Hackathons & Coding</option>
          <option value="CULTURAL">Cultural & Arts</option>
          <option value="SPORTS">Sports & Athletics</option>
          <option value="WORKSHOP">Workshops & Bootcamps</option>
          <option value="OTHER">Other Categories</option>
        </select>
      }
    />
  );
}
