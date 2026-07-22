import { useEffect } from "react";
import { trackUniqueAction } from "@/utils/analytics";
import { TrackAction } from "@/enums";

/**
 * Fires a unique page-view tracking event on mount.
 * Deduplication is handled inside trackUniqueAction (localStorage-based).
 * No-op if slug is undefined or empty.
 */
export function usePageTracking(slug?: string): void {
  useEffect(() => {
    if (slug) trackUniqueAction(slug, TrackAction.View);
  }, [slug]);
}
