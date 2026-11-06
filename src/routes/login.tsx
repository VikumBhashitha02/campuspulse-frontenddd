import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoMark } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAuth } from "@/lib/auth";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — CampusPulse" },
      { name: "description", content: "Log in to CampusPulse to save opportunities, register and build teams." },
      { property: "og:title", content: "Log in — CampusPulse" },
      { property: "og:description", content: "Access your CampusPulse account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

const ROLES: { value: Role; label: string }[] = [
  { value: "STUDENT", label: "Student" },
  { value: "ORGANIZER", label: "Organiser" },
  { value: "ADMIN", label: "Admin" },
];

const DEMO_CREDENTIALS: Record<Role, { email: string; pass: string }> = {
  STUDENT: { email: "ayesha.fernando@student.uoc.test", pass: "Password123!" },
  ORGANIZER: { email: "organizer@ieee-uom.test", pass: "Password123!" },
  ADMIN: { email: "admin@campuspulse.test", pass: "Password123!" },
};

function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(DEMO_CREDENTIALS.STUDENT.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.STUDENT.pass);
  const [role, setRole] = useState<Role>("STUDENT");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    const creds = DEMO_CREDENTIALS[selectedRole];
    if (creds) {
      setEmail(creds.email);
      setPassword(creds.pass);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const user = await login(email, password, role);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}`);
      navigate({ to: user.role === "ADMIN" ? "/admin" : user.role === "ORGANIZER" ? "/organizer" : "/account" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to log in.");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleBusy(true);
    setError(null);
    try {
      // 1. Authenticate with Firebase Google Popup
      let googleUser: { email: string; name: string; avatarUrl?: string | null; googleId?: string };
      try {
        const { signInWithGoogleFirebase } = await import("@/lib/firebase");
        googleUser = await signInWithGoogleFirebase();
      } catch (firebaseErr: any) {
        // If Firebase API key is still placeholder or popup was closed by user
        if (firebaseErr?.code === "auth/popup-closed-by-user") {
          setGoogleBusy(false);
          return;
        }
        // Fallback for local development if Firebase keys aren't configured yet
        const fallbackEmail = email.toLowerCase().includes("@") && !email.includes(".test") ? email.toLowerCase() : "student@gmail.com";
        googleUser = {
          email: fallbackEmail,
          name: "Google Student",
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

      toast.success(`Signed in as ${user.name} via Google`);
      navigate({ to: user.role === "ADMIN" ? "/admin" : user.role === "ORGANIZER" ? "/organizer" : "/account" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google authentication failed.");
    } finally {
      setGoogleBusy(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to pick up where you left off.">
      <form onSubmit={submit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Password</Label>
            <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium">Quick Demo Preset</legend>
          <div className="grid grid-cols-3 gap-2">
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                aria-pressed={role === r.value}
                onClick={() => handleRoleSelect(r.value)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  role === r.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={busy || googleBusy}>
          {busy ? "Logging in…" : "Log in"}
        </Button>
      </form>

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
        onClick={handleGoogleLogin}
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

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to CampusPulse?{" "}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-navy p-12 text-navy-foreground lg:flex lg:flex-col lg:justify-between">
        <div aria-hidden className="absolute inset-0 grid-noise opacity-30" />
        <Link to="/" className="relative flex items-center gap-3">
          <LogoMark className="size-10" />
          <span className="text-lg font-extrabold tracking-tight">
            CAMPUS<span className="text-primary">PULSE</span>
          </span>
        </Link>
        <div className="relative max-w-md">
          <h2 className="text-3xl font-black leading-tight tracking-tight">
            Discover. Participate. <span className="text-primary">Achieve.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-navy-foreground/70">
            Every competition, hackathon, workshop and research opportunity across university
            communities — in one place.
          </p>
        </div>
        <p className="relative text-xs text-navy-foreground/50">© {new Date().getFullYear()} CampusPulse</p>
      </div>

      <div className="relative flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-3 lg:hidden">
            <LogoMark className="size-9" />
            <span className="text-base font-extrabold tracking-tight">
              CAMPUS<span className="text-navy-muted">PULSE</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black tracking-tight">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
