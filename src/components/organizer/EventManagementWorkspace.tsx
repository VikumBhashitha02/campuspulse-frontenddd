import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Layers,
  Users,
  HeartHandshake,
  Ticket,
  QrCode,
  Clock,
  ShieldCheck,
  Flag,
  Settings,
  ArrowLeft,
  ExternalLink,
  Edit,
  Send,
  XCircle,
  Building,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { eventsApi } from "@/lib/api/events";
import { StatusBadge, OrgAvatar } from "@/components/common/Badges";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CampusEvent } from "@/lib/types";
import { EventParticipantsTab } from "./EventParticipantsTab";
import { EventCheckInsTab } from "./EventCheckInsTab";
import { EventProofTab } from "./EventProofTab";
import { EventReportsTab } from "./EventReportsTab";
import { EventEditTab } from "./EventEditTab";
import { AttendeeTicketScannerDialog } from "./AttendeeTicketScannerDialog";

interface EventManagementWorkspaceProps {
  eventId: string;
  onBack: () => void;
  onOpenVolunteersModal?: (event: CampusEvent) => void;
}

type ManagementTab =
  | "OVERVIEW"
  | "PARTICIPANTS"
  | "VOLUNTEERS"
  | "TICKETS"
  | "SCANNER"
  | "CHECK_INS"
  | "PROOF"
  | "REPORTS"
  | "SETTINGS";

