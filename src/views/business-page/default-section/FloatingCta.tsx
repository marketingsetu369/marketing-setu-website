"use client";

import { TrackAction } from "@/enums";
import { trackUniqueAction } from "@/utils/analytics";
import { CallIcon, Message01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useBusinessPageTheme } from "../common/BusinessPageContext";

interface FloatingCtaProps {
  phone: string;
  slug: string;
  onMessageClick: () => void;
}

export default function FloatingCta({ phone, slug, onMessageClick }: FloatingCtaProps) {
  const { primaryColor, primaryLight, primaryBorder, t } = useBusinessPageTheme();

  return (
    <div className="fixed bottom-0 left-0 w-full h-20 bg-white/95 backdrop-blur-md border-t border-gray-100 flex items-center justify-between px-6 pb-2 z-50 md:hidden">
      <button
        onClick={onMessageClick}
        className="w-[48%] text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
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
          className="w-[48%] py-3 rounded-lg font-bold text-sm border flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
          style={{ backgroundColor: primaryLight, color: primaryColor, borderColor: primaryBorder }}
        >
          <HugeiconsIcon icon={CallIcon} size={16} /> {t("bp_call_btn")}
        </button>
      )}
    </div>
  );
}
