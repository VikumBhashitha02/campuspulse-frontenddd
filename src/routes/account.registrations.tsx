import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  Ticket,
  CreditCard,
  QrCode as QrCodeIcon,
  Users,
  Undo2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Building,
  Clock,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmptyState, ErrorState, PageHeader, RowSkeleton } from "@/components/common/States";
import { DeadlineBadge, ModeBadge, OrgAvatar } from "@/components/common/Badges";
import { formatDate, formatRange } from "@/lib/format";
import { participationApi } from "@/lib/api/participation";
import { eventsApi } from "@/lib/api/events";
import { TicketPassModal } from "@/components/tickets/TicketPassModal";
import { SubmitPaymentClaimDialog } from "@/components/events/SubmitPaymentClaimDialog";
import { cn } from "@/lib/utils";
import type { RegistrationRecord, EventTicketRecord } from "@/lib/types";

export const Route = createFileRoute("/account/registrations")({
  head: () => ({
    meta: [
      { title: "My Registrations & Tickets — CampusPulse" },
      { name: "description", content: "Track your event registrations, digital admission passes, payments, and QR tickets." },
      { property: "og:title", content: "My Registrations & Tickets — CampusPulse" },
      { property: "og:description", content: "Your CampusPulse event admission passes and verified check-in tickets." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RegistrationsPage,
});

const TABS = [
  { id: "upcoming", label: "Upcoming" },
  { id: "tickets", label: "Passes & Tickets 🎫" },
  { id: "past", label: "Past Events" },
  { id: "all", label: "All Registrations" },
] as const;

function RegistrationsPage() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("upcoming");

  // Selected ticket for the Pass Modal
  const [selectedTicket, setSelectedTicket] = useState<{
    ticket: EventTicketRecord;
    registration: RegistrationRecord;
  } | null>(null);

  // Cancellation state
  const [cancellingReg, setCancellingReg] = useState<RegistrationRecord | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Direct Bank Transfer Claim Resubmission state
  const [claimModalData, setClaimModalData] = useState<{
    paymentId: string;
    amount: number | string;
    currency: string;
    bankDetails?: any;
    eventTitle?: string | undefined;
    previousRejectionReason?: string | null | undefined;
  } | null>(null);

  // Load registrations from live backend participation API with fallback
  const query = useQuery({
    queryKey: ["registrations", "my-all"],
    queryFn: async () => {
      try {
        const liveList = await participationApi.getMyRegistrations();
        if (Array.isArray(liveList) && liveList.length > 0) {
          return liveList;
        }
      } catch (err) {
        console.warn("Could not fetch from participationApi, checking legacy registrations:", err);
      }

      // Legacy adapter fallback
      const legacyList = await eventsApi.registrations();
      return legacyList.map((item) => ({
        id: item.registration.id,
        eventId: item.registration.eventId,
        userId: "me",
        status: (item.registration.status === "CONFIRMED" ? "REGISTERED" : item.registration.status) as any,
        registeredAt: item.registration.registeredAt,
        notes: null,
        isGroup: false,
        event: {
          id: item.event.id,
          title: item.event.title,
          slug: item.event.slug,
          startDate: item.event.startDate,
          endDate: item.event.endDate,
          venue: item.event.location,
          location: item.event.location,
          mode: item.event.mode,
          isFree: item.event.isFree,
          price: item.event.price,
          currency: "LKR",
          organization: {
            id: item.event.organizationId,
            name: item.event.organizationName,
            slug: item.event.organizationId,
          },
        },
      })) as RegistrationRecord[];
    },
  });

  const registrations = query.data ?? [];
  const now = Date.now();

  const filteredRegistrations = registrations.filter((reg) => {
    const event = reg.event;
    const ended = event?.endDate ? +new Date(event.endDate) < now : false;

    if (tab === "upcoming") return reg.status !== "CANCELLED" && !ended;
    if (tab === "tickets") return Boolean(reg.ticket);
    if (tab === "past") return ended;
    return true;
  });

  const handleConfirmCancel = async () => {
    if (!cancellingReg) return;
    setIsCancelling(true);
    try {
      const res = await participationApi.cancelRegistration(cancellingReg.id);
      if (res.refundProcessed) {
        toast.success("Registration cancelled & refund processed!", {
          description: `A refund of LKR ${res.refundedAmount || cancellingReg.payment?.amount || 0} has been initiated to the original payer.`,
        });
      } else {
        toast.success("Registration cancelled successfully", {
          description: "Your spot has been released.",
        });
      }
      setCancellingReg(null);
      void queryClient.invalidateQueries({ queryKey: ["registrations"] });
    } catch (err: any) {
      toast.error("Cancellation failed", {
        description: err?.message || "Could not cancel registration.",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="My registrations & admission passes"
        description="View your digital entry passes, secure QR tokens, group tickets, and payment history."
      />

      {/* Filter Tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
              tab === t.id
                ? "bg-navy text-navy-foreground shadow-sm"
                : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border/50",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="mt-6">
        {query.isPending ? (
          <RowSkeleton />
        ) : query.isError ? (
          <ErrorState onRetry={() => query.refetch()} />
        ) : filteredRegistrations.length === 0 ? (
          <EmptyState
            icon={<Ticket className="size-6" aria-hidden />}
            title={registrations.length === 0 ? "No registrations yet" : "Nothing in this filter"}
            description={
              registrations.length === 0
                ? "Once you register for an opportunity or competition, your entry ticket and QR pass will appear here."
                : "Switch tabs to see your other registrations and passes."
            }
            action={
              <Button asChild>
                <Link to="/explore">Explore opportunities</Link>
              </Button>
            }
          />
        ) : (
          <ul className="space-y-4">
            {filteredRegistrations.map((reg) => {
              const event = reg.event;
              const isClubTransfer = reg.payment?.provider === "CLUB_TRANSFER";
              const isAwaitingVerification =
                reg.payment?.status === "PROCESSING" ||
                (isClubTransfer && Boolean(reg.payment?.paymentProofUrl) && reg.payment?.status !== "FAILED" && reg.payment?.status !== "PAID");
              const isRejected =
                reg.payment?.status === "FAILED" || Boolean(reg.payment?.rejectionReason);
              const isPendingProof =
                reg.status === "PENDING_PAYMENT" && isClubTransfer && !reg.payment?.paymentProofUrl && !isRejected;

              // QR ticket is only valid and visible if confirmed (REGISTERED)
              const hasValidTicket = Boolean(reg.ticket) && reg.status === "REGISTERED";
              const isPaid = reg.payment && Number(reg.payment.amount) > 0;

              return (
                <li
                  key={reg.id}
                  className="card-interactive rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:border-border/80"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                      <OrgAvatar
                        initials={event?.organization?.name ? event.organization.name.slice(0, 2).toUpperCase() : "CP"}
                        className="size-11 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold leading-snug">
                            {event ? (
                              <Link
                                to="/events/$slug"
                                params={{ slug: event.slug }}
                                className="hover:text-primary transition-colors"
                              >
                                {event.title}
                              </Link>
                            ) : (
                              "Campus Event Opportunity"
                            )}
                          </h3>
                        </div>

                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          {event?.organization?.name || "Campus Organizer"} · {event?.venue || event?.location || "Campus Venue"}
                        </p>

                        {/* Metadata row */}
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                          {event?.startDate && (
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays className="size-3.5 text-primary" aria-hidden />
                              {event.endDate ? formatRange(event.startDate, event.endDate) : formatDate(event.startDate)}
                            </span>
                          )}

                          {reg.isGroup && (
                            <span className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold">
                              <Users className="size-3.5" />
                              Group Entry
                            </span>
                          )}

                          {hasValidTicket && reg.ticket && (
                            <span className="font-mono font-bold text-foreground">
                              {reg.ticket.ticketNumber}
                            </span>
                          )}

                          <span>Registered {formatDate(reg.registeredAt)}</span>
                        </div>

                        {/* Status notification alerts for Direct Transfer */}
                        {isRejected && (
                          <div className="mt-3 rounded-lg border border-rose-500/30 bg-rose-500/5 p-3 text-xs text-rose-800 dark:text-rose-200">
                            <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-300">
                              <AlertCircle className="size-4 shrink-0" />
                              Bank Slip Rejected by Club Officer
                            </div>
                            {reg.payment?.rejectionReason && (
                              <p className="mt-1 text-[11px] leading-relaxed font-medium">
                                Reason: "{reg.payment.rejectionReason}"
                              </p>
                            )}
                            <p className="mt-1 text-[10px] text-muted-foreground">
                              Please review your transfer details and resubmit a corrected deposit slip below.
                            </p>
                          </div>
                        )}

                        {isAwaitingVerification && (
                          <div className="mt-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-2.5 text-xs text-blue-800 dark:text-blue-200 flex items-start gap-2">
                            <Clock className="size-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div>
                              <span className="font-bold text-blue-900 dark:text-blue-100">
                                Direct Bank Transfer Awaiting Officer Verification
                              </span>
                              <p className="text-[11px] text-muted-foreground mt-0.5">
                                Reference: <span className="font-mono font-semibold text-foreground">{reg.payment?.referenceNumber || reg.payment?.providerPaymentId || "Submitted"}</span>
                                {reg.payment?.transferDate ? ` · Date: ${formatDate(reg.payment.transferDate)}` : ""}
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                The club treasurer is reconciling deposits with their bank account. Your official QR pass will be issued immediately upon confirmation.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status badges & actions */}
                    <div className="flex sm:flex-col items-end justify-between gap-2.5 shrink-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {/* Registration / Attendance Status Badge */}
                        {reg.ticket?.attendance?.status === "CHECKED_IN" || reg.status === "ATTENDED" ? (
                          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                            ✓ Checked In
                          </span>
                        ) : isRejected ? (
                          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                            <AlertCircle className="size-3" />
                            Slip Rejected
                          </span>
                        ) : isAwaitingVerification ? (
                          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                            <Clock className="size-3" />
                            Awaiting Verification
                          </span>
                        ) : isPendingProof ? (
                          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                            <Building className="size-3" />
                            Deposit Slip Required
                          </span>
                        ) : (
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-1 text-xs font-bold",
                              reg.status === "REGISTERED" && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
                              reg.status === "PENDING_PAYMENT" && "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
                              reg.status === "CANCELLED" && "bg-muted text-muted-foreground border border-border",
                            )}
                          >
                            {reg.status === "REGISTERED"
                              ? "Confirmed"
                              : reg.status === "PENDING_PAYMENT"
                                ? "Pending Payment"
                                : reg.status.toLowerCase()}
                          </span>
                        )}

                        {/* Payment Badge */}
                        {isPaid ? (
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[11px] font-semibold flex items-center gap-1",
                              reg.payment?.status === "PAID" && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
                              reg.payment?.status === "REFUNDED" && "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30",
                              (isAwaitingVerification || reg.payment?.status === "PROCESSING") && "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30",
                              isPendingProof && "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
                              isRejected && "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30",
                              reg.payment?.status === "PENDING" && !isClubTransfer && "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
                            )}
                          >
                            {isClubTransfer ? (
                              <Building className="size-3" />
                            ) : (
                              <CreditCard className="size-3" />
                            )}
                            {reg.payment?.status === "PAID"
                              ? isClubTransfer
                                ? `Club Transfer Verified (${reg.payment.currency} ${Number(reg.payment.amount).toLocaleString()})`
                                : `Paid ${reg.payment.currency} ${Number(reg.payment.amount).toLocaleString()}`
                              : isAwaitingVerification
                                ? "Verification Pending"
                                : isRejected
                                  ? "Slip Rejected"
                                  : isPendingProof
                                    ? "Transfer Due"
                                    : reg.payment?.status}
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-500/15 text-slate-600 dark:text-slate-400 px-2 py-0.5 text-[11px] font-semibold border border-slate-500/20">
                            Free Pass
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        {hasValidTicket && reg.status !== "CANCELLED" && (
                          <Button
                            size="sm"
                            className="text-xs h-8 gap-1.5 bg-navy text-white hover:bg-navy/90 shadow-sm"
                            onClick={() =>
                              setSelectedTicket({
                                ticket: reg.ticket!,
                                registration: reg,
                              })
                            }
                          >
                            <QrCodeIcon className="size-3.5" />
                            View Pass & QR
                          </Button>
                        )}

                        {/* Direct Bank Transfer Slip Upload / Resubmit */}
                        {reg.payment && (isRejected || isPendingProof) && isClubTransfer && (
                          <Button
                            size="sm"
                            className="text-xs h-8 gap-1.5 bg-amber-600 text-white hover:bg-amber-700 shadow-sm"
                            onClick={() =>
                              setClaimModalData({
                                paymentId: reg.payment!.id,
                                amount: reg.payment!.amount,
                                currency: reg.payment!.currency,
                                eventTitle: event?.title || "Event",
                                bankDetails: (event as any)?.organization,
                                previousRejectionReason: reg.payment?.rejectionReason || undefined,
                              })
                            }
                          >
                            <Upload className="size-3.5" />
                            {isRejected ? "Resubmit Slip & Reference" : "Upload Bank Slip"}
                          </Button>
                        )}

                        {isPaid && reg.payment?.status === "PAID" && (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="text-xs h-8 gap-1 border-border"
                          >
                            <Link to="/account/payments">
                              <CreditCard className="size-3" />
                              Receipt
                            </Link>
                          </Button>
                        )}

                        {reg.status !== "CANCELLED" && reg.status !== "ATTENDED" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-8 text-muted-foreground hover:text-destructive"
                            onClick={() => setCancellingReg(reg)}
                          >
                            <Undo2 className="size-3.5 mr-1" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Pass & QR Modal */}
      {selectedTicket && (
        <TicketPassModal
          isOpen={Boolean(selectedTicket)}
          onClose={() => setSelectedTicket(null)}
          ticket={selectedTicket.ticket}
          eventTitle={selectedTicket.registration.event?.title}
          organizationName={selectedTicket.registration.event?.organization?.name}
          venue={selectedTicket.registration.event?.venue}
          dateRange={
            selectedTicket.registration.event?.startDate
              ? formatDate(selectedTicket.registration.event.startDate)
              : undefined
          }
          isGroup={selectedTicket.registration.isGroup}
          paymentAmount={selectedTicket.registration.payment?.amount}
          paymentCurrency={selectedTicket.registration.payment?.currency}
        />
      )}

      {/* Cancellation & Refund Confirmation Dialog */}
      <Dialog open={Boolean(cancellingReg)} onOpenChange={(open) => !open && setCancellingReg(null)}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <AlertCircle className="size-5 text-destructive" />
              Cancel Registration?
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Are you sure you want to cancel your registration for{" "}
              <strong className="text-foreground">{cancellingReg?.event?.title}</strong>?
              {cancellingReg?.payment && cancellingReg.payment.status === "PAID" && (
                <span className="block mt-2 font-medium text-purple-600 dark:text-purple-400 bg-purple-500/10 p-2.5 rounded-lg border border-purple-500/20">
                  💳 Refund Notice: Since you completed a payment of {cancellingReg.payment.currency}{" "}
                  {Number(cancellingReg.payment.amount).toLocaleString()}, an automated refund will be processed back to the original payment method and your ticket will be revoked.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setCancellingReg(null)}
              disabled={isCancelling}
            >
              Keep Registration
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleConfirmCancel}
              disabled={isCancelling}
            >
              {isCancelling ? "Processing..." : "Confirm Cancellation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bank Slip Resubmission Dialog */}
      {claimModalData && (
        <SubmitPaymentClaimDialog
          isOpen={Boolean(claimModalData)}
          onClose={() => setClaimModalData(null)}
          paymentId={claimModalData.paymentId}
          amount={claimModalData.amount}
          currency={claimModalData.currency}
          bankDetails={claimModalData.bankDetails}
          eventTitle={claimModalData.eventTitle}
          previousRejectionReason={claimModalData.previousRejectionReason}
          onClaimSubmitted={() => {
            setClaimModalData(null);
            void queryClient.invalidateQueries({ queryKey: ["registrations"] });
            void queryClient.invalidateQueries({ queryKey: ["payments"] });
          }}
        />
      )}
    </div>
  );
}
