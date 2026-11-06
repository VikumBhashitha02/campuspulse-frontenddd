import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Flag, ShieldAlert, Clock, CheckCircle2, User } from "lucide-react";
import { eventsApi } from "@/lib/api/events";
import { formatDate } from "@/lib/format";
import type { EventReport } from "@/lib/types";

interface EventReportsTabProps {
  eventId: string;
  eventTitle: string;
}

export function EventReportsTab({ eventId, eventTitle }: EventReportsTabProps) {
  const query = useQuery({
    queryKey: ["events", "reports", eventId],
    queryFn: () => eventsApi.getEventReports(eventId),
  });

  const reports: EventReport[] = query.data || [];

  return (
    <div className="space-y-4">
      <div className="bg-card p-4 rounded-xl border border-border">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Flag className="size-4 text-rose-500" />
          Community & Moderation Reports ({reports.length})
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Issues reported by students regarding fake events, misleading info, or ticket discrepancies for "{eventTitle}".
        </p>
      </div>

      {query.isPending ? (
        <div className="p-8 text-center text-xs text-muted-foreground bg-card rounded-xl border border-border">
          Loading report records...
        </div>
      ) : reports.length === 0 ? (
        <div className="p-8 text-center bg-card rounded-xl border border-border space-y-2">
          <div className="mx-auto size-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="size-5" />
          </div>
          <h4 className="text-sm font-bold text-foreground">No reports filed</h4>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            This event listing is in good standing with zero active fraud or misrepresentation reports.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 space-y-2 text-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 font-bold text-rose-600 dark:text-rose-400 border border-rose-500/30 uppercase text-[10px]">
                    {r.reason.replace(/_/g, " ")}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" />
                    {formatDate(r.createdAt)}
                  </span>
                </div>
                <span className="rounded bg-card px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground border border-border">
                  Status: {r.status}
                </span>
              </div>

              {r.details && (
                <p className="text-foreground leading-relaxed pl-1 border-l-2 border-rose-500/40 mt-1">
                  "{r.details}"
                </p>
              )}

              {r.reporter && (
                <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1">
                  <User className="size-3 text-muted-foreground" />
                  Reported by: {r.reporter.name} ({r.reporter.email})
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
