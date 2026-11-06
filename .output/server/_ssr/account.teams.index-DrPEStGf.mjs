import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { t as socialApi } from "./social-D4BN0hFM.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ShieldCheck, E as Settings, Ft as Crown, Gt as CirclePlus, Kt as CircleCheck, O as Send, Sn as ArrowRight, Vt as Clock, Wt as CircleX, f as Trash2, k as Search, r as Users, s as UserCheck, un as Building2, y as Sparkles } from "../_libs/lucide-react.mjs";
import { t as eventsApi } from "./events-Dtjwkx07.mjs";
import { a as PageHeader, i as GridSkeleton, n as EmptyState, r as ErrorState } from "./States-DTPgRZKE.mjs";
import { c as relativeTime } from "./format-Cdcdxizs.mjs";
import { o as OrgAvatar } from "./Badges-Bz6vmcNI.mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-Vjzjil1D.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CeXuDfGc.mjs";
import { t as Label } from "./label-Bi14Oc-S.mjs";
import { t as Textarea } from "./textarea-7zknwcEV.mjs";
import { t as Switch } from "./switch-Dsx5fBGo.mjs";
import { r as TeamCard } from "./Cards-CTAMaKD_.mjs";
import { t as UserProfileModal } from "./UserProfileModal-BkSs9UQl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.teams.index-DrPEStGf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SORTS = [
	{
		id: "match",
		label: "Best match"
	},
	{
		id: "slots",
		label: "Most open slots"
	},
	{
		id: "name",
		label: "A–Z"
	}
];
function TeamsHubPage() {
	const queryClient = useQueryClient();
	const { user } = useAuth();
	const [activeTab, setActiveTab] = (0, import_react.useState)("discover");
	const [term, setTerm] = (0, import_react.useState)("");
	const [skillFilter, setSkillFilter] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("match");
	const [targetTeam, setTargetTeam] = (0, import_react.useState)(null);
	const [joinRole, setJoinRole] = (0, import_react.useState)("");
	const [joinMessage, setJoinMessage] = (0, import_react.useState)("");
	const [isSubmittingJoin, setIsSubmittingJoin] = (0, import_react.useState)(false);
	const [inspectedProfile, setInspectedProfile] = (0, import_react.useState)(null);
	const [inviteTargetStudent, setInviteTargetStudent] = (0, import_react.useState)(null);
	const [selectedInviteTeamId, setSelectedInviteTeamId] = (0, import_react.useState)("");
	const [inviteRole, setInviteRole] = (0, import_react.useState)("");
	const [inviteMessage, setInviteMessage] = (0, import_react.useState)("");
	const [isSendingInvite, setIsSendingInvite] = (0, import_react.useState)(false);
	const [candidateSearch, setCandidateSearch] = (0, import_react.useState)("");
	const [candidateSkill, setCandidateSkill] = (0, import_react.useState)("");
	const [newTeamName, setNewTeamName] = (0, import_react.useState)("");
	const [newTeamDescription, setNewTeamDescription] = (0, import_react.useState)("");
	const [newTeamEventId, setNewTeamEventId] = (0, import_react.useState)("");
	const [newTeamMaxMembers, setNewTeamMaxMembers] = (0, import_react.useState)(4);
	const [newTeamRoles, setNewTeamRoles] = (0, import_react.useState)([]);
	const [roleInput, setRoleInput] = (0, import_react.useState)("");
	const [newTeamSkills, setNewTeamSkills] = (0, import_react.useState)([]);
	const [skillInput, setSkillInput] = (0, import_react.useState)("");
	const [isCreatingTeam, setIsCreatingTeam] = (0, import_react.useState)(false);
	const [editingTeam, setEditingTeam] = (0, import_react.useState)(null);
	const [editName, setEditName] = (0, import_react.useState)("");
	const [editDescription, setEditDescription] = (0, import_react.useState)("");
	const [editMaxMembers, setEditMaxMembers] = (0, import_react.useState)(4);
	const [editIsOpen, setEditIsOpen] = (0, import_react.useState)(true);
	const [isUpdatingTeam, setIsUpdatingTeam] = (0, import_react.useState)(false);
	const teamsQuery = useQuery({
		queryKey: ["teams", skillFilter],
		queryFn: () => socialApi.teams({ skill: skillFilter || void 0 })
	});
	const myTeamsQuery = useQuery({
		queryKey: ["myTeams"],
		queryFn: () => socialApi.myTeams()
	});
	const candidatesQuery = useQuery({
		queryKey: [
			"candidates",
			candidateSearch,
			candidateSkill
		],
		queryFn: () => socialApi.candidates({
			search: candidateSearch || void 0,
			skill: candidateSkill || void 0
		})
	});
	const opportunitiesQuery = useQuery({
		queryKey: ["opportunitiesForTeams"],
		queryFn: () => eventsApi.list({ limit: 40 })
	});
	const discoverTeams = (teamsQuery.data ?? []).filter((t) => !term || t.name.toLowerCase().includes(term.toLowerCase()) || t.eventTitle.toLowerCase().includes(term.toLowerCase()) || t.skills.some((s) => s.toLowerCase().includes(term.toLowerCase())) || t.requiredRoles.some((r) => r.toLowerCase().includes(term.toLowerCase()))).sort((a, b) => {
		if (sort === "slots") return b.openSlots - a.openSlots;
		if (sort === "name") return a.name.localeCompare(b.name);
		return b.compatibility - a.compatibility;
	});
	const handleJoinSubmit = async () => {
		if (!targetTeam) return;
		setIsSubmittingJoin(true);
		try {
			await socialApi.requestToJoin(targetTeam.id, joinRole || targetTeam.requiredRoles[0] || "Member", joinMessage);
			toast.success("Application Submitted! 🎉", { description: `Your request was sent to ${targetTeam.leader} for review.` });
			setTargetTeam(null);
			setJoinRole("");
			setJoinMessage("");
			queryClient.invalidateQueries({ queryKey: ["myTeams"] });
			queryClient.invalidateQueries({ queryKey: ["teams"] });
		} catch (err) {
			toast.error(err?.message || "Could not submit join request. Please try again.");
		} finally {
			setIsSubmittingJoin(false);
		}
	};
	const handleWithdrawRequest = async (requestId) => {
		try {
			await socialApi.cancelJoinRequest(requestId);
			toast.success("Request withdrawn");
			queryClient.invalidateQueries({ queryKey: ["myTeams"] });
		} catch (err) {
			toast.error(err?.message || "Failed to withdraw request.");
		}
	};
	const handleCreateTeamSubmit = async (e) => {
		e.preventDefault();
		if (!newTeamName.trim()) {
			toast.error("Please enter a squad name");
			return;
		}
		if (!newTeamDescription.trim()) {
			toast.error("Please enter a short squad description or objective");
			return;
		}
		setIsCreatingTeam(true);
		try {
			const payload = {
				name: newTeamName.trim(),
				description: newTeamDescription.trim(),
				eventId: newTeamEventId || void 0,
				maxMembers: Number(newTeamMaxMembers) || 4,
				requiredRoles: newTeamRoles,
				requiredSkills: newTeamSkills
			};
			const created = await socialApi.createTeam(payload);
			toast.success("Squad Created! 🚀", { description: `You are now the team leader of "${created.name}".` });
			setNewTeamName("");
			setNewTeamDescription("");
			setNewTeamEventId("");
			setNewTeamMaxMembers(4);
			setNewTeamRoles([]);
			setNewTeamSkills([]);
			queryClient.invalidateQueries({ queryKey: ["myTeams"] });
			queryClient.invalidateQueries({ queryKey: ["teams"] });
			setActiveTab("my-teams");
		} catch (err) {
			toast.error(err?.message || "Failed to create squad. Check your inputs.");
		} finally {
			setIsCreatingTeam(false);
		}
	};
	const openEditModal = (t) => {
		setEditingTeam(t);
		setEditName(t.name);
		setEditDescription(t.description || "");
		setEditMaxMembers(t.maxMembers || 4);
		setEditIsOpen(t.isOpen !== false);
	};
	const handleSaveEditTeam = async () => {
		if (!editingTeam) return;
		setIsUpdatingTeam(true);
		try {
			const payload = {
				name: editName.trim(),
				description: editDescription.trim(),
				maxMembers: Number(editMaxMembers),
				isOpen: editIsOpen
			};
			await socialApi.updateTeam(editingTeam.id, payload);
			toast.success("Squad updated successfully");
			setEditingTeam(null);
			queryClient.invalidateQueries({ queryKey: ["myTeams"] });
			queryClient.invalidateQueries({ queryKey: ["teams"] });
		} catch (err) {
			toast.error(err?.message || "Failed to update squad.");
		} finally {
			setIsUpdatingTeam(false);
		}
	};
	const handleDeleteTeam = async (t) => {
		if (!confirm(`Are you sure you want to delete squad "${t.name}"? This action cannot be undone.`)) return;
		try {
			await socialApi.deleteTeam(t.id);
			toast.success(`Squad "${t.name}" deleted.`);
			queryClient.invalidateQueries({ queryKey: ["myTeams"] });
			queryClient.invalidateQueries({ queryKey: ["teams"] });
		} catch (err) {
			toast.error(err?.message || "Failed to delete team.");
		}
	};
	const handleLeaveTeam = async (t) => {
		if (!user) return;
		if (!confirm(`Are you sure you want to leave "${t.name}"?`)) return;
		try {
			await socialApi.leaveOrRemoveMember(t.id, user.id);
			toast.success(`You left "${t.name}".`);
			queryClient.invalidateQueries({ queryKey: ["myTeams"] });
			queryClient.invalidateQueries({ queryKey: ["teams"] });
		} catch (err) {
			toast.error(err?.message || "Failed to leave squad.");
		}
	};
	const openInviteDialog = (candidate) => {
		setInviteTargetStudent(candidate);
		const createdSquads = myTeamsQuery.data?.createdTeams || [];
		if (createdSquads.length > 0 && createdSquads[0]) setSelectedInviteTeamId(createdSquads[0].id);
		else setSelectedInviteTeamId("");
		setInviteRole("");
		setInviteMessage("");
	};
	const handleSendInvite = async () => {
		if (!inviteTargetStudent || !selectedInviteTeamId) {
			toast.error("Please select a squad you lead to invite this student.");
			return;
		}
		setIsSendingInvite(true);
		try {
			await socialApi.inviteCandidate(selectedInviteTeamId, {
				candidateUserId: inviteTargetStudent.userId,
				role: inviteRole.trim() || void 0,
				message: inviteMessage.trim() || void 0
			});
			toast.success("Invitation Sent! 🤝", { description: `${inviteTargetStudent.name} was notified with your invitation.` });
			setInviteTargetStudent(null);
		} catch (err) {
			toast.error(err?.message || "Failed to send invitation.");
		} finally {
			setIsSendingInvite(false);
		}
	};
	const addRoleTag = () => {
		if (roleInput.trim() && !newTeamRoles.includes(roleInput.trim())) {
			setNewTeamRoles([...newTeamRoles, roleInput.trim()]);
			setRoleInput("");
		}
	};
	const addSkillTag = () => {
		if (skillInput.trim() && !newTeamSkills.includes(skillInput.trim())) {
			setNewTeamSkills([...newTeamSkills, skillInput.trim()]);
			setSkillInput("");
		}
	};
	const myCreatedSquads = myTeamsQuery.data?.createdTeams || [];
	const myJoinedSquads = myTeamsQuery.data?.joinedTeams || [];
	const myPendingRequests = myTeamsQuery.data?.pendingRequests || [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Squads & Teams",
				title: "Student Team & Teammate Hub",
				description: "Discover recruiting squads for hackathons & research, create your own team, review applicant profiles, and find teammates across universities."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: activeTab,
				onValueChange: setActiveTab,
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid w-full grid-cols-2 sm:grid-cols-5 h-auto p-1 bg-surface rounded-xl border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "discover",
								className: "py-2 text-xs sm:text-sm font-semibold",
								children: "Discover Teams"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "create",
								className: "py-2 text-xs sm:text-sm font-semibold",
								children: "Create a Team"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "my-teams",
								className: "py-2 text-xs sm:text-sm font-semibold flex items-center gap-1.5",
								children: ["My Teams", (myCreatedSquads.length > 0 || myJoinedSquads.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-primary/20 px-1.5 py-0.2 text-[10px] font-bold text-primary",
									children: myCreatedSquads.length + myJoinedSquads.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "requests",
								className: "py-2 text-xs sm:text-sm font-semibold flex items-center gap-1.5",
								children: ["My Requests", myPendingRequests.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-bold text-amber-600 dark:text-amber-400",
									children: myPendingRequests.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "candidates",
								className: "py-2 text-xs sm:text-sm font-semibold",
								children: "Find Teammates"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "discover",
						className: "mt-6 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 sm:flex-row sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative min-w-0 flex-1 sm:max-w-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "team-search",
										className: "sr-only",
										children: "Search teams"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
										"aria-hidden": true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "team-search",
										value: term,
										onChange: (e) => setTerm(e.target.value),
										placeholder: "Search by team, opportunity, role, or skill",
										className: "pl-9"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: SORTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": sort === s.id,
									onClick: () => setSort(s.id),
									className: cn("rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors", sort === s.id ? "bg-navy text-navy-foreground dark:bg-primary dark:text-primary-foreground shadow-sm" : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground"),
									children: s.label
								}, s.id))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: teamsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, { count: 4 }) : teamsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => teamsQuery.refetch() }) : discoverTeams.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
								className: "size-6",
								"aria-hidden": true
							}),
							title: "No teams match your criteria",
							description: "Try a different skill, role, or opportunity keyword, or start your own squad.",
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [term && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setTerm(""),
									children: "Clear search"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => setActiveTab("create"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "mr-1.5 size-4" }), "Create a Team"]
								})]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 md:grid-cols-2",
							children: discoverTeams.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamCard, {
								team: t,
								onRequest: setTargetTeam,
								isMember: myJoinedSquads.some((j) => j.id === t.id) || myCreatedSquads.some((c) => c.id === t.id)
							}, t.id))
						}) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "create",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] max-w-3xl mx-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-border pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold",
									children: "Create a New Squad"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "Assemble a student squad for competitions, hackathons, research labs, or campus projects. As creator, you will be the squad leader."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleCreateTeamSubmit,
								className: "mt-6 space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "squad-name",
											className: "text-xs font-bold uppercase tracking-wider",
											children: ["Squad Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "squad-name",
											required: true,
											value: newTeamName,
											onChange: (e) => setNewTeamName(e.target.value),
											placeholder: "e.g. AlgoRhythms Hackers, Quantum AI Lab"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "squad-desc",
											className: "text-xs font-bold uppercase tracking-wider",
											children: ["Description & Objective ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "squad-desc",
											required: true,
											rows: 3,
											value: newTeamDescription,
											onChange: (e) => setNewTeamDescription(e.target.value),
											placeholder: "Describe your project goal, target competition, working schedule, and who you want to team up with."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "squad-event",
												className: "text-xs font-bold uppercase tracking-wider",
												children: "Target Opportunity / Event (Optional)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												id: "squad-event",
												value: newTeamEventId,
												onChange: (e) => setNewTeamEventId(e.target.value),
												className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													children: "General Project / No Linked Event"
												}), (opportunitiesQuery.data ?? []).map((opp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
													value: opp.id,
													children: [
														opp.title,
														" (",
														opp.opportunityType || "Event",
														")"
													]
												}, opp.id))]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "squad-max",
													className: "text-xs font-bold uppercase tracking-wider",
													children: "Maximum Team Size"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "squad-max",
													type: "number",
													min: 2,
													max: 12,
													value: newTeamMaxMembers,
													onChange: (e) => setNewTeamMaxMembers(Number(e.target.value))
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-muted-foreground",
													children: "Includes yourself and additional open slots."
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs font-bold uppercase tracking-wider",
												children: "Roles & Positions Needed"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: roleInput,
													onChange: (e) => setRoleInput(e.target.value),
													onKeyDown: (e) => {
														if (e.key === "Enter") {
															e.preventDefault();
															addRoleTag();
														}
													},
													placeholder: "e.g. UI/UX Designer, ML Engineer, Pitch Lead (Press Enter)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													type: "button",
													variant: "outline",
													onClick: addRoleTag,
													children: "Add"
												})]
											}),
											newTeamRoles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex flex-wrap gap-1.5 pt-1",
												children: newTeamRoles.map((role, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary",
													children: [role, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setNewTeamRoles(newTeamRoles.filter((_, i) => i !== idx)),
														className: "hover:text-destructive",
														children: "×"
													})]
												}, idx))
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs font-bold uppercase tracking-wider",
												children: "Required Skills & Tech Stack"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: skillInput,
													onChange: (e) => setSkillInput(e.target.value),
													onKeyDown: (e) => {
														if (e.key === "Enter") {
															e.preventDefault();
															addSkillTag();
														}
													},
													placeholder: "e.g. Python, React, PyTorch, Figma (Press Enter)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													type: "button",
													variant: "outline",
													onClick: addSkillTag,
													children: "Add"
												})]
											}),
											newTeamSkills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex flex-wrap gap-1.5 pt-1",
												children: newTeamSkills.map((sk, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-foreground border border-border/80",
													children: [sk, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setNewTeamSkills(newTeamSkills.filter((_, i) => i !== idx)),
														className: "hover:text-destructive",
														children: "×"
													})]
												}, idx))
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-border pt-4 flex justify-end gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "outline",
											onClick: () => setActiveTab("discover"),
											children: "Cancel"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											disabled: isCreatingTeam,
											className: "bg-primary font-semibold",
											children: isCreatingTeam ? "Creating Squad…" : "Create & Launch Squad"
										})]
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "my-teams",
						className: "mt-6 space-y-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-3 border-b border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-base font-bold flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-4 text-amber-500" }),
									"Squads You Lead (",
									myCreatedSquads.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "You have leader permissions to manage roster, accept/decline join requests, and update recruitment status."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => setActiveTab("create"),
								className: "h-8 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "mr-1.5 size-3.5" }), "New Squad"]
							})]
						}), myCreatedSquads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-dashed border-border p-6 text-center mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold",
									children: "You haven't created any squads yet."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: "Start a team to recruit peers with matching skills for competitions or projects."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => setActiveTab("create"),
									className: "mt-3",
									children: "Create your first squad"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 md:grid-cols-2 mt-4",
							children: myCreatedSquads.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-base font-bold",
												children: t.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400",
												children: "Leader"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-xs text-muted-foreground inline-flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3 text-primary" }), t.eventTitle || "General Campus Squad"]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-md bg-surface px-2.5 py-1 text-xs font-semibold border border-border/60",
											children: [
												t.members.length,
												"/",
												t.maxMembers || 4,
												" members"
											]
										})]
									}),
									t.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2.5 text-xs text-muted-foreground line-clamp-2",
										children: t.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 flex items-center gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold", t.isOpen ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"),
											children: t.isOpen ? "Recruitment Active" : "Recruitment Closed"
										})
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 border-t border-border pt-3.5 flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ghost",
											size: "sm",
											className: "h-8 text-xs text-muted-foreground hover:text-foreground",
											onClick: () => openEditModal(t),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "mr-1 size-3.5" }), "Settings"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											className: "h-8 text-xs text-destructive hover:bg-destructive/10",
											onClick: () => handleDeleteTeam(t),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "sm",
										className: "h-8 text-xs font-semibold",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/account/teams/$id",
											params: { id: t.id },
											children: ["Manage Roster & Requests", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 size-3.5" })]
										})
									})]
								})]
							}, t.id))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pb-3 border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-base font-bold flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-4 text-primary" }),
									"Squads You Joined as Member (",
									myJoinedSquads.length,
									")"
								]
							})
						}), myJoinedSquads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-dashed border-border p-6 text-center mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold",
									children: "You haven't joined any other squads yet."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: "Discover open teams in the Discover tab and submit join requests."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => setActiveTab("discover"),
									className: "mt-3",
									children: "Explore Recruiting Squads"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 md:grid-cols-2 mt-4",
							children: myJoinedSquads.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-base font-bold",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3 text-primary" }), t.eventTitle || "General Campus Squad"]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-md bg-surface px-2.5 py-1 text-xs font-semibold border border-border/60",
										children: [
											t.members.length,
											"/",
											t.maxMembers || 4,
											" members"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: ["Led by ", t.leader]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 border-t border-border pt-3.5 flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										className: "h-8 text-xs text-destructive hover:bg-destructive/10",
										onClick: () => handleLeaveTeam(t),
										children: "Leave Squad"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "sm",
										variant: "outline",
										className: "h-8 text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/account/teams/$id",
											params: { id: t.id },
											children: "View Squad & Teammates"
										})
									})]
								})]
							}, t.id))
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "requests",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-border pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-bold",
									children: "Your Outbound Join Requests"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Track status of squads you requested to join. Team leaders review your profile and application note."
								})]
							}), myPendingRequests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "py-12 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mx-auto size-8 text-muted-foreground/60" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm font-semibold",
										children: "No active join requests"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground mt-1",
										children: "When you request to join recruiting squads, they will appear here."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										onClick: () => setActiveTab("discover"),
										className: "mt-3",
										children: "Discover Teams"
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "divide-y divide-border mt-2",
								children: myPendingRequests.map((req) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "font-bold text-sm text-foreground",
													children: req.team?.name || "Squad"
												}), req.status === "ACCEPTED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), "Accepted"]
												}) : req.status === "REJECTED" || req.status === "DECLINED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-semibold text-destructive",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3.5" }), "Declined"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }), "Pending Review"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground mt-0.5",
												children: [
													req.team?.event?.title || "Campus Project",
													" · Applied as",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-foreground",
														children: req.preferredRole || req.role || "Teammate"
													}),
													" ",
													"· ",
													relativeTime(req.requestedAt || req.createdAt)
												]
											}),
											req.message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-2 text-xs italic text-muted-foreground/90 rounded-md bg-surface p-2 border border-border/40",
												children: [
													"\"",
													req.message,
													"\""
												]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 shrink-0",
										children: [req.team?.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "sm",
											variant: "outline",
											className: "h-8 text-xs",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/account/teams/$id",
												params: { id: req.team.id },
												children: "View Squad"
											})
										}), req.status === "PENDING" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											className: "h-8 text-xs text-muted-foreground hover:text-destructive",
											onClick: () => handleWithdrawRequest(req.id),
											children: "Withdraw"
										})]
									})]
								}, req.id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "candidates",
						className: "mt-6 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 sm:flex-row sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative min-w-0 flex-1 sm:max-w-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: candidateSearch,
									onChange: (e) => setCandidateSearch(e.target.value),
									placeholder: "Search students by name, bio, or skills",
									className: "pl-9"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: candidateSkill,
									onChange: (e) => setCandidateSkill(e.target.value),
									placeholder: "Filter by skill (e.g. Python, Figma)",
									className: "w-48 text-xs"
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: candidatesQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, { count: 4 }) : candidatesQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => candidatesQuery.refetch() }) : (candidatesQuery.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-6" }),
							title: "No student profiles match",
							description: "Try broadening your search term or skill filter."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
							children: (candidatesQuery.data ?? []).map((cand) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "card-interactive flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [cand.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: cand.avatarUrl,
											alt: cand.name,
											className: "size-12 rounded-full border border-border object-cover shrink-0"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
											initials: cand.name?.slice(0, 2).toUpperCase() || "ST",
											className: "size-12 shrink-0"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5 truncate",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "truncate text-sm font-bold",
														children: cand.name
													}), cand.universityEmailVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-emerald-500 shrink-0" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "truncate text-xs text-muted-foreground",
													children: cand.universityName
												}),
												cand.faculty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "truncate text-[11px] text-muted-foreground/80",
													children: [
														cand.faculty,
														" ",
														cand.academicYear ? `· ${cand.academicYear}` : ""
													]
												})
											]
										})]
									}),
									cand.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 line-clamp-2 text-xs text-muted-foreground leading-relaxed",
										children: cand.bio
									}),
									cand.skills && cand.skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap gap-1",
										children: [cand.skills.slice(0, 4).map((sk) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-md bg-surface px-2 py-0.5 text-[10px] font-medium text-foreground border border-border/50",
											children: sk
										}, sk)), cand.skills.length > 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-md bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground",
											children: ["+", cand.skills.length - 4]
										})]
									}),
									cand.compatibilityTag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), cand.compatibilityTag]
										})
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 border-t border-border pt-3 flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										className: "h-8 text-xs",
										onClick: () => setInspectedProfile(cand),
										children: "View Profile"
									}), myCreatedSquads.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										className: "h-8 text-xs font-semibold",
										onClick: () => openInviteDialog(cand),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-1 size-3" }), "Invite to Squad"]
									})]
								})]
							}, cand.id))
						}) })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(targetTeam),
				onOpenChange: (o) => !o && setTargetTeam(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Request to join ", targetTeam?.name] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
							"State which role you want to fill and introduce yourself to ",
							targetTeam?.leader,
							"."
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "join-role",
									className: "text-xs font-bold uppercase tracking-wider",
									children: "Role You'd Fill"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "join-role",
									value: joinRole,
									onChange: (e) => setJoinRole(e.target.value),
									placeholder: targetTeam?.requiredRoles[0] ?? "e.g. Frontend Developer, Designer"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "join-message",
									className: "text-xs font-bold uppercase tracking-wider",
									children: "Application Message / Pitch"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "join-message",
									rows: 4,
									value: joinMessage,
									onChange: (e) => setJoinMessage(e.target.value),
									placeholder: "Share your experience, skills, and why you are excited to team up with this squad."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setTargetTeam(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleJoinSubmit,
							disabled: isSubmittingJoin,
							className: "bg-primary font-semibold",
							children: isSubmittingJoin ? "Sending…" : "Submit Application"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(editingTeam),
				onOpenChange: (o) => !o && setEditingTeam(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Edit Squad Settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
							"Configure recruitment status and capacity for ",
							editingTeam?.name,
							"."
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "edit-name",
										className: "text-xs font-bold uppercase tracking-wider",
										children: "Squad Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "edit-name",
										value: editName,
										onChange: (e) => setEditName(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "edit-desc",
										className: "text-xs font-bold uppercase tracking-wider",
										children: "Objective / Description"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "edit-desc",
										rows: 3,
										value: editDescription,
										onChange: (e) => setEditDescription(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "edit-cap",
										className: "text-xs font-bold uppercase tracking-wider",
										children: "Max Members Capacity"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "edit-cap",
										type: "number",
										min: editingTeam?.members.length || 2,
										max: 12,
										value: editMaxMembers,
										onChange: (e) => setEditMaxMembers(Number(e.target.value))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-lg border border-border p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: "Recruiting Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Allow other students to discover and apply to this team."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: editIsOpen,
										onCheckedChange: setEditIsOpen
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setEditingTeam(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleSaveEditTeam,
							disabled: isUpdatingTeam,
							className: "bg-primary font-semibold",
							children: isUpdatingTeam ? "Saving…" : "Save Changes"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(inviteTargetStudent),
				onOpenChange: (o) => !o && setInviteTargetStudent(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: [
							"Invite ",
							inviteTargetStudent?.name,
							" to Squad"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Send an invitation to join one of the squads you lead." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "invite-squad",
										className: "text-xs font-bold uppercase tracking-wider",
										children: "Select Squad You Lead"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: "invite-squad",
										value: selectedInviteTeamId,
										onChange: (e) => setSelectedInviteTeamId(e.target.value),
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
										children: myCreatedSquads.map((sq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: sq.id,
											children: [
												sq.name,
												" (",
												sq.members.length,
												"/",
												sq.maxMembers || 4,
												" members)"
											]
										}, sq.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "invite-role",
										className: "text-xs font-bold uppercase tracking-wider",
										children: "Proposed Role"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "invite-role",
										value: inviteRole,
										onChange: (e) => setInviteRole(e.target.value),
										placeholder: "e.g. Lead Backend Engineer, Designer"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "invite-note",
										className: "text-xs font-bold uppercase tracking-wider",
										children: "Personal Invitation Note"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "invite-note",
										rows: 3,
										value: inviteMessage,
										onChange: (e) => setInviteMessage(e.target.value),
										placeholder: "Hi! We saw your profile and skills and would love to have you on our squad."
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setInviteTargetStudent(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleSendInvite,
							disabled: isSendingInvite,
							className: "bg-primary font-semibold",
							children: isSendingInvite ? "Sending…" : "Send Squad Invitation"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserProfileModal, {
				profile: inspectedProfile,
				open: Boolean(inspectedProfile),
				onOpenChange: (o) => !o && setInspectedProfile(null)
			})
		]
	});
}
//#endregion
export { TeamsHubPage as component };
