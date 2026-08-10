"use client";

import Image from "next/image";
import {
  CtaBand,
  PageHero,
  PageWrapper,
  SectionHead,
  StepsSection,
} from "@/views/home-page/component";
import { translations } from "@/views/home-page/data";
import { useThemeStore } from "@/store/themeStore";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Target01Icon,
  HandshakeIcon,
  Presentation01Icon,
} from "@hugeicons/core-free-icons";

export default function AboutView() {
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;

  const getTranslatedValues = () => {
    return [
      { icon: Target01Icon, title: t.about_val_1_title, description: t.about_val_1_desc, color: "text-[#4F46E5] bg-[#EDEAFC] dark:bg-[#4F46E5]/15" },
      { icon: HandshakeIcon, title: t.about_val_2_title, description: t.about_val_2_desc, color: "text-brand-main bg-brand-lighter dark:bg-brand-main/15" },
      { icon: Presentation01Icon, title: t.about_val_3_title, description: t.about_val_3_desc, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/15" },
    ];
  };

  const getTranslatedSteps = () => {
    return [
      { number: "01", title: t.about_step_1_title, description: t.about_step_1_desc },
      { number: "02", title: t.about_step_2_title, description: t.about_step_2_desc },
      { number: "03", title: t.about_step_3_title, description: t.about_step_3_desc },
    ];
  };

  return (
    <PageWrapper>
      {/* PAGE HERO */}
      <PageHero
        breadcrumbLabel={t.about_hero_breadcrumb}
        eyebrow={t.about_hero_eyebrow}
        title={
          <>
            {t.about_hero_title_pre}
            <em className="not-italic text-brand-main">
              {t.about_hero_title_highlight}
            </em>
            {t.about_hero_title_post}
          </>
        }
        lead={t.about_hero_lead}
      />

      {/* STORY SECTION */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper border border-outline text-[11px] font-semibold text-secondary shadow-z1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-main animate-pulse"></span>
                {t.about_story_eyebrow}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                {t.about_story_heading}
              </h2>
              <p className="text-base sm:text-lg text-secondary leading-relaxed font-normal">
                {t.about_story_p1}
              </p>
              <p className="text-base sm:text-lg text-secondary leading-relaxed font-normal">
                {t.about_story_p2}
              </p>
            </div>
            <div className="bg-neutral flex items-center justify-center p-6 sm:p-8 rounded-[32px]">
              <div className="relative h-[280px] md:h-[340px] w-full rounded-[24px] overflow-hidden shadow-z12 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="https://images.unsplash.com/photo-1758873268745-dd2cf0d677b5?auto=format&fit=crop&w=900&q=80"
                  alt="MarketingSetu team collaborating on a client's digital marketing strategy"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVE SECTION */}
      <section className="py-16 md:py-20 bg-gray-100 dark:bg-background">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="bg-neutral flex items-center justify-center p-6 sm:p-8 rounded-[32px] md:order-1">
              <div className="relative h-[280px] md:h-[340px] w-full rounded-[24px] overflow-hidden shadow-z12 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="https://images.unsplash.com/photo-1778550579010-cb0d00cd94e6?auto=format&fit=crop&w=900&q=80"
                  alt="Small business shopkeeper MarketingSetu serves"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-6 md:order-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper border border-outline text-[11px] font-semibold text-secondary shadow-z1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10C85A] animate-pulse"></span>
                {t.about_serve_eyebrow}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                {t.about_serve_heading}
              </h2>
              <p className="text-base sm:text-lg text-secondary leading-relaxed font-normal">
                {t.about_serve_p1}
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {[t.about_tag_retail, t.about_tag_restaurant, t.about_tag_real_estate, t.about_tag_services].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-xl bg-paper text-sm font-semibold text-primary border border-outline shadow-z1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & PROMISE */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 bg-paper rounded-[24px] p-8 md:p-12 shadow-card relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-brand-lighter/25 dark:bg-brand-dark/15 rounded-full blur-xl"></div>

              <div className="space-y-3 relative z-10">
                <h3 className="text-xl font-bold text-brand-main flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-brand-lighter text-brand-main dark:bg-brand-dark dark:text-brand-lighter flex items-center justify-center text-base">
                    <HugeiconsIcon icon={Target01Icon} size={18} />
                  </span>
                  {t.about_mission_title}
                </h3>
                <p className="text-secondary leading-relaxed text-sm">{t.about_mission_desc}</p>
              </div>

              <div className="hidden md:block w-px bg-outline self-stretch my-2"></div>

              <div className="space-y-3 relative z-10">
                <h3 className="text-xl font-bold text-brand-main flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-brand-lighter text-brand-main dark:bg-brand-dark dark:text-brand-lighter flex items-center justify-center text-base">
                    <HugeiconsIcon icon={HandshakeIcon} size={18} />
                  </span>
                  {t.about_promise_title}
                </h3>
                <p className="text-secondary leading-relaxed text-sm">{t.about_promise_desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 md:py-20 bg-gray-100 dark:bg-background">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHead eyebrow={t.about_values_eyebrow} heading={t.about_values_heading} />
          <div className="grid md:grid-cols-3 gap-8">
            {getTranslatedValues().map((val, idx) => (
              <div key={idx} className="bg-paper text-primary rounded-[24px] p-8 shadow-card hover:shadow-z12 transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-z4 ${val.color}`}>
                  <HugeiconsIcon icon={val.icon} size={24} strokeWidth={1.8} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{val.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <StepsSection
            eyebrow={t.about_process_eyebrow}
            heading={t.about_process_heading}
            backgroundColor="transparent"
            steps={getTranslatedSteps()}
          />
        </div>
      </section>

      {/* CTA BAND */}
      <CtaBand
        heading={t.about_cta_heading}
        description={t.about_cta_description}
        whatsappMessage={t.btn_free_consultation}
      />
    </PageWrapper>
  );
}
