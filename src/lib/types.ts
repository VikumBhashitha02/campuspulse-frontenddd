export type Role = "STUDENT" | "ORGANIZER" | "ADMIN";

export type OrganizerVerificationStatus = "NOT_REQUIRED" | "PENDING" | "VERIFIED" | "REJECTED";

export interface DomainCheckResult {
  valid: boolean;
  domain: string;
  university?: {
    id: string;
    name: string;
    slug: string;
    code: string;
    logoUrl?: string | null;
  };
  reason?: "PUBLIC_EMAIL" | "UNSUPPORTED_DOMAIN" | "INVALID_FORMAT";
  message?: string;
}

export type EventStatus = "DRAFT" | "PENDING_REVIEW" | "PUBLISHED" | "REJECTED" | "CANCELLED" | "COMPLETED" | "EXPIRED" | "ONGOING";

export type EventMode = "ONLINE" | "PHYSICAL" | "HYBRID";

export interface University {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  code?: string;
  location: string;
  logoColor: string;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  websiteUrl?: string | null;
  domain?: string | null;
  isVerified?: boolean;
  about: string;
  description?: string;
  faculties: Faculty[];
  facultyCount?: number;
  organizationCount: number;
  eventCount: number;
}

export interface Faculty {
  id: string;
  name: string;
  departments: Department[];
}

export interface Department {
  id: string;
  name: string;
}

export interface Organization {
  id: string;
  slug: string;
  name: string;
  initials: string;
  universityId: string;
  universityName: string;
  verified: boolean;
  isVerified?: boolean;
  description: string;
  memberCount: number;
  leadership: OrganizationMember[];
  type?: string;
  status?: string;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  websiteUrl?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
  email?: string | null;
  contactEmail?: string | null;
  bankName?: string | null;
  bankBranch?: string | null;
  bankAccountName?: string | null;
  bankAccountNumber?: string | null;
  paymentInstructions?: string | null;
}

export type OrgMemberRole =
  | "ADMIN"
  | "LEADER"
  | "PRESIDENT"
  | "VICE_PRESIDENT"
  | "TREASURER"
  | "SECRETARY"
  | "EVENT_ORGANIZER"
  | "EVENT_MANAGER"
  | "VOLUNTEER_COORDINATOR"
  | "MODERATOR"
  | "MANAGER"
  | "MEMBER"
  | "OTHER";

export type OrgMemberStatus = "PENDING" | "ACTIVE" | "REJECTED" | "SUSPENDED";

export interface OrganizationMembership {
  id: string;
  organizationId: string;
  organizationName: string;
  organizationSlug: string;
  role: OrgMemberRole;
  status?: OrgMemberStatus;
  title?: string | null;
  logoUrl?: string | null;
  isVerified?: boolean;
  universityId?: string;
  universityName?: string;
  verifiedAt?: string | null;
  canCreateEvents?: boolean;
  canManageOrg?: boolean;
  canManageFinances?: boolean;
  joinedAt?: string;
  organizationStatus?: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  organization?: Organization;
}

export interface OrganizationMember {
  id: string;
  userId?: string;
  organizationId?: string;
  name: string;
  role: string;
  requestedRole?: string | null;
  status?: OrgMemberStatus;
  title?: string | null;
  canCreateEvents?: boolean;
  email?: string | null;
  avatarUrl?: string | null;
  universityEmailVerified?: boolean;
  university?: { id: string; name: string; slug: string } | null;
  requestMessage?: string | null;
  reviewNotes?: string | null;
  isFounder?: boolean;
  joinedAt?: string;
  verifiedAt?: string | null;
  reviewedBy?: { id: string; name: string } | null;
  reviewedAt?: string | null;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
  count: number;
}

export type OpportunityType =
  | "COMPETITION"
  | "HACKATHON"
  | "WORKSHOP"
  | "CONFERENCE"
  | "SEMINAR"
  | "MUSIC"
  | "DRAMA"
  | "HIGHER_STUDIES"
  | "UNIVERSITY_COURSE"
  | "MOVIE"
  | "SPORTS"
  | "EXHIBITION"
  | "SOCIETY_EVENT"
  | "CULTURAL_EVENT"
  | "RESEARCH"
  | "CAREER"
  | "VOLUNTEERING"
  | "SCHOLARSHIP"
  | "TRAINING"
  | "TEAM_OPPORTUNITY"
  | "OTHER";

