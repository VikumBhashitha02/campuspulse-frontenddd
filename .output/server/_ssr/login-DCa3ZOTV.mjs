import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { g as Link, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as ThemeToggle, n as LogoMark } from "./ThemeToggle-ChKBHpb7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DCa3ZOTV.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./login-DuTKMgib.mjs");
var Route = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Log in — CampusPulse" },
		{
			name: "description",
			content: "Log in to CampusPulse to save opportunities, register and build teams."
		},
		{
			property: "og:title",
			content: "Log in — CampusPulse"
		},
		{
			property: "og:description",
			content: "Access your CampusPulse account."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
function AuthLayout({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden overflow-hidden bg-navy p-12 text-navy-foreground lg:flex lg:flex-col lg:justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "absolute inset-0 grid-noise opacity-30"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "relative flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-lg font-extrabold tracking-tight",
						children: ["CAMPUS", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "PULSE"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-3xl font-black leading-tight tracking-tight",
						children: ["Discover. Participate. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "Achieve."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-navy-foreground/70",
						children: "Every competition, hackathon, workshop and research opportunity across university communities — in one place."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "relative text-xs text-navy-foreground/50",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" CampusPulse"
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex items-center justify-center px-4 py-12 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute right-4 top-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "mb-8 flex items-center gap-3 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-9" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-base font-extrabold tracking-tight",
							children: ["CAMPUS", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-navy-muted",
								children: "PULSE"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-black tracking-tight",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-sm text-muted-foreground",
						children: subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children
					})
				]
			})]
		})]
	});
}
//#endregion
export { Route as n, AuthLayout as t };
