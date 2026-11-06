import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Shield,
  Plus,
  Building,
  MoreVertical,
  CheckCircle2,
  Trash2,
  UserCheck,
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

interface AdminAdministratorsTableProps {
  universities?: { id: string; name: string }[];
  onCreateAdmin?: () => void;
  onRemoveAdmin?: (admin: { id: string; name: string }) => void;
}

export function AdminAdministratorsTable({
  universities = [],
  onCreateAdmin,
  onRemoveAdmin,
}: AdminAdministratorsTableProps) {
  // Filters state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [role, setRole] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [status, setStatus] = useState("");
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
    setRole("");
    setUniversityId("");
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

  const hasActiveFilters = Boolean(debouncedSearch || role || universityId || status || isDateActive);

  const queryParams = {
    search: debouncedSearch || undefined,
    role: role || undefined,
    universityId: universityId || undefined,
    status: status || undefined,
    isActive: status === "ACTIVE" ? true : status === "SUSPENDED" ? false : undefined,
    startDate: dateFilter.startDate || undefined,
    endDate: dateFilter.endDate || undefined,
    year: dateFilter.year || undefined,
    month: dateFilter.month || undefined,
    datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin", "administrators-table", queryParams],
    queryFn: () => adminApi.getAdministrators(queryParams),
  });

  // Client-side pagination & sorting since admins count is typically modest
  const rawList = Array.isArray(data) ? data : [];

  const filteredList = rawList.filter((admin: any) => {
    if (status === "ACTIVE" && !admin.isActive) return false;
    if (status === "SUSPENDED" && admin.isActive) return false;
    if (!isDateActive) return true;
    const created = admin.createdAt ? new Date(admin.createdAt).getTime() : 0;
    if (dateFilter.startDate && created < new Date(dateFilter.startDate).getTime()) return false;
    if (dateFilter.endDate && created > new Date(dateFilter.endDate + "T23:59:59.999Z").getTime()) return false;
    if (dateFilter.year) {
      const yr = new Date(admin.createdAt).getUTCFullYear();
      if (String(yr) !== String(dateFilter.year)) return false;
    }
    if (dateFilter.month) {
      const mo = String(new Date(admin.createdAt).getUTCMonth() + 1).padStart(2, "0");
      if (mo !== String(dateFilter.month).padStart(2, "0")) return false;
    }
    return true;
  });

  const totalRecords = filteredList.length;

  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const paginatedList = sortedList.slice((page - 1) * pageSize, page * pageSize);

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      key: "name",
      header: "Administrator",
      sortable: true,
      render: (a) => (
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-navy text-primary font-bold text-xs uppercase border border-border">
            {a.name?.charAt(0) || "A"}
          </div>
          <div className="min-w-0">
            <span className="font-semibold text-foreground truncate block">{a.name}</span>
            <p className="text-[11px] text-muted-foreground truncate">{a.email}</p>
            <p className="text-[10px] font-mono text-muted-foreground/70 truncate">ID: {a.id?.slice(0, 8)}...</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "System Role",
      render: (a) => {
        const roles = a.roles || [];
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
      key: "university",
      header: "University Scope",
      render: (a) => (
        <div className="flex items-center gap-1 font-medium text-foreground">
          <Building className="size-3 text-muted-foreground shrink-0" />
          <span className="truncate">{a.university?.name || "Global Platform Scope"}</span>
        </div>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (a) => (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
            a.isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground",
          )}
        >
          {a.isActive ? "Active" : "Suspended"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created Date",
      sortable: true,
      render: (a) => (
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
          {formatDate(a.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (a) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-7">
              <MoreVertical className="size-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-xs">
            <DropdownMenuLabel>Admin Controls</DropdownMenuLabel>
            {onRemoveAdmin && (
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onRemoveAdmin({ id: a.id, name: a.name })}
              >
                <Trash2 className="size-3.5 mr-2" /> Revoke Admin Access
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AdminDataTable
      moduleKey="administrators"
      title="Platform Administrators"
      description="Manage enterprise governance credentials, super administrator permissions, and university-scoped moderators."
      icon={<Shield className="size-5" />}
      columns={columns}
      data={paginatedList}
      totalRecords={totalRecords}
      loading={isLoading}
      error={error}
      onRefresh={() => refetch()}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search administrators by name, email, or ID..."
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
      extraActions={
        onCreateAdmin && (
          <Button size="sm" onClick={onCreateAdmin} className="h-8 text-xs font-semibold gap-1.5">
            <Plus className="size-3.5" />
            Add Administrator
          </Button>
        )
      }
      filterSlots={
        <>
          {/* Role Filter */}
          <select
            value={role}
            onChange={(e) => handleFilterChange(setRole, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Admin Roles</option>
            <option value="SUPER_ADMIN">Super Administrator</option>
            <option value="ADMIN">Platform Administrator</option>
            <option value="UNIVERSITY_ADMIN">University Administrator</option>
          </select>

          {/* Account Status Filter */}
          <select
            value={status}
            onChange={(e) => handleFilterChange(setStatus, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active Only</option>
            <option value="SUSPENDED">Disabled / Suspended</option>
          </select>

          {/* University Scope Filter */}
          <select
            value={universityId}
            onChange={(e) => handleFilterChange(setUniversityId, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary max-w-[180px]"
          >
            <option value="">All Scopes</option>
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
