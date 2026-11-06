import { n as apiSend, o as mock, r as apiUpload, t as apiGet } from "./client-DCT7i2UG.mjs";
import { d as events, t as adaptEvent } from "./mock-data-D4y6vzZ1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-Dtjwkx07.js
var eventsApi = {
	async list(filters = {}) {
		{
			const params = new URLSearchParams();
			if (filters.q && filters.q.trim()) params.set("search", filters.q.trim());
			if (filters.category && filters.category !== "all") params.set("categoryId", filters.category);
			if (filters.university && filters.university !== "all") params.set("universityId", filters.university);
			if (filters.organization && filters.organization !== "all") params.set("organizationId", filters.organization);
			if (filters.opportunityType && filters.opportunityType !== "all") params.set("opportunityType", filters.opportunityType);
			if (filters.participationScope && filters.participationScope !== "all") params.set("participationScope", filters.participationScope);
			if (filters.musicGenre && filters.musicGenre !== "all") params.set("musicGenre", filters.musicGenre);
			if (filters.dramaGenre && filters.dramaGenre !== "all") params.set("dramaGenre", filters.dramaGenre);
			if (filters.programType && filters.programType !== "all") params.set("programType", filters.programType);
			if (filters.fundingType && filters.fundingType !== "all") params.set("fundingType", filters.fundingType);
			if (filters.studyMode && filters.studyMode !== "all") params.set("studyMode", filters.studyMode);
			if (filters.courseLevel && filters.courseLevel !== "all") params.set("courseLevel", filters.courseLevel);
			if (filters.hasCertificate !== void 0) params.set("hasCertificate", String(filters.hasCertificate));
			if (filters.mode && filters.mode !== "all") {
				const backendMode = filters.mode === "PHYSICAL" ? "IN_PERSON" : filters.mode;
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
			if (filters.page) params.set("page", String(filters.page));
			try {
				const res = await apiGet(`/events?${params.toString()}`);
				return (Array.isArray(res) ? res : res?.items || []).map((e) => adaptEvent(e));
			} catch (err) {
				console.error("Failed to load events from backend:", err);
				throw err;
			}
		}
	},
	async bySlug(slug) {
		try {
			const raw = await apiGet(`/events/slug/${encodeURIComponent(slug)}`);
			if (!raw) return null;
			return adaptEvent(raw);
		} catch (err) {
			if (err?.status === 404) return null;
			console.error(`Failed to load event ${slug}:`, err);
			throw err;
		}
	},
	async related(event) {
		try {
			const res = await apiGet(`/events?categoryId=${encodeURIComponent(event.categoryId)}&limit=4`);
			return (Array.isArray(res) ? res : res?.items || []).filter((e) => e.id !== event.id && e.slug !== event.slug).slice(0, 3).map((e) => adaptEvent(e));
		} catch {
			return [];
		}
	},
	async categories() {
		try {
			return (await apiGet("/categories") || []).map((c) => ({
				id: c.id,
				slug: c.slug,
				name: c.name,
				icon: c.icon || "compass",
				count: c._count?.events ?? 0
			}));
		} catch (err) {
			console.error("Failed to load categories:", err);
			throw err;
		}
	},
	async saved() {
		try {
			return (await apiGet("/bookmarks/my") || []).map((b) => {
				const raw = b?.event ?? b;
				return raw ? adaptEvent(raw, { bookmarked: true }) : null;
			}).filter((e) => Boolean(e));
		} catch (err) {
			console.error("Failed to load saved bookmarks:", err);
			throw err;
		}
	},
	async registrations() {
		try {
			return (await apiGet("/registrations/my") || []).map((r) => ({
				registration: {
					id: r.id,
					eventId: r.eventId,
					reference: (r.id || "").slice(-8).toUpperCase(),
					status: r.status === "REGISTERED" ? "CONFIRMED" : r.status === "CANCELLED" ? "CANCELLED" : "PENDING",
					attendance: r.status === "ATTENDED" ? "ATTENDED" : "NOT_MARKED",
					registeredAt: r.registeredAt || (/* @__PURE__ */ new Date()).toISOString()
				},
				event: adaptEvent(r.event, { registered: true })
			}));
		} catch (err) {
			console.error("Failed to load registrations:", err);
			throw err;
		}
	},
	async managed() {
		try {
			return (await apiGet("/events/organizer/my-events") || []).map((e) => adaptEvent(e));
		} catch (err) {
			console.error("Failed to load organizer events:", err);
			throw err;
		}
	},
	async moderationQueue() {
		try {
			const list = await apiGet("/admin/events");
			return (Array.isArray(list) ? list : list?.items || []).map((e) => adaptEvent(e));
		} catch (err) {
			console.error("Failed to load admin moderation queue:", err);
			throw err;
		}
	},
	async toggleBookmark(eventId, next) {
		return apiSend("POST", "/bookmarks/toggle", { eventId });
	},
	async trackView(slugOrId, eventId) {
		{
			const targetId = eventId || slugOrId;
			try {
				return await apiSend("POST", `/events/${encodeURIComponent(targetId)}/view`);
			} catch {
				return { ok: true };
			}
		}
	},
	async trackRegistrationClick(eventId, notes) {
		try {
			return await apiSend("POST", `/registrations`, {
				eventId,
				notes
			});
		} catch (err) {
			return apiSend("POST", `/events/${encodeURIComponent(eventId)}/register`, { notes }).catch(() => ({ ok: true }));
		}
	},
	async approveEvent(eventId) {
		return apiSend("POST", `/admin/events/${encodeURIComponent(eventId)}/approve`);
	},
	async rejectEvent(eventId, reason) {
		return apiSend("POST", `/admin/events/${encodeURIComponent(eventId)}/reject`, { reason });
	},
	async uploadPoster(file) {
		return apiUpload("/uploads/poster", file);
	},
	async createEvent(data) {
		return apiSend("POST", "/events", data);
	},
	async update(eventId, data) {
		return apiSend("PATCH", `/events/${encodeURIComponent(eventId)}`, data);
	},
	async updateEvent(eventId, data) {
		return this.update(eventId, data);
	},
	async publishEvent(eventId) {
		return apiSend("POST", `/events/${encodeURIComponent(eventId)}/publish`);
	},
	async submitForReview(eventId) {
		return apiSend("POST", `/events/${encodeURIComponent(eventId)}/publish`);
	},
	async deleteDraft(eventId) {
		return apiSend("DELETE", `/events/${encodeURIComponent(eventId)}`);
	},
	async checkEligibility(eventIdOrSlug) {
		try {
			return await apiGet(`/opportunities/${encodeURIComponent(eventIdOrSlug)}/eligibility`) || null;
		} catch (err) {
			console.error("Failed to check eligibility:", err);
			return null;
		}
	},
	async applyVolunteer(eventId, data) {
		return apiSend("POST", `/opportunities/${encodeURIComponent(eventId)}/volunteer`, data);
	},
	async registerTeam(data) {
		return apiSend("POST", "/registrations/team", data);
	},
	async getFeed(params = {}) {
		{
			const q = new URLSearchParams();
			if (params.mode) q.set("mode", params.mode);
			if (params.skip !== void 0) q.set("skip", String(params.skip));
			if (params.limit !== void 0) q.set("limit", String(params.limit));
			if (params.category && params.category !== "all") q.set("category", params.category);
			if (params.opportunityType && params.opportunityType !== "all") q.set("opportunityType", params.opportunityType);
			if (params.search && params.search.trim()) q.set("search", params.search.trim());
			if (params.universityId) q.set("universityId", params.universityId);
			try {
				const res = await apiGet(`/feed?${q.toString()}`);
				if (res) {
					const adaptedItems = (Array.isArray(res.items) ? res.items : []).map((item) => {
						const adapted = adaptEvent(item.event);
						adapted.matchExplanation = item.explanation;
						return {
							event: adapted,
							explanation: item.explanation
						};
					});
					return {
						mode: res.mode || "FOR_YOU",
						items: adaptedItems,
						pagination: res.pagination || {
							total: adaptedItems.length,
							skip: 0,
							limit: 10,
							hasMore: false
						},
						context: res.context || {
							isPersonalized: false,
							activeSignalsCount: 0
						}
					};
				}
			} catch (err) {
				console.error("Failed to load personalized feed:", err);
				throw err;
			}
		}
		const mockList = events.map((e) => {
			return {
				event: adaptEvent(e),
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
						isPopular: true
					}
				}
			};
		});
		return mock({
			mode: params.mode || "FOR_YOU",
			items: mockList,
			pagination: {
				total: mockList.length,
				skip: 0,
				limit: 10,
				hasMore: false
			},
			context: {
				isPersonalized: false,
				activeSignalsCount: 1
			}
		});
	},
	async recordView(eventId) {
		try {
			await apiSend("POST", `/feed/${encodeURIComponent(eventId)}/view`);
		} catch (err) {}
	},
	async opportunityTypes() {
		try {
			return await apiGet("/opportunities/opportunity-types") || [];
		} catch (err) {
			console.warn("Failed to fetch opportunity types, using fallback", err);
		}
		return [
			{
				key: "COMPETITION",
				label: "Competitions",
				description: "Championships and contests",
				icon: "trophy",
				badgeColor: ""
			},
			{
				key: "HACKATHON",
				label: "Hackathons",
				description: "Coding sprints",
				icon: "code-2",
				badgeColor: ""
			},
			{
				key: "WORKSHOP",
				label: "Workshops",
				description: "Hands-on labs",
				icon: "wrench",
				badgeColor: ""
			},
			{
				key: "CONFERENCE",
				label: "Conferences",
				description: "Academic symposiums",
				icon: "presentation",
				badgeColor: ""
			},
			{
				key: "SEMINAR",
				label: "Seminars",
				description: "Expert talks and knowledge sessions",
				icon: "presentation",
				badgeColor: ""
			},
			{
				key: "MUSIC",
				label: "Music & Concerts",
				description: "Live performances and musical events",
				icon: "music",
				badgeColor: ""
			},
			{
				key: "DRAMA",
				label: "Drama & Theatre",
				description: "Plays and stage productions",
				icon: "film",
				badgeColor: ""
			},
			{
				key: "MOVIE",
				label: "Movie Screenings",
				description: "Film premieres and campus cinema",
				icon: "film",
				badgeColor: ""
			},
			{
				key: "SPORTS",
				label: "Sports & Athletics",
				description: "Tournaments, matches and meets",
				icon: "trophy",
				badgeColor: ""
			},
			{
				key: "EXHIBITION",
				label: "Exhibitions & Fairs",
				description: "Project demos and cultural fairs",
				icon: "sparkles",
				badgeColor: ""
			},
			{
				key: "SOCIETY_EVENT",
				label: "Society Events",
				description: "Student club and society gatherings",
				icon: "users",
				badgeColor: ""
			},
			{
				key: "CULTURAL_EVENT",
				label: "Cultural Festivals",
				description: "Celebrations and traditional fests",
				icon: "sparkles",
				badgeColor: ""
			},
			{
				key: "RESEARCH",
				label: "Research",
				description: "Research papers and lab calls",
				icon: "flask-conical",
				badgeColor: ""
			},
			{
				key: "CAREER",
				label: "Career",
				description: "Internship fairs",
				icon: "briefcase",
				badgeColor: ""
			},
			{
				key: "VOLUNTEERING",
				label: "Volunteering",
				description: "Community initiatives",
				icon: "heart-handshake",
				badgeColor: ""
			},
			{
				key: "SCHOLARSHIP",
				label: "Scholarships",
				description: "Student grants",
				icon: "award",
				badgeColor: ""
			},
			{
				key: "TRAINING",
				label: "Training",
				description: "Skill bootcamps",
				icon: "graduation-cap",
				badgeColor: ""
			},
			{
				key: "TEAM_OPPORTUNITY",
				label: "Team Opportunities",
				description: "Squad recruiter",
				icon: "users",
				badgeColor: ""
			},
			{
				key: "OTHER",
				label: "Other",
				description: "Campus life and festivals",
				icon: "sparkles",
				badgeColor: ""
			}
		];
	},
	async getOrganizerOverview() {
		return apiGet("/events/organizer/overview");
	},
	async getEventManage(id) {
		{
			const data = await apiGet(`/events/${encodeURIComponent(id)}/manage`);
			return {
				...data,
				event: adaptEvent(data.event || data)
			};
		}
	},
	async getEventParticipants(id, params = {}) {
		{
			const q = new URLSearchParams();
			if (params.page) q.set("page", String(params.page));
			if (params.limit) q.set("limit", String(params.limit));
			if (params.search) q.set("search", params.search);
			if (params.ticketType && params.ticketType !== "ALL") q.set("ticketType", params.ticketType);
			if (params.status && params.status !== "ALL") q.set("status", params.status);
			if (params.paymentStatus && params.paymentStatus !== "ALL") q.set("paymentStatus", params.paymentStatus);
			if (params.checkedIn && params.checkedIn !== "ALL") q.set("checkedIn", params.checkedIn);
			return apiGet(`/events/${encodeURIComponent(id)}/participants?${q.toString()}`);
		}
	},
	async getEventVolunteers(id, params = {}) {
		{
			const q = new URLSearchParams();
			if (params.page) q.set("page", String(params.page));
			if (params.limit) q.set("limit", String(params.limit));
			if (params.status && params.status !== "ALL") q.set("status", params.status);
			if (params.search) q.set("search", params.search);
			return apiGet(`/events/${encodeURIComponent(id)}/volunteers?${q.toString()}`);
		}
	},
	async reviewVolunteer(eventId, userId, data) {
		return apiSend("POST", `/events/${encodeURIComponent(eventId)}/volunteers/${encodeURIComponent(userId)}/review`, data);
	},
	async getEventCheckIns(id, params = {}) {
		{
			const q = new URLSearchParams();
			if (params.page) q.set("page", String(params.page));
			if (params.limit) q.set("limit", String(params.limit));
			if (params.search) q.set("search", params.search);
			return apiGet(`/events/${encodeURIComponent(id)}/check-ins?${q.toString()}`);
		}
	},
	async scanTicket(eventId, payload) {
		return apiSend("POST", `/events/${encodeURIComponent(eventId)}/check-in/scan`, payload);
	},
	async getEventReports(id) {
		return apiGet(`/events/${encodeURIComponent(id)}/reports`);
	},
	async reportEvent(eventId, data) {
		return apiSend("POST", `/events/${encodeURIComponent(eventId)}/report`, data);
	},
	async getPendingVerifications() {
		return apiGet("/admin/events/pending-verification");
	},
	async getReportedEvents() {
		return apiGet("/admin/events/reported");
	},
	async verifyEvent(eventId, data) {
		return apiSend("PATCH", `/admin/events/${encodeURIComponent(eventId)}/verification`, data);
	}
};
//#endregion
export { eventsApi as t };
