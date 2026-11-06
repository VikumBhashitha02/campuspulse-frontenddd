import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  GraduationCap,
  Eye,
  UserCheck,
  UserX,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Building,
  Layers,
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

interface AdminStudentsTableProps {
  universities?: { id: string; name: string }[];
  onInspectUser?: (id: string) => void;
  onSuspendUser?: (user: { id: string; name: string; currentStatus: boolean }) => void;
}

export function AdminStudentsTable({
  universities = [],
  onInspectUser,
  onSuspendUser,
}: AdminStudentsTableProps) {
  // Filters state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [isVerified, setIsVerified] = useState("");
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
    setUniversityId("");
    setIsVerified("");
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

  const hasActiveFilters = Boolean(debouncedSearch || universityId || isVerified || isDateActive);

  const queryParams = {
    search: debouncedSearch || undefined,
    universityId: universityId || undefined,
    isVerified: isVerified === "YES" ? true : isVerified === "NO" ? false : undefined,
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
    queryKey: ["admin", "students-table", queryParams],
    queryFn: () => adminApi.getStudents(queryParams),
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
      key: "name",
      header: "Student Identity",
      sortable: true,
      render: (s) => (
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase border border-indigo-200 dark:border-indigo-800/40">
            {s.name?.charAt(0) || "S"}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground truncate">{s.name}</span>
              {s.universityEmailVerified && (
                <span title="University Verified">
                  <CheckCircle2 className="size-3.5 text-blue-500 shrink-0" />
                </span>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground truncate">{s.email}</p>
            <p className="text-[10px] font-mono text-muted-foreground/70 truncate">ID: {s.id?.slice(0, 8)}...</p>
          </div>
        </div>
      ),
    },
    {
      key: "university",
      header: "University & Campus",
      render: (s) => (
        <div className="flex items-center gap-1 font-medium text-foreground">
          <Building className="size-3 text-muted-foreground shrink-0" />
          <span className="truncate">{s.university?.name || "General / Unspecified"}</span>
        </div>
      ),
    },
    {
      key: "faculty",
      header: "Faculty & Department",
      render: (s) => (
        <div>
          <div className="flex items-center gap-1 text-foreground">
            <Layers className="size-3 text-muted-foreground shrink-0" />
            <span className="truncate">{s.faculty?.name ? `Faculty of ${s.faculty.name}` : "Not declared"}</span>
          </div>
          {s.department?.name && (
            <p className="text-[11px] text-muted-foreground truncate">{s.department.name}</p>
          )}
        </div>
      ),
    },
    {
      key: "academicYear",
      header: "Batch / Year",
      render: (s) => (
        <span className="text-xs text-foreground font-medium">
          {s.batchYear ? `Batch of ${s.batchYear}` : s.academicYear ? `Year ${s.academicYear}` : "—"}
        </span>
      ),
    },
    {
      key: "universityEmailVerified",
      header: "Verification",
      render: (s) => (
        s.universityEmailVerified ? (
          <span className="inline-flex items-center gap-1 rounded bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 text-[11px] font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40">
            <CheckCircle2 className="size-3 text-blue-500" /> Verified
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
            <XCircle className="size-3 text-amber-500" /> Unverified
          </span>
        )
      ),
    },
    {
      key: "stats",
      header: "Activity Stats",
      render: (s) => (
        <div className="text-[11px] text-muted-foreground flex gap-2">
          <span>{s.stats?.eventRegistrations || 0} events</span>
          <span>•</span>
          <span>{s.stats?.organizationMembers || 0} clubs</span>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Joined Date",
      sortable: true,
      render: (s) => (
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
          {formatDate(s.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (s) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-7">
              <MoreVertical className="size-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-xs">
            <DropdownMenuLabel>Student Actions</DropdownMenuLabel>
            {onInspectUser && (
              <DropdownMenuItem onClick={() => onInspectUser(s.id)}>
                <Eye className="size-3.5 mr-2 text-primary" /> View Student Dossier
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            {onSuspendUser && (
              <DropdownMenuItem
                className={s.isActive ? "text-destructive" : "text-emerald-600"}
                onClick={() => onSuspendUser({ id: s.id, name: s.name, currentStatus: s.isActive })}
              >
                {s.isActive ? (
                  <>
                    <UserX className="size-3.5 mr-2" /> Suspend Student
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-3.5 mr-2" /> Restore Student
                  </>
                )}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AdminDataTable
      moduleKey="students"
      title="Student Directory & Roster"
      description="Inspect verified student profiles, institutional domain validations, degree years, faculties, and engagement metrics."
      icon={<GraduationCap className="size-5" />}
      columns={columns}
      data={data?.data || []}
      totalRecords={data?.total || 0}
      loading={isLoading}
      error={error}
      onRefresh={() => refetch()}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search students by name, email, or registration number..."
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
          {/* University Filter */}
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

          {/* Verification Filter */}
          <select
            value={isVerified}
            onChange={(e) => handleFilterChange(setIsVerified, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Verifications</option>
            <option value="YES">Verified Only</option>
            <option value="NO">Unverified Only</option>
          </select>
        </>
      }
    />
  );
}