export type ParticipationScope =
  | "UNIVERSITY_ONLY"
  | "SELECTED_UNIVERSITIES"
  | "ANY_UNIVERSITY_STUDENT"
  | "STUDENTS_AND_ALUMNI"
  | "PUBLIC"
  | "INVITATION_ONLY"
  | "INTER_UNIVERSITY"
  | "INTRA_UNIVERSITY"
  | "FACULTY_ONLY"
  | "DEPARTMENT_ONLY"
  | "OPEN_PUBLIC";

export interface EligibilityCriteriaCheck {
  scopePassed: boolean;
  universityPassed: boolean;
  facultyPassed: boolean;
  departmentPassed: boolean;
  academicYearPassed: boolean;
  skillsPassed: boolean;
  teamSizePassed: boolean;
  experiencePassed: boolean;
  agePassed: boolean;
  statusPassed: boolean;
}

export interface EligibilityEvaluationResult {
  isEligible: boolean | null; // null if unauthenticated preview
  scope: ParticipationScope;
  summary: string;
  reasons: string[];
  criteria: EligibilityCriteriaCheck;
  missingSkills?: string[];
  requiredUniversities?: Array<{ id: string; name: string; slug?: string }>;
  requiredAcademicYears?: string[];
}

export interface CampusEvent {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  shortDescription?: string;
  category?: string;
  categoryId: string;
  categoryName: string;
  categorySlug?: string;
  organizationId: string;
  organizationName: string;
  organizationInitials: string;
  organizationSlug?: string;
  organizationVerified: boolean;
  universityId: string;
  universityName: string;
  mode: EventMode;
  location: string;
  venue?: string | null;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  prize?: string;
  status: EventStatus;
  views: number;
  registrationClicks: number;
  registrations: number;
  eligibility: string[];
  requirements: string[];
  timeline: { label: string; date: string }[];
  teamSize?: string;
  bookmarked?: boolean;
  registered?: boolean;
  trendingScore: number;
  rejectionReason?: string;
  opportunityType?: OpportunityType;
  participationScope?: ParticipationScope | string;
  eligibilitySummary?: string;
  allowedUniversityIds?: string[];
  allowedFacultyIds?: string[];
  allowedDepartmentIds?: string[];
  allowedAcademicYears?: string[];
  allowAlumni?: boolean;
  minAge?: number | null;
  maxAge?: number | null;
  minExperienceMonths?: number | null;
  minTeamSize?: number | null;
  maxTeamSize?: number | null;
  requiredSkills?: string[];
  allowedUniversities?: Array<{ id: string; name: string; slug?: string }>;
  bannerUrl?: string | undefined;
  coverImageUrl?: string | undefined;
  isFree?: boolean | undefined;
  price?: number | string | null | undefined;
  currency?: string | undefined;
  capacity?: number | null;
  registrationSettings?: Record<string, any> | null;
  matchExplanation?: OpportunityMatchExplanation;
  
  // Volunteering fields
  volunteerRoles?: string[];
  volunteerResponsibilities?: string[];
  volunteerBenefits?: string[];
  volunteerCapacity?: number | null;
  volunteerAvailability?: string | null;

  // Music & Entertainment
  artistNames?: string[];
  musicGenre?: string | null;
  performanceSchedule?: string | null;

  // Drama & Performing Arts
  productionTitle?: string | null;
  dramaGenre?: string | null;
  castMembers?: string[];
  director?: string | null;
  synopsis?: string | null;

  // Higher Studies
  programType?: string | null;
  degreeAwarded?: string | null;
  studyMode?: string | null;
  programDuration?: string | null;
  fundingType?: string | null;
  scholarshipDetails?: string | null;
  entryQualifications?: string | null;
  applicationRequirements?: string | null;
  intakePeriod?: string | null;
  tuitionFee?: string | null;
  officialApplicationUrl?: string | null;
  programUrl?: string | null;

