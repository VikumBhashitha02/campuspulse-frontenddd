import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ShieldCheck, F as Printer, It as CreditCard, Kt as CircleCheck, M as RefreshCw, N as Receipt, Vt as Clock, j as RotateCcw, k as Search, kt as ExternalLink, ln as Building, qt as CircleAlert } from "../_libs/lucide-react.mjs";
import { a as PageHeader, n as EmptyState, o as RowSkeleton, r as ErrorState } from "./States-DTPgRZKE.mjs";
import { a as formatDateTime, i as formatDate } from "./format-Cdcdxizs.mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-Vjzjil1D.mjs";
import { i as DialogFooter, n as DialogContent, t as Dialog } from "./dialog-CeXuDfGc.mjs";
import { t as participationApi } from "./participation-B-nOVH-I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.payments-Pq8ItkLw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PaymentsPage() {
	const queryClient = useQueryClient();
	const [selectedReceiptPayment, setSelectedReceiptPayment] = (0, import_react.useState)(null);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("ALL");
	const query = useQuery({
		queryKey: ["payments", "my-all"],
		queryFn: async () => {
			const data = await participationApi.getMyPayments();
			return Array.isArray(data) ? data : [];
		}
	});
	useMutation({
		mutationFn: (paymentId) => participationApi.simulateSandboxPayment(paymentId),
		onSuccess: () => {
			toast.success("Payment verified and completed in sandbox mode!", { description: "Your tickets and official digital receipt are now available." });
			queryClient.invalidateQueries({ queryKey: ["payments"] });
			queryClient.invalidateQueries({ queryKey: ["registrations"] });
		},
		onError: (err) => {
			toast.error(err?.message || "Could not simulate payment. Please try again.");
		}
	});
	const payments = Array.isArray(query.data) ? query.data : [];
	const stats = (0, import_react.useMemo)(() => {
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
			} else if (p.status === "PENDING") pendingCount++;
			else if (p.status === "REFUNDED") refundedCount++;
		}
		return {
			totalPaid,
			currency,
			paidCount,
			pendingCount,
			refundedCount,
			totalCount: payments.length
		};
	}, [payments]);
	const filteredPayments = (0, import_react.useMemo)(() => {
		return payments.filter((p) => {
			if (!p) return false;
			if (statusFilter !== "ALL" && p.status !== statusFilter) return false;
			if (searchQuery.trim()) {
				const term = searchQuery.toLowerCase().trim();
				const eventTitle = (p.event?.title || "").toLowerCase();
				const orgName = (p.event?.organization?.name || "").toLowerCase();
				const refId = (p.providerPaymentId || "").toLowerCase();
				const id = (p.id || "").toLowerCase();
				const receiptNo = (p.receipt?.receiptNumber || "").toLowerCase();
				return eventTitle.includes(term) || orgName.includes(term) || refId.includes(term) || id.includes(term) || receiptNo.includes(term);
			}
			return true;
		});
	}, [
		payments,
		statusFilter,
		searchQuery
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					title: "Payments & Transactions",
					description: "View your verified payment transactions, registration invoices, and authoritative digital receipts."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/25 px-3 py-1 text-xs font-semibold text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), "Verified Ledger"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => query.refetch(),
						disabled: query.isFetching,
						className: "h-8 gap-1.5 text-xs cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5", query.isFetching && "animate-spin") }), "Refresh"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-4 shadow-2xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Total Paid"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:text-emerald-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-mono text-xl font-bold tracking-tight text-foreground",
								children: [
									stats.currency,
									" ",
									stats.totalPaid.toLocaleString(void 0, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: [
									stats.paidCount,
									" successful transaction",
									stats.paidCount === 1 ? "" : "s"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-4 shadow-2xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Completed"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:text-emerald-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-xl font-bold tracking-tight text-foreground",
								children: stats.paidCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium",
								children: "Tickets issued"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-4 shadow-2xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Pending"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-amber-500/10 p-1.5 text-amber-600 dark:text-amber-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-xl font-bold tracking-tight text-foreground",
								children: stats.pendingCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Awaiting payment"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-4 shadow-2xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Refunded"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-purple-500/10 p-1.5 text-purple-600 dark:text-purple-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-xl font-bold tracking-tight text-foreground",
								children: stats.refundedCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Processed refunds"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Search by event, organizer, or reference...",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						className: "pl-9 h-9 text-xs"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					value: statusFilter,
					onValueChange: (val) => setStatusFilter(val),
					className: "w-full sm:w-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid grid-cols-4 h-9 bg-muted/60 p-1 rounded-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "ALL",
								className: "text-xs",
								children: [
									"All (",
									payments.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "PAID",
								className: "text-xs",
								children: [
									"Paid (",
									stats.paidCount,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "PENDING",
								className: "text-xs",
								children: [
									"Pending (",
									stats.pendingCount,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "REFUNDED",
								className: "text-xs",
								children: [
									"Refunded (",
									stats.refundedCount,
									")"
								]
							})
						]
					})
				})]
			}),
			query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {})
				]
			}) : query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				message: "We encountered an issue fetching your payment transactions. Please try again.",
				onRetry: () => {
					query.refetch();
				}
			}) : payments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-6" }),
				title: "No payments found",
				description: "You haven't made any transactions yet. When you register for paid hackathons, conferences, or ticketed university events, your receipts and transaction ledger will appear here.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					className: "bg-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/explore",
						children: "Explore Events"
					})
				})
			}) : filteredPayments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-dashed border-border p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-foreground",
						children: "No matching transactions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "No payments match your current search or filter criteria."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => {
							setSearchQuery("");
							setStatusFilter("ALL");
						},
						className: "mt-4 text-xs",
						children: "Clear Filters"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl border border-border bg-card shadow-xs overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 sm:px-6",
										children: "Opportunity / Event"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3",
										children: "Amount"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3",
										children: "Provider & Reference"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3",
										children: "Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-right sm:px-6",
										children: "Receipt / Actions"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border",
								children: filteredPayments.map((p) => {
									const isPaid = p.status === "PAID";
									const isRefunded = p.status === "REFUNDED";
									const isPending = p.status === "PENDING";
									const isProcessing = p.status === "PROCESSING";
									const isFailed = p.status === "FAILED";
									const isClubTransfer = p.provider === "CLUB_TRANSFER";
									const amountNum = Number(p.amount) || 0;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-muted/30 transition-colors",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-4 sm:px-6",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0 max-w-xs",
													children: [p.event?.slug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/events/$slug",
														params: { slug: p.event.slug },
														className: "font-semibold text-foreground hover:text-primary transition-colors truncate block",
														children: p.event.title || "Campus Event"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-semibold text-foreground truncate",
														children: p.event?.title || "Campus Event"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground truncate",
														children: p.event?.organization?.name || "CampusPulse Organizer"
													})]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "px-4 py-4 font-mono font-semibold text-foreground",
												children: [
													p.currency || "LKR",
													" ",
													amountNum.toLocaleString(void 0, {
														minimumFractionDigits: 2,
														maximumFractionDigits: 2
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "px-4 py-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-semibold", isClubTransfer ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25" : "bg-muted/80 text-foreground border-border/60"),
														children: isClubTransfer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-3 text-amber-500" }), "Club Transfer"] }) : p.provider || "GATEWAY_SANDBOX"
													}),
													(p.referenceNumber || p.providerPaymentId) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "font-mono text-[11px] text-muted-foreground mt-0.5 truncate max-w-[150px]",
														children: ["Ref: ", p.referenceNumber || p.providerPaymentId]
													}),
													p.paymentProofUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: p.paymentProofUrl,
														target: "_blank",
														rel: "noreferrer",
														className: "inline-flex items-center gap-1 text-[11px] text-primary hover:underline mt-0.5 block",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" }), "View Slip"]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "px-4 py-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border", isPaid && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30", isRefunded && "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30", (isProcessing || isClubTransfer && isPending && p.paymentProofUrl) && "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30", isPending && (!isClubTransfer || !p.paymentProofUrl) && "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30", isFailed && "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30"),
													children: [
														isPaid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }),
														(isProcessing || isClubTransfer && isPending && p.paymentProofUrl) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
														isPending && (!isClubTransfer || !p.paymentProofUrl) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
														isRefunded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3" }),
														isFailed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-3" }),
														isPaid ? isClubTransfer ? "Verified" : "Paid" : isProcessing || isClubTransfer && isPending && p.paymentProofUrl ? "Awaiting Verification" : isFailed ? "Rejected" : p.status
													]
												}), isFailed && p.rejectionReason && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-rose-600 dark:text-rose-400 mt-1 max-w-[150px] truncate",
													title: p.rejectionReason,
													children: p.rejectionReason
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-4 text-xs text-muted-foreground",
												children: formatDate(p.paidAt || p.createdAt)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-4 text-right sm:px-6",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center justify-end gap-2",
													children: isPaid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														variant: "outline",
														size: "sm",
														className: "h-8 gap-1.5 text-xs border-border cursor-pointer",
														onClick: () => setSelectedReceiptPayment(p),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "size-3.5 text-primary" }), "View Receipt"]
													}) : isClubTransfer && (isProcessing || isPending && p.paymentProofUrl) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs text-blue-600 dark:text-blue-400 font-medium",
														children: "Under Review"
													}) : isClubTransfer && isPending && !p.paymentProofUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs text-amber-600 dark:text-amber-400 font-medium",
														children: "Proof Required"
													}) : isPending && !isClubTransfer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs text-amber-600 dark:text-amber-400 font-medium",
														children: "Payment Pending"
													}) : isFailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs text-rose-600 dark:text-rose-400 font-medium",
														children: "Rejected"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs text-muted-foreground",
														children: "—"
													})
												})
											})
										]
									}, p.id);
								})
							})]
						})
					})
				})
			}),
			selectedReceiptPayment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(selectedReceiptPayment),
				onOpenChange: (open) => !open && setSelectedReceiptPayment(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-lg p-0 overflow-hidden bg-card border-border shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: "printable-receipt-area",
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-gradient-to-br from-navy via-slate-900 to-indigo-950 p-6 text-white text-center border-b border-indigo-900/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), "VERIFIED PAYMENT RECEIPT"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-black tracking-tight",
									children: "CampusPulse Digital Receipt"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-slate-300 font-mono",
									children: selectedReceiptPayment.receipt?.receiptNumber || `CP-RCP-${(selectedReceiptPayment.id || "").slice(0, 8).toUpperCase()}`
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 space-y-5 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center pb-4 border-b border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-[11px] block",
											children: "Issued To"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-foreground text-sm",
											children: selectedReceiptPayment.payer?.name || "Student Attendee"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground text-xs",
											children: selectedReceiptPayment.payer?.email || "—"
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-[11px] block",
											children: "Payment Date"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-foreground",
											children: formatDateTime(selectedReceiptPayment.paidAt || selectedReceiptPayment.createdAt)
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/80 bg-muted/30 p-4 space-y-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-between items-start",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
													children: "Opportunity / Event"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-bold text-sm text-foreground leading-snug",
													children: selectedReceiptPayment.event?.title || "Campus Event"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted-foreground mt-0.5",
													children: ["Organized by ", selectedReceiptPayment.event?.organization?.name || "Campus Organizer"]
												})
											] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-2 border-t border-border/60 flex justify-between items-center text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Payment Provider"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground flex items-center gap-1",
												children: selectedReceiptPayment.provider === "CLUB_TRANSFER" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-3 text-amber-500" }), "Direct Bank Transfer (Club)"] }) : selectedReceiptPayment.provider || "GATEWAY_SANDBOX"
											})]
										}),
										(selectedReceiptPayment.referenceNumber || selectedReceiptPayment.providerPaymentId) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: selectedReceiptPayment.provider === "CLUB_TRANSFER" ? "Bank Reference No." : "Transaction Reference"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono font-medium text-foreground",
												children: selectedReceiptPayment.referenceNumber || selectedReceiptPayment.providerPaymentId
											})]
										}),
										selectedReceiptPayment.verifiedBy?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Verified By"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-medium text-foreground",
												children: [selectedReceiptPayment.verifiedBy.name, " (Club Officer)"]
											})]
										}),
										selectedReceiptPayment.verifiedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Verification Timestamp"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground",
												children: formatDateTime(selectedReceiptPayment.verifiedAt)
											})]
										}),
										selectedReceiptPayment.paymentProofUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Deposit Proof Slip"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: selectedReceiptPayment.paymentProofUrl,
												target: "_blank",
												rel: "noreferrer",
												className: "text-primary hover:underline font-medium inline-flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" }), "View Uploaded Receipt"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Payment Status"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-emerald-600 dark:text-emerald-400",
												children: [
													"✓ ",
													selectedReceiptPayment.status,
													" (Verified)"
												]
											})]
										})
									]
								}),
								selectedReceiptPayment.provider === "CLUB_TRANSFER" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-amber-500/5 border border-amber-500/20 p-2.5 text-[11px] text-amber-800 dark:text-amber-200",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: "Direct-to-Club Settlement Notice:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-muted-foreground",
										children: "This transaction was transferred directly to the club's bank account outside CampusPulse and verified by authorized club financial officers. CampusPulse did not process or hold these funds."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-primary/5 border border-primary/20 p-4 flex justify-between items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-semibold text-muted-foreground block",
										children: "Total Amount Paid"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "Includes all platform & verification charges"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xl font-black font-mono text-foreground",
											children: [
												selectedReceiptPayment.currency || "LKR",
												" ",
												(Number(selectedReceiptPayment.amount) || 0).toLocaleString(void 0, {
													minimumFractionDigits: 2,
													maximumFractionDigits: 2
												})
											]
										})
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "p-4 border-t border-border bg-muted/20 flex flex-row gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "flex-1 text-xs gap-1.5 cursor-pointer",
							onClick: () => window.print(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-3.5" }), "Print Receipt"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "default",
							className: "flex-1 text-xs cursor-pointer",
							onClick: () => setSelectedReceiptPayment(null),
							children: "Close"
						})]
					})]
				})
			})
		]
	});
}
//#endregion
export { PaymentsPage as component };
