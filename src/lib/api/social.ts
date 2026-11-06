import { API_ENABLED, apiGet, apiSend, mock } from "./client";
import { adaptNotification, adaptStudentProfile, adaptTeam } from "./adapters";
import {
  joinRequests,
  notifications as mockNotifications,
  studentProfile,
  teams as mockTeams,
} from "../mock-data";
import type { AppNotification, StudentProfile, Team, TeamJoinRequest } from "../types";

export const socialApi = {
  async teams(params?: {
    eventId?: string | undefined;
    skill?: string | undefined;
    role?: string | undefined;
    isOpen?: boolean | undefined;
  }): Promise<Team[]> {
    if (API_ENABLED) {
      try {
        const q = new URLSearchParams();
        if (params?.eventId) q.set("eventId", params.eventId);
        if (params?.skill) q.set("skill", params.skill);
        if (params?.role) q.set("role", params.role);
        if (params?.isOpen !== undefined) q.set("isOpen", String(params.isOpen));
        const queryStr = q.toString() ? `?${q.toString()}` : "";
        const list = await apiGet<any[]>(`/teams${queryStr}`);
        return (list || []).map((t) => adaptTeam(t));
      } catch (err) {
        console.error("Failed to load teams:", err);
        throw err;
      }
    }
    return mock(mockTeams);
  },

  async myTeams(): Promise<{
    joinedTeams: Team[];
    createdTeams: Team[];
    pendingRequests: any[];
  }> {
    if (API_ENABLED) {
      try {
        const res = await apiGet<{
          joinedTeams: any[];
          createdTeams: any[];
          pendingRequests: any[];
        }>("/teams/my");
        return {
          joinedTeams: (res?.joinedTeams || []).map((t) => adaptTeam(t)),
          createdTeams: (res?.createdTeams || []).map((t) => adaptTeam(t)),
          pendingRequests: res?.pendingRequests || [],
        };
      } catch (err) {
        console.error("Failed to load my teams:", err);
        throw err;
      }
    }
    return mock({
      joinedTeams: mockTeams.slice(0, 2),
      createdTeams: mockTeams.slice(0, 1),
      pendingRequests: [],
    });
  },

  async team(id: string): Promise<Team | null> {
    if (API_ENABLED) {
      try {
        const raw = await apiGet<any>(`/teams/${encodeURIComponent(id)}`);
        if (!raw) return null;
        return adaptTeam(raw);
      } catch (err: any) {
        if (err?.status === 404) return null;
        console.error(`Failed to load team ${id}:`, err);
        throw err;
      }
    }
    return mock(mockTeams.find((t) => t.id === id) ?? null);
  },

  async createTeam(payload: any): Promise<Team> {
    if (API_ENABLED) {
      const raw = await apiSend("POST", "/teams", payload);
      return adaptTeam(raw);
    }
    return mock(mockTeams[0]!);
  },

  async updateTeam(id: string, payload: any): Promise<Team> {
    if (API_ENABLED) {
      const raw = await apiSend("PATCH", `/teams/${encodeURIComponent(id)}`, payload);
      return adaptTeam(raw);
    }
    return mock(mockTeams[0]!);
  },

  async deleteTeam(id: string): Promise<{ success: boolean; message: string }> {
    if (API_ENABLED) {
      return apiSend("DELETE", `/teams/${encodeURIComponent(id)}`);
    }
    return mock({ success: true, message: "Team deleted" });
  },

  async joinRequests(teamId: string): Promise<TeamJoinRequest[]> {
    if (API_ENABLED) {
      try {
        const teamRaw = await apiGet<any>(`/teams/${encodeURIComponent(teamId)}`);
        const rawRequests = teamRaw?.joinRequests || [];
        return rawRequests.map((r: any) => ({
          id: r.id,
          teamId,
          userId: r.userId,
          applicant: r.user?.name || "Applicant",
          role: r.preferredRole || r.role || "Member",
          message: r.message || "",
          status:
            r.status === "ACCEPTED"
              ? "ACCEPTED"
              : r.status === "REJECTED"
                ? "DECLINED"
                : r.status === "CANCELLED"
                  ? "CANCELLED"
                  : "PENDING",
          createdAt: r.requestedAt
            ? new Date(r.requestedAt).toISOString()
            : new Date().toISOString(),
          user: r.user,
        }));
      } catch {
        return [];
      }
    }
    return mock(joinRequests.filter((r) => r.teamId === teamId));
  },

  async requestToJoin(teamId: string, role: string, message: string) {
    if (API_ENABLED) {
      return apiSend("POST", `/teams/${encodeURIComponent(teamId)}/join`, {
        preferredRole: role,
        message,
      });
    }
    return mock({ ok: true }, 400);
  },

  async respondToJoinRequest(requestId: string, action: "ACCEPTED" | "REJECTED") {
    if (API_ENABLED) {
      return apiSend("PATCH", `/teams/requests/${encodeURIComponent(requestId)}/respond`, {
        status: action,
      });
    }
    return mock({ ok: true }, 200);
  },

  async cancelJoinRequest(requestId: string) {
    if (API_ENABLED) {
      return apiSend("DELETE", `/teams/requests/${encodeURIComponent(requestId)}/cancel`);
    }
    return mock({ success: true }, 200);
  },

  async leaveOrRemoveMember(teamId: string, memberUserId: string) {
    if (API_ENABLED) {
      return apiSend(
        "DELETE",
        `/teams/${encodeURIComponent(teamId)}/members/${encodeURIComponent(memberUserId)}`,
      );
    }
    return mock({ success: true }, 200);
  },

  async candidates(params?: {
    search?: string | undefined;
    skill?: string | undefined;
    universityId?: string | undefined;
    interest?: string | undefined;
  }): Promise<any[]> {
    if (API_ENABLED) {
      try {
        const q = new URLSearchParams();
        if (params?.search) q.set("search", params.search);
        if (params?.skill) q.set("skill", params.skill);
        if (params?.universityId) q.set("universityId", params.universityId);
        if (params?.interest) q.set("interest", params.interest);
        const queryStr = q.toString() ? `?${q.toString()}` : "";
        return await apiGet<any[]>(`/teams/candidates${queryStr}`);
      } catch (err) {
        console.error("Failed to load candidates:", err);
        return [];
      }
    }
    return [];
  },

  async inviteCandidate(
    teamId: string,
    payload: { candidateUserId: string; role?: string | undefined; message?: string | undefined },
  ) {
    if (API_ENABLED) {
      return apiSend("POST", `/teams/${encodeURIComponent(teamId)}/invite`, payload);
    }
    return mock({ success: true }, 200);
  },

  async notifications(): Promise<AppNotification[]> {
    if (API_ENABLED) {
      try {
        const res = await apiGet<{ items: any[]; meta?: any } | any[]>("/notifications");
        const rawItems = Array.isArray(res) ? res : res?.items || [];
        return rawItems.map((n) => adaptNotification(n));
      } catch (err) {
        console.error("Failed to load notifications:", err);
        throw err;
      }
    }
    return mock(mockNotifications);
  },

  async markRead(id: string) {
    if (API_ENABLED) {
      return apiSend("PATCH", `/notifications/${encodeURIComponent(id)}/read`);
    }
    return mock({ ok: true }, 200);
  },

  async markAllRead() {
    if (API_ENABLED) {
      return apiSend("PATCH", "/notifications/read-all");
    }
    return mock({ ok: true }, 200);
  },

  async deleteNotification(id: string) {
    if (API_ENABLED) {
      return apiSend("DELETE", `/notifications/${encodeURIComponent(id)}`);
    }
    return mock({ ok: true }, 200);
  },

  async unreadNotificationsCount(): Promise<number> {
    if (API_ENABLED) {
      try {
        const res = await apiGet<{ unreadCount: number }>("/notifications/unread-count");
        return res?.unreadCount ?? 0;
      } catch {
        return 0;
      }
    }
    return mock(0);
  },

  async profile(): Promise<StudentProfile> {
    if (API_ENABLED) {
      try {
        const raw = await apiGet<any>("/users/me/profile");
        return adaptStudentProfile(raw);
      } catch (err) {
        console.error("Failed to load student profile:", err);
        throw err;
      }
    }
    return mock(studentProfile);
  },

  async updateProfile(patch: Partial<StudentProfile>) {
    if (API_ENABLED) {
      const payload: Record<string, any> = {};
      if (patch.name !== undefined) {
        payload["name"] = patch.name.trim();
        const parts = patch.name.trim().split(/\s+/);
        payload["firstName"] = parts[0] || "";
        payload["lastName"] = parts.slice(1).join(" ") || "";
      }
      if (patch.bio !== undefined) payload["bio"] = patch.bio.trim() || undefined;
      if (patch.skills !== undefined) payload["skills"] = patch.skills;
      if (patch.interests !== undefined) payload["interests"] = patch.interests;
      if (patch.careerInterests !== undefined) payload["careerInterests"] = patch.careerInterests;
      if (patch.academicYear !== undefined) payload["academicYear"] = patch.academicYear.trim() || undefined;
      if (patch.intakeSemester !== undefined) payload["intakeSemester"] = patch.intakeSemester.trim() || undefined;
      if (patch.studentIdNumber !== undefined) payload["studentIdNumber"] = patch.studentIdNumber.trim() || undefined;
      if (patch.githubUrl !== undefined) payload["githubUrl"] = patch.githubUrl.trim() || undefined;
      if (patch.linkedinUrl !== undefined) payload["linkedinUrl"] = patch.linkedinUrl.trim() || undefined;
      if (patch.websiteUrl !== undefined) payload["websiteUrl"] = patch.websiteUrl.trim() || undefined;
      if (patch.avatarUrl !== undefined) payload["avatarUrl"] = patch.avatarUrl.trim() || undefined;
      if (patch.experiences !== undefined) {
        payload["experiences"] = patch.experiences.map((e) => ({
          title: e.title.trim(),
          organizationName: e.organizationName.trim(),
          startDate: e.startDate,
          endDate: e.endDate || undefined,
          isCurrent: Boolean(e.isCurrent),
          location: e.location?.trim() || undefined,
          description: e.description?.trim() || undefined,
        }));
      }

      return apiSend("PATCH", "/users/me/profile", payload);
    }
    return mock({ ok: true }, 400);
  },

  async skillsCatalog(search?: string): Promise<any[]> {
    if (API_ENABLED) {
      try {
        const q = search ? `?search=${encodeURIComponent(search)}` : "";
        return await apiGet<any[]>(`/users/skills/catalog${q}`);
      } catch {
        return [];
      }
    }
    return [];
  },

  async interestsCatalog(search?: string): Promise<any[]> {
    if (API_ENABLED) {
      try {
        const q = search ? `?search=${encodeURIComponent(search)}` : "";
        return await apiGet<any[]>(`/users/interests/catalog${q}`);
      } catch {
        return [];
      }
    }
    return [];
  },
};
