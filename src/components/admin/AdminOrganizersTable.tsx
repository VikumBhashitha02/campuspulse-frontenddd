import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ShieldCheck,
  Eye,
  Building2,
  Building,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminDataTable, type ColumnDef, type DateFilterValues } from "./AdminDataTable";
import { adminApi } from "@/lib/api/admin";
import { formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/common/Badges";

interface AdminOrganizersTableProps {
  universities?: { id: string; name: string }[];
  onInspectUser?: (id: string) => void;
  onViewOrganization?: (orgId: string) => void;
}

export function AdminOrganizersTable({
  universities = [],
  onInspectUser,
  onViewOrganization,
}: AdminOrganizersTableProps) {
  // Filters state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [committeeRole, setCommitteeRole] = useState("");
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
    setCommitteeRole("");
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
    debouncedSearch || universityId || committeeRole || isVerified || isDateActive
  );

  const queryParams = {
    search: debouncedSearch || undefined,
    universityId: universityId || undefined,
    committeeRole: committeeRole || undefined,
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
    queryKey: ["admin", "organizers-table", queryParams],
    queryFn: () => adminApi.getOrganizers(queryParams),
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
      header: "Organizer Identity",
      sortable: true,
      render: (o) => (
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs uppercase border border-emerald-200 dark:border-emerald-800/40">
            {o.name?.charAt(0) || "O"}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground truncate">{o.name}</span>
              {o.organizerVerificationStatus === "APPROVED" && (
                <span title="Accredited Organizer">
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                </span>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground truncate">{o.email}</p>
            <p className="text-[10px] font-mono text-muted-foreground/70 truncate">ID: {o.id?.slice(0, 8)}...</p>
          </div>
        </div>
      ),
    },
    {
      key: "university",
      header: "University",
      render: (o) => (
        <div className="flex items-center gap-1 font-medium text-foreground">
          <Building className="size-3 text-muted-foreground shrink-0" />
          <span className="truncate">{o.university?.name || "General / Independent"}</span>
        </div>
      ),
    },
    {
      key: "organization",
      header: "Society / Organization",
      render: (o) => {
        const primary = o.primaryOrganization;
        const totalOrgs = o.organizationMemberships?.length || 0;
        return (
          <div>
            <div className="flex items-center gap-1 text-foreground font-medium">
              <Building2 className="size-3 text-muted-foreground shrink-0" />
              <span className="truncate">{primary?.name || "No Society Affiliation"}</span>
            </div>
            {totalOrgs > 1 && (
              <p className="text-[10px] text-muted-foreground">
                + {totalOrgs - 1} other {totalOrgs - 1 === 1 ? "membership" : "memberships"}
              </p>
            )}
          </div>
        );
      },
    },
    {
      key: "committeeRole",
      header: "Committee Role",
      render: (o) => {
        const role = o.primaryOrganization?.role || "ORGANIZER";
        return <StatusBadge status={role} />;
      },
    },
    {
      key: "organizerVerificationStatus",
      header: "Accreditation",
      render: (o) => {
        const status = o.organizerVerificationStatus || "PENDING";
        return <StatusBadge status={status} />;
      },
    },
    {
      key: "stats",
      header: "Events Created",
      render: (o) => (
        <span className="text-xs font-semibold text-foreground">
          {o.stats?.eventsCreated || 0} events
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Joined Date",
      sortable: true,
      render: (o) => (
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
          {formatDate(o.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (o) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-7">
              <MoreVertical className="size-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-xs">
            <DropdownMenuLabel>Organizer Actions</DropdownMenuLabel>
            {onInspectUser && (
              <DropdownMenuItem onClick={() => onInspectUser(o.id)}>
                <Eye className="size-3.5 mr-2 text-primary" /> Inspect Profile
              </DropdownMenuItem>
            )}
            {onViewOrganization && o.primaryOrganization?.id && (
              <DropdownMenuItem onClick={() => onViewOrganization(o.primaryOrganization.id)}>
                <Building2 className="size-3.5 mr-2 text-indigo-600" /> View Society Roster
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AdminDataTable
      moduleKey="organizers"
      title="Organizers & Society Leaders"
      description="Governance oversight for student societies, executive committee members, club presidents, and verified event hosts."
      icon={<ShieldCheck className="size-5" />}
      columns={columns}
      data={data?.data || []}
      totalRecords={data?.total || 0}
      loading={isLoading}
      error={error}
      onRefresh={() => refetch()}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search organizers by name, email, or society..."
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

          {/* Committee Role Filter */}
          <select
            value={committeeRole}
            onChange={(e) => handleFilterChange(setCommitteeRole, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Committee Roles</option>
            <option value="PRESIDENT">President</option>
            <option value="LEADER">Leader / Captain</option>
            <option value="SECRETARY">Secretary</option>
            <option value="TREASURER">Treasurer</option>
            <option value="EVENT_ORGANIZER">Event Organizer</option>
          </select>

          {/* Verification Status Filter */}
          <select
            value={isVerified}
            onChange={(e) => handleFilterChange(setIsVerified, e.target.value)}
            className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Verification States</option>
            <option value="YES">Verified Only</option>
            <option value="NO">Pending / Unverified</option>
          </select>
        </>
      }
    />
  );
}
