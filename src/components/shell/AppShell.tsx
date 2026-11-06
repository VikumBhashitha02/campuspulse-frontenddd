import { Link, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Bell,
  Bookmark,
  Calendar,
  Compass,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Shield,
  Ticket,
  User,
  Users,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";
import { socialApi } from "@/lib/api/social";
import { cn } from "@/lib/utils";

const primaryNav = [
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/universities", label: "Universities", icon: GraduationCap },
  { to: "/account/teams", label: "Teams", icon: Users },
] as const;

const mobileNav = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/account/teams", label: "Teams", icon: Users },
  { to: "/account/notifications", label: "Alerts", icon: Bell },
  { to: "/account/profile", label: "Profile", icon: User },
] as const;

const accountNav = [
  { to: "/account", label: "My feed", icon: LayoutDashboard, exact: true },
  { to: "/account/calendar", label: "Calendar", icon: Calendar },
  { to: "/account/saved", label: "Saved", icon: Bookmark },
  { to: "/account/registrations", label: "Registrations", icon: Ticket },
  { to: "/account/notifications", label: "Notifications", icon: Bell },
  { to: "/account/profile", label: "Profile", icon: User },
] as const;

function useSearchNavigate() {
  const [value, setValue] = useState("");
  return { value, setValue };
}

export function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { value, setValue } = useSearchNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["notifications", "unread-count", user?.id],
    queryFn: () => socialApi.unreadNotificationsCount(),
    enabled: !!user,
    staleTime: 30000,
  });

  const canAccessOrganizer = Boolean(
    user &&
      (user.role === "ORGANIZER" ||
        user.role === "ADMIN" ||
        (user.memberships &&
          user.memberships.some((m) =>
            ["ADMIN", "LEADER", "EVENT_MANAGER", "MANAGER"].includes(m.role),
          ))),
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="min-h-11 min-w-11 lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <SheetHeader className="border-b border-border p-4">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <Logo />
              </SheetHeader>
              <nav className="space-y-1 p-3">
                {[...primaryNav, ...accountNav].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    activeOptions={{ exact: "exact" in item ? ("exact" in item && item.exact) : false }}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="size-4" aria-hidden />
                      {item.label}
                    </div>
                    {item.to === "/account/notifications" && unreadCount > 0 && (
                      <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                ))}
                <div className="!mt-4 border-t border-border pt-3">
                  <Link
                    to="/organizer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-surface hover:text-foreground"
                  >
                    <LayoutDashboard className="size-4" aria-hidden />
                    Organiser workspace
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-surface hover:text-foreground"
                  >
                    <Shield className="size-4" aria-hidden />
                    Admin console
                  </Link>
                </div>
                <div className="!mt-4 flex items-center justify-between border-t border-border px-3 pt-3">
                  <span className="text-sm font-medium text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Logo className="shrink-0" compact={false} />

          <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Main">
            {primaryNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form
            role="search"
            className="ml-auto hidden max-w-sm flex-1 md:block"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `/explore?q=${encodeURIComponent(value)}`;
            }}
          >
            <label htmlFor="global-search" className="sr-only">
              Search opportunities
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="global-search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search opportunities..."
                className="pl-9"
              />
            </div>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 md:ml-0">
            <ThemeToggle />
            <Button asChild variant="ghost" size="icon" className="min-h-11 min-w-11" aria-label="Notifications">
              <Link to="/account/notifications" className="relative">
                <Bell className="size-5" />
                {user && unreadCount > 0 && (
                  <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-primary ring-2 ring-background" />
                )}
              </Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="min-h-11 min-w-11" aria-label="Account menu">
                    <span className="grid size-8 place-items-center rounded-full bg-navy text-xs font-bold text-navy-foreground">
                      {user.initials}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs font-normal text-muted-foreground">{user.role.toLowerCase()}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account">My feed</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/profile">Profile</Link>
                  </DropdownMenuItem>
                  {canAccessOrganizer && (
                    <DropdownMenuItem asChild>
                      <Link to="/organizer">Organiser workspace</Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === "ADMIN" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin console</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="size-4" aria-hidden />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">Join</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 pb-20 lg:pb-0">{children}</main>

      <SiteFooter />

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden"
      >
        <ul className="mx-auto flex max-w-lg items-stretch">
          {mobileNav.map((item) => {
            const active = ("exact" in item && item.exact) ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <li key={item.to} className="flex-1">
                <Link
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors relative",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <div className="relative">
                    <item.icon className={cn("size-5", active && "text-primary")} aria-hidden />
                    {item.to === "/account/notifications" && user && unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 size-2 rounded-full bg-primary" />
                    )}
                  </div>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            One platform for every university opportunity across Sri Lanka.
          </p>
        </div>
        <FooterCol
          title="Discover"
          links={[
            { to: "/explore", label: "Explore" },
            { to: "/universities", label: "Universities" },
            { to: "/account/teams", label: "Team finder" },
          ]}
        />
        <FooterCol
          title="Account"
          links={[
            { to: "/account", label: "My feed" },
            { to: "/account/saved", label: "Saved" },
            { to: "/account/registrations", label: "Registrations" },
          ]}
        />
        <FooterCol
          title="Workspaces"
          links={[
            { to: "/organizer", label: "Organisers" },
            { to: "/admin", label: "Administration" },
            { to: "/login", label: "Log in" },
          ]}
        />
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CampusPulse. Built for university communities.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
