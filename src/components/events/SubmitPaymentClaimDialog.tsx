import React, { useState } from "react";
import {
  Building,
  Upload,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  FileText,
  Clock,
  ShieldCheck,
  AlertTriangle,
  RotateCw,
  ExternalLink,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { participationApi } from "@/lib/api/participation";
import { cn } from "@/lib/utils";

export interface SubmitPaymentClaimDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string;
  amount: number | string;
  currency: string;
  eventTitle?: string | undefined;
  organizationName?: string | undefined;
  bankDetails?: {
    bankName?: string | null;
    bankBranch?: string | null;
    bankAccountName?: string | null;
    bankAccountNumber?: string | null;
    paymentInstructions?: string | null;
  } | null | undefined;
  customInstructions?: string | null | undefined;
  existingRejectionReason?: string | null | undefined;
  previousRejectionReason?: string | null | undefined;
  existingReference?: string | null | undefined;
  onSuccess?: () => void;
  onClaimSubmitted?: () => void;
}

export function SubmitPaymentClaimDialog({
  isOpen,
  onClose,
  paymentId,
  amount,
  currency,
  eventTitle = "Campus Event",
  organizationName = "Society / Club",
  bankDetails,
  customInstructions,
  existingRejectionReason,
  previousRejectionReason,
  existingReference,
  onSuccess,
  onClaimSubmitted,
}: SubmitPaymentClaimDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [referenceNumber, setReferenceNumber] = useState(existingReference || "");
  const [transferDate, setTransferDate] = useState(new Date().toISOString().slice(0, 10));
  const [payerNotes, setPayerNotes] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Check size (max 5MB)
    if (selected.size > 5 * 1024 * 1024) {
      toast.error("File is too large", {
        description: "Payment slip must be smaller than 5MB.",
      });
      return;
    }

    // Check type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!validTypes.includes(selected.type) && !selected.name.match(/\.(jpg|jpeg|png|webp|pdf)$/i)) {
      toast.error("Invalid file format", {
        description: "Please upload a JPEG, PNG, WEBP image or PDF document.",
      });
      return;
    }

    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Payment slip required", {
        description: "Please upload a clear photo or PDF of your bank deposit slip or transfer receipt.",
      });
      return;
    }

    if (!referenceNumber.trim()) {
      toast.error("Transaction reference required", {
        description: "Please enter the bank transaction reference or deposit slip number.",
      });
      return;
    }

    setIsUploading(true);

    try {
      // 1. Upload payment slip proof
      const uploadResult = await participationApi.uploadPaymentProof(file);
      const proofUrl = uploadResult.url;

      // 2. Submit payment claim with proof URL and reference
      await participationApi.submitDirectPaymentClaim(paymentId, {
        paymentProofUrl: proofUrl,
        referenceNumber: referenceNumber.trim(),
        transferDate: transferDate ? new Date(transferDate).toISOString() : undefined,
        payerNotes: payerNotes.trim() || undefined,
      });

      toast.success("Payment proof submitted successfully! 📋", {
        description: "An authorized financial officer will verify your bank deposit.",
      });

      setIsSubmitted(true);
      onSuccess?.();
      onClaimSubmitted?.();
    } catch (err: any) {
      toast.error("Submission failed", {
        description: err?.message || "Could not submit payment claim. Please verify reference number uniqueness.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleModalClose = () => {
    if (isSubmitted) {
      setIsSubmitted(false);
      setFile(null);
      setReferenceNumber("");
      setPayerNotes("");
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleModalClose()}>
      <DialogContent className="max-w-lg bg-card border-border shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="inline-flex items-center gap-2 text-primary mb-1">
            <Building className="size-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Direct Bank Transfer to Club
            </span>
          </div>
          <DialogTitle className="text-lg font-black">{eventTitle}</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Beneficiary Society: <span className="font-semibold text-foreground">{organizationName}</span>
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          /* Submission Complete View */
          <div className="py-6 text-center space-y-4 animate-in fade-in-50">
            <div className="grid size-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mx-auto">
              <CheckCircle2 className="size-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-foreground">
                Payment Proof Submitted Successfully
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Your deposit slip and reference number <span className="font-mono font-bold text-foreground">{referenceNumber}</span> have been queued for verification.
              </p>
            </div>

            {/* Invariant Alert */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-left space-y-1 text-xs text-amber-800 dark:text-amber-300">
              <div className="flex items-center gap-1.5 font-bold">
                <Clock className="size-4 shrink-0 text-amber-600" />
                <span>Verification in Progress</span>
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Your admission QR pass is <span className="font-semibold text-foreground">not valid</span> until an authorized financial officer confirms receipt of funds in the club bank account. You will receive an in-app confirmation once verified.
              </p>
            </div>

            <DialogFooter className="pt-2">
              <Button
                onClick={handleModalClose}
                className="w-full bg-navy text-white hover:bg-navy/90 font-bold"
              >
                Close & View Registrations
              </Button>
            </DialogFooter>
          </div>
        ) : (
          /* Submission Form */
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            {/* Amount Due Card */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Payable Amount
                </span>
                <p className="text-xl font-black text-foreground">
                  {currency} {Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 text-xs font-bold">
                Direct to Club
              </span>
            </div>

            {/* Rejection notice if resubmitting */}
            {existingRejectionReason && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-destructive">
                  <AlertTriangle className="size-4 shrink-0" />
                  <span>Previous Payment Claim Rejected</span>
                </div>
                <p className="text-xs text-foreground bg-card/60 p-2 rounded border border-destructive/20 font-medium">
                  "{existingRejectionReason}"
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Please review the reason above, upload a clearer slip or correct the transaction reference, and resubmit.
                </p>
              </div>
            )}

            {/* Club Bank Details Card */}
            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-border/80 pb-2">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Building className="size-4 text-primary" />
                  Official Club Bank Account
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Bank</span>
                  <span className="font-bold text-foreground">
                    {bankDetails?.bankName || "Bank of Ceylon"}
                  </span>
                  {bankDetails?.bankBranch && (
                    <span className="text-muted-foreground block text-[11px]">
                      Branch: {bankDetails.bankBranch}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Beneficiary Name</span>
                  <span className="font-semibold text-foreground truncate block">
                    {bankDetails?.bankAccountName || organizationName}
                  </span>
                </div>

                <div className="sm:col-span-2 rounded-lg bg-surface p-2.5 border border-border/80">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Account Number</span>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <span className="font-mono text-base font-black text-primary tracking-wider">
                      {bankDetails?.bankAccountNumber || "Pending Club Setup"}
                    </span>
                    {bankDetails?.bankAccountNumber && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(bankDetails.bankAccountNumber!, "acc")}
                        className="h-7 px-2 text-xs gap-1"
                      >
                        {copiedField === "acc" ? (
                          <Check className="size-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                        {copiedField === "acc" ? "Copied" : "Copy"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Instructions */}
              {(customInstructions || bankDetails?.paymentInstructions) && (
                <div className="pt-2 border-t border-border/60">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">
                    Payment Instructions
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed italic bg-muted/40 p-2.5 rounded-lg border border-border/60">
                    "{customInstructions || bankDetails?.paymentInstructions}"
                  </p>
                </div>
              )}
            </div>

            {/* Proof Upload Dropzone */}
            <div className="space-y-1.5">
              <Label htmlFor="slip-upload" className="text-xs font-bold text-foreground block">
                Upload Transfer Slip / Receipt *
              </Label>
              <div
                className={cn(
                  "border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors",
                  file
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : "border-border hover:border-primary/50 bg-muted/20"
                )}
                onClick={() => document.getElementById("slip-upload")?.click()}
              >
                <input
                  id="slip-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {file ? (
                  <div className="space-y-1">
                    <FileText className="size-8 text-emerald-500 mx-auto" />
                    <p className="text-xs font-bold text-foreground truncate max-w-xs mx-auto">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB · Click to change slip
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Upload className="size-7 text-muted-foreground mx-auto" />
                    <p className="text-xs font-semibold text-foreground">
                      Click or drag deposit slip here
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      JPG, PNG, WEBP or PDF (max 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bank Reference Number */}
            <div className="space-y-1.5">
              <Label htmlFor="bank-ref" className="text-xs font-bold text-foreground">
                Bank Transaction Reference / Slip Number *
              </Label>
              <Input
                id="bank-ref"
                placeholder="e.g. BOC-TXN-938210 or 004829"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                className="text-xs font-mono font-bold"
                required
              />
              <p className="text-[10px] text-muted-foreground">
                Must be unique per transaction. Used by the officer to identify your payment.
              </p>
            </div>

            {/* Transfer Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="transfer-date" className="text-xs font-bold text-foreground">
                  Transfer Date
                </Label>
                <Input
                  id="transfer-date"
                  type="date"
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                  className="text-xs"
                />
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <Label htmlFor="payer-notes" className="text-xs font-bold text-foreground">
                  Notes for Officer (Optional)
                </Label>
                <Input
                  id="payer-notes"
                  placeholder="e.g. Paid from HNB app"
                  value={payerNotes}
                  onChange={(e) => setPayerNotes(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>

            {/* Security Note */}
            <div className="rounded-lg border border-border bg-muted/30 p-2.5 flex items-center gap-2 text-[11px] text-muted-foreground">
              <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
              <span>
                Your receipt will only be viewable by authorized financial officers of {organizationName}.
              </span>
            </div>

            <DialogFooter className="pt-2 flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleModalClose}
                disabled={isUploading}
                className="w-full sm:w-auto text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUploading}
                className="w-full sm:flex-1 bg-navy text-white hover:bg-navy/90 font-bold text-xs h-9 gap-1.5"
              >
                <Upload className="size-4" />
                {isUploading ? "Uploading & Submitting…" : "Submit Payment Slip"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
