import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Building2,
  CheckCircle2,
  Globe,
  Instagram,
  Facebook,
  Loader2,
  Mail,
  ShieldAlert,
  Sparkles,
  Plus,
  AlertTriangle,
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
import { directoryApi } from "@/lib/api/directory";
import { useAuth } from "@/lib/auth";
import type { University } from "@/lib/types";

interface RequestOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  onSwitchToJoin?: (orgId?: string) => void;
}

export function RequestOrganizationDialog({
  open,
  onOpenChange,
  onSuccess,
  onSwitchToJoin,
}: RequestOrganizationDialogProps) {
  const { user } = useAuth();

  const [universities, setUniversities] = useState<University[]>([]);
  const [loadingUnis, setLoadingUnis] = useState(false);

  // Form Fields
  const [universityId, setUniversityId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("STUDENT_CLUB");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [requestedRole, setRequestedRole] = useState("LEADER");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Duplicate check state
  const [checkingDuplicate, setCheckingDuplicate] = useState(false);
  const [duplicateMatch, setDuplicateMatch] = useState<{ id: string; name: string; slug: string } | null>(null);

  // Submitting
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoadingUnis(true);
    directoryApi
      .universities()
      .then((data) => {
        setUniversities(data);
        if (user?.universityId) {
          setUniversityId(user.universityId);
        }
        if (user?.email) {
          setContactEmail(user.email);
        }
      })
      .catch((err) => console.error("Failed to load universities", err))
      .finally(() => setLoadingUnis(false));
  }, [open, user]);

  // Debounced duplicate detection
  useEffect(() => {
    const trimmed = name.trim();
    if (trimmed.length < 3) {
      setDuplicateMatch(null);
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingDuplicate(true);
      try {
        const res = await directoryApi.checkDuplicate(universityId || undefined, trimmed);
        if (res.exists && res.matchingOrganization) {
          setDuplicateMatch(res.matchingOrganization);
        } else {
          setDuplicateMatch(null);
        }
      } catch {
        setDuplicateMatch(null);
      } finally {
        setCheckingDuplicate(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [name, universityId]);

  // Reset on open/close
  useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
      setLogoUrl("");
      setWebsiteUrl("");
      setInstagramUrl("");
      setFacebookUrl("");
      setAdditionalNotes("");
      setDuplicateMatch(null);
      setSubmitted(false);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !universityId) {
      toast.error("Please provide both the university and the organization name.");
      return;
    }

    setSubmitting(true);
    try {
      await directoryApi.createOrganization({
        name: name.trim(),
        universityId,
        type,
        description: description.trim() || undefined,
        logoUrl: logoUrl.trim() || undefined,
        websiteUrl: websiteUrl.trim() || undefined,
        instagramUrl: instagramUrl.trim() || undefined,
        facebookUrl: facebookUrl.trim() || undefined,
        email: contactEmail.trim() || undefined,
        requestedRole,
        additionalNotes: additionalNotes.trim() || undefined,
      });

      setSubmitted(true);
      toast.success("Organization request submitted!", {
        description: "Your request is now in PENDING review by platform and university administrators.",
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit organization creation request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="size-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold">Request a New Organization</DialogTitle>
              <DialogDescription className="text-xs">
                Submit a new university society, student club, or faculty body for administrative verification.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {submitted ? (
          <div className="space-y-6 py-6 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5">
              <CheckCircle2 className="size-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-foreground">Organization Request Submitted!</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Your request to register <strong className="text-foreground">{name}</strong> has been submitted.
                Once reviewed and approved by administrators, it will become available in the university directory,
                and your founding leader role will be activated.
              </p>
            </div>

            <DialogFooter className="sm:justify-center">
              <Button onClick={() => onOpenChange(false)}>Done</Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="req-uni">University *</Label>
                {loadingUnis ? (
                  <div className="flex items-center gap-2 p-2 text-xs text-muted-foreground">
                    <Loader2 className="size-3.5 animate-spin" /> Loading universities…
                  </div>
                ) : (
                  <select
                    id="req-uni"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    value={universityId}
                    onChange={(e) => setUniversityId(e.target.value)}
                    required
                  >
                    <option value="">-- Choose University --</option>
                    {universities.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="req-type">Category / Type *</Label>
                <select
                  id="req-type"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="STUDENT_CLUB">Student Club</option>
                  <option value="ACADEMIC_SOCIETY">Academic Society</option>
                  <option value="SPORTS_CLUB">Sports Club</option>
                  <option value="FACULTY_BODY">Faculty Body</option>
                  <option value="COMMUNITY">Campus Community</option>
                  <option value="UNIVERSITY_OFFICE">University Office</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="req-name">Organization Name *</Label>
                {checkingDuplicate && (
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Loader2 className="size-3 animate-spin" /> Checking for duplicates…
                  </span>
                )}
              </div>
              <Input
                id="req-name"
                placeholder="e.g. SLIIT Cyber Security Community"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              {duplicateMatch && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-300 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    Matching Organization Already Exists!
                  </div>
                  <p>
                    An organization named <strong>"{duplicateMatch.name}"</strong> already exists at this university.
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs font-semibold text-amber-900 dark:text-amber-100 border-amber-500/40 hover:bg-amber-500/20"
                    onClick={() => {
                      onOpenChange(false);
                      if (onSwitchToJoin) onSwitchToJoin(duplicateMatch.id);
                    }}
                  >
                    Join Existing "{duplicateMatch.name}" Instead
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="req-desc">Description</Label>
              <Textarea
                id="req-desc"
                placeholder="Society mission, typical campus activities, and student community focus..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="req-logo">Logo Image URL (Optional)</Label>
                <Input
                  id="req-logo"
                  type="url"
                  placeholder="https://... logo image link"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="req-email">Official / Contact Email</Label>
                <Input
                  id="req-email"
                  type="email"
                  placeholder="society@university.lk"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="req-web">Official Website</Label>
                <Input
                  id="req-web"
                  type="url"
                  placeholder="https://..."
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="req-ig">Instagram URL</Label>
                <Input
                  id="req-ig"
                  type="url"
                  placeholder="https://instagram.com/..."
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="req-fb">Facebook URL</Label>
                <Input
                  id="req-fb"
                  type="url"
                  placeholder="https://facebook.com/..."
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="req-role">Requested Founding Role *</Label>
                <select
                  id="req-role"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  value={requestedRole}
                  onChange={(e) => setRequestedRole(e.target.value)}
                >
                  <option value="LEADER">Founding Leader / Head</option>
                  <option value="PRESIDENT">President</option>
                  <option value="SECRETARY">Secretary</option>
                  <option value="EVENT_ORGANIZER">Event Organizer</option>
                  <option value="MEMBER">Member / Founder</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="req-notes">Additional Reviewer Notes</Label>
                <Input
                  id="req-notes"
                  placeholder="e.g. Faculty patron endorsement or student union affiliation"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Review & Trust Workflow:</p>
              <p className="mt-0.5">
                Submitting this form places the organization in <strong>PENDING_REVIEW</strong> status.
                It will be reviewed by university or platform moderators. Event publishing permissions will be granted upon approval.
              </p>
            </div>

            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting || !name.trim() || !universityId || Boolean(duplicateMatch)}>
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Submitting…
                  </>
                ) : (
                  "Submit Organization Request"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
