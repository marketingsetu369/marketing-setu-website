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
import { contactFaqs, translations, contactInfo } from "@/views/home-page/data";
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

  const getTranslatedFaqs = () => {
    return [
      { question: t.faq_contact_q1, answer: t.faq_contact_a1 },
      { question: t.faq_contact_q2, answer: t.faq_contact_a2 },
      { question: t.faq_contact_q3, answer: t.faq_contact_a3 },
    ];
  };

  return (
    <PageWrapper>
      {/* PAGE HERO */}
      <PageHero
        breadcrumbLabel={t.contact_hero_breadcrumb}
        eyebrow={t.contact_hero_eyebrow}
        title={t.contact_hero_title}
        lead={t.contact_hero_lead}
      />

      {/* CONTACT CONTENT */}
      <section className="py-16 md:py-24 bg-background border-b border-outline">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-8 bg-paper text-primary border border-outline rounded-[24px] p-8 shadow-card">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-primary">{t.contact_info_title}</h2>
                <p className="text-secondary">{t.contact_info_subtitle}</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#D8FBDE] dark:bg-[#10C85A]/15 text-[#10C85A] flex items-center justify-center text-xl font-bold flex-shrink-0">
                    <HugeiconsIcon icon={WhatsappIcon} size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">WhatsApp</h4>
                    <button onClick={() => openWhatsApp()} className="bg-transparent border-none p-0 cursor-pointer text-brand-main font-bold hover:underline">{contactInfo.phone}</button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-lighter dark:bg-brand-dark/15 text-brand-main flex items-center justify-center text-xl font-bold flex-shrink-0">
                    <HugeiconsIcon icon={Mail01Icon} size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{t.contact_info_email}</h4>
                    <a href={`mailto:${contactInfo.email}`} className="text-brand-main font-medium hover:underline">{contactInfo.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/15 text-blue-500 flex items-center justify-center text-xl font-bold flex-shrink-0">
                    <HugeiconsIcon icon={Location01Icon} size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{t.contact_info_location}</h4>
                    <span className="text-secondary">{contactInfo.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/15 text-amber-500 flex items-center justify-center text-xl font-bold flex-shrink-0">
                    <HugeiconsIcon icon={Clock02Icon} size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{t.contact_info_hours}</h4>
                    <span className="text-secondary">{t.contact_info_hours_val}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <AppButton onClick={() => openWhatsApp()} variant="whatsapp" fullWidth>
                  {t.contact_info_wa_now}
                </AppButton>
              </div>
            </div>

            {/* Renders the unified contact form component */}
            <div className="bg-paper text-primary border border-outline rounded-[24px] p-8 shadow-card">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <BridgeDivider tinted />

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