  // University Courses & Professional Learning
  courseLevel?: string | null;
  courseCode?: string | null;
  courseDuration?: string | null;
  workloadHoursPerWeek?: string | null;
  prerequisites?: string | null;
  syllabus?: string | null;
  instructor?: string | null;
  hasCertificate?: boolean;
  enrollmentUrl?: string | null;

  pricingMode?: EventPricingMode;
  studentPrice?: number | string | null;
  externalPrice?: number | string | null;
  eventVerificationStatus?: EventVerificationStatus;
  verificationNotes?: string | null;
  posterUrl?: string | null;
  officialEventUrl?: string | null;
  officialOrgUrl?: string | null;
  proofDocumentUrl?: string | null;
  organizerNotes?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  websiteUrl?: string | null;
  supportingLecturer?: string | null;
  supportingDocumentUrl?: string | null;
  additionalNotes?: string | null;
  isReviewed?: boolean;
  verificationStatus?: string;
  reportCount?: number;
  checkInCount?: number;
  volunteerCount?: number;
  revenue?: number;
  allowClubTransfer?: boolean | undefined;
  allowOnlineGateway?: boolean | undefined;
  customPaymentInstructions?: string | null | undefined;
  organization?: Organization | null | undefined;
}

export type EventPricingMode =
  | "FREE_FOR_ALL"
  | "SINGLE_PRICE"
  | "UNIVERSITY_STUDENT_AND_EXTERNAL"
  | "MULTI_TIER";

export type EventVerificationStatus =
  | "PENDING_REVIEW"
  | "VERIFIED"
  | "FLAGGED"
  | "REJECTED";

export type EventTicketType =
  | "UNIVERSITY_STUDENT"
  | "EXTERNAL"
  | "GENERAL"
  | "VIP"
  | "VOLUNTEER";

export interface OrganizerDashboardOverviewDto {
  totalEvents: number;
  upcomingEvents: number;
  pastEvents: number;
  totalRegistrations: number;
  totalCheckedIn: number;
  totalVolunteers: number;
  ticketRevenue: number;
  reportedEvents: number;
  recentEvents: any[];
}

export interface EventParticipant {
  id: string;
  eventId: string;
  userId: string;
  status: string;
  ticketType?: string | null;
  ticketPrice?: number | string | null;
  notes?: string | null;
  registeredAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    universityEmailVerified?: boolean;
    studentProfile?: {
      university?: { id: string; name: string; slug?: string } | null;
      faculty?: { id: string; name: string } | null;
      department?: { id: string; name: string } | null;
      academicYear?: string | null;
      studentIdNumber?: string | null;
    } | null;
  };
  ticket?: {
    id: string;
    ticketNumber: string;
    status: string;
    ticketType?: string | null;
    ticketPrice?: number | string | null;
    issuedAt: string;
    attendance?: {
      id: string;
      status: string;
      checkInTime: string;
      checkedInBy?: { id: string; name: string } | null;
      notes?: string | null;
    } | null;
  } | null;
  payment?: {
    id: string;
    status: string;
    amount: number | string;
    currency: string;
    paidAt?: string | null;
    provider: string;
  } | null;
}

export interface EventCheckInEntry {
  id: string;
  ticketId: string;
  eventId: string;
  userId: string;
  status: string;
  checkInTime: string;
  notes?: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    studentProfile?: {
      university?: { name: string } | null;
    } | null;
  };
  checkedInBy?: {
    id: string;
    name: string;
  } | null;
  ticket?: {
    ticketNumber: string;
    ticketType?: string | null;
    ticketPrice?: number | string | null;
  } | null;
}

