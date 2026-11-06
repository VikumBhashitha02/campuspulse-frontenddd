import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  ExternalLink,
  FileText,
  Building,
  Image as ImageIcon,
} from "lucide-react";
import { formatDate } from "@/lib/format";
import type { CampusEvent } from "@/lib/types";

interface EventProofTabProps {
  event: CampusEvent;
}

export function EventProofTab({ event }: EventProofTabProps) {
  const status = event.eventVerificationStatus || "PENDING_REVIEW";

  return (
    <div className="space-y-6">
      {/* Verification Status Banner */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Official Event Verification Status
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                {status === "VERIFIED" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-black text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="size-3.5" />
                    VERIFIED OFFICIAL EVENT
                  </span>
                )}
                {status === "PENDING_REVIEW" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-black text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    <Clock className="size-3.5" />
                    PENDING ADMINISTRATIVE REVIEW
                  </span>
                )}
                {status === "FLAGGED" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-black text-rose-700 dark:text-rose-300 border border-rose-500/30">
                    <AlertCircle className="size-3.5" />
                    UNDER REVIEW / FLAGGED
                  </span>
                )}
                {status === "REJECTED" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/20 px-3 py-1 text-xs font-black text-destructive border border-destructive/30">
                    <XCircle className="size-3.5" />
                    REJECTED / UNVERIFIED
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {event.verificationNotes && (
          <div className="rounded-lg bg-muted/40 border border-border/80 p-3 text-xs text-foreground space-y-1">
            <span className="font-bold text-muted-foreground uppercase text-[10px]">
              Moderation & Review Notes:
            </span>
            <p>{event.verificationNotes}</p>
          </div>
        )}
      </div>

      {/* Submitted Proof Evidence & Media */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
          <FileText className="size-4 text-primary" />
          Submitted Event Evidence & Media Links
        </h4>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Official Event URL */}
          <div className="rounded-lg border border-border/70 bg-muted/20 p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              Official Event Website / Announcement
            </span>
            {event.officialEventUrl ? (
              <a
                href={event.officialEventUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5 break-all"
              >
                <span>{event.officialEventUrl}</span>
                <ExternalLink className="size-3 shrink-0" />
              </a>
            ) : (
              <p className="text-xs text-muted-foreground italic">No official event URL submitted.</p>
            )}
          </div>

          {/* Official Organization URL */}
          <div className="rounded-lg border border-border/70 bg-muted/20 p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              Host Organization / Social Portal
            </span>
            {event.officialOrgUrl ? (
              <a
                href={event.officialOrgUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5 break-all"
              >
                <span>{event.officialOrgUrl}</span>
                <ExternalLink className="size-3 shrink-0" />
              </a>
            ) : (
              <p className="text-xs text-muted-foreground italic">No host portal link provided.</p>
            )}
          </div>

          {/* Proof Document URL */}
          <div className="rounded-lg border border-border/70 bg-muted/20 p-3.5 space-y-1 sm:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              Supporting Proof Document / University Endorsement
            </span>
            {event.proofDocumentUrl ? (
              <a
                href={event.proofDocumentUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5 break-all"
              >
                <span>{event.proofDocumentUrl}</span>
                <ExternalLink className="size-3 shrink-0" />
              </a>
            ) : (
              <p className="text-xs text-muted-foreground italic">No document link attached.</p>
            )}
          </div>
        </div>

        {/* Organizer Notes */}
        {event.organizerNotes && (
          <div className="rounded-lg border border-border/70 bg-muted/20 p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              Organizer Notes for Verification Team
            </span>
            <p className="text-xs text-foreground whitespace-pre-line">{event.organizerNotes}</p>
          </div>
        )}
      </div>

      {/* Poster & Media Preview */}
      {event.posterUrl && (
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
            <ImageIcon className="size-4 text-primary" />
            Event Poster & Artwork
          </h4>
          <div className="rounded-lg overflow-hidden max-w-sm border border-border">
            <img
              src={event.posterUrl}
              alt={event.title}
              className="w-full h-auto object-cover max-h-80"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
