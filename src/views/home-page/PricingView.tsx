"use client";

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
import { pricingPlans, translations } from "@/views/home-page/data";

export default function PricingView() {
  const { openWhatsApp } = useWhatsApp();
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;

  const getTranslatedFaqs = () => {
    return [
      { question: t.faq_pricing_q1, answer: t.faq_pricing_a1 },
      { question: t.faq_pricing_q2, answer: t.faq_pricing_a2 },
      { question: t.faq_pricing_q3, answer: t.faq_pricing_a3 },
    ];
  };

  const getTranslatedPlans = () => {
    return pricingPlans.map((plan) => {
      let badge = plan.badge;
      let name = plan.name;
      let price = plan.price;
      let description = plan.description;

      if (plan.id === "quick-connect") {
        badge = t.plan_quick_badge;
        name = t.plan_quick_name;
        price = t.plan_quick_price;
        description = t.plan_quick_desc;
      } else if (plan.id === "smart-connect") {
        badge = t.plan_smart_badge;
        name = t.plan_smart_name;
        price = t.plan_smart_price;
        description = t.plan_smart_desc;
      } else if (plan.id === "power-connect") {
        badge = t.plan_power_badge;
        name = t.plan_power_name;
        price = t.plan_power_price;
        description = t.plan_power_desc;
      }

      const featureMapping: Record<string, { bold: string; desc?: string }> = {
        "Digital Business Card": { bold: t.plan_feat_digital_card },
        "Auto SMS on Missed Call": { bold: t.plan_feat_auto_sms },
        "Auto WhatsApp on Missed Call": { bold: t.plan_feat_auto_wa },
        "Custom Landing Page": { bold: t.plan_feat_landing_page },
        "Festival Social Media Posts": { bold: t.plan_feat_festivals },
        "Everything in Starter": { bold: t.plan_feat_everything_starter },
        "Everything in Growth": { bold: t.plan_feat_everything_growth },
        "Everything in Smart Connect": { bold: t.plan_feat_everything_growth },
        "Custom Landing Page + Domain": { bold: t.plan_feat_domain },
        "Google Business Setup": { bold: t.plan_feat_google },
      };

      const translateFeatures = (featuresList: typeof plan.features) => {
        return featuresList.map((f) => {
          const mapped = featureMapping[f.bold];
          if (mapped) {
            return {
              bold: mapped.bold,
              desc: f.desc ? t.plan_feat_desc_included : undefined,
            };
          }
          return f;
        });
      };

      return {
        ...plan,
        badge,
        name,
        price,
        description,
        features: translateFeatures(plan.features),
        compactFeatures: plan.compactFeatures ? translateFeatures(plan.compactFeatures) : undefined,
      };
    });
  };

  return (
    <PageWrapper>
      {/* PAGE HERO */}
      <PageHero
        breadcrumbLabel={t.pricing_hero_breadcrumb}
        eyebrow={t.pricing_hero_eyebrow}
        title={t.pricing_hero_title}
        lead={t.pricing_hero_lead}
      />

      {/* PLANS GRID */}
      <section className="py-16 md:py-24 bg-background border-b border-outline">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {getTranslatedPlans().map((plan, idx) => (
              <PricingCard
                key={idx}
                plan={plan}
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

