import React, { useState, useRef, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  Upload,
  Image as ImageIcon,
  Trash2,
  RefreshCw,
  Ticket,
  DollarSign,
  HeartHandshake,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Sparkles,
  Users,
  ShieldCheck,
  Link as LinkIcon,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Award,
  Trophy,
  GraduationCap,
  Music,
  Theater,
  BookOpenCheck,
  BookOpen,
  Film,
  Building,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { eventsApi } from "@/lib/api/events";
import { directoryApi } from "@/lib/api/directory";
import { cn } from "@/lib/utils";
import type { OpportunityType, EventPricingMode } from "@/lib/types";

export interface ManagedOrganization {
  organizationId: string;
  organizationName: string;
  organizationSlug: string;
  role: string;
  status: string;
  isVerified?: boolean;
}

export interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

export interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  managedOrgs?: ManagedOrganization[] | undefined;
  categories?: CategoryOption[] | undefined;
  initialOrganizationId?: string | undefined;
  selectedOrgId?: string | undefined;
  onEventCreated?: ((event: any, wasPublished: boolean) => void) | undefined;
}

type FormSection = "DETAILS" | "TIMING" | "PRICING" | "OPTIONAL" | "VOLUNTEERING";

const OPPORTUNITY_TYPE_OPTIONS: { value: OpportunityType; label: string; icon: string }[] = [
  { value: "COMPETITION", label: "Competition", icon: "🏆" },
  { value: "HACKATHON", label: "Hackathon", icon: "💻" },
  { value: "MUSIC", label: "Music & Entertainment (Concert/Band)", icon: "🎵" },
  { value: "DRAMA", label: "Drama & Performing Arts (Theatre/Play)", icon: "🎭" },
  { value: "HIGHER_STUDIES", label: "Higher Studies (MSc, PhD, Master's)", icon: "🎓" },
  { value: "UNIVERSITY_COURSE", label: "University Course & Professional Learning", icon: "📖" },
  { value: "WORKSHOP", label: "Workshop", icon: "🛠️" },
  { value: "CONFERENCE", label: "Conference", icon: "🎤" },
  { value: "RESEARCH", label: "Research Opportunity", icon: "🔬" },
  { value: "CAREER", label: "Career & Job Fair", icon: "💼" },
  { value: "VOLUNTEERING", label: "Volunteering Opportunity", icon: "🤝" },
  { value: "SCHOLARSHIP", label: "Scholarship", icon: "🎖️" },
  { value: "TRAINING", label: "Training & Bootcamp", icon: "📚" },
  { value: "TEAM_OPPORTUNITY", label: "Team Opportunity", icon: "👥" },
  { value: "CULTURAL_EVENT", label: "Cultural & Performing Arts", icon: "✨" },
  { value: "SPORTS", label: "Sports Tournament", icon: "⚽" },
  { value: "OTHER", label: "Other Opportunity", icon: "🌟" },
];

const VOLUNTEER_ROLE_PRESETS = [
  "Registration Desk",
  "Event Support",
  "Technical Support",
  "Photography",
  "Videography",
  "Social Media",
  "Marketing",
  "Crowd Management",
  "Workshop Assistant",
  "Team Leader",
];

