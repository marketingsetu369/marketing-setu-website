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
    <section className="py-20 bg-white dark:bg-brand-dark transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-purple to-brand-teal rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-black opacity-10 blur-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">{heading}</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">{description}</p>
            <button
              onClick={() => openWhatsApp(whatsappMessage)}
              className="inline-flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
