import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Award,
  BadgeCheck,
  Briefcase,
  Building,
  Calendar,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Lock,
  Mail,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Trophy,
  Users,
  Globe,
  FileCheck2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ErrorState, PageHeader, RowSkeleton } from "@/components/common/States";
import { PanelCard } from "@/components/common/Section";
import { OrgAvatar } from "@/components/common/Badges";
import { Link } from "@tanstack/react-router";
import { directoryApi } from "@/lib/api/directory";
import { socialApi } from "@/lib/api/social";
import type { StudentExperienceItem } from "@/lib/types";

export const Route = createFileRoute("/account/profile")({
  head: () => ({
    meta: [
      { title: "My Profile & Portfolio — CampusPulse" },
      {
        name: "description",
        content: "Manage your CampusPulse verified student identity, skills, experiences, and verified campus activity.",
      },
      { property: "og:title", content: "My Profile & Portfolio — CampusPulse" },
      { property: "og:description", content: "Verified student profile and campus portfolio." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const query = useQuery({ queryKey: ["profile"], queryFn: () => socialApi.profile() });
  const myOrgsQuery = useQuery({ queryKey: ["myOrganizations"], queryFn: () => directoryApi.myOrganizations() });
  const organizations = myOrgsQuery.data ?? [];

  // User-entered form state
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [intakeSemester, setIntakeSemester] = useState("");
  const [studentIdNumber, setStudentIdNumber] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  // Skills & Interests state (chip lists)
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [interestsList, setInterestsList] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");
  const [careerInterestsList, setCareerInterestsList] = useState<string[]>([]);
  const [newCareerInterest, setNewCareerInterest] = useState("");

  // Experiences state
  const [experiences, setExperiences] = useState<StudentExperienceItem[]>([]);
  const [showAddExp, setShowAddExp] = useState(false);
  const [expTitle, setExpTitle] = useState("");
  const [expOrg, setExpOrg] = useState("");
  const [expLocation, setExpLocation] = useState("");
  const [expStart, setExpStart] = useState("");
  const [expEnd, setExpEnd] = useState("");
  const [expCurrent, setExpCurrent] = useState(false);
  const [expDesc, setExpDesc] = useState("");

  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!query.data) return;
    const p = query.data;
    setAvatarUrl(p.avatarUrl || "");
    setName(p.name || "");
    setBio(p.bio || "");
    setAcademicYear(p.academicYear || "3rd Year");
    setIntakeSemester(p.intakeSemester || "2023 Intake");
    setStudentIdNumber(p.studentIdNumber || "");
    setGithubUrl(p.githubUrl || "");
    setLinkedinUrl(p.linkedinUrl || "");
    setWebsiteUrl(p.websiteUrl || "");
    setSkillsList(p.skills || []);
    setInterestsList(p.interests || []);
    setCareerInterestsList(p.careerInterests || []);
    setExperiences(p.experiences || []);
  }, [query.data]);

  if (query.isPending) return <RowSkeleton count={4} />;
  if (query.isError || !query.data) return <ErrorState onRetry={() => query.refetch()} />;
  const profile = query.data;
  const verifiedActivity = profile.verifiedCampusActivity;
  const isUniVerified = profile.universityIdentity?.isVerified ?? false;

  // Profile strength calculation
  const completeness = Math.min(
    100,
    Math.round(
      ((bio.trim() ? 1 : 0) +
        (skillsList.length > 0 ? 1 : 0) +
        (interestsList.length > 0 || careerInterestsList.length > 0 ? 1 : 0) +
        (experiences.length > 0 ? 1 : 0) +
        (githubUrl || linkedinUrl || websiteUrl ? 1 : 0)) *
        20,
    ),
  );

  // Skill management helpers
  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skillsList.includes(trimmed)) {
      setSkillsList([...skillsList, trimmed]);
      setNewSkill("");
      setSaved(false);
    }
  };

  const removeSkill = (skill: string) => {
    setSkillsList(skillsList.filter((s) => s !== skill));
    setSaved(false);
  };

  const addInterest = () => {
    const trimmed = newInterest.trim();
    if (trimmed && !interestsList.includes(trimmed)) {
      setInterestsList([...interestsList, trimmed]);
      setNewInterest("");
      setSaved(false);
    }
  };

  const removeInterest = (interest: string) => {
    setInterestsList(interestsList.filter((i) => i !== interest));
    setSaved(false);
  };

  const addCareerInterest = () => {
    const trimmed = newCareerInterest.trim();
    if (trimmed && !careerInterestsList.includes(trimmed)) {
      setCareerInterestsList([...careerInterestsList, trimmed]);
      setNewCareerInterest("");
      setSaved(false);
    }
  };

  const removeCareerInterest = (career: string) => {
    setCareerInterestsList(careerInterestsList.filter((c) => c !== career));
    setSaved(false);
  };

  // Experience management helpers
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle.trim() || !expOrg.trim() || !expStart) {
      toast.error("Please fill in role title, organization name, and start date.");
      return;
    }
    const newExp: StudentExperienceItem = {
      title: expTitle.trim(),
      organizationName: expOrg.trim(),
      startDate: expStart,
      endDate: expCurrent ? null : expEnd || null,
      isCurrent: expCurrent,
      ...(expLocation.trim() ? { location: expLocation.trim() } : {}),
      ...(expDesc.trim() ? { description: expDesc.trim() } : {}),
    };
    setExperiences([newExp, ...experiences]);
    setExpTitle("");
    setExpOrg("");
    setExpLocation("");
    setExpStart("");
    setExpEnd("");
    setExpCurrent(false);
    setExpDesc("");
    setShowAddExp(false);
    setSaved(false);
    toast.success("Experience added to your draft profile.");
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
    setSaved(false);
  };

  // Save profile changes
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await socialApi.updateProfile({
        name: name.trim() || undefined,
        avatarUrl: avatarUrl.trim() || undefined,
        bio: bio.trim(),
        academicYear: academicYear.trim(),
        intakeSemester: intakeSemester.trim(),
        studentIdNumber: studentIdNumber.trim(),
        githubUrl: githubUrl.trim(),
        linkedinUrl: linkedinUrl.trim(),
        websiteUrl: websiteUrl.trim(),
        skills: skillsList,
        interests: interestsList,
        careerInterests: careerInterestsList,
        experiences,
      });
      setSaved(true);
      await query.refetch();
      toast.success("Profile saved successfully", {
        description: "Your public portfolio and recommendations have been updated.",
      });
    } catch (err: any) {
      console.error("Failed to save profile:", err);
      const msg = err?.response?.data?.message || err?.message || "Couldn't save your profile. Please try again.";
      const errorText = Array.isArray(msg) ? msg.join(", ") : String(msg);
      toast.error(errorText || "Couldn't save your profile. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-8">
      <div className="min-w-0">
        <PageHeader
          title="Student Profile & Portfolio"
          description="Manage your verified university identity, public skills, experiences, and authenticated campus track record."
        />

        {/* Identity & Verification Card */}
        <div className="mt-6 rounded-2xl border border-border bg-navy p-6 text-navy-foreground shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-4">
              {profile.avatarUrl || avatarUrl ? (
                <img
                  src={avatarUrl || profile.avatarUrl}
                  alt={profile.name}
                  className="size-16 shrink-0 rounded-full border-2 border-gold/40 object-cover shadow-inner"
                />
              ) : (
                <OrgAvatar initials={profile.avatarInitials || "CP"} className="size-16 shrink-0 text-lg border-2 border-gold/40 shadow-inner" />
              )}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-xl font-bold tracking-tight text-white">{name || profile.name}</p>
                  {isUniVerified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-semibold text-gold border border-gold/40 shadow-sm">
                      <ShieldCheck className="size-3.5" aria-hidden />
                      Verified University Student
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/70">
                      Unverified University Identity
                    </span>
                  )}
                </div>
                <p className="mt-1 inline-flex items-center gap-1.5 truncate text-sm text-navy-foreground/80">
                  <Mail className="size-3.5 shrink-0" aria-hidden />
                  {profile.email}
                  {profile.universityIdentity?.emailDomain && (
                    <span className="text-xs text-navy-foreground/60 font-mono">
                      (@{profile.universityIdentity.emailDomain})
                    </span>
                  )}
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 truncate text-xs text-navy-foreground/75">
                  <GraduationCap className="size-3.5 shrink-0" aria-hidden />
                  {profile.universityName} · {profile.faculty} · {profile.department}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-navy-foreground/70">
                  <span className="rounded bg-white/10 px-2 py-0.5 font-medium">
                    {profile.academicYear || "3rd Year"}
                  </span>
                  <span className="rounded bg-white/10 px-2 py-0.5 font-medium">
                    {profile.intakeSemester || `Batch ${profile.batch}`}
                  </span>
                  {profile.studentIdNumber && (
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono">
                      ID: {profile.studentIdNumber}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats Ribbon */}
            {verifiedActivity && (
              <div className="flex shrink-0 flex-wrap gap-2 border-t border-white/10 pt-3 sm:flex-col sm:border-t-0 sm:border-l sm:pl-5 sm:pt-0">
                <div className="flex items-center gap-1.5 text-xs text-navy-foreground/90">
                  <Calendar className="size-3.5 text-gold" aria-hidden />
                  <span className="font-bold">{verifiedActivity.summary.eventsCount}</span> Events Participated
                </div>
                <div className="flex items-center gap-1.5 text-xs text-navy-foreground/90">
                  <Trophy className="size-3.5 text-gold" aria-hidden />
                  <span className="font-bold">{verifiedActivity.summary.competitionsCount}</span> Competitions
                </div>
                <div className="flex items-center gap-1.5 text-xs text-navy-foreground/90">
                  <Award className="size-3.5 text-gold" aria-hidden />
                  <span className="font-bold">
                    {verifiedActivity.summary.certificatesCount + verifiedActivity.summary.achievementsCount}
                  </span> Credentials
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabbed Navigation */}
        <div className="mt-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted/60 p-1">
              <TabsTrigger value="overview" className="rounded-lg py-2.5 text-sm font-semibold">
                ✍️ Identity & Professional Info
              </TabsTrigger>
              <TabsTrigger value="verified-history" className="rounded-lg py-2.5 text-sm font-semibold">
                🛡️ Verified Campus Activity
                {verifiedActivity && (
                  <Badge variant="secondary" className="ml-2 px-1.5 py-0 text-[10px] font-bold">
                    {verifiedActivity.summary.eventsCount +
                      verifiedActivity.summary.volunteeringCount +
                      verifiedActivity.summary.certificatesCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: User-Entered Information */}
            <TabsContent value="overview" className="mt-6 space-y-6">
              <form onSubmit={save} className="space-y-6">
                {/* Basic Identity & Profile Picture */}
                <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <h3 className="text-base font-bold text-foreground">Personal Identity & Photo</h3>
                    <span className="text-xs text-muted-foreground">Publicly visible on your profile</span>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="profile-name">Full Name</Label>
                      <Input
                        id="profile-name"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setSaved(false);
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="profile-avatar">Profile Picture URL</Label>
                      <Input
                        id="profile-avatar"
                        placeholder="https://images.unsplash.com/... or image link"
                        value={avatarUrl}
                        onChange={(e) => {
                          setAvatarUrl(e.target.value);
                          setSaved(false);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Academic & Intake info */}
                <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <h3 className="text-base font-bold text-foreground">Academic Status</h3>
                    <span className="text-xs text-muted-foreground">Self-reported status</span>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="academic-year">Academic Year</Label>
                      <Input
                        id="academic-year"
                        placeholder="e.g. 3rd Year, Final Year"
                        value={academicYear}
                        onChange={(e) => {
                          setAcademicYear(e.target.value);
                          setSaved(false);
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="intake-semester">Intake / Batch</Label>
                      <Input
                        id="intake-semester"
                        placeholder="e.g. 2023 Intake, Semester 1"
                        value={intakeSemester}
                        onChange={(e) => {
                          setIntakeSemester(e.target.value);
                          setSaved(false);
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="student-id-number">Student ID Number</Label>
                      <Input
                        id="student-id-number"
                        placeholder="e.g. S20230041"
                        value={studentIdNumber}
                        onChange={(e) => {
                          setStudentIdNumber(e.target.value);
                          setSaved(false);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* University Organizations & Society Roles */}
                <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-foreground">University Organizations & Roles</h3>
                      <p className="text-xs text-muted-foreground">
                        Societies, clubs, and branches where you are an active member or executive officer.
                      </p>
                    </div>
                    <Button asChild size="sm" variant="outline" className="text-xs font-semibold">
                      <Link to="/organizer">+ Manage Societies</Link>
                    </Button>
                  </div>

                  {organizations.length === 0 ? (
                    <div className="py-4 text-center text-xs text-muted-foreground">
                      You haven't joined any university organizations yet. Go to the{" "}
                      <Link to="/organizer" className="text-primary hover:underline font-semibold">
                        Workspace
                      </Link>{" "}
                      to join your campus societies.
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {organizations.map((org) => (
                        <div
                          key={org.id || org.organizationId}
                          className="flex items-center gap-3 rounded-xl border border-border/70 bg-surface/60 p-3.5"
                        >
                          <OrgAvatar initials={org.organizationName?.slice(0, 2) || "SO"} />
                          <div className="min-w-0">
                            <Link
                              to="/organizations/$slug"
                              params={{ slug: org.organizationSlug || org.organizationId }}
                              className="block truncate text-sm font-bold text-foreground hover:underline"
                            >
                              {org.organizationName}
                            </Link>
                            <div className="mt-1 flex items-center gap-1.5">
                              <span className="rounded bg-primary/10 px-1.5 py-0.2 text-[10px] font-bold text-primary">
                                {org.role.replace(/_/g, " ")}
                              </span>
                              <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                {org.status || "ACTIVE"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Biography */}
                <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="profile-bio" className="text-sm font-bold">
                      About & Bio
                    </Label>
                    <span className="text-xs text-muted-foreground">{bio.length}/1000 characters</span>
                  </div>
                  <Textarea
                    id="profile-bio"
                    rows={4}
                    placeholder="Share your academic background, technical focus, and what kind of projects or hackathons you want to collaborate on..."
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value);
                      setSaved(false);
                    }}
                  />
                </div>

                {/* Professional & Social Links */}
                <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-foreground">Professional & Social Links</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="profile-github" className="text-xs">GitHub Profile</Label>
                      <Input
                        id="profile-github"
                        placeholder="https://github.com/yourhandle"
                        value={githubUrl}
                        onChange={(e) => {
                          setGithubUrl(e.target.value);
                          setSaved(false);
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="profile-linkedin" className="text-xs">LinkedIn Profile</Label>
                      <Input
                        id="profile-linkedin"
                        placeholder="https://linkedin.com/in/yourhandle"
                        value={linkedinUrl}
                        onChange={(e) => {
                          setLinkedinUrl(e.target.value);
                          setSaved(false);
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="profile-website" className="text-xs">Portfolio / Website</Label>
                      <Input
                        id="profile-website"
                        placeholder="https://yourportfolio.dev"
                        value={websiteUrl}
                        onChange={(e) => {
                          setWebsiteUrl(e.target.value);
                          setSaved(false);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Normalized Skills */}
                <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Skills</h3>
                      <p className="text-xs text-muted-foreground">Used for matchmaking in team finder and opportunity recommendations.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Add a skill (e.g. Next.js, Python, UI Design)..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={addSkill} className="shrink-0">
                      <Plus className="size-4 mr-1" /> Add
                    </Button>
                  </div>

                  {skillsList.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {skillsList.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-surface border border-border px-3 py-1 text-xs font-semibold text-foreground shadow-2xs"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-muted-foreground hover:text-destructive cursor-pointer"
                            aria-label={`Remove ${skill}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">No skills added yet.</p>
                  )}
                </div>

                {/* Interests & Career Aspirations */}
                <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-foreground">Interests & Topics</h3>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Add an interest (e.g. AI Research, Hackathons, Robotics)..."
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addInterest();
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={addInterest} className="shrink-0">
                        <Plus className="size-4 mr-1" /> Add
                      </Button>
                    </div>
                    {interestsList.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {interestsList.map((i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-2xs"
                          >
                            {i}
                            <button
                              type="button"
                              onClick={() => removeInterest(i)}
                              className="text-accent-foreground/70 hover:text-destructive cursor-pointer"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-3 border-t border-border/60">
                    <h3 className="text-sm font-bold text-foreground">Target Career Roles</h3>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Target roles (e.g. Full-Stack Engineer, Product Manager)..."
                        value={newCareerInterest}
                        onChange={(e) => setNewCareerInterest(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addCareerInterest();
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={addCareerInterest} className="shrink-0">
                        <Plus className="size-4 mr-1" /> Add
                      </Button>
                    </div>
                    {careerInterestsList.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {careerInterestsList.map((c) => (
                          <span
                            key={c}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary shadow-2xs"
                          >
                            {c}
                            <button
                              type="button"
                              onClick={() => removeCareerInterest(c)}
                              className="text-primary/70 hover:text-destructive cursor-pointer"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Professional & Leadership Experience Section */}
                <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-foreground">Work & Campus Experience</h3>
                      <p className="text-xs text-muted-foreground">Internships, club officer roles, and community leadership.</p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setShowAddExp(!showAddExp)}
                      className="cursor-pointer"
                    >
                      <Plus className="size-3.5 mr-1" />
                      {showAddExp ? "Cancel" : "Add Experience"}
                    </Button>
                  </div>

                  {/* Add Experience Inline Form */}
                  {showAddExp && (
                    <div className="rounded-lg border border-primary/20 bg-muted/30 p-4 space-y-3">
                      <h4 className="text-sm font-semibold text-foreground">Add Experience Record</h4>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="space-y-1">
                          <Label htmlFor="exp-title" className="text-xs">Role Title *</Label>
                          <Input
                            id="exp-title"
                            placeholder="e.g. Software Engineering Intern"
                            value={expTitle}
                            onChange={(e) => setExpTitle(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="exp-org" className="text-xs">Organization / Company *</Label>
                          <Input
                            id="exp-org"
                            placeholder="e.g. Lanka Software Lab"
                            value={expOrg}
                            onChange={(e) => setExpOrg(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="exp-loc" className="text-xs">Location</Label>
                          <Input
                            id="exp-loc"
                            placeholder="e.g. Colombo, Sri Lanka (or Remote)"
                            value={expLocation}
                            onChange={(e) => setExpLocation(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="exp-start" className="text-xs">Start Date *</Label>
                          <Input
                            id="exp-start"
                            type="date"
                            value={expStart}
                            onChange={(e) => setExpStart(e.target.value)}
                          />
                        </div>
                        {!expCurrent && (
                          <div className="space-y-1">
                            <Label htmlFor="exp-end" className="text-xs">End Date</Label>
                            <Input
                              id="exp-end"
                              type="date"
                              value={expEnd}
                              onChange={(e) => setExpEnd(e.target.value)}
                            />
                          </div>
                        )}
                        <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                          <input
                            type="checkbox"
                            id="exp-current"
                            checked={expCurrent}
                            onChange={(e) => setExpCurrent(e.target.checked)}
                            className="size-4 rounded border-border"
                          />
                          <Label htmlFor="exp-current" className="text-xs cursor-pointer">
                            I currently hold this role
                          </Label>
                        </div>
                        <div className="sm:col-span-2 space-y-1">
                          <Label htmlFor="exp-desc" className="text-xs">Description / Key Accomplishments</Label>
                          <Textarea
                            id="exp-desc"
                            rows={3}
                            placeholder="Describe your responsibilities and major contributions..."
                            value={expDesc}
                            onChange={(e) => setExpDesc(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddExp(false)}>
                          Cancel
                        </Button>
                        <Button type="button" size="sm" onClick={handleAddExperience}>
                          Save Experience
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Experiences List */}
                  {experiences.length > 0 ? (
                    <div className="space-y-3">
                      {experiences.map((exp, idx) => (
                        <div
                          key={exp.id || idx}
                          className="flex items-start justify-between rounded-lg border border-border bg-card p-4 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-foreground">{exp.title}</h4>
                              {exp.isCurrent && (
                                <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                                  Current Role
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-medium text-foreground/80">
                              {exp.organizationName}
                              {exp.location && ` · ${exp.location}`}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {new Date(exp.startDate).toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric",
                              })}{" "}
                              –{" "}
                              {exp.isCurrent || !exp.endDate
                                ? "Present"
                                : new Date(exp.endDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                  })}
                            </p>
                            {exp.description && (
                              <p className="text-xs text-muted-foreground pt-1">{exp.description}</p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeExperience(idx)}
                            className="text-muted-foreground hover:text-destructive cursor-pointer p-1"
                            title="Remove experience"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic py-2">
                      No experiences added yet. Click &quot;Add Experience&quot; to showcase your student leadership or internships.
                    </p>
                  )}
                </div>

                {/* Form Submit Footer */}
                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" disabled={busy} className="font-semibold cursor-pointer">
                    {busy ? "Saving Changes…" : "Save Changes"}
                  </Button>
                  {saved && !busy && (
                    <p role="status" className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
                      <CheckCircle2 className="size-4" /> Saved successfully
                    </p>
                  )}
                </div>
              </form>
            </TabsContent>

            {/* TAB 2: Verified Campus Activity */}
            <TabsContent value="verified-history" className="mt-6 space-y-6">
              {/* Authenticated Integrity Banner */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-foreground/90">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground">Authenticated Campus Track Record</p>
                    <p className="mt-0.5 text-muted-foreground">
                      Records in this section are authenticated through official event registration check-ins, society
                      leadership appointments, and verified certificates. They cannot be self-edited or forged.
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Competitions & Hackathons */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="size-4 text-gold" />
                    <h3 className="text-base font-bold text-foreground">Competitions & Hackathons</h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {verifiedActivity?.competitions.length ?? 0} Recorded
                  </Badge>
                </div>

                {verifiedActivity && verifiedActivity.competitions.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {verifiedActivity.competitions.map((comp) => (
                      <div
                        key={comp.id}
                        className="rounded-lg border border-border bg-muted/20 p-4 space-y-2 hover:border-gold/40 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-bold text-foreground">{comp.title}</h4>
                          <span className="shrink-0 rounded bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold">
                            Competitive
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{comp.organizationName}</p>
                        <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground border-t border-border/40">
                          <span>{new Date(comp.startDate).toLocaleDateString()}</span>
                          {comp.teamName ? (
                            <span className="font-semibold text-primary flex items-center gap-1">
                              <Users className="size-3" /> {comp.teamName}
                            </span>
                          ) : (
                            <span className="text-success font-medium">Confirmed Attendee</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic py-2">
                    No verified competition records yet. Participate in campus hackathons to build your track record!
                  </p>
                )}
              </div>

              {/* Verified Events & Workshops */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-primary" />
                    <h3 className="text-base font-bold text-foreground">Participated Events & Workshops</h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {verifiedActivity?.events.length ?? 0} Events
                  </Badge>
                </div>

                {verifiedActivity && verifiedActivity.events.length > 0 ? (
                  <div className="space-y-2.5">
                    {verifiedActivity.events.map((evt) => (
                      <div
                        key={evt.id}
                        className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                      >
                        <div className="min-w-0 pr-3">
                          <p className="truncate text-xs font-bold text-foreground">{evt.title}</p>
                          <p className="truncate text-[11px] text-muted-foreground">
                            {evt.organizationName} · {evt.categoryName} · {new Date(evt.startDate).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="shrink-0 rounded bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
                          ✓ {evt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic py-2">No event attendance records on file.</p>
                )}
              </div>

              {/* Verified Volunteering */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="size-4 text-info" />
                    <h3 className="text-base font-bold text-foreground">Volunteering & Community Service</h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {verifiedActivity?.volunteering.length ?? 0} Accepted Roles
                  </Badge>
                </div>

                {verifiedActivity && verifiedActivity.volunteering.length > 0 ? (
                  <div className="space-y-2.5">
                    {verifiedActivity.volunteering.map((v) => (
                      <div
                        key={v.id}
                        className="flex items-center justify-between rounded-lg border border-border bg-card p-3.5"
                      >
                        <div>
                          <p className="text-xs font-bold text-foreground">{v.role || "Volunteer"}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {v.eventTitle} ({v.organizationName})
                          </p>
                        </div>
                        <span className="shrink-0 rounded bg-info/15 px-2 py-0.5 text-[10px] font-bold text-info">
                          ✓ Authenticated Service
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic py-2">
                    No volunteering records yet. Apply for campus volunteer roles through the events portal!
                  </p>
                )}
              </div>

              {/* Verified Certificates & Official Credentials */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="size-4 text-gold" />
                    <h3 className="text-base font-bold text-foreground">Official Certificates & Credentials</h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {verifiedActivity?.certificates.length ?? 0} Issued
                  </Badge>
                </div>

                {verifiedActivity && verifiedActivity.certificates.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {verifiedActivity.certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="rounded-lg border border-gold/30 bg-gold/5 p-4 space-y-2 relative overflow-hidden"
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="text-xs font-bold text-foreground pr-2">{cert.title}</h4>
                          <span className="shrink-0 rounded-full bg-gold/20 p-1 text-gold">
                            <BadgeCheck className="size-4" />
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">Issued by: {cert.issuerName}</p>
                        {cert.credentialId && (
                          <p className="text-[10px] font-mono text-foreground/80">
                            Verification Code: <span className="font-semibold">{cert.credentialId}</span>
                          </p>
                        )}
                        <div className="flex items-center justify-between pt-1 text-[10px] text-muted-foreground border-t border-gold/20">
                          <span>Date: {new Date(cert.issueDate).toLocaleDateString()}</span>
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-0.5 font-semibold text-primary hover:underline"
                            >
                              Verify <ExternalLink className="size-2.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic py-2">
                    No certificates issued to this profile yet.
                  </p>
                )}
              </div>

              {/* Verified Achievements */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="size-4 text-primary" />
                    <h3 className="text-base font-bold text-foreground">Verified Recognitions & Awards</h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {verifiedActivity?.achievements.length ?? 0} Awards
                  </Badge>
                </div>

                {verifiedActivity && verifiedActivity.achievements.length > 0 ? (
                  <div className="space-y-2.5">
                    {verifiedActivity.achievements.map((ach) => (
                      <div
                        key={ach.id}
                        className="flex items-start justify-between rounded-lg border border-border bg-card p-3.5"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-foreground">{ach.title}</h4>
                            <span className="rounded bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
                              {ach.category || "AWARD"}
                            </span>
                          </div>
                          {ach.description && (
                            <p className="text-[11px] text-muted-foreground">{ach.description}</p>
                          )}
                          {ach.issuerOrganization && (
                            <p className="text-[10px] text-muted-foreground">
                              Presented by {ach.issuerOrganization.name}
                            </p>
                          )}
                        </div>
                        <span className="shrink-0 text-xs font-mono text-muted-foreground">
                          {new Date(ach.earnedAt).getFullYear()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic py-2">No verified awards on record.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* SIDEBAR */}
      <aside className="mt-6 space-y-5 xl:mt-20">
        {/* Profile Strength */}
        <PanelCard title="Profile Strength" icon={<Sparkles className="size-4" aria-hidden />}>
          <div className="flex items-center gap-3">
            <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-300"
                style={{ width: `${completeness}%` }}
              />
            </div>
            <span className="text-sm font-bold text-primary">{completeness}%</span>
          </div>
          <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
            <li className={bio.trim() ? "text-foreground font-medium" : ""}>
              {bio.trim() ? "✓" : "•"} Short introduction bio
            </li>
            <li className={skillsList.length > 0 ? "text-foreground font-medium" : ""}>
              {skillsList.length > 0 ? "✓" : "•"} Technical skills added ({skillsList.length})
            </li>
            <li className={experiences.length > 0 ? "text-foreground font-medium" : ""}>
              {experiences.length > 0 ? "✓" : "•"} Work / club experience ({experiences.length})
            </li>
            <li className={interestsList.length > 0 ? "text-foreground font-medium" : ""}>
              {interestsList.length > 0 ? "✓" : "•"} Career interests specified
            </li>
            <li className={githubUrl || linkedinUrl || websiteUrl ? "text-foreground font-medium" : ""}>
              {githubUrl || linkedinUrl || websiteUrl ? "✓" : "•"} Professional links added
            </li>
          </ul>
        </PanelCard>

        {/* Institutional Verification Status */}
        <PanelCard title="University Identity" icon={<Building className="size-4" aria-hidden />}>
          <dl className="space-y-2.5 text-xs">
            <div>
              <dt className="uppercase tracking-wider text-muted-foreground text-[10px]">Verified University</dt>
              <dd className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                {profile.universityName}
                {isUniVerified && <ShieldCheck className="size-3.5 text-gold shrink-0" />}
              </dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider text-muted-foreground text-[10px]">Faculty</dt>
              <dd className="font-medium text-foreground">{profile.faculty}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider text-muted-foreground text-[10px]">Department</dt>
              <dd className="font-medium text-foreground">{profile.department}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider text-muted-foreground text-[10px]">Academic Standing</dt>
              <dd className="font-medium text-foreground">
                {profile.academicYear || "3rd Year"} · {profile.intakeSemester || `Batch ${profile.batch}`}
              </dd>
            </div>
          </dl>
        </PanelCard>

        {/* Society Memberships */}
        <PanelCard title="Society Affiliations" icon={<Users className="size-4" aria-hidden />}>
          {verifiedActivity?.organizations && verifiedActivity.organizations.length > 0 ? (
            <ul className="space-y-2 text-xs">
              {verifiedActivity.organizations.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-2.5"
                >
                  <div className="min-w-0 pr-2">
                    <p className="truncate font-semibold text-foreground">{m.organizationName}</p>
                    {m.title && <p className="truncate text-[11px] text-muted-foreground">{m.title}</p>}
                  </div>
                  <span className="shrink-0 rounded bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
                    {m.role.replace(/_/g, " ")}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">No active society memberships.</p>
          )}
        </PanelCard>
      </aside>
    </div>
  );
}
