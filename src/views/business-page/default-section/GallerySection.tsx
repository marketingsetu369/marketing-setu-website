"use client";

import { useBusinessPageTheme } from "../common/BusinessPageContext";
import { getImageUrl } from "../common/utils";

interface GalleryItem {
  url?: string;
}

interface GallerySectionProps {
  gallery: GalleryItem[];
  onImageClick: (index: number) => void;
}

export default function GallerySection({ gallery, onImageClick }: GallerySectionProps) {
  const { primaryColor, fontHeader, t } = useBusinessPageTheme();

  if (gallery.length === 0) return null;

  return (
    <section className="animate-fade-in-up animation-delay-200 bg-white py-10 px-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-950 tracking-tight" style={{ fontFamily: fontHeader }}>
          {t("bp_gallery_heading")}
        </h2>
      </div>

      <div className="columns-2 md:columns-3 gap-3 [column-fill:balance] space-y-3">
        {gallery.slice(0, 6).map((item, idx) => {
          const isLast = idx === 5 && gallery.length > 6;
          return (
            <div
              key={idx}
              onClick={() => onImageClick(idx)}
              className="break-inside-avoid mb-3 rounded-2xl overflow-hidden bg-gray-100 hover:shadow-md relative group transition-shadow cursor-pointer"
            >
              <img
                src={getImageUrl(item.url)}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 rounded-2xl"
              />
              {isLast && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white font-bold select-none animate-fade-in transition-all group-hover:bg-black/70">
                  <span className="text-2xl tracking-tight">+{gallery.length - 5}</span>
                  <span className="text-xs uppercase tracking-wider font-medium text-white/90 mt-0.5">
                    {t("bp_more") || "More"}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
