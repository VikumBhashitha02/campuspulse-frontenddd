import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import {
  Building2,
  CheckCircle2,
  Globe,
  Instagram,
  Loader2,
  Mail,
  ShieldCheck,
  UserPlus,
  AlertCircle,
  PlusCircle,
  ArrowRight,
  ArrowLeft,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OrgAvatar } from "@/components/common/Badges";
import { directoryApi } from "@/lib/api/directory";
import { useAuth } from "@/lib/auth";
import type { Organization, University, OrganizationMembership } from "@/lib/types";
import { cn } from "@/lib/utils";

interface JoinOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestNewOrg: () => void;
  onSuccess?: () => void;
  myMemberships?: OrganizationMembership[];
}

export function JoinOrganizationDialog({
  open,
  onOpenChange,
  onRequestNewOrg,
  onSuccess,
  myMemberships = [],
}: JoinOrganizationDialogProps) {
  const { user } = useAuth();

  // Wizard Step: 1: University, 2: Organization, 3: Role & Title, 4: Message & Confirm
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Universities
  const [universities, setUniversities] = useState<University[]>([]);
  const [loadingUniversities, setLoadingUniversities] = useState(false);
  const [selectedUniId, setSelectedUniId] = useState<string>("");

  // Organizations
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loadingOrgs, setLoadingOrgs] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState<string>("");

  // Role & Details
  const [role, setRole] = useState<string>("MEMBER");
  const [customTitle, setCustomTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Submission
  const [submitting, setSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  // Load Universities when modal opens
  useEffect(() => {
    if (!open) return;
    let isMounted = true;
    setLoadingUniversities(true);
    directoryApi
      .universities()
      .then((data) => {
        if (!isMounted) return;
        setUniversities(data);

        // Preselect university if user has verified affiliation
        if (user?.universityId) {
          setSelectedUniId(user.universityId);
        } else if (data.length > 0 && !selectedUniId) {
          // Leave blank for user choice
        }
      })
      .catch((err) => {
        console.error("Failed to load universities", err);
      })
      .finally(() => {
        if (isMounted) setLoadingUniversities(false);
      });

    return () => {
      isMounted = false;
    };
  }, [open, user]);

  // Load Organizations whenever selected university changes
  useEffect(() => {
    if (!selectedUniId) {
      setOrganizations([]);
      setSelectedOrgId("");
      return;
    }

    let isMounted = true;
    setLoadingOrgs(true);
    setSelectedOrgId(""); // Reset previously selected organization immediately

    directoryApi
      .organizations(selectedUniId)
      .then((data) => {
        if (!isMounted) return;
        setOrganizations(data);
      })
      .catch((err) => {
        console.error("Failed to load organizations for university", err);
        if (isMounted) setOrganizations([]);
      })
      .finally(() => {
        if (isMounted) setLoadingOrgs(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedUniId]);

  // Reset form on open/close
  useEffect(() => {
    if (!open) {
      setCurrentStep(1);
      setRole("MEMBER");
      setCustomTitle("");
      setMessage("");
      setSubmittedStatus(null);
    }
  }, [open]);

  // Selected Organization Details
  const selectedOrg = useMemo(() => {
    return organizations.find((o) => o.id === selectedOrgId) || null;
  }, [organizations, selectedOrgId]);

  // Selected University Details
  const selectedUni = useMemo(() => {
    return universities.find((u) => u.id === selectedUniId) || null;
  }, [universities, selectedUniId]);

  // Check if current user already has a membership in this organization
  const existingMembership = useMemo(() => {
    if (!selectedOrgId) return null;
    return myMemberships.find((m) => m.organizationId === selectedOrgId) || null;
  }, [selectedOrgId, myMemberships]);

  const isPrivilegedRole = ["LEADER", "PRESIDENT", "VICE_PRESIDENT"].includes(role);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrgId) {
      toast.error("Please select an organization.");
      return;
    }

    setSubmitting(true);
    try {
      await directoryApi.joinOrganization(selectedOrgId, {
        role,
        title: customTitle.trim() || undefined,
        message: message.trim() || undefined,
        universityId: selectedUniId || undefined,
      });

      setSubmittedStatus("ACTIVE");
      toast.success(`Joined ${selectedOrg?.name || "Society"}! 🎉`, {
        description: "You are now an active member of this organization.",
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      toast.error(err?.message || "Failed to join society.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <UserPlus className="size-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold">Join a University Organization</DialogTitle>
              <DialogDescription className="text-xs">
                Connect with verified student societies and become an active member directly.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {submittedStatus ? (
          <div className="space-y-6 py-6 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5">
              <CheckCircle2 className="size-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-foreground">Joined Successfully! 🎉</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                You are now an active member of <strong className="text-foreground">{selectedOrg?.name}</strong>.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Organization:</span>
                <span className="font-semibold text-foreground">{selectedOrg?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">University:</span>
                <span className="text-foreground">{selectedUni?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Membership Role:</span>
                <span className="font-semibold text-primary">{role.replace(/_/g, " ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  ACTIVE
                </span>
              </div>
            </div>

            <DialogFooter className="sm:justify-center">
              <Button onClick={() => onOpenChange(false)}>Close & View Dashboard</Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              {[
                { step: 1, label: "University" },
                { step: 2, label: "Organization" },
                { step: 3, label: "Role" },
                { step: 4, label: "Details" },
              ].map((s) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => {
                    if (s.step === 1) setCurrentStep(1);
                    else if (s.step === 2 && selectedUniId) setCurrentStep(2);
                    else if (s.step === 3 && selectedOrgId) setCurrentStep(3);
                    else if (s.step === 4 && selectedOrgId) setCurrentStep(4);
                  }}
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold transition-colors",
                    currentStep === s.step
                      ? "text-primary"
                      : currentStep > s.step
                        ? "text-muted-foreground hover:text-foreground"
                        : "text-muted-foreground/40 cursor-not-allowed",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-5 place-items-center rounded-full text-[10px]",
                      currentStep === s.step
                        ? "bg-primary text-primary-foreground font-bold"
                        : currentStep > s.step
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {s.step}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>

            {/* STEP 1: SELECT UNIVERSITY */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="join-uni-select" className="text-sm font-semibold">
                      Step 1: Select University *
                    </Label>
                    {user?.universityId && (
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                        <ShieldCheck className="size-3" /> Preselected from verified email
                      </span>
                    )}
                  </div>

                  {loadingUniversities ? (
                    <div className="flex items-center gap-2 rounded-md border border-input bg-background p-3 text-xs text-muted-foreground">
                      <Loader2 className="size-4 animate-spin text-primary" />
                      Loading university directory…
                    </div>
                  ) : (
                    <select
                      id="join-uni-select"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      value={selectedUniId}
                      onChange={(e) => setSelectedUniId(e.target.value)}
                      required
                    >
                      <option value="">-- Choose your university --</option>
                      {universities.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name} {u.code ? `(${u.code})` : ""}
                        </option>
                      ))}
                    </select>
                  )}
                  <p className="text-[11px] text-muted-foreground">
                    Only organizations belonging to your selected university will be loaded.
                  </p>
                </div>

                {selectedUni && (
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 flex items-start gap-3">
                    <Building2 className="size-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold text-foreground">{selectedUni.name}</p>
                      <p className="text-muted-foreground">{selectedUni.location || selectedUni.description || "Verified Institution"}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <Button
                    type="button"
                    disabled={!selectedUniId}
                    onClick={() => setCurrentStep(2)}
                    className="gap-1.5"
                  >
                    Next: Select Organization <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: SELECT ORGANIZATION */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="join-org-select" className="text-sm font-semibold">
                    Step 2: Select Organization at {selectedUni?.name || "University"} *
                  </Label>

                  {loadingOrgs ? (
                    <div className="flex items-center gap-2 rounded-md border border-input bg-background p-3 text-xs text-muted-foreground">
                      <Loader2 className="size-4 animate-spin text-primary" />
                      Loading societies for {selectedUni?.name}…
                    </div>
                  ) : organizations.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border p-4 text-center space-y-3 bg-surface/50">
                      <p className="text-xs text-muted-foreground">
                        No registered organizations found for {selectedUni?.name}.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-primary border-primary/30"
                        onClick={() => {
                          onOpenChange(false);
                          onRequestNewOrg();
                        }}
                      >
                        <PlusCircle className="size-3.5" />
                        Request a New Organization
                      </Button>
                    </div>
                  ) : (
                    <select
                      id="join-org-select"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      value={selectedOrgId}
                      onChange={(e) => setSelectedOrgId(e.target.value)}
                      required
                    >
                      <option value="">-- Choose organization from {selectedUni?.name} --</option>
                      {organizations.map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.name} {org.verified ? "✓ Verified" : ""}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Organization Details Preview Card */}
                {selectedOrg && (
                  <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <OrgAvatar initials={selectedOrg.name.slice(0, 2)} />
                        <div>
                          <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                            {selectedOrg.name}
                            {selectedOrg.verified && (
                              <span title="Verified Society">
                                <ShieldCheck className="size-4 text-primary" />
                              </span>
                            )}
                          </h4>
                          <p className="text-xs text-muted-foreground">{selectedUni?.name}</p>
                        </div>
                      </div>

                      {existingMembership && (
                        <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          {existingMembership.status || "MEMBER"} ({existingMembership.role})
                        </span>
                      )}
                    </div>

                    {selectedOrg.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">{selectedOrg.description}</p>
                    )}

                    <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                      {selectedOrg.websiteUrl && (
                        <a
                          href={selectedOrg.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 hover:text-primary"
                        >
                          <Globe className="size-3" /> Website
                        </a>
                      )}
                      {selectedOrg.instagramUrl && (
                        <a
                          href={selectedOrg.instagramUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 hover:text-primary"
                        >
                          <Instagram className="size-3" /> Instagram
                        </a>
                      )}
                      {selectedOrg.contactEmail && (
                        <span className="flex items-center gap-1">
                          <Mail className="size-3" /> {selectedOrg.contactEmail}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Cannot find option */}
                <div className="flex items-center justify-between rounded-lg bg-surface p-3 text-xs">
                  <span className="text-muted-foreground">Can't find your university organization?</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs font-semibold text-primary hover:text-primary"
                    onClick={() => {
                      onOpenChange(false);
                      onRequestNewOrg();
                    }}
                  >
                    + Request a New Organization
                  </Button>
                </div>

                <div className="flex justify-between pt-2">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                    <ArrowLeft className="size-4" /> Back
                  </Button>
                  <Button
                    type="button"
                    disabled={!selectedOrgId}
                    onClick={() => setCurrentStep(3)}
                    className="gap-1.5"
                  >
                    Next: Choose Role <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: SELECT REQUESTED ROLE */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="join-role-select" className="text-sm font-semibold">
                    Step 3: Requested Organization Role *
                  </Label>
                  <select
                    id="join-role-select"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <optgroup label="Ordinary Member Roles">
                      <option value="MEMBER">Member (General campus society member)</option>
                      <option value="EVENT_ORGANIZER">Event Organizer (Publish and manage society events)</option>
                      <option value="TREASURER">Treasurer (Finance and ticketing manager)</option>
                      <option value="SECRETARY">Secretary (Administration and records)</option>
                      <option value="OTHER">Other Committee Role</option>
                    </optgroup>
                    <optgroup label="Executive Leadership Roles (Max 2 Leaders per Society)">
                      <option value="LEADER">Leader / Head</option>
                      <option value="PRESIDENT">President</option>
                      <option value="VICE_PRESIDENT">Vice President</option>
                    </optgroup>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="custom-title-input" className="text-xs font-medium">
                    Specific Executive or Committee Title (Optional)
                  </Label>
                  <Input
                    id="custom-title-input"
                    placeholder="e.g. Media Team Lead, Head of Logistics, Senior Member"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                  />
                </div>

                {isPrivilegedRole ? (
                  <div className="rounded-xl border border-primary/30 bg-primary/10 p-3.5 text-xs text-foreground space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-primary">
                      <ShieldCheck className="size-4 text-primary shrink-0" />
                      Executive Leadership Policy
                    </div>
                    <p className="text-muted-foreground">
                      Societies allow a maximum of 2 active leaders. Selecting <strong>{role.replace(/_/g, " ")}</strong> will assign you as an active Society Leader if a leadership position is currently available.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-border bg-surface p-3.5 text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-foreground">
                      <Info className="size-4 text-primary shrink-0" />
                      Direct Society Membership
                    </div>
                    <p>
                      You will immediately join <strong>{selectedOrg?.name}</strong> as an active member with the selected role.
                    </p>
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                    <ArrowLeft className="size-4" /> Back
                  </Button>
                  <Button type="button" onClick={() => setCurrentStep(4)} className="gap-1.5">
                    Next: Additional Details <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: ADDITIONAL INFORMATION & CONFIRMATION */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="join-message-textarea" className="text-sm font-semibold">
                    Step 4: Message or Responsibilities (Optional)
                  </Label>
                  <Textarea
                    id="join-message-textarea"
                    placeholder="Explain your student involvement, previous society contributions, or reasons for joining..."
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {/* Review summary */}
                <div className="rounded-xl border border-border bg-card p-4 space-y-2 text-xs">
                  <h5 className="font-bold text-foreground">Review Your Submission</h5>
                  <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                    <div>
                      <span>University:</span>{" "}
                      <strong className="text-foreground">{selectedUni?.name}</strong>
                    </div>
                    <div>
                      <span>Society:</span>{" "}
                      <strong className="text-foreground">{selectedOrg?.name}</strong>
                    </div>
                    <div>
                      <span>Selected Role:</span>{" "}
                      <strong className="text-primary">{role.replace(/_/g, " ")}</strong>
                    </div>
                    <div>
                      <span>Membership Status:</span>{" "}
                      <strong className="text-emerald-500">ACTIVE</strong>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(3)}>
                    <ArrowLeft className="size-4" /> Back
                  </Button>
                  <Button type="submit" disabled={submitting || !selectedOrgId} className="gap-1.5 font-semibold">
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Joining…
                      </>
                    ) : (
                      "Join Society"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
