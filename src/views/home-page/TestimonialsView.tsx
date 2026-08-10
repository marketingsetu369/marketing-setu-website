"use client";

import { AppButton } from "@/components/library";
import {
  PageHero,
  PageWrapper,
  StatBar,
  TestimonialCard,
  useWhatsApp,
} from "@/views/home-page/component";
import { testimonialsData, translations } from "@/views/home-page/data";
import { useThemeStore } from "@/store/themeStore";
import { TranslationDictionary } from "@/translation";

export default function TestimonialsView() {
  const { openWhatsApp } = useWhatsApp();
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;

  const getTranslatedTestimonials = () => {
    return testimonialsData.map((tItem, index) => {
      const num = index + 1;
      const textKey = `testi_${num}_text` as keyof TranslationDictionary;
      const roleKey = `testi_${num}_role` as keyof TranslationDictionary;
      return {
        ...tItem,
        text: (t[textKey] as string) || tItem.text,
        role: (t[roleKey] as string) || tItem.role,
      };
    });
  };

  return (
    <PageWrapper>
      {/* PAGE HERO */}
      <PageHero
        breadcrumbLabel={t.reviews_hero_breadcrumb}
        eyebrow={t.reviews_hero_eyebrow}
        title={t.reviews_hero_title}
        lead={t.reviews_hero_lead}
      >
        <StatBar
          stats={[
            { value: "4.9★", label: t.reviews_stat_rating },
            { value: "128+", label: t.reviews_stat_reviews },
            { value: "500+", label: t.reviews_stat_served },
          ]}
        />
      </PageHero>

      {/* TESTIMONIALS GRID */}
      <section className="py-16 md:py-24 bg-background border-b border-outline">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {getTranslatedTestimonials().map((item, idx) => (
              <TestimonialCard key={idx} testimonial={item} />
            ))}
          </div>
        </div>
      </section>

      {/* JOIN THEM SECTION */}
      <section className="py-16 md:py-24 bg-background border-b border-outline">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper border border-outline text-[11px] font-semibold text-secondary shadow-z1 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-main animate-pulse"></span>
            {t.reviews_join_eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
            {t.reviews_join_heading}
          </h2>
          <p className="text-base sm:text-lg text-secondary max-w-lg mx-auto leading-relaxed">
            {t.reviews_join_desc}
          </p>
          <div className="pt-4">
            <AppButton
              onClick={() => openWhatsApp("Hi MarketingSetu! I'd like to hear more client success stories relevant to my business.")}
              variant="whatsapp"
            >
              {t.btn_whatsapp_chat}
            </AppButton>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