export interface EventReport {
  id: string;
  reporterId: string;
  targetType: string;
  targetId: string;
  reason: string;
  details?: string | null;
  status: string;
  createdAt: string;
  reporter?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export type Opportunity = CampusEvent;

export type VolunteerStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "WITHDRAWN"
  | "COMPLETED";

export type VolunteerAttendanceStatus =
  | "NOT_CHECKED_IN"
  | "CHECKED_IN"
  | "CHECKED_OUT"
  | "COMPLETED";

export interface VolunteerRoleTemplate {
  name: string;
  category: string;
  description: string;
  typicalResponsibilities: string[];
  suggestedSkills: string[];
}

export interface VolunteerParticipation {
  id: string;
  applicationId: string;
  eventId: string;
  userId: string;
  organizationId: string;
  ticketNumber: string;
  qrToken: string;
  assignedRole: string;
  attendanceStatus: VolunteerAttendanceStatus;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  calculatedHours?: number | null;
  confirmedHours?: number | null;
  notes?: string | null;
  isVerified: boolean;
  verifiedAt?: string | null;
  certificateId?: string | null;
}

export interface VolunteerTicketDto {
  ticketNumber: string;
  qrToken: string;
  assignedRole: string;
  attendanceStatus: VolunteerAttendanceStatus;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  calculatedHours?: number | null;
  confirmedHours?: number | null;
  eventId: string;
  eventTitle: string;
  eventSlug: string;
  eventDate: string;
  eventLocation?: string | null;
  organizationId: string;
  organizationName: string;
  organizationLogoUrl?: string | null;
  volunteerName: string;
  volunteerEmail: string;
  isVerified: boolean;
  certificateId?: string | null;
  event?: {
    title: string;
    organization: {
      name: string;
    };
  };
}

export interface ScanVolunteerQrDto {
  qrToken: string;
}

export interface VolunteerCheckInResult {
  success: boolean;
  alreadyCheckedIn?: boolean;
  message: string;
  ticket: VolunteerTicketDto;
  calculatedHours?: number;
}

export interface ConfirmVolunteerServiceDto {
  hours?: number | undefined;
  notes?: string | undefined;
  issueCertificate?: boolean | undefined;
  certificateTitle?: string | undefined;
}

export interface VerifiedVolunteerExperience {
  id: string;
  eventId: string;
  eventTitle: string;
  eventSlug: string;
  organizationId: string;
  organizationName: string;
  organizationLogoUrl?: string | null;
  role: string;
  date: string;
  hours: number;
  status: VolunteerAttendanceStatus;
  isVerified: boolean;
  verifiedAt?: string | null;
  verifierName?: string | null;
  certificate?: {
    id: string;
    title: string;
    credentialId: string;
    issueDate: string;
    issuerName: string;
    credentialUrl?: string | null;
  } | null;
}

export interface VolunteerApplication {
  id: string;
  eventId: string;
  eventTitle?: string;
  eventSlug?: string;
  eventDate?: string;
  eventLocation?: string;
  eventOrganizationName?: string;
  eventUniversityName?: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  userUniversityName?: string;
  userFacultyName?: string;
  userDepartmentName?: string;
  userAcademicYear?: string;
  userSkills?: string[];
  userAvatarUrl?: string;
  role: string;
  assignedRole?: string | null;
  status: VolunteerStatus;
  statement?: string | null;
  skills: string[];
  availability?: string | null;
  notes?: string | null;
  feedback?: string | null;
  appliedAt: string;
  respondedAt?: string | null;
  withdrawnAt?: string | null;
  createdAt: string;
  updatedAt: string;
  participation?: VolunteerParticipation | null;
  event?: CampusEvent;
  user?: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    studentProfile?: {
      faculty?: string;
      department?: string;
      academicYear?: string;
      skills?: string[];
      university?: {
        name: string;
      };
    };
  };
}

export interface VolunteerStatsResponse {
  counts: {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
    withdrawn: number;
    completed: number;
  };
  capacity: number | null;
  capacityFilledPercentage: number;
  roleBreakdown: Record<string, number>;
}

export type FeedMode =
  | "FOR_YOU"
  | "MY_UNIVERSITY"
  | "FOLLOWING"
  | "TRENDING"
  | "ALL_OPPORTUNITIES"
  | "VOLUNTEERING";

export interface FeedItemSignals {
  sameUniversity: boolean;
  sameFaculty: boolean;
  matchedSkills: string[];
  matchedInterests: string[];
  hasInteractionHistory: boolean;
  isUrgent: boolean;
  isPopular: boolean;
}

