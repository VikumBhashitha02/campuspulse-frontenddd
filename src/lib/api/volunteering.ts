import { API_ENABLED, apiGet, apiSend } from "./client";
import type {
  VolunteerApplication,
  VolunteerRoleTemplate,
  VolunteerStatsResponse,
  VolunteerStatus,
  VolunteerCandidateCard,
  RecommendedVolunteerOpportunity,
  VolunteerPreferencesDto,
  QueryVolunteerCandidatesParams,
  VolunteerTicketDto,
  VolunteerCheckInResult,
  ConfirmVolunteerServiceDto,
  VerifiedVolunteerExperience,
} from "../types";

export interface ApplyVolunteerDto {
  role: string;
  skills?: string[] | undefined;
  availability?: string | undefined;
  statement?: string | undefined;
  notes?: string | undefined;
}

export interface ReviewVolunteerDto {
  status: "ACCEPTED" | "REJECTED" | "COMPLETED";
  assignedRole?: string | undefined;
  feedback?: string | undefined;
  notes?: string | undefined;
}

export interface QueryVolunteersDto {
  status?: VolunteerStatus | undefined;
  role?: string | undefined;
  skip?: number | undefined;
  limit?: number | undefined;
}

export const volunteeringApi = {
  /**
   * Fetch standard volunteer role templates
   */
  async getRoleTemplates(): Promise<VolunteerRoleTemplate[]> {
    if (API_ENABLED) {
      try {
        return await apiGet<VolunteerRoleTemplate[]>("/volunteering/roles");
      } catch (err) {
        console.error("Failed to load volunteer roles from backend:", err);
      }
    }
    return [
      {
        name: "Registration Desk",
        category: "Operations",
        description: "Welcome attendees, verify student registrations, hand out delegate passes and welcome packs.",
        typicalResponsibilities: ["Check-in attendees", "Distribute badges & swag kits", "Verify student credentials"],
        suggestedSkills: ["Communication", "Organization", "Customer Service"],
      },
      {
        name: "Event Support",
        category: "Operations",
        description: "Assist organizers and coordinate floor logistics, venue navigation, and live help.",
        typicalResponsibilities: ["Guide attendees across venue halls", "Manage session transitions", "Assist keynote speakers"],
        suggestedSkills: ["Active Listening", "Problem Solving", "Teamwork"],
      },
      {
        name: "Technical Support",
        category: "Technical",
        description: "Assist with audiovisual, network access, sound checks, projector setup, and troubleshooting.",
        typicalResponsibilities: ["Check mics & projector feeds", "Assist demo setups", "Troubleshoot WiFi & HDMI issues"],
        suggestedSkills: ["AV Systems", "Networking", "Hardware", "Audio Engineering"],
      },
      {
        name: "Photography",
        category: "Media",
        description: "Capture candid moments, stage keynotes, and high-energy workshop action throughout the event.",
        typicalResponsibilities: ["Capture stage talks & workshops", "Framed team photos", "Organize daily photo deliveries"],
        suggestedSkills: ["Photography", "Lightroom", "Camera Gear", "Framing"],
      },
      {
        name: "Videography",
        category: "Media",
        description: "Record keynotes, interviews, attendee reactions, and capture footage for highlight reels.",
        typicalResponsibilities: ["Film keynote sessions", "Record attendee soundbites", "Assist livestream operators"],
        suggestedSkills: ["Videography", "Premiere Pro / DaVinci", "Gimbal Operation"],
      },
      {
        name: "Social Media",
        category: "Marketing",
        description: "Cover the event in real-time across Instagram, LinkedIn, and TikTok with live stories.",
        typicalResponsibilities: ["Post live story updates", "Interview winners & mentors", "Engage with online mentions"],
        suggestedSkills: ["Content Creation", "Copywriting", "Social Media Trends", "Canva"],
      },
      {
        name: "Marketing",
        category: "Marketing",
        description: "Drive event awareness, distribute promotional material, and engage with campus communities.",
        typicalResponsibilities: ["Promote on faculty groups", "Distribute flyers", "Coordinate attendee surveys"],
        suggestedSkills: ["Marketing", "Campaigns", "Communication"],
      },
      {
        name: "Crowd Management",
        category: "Operations",
        description: "Ensure safe and orderly movement of large student crowds during keynotes and lunch breaks.",
        typicalResponsibilities: ["Monitor auditorium entry & exit flows", "Queue management for food / swag", "Safety readiness"],
        suggestedSkills: ["Leadership", "Calm Under Pressure", "Conflict Resolution"],
      },
      {
        name: "Event Setup",
        category: "Logistics",
        description: "Assist with venue setup, stage decoration, banner positioning, and post-event teardown.",
        typicalResponsibilities: ["Arrange seating layouts & banners", "Mount backdrops", "Post-event venue clearing"],
        suggestedSkills: ["Physical Stamina", "Punctuality", "Logistics"],
      },
      {
        name: "Workshop Assistant",
        category: "Academic",
        description: "Assist workshop facilitators and help attendees resolve hands-on lab and coding issues.",
        typicalResponsibilities: ["Help students with code / environment setups", "Assist speaker with workshop materials"],
        suggestedSkills: ["Coding", "Mentoring", "Patience", "Technical Troubleshooting"],
      },
      {
        name: "Team Leader",
        category: "Leadership",
        description: "Lead and coordinate volunteer tracks, manage shift rotations, and ensure smooth duty execution.",
        typicalResponsibilities: ["Brief volunteer squads", "Coordinate shift swaps", "Liaison between leads and organizers"],
        suggestedSkills: ["Leadership", "Time Management", "Crisis Resolution"],
      },
    ];
  },

  /**
   * Submit student volunteer application for an opportunity
   */
  async apply(eventId: string, data: ApplyVolunteerDto): Promise<VolunteerApplication> {
    if (API_ENABLED) {
      return await apiSend<VolunteerApplication>("POST", `/volunteering/events/${eventId}/apply`, data);
    }
    throw new Error("Backend API required to submit volunteer application");
  },

  /**
   * Withdraw a student's own volunteer application
   */
  async withdraw(applicationId: string): Promise<{ success: boolean; application: VolunteerApplication }> {
    if (API_ENABLED) {
      return await apiSend<{ success: boolean; application: VolunteerApplication }>(
        "PATCH",
        `/volunteering/applications/${applicationId}/withdraw`
      );
    }
    throw new Error("Backend API required to withdraw volunteer application");
  },

  /**
   * Retrieve all volunteer applications submitted by the logged-in student
   */
  async getMyApplications(): Promise<VolunteerApplication[]> {
    if (API_ENABLED) {
      return await apiGet<VolunteerApplication[]>("/volunteering/my-applications");
    }
    return [];
  },

  /**
   * Retrieve applicants for an event (for organizers / event managers)
   */
  async getEventApplications(
    eventId: string,
    query: QueryVolunteersDto = {}
  ): Promise<{ total: number; items: VolunteerApplication[]; skip: number; limit: number }> {
    if (API_ENABLED) {
      const params = new URLSearchParams();
      if (query.status) params.set("status", query.status);
      if (query.role) params.set("role", query.role);
      if (query.skip !== undefined) params.set("skip", String(query.skip));
      if (query.limit !== undefined) params.set("limit", String(query.limit));

      const qs = params.toString() ? `?${params.toString()}` : "";
      return await apiGet<{ total: number; items: VolunteerApplication[]; skip: number; limit: number }>(
        `/volunteering/events/${eventId}/applications${qs}`
      );
    }
    return { total: 0, items: [], skip: 0, limit: 50 };
  },

  /**
   * Review an applicant (accept with role assignment, reject with feedback, or mark completed)
   */
  async reviewApplication(
    applicationId: string,
    data: ReviewVolunteerDto
  ): Promise<VolunteerApplication> {
    if (API_ENABLED) {
      return await apiSend<VolunteerApplication>(
        "PATCH",
        `/volunteering/applications/${applicationId}/review`,
        data
      );
    }
    throw new Error("Backend API required to review volunteer application");
  },

  /**
   * Retrieve volunteer funnel & capacity analytics for an event
   */
  async getEventStats(eventId: string): Promise<VolunteerStatsResponse> {
    if (API_ENABLED) {
      return await apiGet<VolunteerStatsResponse>(`/volunteering/events/${eventId}/stats`);
    }
    return {
      counts: { total: 0, pending: 0, accepted: 0, rejected: 0, withdrawn: 0, completed: 0 },
      capacity: null,
      capacityFilledPercentage: 0,
      roleBreakdown: {},
    };
  },

  /**
   * Get student volunteer preferences & privacy settings
   */
  async getPreferences(): Promise<VolunteerPreferencesDto> {
    if (API_ENABLED) {
      return await apiGet<VolunteerPreferencesDto>("/volunteering/my-preferences");
    }
    return {
      isVolunteerAvailable: true,
      volunteerAvailability: "FLEXIBLE",
      profileVisibility: "CAMPUS",
      volunteerBio: "",
    };
  },

  /**
   * Update student volunteer preferences & privacy settings
   */
  async updatePreferences(dto: VolunteerPreferencesDto): Promise<VolunteerPreferencesDto> {
    if (API_ENABLED) {
      return await apiSend<VolunteerPreferencesDto>("PATCH", "/volunteering/my-preferences", dto);
    }
    return dto;
  },

  /**
   * Fetch personalized recommended volunteer opportunities for student
   */
  async getRecommendedOpportunities(
    params: { skip?: number; limit?: number } = {}
  ): Promise<{ total: number; items: RecommendedVolunteerOpportunity[]; skip: number; limit: number }> {
    if (API_ENABLED) {
      const q = new URLSearchParams();
      if (params.skip !== undefined) q.set("skip", String(params.skip));
      if (params.limit !== undefined) q.set("limit", String(params.limit));
      const qs = q.toString() ? `?${q.toString()}` : "";
      return await apiGet<{ total: number; items: RecommendedVolunteerOpportunity[]; skip: number; limit: number }>(
        `/volunteering/matching/recommended${qs}`
      );
    }
    return { total: 0, items: [], skip: 0, limit: 20 };
  },

  /**
   * Discover and rank volunteer candidates for organizers
   */
  async findCandidates(
    params: QueryVolunteerCandidatesParams = {}
  ): Promise<{ total: number; items: VolunteerCandidateCard[]; skip: number; limit: number }> {
    if (API_ENABLED) {
      const q = new URLSearchParams();
      if (params.eventId) q.set("eventId", params.eventId);
      if (params.universityId) q.set("universityId", params.universityId);
      if (params.facultyId) q.set("facultyId", params.facultyId);
      if (params.skills && params.skills.length > 0) {
        params.skills.forEach((s) => q.append("skills", s));
      }
      if (params.minExperienceMonths !== undefined) q.set("minExperienceMonths", String(params.minExperienceMonths));
      if (params.availability) q.set("availability", params.availability);
      if (params.location) q.set("location", params.location);
      if (params.skip !== undefined) q.set("skip", String(params.skip));
      if (params.limit !== undefined) q.set("limit", String(params.limit));

      const qs = q.toString() ? `?${q.toString()}` : "";
      return await apiGet<{ total: number; items: VolunteerCandidateCard[]; skip: number; limit: number }>(
        `/volunteering/matching/candidates${qs}`
      );
    }
    return { total: 0, items: [], skip: 0, limit: 20 };
  },

  /**
   * Get volunteer ticket pass with QR token for an accepted application
   */
  async getVolunteerTicket(applicationId: string): Promise<VolunteerTicketDto> {
    if (API_ENABLED) {
      return await apiGet<VolunteerTicketDto>(`/volunteering/applications/${applicationId}/ticket`);
    }
    return {
      ticketNumber: `VOL-2026-DEMO`,
      qrToken: `cptok_vol_mock_demo_pass`,
      assignedRole: "Volunteer Crew",
      attendanceStatus: "NOT_CHECKED_IN",
      eventId: "demo-event",
      eventTitle: "Campus Event",
      eventSlug: "campus-event",
      eventDate: new Date().toISOString(),
      organizationId: "org-demo",
      organizationName: "CampusPulse Community",
      volunteerName: "Student Volunteer",
      volunteerEmail: "volunteer@student.uom.lk",
      isVerified: false,
    };
  },

  /**
   * Validate QR token independently on backend (Organizer scan)
   */
  async validateQr(
    qrToken: string
  ): Promise<{ isValid: boolean; participationId: string; applicationId: string; ticket: VolunteerTicketDto; volunteerProfile: any }> {
    if (API_ENABLED) {
      return await apiSend<{ isValid: boolean; participationId: string; applicationId: string; ticket: VolunteerTicketDto; volunteerProfile: any }>(
        "POST",
        "/volunteering/tickets/validate-qr",
        { qrToken }
      );
    }
    throw new Error("API not enabled");
  },

  /**
   * Record volunteer check-in (Organizer scan)
   */
  async checkIn(qrToken: string): Promise<VolunteerCheckInResult> {
    if (API_ENABLED) {
      return await apiSend<VolunteerCheckInResult>("POST", "/volunteering/tickets/check-in", { qrToken });
    }
    throw new Error("API not enabled");
  },

  /**
   * Record volunteer check-out (Organizer scan)
   */
  async checkOut(qrToken: string): Promise<VolunteerCheckInResult> {
    if (API_ENABLED) {
      return await apiSend<VolunteerCheckInResult>("POST", "/volunteering/tickets/check-out", { qrToken });
    }
    throw new Error("API not enabled");
  },

  /**
   * Confirm volunteer service, record verified hours, and optionally issue certificate
   */
  async confirmParticipation(
    participationId: string,
    dto: ConfirmVolunteerServiceDto
  ): Promise<{ success: boolean; message: string; confirmedHours: number; isVerified: boolean; ticket: VolunteerTicketDto; certificate?: any }> {
    if (API_ENABLED) {
      return await apiSend<any>("POST", `/volunteering/participations/${participationId}/confirm`, dto);
    }
    throw new Error("API not enabled");
  },

  /**
   * Issue official digital certificate for completed volunteering
   */
  async issueCertificate(
    participationId: string,
    dto: { title?: string; credentialUrl?: string } = {}
  ): Promise<any> {
    if (API_ENABLED) {
      return await apiSend<any>("POST", `/volunteering/participations/${participationId}/certificate`, dto);
    }
    throw new Error("API not enabled");
  },

  /**
   * Fetch authenticated student's verified volunteer experience history
   */
  async getVerifiedVolunteerHistory(): Promise<VerifiedVolunteerExperience[]> {
    if (API_ENABLED) {
      return await apiGet<VerifiedVolunteerExperience[]>("/volunteering/verified-history");
    }
    return [];
  },

  /**
   * Fetch public verified volunteer experience history for any student
   */
  async getPublicVerifiedVolunteerHistory(userId: string): Promise<VerifiedVolunteerExperience[]> {
    if (API_ENABLED) {
      return await apiGet<VerifiedVolunteerExperience[]>(`/volunteering/students/${userId}/verified-history`);
    }
    return [];
  },
};
