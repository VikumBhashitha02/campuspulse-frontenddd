import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  Users,
  PlusCircle,
  Sparkles,
  Crown,
  ShieldCheck,
  Building2,
  Calendar,
  Send,
  Trash2,
  Settings,
  UserCheck,
  Clock,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Filter,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TeamCard } from "@/components/common/Cards";
import { OrgAvatar } from "@/components/common/Badges";
import { EmptyState, ErrorState, GridSkeleton, PageHeader } from "@/components/common/States";
import { UserProfileModal, type ProfileInspectionData } from "@/components/common/UserProfileModal";
import { socialApi } from "@/lib/api/social";
import { eventsApi } from "@/lib/api/events";
import { useAuth } from "@/lib/auth";
import type { CandidateStudent, CreateTeamPayload, Team, UpdateTeamPayload } from "@/lib/types";
import { cn } from "@/lib/utils";
import { relativeTime } from "@/lib/format";

export const Route = createFileRoute("/account/teams/")({
  head: () => ({
    meta: [
      { title: "Squads & Team Hub — CampusPulse" },
      {
        name: "description",
        content:
          "Discover teams for hackathons, competitions and projects, create squads, review applicant profiles, and find teammates.",
      },
      { property: "og:title", content: "Squads & Team Hub — CampusPulse" },
      { property: "og:description", content: "Discover teams, create squads, and find teammates." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TeamsHubPage,
});

const SORTS = [
  { id: "match", label: "Best match" },
  { id: "slots", label: "Most open slots" },
  { id: "name", label: "A–Z" },
] as const;

function TeamsHubPage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<string>("discover");

  // Discover Teams state
  const [term, setTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("match");
  const [targetTeam, setTargetTeam] = useState<Team | null>(null);
  const [joinRole, setJoinRole] = useState("");
  const [joinMessage, setJoinMessage] = useState("");
  const [isSubmittingJoin, setIsSubmittingJoin] = useState(false);

  // Candidate inspection & invitation state
  const [inspectedProfile, setInspectedProfile] = useState<ProfileInspectionData | null>(null);
  const [inviteTargetStudent, setInviteTargetStudent] = useState<CandidateStudent | null>(null);
  const [selectedInviteTeamId, setSelectedInviteTeamId] = useState("");
  const [inviteRole, setInviteRole] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [isSendingInvite, setIsSendingInvite] = useState(false);

  // Candidate filters
  const [candidateSearch, setCandidateSearch] = useState("");
  const [candidateSkill, setCandidateSkill] = useState("");

  // Create Team state
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDescription, setNewTeamDescription] = useState("");
  const [newTeamEventId, setNewTeamEventId] = useState("");
  const [newTeamMaxMembers, setNewTeamMaxMembers] = useState(4);
  const [newTeamRoles, setNewTeamRoles] = useState<string[]>([]);
  const [roleInput, setRoleInput] = useState("");
  const [newTeamSkills, setNewTeamSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

  // Edit Team state (Leader)
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editMaxMembers, setEditMaxMembers] = useState(4);
  const [editIsOpen, setEditIsOpen] = useState(true);
  const [isUpdatingTeam, setIsUpdatingTeam] = useState(false);

  // Data Queries
  const teamsQuery = useQuery({
    queryKey: ["teams", skillFilter],
    queryFn: () => socialApi.teams({ skill: skillFilter || undefined }),
  });

  const myTeamsQuery = useQuery({
    queryKey: ["myTeams"],
    queryFn: () => socialApi.myTeams(),
  });

  const candidatesQuery = useQuery({
    queryKey: ["candidates", candidateSearch, candidateSkill],
    queryFn: () =>
      socialApi.candidates({
        search: candidateSearch || undefined,
        skill: candidateSkill || undefined,
      }),
  });

  const opportunitiesQuery = useQuery({
    queryKey: ["opportunitiesForTeams"],
    queryFn: () => eventsApi.list({ limit: 40 }),
  });

  // Filtered & Sorted Discover Teams
  const discoverTeams = (teamsQuery.data ?? [])
    .filter(
      (t) =>
        !term ||
        t.name.toLowerCase().includes(term.toLowerCase()) ||
        t.eventTitle.toLowerCase().includes(term.toLowerCase()) ||
        t.skills.some((s) => s.toLowerCase().includes(term.toLowerCase())) ||
        t.requiredRoles.some((r) => r.toLowerCase().includes(term.toLowerCase())),
    )
    .sort((a, b) => {
      if (sort === "slots") return b.openSlots - a.openSlots;
      if (sort === "name") return a.name.localeCompare(b.name);
      return b.compatibility - a.compatibility;
    });

  // Submit Join Request
  const handleJoinSubmit = async () => {
    if (!targetTeam) return;
    setIsSubmittingJoin(true);
    try {
      await socialApi.requestToJoin(
        targetTeam.id,
        joinRole || targetTeam.requiredRoles[0] || "Member",
        joinMessage,
      );
      toast.success("Application Submitted! 🎉", {
        description: `Your request was sent to ${targetTeam.leader} for review.`,
      });
      setTargetTeam(null);
      setJoinRole("");
      setJoinMessage("");
      queryClient.invalidateQueries({ queryKey: ["myTeams"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    } catch (err: any) {
      toast.error(err?.message || "Could not submit join request. Please try again.");
    } finally {
      setIsSubmittingJoin(false);
    }
  };

  // Withdraw Join Request
  const handleWithdrawRequest = async (requestId: string) => {
    try {
      await socialApi.cancelJoinRequest(requestId);
      toast.success("Request withdrawn");
      queryClient.invalidateQueries({ queryKey: ["myTeams"] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to withdraw request.");
    }
  };

  // Create Team Submit
  const handleCreateTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) {
      toast.error("Please enter a squad name");
      return;
    }
    if (!newTeamDescription.trim()) {
      toast.error("Please enter a short squad description or objective");
      return;
    }

    setIsCreatingTeam(true);
    try {
      const payload: CreateTeamPayload = {
        name: newTeamName.trim(),
        description: newTeamDescription.trim(),
        eventId: newTeamEventId || undefined,
        maxMembers: Number(newTeamMaxMembers) || 4,
        requiredRoles: newTeamRoles,
        requiredSkills: newTeamSkills,
      };

      const created = await socialApi.createTeam(payload);
      toast.success("Squad Created! 🚀", {
        description: `You are now the team leader of "${created.name}".`,
      });

      // Reset form
      setNewTeamName("");
      setNewTeamDescription("");
      setNewTeamEventId("");
      setNewTeamMaxMembers(4);
      setNewTeamRoles([]);
      setNewTeamSkills([]);

      // Invalidate queries & switch tab to My Teams
      queryClient.invalidateQueries({ queryKey: ["myTeams"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      setActiveTab("my-teams");
    } catch (err: any) {
      toast.error(err?.message || "Failed to create squad. Check your inputs.");
    } finally {
      setIsCreatingTeam(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (t: Team) => {
    setEditingTeam(t);
    setEditName(t.name);
    setEditDescription(t.description || "");
    setEditMaxMembers(t.maxMembers || 4);
    setEditIsOpen(t.isOpen !== false);
  };

  // Save Edit Team
  const handleSaveEditTeam = async () => {
    if (!editingTeam) return;
    setIsUpdatingTeam(true);
    try {
      const payload: UpdateTeamPayload = {
        name: editName.trim(),
        description: editDescription.trim(),
        maxMembers: Number(editMaxMembers),
        isOpen: editIsOpen,
      };
      await socialApi.updateTeam(editingTeam.id, payload);
      toast.success("Squad updated successfully");
      setEditingTeam(null);
      queryClient.invalidateQueries({ queryKey: ["myTeams"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to update squad.");
    } finally {
      setIsUpdatingTeam(false);
    }
  };

  // Delete Team
  const handleDeleteTeam = async (t: Team) => {
    if (!confirm(`Are you sure you want to delete squad "${t.name}"? This action cannot be undone.`)) {
      return;
    }
    try {
      await socialApi.deleteTeam(t.id);
      toast.success(`Squad "${t.name}" deleted.`);
      queryClient.invalidateQueries({ queryKey: ["myTeams"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete team.");
    }
  };

  // Leave Team (Member)
  const handleLeaveTeam = async (t: Team) => {
    if (!user) return;
    if (!confirm(`Are you sure you want to leave "${t.name}"?`)) return;
    try {
      await socialApi.leaveOrRemoveMember(t.id, user.id);
      toast.success(`You left "${t.name}".`);
      queryClient.invalidateQueries({ queryKey: ["myTeams"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to leave squad.");
    }
  };

  // Open Invite Dialog
  const openInviteDialog = (candidate: CandidateStudent) => {
    setInviteTargetStudent(candidate);
    const createdSquads = myTeamsQuery.data?.createdTeams || [];
    if (createdSquads.length > 0 && createdSquads[0]) {
      setSelectedInviteTeamId(createdSquads[0].id);
    } else {
      setSelectedInviteTeamId("");
    }
    setInviteRole("");
    setInviteMessage("");
  };

  // Submit Invite
  const handleSendInvite = async () => {
    if (!inviteTargetStudent || !selectedInviteTeamId) {
      toast.error("Please select a squad you lead to invite this student.");
      return;
    }
    setIsSendingInvite(true);
    try {
      await socialApi.inviteCandidate(selectedInviteTeamId, {
        candidateUserId: inviteTargetStudent.userId,
        role: inviteRole.trim() || undefined,
        message: inviteMessage.trim() || undefined,
      });
      toast.success("Invitation Sent! 🤝", {
        description: `${inviteTargetStudent.name} was notified with your invitation.`,
      });
      setInviteTargetStudent(null);
    } catch (err: any) {
      toast.error(err?.message || "Failed to send invitation.");
    } finally {
      setIsSendingInvite(false);
    }
  };

  const addRoleTag = () => {
    if (roleInput.trim() && !newTeamRoles.includes(roleInput.trim())) {
      setNewTeamRoles([...newTeamRoles, roleInput.trim()]);
      setRoleInput("");
    }
  };

  const addSkillTag = () => {
    if (skillInput.trim() && !newTeamSkills.includes(skillInput.trim())) {
      setNewTeamSkills([...newTeamSkills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const myCreatedSquads = myTeamsQuery.data?.createdTeams || [];
  const myJoinedSquads = myTeamsQuery.data?.joinedTeams || [];
  const myPendingRequests = myTeamsQuery.data?.pendingRequests || [];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Squads & Teams"
        title="Student Team & Teammate Hub"
        description="Discover recruiting squads for hackathons & research, create your own team, review applicant profiles, and find teammates across universities."
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto p-1 bg-surface rounded-xl border border-border">
          <TabsTrigger value="discover" className="py-2 text-xs sm:text-sm font-semibold">
            Discover Teams
          </TabsTrigger>
          <TabsTrigger value="create" className="py-2 text-xs sm:text-sm font-semibold">
            Create a Team
          </TabsTrigger>
          <TabsTrigger value="my-teams" className="py-2 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
            My Teams
            {(myCreatedSquads.length > 0 || myJoinedSquads.length > 0) && (
              <span className="rounded-full bg-primary/20 px-1.5 py-0.2 text-[10px] font-bold text-primary">
                {myCreatedSquads.length + myJoinedSquads.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="requests" className="py-2 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
            My Requests
            {myPendingRequests.length > 0 && (
              <span className="rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                {myPendingRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="candidates" className="py-2 text-xs sm:text-sm font-semibold">
            Find Teammates
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: DISCOVER TEAMS */}
        <TabsContent value="discover" className="mt-6 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1 sm:max-w-md">
              <Label htmlFor="team-search" className="sr-only">
                Search teams
              </Label>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="team-search"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search by team, opportunity, role, or skill"
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {SORTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={sort === s.id}
                  onClick={() => setSort(s.id)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                    sort === s.id
                      ? "bg-navy text-navy-foreground dark:bg-primary dark:text-primary-foreground shadow-sm"
                      : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            {teamsQuery.isPending ? (
              <GridSkeleton count={4} />
            ) : teamsQuery.isError ? (
              <ErrorState onRetry={() => teamsQuery.refetch()} />
            ) : discoverTeams.length === 0 ? (
              <EmptyState
                icon={<Users className="size-6" aria-hidden />}
                title="No teams match your criteria"
                description="Try a different skill, role, or opportunity keyword, or start your own squad."
                action={
                  <div className="flex gap-2">
                    {term && (
                      <Button variant="outline" size="sm" onClick={() => setTerm("")}>
                        Clear search
                      </Button>
                    )}
                    <Button size="sm" onClick={() => setActiveTab("create")}>
                      <PlusCircle className="mr-1.5 size-4" />
                      Create a Team
                    </Button>
                  </div>
                }
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {discoverTeams.map((t) => (
                  <TeamCard
                    key={t.id}
                    team={t}
                    onRequest={setTargetTeam}
                    isMember={myJoinedSquads.some((j) => j.id === t.id) || myCreatedSquads.some((c) => c.id === t.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* TAB 2: CREATE A TEAM */}
        <TabsContent value="create" className="mt-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] max-w-3xl mx-auto">
            <div className="border-b border-border pb-4">
              <h2 className="text-xl font-bold">Create a New Squad</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Assemble a student squad for competitions, hackathons, research labs, or campus projects. As creator, you will be the squad leader.
              </p>
            </div>

            <form onSubmit={handleCreateTeamSubmit} className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="squad-name" className="text-xs font-bold uppercase tracking-wider">
                  Squad Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="squad-name"
                  required
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="e.g. AlgoRhythms Hackers, Quantum AI Lab"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="squad-desc" className="text-xs font-bold uppercase tracking-wider">
                  Description & Objective <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="squad-desc"
                  required
                  rows={3}
                  value={newTeamDescription}
                  onChange={(e) => setNewTeamDescription(e.target.value)}
                  placeholder="Describe your project goal, target competition, working schedule, and who you want to team up with."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="squad-event" className="text-xs font-bold uppercase tracking-wider">
                    Target Opportunity / Event (Optional)
                  </Label>
                  <select
                    id="squad-event"
                    value={newTeamEventId}
                    onChange={(e) => setNewTeamEventId(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">General Project / No Linked Event</option>
                    {(opportunitiesQuery.data ?? []).map((opp) => (
                      <option key={opp.id} value={opp.id}>
                        {opp.title} ({opp.opportunityType || "Event"})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="squad-max" className="text-xs font-bold uppercase tracking-wider">
                    Maximum Team Size
                  </Label>
                  <Input
                    id="squad-max"
                    type="number"
                    min={2}
                    max={12}
                    value={newTeamMaxMembers}
                    onChange={(e) => setNewTeamMaxMembers(Number(e.target.value))}
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Includes yourself and additional open slots.
                  </p>
                </div>
              </div>

              {/* Roles to fill */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider">
                  Roles & Positions Needed
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addRoleTag();
                      }
                    }}
                    placeholder="e.g. UI/UX Designer, ML Engineer, Pitch Lead (Press Enter)"
                  />
                  <Button type="button" variant="outline" onClick={addRoleTag}>
                    Add
                  </Button>
                </div>
                {newTeamRoles.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {newTeamRoles.map((role, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                      >
                        {role}
                        <button
                          type="button"
                          onClick={() => setNewTeamRoles(newTeamRoles.filter((_, i) => i !== idx))}
                          className="hover:text-destructive"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Required skills */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider">
                  Required Skills & Tech Stack
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkillTag();
                      }
                    }}
                    placeholder="e.g. Python, React, PyTorch, Figma (Press Enter)"
                  />
                  <Button type="button" variant="outline" onClick={addSkillTag}>
                    Add
                  </Button>
                </div>
                {newTeamSkills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {newTeamSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-foreground border border-border/80"
                      >
                        {sk}
                        <button
                          type="button"
                          onClick={() => setNewTeamSkills(newTeamSkills.filter((_, i) => i !== idx))}
                          className="hover:text-destructive"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setActiveTab("discover")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreatingTeam} className="bg-primary font-semibold">
                  {isCreatingTeam ? "Creating Squad…" : "Create & Launch Squad"}
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        {/* TAB 3: MY TEAMS */}
        <TabsContent value="my-teams" className="mt-6 space-y-8">
          {/* Squads I Lead */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="text-base font-bold flex items-center gap-2">
                  <Crown className="size-4 text-amber-500" />
                  Squads You Lead ({myCreatedSquads.length})
                </h3>
                <p className="text-xs text-muted-foreground">
                  You have leader permissions to manage roster, accept/decline join requests, and update recruitment status.
                </p>
              </div>
              <Button size="sm" onClick={() => setActiveTab("create")} className="h-8 text-xs">
                <PlusCircle className="mr-1.5 size-3.5" />
                New Squad
              </Button>
            </div>

            {myCreatedSquads.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-6 text-center mt-4">
                <p className="text-sm font-semibold">You haven't created any squads yet.</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Start a team to recruit peers with matching skills for competitions or projects.
                </p>
                <Button size="sm" onClick={() => setActiveTab("create")} className="mt-3">
                  Create your first squad
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 mt-4">
                {myCreatedSquads.map((t) => (
                  <div
                    key={t.id}
                    className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold">{t.name}</h4>
                            <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                              Leader
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground inline-flex items-center gap-1">
                            <Building2 className="size-3 text-primary" />
                            {t.eventTitle || "General Campus Squad"}
                          </p>
                        </div>
                        <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-semibold border border-border/60">
                          {t.members.length}/{t.maxMembers || 4} members
                        </span>
                      </div>

                      {t.description && (
                        <p className="mt-2.5 text-xs text-muted-foreground line-clamp-2">
                          {t.description}
                        </p>
                      )}

                      <div className="mt-3 flex items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                            t.isOpen
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {t.isOpen ? "Recruitment Active" : "Recruitment Closed"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-border pt-3.5 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs text-muted-foreground hover:text-foreground"
                          onClick={() => openEditModal(t)}
                        >
                          <Settings className="mr-1 size-3.5" />
                          Settings
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteTeam(t)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>

                      <Button asChild size="sm" className="h-8 text-xs font-semibold">
                        <Link to="/account/teams/$id" params={{ id: t.id }}>
                          Manage Roster & Requests
                          <ArrowRight className="ml-1 size-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Squads I Joined */}
          <div>
            <div className="pb-3 border-b border-border">
              <h3 className="text-base font-bold flex items-center gap-2">
                <UserCheck className="size-4 text-primary" />
                Squads You Joined as Member ({myJoinedSquads.length})
              </h3>
            </div>

            {myJoinedSquads.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-6 text-center mt-4">
                <p className="text-sm font-semibold">You haven't joined any other squads yet.</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Discover open teams in the Discover tab and submit join requests.
                </p>
                <Button size="sm" onClick={() => setActiveTab("discover")} className="mt-3">
                  Explore Recruiting Squads
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 mt-4">
                {myJoinedSquads.map((t) => (
                  <div
                    key={t.id}
                    className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-base font-bold">{t.name}</h4>
                          <p className="mt-1 text-xs text-muted-foreground inline-flex items-center gap-1">
                            <Building2 className="size-3 text-primary" />
                            {t.eventTitle || "General Campus Squad"}
                          </p>
                        </div>
                        <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-semibold border border-border/60">
                          {t.members.length}/{t.maxMembers || 4} members
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">Led by {t.leader}</p>
                    </div>

                    <div className="mt-5 border-t border-border pt-3.5 flex items-center justify-between gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-destructive hover:bg-destructive/10"
                        onClick={() => handleLeaveTeam(t)}
                      >
                        Leave Squad
                      </Button>
                      <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                        <Link to="/account/teams/$id" params={{ id: t.id }}>
                          View Squad & Teammates
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* TAB 4: MY JOIN REQUESTS */}
        <TabsContent value="requests" className="mt-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="border-b border-border pb-4">
              <h3 className="text-base font-bold">Your Outbound Join Requests</h3>
              <p className="text-xs text-muted-foreground">
                Track status of squads you requested to join. Team leaders review your profile and application note.
              </p>
            </div>

            {myPendingRequests.length === 0 ? (
              <div className="py-12 text-center">
                <Users className="mx-auto size-8 text-muted-foreground/60" />
                <p className="mt-2 text-sm font-semibold">No active join requests</p>
                <p className="text-xs text-muted-foreground mt-1">
                  When you request to join recruiting squads, they will appear here.
                </p>
                <Button size="sm" onClick={() => setActiveTab("discover")} className="mt-3">
                  Discover Teams
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border mt-2">
                {myPendingRequests.map((req: any) => (
                  <div
                    key={req.id}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-sm text-foreground">
                          {req.team?.name || "Squad"}
                        </h4>
                        {req.status === "ACCEPTED" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="size-3.5" />
                            Accepted
                          </span>
                        ) : req.status === "REJECTED" || req.status === "DECLINED" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-semibold text-destructive">
                            <XCircle className="size-3.5" />
                            Declined
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                            <Clock className="size-3.5" />
                            Pending Review
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {req.team?.event?.title || "Campus Project"} · Applied as{" "}
                        <span className="font-medium text-foreground">
                          {req.preferredRole || req.role || "Teammate"}
                        </span>{" "}
                        · {relativeTime(req.requestedAt || req.createdAt)}
                      </p>
                      {req.message && (
                        <p className="mt-2 text-xs italic text-muted-foreground/90 rounded-md bg-surface p-2 border border-border/40">
                          "{req.message}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {req.team?.id && (
                        <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                          <Link to="/account/teams/$id" params={{ id: req.team.id }}>
                            View Squad
                          </Link>
                        </Button>
                      )}
                      {req.status === "PENDING" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-xs text-muted-foreground hover:text-destructive"
                          onClick={() => handleWithdrawRequest(req.id)}
                        >
                          Withdraw
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* TAB 5: FIND TEAMMATES / CANDIDATE DISCOVERY */}
        <TabsContent value="candidates" className="mt-6 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1 sm:max-w-md">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                value={candidateSearch}
                onChange={(e) => setCandidateSearch(e.target.value)}
                placeholder="Search students by name, bio, or skills"
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Input
                value={candidateSkill}
                onChange={(e) => setCandidateSkill(e.target.value)}
                placeholder="Filter by skill (e.g. Python, Figma)"
                className="w-48 text-xs"
              />
            </div>
          </div>

          <div>
            {candidatesQuery.isPending ? (
              <GridSkeleton count={4} />
            ) : candidatesQuery.isError ? (
              <ErrorState onRetry={() => candidatesQuery.refetch()} />
            ) : (candidatesQuery.data ?? []).length === 0 ? (
              <EmptyState
                icon={<Users className="size-6" />}
                title="No student profiles match"
                description="Try broadening your search term or skill filter."
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {(candidatesQuery.data ?? []).map((cand: CandidateStudent) => (
                  <div
                    key={cand.id}
                    className="card-interactive flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
                  >
                    <div>
                      <div className="flex items-start gap-3">
                        {cand.avatarUrl ? (
                          <img
                            src={cand.avatarUrl}
                            alt={cand.name}
                            className="size-12 rounded-full border border-border object-cover shrink-0"
                          />
                        ) : (
                          <OrgAvatar
                            initials={cand.name?.slice(0, 2).toUpperCase() || "ST"}
                            className="size-12 shrink-0"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 truncate">
                            <h4 className="truncate text-sm font-bold">{cand.name}</h4>
                            {cand.universityEmailVerified && (
                              <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
                            )}
                          </div>
                          <p className="truncate text-xs text-muted-foreground">
                            {cand.universityName}
                          </p>
                          {cand.faculty && (
                            <p className="truncate text-[11px] text-muted-foreground/80">
                              {cand.faculty} {cand.academicYear ? `· ${cand.academicYear}` : ""}
                            </p>
                          )}
                        </div>
                      </div>

                      {cand.bio && (
                        <p className="mt-3 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                          {cand.bio}
                        </p>
                      )}

                      {cand.skills && cand.skills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {cand.skills.slice(0, 4).map((sk) => (
                            <span
                              key={sk}
                              className="rounded-md bg-surface px-2 py-0.5 text-[10px] font-medium text-foreground border border-border/50"
                            >
                              {sk}
                            </span>
                          ))}
                          {cand.skills.length > 4 && (
                            <span className="rounded-md bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground">
                              +{cand.skills.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {cand.compatibilityTag && (
                        <div className="mt-3">
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                            <Sparkles className="size-3" />
                            {cand.compatibilityTag}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 border-t border-border pt-3 flex items-center justify-between gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                        onClick={() => setInspectedProfile(cand)}
                      >
                        View Profile
                      </Button>

                      {myCreatedSquads.length > 0 && (
                        <Button
                          size="sm"
                          className="h-8 text-xs font-semibold"
                          onClick={() => openInviteDialog(cand)}
                        >
                          <Send className="mr-1 size-3" />
                          Invite to Squad
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* REQUEST TO JOIN MODAL */}
      <Dialog open={Boolean(targetTeam)} onOpenChange={(o) => !o && setTargetTeam(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request to join {targetTeam?.name}</DialogTitle>
            <DialogDescription>
              State which role you want to fill and introduce yourself to {targetTeam?.leader}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="join-role" className="text-xs font-bold uppercase tracking-wider">
                Role You'd Fill
              </Label>
              <Input
                id="join-role"
                value={joinRole}
                onChange={(e) => setJoinRole(e.target.value)}
                placeholder={targetTeam?.requiredRoles[0] ?? "e.g. Frontend Developer, Designer"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="join-message" className="text-xs font-bold uppercase tracking-wider">
                Application Message / Pitch
              </Label>
              <Textarea
                id="join-message"
                rows={4}
                value={joinMessage}
                onChange={(e) => setJoinMessage(e.target.value)}
                placeholder="Share your experience, skills, and why you are excited to team up with this squad."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTargetTeam(null)}>
              Cancel
            </Button>
            <Button onClick={handleJoinSubmit} disabled={isSubmittingJoin} className="bg-primary font-semibold">
              {isSubmittingJoin ? "Sending…" : "Submit Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT SQUAD MODAL (Leader) */}
      <Dialog open={Boolean(editingTeam)} onOpenChange={(o) => !o && setEditingTeam(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Squad Settings</DialogTitle>
            <DialogDescription>
              Configure recruitment status and capacity for {editingTeam?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-xs font-bold uppercase tracking-wider">
                Squad Name
              </Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-desc" className="text-xs font-bold uppercase tracking-wider">
                Objective / Description
              </Label>
              <Textarea
                id="edit-desc"
                rows={3}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-cap" className="text-xs font-bold uppercase tracking-wider">
                Max Members Capacity
              </Label>
              <Input
                id="edit-cap"
                type="number"
                min={editingTeam?.members.length || 2}
                max={12}
                value={editMaxMembers}
                onChange={(e) => setEditMaxMembers(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-semibold">Recruiting Status</p>
                <p className="text-xs text-muted-foreground">
                  Allow other students to discover and apply to this team.
                </p>
              </div>
              <Switch checked={editIsOpen} onCheckedChange={setEditIsOpen} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTeam(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEditTeam} disabled={isUpdatingTeam} className="bg-primary font-semibold">
              {isUpdatingTeam ? "Saving…" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* INVITE CANDIDATE TO SQUAD MODAL */}
      <Dialog
        open={Boolean(inviteTargetStudent)}
        onOpenChange={(o) => !o && setInviteTargetStudent(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite {inviteTargetStudent?.name} to Squad</DialogTitle>
            <DialogDescription>
              Send an invitation to join one of the squads you lead.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="invite-squad" className="text-xs font-bold uppercase tracking-wider">
                Select Squad You Lead
              </Label>
              <select
                id="invite-squad"
                value={selectedInviteTeamId}
                onChange={(e) => setSelectedInviteTeamId(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {myCreatedSquads.map((sq) => (
                  <option key={sq.id} value={sq.id}>
                    {sq.name} ({sq.members.length}/{sq.maxMembers || 4} members)
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-role" className="text-xs font-bold uppercase tracking-wider">
                Proposed Role
              </Label>
              <Input
                id="invite-role"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                placeholder="e.g. Lead Backend Engineer, Designer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-note" className="text-xs font-bold uppercase tracking-wider">
                Personal Invitation Note
              </Label>
              <Textarea
                id="invite-note"
                rows={3}
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                placeholder="Hi! We saw your profile and skills and would love to have you on our squad."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteTargetStudent(null)}>
              Cancel
            </Button>
            <Button onClick={handleSendInvite} disabled={isSendingInvite} className="bg-primary font-semibold">
              {isSendingInvite ? "Sending…" : "Send Squad Invitation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* STUDENT PROFILE INSPECTION MODAL */}
      <UserProfileModal
        profile={inspectedProfile}
        open={Boolean(inspectedProfile)}
        onOpenChange={(o) => !o && setInspectedProfile(null)}
      />
    </div>
  );
}
