import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ShieldCheck, Dt as Eye, It as CreditCard, J as MapPin, Kt as CircleCheck, L as Plus, Q as Lock, T as Share2, Tt as FileCheck, V as Music, Vt as Clock, Wt as CircleX, f as Trash2, fn as Bookmark, ht as GraduationCap, kt as ExternalLink, ln as Building, m as Theater, mn as BookOpenCheck, on as CalendarDays, p as Ticket, pt as HeartHandshake, r as Users, u as Trophy, un as Building2, v as SquareCheckBig, xt as Flag, y as Sparkles, yn as Award } from "../_libs/lucide-react.mjs";
import { t as eventsApi } from "./events-Dtjwkx07.mjs";
import { t as CardSkeleton } from "./States-DTPgRZKE.mjs";
import { a as formatDateTime, i as formatDate, s as formatRange, t as compactNumber } from "./format-Cdcdxizs.mjs";
import { a as OpportunityTypeBadge, i as ModeBadge, l as VerificationBadge, n as DeadlineBadge, o as OrgAvatar, s as ScopeBadge, t as CategoryBadge } from "./Badges-Bz6vmcNI.mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as getEventLifecycle, t as OpportunityCard } from "./OpportunityCard-BUJW0Bsd.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-CeXuDfGc.mjs";
import { t as participationApi } from "./participation-B-nOVH-I.mjs";
import { t as directoryApi } from "./directory-BaY2c_G3.mjs";
import { t as Label } from "./label-Bi14Oc-S.mjs";
import { t as Textarea } from "./textarea-7zknwcEV.mjs";
import { n as TicketPassModal, t as SubmitPaymentClaimDialog } from "./SubmitPaymentClaimDialog-CgiJeEUx.mjs";
import { t as volunteeringApi } from "./volunteering-BxJ-nXuA.mjs";
import { t as Route } from "./events._slug-CqaAPIwi.mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events._slug-DReAYS7o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root.displayName;
function EventRegistrationModal({ event, isOpen, onClose, currentUser, onSuccess }) {
	const [regMode, setRegMode] = (0, import_react.useState)("individual");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [participantInput, setParticipantInput] = (0, import_react.useState)("");
	const [participants, setParticipants] = (0, import_react.useState)([]);
	const [pendingPayment, setPendingPayment] = (0, import_react.useState)(null);
	const [isVerifyingPayment, setIsVerifyingPayment] = (0, import_react.useState)(false);
	const [confirmedTicket, setConfirmedTicket] = (0, import_react.useState)(null);
	const isPaid = !event.isFree && event.price && Number(event.price) > 0;
	const unitPrice = isPaid ? Number(event.price) : 0;
	const totalDelegateCount = regMode === "individual" ? 1 : Math.max(1, participants.length + 1);
	const totalCost = unitPrice * totalDelegateCount;
	const paymentMethodChoice = "CLUB_TRANSFER";
	const [claimModalData, setClaimModalData] = (0, import_react.useState)(null);
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
	const handleRemoveParticipant = (idx) => {
		setParticipants(participants.filter((_, i) => i !== idx));
	};
	const handleRegisterSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			const isGroupReg = regMode === "group";
			const payload = {
				eventId: event.id,
				notes: notes.trim() || void 0,
				isGroup: isGroupReg,
				participantUserIds: isGroupReg ? participants : void 0,
				paymentMethod: isPaid ? paymentMethodChoice : void 0
			};
			const result = await participationApi.initiateRegistration(payload);
			if (result.requiresPayment && result.payment) {
				setClaimModalData({
					paymentId: result.payment.id,
					amount: result.payment.amount,
					currency: result.payment.currency,
					bankDetails: result.organizationBankDetails || result.bankDetails || event.organization
				});
				toast.info("Registration initiated! 🏦", { description: "Please transfer the fee to the club bank account and upload your deposit slip." });
			} else {
				toast.success("Registration confirmed! 🎟️", { description: result.message || "Your official admission pass has been issued." });
				if (result.tickets && result.tickets[0]) setConfirmedTicket(result.tickets[0]);
				onSuccess?.();
			}
		} catch (err) {
			toast.error("Registration failed", { description: err?.message || "Eligibility check failed or opportunity is full." });
		} finally {
			setSubmitting(false);
		}
	};
	const handleVerifyGatewayPayment = async () => {
		if (!pendingPayment) return;
		setIsVerifyingPayment(true);
		try {
			await participationApi.simulateSandboxPayment(pendingPayment.id);
			const statusRes = await participationApi.getPaymentStatus(pendingPayment.id);
			if (statusRes.status === "PAID") {
				toast.success("Payment verified & admission pass issued! 💳", { description: "Your cryptographic ticket and QR token have been activated." });
				const eventTicket = (await participationApi.getMyTickets()).find((t) => t.eventId === event.id);
				if (eventTicket) setConfirmedTicket(eventTicket);
				setPendingPayment(null);
				onSuccess?.();
			} else toast.warning(`Payment status: ${statusRes.status}`, { description: "Gateway webhook reconciliation is in progress." });
		} catch (err) {
			toast.error("Gateway verification failed", { description: err?.message || "Could not reconcile payment." });
		} finally {
			setIsVerifyingPayment(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: isOpen,
			onOpenChange: (open) => !open && onClose(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-lg bg-card border-border shadow-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 text-primary mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-wider",
							children: "Event Participation & Ticketing"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-lg font-black",
						children: event.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						className: "text-xs text-muted-foreground",
						children: [
							"Hosted by ",
							event.organizationName,
							" · ",
							event.universityName
						]
					})
				] }), pendingPayment ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-primary/20 bg-primary/5 p-4 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold uppercase tracking-wider text-muted-foreground block",
									children: "Amount Due"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-2xl font-black text-foreground mt-1",
									children: [
										pendingPayment.currency,
										" ",
										Number(pendingPayment.amount).toLocaleString()
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: [
										"1 Payment covering ",
										totalDelegateCount,
										" ",
										totalDelegateCount === 1 ? "delegate" : "delegates"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-muted/30 p-4 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold text-foreground",
									children: "Bank-Grade Server-Side Verification"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground leading-relaxed",
								children: "CampusPulse enforces strict server-side cryptographic webhook validation (HMAC-SHA256). We never trust the client to declare payment success. Your individual ticket and secure QR token are issued instantly upon gateway confirmation."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "pt-2 flex flex-col sm:flex-row gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "w-full sm:w-auto",
								onClick: () => setPendingPayment(null),
								children: "Back to Details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "w-full sm:flex-1 bg-navy text-white hover:bg-navy/90 font-bold gap-2",
								disabled: isVerifyingPayment,
								onClick: handleVerifyGatewayPayment,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-4" }), isVerifyingPayment ? "Verifying with Gateway…" : "Complete & Verify Payment"]
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleRegisterSubmit,
					className: "space-y-5 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 rounded-xl bg-muted/40 p-1 border border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setRegMode("individual"),
								className: cn("flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all", regMode === "individual" ? "bg-card text-foreground shadow-sm border border-border/80" : "text-muted-foreground hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4" }), "Individual Ticket"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setRegMode("group"),
								className: cn("flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all", regMode === "group" ? "bg-card text-foreground shadow-sm border border-border/80" : "text-muted-foreground hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }), "Group Delegation"]
							})]
						}),
						event.pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-primary/20 bg-primary/5 p-3.5 space-y-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-bold text-foreground flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-amber-500" }), "University Tiered Pricing"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-card/70 px-2 py-0.5 rounded border border-border/60",
										children: "Auto-Verified by Server"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-card border border-border/80 p-2.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block",
												children: "University Student"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-black text-foreground mt-0.5",
												children: event.studentPrice && Number(event.studentPrice) > 0 ? `Rs. ${Number(event.studentPrice).toLocaleString()}` : "FREE"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground",
												children: "Requires verified university email"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-card border border-border/80 p-2.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase font-bold text-muted-foreground block",
												children: "External Participant"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-black text-foreground mt-0.5",
												children: event.externalPrice ? `Rs. ${Number(event.externalPrice).toLocaleString()}` : "FREE"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground",
												children: "Standard delegate admission"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "* Final ticket category & price are evaluated server-side based on your verified university identity."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border/80 bg-surface p-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Admission Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold text-foreground mt-0.5",
								children: isPaid ? "Paid Delegate Pass" : "Free Admission Pass"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-muted-foreground",
									children: "Total Fee"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg font-black text-primary mt-0.5",
									children: isPaid ? `Rs. ${totalCost.toLocaleString()}` : "FREE"
								})]
							})]
						}),
						regMode === "group" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 rounded-xl border border-border bg-muted/20 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs font-bold uppercase tracking-wider",
										children: [
											"Delegation Members (",
											totalDelegateCount,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground mt-0.5",
										children: "Each participant will receive an individual ticket & secure QR pass upon payment."
									})] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-lg border border-border/60 bg-card p-2.5 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold text-foreground",
										children: [currentUser?.name || "You", " (Payer & Primary Delegate)"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded",
										children: "Primary"
									})]
								}),
								participants.map((pid, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-lg border border-border/60 bg-card p-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground truncate",
										children: pid
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										className: "h-6 w-6 p-0 text-muted-foreground hover:text-destructive",
										onClick: () => handleRemoveParticipant(idx),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
									})]
								}, idx)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Participant User ID or Email",
										value: participantInput,
										onChange: (e) => setParticipantInput(e.target.value),
										className: "text-xs h-9",
										onKeyDown: (e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												handleAddParticipant();
											}
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: handleAddParticipant,
										className: "h-9 text-xs shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5 mr-1" }), "Add Member"]
									})]
								})
							]
						}),
						isPaid && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: "Payment Method"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-xs text-foreground block",
										children: "Direct Bank Transfer to Club"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-muted-foreground",
										children: "Direct external transfer to the club's bank account"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground leading-relaxed",
									children: "Please use your mobile banking application or online banking to transfer the exact amount to the club. After proceeding, you will receive the bank account details to upload your transfer slip and transaction reference. An authorized club financial officer will verify your deposit before your ticket pass is issued."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "notes",
								className: "text-xs font-semibold",
								children: "Notes & Special Requirements (Optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "notes",
								placeholder: "Dietary requests, accessibility accommodations, or team notes...",
								value: notes,
								onChange: (e) => setNotes(e.target.value),
								className: "text-xs min-h-[70px] resize-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 border border-border/60 rounded-lg p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 shrink-0 text-primary mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] leading-relaxed",
								children: "All participants are independently evaluated against event eligibility criteria. Individual non-transferable digital passes are generated upon confirmation."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "pt-2 flex flex-col sm:flex-row gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								className: "w-full sm:w-auto",
								onClick: onClose,
								disabled: submitting,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full sm:flex-1 bg-navy text-white hover:bg-navy/90 font-bold",
								disabled: submitting,
								children: submitting ? "Evaluating Eligibility…" : isPaid ? `Proceed to Bank Transfer (${totalCost.toLocaleString()} LKR)` : "Confirm Free Registration 🎟️"
							})]
						})
					]
				})]
			})
		}),
		claimModalData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitPaymentClaimDialog, {
			isOpen: Boolean(claimModalData),
			onClose: () => {
				setClaimModalData(null);
				onClose();
			},
			paymentId: claimModalData.paymentId,
			amount: claimModalData.amount,
			currency: claimModalData.currency,
			bankDetails: claimModalData.bankDetails,
			eventTitle: event.title,
			onClaimSubmitted: () => {
				setClaimModalData(null);
				onClose();
				onSuccess?.();
			}
		}),
		confirmedTicket && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketPassModal, {
			isOpen: Boolean(confirmedTicket),
			onClose: () => {
				setConfirmedTicket(null);
				onClose();
			},
			ticket: confirmedTicket,
			eventTitle: event.title,
			organizationName: event.organizationName,
			venue: event.location,
			isGroup: regMode === "group",
			paymentAmount: isPaid ? totalCost : void 0,
			paymentCurrency: "LKR"
		})
	] });
}
function EventDetailPage() {
	const { user } = useAuth();
	const { event } = Route.useLoaderData();
	const [saved, setSaved] = (0, import_react.useState)(Boolean(event.bookmarked));
	const [reportOpen, setReportOpen] = (0, import_react.useState)(false);
	const [volunteerOpen, setVolunteerOpen] = (0, import_react.useState)(false);
	const [volunteerRole, setVolunteerRole] = (0, import_react.useState)(event.volunteerRoles?.[0] || "");
	const [volunteerAvailability, setVolunteerAvailability] = (0, import_react.useState)(event.volunteerAvailability || "");
	const [volunteerStatement, setVolunteerStatement] = (0, import_react.useState)("");
	const [volunteerSkills, setVolunteerSkills] = (0, import_react.useState)([]);
	const [skillInput, setSkillInput] = (0, import_react.useState)("");
	const [volunteerNotes, setVolunteerNotes] = (0, import_react.useState)("");
	const [submittingVolunteer, setSubmittingVolunteer] = (0, import_react.useState)(false);
	const [isRegistering, setIsRegistering] = (0, import_react.useState)(false);
	const [registerModalOpen, setRegisterModalOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		eventsApi.trackView(event.id);
	}, [event.id]);
	const rolesQuery = useQuery({
		queryKey: ["volunteering", "roles"],
		queryFn: () => volunteeringApi.getRoleTemplates()
	});
	const relatedQuery = useQuery({
		queryKey: [
			"events",
			"related",
			event.id
		],
		queryFn: () => eventsApi.related(event)
	});
	const eligibilityQuery = useQuery({
		queryKey: [
			"events",
			"eligibility",
			event.id,
			user?.id
		],
		queryFn: () => eventsApi.checkEligibility(event.id)
	});
	const myVolunteerAppsQuery = useQuery({
		queryKey: [
			"volunteering",
			"my-applications",
			user?.id
		],
		queryFn: () => volunteeringApi.getMyApplications(),
		enabled: !!user
	});
	const existingVolunteerApp = myVolunteerAppsQuery.data?.find((app) => app.eventId === event.id || app.event?.id === event.id);
	const eligibility = eligibilityQuery.data;
	const queryClient = useQueryClient();
	(0, import_react.useEffect)(() => {
		setSaved(Boolean(event.bookmarked));
	}, [event.bookmarked]);
	const toggleSave = async () => {
		const next = !saved;
		setSaved(next);
		try {
			await eventsApi.toggleBookmark(event.id, next);
			toast.success(next ? "Saved to your list" : "Removed from saved");
			queryClient.invalidateQueries({ queryKey: ["saved"] });
			queryClient.invalidateQueries({ queryKey: ["events"] });
			queryClient.invalidateQueries({ queryKey: ["feed"] });
		} catch {
			setSaved(!next);
			toast.error("Couldn't update your saved opportunities");
		}
	};
	const share = async () => {
		const url = typeof window !== "undefined" ? window.location.href : "";
		try {
			if (typeof navigator !== "undefined" && navigator.share) await navigator.share({
				title: event.title,
				url
			});
			else {
				await navigator.clipboard.writeText(url);
				toast.success("Link copied to clipboard");
			}
		} catch {}
	};
	const [reportReasonCategory, setReportReasonCategory] = (0, import_react.useState)("Misleading information");
	const [reportDetails, setReportDetails] = (0, import_react.useState)("");
	const [reportEvidenceUrl, setReportEvidenceUrl] = (0, import_react.useState)("");
	const [submittingReport, setSubmittingReport] = (0, import_react.useState)(false);
	const handleReportSubmit = async () => {
		if (!reportReasonCategory) {
			toast.error("Please select a reason for reporting.");
			return;
		}
		setSubmittingReport(true);
		try {
			await directoryApi.fileReport({
				targetType: "EVENT",
				targetId: event.id,
				reason: reportReasonCategory,
				details: reportDetails.trim() || void 0,
				evidenceUrl: reportEvidenceUrl.trim() || void 0
			});
			setReportOpen(false);
			setReportDetails("");
			setReportEvidenceUrl("");
			toast.success("Report submitted for review", { description: "Our moderation team will review your report and evidence." });
		} catch {
			toast.error("Failed to submit report. Please try again.");
		} finally {
			setSubmittingReport(false);
		}
	};
	const handleVolunteerSubmit = async () => {
		if (!user) {
			toast.error("Please sign in to apply as a volunteer.");
			return;
		}
		if (!volunteerRole.trim()) {
			toast.error("Please specify a volunteer role.");
			return;
		}
		setSubmittingVolunteer(true);
		try {
			await volunteeringApi.apply(event.id, {
				role: volunteerRole.trim(),
				availability: volunteerAvailability.trim() || void 0,
				skills: volunteerSkills.length > 0 ? volunteerSkills : void 0,
				statement: volunteerStatement.trim() || void 0,
				notes: volunteerNotes.trim() || void 0
			});
			setVolunteerOpen(false);
			toast.success("Volunteer Application Submitted! 🎉", { description: `Your application for "${volunteerRole.trim()}" has been submitted to ${event.organizationName}.` });
			queryClient.invalidateQueries({ queryKey: ["volunteering", "my-applications"] });
			queryClient.invalidateQueries({ queryKey: ["volunteering", "recommended"] });
			myVolunteerAppsQuery.refetch();
		} catch (err) {
			toast.error("Application failed", { description: err?.message || "Could not submit volunteer application." });
		} finally {
			setSubmittingVolunteer(false);
		}
	};
	const lifecycle = getEventLifecycle(event);
	const [posterError, setPosterError] = (0, import_react.useState)(false);
	const posterSrc = !posterError ? event.posterUrl || event.coverImageUrl || event.bannerUrl : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Breadcrumb",
				className: "text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/explore",
						className: "hover:text-foreground hover:underline",
						children: "Explore"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2",
						"aria-hidden": true,
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: event.categoryName
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "mt-4 rounded-2xl border border-border/80 bg-card overflow-hidden shadow-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-[1fr_420px] items-stretch",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 sm:p-9 flex flex-col justify-between space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide border", lifecycle.variant === "ongoing" && "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30", lifecycle.variant === "upcoming" && "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30", lifecycle.variant === "finished" && "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30", lifecycle.variant === "cancelled" && "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30"),
											children: [lifecycle.variant === "ongoing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "relative flex size-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-emerald-500" })]
											}), lifecycle.label]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryBadge, { name: event.categoryName }),
										event.opportunityType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityTypeBadge, { type: event.opportunityType }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeBadge, { mode: event.mode }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeBadge, { scope: event.participationScope }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadlineBadge, { deadline: event.registrationDeadline })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl text-foreground",
									children: event.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base",
									children: event.summary || event.description?.slice(0, 200)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2 pt-3 border-t border-border/70 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-foreground font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatRange(event.startDate, event.endDate) })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-foreground font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: event.location || event.venue || (event.mode === "ONLINE" ? "Online Virtual Meeting" : event.universityName)
										})]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/70",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/organizations/$slug",
								params: { slug: event.organizationId },
								className: "flex min-w-0 items-center gap-3 hover:opacity-85 transition-opacity",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
									initials: event.organizationInitials,
									className: "size-9 text-xs"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate text-sm font-bold text-foreground",
											children: event.organizationName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationBadge, { verified: event.organizationVerified })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-xs text-muted-foreground",
										children: event.universityName
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: toggleSave,
									className: cn("gap-1.5 font-semibold text-xs h-9", saved && "text-primary border-primary"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: cn("size-4", saved && "fill-primary text-primary") }), saved ? "Saved" : "Save"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: share,
									className: "gap-1.5 font-semibold text-xs h-9",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), "Share"]
								})]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative bg-muted lg:border-l border-border/80 flex items-center justify-center overflow-hidden min-h-[260px] lg:min-h-full",
						children: posterSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: posterSrc,
							alt: event.title,
							onError: () => setPosterError(true),
							className: "w-full h-full object-cover max-h-[440px] lg:max-h-none"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full h-full flex flex-col items-center justify-center p-8 text-white bg-gradient-to-br from-slate-800 via-indigo-950 to-slate-900 min-h-[260px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-full bg-white/15 p-4 backdrop-blur-md shadow-inner",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-10 text-white/90" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-3 text-sm font-black tracking-wider uppercase text-white/90",
								children: event.categoryName || event.opportunityType || "CampusPulse Event"
							})]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "About this opportunity",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whitespace-pre-line text-sm leading-relaxed text-muted-foreground",
								children: event.description
							})
						}),
						(event.opportunityType === "MUSIC" || Array.isArray(event.artistNames) && event.artistNames.length > 0 || event.musicGenre) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Live Music & Performer Lineup",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-pink-500/25 bg-pink-500/5 p-5 space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-pink-700 dark:text-pink-300 font-bold text-xs uppercase tracking-wider",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Concert & Entertainment Showcase" })]
										}),
										Array.isArray(event.artistNames) && event.artistNames.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
											children: "Featured Artists & Performing Bands"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2.5 flex flex-wrap gap-2",
											children: event.artistNames.map((artist) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 rounded-lg border border-pink-500/30 bg-card px-3 py-1.5 text-xs font-bold text-foreground shadow-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "flex size-5 items-center justify-center rounded-full bg-pink-500/15 text-pink-600 text-[10px]",
													children: "🎵"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: artist })]
											}, artist))
										})] }),
										event.musicGenre && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-semibold text-muted-foreground",
												children: "Music Genre / Style:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-md bg-pink-500/10 border border-pink-500/20 px-2.5 py-0.5 text-xs font-bold text-pink-700 dark:text-pink-300",
												children: event.musicGenre
											})]
										}),
										event.performanceSchedule && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-2 border-t border-border/70 space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
												children: "Performance Schedule & Set Times"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "whitespace-pre-line text-xs leading-relaxed text-foreground bg-surface/50 rounded-lg p-3 border border-border/60",
												children: event.performanceSchedule
											})]
										})
									]
								})
							})
						}),
						(event.opportunityType === "DRAMA" || event.productionTitle || event.dramaGenre) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Drama & Theatre Production Showcase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-violet-500/25 bg-violet-500/5 p-5 space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 text-violet-700 dark:text-violet-300 font-bold text-xs uppercase tracking-wider",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Theater, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: event.productionTitle || "Theatrical Production" })]
											}), event.dramaGenre && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-md bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 text-xs font-bold text-violet-700 dark:text-violet-300",
												children: event.dramaGenre
											})]
										}),
										event.director && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-semibold text-muted-foreground",
												children: "Directed / Produced by:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold text-foreground",
												children: event.director
											})]
										}),
										Array.isArray(event.castMembers) && event.castMembers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
											children: "Cast Members & Principal Performers"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2.5 flex flex-wrap gap-2",
											children: event.castMembers.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded-lg border border-violet-500/30 bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-xs",
												children: ["🎭 ", member]
											}, member))
										})] }),
										event.synopsis && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-2 border-t border-border/70 space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
												children: "Synopsis & Story Overview"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "whitespace-pre-line text-xs leading-relaxed text-foreground bg-surface/50 rounded-lg p-3 border border-border/60",
												children: event.synopsis
											})]
										})
									]
								})
							})
						}),
						(event.opportunityType === "HIGHER_STUDIES" || event.programType || event.degreeAwarded) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Academic Program & Admissions Information",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-sky-500/25 bg-sky-500/5 p-5 space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 text-sky-700 dark:text-sky-300 font-bold text-xs uppercase tracking-wider",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [event.programType || "Postgraduate", " Opportunity"] })]
											}), event.fundingType && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded-md bg-sky-500/15 border border-sky-500/30 px-3 py-1 text-xs font-bold text-sky-700 dark:text-sky-300",
												children: ["🎓 ", event.fundingType]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [
												event.degreeAwarded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-lg border border-border/70 bg-card p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] font-semibold uppercase text-muted-foreground",
														children: "Degree Awarded"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-bold text-foreground mt-0.5",
														children: event.degreeAwarded
													})]
												}),
												event.studyMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-lg border border-border/70 bg-card p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] font-semibold uppercase text-muted-foreground",
														children: "Study Mode"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-bold text-foreground mt-0.5",
														children: event.studyMode
													})]
												}),
												event.programDuration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-lg border border-border/70 bg-card p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] font-semibold uppercase text-muted-foreground",
														children: "Expected Duration"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-bold text-foreground mt-0.5",
														children: event.programDuration
													})]
												}),
												event.intakePeriod && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-lg border border-border/70 bg-card p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] font-semibold uppercase text-muted-foreground",
														children: "Intake Period"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-bold text-foreground mt-0.5",
														children: event.intakePeriod
													})]
												})
											]
										}),
										event.tuitionFee && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border/70 bg-muted/40 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-semibold uppercase text-muted-foreground",
												children: "Tuition Fee"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-bold text-foreground mt-0.5",
												children: event.tuitionFee
											})]
										}),
										event.scholarshipDetails && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-3.5" }), " Scholarship & Stipend Package"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-foreground leading-relaxed whitespace-pre-line",
												children: event.scholarshipDetails
											})]
										}),
										event.entryQualifications && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5 pt-2 border-t border-border/70",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
												className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, { className: "size-3.5 text-primary" }), " Minimum Entry Qualifications"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "whitespace-pre-line text-xs leading-relaxed text-foreground bg-card rounded-lg p-3 border border-border/70",
												children: event.entryQualifications
											})]
										}),
										event.applicationRequirements && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5 pt-2 border-t border-border/70",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
												className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { className: "size-3.5 text-primary" }), " Application Documents & Checklist"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "whitespace-pre-line text-xs leading-relaxed text-foreground bg-card rounded-lg p-3 border border-border/70",
												children: event.applicationRequirements
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap gap-2 pt-2",
											children: [event.officialApplicationUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												size: "sm",
												className: "bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs gap-1.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: event.officialApplicationUrl,
													target: "_blank",
													rel: "noopener noreferrer",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), "Apply on Official University Portal"]
												})
											}), event.programUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												variant: "outline",
												size: "sm",
												className: "text-xs font-bold gap-1.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: event.programUrl,
													target: "_blank",
													rel: "noopener noreferrer",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), "Official Program Page & Brochure"]
												})
											})]
										})
									]
								})
							})
						}),
						(event.opportunityType === "UNIVERSITY_COURSE" || event.courseLevel) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "University Course & Learning Curriculum",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-teal-500/25 bg-teal-500/5 p-5 space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 text-teal-700 dark:text-teal-300 font-bold text-xs uppercase tracking-wider",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenCheck, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: event.courseLevel || "University Course" })]
											}), event.hasCertificate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded-md bg-teal-500/15 border border-teal-500/30 px-3 py-1 text-xs font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-3.5" }), " Verified Digital Certificate Included"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [
												event.courseCode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-lg border border-border/70 bg-card p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] font-semibold uppercase text-muted-foreground",
														children: "Course Code"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-bold text-foreground mt-0.5",
														children: event.courseCode
													})]
												}),
												event.courseDuration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-lg border border-border/70 bg-card p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] font-semibold uppercase text-muted-foreground",
														children: "Duration & Schedule"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-bold text-foreground mt-0.5",
														children: event.courseDuration
													})]
												}),
												event.workloadHoursPerWeek && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-lg border border-border/70 bg-card p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] font-semibold uppercase text-muted-foreground",
														children: "Workload"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-bold text-foreground mt-0.5",
														children: event.workloadHoursPerWeek
													})]
												}),
												event.instructor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-lg border border-border/70 bg-card p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] font-semibold uppercase text-muted-foreground",
														children: "Lead Instructor"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-bold text-foreground mt-0.5",
														children: event.instructor
													})]
												})
											]
										}),
										event.prerequisites && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5 pt-2 border-t border-border/70",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
												children: "Prerequisites & Target Audience"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "whitespace-pre-line text-xs leading-relaxed text-foreground bg-card rounded-lg p-3 border border-border/70",
												children: event.prerequisites
											})]
										}),
										event.syllabus && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5 pt-2 border-t border-border/70",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
												children: "Syllabus & Core Modules"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "whitespace-pre-line text-xs leading-relaxed text-foreground bg-card rounded-lg p-3 border border-border/70",
												children: event.syllabus
											})]
										}),
										event.enrollmentUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												size: "sm",
												className: "bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs gap-1.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: event.enrollmentUrl,
													target: "_blank",
													rel: "noopener noreferrer",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), "Enroll on Official Course Portal"]
												})
											})
										})
									]
								})
							})
						}),
						(event.opportunityType === "VOLUNTEERING" || Array.isArray(event.volunteerRoles) && event.volunteerRoles.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Volunteer Opportunity & Open Tracks",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-xl border border-rose-500/20 bg-gradient-to-r from-rose-500/10 via-primary/5 to-transparent p-4 sm:p-5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-500",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-6" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400",
													children: "Recruitment Call"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
													className: "text-base font-bold text-foreground",
													children: [
														"Join the ",
														event.organizationName,
														" Volunteer Crew"
													]
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												className: "bg-rose-600 hover:bg-rose-700 text-white font-semibold",
												onClick: () => setVolunteerOpen(true),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-4 mr-1.5" }), "Apply for a Role"]
											})]
										})
									}),
									Array.isArray(event.volunteerRoles) && event.volunteerRoles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
										children: "Available Volunteer Roles & Squads"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 flex flex-wrap gap-2",
										children: event.volunteerRoles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setVolunteerRole(role);
												setVolunteerOpen(true);
											},
											className: cn("rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all hover:scale-[1.02]", volunteerRole === role ? "border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400" : "border-border/80 bg-card hover:border-rose-500/50 hover:bg-rose-500/5"),
											children: role
										}, role))
									})] }),
									Array.isArray(event.volunteerResponsibilities) && event.volunteerResponsibilities.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
										children: "Core Responsibilities & Duties"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-2.5 space-y-2 text-xs text-muted-foreground",
										children: event.volunteerResponsibilities.map((resp, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 shrink-0 text-rose-500 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: resp })]
										}, i))
									})] }),
									Array.isArray(event.volunteerBenefits) && event.volunteerBenefits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
										children: "Volunteer Benefits & Recognition"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2.5 grid gap-2.5 sm:grid-cols-2",
										children: event.volunteerBenefits.map((benefit, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5 rounded-lg border border-border/70 bg-card/60 p-2.5 text-xs font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 shrink-0 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: benefit })]
										}, i))
									})] }),
									(event.volunteerAvailability || event.volunteerCapacity) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 sm:grid-cols-2 pt-1 border-t border-border/70",
										children: [event.volunteerAvailability && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border/70 bg-muted/30 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
												children: "Time & Availability Requirement"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs font-medium text-foreground",
												children: event.volunteerAvailability
											})]
										}), event.volunteerCapacity && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border/70 bg-muted/30 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
												children: "Volunteer Capacity"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-xs font-medium text-foreground",
												children: [
													"Recruiting up to ",
													event.volunteerCapacity,
													" student volunteers"
												]
											})]
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Eligibility & Participation Rules",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/80 bg-muted/40 p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
												children: "Participation Rule"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-bold text-foreground",
												children: event.eligibilitySummary || eligibility?.summary || "Open to all university students"
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeBadge, { scope: event.participationScope })]
									}),
									eligibility ? eligibility.isEligible === true ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-emerald-950 dark:text-emerald-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs leading-relaxed",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold",
												children: "You are eligible to register!"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-0.5 text-emerald-800/80 dark:text-emerald-300/80",
												children: "Your university affiliation and profile meet all eligibility requirements for this opportunity."
											})]
										})]
									}) : eligibility.isEligible === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-lg border border-destructive/30 bg-destructive/10 p-3.5 text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold",
												children: "You do not meet the criteria to register:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "mt-1.5 list-disc space-y-1 pl-4 text-xs",
												children: eligibility.reasons.map((reason, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: reason }, idx))
											})] })]
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-info/30 bg-info/10 p-3 text-xs text-info",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign in with your university account to verify your personal eligibility." })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "sm",
											variant: "outline",
											className: "h-7 text-xs",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/login",
												children: "Sign In"
											})
										})]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 pt-2 sm:grid-cols-2",
										children: [
											event.allowedUniversities && event.allowedUniversities.length > 0 || event.participationScope === "UNIVERSITY_ONLY" || event.participationScope === "SELECTED_UNIVERSITIES" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg border border-border/70 bg-card p-3.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1.5 text-xs font-semibold text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5" }), " Eligible Universities"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-2 flex flex-wrap gap-1.5",
													children: event.allowedUniversities && event.allowedUniversities.length > 0 ? event.allowedUniversities.map((uni) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded border border-border/80 bg-secondary/60 px-2 py-0.5 text-xs font-medium",
														children: uni.name
													}, uni.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded border border-border/80 bg-secondary/60 px-2 py-0.5 text-xs font-medium",
														children: event.universityName
													})
												})]
											}) : null,
											event.allowedAcademicYears && event.allowedAcademicYears.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg border border-border/70 bg-card p-3.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1.5 text-xs font-semibold text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-3.5" }), " Permitted Batches / Years"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-2 flex flex-wrap gap-1.5",
													children: event.allowedAcademicYears.map((yr) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded border border-border/80 bg-secondary/60 px-2 py-0.5 text-xs font-medium",
														children: yr
													}, yr))
												})]
											}) : null,
											event.requiredSkills && event.requiredSkills.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg border border-border/70 bg-card p-3.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1.5 text-xs font-semibold text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Required Skills"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-2 flex flex-wrap gap-1.5",
													children: event.requiredSkills.map((sk) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded border border-border/80 bg-secondary/60 px-2 py-0.5 text-xs font-medium",
														children: sk
													}, sk))
												})]
											}) : null,
											event.minTeamSize || event.maxTeamSize || event.teamSize ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg border border-border/70 bg-card p-3.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1.5 text-xs font-semibold text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }), " Team Participation Limits"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-xs font-medium",
													children: event.minTeamSize && event.maxTeamSize ? `Squads of ${event.minTeamSize} to ${event.maxTeamSize} members` : event.teamSize || "Individual or Squad registration"
												})]
											}) : null
										]
									}),
									event.eligibility && event.eligibility.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-muted-foreground",
											children: "Additional Organizer Guidelines:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "mt-1.5 space-y-1.5 text-xs text-muted-foreground",
											children: event.eligibility.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"aria-hidden": true,
													className: "mt-1.5 size-1 shrink-0 rounded-full bg-primary"
												}), item]
											}, item))
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Requirements",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2 text-sm text-muted-foreground",
								children: event.requirements.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": true,
										className: "mt-2 size-1.5 shrink-0 rounded-full bg-primary"
									}), item]
								}, item))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Timeline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "relative space-y-5 border-l border-border pl-6",
								children: event.timeline.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": true,
										className: "absolute -left-[7px] mt-1.5 size-3.5 rounded-full border-2 border-background bg-primary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: step.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: formatDate(step.date)
									})
								] }, step.label))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Organiser",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, { initials: event.organizationInitials }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-semibold",
											children: event.organizationName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-xs text-muted-foreground",
											children: event.universityName
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									size: "sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/organizations/$slug",
										params: { slug: event.organizationId },
										children: "View organiser"
									})
								})]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "mt-8 lg:mt-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:sticky lg:top-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-card p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
										className: "space-y-4 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
												icon: CalendarDays,
												label: "Dates",
												value: formatRange(event.startDate, event.endDate)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
												icon: Clock,
												label: "Registration closes",
												value: formatDateTime(event.registrationDeadline)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
												icon: MapPin,
												label: "Location",
												value: event.location
											}),
											event.prize && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
												icon: Trophy,
												label: "Prize pool",
												value: event.prize
											}),
											event.teamSize && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
												icon: Users,
												label: "Team size",
												value: event.teamSize
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
												icon: Eye,
												label: "Interest",
												value: `${compactNumber(event.views)} views · ${compactNumber(event.registrations)} registered`
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-5" }),
									event.officialApplicationUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											className: "w-full bg-sky-600 hover:bg-sky-700 text-white font-bold gap-2",
											size: "lg",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: event.officialApplicationUrl,
												target: "_blank",
												rel: "noopener noreferrer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), " Apply on University Portal"]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											className: "w-full text-xs",
											size: "sm",
											disabled: Boolean(user) && eligibility?.isEligible === false,
											onClick: () => setRegisterModalOpen(true),
											children: "Register for Info Session / Updates"
										})]
									}) : event.enrollmentUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											className: "w-full bg-teal-600 hover:bg-teal-700 text-white font-bold gap-2",
											size: "lg",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: event.enrollmentUrl,
												target: "_blank",
												rel: "noopener noreferrer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), " Enroll on Course Portal"]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											className: "w-full text-xs",
											size: "sm",
											disabled: Boolean(user) && eligibility?.isEligible === false,
											onClick: () => setRegisterModalOpen(true),
											children: "CampusPulse Registration"
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-full",
										size: "lg",
										disabled: Boolean(user) && eligibility?.isEligible === false,
										onClick: () => setRegisterModalOpen(true),
										children: user && eligibility?.isEligible === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }), " Ineligible to Register"]
										}) : event.opportunityType === "MUSIC" || event.opportunityType === "DRAMA" ? event.isFree ? "Register for Free Ticket" : "Get Tickets" : "Register now"
									}),
									user && eligibility?.isEligible === false && !event.officialApplicationUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-center text-xs text-destructive",
										children: "Registration locked: You do not meet the opportunity eligibility criteria."
									}),
									(event.opportunityType === "VOLUNTEERING" || Array.isArray(event.volunteerRoles) && event.volunteerRoles.length > 0 || Boolean(event.volunteerCapacity && event.volunteerCapacity > 0)) && (existingVolunteerApp && (existingVolunteerApp.status === "PENDING" || existingVolunteerApp.status === "ACCEPTED") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "outline",
										className: cn("mt-2 w-full", existingVolunteerApp.status === "ACCEPTED" ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 font-semibold" : "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 font-semibold"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/account/volunteering",
											children: existingVolunteerApp.status === "ACCEPTED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 mr-2" }), "Volunteer Crew Member 🎫"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-amber-500 mr-2" }), "Volunteer Request Pending ⏳"] })
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										className: "mt-2 w-full border-dashed border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10",
										onClick: () => {
											if (!user) {
												toast.error("Please sign in to apply as a volunteer.");
												return;
											}
											setVolunteerOpen(true);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-4 text-rose-500 mr-2" }), "Apply as Volunteer"]
									})),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 grid grid-cols-2 gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											onClick: toggleSave,
											"aria-pressed": saved,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: saved ? "size-4 fill-current" : "size-4" }), saved ? "Saved" : "Save"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											onClick: share,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), "Share"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
										open: volunteerOpen,
										onOpenChange: setVolunteerOpen,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
											className: "max-w-lg max-h-[90vh] overflow-y-auto",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 text-rose-500 mb-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-bold uppercase tracking-wider",
															children: "Volunteer Application"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Apply for Volunteer Crew" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
														"Join the event organizing crew for \"",
														event.title,
														"\" hosted by ",
														event.organizationName,
														"."
													] })
												] }),
												user && eligibility?.isEligible === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "rounded-lg border border-destructive/30 bg-destructive/10 p-3.5 text-destructive text-xs",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-start gap-2.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-bold",
															children: "Ineligible to apply:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
															className: "mt-1 list-disc pl-4 space-y-0.5",
															children: eligibility.reasons.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: r }, i))
														})] })]
													})
												}) : null,
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-4 py-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "space-y-2",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																	htmlFor: "volunteer-role",
																	children: "Select Volunteer Role *"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 rounded-md border border-border/70 bg-muted/20",
																	children: (event.volunteerRoles && event.volunteerRoles.length > 0 ? event.volunteerRoles : rolesQuery.data?.map((r) => r.name) || [
																		"Registration Desk",
																		"Event Support",
																		"Technical Support",
																		"Photography",
																		"Videography",
																		"Social Media",
																		"Marketing",
																		"Crowd Management",
																		"Event Setup",
																		"Workshop Assistant",
																		"Team Leader"
																	]).map((roleName) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																		type: "button",
																		onClick: () => setVolunteerRole(roleName),
																		className: cn("rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors", volunteerRole === roleName ? "border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold" : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"),
																		children: roleName
																	}, roleName))
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	id: "volunteer-role",
																	placeholder: "Or type a custom role (e.g. Stage Sound Engineer, Livestream Operator)",
																	value: volunteerRole,
																	onChange: (e) => setVolunteerRole(e.target.value),
																	className: "mt-1.5"
																})
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "space-y-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																	htmlFor: "volunteer-skills",
																	children: "Relevant Skills & Experience"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex gap-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																		id: "volunteer-skills",
																		placeholder: "Type a skill and press Enter (e.g. Photography, Audio, Fast Typing)",
																		value: skillInput,
																		onChange: (e) => setSkillInput(e.target.value),
																		onKeyDown: (e) => {
																			if (e.key === "Enter") {
																				e.preventDefault();
																				if (skillInput.trim() && !volunteerSkills.includes(skillInput.trim())) {
																					setVolunteerSkills([...volunteerSkills, skillInput.trim()]);
																					setSkillInput("");
																				}
																			}
																		}
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																		type: "button",
																		variant: "secondary",
																		size: "sm",
																		onClick: () => {
																			if (skillInput.trim() && !volunteerSkills.includes(skillInput.trim())) {
																				setVolunteerSkills([...volunteerSkills, skillInput.trim()]);
																				setSkillInput("");
																			}
																		},
																		children: "Add"
																	})]
																}),
																volunteerSkills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "flex flex-wrap gap-1.5 pt-1",
																	children: volunteerSkills.map((sk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs text-primary font-medium",
																		children: [sk, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																			type: "button",
																			onClick: () => setVolunteerSkills(volunteerSkills.filter((s) => s !== sk)),
																			className: "text-primary hover:text-destructive",
																			children: "×"
																		})]
																	}, sk))
																})
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "space-y-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																	htmlFor: "volunteer-avail",
																	children: "Availability & Shifts"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "flex flex-wrap gap-1.5 mb-1.5",
																	children: [
																		"Full Day on Event Dates",
																		"Morning Shift (8AM - 1PM)",
																		"Afternoon Shift (1PM - 6PM)",
																		"Rehearsal + Full Event"
																	].map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																		type: "button",
																		onClick: () => setVolunteerAvailability(preset),
																		className: "rounded border border-border/80 bg-secondary/50 px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground hover:bg-secondary",
																		children: preset
																	}, preset))
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	id: "volunteer-avail",
																	placeholder: "e.g. All day Saturday, Weekday evenings after 4 PM",
																	value: volunteerAvailability,
																	onChange: (e) => setVolunteerAvailability(e.target.value)
																})
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "space-y-1.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																htmlFor: "volunteer-statement",
																children: "Statement of Motivation"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
																id: "volunteer-statement",
																placeholder: "Why are you interested in this role and what past relevant experiences do you bring?...",
																rows: 3,
																value: volunteerStatement,
																onChange: (e) => setVolunteerStatement(e.target.value)
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "space-y-1.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																htmlFor: "volunteer-notes",
																children: "Equipment or Additional Notes (Optional)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																id: "volunteer-notes",
																placeholder: "e.g. Will bring Canon EOS R6 with 24-70mm lens and flash unit",
																value: volunteerNotes,
																onChange: (e) => setVolunteerNotes(e.target.value)
															})]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
													className: "mt-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "outline",
														onClick: () => setVolunteerOpen(false),
														children: "Cancel"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														disabled: submittingVolunteer || Boolean(user) && eligibility?.isEligible === false,
														className: "bg-rose-600 hover:bg-rose-700 text-white font-semibold",
														onClick: handleVolunteerSubmit,
														children: submittingVolunteer ? "Submitting…" : "Submit Application"
													})]
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
										open: reportOpen,
										onOpenChange: setReportOpen,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "ghost",
												className: "mt-2 w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4" }), "Report this listing"]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Report this event" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Help maintain platform integrity. Reports create a moderation record for admin review." })] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-3.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "report-reason-select",
															children: "Reason for report *"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
															id: "report-reason-select",
															value: reportReasonCategory,
															onChange: (e) => setReportReasonCategory(e.target.value),
															className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Fake event",
																	children: "Fake event"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Misleading information",
																	children: "Misleading information"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Organization is not actually associated",
																	children: "Organization is not actually associated"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Impersonation",
																	children: "Impersonation"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Wrong ticket information",
																	children: "Wrong ticket information"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Suspicious payment request",
																	children: "Suspicious payment request"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Incorrect event information",
																	children: "Incorrect event information"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Inappropriate content",
																	children: "Inappropriate content"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Spam",
																	children: "Spam"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Other",
																	children: "Other"
																})
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "report-details",
															children: "Description / Explanation"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
															id: "report-details",
															placeholder: "Provide details about why you are reporting this event...",
															rows: 3,
															value: reportDetails,
															onChange: (e) => setReportDetails(e.target.value)
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																htmlFor: "report-evidence",
																children: "Evidence URL (Optional)"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																id: "report-evidence",
																type: "url",
																placeholder: "e.g. Official Instagram post, society Facebook link, or club website",
																value: reportEvidenceUrl,
																onChange: (e) => setReportEvidenceUrl(e.target.value)
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[11px] text-muted-foreground",
																children: "Optional link to substantiate your report (Instagram, Facebook, or web page)."
															})
														]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
												className: "mt-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "outline",
													onClick: () => setReportOpen(false),
													children: "Cancel"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "destructive",
													disabled: submittingReport || !reportReasonCategory,
													onClick: handleReportSubmit,
													children: submittingReport ? "Submitting…" : "Submit report"
												})]
											})
										] })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Event Trust Indicators" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "space-y-1.5 text-xs text-foreground/80",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"University Affiliated (",
												event.universityName,
												")"
											] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"Organized by ",
												event.organizationName,
												" Member"
											] })]
										}),
										event.organizationVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verified University Society" })]
										}),
										(event.isReviewed || event.eventVerificationStatus === "VERIFIED") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-primary",
												children: "Admin Reviewed & Verified"
											})]
										})
									]
								})]
							}),
							(event.contactEmail || event.contactPhone || event.instagramUrl || event.facebookUrl || event.websiteUrl || event.supportingLecturer) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 rounded-xl border border-border bg-card p-4 space-y-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-foreground",
									children: "Supporting Contacts & Links"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 text-muted-foreground",
									children: [
										event.contactEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Email: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: `mailto:${event.contactEmail}`,
											className: "text-primary hover:underline",
											children: event.contactEmail
										})] }),
										event.contactPhone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Phone: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: event.contactPhone })] }),
										event.supportingLecturer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Advisor/Lecturer: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: event.supportingLecturer })] }),
										event.instagramUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Instagram: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: event.instagramUrl,
											target: "_blank",
											rel: "noreferrer",
											className: "text-primary hover:underline",
											children: event.instagramUrl
										})] }),
										event.facebookUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Facebook: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: event.facebookUrl,
											target: "_blank",
											rel: "noreferrer",
											className: "text-primary hover:underline",
											children: event.facebookUrl
										})] }),
										event.websiteUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Website: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: event.websiteUrl,
											target: "_blank",
											rel: "noreferrer",
											className: "text-primary hover:underline",
											children: event.websiteUrl
										})] })
									]
								})]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-extrabold tracking-tight",
					children: "Related opportunities"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: [relatedQuery.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardSkeleton, {}), (relatedQuery.data ?? []).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityCard, { event: e }, e.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-16 z-30 border-t border-border bg-card/95 p-3 backdrop-blur lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						"aria-label": "Save opportunity",
						onClick: toggleSave,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: saved ? "size-4 fill-current" : "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "flex-1",
						disabled: Boolean(user) && eligibility?.isEligible === false,
						onClick: () => setRegisterModalOpen(true),
						children: user && eligibility?.isEligible === false ? "Ineligible to Register" : "Register now"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventRegistrationModal, {
				event,
				isOpen: registerModalOpen,
				onClose: () => setRegisterModalOpen(false),
				currentUser: user,
				onSuccess: () => void eligibilityQuery.refetch()
			})
		]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-bold tracking-tight",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children
		})]
	});
}
function Detail({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "mt-0.5 size-4 shrink-0 text-muted-foreground",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-xs uppercase tracking-wide text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "text-sm font-medium",
				children: value
			})]
		})]
	});
}
//#endregion
export { EventDetailPage as component };
