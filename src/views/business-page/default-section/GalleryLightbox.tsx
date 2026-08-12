"use client";

import { ArrowLeft02Icon, ArrowRight02Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getImageUrl } from "../common/utils";

interface GalleryItem {
  url?: string;
}

interface GalleryLightboxProps {
  gallery: GalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({
  gallery,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md animate-fade-in">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2.5 cursor-pointer z-50 bg-black/40 rounded-full active:scale-95"
      >
        <HugeiconsIcon icon={Cancel01Icon} size={22} />
      </button>

      <div className="relative w-full max-w-4xl aspect-video md:aspect-[16/10] flex items-center justify-center">
        {/* Prev */}
        <button
          onClick={onPrev}
          className="absolute left-2 md:left-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
        </button>

        <img
          src={getImageUrl(gallery[activeIndex]?.url)}
          alt={`Gallery Full View ${activeIndex}`}
          className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl animate-fade-in-up"
        />

        {/* Next */}
        <button
          onClick={onNext}
          className="absolute right-2 md:right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
        >
          <HugeiconsIcon icon={ArrowRight02Icon} size={20} />
        </button>
      </div>

      <p className="text-white/60 text-xs font-semibold mt-4">
        {activeIndex + 1} / {gallery.length}
      </p>
    </div>
  );
}
