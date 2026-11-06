import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  CreditCard,
  Building,
  GraduationCap,
  ShieldCheck,
  XCircle,
  QrCode,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { eventsApi } from "@/lib/api/events";
import { participationApi } from "@/lib/api/participation";
import { OrgAvatar } from "@/components/common/Badges";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { EventParticipant } from "@/lib/types";
import { EventPaymentClaimsView } from "./EventPaymentClaimsView";

interface EventParticipantsTabProps {
  eventId: string;
  eventTitle: string;
}

export function EventParticipantsTab({ eventId, eventTitle }: EventParticipantsTabProps) {
  const [activeView, setActiveView] = useState<"ATTENDEES" | "BANK_CLAIMS">("ATTENDEES");
  const [search, setSearch] = useState("");
  const [ticketTypeFilter, setTicketTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [paymentFilter, setPaymentFilter] = useState("ALL");
  const [checkedInFilter, setCheckedInFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  // Load participants query
  const query = useQuery({
    queryKey: [
      "events",
      "participants",
      eventId,
      page,
      search,
      ticketTypeFilter,
      statusFilter,
      paymentFilter,
      checkedInFilter,
    ],
    queryFn: () =>
      eventsApi.getEventParticipants(eventId, {
        page,
        limit: 15,
        search: search.trim() || undefined,
        ticketType: ticketTypeFilter,
        status: statusFilter,
        paymentStatus: paymentFilter,
        checkedIn: checkedInFilter,
      }),
  });

  // Query claims to display live pending claims indicator
  const claimsQuery = useQuery({
    queryKey: ["payments", "claims", eventId, "badge"],
    queryFn: () => participationApi.getEventPaymentClaims({ eventId }),
  });

  const pendingClaimsCount = useMemo(() => {
    if (!Array.isArray(claimsQuery.data)) return 0;
    return claimsQuery.data.filter((c) => c.status === "PROCESSING" || c.status === "PENDING").length;
  }, [claimsQuery.data]);

  const participants: EventParticipant[] = query.data?.items || [];
  const meta = query.data?.meta || { page: 1, total: 0, totalPages: 1 };

  return (
    <div className="space-y-4">
      {/* View Switcher: Attendees vs Direct Bank Claims */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveView("ATTENDEES")}
          className={cn(
            "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0",
            activeView === "ATTENDEES"
              ? "bg-navy text-white shadow-xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Users className="size-4" />
          Registered Attendees ({meta.total})
        </button>
        <button
          type="button"
          onClick={() => setActiveView("BANK_CLAIMS")}
          className={cn(
            "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0",
            activeView === "BANK_CLAIMS"
              ? "bg-navy text-white shadow-xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Building className="size-4 text-amber-500" />
          Direct Bank Claims
          {pendingClaimsCount > 0 && (
            <span className="rounded-full bg-amber-500 text-white text-[10px] font-black px-1.5 py-0.5 animate-pulse">
              {pendingClaimsCount} pending
            </span>
          )}
        </button>
      </div>

      {activeView === "BANK_CLAIMS" ? (
        <EventPaymentClaimsView
          eventId={eventId}
          eventTitle={eventTitle}
          onClaimProcessed={() => {
            void query.refetch();
            void claimsQuery.refetch();
          }}
        />
      ) : (
        <>
          {/* Header & Export Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-card p-4 rounded-xl border border-border">
            <div>
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Users className="size-4 text-primary" />
                Registered Participants ({meta.total})
              </h3>
              <p className="text-xs text-muted-foreground">
                Displaying authorized attendees registered for "{eventTitle}" only.
              </p>
            </div>
          </div>

      {/* Filters & Search Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5 bg-card p-3 rounded-xl border border-border">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-8 text-xs h-9"
          />
        </div>

        <div>
          <select
            value={ticketTypeFilter}
            onChange={(e) => {
              setTicketTypeFilter(e.target.value);
              setPage(1);
            }}
            aria-label="Filter by Ticket Type"
            className="w-full h-9 rounded-md border border-input bg-background px-2.5 text-xs font-semibold text-foreground"
          >
            <option value="ALL">All Ticket Types</option>
            <option value="UNIVERSITY_STUDENT">University Student</option>
            <option value="EXTERNAL">External Participant</option>
            <option value="GENERAL">General</option>
            <option value="VIP">VIP</option>
            <option value="VOLUNTEER">Volunteer</option>
          </select>
        </div>

        <div>
          <select
            value={paymentFilter}
            onChange={(e) => {
              setPaymentFilter(e.target.value);
              setPage(1);
            }}
            aria-label="Filter by Payment Status"
            className="w-full h-9 rounded-md border border-input bg-background px-2.5 text-xs font-semibold text-foreground"
          >
            <option value="ALL">All Payment Statuses</option>
            <option value="PAID">Paid</option>
            <option value="NOT_REQUIRED">Free / Not Required</option>
            <option value="PENDING">Pending Payment</option>
          </select>
        </div>

        <div>
          <select
            value={checkedInFilter}
            onChange={(e) => {
              setCheckedInFilter(e.target.value);
              setPage(1);
            }}
            aria-label="Filter by Check-In Status"
            className="w-full h-9 rounded-md border border-input bg-background px-2.5 text-xs font-semibold text-foreground"
          >
            <option value="ALL">All Check-In Statuses</option>
            <option value="CHECKED_IN">Checked In</option>
            <option value="NOT_CHECKED_IN">Not Checked In</option>
          </select>
        </div>
      </div>

      {/* Participants Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border bg-muted/40 text-[11px] font-bold uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Participant</th>
              <th className="px-4 py-3">University</th>
              <th className="px-4 py-3">Ticket Type</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Registration Status</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Door Check-In</th>
              <th className="px-4 py-3">Registered Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {query.isPending ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-muted-foreground">
                  Loading participants...
                </td>
              </tr>
            ) : participants.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-muted-foreground">
                  No participants matching the selected filters.
                </td>
              </tr>
            ) : (
              participants.map((p) => {
                const user = p.user;
                const ticket = p.ticket;
                const isCheckedIn = Boolean(ticket?.attendance?.checkInTime);
                const uniName = user?.studentProfile?.university?.name || "Independent / External";

                return (
                  <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                    {/* User */}
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

                    {/* University */}
                    <td className="px-4 py-3 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="size-3 text-primary shrink-0" />
                        <span className="truncate max-w-[150px]">{uniName}</span>
                      </div>
                    </td>

                    {/* Ticket Type */}
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase text-secondary-foreground border border-border">
                        {p.ticketType?.replace(/_/g, " ") || "GENERAL"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {p.ticketPrice && Number(p.ticketPrice) > 0
                        ? `Rs. ${Number(p.ticketPrice).toLocaleString()}`
                        : "FREE"}
                    </td>

                    {/* Registration Status */}
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                          p.status === "REGISTERED" || p.status === "CONFIRMED"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                            : p.status === "PENDING"
                              ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                              : "bg-destructive/15 text-destructive"
                        )}
                      >
                        {p.status}
                      </span>
                    </td>

                    {/* Payment Status */}
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                          p.payment?.status === "PAID" || (!p.payment && (!p.ticketPrice || Number(p.ticketPrice) === 0))
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                            : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                        )}
                      >
                        {p.payment?.status || (p.ticketPrice && Number(p.ticketPrice) > 0 ? "PENDING" : "NOT REQUIRED")}
                      </span>
                    </td>

                    {/* Door Check-In */}
                    <td className="px-4 py-3">
                      {isCheckedIn ? (
                        <div>
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                            <CheckCircle2 className="size-3" />
                            Checked In
                          </span>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {formatDate(ticket?.attendance?.checkInTime || "")}
                          </p>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/15 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                          <Clock className="size-3" />
                          Not Checked In
                        </span>
                      )}
                    </td>

                    {/* Registered Date */}
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(p.registeredAt)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {meta.totalPages > 1 && (
        <div className="flex items-center justify-between py-2 text-xs text-muted-foreground">
          <span>
            Page {meta.page} of {meta.totalPages} ({meta.total} participants)
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
        </>
      )}
    </div>
  );
}
