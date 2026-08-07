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
      <section className="py-24 bg-white dark:bg-brand-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-8 bg-brand-grayLight/30 dark:bg-brand-dark/40 rounded-3xl p-8 border border-gray-100 dark:border-gray-800/80">
              <div className="space-y-3">
                <h2 className="text-2xl font-heading font-bold text-brand-dark dark:text-white">{t.contact_info_title}</h2>
                <p className="text-brand-gray dark:text-gray-300">{t.contact_info_subtitle}</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-500/10 text-green-500 flex items-center justify-center text-xl font-bold flex-shrink-0">💬</div>
                  <div>
                    <h4 className="font-bold text-brand-dark dark:text-white">WhatsApp</h4>
                    <button onClick={() => openWhatsApp()} className="bg-transparent border-none p-0 cursor-pointer text-brand-purple dark:text-brand-light font-bold hover:underline">{contactInfo.phone}</button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-purpleLight dark:bg-brand-purple/10 text-brand-purple flex items-center justify-center text-xl font-bold flex-shrink-0">📧</div>
                  <div>
                    <h4 className="font-bold text-brand-dark dark:text-white">{t.contact_info_email}</h4>
                    <a href={`mailto:${contactInfo.email}`} className="text-brand-purple dark:text-brand-light font-medium hover:underline">{contactInfo.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-brand-teal/10 text-brand-teal flex items-center justify-center text-xl font-bold flex-shrink-0">📍</div>
                  <div>
                    <h4 className="font-bold text-brand-dark dark:text-white">{t.contact_info_location}</h4>
                    <span className="text-brand-gray dark:text-gray-300">{contactInfo.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center text-xl font-bold flex-shrink-0">🕐</div>
                  <div>
                    <h4 className="font-bold text-brand-dark dark:text-white">{t.contact_info_hours}</h4>
                    <span className="text-brand-gray dark:text-gray-300">{t.contact_info_hours_val}</span>
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
            <div className="bg-white dark:bg-brand-dark/40 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <BridgeDivider tinted />

      {/* QUICK ANSWERS */}
      <FaqSection
        eyebrow={t.contact_faq_eyebrow}
        heading={t.contact_faq_heading}
        items={getTranslatedFaqs()}
      />
    </PageWrapper>
  );
}
