import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { k as Search } from "../_libs/lucide-react.mjs";
import { a as PageHeader, i as GridSkeleton, n as EmptyState, r as ErrorState } from "./States-DTPgRZKE.mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { t as directoryApi } from "./directory-BaY2c_G3.mjs";
import { i as UniversityCard } from "./Cards-CTAMaKD_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/universities.index-CvXoCym_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UniversitiesPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const query = useQuery({
		queryKey: ["universities", q],
		queryFn: () => directoryApi.universities(q)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Directory",
				title: "Universities",
				description: "Every campus community on CampusPulse, with their faculties and active societies."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-6 max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "uni-search",
						className: "sr-only",
						children: "Search universities"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "uni-search",
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search by name or city",
						className: "pl-9"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, { count: 6 }) : query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => query.refetch() }) : (query.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No universities found",
					description: "Try a different search term."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: (query.data ?? []).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UniversityCard, { university: u }, u.id))
				})
			})
		]
	});
}
//#endregion
export { UniversitiesPage as component };
