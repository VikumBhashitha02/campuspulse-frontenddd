import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  CalendarClock,
  Check,
  Crown,
  Users,
  X,
  Building2,
  ShieldCheck,
  Sparkles,
  Award,
  Settings,
  Trash2,
  UserCheck,
  UserPlus,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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
import { EmptyState, ErrorState, RowSkeleton } from "@/components/common/States";
import { PanelCard } from "@/components/common/Section";
import { CompatibilityScore } from "@/components/common/Cards";
import { OrgAvatar } from "@/components/common/Badges";
import { UserProfileModal, type ProfileInspectionData } from "@/components/common/UserProfileModal";
import { socialApi } from "@/lib/api/social";
import { relativeTime } from "@/lib/format";
import { useAuth } from "@/lib/auth";
import type { Team, UpdateTeamPayload } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account/teams/$id")({
  head: () => ({
    meta: [
      { title: "Squad Details & Roster — CampusPulse" },
      {
        name: "description",
        content: "Squad lineup, open positions, leader applicant review, and team joining.",
      },
      { property: "og:title", content: "Squad Details — CampusPulse" },
      { property: "og:description", content: "Team members, open roles and applicant review." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TeamDetailPage,
});

const AVAILABILITY_LABEL: Record<string, string> = {
  WEEKDAYS: "Meets on weekdays",
  WEEKENDS: "Meets on weekends",
  FLEXIBLE: "Flexible schedule",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function TeamDetailPage() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const teamQuery = useQuery({
    queryKey: ["team", id],
    queryFn: () => socialApi.team(id),
  });

  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmittingJoin, setIsSubmittingJoin] = useState(false);
  const [respondingId, setRespondingId] = useState<string | null>(null);

  // Profile inspection modal state
  const [inspectedProfile, setInspectedProfile] = useState<ProfileInspectionData | null>(null);
  const [inspectedRequestId, setInspectedRequestId] = useState<string | null>(null);

  // Edit Squad Modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editMaxMembers, setEditMaxMembers] = useState(4);
  const [editIsOpen, setEditIsOpen] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  if (teamQuery.isPending) return <RowSkeleton count={5} />;
  if (teamQuery.isError) return <ErrorState onRetry={() => teamQuery.refetch()} />;
  if (!teamQuery.data)
    return (
      <EmptyState
        title="Squad not found"
        description="This squad may have been removed or closed."
        action={
          <Button asChild>
            <Link to="/account/teams">Back to Squad Hub</Link>
          </Button>
        }
      />
    );

  const t = teamQuery.data;

  // Leadership & Membership Checks
  const isLeader = Boolean(
    user?.id &&
      (t.creatorId === user.id ||
        t.members.some((m) => (m.userId === user.id || m.id === user.id) && m.isLeader)),
  );

  const isMember = Boolean(
    user?.id && t.members.some((m) => m.userId === user.id || m.id === user.id),
  );

  const joinRequests = t.joinRequests || [];
  const pendingRequests = joinRequests.filter((r: any) => r.status === "PENDING");
  const myRequest = user?.id ? joinRequests.find((r: any) => r.userId === user.id) : null;
  const hasPendingRequest = myRequest?.status === "PENDING";
  const isFull = (t.maxMembers && t.members.length >= t.maxMembers) || t.openSlots <= 0;
  const isRecruiting = t.isOpen !== false && !isFull;

  // Respond to Join Request (Accept / Reject)
  const handleRespond = async (requestId: string, action: "ACCEPTED" | "REJECTED") => {
    setRespondingId(requestId);
    try {
      await socialApi.respondToJoinRequest(requestId, action);
      toast.success(action === "ACCEPTED" ? "Teammate Accepted! 🎉" : "Join Request Declined", {
        description:
          action === "ACCEPTED"
            ? "New teammate added to the squad roster."
            : "Applicant has been notified.",
      });
      setInspectedProfile(null);
      setInspectedRequestId(null);
      await teamQuery.refetch();
      queryClient.invalidateQueries({ queryKey: ["myTeams"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["team", id] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to respond to request.");
    } finally {
      setRespondingId(null);
    }
  };

  // Submit Join Request (Non-member)
  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingJoin(true);
    try {
      await socialApi.requestToJoin(t.id, role || t.requiredRoles[0] || "Member", message);
      toast.success("Application Submitted! 🎉", {
        description: `${t.leader} will review your profile and response.`,
      });
      setRole("");
      setMessage("");
      await teamQuery.refetch();
      queryClient.invalidateQueries({ queryKey: ["myTeams"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["team", id] });
    } catch (err: any) {
      toast.error(err?.message || "Could not send join request.");
    } finally {
      setIsSubmittingJoin(false);
    }
  };

  // Remove Member (Leader)
  const handleRemoveMember = async (memberUserId: string, memberName: string) => {
    if (!confirm(`Are you sure you want to remove ${memberName} from the squad?`)) return;
    try {
      await socialApi.leaveOrRemoveMember(t.id, memberUserId);
      toast.success(`${memberName} was removed from the squad.`);
      await teamQuery.refetch();
      queryClient.invalidateQueries({ queryKey: ["myTeams"] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to remove member.");
    }
  };

  // Open Edit Modal
  const openEditModal = () => {
    setEditName(t.name);
    setEditDescription(t.description || "");
    setEditMaxMembers(t.maxMembers || 4);
    setEditIsOpen(t.isOpen !== false);
    setIsEditOpen(true);
  };

  // Save Edit Squad
  const handleSaveEdit = async () => {
    setIsUpdating(true);
    try {
      const payload: UpdateTeamPayload = {
        name: editName.trim(),
        description: editDescription.trim(),
        maxMembers: Number(editMaxMembers),
        isOpen: editIsOpen,
      };
      await socialApi.updateTeam(t.id, payload);
      toast.success("Squad updated successfully");
      setIsEditOpen(false);
      await teamQuery.refetch();
      queryClient.invalidateQueries({ queryKey: ["myTeams"] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to update squad.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Inspect Member Profile
  const inspectMemberProfile = (member: any) => {
    const prof = member.studentProfile || {};
    setInspectedProfile({
      name: member.name,
      avatarUrl: member.avatarUrl,
      universityName: prof.university?.name || "University",
      faculty: prof.faculty?.name,
      department: prof.department?.name,
      academicYear: prof.academicYear,
      bio: prof.bio,
      skills: prof.skills || [],
      interests: prof.interests || [],
      careerInterests: prof.careerInterests || [],
      githubUrl: prof.githubUrl,
      linkedinUrl: prof.linkedinUrl,
      websiteUrl: prof.websiteUrl,
    });
    setInspectedRequestId(null);
  };

  // Inspect Applicant Profile
  const inspectApplicantProfile = (request: any) => {
    const userObj = request.user || {};
    const prof = userObj.studentProfile || {};
    setInspectedProfile({
      id: userObj.id,
      name: userObj.name || request.applicant || "Applicant",
      avatarUrl: userObj.avatarUrl,
      universityEmailVerified: userObj.universityEmailVerified,
      universityName: prof.university?.name || "University",
      faculty: prof.faculty?.name,
      department: prof.department?.name,
      academicYear: prof.academicYear,
      batchYear: prof.batchYear,
      bio: prof.bio,
      skills: prof.skills || [],
      interests: prof.interests || [],
      careerInterests: prof.careerInterests || [],
      githubUrl: prof.githubUrl,
      linkedinUrl: prof.linkedinUrl,
      websiteUrl: prof.websiteUrl,
      experiences: prof.experiences || [],
      certificates: prof.certificates || [],
      applicationMessage: request.message,
      preferredRole: request.preferredRole || request.role,
      appliedAt: request.requestedAt || request.createdAt,
    });
    setInspectedRequestId(request.id);
  };

  return (
    <div className="space-y-6">
      <Link
        to="/account/teams"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Squad Hub
      </Link>

      {/* SQUAD HEADER BANNER */}
      <header className="rounded-2xl border border-border bg-navy p-6 text-navy-foreground shadow-lg">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">{t.name}</h1>
              {isRecruiting ? (
                <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                  Recruiting Members
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/70">
                  {isFull ? "Squad Full" : "Recruitment Closed"}
                </span>
              )}
            </div>

            <p className="mt-1.5 text-sm text-navy-foreground/80 flex items-center gap-1.5">
              <Building2 className="size-4 text-primary shrink-0" />
              {t.eventTitle || "General Campus Project"}
            </p>

            {t.description && (
              <p className="mt-3 text-sm leading-relaxed text-navy-foreground/90 max-w-3xl">
                {t.description}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-navy-foreground/80">
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-3.5" />
                {t.members.length} / {t.maxMembers || 4} members ({t.openSlots} open slots)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock className="size-3.5" />
                {AVAILABILITY_LABEL[t.availability || "FLEXIBLE"]}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Crown className="size-3.5 text-amber-400" />
                Led by {t.leader}
              </span>
            </div>
          </div>

          {isLeader && (
            <div className="flex shrink-0 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9 bg-white/10 text-white border-white/20 hover:bg-white/20"
                onClick={openEditModal}
              >
                <Settings className="mr-1.5 size-4" />
                Squad Settings
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT 2 COLS: ROSTER & APPLICANT MANAGEMENT */}
        <div className="space-y-6 lg:col-span-2">
          {/* SQUAD MEMBERS ROSTER */}
          <section className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h2 className="text-base font-bold flex items-center gap-2">
                  <UserCheck className="size-4 text-primary" />
                  Squad Lineup & Roster ({t.members.length}/{t.maxMembers || 4})
                </h2>
                <p className="text-xs text-muted-foreground">
                  Active teammates registered in this squad.
                </p>
              </div>
            </div>

            <ul className="mt-3 divide-y divide-border">
              {t.members.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3 py-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    {m.avatarUrl ? (
                      <img
                        src={m.avatarUrl}
                        alt={m.name}
                        className="size-10 rounded-full border border-border object-cover shrink-0"
                      />
                    ) : (
                      <OrgAvatar initials={getInitials(m.name)} className="size-10 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold">{m.name}</p>
                        {m.isLeader && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                            <Crown className="size-3" />
                            Leader
                          </span>
                        )}
                      </div>
                      <p className="truncate text-xs text-muted-foreground">{m.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => inspectMemberProfile(m)}
                    >
                      View Profile
                    </Button>

                    {isLeader && !m.isLeader && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveMember(m.userId || m.id, m.name)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* LEADER APPLICANT REVIEW PANEL */}
          {isLeader && (
            <section className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="text-base font-bold flex items-center gap-2">
                    <UserPlus className="size-4 text-amber-500" />
                    Candidate Join Applications ({pendingRequests.length} Pending)
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Inspect applicant verified student profiles and messages before accepting them into the squad.
                  </p>
                </div>
              </div>

              {pendingRequests.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-sm font-semibold">No pending applications</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    When students request to join your squad, their profile cards will appear here for review.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {pendingRequests.map((r: any) => (
                    <div
                      key={r.id}
                      className="rounded-xl border border-border/80 bg-surface/40 p-4 transition-all hover:bg-surface/80"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          {r.user?.avatarUrl ? (
                            <img
                              src={r.user.avatarUrl}
                              alt={r.user.name}
                              className="size-11 rounded-full border border-border object-cover shrink-0"
                            />
                          ) : (
                            <OrgAvatar
                              initials={getInitials(r.user?.name || r.applicant || "Applicant")}
                              className="size-11 shrink-0"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-sm truncate">
                                {r.user?.name || r.applicant}
                              </h4>
                              {r.user?.universityEmailVerified && (
                                <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Applying for:{" "}
                              <span className="font-semibold text-primary">
                                {r.preferredRole || r.role || "Member"}
                              </span>{" "}
                              · {relativeTime(r.requestedAt || r.createdAt)}
                            </p>
                            {r.user?.studentProfile?.university?.name && (
                              <p className="text-[11px] text-muted-foreground">
                                {r.user.studentProfile.university.name}
                                {r.user.studentProfile.academicYear
                                  ? ` (${r.user.studentProfile.academicYear})`
                                  : ""}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs"
                            onClick={() => inspectApplicantProfile(r)}
                          >
                            Inspect Full Profile
                          </Button>
                          <Button
                            size="sm"
                            className="h-8 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                            disabled={respondingId === r.id || isFull}
                            onClick={() => handleRespond(r.id, "ACCEPTED")}
                          >
                            <Check className="mr-1 size-3.5" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 text-xs text-muted-foreground hover:text-destructive"
                            disabled={respondingId === r.id}
                            onClick={() => handleRespond(r.id, "REJECTED")}
                          >
                            <X className="mr-1 size-3.5" />
                            Decline
                          </Button>
                        </div>
                      </div>

                      {r.message && (
                        <div className="mt-3 rounded-lg border border-border/60 bg-background/60 p-3">
                          <p className="text-xs italic text-foreground/90 leading-relaxed">
                            "{r.message}"
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* JOIN REQUEST FORM (If not member and recruiting) */}
          {!isMember && (
            <section className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <h2 className="text-base font-bold">Request to Join {t.name}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Introduce yourself, select a target role, and tell {t.leader} why you're a great addition to this squad.
              </p>

              {hasPendingRequest ? (
                <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-amber-500 shrink-0" />
                    <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                      Join Request Pending Review
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    You submitted an application for{" "}
                    <span className="font-semibold text-foreground">
                      {myRequest.preferredRole || myRequest.role || "Member"}
                    </span>{" "}
                    {relativeTime(myRequest.requestedAt || myRequest.createdAt)}. The team leader ({t.leader}) will review your profile.
                  </p>
                  {myRequest.message && (
                    <div className="mt-2.5 rounded-md bg-surface/70 p-2.5 border border-border/50">
                      <p className="text-xs italic text-foreground/90">"{myRequest.message}"</p>
                    </div>
                  )}
                </div>
              ) : isRecruiting ? (
                <form onSubmit={handleJoinSubmit} className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="join-role" className="text-xs font-bold uppercase tracking-wider">
                      Role You Want to Fill
                    </Label>
                    <Input
                      id="join-role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder={t.requiredRoles[0] ?? "e.g. Lead Developer, UX Designer"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="join-message" className="text-xs font-bold uppercase tracking-wider">
                      Application Pitch / Note
                    </Label>
                    <Textarea
                      id="join-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Highlight your previous project experience, skills, and weekly availability."
                    />
                  </div>
                  <Button type="submit" disabled={isSubmittingJoin} className="bg-primary font-semibold">
                    {isSubmittingJoin ? "Submitting Application…" : "Submit Join Request"}
                  </Button>
                </form>
              ) : (
                <div className="mt-4 rounded-lg border border-muted p-4 bg-surface/50 text-center">
                  <p className="text-sm font-semibold text-muted-foreground">
                    This squad is currently not recruiting additional members.
                  </p>
                </div>
              )}
            </section>
          )}
        </div>

        {/* RIGHT 1 COL: SIDEBAR (COMPATIBILITY, OPEN POSITIONS, SKILLS) */}
        <aside className="space-y-5">
          <PanelCard title="Your Compatibility">
            <CompatibilityScore value={t.compatibility} />
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Calculated using verified skills, faculty alignment, and project requirements.
            </p>
          </PanelCard>

          <PanelCard title="Open Positions & Roles">
            {t.requiredRoles && t.requiredRoles.length > 0 ? (
              <ul className="space-y-2">
                {t.requiredRoles.map((r) => (
                  <li
                    key={r}
                    className="rounded-lg bg-surface px-3 py-2 text-xs font-semibold border border-border/50 text-foreground"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground">General open teammate slots.</p>
            )}

            {t.skills && t.skills.length > 0 && (
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Required Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {t.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-surface px-2 py-0.5 text-xs text-foreground border border-border/40"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </PanelCard>
        </aside>
      </div>

      {/* EDIT SQUAD MODAL */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Squad Settings</DialogTitle>
            <DialogDescription>
              Configure recruitment status and capacity for {t.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-squad-name" className="text-xs font-bold uppercase tracking-wider">
                Squad Name
              </Label>
              <Input
                id="edit-squad-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-squad-desc" className="text-xs font-bold uppercase tracking-wider">
                Description / Objective
              </Label>
              <Textarea
                id="edit-squad-desc"
                rows={3}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-squad-cap" className="text-xs font-bold uppercase tracking-wider">
                Maximum Member Capacity
              </Label>
              <Input
                id="edit-squad-cap"
                type="number"
                min={t.members.length}
                max={12}
                value={editMaxMembers}
                onChange={(e) => setEditMaxMembers(Number(e.target.value))}
              />
              <p className="text-[11px] text-muted-foreground">
                Currently {t.members.length} members in squad.
              </p>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-semibold">Open Recruitment</p>
                <p className="text-xs text-muted-foreground">
                  Allow other students to discover and apply to this squad.
                </p>
              </div>
              <Switch checked={editIsOpen} onCheckedChange={setEditIsOpen} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={isUpdating} className="bg-primary font-semibold">
              {isUpdating ? "Saving Changes…" : "Save Squad"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* APPLICANT / MEMBER PROFILE INSPECTION MODAL */}
      <UserProfileModal
        profile={inspectedProfile}
        open={Boolean(inspectedProfile)}
        onOpenChange={(o) => {
          if (!o) {
            setInspectedProfile(null);
            setInspectedRequestId(null);
          }
        }}
        onAccept={
          inspectedRequestId && isLeader
            ? () => { void handleRespond(inspectedRequestId, "ACCEPTED"); }
            : undefined
        }
        onReject={
          inspectedRequestId && isLeader
            ? () => { void handleRespond(inspectedRequestId, "REJECTED"); }
            : undefined
        }
        isResponding={Boolean(respondingId)}
      />
    </div>
  );
}
