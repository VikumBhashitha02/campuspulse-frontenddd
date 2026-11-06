import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { t as Button } from "./button-Dw0VHwRC.mjs";
import { t as socialApi } from "./social-D4BN0hFM.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ShieldCheck, Cn as ArrowLeft, E as Settings, Ft as Crown, Vt as Clock, en as Check, o as UserPlus, r as Users, s as UserCheck, sn as CalendarClock, t as X, un as Building2 } from "../_libs/lucide-react.mjs";
import { n as EmptyState, o as RowSkeleton, r as ErrorState } from "./States-DTPgRZKE.mjs";
import { c as relativeTime } from "./format-Cdcdxizs.mjs";
import { o as OrgAvatar } from "./Badges-Bz6vmcNI.mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PanelCard } from "./Section-DQvNGA2Q.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CeXuDfGc.mjs";
import { t as Label } from "./label-Bi14Oc-S.mjs";
import { t as Textarea } from "./textarea-7zknwcEV.mjs";
import { t as Route } from "./account.teams._id-CMSJ7iPB.mjs";
import { t as Switch } from "./switch-Dsx5fBGo.mjs";
import { t as CompatibilityScore } from "./Cards-CTAMaKD_.mjs";
import { t as UserProfileModal } from "./UserProfileModal-BkSs9UQl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.teams._id-DvoYgMR6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AVAILABILITY_LABEL = {
	WEEKDAYS: "Meets on weekdays",
	WEEKENDS: "Meets on weekends",
	FLEXIBLE: "Flexible schedule"
};
function getInitials(name) {
	return name.split(" ").slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}
