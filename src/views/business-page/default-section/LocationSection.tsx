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
  if (!embedSrc && rawLink.includes("google.com/maps/embed")) {
    embedSrc = rawLink;
  }

  // 3. Extract direct place name, coordinates, or query from standard Google Maps URLs
  if (!embedSrc && rawLink) {
    let searchQuery = "";

    // A. Check for !3d<lat>!4d<lng> or @<lat>,<lng> coordinates in URL
    const dataCoordsMatch = rawLink.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    const atCoordsMatch = rawLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    const llMatch = rawLink.match(/[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/);

    // B. Place path: /maps/place/<Place+Name> or /place/<Place+Name>
    const placeMatch = rawLink.match(/\/place\/([^/@?#]+)/);

    if (dataCoordsMatch && dataCoordsMatch[1] && dataCoordsMatch[2]) {
      searchQuery = `${dataCoordsMatch[1]},${dataCoordsMatch[2]}`;
    } else if (placeMatch && placeMatch[1]) {
      searchQuery = decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
    } else if (atCoordsMatch && atCoordsMatch[1] && atCoordsMatch[2]) {
      searchQuery = `${atCoordsMatch[1]},${atCoordsMatch[2]}`;
    } else if (llMatch && llMatch[1] && llMatch[2]) {
      searchQuery = `${llMatch[1]},${llMatch[2]}`;
    } else if (rawLink.includes("?q=") || rawLink.includes("&q=") || rawLink.includes("query=") || rawLink.includes("daddr=")) {
      try {
        const url = new URL(rawLink.startsWith("http") ? rawLink : `https://${rawLink}`);
        const q = url.searchParams.get("q") || url.searchParams.get("query") || url.searchParams.get("daddr");
        if (q && !q.startsWith("http")) {
          searchQuery = q;
        }
      } catch {
        // ignore parse error
      }
    }

    if (searchQuery) {
      embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=m&z=15&output=embed&iwloc=B`;
    }
  }

  // 4. Fallback if short link (e.g., maps.app.goo.gl, goo.gl/maps) or query couldn't be parsed from link
  if (!embedSrc) {
    let fallbackQuery = "";
    if (cleanName && cleanAddress) {
      fallbackQuery = `${cleanName}, ${cleanAddress}`;
    } else if (cleanAddress) {
      fallbackQuery = cleanAddress;
    } else if (cleanName) {
      fallbackQuery = cleanName;
    } else if (rawLink && !rawLink.startsWith("http")) {
      fallbackQuery = rawLink;
    }

    if (fallbackQuery) {
      embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(fallbackQuery)}&t=m&z=15&output=embed&iwloc=B`;
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

      <div className="w-full h-60 rounded-2xl overflow-hidden relative border border-gray-100 shadow-xs bg-gray-50 group">
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

        {/* Full clickable overlay — tapping anywhere on the map opens the owner's Maps link.
            Also blocks Google's native "Open in Maps" link baked into the iframe. */}
        {directMapsUrl && (
          <a
            href={directMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open in Google Maps"
            className="absolute inset-0 z-10"
          />
        )}

        {/* Custom "GOOGLE MAPS वर पहा" button — z-20 keeps it above the full overlay */}
        {directMapsUrl && (
          <div className="absolute bottom-3 right-3 pointer-events-auto z-20">
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
