import { apiGet, apiSend, downloadFile } from "./client";

export interface AdminStatsResponse {
  overview: {
    totalUsers: number;
    activeUsers: number;
    universities: number;
    organizations: number;
    events: number;
    publishedEvents: number;
    registrations: number;
    teams: number;
    paidPayments: number;
  };
  moderationQueue: {
    pendingEvents: number;
    pendingReports: number;
    pendingVerifications: number;
    pendingOrganizations: number;
  };
  recentActivity: Array<{
    id: string;
    action: string;
    entityType: string;
    entityId?: string;
    reason?: string;
    createdAt: string;
    user?: { id: string; name: string; email: string };
    targetUser?: { id: string; name: string; email: string };
  }>;
}

export interface AdminAnalyticsResponse {
  period: string;
  totalRevenue: number;
  usersByRole: Array<{ role: string; count: number }>;
  usersByUniversity: Array<{ university: string; count: number }>;
  eventsByCategory: Array<{ category: string; count: number }>;
  eventsByStatus: Array<{ status: string; count: number }>;
  paymentsByStatus: Array<{ status: string; count: number; volume: number }>;
  activityTrends: {
    newUsersCount: number;
    newRegistrationsCount: number;
  };
}

export interface ReportStats {
  total: number;
  pending: number;
  underReview: number;
  resolved: number;
  dismissed: number;
  urgent: number;
}

export interface ReportItem {
  id: string;
  reporterId: string;
  targetType: "EVENT" | "ORGANIZATION" | "USER" | "TEAM";
  targetId: string;
  reason: string;
  details?: string | null;
  evidenceUrl?: string | null;
  status: "PENDING" | "UNDER_REVIEW" | "REVIEWED" | "RESOLVED" | "DISMISSED";
  actionNotes?: string | null;
  resolvedById?: string | null;
  resolvedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  reporter?: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    university?: { id: string; name: string; code: string } | null;
  } | null;
  resolvedBy?: {
    id: string;
    name: string;
    email?: string;
  } | null;
  targetEntity?: {
    id: string;
    name: string;
    type: "EVENT" | "ORGANIZATION" | "USER" | "TEAM";
    status: string;
    subtitle?: string;
    linkUrl?: string;
    imageUrl?: string | null;
    meta?: Record<string, any>;
  } | null;
}

export interface ReportListResponse {
  data: ReportItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  stats: ReportStats;
}

export interface ReportDetailResponse {
  report: ReportItem;
  targetEntity: any;
  auditHistory: Array<{
    id: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    reason?: string | null;
    details?: any;
    createdAt: string;
    user?: { id: string; name: string; email: string } | null;
  }>;
}

export interface VerificationStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  studentRequests: number;
  organizationRequests: number;
}

export interface VerificationItem {
  id: string;
  organizationId?: string | null;
  requestedById: string;
  reviewedById?: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  documentUrl?: string | null;
  notes?: string | null;
  reviewNotes?: string | null;
  reviewedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  requestedBy: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    universityEmailVerified: boolean;
    organizerVerificationStatus?: string;
    createdAt?: string;
    university?: { id: string; name: string; code: string; slug?: string } | null;
    studentProfile?: {
      studentIdNumber?: string | null;
      academicYear?: string | null;
      batchYear?: number | null;
      intakeSemester?: string | null;
      university?: { id: string; name: string; code: string } | null;
      faculty?: { id: string; name: string; code: string } | null;
      department?: { id: string; name: string; code: string } | null;
    } | null;
    roles?: Array<{ role: { name: string } }>;
  };
  organization?: {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string | null;
    isVerified: boolean;
    status: string;
    university?: { id: string; name: string; code: string } | null;
  } | null;
  reviewedBy?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export interface VerificationListResponse {
  data: VerificationItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  stats: VerificationStats;
}

export type VerificationDetailResponse = VerificationItem;

export interface GlobalSearchResult {
  id: string;
  title: string;
  subtitle?: string | undefined;
  type: string;
  url?: string | undefined;
  category?: string | undefined;
}