export interface OpportunityMatchExplanation {
  score: number;
  percentage: number;
  badgeLabel: string;
  reasons: string[];
  signals: FeedItemSignals;
}

export interface FeedOpportunityItem {
  event: CampusEvent;
  explanation: OpportunityMatchExplanation;
}

export interface FeedResponse {
  mode: FeedMode;
  items: FeedOpportunityItem[];
  pagination: {
    total: number;
    skip: number;
    limit: number;
    hasMore: boolean;
  };
  context: {
    userUniversityId?: string | null;
    userUniversityName?: string | null;
    isPersonalized: boolean;
    activeSignalsCount: number;
  };
}

export interface EventRegistration {
  id: string;
  eventId: string;
  reference: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
  attendance: "NOT_MARKED" | "ATTENDED" | "MISSED";
  registeredAt: string;
}

export interface TeamMember {
  id: string;
  userId?: string;
  name: string;
  role: string;
  isLeader?: boolean;
  avatarUrl?: string | null;
  studentProfile?: any;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  creatorId?: string;
  eventId: string;
  eventTitle: string;
  event?: any;
  leader: string;
  leaderAvatarUrl?: string | null;
  members: TeamMember[];
  requiredRoles: string[];
  skills: string[];
  maxMembers?: number;
  openSlots: number;
  compatibility: number;
  availability: "WEEKDAYS" | "WEEKENDS" | "FLEXIBLE" | string;
  isOpen?: boolean;
  joinRequests?: any[];
  matchExplanation?: any;
}

export interface TeamJoinRequest {
  id: string;
  teamId: string;
  userId?: string;
  applicant: string;
  role: string;
  message: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED" | "REJECTED" | "CANCELLED";
  createdAt: string;
  user?: {
    id: string;
    name: string;
    avatarUrl?: string | null;
    universityEmailVerified?: boolean;
    studentProfile?: any;
  };
}

export interface CandidateStudent {
  id: string;
  userId: string;
  name: string;
  avatarUrl?: string | null;
  universityEmailVerified?: boolean;
  universityName: string;
  faculty?: string;
  department?: string;
  academicYear?: string;
  batchYear?: number;
  bio?: string;
  skills: string[];
  interests: string[];
  careerInterests?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  experiences?: any[];
  certificates?: any[];
  sharedSkills?: string[];
  compatibilityTag?: string;
}

export interface CreateTeamPayload {
  name: string;
  description?: string | undefined;
  eventId?: string | undefined;
  maxMembers?: number | undefined;
  requiredRoles?: string[] | undefined;
  requiredSkills?: string[] | undefined;
}

export interface UpdateTeamPayload {
  name?: string | undefined;
  description?: string | undefined;
  eventId?: string | undefined;
  maxMembers?: number | undefined;
  requiredRoles?: string[] | undefined;
  requiredSkills?: string[] | undefined;
  isOpen?: boolean | undefined;
}

export type NotificationKind =
  | "REGISTRATION"
  | "DEADLINE"
  | "TEAM_REQUEST"
  | "TEAM_ACCEPTED"
  | "EVENT_UPDATE"
  | "ORGANIZATION";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  href?: string;
}

export interface NormalizedSkillItem {
  id: string;
  name: string;
  category?: string;
  proficiency?: string;
}

export interface NormalizedInterestItem {
  id: string;
  name: string;
  category?: string;
}

export interface StudentExperienceItem {
  id?: string | undefined;
  title: string;
  organizationName: string;
  location?: string | undefined;
  startDate: string;
  endDate?: string | null | undefined;
  isCurrent?: boolean | undefined;
  description?: string | undefined;
}

export interface VerifiedCertificateItem {
  id: string;
  title: string;
  issuerName: string;
  organizationName?: string;
  eventTitle?: string;
  issueDate: string;
  credentialUrl?: string;
  credentialId?: string;
  isVerified: boolean;
}

export interface VerifiedAchievementItem {
  id: string;
  title: string;
  description?: string;
  badgeUrl?: string;
  category?: string;
  isVerified: boolean;
  issuerOrganization?: { id: string; name: string };
  event?: { id: string; title: string };
  earnedAt: string;
}

