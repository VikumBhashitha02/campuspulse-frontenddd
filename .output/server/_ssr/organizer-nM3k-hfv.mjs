import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./auth-BjpYPorg.mjs";
import { n as cn, t as Button } from "./button-Dw0VHwRC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as LoaderCircle, A as Save, B as Pen, C as ShieldCheck, Cn as ArrowLeft, Ct as FileText, Dt as Eye, E as Settings, Ft as Crown, G as MessageSquare, Gt as CirclePlus, H as MousePointerClick, It as CreditCard, J as MapPin, Kt as CircleCheck, L as Plus, M as RefreshCw, O as Send, P as QrCode, Pt as DollarSign, Q as Lock, R as Percent, Rt as Copy, Sn as ArrowRight, V as Music, Vt as Clock, Wt as CircleX, Y as Mail, an as Calendar, at as Layers, c as Upload, ct as Info, d as TriangleAlert, en as Check, f as Trash2, gt as Globe, ht as GraduationCap, i as User, in as CameraOff, k as Search, kt as ExternalLink, ln as Building, m as Theater, mn as BookOpenCheck, nn as ChartColumn, o as UserPlus, p as Ticket, pt as HeartHandshake, qt as CircleAlert, r as Users, rn as Camera, s as UserCheck, st as Instagram, un as Building2, ut as Image, vt as Funnel, xt as Flag, y as Sparkles, yn as Award, z as Pencil } from "../_libs/lucide-react.mjs";
import { t as RequireRole } from "./RequireRole-B_6p3mjK.mjs";
import { t as eventsApi } from "./events-Dtjwkx07.mjs";
import { a as PageHeader, n as EmptyState, o as RowSkeleton, r as ErrorState, s as StatCard } from "./States-DTPgRZKE.mjs";
import { i as formatDate, n as conversionRate, t as compactNumber } from "./format-Cdcdxizs.mjs";
import { c as StatusBadge, o as OrgAvatar } from "./Badges-Bz6vmcNI.mjs";
import { t as Input } from "./input-BZsbFwzQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CeXuDfGc.mjs";
import { t as participationApi } from "./participation-B-nOVH-I.mjs";
import { t as directoryApi } from "./directory-BaY2c_G3.mjs";
import { t as Label } from "./label-Bi14Oc-S.mjs";
import { t as Textarea } from "./textarea-7zknwcEV.mjs";
import { t as volunteeringApi } from "./volunteering-BxJ-nXuA.mjs";
import { t as require_jsQR } from "../_libs/jsqr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/organizer-nM3k-hfv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_jsQR = /* @__PURE__ */ __toESM(require_jsQR());
function AttendeeTicketScannerDialog({ open, onClose, eventId, eventTitle, onCheckInSuccess }) {
	const queryClient = useQueryClient();
	const [tokenInput, setTokenInput] = (0, import_react.useState)("");
	const [notesInput, setNotesInput] = (0, import_react.useState)("");
	const [isValidating, setIsValidating] = (0, import_react.useState)(false);
	const [isCheckingIn, setIsCheckingIn] = (0, import_react.useState)(false);
	const [isCheckingOut, setIsCheckingOut] = (0, import_react.useState)(false);
	const [isCameraActive, setIsCameraActive] = (0, import_react.useState)(false);
	const [cameraFacingMode, setCameraFacingMode] = (0, import_react.useState)("environment");
	const [cameraError, setCameraError] = (0, import_react.useState)(null);
	const videoRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const animFrameRef = (0, import_react.useRef)(null);
	const [scanResult, setScanResult] = (0, import_react.useState)(null);
	const startCamera = async () => {
		setCameraError(null);
		try {
			if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop());
			const stream = await navigator.mediaDevices.getUserMedia({ video: {
				facingMode: cameraFacingMode,
				width: { ideal: 1280 },
				height: { ideal: 720 }
			} });
			streamRef.current = stream;
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				videoRef.current.setAttribute("playsinline", "true");
				await videoRef.current.play();
				setIsCameraActive(true);
				startScanningFrames();
			}
		} catch (err) {
			console.error("Camera access error:", err);
			let msg = "Could not access device camera.";
			if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") msg = "Camera permission was denied. Please allow camera permissions in your browser settings.";
			else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") msg = "No camera found on this device.";
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
		setCameraFacingMode((prev) => prev === "environment" ? "user" : "environment");
	};
	(0, import_react.useEffect)(() => {
		if (isCameraActive) startCamera();
	}, [cameraFacingMode]);
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
						const code = (0, import_jsQR.default)(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });
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
	(0, import_react.useEffect)(() => {
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
	const handleProcessToken = async (customToken, action = "VALIDATE") => {
		const tok = (customToken || tokenInput).trim();
		if (!tok) {
			toast.error("Please enter or scan an attendee QR token");
			return;
		}
		if (action === "VALIDATE") setIsValidating(true);
		else setIsCheckingIn(true);
		setScanResult(null);
		try {
			if (eventId) {
				const res = await eventsApi.scanTicket(eventId, {
					qrToken: tok,
					action,
					notes: notesInput.trim() || void 0
				});
				setScanResult(res);
				if (res.status === "VALID") toast.success("Ticket verified as VALID! 🎟️", { description: `Pass: ${res.ticket?.ticketNumber} (${res.participant?.name || "Attendee"})` });
				else if (res.status === "CHECKED_IN") {
					toast.success("Check-In recorded successfully! 🎉", { description: `${res.participant?.name || "Attendee"} admitted.` });
					onCheckInSuccess?.();
					if (eventId) {
						queryClient.invalidateQueries({ queryKey: [
							"events",
							"participants",
							eventId
						] });
						queryClient.invalidateQueries({ queryKey: [
							"events",
							"checkins",
							eventId
						] });
						queryClient.invalidateQueries({ queryKey: [
							"events",
							"check-ins",
							eventId
						] });
						queryClient.invalidateQueries({ queryKey: [
							"events",
							"manage",
							eventId
						] });
						queryClient.invalidateQueries({ queryKey: [
							"events",
							"management",
							eventId
						] });
					}
					queryClient.invalidateQueries({ queryKey: ["organizer", "analytics"] });
					queryClient.invalidateQueries({ queryKey: ["organizer", "events"] });
				} else if (res.status === "ALREADY_CHECKED_IN") toast.warning("Attendee ALREADY checked in!", { description: `Checked in on ${formatDate(res.attendance?.checkInTime)}` });
				else if (res.status === "EVENT_MISMATCH") toast.error("Ticket belongs to a DIFFERENT event!", { description: res.message || "This pass cannot be used for this event." });
				else toast.error(res.message || "Invalid ticket.");
			} else {
				const res = await participationApi.validateTicketQr(tok);
				const mappedStatus = res.isValid ? res.ticket?.status === "USED" ? "ALREADY_CHECKED_IN" : "VALID" : "INVALID";
				setScanResult({
					status: mappedStatus,
					message: res.rejectionReason || (res.isValid ? "Valid admission pass" : "Invalid ticket"),
					participant: res.user,
					ticket: res.ticket,
					attendance: res.attendance,
					event: res.event
				});
				if (res.isValid) toast.success("Ticket verified as VALID! 🎟️");
				else toast.error("Ticket is NOT valid", { description: res.rejectionReason });
			}
		} catch (err) {
			toast.error("Scan verification failed", { description: err?.message || "Invalid or unguessable token." });
			setScanResult({
				status: "INVALID",
				message: err?.message || "Invalid or unverified token."
			});
		} finally {
			setIsValidating(false);
			setIsCheckingIn(false);
		}
	};
	const handleConfirmCheckIn = () => {
		handleProcessToken(tokenInput, "CHECK_IN");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-xl bg-card border-border shadow-2xl overflow-y-auto max-h-[90vh]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-primary mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-wider",
							children: "Door Scanner & Check-In Desk"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-lg font-black",
						children: "Scan / Check-In Attendee Ticket"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs text-muted-foreground",
						children: eventTitle ? `Authorized door check-in for "${eventTitle}"` : "Scan or enter attendee QR tokens to verify admission and record attendance."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-slate-950 p-3 text-white overflow-hidden relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-semibold flex items-center gap-1.5 text-slate-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-3.5 text-amber-400" }), "Live Camera Scanner"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [isCameraActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											onClick: toggleCamera,
											className: "h-7 px-2 text-[11px] text-slate-300 hover:text-white hover:bg-slate-800",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3 mr-1" }), "Flip"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: isCameraActive ? "destructive" : "secondary",
											size: "sm",
											onClick: isCameraActive ? stopCamera : startCamera,
											className: "h-7 px-2.5 text-xs font-semibold",
											children: isCameraActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraOff, { className: "size-3 mr-1" }), " Stop Camera"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-3 mr-1" }), " Open Camera"] })
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative aspect-video w-full rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
											ref: videoRef,
											className: cn("w-full h-full object-cover", !isCameraActive && "hidden")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
											ref: canvasRef,
											className: "hidden"
										}),
										isCameraActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute inset-0 pointer-events-none flex items-center justify-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "w-48 h-48 border-2 border-dashed border-amber-400/80 rounded-xl relative shadow-[0_0_15px_rgba(251,191,36,0.3)] animate-pulse",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-400" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-400" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-400" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-400" })
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "absolute bottom-3 text-[11px] font-medium text-amber-300/90 bg-slate-950/70 px-2 py-0.5 rounded-full",
												children: "Point camera at attendee QR code"
											})]
										}),
										!isCameraActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center p-6 space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mx-auto size-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-6" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-slate-300 font-medium",
													children: "Camera is inactive"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-slate-400 max-w-xs mx-auto",
													children: "Click \"Open Camera\" to scan passes directly using your device webcam or phone camera."
												})
											]
										})
									]
								}),
								cameraError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 rounded-lg bg-red-950/60 border border-red-800/60 p-2 text-xs text-red-300 flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cameraError })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "attendee-qr-token",
									className: "text-xs font-semibold",
									children: "Attendee Secure QR Token / Reference"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "attendee-qr-token",
											placeholder: "Scan or paste token (e.g. cptok_tkt_...)",
											value: tokenInput,
											onChange: (e) => setTokenInput(e.target.value),
											className: "font-mono text-xs",
											onKeyDown: (e) => {
												if (e.key === "Enter") {
													e.preventDefault();
													handleProcessToken(tokenInput, "VALIDATE");
												}
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											size: "sm",
											onClick: handlePaste,
											className: "shrink-0 text-xs gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "Paste"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											size: "sm",
											onClick: () => handleProcessToken(tokenInput, "VALIDATE"),
											disabled: isValidating || isCheckingIn || !tokenInput.trim(),
											className: "shrink-0 text-xs bg-navy text-white hover:bg-navy/90 font-semibold",
											children: isValidating ? "Validating…" : "Validate"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Opaque tokens are server-verified against event ID, tickets, and payment status."
								})
							]
						}),
						scanResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("rounded-xl border-2 p-4 space-y-3 animate-in fade-in-50", scanResult.status === "VALID" && "border-emerald-500/40 bg-emerald-500/5", scanResult.status === "CHECKED_IN" && "border-emerald-600/50 bg-emerald-600/10", scanResult.status === "ALREADY_CHECKED_IN" && "border-amber-500/40 bg-amber-500/5", scanResult.status === "EVENT_MISMATCH" && "border-red-500/50 bg-red-500/10", (scanResult.status === "INVALID" || scanResult.status === "CANCELLED" || scanResult.status === "UNPAID") && "border-destructive/40 bg-destructive/5"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-base font-bold text-foreground",
												children: scanResult.participant?.name || "Participant"
											}),
											scanResult.status === "VALID" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), "VALID FOR ENTRY"]
											}),
											scanResult.status === "CHECKED_IN" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded-full bg-emerald-600/20 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-600/40 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), "CHECK-IN SUCCESSFUL"]
											}),
											scanResult.status === "ALREADY_CHECKED_IN" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), "ALREADY CHECKED IN"]
											}),
											scanResult.status === "EVENT_MISMATCH" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400 border border-red-500/40 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3" }), "WRONG EVENT"]
											}),
											scanResult.status === "INVALID" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded-full bg-destructive/20 px-2 py-0.5 text-[10px] font-bold text-destructive border border-destructive/30 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3" }), "INVALID TICKET"]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: [
											scanResult.participant?.email || "Attendee",
											" ·",
											" ",
											scanResult.participant?.university || "CampusPulse User"
										]
									})] }), scanResult.ticket?.ticketType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full px-2.5 py-0.5 text-xs font-bold uppercase border bg-card text-foreground border-border shrink-0",
										children: scanResult.ticket.ticketType.replace(/_/g, " ")
									})]
								}),
								scanResult.message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("rounded-lg p-2.5 text-xs flex items-center gap-2", scanResult.status === "VALID" || scanResult.status === "CHECKED_IN" ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300" : scanResult.status === "ALREADY_CHECKED_IN" ? "bg-amber-500/10 text-amber-800 dark:text-amber-300" : "bg-destructive/10 text-destructive"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: scanResult.message })]
								}),
								scanResult.ticket && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs rounded-lg border border-border/60 bg-card p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold uppercase text-muted-foreground block",
											children: "Ticket No"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-foreground",
											children: scanResult.ticket.ticketNumber || "N/A"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold uppercase text-muted-foreground block",
											children: "Price / Eligibility"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground font-semibold",
											children: scanResult.ticket.ticketPrice ? `Rs. ${scanResult.ticket.ticketPrice}` : "FREE"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold uppercase text-muted-foreground block",
											children: "Payment"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground capitalize",
											children: scanResult.participant?.paymentStatus?.toLowerCase() || "Verified"
										})] }),
										scanResult.attendance?.checkInTime && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "col-span-2 sm:col-span-3 pt-1 border-t border-border/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold uppercase text-muted-foreground block",
												children: "Checked-In Record"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-emerald-600 dark:text-emerald-400 font-semibold",
												children: [formatDate(scanResult.attendance.checkInTime), scanResult.attendance.checkedInBy?.name ? ` (by ${scanResult.attendance.checkedInBy.name})` : ""]
											})]
										})
									]
								}),
								scanResult.status === "VALID" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "checkin-notes",
											className: "text-[11px] font-semibold text-muted-foreground",
											children: "Gate / Desk Notes (Optional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "checkin-notes",
											placeholder: "e.g. Main Gate, Kit Provided, Badge Given...",
											value: notesInput,
											onChange: (e) => setNotesInput(e.target.value),
											className: "text-xs h-8"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										onClick: handleConfirmCheckIn,
										disabled: isCheckingIn,
										className: "w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), isCheckingIn ? "Recording Door Admission…" : "Confirm Door Admission & Check-In"]
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: onClose,
						children: "Close Scanner"
					})
				})
			]
		})
	});
}
function JoinOrganizationDialog({ open, onOpenChange, onRequestNewOrg, onSuccess, myMemberships = [] }) {
	const { user } = useAuth();
	const [currentStep, setCurrentStep] = (0, import_react.useState)(1);
	const [universities, setUniversities] = (0, import_react.useState)([]);
	const [loadingUniversities, setLoadingUniversities] = (0, import_react.useState)(false);
	const [selectedUniId, setSelectedUniId] = (0, import_react.useState)("");
	const [organizations, setOrganizations] = (0, import_react.useState)([]);
	const [loadingOrgs, setLoadingOrgs] = (0, import_react.useState)(false);
	const [selectedOrgId, setSelectedOrgId] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("MEMBER");
	const [customTitle, setCustomTitle] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [submittedStatus, setSubmittedStatus] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		let isMounted = true;
		setLoadingUniversities(true);
		directoryApi.universities().then((data) => {
			if (!isMounted) return;
			setUniversities(data);
			if (user?.universityId) setSelectedUniId(user.universityId);
			else if (data.length > 0 && !selectedUniId) {}
		}).catch((err) => {
			console.error("Failed to load universities", err);
		}).finally(() => {
			if (isMounted) setLoadingUniversities(false);
		});
		return () => {
			isMounted = false;
		};
	}, [open, user]);
	(0, import_react.useEffect)(() => {
		if (!selectedUniId) {
			setOrganizations([]);
			setSelectedOrgId("");
			return;
		}
		let isMounted = true;
		setLoadingOrgs(true);
		setSelectedOrgId("");
		directoryApi.organizations(selectedUniId).then((data) => {
			if (!isMounted) return;
			setOrganizations(data);
		}).catch((err) => {
			console.error("Failed to load organizations for university", err);
			if (isMounted) setOrganizations([]);
		}).finally(() => {
			if (isMounted) setLoadingOrgs(false);
		});
		return () => {
			isMounted = false;
		};
	}, [selectedUniId]);
	(0, import_react.useEffect)(() => {
		if (!open) {
			setCurrentStep(1);
			setRole("MEMBER");
			setCustomTitle("");
			setMessage("");
			setSubmittedStatus(null);
		}
	}, [open]);
	const selectedOrg = (0, import_react.useMemo)(() => {
		return organizations.find((o) => o.id === selectedOrgId) || null;
	}, [organizations, selectedOrgId]);
	const selectedUni = (0, import_react.useMemo)(() => {
		return universities.find((u) => u.id === selectedUniId) || null;
	}, [universities, selectedUniId]);
	const existingMembership = (0, import_react.useMemo)(() => {
		if (!selectedOrgId) return null;
		return myMemberships.find((m) => m.organizationId === selectedOrgId) || null;
	}, [selectedOrgId, myMemberships]);
	const isPrivilegedRole = [
		"LEADER",
		"PRESIDENT",
		"VICE_PRESIDENT"
	].includes(role);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!selectedOrgId) {
			toast.error("Please select an organization.");
			return;
		}
		setSubmitting(true);
		try {
			await directoryApi.joinOrganization(selectedOrgId, {
				role,
				title: customTitle.trim() || void 0,
				message: message.trim() || void 0,
				universityId: selectedUniId || void 0
			});
			setSubmittedStatus("ACTIVE");
			toast.success(`Joined ${selectedOrg?.name || "Society"}! 🎉`, { description: "You are now an active member of this organization." });
			if (onSuccess) onSuccess();
		} catch (err) {
			toast.error(err?.message || "Failed to join society.");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] max-w-xl overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid size-8 place-items-center rounded-lg bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-lg font-bold",
					children: "Join a University Organization"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "text-xs",
					children: "Connect with verified student societies and become an active member directly."
				})] })]
			}) }), submittedStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6 py-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid size-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-bold text-foreground",
							children: "Joined Successfully! 🎉"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground max-w-sm mx-auto",
							children: [
								"You are now an active member of ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground",
									children: selectedOrg?.name
								}),
								"."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-surface p-4 text-left text-xs space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Organization:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: selectedOrg?.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "University:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: selectedUni?.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Membership Role:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-primary",
									children: role.replace(/_/g, " ")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Status:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400",
									children: "ACTIVE"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
						className: "sm:justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => onOpenChange(false),
							children: "Close & View Dashboard"
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between border-b border-border/60 pb-3",
						children: [
							{
								step: 1,
								label: "University"
							},
							{
								step: 2,
								label: "Organization"
							},
							{
								step: 3,
								label: "Role"
							},
							{
								step: 4,
								label: "Details"
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								if (s.step === 1) setCurrentStep(1);
								else if (s.step === 2 && selectedUniId) setCurrentStep(2);
								else if (s.step === 3 && selectedOrgId) setCurrentStep(3);
								else if (s.step === 4 && selectedOrgId) setCurrentStep(4);
							},
							className: cn("flex items-center gap-1.5 text-xs font-semibold transition-colors", currentStep === s.step ? "text-primary" : currentStep > s.step ? "text-muted-foreground hover:text-foreground" : "text-muted-foreground/40 cursor-not-allowed"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("grid size-5 place-items-center rounded-full text-[10px]", currentStep === s.step ? "bg-primary text-primary-foreground font-bold" : currentStep > s.step ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"),
								children: s.step
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: s.label
							})]
						}, s.step))
					}),
					currentStep === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "join-uni-select",
											className: "text-sm font-semibold",
											children: "Step 1: Select University *"
										}), user?.universityId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }), " Preselected from verified email"]
										})]
									}),
									loadingUniversities ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 rounded-md border border-input bg-background p-3 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin text-primary" }), "Loading university directory…"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "join-uni-select",
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
										value: selectedUniId,
										onChange: (e) => setSelectedUniId(e.target.value),
										required: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "-- Choose your university --"
										}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: u.id,
											children: [
												u.name,
												" ",
												u.code ? `(${u.code})` : ""
											]
										}, u.id))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "Only organizations belonging to your selected university will be loaded."
									})
								]
							}),
							selectedUni && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-primary/20 bg-primary/5 p-3.5 flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-5 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-foreground",
										children: selectedUni.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: selectedUni.location || selectedUni.description || "Verified Institution"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end pt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									disabled: !selectedUniId,
									onClick: () => setCurrentStep(2),
									className: "gap-1.5",
									children: ["Next: Select Organization ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							})
						]
					}),
					currentStep === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									htmlFor: "join-org-select",
									className: "text-sm font-semibold",
									children: [
										"Step 2: Select Organization at ",
										selectedUni?.name || "University",
										" *"
									]
								}), loadingOrgs ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 rounded-md border border-input bg-background p-3 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin text-primary" }),
										"Loading societies for ",
										selectedUni?.name,
										"…"
									]
								}) : organizations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-dashed border-border p-4 text-center space-y-3 bg-surface/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											"No registered organizations found for ",
											selectedUni?.name,
											"."
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										className: "gap-1.5 text-primary border-primary/30",
										onClick: () => {
											onOpenChange(false);
											onRequestNewOrg();
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "size-3.5" }), "Request a New Organization"]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "join-org-select",
									className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
									value: selectedOrgId,
									onChange: (e) => setSelectedOrgId(e.target.value),
									required: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: "",
										children: [
											"-- Choose organization from ",
											selectedUni?.name,
											" --"
										]
									}), organizations.map((org) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: org.id,
										children: [
											org.name,
											" ",
											org.verified ? "✓ Verified" : ""
										]
									}, org.id))]
								})]
							}),
							selectedOrg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-card p-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, { initials: selectedOrg.name.slice(0, 2) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
												className: "font-bold text-sm text-foreground flex items-center gap-1.5",
												children: [selectedOrg.name, selectedOrg.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													title: "Verified Society",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" })
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: selectedUni?.name
											})] })]
										}), existingMembership && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400",
											children: [
												existingMembership.status || "MEMBER",
												" (",
												existingMembership.role,
												")"
											]
										})]
									}),
									selectedOrg.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground line-clamp-2",
										children: selectedOrg.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2 text-[11px] text-muted-foreground pt-1 border-t border-border/40",
										children: [
											selectedOrg.websiteUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: selectedOrg.websiteUrl,
												target: "_blank",
												rel: "noreferrer",
												className: "flex items-center gap-1 hover:text-primary",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3" }), " Website"]
											}),
											selectedOrg.instagramUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: selectedOrg.instagramUrl,
												target: "_blank",
												rel: "noreferrer",
												className: "flex items-center gap-1 hover:text-primary",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-3" }), " Instagram"]
											}),
											selectedOrg.contactEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3" }),
													" ",
													selectedOrg.contactEmail
												]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-lg bg-surface p-3 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Can't find your university organization?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									className: "h-7 text-xs font-semibold text-primary hover:text-primary",
									onClick: () => {
										onOpenChange(false);
										onRequestNewOrg();
									},
									children: "+ Request a New Organization"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => setCurrentStep(1),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									disabled: !selectedOrgId,
									onClick: () => setCurrentStep(3),
									className: "gap-1.5",
									children: ["Next: Choose Role ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})]
							})
						]
					}),
					currentStep === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "join-role-select",
									className: "text-sm font-semibold",
									children: "Step 3: Requested Organization Role *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "join-role-select",
									className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
									value: role,
									onChange: (e) => setRole(e.target.value),
									required: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("optgroup", {
										label: "Ordinary Member Roles",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "MEMBER",
												children: "Member (General campus society member)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "EVENT_ORGANIZER",
												children: "Event Organizer (Publish and manage society events)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "TREASURER",
												children: "Treasurer (Finance and ticketing manager)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "SECRETARY",
												children: "Secretary (Administration and records)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "OTHER",
												children: "Other Committee Role"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("optgroup", {
										label: "Executive Leadership Roles (Max 2 Leaders per Society)",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "LEADER",
												children: "Leader / Head"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "PRESIDENT",
												children: "President"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "VICE_PRESIDENT",
												children: "Vice President"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "custom-title-input",
									className: "text-xs font-medium",
									children: "Specific Executive or Committee Title (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "custom-title-input",
									placeholder: "e.g. Media Team Lead, Head of Logistics, Senior Member",
									value: customTitle,
									onChange: (e) => setCustomTitle(e.target.value)
								})]
							}),
							isPrivilegedRole ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-primary/30 bg-primary/10 p-3.5 text-xs text-foreground space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 font-bold text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary shrink-0" }), "Executive Leadership Policy"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-muted-foreground",
									children: [
										"Societies allow a maximum of 2 active leaders. Selecting ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: role.replace(/_/g, " ") }),
										" will assign you as an active Society Leader if a leadership position is currently available."
									]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-surface p-3.5 text-xs text-muted-foreground space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 font-semibold text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4 text-primary shrink-0" }), "Direct Society Membership"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"You will immediately join ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedOrg?.name }),
									" as an active member with the selected role."
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => setCurrentStep(2),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									onClick: () => setCurrentStep(4),
									className: "gap-1.5",
									children: ["Next: Additional Details ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})]
							})
						]
					}),
					currentStep === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "join-message-textarea",
									className: "text-sm font-semibold",
									children: "Step 4: Message or Responsibilities (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "join-message-textarea",
									placeholder: "Explain your student involvement, previous society contributions, or reasons for joining...",
									rows: 4,
									value: message,
									onChange: (e) => setMessage(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-card p-4 space-y-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
									className: "font-bold text-foreground",
									children: "Review Your Submission"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "University:" }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: selectedUni?.name
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Society:" }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: selectedOrg?.name
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Selected Role:" }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-primary",
												children: role.replace(/_/g, " ")
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Membership Status:" }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-emerald-500",
												children: "ACTIVE"
											})
										] })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => setCurrentStep(3),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: submitting || !selectedOrgId,
									className: "gap-1.5 font-semibold",
									children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Joining…"] }) : "Join Society"
								})]
							})
						]
					})
				]
			})]
		})
	});
}
function RequestOrganizationDialog({ open, onOpenChange, onSuccess, onSwitchToJoin }) {
	const { user } = useAuth();
	const [universities, setUniversities] = (0, import_react.useState)([]);
	const [loadingUnis, setLoadingUnis] = (0, import_react.useState)(false);
	const [universityId, setUniversityId] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("STUDENT_CLUB");
	const [description, setDescription] = (0, import_react.useState)("");
	const [logoUrl, setLogoUrl] = (0, import_react.useState)("");
	const [websiteUrl, setWebsiteUrl] = (0, import_react.useState)("");
	const [instagramUrl, setInstagramUrl] = (0, import_react.useState)("");
	const [facebookUrl, setFacebookUrl] = (0, import_react.useState)("");
	const [contactEmail, setContactEmail] = (0, import_react.useState)("");
	const [requestedRole, setRequestedRole] = (0, import_react.useState)("LEADER");
	const [additionalNotes, setAdditionalNotes] = (0, import_react.useState)("");
	const [checkingDuplicate, setCheckingDuplicate] = (0, import_react.useState)(false);
	const [duplicateMatch, setDuplicateMatch] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setLoadingUnis(true);
		directoryApi.universities().then((data) => {
			setUniversities(data);
			if (user?.universityId) setUniversityId(user.universityId);
			if (user?.email) setContactEmail(user.email);
		}).catch((err) => console.error("Failed to load universities", err)).finally(() => setLoadingUnis(false));
	}, [open, user]);
	(0, import_react.useEffect)(() => {
		const trimmed = name.trim();
		if (trimmed.length < 3) {
			setDuplicateMatch(null);
			return;
		}
		const timer = setTimeout(async () => {
			setCheckingDuplicate(true);
			try {
				const res = await directoryApi.checkDuplicate(universityId || void 0, trimmed);
				if (res.exists && res.matchingOrganization) setDuplicateMatch(res.matchingOrganization);
				else setDuplicateMatch(null);
			} catch {
				setDuplicateMatch(null);
			} finally {
				setCheckingDuplicate(false);
			}
		}, 400);
		return () => clearTimeout(timer);
	}, [name, universityId]);
	(0, import_react.useEffect)(() => {
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
	const handleSubmit = async (e) => {
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
				description: description.trim() || void 0,
				logoUrl: logoUrl.trim() || void 0,
				websiteUrl: websiteUrl.trim() || void 0,
				instagramUrl: instagramUrl.trim() || void 0,
				facebookUrl: facebookUrl.trim() || void 0,
				email: contactEmail.trim() || void 0,
				requestedRole,
				additionalNotes: additionalNotes.trim() || void 0
			});
			setSubmitted(true);
			toast.success("Organization request submitted!", { description: "Your request is now in PENDING review by platform and university administrators." });
			if (onSuccess) onSuccess();
		} catch (err) {
			toast.error(err?.message || "Failed to submit organization creation request.");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] max-w-2xl overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid size-8 place-items-center rounded-lg bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-lg font-bold",
					children: "Request a New Organization"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "text-xs",
					children: "Submit a new university society, student club, or faculty body for administrative verification."
				})] })]
			}) }), submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6 py-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid size-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-bold text-foreground",
							children: "Organization Request Submitted!"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground max-w-md mx-auto",
							children: [
								"Your request to register ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground",
									children: name
								}),
								" has been submitted. Once reviewed and approved by administrators, it will become available in the university directory, and your founding leader role will be activated."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
						className: "sm:justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => onOpenChange(false),
							children: "Done"
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "req-uni",
								children: "University *"
							}), loadingUnis ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 p-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }), " Loading universities…"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "req-uni",
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
								value: universityId,
								onChange: (e) => setUniversityId(e.target.value),
								required: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "-- Choose University --"
								}), universities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: u.id,
									children: u.name
								}, u.id))]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "req-type",
								children: "Category / Type *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "req-type",
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
								value: type,
								onChange: (e) => setType(e.target.value),
								required: true,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "STUDENT_CLUB",
										children: "Student Club"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ACADEMIC_SOCIETY",
										children: "Academic Society"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "SPORTS_CLUB",
										children: "Sports Club"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "FACULTY_BODY",
										children: "Faculty Body"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "COMMUNITY",
										children: "Campus Community"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "UNIVERSITY_OFFICE",
										children: "University Office"
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "req-name",
									children: "Organization Name *"
								}), checkingDuplicate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] text-muted-foreground flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 animate-spin" }), " Checking for duplicates…"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "req-name",
								placeholder: "e.g. SLIIT Cyber Security Community",
								value: name,
								onChange: (e) => setName(e.target.value),
								required: true
							}),
							duplicateMatch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-300 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-amber-600 dark:text-amber-400 shrink-0" }), "Matching Organization Already Exists!"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										"An organization named ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
											"\"",
											duplicateMatch.name,
											"\""
										] }),
										" already exists at this university."
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										size: "sm",
										variant: "outline",
										className: "h-7 text-xs font-semibold text-amber-900 dark:text-amber-100 border-amber-500/40 hover:bg-amber-500/20",
										onClick: () => {
											onOpenChange(false);
											if (onSwitchToJoin) onSwitchToJoin(duplicateMatch.id);
										},
										children: [
											"Join Existing \"",
											duplicateMatch.name,
											"\" Instead"
										]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "req-desc",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "req-desc",
							placeholder: "Society mission, typical campus activities, and student community focus...",
							rows: 3,
							value: description,
							onChange: (e) => setDescription(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "req-logo",
								children: "Logo Image URL (Optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "req-logo",
								type: "url",
								placeholder: "https://... logo image link",
								value: logoUrl,
								onChange: (e) => setLogoUrl(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "req-email",
								children: "Official / Contact Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "req-email",
								type: "email",
								placeholder: "society@university.lk",
								value: contactEmail,
								onChange: (e) => setContactEmail(e.target.value)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "req-web",
									children: "Official Website"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "req-web",
									type: "url",
									placeholder: "https://...",
									value: websiteUrl,
									onChange: (e) => setWebsiteUrl(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "req-ig",
									children: "Instagram URL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "req-ig",
									type: "url",
									placeholder: "https://instagram.com/...",
									value: instagramUrl,
									onChange: (e) => setInstagramUrl(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "req-fb",
									children: "Facebook URL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "req-fb",
									type: "url",
									placeholder: "https://facebook.com/...",
									value: facebookUrl,
									onChange: (e) => setFacebookUrl(e.target.value)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "req-role",
								children: "Requested Founding Role *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "req-role",
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
								value: requestedRole,
								onChange: (e) => setRequestedRole(e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "LEADER",
										children: "Founding Leader / Head"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "PRESIDENT",
										children: "President"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "SECRETARY",
										children: "Secretary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "EVENT_ORGANIZER",
										children: "Event Organizer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "MEMBER",
										children: "Member / Founder"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "req-notes",
								children: "Additional Reviewer Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "req-notes",
								placeholder: "e.g. Faculty patron endorsement or student union affiliation",
								value: additionalNotes,
								onChange: (e) => setAdditionalNotes(e.target.value)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-foreground",
							children: "Review & Trust Workflow:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5",
							children: [
								"Submitting this form places the organization in ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "PENDING_REVIEW" }),
								" status. It will be reviewed by university or platform moderators. Event publishing permissions will be granted upon approval."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => onOpenChange(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: submitting || !name.trim() || !universityId || Boolean(duplicateMatch),
							children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Submitting…"] }) : "Submit Organization Request"
						})]
					})
				]
			})]
		})
	});
}
function OrganizationMembersTab({ organizationId = "", organizationName = "Selected Society", canManageOrg = false, isPlatformAdmin = false }) {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [roleFilter, setRoleFilter] = (0, import_react.useState)("ALL");
	const [removeConfirmMember, setRemoveConfirmMember] = (0, import_react.useState)(null);
	const [removeBusy, setRemoveBusy] = (0, import_react.useState)(false);
	const [permissionConfirmMember, setPermissionConfirmMember] = (0, import_react.useState)(null);
	const [permissionBusy, setPermissionBusy] = (0, import_react.useState)(false);
	const [editingMember, setEditingMember] = (0, import_react.useState)(null);
	const [selectedRole, setSelectedRole] = (0, import_react.useState)("MEMBER");
	const [selectedTitle, setSelectedTitle] = (0, import_react.useState)("");
	const [editingBusy, setEditingBusy] = (0, import_react.useState)(false);
	const { data, isLoading, refetch } = useQuery({
		queryKey: [
			"organization",
			organizationId,
			"members"
		],
		queryFn: () => directoryApi.organizationMembers(organizationId),
		enabled: Boolean(organizationId)
	});
	const membersData = data || {
		activeMembers: [],
		members: [],
		totalActive: 0,
		leaderCount: 0,
		maxLeaders: 2,
		isLeaderLimitReached: false,
		isAuthorizedManager: false,
		isAuthorizedLeader: false
	};
	const activeMembers = membersData.activeMembers || membersData.members || [];
	const currentUserMembership = (0, import_react.useMemo)(() => {
		if (!user) return null;
		return activeMembers.find((m) => m.userId === user.id);
	}, [activeMembers, user]);
	const isLeader = (0, import_react.useMemo)(() => {
		if (isPlatformAdmin) return true;
		if (membersData.isAuthorizedLeader) return true;
		if (currentUserMembership) return [
			"ADMIN",
			"LEADER",
			"PRESIDENT"
		].includes(currentUserMembership.role);
		return Boolean(canManageOrg);
	}, [
		isPlatformAdmin,
		membersData.isAuthorizedLeader,
		currentUserMembership,
		canManageOrg
	]);
	const leaderCount = membersData.leaderCount ?? activeMembers.filter((m) => ["LEADER", "PRESIDENT"].includes(m.role || "")).length;
	const maxLeaders = membersData.maxLeaders ?? 2;
	const isLeaderLimitReached = leaderCount >= maxLeaders;
	const filteredActiveMembers = (0, import_react.useMemo)(() => {
		return activeMembers.filter((m) => {
			const memberName = m.name || "";
			const memberTitle = m.title || "";
			const memberEmail = m.email || "";
			const matchesSearch = memberName.toLowerCase().includes(searchQuery.toLowerCase()) || memberTitle.toLowerCase().includes(searchQuery.toLowerCase()) || memberEmail.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesRole = roleFilter === "ALL" || (m.role || "MEMBER") === roleFilter;
			return matchesSearch && matchesRole;
		});
	}, [
		activeMembers,
		searchQuery,
		roleFilter
	]);
	const handleOpenEdit = (m) => {
		setEditingMember(m);
		setSelectedRole(m.role || "MEMBER");
		setSelectedTitle(m.title || "");
	};
	const handleUpdateRole = async (e) => {
		e.preventDefault();
		if (!editingMember) return;
		setEditingBusy(true);
		try {
			await directoryApi.updateMember(organizationId, editingMember.id, {
				role: selectedRole,
				title: selectedTitle.trim() || void 0
			});
			toast.success(`Updated ${editingMember.name || "Member"}'s role to ${selectedRole.replace(/_/g, " ")}`);
			setEditingMember(null);
			refetch();
			queryClient.invalidateQueries({ queryKey: ["myOrganizations"] });
			queryClient.invalidateQueries({ queryKey: ["organization", organizationId] });
		} catch (err) {
			toast.error(err?.message || "Failed to update member role.");
		} finally {
			setEditingBusy(false);
		}
	};
	const handleConfirmRemove = async () => {
		if (!removeConfirmMember) return;
		setRemoveBusy(true);
		try {
			await directoryApi.removeMember(organizationId, removeConfirmMember.id);
			toast.success(`Removed ${removeConfirmMember.name || "Member"} from the society`);
			setRemoveConfirmMember(null);
			refetch();
			queryClient.invalidateQueries({ queryKey: ["myOrganizations"] });
			queryClient.invalidateQueries({ queryKey: ["organization", organizationId] });
		} catch (err) {
			toast.error(err?.message || "Failed to remove member.");
		} finally {
			setRemoveBusy(false);
		}
	};
	const handleConfirmTogglePermission = async () => {
		if (!permissionConfirmMember) return;
		const nextPermission = !Boolean(permissionConfirmMember.canCreateEvents);
		setPermissionBusy(true);
		try {
			await directoryApi.updateMember(organizationId, permissionConfirmMember.id, { canCreateEvents: nextPermission });
			toast.success(nextPermission ? `Granted event-creation permission to ${permissionConfirmMember.name || "Member"}` : `Revoked event-creation permission for ${permissionConfirmMember.name || "Member"}`);
			setPermissionConfirmMember(null);
			refetch();
			queryClient.invalidateQueries({ queryKey: ["myOrganizations"] });
			queryClient.invalidateQueries({ queryKey: ["myManagedOrganizations"] });
			queryClient.invalidateQueries({ queryKey: ["organization", organizationId] });
		} catch (err) {
			toast.error(err?.message || "Failed to update event-creation permission.");
		} finally {
			setPermissionBusy(false);
		}
	};
	if (!organizationId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-12 text-center text-xs text-muted-foreground rounded-xl border border-dashed border-border bg-surface/50",
		children: "Please select a society above to view its committee and member directory."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-lg font-bold text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5 text-primary" }), "Society Committee & Members"]
					}), isLeader ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary border border-primary/20",
						children: "Leader View"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border",
						children: "Member View"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: isLeader ? `Manage active committee officers, permissions, and member roster for ${organizationName}.` : `View official leadership and active member roster for ${organizationName}.`
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card/60 p-4 shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("flex size-10 items-center justify-center rounded-lg font-bold text-sm", isLeaderLimitReached ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20" : "bg-primary/10 text-primary border border-primary/20"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs font-bold uppercase tracking-wider text-foreground",
							children: "Society Leadership Capacity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("rounded px-2 py-0.5 text-[11px] font-extrabold", isLeaderLimitReached ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30" : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"),
							children: [
								leaderCount,
								" / ",
								maxLeaders,
								" Active Leaders"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: isLeaderLimitReached ? "Maximum 2 leaders reached. To appoint a new leader, an existing leader must be demoted or removed." : `${maxLeaders - leaderCount} leadership position available. Authorized leaders can assign a co-leader.`
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 min-w-[200px] max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Search member name or title…",
						className: "pl-8 text-xs h-8",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						"aria-label": "Filter members by role",
						className: "rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground font-medium",
						value: roleFilter,
						onChange: (e) => setRoleFilter(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: "ALL",
								children: [
									"All Roles (",
									activeMembers.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: "LEADER",
								children: [
									"Leader (",
									activeMembers.filter((m) => m.role === "LEADER").length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "PRESIDENT",
								children: "President"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "EVENT_ORGANIZER",
								children: "Event Organizer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "TREASURER",
								children: "Treasurer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "SECRETARY",
								children: "Secretary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "MEMBER",
								children: "Member"
							})
						]
					})]
				})]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-12 text-center text-xs text-muted-foreground flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin text-primary" }), " Loading member directory…"]
			}) : filteredActiveMembers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-10 text-center text-xs text-muted-foreground rounded-xl border border-dashed border-border bg-surface/50",
				children: "No members match your search or filter."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: filteredActiveMembers.map((m) => {
					const memberRole = m.role || "MEMBER";
					const memberName = m.name || "Member";
					const memberIsLeader = [
						"ADMIN",
						"LEADER",
						"PRESIDENT",
						"VICE_PRESIDENT"
					].includes(memberRole);
					const isRoleOrganizer = ["EVENT_ORGANIZER", "EVENT_MANAGER"].includes(memberRole);
					const hasEventPermission = Boolean(m.canCreateEvents);
					const isSelf = m.userId === user?.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, { initials: memberName.slice(0, 2) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "font-bold text-sm text-foreground flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate",
													children: memberName
												}),
												m.universityEmailVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													title: "Verified University Student",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-emerald-500 shrink-0" })
												}),
												isSelf && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-muted-foreground font-semibold bg-surface px-1.5 py-0.5 rounded shrink-0",
													children: "(You)"
												})
											]
										}), m.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-medium text-muted-foreground truncate",
											children: m.title
										})]
									})]
								}), m.isFounder && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary flex items-center gap-0.5 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-2.5" }), " Founder"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("rounded px-2 py-0.5 text-[11px] font-bold flex items-center gap-1", memberIsLeader ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20" : isRoleOrganizer ? "bg-primary/10 text-primary border border-primary/20" : "bg-surface text-muted-foreground border border-border/40"),
										children: [memberIsLeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-3" }), memberRole.replace(/_/g, " ")]
									}),
									hasEventPermission && !memberIsLeader && !isRoleOrganizer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										title: "Authorized to create and publish events for this society",
										className: "rounded bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), " Can create events"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
										children: "Active"
									})
								]
							}),
							isLeader && m.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2.5 flex items-center gap-1.5 text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3 text-primary/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: m.email
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-between border-t border-border/40 pt-2.5 text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3" }),
									"Joined ",
									m.joinedAt ? formatDate(m.joinedAt) : "Recently"
								]
							}), isLeader && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "sm",
										className: "h-7 px-2 text-xs gap-1 font-medium hover:text-primary",
										onClick: () => handleOpenEdit(m),
										title: "Manage committee role & portfolio",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-3" }), " Role"]
									}),
									!memberIsLeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										className: cn("h-7 px-2 text-xs gap-1 font-medium transition-colors", hasEventPermission ? "text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20" : "text-muted-foreground hover:text-primary hover:bg-primary/10"),
										onClick: () => setPermissionConfirmMember(m),
										title: hasEventPermission ? "Revoke event creation permission" : "Grant event creation permission",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3" })
									}),
									!memberIsLeader && !isSelf && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										className: "h-7 px-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10",
										onClick: () => setRemoveConfirmMember(m),
										title: "Remove member",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
									})
								]
							})]
						})]
					}, m.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(removeConfirmMember),
				onOpenChange: (open) => !open && setRemoveConfirmMember(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Remove Member" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							className: "text-sm pt-2",
							children: [
								"Are you sure you want to remove ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: removeConfirmMember?.name }),
								" from the society?"
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"This will revoke their membership and all associated committee permissions for ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: organizationName }),
								". Their CampusPulse student account will remain active."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "mt-4 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setRemoveConfirmMember(null),
								disabled: removeBusy,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "destructive",
								onClick: handleConfirmRemove,
								disabled: removeBusy,
								children: removeBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-1" }), " Removing…"] }) : "Remove Member"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(permissionConfirmMember),
				onOpenChange: (open) => !open && setPermissionConfirmMember(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: permissionConfirmMember?.canCreateEvents ? "Revoke Event-Creation Permission" : "Grant Event-Creation Permission" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-sm pt-2",
							children: permissionConfirmMember?.canCreateEvents ? `Are you sure you want to revoke event-creation permission for ${permissionConfirmMember?.name}? They will no longer be able to create events for ${organizationName}.` : `This action will grant ${permissionConfirmMember?.name} permission to create and draft events on behalf of ${organizationName}.`
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-surface/50 p-3 text-xs text-muted-foreground space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-foreground",
									children: "Permission Scope Details:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"• Specific to ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: organizationName }),
									" only."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Does not grant leader permissions, member removal, or settings management." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Does not count towards the 2-leader society limit." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "mt-4 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setPermissionConfirmMember(null),
								disabled: permissionBusy,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: permissionConfirmMember?.canCreateEvents ? "destructive" : "default",
								onClick: handleConfirmTogglePermission,
								disabled: permissionBusy,
								children: permissionBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-1" }), " Updating…"] }) : permissionConfirmMember?.canCreateEvents ? "Revoke Permission" : "Grant Permission"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(editingMember),
				onOpenChange: (o) => !o && setEditingMember(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Manage Role & Portfolio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						className: "text-xs",
						children: [
							"Update organization role and committee title for ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: editingMember?.name }),
							"."
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleUpdateRole,
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "edit-role-select",
										children: "Organization Role"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "edit-role-select",
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
										value: selectedRole,
										onChange: (e) => setSelectedRole(e.target.value),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "MEMBER",
												children: "Member (Standard Membership)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "EVENT_ORGANIZER",
												children: "Event Organizer (Publish & Manage Events)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "TREASURER",
												children: "Treasurer (Finances & Ticketing)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "SECRETARY",
												children: "Secretary (Communications)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: "LEADER",
												disabled: isLeaderLimitReached && !["LEADER", "PRESIDENT"].includes(editingMember?.role || ""),
												children: [
													"Leader",
													" ",
													isLeaderLimitReached && !["LEADER", "PRESIDENT"].includes(editingMember?.role || "") ? "(Maximum 2 leaders reached)" : "(Full Management & Executive)"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: "PRESIDENT",
												disabled: isLeaderLimitReached && !["LEADER", "PRESIDENT"].includes(editingMember?.role || ""),
												children: [
													"President",
													" ",
													isLeaderLimitReached && !["LEADER", "PRESIDENT"].includes(editingMember?.role || "") ? "(Limit reached)" : ""
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "OTHER",
												children: "Other Contributor"
											})
										]
									}),
									isLeaderLimitReached && !["LEADER", "PRESIDENT"].includes(editingMember?.role || "") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-amber-600 dark:text-amber-400",
										children: "⚠️ This society already has the maximum of 2 active leaders."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "edit-title-input",
									children: "Committee Title / Portfolio"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "edit-title-input",
									placeholder: "e.g. Lead Coordinator, Head of Media, Tech Lead",
									value: selectedTitle,
									onChange: (e) => setSelectedTitle(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => setEditingMember(null),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: editingBusy,
									children: editingBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-1" }), " Saving…"] }) : "Save Changes"
								})]
							})
						]
					})]
				})
			})
		]
	});
}
var COMMON_SRI_LANKAN_BANKS = [
	"Bank of Ceylon (BOC)",
	"Commercial Bank of Ceylon",
	"Sampath Bank",
	"Hatton National Bank (HNB)",
	"People's Bank",
	"Nations Trust Bank (NTB)",
	"Seylan Bank",
	"National Development Bank (NDB)",
	"DFCC Bank",
	"Union Bank",
	"Pan Asia Bank",
	"Amana Bank",
	"Cargills Bank"
];
function OrganizationBankSettings({ organizationId, organizationName, canManageFinances, isPlatformAdmin = false }) {
	const queryClient = useQueryClient();
	const isAuthorized = isPlatformAdmin || canManageFinances;
	const { data: org, isLoading, isError, refetch } = useQuery({
		queryKey: [
			"organization",
			"details",
			organizationId
		],
		queryFn: () => directoryApi.organization(organizationId),
		enabled: Boolean(organizationId)
	});
	const [bankName, setBankName] = (0, import_react.useState)("");
	const [bankBranch, setBankBranch] = (0, import_react.useState)("");
	const [bankAccountName, setBankAccountName] = (0, import_react.useState)("");
	const [bankAccountNumber, setBankAccountNumber] = (0, import_react.useState)("");
	const [paymentInstructions, setPaymentInstructions] = (0, import_react.useState)("");
	const [copiedField, setCopiedField] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (org) {
			setBankName(org.bankName || "");
			setBankBranch(org.bankBranch || "");
			setBankAccountName(org.bankAccountName || "");
			setBankAccountNumber(org.bankAccountNumber || "");
			setPaymentInstructions(org.paymentInstructions || "");
		}
	}, [org]);
	const updateMutation = useMutation({
		mutationFn: (data) => directoryApi.updateOrganizationPaymentInstructions(organizationId, data),
		onSuccess: () => {
			toast.success("Bank payment instructions updated successfully! 🏦", { description: "Students paying via Direct Club Transfer will now see these updated account details." });
			queryClient.invalidateQueries({ queryKey: [
				"organization",
				"details",
				organizationId
			] });
			queryClient.invalidateQueries({ queryKey: ["organizations"] });
			queryClient.invalidateQueries({ queryKey: ["myOrganizations"] });
		},
		onError: (err) => {
			toast.error("Failed to update bank details", { description: err?.message || "Please check your network connection and permissions." });
		}
	});
	const handleCopy = (text, label) => {
		navigator.clipboard.writeText(text);
		setCopiedField(label);
		setTimeout(() => setCopiedField(null), 2e3);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isAuthorized) {
			toast.error("Unauthorized", { description: "Only authorized committee financial officers may modify club bank details." });
			return;
		}
		if (bankAccountNumber.trim() && !bankName.trim()) {
			toast.error("Please enter the bank name for this account.");
			return;
		}
		if (bankAccountNumber.trim() && !bankAccountName.trim()) {
			toast.error("Please enter the account holder name.");
			return;
		}
		updateMutation.mutate({
			bankName: bankName.trim(),
			bankBranch: bankBranch.trim(),
			bankAccountName: bankAccountName.trim(),
			bankAccountNumber: bankAccountNumber.trim(),
			paymentInstructions: paymentInstructions.trim()
		});
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 p-6 bg-card rounded-xl border border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {})]
	});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		message: "Could not load society bank details. We encountered an issue loading financial configuration.",
		onRetry: () => {
			refetch();
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl border border-primary/20 bg-primary/5 p-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-11 place-items-center rounded-xl bg-primary/10 text-primary shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-bold text-foreground",
							children: "Society Direct Bank Account & Transfer Settings"
						}), Boolean(bankAccountNumber && bankName) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Active"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-3" }), " Unconfigured"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground mt-1 leading-relaxed max-w-2xl",
						children: [
							"Configure the official bank account for ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: organizationName
							}),
							". When paid events enable Direct Bank Transfer to Club, students will transfer money directly to this account and upload their transfer slip for committee verification."
						]
					})] })]
				}), !isAuthorized && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-amber-500/10 border border-amber-500/30 p-2.5 text-xs text-amber-700 dark:text-amber-400 flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Read-only: Financial permission required" })]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-bold text-foreground",
						children: "Official Bank Details"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: "These details are presented to students during the direct transfer payment step."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "bank-name",
									className: "text-xs font-bold text-foreground",
									children: "Bank Name *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "bank-name",
									list: "bank-list",
									placeholder: "e.g. Bank of Ceylon (BOC) or Commercial Bank",
									value: bankName,
									onChange: (e) => setBankName(e.target.value),
									disabled: !isAuthorized || updateMutation.isPending,
									className: "text-xs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
									id: "bank-list",
									children: COMMON_SRI_LANKAN_BANKS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: b }, b))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "bank-branch",
									className: "text-xs font-bold text-foreground",
									children: "Branch Name / City"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "bank-branch",
									placeholder: "e.g. Malabe Branch, Moratuwa",
									value: bankBranch,
									onChange: (e) => setBankBranch(e.target.value),
									disabled: !isAuthorized || updateMutation.isPending,
									className: "text-xs"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "bank-account-num",
									className: "text-xs font-bold text-foreground",
									children: "Account Number *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "bank-account-num",
									placeholder: "e.g. 100293847561",
									value: bankAccountNumber,
									onChange: (e) => setBankAccountNumber(e.target.value),
									disabled: !isAuthorized || updateMutation.isPending,
									className: "text-xs font-mono font-bold"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "bank-account-name",
									className: "text-xs font-bold text-foreground",
									children: "Account Holder / Beneficiary Name *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "bank-account-name",
									placeholder: "e.g. IEEE Student Branch of SLIIT",
									value: bankAccountName,
									onChange: (e) => setBankAccountName(e.target.value),
									disabled: !isAuthorized || updateMutation.isPending,
									className: "text-xs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Must match the official account name registered with the bank."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 pt-2 border-t border-border/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "payment-instructions",
									className: "text-xs font-bold text-foreground",
									children: "General Transfer Instructions for Students"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "payment-instructions",
									placeholder: "e.g. Please transfer via online banking or deposit at any branch counter. Always put your Student Registration Number in the transaction remarks and upload the deposit slip here.",
									value: paymentInstructions,
									onChange: (e) => setPaymentInstructions(e.target.value),
									disabled: !isAuthorized || updateMutation.isPending,
									rows: 3,
									className: "text-xs leading-relaxed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Displayed to students alongside account details on every event using Direct Bank Transfer."
								})
							]
						}),
						isAuthorized && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-3 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								disabled: updateMutation.isPending,
								className: "bg-navy text-white hover:bg-navy/90 font-bold gap-1.5 text-xs h-9 px-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), updateMutation.isPending ? "Saving Bank Details…" : "Save Bank Instructions"]
							})
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Student Checkout Preview" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-primary/10 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold text-primary uppercase",
									children: "Direct Bank Transfer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded",
									children: "Official Account"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase font-bold text-muted-foreground block",
										children: "Bank"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-foreground",
										children: [
											bankName || "Bank of Ceylon",
											" ",
											bankBranch ? `(${bankBranch})` : ""
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase font-bold text-muted-foreground block",
										children: "Account Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: bankAccountName || organizationName
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase font-bold text-muted-foreground block",
										children: "Account Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2 mt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-sm font-black text-foreground tracking-wider",
											children: bankAccountNumber || "000000000000"
										}), bankAccountNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											onClick: () => handleCopy(bankAccountNumber, "acc"),
											className: "h-6 px-1.5 text-[10px] gap-1",
											children: [copiedField === "acc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" }), copiedField === "acc" ? "Copied" : "Copy"]
										})]
									})] }),
									paymentInstructions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-2 border-t border-primary/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] uppercase font-bold text-muted-foreground block mb-0.5",
											children: "Instructions"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-muted-foreground leading-relaxed italic",
											children: [
												"\"",
												paymentInstructions,
												"\""
											]
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-muted/40 p-3 space-y-1.5 text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 font-bold text-foreground text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Financial Officer Verification" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Money is deposited directly into your club account. CampusPulse does not deduct fees or hold funds. Your authorized officers must check bank statements and approve the student's admission ticket in the Verification Queue." })]
						})
					]
				})
			})]
		})]
	});
}
var OPPORTUNITY_TYPE_OPTIONS = [
	{
		value: "COMPETITION",
		label: "Competition",
		icon: "🏆"
	},
	{
		value: "HACKATHON",
		label: "Hackathon",
		icon: "💻"
	},
	{
		value: "MUSIC",
		label: "Music & Entertainment (Concert/Band)",
		icon: "🎵"
	},
	{
		value: "DRAMA",
		label: "Drama & Performing Arts (Theatre/Play)",
		icon: "🎭"
	},
	{
		value: "HIGHER_STUDIES",
		label: "Higher Studies (MSc, PhD, Master's)",
		icon: "🎓"
	},
	{
		value: "UNIVERSITY_COURSE",
		label: "University Course & Professional Learning",
		icon: "📖"
	},
	{
		value: "WORKSHOP",
		label: "Workshop",
		icon: "🛠️"
	},
	{
		value: "CONFERENCE",
		label: "Conference",
		icon: "🎤"
	},
	{
		value: "RESEARCH",
		label: "Research Opportunity",
		icon: "🔬"
	},
	{
		value: "CAREER",
		label: "Career & Job Fair",
		icon: "💼"
	},
	{
		value: "VOLUNTEERING",
		label: "Volunteering Opportunity",
		icon: "🤝"
	},
	{
		value: "SCHOLARSHIP",
		label: "Scholarship",
		icon: "🎖️"
	},
	{
		value: "TRAINING",
		label: "Training & Bootcamp",
		icon: "📚"
	},
	{
		value: "TEAM_OPPORTUNITY",
		label: "Team Opportunity",
		icon: "👥"
	},
	{
		value: "CULTURAL_EVENT",
		label: "Cultural & Performing Arts",
		icon: "✨"
	},
	{
		value: "SPORTS",
		label: "Sports Tournament",
		icon: "⚽"
	},
	{
		value: "OTHER",
		label: "Other Opportunity",
		icon: "🌟"
	}
];
var VOLUNTEER_ROLE_PRESETS = [
	"Registration Desk",
	"Event Support",
	"Technical Support",
	"Photography",
	"Videography",
	"Social Media",
	"Marketing",
	"Crowd Management",
	"Workshop Assistant",
	"Team Leader"
];
function CreateEventDialog({ open, onOpenChange, managedOrgs: propManagedOrgs, categories: propCategories, initialOrganizationId, selectedOrgId, onEventCreated }) {
	useQueryClient();
	const fileInputRef = (0, import_react.useRef)(null);
	const orgsQuery = useQuery({
		queryKey: ["myOrganizations"],
		queryFn: () => directoryApi.myOrganizations(),
		enabled: !propManagedOrgs || propManagedOrgs.length === 0
	});
	const categoriesQuery = useQuery({
		queryKey: ["categories"],
		queryFn: () => eventsApi.categories(),
		enabled: !propCategories || propCategories.length === 0
	});
	const availableOrgs = propManagedOrgs && propManagedOrgs.length > 0 ? propManagedOrgs : orgsQuery.data || [];
	const availableCategories = propCategories && propCategories.length > 0 ? propCategories : categoriesQuery.data || [];
	const [activeSection, setActiveSection] = (0, import_react.useState)("DETAILS");
	const defaultOrgId = initialOrganizationId || (selectedOrgId && selectedOrgId !== "all" ? selectedOrgId : availableOrgs[0]?.organizationId || "");
	const [orgId, setOrgId] = (0, import_react.useState)(defaultOrgId);
	const [catId, setCatId] = (0, import_react.useState)(availableCategories[0]?.id || "");
	(0, import_react.useEffect)(() => {
		if (!orgId && availableOrgs.length > 0) setOrgId(defaultOrgId || availableOrgs[0]?.organizationId || "");
	}, [
		availableOrgs,
		defaultOrgId,
		orgId
	]);
	(0, import_react.useEffect)(() => {
		if (!catId && availableCategories.length > 0) setCatId(availableCategories[0]?.id || "");
	}, [availableCategories, catId]);
	const [opportunityType, setOpportunityType] = (0, import_react.useState)("COMPETITION");
	const [title, setTitle] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	const [isCustomSlug, setIsCustomSlug] = (0, import_react.useState)(false);
	const [summary, setSummary] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [bannerPreview, setBannerPreview] = (0, import_react.useState)(null);
	const [posterFile, setPosterFile] = (0, import_react.useState)(null);
	const [isUploadingImage, setIsUploadingImage] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("IN_PERSON");
	const [location, setLocation] = (0, import_react.useState)("");
	const [venue, setVenue] = (0, import_react.useState)("");
	const [meetingUrl, setMeetingUrl] = (0, import_react.useState)("");
	const [startDateTime, setStartDateTime] = (0, import_react.useState)("");
	const [endDateTime, setEndDateTime] = (0, import_react.useState)("");
	const [registrationDeadline, setRegistrationDeadline] = (0, import_react.useState)("");
	const [pricingMode, setPricingMode] = (0, import_react.useState)("FREE_FOR_ALL");
	const [price, setPrice] = (0, import_react.useState)("");
	const [studentPrice, setStudentPrice] = (0, import_react.useState)("");
	const [externalPrice, setExternalPrice] = (0, import_react.useState)("");
	const [capacity, setCapacity] = (0, import_react.useState)("");
	const [allowOnlineGateway, setAllowOnlineGateway] = (0, import_react.useState)(false);
	const [allowClubTransfer, setAllowClubTransfer] = (0, import_react.useState)(true);
	const [customPaymentInstructions, setCustomPaymentInstructions] = (0, import_react.useState)("");
	const { data: selectedOrgDetails } = useQuery({
		queryKey: [
			"organization",
			"details",
			orgId || defaultOrgId
		],
		queryFn: () => orgId || defaultOrgId ? directoryApi.organization(orgId || defaultOrgId) : null,
		enabled: Boolean(orgId || defaultOrgId)
	});
	const [isOptionalExpanded, setIsOptionalExpanded] = (0, import_react.useState)(false);
	const [contactEmail, setContactEmail] = (0, import_react.useState)("");
	const [contactPhone, setContactPhone] = (0, import_react.useState)("");
	const [instagramUrl, setInstagramUrl] = (0, import_react.useState)("");
	const [facebookUrl, setFacebookUrl] = (0, import_react.useState)("");
	const [websiteUrl, setWebsiteUrl] = (0, import_react.useState)("");
	const [officialEventUrl, setOfficialEventUrl] = (0, import_react.useState)("");
	const [supportingLecturer, setSupportingLecturer] = (0, import_react.useState)("");
	const [eligibility, setEligibility] = (0, import_react.useState)("");
	const [prizeInfo, setPrizeInfo] = (0, import_react.useState)("");
	const [teamSize, setTeamSize] = (0, import_react.useState)("");
	const [needsVolunteers, setNeedsVolunteers] = (0, import_react.useState)(false);
	const [volunteerTitle, setVolunteerTitle] = (0, import_react.useState)("");
	const [volunteerRoles, setVolunteerRoles] = (0, import_react.useState)([]);
	const [customRoleInput, setCustomRoleInput] = (0, import_react.useState)("");
	const [volunteerCapacity, setVolunteerCapacity] = (0, import_react.useState)("");
	const [volunteerAvailability, setVolunteerAvailability] = (0, import_react.useState)("");
	const [volunteerResponsibilities, setVolunteerResponsibilities] = (0, import_react.useState)("");
	const [volunteerBenefits, setVolunteerBenefits] = (0, import_react.useState)("");
	const [artistNamesInput, setArtistNamesInput] = (0, import_react.useState)("");
	const [musicGenre, setMusicGenre] = (0, import_react.useState)("");
	const [performanceSchedule, setPerformanceSchedule] = (0, import_react.useState)("");
	const [productionTitle, setProductionTitle] = (0, import_react.useState)("");
	const [dramaGenre, setDramaGenre] = (0, import_react.useState)("");
	const [castMembersInput, setCastMembersInput] = (0, import_react.useState)("");
	const [director, setDirector] = (0, import_react.useState)("");
	const [synopsis, setSynopsis] = (0, import_react.useState)("");
	const [programType, setProgramType] = (0, import_react.useState)("MSc");
	const [degreeAwarded, setDegreeAwarded] = (0, import_react.useState)("");
	const [studyMode, setStudyMode] = (0, import_react.useState)("Full-Time");
	const [programDuration, setProgramDuration] = (0, import_react.useState)("");
	const [fundingType, setFundingType] = (0, import_react.useState)("Fully Funded");
	const [scholarshipDetails, setScholarshipDetails] = (0, import_react.useState)("");
	const [entryQualifications, setEntryQualifications] = (0, import_react.useState)("");
	const [applicationRequirements, setApplicationRequirements] = (0, import_react.useState)("");
	const [intakePeriod, setIntakePeriod] = (0, import_react.useState)("");
	const [tuitionFee, setTuitionFee] = (0, import_react.useState)("");
	const [officialApplicationUrl, setOfficialApplicationUrl] = (0, import_react.useState)("");
	const [programUrl, setProgramUrl] = (0, import_react.useState)("");
	const [courseLevel, setCourseLevel] = (0, import_react.useState)("Certificate");
	const [courseCode, setCourseCode] = (0, import_react.useState)("");
	const [courseDuration, setCourseDuration] = (0, import_react.useState)("");
	const [workloadHoursPerWeek, setWorkloadHoursPerWeek] = (0, import_react.useState)("");
	const [prerequisites, setPrerequisites] = (0, import_react.useState)("");
	const [syllabus, setSyllabus] = (0, import_react.useState)("");
	const [instructor, setInstructor] = (0, import_react.useState)("");
	const [hasCertificate, setHasCertificate] = (0, import_react.useState)(true);
	const [enrollmentUrl, setEnrollmentUrl] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const handleTitleChange = (val) => {
		setTitle(val);
		if (!isCustomSlug) {
			const generated = val.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
			setSlug(generated);
		}
	};
	const handleImageFileChange = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 5242880) {
			toast.error("Image file size exceeds 5MB limit. Please choose a smaller image.");
			return;
		}
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
		if (fileInputRef.current) fileInputRef.current.value = "";
	};
	const handleToggleVolunteerRole = (role) => {
		if (volunteerRoles.includes(role)) setVolunteerRoles(volunteerRoles.filter((r) => r !== role));
		else setVolunteerRoles([...volunteerRoles, role]);
	};
	const handleAddCustomRole = () => {
		const trimmed = customRoleInput.trim();
		if (trimmed && !volunteerRoles.includes(trimmed)) {
			setVolunteerRoles([...volunteerRoles, trimmed]);
			setCustomRoleInput("");
		}
	};
	const validateForm = () => {
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
			if (new Date(registrationDeadline).getTime() > end) {
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
	const handleSubmit = async (e, publishDirectly = false) => {
		e.preventDefault();
		if (!validateForm()) return;
		if (publishDirectly && pricingMode !== "FREE_FOR_ALL") {
			if (!selectedOrgDetails?.bankName || !selectedOrgDetails?.bankAccountNumber) {
				toast.error("Society Bank Details Missing", { description: "Direct Club Bank Transfer is the only available payment method. Please configure society bank details before publishing a paid event." });
				setActiveSection("PRICING");
				return;
			}
		}
		setSubmitting(true);
		const targetOrgId = orgId || defaultOrgId;
		const targetCatId = catId || availableCategories[0]?.id || "";
		try {
			let uploadedPosterUrl = void 0;
			if (posterFile) {
				setIsUploadingImage(true);
				try {
					uploadedPosterUrl = (await eventsApi.uploadPoster(posterFile)).url;
				} catch (uploadErr) {
					toast.error("Failed to upload poster image: " + (uploadErr?.message || "Upload error"));
					setSubmitting(false);
					setIsUploadingImage(false);
					return;
				} finally {
					setIsUploadingImage(false);
				}
			} else if (bannerPreview && !bannerPreview.startsWith("blob:") && !bannerPreview.startsWith("data:")) uploadedPosterUrl = bannerPreview;
			const isFree = pricingMode === "FREE_FOR_ALL";
			const payload = {
				organizationId: targetOrgId,
				categoryId: targetCatId,
				title: title.trim(),
				slug: slug.trim(),
				status: publishDirectly ? "PUBLISHED" : "DRAFT",
				shortDescription: summary.trim() || void 0,
				description: description.trim() || summary.trim() || title.trim(),
				opportunityType,
				mode,
				location: (mode === "ONLINE" ? void 0 : venue.trim() || location.trim()) || void 0,
				venue: (mode === "ONLINE" ? void 0 : venue.trim() || location.trim()) || void 0,
				meetingUrl: (mode === "IN_PERSON" ? void 0 : meetingUrl.trim()) || void 0,
				startDate: new Date(startDateTime).toISOString(),
				endDate: new Date(endDateTime).toISOString(),
				registrationDeadline: registrationDeadline ? new Date(registrationDeadline).toISOString() : void 0,
				capacity: capacity ? Number(capacity) : void 0,
				isFree,
				pricingMode,
				price: pricingMode === "SINGLE_PRICE" ? Number(price) : void 0,
				studentPrice: pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL" ? Number(studentPrice) : pricingMode === "SINGLE_PRICE" ? Number(price) : 0,
				externalPrice: pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL" ? Number(externalPrice) : pricingMode === "SINGLE_PRICE" ? Number(price) : 0,
				currency: "LKR",
				allowClubTransfer: !isFree,
				allowOnlineGateway: false,
				customPaymentInstructions: !isFree ? customPaymentInstructions.trim() || void 0 : void 0,
				bannerUrl: uploadedPosterUrl || void 0,
				coverImageUrl: uploadedPosterUrl || void 0,
				posterUrl: uploadedPosterUrl || void 0,
				contactEmail: contactEmail.trim() || void 0,
				contactPhone: contactPhone.trim() || void 0,
				instagramUrl: instagramUrl.trim() || void 0,
				facebookUrl: facebookUrl.trim() || void 0,
				websiteUrl: websiteUrl.trim() || void 0,
				officialEventUrl: officialEventUrl.trim() || void 0,
				supportingLecturer: supportingLecturer.trim() || void 0,
				eligibility: eligibility.trim() || void 0,
				prizeInfo: prizeInfo.trim() || void 0,
				teamSize: teamSize.trim() || void 0,
				volunteerRoles: needsVolunteers && volunteerRoles.length > 0 ? volunteerRoles : [],
				volunteerCapacity: needsVolunteers && volunteerCapacity ? Number(volunteerCapacity) : void 0,
				volunteerAvailability: needsVolunteers && volunteerAvailability.trim() ? volunteerAvailability.trim() : void 0,
				volunteerResponsibilities: needsVolunteers && volunteerResponsibilities.trim() ? volunteerResponsibilities.trim() : void 0,
				volunteerBenefits: needsVolunteers && volunteerBenefits.trim() ? volunteerBenefits.trim() : void 0,
				artistNames: opportunityType === "MUSIC" && artistNamesInput.trim() ? artistNamesInput.split(",").map((a) => a.trim()).filter(Boolean) : void 0,
				musicGenre: opportunityType === "MUSIC" && musicGenre.trim() ? musicGenre.trim() : void 0,
				performanceSchedule: opportunityType === "MUSIC" && performanceSchedule.trim() ? performanceSchedule.trim() : void 0,
				productionTitle: opportunityType === "DRAMA" && productionTitle.trim() ? productionTitle.trim() : void 0,
				dramaGenre: opportunityType === "DRAMA" && dramaGenre.trim() ? dramaGenre.trim() : void 0,
				castMembers: opportunityType === "DRAMA" && castMembersInput.trim() ? castMembersInput.split(",").map((c) => c.trim()).filter(Boolean) : void 0,
				director: opportunityType === "DRAMA" && director.trim() ? director.trim() : void 0,
				synopsis: opportunityType === "DRAMA" && synopsis.trim() ? synopsis.trim() : void 0,
				programType: opportunityType === "HIGHER_STUDIES" && programType.trim() ? programType.trim() : void 0,
				degreeAwarded: opportunityType === "HIGHER_STUDIES" && degreeAwarded.trim() ? degreeAwarded.trim() : void 0,
				studyMode: opportunityType === "HIGHER_STUDIES" && studyMode.trim() ? studyMode.trim() : void 0,
				programDuration: opportunityType === "HIGHER_STUDIES" && programDuration.trim() ? programDuration.trim() : void 0,
				fundingType: opportunityType === "HIGHER_STUDIES" && fundingType.trim() ? fundingType.trim() : void 0,
				scholarshipDetails: opportunityType === "HIGHER_STUDIES" && scholarshipDetails.trim() ? scholarshipDetails.trim() : void 0,
				entryQualifications: opportunityType === "HIGHER_STUDIES" && entryQualifications.trim() ? entryQualifications.trim() : void 0,
				applicationRequirements: opportunityType === "HIGHER_STUDIES" && applicationRequirements.trim() ? applicationRequirements.trim() : void 0,
				intakePeriod: opportunityType === "HIGHER_STUDIES" && intakePeriod.trim() ? intakePeriod.trim() : void 0,
				tuitionFee: opportunityType === "HIGHER_STUDIES" && tuitionFee.trim() ? tuitionFee.trim() : void 0,
				officialApplicationUrl: opportunityType === "HIGHER_STUDIES" && officialApplicationUrl.trim() ? officialApplicationUrl.trim() : void 0,
				programUrl: opportunityType === "HIGHER_STUDIES" && programUrl.trim() ? programUrl.trim() : void 0,
				courseLevel: opportunityType === "UNIVERSITY_COURSE" && courseLevel.trim() ? courseLevel.trim() : void 0,
				courseCode: opportunityType === "UNIVERSITY_COURSE" && courseCode.trim() ? courseCode.trim() : void 0,
				courseDuration: opportunityType === "UNIVERSITY_COURSE" && courseDuration.trim() ? courseDuration.trim() : void 0,
				workloadHoursPerWeek: opportunityType === "UNIVERSITY_COURSE" && workloadHoursPerWeek.trim() ? workloadHoursPerWeek.trim() : void 0,
				prerequisites: opportunityType === "UNIVERSITY_COURSE" && prerequisites.trim() ? prerequisites.trim() : void 0,
				syllabus: opportunityType === "UNIVERSITY_COURSE" && syllabus.trim() ? syllabus.trim() : void 0,
				instructor: opportunityType === "UNIVERSITY_COURSE" && instructor.trim() ? instructor.trim() : void 0,
				hasCertificate: opportunityType === "UNIVERSITY_COURSE" ? hasCertificate : void 0,
				enrollmentUrl: opportunityType === "UNIVERSITY_COURSE" && enrollmentUrl.trim() ? enrollmentUrl.trim() : void 0
			};
			const created = await eventsApi.createEvent(payload);
			if (publishDirectly) toast.success(`Event "${title}" Published Successfully! 🚀`, { description: "Your event is live and discoverable to students across CampusPulse." });
			else toast.success("Event saved as Draft 📝", { description: "You can preview, edit, or publish it directly anytime." });
			onEventCreated?.(created, publishDirectly);
			onOpenChange(false);
			resetForm();
		} catch (err) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-3xl max-h-[92vh] overflow-y-auto p-0 gap-0 border-border bg-card shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "p-6 border-b border-border bg-muted/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-wider",
								children: "Event Creation Studio"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "text-xl font-black text-foreground",
							children: "Create New Opportunity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-xs text-muted-foreground",
							children: "Configure opportunity details, scheduling, tickets, and volunteer recruiting for your student organization."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 px-6 pt-3 border-b border-border bg-card overflow-x-auto text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActiveSection("DETAILS"),
							className: cn("flex items-center gap-1.5 px-3 py-2 font-bold border-b-2 transition-all whitespace-nowrap", activeSection === "DETAILS" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-4 items-center justify-center rounded-full bg-primary/10 text-[10px]",
								children: "1"
							}), "Event Details *"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActiveSection("TIMING"),
							className: cn("flex items-center gap-1.5 px-3 py-2 font-bold border-b-2 transition-all whitespace-nowrap", activeSection === "TIMING" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-4 items-center justify-center rounded-full bg-primary/10 text-[10px]",
								children: "2"
							}), "Date & Venue *"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActiveSection("PRICING"),
							className: cn("flex items-center gap-1.5 px-3 py-2 font-bold border-b-2 transition-all whitespace-nowrap", activeSection === "PRICING" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-4 items-center justify-center rounded-full bg-primary/10 text-[10px]",
								children: "3"
							}), "Ticketing & Pricing *"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActiveSection("OPTIONAL"),
							className: cn("flex items-center gap-1.5 px-3 py-2 font-bold border-b-2 transition-all whitespace-nowrap", activeSection === "OPTIONAL" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-4 items-center justify-center rounded-full bg-muted text-[10px]",
								children: "4"
							}), "Additional Info"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActiveSection("VOLUNTEERING"),
							className: cn("flex items-center gap-1.5 px-3 py-2 font-bold border-b-2 transition-all whitespace-nowrap", activeSection === "VOLUNTEERING" ? "border-rose-500 text-rose-600 dark:text-rose-400" : "border-transparent text-muted-foreground hover:text-foreground"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-4 items-center justify-center rounded-full bg-rose-500/10 text-rose-500 text-[10px]",
									children: "5"
								}),
								"Volunteering ",
								needsVolunteers ? "✓" : "(Optional)"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => handleSubmit(e, false),
					className: "p-6 space-y-6",
					children: [
						activeSection === "DETAILS" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 animate-in fade-in-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "create-org",
												className: "text-xs font-bold",
												children: ["Organizing Society ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												id: "create-org",
												className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary",
												value: orgId || defaultOrgId,
												onChange: (e) => setOrgId(e.target.value),
												required: true,
												children: availableOrgs.map((org) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
													value: org.organizationId,
													children: [
														org.organizationName,
														" (",
														org.role.replace(/_/g, " "),
														")"
													]
												}, org.organizationId))
											}),
											availableOrgs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-destructive",
												children: "You must be an active Leader or Event Organizer of a society to create events."
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "create-category",
											className: "text-xs font-bold",
											children: ["Category ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											id: "create-category",
											className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary",
											value: catId || availableCategories[0]?.id || "",
											onChange: (e) => setCatId(e.target.value),
											required: true,
											children: availableCategories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: c.id,
												children: c.name
											}, c.id))
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "create-type",
										className: "text-xs font-bold",
										children: ["Opportunity Type ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: "create-type",
										className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary",
										value: opportunityType,
										onChange: (e) => setOpportunityType(e.target.value),
										required: true,
										children: OPPORTUNITY_TYPE_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: opt.value,
											children: [
												opt.icon,
												" ",
												opt.label
											]
										}, opt.value))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "create-title",
										className: "text-xs font-bold",
										children: ["Opportunity Title ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "create-title",
										placeholder: "e.g. SLIIT National Inter-University Hackathon 2026",
										value: title,
										onChange: (e) => handleTitleChange(e.target.value),
										className: "text-xs",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "create-slug",
											className: "text-xs font-bold",
											children: ["URL Slug ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setIsCustomSlug(!isCustomSlug),
											className: "text-[11px] text-primary hover:underline",
											children: isCustomSlug ? "Auto-generate from title" : "Customize URL slug"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center rounded-lg border border-input bg-background px-3 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 text-muted-foreground/70",
											children: "campuspulse.lk/events/"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "create-slug",
											className: "w-full bg-transparent py-2 pl-1 text-xs text-foreground focus:outline-none",
											placeholder: "sliit-hackathon-2026",
											value: slug,
											onChange: (e) => {
												setIsCustomSlug(true);
												setSlug(e.target.value);
											},
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "create-summary",
										className: "text-xs font-bold",
										children: "Summary / Tagline (Optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "create-summary",
										placeholder: "Brief one-line hook for event cards (max 150 chars)",
										value: summary,
										onChange: (e) => setSummary(e.target.value),
										className: "text-xs",
										maxLength: 200
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "create-desc",
										className: "text-xs font-bold",
										children: ["Full Description ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "create-desc",
										placeholder: "Comprehensive event details, agenda, rules, submission guidelines, and schedule...",
										rows: 4,
										value: description,
										onChange: (e) => setDescription(e.target.value),
										className: "text-xs",
										required: true
									})]
								}),
								opportunityType === "MUSIC" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-pink-500/30 bg-pink-500/5 p-4 space-y-4 animate-in fade-in-50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-pink-700 dark:text-pink-300 font-bold text-xs uppercase tracking-wider",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Music & Entertainment Details" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "music-artists",
													className: "text-xs font-bold",
													children: "Artist / Band Lineup (Comma-separated)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "music-artists",
													placeholder: "e.g. Bathiya & Santhush, Daddy, The Voice All-Stars",
													value: artistNamesInput,
													onChange: (e) => setArtistNamesInput(e.target.value),
													className: "text-xs"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "music-genre",
													className: "text-xs font-bold",
													children: "Music Genre / Performance Style"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "music-genre",
													placeholder: "e.g. Fusion Rock, Acoustic Pop, DJ Night, Classical Showcase",
													value: musicGenre,
													onChange: (e) => setMusicGenre(e.target.value),
													className: "text-xs"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "music-schedule",
												className: "text-xs font-bold",
												children: "Performance Schedule & Set Times (Optional)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												id: "music-schedule",
												placeholder: "• 5:30 PM: Gates Open & Sound Check\n• 6:30 PM: Opening Act by University Band\n• 8:00 PM: Main Headliner Performance\n• 11:00 PM: Grand Finale",
												rows: 3,
												value: performanceSchedule,
												onChange: (e) => setPerformanceSchedule(e.target.value),
												className: "text-xs"
											})]
										})
									]
								}),
								opportunityType === "DRAMA" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-violet-500/30 bg-violet-500/5 p-4 space-y-4 animate-in fade-in-50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-violet-700 dark:text-violet-300 font-bold text-xs uppercase tracking-wider",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Theater, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Drama & Performing Arts Production Details" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "drama-title",
													className: "text-xs font-bold",
													children: "Production Title / Show Name"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "drama-title",
													placeholder: "e.g. Kuveni - The Musical Revival",
													value: productionTitle,
													onChange: (e) => setProductionTitle(e.target.value),
													className: "text-xs"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "drama-genre",
													className: "text-xs font-bold",
													children: "Theatre Genre / Category"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "drama-genre",
													placeholder: "e.g. Stage Play, Musical Theatre, Short Film Screening, Comedy Drama",
													value: dramaGenre,
													onChange: (e) => setDramaGenre(e.target.value),
													className: "text-xs"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "drama-director",
													className: "text-xs font-bold",
													children: "Director / Production Company"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "drama-director",
													placeholder: "e.g. Directed by University Drama Society & Alumni",
													value: director,
													onChange: (e) => setDirector(e.target.value),
													className: "text-xs"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "drama-cast",
													className: "text-xs font-bold",
													children: "Key Cast & Performers (Comma-separated)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "drama-cast",
													placeholder: "e.g. Kasun Fernando (Lead), Amaya Silva, Drama Ensemble",
													value: castMembersInput,
													onChange: (e) => setCastMembersInput(e.target.value),
													className: "text-xs"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "drama-synopsis",
												className: "text-xs font-bold",
												children: "Synopsis / Story Overview"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												id: "drama-synopsis",
												placeholder: "An inspiring 2-hour stage performance depicting youth leadership, culture, and theatrical innovation...",
												rows: 3,
												value: synopsis,
												onChange: (e) => setSynopsis(e.target.value),
												className: "text-xs"
											})]
										})
									]
								}),
								opportunityType === "HIGHER_STUDIES" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-sky-500/30 bg-sky-500/5 p-4 space-y-4 animate-in fade-in-50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-sky-700 dark:text-sky-300 font-bold text-xs uppercase tracking-wider",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Higher Studies & Academic Program Configuration" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "hs-program-type",
														className: "text-xs font-bold",
														children: "Qualification Award Level"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														id: "hs-program-type",
														className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary",
														value: programType,
														onChange: (e) => setProgramType(e.target.value),
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "MSc",
																children: "MSc — Master of Science"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Master's",
																children: "Master's Degree (MA, MBA, MEng)"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "MPhil",
																children: "MPhil — Master of Philosophy"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "PhD",
																children: "PhD / Doctoral Degree"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Postgraduate Diploma",
																children: "Postgraduate Diploma (PgD)"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Postdoctoral Fellowship",
																children: "Postdoctoral Fellowship"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Open Day",
																children: "Postgraduate Open Day / Info Session"
															})
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "hs-degree",
														className: "text-xs font-bold",
														children: "Degree / Award Title"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "hs-degree",
														placeholder: "e.g. Master of Science in Data Science & AI",
														value: degreeAwarded,
														onChange: (e) => setDegreeAwarded(e.target.value),
														className: "text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "hs-mode",
														className: "text-xs font-bold",
														children: "Study Mode"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														id: "hs-mode",
														className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary",
														value: studyMode,
														onChange: (e) => setStudyMode(e.target.value),
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Full-Time",
																children: "Full-Time (On-Campus)"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Part-Time",
																children: "Part-Time / Weekend"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Hybrid",
																children: "Hybrid / Blended Learning"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Online",
																children: "100% Online Distance Learning"
															})
														]
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "hs-funding",
														className: "text-xs font-bold",
														children: "Funding Availability"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														id: "hs-funding",
														className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary",
														value: fundingType,
														onChange: (e) => setFundingType(e.target.value),
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Fully Funded",
																children: "Fully Funded (Tuition + Stipend)"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Partially Funded",
																children: "Partially Funded (Tuition Waiver)"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Self-Funded",
																children: "Self-Funded / Fee Paying"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Research Assistantship",
																children: "Research Assistantship / Grant"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Scholarship Available",
																children: "Merit Scholarships Available"
															})
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "hs-duration",
														className: "text-xs font-bold",
														children: "Program Duration"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "hs-duration",
														placeholder: "e.g. 2 Years (Full-Time) / 3 Years (Part-Time)",
														value: programDuration,
														onChange: (e) => setProgramDuration(e.target.value),
														className: "text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "hs-intake",
														className: "text-xs font-bold",
														children: "Intake / Academic Term"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "hs-intake",
														placeholder: "e.g. September 2026 / Spring 2027",
														value: intakePeriod,
														onChange: (e) => setIntakePeriod(e.target.value),
														className: "text-xs"
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "hs-scholarship",
													className: "text-xs font-bold",
													children: "Scholarship & Stipend Details"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													id: "hs-scholarship",
													placeholder: "Details of monthly living allowance, research grants, tuition discounts, or sponsor awards...",
													rows: 2,
													value: scholarshipDetails,
													onChange: (e) => setScholarshipDetails(e.target.value),
													className: "text-xs"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "hs-tuition",
													className: "text-xs font-bold",
													children: "Tuition Fee & Pricing Structure"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "hs-tuition",
													placeholder: "e.g. LKR 1,500,000 (Local) / USD 6,000 (International)",
													value: tuitionFee,
													onChange: (e) => setTuitionFee(e.target.value),
													className: "text-xs"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "hs-qualifications",
													className: "text-xs font-bold",
													children: "Minimum Entry Qualifications"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													id: "hs-qualifications",
													placeholder: "• Recognized Bachelor's Honours degree with minimum GPA 3.0\n• IELTS 6.5 or equivalent English proficiency\n• 1+ year industry/research experience preferred",
													rows: 3,
													value: entryQualifications,
													onChange: (e) => setEntryQualifications(e.target.value),
													className: "text-xs"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "hs-requirements",
													className: "text-xs font-bold",
													children: "Required Documents & Checklist"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													id: "hs-requirements",
													placeholder: "• Official Academic Transcripts & Degree Certificates\n• Statement of Purpose (SOP) & Curriculum Vitae\n• 2 Letters of Recommendation (Academic & Professional)",
													rows: 3,
													value: applicationRequirements,
													onChange: (e) => setApplicationRequirements(e.target.value),
													className: "text-xs"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "hs-app-url",
													className: "text-xs font-bold",
													children: "Official Application Portal URL (External)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "hs-app-url",
													type: "url",
													placeholder: "https://apply.university.edu/postgraduate/apply",
													value: officialApplicationUrl,
													onChange: (e) => setOfficialApplicationUrl(e.target.value),
													className: "text-xs"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "hs-prog-url",
													className: "text-xs font-bold",
													children: "Official Program Brochure / Info URL"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "hs-prog-url",
													type: "url",
													placeholder: "https://university.edu/degrees/msc-ai-robotics",
													value: programUrl,
													onChange: (e) => setProgramUrl(e.target.value),
													className: "text-xs"
												})]
											})]
										})
									]
								}),
								opportunityType === "UNIVERSITY_COURSE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-teal-500/30 bg-teal-500/5 p-4 space-y-4 animate-in fade-in-50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-teal-700 dark:text-teal-300 font-bold text-xs uppercase tracking-wider",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenCheck, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "University Course & Professional Learning Configuration" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "course-level",
														className: "text-xs font-bold",
														children: "Course Level / Credential"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														id: "course-level",
														className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary",
														value: courseLevel,
														onChange: (e) => setCourseLevel(e.target.value),
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Certificate",
																children: "Certificate Program"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Professional Development",
																children: "Professional Development Course"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Diploma",
																children: "University Diploma"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Short Course",
																children: "Short Technical Course"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Undergraduate Module",
																children: "Undergraduate Open Module"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Executive Education",
																children: "Executive Education & Training"
															})
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "course-code",
														className: "text-xs font-bold",
														children: "Course Code (Optional)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "course-code",
														placeholder: "e.g. CS-4089 / CCNA-PRO",
														value: courseCode,
														onChange: (e) => setCourseCode(e.target.value),
														className: "text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "course-duration",
														className: "text-xs font-bold",
														children: "Course Duration & Schedule"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "course-duration",
														placeholder: "e.g. 12 Weeks (Saturdays 9 AM - 1 PM)",
														value: courseDuration,
														onChange: (e) => setCourseDuration(e.target.value),
														className: "text-xs"
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "course-workload",
														className: "text-xs font-bold",
														children: "Expected Workload"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "course-workload",
														placeholder: "e.g. 4-6 hours / week",
														value: workloadHoursPerWeek,
														onChange: (e) => setWorkloadHoursPerWeek(e.target.value),
														className: "text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "course-instructor",
														className: "text-xs font-bold",
														children: "Instructor / Department Lead"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "course-instructor",
														placeholder: "e.g. Prof. R. Jayasinghe, Faculty of Computing",
														value: instructor,
														onChange: (e) => setInstructor(e.target.value),
														className: "text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs font-bold",
														children: "Certificate Included?"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => setHasCertificate(!hasCertificate),
														className: cn("w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-bold transition-all", hasCertificate ? "border-teal-500 bg-teal-500/10 text-teal-700 dark:text-teal-300" : "border-border text-muted-foreground hover:bg-surface"),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verified Digital Certificate" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hasCertificate ? "✓ Yes" : "✕ No" })]
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "course-prereq",
													className: "text-xs font-bold",
													children: "Prerequisites & Target Audience"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													id: "course-prereq",
													placeholder: "• Basic familiarity with web technologies or programming\n• Open to all undergraduates and working professionals",
													rows: 3,
													value: prerequisites,
													onChange: (e) => setPrerequisites(e.target.value),
													className: "text-xs"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "course-syllabus",
													className: "text-xs font-bold",
													children: "Syllabus & Core Learning Outcomes"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													id: "course-syllabus",
													placeholder: "• Week 1-3: Foundations & Principles\n• Week 4-8: Hands-on Practical Labs & Case Studies\n• Week 9-12: Capstone Industry Project & Assessment",
													rows: 3,
													value: syllabus,
													onChange: (e) => setSyllabus(e.target.value),
													className: "text-xs"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "course-enroll-url",
												className: "text-xs font-bold",
												children: "Official University Enrollment / Registration URL"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "course-enroll-url",
												type: "url",
												placeholder: "https://courses.university.edu/enroll/2026",
												value: enrollmentUrl,
												onChange: (e) => setEnrollmentUrl(e.target.value),
												className: "text-xs"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 rounded-xl border border-border bg-surface/50 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											className: "text-xs font-bold flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-4 text-primary" }), "Event Poster or Banner Attachment (Optional)"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground",
											children: "Upload an event promotional poster or header banner. (PNG, JPG, WEBP up to 5MB)."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											ref: fileInputRef,
											type: "file",
											accept: "image/png, image/jpeg, image/webp",
											className: "hidden",
											onChange: handleImageFileChange
										}),
										bannerPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative rounded-lg overflow-hidden border border-border group max-w-md",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: bannerPreview,
												alt: "Banner Preview",
												className: "w-full h-40 object-cover"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													type: "button",
													size: "sm",
													variant: "secondary",
													className: "text-xs gap-1 h-8",
													onClick: () => fileInputRef.current?.click(),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" }), " Replace"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													type: "button",
													size: "sm",
													variant: "destructive",
													className: "text-xs gap-1 h-8",
													onClick: handleRemoveImage,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), " Remove"]
												})]
											})]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => fileInputRef.current?.click(),
											className: "flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-6 text-muted-foreground mb-2" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-semibold text-foreground",
													children: "Click to upload event banner / poster"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground mt-0.5",
													children: "Recommended resolution: 1200 × 630 px"
												})
											]
										})
									]
								})
							]
						}),
						activeSection === "TIMING" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 animate-in fade-in-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "start-date",
											className: "text-xs font-bold",
											children: ["Start Date & Time ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "start-date",
											type: "datetime-local",
											value: startDateTime,
											onChange: (e) => setStartDateTime(e.target.value),
											className: "text-xs",
											required: true
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "end-date",
											className: "text-xs font-bold",
											children: ["End Date & Time ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "end-date",
											type: "datetime-local",
											value: endDateTime,
											onChange: (e) => setEndDateTime(e.target.value),
											className: "text-xs",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "reg-deadline",
											className: "text-xs font-bold",
											children: "Registration Deadline (Optional)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "reg-deadline",
											type: "datetime-local",
											value: registrationDeadline,
											onChange: (e) => setRegistrationDeadline(e.target.value),
											className: "text-xs"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground",
											children: "Registrations will automatically close after this cutoff timestamp."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "event-mode",
										className: "text-xs font-bold",
										children: ["Event Mode ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-3 gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setMode("IN_PERSON"),
												className: cn("flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-bold transition-all", mode === "IN_PERSON" ? "border-primary bg-primary/10 text-primary shadow-xs" : "border-border text-muted-foreground hover:bg-surface"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 mb-1" }), "In-Person"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setMode("ONLINE"),
												className: cn("flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-bold transition-all", mode === "ONLINE" ? "border-primary bg-primary/10 text-primary shadow-xs" : "border-border text-muted-foreground hover:bg-surface"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4 mb-1" }), "Online"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setMode("HYBRID"),
												className: cn("flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-bold transition-all", mode === "HYBRID" ? "border-primary bg-primary/10 text-primary shadow-xs" : "border-border text-muted-foreground hover:bg-surface"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 mb-1" }), "Hybrid"]
											})
										]
									})]
								}),
								(mode === "IN_PERSON" || mode === "HYBRID") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 animate-in fade-in-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "create-venue",
										className: "text-xs font-bold",
										children: ["Venue / Campus Location ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "create-venue",
										placeholder: "e.g. Main Auditorium, Computing Faculty, SLIIT Malabe Campus",
										value: venue,
										onChange: (e) => {
											setVenue(e.target.value);
											setLocation(e.target.value);
										},
										className: "text-xs",
										required: true
									})]
								}),
								(mode === "ONLINE" || mode === "HYBRID") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 animate-in fade-in-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "create-meeting",
										className: "text-xs font-bold",
										children: "Online Meeting / Stream URL (Optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "create-meeting",
										type: "url",
										placeholder: "https://zoom.us/j/... or https://meet.google.com/...",
										value: meetingUrl,
										onChange: (e) => setMeetingUrl(e.target.value),
										className: "text-xs"
									})]
								})
							]
						}),
						activeSection === "PRICING" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 animate-in fade-in-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-primary font-bold text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ticketing & Pricing Models" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground leading-relaxed",
										children: "CampusPulse calculates ticket prices server-side upon registration based on the attendee's verified university status. Paid events can be drafted and published before production payment gateway setup."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold",
											children: "Select Pricing Structure *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary",
											value: pricingMode,
											onChange: (e) => setPricingMode(e.target.value),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "FREE_FOR_ALL",
													children: "Free for All Participants — Rs. 0"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "SINGLE_PRICE",
													children: "One Fixed Price for All Attendees"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "STUDENT_AND_EXTERNAL_PRICE",
													children: "Tiered: Verified University Students vs External Attendees"
												})
											]
										})]
									}),
									pricingMode === "SINGLE_PRICE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5 pt-2 animate-in fade-in-50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "single-price",
											className: "text-xs font-bold",
											children: "Standard Admission Price (LKR / Rs.) *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "single-price",
											type: "number",
											min: "0",
											placeholder: "e.g. 500",
											value: price,
											onChange: (e) => setPrice(e.target.value),
											className: "text-xs",
											required: true
										})]
									}),
									pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 sm:grid-cols-2 pt-2 animate-in fade-in-50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "student-price",
													className: "text-xs font-bold",
													children: "Verified Student Price (Rs.) *"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "student-price",
													type: "number",
													min: "0",
													placeholder: "e.g. 0 (Free for students) or 250",
													value: studentPrice,
													onChange: (e) => setStudentPrice(e.target.value),
													className: "text-xs",
													required: true
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground",
													children: "Applied to participants with a verified university email."
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "external-price",
													className: "text-xs font-bold",
													children: "External / General Price (Rs.) *"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "external-price",
													type: "number",
													min: "0",
													placeholder: "e.g. 1000",
													value: externalPrice,
													onChange: (e) => setExternalPrice(e.target.value),
													className: "text-xs",
													required: true
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground",
													children: "Applied to public or external non-student attendees."
												})
											]
										})]
									}),
									pricingMode !== "FREE_FOR_ALL" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 pt-3 border-t border-border/60",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold text-foreground block",
											children: "Accepted Payment Method *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-start gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-5" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-xs space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-bold text-foreground block text-sm",
															children: "Direct Bank Transfer to Club"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-muted-foreground leading-relaxed",
															children: "Under the current release, Direct Bank Transfer is the exclusive payment method for paid events. Attendees deposit funds directly into your society bank account and submit proof of payment. An authorized financial officer verifies the transfer before admission passes are generated."
														})]
													})]
												}),
												selectedOrgDetails?.bankAccountNumber ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-bold text-emerald-700 dark:text-emerald-400 block mb-1",
														children: "✓ Society Bank Account Configured"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-[11px] text-foreground space-y-0.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-muted-foreground",
																	children: "Bank:"
																}),
																" ",
																selectedOrgDetails.bankName,
																" ",
																selectedOrgDetails.bankBranch ? `(${selectedOrgDetails.bankBranch})` : ""
															] }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-muted-foreground",
																	children: "Account Name:"
																}),
																" ",
																selectedOrgDetails.bankAccountName
															] }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-muted-foreground",
																	children: "Account Number:"
																}),
																" ",
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-mono font-bold",
																	children: selectedOrgDetails.bankAccountNumber
																})
															] })
														]
													})]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-bold text-rose-600 dark:text-rose-400 block mb-1",
														children: "⚠️ Society Bank Details Missing"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[11px] text-muted-foreground",
														children: "This society has not saved its bank account details. You can save this event as a Draft, but valid bank details in Society Settings are required before publishing paid events."
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5 pt-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "custom-instructions",
															className: "text-xs font-bold",
															children: "Event-Specific Bank Transfer Instructions (Optional)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
															id: "custom-instructions",
															placeholder: "e.g. Please put event name and your Student ID in the transaction remarks and upload slip here.",
															value: customPaymentInstructions,
															onChange: (e) => setCustomPaymentInstructions(e.target.value),
															rows: 2,
															className: "text-xs"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[10px] text-muted-foreground",
															children: "Shown to students alongside bank account details during registration."
														})
													]
												})
											]
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "create-capacity",
										className: "text-xs font-bold",
										children: "Maximum Event Capacity / Headcount (Optional)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "create-capacity",
										type: "number",
										min: "1",
										placeholder: "e.g. 250 (Leave blank for unlimited)",
										value: capacity,
										onChange: (e) => setCapacity(e.target.value),
										className: "text-xs"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "When reached, additional registrations will be blocked automatically."
									})
								]
							})]
						}),
						activeSection === "OPTIONAL" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 animate-in fade-in-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-card p-4 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-bold uppercase tracking-wider text-foreground",
										children: "Supporting Links & Contacts"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "Optional contact references, social links, and academic advisors."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "contact-email",
												className: "text-xs font-bold",
												children: "Contact Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "contact-email",
												type: "email",
												placeholder: "e.g. events@society.sliit.lk",
												value: contactEmail,
												onChange: (e) => setContactEmail(e.target.value),
												className: "text-xs"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "contact-phone",
												className: "text-xs font-bold",
												children: "Contact Phone"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "contact-phone",
												type: "tel",
												placeholder: "e.g. +94 77 123 4567",
												value: contactPhone,
												onChange: (e) => setContactPhone(e.target.value),
												className: "text-xs"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 sm:grid-cols-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "instagram-url",
													className: "text-xs font-bold",
													children: "Instagram URL"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "instagram-url",
													type: "url",
													placeholder: "https://instagram.com/...",
													value: instagramUrl,
													onChange: (e) => setInstagramUrl(e.target.value),
													className: "text-xs"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "facebook-url",
													className: "text-xs font-bold",
													children: "Facebook URL"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "facebook-url",
													type: "url",
													placeholder: "https://facebook.com/...",
													value: facebookUrl,
													onChange: (e) => setFacebookUrl(e.target.value),
													className: "text-xs"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "website-url",
													className: "text-xs font-bold",
													children: "Official Website"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "website-url",
													type: "url",
													placeholder: "https://hackathon.lk",
													value: websiteUrl,
													onChange: (e) => setWebsiteUrl(e.target.value),
													className: "text-xs"
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "supporting-lecturer",
											className: "text-xs font-bold",
											children: "Supporting Lecturer / Society Advisor"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "supporting-lecturer",
											placeholder: "e.g. Dr. A. B. Perera (Senior Lecturer & Patron)",
											value: supportingLecturer,
											onChange: (e) => setSupportingLecturer(e.target.value),
											className: "text-xs"
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "create-eligibility",
											className: "text-xs font-bold",
											children: "Eligibility Summary"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "create-eligibility",
											placeholder: "e.g. All undergraduates",
											value: eligibility,
											onChange: (e) => setEligibility(e.target.value),
											className: "text-xs"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "create-prize",
											className: "text-xs font-bold",
											children: "Prize Info"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "create-prize",
											placeholder: "e.g. Rs. 500,000 Pool",
											value: prizeInfo,
											onChange: (e) => setPrizeInfo(e.target.value),
											className: "text-xs"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "create-teamsize",
											className: "text-xs font-bold",
											children: "Team Size"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "create-teamsize",
											placeholder: "e.g. Teams of 3-4, or Individual",
											value: teamSize,
											onChange: (e) => setTeamSize(e.target.value),
											className: "text-xs"
										})]
									})
								]
							})]
						}),
						activeSection === "VOLUNTEERING" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-5 animate-in fade-in-50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-card p-5 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-5 text-rose-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-sm font-bold text-foreground",
											children: "Volunteer Opportunity Configuration"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Recruit student volunteers for organizing, coordination, technical support, and logistics."
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border bg-surface/50 p-4 space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold text-foreground",
											children: "Does this event need volunteers?"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid sm:grid-cols-2 gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setNeedsVolunteers(false),
												className: cn("flex items-start gap-3 p-3 rounded-lg border text-left transition-all", !needsVolunteers ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary" : "border-border text-muted-foreground hover:bg-card"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("flex size-4 shrink-0 rounded-full border items-center justify-center mt-0.5", !needsVolunteers ? "border-primary bg-primary text-white" : "border-muted-foreground"),
													children: !needsVolunteers && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-white" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-bold text-foreground",
													children: "No, this event does not need volunteers"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-muted-foreground mt-0.5",
													children: "Regular attendees can register normally. No volunteer recruiting section will appear."
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setNeedsVolunteers(true),
												className: cn("flex items-start gap-3 p-3 rounded-lg border text-left transition-all", needsVolunteers ? "border-rose-500 bg-rose-500/10 text-foreground ring-1 ring-rose-500" : "border-border text-muted-foreground hover:bg-card"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("flex size-4 shrink-0 rounded-full border items-center justify-center mt-0.5", needsVolunteers ? "border-rose-500 bg-rose-500 text-white" : "border-muted-foreground"),
													children: needsVolunteers && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-white" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-bold text-foreground",
													children: "Yes, configure volunteer opportunities"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-muted-foreground mt-0.5",
													children: "Set up volunteer roles, target capacity, responsibilities, and verified certificates."
												})] })]
											})]
										})]
									}),
									needsVolunteers && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4 pt-2 animate-in fade-in-50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs font-bold",
														children: "Select Available Volunteer Roles"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex flex-wrap gap-1.5",
														children: VOLUNTEER_ROLE_PRESETS.map((preset) => {
															const isSelected = volunteerRoles.includes(preset);
															return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																type: "button",
																onClick: () => handleToggleVolunteerRole(preset),
																className: cn("rounded-full px-2.5 py-1 text-xs font-semibold transition-all flex items-center gap-1", isSelected ? "bg-rose-500 text-white shadow-xs" : "bg-surface border border-border text-muted-foreground hover:text-foreground"),
																children: [
																	preset,
																	" ",
																	isSelected && "✓"
																]
															}, preset);
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex gap-2 pt-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															placeholder: "Add custom role (e.g. Stage Host, Livestream Operator)...",
															value: customRoleInput,
															onChange: (e) => setCustomRoleInput(e.target.value),
															className: "text-xs h-8",
															onKeyDown: (e) => {
																if (e.key === "Enter") {
																	e.preventDefault();
																	handleAddCustomRole();
																}
															}
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															type: "button",
															variant: "outline",
															size: "sm",
															onClick: handleAddCustomRole,
															className: "text-xs h-8 shrink-0",
															children: "+ Add Role"
														})]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-4 sm:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "vol-capacity",
														className: "text-xs font-bold",
														children: "Volunteer Target Capacity"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "vol-capacity",
														type: "number",
														min: "1",
														placeholder: "e.g. 15 student volunteers",
														value: volunteerCapacity,
														onChange: (e) => setVolunteerCapacity(e.target.value),
														className: "text-xs"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "vol-avail",
														className: "text-xs font-bold",
														children: "Availability & Time Commitment"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "vol-avail",
														placeholder: "e.g. Full day on event dates + 1 hour online briefing",
														value: volunteerAvailability,
														onChange: (e) => setVolunteerAvailability(e.target.value),
														className: "text-xs"
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "vol-resp",
													className: "text-xs font-bold",
													children: "Volunteer Responsibilities"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													id: "vol-resp",
													placeholder: "• Assist with attendee check-in and delegate passes\n• Guide student teams to designated arenas\n• Manage audio equipment and stage transitions",
													rows: 3,
													value: volunteerResponsibilities,
													onChange: (e) => setVolunteerResponsibilities(e.target.value),
													className: "text-xs"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "vol-benefits",
													className: "text-xs font-bold",
													children: "Volunteer Benefits & Perks"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													id: "vol-benefits",
													placeholder: "• Official Verified Certificate of Volunteering\n• Complimentary crew t-shirt and meals\n• Direct networking with guest speakers and industry partners",
													rows: 3,
													value: volunteerBenefits,
													onChange: (e) => setVolunteerBenefits(e.target.value),
													className: "text-xs"
												})]
											})
										]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => onOpenChange(false),
									children: "Cancel"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "secondary",
									size: "sm",
									disabled: submitting || availableOrgs.length === 0,
									onClick: (e) => handleSubmit(e, false),
									className: "font-bold text-xs",
									children: submitting ? "Saving…" : "Save as Draft"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									size: "sm",
									disabled: submitting || availableOrgs.length === 0,
									onClick: (e) => handleSubmit(e, true),
									className: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), submitting ? "Publishing…" : "Publish Event"]
								})]
							})]
						})
					]
				})
			]
		})
	});
}
function EventPaymentClaimsView({ eventId, eventTitle, onClaimProcessed }) {
	const queryClient = useQueryClient();
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("ALL");
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedProofUrl, setSelectedProofUrl] = (0, import_react.useState)(null);
	const [confirmingClaim, setConfirmingClaim] = (0, import_react.useState)(null);
	const [confirmNotes, setConfirmNotes] = (0, import_react.useState)("");
	const [rejectingClaim, setRejectingClaim] = (0, import_react.useState)(null);
	const [rejectReason, setRejectReason] = (0, import_react.useState)("");
	const [copiedId, setCopiedId] = (0, import_react.useState)(null);
	const claimsQuery = useQuery({
		queryKey: [
			"payments",
			"claims",
			eventId,
			statusFilter
		],
		queryFn: () => participationApi.getEventPaymentClaims({
			eventId,
			status: statusFilter === "ALL" ? void 0 : statusFilter
		})
	});
	const claims = Array.isArray(claimsQuery.data) ? claimsQuery.data : [];
	const stats = (0, import_react.useMemo)(() => {
		let pending = 0;
		let confirmed = 0;
		let rejected = 0;
		for (const c of claims) if (c.status === "PROCESSING" || c.status === "PENDING") pending++;
		else if (c.status === "PAID") confirmed++;
		else if (c.status === "FAILED") rejected++;
		return {
			total: claims.length,
			pending,
			confirmed,
			rejected
		};
	}, [claims]);
	const filteredClaims = (0, import_react.useMemo)(() => {
		return claims.filter((c) => {
			if (!c) return false;
			if (statusFilter === "PROCESSING" && c.status !== "PROCESSING" && c.status !== "PENDING") return false;
			if (statusFilter === "PAID" && c.status !== "PAID") return false;
			if (statusFilter === "FAILED" && c.status !== "FAILED") return false;
			if (search.trim()) {
				const s = search.toLowerCase();
				const payerName = c.payer?.name?.toLowerCase() || "";
				const payerEmail = c.payer?.email?.toLowerCase() || "";
				const ref = (c.referenceNumber || c.providerPaymentId || "").toLowerCase();
				return payerName.includes(s) || payerEmail.includes(s) || ref.includes(s);
			}
			return true;
		});
	}, [
		claims,
		statusFilter,
		search
	]);
	const verifyMutation = useMutation({
		mutationFn: ({ paymentId, notes }) => participationApi.verifyPaymentClaim(paymentId, notes),
		onSuccess: () => {
			toast.success("Payment verified & admission pass issued! 💳", { description: "The student registration is now CONFIRMED and entry QR ticket is active." });
			setConfirmingClaim(null);
			setConfirmNotes("");
			queryClient.invalidateQueries({ queryKey: ["payments", "claims"] });
			queryClient.invalidateQueries({ queryKey: [
				"events",
				"participants",
				eventId
			] });
			queryClient.invalidateQueries({ queryKey: [
				"events",
				"manage",
				eventId
			] });
			queryClient.invalidateQueries({ queryKey: ["registrations"] });
			queryClient.invalidateQueries({ queryKey: ["payments"] });
			onClaimProcessed?.();
		},
		onError: (err) => {
			const status = err?.status || err?.statusCode;
			if (status === 403) toast.error("Permission Denied", { description: "You do not have financial officer permissions to verify bank payments for this society." });
			else if (status === 409) {
				toast.error("Action Conflict", { description: "This payment claim has already been processed or updated." });
				claimsQuery.refetch();
			} else toast.error("Failed to verify payment", { description: err?.message || "Could not confirm payment claim." });
		}
	});
	const rejectMutation = useMutation({
		mutationFn: ({ paymentId, reason }) => participationApi.rejectPaymentClaim(paymentId, reason),
		onSuccess: () => {
			toast.info("Payment claim rejected", { description: "The student will be notified with your feedback and can resubmit a corrected slip." });
			setRejectingClaim(null);
			setRejectReason("");
			queryClient.invalidateQueries({ queryKey: ["payments", "claims"] });
			queryClient.invalidateQueries({ queryKey: [
				"events",
				"participants",
				eventId
			] });
			queryClient.invalidateQueries({ queryKey: ["registrations"] });
			onClaimProcessed?.();
		},
		onError: (err) => {
			const status = err?.status || err?.statusCode;
			if (status === 403) toast.error("Permission Denied", { description: "You do not have financial officer permissions to reject bank payments for this society." });
			else if (status === 409) {
				toast.error("Action Conflict", { description: "This payment claim has already been processed." });
				claimsQuery.refetch();
			} else toast.error("Failed to reject payment claim", { description: err?.message || "Could not reject claim." });
		}
	});
	const handleCopy = (text, id) => {
		navigator.clipboard.writeText(text);
		setCopiedId(id);
		toast.success("Reference copied to clipboard");
		setTimeout(() => setCopiedId(null), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold uppercase text-muted-foreground block",
							children: "Total Claims"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl font-black text-foreground mt-0.5",
							children: stats.total
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold uppercase text-amber-700 dark:text-amber-300 block",
							children: "Pending Officer Check"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl font-black text-amber-700 dark:text-amber-300 mt-0.5",
							children: stats.pending
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold uppercase text-emerald-700 dark:text-emerald-300 block",
							children: "Confirmed & Issued"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl font-black text-emerald-700 dark:text-emerald-300 mt-0.5",
							children: stats.confirmed
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-rose-500/30 bg-rose-500/5 p-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold uppercase text-rose-700 dark:text-rose-300 block",
							children: "Rejected"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl font-black text-rose-700 dark:text-rose-300 mt-0.5",
							children: stats.rejected
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row items-center justify-between gap-3 bg-card p-3 rounded-xl border border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1.5 w-full sm:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setStatusFilter("ALL"),
							className: cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all", statusFilter === "ALL" ? "bg-navy text-white shadow-xs" : "text-muted-foreground hover:bg-muted"),
							children: [
								"All (",
								stats.total,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setStatusFilter("PROCESSING"),
							className: cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5", statusFilter === "PROCESSING" ? "bg-amber-600 text-white shadow-xs" : "text-muted-foreground hover:bg-muted"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
								"Pending Check (",
								stats.pending,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setStatusFilter("PAID"),
							className: cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5", statusFilter === "PAID" ? "bg-emerald-600 text-white shadow-xs" : "text-muted-foreground hover:bg-muted"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }),
								"Confirmed (",
								stats.confirmed,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setStatusFilter("FAILED"),
							className: cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5", statusFilter === "FAILED" ? "bg-rose-600 text-white shadow-xs" : "text-muted-foreground hover:bg-muted"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3" }),
								"Rejected (",
								stats.rejected,
								")"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full sm:w-64",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Search student or ref...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "pl-8 text-xs h-8"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border bg-card shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-border bg-muted/40 text-[11px] font-bold uppercase text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Student / Payer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Amount Due"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Bank Reference"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Deposit Slip"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Submitted"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right",
								children: "Verification Action"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: claimsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							className: "p-8 text-center text-muted-foreground",
							children: "Loading direct bank transfer claims..."
						}) }) : claimsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							className: "p-8 text-center text-rose-500 font-semibold",
							children: "Failed to load payment claims. You may not have treasurer permissions for this society."
						}) }) : filteredClaims.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							className: "p-8 text-center text-muted-foreground",
							children: "No payment claims found for this filter."
						}) }) : filteredClaims.map((claim) => {
							const payer = claim.payer;
							const isPendingCheck = claim.status === "PROCESSING" || claim.status === "PENDING";
							const isConfirmed = claim.status === "PAID";
							const isRejected = claim.status === "FAILED";
							const ref = claim.referenceNumber || claim.providerPaymentId || "—";
							const uniName = payer?.university?.name || (payer?.studentProfile)?.university?.name || payer?.studentProfile?.faculty?.name || "Independent Attendee";
							const hasProof = Boolean(claim.paymentProofUrl);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/20 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
												initials: payer?.name ? payer.name.slice(0, 2).toUpperCase() : "ST",
												className: "size-8 shrink-0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-bold text-foreground truncate max-w-[170px]",
														children: payer?.name || "Student Delegate"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[11px] text-muted-foreground truncate max-w-[170px]",
														children: payer?.email
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] text-muted-foreground truncate max-w-[170px]",
														children: uniName
													})
												]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3.5 font-mono font-bold text-foreground",
										children: [
											claim.currency || "LKR",
											" ",
											(Number(claim.amount) || 0).toLocaleString(void 0, {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-xs font-semibold text-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/70 truncate max-w-[130px]",
													children: ref
												}), ref !== "—" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "sm",
													className: "h-6 w-6 p-0 text-muted-foreground hover:text-foreground",
													onClick: () => handleCopy(ref, claim.id),
													title: "Copy Reference",
													children: copiedId === claim.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" })
												})]
											}),
											claim.transferDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] text-muted-foreground mt-0.5",
												children: ["Paid on ", formatDate(claim.transferDate)]
											}),
											claim.payerNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] text-muted-foreground italic mt-0.5 truncate max-w-[140px]",
												title: claim.payerNotes,
												children: [
													"\"",
													claim.payerNotes,
													"\""
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5",
										children: hasProof ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "outline",
												size: "sm",
												className: "h-7 text-[11px] gap-1 px-2 border-border/80",
												onClick: () => setSelectedProofUrl(claim.paymentProofUrl),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3 text-primary" }), "View Slip"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: claim.paymentProofUrl,
												target: "_blank",
												rel: "noreferrer",
												className: "text-muted-foreground hover:text-foreground p-1",
												title: "Open in new window",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })
											})]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-muted-foreground italic",
											children: "No slip"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", isConfirmed && "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30", isPendingCheck && "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30", isRejected && "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30"),
												children: [
													isConfirmed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }),
													isPendingCheck && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
													isRejected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3" }),
													isPendingCheck ? "Awaiting Check" : claim.status
												]
											}),
											claim.verifiedBy?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] text-muted-foreground mt-0.5",
												children: ["by ", claim.verifiedBy.name]
											}),
											claim.rejectionReason && isRejected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] text-rose-600 dark:text-rose-400 mt-0.5 truncate max-w-[130px]",
												title: claim.rejectionReason,
												children: ["Reason: ", claim.rejectionReason]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 text-muted-foreground",
										children: formatDate(claim.createdAt)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 text-right",
										children: isPendingCheck ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-end gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												className: "h-7 text-xs px-2.5 font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs",
												onClick: () => setConfirmingClaim(claim),
												disabled: verifyMutation.isPending || rejectMutation.isPending,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3 mr-1" }), "Confirm"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "outline",
												className: "h-7 text-xs px-2 font-bold text-destructive hover:bg-destructive/10 border-destructive/30",
												onClick: () => setRejectingClaim(claim),
												disabled: verifyMutation.isPending || rejectMutation.isPending,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3 mr-1" }), "Reject"]
											})]
										}) : isConfirmed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-semibold text-emerald-600 dark:text-emerald-400",
											children: "Pass Activated ✓"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-muted-foreground",
											children: "Rejected"
										})
									})
								]
							}, claim.id);
						})
					})]
				})
			}),
			selectedProofUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(selectedProofUrl),
				onOpenChange: (open) => !open && setSelectedProofUrl(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-xl bg-card border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "flex items-center gap-2 text-sm font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-primary" }), "Uploaded Bank Deposit Slip"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-xs text-muted-foreground",
							children: "Inspect transfer receipt details to verify date, amount, and reference."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "my-2 max-h-[70vh] overflow-auto rounded-lg border border-border bg-muted/20 p-2 flex items-center justify-center",
							children: selectedProofUrl.endsWith(".pdf") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-8 text-center space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-12 mx-auto text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-foreground",
										children: "PDF Receipt Document"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "sm",
										variant: "outline",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: selectedProofUrl,
											target: "_blank",
											rel: "noreferrer",
											className: "gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), "Open PDF in New Window"]
										})
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: selectedProofUrl,
								alt: "Bank transfer proof slip",
								className: "max-h-[60vh] max-w-full rounded object-contain"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: selectedProofUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), "Open Full Resolution"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => setSelectedProofUrl(null),
								children: "Close"
							})]
						})
					]
				})
			}),
			confirmingClaim && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(confirmingClaim),
				onOpenChange: (open) => !open && setConfirmingClaim(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md bg-card border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-1.5 text-emerald-600 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold uppercase tracking-wider",
									children: "Financial Reconciliation Confirmation"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								className: "text-base font-bold",
								children: [
									"Confirm Bank Transfer for ",
									confirmingClaim.payer?.name,
									"?"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
								className: "text-xs text-muted-foreground mt-1.5 leading-relaxed",
								children: [
									"You are verifying that the club bank account has received",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-foreground",
										children: [
											confirmingClaim.currency,
											" ",
											Number(confirmingClaim.amount).toLocaleString()
										]
									}),
									" ",
									"under reference",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "font-mono text-foreground font-semibold",
										children: confirmingClaim.referenceNumber || confirmingClaim.providerPaymentId || "N/A"
									}),
									"."
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 py-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-amber-500/25 bg-amber-500/5 p-3 flex items-start gap-2.5 text-amber-800 dark:text-amber-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] leading-relaxed",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Responsibility Notice:" }),
										" Confirming this transaction immediately updates the student's registration status to ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CONFIRMED" }),
										", produces their official digital receipt, and generates their admission QR ticket token."
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "verificationNotes",
									className: "text-xs font-semibold",
									children: "Reconciliation Notes (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "verificationNotes",
									placeholder: "e.g. Bank statement line item #5411 verified on 2026-10-27",
									value: confirmNotes,
									onChange: (e) => setConfirmNotes(e.target.value),
									className: "text-xs h-9"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "flex flex-row gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "flex-1",
								onClick: () => setConfirmingClaim(null),
								disabled: verifyMutation.isPending,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1 bg-emerald-600 text-white hover:bg-emerald-700 font-bold",
								onClick: () => verifyMutation.mutate({
									paymentId: confirmingClaim.id,
									notes: confirmNotes.trim() || void 0
								}),
								disabled: verifyMutation.isPending,
								children: verifyMutation.isPending ? "Confirming..." : "Confirm & Issue Pass 🎟️"
							})]
						})
					]
				})
			}),
			rejectingClaim && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(rejectingClaim),
				onOpenChange: (open) => !open && setRejectingClaim(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md bg-card border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-1.5 text-destructive mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold uppercase tracking-wider",
									children: "Payment Claim Rejection"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-base font-bold",
								children: "Reject Bank Transfer Proof?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
								className: "text-xs text-muted-foreground mt-1.5 leading-relaxed",
								children: [
									"Rejecting this proof will notify",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: rejectingClaim.payer?.name
									}),
									" with your explanation. The student can correct the reference or upload a replacement receipt."
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "rejectionReason",
										className: "text-xs font-bold text-destructive",
										children: "Mandatory Rejection Reason *"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "rejectionReason",
										placeholder: "e.g. Reference number not found in our bank statement. Please verify and upload the authentic transaction receipt.",
										value: rejectReason,
										onChange: (e) => setRejectReason(e.target.value),
										className: "text-xs min-h-[80px]"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground",
										children: "Minimum 5 characters. This explanation will be displayed to the student on their registrations dashboard."
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "flex flex-row gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "flex-1",
								onClick: () => setRejectingClaim(null),
								disabled: rejectMutation.isPending,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "destructive",
								className: "flex-1 font-bold",
								onClick: () => rejectMutation.mutate({
									paymentId: rejectingClaim.id,
									reason: rejectReason.trim()
								}),
								disabled: rejectMutation.isPending || rejectReason.trim().length < 5,
								children: rejectMutation.isPending ? "Rejecting..." : "Reject Claim"
							})]
						})
					]
				})
			})
		]
	});
}
function EventParticipantsTab({ eventId, eventTitle }) {
	const [activeView, setActiveView] = (0, import_react.useState)("ATTENDEES");
	const [search, setSearch] = (0, import_react.useState)("");
	const [ticketTypeFilter, setTicketTypeFilter] = (0, import_react.useState)("ALL");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("ALL");
	const [paymentFilter, setPaymentFilter] = (0, import_react.useState)("ALL");
	const [checkedInFilter, setCheckedInFilter] = (0, import_react.useState)("ALL");
	const [page, setPage] = (0, import_react.useState)(1);
	const query = useQuery({
		queryKey: [
			"events",
			"participants",
			eventId,
			page,
			search,
			ticketTypeFilter,
			statusFilter,
			paymentFilter,
			checkedInFilter
		],
		queryFn: () => eventsApi.getEventParticipants(eventId, {
			page,
			limit: 15,
			search: search.trim() || void 0,
			ticketType: ticketTypeFilter,
			status: statusFilter,
			paymentStatus: paymentFilter,
			checkedIn: checkedInFilter
		})
	});
	const claimsQuery = useQuery({
		queryKey: [
			"payments",
			"claims",
			eventId,
			"badge"
		],
		queryFn: () => participationApi.getEventPaymentClaims({ eventId })
	});
	const pendingClaimsCount = (0, import_react.useMemo)(() => {
		if (!Array.isArray(claimsQuery.data)) return 0;
		return claimsQuery.data.filter((c) => c.status === "PROCESSING" || c.status === "PENDING").length;
	}, [claimsQuery.data]);
	const participants = query.data?.items || [];
	const meta = query.data?.meta || {
		page: 1,
		total: 0,
		totalPages: 1
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-border pb-2 overflow-x-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setActiveView("ATTENDEES"),
				className: cn("flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0", activeView === "ATTENDEES" ? "bg-navy text-white shadow-xs" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
					"Registered Attendees (",
					meta.total,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setActiveView("BANK_CLAIMS"),
				className: cn("flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0", activeView === "BANK_CLAIMS" ? "bg-navy text-white shadow-xs" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-4 text-amber-500" }),
					"Direct Bank Claims",
					pendingClaimsCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-amber-500 text-white text-[10px] font-black px-1.5 py-0.5 animate-pulse",
						children: [pendingClaimsCount, " pending"]
					})
				]
			})]
		}), activeView === "BANK_CLAIMS" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventPaymentClaimsView, {
			eventId,
			eventTitle,
			onClaimProcessed: () => {
				query.refetch();
				claimsQuery.refetch();
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-card p-4 rounded-xl border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-base font-bold text-foreground flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-primary" }),
						"Registered Participants (",
						meta.total,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Displaying authorized attendees registered for \"",
						eventTitle,
						"\" only."
					]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5 bg-card p-3 rounded-xl border border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Search by name or email...",
							value: search,
							onChange: (e) => {
								setSearch(e.target.value);
								setPage(1);
							},
							className: "pl-8 text-xs h-9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: ticketTypeFilter,
						onChange: (e) => {
							setTicketTypeFilter(e.target.value);
							setPage(1);
						},
						"aria-label": "Filter by Ticket Type",
						className: "w-full h-9 rounded-md border border-input bg-background px-2.5 text-xs font-semibold text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Ticket Types"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "UNIVERSITY_STUDENT",
								children: "University Student"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "EXTERNAL",
								children: "External Participant"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "GENERAL",
								children: "General"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "VIP",
								children: "VIP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "VOLUNTEER",
								children: "Volunteer"
							})
						]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: paymentFilter,
						onChange: (e) => {
							setPaymentFilter(e.target.value);
							setPage(1);
						},
						"aria-label": "Filter by Payment Status",
						className: "w-full h-9 rounded-md border border-input bg-background px-2.5 text-xs font-semibold text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Payment Statuses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "PAID",
								children: "Paid"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "NOT_REQUIRED",
								children: "Free / Not Required"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "PENDING",
								children: "Pending Payment"
							})
						]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: checkedInFilter,
						onChange: (e) => {
							setCheckedInFilter(e.target.value);
							setPage(1);
						},
						"aria-label": "Filter by Check-In Status",
						className: "w-full h-9 rounded-md border border-input bg-background px-2.5 text-xs font-semibold text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Check-In Statuses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "CHECKED_IN",
								children: "Checked In"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "NOT_CHECKED_IN",
								children: "Not Checked In"
							})
						]
					}) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-border bg-muted/40 text-[11px] font-bold uppercase text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Participant"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "University"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Ticket Type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Registration Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Payment"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Door Check-In"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Registered Date"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 8,
							className: "p-8 text-center text-muted-foreground",
							children: "Loading participants..."
						}) }) : participants.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 8,
							className: "p-8 text-center text-muted-foreground",
							children: "No participants matching the selected filters."
						}) }) : participants.map((p) => {
							const user = p.user;
							const ticket = p.ticket;
							const isCheckedIn = Boolean(ticket?.attendance?.checkInTime);
							const uniName = user?.studentProfile?.university?.name || "Independent / External";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/20 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
												initials: user?.name?.slice(0, 2).toUpperCase() || "PA",
												className: "size-7 shrink-0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-foreground",
												children: user?.name || "Attendee"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-muted-foreground",
												children: user?.email
											})] })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-3 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate max-w-[150px]",
												children: uniName
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase text-secondary-foreground border border-border",
											children: p.ticketType?.replace(/_/g, " ") || "GENERAL"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-semibold text-foreground",
										children: p.ticketPrice && Number(p.ticketPrice) > 0 ? `Rs. ${Number(p.ticketPrice).toLocaleString()}` : "FREE"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", p.status === "REGISTERED" || p.status === "CONFIRMED" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : p.status === "PENDING" ? "bg-amber-500/15 text-amber-700 dark:text-amber-300" : "bg-destructive/15 text-destructive"),
											children: p.status
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", p.payment?.status === "PAID" || !p.payment && (!p.ticketPrice || Number(p.ticketPrice) === 0) ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-amber-500/15 text-amber-700 dark:text-amber-300"),
											children: p.payment?.status || (p.ticketPrice && Number(p.ticketPrice) > 0 ? "PENDING" : "NOT REQUIRED")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: isCheckedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), "Checked In"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground mt-0.5",
											children: formatDate(ticket?.attendance?.checkInTime || "")
										})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded-full bg-slate-500/15 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), "Not Checked In"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-muted-foreground",
										children: formatDate(p.registeredAt)
									})
								]
							}, p.id);
						})
					})]
				})
			}),
			meta.totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between py-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Page ",
					meta.page,
					" of ",
					meta.totalPages,
					" (",
					meta.total,
					" participants)"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						disabled: meta.page <= 1,
						onClick: () => setPage((p) => Math.max(1, p - 1)),
						children: "Previous"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						disabled: meta.page >= meta.totalPages,
						onClick: () => setPage((p) => p + 1),
						children: "Next"
					})]
				})]
			})
		] })]
	});
}
function EventCheckInsTab({ eventId, eventTitle, onOpenScanner }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const query = useQuery({
		queryKey: [
			"events",
			"checkins",
			eventId,
			page,
			search
		],
		queryFn: () => eventsApi.getEventCheckIns(eventId, {
			page,
			limit: 15,
			search: search.trim() || void 0
		})
	});
	const checkIns = query.data?.items || [];
	const meta = query.data?.meta || {
		page: 1,
		total: 0,
		totalPages: 1
	};
	const stats = query.data?.stats || {
		totalRegistered: 0,
		totalCheckedIn: 0,
		remaining: 0,
		checkInPercentage: 0
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-muted-foreground text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-primary" }), "Total Registered"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-black text-foreground mt-2",
							children: stats.totalRegistered
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-4" }), "Admitted / Checked In"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-2",
							children: stats.totalCheckedIn
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-muted-foreground text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-amber-500" }), "Remaining to Arrive"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-black text-foreground mt-2",
							children: stats.remaining
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-primary/20 bg-primary/5 p-4 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-primary text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "size-4" }), "Check-In Turnout"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-2xl font-black text-primary mt-2",
							children: [stats.checkInPercentage, "%"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-card p-3 rounded-xl border border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Search check-in history...",
						value: search,
						onChange: (e) => {
							setSearch(e.target.value);
							setPage(1);
						},
						className: "pl-8 text-xs h-9"
					})]
				}), onOpenScanner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: onOpenScanner,
					className: "bg-navy text-white hover:bg-navy/90 font-semibold gap-1.5 text-xs h-9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-4 text-amber-400" }), "Open Door Scanner"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-border bg-muted/40 text-[11px] font-bold uppercase text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Participant"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "University"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Ticket Pass"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Check-In Time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Checked In By"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Notes / Gate"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 6,
							className: "p-8 text-center text-muted-foreground",
							children: "Loading check-in history..."
						}) }) : checkIns.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 6,
							className: "p-8 text-center text-muted-foreground",
							children: [
								"No door check-ins recorded yet for \"",
								eventTitle,
								"\"."
							]
						}) }) : checkIns.map((ci) => {
							const user = ci.user;
							const ticket = ci.ticket;
							const uniName = user?.studentProfile?.university?.name || "Independent / External";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/20 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
												initials: user?.name?.slice(0, 2).toUpperCase() || "PA",
												className: "size-7 shrink-0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-foreground",
												children: user?.name || "Attendee"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-muted-foreground",
												children: user?.email
											})] })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-3 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate max-w-[150px]",
												children: uniName
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono font-bold text-foreground bg-muted/60 px-1.5 py-0.5 rounded border border-border",
												children: ticket?.ticketNumber || "Pass"
											}), ticket?.ticketType && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] text-muted-foreground",
												children: [
													"(",
													ticket.ticketType.replace(/_/g, " "),
													")"
												]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400",
										children: formatDate(ci.checkInTime)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-muted-foreground",
										children: ci.checkedInBy?.name || "Door Officer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-muted-foreground",
										children: ci.notes || "—"
									})
								]
							}, ci.id);
						})
					})]
				})
			}),
			meta.totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between py-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Page ",
					meta.page,
					" of ",
					meta.totalPages,
					" (",
					meta.total,
					" records)"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						disabled: meta.page <= 1,
						onClick: () => setPage((p) => Math.max(1, p - 1)),
						children: "Previous"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						disabled: meta.page >= meta.totalPages,
						onClick: () => setPage((p) => p + 1),
						children: "Next"
					})]
				})]
			})
		]
	});
}
function EventProofTab({ event }) {
	const status = event.eventVerificationStatus || "PENDING_REVIEW";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-10 place-items-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
							children: "Official Event Verification Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mt-0.5",
							children: [
								status === "VERIFIED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-black text-emerald-700 dark:text-emerald-300 border border-emerald-500/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), "VERIFIED OFFICIAL EVENT"]
								}),
								status === "PENDING_REVIEW" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-black text-amber-700 dark:text-amber-300 border border-amber-500/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }), "PENDING ADMINISTRATIVE REVIEW"]
								}),
								status === "FLAGGED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-black text-rose-700 dark:text-rose-300 border border-rose-500/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-3.5" }), "UNDER REVIEW / FLAGGED"]
								}),
								status === "REJECTED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full bg-destructive/20 px-3 py-1 text-xs font-black text-destructive border border-destructive/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3.5" }), "REJECTED / UNVERIFIED"]
								})
							]
						})] })]
					})
				}), event.verificationNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-muted/40 border border-border/80 p-3 text-xs text-foreground space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-muted-foreground uppercase text-[10px]",
						children: "Moderation & Review Notes:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: event.verificationNotes })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-sm font-bold text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-primary" }), "Submitted Event Evidence & Media Links"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/70 bg-muted/20 p-3.5 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block",
									children: "Official Event Website / Announcement"
								}), event.officialEventUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: event.officialEventUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "text-xs font-bold text-primary hover:underline flex items-center gap-1.5 break-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: event.officialEventUrl }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 shrink-0" })]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground italic",
									children: "No official event URL submitted."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/70 bg-muted/20 p-3.5 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block",
									children: "Host Organization / Social Portal"
								}), event.officialOrgUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: event.officialOrgUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "text-xs font-bold text-primary hover:underline flex items-center gap-1.5 break-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: event.officialOrgUrl }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 shrink-0" })]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground italic",
									children: "No host portal link provided."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/70 bg-muted/20 p-3.5 space-y-1 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block",
									children: "Supporting Proof Document / University Endorsement"
								}), event.proofDocumentUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: event.proofDocumentUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "text-xs font-bold text-primary hover:underline flex items-center gap-1.5 break-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: event.proofDocumentUrl }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 shrink-0" })]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground italic",
									children: "No document link attached."
								})]
							})
						]
					}),
					event.organizerNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border/70 bg-muted/20 p-3.5 space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block",
							children: "Organizer Notes for Verification Team"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-foreground whitespace-pre-line",
							children: event.organizerNotes
						})]
					})
				]
			}),
			event.posterUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
					className: "text-sm font-bold text-foreground flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-4 text-primary" }), "Event Poster & Artwork"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg overflow-hidden max-w-sm border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: event.posterUrl,
						alt: event.title,
						className: "w-full h-auto object-cover max-h-80",
						onError: (e) => {
							e.target.style.display = "none";
						}
					})
				})]
			})
		]
	});
}
function EventReportsTab({ eventId, eventTitle }) {
	const query = useQuery({
		queryKey: [
			"events",
			"reports",
			eventId
		],
		queryFn: () => eventsApi.getEventReports(eventId)
	});
	const reports = query.data || [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card p-4 rounded-xl border border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "text-base font-bold text-foreground flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4 text-rose-500" }),
					"Community & Moderation Reports (",
					reports.length,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground mt-0.5",
				children: [
					"Issues reported by students regarding fake events, misleading info, or ticket discrepancies for \"",
					eventTitle,
					"\"."
				]
			})]
		}), query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-8 text-center text-xs text-muted-foreground bg-card rounded-xl border border-border",
			children: "Loading report records..."
		}) : reports.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-8 text-center bg-card rounded-xl border border-border space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto size-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-sm font-bold text-foreground",
					children: "No reports filed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground max-w-sm mx-auto",
					children: "This event listing is in good standing with zero active fraud or misrepresentation reports."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: reports.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 space-y-2 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-rose-500/20 px-2.5 py-0.5 font-bold text-rose-600 dark:text-rose-400 border border-rose-500/30 uppercase text-[10px]",
									children: r.reason.replace(/_/g, " ")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), formatDate(r.createdAt)]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded bg-card px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground border border-border",
							children: ["Status: ", r.status]
						})]
					}),
					r.details && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-foreground leading-relaxed pl-1 border-l-2 border-rose-500/40 mt-1",
						children: [
							"\"",
							r.details,
							"\""
						]
					}),
					r.reporter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3 text-muted-foreground" }),
							"Reported by: ",
							r.reporter.name,
							" (",
							r.reporter.email,
							")"
						]
					})
				]
			}, r.id))
		})]
	});
}
function EventEditTab({ event, onSaved }) {
	const [title, setTitle] = (0, import_react.useState)(event.title);
	const [summary, setSummary] = (0, import_react.useState)(event.summary || event.shortDescription || "");
	const [description, setDescription] = (0, import_react.useState)(event.description || "");
	const [location, setLocation] = (0, import_react.useState)(event.location || "");
	const [mode, setMode] = (0, import_react.useState)(event.mode || "PHYSICAL");
	const [opportunityType, setOpportunityType] = (0, import_react.useState)(event.opportunityType || "COMPETITION");
	const [startDate, setStartDate] = (0, import_react.useState)(event.startDate ? new Date(event.startDate).toISOString().slice(0, 10) : "");
	const [endDate, setEndDate] = (0, import_react.useState)(event.endDate ? new Date(event.endDate).toISOString().slice(0, 10) : "");
	const [deadline, setDeadline] = (0, import_react.useState)(event.registrationDeadline ? new Date(event.registrationDeadline).toISOString().slice(0, 10) : "");
	const [capacity, setCapacity] = (0, import_react.useState)(event.capacity ? String(event.capacity) : "");
	const [pricingMode, setPricingMode] = (0, import_react.useState)(event.pricingMode || (event.isFree ? "FREE_FOR_ALL" : "SINGLE_PRICE"));
	const [price, setPrice] = (0, import_react.useState)(event.price ? String(event.price) : "");
	const [studentPrice, setStudentPrice] = (0, import_react.useState)(event.studentPrice !== void 0 && event.studentPrice !== null ? String(event.studentPrice) : "");
	const [externalPrice, setExternalPrice] = (0, import_react.useState)(event.externalPrice !== void 0 && event.externalPrice !== null ? String(event.externalPrice) : "");
	const [allowOnlineGateway, setAllowOnlineGateway] = (0, import_react.useState)(false);
	const [allowClubTransfer, setAllowClubTransfer] = (0, import_react.useState)(true);
	const [customPaymentInstructions, setCustomPaymentInstructions] = (0, import_react.useState)(event.customPaymentInstructions || "");
	const { data: orgDetails } = useQuery({
		queryKey: [
			"organization",
			"details",
			event.organizationId
		],
		queryFn: () => event.organizationId ? directoryApi.organization(event.organizationId) : null,
		enabled: Boolean(event.organizationId)
	});
	const [acceptVolunteers, setAcceptVolunteers] = (0, import_react.useState)(Boolean(event.volunteerRoles && event.volunteerRoles.length > 0));
	const [volunteerRolesInput, setVolunteerRolesInput] = (0, import_react.useState)((event.volunteerRoles || []).join(", "));
	const [volunteerCapacity, setVolunteerCapacity] = (0, import_react.useState)(event.volunteerCapacity ? String(event.volunteerCapacity) : "");
	const [volunteerAvailability, setVolunteerAvailability] = (0, import_react.useState)(event.volunteerAvailability || "");
	const [artistNamesInput, setArtistNamesInput] = (0, import_react.useState)((event.artistNames || []).join(", "));
	const [musicGenre, setMusicGenre] = (0, import_react.useState)(event.musicGenre || "");
	const [performanceSchedule, setPerformanceSchedule] = (0, import_react.useState)(event.performanceSchedule || "");
	const [productionTitle, setProductionTitle] = (0, import_react.useState)(event.productionTitle || "");
	const [dramaGenre, setDramaGenre] = (0, import_react.useState)(event.dramaGenre || "");
	const [castMembersInput, setCastMembersInput] = (0, import_react.useState)((event.castMembers || []).join(", "));
	const [director, setDirector] = (0, import_react.useState)(event.director || "");
	const [synopsis, setSynopsis] = (0, import_react.useState)(event.synopsis || "");
	const [programType, setProgramType] = (0, import_react.useState)(event.programType || "MSc");
	const [degreeAwarded, setDegreeAwarded] = (0, import_react.useState)(event.degreeAwarded || "");
	const [studyMode, setStudyMode] = (0, import_react.useState)(event.studyMode || "Full-Time");
	const [programDuration, setProgramDuration] = (0, import_react.useState)(event.programDuration || "");
	const [fundingType, setFundingType] = (0, import_react.useState)(event.fundingType || "Fully Funded");
	const [scholarshipDetails, setScholarshipDetails] = (0, import_react.useState)(event.scholarshipDetails || "");
	const [entryQualifications, setEntryQualifications] = (0, import_react.useState)(event.entryQualifications || "");
	const [applicationRequirements, setApplicationRequirements] = (0, import_react.useState)(event.applicationRequirements || "");
	const [intakePeriod, setIntakePeriod] = (0, import_react.useState)(event.intakePeriod || "");
	const [tuitionFee, setTuitionFee] = (0, import_react.useState)(event.tuitionFee || "");
	const [officialApplicationUrl, setOfficialApplicationUrl] = (0, import_react.useState)(event.officialApplicationUrl || "");
	const [programUrl, setProgramUrl] = (0, import_react.useState)(event.programUrl || "");
	const [courseLevel, setCourseLevel] = (0, import_react.useState)(event.courseLevel || "Certificate");
	const [courseCode, setCourseCode] = (0, import_react.useState)(event.courseCode || "");
	const [courseDuration, setCourseDuration] = (0, import_react.useState)(event.courseDuration || "");
	const [workloadHoursPerWeek, setWorkloadHoursPerWeek] = (0, import_react.useState)(event.workloadHoursPerWeek || "");
	const [prerequisites, setPrerequisites] = (0, import_react.useState)(event.prerequisites || "");
	const [syllabus, setSyllabus] = (0, import_react.useState)(event.syllabus || "");
	const [instructor, setInstructor] = (0, import_react.useState)(event.instructor || "");
	const [hasCertificate, setHasCertificate] = (0, import_react.useState)(event.hasCertificate ?? true);
	const [enrollmentUrl, setEnrollmentUrl] = (0, import_react.useState)(event.enrollmentUrl || "");
	const fileInputRef = (0, import_react.useRef)(null);
	const [posterUrl, setPosterUrl] = (0, import_react.useState)(event.posterUrl || event.coverImageUrl || event.bannerUrl || "");
	const [coverImageUrl, setCoverImageUrl] = (0, import_react.useState)(event.coverImageUrl || event.bannerUrl || "");
	const [posterFile, setPosterFile] = (0, import_react.useState)(null);
	const [posterPreview, setPosterPreview] = (0, import_react.useState)(event.posterUrl || event.coverImageUrl || event.bannerUrl || "");
	const [isUploadingPoster, setIsUploadingPoster] = (0, import_react.useState)(false);
	const [officialEventUrl, setOfficialEventUrl] = (0, import_react.useState)(event.officialEventUrl || "");
	const [officialOrgUrl, setOfficialOrgUrl] = (0, import_react.useState)(event.officialOrgUrl || "");
	const [proofDocumentUrl, setProofDocumentUrl] = (0, import_react.useState)(event.proofDocumentUrl || "");
	const [organizerNotes, setOrganizerNotes] = (0, import_react.useState)(event.organizerNotes || "");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const handlePosterFileChange = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 5242880) {
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
		if (fileInputRef.current) fileInputRef.current.value = "";
	};
	const handleSubmit = async (e) => {
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
					finalPosterUrl = (await eventsApi.uploadPoster(posterFile)).url;
				} catch (uploadErr) {
					toast.error("Failed to upload poster: " + (uploadErr?.message || "Upload error"));
					setSaving(false);
					setIsUploadingPoster(false);
					return;
				} finally {
					setIsUploadingPoster(false);
				}
			} else if (posterPreview && !posterPreview.startsWith("blob:") && !posterPreview.startsWith("data:")) finalPosterUrl = posterPreview;
			if (pricingMode !== "FREE_FOR_ALL" && event.status === "PUBLISHED") {
				if (!orgDetails?.bankName || !orgDetails?.bankAccountNumber) {
					toast.error("Society Bank Details Missing", { description: "Direct Club Bank Transfer is the only available payment method. Please configure society bank details before updating this published paid event." });
					return;
				}
			}
			const isFree = pricingMode === "FREE_FOR_ALL";
			const payload = {
				title: title.trim(),
				shortDescription: summary.trim() || void 0,
				description: description.trim() || void 0,
				location: location.trim() || void 0,
				mode: mode === "PHYSICAL" ? "IN_PERSON" : mode,
				opportunityType,
				startDate: startDate ? new Date(startDate).toISOString() : void 0,
				endDate: endDate ? new Date(endDate).toISOString() : void 0,
				registrationDeadline: deadline ? new Date(deadline).toISOString() : void 0,
				capacity: capacity ? Number(capacity) : void 0,
				isFree,
				pricingMode,
				price: pricingMode === "SINGLE_PRICE" && price ? Number(price) : void 0,
				studentPrice: pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL" && studentPrice ? Number(studentPrice) : 0,
				externalPrice: pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL" && externalPrice ? Number(externalPrice) : void 0,
				allowClubTransfer: !isFree,
				allowOnlineGateway: false,
				customPaymentInstructions: !isFree ? customPaymentInstructions.trim() || void 0 : void 0,
				volunteerRoles: acceptVolunteers && volunteerRolesInput ? volunteerRolesInput.split(",").map((s) => s.trim()).filter(Boolean) : [],
				volunteerCapacity: acceptVolunteers && volunteerCapacity ? Number(volunteerCapacity) : void 0,
				volunteerAvailability: acceptVolunteers && volunteerAvailability.trim() ? volunteerAvailability.trim() : void 0,
				posterUrl: finalPosterUrl || void 0,
				coverImageUrl: finalPosterUrl || void 0,
				bannerUrl: finalPosterUrl || void 0,
				officialEventUrl: officialEventUrl.trim() || void 0,
				officialOrgUrl: officialOrgUrl.trim() || void 0,
				proofDocumentUrl: proofDocumentUrl.trim() || void 0,
				organizerNotes: organizerNotes.trim() || void 0,
				artistNames: opportunityType === "MUSIC" && artistNamesInput.trim() ? artistNamesInput.split(",").map((a) => a.trim()).filter(Boolean) : void 0,
				musicGenre: opportunityType === "MUSIC" && musicGenre.trim() ? musicGenre.trim() : void 0,
				performanceSchedule: opportunityType === "MUSIC" && performanceSchedule.trim() ? performanceSchedule.trim() : void 0,
				productionTitle: opportunityType === "DRAMA" && productionTitle.trim() ? productionTitle.trim() : void 0,
				dramaGenre: opportunityType === "DRAMA" && dramaGenre.trim() ? dramaGenre.trim() : void 0,
				castMembers: opportunityType === "DRAMA" && castMembersInput.trim() ? castMembersInput.split(",").map((c) => c.trim()).filter(Boolean) : void 0,
				director: opportunityType === "DRAMA" && director.trim() ? director.trim() : void 0,
				synopsis: opportunityType === "DRAMA" && synopsis.trim() ? synopsis.trim() : void 0,
				programType: opportunityType === "HIGHER_STUDIES" && programType.trim() ? programType.trim() : void 0,
				degreeAwarded: opportunityType === "HIGHER_STUDIES" && degreeAwarded.trim() ? degreeAwarded.trim() : void 0,
				studyMode: opportunityType === "HIGHER_STUDIES" && studyMode.trim() ? studyMode.trim() : void 0,
				programDuration: opportunityType === "HIGHER_STUDIES" && programDuration.trim() ? programDuration.trim() : void 0,
				fundingType: opportunityType === "HIGHER_STUDIES" && fundingType.trim() ? fundingType.trim() : void 0,
				scholarshipDetails: opportunityType === "HIGHER_STUDIES" && scholarshipDetails.trim() ? scholarshipDetails.trim() : void 0,
				entryQualifications: opportunityType === "HIGHER_STUDIES" && entryQualifications.trim() ? entryQualifications.trim() : void 0,
				applicationRequirements: opportunityType === "HIGHER_STUDIES" && applicationRequirements.trim() ? applicationRequirements.trim() : void 0,
				intakePeriod: opportunityType === "HIGHER_STUDIES" && intakePeriod.trim() ? intakePeriod.trim() : void 0,
				tuitionFee: opportunityType === "HIGHER_STUDIES" && tuitionFee.trim() ? tuitionFee.trim() : void 0,
				officialApplicationUrl: opportunityType === "HIGHER_STUDIES" && officialApplicationUrl.trim() ? officialApplicationUrl.trim() : void 0,
				programUrl: opportunityType === "HIGHER_STUDIES" && programUrl.trim() ? programUrl.trim() : void 0,
				courseLevel: opportunityType === "UNIVERSITY_COURSE" && courseLevel.trim() ? courseLevel.trim() : void 0,
				courseCode: opportunityType === "UNIVERSITY_COURSE" && courseCode.trim() ? courseCode.trim() : void 0,
				courseDuration: opportunityType === "UNIVERSITY_COURSE" && courseDuration.trim() ? courseDuration.trim() : void 0,
				workloadHoursPerWeek: opportunityType === "UNIVERSITY_COURSE" && workloadHoursPerWeek.trim() ? workloadHoursPerWeek.trim() : void 0,
				prerequisites: opportunityType === "UNIVERSITY_COURSE" && prerequisites.trim() ? prerequisites.trim() : void 0,
				syllabus: opportunityType === "UNIVERSITY_COURSE" && syllabus.trim() ? syllabus.trim() : void 0,
				instructor: opportunityType === "UNIVERSITY_COURSE" && instructor.trim() ? instructor.trim() : void 0,
				hasCertificate: opportunityType === "UNIVERSITY_COURSE" ? hasCertificate : void 0,
				enrollmentUrl: opportunityType === "UNIVERSITY_COURSE" && enrollmentUrl.trim() ? enrollmentUrl.trim() : void 0
			};
			await eventsApi.updateEvent(event.id, payload);
			toast.success("Event details updated successfully! 🎉");
			onSaved();
		} catch (err) {
			toast.error(err?.message || "Failed to update event.");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-sm font-bold text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4 text-primary" }), "General Event Information"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "edit-title",
							children: "Event Title *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "edit-title",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							required: true,
							className: "text-xs font-semibold"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "edit-type",
								children: "Event Category / Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "edit-type",
								value: opportunityType,
								onChange: (e) => setOpportunityType(e.target.value),
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "COMPETITION",
										children: "Competition"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "HACKATHON",
										children: "Hackathon"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "MUSIC",
										children: "Music & Entertainment"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "DRAMA",
										children: "Drama & Performing Arts"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "HIGHER_STUDIES",
										children: "Higher Studies (MSc, PhD)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "UNIVERSITY_COURSE",
										children: "University Course & Learning"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "WORKSHOP",
										children: "Workshop"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "CONFERENCE",
										children: "Conference"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "SEMINAR",
										children: "Seminar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "MOVIE",
										children: "Movie Screening"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "SPORTS",
										children: "Sports & Athletics"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "EXHIBITION",
										children: "Exhibition & Fair"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "SOCIETY_EVENT",
										children: "Society Event"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "CULTURAL_EVENT",
										children: "Cultural Festival"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "RESEARCH",
										children: "Research"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "CAREER",
										children: "Career Fair"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "VOLUNTEERING",
										children: "Volunteering"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "OTHER",
										children: "Other"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "edit-mode",
								children: "Delivery Mode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "edit-mode",
								value: mode,
								onChange: (e) => setMode(e.target.value),
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "PHYSICAL",
										children: "In-Person (Physical)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ONLINE",
										children: "Online (Virtual)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "HYBRID",
										children: "Hybrid"
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "edit-location",
								children: "Venue / Location"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "edit-location",
								placeholder: "e.g. Main Auditorium, UoM",
								value: location,
								onChange: (e) => setLocation(e.target.value),
								className: "text-xs"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "edit-capacity",
								children: "Max Participant Capacity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "edit-capacity",
								type: "number",
								placeholder: "e.g. 250",
								value: capacity,
								onChange: (e) => setCapacity(e.target.value),
								className: "text-xs"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "edit-start",
									children: "Start Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "edit-start",
									type: "date",
									value: startDate,
									onChange: (e) => setStartDate(e.target.value),
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "edit-end",
									children: "End Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "edit-end",
									type: "date",
									value: endDate,
									onChange: (e) => setEndDate(e.target.value),
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "edit-deadline",
									children: "Registration Deadline"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "edit-deadline",
									type: "date",
									value: deadline,
									onChange: (e) => setDeadline(e.target.value),
									className: "text-xs"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "edit-summary",
							children: "Tagline / Short Summary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "edit-summary",
							value: summary,
							onChange: (e) => setSummary(e.target.value),
							className: "text-xs"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "edit-desc",
							children: "Full Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "edit-desc",
							rows: 4,
							value: description,
							onChange: (e) => setDescription(e.target.value),
							className: "text-xs"
						})]
					}),
					opportunityType === "MUSIC" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-pink-500/30 bg-pink-500/5 p-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-pink-700 dark:text-pink-300 font-bold text-xs uppercase",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Music & Entertainment Settings" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "edit-music-artists",
										className: "text-xs font-bold",
										children: "Artist / Band Lineup"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "edit-music-artists",
										placeholder: "e.g. Bathiya & Santhush, Daddy",
										value: artistNamesInput,
										onChange: (e) => setArtistNamesInput(e.target.value),
										className: "text-xs"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "edit-music-genre",
										className: "text-xs font-bold",
										children: "Music Genre"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "edit-music-genre",
										placeholder: "e.g. Fusion Rock, Acoustic Pop",
										value: musicGenre,
										onChange: (e) => setMusicGenre(e.target.value),
										className: "text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "edit-music-sched",
									className: "text-xs font-bold",
									children: "Performance Schedule"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "edit-music-sched",
									rows: 2,
									value: performanceSchedule,
									onChange: (e) => setPerformanceSchedule(e.target.value),
									className: "text-xs"
								})]
							})
						]
					}),
					opportunityType === "DRAMA" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-violet-500/30 bg-violet-500/5 p-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-violet-700 dark:text-violet-300 font-bold text-xs uppercase",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Theater, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Drama & Theatre Details" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "edit-drama-title",
										className: "text-xs font-bold",
										children: "Production Title"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "edit-drama-title",
										placeholder: "e.g. Kuveni - The Revival",
										value: productionTitle,
										onChange: (e) => setProductionTitle(e.target.value),
										className: "text-xs"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "edit-drama-genre",
										className: "text-xs font-bold",
										children: "Theatre Genre"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "edit-drama-genre",
										placeholder: "e.g. Musical Theatre, Stage Play",
										value: dramaGenre,
										onChange: (e) => setDramaGenre(e.target.value),
										className: "text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "edit-drama-director",
										className: "text-xs font-bold",
										children: "Director / Production Lead"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "edit-drama-director",
										value: director,
										onChange: (e) => setDirector(e.target.value),
										className: "text-xs"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "edit-drama-cast",
										className: "text-xs font-bold",
										children: "Cast Members"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "edit-drama-cast",
										value: castMembersInput,
										onChange: (e) => setCastMembersInput(e.target.value),
										className: "text-xs"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "edit-drama-synopsis",
									className: "text-xs font-bold",
									children: "Synopsis / Storyline"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "edit-drama-synopsis",
									rows: 2,
									value: synopsis,
									onChange: (e) => setSynopsis(e.target.value),
									className: "text-xs"
								})]
							})
						]
					}),
					opportunityType === "HIGHER_STUDIES" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-sky-500/30 bg-sky-500/5 p-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sky-700 dark:text-sky-300 font-bold text-xs uppercase",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Higher Studies (MSc, PhD) Academic Settings" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold",
											children: "Qualification Award"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: programType,
											onChange: (e) => setProgramType(e.target.value),
											className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "MSc",
													children: "MSc — Master of Science"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Master's",
													children: "Master's Degree"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "MPhil",
													children: "MPhil"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "PhD",
													children: "PhD / Doctoral"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Postgraduate Diploma",
													children: "Postgraduate Diploma"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Open Day",
													children: "Postgraduate Open Day"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold",
											children: "Degree Title"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: degreeAwarded,
											onChange: (e) => setDegreeAwarded(e.target.value),
											className: "text-xs"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold",
											children: "Funding Type"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: fundingType,
											onChange: (e) => setFundingType(e.target.value),
											className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Fully Funded",
													children: "Fully Funded"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Partially Funded",
													children: "Partially Funded"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Self-Funded",
													children: "Self-Funded"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Research Assistantship",
													children: "Research Assistantship"
												})
											]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-bold",
										children: "Official Application URL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "url",
										value: officialApplicationUrl,
										onChange: (e) => setOfficialApplicationUrl(e.target.value),
										className: "text-xs"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-bold",
										children: "Official Program URL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "url",
										value: programUrl,
										onChange: (e) => setProgramUrl(e.target.value),
										className: "text-xs"
									})]
								})]
							})
						]
					}),
					opportunityType === "UNIVERSITY_COURSE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-teal-500/30 bg-teal-500/5 p-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-teal-700 dark:text-teal-300 font-bold text-xs uppercase",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenCheck, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "University Course & Learning Settings" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold",
											children: "Course Level"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: courseLevel,
											onChange: (e) => setCourseLevel(e.target.value),
											className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Certificate",
													children: "Certificate Program"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Professional Development",
													children: "Professional Development"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Diploma",
													children: "Diploma"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Short Course",
													children: "Short Technical Course"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Undergraduate Module",
													children: "Undergraduate Module"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold",
											children: "Course Code"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: courseCode,
											onChange: (e) => setCourseCode(e.target.value),
											className: "text-xs"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold",
											children: "Instructor"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: instructor,
											onChange: (e) => setInstructor(e.target.value),
											className: "text-xs"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-bold",
										children: "Official Enrollment URL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "url",
										value: enrollmentUrl,
										onChange: (e) => setEnrollmentUrl(e.target.value),
										className: "text-xs"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-bold",
										children: "Verified Certificate Included?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setHasCertificate(!hasCertificate),
										className: "w-full flex items-center justify-between px-3 py-2 rounded-md border border-input text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verified Digital Certificate" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: hasCertificate ? "text-teal-600 font-bold" : "text-muted-foreground",
											children: hasCertificate ? "✓ Yes" : "✕ No"
										})]
									})]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-sm font-bold text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "size-4 text-primary" }), "Ticketing & University Student Pricing Mode"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "edit-pricing-mode",
								children: "Pricing Mode *"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "edit-pricing-mode",
								value: pricingMode,
								onChange: (e) => setPricingMode(e.target.value),
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "FREE_FOR_ALL",
										children: "Free for All Participants (Rs. 0)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "SINGLE_PRICE",
										children: "Single Fixed Price for Everyone"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "UNIVERSITY_STUDENT_AND_EXTERNAL",
										children: "Tiered: Verified University Student vs External Participant"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL" ? "University students with verified .ac.lk or campus emails receive student pricing (or free access) automatically verified server-side." : pricingMode === "SINGLE_PRICE" ? "All participants pay the same admission rate." : "Admission is open and complimentary for everyone."
							})
						]
					}),
					pricingMode === "SINGLE_PRICE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "edit-single-price",
							children: "Admission Ticket Price (Rs.)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "edit-single-price",
							type: "number",
							placeholder: "e.g. 500",
							value: price,
							onChange: (e) => setPrice(e.target.value),
							className: "text-xs"
						})]
					}),
					pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 rounded-lg bg-card/80 border border-border/80 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "edit-student-price",
									className: "text-emerald-700 dark:text-emerald-300 font-bold",
									children: "Verified University Student Price (Rs.)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "edit-student-price",
									type: "number",
									placeholder: "0 (Enter 0 for FREE)",
									value: studentPrice,
									onChange: (e) => setStudentPrice(e.target.value),
									className: "text-xs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Enter 0 if event is FREE for university students."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 rounded-lg bg-card/80 border border-border/80 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "edit-external-price",
									className: "font-bold",
									children: "External / Non-University Price (Rs.)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "edit-external-price",
									type: "number",
									placeholder: "e.g. 1500",
									value: externalPrice,
									onChange: (e) => setExternalPrice(e.target.value),
									className: "text-xs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Standard price for non-university public attendees."
								})
							]
						})]
					}),
					pricingMode !== "FREE_FOR_ALL" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 pt-4 border-t border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs font-bold text-foreground block",
							children: "Accepted Payment Method *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground block text-sm",
											children: "Direct Bank Transfer to Club"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground leading-relaxed",
											children: "Under the current release, Direct Bank Transfer is the exclusive payment method for paid events. Attendees deposit funds directly into your society bank account and submit proof of payment. An authorized financial officer verifies the transfer before admission passes are generated."
										})]
									})]
								}),
								orgDetails?.bankAccountNumber ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-emerald-700 dark:text-emerald-400 block mb-1",
										children: "✓ Society Bank Account Configured"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[11px] text-foreground space-y-0.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Bank:"
												}),
												" ",
												orgDetails.bankName,
												" ",
												orgDetails.bankBranch ? `(${orgDetails.bankBranch})` : ""
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Account Name:"
												}),
												" ",
												orgDetails.bankAccountName
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Account Number:"
												}),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono font-bold",
													children: orgDetails.bankAccountNumber
												})
											] })
										]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-rose-600 dark:text-rose-400 block mb-1",
										children: "⚠️ Society Bank Details Not Configured"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "This society has not saved its bank account number. Please update society bank instructions in Society Settings before students register for direct bank transfers."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 pt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "custom-instructions-edit",
											className: "text-xs font-bold",
											children: "Event-Specific Bank Transfer Instructions (Optional)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "custom-instructions-edit",
											placeholder: "e.g. Please put event name and your Student ID in the transaction remarks and upload slip here.",
											value: customPaymentInstructions,
											onChange: (e) => setCustomPaymentInstructions(e.target.value),
											rows: 2,
											className: "text-xs"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground",
											children: "Shown to students alongside bank account details during registration."
										})
									]
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-sm font-bold text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-4 text-rose-500" }), "Volunteer Recruitment"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: acceptVolunteers,
							onChange: (e) => setAcceptVolunteers(e.target.checked),
							className: "rounded border-input text-rose-600 focus:ring-rose-500"
						}), "Accept Volunteer Applications"]
					})]
				}), acceptVolunteers && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "edit-vol-roles",
							children: "Available Volunteer Roles (comma-separated)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "edit-vol-roles",
							placeholder: "Registration Desk, Event Support, Photography, Tech Crew",
							value: volunteerRolesInput,
							onChange: (e) => setVolunteerRolesInput(e.target.value),
							className: "text-xs"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "edit-vol-cap",
								children: "Volunteer Target Headcount"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "edit-vol-cap",
								type: "number",
								placeholder: "e.g. 20",
								value: volunteerCapacity,
								onChange: (e) => setVolunteerCapacity(e.target.value),
								className: "text-xs"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "edit-vol-avail",
								children: "Time Commitment"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "edit-vol-avail",
								placeholder: "e.g. Full day on event date",
								value: volunteerAvailability,
								onChange: (e) => setVolunteerAvailability(e.target.value),
								className: "text-xs"
							})]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-sm font-bold text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-primary" }), "Event Media & Verification Proof"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-xl border border-border/80 bg-surface/40 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-xs font-bold flex items-center gap-1.5 text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-4 text-primary" }), "Event Poster or Promotional Banner"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Upload or replace the official promotional poster for this opportunity (PNG, JPG, WEBP up to 5MB)."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileInputRef,
								type: "file",
								accept: "image/png, image/jpeg, image/webp",
								className: "hidden",
								onChange: handlePosterFileChange
							}),
							posterPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative rounded-lg overflow-hidden border border-border group max-w-md bg-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: posterPreview,
										alt: "Poster Preview",
										className: "w-full h-44 object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											size: "sm",
											variant: "secondary",
											className: "text-xs gap-1 h-8 shadow-sm",
											onClick: () => fileInputRef.current?.click(),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" }), " Replace Poster"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											size: "sm",
											variant: "destructive",
											className: "text-xs gap-1 h-8 shadow-sm",
											onClick: handleRemovePoster,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), " Remove"]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										className: "text-xs gap-1.5 h-8",
										onClick: () => fileInputRef.current?.click(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }), "Choose Different Image File"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										className: "text-xs text-destructive hover:bg-destructive/10 h-8",
										onClick: handleRemovePoster,
										children: "Remove Poster"
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => fileInputRef.current?.click(),
								className: "flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-6 text-muted-foreground mb-2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-foreground",
										children: "Click to upload event banner / poster"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground mt-0.5",
										children: "Recommended resolution: 1200 × 675 px (16:9)"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "edit-poster",
									className: "text-[11px] font-semibold text-muted-foreground",
									children: "Or paste direct image URL:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "edit-poster",
									placeholder: "https://... image link",
									value: posterUrl,
									onChange: (e) => {
										setPosterUrl(e.target.value);
										setPosterPreview(e.target.value);
										setPosterFile(null);
									},
									className: "text-xs mt-1"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "edit-official-url",
									children: "Official Event Website URL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "edit-official-url",
									placeholder: "https://event.society.lk",
									value: officialEventUrl,
									onChange: (e) => setOfficialEventUrl(e.target.value),
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "edit-org-url",
									children: "Official Organization / Social Portal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "edit-org-url",
									placeholder: "https://facebook.com/... or society portal",
									value: officialOrgUrl,
									onChange: (e) => setOfficialOrgUrl(e.target.value),
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "edit-proof-doc",
									children: "Supporting Proof / Endorsement Doc URL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "edit-proof-doc",
									placeholder: "https://docs.google.com/... or university circular",
									value: proofDocumentUrl,
									onChange: (e) => setProofDocumentUrl(e.target.value),
									className: "text-xs"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "edit-notes",
							children: "Organizer Notes for Moderation Team"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "edit-notes",
							rows: 2,
							placeholder: "Additional context, committee contact, or proof explanations...",
							value: organizerNotes,
							onChange: (e) => setOrganizerNotes(e.target.value),
							className: "text-xs"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end gap-3 pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					disabled: saving,
					className: "bg-navy text-white hover:bg-navy/90 font-bold gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), saving ? "Saving Changes…" : "Save Event Details"]
				})
			})
		]
	});
}
function EventManagementWorkspace({ eventId, onBack, onOpenVolunteersModal }) {
	const queryClient = useQueryClient();
	const [activeTab, setActiveTab] = (0, import_react.useState)("OVERVIEW");
	const [scannerOpen, setScannerOpen] = (0, import_react.useState)(false);
	const query = useQuery({
		queryKey: [
			"events",
			"manage",
			eventId
		],
		queryFn: () => eventsApi.getEventManage(eventId)
	});
	const event = query.data?.event || null;
	const stats = query.data?.stats || {
		totalRegistrations: 0,
		totalCheckedIn: 0,
		totalVolunteers: 0,
		openReports: 0
	};
	const handlePublish = async () => {
		if (!event) return;
		try {
			await eventsApi.publishEvent(event.id);
			toast.success(`Published "${event.title}" successfully! 🚀`, { description: "Your event is now live and discoverable across CampusPulse." });
			query.refetch();
			queryClient.invalidateQueries({ queryKey: ["organizer", "events"] });
			queryClient.invalidateQueries({ queryKey: ["events"] });
			queryClient.invalidateQueries({ queryKey: ["feed"] });
		} catch (err) {
			toast.error(err?.message || "Failed to publish event.");
		}
	};
	const handleCancelEvent = async () => {
		if (!event) return;
		if (!confirm(`Are you sure you want to cancel the event "${event.title}"?`)) return;
		try {
			await eventsApi.updateEvent(event.id, { status: "CANCELLED" });
			toast.success("Event status updated to CANCELLED");
			query.refetch();
			queryClient.invalidateQueries({ queryKey: ["organizer", "events"] });
			queryClient.invalidateQueries({ queryKey: ["events"] });
		} catch (err) {
			toast.error(err?.message || "Failed to update event status.");
		}
	};
	if (query.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-12 text-center text-muted-foreground bg-card rounded-xl border border-border",
		children: "Loading event management workspace..."
	});
	if (query.isError || !event) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 text-center bg-card rounded-xl border border-border space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-destructive font-semibold",
			children: "Could not load event management workspace."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			onClick: onBack,
			className: "gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back to My Events"]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-in fade-in-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: onBack,
						className: "text-xs font-bold gap-1.5 text-muted-foreground hover:text-foreground -ml-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back to My Events"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							event.status === "DRAFT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: handlePublish,
								className: "bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold gap-1.5 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), "Publish Event"]
							}),
							event.status !== "CANCELLED" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: handleCancelEvent,
								className: "text-xs font-semibold text-destructive hover:bg-destructive/10 border-destructive/30",
								children: "Cancel Event"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "sm",
								className: "text-xs font-semibold gap-1.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/events/$slug",
									params: { slug: event.slug },
									target: "_blank",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), "Public Page"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => setScannerOpen(true),
								className: "bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-4" }), "Open QR Scanner"]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-start gap-4 pt-2",
					children: [event.posterUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: event.posterUrl,
						alt: event.title,
						className: "size-20 rounded-xl object-cover border border-border shrink-0",
						onError: (e) => {
							e.target.style.display = "none";
						}
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
						initials: event.organizationInitials,
						className: "size-16 rounded-xl shrink-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-black text-foreground",
									children: event.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: event.status }),
								event.eventVerificationStatus === "VERIFIED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), "Verified"]
								}),
								event.eventVerificationStatus === "PENDING_REVIEW" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-300 border border-amber-500/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), "Verification Pending"]
								}),
								event.eventVerificationStatus === "FLAGGED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[11px] font-bold text-rose-700 dark:text-rose-300 border border-rose-500/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-3" }), "Under Review"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: [
								event.organizationName,
								" · ",
								event.universityName,
								" · ",
								event.opportunityType || "General",
								" · ",
								event.location
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 overflow-x-auto border-b border-border pb-1 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveTab("OVERVIEW"),
						className: cn("flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0", activeTab === "OVERVIEW" ? "bg-navy text-white" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4" }), "Overview"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveTab("PARTICIPANTS"),
						className: cn("flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0", activeTab === "PARTICIPANTS" ? "bg-navy text-white" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
							"Participants (",
							stats.totalRegistrations,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							if (onOpenVolunteersModal) onOpenVolunteersModal(event);
							else setActiveTab("VOLUNTEERS");
						},
						className: cn("flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0", activeTab === "VOLUNTEERS" ? "bg-navy text-white" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-4 text-rose-500" }),
							"Volunteers (",
							stats.totalVolunteers,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveTab("TICKETS"),
						className: cn("flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0", activeTab === "TICKETS" ? "bg-navy text-white" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4" }), "Tickets & Pricing"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveTab("CHECK_INS"),
						className: cn("flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0", activeTab === "CHECK_INS" ? "bg-navy text-white" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-emerald-500" }),
							"Check-In History (",
							stats.totalCheckedIn,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveTab("PROOF"),
						className: cn("flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0", activeTab === "PROOF" ? "bg-navy text-white" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" }), "Event Proof & Status"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveTab("REPORTS"),
						className: cn("flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0", activeTab === "REPORTS" ? "bg-navy text-white" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4 text-rose-500" }),
							"Reports (",
							stats.openReports,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveTab("SETTINGS"),
						className: cn("flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-colors shrink-0", activeTab === "SETTINGS" ? "bg-navy text-white" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" }), "Edit & Settings"]
					})
				]
			}),
			activeTab === "OVERVIEW" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-4 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-primary" }), "Registrations"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-2xl font-black text-foreground mt-2",
									children: stats.totalRegistrations
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-muted-foreground mt-0.5",
									children: ["Cap: ", event.capacity ? event.capacity : "Unlimited"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-4" }), "Checked In"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-2",
									children: stats.totalCheckedIn
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground mt-0.5",
									children: stats.totalRegistrations > 0 ? `${Math.round(stats.totalCheckedIn / stats.totalRegistrations * 100)}% Turnout` : "0% Turnout"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-4" }), "Volunteers"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-2xl font-black text-rose-700 dark:text-rose-300 mt-2",
									children: stats.totalVolunteers
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground mt-0.5",
									children: event.volunteerCapacity ? `Goal: ${event.volunteerCapacity}` : "Active crew"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-primary/20 bg-primary/5 p-4 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold text-primary flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4" }), "Ticket Mode"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-black text-foreground mt-2 truncate",
									children: event.pricingMode === "UNIVERSITY_STUDENT_AND_EXTERNAL" ? "Student vs External" : event.pricingMode === "SINGLE_PRICE" ? `Rs. ${event.price || 0}` : "Free for All"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground mt-0.5",
									children: event.revenue ? `Rev: Rs. ${event.revenue.toLocaleString()}` : "Free Admission"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-bold text-foreground",
							children: "Event Schedule & Location"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "space-y-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between py-1 border-b border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Start Date & Time"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-semibold text-foreground",
										children: formatDate(event.startDate)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between py-1 border-b border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "End Date"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-semibold text-foreground",
										children: formatDate(event.endDate)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between py-1 border-b border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Registration Closes"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-semibold text-foreground",
										children: formatDate(event.registrationDeadline)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between py-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Venue"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-semibold text-foreground",
										children: event.location
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-bold text-foreground",
							children: "Organizing Institution"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "space-y-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between py-1 border-b border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Society / Club"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-semibold text-foreground",
										children: event.organizationName
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between py-1 border-b border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Host University"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-semibold text-foreground",
										children: event.universityName
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between py-1 border-b border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Verification"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-semibold capitalize text-foreground",
										children: event.eventVerificationStatus?.toLowerCase().replace(/_/g, " ") || "Pending"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between py-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Category"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-semibold text-foreground",
										children: event.categoryName
									})]
								})
							]
						})]
					})]
				})]
			}),
			activeTab === "PARTICIPANTS" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventParticipantsTab, {
				eventId: event.id,
				eventTitle: event.title
			}),
			activeTab === "CHECK_INS" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCheckInsTab, {
				eventId: event.id,
				eventTitle: event.title,
				onOpenScanner: () => setScannerOpen(true)
			}),
			activeTab === "TICKETS" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-base font-bold text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4 text-primary" }), "Ticketing & University Pricing Configuration"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-surface border border-border p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase text-muted-foreground block",
										children: "Pricing Mode"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold text-foreground mt-1",
										children: event.pricingMode?.replace(/_/g, " ") || "FREE FOR ALL"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-300 block",
										children: "Verified University Student Rate"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-black text-emerald-700 dark:text-emerald-300 mt-1",
										children: event.studentPrice && Number(event.studentPrice) > 0 ? `Rs. ${Number(event.studentPrice).toLocaleString()}` : "FREE (Complimentary)"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-primary/5 border border-primary/20 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase text-primary block",
										children: "External Participant Rate"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-black text-primary mt-1",
										children: event.externalPrice ? `Rs. ${Number(event.externalPrice).toLocaleString()}` : event.price ? `Rs. ${Number(event.price).toLocaleString()}` : "FREE"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "* CampusPulse calculates ticket prices server-side upon registration based on the attendee's verified university email. External participants pay the standard external ticket price."
						})
					]
				})
			}),
			activeTab === "PROOF" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventProofTab, { event }),
			activeTab === "REPORTS" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventReportsTab, {
				eventId: event.id,
				eventTitle: event.title
			}),
			activeTab === "SETTINGS" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventEditTab, {
				event,
				onSaved: () => void query.refetch()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendeeTicketScannerDialog, {
				open: scannerOpen,
				onClose: () => setScannerOpen(false),
				eventId: event.id,
				eventTitle: event.title,
				onCheckInSuccess: () => {
					query.refetch();
					queryClient.invalidateQueries({ queryKey: [
						"events",
						"checkins",
						event.id
					] });
					queryClient.invalidateQueries({ queryKey: [
						"events",
						"participants",
						event.id
					] });
				}
			})
		]
	});
}
function OrganizerPage() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const query = useQuery({
		queryKey: ["organizer", "events"],
		queryFn: () => eventsApi.managed()
	});
	const categoriesQuery = useQuery({
		queryKey: ["categories"],
		queryFn: () => eventsApi.categories()
	});
	const orgsQuery = useQuery({
		queryKey: ["organizations"],
		queryFn: () => directoryApi.organizations()
	});
	const myOrgsQuery = useQuery({
		queryKey: ["myOrganizations"],
		queryFn: () => directoryApi.myOrganizations()
	});
	const events = query.data ?? [];
	const categories = categoriesQuery.data ?? [];
	const organizations = orgsQuery.data ?? [];
	const myMemberships = myOrgsQuery.data ?? user?.memberships ?? [];
	useQuery({
		queryKey: ["universities"],
		queryFn: () => directoryApi.universities()
	}).data;
	const isPlatformAdmin = user?.role === "ADMIN";
	const managedOrgs = (0, import_react.useMemo)(() => {
		if (isPlatformAdmin) return organizations.map((o) => ({
			organizationId: o.id,
			organizationName: o.name,
			organizationSlug: o.slug,
			role: "ADMIN",
			status: "ACTIVE",
			isVerified: o.verified,
			canCreateEvents: true,
			canManageOrg: true,
			canManageFinances: true
		}));
		return myMemberships.filter((m) => m.status === "ACTIVE" || m.canCreateEvents || m.status !== "PENDING" && m.status !== "REJECTED" && [
			"ADMIN",
			"LEADER",
			"PRESIDENT",
			"VICE_PRESIDENT",
			"EVENT_ORGANIZER",
			"EVENT_MANAGER",
			"MANAGER",
			"TREASURER",
			"SECRETARY",
			"MEMBER"
		].includes(m.role)).map((m) => ({
			organizationId: m.organizationId,
			organizationName: m.organizationName,
			organizationSlug: m.organizationSlug,
			role: m.role,
			status: m.status || "ACTIVE",
			isVerified: Boolean(m.isVerified),
			canCreateEvents: Boolean(m.canCreateEvents),
			canManageOrg: Boolean(m.canManageOrg),
			canManageFinances: isPlatformAdmin || Boolean(m.canManageFinances) || [
				"ADMIN",
				"LEADER",
				"PRESIDENT",
				"TREASURER",
				"MANAGER"
			].includes(m.role)
		}));
	}, [
		isPlatformAdmin,
		organizations,
		myMemberships
	]);
	const [selectedOrgId, setSelectedOrgId] = (0, import_react.useState)("all");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("ALL");
	const activeOrg = (0, import_react.useMemo)(() => {
		if (selectedOrgId === "all") return null;
		return managedOrgs.find((o) => o.organizationId === selectedOrgId) || null;
	}, [managedOrgs, selectedOrgId]);
	const displayedEvents = (0, import_react.useMemo)(() => {
		if (selectedOrgId === "all") return events;
		return events.filter((e) => e.organizationId === selectedOrgId);
	}, [events, selectedOrgId]);
	const filteredEvents = (0, import_react.useMemo)(() => {
		return displayedEvents.filter((e) => {
			if (statusFilter === "ALL") return true;
			if (statusFilter === "DRAFT") return e.status === "DRAFT" || e.status === "PENDING_REVIEW";
			if (statusFilter === "PUBLISHED") return e.status === "PUBLISHED";
			if (statusFilter === "CANCELLED") return e.status === "CANCELLED" || e.status === "REJECTED";
			return true;
		});
	}, [displayedEvents, statusFilter]);
	const draftCount = displayedEvents.filter((e) => e.status === "DRAFT" || e.status === "PENDING_REVIEW").length;
	const publishedCount = displayedEvents.filter((e) => e.status === "PUBLISHED").length;
	const cancelledCount = displayedEvents.filter((e) => e.status === "CANCELLED" || e.status === "REJECTED").length;
	const views = displayedEvents.reduce((s, e) => s + e.views, 0);
	const clicks = displayedEvents.reduce((s, e) => s + e.registrationClicks, 0);
	const registrations = displayedEvents.reduce((s, e) => s + e.registrations, 0);
	const [joinOpen, setJoinOpen] = (0, import_react.useState)(false);
	const [requestOrgOpen, setRequestOrgOpen] = (0, import_react.useState)(false);
	const [workspaceTab, setWorkspaceTab] = (0, import_react.useState)("EVENTS");
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [selectedManageEventId, setSelectedManageEventId] = (0, import_react.useState)(null);
	const [volunteerReviewEvent, setVolunteerReviewEvent] = (0, import_react.useState)(null);
	const [findVolunteersOpen, setFindVolunteersOpen] = (0, import_react.useState)(false);
	const [findVolunteersEvent, setFindVolunteersEvent] = (0, import_react.useState)(null);
	const [doorScannerOpen, setDoorScannerOpen] = (0, import_react.useState)(false);
	const [doorScannerEvent, setDoorScannerEvent] = (0, import_react.useState)(null);
	const [verifyOpen, setVerifyOpen] = (0, import_react.useState)(false);
	const [verifyOrgId, setVerifyOrgId] = (0, import_react.useState)("");
	const [verifyNotes, setVerifyNotes] = (0, import_react.useState)("");
	const [verifyDocUrl, setVerifyDocUrl] = (0, import_react.useState)("");
	const [verifying, setVerifying] = (0, import_react.useState)(false);
	const handlePublish = async (id, eventTitle) => {
		try {
			await eventsApi.publishEvent(id);
			toast.success(`Published "${eventTitle}" successfully! 🚀`, { description: "Your event is now live and discoverable across CampusPulse." });
			query.refetch();
			queryClient.invalidateQueries({ queryKey: ["events"] });
			queryClient.invalidateQueries({ queryKey: ["feed"] });
		} catch (err) {
			toast.error(err?.message || "Failed to publish event.");
		}
	};
	const handleDeleteDraft = async (id, eventTitle) => {
		if (!confirm(`Are you sure you want to delete the draft "${eventTitle}"?`)) return;
		try {
			await eventsApi.deleteDraft(id);
			toast.success(`Deleted draft "${eventTitle}"`);
			query.refetch();
			queryClient.invalidateQueries({ queryKey: ["events"] });
		} catch (err) {
			toast.error(err?.message || "Failed to delete draft.");
		}
	};
	const handleRequestVerification = async (e) => {
		e.preventDefault();
		const defaultVerifyOrg = (selectedOrgId !== "all" ? selectedOrgId : null) || myMemberships[0]?.organizationId || organizations[0]?.id;
		const targetOrg = verifyOrgId || defaultVerifyOrg;
		if (!targetOrg) {
			toast.error("Please select an organisation to verify.");
			return;
		}
		setVerifying(true);
		try {
			await directoryApi.requestVerification({
				organizationId: targetOrg,
				notes: verifyNotes.trim() || void 0,
				documentUrl: verifyDocUrl.trim() || void 0
			});
			toast.success("Verification request submitted", { description: "Our administration team will review your application." });
			setVerifyOpen(false);
			setVerifyNotes("");
			setVerifyDocUrl("");
		} catch (err) {
			toast.error(err?.message || "Failed to submit verification request.");
		} finally {
			setVerifying(false);
		}
	};
	if (selectedManageEventId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		roles: [
			"STUDENT",
			"ORGANIZER",
			"ADMIN"
		],
		allowOrgManagers: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventManagementWorkspace, {
				eventId: selectedManageEventId,
				onBack: () => setSelectedManageEventId(null),
				onOpenVolunteersModal: (ev) => setVolunteerReviewEvent(ev)
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RequireRole, {
		roles: [
			"STUDENT",
			"ORGANIZER",
			"ADMIN"
		],
		allowOrgManagers: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
							eyebrow: "Organization & Events",
							title: "Workspace",
							description: `Welcome, ${user?.name || "Student"}. Manage your university societies, roles, and authorized events.`
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "gap-1.5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10",
									onClick: () => {
										setDoorScannerEvent(displayedEvents[0] || null);
										setDoorScannerOpen(true);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-4 text-emerald-500" }), "Door Scanner"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "gap-1.5 border-primary/30 text-primary hover:bg-primary/10",
									onClick: () => {
										setFindVolunteersEvent(displayedEvents[0] || null);
										setFindVolunteersOpen(true);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-primary" }), "Find volunteers"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "gap-1.5",
									onClick: () => setVerifyOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" }), "Verify society"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "shrink-0 gap-1.5",
									onClick: () => setCreateOpen(true),
									disabled: managedOrgs.length === 0,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Create Event"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8 rounded-2xl border border-border bg-card p-5 shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-bold text-foreground",
								children: "Your Organizations"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "You can belong to multiple university societies with different role permissions."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									className: "gap-1.5 border-border hover:bg-surface font-semibold",
									onClick: () => setRequestOrgOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Request New Society"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									className: "gap-1.5 border-primary/30 text-primary hover:bg-primary/10 font-semibold",
									onClick: () => setJoinOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "+ Join Society"]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
							children: myMemberships.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-full py-6 text-center text-xs text-muted-foreground",
								children: "You haven't joined any university organizations yet. Click \"+ Add / Join Organization\" to submit a membership request."
							}) : myMemberships.map((m) => {
								const orgEventCount = events.filter((e) => e.organizationId === m.organizationId).length;
								const canCreate = m.canCreateEvents || m.status !== "PENDING" && m.status !== "REJECTED" && [
									"ADMIN",
									"LEADER",
									"PRESIDENT",
									"VICE_PRESIDENT",
									"EVENT_ORGANIZER",
									"EVENT_MANAGER",
									"MANAGER"
								].includes(m.role);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col justify-between rounded-xl border border-border bg-surface/50 p-4 transition-all hover:border-primary/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, { initials: m.organizationName?.slice(0, 2) || "SO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/organizations/$slug",
												params: { slug: m.organizationSlug || m.organizationId },
												className: "font-bold text-sm text-foreground hover:underline",
												children: m.organizationName
											}), m.universityName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-muted-foreground",
												children: m.universityName
											})] })]
										}), m.isVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex items-center gap-0.5 text-xs text-primary font-medium",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary",
												children: m.role.replace(/_/g, " ")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("rounded px-2 py-0.5 text-[11px] font-semibold", m.status === "ACTIVE" || !m.status ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : m.status === "PENDING" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-destructive/10 text-destructive"),
												children: m.status || "ACTIVE"
											}),
											m.organizationStatus === "PENDING" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20",
												children: "⏳ Awaiting Admin Approval"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[11px] text-muted-foreground",
												children: [
													"· ",
													orgEventCount,
													" events"
												]
											})
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-center justify-between border-t border-border/40 pt-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/organizations/$slug",
											params: { slug: m.organizationSlug || m.organizationId },
											className: "text-xs text-muted-foreground hover:text-foreground font-medium",
											children: "View Society"
										}), canCreate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											className: "h-7 text-xs font-semibold gap-1",
											onClick: () => {
												setSelectedOrgId(m.organizationId);
												setCreateOpen(true);
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" }), "Create Event"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-muted-foreground",
											children: "Member only"
										})]
									})]
								}, m.id || m.organizationId);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex items-center gap-2 border-b border-border pb-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setWorkspaceTab("EVENTS"),
								className: cn("flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors", workspaceTab === "EVENTS" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:bg-surface hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-4" }), "Events & Opportunities"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setWorkspaceTab("MEMBERS"),
								className: cn("flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors", workspaceTab === "MEMBERS" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:bg-surface hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }), "Members & Roles Directory"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setWorkspaceTab("BANK_SETTINGS"),
								className: cn("flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors", workspaceTab === "BANK_SETTINGS" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:bg-surface hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-4" }), "Society Bank & Direct Transfers"]
							})
						]
					}),
					workspaceTab === "BANK_SETTINGS" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4",
						children: [managedOrgs.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 place-items-center rounded-lg bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Active Society Workspace"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 flex flex-wrap items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										"aria-label": "Select society workspace",
										value: selectedOrgId !== "all" ? selectedOrgId : managedOrgs[0]?.organizationId || "",
										onChange: (e) => {
											const next = e.target.value;
											setSelectedOrgId(next);
											setVerifyOrgId(next);
										},
										className: "rounded-md border border-input bg-background px-3 py-1.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
										children: managedOrgs.map((org) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: org.organizationId,
											children: [
												org.organizationName,
												" (",
												org.role.replace(/_/g, " "),
												")"
											]
										}, org.organizationId))
									})
								})] })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrganizationBankSettings, {
							organizationId: selectedOrgId !== "all" ? selectedOrgId : managedOrgs[0]?.organizationId || "",
							organizationName: (selectedOrgId !== "all" ? managedOrgs.find((o) => o.organizationId === selectedOrgId)?.organizationName : managedOrgs[0]?.organizationName) || "Selected Society",
							canManageFinances: selectedOrgId !== "all" ? Boolean(managedOrgs.find((o) => o.organizationId === selectedOrgId)?.canManageFinances) : Boolean(managedOrgs[0]?.canManageFinances),
							isPlatformAdmin
						})]
					}) : workspaceTab === "MEMBERS" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4",
						children: [managedOrgs.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 place-items-center rounded-lg bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Active Society Workspace"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 flex flex-wrap items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										"aria-label": "Select society workspace",
										value: selectedOrgId !== "all" ? selectedOrgId : managedOrgs[0]?.organizationId || "",
										onChange: (e) => {
											const next = e.target.value;
											setSelectedOrgId(next);
											setVerifyOrgId(next);
										},
										className: "rounded-md border border-input bg-background px-3 py-1.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
										children: managedOrgs.map((org) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: org.organizationId,
											children: [
												org.organizationName,
												" (",
												org.role.replace(/_/g, " "),
												")"
											]
										}, org.organizationId))
									})
								})] })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrganizationMembersTab, {
							organizationId: selectedOrgId !== "all" ? selectedOrgId : managedOrgs[0]?.organizationId,
							organizationName: (selectedOrgId !== "all" ? managedOrgs.find((o) => o.organizationId === selectedOrgId)?.organizationName : managedOrgs[0]?.organizationName) || "Selected Society",
							canManageOrg: selectedOrgId !== "all" ? Boolean(managedOrgs.find((o) => o.organizationId === selectedOrgId)?.canManageOrg) : Boolean(managedOrgs[0]?.canManageOrg),
							isPlatformAdmin
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 place-items-center rounded-lg bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Active Society Workspace Filter"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 flex flex-wrap items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										"aria-label": "Select active society workspace",
										value: selectedOrgId,
										onChange: (e) => {
											const next = e.target.value;
											setSelectedOrgId(next);
											if (next !== "all") setVerifyOrgId(next);
										},
										className: "rounded-md border border-input bg-background px-3 py-1.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: "all",
											children: [
												"All Managed Societies (",
												managedOrgs.length,
												")"
											]
										}), managedOrgs.map((org) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: org.organizationId,
											children: [
												org.organizationName,
												" (",
												org.role.replace(/_/g, " "),
												")"
											]
										}, org.organizationId))]
									})
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: activeOrg ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 rounded-lg bg-surface px-3 py-1.5 text-xs font-medium",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Your Role:"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-primary/15 px-2 py-0.5 font-bold text-primary",
											children: activeOrg.role.replace(/_/g, " ")
										}),
										activeOrg.isVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " Verified"]
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: managedOrgs.length > 0 ? `Aggregating listings across ${managedOrgs.length} managed society workspace${managedOrgs.length > 1 ? "s" : ""}` : "You are not an event manager in any societies yet."
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }),
									label: "Total views",
									value: compactNumber(views)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MousePointerClick, { className: "size-4" }),
									label: "Registration clicks",
									value: compactNumber(clicks)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4" }),
									label: "Registrations",
									value: compactNumber(registrations)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-4" }),
									label: "Conversion",
									value: `${conversionRate(clicks, views).toFixed(1)}%`
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-extrabold tracking-tight",
									children: "Your listings"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Create drafts, manage live opportunities, and publish events directly."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-1.5 rounded-lg border border-border bg-surface/50 p-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setStatusFilter("ALL"),
											className: cn("rounded-md px-3 py-1 text-xs font-bold transition-colors", statusFilter === "ALL" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"),
											children: [
												"All (",
												displayedEvents.length,
												")"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setStatusFilter("DRAFT"),
											className: cn("rounded-md px-3 py-1 text-xs font-bold transition-colors", statusFilter === "DRAFT" ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 shadow-xs" : "text-muted-foreground hover:text-foreground"),
											children: [
												"Drafts (",
												draftCount,
												")"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setStatusFilter("PUBLISHED"),
											className: cn("rounded-md px-3 py-1 text-xs font-bold transition-colors", statusFilter === "PUBLISHED" ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-xs" : "text-muted-foreground hover:text-foreground"),
											children: [
												"Published (",
												publishedCount,
												")"
											]
										}),
										cancelledCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setStatusFilter("CANCELLED"),
											className: cn("rounded-md px-3 py-1 text-xs font-bold transition-colors", statusFilter === "CANCELLED" ? "bg-destructive/20 text-destructive shadow-xs" : "text-muted-foreground hover:text-foreground"),
											children: [
												"Cancelled (",
												cancelledCount,
												")"
											]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => query.refetch() }) : filteredEvents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
									title: statusFilter === "DRAFT" ? "No draft events" : statusFilter === "PUBLISHED" ? "No published events" : selectedOrgId === "all" ? "No listings yet" : `No listings for ${activeOrg?.organizationName || "this society"}`,
									description: statusFilter === "DRAFT" ? "Create a new event and save it as a draft." : "Publish your first opportunity to get started.",
									action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: () => setCreateOpen(true),
										disabled: managedOrgs.length === 0,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Create opportunity"]
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "divide-y divide-border overflow-hidden rounded-xl border border-border bg-card",
									children: filteredEvents.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/events/$slug",
													params: { slug: e.slug },
													className: "truncate text-sm font-semibold hover:underline",
													children: e.title
												}), selectedOrgId === "all" && e.organizationName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground",
													children: e.organizationName
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "truncate text-xs text-muted-foreground mt-0.5",
												children: [
													"Starts ",
													formatDate(e.startDate),
													" · ",
													compactNumber(e.views),
													" views ·",
													" ",
													conversionRate(e.registrationClicks, e.views).toFixed(1),
													"% conversion"
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: e.status }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													variant: "outline",
													className: "h-8 gap-1 text-xs font-semibold border-primary/30 text-primary hover:bg-primary/10",
													onClick: () => setSelectedManageEventId(e.id),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-3.5" }), "Manage"]
												}),
												e.status === "DRAFT" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															size: "sm",
															className: "h-8 gap-1 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs",
															onClick: () => handlePublish(e.id, e.title),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), "Publish"]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															asChild: true,
															size: "sm",
															variant: "outline",
															className: "h-8 gap-1 text-xs font-semibold",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
																to: "/events/$slug",
																params: { slug: e.slug },
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" }), "Preview"]
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															size: "sm",
															variant: "ghost",
															className: "h-8 text-xs text-destructive hover:bg-destructive/10",
															onClick: () => handleDeleteDraft(e.id, e.title),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
														})
													]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														size: "sm",
														variant: "outline",
														className: "h-8 gap-1 text-xs font-semibold border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10",
														onClick: () => {
															setDoorScannerEvent(e);
															setDoorScannerOpen(true);
														},
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-3.5" }), "Door Desk"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														size: "sm",
														variant: "outline",
														className: "h-8 gap-1 text-xs font-semibold border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10",
														onClick: () => setVolunteerReviewEvent(e),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-3.5" }), "Volunteers"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														size: "sm",
														variant: "outline",
														className: "h-8 gap-1 text-xs font-semibold border-primary/30 text-primary hover:bg-primary/10",
														onClick: () => {
															setFindVolunteersEvent(e);
															setFindVolunteersOpen(true);
														},
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), "Find Talent"]
													})
												] })
											]
										})]
									}, e.id))
								})
							})]
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateEventDialog, {
				open: createOpen,
				onOpenChange: setCreateOpen,
				managedOrgs,
				categories,
				initialOrganizationId: selectedOrgId !== "all" ? selectedOrgId : managedOrgs[0]?.organizationId
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JoinOrganizationDialog, {
				open: joinOpen,
				onOpenChange: setJoinOpen,
				onRequestNewOrg: () => {
					setJoinOpen(false);
					setRequestOrgOpen(true);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestOrganizationDialog, {
				open: requestOrgOpen,
				onOpenChange: setRequestOrgOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: verifyOpen,
				onOpenChange: setVerifyOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Request society verification" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Submit an application for your student organisation to receive the official verified badge on CampusPulse." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleRequestVerification,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "verify-org",
								children: "Society to verify"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								id: "verify-org",
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
								value: verifyOrgId || (selectedOrgId !== "all" ? selectedOrgId : myMemberships[0]?.organizationId) || organizations[0]?.id || "",
								onChange: (e) => setVerifyOrgId(e.target.value),
								required: true,
								children: (isPlatformAdmin ? organizations : myMemberships.length > 0 ? myMemberships : organizations).map((org) => {
									const id = org.organizationId || org.id;
									const name = org.organizationName || org.name;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: id,
										children: [
											name,
											" ",
											org.role ? `(${String(org.role).replace(/_/g, " ")})` : ""
										]
									}, id);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "verify-doc",
								children: "Verification document URL (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "verify-doc",
								placeholder: "https://docs.google.com/... or university endorsement link",
								value: verifyDocUrl,
								onChange: (e) => setVerifyDocUrl(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "verify-notes",
								children: "Application notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "verify-notes",
								placeholder: "Explain your society's university affiliation, faculty advisor, or student union registration...",
								rows: 3,
								value: verifyNotes,
								onChange: (e) => setVerifyNotes(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => setVerifyOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: verifying,
							children: verifying ? "Submitting…" : "Submit application"
						})] })
					]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerManagementDialog, {
				event: volunteerReviewEvent,
				onClose: () => setVolunteerReviewEvent(null),
				onFindCandidates: () => {
					const ev = volunteerReviewEvent;
					setVolunteerReviewEvent(null);
					setFindVolunteersEvent(ev);
					setFindVolunteersOpen(true);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindVolunteersModal, {
				open: findVolunteersOpen,
				onClose: () => setFindVolunteersOpen(false),
				events: displayedEvents,
				initialEvent: findVolunteersEvent
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendeeTicketScannerDialog, {
				open: doorScannerOpen,
				onClose: () => setDoorScannerOpen(false),
				eventTitle: doorScannerEvent?.title
			})
		]
	});
}
function VolunteerManagementDialog({ event, onClose, onFindCandidates }) {
	const queryClient = useQueryClient();
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("ALL");
	const [roleFilter, setRoleFilter] = (0, import_react.useState)("ALL");
	const [acceptingApp, setAcceptingApp] = (0, import_react.useState)(null);
	const [assignedRoleInput, setAssignedRoleInput] = (0, import_react.useState)("");
	const [acceptFeedback, setAcceptFeedback] = (0, import_react.useState)("");
	const [isSubmittingAccept, setIsSubmittingAccept] = (0, import_react.useState)(false);
	const [rejectingApp, setRejectingApp] = (0, import_react.useState)(null);
	const [rejectFeedback, setRejectFeedback] = (0, import_react.useState)("");
	const [isSubmittingReject, setIsSubmittingReject] = (0, import_react.useState)(false);
	const [completingApp, setCompletingApp] = (0, import_react.useState)(null);
	const [confirmedHoursInput, setConfirmedHoursInput] = (0, import_react.useState)("4.0");
	const [confirmNotesInput, setConfirmNotesInput] = (0, import_react.useState)("");
	const [issueCertificateInput, setIssueCertificateInput] = (0, import_react.useState)(true);
	const [isSubmittingComplete, setIsSubmittingComplete] = (0, import_react.useState)(false);
	const [isScanQrOpen, setIsScanQrOpen] = (0, import_react.useState)(false);
	const appsQuery = useQuery({
		queryKey: [
			"volunteering",
			"event-applicants",
			event?.id
		],
		queryFn: () => event ? volunteeringApi.getEventApplications(event.id, { limit: 100 }) : Promise.resolve({
			total: 0,
			items: [],
			skip: 0,
			limit: 100
		}),
		enabled: Boolean(event)
	});
	const statsQuery = useQuery({
		queryKey: [
			"volunteering",
			"event-stats",
			event?.id
		],
		queryFn: () => event ? volunteeringApi.getEventStats(event.id) : Promise.resolve(null),
		enabled: Boolean(event)
	});
	if (!event) return null;
	const applicants = appsQuery.data?.items || [];
	const stats = statsQuery.data;
	const filteredApplicants = applicants.filter((app) => {
		if (statusFilter !== "ALL" && app.status !== statusFilter) return false;
		if (roleFilter !== "ALL" && app.role !== roleFilter) return false;
		return true;
	});
	const uniqueRoles = Array.from(new Set(applicants.map((a) => a.role)));
	const handleAcceptSubmit = async (e) => {
		e.preventDefault();
		if (!acceptingApp) return;
		setIsSubmittingAccept(true);
		try {
			await volunteeringApi.reviewApplication(acceptingApp.id, {
				status: "ACCEPTED",
				assignedRole: assignedRoleInput.trim() || acceptingApp.role,
				feedback: acceptFeedback.trim() || void 0
			});
			toast.success(`Accepted ${acceptingApp.userName || "applicant"} as ${assignedRoleInput.trim() || acceptingApp.role}! 🎉`);
			setAcceptingApp(null);
			setAssignedRoleInput("");
			setAcceptFeedback("");
			queryClient.invalidateQueries({ queryKey: [
				"volunteering",
				"event-applicants",
				event.id
			] });
			queryClient.invalidateQueries({ queryKey: [
				"volunteering",
				"event-stats",
				event.id
			] });
		} catch (err) {
			toast.error(err?.message || "Failed to accept application.");
		} finally {
			setIsSubmittingAccept(false);
		}
	};
	const handleRejectSubmit = async (e) => {
		e.preventDefault();
		if (!rejectingApp) return;
		setIsSubmittingReject(true);
		try {
			await volunteeringApi.reviewApplication(rejectingApp.id, {
				status: "REJECTED",
				feedback: rejectFeedback.trim() || void 0
			});
			toast.success(`Application marked as not selected.`);
			setRejectingApp(null);
			setRejectFeedback("");
			queryClient.invalidateQueries({ queryKey: [
				"volunteering",
				"event-applicants",
				event.id
			] });
			queryClient.invalidateQueries({ queryKey: [
				"volunteering",
				"event-stats",
				event.id
			] });
		} catch (err) {
			toast.error(err?.message || "Failed to reject application.");
		} finally {
			setIsSubmittingReject(false);
		}
	};
	const handleCompleteSubmit = async () => {
		if (!completingApp) return;
		setIsSubmittingComplete(true);
		try {
			const hoursNum = parseFloat(confirmedHoursInput) || 4;
			if (completingApp.participation?.id) await volunteeringApi.confirmParticipation(completingApp.participation.id, {
				hours: hoursNum,
				notes: confirmNotesInput.trim() || void 0,
				issueCertificate: issueCertificateInput
			});
			else await volunteeringApi.reviewApplication(completingApp.id, { status: "COMPLETED" });
			toast.success(`Marked volunteer service as COMPLETED! Verified record and ${hoursNum} hours confirmed.`);
			setCompletingApp(null);
			queryClient.invalidateQueries({ queryKey: [
				"volunteering",
				"event-applicants",
				event.id
			] });
			queryClient.invalidateQueries({ queryKey: [
				"volunteering",
				"event-stats",
				event.id
			] });
		} catch (err) {
			toast.error(err?.message || "Failed to mark as completed.");
		} finally {
			setIsSubmittingComplete(false);
		}
	};
	if (!event) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: Boolean(event),
			onOpenChange: (open) => !open && onClose(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-h-[90vh] max-w-4xl overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-rose-500 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold uppercase tracking-wider",
									children: "Volunteer Management"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									className: "h-7 text-xs gap-1.5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10",
									onClick: () => setIsScanQrOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-3.5" }), "Scan / Validate Pass"]
								}), onFindCandidates && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									className: "h-7 text-xs gap-1.5 border-primary/30 text-primary hover:bg-primary/10",
									onClick: onFindCandidates,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), "Find Matching Candidates"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "text-xl font-black",
							children: event.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Review student volunteer applications, inspect academic profiles, assign official roles, scan crew QR passes, and certify hours." })
					] }),
					stats && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid grid-cols-2 sm:grid-cols-5 gap-2.5 rounded-xl border border-border/80 bg-muted/40 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-card p-2 text-center border border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-semibold text-muted-foreground uppercase",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base font-bold text-foreground",
									children: stats.counts.total
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-amber-500/10 p-2 text-center border border-amber-500/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase",
									children: "Pending"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base font-bold text-amber-600 dark:text-amber-400",
									children: stats.counts.pending
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-emerald-500/10 p-2 text-center border border-emerald-500/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase",
									children: ["Accepted ", stats.capacity ? `/ ${stats.capacity}` : ""]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base font-bold text-emerald-600 dark:text-emerald-400",
									children: stats.counts.accepted
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-destructive/10 p-2 text-center border border-destructive/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-semibold text-destructive uppercase",
									children: "Rejected"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base font-bold text-destructive",
									children: stats.counts.rejected
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-2 sm:col-span-1 rounded-lg bg-primary/10 p-2 text-center border border-primary/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-semibold text-primary uppercase",
									children: "Completed"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base font-bold text-primary",
									children: stats.counts.completed
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								"ALL",
								"PENDING",
								"ACCEPTED",
								"COMPLETED",
								"REJECTED",
								"WITHDRAWN"
							].map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setStatusFilter(st),
								className: cn("rounded-full px-3 py-1 text-xs font-semibold transition-colors", statusFilter === st ? "bg-navy text-navy-foreground" : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground"),
								children: st === "ALL" ? "All Applicants" : st.charAt(0) + st.slice(1).toLowerCase()
							}, st))
						}), uniqueRoles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"aria-label": "Filter by role",
							value: roleFilter,
							onChange: (e) => setRoleFilter(e.target.value),
							className: "rounded-md border border-input bg-background px-2.5 py-1 text-xs font-semibold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: "ALL",
								children: [
									"All Roles (",
									uniqueRoles.length,
									")"
								]
							}), uniqueRoles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: r,
								children: r
							}, r))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-3",
						children: appsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : filteredApplicants.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-6 text-rose-500" }),
							title: "No applicants found",
							description: "No volunteer applications match the selected status or role filter."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: filteredApplicants.map((app) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-xl border border-border bg-card p-4 shadow-sm transition-all",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
												initials: app.userName?.slice(0, 2).toUpperCase() || "ST",
												className: "size-10 shrink-0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap items-center gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															className: "text-sm font-bold text-foreground",
															children: app.userName || app.user?.name || "Student Applicant"
														}),
														app.userUniversityName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary",
															children: app.userUniversityName
														}),
														app.participation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-mono text-[10px] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/20",
															children: ["Pass: ", app.participation.ticketNumber]
														}),
														app.participation?.attendanceStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase border", app.participation.attendanceStatus === "CHECKED_IN" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" : app.participation.attendanceStatus === "CHECKED_OUT" ? "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30" : app.participation.attendanceStatus === "COMPLETED" ? "bg-primary/15 text-primary border-primary/30" : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30"),
															children: app.participation.attendanceStatus.replace("_", " ")
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", app.status === "ACCEPTED" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : app.status === "PENDING" ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" : app.status === "COMPLETED" ? "bg-primary/15 text-primary" : app.status === "REJECTED" ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"),
															children: app.status
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-0.5 text-xs text-muted-foreground",
													children: [
														app.userEmail || app.user?.email,
														" ·",
														" ",
														app.userFacultyName || app.user?.studentProfile?.faculty || "Undergraduate",
														" ·",
														" ",
														app.userAcademicYear || app.user?.studentProfile?.academicYear || "Year 2"
													]
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2 shrink-0",
											children: [
												(app.status === "PENDING" || app.status === "REJECTED") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													className: "h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1",
													onClick: () => {
														setAcceptingApp(app);
														setAssignedRoleInput(app.role);
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), "Accept & Assign Role"]
												}),
												app.status === "PENDING" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													variant: "ghost",
													className: "h-7 text-xs text-destructive hover:bg-destructive/10",
													onClick: () => setRejectingApp(app),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3.5 mr-1" }), "Reject"]
												}),
												app.status === "ACCEPTED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													variant: "outline",
													className: "h-7 text-xs font-semibold text-primary border-primary/30 hover:bg-primary/10 gap-1",
													onClick: () => {
														setCompletingApp(app);
														setConfirmedHoursInput(String(app.participation?.confirmedHours ?? app.participation?.calculatedHours ?? 4));
														setConfirmNotesInput(app.feedback || "");
														setIssueCertificateInput(true);
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-3.5" }), "Confirm & Award Hours"]
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 grid gap-2.5 rounded-lg border border-border/60 bg-muted/20 p-3 sm:grid-cols-2 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-muted-foreground",
												children: "Applied Role: "
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-foreground",
												children: app.role
											})] }),
											app.assignedRole && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-emerald-600 dark:text-emerald-400",
												children: "Official Assigned Role: "
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-emerald-700 dark:text-emerald-300",
												children: app.assignedRole
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-muted-foreground",
												children: "Availability: "
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-foreground",
												children: app.availability || "Full day commitment"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-muted-foreground",
												children: "Applied: "
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-foreground",
												children: formatDate(app.appliedAt || app.createdAt)
											})] })
										]
									}),
									(app.participation?.checkInTime || app.participation?.checkOutTime || app.participation?.confirmedHours) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground bg-muted/30 px-2.5 py-1.5 rounded-md border border-border/60",
										children: [
											app.participation.checkInTime && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Checked In: ", formatDate(app.participation.checkInTime)] }),
											app.participation.checkOutTime && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Checked Out: ", formatDate(app.participation.checkOutTime)] }),
											app.participation.confirmedHours ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-emerald-600 dark:text-emerald-400",
												children: [app.participation.confirmedHours, " hrs Verified 🎖️"]
											}) : app.participation.calculatedHours ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold text-primary",
												children: [app.participation.calculatedHours.toFixed(1), " hrs Logged"]
											}) : null
										]
									}),
									app.skills && app.skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex flex-wrap items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-muted-foreground mr-1",
											children: "Skills:"
										}), app.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-secondary/80 px-1.5 py-0.5 text-[10px] font-medium",
											children: s
										}, s))]
									}),
									app.statement && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: "Statement: "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "italic",
											children: [
												"\"",
												app.statement,
												"\""
											]
										})]
									}),
									app.feedback && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-2 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5 text-primary mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-primary",
											children: "Instructions sent to student: "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: app.feedback
										})] })]
									})
								]
							}, app.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
						className: "mt-4 border-t border-border pt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: onClose,
							children: "Close"
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: Boolean(acceptingApp),
			onOpenChange: (o) => !o && setAcceptingApp(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Accept Volunteer & Assign Official Role" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
				"Confirm acceptance for ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: acceptingApp?.userName }),
				" into your event crew."
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAcceptSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "assigned-role",
							children: "Official Assigned Role *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "assigned-role",
							placeholder: "e.g. Lead Event Photographer, Desk Lead",
							value: assignedRoleInput,
							onChange: (e) => setAssignedRoleInput(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "accept-feedback",
							children: "Welcome Instructions / Briefing Note"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "accept-feedback",
							placeholder: "e.g. Welcome to the crew! Please report to the media desk at 7:30 AM on event day with your camera gear.",
							rows: 3,
							value: acceptFeedback,
							onChange: (e) => setAcceptFeedback(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => setAcceptingApp(null),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold",
						disabled: isSubmittingAccept,
						children: isSubmittingAccept ? "Accepting…" : "Confirm Acceptance"
					})] })
				]
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: Boolean(rejectingApp),
			onOpenChange: (o) => !o && setRejectingApp(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Decline Volunteer Application" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
				"Provide constructive feedback to ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: rejectingApp?.userName }),
				"."
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleRejectSubmit,
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "reject-feedback",
						children: "Reason / Feedback Message"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "reject-feedback",
						placeholder: "e.g. Thank you for your interest. The AV technical crew has reached full capacity.",
						rows: 3,
						value: rejectFeedback,
						onChange: (e) => setRejectFeedback(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setRejectingApp(null),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "destructive",
					disabled: isSubmittingReject,
					children: isSubmittingReject ? "Declining…" : "Confirm Decline"
				})] })]
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: Boolean(completingApp),
			onOpenChange: (o) => !o && setCompletingApp(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Confirm Volunteer Participation & Hours" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
						"Confirm completed service for ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: completingApp?.userName }),
						" as",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: completingApp?.assignedRole || completingApp?.role }),
						"."
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 py-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "confirmed-hours",
										children: "Verified Service Hours *"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "confirmed-hours",
										type: "number",
										step: "0.5",
										min: "0.5",
										max: "100",
										value: confirmedHoursInput,
										onChange: (e) => setConfirmedHoursInput(e.target.value),
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "Official volunteer hours credited toward the student's verified academic & society portfolio."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "confirm-notes",
									children: "Organizer Commendation / Feedback (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "confirm-notes",
									placeholder: "e.g. Outstanding performance leading the crowd desk during keynotes...",
									rows: 3,
									value: confirmNotesInput,
									onChange: (e) => setConfirmNotesInput(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "issue-cert",
									type: "checkbox",
									checked: issueCertificateInput,
									onChange: (e) => setIssueCertificateInput(e.target.checked),
									className: "mt-0.5 size-4 accent-primary rounded border-border"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "issue-cert",
									className: "text-xs font-semibold cursor-pointer",
									children: "Issue Official Verified Digital Certificate"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Generates an authenticated digital certificate with a verifiable credential ID on CampusPulse."
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }), "Verified Non-Spoofable Record"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground leading-relaxed",
									children: "Once confirmed, this experience will be permanently published to the student's verified profile and cannot be forged."
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setCompletingApp(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold",
							disabled: isSubmittingComplete,
							onClick: handleCompleteSubmit,
							children: isSubmittingComplete ? "Confirming…" : "Confirm & Issue Credential"
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerScanQrDialog, {
			open: isScanQrOpen,
			onClose: () => setIsScanQrOpen(false),
			event,
			acceptedApplicants: applicants.filter((a) => a.status === "ACCEPTED" || a.status === "COMPLETED"),
			onConfirmedParticipation: () => {
				queryClient.invalidateQueries({ queryKey: [
					"volunteering",
					"event-applicants",
					event.id
				] });
				queryClient.invalidateQueries({ queryKey: [
					"volunteering",
					"event-stats",
					event.id
				] });
			}
		})
	] });
}
function VolunteerScanQrDialog({ open, onClose, event, acceptedApplicants, onConfirmedParticipation }) {
	const [tokenInput, setTokenInput] = (0, import_react.useState)("");
	const [isValidating, setIsValidating] = (0, import_react.useState)(false);
	const [validatedData, setValidatedData] = (0, import_react.useState)(null);
	const [isCheckingIn, setIsCheckingIn] = (0, import_react.useState)(false);
	const [isCheckingOut, setIsCheckingOut] = (0, import_react.useState)(false);
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
	const handleValidate = async (customToken) => {
		const tok = (customToken || tokenInput).trim();
		if (!tok) {
			toast.error("Please enter or scan a volunteer QR token");
			return;
		}
		setIsValidating(true);
		setValidatedData(null);
		try {
			const result = await volunteeringApi.validateQr(tok);
			setValidatedData(result);
			toast.success("Volunteer Ticket Verified! Backend validation successful.");
		} catch (err) {
			toast.error(err?.message || "Invalid or unauthorized QR token.");
		} finally {
			setIsValidating(false);
		}
	};
	const handleCheckIn = async () => {
		const tok = tokenInput.trim();
		if (!tok) return;
		setIsCheckingIn(true);
		try {
			const res = await volunteeringApi.checkIn(tok);
			toast.success(`Checked In ${res.ticket.volunteerName}! Attendance recorded 🎉`);
			await handleValidate(tok);
			onConfirmedParticipation?.();
		} catch (err) {
			toast.error(err?.message || "Check-in failed.");
		} finally {
			setIsCheckingIn(false);
		}
	};
	const handleCheckOut = async () => {
		const tok = tokenInput.trim();
		if (!tok) return;
		setIsCheckingOut(true);
		try {
			const res = await volunteeringApi.checkOut(tok);
			toast.success(`Checked Out ${res.ticket.volunteerName}! ${res.calculatedHours?.toFixed(1) || 0} volunteer hours calculated.`);
			await handleValidate(tok);
			onConfirmedParticipation?.();
		} catch (err) {
			toast.error(err?.message || "Check-out failed.");
		} finally {
			setIsCheckingOut(false);
		}
	};
	const currentStatus = validatedData?.ticket?.attendanceStatus;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-wider",
							children: "Event Desk QR Scanner"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-lg font-black",
						children: "Scan / Validate Volunteer Pass"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Independent backend verification of volunteer credentials, check-in timestamps, and hours tracking." })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 py-2",
					children: [
						acceptedApplicants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/80 bg-muted/40 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-2",
								children: "Simulate Scan from Accepted Crew Roster:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: acceptedApplicants.map((app) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: async () => {
										try {
											const ticket = await volunteeringApi.getVolunteerTicket(app.id);
											if (ticket?.qrToken) {
												setTokenInput(ticket.qrToken);
												await handleValidate(ticket.qrToken);
											}
										} catch (err) {
											toast.error(err?.message || "Could not fetch volunteer ticket");
										}
									},
									className: "rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:bg-accent transition-colors",
									children: [
										app.userName || "Volunteer",
										" (",
										app.assignedRole || app.role,
										")"
									]
								}, app.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "qr-token-input",
									children: "Volunteer QR Security Token"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "qr-token-input",
											placeholder: "Scan or paste token (e.g. cptok_vol_...)",
											value: tokenInput,
											onChange: (e) => setTokenInput(e.target.value),
											className: "font-mono text-xs"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											size: "sm",
											onClick: handlePaste,
											className: "shrink-0 text-xs gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "Paste"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											size: "sm",
											onClick: () => handleValidate(),
											disabled: isValidating || !tokenInput.trim(),
											className: "shrink-0 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold",
											children: isValidating ? "Validating…" : "Validate Pass"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "The backend independently verifies the cryptographically unguessable token and organizer permissions."
								})
							]
						}),
						validatedData && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3 animate-in fade-in-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-base font-bold text-foreground",
											children: validatedData.ticket.volunteerName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30",
											children: "AUTHENTICATED"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: validatedData.ticket.volunteerEmail
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("rounded-full px-2.5 py-0.5 text-xs font-bold uppercase border", currentStatus === "CHECKED_IN" ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40" : currentStatus === "CHECKED_OUT" ? "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/40" : currentStatus === "COMPLETED" ? "bg-primary/20 text-primary border-primary/40" : "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40"),
										children: currentStatus?.replace("_", " ")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 text-xs rounded-lg border border-border/60 bg-card p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold uppercase text-muted-foreground block",
											children: "Assigned Role"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: validatedData.ticket.assignedRole
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold uppercase text-muted-foreground block",
											children: "Pass Identifier"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-semibold text-foreground",
											children: validatedData.ticket.ticketNumber
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold uppercase text-muted-foreground block",
											children: "Check-In Time"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: validatedData.ticket.checkInTime ? formatDate(validatedData.ticket.checkInTime) : "Not yet checked in"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold uppercase text-muted-foreground block",
											children: "Check-Out Time"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: validatedData.ticket.checkOutTime ? formatDate(validatedData.ticket.checkOutTime) : "Shift in progress / not checked out"
										})] }),
										validatedData.ticket.calculatedHours !== null && validatedData.ticket.calculatedHours !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "col-span-2 border-t border-border pt-2 mt-1 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-muted-foreground",
												children: "Calculated Shift Hours:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-black text-sm text-primary",
												children: [validatedData.ticket.calculatedHours.toFixed(1), " Hours"]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2 flex flex-wrap items-center gap-2",
									children: [
										currentStatus === "NOT_CHECKED_IN" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											onClick: handleCheckIn,
											disabled: isCheckingIn,
											className: "w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), isCheckingIn ? "Recording Check-In…" : "Record Volunteer Check-In"]
										}),
										currentStatus === "CHECKED_IN" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											onClick: handleCheckOut,
											disabled: isCheckingOut,
											className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }), isCheckingOut ? "Recording Check-Out…" : "Record Volunteer Check-Out (Compute Hours)"]
										}),
										(currentStatus === "CHECKED_OUT" || currentStatus === "COMPLETED") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "w-full rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-center text-xs text-emerald-700 dark:text-emerald-300 font-semibold flex items-center justify-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }), "Volunteer duty completed! Hours calculated and eligible for verified certification."]
										})
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: onClose,
						children: "Close Scanner"
					})
				})
			]
		})
	});
}
function FindVolunteersModal({ open, onClose, events, initialEvent }) {
	const [selectedEventId, setSelectedEventId] = (0, import_react.useState)(initialEvent?.id || (events.length > 0 && events[0] ? events[0].id : ""));
	const [selectedUniversityId, setSelectedUniversityId] = (0, import_react.useState)("");
	const [availabilityFilter, setAvailabilityFilter] = (0, import_react.useState)("");
	const [selectedSkillChips, setSelectedSkillChips] = (0, import_react.useState)([]);
	const [customSkill, setCustomSkill] = (0, import_react.useState)("");
	const [invitingCandidate, setInvitingCandidate] = (0, import_react.useState)(null);
	const [inviteRole, setInviteRole] = (0, import_react.useState)("Event Support");
	const [isSendingInvite, setIsSendingInvite] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (initialEvent?.id) setSelectedEventId(initialEvent.id);
		else if (events.length > 0 && !selectedEventId) {
			const first = events[0];
			if (first) setSelectedEventId(first.id);
		}
	}, [initialEvent, events]);
	const targetEvent = (0, import_react.useMemo)(() => {
		return events.find((e) => e.id === selectedEventId) || null;
	}, [events, selectedEventId]);
	const universitiesQuery = useQuery({
		queryKey: ["universities"],
		queryFn: () => directoryApi.universities()
	});
	const candidatesQuery = useQuery({
		queryKey: [
			"volunteering",
			"candidates",
			selectedEventId,
			selectedUniversityId,
			availabilityFilter,
			selectedSkillChips
		],
		queryFn: () => volunteeringApi.findCandidates({
			eventId: selectedEventId || void 0,
			universityId: selectedUniversityId || void 0,
			availability: availabilityFilter || void 0,
			skills: selectedSkillChips.length > 0 ? selectedSkillChips : void 0,
			limit: 30
		}),
		enabled: open
	});
	const candidates = candidatesQuery.data?.items ?? [];
	const toggleSkill = (skill) => {
		setSelectedSkillChips((prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]);
	};
	const handleAddCustomSkill = (e) => {
		e.preventDefault();
		if (customSkill.trim() && !selectedSkillChips.includes(customSkill.trim())) {
			setSelectedSkillChips((prev) => [...prev, customSkill.trim()]);
			setCustomSkill("");
		}
	};
	const handleSendInvite = async () => {
		if (!invitingCandidate) return;
		setIsSendingInvite(true);
		setTimeout(() => {
			setIsSendingInvite(false);
			toast.success(`Invitation sent to ${invitingCandidate.name}!`, { description: `Invited as "${inviteRole}" for ${targetEvent?.title || "your campus opportunity"}.` });
			setInvitingCandidate(null);
		}, 600);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[92vh] max-w-5xl overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-primary mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-wider",
							children: "Talent Discovery & Volunteer Matching"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-xl font-black",
						children: "Find Volunteers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Discover, rank, and recruit motivated student volunteers across Sri Lankan campuses based on skills, verified track record, and availability." })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-emerald-700 dark:text-emerald-300",
							children: "Shielded Student Privacy:"
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground leading-relaxed",
							children: "Personal contact details (phone numbers, physical addresses, private emails) are strictly shielded. Only students who have opted into volunteer matching and meet privacy visibility criteria appear in candidate searches."
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-4 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block",
								children: "Match Against Opportunity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: selectedEventId,
								onChange: (e) => setSelectedEventId(e.target.value),
								className: "w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
								children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: e.id,
									children: e.title
								}, e.id))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block",
								children: "University"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: selectedUniversityId,
								onChange: (e) => setSelectedUniversityId(e.target.value),
								className: "w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "All Campuses (Inter-University)"
								}), (universitiesQuery.data ?? []).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: u.id,
									children: u.name
								}, u.id))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block",
								children: "Availability"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: availabilityFilter,
								onChange: (e) => setAvailabilityFilter(e.target.value),
								className: "w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Any Schedule"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "FLEXIBLE",
										children: "Flexible / Whenever Needed"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "WEEKENDS",
										children: "Weekends Only"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "WEEKDAYS",
										children: "Weekdays"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "EVENINGS",
										children: "Evenings"
									})
								]
							})] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block",
						children: "Filter by Skills"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-1.5",
						children: [[
							"Photography",
							"Videography",
							"Logistics",
							"Technical Support",
							"Social Media",
							"Event Hosting",
							"Registration Desk",
							"Python",
							"React",
							"Crowd Coordination"
						].map((skill) => {
							const isSelected = selectedSkillChips.includes(skill);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleSkill(skill),
								className: cn("rounded-full px-2.5 py-1 text-xs font-medium transition-colors", isSelected ? "bg-primary text-primary-foreground font-semibold" : "bg-secondary text-secondary-foreground hover:bg-accent"),
								children: [isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "inline-block size-3 mr-1" }), skill]
							}, skill);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
							onSubmit: handleAddCustomSkill,
							className: "inline-flex items-center gap-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "+ Add skill tag",
								value: customSkill,
								onChange: (e) => setCustomSkill(e.target.value),
								className: "h-6 rounded border border-border bg-surface px-2 text-xs focus:border-primary focus:outline-none"
							})
						})]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: candidatesQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : candidatesQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => candidatesQuery.refetch() }) : candidates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-6 text-primary" }),
						title: "No volunteer candidates matched your criteria",
						description: "Try adjusting your skills or availability filters, or select a different opportunity."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-3 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Found ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: candidates.length
							}),
							" matching candidate(s)"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sorted by Match Percentage (rule-based explainable score)" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: candidates.map((c) => {
							const matchColorClass = c.matchPercentage >= 75 ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" : c.matchPercentage >= 50 ? "bg-primary/15 text-primary border-primary/30" : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col justify-between rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-border/80 hover:shadow-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgAvatar, {
												initials: c.name.slice(0, 2).toUpperCase(),
												className: "size-10 shrink-0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "text-sm font-bold text-foreground leading-snug truncate",
														children: c.name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xs text-muted-foreground truncate",
														children: [c.universityName, c.facultyName && ` · ${c.facultyName}`]
													}),
													c.academicYear && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[11px] text-muted-foreground",
														children: [
															c.academicYear,
															" ",
															c.departmentName && `· ${c.departmentName}`
														]
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: cn("inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border", matchColorClass),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }),
												c.matchPercentage,
												"% Match"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap items-center gap-1.5 text-[11px]",
										children: [c.verifiedVolunteerMissions > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded bg-primary/10 text-primary px-2 py-0.5 font-semibold",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-3" }),
												c.verifiedVolunteerMissions,
												" Verified Volunteer Mission",
												c.verifiedVolunteerMissions > 1 ? "s" : ""
											]
										}), c.availability && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), c.availability]
										})]
									}),
									c.reasons && c.reasons.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 rounded-lg border border-primary/15 bg-primary/5 p-2.5 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-primary block mb-1",
											children: "Match Signals:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-1 text-muted-foreground",
											children: c.reasons.slice(0, 3).map((r, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-1.5 text-[11px] leading-tight",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-emerald-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r })]
											}, idx))
										})]
									}),
									c.relevantExperienceSummary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: "Experience: "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.relevantExperienceSummary })]
									}),
									c.volunteerBio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 text-xs text-muted-foreground italic line-clamp-2",
										children: [
											"\"",
											c.volunteerBio,
											"\""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap items-center gap-1 text-[11px]",
										children: [c.matchingSkills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-2.5" }), s]
										}, s)), c.skills.filter((s) => !c.matchingSkills.includes(s)).slice(0, 4).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-secondary/70 px-1.5 py-0.5 text-muted-foreground",
											children: s
										}, s))]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 flex items-center justify-end border-t border-border pt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										className: "h-8 gap-1.5 text-xs font-semibold",
										onClick: () => setInvitingCandidate(c),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3" }), "Invite to Crew"]
									})
								})]
							}, c.userId);
						})
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: Boolean(invitingCandidate),
					onOpenChange: (o) => !o && setInvitingCandidate(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: [
							"Invite ",
							invitingCandidate?.name,
							" to Crew"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
							"Send a direct volunteer role invitation for ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: targetEvent?.title || "your opportunity" }),
							"."
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3.5 mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block",
								children: "Select Role Assignment"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: inviteRole,
								onChange: (e) => setInviteRole(e.target.value),
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Registration Desk",
										children: "Registration Desk"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Event Support",
										children: "Event Support & Ushering"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Technical Support",
										children: "Technical & AV Support"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Photography",
										children: "Photography & Media"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Videography",
										children: "Videography"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Social Media",
										children: "Social Media & Live Coverage"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Crowd Management",
										children: "Crowd Coordination"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Logistics & Setup",
										children: "Logistics & Venue Setup"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Workshop Assistant",
										children: "Workshop Assistant"
									})
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-primary",
									children: "Candidate Privacy & Notification:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1",
									children: "The candidate will receive a notification on CampusPulse. No personal phone numbers or addresses are revealed during this process."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setInvitingCandidate(null),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: isSendingInvite,
								onClick: handleSendInvite,
								className: "gap-1.5",
								children: isSendingInvite ? "Sending..." : "Confirm Invitation"
							})]
						})
					] })
				})
			]
		})
	});
}
//#endregion
export { OrganizerPage as component };
