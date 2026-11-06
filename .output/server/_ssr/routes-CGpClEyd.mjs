import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Bt as CodeXml, I as Presentation, J as MapPin, K as Menu, Lt as Cpu, Mt as Dumbbell, Sn as ArrowRight, W as MicVocal, Z as LogOut, cn as CalendarCheck, hn as Bell, ht as GraduationCap, jt as Earth, k as Search, mt as Handshake, nt as Lightbulb, on as CalendarDays, pt as HeartHandshake, r as Users, rn as Camera, rt as LayoutGrid, t as X, u as Trophy, y as Sparkles, zt as Compass } from "../_libs/lucide-react.mjs";
import { t as eventsApi } from "./events-Dtjwkx07.mjs";
import { i as GridSkeleton, n as EmptyState, r as ErrorState } from "./States-DTPgRZKE.mjs";
import { i as formatDate } from "./format-Cdcdxizs.mjs";
import { n as DeadlineBadge } from "./Badges-Bz6vmcNI.mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { t as directoryApi } from "./directory-BaY2c_G3.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-D3fTZEWA.mjs";
import { a as SheetTrigger, i as SheetTitle, n as SheetContent, r as SheetHeader, t as Sheet } from "./sheet-KodPKk9Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CGpClEyd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LandingReveal({ children, className, delayMs = 0, as: Tag = "div" }) {
	const ref = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setVisible(true);
			return;
		}
		const observer = new IntersectionObserver(([entry]) => {
			if (entry?.isIntersecting) {
				setVisible(true);
				observer.disconnect();
			}
		}, {
			threshold: .12,
			rootMargin: "0px 0px -48px 0px"
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		className: cn("lp-reveal", visible && "lp-reveal-in", className),
		style: { transitionDelay: visible ? `${delayMs}ms` : void 0 },
		children
	});
}
var CATEGORIES = [
	{
		title: "Technology & Computing",
		body: "Hackathons, coding nights, and tech societies.",
		icon: Cpu,
		to: "/explore",
		search: { opportunityType: "HACKATHON" },
		tone: "bg-[#101B35] text-white"
	},
	{
		title: "Entrepreneurship",
		body: "Startups, pitch nights, and career-building rooms.",
		icon: Lightbulb,
		to: "/explore",
		search: { opportunityType: "CAREER" },
		tone: "bg-white text-[#101B35]"
	},
	{
		title: "Arts & Photography",
		body: "Music, drama, exhibitions, and creative collectives.",
		icon: Camera,
		to: "/explore",
		search: { opportunityType: "MUSIC" },
		tone: "bg-[#F5C542] text-[#101B35]"
	},
	{
		title: "Sports & Recreation",
		body: "Matches, fitness, and campus recreation days.",
		icon: Dumbbell,
		to: "/explore",
		search: { opportunityType: "SPORTS" },
		tone: "bg-white text-[#101B35]"
	},
	{
		title: "Volunteering",
		body: "Service projects and community-minded groups.",
		icon: HeartHandshake,
		to: "/explore",
		search: { opportunityType: "VOLUNTEERING" },
		tone: "bg-white text-[#101B35]"
	},
	{
		title: "Academic Communities",
		body: "Courses, research, and faculty-led learning.",
		icon: GraduationCap,
		to: "/explore",
		search: { opportunityType: "RESEARCH" },
		tone: "bg-white text-[#101B35]"
	}
];
function LandingCommunities({ universitiesQuery, orgsQuery }) {
	const universities = universitiesQuery.data?.slice(0, 8) ?? [];
	const orgs = orgsQuery.data?.slice(0, 6) ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-[#101B35]/6 bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LandingReveal, {
					className: "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase tracking-[0.2em] text-[#c79a1d]",
								children: "Communities"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-3xl font-black tracking-tight text-[#101B35] sm:text-4xl",
								children: "Find your people. Build your community."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-base text-[#64748B]",
								children: "Explore societies, clubs, and university communities across interests — from sport and service to art and research."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/universities",
						className: "inline-flex items-center gap-2 text-sm font-bold text-[#101B35] hover:text-[#c79a1d]",
						children: ["Explore university communities", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							className: "size-4",
							"aria-hidden": true
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: CATEGORIES.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingReveal, {
						delayMs: index * 60,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							search: item.search,
							className: `group flex h-full flex-col justify-between rounded-[1.35rem] border border-[#101B35]/8 p-6 transition-transform duration-300 hover:-translate-y-1 ${item.tone}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
								className: "size-6 opacity-90",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `mt-2 text-sm leading-relaxed ${item.tone.includes("bg-white") ? "text-[#64748B]" : "opacity-80"}`,
									children: item.body
								})]
							})]
						})
					}, item.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold uppercase tracking-[0.16em] text-[#64748B]",
						children: "Universities"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: universitiesQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, { count: 6 }) : universitiesQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => universitiesQuery.refetch() }) : universities.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-6 text-sm text-[#64748B]",
							children: "No active universities available right now."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
							children: universities.map((university) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/universities/$slug",
								params: { slug: university.slug },
								className: "flex items-center gap-3 rounded-2xl border border-[#101B35]/8 bg-[#F7F8FC] p-3 transition-colors hover:border-[#F5C542]",
								children: [university.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: university.logoUrl,
									alt: "",
									className: "size-11 rounded-xl bg-white object-contain p-1"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-11 place-items-center rounded-xl text-xs font-extrabold text-white",
									style: { backgroundColor: university.logoColor || "#101B35" },
									children: university.shortName || university.code || "UNI"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-sm font-bold text-[#101B35]",
										children: university.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-xs text-[#64748B]",
										children: university.location
									})]
								})]
							}, university.id))
						})
					})]
				}),
				orgsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => orgsQuery.refetch() })
				}) : orgs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold uppercase tracking-[0.16em] text-[#64748B]",
						children: "Student organisations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
						children: orgs.map((org) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/organizations/$slug",
							params: { slug: org.slug },
							className: "rounded-2xl border border-[#101B35]/8 bg-white p-4 transition-colors hover:border-[#F5C542]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-bold text-[#101B35]",
								children: org.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 truncate text-xs text-[#64748B]",
								children: org.universityName
							})]
						}, org.id))
					})]
				}) : null
			]
		})
	});
}
var CAMPUSPULSE_LOGO_SRC = "/brand/campuspulse-logo.jpg";
function LandingLogo({ className, markClassName, showWordmark = true, inverted = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: cn("inline-flex items-center gap-2.5", className),
		"aria-label": "CampusPulse home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: CAMPUSPULSE_LOGO_SRC,
			alt: "CampusPulse",
			width: 160,
			height: 160,
			className: cn("size-10 shrink-0 rounded-xl object-cover shadow-[0_8px_20px_-12px_rgba(16,27,53,0.45)]", markClassName)
		}), showWordmark && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex min-w-0 flex-col leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("text-[15px] font-extrabold tracking-tight", inverted ? "text-white" : "text-[#101B35]"),
				children: "CAMPUSPULSE"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("mt-1 text-[10px] font-medium tracking-wide", inverted ? "text-white/70" : "text-[#64748B]"),
				children: "One Platform. Every University Opportunity."
			})]
		})]
	});
}
function LandingCta() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-7xl px-4 pb-20 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LandingReveal, {
			className: "relative overflow-hidden rounded-[1.75rem] bg-[#101B35] px-6 py-16 text-center sm:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "pointer-events-none absolute -left-10 top-0 size-56 rounded-full bg-[#F5C542]/20 blur-3xl"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "pointer-events-none absolute -right-8 bottom-0 size-48 rounded-full bg-[#F5C542]/15 blur-3xl"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingLogo, {
							inverted: true,
							showWordmark: false,
							markClassName: "size-14 rounded-2xl"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl",
							children: "Make Your University Life Count."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-xl text-base text-white/70",
							children: "Your next opportunity, experience, or connection is just one discovery away."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/register",
							className: "lp-gold-btn mt-8 inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-bold",
							children: "Get Started"
						})
					]
				})
			]
		})
	});
}
var LANDING_NAV_LINKS = [
	{
		to: "/explore",
		label: "Explore"
	},
	{
		to: "/universities",
		label: "Universities"
	},
	{
		to: "/account/teams",
		label: "Teams"
	}
];
function eventPosterUrl(event) {
	return event.posterUrl || event.coverImageUrl || event.bannerUrl || null;
}
function LandingEvents({ query, categoriesQuery }) {
	const featured = query.data?.slice(0, 6) ?? [];
	const closing = [...query.data ?? []].sort((a, b) => +new Date(a.registrationDeadline) - +new Date(b.registrationDeadline)).slice(0, 4);
	const categories = categoriesQuery.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LandingReveal, {
				className: "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-[0.2em] text-[#c79a1d]",
							children: "Events"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-black tracking-tight text-[#101B35] sm:text-4xl",
							children: "Something exciting is happening."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-base text-[#64748B]",
							children: "Find the events, experiences, and activities that bring campus life together."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/explore",
					className: "inline-flex items-center gap-2 text-sm font-bold text-[#101B35] hover:text-[#c79a1d]",
					children: ["Explore All Events", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "size-4",
						"aria-hidden": true
					})]
				})]
			}),
			categories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/explore",
					search: { category: category.id },
					className: "rounded-full border border-[#101B35]/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#101B35] transition-colors hover:border-[#F5C542] hover:bg-[#F5C542]/15",
					children: [category.name, category.count ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1 text-[#64748B]",
						children: category.count
					}) : null]
				}, category.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, {}) : query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => query.refetch() }) : featured.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No events to show yet",
					description: "When societies publish events, they will appear here. You can still browse the Explore page.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/explore",
						className: "lp-gold-btn inline-flex h-10 items-center rounded-full px-5 text-sm font-bold",
						children: "Explore All Events"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 md:grid-cols-2 xl:grid-cols-3",
					children: featured.map((event, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingReveal, {
						delayMs: index * 70,
						as: "article",
						className: index === 0 ? "md:col-span-2" : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingEventCard, {
							event,
							featured: index === 0
						})
					}, event.id))
				})
			}),
			closing.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LandingReveal, {
				className: "mt-10 overflow-hidden rounded-[1.35rem] border border-[#101B35]/8 bg-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-[#101B35]/8 px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold text-[#101B35]",
						children: "Upcoming deadlines"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-[#64748B]",
						children: "Registration windows that close soon."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-[#101B35]/8",
					children: closing.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-4 px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/events/$slug",
								params: { slug: event.slug },
								className: "truncate text-sm font-semibold text-[#101B35] hover:underline",
								children: event.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-[#64748B]",
								children: [
									event.organizationName,
									" · ",
									event.universityName
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadlineBadge, { deadline: event.registrationDeadline })]
					}, event.id))
				})]
			})
		]
	});
}
function LandingEventCard({ event, featured }) {
	const poster = eventPosterUrl(event);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/events/$slug",
		params: { slug: event.slug },
		className: "group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[#101B35]/8 bg-white shadow-[0_16px_40px_-28px_rgba(16,27,53,0.35)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(16,27,53,0.4)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative overflow-hidden bg-[#101B35]", featured ? "aspect-[16/8] md:aspect-[21/9]" : "aspect-[16/10]"),
			children: [poster ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: poster,
				alt: event.title,
				className: "lp-img-zoom h-full w-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full w-full items-end bg-gradient-to-br from-[#1a2b52] to-[#101B35] p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-bold text-white/80",
					children: event.categoryName || "Campus event"
				})
			}), event.categoryName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#101B35]",
				children: event.categoryName
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "line-clamp-2 text-lg font-bold leading-snug text-[#101B35]",
					children: event.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 truncate text-sm text-[#64748B]",
					children: [event.organizationName, event.universityName ? ` · ${event.universityName}` : ""]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#64748B]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
							className: "size-3.5 text-[#c79a1d]",
							"aria-hidden": true
						}), formatDate(event.startDate)]
					}), event.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex min-w-0 items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							className: "size-3.5 shrink-0 text-[#c79a1d]",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: event.location
						})]
					})]
				})
			]
		})]
	});
}
function LandingFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-[#101B35] text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingLogo, { inverted: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-sm text-sm leading-relaxed text-white/65",
					children: "CampusPulse is a university discovery platform for events, student communities, and opportunities — so campus life is easier to find and join."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
					title: "Explore",
					links: [
						{
							to: "/explore",
							label: "All events"
						},
						{
							to: "/universities",
							label: "Universities"
						},
						{
							to: "/explore",
							label: "Workshops",
							search: { opportunityType: "WORKSHOP" }
						}
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
					title: "Communities",
					links: [
						{
							to: "/universities",
							label: "University communities"
						},
						{
							to: "/account/teams",
							label: "Team finder"
						},
						{
							to: "/explore",
							label: "Student organisations"
						}
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
					title: "Opportunities",
					links: [
						{
							to: "/explore",
							label: "Volunteering",
							search: { opportunityType: "VOLUNTEERING" }
						},
						{
							to: "/explore",
							label: "Hackathons",
							search: { opportunityType: "HACKATHON" }
						},
						{
							to: "/login",
							label: "Login"
						},
						{
							to: "/register",
							label: "Sign Up"
						}
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-white/10 py-5 text-center text-xs text-white/50",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" CampusPulse. One Platform. Every University Opportunity."
			]
		})]
	});
}
function FooterCol({ title, links }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "text-xs font-bold uppercase tracking-[0.18em] text-[#F5C542]",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 space-y-2.5",
		children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: link.to,
			search: link.search,
			className: "text-sm text-white/70 transition-colors hover:text-white",
			children: link.label
		}) }, `${link.to}-${link.label}`))
	})] });
}
var CAMPUS_PHOTOS = [
	{
		src: "/institutions/uom.jpg",
		alt: "University campus gathering"
	},
	{
		src: "/institutions/uoc.jpg",
		alt: "Students at a university event"
	},
	{
		src: "/institutions/usj.jpg",
		alt: "Campus community moment"
	}
];
function LandingHero({ events }) {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const featured = events[0];
	const sideA = events[1];
	const sideB = events[2];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-[#F7F8FC]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -left-24 top-10 size-[28rem] rounded-full bg-[#F5C542]/20 blur-3xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -right-16 bottom-0 size-[22rem] rounded-full bg-[#101B35]/10 blur-3xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LandingReveal, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-2 rounded-full border border-[#101B35]/10 bg-white px-3 py-1.5 text-xs font-semibold text-[#101B35] shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							className: "size-3.5 text-[#e0ae2a]",
							"aria-hidden": true
						}), "One Platform. Every University Opportunity."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-6 max-w-xl text-[2.5rem] font-black leading-[1.05] tracking-tight text-[#101B35] sm:text-5xl lg:text-[3.5rem]",
						children: ["Your Campus Life.", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block text-[#101B35]",
							children: ["All in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#c79a1d]",
								children: "One Place."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-lg text-base leading-relaxed text-[#64748B] sm:text-lg",
						children: "Discover exciting events, connect with university communities, find opportunities, and make every moment of university life count."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/explore",
							className: "lp-gold-btn inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-bold",
							children: "Explore CampusPulse"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: user ? "/universities" : "/register",
							className: "inline-flex h-12 items-center justify-center rounded-full border border-[#101B35]/15 bg-white px-7 text-sm font-bold text-[#101B35] transition-colors hover:border-[#101B35]/30 hover:bg-white",
							children: "Join the Community"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-6 flex max-w-lg flex-col gap-2 sm:flex-row",
						onSubmit: (e) => {
							e.preventDefault();
							navigate({
								to: "/explore",
								search: { q }
							});
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "landing-hero-search",
								className: "sr-only",
								children: "Search events and opportunities"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#64748B]",
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "landing-hero-search",
									value: q,
									onChange: (e) => setQ(e.target.value),
									placeholder: "Search events, workshops, societies...",
									className: "h-12 rounded-full border-[#101B35]/10 bg-white pl-9 text-[#172033] shadow-sm"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "lp-navy-btn h-12 rounded-full px-6 text-sm font-bold",
								children: "Search"
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingReveal, {
					delayMs: 120,
					className: "relative min-h-[22rem] sm:min-h-[28rem]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto aspect-[4/5] w-full max-w-[28rem] lg:ml-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-x-8 bottom-4 top-10 overflow-hidden rounded-[1.75rem] bg-[#101B35] shadow-[0_30px_60px_-28px_rgba(16,27,53,0.55)]",
								children: featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/events/$slug",
									params: { slug: featured.slug },
									className: "group block h-full",
									children: [
										eventPosterUrl(featured) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: eventPosterUrl(featured),
											alt: featured.title,
											className: "lp-img-zoom h-full w-full object-cover"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: CAMPUS_PHOTOS[0].src,
											alt: featured.title,
											className: "lp-img-zoom h-full w-full object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[#101B35] via-[#101B35]/20 to-transparent" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute inset-x-0 bottom-0 p-5 text-white",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5C542]",
													children: featured.categoryName || "Campus event"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 line-clamp-2 text-lg font-bold leading-snug",
													children: featured.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-2 flex items-center gap-1.5 text-xs text-white/75",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
														className: "size-3.5",
														"aria-hidden": true
													}), formatDate(featured.startDate)]
												})
											]
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative h-full",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: CAMPUS_PHOTOS[0].src,
											alt: CAMPUS_PHOTOS[0].alt,
											className: "h-full w-full object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[#101B35] via-[#101B35]/15 to-transparent" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute inset-x-0 bottom-0 p-5 text-white",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5C542]",
												children: "Illustrative preview"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-lg font-bold",
												children: "University life, gathered in one feed"
											})]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroMiniCard, {
								className: "lp-float absolute -left-2 top-6 hidden w-48 sm:block lg:-left-10",
								event: sideA,
								fallback: {
									kicker: "Community",
									title: "Find your society",
									meta: "Clubs & student groups",
									image: CAMPUS_PHOTOS[1].src
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroMiniCard, {
								className: "lp-float-delayed absolute -right-1 bottom-16 hidden w-52 sm:block lg:-right-6",
								event: sideB,
								fallback: {
									kicker: "Opportunities",
									title: "Workshops & teams",
									meta: "Join what fits you",
									image: CAMPUS_PHOTOS[2].src
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lp-float-tilt absolute left-6 top-[42%] hidden items-center gap-2 rounded-full border border-white/20 bg-white/95 px-3 py-2 shadow-lg sm:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-7 place-items-center rounded-full bg-[#F5C542] text-[#101B35]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
										className: "size-3.5",
										"aria-hidden": true
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-semibold leading-tight text-[#101B35]",
									children: ["Stay close to", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-[#64748B] font-medium",
										children: "campus moments"
									})]
								})]
							})
						]
					})
				})]
			})
		]
	});
}
function HeroMiniCard({ className, event, fallback }) {
	const poster = event ? eventPosterUrl(event) : null;
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: poster || fallback.image,
		alt: event?.title || fallback.title,
		className: "h-16 w-16 shrink-0 rounded-xl object-cover"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[10px] font-bold uppercase tracking-wider text-[#c79a1d]",
				children: event?.categoryName || fallback.kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 block truncate text-sm font-bold text-[#101B35]",
				children: event?.title || fallback.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-0.5 flex items-center gap-1 truncate text-[11px] text-[#64748B]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
					className: "size-3 shrink-0",
					"aria-hidden": true
				}), event ? event.organizationName || event.location : fallback.meta]
			})
		]
	})] });
	if (event) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/events/$slug",
		params: { slug: event.slug },
		className: `flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-2.5 shadow-[0_18px_40px_-24px_rgba(16,27,53,0.55)] backdrop-blur ${className ?? ""}`,
		children: inner
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-2.5 shadow-[0_18px_40px_-24px_rgba(16,27,53,0.55)] backdrop-blur ${className ?? ""}`,
		children: inner
	});
}
var STEPS = [
	{
		n: "01",
		title: "Discover",
		body: "Explore events, communities, and opportunities across universities.",
		icon: Compass
	},
	{
		n: "02",
		title: "Connect",
		body: "Find communities, meet students, and join activities.",
		icon: Handshake
	},
	{
		n: "03",
		title: "Participate",
		body: "Register for events, build teams, and experience university life.",
		icon: CalendarCheck
	}
];
function LandingHowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-[#101B35]/6 bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LandingReveal, {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-[0.2em] text-[#c79a1d]",
					children: "How it works"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl font-black tracking-tight text-[#101B35] sm:text-4xl",
					children: "Three steps into campus life."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "relative mt-12 grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "pointer-events-none absolute left-[16%] right-[16%] top-11 hidden h-px bg-gradient-to-r from-transparent via-[#F5C542] to-transparent lg:block"
				}), STEPS.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingReveal, {
					delayMs: index * 90,
					as: "li",
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[1.35rem] border border-[#101B35]/8 bg-[#F7F8FC] p-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-14 place-items-center rounded-2xl bg-white text-[#101B35] shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, {
									className: "size-6",
									"aria-hidden": true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 text-xs font-bold tracking-[0.2em] text-[#c79a1d]",
								children: ["STEP ", step.n]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-2xl font-black text-[#101B35]",
								children: step.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-[#64748B]",
								children: step.body
							})
						]
					})
				}, step.n))]
			})]
		})
	});
}
function LandingNav() {
	const { user, loading, logout } = useAuth();
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 16);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: cn("sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300", scrolled ? "border-b border-[#101B35]/8 bg-white/92 shadow-[0_8px_30px_-18px_rgba(16,27,53,0.35)] backdrop-blur-md" : "border-b border-transparent bg-transparent"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingLogo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Primary",
					className: "absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex",
					children: LANDING_NAV_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "rounded-full px-4 py-2 text-sm font-semibold text-[#172033]/75 transition-colors hover:bg-[#101B35]/5 hover:text-[#101B35]",
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden h-10 w-40 rounded-full bg-[#101B35]/5 sm:block",
						"aria-hidden": true
					}) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-2 sm:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							className: "rounded-full text-[#172033] hover:bg-[#101B35]/5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/account",
								children: "My feed"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "min-h-11 min-w-11 rounded-full",
								"aria-label": "Account menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-9 place-items-center rounded-full bg-[#101B35] text-xs font-bold text-white",
									children: user.initials
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							className: "w-56",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold",
									children: user.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-normal text-muted-foreground",
									children: user.email
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/account",
										children: "My feed"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/account/profile",
										children: "Profile"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: logout,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
										className: "size-4",
										"aria-hidden": true
									}), "Sign out"]
								})
							]
						})] })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-2 sm:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							className: "rounded-full px-4 font-semibold text-[#172033] hover:bg-[#101B35]/5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Login"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "lp-gold-btn h-10 rounded-full px-5 font-semibold shadow-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/register",
								children: "Sign Up"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
						open: menuOpen,
						onOpenChange: setMenuOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "min-h-11 min-w-11 rounded-full lg:hidden",
								"aria-label": menuOpen ? "Close menu" : "Open menu",
								children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
							side: "right",
							className: "w-[min(100%,320px)] bg-white p-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
								className: "border-b border-[#101B35]/8 p-5 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
									className: "sr-only",
									children: "Navigation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingLogo, {})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								className: "flex flex-col gap-1 p-4",
								"aria-label": "Mobile",
								children: [LANDING_NAV_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: item.to,
									onClick: () => setMenuOpen(false),
									className: "rounded-xl px-3 py-3 text-base font-semibold text-[#172033] hover:bg-[#F7F8FC]",
									children: item.label
								}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 grid gap-2 border-t border-[#101B35]/8 pt-4",
									children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										className: "lp-navy-btn h-11 rounded-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/account",
											onClick: () => setMenuOpen(false),
											children: "My feed"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										className: "h-11 rounded-full",
										onClick: () => {
											setMenuOpen(false);
											logout();
										},
										children: "Sign out"
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "outline",
										className: "h-11 rounded-full border-[#101B35]/15",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/login",
											onClick: () => setMenuOpen(false),
											children: "Login"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										className: "lp-gold-btn h-11 rounded-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/register",
											onClick: () => setMenuOpen(false),
											children: "Sign Up"
										})
									})] })
								})]
							})]
						})]
					})]
				})
			]
		})
	});
}
var ITEMS = [
	{
		title: "Volunteering opportunities",
		body: "Give time to campus and community causes that need extra hands.",
		to: "/explore",
		search: { opportunityType: "VOLUNTEERING" },
		icon: HeartHandshake,
		span: "md:col-span-4 md:row-span-2",
		tone: "bg-[#101B35] text-white min-h-[16rem]",
		image: "/institutions/uoc.jpg"
	},
	{
		title: "Team formation",
		body: "Find teammates by interest and availability.",
		to: "/account/teams",
		search: void 0,
		icon: Users,
		span: "md:col-span-2",
		tone: "bg-white text-[#101B35]",
		image: null
	},
	{
		title: "Competitions and hackathons",
		body: "Challenges, prizes, and late-night building.",
		to: "/explore",
		search: { opportunityType: "HACKATHON" },
		icon: CodeXml,
		span: "md:col-span-2",
		tone: "bg-[#F5C542] text-[#101B35]",
		image: null
	},
	{
		title: "Workshops and seminars",
		body: "Learn a skill, hear a speaker, leave with something new.",
		to: "/explore",
		search: { opportunityType: "WORKSHOP" },
		icon: Presentation,
		span: "md:col-span-2",
		tone: "bg-white text-[#101B35]",
		image: null
	},
	{
		title: "Networking opportunities",
		body: "Meet organisers and career-facing campus sessions.",
		to: "/explore",
		search: { opportunityType: "CAREER" },
		icon: MicVocal,
		span: "md:col-span-2",
		tone: "relative overflow-hidden bg-[#101B35] text-white",
		image: "/institutions/sliit.jpg"
	},
	{
		title: "Student activities",
		body: "Sports, culture, and everything in between.",
		to: "/explore",
		search: void 0,
		icon: Trophy,
		span: "md:col-span-2",
		tone: "relative overflow-hidden bg-white text-[#101B35]",
		image: "/institutions/usj.jpg"
	}
];
function LandingOpportunities() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LandingReveal, {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-[0.2em] text-[#c79a1d]",
					children: "Opportunities"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl font-black tracking-tight text-[#101B35] sm:text-4xl",
					children: "More than just university events."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-base text-[#64748B]",
					children: "CampusPulse gathers the different ways students participate — service, teams, learning, and celebration — without scattering them across posters and chats."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-4 md:grid-cols-6",
			children: ITEMS.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingReveal, {
				delayMs: index * 50,
				className: item.span,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					search: item.search,
					className: `group relative flex h-full min-h-[9.5rem] flex-col justify-between overflow-hidden rounded-[1.35rem] border border-[#101B35]/8 p-6 transition-transform duration-300 hover:-translate-y-1 ${item.tone}`,
					children: [item.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.image,
						alt: "",
						className: "lp-img-zoom pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex h-full flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
							className: "size-6",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-sm text-sm leading-relaxed opacity-80",
								children: item.body
							})]
						})]
					})]
				})
			}, item.title))
		})]
	});
}
var VALUES = [
	{
		icon: Compass,
		title: "Discover Events",
		body: "Concerts, workshops, sports days, and campus gatherings — browsable in one feed."
	},
	{
		icon: Users,
		title: "Find Communities",
		body: "Societies and clubs from universities, ready for you to explore and join."
	},
	{
		icon: Sparkles,
		title: "Explore Opportunities",
		body: "Volunteering, teams, competitions, and learning beyond a single campus poster."
	},
	{
		icon: GraduationCap,
		title: "Connect with Students",
		body: "Meet people around shared interests and turn discovery into participation."
	}
];
function LandingValueStrip() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative z-10 mx-auto -mt-4 max-w-7xl px-4 sm:-mt-8 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingReveal, {
			className: "grid gap-3 rounded-[1.5rem] border border-[#101B35]/8 bg-white p-3 shadow-[0_24px_60px_-36px_rgba(16,27,53,0.35)] sm:grid-cols-2 lg:grid-cols-4 lg:p-4",
			children: VALUES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl px-4 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-11 place-items-center rounded-2xl bg-[#F5C542]/20 text-[#101B35]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
							className: "size-5",
							"aria-hidden": true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-sm font-bold text-[#101B35]",
						children: item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-sm leading-relaxed text-[#64748B]",
						children: item.body
					})
				]
			}, item.title))
		})
	});
}
var POINTS = [
	{
		icon: LayoutGrid,
		title: "Everything in one place",
		body: "Events, societies, and opportunities without hunting through separate chats and posters."
	},
	{
		icon: Earth,
		title: "Look beyond your campus",
		body: "Discover what neighbouring universities and student organisations are putting on."
	},
	{
		icon: Users,
		title: "Connect with student communities",
		body: "Browse clubs and societies, then follow the activities that match how you like to spend time."
	},
	{
		icon: Bell,
		title: "Stay close to what is happening",
		body: "Save what matters and keep upcoming campus activities in view so less slips by."
	}
];
function LandingWhy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LandingReveal, {
				className: "relative overflow-hidden rounded-[1.75rem]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/institutions/uom.jpg",
						alt: "Students gathered on a university campus",
						className: "h-full min-h-[22rem] w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[#101B35]/80 via-transparent to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "absolute bottom-6 left-6 right-6 text-lg font-bold text-white",
						children: "University life is bigger than a single notice board."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LandingReveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold uppercase tracking-[0.2em] text-[#c79a1d]",
				children: "Why CampusPulse"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-3xl font-black tracking-tight text-[#101B35] sm:text-4xl",
				children: "Built for how students actually find things."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2",
				children: POINTS.map((point, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LandingReveal, {
					delayMs: index * 70,
					className: "rounded-[1.25rem] border border-[#101B35]/8 bg-white p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(point.icon, {
							className: "size-5 text-[#c79a1d]",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 text-sm font-bold text-[#101B35]",
							children: point.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-[#64748B]",
							children: point.body
						})
					]
				}, point.title))
			})] })]
		})
	});
}
function LandingPage() {
	const eventsQuery = useQuery({
		queryKey: ["events", "home"],
		queryFn: () => eventsApi.list({ sort: "trending" })
	});
	const universitiesQuery = useQuery({
		queryKey: ["universities"],
		queryFn: () => directoryApi.universities()
	});
	const orgsQuery = useQuery({
		queryKey: ["organizations"],
		queryFn: () => directoryApi.organizations()
	});
	const categoriesQuery = useQuery({
		queryKey: ["categories"],
		queryFn: () => eventsApi.categories()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "landing-page min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#101B35]",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHero, { events: eventsQuery.data ?? [] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingValueStrip, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingEvents, {
						query: eventsQuery,
						categoriesQuery
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingCommunities, {
						universitiesQuery,
						orgsQuery
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingOpportunities, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHowItWorks, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingWhy, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingCta, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingFooter, {})
		]
	});
}
var SplitComponent = LandingPage;
//#endregion
export { SplitComponent as component };
