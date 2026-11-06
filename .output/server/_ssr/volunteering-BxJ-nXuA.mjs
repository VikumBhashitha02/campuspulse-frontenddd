import { n as apiSend, t as apiGet } from "./client-DCT7i2UG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/volunteering-BxJ-nXuA.js
var volunteeringApi = {
	/**
	* Fetch standard volunteer role templates
	*/
	async getRoleTemplates() {
		try {
			return await apiGet("/volunteering/roles");
		} catch (err) {
			console.error("Failed to load volunteer roles from backend:", err);
		}
		return [
			{
				name: "Registration Desk",
				category: "Operations",
				description: "Welcome attendees, verify student registrations, hand out delegate passes and welcome packs.",
				typicalResponsibilities: [
					"Check-in attendees",
					"Distribute badges & swag kits",
					"Verify student credentials"
				],
				suggestedSkills: [
					"Communication",
					"Organization",
					"Customer Service"
				]
			},
			{
				name: "Event Support",
				category: "Operations",
				description: "Assist organizers and coordinate floor logistics, venue navigation, and live help.",
				typicalResponsibilities: [
					"Guide attendees across venue halls",
					"Manage session transitions",
					"Assist keynote speakers"
				],
				suggestedSkills: [
					"Active Listening",
					"Problem Solving",
					"Teamwork"
				]
			},
			{
				name: "Technical Support",
				category: "Technical",
				description: "Assist with audiovisual, network access, sound checks, projector setup, and troubleshooting.",
				typicalResponsibilities: [
					"Check mics & projector feeds",
					"Assist demo setups",
					"Troubleshoot WiFi & HDMI issues"
				],
				suggestedSkills: [
					"AV Systems",
					"Networking",
					"Hardware",
					"Audio Engineering"
				]
			},
			{
				name: "Photography",
				category: "Media",
				description: "Capture candid moments, stage keynotes, and high-energy workshop action throughout the event.",
				typicalResponsibilities: [
					"Capture stage talks & workshops",
					"Framed team photos",
					"Organize daily photo deliveries"
				],
				suggestedSkills: [
					"Photography",
					"Lightroom",
					"Camera Gear",
					"Framing"
				]
			},
			{
				name: "Videography",
				category: "Media",
				description: "Record keynotes, interviews, attendee reactions, and capture footage for highlight reels.",
				typicalResponsibilities: [
					"Film keynote sessions",
					"Record attendee soundbites",
					"Assist livestream operators"
				],
				suggestedSkills: [
					"Videography",
					"Premiere Pro / DaVinci",
					"Gimbal Operation"
				]
			},
			{
				name: "Social Media",
				category: "Marketing",
				description: "Cover the event in real-time across Instagram, LinkedIn, and TikTok with live stories.",
				typicalResponsibilities: [
					"Post live story updates",
					"Interview winners & mentors",
					"Engage with online mentions"
				],
				suggestedSkills: [
					"Content Creation",
					"Copywriting",
					"Social Media Trends",
					"Canva"
				]
			},
			{
				name: "Marketing",
				category: "Marketing",
				description: "Drive event awareness, distribute promotional material, and engage with campus communities.",
				typicalResponsibilities: [
					"Promote on faculty groups",
					"Distribute flyers",
					"Coordinate attendee surveys"
				],
				suggestedSkills: [
					"Marketing",
					"Campaigns",
					"Communication"
				]
			},
			{
				name: "Crowd Management",
				category: "Operations",
				description: "Ensure safe and orderly movement of large student crowds during keynotes and lunch breaks.",
				typicalResponsibilities: [
					"Monitor auditorium entry & exit flows",
					"Queue management for food / swag",
					"Safety readiness"
				],
				suggestedSkills: [
					"Leadership",
					"Calm Under Pressure",
					"Conflict Resolution"
				]
			},
			{
				name: "Event Setup",
				category: "Logistics",
				description: "Assist with venue setup, stage decoration, banner positioning, and post-event teardown.",
				typicalResponsibilities: [
					"Arrange seating layouts & banners",
					"Mount backdrops",
					"Post-event venue clearing"
				],
				suggestedSkills: [
					"Physical Stamina",
					"Punctuality",
					"Logistics"
				]
			},
			{
				name: "Workshop Assistant",
				category: "Academic",
				description: "Assist workshop facilitators and help attendees resolve hands-on lab and coding issues.",
				typicalResponsibilities: ["Help students with code / environment setups", "Assist speaker with workshop materials"],
				suggestedSkills: [
					"Coding",
					"Mentoring",
					"Patience",
					"Technical Troubleshooting"
				]
			},
			{
				name: "Team Leader",
				category: "Leadership",
				description: "Lead and coordinate volunteer tracks, manage shift rotations, and ensure smooth duty execution.",
				typicalResponsibilities: [
					"Brief volunteer squads",
					"Coordinate shift swaps",
					"Liaison between leads and organizers"
				],
				suggestedSkills: [
					"Leadership",
					"Time Management",
					"Crisis Resolution"
				]
			}
		];
	},
	/**
	* Submit student volunteer application for an opportunity
	*/
	async apply(eventId, data) {
		return await apiSend("POST", `/volunteering/events/${eventId}/apply`, data);
	},
	/**
	* Withdraw a student's own volunteer application
	*/
	async withdraw(applicationId) {
		return await apiSend("PATCH", `/volunteering/applications/${applicationId}/withdraw`);
	},
	/**
	* Retrieve all volunteer applications submitted by the logged-in student
	*/
	async getMyApplications() {
		return await apiGet("/volunteering/my-applications");
	},
	/**
	* Retrieve applicants for an event (for organizers / event managers)
	*/
	async getEventApplications(eventId, query = {}) {
		{
			const params = new URLSearchParams();
			if (query.status) params.set("status", query.status);
			if (query.role) params.set("role", query.role);
			if (query.skip !== void 0) params.set("skip", String(query.skip));
			if (query.limit !== void 0) params.set("limit", String(query.limit));
			const qs = params.toString() ? `?${params.toString()}` : "";
			return await apiGet(`/volunteering/events/${eventId}/applications${qs}`);
		}
	},
	/**
	* Review an applicant (accept with role assignment, reject with feedback, or mark completed)
	*/
	async reviewApplication(applicationId, data) {
		return await apiSend("PATCH", `/volunteering/applications/${applicationId}/review`, data);
	},
	/**
	* Retrieve volunteer funnel & capacity analytics for an event
	*/
	async getEventStats(eventId) {
		return await apiGet(`/volunteering/events/${eventId}/stats`);
	},
	/**
	* Get student volunteer preferences & privacy settings
	*/
	async getPreferences() {
		return await apiGet("/volunteering/my-preferences");
	},
	/**
	* Update student volunteer preferences & privacy settings
	*/
	async updatePreferences(dto) {
		return await apiSend("PATCH", "/volunteering/my-preferences", dto);
	},
	/**
	* Fetch personalized recommended volunteer opportunities for student
	*/
	async getRecommendedOpportunities(params = {}) {
		{
			const q = new URLSearchParams();
			if (params.skip !== void 0) q.set("skip", String(params.skip));
			if (params.limit !== void 0) q.set("limit", String(params.limit));
			const qs = q.toString() ? `?${q.toString()}` : "";
			return await apiGet(`/volunteering/matching/recommended${qs}`);
		}
	},
	/**
	* Discover and rank volunteer candidates for organizers
	*/
	async findCandidates(params = {}) {
		{
			const q = new URLSearchParams();
			if (params.eventId) q.set("eventId", params.eventId);
			if (params.universityId) q.set("universityId", params.universityId);
			if (params.facultyId) q.set("facultyId", params.facultyId);
			if (params.skills && params.skills.length > 0) params.skills.forEach((s) => q.append("skills", s));
			if (params.minExperienceMonths !== void 0) q.set("minExperienceMonths", String(params.minExperienceMonths));
			if (params.availability) q.set("availability", params.availability);
			if (params.location) q.set("location", params.location);
			if (params.skip !== void 0) q.set("skip", String(params.skip));
			if (params.limit !== void 0) q.set("limit", String(params.limit));
			const qs = q.toString() ? `?${q.toString()}` : "";
			return await apiGet(`/volunteering/matching/candidates${qs}`);
		}
	},
	/**
	* Get volunteer ticket pass with QR token for an accepted application
	*/
	async getVolunteerTicket(applicationId) {
		return await apiGet(`/volunteering/applications/${applicationId}/ticket`);
	},
	/**
	* Validate QR token independently on backend (Organizer scan)
	*/
	async validateQr(qrToken) {
		return await apiSend("POST", "/volunteering/tickets/validate-qr", { qrToken });
	},
	/**
	* Record volunteer check-in (Organizer scan)
	*/
	async checkIn(qrToken) {
		return await apiSend("POST", "/volunteering/tickets/check-in", { qrToken });
	},
	/**
	* Record volunteer check-out (Organizer scan)
	*/
	async checkOut(qrToken) {
		return await apiSend("POST", "/volunteering/tickets/check-out", { qrToken });
	},
	/**
	* Confirm volunteer service, record verified hours, and optionally issue certificate
	*/
	async confirmParticipation(participationId, dto) {
		return await apiSend("POST", `/volunteering/participations/${participationId}/confirm`, dto);
	},
	/**
	* Issue official digital certificate for completed volunteering
	*/
	async issueCertificate(participationId, dto = {}) {
		return await apiSend("POST", `/volunteering/participations/${participationId}/certificate`, dto);
	},
	/**
	* Fetch authenticated student's verified volunteer experience history
	*/
	async getVerifiedVolunteerHistory() {
		return await apiGet("/volunteering/verified-history");
	},
	/**
	* Fetch public verified volunteer experience history for any student
	*/
	async getPublicVerifiedVolunteerHistory(userId) {
		return await apiGet(`/volunteering/students/${userId}/verified-history`);
	}
};
//#endregion
export { volunteeringApi as t };
