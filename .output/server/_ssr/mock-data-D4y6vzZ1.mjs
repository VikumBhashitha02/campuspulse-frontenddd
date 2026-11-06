import { s as resolveMediaUrl } from "./client-DCT7i2UG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mock-data-D4y6vzZ1.js
function getInitials(name) {
	if (!name) return "CP";
	return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
}
function adaptEvent(e, extras) {
	if (!e) return null;
	const orgName = e.organization?.name || e.organizationName || "Campus Organization";
	const uniName = e.university?.name || e.organization?.university?.name || e.universityName || "Sri Lanka";
	const catName = e.category?.name || e.categoryName || "General";
	let mode = "PHYSICAL";
	if (e.mode === "ONLINE") mode = "ONLINE";
	else if (e.mode === "HYBRID") mode = "HYBRID";
	else mode = "PHYSICAL";
	let eligibilityList = [];
	if (Array.isArray(e.eligibility)) eligibilityList = e.eligibility;
	else if (typeof e.eligibility === "string" && e.eligibility.trim()) eligibilityList = e.eligibility.split(/\r?\n|•|\*/).map((s) => s.trim()).filter(Boolean);
	if (eligibilityList.length === 0) eligibilityList = ["Open to all undergraduate and postgraduate university students."];
	let requirementsList = [];
	if (Array.isArray(e.requirements)) requirementsList = e.requirements;
	else if (Array.isArray(e.skills) && e.skills.length > 0) requirementsList = e.skills.map((s) => `Skill proficiency: ${s}`);
	else requirementsList = ["Active university student ID registration", "Team participation per rules"];
	const startDateStr = e.startDate ? new Date(e.startDate).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
	const endDateStr = e.endDate ? new Date(e.endDate).toISOString() : startDateStr;
	const deadlineStr = e.registrationDeadline ? new Date(e.registrationDeadline).toISOString() : startDateStr;
	return {
		id: e.id,
		slug: e.slug || e.id,
		title: e.title || "Untitled Opportunity",
		summary: e.shortDescription || e.summary || (e.description ? e.description.slice(0, 160) + "..." : "No summary available."),
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
		prize: e.prizeInfo || e.prize || void 0,
		status: e.status || "PUBLISHED",
		views: e.viewCount ?? e.views ?? 0,
		registrationClicks: e.registrationClicks ?? 0,
		registrations: e._count?.registrations ?? e.registrations ?? 0,
		eligibility: eligibilityList,
		requirements: requirementsList,
		timeline: Array.isArray(e.timeline) ? e.timeline : [
			{
				label: "Registration Closes",
				date: deadlineStr
			},
			{
				label: "Event Commences",
				date: startDateStr
			},
			{
				label: "Final Wrap-up",
				date: endDateStr
			}
		],
		teamSize: e.teamSize || void 0,
		bookmarked: extras?.bookmarked ?? Boolean(e.bookmarked),
		registered: extras?.registered ?? Boolean(e.registered),
		trendingScore: e.trendingScore ?? Math.round((e.viewCount ?? 0) * 1.5 + (e._count?.registrations ?? 0) * 5),
		rejectionReason: e.rejectionReason || void 0,
		opportunityType: e.opportunityType || "COMPETITION",
		participationScope: e.participationScope || "INTER_UNIVERSITY",
		eligibilitySummary: e.eligibilitySummary || void 0,
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
		isFree: e.isFree !== void 0 ? Boolean(e.isFree) : true,
		price: e.price !== void 0 && e.price !== null ? Number(e.price) : null,
		currency: e.currency || "LKR",
		capacity: e.capacity ?? null,
		registrationSettings: e.registrationSettings || null,
		volunteerRoles: Array.isArray(e.volunteerRoles) ? e.volunteerRoles : [],
		volunteerResponsibilities: Array.isArray(e.volunteerResponsibilities) ? e.volunteerResponsibilities : [],
		volunteerBenefits: Array.isArray(e.volunteerBenefits) ? e.volunteerBenefits : [],
		volunteerAvailability: e.volunteerAvailability || null,
		volunteerCapacity: e.volunteerCapacity ?? null,
		pricingMode: e.pricingMode || "FREE_FOR_ALL",
		studentPrice: e.studentPrice !== void 0 && e.studentPrice !== null ? Number(e.studentPrice) : null,
		externalPrice: e.externalPrice !== void 0 && e.externalPrice !== null ? Number(e.externalPrice) : null,
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
		artistNames: Array.isArray(e.artistNames) ? e.artistNames : [],
		musicGenre: e.musicGenre || null,
		performanceSchedule: e.performanceSchedule || null,
		productionTitle: e.productionTitle || null,
		dramaGenre: e.dramaGenre || null,
		castMembers: Array.isArray(e.castMembers) ? e.castMembers : [],
		director: e.director || null,
		synopsis: e.synopsis || null,
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
		courseLevel: e.courseLevel || null,
		courseCode: e.courseCode || null,
		courseDuration: e.courseDuration || null,
		workloadHoursPerWeek: e.workloadHoursPerWeek || null,
		prerequisites: e.prerequisites || null,
		syllabus: e.syllabus || null,
		instructor: e.instructor || null,
		hasCertificate: e.hasCertificate !== void 0 ? Boolean(e.hasCertificate) : true,
		enrollmentUrl: e.enrollmentUrl || null,
		allowClubTransfer: Boolean(e.allowClubTransfer),
		allowOnlineGateway: e.allowOnlineGateway !== void 0 ? Boolean(e.allowOnlineGateway) : true,
		customPaymentInstructions: e.customPaymentInstructions || null,
		organization: e.organization ? adaptOrganization(e.organization) : void 0
	};
}
function adaptUniversity(u) {
	return {
		id: u.id,
		slug: u.slug,
		name: u.name,
		shortName: u.code || u.shortName || getInitials(u.name),
		code: u.code,
		location: u.city ? `${u.city}, ${u.country || "Sri Lanka"}` : u.location || "Sri Lanka",
		logoColor: u.logoColor || "#1E3A8A",
		logoUrl: u.logoUrl || null,
		bannerUrl: u.bannerUrl || null,
		websiteUrl: u.websiteUrl || null,
		domain: u.domain || null,
		isVerified: u.isVerified ?? true,
		about: u.description || u.about || "Premier university offering diverse academic opportunities.",
		description: u.description || u.about || "Premier university offering diverse academic opportunities.",
		faculties: (u.faculties || []).map((f) => ({
			id: f.id,
			name: f.name,
			code: f.code,
			departments: (f.departments || []).map((d) => ({
				id: d.id,
				name: d.name,
				code: d.code
			}))
		})),
		facultyCount: u._count?.faculties ?? (u.faculties?.length || 0),
		organizationCount: u._count?.organizations ?? u.organizationCount ?? (u.organizations?.length || 0),
		eventCount: u._count?.events ?? u.eventCount ?? (u.events?.length || 0)
	};
}
function adaptOrganization(o) {
	const leadership = (o.members || []).map((m) => ({
		id: m.id || m.userId,
		name: m.user?.name || m.name || "Executive Member",
		role: m.title || m.role || "Member"
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
		paymentInstructions: o.paymentInstructions || null
	};
}
function adaptTeam(t) {
	const members = (t.members || []).map((m) => ({
		id: m.id || m.userId,
		userId: m.userId || m.user?.id,
		name: m.user?.name || m.name || "Team Member",
		role: m.role === "LEADER" ? "Team Leader" : "Member",
		isLeader: m.role === "LEADER" || Boolean(m.isLeader),
		avatarUrl: m.user?.avatarUrl || m.avatarUrl || null,
		studentProfile: m.user?.studentProfile || m.studentProfile || null
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
		leader: t.creator?.name || members.find((m) => m.isLeader)?.name || "Squad Leader",
		leaderAvatarUrl: t.creator?.avatarUrl || members.find((m) => m.isLeader)?.avatarUrl || null,
		members,
		requiredRoles: t.requiredRoles || [],
		skills: t.requiredSkills || t.skills || [],
		maxMembers,
		openSlots,
		isOpen: t.isOpen !== void 0 ? Boolean(t.isOpen) : openSlots > 0,
		compatibility: t.matchScore ?? t.compatibility ?? 75,
		availability: t.availability || "FLEXIBLE",
		joinRequests: t.joinRequests || [],
		matchExplanation: t.matchExplanation || null
	};
}
function resolveNotificationDestination(rawHref, kind) {
	if (rawHref && typeof rawHref === "string" && rawHref.trim()) {
		let clean = rawHref.trim();
		if (clean.startsWith("/teams")) {
			const match = clean.match(/^\/teams\?teamId=([^&]+)/);
			if (match && match[1]) return `/account/teams/${match[1]}`;
			return clean.replace(/^\/teams/, "/account/teams");
		}
		if (clean.startsWith("/account/teams?teamId=")) {
			const match = clean.match(/^\/account\/teams\?teamId=([^&]+)/);
			if (match && match[1]) return `/account/teams/${match[1]}`;
		}
		if (clean === "/events" || clean === "/events/") return "/explore";
		if (clean === "/dashboard" || clean === "/feed") return "/account";
		if (clean === "/organizations" || clean === "/organizations/") return "/explore";
		if (clean === "/universities" || clean === "/universities/") return "/universities";
		if (clean.startsWith("/")) return clean;
	}
	if (kind === "REGISTRATION") return "/account/registrations";
	if (kind === "TEAM_REQUEST" || kind === "TEAM_ACCEPTED") return "/account/teams";
	if (kind === "DEADLINE") return "/account/calendar";
	if (kind === "ORGANIZATION") return "/explore";
	return "/explore";
}
function adaptNotification(n) {
	let kind = "ORGANIZATION";
	const t = String(n.type || "").toUpperCase();
	if (t.includes("DEADLINE") || t.includes("REMINDER")) kind = "DEADLINE";
	else if (t.includes("REGISTRATION")) kind = "REGISTRATION";
	else if (t === "TEAM_REQUEST" || t.includes("TEAM") && (t.includes("REQUEST") || t.includes("INVITE"))) kind = "TEAM_REQUEST";
	else if (t.includes("TEAM") && (t.includes("ACCEPT") || t.includes("UPDATE"))) kind = "TEAM_ACCEPTED";
	else if (t.includes("EVENT") || t.includes("CANCEL") || t.includes("VOLUNTEER")) kind = "EVENT_UPDATE";
	else if (t.includes("ORGANIZATION") || t.includes("MEMBERSHIP") || t.includes("LEADERSHIP")) kind = "ORGANIZATION";
	const href = resolveNotificationDestination(n.linkUrl || n.href, kind);
	return {
		id: n.id,
		kind,
		title: n.title,
		body: n.message || n.body || "",
		createdAt: n.createdAt ? new Date(n.createdAt).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
		read: Boolean(n.isRead ?? n.read ?? false),
		href
	};
}
function adaptStudentProfile(u) {
	const prof = u.studentProfile || u.profile || {};
	const userEntered = u.userEnteredInfo || {};
	const uniIdentity = u.universityIdentity || {};
	const campusActivity = u.verifiedCampusActivity;
	const rawSkills = userEntered.skills && Array.isArray(userEntered.skills) ? userEntered.skills.map((s) => typeof s === "string" ? s : s.name) : prof.skills || u.skills || [];
	const rawInterests = userEntered.interests && Array.isArray(userEntered.interests) ? userEntered.interests.map((i) => typeof i === "string" ? i : i.name) : prof.interests || u.interests || [];
	const rawCareer = userEntered.careerInterests || prof.careerInterests || prof.interests || u.careerInterests || [];
	const uniName = uniIdentity.university?.name || prof.university?.name || u.university?.name || u.universityName || "University of Colombo";
	const facultyName = uniIdentity.faculty?.name || prof.faculty?.name || u.faculty || "Faculty of Science";
	const deptName = uniIdentity.department?.name || prof.department?.name || u.department || "Department of Computer Science";
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
		universityIdentity: uniIdentity.university ? uniIdentity : void 0,
		normalizedSkills: userEntered.skills,
		normalizedInterests: userEntered.interests,
		experiences: userEntered.experiences || prof.experiences || [],
		verifiedCampusActivity: campusActivity
	};
}
function adaptPlatformUser(u) {
	let role = "STUDENT";
	const roles = Array.isArray(u.roles) ? u.roles.map((r) => typeof r === "string" ? r : r.role?.name || r.name) : [];
	if (roles.includes("ADMIN") || roles.includes("SUPER_ADMIN")) role = "ADMIN";
	else if (roles.includes("ORGANIZER")) role = "ORGANIZER";
	return {
		id: u.id,
		name: u.name,
		email: u.email,
		role,
		university: u.studentProfile?.university?.name || u.university || "University",
		status: u.isActive !== false ? "ACTIVE" : "SUSPENDED",
		joinedAt: u.createdAt ? new Date(u.createdAt).toISOString() : (/* @__PURE__ */ new Date()).toISOString()
	};
}
function adaptReport(r) {
	return {
		id: r.id,
		target: r.targetId || r.target || "Content",
		targetType: r.targetType || "EVENT",
		reporter: r.reporter?.name || r.reporter || "Anonymous Student",
		reason: r.reason || "Policy Violation",
		severity: r.severity || "MEDIUM",
		status: r.status === "RESOLVED" ? "RESOLVED" : r.status === "REVIEWED" ? "REVIEWING" : "OPEN",
		submittedAt: r.createdAt ? new Date(r.createdAt).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
		notes: r.actionNotes || r.notes
	};
}
function adaptVerification(v) {
	return {
		id: v.id,
		organizationName: v.organization?.name || v.organizationName || "Student Club",
		universityName: v.organization?.university?.name || v.universityName || "University",
		applicant: v.requestedBy?.name || v.applicant || "Club Officer",
		status: v.status === "APPROVED" ? "VERIFIED" : v.status === "REJECTED" ? "REJECTED" : "PENDING",
		submittedAt: v.createdAt ? new Date(v.createdAt).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
		documents: v.documentUrl ? [v.documentUrl] : v.documents || []
	};
}
function adaptOrganizationMember(m) {
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
		joinedAt: m.joinedAt ? new Date(m.joinedAt).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
		verifiedAt: m.verifiedAt ? new Date(m.verifiedAt).toISOString() : null,
		reviewedBy: m.reviewedBy || null,
		reviewedAt: m.reviewedAt ? new Date(m.reviewedAt).toISOString() : null
	};
}
var d = (iso) => new Date(iso).toISOString();
var events = [
	{
		id: "e1",
		slug: "codesprint-9",
		title: "CodeSprint 9.0 — National Hackathon",
		summary: "Sri Lanka's largest inter-university hackathon returns with a 36-hour build challenge on AI for public good.",
		description: "CodeSprint is the flagship hackathon of the IEEE Student Branch of the University of Moratuwa. Teams of three to four undergraduates compete across three rounds: an online ideathon, a mentored prototype sprint, and a 36-hour on-site final at the Faculty of Engineering. This edition focuses on applied AI for public services — transport, healthcare access and education equity.",
		categoryId: "c1",
		categoryName: "Hackathons",
		organizationId: "o1",
		organizationName: "IEEE Student Branch of UoM",
		organizationInitials: "IE",
		organizationVerified: true,
		universityId: "u2",
		universityName: "University of Moratuwa",
		mode: "HYBRID",
		location: "Faculty of Engineering, Katubedda",
		startDate: d("2026-09-26T09:00:00Z"),
		endDate: d("2026-09-27T21:00:00Z"),
		registrationDeadline: d("2026-09-09T23:59:00Z"),
		prize: "LKR 500,000 prize pool",
		status: "PUBLISHED",
		views: 8420,
		registrationClicks: 1240,
		registrations: 812,
		eligibility: [
			"Undergraduates enrolled at any Sri Lankan university",
			"Teams of 3–4 members",
			"At least one member must attend the on-site final"
		],
		requirements: [
			"Valid student ID",
			"GitHub repository for the submitted prototype",
			"Five minute demo video for round two"
		],
		timeline: [
			{
				label: "Registrations close",
				date: d("2026-09-09T23:59:00Z")
			},
			{
				label: "Ideathon submissions",
				date: d("2026-09-14T23:59:00Z")
			},
			{
				label: "Mentored sprint",
				date: d("2026-09-19T09:00:00Z")
			},
			{
				label: "On-site final",
				date: d("2026-09-26T09:00:00Z")
			}
		],
		teamSize: "3–4 members",
		trendingScore: 98
	},
	{
		id: "e2",
		slug: "innovate-business-case-challenge",
		title: "Innovate 2026 Business Case Challenge",
		summary: "A national case competition where management undergraduates solve a live retail expansion brief.",
		description: "Innovate is an inter-university business case competition judged by senior industry leaders. Teams receive a live brief from a partner retail group and present a market entry strategy across three elimination rounds.",
		categoryId: "c2",
		categoryName: "Competitions",
		organizationId: "o2",
		organizationName: "AIESEC in University of Colombo",
		organizationInitials: "AI",
		organizationVerified: true,
		universityId: "u1",
		universityName: "University of Colombo",
		mode: "PHYSICAL",
		location: "FMF Auditorium, Colombo 03",
		startDate: d("2026-10-04T08:30:00Z"),
		endDate: d("2026-10-05T17:00:00Z"),
		registrationDeadline: d("2026-09-07T23:59:00Z"),
		prize: "LKR 250,000 + internships",
		status: "PUBLISHED",
		views: 5310,
		registrationClicks: 890,
		registrations: 412,
		eligibility: ["Undergraduates from any faculty", "Teams of 4"],
		requirements: ["Slide deck (max 12 slides)", "Team registration form"],
		timeline: [
			{
				label: "Registrations close",
				date: d("2026-09-07T23:59:00Z")
			},
			{
				label: "Case release",
				date: d("2026-09-12T09:00:00Z")
			},
			{
				label: "Semi-finals",
				date: d("2026-09-27T09:00:00Z")
			},
			{
				label: "Grand finale",
				date: d("2026-10-05T09:00:00Z")
			}
		],
		teamSize: "4 members",
		trendingScore: 87
	},
	{
		id: "e3",
		slug: "intro-to-machine-learning-workshop",
		title: "Hands-on Machine Learning Workshop Series",
		summary: "Four evening sessions covering practical ML workflows with Python, from data cleaning to model deployment.",
		description: "A practical, laptop-required workshop series for students with basic Python knowledge. Each session pairs a short lecture with a guided lab, ending with a small deployed model project.",
		categoryId: "c3",
		categoryName: "Workshops",
		organizationId: "o4",
		organizationName: "USJ Technology Society",
		organizationInitials: "TS",
		organizationVerified: false,
		universityId: "u4",
		universityName: "University of Sri Jayewardenepura",
		mode: "ONLINE",
		location: "Online (Zoom)",
		startDate: d("2026-09-15T13:30:00Z"),
		endDate: d("2026-09-24T15:30:00Z"),
		registrationDeadline: d("2026-09-13T23:59:00Z"),
		status: "PUBLISHED",
		views: 3120,
		registrationClicks: 640,
		registrations: 486,
		eligibility: ["Open to all undergraduates", "Basic Python knowledge recommended"],
		requirements: ["Laptop with Python 3.11", "Stable internet connection"],
		timeline: [
			{
				label: "Registrations close",
				date: d("2026-09-13T23:59:00Z")
			},
			{
				label: "Session 1 — Data wrangling",
				date: d("2026-09-15T13:30:00Z")
			},
			{
				label: "Session 4 — Deployment",
				date: d("2026-09-24T13:30:00Z")
			}
		],
		trendingScore: 74
	},
	{
		id: "e4",
		slug: "undergraduate-research-symposium-2026",
		title: "Undergraduate Research Symposium 2026",
		summary: "Present your undergraduate research to faculty panels and get publication mentoring.",
		description: "An annual symposium where undergraduates present original research across science, medicine, social sciences and engineering tracks. Selected abstracts receive publication support from faculty mentors.",
		categoryId: "c5",
		categoryName: "Research",
		organizationId: "o5",
		organizationName: "UoC Undergraduate Research Collective",
		organizationInitials: "RC",
		organizationVerified: true,
		universityId: "u1",
		universityName: "University of Colombo",
		mode: "PHYSICAL",
		location: "Science Faculty Auditorium, Colombo 03",
		startDate: d("2026-11-12T08:00:00Z"),
		endDate: d("2026-11-13T17:00:00Z"),
		registrationDeadline: d("2026-10-10T23:59:00Z"),
		prize: "Best paper awards per track",
		status: "PUBLISHED",
		views: 2140,
		registrationClicks: 320,
		registrations: 198,
		eligibility: ["Undergraduates with original research", "Abstract required at submission"],
		requirements: ["300-word abstract", "Supervisor endorsement"],
		timeline: [
			{
				label: "Abstract submissions close",
				date: d("2026-10-10T23:59:00Z")
			},
			{
				label: "Acceptance notifications",
				date: d("2026-10-24T09:00:00Z")
			},
			{
				label: "Symposium",
				date: d("2026-11-12T08:00:00Z")
			}
		],
		trendingScore: 61
	},
	{
		id: "e5",
		slug: "green-campus-volunteer-drive",
		title: "Green Campus Volunteer Drive",
		summary: "A weekend community project restoring the Mahaweli riverbank with 200 volunteers.",
		description: "Join a two-day volunteering project combining riverbank clean-up, native tree planting and a community awareness programme with nearby schools.",
		categoryId: "c7",
		categoryName: "Volunteering",
		organizationId: "o3",
		organizationName: "Rotaract Club of UoP",
		organizationInitials: "RC",
		organizationVerified: true,
		universityId: "u3",
		universityName: "University of Peradeniya",
		mode: "PHYSICAL",
		location: "Mahaweli riverbank, Kandy",
		startDate: d("2026-09-19T07:00:00Z"),
		endDate: d("2026-09-20T16:00:00Z"),
		registrationDeadline: d("2026-09-16T23:59:00Z"),
		status: "PUBLISHED",
		views: 1680,
		registrationClicks: 410,
		registrations: 205,
		eligibility: ["Open to all students"],
		requirements: ["Comfortable outdoor clothing", "Signed consent form"],
		timeline: [
			{
				label: "Registrations close",
				date: d("2026-09-16T23:59:00Z")
			},
			{
				label: "Volunteer briefing",
				date: d("2026-09-18T17:00:00Z")
			},
			{
				label: "Project days",
				date: d("2026-09-19T07:00:00Z")
			}
		],
		trendingScore: 55
	},
	{
		id: "e6",
		slug: "graduate-careers-conference",
		title: "Graduate Careers Conference 2026",
		summary: "Meet 40+ employers, attend CV clinics and interview labs across a single career-focused day.",
		description: "A full-day careers conference bringing together technology, banking, apparel and logistics employers with final year undergraduates. Includes CV clinics, mock interviews and a graduate programme fair.",
		categoryId: "c8",
		categoryName: "Career",
		organizationId: "o2",
		organizationName: "AIESEC in University of Colombo",
		organizationInitials: "AI",
		organizationVerified: true,
		universityId: "u1",
		universityName: "University of Colombo",
		mode: "HYBRID",
		location: "BMICH, Colombo 07",
		startDate: d("2026-10-18T08:30:00Z"),
		endDate: d("2026-10-18T18:00:00Z"),
		registrationDeadline: d("2026-10-12T23:59:00Z"),
		status: "PUBLISHED",
		views: 4460,
		registrationClicks: 980,
		registrations: 731,
		eligibility: ["Penultimate and final year undergraduates"],
		requirements: ["Updated CV (PDF)"],
		timeline: [
			{
				label: "Registrations close",
				date: d("2026-10-12T23:59:00Z")
			},
			{
				label: "CV clinic slots open",
				date: d("2026-10-14T09:00:00Z")
			},
			{
				label: "Conference day",
				date: d("2026-10-18T08:30:00Z")
			}
		],
		trendingScore: 82
	},
	{
		id: "e7",
		slug: "robotics-design-challenge",
		title: "Robotics Design Challenge",
		summary: "Design, build and race an autonomous line-following robot in a timed arena final.",
		description: "An engineering design competition where teams build autonomous robots to complete an obstacle arena. Hardware kits are provided to shortlisted teams.",
		categoryId: "c2",
		categoryName: "Competitions",
		organizationId: "o1",
		organizationName: "IEEE Student Branch of UoM",
		organizationInitials: "IE",
		organizationVerified: true,
		universityId: "u2",
		universityName: "University of Moratuwa",
		mode: "PHYSICAL",
		location: "Sumanadasa Building, Katubedda",
		startDate: d("2026-10-24T09:00:00Z"),
		endDate: d("2026-10-24T18:00:00Z"),
		registrationDeadline: d("2026-09-30T23:59:00Z"),
		prize: "LKR 150,000 + hardware kits",
		status: "PUBLISHED",
		views: 2960,
		registrationClicks: 520,
		registrations: 264,
		eligibility: ["Engineering and technology undergraduates", "Teams of 2–3"],
		requirements: ["Design proposal PDF", "Bill of materials"],
		timeline: [
			{
				label: "Registrations close",
				date: d("2026-09-30T23:59:00Z")
			},
			{
				label: "Kit distribution",
				date: d("2026-10-06T09:00:00Z")
			},
			{
				label: "Arena final",
				date: d("2026-10-24T09:00:00Z")
			}
		],
		teamSize: "2–3 members",
		trendingScore: 70
	},
	{
		id: "e8",
		slug: "public-health-seminar-series",
		title: "Public Health Seminar: Climate & Community Health",
		summary: "A one-evening seminar with practitioners on climate-driven health risks in coastal districts.",
		description: "An open seminar bringing together public health researchers and district medical officers to discuss climate adaptation in community health planning.",
		categoryId: "c6",
		categoryName: "Seminars",
		organizationId: "o5",
		organizationName: "UoC Undergraduate Research Collective",
		organizationInitials: "RC",
		organizationVerified: true,
		universityId: "u1",
		universityName: "University of Colombo",
		mode: "ONLINE",
		location: "Online (Teams)",
		startDate: d("2026-09-11T14:00:00Z"),
		endDate: d("2026-09-11T16:00:00Z"),
		registrationDeadline: d("2026-09-10T18:00:00Z"),
		status: "PUBLISHED",
		views: 980,
		registrationClicks: 210,
		registrations: 176,
		eligibility: ["Open to all"],
		requirements: ["None"],
		timeline: [{
			label: "Seminar",
			date: d("2026-09-11T14:00:00Z")
		}],
		trendingScore: 44
	},
	{
		id: "e9",
		slug: "fintech-summit-2026",
		title: "Student FinTech Summit 2026",
		summary: "A student-run conference on digital payments, regulation and financial inclusion.",
		description: "A one-day conference with keynote sessions from central bank economists, fintech founders and compliance leaders, plus a student pitch showcase.",
		categoryId: "c4",
		categoryName: "Conferences",
		organizationId: "o4",
		organizationName: "USJ Technology Society",
		organizationInitials: "TS",
		organizationVerified: false,
		universityId: "u4",
		universityName: "University of Sri Jayewardenepura",
		mode: "HYBRID",
		location: "USJ Auditorium, Nugegoda",
		startDate: d("2026-11-01T08:30:00Z"),
		endDate: d("2026-11-01T17:30:00Z"),
		registrationDeadline: d("2026-10-25T23:59:00Z"),
		status: "PUBLISHED",
		views: 1420,
		registrationClicks: 260,
		registrations: 141,
		eligibility: ["Open to all undergraduates"],
		requirements: ["None"],
		timeline: [{
			label: "Registrations close",
			date: d("2026-10-25T23:59:00Z")
		}, {
			label: "Summit day",
			date: d("2026-11-01T08:30:00Z")
		}],
		trendingScore: 48
	},
	{
		id: "e10",
		slug: "datathon-analytics-cup",
		title: "Analytics Cup — Open Datathon",
		summary: "48 hours, one public dataset, and a leaderboard that closes at midnight Sunday.",
		description: "An open datathon on national transport data. Teams submit predictions to a live leaderboard and defend their methodology in a short final review.",
		categoryId: "c1",
		categoryName: "Hackathons",
		organizationId: "o1",
		organizationName: "IEEE Student Branch of UoM",
		organizationInitials: "IE",
		organizationVerified: true,
		universityId: "u2",
		universityName: "University of Moratuwa",
		mode: "ONLINE",
		location: "Online",
		startDate: d("2026-09-12T09:00:00Z"),
		endDate: d("2026-09-14T23:59:00Z"),
		registrationDeadline: d("2026-09-08T23:59:00Z"),
		prize: "LKR 100,000",
		status: "PUBLISHED",
		views: 3380,
		registrationClicks: 720,
		registrations: 388,
		eligibility: ["Teams of 1–3", "Any university"],
		requirements: ["Kaggle account", "Reproducible notebook"],
		timeline: [
			{
				label: "Registrations close",
				date: d("2026-09-08T23:59:00Z")
			},
			{
				label: "Leaderboard opens",
				date: d("2026-09-12T09:00:00Z")
			},
			{
				label: "Final review",
				date: d("2026-09-15T10:00:00Z")
			}
		],
		teamSize: "1–3 members",
		trendingScore: 91
	},
	{
		id: "e11",
		slug: "design-thinking-bootcamp",
		title: "Design Thinking Bootcamp",
		summary: "A weekend bootcamp on user research, rapid prototyping and usability testing.",
		description: "A hands-on bootcamp where participants take a campus problem from field interviews to a tested paper prototype in two days.",
		categoryId: "c3",
		categoryName: "Workshops",
		organizationId: "o3",
		organizationName: "Rotaract Club of UoP",
		organizationInitials: "RC",
		organizationVerified: true,
		universityId: "u3",
		universityName: "University of Peradeniya",
		mode: "PHYSICAL",
		location: "Engineering Faculty, Peradeniya",
		startDate: d("2026-10-11T09:00:00Z"),
		endDate: d("2026-10-12T17:00:00Z"),
		registrationDeadline: d("2026-10-02T23:59:00Z"),
		status: "PUBLISHED",
		views: 1240,
		registrationClicks: 240,
		registrations: 112,
		eligibility: ["Open to all undergraduates"],
		requirements: ["Notebook and pens"],
		timeline: [{
			label: "Registrations close",
			date: d("2026-10-02T23:59:00Z")
		}, {
			label: "Bootcamp",
			date: d("2026-10-11T09:00:00Z")
		}],
		trendingScore: 39
	},
	{
		id: "e12",
		slug: "campus-photography-awards",
		title: "Campus Photography Awards",
		summary: "Submit your best campus life photograph across four themed categories.",
		description: "An open photography competition celebrating campus life, with an exhibition of shortlisted entries at the university library.",
		categoryId: "c2",
		categoryName: "Competitions",
		organizationId: "o2",
		organizationName: "AIESEC in University of Colombo",
		organizationInitials: "AI",
		organizationVerified: true,
		universityId: "u1",
		universityName: "University of Colombo",
		mode: "ONLINE",
		location: "Online submissions",
		startDate: d("2026-09-08T00:00:00Z"),
		endDate: d("2026-09-30T23:59:00Z"),
		registrationDeadline: d("2026-09-06T23:59:00Z"),
		prize: "LKR 50,000 + exhibition",
		status: "PUBLISHED",
		views: 890,
		registrationClicks: 150,
		registrations: 96,
		eligibility: ["Open to all students"],
		requirements: ["Original photographs only", "Max 3 entries"],
		timeline: [{
			label: "Submissions close",
			date: d("2026-09-06T23:59:00Z")
		}, {
			label: "Exhibition",
			date: d("2026-09-30T10:00:00Z")
		}],
		trendingScore: 33
	},
	{
		id: "e13",
		slug: "cyber-security-capture-the-flag",
		title: "Capture the Flag — Cyber Security Championship",
		summary: "A jeopardy-style CTF covering web exploitation, forensics and cryptography.",
		categoryId: "c1",
		categoryName: "Hackathons",
		description: "An inter-university CTF with 30 challenges across five categories. Top three teams progress to a regional qualifier.",
		organizationId: "o1",
		organizationName: "IEEE Student Branch of UoM",
		organizationInitials: "IE",
		organizationVerified: true,
		universityId: "u2",
		universityName: "University of Moratuwa",
		mode: "ONLINE",
		location: "Online",
		startDate: d("2026-10-03T10:00:00Z"),
		endDate: d("2026-10-03T22:00:00Z"),
		registrationDeadline: d("2026-09-25T23:59:00Z"),
		prize: "LKR 120,000",
		status: "PENDING_REVIEW",
		views: 0,
		registrationClicks: 0,
		registrations: 0,
		eligibility: ["Teams of up to 4"],
		requirements: ["Linux environment recommended"],
		timeline: [{
			label: "CTF window",
			date: d("2026-10-03T10:00:00Z")
		}],
		teamSize: "up to 4",
		trendingScore: 0
	},
	{
		id: "e14",
		slug: "startup-pitch-night-draft",
		title: "Startup Pitch Night",
		summary: "An evening of five-minute student startup pitches judged by angel investors.",
		description: "Draft listing for the November pitch night. Venue and judges to be confirmed.",
		categoryId: "c8",
		categoryName: "Career",
		organizationId: "o4",
		organizationName: "USJ Technology Society",
		organizationInitials: "TS",
		organizationVerified: false,
		universityId: "u4",
		universityName: "University of Sri Jayewardenepura",
		mode: "PHYSICAL",
		location: "TBC",
		startDate: d("2026-11-20T17:00:00Z"),
		endDate: d("2026-11-20T21:00:00Z"),
		registrationDeadline: d("2026-11-10T23:59:00Z"),
		status: "DRAFT",
		views: 0,
		registrationClicks: 0,
		registrations: 0,
		eligibility: ["Student founders"],
		requirements: ["Pitch deck"],
		timeline: [],
		trendingScore: 0
	},
	{
		id: "e15",
		slug: "inter-faculty-debate-expired",
		title: "Inter-Faculty Debate Championship",
		summary: "The annual debate championship across all faculties.",
		description: "Registrations for this edition have closed and the event has concluded.",
		categoryId: "c2",
		categoryName: "Competitions",
		organizationId: "o2",
		organizationName: "AIESEC in University of Colombo",
		organizationInitials: "AI",
		organizationVerified: true,
		universityId: "u1",
		universityName: "University of Colombo",
		mode: "PHYSICAL",
		location: "New Arts Theatre, Colombo 03",
		startDate: d("2026-08-02T09:00:00Z"),
		endDate: d("2026-08-03T18:00:00Z"),
		registrationDeadline: d("2026-07-20T23:59:00Z"),
		status: "EXPIRED",
		views: 2210,
		registrationClicks: 380,
		registrations: 240,
		eligibility: ["Faculty debate teams"],
		requirements: ["Team of 3 speakers"],
		timeline: [],
		trendingScore: 0
	},
	{
		id: "e16",
		slug: "crypto-mining-club-rejected",
		title: "Campus Crypto Trading Bootcamp",
		summary: "Rejected listing pending compliance review.",
		description: "This listing was rejected during moderation.",
		categoryId: "c3",
		categoryName: "Workshops",
		organizationId: "o4",
		organizationName: "USJ Technology Society",
		organizationInitials: "TS",
		organizationVerified: false,
		universityId: "u4",
		universityName: "University of Sri Jayewardenepura",
		mode: "ONLINE",
		location: "Online",
		startDate: d("2026-09-28T14:00:00Z"),
		endDate: d("2026-09-28T17:00:00Z"),
		registrationDeadline: d("2026-09-20T23:59:00Z"),
		status: "REJECTED",
		views: 0,
		registrationClicks: 0,
		registrations: 0,
		eligibility: [],
		requirements: [],
		timeline: [],
		rejectionReason: "Financial promotion without faculty endorsement.",
		trendingScore: 0
	}
];
d("2026-08-29T10:12:00Z"), d("2026-09-01T18:40:00Z"), d("2026-09-04T09:05:00Z"), d("2026-07-10T11:00:00Z");
d("2026-09-05T08:20:00Z"), d("2026-09-05T15:44:00Z");
d("2026-09-06T05:00:00Z"), d("2026-09-05T08:20:00Z"), d("2026-09-01T18:41:00Z"), d("2026-08-30T12:00:00Z"), d("2026-08-28T09:12:00Z"), d("2026-08-26T16:30:00Z");
d("2026-02-11T09:00:00Z"), d("2025-11-02T09:00:00Z"), d("2025-08-19T09:00:00Z"), d("2026-01-05T09:00:00Z"), d("2025-06-01T09:00:00Z"), d("2026-03-22T09:00:00Z");
d("2026-09-04T11:20:00Z"), d("2026-09-02T14:05:00Z"), d("2026-08-21T08:00:00Z");
d("2026-09-03T10:00:00Z"), d("2026-09-01T10:00:00Z"), d("2026-07-14T10:00:00Z");
//#endregion
export { adaptPlatformUser as a, adaptTeam as c, events as d, adaptOrganizationMember as i, adaptUniversity as l, adaptNotification as n, adaptReport as o, adaptOrganization as r, adaptStudentProfile as s, adaptEvent as t, adaptVerification as u };