export interface UniversityEmailDomainItem {
  id: string;
  universityId: string;
  domain: string;
  isPrimary: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UniversityFacultyItem {
  id: string;
  universityId: string;
  name: string;
  slug: string;
  code: string;
  description?: string | null;
  departments?: Array<{
    id: string;
    facultyId: string;
    name: string;
    slug: string;
    code: string;
    description?: string | null;
    _count?: { studentProfiles: number; events: number };
  }>;
  _count?: { departments: number; studentProfiles: number; events: number };
}

export interface UniversityItem {
  id: string;
  name: string;
  slug: string;
  code: string;
  city: string;
  country: string;
  domain?: string | null;
  websiteUrl?: string | null;
  description?: string | null;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  emailDomains?: UniversityEmailDomainItem[];
  faculties?: UniversityFacultyItem[];
  organizations?: Array<{
    id: string;
    name: string;
    slug: string;
    logoUrl?: string | null;
    type: string;
    status: string;
    isVerified: boolean;
    _count?: { members: number; events: number };
  }>;
  _count?: {
    users: number;
    studentProfiles: number;
    organizations: number;
    events: number;
    faculties: number;
    emailDomains: number;
  };
}

export interface UniversityDetailResponse {
  university: UniversityItem;
  auditHistory?: any[];
  [key: string]: any;
}

export interface UniversityStats {
  total: number;
  verified: number;
  unverified: number;
  totalFaculties: number;
  totalDepartments: number;
  totalDomains: number;
  totalStudents?: number;
  totalOrganizations?: number;
}

export interface UniversityListResponse {
  data: UniversityItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  stats: UniversityStats;
}

export interface FacultyItem {
  id: string;
  universityId: string;
  name: string;
  slug: string;
  code: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  university: {
    id: string;
    name: string;
    code: string;
    slug?: string;
    city?: string;
    isVerified?: boolean;
  };
  departments?: Array<{
    id: string;
    name: string;
    code: string;
    slug: string;
    _count?: { studentProfiles: number };
  }>;
  _count?: {
    departments: number;
    studentProfiles: number;
    events: number;
  };
}

export interface FacultyListResponse {
  data: FacultyItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  stats?: {
    total: number;
    totalDepartments: number;
  };
}

export interface FacultyDetailResponse {
  faculty: FacultyItem;
  auditHistory: Array<{
    id: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    reason?: string | null;
    details?: any;
    createdAt: string;
    user?: { id: string; name: string; email: string } | null;
  }>;
}

export interface DepartmentItem {
  id: string;
  facultyId: string;
  name: string;
  slug: string;
  code: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  faculty: {
    id: string;
    name: string;
    code: string;
    slug?: string;
    university?: {
      id: string;
      name: string;
      code: string;
      slug?: string;
      city?: string;
    };
  };
  _count?: {
    studentProfiles: number;
    events: number;
  };
}

export interface DepartmentListResponse {
  data: DepartmentItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DepartmentDetailResponse {
  department: DepartmentItem;
  auditHistory: Array<{
    id: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    reason?: string | null;
    details?: any;
    createdAt: string;
    user?: { id: string; name: string; email: string } | null;
  }>;
}

export interface OrganizationRosterItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  type: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  logoUrl?: string | null;
  bannerUrl?: string | null;
  email?: string | null;
  websiteUrl?: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  university?: {
    id: string;
    name: string;
    code: string;
    slug?: string;
  } | null;
  requestedBy?: {
    id: string;
    name: string;
    email: string;
  } | null;
  members?: Array<{
    id: string;
    role: string;
    status: string;
    user?: {
      id: string;
      name: string;
      email: string;
      avatarUrl?: string | null;
    };
  }>;
  _count?: {
    members: number;
    events: number;
  };
}

export interface OrganizationMemberRosterItem {
  id: string;
  organizationId: string;
  userId: string;
  role: string;
  status: "ACTIVE" | "PENDING" | "REJECTED" | "SUSPENDED";
  title?: string | null;
  isFounder?: boolean;
  canCreateEvents?: boolean;
  joinedAt: string;
  verifiedAt?: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    roles?: Array<{ role: { name: string } }>;
    studentProfile?: {
      id: string;
      studentIdNumber?: string | null;
      academicYear?: string | null;
      faculty?: { id: string; name: string; code: string } | null;
      department?: { id: string; name: string; code: string } | null;
    } | null;
  };
}

export interface OrganizationMemberListResponse {
  organization: OrganizationRosterItem;
  data: OrganizationMemberRosterItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  leadersCount: number;
  activeCount: number;
  maxLeaders: number;
}

export interface PaymentItem {
  id: string;
  eventId: string;
  payerId: string;
  amount: number;
  currency: string;
  status: "PENDING" | "PROCESSING" | "PAID" | "FAILED" | "REFUNDED" | "CANCELLED";
  provider: "STRIPE" | "PAYHERE" | "ONEPAY" | "WEBXPAY" | "CLUB_TRANSFER" | "GATEWAY_SANDBOX" | string;
  providerPaymentId?: string | null;
  providerSessionId?: string | null;
  referenceNumber?: string | null;
  paymentProofUrl?: string | null;
  transferDate?: string | null;
  payerNotes?: string | null;
  rejectionReason?: string | null;
  verifiedById?: string | null;
  verifiedAt?: string | null;
  verifiedBy?: { id: string; name: string; email?: string } | null;
  idempotencyKey?: string | null;
  webhookEventId?: string | null;
  metadata?: Record<string, any> | null;
  emailReceiptSent?: boolean;
  refundedAmount?: number | null;
  refundReason?: string | null;
  refundedAt?: string | null;
  paidAt?: string | null;
  createdAt: string;
  updatedAt: string;
  payer?: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    studentId?: string | null;
    university?: { id: string; name: string; shortName?: string | null } | null;
  } | null;
  event?: {
    id: string;
    title: string;
    slug: string;
    startDate?: string | null;
    endDate?: string | null;
    venue?: string | null;
    location?: string | null;
    organization?: { id: string; name: string; slug: string; logoUrl?: string | null } | null;
    university?: { id: string; name: string; shortName?: string | null } | null;
  } | null;
  receipt?: {
    id: string;
    receiptNumber: string;
    amount: number | string;
    currency: string;
    issuedAt: string;
    metadata?: Record<string, any> | null;
  } | null;
  tickets?: Array<{
    id: string;
    ticketNumber: string;
    status: string;
  }>;
  registrations?: Array<{
    id: string;
    status: string;
  }>;
  ticketCount?: number;
  registrationCount?: number;
}

export interface PaymentStats {
  totalPaidVolume: number;
  paidCount: number;
  pendingCount: number;
  refundedVolume: number;
  refundedCount: number;
  failedCount: number;
  cancelledCount: number;
  totalCount: number;
  byProvider: Array<{ provider: string; count: number; volume: number }>;
  byCurrency: Array<{ currency: string; count: number; volume: number }>;
}

export interface PaymentListResponse {
  data: PaymentItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  summary?: {
    totalVolume: number;
    totalRefunded: number;
    recordCount: number;
  };
}

export interface PaymentLifecycleStage {
  stage: string;
  label: string;
  timestamp?: string | null;
  completed: boolean;
  details?: string;
}

