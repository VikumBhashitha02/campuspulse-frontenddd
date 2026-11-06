import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Feed section heading with an optional "see all" link — used across student pages. */
export function SectionHeading({
  title,
  description,
  linkTo,
  linkLabel = "See all",
  action,
  className,
}: {
  title: string;
  description?: string;
  linkTo?: "/explore" | "/account/teams" | "/account/saved" | "/account/registrations";
  linkLabel?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div className="min-w-0">
        <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
      {!action && linkTo && (
        <Link
          to={linkTo}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
        >
          {linkLabel}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}

export function RailSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-[270px] shrink-0 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2.5">
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="mt-4 h-4 w-4/5" />
          <Skeleton className="mt-2 h-3 w-full" />
          <Skeleton className="mt-4 h-6 w-28" />
        </div>
      ))}
    </div>
  );
}

/** Card surface used for side-panel modules on the student dashboard. */
export function PanelCard({
  title,
  icon,
  children,
  footer,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        {icon && <span className="text-primary">{icon}</span>}
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
      {footer && <div className="border-t border-border px-4 py-3">{footer}</div>}
    </section>
  );
}
