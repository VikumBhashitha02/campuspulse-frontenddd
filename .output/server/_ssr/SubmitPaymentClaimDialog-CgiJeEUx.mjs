import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { C as ShieldCheck, Ct as FileText, F as Printer, It as CreditCard, J as MapPin, Kt as CircleCheck, Rt as Copy, Vt as Clock, Wt as CircleX, c as Upload, d as TriangleAlert, en as Check, ln as Building, on as CalendarDays, p as Ticket, qt as CircleAlert, r as Users } from "../_libs/lucide-react.mjs";
import { i as formatDate } from "./format-Cdcdxizs.mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CeXuDfGc.mjs";
import { t as participationApi } from "./participation-B-nOVH-I.mjs";
import { t as Label } from "./label-Bi14Oc-S.mjs";
import { t as QrCode } from "./QrCode-mVtdT2hS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SubmitPaymentClaimDialog-CgiJeEUx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TICKET_STATUS_CONFIG = {
	ISSUED: {
		label: "Valid Admission Pass",
		badgeClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
		icon: CircleCheck
	},
	USED: {
		label: "Attended / Checked In",
		badgeClass: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30",
		icon: CircleCheck
	},
	CANCELLED: {
		label: "Registration Cancelled",
		badgeClass: "bg-destructive/15 text-destructive border border-destructive/30",
		icon: CircleX
	},
	REVOKED: {
		label: "Pass Revoked / Refunded",
		badgeClass: "bg-destructive/15 text-destructive border border-destructive/30",
		icon: CircleAlert
	}
};
function TicketPassModal({ ticket, isOpen, onClose, eventTitle, organizationName, venue, dateRange, isGroup, registeredByName, paymentAmount, paymentCurrency = "LKR" }) {
	if (!ticket) return null;
	const copyToClipboard = (text, label) => {
		navigator.clipboard.writeText(text);
		toast.success(`${label} copied to clipboard!`);
	};
	const statusConfig = TICKET_STATUS_CONFIG[ticket.status] || TICKET_STATUS_CONFIG.ISSUED;
	const StatusIcon = statusConfig.icon;
	const resolvedEventTitle = eventTitle || ticket.event?.title || "Campus Opportunity Event";
	const resolvedOrgName = organizationName || ticket.event?.organization?.name || "CampusPulse Organization";
	const resolvedVenue = venue || ticket.event?.venue || ticket.event?.location || "Venue Announced on Acceptance";
	const resolvedDate = dateRange || (ticket.event?.startDate ? formatDate(ticket.event.startDate) : "See Event Schedule");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: isOpen,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md p-0 overflow-hidden bg-card border-border shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative bg-gradient-to-br from-navy via-slate-900 to-indigo-950 p-6 text-white text-center border-b border-indigo-900/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-3.5" }), "CAMPUSPULSE OFFICIAL ADMISSION PASS"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-black tracking-tight leading-snug",
							children: resolvedEventTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-slate-300 font-medium",
							children: resolvedOrgName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 bg-white/10 rounded-md px-2.5 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3.5 text-slate-400" }), resolvedDate]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 bg-white/10 rounded-md px-2.5 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 text-slate-400" }), resolvedVenue]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative rounded-2xl border-2 border-border bg-white p-4 shadow-lg dark:border-slate-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, {
								value: ticket.qrToken,
								size: 185,
								fgColor: "#0f172a",
								bgColor: "#ffffff",
								className: "rounded-lg"
							}), ticket.status !== "ISSUED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 bg-white/85 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center p-4 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, { className: "size-8 text-destructive mb-1" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold uppercase tracking-wider text-destructive",
										children: statusConfig.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground mt-0.5",
										children: ticket.status === "USED" ? "Ticket already used for door check-in" : "Ticket is no longer active"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 text-center w-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest block",
									children: "Ticket Pass Identifier"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-2 mt-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base font-mono font-black text-foreground tracking-wide",
										children: ticket.ticketNumber
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => copyToClipboard(ticket.ticketNumber, "Ticket Number"),
										className: "text-muted-foreground hover:text-foreground transition-colors p-0.5",
										title: "Copy ticket number",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap justify-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: cn("inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-bold", statusConfig.badgeClass),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, { className: "size-3" }), statusConfig.label]
										}),
										isGroup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30 px-3 py-0.5 text-xs font-bold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3" }), "Group Delegate Pass"]
										}),
										paymentAmount && Number(paymentAmount) > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-3 py-0.5 text-xs font-bold",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-3" }),
												"Paid · ",
												paymentCurrency,
												" ",
												Number(paymentAmount).toLocaleString()
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex items-center gap-1 rounded-full bg-slate-500/15 text-slate-700 dark:text-slate-300 border border-slate-500/30 px-3 py-0.5 text-xs font-bold",
											children: "Free Pass"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 w-full rounded-xl border border-border/80 bg-muted/30 p-3.5 space-y-2 text-xs",
							children: [
								ticket.user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Attendee:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: ticket.user.name
									})]
								}),
								registeredByName && registeredByName !== ticket.user?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Registered By:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: registeredByName
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Issued At:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: formatDate(ticket.issuedAt)
									})]
								}),
								ticket.attendance?.checkInTime && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Door Check-In Time:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(ticket.attendance.checkInTime) })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 w-full rounded-xl border border-border/60 bg-muted/20 p-2.5 flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block",
									children: "Cryptographic Token"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-mono text-[11px] text-foreground mt-0.5 font-medium",
									children: ticket.qrToken
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								className: "h-7 shrink-0 text-xs gap-1",
								onClick: () => copyToClipboard(ticket.qrToken, "Secure QR Token"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" }), "Copy"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 w-full flex items-start gap-2 text-xs text-muted-foreground bg-primary/5 border border-primary/15 rounded-lg p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 shrink-0 text-primary mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] leading-relaxed",
								children: "Present this digital pass at the entrance. The event organizer will scan the QR code to verify your spot and check you in."
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "p-4 border-t border-border bg-muted/20 flex flex-row gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "flex-1 text-xs gap-1.5",
						onClick: () => window.print(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-3.5" }), "Print Pass"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "default",
						className: "flex-1 text-xs",
						onClick: onClose,
						children: "Done"
					})]
				})
			]
		})
	});
}
function SubmitPaymentClaimDialog({ isOpen, onClose, paymentId, amount, currency, eventTitle = "Campus Event", organizationName = "Society / Club", bankDetails, customInstructions, existingRejectionReason, previousRejectionReason, existingReference, onSuccess, onClaimSubmitted }) {
	const [file, setFile] = (0, import_react.useState)(null);
	const [referenceNumber, setReferenceNumber] = (0, import_react.useState)(existingReference || "");
	const [transferDate, setTransferDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [payerNotes, setPayerNotes] = (0, import_react.useState)("");
	const [isUploading, setIsUploading] = (0, import_react.useState)(false);
	const [isSubmitted, setIsSubmitted] = (0, import_react.useState)(false);
	const [copiedField, setCopiedField] = (0, import_react.useState)(null);
	const handleCopy = (text, label) => {
		navigator.clipboard.writeText(text);
		setCopiedField(label);
		setTimeout(() => setCopiedField(null), 2e3);
	};
	const handleFileChange = (e) => {
		const selected = e.target.files?.[0];
		if (!selected) return;
		if (selected.size > 5242880) {
			toast.error("File is too large", { description: "Payment slip must be smaller than 5MB." });
			return;
		}
		if (![
			"image/jpeg",
			"image/png",
			"image/webp",
			"application/pdf"
		].includes(selected.type) && !selected.name.match(/\.(jpg|jpeg|png|webp|pdf)$/i)) {
			toast.error("Invalid file format", { description: "Please upload a JPEG, PNG, WEBP image or PDF document." });
			return;
		}
		setFile(selected);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) {
			toast.error("Payment slip required", { description: "Please upload a clear photo or PDF of your bank deposit slip or transfer receipt." });
			return;
		}
		if (!referenceNumber.trim()) {
			toast.error("Transaction reference required", { description: "Please enter the bank transaction reference or deposit slip number." });
			return;
		}
		setIsUploading(true);
		try {
			const proofUrl = (await participationApi.uploadPaymentProof(file)).url;
			await participationApi.submitDirectPaymentClaim(paymentId, {
				paymentProofUrl: proofUrl,
				referenceNumber: referenceNumber.trim(),
				transferDate: transferDate ? new Date(transferDate).toISOString() : void 0,
				payerNotes: payerNotes.trim() || void 0
			});
			toast.success("Payment proof submitted successfully! 📋", { description: "An authorized financial officer will verify your bank deposit." });
			setIsSubmitted(true);
			onSuccess?.();
			onClaimSubmitted?.();
		} catch (err) {
			toast.error("Submission failed", { description: err?.message || "Could not submit payment claim. Please verify reference number uniqueness." });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: isOpen,
		onOpenChange: (open) => !open && handleModalClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg bg-card border-border shadow-2xl max-h-[90vh] overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-2 text-primary mb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold uppercase tracking-wider",
						children: "Direct Bank Transfer to Club"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-lg font-black",
					children: eventTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
					className: "text-xs text-muted-foreground",
					children: ["Beneficiary Society: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-foreground",
						children: organizationName
					})]
				})
			] }), isSubmitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-6 text-center space-y-4 animate-in fade-in-50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-bold text-foreground",
							children: "Payment Proof Submitted Successfully"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed",
							children: [
								"Your deposit slip and reference number ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-bold text-foreground",
									children: referenceNumber
								}),
								" have been queued for verification."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-left space-y-1 text-xs text-amber-800 dark:text-amber-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 shrink-0 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verification in Progress" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] leading-relaxed text-muted-foreground",
							children: [
								"Your admission QR pass is ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: "not valid"
								}),
								" until an authorized financial officer confirms receipt of funds in the club bank account. You will receive an in-app confirmation once verified."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
						className: "pt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleModalClose,
							className: "w-full bg-navy text-white hover:bg-navy/90 font-bold",
							children: "Close & View Registrations"
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-4 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-primary/20 bg-primary/5 p-3.5 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block",
							children: "Payable Amount"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xl font-black text-foreground",
							children: [
								currency,
								" ",
								Number(amount).toLocaleString(void 0, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 text-xs font-bold",
							children: "Direct to Club"
						})]
					}),
					existingRejectionReason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-destructive/40 bg-destructive/10 p-3.5 space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-xs font-bold text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Previous Payment Claim Rejected" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-foreground bg-card/60 p-2 rounded border border-destructive/20 font-medium",
								children: [
									"\"",
									existingRejectionReason,
									"\""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Please review the reason above, upload a clearer slip or correct the transaction reference, and resubmit."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border/80 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-bold text-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-4 text-primary" }), "Official Club Bank Account"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20",
									children: "Verified"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] uppercase font-bold text-muted-foreground block",
											children: "Bank"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground",
											children: bankDetails?.bankName || "Bank of Ceylon"
										}),
										bankDetails?.bankBranch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground block text-[11px]",
											children: ["Branch: ", bankDetails.bankBranch]
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase font-bold text-muted-foreground block",
										children: "Beneficiary Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground truncate block",
										children: bankDetails?.bankAccountName || organizationName
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2 rounded-lg bg-surface p-2.5 border border-border/80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] uppercase font-bold text-muted-foreground block",
											children: "Account Number"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-2 mt-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-base font-black text-primary tracking-wider",
												children: bankDetails?.bankAccountNumber || "Pending Club Setup"
											}), bankDetails?.bankAccountNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												type: "button",
												variant: "ghost",
												size: "sm",
												onClick: () => handleCopy(bankDetails.bankAccountNumber, "acc"),
												className: "h-7 px-2 text-xs gap-1",
												children: [copiedField === "acc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copiedField === "acc" ? "Copied" : "Copy"]
											})]
										})]
									})
								]
							}),
							(customInstructions || bankDetails?.paymentInstructions) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 border-t border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase font-bold text-muted-foreground block mb-1",
									children: "Payment Instructions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground leading-relaxed italic bg-muted/40 p-2.5 rounded-lg border border-border/60",
									children: [
										"\"",
										customInstructions || bankDetails?.paymentInstructions,
										"\""
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "slip-upload",
							className: "text-xs font-bold text-foreground block",
							children: "Upload Transfer Slip / Receipt *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors", file ? "border-emerald-500/50 bg-emerald-500/5" : "border-border hover:border-primary/50 bg-muted/20"),
							onClick: () => document.getElementById("slip-upload")?.click(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "slip-upload",
								type: "file",
								accept: "image/jpeg,image/png,image/webp,application/pdf",
								onChange: handleFileChange,
								className: "hidden"
							}), file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-8 text-emerald-500 mx-auto" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-foreground truncate max-w-xs mx-auto",
										children: file.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-muted-foreground",
										children: [(file.size / 1024).toFixed(1), " KB · Click to change slip"]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-7 text-muted-foreground mx-auto" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-foreground",
										children: "Click or drag deposit slip here"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground",
										children: "JPG, PNG, WEBP or PDF (max 5MB)"
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "bank-ref",
								className: "text-xs font-bold text-foreground",
								children: "Bank Transaction Reference / Slip Number *"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "bank-ref",
								placeholder: "e.g. BOC-TXN-938210 or 004829",
								value: referenceNumber,
								onChange: (e) => setReferenceNumber(e.target.value),
								className: "text-xs font-mono font-bold",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: "Must be unique per transaction. Used by the officer to identify your payment."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "transfer-date",
								className: "text-xs font-bold text-foreground",
								children: "Transfer Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "transfer-date",
								type: "date",
								value: transferDate,
								onChange: (e) => setTransferDate(e.target.value),
								className: "text-xs"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "payer-notes",
								className: "text-xs font-bold text-foreground",
								children: "Notes for Officer (Optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "payer-notes",
								placeholder: "e.g. Paid from HNB app",
								value: payerNotes,
								onChange: (e) => setPayerNotes(e.target.value),
								className: "text-xs"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-muted/30 p-2.5 flex items-center gap-2 text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Your receipt will only be viewable by authorized financial officers of ",
							organizationName,
							"."
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "pt-2 flex flex-col sm:flex-row gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: handleModalClose,
							disabled: isUploading,
							className: "w-full sm:w-auto text-xs",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							disabled: isUploading,
							className: "w-full sm:flex-1 bg-navy text-white hover:bg-navy/90 font-bold text-xs h-9 gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), isUploading ? "Uploading & Submitting…" : "Submit Payment Slip"]
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { TicketPassModal as n, SubmitPaymentClaimDialog as t };
