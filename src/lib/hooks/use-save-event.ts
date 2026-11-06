import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { eventsApi } from "@/lib/api/events";
import type { CampusEvent } from "@/lib/types";

/**
 * Shared bookmark interaction. Keeps optimistic UI, toast feedback and cache
 * invalidation in one place so every card behaves identically.
 */
export function useSaveEvent(event: Pick<CampusEvent, "id" | "title" | "bookmarked">) {
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(Boolean(event.bookmarked));

  useEffect(() => {
    setSaved(Boolean(event.bookmarked));
  }, [event.bookmarked]);

  const mutation = useMutation({
    mutationFn: (next: boolean) => eventsApi.toggleBookmark(event.id, next),
    onMutate: (next: boolean) => {
      setSaved(next);
      return { previous: !next };
    },
    onSuccess: (_data, next) => {
      toast.success(next ? "Saved for later" : "Removed from saved", {
        description: event.title,
      });
      void queryClient.invalidateQueries({ queryKey: ["saved"] });
      void queryClient.invalidateQueries({ queryKey: ["events"] });
      void queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
    onError: (_error, _next, context) => {
      if (context) setSaved(context.previous);
      toast.error("Couldn't update your saved opportunities");
    },
  });

  return {
    saved,
    pending: mutation.isPending,
    toggle: () => mutation.mutate(!saved),
  };
}
