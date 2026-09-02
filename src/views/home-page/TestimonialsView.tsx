"use client";

import {
  PageHero,
  PageWrapper,
  StatBar,
  TestimonialCard,
  CtaBand,
} from "@/views/home-page/component";
import { testimonialsData, translations } from "@/views/home-page/data";
import { useThemeStore } from "@/store/themeStore";
import { TranslationDictionary } from "@/translation";
import { useWhatsApp } from "@/views/home-page/component";

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

      {/* MASONRY TESTIMONIALS GRID */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-background">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
              {t.reviews_grid_heading || "What our customers are saying"}
            </h2>
            <p className="text-secondary text-sm mt-3 max-w-xl mx-auto leading-relaxed">
              {t.reviews_grid_lead || "Real results from real small businesses across India."}
            </p>
          </div>

          {/* Pinterest-style masonry columns */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {getTranslatedTestimonials().map((item, idx) => (
              <TestimonialCard key={idx} testimonial={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <CtaBand
        heading={t.reviews_join_heading}
        description={t.reviews_join_desc}
        buttonText={t.btn_whatsapp_chat}
        whatsappMessage="Hi MarketingSetu! I'd like to hear more client success stories relevant to my business."
      />
    </PageWrapper>
  );
}
