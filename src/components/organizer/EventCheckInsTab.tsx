import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  QrCode,
  Search,
  CheckCircle2,
  Clock,
  UserCheck,
  Percent,
  Users,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { eventsApi } from "@/lib/api/events";
import { OrgAvatar } from "@/components/common/Badges";
import { formatDate } from "@/lib/format";
import type { EventCheckInEntry } from "@/lib/types";

interface EventCheckInsTabProps {
  eventId: string;
  eventTitle: string;
  onOpenScanner?: () => void;
}

export function EventCheckInsTab({
  eventId,
  eventTitle,
  onOpenScanner,
}: EventCheckInsTabProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ["events", "checkins", eventId, page, search],
    queryFn: () =>
      eventsApi.getEventCheckIns(eventId, {
        page,
        limit: 15,
        search: search.trim() || undefined,
      }),
  });

  const checkIns: EventCheckInEntry[] = query.data?.items || [];
  const meta = query.data?.meta || { page: 1, total: 0, totalPages: 1 };
  const stats = query.data?.stats || {
    totalRegistered: 0,
    totalCheckedIn: 0,
    remaining: 0,
    checkInPercentage: 0,
  };

  return (
    <div className="space-y-5">
      {/* Stats Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold">
            <Users className="size-4 text-primary" />
            Total Registered
          </div>
          <p className="text-2xl font-black text-foreground mt-2">{stats.totalRegistered}</p>
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <UserCheck className="size-4" />
            Admitted / Checked In
          </div>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
            {stats.totalCheckedIn}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold">
            <Clock className="size-4 text-amber-500" />
            Remaining to Arrive
          </div>
          <p className="text-2xl font-black text-foreground mt-2">{stats.remaining}</p>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-primary text-xs font-semibold">
            <Percent className="size-4" />
            Check-In Turnout
          </div>
          <p className="text-2xl font-black text-primary mt-2">
            {stats.checkInPercentage}%
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-card p-3 rounded-xl border border-border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search check-in history..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-8 text-xs h-9"
          />
        </div>

        {onOpenScanner && (
          <Button
            size="sm"
            onClick={onOpenScanner}
            className="bg-navy text-white hover:bg-navy/90 font-semibold gap-1.5 text-xs h-9"
          >
            <QrCode className="size-4 text-amber-400" />
            Open Door Scanner
          </Button>
        )}
      </div>

      {/* Check-ins History Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border bg-muted/40 text-[11px] font-bold uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Participant</th>
              <th className="px-4 py-3">University</th>
              <th className="px-4 py-3">Ticket Pass</th>
              <th className="px-4 py-3">Check-In Time</th>
              <th className="px-4 py-3">Checked In By</th>
              <th className="px-4 py-3">Notes / Gate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {query.isPending ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  Loading check-in history...
                </td>
              </tr>
            ) : checkIns.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No door check-ins recorded yet for "{eventTitle}".
                </td>
              </tr>
            ) : (
              checkIns.map((ci) => {
                const user = ci.user;
                const ticket = ci.ticket;
                const uniName = user?.studentProfile?.university?.name || "Independent / External";

                return (
                  <tr key={ci.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <OrgAvatar
                          initials={user?.name?.slice(0, 2).toUpperCase() || "PA"}
                          className="size-7 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-foreground">{user?.name || "Attendee"}</p>
                          <p className="text-[11px] text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="size-3 text-primary shrink-0" />
                        <span className="truncate max-w-[150px]">{uniName}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-foreground bg-muted/60 px-1.5 py-0.5 rounded border border-border">
                          {ticket?.ticketNumber || "Pass"}
                        </span>
                        {ticket?.ticketType && (
                          <span className="text-[10px] text-muted-foreground">
                            ({ticket.ticketType.replace(/_/g, " ")})
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">
                      {formatDate(ci.checkInTime)}
                    </td>

                    <td className="px-4 py-3 text-muted-foreground">
                      {ci.checkedInBy?.name || "Door Officer"}
                    </td>

                    <td className="px-4 py-3 text-muted-foreground">
                      {ci.notes || "—"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex items-center justify-between py-2 text-xs text-muted-foreground">
          <span>
            Page {meta.page} of {meta.totalPages} ({meta.total} records)
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page >= meta.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
