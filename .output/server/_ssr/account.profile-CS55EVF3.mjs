import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { t as socialApi } from "./social-D4BN0hFM.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ShieldCheck, Et as FileCheckCorner, Kt as CircleCheck, L as Plus, Y as Mail, _n as BadgeCheck, an as Calendar, dn as Briefcase, f as Trash2, ht as GraduationCap, kt as ExternalLink, ln as Building, r as Users, u as Trophy, y as Sparkles, yn as Award } from "../_libs/lucide-react.mjs";
import { a as PageHeader, o as RowSkeleton, r as ErrorState } from "./States-DTPgRZKE.mjs";
import { o as OrgAvatar } from "./Badges-Bz6vmcNI.mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PanelCard } from "./Section-DQvNGA2Q.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-Vjzjil1D.mjs";
import { t as directoryApi } from "./directory-BaY2c_G3.mjs";
import { t as Label } from "./label-Bi14Oc-S.mjs";
import { t as Textarea } from "./textarea-7zknwcEV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.profile-CS55EVF3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function ProfilePage() {
	const query = useQuery({
		queryKey: ["profile"],
		queryFn: () => socialApi.profile()
	});
	const organizations = useQuery({
		queryKey: ["myOrganizations"],
		queryFn: () => directoryApi.myOrganizations()
	}).data ?? [];
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [bio, setBio] = (0, import_react.useState)("");
	const [academicYear, setAcademicYear] = (0, import_react.useState)("");
	const [intakeSemester, setIntakeSemester] = (0, import_react.useState)("");
	const [studentIdNumber, setStudentIdNumber] = (0, import_react.useState)("");
	const [githubUrl, setGithubUrl] = (0, import_react.useState)("");
	const [linkedinUrl, setLinkedinUrl] = (0, import_react.useState)("");
	const [websiteUrl, setWebsiteUrl] = (0, import_react.useState)("");
	const [skillsList, setSkillsList] = (0, import_react.useState)([]);
	const [newSkill, setNewSkill] = (0, import_react.useState)("");
	const [interestsList, setInterestsList] = (0, import_react.useState)([]);
	const [newInterest, setNewInterest] = (0, import_react.useState)("");
	const [careerInterestsList, setCareerInterestsList] = (0, import_react.useState)([]);
	const [newCareerInterest, setNewCareerInterest] = (0, import_react.useState)("");
	const [experiences, setExperiences] = (0, import_react.useState)([]);
	const [showAddExp, setShowAddExp] = (0, import_react.useState)(false);
	const [expTitle, setExpTitle] = (0, import_react.useState)("");
	const [expOrg, setExpOrg] = (0, import_react.useState)("");
	const [expLocation, setExpLocation] = (0, import_react.useState)("");
	const [expStart, setExpStart] = (0, import_react.useState)("");
	const [expEnd, setExpEnd] = (0, import_react.useState)("");
	const [expCurrent, setExpCurrent] = (0, import_react.useState)(false);
	const [expDesc, setExpDesc] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!query.data) return;
		const p = query.data;
		setAvatarUrl(p.avatarUrl || "");
		setName(p.name || "");
		setBio(p.bio || "");
		setAcademicYear(p.academicYear || "3rd Year");
		setIntakeSemester(p.intakeSemester || "2023 Intake");
		setStudentIdNumber(p.studentIdNumber || "");
		setGithubUrl(p.githubUrl || "");
		setLinkedinUrl(p.linkedinUrl || "");
		setWebsiteUrl(p.websiteUrl || "");
		setSkillsList(p.skills || []);
		setInterestsList(p.interests || []);
		setCareerInterestsList(p.careerInterests || []);
		setExperiences(p.experiences || []);
	}, [query.data]);
	if (query.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, { count: 4 });
	if (query.isError || !query.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => query.refetch() });
	const profile = query.data;
	const verifiedActivity = profile.verifiedCampusActivity;
	const isUniVerified = profile.universityIdentity?.isVerified ?? false;
	const completeness = Math.min(100, Math.round(((bio.trim() ? 1 : 0) + (skillsList.length > 0 ? 1 : 0) + (interestsList.length > 0 || careerInterestsList.length > 0 ? 1 : 0) + (experiences.length > 0 ? 1 : 0) + (githubUrl || linkedinUrl || websiteUrl ? 1 : 0)) * 20));
	const addSkill = () => {
		const trimmed = newSkill.trim();
		if (trimmed && !skillsList.includes(trimmed)) {
			setSkillsList([...skillsList, trimmed]);
			setNewSkill("");
			setSaved(false);
		}
	};
	const removeSkill = (skill) => {
		setSkillsList(skillsList.filter((s) => s !== skill));
		setSaved(false);
	};
	const addInterest = () => {
		const trimmed = newInterest.trim();
		if (trimmed && !interestsList.includes(trimmed)) {
			setInterestsList([...interestsList, trimmed]);
			setNewInterest("");
			setSaved(false);
		}
	};
	const removeInterest = (interest) => {
		setInterestsList(interestsList.filter((i) => i !== interest));
		setSaved(false);
	};
	const addCareerInterest = () => {
		const trimmed = newCareerInterest.trim();
		if (trimmed && !careerInterestsList.includes(trimmed)) {
			setCareerInterestsList([...careerInterestsList, trimmed]);
			setNewCareerInterest("");
			setSaved(false);
		}
	};
	const removeCareerInterest = (career) => {
		setCareerInterestsList(careerInterestsList.filter((c) => c !== career));
		setSaved(false);
	};
	const handleAddExperience = (e) => {
		e.preventDefault();
		if (!expTitle.trim() || !expOrg.trim() || !expStart) {
			toast.error("Please fill in role title, organization name, and start date.");
			return;
		}
		const newExp = {
			title: expTitle.trim(),
			organizationName: expOrg.trim(),
			startDate: expStart,
			endDate: expCurrent ? null : expEnd || null,
			isCurrent: expCurrent,
			...expLocation.trim() ? { location: expLocation.trim() } : {},
			...expDesc.trim() ? { description: expDesc.trim() } : {}
		};
		setExperiences([newExp, ...experiences]);
		setExpTitle("");
		setExpOrg("");
		setExpLocation("");
		setExpStart("");
		setExpEnd("");
		setExpCurrent(false);
		setExpDesc("");
		setShowAddExp(false);
		setSaved(false);
		toast.success("Experience added to your draft profile.");
	};
	const removeExperience = (index) => {
		setExperiences(experiences.filter((_, i) => i !== index));
		setSaved(false);
	};
	const save = async (e) => {
		e.preventDefault();
		setBusy(true);
		try {
			await socialApi.updateProfile({
				name: name.trim() || void 0,
				avatarUrl: avatarUrl.trim() || void 0,
				bio: bio.trim(),
				academicYear: academicYear.trim(),
				intakeSemester: intakeSemester.trim(),
				studentIdNumber: studentIdNumber.trim(),
				githubUrl: githubUrl.trim(),
				linkedinUrl: linkedinUrl.trim(),
				websiteUrl: websiteUrl.trim(),
				skills: skillsList,
				interests: interestsList,
				careerInterests: careerInterestsList,
				experiences
			});
			setSaved(true);
			await query.refetch();
			toast.success("Profile saved successfully", { description: "Your public portfolio and recommendations have been updated." });
		} catch (err) {
			console.error("Failed to save profile:", err);
			const msg = err?.response?.data?.message || err?.message || "Couldn't save your profile. Please try again.";
			const errorText = Array.isArray(msg) ? msg.join(", ") : String(msg);
			toast.error(errorText || "Couldn't save your profile. Please try again.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					title: "Student Profile & Portfolio",
					description: "Manage your verified university identity, public skills, experiences, and authenticated campus track record."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 rounded-2xl border border-border bg-navy p-6 text-navy-foreground shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [profile.avatarUrl || avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: avatarUrl || profile.avatarUrl,
								alt: profile.name,
								className: "size-16 shrink-0 rounded-full border-2 border-gold/40 object-cover shadow-inner"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
								initials: profile.avatarInitials || "CP",
								className: "size-16 shrink-0 text-lg border-2 border-gold/40 shadow-inner"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-xl font-bold tracking-tight text-white",
											children: name || profile.name
										}), isUniVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-semibold text-gold border border-gold/40 shadow-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
												className: "size-3.5",
												"aria-hidden": true
											}), "Verified University Student"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/70",
											children: "Unverified University Identity"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 inline-flex items-center gap-1.5 truncate text-sm text-navy-foreground/80",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
												className: "size-3.5 shrink-0",
												"aria-hidden": true
											}),
											profile.email,
											profile.universityIdentity?.emailDomain && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-navy-foreground/60 font-mono",
												children: [
													"(@",
													profile.universityIdentity.emailDomain,
													")"
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 inline-flex items-center gap-1.5 truncate text-xs text-navy-foreground/75",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {
												className: "size-3.5 shrink-0",
												"aria-hidden": true
											}),
											profile.universityName,
											" · ",
											profile.faculty,
											" · ",
											profile.department
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex flex-wrap items-center gap-2 text-[11px] text-navy-foreground/70",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-white/10 px-2 py-0.5 font-medium",
												children: profile.academicYear || "3rd Year"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-white/10 px-2 py-0.5 font-medium",
												children: profile.intakeSemester || `Batch ${profile.batch}`
											}),
											profile.studentIdNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded bg-white/10 px-2 py-0.5 font-mono",
												children: ["ID: ", profile.studentIdNumber]
											})
										]
									})
								]
							})]
						}), verifiedActivity && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 flex-wrap gap-2 border-t border-white/10 pt-3 sm:flex-col sm:border-t-0 sm:border-l sm:pl-5 sm:pt-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-xs text-navy-foreground/90",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
											className: "size-3.5 text-gold",
											"aria-hidden": true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold",
											children: verifiedActivity.summary.eventsCount
										}),
										" Events Participated"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-xs text-navy-foreground/90",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, {
											className: "size-3.5 text-gold",
											"aria-hidden": true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold",
											children: verifiedActivity.summary.competitionsCount
										}),
										" Competitions"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-xs text-navy-foreground/90",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {
											className: "size-3.5 text-gold",
											"aria-hidden": true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold",
											children: verifiedActivity.summary.certificatesCount + verifiedActivity.summary.achievementsCount
										}),
										" Credentials"
									]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						defaultValue: "overview",
						className: "w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "grid w-full grid-cols-2 rounded-xl bg-muted/60 p-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "overview",
									className: "rounded-lg py-2.5 text-sm font-semibold",
									children: "✍️ Identity & Professional Info"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "verified-history",
									className: "rounded-lg py-2.5 text-sm font-semibold",
									children: ["🛡️ Verified Campus Activity", verifiedActivity && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "ml-2 px-1.5 py-0 text-[10px] font-bold",
										children: verifiedActivity.summary.eventsCount + verifiedActivity.summary.volunteeringCount + verifiedActivity.summary.certificatesCount
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "overview",
								className: "mt-6 space-y-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: save,
									className: "space-y-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between border-b border-border/60 pb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-base font-bold text-foreground",
													children: "Personal Identity & Photo"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground",
													children: "Publicly visible on your profile"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "profile-name",
														children: "Full Name"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "profile-name",
														placeholder: "Your full name",
														value: name,
														onChange: (e) => {
															setName(e.target.value);
															setSaved(false);
														}
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "profile-avatar",
														children: "Profile Picture URL"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "profile-avatar",
														placeholder: "https://images.unsplash.com/... or image link",
														value: avatarUrl,
														onChange: (e) => {
															setAvatarUrl(e.target.value);
															setSaved(false);
														}
													})]
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between border-b border-border/60 pb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-base font-bold text-foreground",
													children: "Academic Status"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground",
													children: "Self-reported status"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "academic-year",
															children: "Academic Year"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "academic-year",
															placeholder: "e.g. 3rd Year, Final Year",
															value: academicYear,
															onChange: (e) => {
																setAcademicYear(e.target.value);
																setSaved(false);
															}
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "intake-semester",
															children: "Intake / Batch"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "intake-semester",
															placeholder: "e.g. 2023 Intake, Semester 1",
															value: intakeSemester,
															onChange: (e) => {
																setIntakeSemester(e.target.value);
																setSaved(false);
															}
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "student-id-number",
															children: "Student ID Number"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "student-id-number",
															placeholder: "e.g. S20230041",
															value: studentIdNumber,
															onChange: (e) => {
																setStudentIdNumber(e.target.value);
																setSaved(false);
															}
														})]
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between border-b border-border/60 pb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-base font-bold text-foreground",
													children: "University Organizations & Roles"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Societies, clubs, and branches where you are an active member or executive officer."
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													asChild: true,
													size: "sm",
													variant: "outline",
													className: "text-xs font-semibold",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/organizer",
														children: "+ Manage Societies"
													})
												})]
											}), organizations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "py-4 text-center text-xs text-muted-foreground",
												children: [
													"You haven't joined any university organizations yet. Go to the",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/organizer",
														className: "text-primary hover:underline font-semibold",
														children: "Workspace"
													}),
													" ",
													"to join your campus societies."
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
												children: organizations.map((org) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3 rounded-xl border border-border/70 bg-surface/60 p-3.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, { initials: org.organizationName?.slice(0, 2) || "SO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "min-w-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
															to: "/organizations/$slug",
															params: { slug: org.organizationSlug || org.organizationId },
															className: "block truncate text-sm font-bold text-foreground hover:underline",
															children: org.organizationName
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "mt-1 flex items-center gap-1.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "rounded bg-primary/10 px-1.5 py-0.2 text-[10px] font-bold text-primary",
																children: org.role.replace(/_/g, " ")
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "rounded bg-emerald-500/10 px-1.5 py-0.2 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400",
																children: org.status || "ACTIVE"
															})]
														})]
													})]
												}, org.id || org.organizationId))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "profile-bio",
													className: "text-sm font-bold",
													children: "About & Bio"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-muted-foreground",
													children: [bio.length, "/1000 characters"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												id: "profile-bio",
												rows: 4,
												placeholder: "Share your academic background, technical focus, and what kind of projects or hackathons you want to collaborate on...",
												value: bio,
												onChange: (e) => {
													setBio(e.target.value);
													setSaved(false);
												}
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-sm font-bold text-foreground",
												children: "Professional & Social Links"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "profile-github",
															className: "text-xs",
															children: "GitHub Profile"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "profile-github",
															placeholder: "https://github.com/yourhandle",
															value: githubUrl,
															onChange: (e) => {
																setGithubUrl(e.target.value);
																setSaved(false);
															}
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "profile-linkedin",
															className: "text-xs",
															children: "LinkedIn Profile"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "profile-linkedin",
															placeholder: "https://linkedin.com/in/yourhandle",
															value: linkedinUrl,
															onChange: (e) => {
																setLinkedinUrl(e.target.value);
																setSaved(false);
															}
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "profile-website",
															className: "text-xs",
															children: "Portfolio / Website"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "profile-website",
															placeholder: "https://yourportfolio.dev",
															value: websiteUrl,
															onChange: (e) => {
																setWebsiteUrl(e.target.value);
																setSaved(false);
															}
														})]
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center justify-between",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-sm font-bold text-foreground",
														children: "Skills"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground",
														children: "Used for matchmaking in team finder and opportunity recommendations."
													})] })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														placeholder: "Add a skill (e.g. Next.js, Python, UI Design)...",
														value: newSkill,
														onChange: (e) => setNewSkill(e.target.value),
														onKeyDown: (e) => {
															if (e.key === "Enter") {
																e.preventDefault();
																addSkill();
															}
														}
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														type: "button",
														variant: "outline",
														onClick: addSkill,
														className: "shrink-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 mr-1" }), " Add"]
													})]
												}),
												skillsList.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex flex-wrap gap-2 pt-2",
													children: skillsList.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "inline-flex items-center gap-1.5 rounded-lg bg-surface border border-border px-3 py-1 text-xs font-semibold text-foreground shadow-2xs",
														children: [skill, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => removeSkill(skill),
															className: "text-muted-foreground hover:text-destructive cursor-pointer",
															"aria-label": `Remove ${skill}`,
															children: "×"
														})]
													}, skill))
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground italic",
													children: "No skills added yet."
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-sm font-bold text-foreground",
														children: "Interests & Topics"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															placeholder: "Add an interest (e.g. AI Research, Hackathons, Robotics)...",
															value: newInterest,
															onChange: (e) => setNewInterest(e.target.value),
															onKeyDown: (e) => {
																if (e.key === "Enter") {
																	e.preventDefault();
																	addInterest();
																}
															}
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															type: "button",
															variant: "outline",
															onClick: addInterest,
															className: "shrink-0",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 mr-1" }), " Add"]
														})]
													}),
													interestsList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex flex-wrap gap-2 pt-1",
														children: interestsList.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-2xs",
															children: [i, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => removeInterest(i),
																className: "text-accent-foreground/70 hover:text-destructive cursor-pointer",
																children: "×"
															})]
														}, i))
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-3 pt-3 border-t border-border/60",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-sm font-bold text-foreground",
														children: "Target Career Roles"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															placeholder: "Target roles (e.g. Full-Stack Engineer, Product Manager)...",
															value: newCareerInterest,
															onChange: (e) => setNewCareerInterest(e.target.value),
															onKeyDown: (e) => {
																if (e.key === "Enter") {
																	e.preventDefault();
																	addCareerInterest();
																}
															}
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															type: "button",
															variant: "outline",
															onClick: addCareerInterest,
															className: "shrink-0",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 mr-1" }), " Add"]
														})]
													}),
													careerInterestsList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex flex-wrap gap-2 pt-1",
														children: careerInterestsList.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary shadow-2xs",
															children: [c, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => removeCareerInterest(c),
																className: "text-primary/70 hover:text-destructive cursor-pointer",
																children: "×"
															})]
														}, c))
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between border-b border-border/60 pb-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-base font-bold text-foreground",
														children: "Work & Campus Experience"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground",
														children: "Internships, club officer roles, and community leadership."
													})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														type: "button",
														size: "sm",
														variant: "outline",
														onClick: () => setShowAddExp(!showAddExp),
														className: "cursor-pointer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5 mr-1" }), showAddExp ? "Cancel" : "Add Experience"]
													})]
												}),
												showAddExp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-lg border border-primary/20 bg-muted/30 p-4 space-y-3",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															className: "text-sm font-semibold text-foreground",
															children: "Add Experience Record"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "space-y-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																		htmlFor: "exp-title",
																		className: "text-xs",
																		children: "Role Title *"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																		id: "exp-title",
																		placeholder: "e.g. Software Engineering Intern",
																		value: expTitle,
																		onChange: (e) => setExpTitle(e.target.value)
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "space-y-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																		htmlFor: "exp-org",
																		className: "text-xs",
																		children: "Organization / Company *"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																		id: "exp-org",
																		placeholder: "e.g. Lanka Software Lab",
																		value: expOrg,
																		onChange: (e) => setExpOrg(e.target.value)
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "space-y-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																		htmlFor: "exp-loc",
																		className: "text-xs",
																		children: "Location"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																		id: "exp-loc",
																		placeholder: "e.g. Colombo, Sri Lanka (or Remote)",
																		value: expLocation,
																		onChange: (e) => setExpLocation(e.target.value)
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "space-y-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																		htmlFor: "exp-start",
																		className: "text-xs",
																		children: "Start Date *"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																		id: "exp-start",
																		type: "date",
																		value: expStart,
																		onChange: (e) => setExpStart(e.target.value)
																	})]
																}),
																!expCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "space-y-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																		htmlFor: "exp-end",
																		className: "text-xs",
																		children: "End Date"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																		id: "exp-end",
																		type: "date",
																		value: expEnd,
																		onChange: (e) => setExpEnd(e.target.value)
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "sm:col-span-2 flex items-center gap-2 pt-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "checkbox",
																		id: "exp-current",
																		checked: expCurrent,
																		onChange: (e) => setExpCurrent(e.target.checked),
																		className: "size-4 rounded border-border"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																		htmlFor: "exp-current",
																		className: "text-xs cursor-pointer",
																		children: "I currently hold this role"
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "sm:col-span-2 space-y-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																		htmlFor: "exp-desc",
																		className: "text-xs",
																		children: "Description / Key Accomplishments"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
																		id: "exp-desc",
																		rows: 3,
																		placeholder: "Describe your responsibilities and major contributions...",
																		value: expDesc,
																		onChange: (e) => setExpDesc(e.target.value)
																	})]
																})
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex justify-end gap-2 pt-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																type: "button",
																variant: "ghost",
																size: "sm",
																onClick: () => setShowAddExp(false),
																children: "Cancel"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																type: "button",
																size: "sm",
																onClick: handleAddExperience,
																children: "Save Experience"
															})]
														})
													]
												}),
												experiences.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "space-y-3",
													children: experiences.map((exp, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-start justify-between rounded-lg border border-border bg-card p-4 transition-colors",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "space-y-1",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-center gap-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
																		className: "text-sm font-bold text-foreground",
																		children: exp.title
																	}), exp.isCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary",
																		children: "Current Role"
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																	className: "text-xs font-medium text-foreground/80",
																	children: [exp.organizationName, exp.location && ` · ${exp.location}`]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																	className: "text-[11px] text-muted-foreground",
																	children: [
																		new Date(exp.startDate).toLocaleDateString("en-US", {
																			month: "short",
																			year: "numeric"
																		}),
																		" ",
																		"–",
																		" ",
																		exp.isCurrent || !exp.endDate ? "Present" : new Date(exp.endDate).toLocaleDateString("en-US", {
																			month: "short",
																			year: "numeric"
																		})
																	]
																}),
																exp.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "text-xs text-muted-foreground pt-1",
																	children: exp.description
																})
															]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => removeExperience(idx),
															className: "text-muted-foreground hover:text-destructive cursor-pointer p-1",
															title: "Remove experience",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
														})]
													}, exp.id || idx))
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground italic py-2",
													children: "No experiences added yet. Click \"Add Experience\" to showcase your student leadership or internships."
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "submit",
												disabled: busy,
												className: "font-semibold cursor-pointer",
												children: busy ? "Saving Changes…" : "Save Changes"
											}), saved && !busy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												role: "status",
												className: "inline-flex items-center gap-1.5 text-sm font-medium text-success",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Saved successfully"]
											})]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "verified-history",
								className: "mt-6 space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-foreground/90",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-foreground",
												children: "Authenticated Campus Track Record"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-0.5 text-muted-foreground",
												children: "Records in this section are authenticated through official event registration check-ins, society leadership appointments, and verified certificates. They cannot be self-edited or forged."
											})] })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-border/60 pb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-base font-bold text-foreground",
													children: "Competitions & Hackathons"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												variant: "outline",
												className: "text-xs",
												children: [verifiedActivity?.competitions.length ?? 0, " Recorded"]
											})]
										}), verifiedActivity && verifiedActivity.competitions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
											children: verifiedActivity.competitions.map((comp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg border border-border bg-muted/20 p-4 space-y-2 hover:border-gold/40 transition-colors",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-start justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															className: "text-sm font-bold text-foreground",
															children: comp.title
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "shrink-0 rounded bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold",
															children: "Competitive"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground",
														children: comp.organizationName
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between pt-1 text-[11px] text-muted-foreground border-t border-border/40",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(comp.startDate).toLocaleDateString() }), comp.teamName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-semibold text-primary flex items-center gap-1",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3" }),
																" ",
																comp.teamName
															]
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-success font-medium",
															children: "Confirmed Attendee"
														})]
													})
												]
											}, comp.id))
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground italic py-2",
											children: "No verified competition records yet. Participate in campus hackathons to build your track record!"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-border/60 pb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-base font-bold text-foreground",
													children: "Participated Events & Workshops"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												variant: "outline",
												className: "text-xs",
												children: [verifiedActivity?.events.length ?? 0, " Events"]
											})]
										}), verifiedActivity && verifiedActivity.events.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-2.5",
											children: verifiedActivity.events.map((evt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between rounded-lg border border-border bg-card p-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0 pr-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "truncate text-xs font-bold text-foreground",
														children: evt.title
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "truncate text-[11px] text-muted-foreground",
														children: [
															evt.organizationName,
															" · ",
															evt.categoryName,
															" · ",
															new Date(evt.startDate).toLocaleDateString()
														]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "shrink-0 rounded bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success",
													children: ["✓ ", evt.status]
												})]
											}, evt.id))
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground italic py-2",
											children: "No event attendance records on file."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-border/60 pb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-4 text-info" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-base font-bold text-foreground",
													children: "Volunteering & Community Service"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												variant: "outline",
												className: "text-xs",
												children: [verifiedActivity?.volunteering.length ?? 0, " Accepted Roles"]
											})]
										}), verifiedActivity && verifiedActivity.volunteering.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-2.5",
											children: verifiedActivity.volunteering.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between rounded-lg border border-border bg-card p-3.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-bold text-foreground",
													children: v.role || "Volunteer"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[11px] text-muted-foreground",
													children: [
														v.eventTitle,
														" (",
														v.organizationName,
														")"
													]
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "shrink-0 rounded bg-info/15 px-2 py-0.5 text-[10px] font-bold text-info",
													children: "✓ Authenticated Service"
												})]
											}, v.id))
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground italic py-2",
											children: "No volunteering records yet. Apply for campus volunteer roles through the events portal!"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-border/60 pb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { className: "size-4 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-base font-bold text-foreground",
													children: "Official Certificates & Credentials"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												variant: "outline",
												className: "text-xs",
												children: [verifiedActivity?.certificates.length ?? 0, " Issued"]
											})]
										}), verifiedActivity && verifiedActivity.certificates.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
											children: verifiedActivity.certificates.map((cert) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg border border-gold/30 bg-gold/5 p-4 space-y-2 relative overflow-hidden",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-start justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															className: "text-xs font-bold text-foreground pr-2",
															children: cert.title
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "shrink-0 rounded-full bg-gold/20 p-1 text-gold",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-4" })
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[11px] text-muted-foreground",
														children: ["Issued by: ", cert.issuerName]
													}),
													cert.credentialId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[10px] font-mono text-foreground/80",
														children: ["Verification Code: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold",
															children: cert.credentialId
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between pt-1 text-[10px] text-muted-foreground border-t border-gold/20",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Date: ", new Date(cert.issueDate).toLocaleDateString()] }), cert.credentialUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
															href: cert.credentialUrl,
															target: "_blank",
															rel: "noreferrer",
															className: "inline-flex items-center gap-0.5 font-semibold text-primary hover:underline",
															children: ["Verify ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-2.5" })]
														})]
													})
												]
											}, cert.id))
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground italic py-2",
											children: "No certificates issued to this profile yet."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-border/60 pb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-base font-bold text-foreground",
													children: "Verified Recognitions & Awards"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												variant: "outline",
												className: "text-xs",
												children: [verifiedActivity?.achievements.length ?? 0, " Awards"]
											})]
										}), verifiedActivity && verifiedActivity.achievements.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-2.5",
											children: verifiedActivity.achievements.map((ach) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between rounded-lg border border-border bg-card p-3.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-0.5",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
																className: "text-xs font-bold text-foreground",
																children: ach.title
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "rounded bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary",
																children: ach.category || "AWARD"
															})]
														}),
														ach.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[11px] text-muted-foreground",
															children: ach.description
														}),
														ach.issuerOrganization && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[10px] text-muted-foreground",
															children: ["Presented by ", ach.issuerOrganization.name]
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "shrink-0 text-xs font-mono text-muted-foreground",
													children: new Date(ach.earnedAt).getFullYear()
												})]
											}, ach.id))
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground italic py-2",
											children: "No verified awards on record."
										})]
									})
								]
							})
						]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "mt-6 space-y-5 xl:mt-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelCard, {
					title: "Profile Strength",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						className: "size-4",
						"aria-hidden": true
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative h-2.5 flex-1 overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-300",
								style: { width: `${completeness}%` }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-bold text-primary",
							children: [completeness, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-2 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: bio.trim() ? "text-foreground font-medium" : "",
								children: [bio.trim() ? "✓" : "•", " Short introduction bio"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: skillsList.length > 0 ? "text-foreground font-medium" : "",
								children: [
									skillsList.length > 0 ? "✓" : "•",
									" Technical skills added (",
									skillsList.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: experiences.length > 0 ? "text-foreground font-medium" : "",
								children: [
									experiences.length > 0 ? "✓" : "•",
									" Work / club experience (",
									experiences.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: interestsList.length > 0 ? "text-foreground font-medium" : "",
								children: [interestsList.length > 0 ? "✓" : "•", " Career interests specified"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: githubUrl || linkedinUrl || websiteUrl ? "text-foreground font-medium" : "",
								children: [githubUrl || linkedinUrl || websiteUrl ? "✓" : "•", " Professional links added"]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
					title: "University Identity",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, {
						className: "size-4",
						"aria-hidden": true
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "space-y-2.5 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "uppercase tracking-wider text-muted-foreground text-[10px]",
								children: "Verified University"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "font-semibold text-foreground flex items-center gap-1 mt-0.5",
								children: [profile.universityName, isUniVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-gold shrink-0" })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "uppercase tracking-wider text-muted-foreground text-[10px]",
								children: "Faculty"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-medium text-foreground",
								children: profile.faculty
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "uppercase tracking-wider text-muted-foreground text-[10px]",
								children: "Department"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-medium text-foreground",
								children: profile.department
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "uppercase tracking-wider text-muted-foreground text-[10px]",
								children: "Academic Standing"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "font-medium text-foreground",
								children: [
									profile.academicYear || "3rd Year",
									" · ",
									profile.intakeSemester || `Batch ${profile.batch}`
								]
							})] })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
					title: "Society Affiliations",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
						className: "size-4",
						"aria-hidden": true
					}),
					children: verifiedActivity?.organizations && verifiedActivity.organizations.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-xs",
						children: verifiedActivity.organizations.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between rounded-lg border border-border bg-card p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 pr-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-semibold text-foreground",
									children: m.organizationName
								}), m.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[11px] text-muted-foreground",
									children: m.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 rounded bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary",
								children: m.role.replace(/_/g, " ")
							})]
						}, m.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "No active society memberships."
					})
				})
			]
		})]
	});
}
//#endregion
export { ProfilePage as component };
