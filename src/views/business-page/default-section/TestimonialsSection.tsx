"use client";

import { StarRating } from "@/components/library";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useBusinessPageTheme } from "../common/BusinessPageContext";
import { getImageUrl } from "../common/utils";

interface Testimonial {
  name?: string;
  avatar?: string;
  rating?: number;
  comment?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  sectionClass: string;
}

export default function TestimonialsSection({
  testimonials,
  activeIndex,
  onPrev,
  onNext,
  sectionClass,
}: TestimonialsSectionProps) {
  const { primaryColor, fontHeader, t } = useBusinessPageTheme();
  const active = testimonials[activeIndex];

  if (testimonials.length === 0 || !active) return null;

  return (
    <section className={`text-center flex flex-col items-center animate-fade-in-up animation-delay-300 w-full ${sectionClass}`}>
      <h2 className="text-lg font-semibold text-gray-950 tracking-tight mb-1" style={{ fontFamily: fontHeader }}>
        {t("bp_testimonials_heading")}
      </h2>
      <p className="text-xs text-gray-500 font-semibold mb-20">
        {t("bp_testimonials_subtext")}
      </p>

      {/* Active card */}
      <div className="relative w-full max-w-md bg-white rounded-[32px] px-8 pb-10 pt-16 shadow-card flex flex-col items-center mb-0">
        {/* Overlapping Avatar */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full overflow-hidden bg-white ring-6 ring-[var(--color-gray-50)] shadow-sm">
          <img
            src={getImageUrl(active.avatar)}
            alt={active.name}
            className="w-full h-full object-cover rounded-full animate-fade-in-up"
          />
        </div>

        <StarRating rating={Number(active.rating) || 5} />

        <h3 className="font-bold text-gray-900 text-lg mb-2" style={{ fontFamily: fontHeader }}>
          {active.name}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed text-center font-normal max-w-sm">
          &ldquo;{active.comment}&rdquo;
        </p>
      </div>

      {/* Navigation */}
      {testimonials.length > 1 && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={onPrev}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition-all shadow-xs border border-gray-100 cursor-pointer"
          >
            <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
          </button>
          <button
            onClick={onNext}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition-all shadow-xs border border-gray-100 cursor-pointer"
          >
            <HugeiconsIcon icon={ArrowRight02Icon} size={20} />
          </button>
        </div>
      )}
    </section>
  );
}
