import React from "react";
import {
  Ticket,
  CalendarDays,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Copy,
  Printer,
  ShieldCheck,
  Building,
  Users,
  CreditCard,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode } from "@/components/common/QrCode";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { EventTicketRecord, TicketStatus } from "@/lib/types";

interface TicketPassModalProps {
  ticket: EventTicketRecord | null;
  isOpen: boolean;
  onClose: () => void;
  eventTitle?: string | null | undefined;
  organizationName?: string | null | undefined;
  venue?: string | null | undefined;
  dateRange?: string | null | undefined;
  isGroup?: boolean | undefined;
  registeredByName?: string | null | undefined;
  paymentAmount?: string | number | null | undefined;
  paymentCurrency?: string | null | undefined;
}

const TICKET_STATUS_CONFIG: Record<
  TicketStatus,
  { label: string; badgeClass: string; icon: React.ComponentType<{ className?: string }> }
> = {
  ISSUED: {
    label: "Valid Admission Pass",
    badgeClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
    icon: CheckCircle2,
  },
  USED: {
    label: "Attended / Checked In",
    badgeClass: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30",
    icon: CheckCircle2,
  },
  CANCELLED: {
    label: "Registration Cancelled",
    badgeClass: "bg-destructive/15 text-destructive border border-destructive/30",
    icon: XCircle,
  },
  REVOKED: {
    label: "Pass Revoked / Refunded",
    badgeClass: "bg-destructive/15 text-destructive border border-destructive/30",
    icon: AlertCircle,
  },
};

export function TicketPassModal({
  ticket,
  isOpen,
  onClose,
  eventTitle,
  organizationName,
  venue,
  dateRange,
  isGroup,
  registeredByName,
  paymentAmount,
  paymentCurrency = "LKR",
}: TicketPassModalProps) {
  if (!ticket) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const statusConfig = TICKET_STATUS_CONFIG[ticket.status] || TICKET_STATUS_CONFIG.ISSUED;
  const StatusIcon = statusConfig.icon;

  const resolvedEventTitle = eventTitle || ticket.event?.title || "Campus Opportunity Event";
  const resolvedOrgName = organizationName || ticket.event?.organization?.name || "CampusPulse Organization";
  const resolvedVenue = venue || ticket.event?.venue || ticket.event?.location || "Venue Announced on Acceptance";
  const resolvedDate = dateRange || (ticket.event?.startDate ? formatDate(ticket.event.startDate) : "See Event Schedule");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-card border-border shadow-2xl">
        {/* Pass Header Banner */}
        <div className="relative bg-gradient-to-br from-navy via-slate-900 to-indigo-950 p-6 text-white text-center border-b border-indigo-900/50">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30 mb-2">
            <Ticket className="size-3.5" />
            CAMPUSPULSE OFFICIAL ADMISSION PASS
          </div>

          <h3 className="text-lg font-black tracking-tight leading-snug">{resolvedEventTitle}</h3>
          <p className="mt-1 text-xs text-slate-300 font-medium">
            {resolvedOrgName}
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1 bg-white/10 rounded-md px-2.5 py-1">
              <CalendarDays className="size-3.5 text-slate-400" />
              {resolvedDate}
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 rounded-md px-2.5 py-1">
              <MapPin className="size-3.5 text-slate-400" />
              {resolvedVenue}
            </span>
          </div>
        </div>

        {/* Pass Body */}
        <div className="p-6 flex flex-col items-center">
          {/* QR Code in high contrast card */}
          <div className="relative rounded-2xl border-2 border-border bg-white p-4 shadow-lg dark:border-slate-800">
            <QrCode
              value={ticket.qrToken}
              size={185}
              fgColor="#0f172a"
              bgColor="#ffffff"
              className="rounded-lg"
            />
            {ticket.status !== "ISSUED" && (
              <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center p-4 text-center">
                <StatusIcon className="size-8 text-destructive mb-1" />
                <span className="text-xs font-bold uppercase tracking-wider text-destructive">
                  {statusConfig.label}
                </span>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {ticket.status === "USED" ? "Ticket already used for door check-in" : "Ticket is no longer active"}
                </p>
              </div>
            )}
          </div>

          {/* Ticket ID & Verification Badges */}
          <div className="mt-4 text-center w-full">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
              Ticket Pass Identifier
            </span>
            <div className="inline-flex items-center gap-2 mt-0.5">
              <p className="text-base font-mono font-black text-foreground tracking-wide">
                {ticket.ticketNumber}
              </p>
              <button
                type="button"
                onClick={() => copyToClipboard(ticket.ticketNumber, "Ticket Number")}
                className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                title="Copy ticket number"
              >
                <Copy className="size-3.5" />
              </button>
            </div>

            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-bold",
                  statusConfig.badgeClass
                )}
              >
                <StatusIcon className="size-3" />
                {statusConfig.label}
              </span>

              {isGroup && (
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30 px-3 py-0.5 text-xs font-bold">
                  <Users className="size-3" />
                  Group Delegate Pass
                </span>
              )}

              {paymentAmount && Number(paymentAmount) > 0 ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-3 py-0.5 text-xs font-bold">
                  <CreditCard className="size-3" />
                  Paid · {paymentCurrency} {Number(paymentAmount).toLocaleString()}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/15 text-slate-700 dark:text-slate-300 border border-slate-500/30 px-3 py-0.5 text-xs font-bold">
                  Free Pass
                </span>
              )}
            </div>
          </div>

          {/* Attendee Details Card */}
          <div className="mt-4 w-full rounded-xl border border-border/80 bg-muted/30 p-3.5 space-y-2 text-xs">
            {ticket.user && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Attendee:</span>
                <span className="font-semibold text-foreground">{ticket.user.name}</span>
              </div>
            )}
            {registeredByName && registeredByName !== ticket.user?.name && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Registered By:</span>
                <span className="font-medium text-foreground">{registeredByName}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Issued At:</span>
              <span className="font-medium text-foreground">{formatDate(ticket.issuedAt)}</span>
            </div>
            {ticket.attendance?.checkInTime && (
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Door Check-In Time:</span>
                <span>{formatDate(ticket.attendance.checkInTime)}</span>
              </div>
            )}
          </div>

          {/* Secure QR Token with Copy */}
          <div className="mt-3 w-full rounded-xl border border-border/60 bg-muted/20 p-2.5 flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                Cryptographic Token
              </span>
              <p className="truncate font-mono text-[11px] text-foreground mt-0.5 font-medium">
                {ticket.qrToken}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 shrink-0 text-xs gap-1"
              onClick={() => copyToClipboard(ticket.qrToken, "Secure QR Token")}
            >
              <Copy className="size-3" />
              Copy
            </Button>
          </div>

          {/* Security & Door instructions */}
          <div className="mt-3 w-full flex items-start gap-2 text-xs text-muted-foreground bg-primary/5 border border-primary/15 rounded-lg p-2.5">
            <ShieldCheck className="size-4 shrink-0 text-primary mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Present this digital pass at the entrance. The event organizer will scan the QR code to verify your spot and check you in.
            </p>
          </div>
        </div>

        <DialogFooter className="p-4 border-t border-border bg-muted/20 flex flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1 text-xs gap-1.5"
            onClick={() => window.print()}
          >
            <Printer className="size-3.5" />
            Print Pass
          </Button>
          <Button
            variant="default"
            className="flex-1 text-xs"
            onClick={onClose}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
