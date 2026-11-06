import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Award,
  BadgeAlert,
  BarChart3,
  Bell,
  Building,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  CreditCard,
  Eye,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Filter,
  Flag,
  Globe,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  History,
  Layers,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Megaphone,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  Server,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  Tag,
  Ticket,
  Trash2,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  UserX,
  X,
  XCircle,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RequireRole } from "@/components/shell/RequireRole";
import { StatusBadge } from "@/components/common/Badges";
import { EmptyState, ErrorState, PageHeader, RowSkeleton, StatCard } from "@/components/common/States";
import { useAuth } from "@/lib/auth";
import { adminApi, type GlobalSearchResult } from "@/lib/api/admin";
import { formatDate, formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";
import { AdminFilterBar, type AdminFilterState } from "@/components/admin/AdminFilterBar";
import { AdminReportsCenter } from "@/components/admin/AdminReportsCenter";
import { AdminVerificationQueue } from "@/components/admin/AdminVerificationQueue";
import { AdminUniversities } from "@/components/admin/AdminUniversities";
import { AdminFaculties } from "@/components/admin/AdminFaculties";
import { AdminDepartments } from "@/components/admin/AdminDepartments";
import { AdminMemberRosters } from "@/components/admin/AdminMemberRosters";
import { AdminPaymentLedger } from "@/components/admin/AdminPaymentLedger";
import { AdminAnnouncements } from "@/components/admin/AdminAnnouncements";
import { AdminUsersTable } from "@/components/admin/AdminUsersTable";
import { AdminStudentsTable } from "@/components/admin/AdminStudentsTable";
import { AdminOrganizersTable } from "@/components/admin/AdminOrganizersTable";
import { AdminAdministratorsTable } from "@/components/admin/AdminAdministratorsTable";
import { AdminEventsTable } from "@/components/admin/AdminEventsTable";
import { AdminTeamsTable } from "@/components/admin/AdminTeamsTable";
import { AdminVolunteeringTable } from "@/components/admin/AdminVolunteeringTable";
import { AdminReportsTable } from "@/components/admin/AdminReportsTable";
import { AdminCategoriesTable } from "@/components/admin/AdminCategoriesTable";
import { AdminRegistrationsTable } from "@/components/admin/AdminRegistrationsTable";
import { AdminTicketsTable } from "@/components/admin/AdminTicketsTable";
import { AdminAttendanceTable } from "@/components/admin/AdminAttendanceTable";
import { AdminAuditLogsTable } from "@/components/admin/AdminAuditLogsTable";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "CampusPulse Control Center — Platform Administration" },
      { name: "description", content: "Global governance, user management, moderation, transactions, and system settings." },
      { property: "og:title", content: "Platform Administration — CampusPulse" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type AdminSection =
  | "dashboard"
  | "analytics"
  | "reports-center"
  | "system-health"
  | "users"
  | "students"
  | "organizers"
  | "administrators"
  | "verification"
  | "universities"
  | "faculties"
  | "departments"
  | "societies"
  | "organization-requests"
  | "members"
  | "events"
  | "teams"
  | "volunteering"
  | "reports"
  | "categories"
  | "registrations"
  | "tickets"
  | "attendance"
  | "payments"
  | "announcements"
  | "audit-logs"
  | "settings";

const CHART_COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6", "#3B82F6"];

function AdminPage() {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Navigation State
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global Search State
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [globalSearchResults, setGlobalSearchResults] = useState<GlobalSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Modals & Action States
  const [actionReason, setActionReason] = useState("");
  const [busy, setBusy] = useState(false);

  // User Detail Inspection Modal
  const [inspectUserId, setInspectUserId] = useState<string | null>(null);
  const [suspendUserDialog, setSuspendUserDialog] = useState<{ id: string; name: string; currentStatus: boolean } | null>(null);
  const [changeRoleDialog, setChangeRoleDialog] = useState<{ id: string; name: string; currentRole: string } | null>(null);
  const [newSelectedRole, setNewSelectedRole] = useState("STUDENT");

  // Admin Management Dialogs
  const [createAdminOpen, setCreateAdminOpen] = useState(false);
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminRole, setNewAdminRole] = useState("ADMIN");
  const [newAdminUniId, setNewAdminUniId] = useState("");

  // University, Faculty & Department Dialogs
  const [createUniOpen, setCreateUniOpen] = useState(false);
  const [newUniName, setNewUniName] = useState("");
  const [newUniSlug, setNewUniSlug] = useState("");
  const [newUniCode, setNewUniCode] = useState("");
  const [newUniCity, setNewUniCity] = useState("Colombo");
  const [newUniDomain, setNewUniDomain] = useState("");

  const [addDomainDialogUni, setAddDomainDialogUni] = useState<{ id: string; name: string } | null>(null);
  const [newEmailDomain, setNewEmailDomain] = useState("");

  const [createFacultyOpen, setCreateFacultyOpen] = useState(false);
  const [newFacultyName, setNewFacultyName] = useState("");
  const [newFacultyCode, setNewFacultyCode] = useState("");
  const [newFacultySlug, setNewFacultySlug] = useState("");
  const [newFacultyUniId, setNewFacultyUniId] = useState("");
  const [newFacultyDesc, setNewFacultyDesc] = useState("");

  const [createDeptOpen, setCreateDeptOpen] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptCode, setNewDeptCode] = useState("");
  const [newDeptSlug, setNewDeptSlug] = useState("");
  const [newDeptFacultyId, setNewDeptFacultyId] = useState("");
  const [newDeptDesc, setNewDeptDesc] = useState("");

  // Event Moderation Dialogs
  const [rejectEventDialog, setRejectEventDialog] = useState<{ id: string; title: string } | null>(null);
  const [cancelEventDialog, setCancelEventDialog] = useState<{ id: string; title: string } | null>(null);

  // Organization Review Dialogs
  const [reviewOrgDialog, setReviewOrgDialog] = useState<{ id: string; name: string; type: "APPROVE" | "REJECT" } | null>(null);
  const [orgReviewNotes, setOrgReviewNotes] = useState("");
  const [orgMarkVerified, setOrgMarkVerified] = useState(true);

  // Member Roster Dialogs & State
  const [selectedRosterOrgId, setSelectedRosterOrgId] = useState<string>("");
  const [changeMemberRoleDialog, setChangeMemberRoleDialog] = useState<{ orgId: string; memberId: string; name: string; currentRole: string } | null>(null);
  const [newMemberRole, setNewMemberRole] = useState("MEMBER");
  const [removeMemberDialog, setRemoveMemberDialog] = useState<{ orgId: string; memberId: string; name: string } | null>(null);

  // Verification Dialog
  const [respondVerifDialog, setRespondVerifDialog] = useState<{ id: string; orgName: string; type: "APPROVED" | "REJECTED" } | null>(null);
  const [verifReviewNotes, setVerifReviewNotes] = useState("");

  // Registration Dialog
  const [cancelRegDialog, setCancelRegDialog] = useState<{ id: string; userName: string; eventTitle: string } | null>(null);
  const [cancelRegReason, setCancelRegReason] = useState("");

  // Announcement Dialog
  const [createAnnouncementOpen, setCreateAnnouncementOpen] = useState(false);
  const [annTitle, setAnnTitle] = useState("");
  const [annMessage, setAnnMessage] = useState("");
  const [annAudience, setAnnAudience] = useState("ALL");
  const [annPriority, setAnnPriority] = useState("NORMAL");
  const [annLinkUrl, setAnnLinkUrl] = useState("");

  // Report Resolution Dialog
  const [resolveReportDialog, setResolveReportDialog] = useState<{ id: string; reason: string; status: "RESOLVED" | "DISMISSED" } | null>(null);
  const [reportActionNotes, setReportActionNotes] = useState("");

  // Category Dialog
  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatType, setNewCatType] = useState("OTHER");
  const [newCatDesc, setNewCatDesc] = useState("");

  // Settings State
  const [settingsDirectPublishing, setSettingsDirectPublishing] = useState(true);
  const [settingsAutoDomainVerify, setSettingsAutoDomainVerify] = useState(true);
  const [settingsMaintenanceMode, setSettingsMaintenanceMode] = useState(false);
  const [settingsSupportEmail, setSettingsSupportEmail] = useState("support@campuspulse.lk");
  const [settingsPlatformName, setSettingsPlatformName] = useState("CampusPulse");

  // Domain Filter States
  const [dashboardFilters, setDashboardFilters] = useState<AdminFilterState>({});
  const [analyticsPeriod, setAnalyticsPeriod] = useState("30d");
  const [usersFilters, setUsersFilters] = useState<AdminFilterState>({});
  const [adminsFilters, setAdminsFilters] = useState<AdminFilterState>({});
  const [verificationsFilters, setVerificationsFilters] = useState<AdminFilterState>({});
  const [unisFilters, setUnisFilters] = useState<AdminFilterState>({});
  const [facultiesFilters, setFacultiesFilters] = useState<AdminFilterState>({});
  const [deptsFilters, setDeptsFilters] = useState<AdminFilterState>({});
  const [orgsFilters, setOrgsFilters] = useState<AdminFilterState>({});
  const [eventsFilters, setEventsFilters] = useState<AdminFilterState>({});
  const [teamsFilters, setTeamsFilters] = useState<AdminFilterState>({});
  const [volunteeringFilters, setVolunteeringFilters] = useState<AdminFilterState>({});
  const [reportsFilters, setReportsFilters] = useState<AdminFilterState>({});
  const [categoriesFilters, setCategoriesFilters] = useState<AdminFilterState>({});
  const [registrationsFilters, setRegistrationsFilters] = useState<AdminFilterState>({});
  const [ticketsFilters, setTicketsFilters] = useState<AdminFilterState>({});
  const [attendanceFilters, setAttendanceFilters] = useState<AdminFilterState>({});
  const [paymentsFilters, setPaymentsFilters] = useState<AdminFilterState>({});
  const [announcementsFilters, setAnnouncementsFilters] = useState<AdminFilterState>({});
  const [auditLogsFilters, setAuditLogsFilters] = useState<AdminFilterState>({ sortBy: "createdAt", sortOrder: "desc" });

  // ---------------------------------------------------------------------------
  // Queries
  // ---------------------------------------------------------------------------

  const dashboardQuery = useQuery({
    queryKey: ["admin", "dashboard", dashboardFilters],
    queryFn: () => adminApi.getDashboard(dashboardFilters),
  });

  const analyticsQuery = useQuery({
    queryKey: ["admin", "analytics", analyticsPeriod],
    queryFn: () => adminApi.getAnalytics(analyticsPeriod),
  });

  const systemHealthQuery = useQuery({
    queryKey: ["admin", "system-health"],
    queryFn: () => adminApi.getSystemHealth(),
    enabled: activeSection === "system-health" || activeSection === "dashboard",
  });

  const usersQuery = useQuery({
    queryKey: ["admin", "users", usersFilters, activeSection],
    queryFn: () => {
      let role = usersFilters.status || undefined;
      if (activeSection === "students") role = "STUDENT";
      if (activeSection === "organizers") role = "ORGANIZER";
      return adminApi.getUsers({
        ...usersFilters,
        role,
        limit: 50,
      });
    },
    enabled: activeSection === "users" || activeSection === "students" || activeSection === "organizers",
  });

  const userDetailQuery = useQuery({
    queryKey: ["admin", "user-detail", inspectUserId],
    queryFn: () => adminApi.getUserDetails(inspectUserId!),
    enabled: !!inspectUserId,
  });

  const adminsQuery = useQuery({
    queryKey: ["admin", "administrators", adminsFilters],
    queryFn: () => adminApi.getAdministrators(adminsFilters),
    enabled: activeSection === "administrators",
  });

  const universitiesQuery = useQuery({
    queryKey: ["admin", "universities", unisFilters],
    queryFn: () => adminApi.getUniversities(unisFilters),
    enabled: true,
  });

  const facultiesQuery = useQuery({
    queryKey: ["admin", "faculties", facultiesFilters],
    queryFn: () => adminApi.getFaculties(facultiesFilters),
    enabled: activeSection === "faculties" || createDeptOpen,
  });

  const departmentsQuery = useQuery({
    queryKey: ["admin", "departments", deptsFilters],
    queryFn: () => adminApi.getDepartments(deptsFilters),
    enabled: activeSection === "departments",
  });

  const orgsQuery = useQuery({
    queryKey: ["admin", "organizations", orgsFilters, activeSection],
    queryFn: () => {
      let status = orgsFilters.status || undefined;
      if (activeSection === "organization-requests") status = "PENDING";
      return adminApi.getOrganizations({
        ...orgsFilters,
        status,
        limit: 50,
      });
    },
    enabled:
      activeSection === "societies" ||
      activeSection === "organization-requests" ||
      activeSection === "members" ||
      activeSection === "reports-center",
  });

  // Selected Organization ID (for Member Rosters)
  useEffect(() => {
    const firstOrgId = orgsQuery.data?.data?.[0]?.id;
    if (activeSection === "members" && !selectedRosterOrgId && firstOrgId) {
      setSelectedRosterOrgId(firstOrgId);
    }
  }, [activeSection, selectedRosterOrgId, orgsQuery.data]);

  const verificationsQuery = useQuery({
    queryKey: ["admin", "verifications", verificationsFilters],
    queryFn: () => adminApi.getVerifications(verificationsFilters),
    enabled: activeSection === "verification",
  });

  const eventsQuery = useQuery({
    queryKey: ["admin", "events", eventsFilters],
    queryFn: () =>
      adminApi.getEvents({
        ...eventsFilters,
        limit: 50,
      }),
    enabled: activeSection === "events",
  });

  const teamsQuery = useQuery({
    queryKey: ["admin", "teams", teamsFilters],
    queryFn: () => adminApi.getTeams(teamsFilters),
    enabled: activeSection === "teams",
  });

  const volunteeringQuery = useQuery({
    queryKey: ["admin", "volunteering", volunteeringFilters],
    queryFn: () => adminApi.getVolunteering(volunteeringFilters),
    enabled: activeSection === "volunteering",
  });

  const registrationsQuery = useQuery({
    queryKey: ["admin", "registrations", registrationsFilters],
    queryFn: () => adminApi.getRegistrations(registrationsFilters),
    enabled: activeSection === "registrations",
  });

  const ticketsQuery = useQuery({
    queryKey: ["admin", "tickets", ticketsFilters],
    queryFn: () => adminApi.getTickets(ticketsFilters),
    enabled: activeSection === "tickets",
  });

  const attendanceQuery = useQuery({
    queryKey: ["admin", "attendance", attendanceFilters],
    queryFn: () => adminApi.getAttendance(attendanceFilters),
    enabled: activeSection === "attendance",
  });

  const paymentsQuery = useQuery({
    queryKey: ["admin", "payments", paymentsFilters],
    queryFn: () => adminApi.getPayments(paymentsFilters),
    enabled: activeSection === "payments",
  });

  const reportsQuery = useQuery({
    queryKey: ["admin", "reports", reportsFilters],
    queryFn: () => adminApi.getReports(reportsFilters),
    enabled: activeSection === "reports",
  });

  const auditLogsQuery = useQuery({
    queryKey: ["admin", "audit-logs", auditLogsFilters],
    queryFn: () => adminApi.getAuditLogs({ ...auditLogsFilters, limit: 50 }),
    enabled: activeSection === "audit-logs",
  });

  const settingsQuery = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: () => adminApi.getSettings(),
    enabled: activeSection === "settings",
  });

  useEffect(() => {
    if (settingsQuery.data?.settings) {
      const s = settingsQuery.data.settings;
      if (s["directPublishingEnabled"] !== undefined) setSettingsDirectPublishing(s["directPublishingEnabled"] === "true");
      if (s["autoVerifyUniversityDomains"] !== undefined) setSettingsAutoDomainVerify(s["autoVerifyUniversityDomains"] === "true");
      if (s["maintenanceMode"] !== undefined) setSettingsMaintenanceMode(s["maintenanceMode"] === "true");
      if (s["supportEmail"]) setSettingsSupportEmail(s["supportEmail"]);
      if (s["platformName"]) setSettingsPlatformName(s["platformName"]);
    }
  }, [settingsQuery.data]);

  const categoriesQuery = useQuery({
    queryKey: ["admin", "categories", categoriesFilters],
    queryFn: () => adminApi.getCategories(categoriesFilters),
    enabled: true,
  });

  // ---------------------------------------------------------------------------
  // Global Search Handler
  // ---------------------------------------------------------------------------

  const handleGlobalSearch = async (e: React.FormEvent) => {
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

  // ---------------------------------------------------------------------------
  // Action Handlers
  // ---------------------------------------------------------------------------

  const handleToggleUserStatus = async () => {
    if (!suspendUserDialog) return;
    setBusy(true);
    try {
      const nextActive = !suspendUserDialog.currentStatus;
      await adminApi.updateUserStatus(suspendUserDialog.id, nextActive, actionReason.trim() || undefined);
      toast.success(nextActive ? "Account restored" : "Account suspended", {
        description: `Status updated for ${suspendUserDialog.name}.`,
      });
      setSuspendUserDialog(null);
      setActionReason("");
      void usersQuery.refetch();
      void dashboardQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update account status");
    } finally {
      setBusy(false);
    }
  };

  const handleChangeUserRole = async () => {
    if (!changeRoleDialog) return;
    setBusy(true);
    try {
      await adminApi.updateUserRole(changeRoleDialog.id, newSelectedRole, actionReason.trim() || undefined);
      toast.success(`Role changed to ${newSelectedRole}`, {
        description: `Updated permissions for ${changeRoleDialog.name}.`,
      });
      setChangeRoleDialog(null);
      setActionReason("");
      void usersQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update role");
    } finally {
      setBusy(false);
    }
  };

  const handleManualVerifyUser = async (id: string, name: string) => {
    try {
      await adminApi.verifyUserIdentity(id, "Administrative verification override");
      toast.success(`Verified ${name}! 🎓`, { description: "Institutional student status confirmed." });
      void usersQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to verify identity");
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await adminApi.createAdministrator({
        name: newAdminName.trim(),
        email: newAdminEmail.trim(),
        role: newAdminRole,
        universityId: newAdminUniId || undefined,
        reason: "Admin Control Center invitation",
      });
      toast.success(`Administrator created: ${newAdminName}`);
      setCreateAdminOpen(false);
      setNewAdminName("");
      setNewAdminEmail("");
      void adminsQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to create administrator");
    } finally {
      setBusy(false);
    }
  };

  const handleRemoveAdmin = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to revoke administrator privileges from ${name}?`)) return;
    try {
      await adminApi.removeAdministrator(id);
      toast.success(`Revoked admin privileges from ${name}`);
      void adminsQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to remove administrator");
    }
  };

  const handleCreateUniversity = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await adminApi.createUniversity({
        name: newUniName.trim(),
        slug: newUniSlug.trim() || newUniName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        code: newUniCode.trim().toUpperCase(),
        city: newUniCity.trim(),
        domain: newUniDomain.trim() || undefined,
      });
      toast.success(`University added: ${newUniName}`);
      setCreateUniOpen(false);
      setNewUniName("");
      setNewUniSlug("");
      setNewUniCode("");
      setNewUniDomain("");
      void universitiesQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to create university");
    } finally {
      setBusy(false);
    }
  };

  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addDomainDialogUni || !newEmailDomain.trim()) return;
    setBusy(true);
    try {
      await adminApi.addUniversityDomain(addDomainDialogUni.id, newEmailDomain.trim(), false);
      toast.success(`Domain @${newEmailDomain} authorized for ${addDomainDialogUni.name}`);
      setAddDomainDialogUni(null);
      setNewEmailDomain("");
      void universitiesQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to add domain");
    } finally {
      setBusy(false);
    }
  };

  const handleCreateFaculty = async (e: React.FormEvent) => {
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
        description: newFacultyDesc.trim() || undefined,
      });
      toast.success(`Faculty "${newFacultyName}" created!`);
      setCreateFacultyOpen(false);
      setNewFacultyName("");
      setNewFacultyCode("");
      setNewFacultySlug("");
      setNewFacultyDesc("");
      void universitiesQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to create faculty");
    } finally {
      setBusy(false);
    }
  };

  const handleCreateDepartment = async (e: React.FormEvent) => {
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
        description: newDeptDesc.trim() || undefined,
      });
      toast.success(`Department "${newDeptName}" created!`);
      setCreateDeptOpen(false);
      setNewDeptName("");
      setNewDeptCode("");
      setNewDeptSlug("");
      setNewDeptDesc("");
      void universitiesQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to create department");
    } finally {
      setBusy(false);
    }
  };

  const handleApproveEvent = async (id: string, title: string) => {
    try {
      await adminApi.approveEvent(id);
      toast.success(`Published "${title}"`, { description: "Opportunity is live for all students." });
      void eventsQuery.refetch();
      void dashboardQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to approve opportunity");
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
      void eventsQuery.refetch();
      void dashboardQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to reject opportunity");
    } finally {
      setBusy(false);
    }
  };

  const handleCancelEvent = async () => {
    if (!cancelEventDialog) return;
    setBusy(true);
    try {
      await adminApi.cancelEvent(cancelEventDialog.id, actionReason.trim() || undefined);
      toast.success(`Cancelled "${cancelEventDialog.title}"`);
      setCancelEventDialog(null);
      setActionReason("");
      void eventsQuery.refetch();
      void dashboardQuery.refetch();
    } catch (err: any) {
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
        notes: orgReviewNotes.trim() || undefined,
        isVerified: orgMarkVerified,
      });
      toast.success(
        reviewOrgDialog.type === "APPROVE"
          ? `Approved "${reviewOrgDialog.name}"! 🎉`
          : `Rejected "${reviewOrgDialog.name}"`,
      );
      setReviewOrgDialog(null);
      setOrgReviewNotes("");
      void orgsQuery.refetch();
      void dashboardQuery.refetch();
    } catch (err: any) {
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
        reason: "Administrative roster adjustment",
      });
      toast.success(`Member role updated to ${newMemberRole}`);
      setChangeMemberRoleDialog(null);
      void queryClient.invalidateQueries({ queryKey: ["admin", "organizations"] });
    } catch (err: any) {
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
      void queryClient.invalidateQueries({ queryKey: ["admin", "organizations"] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to remove member");
    } finally {
      setBusy(false);
    }
  };

  const handleRespondVerification = async () => {
    if (!respondVerifDialog) return;
    setBusy(true);
    try {
      await adminApi.respondVerification(respondVerifDialog.id, respondVerifDialog.type, verifReviewNotes.trim() || undefined);
      toast.success(`Verification ${respondVerifDialog.type.toLowerCase()}`);
      setRespondVerifDialog(null);
      setVerifReviewNotes("");
      void verificationsQuery.refetch();
      void dashboardQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to respond to verification request");
    } finally {
      setBusy(false);
    }
  };

  const handleCancelRegistration = async () => {
    if (!cancelRegDialog) return;
    setBusy(true);
    try {
      await adminApi.cancelRegistration(cancelRegDialog.id, cancelRegReason.trim() || undefined);
      toast.success(`Registration cancelled for ${cancelRegDialog.userName}`);
      setCancelRegDialog(null);
      setCancelRegReason("");
      void registrationsQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to cancel registration");
    } finally {
      setBusy(false);
    }
  };

  const handleResolveReport = async () => {
    if (!resolveReportDialog) return;
    setBusy(true);
    try {
      await adminApi.resolveReport(
        resolveReportDialog.id,
        resolveReportDialog.status,
        reportActionNotes.trim() || undefined,
      );
      toast.success(`Report marked as ${resolveReportDialog.status}`);
      setResolveReportDialog(null);
      setReportActionNotes("");
      void reportsQuery.refetch();
      void dashboardQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to resolve report");
    } finally {
      setBusy(false);
    }
  };

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) return;
    setBusy(true);
    try {
      await adminApi.createAnnouncement({
        title: annTitle.trim(),
        message: annMessage.trim(),
        targetAudience: annAudience,
        priority: annPriority,
        ...(annLinkUrl.trim() ? { linkUrl: annLinkUrl.trim() } : {}),
      });
      toast.success("Platform announcement broadcasted! 📢");
      setCreateAnnouncementOpen(false);
      setAnnTitle("");
      setAnnMessage("");
      setAnnLinkUrl("");
      void queryClient.invalidateQueries({ queryKey: ["admin", "announcements"] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to create announcement");
    } finally {
      setBusy(false);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setBusy(true);
    try {
      await adminApi.createCategory({
        name: newCatName.trim(),
        type: newCatType,
        ...(newCatDesc.trim() ? { description: newCatDesc.trim() } : {}),
      });
      toast.success(`Category "${newCatName}" created`);
      setCreateCategoryOpen(false);
      setNewCatName("");
      setNewCatDesc("");
      void categoriesQuery.refetch();
    } catch (err: any) {
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
        platformName: settingsPlatformName.trim(),
      });
      toast.success("Platform configuration updated & persisted! ⚙️");
      void settingsQuery.refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update platform settings");
    } finally {
      setBusy(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Navigation Menu Configuration
  // ---------------------------------------------------------------------------

  const navGroups = useMemo(
    () => [
      {
        title: "Overview",
        items: [
          { id: "dashboard" as AdminSection, label: "Dashboard", icon: LayoutDashboard },
          { id: "analytics" as AdminSection, label: "Analytics", icon: BarChart3 },
          { id: "reports-center" as AdminSection, label: "Reports Center", icon: FileSpreadsheet },
          { id: "system-health" as AdminSection, label: "System Health", icon: Activity },
        ],
      },
      {
        title: "People",
        items: [
          { id: "users" as AdminSection, label: "All Users", icon: Users },
          { id: "students" as AdminSection, label: "Students", icon: GraduationCap },
          { id: "organizers" as AdminSection, label: "Organizers", icon: ShieldCheck },
          { id: "administrators" as AdminSection, label: "Administrators", icon: Shield },
          { id: "verification" as AdminSection, label: "Verification Queue", icon: UserCheck, badge: dashboardQuery.data?.moderationQueue?.pendingVerifications },
        ],
      },
      {
        title: "Campus",
        items: [
          { id: "universities" as AdminSection, label: "Universities", icon: Building },
          { id: "faculties" as AdminSection, label: "Faculties", icon: Layers },
          { id: "departments" as AdminSection, label: "Departments", icon: Compass },
        ],
      },
      {
        title: "Organizations",
        items: [
          { id: "societies" as AdminSection, label: "Societies & Clubs", icon: Building2 },
          { id: "organization-requests" as AdminSection, label: "Society Requests", icon: Sparkles, badge: dashboardQuery.data?.moderationQueue?.pendingOrganizations },
          { id: "members" as AdminSection, label: "Member Rosters", icon: UserPlus },
        ],
      },
      {
        title: "Content",
        items: [
          { id: "events" as AdminSection, label: "Events Catalog", icon: Calendar, badge: dashboardQuery.data?.moderationQueue?.pendingEvents },
          { id: "teams" as AdminSection, label: "Teaming Board", icon: Users },
          { id: "volunteering" as AdminSection, label: "Volunteering Hub", icon: HeartHandshake },
          { id: "reports" as AdminSection, label: "Moderation Reports", icon: Flag, badge: dashboardQuery.data?.moderationQueue?.pendingReports },
          { id: "categories" as AdminSection, label: "Categories", icon: Tag },
        ],
      },
      {
        title: "Transactions",
        items: [
          { id: "registrations" as AdminSection, label: "Registrations", icon: FileText },
          { id: "tickets" as AdminSection, label: "Tickets & Passes", icon: Ticket },
          { id: "attendance" as AdminSection, label: "Attendance Records", icon: CheckCircle2 },
          { id: "payments" as AdminSection, label: "Payments Ledger", icon: CreditCard },
        ],
      },
      {
        title: "Communication",
        items: [
          { id: "announcements" as AdminSection, label: "Announcements", icon: Megaphone },
        ],
      },
      {
        title: "System",
        items: [
          { id: "audit-logs" as AdminSection, label: "Audit Logs", icon: History },
          { id: "settings" as AdminSection, label: "Platform Settings", icon: Settings },
        ],
      },
    ],
    [dashboardQuery.data],
  );

  return (
    <RequireRole roles={["ADMIN"]}>
      <div className="flex min-h-screen bg-background text-foreground font-sans">
        {/* ----------------------------------------------------------------- */}
        {/* Left Sidebar */}
        {/* ----------------------------------------------------------------- */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 flex flex-col border-r border-border bg-card transition-all duration-200 lg:static",
            sidebarCollapsed ? "w-16" : "w-64",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          )}
        >
          {/* Brand Header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-navy text-navy-foreground shadow-sm">
                <Shield className="size-5 text-primary" />
              </div>
              {!sidebarCollapsed && (
                <div className="truncate">
                  <span className="font-bold tracking-tight text-foreground">CampusPulse</span>
                  <span className="ml-1.5 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    Control
                  </span>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hidden size-7 text-muted-foreground hover:text-foreground lg:flex"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronRight className={cn("size-4 transition-transform", !sidebarCollapsed && "rotate-180")} />
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
            {navGroups.map((group) => (
              <div key={group.title}>
                {!sidebarCollapsed && (
                  <h2 className="px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 mb-1.5">
                    {group.title}
                  </h2>
                )}
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = activeSection === item.id;
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveSection(item.id);
                            setMobileMenuOpen(false);
                          }}
                          title={sidebarCollapsed ? item.label : undefined}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition-colors relative",
                            active
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            sidebarCollapsed && "justify-center px-2",
                          )}
                        >
                          <Icon className="size-4 shrink-0" />
                          {!sidebarCollapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
                          {Boolean(item.badge && item.badge > 0) && (
                            <span
                              className={cn(
                                "grid place-items-center rounded-full text-[10px] font-bold",
                                sidebarCollapsed
                                  ? "absolute -top-1 -right-1 size-4 bg-destructive text-destructive-foreground"
                                  : "px-1.5 py-0.5 bg-destructive text-destructive-foreground",
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Admin Profile Footer */}
          <div className="border-t border-border p-3">
            <div className={cn("flex items-center gap-2.5", sidebarCollapsed && "justify-center")}>
              <div className="grid size-8 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-navy-foreground">
                {user?.name?.[0] || "A"}
              </div>
              {!sidebarCollapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-foreground">{user?.name}</p>
                  <p className="truncate text-[10px] text-muted-foreground">{user?.email}</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* ----------------------------------------------------------------- */}
        {/* Main Workspace & Header */}
        {/* ----------------------------------------------------------------- */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top Bar */}
          <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-border bg-card/95 px-4 sm:px-6 backdrop-blur">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                <Sliders className="size-5" />
              </Button>

              {/* Global Search Bar */}
              <form onSubmit={handleGlobalSearch} className="relative w-64 sm:w-80 md:w-96">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={globalSearchQuery}
                  onChange={(e) => setGlobalSearchQuery(e.target.value)}
                  placeholder="Global search (users, events, clubs, unis)..."
                  className="pl-9 h-9 text-xs"
                />
              </form>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs font-semibold hidden sm:inline-flex"
                onClick={() => {
                  void dashboardQuery.refetch();
                  toast.success("Dashboard data refreshed");
                }}
              >
                <RefreshCw className="size-3.5 mr-1.5" />
                Refresh
              </Button>

              <Button asChild variant="outline" size="sm" className="h-8 text-xs font-semibold">
                <Link to="/explore">View Site</Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8 rounded-full">
                    <span className="grid size-7 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {user?.name?.[0] || "A"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <p className="text-xs font-semibold">{user?.name}</p>
                    <p className="text-[11px] font-normal text-muted-foreground">{user?.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveSection("settings")}>
                    <Settings className="size-4 mr-2" /> Platform Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveSection("audit-logs")}>
                    <History className="size-4 mr-2" /> Audit Trail
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="size-4 mr-2" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Global Search Results Overlay */}
          {globalSearchResults.length > 0 && (
            <div className="border-b border-border bg-muted/40 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Global Search Results ({globalSearchResults.length})
                </p>
                <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setGlobalSearchResults([])}>
                  Close
                </Button>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {globalSearchResults.map((res) => (
                  <div
                    key={`${res.type}-${res.id}`}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-card text-xs hover:border-primary cursor-pointer transition-colors"
                    onClick={() => {
                      if (res.type === "USER") {
                        setInspectUserId(res.id);
                      } else if (res.type === "EVENT") {
                        setActiveSection("events");
                        setEventsFilters((prev) => ({ ...prev, search: res.title }));
                      } else if (res.type === "ORGANIZATION") {
                        setActiveSection("societies");
                        setOrgsFilters((prev) => ({ ...prev, search: res.title }));
                      } else if (res.type === "UNIVERSITY") {
                        setActiveSection("universities");
                      }
                      setGlobalSearchResults([]);
                    }}
                  >
                    <div>
                      <p className="font-semibold text-foreground">{res.title}</p>
                      <p className="text-[11px] text-muted-foreground">{res.subtitle}</p>
                    </div>
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                      {res.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Content Canvas */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            {/* ------------------------------------------------------------- */}
            {/* SECTION: DASHBOARD OVERVIEW */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "dashboard" && (
              <div className="space-y-6">
                <PageHeader
                  title="Platform Command Center"
                  description="Global system telemetry, active moderation queues, and operational metrics across all universities."
                  actions={
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => setCreateAnnouncementOpen(true)}>
                        <Megaphone className="size-4 mr-1.5" /> Broadcast Alert
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setCreateAdminOpen(true)}>
                        <UserPlus className="size-4 mr-1.5" /> Add Admin
                      </Button>
                    </div>
                  }
                />

                {/* Dashboard Real-Time Filter Bar */}
                <AdminFilterBar
                  filters={dashboardFilters}
                  onFilterChange={setDashboardFilters}
                  onReset={() => setDashboardFilters({})}
                  universities={universitiesQuery.data?.data || []}
                  categories={categoriesQuery.data || []}
                  showCategoryFilter={true}
                  showStatusFilter={false}
                  showSortFilter={false}
                  searchPlaceholder="Filter dashboard KPIs by keyword..."
                />

                {dashboardQuery.isPending ? (
                  <RowSkeleton />
                ) : dashboardQuery.isError ? (
                  <ErrorState onRetry={() => dashboardQuery.refetch()} />
                ) : (
                  <>
                    {/* Primary KPI Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <StatCard
                        label="Total Users"
                        value={dashboardQuery.data?.overview.totalUsers ?? 0}
                        hint={`${dashboardQuery.data?.overview.activeUsers ?? 0} active accounts`}
                        icon={<Users className="size-5 text-primary" />}
                      />
                      <StatCard
                        label="Universities & Campuses"
                        value={dashboardQuery.data?.overview.universities ?? 0}
                        hint="Verified academic institutions"
                        icon={<Building className="size-5 text-emerald-500" />}
                      />
                      <StatCard
                        label="Societies & Clubs"
                        value={dashboardQuery.data?.overview.organizations ?? 0}
                        hint="Active student organizations"
                        icon={<Building2 className="size-5 text-indigo-500" />}
                      />
                      <StatCard
                        label="Published Opportunities"
                        value={dashboardQuery.data?.overview.publishedEvents ?? 0}
                        hint={`${dashboardQuery.data?.overview.events ?? 0} total listings`}
                        icon={<Calendar className="size-5 text-amber-500" />}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <StatCard
                        label="Registrations"
                        value={dashboardQuery.data?.overview.registrations ?? 0}
                        hint="Student event admissions"
                        icon={<FileText className="size-5 text-sky-500" />}
                      />
                      <StatCard
                        label="Formed Squads"
                        value={dashboardQuery.data?.overview.teams ?? 0}
                        hint="Hackathon & project teams"
                        icon={<Users className="size-5 text-purple-500" />}
                      />
                      <StatCard
                        label="Paid Transactions"
                        value={dashboardQuery.data?.overview.paidPayments ?? 0}
                        hint="Completed ticket checkouts"
                        icon={<CreditCard className="size-5 text-teal-500" />}
                      />
                      <StatCard
                        label="Pending Moderation"
                        value={
                          (dashboardQuery.data?.moderationQueue.pendingEvents ?? 0) +
                          (dashboardQuery.data?.moderationQueue.pendingReports ?? 0) +
                          (dashboardQuery.data?.moderationQueue.pendingVerifications ?? 0) +
                          (dashboardQuery.data?.moderationQueue.pendingOrganizations ?? 0)
                        }
                        hint="Items requiring review"
                        icon={<ShieldAlert className="size-5 text-rose-500" />}
                      />
                    </div>

                    {/* Moderation Queue Quick Actions */}
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                            <ShieldAlert className="size-4 text-primary" /> Active Moderation Tasks
                          </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setActiveSection("organization-requests")}
                            className="flex flex-col p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted transition-colors text-left"
                          >
                            <span className="text-xl font-extrabold text-foreground">
                              {dashboardQuery.data?.moderationQueue.pendingOrganizations ?? 0}
                            </span>
                            <span className="text-xs text-muted-foreground mt-0.5">Society Proposals</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveSection("verification")}
                            className="flex flex-col p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted transition-colors text-left"
                          >
                            <span className="text-xl font-extrabold text-foreground">
                              {dashboardQuery.data?.moderationQueue.pendingVerifications ?? 0}
                            </span>
                            <span className="text-xs text-muted-foreground mt-0.5">Verification Requests</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveSection("reports")}
                            className="flex flex-col p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted transition-colors text-left"
                          >
                            <span className="text-xl font-extrabold text-foreground">
                              {dashboardQuery.data?.moderationQueue.pendingReports ?? 0}
                            </span>
                            <span className="text-xs text-muted-foreground mt-0.5">Flagged Content Reports</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveSection("events")}
                            className="flex flex-col p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted transition-colors text-left"
                          >
                            <span className="text-xl font-extrabold text-foreground">
                              {dashboardQuery.data?.moderationQueue.pendingEvents ?? 0}
                            </span>
                            <span className="text-xs text-muted-foreground mt-0.5">Pending Event Reviews</span>
                          </button>
                        </div>
                      </div>

                      {/* Recent System Audit Activity */}
                      <div className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                            <History className="size-4 text-primary" /> Recent Audit Activity
                          </h2>
                          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setActiveSection("audit-logs")}>
                            View All
                          </Button>
                        </div>
                        <ul className="space-y-2.5">
                          {dashboardQuery.data?.recentActivity?.slice(0, 5).map((act) => (
                            <li key={act.id} className="flex items-start justify-between gap-3 text-xs border-b border-border/50 pb-2">
                              <div>
                                <span className="font-semibold text-foreground">{act.action}</span>
                                <span className="text-muted-foreground ml-1.5">by {act.user?.name || "System"}</span>
                                {act.reason && <p className="text-muted-foreground italic mt-0.5">"{act.reason}"</p>}
                              </div>
                              <span className="text-[10px] text-muted-foreground shrink-0">{formatDate(act.createdAt)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: ANALYTICS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "analytics" && (
              <div className="space-y-6">
                <PageHeader
                  title="Platform Analytics & Telemetry"
                  description="Interactive breakdown of user adoption, event distribution, revenue volume, and campus participation trends."
                  actions={
                    <div className="flex items-center gap-1.5 bg-muted rounded-lg p-1">
                      {["7d", "30d", "3m", "6m", "1y"].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setAnalyticsPeriod(p)}
                          className={cn(
                            "rounded px-2.5 py-1 text-xs font-semibold transition-colors",
                            analyticsPeriod === p ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {p.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  }
                />

                {analyticsQuery.isPending ? (
                  <RowSkeleton />
                ) : analyticsQuery.isError ? (
                  <ErrorState onRetry={() => analyticsQuery.refetch()} />
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Users by University Chart */}
                    <div className="rounded-xl border border-border bg-card p-5">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                        Users by Campus / University
                      </h2>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={analyticsQuery.data?.usersByUniversity || []}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="university" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Events by Category Pie Chart */}
                    <div className="rounded-xl border border-border bg-card p-5">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                        Opportunities by Category
                      </h2>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={analyticsQuery.data?.eventsByCategory || []}
                              dataKey="count"
                              nameKey="category"
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              label={({ category, count }) => `${category} (${count})`}
                            >
                              {(analyticsQuery.data?.eventsByCategory || []).map((_, idx) => (
                                <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Users by Role Breakdown */}
                    <div className="rounded-xl border border-border bg-card p-5">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                        User Distribution by Role
                      </h2>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={analyticsQuery.data?.usersByRole || []} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis type="number" tick={{ fontSize: 11 }} />
                            <YAxis dataKey="role" type="category" tick={{ fontSize: 11 }} width={120} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#10B981" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Payments Revenue Breakdown */}
                    <div className="rounded-xl border border-border bg-card p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                          Payment Status & Volume
                        </h2>
                        <span className="text-xs font-bold text-emerald-600">
                          Total: {formatMoney(analyticsQuery.data?.totalRevenue || 0)}
                        </span>
                      </div>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={analyticsQuery.data?.paymentsByStatus || []}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="status" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip formatter={(val: any) => formatMoney(Number(val))} />
                            <Bar dataKey="volume" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: REPORTS CENTER */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "reports-center" && (
              <AdminReportsCenter
                universities={universitiesQuery.data?.data || []}
                categories={categoriesQuery.data || []}
              />
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: SYSTEM HEALTH */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "system-health" && (
              <div className="space-y-6">
                <PageHeader
                  title="System Infrastructure Health"
                  description="Real-time telemetry, Node.js process statistics, database connectivity, and runtime status."
                  actions={
                    <Button variant="outline" size="sm" onClick={() => systemHealthQuery.refetch()}>
                      <RefreshCw className="size-3.5 mr-1.5" /> Refresh Telemetry
                    </Button>
                  }
                />

                {systemHealthQuery.isPending ? (
                  <RowSkeleton />
                ) : systemHealthQuery.isError ? (
                  <ErrorState onRetry={() => systemHealthQuery.refetch()} />
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <Server className="size-4 text-emerald-500" /> Backend API Server
                      </h2>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="rounded border border-border p-2.5">
                          <p className="text-muted-foreground text-[10px] uppercase font-bold">Status</p>
                          <p className="text-base font-extrabold text-emerald-600 mt-1">🟢 Operational</p>
                        </div>
                        <div className="rounded border border-border p-2.5">
                          <p className="text-muted-foreground text-[10px] uppercase font-bold">Node.js Version</p>
                          <p className="text-base font-extrabold text-foreground mt-1">{systemHealthQuery.data.nodeVersion}</p>
                        </div>
                        <div className="rounded border border-border p-2.5">
                          <p className="text-muted-foreground text-[10px] uppercase font-bold">Server Uptime</p>
                          <p className="text-base font-extrabold text-foreground mt-1">
                            {Math.floor(systemHealthQuery.data.uptimeSeconds / 60)} mins
                          </p>
                        </div>
                        <div className="rounded border border-border p-2.5">
                          <p className="text-muted-foreground text-[10px] uppercase font-bold">Environment</p>
                          <p className="text-base font-extrabold text-foreground mt-1 uppercase">{systemHealthQuery.data.environment}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <Activity className="size-4 text-primary" /> Database Connectivity
                      </h2>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="rounded border border-border p-2.5">
                          <p className="text-muted-foreground text-[10px] uppercase font-bold">PostgreSQL Status</p>
                          <p className="text-base font-extrabold text-emerald-600 mt-1">Connected</p>
                        </div>
                        <div className="rounded border border-border p-2.5">
                          <p className="text-muted-foreground text-[10px] uppercase font-bold">Query Latency</p>
                          <p className="text-base font-extrabold text-primary mt-1">
                            {systemHealthQuery.data.database?.latencyMs} ms
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: USERS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "users" && (
              <AdminUsersTable
                universities={universitiesQuery.data?.data || []}
                onInspectUser={setInspectUserId}
                onSuspendUser={setSuspendUserDialog}
                onChangeRole={setChangeRoleDialog}
              />
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: STUDENTS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "students" && (
              <AdminStudentsTable
                universities={universitiesQuery.data?.data || []}
                onInspectUser={setInspectUserId}
                onSuspendUser={setSuspendUserDialog}
              />
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: ORGANIZERS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "organizers" && (
              <AdminOrganizersTable
                universities={universitiesQuery.data?.data || []}
                onInspectUser={setInspectUserId}
                onViewOrganization={(orgId) => {
                  setSelectedRosterOrgId(orgId);
                  setActiveSection("members");
                }}
              />
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: ADMINISTRATORS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "administrators" && (
              <AdminAdministratorsTable
                universities={universitiesQuery.data?.data || []}
                onCreateAdmin={() => setCreateAdminOpen(true)}
                onRemoveAdmin={(adm) => handleRemoveAdmin(adm.id, adm.name)}
              />
            )}



            {/* ------------------------------------------------------------- */}
            {/* SECTION: UNIVERSITIES */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "universities" && (
              <AdminUniversities
                onOpenCreateFaculty={(uniId) => {
                  if (uniId) setNewFacultyUniId(uniId);
                  setCreateFacultyOpen(true);
                }}
              />
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: FACULTIES */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "faculties" && (
              <AdminFaculties
                onOpenCreateDepartment={(facultyId, universityId) => {
                  setActiveSection("departments");
                }}
              />
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: DEPARTMENTS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "departments" && (
              <AdminDepartments />
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: SOCIETIES & CLUBS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "societies" && (
              <div className="space-y-6">
                <PageHeader
                  title="Societies & Student Clubs"
                  description="Oversee university clubs, view active 2-leader rosters, and inspect member participation metrics."
                />

                <AdminFilterBar
                  filters={orgsFilters}
                  onFilterChange={setOrgsFilters}
                  onReset={() => setOrgsFilters({})}
                  totalRecords={orgsQuery.data?.total}
                  loading={orgsQuery.isPending}
                  universities={universitiesQuery.data?.data || []}
                  statusOptions={[
                    { value: "APPROVED", label: "Approved & Active" },
                    { value: "PENDING", label: "Pending Approval" },
                    { value: "REJECTED", label: "Rejected" },
                    { value: "SUSPENDED", label: "Suspended" },
                  ]}
                  sortOptions={[
                    { value: "createdAt-desc", label: "Newest Founded" },
                    { value: "createdAt-asc", label: "Oldest Founded" },
                    { value: "name-asc", label: "Name (A-Z)" },
                  ]}
                  searchPlaceholder="Search societies and clubs..."
                />

                {orgsQuery.isPending ? (
                  <RowSkeleton />
                ) : orgsQuery.isError ? (
                  <ErrorState onRetry={() => orgsQuery.refetch()} />
                ) : orgsQuery.data.data.length === 0 ? (
                  <EmptyState
                    icon={<Building2 className="size-6" />}
                    title="No organizations found"
                    description="There are no active clubs matching this filter."
                  />
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {orgsQuery.data.data.map((org: any) => (
                      <div key={org.id} className="rounded-xl border border-border bg-card p-5 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h2 className="font-bold text-sm text-foreground">{org.name}</h2>
                            <p className="text-xs text-muted-foreground">{org.university?.name || "Independent Club"}</p>
                          </div>
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                              org.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground",
                            )}
                          >
                            {org.status}
                          </span>
                        </div>

                        {/* Active Leaders */}
                        <div className="border-t border-border/50 pt-2 text-xs">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                            Society Leaders ({org.members?.length || 0}/2)
                          </p>
                          <div className="space-y-1">
                            {(org.members || []).map((m: any) => (
                              <p key={m.id} className="font-semibold text-foreground">
                                • {m.user?.name} ({m.user?.email})
                              </p>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-border/50 pt-3 flex items-center justify-between text-xs text-muted-foreground">
                          <span>{org._count?.members || 0} Members</span>
                          <span>{org._count?.events || 0} Events</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 text-xs"
                              onClick={() => {
                                setSelectedRosterOrgId(org.id);
                                setActiveSection("members");
                              }}
                            >
                              Roster
                            </Button>
                            <Button asChild variant="ghost" size="sm" className="h-6 text-xs">
                              <a href={`/organizations/${org.slug}`} target="_blank" rel="noreferrer">View</a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: VERIFICATION QUEUE */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "verification" && (
              <AdminVerificationQueue
                universities={universitiesQuery.data?.data || []}
                faculties={facultiesQuery.data?.data || []}
                departments={departmentsQuery.data?.data || []}
              />
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: SOCIETY REQUESTS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "organization-requests" && (
              <div className="space-y-6">
                <PageHeader
                  title="Society Proposal Queue"
                  description="Review pending student organization creation requests, enforce founder-to-leader assignment, and grant approvals."
                />

                <AdminFilterBar
                  filters={orgsFilters}
                  onFilterChange={setOrgsFilters}
                  onReset={() => setOrgsFilters({})}
                  totalRecords={orgsQuery.data?.total}
                  loading={orgsQuery.isPending}
                  universities={universitiesQuery.data?.data || []}
                  showStatusFilter={false}
                  searchPlaceholder="Search proposed societies..."
                />

                {orgsQuery.isPending ? (
                  <RowSkeleton />
                ) : orgsQuery.isError ? (
                  <ErrorState onRetry={() => orgsQuery.refetch()} />
                ) : orgsQuery.data.data.length === 0 ? (
                  <EmptyState
                    icon={<Sparkles className="size-6 text-emerald-500" />}
                    title="No pending society proposals"
                    description="All student club applications have been reviewed."
                  />
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {orgsQuery.data.data.map((org: any) => (
                      <div key={org.id} className="rounded-xl border border-border bg-card p-5 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-600 uppercase">
                              Pending Review
                            </span>
                            <h2 className="font-bold text-base text-foreground mt-1">{org.name}</h2>
                            <p className="text-xs text-muted-foreground">Proposed for {org.university?.name || "Independent Network"}</p>
                          </div>
                        </div>

                        <div className="rounded bg-muted/40 p-3 text-xs">
                          <p className="font-bold text-muted-foreground text-[10px] uppercase mb-0.5">Founding Applicant</p>
                          <p className="font-semibold text-foreground">{org.requestedBy?.name} ({org.requestedBy?.email})</p>
                          {org.description && <p className="mt-2 text-muted-foreground">{org.description}</p>}
                        </div>

                        <div className="border-t border-border/50 pt-3 flex items-center gap-2">
                          <Button
                            size="sm"
                            className="flex-1 h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                            onClick={() => setReviewOrgDialog({ id: org.id, name: org.name, type: "APPROVE" })}
                          >
                            Approve Proposal
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs text-destructive hover:bg-destructive/10"
                            onClick={() => setReviewOrgDialog({ id: org.id, name: org.name, type: "REJECT" })}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: MEMBER ROSTERS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "members" && (
              <AdminMemberRosters
                universities={universitiesQuery.data?.data || []}
                initialOrgId={selectedRosterOrgId}
              />
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: EVENTS & CATALOG */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "events" && (
              <AdminEventsTable
                universities={universitiesQuery.data?.data || []}
                categories={categoriesQuery.data || []}
                onCancelEvent={setCancelEventDialog}
              />
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: TEAMING BOARD */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "teams" && <AdminTeamsTable />}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: VOLUNTEERING HUB */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "volunteering" && (
              <AdminVolunteeringTable universities={universitiesQuery.data?.data || []} />
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: MODERATION REPORTS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "reports" && (
              <AdminReportsTable onResolveReport={setResolveReportDialog} />
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: CATEGORIES */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "categories" && (
              <AdminCategoriesTable onCreateCategory={() => setCreateCategoryOpen(true)} />
            )}

            {/* ------------------------------------------------------------- */}
            {/* ------------------------------------------------------------- */}
            {/* SECTION: REGISTRATIONS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "registrations" && (
              <AdminRegistrationsTable
                universities={universitiesQuery.data?.data || []}
                onCancelRegistration={(reg) => setCancelRegDialog(reg)}
              />
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: TICKETS & PASSES */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "tickets" && <AdminTicketsTable />}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: ATTENDANCE RECORDS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "attendance" && (
              <AdminAttendanceTable universities={universitiesQuery.data?.data || []} />
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: PAYMENTS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "payments" && <AdminPaymentLedger />}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: ANNOUNCEMENTS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "announcements" && (
              <AdminAnnouncements universities={universitiesQuery.data?.data || []} />
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: AUDIT LOGS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "audit-logs" && <AdminAuditLogsTable />}

            {/* ------------------------------------------------------------- */}
            {/* SECTION: PLATFORM SETTINGS */}
            {/* ------------------------------------------------------------- */}
            {activeSection === "settings" && (
              <div className="space-y-6">
                <PageHeader
                  title="Platform Configuration"
                  description="Runtime platform settings, governance rules, email policies, and direct publishing permissions."
                  actions={
                    <Button size="sm" onClick={handleSavePlatformSettings} disabled={busy}>
                      <Settings className="size-4 mr-1.5" /> Save Configuration
                    </Button>
                  }
                />

                <div className="rounded-xl border border-border bg-card p-6 space-y-6 max-w-2xl">
                  <div className="space-y-1">
                    <Label className="text-xs">Platform Display Name</Label>
                    <Input
                      value={settingsPlatformName}
                      onChange={(e) => setSettingsPlatformName(e.target.value)}
                      className="text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs">Support Contact Email</Label>
                    <Input
                      type="email"
                      value={settingsSupportEmail}
                      onChange={(e) => setSettingsSupportEmail(e.target.value)}
                      className="text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <h2 className="text-sm font-bold text-foreground">Direct Organizer Event Publishing</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Allow verified society leaders to publish events without mandatory admin approval.
                      </p>
                    </div>
                    <Switch
                      checked={settingsDirectPublishing}
                      onCheckedChange={setSettingsDirectPublishing}
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <h2 className="text-sm font-bold text-foreground">Maximum Society Leaders Rule</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Strict 2-leader limit enforced by atomic database transactions.
                      </p>
                    </div>
                    <span className="rounded bg-primary/10 px-2 py-1 text-xs font-bold text-primary">2 Leaders (Locked)</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <h2 className="text-sm font-bold text-foreground">Automatic Institutional Domain Verification</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Automatically verify students when registering with authorized campus domains (@student.uoc.lk, etc.).
                      </p>
                    </div>
                    <Switch
                      checked={settingsAutoDomainVerify}
                      onCheckedChange={setSettingsAutoDomainVerify}
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <h2 className="text-sm font-bold text-foreground">System Maintenance Mode</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Display maintenance notice on public exploration feed during scheduled migrations.
                      </p>
                    </div>
                    <Switch
                      checked={settingsMaintenanceMode}
                      onCheckedChange={setSettingsMaintenanceMode}
                    />
                  </div>

                  <div className="pt-2">
                    <Button onClick={handleSavePlatformSettings} disabled={busy} className="w-full">
                      Save & Apply Settings
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* MODALS & DIALOGS */}
        {/* ----------------------------------------------------------------- */}

        {/* Suspend / Restore User Dialog */}
        <Dialog open={!!suspendUserDialog} onOpenChange={() => setSuspendUserDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {suspendUserDialog?.currentStatus ? "Suspend User Account" : "Restore User Account"}
              </DialogTitle>
              <DialogDescription>
                {suspendUserDialog?.currentStatus
                  ? `Are you sure you want to suspend ${suspendUserDialog?.name}? The user will be prevented from logging in or registering.`
                  : `Restore full platform access for ${suspendUserDialog?.name}.`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <Label className="text-xs">Reason for this action (recorded in audit trail)</Label>
              <Textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="e.g. Terms of service violation, repeated spamming..."
                className="text-xs"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSuspendUserDialog(null)}>
                Cancel
              </Button>
              <Button
                variant={suspendUserDialog?.currentStatus ? "destructive" : "default"}
                onClick={handleToggleUserStatus}
                disabled={busy}
              >
                {suspendUserDialog?.currentStatus ? "Confirm Suspension" : "Confirm Restoration"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Change User Role Dialog */}
        <Dialog open={!!changeRoleDialog} onOpenChange={() => setChangeRoleDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update User Role</DialogTitle>
              <DialogDescription>
                Assign a new platform role for {changeRoleDialog?.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label className="text-xs">Select Role</Label>
                <select
                  value={newSelectedRole}
                  onChange={(e) => setNewSelectedRole(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                >
                  <option value="STUDENT">STUDENT</option>
                  <option value="ORGANIZER">ORGANIZER</option>
                  <option value="FACULTY">FACULTY</option>
                  <option value="UNIVERSITY_ADMIN">UNIVERSITY_ADMIN</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Reason</Label>
                <Textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder="Reason for role change..."
                  className="text-xs"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setChangeRoleDialog(null)}>
                Cancel
              </Button>
              <Button onClick={handleChangeUserRole} disabled={busy}>
                Update Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Administrator Dialog */}
        <Dialog open={createAdminOpen} onOpenChange={setCreateAdminOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Administrator</DialogTitle>
              <DialogDescription>
                Grant administrative governance privileges to a new or existing user account.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateAdmin} className="space-y-3.5 py-2">
              <div className="space-y-1">
                <Label className="text-xs">Full Name</Label>
                <Input
                  required
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  placeholder="e.g. Dr. Nihal Gunawardena"
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Email Address</Label>
                <Input
                  required
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="e.g. admin@uoc.lk"
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Administrative Role</Label>
                <select
                  value={newAdminRole}
                  onChange={(e) => setNewAdminRole(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                >
                  <option value="ADMIN">ADMIN (Platform Moderator)</option>
                  <option value="UNIVERSITY_ADMIN">UNIVERSITY_ADMIN (Campus-Scoped)</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Full Platform Superuser)</option>
                </select>
              </div>
              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setCreateAdminOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={busy}>
                  Create Administrator
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Create University Dialog */}
        <Dialog open={createUniOpen} onOpenChange={setCreateUniOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add University Campus</DialogTitle>
              <DialogDescription>
                Onboard a new academic institution into the CampusPulse network.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateUniversity} className="space-y-3 py-2">
              <div className="space-y-1">
                <Label className="text-xs">University Name</Label>
                <Input
                  required
                  value={newUniName}
                  onChange={(e) => setNewUniName(e.target.value)}
                  placeholder="e.g. University of Peradeniya"
                  className="text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Institution Code</Label>
                  <Input
                    required
                    value={newUniCode}
                    onChange={(e) => setNewUniCode(e.target.value)}
                    placeholder="e.g. UOP"
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">City</Label>
                  <Input
                    required
                    value={newUniCity}
                    onChange={(e) => setNewUniCity(e.target.value)}
                    placeholder="e.g. Peradeniya"
                    className="text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Primary Email Domain</Label>
                <Input
                  value={newUniDomain}
                  onChange={(e) => setNewUniDomain(e.target.value)}
                  placeholder="e.g. pdn.ac.lk"
                  className="text-xs"
                />
              </div>
              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setCreateUniOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={busy}>
                  Save University
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Add University Domain Dialog */}
        <Dialog open={!!addDomainDialogUni} onOpenChange={() => setAddDomainDialogUni(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Authorize Email Domain</DialogTitle>
              <DialogDescription>
                Add student or staff email domain for {addDomainDialogUni?.name}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddDomain} className="space-y-3 py-2">
              <div className="space-y-1">
                <Label className="text-xs">Domain</Label>
                <Input
                  required
                  value={newEmailDomain}
                  onChange={(e) => setNewEmailDomain(e.target.value)}
                  placeholder="e.g. eng.pdn.ac.lk"
                  className="text-xs"
                />
              </div>
              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setAddDomainDialogUni(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={busy}>
                  Authorize Domain
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Create Faculty Dialog */}
        <Dialog open={createFacultyOpen} onOpenChange={setCreateFacultyOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Academic Faculty</DialogTitle>
              <DialogDescription>
                Create a faculty division under a verified university campus.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateFaculty} className="space-y-3 py-2">
              <div className="space-y-1">
                <Label className="text-xs">Parent University</Label>
                <select
                  required
                  value={newFacultyUniId}
                  onChange={(e) => setNewFacultyUniId(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                >
                  <option value="">Select University...</option>
                  {(universitiesQuery.data?.data || []).map((u: any) => (
                    <option key={u.id} value={u.id}>{u.name} ({u.code})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Faculty Name</Label>
                <Input
                  required
                  value={newFacultyName}
                  onChange={(e) => setNewFacultyName(e.target.value)}
                  placeholder="e.g. Faculty of Engineering"
                  className="text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Faculty Code</Label>
                  <Input
                    required
                    value={newFacultyCode}
                    onChange={(e) => setNewFacultyCode(e.target.value)}
                    placeholder="e.g. FOE"
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Slug</Label>
                  <Input
                    value={newFacultySlug}
                    onChange={(e) => setNewFacultySlug(e.target.value)}
                    placeholder="e.g. engineering"
                    className="text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Description (Optional)</Label>
                <Textarea
                  value={newFacultyDesc}
                  onChange={(e) => setNewFacultyDesc(e.target.value)}
                  placeholder="Academic overview..."
                  className="text-xs"
                />
              </div>
              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setCreateFacultyOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={busy}>
                  Create Faculty
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Create Department Dialog */}
        <Dialog open={createDeptOpen} onOpenChange={setCreateDeptOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Academic Department</DialogTitle>
              <DialogDescription>
                Create a department within an established faculty division.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateDepartment} className="space-y-3 py-2">
              <div className="space-y-1">
                <Label className="text-xs">Parent Faculty</Label>
                <select
                  required
                  value={newDeptFacultyId}
                  onChange={(e) => setNewDeptFacultyId(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                >
                  <option value="">Select Faculty...</option>
                  {(universitiesQuery.data?.data || []).flatMap((u: any) =>
                    (u.faculties || []).map((f: any) => (
                      <option key={f.id} value={f.id}>{u.code} — {f.name} ({f.code})</option>
                    )),
                  )}
                </select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Department Name</Label>
                <Input
                  required
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  placeholder="e.g. Department of Computer Engineering"
                  className="text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Department Code</Label>
                  <Input
                    required
                    value={newDeptCode}
                    onChange={(e) => setNewDeptCode(e.target.value)}
                    placeholder="e.g. DEPT-CE"
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Slug</Label>
                  <Input
                    value={newDeptSlug}
                    onChange={(e) => setNewDeptSlug(e.target.value)}
                    placeholder="e.g. computer-engineering"
                    className="text-xs"
                  />
                </div>
              </div>
              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setCreateDeptOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={busy}>
                  Create Department
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Change Member Role Dialog */}
        <Dialog open={!!changeMemberRoleDialog} onOpenChange={() => setChangeMemberRoleDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Society Committee Position</DialogTitle>
              <DialogDescription>
                Assign organization role for {changeMemberRoleDialog?.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1">
                <Label className="text-xs">Select Role</Label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                >
                  <option value="MEMBER">MEMBER (Standard Member)</option>
                  <option value="EVENT_ORGANIZER">EVENT_ORGANIZER (Can create & manage events)</option>
                  <option value="TREASURER">TREASURER (Finance Officer)</option>
                  <option value="SECRETARY">SECRETARY (Executive Committee)</option>
                  <option value="VICE_PRESIDENT">VICE_PRESIDENT (Committee)</option>
                  <option value="LEADER">LEADER / PRESIDENT (Max 2 Active Leaders)</option>
                </select>
              </div>
              {["LEADER", "PRESIDENT"].includes(newMemberRole) && (
                <p className="text-xs text-amber-600 bg-amber-500/10 p-2 rounded">
                  ⚠️ Note: Institutional governance rules strictly limit each society to a maximum of 2 active leaders.
                </p>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setChangeMemberRoleDialog(null)}>
                Cancel
              </Button>
              <Button onClick={handleChangeMemberRole} disabled={busy}>
                Confirm Role Change
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Remove Member Confirmation Dialog */}
        <Dialog open={!!removeMemberDialog} onOpenChange={() => setRemoveMemberDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Remove Society Member</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove {removeMemberDialog?.name} from this organization?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRemoveMemberDialog(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleRemoveMember} disabled={busy}>
                Confirm Removal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Review Organization Proposal Dialog */}
        <Dialog open={!!reviewOrgDialog} onOpenChange={() => setReviewOrgDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {reviewOrgDialog?.type === "APPROVE" ? "Approve Society Proposal" : "Reject Society Proposal"}
              </DialogTitle>
              <DialogDescription>
                {reviewOrgDialog?.type === "APPROVE"
                  ? `Authorize "${reviewOrgDialog?.name}" to become an active university student organization.`
                  : `Reject proposal for "${reviewOrgDialog?.name}".`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <Label className="text-xs">Feedback / Governance Notes</Label>
              <Textarea
                value={orgReviewNotes}
                onChange={(e) => setOrgReviewNotes(e.target.value)}
                placeholder="Review notes provided to founding applicant..."
                className="text-xs"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setReviewOrgDialog(null)}>
                Cancel
              </Button>
              <Button
                variant={reviewOrgDialog?.type === "APPROVE" ? "default" : "destructive"}
                onClick={handleReviewOrg}
                disabled={busy}
              >
                {reviewOrgDialog?.type === "APPROVE" ? "Approve & Authorize" : "Confirm Rejection"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Respond Verification Dialog */}
        <Dialog open={!!respondVerifDialog} onOpenChange={() => setRespondVerifDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {respondVerifDialog?.type === "APPROVED" ? "Approve Verification" : "Reject Verification"}
              </DialogTitle>
              <DialogDescription>
                {respondVerifDialog?.type === "APPROVED"
                  ? `Grant official verified credentials for ${respondVerifDialog?.orgName}.`
                  : `Reject verification request for ${respondVerifDialog?.orgName}.`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <Label className="text-xs">Verification Review Notes</Label>
              <Textarea
                value={verifReviewNotes}
                onChange={(e) => setVerifReviewNotes(e.target.value)}
                placeholder="Notes sent to applicant..."
                className="text-xs"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRespondVerifDialog(null)}>
                Cancel
              </Button>
              <Button
                variant={respondVerifDialog?.type === "APPROVED" ? "default" : "destructive"}
                onClick={handleRespondVerification}
                disabled={busy}
              >
                {respondVerifDialog?.type === "APPROVED" ? "Grant Verification" : "Confirm Rejection"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Event Dialog */}
        <Dialog open={!!rejectEventDialog} onOpenChange={() => setRejectEventDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Event Listing</DialogTitle>
              <DialogDescription>
                Provide required feedback for "{rejectEventDialog?.title}".
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <Label className="text-xs">Feedback for Organizers</Label>
              <Textarea
                required
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="Explain what needs to be updated before publication..."
                className="text-xs"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRejectEventDialog(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleRejectEvent} disabled={busy}>
                Confirm Rejection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Event Dialog */}
        <Dialog open={!!cancelEventDialog} onOpenChange={() => setCancelEventDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Published Opportunity</DialogTitle>
              <DialogDescription>
                Cancel "{cancelEventDialog?.title}". This will revoke active tickets and mark the event as cancelled.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <Label className="text-xs">Cancellation Reason</Label>
              <Textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="Reason for cancellation..."
                className="text-xs"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCancelEventDialog(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleCancelEvent} disabled={busy}>
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Registration Dialog */}
        <Dialog open={!!cancelRegDialog} onOpenChange={() => setCancelRegDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Event Registration</DialogTitle>
              <DialogDescription>
                Cancel registration for {cancelRegDialog?.userName} on {cancelRegDialog?.eventTitle}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <Label className="text-xs">Reason</Label>
              <Textarea
                value={cancelRegReason}
                onChange={(e) => setCancelRegReason(e.target.value)}
                placeholder="Reason for cancellation..."
                className="text-xs"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCancelRegDialog(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleCancelRegistration} disabled={busy}>
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Broadcast Announcement Dialog */}
        <Dialog open={createAnnouncementOpen} onOpenChange={setCreateAnnouncementOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Broadcast Platform Announcement</DialogTitle>
              <DialogDescription>
                Publish a system announcement to targeted users across CampusPulse.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateAnnouncement} className="space-y-3 py-2">
              <div className="space-y-1">
                <Label className="text-xs">Announcement Title</Label>
                <Input
                  required
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="e.g. Scheduled System Maintenance"
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Message</Label>
                <Textarea
                  required
                  value={annMessage}
                  onChange={(e) => setAnnMessage(e.target.value)}
                  placeholder="Detailed announcement content..."
                  className="text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Audience</Label>
                  <select
                    value={annAudience}
                    onChange={(e) => setAnnAudience(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                  >
                    <option value="ALL">Everyone</option>
                    <option value="STUDENTS">Students Only</option>
                    <option value="ORGANIZERS">Organizers Only</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Priority</Label>
                  <select
                    value={annPriority}
                    onChange={(e) => setAnnPriority(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                  >
                    <option value="NORMAL">Normal</option>
                    <option value="HIGH">High Priority</option>
                    <option value="URGENT">Urgent Alert</option>
                  </select>
                </div>
              </div>
              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setCreateAnnouncementOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={busy}>
                  Broadcast
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Create Category Dialog */}
        <Dialog open={createCategoryOpen} onOpenChange={setCreateCategoryOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Opportunity Category</DialogTitle>
              <DialogDescription>
                Create a new taxonomy category for hackathons, workshops, and student events.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateCategory} className="space-y-3 py-2">
              <div className="space-y-1">
                <Label className="text-xs">Category Name</Label>
                <Input
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. AI & Machine Learning"
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Category Type</Label>
                <select
                  value={newCatType}
                  onChange={(e) => setNewCatType(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                >
                  <option value="HACKATHON">HACKATHON</option>
                  <option value="WORKSHOP">WORKSHOP</option>
                  <option value="VOLUNTEERING">VOLUNTEERING</option>
                  <option value="CAREER_FAIR">CAREER_FAIR</option>
                  <option value="CULTURAL">CULTURAL</option>
                  <option value="SPORTS">SPORTS</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Description (Optional)</Label>
                <Textarea
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Category purpose..."
                  className="text-xs"
                />
              </div>
              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setCreateCategoryOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={busy}>
                  Create Category
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Resolve Report Dialog */}
        <Dialog open={!!resolveReportDialog} onOpenChange={() => setResolveReportDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Resolve Moderation Report</DialogTitle>
              <DialogDescription>
                Record moderator action and resolution notes for this item.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <Label className="text-xs">Action Notes</Label>
              <Textarea
                value={reportActionNotes}
                onChange={(e) => setReportActionNotes(e.target.value)}
                placeholder="Details of action taken..."
                className="text-xs"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setResolveReportDialog(null)}>
                Cancel
              </Button>
              <Button onClick={handleResolveReport} disabled={busy}>
                Confirm Resolution
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 360 User Inspection Modal */}
        <Dialog open={!!inspectUserId} onOpenChange={() => setInspectUserId(null)}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>User Profile & Activity Dossier</DialogTitle>
            </DialogHeader>
            {userDetailQuery.isPending ? (
              <RowSkeleton />
            ) : userDetailQuery.isError ? (
              <ErrorState />
            ) : (
              <div className="space-y-4 py-2 text-xs">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <h2 className="text-base font-bold text-foreground">{userDetailQuery.data.name}</h2>
                    <p className="text-muted-foreground">{userDetailQuery.data.email}</p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-bold uppercase",
                      userDetailQuery.data.isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600",
                    )}
                  >
                    {userDetailQuery.data.isActive ? "Active Account" : "Suspended"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-muted-foreground uppercase text-[10px]">University Identity</p>
                    <p className="font-semibold text-foreground mt-0.5">
                      {userDetailQuery.data.university?.name || "Independent"}
                    </p>
                    {userDetailQuery.data.studentProfile?.faculty && (
                      <p className="text-muted-foreground">{userDetailQuery.data.studentProfile.faculty.name}</p>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-muted-foreground uppercase text-[10px]">Verification Status</p>
                    <p className="font-semibold text-emerald-600 mt-0.5">
                      {userDetailQuery.data.universityEmailVerified ? "🎓 Institutional Verified" : "Unverified"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-3">
                  <p className="font-bold text-muted-foreground uppercase text-[10px] mb-2">
                    Society Affiliations ({userDetailQuery.data.organizationMembers?.length || 0})
                  </p>
                  <div className="space-y-1">
                    {userDetailQuery.data.organizationMembers?.map((m: any) => (
                      <p key={m.id} className="text-foreground">
                        • <span className="font-semibold">{m.organization?.name}</span> ({m.role})
                      </p>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-3">
                  <p className="font-bold text-muted-foreground uppercase text-[10px] mb-2">
                    Recent Event RSVPs ({userDetailQuery.data.eventRegistrations?.length || 0})
                  </p>
                  <div className="space-y-1">
                    {userDetailQuery.data.eventRegistrations?.map((r: any) => (
                      <p key={r.id} className="text-foreground">
                        • {r.event?.title} ({r.status})
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </RequireRole>
  );
}
