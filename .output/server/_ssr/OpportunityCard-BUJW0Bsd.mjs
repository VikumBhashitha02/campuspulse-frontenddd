import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as MapPin, T as Share2, V as Music, Zt as ChevronRight, fn as Bookmark, ht as GraduationCap, m as Theater, mn as BookOpenCheck, on as CalendarDays, u as Trophy, y as Sparkles } from "../_libs/lucide-react.mjs";
import { t as eventsApi } from "./events-Dtjwkx07.mjs";
import { i as formatDate, s as formatRange } from "./format-Cdcdxizs.mjs";
import { l as VerificationBadge, n as DeadlineBadge, o as OrgAvatar, r as MatchBadge, s as ScopeBadge } from "./Badges-Bz6vmcNI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/OpportunityCard-BUJW0Bsd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Shared bookmark interaction. Keeps optimistic UI, toast feedback and cache
* invalidation in one place so every card behaves identically.
*/
function useSaveEvent(event) {
	const queryClient = useQueryClient();
	const [saved, setSaved] = (0, import_react.useState)(Boolean(event.bookmarked));
	(0, import_react.useEffect)(() => {
		setSaved(Boolean(event.bookmarked));
	}, [event.bookmarked]);
	const mutation = useMutation({
		mutationFn: (next) => eventsApi.toggleBookmark(event.id, next),
		onMutate: (next) => {
			setSaved(next);
			return { previous: !next };
		},
		onSuccess: (_data, next) => {
			toast.success(next ? "Saved for later" : "Removed from saved", { description: event.title });
			queryClient.invalidateQueries({ queryKey: ["saved"] });
			queryClient.invalidateQueries({ queryKey: ["events"] });
			queryClient.invalidateQueries({ queryKey: ["feed"] });
		},
		onError: (_error, _next, context) => {
			if (context) setSaved(context.previous);
			toast.error("Couldn't update your saved opportunities");
		}
	});
	return {
		saved,
		pending: mutation.isPending,
		toggle: () => mutation.mutate(!saved)
	};
}
async function shareEvent(event) {
	const url = `${window.location.origin}/events/${event.slug}`;
	try {
		if (navigator.share) await navigator.share({
			title: event.title,
			url
		});
		else {
			await navigator.clipboard.writeText(url);
			toast.success("Link copied to clipboard");
		}
	} catch {}
}
function SaveButton({ event, className }) {
	const { saved, toggle, pending } = useSaveEvent(event);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon",
		className: cn("min-h-9 min-w-9 rounded-lg hover:bg-surface", className),
		"aria-label": saved ? `Remove ${event.title} from saved` : `Save ${event.title}`,
		"aria-pressed": saved,
		disabled: pending,
		onClick: (e) => {
			e.preventDefault();
			e.stopPropagation();
			toggle();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: cn("size-4 transition-transform", saved ? "scale-110 fill-primary text-primary" : "text-muted-foreground hover:text-foreground") })
	});
}
function getEventLifecycle(event) {
	if (event.status === "CANCELLED" || event.status === "REJECTED") return {
		label: "Cancelled",
		variant: "cancelled"
	};
	const now = Date.now();
	const start = event.startDate ? new Date(event.startDate).getTime() : 0;
	const end = event.endDate ? new Date(event.endDate).getTime() : 0;
	if (end && end < now) return {
		label: "Finished",
		variant: "finished"
	};
	if (start && start <= now && (!end || end >= now)) return {
		label: "Ongoing",
		variant: "ongoing"
	};
	return {
		label: "Upcoming",
		variant: "upcoming"
	};
}
function getCategoryFallbackGradient(opportunityType) {
	switch (opportunityType) {
		case "MUSIC": return "from-pink-700 via-rose-600 to-purple-800";
		case "DRAMA": return "from-violet-800 via-purple-700 to-indigo-900";
		case "HIGHER_STUDIES": return "from-sky-800 via-blue-700 to-indigo-900";
		case "UNIVERSITY_COURSE": return "from-teal-700 via-emerald-700 to-cyan-900";
		case "HACKATHON":
		case "COMPETITION": return "from-blue-800 via-indigo-700 to-violet-900";
		case "VOLUNTEERING": return "from-emerald-700 via-teal-700 to-blue-900";
		default: return "from-slate-800 via-slate-900 to-navy";
	}
}
function getCategoryIcon(opportunityType) {
	switch (opportunityType) {
		case "MUSIC": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "size-8 text-white/90" });
		case "DRAMA": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Theater, { className: "size-8 text-white/90" });
		case "HIGHER_STUDIES": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-8 text-white/90" });
		case "UNIVERSITY_COURSE": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenCheck, { className: "size-8 text-white/90" });
		case "HACKATHON": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-8 text-white/90" });
		case "COMPETITION": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-8 text-white/90" });
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-8 text-white/90" });
	}
}
/**
* High-performance Poster Image Component with Overlay Badges and Gradient Fallback.
*/
function OpportunityPoster({ event, className, priority = false }) {
	const [imgError, setImgError] = (0, import_react.useState)(false);
	const posterSrc = !imgError ? event.posterUrl || event.coverImageUrl || event.bannerUrl : null;
	const lifecycle = getEventLifecycle(event);
	const gradient = getCategoryFallbackGradient(event.opportunityType);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative overflow-hidden bg-muted aspect-[16/9] w-full select-none", className),
		children: [
			posterSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: posterSrc,
				alt: event.title,
				loading: priority ? "eager" : "lazy",
				onError: () => setImgError(true),
				className: "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex h-full w-full flex-col items-center justify-center bg-gradient-to-br p-4 text-center text-white", gradient),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-full bg-white/15 p-3 backdrop-blur-md shadow-inner",
					children: getCategoryIcon(event.opportunityType)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-2 text-xs font-black tracking-wider uppercase text-white/90",
					children: event.categoryName || event.opportunityType || "Campus Opportunity"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/35" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-3 inset-x-3 flex items-center justify-between gap-1.5 pointer-events-none z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide backdrop-blur-md shadow-md border", lifecycle.variant === "ongoing" && "bg-emerald-950/85 text-emerald-200 border-emerald-500/50 shadow-emerald-950/40", lifecycle.variant === "upcoming" && "bg-blue-950/85 text-blue-200 border-blue-500/50 shadow-blue-950/40", lifecycle.variant === "finished" && "bg-slate-900/90 text-slate-300 border-slate-600/50", lifecycle.variant === "cancelled" && "bg-rose-950/90 text-rose-200 border-rose-500/50"),
					children: [lifecycle.variant === "ongoing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative flex size-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-emerald-500" })]
					}), lifecycle.label]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center gap-1 rounded-full bg-black/65 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-white/95 border border-white/20 shadow-md",
					children: event.mode === "ONLINE" ? "🌐 Online" : event.mode === "HYBRID" ? "⚡ Hybrid" : "📍 In Person"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-md bg-black/75 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-white border border-white/15 shadow-sm",
					children: event.categoryName || event.opportunityType
				}), event.prize && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-md bg-amber-400 text-amber-950 font-black px-2 py-0.5 text-[10px] shadow-sm flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate max-w-[130px]",
						children: event.prize
					})]
				})]
			})
		]
	});
}
function OpportunityCard({ event, layout = "grid" }) {
	const isFree = event.isFree !== false;
	const priceDisplay = isFree ? "Free" : event.studentPrice !== null && event.studentPrice !== void 0 && Number(event.studentPrice) > 0 ? `Rs. ${Number(event.studentPrice).toLocaleString()}` : event.price !== null && event.price !== void 0 && Number(event.price) > 0 ? `Rs. ${Number(event.price).toLocaleString()}` : "Paid";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("card-interactive group relative flex flex-col rounded-2xl border border-border/80 bg-card shadow-[var(--shadow-card)] overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/30", layout === "list" && "sm:flex-row sm:items-stretch"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("relative shrink-0 overflow-hidden", layout === "list" ? "sm:w-72 sm:min-w-[280px]" : "w-full"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/events/$slug",
				params: { slug: event.slug },
				tabIndex: -1,
				className: "block w-full h-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityPoster, {
					event,
					className: layout === "list" ? "h-full min-h-[190px]" : "aspect-[16/9]"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col justify-between p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs text-muted-foreground font-medium",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 shrink-0 text-foreground/90 font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3.5 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatRange(event.startDate, event.endDate) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 shrink-0 truncate max-w-[170px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: event.location || event.venue || (event.mode === "ONLINE" ? "Online" : event.universityName)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1 shrink-0 ml-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("rounded-md px-2 py-0.5 text-[11px] font-bold", isFree ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20" : "bg-primary/10 text-primary border border-primary/20"),
									children: priceDisplay
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-bold leading-snug tracking-tight text-foreground line-clamp-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/events/$slug",
							params: { slug: event.slug },
							className: "hover:text-primary transition-colors focus-visible:underline",
							children: event.title
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground",
						children: event.summary || event.description || "University opportunity hosted on CampusPulse."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-1.5 pt-0.5",
						children: [
							event.matchExplanation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchBadge, { explanation: event.matchExplanation }),
							event.programType && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-md bg-sky-500/10 border border-sky-500/25 px-2 py-0.5 text-[11px] font-bold text-sky-700 dark:text-sky-300",
								children: [
									"🎓 ",
									event.programType,
									" ",
									event.fundingType ? `· ${event.fundingType}` : ""
								]
							}),
							event.courseLevel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-md bg-teal-500/10 border border-teal-500/25 px-2 py-0.5 text-[11px] font-bold text-teal-700 dark:text-teal-300",
								children: ["📖 ", event.courseLevel]
							}),
							event.musicGenre && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-md bg-pink-500/10 border border-pink-500/25 px-2 py-0.5 text-[11px] font-bold text-pink-700 dark:text-pink-300",
								children: ["🎵 ", event.musicGenre]
							}),
							event.dramaGenre && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-md bg-violet-500/10 border border-violet-500/25 px-2 py-0.5 text-[11px] font-bold text-violet-700 dark:text-violet-300",
								children: ["🎭 ", event.dramaGenre]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeBadge, { scope: event.participationScope })
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex items-center justify-between gap-3 border-t border-border/70 pt-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
						initials: event.organizationInitials,
						className: "size-7 text-[10px]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-xs font-semibold text-foreground",
								children: event.organizationName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationBadge, {
								verified: event.organizationVerified,
								label: ""
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-[11px] text-muted-foreground",
							children: event.universityName
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex shrink-0 items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, { event }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "min-h-9 min-w-9 rounded-lg hover:bg-surface",
							"aria-label": `Share ${event.title}`,
							onClick: (e) => {
								e.preventDefault();
								e.stopPropagation();
								shareEvent(event);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4 text-muted-foreground hover:text-foreground" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							className: "font-semibold text-xs h-8 px-3 gap-1 shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/events/$slug",
								params: { slug: event.slug },
								children: [event.registered ? "View" : event.opportunityType === "HIGHER_STUDIES" ? "Apply" : event.opportunityType === "UNIVERSITY_COURSE" ? "Enroll" : event.opportunityType === "MUSIC" || event.opportunityType === "DRAMA" ? event.isFree ? "Register" : "Tickets" : "Register", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3 opacity-70" })]
							})
						})
					]
				})]
			})]
		})]
	});
}
/** Condensed card used inside horizontal feed rails and side panels. */
function OpportunityMiniCard({ event }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-interactive group relative flex h-full flex-col rounded-xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden transition-all duration-200 hover:shadow-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/events/$slug",
			params: { slug: event.slug },
			tabIndex: -1,
			className: "block shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityPoster, {
				event,
				className: "aspect-[16/9]"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col justify-between p-3.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
						initials: event.organizationInitials,
						className: "size-6 text-[9px]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "min-w-0 flex-1 truncate text-xs font-semibold text-muted-foreground",
						children: event.organizationName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {
						event,
						className: "min-h-7 min-w-7 -mr-1"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 line-clamp-2 text-xs font-bold leading-snug text-foreground group-hover:text-primary transition-colors",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/events/$slug",
					params: { slug: event.slug },
					children: event.title
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(event.startDate) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadlineBadge, { deadline: event.registrationDeadline })]
			})]
		})]
	});
}
/** Horizontally scrollable rail — social-app style browsing on any width. */
function OpportunityRail({ events }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0",
		children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "w-[280px] shrink-0 snap-start sm:w-[320px]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityMiniCard, { event: e })
		}, e.id))
	});
}
function OpportunityGrid({ events }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
		children: events.map((e, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityCard, { event: e }, e.id))
	});
}
function OpportunityList({ events }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityCard, {
			event: e,
			layout: "list"
		}, e.id))
	});
}
//#endregion
export { getEventLifecycle as a, OpportunityRail as i, OpportunityGrid as n, OpportunityList as r, OpportunityCard as t };
