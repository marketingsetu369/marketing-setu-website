"use client";

import React, { useState } from "react";
import { ShieldCheck, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import snarkdown from "snarkdown";
import { useBusinessPageTheme } from "../common/BusinessPageContext";
import { getImageUrl } from "../common/utils";

interface Owner {
  avatar_url?: string;
  name?: string;
  title?: string;
  bio?: string;
  happy_customers_count?: number;
  experience_years?: number;
}

interface OwnerCardProps {
  ownerList: Owner[];
}

export default function OwnerCard({ ownerList }: OwnerCardProps) {
  const { primaryColor, primaryLight, fontHeader, fontSans, t } = useBusinessPageTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  if (ownerList.length === 0) return null;

  return (
    <div className="px-6 mt-6 pb-8 relative z-10 space-y-5 animate-fade-in-up">
      {ownerList.map((owner, idx) => (
        <div key={idx}>
          {/* Owner Info Card */}
          <div className="bg-white rounded-[24px] p-5 shadow-card">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden relative border border-gray-100 flex-shrink-0">
                {owner.avatar_url ? (
                  <img
                    src={getImageUrl(owner.avatar_url)}
                    alt={owner.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{ backgroundColor: primaryLight, color: primaryColor }}
                  >
                    <HugeiconsIcon icon={UserIcon} size={20} />
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-1.5 flex-nowrap max-w-full">
                  <h3 className="font-bold text-gray-950 text-lg truncate min-w-0" style={{ fontFamily: fontHeader }}>
                    {owner.name}
                  </h3>
                  <span className="flex items-center justify-center flex-shrink-0">
                    <HugeiconsIcon icon={ShieldCheck} size={18} color={primaryColor} />
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-semibold mt-0.5">{owner.title}</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          {owner.bio && (
            <div className="px-2 pt-6 pb-4">
              <h2 className="text-lg font-bold text-gray-950 mb-2" style={{ fontFamily: fontHeader }}>
                {t("bp_owner_about")}
              </h2>
              <div
                className={`text-sm text-gray-600 leading-relaxed markdown-content font-normal transition-all ${
                  !isExpanded ? "line-clamp-2" : ""
                }`}
                style={{ fontFamily: fontSans }}
                dangerouslySetInnerHTML={{ __html: snarkdown(owner.bio) }}
              />
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-xs font-semibold hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                style={{ color: primaryColor }}
              >
                {isExpanded ? t("bp_read_less") || "Read Less" : t("bp_read_more") || "Read More"}
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="bg-white rounded-[16px] py-5 px-2 grid grid-cols-2 text-center items-center mt-3">
            <div>
              <p className="text-xl font-semibold leading-tight" style={{ color: primaryColor, fontFamily: fontHeader }}>
                {owner.happy_customers_count || 140}+
              </p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">{t("bp_owner_happy_customers")}</p>
            </div>
            <div className="border-l border-gray-100 py-0.5">
              <p className="text-xl font-semibold leading-tight" style={{ color: primaryColor, fontFamily: fontHeader }}>
                {owner.experience_years || 4}+
              </p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">{t("bp_owner_years_exp")}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
