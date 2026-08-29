"use client";

import { useState } from "react";
import { useThemeStore } from "@/store/themeStore";
import {
  BridgeDivider,
  CompareTable,
  CtaBand,
  FaqSection,
  PageHero,
  PageWrapper,
  PricingCard,
  useWhatsApp,
} from "@/views/home-page/component";
import { getPricingFaqs, getPricingPlans, translations } from "@/views/home-page/data";

export default function PricingView() {
  const { openWhatsApp } = useWhatsApp();
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;
  const [isMonthly, setIsMonthly] = useState(false);

  const getTranslatedFaqs = () => getPricingFaqs(t);
  const getTranslatedPlans = () => getPricingPlans(t);

  return (
    <PageWrapper>
      {/* PAGE HERO */}
      <PageHero
        breadcrumbLabel={t.pricing_hero_breadcrumb}
        eyebrow={t.pricing_hero_eyebrow}
        title={t.home_pricing_heading}
        lead={t.home_pricing_subheading || t.pricing_hero_lead}
      />

      {/* PLANS GRID */}
      <section className="py-16 md:py-24 bg-background border-b border-outline">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hostinger Billing Interval Toggle Pill */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-paper border border-outline shadow-z2">
              <button
                type="button"
                onClick={() => setIsMonthly(false)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  !isMonthly
                    ? "bg-primary text-background shadow-z4"
                    : "text-secondary hover:text-primary"
                }`}
              >
                <span>{t.pricing_billing_yearly}</span>
                <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">
                  {t.pricing_save_badge}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setIsMonthly(true)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isMonthly
                    ? "bg-primary text-background shadow-z4"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {t.pricing_billing_monthly}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {getTranslatedPlans().map((plan, idx) => (
              <PricingCard
                key={idx}
                plan={plan}
                isMonthly={isMonthly}
                onSelect={(msg) => openWhatsApp(msg)}
              />
            ))}
          </div>
          <p className="text-center text-sm mt-10 text-secondary">
            📌 {t.pricing_help_note}{" "}
            <button
              onClick={() => openWhatsApp("Hi MarketingSetu! I'm not sure which plan is right for my business — can you help?")}
              className="bg-transparent border-none p-0 cursor-pointer text-brand-main font-bold hover:underline"
            >
              {t.pricing_help_btn}
            </button>{" "}
            — {t.plan_help_choose}
          </p>
        </div>
      </section>

      <BridgeDivider />

      {/* COMPARE TABLE */}
      <div className="bg-background border-b border-outline">
        <CompareTable />
      </div>

      {/* PRICING FAQ */}
      <div className="bg-background border-b border-outline">
        <FaqSection
          eyebrow={t.pricing_faq_eyebrow}
          heading={t.pricing_faq_heading}
          items={getTranslatedFaqs()}
        />
      </div>

      {/* CTA BAND */}
      <CtaBand
        heading={t.pricing_cta_heading}
        description={t.pricing_cta_description}
        whatsappMessage={t.btn_free_consultation}
      />
    </PageWrapper>
  );
}

