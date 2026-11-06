import type {
  CampusEvent,
  EventMode,
  EventStatus,
  University,
  Organization,
  OrganizationMember,
  Team,
  AppNotification,
  NotificationKind,
  StudentProfile,
  PlatformUser,
  Report,
  Verification,
} from "../types";
import { resolveMediaUrl } from "./client";

export function getInitials(name?: string): string {
  if (!name) return "CP";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export function adaptEvent(
  e: any,
  extras?: { bookmarked?: boolean; registered?: boolean },
): CampusEvent {
  if (!e) return null as any;
  const orgName = e.organization?.name || e.organizationName || "Campus Organization";
  const uniName =
    e.university?.name ||
    e.organization?.university?.name ||
    e.universityName ||
    "Sri Lanka";
  const catName = e.category?.name || e.categoryName || "General";

  let mode: EventMode = "PHYSICAL";
  if (e.mode === "ONLINE") mode = "ONLINE";
  else if (e.mode === "HYBRID") mode = "HYBRID";
  else mode = "PHYSICAL";

  let eligibilityList: string[] = [];
  if (Array.isArray(e.eligibility)) {
    eligibilityList = e.eligibility;
  } else if (typeof e.eligibility === "string" && e.eligibility.trim()) {
    eligibilityList = e.eligibility
      .split(/\r?\n|•|\*/)
      .map((s: string) => s.trim())
      .filter(Boolean);
  }
  if (eligibilityList.length === 0) {
    eligibilityList = ["Open to all undergraduate and postgraduate university students."];
  }

  let requirementsList: string[] = [];
  if (Array.isArray(e.requirements)) {
    requirementsList = e.requirements;
  } else if (Array.isArray(e.skills) && e.skills.length > 0) {
    requirementsList = e.skills.map((s: string) => `Skill proficiency: ${s}`);
  } else {
    requirementsList = ["Active university student ID registration", "Team participation per rules"];
  }

  const startDateStr = e.startDate ? new Date(e.startDate).toISOString() : new Date().toISOString();
  const endDateStr = e.endDate ? new Date(e.endDate).toISOString() : startDateStr;
  const deadlineStr = e.registrationDeadline
    ? new Date(e.registrationDeadline).toISOString()
    : startDateStr;

  return {
    id: e.id,
    slug: e.slug || e.id,
    title: e.title || "Untitled Opportunity",
    summary:
      e.shortDescription ||
      e.summary ||
      (e.description ? e.description.slice(0, 160) + "..." : "No summary available."),
    description: e.description || "",
    categoryId: e.categoryId || e.category?.id || "",
    categoryName: catName,
    organizationId: e.organizationId || e.organization?.id || "",
    organizationName: orgName,
    organizationInitials: getInitials(orgName),
    organizationVerified: Boolean(e.organization?.isVerified ?? e.organizationVerified ?? false),
    universityId: e.universityId || e.university?.id || e.organization?.universityId || "",
    universityName: uniName,
    mode,
    location: e.location || e.venue || (mode === "ONLINE" ? "Online" : uniName),
    startDate: startDateStr,
    endDate: endDateStr,
    registrationDeadline: deadlineStr,
    prize: e.prizeInfo || e.prize || undefined,
    status: (e.status as EventStatus) || "PUBLISHED",
    views: e.viewCount ?? e.views ?? 0,
    registrationClicks: e.registrationClicks ?? 0,
    registrations: e._count?.registrations ?? e.registrations ?? 0,
    eligibility: eligibilityList,
    requirements: requirementsList,
    timeline: Array.isArray(e.timeline)
      ? e.timeline
      : [
          { label: "Registration Closes", date: deadlineStr },
          { label: "Event Commences", date: startDateStr },
          { label: "Final Wrap-up", date: endDateStr },
        ],
    teamSize: e.teamSize || undefined,
    bookmarked: extras?.bookmarked ?? Boolean(e.bookmarked),
    registered: extras?.registered ?? Boolean(e.registered),
    trendingScore:
      e.trendingScore ??
      Math.round((e.viewCount ?? 0) * 1.5 + (e._count?.registrations ?? 0) * 5),
    rejectionReason: e.rejectionReason || undefined,
    opportunityType: e.opportunityType || "COMPETITION",
    participationScope: e.participationScope || "INTER_UNIVERSITY",
    eligibilitySummary: e.eligibilitySummary || undefined,
    allowedUniversityIds: e.allowedUniversityIds || [],
    allowedFacultyIds: e.allowedFacultyIds || [],
    allowedDepartmentIds: e.allowedDepartmentIds || [],
    allowedAcademicYears: e.allowedAcademicYears || [],
    allowAlumni: Boolean(e.allowAlumni),
    minAge: e.minAge ?? null,
    maxAge: e.maxAge ?? null,
    minExperienceMonths: e.minExperienceMonths ?? null,
    minTeamSize: e.minTeamSize ?? null,
    maxTeamSize: e.maxTeamSize ?? null,
    requiredSkills: e.requiredSkills || [],
    allowedUniversities: e.allowedUniversities || [],
    bannerUrl: resolveMediaUrl(e.bannerUrl || e.coverImageUrl || e.posterUrl),
    coverImageUrl: resolveMediaUrl(e.coverImageUrl || e.bannerUrl || e.posterUrl),
    isFree: e.isFree !== undefined ? Boolean(e.isFree) : true,
    price: e.price !== undefined && e.price !== null ? Number(e.price) : null,
    currency: e.currency || "LKR",
    capacity: e.capacity ?? null,
    registrationSettings: e.registrationSettings || null,
    volunteerRoles: Array.isArray(e.volunteerRoles) ? e.volunteerRoles : [],
    volunteerResponsibilities: Array.isArray(e.volunteerResponsibilities) ? e.volunteerResponsibilities : [],
    volunteerBenefits: Array.isArray(e.volunteerBenefits) ? e.volunteerBenefits : [],
    volunteerAvailability: e.volunteerAvailability || null,
    volunteerCapacity: e.volunteerCapacity ?? null,
    pricingMode: e.pricingMode || "FREE_FOR_ALL",
    studentPrice: e.studentPrice !== undefined && e.studentPrice !== null ? Number(e.studentPrice) : null,
    externalPrice: e.externalPrice !== undefined && e.externalPrice !== null ? Number(e.externalPrice) : null,
    eventVerificationStatus: e.eventVerificationStatus || "PENDING_REVIEW",
    verificationNotes: e.verificationNotes || null,
    posterUrl: resolveMediaUrl(e.posterUrl || e.coverImageUrl || e.bannerUrl) || null,
    officialEventUrl: e.officialEventUrl || null,
    officialOrgUrl: e.officialOrgUrl || null,
    proofDocumentUrl: e.proofDocumentUrl || null,
    organizerNotes: e.organizerNotes || null,
    reportCount: e.reportCount ?? e._count?.reports ?? 0,
    checkInCount: e.checkInCount ?? e._count?.tickets ?? 0,
    volunteerCount: e.volunteerCount ?? e._count?.volunteers ?? 0,
    revenue: e.revenue ?? 0,
    // Music & Entertainment
    artistNames: Array.isArray(e.artistNames) ? e.artistNames : [],
    musicGenre: e.musicGenre || null,
    performanceSchedule: e.performanceSchedule || null,
    // Drama & Performing Arts
    productionTitle: e.productionTitle || null,
    dramaGenre: e.dramaGenre || null,
    castMembers: Array.isArray(e.castMembers) ? e.castMembers : [],
    director: e.director || null,
    synopsis: e.synopsis || null,
    // Higher Studies (MSc, PhD, Master's)
    programType: e.programType || null,
    degreeAwarded: e.degreeAwarded || null,
    studyMode: e.studyMode || null,
    programDuration: e.programDuration || null,
    fundingType: e.fundingType || null,
    scholarshipDetails: e.scholarshipDetails || null,
    entryQualifications: e.entryQualifications || null,
    applicationRequirements: e.applicationRequirements || null,
    intakePeriod: e.intakePeriod || null,
    tuitionFee: e.tuitionFee || null,
    officialApplicationUrl: e.officialApplicationUrl || null,
    programUrl: e.programUrl || null,
    // University Courses & Professional Learning
    courseLevel: e.courseLevel || null,
    courseCode: e.courseCode || null,
    courseDuration: e.courseDuration || null,
    workloadHoursPerWeek: e.workloadHoursPerWeek || null,
    prerequisites: e.prerequisites || null,
    syllabus: e.syllabus || null,
    instructor: e.instructor || null,
    hasCertificate: e.hasCertificate !== undefined ? Boolean(e.hasCertificate) : true,
    enrollmentUrl: e.enrollmentUrl || null,
    allowClubTransfer: Boolean(e.allowClubTransfer),
    allowOnlineGateway: e.allowOnlineGateway !== undefined ? Boolean(e.allowOnlineGateway) : true,
    customPaymentInstructions: e.customPaymentInstructions || null,
    organization: e.organization ? adaptOrganization(e.organization) : undefined,
  };
}

export function adaptUniversity(u: any): University {
  return {
    id: u.id,
    slug: u.slug,
    name: u.name,
    shortName: u.code || u.shortName || getInitials(u.name),
    code: u.code,
    location: u.city ? `${u.city}, ${u.country || "Sri Lanka"}` : (u.location || "Sri Lanka"),
    logoColor: u.logoColor || "#1E3A8A",
    logoUrl: u.logoUrl || null,
    bannerUrl: u.bannerUrl || null,
    websiteUrl: u.websiteUrl || null,
    domain: u.domain || null,
    isVerified: u.isVerified ?? true,
    about: u.description || u.about || "Premier university offering diverse academic opportunities.",
    description: u.description || u.about || "Premier university offering diverse academic opportunities.",
    faculties: (u.faculties || []).map((f: any) => ({
      id: f.id,
      name: f.name,
      code: f.code,
      departments: (f.departments || []).map((d: any) => ({
        id: d.id,
        name: d.name,
        code: d.code,
      })),
    })),
    facultyCount: u._count?.faculties ?? (u.faculties?.length || 0),
    organizationCount: u._count?.organizations ?? u.organizationCount ?? (u.organizations?.length || 0),
    eventCount: u._count?.events ?? u.eventCount ?? (u.events?.length || 0),
  };
}

export function adaptOrganization(o: any): Organization {
  const leadership = (o.members || []).map((m: any) => ({
    id: m.id || m.userId,
    name: m.user?.name || m.name || "Executive Member",
    role: m.title || m.role || "Member",
  }));

  return {
    id: o.id,
    slug: o.slug,
    name: o.name,
    initials: getInitials(o.name),
    universityId: o.universityId || o.university?.id || "",
    universityName: o.university?.name || o.universityName || "University",
    verified: Boolean(o.isVerified ?? o.verified ?? false),
    description: o.description || "",
    memberCount: o._count?.members ?? o.memberCount ?? leadership.length,
    leadership,
    bankName: o.bankName || null,
    bankBranch: o.bankBranch || null,
    bankAccountName: o.bankAccountName || null,
    bankAccountNumber: o.bankAccountNumber || null,
    paymentInstructions: o.paymentInstructions || null,
  };
}

export function adaptTeam(t: any): Team {
  const members = (t.members || []).map((m: any) => ({
    id: m.id || m.userId,
    userId: m.userId || m.user?.id,
    name: m.user?.name || m.name || "Team Member",
    role: m.role === "LEADER" ? "Team Leader" : "Member",
    isLeader: m.role === "LEADER" || Boolean(m.isLeader),
    avatarUrl: m.user?.avatarUrl || m.avatarUrl || null,
    studentProfile: m.user?.studentProfile || m.studentProfile || null,
  }));

  const maxMembers = t.maxMembers || 4;
  const currentCount = members.length;
  const openSlots = Math.max(0, maxMembers - currentCount);

  return {
    id: t.id,
    name: t.name,
    description: t.description || "",
    creatorId: t.creatorId || t.creator?.id || "",
    eventId: t.eventId || t.event?.id || "",
    eventTitle: t.event?.title || t.eventTitle || "University Opportunity",
    event: t.event || null,
    leader: t.creator?.name || members.find((m: any) => m.isLeader)?.name || "Squad Leader",
    leaderAvatarUrl: t.creator?.avatarUrl || members.find((m: any) => m.isLeader)?.avatarUrl || null,
    members,
    requiredRoles: t.requiredRoles || [],
    skills: t.requiredSkills || t.skills || [],
    maxMembers,
    openSlots,
    isOpen: t.isOpen !== undefined ? Boolean(t.isOpen) : openSlots > 0,
    compatibility: t.matchScore ?? t.compatibility ?? 75,
    availability: t.availability || "FLEXIBLE",
    joinRequests: t.joinRequests || [],
    matchExplanation: t.matchExplanation || null,
  };
}

export function resolveNotificationDestination(rawHref?: string, kind?: NotificationKind): string {
  if (rawHref && typeof rawHref === "string" && rawHref.trim()) {
    let clean = rawHref.trim();

    // Fix /teams routes to /account/teams
    if (clean.startsWith("/teams")) {
      const match = clean.match(/^\/teams\?teamId=([^&]+)/);
      if (match && match[1]) {
        return `/account/teams/${match[1]}`;
      }
      return clean.replace(/^\/teams/, "/account/teams");
    }

    // Fix /account/teams?teamId=... query parameter into path parameter
    if (clean.startsWith("/account/teams?teamId=")) {
      const match = clean.match(/^\/account\/teams\?teamId=([^&]+)/);
      if (match && match[1]) {
        return `/account/teams/${match[1]}`;
      }
    }

    // Fix bare /events to /explore
    if (clean === "/events" || clean === "/events/") {
      return "/explore";
    }

    // Fix /dashboard or /feed to /account
    if (clean === "/dashboard" || clean === "/feed") {
      return "/account";
    }

    // Fix bare /organizations to /explore
    if (clean === "/organizations" || clean === "/organizations/") {
      return "/explore";
    }

    // Fix bare /universities to /universities
    if (clean === "/universities" || clean === "/universities/") {
      return "/universities";
    }

    if (clean.startsWith("/")) {
      return clean;
    }
  }

  // Kind-based safe defaults
  if (kind === "REGISTRATION") return "/account/registrations";
  if (kind === "TEAM_REQUEST" || kind === "TEAM_ACCEPTED") return "/account/teams";
  if (kind === "DEADLINE") return "/account/calendar";
  if (kind === "ORGANIZATION") return "/explore";
  return "/explore";
}

export function adaptNotification(n: any): AppNotification {
  let kind: NotificationKind = "ORGANIZATION";
  const t = String(n.type || "").toUpperCase();
  if (t.includes("DEADLINE") || t.includes("REMINDER")) kind = "DEADLINE";
  else if (t.includes("REGISTRATION")) kind = "REGISTRATION";
  else if (t === "TEAM_REQUEST" || (t.includes("TEAM") && (t.includes("REQUEST") || t.includes("INVITE")))) kind = "TEAM_REQUEST";
  else if (t.includes("TEAM") && (t.includes("ACCEPT") || t.includes("UPDATE"))) kind = "TEAM_ACCEPTED";
  else if (t.includes("EVENT") || t.includes("CANCEL") || t.includes("VOLUNTEER")) kind = "EVENT_UPDATE";
  else if (t.includes("ORGANIZATION") || t.includes("MEMBERSHIP") || t.includes("LEADERSHIP")) kind = "ORGANIZATION";

  const href = resolveNotificationDestination(n.linkUrl || n.href, kind);

  return {
    id: n.id,
    kind,
    title: n.title,
    body: n.message || n.body || "",
    createdAt: n.createdAt ? new Date(n.createdAt).toISOString() : new Date().toISOString(),
    read: Boolean(n.isRead ?? n.read ?? false),
    href,
  };
}

export function adaptStudentProfile(u: any): StudentProfile {
  const prof = u.studentProfile || u.profile || {};
  const userEntered = u.userEnteredInfo || {};
  const uniIdentity = u.universityIdentity || {};
  const campusActivity = u.verifiedCampusActivity;

  const rawSkills =
    userEntered.skills && Array.isArray(userEntered.skills)
      ? userEntered.skills.map((s: any) => (typeof s === "string" ? s : s.name))
      : prof.skills || u.skills || [];

  const rawInterests =
    userEntered.interests && Array.isArray(userEntered.interests)
      ? userEntered.interests.map((i: any) => (typeof i === "string" ? i : i.name))
      : prof.interests || u.interests || [];

  const rawCareer =
    userEntered.careerInterests || prof.careerInterests || prof.interests || u.careerInterests || [];

  const uniName =
    uniIdentity.university?.name ||
    prof.university?.name ||
    u.university?.name ||
    u.universityName ||
    "University of Colombo";

  const facultyName =
    uniIdentity.faculty?.name || prof.faculty?.name || u.faculty || "Faculty of Science";

  const deptName =
    uniIdentity.department?.name || prof.department?.name || u.department || "Department of Computer Science";

  return {
    id: u.id,
    name: u.name || "Student",
    email: u.email || "",
    avatarUrl: u.avatarUrl || prof.avatarUrl,
    avatarInitials: getInitials(u.name || "Student"),
    universityName: uniName,
    faculty: facultyName,
    department: deptName,
    batch: String(uniIdentity.batchYear || prof.batchYear || u.batch || "2023"),
    academicYear: uniIdentity.academicYear || prof.academicYear || "3rd Year",
    intakeSemester: uniIdentity.intakeSemester || prof.intakeSemester || "2023 Intake",
    studentIdNumber: uniIdentity.studentIdNumber || prof.studentIdNumber,
    bio: userEntered.bio ?? prof.bio ?? u.bio ?? "",
    githubUrl: userEntered.socialLinks?.githubUrl || prof.githubUrl,
    linkedinUrl: userEntered.socialLinks?.linkedinUrl || prof.linkedinUrl,
    websiteUrl: userEntered.socialLinks?.websiteUrl || prof.websiteUrl,
    skills: rawSkills,
    interests: rawInterests,
    careerInterests: rawCareer,
    universityIdentity: uniIdentity.university ? uniIdentity : undefined,
    normalizedSkills: userEntered.skills,
    normalizedInterests: userEntered.interests,
    experiences: userEntered.experiences || prof.experiences || [],
    verifiedCampusActivity: campusActivity,
  };
}

export function adaptPlatformUser(u: any): PlatformUser {
  let role = "STUDENT";
  const roles: string[] = Array.isArray(u.roles)
    ? u.roles.map((r: any) => (typeof r === "string" ? r : r.role?.name || r.name))
    : [];
  if (roles.includes("ADMIN") || roles.includes("SUPER_ADMIN")) role = "ADMIN";
  else if (roles.includes("ORGANIZER")) role = "ORGANIZER";

  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: role as any,
    university: u.studentProfile?.university?.name || u.university || "University",
    status: u.isActive !== false ? "ACTIVE" : "SUSPENDED",
    joinedAt: u.createdAt ? new Date(u.createdAt).toISOString() : new Date().toISOString(),
  };
}

