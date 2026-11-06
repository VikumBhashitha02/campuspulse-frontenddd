import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { et as List, fn as Bookmark, rt as LayoutGrid } from "../_libs/lucide-react.mjs";
import { t as eventsApi } from "./events-Dtjwkx07.mjs";
import { a as PageHeader, i as GridSkeleton, n as EmptyState, r as ErrorState } from "./States-DTPgRZKE.mjs";
import { r as deadlineInfo } from "./format-Cdcdxizs.mjs";
import { n as OpportunityGrid, r as OpportunityList } from "./OpportunityCard-BUJW0Bsd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.saved-BijPfQqG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "open",
		label: "Still open"
	},
	{
		id: "closing",
		label: "Closing soon"
	}
];
function SavedPage() {
	const { user } = useAuth();
	const query = useQuery({
		queryKey: ["saved", user?.id],
		queryFn: () => eventsApi.saved()
	});
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [view, setView] = (0, import_react.useState)("grid");
	const all = query.data ?? [];
	const events = all.filter((e) => {
		const tone = deadlineInfo(e.registrationDeadline).tone;
		if (filter === "open") return tone !== "closed";
		if (filter === "closing") return tone === "urgent" || tone === "soon";
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Saved",
			description: "Everything you've bookmarked, ready when you are.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden gap-1 rounded-lg border border-border p-1 sm:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: view === "grid" ? "secondary" : "ghost",
					size: "icon",
					"aria-label": "Grid view",
					"aria-pressed": view === "grid",
					onClick: () => setView("grid"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: view === "list" ? "secondary" : "ghost",
					size: "icon",
					"aria-label": "List view",
					"aria-pressed": view === "list",
					onClick: () => setView("list"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-4" })
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": filter === f.id,
				onClick: () => setFilter(f.id),
				className: cn("rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors", filter === f.id ? "bg-navy text-navy-foreground" : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground"),
				children: f.label
			}, f.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, { count: 3 }) : query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => query.refetch() }) : events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {
					className: "size-6",
					"aria-hidden": true
				}),
				title: all.length === 0 ? "Nothing saved yet" : "No saved items match this filter",
				description: all.length === 0 ? "Tap the bookmark icon on any opportunity to keep it here." : "Try a different filter to see the rest of your saved list.",
				action: all.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/explore",
						children: "Explore opportunities"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setFilter("all"),
					children: "Show all saved"
				})
			}) : view === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityList, { events }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityGrid, { events })
		})
	] });
}
//#endregion
export { SavedPage as component };