export interface PaymentDetailResponse {
  payment: PaymentItem & {
    payer?: {
      id: string;
      name: string;
      email: string;
      avatarUrl?: string | null;
      studentId?: string | null;
      phone?: string | null;
      role?: string;
      faculty?: { id: string; name: string } | null;
      department?: { id: string; name: string } | null;
      university?: { id: string; name: string; shortName?: string | null } | null;
    } | null;
    event?: {
      id: string;
      title: string;
      slug: string;
      startDate?: string | null;
      endDate?: string | null;
      venue?: string | null;
      location?: string | null;
      isFree?: boolean;
      price?: number | string | null;
      currency?: string;
      organization?: { id: string; name: string; slug: string; logoUrl?: string | null; email?: string | null } | null;
      university?: { id: string; name: string; shortName?: string | null } | null;
    } | null;
    tickets?: Array<{
      id: string;
      ticketNumber: string;
      qrToken?: string;
      status: string;
      issuedAt?: string;
      checkedInAt?: string | null;
      user?: { id: string; name: string; email: string };
    }>;
    registrations?: Array<{
      id: string;
      status: string;
      isGroup?: boolean;
      registeredAt?: string;
      user?: { id: string; name: string; email: string };
    }>;
  };
  lifecycle: PaymentLifecycleStage[];
  auditLogs: Array<{
    id: string;
    action: string;
    reason?: string | null;
    createdAt: string;
    user?: { id: string; name: string; email: string } | null;
  }>;
}

export type ReportType =
  | 'PLATFORM_EXECUTIVE_SUMMARY'
  | 'ACADEMIC_GOVERNANCE_CENSUS'
  | 'CAMPUS_REACH_SUMMARY'
  | 'ORGANIZATION_HEALTH'
  | 'EVENT_PERFORMANCE'
  | 'STUDENT_ENGAGEMENT'
  | 'VERIFICATION_AUDIT'
  | 'FINANCIAL_TRANSACTIONS'
  | 'SYSTEM_SECURITY_AUDIT'
  | string;

export interface QueryAdminReportDto {
  type: ReportType | string;
  startDate?: string | undefined;
  endDate?: string | undefined;
  universityId?: string | undefined;
  categoryId?: string | undefined;
  organizationId?: string | undefined;
  status?: string | undefined;
  role?: string | undefined;
  limit?: number | undefined;
}

