import {
  Building2,
  Calendar,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Award,
  Briefcase,
  Github,
  Linkedin,
  Globe,
  Mail,
  ShieldCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OrgAvatar } from "@/components/common/Badges";

export interface ProfileInspectionData {
  id?: string;
  name: string;
  email?: string;
  avatarUrl?: string | null;
  universityEmailVerified?: boolean;
  universityName?: string;
  faculty?: string;
  department?: string;
  academicYear?: string;
  batchYear?: number | string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  careerInterests?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  experiences?: Array<{
    id?: string;
    title: string;
    organizationName: string;
    startDate?: string;
    endDate?: string | null;
    isCurrent?: boolean;
    description?: string;
  }>;
  certificates?: Array<{
    id?: string;
    title: string;
    issuer?: string;
    issuerName?: string;
    issueDate?: string;
  }>;
  // Applicant context
  applicationMessage?: string;
  preferredRole?: string;
  appliedAt?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function UserProfileModal({
  profile,
  open,
  onOpenChange,
  onAccept,
  onReject,
  isResponding = false,
}: {
  profile: ProfileInspectionData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept?: (() => void) | undefined;
  onReject?: (() => void) | undefined;
  isResponding?: boolean | undefined;
}) {
  if (!profile) return null;

  const hasLinks = Boolean(profile.githubUrl || profile.linkedinUrl || profile.websiteUrl);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto sm:rounded-2xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-start gap-4">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="size-16 rounded-full border border-border object-cover shadow-sm"
              />
            ) : (
              <OrgAvatar initials={getInitials(profile.name)} className="size-16 text-lg" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <DialogTitle className="text-xl font-bold">{profile.name}</DialogTitle>
                {profile.universityEmailVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="size-3.5" />
                    Verified Student
                  </span>
                )}
              </div>
              <DialogDescription className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {profile.universityName && (
                  <span className="inline-flex items-center gap-1">
                    <GraduationCap className="size-3.5" />
                    {profile.universityName}
                  </span>
                )}
                {profile.faculty && (
                  <span className="inline-flex items-center gap-1">
                    <Building2 className="size-3.5" />
                    {profile.faculty}
                  </span>
                )}
                {profile.academicYear && (
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="size-3.5" />
                    {profile.academicYear}
                  </span>
                )}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Application Note if reviewing join request */}
          {(profile.preferredRole || profile.applicationMessage) && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Application Statement
              </p>
              {profile.preferredRole && (
                <p className="mt-1 text-sm font-semibold text-foreground">
                  Interested Role:{" "}
                  <span className="text-primary">{profile.preferredRole}</span>
                </p>
              )}
              {profile.applicationMessage && (
                <p className="mt-2 text-sm italic text-foreground/90">
                  "{profile.applicationMessage}"
                </p>
              )}
            </div>
          )}

          {/* About / Bio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              About
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground">
              {profile.bio || "No student biography provided yet."}
            </p>
          </div>

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <div>
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Sparkles className="size-3.5 text-primary" />
                Technical & Creative Skills
              </h4>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-surface px-2.5 py-1 text-xs font-medium text-foreground border border-border/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {profile.interests && profile.interests.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Interests & Focus Areas
              </h4>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-md bg-accent/60 px-2 py-0.5 text-xs text-accent-foreground"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects & Experiences */}
          {profile.experiences && profile.experiences.length > 0 && (
            <div>
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Briefcase className="size-3.5 text-muted-foreground" />
                Experience & Projects
              </h4>
              <div className="mt-2.5 space-y-2.5">
                {profile.experiences.map((exp, idx) => (
                  <div
                    key={exp.id || idx}
                    className="rounded-lg border border-border/80 bg-surface/50 p-3"
                  >
                    <p className="text-sm font-semibold text-foreground">{exp.title}</p>
                    <p className="text-xs text-muted-foreground">{exp.organizationName}</p>
                    {exp.description && (
                      <p className="mt-1 text-xs text-foreground/80">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verified Certificates */}
          {profile.certificates && profile.certificates.length > 0 && (
            <div>
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Award className="size-3.5 text-amber-500" />
                Verified Certificates
              </h4>
              <div className="mt-2 space-y-2">
                {profile.certificates.map((cert, idx) => (
                  <div
                    key={cert.id || idx}
                    className="flex items-center justify-between rounded-lg border border-border/80 bg-surface/50 p-2.5"
                  >
                    <div>
                      <p className="text-xs font-semibold text-foreground">{cert.title}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {cert.issuer || cert.issuerName || "CampusPulse Verified"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links & Portfolios */}
          {hasLinks && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Profiles & Portfolio
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    <Github className="size-3.5" />
                    GitHub
                    <ExternalLink className="size-3 opacity-60" />
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    <Linkedin className="size-3.5 text-blue-500" />
                    LinkedIn
                    <ExternalLink className="size-3 opacity-60" />
                  </a>
                )}
                {profile.websiteUrl && (
                  <a
                    href={profile.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    <Globe className="size-3.5 text-emerald-500" />
                    Portfolio / Website
                    <ExternalLink className="size-3 opacity-60" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions (Review / Accept / Reject) if in review mode */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Close Profile
          </Button>
          {(onAccept || onReject) && (
            <div className="flex items-center gap-2">
              {onReject && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={onReject}
                  disabled={isResponding}
                >
                  Decline Request
                </Button>
              )}
              {onAccept && (
                <Button
                  size="sm"
                  onClick={onAccept}
                  disabled={isResponding}
                  className="bg-primary font-semibold text-primary-foreground"
                >
                  {isResponding ? "Processing…" : "Accept into Squad"}
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