export interface VerifiedEventItem {
  id: string;
  eventId: string;
  title: string;
  slug: string;
  category: string;
  categoryName: string;
  organizationName: string;
  status: string;
  startDate: string;
  mode: string;
  isCompetitive: boolean;
  isWorkshop: boolean;
}

export interface VerifiedCompetitionItem {
  id: string;
  eventId: string;
  title: string;
  slug: string;
  organizationName: string;
  status: string;
  startDate: string;
  teamName?: string;
}

export interface VerifiedVolunteerItem {
  id: string;
  eventId: string;
  eventTitle: string;
  organizationName: string;
  role?: string;
  status: string;
  appliedAt: string;
  isVerified: boolean;
}

export interface UniversityIdentity {
  isVerified: boolean;
  status: "VERIFIED_STUDENT" | "UNVERIFIED";
  emailDomain?: string;
  university?: {
    id: string;
    name: string;
    slug: string;
    code: string;
    logoUrl?: string;
    isVerified: boolean;
  };
  faculty?: {
    id: string;
    name: string;
    slug?: string;
    code?: string;
  };
  department?: {
    id: string;
    name: string;
    slug?: string;
    code?: string;
  };
  studentIdNumber?: string;
  batchYear?: number;
  academicYear?: string;
  intakeSemester?: string;
}

export interface VerifiedCampusActivity {
  isSystemVerified: boolean;
  summary: {
    eventsCount: number;
    competitionsCount: number;
    workshopsCount: number;
    volunteeringCount: number;
    organizationsCount: number;
    teamsCount: number;
    achievementsCount: number;
    certificatesCount: number;
  };
  events: VerifiedEventItem[];
  competitions: VerifiedCompetitionItem[];
  workshops: Array<{
    id: string;
    eventId: string;
    title: string;
    slug: string;
    organizationName: string;
    status: string;
    startDate: string;
  }>;
  volunteering: VerifiedVolunteerItem[];
  organizations: Array<{
    id: string;
    organizationId: string;
    organizationName: string;
    role: string;
    title?: string;
    isVerified: boolean;
  }>;
  teams: Array<{
    id: string;
    teamId: string;
    name: string;
    eventTitle?: string;
    role: string;
    membersCount: number;
  }>;
  achievements: VerifiedAchievementItem[];
  certificates: VerifiedCertificateItem[];
}

export interface StudentProfile {
  id: string;
  name?: string | undefined;
  email?: string | undefined;
  avatarUrl?: string | undefined;
  avatarInitials?: string | undefined;
  universityName?: string | undefined;
  faculty?: string | undefined;
  department?: string | undefined;
  batch?: string | undefined;
  academicYear?: string | undefined;
  intakeSemester?: string | undefined;
  studentIdNumber?: string | undefined;
  bio?: string | undefined;
  githubUrl?: string | undefined;
  linkedinUrl?: string | undefined;
  websiteUrl?: string | undefined;
  skills: string[];
  careerInterests: string[];
  interests?: string[];

  // Rich 3-tier extensions
  universityIdentity?: UniversityIdentity;
  normalizedSkills?: NormalizedSkillItem[];
  normalizedInterests?: NormalizedInterestItem[];
  experiences?: StudentExperienceItem[];
  verifiedCampusActivity?: VerifiedCampusActivity;
}

export interface Report {
  id: string;
  target: string;
  targetType: "EVENT" | "ORGANIZATION" | "USER";
  reporter: string;
  reason: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  status: "OPEN" | "REVIEWING" | "RESOLVED";
  submittedAt: string;
  notes?: string;
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  university: string;
  status: "ACTIVE" | "SUSPENDED";
  joinedAt: string;
}

export interface Verification {
  id: string;
  organizationName: string;
  universityName: string;
  applicant: string;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  submittedAt: string;
  documents: string[];
}

