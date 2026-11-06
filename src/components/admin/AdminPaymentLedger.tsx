import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreditCard,
  DollarSign,
  CheckCircle2,
  Clock,
  RotateCcw,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  FileText,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  GraduationCap,
  Calendar,
  Sparkles,
  RefreshCw,
  QrCode,
  User,
  Ticket,
  AlertTriangle,
  Receipt,
  ArrowUpRight,
  HelpCircle,
  ShieldAlert,
  FileSpreadsheet,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminApi,
  type PaymentItem,
  type PaymentStats,
  type PaymentListResponse,
  type PaymentDetailResponse,
} from "@/lib/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AdminDateFilter, type DateFilterValues } from "./AdminDateFilter";
import { cn } from "@/lib/utils";
import { PageHeader, RowSkeleton, ErrorState, EmptyState } from "@/components/common/States";

interface AdminPaymentLedgerProps {
  universities?: Array<{ id: string; name: string; code: string }>;
}

export function AdminPaymentLedger({ universities = [] }: AdminPaymentLedgerProps) {
  const queryClient = useQueryClient();

  // Universities query if not provided
  const universitiesListQuery = useQuery({
    queryKey: ["admin", "universities", "dropdown"],
    queryFn: () => adminApi.getUniversities({ limit: 100 }),
    enabled: universities.length === 0,
  });

  const availableUniversities = useMemo(() => {
    if (universities && universities.length > 0) return universities;
    return (universitiesListQuery.data?.data || []).map((u: any) => ({
      id: u.id,
      name: u.name,
      code: u.code || u.shortName || u.name,
    }));
  }, [universities, universitiesListQuery.data]);

  // Filters State
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("ALL");
  const [provider, setProvider] = useState<string>("ALL");
  const [universityId, setUniversityId] = useState<string>("ALL");
  const [currency, setCurrency] = useState<string>("ALL");
  const [dateFilter, setDateFilter] = useState<DateFilterValues>({
    preset: "ALL",
    year: "",
    month: "",
    startDate: "",
    endDate: "",
  });
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Dialog State
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);
  const [refundPaymentTarget, setRefundPaymentTarget] = useState<PaymentItem | null>(null);
  const [refundReason, setRefundReason] = useState("");
  const [refundAmount, setRefundAmount] = useState<string>("");
  const [receiptModalPayment, setReceiptModalPayment] = useState<PaymentItem | null>(null);
  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const handleExport = async (format: "csv" | "pdf") => {
    const totalCount = paymentsQuery.data?.total || 0;
    if (totalCount === 0) {
      toast.info("No payment transactions match the active filters to export.");
      return;
    }
    if (format === "csv") setIsExportingCsv(true);
    else setIsExportingPdf(true);

    try {
      toast.info(`Generating ${format.toUpperCase()} export...`, {
        description: `Exporting all ${totalCount.toLocaleString()} filtered transaction records.`,
      });
      const filename = await adminApi.exportData("payments", format, {
        search: search.trim() || undefined,
        status: status !== "ALL" ? status : undefined,
        provider: provider !== "ALL" ? provider : undefined,
        universityId: universityId !== "ALL" ? universityId : undefined,
        currency: currency !== "ALL" ? currency : undefined,
        startDate: dateFilter.startDate || undefined,
        endDate: dateFilter.endDate || undefined,
        year: dateFilter.year || undefined,
        month: dateFilter.month || undefined,
        datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
        sortBy,
        sortOrder,
      });
      toast.success(`Export ready!`, { description: `Downloaded ${filename}` });
    } catch (err: any) {
      toast.error(`Export failed`, { description: err?.message || "Failed to generate export" });
    } finally {
      if (format === "csv") setIsExportingCsv(false);
      else setIsExportingPdf(false);
    }
  };

  // Query: Payments List
  const paymentsQuery = useQuery<PaymentListResponse>({
    queryKey: [
      "admin",
      "payments",
      {
        search: search.trim() || undefined,
        status: status !== "ALL" ? status : undefined,
        provider: provider !== "ALL" ? provider : undefined,
        universityId: universityId !== "ALL" ? universityId : undefined,
        currency: currency !== "ALL" ? currency : undefined,
        startDate: dateFilter.startDate || undefined,
        endDate: dateFilter.endDate || undefined,
        year: dateFilter.year || undefined,
        month: dateFilter.month || undefined,
        datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
        sortBy,
        sortOrder,
        page,
        limit: pageSize,
      },
    ],
    queryFn: () =>
      adminApi.getPayments({
        search: search.trim() || undefined,
        status: status !== "ALL" ? status : undefined,
        provider: provider !== "ALL" ? provider : undefined,
        universityId: universityId !== "ALL" ? universityId : undefined,
        currency: currency !== "ALL" ? currency : undefined,
        startDate: dateFilter.startDate || undefined,
        endDate: dateFilter.endDate || undefined,
        year: dateFilter.year || undefined,
        month: dateFilter.month || undefined,
        datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : undefined,
        sortBy,
        sortOrder,
        page,
        limit: pageSize,
      }),
  });

  // Query: KPI Stats (calculated from database queries)
  const statsQuery = useQuery<PaymentStats>({
    queryKey: ["admin", "payments", "stats"],
    queryFn: () => adminApi.getPaymentStats(),
  });

  // Query: Payment Detail (when modal open)
  const paymentDetailQuery = useQuery<PaymentDetailResponse>({
    queryKey: ["admin", "payments", "detail", selectedPaymentId],
    queryFn: () => adminApi.getPaymentDetails(selectedPaymentId!),
    enabled: Boolean(selectedPaymentId),
  });

  // Mutation: Process Administrative Refund
  const refundMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { amount?: number | undefined; reason: string } }) =>
      adminApi.refundPayment(id, payload),
    onSuccess: (res) => {
      toast.success(res.message || "Payment refunded successfully.", {
        description: "Admission tickets and passes have been automatically revoked.",
      });
      setRefundPaymentTarget(null);
      setRefundReason("");
      setRefundAmount("");
      queryClient.invalidateQueries({ queryKey: ["admin", "payments"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to process refund. Please verify gateway connectivity.");
    },
  });

  // Mutation: Simulate Sandbox Payment (dev/test only)
  const simulateMutation = useMutation({
    mutationFn: (id: string) => adminApi.simulateSandboxPayment(id),
    onSuccess: (res) => {
      toast.success(res.message || "Sandbox payment verified & settled!", {
        description: "Official receipt generated and QR tickets issued.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin", "payments"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      if (selectedPaymentId) {
        queryClient.invalidateQueries({ queryKey: ["admin", "payments", "detail", selectedPaymentId] });
      }
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to simulate sandbox payment.");
    },
  });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Copied to clipboard", { duration: 1500 });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatus("ALL");
    setProvider("ALL");
    setUniversityId("ALL");
    setCurrency("ALL");
    setDateFilter({ preset: "ALL", year: "", month: "", startDate: "", endDate: "" });
    setSortBy("createdAt");
    setSortOrder("desc");
    setPage(1);
  };

  const formatMoney = (amount: number | string | null | undefined, curr = "LKR") => {
    const num = Number(amount) || 0;
    return `${curr} ${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? "N/A"
      : d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  const formatShortDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? "N/A"
      : d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  };

  const getStatusBadge = (statusVal: string) => {
    switch (statusVal) {
      case "PAID":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="size-3" /> Paid & Settled
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Clock className="size-3" /> Pending Checkout
          </span>
        );
      case "PROCESSING":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
            <RefreshCw className="size-3 animate-spin" /> Processing
          </span>
        );
      case "REFUNDED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <RotateCcw className="size-3" /> Refunded
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <XCircle className="size-3" /> Failed / Declined
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
            <AlertCircle className="size-3" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-muted text-muted-foreground">
            {statusVal}
          </span>
        );
    }
  };

  const getProviderBadge = (providerName: string) => {
    switch (providerName) {
      case "STRIPE":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            Stripe
          </span>
        );
      case "PAYHERE":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            PayHere
          </span>
        );
      case "ONEPAY":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
            OnePay
          </span>
        );
      case "WEBXPAY":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            WebXPay
          </span>
        );
      case "GATEWAY_SANDBOX":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <Sparkles className="size-2.5" /> Sandbox
          </span>
        );
      case "CLUB_TRANSFER":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
            <Building2 className="size-2.5 text-amber-600 dark:text-amber-400" /> Club Transfer
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground border border-border">
            {providerName}
          </span>
        );
    }
  };

  const stats = statsQuery.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Transactions & Payments Ledger"
        description="Comprehensive financial audit trail, digital receipt verification, settlement tracking, and administrative refund processing."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                paymentsQuery.refetch();
                statsQuery.refetch();
                toast.info("Refreshing transaction ledger...");
              }}
              disabled={paymentsQuery.isFetching}
              className="gap-1.5 h-8 text-xs font-medium"
            >
              <RefreshCw className={cn("size-3.5 mr-1.5", paymentsQuery.isFetching && "animate-spin")} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("csv")}
              disabled={isExportingCsv || paymentsQuery.isFetching}
              className="gap-1.5 h-8 text-xs font-medium text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
            >
              {isExportingCsv ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <FileSpreadsheet className="size-3.5 text-emerald-600 dark:text-emerald-400" />
              )}
              CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("pdf")}
              disabled={isExportingPdf || paymentsQuery.isFetching}
              className="gap-1.5 h-8 text-xs font-medium text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40 hover:bg-amber-50 dark:hover:bg-amber-950/30"
            >
              {isExportingPdf ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <FileText className="size-3.5 text-amber-600 dark:text-amber-400" />
              )}
              PDF
            </Button>
          </div>
        }
      />

      {/* 4 Real Database KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Successfully Paid Volume */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Gross Payment Volume
            </span>
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="size-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {statsQuery.isLoading ? "..." : formatMoney(stats?.totalPaidVolume ?? 0)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {stats?.paidCount ?? 0}
              </span>{" "}
              settled & verified payments
            </p>
          </div>
        </div>

        {/* Completed Paid Transactions */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Completed Payments
            </span>
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CheckCircle2 className="size-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {statsQuery.isLoading ? "..." : (stats?.paidCount ?? 0).toLocaleString()}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Official receipts issued & admission tickets granted
            </p>
          </div>
        </div>

        {/* Pending Transactions */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Pending Checkout
            </span>
            <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="size-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {statsQuery.isLoading ? "..." : (stats?.pendingCount ?? 0).toLocaleString()}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Awaiting gateway confirmation or student checkout
            </p>
          </div>
        </div>

        {/* Refunded Transactions and Amounts */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Refunded
            </span>
            <div className="flex size-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <RotateCcw className="size-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {statsQuery.isLoading ? "..." : formatMoney(stats?.refundedVolume ?? 0)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                {stats?.refundedCount ?? 0}
              </span>{" "}
              refunded transactions (tickets revoked)
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="relative md:col-span-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search ID, receipt #, student, event, provider..."
              className="pl-9 text-xs"
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="ALL">All Payment Statuses</option>
              <option value="PAID">Paid & Settled</option>
              <option value="PENDING">Pending Checkout</option>
              <option value="PROCESSING">Processing</option>
              <option value="REFUNDED">Refunded</option>
              <option value="FAILED">Failed / Declined</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          {/* Gateway Provider Filter */}
          <div className="md:col-span-2">
            <select
              value={provider}
              onChange={(e) => {
                setProvider(e.target.value);
                setPage(1);
              }}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="ALL">All Gateways</option>
              <option value="STRIPE">Stripe</option>
              <option value="PAYHERE">PayHere</option>
              <option value="ONEPAY">OnePay</option>
              <option value="WEBXPAY">WebXPay</option>
              <option value="CLUB_TRANSFER">Direct Club Bank Transfer</option>
              <option value="GATEWAY_SANDBOX">Gateway Sandbox</option>
            </select>
          </div>

          {/* University Filter */}
          <div className="md:col-span-2">
            <select
              value={universityId}
              onChange={(e) => {
                setUniversityId(e.target.value);
                setPage(1);
              }}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="ALL">All Universities</option>
              {availableUniversities.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div className="md:col-span-2">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const parts = e.target.value.split("-");
                if (parts[0] && parts[1]) {
                  setSortBy(parts[0]);
                  setSortOrder(parts[1] as "asc" | "desc");
                  setPage(1);
                }
              }}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="createdAt-desc">Newest Transaction</option>
              <option value="createdAt-asc">Oldest Transaction</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
              <option value="paidAt-desc">Recently Paid</option>
            </select>
          </div>
        </div>

        {/* Date Range & Reset Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/50 text-xs">
          <AdminDateFilter
            values={dateFilter}
            onChange={(val) => {
              setDateFilter(val);
              setPage(1);
            }}
          />

          <div className="flex items-center gap-2">
            {(search ||
              status !== "ALL" ||
              provider !== "ALL" ||
              universityId !== "ALL" ||
              currency !== "ALL" ||
              dateFilter.startDate ||
              dateFilter.endDate ||
              dateFilter.year ||
              dateFilter.month ||
              (dateFilter.preset && dateFilter.preset !== "ALL")) && (
              <Button variant="ghost" size="sm" onClick={handleResetFilters} className="h-8 text-xs">
                Reset Filters
              </Button>
            )}

            <span className="text-xs text-muted-foreground">
              Total Records:{" "}
              <strong className="text-foreground">
                {paymentsQuery.data?.total?.toLocaleString() ?? 0}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Payment Ledger Table */}
      {paymentsQuery.isPending ? (
        <RowSkeleton />
      ) : paymentsQuery.isError ? (
        <ErrorState onRetry={() => paymentsQuery.refetch()} />
      ) : !paymentsQuery.data?.data || paymentsQuery.data.data.length === 0 ? (
        <EmptyState
          title="No payment records found"
          description="Try adjusting your search query, status filters, or date range."
          action={
            <Button variant="outline" size="sm" onClick={handleResetFilters}>
              Clear Filters
            </Button>
          }
        />
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Transaction / Receipt</th>
                  <th className="p-3">Student / Payer</th>
                  <th className="p-3">Event & Organizer</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Gateway</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Timestamps</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paymentsQuery.data.data.map((p) => {
                  const receiptNumber = p.receipt?.receiptNumber;
                  const isPaid = p.status === "PAID";
                  const isRefunded = p.status === "REFUNDED";
                  const isPending = p.status === "PENDING";
                  const isSandbox = p.provider === "GATEWAY_SANDBOX";

                  return (
                    <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                      {/* Transaction & Receipt */}
                      <td className="p-3 align-top">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[11px] font-semibold text-foreground">
                              {p.id.length > 14 ? `${p.id.slice(0, 10)}...` : p.id}
                            </span>
                            <button
                              onClick={() => handleCopy(p.id, `tx-${p.id}`)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              title="Copy Transaction ID"
                            >
                              {copiedKey === `tx-${p.id}` ? (
                                <Check className="size-3 text-emerald-500" />
                              ) : (
                                <Copy className="size-3" />
                              )}
                            </button>
                          </div>
                          {receiptNumber ? (
                            <div className="flex items-center gap-1.5">
                              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded font-medium">
                                <Receipt className="size-2.5" /> {receiptNumber}
                              </span>
                              <button
                                onClick={() => handleCopy(receiptNumber, `rcp-${p.id}`)}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                title="Copy Receipt Number"
                              >
                                {copiedKey === `rcp-${p.id}` ? (
                                  <Check className="size-3 text-emerald-500" />
                                ) : (
                                  <Copy className="size-3" />
                                )}
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-muted-foreground italic">No receipt</span>
                          )}
                        </div>
                      </td>

                      {/* Student / Payer */}
                      <td className="p-3 align-top">
                        <div className="space-y-0.5 max-w-[200px]">
                          <div className="font-semibold text-foreground truncate">
                            {p.payer?.name || "Anonymous / Unregistered"}
                          </div>
                          <div className="text-[11px] text-muted-foreground truncate">
                            {p.payer?.email || "N/A"}
                          </div>
                          {p.payer?.university?.shortName && (
                            <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <GraduationCap className="size-2.5" />
                              {p.payer.university.shortName}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Event & Organizer */}
                      <td className="p-3 align-top">
                        <div className="space-y-0.5 max-w-[220px]">
                          <div className="font-medium text-foreground truncate" title={p.event?.title}>
                            {p.event?.title || "Unknown Event"}
                          </div>
                          {p.event?.organization?.name && (
                            <div className="text-[11px] text-muted-foreground truncate flex items-center gap-1">
                              <Building2 className="size-2.5" />
                              {p.event.organization.name}
                            </div>
                          )}
                          {p.ticketCount !== undefined && p.ticketCount > 0 && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                              <Ticket className="size-2.5" /> {p.ticketCount} pass(es) issued
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Amount & Currency */}
                      <td className="p-3 align-top">
                        <div className="space-y-0.5">
                          <div className="font-bold text-foreground text-sm">
                            {formatMoney(p.amount, p.currency)}
                          </div>
                          {isRefunded && p.refundedAmount && (
                            <div className="text-[10px] font-semibold text-purple-600 dark:text-purple-400">
                              Refunded: {formatMoney(p.refundedAmount, p.currency)}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Gateway Provider */}
                      <td className="p-3 align-top">
                        <div className="space-y-1">
                          {getProviderBadge(p.provider)}
                          {(p.referenceNumber || p.providerPaymentId) && (
                            <div className="font-mono text-[10px] text-muted-foreground truncate max-w-[120px]" title={p.referenceNumber || p.providerPaymentId || ""}>
                              {p.provider === "CLUB_TRANSFER" ? "Ref: " : ""}{p.referenceNumber || p.providerPaymentId}
                            </div>
                          )}
                          {p.paymentProofUrl && (
                            <a
                              href={p.paymentProofUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline block"
                            >
                              <FileText className="size-2.5" /> View Proof
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-3 align-top">
                        <div className="space-y-1">
                          {getStatusBadge(p.status)}
                          {p.verifiedBy?.name && (
                            <div className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                              by {p.verifiedBy.name}
                            </div>
                          )}
                          {p.rejectionReason && (
                            <div className="text-[10px] text-rose-600 dark:text-rose-400 italic truncate max-w-[120px]" title={p.rejectionReason}>
                              {p.rejectionReason}
                            </div>
                          )}
                          {p.refundReason && (
                            <div className="text-[10px] text-muted-foreground italic truncate max-w-[120px]" title={p.refundReason}>
                              {p.refundReason}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Timestamps */}
                      <td className="p-3 align-top text-[11px] text-muted-foreground">
                        <div>Created: {formatShortDate(p.createdAt)}</div>
                        {p.paidAt && (
                          <div className="text-emerald-600 dark:text-emerald-400 text-[10px]">
                            Paid: {formatShortDate(p.paidAt)}
                          </div>
                        )}
                        {p.refundedAt && (
                          <div className="text-purple-600 dark:text-purple-400 text-[10px]">
                            Refunded: {formatShortDate(p.refundedAt)}
                          </div>
                        )}
                      </td>

                      {/* Actions Menu */}
                      <td className="p-3 align-top text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* View Full Transaction Details */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-8 p-0"
                            title="Inspect Transaction Details"
                            onClick={() => setSelectedPaymentId(p.id)}
                          >
                            <Eye className="size-3.5" />
                          </Button>

                          {/* View Digital Receipt */}
                          {receiptNumber && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="size-8 p-0 text-primary"
                              title="View Official Receipt"
                              onClick={() => setReceiptModalPayment(p)}
                            >
                              <FileText className="size-3.5" />
                            </Button>
                          )}

                          {/* Sandbox Payment Simulation (Dev/Sandbox Mode Only) */}
                          {isPending && isSandbox && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-2 text-[10px] gap-1 text-amber-600 border-amber-500/30 hover:bg-amber-500/10"
                              title="Simulate Sandbox Payment"
                              onClick={() => simulateMutation.mutate(p.id)}
                              disabled={simulateMutation.isPending}
                            >
                              <Sparkles className="size-3" /> Simulate
                            </Button>
                          )}

                          {/* Process Administrative Refund */}
                          {isPaid && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="size-8 p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                              title="Process Refund"
                              onClick={() => {
                                setRefundPaymentTarget(p);
                                setRefundAmount(String(p.amount));
                                setRefundReason("");
                              }}
                            >
                              <RotateCcw className="size-3.5" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-t border-border bg-card">
            <div className="text-xs text-muted-foreground">
              Showing{" "}
              <strong className="text-foreground">
                {(page - 1) * pageSize + 1}-
                {Math.min(page * pageSize, paymentsQuery.data.total)}
              </strong>{" "}
              of <strong className="text-foreground">{paymentsQuery.data.total}</strong> payments
            </div>

            <div className="flex items-center gap-2">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="h-8 rounded-md border border-input bg-background px-2 text-xs shadow-sm focus:outline-none"
              >
                <option value={10}>10 per page</option>
                <option value={15}>15 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>

              <Button
                variant="outline"
                size="sm"
                className="h-8 px-2"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                <ChevronLeft className="size-4 mr-1" /> Prev
              </Button>

              <span className="text-xs px-2 font-medium">
                Page {page} of {paymentsQuery.data.totalPages || 1}
              </span>

              <Button
                variant="outline"
                size="sm"
                className="h-8 px-2"
                onClick={() => setPage((p) => Math.min(paymentsQuery.data.totalPages, p + 1))}
                disabled={page >= (paymentsQuery.data.totalPages || 1)}
              >
                Next <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TRANSACTION DETAIL MODAL */}
      {/* ========================================================================= */}
      <Dialog
        open={Boolean(selectedPaymentId)}
        onOpenChange={(open) => {
          if (!open) setSelectedPaymentId(null);
        }}
      >
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          {paymentDetailQuery.isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="size-8 animate-spin text-primary" />
              <p className="text-xs text-muted-foreground">Loading transaction lifecycle & verification...</p>
            </div>
          ) : paymentDetailQuery.isError || !paymentDetailQuery.data ? (
            <div className="py-8 text-center space-y-3">
              <AlertCircle className="size-8 text-rose-500 mx-auto" />
              <p className="text-sm font-semibold text-foreground">Failed to load transaction details.</p>
              <Button size="sm" variant="outline" onClick={() => paymentDetailQuery.refetch()}>
                Retry
              </Button>
            </div>
          ) : (
            (() => {
              const detail = paymentDetailQuery.data;
              const p = detail.payment;

              return (
                <div className="space-y-6">
                  {/* Modal Header */}
                  <DialogHeader>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <DialogTitle className="text-lg font-bold flex items-center gap-2">
                          <CreditCard className="size-5 text-primary" /> Transaction Details
                        </DialogTitle>
                        <DialogDescription className="font-mono text-xs text-muted-foreground mt-0.5">
                          ID: {p.id}
                        </DialogDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(p.status)}
                        {getProviderBadge(p.provider)}
                      </div>
                    </div>
                  </DialogHeader>

                  {/* Financial & Settlement Summary */}
                  <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-3">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Financial Settlement Breakdown
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-muted-foreground">Gross Amount:</span>
                        <div className="font-bold text-foreground text-sm">
                          {formatMoney(p.amount, p.currency)}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Payment Provider:</span>
                        <div className="font-semibold text-foreground">{p.provider}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          {p.provider === "CLUB_TRANSFER" ? "Bank Ref:" : "Gateway Ref:"}
                        </span>
                        <div className="font-mono text-[11px] text-foreground truncate">
                          {p.referenceNumber || p.providerPaymentId || "N/A"}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Receipt Number:</span>
                        <div className="font-mono text-[11px] font-semibold text-primary">
                          {p.receipt?.receiptNumber || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Direct-to-Club Settlement Notice & Proof Information */}
                  {p.provider === "CLUB_TRANSFER" && (
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs space-y-2.5">
                      <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                        <Building2 className="size-4" />
                        Direct Club Bank Transfer — External Society Settlement
                      </div>
                      <p className="text-[11px] leading-relaxed text-muted-foreground">
                        This fee was transferred directly to the student society's verified club bank account outside CampusPulse and authorized by the club's financial officer. CampusPulse does not process, hold, or escrow these funds.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-amber-500/20 text-[11px]">
                        <div>
                          <span className="text-muted-foreground block text-[10px]">Bank Reference:</span>
                          <span className="font-mono font-semibold text-foreground">{p.referenceNumber || p.providerPaymentId || "N/A"}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[10px]">Verifying Officer:</span>
                          <span className="font-semibold text-foreground">{p.verifiedBy?.name || p.verifiedById || "Pending Verification"}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[10px]">Verification Date:</span>
                          <span className="text-foreground">{p.verifiedAt ? formatDate(p.verifiedAt) : "—"}</span>
                        </div>
                        {p.paymentProofUrl && (
                          <div className="col-span-2">
                            <span className="text-muted-foreground block text-[10px]">Deposit Proof Receipt:</span>
                            <a
                              href={p.paymentProofUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-primary hover:underline font-medium text-xs mt-0.5"
                            >
                              <ExternalLink className="size-3" /> View Submitted Transfer Slip
                            </a>
                          </div>
                        )}
                        {p.rejectionReason && (
                          <div className="col-span-2 text-rose-600 dark:text-rose-400">
                            <span className="block text-[10px] font-bold">Rejection Reason:</span>
                            <span>{p.rejectionReason}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Payer & Event Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Student Payer */}
                    <div className="rounded-xl border border-border bg-card p-4 space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-1.5">
                        <User className="size-3.5 text-primary" /> Payer / Student Identity
                      </h4>
                      <div className="space-y-1 text-muted-foreground">
                        <div>
                          <strong className="text-foreground">Name:</strong> {p.payer?.name || "N/A"}
                        </div>
                        <div>
                          <strong className="text-foreground">Email:</strong> {p.payer?.email || "N/A"}
                        </div>
                        {p.payer?.studentId && (
                          <div>
                            <strong className="text-foreground">Student ID:</strong> {p.payer.studentId}
                          </div>
                        )}
                        {p.payer?.university?.name && (
                          <div>
                            <strong className="text-foreground">University:</strong> {p.payer.university.name}
                          </div>
                        )}
                        {p.payer?.faculty?.name && (
                          <div>
                            <strong className="text-foreground">Faculty:</strong> {p.payer.faculty.name}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Event & Society */}
                    <div className="rounded-xl border border-border bg-card p-4 space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-1.5">
                        <Building2 className="size-3.5 text-primary" /> Event & Host Organization
                      </h4>
                      <div className="space-y-1 text-muted-foreground">
                        <div>
                          <strong className="text-foreground">Event:</strong> {p.event?.title || "N/A"}
                        </div>
                        <div>
                          <strong className="text-foreground">Host:</strong>{" "}
                          {p.event?.organization?.name || "N/A"}
                        </div>
                        <div>
                          <strong className="text-foreground">Schedule:</strong>{" "}
                          {formatShortDate(p.event?.startDate)}
                        </div>
                        <div>
                          <strong className="text-foreground">Venue:</strong>{" "}
                          {p.event?.venue || p.event?.location || "Campus Venue"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verifiable Lifecycle Timeline */}
                  <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5 text-emerald-500" /> Transaction Lifecycle Trail
                    </h4>
                    <div className="space-y-3">
                      {detail.lifecycle.map((stage, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs">
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                            <Check className="size-3" />
                          </div>
                          <div className="flex-1 space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-foreground">{stage.label}</span>
                              <span className="text-[10px] text-muted-foreground font-mono">
                                {formatDate(stage.timestamp)}
                              </span>
                            </div>
                            {stage.details && (
                              <p className="text-[11px] text-muted-foreground">{stage.details}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Linked Tickets & QR Admission Passes */}
                  {p.tickets && p.tickets.length > 0 && (
                    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <QrCode className="size-3.5 text-primary" /> Issued Admission Passes ({p.tickets.length})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {p.tickets.map((t) => (
                          <div
                            key={t.id}
                            className="rounded-lg border border-border bg-muted/20 p-2.5 flex items-center justify-between text-xs"
                          >
                            <div className="space-y-0.5">
                              <div className="font-mono font-bold text-foreground flex items-center gap-1">
                                <Ticket className="size-3 text-primary" /> {t.ticketNumber}
                              </div>
                              <div className="text-[10px] text-muted-foreground">
                                Attendee: {(t as any).user?.name || p.payer?.name || "Participant"}
                              </div>
                            </div>
                            <span
                              className={cn(
                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                t.status === "ISSUED"
                                  ? "bg-emerald-500/10 text-emerald-600"
                                  : t.status === "REVOKED"
                                  ? "bg-rose-500/10 text-rose-600"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              {t.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Audit Trail */}
                  {detail.auditLogs && detail.auditLogs.length > 0 && (
                    <div className="rounded-xl border border-border bg-card p-4 space-y-2">
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldAlert className="size-3.5 text-muted-foreground" /> Administrative Audit Trail
                      </h4>
                      <div className="space-y-1.5 text-xs text-muted-foreground">
                        {detail.auditLogs.map((log) => (
                          <div key={log.id} className="flex items-center justify-between border-b border-border/40 pb-1">
                            <div>
                              <strong className="text-foreground">{log.action}</strong>
                              {log.reason && ` — "${log.reason}"`}
                            </div>
                            <span className="text-[10px] font-mono">{formatDate(log.createdAt)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Modal Footer Actions */}
                  <DialogFooter className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      {p.receipt && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedPaymentId(null);
                            setReceiptModalPayment(p);
                          }}
                        >
                          <Receipt className="size-3.5 mr-1.5" /> View Official Receipt
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {p.status === "PAID" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setSelectedPaymentId(null);
                            setRefundPaymentTarget(p);
                            setRefundAmount(String(p.amount));
                            setRefundReason("");
                          }}
                        >
                          <RotateCcw className="size-3.5 mr-1.5" /> Process Refund
                        </Button>
                      )}

                      <Button variant="ghost" size="sm" onClick={() => setSelectedPaymentId(null)}>
                        Close
                      </Button>
                    </div>
                  </DialogFooter>
                </div>
              );
            })()
          )}
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* ADMINISTRATIVE REFUND CONFIRMATION DIALOG */}
      {/* ========================================================================= */}
      <Dialog
        open={Boolean(refundPaymentTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setRefundPaymentTarget(null);
            setRefundReason("");
            setRefundAmount("");
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2 text-rose-600">
              <RotateCcw className="size-5" /> Process Transaction Refund
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Revoke tickets and execute refund for Transaction #{refundPaymentTarget?.id.slice(0, 12)}...
            </DialogDescription>
          </DialogHeader>

          {refundPaymentTarget && (
            <div className="space-y-4 text-xs">
              {/* Warning Alert */}
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 flex items-start gap-2.5 text-amber-700 dark:text-amber-300">
                <AlertTriangle className="size-4 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold">Irreversible Financial Action</span>
                  <p className="text-[11px] leading-relaxed">
                    Executing a refund will immediately update the database record to{" "}
                    <strong>REFUNDED</strong>, revoke all issued admission tickets/passes, cancel the
                    event registration, notify the student, and record an immutable audit log.
                  </p>
                </div>
              </div>

              {refundPaymentTarget.provider === "CLUB_TRANSFER" && (
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 flex items-start gap-2.5 text-blue-700 dark:text-blue-300">
                  <Building2 className="size-4 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold">Direct Club Bank Transfer Policy</span>
                    <p className="text-[11px] leading-relaxed">
                      Funds were deposited directly into the club's bank account (not held by CampusPulse). Ensure the club treasurer has manually transferred the refund back to the student's bank account before recording this refund in the ledger.
                    </p>
                  </div>
                </div>
              )}

              {/* Transaction Summary */}
              <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student:</span>
                  <strong className="text-foreground">{refundPaymentTarget.payer?.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Event:</span>
                  <strong className="text-foreground truncate max-w-[200px]">
                    {refundPaymentTarget.event?.title}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Original Payment:</span>
                  <strong className="text-foreground">
                    {formatMoney(refundPaymentTarget.amount, refundPaymentTarget.currency)}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Provider:</span>
                  <span className="font-semibold">{refundPaymentTarget.provider}</span>
                </div>
              </div>

              {/* Refund Reason */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Administrative Reason for Refund <span className="text-rose-500">*</span>
                </Label>
                <Textarea
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder="e.g. Event date changed, student withdrew eligibility, organizer cancellation..."
                  rows={3}
                  className="text-xs"
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setRefundPaymentTarget(null);
                setRefundReason("");
              }}
              disabled={refundMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (!refundReason.trim()) {
                  toast.error("Please enter a reason for the refund.");
                  return;
                }
                refundMutation.mutate({
                  id: refundPaymentTarget!.id,
                  payload: {
                    reason: refundReason.trim(),
                    amount: refundAmount ? Number(refundAmount) : undefined,
                  },
                });
              }}
              disabled={refundMutation.isPending || !refundReason.trim()}
            >
              {refundMutation.isPending ? (
                <>
                  <RefreshCw className="size-3.5 mr-1.5 animate-spin" /> Processing...
                </>
              ) : (
                "Confirm & Revoke Tickets"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* OFFICIAL DIGITAL RECEIPT MODAL */}
      {/* ========================================================================= */}
      <Dialog
        open={Boolean(receiptModalPayment)}
        onOpenChange={(open) => {
          if (!open) setReceiptModalPayment(null);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Receipt className="size-5 text-primary" /> Official Digital Receipt
            </DialogTitle>
            <DialogDescription className="text-xs font-mono text-muted-foreground">
              Receipt #{receiptModalPayment?.receipt?.receiptNumber || "N/A"}
            </DialogDescription>
          </DialogHeader>

          {receiptModalPayment && (
            <div className="space-y-4 text-xs">
              <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <h3 className="font-bold text-foreground text-sm">CampusPulse Official Receipt</h3>
                    <p className="text-[10px] text-muted-foreground">University Event Platform</p>
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                    <CheckCircle2 className="size-3" /> VERIFIED PAID
                  </span>
                </div>

                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Receipt Reference:</span>
                    <span className="font-mono font-bold text-foreground">
                      {receiptModalPayment.receipt?.receiptNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Issued Date:</span>
                    <span className="text-foreground">
                      {formatDate(receiptModalPayment.receipt?.issuedAt || receiptModalPayment.paidAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Billed To:</span>
                    <span className="font-semibold text-foreground">{receiptModalPayment.payer?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Student Email:</span>
                    <span className="text-foreground">{receiptModalPayment.payer?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Event Name:</span>
                    <span className="font-semibold text-foreground truncate max-w-[200px]">
                      {receiptModalPayment.event?.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Gateway:</span>
                    <span className="font-semibold text-foreground">{receiptModalPayment.provider}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground uppercase">Total Amount Settled:</span>
                  <span className="text-base font-extrabold text-foreground font-mono">
                    {formatMoney(receiptModalPayment.amount, receiptModalPayment.currency)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
              }}
            >
              Print / Save PDF
            </Button>
            <Button variant="default" size="sm" onClick={() => setReceiptModalPayment(null)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
