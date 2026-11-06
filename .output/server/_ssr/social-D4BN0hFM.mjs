import { n as apiSend, t as apiGet } from "./client-DCT7i2UG.mjs";
import { c as adaptTeam, n as adaptNotification, s as adaptStudentProfile } from "./mock-data-D4y6vzZ1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/social-D4BN0hFM.js
var socialApi = {
	async teams(params) {
		try {
			const q = new URLSearchParams();
			if (params?.eventId) q.set("eventId", params.eventId);
			if (params?.skill) q.set("skill", params.skill);
			if (params?.role) q.set("role", params.role);
			if (params?.isOpen !== void 0) q.set("isOpen", String(params.isOpen));
			const queryStr = q.toString() ? `?${q.toString()}` : "";
			return (await apiGet(`/teams${queryStr}`) || []).map((t) => adaptTeam(t));
		} catch (err) {
			console.error("Failed to load teams:", err);
			throw err;
		}
	},
	async myTeams() {
		try {
			const res = await apiGet("/teams/my");
			return {
				joinedTeams: (res?.joinedTeams || []).map((t) => adaptTeam(t)),
				createdTeams: (res?.createdTeams || []).map((t) => adaptTeam(t)),
				pendingRequests: res?.pendingRequests || []
			};
		} catch (err) {
			console.error("Failed to load my teams:", err);
			throw err;
		}
	},
	async team(id) {
		try {
			const raw = await apiGet(`/teams/${encodeURIComponent(id)}`);
			if (!raw) return null;
			return adaptTeam(raw);
		} catch (err) {
			if (err?.status === 404) return null;
			console.error(`Failed to load team ${id}:`, err);
			throw err;
		}
	},
	async createTeam(payload) {
		{
			const raw = await apiSend("POST", "/teams", payload);
			return adaptTeam(raw);
		}
	},
	async updateTeam(id, payload) {
		{
			const raw = await apiSend("PATCH", `/teams/${encodeURIComponent(id)}`, payload);
			return adaptTeam(raw);
		}
	},
	async deleteTeam(id) {
		return apiSend("DELETE", `/teams/${encodeURIComponent(id)}`);
	},
	async joinRequests(teamId) {
		try {
			return ((await apiGet(`/teams/${encodeURIComponent(teamId)}`))?.joinRequests || []).map((r) => ({
				id: r.id,
				teamId,
				userId: r.userId,
				applicant: r.user?.name || "Applicant",
				role: r.preferredRole || r.role || "Member",
				message: r.message || "",
				status: r.status === "ACCEPTED" ? "ACCEPTED" : r.status === "REJECTED" ? "DECLINED" : r.status === "CANCELLED" ? "CANCELLED" : "PENDING",
				createdAt: r.requestedAt ? new Date(r.requestedAt).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
				user: r.user
			}));
		} catch {
			return [];
		}
	},
	async requestToJoin(teamId, role, message) {
		return apiSend("POST", `/teams/${encodeURIComponent(teamId)}/join`, {
			preferredRole: role,
			message
		});
	},
	async respondToJoinRequest(requestId, action) {
		return apiSend("PATCH", `/teams/requests/${encodeURIComponent(requestId)}/respond`, { status: action });
	},
	async cancelJoinRequest(requestId) {
		return apiSend("DELETE", `/teams/requests/${encodeURIComponent(requestId)}/cancel`);
	},
	async leaveOrRemoveMember(teamId, memberUserId) {
		return apiSend("DELETE", `/teams/${encodeURIComponent(teamId)}/members/${encodeURIComponent(memberUserId)}`);
	},
	async candidates(params) {
		try {
			const q = new URLSearchParams();
			if (params?.search) q.set("search", params.search);
			if (params?.skill) q.set("skill", params.skill);
			if (params?.universityId) q.set("universityId", params.universityId);
			if (params?.interest) q.set("interest", params.interest);
			const queryStr = q.toString() ? `?${q.toString()}` : "";
			return await apiGet(`/teams/candidates${queryStr}`);
		} catch (err) {
			console.error("Failed to load candidates:", err);
			return [];
		}
	},
	async inviteCandidate(teamId, payload) {
		return apiSend("POST", `/teams/${encodeURIComponent(teamId)}/invite`, payload);
	},
	async notifications() {
		try {
			const res = await apiGet("/notifications");
			return (Array.isArray(res) ? res : res?.items || []).map((n) => adaptNotification(n));
		} catch (err) {
			console.error("Failed to load notifications:", err);
			throw err;
		}
	},
	async markRead(id) {
		return apiSend("PATCH", `/notifications/${encodeURIComponent(id)}/read`);
	},
	async markAllRead() {
		return apiSend("PATCH", "/notifications/read-all");
	},
	async deleteNotification(id) {
		return apiSend("DELETE", `/notifications/${encodeURIComponent(id)}`);
	},
	async unreadNotificationsCount() {
		try {
			return (await apiGet("/notifications/unread-count"))?.unreadCount ?? 0;
		} catch {
			return 0;
		}
	},
	async profile() {
		try {
			const raw = await apiGet("/users/me/profile");
			return adaptStudentProfile(raw);
		} catch (err) {
			console.error("Failed to load student profile:", err);
			throw err;
		}
	},
	async updateProfile(patch) {
		{
			const payload = {};
			if (patch.name !== void 0) {
				payload["name"] = patch.name.trim();
				const parts = patch.name.trim().split(/\s+/);
				payload["firstName"] = parts[0] || "";
				payload["lastName"] = parts.slice(1).join(" ") || "";
			}
			if (patch.bio !== void 0) payload["bio"] = patch.bio.trim() || void 0;
			if (patch.skills !== void 0) payload["skills"] = patch.skills;
			if (patch.interests !== void 0) payload["interests"] = patch.interests;
			if (patch.careerInterests !== void 0) payload["careerInterests"] = patch.careerInterests;
			if (patch.academicYear !== void 0) payload["academicYear"] = patch.academicYear.trim() || void 0;
			if (patch.intakeSemester !== void 0) payload["intakeSemester"] = patch.intakeSemester.trim() || void 0;
			if (patch.studentIdNumber !== void 0) payload["studentIdNumber"] = patch.studentIdNumber.trim() || void 0;
			if (patch.githubUrl !== void 0) payload["githubUrl"] = patch.githubUrl.trim() || void 0;
			if (patch.linkedinUrl !== void 0) payload["linkedinUrl"] = patch.linkedinUrl.trim() || void 0;
			if (patch.websiteUrl !== void 0) payload["websiteUrl"] = patch.websiteUrl.trim() || void 0;
			if (patch.avatarUrl !== void 0) payload["avatarUrl"] = patch.avatarUrl.trim() || void 0;
			if (patch.experiences !== void 0) payload["experiences"] = patch.experiences.map((e) => ({
				title: e.title.trim(),
				organizationName: e.organizationName.trim(),
				startDate: e.startDate,
				endDate: e.endDate || void 0,
				isCurrent: Boolean(e.isCurrent),
				location: e.location?.trim() || void 0,
				description: e.description?.trim() || void 0
			}));
			return apiSend("PATCH", "/users/me/profile", payload);
		}
	},
	async skillsCatalog(search) {
		try {
			const q = search ? `?search=${encodeURIComponent(search)}` : "";
			return await apiGet(`/users/skills/catalog${q}`);
		} catch {
			return [];
		}
	},
	async interestsCatalog(search) {
		try {
			const q = search ? `?search=${encodeURIComponent(search)}` : "";
			return await apiGet(`/users/interests/catalog${q}`);
		} catch {
			return [];
		}
	}
};
//#endregion
export { socialApi as t };
