import React, { useState, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  QrCode as QrCodeIcon,
  CheckCircle2,
  AlertCircle,
  Clock,
  Copy,
  Users,
  CreditCard,
  Building,
  ShieldCheck,
  XCircle,
  Ticket,
  Camera,
  CameraOff,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import jsQR from "jsqr";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { eventsApi } from "@/lib/api/events";
import { participationApi } from "@/lib/api/participation";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

interface AttendeeTicketScannerDialogProps {
  open: boolean;
  onClose: () => void;
  eventId?: string | undefined;
  eventTitle?: string | undefined;
  onCheckInSuccess?: (() => void) | undefined;
}

export function AttendeeTicketScannerDialog({
  open,
  onClose,
  eventId,
  eventTitle,
  onCheckInSuccess,
}: AttendeeTicketScannerDialogProps) {
  const queryClient = useQueryClient();
  const [tokenInput, setTokenInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState<"environment" | "user">("environment");
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Result state
  const [scanResult, setScanResult] = useState<{
    status: "VALID" | "ALREADY_CHECKED_IN" | "INVALID" | "EVENT_MISMATCH" | "CANCELLED" | "UNPAID" | "CHECKED_IN";
    message: string;
    participant?: any;
    ticket?: any;
    attendance?: any;
    event?: any;
  } | null>(null);

  // Start / stop camera
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();
        setIsCameraActive(true);
        startScanningFrames();
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      let msg = "Could not access device camera.";
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        msg = "Camera permission was denied. Please allow camera permissions in your browser settings.";
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        msg = "No camera found on this device.";
      }
      setCameraError(msg);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const toggleCamera = () => {
    setCameraFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  useEffect(() => {
    if (isCameraActive) {
      startCamera();
    }
  }, [cameraFacingMode]);

  // QR code scanning loop
  const startScanningFrames = () => {
    const scanLoop = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          if (ctx) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: "dontInvert",
            });

            if (code && code.data && code.data.trim()) {
              const scannedText = code.data.trim();
              if (scannedText !== tokenInput) {
                setTokenInput(scannedText);
                stopCamera();
                handleProcessToken(scannedText, "VALIDATE");
                return;
              }
            }
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(scanLoop);
    };

    animFrameRef.current = requestAnimationFrame(scanLoop);
  };

  useEffect(() => {
    if (!open) {
      stopCamera();
      setScanResult(null);
      setTokenInput("");
      setNotesInput("");
    }
    return () => {
      stopCamera();
    };
  }, [open]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setTokenInput(text.trim());
        toast.success("Token pasted from clipboard");
      }
    } catch {
      toast.error("Please paste token manually into the input box");
    }
  };

  const handleProcessToken = async (customToken?: string, action: "VALIDATE" | "CHECK_IN" = "VALIDATE") => {
    const tok = (customToken || tokenInput).trim();
    if (!tok) {
      toast.error("Please enter or scan an attendee QR token");
      return;
    }

    if (action === "VALIDATE") {
      setIsValidating(true);
    } else {
      setIsCheckingIn(true);
    }
    setScanResult(null);

    try {
      if (eventId) {
        // Strict door check-in for specific event
        const res: any = await eventsApi.scanTicket(eventId, {
          qrToken: tok,
          action,
          notes: notesInput.trim() || undefined,
        });

        setScanResult(res);

        if (res.status === "VALID") {
          toast.success("Ticket verified as VALID! 🎟️", {
            description: `Pass: ${res.ticket?.ticketNumber} (${res.participant?.name || "Attendee"})`,
          });
        } else if (res.status === "CHECKED_IN") {
          toast.success("Check-In recorded successfully! 🎉", {
            description: `${res.participant?.name || "Attendee"} admitted.`,
          });
          onCheckInSuccess?.();
          if (eventId) {
            void queryClient.invalidateQueries({ queryKey: ["events", "participants", eventId] });
            void queryClient.invalidateQueries({ queryKey: ["events", "checkins", eventId] });
            void queryClient.invalidateQueries({ queryKey: ["events", "check-ins", eventId] });
            void queryClient.invalidateQueries({ queryKey: ["events", "manage", eventId] });
            void queryClient.invalidateQueries({ queryKey: ["events", "management", eventId] });
          }
          void queryClient.invalidateQueries({ queryKey: ["organizer", "analytics"] });
          void queryClient.invalidateQueries({ queryKey: ["organizer", "events"] });
        } else if (res.status === "ALREADY_CHECKED_IN") {
          toast.warning("Attendee ALREADY checked in!", {
            description: `Checked in on ${formatDate(res.attendance?.checkInTime)}`,
          });
        } else if (res.status === "EVENT_MISMATCH") {
          toast.error("Ticket belongs to a DIFFERENT event!", {
            description: res.message || "This pass cannot be used for this event.",
          });
        } else {
          toast.error(res.message || "Invalid ticket.");
        }
      } else {
        // Fallback global participation API
        const res: any = await participationApi.validateTicketQr(tok);
        const mappedStatus = res.isValid ? (res.ticket?.status === "USED" ? "ALREADY_CHECKED_IN" : "VALID") : "INVALID";
        setScanResult({
          status: mappedStatus,
          message: res.rejectionReason || (res.isValid ? "Valid admission pass" : "Invalid ticket"),
          participant: res.user,
          ticket: res.ticket,
          attendance: res.attendance,
          event: res.event,
        });
        if (res.isValid) {
          toast.success("Ticket verified as VALID! 🎟️");
        } else {
          toast.error("Ticket is NOT valid", { description: res.rejectionReason });
        }
      }
    } catch (err: any) {
      toast.error("Scan verification failed", {
        description: err?.message || "Invalid or unguessable token.",
      });
      setScanResult({
        status: "INVALID",
        message: err?.message || "Invalid or unverified token.",
      });
    } finally {
      setIsValidating(false);
      setIsCheckingIn(false);
    }
  };

  const handleConfirmCheckIn = () => {
    handleProcessToken(tokenInput, "CHECK_IN");
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl bg-card border-border shadow-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary mb-1">
            <QrCodeIcon className="size-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Door Scanner & Check-In Desk
            </span>
          </div>
          <DialogTitle className="text-lg font-black">Scan / Check-In Attendee Ticket</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {eventTitle
              ? `Authorized door check-in for "${eventTitle}"`
              : "Scan or enter attendee QR tokens to verify admission and record attendance."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Camera Scanner Viewport */}
          <div className="rounded-xl border border-border bg-slate-950 p-3 text-white overflow-hidden relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold flex items-center gap-1.5 text-slate-300">
                <Camera className="size-3.5 text-amber-400" />
                Live Camera Scanner
              </span>
              <div className="flex items-center gap-1.5">
                {isCameraActive && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={toggleCamera}
                    className="h-7 px-2 text-[11px] text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    <RefreshCw className="size-3 mr-1" />
                    Flip
                  </Button>
                )}
                <Button
                  type="button"
                  variant={isCameraActive ? "destructive" : "secondary"}
                  size="sm"
                  onClick={isCameraActive ? stopCamera : startCamera}
                  className="h-7 px-2.5 text-xs font-semibold"
                >
                  {isCameraActive ? (
                    <>
                      <CameraOff className="size-3 mr-1" /> Stop Camera
                    </>
                  ) : (
                    <>
                      <Camera className="size-3 mr-1" /> Open Camera
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Video Viewport */}
            <div className="relative aspect-video w-full rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                className={cn("w-full h-full object-cover", !isCameraActive && "hidden")}
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Scanning Target Overlay */}
              {isCameraActive && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-dashed border-amber-400/80 rounded-xl relative shadow-[0_0_15px_rgba(251,191,36,0.3)] animate-pulse">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-400" />
                  </div>
                  <span className="absolute bottom-3 text-[11px] font-medium text-amber-300/90 bg-slate-950/70 px-2 py-0.5 rounded-full">
                    Point camera at attendee QR code
                  </span>
                </div>
              )}

              {!isCameraActive && (
                <div className="text-center p-6 space-y-2">
                  <div className="mx-auto size-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400">
                    <QrCodeIcon className="size-6" />
                  </div>
                  <p className="text-xs text-slate-300 font-medium">Camera is inactive</p>
                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                    Click "Open Camera" to scan passes directly using your device webcam or phone camera.
                  </p>
                </div>
              )}
            </div>

            {cameraError && (
              <div className="mt-2 rounded-lg bg-red-950/60 border border-red-800/60 p-2 text-xs text-red-300 flex items-start gap-2">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <span>{cameraError}</span>
              </div>
            )}
          </div>

          {/* Manual Input Section */}
          <div className="space-y-1.5">
            <Label htmlFor="attendee-qr-token" className="text-xs font-semibold">
              Attendee Secure QR Token / Reference
            </Label>
            <div className="flex gap-2">
              <Input
                id="attendee-qr-token"
                placeholder="Scan or paste token (e.g. cptok_tkt_...)"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="font-mono text-xs"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleProcessToken(tokenInput, "VALIDATE");
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePaste}
                className="shrink-0 text-xs gap-1"
              >
                <Copy className="size-3.5" />
                Paste
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => handleProcessToken(tokenInput, "VALIDATE")}
                disabled={isValidating || isCheckingIn || !tokenInput.trim()}
                className="shrink-0 text-xs bg-navy text-white hover:bg-navy/90 font-semibold"
              >
                {isValidating ? "Validating…" : "Validate"}
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Opaque tokens are server-verified against event ID, tickets, and payment status.
            </p>
          </div>

          {/* Scan Result Card */}
          {scanResult && (
            <div
              className={cn(
                "rounded-xl border-2 p-4 space-y-3 animate-in fade-in-50",
                scanResult.status === "VALID" && "border-emerald-500/40 bg-emerald-500/5",
                scanResult.status === "CHECKED_IN" && "border-emerald-600/50 bg-emerald-600/10",
                scanResult.status === "ALREADY_CHECKED_IN" && "border-amber-500/40 bg-amber-500/5",
                scanResult.status === "EVENT_MISMATCH" && "border-red-500/50 bg-red-500/10",
                (scanResult.status === "INVALID" || scanResult.status === "CANCELLED" || scanResult.status === "UNPAID") &&
                  "border-destructive/40 bg-destructive/5"
              )}
            >
              {/* Header result row */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-foreground">
                      {scanResult.participant?.name || "Participant"}
                    </span>
                    {scanResult.status === "VALID" && (
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="size-3" />
                        VALID FOR ENTRY
                      </span>
                    )}
                    {scanResult.status === "CHECKED_IN" && (
                      <span className="rounded-full bg-emerald-600/20 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-600/40 flex items-center gap-1">
                        <Sparkles className="size-3" />
                        CHECK-IN SUCCESSFUL
                      </span>
                    )}
                    {scanResult.status === "ALREADY_CHECKED_IN" && (
                      <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Clock className="size-3" />
                        ALREADY CHECKED IN
                      </span>
                    )}
                    {scanResult.status === "EVENT_MISMATCH" && (
                      <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400 border border-red-500/40 flex items-center gap-1">
                        <XCircle className="size-3" />
                        WRONG EVENT
                      </span>
                    )}
                    {scanResult.status === "INVALID" && (
                      <span className="rounded-full bg-destructive/20 px-2 py-0.5 text-[10px] font-bold text-destructive border border-destructive/30 flex items-center gap-1">
                        <XCircle className="size-3" />
                        INVALID TICKET
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {scanResult.participant?.email || "Attendee"} ·{" "}
                    {scanResult.participant?.university || "CampusPulse User"}
                  </p>
                </div>

                {scanResult.ticket?.ticketType && (
                  <span className="rounded-full px-2.5 py-0.5 text-xs font-bold uppercase border bg-card text-foreground border-border shrink-0">
                    {scanResult.ticket.ticketType.replace(/_/g, " ")}
                  </span>
                )}
              </div>

              {/* Status Message / Warnings */}
              {scanResult.message && (
                <div
                  className={cn(
                    "rounded-lg p-2.5 text-xs flex items-center gap-2",
                    scanResult.status === "VALID" || scanResult.status === "CHECKED_IN"
                      ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
                      : scanResult.status === "ALREADY_CHECKED_IN"
                        ? "bg-amber-500/10 text-amber-800 dark:text-amber-300"
                        : "bg-destructive/10 text-destructive"
                  )}
                >
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{scanResult.message}</span>
                </div>
              )}

              {/* Ticket details grid */}
              {scanResult.ticket && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs rounded-lg border border-border/60 bg-card p-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-muted-foreground block">
                      Ticket No
                    </span>
                    <span className="font-mono font-bold text-foreground">
                      {scanResult.ticket.ticketNumber || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-muted-foreground block">
                      Price / Eligibility
                    </span>
                    <span className="text-foreground font-semibold">
                      {scanResult.ticket.ticketPrice ? `Rs. ${scanResult.ticket.ticketPrice}` : "FREE"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-muted-foreground block">
                      Payment
                    </span>
                    <span className="text-foreground capitalize">
                      {scanResult.participant?.paymentStatus?.toLowerCase() || "Verified"}
                    </span>
                  </div>
                  {scanResult.attendance?.checkInTime && (
                    <div className="col-span-2 sm:col-span-3 pt-1 border-t border-border/50">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground block">
                        Checked-In Record
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {formatDate(scanResult.attendance.checkInTime)}
                        {scanResult.attendance.checkedInBy?.name
                          ? ` (by ${scanResult.attendance.checkedInBy.name})`
                          : ""}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Check-In Notes & Action */}
              {scanResult.status === "VALID" && (
                <div className="space-y-2 pt-1">
                  <div className="space-y-1">
                    <Label htmlFor="checkin-notes" className="text-[11px] font-semibold text-muted-foreground">
                      Gate / Desk Notes (Optional)
                    </Label>
                    <Input
                      id="checkin-notes"
                      placeholder="e.g. Main Gate, Kit Provided, Badge Given..."
                      value={notesInput}
                      onChange={(e) => setNotesInput(e.target.value)}
                      className="text-xs h-8"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={handleConfirmCheckIn}
                    disabled={isCheckingIn}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 text-sm"
                  >
                    <CheckCircle2 className="size-4" />
                    {isCheckingIn ? "Recording Door Admission…" : "Confirm Door Admission & Check-In"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={onClose}>
            Close Scanner
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
