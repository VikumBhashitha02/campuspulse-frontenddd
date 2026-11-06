import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, AlertCircle, KeyRound, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "./login";
import { apiSend } from "@/lib/api/client";
import { toast } from "sonner";

interface ResetPasswordSearch {
  token?: string | undefined;
  email?: string | undefined;
}

export const Route = createFileRoute("/reset-password")({
  validateSearch: (search: Record<string, unknown>): ResetPasswordSearch => ({
    token: typeof search["token"] === "string" ? search["token"] : undefined,
    email: typeof search["email"] === "string" ? search["email"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Set new password — CampusPulse" },
      { name: "description", content: "Create a new secure password for your CampusPulse account." },
      { property: "og:title", content: "Set new password — CampusPulse" },
      { property: "og:description", content: "Reset your CampusPulse password securely." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const search = Route.useSearch();
  const token = search.token?.trim() || "";
  const email = search.email?.trim() || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Reset token is missing from the link. Please request a new reset link.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      setError("Password must contain at least one letter and one number.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setBusy(true);
    try {
      await apiSend("POST", "/auth/reset-password", {
        token,
        password,
        ...(email ? { email } : {}),
      });
      setSuccess(true);
      toast.success("Password reset successfully!");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Invalid or expired reset token. Please request a new one.";
      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
      toast.error("Failed to reset password");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title="Create new password"
      subtitle={
        email
          ? `Enter a new password for ${email}`
          : "Your new password must be different from previous passwords."
      }
    >
      {success ? (
        <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="size-7" />
          </div>
          <h2 className="mt-4 text-base font-bold">Password reset successful</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your password has been updated securely. You can now sign in with your new credentials.
          </p>
          <Button asChild className="mt-6 w-full" size="lg">
            <Link to="/login">Proceed to log in</Link>
          </Button>
        </div>
      ) : !token ? (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-6 text-center">
          <AlertCircle className="mx-auto size-8 text-destructive" />
          <h2 className="mt-3 text-sm font-bold text-destructive">Invalid or missing reset token</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            The password reset link appears incomplete or corrupted. Please request a new reset email.
          </p>
          <Button asChild variant="outline" className="mt-5 w-full">
            <Link to="/forgot-password">Request new reset link</Link>
          </Button>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs font-medium leading-relaxed">{error}</div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="new-password">New password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="At least 8 characters"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Must contain at least 8 characters with letters and numbers.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Re-enter new password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={busy}>
            {busy ? "Resetting password…" : "Reset password"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Remembered your password?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
