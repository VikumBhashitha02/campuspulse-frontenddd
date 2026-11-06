import React from "react";
import { Calendar, X, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type DatePresetKey =
  | "ALL"
  | "TODAY"
  | "THIS_WEEK"
  | "THIS_MONTH"
  | "LAST_MONTH"
  | "THIS_YEAR"
  | "LAST_YEAR"
  | "CUSTOM";

export interface DateFilterValues {
  preset?: DatePresetKey | string | undefined;
  year?: string | undefined;
  month?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
}

interface AdminDateFilterProps {
  values: DateFilterValues;
  onChange: (next: DateFilterValues) => void;
  className?: string;
  compact?: boolean;
}

const MONTH_NAMES = [
  { value: "01", label: "01 - January" },
  { value: "02", label: "02 - February" },
  { value: "03", label: "03 - March" },
  { value: "04", label: "04 - April" },
  { value: "05", label: "05 - May" },
  { value: "06", label: "06 - June" },
  { value: "07", label: "07 - July" },
  { value: "08", label: "08 - August" },
  { value: "09", label: "09 - September" },
  { value: "10", label: "10 - October" },
  { value: "11", label: "11 - November" },
  { value: "12", label: "12 - December" },
];

const AVAILABLE_YEARS = ["2026", "2025", "2024", "2023"];

export function AdminDateFilter({
  values,
  onChange,
  className,
  compact = false,
}: AdminDateFilterProps) {
  const currentYear = new Date().getFullYear();

  const toIsoDate = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handlePresetSelect = (preset: DatePresetKey) => {
    const today = new Date();
    if (preset === "ALL") {
      onChange({
        preset: "ALL",
        year: "",
        month: "",
        startDate: "",
        endDate: "",
      });
      return;
    }

    if (preset === "TODAY") {
      const todayStr = toIsoDate(today);
      onChange({
        preset: "TODAY",
        year: String(today.getFullYear()),
        month: String(today.getMonth() + 1).padStart(2, "0"),
        startDate: todayStr,
        endDate: todayStr,
      });
      return;
    }

    if (preset === "THIS_WEEK") {
      const dayOfWeek = today.getDay(); // 0 is Sunday
      const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const monday = new Date(today);
      monday.setDate(today.getDate() - diffToMonday);
      onChange({
        preset: "THIS_WEEK",
        year: String(today.getFullYear()),
        month: String(today.getMonth() + 1).padStart(2, "0"),
        startDate: toIsoDate(monday),
        endDate: toIsoDate(today),
      });
      return;
    }

    if (preset === "THIS_MONTH") {
      const y = today.getFullYear();
      const m = today.getMonth();
      const start = new Date(y, m, 1);
      const end = new Date(y, m + 1, 0);
      onChange({
        preset: "THIS_MONTH",
        year: String(y),
        month: String(m + 1).padStart(2, "0"),
        startDate: toIsoDate(start),
        endDate: toIsoDate(end),
      });
      return;
    }

    if (preset === "LAST_MONTH") {
      const y = today.getFullYear();
      const m = today.getMonth() - 1;
      const start = new Date(y, m, 1);
      const end = new Date(y, m + 1, 0);
      onChange({
        preset: "LAST_MONTH",
        year: String(start.getFullYear()),
        month: String(start.getMonth() + 1).padStart(2, "0"),
        startDate: toIsoDate(start),
        endDate: toIsoDate(end),
      });
      return;
    }

    if (preset === "THIS_YEAR") {
      const y = today.getFullYear();
      onChange({
        preset: "THIS_YEAR",
        year: String(y),
        month: "",
        startDate: `${y}-01-01`,
        endDate: `${y}-12-31`,
      });
      return;
    }

    if (preset === "LAST_YEAR") {
      const y = today.getFullYear() - 1;
      onChange({
        preset: "LAST_YEAR",
        year: String(y),
        month: "",
        startDate: `${y}-01-01`,
        endDate: `${y}-12-31`,
      });
      return;
    }

    if (preset === "CUSTOM") {
      onChange({
        ...values,
        preset: "CUSTOM",
      });
    }
  };

  const handleYearChange = (yearVal: string) => {
    if (!yearVal) {
      // Clear year
      onChange({
        ...values,
        year: "",
        preset: values.month ? "CUSTOM" : "ALL",
        startDate: values.month ? values.startDate : "",
        endDate: values.month ? values.endDate : "",
      });
      return;
    }

    const y = parseInt(yearVal, 10);
    if (values.month) {
      const m = parseInt(values.month, 10);
      const start = new Date(y, m - 1, 1);
      const end = new Date(y, m, 0);
      onChange({
        ...values,
        year: yearVal,
        preset: "CUSTOM",
        startDate: toIsoDate(start),
        endDate: toIsoDate(end),
      });
    } else {
      onChange({
        ...values,
        year: yearVal,
        preset: "CUSTOM",
        startDate: `${yearVal}-01-01`,
        endDate: `${yearVal}-12-31`,
      });
    }
  };

  const handleMonthChange = (monthVal: string) => {
    if (!monthVal) {
      // Clear month
      if (values.year) {
        onChange({
          ...values,
          month: "",
          preset: "CUSTOM",
          startDate: `${values.year}-01-01`,
          endDate: `${values.year}-12-31`,
        });
      } else {
        onChange({
          ...values,
          month: "",
          preset: "ALL",
          startDate: "",
          endDate: "",
        });
      }
      return;
    }

    const y = values.year ? parseInt(values.year, 10) : currentYear;
    const m = parseInt(monthVal, 10);
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 0);

    onChange({
      ...values,
      year: values.year || String(y),
      month: monthVal,
      preset: "CUSTOM",
      startDate: toIsoDate(start),
      endDate: toIsoDate(end),
    });
  };

  const handleStartDateChange = (val: string) => {
    onChange({
      ...values,
      preset: "CUSTOM",
      startDate: val,
    });
  };

  const handleEndDateChange = (val: string) => {
    onChange({
      ...values,
      preset: "CUSTOM",
      endDate: val,
    });
  };

  const handleClear = () => {
    onChange({
      preset: "ALL",
      year: "",
      month: "",
      startDate: "",
      endDate: "",
    });
  };

  const isFiltered = Boolean(
    values.startDate ||
      values.endDate ||
      values.year ||
      values.month ||
      (values.preset && values.preset !== "ALL")
  );

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {/* Quick Preset Selector */}
      <div className="flex items-center gap-1.5">
        <Calendar className="size-3.5 text-muted-foreground shrink-0" />
        <select
          value={values.preset || "ALL"}
          onChange={(e) => handlePresetSelect(e.target.value as DatePresetKey)}
          className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-medium"
          title="Date Range Preset"
        >
          <option value="ALL">All Time</option>
          <option value="TODAY">Today</option>
          <option value="THIS_WEEK">This Week</option>
          <option value="THIS_MONTH">This Month</option>
          <option value="LAST_MONTH">Last Month</option>
          <option value="THIS_YEAR">This Year ({currentYear})</option>
          <option value="LAST_YEAR">Last Year ({currentYear - 1})</option>
          <option value="CUSTOM">Custom Range...</option>
        </select>
      </div>

      {/* Year Selector */}
      <select
        value={values.year || ""}
        onChange={(e) => handleYearChange(e.target.value)}
        className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        title="Filter by Year"
      >
        <option value="">All Years</option>
        {AVAILABLE_YEARS.map((y) => (
          <option key={y} value={y}>
            Year {y}
          </option>
        ))}
      </select>

      {/* Month Selector */}
      <select
        value={values.month || ""}
        onChange={(e) => handleMonthChange(e.target.value)}
        className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        title="Filter by Month"
      >
        <option value="">All Months</option>
        {MONTH_NAMES.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>

      {/* Start Date & End Date Pickers */}
      <div className="flex items-center gap-1 bg-muted/30 p-0.5 rounded border border-border">
        <span className="text-[10px] text-muted-foreground px-1.5 font-medium">From:</span>
        <input
          type="date"
          value={values.startDate || ""}
          onChange={(e) => handleStartDateChange(e.target.value)}
          className="h-7 rounded border border-border/80 bg-background px-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          title="Start Date (Inclusive)"
        />
        <span className="text-[10px] text-muted-foreground px-1 font-medium">To:</span>
        <input
          type="date"
          value={values.endDate || ""}
          onChange={(e) => handleEndDateChange(e.target.value)}
          className="h-7 rounded border border-border/80 bg-background px-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          title="End Date (Inclusive)"
        />
      </div>

      {/* Clear Date Filter Button */}
      {isFiltered && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
          title="Reset date range filter"
        >
          <X className="size-3.5 mr-1" />
          Clear Date
        </Button>
      )}
    </div>
  );
}
