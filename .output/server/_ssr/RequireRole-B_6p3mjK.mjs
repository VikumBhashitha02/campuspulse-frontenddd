import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { t as Button } from "./button-Dw0VHwRC.mjs";
import { t as Skeleton } from "./skeleton-9We6w0Q8.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Q as Lock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RequireRole-B_6p3mjK.js
var import_jsx_runtime = require_jsx_runtime();
var roleLabel = {
	STUDENT: "student",
	ORGANIZER: "organiser",
	ADMIN: "administrator"
};
/**
* Client-side access gate. The backend enforces the same rules on every
* request; this only prevents rendering UI the user may not act on.
*/
function RequireRole({ roles, allowOrgManagers = false, children }) {
	const { user, loading } = useAuth();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-4 px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-64" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-96" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full rounded-xl" })
		]
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gate, {
		title: "Sign in to continue",
		description: "This area of CampusPulse is only available to signed-in members.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap justify-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					children: "Log in"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/register",
					children: "Create an account"
				})
			})]
		})
	});
	const hasOrgManagerRole = allowOrgManagers && Boolean(user.memberships && user.memberships.some((m) => [
		"ADMIN",
		"LEADER",
		"PRESIDENT",
		"VICE_PRESIDENT",
		"EVENT_ORGANIZER",
		"EVENT_MANAGER",
		"MANAGER"
	].includes(m.role) || m.canCreateEvents));
	if (roles.includes("ORGANIZER") && user.role === "ORGANIZER" && user.universityEmailVerified === false) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gate, {
		title: "University email verification required",
		description: "Your organiser workspace requires a verified institutional email address to manage university societies and events.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap justify-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/register",
					children: "Verify University Email"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/account",
					children: "Back to student feed"
				})
			})]
		})
	});
	if (!roles.includes(user.role) && !hasOrgManagerRole) {
		const isOrganizerGate = roles.includes("ORGANIZER");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gate, {
			title: isOrganizerGate ? "Organiser workspace access" : "You don't have access to this area",
			description: isOrganizerGate ? "To publish events and manage society opportunities, you must verify an official university email address." : `This section requires ${roles.map((r) => roleLabel[r]).join(" or ")} access. You're signed in as a ${roleLabel[user.role]}.`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap justify-center gap-2",
				children: [isOrganizerGate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						children: "Become an Organiser"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/account",
						children: "Back to my feed"
					})
				})]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function Gate({ title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-12 place-items-center rounded-full bg-surface text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
					className: "size-5",
					"aria-hidden": true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-xl font-bold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: action
			})
		]
	});
}
//#endregion
export { RequireRole as t };