function TeamDetailPage() {
	const { id } = Route.useParams();
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const teamQuery = useQuery({
		queryKey: ["team", id],
		queryFn: () => socialApi.team(id)
	});
	const [role, setRole] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [isSubmittingJoin, setIsSubmittingJoin] = (0, import_react.useState)(false);
	const [respondingId, setRespondingId] = (0, import_react.useState)(null);
	const [inspectedProfile, setInspectedProfile] = (0, import_react.useState)(null);
	const [inspectedRequestId, setInspectedRequestId] = (0, import_react.useState)(null);
	const [isEditOpen, setIsEditOpen] = (0, import_react.useState)(false);
	const [editName, setEditName] = (0, import_react.useState)("");
	const [editDescription, setEditDescription] = (0, import_react.useState)("");
	const [editMaxMembers, setEditMaxMembers] = (0, import_react.useState)(4);
	const [editIsOpen, setEditIsOpen] = (0, import_react.useState)(true);
	const [isUpdating, setIsUpdating] = (0, import_react.useState)(false);
	if (teamQuery.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, { count: 5 });
	if (teamQuery.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => teamQuery.refetch() });
	if (!teamQuery.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Squad not found",
		description: "This squad may have been removed or closed.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/account/teams",
				children: "Back to Squad Hub"
			})
		})
	});
	const t = teamQuery.data;
	const isLeader = Boolean(user?.id && (t.creatorId === user.id || t.members.some((m) => (m.userId === user.id || m.id === user.id) && m.isLeader)));
	const isMember = Boolean(user?.id && t.members.some((m) => m.userId === user.id || m.id === user.id));
	const joinRequests = t.joinRequests || [];
	const pendingRequests = joinRequests.filter((r) => r.status === "PENDING");
	const myRequest = user?.id ? joinRequests.find((r) => r.userId === user.id) : null;
	const hasPendingRequest = myRequest?.status === "PENDING";
	const isFull = t.maxMembers && t.members.length >= t.maxMembers || t.openSlots <= 0;
	const isRecruiting = t.isOpen !== false && !isFull;
	const handleRespond = async (requestId, action) => {
		setRespondingId(requestId);
		try {
			await socialApi.respondToJoinRequest(requestId, action);
			toast.success(action === "ACCEPTED" ? "Teammate Accepted! 🎉" : "Join Request Declined", { description: action === "ACCEPTED" ? "New teammate added to the squad roster." : "Applicant has been notified." });
			setInspectedProfile(null);
			setInspectedRequestId(null);
			await teamQuery.refetch();
			queryClient.invalidateQueries({ queryKey: ["myTeams"] });
			queryClient.invalidateQueries({ queryKey: ["teams"] });
			queryClient.invalidateQueries({ queryKey: ["team", id] });
		} catch (err) {
			toast.error(err?.message || "Failed to respond to request.");
		} finally {
			setRespondingId(null);
		}
	};
	const handleJoinSubmit = async (e) => {
		e.preventDefault();
		setIsSubmittingJoin(true);
		try {
			await socialApi.requestToJoin(t.id, role || t.requiredRoles[0] || "Member", message);
			toast.success("Application Submitted! 🎉", { description: `${t.leader} will review your profile and response.` });
			setRole("");
			setMessage("");
			await teamQuery.refetch();
			queryClient.invalidateQueries({ queryKey: ["myTeams"] });
			queryClient.invalidateQueries({ queryKey: ["teams"] });
			queryClient.invalidateQueries({ queryKey: ["team", id] });
		} catch (err) {
			toast.error(err?.message || "Could not send join request.");
		} finally {
			setIsSubmittingJoin(false);
		}
	};
	const handleRemoveMember = async (memberUserId, memberName) => {
		if (!confirm(`Are you sure you want to remove ${memberName} from the squad?`)) return;
		try {
			await socialApi.leaveOrRemoveMember(t.id, memberUserId);
			toast.success(`${memberName} was removed from the squad.`);
			await teamQuery.refetch();
			queryClient.invalidateQueries({ queryKey: ["myTeams"] });
		} catch (err) {
			toast.error(err?.message || "Failed to remove member.");
		}
	};
	const openEditModal = () => {
		setEditName(t.name);
		setEditDescription(t.description || "");
		setEditMaxMembers(t.maxMembers || 4);
		setEditIsOpen(t.isOpen !== false);
		setIsEditOpen(true);
	};
	const handleSaveEdit = async () => {
		setIsUpdating(true);
		try {
			const payload = {
				name: editName.trim(),
				description: editDescription.trim(),
				maxMembers: Number(editMaxMembers),
				isOpen: editIsOpen
			};
			await socialApi.updateTeam(t.id, payload);
			toast.success("Squad updated successfully");
			setIsEditOpen(false);
			await teamQuery.refetch();
			queryClient.invalidateQueries({ queryKey: ["myTeams"] });
		} catch (err) {
			toast.error(err?.message || "Failed to update squad.");
		} finally {
			setIsUpdating(false);
		}
	};
	const inspectMemberProfile = (member) => {
		const prof = member.studentProfile || {};
		setInspectedProfile({
			name: member.name,
			avatarUrl: member.avatarUrl,
			universityName: prof.university?.name || "University",
			faculty: prof.faculty?.name,
			department: prof.department?.name,
			academicYear: prof.academicYear,
			bio: prof.bio,
			skills: prof.skills || [],
			interests: prof.interests || [],
			careerInterests: prof.careerInterests || [],
			githubUrl: prof.githubUrl,
			linkedinUrl: prof.linkedinUrl,
			websiteUrl: prof.websiteUrl
		});
		setInspectedRequestId(null);
	};
	const inspectApplicantProfile = (request) => {
		const userObj = request.user || {};
		const prof = userObj.studentProfile || {};
		setInspectedProfile({
			id: userObj.id,
			name: userObj.name || request.applicant || "Applicant",
			avatarUrl: userObj.avatarUrl,
			universityEmailVerified: userObj.universityEmailVerified,
			universityName: prof.university?.name || "University",
			faculty: prof.faculty?.name,
			department: prof.department?.name,
			academicYear: prof.academicYear,
			batchYear: prof.batchYear,
			bio: prof.bio,
			skills: prof.skills || [],
			interests: prof.interests || [],
			careerInterests: prof.careerInterests || [],
			githubUrl: prof.githubUrl,
			linkedinUrl: prof.linkedinUrl,
			websiteUrl: prof.websiteUrl,
			experiences: prof.experiences || [],
			certificates: prof.certificates || [],
			applicationMessage: request.message,
			preferredRole: request.preferredRole || request.role,
			appliedAt: request.requestedAt || request.createdAt
		});
		setInspectedRequestId(request.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/account/teams",
				className: "inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back to Squad Hub"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "rounded-2xl border border-border bg-navy p-6 text-navy-foreground shadow-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row md:items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-extrabold tracking-tight",
									children: t.name
								}), isRecruiting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300",
									children: "Recruiting Members"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/70",
									children: isFull ? "Squad Full" : "Recruitment Closed"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1.5 text-sm text-navy-foreground/80 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 text-primary shrink-0" }), t.eventTitle || "General Campus Project"]
							}),
							t.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-navy-foreground/90 max-w-3xl",
								children: t.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-navy-foreground/80",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }),
											t.members.length,
											" / ",
											t.maxMembers || 4,
											" members (",
											t.openSlots,
											" open slots)"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-3.5" }), AVAILABILITY_LABEL[t.availability || "FLEXIBLE"]]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-3.5 text-amber-400" }),
											"Led by ",
											t.leader
										]
									})
								]
							})
						]
					}), isLeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex shrink-0 gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "h-9 bg-white/10 text-white border-white/20 hover:bg-white/20",
							onClick: openEditModal,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "mr-1.5 size-4" }), "Squad Settings"]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between pb-3 border-b border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-base font-bold flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-4 text-primary" }),
										"Squad Lineup & Roster (",
										t.members.length,
										"/",
										t.maxMembers || 4,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Active teammates registered in this squad."
								})] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 divide-y divide-border",
								children: t.members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center justify-between gap-3 py-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 min-w-0",
										children: [m.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: m.avatarUrl,
											alt: m.name,
											className: "size-10 rounded-full border border-border object-cover shrink-0"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
											initials: getInitials(m.name),
											className: "size-10 shrink-0"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "truncate text-sm font-semibold",
													children: m.name
												}), m.isLeader && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-3" }), "Leader"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-xs text-muted-foreground",
												children: m.role
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "sm",
											className: "h-8 text-xs",
											onClick: () => inspectMemberProfile(m),
											children: "View Profile"
										}), isLeader && !m.isLeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											className: "h-8 text-xs text-destructive hover:bg-destructive/10",
											onClick: () => handleRemoveMember(m.userId || m.id, m.name),
											children: "Remove"
										})]
									})]
								}, m.id))
							})]
						}),
						isLeader && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between pb-3 border-b border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-base font-bold flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4 text-amber-500" }),
										"Candidate Join Applications (",
										pendingRequests.length,
										" Pending)"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Inspect applicant verified student profiles and messages before accepting them into the squad."
								})] })
							}), pendingRequests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "py-8 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold",
									children: "No pending applications"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: "When students request to join your squad, their profile cards will appear here for review."
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 space-y-3",
								children: pendingRequests.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/80 bg-surface/40 p-4 transition-all hover:bg-surface/80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row sm:items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3 min-w-0",
											children: [r.user?.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: r.user.avatarUrl,
												alt: r.user.name,
												className: "size-11 rounded-full border border-border object-cover shrink-0"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
												initials: getInitials(r.user?.name || r.applicant || "Applicant"),
												className: "size-11 shrink-0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															className: "font-bold text-sm truncate",
															children: r.user?.name || r.applicant
														}), r.user?.universityEmailVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-emerald-500 shrink-0" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xs text-muted-foreground mt-0.5",
														children: [
															"Applying for:",
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-semibold text-primary",
																children: r.preferredRole || r.role || "Member"
															}),
															" ",
															"· ",
															relativeTime(r.requestedAt || r.createdAt)
														]
													}),
													r.user?.studentProfile?.university?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[11px] text-muted-foreground",
														children: [r.user.studentProfile.university.name, r.user.studentProfile.academicYear ? ` (${r.user.studentProfile.academicYear})` : ""]
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 shrink-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													variant: "outline",
													className: "h-8 text-xs",
													onClick: () => inspectApplicantProfile(r),
													children: "Inspect Full Profile"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													className: "h-8 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white",
													disabled: respondingId === r.id || isFull,
													onClick: () => handleRespond(r.id, "ACCEPTED"),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 size-3.5" }), "Accept"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													variant: "ghost",
													className: "h-8 text-xs text-muted-foreground hover:text-destructive",
													disabled: respondingId === r.id,
													onClick: () => handleRespond(r.id, "REJECTED"),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mr-1 size-3.5" }), "Decline"]
												})
											]
										})]
									}), r.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 rounded-lg border border-border/60 bg-background/60 p-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs italic text-foreground/90 leading-relaxed",
											children: [
												"\"",
												r.message,
												"\""
											]
										})
									})]
								}, r.id))
							})]
						}),
						!isMember && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-base font-bold",
									children: ["Request to Join ", t.name]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: [
										"Introduce yourself, select a target role, and tell ",
										t.leader,
										" why you're a great addition to this squad."
									]
								}),
								hasPendingRequest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-amber-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-semibold text-amber-600 dark:text-amber-400",
												children: "Join Request Pending Review"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground mt-1.5 leading-relaxed",
											children: [
												"You submitted an application for",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-foreground",
													children: myRequest.preferredRole || myRequest.role || "Member"
												}),
												" ",
												relativeTime(myRequest.requestedAt || myRequest.createdAt),
												". The team leader (",
												t.leader,
												") will review your profile."
											]
										}),
										myRequest.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2.5 rounded-md bg-surface/70 p-2.5 border border-border/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs italic text-foreground/90",
												children: [
													"\"",
													myRequest.message,
													"\""
												]
											})
										})
									]
								}) : isRecruiting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleJoinSubmit,
									className: "mt-4 space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "join-role",
												className: "text-xs font-bold uppercase tracking-wider",
												children: "Role You Want to Fill"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "join-role",
												value: role,
												onChange: (e) => setRole(e.target.value),
												placeholder: t.requiredRoles[0] ?? "e.g. Lead Developer, UX Designer"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "join-message",
												className: "text-xs font-bold uppercase tracking-wider",
												children: "Application Pitch / Note"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												id: "join-message",
												rows: 4,
												value: message,
												onChange: (e) => setMessage(e.target.value),
												placeholder: "Highlight your previous project experience, skills, and weekly availability."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											disabled: isSubmittingJoin,
											className: "bg-primary font-semibold",
											children: isSubmittingJoin ? "Submitting Application…" : "Submit Join Request"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 rounded-lg border border-muted p-4 bg-surface/50 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-muted-foreground",
										children: "This squad is currently not recruiting additional members."
									})
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelCard, {
						title: "Your Compatibility",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompatibilityScore, { value: t.compatibility }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted-foreground leading-relaxed",
							children: "Calculated using verified skills, faculty alignment, and project requirements."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelCard, {
						title: "Open Positions & Roles",
						children: [t.requiredRoles && t.requiredRoles.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2",
							children: t.requiredRoles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-lg bg-surface px-3 py-2 text-xs font-semibold border border-border/50 text-foreground",
								children: r
							}, r))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "General open teammate slots."
						}), t.skills && t.skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-3 border-t border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2",
								children: "Required Skills"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: t.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-md bg-surface px-2 py-0.5 text-xs text-foreground border border-border/40",
									children: s
								}, s))
							})]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isEditOpen,
				onOpenChange: setIsEditOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Squad Settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
							"Configure recruitment status and capacity for ",
							t.name,
							"."
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "edit-squad-name",
										className: "text-xs font-bold uppercase tracking-wider",
										children: "Squad Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "edit-squad-name",
										value: editName,
										onChange: (e) => setEditName(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "edit-squad-desc",
										className: "text-xs font-bold uppercase tracking-wider",
										children: "Description / Objective"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "edit-squad-desc",
										rows: 3,
										value: editDescription,
										onChange: (e) => setEditDescription(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "edit-squad-cap",
											className: "text-xs font-bold uppercase tracking-wider",
											children: "Maximum Member Capacity"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "edit-squad-cap",
											type: "number",
											min: t.members.length,
											max: 12,
											value: editMaxMembers,
											onChange: (e) => setEditMaxMembers(Number(e.target.value))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-muted-foreground",
											children: [
												"Currently ",
												t.members.length,
												" members in squad."
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-lg border border-border p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: "Open Recruitment"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Allow other students to discover and apply to this squad."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: editIsOpen,
										onCheckedChange: setEditIsOpen
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setIsEditOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleSaveEdit,
							disabled: isUpdating,
							className: "bg-primary font-semibold",
							children: isUpdating ? "Saving Changes…" : "Save Squad"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserProfileModal, {
				profile: inspectedProfile,
				open: Boolean(inspectedProfile),
				onOpenChange: (o) => {
					if (!o) {
						setInspectedProfile(null);
						setInspectedRequestId(null);
					}
				},
				onAccept: inspectedRequestId && isLeader ? () => {
					handleRespond(inspectedRequestId, "ACCEPTED");
				} : void 0,
				onReject: inspectedRequestId && isLeader ? () => {
					handleRespond(inspectedRequestId, "REJECTED");
				} : void 0,
				isResponding: Boolean(respondingId)
			})
		]
	});
}
//#endregion
export { TeamDetailPage as component };
