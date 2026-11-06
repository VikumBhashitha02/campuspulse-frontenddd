import { i as __toESM } from "../_runtime.mjs";
import { n as apiSend } from "./client-DCT7i2UG.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Dw0VHwRC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Dt as Eye, Kt as CircleCheck, Ot as EyeOff, qt as CircleAlert } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-Bi14Oc-S.mjs";
import { t as AuthLayout } from "./login-DCa3ZOTV.mjs";
import { t as Route } from "./reset-password-CPIdwycX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-BL2X_8lH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPasswordPage() {
	const search = Route.useSearch();
	const token = search.token?.trim() || "";
	const email = search.email?.trim() || "";
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [showConfirmPassword, setShowConfirmPassword] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		if (!token) {
			setError("Reset token is missing from the link. Please request a new reset link.");
			return;
		}
		if (password.length < 8) {
			setError("Password must be at least 8 characters long.");
			return;
		}
		if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
			setError("Password must contain at least one letter and one number.");
			return;
		}
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}
		setBusy(true);
		try {
			await apiSend("POST", "/auth/reset-password", {
				token,
				password,
				...email ? { email } : {}
			});
			setSuccess(true);
			toast.success("Password reset successfully!");
		} catch (err) {
			const msg = err?.response?.data?.message || err?.message || "Invalid or expired reset token. Please request a new one.";
			setError(typeof msg === "string" ? msg : JSON.stringify(msg));
			toast.error("Failed to reset password");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLayout, {
		title: "Create new password",
		subtitle: email ? `Enter a new password for ${email}` : "Your new password must be different from previous passwords.",
		children: success ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-6 text-center shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex size-12 items-center justify-center rounded-full bg-success/15 text-success",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-7" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-base font-bold",
					children: "Password reset successful"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Your password has been updated securely. You can now sign in with your new credentials."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6 w-full",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: "Proceed to log in"
					})
				})
			]
		}) : !token ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-destructive/20 bg-destructive/10 p-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mx-auto size-8 text-destructive" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-sm font-bold text-destructive",
					children: "Invalid or missing reset token"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-sm text-muted-foreground",
					children: "The password reset link appears incomplete or corrupted. Please request a new reset email."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "mt-5 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/forgot-password",
						children: "Request new reset link"
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-5",
			onSubmit: handleSubmit,
			children: [
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 text-xs font-medium leading-relaxed",
						children: error
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "new-password",
							children: "New password"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "new-password",
								type: showPassword ? "text" : "password",
								autoComplete: "new-password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								required: true,
								placeholder: "At least 8 characters",
								className: "pr-10"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowPassword(!showPassword),
								className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none",
								"aria-label": showPassword ? "Hide password" : "Show password",
								children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Must contain at least 8 characters with letters and numbers."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "confirm-password",
						children: "Confirm new password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "confirm-password",
							type: showConfirmPassword ? "text" : "password",
							autoComplete: "new-password",
							value: confirmPassword,
							onChange: (e) => setConfirmPassword(e.target.value),
							required: true,
							placeholder: "Re-enter new password",
							className: "pr-10"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowConfirmPassword(!showConfirmPassword),
							className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none",
							"aria-label": showConfirmPassword ? "Hide password" : "Show password",
							children: showConfirmPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full",
					size: "lg",
					disabled: busy,
					children: busy ? "Resetting password…" : "Reset password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center text-sm text-muted-foreground",
					children: [
						"Remembered your password?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "font-semibold text-primary hover:underline",
							children: "Log in"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { ResetPasswordPage as component };
