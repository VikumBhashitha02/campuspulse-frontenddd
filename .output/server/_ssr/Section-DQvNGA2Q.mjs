import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn } from "./button-Dw0VHwRC.mjs";
import { t as Skeleton } from "./skeleton-9We6w0Q8.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Sn as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Section-DQvNGA2Q.js
var import_jsx_runtime = require_jsx_runtime();
/** Feed section heading with an optional "see all" link — used across student pages. */
function SectionHeading({ title, description, linkTo, linkLabel = "See all", action, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-end justify-between gap-4", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-extrabold tracking-tight sm:text-xl",
					children: title
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: description
				})]
			}),
			action,
			!action && linkTo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: linkTo,
				className: "inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-foreground underline-offset-4 hover:underline",
				children: [linkLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
					className: "size-4",
					"aria-hidden": true
				})]
			})
		]
	});
}
function RailSkeleton({ count = 3 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-4 overflow-hidden",
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-[270px] shrink-0 rounded-xl border border-border bg-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "size-8 rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-24" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-4 h-4 w-4/5" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-2 h-3 w-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-4 h-6 w-28" })
			]
		}, i))
	});
}
/** Card surface used for side-panel modules on the student dashboard. */
function PanelCard({ title, icon, children, footer }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-card shadow-[var(--shadow-card)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-border px-4 py-3",
				children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-primary",
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
					children: title
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4",
				children
			}),
			footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border px-4 py-3",
				children: footer
			})
		]
	});
}
//#endregion
export { RailSkeleton as n, SectionHeading as r, PanelCard as t };
