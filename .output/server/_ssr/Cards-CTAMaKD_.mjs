import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as MapPin, ht as GraduationCap, r as Users, un as Building2 } from "../_libs/lucide-react.mjs";
import { l as VerificationBadge, o as OrgAvatar } from "./Badges-Bz6vmcNI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Cards-CTAMaKD_.js
var import_jsx_runtime = require_jsx_runtime();
function UniversityCard({ university }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-interactive group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:border-primary/40 hover:shadow-md",
		children: [university.bannerUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-20 w-full overflow-hidden border-b border-border/50 bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: university.bannerUrl,
				alt: `${university.name} banner`,
				className: "size-full object-cover transition-transform duration-300 group-hover:scale-105",
				onError: (e) => {
					e.target.style.display = "none";
				}
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3.5",
					children: [university.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-12 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-white p-1 shadow-xs overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: university.logoUrl,
							alt: university.name,
							className: "size-full object-contain",
							onError: (e) => {
								e.target.style.display = "none";
							}
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "grid size-12 shrink-0 place-items-center rounded-lg text-sm font-extrabold text-navy-foreground shadow-xs",
						style: { backgroundColor: university.logoColor || "#1E3A8A" },
						children: university.shortName || university.code || "UNI"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate text-base font-bold text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/universities/$slug",
								params: { slug: university.slug },
								className: "after:absolute after:inset-0 after:content-[''] hover:text-primary transition-colors",
								children: university.name
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								className: "size-3.5 shrink-0 text-muted-foreground/80",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: university.location
							})]
						})]
					})]
				}),
				university.about && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground",
					children: university.about
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 grid grid-cols-3 gap-2 border-t border-border/60 pt-3 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Faculties"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-0.5 text-base font-bold text-foreground",
							children: university.facultyCount ?? university.faculties?.length ?? 0
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Societies"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-0.5 text-base font-bold text-foreground",
							children: university.organizationCount ?? 0
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Opportunities"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-0.5 text-base font-bold text-primary",
							children: university.eventCount ?? 0
						})] })
					]
				})
			]
		})]
	});
}
function OrganizationCard({ organization }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-interactive relative rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
					initials: organization.initials,
					className: "size-12"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate text-base font-bold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/organizations/$slug",
								params: { slug: organization.slug },
								className: "after:absolute after:inset-0 after:content-['']",
								children: organization.name
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationBadge, {
							verified: organization.verified,
							label: ""
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {
							className: "size-3.5",
							"aria-hidden": true
						}), organization.universityName]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 line-clamp-2 text-sm text-muted-foreground",
				children: organization.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
						className: "size-3.5",
						"aria-hidden": true
					}),
					organization.memberCount,
					" members"
				]
			})
		]
	});
}
function CompatibilityScore({ value, className }) {
	const tone = value >= 85 ? "text-success" : value >= 70 ? "text-primary" : "text-muted-foreground";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-2.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative h-2 w-24 overflow-hidden rounded-full bg-muted",
			role: "img",
			"aria-label": `Compatibility ${value} out of 100`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute inset-y-0 left-0 rounded-full bg-primary",
				style: { width: `${value}%` }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("text-sm font-bold", tone),
			children: [value, "% match"]
		})]
	});
}
function TeamCard({ team, onRequest, isMember = false, isLeader = false }) {
	const isFull = team.maxMembers && team.members.length >= team.maxMembers || team.openSlots <= 0;
	const isRecruiting = team.isOpen !== false && !isFull;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-interactive flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate text-base font-bold",
							children: team.name
						}), isRecruiting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400",
							children: "Recruiting"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground",
							children: isFull ? "Full" : "Closed"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 inline-flex items-center gap-1.5 truncate text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
							className: "size-3.5 shrink-0 text-primary",
							"aria-hidden": true
						}), team.eventTitle || "Open Campus Squad"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "shrink-0 rounded-md bg-surface px-2.5 py-1 text-xs font-semibold text-foreground border border-border/60",
					children: [
						team.members.length,
						"/",
						team.maxMembers || 4,
						" members"
					]
				})]
			}),
			team.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground",
				children: team.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompatibilityScore, {
				value: team.compatibility,
				className: "mt-3.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-2 text-sm",
				children: [team.requiredRoles && team.requiredRoles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: "Roles:"
						}),
						" ",
						team.requiredRoles.join(", ")
					]
				}), team.skills && team.skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5 pt-0.5",
					children: team.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/40",
						children: s
					}, s))
				})]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex items-center justify-between gap-2 border-t border-border pt-3.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 truncate",
				children: [team.leaderAvatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: team.leaderAvatarUrl,
					alt: team.leader,
					className: "size-6 rounded-full object-cover border border-border"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
					initials: team.leader?.slice(0, 2).toUpperCase() || "LD",
					className: "size-6 text-[10px]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "truncate text-xs text-muted-foreground",
					children: ["Led by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: team.leader
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					size: "sm",
					className: "h-8 text-xs font-semibold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/account/teams/$id",
						params: { id: team.id },
						children: "View squad"
					})
				}), !isMember && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					className: "h-8 text-xs font-semibold",
					disabled: !isRecruiting,
					onClick: () => onRequest?.(team),
					children: isRecruiting ? "Request to join" : "Squad full"
				})]
			})]
		})]
	});
}
//#endregion
export { UniversityCard as i, OrganizationCard as n, TeamCard as r, CompatibilityScore as t };
