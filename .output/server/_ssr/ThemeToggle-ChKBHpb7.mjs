import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { U as Moon, g as Sun } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ThemeToggle-ChKBHpb7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LogoMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: cn("grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 24 24",
			className: "size-5",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M2 7 12 3l10 4-10 4z",
				fill: "currentColor",
				stroke: "none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M4 17h4l2-5 2.5 8 2-6 1.5 3h4",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})]
		})
	});
}
function Logo({ className, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: cn("flex items-center gap-2.5", className),
		"aria-label": "CampusPulse home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex flex-col leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-[15px] font-extrabold tracking-tight text-foreground",
				children: ["CAMPUS", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-navy-muted",
					children: "PULSE"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 text-[10px] font-medium tracking-wide text-muted-foreground",
				children: "Discover. Participate. Achieve."
			})]
		})]
	});
}
var ThemeContext = (0, import_react.createContext)(void 0);
var THEME_STORAGE_KEY = "campuspulse_theme";
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem(THEME_STORAGE_KEY);
			if (stored === "light" || stored === "dark" || stored === "system") return stored;
		}
		return "system";
	});
	const [resolvedTheme, setResolvedTheme] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		const applyTheme = () => {
			let active = "light";
			if (theme === "system") active = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
			else active = theme;
			setResolvedTheme(active);
			if (active === "dark") {
				root.classList.add("dark");
				root.style.colorScheme = "dark";
			} else {
				root.classList.remove("dark");
				root.style.colorScheme = "light";
			}
		};
		applyTheme();
		if (theme === "system") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const handleChange = () => applyTheme();
			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		}
	}, [theme]);
	const setTheme = (newTheme) => {
		setThemeState(newTheme);
		if (typeof window !== "undefined") localStorage.setItem(THEME_STORAGE_KEY, newTheme);
	};
	const toggleTheme = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: {
			theme,
			resolvedTheme,
			setTheme,
			toggleTheme
		},
		children
	});
}
function useTheme() {
	const context = (0, import_react.useContext)(ThemeContext);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
}
function ThemeToggle({ className }) {
	const { resolvedTheme, toggleTheme } = useTheme();
	const isDark = resolvedTheme === "dark";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "ghost",
		size: "icon",
		onClick: toggleTheme,
		className: cn("relative min-h-10 min-w-10 rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground transition-all duration-200 active:scale-95", className),
		"aria-label": isDark ? "Switch to light theme" : "Switch to dark theme",
		title: isDark ? "Switch to light theme" : "Switch to dark theme",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4.5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "absolute size-4.5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-amber-300" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Toggle dark mode"
			})
		]
	});
}
//#endregion
export { ThemeToggle as i, LogoMark as n, ThemeProvider as r, Logo as t };