export interface VolunteerMatchSignals {
  skillScore: number;
  eligibilityScore: number;
  previousVolunteeringScore: number;
  facultyScore: number;
  interestScore: number;
  availabilityScore: number;
  experienceBonus: number;
  matchedSkills: string[];
  missingSkills: string[];
  sameUniversity: boolean;
  sameFaculty: boolean;
  verifiedMissionsCount: number;
}

export interface VolunteerCandidateCard {
  userId: string;
  studentProfileId: string;
  name: string;
  avatarUrl?: string | null;
  universityId: string;
  universityName: string;
  facultyName?: string | null;
  departmentName?: string | null;
  academicYear?: string | null;
  skills: string[];
  matchingSkills: string[];
  missingSkills: string[];
  interests: string[];
  matchScore: number;
  matchPercentage: number;
  reasons: string[];
  isEligible: boolean;
  verifiedVolunteerMissions: number;
  relevantExperienceSummary?: string | null;
  availability?: string | null;
  volunteerBio?: string | null;
  profileVisibility: "PUBLIC" | "CAMPUS" | "ORGANIZATIONS_ONLY" | "PRIVATE" | string;
}

export interface RecommendedVolunteerOpportunity {
  event: CampusEvent;
  matchScore: number;
  matchPercentage: number;
  reasons: string[];
  matchingSkills: string[];
  missingSkills: string[];
  isEligible: boolean;
  signals: VolunteerMatchSignals;
  deadlineUrgencyDays?: number | null;
}

export interface VolunteerPreferencesDto {
  isVolunteerAvailable?: boolean;
  volunteerAvailability?: string | null;
  profileVisibility?: "PUBLIC" | "CAMPUS" | "ORGANIZATIONS_ONLY" | "PRIVATE";
  volunteerBio?: string | null;
}

export interface QueryVolunteerCandidatesParams {
  eventId?: string | undefined;
  universityId?: string | undefined;
  facultyId?: string | undefined;
  skills?: string[] | undefined;
  minExperienceMonths?: number | undefined;
  availability?: string | undefined;
  location?: string | undefined;
  skip?: number | undefined;
  limit?: number | undefined;
}

// =============================================================================
// Event Participation, Payments & Ticketing Types
// =============================================================================

export type PaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "PAID"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";

export type PaymentProvider = "STRIPE" | "PAYHERE" | "ONEPAY" | "WEBXPAY" | "GATEWAY_SANDBOX" | "CLUB_TRANSFER";

export type TicketStatus = "ISSUED" | "USED" | "CANCELLED" | "REVOKED";

export type AttendanceStatus = "CHECKED_IN" | "CHECKED_OUT";

export interface PaymentReceiptRecord {
  id: string;
  receiptNumber: string;
  paymentId: string;
  eventId: string;
  payerId: string;
  amount: number | string;
  currency: string;
  provider: PaymentProvider;
  providerPaymentId?: string | null;
  issuedAt: string;
  metadata?: any;
}

export interface PaymentRecord {
  id: string;
  eventId: string;
  payerId: string;
  amount: number | string;
  currency: string;
  status: PaymentStatus;
  provider: PaymentProvider;
  providerPaymentId?: string | null;
  providerSessionId?: string | null;
  paymentProofUrl?: string | null;
  referenceNumber?: string | null;
  transferDate?: string | null;
  payerNotes?: string | null;
  verifiedById?: string | null;
  verifiedAt?: string | null;
  rejectionReason?: string | null;
  verifiedBy?: {
    id: string;
    name: string;
    email?: string;
  } | null;
  refundedAmount?: number | null;
  refundReason?: string | null;
  refundedAt?: string | null;
  paidAt?: string | null;
  createdAt: string;
  updatedAt: string;
  event?: {
    id: string;
    title: string;
    slug: string;
    startDate: string;
    organization?: {
      id: string;
      name: string;
      slug: string;
      logoUrl?: string | null;
    };
  };
  payer?: {
    id: string;
    name: string;
    email: string;
    university?: {
      name: string;
    };
  };
  receipt?: PaymentReceiptRecord | null;
}

