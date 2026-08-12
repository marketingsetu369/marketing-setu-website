"use client";

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
  const { primaryColor, primaryLight, fontHeader, fontSans } = useBusinessPageTheme();

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
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-gray-950 text-lg" style={{ fontFamily: fontHeader }}>
                    {owner.name}
                  </h3>
                  <span className="text-[#2e7d32] flex items-center justify-center">
                    <HugeiconsIcon icon={ShieldCheck} size={18} color="#2e7d32" />
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
                About
              </h2>
              <div
                className="text-sm text-gray-600 leading-relaxed markdown-content font-normal"
                style={{ fontFamily: fontSans }}
                dangerouslySetInnerHTML={{ __html: snarkdown(owner.bio) }}
              />
            </div>
          )}

          {/* Stats */}
          <div className="bg-white rounded-[16px] py-5 px-2 grid grid-cols-2 text-center items-center">
            <div>
              <p className="text-xl font-semibold leading-tight" style={{ color: primaryColor, fontFamily: fontHeader }}>
                {owner.happy_customers_count || 140}+
              </p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">Happy Customers</p>
            </div>
            <div className="border-l border-gray-100 py-0.5">
              <p className="text-xl font-semibold leading-tight" style={{ color: primaryColor, fontFamily: fontHeader }}>
                {owner.experience_years || 4}+
              </p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">Years Exp.</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
