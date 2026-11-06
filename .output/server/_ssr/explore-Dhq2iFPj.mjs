import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { $t as ChevronDown, Xt as ChevronUp, en as Check, et as List, k as Search, rt as LayoutGrid, t as X, x as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { t as eventsApi } from "./events-Dtjwkx07.mjs";
import { a as PageHeader, i as GridSkeleton, n as EmptyState, r as ErrorState } from "./States-DTPgRZKE.mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { n as OpportunityGrid, r as OpportunityList } from "./OpportunityCard-BUJW0Bsd.mjs";
import { t as directoryApi } from "./directory-BaY2c_G3.mjs";
import { t as Label } from "./label-Bi14Oc-S.mjs";
import { a as SheetTrigger, i as SheetTitle, n as SheetContent, r as SheetHeader, t as Sheet } from "./sheet-KodPKk9Y.mjs";
import { t as Route } from "./explore-CAeN_h04.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore-Dhq2iFPj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var MODES = [
	{
		value: "all",
		label: "All Modes"
	},
	{
		value: "ONLINE",
		label: "Online"
	},
	{
		value: "PHYSICAL",
		label: "Physical"
	},
	{
		value: "HYBRID",
		label: "Hybrid"
	}
];
var OPPORTUNITY_TYPES = [
	{
		value: "all",
		label: "All Types"
	},
	{
		value: "MUSIC",
		label: "🎵 Music & Shows"
	},
	{
		value: "DRAMA",
		label: "🎭 Drama & Theatre"
	},
	{
		value: "HIGHER_STUDIES",
		label: "🎓 Higher Studies (MSc/PhD)"
	},
	{
		value: "UNIVERSITY_COURSE",
		label: "📖 University Courses"
	},
	{
		value: "HACKATHON",
		label: "💻 Hackathons"
	},
	{
		value: "COMPETITION",
		label: "🏆 Competitions"
	},
	{
		value: "WORKSHOP",
		label: "🛠️ Workshops"
	},
	{
		value: "CONFERENCE",
		label: "🎤 Conferences"
	},
	{
		value: "RESEARCH",
		label: "🔬 Research"
	},
	{
		value: "CAREER",
		label: "💼 Career"
	},
	{
		value: "VOLUNTEERING",
		label: "🤝 Volunteering"
	},
	{
		value: "SCHOLARSHIP",
		label: "🎖️ Scholarships"
	},
	{
		value: "TRAINING",
		label: "📚 Training"
	},
	{
		value: "TEAM_OPPORTUNITY",
		label: "👥 Team Calls"
	},
	{
		value: "OTHER",
		label: "✨ Other"
	}
];
function ExplorePage() {
	const search = Route.useSearch();
	const navigate = Route.useNavigate();
	const [term, setTerm] = (0, import_react.useState)(search.q ?? "");
	const [view, setView] = (0, import_react.useState)("grid");
	const [drawerOpen, setDrawerOpen] = (0, import_react.useState)(false);
	const [visible, setVisible] = (0, import_react.useState)(9);
	const setSearch = (patch) => {
		setVisible(9);
		navigate({
			to: ".",
			search: (prev) => ({
				...prev,
				...patch
			})
		});
	};
	const eventsQuery = useQuery({
		queryKey: [
			"events",
			"explore",
			search
		],
		queryFn: () => eventsApi.list(search)
	});
	const categoriesQuery = useQuery({
		queryKey: ["categories"],
		queryFn: () => eventsApi.categories()
	});
	const universitiesQuery = useQuery({
		queryKey: ["universities"],
		queryFn: () => directoryApi.universities()
	});
	const orgsQuery = useQuery({
		queryKey: ["organizations"],
		queryFn: () => directoryApi.organizations()
	});
	const results = eventsQuery.data ?? [];
	const shown = results.slice(0, visible);
	const activeFilters = [
		search.category,
		search.university,
		search.organization,
		search.mode,
		search.opportunityType,
		search.participationScope,
		search.musicGenre,
		search.dramaGenre,
		search.programType,
		search.fundingType,
		search.courseLevel
	].filter((v) => v && v !== "all").length;
	const filterPanel = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
				label: "Opportunity Type",
				value: search.opportunityType ?? "all",
				onChange: (v) => setSearch({
					opportunityType: v === "all" ? void 0 : v,
					musicGenre: void 0,
					dramaGenre: void 0,
					programType: void 0,
					fundingType: void 0,
					courseLevel: void 0
				}),
				options: OPPORTUNITY_TYPES
			}),
			search.opportunityType === "MUSIC" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
				label: "Music Style / Genre",
				value: search.musicGenre ?? "all",
				onChange: (v) => setSearch({ musicGenre: v === "all" ? void 0 : v }),
				options: [
					{
						value: "all",
						label: "All music genres"
					},
					{
						value: "Fusion Rock",
						label: "Fusion Rock"
					},
					{
						value: "Acoustic Pop",
						label: "Acoustic Pop"
					},
					{
						value: "Live Band",
						label: "Live Band"
					},
					{
						value: "DJ Night",
						label: "DJ Night"
					},
					{
						value: "Classical",
						label: "Classical Showcase"
					}
				]
			}),
			search.opportunityType === "DRAMA" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
				label: "Theatre / Performing Arts Genre",
				value: search.dramaGenre ?? "all",
				onChange: (v) => setSearch({ dramaGenre: v === "all" ? void 0 : v }),
				options: [
					{
						value: "all",
						label: "All drama genres"
					},
					{
						value: "Musical Theatre",
						label: "Musical Theatre"
					},
					{
						value: "Stage Play",
						label: "Stage Play"
					},
					{
						value: "Short Film Screening",
						label: "Short Film Screening"
					},
					{
						value: "Comedy Drama",
						label: "Comedy Drama"
					}
				]
			}),
			search.opportunityType === "HIGHER_STUDIES" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
				label: "Degree Award Level",
				value: search.programType ?? "all",
				onChange: (v) => setSearch({ programType: v === "all" ? void 0 : v }),
				options: [
					{
						value: "all",
						label: "All degrees"
					},
					{
						value: "MSc",
						label: "MSc — Master of Science"
					},
					{
						value: "Master's",
						label: "Master's Degree (MBA/MEng/MA)"
					},
					{
						value: "MPhil",
						label: "MPhil"
					},
					{
						value: "PhD",
						label: "PhD / Doctoral"
					},
					{
						value: "Postgraduate Diploma",
						label: "Postgraduate Diploma"
					},
					{
						value: "Open Day",
						label: "Postgraduate Open Day"
					}
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
				label: "Funding Type",
				value: search.fundingType ?? "all",
				onChange: (v) => setSearch({ fundingType: v === "all" ? void 0 : v }),
				options: [
					{
						value: "all",
						label: "All funding options"
					},
					{
						value: "Fully Funded",
						label: "Fully Funded"
					},
					{
						value: "Partially Funded",
						label: "Partially Funded"
					},
					{
						value: "Self-Funded",
						label: "Self-Funded"
					},
					{
						value: "Research Assistantship",
						label: "Research Assistantship"
					}
				]
			})] }),
			search.opportunityType === "UNIVERSITY_COURSE" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
				label: "Course Credential Level",
				value: search.courseLevel ?? "all",
				onChange: (v) => setSearch({ courseLevel: v === "all" ? void 0 : v }),
				options: [
					{
						value: "all",
						label: "All course levels"
					},
					{
						value: "Certificate",
						label: "Certificate Program"
					},
					{
						value: "Professional Development",
						label: "Professional Development"
					},
					{
						value: "Diploma",
						label: "University Diploma"
					},
					{
						value: "Short Course",
						label: "Short Technical Course"
					},
					{
						value: "Undergraduate Module",
						label: "Undergraduate Module"
					}
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
				label: "Category",
				value: search.category ?? "all",
				onChange: (v) => setSearch({ category: v }),
				options: [{
					value: "all",
					label: "All categories"
				}, ...(categoriesQuery.data ?? []).map((c) => ({
					value: c.id,
					label: c.name
				}))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
				label: "University",
				value: search.university ?? "all",
				onChange: (v) => setSearch({ university: v }),
				options: [{
					value: "all",
					label: "All universities"
				}, ...(universitiesQuery.data ?? []).map((u) => ({
					value: u.id,
					label: u.name
				}))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
				label: "Organisation",
				value: search.organization ?? "all",
				onChange: (v) => setSearch({ organization: v }),
				options: [{
					value: "all",
					label: "All organisations"
				}, ...(orgsQuery.data ?? []).map((o) => ({
					value: o.id,
					label: o.name
				}))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-sm font-semibold",
				children: "Mode"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": (search.mode ?? "all") === m.value,
					onClick: () => setSearch({ mode: m.value }),
					className: cn("rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors", (search.mode ?? "all") === m.value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"),
					children: m.label
				}, m.value))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
				label: "Participation Scope",
				value: search.participationScope ?? "all",
				onChange: (v) => setSearch({ participationScope: v === "all" ? void 0 : v }),
				options: [
					{
						value: "all",
						label: "All scopes"
					},
					{
						value: "INTER_UNIVERSITY",
						label: "Inter-University"
					},
					{
						value: "INTRA_UNIVERSITY",
						label: "Campus Only"
					},
					{
						value: "OPEN_PUBLIC",
						label: "Open to All"
					}
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				className: "w-full",
				onClick: () => navigate({
					to: ".",
					search: () => ({
						q: search.q,
						sort: search.sort
					})
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), "Clear filters"]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Discovery",
				title: "Discover Opportunities",
				description: "Search across every published opportunity from verified university societies."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6",
				onSubmit: (e) => {
					e.preventDefault();
					setSearch({ q: term || void 0 });
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "explore-search",
					className: "sr-only",
					children: "Search opportunities"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							className: "pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "explore-search",
							value: term,
							onChange: (e) => setTerm(e.target.value),
							placeholder: "Search competitions, hackathons, workshops...",
							className: "h-14 rounded-xl pl-12 pr-28 text-base"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "absolute right-2 top-1/2 -translate-y-1/2",
							children: "Search"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0",
				children: OPPORTUNITY_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					active: !search.opportunityType && t.value === "all" || search.opportunityType === t.value,
					onClick: () => setSearch({ opportunityType: t.value === "all" ? void 0 : t.value }),
					children: t.label
				}, t.value))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky top-24 rounded-xl border border-border bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-5 text-sm font-bold uppercase tracking-wider",
							children: "Filters"
						}), filterPanel]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "min-w-0 truncate text-sm text-muted-foreground",
								children: eventsQuery.isPending ? "Searching…" : `${results.length} opportunities`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
										open: drawerOpen,
										onOpenChange: setDrawerOpen,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "outline",
												size: "sm",
												className: "lg:hidden",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" }),
													"Filters",
													activeFilters > 0 && ` (${activeFilters})`
												]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
											side: "bottom",
											className: "max-h-[80vh] overflow-y-auto",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Filters" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "p-4",
												children: filterPanel
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: search.sort ?? "recommended",
										onValueChange: (v) => setSearch({ sort: v }),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "w-[150px]",
											"aria-label": "Sort results",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "recommended",
												children: "Recommended"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "deadline",
												children: "Deadline"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "newest",
												children: "Newest"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "trending",
												children: "Trending"
											})
										] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hidden items-center rounded-lg border border-border p-0.5 sm:flex",
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
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5",
							children: eventsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, {}) : eventsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => eventsQuery.refetch() }) : results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								title: "No opportunities match your filters",
								description: "Try removing a filter or searching for something broader.",
								action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => navigate({
										to: ".",
										search: () => ({})
									}),
									children: "Reset search"
								})
							}) : view === "grid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityGrid, { events: shown }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityList, { events: shown })
						}),
						shown.length < results.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setVisible((v) => v + 9),
								children: "Load more opportunities"
							})
						})
					]
				})]
			})
		]
	});
}
function Pill({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		className: cn("shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors", active ? "border-navy bg-navy text-navy-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"),
		children
	});
}
function FilterSelect({ label, value, onChange, options }) {
	const id = `filter-${label.toLowerCase()}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		htmlFor: id,
		className: "mb-2 block text-sm font-semibold",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value,
		onValueChange: onChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
			id,
			className: "w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
			value: o.value,
			children: o.label
		}, o.value)) })]
	})] });
}
//#endregion
export { ExplorePage as component };
