import React, { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  RefreshCw,
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Loader2,
  AlertCircle,
  Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { adminApi } from "@/lib/api/admin";
import { AdminDateFilter, type DateFilterValues } from "./AdminDateFilter";

export type { DateFilterValues };

export interface ColumnDef<T> {
  key: string;
  header: string;
  sortable?: boolean;
  className?: string;
  render?: (item: T) => React.ReactNode;
}

interface AdminDataTableProps<T> {
  moduleKey: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  columns: ColumnDef<T>[];
  data?: T[];
  totalRecords?: number;
  loading?: boolean;
  error?: any;
  onRefresh?: () => void;
  // Search & Filter
  search?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  filterSlots?: React.ReactNode;
  hasActiveFilters?: boolean;
  onResetFilters?: () => void;
  // Date Range (Year, Month, Date)
  dateFilter?: DateFilterValues;
  onDateFilterChange?: (val: DateFilterValues) => void;
  showDateFilter?: boolean;
  // Pagination
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  // Sorting
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (field: string) => void;
  // Custom Action (e.g. "+ Add User", etc.)
  extraActions?: React.ReactNode;
  // Query state for export
  currentFilterQuery?: Record<string, any>;
}

export function AdminDataTable<T extends { id?: string | number }>({
  moduleKey,
  title,
  description,
  icon,
  columns,
  data = [],
  totalRecords = 0,
  loading = false,
  error,
  onRefresh,
  search = "",
  onSearchChange,
  searchPlaceholder = "Search records...",
  filterSlots,
  hasActiveFilters = false,
  onResetFilters,
  dateFilter,
  onDateFilterChange,
  showDateFilter = true,
  page = 1,
  pageSize = 25,
  onPageChange,
  onPageSizeChange,
  sortBy,
  sortOrder,
  onSortChange,
  extraActions,
  currentFilterQuery = {},
}: AdminDataTableProps<T>) {
  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const startRecord = totalRecords > 0 ? (page - 1) * pageSize + 1 : 0;
  const endRecord = Math.min(page * pageSize, totalRecords);

  const isDateFiltered = Boolean(
    dateFilter?.startDate ||
      dateFilter?.endDate ||
      dateFilter?.year ||
      dateFilter?.month ||
      (dateFilter?.preset && dateFilter.preset !== "ALL")
  );

  const effectiveHasActiveFilters = hasActiveFilters || isDateFiltered;

  const handleExport = async (format: "csv" | "pdf") => {
    if (totalRecords === 0) {
      toast.info(`No records match the active filters to export.`);
      return;
    }

    if (format === "csv") setIsExportingCsv(true);
    else setIsExportingPdf(true);

    try {
      const exportParams: Record<string, any> = {
        ...currentFilterQuery,
        search: search || undefined,
        sortBy,
        sortOrder,
      };

      if (dateFilter) {
        if (dateFilter.startDate) exportParams.startDate = dateFilter.startDate;
        if (dateFilter.endDate) exportParams.endDate = dateFilter.endDate;
        if (dateFilter.year) exportParams.year = dateFilter.year;
        if (dateFilter.month) exportParams.month = dateFilter.month;
        if (dateFilter.preset && dateFilter.preset !== "ALL") exportParams.datePreset = dateFilter.preset;
      }

      toast.info(`Generating ${format.toUpperCase()} export...`, {
        description: `Exporting all ${totalRecords.toLocaleString()} matching records.`,
      });

      const filename = await adminApi.exportData(moduleKey, format, exportParams);

      toast.success(`Export ready!`, {
        description: `Downloaded ${filename}`,
      });
    } catch (err: any) {
      toast.error(`Export failed`, {
        description: err?.message || `Failed to generate ${format.toUpperCase()} report.`,
      });
    } finally {
      if (format === "csv") setIsExportingCsv(false);
      else setIsExportingPdf(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* ------------------------------------------------------------- */}
      {/* Header Area */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm mt-0.5">
              {icon}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-foreground">{title}</h1>
              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground border border-border">
                {loading ? "..." : `${totalRecords.toLocaleString()} total`}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">{description}</p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {extraActions}

          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={loading}
              title="Refresh dataset"
              className="h-8 text-xs font-medium"
            >
              <RefreshCw className={cn("size-3.5 mr-1.5", loading && "animate-spin text-primary")} />
              Refresh
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("csv")}
            disabled={isExportingCsv || loading}
            title="Export filtered records to CSV"
            className="h-8 text-xs font-medium text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
          >
            {isExportingCsv ? (
              <Loader2 className="size-3.5 mr-1.5 animate-spin" />
            ) : (
              <FileSpreadsheet className="size-3.5 mr-1.5 text-emerald-600 dark:text-emerald-400" />
            )}
            CSV
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("pdf")}
            disabled={isExportingPdf || loading}
            title="Export branded report to PDF"
            className="h-8 text-xs font-medium text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40 hover:bg-amber-50 dark:hover:bg-amber-950/30"
          >
            {isExportingPdf ? (
              <Loader2 className="size-3.5 mr-1.5 animate-spin" />
            ) : (
              <FileText className="size-3.5 mr-1.5 text-amber-600 dark:text-amber-400" />
            )}
            PDF
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Search & Filter Toolbar */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-xl border border-border bg-card p-3 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          {onSearchChange && (
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-8 pl-8 text-xs bg-background"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Filter Dropdown Slots */}
          {filterSlots}

          {/* Reset Filters Button */}
          {effectiveHasActiveFilters && onResetFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="h-8 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <RotateCcw className="size-3 mr-1" />
              Reset Filters
            </Button>
          )}
        </div>

        {/* Date Range & Period Filter Bar */}
        {showDateFilter !== false && onDateFilterChange && dateFilter && (
          <div className="pt-2.5 border-t border-border/50 flex flex-wrap items-center justify-between gap-2.5">
            <AdminDateFilter
              values={dateFilter}
              onChange={onDateFilterChange}
            />
            {isDateFiltered && (
              <div className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium bg-primary/5 px-2.5 py-0.5 rounded-full border border-primary/10">
                <span>Active Period:</span>
                <span className="text-primary font-semibold">
                  {dateFilter.year && `Year ${dateFilter.year}`}
                  {dateFilter.month && ` • Month ${dateFilter.month}`}
                  {dateFilter.startDate && dateFilter.endDate && ` (${dateFilter.startDate} → ${dateFilter.endDate})`}
                  {!dateFilter.year && !dateFilter.month && !dateFilter.startDate && dateFilter.preset && `Preset: ${dateFilter.preset}`}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Table Data View */}
      {/* ------------------------------------------------------------- */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        {loading ? (
          <div className="p-8 space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pb-4">
              <Loader2 className="size-5 animate-spin text-primary" />
              <span>Loading records...</span>
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-full animate-pulse rounded bg-muted/60" />
            ))}
          </div>
        ) : error ? (
          <div className="p-12 text-center space-y-3">
            <AlertCircle className="size-8 text-destructive mx-auto" />
            <p className="text-sm font-semibold text-foreground">Failed to load records</p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              {error?.message || "An error occurred while fetching data from the database."}
            </p>
            {onRefresh && (
              <Button variant="outline" size="sm" onClick={onRefresh} className="text-xs mt-2">
                <RefreshCw className="size-3.5 mr-1.5" /> Retry
              </Button>
            )}
          </div>
        ) : data.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <Inbox className="size-8 text-muted-foreground/60 mx-auto" />
            <p className="text-sm font-semibold text-foreground">No records found</p>
            <p className="text-xs text-muted-foreground">
              {hasActiveFilters
                ? "No items match your active search and filter criteria. Try adjusting or clearing filters."
                : "No records exist in this module yet."}
            </p>
            {hasActiveFilters && onResetFilters && (
              <Button variant="outline" size="sm" onClick={onResetFilters} className="text-xs mt-2">
                <RotateCcw className="size-3.5 mr-1.5" /> Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={cn(
                        "p-3 select-none",
                        col.sortable && "cursor-pointer hover:bg-muted/70 transition-colors",
                        col.className,
                      )}
                      onClick={() => col.sortable && onSortChange && onSortChange(col.key)}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{col.header}</span>
                        {col.sortable && (
                          <span className="text-muted-foreground/60">
                            {sortBy === col.key ? (
                              sortOrder === "asc" ? (
                                <ArrowUp className="size-3 text-primary font-bold" />
                              ) : (
                                <ArrowDown className="size-3 text-primary font-bold" />
                              )
                            ) : (
                              <ArrowUpDown className="size-3" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {data.map((item, index) => (
                  <tr
                    key={item.id ? String(item.id) : index}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className={cn("p-3 align-middle", col.className)}>
                        {col.render ? col.render(item) : (item as any)[col.key] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* Pagination Controls */}
        {/* ------------------------------------------------------------- */}
        {!loading && !error && data.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border px-4 py-3 bg-card text-xs text-muted-foreground">
            {/* Record range */}
            <div>
              Showing <span className="font-semibold text-foreground">{startRecord}</span> to{" "}
              <span className="font-semibold text-foreground">{endRecord}</span> of{" "}
              <span className="font-semibold text-foreground">{totalRecords.toLocaleString()}</span> entries
            </div>

            <div className="flex items-center gap-4">
              {/* Page Size Selector */}
              {onPageSizeChange && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px]">Rows per page:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    className="h-7 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              )}

              {/* Page Navigator */}
              {onPageChange && (
                <div className="flex items-center gap-1">
                  <span className="text-[11px] mr-2">
                    Page <span className="font-semibold text-foreground">{page}</span> of{" "}
                    <span className="font-semibold text-foreground">{totalPages}</span>
                  </span>

                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7"
                    disabled={page <= 1}
                    onClick={() => onPageChange(1)}
                    title="First page"
                  >
                    <ChevronsLeft className="size-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7"
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                    title="Previous page"
                  >
                    <ChevronLeft className="size-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7"
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                    title="Next page"
                  >
                    <ChevronRight className="size-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7"
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(totalPages)}
                    title="Last page"
                  >
                    <ChevronsRight className="size-3.5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
