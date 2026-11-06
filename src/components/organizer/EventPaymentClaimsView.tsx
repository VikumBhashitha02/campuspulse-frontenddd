import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Building,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Search,
  Eye,
  Copy,
  Check,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrgAvatar } from "@/components/common/Badges";
import { formatDate, formatDateTime } from "@/lib/format";
import { participationApi } from "@/lib/api/participation";
import { cn } from "@/lib/utils";
import type { PaymentClaimItem } from "@/lib/types";

interface EventPaymentClaimsViewProps {
  eventId: string;
  eventTitle: string;
  onClaimProcessed?: () => void;
}

export function EventPaymentClaimsView({
  eventId,
  eventTitle,
  onClaimProcessed,
}: EventPaymentClaimsViewProps) {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PROCESSING" | "PAID" | "FAILED">("ALL");
  const [search, setSearch] = useState("");
  const [selectedProofUrl, setSelectedProofUrl] = useState<string | null>(null);

  // Confirm claim modal state
  const [confirmingClaim, setConfirmingClaim] = useState<PaymentClaimItem | null>(null);
  const [confirmNotes, setConfirmNotes] = useState("");

  // Reject claim modal state
  const [rejectingClaim, setRejectingClaim] = useState<PaymentClaimItem | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  // Copy helper state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const claimsQuery = useQuery({
    queryKey: ["payments", "claims", eventId, statusFilter],
    queryFn: () =>
      participationApi.getEventPaymentClaims({
        eventId,
        status: statusFilter === "ALL" ? undefined : statusFilter,
      }),
  });

  const claims: PaymentClaimItem[] = Array.isArray(claimsQuery.data) ? claimsQuery.data : [];

  const stats = useMemo(() => {
    let pending = 0;
    let confirmed = 0;
    let rejected = 0;

    for (const c of claims) {
      if (c.status === "PROCESSING" || c.status === "PENDING") pending++;
      else if (c.status === "PAID") confirmed++;
      else if (c.status === "FAILED") rejected++;
    }

    return { total: claims.length, pending, confirmed, rejected };
  }, [claims]);

  const filteredClaims = useMemo(() => {
    return claims.filter((c) => {
      if (!c) return false;
      if (statusFilter === "PROCESSING" && c.status !== "PROCESSING" && c.status !== "PENDING") {
        return false;
      }
      if (statusFilter === "PAID" && c.status !== "PAID") return false;
      if (statusFilter === "FAILED" && c.status !== "FAILED") return false;

      if (search.trim()) {
        const s = search.toLowerCase();
        const payerName = c.payer?.name?.toLowerCase() || "";
        const payerEmail = c.payer?.email?.toLowerCase() || "";
        const ref = (c.referenceNumber || c.providerPaymentId || "").toLowerCase();
        return payerName.includes(s) || payerEmail.includes(s) || ref.includes(s);
      }
      return true;
    });
  }, [claims, statusFilter, search]);

  const verifyMutation = useMutation({
    mutationFn: ({ paymentId, notes }: { paymentId: string; notes?: string | undefined }) =>
      participationApi.verifyPaymentClaim(paymentId, notes),
    onSuccess: () => {
      toast.success("Payment verified & admission pass issued! 💳", {
        description: "The student registration is now CONFIRMED and entry QR ticket is active.",
      });
      setConfirmingClaim(null);
      setConfirmNotes("");
      void queryClient.invalidateQueries({ queryKey: ["payments", "claims"] });
      void queryClient.invalidateQueries({ queryKey: ["events", "participants", eventId] });
      void queryClient.invalidateQueries({ queryKey: ["events", "manage", eventId] });
      void queryClient.invalidateQueries({ queryKey: ["registrations"] });
      void queryClient.invalidateQueries({ queryKey: ["payments"] });
      onClaimProcessed?.();
    },
    onError: (err: any) => {
      const status = err?.status || err?.statusCode;
      if (status === 403) {
        toast.error("Permission Denied", {
          description: "You do not have financial officer permissions to verify bank payments for this society.",
        });
      } else if (status === 409) {
        toast.error("Action Conflict", {
          description: "This payment claim has already been processed or updated.",
        });
        void claimsQuery.refetch();
      } else {
        toast.error("Failed to verify payment", {
          description: err?.message || "Could not confirm payment claim.",
        });
      }
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ paymentId, reason }: { paymentId: string; reason: string }) =>
      participationApi.rejectPaymentClaim(paymentId, reason),
    onSuccess: () => {
      toast.info("Payment claim rejected", {
        description: "The student will be notified with your feedback and can resubmit a corrected slip.",
      });
      setRejectingClaim(null);
      setRejectReason("");
      void queryClient.invalidateQueries({ queryKey: ["payments", "claims"] });
      void queryClient.invalidateQueries({ queryKey: ["events", "participants", eventId] });
      void queryClient.invalidateQueries({ queryKey: ["registrations"] });
      onClaimProcessed?.();
    },
    onError: (err: any) => {
      const status = err?.status || err?.statusCode;
      if (status === 403) {
        toast.error("Permission Denied", {
          description: "You do not have financial officer permissions to reject bank payments for this society.",
        });
      } else if (status === 409) {
        toast.error("Action Conflict", {
          description: "This payment claim has already been processed.",
        });
        void claimsQuery.refetch();
      } else {
        toast.error("Failed to reject payment claim", {
          description: err?.message || "Could not reject claim.",
        });
      }
    },
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Reference copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-border bg-card p-3.5">
          <span className="text-[11px] font-bold uppercase text-muted-foreground block">
            Total Claims
          </span>
          <p className="text-xl font-black text-foreground mt-0.5">{stats.total}</p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5">
          <span className="text-[11px] font-bold uppercase text-amber-700 dark:text-amber-300 block">
            Pending Officer Check
          </span>
          <p className="text-xl font-black text-amber-700 dark:text-amber-300 mt-0.5">
            {stats.pending}
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5">
          <span className="text-[11px] font-bold uppercase text-emerald-700 dark:text-emerald-300 block">
            Confirmed & Issued
          </span>
          <p className="text-xl font-black text-emerald-700 dark:text-emerald-300 mt-0.5">
            {stats.confirmed}
          </p>
        </div>
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3.5">
          <span className="text-[11px] font-bold uppercase text-rose-700 dark:text-rose-300 block">
            Rejected
          </span>
          <p className="text-xl font-black text-rose-700 dark:text-rose-300 mt-0.5">
            {stats.rejected}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card p-3 rounded-xl border border-border">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setStatusFilter("ALL")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
              statusFilter === "ALL"
                ? "bg-navy text-white shadow-xs"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            All ({stats.total})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("PROCESSING")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
              statusFilter === "PROCESSING"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <Clock className="size-3" />
            Pending Check ({stats.pending})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("PAID")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
              statusFilter === "PAID"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <CheckCircle2 className="size-3" />
            Confirmed ({stats.confirmed})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("FAILED")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
              statusFilter === "FAILED"
                ? "bg-rose-600 text-white shadow-xs"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <XCircle className="size-3" />
            Rejected ({stats.rejected})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search student or ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 text-xs h-8"
          />
        </div>
      </div>

      {/* Claims List Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border bg-muted/40 text-[11px] font-bold uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Student / Payer</th>
              <th className="px-4 py-3">Amount Due</th>
              <th className="px-4 py-3">Bank Reference</th>
              <th className="px-4 py-3">Deposit Slip</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3 text-right">Verification Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {claimsQuery.isLoading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                  Loading direct bank transfer claims...
                </td>
              </tr>
            ) : claimsQuery.isError ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-rose-500 font-semibold">
                  Failed to load payment claims. You may not have treasurer permissions for this society.
                </td>
              </tr>
            ) : filteredClaims.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                  No payment claims found for this filter.
                </td>
              </tr>
            ) : (
              filteredClaims.map((claim) => {
                const payer = claim.payer;
                const isPendingCheck = claim.status === "PROCESSING" || claim.status === "PENDING";
                const isConfirmed = claim.status === "PAID";
                const isRejected = claim.status === "FAILED";
                const ref = claim.referenceNumber || claim.providerPaymentId || "—";
                const uniName = payer?.university?.name || (payer?.studentProfile as any)?.university?.name || payer?.studentProfile?.faculty?.name || "Independent Attendee";
                const hasProof = Boolean(claim.paymentProofUrl);

                return (
                  <tr key={claim.id} className="hover:bg-muted/20 transition-colors">
                    {/* Student Identity */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <OrgAvatar
                          initials={payer?.name ? payer.name.slice(0, 2).toUpperCase() : "ST"}
                          className="size-8 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-foreground truncate max-w-[170px]">
                            {payer?.name || "Student Delegate"}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate max-w-[170px]">
                            {payer?.email}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate max-w-[170px]">
                            {uniName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-3.5 font-mono font-bold text-foreground">
                      {claim.currency || "LKR"}{" "}
                      {(Number(claim.amount) || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>

                    {/* Bank Reference */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-semibold text-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/70 truncate max-w-[130px]">
                          {ref}
                        </span>
                        {ref !== "—" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => handleCopy(ref, claim.id)}
                            title="Copy Reference"
                          >
                            {copiedId === claim.id ? (
                              <Check className="size-3 text-emerald-500" />
                            ) : (
                              <Copy className="size-3" />
                            )}
                          </Button>
                        )}
                      </div>
                      {claim.transferDate && (
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          Paid on {formatDate(claim.transferDate)}
                        </p>
                      )}
                      {claim.payerNotes && (
                        <p className="text-[10px] text-muted-foreground italic mt-0.5 truncate max-w-[140px]" title={claim.payerNotes}>
                          "{claim.payerNotes}"
                        </p>
                      )}
                    </td>

                    {/* Deposit Slip */}
                    <td className="px-4 py-3.5">
                      {hasProof ? (
                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-[11px] gap-1 px-2 border-border/80"
                            onClick={() => setSelectedProofUrl(claim.paymentProofUrl!)}
                          >
                            <Eye className="size-3 text-primary" />
                            View Slip
                          </Button>
                          <a
                            href={claim.paymentProofUrl!}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-foreground p-1"
                            title="Open in new window"
                          >
                            <ExternalLink className="size-3" />
                          </a>
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted-foreground italic">No slip</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                          isConfirmed &&
                            "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30",
                          isPendingCheck &&
                            "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30",
                          isRejected &&
                            "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30"
                        )}
                      >
                        {isConfirmed && <CheckCircle2 className="size-3" />}
                        {isPendingCheck && <Clock className="size-3" />}
                        {isRejected && <XCircle className="size-3" />}
                        {isPendingCheck ? "Awaiting Check" : claim.status}
                      </span>
                      {claim.verifiedBy?.name && (
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          by {claim.verifiedBy.name}
                        </p>
                      )}
                      {claim.rejectionReason && isRejected && (
                        <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-0.5 truncate max-w-[130px]" title={claim.rejectionReason}>
                          Reason: {claim.rejectionReason}
                        </p>
                      )}
                    </td>

                    {/* Submitted Date */}
                    <td className="px-4 py-3.5 text-muted-foreground">
                      {formatDate(claim.createdAt)}
                    </td>

                    {/* Verification Actions */}
                    <td className="px-4 py-3.5 text-right">
                      {isPendingCheck ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            className="h-7 text-xs px-2.5 font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
                            onClick={() => setConfirmingClaim(claim)}
                            disabled={verifyMutation.isPending || rejectMutation.isPending}
                          >
                            <CheckCircle2 className="size-3 mr-1" />
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs px-2 font-bold text-destructive hover:bg-destructive/10 border-destructive/30"
                            onClick={() => setRejectingClaim(claim)}
                            disabled={verifyMutation.isPending || rejectMutation.isPending}
                          >
                            <XCircle className="size-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      ) : isConfirmed ? (
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          Pass Activated ✓
                        </span>
                      ) : (
                        <span className="text-[11px] text-muted-foreground">Rejected</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Proof Slip Preview Dialog */}
      {selectedProofUrl && (
        <Dialog open={Boolean(selectedProofUrl)} onOpenChange={(open) => !open && setSelectedProofUrl(null)}>
          <DialogContent className="max-w-xl bg-card border-border">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-sm font-bold">
                <FileText className="size-4 text-primary" />
                Uploaded Bank Deposit Slip
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Inspect transfer receipt details to verify date, amount, and reference.
              </DialogDescription>
            </DialogHeader>

            <div className="my-2 max-h-[70vh] overflow-auto rounded-lg border border-border bg-muted/20 p-2 flex items-center justify-center">
              {selectedProofUrl.endsWith(".pdf") ? (
                <div className="p-8 text-center space-y-3">
                  <FileText className="size-12 mx-auto text-muted-foreground" />
                  <p className="text-xs font-semibold text-foreground">PDF Receipt Document</p>
                  <Button asChild size="sm" variant="outline">
                    <a href={selectedProofUrl} target="_blank" rel="noreferrer" className="gap-1.5">
                      <ExternalLink className="size-3.5" />
                      Open PDF in New Window
                    </a>
                  </Button>
                </div>
              ) : (
                <img
                  src={selectedProofUrl}
                  alt="Bank transfer proof slip"
                  className="max-h-[60vh] max-w-full rounded object-contain"
                />
              )}
            </div>

            <DialogFooter className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={selectedProofUrl} target="_blank" rel="noreferrer" className="gap-1.5">
                  <ExternalLink className="size-3.5" />
                  Open Full Resolution
                </a>
              </Button>
              <Button size="sm" onClick={() => setSelectedProofUrl(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirm Payment Dialog */}
      {confirmingClaim && (
        <Dialog open={Boolean(confirmingClaim)} onOpenChange={(open) => !open && setConfirmingClaim(null)}>
          <DialogContent className="max-w-md bg-card border-border">
            <DialogHeader>
              <div className="inline-flex items-center gap-1.5 text-emerald-600 mb-1">
                <ShieldCheck className="size-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Financial Reconciliation Confirmation
                </span>
              </div>
              <DialogTitle className="text-base font-bold">
                Confirm Bank Transfer for {confirmingClaim.payer?.name}?
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                You are verifying that the club bank account has received{" "}
                <strong className="text-foreground">
                  {confirmingClaim.currency} {Number(confirmingClaim.amount).toLocaleString()}
                </strong>{" "}
                under reference{" "}
                <code className="font-mono text-foreground font-semibold">
                  {confirmingClaim.referenceNumber || confirmingClaim.providerPaymentId || "N/A"}
                </code>.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs">
              <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-3 flex items-start gap-2.5 text-amber-800 dark:text-amber-200">
                <AlertTriangle className="size-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Responsibility Notice:</strong> Confirming this transaction immediately updates the student's registration status to <strong>CONFIRMED</strong>, produces their official digital receipt, and generates their admission QR ticket token.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="verificationNotes" className="text-xs font-semibold">
                  Reconciliation Notes (Optional)
                </Label>
                <Input
                  id="verificationNotes"
                  placeholder="e.g. Bank statement line item #5411 verified on 2026-10-27"
                  value={confirmNotes}
                  onChange={(e) => setConfirmNotes(e.target.value)}
                  className="text-xs h-9"
                />
              </div>
            </div>

            <DialogFooter className="flex flex-row gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setConfirmingClaim(null)}
                disabled={verifyMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 font-bold"
                onClick={() =>
                  verifyMutation.mutate({
                    paymentId: confirmingClaim.id,
                    notes: confirmNotes.trim() || undefined,
                  })
                }
                disabled={verifyMutation.isPending}
              >
                {verifyMutation.isPending ? "Confirming..." : "Confirm & Issue Pass 🎟️"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reject Payment Dialog */}
      {rejectingClaim && (
        <Dialog open={Boolean(rejectingClaim)} onOpenChange={(open) => !open && setRejectingClaim(null)}>
          <DialogContent className="max-w-md bg-card border-border">
            <DialogHeader>
              <div className="inline-flex items-center gap-1.5 text-destructive mb-1">
                <XCircle className="size-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Payment Claim Rejection
                </span>
              </div>
              <DialogTitle className="text-base font-bold">
                Reject Bank Transfer Proof?
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Rejecting this proof will notify{" "}
                <strong className="text-foreground">{rejectingClaim.payer?.name}</strong> with your explanation. The student can correct the reference or upload a replacement receipt.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="rejectionReason" className="text-xs font-bold text-destructive">
                  Mandatory Rejection Reason *
                </Label>
                <Textarea
                  id="rejectionReason"
                  placeholder="e.g. Reference number not found in our bank statement. Please verify and upload the authentic transaction receipt."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="text-xs min-h-[80px]"
                />
                <p className="text-[10px] text-muted-foreground">
                  Minimum 5 characters. This explanation will be displayed to the student on their registrations dashboard.
                </p>
              </div>
            </div>

            <DialogFooter className="flex flex-row gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setRejectingClaim(null)}
                disabled={rejectMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1 font-bold"
                onClick={() =>
                  rejectMutation.mutate({
                    paymentId: rejectingClaim.id,
                    reason: rejectReason.trim(),
                  })
                }
                disabled={rejectMutation.isPending || rejectReason.trim().length < 5}
              >
                {rejectMutation.isPending ? "Rejecting..." : "Reject Claim"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
