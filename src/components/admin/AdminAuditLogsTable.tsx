import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  History,
  Shield,
  Eye,
  Calendar,
  User,
  Activity,
  Layers,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdminDataTable, type ColumnDef, type DateFilterValues } from "./AdminDataTable";
import { adminApi } from "@/lib/api/admin";
import { formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/common/Badges";

export function AdminAuditLogsTable() {
  // Filter state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [action, setAction] = useState("");
  const [entityType, setEntityType] = useState("");
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

  // Selected Log for Read-Only Inspection Modal
  const [inspectedLog, setInspectedLog] = useState<any | null>(null);

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
    setAction("");
    setEntityType("");
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

  const hasActiveFilters = Boolean(debouncedSearch || action || entityType || isDateActive);

  const queryParams = {
    search: debouncedSearch || undefined,
    action: action || undefined,
    entityType: entityType || undefined,
    startDate: dateFilter.startDate || undefined,
    endDate: dateFilter.endDate || undefined,
    year: dateFilter.year || undefined,
    month: dateFilter.month || undefined,
    datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
    page,
    limit: pageSize,
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin", "audit-logs-table", queryParams],
    queryFn: () => adminApi.getAuditLogs(queryParams),
  });

  const columns: ColumnDef<any>[] = [
    {
      key: "createdAt",
      header: "Timestamp",
      sortable: true,
      render: (a) => (
        <div>
          <span className="font-semibold text-foreground block text-xs whitespace-nowrap">
            {formatDate(a.createdAt)}
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">
            {new Date(a.createdAt).toLocaleTimeString()}
          </span>
        </div>
      ),
    },
    {
      key: "actor",
      header: "Actor / Admin",
      render: (a) => {
        const actorName = a.user?.name || a.actorName || "System Automated";
        const actorEmail = a.user?.email || a.actorEmail || "platform@campuspulse.internal";
        return (
          <div className="flex items-center gap-2">
            <div className="grid size-7 shrink-0 place-items-center rounded-full bg-navy text-primary font-bold text-[10px] uppercase border border-border">
              {actorName.charAt(0)}
            </div>
            <div className="min-w-0">
              <span className="font-semibold text-foreground truncate block text-xs">{actorName}</span>
              <p className="text-[10px] text-muted-foreground truncate">{actorEmail}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "action",
      header: "Action Performed",
      render: (a) => (
        <span className="inline-flex rounded bg-muted px-2 py-0.5 text-[11px] font-mono font-bold text-foreground border border-border">
          {a.action}
        </span>
      ),
    },
    {
      key: "entityType",
      header: "Target Entity",
      render: (a) => (
        <div>
          <span className="text-xs font-semibold text-foreground block">{a.entityType || "SYSTEM"}</span>
          {a.entityId && (
            <span className="text-[10px] font-mono text-muted-foreground truncate block">
              ID: {a.entityId.slice(0, 10)}...
            </span>
          )}
        </div>
      ),
    },
    {
      key: "reason",
      header: "Reason & Notes",
      render: (a) => (
        <span className="text-xs text-muted-foreground line-clamp-1 max-w-xs italic">
          {a.reason ? `"${a.reason}"` : "—"}
        </span>
      ),
    },
    {
      key: "ipAddress",
      header: "Network IP",
      render: (a) => (
        <span className="text-[11px] font-mono text-muted-foreground">
          {a.ipAddress || "127.0.0.1"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Inspect",
      className: "text-right",
      render: (a) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          onClick={() => setInspectedLog(a)}
        >
          <Eye className="size-3.5 mr-1 text-primary" /> View Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <AdminDataTable
        moduleKey="audit-logs"
        title="Enterprise System Audit Logs"
        description="Immutable administrative activity ledger, permission changes, security access logs, and data mutation traces."
        icon={<History className="size-5" />}
        columns={columns}
        data={data?.data || []}
        totalRecords={data?.total || 0}
        loading={isLoading}
        error={error}
        onRefresh={() => refetch()}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search audit trails by action, user, or entity ID..."
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
              value={action}
              onChange={(e) => handleFilterChange(setAction, e.target.value)}
              className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">All Action Types</option>
              <option value="USER_ROLE_CHANGED">Role Modifications</option>
              <option value="USER_SUSPENDED">Account Suspensions</option>
              <option value="USER_RESTORED">Account Restorations</option>
              <option value="VERIFICATION_APPROVED">Verifications Approved</option>
              <option value="VERIFICATION_REJECTED">Verifications Rejected</option>
              <option value="EVENT_CANCELLED">Events Cancelled</option>
              <option value="PAYMENT_REFUNDED">Payment Refunds</option>
              <option value="REPORT_RESOLVED">Moderation Resolved</option>
              <option value="SETTINGS_UPDATED">Settings Changed</option>
            </select>

            <select
              value={entityType}
              onChange={(e) => handleFilterChange(setEntityType, e.target.value)}
              className="h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">All Entity Types</option>
              <option value="USER">User</option>
              <option value="EVENT">Event</option>
              <option value="ORGANIZATION">Organization</option>
              <option value="VERIFICATION">Verification</option>
              <option value="PAYMENT">Payment</option>
              <option value="REPORT">Report</option>
              <option value="SETTINGS">Settings</option>
            </select>
          </>
        }
      />

      {/* Read-Only Audit Log Detail Modal */}
      <Dialog open={!!inspectedLog} onOpenChange={(open) => !open && setInspectedLog(null)}>
        <DialogContent className="max-w-xl text-xs">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold">
              <History className="size-5 text-primary" />
              Audit Log Record Details
            </DialogTitle>
            <DialogDescription>
              Authoritative, immutable transaction log record ID:{" "}
              <span className="font-mono text-foreground font-semibold">{inspectedLog?.id}</span>
            </DialogDescription>
          </DialogHeader>

          {inspectedLog && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3 text-xs bg-muted/30 p-3 rounded-lg border border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Action</p>
                  <p className="font-mono font-bold text-foreground mt-0.5">{inspectedLog.action}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Timestamp</p>
                  <p className="font-medium text-foreground mt-0.5">{formatDate(inspectedLog.createdAt)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Actor</p>
                  <p className="font-medium text-foreground mt-0.5">
                    {inspectedLog.user?.name || "System"} ({inspectedLog.user?.email || "internal"})
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Target</p>
                  <p className="font-medium text-foreground mt-0.5">
                    {inspectedLog.entityType} ({inspectedLog.entityId || "N/A"})
                  </p>
                </div>
                {inspectedLog.ipAddress && (
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Client IP</p>
                    <p className="font-mono text-muted-foreground mt-0.5">{inspectedLog.ipAddress}</p>
                  </div>
                )}
                {inspectedLog.reason && (
                  <div className="col-span-2">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Justification / Reason</p>
                    <p className="italic text-foreground mt-0.5">"{inspectedLog.reason}"</p>
                  </div>
                )}
              </div>

              {/* State Diff / JSON Details */}
              {inspectedLog.details && (
                <div>
                  <p className="text-xs font-bold text-foreground mb-1.5">Action Metadata / State Diff</p>
                  <pre className="p-3 bg-muted rounded-lg font-mono text-[11px] text-foreground overflow-x-auto max-h-48 border border-border">
                    {JSON.stringify(inspectedLog.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setInspectedLog(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
