import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { t as socialApi } from "./social-D4BN0hFM.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ht as Clock3, bt as Flame, fn as Bookmark, gt as Globe, k as Search, p as Ticket, pt as HeartHandshake, r as Users, s as UserCheck, un as Building2, y as Sparkles } from "../_libs/lucide-react.mjs";
import { t as eventsApi } from "./events-Dtjwkx07.mjs";
import { i as GridSkeleton, n as EmptyState, o as RowSkeleton, r as ErrorState } from "./States-DTPgRZKE.mjs";
import { r as deadlineInfo } from "./format-Cdcdxizs.mjs";
import { n as DeadlineBadge } from "./Badges-Bz6vmcNI.mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { i as OpportunityRail, t as OpportunityCard } from "./OpportunityCard-BUJW0Bsd.mjs";
import { n as RailSkeleton, r as SectionHeading, t as PanelCard } from "./Section-DQvNGA2Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.index-BaUQ-5JI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FEED_MODES = [
	{
		id: "FOR_YOU",
		label: "For You",
		icon: Sparkles,
		description: "Personalized recommendations prioritizing your campus"
	},
	{
		id: "MY_UNIVERSITY",
		label: "My Campus",
		icon: Building2,
		description: "Opportunities exclusively from or open to your university"
	},
	{
		id: "FOLLOWING",
		label: "Following",
		icon: UserCheck,
		description: "Updates from student clubs and organizations you follow"
	},
	{
		id: "TRENDING",
		label: "Trending",
		icon: Flame,
		description: "Highest student engagement velocity right now"
	},
	{
		id: "ALL_OPPORTUNITIES",
		label: "All Opportunities",
		icon: Globe,
		description: "Comprehensive open university catalog"
	},
	{
		id: "VOLUNTEERING",
		label: "Volunteering",
		icon: HeartHandshake,
		description: "Campus leadership and community initiatives"
	}
];
function useGreeting() {
	const [greeting, setGreeting] = (0, import_react.useState)("Welcome back");
	(0, import_react.useEffect)(() => {
		const h = (/* @__PURE__ */ new Date()).getHours();
		setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
	}, []);
	return greeting;
}
function FeedPage() {
	const { user } = useAuth();
	const greeting = useGreeting();
	const [activeMode, setActiveMode] = (0, import_react.useState)("FOR_YOU");
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [limit, setLimit] = (0, import_react.useState)(8);
	const feedQuery = useQuery({
		queryKey: [
			"feed",
			activeMode,
			searchTerm,
			limit,
			user?.id
		],
		queryFn: () => eventsApi.getFeed({
			mode: activeMode,
			search: searchTerm || void 0,
			limit
		})
	});
	const saved = useQuery({
		queryKey: ["saved", user?.id],
		queryFn: () => eventsApi.saved()
	});
	const regs = useQuery({
		queryKey: ["registrations", user?.id],
		queryFn: () => eventsApi.registrations()
	});
	const teams = useQuery({
		queryKey: ["teams"],
		queryFn: () => socialApi.teams()
	});
	const notifications = useQuery({
		queryKey: ["notifications"],
		queryFn: () => socialApi.notifications()
	});
	const firstName = user?.name.split(" ")[0] ?? "there";
	const userUni = feedQuery.data?.context?.userUniversityName || "Your University";
	const feedItems = feedQuery.data?.items ?? [];
	const totalItems = feedQuery.data?.pagination?.total ?? feedItems.length;
	const hasMore = feedQuery.data?.pagination?.hasMore ?? false;
	const closingSoon = feedItems.map((i) => i.event).filter((e) => {
		const info = deadlineInfo(e.registrationDeadline);
		return info.tone === "urgent" || info.tone === "soon";
	}).sort((a, b) => +new Date(a.registrationDeadline) - +new Date(b.registrationDeadline)).slice(0, 8);
	const myDeadlines = [...saved.data ?? [], ...(regs.data ?? []).map((r) => r.event)].filter((e, i, arr) => arr.findIndex((x) => x.id === e.id) === i).filter((e) => deadlineInfo(e.registrationDeadline).tone !== "closed").sort((a, b) => +new Date(a.registrationDeadline) - +new Date(b.registrationDeadline)).slice(0, 4);
	const topTeams = [...teams.data ?? []].sort((a, b) => b.compatibility - a.compatibility).slice(0, 3);
	(notifications.data ?? []).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "rounded-2xl border border-border bg-navy p-6 text-navy-foreground sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center justify-between gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
									className: "size-4",
									"aria-hidden": true
								}), "CampusPulse Feed Engine"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl",
								children: [
									greeting,
									", ",
									firstName
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xl text-sm text-navy-foreground/75",
								children: userUni ? `Connecting you with opportunities at ${userUni} and leading campuses.` : "Here's what's happening across universities today."
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/explore",
								children: "Explore all opportunities"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							className: "border-navy-foreground/25 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/account/teams",
								children: "Find teammates"
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "sr-only",
						children: "Your activity"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
						children: [
							{
								label: "Saved",
								value: saved.data?.length ?? 0,
								icon: Bookmark,
								to: "/account/saved"
							},
							{
								label: "Registered",
								value: regs.data?.length ?? 0,
								icon: Ticket,
								to: "/account/registrations"
							},
							{
								label: "Team matches",
								value: teams.data?.length ?? 0,
								icon: Users,
								to: "/account/teams"
							},
							{
								label: "Deadlines nearby",
								value: myDeadlines.length,
								icon: Clock3,
								to: "/account/calendar"
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: s.to,
							className: "card-interactive flex flex-col rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, {
									className: "size-4 text-primary",
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-3 text-2xl font-extrabold tracking-tight",
									children: s.value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-muted-foreground",
									children: s.label
								})
							]
						}) }, s.label))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold tracking-tight text-foreground sm:text-2xl",
									children: "Opportunity Feed"
								}), feedQuery.data?.context?.isPersonalized && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
										className: "size-3",
										"aria-hidden": true
									}), "Rule-Based Personalized"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: FEED_MODES.find((m) => m.id === activeMode)?.description
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full sm:w-64",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "search",
									placeholder: "Filter feed...",
									value: searchTerm,
									onChange: (e) => setSearchTerm(e.target.value),
									className: "pl-9 text-xs"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 sm:flex-wrap",
							children: FEED_MODES.map((mode) => {
								const Icon = mode.icon;
								const isActive = activeMode === mode.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										setActiveMode(mode.id);
										setLimit(8);
									},
									className: cn("inline-flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer", isActive ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border bg-card text-muted-foreground hover:bg-muted/60 hover:text-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "size-4 shrink-0",
										"aria-hidden": true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: mode.label })]
								}, mode.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5",
							children: feedQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, { count: 4 }) : feedQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => feedQuery.refetch() }) : feedItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								title: activeMode === "FOLLOWING" ? "Not following any campus clubs yet" : activeMode === "MY_UNIVERSITY" ? "No campus opportunities found" : "No opportunities match this filter",
								description: activeMode === "FOLLOWING" ? "Follow student clubs, IEEE chapters, and campus societies to populate your following feed." : activeMode === "MY_UNIVERSITY" ? `There are currently no active opportunities listed specifically for ${userUni}. Explore all campuses!` : "Try switching feed modes or clearing your search filter.",
								action: activeMode === "FOLLOWING" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/explore",
										children: "Explore student clubs"
									})
								}) : activeMode === "FOR_YOU" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/account/profile",
										children: "Update profile skills"
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => setActiveMode("FOR_YOU"),
									children: "View For You feed"
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 lg:grid-cols-2",
								children: feedItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityCard, { event: item.event }, item.event.id))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-col items-center justify-center gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"Showing ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: feedItems.length
										}),
										" of",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: totalItems
										}),
										" opportunities"
									]
								}), hasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setLimit((prev) => prev + 6),
									className: "font-semibold",
									children: "Load more opportunities"
								})]
							})] })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						title: "Closing soon",
						description: "Deadlines in the next three weeks.",
						linkTo: "/explore",
						linkLabel: "Browse all"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: feedQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailSkeleton, {}) : closingSoon.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							title: "No deadlines nearby",
							description: "Nothing in your feed closes in the next few weeks.",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {
								className: "size-6",
								"aria-hidden": true
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityRail, { events: closingSoon })
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "mt-10 space-y-5 xl:sticky xl:top-24 xl:mt-0 xl:self-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
				title: "Your deadlines",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {
					className: "size-4",
					"aria-hidden": true
				}),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/account/calendar",
					className: "text-sm font-semibold hover:underline",
					children: "Open calendar"
				}),
				children: myDeadlines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No upcoming deadlines."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: myDeadlines.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/events/$slug",
								params: { slug: e.slug },
								className: "block truncate text-sm font-semibold hover:underline",
								children: e.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: e.organizationName
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadlineBadge, { deadline: e.registrationDeadline })]
					}, e.id))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
				title: "Recommended teammates",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
					className: "size-4",
					"aria-hidden": true
				}),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/account/teams",
					className: "text-sm font-semibold hover:underline",
					children: "View all team calls"
				}),
				children: teams.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, { count: 3 }) : topTeams.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No active squads currently seeking members."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: topTeams.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/account/teams/$id",
								params: { id: t.id },
								className: "block truncate text-sm font-semibold hover:underline",
								children: t.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: t.eventTitle || "Campus Opportunity"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-bold text-primary",
							children: [t.compatibility, "% match"]
						})]
					}, t.id))
				})
			})]
		})]
	});
}
//#endregion
export { FeedPage as component };
