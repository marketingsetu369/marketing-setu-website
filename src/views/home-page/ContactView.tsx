"use client";

import React from "react";
import { useThemeStore } from "@/store/themeStore";
import {
  FaqSection,
  PageHero,
  PageWrapper,
  ContactForm,
  useWhatsApp,
} from "@/views/home-page/component";
import { getContactFaqs, translations, contactInfo } from "@/views/home-page/data";
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
      {/* PAGE HERO (Centered with Brand Secondary Accents) */}
      <PageHero
        breadcrumbLabel="Contact"
        eyebrow="SUPPORT & CONSULTATION • PAN INDIA"
        center
        title={
          <>
            Get in Touch with <span className="text-brand-secondary">MarketingSetu</span>
          </>
        }
        lead={
          <>
            Have questions about WhatsApp automation, digital business pages, or local setup?{" "}
            <span className="text-brand-secondary font-medium">We are here to help</span> your business grow across India.
          </>
        }
      />

      {/* CONTACT CONTENT SECTION WITH UNIFIED DESIGN */}
      <section className="relative py-16 sm:py-20 bg-background overflow-hidden border-t border-outline/40">
        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* LEFT COLUMN: Clean List of Channels with Dashed Border Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary bg-brand-light border border-brand-secondary/20 px-3.5 py-1 rounded-full inline-block">
                  DIRECT CHANNELS
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary leading-tight">
                  Reach Out to Our Team
                </h2>
                <p className="text-secondary leading-relaxed text-xs sm:text-sm max-w-md">
                  Whether you prefer a quick WhatsApp chat, direct call, or email enquiry, we reply promptly within business hours.
                </p>
              </div>
              
              <div className="space-y-3.5">
                {/* WhatsApp Channel */}
                <div
                  onClick={() => openWhatsApp()}
                  className="group flex gap-4 p-5 rounded-2xl bg-paper border border-outline/70 hover:border-emerald-500 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-card hover:-translate-y-0.5"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    <HugeiconsIcon icon={WhatsappIcon} size={20} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-0.5">WhatsApp Support</h4>
                    <p className="text-sm sm:text-base font-bold text-emerald-600 group-hover:underline">
                      {contactInfo.phone}
                    </p>
                    <p className="text-[11px] text-secondary mt-0.5 font-normal">Tap to start instant chat</p>
                  </div>
                </div>

                {/* Email Channel */}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="group flex gap-4 p-5 rounded-2xl bg-paper border border-outline/70 hover:border-brand-main dark:hover:border-brand-secondary transition-all duration-300 shadow-xs hover:shadow-card hover:-translate-y-0.5 block"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-lighter/80 dark:bg-brand-main/20 text-brand-main dark:text-brand-secondary flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    <HugeiconsIcon icon={Mail01Icon} size={20} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-0.5">Email Support</h4>
                    <p className="text-sm sm:text-base font-bold text-primary group-hover:text-brand-main truncate">
                      {contactInfo.email}
                    </p>
                    <p className="text-[11px] text-secondary mt-0.5 font-normal">Expect reply within 24 hours</p>
                  </div>
                </a>

                {/* Location Channel */}
                <div className="group flex gap-4 p-5 rounded-2xl bg-paper border border-outline/70 hover:border-brand-main dark:hover:border-brand-secondary transition-all duration-300 shadow-xs hover:shadow-card hover:-translate-y-0.5">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-lighter/80 dark:bg-brand-main/20 text-brand-main dark:text-brand-secondary flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    <HugeiconsIcon icon={Location01Icon} size={20} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-0.5">Headquarters</h4>
                    <p className="text-sm font-bold text-primary leading-snug">{contactInfo.location}</p>
                    <p className="text-[11px] text-secondary mt-0.5 font-normal">Serving businesses across India</p>
                  </div>
                </div>

                {/* Hours Channel */}
                <div className="group flex gap-4 p-5 rounded-2xl bg-paper border border-outline/70 transition-all duration-300 shadow-xs">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 flex items-center justify-center font-bold">
                    <HugeiconsIcon icon={Clock02Icon} size={20} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-0.5">Working Hours</h4>
                    <p className="text-sm font-bold text-primary">{t.contact_info_hours_val || "Mon – Sat: 9:00 AM – 7:00 PM"}</p>
                    <p className="text-[11px] text-secondary mt-0.5 font-normal">Sunday: Automated WhatsApp Available</p>
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

