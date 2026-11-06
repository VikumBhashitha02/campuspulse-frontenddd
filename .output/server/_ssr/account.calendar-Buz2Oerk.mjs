import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Qt as ChevronLeft, Zt as ChevronRight, an as Calendar, fn as Bookmark, p as Ticket } from "../_libs/lucide-react.mjs";
import { t as eventsApi } from "./events-Dtjwkx07.mjs";
import { a as PageHeader, n as EmptyState, o as RowSkeleton, r as ErrorState } from "./States-DTPgRZKE.mjs";
import { i as formatDate } from "./format-Cdcdxizs.mjs";
import { n as DeadlineBadge } from "./Badges-Bz6vmcNI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.calendar-Buz2Oerk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DAY_LABELS = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
	"Sun"
];
var CALENDAR_FILTERS = [
	{
		id: "all",
		label: "All Opportunities"
	},
	{
		id: "registered",
		label: "Registered Passes 🎫"
	},
	{
		id: "saved",
		label: "Saved Items 🔖"
	}
];
function CalendarPage() {
	const { user } = useAuth();
	const [cursor, setCursor] = (0, import_react.useState)(() => {
		const d = /* @__PURE__ */ new Date();
		return new Date(d.getFullYear(), d.getMonth(), 1);
	});
	const [filter, setFilter] = (0, import_react.useState)("all");
	const query = useQuery({
		queryKey: ["events", "calendar"],
		queryFn: () => eventsApi.list({ limit: 60 })
	});
	const registrationsQuery = useQuery({
		queryKey: ["registrations", user?.id],
		queryFn: () => eventsApi.registrations(),
		enabled: !!user
	});
	const savedQuery = useQuery({
		queryKey: ["saved", user?.id],
		queryFn: () => eventsApi.saved(),
		enabled: !!user
	});
	const rawEvents = query.data ?? [];
	const registeredEvents = (registrationsQuery.data ?? []).map((r) => r.event).filter(Boolean);
	const savedEvents = savedQuery.data ?? [];
	const registeredIds = new Set(registeredEvents.map((e) => e.id));
	const savedIds = new Set(savedEvents.map((e) => e.id));
	const allEventsMap = /* @__PURE__ */ new Map();
	rawEvents.forEach((e) => {
		if (e?.id) allEventsMap.set(e.id, e);
	});
	registeredEvents.forEach((e) => {
		if (e?.id) allEventsMap.set(e.id, e);
	});
	savedEvents.forEach((e) => {
		if (e?.id) allEventsMap.set(e.id, e);
	});
	const filteredEvents = Array.from(allEventsMap.values()).filter((e) => {
		if (filter === "registered") return registeredIds.has(e.id);
		if (filter === "saved") return savedIds.has(e.id);
		return true;
	});
	const year = cursor.getFullYear();
	const month = cursor.getMonth();
	const first = new Date(year, month, 1);
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const offset = (first.getDay() + 6) % 7;
	const cells = [...Array.from({ length: offset }, () => null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
	const forDay = (day) => filteredEvents.filter((e) => {
		if (!e?.startDate) return false;
		const start = new Date(e.startDate);
		if (isNaN(start.getTime())) return false;
		const end = e.endDate ? new Date(e.endDate) : start;
		const validEnd = isNaN(end.getTime()) ? start : end;
		const currentDayStart = new Date(year, month, day, 0, 0, 0, 0);
		return start <= new Date(year, month, day, 23, 59, 59, 999) && validEnd >= currentDayStart;
	});
	const monthStart = new Date(year, month, 1, 0, 0, 0, 0);
	const monthEnd = new Date(year, month + 1, 0, 23, 59, 59, 999);
	const monthEvents = filteredEvents.filter((e) => {
		if (!e?.startDate) return false;
		const start = new Date(e.startDate);
		if (isNaN(start.getTime())) return false;
		const end = e.endDate ? new Date(e.endDate) : start;
		const validEnd = isNaN(end.getTime()) ? start : end;
		return start <= monthEnd && validEnd >= monthStart;
	}).sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
	const isCurrentMonth = () => {
		const today = /* @__PURE__ */ new Date();
		return today.getFullYear() === year && today.getMonth() === month;
	};
	const handleGoToday = () => {
		const today = /* @__PURE__ */ new Date();
		setCursor(new Date(today.getFullYear(), today.getMonth(), 1));
	};
	const isError = query.isError && !query.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Schedule & Opportunity Calendar",
			description: "Track your registered event dates, saved opportunities, and competition deadlines month by month."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: CALENDAR_FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": filter === f.id,
					onClick: () => setFilter(f.id),
					className: cn("rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors", filter === f.id ? "bg-navy text-navy-foreground shadow-sm" : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border/50"),
					children: f.label
				}, f.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						className: cn("text-xs font-semibold h-8", isCurrentMonth() && "opacity-60"),
						onClick: handleGoToday,
						children: "Today"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm sm:text-base font-bold text-foreground min-w-32 text-center",
						children: cursor.toLocaleDateString("en-GB", {
							month: "long",
							year: "numeric"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							className: "size-8",
							"aria-label": "Previous month",
							onClick: () => setCursor(new Date(year, month - 1, 1)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							className: "size-8",
							"aria-label": "Next month",
							onClick: () => setCursor(new Date(year, month + 1, 1)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
						})]
					})
				]
			})]
		}),
		isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				message: "Failed to load calendar events. Please check your connection and try again.",
				onRetry: () => {
					query.refetch();
					registrationsQuery.refetch();
					savedQuery.refetch();
				}
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 hidden overflow-hidden rounded-xl border border-border bg-card sm:block shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 border-b border-border bg-surface",
				children: DAY_LABELS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-2 py-2 text-center text-xs font-bold text-muted-foreground",
					children: d
				}, d))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7",
				children: cells.map((day, i) => {
					const dayEvents = day ? forDay(day) : [];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("min-h-24 border-b border-r border-border p-1.5 last:border-r-0 transition-colors", !day && "bg-surface/40"),
						children: day && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold text-muted-foreground",
							children: day
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-1 space-y-1",
							children: [dayEvents.slice(0, 2).map((e) => {
								const isReg = registeredIds.has(e.id);
								const isSaved = savedIds.has(e.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/events/$slug",
									params: { slug: e.slug },
									className: cn("block truncate rounded px-1.5 py-0.5 text-[11px] font-medium transition-colors", isReg ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold hover:bg-emerald-500/25" : isSaved ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 hover:bg-amber-500/25" : "bg-primary/15 text-foreground hover:bg-primary/25"),
									children: [isReg ? "🎫 " : isSaved ? "🔖 " : "", e.title]
								}) }, e.id);
							}), dayEvents.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "px-1.5 text-[10px] text-muted-foreground font-semibold",
								children: [
									"+",
									dayEvents.length - 2,
									" more"
								]
							})]
						})] })
					}, i);
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
					children: ["Schedule for ", cursor.toLocaleDateString("en-GB", { month: "long" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground font-semibold",
					children: [
						monthEvents.length,
						" ",
						monthEvents.length === 1 ? "Event" : "Events"
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, { count: 4 }) : monthEvents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-6" }),
					title: "Nothing scheduled this month",
					description: "No opportunities or registered events match your active calendar filter."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-sm",
					children: monthEvents.map((e) => {
						const isReg = registeredIds.has(e.id);
						const isSaved = savedIds.has(e.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4 hover:bg-muted/30 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/events/$slug",
											params: { slug: e.slug },
											className: "truncate text-sm font-bold text-foreground hover:text-primary transition-colors",
											children: e.title
										}),
										isReg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-3" }), "Registered"]
										}),
										isSaved && !isReg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.2 text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/30",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-3" }), "Saved"]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-xs text-muted-foreground mt-1",
									children: [
										formatDate(e.startDate),
										" · ",
										e.organizationName || "Campus Organizer",
										" · ",
										e.location || "Online"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadlineBadge, { deadline: e.registrationDeadline })]
						}, e.id);
					})
				})
			})]
		})] })
	] });
}
//#endregion
export { CalendarPage as component };
