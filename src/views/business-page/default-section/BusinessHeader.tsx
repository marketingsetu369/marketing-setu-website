"use client";

import { TrackAction } from "@/enums";
import { trackUniqueAction } from "@/utils/analytics";
import {
  CallIcon,
  Location01Icon,
  Mail01Icon,
  Share01Icon,
  ShieldCheck,
  Store01Icon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useBusinessPageTheme } from "../common/BusinessPageContext";
import { getImageUrl } from "../common/utils";

interface BusinessHeaderProps {
  header: {
    business_name: string;
    tagline: string;
    business_category: string;
    logo_url: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    maps_link: string;
  };
  slug: string;
}

export default function BusinessHeader({ header, contact, slug }: BusinessHeaderProps) {
  const { primaryColor, primaryLight, primaryBorder, fontHeader, t } = useBusinessPageTheme();

  return (
    <header
      className="pt-14 pb-10 px-6 text-center flex flex-col items-center relative rounded-bl-[48px] rounded-br-[48px]"
      style={{
        background: `linear-gradient(to bottom, ${primaryColor}43 0%, ${primaryColor}23 60%, ${primaryColor}03 100%)`,
      }}
    >
      {/* Share button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({ title: header.business_name || "Business Profile", url: window.location.href })
                .catch(console.error);
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }
          }}
          className="w-9 h-9 rounded-full bg-white shadow-xs flex items-center justify-center text-gray-800 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
        >
          <HugeiconsIcon icon={Share01Icon} size={16} />
        </button>
      </div>

      {/* Logo */}
      <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-white mb-4.5 overflow-hidden p-1.5">
        {header.logo_url ? (
          <img
            src={getImageUrl(header.logo_url)}
            alt={header.business_name || "Logo"}
            className="w-full h-full object-contain rounded-full"
          />
        ) : (
          <div
            className="w-full h-full rounded-full flex items-center justify-center border"
            style={{ backgroundColor: primaryLight, color: primaryColor, borderColor: primaryBorder }}
          >
            <HugeiconsIcon icon={Store01Icon} size={36} />
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 justify-center mb-1 max-w-full px-4 flex-nowrap">
        <h1 className="text-xl max-[400px]:text-base font-semibold text-gray-900 tracking-tight truncate min-w-0" style={{ fontFamily: fontHeader }}>
          {header.business_name || ""}
        </h1>
        <span className="flex items-center justify-center flex-shrink-0">
          <HugeiconsIcon icon={ShieldCheck} size={18} color={primaryColor} />
        </span>
      </div>

      {/* Tagline */}
      {header.tagline && (
        <p className="text-sm text-gray-600 font-normal mb-3">{header.tagline}</p>
      )}

      {/* Category Chip */}
      {header.business_category && (
        <span
          className="text-white text-sm font-medium px-4.5 py-1.5 rounded-full tracking-wide"
          style={{ backgroundColor: primaryColor }}
        >
          {header.business_category}
        </span>
      )}

      {/* Quick Action Icons */}
      <div className="grid grid-cols-4 gap-4 w-full mt-7 px-1">
        {contact.phone && (
          <a
            href={`tel:${contact.phone}`}
            onClick={() => { if (slug) trackUniqueAction(slug, TrackAction.Call); }}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-13 h-13 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-gray-50 transition-colors">
              <HugeiconsIcon icon={CallIcon} size={20} />
            </div>
            <span className="text-xs font-semibold text-gray-950">{t("bp_action_call")}</span>
          </a>
        )}

        {(contact.whatsapp || contact.phone) && (
          <a
            href={`https://wa.me/${(contact.whatsapp || contact.phone).replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { if (slug) trackUniqueAction(slug, TrackAction.WhatsApp); }}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-13 h-13 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-gray-50 transition-colors">
              <HugeiconsIcon icon={WhatsappIcon} size={20} />
            </div>
            <span className="text-xs font-semibold text-gray-950">{t("bp_action_whatsapp")}</span>
          </a>
        )}

        {contact.email && (
          <a href={`mailto:${contact.email}`} className="flex flex-col items-center gap-2 group">
            <div className="w-13 h-13 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-gray-50 transition-colors">
              <HugeiconsIcon icon={Mail01Icon} size={20} />
            </div>
            <span className="text-xs font-semibold text-gray-950">{t("bp_action_email")}</span>
          </a>
        )}

        {contact.maps_link && (
          <a
            href={contact.maps_link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { if (slug) trackUniqueAction(slug, TrackAction.Directions); }}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-13 h-13 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-gray-50 transition-colors">
              <HugeiconsIcon icon={Location01Icon} size={20} />
            </div>
            <span className="text-xs font-semibold text-gray-950">{t("bp_action_location")}</span>
          </a>
        )}
      </div>
    </header>
  );
}
