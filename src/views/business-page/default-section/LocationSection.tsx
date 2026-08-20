"use client";

import { Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useBusinessPageTheme } from "../common/BusinessPageContext";

interface LocationSectionProps {
  mapsLink: string;
  address?: string;
}

export default function LocationSection({ mapsLink, address }: LocationSectionProps) {
  const { primaryColor, fontHeader, t } = useBusinessPageTheme();

  if (!mapsLink) return null;

  return (
    <section className="animate-fade-in-up bg-white pt-14 pb-6 px-6">
      <h2 className="text-lg font-semibold text-gray-950 tracking-tight mb-1" style={{ fontFamily: fontHeader }}>
        {t("bp_location_heading")}
      </h2>
      <p className="text-xs text-gray-500 font-semibold mb-4 leading-relaxed">
        {address || t("bp_location_subtext")}
      </p>

      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-44 rounded-2xl overflow-hidden relative border border-gray-100 group active:scale-[0.99] transition-all shadow-xs"
      >
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=60"
          alt="Map Location"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-xs text-gray-800 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-full shadow-md flex items-center gap-1.5 group-hover:bg-white transition-colors">
            <HugeiconsIcon icon={Location01Icon} size={12} style={{ color: primaryColor }} />
            {t("bp_view_on_maps")}
          </div>
        </div>
      </a>
    </section>
  );
}
