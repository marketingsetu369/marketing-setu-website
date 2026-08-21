"use client";

import { Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useBusinessPageTheme } from "../common/BusinessPageContext";

interface LocationSectionProps {
  mapsLink?: string;
  address?: string;
  businessName?: string;
}

export default function LocationSection({ mapsLink, address, businessName }: LocationSectionProps) {
  const { primaryColor, fontHeader, t } = useBusinessPageTheme();

  const rawLink = mapsLink?.trim() || "";
  const cleanAddress = address?.trim() || "";
  const cleanName = businessName?.trim() || "";

  if (!rawLink && !cleanAddress) return null;

  let embedSrc = "";
  let directMapsUrl = rawLink;

  // 1. If user pasted raw iframe HTML (e.g., <iframe src="https://www.google.com/maps/embed?..."></iframe>)
  if (rawLink.includes("<iframe") && rawLink.includes("src=")) {
    const match = rawLink.match(/src=["']([^"']+)["']/i);
    if (match && match[1]) {
      embedSrc = match[1];
    }
  }

  // 2. If it's already an embed URL
  if (!embedSrc && rawLink.startsWith("https://www.google.com/maps/embed")) {
    embedSrc = rawLink;
  }

  // 3. If not an embed URL yet, extract coordinates or place query to show pinpoint marker
  if (!embedSrc) {
    let searchQuery = "";

    // Extract @lat,lng coordinates
    const coordsMatch = rawLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    // Extract place name from /place/Place+Name/
    const placeMatch = rawLink.match(/\/maps\/place\/([^/@?]+)/);

    if (coordsMatch && coordsMatch[1] && coordsMatch[2]) {
      searchQuery = `${coordsMatch[1]},${coordsMatch[2]}`;
    } else if (placeMatch && placeMatch[1]) {
      searchQuery = decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
    } else if (rawLink.includes("?q=") || rawLink.includes("&q=") || rawLink.includes("query=")) {
      try {
        const url = new URL(rawLink);
        const q = url.searchParams.get("q") || url.searchParams.get("query") || url.searchParams.get("daddr");
        if (q && !q.startsWith("http")) {
          searchQuery = q;
        }
      } catch {
        // ignore parse error
      }
    }

    // If query could not be extracted (e.g. short link maps.app.goo.gl), fall back to business name & address
    if (!searchQuery) {
      if (cleanName && cleanAddress) {
        searchQuery = `${cleanName}, ${cleanAddress}`;
      } else if (cleanAddress) {
        searchQuery = cleanAddress;
      } else if (cleanName) {
        searchQuery = cleanName;
      } else if (rawLink && !rawLink.startsWith("http")) {
        searchQuery = rawLink;
      }
    }

    if (searchQuery) {
      embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
  }

  if (!directMapsUrl) {
    const query = cleanAddress || cleanName || "";
    directMapsUrl = query ? `https://maps.google.com/?q=${encodeURIComponent(query)}` : "";
  }

  if (!embedSrc) return null;

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
