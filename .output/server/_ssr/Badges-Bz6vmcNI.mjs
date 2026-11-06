import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn } from "./button-Dw0VHwRC.mjs";
import { Bt as CodeXml, I as Presentation, J as MapPin, Kt as CircleCheck, St as Film, V as Music, _n as BadgeCheck, at as Layers, dn as Briefcase, gt as Globe, ht as GraduationCap, m as Theater, mn as BookOpenCheck, n as Wrench, o as UserPlus, pt as HeartHandshake, r as Users, sn as CalendarClock, u as Trophy, y as Sparkles, yn as Award, yt as FlaskConical } from "../_libs/lucide-react.mjs";
import { r as deadlineInfo } from "./format-Cdcdxizs.mjs";
import { n as Root2, r as Trigger, t as Content2 } from "../_libs/radix-ui__react-hover-card.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Badges-Bz6vmcNI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var HoverCard = Root2;
var HoverCardTrigger = Trigger;
var HoverCardContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-hover-card-content-transform-origin)", className),
	...props
}));
HoverCardContent.displayName = Content2.displayName;
var OTHER_CONFIG = {
	label: "Opportunity",
	icon: Sparkles,
	style: "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30"
};
var OPPORTUNITY_TYPE_CONFIG = {
	HACKATHON: {
		label: "Hackathon",
		icon: CodeXml,
		style: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30"
	},
	COMPETITION: {
		label: "Competition",
		icon: Trophy,
		style: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30"
	},
	WORKSHOP: {
		label: "Workshop",
		icon: Wrench,
		style: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30"
	},
	CONFERENCE: {
		label: "Conference",
		icon: Presentation,
		style: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30"
	},
	RESEARCH: {
		label: "Research",
		icon: FlaskConical,
		style: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30"
	},
	CAREER: {
		label: "Career",
		icon: Briefcase,
		style: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
	},
	VOLUNTEERING: {
		label: "Volunteering",
		icon: HeartHandshake,
		style: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30"
	},
	SCHOLARSHIP: {
		label: "Scholarship",
		icon: Award,
		style: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/30"
	},
	TRAINING: {
		label: "Training",
		icon: GraduationCap,
		style: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30"
	},
	TEAM_OPPORTUNITY: {
		label: "Team Call",
		icon: UserPlus,
		style: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30"
	},
	MUSIC: {
		label: "Live Music & Concert",
		icon: Music,
		style: "bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30"
	},
	DRAMA: {
		label: "Drama & Theatre",
		icon: Theater,
		style: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30"
	},
	HIGHER_STUDIES: {
		label: "Higher Studies (MSc/PhD)",
		icon: GraduationCap,
		style: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30"
	},
	UNIVERSITY_COURSE: {
		label: "University Course",
		icon: BookOpenCheck,
		style: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30"
	},
	MOVIE: {
		label: "Film & Screening",
		icon: Film,
		style: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30"
	},
	OTHER: OTHER_CONFIG
};
function OpportunityTypeBadge({ type, className }) {
	if (!type) return null;
	const config = OPPORTUNITY_TYPE_CONFIG[type] ?? OTHER_CONFIG;
	const Icon = config.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-bold tracking-wide transition-colors", config.style, className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3" }), config.label]
	});
}
var SCOPE_CONFIG = {
	UNIVERSITY_ONLY: {
		label: "Host Campus Only",
		style: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30"
	},
	INTRA_UNIVERSITY: {
		label: "Host Campus Only",
		style: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30"
	},
	SELECTED_UNIVERSITIES: {
		label: "Selected Universities",
		style: "bg-blue-500/15 text-blue-800 dark:text-blue-300 border-blue-500/30"
	},
	ANY_UNIVERSITY_STUDENT: {
		label: "All Universities",
		style: "bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border-cyan-500/30"
	},
	INTER_UNIVERSITY: {
		label: "Inter-University",
		style: "bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border-cyan-500/30"
	},
	STUDENTS_AND_ALUMNI: {
		label: "Students & Alumni",
		style: "bg-teal-500/15 text-teal-800 dark:text-teal-300 border-teal-500/30"
	},
	PUBLIC: {
		label: "Open to Public",
		style: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
	},
	OPEN_PUBLIC: {
		label: "Open to Public",
		style: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
	},
	INVITATION_ONLY: {
		label: "Invitation Only",
		style: "bg-purple-500/15 text-purple-800 dark:text-purple-300 border-purple-500/30"
	},
	FACULTY_ONLY: {
		label: "Faculty Only",
		style: "bg-orange-500/15 text-orange-800 dark:text-orange-300 border-orange-500/30"
	},
	DEPARTMENT_ONLY: {
		label: "Department Only",
		style: "bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/30"
	}
};
function ScopeBadge({ scope, className }) {
	if (!scope) return null;
	const config = SCOPE_CONFIG[scope] ?? {
		label: scope,
		style: "bg-secondary/80 text-secondary-foreground border-transparent"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide transition-colors", config.style, className),
		title: `Participation scope: ${config.label}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3 shrink-0 opacity-80" }), config.label]
	});
}
function CategoryBadge({ name, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-md bg-accent px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-accent-foreground", className),
		children: name
	});
}
function VerificationBadge({ verified, label }) {
	if (!verified) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1 text-xs font-medium text-info",
		title: "Verified organisation",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
			className: "size-4",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only sm:not-sr-only",
			children: label ?? "Verified"
		})]
	});
}
var deadlineToneClass = {
	closed: "bg-muted text-muted-foreground",
	urgent: "bg-destructive/10 text-destructive",
	soon: "bg-warning/15 text-[oklch(0.45_0.13_62)]",
	open: "bg-success/12 text-[oklch(0.42_0.11_155)]"
};
function DeadlineBadge({ deadline, className }) {
	const info = deadlineInfo(deadline);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold", deadlineToneClass[info.tone], className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, {
			className: "size-3.5",
			"aria-hidden": true
		}), info.label]
	});
}
function ModeBadge({ mode }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(mode === "ONLINE" ? Globe : mode === "HYBRID" ? Users : MapPin, {
			className: "size-3.5",
			"aria-hidden": true
		}), mode === "ONLINE" ? "Online" : mode === "HYBRID" ? "Hybrid" : "In person"]
	});
}
var statusStyles = {
	DRAFT: "bg-muted text-muted-foreground",
	PENDING_REVIEW: "bg-warning/15 text-[oklch(0.45_0.13_62)]",
	PUBLISHED: "bg-success/12 text-[oklch(0.42_0.11_155)]",
	REJECTED: "bg-destructive/10 text-destructive",
	CANCELLED: "bg-destructive/15 text-destructive font-semibold",
	COMPLETED: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
	ONGOING: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 font-semibold",
	EXPIRED: "bg-secondary text-secondary-foreground"
};
var statusLabels = {
	DRAFT: "Draft",
	PENDING_REVIEW: "Pending review",
	PUBLISHED: "Published",
	REJECTED: "Rejected",
	CANCELLED: "Cancelled",
	COMPLETED: "Completed",
	ONGOING: "Live Now",
	EXPIRED: "Expired"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold", statusStyles[status]),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-1.5 rounded-full bg-current",
			"aria-hidden": true
		}), statusLabels[status]]
	});
}
function OrgAvatar({ initials, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: cn("grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-surface text-sm font-bold text-navy-muted", className),
		children: initials
	});
}
function MatchBadge({ explanation, className }) {
	if (!explanation) return null;
	const score = explanation.score || explanation.percentage || 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HoverCard, {
		openDelay: 150,
		closeDelay: 150,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoverCardTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: cn("inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-bold tracking-wide transition-all shadow-xs", score >= 80 ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25" : score >= 60 ? "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30 hover:bg-blue-500/25" : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/25", className),
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
					className: "size-3 shrink-0",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: explanation.badgeLabel || `${score}% Match` })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HoverCardContent, {
			align: "start",
			className: "w-72 p-3 text-xs shadow-xl border-border bg-popover text-popover-foreground z-50 rounded-xl",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold flex items-center gap-1.5 text-foreground text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							className: "size-3.5 text-primary",
							"aria-hidden": true
						}), "Personalized Compatibility"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-extrabold text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary",
						children: [score, "%"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[11px] text-muted-foreground",
					children: "Rule-based match calculated from your university, skills, and activity:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1.5",
					children: (explanation.reasons || []).map((reason, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-1.5 text-foreground text-[11px] leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
							className: "size-3.5 text-emerald-500 shrink-0 mt-0.5",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: reason })]
					}, idx))
				})
			]
		})]
	});
}
//#endregion
export { OpportunityTypeBadge as a, StatusBadge as c, ModeBadge as i, VerificationBadge as l, DeadlineBadge as n, OrgAvatar as o, MatchBadge as r, ScopeBadge as s, CategoryBadge as t };
