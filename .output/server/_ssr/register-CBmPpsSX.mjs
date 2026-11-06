import { i as __toESM } from "../_runtime.mjs";
import { t as apiGet } from "./client-DCT7i2UG.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Cn as ArrowLeft, Kt as CircleCheck, ot as KeyRound, un as Building2 } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-Bi14Oc-S.mjs";
import { t as AuthLayout } from "./login-DCa3ZOTV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-CBmPpsSX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ROLES = [{
	value: "STUDENT",
	label: "Student",
	hint: "Personal or university email"
}, {
	value: "ORGANIZER",
	label: "Organiser",
	hint: "Verified university email required"
}];
function RegisterPage() {
	const { register, loginWithGoogle, requestOrganizerVerification, verifyOrganizerEmail, resendOrganizerVerification, checkDomain } = useAuth();
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)("FORM");
	const [role, setRole] = (0, import_react.useState)("STUDENT");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [otpCode, setOtpCode] = (0, import_react.useState)("");
	const [domainInfo, setDomainInfo] = (0, import_react.useState)(null);
	const [checkingDomain, setCheckingDomain] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [googleBusy, setGoogleBusy] = (0, import_react.useState)(false);
	const [cooldown, setCooldown] = (0, import_react.useState)(0);
	const [resending, setResending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const trimmed = email.trim().toLowerCase();
		if (!trimmed.includes("@") || trimmed.length < 5) {
			setDomainInfo(null);
			return;
		}
		const timer = setTimeout(async () => {
			setCheckingDomain(true);
			try {
				const res = await checkDomain(trimmed);
				setDomainInfo(res);
			} catch {
				setDomainInfo(null);
			} finally {
				setCheckingDomain(false);
			}
		}, 400);
		return () => clearTimeout(timer);
	}, [email, checkDomain]);
	(0, import_react.useEffect)(() => {
		if (cooldown <= 0) return;
		const timer = setInterval(() => {
			setCooldown((c) => c > 0 ? c - 1 : 0);
		}, 1e3);
		return () => clearInterval(timer);
	}, [cooldown]);
	const validateForm = () => {
		const next = {};
		if (name.trim().length < 2) next["name"] = "Enter your full name.";
		if (!email.includes("@") || !email.includes(".")) next["email"] = "Enter a valid email address.";
		if (role === "ORGANIZER") {
			if (domainInfo && !domainInfo.valid && domainInfo.reason === "PUBLIC_EMAIL") next["email"] = "Organizer accounts require a verified university or institutional email address.";
			else if (domainInfo && !domainInfo.valid && domainInfo.reason === "UNSUPPORTED_DOMAIN") next["email"] = "We couldn't verify this university email domain. Please use a supported institutional address.";
		}
		if (password.length < 8) next["password"] = "Password must be at least 8 characters long.";
		else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(password)) next["password"] = "Password must contain at least one letter and one number.";
		setErrors(next);
		return Object.keys(next).length === 0;
	};
	const handleStudentSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		setBusy(true);
		try {
			await register({
				name,
				email,
				password,
				role: "STUDENT",
				universityId: domainInfo?.university?.id
			});
			toast.success("Account created successfully!");
			navigate({ to: "/account" });
		} catch (err) {
			setErrors({ form: err instanceof Error ? err.message : "Unable to create your account." });
		} finally {
			setBusy(false);
		}
	};
	const handleOrganizerSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		setBusy(true);
		try {
			const res = await requestOrganizerVerification({
				name,
				email,
				password,
				universityId: domainInfo?.university?.id
			});
			toast.success(res.message || "Verification code dispatched to your university email.");
			setStep("OTP");
			setCooldown(60);
		} catch (err) {
			setErrors({ form: err instanceof Error ? err.message : "Unable to request organizer verification." });
		} finally {
			setBusy(false);
		}
	};
	const handleVerifyOtp = async (e) => {
		e.preventDefault();
		const cleanCode = otpCode.trim();
		if (cleanCode.length !== 6 || !/^\d{6}$/.test(cleanCode)) {
			setErrors({ otp: "Please enter the complete 6-digit verification code." });
			return;
		}
		setBusy(true);
		setErrors({});
		try {
			await verifyOrganizerEmail({
				email,
				code: cleanCode,
				name,
				password,
				universityId: domainInfo?.university?.id
			});
			setStep("SUCCESS");
			toast.success("University email verified! Welcome to the Organiser Workspace.");
		} catch (err) {
			setErrors({ otp: err instanceof Error ? err.message : "Invalid or expired verification code." });
		} finally {
			setBusy(false);
		}
	};
	const handleResendOtp = async () => {
		if (cooldown > 0 || resending) return;
		setResending(true);
		try {
			const res = await resendOrganizerVerification(email);
			toast.success(res.message || "A fresh 6-digit verification code was sent.");
			setCooldown(res.cooldownSeconds || 60);
			setErrors({});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not resend verification code.");
		} finally {
			setResending(false);
		}
	};
	const handleDevFillOtp = async () => {
		try {
			const res = await apiGet(`/auth/dev/latest-otp?email=${encodeURIComponent(email)}`);
			if (res?.otp) {
				setOtpCode(res.otp);
				toast.info(`Dev auto-filled OTP: ${res.otp}`);
			}
		} catch {}
	};
	const handleGoogleSignup = async () => {
		setGoogleBusy(true);
		setErrors({});
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
					name: name.trim() || "Google Student",
					googleId: "google-dev-" + Date.now()
				};
			}
			const user = await loginWithGoogle({
				email: googleUser.email,
				name: googleUser.name,
				avatarUrl: googleUser.avatarUrl ?? void 0,
				googleId: googleUser.googleId
			});
			toast.success(`Account connected via Google as ${user.name}`);
			navigate({ to: "/account" });
		} catch (err) {
			setErrors({ form: err instanceof Error ? err.message : "Google authentication failed." });
		} finally {
			setGoogleBusy(false);
		}
	};
	if (step === "OTP") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLayout, {
		title: "Verify your university email",
		subtitle: "We sent a 6-digit security code to confirm your institutional affiliation.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 font-medium text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Institutional Verification Code" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1.5 text-xs text-muted-foreground",
						children: [
							"Sent to ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: email
							}),
							domainInfo?.university && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								" (",
								domainInfo.university.name,
								")"
							] })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleVerifyOtp,
					className: "space-y-5",
					noValidate: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "otp-input",
								className: "text-sm font-medium",
								children: "6-Digit Verification Code"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "otp-input",
								type: "text",
								inputMode: "numeric",
								pattern: "[0-9]*",
								maxLength: 6,
								value: otpCode,
								onChange: (e) => {
									const val = e.target.value.replace(/\D/g, "").slice(0, 6);
									setOtpCode(val);
								},
								placeholder: "123456",
								className: "h-13 text-center font-mono text-2xl tracking-[0.4em]",
								autoFocus: true,
								required: true
							}),
							errors["otp"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "alert",
								className: "text-xs font-medium text-destructive",
								children: errors["otp"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						size: "lg",
						disabled: busy || otpCode.trim().length !== 6,
						children: busy ? "Verifying code…" : "Verify Email & Activate Organiser Account"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-3 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Didn't receive the email?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleResendOtp,
							disabled: cooldown > 0 || resending,
							className: cn("font-semibold text-primary transition-colors hover:underline disabled:text-muted-foreground", cooldown > 0 && "cursor-not-allowed"),
							children: cooldown > 0 ? `Resend code in ${cooldown}s` : resending ? "Sending…" : "Resend code"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between w-full pt-2 border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setStep("FORM"),
							className: "flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), "Change email address"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleDevFillOtp,
							className: "text-xs text-primary/70 hover:text-primary underline",
							children: "Dev helper: Auto-fill OTP"
						})]
					})]
				})
			]
		})
	});
	if (step === "SUCCESS") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLayout, {
		title: "University affiliation verified",
		subtitle: "Your organiser privileges are active.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6 text-center py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-8" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold",
						children: "Welcome to CampusPulse Organiser!"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Your institutional address ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: email
							}),
							" has been successfully verified. You can now publish events, recruit volunteers, and manage society opportunities."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					className: "w-full font-semibold",
					onClick: () => navigate({ to: "/organizer" }),
					children: "Continue to Organiser Dashboard"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthLayout, {
		title: "Create your account",
		subtitle: role === "ORGANIZER" ? "Institutional verification required for organisers." : "Free for every student & learner.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: role === "ORGANIZER" ? handleOrganizerSubmit : handleStudentSubmit,
				className: "space-y-4",
				noValidate: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "mb-2 text-sm font-medium",
						children: "I'm joining as"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-pressed": role === r.value,
							onClick: () => {
								setRole(r.value);
								setErrors({});
							},
							className: cn("rounded-lg border p-3 text-left transition-colors", role === r.value ? "border-primary bg-primary/10 shadow-xs" : "border-border bg-card hover:border-primary/40"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-semibold",
								children: r.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 block text-xs text-muted-foreground",
								children: r.hint
							})]
						}, r.value))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "reg-name",
						label: "Full name",
						error: errors["name"],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "reg-name",
							value: name,
							autoComplete: "name",
							placeholder: "e.g. Kasun Perera",
							onChange: (e) => setName(e.target.value),
							"aria-invalid": Boolean(errors["name"])
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						id: "reg-email",
						label: role === "ORGANIZER" ? "University or institutional email" : "Email address (personal or university)",
						error: errors["email"],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "reg-email",
								type: "email",
								autoComplete: "email",
								placeholder: role === "ORGANIZER" ? "name@sci.sjp.ac.lk or it22186256@my.sliit.lk" : "student@gmail.com or name@stu.cmb.ac.lk",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								"aria-invalid": Boolean(errors["email"])
							}),
							domainInfo?.valid && domainInfo.university && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Recognized: ",
									domainInfo.university.name,
									" (",
									domainInfo.domain,
									")"
								] })]
							}),
							role === "ORGANIZER" && domainInfo && !domainInfo.valid && domainInfo.reason === "PUBLIC_EMAIL" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-md bg-amber-500/10 px-2.5 py-1.5 text-xs text-amber-700 dark:text-amber-400",
								children: "Organisers must register with an official university/institutional email. Personal emails (Gmail, etc.) are only allowed for Student accounts."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "reg-password",
						label: "Password",
						error: errors["password"],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "reg-password",
							type: "password",
							autoComplete: "new-password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							"aria-invalid": Boolean(errors["password"])
						})
					}),
					errors["form"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive",
						children: errors["form"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						size: "lg",
						disabled: busy || googleBusy,
						children: busy ? role === "ORGANIZER" ? "Sending verification code…" : "Creating account…" : role === "ORGANIZER" ? "Continue with Institutional Verification" : "Create Student Account"
					})
				]
			}),
			role === "STUDENT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				className: "w-full gap-2 border-border font-medium hover:bg-surface",
				size: "lg",
				onClick: handleGoogleSignup,
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
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-center text-sm text-muted-foreground",
				children: [
					"Already have an account?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "font-semibold text-primary hover:underline",
						children: "Log in"
					})
				]
			})
		]
	});
}
function Field({ id, label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: id,
				children: label
			}),
			children,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-xs font-medium text-destructive",
				children: error
			})
		]
	});
}
//#endregion
export { RegisterPage as component };