export function CreateEventDialog({
  open,
  onOpenChange,
  managedOrgs: propManagedOrgs,
  categories: propCategories,
  initialOrganizationId,
  selectedOrgId,
  onEventCreated,
}: CreateEventDialogProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const orgsQuery = useQuery({
    queryKey: ["myOrganizations"],
    queryFn: () => directoryApi.myOrganizations(),
    enabled: !propManagedOrgs || propManagedOrgs.length === 0,
  });
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => eventsApi.categories(),
    enabled: !propCategories || propCategories.length === 0,
  });

  const availableOrgs = (propManagedOrgs && propManagedOrgs.length > 0)
    ? propManagedOrgs
    : (orgsQuery.data || []);
  const availableCategories = (propCategories && propCategories.length > 0)
    ? propCategories
    : (categoriesQuery.data || []);

  // Active section tab
  const [activeSection, setActiveSection] = useState<FormSection>("DETAILS");

  // SECTION 1: Essential Event Details
  const defaultOrgId = initialOrganizationId || (selectedOrgId && selectedOrgId !== "all" ? selectedOrgId : availableOrgs[0]?.organizationId || "");
  const [orgId, setOrgId] = useState(defaultOrgId);
  const [catId, setCatId] = useState(availableCategories[0]?.id || "");

  useEffect(() => {
    if (!orgId && availableOrgs.length > 0) {
      setOrgId(defaultOrgId || availableOrgs[0]?.organizationId || "");
    }
  }, [availableOrgs, defaultOrgId, orgId]);

  useEffect(() => {
    if (!catId && availableCategories.length > 0) {
      setCatId(availableCategories[0]?.id || "");
    }
  }, [availableCategories, catId]);

  const [opportunityType, setOpportunityType] = useState<OpportunityType>("COMPETITION");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isCustomSlug, setIsCustomSlug] = useState(false);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // SECTION 2: Date, Time & Venue
  const [mode, setMode] = useState<"IN_PERSON" | "ONLINE" | "HYBRID">("IN_PERSON");
  const [location, setLocation] = useState("");
  const [venue, setVenue] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");

  // SECTION 3: Ticketing and Pricing Configuration
  const [pricingMode, setPricingMode] = useState<EventPricingMode>("FREE_FOR_ALL");
  const [price, setPrice] = useState<string>("");
  const [studentPrice, setStudentPrice] = useState<string>("");
  const [externalPrice, setExternalPrice] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [allowOnlineGateway, setAllowOnlineGateway] = useState(false);
  const [allowClubTransfer, setAllowClubTransfer] = useState(true);
  const [customPaymentInstructions, setCustomPaymentInstructions] = useState("");

  const { data: selectedOrgDetails } = useQuery({
    queryKey: ["organization", "details", orgId || defaultOrgId],
    queryFn: () => ((orgId || defaultOrgId) ? directoryApi.organization(orgId || defaultOrgId) : null),
    enabled: Boolean(orgId || defaultOrgId),
  });

  // SECTION 4: Optional Information
  const [isOptionalExpanded, setIsOptionalExpanded] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [officialEventUrl, setOfficialEventUrl] = useState("");
  const [supportingLecturer, setSupportingLecturer] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [prizeInfo, setPrizeInfo] = useState("");
  const [teamSize, setTeamSize] = useState("");

  // SECTION 5: Volunteering (Optional & Separate)
  const [needsVolunteers, setNeedsVolunteers] = useState(false);
  const [volunteerTitle, setVolunteerTitle] = useState("");
  const [volunteerRoles, setVolunteerRoles] = useState<string[]>([]);
  const [customRoleInput, setCustomRoleInput] = useState("");
  const [volunteerCapacity, setVolunteerCapacity] = useState("");
  const [volunteerAvailability, setVolunteerAvailability] = useState("");
  const [volunteerResponsibilities, setVolunteerResponsibilities] = useState("");
  const [volunteerBenefits, setVolunteerBenefits] = useState("");

  // Category-Specific: Music & Entertainment
  const [artistNamesInput, setArtistNamesInput] = useState("");
  const [musicGenre, setMusicGenre] = useState("");
  const [performanceSchedule, setPerformanceSchedule] = useState("");

  // Category-Specific: Drama & Performing Arts
  const [productionTitle, setProductionTitle] = useState("");
  const [dramaGenre, setDramaGenre] = useState("");
  const [castMembersInput, setCastMembersInput] = useState("");
  const [director, setDirector] = useState("");
  const [synopsis, setSynopsis] = useState("");

  // Category-Specific: Higher Studies (MSc, PhD, Master's)
  const [programType, setProgramType] = useState("MSc");
  const [degreeAwarded, setDegreeAwarded] = useState("");
  const [studyMode, setStudyMode] = useState("Full-Time");
  const [programDuration, setProgramDuration] = useState("");
  const [fundingType, setFundingType] = useState("Fully Funded");
  const [scholarshipDetails, setScholarshipDetails] = useState("");
  const [entryQualifications, setEntryQualifications] = useState("");
  const [applicationRequirements, setApplicationRequirements] = useState("");
  const [intakePeriod, setIntakePeriod] = useState("");
  const [tuitionFee, setTuitionFee] = useState("");
  const [officialApplicationUrl, setOfficialApplicationUrl] = useState("");
  const [programUrl, setProgramUrl] = useState("");

  // Category-Specific: University Courses & Professional Learning
  const [courseLevel, setCourseLevel] = useState("Certificate");
  const [courseCode, setCourseCode] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [workloadHoursPerWeek, setWorkloadHoursPerWeek] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [instructor, setInstructor] = useState("");
  const [hasCertificate, setHasCertificate] = useState(true);
  const [enrollmentUrl, setEnrollmentUrl] = useState("");

  // Submission state
  const [submitting, setSubmitting] = useState(false);

  // Handle Title -> Slug generation
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isCustomSlug) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generated);
    }
  };

  // Image Upload Handler
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size <= 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size exceeds 5MB limit. Please choose a smaller image.");
      return;
    }

    // Validate type
    if (!file.type.match(/^image\/(png|jpeg|jpg|webp|gif|svg\+xml)$/i)) {
      toast.error("Please upload a valid image file (PNG, JPG, WEBP, GIF, SVG).");
      return;
    }

    setPosterFile(file);
    const objectUrl = URL.createObjectURL(file);
    setBannerPreview(objectUrl);
    toast.success("Event poster attached!");
  };

  const handleRemoveImage = () => {
    setPosterFile(null);
    setBannerPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Toggle volunteer role chip
  const handleToggleVolunteerRole = (role: string) => {
    if (volunteerRoles.includes(role)) {
      setVolunteerRoles(volunteerRoles.filter((r) => r !== role));
    } else {
      setVolunteerRoles([...volunteerRoles, role]);
    }
  };

  const handleAddCustomRole = () => {
    const trimmed = customRoleInput.trim();
    if (trimmed && !volunteerRoles.includes(trimmed)) {
      setVolunteerRoles([...volunteerRoles, trimmed]);
      setCustomRoleInput("");
    }
  };

  // Validation before submit
  const validateForm = (): boolean => {
    const targetOrg = orgId || defaultOrgId;
    const targetCat = catId || availableCategories[0]?.id;

    if (!targetOrg) {
      toast.error("Please select an organizing society.");
      setActiveSection("DETAILS");
      return false;
    }
    if (!targetCat) {
      toast.error("Please select a category.");
      setActiveSection("DETAILS");
      return false;
    }
    if (!title.trim()) {
      toast.error("Please enter an opportunity title.");
      setActiveSection("DETAILS");
      return false;
    }
    if (!slug.trim()) {
      toast.error("Please provide a valid URL slug.");
      setActiveSection("DETAILS");
      return false;
    }
    if (!description.trim()) {
      toast.error("Please provide a full event description.");
      setActiveSection("DETAILS");
      return false;
    }
    if (!startDateTime) {
      toast.error("Please specify event start date and time.");
      setActiveSection("TIMING");
      return false;
    }
    if (!endDateTime) {
      toast.error("Please specify event end date and time.");
      setActiveSection("TIMING");
      return false;
    }

    const start = new Date(startDateTime).getTime();
    const end = new Date(endDateTime).getTime();

    if (end <= start) {
      toast.error("Event end time must be after start time.");
      setActiveSection("TIMING");
      return false;
    }

    if (registrationDeadline) {
      const deadline = new Date(registrationDeadline).getTime();
      if (deadline > end) {
        toast.error("Registration deadline cannot be after the event ends.");
        setActiveSection("TIMING");
        return false;
      }
    }

    if (pricingMode === "SINGLE_PRICE" && (!price || Number(price) < 0)) {
      toast.error("Please enter a valid ticket price (Rs. >= 0).");
      setActiveSection("PRICING");
      return false;
    }

    if (pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL") {
      if (studentPrice === "" || Number(studentPrice) < 0 || externalPrice === "" || Number(externalPrice) < 0) {
        toast.error("Please provide valid prices for university students and external attendees.");
        setActiveSection("PRICING");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent, publishDirectly = false) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (publishDirectly && pricingMode !== "FREE_FOR_ALL") {
      if (!selectedOrgDetails?.bankName || !selectedOrgDetails?.bankAccountNumber) {
        toast.error("Society Bank Details Missing", {
          description: "Direct Club Bank Transfer is the only available payment method. Please configure society bank details before publishing a paid event.",
        });
        setActiveSection("PRICING");
        return;
      }
    }

    setSubmitting(true);
    const targetOrgId = orgId || defaultOrgId;
    const targetCatId = catId || availableCategories[0]?.id || "";

    try {
      let uploadedPosterUrl: string | undefined = undefined;
      if (posterFile) {
        setIsUploadingImage(true);
        try {
          const uploadRes = await eventsApi.uploadPoster(posterFile);
          uploadedPosterUrl = uploadRes.url;
        } catch (uploadErr: any) {
          toast.error("Failed to upload poster image: " + (uploadErr?.message || "Upload error"));
          setSubmitting(false);
          setIsUploadingImage(false);
          return;
        } finally {
          setIsUploadingImage(false);
        }
      } else if (bannerPreview && !bannerPreview.startsWith("blob:") && !bannerPreview.startsWith("data:")) {
        uploadedPosterUrl = bannerPreview;
      }

      const isFree = pricingMode === "FREE_FOR_ALL";

      const payload: Record<string, any> = {
        organizationId: targetOrgId,
        categoryId: targetCatId,
        title: title.trim(),
        slug: slug.trim(),
        status: publishDirectly ? "PUBLISHED" : "DRAFT",
        shortDescription: summary.trim() || undefined,
        description: description.trim() || summary.trim() || title.trim(),
        opportunityType,
        mode,
        location: (mode === "ONLINE" ? undefined : (venue.trim() || location.trim())) || undefined,
        venue: (mode === "ONLINE" ? undefined : (venue.trim() || location.trim())) || undefined,
        meetingUrl: (mode === "IN_PERSON" ? undefined : meetingUrl.trim()) || undefined,
        startDate: new Date(startDateTime).toISOString(),
        endDate: new Date(endDateTime).toISOString(),
        registrationDeadline: registrationDeadline ? new Date(registrationDeadline).toISOString() : undefined,
        capacity: capacity ? Number(capacity) : undefined,
        isFree,
        pricingMode,
        price: pricingMode === "SINGLE_PRICE" ? Number(price) : undefined,
        studentPrice:
          pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL"
            ? Number(studentPrice)
            : pricingMode === "SINGLE_PRICE"
              ? Number(price)
              : 0,
        externalPrice:
          pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL"
            ? Number(externalPrice)
            : pricingMode === "SINGLE_PRICE"
              ? Number(price)
              : 0,
        currency: "LKR",
        allowClubTransfer: !isFree,
        allowOnlineGateway: false,
        customPaymentInstructions: !isFree ? customPaymentInstructions.trim() || undefined : undefined,
        bannerUrl: uploadedPosterUrl || undefined,
        coverImageUrl: uploadedPosterUrl || undefined,
        posterUrl: uploadedPosterUrl || undefined,
        // Optional Fields
        contactEmail: contactEmail.trim() || undefined,
        contactPhone: contactPhone.trim() || undefined,
        instagramUrl: instagramUrl.trim() || undefined,
        facebookUrl: facebookUrl.trim() || undefined,
        websiteUrl: websiteUrl.trim() || undefined,
        officialEventUrl: officialEventUrl.trim() || undefined,
        supportingLecturer: supportingLecturer.trim() || undefined,
        eligibility: eligibility.trim() || undefined,
        prizeInfo: prizeInfo.trim() || undefined,
        teamSize: teamSize.trim() || undefined,
        // Volunteering Fields (Strictly populated only if enabled)
        volunteerRoles: needsVolunteers && volunteerRoles.length > 0 ? volunteerRoles : [],
        volunteerCapacity: needsVolunteers && volunteerCapacity ? Number(volunteerCapacity) : undefined,
        volunteerAvailability: needsVolunteers && volunteerAvailability.trim() ? volunteerAvailability.trim() : undefined,
        volunteerResponsibilities:
          needsVolunteers && volunteerResponsibilities.trim() ? volunteerResponsibilities.trim() : undefined,
        volunteerBenefits: needsVolunteers && volunteerBenefits.trim() ? volunteerBenefits.trim() : undefined,
        // Music & Entertainment
        artistNames:
          opportunityType === "MUSIC" && artistNamesInput.trim()
            ? artistNamesInput.split(",").map((a) => a.trim()).filter(Boolean)
            : undefined,
        musicGenre: opportunityType === "MUSIC" && musicGenre.trim() ? musicGenre.trim() : undefined,
        performanceSchedule:
          opportunityType === "MUSIC" && performanceSchedule.trim() ? performanceSchedule.trim() : undefined,
        // Drama & Performing Arts
        productionTitle:
          opportunityType === "DRAMA" && productionTitle.trim() ? productionTitle.trim() : undefined,
        dramaGenre: opportunityType === "DRAMA" && dramaGenre.trim() ? dramaGenre.trim() : undefined,
        castMembers:
          opportunityType === "DRAMA" && castMembersInput.trim()
            ? castMembersInput.split(",").map((c) => c.trim()).filter(Boolean)
            : undefined,
        director: opportunityType === "DRAMA" && director.trim() ? director.trim() : undefined,
        synopsis: opportunityType === "DRAMA" && synopsis.trim() ? synopsis.trim() : undefined,
        // Higher Studies (MSc, PhD, Master's)
        programType:
          opportunityType === "HIGHER_STUDIES" && programType.trim() ? programType.trim() : undefined,
        degreeAwarded:
          opportunityType === "HIGHER_STUDIES" && degreeAwarded.trim() ? degreeAwarded.trim() : undefined,
        studyMode:
          opportunityType === "HIGHER_STUDIES" && studyMode.trim() ? studyMode.trim() : undefined,
        programDuration:
          opportunityType === "HIGHER_STUDIES" && programDuration.trim() ? programDuration.trim() : undefined,
        fundingType:
          opportunityType === "HIGHER_STUDIES" && fundingType.trim() ? fundingType.trim() : undefined,
        scholarshipDetails:
          opportunityType === "HIGHER_STUDIES" && scholarshipDetails.trim() ? scholarshipDetails.trim() : undefined,
        entryQualifications:
          opportunityType === "HIGHER_STUDIES" && entryQualifications.trim() ? entryQualifications.trim() : undefined,
        applicationRequirements:
          opportunityType === "HIGHER_STUDIES" && applicationRequirements.trim()
            ? applicationRequirements.trim()
            : undefined,
        intakePeriod:
          opportunityType === "HIGHER_STUDIES" && intakePeriod.trim() ? intakePeriod.trim() : undefined,
        tuitionFee:
          opportunityType === "HIGHER_STUDIES" && tuitionFee.trim() ? tuitionFee.trim() : undefined,
        officialApplicationUrl:
          opportunityType === "HIGHER_STUDIES" && officialApplicationUrl.trim()
            ? officialApplicationUrl.trim()
            : undefined,
        programUrl:
          opportunityType === "HIGHER_STUDIES" && programUrl.trim() ? programUrl.trim() : undefined,
        // University Courses & Professional Learning
        courseLevel:
          opportunityType === "UNIVERSITY_COURSE" && courseLevel.trim() ? courseLevel.trim() : undefined,
        courseCode:
          opportunityType === "UNIVERSITY_COURSE" && courseCode.trim() ? courseCode.trim() : undefined,
        courseDuration:
          opportunityType === "UNIVERSITY_COURSE" && courseDuration.trim() ? courseDuration.trim() : undefined,
        workloadHoursPerWeek:
          opportunityType === "UNIVERSITY_COURSE" && workloadHoursPerWeek.trim()
            ? workloadHoursPerWeek.trim()
            : undefined,
        prerequisites:
          opportunityType === "UNIVERSITY_COURSE" && prerequisites.trim() ? prerequisites.trim() : undefined,
        syllabus:
          opportunityType === "UNIVERSITY_COURSE" && syllabus.trim() ? syllabus.trim() : undefined,
        instructor:
          opportunityType === "UNIVERSITY_COURSE" && instructor.trim() ? instructor.trim() : undefined,
        hasCertificate:
          opportunityType === "UNIVERSITY_COURSE" ? hasCertificate : undefined,
        enrollmentUrl:
          opportunityType === "UNIVERSITY_COURSE" && enrollmentUrl.trim() ? enrollmentUrl.trim() : undefined,
      };

      const created = await eventsApi.createEvent(payload);

      if (publishDirectly) {
        toast.success(`Event "${title}" Published Successfully! 🚀`, {
          description: "Your event is live and discoverable to students across CampusPulse.",
        });
      } else {
        toast.success("Event saved as Draft 📝", {
          description: "You can preview, edit, or publish it directly anytime.",
        });
      }

      onEventCreated?.(created, publishDirectly);
      onOpenChange(false);
      resetForm();
    } catch (err: any) {
      toast.error(err?.message || "Failed to create event opportunity.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setIsCustomSlug(false);
    setSummary("");
    setDescription("");
    setBannerPreview(null);
    setLocation("");
    setVenue("");
    setMeetingUrl("");
    setStartDateTime("");
    setEndDateTime("");
    setRegistrationDeadline("");
    setPricingMode("FREE_FOR_ALL");
    setPrice("");
    setStudentPrice("");
    setExternalPrice("");
    setCapacity("");
    setAllowOnlineGateway(false);
    setAllowClubTransfer(true);
    setCustomPaymentInstructions("");
    setContactEmail("");
    setContactPhone("");
    setInstagramUrl("");
    setFacebookUrl("");
    setWebsiteUrl("");
    setOfficialEventUrl("");
    setSupportingLecturer("");
    setEligibility("");
    setPrizeInfo("");
    setTeamSize("");
    setNeedsVolunteers(false);
    setArtistNamesInput("");
    setMusicGenre("");
    setPerformanceSchedule("");
    setProductionTitle("");
    setDramaGenre("");
    setCastMembersInput("");
    setDirector("");
    setSynopsis("");
    setProgramType("MSc");
    setDegreeAwarded("");
    setStudyMode("Full-Time");
    setProgramDuration("");
    setFundingType("Fully Funded");
    setScholarshipDetails("");
    setEntryQualifications("");
    setApplicationRequirements("");
    setIntakePeriod("");
    setTuitionFee("");
    setOfficialApplicationUrl("");
    setProgramUrl("");
    setCourseLevel("Certificate");
    setCourseCode("");
    setCourseDuration("");
    setWorkloadHoursPerWeek("");
    setPrerequisites("");
    setSyllabus("");
    setInstructor("");
    setHasCertificate(true);
    setEnrollmentUrl("");
    setVolunteerRoles([]);
    setCustomRoleInput("");
    setVolunteerCapacity("");
    setVolunteerAvailability("");
    setVolunteerResponsibilities("");
    setVolunteerBenefits("");
    setActiveSection("DETAILS");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto p-0 gap-0 border-border bg-card shadow-2xl">
        {/* Header */}
        <DialogHeader className="p-6 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="size-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Event Creation Studio</span>
          </div>
          <DialogTitle className="text-xl font-black text-foreground">Create New Opportunity</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Configure opportunity details, scheduling, tickets, and volunteer recruiting for your student organization.
          </DialogDescription>
        </DialogHeader>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-border bg-card overflow-x-auto text-xs">
          <button
            type="button"
            onClick={() => setActiveSection("DETAILS")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 font-bold border-b-2 transition-all whitespace-nowrap",
              activeSection === "DETAILS"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="flex size-4 items-center justify-center rounded-full bg-primary/10 text-[10px]">1</span>
            Event Details *
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("TIMING")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 font-bold border-b-2 transition-all whitespace-nowrap",
              activeSection === "TIMING"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="flex size-4 items-center justify-center rounded-full bg-primary/10 text-[10px]">2</span>
            Date & Venue *
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("PRICING")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 font-bold border-b-2 transition-all whitespace-nowrap",
              activeSection === "PRICING"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="flex size-4 items-center justify-center rounded-full bg-primary/10 text-[10px]">3</span>
            Ticketing & Pricing *
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("OPTIONAL")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 font-bold border-b-2 transition-all whitespace-nowrap",
              activeSection === "OPTIONAL"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="flex size-4 items-center justify-center rounded-full bg-muted text-[10px]">4</span>
            Additional Info
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("VOLUNTEERING")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 font-bold border-b-2 transition-all whitespace-nowrap",
              activeSection === "VOLUNTEERING"
                ? "border-rose-500 text-rose-600 dark:text-rose-400"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="flex size-4 items-center justify-center rounded-full bg-rose-500/10 text-rose-500 text-[10px]">
              5
            </span>
            Volunteering {needsVolunteers ? "✓" : "(Optional)"}
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={(e) => handleSubmit(e, false)} className="p-6 space-y-6">
          {/* SECTION 1: Essential Event Details */}
          {activeSection === "DETAILS" && (
            <div className="space-y-4 animate-in fade-in-50">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Organizing Society */}
                <div className="space-y-1.5">
                  <Label htmlFor="create-org" className="text-xs font-bold">
                    Organizing Society <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="create-org"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary"
                    value={orgId || defaultOrgId}
                    onChange={(e) => setOrgId(e.target.value)}
                    required
                  >
                    {availableOrgs.map((org) => (
                      <option key={org.organizationId} value={org.organizationId}>
                        {org.organizationName} ({org.role.replace(/_/g, " ")})
                      </option>
                    ))}
                  </select>
                  {availableOrgs.length === 0 && (
                    <p className="text-[11px] text-destructive">
                      You must be an active Leader or Event Organizer of a society to create events.
                    </p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <Label htmlFor="create-category" className="text-xs font-bold">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="create-category"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary"
                    value={catId || availableCategories[0]?.id || ""}
                    onChange={(e) => setCatId(e.target.value)}
                    required
                  >
                    {availableCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Opportunity Type */}
              <div className="space-y-1.5">
                <Label htmlFor="create-type" className="text-xs font-bold">
                  Opportunity Type <span className="text-destructive">*</span>
                </Label>
                <select
                  id="create-type"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary"
                  value={opportunityType}
                  onChange={(e) => setOpportunityType(e.target.value as OpportunityType)}
                  required
                >
                  {OPPORTUNITY_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.icon} {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Opportunity Title */}
              <div className="space-y-1.5">
                <Label htmlFor="create-title" className="text-xs font-bold">
                  Opportunity Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="create-title"
                  placeholder="e.g. SLIIT National Inter-University Hackathon 2026"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>

              {/* URL Slug */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="create-slug" className="text-xs font-bold">
                    URL Slug <span className="text-destructive">*</span>
                  </Label>
                  <button
                    type="button"
                    onClick={() => setIsCustomSlug(!isCustomSlug)}
                    className="text-[11px] text-primary hover:underline"
                  >
                    {isCustomSlug ? "Auto-generate from title" : "Customize URL slug"}
                  </button>
                </div>
                <div className="flex items-center rounded-lg border border-input bg-background px-3 text-xs text-muted-foreground">
                  <span className="shrink-0 text-muted-foreground/70">campuspulse.lk/events/</span>
                  <input
                    id="create-slug"
                    className="w-full bg-transparent py-2 pl-1 text-xs text-foreground focus:outline-none"
                    placeholder="sliit-hackathon-2026"
                    value={slug}
                    onChange={(e) => {
                      setIsCustomSlug(true);
                      setSlug(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              {/* Summary / Tagline */}
              <div className="space-y-1.5">
                <Label htmlFor="create-summary" className="text-xs font-bold">
                  Summary / Tagline (Optional)
                </Label>
                <Input
                  id="create-summary"
                  placeholder="Brief one-line hook for event cards (max 150 chars)"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="text-xs"
                  maxLength={200}
                />
              </div>

              {/* Full Description */}
              <div className="space-y-1.5">
                <Label htmlFor="create-desc" className="text-xs font-bold">
                  Full Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="create-desc"
                  placeholder="Comprehensive event details, agenda, rules, submission guidelines, and schedule..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>

              {/* DYNAMIC CATEGORY PANEL: Music & Entertainment */}
              {opportunityType === "MUSIC" && (
                <div className="rounded-xl border border-pink-500/30 bg-pink-500/5 p-4 space-y-4 animate-in fade-in-50">
                  <div className="flex items-center gap-2 text-pink-700 dark:text-pink-300 font-bold text-xs uppercase tracking-wider">
                    <Music className="size-4" />
                    <span>Music & Entertainment Details</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="music-artists" className="text-xs font-bold">
                        Artist / Band Lineup (Comma-separated)
                      </Label>
                      <Input
                        id="music-artists"
                        placeholder="e.g. Bathiya & Santhush, Daddy, The Voice All-Stars"
                        value={artistNamesInput}
                        onChange={(e) => setArtistNamesInput(e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="music-genre" className="text-xs font-bold">
                        Music Genre / Performance Style
                      </Label>
                      <Input
                        id="music-genre"
                        placeholder="e.g. Fusion Rock, Acoustic Pop, DJ Night, Classical Showcase"
                        value={musicGenre}
                        onChange={(e) => setMusicGenre(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="music-schedule" className="text-xs font-bold">
                      Performance Schedule & Set Times (Optional)
                    </Label>
                    <Textarea
                      id="music-schedule"
                      placeholder="• 5:30 PM: Gates Open & Sound Check&#10;• 6:30 PM: Opening Act by University Band&#10;• 8:00 PM: Main Headliner Performance&#10;• 11:00 PM: Grand Finale"
                      rows={3}
                      value={performanceSchedule}
                      onChange={(e) => setPerformanceSchedule(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>
              )}

              {/* DYNAMIC CATEGORY PANEL: Drama & Performing Arts */}
              {opportunityType === "DRAMA" && (
                <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-4 space-y-4 animate-in fade-in-50">
                  <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300 font-bold text-xs uppercase tracking-wider">
                    <Theater className="size-4" />
                    <span>Drama & Performing Arts Production Details</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="drama-title" className="text-xs font-bold">
                        Production Title / Show Name
                      </Label>
                      <Input
                        id="drama-title"
                        placeholder="e.g. Kuveni - The Musical Revival"
                        value={productionTitle}
                        onChange={(e) => setProductionTitle(e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="drama-genre" className="text-xs font-bold">
                        Theatre Genre / Category
                      </Label>
                      <Input
                        id="drama-genre"
                        placeholder="e.g. Stage Play, Musical Theatre, Short Film Screening, Comedy Drama"
                        value={dramaGenre}
                        onChange={(e) => setDramaGenre(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="drama-director" className="text-xs font-bold">
                        Director / Production Company
                      </Label>
                      <Input
                        id="drama-director"
                        placeholder="e.g. Directed by University Drama Society & Alumni"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="drama-cast" className="text-xs font-bold">
                        Key Cast & Performers (Comma-separated)
                      </Label>
                      <Input
                        id="drama-cast"
                        placeholder="e.g. Kasun Fernando (Lead), Amaya Silva, Drama Ensemble"
                        value={castMembersInput}
                        onChange={(e) => setCastMembersInput(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="drama-synopsis" className="text-xs font-bold">
                      Synopsis / Story Overview
                    </Label>
                    <Textarea
                      id="drama-synopsis"
                      placeholder="An inspiring 2-hour stage performance depicting youth leadership, culture, and theatrical innovation..."
                      rows={3}
                      value={synopsis}
                      onChange={(e) => setSynopsis(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>
              )}

              {/* DYNAMIC CATEGORY PANEL: Higher Studies (MSc, PhD) */}
              {opportunityType === "HIGHER_STUDIES" && (
                <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4 space-y-4 animate-in fade-in-50">
                  <div className="flex items-center gap-2 text-sky-700 dark:text-sky-300 font-bold text-xs uppercase tracking-wider">
                    <GraduationCap className="size-4" />
                    <span>Higher Studies & Academic Program Configuration</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="hs-program-type" className="text-xs font-bold">
                        Qualification Award Level
                      </Label>
                      <select
                        id="hs-program-type"
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary"
                        value={programType}
                        onChange={(e) => setProgramType(e.target.value)}
                      >
                        <option value="MSc">MSc — Master of Science</option>
                        <option value="Master's">Master's Degree (MA, MBA, MEng)</option>
                        <option value="MPhil">MPhil — Master of Philosophy</option>
                        <option value="PhD">PhD / Doctoral Degree</option>
                        <option value="Postgraduate Diploma">Postgraduate Diploma (PgD)</option>
                        <option value="Postdoctoral Fellowship">Postdoctoral Fellowship</option>
                        <option value="Open Day">Postgraduate Open Day / Info Session</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="hs-degree" className="text-xs font-bold">
                        Degree / Award Title
                      </Label>
                      <Input
                        id="hs-degree"
                        placeholder="e.g. Master of Science in Data Science & AI"
                        value={degreeAwarded}
                        onChange={(e) => setDegreeAwarded(e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="hs-mode" className="text-xs font-bold">
                        Study Mode
                      </Label>
                      <select
                        id="hs-mode"
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary"
                        value={studyMode}
                        onChange={(e) => setStudyMode(e.target.value)}
                      >
                        <option value="Full-Time">Full-Time (On-Campus)</option>
                        <option value="Part-Time">Part-Time / Weekend</option>
                        <option value="Hybrid">Hybrid / Blended Learning</option>
                        <option value="Online">100% Online Distance Learning</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="hs-funding" className="text-xs font-bold">
                        Funding Availability
                      </Label>
                      <select
                        id="hs-funding"
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary"
                        value={fundingType}
                        onChange={(e) => setFundingType(e.target.value)}
                      >
                        <option value="Fully Funded">Fully Funded (Tuition + Stipend)</option>
                        <option value="Partially Funded">Partially Funded (Tuition Waiver)</option>
                        <option value="Self-Funded">Self-Funded / Fee Paying</option>
                        <option value="Research Assistantship">Research Assistantship / Grant</option>
                        <option value="Scholarship Available">Merit Scholarships Available</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="hs-duration" className="text-xs font-bold">
                        Program Duration
                      </Label>
                      <Input
                        id="hs-duration"
                        placeholder="e.g. 2 Years (Full-Time) / 3 Years (Part-Time)"
                        value={programDuration}
                        onChange={(e) => setProgramDuration(e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="hs-intake" className="text-xs font-bold">
                        Intake / Academic Term
                      </Label>
                      <Input
                        id="hs-intake"
                        placeholder="e.g. September 2026 / Spring 2027"
                        value={intakePeriod}
                        onChange={(e) => setIntakePeriod(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="hs-scholarship" className="text-xs font-bold">
                        Scholarship & Stipend Details
                      </Label>
                      <Textarea
                        id="hs-scholarship"
                        placeholder="Details of monthly living allowance, research grants, tuition discounts, or sponsor awards..."
                        rows={2}
                        value={scholarshipDetails}
                        onChange={(e) => setScholarshipDetails(e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="hs-tuition" className="text-xs font-bold">
                        Tuition Fee & Pricing Structure
                      </Label>
                      <Input
                        id="hs-tuition"
                        placeholder="e.g. LKR 1,500,000 (Local) / USD 6,000 (International)"
                        value={tuitionFee}
                        onChange={(e) => setTuitionFee(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="hs-qualifications" className="text-xs font-bold">
                        Minimum Entry Qualifications
                      </Label>
                      <Textarea
                        id="hs-qualifications"
                        placeholder="• Recognized Bachelor's Honours degree with minimum GPA 3.0&#10;• IELTS 6.5 or equivalent English proficiency&#10;• 1+ year industry/research experience preferred"
                        rows={3}
                        value={entryQualifications}
                        onChange={(e) => setEntryQualifications(e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="hs-requirements" className="text-xs font-bold">
                        Required Documents & Checklist
                      </Label>
                      <Textarea
                        id="hs-requirements"
                        placeholder="• Official Academic Transcripts & Degree Certificates&#10;• Statement of Purpose (SOP) & Curriculum Vitae&#10;• 2 Letters of Recommendation (Academic & Professional)"
                        rows={3}
                        value={applicationRequirements}
                        onChange={(e) => setApplicationRequirements(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="hs-app-url" className="text-xs font-bold">
                        Official Application Portal URL (External)
                      </Label>
                      <Input
                        id="hs-app-url"
                        type="url"
                        placeholder="https://apply.university.edu/postgraduate/apply"
                        value={officialApplicationUrl}
                        onChange={(e) => setOfficialApplicationUrl(e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="hs-prog-url" className="text-xs font-bold">
                        Official Program Brochure / Info URL
                      </Label>
                      <Input
                        id="hs-prog-url"
                        type="url"
                        placeholder="https://university.edu/degrees/msc-ai-robotics"
                        value={programUrl}
                        onChange={(e) => setProgramUrl(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* DYNAMIC CATEGORY PANEL: University Courses & Learning */}
              {opportunityType === "UNIVERSITY_COURSE" && (
                <div className="rounded-xl border border-teal-500/30 bg-teal-500/5 p-4 space-y-4 animate-in fade-in-50">
                  <div className="flex items-center gap-2 text-teal-700 dark:text-teal-300 font-bold text-xs uppercase tracking-wider">
                    <BookOpenCheck className="size-4" />
                    <span>University Course & Professional Learning Configuration</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="course-level" className="text-xs font-bold">
                        Course Level / Credential
                      </Label>
                      <select
                        id="course-level"
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary"
                        value={courseLevel}
                        onChange={(e) => setCourseLevel(e.target.value)}
                      >
                        <option value="Certificate">Certificate Program</option>
                        <option value="Professional Development">Professional Development Course</option>
                        <option value="Diploma">University Diploma</option>
                        <option value="Short Course">Short Technical Course</option>
                        <option value="Undergraduate Module">Undergraduate Open Module</option>
                        <option value="Executive Education">Executive Education & Training</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="course-code" className="text-xs font-bold">
                        Course Code (Optional)
                      </Label>
                      <Input
                        id="course-code"
                        placeholder="e.g. CS-4089 / CCNA-PRO"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="course-duration" className="text-xs font-bold">
                        Course Duration & Schedule
                      </Label>
                      <Input
                        id="course-duration"
                        placeholder="e.g. 12 Weeks (Saturdays 9 AM - 1 PM)"
                        value={courseDuration}
                        onChange={(e) => setCourseDuration(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="course-workload" className="text-xs font-bold">
                        Expected Workload
                      </Label>
                      <Input
                        id="course-workload"
                        placeholder="e.g. 4-6 hours / week"
                        value={workloadHoursPerWeek}
                        onChange={(e) => setWorkloadHoursPerWeek(e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="course-instructor" className="text-xs font-bold">
                        Instructor / Department Lead
                      </Label>
                      <Input
                        id="course-instructor"
                        placeholder="e.g. Prof. R. Jayasinghe, Faculty of Computing"
                        value={instructor}
                        onChange={(e) => setInstructor(e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold">Certificate Included?</Label>
                      <button
                        type="button"
                        onClick={() => setHasCertificate(!hasCertificate)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-bold transition-all",
                          hasCertificate
                            ? "border-teal-500 bg-teal-500/10 text-teal-700 dark:text-teal-300"
                            : "border-border text-muted-foreground hover:bg-surface"
                        )}
                      >
                        <span>Verified Digital Certificate</span>
                        <span>{hasCertificate ? "✓ Yes" : "✕ No"}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="course-prereq" className="text-xs font-bold">
                        Prerequisites & Target Audience
                      </Label>
                      <Textarea
                        id="course-prereq"
                        placeholder="• Basic familiarity with web technologies or programming&#10;• Open to all undergraduates and working professionals"
                        rows={3}
                        value={prerequisites}
                        onChange={(e) => setPrerequisites(e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="course-syllabus" className="text-xs font-bold">
                        Syllabus & Core Learning Outcomes
                      </Label>
                      <Textarea
                        id="course-syllabus"
                        placeholder="• Week 1-3: Foundations & Principles&#10;• Week 4-8: Hands-on Practical Labs & Case Studies&#10;• Week 9-12: Capstone Industry Project & Assessment"
                        rows={3}
                        value={syllabus}
                        onChange={(e) => setSyllabus(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="course-enroll-url" className="text-xs font-bold">
                      Official University Enrollment / Registration URL
                    </Label>
                    <Input
                      id="course-enroll-url"
                      type="url"
                      placeholder="https://courses.university.edu/enroll/2026"
                      value={enrollmentUrl}
                      onChange={(e) => setEnrollmentUrl(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Event Poster / Banner Upload Attachment */}
              <div className="space-y-2 rounded-xl border border-border bg-surface/50 p-4">
                <Label className="text-xs font-bold flex items-center gap-1.5">
                  <ImageIcon className="size-4 text-primary" />
                  Event Poster or Banner Attachment (Optional)
                </Label>
                <p className="text-[11px] text-muted-foreground">
                  Upload an event promotional poster or header banner. (PNG, JPG, WEBP up to 5MB).
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                  onChange={handleImageFileChange}
                />

                {bannerPreview ? (
                  <div className="relative rounded-lg overflow-hidden border border-border group max-w-md">
                    <img
                      src={bannerPreview}
                      alt="Banner Preview"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        className="text-xs gap-1 h-8"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <RefreshCw className="size-3.5" /> Replace
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="text-xs gap-1 h-8"
                        onClick={handleRemoveImage}
                      >
                        <Trash2 className="size-3.5" /> Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors"
                  >
                    <Upload className="size-6 text-muted-foreground mb-2" />
                    <p className="text-xs font-semibold text-foreground">Click to upload event banner / poster</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Recommended resolution: 1200 × 630 px</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 2: Date, Time & Venue */}
          {activeSection === "TIMING" && (
            <div className="space-y-4 animate-in fade-in-50">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Start Date & Time */}
                <div className="space-y-1.5">
                  <Label htmlFor="start-date" className="text-xs font-bold">
                    Start Date & Time <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="start-date"
                    type="datetime-local"
                    value={startDateTime}
                    onChange={(e) => setStartDateTime(e.target.value)}
                    className="text-xs"
                    required
                  />
                </div>

                {/* End Date & Time */}
                <div className="space-y-1.5">
                  <Label htmlFor="end-date" className="text-xs font-bold">
                    End Date & Time <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="end-date"
                    type="datetime-local"
                    value={endDateTime}
                    onChange={(e) => setEndDateTime(e.target.value)}
                    className="text-xs"
                    required
                  />
                </div>
              </div>

              {/* Registration Deadline */}
              <div className="space-y-1.5">
                <Label htmlFor="reg-deadline" className="text-xs font-bold">
                  Registration Deadline (Optional)
                </Label>
                <Input
                  id="reg-deadline"
                  type="datetime-local"
                  value={registrationDeadline}
                  onChange={(e) => setRegistrationDeadline(e.target.value)}
                  className="text-xs"
                />
                <p className="text-[11px] text-muted-foreground">
                  Registrations will automatically close after this cutoff timestamp.
                </p>
              </div>

              {/* Event Mode */}
              <div className="space-y-1.5">
                <Label htmlFor="event-mode" className="text-xs font-bold">
                  Event Mode <span className="text-destructive">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMode("IN_PERSON")}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-bold transition-all",
                      mode === "IN_PERSON"
                        ? "border-primary bg-primary/10 text-primary shadow-xs"
                        : "border-border text-muted-foreground hover:bg-surface"
                    )}
                  >
                    <MapPin className="size-4 mb-1" />
                    In-Person
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("ONLINE")}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-bold transition-all",
                      mode === "ONLINE"
                        ? "border-primary bg-primary/10 text-primary shadow-xs"
                        : "border-border text-muted-foreground hover:bg-surface"
                    )}
                  >
                    <Globe className="size-4 mb-1" />
                    Online
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("HYBRID")}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-bold transition-all",
                      mode === "HYBRID"
                        ? "border-primary bg-primary/10 text-primary shadow-xs"
                        : "border-border text-muted-foreground hover:bg-surface"
                    )}
                  >
                    <Sparkles className="size-4 mb-1" />
                    Hybrid
                  </button>
                </div>
              </div>

              {/* Conditional Location / Venue (For In-Person and Hybrid) */}
              {(mode === "IN_PERSON" || mode === "HYBRID") && (
                <div className="space-y-1.5 animate-in fade-in-50">
                  <Label htmlFor="create-venue" className="text-xs font-bold">
                    Venue / Campus Location <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="create-venue"
                    placeholder="e.g. Main Auditorium, Computing Faculty, SLIIT Malabe Campus"
                    value={venue}
                    onChange={(e) => {
                      setVenue(e.target.value);
                      setLocation(e.target.value);
                    }}
                    className="text-xs"
                    required
                  />
                </div>
              )}

              {/* Conditional Online Meeting URL (For Online and Hybrid) */}
              {(mode === "ONLINE" || mode === "HYBRID") && (
                <div className="space-y-1.5 animate-in fade-in-50">
                  <Label htmlFor="create-meeting" className="text-xs font-bold">
                    Online Meeting / Stream URL (Optional)
                  </Label>
                  <Input
                    id="create-meeting"
                    type="url"
                    placeholder="https://zoom.us/j/... or https://meet.google.com/..."
                    value={meetingUrl}
                    onChange={(e) => setMeetingUrl(e.target.value)}
                    className="text-xs"
                  />
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: Ticketing and Pricing Configuration */}
          {activeSection === "PRICING" && (
            <div className="space-y-4 animate-in fade-in-50">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-xs">
                  <Ticket className="size-4" />
                  <span>Ticketing & Pricing Models</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  CampusPulse calculates ticket prices server-side upon registration based on the attendee's verified
                  university status. Paid events can be drafted and published before production payment gateway setup.
                </p>

                <div className="space-y-2">
                  <Label className="text-xs font-bold">Select Pricing Structure *</Label>
                  <select
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary"
                    value={pricingMode}
                    onChange={(e) => setPricingMode(e.target.value as EventPricingMode)}
                  >
                    <option value="FREE_FOR_ALL">Free for All Participants — Rs. 0</option>
                    <option value="SINGLE_PRICE">One Fixed Price for All Attendees</option>
                    <option value="STUDENT_AND_EXTERNAL_PRICE">
                      Tiered: Verified University Students vs External Attendees
                    </option>
                  </select>
                </div>

                {/* Single Price Input */}
                {pricingMode === "SINGLE_PRICE" && (
                  <div className="space-y-1.5 pt-2 animate-in fade-in-50">
                    <Label htmlFor="single-price" className="text-xs font-bold">
                      Standard Admission Price (LKR / Rs.) *
                    </Label>
                    <Input
                      id="single-price"
                      type="number"
                      min="0"
                      placeholder="e.g. 500"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="text-xs"
                      required
                    />
                  </div>
                )}

                {/* Tiered Pricing Inputs */}
                {pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL" && (
                  <div className="grid gap-3 sm:grid-cols-2 pt-2 animate-in fade-in-50">
                    <div className="space-y-1.5">
                      <Label htmlFor="student-price" className="text-xs font-bold">
                        Verified Student Price (Rs.) *
                      </Label>
                      <Input
                        id="student-price"
                        type="number"
                        min="0"
                        placeholder="e.g. 0 (Free for students) or 250"
                        value={studentPrice}
                        onChange={(e) => setStudentPrice(e.target.value)}
                        className="text-xs"
                        required
                      />
                      <p className="text-[10px] text-muted-foreground">
                        Applied to participants with a verified university email.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="external-price" className="text-xs font-bold">
                        External / General Price (Rs.) *
                      </Label>
                      <Input
                        id="external-price"
                        type="number"
                        min="0"
                        placeholder="e.g. 1000"
                        value={externalPrice}
                        onChange={(e) => setExternalPrice(e.target.value)}
                        className="text-xs"
                        required
                      />
                      <p className="text-[10px] text-muted-foreground">
                        Applied to public or external non-student attendees.
                      </p>
                    </div>
                  </div>
                )}

                {/* Accepted Payment Method (Paid Events) */}
                {pricingMode !== "FREE_FOR_ALL" && (
                  <div className="space-y-3 pt-3 border-t border-border/60">
                    <Label className="text-xs font-bold text-foreground block">
                      Accepted Payment Method *
                    </Label>

                    {/* Direct Bank Transfer to Club Only Banner / Card */}
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                          <Building className="size-5" />
                        </div>
                        <div className="text-xs space-y-1">
                          <span className="font-bold text-foreground block text-sm">
                            Direct Bank Transfer to Club
                          </span>
                          <p className="text-muted-foreground leading-relaxed">
                            Under the current release, Direct Bank Transfer is the exclusive payment method for paid events. Attendees deposit funds directly into your society bank account and submit proof of payment. An authorized financial officer verifies the transfer before admission passes are generated.
                          </p>
                        </div>
                      </div>

                      {selectedOrgDetails?.bankAccountNumber ? (
                        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                            ✓ Society Bank Account Configured
                          </span>
                          <div className="text-[11px] text-foreground space-y-0.5">
                            <p><span className="text-muted-foreground">Bank:</span> {selectedOrgDetails.bankName} {selectedOrgDetails.bankBranch ? `(${selectedOrgDetails.bankBranch})` : ""}</p>
                            <p><span className="text-muted-foreground">Account Name:</span> {selectedOrgDetails.bankAccountName}</p>
                            <p><span className="text-muted-foreground">Account Number:</span> <span className="font-mono font-bold">{selectedOrgDetails.bankAccountNumber}</span></p>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs">
                          <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
                            ⚠️ Society Bank Details Missing
                          </span>
                          <p className="text-[11px] text-muted-foreground">
                            This society has not saved its bank account details. You can save this event as a Draft, but valid bank details in Society Settings are required before publishing paid events.
                          </p>
                        </div>
                      )}

                      <div className="space-y-1.5 pt-1">
                        <Label htmlFor="custom-instructions" className="text-xs font-bold">
                          Event-Specific Bank Transfer Instructions (Optional)
                        </Label>
                        <Textarea
                          id="custom-instructions"
                          placeholder="e.g. Please put event name and your Student ID in the transaction remarks and upload slip here."
                          value={customPaymentInstructions}
                          onChange={(e) => setCustomPaymentInstructions(e.target.value)}
                          rows={2}
                          className="text-xs"
                        />
                        <p className="text-[10px] text-muted-foreground">
                          Shown to students alongside bank account details during registration.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Capacity Limit */}
              <div className="space-y-1.5">
                <Label htmlFor="create-capacity" className="text-xs font-bold">
                  Maximum Event Capacity / Headcount (Optional)
                </Label>
                <Input
                  id="create-capacity"
                  type="number"
                  min="1"
                  placeholder="e.g. 250 (Leave blank for unlimited)"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="text-xs"
                />
                <p className="text-[11px] text-muted-foreground">
                  When reached, additional registrations will be blocked automatically.
                </p>
              </div>
            </div>
          )}

          {/* SECTION 4: Additional Information (Optional) */}
          {activeSection === "OPTIONAL" && (
            <div className="space-y-4 animate-in fade-in-50">
              <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Supporting Links & Contacts
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Optional contact references, social links, and academic advisors.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email" className="text-xs font-bold">
                      Contact Email
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="e.g. events@society.sliit.lk"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-phone" className="text-xs font-bold">
                      Contact Phone
                    </Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="e.g. +94 77 123 4567"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="instagram-url" className="text-xs font-bold">
                      Instagram URL
                    </Label>
                    <Input
                      id="instagram-url"
                      type="url"
                      placeholder="https://instagram.com/..."
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      className="text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="facebook-url" className="text-xs font-bold">
                      Facebook URL
                    </Label>
                    <Input
                      id="facebook-url"
                      type="url"
                      placeholder="https://facebook.com/..."
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                      className="text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="website-url" className="text-xs font-bold">
                      Official Website
                    </Label>
                    <Input
                      id="website-url"
                      type="url"
                      placeholder="https://hackathon.lk"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="supporting-lecturer" className="text-xs font-bold">
                    Supporting Lecturer / Society Advisor
                  </Label>
                  <Input
                    id="supporting-lecturer"
                    placeholder="e.g. Dr. A. B. Perera (Senior Lecturer & Patron)"
                    value={supportingLecturer}
                    onChange={(e) => setSupportingLecturer(e.target.value)}
                    className="text-xs"
                  />
                </div>
              </div>

              {/* Eligibility & Prizes */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="create-eligibility" className="text-xs font-bold">
                    Eligibility Summary
                  </Label>
                  <Input
                    id="create-eligibility"
                    placeholder="e.g. All undergraduates"
                    value={eligibility}
                    onChange={(e) => setEligibility(e.target.value)}
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="create-prize" className="text-xs font-bold">
                    Prize Info
                  </Label>
                  <Input
                    id="create-prize"
                    placeholder="e.g. Rs. 500,000 Pool"
                    value={prizeInfo}
                    onChange={(e) => setPrizeInfo(e.target.value)}
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="create-teamsize" className="text-xs font-bold">
                    Team Size
                  </Label>
                  <Input
                    id="create-teamsize"
                    placeholder="e.g. Teams of 3-4, or Individual"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: Volunteering (Optional & Separate) */}
          {activeSection === "VOLUNTEERING" && (
            <div className="space-y-5 animate-in fade-in-50">
              <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="size-5 text-rose-500" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Volunteer Opportunity Configuration</h4>
                    <p className="text-xs text-muted-foreground">
                      Recruit student volunteers for organizing, coordination, technical support, and logistics.
                    </p>
                  </div>
                </div>

                {/* Primary Choice: Does this event need volunteers? */}
                <div className="rounded-lg border border-border bg-surface/50 p-4 space-y-3">
                  <Label className="text-xs font-bold text-foreground">Does this event need volunteers?</Label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setNeedsVolunteers(false)}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg border text-left transition-all",
                        !needsVolunteers
                          ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                          : "border-border text-muted-foreground hover:bg-card"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-4 shrink-0 rounded-full border items-center justify-center mt-0.5",
                          !needsVolunteers ? "border-primary bg-primary text-white" : "border-muted-foreground"
                        )}
                      >
                        {!needsVolunteers && <span className="size-1.5 rounded-full bg-white" />}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-foreground">No, this event does not need volunteers</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Regular attendees can register normally. No volunteer recruiting section will appear.
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setNeedsVolunteers(true)}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg border text-left transition-all",
                        needsVolunteers
                          ? "border-rose-500 bg-rose-500/10 text-foreground ring-1 ring-rose-500"
                          : "border-border text-muted-foreground hover:bg-card"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-4 shrink-0 rounded-full border items-center justify-center mt-0.5",
                          needsVolunteers ? "border-rose-500 bg-rose-500 text-white" : "border-muted-foreground"
                        )}
                      >
                        {needsVolunteers && <span className="size-1.5 rounded-full bg-white" />}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-foreground">Yes, configure volunteer opportunities</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Set up volunteer roles, target capacity, responsibilities, and verified certificates.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Conditional Volunteer Configuration Fields */}
                {needsVolunteers && (
                  <div className="space-y-4 pt-2 animate-in fade-in-50">
                    {/* Role Presets */}
                    <div className="space-y-2">
                      <Label className="text-xs font-bold">Select Available Volunteer Roles</Label>
                      <div className="flex flex-wrap gap-1.5">
                        {VOLUNTEER_ROLE_PRESETS.map((preset) => {
                          const isSelected = volunteerRoles.includes(preset);
                          return (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => handleToggleVolunteerRole(preset)}
                              className={cn(
                                "rounded-full px-2.5 py-1 text-xs font-semibold transition-all flex items-center gap-1",
                                isSelected
                                  ? "bg-rose-500 text-white shadow-xs"
                                  : "bg-surface border border-border text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {preset} {isSelected && "✓"}
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Role Adder */}
                      <div className="flex gap-2 pt-1">
                        <Input
                          placeholder="Add custom role (e.g. Stage Host, Livestream Operator)..."
                          value={customRoleInput}
                          onChange={(e) => setCustomRoleInput(e.target.value)}
                          className="text-xs h-8"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddCustomRole();
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddCustomRole}
                          className="text-xs h-8 shrink-0"
                        >
                          + Add Role
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Volunteer Capacity */}
                      <div className="space-y-1.5">
                        <Label htmlFor="vol-capacity" className="text-xs font-bold">
                          Volunteer Target Capacity
                        </Label>
                        <Input
                          id="vol-capacity"
                          type="number"
                          min="1"
                          placeholder="e.g. 15 student volunteers"
                          value={volunteerCapacity}
                          onChange={(e) => setVolunteerCapacity(e.target.value)}
                          className="text-xs"
                        />
                      </div>

                      {/* Availability & Commitment */}
                      <div className="space-y-1.5">
                        <Label htmlFor="vol-avail" className="text-xs font-bold">
                          Availability & Time Commitment
                        </Label>
                        <Input
                          id="vol-avail"
                          placeholder="e.g. Full day on event dates + 1 hour online briefing"
                          value={volunteerAvailability}
                          onChange={(e) => setVolunteerAvailability(e.target.value)}
                          className="text-xs"
                        />
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-1.5">
                      <Label htmlFor="vol-resp" className="text-xs font-bold">
                        Volunteer Responsibilities
                      </Label>
                      <Textarea
                        id="vol-resp"
                        placeholder="• Assist with attendee check-in and delegate passes&#10;• Guide student teams to designated arenas&#10;• Manage audio equipment and stage transitions"
                        rows={3}
                        value={volunteerResponsibilities}
                        onChange={(e) => setVolunteerResponsibilities(e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    {/* Benefits & Perks */}
                    <div className="space-y-1.5">
                      <Label htmlFor="vol-benefits" className="text-xs font-bold">
                        Volunteer Benefits & Perks
                      </Label>
                      <Textarea
                        id="vol-benefits"
                        placeholder="• Official Verified Certificate of Volunteering&#10;• Complimentary crew t-shirt and meals&#10;• Direct networking with guest speakers and industry partners"
                        rows={3}
                        value={volunteerBenefits}
                        onChange={(e) => setVolunteerBenefits(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <DialogFooter className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={submitting || availableOrgs.length === 0}
                onClick={(e) => handleSubmit(e, false)}
                className="font-bold text-xs"
              >
                {submitting ? "Saving…" : "Save as Draft"}
              </Button>

              <Button
                type="button"
                size="sm"
                disabled={submitting || availableOrgs.length === 0}
                onClick={(e) => handleSubmit(e, true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="size-4" />
                {submitting ? "Publishing…" : "Publish Event"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
