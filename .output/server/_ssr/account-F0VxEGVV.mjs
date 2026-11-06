import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { n as cn } from "./button-Dw0VHwRC.mjs";
import { t as socialApi } from "./social-D4BN0hFM.mjs";
import { f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { It as CreditCard, an as Calendar, fn as Bookmark, hn as Bell, i as User, it as LayoutDashboard, p as Ticket, pt as HeartHandshake, r as Users } from "../_libs/lucide-react.mjs";
import { t as RequireRole } from "./RequireRole-B_6p3mjK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-F0VxEGVV.js
var import_jsx_runtime = require_jsx_runtime();
var LINKS = [
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
		to: "/account/payments",
		label: "Payments",
		icon: CreditCard
	},
	{
		to: "/account/volunteering",
		label: "Volunteering",
		icon: HeartHandshake
	},
	{
		to: "/account/teams",
		label: "Teams",
		icon: Users
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
function AccountLayout() {
	const { user } = useAuth();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		roles: [
			"STUDENT",
			"ORGANIZER",
			"ADMIN"
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:grid lg:grid-cols-[212px_minmax(0,1fr)] lg:gap-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Account",
					className: "mb-6 lg:mb-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:sticky lg:top-24 lg:block lg:space-y-1 lg:overflow-visible lg:px-0 lg:pb-0",
						children: LINKS.map((l) => {
							const active = "exact" in l && l.exact ? pathname === l.to : pathname.startsWith(l.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: l.to,
									className: cn("flex items-center justify-between gap-2.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors lg:rounded-lg lg:font-medium", active ? "bg-navy text-navy-foreground" : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:bg-transparent"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(l.icon, {
											className: "size-4 shrink-0",
											"aria-hidden": true
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.label })]
									}), l.to === "/account/notifications" && unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("rounded-full px-1.5 py-0.5 text-[10px] font-bold", active ? "bg-white text-navy" : "bg-primary text-primary-foreground"),
										children: unreadCount
									})]
								})
							}, l.to);
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			})
		})
	});
}
//#endregion
export { AccountLayout as component };
