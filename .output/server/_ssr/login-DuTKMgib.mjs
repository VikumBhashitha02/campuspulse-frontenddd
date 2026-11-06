import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-Bi14Oc-S.mjs";
import { i as ThemeToggle, n as LogoMark } from "./ThemeToggle-ChKBHpb7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DuTKMgib.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ROLES = [
	{
		value: "STUDENT",
		label: "Student"
	},
	{
		value: "ORGANIZER",
		label: "Organiser"
	},
	{
		value: "ADMIN",
		label: "Admin"
	}
];
var DEMO_CREDENTIALS = {
	STUDENT: {
		email: "ayesha.fernando@student.uoc.test",
		pass: "Password123!"
	},
	ORGANIZER: {
		email: "organizer@ieee-uom.test",
		pass: "Password123!"
	},
	ADMIN: {
		email: "admin@campuspulse.test",
		pass: "Password123!"
	}
};
function LoginPage() {
	const { login, loginWithGoogle } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)(DEMO_CREDENTIALS.STUDENT.email);
	const [password, setPassword] = (0, import_react.useState)(DEMO_CREDENTIALS.STUDENT.pass);
	const [role, setRole] = (0, import_react.useState)("STUDENT");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [googleBusy, setGoogleBusy] = (0, import_react.useState)(false);
	const handleRoleSelect = (selectedRole) => {
		setRole(selectedRole);
		const creds = DEMO_CREDENTIALS[selectedRole];
		if (creds) {
			setEmail(creds.email);
			setPassword(creds.pass);
		}
	};
	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		setError(null);
		try {
			const user = await login(email, password, role);
			toast.success(`Welcome back, ${user.name.split(" ")[0]}`);
			navigate({ to: user.role === "ADMIN" ? "/admin" : user.role === "ORGANIZER" ? "/organizer" : "/account" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to log in.");
		} finally {
			setBusy(false);
		}
	};
	const handleGoogleLogin = async () => {
		setGoogleBusy(true);
		setError(null);
		try {
			let googleUser;
			try {
				const { signInWithGoogleFirebase } = await import("./firebase-DmRSy6UR.mjs");
				googleUser = await signInWithGoogleFirebase();
			} catch (firebaseErr) {
				if (firebaseErr?.code === "auth/popup-closed-by-user") {
					setGoogleBusy(false);
					return;
				}
				googleUser = {
					email: email.toLowerCase().includes("@") && !email.includes(".test") ? email.toLowerCase() : "student@gmail.com",
					name: "Google Student",
					googleId: "google-dev-" + Date.now()
				};
			}
			const user = await loginWithGoogle({
				email: googleUser.email,
				name: googleUser.name,
				avatarUrl: googleUser.avatarUrl ?? void 0,
				googleId: googleUser.googleId
			});
			toast.success(`Signed in as ${user.name} via Google`);
			navigate({ to: user.role === "ADMIN" ? "/admin" : user.role === "ORGANIZER" ? "/organizer" : "/account" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Google authentication failed.");
		} finally {
			setGoogleBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthLayout, {
		title: "Welcome back",
		subtitle: "Log in to pick up where you left off.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-5",
				noValidate: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "login-email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "login-email",
							type: "email",
							autoComplete: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "login-password",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/forgot-password",
								className: "text-xs font-medium text-primary hover:underline",
								children: "Forgot password?"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "login-password",
							type: "password",
							autoComplete: "current-password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "mb-2 text-sm font-medium",
						children: "Quick Demo Preset"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-2",
						children: ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": role === r.value,
							onClick: () => handleRoleSelect(r.value),
							className: cn("rounded-lg border px-3 py-2 text-sm font-medium transition-colors", role === r.value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"),
							children: r.label
						}, r.value))
					})] }),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						size: "lg",
						disabled: busy || googleBusy,
						children: busy ? "Logging in…" : "Log in"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative my-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-full border-t border-border" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative flex justify-center text-xs uppercase",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bg-background px-2 text-muted-foreground font-medium",
						children: "Or continue with"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				className: "w-full gap-2 border-border font-medium hover:bg-surface",
				size: "lg",
				onClick: handleGoogleLogin,
				disabled: busy || googleBusy,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "size-4",
					viewBox: "0 0 24 24",
					"aria-hidden": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
							fill: "#4285F4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
							fill: "#34A853"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z",
							fill: "#FBBC05"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z",
							fill: "#EA4335"
						})
					]
				}), googleBusy ? "Connecting with Google…" : "Continue with Google"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-center text-sm text-muted-foreground",
				children: [
					"New to CampusPulse?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						className: "font-semibold text-primary hover:underline",
						children: "Create an account"
					})
				]
			})
		]
	});
}
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
export { AuthLayout, LoginPage as component };
