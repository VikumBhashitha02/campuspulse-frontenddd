import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { It as CreditCard, P as QrCode, Vt as Clock, c as Upload, l as Undo2, ln as Building, on as CalendarDays, p as Ticket, qt as CircleAlert, r as Users } from "../_libs/lucide-react.mjs";
import { t as eventsApi } from "./events-Dtjwkx07.mjs";
import { a as PageHeader, n as EmptyState, o as RowSkeleton, r as ErrorState } from "./States-DTPgRZKE.mjs";
import { i as formatDate, s as formatRange } from "./format-Cdcdxizs.mjs";
import { o as OrgAvatar } from "./Badges-Bz6vmcNI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CeXuDfGc.mjs";
import { t as participationApi } from "./participation-B-nOVH-I.mjs";
import { n as TicketPassModal, t as SubmitPaymentClaimDialog } from "./SubmitPaymentClaimDialog-CgiJeEUx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.registrations-B0f-OVKn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		id: "upcoming",
		label: "Upcoming"
	},
	{
		id: "tickets",
		label: "Passes & Tickets 🎫"
	},
	{
		id: "past",
		label: "Past Events"
	},
	{
		id: "all",
		label: "All Registrations"
	}
];
function RegistrationsPage() {
	const queryClient = useQueryClient();
	const [tab, setTab] = (0, import_react.useState)("upcoming");
	const [selectedTicket, setSelectedTicket] = (0, import_react.useState)(null);
	const [cancellingReg, setCancellingReg] = (0, import_react.useState)(null);
	const [isCancelling, setIsCancelling] = (0, import_react.useState)(false);
	const [claimModalData, setClaimModalData] = (0, import_react.useState)(null);
	const query = useQuery({
		queryKey: ["registrations", "my-all"],
		queryFn: async () => {
			try {
				const liveList = await participationApi.getMyRegistrations();
				if (Array.isArray(liveList) && liveList.length > 0) return liveList;
			} catch (err) {
				console.warn("Could not fetch from participationApi, checking legacy registrations:", err);
			}
			return (await eventsApi.registrations()).map((item) => ({
				id: item.registration.id,
				eventId: item.registration.eventId,
				userId: "me",
				status: item.registration.status === "CONFIRMED" ? "REGISTERED" : item.registration.status,
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
						slug: item.event.organizationId
					}
				}
			}));
		}
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
			if (res.refundProcessed) toast.success("Registration cancelled & refund processed!", { description: `A refund of LKR ${res.refundedAmount || cancellingReg.payment?.amount || 0} has been initiated to the original payer.` });
			else toast.success("Registration cancelled successfully", { description: "Your spot has been released." });
			setCancellingReg(null);
			queryClient.invalidateQueries({ queryKey: ["registrations"] });
		} catch (err) {
			toast.error("Cancellation failed", { description: err?.message || "Could not cancel registration." });
		} finally {
			setIsCancelling(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "My registrations & admission passes",
			description: "View your digital entry passes, secure QR tokens, group tickets, and payment history."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": tab === t.id,
				onClick: () => setTab(t.id),
				className: cn("rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors", tab === t.id ? "bg-navy text-navy-foreground shadow-sm" : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border/50"),
				children: t.label
			}, t.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => query.refetch() }) : filteredRegistrations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, {
					className: "size-6",
					"aria-hidden": true
				}),
				title: registrations.length === 0 ? "No registrations yet" : "Nothing in this filter",
				description: registrations.length === 0 ? "Once you register for an opportunity or competition, your entry ticket and QR pass will appear here." : "Switch tabs to see your other registrations and passes.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/explore",
						children: "Explore opportunities"
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-4",
				children: filteredRegistrations.map((reg) => {
					const event = reg.event;
					const isClubTransfer = reg.payment?.provider === "CLUB_TRANSFER";
					const isAwaitingVerification = reg.payment?.status === "PROCESSING" || isClubTransfer && Boolean(reg.payment?.paymentProofUrl) && reg.payment?.status !== "FAILED" && reg.payment?.status !== "PAID";
					const isRejected = reg.payment?.status === "FAILED" || Boolean(reg.payment?.rejectionReason);
					const isPendingProof = reg.status === "PENDING_PAYMENT" && isClubTransfer && !reg.payment?.paymentProofUrl && !isRejected;
					const hasValidTicket = Boolean(reg.ticket) && reg.status === "REGISTERED";
					const isPaid = reg.payment && Number(reg.payment.amount) > 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "card-interactive rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:border-border/80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
									initials: event?.organization?.name ? event.organization.name.slice(0, 2).toUpperCase() : "CP",
									className: "size-11 shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-base font-bold leading-snug",
												children: event ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/events/$slug",
													params: { slug: event.slug },
													className: "hover:text-primary transition-colors",
													children: event.title
												}) : "Campus Event Opportunity"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 truncate text-xs text-muted-foreground",
											children: [
												event?.organization?.name || "Campus Organizer",
												" · ",
												event?.venue || event?.location || "Campus Venue"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground",
											children: [
												event?.startDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
														className: "size-3.5 text-primary",
														"aria-hidden": true
													}), event.endDate ? formatRange(event.startDate, event.endDate) : formatDate(event.startDate)]
												}),
												reg.isGroup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }), "Group Entry"]
												}),
												hasValidTicket && reg.ticket && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono font-bold text-foreground",
													children: reg.ticket.ticketNumber
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Registered ", formatDate(reg.registeredAt)] })
											]
										}),
										isRejected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 rounded-lg border border-rose-500/30 bg-rose-500/5 p-3 text-xs text-rose-800 dark:text-rose-200",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-300",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4 shrink-0" }), "Bank Slip Rejected by Club Officer"]
												}),
												reg.payment?.rejectionReason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-1 text-[11px] leading-relaxed font-medium",
													children: [
														"Reason: \"",
														reg.payment.rejectionReason,
														"\""
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 text-[10px] text-muted-foreground",
													children: "Please review your transfer details and resubmit a corrected deposit slip below."
												})
											]
										}),
										isAwaitingVerification && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-2.5 text-xs text-blue-800 dark:text-blue-200 flex items-start gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-blue-900 dark:text-blue-100",
													children: "Direct Bank Transfer Awaiting Officer Verification"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[11px] text-muted-foreground mt-0.5",
													children: [
														"Reference: ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-mono font-semibold text-foreground",
															children: reg.payment?.referenceNumber || reg.payment?.providerPaymentId || "Submitted"
														}),
														reg.payment?.transferDate ? ` · Date: ${formatDate(reg.payment.transferDate)}` : ""
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground mt-0.5",
													children: "The club treasurer is reconciling deposits with their bank account. Your official QR pass will be issued immediately upon confirmation."
												})
											] })]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex sm:flex-col items-end justify-between gap-2.5 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-1.5",
									children: [reg.ticket?.attendance?.status === "CHECKED_IN" || reg.status === "ATTENDED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30",
										children: "✓ Checked In"
									}) : isRejected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-3" }), "Slip Rejected"]
									}) : isAwaitingVerification ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), "Awaiting Verification"]
									}) : isPendingProof ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-3" }), "Deposit Slip Required"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("rounded-full px-2.5 py-1 text-xs font-bold", reg.status === "REGISTERED" && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30", reg.status === "PENDING_PAYMENT" && "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30", reg.status === "CANCELLED" && "bg-muted text-muted-foreground border border-border"),
										children: reg.status === "REGISTERED" ? "Confirmed" : reg.status === "PENDING_PAYMENT" ? "Pending Payment" : reg.status.toLowerCase()
									}), isPaid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("rounded-full px-2 py-0.5 text-[11px] font-semibold flex items-center gap-1", reg.payment?.status === "PAID" && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30", reg.payment?.status === "REFUNDED" && "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30", (isAwaitingVerification || reg.payment?.status === "PROCESSING") && "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30", isPendingProof && "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30", isRejected && "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30", reg.payment?.status === "PENDING" && !isClubTransfer && "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"),
										children: [isClubTransfer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-3" }), reg.payment?.status === "PAID" ? isClubTransfer ? `Club Transfer Verified (${reg.payment.currency} ${Number(reg.payment.amount).toLocaleString()})` : `Paid ${reg.payment.currency} ${Number(reg.payment.amount).toLocaleString()}` : isAwaitingVerification ? "Verification Pending" : isRejected ? "Slip Rejected" : isPendingProof ? "Transfer Due" : reg.payment?.status]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-slate-500/15 text-slate-600 dark:text-slate-400 px-2 py-0.5 text-[11px] font-semibold border border-slate-500/20",
										children: "Free Pass"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2 mt-1",
									children: [
										hasValidTicket && reg.status !== "CANCELLED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											className: "text-xs h-8 gap-1.5 bg-navy text-white hover:bg-navy/90 shadow-sm",
											onClick: () => setSelectedTicket({
												ticket: reg.ticket,
												registration: reg
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-3.5" }), "View Pass & QR"]
										}),
										reg.payment && (isRejected || isPendingProof) && isClubTransfer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											className: "text-xs h-8 gap-1.5 bg-amber-600 text-white hover:bg-amber-700 shadow-sm",
											onClick: () => setClaimModalData({
												paymentId: reg.payment.id,
												amount: reg.payment.amount,
												currency: reg.payment.currency,
												eventTitle: event?.title || "Event",
												bankDetails: event?.organization,
												previousRejectionReason: reg.payment?.rejectionReason || void 0
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }), isRejected ? "Resubmit Slip & Reference" : "Upload Bank Slip"]
										}),
										isPaid && reg.payment?.status === "PAID" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											variant: "outline",
											size: "sm",
											className: "text-xs h-8 gap-1 border-border",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/account/payments",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-3" }), "Receipt"]
											})
										}),
										reg.status !== "CANCELLED" && reg.status !== "ATTENDED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ghost",
											size: "sm",
											className: "text-xs h-8 text-muted-foreground hover:text-destructive",
											onClick: () => setCancellingReg(reg),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "size-3.5 mr-1" }), "Cancel"]
										})
									]
								})]
							})]
						})
					}, reg.id);
				})
			})
		}),
		selectedTicket && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketPassModal, {
			isOpen: Boolean(selectedTicket),
			onClose: () => setSelectedTicket(null),
			ticket: selectedTicket.ticket,
			eventTitle: selectedTicket.registration.event?.title,
			organizationName: selectedTicket.registration.event?.organization?.name,
			venue: selectedTicket.registration.event?.venue,
			dateRange: selectedTicket.registration.event?.startDate ? formatDate(selectedTicket.registration.event.startDate) : void 0,
			isGroup: selectedTicket.registration.isGroup,
			paymentAmount: selectedTicket.registration.payment?.amount,
			paymentCurrency: selectedTicket.registration.payment?.currency
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: Boolean(cancellingReg),
			onOpenChange: (open) => !open && setCancellingReg(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-md bg-card border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "flex items-center gap-2 text-base",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-5 text-destructive" }), "Cancel Registration?"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
					className: "text-xs text-muted-foreground mt-1.5 leading-relaxed",
					children: [
						"Are you sure you want to cancel your registration for",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: cancellingReg?.event?.title
						}),
						"?",
						cancellingReg?.payment && cancellingReg.payment.status === "PAID" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block mt-2 font-medium text-purple-600 dark:text-purple-400 bg-purple-500/10 p-2.5 rounded-lg border border-purple-500/20",
							children: [
								"💳 Refund Notice: Since you completed a payment of ",
								cancellingReg.payment.currency,
								" ",
								Number(cancellingReg.payment.amount).toLocaleString(),
								", an automated refund will be processed back to the original payment method and your ticket will be revoked."
							]
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "mt-4 flex flex-row gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "flex-1",
						onClick: () => setCancellingReg(null),
						disabled: isCancelling,
						children: "Keep Registration"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						className: "flex-1",
						onClick: handleConfirmCancel,
						disabled: isCancelling,
						children: isCancelling ? "Processing..." : "Confirm Cancellation"
					})]
				})]
			})
		}),
		claimModalData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitPaymentClaimDialog, {
			isOpen: Boolean(claimModalData),
			onClose: () => setClaimModalData(null),
			paymentId: claimModalData.paymentId,
			amount: claimModalData.amount,
			currency: claimModalData.currency,
			bankDetails: claimModalData.bankDetails,
			eventTitle: claimModalData.eventTitle,
			previousRejectionReason: claimModalData.previousRejectionReason,
			onClaimSubmitted: () => {
				setClaimModalData(null);
				queryClient.invalidateQueries({ queryKey: ["registrations"] });
				queryClient.invalidateQueries({ queryKey: ["payments"] });
			}
		})
	] });
}
//#endregion
export { RegistrationsPage as component };
