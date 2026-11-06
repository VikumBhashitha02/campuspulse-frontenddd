import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Dw0VHwRC.mjs";
import { C as ShieldCheck, _t as Github, an as Calendar, dn as Briefcase, gt as Globe, ht as GraduationCap, kt as ExternalLink, tt as Linkedin, un as Building2, y as Sparkles, yn as Award } from "../_libs/lucide-react.mjs";
import { o as OrgAvatar } from "./Badges-Bz6vmcNI.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CeXuDfGc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/UserProfileModal-BkSs9UQl.js
var import_jsx_runtime = require_jsx_runtime();
function getInitials(name) {
	return name.split(" ").slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}
function UserProfileModal({ profile, open, onOpenChange, onAccept, onReject, isResponding = false }) {
	if (!profile) return null;
	const hasLinks = Boolean(profile.githubUrl || profile.linkedinUrl || profile.websiteUrl);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] max-w-2xl overflow-y-auto sm:rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					className: "border-b border-border pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [profile.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: profile.avatarUrl,
							alt: profile.name,
							className: "size-16 rounded-full border border-border object-cover shadow-sm"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
							initials: getInitials(profile.name),
							className: "size-16 text-lg"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
									className: "text-xl font-bold",
									children: profile.name
								}), profile.universityEmailVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), "Verified Student"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
								className: "mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground",
								children: [
									profile.universityName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-3.5" }), profile.universityName]
									}),
									profile.faculty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5" }), profile.faculty]
									}),
									profile.academicYear && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5" }), profile.academicYear]
									})
								]
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 pt-2",
					children: [
						(profile.preferredRole || profile.applicationMessage) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-primary/20 bg-primary/5 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold uppercase tracking-wider text-primary",
									children: "Application Statement"
								}),
								profile.preferredRole && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm font-semibold text-foreground",
									children: [
										"Interested Role:",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary",
											children: profile.preferredRole
										})
									]
								}),
								profile.applicationMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm italic text-foreground/90",
									children: [
										"\"",
										profile.applicationMessage,
										"\""
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
							children: "About"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm leading-relaxed text-foreground",
							children: profile.bio || "No student biography provided yet."
						})] }),
						profile.skills && profile.skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-primary" }), "Technical & Creative Skills"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: profile.skills.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-lg bg-surface px-2.5 py-1 text-xs font-medium text-foreground border border-border/60",
								children: skill
							}, skill))
						})] }),
						profile.interests && profile.interests.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
							children: "Interests & Focus Areas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: profile.interests.map((interest) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-md bg-accent/60 px-2 py-0.5 text-xs text-accent-foreground",
								children: interest
							}, interest))
						})] }),
						profile.experiences && profile.experiences.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-3.5 text-muted-foreground" }), "Experience & Projects"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2.5 space-y-2.5",
							children: profile.experiences.map((exp, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/80 bg-surface/50 p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-foreground",
										children: exp.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: exp.organizationName
									}),
									exp.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-foreground/80",
										children: exp.description
									})
								]
							}, exp.id || idx))
						})] }),
						profile.certificates && profile.certificates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-3.5 text-amber-500" }), "Verified Certificates"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 space-y-2",
							children: profile.certificates.map((cert, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between rounded-lg border border-border/80 bg-surface/50 p-2.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-foreground",
									children: cert.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: cert.issuer || cert.issuerName || "CampusPulse Verified"
								})] })
							}, cert.id || idx))
						})] }),
						hasLinks && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
							children: "Profiles & Portfolio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: [
								profile.githubUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: profile.githubUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-3.5" }),
										"GitHub",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 opacity-60" })
									]
								}),
								profile.linkedinUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: profile.linkedinUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "size-3.5 text-blue-500" }),
										"LinkedIn",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 opacity-60" })
									]
								}),
								profile.websiteUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: profile.websiteUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3.5 text-emerald-500" }),
										"Portfolio / Website",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 opacity-60" })
									]
								})
							]
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => onOpenChange(false),
						children: "Close Profile"
					}), (onAccept || onReject) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [onReject && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							className: "text-destructive hover:bg-destructive/10",
							onClick: onReject,
							disabled: isResponding,
							children: "Decline Request"
						}), onAccept && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: onAccept,
							disabled: isResponding,
							className: "bg-primary font-semibold text-primary-foreground",
							children: isResponding ? "Processing…" : "Accept into Squad"
						})]
					})]
				})
			]
		})
	});
}
//#endregion
export { UserProfileModal as t };
