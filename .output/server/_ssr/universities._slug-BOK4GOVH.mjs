import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { J as MapPin, gt as Globe, ht as GraduationCap, kt as ExternalLink, r as Users, un as Building2 } from "../_libs/lucide-react.mjs";
import { t as eventsApi } from "./events-Dtjwkx07.mjs";
import { i as GridSkeleton, n as EmptyState } from "./States-DTPgRZKE.mjs";
import { n as OpportunityGrid } from "./OpportunityCard-BUJW0Bsd.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-Vjzjil1D.mjs";
import { t as directoryApi } from "./directory-BaY2c_G3.mjs";
import { n as OrganizationCard } from "./Cards-CTAMaKD_.mjs";
import { t as Route } from "./universities._slug-CgknJmUr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/universities._slug-BOK4GOVH.js
var import_jsx_runtime = require_jsx_runtime();
function UniversityDetailPage() {
	const { university: initialUniversity } = Route.useLoaderData();
	const university = useQuery({
		queryKey: ["university", initialUniversity.slug],
		queryFn: async () => {
			return await directoryApi.university(initialUniversity.slug) ?? initialUniversity;
		},
		initialData: initialUniversity
	}).data ?? initialUniversity;
	const orgsQuery = useQuery({
		queryKey: ["organizations", university.id],
		queryFn: () => directoryApi.organizations(university.id)
	});
	const eventsQuery = useQuery({
		queryKey: [
			"events",
			"university",
			university.id
		],
		queryFn: () => eventsApi.list({ university: university.id })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12",
		children: [
			university.bannerUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 h-48 w-full overflow-hidden rounded-2xl border border-border shadow-sm sm:h-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: university.bannerUrl,
					alt: `${university.name} banner`,
					className: "size-full object-cover",
					onError: (e) => {
						e.target.style.display = "none";
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative overflow-hidden rounded-2xl border border-border bg-navy p-6 text-navy-foreground sm:p-9 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6",
						children: [university.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white p-2.5 shadow-md overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: university.logoUrl,
								alt: university.name,
								className: "size-full object-contain",
								onError: (e) => {
									e.target.style.display = "none";
								}
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-20 shrink-0 place-items-center rounded-2xl text-xl font-black text-navy shadow-md",
							style: { backgroundColor: university.logoColor || "#FBBF24" },
							"aria-hidden": true,
							children: university.shortName || university.code || "UNI"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-black tracking-tight sm:text-3xl text-white",
									children: university.name
								}), university.code && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-primary/20 px-2 py-0.5 font-mono text-xs font-bold text-primary",
									children: university.code
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap items-center gap-4 text-sm text-navy-foreground/75",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
										className: "size-4 text-primary",
										"aria-hidden": true
									}), university.location]
								}), university.websiteUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: university.websiteUrl.startsWith("http") ? university.websiteUrl : `https://${university.websiteUrl}`,
									target: "_blank",
									rel: "noreferrer noopener",
									className: "flex items-center gap-1.5 text-primary hover:underline",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
											className: "size-4",
											"aria-hidden": true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate max-w-[220px]",
											children: university.websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
											className: "size-3",
											"aria-hidden": true
										})
									]
								})]
							})]
						})]
					}),
					university.about && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-3xl text-sm leading-relaxed text-navy-foreground/80",
						children: university.about
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-6 border-t border-navy-foreground/15 pt-5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {
										className: "size-4 text-primary",
										"aria-hidden": true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white",
										children: university.facultyCount ?? university.faculties?.length ?? 0
									}),
									" faculties"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
										className: "size-4 text-primary",
										"aria-hidden": true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white",
										children: university.organizationCount ?? 0
									}),
									" active societies"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
										className: "size-4 text-primary",
										"aria-hidden": true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white",
										children: university.eventCount ?? 0
									}),
									" open opportunities"
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "opportunities",
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "bg-muted/80 p-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "opportunities",
								children: [
									"Opportunities (",
									university.eventCount ?? 0,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "organizations",
								children: [
									"Societies & Clubs (",
									university.organizationCount ?? 0,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "faculties",
								children: [
									"Faculties & Departments (",
									university.facultyCount ?? university.faculties?.length ?? 0,
									")"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "opportunities",
						className: "mt-6",
						children: eventsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, {}) : (eventsQuery.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							title: "No open opportunities",
							description: "This campus community has no published opportunities at the moment."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityGrid, { events: eventsQuery.data ?? [] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "organizations",
						className: "mt-6",
						children: orgsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, { count: 3 }) : (orgsQuery.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							title: "No societies registered",
							description: "No student clubs or societies are currently registered under this university."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: (orgsQuery.data ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrganizationCard, { organization: o }, o.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "faculties",
						className: "mt-6",
						children: (university.faculties ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							title: "No faculties listed yet",
							description: "Faculties and academic departments for this university are being organized."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: (university.faculties ?? []).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-card p-5 shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-bold text-foreground",
										children: f.name
									}), f.code && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground",
										children: f.code
									})]
								}), (f.departments ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs text-muted-foreground/75 italic",
									children: "No departments added under this faculty yet."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 space-y-1.5 text-xs text-muted-foreground",
									children: f.departments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-primary/60 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: d.name
										})]
									}, d.id))
								})]
							}, f.id))
						})
					})
				]
			})
		]
	});
}
//#endregion
export { UniversityDetailPage as component };
