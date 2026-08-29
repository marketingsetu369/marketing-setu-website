"use client";

import { TrackAction } from "@/enums";
import { trackUniqueAction } from "@/utils/analytics";
import { CallIcon, Message01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useBusinessPageTheme } from "../common/BusinessPageContext";

interface DesktopCtaProps {
  phone: string;
  slug: string;
  onMessageClick: () => void;
}

export default function DesktopCta({ phone, slug, onMessageClick }: DesktopCtaProps) {
  const { primaryColor, primaryLight, primaryBorder, t } = useBusinessPageTheme();

  return (
    <div className="hidden md:flex gap-3 px-6 py-4 sticky bottom-0 bg-[var(--color-grey-100)]/95 backdrop-blur-md border-t border-gray-200/60 z-30 shadow-md">
      <button
        onClick={onMessageClick}
        className="flex-1 text-white py-3.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
        style={{ backgroundColor: primaryColor, boxShadow: `0 8px 16px ${primaryColor}15` }}
      >
        <HugeiconsIcon icon={Message01Icon} size={16} /> {t("bp_message_btn")}
      </button>

      {phone && (
        <button
          onClick={() => {
            if (slug) trackUniqueAction(slug, TrackAction.Call);
            window.location.href = `tel:${phone}`;
          }}
          className="flex-1 py-3.5 rounded-lg font-bold text-sm border flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
          style={{ backgroundColor: primaryLight, color: primaryColor, borderColor: primaryBorder }}
        >
          <HugeiconsIcon icon={CallIcon} size={16} /> {t("bp_call_btn")}
        </button>
      )}
    </div>
  );
}