export function EventManagementWorkspace({
  eventId,
  onBack,
  onOpenVolunteersModal,
}: EventManagementWorkspaceProps) {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<ManagementTab>("OVERVIEW");
  const [scannerOpen, setScannerOpen] = useState(false);

  const query = useQuery({
    queryKey: ["events", "manage", eventId],
    queryFn: () => eventsApi.getEventManage(eventId),
  });

  const event: CampusEvent | null = query.data?.event || null;
  const stats = query.data?.stats || {
    totalRegistrations: 0,
    totalCheckedIn: 0,
    totalVolunteers: 0,
    openReports: 0,
  };

  const handlePublish = async () => {
    if (!event) return;
    try {
      await eventsApi.publishEvent(event.id);
      toast.success(`Published "${event.title}" successfully! 🚀`, {
        description: "Your event is now live and discoverable across CampusPulse.",
      });
      void query.refetch();
      void queryClient.invalidateQueries({ queryKey: ["organizer", "events"] });
      void queryClient.invalidateQueries({ queryKey: ["events"] });
      void queryClient.invalidateQueries({ queryKey: ["feed"] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to publish event.");
    }
  };

  const handleCancelEvent = async () => {
    if (!event) return;
    if (!confirm(`Are you sure you want to cancel the event "${event.title}"?`)) return;
    try {
      await eventsApi.updateEvent(event.id, { status: "CANCELLED" });
      toast.success("Event status updated to CANCELLED");
      void query.refetch();
      void queryClient.invalidateQueries({ queryKey: ["organizer", "events"] });
      void queryClient.invalidateQueries({ queryKey: ["events"] });
    } catch (err: any) {
      toast.error(err?.message || "Failed to update event status.");
    }
  };

  if (query.isPending) {
    return (
      <div className="p-12 text-center text-muted-foreground bg-card rounded-xl border border-border">
        Loading event management workspace...
      </div>
    );
  }

  if (query.isError || !event) {
    return (
      <div className="p-8 text-center bg-card rounded-xl border border-border space-y-4">
        <p className="text-sm text-destructive font-semibold">
          Could not load event management workspace.
        </p>
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="size-4" /> Back to My Events
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in-50">
      {/* Top Header Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-xs font-bold gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
          >
            <ArrowLeft className="size-4" />
            Back to My Events
          </Button>

          <div className="flex flex-wrap items-center gap-2">
            {event.status === "DRAFT" && (
              <Button
                size="sm"
                onClick={handlePublish}
                className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="size-3.5" />
                Publish Event
              </Button>
            )}
            {event.status !== "CANCELLED" && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelEvent}
                className="text-xs font-semibold text-destructive hover:bg-destructive/10 border-destructive/30"
              >
                Cancel Event
              </Button>
            )}
            <Button asChild variant="outline" size="sm" className="text-xs font-semibold gap-1.5">
              <Link to="/events/$slug" params={{ slug: event.slug }} target="_blank">
                <ExternalLink className="size-3.5" />
                Public Page
              </Link>
            </Button>
            <Button
              size="sm"
              onClick={() => setScannerOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold gap-1.5"
            >
              <QrCode className="size-4" />
              Open QR Scanner
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start gap-4 pt-2">
          {event.posterUrl ? (
            <img
              src={event.posterUrl}
              alt={event.title}
              className="size-20 rounded-xl object-cover border border-border shrink-0"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <OrgAvatar initials={event.organizationInitials} className="size-16 rounded-xl shrink-0" />
          )}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-black text-foreground">{event.title}</h2>
              <StatusBadge status={event.status} />

              {event.eventVerificationStatus === "VERIFIED" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="size-3" />
                  Verified
                </span>
              )}
              {event.eventVerificationStatus === "PENDING_REVIEW" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  <Clock className="size-3" />
                  Verification Pending
                </span>
              )}
              {event.eventVerificationStatus === "FLAGGED" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[11px] font-bold text-rose-700 dark:text-rose-300 border border-rose-500/30">
                  <AlertCircle className="size-3" />
                  Under Review
                </span>
              )}
            </div>

            <p className="text-xs text-muted-foreground mt-1">
              {event.organizationName} · {event.universityName} · {event.opportunityType || "General"} · {event.location}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-border pb-1 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("OVERVIEW")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0",
            activeTab === "OVERVIEW"
              ? "bg-navy text-white"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <Layers className="size-4" />
          Overview
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("PARTICIPANTS")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0",
            activeTab === "PARTICIPANTS"
              ? "bg-navy text-white"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <Users className="size-4" />
          Participants ({stats.totalRegistrations})
        </button>

        <button
          type="button"
          onClick={() => {
            if (onOpenVolunteersModal) {
              onOpenVolunteersModal(event);
            } else {
              setActiveTab("VOLUNTEERS");
            }
          }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0",
            activeTab === "VOLUNTEERS"
              ? "bg-navy text-white"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <HeartHandshake className="size-4 text-rose-500" />
          Volunteers ({stats.totalVolunteers})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("TICKETS")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0",
            activeTab === "TICKETS"
              ? "bg-navy text-white"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <Ticket className="size-4" />
          Tickets & Pricing
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("CHECK_INS")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0",
            activeTab === "CHECK_INS"
              ? "bg-navy text-white"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <Clock className="size-4 text-emerald-500" />
          Check-In History ({stats.totalCheckedIn})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("PROOF")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0",
            activeTab === "PROOF"
              ? "bg-navy text-white"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <ShieldCheck className="size-4 text-primary" />
          Event Proof & Status
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("REPORTS")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0",
            activeTab === "REPORTS"
              ? "bg-navy text-white"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <Flag className="size-4 text-rose-500" />
          Reports ({stats.openReports})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("SETTINGS")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0",
            activeTab === "SETTINGS"
              ? "bg-navy text-white"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <Settings className="size-4" />
          Edit & Settings
        </button>
      </div>

      {/* TAB CONTENT: Overview */}
      {activeTab === "OVERVIEW" && (
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Users className="size-4 text-primary" />
                Registrations
              </span>
              <p className="text-2xl font-black text-foreground mt-2">{stats.totalRegistrations}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Cap: {event.capacity ? event.capacity : "Unlimited"}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 shadow-sm">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <QrCode className="size-4" />
                Checked In
              </span>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-2">
                {stats.totalCheckedIn}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {stats.totalRegistrations > 0
                  ? `${Math.round((stats.totalCheckedIn / stats.totalRegistrations) * 100)}% Turnout`
                  : "0% Turnout"}
              </p>
            </div>

            <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 shadow-sm">
              <span className="text-xs font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                <HeartHandshake className="size-4" />
                Volunteers
              </span>
              <p className="text-2xl font-black text-rose-700 dark:text-rose-300 mt-2">
                {stats.totalVolunteers}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {event.volunteerCapacity ? `Goal: ${event.volunteerCapacity}` : "Active crew"}
              </p>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 shadow-sm">
              <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
                <Ticket className="size-4" />
                Ticket Mode
              </span>
              <p className="text-sm font-black text-foreground mt-2 truncate">
                {event.pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL"
                  ? "Student vs External"
                  : event.pricingMode === "SINGLE_PRICE"
                    ? `Rs. ${event.price || 0}`
                    : "Free for All"}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {event.revenue ? `Rev: Rs. ${event.revenue.toLocaleString()}` : "Free Admission"}
              </p>
            </div>
          </div>

          {/* Event Details Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <h4 className="text-sm font-bold text-foreground">Event Schedule & Location</h4>
              <dl className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">Start Date & Time</dt>
                  <dd className="font-semibold text-foreground">{formatDate(event.startDate)}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">End Date</dt>
                  <dd className="font-semibold text-foreground">{formatDate(event.endDate)}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">Registration Closes</dt>
                  <dd className="font-semibold text-foreground">
                    {formatDate(event.registrationDeadline)}
                  </dd>
                </div>
                <div className="flex justify-between py-1">
                  <dt className="text-muted-foreground">Venue</dt>
                  <dd className="font-semibold text-foreground">{event.location}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <h4 className="text-sm font-bold text-foreground">Organizing Institution</h4>
              <dl className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">Society / Club</dt>
                  <dd className="font-semibold text-foreground">{event.organizationName}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">Host University</dt>
                  <dd className="font-semibold text-foreground">{event.universityName}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">Verification</dt>
                  <dd className="font-semibold capitalize text-foreground">
                    {event.eventVerificationStatus?.toLowerCase().replace(/_/g, " ") || "Pending"}
                  </dd>
                </div>
                <div className="flex justify-between py-1">
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="font-semibold text-foreground">{event.categoryName}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Participants */}
      {activeTab === "PARTICIPANTS" && (
        <EventParticipantsTab eventId={event.id} eventTitle={event.title} />
      )}

      {/* TAB CONTENT: Check-In History */}
      {activeTab === "CHECK_INS" && (
        <EventCheckInsTab
          eventId={event.id}
          eventTitle={event.title}
          onOpenScanner={() => setScannerOpen(true)}
        />
      )}

      {/* TAB CONTENT: Tickets & Pricing */}
      {activeTab === "TICKETS" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Ticket className="size-4 text-primary" />
              Ticketing & University Pricing Configuration
            </h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-surface border border-border p-3">
                <span className="text-[10px] font-bold uppercase text-muted-foreground block">
                  Pricing Mode
                </span>
                <p className="text-sm font-bold text-foreground mt-1">
                  {event.pricingMode?.replace(/_/g, " ") || "FREE FOR ALL"}
                </p>
              </div>

              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3">
                <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-300 block">
                  Verified University Student Rate
                </span>
                <p className="text-sm font-black text-emerald-700 dark:text-emerald-300 mt-1">
                  {event.studentPrice && Number(event.studentPrice) > 0
                    ? `Rs. ${Number(event.studentPrice).toLocaleString()}`
                    : "FREE (Complimentary)"}
                </p>
              </div>

              <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                <span className="text-[10px] font-bold uppercase text-primary block">
                  External Participant Rate
                </span>
                <p className="text-sm font-black text-primary mt-1">
                  {event.externalPrice
                    ? `Rs. ${Number(event.externalPrice).toLocaleString()}`
                    : event.price
                      ? `Rs. ${Number(event.price).toLocaleString()}`
                      : "FREE"}
                </p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              * CampusPulse calculates ticket prices server-side upon registration based on the attendee's verified university email. External participants pay the standard external ticket price.
            </p>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Proof */}
      {activeTab === "PROOF" && <EventProofTab event={event} />}

      {/* TAB CONTENT: Reports */}
      {activeTab === "REPORTS" && <EventReportsTab eventId={event.id} eventTitle={event.title} />}

      {/* TAB CONTENT: Settings / Edit */}
      {activeTab === "SETTINGS" && (
        <EventEditTab event={event} onSaved={() => void query.refetch()} />
      )}

      {/* Door Scanner Modal */}
      <AttendeeTicketScannerDialog
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        eventId={event.id}
        eventTitle={event.title}
        onCheckInSuccess={() => {
          void query.refetch();
          void queryClient.invalidateQueries({ queryKey: ["events", "checkins", event.id] });
          void queryClient.invalidateQueries({ queryKey: ["events", "participants", event.id] });
        }}
      />
    </div>
  );
}
