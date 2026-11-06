import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  CreditCard,
  ShieldCheck,
  ShieldAlert,
  Save,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  ExternalLink,
  Copy,
  Check,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { directoryApi } from "@/lib/api/directory";
import { RowSkeleton, ErrorState } from "@/components/common/States";
import { cn } from "@/lib/utils";

interface OrganizationBankSettingsProps {
  organizationId: string;
  organizationName: string;
  canManageFinances: boolean;
  isPlatformAdmin?: boolean;
}

const COMMON_SRI_LANKAN_BANKS = [
  "Bank of Ceylon (BOC)",
  "Commercial Bank of Ceylon",
  "Sampath Bank",
  "Hatton National Bank (HNB)",
  "People's Bank",
  "Nations Trust Bank (NTB)",
  "Seylan Bank",
  "National Development Bank (NDB)",
  "DFCC Bank",
  "Union Bank",
  "Pan Asia Bank",
  "Amana Bank",
  "Cargills Bank",
];

export function OrganizationBankSettings({
  organizationId,
  organizationName,
  canManageFinances,
  isPlatformAdmin = false,
}: OrganizationBankSettingsProps) {
  const queryClient = useQueryClient();

  const isAuthorized = isPlatformAdmin || canManageFinances;

  const { data: org, isLoading, isError, refetch } = useQuery({
    queryKey: ["organization", "details", organizationId],
    queryFn: () => directoryApi.organization(organizationId),
    enabled: Boolean(organizationId),
  });

  const [bankName, setBankName] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [paymentInstructions, setPaymentInstructions] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (org) {
      setBankName(org.bankName || "");
      setBankBranch(org.bankBranch || "");
      setBankAccountName(org.bankAccountName || "");
      setBankAccountNumber(org.bankAccountNumber || "");
      setPaymentInstructions(org.paymentInstructions || "");
    }
  }, [org]);

  const updateMutation = useMutation({
    mutationFn: (data: {
      bankName: string;
      bankBranch: string;
      bankAccountName: string;
      bankAccountNumber: string;
      paymentInstructions: string;
    }) =>
      directoryApi.updateOrganizationPaymentInstructions(organizationId, data),
    onSuccess: () => {
      toast.success("Bank payment instructions updated successfully! 🏦", {
        description: "Students paying via Direct Club Transfer will now see these updated account details.",
      });
      queryClient.invalidateQueries({ queryKey: ["organization", "details", organizationId] });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["myOrganizations"] });
    },
    onError: (err: any) => {
      toast.error("Failed to update bank details", {
        description: err?.message || "Please check your network connection and permissions.",
      });
    },
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthorized) {
      toast.error("Unauthorized", {
        description: "Only authorized committee financial officers may modify club bank details.",
      });
      return;
    }

    if (bankAccountNumber.trim() && !bankName.trim()) {
      toast.error("Please enter the bank name for this account.");
      return;
    }

    if (bankAccountNumber.trim() && !bankAccountName.trim()) {
      toast.error("Please enter the account holder name.");
      return;
    }

    updateMutation.mutate({
      bankName: bankName.trim(),
      bankBranch: bankBranch.trim(),
      bankAccountName: bankAccountName.trim(),
      bankAccountNumber: bankAccountNumber.trim(),
      paymentInstructions: paymentInstructions.trim(),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4 p-6 bg-card rounded-xl border border-border">
        <RowSkeleton />
        <RowSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        message="Could not load society bank details. We encountered an issue loading financial configuration."
        onRetry={() => { void refetch(); }}
      />
    );
  }

  const hasConfiguredAccount = Boolean(bankAccountNumber && bankName);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
              <Building2 className="size-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-foreground">
                  Society Direct Bank Account & Transfer Settings
                </h3>
                {hasConfiguredAccount ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="size-3" /> Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    <AlertCircle className="size-3" /> Unconfigured
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-2xl">
                Configure the official bank account for <span className="font-semibold text-foreground">{organizationName}</span>.
                When paid events enable Direct Bank Transfer to Club, students will transfer money directly to this account and upload their transfer slip for committee verification.
              </p>
            </div>
          </div>

          {!isAuthorized && (
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-2.5 text-xs text-amber-700 dark:text-amber-400 flex items-center gap-2 shrink-0">
              <Lock className="size-4 shrink-0" />
              <span>Read-only: Financial permission required</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Form */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
          <div className="border-b border-border pb-3">
            <h4 className="text-sm font-bold text-foreground">Official Bank Details</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              These details are presented to students during the direct transfer payment step.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Bank Name */}
            <div className="space-y-1.5">
              <Label htmlFor="bank-name" className="text-xs font-bold text-foreground">
                Bank Name *
              </Label>
              <Input
                id="bank-name"
                list="bank-list"
                placeholder="e.g. Bank of Ceylon (BOC) or Commercial Bank"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                disabled={!isAuthorized || updateMutation.isPending}
                className="text-xs"
              />
              <datalist id="bank-list">
                {COMMON_SRI_LANKAN_BANKS.map((b) => (
                  <option key={b} value={b} />
                ))}
              </datalist>
            </div>

            {/* Branch Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="bank-branch" className="text-xs font-bold text-foreground">
                  Branch Name / City
                </Label>
                <Input
                  id="bank-branch"
                  placeholder="e.g. Malabe Branch, Moratuwa"
                  value={bankBranch}
                  onChange={(e) => setBankBranch(e.target.value)}
                  disabled={!isAuthorized || updateMutation.isPending}
                  className="text-xs"
                />
              </div>

              {/* Account Number */}
              <div className="space-y-1.5">
                <Label htmlFor="bank-account-num" className="text-xs font-bold text-foreground">
                  Account Number *
                </Label>
                <Input
                  id="bank-account-num"
                  placeholder="e.g. 100293847561"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  disabled={!isAuthorized || updateMutation.isPending}
                  className="text-xs font-mono font-bold"
                />
              </div>
            </div>

            {/* Account Holder Name */}
            <div className="space-y-1.5">
              <Label htmlFor="bank-account-name" className="text-xs font-bold text-foreground">
                Account Holder / Beneficiary Name *
              </Label>
              <Input
                id="bank-account-name"
                placeholder="e.g. IEEE Student Branch of SLIIT"
                value={bankAccountName}
                onChange={(e) => setBankAccountName(e.target.value)}
                disabled={!isAuthorized || updateMutation.isPending}
                className="text-xs"
              />
              <p className="text-[11px] text-muted-foreground">
                Must match the official account name registered with the bank.
              </p>
            </div>

            {/* Payment Instructions */}
            <div className="space-y-1.5 pt-2 border-t border-border/60">
              <Label htmlFor="payment-instructions" className="text-xs font-bold text-foreground">
                General Transfer Instructions for Students
              </Label>
              <Textarea
                id="payment-instructions"
                placeholder="e.g. Please transfer via online banking or deposit at any branch counter. Always put your Student Registration Number in the transaction remarks and upload the deposit slip here."
                value={paymentInstructions}
                onChange={(e) => setPaymentInstructions(e.target.value)}
                disabled={!isAuthorized || updateMutation.isPending}
                rows={3}
                className="text-xs leading-relaxed"
              />
              <p className="text-[11px] text-muted-foreground">
                Displayed to students alongside account details on every event using Direct Bank Transfer.
              </p>
            </div>

            {isAuthorized && (
              <div className="pt-3 flex justify-end">
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="bg-navy text-white hover:bg-navy/90 font-bold gap-1.5 text-xs h-9 px-5"
                >
                  <Save className="size-4" />
                  {updateMutation.isPending ? "Saving Bank Details…" : "Save Bank Instructions"}
                </Button>
              </div>
            )}
          </form>
        </div>

        {/* Live Preview Card */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <CreditCard className="size-4 text-primary" />
              <span>Student Checkout Preview</span>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-primary/10 pb-2">
                <span className="text-[11px] font-bold text-primary uppercase">Direct Bank Transfer</span>
                <span className="text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded">
                  Official Account
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Bank
                  </span>
                  <span className="font-bold text-foreground">
                    {bankName || "Bank of Ceylon"} {bankBranch ? `(${bankBranch})` : ""}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Account Name
                  </span>
                  <span className="font-semibold text-foreground">
                    {bankAccountName || organizationName}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Account Number
                  </span>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <span className="font-mono text-sm font-black text-foreground tracking-wider">
                      {bankAccountNumber || "000000000000"}
                    </span>
                    {bankAccountNumber && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(bankAccountNumber, "acc")}
                        className="h-6 px-1.5 text-[10px] gap-1"
                      >
                        {copiedField === "acc" ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                        {copiedField === "acc" ? "Copied" : "Copy"}
                      </Button>
                    )}
                  </div>
                </div>

                {paymentInstructions && (
                  <div className="pt-2 border-t border-primary/10">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">
                      Instructions
                    </span>
                    <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                      "{paymentInstructions}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Verification Security Notice */}
            <div className="rounded-lg border border-border bg-muted/40 p-3 space-y-1.5 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1.5 font-bold text-foreground text-xs">
                <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
                <span>Financial Officer Verification</span>
              </div>
              <p>
                Money is deposited directly into your club account. CampusPulse does not deduct fees or hold funds. Your authorized officers must check bank statements and approve the student's admission ticket in the Verification Queue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
