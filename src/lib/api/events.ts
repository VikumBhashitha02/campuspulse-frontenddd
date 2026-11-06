import { API_ENABLED, apiGet, apiSend, apiUpload, mock } from "./client";
import { adaptEvent } from "./adapters";
import {
  bookmarkedEventIds,
  categories as mockCategories,
  events as mockEvents,
  registrations as mockRegistrations,
} from "../mock-data";
import type {
  CampusEvent,
  Category,
  EventRegistration,
  EligibilityEvaluationResult,
  FeedMode,
  FeedOpportunityItem,
  FeedResponse,
} from "../types";

export interface EventFilters {
  q?: string | undefined;
  category?: string | undefined;
  university?: string | undefined;
  organization?: string | undefined;
  mode?: string | undefined;
  opportunityType?: string | undefined;
  participationScope?: string | undefined;
  musicGenre?: string | undefined;
  dramaGenre?: string | undefined;
  programType?: string | undefined;
  fundingType?: string | undefined;
  studyMode?: string | undefined;
  courseLevel?: string | undefined;
  hasCertificate?: boolean | undefined;
  sort?: "recommended" | "deadline" | "newest" | "trending" | undefined;
  page?: number | undefined;
  limit?: number | undefined;
}

export const eventsApi = {
  async list(filters: EventFilters = {}): Promise<CampusEvent[]> {
    if (API_ENABLED) {
      const params = new URLSearchParams();

      if (filters.q && filters.q.trim()) {
        params.set("search", filters.q.trim());
      }
      if (filters.category && filters.category !== "all") {
        params.set("categoryId", filters.category);
      }
      if (filters.university && filters.university !== "all") {
        params.set("universityId", filters.university);
      }
      if (filters.organization && filters.organization !== "all") {
        params.set("organizationId", filters.organization);
      }
      if (filters.opportunityType && filters.opportunityType !== "all") {
        params.set("opportunityType", filters.opportunityType);
      }
      if (filters.participationScope && filters.participationScope !== "all") {
        params.set("participationScope", filters.participationScope);
      }
      if (filters.musicGenre && filters.musicGenre !== "all") {
        params.set("musicGenre", filters.musicGenre);
      }
      if (filters.dramaGenre && filters.dramaGenre !== "all") {
        params.set("dramaGenre", filters.dramaGenre);
      }
      if (filters.programType && filters.programType !== "all") {
        params.set("programType", filters.programType);
      }
      if (filters.fundingType && filters.fundingType !== "all") {
        params.set("fundingType", filters.fundingType);
      }
      if (filters.studyMode && filters.studyMode !== "all") {
        params.set("studyMode", filters.studyMode);
      }
      if (filters.courseLevel && filters.courseLevel !== "all") {
        params.set("courseLevel", filters.courseLevel);
      }
      if (filters.hasCertificate !== undefined) {
        params.set("hasCertificate", String(filters.hasCertificate));
      }
      if (filters.mode && filters.mode !== "all") {
        const backendMode =
          filters.mode === "PHYSICAL" ? "IN_PERSON" : filters.mode;
        params.set("mode", backendMode);
      }

      if (filters.sort === "deadline") {
        params.set("sortBy", "startDate");
        params.set("sortOrder", "asc");
      } else if (filters.sort === "newest") {
        params.set("sortBy", "createdAt");
        params.set("sortOrder", "desc");
      } else if (filters.sort === "trending") {
        params.set("sortBy", "registrations");
        params.set("sortOrder", "desc");
      }

      params.set("limit", String(filters.limit || 50));
      if (filters.page) {
        params.set("page", String(filters.page));
      }

      try {
        const res = await apiGet<{ items: any[]; meta?: any } | any[]>(
          `/events?${params.toString()}`,
        );
        const rawItems = Array.isArray(res) ? res : res?.items || [];
        return rawItems.map((e) => adaptEvent(e));
      } catch (err) {
        console.error("Failed to load events from backend:", err);
        throw err;
      }
    }

    return mock(mockEvents.map((e) => adaptEvent(e)));
  },

  async bySlug(slug: string): Promise<CampusEvent | null> {
    if (API_ENABLED) {
      try {
        const raw = await apiGet<any>(`/events/slug/${encodeURIComponent(slug)}`);
        if (!raw) return null;
        return adaptEvent(raw);
      } catch (err: any) {
        if (err?.status === 404) return null;
        console.error(`Failed to load event ${slug}:`, err);
        throw err;
      }
    }
    const found = mockEvents.find((e) => e.slug === slug);
    return mock(found ? adaptEvent(found) : null);
  },

  async related(event: CampusEvent): Promise<CampusEvent[]> {
    if (API_ENABLED) {
      try {
        const res = await apiGet<{ items: any[] } | any[]>(
          `/events?categoryId=${encodeURIComponent(event.categoryId)}&limit=4`,
        );
        const rawItems = Array.isArray(res) ? res : res?.items || [];
        return rawItems
          .filter((e) => e.id !== event.id && e.slug !== event.slug)
          .slice(0, 3)
          .map((e) => adaptEvent(e));
      } catch {
        return [];
      }
    }
    return mock(
      mockEvents
        .filter((e) => e.id !== event.id && e.categoryId === event.categoryId)
        .slice(0, 3)
        .map((e) => adaptEvent(e)),
    );
  },

  async categories(): Promise<Category[]> {
    if (API_ENABLED) {
      try {
        const list = await apiGet<any[]>("/categories");
        return (list || []).map((c) => ({
          id: c.id,
          slug: c.slug,
          name: c.name,
          icon: c.icon || "compass",
          count: c._count?.events ?? 0,
        }));
      } catch (err) {
        console.error("Failed to load categories:", err);
        throw err;
      }
    }
    return mock(mockCategories);
  },

  async saved(): Promise<CampusEvent[]> {
    if (API_ENABLED) {
      try {
        const list = await apiGet<any[]>("/bookmarks/my");
        return (list || [])
          .map((b) => {
            const raw = b?.event ?? b;
            return raw ? adaptEvent(raw, { bookmarked: true }) : null;
          })
          .filter((e): e is CampusEvent => Boolean(e));
      } catch (err) {
        console.error("Failed to load saved bookmarks:", err);
        throw err;
      }
    }
    return mock(
      mockEvents
        .filter((e) => bookmarkedEventIds.includes(e.id))
        .map((e) => adaptEvent(e, { bookmarked: true })),
    );
  },

  async registrations(): Promise<{ registration: EventRegistration; event: CampusEvent }[]> {
    if (API_ENABLED) {
      try {
        const list = await apiGet<any[]>("/registrations/my");
        return (list || []).map((r) => ({
          registration: {
            id: r.id,
            eventId: r.eventId,
            reference: (r.id || "").slice(-8).toUpperCase(),
            status:
              r.status === "REGISTERED"
                ? "CONFIRMED"
                : r.status === "CANCELLED"
                  ? "CANCELLED"
                  : "PENDING",
            attendance: r.status === "ATTENDED" ? "ATTENDED" : "NOT_MARKED",
            registeredAt: r.registeredAt || new Date().toISOString(),
          },
          event: adaptEvent(r.event, { registered: true }),
        }));
      } catch (err) {
        console.error("Failed to load registrations:", err);
        throw err;
      }
    }
    return mock(
      mockRegistrations
        .map((r) => {
          const event = mockEvents.find((e) => e.id === r.eventId);
          return event
            ? {
                registration: r,
                event: adaptEvent(event, { registered: true }),
              }
            : null;
        })
        .filter(Boolean) as { registration: EventRegistration; event: CampusEvent }[],
    );
  },

  async managed(): Promise<CampusEvent[]> {
    if (API_ENABLED) {
      try {
        const list = await apiGet<any[]>("/events/organizer/my-events");
        return (list || []).map((e) => adaptEvent(e));
      } catch (err) {
        console.error("Failed to load organizer events:", err);
        throw err;
      }
    }
    return mock(mockEvents.map((e) => adaptEvent(e)));
  },

  async moderationQueue(): Promise<CampusEvent[]> {
    if (API_ENABLED) {
      try {
        const list = await apiGet<{ items: any[] } | any[]>("/admin/events");
        const rawItems = Array.isArray(list) ? list : list?.items || [];
        return rawItems.map((e) => adaptEvent(e));
      } catch (err) {
        console.error("Failed to load admin moderation queue:", err);
        throw err;
      }
    }
    return mock(mockEvents.map((e) => adaptEvent(e)));
  },

  async toggleBookmark(eventId: string, next?: boolean) {
    if (API_ENABLED) {
      return apiSend("POST", "/bookmarks/toggle", { eventId });
    }
    return mock({ ok: true }, 120);
  },

  async trackView(slugOrId: string, eventId?: string) {
    if (API_ENABLED) {
      const targetId = eventId || slugOrId;
      try {
        return await apiSend("POST", `/events/${encodeURIComponent(targetId)}/view`);
      } catch {
        return { ok: true };
      }
    }
    return Promise.resolve({ ok: true });
  },

  async trackRegistrationClick(eventId: string, notes?: string) {
    if (API_ENABLED) {
      try {
        return await apiSend("POST", `/registrations`, { eventId, notes });
      } catch (err) {
        // If already registered or external link, track on event endpoint
        return apiSend("POST", `/events/${encodeURIComponent(eventId)}/register`, { notes }).catch(
          () => ({ ok: true }),
        );
      }
    }
    return Promise.resolve({ ok: true });
  },

  async approveEvent(eventId: string) {
    if (API_ENABLED) {
      return apiSend("POST", `/admin/events/${encodeURIComponent(eventId)}/approve`);
    }
    return mock({ ok: true });
  },

  async rejectEvent(eventId: string, reason: string) {
    if (API_ENABLED) {
      return apiSend("POST", `/admin/events/${encodeURIComponent(eventId)}/reject`, { reason });
    }
    return mock({ ok: true });
  },

  async uploadPoster(file: File): Promise<{ url: string; filename: string }> {
    if (API_ENABLED) {
      return apiUpload<{ url: string; filename: string }>("/uploads/poster", file);
    }
    return mock({ url: URL.createObjectURL(file), filename: file.name });
  },

  async createEvent(data: Record<string, any>) {
    if (API_ENABLED) {
      return apiSend("POST", "/events", data);
    }
    return mock({ ok: true });
  },

  async update(eventId: string, data: Record<string, any>) {
    if (API_ENABLED) {
      return apiSend("PATCH", `/events/${encodeURIComponent(eventId)}`, data);
    }
    return mock({ ok: true });
  },

  async updateEvent(eventId: string, data: Record<string, any>) {
    return this.update(eventId, data);
  },

  async publishEvent(eventId: string) {
    if (API_ENABLED) {
      return apiSend("POST", `/events/${encodeURIComponent(eventId)}/publish`);
    }
    return mock({ ok: true });
  },

  async submitForReview(eventId: string) {
    if (API_ENABLED) {
      return apiSend("POST", `/events/${encodeURIComponent(eventId)}/publish`);
    }
    return mock({ ok: true });
  },

  async deleteDraft(eventId: string) {
    if (API_ENABLED) {
      return apiSend("DELETE", `/events/${encodeURIComponent(eventId)}`);
    }
    return mock({ ok: true });
  },

  async checkEligibility(eventIdOrSlug: string): Promise<EligibilityEvaluationResult | null> {
    if (API_ENABLED) {
      try {
        const res = await apiGet<EligibilityEvaluationResult>(
          `/opportunities/${encodeURIComponent(eventIdOrSlug)}/eligibility`
        );
        return res || null;
      } catch (err) {
        console.error("Failed to check eligibility:", err);
        return null;
      }
    }
    return null;
  },

  async applyVolunteer(
    eventId: string,
    data: {
      role?: string | undefined;
      skills?: string[] | undefined;
      availability?: string | undefined;
      statement?: string | undefined;
    }
  ) {
    if (API_ENABLED) {
      return apiSend("POST", `/opportunities/${encodeURIComponent(eventId)}/volunteer`, data);
    }
    return mock({ ok: true });
  },

  async registerTeam(data: {
    eventId: string;
    teamId: string;
    notes?: string | undefined;
  }) {
    if (API_ENABLED) {
      return apiSend("POST", "/registrations/team", data);
    }
    return mock({ ok: true });
  },

  async getFeed(params: {
    mode?: FeedMode | undefined;
    skip?: number | undefined;
    limit?: number | undefined;
    category?: string | undefined;
    opportunityType?: string | undefined;
    search?: string | undefined;
    universityId?: string | undefined;
  } = {}): Promise<FeedResponse> {
    if (API_ENABLED) {
      const q = new URLSearchParams();
      if (params.mode) q.set("mode", params.mode);
      if (params.skip !== undefined) q.set("skip", String(params.skip));
      if (params.limit !== undefined) q.set("limit", String(params.limit));
      if (params.category && params.category !== "all") q.set("category", params.category);
      if (params.opportunityType && params.opportunityType !== "all") q.set("opportunityType", params.opportunityType);
      if (params.search && params.search.trim()) q.set("search", params.search.trim());
      if (params.universityId) q.set("universityId", params.universityId);

      try {
        const res = await apiGet<any>(`/feed?${q.toString()}`);
        if (res) {
          const rawItems = Array.isArray(res.items) ? res.items : [];
          const adaptedItems: FeedOpportunityItem[] = rawItems.map((item: any) => {
            const adapted = adaptEvent(item.event);
            adapted.matchExplanation = item.explanation;
            return {
              event: adapted,
              explanation: item.explanation,
            };
          });
          return {
            mode: res.mode || "FOR_YOU",
            items: adaptedItems,
            pagination: res.pagination || { total: adaptedItems.length, skip: 0, limit: 10, hasMore: false },
            context: res.context || { isPersonalized: false, activeSignalsCount: 0 },
          };
        }
      } catch (err) {
        console.error("Failed to load personalized feed:", err);
        throw err;
      }
    }

    // Fallback for mock mode
    const mockList = mockEvents.map((e) => {
      const adapted = adaptEvent(e);
      return {
        event: adapted,
        explanation: {
          score: 85,
          percentage: 85,
          badgeLabel: "85% Match",
          reasons: ["University campus recommendation", "Matches your interests"],
          signals: {
            sameUniversity: true,
            sameFaculty: false,
            matchedSkills: ["Coding"],
            matchedInterests: ["Technology"],
            hasInteractionHistory: false,
            isUrgent: false,
            isPopular: true,
          },
        },
      };
    });

    return mock({
      mode: params.mode || "FOR_YOU",
      items: mockList,
      pagination: { total: mockList.length, skip: 0, limit: 10, hasMore: false },
      context: { isPersonalized: false, activeSignalsCount: 1 },
    });
  },

  async recordView(eventId: string) {
    if (API_ENABLED) {
      try {
        await apiSend("POST", `/feed/${encodeURIComponent(eventId)}/view`);
      } catch (err) {
        /* Non-blocking interaction telemetry */
      }
    }
  },

  async opportunityTypes(): Promise<Array<{ key: string; label: string; description: string; icon: string; badgeColor: string }>> {
    if (API_ENABLED) {
      try {
        const res = await apiGet<any[]>("/opportunities/opportunity-types");
        return res || [];
      } catch (err) {
        console.warn("Failed to fetch opportunity types, using fallback", err);
      }
    }
    return [
      { key: "COMPETITION", label: "Competitions", description: "Championships and contests", icon: "trophy", badgeColor: "" },
      { key: "HACKATHON", label: "Hackathons", description: "Coding sprints", icon: "code-2", badgeColor: "" },
      { key: "WORKSHOP", label: "Workshops", description: "Hands-on labs", icon: "wrench", badgeColor: "" },
      { key: "CONFERENCE", label: "Conferences", description: "Academic symposiums", icon: "presentation", badgeColor: "" },
      { key: "SEMINAR", label: "Seminars", description: "Expert talks and knowledge sessions", icon: "presentation", badgeColor: "" },
      { key: "MUSIC", label: "Music & Concerts", description: "Live performances and musical events", icon: "music", badgeColor: "" },
      { key: "DRAMA", label: "Drama & Theatre", description: "Plays and stage productions", icon: "film", badgeColor: "" },
      { key: "MOVIE", label: "Movie Screenings", description: "Film premieres and campus cinema", icon: "film", badgeColor: "" },
      { key: "SPORTS", label: "Sports & Athletics", description: "Tournaments, matches and meets", icon: "trophy", badgeColor: "" },
      { key: "EXHIBITION", label: "Exhibitions & Fairs", description: "Project demos and cultural fairs", icon: "sparkles", badgeColor: "" },
      { key: "SOCIETY_EVENT", label: "Society Events", description: "Student club and society gatherings", icon: "users", badgeColor: "" },
      { key: "CULTURAL_EVENT", label: "Cultural Festivals", description: "Celebrations and traditional fests", icon: "sparkles", badgeColor: "" },
      { key: "RESEARCH", label: "Research", description: "Research papers and lab calls", icon: "flask-conical", badgeColor: "" },
      { key: "CAREER", label: "Career", description: "Internship fairs", icon: "briefcase", badgeColor: "" },
      { key: "VOLUNTEERING", label: "Volunteering", description: "Community initiatives", icon: "heart-handshake", badgeColor: "" },
      { key: "SCHOLARSHIP", label: "Scholarships", description: "Student grants", icon: "award", badgeColor: "" },
      { key: "TRAINING", label: "Training", description: "Skill bootcamps", icon: "graduation-cap", badgeColor: "" },
      { key: "TEAM_OPPORTUNITY", label: "Team Opportunities", description: "Squad recruiter", icon: "users", badgeColor: "" },
      { key: "OTHER", label: "Other", description: "Campus life and festivals", icon: "sparkles", badgeColor: "" },
    ];
  },

  async getOrganizerOverview() {
    if (API_ENABLED) {
      return apiGet<any>("/events/organizer/overview");
    }
    return mock({
      totalEvents: 3,
      upcomingEvents: 2,
      pastEvents: 1,
      totalRegistrations: 42,
      totalCheckedIn: 18,
      totalVolunteers: 6,
      ticketRevenue: 34000,
      reportedEvents: 0,
      recentEvents: [],
    });
  },

  async getEventManage(id: string) {
    if (API_ENABLED) {
      const data = await apiGet<any>(`/events/${encodeURIComponent(id)}/manage`);
      return {
        ...data,
        event: adaptEvent(data.event || data),
      };
    }
    const found = mockEvents.find((e) => e.id === id || e.slug === id);
    return mock({
      event: found ? adaptEvent(found) : null,
      stats: { totalRegistrations: 25, totalCheckedIn: 10, totalVolunteers: 4, openReports: 0 },
    });
  },

  async getEventParticipants(
    id: string,
    params: {
      page?: number | undefined;
      limit?: number | undefined;
      search?: string | undefined;
      ticketType?: string | undefined;
      status?: string | undefined;
      paymentStatus?: string | undefined;
      checkedIn?: string | undefined;
    } = {},
  ) {
    if (API_ENABLED) {
      const q = new URLSearchParams();
      if (params.page) q.set("page", String(params.page));
      if (params.limit) q.set("limit", String(params.limit));
      if (params.search) q.set("search", params.search);
      if (params.ticketType && params.ticketType !== "ALL") q.set("ticketType", params.ticketType);
      if (params.status && params.status !== "ALL") q.set("status", params.status);
      if (params.paymentStatus && params.paymentStatus !== "ALL") q.set("paymentStatus", params.paymentStatus);
      if (params.checkedIn && params.checkedIn !== "ALL") q.set("checkedIn", params.checkedIn);

      return apiGet<{ items: any[]; meta: any }>(`/events/${encodeURIComponent(id)}/participants?${q.toString()}`);
    }
    return mock({ items: [], meta: { page: 1, limit: 20, total: 0, totalPages: 1 } });
  },

  async getEventVolunteers(
    id: string,
    params: { page?: number | undefined; limit?: number | undefined; status?: string | undefined; search?: string | undefined } = {},
  ) {
    if (API_ENABLED) {
      const q = new URLSearchParams();
      if (params.page) q.set("page", String(params.page));
      if (params.limit) q.set("limit", String(params.limit));
      if (params.status && params.status !== "ALL") q.set("status", params.status);
      if (params.search) q.set("search", params.search);

      return apiGet<{ items: any[]; meta: any }>(`/events/${encodeURIComponent(id)}/volunteers?${q.toString()}`);
    }
    return mock({ items: [], meta: { page: 1, limit: 20, total: 0, totalPages: 1 } });
  },

  async reviewVolunteer(
    eventId: string,
    userId: string,
    data: { status: "ACCEPTED" | "REJECTED" | "PENDING"; notes?: string | undefined },
  ) {
    if (API_ENABLED) {
      return apiSend("POST", `/events/${encodeURIComponent(eventId)}/volunteers/${encodeURIComponent(userId)}/review`, data);
    }
    return mock({ ok: true });
  },

  async getEventCheckIns(
    id: string,
    params: { page?: number | undefined; limit?: number | undefined; search?: string | undefined } = {},
  ) {
    if (API_ENABLED) {
      const q = new URLSearchParams();
      if (params.page) q.set("page", String(params.page));
      if (params.limit) q.set("limit", String(params.limit));
      if (params.search) q.set("search", params.search);

      return apiGet<{ items: any[]; meta: any; stats: any }>(`/events/${encodeURIComponent(id)}/check-ins?${q.toString()}`);
    }
    return mock({ items: [], meta: { page: 1, limit: 20, total: 0, totalPages: 1 }, stats: { totalRegistered: 0, totalCheckedIn: 0, remaining: 0, checkInPercentage: 0 } });
  },

  async scanTicket(
    eventId: string,
    payload: { qrToken: string; action?: "VALIDATE" | "CHECK_IN" | undefined; notes?: string | undefined },
  ) {
    if (API_ENABLED) {
      return apiSend("POST", `/events/${encodeURIComponent(eventId)}/check-in/scan`, payload);
    }
    return mock({ status: "VALID", message: "Ticket is valid", participant: null });
  },

  async getEventReports(id: string) {
    if (API_ENABLED) {
      return apiGet<any[]>(`/events/${encodeURIComponent(id)}/reports`);
    }
    return mock([]);
  },

  async reportEvent(
    eventId: string,
    data: { reason: string; description?: string | undefined; details?: string | undefined; evidenceUrl?: string | undefined },
  ) {
    if (API_ENABLED) {
      return apiSend("POST", `/events/${encodeURIComponent(eventId)}/report`, data);
    }
    return mock({ ok: true });
  },

  async getPendingVerifications() {
    if (API_ENABLED) {
      return apiGet<any[]>("/admin/events/pending-verification");
    }
    return mock([]);
  },

  async getReportedEvents() {
    if (API_ENABLED) {
      return apiGet<any[]>("/admin/events/reported");
    }
    return mock([]);
  },

  async verifyEvent(eventId: string, data: { status: string; verificationNotes?: string }) {
    if (API_ENABLED) {
      return apiSend("PATCH", `/admin/events/${encodeURIComponent(eventId)}/verification`, data);
    }
    return mock({ ok: true });
  },
};

export const opportunitiesApi = eventsApi;
