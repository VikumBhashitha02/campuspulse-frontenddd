import { API_ENABLED, apiGet, apiSend, mock } from "./client";
import {
  adaptOrganization,
  adaptOrganizationMember,
  adaptPlatformUser,
  adaptReport,
  adaptUniversity,
  adaptVerification,
} from "./adapters";
import {
  organizations as mockOrganizations,
  universities as mockUniversities,
  platformUsers,
  reports,
  verifications,
} from "../mock-data";
import type { Organization, OrganizationMembership, PlatformUser, Report, University, Verification } from "../types";

export const directoryApi = {
  async universities(q?: string, options?: { limit?: number; page?: number; city?: string; isVerified?: boolean }): Promise<University[]> {
    if (API_ENABLED) {
      try {
        const params = new URLSearchParams();
        if (q) params.set("search", q);
        params.set("limit", String(options?.limit ?? 100));
        if (options?.page) params.set("page", String(options.page));
        if (options?.city) params.set("city", options.city);
        if (options?.isVerified !== undefined) params.set("isVerified", String(options.isVerified));
        const res = await apiGet<{ items: any[]; meta?: any } | any[]>(`/universities?${params.toString()}`);
        const rawItems = Array.isArray(res) ? res : res?.items || [];
        return rawItems.map((u) => adaptUniversity(u));
      } catch (err) {
        console.error("Failed to load universities:", err);
        throw err;
      }
    }
    const list = q
      ? mockUniversities.filter(
          (u) =>
            u.name.toLowerCase().includes(q.toLowerCase()) ||
            u.location.toLowerCase().includes(q.toLowerCase()),
        )
      : mockUniversities;
    return mock(list.map((u) => adaptUniversity(u)));
  },

  async university(slug: string): Promise<University | null> {
    if (API_ENABLED) {
      try {
        const raw = await apiGet<any>(`/universities/slug/${encodeURIComponent(slug)}`);
        if (!raw) return null;
        return adaptUniversity(raw);
      } catch (err: any) {
        if (err?.status === 404) return null;
        // Fallback: try by ID
        try {
          const rawById = await apiGet<any>(`/universities/${encodeURIComponent(slug)}`);
          return adaptUniversity(rawById);
        } catch {
          return null;
        }
      }
    }
    const found = mockUniversities.find((u) => u.slug === slug || u.id === slug);
    return mock(found ? adaptUniversity(found) : null);
  },

  async organizations(universityId?: string): Promise<Organization[]> {
    if (API_ENABLED) {
      try {
        const query = universityId ? `?universityId=${encodeURIComponent(universityId)}` : "";
        const res = await apiGet<{ items: any[]; meta?: any } | any[]>(`/organizations${query}`);
        const rawItems = Array.isArray(res) ? res : res?.items || [];
        return rawItems.map((o) => adaptOrganization(o));
      } catch (err) {
        console.error("Failed to load organizations:", err);
        throw err;
      }
    }
    return mock(
      (universityId
        ? mockOrganizations.filter((o) => o.universityId === universityId)
        : mockOrganizations
      ).map((o) => adaptOrganization(o)),
    );
  },

  async organization(slug: string): Promise<Organization | null> {
    if (API_ENABLED) {
      try {
        const raw = await apiGet<any>(`/organizations/slug/${encodeURIComponent(slug)}`);
        if (!raw) return null;
        return adaptOrganization(raw);
      } catch (err: any) {
        if (err?.status === 404) {
          // Fallback: try by ID
          try {
            const rawById = await apiGet<any>(`/organizations/${encodeURIComponent(slug)}`);
            return adaptOrganization(rawById);
          } catch {
            return null;
          }
        }
        console.error(`Failed to load organization ${slug}:`, err);
        throw err;
      }
    }
    const found = mockOrganizations.find((o) => o.slug === slug || o.id === slug);
    return mock(found ? adaptOrganization(found) : null);
  },

  async myOrganizations(): Promise<OrganizationMembership[]> {
    if (API_ENABLED) {
      try {
        const list = await apiGet<any[]>("/organizations/my");
        return (list || []).map((m) => ({
          id: m.id,
          organizationId: m.organizationId,
          organizationName: m.organizationName,
          organizationSlug: m.organizationSlug,
          role: m.role,
          status: m.status ?? "ACTIVE",
          title: m.title ?? null,
          logoUrl: m.logoUrl ?? null,
          isVerified: m.isVerified ?? false,
          universityId: m.universityId ?? undefined,
          universityName: m.universityName ?? undefined,
          verifiedAt: m.verifiedAt ?? null,
          canCreateEvents: m.canCreateEvents ?? false,
          canManageOrg: m.canManageOrg ?? false,
          organizationStatus: m.organizationStatus ?? m.organization?.status ?? undefined,
        }));
      } catch (err) {
        console.error("Failed to load user organizations:", err);
        return [];
      }
    }
    return mock([]);
  },

  async myManagedOrganizations(): Promise<OrganizationMembership[]> {
    if (API_ENABLED) {
      try {
        const list = await apiGet<any[]>("/organizations/my/managed");
        return (list || []).map((m) => ({
          id: m.id,
          organizationId: m.organizationId,
          organizationName: m.organizationName,
          organizationSlug: m.organizationSlug,
          role: m.role,
          status: m.status ?? "ACTIVE",
          title: m.title ?? null,
          logoUrl: m.logoUrl ?? null,
          isVerified: m.isVerified ?? false,
          universityId: m.universityId ?? undefined,
          universityName: m.universityName ?? undefined,
          verifiedAt: m.verifiedAt ?? null,
          canCreateEvents: true,
          canManageOrg: m.canManageOrg ?? false,
          organizationStatus: m.organizationStatus ?? m.organization?.status ?? undefined,
        }));
      } catch (err) {
        console.error("Failed to load managed organizations:", err);
        return [];
      }
    }
    return mock([]);
  },

  async checkDuplicate(universityId: string | undefined, name: string): Promise<{ exists: boolean; matchingOrganization?: any }> {
    if (API_ENABLED) {
      try {
        const uniParam = universityId ? `&universityId=${encodeURIComponent(universityId)}` : "";
        return await apiGet<any>(`/organizations/check-duplicate?name=${encodeURIComponent(name)}${uniParam}`);
      } catch (err) {
        console.error("Duplicate check failed:", err);
        return { exists: false };
      }
    }
    return mock({ exists: false });
  },

  async createOrganization(data: {
    name: string;
    slug?: string | undefined;
    universityId?: string | undefined;
    type?: string | undefined;
    description?: string | undefined;
    websiteUrl?: string | undefined;
    instagramUrl?: string | undefined;
    facebookUrl?: string | undefined;
    linkedinUrl?: string | undefined;
    email?: string | undefined;
    logoUrl?: string | undefined;
    requestedRole?: string | undefined;
    additionalNotes?: string | undefined;
  }) {
    if (API_ENABLED) {
      return apiSend("POST", "/organizations", data);
    }
    return mock({ ok: true, name: data.name }, 201);
  },

  async organizationMembers(organizationId: string): Promise<any> {
    if (API_ENABLED) {
      try {
        const res = await apiGet<any>(`/organizations/${encodeURIComponent(organizationId)}/members`);
        if (res && typeof res === "object") {
          const rawActive = Array.isArray(res.activeMembers)
            ? res.activeMembers
            : Array.isArray(res.members)
              ? res.members
              : [];
          const rawAll = Array.isArray(res.members) ? res.members : rawActive;
          const rawPending = Array.isArray(res.pendingMembers) ? res.pendingMembers : [];

          return {
            ...res,
            activeMembers: rawActive.map(adaptOrganizationMember),
            members: rawAll.map(adaptOrganizationMember),
            pendingMembers: rawPending.map(adaptOrganizationMember),
          };
        }
        return res;
      } catch (err) {
        console.error("Failed to load organization members:", err);
        return { members: [], activeMembers: [], pendingMembers: [], pendingLeadershipRequests: [], conflicts: [] };
      }
    }
    return mock({ members: [], activeMembers: [], pendingMembers: [], pendingLeadershipRequests: [], conflicts: [] });
  },

  async joinOrganization(
    organizationId: string,
    data?: { role?: string | undefined; title?: string | undefined; message?: string | undefined; universityId?: string | undefined } | undefined,
  ) {
    if (API_ENABLED) {
      return apiSend("POST", `/organizations/${encodeURIComponent(organizationId)}/join`, data || {});
    }
    return mock({ ok: true }, 200);
  },

  async reviewMemberRequest(
    organizationId: string,
    memberId: string,
    data: { status: "ACTIVE" | "REJECTED"; notes?: string | undefined; role?: string | undefined },
  ) {
    if (API_ENABLED) {
      return apiSend("POST", `/organizations/${encodeURIComponent(organizationId)}/members/${encodeURIComponent(memberId)}/review`, data);
    }
    return mock({ ok: true }, 200);
  },

  async reviewOrganization(
    organizationId: string,
    data: { status: "APPROVED" | "REJECTED"; notes?: string | undefined; isVerified?: boolean | undefined },
  ) {
    if (API_ENABLED) {
      return apiSend("POST", `/admin/organizations/${encodeURIComponent(organizationId)}/review`, data);
    }
    return mock({ ok: true }, 200);
  },

  async pendingOrganizations(): Promise<any[]> {
    if (API_ENABLED) {
      try {
        const res = await apiGet<any>("/admin/organizations?status=PENDING");
        return Array.isArray(res) ? res : res?.items || [];
      } catch (e) {
        console.error("Failed to load pending organizations:", e);
        return [];
      }
    }
    return mock([]);
  },

  async allAdminOrganizations(query?: { status?: string; search?: string; universityId?: string }): Promise<any[]> {
    if (API_ENABLED) {
      try {
        const params = new URLSearchParams();
        if (query?.status) params.append("status", query.status);
        if (query?.search) params.append("search", query.search);
        if (query?.universityId) params.append("universityId", query.universityId);
        const qs = params.toString() ? `?${params.toString()}` : "";
        const res = await apiGet<any>(`/admin/organizations${qs}`);
        return Array.isArray(res) ? res : res?.items || [];
      } catch (err) {
        console.error("Failed to load admin organizations:", err);
        return [];
      }
    }
    return mock([]);
  },

  async adminStats(): Promise<any> {
    if (API_ENABLED) {
      try {
        return await apiGet<any>("/admin/stats");
      } catch (err) {
        console.error("Failed to load admin stats:", err);
        return null;
      }
    }
    return mock({
      overview: { users: 0, universities: 0, organizations: 0, events: 0, registrations: 0, teams: 0 },
      moderationQueue: { pendingEvents: 0, pendingReports: 0, pendingVerifications: 0, pendingOrganizations: 0 },
    });
  },

  async adminCategories(): Promise<any[]> {
    if (API_ENABLED) {
      try {
        const res = await apiGet<any>("/admin/categories");
        return Array.isArray(res) ? res : res?.items || [];
      } catch (err) {
        console.error("Failed to load admin categories:", err);
        return [];
      }
    }
    return mock([]);
  },

  async createCategory(data: {
    name: string;
    slug?: string | undefined;
    type?: string | undefined;
    description?: string | undefined;
    icon?: string | undefined;
  }) {
    if (API_ENABLED) {
      return apiSend("POST", "/admin/categories", data);
    }
    return mock({ ok: true }, 201);
  },

  async updateCategory(
    id: string,
    data: {
      name?: string | undefined;
      description?: string | undefined;
      icon?: string | undefined;
      isActive?: boolean | undefined;
    },
  ) {
    if (API_ENABLED) {
      return apiSend("PATCH", `/admin/categories/${encodeURIComponent(id)}`, data);
    }
    return mock({ ok: true }, 200);
  },

  async leaveOrganization(organizationId: string) {
    if (API_ENABLED) {
      return apiSend("POST", `/organizations/${encodeURIComponent(organizationId)}/leave`, {});
    }
    return mock({ ok: true }, 200);
  },

  async updateMember(
    organizationId: string,
    memberId: string,
    data: {
      role?: string | undefined;
      title?: string | undefined;
      status?: string | undefined;
      canCreateEvents?: boolean | undefined;
    },
  ) {
    if (API_ENABLED) {
      return apiSend("PATCH", `/organizations/${encodeURIComponent(organizationId)}/members/${encodeURIComponent(memberId)}`, data);
    }
    return mock({ ok: true }, 200);
  },

  async removeMember(organizationId: string, memberId: string) {
    if (API_ENABLED) {
      return apiSend("DELETE", `/organizations/${encodeURIComponent(organizationId)}/members/${encodeURIComponent(memberId)}`);
    }
    return mock({ ok: true }, 200);
  },

  async updateMemberRole(organizationId: string, memberId: string, role: string, title?: string) {
    if (API_ENABLED) {
      return apiSend("PATCH", `/organizations/${encodeURIComponent(organizationId)}/members/${encodeURIComponent(memberId)}`, {
        role,
        title,
      });
    }
    return mock({ ok: true }, 200);
  },

  async updateMemberStatus(organizationId: string, memberId: string, status: string) {
    if (API_ENABLED) {
      return apiSend("PATCH", `/organizations/${encodeURIComponent(organizationId)}/members/${encodeURIComponent(memberId)}`, {
        status,
      });
    }
    return mock({ ok: true }, 200);
  },

  async users(): Promise<PlatformUser[]> {
    if (API_ENABLED) {
      try {
        const res = await apiGet<{ items: any[]; meta?: any } | any[]>("/admin/users");
        const rawItems = Array.isArray(res) ? res : res?.items || [];
        return rawItems.map((u) => adaptPlatformUser(u));
      } catch (err) {
        console.error("Failed to load admin users:", err);
        throw err;
      }
    }
    return mock(platformUsers);
  },

  async reports(): Promise<Report[]> {
    if (API_ENABLED) {
      try {
        const list = await apiGet<any[]>("/admin/reports");
        return (list || []).map((r) => adaptReport(r));
      } catch (err) {
        console.error("Failed to load admin reports:", err);
        throw err;
      }
    }
    return mock(reports);
  },

  async verifications(): Promise<Verification[]> {
    if (API_ENABLED) {
      try {
        const list = await apiGet<any[]>("/admin/organizations/verifications");
        return (list || []).map((v) => adaptVerification(v));
      } catch (err) {
        console.error("Failed to load admin verifications:", err);
        throw err;
      }
    }
    return mock(verifications);
  },

  async respondVerification(id: string, status: "APPROVED" | "REJECTED", reviewNotes?: string) {
    if (API_ENABLED) {
      return apiSend("POST", `/admin/organizations/verifications/${encodeURIComponent(id)}/respond`, {
        status,
        reviewNotes,
      });
    }
    return mock({ ok: true }, 200);
  },

  async resolveReport(id: string, status: "RESOLVED" | "DISMISSED", actionNotes?: string) {
    if (API_ENABLED) {
      return apiSend("PATCH", `/admin/reports/${encodeURIComponent(id)}/resolve`, {
        status,
        actionNotes,
      });
    }
    return mock({ ok: true }, 200);
  },

  async updateUserStatus(id: string, isActive: boolean) {
    if (API_ENABLED) {
      return apiSend("PATCH", `/admin/users/${encodeURIComponent(id)}/status`, {
        isActive,
      });
    }
    return mock({ ok: true }, 200);
  },

  async fileReport(data: {
    targetType: "EVENT" | "ORGANIZATION" | "USER" | "TEAM";
    targetId: string;
    reason: string;
    details?: string | undefined;
    evidenceUrl?: string | undefined;
  }) {
    if (API_ENABLED) {
      return apiSend("POST", "/reports", data);
    }
    return mock({ ok: true }, 200);
  },

  async requestVerification(data: {
    organizationId: string;
    documentUrl?: string | undefined;
    notes?: string | undefined;
  }) {
    if (API_ENABLED) {
      return apiSend("POST", "/verification/request", data);
    }
    return mock({ ok: true }, 200);
  },

  async updateOrganizationPaymentInstructions(
    orgId: string,
    data: {
      bankName?: string;
      bankBranch?: string;
      bankAccountName?: string;
      bankAccountNumber?: string;
      paymentInstructions?: string;
    },
  ) {
    if (API_ENABLED) {
      return apiSend("PATCH", `/organizations/${encodeURIComponent(orgId)}/payment-instructions`, data);
    }
    return mock({ success: true, ...data });
  },
};
