"use client";

import { TrackAction } from "@/enums";
import { trackUniqueAction } from "@/utils/analytics";
import { CallIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useBusinessPageTheme } from "../common/BusinessPageContext";

interface FloatingCtaProps {
  phone: string;
  slug: string;
  onMessageClick?: () => void;
}

export default function FloatingCta({ phone, slug }: FloatingCtaProps) {
  const { primaryColor, t } = useBusinessPageTheme();

  if (!phone) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 flex items-center justify-center px-6 py-3.5 z-50 shadow-lg md:hidden">
      <button
        onClick={() => {
          if (slug) trackUniqueAction(slug, TrackAction.Call);
          window.location.href = `tel:${phone}`;
        }}
        className="w-full text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer shadow-md"
        style={{ backgroundColor: primaryColor, boxShadow: `0 8px 16px ${primaryColor}25` }}
      >
        <HugeiconsIcon icon={CallIcon} size={18} /> {t("bp_call_btn")}
      </button>
    </div>
  );
}