export interface PaymentClaimItem {
  id: string;
  eventId?: string;
  amount: number | string;
  currency: string;
  status: PaymentStatus;
  provider: PaymentProvider;
  providerPaymentId?: string | null;
  paymentProofUrl?: string | null;
  referenceNumber?: string | null;
  transferDate?: string | null;
  payerNotes?: string | null;
  rejectionReason?: string | null;
  verifiedById?: string | null;
  verifiedAt?: string | null;
  verifiedBy?: { id: string; name: string; email?: string } | null;
  createdAt: string;
  updatedAt: string;
  payer: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    university?: { name: string };
    studentProfile?: {
      studentIdNumber?: string;
      faculty?: { name: string };
      department?: { name: string };
      academicYear?: number;
    };
  };
  registrations: Array<{
    id: string;
    status: string;
    isGroup: boolean;
    registeredAt: string;
  }>;
  event?: {
    id: string;
    title: string;
    price: number;
    currency: string;
  };
  receipt?: PaymentReceiptRecord | null;
}

export interface EventTicketRecord {
  id: string;
  ticketNumber: string;
  qrToken: string;
  registrationId: string;
  eventId: string;
  userId: string;
  paymentId?: string | null;
  status: TicketStatus;
  issuedAt: string;
  event?: {
    id: string;
    title: string;
    slug: string;
    startDate: string;
    endDate?: string | null;
    venue?: string | null;
    location?: string | null;
    isFree?: boolean;
    price?: number | null;
    currency?: string;
    organization?: {
      id: string;
      name: string;
      slug: string;
      logoUrl?: string | null;
    };
  };
  user?: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    university?: {
      name: string;
    };
  };
  attendance?: EventAttendanceRecord | null;
}

export interface EventAttendanceRecord {
  id: string;
  ticketId: string;
  eventId: string;
  userId: string;
  checkedInById: string;
  status: AttendanceStatus;
  checkInTime: string;
  checkOutTime?: string | null;
  notes?: string | null;
}

export interface RegistrationRecord {
  id: string;
  eventId: string;
  userId: string;
  status: "REGISTERED" | "PENDING_PAYMENT" | "WAITLISTED" | "CANCELLED" | "ATTENDED";
  notes?: string | null;
  paymentId?: string | null;
  isGroup?: boolean;
  registeredById?: string | null;
  registeredAt: string;
  event?: {
    id: string;
    title: string;
    slug: string;
    startDate: string;
    endDate?: string | null;
    venue?: string | null;
    location?: string | null;
    mode?: string;
    isFree?: boolean;
    price?: number | null;
    currency?: string;
    organization?: {
      id: string;
      name: string;
      slug: string;
      logoUrl?: string | null;
    };
  };
  user?: {
    id: string;
    name: string;
    email: string;
  };
  ticket?: EventTicketRecord | null;
  payment?: PaymentRecord | null;
}

export interface InitiateRegistrationDto {
  eventId: string;
  notes?: string | undefined;
  isGroup?: boolean | undefined;
  participantUserIds?: string[] | undefined;
  teamId?: string | undefined;
  idempotencyKey?: string | undefined;
  paymentMethod?: "ONLINE_GATEWAY" | "CLUB_TRANSFER" | string | undefined;
}

export interface RegistrationResultDto {
  success: boolean;
  requiresPayment: boolean;
  requiresProofUpload?: boolean;
  message: string;
  payment?: PaymentRecord | undefined;
  registrations?: RegistrationRecord[] | undefined;
  tickets?: EventTicketRecord[] | undefined;
  checkoutUrl?: string | undefined;
  clientSecret?: string | undefined;
  paymentMethod?: string;
  organizationBankDetails?: {
    bankName?: string | null;
    bankBranch?: string | null;
    bankAccountName?: string | null;
    bankAccountNumber?: string | null;
    paymentInstructions?: string | null;
  };
}

export interface TicketValidationResultDto {
  isValid: boolean;
  rejectionReason?: string;
  ticket?: EventTicketRecord;
  event?: any;
  user?: any;
  attendance?: EventAttendanceRecord | null;
}

export interface CheckInTicketResultDto {
  success: boolean;
  message: string;
  ticket: EventTicketRecord;
  attendance: EventAttendanceRecord;
}




