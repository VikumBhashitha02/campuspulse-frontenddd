import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, CalendarClock, CheckCheck, Megaphone, Ticket, Trash2, Users, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState, PageHeader, RowSkeleton } from "@/components/common/States";
import { useAuth } from "@/lib/auth";
import { socialApi } from "@/lib/api/social";
import { relativeTime } from "@/lib/format";
import type { AppNotification, NotificationKind } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — CampusPulse" },
      { name: "description", content: "Deadline reminders, team requests and registration updates." },
      { property: "og:title", content: "Notifications — CampusPulse" },
      { property: "og:description", content: "Your CampusPulse activity." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotificationsPage,
});

const ICONS: Record<NotificationKind, React.ComponentType<{ className?: string }>> = {
  REGISTRATION: Ticket,
  DEADLINE: CalendarClock,
  TEAM_REQUEST: Users,
  TEAM_ACCEPTED: Users,
  EVENT_UPDATE: Megaphone,
  ORGANIZATION: Bell,
};

const TABS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "deadlines", label: "Deadlines" },
  { id: "teams", label: "Teams" },
] as const;

function matchesTab(n: AppNotification, tab: (typeof TABS)[number]["id"], allRead: boolean) {
  if (tab === "unread") return !n.read && !allRead;
  if (tab === "deadlines") return n.kind === "DEADLINE";
  if (tab === "teams") return n.kind === "TEAM_REQUEST" || n.kind === "TEAM_ACCEPTED";
  return true;
}

function NotificationsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: () => socialApi.notifications(),
    enabled: !!user,
  });

  const announcementsQuery = useQuery({
    queryKey: ["active-announcements", user?.id],
    queryFn: async () => {
      const token = localStorage.getItem("campuspulse_token") || "";
      const res = await fetch("http://localhost:4000/api/v1/notifications/announcements", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) return [];
      const json = await res.json();
      return json.data || json || [];
    },
    enabled: !!user,
  });

  const [allRead, setAllRead] = useState(false);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");
  const [busy, setBusy] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const all = query.data ?? [];
  const unreadCount = all.filter((n) => !n.read && !allRead).length;
  const items = all.filter((n) => matchesTab(n, tab, allRead));

  const markItemAsRead = async (notification: AppNotification) => {
    if (!notification.read && !allRead) {
      try {
        await socialApi.markRead(notification.id);
        queryClient.setQueryData<AppNotification[]>(["notifications", user?.id], (old) =>
          old ? old.map((item) => (item.id === notification.id ? { ...item, read: true } : item)) : [],
        );
        queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
      } catch {
        // Continue silently on optimistic update
      }
    }
  };

  const handleNotificationClick = async (n: AppNotification) => {
    await markItemAsRead(n);
    if (n.href) {
      if (n.href.startsWith("/")) {
        navigate({ to: n.href as any });
      } else {
        window.location.href = n.href;
      }
    }
  };

  const markAll = async () => {
    setBusy(true);
    try {
      await socialApi.markAllRead();
      setAllRead(true);
      queryClient.setQueryData<AppNotification[]>(["notifications", user?.id], (old) =>
        old ? old.map((item) => ({ ...item, read: true })) : [],
      );
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
      toast.success("All notifications marked as read");
    } catch {
      toast.error("Couldn't mark notifications as read");
    } finally {
      setBusy(false);
    }
  };

  const deleteItem = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingId(id);
    try {
      await socialApi.deleteNotification(id);
      queryClient.setQueryData<AppNotification[]>(["notifications", user?.id], (old) =>
        old ? old.filter((item) => item.id !== id) : [],
      );
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
      toast.success("Notification removed");
    } catch {
      toast.error("Failed to delete notification");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Notifications"
        description={
          unreadCount > 0 ? `${unreadCount} unread update${unreadCount > 1 ? "s" : ""} need your attention.` : "You're all caught up."
        }
        actions={
          <Button variant="outline" size="sm" disabled={busy || unreadCount === 0} onClick={markAll}>
            <CheckCheck className="size-4" />
            Mark all read
          </Button>
        }
      />

      {/* Active Broadcast Announcements */}
      {announcementsQuery.data && announcementsQuery.data.length > 0 && (
        <div className="mt-5 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
            <Megaphone className="size-4 text-primary" />
            <span>Platform & Campus Broadcasts</span>
          </div>
          <div className="grid gap-2.5">
            {announcementsQuery.data.map((ann: any) => (
              <div
                key={ann.id}
                className={cn(
                  "p-3.5 rounded-xl border shadow-xs transition-all space-y-1.5",
                  ann.priority === "URGENT"
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100"
                    : ann.priority === "HIGH"
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100"
                    : "bg-card border-border text-card-foreground"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary uppercase">
                        {ann.targetAudience === "UNIVERSITY" && ann.university ? ann.university.name : ann.targetAudience}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{relativeTime(ann.startsAt || ann.createdAt)}</span>
                    </div>
                    <h4 className="font-bold text-sm text-foreground mt-1">{ann.title}</h4>
                  </div>
                  <Megaphone className="size-4 text-primary shrink-0 opacity-80" />
                </div>
                <p className="text-xs text-foreground/90 whitespace-pre-wrap leading-relaxed">{ann.message}</p>
                {ann.linkUrl && (
                  <div className="pt-1.5 border-t border-border/40">
                    <a
                      href={ann.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      <span>Open Link / Action</span>
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
              tab === t.id
                ? "bg-navy text-navy-foreground"
                : "bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {t.label}
            {t.id === "unread" && unreadCount > 0 && (
              <span className="ml-1.5 rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {query.isPending ? (
          <RowSkeleton />
        ) : query.isError ? (
          <ErrorState onRetry={() => query.refetch()} />
        ) : items.length === 0 ? (
          <EmptyState
            icon={<Bell className="size-6" aria-hidden />}
            title={tab === "all" ? "You're all caught up" : "Nothing here right now"}
            description="New deadline reminders, team requests, registrations and updates will show up here."
            action={
              <Button asChild variant="outline">
                <Link to="/explore">Explore opportunities</Link>
              </Button>
            }
          />
        ) : (
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {items.map((n) => {
              const Icon = ICONS[n.kind] ?? Bell;
              const unread = !n.read && !allRead;
              return (
                <li
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={cn(
                    "flex items-start justify-between gap-3 p-4 transition-colors cursor-pointer hover:bg-muted/30",
                    unread && "bg-primary/[0.06]",
                  )}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">{n.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground leading-snug">{n.body}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{relativeTime(n.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {n.href && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2.5 text-xs font-semibold"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNotificationClick(n);
                        }}
                      >
                        View
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 text-muted-foreground hover:text-destructive"
                      disabled={deletingId === n.id}
                      onClick={(e) => deleteItem(e, n.id)}
                      title="Delete notification"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                    {unread && (
                      <span aria-label="Unread" className="size-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
