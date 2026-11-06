import { i as __toESM } from "../_runtime.mjs";
import { i as downloadFile, n as apiSend, t as apiGet } from "./client-DCT7i2UG.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as LoaderCircle, At as EllipsisVertical, C as ShieldCheck, Ct as FileText, D as Server, Dt as Eye, E as Settings, En as Activity, Et as FileCheckCorner, Ft as Crown, It as CreditCard, J as MapPin, Jt as ChevronsRight, Kt as CircleCheck, L as Plus, M as RefreshCw, N as Receipt, Nt as Download, O as Send, P as QrCode, Pt as DollarSign, Qt as ChevronLeft, Rt as Copy, S as Shield, Tn as Archive, Vt as Clock, Wt as CircleX, Y as Mail, Yt as ChevronsLeft, Z as LogOut, Zt as ChevronRight, _ as SquarePen, a as UserX, an as Calendar, at as Layers, b as SlidersVertical, bn as ArrowUp, bt as Flame, ct as Info, d as TriangleAlert, dn as Briefcase, en as Check, f as Trash2, ft as History, gn as Ban, gt as Globe, h as Tag, ht as GraduationCap, i as User, it as LayoutDashboard, j as RotateCcw, k as Search, kt as ExternalLink, ln as Building, lt as Inbox, nn as ChartColumn, o as UserPlus, p as Ticket, pn as BookOpen, pt as HeartHandshake, q as Megaphone, qt as CircleAlert, r as Users, s as UserCheck, t as X, u as Trophy, un as Building2, vn as BadgeAlert, vt as Funnel, w as ShieldAlert, wn as ArrowDown, wt as FileSpreadsheet, xn as ArrowUpDown, xt as Flag, y as Sparkles, zt as Compass } from "../_libs/lucide-react.mjs";
import { t as RequireRole } from "./RequireRole-B_6p3mjK.mjs";
import { a as PageHeader, n as EmptyState, o as RowSkeleton, r as ErrorState, s as StatCard } from "./States-DTPgRZKE.mjs";
import { i as formatDate, o as formatMoney } from "./format-Cdcdxizs.mjs";
import { c as StatusBadge } from "./Badges-Bz6vmcNI.mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CeXuDfGc.mjs";
import { t as Label } from "./label-Bi14Oc-S.mjs";
import { t as Textarea } from "./textarea-7zknwcEV.mjs";
import { t as Switch } from "./switch-Dsx5fBGo.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-D3fTZEWA.mjs";
import { a as CartesianGrid, c as Cell, i as XAxis, l as ResponsiveContainer, n as BarChart, o as Bar, r as YAxis, s as Pie, t as PieChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-D6erKP8D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var adminApi = {
	getDashboard(query) {
		const params = new URLSearchParams();
		if (query?.startDate) params.append("startDate", query.startDate);
		if (query?.endDate) params.append("endDate", query.endDate);
		if (query?.universityId) params.append("universityId", query.universityId);
		if (query?.organizationId) params.append("organizationId", query.organizationId);
		if (query?.categoryId) params.append("categoryId", query.categoryId);
		if (query?.eventStatus) params.append("eventStatus", query.eventStatus);
		const qs = params.toString() ? `?${params.toString()}` : "";
		return apiGet(`/admin/dashboard${qs}`);
	},
	getStats(query) {
		const params = new URLSearchParams();
		if (query?.startDate) params.append("startDate", query.startDate);
		if (query?.endDate) params.append("endDate", query.endDate);
		if (query?.universityId) params.append("universityId", query.universityId);
		if (query?.organizationId) params.append("organizationId", query.organizationId);
		if (query?.categoryId) params.append("categoryId", query.categoryId);
		if (query?.eventStatus) params.append("eventStatus", query.eventStatus);
		const qs = params.toString() ? `?${params.toString()}` : "";
		return apiGet(`/admin/stats${qs}`);
	},
	getAnalytics(period = "30d") {
		return apiGet(`/admin/analytics?period=${encodeURIComponent(period)}`);
	},
	globalSearch(q) {
		return apiGet(`/admin/search?q=${encodeURIComponent(q)}`);
	},
	getModerationOverview() {
		return apiGet("/admin/moderation-overview");
	},
	getReportPreview(query) {
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
		return apiGet(`/admin/reports-center/preview?${params.toString()}`);
	},
	getReportExportUrl(query) {
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
	getUsers(query) {
		const params = new URLSearchParams();
		if (query?.search) params.append("search", query.search);
		if (query?.role) params.append("role", query.role);
		if (query?.isActive !== void 0) params.append("isActive", String(query.isActive));
		if (query?.universityId) params.append("universityId", query.universityId);
		if (query?.isVerified !== void 0) params.append("isVerified", String(query.isVerified));
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
		return apiGet(`/admin/users${qs}`);
	},
	getStudents(query) {
		const params = new URLSearchParams();
		if (query?.search) params.append("search", query.search);
		if (query?.universityId) params.append("universityId", query.universityId);
		if (query?.facultyId) params.append("facultyId", query.facultyId);
		if (query?.departmentId) params.append("departmentId", query.departmentId);
		if (query?.isVerified !== void 0) params.append("isVerified", String(query.isVerified));
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
		return apiGet(`/admin/students${qs}`);
	},
	getOrganizers(query) {
		const params = new URLSearchParams();
		if (query?.search) params.append("search", query.search);
		if (query?.universityId) params.append("universityId", query.universityId);
		if (query?.organizationId) params.append("organizationId", query.organizationId);
		if (query?.committeeRole) params.append("committeeRole", query.committeeRole);
		if (query?.isVerified !== void 0) params.append("isVerified", String(query.isVerified));
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
		return apiGet(`/admin/organizers${qs}`);
	},
	exportData(moduleKey, format, query) {
		const params = new URLSearchParams();
		params.append("format", format);
		if (query) Object.entries(query).forEach(([k, v]) => {
			if (v !== void 0 && v !== null && v !== "" && k !== "page" && k !== "limit") params.append(k, String(v));
		});
		const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		return downloadFile(`/admin/export/${encodeURIComponent(moduleKey)}?${params.toString()}`, `campuspulse-${moduleKey}-${today}.${format}`);
	},
	getUserDetails(id) {
		return apiGet(`/admin/users/${encodeURIComponent(id)}`);
	},
	updateUserStatus(id, isActive, reason) {
		return apiSend("PATCH", `/admin/users/${encodeURIComponent(id)}/status`, {
			isActive,
			reason
		});
	},
	updateUserRole(id, role, reason) {
		return apiSend("PATCH", `/admin/users/${encodeURIComponent(id)}/role`, {
			role,
			reason
		});
	},
	verifyUserIdentity(id, reason) {
		return apiSend("POST", `/admin/users/${encodeURIComponent(id)}/verify`, { reason });
	},
	getAdministrators(query) {
		const params = new URLSearchParams();
		if (query?.search) params.append("search", query.search);
		if (query?.role) params.append("role", query.role);
		if (query?.universityId) params.append("universityId", query.universityId);
		if (query?.page) params.append("page", String(query.page));
		if (query?.limit) params.append("limit", String(query.limit));
		const qs = params.toString() ? `?${params.toString()}` : "";
		return apiGet(`/admin/administrators${qs}`);
	},
	createAdministrator(dto) {
		return apiSend("POST", "/admin/administrators", dto);
	},
	updateAdministrator(id, dto) {
		return apiSend("PATCH", `/admin/administrators/${encodeURIComponent(id)}`, dto);
	},
	removeAdministrator(id) {
		return apiSend("DELETE", `/admin/administrators/${encodeURIComponent(id)}`);
	},
	getUniversities(query) {
		const params = new URLSearchParams();
		if (query?.search) params.append("search", query.search);
		if (query?.isVerified !== void 0) params.append("isVerified", String(query.isVerified));
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
		return apiGet(`/admin/universities${qs}`);
	},
	getUniversityStats() {
		return apiGet("/admin/universities/stats");
	},
	getUniversityDetails(id) {
		return apiGet(`/admin/universities/${encodeURIComponent(id)}`);
	},
	createUniversity(dto) {
		return apiSend("POST", "/admin/universities", dto);
	},
	updateUniversity(id, dto) {
		return apiSend("PATCH", `/admin/universities/${encodeURIComponent(id)}`, dto);
	},
	toggleUniversityStatus(id) {
		return apiSend("POST", `/admin/universities/${encodeURIComponent(id)}/toggle-status`);
	},
	deleteUniversity(id) {
		return apiSend("DELETE", `/admin/universities/${encodeURIComponent(id)}`);
	},
	addUniversityDomain(universityId, domain, isPrimary = false) {
		return apiSend("POST", `/admin/universities/${encodeURIComponent(universityId)}/domains`, {
			domain,
			isPrimary
		});
	},
	deleteUniversityDomain(domainId, universityId = "dummy") {
		return apiSend("DELETE", `/admin/universities/${encodeURIComponent(universityId)}/domains/${encodeURIComponent(domainId)}`);
	},
	getFaculties(query) {
		if (typeof query === "string") {
			const qs = query ? `?universityId=${encodeURIComponent(query)}` : "";
			return apiGet(`/admin/faculties${qs}`);
		}
		const params = new URLSearchParams();
		if (query?.search) params.append("search", query.search);
		if (query?.universityId) params.append("universityId", query.universityId);
		if (query?.sortBy) params.append("sortBy", query.sortBy);
		if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
		if (query?.page) params.append("page", String(query.page));
		if (query?.limit) params.append("limit", String(query.limit));
		const qs = params.toString() ? `?${params.toString()}` : "";
		return apiGet(`/admin/faculties${qs}`);
	},
	getFacultyDetails(id) {
		return apiGet(`/admin/faculties/${encodeURIComponent(id)}`);
	},
	createFaculty(dto) {
		return apiSend("POST", "/admin/faculties", dto);
	},
	updateFaculty(id, dto) {
		return apiSend("PATCH", `/admin/faculties/${encodeURIComponent(id)}`, dto);
	},
	deleteFaculty(id) {
		return apiSend("DELETE", `/admin/faculties/${encodeURIComponent(id)}`);
	},
	getDepartments(query, universityIdParam) {
		if (typeof query === "string") {
			const params = new URLSearchParams();
			if (query) params.append("facultyId", query);
			if (universityIdParam) params.append("universityId", universityIdParam);
			const qs = params.toString() ? `?${params.toString()}` : "";
			return apiGet(`/admin/departments${qs}`);
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
		return apiGet(`/admin/departments${qs}`);
	},
	getDepartmentDetails(id) {
		return apiGet(`/admin/departments/${encodeURIComponent(id)}`);
	},
	createDepartment(dto) {
		return apiSend("POST", "/admin/departments", dto);
	},
	updateDepartment(id, dto) {
		return apiSend("PATCH", `/admin/departments/${encodeURIComponent(id)}`, dto);
	},
	deleteDepartment(id) {
		return apiSend("DELETE", `/admin/departments/${encodeURIComponent(id)}`);
	},
	getOrganizations(query) {
		const params = new URLSearchParams();
		if (query?.status) params.append("status", query.status);
		if (query?.search) params.append("search", query.search);
		if (query?.universityId) params.append("universityId", query.universityId);
		if (query?.categoryId) params.append("categoryId", query.categoryId);
		if (query?.isActive !== void 0) params.append("isActive", String(query.isActive));
		if (query?.startDate) params.append("startDate", query.startDate);
		if (query?.endDate) params.append("endDate", query.endDate);
		if (query?.sortBy) params.append("sortBy", query.sortBy);
		if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
		if (query?.page) params.append("page", String(query.page));
		if (query?.limit) params.append("limit", String(query.limit));
		const qs = params.toString() ? `?${params.toString()}` : "";
		return apiGet(`/admin/organizations${qs}`);
	},
	getOrganizationDetails(id) {
		return apiGet(`/admin/organizations/${encodeURIComponent(id)}`);
	},
	getOrganizationProposals() {
		return apiGet("/admin/organizations/proposals");
	},
	reviewOrganization(id, dto) {
		return apiSend("POST", `/admin/organizations/${encodeURIComponent(id)}/review`, dto);
	},
	updateOrganizationStatus(id, status, reason) {
		return apiSend("PATCH", `/admin/organizations/${encodeURIComponent(id)}/status`, {
			status,
			reason
		});
	},
	getOrganizationMembers(orgId, query) {
		const params = new URLSearchParams();
		if (query?.search) params.append("search", query.search);
		if (query?.role) params.append("role", query.role);
		if (query?.status) params.append("status", query.status);
		if (query?.sortBy) params.append("sortBy", query.sortBy);
		if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
		if (query?.page) params.append("page", String(query.page));
		if (query?.limit) params.append("limit", String(query.limit));
		const qs = params.toString() ? `?${params.toString()}` : "";
		return apiGet(`/admin/organizations/${encodeURIComponent(orgId)}/members${qs}`);
	},
	updateOrganizationMemberRole(orgId, memberId, dto) {
		return apiSend("PATCH", `/admin/organizations/${encodeURIComponent(orgId)}/members/${encodeURIComponent(memberId)}`, dto);
	},
	removeOrganizationMember(orgId, memberId, reason) {
		const qs = reason ? `?reason=${encodeURIComponent(reason)}` : "";
		return apiSend("DELETE", `/admin/organizations/${encodeURIComponent(orgId)}/members/${encodeURIComponent(memberId)}${qs}`, { reason });
	},
	getVerifications(query) {
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
		return apiGet(`/admin/verifications${qs}`);
	},
	getVerificationStats() {
		return apiGet("/admin/verifications/stats");
	},
	getVerificationDetails(id) {
		return apiGet(`/admin/verifications/${encodeURIComponent(id)}`);
	},
	respondVerification(id, status, reviewNotes, rejectionReason) {
		return apiSend("PATCH", `/admin/verifications/${encodeURIComponent(id)}`, {
			status,
			reviewNotes,
			rejectionReason
		});
	},
	getEvents(query) {
		const params = new URLSearchParams();
		if (query?.status) params.append("status", query.status);
		if (query?.search) params.append("search", query.search);
		if (query?.universityId) params.append("universityId", query.universityId);
		if (query?.organizationId) params.append("organizationId", query.organizationId);
		if (query?.categoryId) params.append("categoryId", query.categoryId);
		if (query?.isFree !== void 0) params.append("isFree", String(query.isFree));
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
		return apiGet(`/admin/events${qs}`);
	},
	approveEvent(id) {
		return apiSend("POST", `/admin/events/${encodeURIComponent(id)}/approve`, {});
	},
	rejectEvent(id, reason) {
		return apiSend("POST", `/admin/events/${encodeURIComponent(id)}/reject`, { reason });
	},
	cancelEvent(id, reason) {
		return apiSend("POST", `/admin/events/${encodeURIComponent(id)}/cancel`, { reason });
	},
	getTeams(query) {
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
		return apiGet(`/admin/teams${qs}`);
	},
	getVolunteering(query) {
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
		return apiGet(`/admin/volunteering${qs}`);
	},
	getRegistrations(query) {
		const params = new URLSearchParams();
		if (query?.search) params.append("search", query.search);
		if (query?.eventId) params.append("eventId", query.eventId);
		if (query?.universityId) params.append("universityId", query.universityId);
		if (query?.status) params.append("status", query.status);
		if (query?.paymentStatus) params.append("paymentStatus", query.paymentStatus);
		if (query?.checkedIn !== void 0) params.append("checkedIn", String(query.checkedIn));
		if (query?.startDate) params.append("startDate", query.startDate);
		if (query?.endDate) params.append("endDate", query.endDate);
		if (query?.year) params.append("year", query.year);
		if (query?.month) params.append("month", query.month);
		if (query?.datePreset) params.append("datePreset", query.datePreset);
		if (query?.page) params.append("page", String(query.page));
		if (query?.limit) params.append("limit", String(query.limit));
		const qs = params.toString() ? `?${params.toString()}` : "";
		return apiGet(`/admin/registrations${qs}`);
	},
	cancelRegistration(id, reason) {
		return apiSend("PATCH", `/admin/registrations/${encodeURIComponent(id)}/cancel`, { reason });
	},
	getTickets(query) {
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
		return apiGet(`/admin/tickets${qs}`);
	},
	getAttendance(query) {
		const params = new URLSearchParams();
		if (query?.search) params.append("search", query.search);
		if (query?.eventId) params.append("eventId", query.eventId);
		if (query?.universityId) params.append("universityId", query.universityId);
		if (query?.isPresent !== void 0) params.append("isPresent", String(query.isPresent));
		if (query?.startDate) params.append("startDate", query.startDate);
		if (query?.endDate) params.append("endDate", query.endDate);
		if (query?.year) params.append("year", query.year);
		if (query?.month) params.append("month", query.month);
		if (query?.datePreset) params.append("datePreset", query.datePreset);
		if (query?.page) params.append("page", String(query.page));
		if (query?.limit) params.append("limit", String(query.limit));
		const qs = params.toString() ? `?${params.toString()}` : "";
		return apiGet(`/admin/attendance${qs}`);
	},
	getPayments(query) {
		const params = new URLSearchParams();
		if (query?.search) params.append("search", query.search);
		if (query?.status) params.append("status", query.status);
		if (query?.provider) params.append("provider", query.provider);
		if (query?.currency) params.append("currency", query.currency);
		if (query?.universityId) params.append("universityId", query.universityId);
		if (query?.eventId) params.append("eventId", query.eventId);
		if (query?.minAmount !== void 0) params.append("minAmount", String(query.minAmount));
		if (query?.maxAmount !== void 0) params.append("maxAmount", String(query.maxAmount));
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
		return apiGet(`/admin/payments${qs}`);
	},
	getPaymentStats() {
		return apiGet("/admin/payments/stats");
	},
	getPaymentDetails(id) {
		return apiGet(`/admin/payments/${encodeURIComponent(id)}`);
	},
	refundPayment(id, payload) {
		return apiSend("POST", `/admin/payments/${encodeURIComponent(id)}/refund`, payload);
	},
	simulateSandboxPayment(id) {
		return apiSend("POST", `/admin/payments/${encodeURIComponent(id)}/simulate-sandbox`, {});
	},
	getReports(query) {
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
		return apiGet(`/admin/reports${qs}`);
	},
	getReportStats() {
		return apiGet("/admin/reports/stats");
	},
	getReportDetails(id) {
		return apiGet(`/admin/reports/${encodeURIComponent(id)}`);
	},
	resolveReport(id, status, actionNotes) {
		return apiSend("PATCH", `/admin/reports/${encodeURIComponent(id)}/resolve`, {
			status,
			actionNotes
		});
	},
	takeReportAction(id, action, reason, actionNotes) {
		return apiSend("POST", `/admin/reports/${encodeURIComponent(id)}/action`, {
			action,
			reason,
			actionNotes
		});
	},
	getAuditLogs(query) {
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
		return apiGet(`/admin/audit-logs${qs}`);
	},
	getSettings() {
		return apiGet("/admin/settings");
	},
	updateSettings(settings) {
		return apiSend("PUT", "/admin/settings", { settings });
	},
	getSystemHealth() {
		return apiGet("/admin/system-health");
	},
	getCategories(query) {
		const params = new URLSearchParams();
		if (query?.search) params.append("search", query.search);
		if (query?.type) params.append("type", query.type);
		if (query?.startDate) params.append("startDate", query.startDate);
		if (query?.endDate) params.append("endDate", query.endDate);
		if (query?.year) params.append("year", query.year);
		if (query?.month) params.append("month", query.month);
		if (query?.datePreset) params.append("datePreset", query.datePreset);
		const qs = params.toString() ? `?${params.toString()}` : "";
		return apiGet(`/admin/categories${qs}`);
	},
	createCategory(dto) {
		return apiSend("POST", "/admin/categories", dto);
	},
	updateCategory(id, dto) {
		return apiSend("PATCH", `/admin/categories/${encodeURIComponent(id)}`, dto);
	},
	getAnnouncements(query) {
		const params = new URLSearchParams();
		if (query?.search) params.append("search", query.search);
		if (query?.targetAudience) params.append("targetAudience", query.targetAudience);
		if (query?.status) params.append("status", query.status);
		if (query?.priority) params.append("priority", query.priority);
		if (query?.universityId) params.append("universityId", query.universityId);
		if (query?.roleTarget) params.append("roleTarget", query.roleTarget);
		if (query?.isActive !== void 0) params.append("isActive", String(query.isActive));
		if (query?.startDate) params.append("startDate", query.startDate);
		if (query?.endDate) params.append("endDate", query.endDate);
		if (query?.sortBy) params.append("sortBy", query.sortBy);
		if (query?.sortOrder) params.append("sortOrder", query.sortOrder);
		if (query?.page) params.append("page", String(query.page));
		if (query?.limit) params.append("limit", String(query.limit));
		const qs = params.toString() ? `?${params.toString()}` : "";
		return apiGet(`/admin/announcements${qs}`);
	},
	getAnnouncementStats() {
		return apiGet("/admin/announcements/stats");
	},
	getAnnouncementDetails(id) {
		return apiGet(`/admin/announcements/${encodeURIComponent(id)}`);
	},
	createAnnouncement(dto) {
		return apiSend("POST", "/admin/announcements", dto);
	},
	updateAnnouncement(id, dto) {
		return apiSend("PUT", `/admin/announcements/${encodeURIComponent(id)}`, dto);
	},
	publishAnnouncement(id) {
		return apiSend("POST", `/admin/announcements/${encodeURIComponent(id)}/publish`);
	},
	archiveAnnouncement(id) {
		return apiSend("POST", `/admin/announcements/${encodeURIComponent(id)}/archive`);
	},
	toggleAnnouncement(id) {
		return apiSend("PATCH", `/admin/announcements/${encodeURIComponent(id)}/toggle`);
	},
	deleteAnnouncement(id) {
		return apiSend("DELETE", `/admin/announcements/${encodeURIComponent(id)}`);
	}
};
function AdminFilterBar({ filters, onFilterChange, onReset, totalRecords, loading, searchPlaceholder = "Search by name, email, keyword...", statusOptions, sortOptions, universities, categories, showUniversityFilter = true, showCategoryFilter = false, showStatusFilter = true, showDateFilter = true, showSortFilter = true, className }) {
	const handleDatePresetChange = (preset) => {
		const today = /* @__PURE__ */ new Date();
		let startDate = void 0;
		let endDate = void 0;
		const toIsoDate = (d) => d.toISOString().split("T")[0];
		if (preset === "TODAY") {
			startDate = toIsoDate(today);
			endDate = toIsoDate(today);
		} else if (preset === "LAST_7_DAYS") {
			const d = new Date(today);
			d.setDate(d.getDate() - 7);
			startDate = toIsoDate(d);
			endDate = toIsoDate(today);
		} else if (preset === "LAST_30_DAYS") {
			const d = new Date(today);
			d.setDate(d.getDate() - 30);
			startDate = toIsoDate(d);
			endDate = toIsoDate(today);
		} else if (preset === "THIS_MONTH") {
			startDate = toIsoDate(new Date(today.getFullYear(), today.getMonth(), 1));
			endDate = toIsoDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
		} else if (preset === "LAST_MONTH") {
			startDate = toIsoDate(new Date(today.getFullYear(), today.getMonth() - 1, 1));
			endDate = toIsoDate(new Date(today.getFullYear(), today.getMonth(), 0));
		} else if (preset === "THIS_YEAR") {
			startDate = toIsoDate(new Date(today.getFullYear(), 0, 1));
			endDate = toIsoDate(new Date(today.getFullYear(), 11, 31));
		}
		onFilterChange({
			...filters,
			datePreset: preset,
			startDate: preset === "CUSTOM" ? filters.startDate : startDate,
			endDate: preset === "CUSTOM" ? filters.endDate : endDate
		});
	};
	const activeChips = [];
	if (filters.search) activeChips.push({
		key: "search",
		label: "Search",
		value: filters.search
	});
	if (filters.datePreset && filters.datePreset !== "ALL") {
		const presetLabels = {
			ALL: "All Time",
			TODAY: "Today",
			LAST_7_DAYS: "Last 7 Days",
			LAST_30_DAYS: "Last 30 Days",
			THIS_MONTH: "This Month",
			LAST_MONTH: "Last Month",
			THIS_YEAR: "This Year",
			CUSTOM: `Custom (${filters.startDate || "Start"} → ${filters.endDate || "End"})`
		};
		activeChips.push({
			key: "datePreset",
			label: "Period",
			value: presetLabels[filters.datePreset] || filters.datePreset
		});
	}
	if (filters.universityId && universities) {
		const uni = universities.find((u) => u.id === filters.universityId);
		if (uni) activeChips.push({
			key: "universityId",
			label: "Campus",
			value: uni.name
		});
	}
	if (filters.categoryId && categories) {
		const cat = categories.find((c) => c.id === filters.categoryId);
		if (cat) activeChips.push({
			key: "categoryId",
			label: "Category",
			value: cat.name
		});
	}
	if (filters.status && statusOptions) {
		const opt = statusOptions.find((o) => o.value === filters.status);
		activeChips.push({
			key: "status",
			label: "Status",
			value: opt?.label || filters.status
		});
	}
	const removeChip = (key) => {
		const next = { ...filters };
		if (key === "datePreset") {
			delete next.datePreset;
			delete next.startDate;
			delete next.endDate;
		} else delete next[key];
		onFilterChange(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-[240px] flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: filters.search || "",
							onChange: (e) => onFilterChange({
								...filters,
								search: e.target.value
							}),
							placeholder: searchPlaceholder,
							className: "pl-9 pr-8 text-xs h-9 bg-background/70"
						}),
						filters.search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onFilterChange({
								...filters,
								search: ""
							}),
							className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
						})
					]
				}),
				showDateFilter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: filters.datePreset || "ALL",
						onChange: (e) => handleDatePresetChange(e.target.value),
						className: "h-9 rounded-md border border-input bg-background/70 px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-medium",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "TODAY",
								children: "Today"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "LAST_7_DAYS",
								children: "Last 7 Days"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "LAST_30_DAYS",
								children: "Last 30 Days"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "THIS_MONTH",
								children: "This Month"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "LAST_MONTH",
								children: "Last Month"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "THIS_YEAR",
								children: "This Year"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "CUSTOM",
								children: "Custom Range..."
							})
						]
					})]
				}),
				showDateFilter && filters.datePreset === "CUSTOM" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 animate-in fade-in duration-200",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: filters.startDate || "",
							onChange: (e) => onFilterChange({
								...filters,
								startDate: e.target.value
							}),
							className: "h-9 w-32 text-xs bg-background/70",
							title: "Start Date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "→"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: filters.endDate || "",
							onChange: (e) => onFilterChange({
								...filters,
								endDate: e.target.value
							}),
							className: "h-9 w-32 text-xs bg-background/70",
							title: "End Date"
						})
					]
				}),
				showUniversityFilter && universities && universities.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-4 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: filters.universityId || "",
						onChange: (e) => onFilterChange({
							...filters,
							universityId: e.target.value || void 0
						}),
						className: "h-9 max-w-[180px] truncate rounded-md border border-input bg-background/70 px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All Campuses"
						}), universities.map((uni) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: uni.id,
							children: uni.name
						}, uni.id))]
					})]
				}),
				showCategoryFilter && categories && categories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "size-4 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: filters.categoryId || "",
						onChange: (e) => onFilterChange({
							...filters,
							categoryId: e.target.value || void 0
						}),
						className: "h-9 max-w-[160px] truncate rounded-md border border-input bg-background/70 px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All Categories"
						}), categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: cat.id,
							children: cat.name
						}, cat.id))]
					})]
				}),
				showStatusFilter && statusOptions && statusOptions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-4 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: filters.status || "",
						onChange: (e) => onFilterChange({
							...filters,
							status: e.target.value || void 0
						}),
						className: "h-9 rounded-md border border-input bg-background/70 px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All Statuses"
						}), statusOptions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: opt.value,
							children: opt.label
						}, opt.value))]
					})]
				}),
				showSortFilter && sortOptions && sortOptions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "size-4 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: `${filters.sortBy || "createdAt"}-${filters.sortOrder || "desc"}`,
						onChange: (e) => {
							const [sortBy, sortOrder] = e.target.value.split("-");
							onFilterChange({
								...filters,
								sortBy,
								sortOrder
							});
						},
						className: "h-9 rounded-md border border-input bg-background/70 px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
						children: sortOptions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: opt.value,
							children: opt.label
						}, opt.value))
					})]
				}),
				activeChips.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: onReset,
					className: "h-9 text-xs text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5 mr-1" }), " Clear All"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-2 pt-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center gap-1.5",
				children: activeChips.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] font-semibold text-muted-foreground",
					children: "Active Filters:"
				}), activeChips.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary shadow-2xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold text-primary/80",
							children: [chip.label, ":"]
						}),
						" ",
						chip.value,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => removeChip(chip.key),
							className: "ml-0.5 rounded-full p-0.5 hover:bg-primary/20 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
						})
					]
				}, chip.key))] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground",
					children: "No active filters applied"
				})
			}), totalRecords !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-semibold text-muted-foreground",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "animate-pulse",
					children: "Loading records..."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Matching Records: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: totalRecords.toLocaleString()
				})] })
			})]
		})]
	});
}
function AdminReportsCenter({ universities = [], categories = [] }) {
	const queryClient = useQueryClient();
	const [activeTab, setActiveTab] = (0, import_react.useState)("moderation-queue");
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("");
	const [targetTypeFilter, setTargetTypeFilter] = (0, import_react.useState)("");
	const [startDate, setStartDate] = (0, import_react.useState)("");
	const [endDate, setEndDate] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const [limit, setLimit] = (0, import_react.useState)(25);
	const [selectedReportId, setSelectedReportId] = (0, import_react.useState)(null);
	const [actionNotesInput, setActionNotesInput] = (0, import_react.useState)("");
	const [newStatusSelection, setNewStatusSelection] = (0, import_react.useState)("RESOLVED");
	const [targetEnforcementDialog, setTargetEnforcementDialog] = (0, import_react.useState)(null);
	const [enforcementReason, setEnforcementReason] = (0, import_react.useState)("");
	const [isProcessing, setIsProcessing] = (0, import_react.useState)(false);
	const reportsQuery = useQuery({
		queryKey: [
			"admin",
			"reports-center",
			{
				search,
				status: statusFilter,
				targetType: targetTypeFilter,
				startDate,
				endDate,
				page,
				limit
			}
		],
		queryFn: () => adminApi.getReports({
			search: search.trim() || void 0,
			status: statusFilter || void 0,
			targetType: targetTypeFilter || void 0,
			startDate: startDate || void 0,
			endDate: endDate || void 0,
			page,
			limit
		})
	});
	const reportDetailQuery = useQuery({
		queryKey: [
			"admin",
			"report-detail",
			selectedReportId
		],
		queryFn: () => adminApi.getReportDetails(selectedReportId),
		enabled: !!selectedReportId
	});
	const handleResetFilters = () => {
		setSearch("");
		setStatusFilter("");
		setTargetTypeFilter("");
		setStartDate("");
		setEndDate("");
		setPage(1);
	};
	const handleQuickStatusChange = async (reportId, newStatus, notes) => {
		try {
			await adminApi.resolveReport(reportId, newStatus, notes);
			toast.success(`Report status updated to ${newStatus}`, { description: `Moderation state recorded for report #${reportId.slice(0, 8)}.` });
			queryClient.invalidateQueries({ queryKey: ["admin", "reports-center"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "reports"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
			if (selectedReportId === reportId) reportDetailQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to update report status");
		}
	};
	const handleUpdateDetailStatus = async () => {
		if (!selectedReportId) return;
		setIsProcessing(true);
		try {
			await adminApi.resolveReport(selectedReportId, newStatusSelection, actionNotesInput.trim() || void 0);
			toast.success(`Report #${selectedReportId.slice(0, 8)} marked as ${newStatusSelection}`, { description: "Moderator resolution notes have been recorded in the audit trail." });
			setActionNotesInput("");
			queryClient.invalidateQueries({ queryKey: ["admin", "reports-center"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "reports"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
			reportDetailQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to update report");
		} finally {
			setIsProcessing(false);
		}
	};
	const handleExecuteTargetEnforcement = async () => {
		if (!selectedReportId || !targetEnforcementDialog) return;
		setIsProcessing(true);
		try {
			await adminApi.takeReportAction(selectedReportId, targetEnforcementDialog.action, enforcementReason.trim() || targetEnforcementDialog.penaltyReason, actionNotesInput.trim() || void 0);
			toast.success(`Action applied: ${targetEnforcementDialog.title}`, { description: "Content/account updated across platform and notification dispatched." });
			setTargetEnforcementDialog(null);
			setEnforcementReason("");
			setActionNotesInput("");
			queryClient.invalidateQueries({ queryKey: ["admin", "reports-center"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "reports"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "organizations"] });
			reportDetailQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to execute moderation enforcement");
		} finally {
			setIsProcessing(false);
		}
	};
	const handleExportCsv = () => {
		if (!reportsQuery.data?.data?.length) {
			toast.error("No reports to export in current view");
			return;
		}
		const headers = [
			"Report ID",
			"Submission Date",
			"Status",
			"Target Type",
			"Target Name / Title",
			"Target ID",
			"Reporter Name",
			"Reporter Email",
			"Reason",
			"Details",
			"Evidence URL",
			"Action Notes",
			"Resolved At"
		];
		const rows = reportsQuery.data.data.map((r) => [
			r.id,
			r.createdAt,
			r.status,
			r.targetType,
			r.targetEntity?.name || "N/A",
			r.targetId,
			r.reporter?.name || "Anonymous",
			r.reporter?.email || "N/A",
			r.reason || "N/A",
			r.details || "",
			r.evidenceUrl || "",
			r.actionNotes || "",
			r.resolvedAt || ""
		]);
		const csvContent = "data:text/csv;charset=utf-8,﻿" + [headers.join(","), ...rows.map((row) => row.map((val) => `"${String(val).replace(/"/g, "\"\"")}"`).join(","))].join("\n");
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", `CampusPulse_Moderation_Reports_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		toast.success("Moderation reports CSV exported successfully!");
	};
	const copyToClipboard = (text, label) => {
		navigator.clipboard.writeText(text);
		toast.success(`Copied ${label} to clipboard`);
	};
	const stats = reportsQuery.data?.stats || {
		total: 0,
		pending: 0,
		underReview: 0,
		resolved: 0,
		dismissed: 0,
		urgent: 0
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-9 place-items-center rounded-xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-bold tracking-tight text-foreground",
						children: "Report Centre & Moderation Desk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Investigate user-flagged events, student organizations, peer accounts, and inappropriate content."
					})] })]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center rounded-lg border border-border bg-card p-1 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActiveTab("moderation-queue"),
							className: cn("flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors", activeTab === "moderation-queue" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-3.5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Moderation Reports" }),
								stats.pending > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid place-items-center rounded-full bg-destructive px-1.5 py-0.2 text-[10px] font-bold text-destructive-foreground",
									children: stats.pending
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActiveTab("data-exports"),
							className: cn("flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors", activeTab === "data-exports" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Telemetry & Data Reports" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => reportsQuery.refetch(),
						title: "Refresh data",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5 mr-1.5", reportsQuery.isFetching && "animate-spin") }), "Refresh"]
					})]
				})]
			}),
			activeTab === "moderation-queue" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setStatusFilter("");
									setPage(1);
								},
								className: cn("flex flex-col p-4 rounded-xl border text-left transition-all", statusFilter === "" ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm" : "border-border bg-card hover:border-primary/50"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-muted-foreground mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold uppercase tracking-wider",
											children: "Total Reports"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4 text-primary" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-extrabold text-foreground",
										children: stats.total
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground mt-1",
										children: "All logged complaints"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setStatusFilter("PENDING");
									setPage(1);
								},
								className: cn("flex flex-col p-4 rounded-xl border text-left transition-all", statusFilter === "PENDING" ? "border-rose-500 bg-rose-500/10 ring-2 ring-rose-500/20 shadow-sm" : "border-border bg-card hover:border-rose-500/50"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-rose-600 mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold uppercase tracking-wider",
											children: "Open / Pending"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4 text-rose-500" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-extrabold text-rose-600",
										children: stats.pending
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground mt-1",
										children: "Awaiting review"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setStatusFilter("UNDER_REVIEW");
									setPage(1);
								},
								className: cn("flex flex-col p-4 rounded-xl border text-left transition-all", statusFilter === "UNDER_REVIEW" ? "border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20 shadow-sm" : "border-border bg-card hover:border-amber-500/50"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-amber-600 mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold uppercase tracking-wider",
											children: "Under Review"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-amber-500" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-extrabold text-amber-600",
										children: stats.underReview
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground mt-1",
										children: "Active investigation"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setStatusFilter("RESOLVED");
									setPage(1);
								},
								className: cn("flex flex-col p-4 rounded-xl border text-left transition-all", statusFilter === "RESOLVED" ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20 shadow-sm" : "border-border bg-card hover:border-emerald-500/50"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-emerald-600 mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold uppercase tracking-wider",
											children: "Resolved"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-extrabold text-emerald-600",
										children: stats.resolved
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground mt-1",
										children: "Action completed"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setStatusFilter("DISMISSED");
									setPage(1);
								},
								className: cn("flex flex-col p-4 rounded-xl border text-left transition-all", statusFilter === "DISMISSED" ? "border-slate-500 bg-slate-500/10 ring-2 ring-slate-500/20 shadow-sm" : "border-border bg-card hover:border-slate-500/50"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-muted-foreground mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold uppercase tracking-wider",
											children: "Dismissed"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4 text-muted-foreground" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-extrabold text-foreground",
										children: stats.dismissed
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground mt-1",
										children: "No violation found"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col p-4 rounded-xl border border-border bg-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-amber-500 mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold uppercase tracking-wider",
											children: "Urgent Attention"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeAlert, { className: "size-4 text-amber-500" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-extrabold text-amber-500",
										children: stats.urgent
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground mt-1",
										children: "> 48h pending queue"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-border bg-card p-4 space-y-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: search,
										onChange: (e) => {
											setSearch(e.target.value);
											setPage(1);
										},
										placeholder: "Search by Report ID, reporter name, target entity, or reason...",
										className: "pl-9 text-xs h-9"
									}),
									search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setSearch(""),
										className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs",
										children: "Clear"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										"aria-label": "Filter by report status",
										value: statusFilter,
										onChange: (e) => {
											setStatusFilter(e.target.value);
											setPage(1);
										},
										className: "h-9 rounded-md border border-input bg-background px-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "All Statuses"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "PENDING",
												children: "Pending Review"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "UNDER_REVIEW",
												children: "Under Active Review"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "RESOLVED",
												children: "Resolved"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "DISMISSED",
												children: "Dismissed"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										"aria-label": "Filter by target category",
										value: targetTypeFilter,
										onChange: (e) => {
											setTargetTypeFilter(e.target.value);
											setPage(1);
										},
										className: "h-9 rounded-md border border-input bg-background px-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "All Categories"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "EVENT",
												children: "Events & Opportunities"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "ORGANIZATION",
												children: "Clubs & Societies"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "USER",
												children: "Student & User Profiles"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "TEAM",
												children: "Project Squads & Teams"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										"aria-label": "Filter by start date",
										value: startDate,
										onChange: (e) => {
											setStartDate(e.target.value);
											setPage(1);
										},
										className: "h-9 w-36 text-xs",
										title: "Start submission date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										"aria-label": "Filter by end date",
										value: endDate,
										onChange: (e) => {
											setEndDate(e.target.value);
											setPage(1);
										},
										className: "h-9 w-36 text-xs",
										title: "End submission date"
									}),
									(search || statusFilter || targetTypeFilter || startDate || endDate) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "sm",
										onClick: handleResetFilters,
										className: "h-9 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5 mr-1" }), " Reset"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										size: "sm",
										onClick: handleExportCsv,
										className: "h-9 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5 mr-1.5" }), " Export CSV"]
									})
								]
							})]
						})
					}),
					reportsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : reportsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => reportsQuery.refetch() }) : !reportsQuery.data?.data || reportsQuery.data.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-8 text-emerald-500" }),
						title: "No reports matching filter criteria",
						description: "All reported incidents have been reviewed, or your active filter query returned no results.",
						action: search || statusFilter || targetTypeFilter || startDate || endDate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: handleResetFilters,
							children: "Clear All Filters"
						}) : void 0
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "border-b border-border bg-muted/50 font-bold uppercase tracking-wider text-[10px] text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Report ID"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Reporter"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Reported Entity"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Category & Reason"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Evidence"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Submitted"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3 text-right",
											children: "Actions"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border",
									children: reportsQuery.data.data.map((r) => {
										const isPending = r.status === "PENDING";
										const isUnderReview = r.status === "UNDER_REVIEW";
										const isResolved = r.status === "RESOLVED" || r.status === "REVIEWED";
										const isDismissed = r.status === "DISMISSED";
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "hover:bg-muted/30 transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-1 font-mono",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-bold text-foreground",
															children: ["#", r.id.slice(0, 8)]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => copyToClipboard(r.id, "Report ID"),
															title: "Copy Full ID",
															className: "text-muted-foreground hover:text-foreground",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" })
														})]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "grid size-7 shrink-0 place-items-center rounded-full bg-navy text-[11px] font-bold text-navy-foreground",
															children: r.reporter?.name?.[0] || "U"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "min-w-0",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "truncate font-semibold text-foreground",
																children: r.reporter?.name || "Anonymous Student"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "truncate text-[10px] text-muted-foreground",
																children: r.reporter?.email || "N/A"
															})]
														})]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: cn("rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase", r.targetType === "EVENT" && "bg-blue-500/10 text-blue-600 border border-blue-500/20", r.targetType === "ORGANIZATION" && "bg-indigo-500/10 text-indigo-600 border border-indigo-500/20", r.targetType === "USER" && "bg-purple-500/10 text-purple-600 border border-purple-500/20", r.targetType === "TEAM" && "bg-teal-500/10 text-teal-600 border border-teal-500/20"),
																	children: r.targetType
																}), r.targetEntity?.status && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-[9px] font-medium text-muted-foreground",
																	children: [
																		"(",
																		r.targetEntity.status,
																		")"
																	]
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-semibold text-foreground max-w-xs truncate",
																children: r.targetEntity?.name || `Target ID: ${r.targetId.slice(0, 10)}...`
															}),
															r.targetEntity?.subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[10px] text-muted-foreground truncate",
																children: r.targetEntity.subtitle
															})
														]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "max-w-xs",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-semibold text-foreground truncate",
															children: r.reason
														}), r.details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[11px] text-muted-foreground line-clamp-1 mt-0.5",
															children: r.details
														})]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3",
													children: r.evidenceUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: r.evidenceUrl,
														target: "_blank",
														rel: "noreferrer",
														className: "inline-flex items-center gap-1 rounded bg-muted px-2 py-1 text-[11px] font-medium text-primary hover:underline",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" }), " View Proof"]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] text-muted-foreground italic",
														children: "None supplied"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 whitespace-nowrap text-muted-foreground text-[11px]",
													children: formatDate(r.createdAt)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 whitespace-nowrap",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider", isPending && "bg-rose-500/10 text-rose-600 border border-rose-500/20", isUnderReview && "bg-amber-500/10 text-amber-600 border border-amber-500/20", isResolved && "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20", isDismissed && "bg-slate-500/10 text-slate-600 border border-slate-500/20"),
														children: [
															isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-3 text-rose-500" }),
															isUnderReview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3 text-amber-500" }),
															isResolved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3 text-emerald-500" }),
															isDismissed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3 text-slate-500" }),
															r.status
														]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 text-right",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-end gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															size: "sm",
															variant: "outline",
															className: "h-7 text-xs",
															onClick: () => setSelectedReportId(r.id),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3 mr-1" }), " Inspect"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
															asChild: true,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																variant: "ghost",
																size: "icon",
																className: "size-7",
																"aria-label": "Quick actions menu",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-3.5" })
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
															align: "end",
															className: "w-48 text-xs",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Quick Resolution" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
																r.status !== "UNDER_REVIEW" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
																	onClick: () => handleQuickStatusChange(r.id, "UNDER_REVIEW", "Active moderator review started"),
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 mr-2 text-amber-500" }), " Mark Under Review"]
																}),
																r.status !== "RESOLVED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
																	onClick: () => handleQuickStatusChange(r.id, "RESOLVED", "Resolved via quick action"),
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 mr-2 text-emerald-500" }), " Resolve Report"]
																}),
																r.status !== "DISMISSED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
																	onClick: () => handleQuickStatusChange(r.id, "DISMISSED", "No violation found"),
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3.5 mr-2 text-slate-500" }), " Dismiss Report"]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
																	onClick: () => setSelectedReportId(r.id),
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-3.5 mr-2 text-primary" }), " Full Investigation"]
																})
															]
														})] })]
													})
												})
											]
										}, r.id);
									})
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border px-4 py-3 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Showing ",
									Math.min(reportsQuery.data.total, (page - 1) * limit + 1),
									" to",
									" ",
									Math.min(reportsQuery.data.total, page * limit),
									" of ",
									reportsQuery.data.total,
									" reports"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									"aria-label": "Select page limit",
									value: limit,
									onChange: (e) => {
										setLimit(Number(e.target.value));
										setPage(1);
									},
									className: "h-7 rounded border border-input bg-background px-2 text-[11px] text-foreground focus:outline-none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 10,
											children: "10 / page"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 25,
											children: "25 / page"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 50,
											children: "50 / page"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 100,
											children: "100 / page"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										size: "sm",
										className: "h-7 text-xs",
										disabled: page <= 1,
										onClick: () => setPage((p) => Math.max(1, p - 1)),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5 mr-1" }), " Previous"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "px-2 font-medium text-foreground",
										children: [
											"Page ",
											page,
											" of ",
											reportsQuery.data.totalPages || 1
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										size: "sm",
										className: "h-7 text-xs",
										disabled: page >= reportsQuery.data.totalPages,
										onClick: () => setPage((p) => p + 1),
										children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5 ml-1" })]
									})
								]
							})]
						})]
					})
				]
			}),
			activeTab === "data-exports" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-bold text-foreground",
							children: "Platform Telemetry & Audit Logs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Generate on-demand datasets for participation, finances, volunteer registries, and campus health."
						})] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl border border-border bg-muted/20 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-sm text-foreground",
											children: "Users & Registrations"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-primary" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Comprehensive student directory, verification statuses, and society affiliations."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										className: "w-full text-xs",
										onClick: () => window.open("/api/v1/admin/reports-center/export?type=USERS", "_blank"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5 mr-1.5" }), " Download Users CSV"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl border border-border bg-muted/20 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-sm text-foreground",
											children: "Financial Ledger"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Verified payment transactions, provider references, and digital invoice records."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										className: "w-full text-xs",
										onClick: () => window.open("/api/v1/admin/reports-center/export?type=PAYMENTS_REVENUE", "_blank"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5 mr-1.5" }), " Download Financial CSV"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl border border-border bg-muted/20 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-sm text-foreground",
											children: "QR Gate Attendance"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-blue-500" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Physical check-in scans, timestamps, gate checkers, and venue turnout ratios."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										className: "w-full text-xs",
										onClick: () => window.open("/api/v1/admin/reports-center/export?type=ATTENDANCE", "_blank"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5 mr-1.5" }), " Download Attendance CSV"]
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!selectedReportId,
				onOpenChange: (open) => !open && setSelectedReportId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "max-w-3xl max-h-[90vh] overflow-y-auto",
					children: reportDetailQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-12 flex flex-col items-center justify-center space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-8 text-primary animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Fetching full report data & target context..."
						})]
					}) : reportDetailQuery.isError || !reportDetailQuery.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => reportDetailQuery.refetch() })
					}) : (() => {
						const r = reportDetailQuery.data.report;
						const target = reportDetailQuery.data.targetEntity;
						const audit = reportDetailQuery.data.auditHistory || [];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-start justify-between gap-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary",
												children: ["#", r.id]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", r.status === "PENDING" && "bg-rose-500/10 text-rose-600 border border-rose-500/20", r.status === "UNDER_REVIEW" && "bg-amber-500/10 text-amber-600 border border-amber-500/20", r.status === "RESOLVED" && "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20", r.status === "DISMISSED" && "bg-slate-500/10 text-slate-600 border border-slate-500/20"),
												children: r.status
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
											className: "text-lg font-bold text-foreground",
											children: ["Moderation Case: ", r.reason]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
											className: "text-xs text-muted-foreground mt-0.5",
											children: [
												"Submitted on ",
												formatDate(r.createdAt),
												" by ",
												r.reporter?.name || "Anonymous User"
											]
										})
									] })
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-muted/20 p-3 flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid size-8 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-navy-foreground",
											children: r.reporter?.name?.[0] || "U"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-foreground",
											children: r.reporter?.name || "Anonymous Student"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-muted-foreground",
											children: [
												r.reporter?.email,
												" • ",
												r.reporter?.university?.name || "Campus User"
											]
										})] })]
									}), r.resolvedBy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right text-[11px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Reviewed by: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: r.resolvedBy.name
										})] }), r.resolvedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: formatDate(r.resolvedAt) })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-card p-4 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border/50 pb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "size-3.5 text-primary" }), " Reported Content / Target Details"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-extrabold text-primary uppercase",
											children: r.targetType
										})]
									}), target ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "font-bold text-sm text-foreground",
													children: target.title || target.name || `Target ID: ${r.targetId}`
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted-foreground mt-0.5",
													children: [
														r.targetType === "EVENT" && `Organizer: ${target.organization?.name || "Independent"} • Campus: ${target.university?.name || "General"}`,
														r.targetType === "USER" && `${target.email} • Campus: ${target.university?.name || "General"} • Active: ${target.isActive ? "YES" : "NO"}`,
														r.targetType === "ORGANIZATION" && `University: ${target.university?.name || "General"} • Verified: ${target.isVerified ? "YES" : "NO"}`,
														r.targetType === "TEAM" && `Squad Leader: ${target.creator?.name || "Student"} • Status: ${target.isOpen ? "OPEN" : "CLOSED"}`
													]
												})] }),
												r.targetType === "EVENT" && target.slug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													asChild: true,
													size: "sm",
													variant: "outline",
													className: "h-7 text-xs shrink-0",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: `/events/${target.slug}`,
														target: "_blank",
														rel: "noreferrer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 mr-1" }), " View Event"]
													})
												}),
												r.targetType === "ORGANIZATION" && target.slug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													asChild: true,
													size: "sm",
													variant: "outline",
													className: "h-7 text-xs shrink-0",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: `/organizations/${target.slug}`,
														target: "_blank",
														rel: "noreferrer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 mr-1" }), " View Society"]
													})
												})
											]
										}), r.targetType === "EVENT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-3 gap-2 rounded-lg bg-muted/30 p-2.5 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground uppercase font-bold",
													children: "Status"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold text-foreground",
													children: target.status
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground uppercase font-bold",
													children: "Date & Venue"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold text-foreground truncate",
													children: target.venue || "Online"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground uppercase font-bold",
													children: "Pricing"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold text-foreground",
													children: target.isFree ? "Free" : `LKR ${target.price || target.studentPrice || 0}`
												})] })
											]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 bg-muted/20 rounded-lg text-xs text-muted-foreground italic",
										children: [
											"Target entity with ID ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
												className: "font-mono",
												children: r.targetId
											}),
											" could not be found or has been deleted."
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
										children: "Report Details / Statement"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1.5 rounded-xl border border-border bg-card p-3 text-xs text-foreground leading-relaxed whitespace-pre-wrap",
										children: r.details || r.reason
									})] }), r.evidenceUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
										children: "Evidence / Proof Attachment"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1.5 rounded-xl border border-border bg-card p-3 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-xs text-primary truncate",
												children: r.evidenceUrl
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												size: "sm",
												variant: "outline",
												className: "h-6 text-[11px]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: r.evidenceUrl,
													target: "_blank",
													rel: "noreferrer",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 mr-1" }), " Open URL"]
												})
											})]
										}), /\.(jpg|jpeg|png|webp|gif)$/i.test(r.evidenceUrl) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 overflow-hidden rounded-lg border border-border max-h-48",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: r.evidenceUrl,
												alt: "Evidence preview",
												className: "w-full object-cover max-h-48"
											})
										})]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center justify-between",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
											className: "font-bold text-sm text-foreground flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4 text-primary" }), " Moderator Adjudication & Action Notes"]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs font-bold",
												children: "Change Report Status"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-4 gap-2 mt-1.5",
												children: [
													{
														value: "PENDING",
														label: "Pending",
														color: "hover:border-rose-500"
													},
													{
														value: "UNDER_REVIEW",
														label: "Under Review",
														color: "hover:border-amber-500"
													},
													{
														value: "RESOLVED",
														label: "Resolved",
														color: "hover:border-emerald-500"
													},
													{
														value: "DISMISSED",
														label: "Dismissed",
														color: "hover:border-slate-500"
													}
												].map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setNewStatusSelection(st.value),
													className: cn("flex items-center justify-center p-2 rounded-lg border text-xs font-semibold transition-all", newStatusSelection === st.value ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card border-border text-muted-foreground hover:text-foreground", st.color),
													children: st.label
												}, st.value))
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "action-notes",
												className: "text-xs font-bold",
												children: "Moderation Notes / Resolution Reason"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												id: "action-notes",
												value: actionNotesInput,
												onChange: (e) => setActionNotesInput(e.target.value),
												placeholder: "Record resolution rationale, steps taken, or communication with organizers...",
												className: "mt-1.5 text-xs min-h-20",
												defaultValue: r.actionNotes || ""
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/50",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [
														r.targetType === "EVENT" && target && target.status !== "CANCELLED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															type: "button",
															variant: "destructive",
															size: "sm",
															className: "h-8 text-xs",
															onClick: () => setTargetEnforcementDialog({
																action: "CANCEL_EVENT",
																title: `Cancel & Remove "${target.title || "Event"}"`,
																description: "This will revoke all active admission tickets, notify the creator, and set event status to CANCELLED.",
																penaltyReason: `Cancelled by administration: ${r.reason}`
															}),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 mr-1" }), " Cancel Event"]
														}),
														r.targetType === "USER" && target && target.isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															type: "button",
															variant: "destructive",
															size: "sm",
															className: "h-8 text-xs",
															onClick: () => setTargetEnforcementDialog({
																action: "SUSPEND_USER",
																title: `Suspend Account: ${target.name || "User"}`,
																description: "This will deactivate user login permissions and send an account suspension notice.",
																penaltyReason: `Suspended by administration: ${r.reason}`
															}),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, { className: "size-3.5 mr-1" }), " Suspend User"]
														}),
														r.targetType === "ORGANIZATION" && target && target.status !== "SUSPENDED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															type: "button",
															variant: "destructive",
															size: "sm",
															className: "h-8 text-xs",
															onClick: () => setTargetEnforcementDialog({
																action: "SUSPEND_ORGANIZATION",
																title: `Suspend Society: ${target.name || "Organization"}`,
																description: "This will freeze organization publishing privileges and notify all society leaders.",
																penaltyReason: `Suspended by administration: ${r.reason}`
															}),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-3.5 mr-1" }), " Suspend Society"]
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													disabled: isProcessing,
													onClick: handleUpdateDetailStatus,
													className: "h-8 text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 mr-1" }), " Update Status & Notes"]
												})]
											})
										]
									})]
								}),
								audit.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-card p-4 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-3.5 text-primary" }),
											" Moderation Audit Trail (",
											audit.length,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "divide-y divide-border/50 text-xs",
										children: audit.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "py-2 flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-foreground",
													children: log.action
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-muted-foreground ml-1.5",
													children: ["by ", log.user?.name || "System"]
												}),
												log.reason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-muted-foreground italic mt-0.5",
													children: [
														"\"",
														log.reason,
														"\""
													]
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground shrink-0",
												children: formatDate(log.createdAt)
											})]
										}, log.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
									className: "pt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => setSelectedReportId(null),
										children: "Close"
									})
								})
							]
						});
					})()
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!targetEnforcementDialog,
				onOpenChange: (open) => !open && setTargetEnforcementDialog(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "text-base font-bold text-destructive flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-5 text-destructive" }), targetEnforcementDialog?.title]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-xs text-muted-foreground",
							children: targetEnforcementDialog?.description
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "enforcement-reason",
								className: "text-xs font-bold",
								children: "Penalty Notice / Reason"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "enforcement-reason",
								value: enforcementReason,
								onChange: (e) => setEnforcementReason(e.target.value),
								placeholder: "Enter specific policy clause or violation details communicated to the user...",
								className: "mt-1.5 text-xs min-h-20",
								defaultValue: targetEnforcementDialog?.penaltyReason || ""
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setTargetEnforcementDialog(null),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "destructive",
								size: "sm",
								disabled: isProcessing,
								onClick: handleExecuteTargetEnforcement,
								children: "Confirm & Execute Action"
							})]
						})
					]
				})
			})
		]
	});
}
var MONTH_NAMES = [
	{
		value: "01",
		label: "01 - January"
	},
	{
		value: "02",
		label: "02 - February"
	},
	{
		value: "03",
		label: "03 - March"
	},
	{
		value: "04",
		label: "04 - April"
	},
	{
		value: "05",
		label: "05 - May"
	},
	{
		value: "06",
		label: "06 - June"
	},
	{
		value: "07",
		label: "07 - July"
	},
	{
		value: "08",
		label: "08 - August"
	},
	{
		value: "09",
		label: "09 - September"
	},
	{
		value: "10",
		label: "10 - October"
	},
	{
		value: "11",
		label: "11 - November"
	},
	{
		value: "12",
		label: "12 - December"
	}
];
var AVAILABLE_YEARS = [
	"2026",
	"2025",
	"2024",
	"2023"
];
function AdminDateFilter({ values, onChange, className, compact = false }) {
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	const toIsoDate = (d) => {
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
	};
	const handlePresetSelect = (preset) => {
		const today = /* @__PURE__ */ new Date();
		if (preset === "ALL") {
			onChange({
				preset: "ALL",
				year: "",
				month: "",
				startDate: "",
				endDate: ""
			});
			return;
		}
		if (preset === "TODAY") {
			const todayStr = toIsoDate(today);
			onChange({
				preset: "TODAY",
				year: String(today.getFullYear()),
				month: String(today.getMonth() + 1).padStart(2, "0"),
				startDate: todayStr,
				endDate: todayStr
			});
			return;
		}
		if (preset === "THIS_WEEK") {
			const dayOfWeek = today.getDay();
			const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
			const monday = new Date(today);
			monday.setDate(today.getDate() - diffToMonday);
			onChange({
				preset: "THIS_WEEK",
				year: String(today.getFullYear()),
				month: String(today.getMonth() + 1).padStart(2, "0"),
				startDate: toIsoDate(monday),
				endDate: toIsoDate(today)
			});
			return;
		}
		if (preset === "THIS_MONTH") {
			const y = today.getFullYear();
			const m = today.getMonth();
			const start = new Date(y, m, 1);
			const end = new Date(y, m + 1, 0);
			onChange({
				preset: "THIS_MONTH",
				year: String(y),
				month: String(m + 1).padStart(2, "0"),
				startDate: toIsoDate(start),
				endDate: toIsoDate(end)
			});
			return;
		}
		if (preset === "LAST_MONTH") {
			const y = today.getFullYear();
			const m = today.getMonth() - 1;
			const start = new Date(y, m, 1);
			const end = new Date(y, m + 1, 0);
			onChange({
				preset: "LAST_MONTH",
				year: String(start.getFullYear()),
				month: String(start.getMonth() + 1).padStart(2, "0"),
				startDate: toIsoDate(start),
				endDate: toIsoDate(end)
			});
			return;
		}
		if (preset === "THIS_YEAR") {
			const y = today.getFullYear();
			onChange({
				preset: "THIS_YEAR",
				year: String(y),
				month: "",
				startDate: `${y}-01-01`,
				endDate: `${y}-12-31`
			});
			return;
		}
		if (preset === "LAST_YEAR") {
			const y = today.getFullYear() - 1;
			onChange({
				preset: "LAST_YEAR",
				year: String(y),
				month: "",
				startDate: `${y}-01-01`,
				endDate: `${y}-12-31`
			});
			return;
		}
		if (preset === "CUSTOM") onChange({
			...values,
			preset: "CUSTOM"
		});
	};
	const handleYearChange = (yearVal) => {
		if (!yearVal) {
			onChange({
				...values,
				year: "",
				preset: values.month ? "CUSTOM" : "ALL",
				startDate: values.month ? values.startDate : "",
				endDate: values.month ? values.endDate : ""
			});
			return;
		}
		const y = parseInt(yearVal, 10);
		if (values.month) {
			const m = parseInt(values.month, 10);
			const start = new Date(y, m - 1, 1);
			const end = new Date(y, m, 0);
			onChange({
				...values,
				year: yearVal,
				preset: "CUSTOM",
				startDate: toIsoDate(start),
				endDate: toIsoDate(end)
			});
		} else onChange({
			...values,
			year: yearVal,
			preset: "CUSTOM",
			startDate: `${yearVal}-01-01`,
			endDate: `${yearVal}-12-31`
		});
	};
	const handleMonthChange = (monthVal) => {
		if (!monthVal) {
			if (values.year) onChange({
				...values,
				month: "",
				preset: "CUSTOM",
				startDate: `${values.year}-01-01`,
				endDate: `${values.year}-12-31`
			});
			else onChange({
				...values,
				month: "",
				preset: "ALL",
				startDate: "",
				endDate: ""
			});
			return;
		}
		const y = values.year ? parseInt(values.year, 10) : currentYear;
		const m = parseInt(monthVal, 10);
		const start = new Date(y, m - 1, 1);
		const end = new Date(y, m, 0);
		onChange({
			...values,
			year: values.year || String(y),
			month: monthVal,
			preset: "CUSTOM",
			startDate: toIsoDate(start),
			endDate: toIsoDate(end)
		});
	};
	const handleStartDateChange = (val) => {
		onChange({
			...values,
			preset: "CUSTOM",
			startDate: val
		});
	};
	const handleEndDateChange = (val) => {
		onChange({
			...values,
			preset: "CUSTOM",
			endDate: val
		});
	};
	const handleClear = () => {
		onChange({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
	};
	const isFiltered = Boolean(values.startDate || values.endDate || values.year || values.month || values.preset && values.preset !== "ALL");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-wrap items-center gap-2", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: values.preset || "ALL",
					onChange: (e) => handlePresetSelect(e.target.value),
					className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-medium",
					title: "Date Range Preset",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "ALL",
							children: "All Time"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "TODAY",
							children: "Today"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "THIS_WEEK",
							children: "This Week"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "THIS_MONTH",
							children: "This Month"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "LAST_MONTH",
							children: "Last Month"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: "THIS_YEAR",
							children: [
								"This Year (",
								currentYear,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: "LAST_YEAR",
							children: [
								"Last Year (",
								currentYear - 1,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "CUSTOM",
							children: "Custom Range..."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: values.year || "",
				onChange: (e) => handleYearChange(e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
				title: "Filter by Year",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Years"
				}), AVAILABLE_YEARS.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: y,
					children: ["Year ", y]
				}, y))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: values.month || "",
				onChange: (e) => handleMonthChange(e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
				title: "Filter by Month",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Months"
				}), MONTH_NAMES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: m.value,
					children: m.label
				}, m.value))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 bg-muted/30 p-0.5 rounded border border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-muted-foreground px-1.5 font-medium",
						children: "From:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: values.startDate || "",
						onChange: (e) => handleStartDateChange(e.target.value),
						className: "h-7 rounded border border-border/80 bg-background px-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
						title: "Start Date (Inclusive)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-muted-foreground px-1 font-medium",
						children: "To:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: values.endDate || "",
						onChange: (e) => handleEndDateChange(e.target.value),
						className: "h-7 rounded border border-border/80 bg-background px-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
						title: "End Date (Inclusive)"
					})
				]
			}),
			isFiltered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "ghost",
				size: "sm",
				onClick: handleClear,
				className: "h-8 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted",
				title: "Reset date range filter",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5 mr-1" }), "Clear Date"]
			})
		]
	});
}
function AdminVerificationQueue({ universities = [], faculties = [], departments = [] }) {
	const queryClient = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("ALL");
	const [type, setType] = (0, import_react.useState)("ALL");
	const [universityId, setUniversityId] = (0, import_react.useState)("ALL");
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(15);
	const [copiedId, setCopiedId] = (0, import_react.useState)(null);
	const [selectedVerificationId, setSelectedVerificationId] = (0, import_react.useState)(null);
	const [actionType, setActionType] = (0, import_react.useState)(null);
	const [rejectionReason, setRejectionReason] = (0, import_react.useState)("");
	const [reviewNotes, setReviewNotes] = (0, import_react.useState)("");
	const [isExportingCsv, setIsExportingCsv] = (0, import_react.useState)(false);
	const [isExportingPdf, setIsExportingPdf] = (0, import_react.useState)(false);
	const handleExport = async (format) => {
		const totalCount = verificationsQuery.data?.total || 0;
		if (totalCount === 0) {
			toast.info("No verification requests match the active filters to export.");
			return;
		}
		if (format === "csv") setIsExportingCsv(true);
		else setIsExportingPdf(true);
		try {
			toast.info(`Generating ${format.toUpperCase()} export...`, { description: `Exporting all ${totalCount.toLocaleString()} filtered verification records.` });
			const filename = await adminApi.exportData("verifications", format, {
				search: search.trim() || void 0,
				status: status !== "ALL" ? status : void 0,
				type: type !== "ALL" ? type : void 0,
				universityId: universityId !== "ALL" ? universityId : void 0,
				startDate: dateFilter.startDate || void 0,
				endDate: dateFilter.endDate || void 0,
				year: dateFilter.year || void 0,
				month: dateFilter.month || void 0,
				datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0
			});
			toast.success(`Export ready!`, { description: `Downloaded ${filename}` });
		} catch (err) {
			toast.error(`Export failed`, { description: err?.message || "Failed to generate export" });
		} finally {
			if (format === "csv") setIsExportingCsv(false);
			else setIsExportingPdf(false);
		}
	};
	const verificationsQuery = useQuery({
		queryKey: [
			"admin",
			"verifications",
			{
				search: search.trim() || void 0,
				status: status !== "ALL" ? status : void 0,
				type: type !== "ALL" ? type : void 0,
				universityId: universityId !== "ALL" ? universityId : void 0,
				startDate: dateFilter.startDate || void 0,
				endDate: dateFilter.endDate || void 0,
				year: dateFilter.year || void 0,
				month: dateFilter.month || void 0,
				datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
				page,
				limit: pageSize
			}
		],
		queryFn: () => adminApi.getVerifications({
			search: search.trim() || void 0,
			status: status !== "ALL" ? status : void 0,
			type: type !== "ALL" ? type : void 0,
			universityId: universityId !== "ALL" ? universityId : void 0,
			startDate: dateFilter.startDate || void 0,
			endDate: dateFilter.endDate || void 0,
			year: dateFilter.year || void 0,
			month: dateFilter.month || void 0,
			datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
			page,
			limit: pageSize
		})
	});
	const statsQuery = useQuery({
		queryKey: [
			"admin",
			"verifications",
			"stats"
		],
		queryFn: () => adminApi.getVerificationStats(),
		refetchInterval: 3e4
	});
	const detailQuery = useQuery({
		queryKey: [
			"admin",
			"verification-detail",
			selectedVerificationId
		],
		queryFn: () => adminApi.getVerificationDetails(selectedVerificationId),
		enabled: !!selectedVerificationId
	});
	const respondMutation = useMutation({
		mutationFn: ({ id, status, reviewNotes, rejectionReason }) => adminApi.respondVerification(id, status, reviewNotes, rejectionReason),
		onSuccess: (data, variables) => {
			toast.success(variables.status === "APPROVED" ? "Verification approved successfully! Institutional credential badge granted." : "Verification rejected. Notification dispatched to student.");
			queryClient.invalidateQueries({ queryKey: ["admin", "verifications"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
			queryClient.invalidateQueries({ queryKey: ["profile"] });
			setSelectedVerificationId(null);
			setActionType(null);
			setRejectionReason("");
			setReviewNotes("");
		},
		onError: (err) => {
			toast.error(err?.message || "Failed to process verification decision.");
		}
	});
	const handleResetFilters = () => {
		setSearch("");
		setStatus("ALL");
		setType("ALL");
		setUniversityId("ALL");
		setDateFilter({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
		setPage(1);
	};
	const handleOpenDetail = (id) => {
		setSelectedVerificationId(id);
		setActionType(null);
		setRejectionReason("");
		setReviewNotes("");
	};
	const handleQuickApprove = (v, e) => {
		e.stopPropagation();
		respondMutation.mutate({
			id: v.id,
			status: "APPROVED",
			reviewNotes: "Fast-track approved by platform administrator."
		});
	};
	const handleExecuteDecision = () => {
		if (!selectedVerificationId || !actionType) return;
		if (actionType === "REJECT" && !rejectionReason.trim() && !reviewNotes.trim()) {
			toast.error("Please provide a rejection reason or justification explanation.");
			return;
		}
		respondMutation.mutate({
			id: selectedVerificationId,
			status: actionType === "APPROVE" ? "APPROVED" : "REJECTED",
			rejectionReason: rejectionReason.trim() || void 0,
			reviewNotes: reviewNotes.trim() || void 0
		});
	};
	const stats = statsQuery.data || verificationsQuery.data?.stats;
	const verifications = verificationsQuery.data?.data || [];
	const totalRecords = verificationsQuery.data?.total || 0;
	const totalPages = verificationsQuery.data?.totalPages || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Institutional Verification Queue",
				description: "Review student smart-card credentials, enrollment verifications, and society charter applications with authoritative database synchronization.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => {
								verificationsQuery.refetch();
								statsQuery.refetch();
								toast.success("Verification queue refreshed");
							},
							className: "gap-1.5 h-8 text-xs font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Refresh"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => handleExport("csv"),
							disabled: isExportingCsv || verificationsQuery.isLoading,
							className: "gap-1.5 h-8 text-xs font-medium text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
							children: [isExportingCsv ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-3.5 text-emerald-600 dark:text-emerald-400" }), "CSV"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => handleExport("pdf"),
							disabled: isExportingPdf || verificationsQuery.isLoading,
							className: "gap-1.5 h-8 text-xs font-medium text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40 hover:bg-amber-50 dark:hover:bg-amber-950/30",
							children: [isExportingPdf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5 text-amber-600 dark:text-amber-400" }), "PDF"]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => {
							setStatus("ALL");
							setPage(1);
						},
						className: cn("group cursor-pointer rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md", status === "ALL" ? "border-primary ring-1 ring-primary/20" : "border-border"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-muted-foreground",
									children: "Total Requests"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-7 place-items-center rounded-lg bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black tracking-tight text-foreground",
								children: stats?.total ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-[11px] text-muted-foreground",
								children: stats ? `${stats.studentRequests} student • ${stats.organizationRequests} org` : "All submissions"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => {
							setStatus("PENDING");
							setPage(1);
						},
						className: cn("group cursor-pointer rounded-xl border bg-card p-4 transition-all hover:border-amber-500/50 hover:shadow-md", status === "PENDING" ? "border-amber-500 ring-1 ring-amber-500/20" : "border-border"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-amber-600 dark:text-amber-400",
									children: "Pending Review"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-7 place-items-center rounded-lg bg-amber-500/10 text-amber-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 animate-pulse" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black tracking-tight text-amber-600 dark:text-amber-400",
								children: stats?.pending ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-[11px] font-medium text-amber-600/80",
								children: "Action required by admins"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => {
							setStatus("APPROVED");
							setPage(1);
						},
						className: cn("group cursor-pointer rounded-xl border bg-card p-4 transition-all hover:border-emerald-500/50 hover:shadow-md", status === "APPROVED" ? "border-emerald-500 ring-1 ring-emerald-500/20" : "border-border"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-emerald-600 dark:text-emerald-400",
									children: "Approved"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-7 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black tracking-tight text-emerald-600 dark:text-emerald-400",
								children: stats?.approved ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-[11px] text-muted-foreground",
								children: "Verified institutional identities"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => {
							setStatus("REJECTED");
							setPage(1);
						},
						className: cn("group cursor-pointer rounded-xl border bg-card p-4 transition-all hover:border-rose-500/50 hover:shadow-md", status === "REJECTED" ? "border-rose-500 ring-1 ring-rose-500/20" : "border-border"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-rose-600 dark:text-rose-400",
									children: "Rejected"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-7 place-items-center rounded-lg bg-rose-500/10 text-rose-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black tracking-tight text-rose-600 dark:text-rose-400",
								children: stats?.rejected ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-[11px] text-muted-foreground",
								children: "Invalid credentials / notes"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-muted-foreground",
									children: "Approval Rate"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-7 place-items-center rounded-lg bg-indigo-500/10 text-indigo-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black tracking-tight text-foreground",
								children: stats && stats.total > 0 ? `${Math.round(stats.approved / (stats.approved + stats.rejected || 1) * 100)}%` : "100%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-[11px] text-muted-foreground",
								children: "Trust & compliance benchmark"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 md:grid-cols-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative md:col-span-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: search,
								onChange: (e) => {
									setSearch(e.target.value);
									setPage(1);
								},
								placeholder: "Search by student name, email, student ID, org...",
								className: "pl-9 text-xs"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: status,
								onChange: (e) => {
									setStatus(e.target.value);
									setPage(1);
								},
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ALL",
										children: "All Statuses"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "PENDING",
										children: "Pending Review"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "APPROVED",
										children: "Approved"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "REJECTED",
										children: "Rejected"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: type,
								onChange: (e) => {
									setType(e.target.value);
									setPage(1);
								},
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ALL",
										children: "All Types"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "STUDENT",
										children: "Student Credentials"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ORGANIZATION",
										children: "Society Verification"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: universityId,
								onChange: (e) => {
									setUniversityId(e.target.value);
									setPage(1);
								},
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ALL",
									children: "All Universities"
								}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: u.id,
									children: u.code ? `${u.code} - ${u.name}` : u.name
								}, u.id))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: pageSize,
								onChange: (e) => {
									setPageSize(Number(e.target.value));
									setPage(1);
								},
								className: "rounded-md border border-input bg-background px-2.5 py-2 text-xs font-medium text-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "10",
										children: "10 / page"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "15",
										children: "15 / page"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "25",
										children: "25 / page"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "50",
										children: "50 / page"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: handleResetFilters,
								title: "Reset all filters",
								className: "h-9 px-2 text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" })
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-3 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDateFilter, {
						values: dateFilter,
						onChange: (val) => {
							setDateFilter(val);
							setPage(1);
						}
					}), (search || status !== "ALL" || type !== "ALL" || universityId !== "ALL" || dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto font-medium text-primary",
						children: [
							"Filtered: ",
							totalRecords,
							" matching request",
							totalRecords === 1 ? "" : "s"
						]
					})]
				})]
			}),
			verificationsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : verificationsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => verificationsQuery.refetch() }) : verifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-8 text-emerald-500" }),
				title: "No verification applications found",
				description: status === "PENDING" ? "All pending student identity and society verification requests have been cleared!" : "No verification requests match your filter parameters."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "border-b border-border bg-muted/40 text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5",
										children: "Student / Applicant"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5",
										children: "Type"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5",
										children: "Academic Affiliation"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5",
										children: "Proof Document"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5",
										children: "Submitted"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5 text-right",
										children: "Actions"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border",
								children: verifications.map((v) => {
									const isOrg = !!v.organizationId;
									const uni = v.requestedBy?.studentProfile?.university || v.requestedBy?.university || v.organization?.university;
									const faculty = v.requestedBy?.studentProfile?.faculty;
									const department = v.requestedBy?.studentProfile?.department;
									const studentIdNum = v.requestedBy?.studentProfile?.studentIdNumber;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										onClick: () => handleOpenDetail(v.id),
										className: "group cursor-pointer hover:bg-muted/30 transition-colors",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [v.requestedBy?.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: v.requestedBy.avatarUrl,
														alt: v.requestedBy.name,
														className: "size-8 shrink-0 rounded-full object-cover border border-border"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "grid size-8 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-navy-foreground",
														children: v.requestedBy?.name?.[0]?.toUpperCase() || "U"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "min-w-0",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "font-semibold text-foreground truncate",
																	children: v.requestedBy?.name || "Unknown User"
																}), v.requestedBy?.universityEmailVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	title: "Verified University Student",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-gold shrink-0" })
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[11px] text-muted-foreground truncate",
																children: v.requestedBy?.email
															}),
															studentIdNum && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "text-[10px] font-mono text-muted-foreground",
																children: ["ID: ", studentIdNum]
															})
														]
													})]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3.5",
												children: isOrg ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3" }), "Society"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-3" }), "Student ID"]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "max-w-xs space-y-0.5",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-medium text-foreground truncate",
															children: uni?.code ? `${uni.code} · ${uni.name}` : uni?.name || "Independent"
														}),
														(faculty || department) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[11px] text-muted-foreground truncate",
															children: [faculty?.name, department?.name].filter(Boolean).join(" · ")
														}),
														v.organization && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[11px] font-semibold text-primary truncate",
															children: ["Club: ", v.organization.name]
														})
													]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3.5",
												onClick: (e) => e.stopPropagation(),
												children: v.documentUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: v.documentUrl,
													target: "_blank",
													rel: "noreferrer",
													className: "inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-muted transition-colors",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5 text-primary" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Proof" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 text-muted-foreground" })
													]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] text-muted-foreground italic",
													children: "No document attached"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-3.5 text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: new Date(v.createdAt).toLocaleDateString() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px]",
													children: new Date(v.createdAt).toLocaleTimeString([], {
														hour: "2-digit",
														minute: "2-digit"
													})
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-3.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase", v.status === "PENDING" && "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20", v.status === "APPROVED" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20", v.status === "REJECTED" && "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"),
													children: [
														v.status === "PENDING" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3 animate-pulse" }),
														v.status === "APPROVED" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }),
														v.status === "REJECTED" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3" }),
														v.status
													]
												}), v.reviewedBy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-0.5 text-[10px] text-muted-foreground",
													children: ["by ", v.reviewedBy.name]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3.5 text-right",
												onClick: (e) => e.stopPropagation(),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-end gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														variant: "outline",
														size: "sm",
														className: "h-7 text-xs gap-1",
														onClick: () => handleOpenDetail(v.id),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3" }), "Inspect"]
													}), v.status === "PENDING" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														size: "sm",
														className: "h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1",
														onClick: (e) => handleQuickApprove(v, e),
														disabled: respondMutation.isPending,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), "Approve"]
													})]
												})
											})
										]
									}, v.id);
								})
							})]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						"Showing ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: (page - 1) * pageSize + 1
						}),
						" to",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: Math.min(page * pageSize, totalRecords)
						}),
						" of",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: totalRecords
						}),
						" verification records"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								className: "h-8 text-xs",
								disabled: page <= 1,
								onClick: () => setPage((p) => Math.max(1, p - 1)),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5 mr-1" }), "Previous"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-2 font-medium text-foreground",
								children: [
									"Page ",
									page,
									" of ",
									totalPages
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								className: "h-8 text-xs",
								disabled: page >= totalPages,
								onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
								children: ["Next", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5 ml-1" })]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!selectedVerificationId,
				onOpenChange: (open) => {
					if (!open) {
						setSelectedVerificationId(null);
						setActionType(null);
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-2xl max-h-[90vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-8 place-items-center rounded-lg bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-base font-bold",
								children: "Verification Application Details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								className: "text-xs",
								children: "Review applicant proof document, academic background, and record formal review decision."
							})] })]
						}) }),
						detailQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : detailQuery.isError || !detailQuery.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => detailQuery.refetch() }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5 text-xs",
							children: [
								(() => {
									const v = detailQuery.data?.verification || detailQuery.data;
									const student = v?.requestedBy;
									const profile = student?.studentProfile;
									const uni = profile?.university || student?.university || v?.organization?.university;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-muted/40 p-4 space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [student?.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: student.avatarUrl,
													alt: student.name,
													className: "size-12 rounded-full object-cover border-2 border-border"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid size-12 place-items-center rounded-full bg-navy text-sm font-bold text-navy-foreground",
													children: student?.name?.[0]?.toUpperCase() || "U"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "font-bold text-sm text-foreground",
														children: student?.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("rounded px-1.5 py-0.5 text-[9px] font-bold uppercase", v.status === "PENDING" && "bg-amber-500/10 text-amber-600", v.status === "APPROVED" && "bg-emerald-500/10 text-emerald-600", v.status === "REJECTED" && "bg-rose-500/10 text-rose-600"),
														children: v.status
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-muted-foreground flex items-center gap-1.5 mt-0.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3" }), student?.email]
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-right text-[11px] text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "font-mono",
													children: ["Ref: #", v.id.slice(0, 10)]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: new Date(v.createdAt).toLocaleString() })]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-2 border-t border-border/50 pt-2 text-[11px] sm:grid-cols-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-muted-foreground uppercase text-[9px] font-bold",
													children: "University"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold text-foreground",
													children: uni?.code || uni?.name || "Independent"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-muted-foreground uppercase text-[9px] font-bold",
													children: "Faculty"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold text-foreground",
													children: profile?.faculty?.name || "—"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-muted-foreground uppercase text-[9px] font-bold",
													children: "Department"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold text-foreground",
													children: profile?.department?.name || "—"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-muted-foreground uppercase text-[9px] font-bold",
													children: "Student ID No."
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold text-foreground font-mono",
													children: profile?.studentIdNumber || "Not entered"
												})] })
											]
										})]
									});
								})(),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-card p-3 space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
										children: "Applicant Submission Statement"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-foreground leading-relaxed",
										children: (detailQuery.data?.verification || detailQuery.data)?.notes || "No additional text statement provided by applicant."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-card p-4 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-foreground",
												children: "Attached Credential Proof"
											})]
										}), (detailQuery.data?.verification || detailQuery.data)?.documentUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: (detailQuery.data?.verification || detailQuery.data).documentUrl,
											target: "_blank",
											rel: "noreferrer",
											className: "inline-flex items-center gap-1 text-primary hover:underline font-semibold text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open Full Size" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
										})]
									}), (detailQuery.data?.verification || detailQuery.data)?.documentUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-md border border-border overflow-hidden bg-muted/20 flex flex-col items-center justify-center p-2",
										children: (detailQuery.data?.verification || detailQuery.data).documentUrl.match(/\.(jpg|jpeg|png|webp|gif)$/i) || (detailQuery.data?.verification || detailQuery.data).documentUrl.includes("images.unsplash.com") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: (detailQuery.data?.verification || detailQuery.data).documentUrl,
											alt: "Student ID Proof",
											className: "max-h-72 w-auto rounded object-contain shadow-sm border border-border"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "py-6 text-center space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-10 text-muted-foreground mx-auto" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-medium text-foreground",
													children: "Document Attachment (PDF or External Credential)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: (detailQuery.data?.verification || detailQuery.data).documentUrl,
													target: "_blank",
													rel: "noreferrer",
													className: "inline-flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), "View Secure Document"]
												})
											]
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded border border-dashed border-border p-4 text-center text-muted-foreground",
										children: "No document proof attachment was provided with this application."
									})]
								}),
								(detailQuery.data?.verification || detailQuery.data)?.reviewNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-muted/30 p-3 space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
											children: "Recorded Moderator Notes"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-foreground",
											children: (detailQuery.data?.verification || detailQuery.data).reviewNotes
										}),
										(detailQuery.data?.verification || detailQuery.data).reviewedBy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] text-muted-foreground mt-1",
											children: [
												"Reviewed by ",
												(detailQuery.data?.verification || detailQuery.data).reviewedBy.name,
												" on",
												" ",
												(detailQuery.data?.verification || detailQuery.data).reviewedAt ? new Date((detailQuery.data?.verification || detailQuery.data).reviewedAt).toLocaleString() : "—"
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-sm text-foreground",
												children: "Administrative Decision"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												type: "button",
												variant: actionType === "APPROVE" ? "default" : "outline",
												className: cn("flex-1 h-9 gap-1.5", actionType === "APPROVE" && "bg-emerald-600 hover:bg-emerald-700 text-white"),
												onClick: () => setActionType("APPROVE"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), "Approve Credential"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												type: "button",
												variant: actionType === "REJECT" ? "default" : "outline",
												className: cn("flex-1 h-9 gap-1.5", actionType === "REJECT" && "bg-destructive text-destructive-foreground hover:bg-destructive/90"),
												onClick: () => setActionType("REJECT"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4" }), "Reject Submission"]
											})]
										}),
										actionType === "REJECT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2 pt-2 border-t border-border/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "reject-reason",
												className: "text-xs font-bold text-destructive",
												children: "Rejection Reason (Required)*"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												id: "reject-reason",
												value: rejectionReason,
												onChange: (e) => setRejectionReason(e.target.value),
												className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-destructive",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "",
														children: "-- Select a primary rejection reason --"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Student ID card image is unreadable or blurry",
														children: "Student ID card image is unreadable or blurry"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "ID expired or academic year mismatch with records",
														children: "ID expired or academic year mismatch with records"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Name on document does not match account name",
														children: "Name on document does not match account name"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Unofficial document submitted (library pass / gym card)",
														children: "Unofficial document submitted (library pass / gym card)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "University domain or affiliation unverified",
														children: "University domain or affiliation unverified"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Suspicious or edited document detected",
														children: "Suspicious or edited document detected"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Other administrative policy violation",
														children: "Other administrative policy violation"
													})
												]
											})]
										}),
										actionType && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1 pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "review-notes",
												className: "text-xs font-semibold text-foreground",
												children: "Moderator Explanatory Notes (Optional)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												id: "review-notes",
												value: reviewNotes,
												onChange: (e) => setReviewNotes(e.target.value),
												placeholder: "Add internal notes or specific guidance dispatched to the applicant...",
												rows: 2,
												className: "text-xs"
											})]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setSelectedVerificationId(null),
								children: "Close"
							}), actionType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								className: cn("gap-1.5", actionType === "APPROVE" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-destructive hover:bg-destructive/90 text-white"),
								onClick: handleExecuteDecision,
								disabled: respondMutation.isPending,
								children: respondMutation.isPending ? "Recording..." : actionType === "APPROVE" ? "Confirm & Grant Verified Badge" : "Confirm & Reject Application"
							})]
						})
					]
				})
			})
		]
	});
}
function AdminUniversities({ onOpenCreateFaculty }) {
	const queryClient = useQueryClient();
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [cityFilter, setCityFilter] = (0, import_react.useState)("all");
	const [sortBy, setSortBy] = (0, import_react.useState)("name");
	const [sortOrder, setSortOrder] = (0, import_react.useState)("asc");
	const [page, setPage] = (0, import_react.useState)(1);
	const limit = 24;
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [isExportingCsv, setIsExportingCsv] = (0, import_react.useState)(false);
	const [isExportingPdf, setIsExportingPdf] = (0, import_react.useState)(false);
	const [createModalOpen, setCreateModalOpen] = (0, import_react.useState)(false);
	const [editModalUni, setEditModalUni] = (0, import_react.useState)(null);
	const [detailModalId, setDetailModalId] = (0, import_react.useState)(null);
	const [domainModalUni, setDomainModalUni] = (0, import_react.useState)(null);
	const [statusConfirmUni, setStatusConfirmUni] = (0, import_react.useState)(null);
	const [deleteConfirmUni, setDeleteConfirmUni] = (0, import_react.useState)(null);
	const [createForm, setCreateForm] = (0, import_react.useState)({
		name: "",
		code: "",
		slug: "",
		city: "",
		country: "Sri Lanka",
		domain: "",
		websiteUrl: "",
		description: "",
		logoUrl: "",
		isVerified: true
	});
	const [editForm, setEditForm] = (0, import_react.useState)({
		name: "",
		code: "",
		slug: "",
		city: "",
		country: "Sri Lanka",
		domain: "",
		websiteUrl: "",
		description: "",
		logoUrl: "",
		bannerUrl: "",
		isVerified: true
	});
	const [newDomain, setNewDomain] = (0, import_react.useState)("");
	const [isPrimaryDomain, setIsPrimaryDomain] = (0, import_react.useState)(false);
	const [detailTab, setDetailTab] = (0, import_react.useState)("overview");
	const universitiesQuery = useQuery({
		queryKey: [
			"admin",
			"universities",
			{
				search: searchTerm || void 0,
				isVerified: statusFilter === "all" ? void 0 : statusFilter === "verified",
				city: cityFilter === "all" ? void 0 : cityFilter,
				sortBy,
				sortOrder,
				startDate: dateFilter.startDate || void 0,
				endDate: dateFilter.endDate || void 0,
				year: dateFilter.year || void 0,
				month: dateFilter.month || void 0,
				datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
				page,
				limit
			}
		],
		queryFn: () => adminApi.getUniversities({
			search: searchTerm || void 0,
			isVerified: statusFilter === "all" ? void 0 : statusFilter === "verified",
			city: cityFilter === "all" ? void 0 : cityFilter,
			sortBy,
			sortOrder,
			startDate: dateFilter.startDate || void 0,
			endDate: dateFilter.endDate || void 0,
			year: dateFilter.year || void 0,
			month: dateFilter.month || void 0,
			datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
			page,
			limit
		})
	});
	const handleExport = async (format) => {
		const totalCount = universitiesQuery.data?.meta?.total ?? 0;
		if (totalCount === 0) {
			toast.info("No universities match the active filters to export.");
			return;
		}
		if (format === "csv") setIsExportingCsv(true);
		else setIsExportingPdf(true);
		try {
			toast.info(`Generating ${format.toUpperCase()} export...`, { description: `Exporting all ${totalCount.toLocaleString()} filtered universities.` });
			const filename = await adminApi.exportData("universities", format, {
				search: searchTerm || void 0,
				status: statusFilter !== "all" ? statusFilter : void 0,
				isVerified: statusFilter === "all" ? void 0 : statusFilter === "verified",
				city: cityFilter !== "all" ? cityFilter : void 0,
				sortBy,
				sortOrder,
				startDate: dateFilter.startDate || void 0,
				endDate: dateFilter.endDate || void 0,
				year: dateFilter.year || void 0,
				month: dateFilter.month || void 0,
				datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0
			});
			toast.success("Export ready!", { description: `Downloaded ${filename}` });
		} catch (err) {
			toast.error("Export failed", { description: err?.message || "Failed to generate export" });
		} finally {
			if (format === "csv") setIsExportingCsv(false);
			else setIsExportingPdf(false);
		}
	};
	const statsQuery = useQuery({
		queryKey: ["admin", "universities-stats"],
		queryFn: () => adminApi.getUniversityStats()
	});
	const detailQuery = useQuery({
		queryKey: [
			"admin",
			"university-detail",
			detailModalId
		],
		queryFn: () => detailModalId ? adminApi.getUniversityDetails(detailModalId) : null,
		enabled: !!detailModalId
	});
	const universities = universitiesQuery.data?.data || [];
	const totalRecords = universitiesQuery.data?.total || 0;
	const totalPages = universitiesQuery.data?.totalPages || 1;
	const stats = statsQuery.data || universitiesQuery.data?.stats || {
		total: totalRecords,
		verified: 0,
		unverified: 0,
		totalFaculties: 0,
		totalDepartments: 0,
		totalDomains: 0
	};
	const distinctCities = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		universities.forEach((u) => {
			if (u.city) set.add(u.city);
		});
		return Array.from(set).sort();
	}, [universities]);
	const invalidateQueries = () => {
		queryClient.invalidateQueries({ queryKey: ["admin", "universities"] });
		queryClient.invalidateQueries({ queryKey: ["admin", "universities-stats"] });
		queryClient.invalidateQueries({ queryKey: ["universities"] });
		queryClient.invalidateQueries({ queryKey: ["university"] });
		queryClient.invalidateQueries({ queryKey: ["organizations"] });
		queryClient.invalidateQueries({ queryKey: ["admin", "faculties"] });
		queryClient.invalidateQueries({ queryKey: ["admin", "departments"] });
		queryClient.invalidateQueries({ queryKey: ["admin", "overview-stats"] });
		if (detailModalId) queryClient.invalidateQueries({ queryKey: [
			"admin",
			"university-detail",
			detailModalId
		] });
	};
	const createMutation = useMutation({
		mutationFn: (data) => adminApi.createUniversity(data),
		onSuccess: (res) => {
			toast.success(`Campus "${res.name}" created successfully!`);
			setCreateModalOpen(false);
			setCreateForm({
				name: "",
				code: "",
				slug: "",
				city: "",
				country: "Sri Lanka",
				domain: "",
				websiteUrl: "",
				description: "",
				logoUrl: "",
				isVerified: true
			});
			invalidateQueries();
		},
		onError: (err) => {
			toast.error(err.message || "Failed to create university campus");
		}
	});
	const updateMutation = useMutation({
		mutationFn: ({ id, data }) => adminApi.updateUniversity(id, data),
		onSuccess: (res) => {
			toast.success(`Campus "${res.name}" updated successfully!`);
			setEditModalUni(null);
			invalidateQueries();
		},
		onError: (err) => {
			toast.error(err.message || "Failed to update university details");
		}
	});
	const toggleStatusMutation = useMutation({
		mutationFn: (id) => adminApi.toggleUniversityStatus(id),
		onSuccess: (res) => {
			toast.success(res.isVerified ? `Institution "${res.name}" is now active and verified.` : `Institution "${res.name}" has been deactivated.`);
			setStatusConfirmUni(null);
			invalidateQueries();
		},
		onError: (err) => {
			toast.error(err.message || "Failed to toggle university status");
		}
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => adminApi.deleteUniversity(id),
		onSuccess: (res) => {
			toast.success(res.message || "University removed successfully.");
			setDeleteConfirmUni(null);
			if (detailModalId) setDetailModalId(null);
			invalidateQueries();
		},
		onError: (err) => {
			toast.error(err.message || "Cannot delete university");
		}
	});
	const addDomainMutation = useMutation({
		mutationFn: ({ universityId, domain, isPrimary }) => adminApi.addUniversityDomain(universityId, domain, isPrimary),
		onSuccess: (res) => {
			toast.success(`Authorized email domain "@${res.domain}" added successfully!`);
			setDomainModalUni(null);
			setNewDomain("");
			setIsPrimaryDomain(false);
			invalidateQueries();
		},
		onError: (err) => {
			toast.error(err.message || "Failed to authorize email domain");
		}
	});
	const deleteDomainMutation = useMutation({
		mutationFn: ({ domainId, universityId }) => adminApi.deleteUniversityDomain(domainId, universityId),
		onSuccess: () => {
			toast.success("Authorized email domain removed.");
			invalidateQueries();
		},
		onError: (err) => {
			toast.error(err.message || "Failed to remove email domain");
		}
	});
	const handleNameChange = (name) => {
		const slug = name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
		const code = name.split(/\s+/).filter((w) => ![
			"of",
			"and",
			"the",
			"for",
			"in"
		].includes(w.toLowerCase())).map((w) => w[0]).join("").toUpperCase().slice(0, 8);
		setCreateForm((prev) => ({
			...prev,
			name,
			slug: prev.slug === "" || prev.slug === name.toLowerCase().replace(/\s+/g, "-").slice(0, -1) ? slug : prev.slug,
			code: prev.code === "" ? code : prev.code
		}));
	};
	const handleOpenEdit = (uni) => {
		setEditForm({
			name: uni.name,
			code: uni.code,
			slug: uni.slug,
			city: uni.city,
			country: uni.country || "Sri Lanka",
			domain: uni.domain || "",
			websiteUrl: uni.websiteUrl || "",
			description: uni.description || "",
			logoUrl: uni.logoUrl || "",
			bannerUrl: uni.bannerUrl || "",
			isVerified: uni.isVerified
		});
		setEditModalUni(uni);
	};
	const handleOpenAddDomain = (uni) => {
		setDomainModalUni(uni);
		setNewDomain("");
		setIsPrimaryDomain(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Total Campuses"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-primary/10 p-2 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex items-baseline gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black text-foreground",
									children: stats.total
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Partner institutions"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 shadow-sm transition-all hover:border-emerald-500/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400",
									children: "Active / Verified"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black text-emerald-700 dark:text-emerald-300",
									children: stats.verified
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-medium text-emerald-600 dark:text-emerald-400",
									children: [stats.total > 0 ? Math.round(stats.verified / stats.total * 100) : 100, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-emerald-600/80 dark:text-emerald-400/80",
								children: "Operational directory"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 shadow-sm transition-all hover:border-amber-500/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400",
									children: "Inactive Campuses"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex items-baseline gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black text-amber-700 dark:text-amber-300",
									children: stats.unverified
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-amber-600/80 dark:text-amber-400/80",
								children: "Pending/Suspended"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Total Faculties"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex items-baseline gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black text-foreground",
									children: stats.totalFaculties
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Academic divisions"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Departments"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex items-baseline gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black text-foreground",
									children: stats.totalDepartments
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Specialized curricula"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Authorized Domains"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex items-baseline gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black text-foreground",
									children: stats.totalDomains
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Verified email suffixes"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-w-[240px] flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: searchTerm,
									onChange: (e) => {
										setSearchTerm(e.target.value);
										setPage(1);
									},
									placeholder: "Search campuses by name, code, domain, city...",
									className: "h-9 pl-9 text-xs"
								}),
								searchTerm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSearchTerm(""),
									className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: statusFilter,
							onChange: (e) => {
								setStatusFilter(e.target.value);
								setPage(1);
							},
							className: "h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All Statuses"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "verified",
									children: "Verified / Active"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "unverified",
									children: "Inactive / Pending"
								})
							]
						}),
						distinctCities.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: cityFilter,
							onChange: (e) => {
								setCityFilter(e.target.value);
								setPage(1);
							},
							className: "h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All Locations"
							}), distinctCities.map((city) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: city,
								children: city
							}, city))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: `${sortBy}:${sortOrder}`,
							onChange: (e) => {
								const parts = e.target.value.split(":");
								if (parts[0] && parts[1]) {
									setSortBy(parts[0]);
									setSortOrder(parts[1]);
								}
							},
							className: "h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "name:asc",
									children: "Name (A-Z)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "name:desc",
									children: "Name (Z-A)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "code:asc",
									children: "Code (A-Z)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "createdAt:desc",
									children: "Newest First"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "faculties:desc",
									children: "Most Faculties"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDateFilter, {
							values: dateFilter,
							onChange: (val) => {
								setDateFilter(val);
								setPage(1);
							},
							compact: true
						}),
						(searchTerm || statusFilter !== "all" || cityFilter !== "all" || dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => {
								setSearchTerm("");
								setStatusFilter("all");
								setCityFilter("all");
								setDateFilter({
									preset: "ALL",
									year: "",
									month: "",
									startDate: "",
									endDate: ""
								});
								setPage(1);
							},
							className: "h-9 px-2 text-xs text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-1 size-3.5" }), " Reset"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => handleExport("csv"),
							disabled: isExportingCsv || universitiesQuery.isLoading,
							className: "h-9 text-xs font-semibold gap-1.5",
							title: "Export filtered universities as CSV",
							children: [isExportingCsv ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-3.5 text-emerald-600 dark:text-emerald-400" }), "Export CSV"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => handleExport("pdf"),
							disabled: isExportingPdf || universitiesQuery.isLoading,
							className: "h-9 text-xs font-semibold gap-1.5",
							title: "Export filtered universities as branded PDF",
							children: [isExportingPdf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5 text-rose-600 dark:text-rose-400" }), "Export PDF"]
						}),
						onOpenCreateFaculty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => onOpenCreateFaculty(),
							className: "h-9 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "mr-1.5 size-4 text-primary" }), " Add Faculty"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => setCreateModalOpen(true),
							className: "h-9 text-xs shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 size-4" }), " Add Campus"]
						})
					]
				})]
			}),
			universitiesQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : universitiesQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => universitiesQuery.refetch() }) : universities.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No universities match your filters",
				description: searchTerm || statusFilter !== "all" || cityFilter !== "all" ? "Try adjusting your search criteria or resetting filters." : "No universities registered in the platform database yet. Click 'Add Campus' to get started."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: universities.map((u) => {
					const facultyCount = u._count?.faculties ?? u.faculties?.length ?? 0;
					const orgCount = u._count?.organizations ?? u.organizations?.length ?? 0;
					const studentCount = u._count?.studentProfiles ?? u._count?.users ?? 0;
					const domains = u.emailDomains || [];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("group relative flex flex-col justify-between rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md", u.isVerified ? "border-border hover:border-primary/40" : "border-amber-500/30 bg-amber-500/[0.02] hover:border-amber-500/50"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted/60 shadow-xs",
											children: u.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: u.logoUrl,
												alt: u.name,
												className: "size-10 rounded-lg object-contain p-0.5",
												onError: (e) => {
													e.target.style.display = "none";
												}
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-5 text-primary" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 flex-wrap",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary",
													children: u.code
												}), u.isVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }), " Verified"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3" }), " Inactive"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-1 text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors",
												children: u.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "flex items-center gap-1 text-xs text-muted-foreground mt-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3 text-muted-foreground/80 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													u.city,
													", ",
													u.country || "Sri Lanka"
												] })]
											})
										] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "size-7 text-muted-foreground hover:text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-4" })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
										align: "end",
										className: "w-48",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
												className: "text-xs",
												children: "Campus Governance"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => {
													setDetailModalId(u.id);
													setDetailTab("overview");
												},
												className: "text-xs cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "mr-2 size-3.5 text-primary" }), " Inspect Details"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => handleOpenEdit(u),
												className: "text-xs cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "mr-2 size-3.5 text-blue-500" }), " Edit Campus"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => handleOpenAddDomain(u),
												className: "text-xs cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mr-2 size-3.5 text-purple-500" }), " Add Email Domain"]
											}),
											onOpenCreateFaculty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => onOpenCreateFaculty(u.id),
												className: "text-xs cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "mr-2 size-3.5 text-emerald-500" }), " Add Faculty"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
												onClick: () => setStatusConfirmUni(u),
												className: "text-xs cursor-pointer",
												children: u.isVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center text-amber-600 dark:text-amber-400",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "mr-2 size-3.5" }), " Deactivate Campus"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center text-emerald-600 dark:text-emerald-400",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mr-2 size-3.5" }), " Activate Campus"]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => setDeleteConfirmUni(u),
												className: "text-xs text-rose-600 dark:text-rose-400 cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 size-3.5" }), " Delete Campus"]
											})
										]
									})] })]
								}),
								u.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed",
									children: u.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-muted/40 p-2.5 border border-border/40 space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3" }),
												" Authorized Email Domains (",
												domains.length,
												")"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => handleOpenAddDomain(u),
											className: "text-[11px] font-semibold text-primary hover:underline",
											children: "+ Add"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1",
										children: domains.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] italic text-muted-foreground",
											children: u.domain ? `@${u.domain}` : "No email domains registered"
										}) : domains.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: cn("inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-mono", d.isPrimary ? "bg-primary/10 text-primary font-bold border border-primary/20" : "bg-muted text-muted-foreground"),
											children: [
												"@",
												d.domain,
												d.isPrimary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8px] uppercase tracking-tighter",
													children: "[Primary]"
												})
											]
										}, d.id))
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 border-t border-border/50 pt-3 flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 text-[11px] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-3 text-muted-foreground/80" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground font-semibold",
												children: facultyCount
											}),
											" Faculties"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3 text-muted-foreground/80" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground font-semibold",
												children: orgCount
											}),
											" Societies"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground font-semibold",
											children: studentCount
										}), " Students"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								className: "h-7 text-xs px-2.5",
								onClick: () => {
									setDetailModalId(u.id);
									setDetailTab("overview");
								},
								children: "View Details"
							})]
						})]
					}, u.id);
				})
			}),
			totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-t border-border pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Showing ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: universities.length
						}),
						" of",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: totalRecords
						}),
						" campuses"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: page <= 1,
							onClick: () => setPage((p) => Math.max(1, p - 1)),
							className: "h-8 text-xs",
							children: "Previous"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-medium text-foreground",
							children: [
								"Page ",
								page,
								" of ",
								totalPages
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: page >= totalPages,
							onClick: () => setPage((p) => p + 1),
							className: "h-8 text-xs",
							children: "Next"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: createModalOpen,
				onOpenChange: setCreateModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-xl max-h-[90vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2 text-base",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-5 text-primary" }), " Add Higher Education Campus"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs",
						children: "Register a new university partner institution, campus code, and default email domain for student onboarding."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							if (!createForm.name || !createForm.code || !createForm.city) {
								toast.error("Please fill in all required fields (Name, Code, City).");
								return;
							}
							createMutation.mutate(createForm);
						},
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "text-xs font-semibold",
									children: ["University Full Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-rose-500",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									value: createForm.name,
									onChange: (e) => handleNameChange(e.target.value),
									placeholder: "e.g. University of Colombo",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs font-semibold",
										children: ["Campus Code ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-rose-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: createForm.code,
										onChange: (e) => setCreateForm({
											...createForm,
											code: e.target.value.toUpperCase().trim()
										}),
										placeholder: "e.g. UOC",
										className: "font-mono text-xs uppercase"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs font-semibold",
										children: ["URL Slug ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-rose-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: createForm.slug,
										onChange: (e) => setCreateForm({
											...createForm,
											slug: e.target.value.toLowerCase().trim()
										}),
										placeholder: "e.g. university-of-colombo",
										className: "font-mono text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs font-semibold",
										children: ["City ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-rose-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: createForm.city,
										onChange: (e) => setCreateForm({
											...createForm,
											city: e.target.value
										}),
										placeholder: "e.g. Colombo",
										className: "text-xs"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "Country"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: createForm.country,
										onChange: (e) => setCreateForm({
											...createForm,
											country: e.target.value
										}),
										placeholder: "Sri Lanka",
										className: "text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-semibold",
											children: "Primary Email Domain"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: createForm.domain,
											onChange: (e) => setCreateForm({
												...createForm,
												domain: e.target.value.toLowerCase().trim()
											}),
											placeholder: "e.g. cmb.ac.lk or sliit.lk",
											className: "font-mono text-xs"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground",
											children: "Used for auto-verifying student registrations."
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "Official Website"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: createForm.websiteUrl,
										onChange: (e) => setCreateForm({
											...createForm,
											websiteUrl: e.target.value
										}),
										placeholder: "https://www.cmb.ac.lk",
										className: "text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Logo Image URL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: createForm.logoUrl,
									onChange: (e) => setCreateForm({
										...createForm,
										logoUrl: e.target.value
									}),
									placeholder: "https://storage.campuspulse.lk/logos/uoc.png",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: createForm.description,
									onChange: (e) => setCreateForm({
										...createForm,
										description: e.target.value
									}),
									placeholder: "Brief summary about the campus, history, or faculties...",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-lg border border-border p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Active & Verified Institution"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Enable active directory listing and allow students to select this campus."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: createForm.isVerified,
									onCheckedChange: (checked) => setCreateForm({
										...createForm,
										isVerified: checked
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setCreateModalOpen(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "sm",
									disabled: createMutation.isPending,
									children: createMutation.isPending ? "Creating..." : "Create Campus"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!editModalUni,
				onOpenChange: (open) => !open && setEditModalUni(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-xl max-h-[90vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2 text-base",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "size-5 text-primary" }), " Edit Campus Details"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						className: "text-xs",
						children: [
							"Update institutional metadata, location, code, or active directory status for ",
							editModalUni?.name,
							"."
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							if (!editModalUni) return;
							updateMutation.mutate({
								id: editModalUni.id,
								data: editForm
							});
						},
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "text-xs font-semibold",
									children: ["University Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-rose-500",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									value: editForm.name,
									onChange: (e) => setEditForm({
										...editForm,
										name: e.target.value
									}),
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs font-semibold",
										children: ["Campus Code ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-rose-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: editForm.code,
										onChange: (e) => setEditForm({
											...editForm,
											code: e.target.value.toUpperCase().trim()
										}),
										className: "font-mono text-xs uppercase"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs font-semibold",
										children: ["URL Slug ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-rose-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: editForm.slug,
										onChange: (e) => setEditForm({
											...editForm,
											slug: e.target.value.toLowerCase().trim()
										}),
										className: "font-mono text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs font-semibold",
										children: ["City ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-rose-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: editForm.city,
										onChange: (e) => setEditForm({
											...editForm,
											city: e.target.value
										}),
										className: "text-xs"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "Country"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: editForm.country,
										onChange: (e) => setEditForm({
											...editForm,
											country: e.target.value
										}),
										className: "text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "Primary Email Domain"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: editForm.domain,
										onChange: (e) => setEditForm({
											...editForm,
											domain: e.target.value.toLowerCase().trim()
										}),
										placeholder: "e.g. sliit.lk",
										className: "font-mono text-xs"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "Official Website"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: editForm.websiteUrl,
										onChange: (e) => setEditForm({
											...editForm,
											websiteUrl: e.target.value
										}),
										placeholder: "https://...",
										className: "text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "Logo URL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: editForm.logoUrl,
										onChange: (e) => setEditForm({
											...editForm,
											logoUrl: e.target.value
										}),
										className: "text-xs"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "Banner URL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: editForm.bannerUrl,
										onChange: (e) => setEditForm({
											...editForm,
											bannerUrl: e.target.value
										}),
										className: "text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: editForm.description,
									onChange: (e) => setEditForm({
										...editForm,
										description: e.target.value
									}),
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-lg border border-border p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Active & Verified Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Controls whether students and societies can affiliate with this institution."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: editForm.isVerified,
									onCheckedChange: (checked) => setEditForm({
										...editForm,
										isVerified: checked
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setEditModalUni(null),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "sm",
									disabled: updateMutation.isPending,
									children: updateMutation.isPending ? "Saving..." : "Save Changes"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!domainModalUni,
				onOpenChange: (open) => !open && setDomainModalUni(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2 text-base",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-5 text-purple-500" }), " Authorize Institutional Email Domain"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						className: "text-xs",
						children: [
							"Add an authorized email suffix for ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: domainModalUni?.name }),
							". Student registrations matching this domain or its subdomains will automatically link to this university."
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							if (!domainModalUni || !newDomain.trim()) return;
							addDomainMutation.mutate({
								universityId: domainModalUni.id,
								domain: newDomain.trim(),
								isPrimary: isPrimaryDomain
							});
						},
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs font-semibold",
										children: ["Email Domain Suffix ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-rose-500",
											children: "*"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground",
											children: "@"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											required: true,
											value: newDomain,
											onChange: (e) => setNewDomain(e.target.value.toLowerCase().replace(/^@+/, "")),
											placeholder: "student.uoc.lk or my.sliit.lk",
											className: "pl-7 font-mono text-xs"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground",
										children: "Do not include the \"@\" sign. Matches exact domain and child subdomains."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-lg border border-border p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Set as Primary Campus Domain"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Marks this as the default domain on the university public profile."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: isPrimaryDomain,
									onCheckedChange: setIsPrimaryDomain
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setDomainModalUni(null),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "sm",
									disabled: addDomainMutation.isPending || !newDomain.trim(),
									children: addDomainMutation.isPending ? "Authorizing..." : "Authorize Domain"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!statusConfirmUni,
				onOpenChange: (open) => !open && setStatusConfirmUni(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "flex items-center gap-2 text-base",
						children: statusConfirmUni?.isVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5 text-amber-500" }), " Deactivate Institution"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-emerald-500" }), " Activate Institution"] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs leading-relaxed",
						children: statusConfirmUni?.isVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Are you sure you want to deactivate ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: statusConfirmUni.name }),
							"?",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Deactivation will temporarily hide this university from registration selectors and suspend automated email domain matching. Existing student profiles and historical event records will remain intact."
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Are you sure you want to activate and verify ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: statusConfirmUni?.name }),
							"?",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Students will be able to select this university during onboarding and affiliated email domains will be automatically verified."
						] })
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setStatusConfirmUni(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: statusConfirmUni?.isVerified ? "destructive" : "default",
							size: "sm",
							disabled: toggleStatusMutation.isPending,
							onClick: () => {
								if (statusConfirmUni) toggleStatusMutation.mutate(statusConfirmUni.id);
							},
							children: toggleStatusMutation.isPending ? "Updating..." : statusConfirmUni?.isVerified ? "Confirm Deactivation" : "Confirm Activation"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!deleteConfirmUni,
				onOpenChange: (open) => !open && setDeleteConfirmUni(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2 text-base text-rose-600",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-5" }), " Delete University Campus"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						className: "text-xs leading-relaxed",
						children: [
							"Are you sure you want to permanently delete ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: deleteConfirmUni?.name }),
							"?",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Safety Protection:" }),
							" If this university has associated students, societies, or events in the database, deletion will be blocked by the server to protect historical records. Deactivate the university instead if it is no longer operational."
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setDeleteConfirmUni(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							size: "sm",
							disabled: deleteMutation.isPending,
							onClick: () => {
								if (deleteConfirmUni) deleteMutation.mutate(deleteConfirmUni.id);
							},
							children: deleteMutation.isPending ? "Deleting..." : "Permanently Delete"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!detailModalId,
				onOpenChange: (open) => !open && setDetailModalId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "max-w-3xl max-h-[90vh] overflow-y-auto p-0",
					children: detailQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {})
					}) : detailQuery.isError || !detailQuery.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => detailQuery.refetch() })
					}) : (() => {
						const u = detailQuery.data.university;
						const audit = detailQuery.data.auditHistory || [];
						const faculties = u.faculties || [];
						const organizations = u.organizations || [];
						const domains = u.emailDomains || [];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative border-b border-border bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex size-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-card shadow-sm",
												children: u.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: u.logoUrl,
													alt: u.name,
													className: "size-12 rounded-xl object-contain p-1",
													onError: (e) => {
														e.target.style.display = "none";
													}
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-7 text-primary" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 flex-wrap",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded bg-primary/15 px-2 py-0.5 font-mono text-xs font-bold text-primary",
														children: u.code
													}), u.isVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), " Verified Campus"]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3.5" }), " Inactive"]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "mt-1 text-lg font-black text-foreground",
													children: u.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3 text-muted-foreground shrink-0" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
															u.city,
															", ",
															u.country || "Sri Lanka"
														] }),
														u.websiteUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
															href: u.websiteUrl,
															target: "_blank",
															rel: "noreferrer",
															className: "flex items-center gap-1 text-primary hover:underline",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3" }),
																" Website ",
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-2.5" })
															]
														})] })
													]
												})
											] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "outline",
												size: "sm",
												onClick: () => handleOpenEdit(u),
												className: "h-8 text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "mr-1.5 size-3.5" }), " Edit"]
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 flex items-center gap-2 border-t border-border/60 pt-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setDetailTab("overview"),
												className: cn("rounded-lg px-3 py-1.5 text-xs font-semibold transition-all", detailTab === "overview" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-muted"),
												children: "Overview"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setDetailTab("domains"),
												className: cn("rounded-lg px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5", detailTab === "domains" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-muted"),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5" }),
													" Domains (",
													domains.length,
													")"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setDetailTab("faculties"),
												className: cn("rounded-lg px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5", detailTab === "faculties" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-muted"),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-3.5" }),
													" Faculties (",
													faculties.length,
													")"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setDetailTab("organizations"),
												className: cn("rounded-lg px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5", detailTab === "organizations" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-muted"),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }),
													" Societies (",
													organizations.length,
													")"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setDetailTab("audit"),
												className: cn("rounded-lg px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5", detailTab === "audit" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-muted"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-3.5" }), " Audit History"]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6",
									children: [
										detailTab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-6",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-4 gap-3",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "rounded-xl border border-border bg-card p-3 text-center",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
																children: "Faculties"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-xl font-bold text-foreground mt-1",
																children: u._count?.faculties || faculties.length
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "rounded-xl border border-border bg-card p-3 text-center",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
																children: "Societies"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-xl font-bold text-foreground mt-1",
																children: u._count?.organizations || organizations.length
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "rounded-xl border border-border bg-card p-3 text-center",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
																children: "Students"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-xl font-bold text-foreground mt-1",
																children: u._count?.studentProfiles || u._count?.users || 0
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "rounded-xl border border-border bg-card p-3 text-center",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
																children: "Events"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-xl font-bold text-foreground mt-1",
																children: u._count?.events || 0
															})]
														})
													]
												}),
												u.description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
														children: "About Institution"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-foreground leading-relaxed rounded-xl bg-muted/30 p-3 border border-border/40",
														children: u.description
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-2 gap-3 text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-lg border border-border/60 bg-muted/20 p-3 space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold uppercase text-muted-foreground",
															children: "Internal Slug"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-mono font-medium text-foreground",
															children: u.slug
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-lg border border-border/60 bg-muted/20 p-3 space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold uppercase text-muted-foreground",
															children: "Registered On"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-medium text-foreground",
															children: formatDate(u.createdAt)
														})]
													})]
												})
											]
										}),
										detailTab === "domains" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-sm font-bold text-foreground",
													children: "Authorized Email Suffixes"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Student registrations using emails under these domains are automatically linked and verified."
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													onClick: () => handleOpenAddDomain(u),
													className: "h-8 text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 size-3.5" }), " Add Domain"]
												})]
											}), domains.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground",
												children: "No authorized email domains registered yet."
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "divide-y divide-border/50 rounded-xl border border-border bg-card",
												children: domains.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold",
															children: "@"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-1.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-mono text-xs font-bold text-foreground",
																children: d.domain
															}), d.isPrimary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "rounded bg-primary/10 px-1.5 py-0.2 text-[9px] font-bold text-primary uppercase",
																children: "Primary"
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[10px] text-muted-foreground",
															children: ["Added on ", formatDate(d.createdAt)]
														})] })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														size: "icon",
														className: "size-7 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10",
														onClick: () => {
															if (confirm(`Remove authorized domain "@${d.domain}"?`)) deleteDomainMutation.mutate({
																domainId: d.id,
																universityId: u.id
															});
														},
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
													})]
												}, d.id))
											})]
										}),
										detailTab === "faculties" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-sm font-bold text-foreground",
													children: "Academic Faculties & Departments"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Organizational branches and degree awarding divisions within this university."
												})] }), onOpenCreateFaculty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													onClick: () => {
														setDetailModalId(null);
														onOpenCreateFaculty(u.id);
													},
													className: "h-8 text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 size-3.5" }), " Add Faculty"]
												})]
											}), faculties.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground",
												children: "No academic faculties configured yet for this campus."
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid gap-3",
												children: faculties.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-xl border border-border bg-card p-4 space-y-2.5 shadow-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-start justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-1.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-mono text-[11px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded",
																children: f.code
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
																className: "font-bold text-xs text-foreground",
																children: f.name
															})]
														}), f.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[11px] text-muted-foreground mt-1",
															children: f.description
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded",
															children: [f.departments?.length || f._count?.departments || 0, " Departments"]
														})]
													}), f.departments && f.departments.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "border-t border-border/40 pt-2 flex flex-wrap gap-1.5",
														children: f.departments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "inline-flex items-center gap-1 rounded bg-muted/70 px-2 py-0.5 text-[11px] text-muted-foreground",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-2.5 text-primary" }),
																" ",
																d.name,
																" (",
																d.code,
																")"
															]
														}, d.id))
													})]
												}, f.id))
											})]
										}),
										detailTab === "organizations" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center justify-between",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-sm font-bold text-foreground",
													children: "Affiliated Student Societies"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Registered clubs, student chapters, and official bodies affiliated with this campus."
												})] })
											}), organizations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground",
												children: "No student societies registered yet under this campus."
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid gap-2 sm:grid-cols-2",
												children: organizations.map((org) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between rounded-xl border border-border bg-card p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted border border-border/60",
															children: org.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: org.logoUrl,
																alt: org.name,
																className: "size-7 rounded object-contain"
															}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-primary" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
																className: "font-bold text-xs text-foreground line-clamp-1",
																children: org.name
															}), org.isVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3 text-emerald-500 shrink-0" })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[10px] text-muted-foreground",
															children: [
																org.type,
																" • ",
																org._count?.members || 0,
																" Members"
															]
														})] })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground",
														children: org.status
													})]
												}, org.id))
											})]
										}),
										detailTab === "audit" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-sm font-bold text-foreground",
												children: "Administrative Governance Trail"
											}), audit.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground",
												children: "No historical audit events logged for this institution yet."
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "space-y-2",
												children: audit.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-start justify-between rounded-xl border border-border/60 bg-muted/20 p-3 text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-0.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-mono text-[10px] font-bold uppercase tracking-wider text-primary",
																children: log.action
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "text-muted-foreground text-[11px]",
																children: ["By: ", log.user?.name || log.user?.email || "Platform System"]
															}),
															log.reason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "text-[11px] text-foreground mt-1",
																children: ["Reason: ", log.reason]
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground",
														children: formatDate(log.createdAt)
													})]
												}, log.id))
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "border-t border-border p-4 bg-muted/20 flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => setDetailModalId(null),
										children: "Close"
									})
								})
							]
						});
					})()
				})
			})
		]
	});
}
function AdminFaculties({ onOpenCreateDepartment }) {
	const queryClient = useQueryClient();
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [universityFilter, setUniversityFilter] = (0, import_react.useState)("all");
	const [sortBy, setSortBy] = (0, import_react.useState)("name");
	const [sortOrder, setSortOrder] = (0, import_react.useState)("asc");
	const [page, setPage] = (0, import_react.useState)(1);
	const limit = 24;
	const [createModalOpen, setCreateModalOpen] = (0, import_react.useState)(false);
	const [editModalFaculty, setEditModalFaculty] = (0, import_react.useState)(null);
	const [detailModalId, setDetailModalId] = (0, import_react.useState)(null);
	const [deleteConfirmFaculty, setDeleteConfirmFaculty] = (0, import_react.useState)(null);
	const [createForm, setCreateForm] = (0, import_react.useState)({
		universityId: "",
		name: "",
		code: "",
		slug: "",
		description: ""
	});
	const [editForm, setEditForm] = (0, import_react.useState)({
		universityId: "",
		name: "",
		code: "",
		slug: "",
		description: ""
	});
	const facultiesQuery = useQuery({
		queryKey: [
			"admin",
			"faculties",
			{
				search: searchTerm || void 0,
				universityId: universityFilter === "all" ? void 0 : universityFilter,
				sortBy,
				sortOrder,
				page,
				limit
			}
		],
		queryFn: () => adminApi.getFaculties({
			search: searchTerm || void 0,
			universityId: universityFilter === "all" ? void 0 : universityFilter,
			sortBy,
			sortOrder,
			page,
			limit
		})
	});
	const universitiesQuery = useQuery({
		queryKey: [
			"admin",
			"universities",
			{ limit: 100 }
		],
		queryFn: () => adminApi.getUniversities({ limit: 100 })
	});
	const detailQuery = useQuery({
		queryKey: [
			"admin",
			"faculty-detail",
			detailModalId
		],
		queryFn: () => detailModalId ? adminApi.getFacultyDetails(detailModalId) : null,
		enabled: !!detailModalId
	});
	const faculties = facultiesQuery.data?.data || [];
	const totalRecords = facultiesQuery.data?.total || 0;
	const totalPages = facultiesQuery.data?.totalPages || 1;
	const universities = universitiesQuery.data?.data || [];
	const invalidateQueries = () => {
		queryClient.invalidateQueries({ queryKey: ["admin", "faculties"] });
		queryClient.invalidateQueries({ queryKey: ["admin", "departments"] });
		queryClient.invalidateQueries({ queryKey: ["admin", "universities"] });
		queryClient.invalidateQueries({ queryKey: ["admin", "overview-stats"] });
		if (detailModalId) queryClient.invalidateQueries({ queryKey: [
			"admin",
			"faculty-detail",
			detailModalId
		] });
	};
	const createMutation = useMutation({
		mutationFn: (data) => adminApi.createFaculty(data),
		onSuccess: (res) => {
			toast.success(`Faculty "${res.name}" created successfully!`);
			setCreateModalOpen(false);
			setCreateForm({
				universityId: "",
				name: "",
				code: "",
				slug: "",
				description: ""
			});
			invalidateQueries();
		},
		onError: (err) => {
			toast.error(err.message || "Failed to create faculty");
		}
	});
	const updateMutation = useMutation({
		mutationFn: ({ id, data }) => adminApi.updateFaculty(id, data),
		onSuccess: (res) => {
			toast.success(`Faculty "${res.name}" updated successfully!`);
			setEditModalFaculty(null);
			invalidateQueries();
		},
		onError: (err) => {
			toast.error(err.message || "Failed to update faculty");
		}
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => adminApi.deleteFaculty(id),
		onSuccess: (res) => {
			toast.success(res.message || "Faculty deleted successfully.");
			setDeleteConfirmFaculty(null);
			if (detailModalId) setDetailModalId(null);
			invalidateQueries();
		},
		onError: (err) => {
			toast.error(err.message || "Cannot delete faculty");
		}
	});
	const handleNameChange = (name) => {
		const slug = name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
		const code = name.split(/\s+/).filter((w) => ![
			"of",
			"and",
			"the",
			"for",
			"in"
		].includes(w.toLowerCase())).map((w) => w[0]).join("").toUpperCase().slice(0, 6);
		setCreateForm((prev) => ({
			...prev,
			name,
			slug: prev.slug === "" || prev.slug === name.toLowerCase().replace(/\s+/g, "-").slice(0, -1) ? slug : prev.slug,
			code: prev.code === "" ? code ? `F${code}` : "FOE" : prev.code
		}));
	};
	const handleOpenEdit = (faculty) => {
		setEditForm({
			universityId: faculty.universityId,
			name: faculty.name,
			code: faculty.code,
			slug: faculty.slug,
			description: faculty.description || ""
		});
		setEditModalFaculty(faculty);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Total Faculties"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-primary/10 p-2 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black text-foreground",
								children: totalRecords
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Academic divisions"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Partner Campuses"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black text-foreground",
								children: universities.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Institutions represented"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Departments"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black text-foreground",
								children: facultiesQuery.data?.stats?.totalDepartments ?? 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Curricula & specializations"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Affiliated Students"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black text-foreground",
								children: faculties.reduce((acc, f) => acc + (f._count?.studentProfiles || 0), 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Enrolled student profiles"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-w-[240px] flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: searchTerm,
									onChange: (e) => {
										setSearchTerm(e.target.value);
										setPage(1);
									},
									placeholder: "Search faculties by name, code, university...",
									className: "h-9 pl-9 text-xs"
								}),
								searchTerm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSearchTerm(""),
									className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: universityFilter,
							onChange: (e) => {
								setUniversityFilter(e.target.value);
								setPage(1);
							},
							className: "h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All Universities"
							}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: u.id,
								children: [
									u.name,
									" (",
									u.code,
									")"
								]
							}, u.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: `${sortBy}:${sortOrder}`,
							onChange: (e) => {
								const [field = "name", order = "asc"] = e.target.value.split(":");
								setSortBy(field);
								setSortOrder(order || "asc");
							},
							className: "h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "name:asc",
									children: "Name (A-Z)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "name:desc",
									children: "Name (Z-A)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "code:asc",
									children: "Code (A-Z)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "createdAt:desc",
									children: "Newest First"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "departments:desc",
									children: "Most Departments"
								})
							]
						}),
						(searchTerm || universityFilter !== "all") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => {
								setSearchTerm("");
								setUniversityFilter("all");
								setPage(1);
							},
							className: "h-9 px-2 text-xs text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-1 size-3.5" }), " Reset"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setCreateModalOpen(true),
					className: "h-9 text-xs shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 size-4" }), " Add Faculty"]
				})]
			}),
			facultiesQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : facultiesQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => facultiesQuery.refetch() }) : faculties.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No faculties found",
				description: searchTerm || universityFilter !== "all" ? "Try adjusting your search criteria or resetting filters." : "No academic faculties registered in the database yet. Click 'Add Faculty' to create one."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: faculties.map((f) => {
					const deptsCount = f.departments?.length ?? f._count?.departments ?? 0;
					const studentsCount = f._count?.studentProfiles ?? 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 flex-wrap",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary",
												children: f.code
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-3" }),
													" ",
													f.university.code
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-1.5 text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors",
											children: f.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: f.university.name
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "size-7 text-muted-foreground hover:text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-4" })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
										align: "end",
										className: "w-48",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
												className: "text-xs",
												children: "Faculty Options"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => setDetailModalId(f.id),
												className: "text-xs cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "mr-2 size-3.5 text-primary" }), " View Details"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => handleOpenEdit(f),
												className: "text-xs cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "mr-2 size-3.5 text-blue-500" }), " Edit Faculty"]
											}),
											onOpenCreateDepartment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => onOpenCreateDepartment(f.id, f.universityId),
												className: "text-xs cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 size-3.5 text-emerald-500" }), " Add Department"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => setDeleteConfirmFaculty(f),
												className: "text-xs text-rose-600 dark:text-rose-400 cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 size-3.5" }), " Delete Faculty"]
											})
										]
									})] })]
								}),
								f.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed",
									children: f.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-muted/40 p-2.5 border border-border/40 space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3" }),
												" Departments (",
												deptsCount,
												")"
											]
										}), onOpenCreateDepartment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => onOpenCreateDepartment(f.id, f.universityId),
											className: "text-[11px] font-semibold text-primary hover:underline",
											children: "+ Add"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-1",
										children: [deptsCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] italic text-muted-foreground",
											children: "No departments configured"
										}) : (f.departments || []).slice(0, 4).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-2.5 text-primary" }),
												" ",
												d.name
											]
										}, d.id)), deptsCount > 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] text-muted-foreground px-1 py-0.5",
											children: [
												"+",
												deptsCount - 4,
												" more"
											]
										})]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 border-t border-border/50 pt-3 flex items-center justify-between text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3 text-muted-foreground/80" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground font-semibold",
										children: studentsCount
									}),
									" Students"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								className: "h-7 text-xs px-2.5",
								onClick: () => setDetailModalId(f.id),
								children: "View Details"
							})]
						})]
					}, f.id);
				})
			}),
			totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-t border-border pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Showing ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: faculties.length
						}),
						" of",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: totalRecords
						}),
						" faculties"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: page <= 1,
							onClick: () => setPage((p) => Math.max(1, p - 1)),
							className: "h-8 text-xs",
							children: "Previous"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-medium text-foreground",
							children: [
								"Page ",
								page,
								" of ",
								totalPages
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: page >= totalPages,
							onClick: () => setPage((p) => p + 1),
							className: "h-8 text-xs",
							children: "Next"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: createModalOpen,
				onOpenChange: setCreateModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2 text-base",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-5 text-primary" }), " Add Academic Faculty"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs",
						children: "Establish a faculty branch within a parent partner university."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							if (!createForm.universityId || !createForm.name || !createForm.code) {
								toast.error("Please fill in parent university, faculty name, and code.");
								return;
							}
							createMutation.mutate(createForm);
						},
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "text-xs font-semibold",
									children: ["Parent University ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-rose-500",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									required: true,
									value: createForm.universityId,
									onChange: (e) => setCreateForm({
										...createForm,
										universityId: e.target.value
									}),
									className: "w-full h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select University..."
									}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: u.id,
										children: [
											u.name,
											" (",
											u.code,
											")"
										]
									}, u.id))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "text-xs font-semibold",
									children: ["Faculty Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-rose-500",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									value: createForm.name,
									onChange: (e) => handleNameChange(e.target.value),
									placeholder: "e.g. Faculty of Science",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs font-semibold",
										children: ["Faculty Code ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-rose-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: createForm.code,
										onChange: (e) => setCreateForm({
											...createForm,
											code: e.target.value.toUpperCase().trim()
										}),
										placeholder: "e.g. FOS",
										className: "font-mono text-xs uppercase"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs font-semibold",
										children: ["URL Slug ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-rose-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: createForm.slug,
										onChange: (e) => setCreateForm({
											...createForm,
											slug: e.target.value.toLowerCase().trim()
										}),
										placeholder: "e.g. faculty-of-science",
										className: "font-mono text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Description (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: createForm.description,
									onChange: (e) => setCreateForm({
										...createForm,
										description: e.target.value
									}),
									placeholder: "Overview of disciplines, degree offerings, or research areas...",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setCreateModalOpen(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "sm",
									disabled: createMutation.isPending,
									children: createMutation.isPending ? "Creating..." : "Create Faculty"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!editModalFaculty,
				onOpenChange: (open) => !open && setEditModalFaculty(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2 text-base",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "size-5 text-primary" }), " Edit Faculty"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs",
						children: "Modify faculty identification, code, or description."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							if (!editModalFaculty) return;
							updateMutation.mutate({
								id: editModalFaculty.id,
								data: editForm
							});
						},
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Parent University"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: editForm.universityId,
									onChange: (e) => setEditForm({
										...editForm,
										universityId: e.target.value
									}),
									className: "w-full h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
									children: universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: u.id,
										children: [
											u.name,
											" (",
											u.code,
											")"
										]
									}, u.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Faculty Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									value: editForm.name,
									onChange: (e) => setEditForm({
										...editForm,
										name: e.target.value
									}),
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "Faculty Code"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: editForm.code,
										onChange: (e) => setEditForm({
											...editForm,
											code: e.target.value.toUpperCase().trim()
										}),
										className: "font-mono text-xs uppercase"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "URL Slug"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: editForm.slug,
										onChange: (e) => setEditForm({
											...editForm,
											slug: e.target.value.toLowerCase().trim()
										}),
										className: "font-mono text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: editForm.description,
									onChange: (e) => setEditForm({
										...editForm,
										description: e.target.value
									}),
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setEditModalFaculty(null),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "sm",
									disabled: updateMutation.isPending,
									children: updateMutation.isPending ? "Saving..." : "Save Changes"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!detailModalId,
				onOpenChange: (open) => !open && setDetailModalId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "max-w-2xl max-h-[85vh] overflow-y-auto",
					children: detailQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : detailQuery.isError || !detailQuery.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => detailQuery.refetch() }) : (() => {
						const f = detailQuery.data.faculty;
						const audit = detailQuery.data.auditHistory || [];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary",
											children: f.code
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground",
											children: f.university.name
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
										className: "text-base font-bold text-foreground mt-1",
										children: f.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
										className: "text-xs",
										children: [
											"Affiliated with ",
											f.university.name,
											" (",
											f.university.city || "Sri Lanka",
											")."
										]
									})
								] }),
								f.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-muted/30 p-3 border border-border/40 text-xs text-foreground",
									children: f.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-3 text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold uppercase text-muted-foreground",
												children: "Departments"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xl font-bold text-foreground mt-1",
												children: f.departments?.length || f._count?.departments || 0
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-3 text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold uppercase text-muted-foreground",
												children: "Students"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xl font-bold text-foreground mt-1",
												children: f._count?.studentProfiles || 0
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-3 text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold uppercase text-muted-foreground",
												children: "Events"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xl font-bold text-foreground mt-1",
												children: f._count?.events || 0
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
											children: [
												"Academic Departments (",
												f.departments?.length || 0,
												")"
											]
										}), onOpenCreateDepartment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											className: "h-7 text-xs",
											onClick: () => {
												setDetailModalId(null);
												onOpenCreateDepartment(f.id, f.universityId);
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 size-3" }), " Add Department"]
										})]
									}), !f.departments || f.departments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground",
										children: "No departments registered under this faculty."
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "divide-y divide-border/50 rounded-xl border border-border bg-card",
										children: f.departments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center justify-between p-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-xs font-bold text-primary",
													children: d.code
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-xs text-foreground",
													children: d.name
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-muted-foreground mt-0.5",
												children: [d._count?.studentProfiles ?? 0, " Student Profile(s)"]
											})] })
										}, d.id))
									})]
								}),
								audit.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 border-t border-border pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
										children: "Recent Audit History"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1.5",
										children: audit.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between rounded-lg bg-muted/20 p-2 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[10px] font-semibold text-primary",
												children: log.action
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground",
												children: formatDate(log.createdAt)
											})]
										}, log.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
									className: "pt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => setDetailModalId(null),
										children: "Close"
									})
								})
							]
						});
					})()
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!deleteConfirmFaculty,
				onOpenChange: (open) => !open && setDeleteConfirmFaculty(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2 text-base text-rose-600",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-5" }), " Delete Faculty"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						className: "text-xs leading-relaxed",
						children: [
							"Are you sure you want to permanently delete ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: deleteConfirmFaculty?.name }),
							"?",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Safety Protection:" }),
							" If students are currently affiliated with this faculty or historical event records exist, deletion will be blocked by the server to protect data integrity."
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setDeleteConfirmFaculty(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							size: "sm",
							disabled: deleteMutation.isPending,
							onClick: () => {
								if (deleteConfirmFaculty) deleteMutation.mutate(deleteConfirmFaculty.id);
							},
							children: deleteMutation.isPending ? "Deleting..." : "Permanently Delete"
						})]
					})]
				})
			})
		]
	});
}
function AdminDepartments({ initialFacultyId, initialUniversityId }) {
	const queryClient = useQueryClient();
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [universityFilter, setUniversityFilter] = (0, import_react.useState)(initialUniversityId || "all");
	const [facultyFilter, setFacultyFilter] = (0, import_react.useState)(initialFacultyId || "all");
	const [sortBy, setSortBy] = (0, import_react.useState)("name");
	const [sortOrder, setSortOrder] = (0, import_react.useState)("asc");
	const [page, setPage] = (0, import_react.useState)(1);
	const limit = 24;
	const [createModalOpen, setCreateModalOpen] = (0, import_react.useState)(false);
	const [editModalDept, setEditModalDept] = (0, import_react.useState)(null);
	const [detailModalId, setDetailModalId] = (0, import_react.useState)(null);
	const [deleteConfirmDept, setDeleteConfirmDept] = (0, import_react.useState)(null);
	const [createForm, setCreateForm] = (0, import_react.useState)({
		universityId: initialUniversityId || "",
		facultyId: initialFacultyId || "",
		name: "",
		code: "",
		slug: "",
		description: ""
	});
	const [editForm, setEditForm] = (0, import_react.useState)({
		facultyId: "",
		name: "",
		code: "",
		slug: "",
		description: ""
	});
	const departmentsQuery = useQuery({
		queryKey: [
			"admin",
			"departments",
			{
				search: searchTerm || void 0,
				facultyId: facultyFilter === "all" ? void 0 : facultyFilter,
				universityId: universityFilter === "all" ? void 0 : universityFilter,
				sortBy,
				sortOrder,
				page,
				limit
			}
		],
		queryFn: () => adminApi.getDepartments({
			search: searchTerm || void 0,
			facultyId: facultyFilter === "all" ? void 0 : facultyFilter,
			universityId: universityFilter === "all" ? void 0 : universityFilter,
			sortBy,
			sortOrder,
			page,
			limit
		})
	});
	const universitiesQuery = useQuery({
		queryKey: [
			"admin",
			"universities",
			{ limit: 100 }
		],
		queryFn: () => adminApi.getUniversities({ limit: 100 })
	});
	const facultiesQuery = useQuery({
		queryKey: [
			"admin",
			"faculties",
			{ limit: 200 }
		],
		queryFn: () => adminApi.getFaculties({ limit: 200 })
	});
	const detailQuery = useQuery({
		queryKey: [
			"admin",
			"department-detail",
			detailModalId
		],
		queryFn: () => detailModalId ? adminApi.getDepartmentDetails(detailModalId) : null,
		enabled: !!detailModalId
	});
	const departments = departmentsQuery.data?.data || [];
	const totalRecords = departmentsQuery.data?.total || 0;
	const totalPages = departmentsQuery.data?.totalPages || 1;
	const universities = universitiesQuery.data?.data || [];
	const allFaculties = facultiesQuery.data?.data || [];
	const filterAvailableFaculties = (0, import_react.useMemo)(() => {
		if (universityFilter === "all") return allFaculties;
		return allFaculties.filter((f) => f.universityId === universityFilter);
	}, [allFaculties, universityFilter]);
	const createAvailableFaculties = (0, import_react.useMemo)(() => {
		if (!createForm.universityId) return allFaculties;
		return allFaculties.filter((f) => f.universityId === createForm.universityId);
	}, [allFaculties, createForm.universityId]);
	const invalidateQueries = () => {
		queryClient.invalidateQueries({ queryKey: ["admin", "departments"] });
		queryClient.invalidateQueries({ queryKey: ["admin", "faculties"] });
		queryClient.invalidateQueries({ queryKey: ["admin", "universities"] });
		queryClient.invalidateQueries({ queryKey: ["admin", "overview-stats"] });
		if (detailModalId) queryClient.invalidateQueries({ queryKey: [
			"admin",
			"department-detail",
			detailModalId
		] });
	};
	const createMutation = useMutation({
		mutationFn: (data) => adminApi.createDepartment({
			facultyId: data.facultyId,
			name: data.name,
			code: data.code,
			slug: data.slug,
			description: data.description
		}),
		onSuccess: (res) => {
			toast.success(`Department "${res.name}" created successfully!`);
			setCreateModalOpen(false);
			setCreateForm({
				universityId: "",
				facultyId: "",
				name: "",
				code: "",
				slug: "",
				description: ""
			});
			invalidateQueries();
		},
		onError: (err) => {
			toast.error(err.message || "Failed to create department");
		}
	});
	const updateMutation = useMutation({
		mutationFn: ({ id, data }) => adminApi.updateDepartment(id, data),
		onSuccess: (res) => {
			toast.success(`Department "${res.name}" updated successfully!`);
			setEditModalDept(null);
			invalidateQueries();
		},
		onError: (err) => {
			toast.error(err.message || "Failed to update department");
		}
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => adminApi.deleteDepartment(id),
		onSuccess: (res) => {
			toast.success(res.message || "Department deleted successfully.");
			setDeleteConfirmDept(null);
			if (detailModalId) setDetailModalId(null);
			invalidateQueries();
		},
		onError: (err) => {
			toast.error(err.message || "Cannot delete department");
		}
	});
	const handleNameChange = (name) => {
		const slug = name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
		const code = name.split(/\s+/).filter((w) => ![
			"of",
			"and",
			"the",
			"for",
			"in"
		].includes(w.toLowerCase())).map((w) => w[0]).join("").toUpperCase().slice(0, 8);
		setCreateForm((prev) => ({
			...prev,
			name,
			slug: prev.slug === "" || prev.slug === name.toLowerCase().replace(/\s+/g, "-").slice(0, -1) ? slug : prev.slug,
			code: prev.code === "" ? code ? `D${code}` : "DCS" : prev.code
		}));
	};
	const handleOpenEdit = (dept) => {
		setEditForm({
			facultyId: dept.facultyId,
			name: dept.name,
			code: dept.code,
			slug: dept.slug,
			description: dept.description || ""
		});
		setEditModalDept(dept);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Total Departments"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-primary/10 p-2 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black text-foreground",
								children: totalRecords
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Academic programs"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Parent Faculties"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black text-foreground",
								children: allFaculties.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Divisions hosting departments"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Partner Campuses"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black text-foreground",
								children: universities.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Higher education institutions"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Enrolled Students"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black text-foreground",
								children: departments.reduce((acc, d) => acc + (d._count?.studentProfiles || 0), 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Affiliated student profiles"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-w-[220px] flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: searchTerm,
									onChange: (e) => {
										setSearchTerm(e.target.value);
										setPage(1);
									},
									placeholder: "Search departments by name, code, faculty, university...",
									className: "h-9 pl-9 text-xs"
								}),
								searchTerm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSearchTerm(""),
									className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: universityFilter,
							onChange: (e) => {
								setUniversityFilter(e.target.value);
								setFacultyFilter("all");
								setPage(1);
							},
							className: "h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All Universities"
							}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: u.id,
								children: [
									u.name,
									" (",
									u.code,
									")"
								]
							}, u.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: facultyFilter,
							onChange: (e) => {
								setFacultyFilter(e.target.value);
								setPage(1);
							},
							className: "h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All Faculties"
							}), filterAvailableFaculties.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: f.id,
								children: [
									f.university.code,
									" — ",
									f.name,
									" (",
									f.code,
									")"
								]
							}, f.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: `${sortBy}:${sortOrder}`,
							onChange: (e) => {
								const [field = "name", order = "asc"] = e.target.value.split(":");
								setSortBy(field);
								setSortOrder(order || "asc");
							},
							className: "h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "name:asc",
									children: "Name (A-Z)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "name:desc",
									children: "Name (Z-A)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "code:asc",
									children: "Code (A-Z)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "createdAt:desc",
									children: "Newest First"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "studentProfiles:desc",
									children: "Most Students"
								})
							]
						}),
						(searchTerm || universityFilter !== "all" || facultyFilter !== "all") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => {
								setSearchTerm("");
								setUniversityFilter("all");
								setFacultyFilter("all");
								setPage(1);
							},
							className: "h-9 px-2 text-xs text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-1 size-3.5" }), " Reset"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setCreateModalOpen(true),
					className: "h-9 text-xs shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 size-4" }), " Add Department"]
				})]
			}),
			departmentsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : departmentsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => departmentsQuery.refetch() }) : departments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No departments found",
				description: searchTerm || universityFilter !== "all" || facultyFilter !== "all" ? "Try adjusting your search criteria or resetting filters." : "No academic departments registered in the database yet. Click 'Add Department' to create one."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: departments.map((d) => {
					const studentsCount = d._count?.studentProfiles ?? 0;
					d._count?.events;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 flex-wrap",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary",
												children: d.code
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground",
												children: d.faculty?.university?.code || "CAMPUS"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-1.5 text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors",
											children: d.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-3 text-muted-foreground/80 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d.faculty?.name })]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "size-7 text-muted-foreground hover:text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-4" })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
										align: "end",
										className: "w-48",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
												className: "text-xs",
												children: "Department Options"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => setDetailModalId(d.id),
												className: "text-xs cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "mr-2 size-3.5 text-primary" }), " View Details"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => handleOpenEdit(d),
												className: "text-xs cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "mr-2 size-3.5 text-blue-500" }), " Edit Department"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => setDeleteConfirmDept(d),
												className: "text-xs text-rose-600 dark:text-rose-400 cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 size-3.5" }), " Delete Department"]
											})
										]
									})] })]
								}),
								d.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed",
									children: d.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-muted/40 p-2.5 border border-border/40 text-[11px] text-muted-foreground space-y-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: d.faculty?.university?.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] text-primary",
											children: d.faculty?.code
										})]
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 border-t border-border/50 pt-3 flex items-center justify-between text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3 text-muted-foreground/80" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground font-semibold",
										children: studentsCount
									}),
									" Students"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								className: "h-7 text-xs px-2.5",
								onClick: () => setDetailModalId(d.id),
								children: "View Details"
							})]
						})]
					}, d.id);
				})
			}),
			totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-t border-border pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Showing ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: departments.length
						}),
						" of",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: totalRecords
						}),
						" departments"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: page <= 1,
							onClick: () => setPage((p) => Math.max(1, p - 1)),
							className: "h-8 text-xs",
							children: "Previous"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-medium text-foreground",
							children: [
								"Page ",
								page,
								" of ",
								totalPages
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: page >= totalPages,
							onClick: () => setPage((p) => p + 1),
							className: "h-8 text-xs",
							children: "Next"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: createModalOpen,
				onOpenChange: setCreateModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2 text-base",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-5 text-primary" }), " Add Academic Department"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs",
						children: "Establish a department under an academic faculty division."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							if (!createForm.facultyId || !createForm.name || !createForm.code) {
								toast.error("Please select a faculty and enter department name & code.");
								return;
							}
							createMutation.mutate(createForm);
						},
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Filter by University (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: createForm.universityId,
									onChange: (e) => {
										setCreateForm({
											...createForm,
											universityId: e.target.value,
											facultyId: ""
										});
									},
									className: "w-full h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "All Universities"
									}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: u.id,
										children: [
											u.name,
											" (",
											u.code,
											")"
										]
									}, u.id))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "text-xs font-semibold",
									children: ["Parent Faculty ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-rose-500",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									required: true,
									value: createForm.facultyId,
									onChange: (e) => setCreateForm({
										...createForm,
										facultyId: e.target.value
									}),
									className: "w-full h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select Faculty..."
									}), createAvailableFaculties.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: f.id,
										children: [
											f.university.code,
											" — ",
											f.name,
											" (",
											f.code,
											")"
										]
									}, f.id))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "text-xs font-semibold",
									children: ["Department Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-rose-500",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									value: createForm.name,
									onChange: (e) => handleNameChange(e.target.value),
									placeholder: "e.g. Department of Computer Science",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs font-semibold",
										children: ["Department Code ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-rose-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: createForm.code,
										onChange: (e) => setCreateForm({
											...createForm,
											code: e.target.value.toUpperCase().trim()
										}),
										placeholder: "e.g. DCS",
										className: "font-mono text-xs uppercase"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs font-semibold",
										children: ["URL Slug ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-rose-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: createForm.slug,
										onChange: (e) => setCreateForm({
											...createForm,
											slug: e.target.value.toLowerCase().trim()
										}),
										placeholder: "e.g. computer-science",
										className: "font-mono text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Description (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: createForm.description,
									onChange: (e) => setCreateForm({
										...createForm,
										description: e.target.value
									}),
									placeholder: "Course tracks, laboratory facilities, or department overview...",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setCreateModalOpen(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "sm",
									disabled: createMutation.isPending,
									children: createMutation.isPending ? "Creating..." : "Create Department"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!editModalDept,
				onOpenChange: (open) => !open && setEditModalDept(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2 text-base",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "size-5 text-primary" }), " Edit Department"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs",
						children: "Modify department details, code, slug, or parent faculty assignment."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							if (!editModalDept) return;
							updateMutation.mutate({
								id: editModalDept.id,
								data: editForm
							});
						},
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Parent Faculty"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: editForm.facultyId,
									onChange: (e) => setEditForm({
										...editForm,
										facultyId: e.target.value
									}),
									className: "w-full h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
									children: allFaculties.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: f.id,
										children: [
											f.university.code,
											" — ",
											f.name,
											" (",
											f.code,
											")"
										]
									}, f.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Department Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									value: editForm.name,
									onChange: (e) => setEditForm({
										...editForm,
										name: e.target.value
									}),
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "Department Code"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: editForm.code,
										onChange: (e) => setEditForm({
											...editForm,
											code: e.target.value.toUpperCase().trim()
										}),
										className: "font-mono text-xs uppercase"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "URL Slug"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: editForm.slug,
										onChange: (e) => setEditForm({
											...editForm,
											slug: e.target.value.toLowerCase().trim()
										}),
										className: "font-mono text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: editForm.description,
									onChange: (e) => setEditForm({
										...editForm,
										description: e.target.value
									}),
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setEditModalDept(null),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "sm",
									disabled: updateMutation.isPending,
									children: updateMutation.isPending ? "Saving..." : "Save Changes"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!detailModalId,
				onOpenChange: (open) => !open && setDetailModalId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "max-w-xl max-h-[85vh] overflow-y-auto",
					children: detailQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : detailQuery.isError || !detailQuery.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => detailQuery.refetch() }) : (() => {
						const d = detailQuery.data.department;
						const audit = detailQuery.data.auditHistory || [];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary",
											children: d.code
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground",
											children: d.faculty?.university?.name
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
										className: "text-base font-bold text-foreground mt-1",
										children: d.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
										className: "text-xs",
										children: [
											"Faculty of ",
											d.faculty?.name,
											" • ",
											d.faculty?.university?.city || "Sri Lanka"
										]
									})
								] }),
								d.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-muted/30 p-3 border border-border/40 text-xs text-foreground",
									children: d.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-card p-3 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold uppercase text-muted-foreground",
											children: "Affiliated Students"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xl font-bold text-foreground mt-1",
											children: d._count?.studentProfiles || 0
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-card p-3 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold uppercase text-muted-foreground",
											children: "Associated Events"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xl font-bold text-foreground mt-1",
											children: d._count?.events || 0
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-card p-3.5 space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
										children: "Academic Hierarchy"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-xs text-foreground flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: d.faculty?.university?.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: d.faculty?.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-primary",
												children: d.name
											})
										]
									})]
								}),
								audit.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 border-t border-border pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
										children: "Recent Audit History"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1.5",
										children: audit.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between rounded-lg bg-muted/20 p-2 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[10px] font-semibold text-primary",
												children: log.action
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground",
												children: formatDate(log.createdAt)
											})]
										}, log.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
									className: "pt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => setDetailModalId(null),
										children: "Close"
									})
								})
							]
						});
					})()
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!deleteConfirmDept,
				onOpenChange: (open) => !open && setDeleteConfirmDept(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2 text-base text-rose-600",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-5" }), " Delete Department"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						className: "text-xs leading-relaxed",
						children: [
							"Are you sure you want to permanently delete ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: deleteConfirmDept?.name }),
							"?",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Safety Protection:" }),
							" If student academic profiles or historical event records are linked to this department, deletion will be safely rejected by the server."
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setDeleteConfirmDept(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							size: "sm",
							disabled: deleteMutation.isPending,
							onClick: () => {
								if (deleteConfirmDept) deleteMutation.mutate(deleteConfirmDept.id);
							},
							children: deleteMutation.isPending ? "Deleting..." : "Permanently Delete"
						})]
					})]
				})
			})
		]
	});
}
var ORG_ROLE_OPTIONS = [
	{
		value: "LEADER",
		label: "Leader / President (Leadership Role)",
		isLeader: true
	},
	{
		value: "PRESIDENT",
		label: "President (Leadership Role)",
		isLeader: true
	},
	{
		value: "ADMIN",
		label: "Admin (Leadership Role)",
		isLeader: true
	},
	{
		value: "VICE_PRESIDENT",
		label: "Vice President",
		isLeader: false
	},
	{
		value: "SECRETARY",
		label: "Secretary",
		isLeader: false
	},
	{
		value: "TREASURER",
		label: "Treasurer",
		isLeader: false
	},
	{
		value: "EVENT_ORGANIZER",
		label: "Event Organizer",
		isLeader: false
	},
	{
		value: "EVENT_MANAGER",
		label: "Event Manager",
		isLeader: false
	},
	{
		value: "VOLUNTEER_COORDINATOR",
		label: "Volunteer Coordinator",
		isLeader: false
	},
	{
		value: "MODERATOR",
		label: "Moderator",
		isLeader: false
	},
	{
		value: "MEMBER",
		label: "General Member",
		isLeader: false
	},
	{
		value: "OTHER",
		label: "Other Committee Member",
		isLeader: false
	}
];
function AdminMemberRosters({ universities = [], initialOrgId }) {
	const queryClient = useQueryClient();
	const [orgSearch, setOrgSearch] = (0, import_react.useState)("");
	const [selectedUniId, setSelectedUniId] = (0, import_react.useState)("ALL");
	const [selectedOrgStatus, setSelectedOrgStatus] = (0, import_react.useState)("ALL");
	const [selectedOrgId, setSelectedOrgId] = (0, import_react.useState)(initialOrgId || "");
	const [memberSearch, setMemberSearch] = (0, import_react.useState)("");
	const [selectedRole, setSelectedRole] = (0, import_react.useState)("ALL");
	const [selectedMemberStatus, setSelectedMemberStatus] = (0, import_react.useState)("ALL");
	const [memberPage, setMemberPage] = (0, import_react.useState)(1);
	const [memberLimit] = (0, import_react.useState)(15);
	const [memberSortBy, setMemberSortBy] = (0, import_react.useState)("joinedAt");
	const [memberSortOrder, setMemberSortOrder] = (0, import_react.useState)("desc");
	const [inspectMember, setInspectMember] = (0, import_react.useState)(null);
	const [editRoleMember, setEditRoleMember] = (0, import_react.useState)(null);
	const [editRoleValue, setEditRoleValue] = (0, import_react.useState)("MEMBER");
	const [editStatusValue, setEditStatusValue] = (0, import_react.useState)("ACTIVE");
	const [editTitleValue, setEditTitleValue] = (0, import_react.useState)("");
	const [editCanCreateEvents, setEditCanCreateEvents] = (0, import_react.useState)(false);
	const [editReason, setEditReason] = (0, import_react.useState)("");
	const [removeMemberTarget, setRemoveMemberTarget] = (0, import_react.useState)(null);
	const [removeReason, setRemoveReason] = (0, import_react.useState)("");
	const [changeOrgStatusTarget, setChangeOrgStatusTarget] = (0, import_react.useState)(null);
	const [newOrgStatus, setNewOrgStatus] = (0, import_react.useState)("APPROVED");
	const [orgStatusReason, setOrgStatusReason] = (0, import_react.useState)("");
	const orgsQuery = useQuery({
		queryKey: [
			"admin",
			"organizations",
			"roster-selector",
			selectedUniId,
			selectedOrgStatus,
			orgSearch
		],
		queryFn: () => adminApi.getOrganizations({
			universityId: selectedUniId !== "ALL" ? selectedUniId : void 0,
			status: selectedOrgStatus !== "ALL" ? selectedOrgStatus : void 0,
			search: orgSearch.trim() || void 0,
			limit: 100
		})
	});
	const organizations = orgsQuery.data?.data || [];
	import_react.useEffect(() => {
		const firstId = organizations[0]?.id;
		if (!selectedOrgId && firstId) setSelectedOrgId(firstId);
	}, [selectedOrgId, organizations]);
	const membersQuery = useQuery({
		queryKey: [
			"admin",
			"organization-members",
			selectedOrgId,
			memberSearch,
			selectedRole,
			selectedMemberStatus,
			memberPage,
			memberLimit,
			memberSortBy,
			memberSortOrder
		],
		queryFn: () => adminApi.getOrganizationMembers(selectedOrgId, {
			search: memberSearch.trim() || void 0,
			role: selectedRole !== "ALL" ? selectedRole : void 0,
			status: selectedMemberStatus !== "ALL" ? selectedMemberStatus : void 0,
			sortBy: memberSortBy,
			sortOrder: memberSortOrder,
			page: memberPage,
			limit: memberLimit
		}),
		enabled: Boolean(selectedOrgId)
	});
	const activeOrg = membersQuery.data?.organization || organizations.find((o) => o.id === selectedOrgId);
	const membersList = membersQuery.data?.data || [];
	const totalMembers = membersQuery.data?.total || 0;
	const totalPages = membersQuery.data?.totalPages || 1;
	const leadersCount = membersQuery.data?.leadersCount || 0;
	membersQuery.data?.activeCount;
	const maxLeaders = membersQuery.data?.maxLeaders || 2;
	const updateMemberMutation = useMutation({
		mutationFn: (vars) => adminApi.updateOrganizationMemberRole(vars.orgId, vars.memberId, vars.dto),
		onSuccess: (updated) => {
			toast.success(`Role updated for ${updated.user.name}! 🛡️`, { description: `Position changed to ${updated.role} (Events: ${updated.canCreateEvents ? "Enabled" : "Disabled"}).` });
			setEditRoleMember(null);
			setEditReason("");
			queryClient.invalidateQueries({ queryKey: [
				"admin",
				"organization-members",
				selectedOrgId
			] });
			queryClient.invalidateQueries({ queryKey: ["admin", "organizations"] });
		},
		onError: (err) => {
			toast.error(err?.message || "Failed to update member role");
		}
	});
	const removeMemberMutation = useMutation({
		mutationFn: (vars) => adminApi.removeOrganizationMember(vars.orgId, vars.memberId, vars.reason),
		onSuccess: (_, vars) => {
			toast.success("Member removed from society roster", { description: "Organization-scoped permissions have been revoked safely." });
			setRemoveMemberTarget(null);
			setRemoveReason("");
			queryClient.invalidateQueries({ queryKey: [
				"admin",
				"organization-members",
				vars.orgId
			] });
			queryClient.invalidateQueries({ queryKey: ["admin", "organizations"] });
		},
		onError: (err) => {
			toast.error(err?.message || "Failed to remove organization member");
		}
	});
	const updateOrgStatusMutation = useMutation({
		mutationFn: (vars) => adminApi.updateOrganizationStatus(vars.orgId, vars.status, vars.reason),
		onSuccess: (updated) => {
			toast.success(`Organization status updated to ${updated.status}`, { description: `Governance state updated for "${updated.name}".` });
			setChangeOrgStatusTarget(null);
			setOrgStatusReason("");
			queryClient.invalidateQueries({ queryKey: [
				"admin",
				"organization-members",
				selectedOrgId
			] });
			queryClient.invalidateQueries({ queryKey: ["admin", "organizations"] });
		},
		onError: (err) => {
			toast.error(err?.message || "Failed to update organization status");
		}
	});
	const handleOpenEditRole = (member) => {
		setEditRoleMember(member);
		setEditRoleValue(member.role);
		setEditStatusValue(member.status);
		setEditTitleValue(member.title || "");
		setEditCanCreateEvents(Boolean(member.canCreateEvents));
		setEditReason("");
	};
	const handleSaveEditRole = (e) => {
		e.preventDefault();
		if (!editRoleMember || !selectedOrgId) return;
		if ([
			"LEADER",
			"PRESIDENT",
			"ADMIN"
		].includes(editRoleValue) && editStatusValue === "ACTIVE" && ![
			"LEADER",
			"PRESIDENT",
			"ADMIN"
		].includes(editRoleMember.role) && leadersCount >= maxLeaders) {
			toast.error(`Institutional Limit: Organization already has ${leadersCount} active leaders (max ${maxLeaders}). Demote an existing leader before promoting a new one.`);
			return;
		}
		updateMemberMutation.mutate({
			orgId: selectedOrgId,
			memberId: editRoleMember.id,
			dto: {
				role: editRoleValue,
				status: editStatusValue,
				title: editTitleValue.trim() || void 0,
				canCreateEvents: editCanCreateEvents,
				reason: editReason.trim() || void 0
			}
		});
	};
	const handleConfirmRemoveMember = () => {
		if (!removeMemberTarget || !selectedOrgId) return;
		if (!removeReason.trim()) {
			toast.error("Please provide a justification reason for moderation audit tracking.");
			return;
		}
		removeMemberMutation.mutate({
			orgId: selectedOrgId,
			memberId: removeMemberTarget.id,
			reason: removeReason.trim()
		});
	};
	const handleConfirmChangeOrgStatus = (e) => {
		e.preventDefault();
		if (!changeOrgStatusTarget) return;
		updateOrgStatusMutation.mutate({
			orgId: changeOrgStatusTarget.id,
			status: newOrgStatus,
			reason: orgStatusReason.trim() || void 0
		});
	};
	const statsOverview = (0, import_react.useMemo)(() => {
		return {
			totalOrgs: organizations.length,
			verifiedOrgs: organizations.filter((o) => o.isVerified && o.status === "APPROVED").length,
			aggregateMembers: organizations.reduce((acc, o) => acc + (o._count?.members || 0), 0)
		};
	}, [organizations]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-xl font-bold tracking-tight text-foreground flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-6 text-primary" }), " Society Member Rosters & Governance"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Inspect authoritative society membership rosters, adjust committee positions, and enforce the institutional 2-leader limit."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "text-xs",
						onClick: () => {
							orgsQuery.refetch();
							if (selectedOrgId) membersQuery.refetch();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5 mr-1.5", (orgsQuery.isFetching || membersQuery.isFetching) && "animate-spin") }), "Refresh"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Registered Societies",
						value: statsOverview.totalOrgs,
						hint: "Total student bodies on platform",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-5 text-primary" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total Roster Members",
						value: statsOverview.aggregateMembers,
						hint: "Enrolled student club members",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5 text-emerald-500" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Active Leaders in Society",
						value: `${leadersCount} / ${maxLeaders}`,
						hint: leadersCount >= maxLeaders ? "Maximum leadership capacity" : `${maxLeaders - leadersCount} leadership spot available`,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: cn("size-5", leadersCount >= maxLeaders ? "text-amber-500" : "text-indigo-500") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Verified Organizations",
						value: statsOverview.verifiedOrgs,
						hint: "Officially accredited student clubs",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-sky-500" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-4 space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-4 text-primary" }), " Select Society"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-semibold text-muted-foreground",
									children: [organizations.length, " Bodies"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: orgSearch,
										onChange: (e) => setOrgSearch(e.target.value),
										placeholder: "Search societies...",
										className: "pl-8 text-xs h-8"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: selectedUniId,
										onChange: (e) => setSelectedUniId(e.target.value),
										className: "rounded-md border border-input bg-background px-2 py-1.5 text-[11px] font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "ALL",
											children: "All Universities"
										}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: u.id,
											children: u.code || u.name
										}, u.id))]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: selectedOrgStatus,
										onChange: (e) => setSelectedOrgStatus(e.target.value),
										className: "rounded-md border border-input bg-background px-2 py-1.5 text-[11px] font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "ALL",
												children: "All Statuses"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "APPROVED",
												children: "Approved / Active"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "PENDING",
												children: "Pending Approval"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "SUSPENDED",
												children: "Suspended"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "REJECTED",
												children: "Rejected"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "max-h-[580px] overflow-y-auto space-y-1.5 pr-1",
								children: orgsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : orgsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => orgsQuery.refetch() }) : organizations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-6 text-muted-foreground" }),
									title: "No societies found",
									description: "Try adjusting your search or filters."
								}) : organizations.map((org) => {
									const isSelected = org.id === selectedOrgId;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setSelectedOrgId(org.id);
											setMemberPage(1);
										},
										className: cn("w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all", isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border/60 bg-card/60 hover:bg-muted/40 hover:border-border"),
										children: [org.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: org.logoUrl,
											alt: org.name,
											className: "size-9 rounded-lg object-cover border border-border shrink-0 mt-0.5"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid size-9 shrink-0 place-items-center rounded-lg bg-navy text-xs font-bold text-navy-foreground mt-0.5",
											children: org.name?.[0]?.toUpperCase() || "S"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-semibold text-xs text-foreground truncate",
														children: org.name
													}), org.isVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-primary shrink-0" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-muted-foreground truncate",
													children: org.university?.code || org.university?.name || "Campus-Wide"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 mt-1.5 text-[10px]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("rounded px-1.5 py-0.2 font-bold uppercase", org.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : org.status === "SUSPENDED" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"),
														children: org.status
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-muted-foreground",
														children: [org._count?.members ?? 0, " members"]
													})]
												})
											]
										})]
									}, org.id);
								})
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-8 space-y-4",
					children: [activeOrg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3.5 min-w-0",
								children: [activeOrg.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: activeOrg.logoUrl,
									alt: activeOrg.name,
									className: "size-14 rounded-xl object-cover border-2 border-border shrink-0"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-14 shrink-0 place-items-center rounded-xl bg-navy text-lg font-bold text-navy-foreground",
									children: activeOrg.name?.[0]?.toUpperCase() || "S"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 flex-wrap",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "font-bold text-base text-foreground truncate",
													children: activeOrg.name
												}),
												activeOrg.isVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }), " Accredited"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", activeOrg.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : activeOrg.status === "SUSPENDED" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"),
													children: activeOrg.status
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground mt-0.5",
											children: [
												activeOrg.university?.name || "Campus-Wide Institution",
												" • Established ",
												formatDate(activeOrg.createdAt)
											]
										}),
										activeOrg.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-foreground/80 mt-1 line-clamp-2",
											children: activeOrg.description
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									className: "h-8 text-xs",
									onClick: () => {
										setChangeOrgStatusTarget(activeOrg);
										setNewOrgStatus(activeOrg.status);
										setOrgStatusReason("");
									},
									children: "Change Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "ghost",
									size: "sm",
									className: "h-8 text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `/organizations/${activeOrg.slug}`,
										target: "_blank",
										rel: "noreferrer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5 mr-1" }), " Public Page"]
									})
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("flex items-center justify-between rounded-lg p-3 text-xs border", leadersCount >= maxLeaders ? "border-amber-500/30 bg-amber-500/5 text-amber-900 dark:text-amber-200" : "border-indigo-500/30 bg-indigo-500/5 text-indigo-900 dark:text-indigo-200"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Leadership Quota:" }),
									" ",
									leadersCount,
									" of ",
									maxLeaders,
									" active leadership seats assigned."
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-semibold opacity-90",
								children: leadersCount >= maxLeaders ? "Ceiling Reached" : `${maxLeaders - leadersCount} Available`
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 space-y-3 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: memberSearch,
										onChange: (e) => {
											setMemberSearch(e.target.value);
											setMemberPage(1);
										},
										placeholder: "Search roster by student name or email...",
										className: "pl-8 text-xs h-9"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 flex-wrap sm:flex-nowrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: selectedRole,
											onChange: (e) => {
												setSelectedRole(e.target.value);
												setMemberPage(1);
											},
											className: "rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary h-9",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "ALL",
												children: "All Roles"
											}), ORG_ROLE_OPTIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: r.value,
												children: r.label
											}, r.value))]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: selectedMemberStatus,
											onChange: (e) => {
												setSelectedMemberStatus(e.target.value);
												setMemberPage(1);
											},
											className: "rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary h-9",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "ALL",
													children: "All Statuses"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "ACTIVE",
													children: "Active"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "PENDING",
													children: "Pending"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "SUSPENDED",
													children: "Suspended"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "REJECTED",
													children: "Rejected"
												})
											]
										}),
										(memberSearch || selectedRole !== "ALL" || selectedMemberStatus !== "ALL") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											className: "h-9 text-xs",
											onClick: () => {
												setMemberSearch("");
												setSelectedRole("ALL");
												setSelectedMemberStatus("ALL");
												setMemberPage(1);
											},
											children: "Reset"
										})
									]
								})]
							}),
							membersQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : membersQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => membersQuery.refetch() }) : membersList.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-8 text-muted-foreground" }),
								title: "No members match criteria",
								description: memberSearch || selectedRole !== "ALL" ? "Try adjusting your search or role filters." : "This organization currently has no registered members."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "border-b border-border bg-muted/40 font-semibold text-muted-foreground uppercase tracking-wider text-[10px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Member & Identity"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Role"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Title / Office"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Event Rights"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Status"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Joined"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3 text-right",
												children: "Actions"
											})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-border",
										children: membersList.map((m) => {
											const isLeader = [
												"LEADER",
												"PRESIDENT",
												"ADMIN"
											].includes(m.role);
											const isEventOrganizing = Boolean(m.canCreateEvents);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "hover:bg-muted/30 transition-colors",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-3",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2.5",
															children: [m.user?.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: m.user.avatarUrl,
																alt: m.user.name,
																className: "size-8 rounded-full object-cover border border-border shrink-0"
															}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "grid size-8 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-navy-foreground",
																children: m.user?.name?.[0]?.toUpperCase() || "M"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "min-w-0",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "flex items-center gap-1.5",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			className: "font-semibold text-foreground truncate",
																			children: m.user?.name || "Unknown User"
																		}), m.isFounder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "rounded bg-primary/10 px-1 py-0.2 text-[9px] font-bold text-primary uppercase",
																			children: "Founder"
																		})]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																		className: "text-[11px] text-muted-foreground truncate",
																		children: m.user?.email
																	}),
																	m.user?.studentProfile?.studentIdNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																		className: "text-[10px] font-mono text-muted-foreground",
																		children: ["ID: ", m.user.studentProfile.studentIdNumber]
																	})
																]
															})]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-3",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase", isLeader ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20" : [
																"VICE_PRESIDENT",
																"SECRETARY",
																"TREASURER",
																"EVENT_ORGANIZER",
																"EVENT_MANAGER"
															].includes(m.role) ? "bg-primary/10 text-primary border border-primary/20" : "bg-muted text-muted-foreground"),
															children: [isLeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-3 shrink-0" }), m.role]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-3",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-foreground font-medium",
															children: m.title || "—"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-3",
														children: isEventOrganizing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Can Publish"]
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "inline-flex items-center gap-1 text-[10px] text-muted-foreground",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3" }), " None"]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-3",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: cn("rounded px-2 py-0.5 text-[10px] font-bold uppercase", m.status === "ACTIVE" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : m.status === "SUSPENDED" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"),
															children: m.status
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-3 text-muted-foreground whitespace-nowrap",
														children: formatDate(m.joinedAt)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-3 text-right",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
															asChild: true,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																variant: "ghost",
																size: "icon",
																className: "size-7",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-3.5" })
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
															align: "end",
															className: "w-44 text-xs",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Member Actions" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
																	onClick: () => setInspectMember(m),
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5 mr-2" }), " Inspect Identity"]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
																	onClick: () => handleOpenEditRole(m),
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "size-3.5 mr-2" }), " Edit Role & Rights"]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
																	className: "text-destructive focus:text-destructive",
																	onClick: () => {
																		setRemoveMemberTarget(m);
																		setRemoveReason("");
																	},
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 mr-2" }), " Remove Member"]
																})
															]
														})] })
													})
												]
											}, m.id);
										})
									})]
								})
							}),
							totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Showing ",
									(memberPage - 1) * memberLimit + 1,
									" to",
									" ",
									Math.min(memberPage * memberLimit, totalMembers),
									" of ",
									totalMembers,
									" members"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "icon",
											className: "size-7",
											disabled: memberPage <= 1,
											onClick: () => setMemberPage((p) => Math.max(p - 1, 1)),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "px-2 text-xs font-semibold text-foreground",
											children: [
												memberPage,
												" / ",
												totalPages
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "icon",
											className: "size-7",
											disabled: memberPage >= totalPages,
											onClick: () => setMemberPage((p) => Math.min(p + 1, totalPages)),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })
										})
									]
								})]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!editRoleMember,
				onOpenChange: (open) => !open && setEditRoleMember(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-5 text-primary" }), " Adjust Member Role & Privileges"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
						"Modify committee positioning in ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: activeOrg?.name }),
						". Enforces the institutional 2-leader limit."
					] })] }), editRoleMember && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveEditRole,
						className: "space-y-3.5 py-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-muted/30 p-3 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-9 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-navy-foreground",
									children: editRoleMember.user?.name?.[0]?.toUpperCase() || "M"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-foreground",
									children: editRoleMember.user?.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: editRoleMember.user?.email
								})] })]
							}),
							[
								"LEADER",
								"PRESIDENT",
								"ADMIN"
							].includes(editRoleValue) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 text-amber-900 dark:text-amber-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-bold flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5 shrink-0" }), " Leadership Governance Rule"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] mt-0.5",
									children: [
										"Promoting to a Leader role consumes a leadership seat. Currently ",
										leadersCount,
										" of ",
										maxLeaders,
										" seats are assigned in this organization."
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Committee Role"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									required: true,
									value: editRoleValue,
									onChange: (e) => setEditRoleValue(e.target.value),
									className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
									children: ORG_ROLE_OPTIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: r.value,
										children: r.label
									}, r.value))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Membership Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									required: true,
									value: editStatusValue,
									onChange: (e) => setEditStatusValue(e.target.value),
									className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "ACTIVE",
											children: "ACTIVE (Full Membership Rights)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "PENDING",
											children: "PENDING (Awaiting Review)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "SUSPENDED",
											children: "SUSPENDED (Temporarily Disabled)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "REJECTED",
											children: "REJECTED (Declined Admission)"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Custom Title / Office (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: editTitleValue,
									onChange: (e) => setEditTitleValue(e.target.value),
									placeholder: "e.g. Vice President 2026, Head of Logistics",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									id: "canCreateEventsToggle",
									checked: editCanCreateEvents,
									onChange: (e) => setEditCanCreateEvents(e.target.checked),
									className: "rounded border-input text-primary focus:ring-primary size-4"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "canCreateEventsToggle",
									className: "text-xs font-normal cursor-pointer",
									children: "Grant event creation and draft submission permissions"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Reason / Audit Log Justification"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: editReason,
									onChange: (e) => setEditReason(e.target.value),
									placeholder: "Reason for changing member role...",
									className: "text-xs",
									rows: 2
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setEditRoleMember(null),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "sm",
									disabled: updateMemberMutation.isPending,
									children: updateMemberMutation.isPending ? "Updating..." : "Save Role & Permissions"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!inspectMember,
				onOpenChange: (open) => !open && setInspectMember(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-5 text-primary" }), " Member Profile Inspection"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Institutional student verification and membership records." })] }), inspectMember && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 py-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3.5",
								children: [inspectMember.user?.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: inspectMember.user.avatarUrl,
									alt: inspectMember.user.name,
									className: "size-12 rounded-full object-cover border-2 border-border"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-12 place-items-center rounded-full bg-navy text-sm font-bold text-navy-foreground",
									children: inspectMember.user?.name?.[0]?.toUpperCase() || "M"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-sm text-foreground",
										children: inspectMember.user?.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: inspectMember.user?.email
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 mt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-primary/10 px-1.5 py-0.2 text-[9px] font-bold text-primary uppercase",
											children: inspectMember.role
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-muted px-1.5 py-0.2 text-[9px] font-bold uppercase",
											children: inspectMember.status
										})]
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border p-3 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] uppercase font-bold text-muted-foreground",
											children: "Student ID"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-foreground",
											children: inspectMember.user?.studentProfile?.studentIdNumber || "Not recorded"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border p-3 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] uppercase font-bold text-muted-foreground",
											children: "Academic Year"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-foreground",
											children: inspectMember.user?.studentProfile?.academicYear || "Undergraduate"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border p-3 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] uppercase font-bold text-muted-foreground",
											children: "Faculty"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-foreground",
											children: inspectMember.user?.studentProfile?.faculty?.name || "Campus-Wide"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border p-3 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] uppercase font-bold text-muted-foreground",
											children: "Department"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-foreground",
											children: inspectMember.user?.studentProfile?.department?.name || "General"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border p-3 space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Enrolled Date:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: formatDate(inspectMember.joinedAt)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Custom Office Title:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: inspectMember.title || "None"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Event Publishing Rights:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: inspectMember.canCreateEvents ? "Enabled" : "Disabled"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setInspectMember(null),
									children: "Close"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									size: "sm",
									onClick: () => {
										const m = inspectMember;
										setInspectMember(null);
										handleOpenEditRole(m);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "size-3.5 mr-1.5" }), " Edit Role"]
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!removeMemberTarget,
				onOpenChange: (open) => !open && setRemoveMemberTarget(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "flex items-center gap-2 text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, { className: "size-5" }), " Remove Member from Society"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
							"Are you sure you want to remove ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: removeMemberTarget?.user?.name }),
							" from",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: activeOrg?.name }),
							"?"
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 py-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-bold flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5 shrink-0" }), " Permission Revocation Notice"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] mt-0.5",
									children: "Removing this member will immediately revoke all their organization-scoped leadership permissions and draft event management capabilities in this society."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "text-xs font-semibold",
									children: ["Justification / Moderation Reason ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									required: true,
									value: removeReason,
									onChange: (e) => setRemoveReason(e.target.value),
									placeholder: "State the reason for removing this member (recorded in audit logs)...",
									className: "text-xs",
									rows: 3
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => setRemoveMemberTarget(null),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "destructive",
								size: "sm",
								disabled: removeMemberMutation.isPending || !removeReason.trim(),
								onClick: handleConfirmRemoveMember,
								children: removeMemberMutation.isPending ? "Removing..." : "Confirm Member Removal"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!changeOrgStatusTarget,
				onOpenChange: (open) => !open && setChangeOrgStatusTarget(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-5 text-primary" }), " Society Governance Status"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
						"Update platform operating status for ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: changeOrgStatusTarget?.name }),
						"."
					] })] }), changeOrgStatusTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleConfirmChangeOrgStatus,
						className: "space-y-3.5 py-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Organization Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									required: true,
									value: newOrgStatus,
									onChange: (e) => setNewOrgStatus(e.target.value),
									className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "APPROVED",
											children: "APPROVED (Active & Operational)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "SUSPENDED",
											children: "SUSPENDED (Temporarily Frozen)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "PENDING",
											children: "PENDING (Under Review)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "REJECTED",
											children: "REJECTED (Declined Accreditation)"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Reason / Audit Notes (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: orgStatusReason,
									onChange: (e) => setOrgStatusReason(e.target.value),
									placeholder: "Explain status update justification...",
									className: "text-xs",
									rows: 2
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setChangeOrgStatusTarget(null),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "sm",
									disabled: updateOrgStatusMutation.isPending,
									children: updateOrgStatusMutation.isPending ? "Updating..." : "Update Status"
								})]
							})
						]
					})]
				})
			})
		]
	});
}
function AdminPaymentLedger({ universities = [] }) {
	const queryClient = useQueryClient();
	const universitiesListQuery = useQuery({
		queryKey: [
			"admin",
			"universities",
			"dropdown"
		],
		queryFn: () => adminApi.getUniversities({ limit: 100 }),
		enabled: universities.length === 0
	});
	const availableUniversities = (0, import_react.useMemo)(() => {
		if (universities && universities.length > 0) return universities;
		return (universitiesListQuery.data?.data || []).map((u) => ({
			id: u.id,
			name: u.name,
			code: u.code || u.shortName || u.name
		}));
	}, [universities, universitiesListQuery.data]);
	const [search, setSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("ALL");
	const [provider, setProvider] = (0, import_react.useState)("ALL");
	const [universityId, setUniversityId] = (0, import_react.useState)("ALL");
	const [currency, setCurrency] = (0, import_react.useState)("ALL");
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [sortBy, setSortBy] = (0, import_react.useState)("createdAt");
	const [sortOrder, setSortOrder] = (0, import_react.useState)("desc");
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(15);
	const [copiedKey, setCopiedKey] = (0, import_react.useState)(null);
	const [selectedPaymentId, setSelectedPaymentId] = (0, import_react.useState)(null);
	const [refundPaymentTarget, setRefundPaymentTarget] = (0, import_react.useState)(null);
	const [refundReason, setRefundReason] = (0, import_react.useState)("");
	const [refundAmount, setRefundAmount] = (0, import_react.useState)("");
	const [receiptModalPayment, setReceiptModalPayment] = (0, import_react.useState)(null);
	const [isExportingCsv, setIsExportingCsv] = (0, import_react.useState)(false);
	const [isExportingPdf, setIsExportingPdf] = (0, import_react.useState)(false);
	const handleExport = async (format) => {
		const totalCount = paymentsQuery.data?.total || 0;
		if (totalCount === 0) {
			toast.info("No payment transactions match the active filters to export.");
			return;
		}
		if (format === "csv") setIsExportingCsv(true);
		else setIsExportingPdf(true);
		try {
			toast.info(`Generating ${format.toUpperCase()} export...`, { description: `Exporting all ${totalCount.toLocaleString()} filtered transaction records.` });
			const filename = await adminApi.exportData("payments", format, {
				search: search.trim() || void 0,
				status: status !== "ALL" ? status : void 0,
				provider: provider !== "ALL" ? provider : void 0,
				universityId: universityId !== "ALL" ? universityId : void 0,
				currency: currency !== "ALL" ? currency : void 0,
				startDate: dateFilter.startDate || void 0,
				endDate: dateFilter.endDate || void 0,
				year: dateFilter.year || void 0,
				month: dateFilter.month || void 0,
				datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
				sortBy,
				sortOrder
			});
			toast.success(`Export ready!`, { description: `Downloaded ${filename}` });
		} catch (err) {
			toast.error(`Export failed`, { description: err?.message || "Failed to generate export" });
		} finally {
			if (format === "csv") setIsExportingCsv(false);
			else setIsExportingPdf(false);
		}
	};
	const paymentsQuery = useQuery({
		queryKey: [
			"admin",
			"payments",
			{
				search: search.trim() || void 0,
				status: status !== "ALL" ? status : void 0,
				provider: provider !== "ALL" ? provider : void 0,
				universityId: universityId !== "ALL" ? universityId : void 0,
				currency: currency !== "ALL" ? currency : void 0,
				startDate: dateFilter.startDate || void 0,
				endDate: dateFilter.endDate || void 0,
				year: dateFilter.year || void 0,
				month: dateFilter.month || void 0,
				datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
				sortBy,
				sortOrder,
				page,
				limit: pageSize
			}
		],
		queryFn: () => adminApi.getPayments({
			search: search.trim() || void 0,
			status: status !== "ALL" ? status : void 0,
			provider: provider !== "ALL" ? provider : void 0,
			universityId: universityId !== "ALL" ? universityId : void 0,
			currency: currency !== "ALL" ? currency : void 0,
			startDate: dateFilter.startDate || void 0,
			endDate: dateFilter.endDate || void 0,
			year: dateFilter.year || void 0,
			month: dateFilter.month || void 0,
			datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
			sortBy,
			sortOrder,
			page,
			limit: pageSize
		})
	});
	const statsQuery = useQuery({
		queryKey: [
			"admin",
			"payments",
			"stats"
		],
		queryFn: () => adminApi.getPaymentStats()
	});
	const paymentDetailQuery = useQuery({
		queryKey: [
			"admin",
			"payments",
			"detail",
			selectedPaymentId
		],
		queryFn: () => adminApi.getPaymentDetails(selectedPaymentId),
		enabled: Boolean(selectedPaymentId)
	});
	const refundMutation = useMutation({
		mutationFn: ({ id, payload }) => adminApi.refundPayment(id, payload),
		onSuccess: (res) => {
			toast.success(res.message || "Payment refunded successfully.", { description: "Admission tickets and passes have been automatically revoked." });
			setRefundPaymentTarget(null);
			setRefundReason("");
			setRefundAmount("");
			queryClient.invalidateQueries({ queryKey: ["admin", "payments"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
		},
		onError: (err) => {
			toast.error(err?.message || "Failed to process refund. Please verify gateway connectivity.");
		}
	});
	const simulateMutation = useMutation({
		mutationFn: (id) => adminApi.simulateSandboxPayment(id),
		onSuccess: (res) => {
			toast.success(res.message || "Sandbox payment verified & settled!", { description: "Official receipt generated and QR tickets issued." });
			queryClient.invalidateQueries({ queryKey: ["admin", "payments"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
			if (selectedPaymentId) queryClient.invalidateQueries({ queryKey: [
				"admin",
				"payments",
				"detail",
				selectedPaymentId
			] });
		},
		onError: (err) => {
			toast.error(err?.message || "Failed to simulate sandbox payment.");
		}
	});
	const handleCopy = (text, key) => {
		navigator.clipboard.writeText(text);
		setCopiedKey(key);
		toast.success("Copied to clipboard", { duration: 1500 });
		setTimeout(() => setCopiedKey(null), 2e3);
	};
	const handleResetFilters = () => {
		setSearch("");
		setStatus("ALL");
		setProvider("ALL");
		setUniversityId("ALL");
		setCurrency("ALL");
		setDateFilter({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
		setSortBy("createdAt");
		setSortOrder("desc");
		setPage(1);
	};
	const formatMoney = (amount, curr = "LKR") => {
		return `${curr} ${(Number(amount) || 0).toLocaleString(void 0, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		})}`;
	};
	const formatDate = (dateStr) => {
		if (!dateStr) return "N/A";
		const d = new Date(dateStr);
		return isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	};
	const formatShortDate = (dateStr) => {
		if (!dateStr) return "N/A";
		const d = new Date(dateStr);
		return isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric"
		});
	};
	const getStatusBadge = (statusVal) => {
		switch (statusVal) {
			case "PAID": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Paid & Settled"]
			});
			case "PENDING": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), " Pending Checkout"]
			});
			case "PROCESSING": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3 animate-spin" }), " Processing"]
			});
			case "REFUNDED": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3" }), " Refunded"]
			});
			case "FAILED": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3" }), " Failed / Declined"]
			});
			case "CANCELLED": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-3" }), " Cancelled"]
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-muted text-muted-foreground",
				children: statusVal
			});
		}
	};
	const getProviderBadge = (providerName) => {
		switch (providerName) {
			case "STRIPE": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20",
				children: "Stripe"
			});
			case "PAYHERE": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20",
				children: "PayHere"
			});
			case "ONEPAY": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20",
				children: "OnePay"
			});
			case "WEBXPAY": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
				children: "WebXPay"
			});
			case "GATEWAY_SANDBOX": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-2.5" }), " Sandbox"]
			});
			case "CLUB_TRANSFER": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-2.5 text-amber-600 dark:text-amber-400" }), " Club Transfer"]
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground border border-border",
				children: providerName
			});
		}
	};
	const stats = statsQuery.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Transactions & Payments Ledger",
				description: "Comprehensive financial audit trail, digital receipt verification, settlement tracking, and administrative refund processing.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => {
								paymentsQuery.refetch();
								statsQuery.refetch();
								toast.info("Refreshing transaction ledger...");
							},
							disabled: paymentsQuery.isFetching,
							className: "gap-1.5 h-8 text-xs font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5 mr-1.5", paymentsQuery.isFetching && "animate-spin") }), "Refresh"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => handleExport("csv"),
							disabled: isExportingCsv || paymentsQuery.isFetching,
							className: "gap-1.5 h-8 text-xs font-medium text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
							children: [isExportingCsv ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-3.5 text-emerald-600 dark:text-emerald-400" }), "CSV"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => handleExport("pdf"),
							disabled: isExportingPdf || paymentsQuery.isFetching,
							className: "gap-1.5 h-8 text-xs font-medium text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40 hover:bg-amber-50 dark:hover:bg-amber-950/30",
							children: [isExportingPdf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5 text-amber-600 dark:text-amber-400" }), "PDF"]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Gross Payment Volume"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "size-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold tracking-tight text-foreground",
								children: statsQuery.isLoading ? "..." : formatMoney(stats?.totalPaidVolume ?? 0)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted-foreground flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-emerald-600 dark:text-emerald-400",
										children: stats?.paidCount ?? 0
									}),
									" ",
									"settled & verified payments"
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Completed Payments"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold tracking-tight text-foreground",
								children: statsQuery.isLoading ? "..." : (stats?.paidCount ?? 0).toLocaleString()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Official receipts issued & admission tickets granted"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Pending Checkout"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold tracking-tight text-foreground",
								children: statsQuery.isLoading ? "..." : (stats?.pendingCount ?? 0).toLocaleString()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Awaiting gateway confirmation or student checkout"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Total Refunded"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold tracking-tight text-foreground",
								children: statsQuery.isLoading ? "..." : formatMoney(stats?.refundedVolume ?? 0)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted-foreground flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-purple-600 dark:text-purple-400",
										children: stats?.refundedCount ?? 0
									}),
									" ",
									"refunded transactions (tickets revoked)"
								]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-4 shadow-sm space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-12 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative md:col-span-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: search,
								onChange: (e) => {
									setSearch(e.target.value);
									setPage(1);
								},
								placeholder: "Search ID, receipt #, student, event, provider...",
								className: "pl-9 text-xs"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: status,
								onChange: (e) => {
									setStatus(e.target.value);
									setPage(1);
								},
								className: "w-full h-9 rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ALL",
										children: "All Payment Statuses"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "PAID",
										children: "Paid & Settled"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "PENDING",
										children: "Pending Checkout"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "PROCESSING",
										children: "Processing"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "REFUNDED",
										children: "Refunded"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "FAILED",
										children: "Failed / Declined"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "CANCELLED",
										children: "Cancelled"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: provider,
								onChange: (e) => {
									setProvider(e.target.value);
									setPage(1);
								},
								className: "w-full h-9 rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ALL",
										children: "All Gateways"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "STRIPE",
										children: "Stripe"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "PAYHERE",
										children: "PayHere"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ONEPAY",
										children: "OnePay"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "WEBXPAY",
										children: "WebXPay"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "CLUB_TRANSFER",
										children: "Direct Club Bank Transfer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "GATEWAY_SANDBOX",
										children: "Gateway Sandbox"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: universityId,
								onChange: (e) => {
									setUniversityId(e.target.value);
									setPage(1);
								},
								className: "w-full h-9 rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ALL",
									children: "All Universities"
								}), availableUniversities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: u.id,
									children: u.name
								}, u.id))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: `${sortBy}-${sortOrder}`,
								onChange: (e) => {
									const parts = e.target.value.split("-");
									if (parts[0] && parts[1]) {
										setSortBy(parts[0]);
										setSortOrder(parts[1]);
										setPage(1);
									}
								},
								className: "w-full h-9 rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "createdAt-desc",
										children: "Newest Transaction"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "createdAt-asc",
										children: "Oldest Transaction"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "amount-desc",
										children: "Highest Amount"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "amount-asc",
										children: "Lowest Amount"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "paidAt-desc",
										children: "Recently Paid"
									})
								]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/50 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDateFilter, {
						values: dateFilter,
						onChange: (val) => {
							setDateFilter(val);
							setPage(1);
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [(search || status !== "ALL" || provider !== "ALL" || universityId !== "ALL" || currency !== "ALL" || dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: handleResetFilters,
							className: "h-8 text-xs",
							children: "Reset Filters"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								"Total Records:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground",
									children: paymentsQuery.data?.total?.toLocaleString() ?? 0
								})
							]
						})]
					})]
				})]
			}),
			paymentsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : paymentsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => paymentsQuery.refetch() }) : !paymentsQuery.data?.data || paymentsQuery.data.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No payment records found",
				description: "Try adjusting your search query, status filters, or date range.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					onClick: handleResetFilters,
					children: "Clear Filters"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border bg-muted/40 font-semibold text-muted-foreground uppercase tracking-wider text-[10px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Transaction / Receipt"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Student / Payer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Event & Organizer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Gateway"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Timestamps"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3 text-right",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: paymentsQuery.data.data.map((p) => {
								const receiptNumber = p.receipt?.receiptNumber;
								const isPaid = p.status === "PAID";
								const isRefunded = p.status === "REFUNDED";
								const isPending = p.status === "PENDING";
								const isSandbox = p.provider === "GATEWAY_SANDBOX";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-muted/30 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 align-top",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-[11px] font-semibold text-foreground",
														children: p.id.length > 14 ? `${p.id.slice(0, 10)}...` : p.id
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => handleCopy(p.id, `tx-${p.id}`),
														className: "text-muted-foreground hover:text-foreground transition-colors",
														title: "Copy Transaction ID",
														children: copiedKey === `tx-${p.id}` ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" })
													})]
												}), receiptNumber ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "inline-flex items-center gap-1 font-mono text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded font-medium",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "size-2.5" }),
															" ",
															receiptNumber
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => handleCopy(receiptNumber, `rcp-${p.id}`),
														className: "text-muted-foreground hover:text-foreground transition-colors",
														title: "Copy Receipt Number",
														children: copiedKey === `rcp-${p.id}` ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" })
													})]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-muted-foreground italic",
													children: "No receipt"
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 align-top",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-0.5 max-w-[200px]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-semibold text-foreground truncate",
														children: p.payer?.name || "Anonymous / Unregistered"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-[11px] text-muted-foreground truncate",
														children: p.payer?.email || "N/A"
													}),
													p.payer?.university?.shortName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-[10px] text-muted-foreground flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-2.5" }), p.payer.university.shortName]
													})
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 align-top",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-0.5 max-w-[220px]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-medium text-foreground truncate",
														title: p.event?.title,
														children: p.event?.title || "Unknown Event"
													}),
													p.event?.organization?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-[11px] text-muted-foreground truncate flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-2.5" }), p.event.organization.name]
													}),
													p.ticketCount !== void 0 && p.ticketCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-2.5" }),
															" ",
															p.ticketCount,
															" pass(es) issued"
														]
													})
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 align-top",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-bold text-foreground text-sm",
													children: formatMoney(p.amount, p.currency)
												}), isRefunded && p.refundedAmount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] font-semibold text-purple-600 dark:text-purple-400",
													children: ["Refunded: ", formatMoney(p.refundedAmount, p.currency)]
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 align-top",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [
													getProviderBadge(p.provider),
													(p.referenceNumber || p.providerPaymentId) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "font-mono text-[10px] text-muted-foreground truncate max-w-[120px]",
														title: p.referenceNumber || p.providerPaymentId || "",
														children: [p.provider === "CLUB_TRANSFER" ? "Ref: " : "", p.referenceNumber || p.providerPaymentId]
													}),
													p.paymentProofUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: p.paymentProofUrl,
														target: "_blank",
														rel: "noreferrer",
														className: "inline-flex items-center gap-1 text-[10px] text-primary hover:underline block",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-2.5" }), " View Proof"]
													})
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 align-top",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [
													getStatusBadge(p.status),
													p.verifiedBy?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-[10px] text-muted-foreground truncate max-w-[120px]",
														children: ["by ", p.verifiedBy.name]
													}),
													p.rejectionReason && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-[10px] text-rose-600 dark:text-rose-400 italic truncate max-w-[120px]",
														title: p.rejectionReason,
														children: p.rejectionReason
													}),
													p.refundReason && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-[10px] text-muted-foreground italic truncate max-w-[120px]",
														title: p.refundReason,
														children: p.refundReason
													})
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-3 align-top text-[11px] text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Created: ", formatShortDate(p.createdAt)] }),
												p.paidAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-emerald-600 dark:text-emerald-400 text-[10px]",
													children: ["Paid: ", formatShortDate(p.paidAt)]
												}),
												p.refundedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-purple-600 dark:text-purple-400 text-[10px]",
													children: ["Refunded: ", formatShortDate(p.refundedAt)]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 align-top text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-end gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														size: "sm",
														className: "size-8 p-0",
														title: "Inspect Transaction Details",
														onClick: () => setSelectedPaymentId(p.id),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" })
													}),
													receiptNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														size: "sm",
														className: "size-8 p-0 text-primary",
														title: "View Official Receipt",
														onClick: () => setReceiptModalPayment(p),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" })
													}),
													isPending && isSandbox && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														variant: "outline",
														size: "sm",
														className: "h-7 px-2 text-[10px] gap-1 text-amber-600 border-amber-500/30 hover:bg-amber-500/10",
														title: "Simulate Sandbox Payment",
														onClick: () => simulateMutation.mutate(p.id),
														disabled: simulateMutation.isPending,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), " Simulate"]
													}),
													isPaid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														size: "sm",
														className: "size-8 p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10",
														title: "Process Refund",
														onClick: () => {
															setRefundPaymentTarget(p);
															setRefundAmount(String(p.amount));
															setRefundReason("");
														},
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" })
													})
												]
											})
										})
									]
								}, p.id);
							})
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4 p-4 border-t border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							"Showing",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-foreground",
								children: [
									(page - 1) * pageSize + 1,
									"-",
									Math.min(page * pageSize, paymentsQuery.data.total)
								]
							}),
							" ",
							"of ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: paymentsQuery.data.total
							}),
							" payments"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: pageSize,
								onChange: (e) => {
									setPageSize(Number(e.target.value));
									setPage(1);
								},
								className: "h-8 rounded-md border border-input bg-background px-2 text-xs shadow-sm focus:outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 10,
										children: "10 per page"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 15,
										children: "15 per page"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 25,
										children: "25 per page"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 50,
										children: "50 per page"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								className: "h-8 px-2",
								onClick: () => setPage((p) => Math.max(1, p - 1)),
								disabled: page <= 1,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4 mr-1" }), " Prev"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs px-2 font-medium",
								children: [
									"Page ",
									page,
									" of ",
									paymentsQuery.data.totalPages || 1
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								className: "h-8 px-2",
								onClick: () => setPage((p) => Math.min(paymentsQuery.data.totalPages, p + 1)),
								disabled: page >= (paymentsQuery.data.totalPages || 1),
								children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 ml-1" })]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(selectedPaymentId),
				onOpenChange: (open) => {
					if (!open) setSelectedPaymentId(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "max-w-3xl max-h-[85vh] overflow-y-auto",
					children: paymentDetailQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-12 flex flex-col items-center justify-center space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-8 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Loading transaction lifecycle & verification..."
						})]
					}) : paymentDetailQuery.isError || !paymentDetailQuery.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-8 text-center space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-8 text-rose-500 mx-auto" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-foreground",
								children: "Failed to load transaction details."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => paymentDetailQuery.refetch(),
								children: "Retry"
							})
						]
					}) : (() => {
						const detail = paymentDetailQuery.data;
						const p = detail.payment;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
										className: "text-lg font-bold flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-5 text-primary" }), " Transaction Details"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
										className: "font-mono text-xs text-muted-foreground mt-0.5",
										children: ["ID: ", p.id]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [getStatusBadge(p.status), getProviderBadge(p.provider)]
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-muted/20 p-4 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
										children: "Financial Settlement Breakdown"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Gross Amount:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold text-foreground text-sm",
												children: formatMoney(p.amount, p.currency)
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Payment Provider:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground",
												children: p.provider
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: p.provider === "CLUB_TRANSFER" ? "Bank Ref:" : "Gateway Ref:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-[11px] text-foreground truncate",
												children: p.referenceNumber || p.providerPaymentId || "N/A"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Receipt Number:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-[11px] font-semibold text-primary",
												children: p.receipt?.receiptNumber || "N/A"
											})] })
										]
									})]
								}),
								p.provider === "CLUB_TRANSFER" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs space-y-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4" }), "Direct Club Bank Transfer — External Society Settlement"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] leading-relaxed text-muted-foreground",
											children: "This fee was transferred directly to the student society's verified club bank account outside CampusPulse and authorized by the club's financial officer. CampusPulse does not process, hold, or escrow these funds."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-amber-500/20 text-[11px]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground block text-[10px]",
													children: "Bank Reference:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono font-semibold text-foreground",
													children: p.referenceNumber || p.providerPaymentId || "N/A"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground block text-[10px]",
													children: "Verifying Officer:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-foreground",
													children: p.verifiedBy?.name || p.verifiedById || "Pending Verification"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground block text-[10px]",
													children: "Verification Date:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-foreground",
													children: p.verifiedAt ? formatDate(p.verifiedAt) : "—"
												})] }),
												p.paymentProofUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "col-span-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground block text-[10px]",
														children: "Deposit Proof Receipt:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: p.paymentProofUrl,
														target: "_blank",
														rel: "noreferrer",
														className: "inline-flex items-center gap-1 text-primary hover:underline font-medium text-xs mt-0.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" }), " View Submitted Transfer Slip"]
													})]
												}),
												p.rejectionReason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "col-span-2 text-rose-600 dark:text-rose-400",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-[10px] font-bold",
														children: "Rejection Reason:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.rejectionReason })]
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-card p-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "font-semibold text-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3.5 text-primary" }), " Payer / Student Identity"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1 text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: "Name:"
													}),
													" ",
													p.payer?.name || "N/A"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: "Email:"
													}),
													" ",
													p.payer?.email || "N/A"
												] }),
												p.payer?.studentId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: "Student ID:"
													}),
													" ",
													p.payer.studentId
												] }),
												p.payer?.university?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: "University:"
													}),
													" ",
													p.payer.university.name
												] }),
												p.payer?.faculty?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: "Faculty:"
													}),
													" ",
													p.payer.faculty.name
												] })
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-card p-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "font-semibold text-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5 text-primary" }), " Event & Host Organization"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1 text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: "Event:"
													}),
													" ",
													p.event?.title || "N/A"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: "Host:"
													}),
													" ",
													p.event?.organization?.name || "N/A"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: "Schedule:"
													}),
													" ",
													formatShortDate(p.event?.startDate)
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: "Venue:"
													}),
													" ",
													p.event?.venue || p.event?.location || "Campus Venue"
												] })
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-card p-4 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-emerald-500" }), " Transaction Lifecycle Trail"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-3",
										children: detail.lifecycle.map((stage, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 space-y-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-foreground",
														children: stage.label
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground font-mono",
														children: formatDate(stage.timestamp)
													})]
												}), stage.details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-muted-foreground",
													children: stage.details
												})]
											})]
										}, idx))
									})]
								}),
								p.tickets && p.tickets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-card p-4 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-3.5 text-primary" }),
											" Issued Admission Passes (",
											p.tickets.length,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
										children: p.tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border bg-muted/20 p-2.5 flex items-center justify-between text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "font-mono font-bold text-foreground flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-3 text-primary" }),
														" ",
														t.ticketNumber
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-muted-foreground",
													children: ["Attendee: ", t.user?.name || p.payer?.name || "Participant"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase", t.status === "ISSUED" ? "bg-emerald-500/10 text-emerald-600" : t.status === "REVOKED" ? "bg-rose-500/10 text-rose-600" : "bg-muted text-muted-foreground"),
												children: t.status
											})]
										}, t.id))
									})]
								}),
								detail.auditLogs && detail.auditLogs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-card p-4 space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-3.5 text-muted-foreground" }), " Administrative Audit Trail"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1.5 text-xs text-muted-foreground",
										children: detail.auditLogs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-border/40 pb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: log.action
											}), log.reason && ` — "${log.reason}"`] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono",
												children: formatDate(log.createdAt)
											})]
										}, log.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
									className: "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-2",
										children: p.receipt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => {
												setSelectedPaymentId(null);
												setReceiptModalPayment(p);
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "size-3.5 mr-1.5" }), " View Official Receipt"]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [p.status === "PAID" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "destructive",
											size: "sm",
											onClick: () => {
												setSelectedPaymentId(null);
												setRefundPaymentTarget(p);
												setRefundAmount(String(p.amount));
												setRefundReason("");
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5 mr-1.5" }), " Process Refund"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											onClick: () => setSelectedPaymentId(null),
											children: "Close"
										})]
									})]
								})
							]
						});
					})()
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(refundPaymentTarget),
				onOpenChange: (open) => {
					if (!open) {
						setRefundPaymentTarget(null);
						setRefundReason("");
						setRefundAmount("");
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "text-lg font-bold flex items-center gap-2 text-rose-600",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-5" }), " Process Transaction Refund"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							className: "text-xs text-muted-foreground",
							children: [
								"Revoke tickets and execute refund for Transaction #",
								refundPaymentTarget?.id.slice(0, 12),
								"..."
							]
						})] }),
						refundPaymentTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 flex items-start gap-2.5 text-amber-700 dark:text-amber-300",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: "Irreversible Financial Action"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] leading-relaxed",
											children: [
												"Executing a refund will immediately update the database record to",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "REFUNDED" }),
												", revoke all issued admission tickets/passes, cancel the event registration, notify the student, and record an immutable audit log."
											]
										})]
									})]
								}),
								refundPaymentTarget.provider === "CLUB_TRANSFER" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 flex items-start gap-2.5 text-blue-700 dark:text-blue-300",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: "Direct Club Bank Transfer Policy"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] leading-relaxed",
											children: "Funds were deposited directly into the club's bank account (not held by CampusPulse). Ensure the club treasurer has manually transferred the refund back to the student's bank account before recording this refund in the ledger."
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-muted/20 p-3 space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Student:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: refundPaymentTarget.payer?.name
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Event:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground truncate max-w-[200px]",
												children: refundPaymentTarget.event?.title
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Original Payment:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: formatMoney(refundPaymentTarget.amount, refundPaymentTarget.currency)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Payment Provider:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: refundPaymentTarget.provider
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs font-semibold",
										children: ["Administrative Reason for Refund ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-rose-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										value: refundReason,
										onChange: (e) => setRefundReason(e.target.value),
										placeholder: "e.g. Event date changed, student withdrew eligibility, organizer cancellation...",
										rows: 3,
										className: "text-xs"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => {
									setRefundPaymentTarget(null);
									setRefundReason("");
								},
								disabled: refundMutation.isPending,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "destructive",
								size: "sm",
								onClick: () => {
									if (!refundReason.trim()) {
										toast.error("Please enter a reason for the refund.");
										return;
									}
									refundMutation.mutate({
										id: refundPaymentTarget.id,
										payload: {
											reason: refundReason.trim(),
											amount: refundAmount ? Number(refundAmount) : void 0
										}
									});
								},
								disabled: refundMutation.isPending || !refundReason.trim(),
								children: refundMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5 mr-1.5 animate-spin" }), " Processing..."] }) : "Confirm & Revoke Tickets"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(receiptModalPayment),
				onOpenChange: (open) => {
					if (!open) setReceiptModalPayment(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "text-lg font-bold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "size-5 text-primary" }), " Official Digital Receipt"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							className: "text-xs font-mono text-muted-foreground",
							children: ["Receipt #", receiptModalPayment?.receipt?.receiptNumber || "N/A"]
						})] }),
						receiptModalPayment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4 text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-foreground text-sm",
											children: "CampusPulse Official Receipt"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground",
											children: "University Event Platform"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 font-mono text-[10px] text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded font-bold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " VERIFIED PAID"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Receipt Reference:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono font-bold text-foreground",
													children: receiptModalPayment.receipt?.receiptNumber
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Issued Date:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-foreground",
													children: formatDate(receiptModalPayment.receipt?.issuedAt || receiptModalPayment.paidAt)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Billed To:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-foreground",
													children: receiptModalPayment.payer?.name
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Student Email:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-foreground",
													children: receiptModalPayment.payer?.email
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Event Name:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-foreground truncate max-w-[200px]",
													children: receiptModalPayment.event?.title
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Payment Gateway:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-foreground",
													children: receiptModalPayment.provider
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-border pt-3 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-foreground uppercase",
											children: "Total Amount Settled:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-base font-extrabold text-foreground font-mono",
											children: formatMoney(receiptModalPayment.amount, receiptModalPayment.currency)
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => {
									window.print();
								},
								children: "Print / Save PDF"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "default",
								size: "sm",
								onClick: () => setReceiptModalPayment(null),
								children: "Done"
							})]
						})
					]
				})
			})
		]
	});
}
function AdminAnnouncements({ universities = [] }) {
	const queryClient = useQueryClient();
	const universitiesListQuery = useQuery({
		queryKey: [
			"admin",
			"universities",
			"dropdown"
		],
		queryFn: () => adminApi.getUniversities({ limit: 100 }),
		enabled: universities.length === 0
	});
	const availableUniversities = (0, import_react.useMemo)(() => {
		if (universities && universities.length > 0) return universities;
		return (universitiesListQuery.data?.data || []).map((u) => ({
			id: u.id,
			name: u.name,
			code: u.code || u.shortName || u.name
		}));
	}, [universities, universitiesListQuery.data]);
	const [search, setSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("ALL");
	const [priority, setPriority] = (0, import_react.useState)("ALL");
	const [targetAudience, setTargetAudience] = (0, import_react.useState)("ALL");
	const [universityId, setUniversityId] = (0, import_react.useState)("ALL");
	const [roleTarget, setRoleTarget] = (0, import_react.useState)("ALL");
	const [startDate, setStartDate] = (0, import_react.useState)("");
	const [endDate, setEndDate] = (0, import_react.useState)("");
	const [sortBy, setSortBy] = (0, import_react.useState)("startsAt");
	const [sortOrder, setSortOrder] = (0, import_react.useState)("desc");
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(12);
	const [createDialogOpen, setCreateDialogOpen] = (0, import_react.useState)(false);
	const [editingAnnouncement, setEditingAnnouncement] = (0, import_react.useState)(null);
	const [selectedAnnouncementId, setSelectedAnnouncementId] = (0, import_react.useState)(null);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const [archiveTarget, setArchiveTarget] = (0, import_react.useState)(null);
	const [publishTarget, setPublishTarget] = (0, import_react.useState)(null);
	const [formTitle, setFormTitle] = (0, import_react.useState)("");
	const [formMessage, setFormMessage] = (0, import_react.useState)("");
	const [formAudience, setFormAudience] = (0, import_react.useState)("ALL");
	const [formUniversityId, setFormUniversityId] = (0, import_react.useState)("");
	const [formRoleTarget, setFormRoleTarget] = (0, import_react.useState)("");
	const [formPriority, setFormPriority] = (0, import_react.useState)("NORMAL");
	const [formLinkUrl, setFormLinkUrl] = (0, import_react.useState)("");
	const [formIsActive, setFormIsActive] = (0, import_react.useState)(true);
	const [formStartsAt, setFormStartsAt] = (0, import_react.useState)("");
	const [formExpiresAt, setFormExpiresAt] = (0, import_react.useState)("");
	const [formSendEmail, setFormSendEmail] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("compose");
	const resetForm = () => {
		setFormTitle("");
		setFormMessage("");
		setFormAudience("ALL");
		setFormUniversityId("");
		setFormRoleTarget("");
		setFormPriority("NORMAL");
		setFormLinkUrl("");
		setFormIsActive(true);
		setFormStartsAt("");
		setFormExpiresAt("");
		setFormSendEmail(false);
		setActiveTab("compose");
	};
	const handleOpenCreate = () => {
		resetForm();
		setEditingAnnouncement(null);
		setCreateDialogOpen(true);
	};
	const handleOpenEdit = (ann) => {
		setEditingAnnouncement(ann);
		setFormTitle(ann.title);
		setFormMessage(ann.message);
		setFormAudience(ann.targetAudience);
		setFormUniversityId(ann.universityId || "");
		setFormRoleTarget(ann.roleTarget || "");
		setFormPriority(ann.priority);
		setFormLinkUrl(ann.linkUrl || "");
		setFormIsActive(ann.isActive);
		setFormStartsAt(ann.startsAt ? new Date(ann.startsAt).toISOString().slice(0, 16) : "");
		setFormExpiresAt(ann.expiresAt ? new Date(ann.expiresAt).toISOString().slice(0, 16) : "");
		setFormSendEmail(false);
		setActiveTab("compose");
		setCreateDialogOpen(true);
	};
	const statsQuery = useQuery({
		queryKey: [
			"admin",
			"announcements",
			"stats"
		],
		queryFn: () => adminApi.getAnnouncementStats(),
		refetchInterval: 3e4
	});
	const announcementsQuery = useQuery({
		queryKey: [
			"admin",
			"announcements",
			{
				search,
				status,
				priority: priority === "ALL" ? void 0 : priority,
				targetAudience: targetAudience === "ALL" ? void 0 : targetAudience,
				universityId: universityId === "ALL" ? void 0 : universityId,
				roleTarget: roleTarget === "ALL" ? void 0 : roleTarget,
				startDate: startDate || void 0,
				endDate: endDate || void 0,
				sortBy,
				sortOrder,
				page,
				limit: pageSize
			}
		],
		queryFn: () => adminApi.getAnnouncements({
			search: search.trim() || void 0,
			status: status === "ALL" ? void 0 : status,
			priority: priority === "ALL" ? void 0 : priority,
			targetAudience: targetAudience === "ALL" ? void 0 : targetAudience,
			universityId: universityId === "ALL" ? void 0 : universityId,
			roleTarget: roleTarget === "ALL" ? void 0 : roleTarget,
			startDate: startDate || void 0,
			endDate: endDate || void 0,
			sortBy,
			sortOrder,
			page,
			limit: pageSize
		})
	});
	const detailQuery = useQuery({
		queryKey: [
			"admin",
			"announcements",
			"detail",
			selectedAnnouncementId
		],
		queryFn: () => adminApi.getAnnouncementDetails(selectedAnnouncementId),
		enabled: !!selectedAnnouncementId
	});
	const saveMutation = useMutation({
		mutationFn: async () => {
			if (!formTitle.trim()) throw new Error("Announcement title is required.");
			if (!formMessage.trim()) throw new Error("Announcement message body is required.");
			if (formAudience === "UNIVERSITY" && !formUniversityId) throw new Error("Target University must be selected when audience is UNIVERSITY.");
			if (editingAnnouncement) return adminApi.updateAnnouncement(editingAnnouncement.id, {
				title: formTitle,
				message: formMessage,
				targetAudience: formAudience,
				universityId: formAudience === "UNIVERSITY" ? formUniversityId : null,
				roleTarget: formRoleTarget || null,
				priority: formPriority,
				linkUrl: formLinkUrl || null,
				isActive: formIsActive,
				startsAt: formStartsAt ? new Date(formStartsAt).toISOString() : void 0,
				expiresAt: formExpiresAt ? new Date(formExpiresAt).toISOString() : null
			});
			else return adminApi.createAnnouncement({
				title: formTitle,
				message: formMessage,
				targetAudience: formAudience,
				universityId: formAudience === "UNIVERSITY" ? formUniversityId : void 0,
				roleTarget: formRoleTarget || void 0,
				priority: formPriority,
				linkUrl: formLinkUrl || void 0,
				isActive: formIsActive,
				startsAt: formStartsAt ? new Date(formStartsAt).toISOString() : void 0,
				expiresAt: formExpiresAt ? new Date(formExpiresAt).toISOString() : void 0,
				sendEmailNotification: formSendEmail
			});
		},
		onSuccess: () => {
			toast.success(editingAnnouncement ? "Announcement updated successfully." : "Announcement broadcast created successfully.");
			setCreateDialogOpen(false);
			resetForm();
			queryClient.invalidateQueries({ queryKey: ["admin", "announcements"] });
		},
		onError: (err) => {
			toast.error(err.message || "Failed to save announcement.");
		}
	});
	const publishMutation = useMutation({
		mutationFn: (id) => adminApi.publishAnnouncement(id),
		onSuccess: () => {
			toast.success("Announcement published immediately.");
			setPublishTarget(null);
			queryClient.invalidateQueries({ queryKey: ["admin", "announcements"] });
		},
		onError: (err) => {
			toast.error(err.message || "Failed to publish announcement.");
		}
	});
	useMutation({
		mutationFn: (id) => adminApi.archiveAnnouncement(id),
		onSuccess: () => {
			toast.success("Announcement unshared/archived.");
			setArchiveTarget(null);
			queryClient.invalidateQueries({ queryKey: ["admin", "announcements"] });
		},
		onError: (err) => {
			toast.error(err.message || "Failed to archive announcement.");
		}
	});
	const toggleMutation = useMutation({
		mutationFn: (id) => adminApi.toggleAnnouncement(id),
		onSuccess: (updated) => {
			toast.success(updated.isActive ? "Announcement activated successfully." : "Announcement deactivated.");
			queryClient.invalidateQueries({ queryKey: ["admin", "announcements"] });
		},
		onError: (err) => {
			toast.error(err.message || "Failed to toggle announcement state.");
		}
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => adminApi.deleteAnnouncement(id),
		onSuccess: () => {
			toast.success("Announcement deleted permanently.");
			setDeleteTarget(null);
			queryClient.invalidateQueries({ queryKey: ["admin", "announcements"] });
		},
		onError: (err) => {
			toast.error(err.message || "Failed to delete announcement.");
		}
	});
	const handleResetFilters = () => {
		setSearch("");
		setStatus("ALL");
		setPriority("ALL");
		setTargetAudience("ALL");
		setUniversityId("ALL");
		setRoleTarget("ALL");
		setStartDate("");
		setEndDate("");
		setSortBy("startsAt");
		setSortOrder("desc");
		setPage(1);
	};
	const getStatusBadge = (computedStatus, isActive) => {
		switch (computedStatus) {
			case "PUBLISHED": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" }), "Published"]
			});
			case "SCHEDULED": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), "Scheduled"]
			});
			case "DRAFT": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3" }), "Draft"]
			});
			case "EXPIRED": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-zinc-500/10 text-zinc-500 border border-zinc-500/20",
				children: "Expired"
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-muted text-muted-foreground",
				children: isActive ? "Active" : "Archived"
			});
		}
	};
	const getPriorityBadge = (p) => {
		switch (p) {
			case "URGENT": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 uppercase tracking-wider",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-3 text-rose-500" }), "Urgent"]
			});
			case "HIGH": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 uppercase tracking-wider",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3 text-amber-500" }), "High"]
			});
			case "LOW": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/10 text-slate-500 uppercase tracking-wider",
				children: "Low"
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase tracking-wider",
				children: "Normal"
			});
		}
	};
	const getAudienceDisplay = (ann) => {
		switch (ann.targetAudience) {
			case "ALL": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 text-xs text-foreground font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3.5 text-blue-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "All Users (Global)" })]
			});
			case "UNIVERSITY": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 text-xs text-foreground font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5 text-purple-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate max-w-[160px]",
					title: ann.university?.name || "Target University",
					children: ann.university?.code || ann.university?.name || "University"
				})]
			});
			case "STUDENTS": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 text-xs text-foreground font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-3.5 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Students Only" })]
			});
			case "ORGANIZERS": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 text-xs text-foreground font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-3.5 text-amber-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Organizers Only" })]
			});
			case "ADMINS": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 text-xs text-foreground font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-indigo-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Admins Only" })]
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 text-xs text-foreground font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ann.targetAudience })]
			});
		}
	};
	const stats = statsQuery.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Platform Announcements & Broadcasts",
				description: "Author, schedule, target, and distribute institutional notices and platform broadcasts to students, society leaders, and university administrators.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => {
							statsQuery.refetch();
							announcementsQuery.refetch();
							toast.success("Announcements synchronized.");
						},
						disabled: announcementsQuery.isFetching,
						className: "text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5 mr-1.5", announcementsQuery.isFetching && "animate-spin") }), "Refresh"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: handleOpenCreate,
						className: "text-xs font-semibold shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5 mr-1.5" }), "New Announcement"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Total Broadcasts"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black tracking-tight text-foreground font-mono",
									children: statsQuery.isPending ? "..." : (stats?.total || 0).toLocaleString()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "All records"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-2 text-[11px] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["High priority: ", stats?.byPriority?.["HIGH"] || 0] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Urgent: ", stats?.byPriority?.["URGENT"] || 0] })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-emerald-500/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400",
									children: "Active / Published"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black tracking-tight text-emerald-600 dark:text-emerald-400 font-mono",
									children: statsQuery.isPending ? "..." : (stats?.published || 0).toLocaleString()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Currently live"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[11px] text-muted-foreground truncate",
								children: "Visible in student & organizer feeds"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-amber-500/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400",
									children: "Scheduled Queued"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black tracking-tight text-amber-600 dark:text-amber-400 font-mono",
									children: statsQuery.isPending ? "..." : (stats?.scheduled || 0).toLocaleString()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Future release"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[11px] text-muted-foreground truncate",
								children: "Automated start date triggers"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-purple-500/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400",
									children: "Drafts & Archived"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black tracking-tight text-purple-600 dark:text-purple-400 font-mono",
									children: statsQuery.isPending ? "..." : ((stats?.drafts || 0) + (stats?.expired || 0)).toLocaleString()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Unpublished"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-2 text-[11px] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Drafts: ", stats?.drafts || 0] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Expired: ", stats?.expired || 0] })
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-4 space-y-3.5 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "text",
								placeholder: "Search announcements by title, message body, or author...",
								value: search,
								onChange: (e) => {
									setSearch(e.target.value);
									setPage(1);
								},
								className: "pl-9 text-xs h-9"
							}),
							search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSearch(""),
								className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1 overflow-x-auto pb-1 md:pb-0",
						children: [
							{
								key: "ALL",
								label: "All"
							},
							{
								key: "PUBLISHED",
								label: "Published"
							},
							{
								key: "SCHEDULED",
								label: "Scheduled"
							},
							{
								key: "DRAFT",
								label: "Drafts"
							},
							{
								key: "EXPIRED",
								label: "Expired"
							}
						].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setStatus(tab.key);
								setPage(1);
							},
							className: cn("px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all", status === tab.key ? "bg-primary text-primary-foreground shadow-xs" : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"),
							children: tab.label
						}, tab.key))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-2 border-t border-border/50 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-[10px] text-muted-foreground font-semibold uppercase",
								children: "Priority"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: priority,
								onChange: (e) => {
									setPriority(e.target.value);
									setPage(1);
								},
								className: "w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ALL",
										children: "All Priorities"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "LOW",
										children: "Low"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "NORMAL",
										children: "Normal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "HIGH",
										children: "High"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "URGENT",
										children: "Urgent"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-[10px] text-muted-foreground font-semibold uppercase",
								children: "Audience"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: targetAudience,
								onChange: (e) => {
									setTargetAudience(e.target.value);
									setPage(1);
								},
								className: "w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ALL",
										children: "All Audiences"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "UNIVERSITY",
										children: "University Specific"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "STUDENTS",
										children: "Students Only"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ORGANIZERS",
										children: "Organizers Only"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ADMINS",
										children: "Admins Only"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-[10px] text-muted-foreground font-semibold uppercase",
								children: "Campus"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: universityId,
								onChange: (e) => {
									setUniversityId(e.target.value);
									setPage(1);
								},
								className: "w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ALL",
									children: "All Campuses"
								}), availableUniversities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: u.id,
									children: u.code || u.name
								}, u.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-[10px] text-muted-foreground font-semibold uppercase",
								children: "From Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: startDate,
								onChange: (e) => {
									setStartDate(e.target.value);
									setPage(1);
								},
								className: "h-8 text-xs px-2"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-[10px] text-muted-foreground font-semibold uppercase",
								children: "To Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: endDate,
								onChange: (e) => {
									setEndDate(e.target.value);
									setPage(1);
								},
								className: "h-8 text-xs px-2"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-[10px] text-muted-foreground font-semibold uppercase",
									children: "Sort"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: `${sortBy}-${sortOrder}`,
									onChange: (e) => {
										const [f = "startsAt", o = "desc"] = e.target.value.split("-");
										setSortBy(f);
										setSortOrder(o || "desc");
									},
									className: "w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "startsAt-desc",
											children: "Newest First"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "startsAt-asc",
											children: "Oldest First"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "priority-desc",
											children: "Highest Priority"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "title-asc",
											children: "Title (A-Z)"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: handleResetFilters,
								title: "Reset all filters",
								className: "h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground",
								children: "Reset"
							})]
						})
					]
				})]
			}),
			announcementsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : announcementsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => announcementsQuery.refetch() }) : !announcementsQuery.data?.data || announcementsQuery.data.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "size-6 text-muted-foreground" }),
				title: "No platform announcements found",
				description: search || status !== "ALL" || priority !== "ALL" || targetAudience !== "ALL" ? "No announcements matched your selected filters. Try clearing search or filter criteria." : "No announcements have been created yet. Click 'New Announcement' to publish your first broadcast.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: search || status !== "ALL" ? handleResetFilters : handleOpenCreate,
					children: search || status !== "ALL" ? "Reset Filters" : "Create Announcement"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-xl border border-border bg-card shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "border-b border-border bg-muted/40 font-semibold text-muted-foreground uppercase tracking-wider text-[10px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5 pl-4",
										children: "Announcement"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5",
										children: "Audience & Campus"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5",
										children: "Priority"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5",
										children: "Schedule / Expiry"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5",
										children: "Author"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5 pr-4 text-right",
										children: "Actions"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border",
								children: announcementsQuery.data.data.map((ann) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-muted/30 transition-colors group cursor-pointer",
									onClick: () => setSelectedAnnouncementId(ann.id),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3.5 pl-4 max-w-sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-bold text-sm text-foreground group-hover:text-primary transition-colors",
														children: ann.title
													}), ann.linkUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: ann.linkUrl,
														target: "_blank",
														rel: "noreferrer",
														onClick: (e) => e.stopPropagation(),
														className: "text-muted-foreground hover:text-primary transition-colors",
														title: `External Link: ${ann.linkUrl}`,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground line-clamp-1 font-normal",
													children: ann.message
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-0.5",
												children: [getAudienceDisplay(ann), ann.roleTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-block text-[10px] text-muted-foreground font-mono",
													children: ["Role: ", ann.roleTarget]
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3.5 whitespace-nowrap",
											children: getPriorityBadge(ann.priority)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3.5 whitespace-nowrap text-muted-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1 font-medium text-foreground text-[11px]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(ann.startsAt) })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] text-muted-foreground",
													children: ann.expiresAt ? `Expires: ${formatDate(ann.expiresAt)}` : "Permanent notice"
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3.5 whitespace-nowrap",
											children: getStatusBadge(ann.computedStatus, ann.isActive)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-3.5 whitespace-nowrap text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] font-medium text-foreground",
												children: ann.createdBy?.name || "Platform Admin"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-muted-foreground truncate max-w-[120px]",
												children: ann.createdBy?.email || "System"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3.5 pr-4 text-right whitespace-nowrap",
											onClick: (e) => e.stopPropagation(),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-end gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														size: "sm",
														onClick: () => setSelectedAnnouncementId(ann.id),
														className: "h-8 px-2 text-xs text-muted-foreground hover:text-foreground",
														title: "Inspect reach and audit log",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														size: "sm",
														onClick: () => handleOpenEdit(ann),
														className: "h-8 px-2 text-xs text-muted-foreground hover:text-foreground",
														title: "Edit announcement",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "size-3.5" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
														asChild: true,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															variant: "outline",
															size: "sm",
															className: "h-8 px-2 text-xs font-semibold",
															children: "Manage"
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
														align: "end",
														className: "w-48 text-xs",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
																className: "text-[10px] uppercase tracking-wider text-muted-foreground",
																children: "Broadcast Controls"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
																onClick: () => setSelectedAnnouncementId(ann.id),
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5 mr-2 text-muted-foreground" }), "View Details & Reach"]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
																onClick: () => handleOpenEdit(ann),
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "size-3.5 mr-2 text-muted-foreground" }), "Edit Content"]
															}),
															ann.computedStatus !== "PUBLISHED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
																onClick: () => setPublishTarget(ann),
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5 mr-2 text-emerald-500" }), "Publish Immediately"]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
																onClick: () => {
																	toggleMutation.mutate(ann.id);
																},
																children: ann.isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "size-3.5 mr-2 text-amber-500" }), "Deactivate / Hide"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 mr-2 text-emerald-500" }), "Activate Broadcast"] })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
																onClick: () => setDeleteTarget(ann),
																className: "text-destructive focus:text-destructive",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 mr-2" }), "Delete Announcement"]
															})
														]
													})] })
												]
											})
										})
									]
								}, ann.id))
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border bg-muted/20 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							"Showing",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: Math.min((announcementsQuery.data.page - 1) * announcementsQuery.data.limit + 1, announcementsQuery.data.total)
							}),
							" ",
							"to",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: Math.min(announcementsQuery.data.page * announcementsQuery.data.limit, announcementsQuery.data.total)
							}),
							" ",
							"of ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: announcementsQuery.data.total
							}),
							" announcements"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setPage((p) => Math.max(1, p - 1)),
									disabled: page <= 1,
									className: "h-8 text-xs",
									children: "Previous"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-medium text-foreground px-2",
									children: [
										"Page ",
										page,
										" of ",
										announcementsQuery.data.totalPages || 1
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setPage((p) => Math.min(announcementsQuery.data.totalPages, p + 1)),
									disabled: page >= announcementsQuery.data.totalPages,
									className: "h-8 text-xs",
									children: "Next"
								})
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: createDialogOpen,
				onOpenChange: setCreateDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-2xl max-h-[90vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "size-5 text-primary" }), editingAnnouncement ? "Edit Announcement Broadcast" : "New Platform Announcement"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Broadcast important notices, system updates, or emergency information to university members." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex border-b border-border text-xs mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setActiveTab("compose"),
								className: cn("pb-2.5 px-3 font-semibold transition-all border-b-2", activeTab === "compose" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
								children: "Compose & Settings"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setActiveTab("preview"),
								className: cn("pb-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5", activeTab === "preview" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" }), "Live User Preview"]
							})]
						}),
						activeTab === "compose" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								saveMutation.mutate();
							},
							className: "space-y-4 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs font-semibold",
										children: ["Announcement Title ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										placeholder: "e.g. Annual Inter-University Hackathon 2026 Registration Open",
										value: formTitle,
										onChange: (e) => setFormTitle(e.target.value),
										className: "text-xs"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs font-semibold",
										children: ["Message / Details ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										required: true,
										rows: 4,
										placeholder: "Write clear and informative details for the audience...",
										value: formMessage,
										onChange: (e) => setFormMessage(e.target.value),
										className: "text-xs font-sans leading-relaxed"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs font-semibold",
												children: "Target Audience"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: formAudience,
												onChange: (e) => setFormAudience(e.target.value),
												className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus:ring-1 focus:ring-primary",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "ALL",
														children: "All Platform Users (Global)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "UNIVERSITY",
														children: "Specific University Campus"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "STUDENTS",
														children: "Undergraduates & Students Only"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "ORGANIZERS",
														children: "Society Leaders & Organizers Only"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "ADMINS",
														children: "Campus Administrators Only"
													})
												]
											})]
										}),
										formAudience === "UNIVERSITY" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												className: "text-xs font-semibold",
												children: ["Target Campus ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												required: true,
												value: formUniversityId,
												onChange: (e) => setFormUniversityId(e.target.value),
												className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus:ring-1 focus:ring-primary",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													children: "Select University..."
												}), availableUniversities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
													value: u.id,
													children: [
														u.name,
														" (",
														u.code,
														")"
													]
												}, u.id))]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs font-semibold",
												children: "Priority Level"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: formPriority,
												onChange: (e) => setFormPriority(e.target.value),
												className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus:ring-1 focus:ring-primary",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "LOW",
														children: "Low (General FYI)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "NORMAL",
														children: "Normal (Standard broadcast)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "HIGH",
														children: "High (Important campus notice)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "URGENT",
														children: "Urgent (Immediate attention)"
													})
												]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "Call to Action / Link URL (Optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "url",
										placeholder: "https://campuspulse.lk/events/hackathon-2026 or https://uoc.lk/notice",
										value: formLinkUrl,
										onChange: (e) => setFormLinkUrl(e.target.value),
										className: "text-xs font-mono"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs font-semibold",
												children: "Publication / Start Time (Optional)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "datetime-local",
												value: formStartsAt,
												onChange: (e) => setFormStartsAt(e.target.value),
												className: "text-xs"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground",
												children: "Leave blank to publish immediately upon saving."
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs font-semibold",
												children: "Expiration Time (Optional)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "datetime-local",
												value: formExpiresAt,
												onChange: (e) => setFormExpiresAt(e.target.value),
												className: "text-xs"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground",
												children: "Announcement will automatically hide after this date."
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 pt-2 border-t border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: "Active Status"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground",
											children: "Enable to make this announcement active and discoverable."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: formIsActive,
											onCheckedChange: setFormIsActive
										})]
									}), !editingAnnouncement && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 font-semibold text-primary",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Send Email Notification Dispatch" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground",
												children: "Queues reliable email broadcast via Brevo to registered users in target scope."
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: formSendEmail,
											onCheckedChange: setFormSendEmail
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
									className: "pt-3 border-t border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => setCreateDialogOpen(false),
										disabled: saveMutation.isPending,
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										disabled: saveMutation.isPending,
										className: "font-semibold",
										children: saveMutation.isPending ? "Saving..." : editingAnnouncement ? "Save Changes" : "Create Announcement"
									})]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-3 rounded-lg bg-muted/40 border border-border text-xs text-muted-foreground",
									children: "This preview reflects how the announcement banner card appears in the Student Workspace and Organizer Workspace dashboards."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("p-4 rounded-xl border shadow-sm transition-all space-y-3", formPriority === "URGENT" ? "bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100" : formPriority === "HIGH" ? "bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100" : "bg-card border-border text-card-foreground"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [getPriorityBadge(formPriority), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider",
														children: ["Audience: ", formAudience]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "font-bold text-base text-foreground mt-1",
													children: formTitle || "Announcement Title Preview"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "size-5 text-primary shrink-0 opacity-80" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs leading-relaxed whitespace-pre-wrap text-foreground/90",
											children: formMessage || "Your formatted announcement message body will be rendered here for users."
										}),
										formLinkUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pt-2 border-t border-border/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: formLinkUrl,
												target: "_blank",
												rel: "noreferrer",
												className: "inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Learn More / Open Resource" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Broadcast by University Administration" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Starts: ", formStartsAt ? formatDate(formStartsAt) : "Immediately upon publish"] })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end pt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										onClick: () => setActiveTab("compose"),
										variant: "outline",
										size: "sm",
										children: "Back to Compose"
									})
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!selectedAnnouncementId,
				onOpenChange: () => setSelectedAnnouncementId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-2xl max-h-[85vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-5 text-primary" }), "Announcement Details & Estimated Reach"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Inspect configuration parameters, targeted student audience reach, and immutable administrative audit history." })] }), detailQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : detailQuery.isError || !detailQuery.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => detailQuery.refetch() }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-card p-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-start justify-between gap-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 mb-1",
											children: [getPriorityBadge(detailQuery.data.announcement.priority), getStatusBadge(detailQuery.data.announcement.computedStatus, detailQuery.data.announcement.isActive)]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-bold text-lg text-foreground",
											children: detailQuery.data.announcement.title
										})] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-foreground/90 whitespace-pre-wrap leading-relaxed",
										children: detailQuery.data.announcement.message
									}),
									detailQuery.data.announcement.linkUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-2 border-t border-border",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: detailQuery.data.announcement.linkUrl,
											target: "_blank",
											rel: "noreferrer",
											className: "inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: detailQuery.data.announcement.linkUrl })]
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border bg-muted/20 p-3 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground uppercase font-semibold",
											children: "Target Scope"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-foreground",
											children: detailQuery.data.announcement.targetAudience
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border bg-muted/20 p-3 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground uppercase font-semibold",
											children: "Estimated Reach"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-bold text-primary font-mono text-sm",
											children: [detailQuery.data.estimatedReach.toLocaleString(), " Users"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border bg-muted/20 p-3 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground uppercase font-semibold",
											children: "Publication Start"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium text-foreground text-[11px]",
											children: formatDate(detailQuery.data.announcement.startsAt)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border bg-muted/20 p-3 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground uppercase font-semibold",
											children: "Expiration Date"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium text-foreground text-[11px]",
											children: detailQuery.data.announcement.expiresAt ? formatDate(detailQuery.data.announcement.expiresAt) : "Permanent"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: "Author:"
									}),
									" ",
									detailQuery.data.announcement.createdBy?.name || "System",
									" (",
									detailQuery.data.announcement.createdBy?.email || "Platform",
									")"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px]",
									children: ["Created: ", formatDate(detailQuery.data.announcement.createdAt)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 pt-2 border-t border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 font-bold text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Administrative Audit Log Trail" })]
								}), detailQuery.data.auditLogs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "No specific audit trail records found for this announcement."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg border border-border overflow-hidden bg-card",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full text-left text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
											className: "bg-muted/40 text-[10px] uppercase text-muted-foreground font-semibold border-b border-border",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-2.5 pl-3",
													children: "Timestamp"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-2.5",
													children: "Action"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-2.5",
													children: "Administrator"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-2.5 pr-3",
													children: "Reason / Details"
												})
											] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
											className: "divide-y divide-border",
											children: detailQuery.data.auditLogs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "hover:bg-muted/30",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2.5 pl-3 text-muted-foreground font-mono text-[11px]",
														children: formatDate(log.timestamp)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2.5 font-semibold text-primary text-[11px]",
														children: log.action
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2.5 text-foreground font-medium",
														children: log.user?.name || "Platform Admin"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2.5 pr-3 text-muted-foreground truncate max-w-xs",
														children: log.reason || (log.details ? JSON.stringify(log.details) : "—")
													})
												]
											}, log.id))
										})]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-3 border-t border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => setSelectedAnnouncementId(null),
									children: "Close"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => {
										const ann = detailQuery.data.announcement;
										setSelectedAnnouncementId(null);
										handleOpenEdit(ann);
									},
									className: "font-semibold",
									children: "Edit Announcement"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!publishTarget,
				onOpenChange: () => setPublishTarget(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-5 text-emerald-500" }), "Publish Announcement Immediately"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					"Are you sure you want to publish \"",
					publishTarget?.title,
					"\" right now? It will instantly appear in student and organizer feeds."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setPublishTarget(null),
					disabled: publishMutation.isPending,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						if (publishTarget) publishMutation.mutate(publishTarget.id);
					},
					disabled: publishMutation.isPending,
					className: "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold",
					children: publishMutation.isPending ? "Publishing..." : "Confirm & Publish"
				})] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!deleteTarget,
				onOpenChange: () => setDeleteTarget(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "flex items-center gap-2 text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5" }), "Delete Announcement"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					"Are you sure you want to permanently delete \"",
					deleteTarget?.title,
					"\"? This action cannot be undone and will be recorded in the security audit trail."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setDeleteTarget(null),
					disabled: deleteMutation.isPending,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "destructive",
					onClick: () => {
						if (deleteTarget) deleteMutation.mutate(deleteTarget.id);
					},
					disabled: deleteMutation.isPending,
					className: "font-semibold",
					children: deleteMutation.isPending ? "Deleting..." : "Permanently Delete"
				})] })] })
			})
		]
	});
}
function AdminDataTable({ moduleKey, title, description, icon, columns, data = [], totalRecords = 0, loading = false, error, onRefresh, search = "", onSearchChange, searchPlaceholder = "Search records...", filterSlots, hasActiveFilters = false, onResetFilters, dateFilter, onDateFilterChange, showDateFilter = true, page = 1, pageSize = 25, onPageChange, onPageSizeChange, sortBy, sortOrder, onSortChange, extraActions, currentFilterQuery = {} }) {
	const [isExportingCsv, setIsExportingCsv] = (0, import_react.useState)(false);
	const [isExportingPdf, setIsExportingPdf] = (0, import_react.useState)(false);
	const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
	const startRecord = totalRecords > 0 ? (page - 1) * pageSize + 1 : 0;
	const endRecord = Math.min(page * pageSize, totalRecords);
	const isDateFiltered = Boolean(dateFilter?.startDate || dateFilter?.endDate || dateFilter?.year || dateFilter?.month || dateFilter?.preset && dateFilter.preset !== "ALL");
	const effectiveHasActiveFilters = hasActiveFilters || isDateFiltered;
	const handleExport = async (format) => {
		if (totalRecords === 0) {
			toast.info(`No records match the active filters to export.`);
			return;
		}
		if (format === "csv") setIsExportingCsv(true);
		else setIsExportingPdf(true);
		try {
			const exportParams = {
				...currentFilterQuery,
				search: search || void 0,
				sortBy,
				sortOrder
			};
			if (dateFilter) {
				if (dateFilter.startDate) exportParams.startDate = dateFilter.startDate;
				if (dateFilter.endDate) exportParams.endDate = dateFilter.endDate;
				if (dateFilter.year) exportParams.year = dateFilter.year;
				if (dateFilter.month) exportParams.month = dateFilter.month;
				if (dateFilter.preset && dateFilter.preset !== "ALL") exportParams.datePreset = dateFilter.preset;
			}
			toast.info(`Generating ${format.toUpperCase()} export...`, { description: `Exporting all ${totalRecords.toLocaleString()} matching records.` });
			const filename = await adminApi.exportData(moduleKey, format, exportParams);
			toast.success(`Export ready!`, { description: `Downloaded ${filename}` });
		} catch (err) {
			toast.error(`Export failed`, { description: err?.message || `Failed to generate ${format.toUpperCase()} report.` });
		} finally {
			if (format === "csv") setIsExportingCsv(false);
			else setIsExportingPdf(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm mt-0.5",
						children: icon
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-bold tracking-tight text-foreground",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground border border-border",
							children: loading ? "..." : `${totalRecords.toLocaleString()} total`
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5 max-w-2xl",
						children: description
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						extraActions,
						onRefresh && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: onRefresh,
							disabled: loading,
							title: "Refresh dataset",
							className: "h-8 text-xs font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5 mr-1.5", loading && "animate-spin text-primary") }), "Refresh"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => handleExport("csv"),
							disabled: isExportingCsv || loading,
							title: "Export filtered records to CSV",
							className: "h-8 text-xs font-medium text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
							children: [isExportingCsv ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 mr-1.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-3.5 mr-1.5 text-emerald-600 dark:text-emerald-400" }), "CSV"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => handleExport("pdf"),
							disabled: isExportingPdf || loading,
							title: "Export branded report to PDF",
							className: "h-8 text-xs font-medium text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40 hover:bg-amber-50 dark:hover:bg-amber-950/30",
							children: [isExportingPdf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 mr-1.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5 mr-1.5 text-amber-600 dark:text-amber-400" }), "PDF"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-3 shadow-xs space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2.5",
					children: [
						onSearchChange && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1 min-w-[220px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "text",
									placeholder: searchPlaceholder,
									value: search,
									onChange: (e) => onSearchChange(e.target.value),
									className: "h-8 pl-8 text-xs bg-background"
								}),
								search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onSearchChange(""),
									className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs",
									children: "✕"
								})
							]
						}),
						filterSlots,
						effectiveHasActiveFilters && onResetFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: onResetFilters,
							className: "h-8 text-xs text-muted-foreground hover:text-foreground hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3 mr-1" }), "Reset Filters"]
						})
					]
				}), showDateFilter !== false && onDateFilterChange && dateFilter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-2.5 border-t border-border/50 flex flex-wrap items-center justify-between gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDateFilter, {
						values: dateFilter,
						onChange: onDateFilterChange
					}), isDateFiltered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[11px] text-muted-foreground flex items-center gap-1 font-medium bg-primary/5 px-2.5 py-0.5 rounded-full border border-primary/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Active Period:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-primary font-semibold",
							children: [
								dateFilter.year && `Year ${dateFilter.year}`,
								dateFilter.month && ` • Month ${dateFilter.month}`,
								dateFilter.startDate && dateFilter.endDate && ` (${dateFilter.startDate} → ${dateFilter.endDate})`,
								!dateFilter.year && !dateFilter.month && !dateFilter.startDate && dateFilter.preset && `Preset: ${dateFilter.preset}`
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl border border-border bg-card shadow-xs",
				children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-8 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-2 text-sm text-muted-foreground pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Loading records..." })]
					}), [
						1,
						2,
						3,
						4,
						5
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-full animate-pulse rounded bg-muted/60" }, i))]
				}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-12 text-center space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-8 text-destructive mx-auto" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-foreground",
							children: "Failed to load records"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground max-w-sm mx-auto",
							children: error?.message || "An error occurred while fetching data from the database."
						}),
						onRefresh && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: onRefresh,
							className: "text-xs mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5 mr-1.5" }), " Retry"]
						})
					]
				}) : data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-12 text-center space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "size-8 text-muted-foreground/60 mx-auto" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-foreground",
							children: "No records found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: hasActiveFilters ? "No items match your active search and filter criteria. Try adjusting or clearing filters." : "No records exist in this module yet."
						}),
						hasActiveFilters && onResetFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: onResetFilters,
							className: "text-xs mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5 mr-1.5" }), " Clear Filters"]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border bg-muted/40 font-semibold text-muted-foreground uppercase tracking-wider text-[10px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: cn("p-3 select-none", col.sortable && "cursor-pointer hover:bg-muted/70 transition-colors", col.className),
								onClick: () => col.sortable && onSortChange && onSortChange(col.key),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: col.header }), col.sortable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground/60",
										children: sortBy === col.key ? sortOrder === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-3 text-primary font-bold" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-3 text-primary font-bold" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "size-3" })
									})]
								})
							}, col.key)) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: data.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "hover:bg-muted/30 transition-colors",
								children: columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn("p-3 align-middle", col.className),
									children: col.render ? col.render(item) : item[col.key] ?? "—"
								}, col.key))
							}, item.id ? String(item.id) : index))
						})]
					})
				}), !loading && !error && data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border px-4 py-3 bg-card text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						"Showing ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: startRecord
						}),
						" to",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: endRecord
						}),
						" of",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: totalRecords.toLocaleString()
						}),
						" entries"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [onPageSizeChange && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px]",
								children: "Rows per page:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: pageSize,
								onChange: (e) => onPageSizeChange(Number(e.target.value)),
								className: "h-7 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 10,
										children: "10"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 25,
										children: "25"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 50,
										children: "50"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 100,
										children: "100"
									})
								]
							})]
						}), onPageChange && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] mr-2",
									children: [
										"Page ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: page
										}),
										" of",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: totalPages
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "icon",
									className: "size-7",
									disabled: page <= 1,
									onClick: () => onPageChange(1),
									title: "First page",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeft, { className: "size-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "icon",
									className: "size-7",
									disabled: page <= 1,
									onClick: () => onPageChange(page - 1),
									title: "Previous page",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "icon",
									className: "size-7",
									disabled: page >= totalPages,
									onClick: () => onPageChange(page + 1),
									title: "Next page",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "icon",
									className: "size-7",
									disabled: page >= totalPages,
									onClick: () => onPageChange(totalPages),
									title: "Last page",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsRight, { className: "size-3.5" })
								})
							]
						})]
					})]
				})]
			})
		]
	});
}
function AdminUsersTable({ universities = [], onInspectUser, onSuspendUser, onChangeRole }) {
	const queryClient = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("");
	const [universityId, setUniversityId] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [isVerified, setIsVerified] = (0, import_react.useState)("");
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(25);
	const [sortBy, setSortBy] = (0, import_react.useState)("createdAt");
	const [sortOrder, setSortOrder] = (0, import_react.useState)("desc");
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		}, 350);
		return () => clearTimeout(handler);
	}, [search]);
	const handleFilterChange = (setter, value) => {
		setter(value);
		setPage(1);
	};
	const handleResetFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		setRole("");
		setUniversityId("");
		setStatus("");
		setIsVerified("");
		setDateFilter({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
		setPage(1);
	};
	const isDateActive = Boolean(dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL");
	const hasActiveFilters = Boolean(debouncedSearch || role || universityId || status || isVerified || isDateActive);
	const queryParams = {
		search: debouncedSearch || void 0,
		role: role || void 0,
		universityId: universityId || void 0,
		isActive: status === "ACTIVE" ? true : status === "SUSPENDED" ? false : void 0,
		isVerified: isVerified === "YES" ? true : isVerified === "NO" ? false : void 0,
		startDate: dateFilter.startDate || void 0,
		endDate: dateFilter.endDate || void 0,
		year: dateFilter.year || void 0,
		month: dateFilter.month || void 0,
		datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
		sortBy,
		sortOrder,
		page,
		limit: pageSize
	};
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: [
			"admin",
			"users-table",
			queryParams
		],
		queryFn: () => adminApi.getUsers(queryParams)
	});
	const handleSortChange = (field) => {
		if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		else {
			setSortBy(field);
			setSortOrder("desc");
		}
		setPage(1);
	};
	const handleManualVerify = async (id, name) => {
		try {
			await adminApi.verifyUserIdentity(id, "Admin table identity verification");
			toast.success(`Verified student identity for ${name}! 🎓`);
			refetch();
			queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
		} catch (err) {
			toast.error(err?.message || "Failed to verify student identity");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDataTable, {
		moduleKey: "users",
		title: "All Users Directory",
		description: "Search, inspect, and manage university platform user accounts, institutional affiliations, verification flags, and permissions.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5" }),
		columns: [
			{
				key: "name",
				header: "User / Identity",
				sortable: true,
				render: (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary font-bold text-xs uppercase border border-primary/20",
						children: u.name?.charAt(0) || "U"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground truncate",
									children: u.name
								}), u.universityEmailVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									title: "University Email Verified",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-blue-500 shrink-0" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground truncate",
								children: u.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] font-mono text-muted-foreground/70 truncate",
								children: [
									"ID: ",
									u.id?.slice(0, 8),
									"..."
								]
							})
						]
					})]
				})
			},
			{
				key: "university",
				header: "University & Faculty",
				render: (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 font-medium text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-3 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: u.university?.name || "General / Unaffiliated"
					})]
				}), u.studentProfile?.faculty?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-muted-foreground truncate",
					children: [
						"Faculty of ",
						u.studentProfile.faculty.name,
						u.studentProfile.department?.name ? ` • ${u.studentProfile.department.name}` : ""
					]
				})] })
			},
			{
				key: "role",
				header: "System Role",
				render: (u) => {
					const roles = u.roles || [];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1",
						children: roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center rounded-md bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary",
							children: r
						}, r))
					});
				}
			},
			{
				key: "universityEmailVerified",
				header: "Verification",
				render: (u) => u.universityEmailVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 text-[11px] font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3 text-blue-500" }), " Verified"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3 text-amber-500" }), " Unverified"]
				})
			},
			{
				key: "isActive",
				header: "Account Status",
				render: (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", u.isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"),
					children: u.isActive ? "Active" : "Suspended"
				})
			},
			{
				key: "createdAt",
				header: "Joined Date",
				sortable: true,
				render: (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground whitespace-nowrap",
					children: formatDate(u.createdAt)
				})
			},
			{
				key: "actions",
				header: "Actions",
				className: "text-right",
				render: (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "size-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-3.5 text-muted-foreground" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					className: "text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "User Options" }),
						onInspectUser && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: () => onInspectUser(u.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5 mr-2 text-primary" }), " Inspect 360° Profile"]
						}),
						!u.universityEmailVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: () => handleManualVerify(u.id, u.name),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-3.5 mr-2 text-emerald-600" }), " Verify Student Badge"]
						}),
						onChangeRole && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: () => onChangeRole({
								id: u.id,
								name: u.name,
								currentRole: u.roles?.[0] || "STUDENT"
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5 mr-2 text-indigo-600" }), " Change Role"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						onSuspendUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							className: u.isActive ? "text-destructive" : "text-emerald-600",
							onClick: () => onSuspendUser({
								id: u.id,
								name: u.name,
								currentStatus: u.isActive
							}),
							children: u.isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, { className: "size-3.5 mr-2" }), " Suspend Account"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 mr-2" }), " Restore Account"] })
						})
					]
				})] })
			}
		],
		data: data?.data || [],
		totalRecords: data?.total || 0,
		loading: isLoading,
		error,
		onRefresh: () => refetch(),
		search,
		onSearchChange: setSearch,
		searchPlaceholder: "Search users by name, email, or user ID...",
		hasActiveFilters,
		onResetFilters: handleResetFilters,
		dateFilter,
		onDateFilterChange: (df) => handleFilterChange(setDateFilter, df),
		page,
		pageSize,
		onPageChange: setPage,
		onPageSizeChange: (size) => {
			setPageSize(size);
			setPage(1);
		},
		sortBy,
		sortOrder,
		onSortChange: handleSortChange,
		currentFilterQuery: queryParams,
		filterSlots: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: role,
				onChange: (e) => handleFilterChange(setRole, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All Roles"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "STUDENT",
						children: "Student"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "ORGANIZER",
						children: "Organizer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "ADMIN",
						children: "Administrator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "SUPER_ADMIN",
						children: "Super Administrator"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: universityId,
				onChange: (e) => handleFilterChange(setUniversityId, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary max-w-[180px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Universities"
				}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: u.id,
					children: u.name
				}, u.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: status,
				onChange: (e) => handleFilterChange(setStatus, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All Account Statuses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "ACTIVE",
						children: "Active Only"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "SUSPENDED",
						children: "Suspended Only"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: isVerified,
				onChange: (e) => handleFilterChange(setIsVerified, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All Verifications"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "YES",
						children: "Verified Only"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "NO",
						children: "Unverified Only"
					})
				]
			})
		] })
	});
}
function AdminStudentsTable({ universities = [], onInspectUser, onSuspendUser }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [universityId, setUniversityId] = (0, import_react.useState)("");
	const [isVerified, setIsVerified] = (0, import_react.useState)("");
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(25);
	const [sortBy, setSortBy] = (0, import_react.useState)("createdAt");
	const [sortOrder, setSortOrder] = (0, import_react.useState)("desc");
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		}, 350);
		return () => clearTimeout(handler);
	}, [search]);
	const handleFilterChange = (setter, value) => {
		setter(value);
		setPage(1);
	};
	const handleResetFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		setUniversityId("");
		setIsVerified("");
		setDateFilter({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
		setPage(1);
	};
	const isDateActive = Boolean(dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL");
	const hasActiveFilters = Boolean(debouncedSearch || universityId || isVerified || isDateActive);
	const queryParams = {
		search: debouncedSearch || void 0,
		universityId: universityId || void 0,
		isVerified: isVerified === "YES" ? true : isVerified === "NO" ? false : void 0,
		startDate: dateFilter.startDate || void 0,
		endDate: dateFilter.endDate || void 0,
		year: dateFilter.year || void 0,
		month: dateFilter.month || void 0,
		datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
		sortBy,
		sortOrder,
		page,
		limit: pageSize
	};
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: [
			"admin",
			"students-table",
			queryParams
		],
		queryFn: () => adminApi.getStudents(queryParams)
	});
	const handleSortChange = (field) => {
		if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		else {
			setSortBy(field);
			setSortOrder("desc");
		}
		setPage(1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDataTable, {
		moduleKey: "students",
		title: "Student Directory & Roster",
		description: "Inspect verified student profiles, institutional domain validations, degree years, faculties, and engagement metrics.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-5" }),
		columns: [
			{
				key: "name",
				header: "Student Identity",
				sortable: true,
				render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-8 shrink-0 place-items-center rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase border border-indigo-200 dark:border-indigo-800/40",
						children: s.name?.charAt(0) || "S"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground truncate",
									children: s.name
								}), s.universityEmailVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									title: "University Verified",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-blue-500 shrink-0" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground truncate",
								children: s.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] font-mono text-muted-foreground/70 truncate",
								children: [
									"ID: ",
									s.id?.slice(0, 8),
									"..."
								]
							})
						]
					})]
				})
			},
			{
				key: "university",
				header: "University & Campus",
				render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 font-medium text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-3 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: s.university?.name || "General / Unspecified"
					})]
				})
			},
			{
				key: "faculty",
				header: "Faculty & Department",
				render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: s.faculty?.name ? `Faculty of ${s.faculty.name}` : "Not declared"
					})]
				}), s.department?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted-foreground truncate",
					children: s.department.name
				})] })
			},
			{
				key: "academicYear",
				header: "Batch / Year",
				render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-foreground font-medium",
					children: s.batchYear ? `Batch of ${s.batchYear}` : s.academicYear ? `Year ${s.academicYear}` : "—"
				})
			},
			{
				key: "universityEmailVerified",
				header: "Verification",
				render: (s) => s.universityEmailVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 text-[11px] font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3 text-blue-500" }), " Verified"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3 text-amber-500" }), " Unverified"]
				})
			},
			{
				key: "stats",
				header: "Activity Stats",
				render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[11px] text-muted-foreground flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [s.stats?.eventRegistrations || 0, " events"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [s.stats?.organizationMembers || 0, " clubs"] })
					]
				})
			},
			{
				key: "createdAt",
				header: "Joined Date",
				sortable: true,
				render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground whitespace-nowrap",
					children: formatDate(s.createdAt)
				})
			},
			{
				key: "actions",
				header: "Actions",
				className: "text-right",
				render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "size-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-3.5 text-muted-foreground" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					className: "text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Student Actions" }),
						onInspectUser && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: () => onInspectUser(s.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5 mr-2 text-primary" }), " View Student Dossier"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						onSuspendUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							className: s.isActive ? "text-destructive" : "text-emerald-600",
							onClick: () => onSuspendUser({
								id: s.id,
								name: s.name,
								currentStatus: s.isActive
							}),
							children: s.isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, { className: "size-3.5 mr-2" }), " Suspend Student"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 mr-2" }), " Restore Student"] })
						})
					]
				})] })
			}
		],
		data: data?.data || [],
		totalRecords: data?.total || 0,
		loading: isLoading,
		error,
		onRefresh: () => refetch(),
		search,
		onSearchChange: setSearch,
		searchPlaceholder: "Search students by name, email, or registration number...",
		hasActiveFilters,
		onResetFilters: handleResetFilters,
		dateFilter,
		onDateFilterChange: (df) => handleFilterChange(setDateFilter, df),
		page,
		pageSize,
		onPageChange: setPage,
		onPageSizeChange: (size) => {
			setPageSize(size);
			setPage(1);
		},
		sortBy,
		sortOrder,
		onSortChange: handleSortChange,
		currentFilterQuery: queryParams,
		filterSlots: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: universityId,
			onChange: (e) => handleFilterChange(setUniversityId, e.target.value),
			className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary max-w-[180px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: "All Universities"
			}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: u.id,
				children: u.name
			}, u.id))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: isVerified,
			onChange: (e) => handleFilterChange(setIsVerified, e.target.value),
			className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Verifications"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "YES",
					children: "Verified Only"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "NO",
					children: "Unverified Only"
				})
			]
		})] })
	});
}
function AdminOrganizersTable({ universities = [], onInspectUser, onViewOrganization }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [universityId, setUniversityId] = (0, import_react.useState)("");
	const [committeeRole, setCommitteeRole] = (0, import_react.useState)("");
	const [isVerified, setIsVerified] = (0, import_react.useState)("");
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(25);
	const [sortBy, setSortBy] = (0, import_react.useState)("createdAt");
	const [sortOrder, setSortOrder] = (0, import_react.useState)("desc");
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		}, 350);
		return () => clearTimeout(handler);
	}, [search]);
	const handleFilterChange = (setter, value) => {
		setter(value);
		setPage(1);
	};
	const handleResetFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		setUniversityId("");
		setCommitteeRole("");
		setIsVerified("");
		setDateFilter({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
		setPage(1);
	};
	const isDateActive = Boolean(dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL");
	const hasActiveFilters = Boolean(debouncedSearch || universityId || committeeRole || isVerified || isDateActive);
	const queryParams = {
		search: debouncedSearch || void 0,
		universityId: universityId || void 0,
		committeeRole: committeeRole || void 0,
		isVerified: isVerified === "YES" ? true : isVerified === "NO" ? false : void 0,
		startDate: dateFilter.startDate || void 0,
		endDate: dateFilter.endDate || void 0,
		year: dateFilter.year || void 0,
		month: dateFilter.month || void 0,
		datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
		sortBy,
		sortOrder,
		page,
		limit: pageSize
	};
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: [
			"admin",
			"organizers-table",
			queryParams
		],
		queryFn: () => adminApi.getOrganizers(queryParams)
	});
	const handleSortChange = (field) => {
		if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		else {
			setSortBy(field);
			setSortOrder("desc");
		}
		setPage(1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDataTable, {
		moduleKey: "organizers",
		title: "Organizers & Society Leaders",
		description: "Governance oversight for student societies, executive committee members, club presidents, and verified event hosts.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" }),
		columns: [
			{
				key: "name",
				header: "Organizer Identity",
				sortable: true,
				render: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-8 shrink-0 place-items-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs uppercase border border-emerald-200 dark:border-emerald-800/40",
						children: o.name?.charAt(0) || "O"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground truncate",
									children: o.name
								}), o.organizerVerificationStatus === "APPROVED" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									title: "Accredited Organizer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-500 shrink-0" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground truncate",
								children: o.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] font-mono text-muted-foreground/70 truncate",
								children: [
									"ID: ",
									o.id?.slice(0, 8),
									"..."
								]
							})
						]
					})]
				})
			},
			{
				key: "university",
				header: "University",
				render: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 font-medium text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-3 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: o.university?.name || "General / Independent"
					})]
				})
			},
			{
				key: "organization",
				header: "Society / Organization",
				render: (o) => {
					const primary = o.primaryOrganization;
					const totalOrgs = o.organizationMemberships?.length || 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 text-foreground font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: primary?.name || "No Society Affiliation"
						})]
					}), totalOrgs > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] text-muted-foreground",
						children: [
							"+ ",
							totalOrgs - 1,
							" other ",
							totalOrgs - 1 === 1 ? "membership" : "memberships"
						]
					})] });
				}
			},
			{
				key: "committeeRole",
				header: "Committee Role",
				render: (o) => {
					const role = o.primaryOrganization?.role || "ORGANIZER";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: role });
				}
			},
			{
				key: "organizerVerificationStatus",
				header: "Accreditation",
				render: (o) => {
					const status = o.organizerVerificationStatus || "PENDING";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status });
				}
			},
			{
				key: "stats",
				header: "Events Created",
				render: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs font-semibold text-foreground",
					children: [o.stats?.eventsCreated || 0, " events"]
				})
			},
			{
				key: "createdAt",
				header: "Joined Date",
				sortable: true,
				render: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground whitespace-nowrap",
					children: formatDate(o.createdAt)
				})
			},
			{
				key: "actions",
				header: "Actions",
				className: "text-right",
				render: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "size-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-3.5 text-muted-foreground" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					className: "text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Organizer Actions" }),
						onInspectUser && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: () => onInspectUser(o.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5 mr-2 text-primary" }), " Inspect Profile"]
						}),
						onViewOrganization && o.primaryOrganization?.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: () => onViewOrganization(o.primaryOrganization.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5 mr-2 text-indigo-600" }), " View Society Roster"]
						})
					]
				})] })
			}
		],
		data: data?.data || [],
		totalRecords: data?.total || 0,
		loading: isLoading,
		error,
		onRefresh: () => refetch(),
		search,
		onSearchChange: setSearch,
		searchPlaceholder: "Search organizers by name, email, or society...",
		hasActiveFilters,
		onResetFilters: handleResetFilters,
		dateFilter,
		onDateFilterChange: (df) => handleFilterChange(setDateFilter, df),
		page,
		pageSize,
		onPageChange: setPage,
		onPageSizeChange: (size) => {
			setPageSize(size);
			setPage(1);
		},
		sortBy,
		sortOrder,
		onSortChange: handleSortChange,
		currentFilterQuery: queryParams,
		filterSlots: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: universityId,
				onChange: (e) => handleFilterChange(setUniversityId, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary max-w-[180px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Universities"
				}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: u.id,
					children: u.name
				}, u.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: committeeRole,
				onChange: (e) => handleFilterChange(setCommitteeRole, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All Committee Roles"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "PRESIDENT",
						children: "President"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "LEADER",
						children: "Leader / Captain"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "SECRETARY",
						children: "Secretary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "TREASURER",
						children: "Treasurer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "EVENT_ORGANIZER",
						children: "Event Organizer"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: isVerified,
				onChange: (e) => handleFilterChange(setIsVerified, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All Verification States"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "YES",
						children: "Verified Only"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "NO",
						children: "Pending / Unverified"
					})
				]
			})
		] })
	});
}
function AdminAdministratorsTable({ universities = [], onCreateAdmin, onRemoveAdmin }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("");
	const [universityId, setUniversityId] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(25);
	const [sortBy, setSortBy] = (0, import_react.useState)("createdAt");
	const [sortOrder, setSortOrder] = (0, import_react.useState)("desc");
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		}, 350);
		return () => clearTimeout(handler);
	}, [search]);
	const handleFilterChange = (setter, value) => {
		setter(value);
		setPage(1);
	};
	const handleResetFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		setRole("");
		setUniversityId("");
		setStatus("");
		setDateFilter({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
		setPage(1);
	};
	const isDateActive = Boolean(dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL");
	const hasActiveFilters = Boolean(debouncedSearch || role || universityId || status || isDateActive);
	const queryParams = {
		search: debouncedSearch || void 0,
		role: role || void 0,
		universityId: universityId || void 0,
		status: status || void 0,
		isActive: status === "ACTIVE" ? true : status === "SUSPENDED" ? false : void 0,
		startDate: dateFilter.startDate || void 0,
		endDate: dateFilter.endDate || void 0,
		year: dateFilter.year || void 0,
		month: dateFilter.month || void 0,
		datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0
	};
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: [
			"admin",
			"administrators-table",
			queryParams
		],
		queryFn: () => adminApi.getAdministrators(queryParams)
	});
	const filteredList = (Array.isArray(data) ? data : []).filter((admin) => {
		if (status === "ACTIVE" && !admin.isActive) return false;
		if (status === "SUSPENDED" && admin.isActive) return false;
		if (!isDateActive) return true;
		const created = admin.createdAt ? new Date(admin.createdAt).getTime() : 0;
		if (dateFilter.startDate && created < new Date(dateFilter.startDate).getTime()) return false;
		if (dateFilter.endDate && created > (/* @__PURE__ */ new Date(dateFilter.endDate + "T23:59:59.999Z")).getTime()) return false;
		if (dateFilter.year) {
			const yr = new Date(admin.createdAt).getUTCFullYear();
			if (String(yr) !== String(dateFilter.year)) return false;
		}
		if (dateFilter.month) {
			if (String(new Date(admin.createdAt).getUTCMonth() + 1).padStart(2, "0") !== String(dateFilter.month).padStart(2, "0")) return false;
		}
		return true;
	});
	const totalRecords = filteredList.length;
	const paginatedList = [...filteredList].sort((a, b) => {
		if (sortBy === "name") return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
		const dateA = new Date(a.createdAt || 0).getTime();
		const dateB = new Date(b.createdAt || 0).getTime();
		return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
	}).slice((page - 1) * pageSize, page * pageSize);
	const handleSortChange = (field) => {
		if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		else {
			setSortBy(field);
			setSortOrder("desc");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDataTable, {
		moduleKey: "administrators",
		title: "Platform Administrators",
		description: "Manage enterprise governance credentials, super administrator permissions, and university-scoped moderators.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-5" }),
		columns: [
			{
				key: "name",
				header: "Administrator",
				sortable: true,
				render: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-8 shrink-0 place-items-center rounded-full bg-navy text-primary font-bold text-xs uppercase border border-border",
						children: a.name?.charAt(0) || "A"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground truncate block",
								children: a.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground truncate",
								children: a.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] font-mono text-muted-foreground/70 truncate",
								children: [
									"ID: ",
									a.id?.slice(0, 8),
									"..."
								]
							})
						]
					})]
				})
			},
			{
				key: "role",
				header: "System Role",
				render: (a) => {
					const roles = a.roles || [];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1",
						children: roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center rounded-md bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary",
							children: r
						}, r))
					});
				}
			},
			{
				key: "university",
				header: "University Scope",
				render: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 font-medium text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-3 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: a.university?.name || "Global Platform Scope"
					})]
				})
			},
			{
				key: "isActive",
				header: "Status",
				render: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", a.isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"),
					children: a.isActive ? "Active" : "Suspended"
				})
			},
			{
				key: "createdAt",
				header: "Created Date",
				sortable: true,
				render: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground whitespace-nowrap",
					children: formatDate(a.createdAt)
				})
			},
			{
				key: "actions",
				header: "Actions",
				className: "text-right",
				render: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "size-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-3.5 text-muted-foreground" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					className: "text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Admin Controls" }), onRemoveAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						className: "text-destructive focus:text-destructive",
						onClick: () => onRemoveAdmin({
							id: a.id,
							name: a.name
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 mr-2" }), " Revoke Admin Access"]
					})]
				})] })
			}
		],
		data: paginatedList,
		totalRecords,
		loading: isLoading,
		error,
		onRefresh: () => refetch(),
		search,
		onSearchChange: setSearch,
		searchPlaceholder: "Search administrators by name, email, or ID...",
		hasActiveFilters,
		onResetFilters: handleResetFilters,
		dateFilter,
		onDateFilterChange: (df) => handleFilterChange(setDateFilter, df),
		page,
		pageSize,
		onPageChange: setPage,
		onPageSizeChange: (size) => {
			setPageSize(size);
			setPage(1);
		},
		sortBy,
		sortOrder,
		onSortChange: handleSortChange,
		currentFilterQuery: queryParams,
		extraActions: onCreateAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			onClick: onCreateAdmin,
			className: "h-8 text-xs font-semibold gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Add Administrator"]
		}),
		filterSlots: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: role,
				onChange: (e) => handleFilterChange(setRole, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All Admin Roles"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "SUPER_ADMIN",
						children: "Super Administrator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "ADMIN",
						children: "Platform Administrator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "UNIVERSITY_ADMIN",
						children: "University Administrator"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: status,
				onChange: (e) => handleFilterChange(setStatus, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All Statuses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "ACTIVE",
						children: "Active Only"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "SUSPENDED",
						children: "Disabled / Suspended"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: universityId,
				onChange: (e) => handleFilterChange(setUniversityId, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary max-w-[180px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Scopes"
				}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: u.id,
					children: u.name
				}, u.id))]
			})
		] })
	});
}
function AdminEventsTable({ universities = [], categories = [], onCancelEvent }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [universityId, setUniversityId] = (0, import_react.useState)("");
	const [categoryId, setCategoryId] = (0, import_react.useState)("");
	const [isFree, setIsFree] = (0, import_react.useState)("");
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(25);
	const [sortBy, setSortBy] = (0, import_react.useState)("createdAt");
	const [sortOrder, setSortOrder] = (0, import_react.useState)("desc");
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		}, 350);
		return () => clearTimeout(handler);
	}, [search]);
	const handleFilterChange = (setter, value) => {
		setter(value);
		setPage(1);
	};
	const handleResetFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		setStatus("");
		setUniversityId("");
		setCategoryId("");
		setIsFree("");
		setDateFilter({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
		setPage(1);
	};
	const isDateActive = Boolean(dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL");
	const hasActiveFilters = Boolean(debouncedSearch || status || universityId || categoryId || isFree || isDateActive);
	const queryParams = {
		search: debouncedSearch || void 0,
		status: status || void 0,
		universityId: universityId || void 0,
		categoryId: categoryId || void 0,
		isFree: isFree === "FREE" ? true : isFree === "PAID" ? false : void 0,
		startDate: dateFilter.startDate || void 0,
		endDate: dateFilter.endDate || void 0,
		year: dateFilter.year || void 0,
		month: dateFilter.month || void 0,
		datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
		sortBy,
		sortOrder,
		page,
		limit: pageSize
	};
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: [
			"admin",
			"events-table",
			queryParams
		],
		queryFn: () => adminApi.getEvents(queryParams)
	});
	const handleSortChange = (field) => {
		if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		else {
			setSortBy(field);
			setSortOrder("desc");
		}
		setPage(1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDataTable, {
		moduleKey: "events",
		title: "Events & Opportunities Catalog",
		description: "Authoritative catalog of campus events, hackathons, academic conferences, workshops, and society orientations.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-5" }),
		columns: [
			{
				key: "title",
				header: "Event Opportunity",
				sortable: true,
				render: (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary font-bold text-xs uppercase border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground truncate block",
								children: e.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-muted-foreground truncate",
								children: [e.organization?.name ? `${e.organization.name} • ` : "", e.university?.name || "All Campus"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] font-mono text-muted-foreground/70 truncate",
								children: [
									"ID: ",
									e.id?.slice(0, 8),
									"..."
								]
							})
						]
					})]
				})
			},
			{
				key: "category",
				header: "Category & Type",
				render: (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 text-xs font-medium text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "size-3 text-muted-foreground shrink-0" }), e.category?.name || "General"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-0.5",
					children: e.type || "EVENT"
				})] })
			},
			{
				key: "startDate",
				header: "Schedule",
				sortable: true,
				render: (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-foreground whitespace-nowrap",
						children: formatDate(e.startDate)
					}), e.endDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] text-muted-foreground whitespace-nowrap",
						children: ["to ", formatDate(e.endDate)]
					})]
				})
			},
			{
				key: "status",
				header: "Publication Status",
				render: (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: e.status || "PUBLISHED" })
			},
			{
				key: "isFree",
				header: "Admission",
				render: (e) => e.isFree ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40",
					children: "Free"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex rounded bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 text-[11px] font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40",
					children: [
						"Paid (",
						e.currency || "LKR",
						" ",
						e.ticketPrice || e.price || 0,
						")"
					]
				})
			},
			{
				key: "registrations",
				header: "Admissions",
				render: (e) => {
					const count = e._count?.registrations ?? e.registrationCount ?? 0;
					const capacity = e.capacity || e.maxCapacity;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs font-semibold text-foreground",
						children: [
							count,
							" ",
							capacity ? `/ ${capacity}` : "registered"
						]
					});
				}
			},
			{
				key: "createdAt",
				header: "Created",
				sortable: true,
				render: (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground whitespace-nowrap",
					children: formatDate(e.createdAt)
				})
			},
			{
				key: "actions",
				header: "Actions",
				className: "text-right",
				render: (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "size-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-3.5 text-muted-foreground" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					className: "text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Event Governance" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `/events/${e.slug || e.id}`,
								target: "_blank",
								rel: "noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5 mr-2 text-primary" }), " Open Public Listing"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						onCancelEvent && e.status !== "CANCELLED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							className: "text-destructive focus:text-destructive",
							onClick: () => onCancelEvent({
								id: e.id,
								title: e.title
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "size-3.5 mr-2" }), " Cancel Event"]
						})
					]
				})] })
			}
		],
		data: data?.data || [],
		totalRecords: data?.total || 0,
		loading: isLoading,
		error,
		onRefresh: () => refetch(),
		search,
		onSearchChange: setSearch,
		searchPlaceholder: "Search events by title, organizer, organization, or ID...",
		hasActiveFilters,
		onResetFilters: handleResetFilters,
		dateFilter,
		onDateFilterChange: (df) => handleFilterChange(setDateFilter, df),
		page,
		pageSize,
		onPageChange: setPage,
		onPageSizeChange: (size) => {
			setPageSize(size);
			setPage(1);
		},
		sortBy,
		sortOrder,
		onSortChange: handleSortChange,
		currentFilterQuery: queryParams,
		filterSlots: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: status,
				onChange: (e) => handleFilterChange(setStatus, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All Statuses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "PUBLISHED",
						children: "Published"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "DRAFT",
						children: "Draft"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "CANCELLED",
						children: "Cancelled"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "COMPLETED",
						children: "Completed"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: categoryId,
				onChange: (e) => handleFilterChange(setCategoryId, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary max-w-[150px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Categories"
				}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: c.id,
					children: c.name
				}, c.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: universityId,
				onChange: (e) => handleFilterChange(setUniversityId, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary max-w-[170px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Universities"
				}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: u.id,
					children: u.name
				}, u.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: isFree,
				onChange: (e) => handleFilterChange(setIsFree, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Free & Paid"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "FREE",
						children: "Free Admission"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "PAID",
						children: "Ticketed / Paid"
					})
				]
			})
		] })
	});
}
function AdminTeamsTable() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(25);
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		}, 350);
		return () => clearTimeout(handler);
	}, [search]);
	const handleFilterChange = (setter, value) => {
		setter(value);
		setPage(1);
	};
	const handleResetFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		setStatus("");
		setDateFilter({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
		setPage(1);
	};
	const isDateActive = Boolean(dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL");
	const hasActiveFilters = Boolean(debouncedSearch || status || isDateActive);
	const queryParams = {
		search: debouncedSearch || void 0,
		status: status || void 0,
		startDate: dateFilter.startDate || void 0,
		endDate: dateFilter.endDate || void 0,
		year: dateFilter.year || void 0,
		month: dateFilter.month || void 0,
		datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
		page,
		limit: pageSize
	};
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: [
			"admin",
			"teams-table",
			queryParams
		],
		queryFn: () => adminApi.getTeams(queryParams)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDataTable, {
		moduleKey: "teams",
		title: "Teaming Board & Squad Formations",
		description: "Monitor hackathon teams, project squads, vacancy rosters, and student collaboration join requests.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5" }),
		columns: [
			{
				key: "name",
				header: "Team / Squad",
				sortable: true,
				render: (t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-8 shrink-0 place-items-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 font-bold text-xs uppercase border border-indigo-200 dark:border-indigo-800/40",
						children: t.name?.charAt(0) || "T"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground truncate block",
							children: t.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] font-mono text-muted-foreground/70 truncate",
							children: [
								"ID: ",
								t.id?.slice(0, 8),
								"..."
							]
						})]
					})]
				})
			},
			{
				key: "event",
				header: "Associated Competition / Event",
				render: (t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 font-medium text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-3 text-amber-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: t.event?.title || "Independent Project / General"
					})]
				}), t.event?.startDate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-muted-foreground",
					children: formatDate(t.event.startDate)
				})] })
			},
			{
				key: "leader",
				header: "Team Captain / Leader",
				render: (t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground block",
					children: t.leader?.name || "Unassigned"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground",
					children: t.leader?.email
				})] })
			},
			{
				key: "members",
				header: "Roster / Slots",
				render: (t) => {
					const count = t.members?.length ?? t._count?.members ?? 0;
					const max = t.maxMembers || t.maxCapacity || 5;
					const isFull = count >= max;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-semibold text-foreground",
							children: [
								count,
								" / ",
								max
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `rounded px-1.5 py-0.5 text-[10px] font-semibold ${isFull ? "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300" : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"}`,
							children: isFull ? "Full" : "Open"
						})]
					});
				}
			},
			{
				key: "requests",
				header: "Join Requests",
				render: (t) => {
					const reqCount = t._count?.joinRequests ?? 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-semibold text-foreground",
						children: [
							reqCount,
							" ",
							reqCount === 1 ? "request" : "requests"
						]
					});
				}
			},
			{
				key: "status",
				header: "Status",
				render: (t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: t.status || "OPEN" })
			},
			{
				key: "createdAt",
				header: "Created Date",
				sortable: true,
				render: (t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground whitespace-nowrap",
					children: formatDate(t.createdAt)
				})
			}
		],
		data: data?.data || [],
		totalRecords: data?.total || 0,
		loading: isLoading,
		error,
		onRefresh: () => refetch(),
		search,
		onSearchChange: setSearch,
		searchPlaceholder: "Search teams by name, leader, or opportunity...",
		hasActiveFilters,
		onResetFilters: handleResetFilters,
		dateFilter,
		onDateFilterChange: (df) => handleFilterChange(setDateFilter, df),
		page,
		pageSize,
		onPageChange: setPage,
		onPageSizeChange: (size) => {
			setPageSize(size);
			setPage(1);
		},
		currentFilterQuery: queryParams,
		filterSlots: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: status,
			onChange: (e) => handleFilterChange(setStatus, e.target.value),
			className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Team Statuses"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "OPEN",
					children: "Open for Members"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "FORMED",
					children: "Formed / Complete"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "LOCKED",
					children: "Locked"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "DISBANDED",
					children: "Disbanded"
				})
			]
		})
	});
}
function AdminVolunteeringTable({ universities = [] }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [universityId, setUniversityId] = (0, import_react.useState)("");
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(25);
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		}, 350);
		return () => clearTimeout(handler);
	}, [search]);
	const handleFilterChange = (setter, value) => {
		setter(value);
		setPage(1);
	};
	const handleResetFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		setStatus("");
		setUniversityId("");
		setDateFilter({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
		setPage(1);
	};
	const isDateActive = Boolean(dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL");
	const hasActiveFilters = Boolean(debouncedSearch || status || universityId || isDateActive);
	const queryParams = {
		search: debouncedSearch || void 0,
		status: status || void 0,
		universityId: universityId || void 0,
		startDate: dateFilter.startDate || void 0,
		endDate: dateFilter.endDate || void 0,
		year: dateFilter.year || void 0,
		month: dateFilter.month || void 0,
		datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
		page,
		limit: pageSize
	};
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: [
			"admin",
			"volunteering-table",
			queryParams
		],
		queryFn: () => adminApi.getVolunteering(queryParams)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDataTable, {
		moduleKey: "volunteering",
		title: "Volunteering Hub & Community Engagement",
		description: "Track university volunteer recruitment, event coordination shifts, applicant vetting, and service hours.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-5" }),
		columns: [
			{
				key: "title",
				header: "Volunteering Opportunity / Role",
				sortable: true,
				render: (v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-8 shrink-0 place-items-center rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 font-bold text-xs uppercase border border-rose-200 dark:border-rose-800/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground truncate block",
							children: v.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] font-mono text-muted-foreground/70 truncate",
							children: [
								"ID: ",
								v.id?.slice(0, 8),
								"..."
							]
						})]
					})]
				})
			},
			{
				key: "event",
				header: "Associated Event / Host",
				render: (v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 font-medium text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: v.event?.title || "Community Engagement Initiative"
					})]
				}), v.event?.organization?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted-foreground",
					children: v.event.organization.name
				})] })
			},
			{
				key: "slots",
				header: "Volunteers Needed",
				render: (v) => {
					const required = v.spots || v.requiredSlots || v.maxVolunteers || 10;
					const accepted = v.acceptedCount || v._count?.volunteers || 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: accepted
							}),
							" / ",
							required,
							" filled"
						]
					});
				}
			},
			{
				key: "applications",
				header: "Applications",
				render: (v) => {
					const count = v.applicationCount ?? v._count?.applications ?? 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-semibold text-foreground",
						children: [count, " applied"]
					});
				}
			},
			{
				key: "status",
				header: "Status",
				render: (v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: v.status || "OPEN" })
			},
			{
				key: "createdAt",
				header: "Created Date",
				sortable: true,
				render: (v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground whitespace-nowrap",
					children: formatDate(v.createdAt)
				})
			}
		],
		data: data?.data || [],
		totalRecords: data?.total || 0,
		loading: isLoading,
		error,
		onRefresh: () => refetch(),
		search,
		onSearchChange: setSearch,
		searchPlaceholder: "Search volunteering opportunities by role or host...",
		hasActiveFilters,
		onResetFilters: handleResetFilters,
		dateFilter,
		onDateFilterChange: (df) => handleFilterChange(setDateFilter, df),
		page,
		pageSize,
		onPageChange: setPage,
		onPageSizeChange: (size) => {
			setPageSize(size);
			setPage(1);
		},
		currentFilterQuery: queryParams,
		filterSlots: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: status,
			onChange: (e) => handleFilterChange(setStatus, e.target.value),
			className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Opportunity Statuses"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "OPEN",
					children: "Open for Applications"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "FILLED",
					children: "Filled / Completed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "CLOSED",
					children: "Closed"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: universityId,
			onChange: (e) => handleFilterChange(setUniversityId, e.target.value),
			className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary max-w-[180px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: "All Universities"
			}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: u.id,
				children: u.name
			}, u.id))]
		})] })
	});
}
function AdminReportsTable({ onResolveReport }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [targetType, setTargetType] = (0, import_react.useState)("");
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(25);
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		}, 350);
		return () => clearTimeout(handler);
	}, [search]);
	const handleFilterChange = (setter, value) => {
		setter(value);
		setPage(1);
	};
	const handleResetFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		setStatus("");
		setTargetType("");
		setDateFilter({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
		setPage(1);
	};
	const isDateActive = Boolean(dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL");
	const hasActiveFilters = Boolean(debouncedSearch || status || targetType || isDateActive);
	const queryParams = {
		search: debouncedSearch || void 0,
		status: status || void 0,
		targetType: targetType || void 0,
		startDate: dateFilter.startDate || void 0,
		endDate: dateFilter.endDate || void 0,
		year: dateFilter.year || void 0,
		month: dateFilter.month || void 0,
		datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
		page,
		limit: pageSize
	};
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: [
			"admin",
			"reports-table",
			queryParams
		],
		queryFn: () => adminApi.getReports(queryParams)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDataTable, {
		moduleKey: "reports",
		title: "Content Moderation & Safety Reports",
		description: "Review user-submitted infringement reports, inappropriate content flags, community safety alerts, and enforcement history.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-5" }),
		columns: [
			{
				key: "id",
				header: "Report ID & Target",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-8 shrink-0 place-items-center rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 font-bold text-xs uppercase border border-rose-200 dark:border-rose-800/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold text-foreground truncate block",
							children: [
								r.targetType,
								": ",
								r.targetEntity?.name || r.targetId || "Target Object"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] font-mono text-muted-foreground/70 truncate",
							children: [
								"ID: ",
								r.id?.slice(0, 8),
								"..."
							]
						})]
					})]
				})
			},
			{
				key: "targetType",
				header: "Content Type",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.targetType || "CONTENT" })
			},
			{
				key: "reason",
				header: "Reason & Specifics",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground block text-xs",
						children: r.reason
					}), r.details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground truncate line-clamp-1",
						children: r.details
					})]
				})
			},
			{
				key: "reporter",
				header: "Reporter",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground block text-xs",
					children: r.reporter?.name || "Campus Community Member"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-muted-foreground",
					children: r.reporter?.email || "Anonymous flag"
				})] })
			},
			{
				key: "status",
				header: "Review Status",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status || "PENDING" })
			},
			{
				key: "createdAt",
				header: "Reported Date",
				sortable: true,
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground whitespace-nowrap",
					children: formatDate(r.createdAt)
				})
			},
			{
				key: "actions",
				header: "Actions",
				className: "text-right",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "size-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-3.5 text-muted-foreground" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					className: "text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Moderation Actions" }),
						onResolveReport && r.status !== "RESOLVED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							className: "text-emerald-600 focus:text-emerald-600",
							onClick: () => onResolveReport({
								id: r.id,
								reason: r.reason,
								status: "RESOLVED"
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 mr-2" }), " Resolve & Enforce Action"]
						}),
						onResolveReport && r.status !== "DISMISSED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							className: "text-muted-foreground focus:text-foreground",
							onClick: () => onResolveReport({
								id: r.id,
								reason: r.reason,
								status: "DISMISSED"
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3.5 mr-2" }), " Dismiss Report"]
						})
					]
				})] })
			}
		],
		data: data?.data || [],
		totalRecords: data?.total || 0,
		loading: isLoading,
		error,
		onRefresh: () => refetch(),
		search,
		onSearchChange: setSearch,
		searchPlaceholder: "Search moderation reports by keyword or reference...",
		hasActiveFilters,
		onResetFilters: handleResetFilters,
		dateFilter,
		onDateFilterChange: (df) => handleFilterChange(setDateFilter, df),
		page,
		pageSize,
		onPageChange: setPage,
		onPageSizeChange: (size) => {
			setPageSize(size);
			setPage(1);
		},
		currentFilterQuery: queryParams,
		filterSlots: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: status,
			onChange: (e) => handleFilterChange(setStatus, e.target.value),
			className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Review Statuses"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "PENDING",
					children: "Pending Review"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "UNDER_REVIEW",
					children: "Under Review"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "RESOLVED",
					children: "Resolved / Action Taken"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "DISMISSED",
					children: "Dismissed / Inapplicable"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: targetType,
			onChange: (e) => handleFilterChange(setTargetType, e.target.value),
			className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Target Types"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "EVENT",
					children: "Event Opportunities"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "ORGANIZATION",
					children: "Societies & Clubs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "USER",
					children: "User Accounts"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "TEAM",
					children: "Teams & Projects"
				})
			]
		})] })
	});
}
function AdminCategoriesTable({ onCreateCategory }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("");
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(25);
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		}, 350);
		return () => clearTimeout(handler);
	}, [search]);
	const handleFilterChange = (setter, value) => {
		setter(value);
		setPage(1);
	};
	const handleResetFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		setType("");
		setDateFilter({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
		setPage(1);
	};
	const isDateActive = Boolean(dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL");
	const hasActiveFilters = Boolean(debouncedSearch || type || isDateActive);
	const queryParams = {
		search: debouncedSearch || void 0,
		type: type || void 0,
		startDate: dateFilter.startDate || void 0,
		endDate: dateFilter.endDate || void 0,
		year: dateFilter.year || void 0,
		month: dateFilter.month || void 0,
		datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0
	};
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: [
			"admin",
			"categories-table",
			queryParams
		],
		queryFn: () => adminApi.getCategories(queryParams)
	});
	const filteredList = (Array.isArray(data) ? data : []).filter((c) => {
		if (!isDateActive) return true;
		const created = c.createdAt ? new Date(c.createdAt).getTime() : 0;
		if (dateFilter.startDate && created < new Date(dateFilter.startDate).getTime()) return false;
		if (dateFilter.endDate && created > (/* @__PURE__ */ new Date(dateFilter.endDate + "T23:59:59.999Z")).getTime()) return false;
		if (dateFilter.year) {
			const yr = new Date(c.createdAt).getUTCFullYear();
			if (String(yr) !== String(dateFilter.year)) return false;
		}
		if (dateFilter.month) {
			if (String(new Date(c.createdAt).getUTCMonth() + 1).padStart(2, "0") !== String(dateFilter.month).padStart(2, "0")) return false;
		}
		return true;
	});
	const totalRecords = filteredList.length;
	const paginatedList = filteredList.slice((page - 1) * pageSize, page * pageSize);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDataTable, {
		moduleKey: "categories",
		title: "Opportunity Categories & Taxonomy",
		description: "Manage the official platform tags, academic disciplines, event categories, and competition classifications.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "size-5" }),
		columns: [
			{
				key: "name",
				header: "Category Name & Slug",
				sortable: true,
				render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-8 shrink-0 place-items-center rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 font-bold text-xs uppercase border border-amber-200 dark:border-amber-800/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground truncate block",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] font-mono text-muted-foreground/70 truncate",
							children: ["slug: ", c.slug || c.name?.toLowerCase().replace(/\s+/g, "-")]
						})]
					})]
				})
			},
			{
				key: "type",
				header: "Opportunity Domain",
				render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.type || "EVENT" })
			},
			{
				key: "description",
				header: "Description",
				render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground line-clamp-1 max-w-sm",
					children: c.description || "Platform taxonomy classification"
				})
			},
			{
				key: "eventsCount",
				header: "Associated Opportunities",
				render: (c) => {
					const count = c._count?.events ?? c.eventCount ?? 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-semibold text-foreground",
						children: [
							count,
							" ",
							count === 1 ? "opportunity" : "opportunities"
						]
					});
				}
			},
			{
				key: "isActive",
				header: "Active Status",
				render: (c) => c.isActive === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex rounded bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 text-[11px] font-semibold text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40",
					children: "Disabled"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40",
					children: "Active"
				})
			},
			{
				key: "createdAt",
				header: "Created Date",
				sortable: true,
				render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground whitespace-nowrap",
					children: formatDate(c.createdAt)
				})
			}
		],
		data: paginatedList,
		totalRecords,
		loading: isLoading,
		error,
		onRefresh: () => refetch(),
		search,
		onSearchChange: setSearch,
		searchPlaceholder: "Search categories by name or slug...",
		hasActiveFilters,
		onResetFilters: handleResetFilters,
		dateFilter,
		onDateFilterChange: (df) => handleFilterChange(setDateFilter, df),
		page,
		pageSize,
		onPageChange: setPage,
		onPageSizeChange: (size) => {
			setPageSize(size);
			setPage(1);
		},
		currentFilterQuery: queryParams,
		extraActions: onCreateCategory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			onClick: onCreateCategory,
			className: "h-8 text-xs font-semibold gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Add Category"]
		}),
		filterSlots: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: type,
			onChange: (e) => handleFilterChange(setType, e.target.value),
			className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Category Domains"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "ACADEMIC",
					children: "Academic & Conferences"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "HACKATHON",
					children: "Hackathons & Coding"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "CULTURAL",
					children: "Cultural & Arts"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "SPORTS",
					children: "Sports & Athletics"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "WORKSHOP",
					children: "Workshops & Bootcamps"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "OTHER",
					children: "Other Categories"
				})
			]
		})
	});
}
function AdminRegistrationsTable({ universities = [], onCancelRegistration }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [paymentStatus, setPaymentStatus] = (0, import_react.useState)("");
	const [universityId, setUniversityId] = (0, import_react.useState)("");
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(25);
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		}, 350);
		return () => clearTimeout(handler);
	}, [search]);
	const handleFilterChange = (setter, value) => {
		setter(value);
		setPage(1);
	};
	const handleResetFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		setStatus("");
		setPaymentStatus("");
		setUniversityId("");
		setDateFilter({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
		setPage(1);
	};
	const isDateActive = Boolean(dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL");
	const hasActiveFilters = Boolean(debouncedSearch || status || paymentStatus || universityId || isDateActive);
	const queryParams = {
		search: debouncedSearch || void 0,
		status: status || void 0,
		paymentStatus: paymentStatus || void 0,
		universityId: universityId || void 0,
		startDate: dateFilter.startDate || void 0,
		endDate: dateFilter.endDate || void 0,
		year: dateFilter.year || void 0,
		month: dateFilter.month || void 0,
		datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
		page,
		limit: pageSize
	};
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: [
			"admin",
			"registrations-table",
			queryParams
		],
		queryFn: () => adminApi.getRegistrations(queryParams)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDataTable, {
		moduleKey: "registrations",
		title: "Event Registrations & Admissions",
		description: "Track student registration records, ticket issuance statuses, admission passes, and booking lifecycles.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5" }),
		columns: [
			{
				key: "id",
				header: "Registration & Student",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-8 shrink-0 place-items-center rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 font-bold text-xs uppercase border border-blue-200 dark:border-blue-800/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground truncate block",
								children: r.user?.name || "Student Attendee"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground truncate",
								children: r.user?.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] font-mono text-muted-foreground/70 truncate",
								children: [
									"ID: ",
									r.id?.slice(0, 8),
									"..."
								]
							})
						]
					})]
				})
			},
			{
				key: "event",
				header: "Opportunity / Event",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 font-medium text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: r.event?.title || "Event Booking"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted-foreground truncate",
					children: r.event?.university?.name || "Campus Community"
				})] })
			},
			{
				key: "tier",
				header: "Ticket Tier",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold text-foreground",
					children: r.tier?.name || r.ticketTier || "General Admission"
				})
			},
			{
				key: "status",
				header: "Registration Status",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status || "CONFIRMED" })
			},
			{
				key: "paymentStatus",
				header: "Payment Status",
				render: (r) => {
					const payStatus = r.payment?.status || r.paymentStatus || "FREE";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: payStatus });
				}
			},
			{
				key: "ticket",
				header: "Ticket Pass",
				render: (r) => r.ticket ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-3 text-emerald-500" }), " Issued"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center gap-1 rounded bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40",
					children: "Pending"
				})
			},
			{
				key: "registeredAt",
				header: "Registered Date",
				sortable: true,
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground whitespace-nowrap",
					children: formatDate(r.registeredAt || r.createdAt)
				})
			},
			{
				key: "actions",
				header: "Actions",
				className: "text-right",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "size-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-3.5 text-muted-foreground" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					className: "text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Registration Options" }), onCancelRegistration && r.status !== "CANCELLED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						className: "text-destructive focus:text-destructive",
						onClick: () => onCancelRegistration({
							id: r.id,
							userName: r.user?.name || "Attendee",
							eventTitle: r.event?.title || "Event"
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "size-3.5 mr-2" }), " Cancel Registration"]
					})]
				})] })
			}
		],
		data: data?.data || [],
		totalRecords: data?.total || 0,
		loading: isLoading,
		error,
		onRefresh: () => refetch(),
		search,
		onSearchChange: setSearch,
		searchPlaceholder: "Search registrations by student, email, event, or ID...",
		hasActiveFilters,
		onResetFilters: handleResetFilters,
		dateFilter,
		onDateFilterChange: (df) => handleFilterChange(setDateFilter, df),
		page,
		pageSize,
		onPageChange: setPage,
		onPageSizeChange: (size) => {
			setPageSize(size);
			setPage(1);
		},
		currentFilterQuery: queryParams,
		filterSlots: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: status,
				onChange: (e) => handleFilterChange(setStatus, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All Registration Statuses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "CONFIRMED",
						children: "Confirmed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "PENDING",
						children: "Pending"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "WAITLISTED",
						children: "Waitlisted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "CANCELLED",
						children: "Cancelled"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: paymentStatus,
				onChange: (e) => handleFilterChange(setPaymentStatus, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All Payment Statuses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "PAID",
						children: "Paid Only"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "PENDING",
						children: "Pending Payment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "FREE",
						children: "Free Event"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: universityId,
				onChange: (e) => handleFilterChange(setUniversityId, e.target.value),
				className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary max-w-[180px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Universities"
				}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: u.id,
					children: u.name
				}, u.id))]
			})
		] })
	});
}
function AdminTicketsTable() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(25);
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		}, 350);
		return () => clearTimeout(handler);
	}, [search]);
	const handleFilterChange = (setter, value) => {
		setter(value);
		setPage(1);
	};
	const handleResetFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		setStatus("");
		setDateFilter({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
		setPage(1);
	};
	const isDateActive = Boolean(dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL");
	const hasActiveFilters = Boolean(debouncedSearch || status || isDateActive);
	const queryParams = {
		search: debouncedSearch || void 0,
		status: status || void 0,
		startDate: dateFilter.startDate || void 0,
		endDate: dateFilter.endDate || void 0,
		year: dateFilter.year || void 0,
		month: dateFilter.month || void 0,
		datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
		page,
		limit: pageSize
	};
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: [
			"admin",
			"tickets-table",
			queryParams
		],
		queryFn: () => adminApi.getTickets(queryParams)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDataTable, {
		moduleKey: "tickets",
		title: "Tickets & Admission Passes",
		description: "Inspect cryptographic admission passes, check-in statuses, ticket tiers, and authorized gate verification credentials.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-5" }),
		columns: [
			{
				key: "ticketNumber",
				header: "Ticket Pass & Code",
				sortable: true,
				render: (t) => {
					const rawCode = t.ticketNumber || t.id || "TK-0000";
					const masked = rawCode.length > 12 ? `${rawCode.slice(0, 4)}••••${rawCode.slice(-4)}` : rawCode;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-8 shrink-0 place-items-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 font-bold text-xs border border-indigo-200 dark:border-indigo-800/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono font-bold text-foreground text-xs",
								children: masked
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] text-muted-foreground font-mono truncate",
								children: [
									"Ref: ",
									t.id?.slice(0, 8),
									"..."
								]
							})]
						})]
					});
				}
			},
			{
				key: "attendee",
				header: "Attendee Name",
				render: (t) => {
					const attendee = t.user || t.registration?.user;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-foreground block text-xs",
						children: attendee?.name || "Student Attendee"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-muted-foreground",
						children: attendee?.email
					})] });
				}
			},
			{
				key: "event",
				header: "Opportunity / Event",
				render: (t) => {
					const event = t.event || t.registration?.event;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 font-medium text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: event?.title || "University Opportunity"
						})]
					}), event?.startDate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-muted-foreground",
						children: formatDate(event.startDate)
					})] });
				}
			},
			{
				key: "tier",
				header: "Admission Tier",
				render: (t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold text-foreground",
					children: t.tier?.name || t.tierName || "General Pass"
				})
			},
			{
				key: "status",
				header: "Pass Status",
				render: (t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: t.status || "ISSUED" })
			},
			{
				key: "checkIn",
				header: "Gate Check-In",
				render: (t) => t.checkedInAt || t.attendance ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3 text-emerald-500" }), " Checked-In"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3 text-muted-foreground" }), " Not Scanned"]
				})
			},
			{
				key: "issuedAt",
				header: "Issued Date",
				sortable: true,
				render: (t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground whitespace-nowrap",
					children: formatDate(t.issuedAt || t.createdAt)
				})
			}
		],
		data: data?.data || [],
		totalRecords: data?.total || 0,
		loading: isLoading,
		error,
		onRefresh: () => refetch(),
		search,
		onSearchChange: setSearch,
		searchPlaceholder: "Search tickets by reference code, attendee, or event...",
		hasActiveFilters,
		onResetFilters: handleResetFilters,
		dateFilter,
		onDateFilterChange: (df) => handleFilterChange(setDateFilter, df),
		page,
		pageSize,
		onPageChange: setPage,
		onPageSizeChange: (size) => {
			setPageSize(size);
			setPage(1);
		},
		currentFilterQuery: queryParams,
		filterSlots: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: status,
			onChange: (e) => handleFilterChange(setStatus, e.target.value),
			className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Ticket Statuses"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "ISSUED",
					children: "Issued & Active"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "USED",
					children: "Used / Checked In"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "CANCELLED",
					children: "Cancelled"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "REVOKED",
					children: "Revoked"
				})
			]
		})
	});
}
function AdminAttendanceTable({ universities = [] }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [isPresent, setIsPresent] = (0, import_react.useState)("");
	const [universityId, setUniversityId] = (0, import_react.useState)("");
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(25);
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		}, 350);
		return () => clearTimeout(handler);
	}, [search]);
	const handleFilterChange = (setter, value) => {
		setter(value);
		setPage(1);
	};
	const handleResetFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		setIsPresent("");
		setUniversityId("");
		setDateFilter({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
		setPage(1);
	};
	const isDateActive = Boolean(dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL");
	const hasActiveFilters = Boolean(debouncedSearch || isPresent || universityId || isDateActive);
	const queryParams = {
		search: debouncedSearch || void 0,
		isPresent: isPresent === "PRESENT" ? true : isPresent === "ABSENT" ? false : void 0,
		universityId: universityId || void 0,
		startDate: dateFilter.startDate || void 0,
		endDate: dateFilter.endDate || void 0,
		year: dateFilter.year || void 0,
		month: dateFilter.month || void 0,
		datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
		page,
		limit: pageSize
	};
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: [
			"admin",
			"attendance-table",
			queryParams
		],
		queryFn: () => adminApi.getAttendance(queryParams)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDataTable, {
		moduleKey: "attendance",
		title: "Attendance & Gate Scanner Records",
		description: "Live audit logs of physical gate check-ins, attendee rosters, and digital smart-card verifications.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5" }),
		columns: [
			{
				key: "attendee",
				header: "Attendee Identity",
				render: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 font-bold text-xs uppercase border border-emerald-200 dark:border-emerald-800/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground truncate block",
								children: a.user?.name || a.attendeeName || "Attendee"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground truncate",
								children: a.user?.email || a.attendeeEmail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] font-mono text-muted-foreground/70 truncate",
								children: [
									"ID: ",
									a.id?.slice(0, 8),
									"..."
								]
							})
						]
					})]
				})
			},
			{
				key: "event",
				header: "Opportunity / Event",
				render: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 font-medium text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: a.event?.title || "Event Roster"
					})]
				}), a.event?.university?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted-foreground",
					children: a.event.university.name
				})] })
			},
			{
				key: "ticket",
				header: "Ticket / Reference",
				render: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-mono font-medium text-foreground",
					children: a.ticket?.ticketNumber || a.registration?.id?.slice(0, 8) || "Direct Pass"
				})
			},
			{
				key: "status",
				header: "Attendance Status",
				render: (a) => a.isPresent !== false ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3 text-emerald-500" }), " Present"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center gap-1 rounded bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 text-[11px] font-semibold text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40",
					children: "Absent"
				})
			},
			{
				key: "checkedInAt",
				header: "Check-In Timestamp",
				sortable: true,
				render: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-foreground font-medium whitespace-nowrap block",
					children: formatDate(a.checkedInAt || a.createdAt)
				}), a.checkedInBy?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[10px] text-muted-foreground",
					children: ["Scanned by ", a.checkedInBy.name]
				})] })
			}
		],
		data: data?.data || [],
		totalRecords: data?.total || 0,
		loading: isLoading,
		error,
		onRefresh: () => refetch(),
		search,
		onSearchChange: setSearch,
		searchPlaceholder: "Search attendance by attendee, email, or event...",
		hasActiveFilters,
		onResetFilters: handleResetFilters,
		dateFilter,
		onDateFilterChange: (df) => handleFilterChange(setDateFilter, df),
		page,
		pageSize,
		onPageChange: setPage,
		onPageSizeChange: (size) => {
			setPageSize(size);
			setPage(1);
		},
		currentFilterQuery: queryParams,
		filterSlots: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: isPresent,
			onChange: (e) => handleFilterChange(setIsPresent, e.target.value),
			className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Attendance Records"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "PRESENT",
					children: "Present / Checked-In"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "ABSENT",
					children: "Absent / No-Show"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: universityId,
			onChange: (e) => handleFilterChange(setUniversityId, e.target.value),
			className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary max-w-[180px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: "All Universities"
			}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: u.id,
				children: u.name
			}, u.id))]
		})] })
	});
}
function AdminAuditLogsTable() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [action, setAction] = (0, import_react.useState)("");
	const [entityType, setEntityType] = (0, import_react.useState)("");
	const [dateFilter, setDateFilter] = (0, import_react.useState)({
		preset: "ALL",
		year: "",
		month: "",
		startDate: "",
		endDate: ""
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(25);
	const [inspectedLog, setInspectedLog] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		}, 350);
		return () => clearTimeout(handler);
	}, [search]);
	const handleFilterChange = (setter, value) => {
		setter(value);
		setPage(1);
	};
	const handleResetFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		setAction("");
		setEntityType("");
		setDateFilter({
			preset: "ALL",
			year: "",
			month: "",
			startDate: "",
			endDate: ""
		});
		setPage(1);
	};
	const isDateActive = Boolean(dateFilter.startDate || dateFilter.endDate || dateFilter.year || dateFilter.month || dateFilter.preset && dateFilter.preset !== "ALL");
	const hasActiveFilters = Boolean(debouncedSearch || action || entityType || isDateActive);
	const queryParams = {
		search: debouncedSearch || void 0,
		action: action || void 0,
		entityType: entityType || void 0,
		startDate: dateFilter.startDate || void 0,
		endDate: dateFilter.endDate || void 0,
		year: dateFilter.year || void 0,
		month: dateFilter.month || void 0,
		datePreset: dateFilter.preset && dateFilter.preset !== "ALL" ? dateFilter.preset : void 0,
		page,
		limit: pageSize
	};
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: [
			"admin",
			"audit-logs-table",
			queryParams
		],
		queryFn: () => adminApi.getAuditLogs(queryParams)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDataTable, {
		moduleKey: "audit-logs",
		title: "Enterprise System Audit Logs",
		description: "Immutable administrative activity ledger, permission changes, security access logs, and data mutation traces.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-5" }),
		columns: [
			{
				key: "createdAt",
				header: "Timestamp",
				sortable: true,
				render: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-foreground block text-xs whitespace-nowrap",
					children: formatDate(a.createdAt)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-muted-foreground font-mono",
					children: new Date(a.createdAt).toLocaleTimeString()
				})] })
			},
			{
				key: "actor",
				header: "Actor / Admin",
				render: (a) => {
					const actorName = a.user?.name || a.actorName || "System Automated";
					const actorEmail = a.user?.email || a.actorEmail || "platform@campuspulse.internal";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-7 shrink-0 place-items-center rounded-full bg-navy text-primary font-bold text-[10px] uppercase border border-border",
							children: actorName.charAt(0)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground truncate block text-xs",
								children: actorName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground truncate",
								children: actorEmail
							})]
						})]
					});
				}
			},
			{
				key: "action",
				header: "Action Performed",
				render: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex rounded bg-muted px-2 py-0.5 text-[11px] font-mono font-bold text-foreground border border-border",
					children: a.action
				})
			},
			{
				key: "entityType",
				header: "Target Entity",
				render: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold text-foreground block",
					children: a.entityType || "SYSTEM"
				}), a.entityId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[10px] font-mono text-muted-foreground truncate block",
					children: [
						"ID: ",
						a.entityId.slice(0, 10),
						"..."
					]
				})] })
			},
			{
				key: "reason",
				header: "Reason & Notes",
				render: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground line-clamp-1 max-w-xs italic",
					children: a.reason ? `"${a.reason}"` : "—"
				})
			},
			{
				key: "ipAddress",
				header: "Network IP",
				render: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] font-mono text-muted-foreground",
					children: a.ipAddress || "127.0.0.1"
				})
			},
			{
				key: "actions",
				header: "Inspect",
				className: "text-right",
				render: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					className: "h-7 text-xs",
					onClick: () => setInspectedLog(a),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5 mr-1 text-primary" }), " View Details"]
				})
			}
		],
		data: data?.data || [],
		totalRecords: data?.total || 0,
		loading: isLoading,
		error,
		onRefresh: () => refetch(),
		search,
		onSearchChange: setSearch,
		searchPlaceholder: "Search audit trails by action, user, or entity ID...",
		hasActiveFilters,
		onResetFilters: handleResetFilters,
		dateFilter,
		onDateFilterChange: (df) => handleFilterChange(setDateFilter, df),
		page,
		pageSize,
		onPageChange: setPage,
		onPageSizeChange: (size) => {
			setPageSize(size);
			setPage(1);
		},
		currentFilterQuery: queryParams,
		filterSlots: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: action,
			onChange: (e) => handleFilterChange(setAction, e.target.value),
			className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Action Types"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "USER_ROLE_CHANGED",
					children: "Role Modifications"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "USER_SUSPENDED",
					children: "Account Suspensions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "USER_RESTORED",
					children: "Account Restorations"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "VERIFICATION_APPROVED",
					children: "Verifications Approved"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "VERIFICATION_REJECTED",
					children: "Verifications Rejected"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "EVENT_CANCELLED",
					children: "Events Cancelled"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "PAYMENT_REFUNDED",
					children: "Payment Refunds"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "REPORT_RESOLVED",
					children: "Moderation Resolved"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "SETTINGS_UPDATED",
					children: "Settings Changed"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: entityType,
			onChange: (e) => handleFilterChange(setEntityType, e.target.value),
			className: "h-8 rounded border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "All Entity Types"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "USER",
					children: "User"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "EVENT",
					children: "Event"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "ORGANIZATION",
					children: "Organization"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "VERIFICATION",
					children: "Verification"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "PAYMENT",
					children: "Payment"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "REPORT",
					children: "Report"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "SETTINGS",
					children: "Settings"
				})
			]
		})] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: !!inspectedLog,
		onOpenChange: (open) => !open && setInspectedLog(null),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-xl text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "flex items-center gap-2 text-base font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-5 text-primary" }), "Audit Log Record Details"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					"Authoritative, immutable transaction log record ID:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-foreground font-semibold",
						children: inspectedLog?.id
					})
				] })] }),
				inspectedLog && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 text-xs bg-muted/30 p-3 rounded-lg border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground uppercase font-bold",
								children: "Action"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono font-bold text-foreground mt-0.5",
								children: inspectedLog.action
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground uppercase font-bold",
								children: "Timestamp"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-foreground mt-0.5",
								children: formatDate(inspectedLog.createdAt)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground uppercase font-bold",
								children: "Actor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium text-foreground mt-0.5",
								children: [
									inspectedLog.user?.name || "System",
									" (",
									inspectedLog.user?.email || "internal",
									")"
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground uppercase font-bold",
								children: "Target"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium text-foreground mt-0.5",
								children: [
									inspectedLog.entityType,
									" (",
									inspectedLog.entityId || "N/A",
									")"
								]
							})] }),
							inspectedLog.ipAddress && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground uppercase font-bold",
								children: "Client IP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-muted-foreground mt-0.5",
								children: inspectedLog.ipAddress
							})] }),
							inspectedLog.reason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground uppercase font-bold",
									children: "Justification / Reason"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "italic text-foreground mt-0.5",
									children: [
										"\"",
										inspectedLog.reason,
										"\""
									]
								})]
							})
						]
					}), inspectedLog.details && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-foreground mb-1.5",
						children: "Action Metadata / State Diff"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "p-3 bg-muted rounded-lg font-mono text-[11px] text-foreground overflow-x-auto max-h-48 border border-border",
						children: JSON.stringify(inspectedLog.details, null, 2)
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => setInspectedLog(null),
					children: "Close"
				}) })
			]
		})
	})] });
}
var CHART_COLORS = [
	"#6366F1",
	"#10B981",
	"#F59E0B",
	"#EF4444",
	"#8B5CF6",
	"#EC4899",
	"#14B8A6",
	"#3B82F6"
];
function AdminPage() {
	const { user, logout } = useAuth();
	const queryClient = useQueryClient();
	useNavigate();
	const [activeSection, setActiveSection] = (0, import_react.useState)("dashboard");
	const [sidebarCollapsed, setSidebarCollapsed] = (0, import_react.useState)(false);
	const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react.useState)(false);
	const [globalSearchQuery, setGlobalSearchQuery] = (0, import_react.useState)("");
	const [globalSearchResults, setGlobalSearchResults] = (0, import_react.useState)([]);
	const [isSearching, setIsSearching] = (0, import_react.useState)(false);
	const [actionReason, setActionReason] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [inspectUserId, setInspectUserId] = (0, import_react.useState)(null);
	const [suspendUserDialog, setSuspendUserDialog] = (0, import_react.useState)(null);
	const [changeRoleDialog, setChangeRoleDialog] = (0, import_react.useState)(null);
	const [newSelectedRole, setNewSelectedRole] = (0, import_react.useState)("STUDENT");
	const [createAdminOpen, setCreateAdminOpen] = (0, import_react.useState)(false);
	const [newAdminName, setNewAdminName] = (0, import_react.useState)("");
	const [newAdminEmail, setNewAdminEmail] = (0, import_react.useState)("");
	const [newAdminRole, setNewAdminRole] = (0, import_react.useState)("ADMIN");
	const [newAdminUniId, setNewAdminUniId] = (0, import_react.useState)("");
	const [createUniOpen, setCreateUniOpen] = (0, import_react.useState)(false);
	const [newUniName, setNewUniName] = (0, import_react.useState)("");
	const [newUniSlug, setNewUniSlug] = (0, import_react.useState)("");
	const [newUniCode, setNewUniCode] = (0, import_react.useState)("");
	const [newUniCity, setNewUniCity] = (0, import_react.useState)("Colombo");
	const [newUniDomain, setNewUniDomain] = (0, import_react.useState)("");
	const [addDomainDialogUni, setAddDomainDialogUni] = (0, import_react.useState)(null);
	const [newEmailDomain, setNewEmailDomain] = (0, import_react.useState)("");
	const [createFacultyOpen, setCreateFacultyOpen] = (0, import_react.useState)(false);
	const [newFacultyName, setNewFacultyName] = (0, import_react.useState)("");
	const [newFacultyCode, setNewFacultyCode] = (0, import_react.useState)("");
	const [newFacultySlug, setNewFacultySlug] = (0, import_react.useState)("");
	const [newFacultyUniId, setNewFacultyUniId] = (0, import_react.useState)("");
	const [newFacultyDesc, setNewFacultyDesc] = (0, import_react.useState)("");
	const [createDeptOpen, setCreateDeptOpen] = (0, import_react.useState)(false);
	const [newDeptName, setNewDeptName] = (0, import_react.useState)("");
	const [newDeptCode, setNewDeptCode] = (0, import_react.useState)("");
	const [newDeptSlug, setNewDeptSlug] = (0, import_react.useState)("");
	const [newDeptFacultyId, setNewDeptFacultyId] = (0, import_react.useState)("");
	const [newDeptDesc, setNewDeptDesc] = (0, import_react.useState)("");
	const [rejectEventDialog, setRejectEventDialog] = (0, import_react.useState)(null);
	const [cancelEventDialog, setCancelEventDialog] = (0, import_react.useState)(null);
	const [reviewOrgDialog, setReviewOrgDialog] = (0, import_react.useState)(null);
	const [orgReviewNotes, setOrgReviewNotes] = (0, import_react.useState)("");
	const [orgMarkVerified, setOrgMarkVerified] = (0, import_react.useState)(true);
	const [selectedRosterOrgId, setSelectedRosterOrgId] = (0, import_react.useState)("");
	const [changeMemberRoleDialog, setChangeMemberRoleDialog] = (0, import_react.useState)(null);
	const [newMemberRole, setNewMemberRole] = (0, import_react.useState)("MEMBER");
	const [removeMemberDialog, setRemoveMemberDialog] = (0, import_react.useState)(null);
	const [respondVerifDialog, setRespondVerifDialog] = (0, import_react.useState)(null);
	const [verifReviewNotes, setVerifReviewNotes] = (0, import_react.useState)("");
	const [cancelRegDialog, setCancelRegDialog] = (0, import_react.useState)(null);
	const [cancelRegReason, setCancelRegReason] = (0, import_react.useState)("");
	const [createAnnouncementOpen, setCreateAnnouncementOpen] = (0, import_react.useState)(false);
	const [annTitle, setAnnTitle] = (0, import_react.useState)("");
	const [annMessage, setAnnMessage] = (0, import_react.useState)("");
	const [annAudience, setAnnAudience] = (0, import_react.useState)("ALL");
	const [annPriority, setAnnPriority] = (0, import_react.useState)("NORMAL");
	const [annLinkUrl, setAnnLinkUrl] = (0, import_react.useState)("");
	const [resolveReportDialog, setResolveReportDialog] = (0, import_react.useState)(null);
	const [reportActionNotes, setReportActionNotes] = (0, import_react.useState)("");
	const [createCategoryOpen, setCreateCategoryOpen] = (0, import_react.useState)(false);
	const [newCatName, setNewCatName] = (0, import_react.useState)("");
	const [newCatType, setNewCatType] = (0, import_react.useState)("OTHER");
	const [newCatDesc, setNewCatDesc] = (0, import_react.useState)("");
	const [settingsDirectPublishing, setSettingsDirectPublishing] = (0, import_react.useState)(true);
	const [settingsAutoDomainVerify, setSettingsAutoDomainVerify] = (0, import_react.useState)(true);
	const [settingsMaintenanceMode, setSettingsMaintenanceMode] = (0, import_react.useState)(false);
	const [settingsSupportEmail, setSettingsSupportEmail] = (0, import_react.useState)("support@campuspulse.lk");
	const [settingsPlatformName, setSettingsPlatformName] = (0, import_react.useState)("CampusPulse");
	const [dashboardFilters, setDashboardFilters] = (0, import_react.useState)({});
	const [analyticsPeriod, setAnalyticsPeriod] = (0, import_react.useState)("30d");
	const [usersFilters, setUsersFilters] = (0, import_react.useState)({});
	const [adminsFilters, setAdminsFilters] = (0, import_react.useState)({});
	const [verificationsFilters, setVerificationsFilters] = (0, import_react.useState)({});
	const [unisFilters, setUnisFilters] = (0, import_react.useState)({});
	const [facultiesFilters, setFacultiesFilters] = (0, import_react.useState)({});
	const [deptsFilters, setDeptsFilters] = (0, import_react.useState)({});
	const [orgsFilters, setOrgsFilters] = (0, import_react.useState)({});
	const [eventsFilters, setEventsFilters] = (0, import_react.useState)({});
	const [teamsFilters, setTeamsFilters] = (0, import_react.useState)({});
	const [volunteeringFilters, setVolunteeringFilters] = (0, import_react.useState)({});
	const [reportsFilters, setReportsFilters] = (0, import_react.useState)({});
	const [categoriesFilters, setCategoriesFilters] = (0, import_react.useState)({});
	const [registrationsFilters, setRegistrationsFilters] = (0, import_react.useState)({});
	const [ticketsFilters, setTicketsFilters] = (0, import_react.useState)({});
	const [attendanceFilters, setAttendanceFilters] = (0, import_react.useState)({});
	const [paymentsFilters, setPaymentsFilters] = (0, import_react.useState)({});
	const [announcementsFilters, setAnnouncementsFilters] = (0, import_react.useState)({});
	const [auditLogsFilters, setAuditLogsFilters] = (0, import_react.useState)({
		sortBy: "createdAt",
		sortOrder: "desc"
	});
	const dashboardQuery = useQuery({
		queryKey: [
			"admin",
			"dashboard",
			dashboardFilters
		],
		queryFn: () => adminApi.getDashboard(dashboardFilters)
	});
	const analyticsQuery = useQuery({
		queryKey: [
			"admin",
			"analytics",
			analyticsPeriod
		],
		queryFn: () => adminApi.getAnalytics(analyticsPeriod)
	});
	const systemHealthQuery = useQuery({
		queryKey: ["admin", "system-health"],
		queryFn: () => adminApi.getSystemHealth(),
		enabled: activeSection === "system-health" || activeSection === "dashboard"
	});
	const usersQuery = useQuery({
		queryKey: [
			"admin",
			"users",
			usersFilters,
			activeSection
		],
		queryFn: () => {
			let role = usersFilters.status || void 0;
			if (activeSection === "students") role = "STUDENT";
			if (activeSection === "organizers") role = "ORGANIZER";
			return adminApi.getUsers({
				...usersFilters,
				role,
				limit: 50
			});
		},
		enabled: activeSection === "users" || activeSection === "students" || activeSection === "organizers"
	});
	const userDetailQuery = useQuery({
		queryKey: [
			"admin",
			"user-detail",
			inspectUserId
		],
		queryFn: () => adminApi.getUserDetails(inspectUserId),
		enabled: !!inspectUserId
	});
	const adminsQuery = useQuery({
		queryKey: [
			"admin",
			"administrators",
			adminsFilters
		],
		queryFn: () => adminApi.getAdministrators(adminsFilters),
		enabled: activeSection === "administrators"
	});
	const universitiesQuery = useQuery({
		queryKey: [
			"admin",
			"universities",
			unisFilters
		],
		queryFn: () => adminApi.getUniversities(unisFilters),
		enabled: true
	});
	const facultiesQuery = useQuery({
		queryKey: [
			"admin",
			"faculties",
			facultiesFilters
		],
		queryFn: () => adminApi.getFaculties(facultiesFilters),
		enabled: activeSection === "faculties" || createDeptOpen
	});
	const departmentsQuery = useQuery({
		queryKey: [
			"admin",
			"departments",
			deptsFilters
		],
		queryFn: () => adminApi.getDepartments(deptsFilters),
		enabled: activeSection === "departments"
	});
	const orgsQuery = useQuery({
		queryKey: [
			"admin",
			"organizations",
			orgsFilters,
			activeSection
		],
		queryFn: () => {
			let status = orgsFilters.status || void 0;
			if (activeSection === "organization-requests") status = "PENDING";
			return adminApi.getOrganizations({
				...orgsFilters,
				status,
				limit: 50
			});
		},
		enabled: activeSection === "societies" || activeSection === "organization-requests" || activeSection === "members" || activeSection === "reports-center"
	});
	(0, import_react.useEffect)(() => {
		const firstOrgId = orgsQuery.data?.data?.[0]?.id;
		if (activeSection === "members" && !selectedRosterOrgId && firstOrgId) setSelectedRosterOrgId(firstOrgId);
	}, [
		activeSection,
		selectedRosterOrgId,
		orgsQuery.data
	]);
	const verificationsQuery = useQuery({
		queryKey: [
			"admin",
			"verifications",
			verificationsFilters
		],
		queryFn: () => adminApi.getVerifications(verificationsFilters),
		enabled: activeSection === "verification"
	});
	const eventsQuery = useQuery({
		queryKey: [
			"admin",
			"events",
			eventsFilters
		],
		queryFn: () => adminApi.getEvents({
			...eventsFilters,
			limit: 50
		}),
		enabled: activeSection === "events"
	});
	useQuery({
		queryKey: [
			"admin",
			"teams",
			teamsFilters
		],
		queryFn: () => adminApi.getTeams(teamsFilters),
		enabled: activeSection === "teams"
	});
	useQuery({
		queryKey: [
			"admin",
			"volunteering",
			volunteeringFilters
		],
		queryFn: () => adminApi.getVolunteering(volunteeringFilters),
		enabled: activeSection === "volunteering"
	});
	const registrationsQuery = useQuery({
		queryKey: [
			"admin",
			"registrations",
			registrationsFilters
		],
		queryFn: () => adminApi.getRegistrations(registrationsFilters),
		enabled: activeSection === "registrations"
	});
	useQuery({
		queryKey: [
			"admin",
			"tickets",
			ticketsFilters
		],
		queryFn: () => adminApi.getTickets(ticketsFilters),
		enabled: activeSection === "tickets"
	});
	useQuery({
		queryKey: [
			"admin",
			"attendance",
			attendanceFilters
		],
		queryFn: () => adminApi.getAttendance(attendanceFilters),
		enabled: activeSection === "attendance"
	});
	useQuery({
		queryKey: [
			"admin",
			"payments",
			paymentsFilters
		],
		queryFn: () => adminApi.getPayments(paymentsFilters),
		enabled: activeSection === "payments"
	});
	const reportsQuery = useQuery({
		queryKey: [
			"admin",
			"reports",
			reportsFilters
		],
		queryFn: () => adminApi.getReports(reportsFilters),
		enabled: activeSection === "reports"
	});
	useQuery({
		queryKey: [
			"admin",
			"audit-logs",
			auditLogsFilters
		],
		queryFn: () => adminApi.getAuditLogs({
			...auditLogsFilters,
			limit: 50
		}),
		enabled: activeSection === "audit-logs"
	});
	const settingsQuery = useQuery({
		queryKey: ["admin", "settings"],
		queryFn: () => adminApi.getSettings(),
		enabled: activeSection === "settings"
	});
	(0, import_react.useEffect)(() => {
		if (settingsQuery.data?.settings) {
			const s = settingsQuery.data.settings;
			if (s["directPublishingEnabled"] !== void 0) setSettingsDirectPublishing(s["directPublishingEnabled"] === "true");
			if (s["autoVerifyUniversityDomains"] !== void 0) setSettingsAutoDomainVerify(s["autoVerifyUniversityDomains"] === "true");
			if (s["maintenanceMode"] !== void 0) setSettingsMaintenanceMode(s["maintenanceMode"] === "true");
			if (s["supportEmail"]) setSettingsSupportEmail(s["supportEmail"]);
			if (s["platformName"]) setSettingsPlatformName(s["platformName"]);
		}
	}, [settingsQuery.data]);
	const categoriesQuery = useQuery({
		queryKey: [
			"admin",
			"categories",
			categoriesFilters
		],
		queryFn: () => adminApi.getCategories(categoriesFilters),
		enabled: true
	});
	const handleGlobalSearch = async (e) => {
		e.preventDefault();
		if (!globalSearchQuery.trim()) return;
		setIsSearching(true);
		try {
			const res = await adminApi.globalSearch(globalSearchQuery.trim());
			setGlobalSearchResults(res);
		} catch {
			toast.error("Global search failed");
		} finally {
			setIsSearching(false);
		}
	};
	const handleToggleUserStatus = async () => {
		if (!suspendUserDialog) return;
		setBusy(true);
		try {
			const nextActive = !suspendUserDialog.currentStatus;
			await adminApi.updateUserStatus(suspendUserDialog.id, nextActive, actionReason.trim() || void 0);
			toast.success(nextActive ? "Account restored" : "Account suspended", { description: `Status updated for ${suspendUserDialog.name}.` });
			setSuspendUserDialog(null);
			setActionReason("");
			usersQuery.refetch();
			dashboardQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to update account status");
		} finally {
			setBusy(false);
		}
	};
	const handleChangeUserRole = async () => {
		if (!changeRoleDialog) return;
		setBusy(true);
		try {
			await adminApi.updateUserRole(changeRoleDialog.id, newSelectedRole, actionReason.trim() || void 0);
			toast.success(`Role changed to ${newSelectedRole}`, { description: `Updated permissions for ${changeRoleDialog.name}.` });
			setChangeRoleDialog(null);
			setActionReason("");
			usersQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to update role");
		} finally {
			setBusy(false);
		}
	};
	const handleCreateAdmin = async (e) => {
		e.preventDefault();
		setBusy(true);
		try {
			await adminApi.createAdministrator({
				name: newAdminName.trim(),
				email: newAdminEmail.trim(),
				role: newAdminRole,
				universityId: newAdminUniId || void 0,
				reason: "Admin Control Center invitation"
			});
			toast.success(`Administrator created: ${newAdminName}`);
			setCreateAdminOpen(false);
			setNewAdminName("");
			setNewAdminEmail("");
			adminsQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to create administrator");
		} finally {
			setBusy(false);
		}
	};
	const handleRemoveAdmin = async (id, name) => {
		if (!confirm(`Are you sure you want to revoke administrator privileges from ${name}?`)) return;
		try {
			await adminApi.removeAdministrator(id);
			toast.success(`Revoked admin privileges from ${name}`);
			adminsQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to remove administrator");
		}
	};
	const handleCreateUniversity = async (e) => {
		e.preventDefault();
		setBusy(true);
		try {
			await adminApi.createUniversity({
				name: newUniName.trim(),
				slug: newUniSlug.trim() || newUniName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
				code: newUniCode.trim().toUpperCase(),
				city: newUniCity.trim(),
				domain: newUniDomain.trim() || void 0
			});
			toast.success(`University added: ${newUniName}`);
			setCreateUniOpen(false);
			setNewUniName("");
			setNewUniSlug("");
			setNewUniCode("");
			setNewUniDomain("");
			universitiesQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to create university");
		} finally {
			setBusy(false);
		}
	};
	const handleAddDomain = async (e) => {
		e.preventDefault();
		if (!addDomainDialogUni || !newEmailDomain.trim()) return;
		setBusy(true);
		try {
			await adminApi.addUniversityDomain(addDomainDialogUni.id, newEmailDomain.trim(), false);
			toast.success(`Domain @${newEmailDomain} authorized for ${addDomainDialogUni.name}`);
			setAddDomainDialogUni(null);
			setNewEmailDomain("");
			universitiesQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to add domain");
		} finally {
			setBusy(false);
		}
	};
	const handleCreateFaculty = async (e) => {
		e.preventDefault();
		if (!newFacultyUniId || !newFacultyName.trim() || !newFacultyCode.trim()) {
			toast.error("Please fill in required faculty details");
			return;
		}
		setBusy(true);
		try {
			await adminApi.createFaculty({
				universityId: newFacultyUniId,
				name: newFacultyName.trim(),
				code: newFacultyCode.trim().toUpperCase(),
				slug: newFacultySlug.trim() || newFacultyName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
				description: newFacultyDesc.trim() || void 0
			});
			toast.success(`Faculty "${newFacultyName}" created!`);
			setCreateFacultyOpen(false);
			setNewFacultyName("");
			setNewFacultyCode("");
			setNewFacultySlug("");
			setNewFacultyDesc("");
			universitiesQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to create faculty");
		} finally {
			setBusy(false);
		}
	};
	const handleCreateDepartment = async (e) => {
		e.preventDefault();
		if (!newDeptFacultyId || !newDeptName.trim() || !newDeptCode.trim()) {
			toast.error("Please fill in required department details");
			return;
		}
		setBusy(true);
		try {
			await adminApi.createDepartment({
				facultyId: newDeptFacultyId,
				name: newDeptName.trim(),
				code: newDeptCode.trim().toUpperCase(),
				slug: newDeptSlug.trim() || newDeptName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
				description: newDeptDesc.trim() || void 0
			});
			toast.success(`Department "${newDeptName}" created!`);
			setCreateDeptOpen(false);
			setNewDeptName("");
			setNewDeptCode("");
			setNewDeptSlug("");
			setNewDeptDesc("");
			universitiesQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to create department");
		} finally {
			setBusy(false);
		}
	};
	const handleRejectEvent = async () => {
		if (!rejectEventDialog || !actionReason.trim()) {
			toast.error("Please provide feedback for the organizer.");
			return;
		}
		setBusy(true);
		try {
			await adminApi.rejectEvent(rejectEventDialog.id, actionReason.trim());
			toast.success(`Rejected "${rejectEventDialog.title}"`);
			setRejectEventDialog(null);
			setActionReason("");
			eventsQuery.refetch();
			dashboardQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to reject opportunity");
		} finally {
			setBusy(false);
		}
	};
	const handleCancelEvent = async () => {
		if (!cancelEventDialog) return;
		setBusy(true);
		try {
			await adminApi.cancelEvent(cancelEventDialog.id, actionReason.trim() || void 0);
			toast.success(`Cancelled "${cancelEventDialog.title}"`);
			setCancelEventDialog(null);
			setActionReason("");
			eventsQuery.refetch();
			dashboardQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to cancel event");
		} finally {
			setBusy(false);
		}
	};
	const handleReviewOrg = async () => {
		if (!reviewOrgDialog) return;
		setBusy(true);
		try {
			await adminApi.reviewOrganization(reviewOrgDialog.id, {
				status: reviewOrgDialog.type === "APPROVE" ? "APPROVED" : "REJECTED",
				notes: orgReviewNotes.trim() || void 0,
				isVerified: orgMarkVerified
			});
			toast.success(reviewOrgDialog.type === "APPROVE" ? `Approved "${reviewOrgDialog.name}"! 🎉` : `Rejected "${reviewOrgDialog.name}"`);
			setReviewOrgDialog(null);
			setOrgReviewNotes("");
			orgsQuery.refetch();
			dashboardQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to review organization proposal");
		} finally {
			setBusy(false);
		}
	};
	const handleChangeMemberRole = async () => {
		if (!changeMemberRoleDialog) return;
		setBusy(true);
		try {
			await adminApi.updateOrganizationMemberRole(changeMemberRoleDialog.orgId, changeMemberRoleDialog.memberId, {
				role: newMemberRole,
				reason: "Administrative roster adjustment"
			});
			toast.success(`Member role updated to ${newMemberRole}`);
			setChangeMemberRoleDialog(null);
			queryClient.invalidateQueries({ queryKey: ["admin", "organizations"] });
		} catch (err) {
			toast.error(err?.message || "Failed to update member role");
		} finally {
			setBusy(false);
		}
	};
	const handleRemoveMember = async () => {
		if (!removeMemberDialog) return;
		setBusy(true);
		try {
			await adminApi.removeOrganizationMember(removeMemberDialog.orgId, removeMemberDialog.memberId);
			toast.success(`Removed ${removeMemberDialog.name} from society roster`);
			setRemoveMemberDialog(null);
			queryClient.invalidateQueries({ queryKey: ["admin", "organizations"] });
		} catch (err) {
			toast.error(err?.message || "Failed to remove member");
		} finally {
			setBusy(false);
		}
	};
	const handleRespondVerification = async () => {
		if (!respondVerifDialog) return;
		setBusy(true);
		try {
			await adminApi.respondVerification(respondVerifDialog.id, respondVerifDialog.type, verifReviewNotes.trim() || void 0);
			toast.success(`Verification ${respondVerifDialog.type.toLowerCase()}`);
			setRespondVerifDialog(null);
			setVerifReviewNotes("");
			verificationsQuery.refetch();
			dashboardQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to respond to verification request");
		} finally {
			setBusy(false);
		}
	};
	const handleCancelRegistration = async () => {
		if (!cancelRegDialog) return;
		setBusy(true);
		try {
			await adminApi.cancelRegistration(cancelRegDialog.id, cancelRegReason.trim() || void 0);
			toast.success(`Registration cancelled for ${cancelRegDialog.userName}`);
			setCancelRegDialog(null);
			setCancelRegReason("");
			registrationsQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to cancel registration");
		} finally {
			setBusy(false);
		}
	};
	const handleResolveReport = async () => {
		if (!resolveReportDialog) return;
		setBusy(true);
		try {
			await adminApi.resolveReport(resolveReportDialog.id, resolveReportDialog.status, reportActionNotes.trim() || void 0);
			toast.success(`Report marked as ${resolveReportDialog.status}`);
			setResolveReportDialog(null);
			setReportActionNotes("");
			reportsQuery.refetch();
			dashboardQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to resolve report");
		} finally {
			setBusy(false);
		}
	};
	const handleCreateAnnouncement = async (e) => {
		e.preventDefault();
		if (!annTitle.trim() || !annMessage.trim()) return;
		setBusy(true);
		try {
			await adminApi.createAnnouncement({
				title: annTitle.trim(),
				message: annMessage.trim(),
				targetAudience: annAudience,
				priority: annPriority,
				...annLinkUrl.trim() ? { linkUrl: annLinkUrl.trim() } : {}
			});
			toast.success("Platform announcement broadcasted! 📢");
			setCreateAnnouncementOpen(false);
			setAnnTitle("");
			setAnnMessage("");
			setAnnLinkUrl("");
			queryClient.invalidateQueries({ queryKey: ["admin", "announcements"] });
		} catch (err) {
			toast.error(err?.message || "Failed to create announcement");
		} finally {
			setBusy(false);
		}
	};
	const handleCreateCategory = async (e) => {
		e.preventDefault();
		if (!newCatName.trim()) return;
		setBusy(true);
		try {
			await adminApi.createCategory({
				name: newCatName.trim(),
				type: newCatType,
				...newCatDesc.trim() ? { description: newCatDesc.trim() } : {}
			});
			toast.success(`Category "${newCatName}" created`);
			setCreateCategoryOpen(false);
			setNewCatName("");
			setNewCatDesc("");
			categoriesQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to create category");
		} finally {
			setBusy(false);
		}
	};
	const handleSavePlatformSettings = async () => {
		setBusy(true);
		try {
			await adminApi.updateSettings({
				directPublishingEnabled: String(settingsDirectPublishing),
				autoVerifyUniversityDomains: String(settingsAutoDomainVerify),
				maintenanceMode: String(settingsMaintenanceMode),
				supportEmail: settingsSupportEmail.trim(),
				platformName: settingsPlatformName.trim()
			});
			toast.success("Platform configuration updated & persisted! ⚙️");
			settingsQuery.refetch();
		} catch (err) {
			toast.error(err?.message || "Failed to update platform settings");
		} finally {
			setBusy(false);
		}
	};
	const navGroups = (0, import_react.useMemo)(() => [
		{
			title: "Overview",
			items: [
				{
					id: "dashboard",
					label: "Dashboard",
					icon: LayoutDashboard
				},
				{
					id: "analytics",
					label: "Analytics",
					icon: ChartColumn
				},
				{
					id: "reports-center",
					label: "Reports Center",
					icon: FileSpreadsheet
				},
				{
					id: "system-health",
					label: "System Health",
					icon: Activity
				}
			]
		},
		{
			title: "People",
			items: [
				{
					id: "users",
					label: "All Users",
					icon: Users
				},
				{
					id: "students",
					label: "Students",
					icon: GraduationCap
				},
				{
					id: "organizers",
					label: "Organizers",
					icon: ShieldCheck
				},
				{
					id: "administrators",
					label: "Administrators",
					icon: Shield
				},
				{
					id: "verification",
					label: "Verification Queue",
					icon: UserCheck,
					badge: dashboardQuery.data?.moderationQueue?.pendingVerifications
				}
			]
		},
		{
			title: "Campus",
			items: [
				{
					id: "universities",
					label: "Universities",
					icon: Building
				},
				{
					id: "faculties",
					label: "Faculties",
					icon: Layers
				},
				{
					id: "departments",
					label: "Departments",
					icon: Compass
				}
			]
		},
		{
			title: "Organizations",
			items: [
				{
					id: "societies",
					label: "Societies & Clubs",
					icon: Building2
				},
				{
					id: "organization-requests",
					label: "Society Requests",
					icon: Sparkles,
					badge: dashboardQuery.data?.moderationQueue?.pendingOrganizations
				},
				{
					id: "members",
					label: "Member Rosters",
					icon: UserPlus
				}
			]
		},
		{
			title: "Content",
			items: [
				{
					id: "events",
					label: "Events Catalog",
					icon: Calendar,
					badge: dashboardQuery.data?.moderationQueue?.pendingEvents
				},
				{
					id: "teams",
					label: "Teaming Board",
					icon: Users
				},
				{
					id: "volunteering",
					label: "Volunteering Hub",
					icon: HeartHandshake
				},
				{
					id: "reports",
					label: "Moderation Reports",
					icon: Flag,
					badge: dashboardQuery.data?.moderationQueue?.pendingReports
				},
				{
					id: "categories",
					label: "Categories",
					icon: Tag
				}
			]
		},
		{
			title: "Transactions",
			items: [
				{
					id: "registrations",
					label: "Registrations",
					icon: FileText
				},
				{
					id: "tickets",
					label: "Tickets & Passes",
					icon: Ticket
				},
				{
					id: "attendance",
					label: "Attendance Records",
					icon: CircleCheck
				},
				{
					id: "payments",
					label: "Payments Ledger",
					icon: CreditCard
				}
			]
		},
		{
			title: "Communication",
			items: [{
				id: "announcements",
				label: "Announcements",
				icon: Megaphone
			}]
		},
		{
			title: "System",
			items: [{
				id: "audit-logs",
				label: "Audit Logs",
				icon: History
			}, {
				id: "settings",
				label: "Platform Settings",
				icon: Settings
			}]
		}
	], [dashboardQuery.data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		roles: ["ADMIN"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen bg-background text-foreground font-sans",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: cn("fixed inset-y-0 left-0 z-30 flex flex-col border-r border-border bg-card transition-all duration-200 lg:static", sidebarCollapsed ? "w-16" : "w-64", mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-16 shrink-0 items-center justify-between border-b border-border px-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-9 shrink-0 place-items-center rounded-lg bg-navy text-navy-foreground shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-5 text-primary" })
								}), !sidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "truncate",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold tracking-tight text-foreground",
										children: "CampusPulse"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1.5 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary",
										children: "Control"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "hidden size-7 text-muted-foreground hover:text-foreground lg:flex",
								onClick: () => setSidebarCollapsed(!sidebarCollapsed),
								title: sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: cn("size-4 transition-transform", !sidebarCollapsed && "rotate-180") })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 overflow-y-auto px-2 py-4 space-y-6",
							children: navGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [!sidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 mb-1.5",
								children: group.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-0.5",
								children: group.items.map((item) => {
									const active = activeSection === item.id;
									const Icon = item.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setActiveSection(item.id);
											setMobileMenuOpen(false);
										},
										title: sidebarCollapsed ? item.label : void 0,
										className: cn("flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition-colors relative", active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground", sidebarCollapsed && "justify-center px-2"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }),
											!sidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate flex-1 text-left",
												children: item.label
											}),
											Boolean(item.badge && item.badge > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("grid place-items-center rounded-full text-[10px] font-bold", sidebarCollapsed ? "absolute -top-1 -right-1 size-4 bg-destructive text-destructive-foreground" : "px-1.5 py-0.5 bg-destructive text-destructive-foreground"),
												children: item.badge
											})
										]
									}) }, item.id);
								})
							})] }, group.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-t border-border p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("flex items-center gap-2.5", sidebarCollapsed && "justify-center"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-8 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-navy-foreground",
									children: user?.name?.[0] || "A"
								}), !sidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs font-semibold text-foreground",
										children: user?.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-[10px] text-muted-foreground",
										children: user?.email
									})]
								})]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-border bg-card/95 px-4 sm:px-6 backdrop-blur",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "lg:hidden",
									onClick: () => setMobileMenuOpen(!mobileMenuOpen),
									"aria-label": "Toggle navigation menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleGlobalSearch,
									className: "relative w-64 sm:w-80 md:w-96",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: globalSearchQuery,
										onChange: (e) => setGlobalSearchQuery(e.target.value),
										placeholder: "Global search (users, events, clubs, unis)...",
										className: "pl-9 h-9 text-xs"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										size: "sm",
										className: "h-8 text-xs font-semibold hidden sm:inline-flex",
										onClick: () => {
											dashboardQuery.refetch();
											toast.success("Dashboard data refreshed");
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5 mr-1.5" }), "Refresh"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "outline",
										size: "sm",
										className: "h-8 text-xs font-semibold",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/explore",
											children: "View Site"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "size-8 rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "grid size-7 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary",
												children: user?.name?.[0] || "A"
											})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
										align: "end",
										className: "w-56",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-semibold",
												children: user?.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] font-normal text-muted-foreground",
												children: user?.email
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => setActiveSection("settings"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4 mr-2" }), " Platform Settings"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => setActiveSection("audit-logs"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4 mr-2" }), " Audit Trail"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: logout,
												className: "text-destructive",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4 mr-2" }), " Sign Out"]
											})
										]
									})] })
								]
							})]
						}),
						globalSearchResults.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-border bg-muted/40 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
									children: [
										"Global Search Results (",
										globalSearchResults.length,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									className: "h-6 text-xs",
									onClick: () => setGlobalSearchResults([]),
									children: "Close"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2 sm:grid-cols-2 md:grid-cols-3",
								children: globalSearchResults.map((res) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between p-2.5 rounded-lg border border-border bg-card text-xs hover:border-primary cursor-pointer transition-colors",
									onClick: () => {
										if (res.type === "USER") setInspectUserId(res.id);
										else if (res.type === "EVENT") {
											setActiveSection("events");
											setEventsFilters((prev) => ({
												...prev,
												search: res.title
											}));
										} else if (res.type === "ORGANIZATION") {
											setActiveSection("societies");
											setOrgsFilters((prev) => ({
												...prev,
												search: res.title
											}));
										} else if (res.type === "UNIVERSITY") setActiveSection("universities");
										setGlobalSearchResults([]);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-foreground",
										children: res.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: res.subtitle
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary",
										children: res.type
									})]
								}, `${res.type}-${res.id}`))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
							className: "flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6",
							children: [
								activeSection === "dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
											title: "Platform Command Center",
											description: "Global system telemetry, active moderation queues, and operational metrics across all universities.",
											actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													onClick: () => setCreateAnnouncementOpen(true),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "size-4 mr-1.5" }), " Broadcast Alert"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "outline",
													size: "sm",
													onClick: () => setCreateAdminOpen(true),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4 mr-1.5" }), " Add Admin"]
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminFilterBar, {
											filters: dashboardFilters,
											onFilterChange: setDashboardFilters,
											onReset: () => setDashboardFilters({}),
											universities: universitiesQuery.data?.data || [],
											categories: categoriesQuery.data || [],
											showCategoryFilter: true,
											showStatusFilter: false,
											showSortFilter: false,
											searchPlaceholder: "Filter dashboard KPIs by keyword..."
										}),
										dashboardQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : dashboardQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => dashboardQuery.refetch() }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
														label: "Total Users",
														value: dashboardQuery.data?.overview.totalUsers ?? 0,
														hint: `${dashboardQuery.data?.overview.activeUsers ?? 0} active accounts`,
														icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5 text-primary" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
														label: "Universities & Campuses",
														value: dashboardQuery.data?.overview.universities ?? 0,
														hint: "Verified academic institutions",
														icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-5 text-emerald-500" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
														label: "Societies & Clubs",
														value: dashboardQuery.data?.overview.organizations ?? 0,
														hint: "Active student organizations",
														icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-5 text-indigo-500" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
														label: "Published Opportunities",
														value: dashboardQuery.data?.overview.publishedEvents ?? 0,
														hint: `${dashboardQuery.data?.overview.events ?? 0} total listings`,
														icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-5 text-amber-500" })
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
														label: "Registrations",
														value: dashboardQuery.data?.overview.registrations ?? 0,
														hint: "Student event admissions",
														icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5 text-sky-500" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
														label: "Formed Squads",
														value: dashboardQuery.data?.overview.teams ?? 0,
														hint: "Hackathon & project teams",
														icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5 text-purple-500" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
														label: "Paid Transactions",
														value: dashboardQuery.data?.overview.paidPayments ?? 0,
														hint: "Completed ticket checkouts",
														icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-5 text-teal-500" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
														label: "Pending Moderation",
														value: (dashboardQuery.data?.moderationQueue.pendingEvents ?? 0) + (dashboardQuery.data?.moderationQueue.pendingReports ?? 0) + (dashboardQuery.data?.moderationQueue.pendingVerifications ?? 0) + (dashboardQuery.data?.moderationQueue.pendingOrganizations ?? 0),
														hint: "Items requiring review",
														icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-5 text-rose-500" })
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-6 md:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-xl border border-border bg-card p-5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex items-center justify-between mb-4",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
															className: "text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4 text-primary" }), " Active Moderation Tasks"]
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-2 gap-3",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																type: "button",
																onClick: () => setActiveSection("organization-requests"),
																className: "flex flex-col p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted transition-colors text-left",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xl font-extrabold text-foreground",
																	children: dashboardQuery.data?.moderationQueue.pendingOrganizations ?? 0
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xs text-muted-foreground mt-0.5",
																	children: "Society Proposals"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																type: "button",
																onClick: () => setActiveSection("verification"),
																className: "flex flex-col p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted transition-colors text-left",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xl font-extrabold text-foreground",
																	children: dashboardQuery.data?.moderationQueue.pendingVerifications ?? 0
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xs text-muted-foreground mt-0.5",
																	children: "Verification Requests"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																type: "button",
																onClick: () => setActiveSection("reports"),
																className: "flex flex-col p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted transition-colors text-left",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xl font-extrabold text-foreground",
																	children: dashboardQuery.data?.moderationQueue.pendingReports ?? 0
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xs text-muted-foreground mt-0.5",
																	children: "Flagged Content Reports"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																type: "button",
																onClick: () => setActiveSection("events"),
																className: "flex flex-col p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted transition-colors text-left",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xl font-extrabold text-foreground",
																	children: dashboardQuery.data?.moderationQueue.pendingEvents ?? 0
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xs text-muted-foreground mt-0.5",
																	children: "Pending Event Reviews"
																})]
															})
														]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-xl border border-border bg-card p-5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between mb-4",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
															className: "text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4 text-primary" }), " Recent Audit Activity"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															variant: "ghost",
															size: "sm",
															className: "h-7 text-xs",
															onClick: () => setActiveSection("audit-logs"),
															children: "View All"
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
														className: "space-y-2.5",
														children: dashboardQuery.data?.recentActivity?.slice(0, 5).map((act) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
															className: "flex items-start justify-between gap-3 text-xs border-b border-border/50 pb-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-semibold text-foreground",
																	children: act.action
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-muted-foreground ml-1.5",
																	children: ["by ", act.user?.name || "System"]
																}),
																act.reason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																	className: "text-muted-foreground italic mt-0.5",
																	children: [
																		"\"",
																		act.reason,
																		"\""
																	]
																})
															] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] text-muted-foreground shrink-0",
																children: formatDate(act.createdAt)
															})]
														}, act.id))
													})]
												})]
											})
										] })
									]
								}),
								activeSection === "analytics" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
										title: "Platform Analytics & Telemetry",
										description: "Interactive breakdown of user adoption, event distribution, revenue volume, and campus participation trends.",
										actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-1.5 bg-muted rounded-lg p-1",
											children: [
												"7d",
												"30d",
												"3m",
												"6m",
												"1y"
											].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setAnalyticsPeriod(p),
												className: cn("rounded px-2.5 py-1 text-xs font-semibold transition-colors", analyticsPeriod === p ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"),
												children: p.toUpperCase()
											}, p))
										})
									}), analyticsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : analyticsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => analyticsQuery.refetch() }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-6 md:grid-cols-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-border bg-card p-5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "text-sm font-bold uppercase tracking-wider text-foreground mb-4",
													children: "Users by Campus / University"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-64",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
														width: "100%",
														height: "100%",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
															data: analyticsQuery.data?.usersByUniversity || [],
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
																	strokeDasharray: "3 3",
																	opacity: .2
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
																	dataKey: "university",
																	tick: { fontSize: 11 }
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 11 } }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
																	dataKey: "count",
																	fill: "#6366F1",
																	radius: [
																		4,
																		4,
																		0,
																		0
																	]
																})
															]
														})
													})
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-border bg-card p-5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "text-sm font-bold uppercase tracking-wider text-foreground mb-4",
													children: "Opportunities by Category"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-64",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
														width: "100%",
														height: "100%",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
															data: analyticsQuery.data?.eventsByCategory || [],
															dataKey: "count",
															nameKey: "category",
															cx: "50%",
															cy: "50%",
															outerRadius: 80,
															label: ({ category, count }) => `${category} (${count})`,
															children: (analyticsQuery.data?.eventsByCategory || []).map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: CHART_COLORS[idx % CHART_COLORS.length] }, idx))
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})] })
													})
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-border bg-card p-5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "text-sm font-bold uppercase tracking-wider text-foreground mb-4",
													children: "User Distribution by Role"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-64",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
														width: "100%",
														height: "100%",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
															data: analyticsQuery.data?.usersByRole || [],
															layout: "vertical",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
																	strokeDasharray: "3 3",
																	opacity: .2
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
																	type: "number",
																	tick: { fontSize: 11 }
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
																	dataKey: "role",
																	type: "category",
																	tick: { fontSize: 11 },
																	width: 120
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
																	dataKey: "count",
																	fill: "#10B981",
																	radius: [
																		0,
																		4,
																		4,
																		0
																	]
																})
															]
														})
													})
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-border bg-card p-5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between mb-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
														className: "text-sm font-bold uppercase tracking-wider text-foreground",
														children: "Payment Status & Volume"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs font-bold text-emerald-600",
														children: ["Total: ", formatMoney(analyticsQuery.data?.totalRevenue || 0)]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-64",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
														width: "100%",
														height: "100%",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
															data: analyticsQuery.data?.paymentsByStatus || [],
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
																	strokeDasharray: "3 3",
																	opacity: .2
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
																	dataKey: "status",
																	tick: { fontSize: 11 }
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 11 } }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (val) => formatMoney(Number(val)) }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
																	dataKey: "volume",
																	fill: "#F59E0B",
																	radius: [
																		4,
																		4,
																		0,
																		0
																	]
																})
															]
														})
													})
												})]
											})
										]
									})]
								}),
								activeSection === "reports-center" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminReportsCenter, {
									universities: universitiesQuery.data?.data || [],
									categories: categoriesQuery.data || []
								}),
								activeSection === "system-health" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
										title: "System Infrastructure Health",
										description: "Real-time telemetry, Node.js process statistics, database connectivity, and runtime status.",
										actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => systemHealthQuery.refetch(),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5 mr-1.5" }), " Refresh Telemetry"]
										})
									}), systemHealthQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : systemHealthQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => systemHealthQuery.refetch() }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-6 md:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-5 space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
												className: "text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "size-4 text-emerald-500" }), " Backend API Server"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-3 text-xs",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded border border-border p-2.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-muted-foreground text-[10px] uppercase font-bold",
															children: "Status"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-base font-extrabold text-emerald-600 mt-1",
															children: "🟢 Operational"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded border border-border p-2.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-muted-foreground text-[10px] uppercase font-bold",
															children: "Node.js Version"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-base font-extrabold text-foreground mt-1",
															children: systemHealthQuery.data.nodeVersion
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded border border-border p-2.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-muted-foreground text-[10px] uppercase font-bold",
															children: "Server Uptime"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-base font-extrabold text-foreground mt-1",
															children: [Math.floor(systemHealthQuery.data.uptimeSeconds / 60), " mins"]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded border border-border p-2.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-muted-foreground text-[10px] uppercase font-bold",
															children: "Environment"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-base font-extrabold text-foreground mt-1 uppercase",
															children: systemHealthQuery.data.environment
														})]
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-5 space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
												className: "text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4 text-primary" }), " Database Connectivity"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-3 text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded border border-border p-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-muted-foreground text-[10px] uppercase font-bold",
														children: "PostgreSQL Status"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-base font-extrabold text-emerald-600 mt-1",
														children: "Connected"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded border border-border p-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-muted-foreground text-[10px] uppercase font-bold",
														children: "Query Latency"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-base font-extrabold text-primary mt-1",
														children: [systemHealthQuery.data.database?.latencyMs, " ms"]
													})]
												})]
											})]
										})]
									})]
								}),
								activeSection === "users" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminUsersTable, {
									universities: universitiesQuery.data?.data || [],
									onInspectUser: setInspectUserId,
									onSuspendUser: setSuspendUserDialog,
									onChangeRole: setChangeRoleDialog
								}),
								activeSection === "students" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminStudentsTable, {
									universities: universitiesQuery.data?.data || [],
									onInspectUser: setInspectUserId,
									onSuspendUser: setSuspendUserDialog
								}),
								activeSection === "organizers" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminOrganizersTable, {
									universities: universitiesQuery.data?.data || [],
									onInspectUser: setInspectUserId,
									onViewOrganization: (orgId) => {
										setSelectedRosterOrgId(orgId);
										setActiveSection("members");
									}
								}),
								activeSection === "administrators" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminAdministratorsTable, {
									universities: universitiesQuery.data?.data || [],
									onCreateAdmin: () => setCreateAdminOpen(true),
									onRemoveAdmin: (adm) => handleRemoveAdmin(adm.id, adm.name)
								}),
								activeSection === "universities" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminUniversities, { onOpenCreateFaculty: (uniId) => {
									if (uniId) setNewFacultyUniId(uniId);
									setCreateFacultyOpen(true);
								} }),
								activeSection === "faculties" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminFaculties, { onOpenCreateDepartment: (facultyId, universityId) => {
									setActiveSection("departments");
								} }),
								activeSection === "departments" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDepartments, {}),
								activeSection === "societies" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
											title: "Societies & Student Clubs",
											description: "Oversee university clubs, view active 2-leader rosters, and inspect member participation metrics."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminFilterBar, {
											filters: orgsFilters,
											onFilterChange: setOrgsFilters,
											onReset: () => setOrgsFilters({}),
											totalRecords: orgsQuery.data?.total,
											loading: orgsQuery.isPending,
											universities: universitiesQuery.data?.data || [],
											statusOptions: [
												{
													value: "APPROVED",
													label: "Approved & Active"
												},
												{
													value: "PENDING",
													label: "Pending Approval"
												},
												{
													value: "REJECTED",
													label: "Rejected"
												},
												{
													value: "SUSPENDED",
													label: "Suspended"
												}
											],
											sortOptions: [
												{
													value: "createdAt-desc",
													label: "Newest Founded"
												},
												{
													value: "createdAt-asc",
													label: "Oldest Founded"
												},
												{
													value: "name-asc",
													label: "Name (A-Z)"
												}
											],
											searchPlaceholder: "Search societies and clubs..."
										}),
										orgsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : orgsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => orgsQuery.refetch() }) : orgsQuery.data.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-6" }),
											title: "No organizations found",
											description: "There are no active clubs matching this filter."
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
											children: orgsQuery.data.data.map((org) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-border bg-card p-5 space-y-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-start justify-between gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
															className: "font-bold text-sm text-foreground",
															children: org.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-xs text-muted-foreground",
															children: org.university?.name || "Independent Club"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", org.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"),
															children: org.status
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "border-t border-border/50 pt-2 text-xs",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1",
															children: [
																"Society Leaders (",
																org.members?.length || 0,
																"/2)"
															]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "space-y-1",
															children: (org.members || []).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "font-semibold text-foreground",
																children: [
																	"• ",
																	m.user?.name,
																	" (",
																	m.user?.email,
																	")"
																]
															}, m.id))
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "border-t border-border/50 pt-3 flex items-center justify-between text-xs text-muted-foreground",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [org._count?.members || 0, " Members"] }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [org._count?.events || 0, " Events"] }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																	variant: "outline",
																	size: "sm",
																	className: "h-6 text-xs",
																	onClick: () => {
																		setSelectedRosterOrgId(org.id);
																		setActiveSection("members");
																	},
																	children: "Roster"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																	asChild: true,
																	variant: "ghost",
																	size: "sm",
																	className: "h-6 text-xs",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																		href: `/organizations/${org.slug}`,
																		target: "_blank",
																		rel: "noreferrer",
																		children: "View"
																	})
																})]
															})
														]
													})
												]
											}, org.id))
										})
									]
								}),
								activeSection === "verification" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminVerificationQueue, {
									universities: universitiesQuery.data?.data || [],
									faculties: facultiesQuery.data?.data || [],
									departments: departmentsQuery.data?.data || []
								}),
								activeSection === "organization-requests" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
											title: "Society Proposal Queue",
											description: "Review pending student organization creation requests, enforce founder-to-leader assignment, and grant approvals."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminFilterBar, {
											filters: orgsFilters,
											onFilterChange: setOrgsFilters,
											onReset: () => setOrgsFilters({}),
											totalRecords: orgsQuery.data?.total,
											loading: orgsQuery.isPending,
											universities: universitiesQuery.data?.data || [],
											showStatusFilter: false,
											searchPlaceholder: "Search proposed societies..."
										}),
										orgsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : orgsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => orgsQuery.refetch() }) : orgsQuery.data.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-6 text-emerald-500" }),
											title: "No pending society proposals",
											description: "All student club applications have been reviewed."
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid gap-4 sm:grid-cols-2",
											children: orgsQuery.data.data.map((org) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-border bg-card p-5 space-y-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex items-start justify-between gap-2",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-600 uppercase",
																children: "Pending Review"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
																className: "font-bold text-base text-foreground mt-1",
																children: org.name
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "text-xs text-muted-foreground",
																children: ["Proposed for ", org.university?.name || "Independent Network"]
															})
														] })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded bg-muted/40 p-3 text-xs",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-bold text-muted-foreground text-[10px] uppercase mb-0.5",
																children: "Founding Applicant"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "font-semibold text-foreground",
																children: [
																	org.requestedBy?.name,
																	" (",
																	org.requestedBy?.email,
																	")"
																]
															}),
															org.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-2 text-muted-foreground",
																children: org.description
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "border-t border-border/50 pt-3 flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															size: "sm",
															className: "flex-1 h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white",
															onClick: () => setReviewOrgDialog({
																id: org.id,
																name: org.name,
																type: "APPROVE"
															}),
															children: "Approve Proposal"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															variant: "outline",
															size: "sm",
															className: "h-8 text-xs text-destructive hover:bg-destructive/10",
															onClick: () => setReviewOrgDialog({
																id: org.id,
																name: org.name,
																type: "REJECT"
															}),
															children: "Reject"
														})]
													})
												]
											}, org.id))
										})
									]
								}),
								activeSection === "members" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminMemberRosters, {
									universities: universitiesQuery.data?.data || [],
									initialOrgId: selectedRosterOrgId
								}),
								activeSection === "events" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEventsTable, {
									universities: universitiesQuery.data?.data || [],
									categories: categoriesQuery.data || [],
									onCancelEvent: setCancelEventDialog
								}),
								activeSection === "teams" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminTeamsTable, {}),
								activeSection === "volunteering" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminVolunteeringTable, { universities: universitiesQuery.data?.data || [] }),
								activeSection === "reports" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminReportsTable, { onResolveReport: setResolveReportDialog }),
								activeSection === "categories" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCategoriesTable, { onCreateCategory: () => setCreateCategoryOpen(true) }),
								activeSection === "registrations" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminRegistrationsTable, {
									universities: universitiesQuery.data?.data || [],
									onCancelRegistration: (reg) => setCancelRegDialog(reg)
								}),
								activeSection === "tickets" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminTicketsTable, {}),
								activeSection === "attendance" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminAttendanceTable, { universities: universitiesQuery.data?.data || [] }),
								activeSection === "payments" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPaymentLedger, {}),
								activeSection === "announcements" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminAnnouncements, { universities: universitiesQuery.data?.data || [] }),
								activeSection === "audit-logs" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminAuditLogsTable, {}),
								activeSection === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
										title: "Platform Configuration",
										description: "Runtime platform settings, governance rules, email policies, and direct publishing permissions.",
										actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											onClick: handleSavePlatformSettings,
											disabled: busy,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4 mr-1.5" }), " Save Configuration"]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-card p-6 space-y-6 max-w-2xl",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-xs",
													children: "Platform Display Name"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: settingsPlatformName,
													onChange: (e) => setSettingsPlatformName(e.target.value),
													className: "text-xs"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-xs",
													children: "Support Contact Email"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "email",
													value: settingsSupportEmail,
													onChange: (e) => setSettingsSupportEmail(e.target.value),
													className: "text-xs"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between border-t border-border pt-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "text-sm font-bold text-foreground",
													children: "Direct Organizer Event Publishing"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground mt-0.5",
													children: "Allow verified society leaders to publish events without mandatory admin approval."
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
													checked: settingsDirectPublishing,
													onCheckedChange: setSettingsDirectPublishing
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between border-t border-border pt-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "text-sm font-bold text-foreground",
													children: "Maximum Society Leaders Rule"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground mt-0.5",
													children: "Strict 2-leader limit enforced by atomic database transactions."
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded bg-primary/10 px-2 py-1 text-xs font-bold text-primary",
													children: "2 Leaders (Locked)"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between border-t border-border pt-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "text-sm font-bold text-foreground",
													children: "Automatic Institutional Domain Verification"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground mt-0.5",
													children: "Automatically verify students when registering with authorized campus domains (@student.uoc.lk, etc.)."
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
													checked: settingsAutoDomainVerify,
													onCheckedChange: setSettingsAutoDomainVerify
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between border-t border-border pt-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "text-sm font-bold text-foreground",
													children: "System Maintenance Mode"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground mt-0.5",
													children: "Display maintenance notice on public exploration feed during scheduled migrations."
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
													checked: settingsMaintenanceMode,
													onCheckedChange: setSettingsMaintenanceMode
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "pt-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													onClick: handleSavePlatformSettings,
													disabled: busy,
													className: "w-full",
													children: "Save & Apply Settings"
												})
											})
										]
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: !!suspendUserDialog,
					onOpenChange: () => setSuspendUserDialog(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: suspendUserDialog?.currentStatus ? "Suspend User Account" : "Restore User Account" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: suspendUserDialog?.currentStatus ? `Are you sure you want to suspend ${suspendUserDialog?.name}? The user will be prevented from logging in or registering.` : `Restore full platform access for ${suspendUserDialog?.name}.` })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Reason for this action (recorded in audit trail)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: actionReason,
								onChange: (e) => setActionReason(e.target.value),
								placeholder: "e.g. Terms of service violation, repeated spamming...",
								className: "text-xs"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setSuspendUserDialog(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: suspendUserDialog?.currentStatus ? "destructive" : "default",
							onClick: handleToggleUserStatus,
							disabled: busy,
							children: suspendUserDialog?.currentStatus ? "Confirm Suspension" : "Confirm Restoration"
						})] })
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: !!changeRoleDialog,
					onOpenChange: () => setChangeRoleDialog(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Update User Role" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
							"Assign a new platform role for ",
							changeRoleDialog?.name,
							"."
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Select Role"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: newSelectedRole,
									onChange: (e) => setNewSelectedRole(e.target.value),
									className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "STUDENT",
											children: "STUDENT"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "ORGANIZER",
											children: "ORGANIZER"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "FACULTY",
											children: "FACULTY"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "UNIVERSITY_ADMIN",
											children: "UNIVERSITY_ADMIN"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "ADMIN",
											children: "ADMIN"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Reason"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: actionReason,
									onChange: (e) => setActionReason(e.target.value),
									placeholder: "Reason for role change...",
									className: "text-xs"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setChangeRoleDialog(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleChangeUserRole,
							disabled: busy,
							children: "Update Role"
						})] })
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: createAdminOpen,
					onOpenChange: setCreateAdminOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add Administrator" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Grant administrative governance privileges to a new or existing user account." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleCreateAdmin,
						className: "space-y-3.5 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									value: newAdminName,
									onChange: (e) => setNewAdminName(e.target.value),
									placeholder: "e.g. Dr. Nihal Gunawardena",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Email Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									type: "email",
									value: newAdminEmail,
									onChange: (e) => setNewAdminEmail(e.target.value),
									placeholder: "e.g. admin@uoc.lk",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Administrative Role"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: newAdminRole,
									onChange: (e) => setNewAdminRole(e.target.value),
									className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "ADMIN",
											children: "ADMIN (Platform Moderator)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "UNIVERSITY_ADMIN",
											children: "UNIVERSITY_ADMIN (Campus-Scoped)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "SUPER_ADMIN",
											children: "SUPER_ADMIN (Full Platform Superuser)"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => setCreateAdminOpen(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: busy,
									children: "Create Administrator"
								})]
							})
						]
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: createUniOpen,
					onOpenChange: setCreateUniOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add University Campus" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Onboard a new academic institution into the CampusPulse network." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleCreateUniversity,
						className: "space-y-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "University Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									value: newUniName,
									onChange: (e) => setNewUniName(e.target.value),
									placeholder: "e.g. University of Peradeniya",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Institution Code"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: newUniCode,
										onChange: (e) => setNewUniCode(e.target.value),
										placeholder: "e.g. UOP",
										className: "text-xs"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "City"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: newUniCity,
										onChange: (e) => setNewUniCity(e.target.value),
										placeholder: "e.g. Peradeniya",
										className: "text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Primary Email Domain"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: newUniDomain,
									onChange: (e) => setNewUniDomain(e.target.value),
									placeholder: "e.g. pdn.ac.lk",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => setCreateUniOpen(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: busy,
									children: "Save University"
								})]
							})
						]
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: !!addDomainDialogUni,
					onOpenChange: () => setAddDomainDialogUni(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Authorize Email Domain" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
						"Add student or staff email domain for ",
						addDomainDialogUni?.name,
						"."
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleAddDomain,
						className: "space-y-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Domain"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								value: newEmailDomain,
								onChange: (e) => setNewEmailDomain(e.target.value),
								placeholder: "e.g. eng.pdn.ac.lk",
								className: "text-xs"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setAddDomainDialogUni(null),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: busy,
								children: "Authorize Domain"
							})]
						})]
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: createFacultyOpen,
					onOpenChange: setCreateFacultyOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add Academic Faculty" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Create a faculty division under a verified university campus." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleCreateFaculty,
						className: "space-y-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Parent University"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									required: true,
									value: newFacultyUniId,
									onChange: (e) => setNewFacultyUniId(e.target.value),
									className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select University..."
									}), (universitiesQuery.data?.data || []).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: u.id,
										children: [
											u.name,
											" (",
											u.code,
											")"
										]
									}, u.id))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Faculty Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									value: newFacultyName,
									onChange: (e) => setNewFacultyName(e.target.value),
									placeholder: "e.g. Faculty of Engineering",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Faculty Code"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: newFacultyCode,
										onChange: (e) => setNewFacultyCode(e.target.value),
										placeholder: "e.g. FOE",
										className: "text-xs"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Slug"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: newFacultySlug,
										onChange: (e) => setNewFacultySlug(e.target.value),
										placeholder: "e.g. engineering",
										className: "text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Description (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: newFacultyDesc,
									onChange: (e) => setNewFacultyDesc(e.target.value),
									placeholder: "Academic overview...",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => setCreateFacultyOpen(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: busy,
									children: "Create Faculty"
								})]
							})
						]
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: createDeptOpen,
					onOpenChange: setCreateDeptOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add Academic Department" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Create a department within an established faculty division." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleCreateDepartment,
						className: "space-y-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Parent Faculty"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									required: true,
									value: newDeptFacultyId,
									onChange: (e) => setNewDeptFacultyId(e.target.value),
									className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select Faculty..."
									}), (universitiesQuery.data?.data || []).flatMap((u) => (u.faculties || []).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: f.id,
										children: [
											u.code,
											" — ",
											f.name,
											" (",
											f.code,
											")"
										]
									}, f.id)))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Department Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									value: newDeptName,
									onChange: (e) => setNewDeptName(e.target.value),
									placeholder: "e.g. Department of Computer Engineering",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Department Code"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: newDeptCode,
										onChange: (e) => setNewDeptCode(e.target.value),
										placeholder: "e.g. DEPT-CE",
										className: "text-xs"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Slug"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: newDeptSlug,
										onChange: (e) => setNewDeptSlug(e.target.value),
										placeholder: "e.g. computer-engineering",
										className: "text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => setCreateDeptOpen(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: busy,
									children: "Create Department"
								})]
							})
						]
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: !!changeMemberRoleDialog,
					onOpenChange: () => setChangeMemberRoleDialog(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Update Society Committee Position" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
							"Assign organization role for ",
							changeMemberRoleDialog?.name,
							"."
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Select Role"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: newMemberRole,
									onChange: (e) => setNewMemberRole(e.target.value),
									className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "MEMBER",
											children: "MEMBER (Standard Member)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "EVENT_ORGANIZER",
											children: "EVENT_ORGANIZER (Can create & manage events)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "TREASURER",
											children: "TREASURER (Finance Officer)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "SECRETARY",
											children: "SECRETARY (Executive Committee)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "VICE_PRESIDENT",
											children: "VICE_PRESIDENT (Committee)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "LEADER",
											children: "LEADER / PRESIDENT (Max 2 Active Leaders)"
										})
									]
								})]
							}), ["LEADER", "PRESIDENT"].includes(newMemberRole) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-amber-600 bg-amber-500/10 p-2 rounded",
								children: "⚠️ Note: Institutional governance rules strictly limit each society to a maximum of 2 active leaders."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setChangeMemberRoleDialog(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleChangeMemberRole,
							disabled: busy,
							children: "Confirm Role Change"
						})] })
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: !!removeMemberDialog,
					onOpenChange: () => setRemoveMemberDialog(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Remove Society Member" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
						"Are you sure you want to remove ",
						removeMemberDialog?.name,
						" from this organization?"
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setRemoveMemberDialog(null),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						onClick: handleRemoveMember,
						disabled: busy,
						children: "Confirm Removal"
					})] })] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: !!reviewOrgDialog,
					onOpenChange: () => setReviewOrgDialog(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: reviewOrgDialog?.type === "APPROVE" ? "Approve Society Proposal" : "Reject Society Proposal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: reviewOrgDialog?.type === "APPROVE" ? `Authorize "${reviewOrgDialog?.name}" to become an active university student organization.` : `Reject proposal for "${reviewOrgDialog?.name}".` })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Feedback / Governance Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: orgReviewNotes,
								onChange: (e) => setOrgReviewNotes(e.target.value),
								placeholder: "Review notes provided to founding applicant...",
								className: "text-xs"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setReviewOrgDialog(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: reviewOrgDialog?.type === "APPROVE" ? "default" : "destructive",
							onClick: handleReviewOrg,
							disabled: busy,
							children: reviewOrgDialog?.type === "APPROVE" ? "Approve & Authorize" : "Confirm Rejection"
						})] })
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: !!respondVerifDialog,
					onOpenChange: () => setRespondVerifDialog(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: respondVerifDialog?.type === "APPROVED" ? "Approve Verification" : "Reject Verification" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: respondVerifDialog?.type === "APPROVED" ? `Grant official verified credentials for ${respondVerifDialog?.orgName}.` : `Reject verification request for ${respondVerifDialog?.orgName}.` })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Verification Review Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: verifReviewNotes,
								onChange: (e) => setVerifReviewNotes(e.target.value),
								placeholder: "Notes sent to applicant...",
								className: "text-xs"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setRespondVerifDialog(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: respondVerifDialog?.type === "APPROVED" ? "default" : "destructive",
							onClick: handleRespondVerification,
							disabled: busy,
							children: respondVerifDialog?.type === "APPROVED" ? "Grant Verification" : "Confirm Rejection"
						})] })
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: !!rejectEventDialog,
					onOpenChange: () => setRejectEventDialog(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Reject Event Listing" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
							"Provide required feedback for \"",
							rejectEventDialog?.title,
							"\"."
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Feedback for Organizers"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								required: true,
								value: actionReason,
								onChange: (e) => setActionReason(e.target.value),
								placeholder: "Explain what needs to be updated before publication...",
								className: "text-xs"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setRejectEventDialog(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							onClick: handleRejectEvent,
							disabled: busy,
							children: "Confirm Rejection"
						})] })
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: !!cancelEventDialog,
					onOpenChange: () => setCancelEventDialog(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Cancel Published Opportunity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
							"Cancel \"",
							cancelEventDialog?.title,
							"\". This will revoke active tickets and mark the event as cancelled."
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Cancellation Reason"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: actionReason,
								onChange: (e) => setActionReason(e.target.value),
								placeholder: "Reason for cancellation...",
								className: "text-xs"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setCancelEventDialog(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							onClick: handleCancelEvent,
							disabled: busy,
							children: "Confirm Cancellation"
						})] })
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: !!cancelRegDialog,
					onOpenChange: () => setCancelRegDialog(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Cancel Event Registration" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
							"Cancel registration for ",
							cancelRegDialog?.userName,
							" on ",
							cancelRegDialog?.eventTitle,
							"."
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Reason"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: cancelRegReason,
								onChange: (e) => setCancelRegReason(e.target.value),
								placeholder: "Reason for cancellation...",
								className: "text-xs"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setCancelRegDialog(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							onClick: handleCancelRegistration,
							disabled: busy,
							children: "Confirm Cancellation"
						})] })
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: createAnnouncementOpen,
					onOpenChange: setCreateAnnouncementOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Broadcast Platform Announcement" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Publish a system announcement to targeted users across CampusPulse." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleCreateAnnouncement,
						className: "space-y-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Announcement Title"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									value: annTitle,
									onChange: (e) => setAnnTitle(e.target.value),
									placeholder: "e.g. Scheduled System Maintenance",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Message"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									required: true,
									value: annMessage,
									onChange: (e) => setAnnMessage(e.target.value),
									placeholder: "Detailed announcement content...",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Audience"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: annAudience,
										onChange: (e) => setAnnAudience(e.target.value),
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "ALL",
												children: "Everyone"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "STUDENTS",
												children: "Students Only"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "ORGANIZERS",
												children: "Organizers Only"
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Priority"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: annPriority,
										onChange: (e) => setAnnPriority(e.target.value),
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "NORMAL",
												children: "Normal"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "HIGH",
												children: "High Priority"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "URGENT",
												children: "Urgent Alert"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => setCreateAnnouncementOpen(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: busy,
									children: "Broadcast"
								})]
							})
						]
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: createCategoryOpen,
					onOpenChange: setCreateCategoryOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add Opportunity Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Create a new taxonomy category for hackathons, workshops, and student events." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleCreateCategory,
						className: "space-y-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Category Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									value: newCatName,
									onChange: (e) => setNewCatName(e.target.value),
									placeholder: "e.g. AI & Machine Learning",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Category Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: newCatType,
									onChange: (e) => setNewCatType(e.target.value),
									className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "HACKATHON",
											children: "HACKATHON"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "WORKSHOP",
											children: "WORKSHOP"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "VOLUNTEERING",
											children: "VOLUNTEERING"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "CAREER_FAIR",
											children: "CAREER_FAIR"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "CULTURAL",
											children: "CULTURAL"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "SPORTS",
											children: "SPORTS"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "OTHER",
											children: "OTHER"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Description (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: newCatDesc,
									onChange: (e) => setNewCatDesc(e.target.value),
									placeholder: "Category purpose...",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => setCreateCategoryOpen(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: busy,
									children: "Create Category"
								})]
							})
						]
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: !!resolveReportDialog,
					onOpenChange: () => setResolveReportDialog(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Resolve Moderation Report" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Record moderator action and resolution notes for this item." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Action Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: reportActionNotes,
								onChange: (e) => setReportActionNotes(e.target.value),
								placeholder: "Details of action taken...",
								className: "text-xs"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setResolveReportDialog(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleResolveReport,
							disabled: busy,
							children: "Confirm Resolution"
						})] })
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: !!inspectUserId,
					onOpenChange: () => setInspectUserId(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						className: "max-w-2xl max-h-[85vh] overflow-y-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "User Profile & Activity Dossier" }) }), userDetailQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : userDetailQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-base font-bold text-foreground",
										children: userDetailQuery.data.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: userDetailQuery.data.email
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("rounded-full px-2.5 py-1 text-xs font-bold uppercase", userDetailQuery.data.isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"),
										children: userDetailQuery.data.isActive ? "Active Account" : "Suspended"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-muted-foreground uppercase text-[10px]",
											children: "University Identity"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-foreground mt-0.5",
											children: userDetailQuery.data.university?.name || "Independent"
										}),
										userDetailQuery.data.studentProfile?.faculty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground",
											children: userDetailQuery.data.studentProfile.faculty.name
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-muted-foreground uppercase text-[10px]",
										children: "Verification Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-emerald-600 mt-0.5",
										children: userDetailQuery.data.universityEmailVerified ? "🎓 Institutional Verified" : "Unverified"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-bold text-muted-foreground uppercase text-[10px] mb-2",
										children: [
											"Society Affiliations (",
											userDetailQuery.data.organizationMembers?.length || 0,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1",
										children: userDetailQuery.data.organizationMembers?.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-foreground",
											children: [
												"• ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold",
													children: m.organization?.name
												}),
												" (",
												m.role,
												")"
											]
										}, m.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-bold text-muted-foreground uppercase text-[10px] mb-2",
										children: [
											"Recent Event RSVPs (",
											userDetailQuery.data.eventRegistrations?.length || 0,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1",
										children: userDetailQuery.data.eventRegistrations?.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-foreground",
											children: [
												"• ",
												r.event?.title,
												" (",
												r.status,
												")"
											]
										}, r.id))
									})]
								})
							]
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { AdminPage as component };
