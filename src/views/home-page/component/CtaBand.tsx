"use client";

import { useWhatsApp } from "./useWhatsApp";
import { useThemeStore } from "@/store/themeStore";
import { translations } from "@/views/home-page/data";

interface CtaBandProps {
  heading: string;
  description: string;
  buttonText?: string;
  whatsappMessage?: string;
}

export default function CtaBand({
  heading,
  description,
  buttonText = "💬 Chat on WhatsApp",
  whatsappMessage = "Hi MarketingSetu! I'd like a free consultation.",
}: CtaBandProps) {
  const { openWhatsApp } = useWhatsApp();
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gray-950 dark:bg-gray-900 shadow-z24">

          {/* Decorative blobs */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-main/20 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-500/15 blur-[80px] pointer-events-none" />

          {/* Content — left-aligned split layout */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-10 py-12 md:px-16 md:py-14">

            {/* Left: text */}
            <div className="flex-1 text-left">
              {/* Eyebrow pill */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-semibold text-white/70 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-main animate-pulse" />
                {t.cta_join_businesses || "Join 500+ Businesses"}
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight max-w-lg">
                {heading}
              </h2>
              <p className="text-white/60 text-sm sm:text-base mt-4 max-w-md leading-relaxed font-normal">
                {description}
              </p>
            </div>

            {/* Right: CTA button */}
            <div className="flex-shrink-0">
              <button
                onClick={() => openWhatsApp(whatsappMessage)}
                className="inline-flex items-center justify-center gap-2.5 bg-[#10C85A] hover:bg-[#0EB551] text-white px-8 py-4 rounded-xl font-bold shadow-z12 hover:shadow-z20 hover:-translate-y-0.5 transition-all cursor-pointer text-sm sm:text-base whitespace-nowrap"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
