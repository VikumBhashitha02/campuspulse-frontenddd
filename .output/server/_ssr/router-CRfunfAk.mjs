import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as useAuth, t as AuthProvider } from "./auth-BjpYPorg.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { t as socialApi } from "./social-D4BN0hFM.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { K as Menu, S as Shield, Z as LogOut, an as Calendar, dt as House, fn as Bookmark, hn as Bell, ht as GraduationCap, i as User, it as LayoutDashboard, k as Search, p as Ticket, r as Users, zt as Compass } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$18 } from "./account.teams._id-CMSJ7iPB.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-D3fTZEWA.mjs";
import { t as Route$19 } from "./events._slug-CqaAPIwi.mjs";
import { a as SheetTrigger, i as SheetTitle, n as SheetContent, r as SheetHeader, t as Sheet } from "./sheet-KodPKk9Y.mjs";
import { t as Route$20 } from "./explore-CAeN_h04.mjs";
import { i as ThemeToggle, r as ThemeProvider, t as Logo } from "./ThemeToggle-ChKBHpb7.mjs";
import { n as Route$21 } from "./login-DCa3ZOTV.mjs";
import { t as Route$22 } from "./organizations._slug-1Pf8pINv.mjs";
import { t as Route$23 } from "./reset-password-CPIdwycX.mjs";
import { t as Route$24 } from "./universities._slug-CgknJmUr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CRfunfAk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DD9HwC0b.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var primaryNav = [
	{
		to: "/explore",
		label: "Explore",
		icon: Compass
	},
	{
		to: "/universities",
		label: "Universities",
		icon: GraduationCap
	},
	{
		to: "/account/teams",
		label: "Teams",
		icon: Users
	}
];
var mobileNav = [
	{
		to: "/",
		label: "Home",
		icon: House,
		exact: true
	},
	{
		to: "/explore",
		label: "Explore",
		icon: Compass
	},
	{
		to: "/account/teams",
		label: "Teams",
		icon: Users
	},
	{
		to: "/account/notifications",
		label: "Alerts",
		icon: Bell
	},
	{
		to: "/account/profile",
		label: "Profile",
		icon: User
	}
];
var accountNav = [
	{
		to: "/account",
		label: "My feed",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/account/calendar",
		label: "Calendar",
		icon: Calendar
	},
	{
		to: "/account/saved",
		label: "Saved",
		icon: Bookmark
	},
	{
		to: "/account/registrations",
		label: "Registrations",
		icon: Ticket
	},
	{
		to: "/account/notifications",
		label: "Notifications",
		icon: Bell
	},
	{
		to: "/account/profile",
		label: "Profile",
		icon: User
	}
];
function useSearchNavigate() {
	const [value, setValue] = (0, import_react.useState)("");
	return {
		value,
		setValue
	};
}
function AppShell({ children }) {
	const { user, logout } = useAuth();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { value, setValue } = useSearchNavigate();
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const { data: unreadCount = 0 } = useQuery({
		queryKey: [
			"notifications",
			"unread-count",
			user?.id
		],
		queryFn: () => socialApi.unreadNotificationsCount(),
		enabled: !!user,
		staleTime: 3e4
	});
	const canAccessOrganizer = Boolean(user && (user.role === "ORGANIZER" || user.role === "ADMIN" || user.memberships && user.memberships.some((m) => [
		"ADMIN",
		"LEADER",
		"EVENT_MANAGER",
		"MANAGER"
	].includes(m.role))));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open: menuOpen,
							onOpenChange: setMenuOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "min-h-11 min-w-11 lg:hidden",
									"aria-label": "Open menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
								side: "left",
								className: "w-[280px] p-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
									className: "border-b border-border p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
										className: "sr-only",
										children: "Navigation"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
									className: "space-y-1 p-3",
									children: [
										[...primaryNav, ...accountNav].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: item.to,
											onClick: () => setMenuOpen(false),
											activeOptions: { exact: "exact" in item ? "exact" in item && item.exact : false },
											className: "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
													className: "size-4",
													"aria-hidden": true
												}), item.label]
											}), item.to === "/account/notifications" && unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground",
												children: unreadCount
											})]
										}, item.to)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "!mt-4 border-t border-border pt-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/organizer",
												onClick: () => setMenuOpen(false),
												className: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-surface hover:text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, {
													className: "size-4",
													"aria-hidden": true
												}), "Organiser workspace"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/admin",
												onClick: () => setMenuOpen(false),
												className: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-surface hover:text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
													className: "size-4",
													"aria-hidden": true
												}), "Admin console"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "!mt-4 flex items-center justify-between border-t border-border px-3 pt-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-medium text-muted-foreground",
												children: "Theme"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
							className: "shrink-0",
							compact: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "ml-4 hidden items-center gap-1 lg:flex",
							"aria-label": "Main",
							children: primaryNav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground",
								children: item.label
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							role: "search",
							className: "ml-auto hidden max-w-sm flex-1 md:block",
							onSubmit: (e) => {
								e.preventDefault();
								window.location.href = `/explore?q=${encodeURIComponent(value)}`;
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "global-search",
								className: "sr-only",
								children: "Search opportunities"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "global-search",
									value,
									onChange: (e) => setValue(e.target.value),
									placeholder: "Search opportunities...",
									className: "pl-9"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex shrink-0 items-center gap-1.5 md:ml-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "ghost",
									size: "icon",
									className: "min-h-11 min-w-11",
									"aria-label": "Notifications",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/account/notifications",
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" }), user && unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-2.5 top-2.5 size-2 rounded-full bg-primary ring-2 ring-background" })]
									})
								}),
								user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "min-h-11 min-w-11",
										"aria-label": "Account menu",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid size-8 place-items-center rounded-full bg-navy text-xs font-bold text-navy-foreground",
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
											children: user.role.toLowerCase()
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
										canAccessOrganizer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/organizer",
												children: "Organiser workspace"
											})
										}),
										user.role === "ADMIN" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/admin",
												children: "Admin console"
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
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "ghost",
										size: "sm",
										className: "hidden sm:inline-flex",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/login",
											children: "Log in"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/register",
											children: "Join"
										})
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 pb-20 lg:pb-0",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Primary",
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mx-auto flex max-w-lg items-stretch",
					children: mobileNav.map((item) => {
						const active = "exact" in item && item.exact ? pathname === item.to : pathname.startsWith(item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								"aria-current": active ? "page" : void 0,
								className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors relative", active ? "text-foreground" : "text-muted-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
										className: cn("size-5", active && "text-primary"),
										"aria-hidden": true
									}), item.to === "/account/notifications" && user && unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-1 -right-1 size-2 rounded-full bg-primary" })]
								}), item.label]
							})
						}, item.to);
					})
				})
			})
		]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xs text-sm text-muted-foreground",
					children: "One platform for every university opportunity across Sri Lanka."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
					title: "Discover",
					links: [
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
							label: "Team finder"
						}
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
					title: "Account",
					links: [
						{
							to: "/account",
							label: "My feed"
						},
						{
							to: "/account/saved",
							label: "Saved"
						},
						{
							to: "/account/registrations",
							label: "Registrations"
						}
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
					title: "Workspaces",
					links: [
						{
							to: "/organizer",
							label: "Organisers"
						},
						{
							to: "/admin",
							label: "Administration"
						},
						{
							to: "/login",
							label: "Log in"
						}
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border py-5 text-center text-xs text-muted-foreground",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" CampusPulse. Built for university communities."
			]
		})]
	});
}
function FooterCol({ title, links }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "text-xs font-bold uppercase tracking-widest text-foreground",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 space-y-2.5",
		children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: l.to,
			className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
			children: l.label
		}) }, l.to))
	})] });
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$17 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "CampusPulse — One Platform. Every University Opportunity." },
			{
				name: "description",
				content: "Discover competitions, hackathons, workshops, research opportunities and conferences across university communities."
			},
			{
				name: "author",
				content: "CampusPulse"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
var themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('campuspulse_theme');
    var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches) || (stored === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  } catch (e) {}
})();
`;
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: themeScript } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
var BARE_ROUTES = [
	"/login",
	"/register",
	"/forgot-password"
];
function RootComponent() {
	const { queryClient } = Route$17.useRouteContext();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const bare = pathname === "/" || BARE_ROUTES.includes(pathname);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [bare ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-right" })] }) })
	});
}
var $$splitComponentImporter$16 = () => import("./routes-CGpClEyd.mjs");
var Route$16 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "CampusPulse — One Platform. Every University Opportunity." },
		{
			name: "description",
			content: "Discover events, university communities, and opportunities happening across campus life — all in one place."
		},
		{
			property: "og:title",
			content: "CampusPulse — One Platform. Every University Opportunity."
		},
		{
			property: "og:description",
			content: "Find events, student communities, and university opportunities on CampusPulse."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./account-F0VxEGVV.mjs");
var Route$15 = createFileRoute("/account")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./admin-D6erKP8D.mjs");
var Route$14 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "CampusPulse Control Center — Platform Administration" },
		{
			name: "description",
			content: "Global governance, user management, moderation, transactions, and system settings."
		},
		{
			property: "og:title",
			content: "Platform Administration — CampusPulse"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./forgot-password-BTEFCn4w.mjs");
var Route$13 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [
		{ title: "Reset your password — CampusPulse" },
		{
			name: "description",
			content: "Request a password reset link for your CampusPulse account."
		},
		{
			property: "og:title",
			content: "Reset your password — CampusPulse"
		},
		{
			property: "og:description",
			content: "Request a CampusPulse password reset link."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./organizer-nM3k-hfv.mjs");
var Route$12 = createFileRoute("/organizer")({
	head: () => ({ meta: [
		{ title: "Organiser workspace — CampusPulse" },
		{
			name: "description",
			content: "Publish opportunities and track performance for your society."
		},
		{
			property: "og:title",
			content: "Organiser workspace — CampusPulse"
		},
		{
			property: "og:description",
			content: "Manage listings, registrations and analytics."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./register-CBmPpsSX.mjs");
var Route$11 = createFileRoute("/register")({
	head: () => ({ meta: [
		{ title: "Create your account — CampusPulse" },
		{
			name: "description",
			content: "Join CampusPulse to discover university opportunities, register and build teams."
		},
		{
			property: "og:title",
			content: "Create your account — CampusPulse"
		},
		{
			property: "og:description",
			content: "Join CampusPulse — free for every university student and organiser."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./universities-Dik0Lyuv.mjs");
var Route$10 = createFileRoute("/universities")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./account.index-BaUQ-5JI.mjs");
var Route$9 = createFileRoute("/account/")({
	head: () => ({ meta: [
		{ title: "Personalized Feed — CampusPulse" },
		{
			name: "description",
			content: "Your personalized feed of university opportunities and campus activity."
		},
		{
			property: "og:title",
			content: "Personalized Feed — CampusPulse"
		},
		{
			property: "og:description",
			content: "Recommended opportunities, university updates and team activity."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./account.calendar-Buz2Oerk.mjs");
var Route$8 = createFileRoute("/account/calendar")({
	head: () => ({ meta: [
		{ title: "Opportunity & Registered Schedule Calendar — CampusPulse" },
		{
			name: "description",
			content: "See registered passes, saved opportunities and deadlines on a monthly calendar."
		},
		{
			property: "og:title",
			content: "Opportunity Calendar — CampusPulse"
		},
		{
			property: "og:description",
			content: "Your month at a glance on CampusPulse."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./account.notifications-CD-M-_dM.mjs");
var Route$7 = createFileRoute("/account/notifications")({
	head: () => ({ meta: [
		{ title: "Notifications — CampusPulse" },
		{
			name: "description",
			content: "Deadline reminders, team requests and registration updates."
		},
		{
			property: "og:title",
			content: "Notifications — CampusPulse"
		},
		{
			property: "og:description",
			content: "Your CampusPulse activity."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./account.payments-Pq8ItkLw.mjs");
var Route$6 = createFileRoute("/account/payments")({
	head: () => ({ meta: [
		{ title: "Payments & Transactions — CampusPulse" },
		{
			name: "description",
			content: "View your verified payment transactions, registration invoices, and authoritative digital receipts for CampusPulse events."
		},
		{
			property: "og:title",
			content: "Payments & Transactions — CampusPulse"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./account.profile-CS55EVF3.mjs");
var Route$5 = createFileRoute("/account/profile")({
	head: () => ({ meta: [
		{ title: "My Profile & Portfolio — CampusPulse" },
		{
			name: "description",
			content: "Manage your CampusPulse verified student identity, skills, experiences, and verified campus activity."
		},
		{
			property: "og:title",
			content: "My Profile & Portfolio — CampusPulse"
		},
		{
			property: "og:description",
			content: "Verified student profile and campus portfolio."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./account.registrations-B0f-OVKn.mjs");
var Route$4 = createFileRoute("/account/registrations")({
	head: () => ({ meta: [
		{ title: "My Registrations & Tickets — CampusPulse" },
		{
			name: "description",
			content: "Track your event registrations, digital admission passes, payments, and QR tickets."
		},
		{
			property: "og:title",
			content: "My Registrations & Tickets — CampusPulse"
		},
		{
			property: "og:description",
			content: "Your CampusPulse event admission passes and verified check-in tickets."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./account.saved-BijPfQqG.mjs");
var Route$3 = createFileRoute("/account/saved")({
	head: () => ({ meta: [
		{ title: "Saved opportunities — CampusPulse" },
		{
			name: "description",
			content: "Opportunities you've saved for later."
		},
		{
			property: "og:title",
			content: "Saved opportunities — CampusPulse"
		},
		{
			property: "og:description",
			content: "Your saved CampusPulse opportunities."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./account.volunteering-fPCcCrNv.mjs");
var Route$2 = createFileRoute("/account/volunteering")({
	head: () => ({ meta: [
		{ title: "My Volunteering & Matching — CampusPulse" },
		{
			name: "description",
			content: "Track volunteer applications, recommended crew opportunities, crew passes, and verified service certificates."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./universities.index-CvXoCym_.mjs");
var Route$1 = createFileRoute("/universities/")({
	head: () => ({ meta: [
		{ title: "Universities — CampusPulse" },
		{
			name: "description",
			content: "Browse universities on CampusPulse, their faculties, student societies and published opportunities."
		},
		{
			property: "og:title",
			content: "Universities — CampusPulse"
		},
		{
			property: "og:description",
			content: "Explore university communities and the societies publishing opportunities."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./account.teams.index-DrPEStGf.mjs");
var Route = createFileRoute("/account/teams/")({
	head: () => ({ meta: [
		{ title: "Squads & Team Hub — CampusPulse" },
		{
			name: "description",
			content: "Discover teams for hackathons, competitions and projects, create squads, review applicant profiles, and find teammates."
		},
		{
			property: "og:title",
			content: "Squads & Team Hub — CampusPulse"
		},
		{
			property: "og:description",
			content: "Discover teams, create squads, and find teammates."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$17
});
var AccountRoute = Route$15.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$17
});
var AdminRoute = Route$14.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$17
});
var ExploreRoute = Route$20.update({
	id: "/explore",
	path: "/explore",
	getParentRoute: () => Route$17
});
var ForgotPasswordRoute = Route$13.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$17
});
var LoginRoute = Route$21.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$17
});
var OrganizerRoute = Route$12.update({
	id: "/organizer",
	path: "/organizer",
	getParentRoute: () => Route$17
});
var RegisterRoute = Route$11.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$17
});
var ResetPasswordRoute = Route$23.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$17
});
var UniversitiesRoute = Route$10.update({
	id: "/universities",
	path: "/universities",
	getParentRoute: () => Route$17
});
var AccountIndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => AccountRoute
});
var AccountCalendarRoute = Route$8.update({
	id: "/calendar",
	path: "/calendar",
	getParentRoute: () => AccountRoute
});
var AccountNotificationsRoute = Route$7.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AccountRoute
});
var AccountPaymentsRoute = Route$6.update({
	id: "/payments",
	path: "/payments",
	getParentRoute: () => AccountRoute
});
var AccountProfileRoute = Route$5.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AccountRoute
});
var AccountRegistrationsRoute = Route$4.update({
	id: "/registrations",
	path: "/registrations",
	getParentRoute: () => AccountRoute
});
var AccountSavedRoute = Route$3.update({
	id: "/saved",
	path: "/saved",
	getParentRoute: () => AccountRoute
});
var AccountVolunteeringRoute = Route$2.update({
	id: "/volunteering",
	path: "/volunteering",
	getParentRoute: () => AccountRoute
});
var EventsSlugRoute = Route$19.update({
	id: "/events/$slug",
	path: "/events/$slug",
	getParentRoute: () => Route$17
});
var OrganizationsSlugRoute = Route$22.update({
	id: "/organizations/$slug",
	path: "/organizations/$slug",
	getParentRoute: () => Route$17
});
var UniversitiesIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => UniversitiesRoute
});
var UniversitiesSlugRoute = Route$24.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => UniversitiesRoute
});
var AccountTeamsIndexRoute = Route.update({
	id: "/teams/",
	path: "/teams/",
	getParentRoute: () => AccountRoute
});
var AccountRouteChildren = {
	AccountCalendarRoute,
	AccountNotificationsRoute,
	AccountPaymentsRoute,
	AccountProfileRoute,
	AccountRegistrationsRoute,
	AccountSavedRoute,
	AccountVolunteeringRoute,
	AccountIndexRoute,
	AccountTeamsIdRoute: Route$18.update({
		id: "/teams/$id",
		path: "/teams/$id",
		getParentRoute: () => AccountRoute
	}),
	AccountTeamsIndexRoute
};
var AccountRouteWithChildren = AccountRoute._addFileChildren(AccountRouteChildren);
var UniversitiesRouteChildren = {
	UniversitiesSlugRoute,
	UniversitiesIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AccountRoute: AccountRouteWithChildren,
	AdminRoute,
	ExploreRoute,
	ForgotPasswordRoute,
	LoginRoute,
	OrganizerRoute,
	RegisterRoute,
	ResetPasswordRoute,
	UniversitiesRoute: UniversitiesRoute._addFileChildren(UniversitiesRouteChildren),
	EventsSlugRoute,
	OrganizationsSlugRoute
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
