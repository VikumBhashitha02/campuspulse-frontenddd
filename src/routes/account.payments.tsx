import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreditCard,
  Receipt,
  Calendar,
  Building,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Printer,
  Download,
  ShieldCheck,
  RotateCcw,
  Search,
  ExternalLink,
  Sparkles,
  Info,
  RefreshCw,
} from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmptyState, ErrorState, PageHeader, RowSkeleton } from "@/components/common/States";
import { formatDate, formatDateTime } from "@/lib/format";
import { participationApi } from "@/lib/api/participation";
import { cn } from "@/lib/utils";
import type { PaymentRecord } from "@/lib/types";

export const Route = createFileRoute("/account/payments")({
  head: () => ({
    meta: [
      { title: "Payments & Transactions — CampusPulse" },
      {
        name: "description",
        content: "View your verified payment transactions, registration invoices, and authoritative digital receipts for CampusPulse events.",
      },
      { property: "og:title", content: "Payments & Transactions — CampusPulse" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PaymentsPage,
});

function PaymentsPage() {
  const queryClient = useQueryClient();
  const [selectedReceiptPayment, setSelectedReceiptPayment] = useState<PaymentRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PAID" | "PENDING" | "REFUNDED">("ALL");

  const query = useQuery({
    queryKey: ["payments", "my-all"],
    queryFn: async () => {
      const data = await participationApi.getMyPayments();
      return Array.isArray(data) ? data : [];
    },
  });

  // Sandbox simulation mutation for testing pending transactions
  const simulateMutation = useMutation({
    mutationFn: (paymentId: string) => participationApi.simulateSandboxPayment(paymentId),
    onSuccess: () => {
      toast.success("Payment verified and completed in sandbox mode!", {
        description: "Your tickets and official digital receipt are now available.",
      });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Could not simulate payment. Please try again.");
    },
  });

  const payments = Array.isArray(query.data) ? query.data : [];

  // Derived statistics (calculated from actual authenticated user data)
  const stats = useMemo(() => {
    let totalPaid = 0;
    let currency = "LKR";
    let paidCount = 0;
    let pendingCount = 0;
    let refundedCount = 0;

    for (const p of payments) {
      if (!p) continue;
      const amt = Number(p.amount) || 0;
      if (p.status === "PAID") {
        totalPaid += amt;
        paidCount++;
        if (p.currency) currency = p.currency;
      } else if (p.status === "PENDING") {
        pendingCount++;
      } else if (p.status === "REFUNDED") {
        refundedCount++;
      }
    }

    return {
      totalPaid,
      currency,
      paidCount,
      pendingCount,
      refundedCount,
      totalCount: payments.length,
    };
  }, [payments]);

  // Filtered payment list
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      if (!p) return false;
      // Status filter
      if (statusFilter !== "ALL" && p.status !== statusFilter) {
        return false;
      }
      // Search term
      if (searchQuery.trim()) {
        const term = searchQuery.toLowerCase().trim();
        const eventTitle = (p.event?.title || "").toLowerCase();
        const orgName = (p.event?.organization?.name || "").toLowerCase();
        const refId = (p.providerPaymentId || "").toLowerCase();
        const id = (p.id || "").toLowerCase();
        const receiptNo = (p.receipt?.receiptNumber || "").toLowerCase();
        return (
          eventTitle.includes(term) ||
          orgName.includes(term) ||
          refId.includes(term) ||
          id.includes(term) ||
          receiptNo.includes(term)
        );
      }
      return true;
    });
  }, [payments, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Payments & Transactions"
          description="View your verified payment transactions, registration invoices, and authoritative digital receipts."
        />
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/25 px-3 py-1 text-xs font-semibold text-primary">
            <ShieldCheck className="size-3.5" />
            Verified Ledger
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => query.refetch()}
            disabled={query.isFetching}
            className="h-8 gap-1.5 text-xs cursor-pointer"
          >
            <RefreshCw className={cn("size-3.5", query.isFetching && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* Total Paid */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Total Paid</span>
            <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:text-emerald-400">
              <CreditCard className="size-4" />
            </div>
          </div>
          <p className="mt-2 font-mono text-xl font-bold tracking-tight text-foreground">
            {stats.currency} {stats.totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">{stats.paidCount} successful transaction{stats.paidCount === 1 ? "" : "s"}</p>
        </div>

        {/* Completed */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Completed</span>
            <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-4" />
            </div>
          </div>
          <p className="mt-2 font-mono text-xl font-bold tracking-tight text-foreground">
            {stats.paidCount}
          </p>
          <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Tickets issued</p>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Pending</span>
            <div className="rounded-lg bg-amber-500/10 p-1.5 text-amber-600 dark:text-amber-400">
              <Clock className="size-4" />
            </div>
          </div>
          <p className="mt-2 font-mono text-xl font-bold tracking-tight text-foreground">
            {stats.pendingCount}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">Awaiting payment</p>
        </div>

        {/* Refunded */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Refunded</span>
            <div className="rounded-lg bg-purple-500/10 p-1.5 text-purple-600 dark:text-purple-400">
              <RotateCcw className="size-4" />
            </div>
          </div>
          <p className="mt-2 font-mono text-xl font-bold tracking-tight text-foreground">
            {stats.refundedCount}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">Processed refunds</p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by event, organizer, or reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        <Tabs
          value={statusFilter}
          onValueChange={(val) => setStatusFilter(val as any)}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid grid-cols-4 h-9 bg-muted/60 p-1 rounded-lg">
            <TabsTrigger value="ALL" className="text-xs">
              All ({payments.length})
            </TabsTrigger>
            <TabsTrigger value="PAID" className="text-xs">
              Paid ({stats.paidCount})
            </TabsTrigger>
            <TabsTrigger value="PENDING" className="text-xs">
              Pending ({stats.pendingCount})
            </TabsTrigger>
            <TabsTrigger value="REFUNDED" className="text-xs">
              Refunded ({stats.refundedCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content Area */}
      {query.isLoading ? (
        <div className="space-y-3">
          <RowSkeleton />
          <RowSkeleton />
          <RowSkeleton />
        </div>
      ) : query.isError ? (
        <ErrorState
          message="We encountered an issue fetching your payment transactions. Please try again."
          onRetry={() => { void query.refetch(); }}
        />
      ) : payments.length === 0 ? (
        <EmptyState
          icon={<CreditCard className="size-6" />}
          title="No payments found"
          description="You haven't made any transactions yet. When you register for paid hackathons, conferences, or ticketed university events, your receipts and transaction ledger will appear here."
          action={
            <Button asChild size="sm" className="bg-primary text-primary-foreground">
              <Link to="/explore">Explore Events</Link>
            </Button>
          }
        />
      ) : filteredPayments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-sm font-semibold text-foreground">No matching transactions</p>
          <p className="mt-1 text-xs text-muted-foreground">
            No payments match your current search or filter criteria.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("ALL");
            }}
            className="mt-4 text-xs"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 sm:px-6">Opportunity / Event</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Provider & Reference</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right sm:px-6">Receipt / Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredPayments.map((p) => {
                    const isPaid = p.status === "PAID";
                    const isRefunded = p.status === "REFUNDED";
                    const isPending = p.status === "PENDING";
                    const isProcessing = p.status === "PROCESSING";
                    const isFailed = p.status === "FAILED";
                    const isClubTransfer = p.provider === "CLUB_TRANSFER";
                    const amountNum = Number(p.amount) || 0;

                    return (
                      <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                        {/* Event Title & Organizer */}
                        <td className="px-4 py-4 sm:px-6">
                          <div className="min-w-0 max-w-xs">
                            {p.event?.slug ? (
                              <Link
                                to="/events/$slug"
                                params={{ slug: p.event.slug }}
                                className="font-semibold text-foreground hover:text-primary transition-colors truncate block"
                              >
                                {p.event.title || "Campus Event"}
                              </Link>
                            ) : (
                              <p className="font-semibold text-foreground truncate">
                                {p.event?.title || "Campus Event"}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground truncate">
                              {p.event?.organization?.name || "CampusPulse Organizer"}
                            </p>
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="px-4 py-4 font-mono font-semibold text-foreground">
                          {p.currency || "LKR"}{" "}
                          {amountNum.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>

                        {/* Provider & Ref */}
                        <td className="px-4 py-4">
                          <span className={cn(
                            "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-semibold",
                            isClubTransfer
                              ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25"
                              : "bg-muted/80 text-foreground border-border/60"
                          )}>
                            {isClubTransfer ? (
                              <>
                                <Building className="size-3 text-amber-500" />
                                Club Transfer
                              </>
                            ) : (
                              p.provider || "GATEWAY_SANDBOX"
                            )}
                          </span>
                          {(p.referenceNumber || p.providerPaymentId) && (
                            <p className="font-mono text-[11px] text-muted-foreground mt-0.5 truncate max-w-[150px]">
                              Ref: {p.referenceNumber || p.providerPaymentId}
                            </p>
                          )}
                          {p.paymentProofUrl && (
                            <a
                              href={p.paymentProofUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline mt-0.5 block"
                            >
                              <ExternalLink className="size-3" />
                              View Slip
                            </a>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border",
                              isPaid &&
                                "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
                              isRefunded &&
                                "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
                              (isProcessing || (isClubTransfer && isPending && p.paymentProofUrl)) &&
                                "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
                              isPending && (!isClubTransfer || !p.paymentProofUrl) &&
                                "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
                              isFailed &&
                                "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
                            )}
                          >
                            {isPaid && <CheckCircle2 className="size-3" />}
                            {(isProcessing || (isClubTransfer && isPending && p.paymentProofUrl)) && <Clock className="size-3" />}
                            {isPending && (!isClubTransfer || !p.paymentProofUrl) && <Clock className="size-3" />}
                            {isRefunded && <RotateCcw className="size-3" />}
                            {isFailed && <AlertCircle className="size-3" />}
                            {isPaid
                              ? isClubTransfer ? "Verified" : "Paid"
                              : isProcessing || (isClubTransfer && isPending && p.paymentProofUrl)
                                ? "Awaiting Verification"
                                : isFailed
                                  ? "Rejected"
                                  : p.status}
                          </span>
                          {isFailed && p.rejectionReason && (
                            <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-1 max-w-[150px] truncate" title={p.rejectionReason}>
                              {p.rejectionReason}
                            </p>
                          )}
                        </td>

                        {/* Date */}
                        <td className="px-4 py-4 text-xs text-muted-foreground">
                          {formatDate(p.paidAt || p.createdAt)}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4 text-right sm:px-6">
                          <div className="flex items-center justify-end gap-2">
                            {isPaid ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 gap-1.5 text-xs border-border cursor-pointer"
                                onClick={() => setSelectedReceiptPayment(p)}
                              >
                                <Receipt className="size-3.5 text-primary" />
                                View Receipt
                              </Button>
                            ) : isClubTransfer && (isProcessing || (isPending && p.paymentProofUrl)) ? (
                              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Under Review</span>
                            ) : isClubTransfer && isPending && !p.paymentProofUrl ? (
                              <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Proof Required</span>
                            ) : isPending && !isClubTransfer ? (
                              <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Payment Pending</span>
                            ) : isFailed ? (
                              <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">Rejected</span>
                            ) : (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Digital Receipt Modal with Print Layout */}
      {selectedReceiptPayment && (
        <Dialog
          open={Boolean(selectedReceiptPayment)}
          onOpenChange={(open) => !open && setSelectedReceiptPayment(null)}
        >
          <DialogContent className="max-w-lg p-0 overflow-hidden bg-card border-border shadow-2xl">
            {/* Printable Receipt Container */}
            <div id="printable-receipt-area" className="flex flex-col">
              {/* Receipt Header Banner */}
              <div className="bg-gradient-to-br from-navy via-slate-900 to-indigo-950 p-6 text-white text-center border-b border-indigo-900/50">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30 mb-2">
                  <ShieldCheck className="size-3.5" />
                  VERIFIED PAYMENT RECEIPT
                </div>
                <h3 className="text-xl font-black tracking-tight">CampusPulse Digital Receipt</h3>
                <p className="mt-1 text-xs text-slate-300 font-mono">
                  {selectedReceiptPayment.receipt?.receiptNumber ||
                    `CP-RCP-${(selectedReceiptPayment.id || "").slice(0, 8).toUpperCase()}`}
                </p>
              </div>

              {/* Receipt Content Body */}
              <div className="p-6 space-y-5 text-xs">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <div>
                    <span className="text-muted-foreground text-[11px] block">Issued To</span>
                    <p className="font-bold text-foreground text-sm">
                      {selectedReceiptPayment.payer?.name || "Student Attendee"}
                    </p>
                    <p className="text-muted-foreground text-xs">{selectedReceiptPayment.payer?.email || "—"}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground text-[11px] block">Payment Date</span>
                    <p className="font-semibold text-foreground">
                      {formatDateTime(selectedReceiptPayment.paidAt || selectedReceiptPayment.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Event / Opportunity Details */}
                <div className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-2.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Opportunity / Event
                      </span>
                      <p className="font-bold text-sm text-foreground leading-snug">
                        {selectedReceiptPayment.event?.title || "Campus Event"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Organized by {selectedReceiptPayment.event?.organization?.name || "Campus Organizer"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/60 flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Payment Provider</span>
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      {selectedReceiptPayment.provider === "CLUB_TRANSFER" ? (
                        <>
                          <Building className="size-3 text-amber-500" />
                          Direct Bank Transfer (Club)
                        </>
                      ) : (
                        selectedReceiptPayment.provider || "GATEWAY_SANDBOX"
                      )}
                    </span>
                  </div>

                  {(selectedReceiptPayment.referenceNumber || selectedReceiptPayment.providerPaymentId) && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">
                        {selectedReceiptPayment.provider === "CLUB_TRANSFER" ? "Bank Reference No." : "Transaction Reference"}
                      </span>
                      <span className="font-mono font-medium text-foreground">
                        {selectedReceiptPayment.referenceNumber || selectedReceiptPayment.providerPaymentId}
                      </span>
                    </div>
                  )}

                  {selectedReceiptPayment.verifiedBy?.name && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Verified By</span>
                      <span className="font-medium text-foreground">
                        {selectedReceiptPayment.verifiedBy.name} (Club Officer)
                      </span>
                    </div>
                  )}

                  {selectedReceiptPayment.verifiedAt && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Verification Timestamp</span>
                      <span className="font-medium text-foreground">
                        {formatDateTime(selectedReceiptPayment.verifiedAt)}
                      </span>
                    </div>
                  )}

                  {selectedReceiptPayment.paymentProofUrl && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Deposit Proof Slip</span>
                      <a
                        href={selectedReceiptPayment.paymentProofUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <ExternalLink className="size-3" />
                        View Uploaded Receipt
                      </a>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Payment Status</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      ✓ {selectedReceiptPayment.status} (Verified)
                    </span>
                  </div>
                </div>

                {/* Direct-to-Club Settlement Notice */}
                {selectedReceiptPayment.provider === "CLUB_TRANSFER" && (
                  <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-2.5 text-[11px] text-amber-800 dark:text-amber-200">
                    <p className="font-semibold">Direct-to-Club Settlement Notice:</p>
                    <p className="mt-0.5 text-muted-foreground">
                      This transaction was transferred directly to the club's bank account outside CampusPulse and verified by authorized club financial officers. CampusPulse did not process or hold these funds.
                    </p>
                  </div>
                )}

                {/* Total Paid Block */}
                <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 flex justify-between items-center">
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground block">
                      Total Amount Paid
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Includes all platform & verification charges
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black font-mono text-foreground">
                      {selectedReceiptPayment.currency || "LKR"}{" "}
                      {(Number(selectedReceiptPayment.amount) || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="p-4 border-t border-border bg-muted/20 flex flex-row gap-2">
              <Button
                variant="outline"
                className="flex-1 text-xs gap-1.5 cursor-pointer"
                onClick={() => window.print()}
              >
                <Printer className="size-3.5" />
                Print Receipt
              </Button>
              <Button
                variant="default"
                className="flex-1 text-xs cursor-pointer"
                onClick={() => setSelectedReceiptPayment(null)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