export function adaptReport(r: any): Report {
  return {
    id: r.id,
    target: r.targetId || r.target || "Content",
    targetType: r.targetType || "EVENT",
    reporter: r.reporter?.name || r.reporter || "Anonymous Student",
    reason: r.reason || "Policy Violation",
    severity: r.severity || "MEDIUM",
    status: r.status === "RESOLVED" ? "RESOLVED" : r.status === "REVIEWED" ? "REVIEWING" : "OPEN",
    submittedAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
    notes: r.actionNotes || r.notes,
  };
}

export function adaptVerification(v: any): Verification {
  return {
    id: v.id,
    organizationName: v.organization?.name || v.organizationName || "Student Club",
    universityName: v.organization?.university?.name || v.universityName || "University",
    applicant: v.requestedBy?.name || v.applicant || "Club Officer",
    status: v.status === "APPROVED" ? "VERIFIED" : v.status === "REJECTED" ? "REJECTED" : "PENDING",
    submittedAt: v.createdAt ? new Date(v.createdAt).toISOString() : new Date().toISOString(),
    documents: v.documentUrl ? [v.documentUrl] : (v.documents || []),
  };
}

export function adaptOrganizationMember(m: any): OrganizationMember {
  const userName = m.user?.name || m.name || "Member";
  const userEmail = m.user?.email || m.email || null;
  const userAvatar = m.user?.avatarUrl || m.avatarUrl || null;
  const userVerified = Boolean(m.user?.universityEmailVerified ?? m.universityEmailVerified ?? false);
  const userUni = m.user?.university || m.university || null;

  return {
    id: m.id || String(Math.random()),
    userId: m.userId || m.user?.id,
    organizationId: m.organizationId,
    name: userName,
    role: m.role || "MEMBER",
    requestedRole: m.requestedRole || null,
    status: m.status || "ACTIVE",
    title: m.title || null,
    canCreateEvents: Boolean(m.canCreateEvents),
    email: userEmail,
    avatarUrl: userAvatar,
    universityEmailVerified: userVerified,
    university: userUni,
    requestMessage: m.requestMessage || null,
    reviewNotes: m.reviewNotes || null,
    isFounder: Boolean(m.isFounder),
    joinedAt: m.joinedAt ? new Date(m.joinedAt).toISOString() : new Date().toISOString(),
    verifiedAt: m.verifiedAt ? new Date(m.verifiedAt).toISOString() : null,
    reviewedBy: m.reviewedBy || null,
    reviewedAt: m.reviewedAt ? new Date(m.reviewedAt).toISOString() : null,
  };
}

