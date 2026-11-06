import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Bell, Bookmark, Calendar, CreditCard, HeartHandshake, LayoutDashboard, Ticket, User, Users } from "lucide-react";
import { RequireRole } from "@/components/shell/RequireRole";
import { useAuth } from "@/lib/auth";
import { socialApi } from "@/lib/api/social";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  component: AccountLayout,
});

const LINKS = [
  { to: "/account", label: "My feed", icon: LayoutDashboard, exact: true },
  { to: "/account/calendar", label: "Calendar", icon: Calendar },
  { to: "/account/saved", label: "Saved", icon: Bookmark },
  { to: "/account/registrations", label: "Registrations", icon: Ticket },
  { to: "/account/payments", label: "Payments", icon: CreditCard },
  { to: "/account/volunteering", label: "Volunteering", icon: HeartHandshake },
  { to: "/account/teams", label: "Teams", icon: Users },
  { to: "/account/notifications", label: "Notifications", icon: Bell },
  { to: "/account/profile", label: "Profile", icon: User },
] as const;

function AccountLayout() {
  const { user } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["notifications", "unread-count", user?.id],
    queryFn: () => socialApi.unreadNotificationsCount(),
    enabled: !!user,
    staleTime: 30000,
  });

  return (
    <RequireRole roles={["STUDENT", "ORGANIZER", "ADMIN"]}>
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:py-10">
        <div className="lg:grid lg:grid-cols-[212px_minmax(0,1fr)] lg:gap-10">
          <nav aria-label="Account" className="mb-6 lg:mb-0">
            <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:sticky lg:top-24 lg:block lg:space-y-1 lg:overflow-visible lg:px-0 lg:pb-0">
              {LINKS.map((l) => {
                const active = "exact" in l && l.exact ? pathname === l.to : pathname.startsWith(l.to);
                return (
                  <li key={l.to} className="shrink-0">
                    <Link
                      to={l.to}
                      className={cn(
                        "flex items-center justify-between gap-2.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors lg:rounded-lg lg:font-medium",
                        active
                          ? "bg-navy text-navy-foreground"
                          : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:bg-transparent",
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <l.icon className="size-4 shrink-0" aria-hidden />
                        <span>{l.label}</span>
                      </div>
                      {l.to === "/account/notifications" && unreadCount > 0 && (
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                            active
                              ? "bg-white text-navy"
                              : "bg-primary text-primary-foreground",
                          )}
                        >
                          {unreadCount}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </RequireRole>
  );
}
