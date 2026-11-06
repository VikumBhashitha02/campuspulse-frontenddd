import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { t as socialApi } from "./social-D4BN0hFM.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Trash2, hn as Bell, kt as ExternalLink, p as Ticket, q as Megaphone, r as Users, sn as CalendarClock, tn as CheckCheck } from "../_libs/lucide-react.mjs";
import { a as PageHeader, n as EmptyState, o as RowSkeleton, r as ErrorState } from "./States-DTPgRZKE.mjs";
import { c as relativeTime } from "./format-Cdcdxizs.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.notifications-CD-M-_dM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ICONS = {
	REGISTRATION: Ticket,
	DEADLINE: CalendarClock,
	TEAM_REQUEST: Users,
	TEAM_ACCEPTED: Users,
	EVENT_UPDATE: Megaphone,
	ORGANIZATION: Bell
};
var TABS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "unread",
		label: "Unread"
	},
	{
		id: "deadlines",
		label: "Deadlines"
	},
	{
		id: "teams",
		label: "Teams"
	}
];
function matchesTab(n, tab, allRead) {
	if (tab === "unread") return !n.read && !allRead;
	if (tab === "deadlines") return n.kind === "DEADLINE";
	if (tab === "teams") return n.kind === "TEAM_REQUEST" || n.kind === "TEAM_ACCEPTED";
	return true;
}
function NotificationsPage() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const query = useQuery({
		queryKey: ["notifications", user?.id],
		queryFn: () => socialApi.notifications(),
		enabled: !!user
	});
	const announcementsQuery = useQuery({
		queryKey: ["active-announcements", user?.id],
		queryFn: async () => {
			const token = localStorage.getItem("campuspulse_token") || "";
			const res = await fetch("http://localhost:4000/api/v1/notifications/announcements", { headers: token ? { Authorization: `Bearer ${token}` } : {} });
			if (!res.ok) return [];
			const json = await res.json();
			return json.data || json || [];
		},
		enabled: !!user
	});
	const [allRead, setAllRead] = (0, import_react.useState)(false);
	const [tab, setTab] = (0, import_react.useState)("all");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [deletingId, setDeletingId] = (0, import_react.useState)(null);
	const all = query.data ?? [];
	const unreadCount = all.filter((n) => !n.read && !allRead).length;
	const items = all.filter((n) => matchesTab(n, tab, allRead));
	const markItemAsRead = async (notification) => {
		if (!notification.read && !allRead) try {
			await socialApi.markRead(notification.id);
			queryClient.setQueryData(["notifications", user?.id], (old) => old ? old.map((item) => item.id === notification.id ? {
				...item,
				read: true
			} : item) : []);
			queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
		} catch {}
	};
	const handleNotificationClick = async (n) => {
		await markItemAsRead(n);
		if (n.href) if (n.href.startsWith("/")) navigate({ to: n.href });
		else window.location.href = n.href;
	};
	const markAll = async () => {
		setBusy(true);
		try {
			await socialApi.markAllRead();
			setAllRead(true);
			queryClient.setQueryData(["notifications", user?.id], (old) => old ? old.map((item) => ({
				...item,
				read: true
			})) : []);
			queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
			toast.success("All notifications marked as read");
		} catch {
			toast.error("Couldn't mark notifications as read");
		} finally {
			setBusy(false);
		}
	};
	const deleteItem = async (e, id) => {
		e.stopPropagation();
		setDeletingId(id);
		try {
			await socialApi.deleteNotification(id);
			queryClient.setQueryData(["notifications", user?.id], (old) => old ? old.filter((item) => item.id !== id) : []);
			queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
			toast.success("Notification removed");
		} catch {
			toast.error("Failed to delete notification");
		} finally {
			setDeletingId(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Notifications",
			description: unreadCount > 0 ? `${unreadCount} unread update${unreadCount > 1 ? "s" : ""} need your attention.` : "You're all caught up.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				disabled: busy || unreadCount === 0,
				onClick: markAll,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "size-4" }), "Mark all read"]
			})
		}),
		announcementsQuery.data && announcementsQuery.data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 space-y-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 text-xs font-bold text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Platform & Campus Broadcasts" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2.5",
				children: announcementsQuery.data.map((ann) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("p-3.5 rounded-xl border shadow-xs transition-all space-y-1.5", ann.priority === "URGENT" ? "bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100" : ann.priority === "HIGH" ? "bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100" : "bg-card border-border text-card-foreground"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary uppercase",
									children: ann.targetAudience === "UNIVERSITY" && ann.university ? ann.university.name : ann.targetAudience
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground",
									children: relativeTime(ann.startsAt || ann.createdAt)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-bold text-sm text-foreground mt-1",
								children: ann.title
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "size-4 text-primary shrink-0 opacity-80" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-foreground/90 whitespace-pre-wrap leading-relaxed",
							children: ann.message
						}),
						ann.linkUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-1.5 border-t border-border/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: ann.linkUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open Link / Action" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
							})
						})
					]
				}, ann.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-pressed": tab === t.id,
				onClick: () => setTab(t.id),
				className: cn("rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors", tab === t.id ? "bg-navy text-navy-foreground" : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground"),
				children: [t.label, t.id === "unread" && unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-1.5 rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground",
					children: unreadCount
				})]
			}, t.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => query.refetch() }) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
					className: "size-6",
					"aria-hidden": true
				}),
				title: tab === "all" ? "You're all caught up" : "Nothing here right now",
				description: "New deadline reminders, team requests, registrations and updates will show up here.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/explore",
						children: "Explore opportunities"
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border overflow-hidden rounded-xl border border-border bg-card",
				children: items.map((n) => {
					const Icon = ICONS[n.kind] ?? Bell;
					const unread = !n.read && !allRead;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						onClick: () => handleNotificationClick(n),
						className: cn("flex items-start justify-between gap-3 p-4 transition-colors cursor-pointer hover:bg-muted/30", unread && "bg-primary/[0.06]"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-foreground",
										children: n.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-sm text-muted-foreground leading-snug",
										children: n.body
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: relativeTime(n.createdAt)
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 shrink-0",
							children: [
								n.href && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									className: "h-7 px-2.5 text-xs font-semibold",
									onClick: (e) => {
										e.stopPropagation();
										handleNotificationClick(n);
									},
									children: "View"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "size-7 text-muted-foreground hover:text-destructive",
									disabled: deletingId === n.id,
									onClick: (e) => deleteItem(e, n.id),
									title: "Delete notification",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
								}),
								unread && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-label": "Unread",
									className: "size-2 shrink-0 rounded-full bg-primary"
								})
							]
						})]
					}, n.id);
				})
			})
		})
	] });
}
//#endregion
export { NotificationsPage as component };