export const adminApi = {
  // 1. Overview & Analytics
  getDashboard(query?: {
    startDate?: string | undefined;
    endDate?: string | undefined;
    universityId?: string | undefined;
    organizationId?: string | undefined;
    categoryId?: string | undefined;
    eventStatus?: string | undefined;
  }): Promise<AdminStatsResponse> {
    const params = new URLSearchParams();
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.organizationId) params.append("organizationId", query.organizationId);
    if (query?.categoryId) params.append("categoryId", query.categoryId);
    if (query?.eventStatus) params.append("eventStatus", query.eventStatus);
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<AdminStatsResponse>(`/admin/dashboard${qs}`);
  },

  getStats(query?: {
    startDate?: string | undefined;
    endDate?: string | undefined;
    universityId?: string | undefined;
    organizationId?: string | undefined;
    categoryId?: string | undefined;
    eventStatus?: string | undefined;
  }): Promise<AdminStatsResponse> {
    const params = new URLSearchParams();
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.organizationId) params.append("organizationId", query.organizationId);
    if (query?.categoryId) params.append("categoryId", query.categoryId);
    if (query?.eventStatus) params.append("eventStatus", query.eventStatus);
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<AdminStatsResponse>(`/admin/stats${qs}`);
  },

  getAnalytics(period = "30d"): Promise<AdminAnalyticsResponse> {
    return apiGet<AdminAnalyticsResponse>(`/admin/analytics?period=${encodeURIComponent(period)}`);
  },

  globalSearch(q: string): Promise<GlobalSearchResult[]> {
    return apiGet<GlobalSearchResult[]>(`/admin/search?q=${encodeURIComponent(q)}`);
  },

  getModerationOverview() {
    return apiGet<any>("/admin/moderation-overview");
  },

  // Reports Center (9 Comprehensive Enterprise Reports)
  getReportPreview(query: QueryAdminReportDto) {
    const params = new URLSearchParams();
    params.append("type", query.type);
    if (query.startDate) params.append("startDate", query.startDate);
    if (query.endDate) params.append("endDate", query.endDate);
    if (query.universityId) params.append("universityId", query.universityId);
    if (query.categoryId) params.append("categoryId", query.categoryId);
    if (query.organizationId) params.append("organizationId", query.organizationId);
    if (query.status) params.append("status", query.status);
    if (query.role) params.append("role", query.role);
    if (query.limit) params.append("limit", String(query.limit));

    return apiGet<{
      title: string;
      type: string;
      generatedAt: string;
      appliedFilters: Record<string, any>;
      summaryCards: Array<{ label: string; value: string | number; change: string }>;
      columns: string[];
      data: any[];
      totalRecords: number;
    }>(`/admin/reports-center/preview?${params.toString()}`);
  },

  getReportExportUrl(query: {
    type: string;
    startDate?: string | undefined;
    endDate?: string | undefined;
    universityId?: string | undefined;
    categoryId?: string | undefined;
    organizationId?: string | undefined;
    status?: string | undefined;
    role?: string | undefined;
  }) {
    const params = new URLSearchParams();
    params.append("type", query.type);
    if (query.startDate) params.append("startDate", query.startDate);
    if (query.endDate) params.append("endDate", query.endDate);
    if (query.universityId) params.append("universityId", query.universityId);
    if (query.categoryId) params.append("categoryId", query.categoryId);
    if (query.organizationId) params.append("organizationId", query.organizationId);
    if (query.status) params.append("status", query.status);
    if (query.role) params.append("role", query.role);

    return `http://localhost:4000/api/v1/admin/reports-center/export?${params.toString()}`;
  },

  // 2. User Management
  getUsers(query?: {
    search?: string | undefined;
    role?: string | undefined;
    isActive?: boolean | undefined;
    universityId?: string | undefined;
    isVerified?: boolean | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    datePreset?: string | undefined;
    sortBy?: string | undefined;
    sortOrder?: 'asc' | 'desc' | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }) {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.role) params.append("role", query.role);
    if (query?.isActive !== undefined) params.append("isActive", String(query.isActive));
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.isVerified !== undefined) params.append("isVerified", String(query.isVerified));
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.year) params.append("year", query.year);
    if (query?.month) params.append("month", query.month);
    if (query?.datePreset) params.append("datePreset", query.datePreset);
    if (query?.sortBy) params.append("sortBy", query.sortBy);
    if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<{ data: any[]; total: number; page: number; limit: number; totalPages: number }>(`/admin/users${qs}`);
  },

  getStudents(query?: {
    search?: string | undefined;
    universityId?: string | undefined;
    facultyId?: string | undefined;
    departmentId?: string | undefined;
    isVerified?: boolean | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    datePreset?: string | undefined;
    sortBy?: string | undefined;
    sortOrder?: 'asc' | 'desc' | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }) {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.facultyId) params.append("facultyId", query.facultyId);
    if (query?.departmentId) params.append("departmentId", query.departmentId);
    if (query?.isVerified !== undefined) params.append("isVerified", String(query.isVerified));
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.year) params.append("year", query.year);
    if (query?.month) params.append("month", query.month);
    if (query?.datePreset) params.append("datePreset", query.datePreset);
    if (query?.sortBy) params.append("sortBy", query.sortBy);
    if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<{ data: any[]; total: number; page: number; limit: number; totalPages: number }>(`/admin/students${qs}`);
  },

  getOrganizers(query?: {
    search?: string | undefined;
    universityId?: string | undefined;
    organizationId?: string | undefined;
    committeeRole?: string | undefined;
    isVerified?: boolean | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    datePreset?: string | undefined;
    sortBy?: string | undefined;
    sortOrder?: 'asc' | 'desc' | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }) {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.organizationId) params.append("organizationId", query.organizationId);
    if (query?.committeeRole) params.append("committeeRole", query.committeeRole);
    if (query?.isVerified !== undefined) params.append("isVerified", String(query.isVerified));
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.year) params.append("year", query.year);
    if (query?.month) params.append("month", query.month);
    if (query?.datePreset) params.append("datePreset", query.datePreset);
    if (query?.sortBy) params.append("sortBy", query.sortBy);
    if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<{ data: any[]; total: number; page: number; limit: number; totalPages: number }>(`/admin/organizers${qs}`);
  },

  exportData(moduleKey: string, format: 'csv' | 'pdf', query?: Record<string, any>) {
    const params = new URLSearchParams();
    params.append("format", format);
    if (query) {
      Object.entries(query).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "" && k !== "page" && k !== "limit") {
          params.append(k, String(v));
        }
      });
    }
    const today = new Date().toISOString().slice(0, 10);
    return downloadFile(
      `/admin/export/${encodeURIComponent(moduleKey)}?${params.toString()}`,
      `campuspulse-${moduleKey}-${today}.${format}`
    );
  },

  getUserDetails(id: string) {
    return apiGet<any>(`/admin/users/${encodeURIComponent(id)}`);
  },

  updateUserStatus(id: string, isActive: boolean, reason?: string | undefined) {
    return apiSend<any>("PATCH", `/admin/users/${encodeURIComponent(id)}/status`, { isActive, reason });
  },

  updateUserRole(id: string, role: string, reason?: string | undefined) {
    return apiSend<any>("PATCH", `/admin/users/${encodeURIComponent(id)}/role`, { role, reason });
  },

  verifyUserIdentity(id: string, reason?: string | undefined) {
    return apiSend<any>("POST", `/admin/users/${encodeURIComponent(id)}/verify`, { reason });
  },

  // 3. Administrators
  getAdministrators(query?: { search?: string | undefined; role?: string | undefined; universityId?: string | undefined; page?: number | undefined; limit?: number | undefined }) {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.role) params.append("role", query.role);
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<any[]>(`/admin/administrators${qs}`);
  },

  createAdministrator(dto: { name: string; email: string; role: string; universityId?: string | undefined; reason?: string | undefined }) {
    return apiSend<any>("POST", "/admin/administrators", dto);
  },

  updateAdministrator(id: string, dto: { role?: string | undefined; isActive?: boolean | undefined; universityId?: string | undefined; reason?: string | undefined }) {
    return apiSend<any>("PATCH", `/admin/administrators/${encodeURIComponent(id)}`, dto);
  },

  removeAdministrator(id: string) {
    return apiSend<any>("DELETE", `/admin/administrators/${encodeURIComponent(id)}`);
  },

  // 5. Campus Hierarchy
  getUniversities(query?: {
    search?: string | undefined;
    isVerified?: boolean | undefined;
    city?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    datePreset?: string | undefined;
    sortBy?: string | undefined;
    sortOrder?: 'asc' | 'desc' | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }) {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.isVerified !== undefined) params.append("isVerified", String(query.isVerified));
    if (query?.city) params.append("city", query.city);
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.year) params.append("year", query.year);
    if (query?.month) params.append("month", query.month);
    if (query?.datePreset) params.append("datePreset", query.datePreset);
    if (query?.sortBy) params.append("sortBy", query.sortBy);
    if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<UniversityListResponse>(`/admin/universities${qs}`);
  },

  getUniversityStats() {
    return apiGet<UniversityStats>("/admin/universities/stats");
  },

  getUniversityDetails(id: string) {
    return apiGet<UniversityDetailResponse>(`/admin/universities/${encodeURIComponent(id)}`);
  },

  createUniversity(dto: {
    name: string;
    slug: string;
    code: string;
    city: string;
    country?: string | undefined;
    domain?: string | undefined;
    websiteUrl?: string | undefined;
    description?: string | undefined;
    logoUrl?: string | undefined;
    isVerified?: boolean | undefined;
  }) {
    return apiSend<UniversityItem>("POST", "/admin/universities", dto);
  },

  updateUniversity(
    id: string,
    dto: {
      name?: string | undefined;
      slug?: string | undefined;
      code?: string | undefined;
      city?: string | undefined;
      country?: string | undefined;
      domain?: string | undefined;
      websiteUrl?: string | undefined;
      description?: string | undefined;
      logoUrl?: string | undefined;
      bannerUrl?: string | undefined;
      isVerified?: boolean | undefined;
    },
  ) {
    return apiSend<UniversityItem>("PATCH", `/admin/universities/${encodeURIComponent(id)}`, dto);
  },

  toggleUniversityStatus(id: string) {
    return apiSend<UniversityItem>("POST", `/admin/universities/${encodeURIComponent(id)}/toggle-status`);
  },

  deleteUniversity(id: string) {
    return apiSend<{ success: boolean; message: string }>("DELETE", `/admin/universities/${encodeURIComponent(id)}`);
  },

  addUniversityDomain(universityId: string, domain: string, isPrimary = false) {
    return apiSend<UniversityEmailDomainItem>("POST", `/admin/universities/${encodeURIComponent(universityId)}/domains`, {
      domain,
      isPrimary,
    });
  },

  deleteUniversityDomain(domainId: string, universityId = "dummy") {
    return apiSend<{ success: boolean }>("DELETE", `/admin/universities/${encodeURIComponent(universityId)}/domains/${encodeURIComponent(domainId)}`);
  },

  getFaculties(
    query?:
      | {
          search?: string | undefined;
          universityId?: string | undefined;
          sortBy?: string | undefined;
          sortOrder?: 'asc' | 'desc' | undefined;
          page?: number | undefined;
          limit?: number | undefined;
        }
      | string
      | undefined,
  ) {
    if (typeof query === "string") {
      const qs = query ? `?universityId=${encodeURIComponent(query)}` : "";
      return apiGet<FacultyListResponse>(`/admin/faculties${qs}`);
    }
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.sortBy) params.append("sortBy", query.sortBy);
    if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<FacultyListResponse>(`/admin/faculties${qs}`);
  },

  getFacultyDetails(id: string) {
    return apiGet<FacultyDetailResponse>(`/admin/faculties/${encodeURIComponent(id)}`);
  },

  createFaculty(dto: {
    universityId: string;
    name: string;
    slug: string;
    code: string;
    description?: string | undefined;
  }) {
    return apiSend<FacultyItem>("POST", "/admin/faculties", dto);
  },

  updateFaculty(
    id: string,
    dto: {
      name?: string | undefined;
      slug?: string | undefined;
      code?: string | undefined;
      universityId?: string | undefined;
      description?: string | undefined;
    },
  ) {
    return apiSend<FacultyItem>("PATCH", `/admin/faculties/${encodeURIComponent(id)}`, dto);
  },

  deleteFaculty(id: string) {
    return apiSend<{ success: boolean; message: string }>("DELETE", `/admin/faculties/${encodeURIComponent(id)}`);
  },

  getDepartments(
    query?:
      | {
          search?: string | undefined;
          facultyId?: string | undefined;
          universityId?: string | undefined;
          sortBy?: string | undefined;
          sortOrder?: 'asc' | 'desc' | undefined;
          page?: number | undefined;
          limit?: number | undefined;
        }
      | string
      | undefined,
    universityIdParam?: string | undefined,
  ) {
    if (typeof query === "string") {
      const params = new URLSearchParams();
      if (query) params.append("facultyId", query);
      if (universityIdParam) params.append("universityId", universityIdParam);
      const qs = params.toString() ? `?${params.toString()}` : "";
      return apiGet<DepartmentListResponse>(`/admin/departments${qs}`);
    }
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.facultyId) params.append("facultyId", query.facultyId);
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.sortBy) params.append("sortBy", query.sortBy);
    if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<DepartmentListResponse>(`/admin/departments${qs}`);
  },

  getDepartmentDetails(id: string) {
    return apiGet<DepartmentDetailResponse>(`/admin/departments/${encodeURIComponent(id)}`);
  },

  createDepartment(dto: {
    facultyId: string;
    name: string;
    slug: string;
    code: string;
    description?: string | undefined;
  }) {
    return apiSend<DepartmentItem>("POST", "/admin/departments", dto);
  },

  updateDepartment(
    id: string,
    dto: {
      name?: string | undefined;
      slug?: string | undefined;
      code?: string | undefined;
      facultyId?: string | undefined;
      description?: string | undefined;
    },
  ) {
    return apiSend<DepartmentItem>("PATCH", `/admin/departments/${encodeURIComponent(id)}`, dto);
  },

  deleteDepartment(id: string) {
    return apiSend<{ success: boolean; message: string }>("DELETE", `/admin/departments/${encodeURIComponent(id)}`);
  },

  // 6. Organization Governance
  getOrganizations(query?: {
    status?: string | undefined;
    search?: string | undefined;
    universityId?: string | undefined;
    categoryId?: string | undefined;
    isActive?: boolean | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    sortBy?: string | undefined;
    sortOrder?: 'asc' | 'desc' | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }) {
    const params = new URLSearchParams();
    if (query?.status) params.append("status", query.status);
    if (query?.search) params.append("search", query.search);
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.categoryId) params.append("categoryId", query.categoryId);
    if (query?.isActive !== undefined) params.append("isActive", String(query.isActive));
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.sortBy) params.append("sortBy", query.sortBy);
    if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<{ data: OrganizationRosterItem[]; total: number; page: number; limit: number; totalPages: number }>(`/admin/organizations${qs}`);
  },

  getOrganizationDetails(id: string) {
    return apiGet<OrganizationRosterItem & { members: OrganizationMemberRosterItem[]; events: any[]; conflicts: any[] }>(`/admin/organizations/${encodeURIComponent(id)}`);
  },

  getOrganizationProposals() {
    return apiGet<any[]>("/admin/organizations/proposals");
  },

  reviewOrganization(id: string, dto: { status: string; notes?: string | undefined; isVerified?: boolean | undefined }) {
    return apiSend<any>("POST", `/admin/organizations/${encodeURIComponent(id)}/review`, dto);
  },

  updateOrganizationStatus(id: string, status: "APPROVED" | "PENDING" | "REJECTED" | "SUSPENDED", reason?: string | undefined) {
    return apiSend<OrganizationRosterItem>("PATCH", `/admin/organizations/${encodeURIComponent(id)}/status`, { status, reason });
  },

  getOrganizationMembers(
    orgId: string,
    query?: {
      search?: string | undefined;
      role?: string | undefined;
      status?: string | undefined;
      sortBy?: string | undefined;
      sortOrder?: 'asc' | 'desc' | undefined;
      page?: number | undefined;
      limit?: number | undefined;
    },
  ) {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.role) params.append("role", query.role);
    if (query?.status) params.append("status", query.status);
    if (query?.sortBy) params.append("sortBy", query.sortBy);
    if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<OrganizationMemberListResponse>(`/admin/organizations/${encodeURIComponent(orgId)}/members${qs}`);
  },

  updateOrganizationMemberRole(
    orgId: string,
    memberId: string,
    dto: {
      role?: string | undefined;
      status?: string | undefined;
      title?: string | undefined;
      canCreateEvents?: boolean | undefined;
      reason?: string | undefined;
    },
  ) {
    return apiSend<OrganizationMemberRosterItem>("PATCH", `/admin/organizations/${encodeURIComponent(orgId)}/members/${encodeURIComponent(memberId)}`, dto);
  },

  removeOrganizationMember(orgId: string, memberId: string, reason?: string | undefined) {
    const qs = reason ? `?reason=${encodeURIComponent(reason)}` : "";
    return apiSend<{ success: boolean; message: string }>("DELETE", `/admin/organizations/${encodeURIComponent(orgId)}/members/${encodeURIComponent(memberId)}${qs}`, { reason });
  },

  // 6. Verification Queue (Student Credentials & Society Accreditation)
  getVerifications(query?: {
    status?: string | undefined;
    type?: 'STUDENT' | 'ORGANIZATION' | 'ALL' | undefined;
    universityId?: string | undefined;
    facultyId?: string | undefined;
    departmentId?: string | undefined;
    search?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    datePreset?: string | undefined;
    sortBy?: string | undefined;
    sortOrder?: 'asc' | 'desc' | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }): Promise<VerificationListResponse> {
    const params = new URLSearchParams();
    if (query?.status) params.append("status", query.status);
    if (query?.type) params.append("type", query.type);
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.facultyId) params.append("facultyId", query.facultyId);
    if (query?.departmentId) params.append("departmentId", query.departmentId);
    if (query?.search) params.append("search", query.search);
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.year) params.append("year", query.year);
    if (query?.month) params.append("month", query.month);
    if (query?.datePreset) params.append("datePreset", query.datePreset);
    if (query?.sortBy) params.append("sortBy", query.sortBy);
    if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<VerificationListResponse>(`/admin/verifications${qs}`);
  },

  getVerificationStats(): Promise<VerificationStats> {
    return apiGet<VerificationStats>("/admin/verifications/stats");
  },

  getVerificationDetails(id: string): Promise<VerificationDetailResponse> {
    return apiGet<VerificationDetailResponse>(`/admin/verifications/${encodeURIComponent(id)}`);
  },

  respondVerification(
    id: string,
    status: "APPROVED" | "REJECTED",
    reviewNotes?: string | undefined,
    rejectionReason?: string | undefined,
  ) {
    return apiSend<VerificationItem>("PATCH", `/admin/verifications/${encodeURIComponent(id)}`, {
      status,
      reviewNotes,
      rejectionReason,
    });
  },

  // 7. Events Catalog
  getEvents(query?: {
    status?: string | undefined;
    search?: string | undefined;
    universityId?: string | undefined;
    organizationId?: string | undefined;
    categoryId?: string | undefined;
    isFree?: boolean | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    datePreset?: string | undefined;
    sortBy?: string | undefined;
    sortOrder?: 'asc' | 'desc' | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }) {
    const params = new URLSearchParams();
    if (query?.status) params.append("status", query.status);
    if (query?.search) params.append("search", query.search);
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.organizationId) params.append("organizationId", query.organizationId);
    if (query?.categoryId) params.append("categoryId", query.categoryId);
    if (query?.isFree !== undefined) params.append("isFree", String(query.isFree));
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.year) params.append("year", query.year);
    if (query?.month) params.append("month", query.month);
    if (query?.datePreset) params.append("datePreset", query.datePreset);
    if (query?.sortBy) params.append("sortBy", query.sortBy);
    if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<{ data: any[]; total: number; page: number; limit: number; totalPages: number }>(`/admin/events${qs}`);
  },

  approveEvent(id: string) {
    return apiSend<any>("POST", `/admin/events/${encodeURIComponent(id)}/approve`, {});
  },

  rejectEvent(id: string, reason: string) {
    return apiSend<any>("POST", `/admin/events/${encodeURIComponent(id)}/reject`, { reason });
  },

  cancelEvent(id: string, reason?: string | undefined) {
    return apiSend<any>("POST", `/admin/events/${encodeURIComponent(id)}/cancel`, { reason });
  },

  // 8. Teams & Volunteering
  getTeams(query?: {
    search?: string | undefined;
    eventId?: string | undefined;
    status?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    datePreset?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }) {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.eventId) params.append("eventId", query.eventId);
    if (query?.status) params.append("status", query.status);
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.year) params.append("year", query.year);
    if (query?.month) params.append("month", query.month);
    if (query?.datePreset) params.append("datePreset", query.datePreset);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<{ data: any[]; total: number; page: number; limit: number; totalPages: number }>(`/admin/teams${qs}`);
  },

  getVolunteering(query?: {
    search?: string | undefined;
    opportunityId?: string | undefined;
    universityId?: string | undefined;
    status?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    datePreset?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }) {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.opportunityId) params.append("opportunityId", query.opportunityId);
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.status) params.append("status", query.status);
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.year) params.append("year", query.year);
    if (query?.month) params.append("month", query.month);
    if (query?.datePreset) params.append("datePreset", query.datePreset);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<{ data: any[]; total: number; page: number; limit: number; totalPages: number }>(`/admin/volunteering${qs}`);
  },

  // 9. Transactions
  getRegistrations(query?: {
    search?: string | undefined;
    eventId?: string | undefined;
    universityId?: string | undefined;
    status?: string | undefined;
    paymentStatus?: string | undefined;
    checkedIn?: boolean | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    datePreset?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }) {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.eventId) params.append("eventId", query.eventId);
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.status) params.append("status", query.status);
    if (query?.paymentStatus) params.append("paymentStatus", query.paymentStatus);
    if (query?.checkedIn !== undefined) params.append("checkedIn", String(query.checkedIn));
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.year) params.append("year", query.year);
    if (query?.month) params.append("month", query.month);
    if (query?.datePreset) params.append("datePreset", query.datePreset);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<{ data: any[]; total: number; page: number; limit: number; totalPages: number }>(`/admin/registrations${qs}`);
  },

  cancelRegistration(id: string, reason?: string | undefined) {
    return apiSend<any>("PATCH", `/admin/registrations/${encodeURIComponent(id)}/cancel`, { reason });
  },

  getTickets(query?: {
    search?: string | undefined;
    eventId?: string | undefined;
    status?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    datePreset?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }) {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.eventId) params.append("eventId", query.eventId);
    if (query?.status) params.append("status", query.status);
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.year) params.append("year", query.year);
    if (query?.month) params.append("month", query.month);
    if (query?.datePreset) params.append("datePreset", query.datePreset);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<{ data: any[]; total: number; page: number; limit: number; totalPages: number }>(`/admin/tickets${qs}`);
  },

  getAttendance(query?: {
    search?: string | undefined;
    eventId?: string | undefined;
    universityId?: string | undefined;
    isPresent?: boolean | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    datePreset?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }) {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.eventId) params.append("eventId", query.eventId);
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.isPresent !== undefined) params.append("isPresent", String(query.isPresent));
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.year) params.append("year", query.year);
    if (query?.month) params.append("month", query.month);
    if (query?.datePreset) params.append("datePreset", query.datePreset);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<{ data: any[]; total: number; page: number; limit: number; totalPages: number }>(`/admin/attendance${qs}`);
  },

  getPayments(query?: {
    search?: string | undefined;
    status?: string | undefined;
    provider?: string | undefined;
    currency?: string | undefined;
    universityId?: string | undefined;
    eventId?: string | undefined;
    minAmount?: number | undefined;
    maxAmount?: number | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    datePreset?: string | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }): Promise<PaymentListResponse> {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.status) params.append("status", query.status);
    if (query?.provider) params.append("provider", query.provider);
    if (query?.currency) params.append("currency", query.currency);
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.eventId) params.append("eventId", query.eventId);
    if (query?.minAmount !== undefined) params.append("minAmount", String(query.minAmount));
    if (query?.maxAmount !== undefined) params.append("maxAmount", String(query.maxAmount));
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.year) params.append("year", query.year);
    if (query?.month) params.append("month", query.month);
    if (query?.datePreset) params.append("datePreset", query.datePreset);
    if (query?.sortBy) params.append("sortBy", query.sortBy);
    if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<PaymentListResponse>(`/admin/payments${qs}`);
  },

  getPaymentStats(): Promise<PaymentStats> {
    return apiGet<PaymentStats>("/admin/payments/stats");
  },

  getPaymentDetails(id: string): Promise<PaymentDetailResponse> {
    return apiGet<PaymentDetailResponse>(`/admin/payments/${encodeURIComponent(id)}`);
  },

  refundPayment(id: string, payload: { amount?: number | undefined; reason: string }): Promise<{ success: boolean; payment: any; message: string }> {
    return apiSend<{ success: boolean; payment: any; message: string }>("POST", `/admin/payments/${encodeURIComponent(id)}/refund`, payload);
  },

  simulateSandboxPayment(id: string): Promise<{ success: boolean; payment: any; message: string }> {
    return apiSend<{ success: boolean; payment: any; message: string }>("POST", `/admin/payments/${encodeURIComponent(id)}/simulate-sandbox`, {});
  },

  // 10. Moderation Reports & Report Centre
  getReports(query?: {
    search?: string | undefined;
    status?: string | undefined;
    targetType?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    datePreset?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }): Promise<ReportListResponse> {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.status) params.append("status", query.status);
    if (query?.targetType) params.append("targetType", query.targetType);
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.year) params.append("year", query.year);
    if (query?.month) params.append("month", query.month);
    if (query?.datePreset) params.append("datePreset", query.datePreset);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<ReportListResponse>(`/admin/reports${qs}`);
  },

  getReportStats(): Promise<ReportStats> {
    return apiGet<ReportStats>("/admin/reports/stats");
  },

  getReportDetails(id: string): Promise<ReportDetailResponse> {
    return apiGet<ReportDetailResponse>(`/admin/reports/${encodeURIComponent(id)}`);
  },

  resolveReport(id: string, status: string, actionNotes?: string | undefined) {
    return apiSend<ReportItem>("PATCH", `/admin/reports/${encodeURIComponent(id)}/resolve`, { status, actionNotes });
  },

  takeReportAction(id: string, action: string, reason?: string | undefined, actionNotes?: string | undefined) {
    return apiSend<ReportItem>("POST", `/admin/reports/${encodeURIComponent(id)}/action`, { action, reason, actionNotes });
  },

  // 12. System, Audit Logs & Settings
  getAuditLogs(query?: {
    action?: string | undefined;
    entityType?: string | undefined;
    userId?: string | undefined;
    search?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    datePreset?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }) {
    const params = new URLSearchParams();
    if (query?.action) params.append("action", query.action);
    if (query?.entityType) params.append("entityType", query.entityType);
    if (query?.userId) params.append("userId", query.userId);
    if (query?.search) params.append("search", query.search);
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.year) params.append("year", query.year);
    if (query?.month) params.append("month", query.month);
    if (query?.datePreset) params.append("datePreset", query.datePreset);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<{ data: any[]; total: number; page: number; limit: number; totalPages: number }>(`/admin/audit-logs${qs}`);
  },

  getSettings() {
    return apiGet<{ settings: Record<string, string>; defaults: Record<string, string> }>("/admin/settings");
  },

  updateSettings(settings: Record<string, any>) {
    return apiSend<any>("PUT", "/admin/settings", { settings });
  },

  getSystemHealth() {
    return apiGet<any>("/admin/system-health");
  },

  // 13. Categories
  getCategories(query?: {
    search?: string | undefined;
    type?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    datePreset?: string | undefined;
  }) {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.type) params.append("type", query.type);
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.year) params.append("year", query.year);
    if (query?.month) params.append("month", query.month);
    if (query?.datePreset) params.append("datePreset", query.datePreset);
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<any[]>(`/admin/categories${qs}`);
  },

  createCategory(dto: { name: string; slug?: string | undefined; type?: string | undefined; description?: string | undefined; icon?: string | undefined }) {
    return apiSend<any>("POST", "/admin/categories", dto);
  },

  updateCategory(id: string, dto: { name?: string | undefined; description?: string | undefined; icon?: string | undefined; isActive?: boolean | undefined }) {
    return apiSend<any>("PATCH", `/admin/categories/${encodeURIComponent(id)}`, dto);
  },

  // 14. Communication & Announcements
  getAnnouncements(query?: {
    search?: string | undefined;
    targetAudience?: string | undefined;
    status?: 'ALL' | 'PUBLISHED' | 'SCHEDULED' | 'DRAFT' | 'EXPIRED' | undefined;
    priority?: string | undefined;
    universityId?: string | undefined;
    roleTarget?: string | undefined;
    isActive?: boolean | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    sortBy?: string | undefined;
    sortOrder?: 'asc' | 'desc' | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }) {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.targetAudience) params.append("targetAudience", query.targetAudience);
    if (query?.status) params.append("status", query.status);
    if (query?.priority) params.append("priority", query.priority);
    if (query?.universityId) params.append("universityId", query.universityId);
    if (query?.roleTarget) params.append("roleTarget", query.roleTarget);
    if (query?.isActive !== undefined) params.append("isActive", String(query.isActive));
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.sortBy) params.append("sortBy", query.sortBy);
    if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiGet<AnnouncementListResponse>(`/admin/announcements${qs}`);
  },

  getAnnouncementStats() {
    return apiGet<AnnouncementStats>("/admin/announcements/stats");
  },

  getAnnouncementDetails(id: string) {
    return apiGet<AnnouncementDetailResponse>(`/admin/announcements/${encodeURIComponent(id)}`);
  },

  createAnnouncement(dto: {
    title: string;
    message: string;
    targetAudience?: string | undefined;
    universityId?: string | undefined;
    roleTarget?: string | undefined;
    priority?: string | undefined;
    linkUrl?: string | undefined;
    isActive?: boolean | undefined;
    startsAt?: string | undefined;
    expiresAt?: string | undefined;
    sendEmailNotification?: boolean | undefined;
  }) {
    return apiSend<AnnouncementItem>("POST", "/admin/announcements", dto);
  },

  updateAnnouncement(
    id: string,
    dto: {
      title?: string | undefined;
      message?: string | undefined;
      targetAudience?: string | undefined;
      universityId?: string | null | undefined;
      roleTarget?: string | null | undefined;
      priority?: string | undefined;
      linkUrl?: string | null | undefined;
      isActive?: boolean | undefined;
      startsAt?: string | undefined;
      expiresAt?: string | null | undefined;
    }
  ) {
    return apiSend<AnnouncementItem>("PUT", `/admin/announcements/${encodeURIComponent(id)}`, dto);
  },

  publishAnnouncement(id: string) {
    return apiSend<AnnouncementItem>("POST", `/admin/announcements/${encodeURIComponent(id)}/publish`);
  },

  archiveAnnouncement(id: string) {
    return apiSend<AnnouncementItem>("POST", `/admin/announcements/${encodeURIComponent(id)}/archive`);
  },

  toggleAnnouncement(id: string) {
    return apiSend<AnnouncementItem>("PATCH", `/admin/announcements/${encodeURIComponent(id)}/toggle`);
  },

  deleteAnnouncement(id: string) {
    return apiSend<{ success: boolean; id: string; message: string }>(
      "DELETE",
      `/admin/announcements/${encodeURIComponent(id)}`
    );
  },
};

export interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  targetAudience: 'ALL' | 'UNIVERSITY' | 'STUDENTS' | 'ORGANIZERS' | 'ADMINS' | string;
  universityId?: string | null;
  university?: {
    id: string;
    name: string;
    code: string;
  } | null;
  roleTarget?: string | null;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT' | string;
  linkUrl?: string | null;
  isActive: boolean;
  startsAt: string;
  expiresAt?: string | null;
  computedStatus: 'PUBLISHED' | 'SCHEDULED' | 'DRAFT' | 'EXPIRED' | string;
  createdById?: string | null;
  createdBy?: {
    id: string;
    name: string;
    email: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface AnnouncementStats {
  total: number;
  published: number;
  scheduled: number;
  drafts: number;
  expired: number;
  byPriority: Record<string, number>;
  byAudience: Record<string, number>;
}

export interface AnnouncementListResponse {
  data: AnnouncementItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AnnouncementDetailResponse {
  announcement: AnnouncementItem;
  estimatedReach: number;
  auditLogs: Array<{
    id: string;
    action: string;
    timestamp: string;
    user?: { id: string; name: string; email: string } | null;
    reason?: string | null;
    details?: any;
  }>;
}
