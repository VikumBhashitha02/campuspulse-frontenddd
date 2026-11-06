import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ShieldCheck, F as Printer, G as MessageSquare, J as MapPin, Kt as CircleCheck, P as QrCode, Rt as Copy, Vt as Clock, Wt as CircleX, Zt as ChevronRight, ct as Info, en as Check, l as Undo2, on as CalendarDays, p as Ticket, pt as HeartHandshake, x as SlidersHorizontal, y as Sparkles, yn as Award } from "../_libs/lucide-react.mjs";
import { a as PageHeader, n as EmptyState, o as RowSkeleton, r as ErrorState } from "./States-DTPgRZKE.mjs";
import { i as formatDate } from "./format-Cdcdxizs.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CeXuDfGc.mjs";
import { t as QrCode$1 } from "./QrCode-mVtdT2hS.mjs";
import { t as volunteeringApi } from "./volunteering-BxJ-nXuA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.volunteering-fPCcCrNv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_CONFIG = {
	PENDING: {
		label: "Under Review",
		badgeClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
		icon: Clock,
		description: "The organizing committee is reviewing your application."
	},
	ACCEPTED: {
		label: "Accepted & Assigned",
		badgeClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
		icon: CircleCheck,
		description: "Congratulations! You are officially part of the event crew."
	},
	REJECTED: {
		label: "Not Selected",
		badgeClass: "bg-destructive/15 text-destructive border border-destructive/30",
		icon: CircleX,
		description: "Thank you for applying. The team reached maximum volunteer capacity."
	},
	WITHDRAWN: {
		label: "Withdrawn",
		badgeClass: "bg-muted text-muted-foreground border border-border",
		icon: Undo2,
		description: "You withdrew this volunteer application."
	},
	COMPLETED: {
		label: "Service Completed",
		badgeClass: "bg-primary/15 text-primary border border-primary/30",
		icon: Award,
		description: "Volunteer service successfully completed and verified on your student profile!"
	}
};
var ATTENDANCE_STATUS_CONFIG = {
	NOT_CHECKED_IN: {
		label: "Ready for Check-In",
		badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
	},
	CHECKED_IN: {
		label: "Checked-In & On Duty",
		badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
	},
	CHECKED_OUT: {
		label: "Shift Completed (Checked Out)",
		badgeClass: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30"
	},
	COMPLETED: {
		label: "Verified & Completed",
		badgeClass: "bg-primary/15 text-primary border border-primary/30"
	}
};
var TABS = [
	{
		id: "recommended",
		label: "Recommended for You ✨"
	},
	{
		id: "all",
		label: "All Applications"
	},
	{
		id: "active",
		label: "Active & Pending"
	},
	{
		id: "accepted",
		label: "Accepted & Crew 🎫"
	},
	{
		id: "completed",
		label: "Completed"
	},
	{
		id: "verified",
		label: "Verified Experience 🎖️"
	},
	{
		id: "preferences",
		label: "Availability & Privacy ⚙️"
	}
];
function VolunteeringPage() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [tab, setTab] = (0, import_react.useState)("recommended");
	const [withdrawingApp, setWithdrawingApp] = (0, import_react.useState)(null);
	const [isWithdrawing, setIsWithdrawing] = (0, import_react.useState)(false);
	const [viewingTicketAppId, setViewingTicketAppId] = (0, import_react.useState)(null);
	const [viewingCertExp, setViewingCertExp] = (0, import_react.useState)(null);
	const appsQuery = useQuery({
		queryKey: [
			"volunteering",
			"my-applications",
			user?.id
		],
		queryFn: () => volunteeringApi.getMyApplications(),
		enabled: !!user
	});
	const recsQuery = useQuery({
		queryKey: [
			"volunteering",
			"recommended",
			user?.id
		],
		queryFn: () => volunteeringApi.getRecommendedOpportunities({ limit: 12 }),
		enabled: !!user
	});
	const verifiedHistoryQuery = useQuery({
		queryKey: [
			"volunteering",
			"verified-history",
			user?.id
		],
		queryFn: () => volunteeringApi.getVerifiedVolunteerHistory(),
		enabled: !!user
	});
	const ticketQuery = useQuery({
		queryKey: [
			"volunteering",
			"ticket",
			viewingTicketAppId,
			user?.id
		],
		queryFn: () => viewingTicketAppId ? volunteeringApi.getVolunteerTicket(viewingTicketAppId) : null,
		enabled: Boolean(viewingTicketAppId && user)
	});
	const prefsQuery = useQuery({
		queryKey: [
			"volunteering",
			"preferences",
			user?.id
		],
		queryFn: () => volunteeringApi.getPreferences(),
		enabled: !!user
	});
	const [prefForm, setPrefForm] = (0, import_react.useState)({
		isVolunteerAvailable: true,
		volunteerAvailability: "FLEXIBLE",
		profileVisibility: "CAMPUS",
		volunteerBio: ""
	});
	const [isSavingPrefs, setIsSavingPrefs] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (prefsQuery.data) setPrefForm({
			isVolunteerAvailable: prefsQuery.data.isVolunteerAvailable ?? true,
			volunteerAvailability: prefsQuery.data.volunteerAvailability ?? "FLEXIBLE",
			profileVisibility: prefsQuery.data.profileVisibility ?? "CAMPUS",
			volunteerBio: prefsQuery.data.volunteerBio ?? ""
		});
	}, [prefsQuery.data]);
	const handleSavePreferences = async (e) => {
		e.preventDefault();
		setIsSavingPrefs(true);
		try {
			await volunteeringApi.updatePreferences(prefForm);
			toast.success("Volunteer preferences updated", { description: "Your discovery availability and privacy controls have been saved." });
			queryClient.invalidateQueries({ queryKey: ["volunteering", "preferences"] });
			queryClient.invalidateQueries({ queryKey: ["volunteering", "recommended"] });
		} catch (err) {
			toast.error("Failed to update preferences", { description: err?.message || "Could not save settings." });
		} finally {
			setIsSavingPrefs(false);
		}
	};
	const applications = appsQuery.data ?? [];
	const recommendedItems = recsQuery.data?.items ?? [];
	const verifiedExperiences = verifiedHistoryQuery.data ?? [];
	const filteredApps = applications.filter((app) => {
		if (tab === "active") return app.status === "PENDING";
		if (tab === "accepted") return app.status === "ACCEPTED";
		if (tab === "completed") return app.status === "COMPLETED";
		return true;
	});
	const handleWithdraw = async () => {
		if (!withdrawingApp) return;
		setIsWithdrawing(true);
		try {
			await volunteeringApi.withdraw(withdrawingApp.id);
			toast.success("Application withdrawn successfully", { description: "You can re-apply in the future if your availability changes." });
			setWithdrawingApp(null);
			queryClient.invalidateQueries({ queryKey: ["volunteering", "my-applications"] });
		} catch (err) {
			toast.error("Withdrawal failed", { description: err?.message || "Could not withdraw volunteer application." });
		} finally {
			setIsWithdrawing(false);
		}
	};
	const copyToClipboard = (text, label) => {
		navigator.clipboard.writeText(text);
		toast.success(`${label} copied to clipboard!`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "My Volunteering & Crew Matching",
			description: "Discover tailored volunteer calls, access digital crew passes & QR codes, manage discovery, and review verified service certificates."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": tab === t.id,
				onClick: () => setTab(t.id),
				className: cn("rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors", tab === t.id ? "bg-navy text-navy-foreground shadow-sm" : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground"),
				children: t.label
			}, t.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6",
			children: [
				tab === "recommended" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: recsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : recsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => recsQuery.refetch() }) : recommendedItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						className: "size-6 text-primary",
						"aria-hidden": true
					}),
					title: "No recommended volunteer opportunities right now",
					description: "We match opportunities using your skills, university, faculty, and availability. Update your volunteer profile or explore all events.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setTab("preferences"),
							children: "Update Volunteer Preferences"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/explore",
								children: "Explore All Opportunities"
							})
						})]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Opportunities scored using explainable multi-signal matching (skills match, host university eligibility, previous volunteer history, and availability)."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setTab("preferences"),
						className: "text-xs gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5" }), "Tune Match Signals"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: recommendedItems.map((rec) => {
						const event = rec.event;
						const matchColorClass = rec.matchPercentage >= 75 ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" : rec.matchPercentage >= 50 ? "bg-primary/15 text-primary border-primary/30" : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:border-border/80 hover:shadow-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border", matchColorClass),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }),
											rec.matchPercentage,
											"% Match"
										]
									}), rec.deadlineUrgencyDays !== null && rec.deadlineUrgencyDays !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("text-[11px] font-medium px-2 py-0.5 rounded border", rec.deadlineUrgencyDays <= 3 ? "bg-rose-500/10 text-rose-600 border-rose-500/20 font-semibold" : "bg-muted text-muted-foreground border-border"),
										children: rec.deadlineUrgencyDays === 0 ? "Deadline today!" : `Deadline in ${rec.deadlineUrgencyDays}d`
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 text-base font-bold leading-snug line-clamp-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/events/$slug",
										params: { slug: event.slug },
										className: "hover:text-primary transition-colors",
										children: event.title
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										event.organizationName || "Campus Organization",
										" ·",
										" ",
										event.universityName || "Sri Lanka"
									]
								}),
								rec.reasons && rec.reasons.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 rounded-lg border border-primary/15 bg-primary/5 p-2.5 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-primary block mb-1",
										children: "Why it matches your profile:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "space-y-1 text-muted-foreground",
										children: rec.reasons.slice(0, 3).map((r, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-1.5 text-[11px] leading-tight",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-emerald-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r })]
										}, idx))
									})]
								}),
								event.volunteerRoles && event.volunteerRoles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] uppercase tracking-wider font-semibold text-muted-foreground",
										children: "Open Roles:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 flex flex-wrap gap-1",
										children: event.volunteerRoles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-secondary/80 px-2 py-0.5 text-[11px] font-medium",
											children: role
										}, role))
									})]
								}),
								rec.matchingSkills && rec.matchingSkills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2.5 flex flex-wrap items-center gap-1 text-[11px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Matching skills:"
									}), rec.matchingSkills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-2.5" }), s]
									}, s))]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex items-center justify-between gap-3 border-t border-border pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] text-muted-foreground flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }), event.location || (event.mode === "ONLINE" ? "Online" : "Campus")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "sm",
									className: "h-8 gap-1.5 text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/events/$slug",
										params: { slug: event.slug },
										children: ["Apply as Volunteer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3" })]
									})
								})]
							})]
						}, event.id);
					})
				})] }) }),
				tab === "verified" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: verifiedHistoryQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : verifiedHistoryQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => verifiedHistoryQuery.refetch() }) : verifiedExperiences.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {
						className: "size-6 text-amber-500",
						"aria-hidden": true
					}),
					title: "No verified volunteer experiences yet",
					description: "When you complete your volunteer service and the event organizers confirm your hours, non-spoofable verified records and digital certificates will be awarded here.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/explore",
							children: "Explore Volunteer Opportunities"
						})
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Official volunteer records verified directly by registered university student societies and event organizers."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 border border-emerald-500/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }),
							verifiedExperiences.length,
							" Verified Experience",
							verifiedExperiences.length === 1 ? "" : "s"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: verifiedExperiences.map((exp) => {
						const hours = exp.hours ?? 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:border-border/80",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid size-11 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-6" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-base font-bold leading-snug",
													children: exp.eventSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/events/$slug",
														params: { slug: exp.eventSlug },
														className: "hover:text-primary transition-colors",
														children: exp.eventTitle
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: exp.eventTitle })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }), "VERIFIED RECORD"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-0.5 text-xs text-muted-foreground",
												children: exp.organizationName
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-2 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary border border-primary/20",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
												hours.toFixed(1),
												" Hours Verified"
											]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 grid gap-3 rounded-lg border border-border/70 bg-muted/20 p-3.5 sm:grid-cols-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
											children: "Assigned Role"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-bold text-foreground mt-0.5",
											children: exp.role
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
											children: "Verified Status"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5",
											children: exp.status.replace("_", " ")
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
											children: "Verified Date"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-foreground mt-0.5",
											children: exp.verifiedAt ? formatDate(exp.verifiedAt) : "Completed"
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Event Date: ", formatDate(exp.date)] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-2",
										children: exp.certificate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											className: "h-8 gap-1.5 text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-sm",
											onClick: () => setViewingCertExp(exp),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-3.5" }), "View Digital Certificate 🏅"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "sm",
											className: "h-8 gap-1.5 text-xs font-semibold",
											onClick: () => setViewingCertExp(exp),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-3.5 text-primary" }), "View Credential"]
										})
									})]
								})
							]
						}, exp.id);
					})
				})] }) }),
				tab === "preferences" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-10 place-items-center rounded-lg bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-bold",
								children: "Volunteer Availability & Privacy Controls"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Control who can discover you for university event crews and configure your volunteer availability."
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSavePreferences,
							className: "mt-6 space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-4 rounded-lg border border-border bg-muted/30 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "avail-toggle",
										className: "text-sm font-semibold cursor-pointer",
										children: "Open to Volunteer Opportunities"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: "When enabled, your profile can receive matching volunteer recommendations and appear in organizers' \"Find Volunteers\" search based on your privacy settings."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "avail-toggle",
										type: "checkbox",
										checked: prefForm.isVolunteerAvailable,
										onChange: (e) => setPrefForm({
											...prefForm,
											isVolunteerAvailable: e.target.checked
										}),
										className: "size-5 rounded border-border accent-primary cursor-pointer mt-0.5"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "avail-schedule",
									className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5",
									children: "Your Typical Volunteer Availability"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "avail-schedule",
									value: prefForm.volunteerAvailability || "FLEXIBLE",
									onChange: (e) => setPrefForm({
										...prefForm,
										volunteerAvailability: e.target.value
									}),
									className: "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "FLEXIBLE",
											children: "Flexible / Whenever Needed"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "WEEKENDS",
											children: "Weekends Only (Saturday & Sunday)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "WEEKDAYS",
											children: "Weekdays (Monday to Friday)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "EVENINGS",
											children: "Evenings & After Class"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2",
									children: "Volunteer Discovery Visibility"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2.5",
									children: [
										{
											val: "CAMPUS",
											title: "Campus Only (Recommended)",
											desc: "Visible only to verified organizers and student clubs from your own university.",
											badge: "Standard"
										},
										{
											val: "ORGANIZATIONS_ONLY",
											title: "Inter-Campus Student Clubs & Organizers",
											desc: "Visible to verified student organizations across all partner universities in Sri Lanka.",
											badge: "Recommended for inter-campus hackathons"
										},
										{
											val: "PUBLIC",
											title: "Public Community",
											desc: "Discoverable by all campus community members and student event organizers.",
											badge: "Maximum reach"
										},
										{
											val: "PRIVATE",
											title: "Private (Hidden from Discovery)",
											desc: "Never appear in organizer candidate search. You can still apply directly to open volunteer calls.",
											badge: "Stealth"
										}
									].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: cn("flex items-start gap-3 rounded-lg border p-3.5 cursor-pointer transition-colors", prefForm.profileVisibility === opt.val ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: "profileVisibility",
											value: opt.val,
											checked: prefForm.profileVisibility === opt.val,
											onChange: (e) => setPrefForm({
												...prefForm,
												profileVisibility: e.target.value
											}),
											className: "mt-1 size-4 accent-primary"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-semibold",
													children: opt.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground",
													children: opt.badge
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground mt-0.5",
												children: opt.desc
											})]
										})]
									}, opt.val))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "vol-bio",
									className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5",
									children: "Volunteer Bio & Experiences (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: "vol-bio",
									rows: 3,
									placeholder: "Tell student societies what roles you excel at (e.g. event photography, stage logistics, technical desk, crowd coordination)...",
									value: prefForm.volunteerBio || "",
									onChange: (e) => setPrefForm({
										...prefForm,
										volunteerBio: e.target.value
									}),
									className: "w-full rounded-lg border border-border bg-surface p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3.5 text-xs text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-emerald-700 dark:text-emerald-300",
										children: "Privacy Guarantee: "
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground leading-relaxed",
										children: "Your phone number, residential address, and private email are strictly hidden from candidate searches. Only your university, faculty, verified skills, and volunteer track record are shared with approved student organizers."
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-3 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => setTab("recommended"),
										children: "Back to Recommendations"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										disabled: isSavingPrefs,
										className: "gap-2",
										children: isSavingPrefs ? "Saving..." : "Save Volunteer Preferences"
									})]
								})
							]
						})]
					})
				}),
				tab !== "recommended" && tab !== "preferences" && tab !== "verified" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: appsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : appsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => appsQuery.refetch() }) : filteredApps.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, {
						className: "size-6 text-rose-500",
						"aria-hidden": true
					}),
					title: applications.length === 0 ? "No volunteer applications yet" : "No applications in this tab",
					description: applications.length === 0 ? "Explore university hackathons, conferences, and career expos looking for passionate student volunteer leaders." : "Switch to another tab to view your other volunteer applications.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/explore",
							children: "Discover Volunteer Calls"
						})
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-4",
					children: filteredApps.map((app) => {
						const statusCfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.PENDING;
						const StatusIcon = statusCfg.icon;
						const attendanceCfg = app.participation?.attendanceStatus ? ATTENDANCE_STATUS_CONFIG[app.participation.attendanceStatus] : null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:border-border/80",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-base font-bold leading-snug",
													children: app.eventSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/events/$slug",
														params: { slug: app.eventSlug },
														className: "hover:underline hover:text-primary transition-colors",
														children: app.eventTitle || "Campus Opportunity"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: app.eventTitle || "Campus Opportunity" })
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-0.5 text-xs text-muted-foreground",
												children: [
													app.eventOrganizationName || "Organizing Committee",
													" ·",
													" ",
													app.eventUniversityName || "Sri Lanka"
												]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2 shrink-0",
										children: [attendanceCfg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold", attendanceCfg.badgeClass),
											children: attendanceCfg.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", statusCfg.badgeClass),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, { className: "size-3.5" }), statusCfg.label]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 grid gap-3 rounded-lg border border-border/70 bg-muted/30 p-3.5 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: "Requested Role"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-foreground",
										children: app.role
									})] }), app.assignedRole ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400",
										children: "Official Assigned Role"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold text-emerald-700 dark:text-emerald-300",
										children: app.assignedRole
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: "Availability"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-foreground",
										children: app.availability || "Full event commitment"
									})] })]
								}),
								app.skills && app.skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground mr-1",
										children: "Provided Skills:"
									}), app.skills.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded border border-border/80 bg-secondary/70 px-2 py-0.5 text-[11px] font-medium",
										children: skill
									}, skill))]
								}),
								app.statement && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 text-xs text-muted-foreground leading-relaxed",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: "Your Statement: "
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "italic",
										children: [
											"\"",
											app.statement,
											"\""
										]
									})]
								}),
								app.feedback && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-start gap-2.5 rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4 shrink-0 text-primary mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-primary",
										children: "Organizer Feedback / Instructions:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-muted-foreground",
										children: app.feedback
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3.5 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-x-4 gap-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Applied on ", formatDate(app.appliedAt || app.createdAt)] }),
											app.respondedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Reviewed ", formatDate(app.respondedAt)] }),
											app.participation?.ticketNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-primary font-semibold",
												children: ["Pass: ", app.participation.ticketNumber]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [
											(app.status === "ACCEPTED" || app.status === "COMPLETED") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												className: "h-8 gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm",
												onClick: () => setViewingTicketAppId(app.id),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-3.5" }), "View Crew Pass & QR"]
											}),
											app.eventSlug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												variant: "outline",
												size: "sm",
												className: "h-8 text-xs",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/events/$slug",
													params: { slug: app.eventSlug },
													children: "View Event"
												})
											}),
											app.status === "PENDING" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												className: "h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive",
												onClick: () => setWithdrawingApp(app),
												children: "Withdraw"
											})
										]
									})]
								})
							]
						}, app.id);
					})
				}) })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: Boolean(viewingTicketAppId),
			onOpenChange: (o) => !o && setViewingTicketAppId(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
				className: "max-w-md p-0 overflow-hidden bg-card border-border",
				children: ticketQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {})
				}) : ticketQuery.isError || !ticketQuery.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => ticketQuery.refetch() })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative bg-gradient-to-br from-navy via-slate-900 to-indigo-950 p-6 text-white text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30 mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-3.5" }), "OFFICIAL CREW PASS"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-black tracking-tight",
								children: ticketQuery.data.eventTitle || ticketQuery.data.event?.title || "Volunteer Opportunity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-slate-300",
								children: ticketQuery.data.organizationName || ticketQuery.data.event?.organization?.name || "Official Host"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 inline-block rounded-md bg-white/10 px-3 py-1 backdrop-blur-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-wider text-slate-400 block font-semibold",
									children: "Assigned Role"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold text-emerald-400",
									children: ticketQuery.data.assignedRole
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 flex flex-col items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl border-2 border-border bg-white p-4 shadow-md dark:border-border/80",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode$1, {
									value: ticketQuery.data.qrToken,
									size: 190,
									fgColor: "#0f172a",
									bgColor: "#ffffff",
									className: "rounded-lg"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest block",
										children: "Pass Identifier"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base font-mono font-black text-foreground mt-0.5 tracking-wide",
										children: ticketQuery.data.ticketNumber
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 flex justify-center",
										children: ATTENDANCE_STATUS_CONFIG[ticketQuery.data.attendanceStatus] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("rounded-full px-3 py-1 text-xs font-bold", ATTENDANCE_STATUS_CONFIG[ticketQuery.data.attendanceStatus].badgeClass),
											children: ATTENDANCE_STATUS_CONFIG[ticketQuery.data.attendanceStatus].label
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 w-full rounded-xl border border-border/80 bg-muted/40 p-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block",
											children: "Secure QR Token (Unguessable)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-mono text-xs text-foreground mt-0.5 font-medium",
											children: ticketQuery.data.qrToken
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "sm",
										className: "h-7 shrink-0 text-xs gap-1",
										onClick: () => copyToClipboard(ticketQuery.data.qrToken, "Secure QR Token"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "Copy"]
									})]
								})
							}),
							(ticketQuery.data.checkInTime || ticketQuery.data.checkOutTime) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 w-full grid grid-cols-2 gap-2 text-xs rounded-lg border border-border/60 bg-muted/20 p-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-semibold text-muted-foreground uppercase",
									children: "Check-In"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-foreground",
									children: ticketQuery.data.checkInTime ? formatDate(ticketQuery.data.checkInTime) : "—"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-semibold text-muted-foreground uppercase",
									children: "Check-Out"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-foreground",
									children: ticketQuery.data.checkOutTime ? formatDate(ticketQuery.data.checkOutTime) : "Active"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-primary/5 border border-primary/15 rounded-lg p-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4 shrink-0 text-primary mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Present this secure QR code at the event organizer registration desk upon arrival. Organizers will scan it to record attendance and compute verified hours." })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
						className: "p-4 border-t border-border bg-muted/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "w-full",
							onClick: () => setViewingTicketAppId(null),
							children: "Close Crew Pass"
						})
					})
				] })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: Boolean(viewingCertExp),
			onOpenChange: (o) => !o && setViewingCertExp(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
				className: "max-w-2xl p-0 overflow-hidden bg-card border-border",
				children: viewingCertExp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 px-6 py-3 text-white flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-black uppercase tracking-widest",
								children: "CampusPulse Verified Certificate of Service"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-mono bg-white/20 px-2 py-0.5 rounded font-bold",
							children: viewingCertExp.certificate?.credentialId || viewingCertExp.id
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-8 sm:p-12 text-center bg-gradient-to-b from-amber-500/5 via-background to-amber-500/5 border-b border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-lg rounded-2xl border-4 border-double border-amber-500/40 p-6 sm:p-8 bg-card shadow-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto grid size-16 place-items-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3 border-2 border-amber-500/30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-8" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-widest font-black text-amber-700 dark:text-amber-400",
									children: "Certificate of Volunteer Excellence"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs text-muted-foreground font-serif italic",
									children: "This official certificate is proudly conferred upon"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 text-2xl font-black text-foreground tracking-tight underline decoration-amber-500/40 decoration-wavy underline-offset-8",
									children: "Volunteer Crew Member"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-xs text-muted-foreground leading-relaxed",
									children: "for dedicated campus community service, exceptional contribution, and leadership as"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 inline-block rounded-full bg-primary/10 border border-primary/20 px-4 py-1 text-sm font-bold text-primary",
									children: viewingCertExp.role
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: ["during ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: viewingCertExp.eventTitle
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: ["Conferred by ", viewingCertExp.organizationName]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 grid grid-cols-2 gap-2 border-t border-b border-amber-500/20 py-3 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block",
										children: "Verified Hours"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-base font-black text-amber-700 dark:text-amber-400",
										children: [viewingCertExp.hours.toFixed(1), " Hours"]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block",
										children: "Issue Date"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base font-bold text-foreground",
										children: viewingCertExp.verifiedAt ? formatDate(viewingCertExp.verifiedAt) : formatDate(viewingCertExp.date)
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex items-center justify-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cryptographically Authenticated on CampusPulse Student Record" })]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "p-4 flex flex-wrap items-center justify-between gap-3 bg-muted/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "text-xs gap-1.5",
							onClick: () => window.print(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-3.5" }), "Print / Save as PDF"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => setViewingCertExp(null),
							children: "Close Certificate"
						})]
					})
				] })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: Boolean(withdrawingApp),
			onOpenChange: (o) => !o && setWithdrawingApp(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Withdraw Volunteer Application?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					"Are you sure you want to withdraw your application for",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-foreground",
						children: withdrawingApp?.eventTitle
					}),
					" as",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-foreground",
						children: withdrawingApp?.role
					}),
					"?"
				] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Withdrawing will remove you from the active applicant review queue. You may re-apply later if the opportunity is still open."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setWithdrawingApp(null),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						disabled: isWithdrawing,
						onClick: handleWithdraw,
						children: isWithdrawing ? "Withdrawing…" : "Confirm Withdrawal"
					})]
				})
			] })
		})
	] });
}
//#endregion
export { VolunteeringPage as component };
