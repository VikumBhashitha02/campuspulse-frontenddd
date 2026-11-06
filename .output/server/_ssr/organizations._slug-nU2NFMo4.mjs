import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { $ as LoaderCircle, C as ShieldCheck, Ft as Crown, Kt as CircleCheck, Z as LogOut, d as TriangleAlert, en as Check, f as Trash2, o as UserPlus, r as Users, un as Building2, y as Sparkles, z as Pencil } from "../_libs/lucide-react.mjs";
import { t as eventsApi } from "./events-Dtjwkx07.mjs";
import { i as GridSkeleton, n as EmptyState } from "./States-DTPgRZKE.mjs";
import { l as VerificationBadge, o as OrgAvatar } from "./Badges-Bz6vmcNI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as OpportunityGrid } from "./OpportunityCard-BUJW0Bsd.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CeXuDfGc.mjs";
import { t as directoryApi } from "./directory-BaY2c_G3.mjs";
import { t as Route } from "./organizations._slug-1Pf8pINv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/organizations._slug-nU2NFMo4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrganizationDetailPage() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const { organization } = Route.useLoaderData();
	const [submittingAction, setSubmittingAction] = (0, import_react.useState)(false);
	const [removeConfirmMember, setRemoveConfirmMember] = (0, import_react.useState)(null);
	const [removeBusy, setRemoveBusy] = (0, import_react.useState)(false);
	const [permissionConfirmMember, setPermissionConfirmMember] = (0, import_react.useState)(null);
	const [permissionBusy, setPermissionBusy] = (0, import_react.useState)(false);
	const eventsQuery = useQuery({
		queryKey: [
			"events",
			"organization",
			organization.id
		],
		queryFn: () => eventsApi.list({ organization: organization.id })
	});
	const membersQuery = useQuery({
		queryKey: [
			"organization",
			organization.id,
			"members"
		],
		queryFn: () => directoryApi.organizationMembers(organization.id)
	});
	const myOrgsQuery = useQuery({
		queryKey: ["myOrganizations"],
		queryFn: () => directoryApi.myOrganizations(),
		enabled: Boolean(user)
	});
	const isMember = (0, import_react.useMemo)(() => {
		if (!myOrgsQuery.data) return false;
		return myOrgsQuery.data.some((m) => m.organizationId === organization.id && m.status === "ACTIVE");
	}, [myOrgsQuery.data, organization.id]);
	const membersList = membersQuery.data?.activeMembers || membersQuery.data?.members || (Array.isArray(membersQuery.data) && membersQuery.data.length > 0 ? membersQuery.data : organization.leadership || []);
	const isSocietyLeader = (0, import_react.useMemo)(() => {
		if (!user) return false;
		if (membersQuery.data?.isAuthorizedLeader) return true;
		const currentMember = membersList.find((m) => (m.userId === user.id || m.user?.id === user.id) && m.status === "ACTIVE");
		if (currentMember) return [
			"ADMIN",
			"LEADER",
			"PRESIDENT"
		].includes(currentMember.role);
		return false;
	}, [
		user,
		membersQuery.data,
		membersList
	]);
	const officialRolesList = (0, import_react.useMemo)(() => {
		return membersList.filter((m) => {
			const role = m.role || "MEMBER";
			return [
				"ADMIN",
				"LEADER",
				"PRESIDENT",
				"VICE_PRESIDENT",
				"TREASURER",
				"SECRETARY",
				"MANAGER"
			].includes(role) || m.isFounder;
		});
	}, [membersList]);
	const activeRosterList = (0, import_react.useMemo)(() => {
		return membersList.filter((m) => {
			const role = m.role || "MEMBER";
			return ![
				"ADMIN",
				"LEADER",
				"PRESIDENT",
				"VICE_PRESIDENT",
				"TREASURER",
				"SECRETARY",
				"MANAGER"
			].includes(role) && !m.isFounder;
		});
	}, [membersList]);
	const handleJoinDirectly = async () => {
		if (!user) {
			toast.error("Please log in to join student societies");
			return;
		}
		setSubmittingAction(true);
		try {
			await directoryApi.joinOrganization(organization.id);
			toast.success(`Joined ${organization.name}! 🎉`, { description: "You are now an active member of this society." });
			myOrgsQuery.refetch();
			membersQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to join society.");
		} finally {
			setSubmittingAction(false);
		}
	};
	const handleLeave = async () => {
		if (!confirm(`Are you sure you want to leave ${organization.name}?`)) return;
		setSubmittingAction(true);
		try {
			await directoryApi.leaveOrganization(organization.id);
			toast.success(`Left ${organization.name}`);
			myOrgsQuery.refetch();
			membersQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to leave society.");
		} finally {
			setSubmittingAction(false);
		}
	};
	const handleConfirmRemove = async () => {
		if (!removeConfirmMember) return;
		const memberName = removeConfirmMember.user?.name || removeConfirmMember.name || "Member";
		setRemoveBusy(true);
		try {
			await directoryApi.removeMember(organization.id, removeConfirmMember.id);
			toast.success(`Removed ${memberName} from ${organization.name}`);
			setRemoveConfirmMember(null);
			membersQuery.refetch();
			myOrgsQuery.refetch();
			queryClient.invalidateQueries({ queryKey: ["organization", organization.id] });
		} catch (err) {
			toast.error(err?.message || "Failed to remove member.");
		} finally {
			setRemoveBusy(false);
		}
	};
	const handleConfirmTogglePermission = async () => {
		if (!permissionConfirmMember) return;
		const nextPermission = !Boolean(permissionConfirmMember.canCreateEvents);
		const memberName = permissionConfirmMember.user?.name || permissionConfirmMember.name || "Member";
		setPermissionBusy(true);
		try {
			await directoryApi.updateMember(organization.id, permissionConfirmMember.id, { canCreateEvents: nextPermission });
			toast.success(nextPermission ? `Granted event-creation permission to ${memberName}` : `Revoked event-creation permission for ${memberName}`);
			setPermissionConfirmMember(null);
			membersQuery.refetch();
			myOrgsQuery.refetch();
			queryClient.invalidateQueries({ queryKey: ["organization", organization.id] });
		} catch (err) {
			toast.error(err?.message || "Failed to update event-creation permission.");
		} finally {
			setPermissionBusy(false);
		}
	};
	const allEvents = eventsQuery.data ?? [];
	const now = /* @__PURE__ */ new Date();
	const upcomingEvents = allEvents.filter((e) => new Date(e.startDate) >= now);
	const pastEvents = allEvents.filter((e) => new Date(e.startDate) < now);
	const isPending = organization.status === "PENDING";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
								initials: organization.initials,
								className: "size-16 text-lg"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "truncate text-2xl font-black tracking-tight",
											children: organization.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationBadge, { verified: organization.verified }),
										isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20",
											children: "⏳ Awaiting Platform Approval"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm text-muted-foreground",
									children: organization.universityName
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground italic",
								children: "Society is pending platform approval"
							}) : isMember ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " Joined"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "text-xs text-muted-foreground hover:text-destructive hover:border-destructive/30",
									disabled: submittingAction,
									onClick: handleLeave,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5 mr-1" }), " Leave Society"]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "gap-1.5 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground",
								disabled: submittingAction,
								onClick: handleJoinDirectly,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), submittingAction ? "Joining…" : "Join Society"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground",
						children: organization.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
										className: "size-4",
										"aria-hidden": true
									}),
									organization.memberCount,
									" members"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
									className: "size-4",
									"aria-hidden": true
								}), organization.universityName]
							}),
							organization.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5 text-primary font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									className: "size-4",
									"aria-hidden": true
								}), "Verified Society"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-extrabold tracking-tight",
								children: "Society Committee & Members"
							}), isSocietyLeader ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary border border-primary/20",
								children: "Leader View"
							}) : isMember ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border",
								children: "Member View"
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: [
								"Official roles and active member roster within ",
								organization.name,
								"."
							]
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-3.5 text-primary" }),
								"Official Roles / Committee Members (",
								officialRolesList.length,
								")"
							]
						}), officialRolesList.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl border border-dashed border-border bg-card/50 p-6 text-center text-xs text-muted-foreground",
							children: "No official committee roles registered yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
							children: officialRolesList.map((m) => {
								const memberName = m.user?.name || m.name || "Member";
								const memberRole = m.role || "LEADER";
								const memberTitle = m.title;
								const isLeader = [
									"ADMIN",
									"LEADER",
									"PRESIDENT"
								].includes(memberRole);
								const initials = memberName.split(" ").map((p) => p[0]).join("").slice(0, 2);
								const isSelf = m.userId === user?.id || m.user?.id === user?.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, { initials }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "truncate text-sm font-semibold text-foreground flex items-center gap-1",
												children: [
													memberName,
													m.user?.universityEmailVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														title: "Verified University Student",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-emerald-500 shrink-0" })
													}),
													isSelf && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground font-semibold bg-surface px-1.5 py-0.5 rounded shrink-0",
														children: "(You)"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1 flex flex-wrap items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: cn("text-[10px] font-bold rounded px-1.5 py-0.5 flex items-center gap-1", isLeader ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20" : "bg-primary/10 text-primary border border-primary/20"),
														children: [isLeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-2.5" }), memberRole.replace(/_/g, " ")]
													}),
													m.isFounder && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[10px] font-bold rounded px-1.5 py-0.5 bg-primary/10 text-primary border border-primary/20 flex items-center gap-0.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-2.5" }), " Founder"]
													}),
													memberTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs text-muted-foreground truncate",
														children: ["· ", memberTitle]
													})
												]
											})]
										})]
									})
								}, m.id);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5 text-primary" }),
								"Active Member Roster (",
								activeRosterList.length,
								")"
							]
						}), activeRosterList.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl border border-dashed border-border bg-card/50 p-6 text-center text-xs text-muted-foreground",
							children: "No regular members in this society roster yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
							children: activeRosterList.map((m) => {
								const memberName = m.user?.name || m.name || "Member";
								const memberRole = m.role || "MEMBER";
								const memberTitle = m.title;
								const canCreateEvents = Boolean(m.canCreateEvents);
								const initials = memberName.split(" ").map((p) => p[0]).join("").slice(0, 2);
								const isSelf = m.userId === user?.id || m.user?.id === user?.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, { initials }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "truncate text-sm font-semibold text-foreground flex items-center gap-1",
												children: [
													memberName,
													m.user?.universityEmailVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														title: "Verified University Student",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-emerald-500 shrink-0" })
													}),
													isSelf && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground font-semibold bg-surface px-1.5 py-0.5 rounded shrink-0",
														children: "(You)"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1 flex flex-wrap items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-bold rounded px-1.5 py-0.5 bg-surface text-muted-foreground border border-border/40",
														children: memberRole.replace(/_/g, " ")
													}),
													canCreateEvents && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														title: "Authorized to create and publish events for this society",
														className: "text-[10px] font-bold rounded px-1.5 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-2.5" }), " Can create events"]
													}),
													memberTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs text-muted-foreground truncate",
														children: ["· ", memberTitle]
													})
												]
											})]
										})]
									}), isSocietyLeader && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 shrink-0 ml-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											className: cn("h-8 w-8 p-0 rounded-lg transition-colors", canCreateEvents ? "text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20" : "text-muted-foreground hover:text-primary hover:bg-primary/10"),
											onClick: () => setPermissionConfirmMember(m),
											title: canCreateEvents ? "Revoke event-creation permission" : "Grant event-creation permission",
											"aria-label": canCreateEvents ? `Revoke event-creation permission for ${memberName}` : `Grant event-creation permission to ${memberName}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
										}), !isSelf && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											className: "h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10",
											onClick: () => setRemoveConfirmMember(m),
											title: "Remove member",
											"aria-label": `Remove ${memberName} from society`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
										})]
									})]
								}, m.id);
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(removeConfirmMember),
				onOpenChange: (open) => !open && setRemoveConfirmMember(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Remove Member" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							className: "text-sm pt-2",
							children: [
								"Are you sure you want to remove",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: removeConfirmMember?.user?.name || removeConfirmMember?.name || "this member" }),
								" ",
								"from ",
								organization.name,
								"?"
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"This will revoke their membership and any committee permissions for",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: organization.name }),
								". Their CampusPulse student account will remain active."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "mt-4 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setRemoveConfirmMember(null),
								disabled: removeBusy,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "destructive",
								onClick: handleConfirmRemove,
								disabled: removeBusy,
								children: removeBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-1" }), " Removing…"] }) : "Remove Member"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(permissionConfirmMember),
				onOpenChange: (open) => !open && setPermissionConfirmMember(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: permissionConfirmMember?.canCreateEvents ? "Revoke Event-Creation Permission" : "Grant Event-Creation Permission" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-sm pt-2",
							children: permissionConfirmMember?.canCreateEvents ? `Are you sure you want to revoke event-creation permission for ${permissionConfirmMember?.user?.name || permissionConfirmMember?.name || "this member"}? They will no longer be able to create events for ${organization.name}.` : `This action will grant ${permissionConfirmMember?.user?.name || permissionConfirmMember?.name || "this member"} permission to create and draft events on behalf of ${organization.name}.`
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-surface/50 p-3 text-xs text-muted-foreground space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-foreground",
									children: "Permission Scope Details:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"• Specific to ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: organization.name }),
									" only."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Does not change their membership role or grant administrative permissions." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Does not grant permissions in any other club or society." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "mt-4 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setPermissionConfirmMember(null),
								disabled: permissionBusy,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: permissionConfirmMember?.canCreateEvents ? "destructive" : "default",
								onClick: handleConfirmTogglePermission,
								disabled: permissionBusy,
								children: permissionBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-1" }), " Updating…"] }) : permissionConfirmMember?.canCreateEvents ? "Revoke Permission" : "Grant Permission"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-extrabold tracking-tight",
					children: "Upcoming Opportunities"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: eventsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, { count: 3 }) : upcomingEvents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						title: "No upcoming events",
						description: "Check back soon for upcoming hackathons and workshops."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityGrid, { events: upcomingEvents })
				})]
			}),
			pastEvents.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-extrabold tracking-tight text-muted-foreground",
					children: "Past Opportunities"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityGrid, { events: pastEvents })
				})]
			})
		]
	});
}
//#endregion
export { OrganizationDetailPage as component };
