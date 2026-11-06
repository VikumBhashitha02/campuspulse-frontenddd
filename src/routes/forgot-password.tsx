import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "./login";
import { apiSend } from "@/lib/api/client";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — CampusPulse" },
      { name: "description", content: "Request a password reset link for your CampusPulse account." },
      { property: "og:title", content: "Reset your password — CampusPulse" },
      { property: "og:description", content: "Request a CampusPulse password reset link." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    try {
      await apiSend("POST", "/auth/forgot-password", { email: email.trim() });
      setSent(true);
    } catch (err: any) {
      toast.error(err?.message || "Failed to process request. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Reset your password" subtitle="We'll email you a secure reset link.">
      {sent ? (
        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <MailCheck className="mx-auto size-8 text-success" aria-hidden />
          <h2 className="mt-3 text-sm font-bold">Check your inbox</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            If an account exists for {email}, a reset link is on its way.
          </p>
          <Button asChild variant="outline" className="mt-5 w-full">
            <Link to="/login">Back to log in</Link>
          </Button>
        </div>
      ) : (
        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <Label htmlFor="reset-email">Email</Label>
            <Input
              id="reset-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={busy}>
            {busy ? "Sending…" : "Send reset link"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Back to log in
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
