"use client";

import React from "react";
import { useThemeStore } from "@/store/themeStore";
import {
  BridgeDivider,
  FaqSection,
  PageHero,
  PageWrapper,
  ContactForm,
  useWhatsApp,
} from "@/views/home-page/component";
import { getContactFaqs, translations, contactInfo } from "@/views/home-page/data";
import { AppButton } from "@/components/library";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  WhatsappIcon,
  Mail01Icon,
  Location01Icon,
  Clock02Icon,
} from "@hugeicons/core-free-icons";

export default function ContactView() {
  const { language } = useThemeStore();
  const { openWhatsApp } = useWhatsApp();
  const t = translations[language] || translations.en;

  const getTranslatedFaqs = () => getContactFaqs(t);

  return (
    <PageWrapper>
      {/* PAGE HERO */}
      <PageHero
        breadcrumbLabel={t.contact_hero_breadcrumb}
        eyebrow={t.contact_hero_eyebrow}
        title={t.contact_hero_title}
        lead={t.contact_hero_lead}
      />

      {/* CONTACT CONTENT SECTION WITH MODERN GRADIENT BLOBS */}
      <section className="relative py-20 md:py-28 bg-background overflow-hidden">
        {/* Glow Blobs */}
        <div className="absolute top-1/4 left-0 -translate-x-1/2 w-96 h-96 bg-brand-main/15 dark:bg-brand-main/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-96 h-96 bg-blue-500/15 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Clean List of Channels (No Parent Card Wrapper) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-neutral border border-outline px-3 py-1 rounded-full inline-block">
                  {t.contact_hero_eyebrow || "CONNECT"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary leading-tight">
                  {t.contact_info_title}
                </h2>
                <p className="text-secondary leading-relaxed text-sm sm:text-base">
                  {t.contact_info_subtitle}
                </p>
              </div>
              
              <div className="space-y-5">
                {/* WhatsApp Channel */}
                <div className="group flex gap-4 p-6 rounded-2xl bg-paper shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-success-lighter text-success-main flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
                    <HugeiconsIcon icon={WhatsappIcon} size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary mb-1">WhatsApp</h4>
                    <button 
                      onClick={() => openWhatsApp()} 
                      className="bg-transparent border-none p-0 cursor-pointer text-base sm:text-lg font-bold text-success-main hover:underline text-left"
                    >
                      {contactInfo.phone}
                    </button>
                  </div>
                </div>

                {/* Email Channel */}
                <div className="group flex gap-4 p-6 rounded-2xl bg-paper shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-lighter text-brand-main flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
                    <HugeiconsIcon icon={Mail01Icon} size={22} strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-primary mb-1">{t.contact_info_email}</h4>
                    <a 
                      href={`mailto:${contactInfo.email}`} 
                      className="text-base sm:text-lg font-bold text-brand-main hover:underline break-all block"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Location Channel */}
                <div className="group flex gap-4 p-6 rounded-2xl bg-paper shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-info-lighter text-info-main flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
                    <HugeiconsIcon icon={Location01Icon} size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary mb-1">{t.contact_info_location}</h4>
                    <span className="text-secondary font-medium text-sm sm:text-base leading-snug">{contactInfo.location}</span>
                  </div>
                </div>

                {/* Hours Channel */}
                <div className="group flex gap-4 p-6 rounded-2xl bg-paper shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-warning-lighter text-warning-main flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
                    <HugeiconsIcon icon={Clock02Icon} size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary mb-1">{t.contact_info_hours}</h4>
                    <span className="text-secondary font-medium text-sm sm:text-base">{t.contact_info_hours_val}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Form Wrapper with High-End Card styling */}
            <div className="lg:col-span-7 bg-paper rounded-3xl p-8 sm:p-10 border border-outline shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* QUICK ANSWERS */}
      <div className="bg-background border-b border-outline">
        <FaqSection
          eyebrow={t.contact_faq_eyebrow}
          heading={t.contact_faq_heading}
          items={getTranslatedFaqs()}
        />
      </div>
    </PageWrapper>
  );
}

