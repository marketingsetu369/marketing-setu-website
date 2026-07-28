import { BusinessPageApi } from "@/api/repositories/businessPageApi";
import { TrackAction } from "@/enums";

// Re-export so existing code importing TrackActionType still works
export type TrackActionType = TrackAction;
export { TrackAction };

export const trackUniqueAction = async (slug: string, action: TrackAction): Promise<void> => {
  if (typeof window === "undefined" || !slug || slug === "doctor-preview") return;

  const storageKey =
    action === TrackAction.View
      ? `tracked_${slug}_view`
      : `tracked_${slug}_click_${action}`;

  if (!localStorage.getItem(storageKey)) {
    try {
      await BusinessPageApi.trackAction(slug, action);
      localStorage.setItem(storageKey, "true");
    } catch (err) {
      console.error(`Error tracking unique action [${action}]:`, err);
    }
  }
};
