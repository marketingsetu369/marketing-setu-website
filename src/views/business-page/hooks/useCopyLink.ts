import { useState, useCallback } from "react";
import { trackUniqueAction } from "@/utils/analytics";
import { TrackAction } from "@/enums";

interface UseCopyLinkReturn {
  /** True for 2s after a successful copy */
  copied: boolean;
  /** Copies the current page URL to clipboard and tracks the action */
  handleCopyLink: () => void;
}

/**
 * Handles clipboard copy of the current page URL with:
 * - 2-second "Copied!" feedback state
 * - Analytics tracking via trackUniqueAction (deduped via localStorage)
 */
export function useCopyLink(slug?: string): UseCopyLinkReturn {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = useCallback(() => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (slug) trackUniqueAction(slug, TrackAction.CopyLink);
  }, [slug]);

  return { copied, handleCopyLink };
}
