"use client";

import { useWhatsApp } from "./useWhatsApp";

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

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-dark via-brand-main to-brand-darker rounded-[24px] p-8 md:p-14 text-center text-white shadow-z24 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-black/20 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">{heading}</h2>
            <p className="text-sm sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-normal">{description}</p>
            <button
              onClick={() => openWhatsApp(whatsappMessage)}
              className="inline-flex items-center justify-center gap-2.5 bg-[#10C85A] hover:bg-[#0EB551] text-white px-8 py-4 rounded-xl font-bold shadow-z12 hover:shadow-z16 hover:-translate-y-0.5 transition-all cursor-pointer text-sm sm:text-base"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

