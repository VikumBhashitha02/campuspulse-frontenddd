import React from "react";
import { Search, Calendar, Filter, X, RotateCcw, ArrowUpDown, Building, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type DatePreset =
  | "ALL"
  | "TODAY"
  | "LAST_7_DAYS"
  | "LAST_30_DAYS"
  | "THIS_MONTH"
  | "LAST_MONTH"
  | "THIS_YEAR"
  | "CUSTOM";

export interface FilterOption {
  value: string;
  label: string;
}

export interface AdminFilterState {
  search?: string | undefined;
  datePreset?: DatePreset | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  universityId?: string | undefined;
  categoryId?: string | undefined;
  status?: string | undefined;
  sortBy?: string | undefined;
  sortOrder?: "asc" | "desc" | undefined;
}

interface AdminFilterBarProps {
  filters: AdminFilterState;
  onFilterChange: (filters: AdminFilterState) => void;
  onReset: () => void;
  totalRecords?: number | undefined;
  loading?: boolean | undefined;
  searchPlaceholder?: string | undefined;
  statusOptions?: FilterOption[] | undefined;
  sortOptions?: FilterOption[] | undefined;
  universities?: { id: string; name: string }[] | undefined;
  categories?: { id: string; name: string }[] | undefined;
  showUniversityFilter?: boolean | undefined;
  showCategoryFilter?: boolean | undefined;
  showStatusFilter?: boolean | undefined;
  showDateFilter?: boolean | undefined;
  showSortFilter?: boolean | undefined;
  className?: string | undefined;
}

export function AdminFilterBar({
  filters,
  onFilterChange,
  onReset,
  totalRecords,
  loading,
  searchPlaceholder = "Search by name, email, keyword...",
  statusOptions,
  sortOptions,
  universities,
  categories,
  showUniversityFilter = true,
  showCategoryFilter = false,
  showStatusFilter = true,
  showDateFilter = true,
  showSortFilter = true,
  className,
}: AdminFilterBarProps) {
  const handleDatePresetChange = (preset: DatePreset) => {
    const today = new Date();
    let startDate: string | undefined = undefined;
    let endDate: string | undefined = undefined;

    const toIsoDate = (d: Date) => d.toISOString().split("T")[0];

    if (preset === "TODAY") {
      startDate = toIsoDate(today);
      endDate = toIsoDate(today);
    } else if (preset === "LAST_7_DAYS") {
      const d = new Date(today);
      d.setDate(d.getDate() - 7);
      startDate = toIsoDate(d);
      endDate = toIsoDate(today);
    } else if (preset === "LAST_30_DAYS") {
      const d = new Date(today);
      d.setDate(d.getDate() - 30);
      startDate = toIsoDate(d);
      endDate = toIsoDate(today);
    } else if (preset === "THIS_MONTH") {
      startDate = toIsoDate(new Date(today.getFullYear(), today.getMonth(), 1));
      endDate = toIsoDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
    } else if (preset === "LAST_MONTH") {
      startDate = toIsoDate(new Date(today.getFullYear(), today.getMonth() - 1, 1));
      endDate = toIsoDate(new Date(today.getFullYear(), today.getMonth(), 0));
    } else if (preset === "THIS_YEAR") {
      startDate = toIsoDate(new Date(today.getFullYear(), 0, 1));
      endDate = toIsoDate(new Date(today.getFullYear(), 11, 31));
    }

    onFilterChange({
      ...filters,
      datePreset: preset,
      startDate: preset === "CUSTOM" ? filters.startDate : startDate,
      endDate: preset === "CUSTOM" ? filters.endDate : endDate,
    });
  };

  const activeChips: { key: keyof AdminFilterState; label: string; value: string }[] = [];

  if (filters.search) {
    activeChips.push({ key: "search", label: "Search", value: filters.search });
  }
  if (filters.datePreset && filters.datePreset !== "ALL") {
    const presetLabels: Record<DatePreset, string> = {
      ALL: "All Time",
      TODAY: "Today",
      LAST_7_DAYS: "Last 7 Days",
      LAST_30_DAYS: "Last 30 Days",
      THIS_MONTH: "This Month",
      LAST_MONTH: "Last Month",
      THIS_YEAR: "This Year",
      CUSTOM: `Custom (${filters.startDate || "Start"} → ${filters.endDate || "End"})`,
    };
    activeChips.push({
      key: "datePreset",
      label: "Period",
      value: presetLabels[filters.datePreset] || filters.datePreset,
    });
  }
  if (filters.universityId && universities) {
    const uni = universities.find((u) => u.id === filters.universityId);
    if (uni) {
      activeChips.push({ key: "universityId", label: "Campus", value: uni.name });
    }
  }
  if (filters.categoryId && categories) {
    const cat = categories.find((c) => c.id === filters.categoryId);
    if (cat) {
      activeChips.push({ key: "categoryId", label: "Category", value: cat.name });
    }
  }
  if (filters.status && statusOptions) {
    const opt = statusOptions.find((o) => o.value === filters.status);
    activeChips.push({ key: "status", label: "Status", value: opt?.label || filters.status });
  }

  const removeChip = (key: keyof AdminFilterState) => {
    const next = { ...filters };
    if (key === "datePreset") {
      delete next.datePreset;
      delete next.startDate;
      delete next.endDate;
    } else {
      delete next[key];
    }
    onFilterChange(next);
  };

  return (
    <div className={cn("space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm", className)}>
      {/* Top row: search & primary filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative min-w-[240px] flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={filters.search || ""}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder={searchPlaceholder}
            className="pl-9 pr-8 text-xs h-9 bg-background/70"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, search: "" })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Date Preset Filter */}
        {showDateFilter && (
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4 text-muted-foreground shrink-0" />
            <select
              value={filters.datePreset || "ALL"}
              onChange={(e) => handleDatePresetChange(e.target.value as DatePreset)}
              className="h-9 rounded-md border border-input bg-background/70 px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-medium"
            >
              <option value="ALL">All Time</option>
              <option value="TODAY">Today</option>
              <option value="LAST_7_DAYS">Last 7 Days</option>
              <option value="LAST_30_DAYS">Last 30 Days</option>
              <option value="THIS_MONTH">This Month</option>
              <option value="LAST_MONTH">Last Month</option>
              <option value="THIS_YEAR">This Year</option>
              <option value="CUSTOM">Custom Range...</option>
            </select>
          </div>
        )}

        {/* Custom Start & End Date Inputs */}
        {showDateFilter && filters.datePreset === "CUSTOM" && (
          <div className="flex items-center gap-1.5 animate-in fade-in duration-200">
            <Input
              type="date"
              value={filters.startDate || ""}
              onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value })}
              className="h-9 w-32 text-xs bg-background/70"
              title="Start Date"
            />
            <span className="text-xs text-muted-foreground">→</span>
            <Input
              type="date"
              value={filters.endDate || ""}
              onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value })}
              className="h-9 w-32 text-xs bg-background/70"
              title="End Date"
            />
          </div>
        )}

        {/* University Selector */}
        {showUniversityFilter && universities && universities.length > 0 && (
          <div className="flex items-center gap-1.5">
            <Building className="size-4 text-muted-foreground shrink-0" />
            <select
              value={filters.universityId || ""}
              onChange={(e) => onFilterChange({ ...filters, universityId: e.target.value || undefined })}
              className="h-9 max-w-[180px] truncate rounded-md border border-input bg-background/70 px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">All Campuses</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Category Selector */}
        {showCategoryFilter && categories && categories.length > 0 && (
          <div className="flex items-center gap-1.5">
            <Tag className="size-4 text-muted-foreground shrink-0" />
            <select
              value={filters.categoryId || ""}
              onChange={(e) => onFilterChange({ ...filters, categoryId: e.target.value || undefined })}
              className="h-9 max-w-[160px] truncate rounded-md border border-input bg-background/70 px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Status Selector */}
        {showStatusFilter && statusOptions && statusOptions.length > 0 && (
          <div className="flex items-center gap-1.5">
            <Filter className="size-4 text-muted-foreground shrink-0" />
            <select
              value={filters.status || ""}
              onChange={(e) => onFilterChange({ ...filters, status: e.target.value || undefined })}
              className="h-9 rounded-md border border-input bg-background/70 px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">All Statuses</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sorting Dropdown */}
        {showSortFilter && sortOptions && sortOptions.length > 0 && (
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="size-4 text-muted-foreground shrink-0" />
            <select
              value={`${filters.sortBy || "createdAt"}-${filters.sortOrder || "desc"}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split("-") as [string, "asc" | "desc"];
                onFilterChange({ ...filters, sortBy, sortOrder });
              }}
              className="h-9 rounded-md border border-input bg-background/70 px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Reset button */}
        {activeChips.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-9 text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3.5 mr-1" /> Clear All
          </Button>
        )}
      </div>

      {/* Bottom row: active chips & matching records count */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex flex-wrap items-center gap-1.5">
          {activeChips.length > 0 ? (
            <>
              <span className="text-[11px] font-semibold text-muted-foreground">Active Filters:</span>
              {activeChips.map((chip) => (
                <span
                  key={chip.key}
                  className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary shadow-2xs"
                >
                  <span className="font-semibold text-primary/80">{chip.label}:</span> {chip.value}
                  <button
                    type="button"
                    onClick={() => removeChip(chip.key)}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20 text-primary"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </>
          ) : (
            <span className="text-[11px] text-muted-foreground">No active filters applied</span>
          )}
        </div>

        {/* Record count badge */}
        {totalRecords !== undefined && (
          <div className="text-xs font-semibold text-muted-foreground">
            {loading ? (
              <span className="animate-pulse">Loading records...</span>
            ) : (
              <span>
                Matching Records: <strong className="text-foreground">{totalRecords.toLocaleString()}</strong>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
