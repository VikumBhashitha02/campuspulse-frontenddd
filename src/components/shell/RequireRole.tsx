import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import type { Role } from "@/lib/types";

const roleLabel: Record<Role, string> = {
  STUDENT: "student",
  ORGANIZER: "organiser",
  ADMIN: "administrator",
};

/**
 * Client-side access gate. The backend enforces the same rules on every
 * request; this only prevents rendering UI the user may not act on.
 */
export function RequireRole({
  roles,
  allowOrgManagers = false,
  children,
}: {
  roles: Role[];
  allowOrgManagers?: boolean;
  children: ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-10 sm:px-6">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <Gate
        title="Sign in to continue"
        description="This area of CampusPulse is only available to signed-in members."
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/register">Create an account</Link>
            </Button>
          </div>
        }
      />
    );
  }

  const hasOrgManagerRole =
    allowOrgManagers &&
    Boolean(
      user.memberships &&
        user.memberships.some((m) =>
          ["ADMIN", "LEADER", "PRESIDENT", "VICE_PRESIDENT", "EVENT_ORGANIZER", "EVENT_MANAGER", "MANAGER"].includes(m.role) ||
          m.canCreateEvents,
        ),
    );

  // Check for unverified organizer status
  if (roles.includes("ORGANIZER") && user.role === "ORGANIZER" && user.universityEmailVerified === false) {
    return (
      <Gate
        title="University email verification required"
        description="Your organiser workspace requires a verified institutional email address to manage university societies and events."
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link to="/register">Verify University Email</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/account">Back to student feed</Link>
            </Button>
          </div>
        }
      />
    );
  }

  if (!roles.includes(user.role) && !hasOrgManagerRole) {
    const isOrganizerGate = roles.includes("ORGANIZER");
    return (
      <Gate
        title={isOrganizerGate ? "Organiser workspace access" : "You don't have access to this area"}
        description={
          isOrganizerGate
            ? "To publish events and manage society opportunities, you must verify an official university email address."
            : `This section requires ${roles.map((r) => roleLabel[r]).join(" or ")} access. You're signed in as a ${roleLabel[user.role]}.`
        }
        action={
          <div className="flex flex-wrap justify-center gap-2">
            {isOrganizerGate && (
              <Button asChild>
                <Link to="/register">Become an Organiser</Link>
              </Button>
            )}
            <Button asChild variant="outline">
              <Link to="/account">Back to my feed</Link>
            </Button>
          </div>
        }
      />
    );
  }

  return <>{children}</>;
}

function Gate({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-surface text-muted-foreground">
        <Lock className="size-5" aria-hidden />
      </span>
      <h1 className="mt-4 text-xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6">{action}</div>
    </div>
  );
}
