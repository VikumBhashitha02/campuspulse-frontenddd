import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Save,
  DollarSign,
  HeartHandshake,
  FileText,
  Building,
  Calendar,
  Layers,
  Music,
  Theater,
  GraduationCap,
  BookOpenCheck,
  Upload,
  Image as ImageIcon,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { eventsApi } from "@/lib/api/events";
import { directoryApi } from "@/lib/api/directory";
import type { CampusEvent, OpportunityType, EventPricingMode } from "@/lib/types";

interface EventEditTabProps {
  event: CampusEvent;
  onSaved: () => void;
}

export function EventEditTab({ event, onSaved }: EventEditTabProps) {
  const [title, setTitle] = useState(event.title);
  const [summary, setSummary] = useState(event.summary || event.shortDescription || "");
  const [description, setDescription] = useState(event.description || "");
  const [location, setLocation] = useState(event.location || "");
  const [mode, setMode] = useState<"PHYSICAL" | "ONLINE" | "HYBRID">(event.mode || "PHYSICAL");
  const [opportunityType, setOpportunityType] = useState<OpportunityType>(
    event.opportunityType || "COMPETITION"
  );
  const [startDate, setStartDate] = useState(
    event.startDate ? new Date(event.startDate).toISOString().slice(0, 10) : ""
  );
  const [endDate, setEndDate] = useState(
    event.endDate ? new Date(event.endDate).toISOString().slice(0, 10) : ""
  );
  const [deadline, setDeadline] = useState(
    event.registrationDeadline ? new Date(event.registrationDeadline).toISOString().slice(0, 10) : ""
  );
  const [capacity, setCapacity] = useState<string>(event.capacity ? String(event.capacity) : "");

  // Pricing
  const [pricingMode, setPricingMode] = useState<EventPricingMode>(
    event.pricingMode || (event.isFree ? "FREE_FOR_ALL" : "SINGLE_PRICE")
  );
  const [price, setPrice] = useState<string>(event.price ? String(event.price) : "");
  const [studentPrice, setStudentPrice] = useState<string>(
    event.studentPrice !== undefined && event.studentPrice !== null ? String(event.studentPrice) : ""
  );
  const [externalPrice, setExternalPrice] = useState<string>(
    event.externalPrice !== undefined && event.externalPrice !== null ? String(event.externalPrice) : ""
  );
  const [allowOnlineGateway, setAllowOnlineGateway] = useState<boolean>(false);
  const [allowClubTransfer, setAllowClubTransfer] = useState<boolean>(true);
  const [customPaymentInstructions, setCustomPaymentInstructions] = useState<string>(
    event.customPaymentInstructions || ""
  );

  const { data: orgDetails } = useQuery({
    queryKey: ["organization", "details", event.organizationId],
    queryFn: () => (event.organizationId ? directoryApi.organization(event.organizationId) : null),
    enabled: Boolean(event.organizationId),
  });

  // Volunteering
  const [acceptVolunteers, setAcceptVolunteers] = useState(
    Boolean(event.volunteerRoles && event.volunteerRoles.length > 0)
  );
  const [volunteerRolesInput, setVolunteerRolesInput] = useState(
    (event.volunteerRoles || []).join(", ")
  );
  const [volunteerCapacity, setVolunteerCapacity] = useState<string>(
    event.volunteerCapacity ? String(event.volunteerCapacity) : ""
  );
  const [volunteerAvailability, setVolunteerAvailability] = useState(
    event.volunteerAvailability || ""
  );

  // Category-Specific: Music & Entertainment
  const [artistNamesInput, setArtistNamesInput] = useState((event.artistNames || []).join(", "));
  const [musicGenre, setMusicGenre] = useState(event.musicGenre || "");
  const [performanceSchedule, setPerformanceSchedule] = useState(event.performanceSchedule || "");

  // Category-Specific: Drama & Performing Arts
  const [productionTitle, setProductionTitle] = useState(event.productionTitle || "");
  const [dramaGenre, setDramaGenre] = useState(event.dramaGenre || "");
  const [castMembersInput, setCastMembersInput] = useState((event.castMembers || []).join(", "));
  const [director, setDirector] = useState(event.director || "");
  const [synopsis, setSynopsis] = useState(event.synopsis || "");

  // Category-Specific: Higher Studies (MSc, PhD, Master's)
  const [programType, setProgramType] = useState(event.programType || "MSc");
  const [degreeAwarded, setDegreeAwarded] = useState(event.degreeAwarded || "");
  const [studyMode, setStudyMode] = useState(event.studyMode || "Full-Time");
  const [programDuration, setProgramDuration] = useState(event.programDuration || "");
  const [fundingType, setFundingType] = useState(event.fundingType || "Fully Funded");
  const [scholarshipDetails, setScholarshipDetails] = useState(event.scholarshipDetails || "");
  const [entryQualifications, setEntryQualifications] = useState(event.entryQualifications || "");
  const [applicationRequirements, setApplicationRequirements] = useState(event.applicationRequirements || "");
  const [intakePeriod, setIntakePeriod] = useState(event.intakePeriod || "");
  const [tuitionFee, setTuitionFee] = useState(event.tuitionFee || "");
  const [officialApplicationUrl, setOfficialApplicationUrl] = useState(event.officialApplicationUrl || "");
  const [programUrl, setProgramUrl] = useState(event.programUrl || "");

  // Category-Specific: University Courses & Professional Learning
  const [courseLevel, setCourseLevel] = useState(event.courseLevel || "Certificate");
  const [courseCode, setCourseCode] = useState(event.courseCode || "");
  const [courseDuration, setCourseDuration] = useState(event.courseDuration || "");
  const [workloadHoursPerWeek, setWorkloadHoursPerWeek] = useState(event.workloadHoursPerWeek || "");
  const [prerequisites, setPrerequisites] = useState(event.prerequisites || "");
  const [syllabus, setSyllabus] = useState(event.syllabus || "");
  const [instructor, setInstructor] = useState(event.instructor || "");
  const [hasCertificate, setHasCertificate] = useState(event.hasCertificate ?? true);
  const [enrollmentUrl, setEnrollmentUrl] = useState(event.enrollmentUrl || "");

  // Proof & Media
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [posterUrl, setPosterUrl] = useState(event.posterUrl || event.coverImageUrl || event.bannerUrl || "");
  const [coverImageUrl, setCoverImageUrl] = useState(event.coverImageUrl || event.bannerUrl || "");
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState(event.posterUrl || event.coverImageUrl || event.bannerUrl || "");
  const [isUploadingPoster, setIsUploadingPoster] = useState(false);
  const [officialEventUrl, setOfficialEventUrl] = useState(event.officialEventUrl || "");
  const [officialOrgUrl, setOfficialOrgUrl] = useState(event.officialOrgUrl || "");
  const [proofDocumentUrl, setProofDocumentUrl] = useState(event.proofDocumentUrl || "");
  const [organizerNotes, setOrganizerNotes] = useState(event.organizerNotes || "");

  const [saving, setSaving] = useState(false);

  const handlePosterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size exceeds 5MB limit. Please choose a smaller image.");
      return;
    }

    if (!file.type.match(/^image\/(png|jpeg|jpg|webp|gif|svg\+xml)$/i)) {
      toast.error("Please upload a valid image file (PNG, JPG, WEBP, GIF, SVG).");
      return;
    }

    setPosterFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPosterPreview(objectUrl);
    setPosterUrl(objectUrl);
    toast.success("New poster attached!");
  };

  const handleRemovePoster = () => {
    setPosterFile(null);
    setPosterPreview("");
    setPosterUrl("");
    setCoverImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Event title is required");
      return;
    }

    setSaving(true);
    try {
      let finalPosterUrl = posterUrl.trim();
      if (posterFile) {
        setIsUploadingPoster(true);
        try {
          const uploadRes = await eventsApi.uploadPoster(posterFile);
          finalPosterUrl = uploadRes.url;
        } catch (uploadErr: any) {
          toast.error("Failed to upload poster: " + (uploadErr?.message || "Upload error"));
          setSaving(false);
          setIsUploadingPoster(false);
          return;
        } finally {
          setIsUploadingPoster(false);
        }
      } else if (posterPreview && !posterPreview.startsWith("blob:") && !posterPreview.startsWith("data:")) {
        finalPosterUrl = posterPreview;
      }

      if (pricingMode !== "FREE_FOR_ALL" && event.status === "PUBLISHED") {
        if (!orgDetails?.bankName || !orgDetails?.bankAccountNumber) {
          toast.error("Society Bank Details Missing", {
            description: "Direct Club Bank Transfer is the only available payment method. Please configure society bank details before updating this published paid event.",
          });
          return;
        }
      }

      const isFree = pricingMode === "FREE_FOR_ALL";
      const payload: Record<string, any> = {
        title: title.trim(),
        shortDescription: summary.trim() || undefined,
        description: description.trim() || undefined,
        location: location.trim() || undefined,
        mode: mode === "PHYSICAL" ? "IN_PERSON" : mode,
        opportunityType,
        startDate: startDate ? new Date(startDate).toISOString() : undefined,
        endDate: endDate ? new Date(endDate).toISOString() : undefined,
        registrationDeadline: deadline ? new Date(deadline).toISOString() : undefined,
        capacity: capacity ? Number(capacity) : undefined,
        isFree,
        pricingMode,
        price: pricingMode === "SINGLE_PRICE" && price ? Number(price) : undefined,
        studentPrice:
          pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL" && studentPrice
            ? Number(studentPrice)
            : 0,
        externalPrice:
          pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL" && externalPrice
            ? Number(externalPrice)
            : undefined,
        allowClubTransfer: !isFree,
        allowOnlineGateway: false,
        customPaymentInstructions: !isFree ? customPaymentInstructions.trim() || undefined : undefined,
        volunteerRoles: acceptVolunteers && volunteerRolesInput
          ? volunteerRolesInput.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        volunteerCapacity: acceptVolunteers && volunteerCapacity ? Number(volunteerCapacity) : undefined,
        volunteerAvailability: acceptVolunteers && volunteerAvailability.trim() ? volunteerAvailability.trim() : undefined,
        posterUrl: finalPosterUrl || undefined,
        coverImageUrl: finalPosterUrl || undefined,
        bannerUrl: finalPosterUrl || undefined,
        officialEventUrl: officialEventUrl.trim() || undefined,
        officialOrgUrl: officialOrgUrl.trim() || undefined,
        proofDocumentUrl: proofDocumentUrl.trim() || undefined,
        organizerNotes: organizerNotes.trim() || undefined,
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

      await eventsApi.updateEvent(event.id, payload);
      toast.success("Event details updated successfully! 🎉");
      onSaved();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update event.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Layers className="size-4 text-primary" />
          General Event Information
        </h4>

        <div className="space-y-1.5">
          <Label htmlFor="edit-title">Event Title *</Label>
          <Input
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="text-xs font-semibold"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="edit-type">Event Category / Type</Label>
            <select
              id="edit-type"
              value={opportunityType}
              onChange={(e) => setOpportunityType(e.target.value as OpportunityType)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground"
            >
              <option value="COMPETITION">Competition</option>
              <option value="HACKATHON">Hackathon</option>
              <option value="MUSIC">Music & Entertainment</option>
              <option value="DRAMA">Drama & Performing Arts</option>
              <option value="HIGHER_STUDIES">Higher Studies (MSc, PhD)</option>
              <option value="UNIVERSITY_COURSE">University Course & Learning</option>
              <option value="WORKSHOP">Workshop</option>
              <option value="CONFERENCE">Conference</option>
              <option value="SEMINAR">Seminar</option>
              <option value="MOVIE">Movie Screening</option>
              <option value="SPORTS">Sports & Athletics</option>
              <option value="EXHIBITION">Exhibition & Fair</option>
              <option value="SOCIETY_EVENT">Society Event</option>
              <option value="CULTURAL_EVENT">Cultural Festival</option>
              <option value="RESEARCH">Research</option>
              <option value="CAREER">Career Fair</option>
              <option value="VOLUNTEERING">Volunteering</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-mode">Delivery Mode</Label>
            <select
              id="edit-mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground"
            >
              <option value="PHYSICAL">In-Person (Physical)</option>
              <option value="ONLINE">Online (Virtual)</option>
              <option value="HYBRID">Hybrid</option>
            </select>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="edit-location">Venue / Location</Label>
            <Input
              id="edit-location"
              placeholder="e.g. Main Auditorium, UoM"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-capacity">Max Participant Capacity</Label>
            <Input
              id="edit-capacity"
              type="number"
              placeholder="e.g. 250"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="text-xs"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="edit-start">Start Date</Label>
            <Input
              id="edit-start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-end">End Date</Label>
            <Input
              id="edit-end"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-deadline">Registration Deadline</Label>
            <Input
              id="edit-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="text-xs"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-summary">Tagline / Short Summary</Label>
          <Input
            id="edit-summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-desc">Full Description</Label>
          <Textarea
            id="edit-desc"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-xs"
          />
        </div>

        {/* Dynamic Category Panels */}
        {opportunityType === "MUSIC" && (
          <div className="rounded-xl border border-pink-500/30 bg-pink-500/5 p-4 space-y-3">
            <div className="flex items-center gap-2 text-pink-700 dark:text-pink-300 font-bold text-xs uppercase">
              <Music className="size-4" />
              <span>Music & Entertainment Settings</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="edit-music-artists" className="text-xs font-bold">Artist / Band Lineup</Label>
                <Input
                  id="edit-music-artists"
                  placeholder="e.g. Bathiya & Santhush, Daddy"
                  value={artistNamesInput}
                  onChange={(e) => setArtistNamesInput(e.target.value)}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-music-genre" className="text-xs font-bold">Music Genre</Label>
                <Input
                  id="edit-music-genre"
                  placeholder="e.g. Fusion Rock, Acoustic Pop"
                  value={musicGenre}
                  onChange={(e) => setMusicGenre(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-music-sched" className="text-xs font-bold">Performance Schedule</Label>
              <Textarea
                id="edit-music-sched"
                rows={2}
                value={performanceSchedule}
                onChange={(e) => setPerformanceSchedule(e.target.value)}
                className="text-xs"
              />
            </div>
          </div>
        )}

        {opportunityType === "DRAMA" && (
          <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-4 space-y-3">
            <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300 font-bold text-xs uppercase">
              <Theater className="size-4" />
              <span>Drama & Theatre Details</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="edit-drama-title" className="text-xs font-bold">Production Title</Label>
                <Input
                  id="edit-drama-title"
                  placeholder="e.g. Kuveni - The Revival"
                  value={productionTitle}
                  onChange={(e) => setProductionTitle(e.target.value)}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-drama-genre" className="text-xs font-bold">Theatre Genre</Label>
                <Input
                  id="edit-drama-genre"
                  placeholder="e.g. Musical Theatre, Stage Play"
                  value={dramaGenre}
                  onChange={(e) => setDramaGenre(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="edit-drama-director" className="text-xs font-bold">Director / Production Lead</Label>
                <Input
                  id="edit-drama-director"
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-drama-cast" className="text-xs font-bold">Cast Members</Label>
                <Input
                  id="edit-drama-cast"
                  value={castMembersInput}
                  onChange={(e) => setCastMembersInput(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-drama-synopsis" className="text-xs font-bold">Synopsis / Storyline</Label>
              <Textarea
                id="edit-drama-synopsis"
                rows={2}
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                className="text-xs"
              />
            </div>
          </div>
        )}

        {opportunityType === "HIGHER_STUDIES" && (
          <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4 space-y-3">
            <div className="flex items-center gap-2 text-sky-700 dark:text-sky-300 font-bold text-xs uppercase">
              <GraduationCap className="size-4" />
              <span>Higher Studies (MSc, PhD) Academic Settings</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Qualification Award</Label>
                <select
                  value={programType}
                  onChange={(e) => setProgramType(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground"
                >
                  <option value="MSc">MSc — Master of Science</option>
                  <option value="Master's">Master's Degree</option>
                  <option value="MPhil">MPhil</option>
                  <option value="PhD">PhD / Doctoral</option>
                  <option value="Postgraduate Diploma">Postgraduate Diploma</option>
                  <option value="Open Day">Postgraduate Open Day</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Degree Title</Label>
                <Input
                  value={degreeAwarded}
                  onChange={(e) => setDegreeAwarded(e.target.value)}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Funding Type</Label>
                <select
                  value={fundingType}
                  onChange={(e) => setFundingType(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground"
                >
                  <option value="Fully Funded">Fully Funded</option>
                  <option value="Partially Funded">Partially Funded</option>
                  <option value="Self-Funded">Self-Funded</option>
                  <option value="Research Assistantship">Research Assistantship</option>
                </select>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Official Application URL</Label>
                <Input
                  type="url"
                  value={officialApplicationUrl}
                  onChange={(e) => setOfficialApplicationUrl(e.target.value)}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Official Program URL</Label>
                <Input
                  type="url"
                  value={programUrl}
                  onChange={(e) => setProgramUrl(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {opportunityType === "UNIVERSITY_COURSE" && (
          <div className="rounded-xl border border-teal-500/30 bg-teal-500/5 p-4 space-y-3">
            <div className="flex items-center gap-2 text-teal-700 dark:text-teal-300 font-bold text-xs uppercase">
              <BookOpenCheck className="size-4" />
              <span>University Course & Learning Settings</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Course Level</Label>
                <select
                  value={courseLevel}
                  onChange={(e) => setCourseLevel(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground"
                >
                  <option value="Certificate">Certificate Program</option>
                  <option value="Professional Development">Professional Development</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Short Course">Short Technical Course</option>
                  <option value="Undergraduate Module">Undergraduate Module</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Course Code</Label>
                <Input
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Instructor</Label>
                <Input
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Official Enrollment URL</Label>
                <Input
                  type="url"
                  value={enrollmentUrl}
                  onChange={(e) => setEnrollmentUrl(e.target.value)}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Verified Certificate Included?</Label>
                <button
                  type="button"
                  onClick={() => setHasCertificate(!hasCertificate)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md border border-input text-xs font-semibold"
                >
                  <span>Verified Digital Certificate</span>
                  <span className={hasCertificate ? "text-teal-600 font-bold" : "text-muted-foreground"}>
                    {hasCertificate ? "✓ Yes" : "✕ No"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pricing & Ticket Configuration */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-4">
        <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
          <DollarSign className="size-4 text-primary" />
          Ticketing & University Student Pricing Mode
        </h4>

        <div className="space-y-1.5">
          <Label htmlFor="edit-pricing-mode">Pricing Mode *</Label>
          <select
            id="edit-pricing-mode"
            value={pricingMode}
            onChange={(e) => setPricingMode(e.target.value as EventPricingMode)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground"
          >
            <option value="FREE_FOR_ALL">Free for All Participants (Rs. 0)</option>
            <option value="SINGLE_PRICE">Single Fixed Price for Everyone</option>
            <option value="UNIVERSITY_STUDENT_AND_EXTERNAL">
              Tiered: Verified University Student vs External Participant
            </option>
          </select>
          <p className="text-[11px] text-muted-foreground">
            {pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL"
              ? "University students with verified .ac.lk or campus emails receive student pricing (or free access) automatically verified server-side."
              : pricingMode === "SINGLE_PRICE"
                ? "All participants pay the same admission rate."
                : "Admission is open and complimentary for everyone."}
          </p>
        </div>

        {pricingMode === "SINGLE_PRICE" && (
          <div className="space-y-1.5">
            <Label htmlFor="edit-single-price">Admission Ticket Price (Rs.)</Label>
            <Input
              id="edit-single-price"
              type="number"
              placeholder="e.g. 500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="text-xs"
            />
          </div>
        )}

        {pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5 rounded-lg bg-card/80 border border-border/80 p-3">
              <Label htmlFor="edit-student-price" className="text-emerald-700 dark:text-emerald-300 font-bold">
                Verified University Student Price (Rs.)
              </Label>
              <Input
                id="edit-student-price"
                type="number"
                placeholder="0 (Enter 0 for FREE)"
                value={studentPrice}
                onChange={(e) => setStudentPrice(e.target.value)}
                className="text-xs"
              />
              <p className="text-[10px] text-muted-foreground">
                Enter 0 if event is FREE for university students.
              </p>
            </div>

            <div className="space-y-1.5 rounded-lg bg-card/80 border border-border/80 p-3">
              <Label htmlFor="edit-external-price" className="font-bold">
                External / Non-University Price (Rs.)
              </Label>
              <Input
                id="edit-external-price"
                type="number"
                placeholder="e.g. 1500"
                value={externalPrice}
                onChange={(e) => setExternalPrice(e.target.value)}
                className="text-xs"
              />
              <p className="text-[10px] text-muted-foreground">
                Standard price for non-university public attendees.
              </p>
            </div>
          </div>
        )}

        {/* Accepted Payment Method (Paid Events) */}
        {pricingMode !== "FREE_FOR_ALL" && (
          <div className="space-y-3 pt-4 border-t border-border/60">
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

              {orgDetails?.bankAccountNumber ? (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                    ✓ Society Bank Account Configured
                  </span>
                  <div className="text-[11px] text-foreground space-y-0.5">
                    <p><span className="text-muted-foreground">Bank:</span> {orgDetails.bankName} {orgDetails.bankBranch ? `(${orgDetails.bankBranch})` : ""}</p>
                    <p><span className="text-muted-foreground">Account Name:</span> {orgDetails.bankAccountName}</p>
                    <p><span className="text-muted-foreground">Account Number:</span> <span className="font-mono font-bold">{orgDetails.bankAccountNumber}</span></p>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs">
                  <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
                    ⚠️ Society Bank Details Not Configured
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    This society has not saved its bank account number. Please update society bank instructions in Society Settings before students register for direct bank transfers.
                  </p>
                </div>
              )}

              <div className="space-y-1.5 pt-1">
                <Label htmlFor="custom-instructions-edit" className="text-xs font-bold">
                  Event-Specific Bank Transfer Instructions (Optional)
                </Label>
                <Textarea
                  id="custom-instructions-edit"
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

      {/* Volunteer Recruitment Configuration */}
      <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
            <HeartHandshake className="size-4 text-rose-500" />
            Volunteer Recruitment
          </h4>
          <label className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={acceptVolunteers}
              onChange={(e) => setAcceptVolunteers(e.target.checked)}
              className="rounded border-input text-rose-600 focus:ring-rose-500"
            />
            Accept Volunteer Applications
          </label>
        </div>

        {acceptVolunteers && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="edit-vol-roles">Available Volunteer Roles (comma-separated)</Label>
              <Input
                id="edit-vol-roles"
                placeholder="Registration Desk, Event Support, Photography, Tech Crew"
                value={volunteerRolesInput}
                onChange={(e) => setVolunteerRolesInput(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="edit-vol-cap">Volunteer Target Headcount</Label>
                <Input
                  id="edit-vol-cap"
                  type="number"
                  placeholder="e.g. 20"
                  value={volunteerCapacity}
                  onChange={(e) => setVolunteerCapacity(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-vol-avail">Time Commitment</Label>
                <Input
                  id="edit-vol-avail"
                  placeholder="e.g. Full day on event date"
                  value={volunteerAvailability}
                  onChange={(e) => setVolunteerAvailability(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Media & Verification Proof */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
          <FileText className="size-4 text-primary" />
          Event Media & Verification Proof
        </h4>

        {/* Event Poster / Cover Image Upload Section */}
        <div className="space-y-2 rounded-xl border border-border/80 bg-surface/40 p-4">
          <Label className="text-xs font-bold flex items-center gap-1.5 text-foreground">
            <ImageIcon className="size-4 text-primary" />
            Event Poster or Promotional Banner
          </Label>
          <p className="text-[11px] text-muted-foreground">
            Upload or replace the official promotional poster for this opportunity (PNG, JPG, WEBP up to 5MB).
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={handlePosterFileChange}
          />

          {posterPreview ? (
            <div className="space-y-3">
              <div className="relative rounded-lg overflow-hidden border border-border group max-w-md bg-muted">
                <img
                  src={posterPreview}
                  alt="Poster Preview"
                  className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="text-xs gap-1 h-8 shadow-sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <RefreshCw className="size-3.5" /> Replace Poster
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="text-xs gap-1 h-8 shadow-sm"
                    onClick={handleRemovePoster}
                  >
                    <Trash2 className="size-3.5" /> Remove
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs gap-1.5 h-8"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="size-3.5" />
                  Choose Different Image File
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs text-destructive hover:bg-destructive/10 h-8"
                  onClick={handleRemovePoster}
                >
                  Remove Poster
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
              <p className="text-[10px] text-muted-foreground mt-0.5">Recommended resolution: 1200 × 675 px (16:9)</p>
            </div>
          )}

          <div className="pt-2">
            <Label htmlFor="edit-poster" className="text-[11px] font-semibold text-muted-foreground">
              Or paste direct image URL:
            </Label>
            <Input
              id="edit-poster"
              placeholder="https://... image link"
              value={posterUrl}
              onChange={(e) => {
                setPosterUrl(e.target.value);
                setPosterPreview(e.target.value);
                setPosterFile(null);
              }}
              className="text-xs mt-1"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">

          <div className="space-y-1.5">
            <Label htmlFor="edit-official-url">Official Event Website URL</Label>
            <Input
              id="edit-official-url"
              placeholder="https://event.society.lk"
              value={officialEventUrl}
              onChange={(e) => setOfficialEventUrl(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-org-url">Official Organization / Social Portal</Label>
            <Input
              id="edit-org-url"
              placeholder="https://facebook.com/... or society portal"
              value={officialOrgUrl}
              onChange={(e) => setOfficialOrgUrl(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-proof-doc">Supporting Proof / Endorsement Doc URL</Label>
            <Input
              id="edit-proof-doc"
              placeholder="https://docs.google.com/... or university circular"
              value={proofDocumentUrl}
              onChange={(e) => setProofDocumentUrl(e.target.value)}
              className="text-xs"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-notes">Organizer Notes for Moderation Team</Label>
          <Textarea
            id="edit-notes"
            rows={2}
            placeholder="Additional context, committee contact, or proof explanations..."
            value={organizerNotes}
            onChange={(e) => setOrganizerNotes(e.target.value)}
            className="text-xs"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit" disabled={saving} className="bg-navy text-white hover:bg-navy/90 font-bold gap-2">
          <Save className="size-4" />
          {saving ? "Saving Changes…" : "Save Event Details"}
        </Button>
      </div>
    </form>
  );
}
