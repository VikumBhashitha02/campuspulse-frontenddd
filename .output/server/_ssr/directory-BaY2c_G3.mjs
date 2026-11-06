import { n as apiSend, t as apiGet } from "./client-DCT7i2UG.mjs";
import { a as adaptPlatformUser, i as adaptOrganizationMember, l as adaptUniversity, o as adaptReport, r as adaptOrganization, u as adaptVerification } from "./mock-data-D4y6vzZ1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/directory-BaY2c_G3.js
var directoryApi = {
	async universities(q, options) {
		try {
			const params = new URLSearchParams();
			if (q) params.set("search", q);
			params.set("limit", String(options?.limit ?? 100));
			if (options?.page) params.set("page", String(options.page));
			if (options?.city) params.set("city", options.city);
			if (options?.isVerified !== void 0) params.set("isVerified", String(options.isVerified));
			const res = await apiGet(`/universities?${params.toString()}`);
			return (Array.isArray(res) ? res : res?.items || []).map((u) => adaptUniversity(u));
		} catch (err) {
			console.error("Failed to load universities:", err);
			throw err;
		}
	},
	async university(slug) {
		try {
			const raw = await apiGet(`/universities/slug/${encodeURIComponent(slug)}`);
			if (!raw) return null;
			return adaptUniversity(raw);
		} catch (err) {
			if (err?.status === 404) return null;
			try {
				const rawById = await apiGet(`/universities/${encodeURIComponent(slug)}`);
				return adaptUniversity(rawById);
			} catch {
				return null;
			}
		}
	},
	async organizations(universityId) {
		try {
			const query = universityId ? `?universityId=${encodeURIComponent(universityId)}` : "";
			const res = await apiGet(`/organizations${query}`);
			return (Array.isArray(res) ? res : res?.items || []).map((o) => adaptOrganization(o));
		} catch (err) {
			console.error("Failed to load organizations:", err);
			throw err;
		}
	},
	async organization(slug) {
		try {
			const raw = await apiGet(`/organizations/slug/${encodeURIComponent(slug)}`);
			if (!raw) return null;
			return adaptOrganization(raw);
		} catch (err) {
			if (err?.status === 404) try {
				const rawById = await apiGet(`/organizations/${encodeURIComponent(slug)}`);
				return adaptOrganization(rawById);
			} catch {
				return null;
			}
			console.error(`Failed to load organization ${slug}:`, err);
			throw err;
		}
	},
	async myOrganizations() {
		try {
			return (await apiGet("/organizations/my") || []).map((m) => ({
				id: m.id,
				organizationId: m.organizationId,
				organizationName: m.organizationName,
				organizationSlug: m.organizationSlug,
				role: m.role,
				status: m.status ?? "ACTIVE",
				title: m.title ?? null,
				logoUrl: m.logoUrl ?? null,
				isVerified: m.isVerified ?? false,
				universityId: m.universityId ?? void 0,
				universityName: m.universityName ?? void 0,
				verifiedAt: m.verifiedAt ?? null,
				canCreateEvents: m.canCreateEvents ?? false,
				canManageOrg: m.canManageOrg ?? false,
				organizationStatus: m.organizationStatus ?? m.organization?.status ?? void 0
			}));
		} catch (err) {
			console.error("Failed to load user organizations:", err);
			return [];
		}
	},
	async myManagedOrganizations() {
		try {
			return (await apiGet("/organizations/my/managed") || []).map((m) => ({
				id: m.id,
				organizationId: m.organizationId,
				organizationName: m.organizationName,
				organizationSlug: m.organizationSlug,
				role: m.role,
				status: m.status ?? "ACTIVE",
				title: m.title ?? null,
				logoUrl: m.logoUrl ?? null,
				isVerified: m.isVerified ?? false,
				universityId: m.universityId ?? void 0,
				universityName: m.universityName ?? void 0,
				verifiedAt: m.verifiedAt ?? null,
				canCreateEvents: true,
				canManageOrg: m.canManageOrg ?? false,
				organizationStatus: m.organizationStatus ?? m.organization?.status ?? void 0
			}));
		} catch (err) {
			console.error("Failed to load managed organizations:", err);
			return [];
		}
	},
	async checkDuplicate(universityId, name) {
		try {
			const uniParam = universityId ? `&universityId=${encodeURIComponent(universityId)}` : "";
			return await apiGet(`/organizations/check-duplicate?name=${encodeURIComponent(name)}${uniParam}`);
		} catch (err) {
			console.error("Duplicate check failed:", err);
			return { exists: false };
		}
	},
	async createOrganization(data) {
		return apiSend("POST", "/organizations", data);
	},
	async organizationMembers(organizationId) {
		try {
			const res = await apiGet(`/organizations/${encodeURIComponent(organizationId)}/members`);
			if (res && typeof res === "object") {
				const rawActive = Array.isArray(res.activeMembers) ? res.activeMembers : Array.isArray(res.members) ? res.members : [];
				const rawAll = Array.isArray(res.members) ? res.members : rawActive;
				const rawPending = Array.isArray(res.pendingMembers) ? res.pendingMembers : [];
				return {
					...res,
					activeMembers: rawActive.map(adaptOrganizationMember),
					members: rawAll.map(adaptOrganizationMember),
					pendingMembers: rawPending.map(adaptOrganizationMember)
				};
			}
			return res;
		} catch (err) {
			console.error("Failed to load organization members:", err);
			return {
				members: [],
				activeMembers: [],
				pendingMembers: [],
				pendingLeadershipRequests: [],
				conflicts: []
			};
		}
	},
	async joinOrganization(organizationId, data) {
		return apiSend("POST", `/organizations/${encodeURIComponent(organizationId)}/join`, data || {});
	},
	async reviewMemberRequest(organizationId, memberId, data) {
		return apiSend("POST", `/organizations/${encodeURIComponent(organizationId)}/members/${encodeURIComponent(memberId)}/review`, data);
	},
	async reviewOrganization(organizationId, data) {
		return apiSend("POST", `/admin/organizations/${encodeURIComponent(organizationId)}/review`, data);
	},
	async pendingOrganizations() {
		try {
			const res = await apiGet("/admin/organizations?status=PENDING");
			return Array.isArray(res) ? res : res?.items || [];
		} catch (e) {
			console.error("Failed to load pending organizations:", e);
			return [];
		}
	},
	async allAdminOrganizations(query) {
		try {
			const params = new URLSearchParams();
			if (query?.status) params.append("status", query.status);
			if (query?.search) params.append("search", query.search);
			if (query?.universityId) params.append("universityId", query.universityId);
			const qs = params.toString() ? `?${params.toString()}` : "";
			const res = await apiGet(`/admin/organizations${qs}`);
			return Array.isArray(res) ? res : res?.items || [];
		} catch (err) {
			console.error("Failed to load admin organizations:", err);
			return [];
		}
	},
	async adminStats() {
		try {
			return await apiGet("/admin/stats");
		} catch (err) {
			console.error("Failed to load admin stats:", err);
			return null;
		}
	},
	async adminCategories() {
		try {
			const res = await apiGet("/admin/categories");
			return Array.isArray(res) ? res : res?.items || [];
		} catch (err) {
			console.error("Failed to load admin categories:", err);
			return [];
		}
	},
	async createCategory(data) {
		return apiSend("POST", "/admin/categories", data);
	},
	async updateCategory(id, data) {
		return apiSend("PATCH", `/admin/categories/${encodeURIComponent(id)}`, data);
	},
	async leaveOrganization(organizationId) {
		return apiSend("POST", `/organizations/${encodeURIComponent(organizationId)}/leave`, {});
	},
	async updateMember(organizationId, memberId, data) {
		return apiSend("PATCH", `/organizations/${encodeURIComponent(organizationId)}/members/${encodeURIComponent(memberId)}`, data);
	},
	async removeMember(organizationId, memberId) {
		return apiSend("DELETE", `/organizations/${encodeURIComponent(organizationId)}/members/${encodeURIComponent(memberId)}`);
	},
	async updateMemberRole(organizationId, memberId, role, title) {
		return apiSend("PATCH", `/organizations/${encodeURIComponent(organizationId)}/members/${encodeURIComponent(memberId)}`, {
			role,
			title
		});
	},
	async updateMemberStatus(organizationId, memberId, status) {
		return apiSend("PATCH", `/organizations/${encodeURIComponent(organizationId)}/members/${encodeURIComponent(memberId)}`, { status });
	},
	async users() {
		try {
			const res = await apiGet("/admin/users");
			return (Array.isArray(res) ? res : res?.items || []).map((u) => adaptPlatformUser(u));
		} catch (err) {
			console.error("Failed to load admin users:", err);
			throw err;
		}
	},
	async reports() {
		try {
			return (await apiGet("/admin/reports") || []).map((r) => adaptReport(r));
		} catch (err) {
			console.error("Failed to load admin reports:", err);
			throw err;
		}
	},
	async verifications() {
		try {
			return (await apiGet("/admin/organizations/verifications") || []).map((v) => adaptVerification(v));
		} catch (err) {
			console.error("Failed to load admin verifications:", err);
			throw err;
		}
	},
	async respondVerification(id, status, reviewNotes) {
		return apiSend("POST", `/admin/organizations/verifications/${encodeURIComponent(id)}/respond`, {
			status,
			reviewNotes
		});
	},
	async resolveReport(id, status, actionNotes) {
		return apiSend("PATCH", `/admin/reports/${encodeURIComponent(id)}/resolve`, {
			status,
			actionNotes
		});
	},
	async updateUserStatus(id, isActive) {
		return apiSend("PATCH", `/admin/users/${encodeURIComponent(id)}/status`, { isActive });
	},
	async fileReport(data) {
		return apiSend("POST", "/reports", data);
	},
	async requestVerification(data) {
		return apiSend("POST", "/verification/request", data);
	},
	async updateOrganizationPaymentInstructions(orgId, data) {
		return apiSend("PATCH", `/organizations/${encodeURIComponent(orgId)}/payment-instructions`, data);
	}
};
//#endregion
export { directoryApi as t };
