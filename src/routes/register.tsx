import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Building2, ArrowLeft, RefreshCw, KeyRound, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "./login";
import { useAuth } from "@/lib/auth";
import type { Role, DomainCheckResult } from "@/lib/types";
import { apiGet } from "@/lib/api/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your account — CampusPulse" },
      {
        name: "description",
        content: "Join CampusPulse to discover university opportunities, register and build teams.",
      },
      { property: "og:title", content: "Create your account — CampusPulse" },
      { property: "og:description", content: "Join CampusPulse — free for every university student and organiser." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RegisterPage,
});

const ROLES: { value: Role; label: string; hint: string }[] = [
  { value: "STUDENT", label: "Student", hint: "Personal or university email" },
  { value: "ORGANIZER", label: "Organiser", hint: "Verified university email required" },
];

function RegisterPage() {
  const { register, loginWithGoogle, requestOrganizerVerification, verifyOrganizerEmail, resendOrganizerVerification, checkDomain } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<"FORM" | "OTP" | "SUCCESS">("FORM");
  const [role, setRole] = useState<Role>("STUDENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const [domainInfo, setDomainInfo] = useState<DomainCheckResult | null>(null);
  const [checkingDomain, setCheckingDomain] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);

  // OTP cooldown timer
  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  // Debounced domain check
  useEffect(() => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed.includes("@") || trimmed.length < 5) {
      setDomainInfo(null);
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingDomain(true);
      try {
        const res = await checkDomain(trimmed);
        setDomainInfo(res);
      } catch {
        setDomainInfo(null);
      } finally {
        setCheckingDomain(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [email, checkDomain]);

  // Cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const validateForm = () => {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next["name"] = "Enter your full name.";
    if (!email.includes("@") || !email.includes(".")) next["email"] = "Enter a valid email address.";

    if (role === "ORGANIZER") {
      if (domainInfo && !domainInfo.valid && domainInfo.reason === "PUBLIC_EMAIL") {
        next["email"] = "Organizer accounts require a verified university or institutional email address.";
      } else if (domainInfo && !domainInfo.valid && domainInfo.reason === "UNSUPPORTED_DOMAIN") {
        next["email"] = "We couldn't verify this university email domain. Please use a supported institutional address.";
      }
    }

    if (password.length < 8) {
      next["password"] = "Password must be at least 8 characters long.";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(password)) {
      next["password"] = "Password must contain at least one letter and one number.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setBusy(true);
    try {
      await register({
        name,
        email,
        password,
        role: "STUDENT",
        universityId: domainInfo?.university?.id,
      });
      toast.success("Account created successfully!");
      navigate({ to: "/account" });
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Unable to create your account." });
    } finally {
      setBusy(false);
    }
  };

  const handleOrganizerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setBusy(true);
    try {
      const res = await requestOrganizerVerification({
        name,
        email,
        password,
        universityId: domainInfo?.university?.id,
      });
      toast.success(res.message || "Verification code dispatched to your university email.");
      setStep("OTP");
      setCooldown(60);
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Unable to request organizer verification." });
    } finally {
      setBusy(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = otpCode.trim();
    if (cleanCode.length !== 6 || !/^\d{6}$/.test(cleanCode)) {
      setErrors({ otp: "Please enter the complete 6-digit verification code." });
      return;
    }

    setBusy(true);
    setErrors({});
    try {
      await verifyOrganizerEmail({
        email,
        code: cleanCode,
        name,
        password,
        universityId: domainInfo?.university?.id,
      });
      setStep("SUCCESS");
      toast.success("University email verified! Welcome to the Organiser Workspace.");
    } catch (err) {
      setErrors({ otp: err instanceof Error ? err.message : "Invalid or expired verification code." });
    } finally {
      setBusy(false);
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    try {
      const res = await resendOrganizerVerification(email);
      toast.success(res.message || "A fresh 6-digit verification code was sent.");
      setCooldown(res.cooldownSeconds || 60);
      setErrors({});
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not resend verification code.");
    } finally {
      setResending(false);
    }
  };

  const handleDevFillOtp = async () => {
    try {
      const res = await apiGet<{ otp: string | null }>(`/auth/dev/latest-otp?email=${encodeURIComponent(email)}`);
      if (res?.otp) {
        setOtpCode(res.otp);
        toast.info(`Dev auto-filled OTP: ${res.otp}`);
      }
    } catch {
      /* ignore */
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleBusy(true);
    setErrors({});
    try {
      // 1. Authenticate with Firebase Google Popup
      let googleUser: { email: string; name: string; avatarUrl?: string | null; googleId?: string };
      try {
        const { signInWithGoogleFirebase } = await import("@/lib/firebase");
        googleUser = await signInWithGoogleFirebase();
      } catch (firebaseErr: any) {
        // If user cancelled popup
        if (firebaseErr?.code === "auth/popup-closed-by-user") {
          setGoogleBusy(false);
          return;
        }
        // Fallback for development if Firebase keys aren't configured yet
        const fallbackEmail = email.toLowerCase().includes("@") && !email.includes(".test") ? email.toLowerCase() : "student@gmail.com";
        googleUser = {
          email: fallbackEmail,
          name: name.trim() || "Google Student",
          googleId: "google-dev-" + Date.now(),
        };
      }

      // 2. Authenticate session with CampusPulse backend
      const user = await loginWithGoogle({
        email: googleUser.email,
        name: googleUser.name,
        avatarUrl: googleUser.avatarUrl ?? undefined,
        googleId: googleUser.googleId,
      });

      toast.success(`Account connected via Google as ${user.name}`);
      navigate({ to: "/account" });
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Google authentication failed." });
    } finally {
      setGoogleBusy(false);
    }
  };

  // STEP 2: OTP VERIFICATION SCREEN
  if (step === "OTP") {
    return (
      <AuthLayout
        title="Verify your university email"
        subtitle="We sent a 6-digit security code to confirm your institutional affiliation."
      >
        <div className="space-y-6">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground">
            <div className="flex items-center gap-2 font-medium text-primary">
              <KeyRound className="size-4" />
              <span>Institutional Verification Code</span>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Sent to <strong className="text-foreground">{email}</strong>
              {domainInfo?.university && (
                <span> ({domainInfo.university.name})</span>
              )}
            </p>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="otp-input" className="text-sm font-medium">
                6-Digit Verification Code
              </Label>
              <Input
                id="otp-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={otpCode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtpCode(val);
                }}
                placeholder="123456"
                className="h-13 text-center font-mono text-2xl tracking-[0.4em]"
                autoFocus
                required
              />
              {errors["otp"] && (
                <p role="alert" className="text-xs font-medium text-destructive">
                  {errors["otp"]}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={busy || otpCode.trim().length !== 6}>
              {busy ? "Verifying code…" : "Verify Email & Activate Organiser Account"}
            </Button>
          </form>

          <div className="flex flex-col items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Didn't receive the email?</span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={cooldown > 0 || resending}
                className={cn(
                  "font-semibold text-primary transition-colors hover:underline disabled:text-muted-foreground",
                  cooldown > 0 && "cursor-not-allowed",
                )}
              >
                {cooldown > 0 ? `Resend code in ${cooldown}s` : resending ? "Sending…" : "Resend code"}
              </button>
            </div>

            <div className="flex items-center justify-between w-full pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setStep("FORM")}
                className="flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" />
                Change email address
              </button>

              <button
                type="button"
                onClick={handleDevFillOtp}
                className="text-xs text-primary/70 hover:text-primary underline"
              >
                Dev helper: Auto-fill OTP
              </button>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // STEP 3: SUCCESS SCREEN
  if (step === "SUCCESS") {
    return (
      <AuthLayout
        title="University affiliation verified"
        subtitle="Your organiser privileges are active."
      >
        <div className="space-y-6 text-center py-4">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5">
            <CheckCircle2 className="size-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold">Welcome to CampusPulse Organiser!</h3>
            <p className="text-sm text-muted-foreground">
              Your institutional address <strong className="text-foreground">{email}</strong> has been successfully
              verified. You can now publish events, recruit volunteers, and manage society opportunities.
            </p>
          </div>

          <Button
            size="lg"
            className="w-full font-semibold"
            onClick={() => navigate({ to: "/organizer" })}
          >
            Continue to Organiser Dashboard
          </Button>
        </div>
      </AuthLayout>
    );
  }

  // STEP 1: REGISTRATION FORM
  return (
    <AuthLayout
      title="Create your account"
      subtitle={role === "ORGANIZER" ? "Institutional verification required for organisers." : "Free for every student & learner."}
    >
      <form onSubmit={role === "ORGANIZER" ? handleOrganizerSubmit : handleStudentSubmit} className="space-y-4" noValidate>
        <fieldset>
          <legend className="mb-2 text-sm font-medium">I'm joining as</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                aria-pressed={role === r.value}
                onClick={() => {
                  setRole(r.value);
                  setErrors({});
                }}
                className={cn(
                  "rounded-lg border p-3 text-left transition-colors",
                  role === r.value
                    ? "border-primary bg-primary/10 shadow-xs"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                <span className="block text-sm font-semibold">{r.label}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{r.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <Field id="reg-name" label="Full name" error={errors["name"]}>
          <Input
            id="reg-name"
            value={name}
            autoComplete="name"
            placeholder="e.g. Kasun Perera"
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors["name"])}
          />
        </Field>

        <Field
          id="reg-email"
          label={role === "ORGANIZER" ? "University or institutional email" : "Email address (personal or university)"}
          error={errors["email"]}
        >
          <Input
            id="reg-email"
            type="email"
            autoComplete="email"
            placeholder={role === "ORGANIZER" ? "name@sci.sjp.ac.lk or it22186256@my.sliit.lk" : "student@gmail.com or name@stu.cmb.ac.lk"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors["email"])}
          />

          {/* Domain feedback badges */}
          {domainInfo?.valid && domainInfo.university && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <Building2 className="size-3.5" />
              <span>Recognized: {domainInfo.university.name} ({domainInfo.domain})</span>
            </div>
          )}

          {role === "ORGANIZER" && domainInfo && !domainInfo.valid && domainInfo.reason === "PUBLIC_EMAIL" && (
            <div className="rounded-md bg-amber-500/10 px-2.5 py-1.5 text-xs text-amber-700 dark:text-amber-400">
              Organisers must register with an official university/institutional email. Personal emails (Gmail, etc.) are only allowed for Student accounts.
            </div>
          )}
        </Field>

        <Field id="reg-password" label="Password" error={errors["password"]}>
          <Input
            id="reg-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(errors["password"])}
          />
        </Field>

        {errors["form"] && (
          <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errors["form"]}
          </p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={busy || googleBusy}>
          {busy
            ? role === "ORGANIZER"
              ? "Sending verification code…"
              : "Creating account…"
            : role === "ORGANIZER"
            ? "Continue with Institutional Verification"
            : "Create Student Account"}
        </Button>
      </form>

      {/* Google Signup option for students */}
      {role === "STUDENT" && (
        <>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground font-medium">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full gap-2 border-border font-medium hover:bg-surface"
            size="lg"
            onClick={handleGoogleSignup}
            disabled={busy || googleBusy}
          >
            <svg className="size-4" viewBox="0 0 24 24" aria-hidden>
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            {googleBusy ? "Connecting with Google…" : "Continue with Google"}
          </Button>
        </>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

