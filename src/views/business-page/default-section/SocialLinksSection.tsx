"use client";

import {
  FacebookIcon,
  InstagramIcon,
  NewTwitterIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useBusinessPageTheme } from "../common/BusinessPageContext";
import { formatSocialLink } from "../common/utils";

interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  twitter?: string;
}

interface SocialLinksSectionProps {
  socialLinks: SocialLinks;
}

export default function SocialLinksSection({ socialLinks }: SocialLinksSectionProps) {
  const { fontHeader, t } = useBusinessPageTheme();
  const hasAny = Boolean(
    socialLinks.instagram?.trim() ||
    socialLinks.facebook?.trim() ||
    socialLinks.youtube?.trim() ||
    socialLinks.twitter?.trim()
  );
  if (!hasAny) return null;

  return (
    <section className="animate-fade-in-up bg-[var(--color-grey-100)] py-6 px-6">
      <h2 className="text-lg font-semibold text-gray-950 tracking-tight mb-4 text-center" style={{ fontFamily: fontHeader }}>
        {t("bp_social_links")}
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-center">
        {socialLinks.instagram?.trim() && (
          <a href={formatSocialLink(socialLinks.instagram, "instagram")} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
              <HugeiconsIcon icon={InstagramIcon} size={20} />
            </div>
            <span className="text-xs font-bold text-gray-600">Instagram</span>
          </a>
        )}

        {socialLinks.facebook?.trim() && (
          <a href={formatSocialLink(socialLinks.facebook, "facebook")} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
              <HugeiconsIcon icon={FacebookIcon} size={20} />
            </div>
            <span className="text-xs font-bold text-gray-600">Facebook</span>
          </a>
        )}

        {socialLinks.youtube?.trim() && (
          <a href={formatSocialLink(socialLinks.youtube, "youtube")} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
              <HugeiconsIcon icon={YoutubeIcon} size={20} />
            </div>
            <span className="text-xs font-bold text-gray-600">YouTube</span>
          </a>
        )}

        {socialLinks.twitter?.trim() && (
          <a href={formatSocialLink(socialLinks.twitter, "twitter")} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
              <HugeiconsIcon icon={NewTwitterIcon || TwitterIcon} size={18} />
            </div>
            <span className="text-xs font-bold text-gray-600">Twitter / X</span>
          </a>
        )}
      </div>
    </section>
  );
}
