import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Users,
  Eye,
  Shield,
  UserCheck,
  UserX,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Building,
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
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AdminUsersTableProps {
  universities?: { id: string; name: string }[];
  onInspectUser?: (id: string) => void;
  onSuspendUser?: (user: { id: string; name: string; currentStatus: boolean }) => void;
  onChangeRole?: (user: { id: string; name: string; currentRole: string }) => void;
}

export function AdminUsersTable({
  universities = [],
  onInspectUser,
  onSuspendUser,
  onChangeRole,
}: AdminUsersTableProps) {
  const queryClient = useQueryClient();

  // Filters state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [role, setRole] = useState<string>("");
  const [universityId, setUniversityId] = useState<string>("");
  const [status, setStatus] = useState<string>(""); // "ACTIVE" | "SUSPENDED"
  const [isVerified, setIsVerified] = useState<string>("");
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
      setPage(1); // Reset to page 1 on search change
    }, 350);
    return () => clearTimeout(handler);
  }, [search]);

  // Reset page when any filter changes
  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<any>>, value: any) => {
    setter(value);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setRole("");
    setUniversityId("");
    setStatus("");
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

  const hasActiveFilters = Boolean(
    debouncedSearch || role || universityId || status || isVerified || isDateActive
  );

  const queryParams = {
    search: debouncedSearch || undefined,
    role: role || undefined,
    universityId: universityId || undefined,
    isActive: status === "ACTIVE" ? true : status === "SUSPENDED" ? false : undefined,
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
    queryKey: ["admin", "users-table", queryParams],
    queryFn: () => adminApi.getUsers(queryParams),
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

  const handleManualVerify = async (id: string, name: string) => {
    try {
      await adminApi.verifyUserIdentity(id, "Admin table identity verification");
      toast.success(`Verified student identity for ${name}! 🎓`);
      void refetch();
      void queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to verify student identity");
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      key: "name",
      header: "User / Identity",
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary font-bold text-xs uppercase border border-primary/20">
            {u.name?.charAt(0) || "U"}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground truncate">{u.name}</span>
              {u.universityEmailVerified && (
                <span title="University Email Verified">
                  <CheckCircle2 className="size-3.5 text-blue-500 shrink-0" />
                </span>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground truncate">{u.email}</p>
            <p className="text-[10px] font-mono text-muted-foreground/70 truncate">ID: {u.id?.slice(0, 8)}...</p>
          </div>
        </div>
      ),
    },
    {
      key: "university",
      header: "University & Faculty",
      render: (u) => (
        <div>
          <div className="flex items-center gap-1 font-medium text-foreground">
            <Building className="size-3 text-muted-foreground shrink-0" />
            <span className="truncate">{u.university?.name || "General / Unaffiliated"}</span>
          </div>
          {u.studentProfile?.faculty?.name && (
            <p className="text-[11px] text-muted-foreground truncate">
              Faculty of {u.studentProfile.faculty.name}
              {u.studentProfile.department?.name ? ` • ${u.studentProfile.department.name}` : ""}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "role",
      header: "System Role",
      render: (u) => {
        const roles = u.roles || [];
        return (
          <div className="flex flex-wrap gap-1">
            {roles.map((r: string) => (
              <span
                key={r}
                className="inline-flex items-center rounded-md bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary"
              >
                {r}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      key: "universityEmailVerified",
      header: "Verification",
      render: (u) => (
        u.universityEmailVerified ? (
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
      key: "isActive",
      header: "Account Status",
      render: (u) => (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
            u.isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground",
          )}
        >
          {u.isActive ? "Active" : "Suspended"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Joined Date",
      sortable: true,
      render: (u) => (
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
          {formatDate(u.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (u) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-7">
              <MoreVertical className="size-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-xs">
            <DropdownMenuLabel>User Options</DropdownMenuLabel>
            {onInspectUser && (
              <DropdownMenuItem onClick={() => onInspectUser(u.id)}>
                <Eye className="size-3.5 mr-2 text-primary" /> Inspect 360° Profile
              </DropdownMenuItem>
            )}
            {!u.universityEmailVerified && (
              <DropdownMenuItem onClick={() => handleManualVerify(u.id, u.name)}>
                <UserCheck className="size-3.5 mr-2 text-emerald-600" /> Verify Student Badge
              </DropdownMenuItem>
            )}
            {onChangeRole && (
              <DropdownMenuItem onClick={() => onChangeRole({ id: u.id, name: u.name, currentRole: u.roles?.[0] || "STUDENT" })}>
                <Shield className="size-3.5 mr-2 text-indigo-600" /> Change Role
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            {onSuspendUser && (
              <DropdownMenuItem
                className={u.isActive ? "text-destructive" : "text-emerald-600"}
                onClick={() => onSuspendUser({ id: u.id, name: u.name, currentStatus: u.isActive })}
              >
                {u.isActive ? (
                  <>
                    <UserX className="size-3.5 mr-2" /> Suspend Account
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-3.5 mr-2" /> Restore Account
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
      moduleKey="users"
      title="All Users Directory"
      description="Search, inspect, and manage university platform user accounts, institutional affiliations, verification flags, and permissions."
      icon={<Users className="size-5" />}
      columns={columns}
      data={data?.data || []}
      totalRecords={data?.total || 0}
      loading={isLoading}
      error={error}
      onRefresh={() => refetch()}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search users by name, email, or user ID..."
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
          {/* Role Filter */}
          <select
            value={role}
            onChange={(e) => handleFilterChange(setRole, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Roles</option>
            <option value="STUDENT">Student</option>
            <option value="ORGANIZER">Organizer</option>
            <option value="ADMIN">Administrator</option>
            <option value="SUPER_ADMIN">Super Administrator</option>
          </select>

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

          {/* Account Status Filter */}
          <select
            value={status}
            onChange={(e) => handleFilterChange(setStatus, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Account Statuses</option>
            <option value="ACTIVE">Active Only</option>
            <option value="SUSPENDED">Suspended Only</option>
          </select>

          {/* Verification Status Filter */}
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
