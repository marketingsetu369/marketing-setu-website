"use client";

import { Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useBusinessPageTheme } from "../common/BusinessPageContext";

interface LocationSectionProps {
  mapsLink?: string;
  address?: string;
}

export default function LocationSection({ mapsLink, address }: LocationSectionProps) {
  const { primaryColor, fontHeader, t } = useBusinessPageTheme();

  if (!mapsLink && !address) return null;

  // Determine destination URL when user clicks "View on Maps"
  const directMapsUrl =
    mapsLink?.trim() ||
    (address?.trim() ? `https://maps.google.com/?q=${encodeURIComponent(address.trim())}` : "");

  // Determine iframe embed source
  const embedQuery = address?.trim() || mapsLink?.trim() || "";
  const embedSrc = mapsLink?.startsWith("https://www.google.com/maps/embed")
    ? mapsLink
    : `https://maps.google.com/maps?q=${encodeURIComponent(embedQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="animate-fade-in-up bg-white pt-14 pb-6 px-6">
      <h2 className="text-lg font-semibold text-gray-950 tracking-tight mb-1" style={{ fontFamily: fontHeader }}>
        {t("bp_location_heading")}
      </h2>
      <p className="text-xs text-gray-500 font-semibold mb-4 leading-relaxed">
        {address || t("bp_location_subtext")}
      </p>

      <div className="w-full h-52 rounded-2xl overflow-hidden relative border border-gray-100 shadow-xs bg-gray-50 group">
        <iframe
          title="Business Location Map"
          src={embedSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />

        {directMapsUrl && (
          <div className="absolute bottom-3 right-3 pointer-events-auto">
            <a
              href={directMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/95 hover:bg-white backdrop-blur-xs text-gray-800 text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-full shadow-md flex items-center gap-1.5 transition-all active:scale-95 border border-gray-100"
            >
              <HugeiconsIcon icon={Location01Icon} size={12} style={{ color: primaryColor }} />
              {t("bp_view_on_maps")}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
