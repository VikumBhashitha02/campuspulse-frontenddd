import React, { useState } from "react";
import {
  Ticket,
  CreditCard,
  Building,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  Lock,
  Sparkles,
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { participationApi } from "@/lib/api/participation";
import { TicketPassModal } from "@/components/tickets/TicketPassModal";
import { SubmitPaymentClaimDialog } from "./SubmitPaymentClaimDialog";
import { cn } from "@/lib/utils";
import type { CampusEvent, EventTicketRecord } from "@/lib/types";

interface EventRegistrationModalProps {
  event: CampusEvent;
  isOpen: boolean;
  onClose: () => void;
  currentUser?: { id: string; name: string; email: string } | null;
  onSuccess?: () => void;
}

export function EventRegistrationModal({
  event,
  isOpen,
  onClose,
  currentUser,
  onSuccess,
}: EventRegistrationModalProps) {
  const [regMode, setRegMode] = useState<"individual" | "group">("individual");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Group participants state
  const [participantInput, setParticipantInput] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);

  // Payment checkout state
  const [pendingPayment, setPendingPayment] = useState<{
    id: string;
    amount: number | string;
    currency: string;
    checkoutUrl?: string | undefined;
  } | null>(null);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

  // Confirmed ticket state for pass modal
  const [confirmedTicket, setConfirmedTicket] = useState<EventTicketRecord | null>(null);

  const isPaid = !event.isFree && event.price && Number(event.price) > 0;
  const unitPrice = isPaid ? Number(event.price) : 0;
  const totalDelegateCount = regMode === "individual" ? 1 : Math.max(1, participants.length + 1);
  const totalCost = unitPrice * totalDelegateCount;

  const allowOnline = false;
  const allowClub = true;
  const paymentMethodChoice: "CLUB_TRANSFER" = "CLUB_TRANSFER";
  const [claimModalData, setClaimModalData] = useState<{
    paymentId: string;
    amount: number | string;
    currency: string;
    bankDetails?: any;
  } | null>(null);

  const handleAddParticipant = () => {
    const trimmed = participantInput.trim();
    if (!trimmed) return;
    if (participants.includes(trimmed)) {
      toast.error("Participant already added to group list");
      return;
    }
    setParticipants([...participants, trimmed]);
    setParticipantInput("");
  };

  const handleRemoveParticipant = (idx: number) => {
    setParticipants(participants.filter((_, i) => i !== idx));
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const isGroupReg = regMode === "group";
      const payload = {
        eventId: event.id,
        notes: notes.trim() || undefined,
        isGroup: isGroupReg,
        participantUserIds: isGroupReg ? participants : undefined,
        paymentMethod: isPaid ? paymentMethodChoice : undefined,
      };

      const result = await participationApi.initiateRegistration(payload);

      if (result.requiresPayment && result.payment) {
        // Direct Club Bank Transfer -> Open deposit slip upload dialog
        setClaimModalData({
          paymentId: result.payment.id,
          amount: result.payment.amount,
          currency: result.payment.currency,
          bankDetails: result.organizationBankDetails || (result as any).bankDetails || event.organization,
        });
        toast.info("Registration initiated! 🏦", {
          description: "Please transfer the fee to the club bank account and upload your deposit slip.",
        });
      } else {
        // Free registration immediately confirmed!
        toast.success("Registration confirmed! 🎟️", {
          description: result.message || "Your official admission pass has been issued.",
        });
        if (result.tickets && result.tickets[0]) {
          setConfirmedTicket(result.tickets[0]);
        }
        onSuccess?.();
      }
    } catch (err: any) {
      toast.error("Registration failed", {
        description: err?.message || "Eligibility check failed or opportunity is full.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyGatewayPayment = async () => {
    if (!pendingPayment) return;
    setIsVerifyingPayment(true);
    try {
      // Trigger server-side HMAC verified payment webhook
      await participationApi.simulateSandboxPayment(pendingPayment.id);

      // Verify payment status with backend
      const statusRes = await participationApi.getPaymentStatus(pendingPayment.id);
      if (statusRes.status === "PAID") {
        toast.success("Payment verified & admission pass issued! 💳", {
          description: "Your cryptographic ticket and QR token have been activated.",
        });

        // Fetch user ticket
        const myTickets = await participationApi.getMyTickets();
        const eventTicket = myTickets.find((t) => t.eventId === event.id);
        if (eventTicket) {
          setConfirmedTicket(eventTicket);
        }
        setPendingPayment(null);
        onSuccess?.();
      } else {
        toast.warning(`Payment status: ${statusRes.status}`, {
          description: "Gateway webhook reconciliation is in progress.",
        });
      }
    } catch (err: any) {
      toast.error("Gateway verification failed", {
        description: err?.message || "Could not reconcile payment.",
      });
    } finally {
      setIsVerifyingPayment(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-lg bg-card border-border shadow-2xl">
          <DialogHeader>
            <div className="inline-flex items-center gap-2 text-primary mb-1">
              <Ticket className="size-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Event Participation & Ticketing
              </span>
            </div>
            <DialogTitle className="text-lg font-black">{event.title}</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Hosted by {event.organizationName} · {event.universityName}
            </DialogDescription>
          </DialogHeader>

          {/* STEP 2: Checkout Session / Gateway Modal */}
          {pendingPayment ? (
            <div className="space-y-5 py-3">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Amount Due
                </span>
                <p className="text-2xl font-black text-foreground mt-1">
                  {pendingPayment.currency} {Number(pendingPayment.amount).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  1 Payment covering {totalDelegateCount} {totalDelegateCount === 1 ? "delegate" : "delegates"}
                </p>
              </div>

              {/* Gateway Provider Security Notice */}
              <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-emerald-500 shrink-0" />
                  <span className="text-sm font-bold text-foreground">
                    Bank-Grade Server-Side Verification
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  CampusPulse enforces strict server-side cryptographic webhook validation (HMAC-SHA256). We never trust the client to declare payment success. Your individual ticket and secure QR token are issued instantly upon gateway confirmation.
                </p>
              </div>

              <DialogFooter className="pt-2 flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => setPendingPayment(null)}
                >
                  Back to Details
                </Button>
                <Button
                  className="w-full sm:flex-1 bg-navy text-white hover:bg-navy/90 font-bold gap-2"
                  disabled={isVerifyingPayment}
                  onClick={handleVerifyGatewayPayment}
                >
                  <CreditCard className="size-4" />
                  {isVerifyingPayment ? "Verifying with Gateway…" : "Complete & Verify Payment"}
                </Button>
              </DialogFooter>
            </div>
          ) : (
            /* STEP 1: Registration Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-5 py-2">
              {/* Mode Toggle: Individual vs Group */}
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted/40 p-1 border border-border">
                <button
                  type="button"
                  onClick={() => setRegMode("individual")}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all",
                    regMode === "individual"
                      ? "bg-card text-foreground shadow-sm border border-border/80"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Ticket className="size-4" />
                  Individual Ticket
                </button>
                <button
                  type="button"
                  onClick={() => setRegMode("group")}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all",
                    regMode === "group"
                      ? "bg-card text-foreground shadow-sm border border-border/80"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Users className="size-4" />
                  Group Delegation
                </button>
              </div>

              {/* Price & Admission Summary Card */}
              {event.pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL" ? (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-amber-500" />
                      University Tiered Pricing
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-card/70 px-2 py-0.5 rounded border border-border/60">
                      Auto-Verified by Server
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-card border border-border/80 p-2.5">
                      <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                        University Student
                      </span>
                      <p className="text-sm font-black text-foreground mt-0.5">
                        {event.studentPrice && Number(event.studentPrice) > 0
                          ? `Rs. ${Number(event.studentPrice).toLocaleString()}`
                          : "FREE"}
                      </p>
                      <p className="text-[10px] text-muted-foreground">Requires verified university email</p>
                    </div>
                    <div className="rounded-lg bg-card border border-border/80 p-2.5">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                        External Participant
                      </span>
                      <p className="text-sm font-black text-foreground mt-0.5">
                        {event.externalPrice
                          ? `Rs. ${Number(event.externalPrice).toLocaleString()}`
                          : "FREE"}
                      </p>
                      <p className="text-[10px] text-muted-foreground">Standard delegate admission</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    * Final ticket category & price are evaluated server-side based on your verified university identity.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-border/80 bg-surface p-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground">Admission Type</span>
                    <p className="text-sm font-bold text-foreground mt-0.5">
                      {isPaid ? "Paid Delegate Pass" : "Free Admission Pass"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-muted-foreground">Total Fee</span>
                    <p className="text-lg font-black text-primary mt-0.5">
                      {isPaid ? `Rs. ${totalCost.toLocaleString()}` : "FREE"}
                    </p>
                  </div>
                </div>
              )}

              {/* Group Participant Management */}
              {regMode === "group" && (
                <div className="space-y-3 rounded-xl border border-border bg-muted/20 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-xs font-bold uppercase tracking-wider">
                        Delegation Members ({totalDelegateCount})
                      </Label>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Each participant will receive an individual ticket & secure QR pass upon payment.
                      </p>
                    </div>
                  </div>

                  {/* Payer row */}
                  <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card p-2.5 text-xs">
                    <span className="font-semibold text-foreground">
                      {currentUser?.name || "You"} (Payer & Primary Delegate)
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Primary
                    </span>
                  </div>

                  {/* Additional participants list */}
                  {participants.map((pid, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border border-border/60 bg-card p-2 text-xs"
                    >
                      <span className="font-medium text-foreground truncate">{pid}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveParticipant(idx)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  ))}

                  {/* Add participant input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Participant User ID or Email"
                      value={participantInput}
                      onChange={(e) => setParticipantInput(e.target.value)}
                      className="text-xs h-9"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddParticipant();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddParticipant}
                      className="h-9 text-xs shrink-0"
                    >
                      <Plus className="size-3.5 mr-1" />
                      Add Member
                    </Button>
                  </div>
                </div>
              )}

              {/* Payment Method Notice (Paid Events) */}
              {isPaid && (
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Payment Method
                  </Label>
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <Building className="size-4" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-foreground block">
                          Direct Bank Transfer to Club
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          Direct external transfer to the club's bank account
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Please use your mobile banking application or online banking to transfer the exact amount to the club. After proceeding, you will receive the bank account details to upload your transfer slip and transaction reference. An authorized club financial officer will verify your deposit before your ticket pass is issued.
                    </p>
                  </div>
                </div>
              )}

              {/* Notes / Requests */}
              <div className="space-y-1.5">
                <Label htmlFor="notes" className="text-xs font-semibold">
                  Notes & Special Requirements (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Dietary requests, accessibility accommodations, or team notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="text-xs min-h-[70px] resize-none"
                />
              </div>

              {/* Independent Eligibility Notice */}
              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 border border-border/60 rounded-lg p-3">
                <ShieldCheck className="size-4 shrink-0 text-primary mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  All participants are independently evaluated against event eligibility criteria. Individual non-transferable digital passes are generated upon confirmation.
                </p>
              </div>

              <DialogFooter className="pt-2 flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={onClose}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:flex-1 bg-navy text-white hover:bg-navy/90 font-bold"
                  disabled={submitting}
                >
                  {submitting
                    ? "Evaluating Eligibility…"
                    : isPaid
                      ? `Proceed to Bank Transfer (${totalCost.toLocaleString()} LKR)`
                      : "Confirm Free Registration 🎟️"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Direct Bank Transfer Slip Submission Dialog */}
      {claimModalData && (
        <SubmitPaymentClaimDialog
          isOpen={Boolean(claimModalData)}
          onClose={() => {
            setClaimModalData(null);
            onClose();
          }}
          paymentId={claimModalData.paymentId}
          amount={claimModalData.amount}
          currency={claimModalData.currency}
          bankDetails={claimModalData.bankDetails}
          eventTitle={event.title}
          onClaimSubmitted={() => {
            setClaimModalData(null);
            onClose();
            onSuccess?.();
          }}
        />
      )}

      {/* Confirmed Admission Pass Modal */}
      {confirmedTicket && (
        <TicketPassModal
          isOpen={Boolean(confirmedTicket)}
          onClose={() => {
            setConfirmedTicket(null);
            onClose();
          }}
          ticket={confirmedTicket}
          eventTitle={event.title}
          organizationName={event.organizationName}
          venue={event.location}
          isGroup={regMode === "group"}
          paymentAmount={isPaid ? totalCost : undefined}
          paymentCurrency="LKR"
        />
      )}
    </>
  );
}
