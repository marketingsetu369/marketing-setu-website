"use client";

import Image from "next/image";
import {
  BridgeDivider,
  CtaBand,
  FeatureGrid,
  PageHero,
  PageWrapper,
  SectionHead,
  StepsSection,
} from "@/views/home-page/component";
import { aboutValues, aboutSteps, translations } from "@/views/home-page/data";
import { useThemeStore } from "@/store/themeStore";

export default function AboutView() {
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;

  const getTranslatedValues = () => {
    return [
      { icon: "🎯", title: t.about_val_1_title, description: t.about_val_1_desc },
      { icon: "🤝", title: t.about_val_2_title, description: t.about_val_2_desc },
      { icon: "📈", title: t.about_val_3_title, description: t.about_val_3_desc },
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
            <em className="not-italic text-brand-purple">
              {t.about_hero_title_highlight}
            </em>
            {t.about_hero_title_post}
          </>
        }
        lead={t.about_hero_lead}
      />

      {/* STORY SECTION */}
      <section className="py-24 bg-white dark:bg-brand-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purpleLight text-brand-purple text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse"></span>
                {t.about_story_eyebrow}
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark dark:text-white leading-tight">
                {t.about_story_heading}
              </h2>
              <p className="text-lg text-brand-gray dark:text-gray-300 leading-relaxed">
                {t.about_story_p1}
              </p>
              <p className="text-lg text-brand-gray dark:text-gray-300 leading-relaxed">
                {t.about_story_p2}
              </p>
            </div>
            <div className="bg-brand-grayLight dark:bg-brand-dark/40 flex items-center justify-center p-8 rounded-3xl border border-gray-100 dark:border-gray-800/60">
              <div className="relative h-[280px] md:h-[340px] w-full rounded-2xl overflow-hidden shadow-xl border border-white dark:border-brand-dark transform rotate-3 hover:rotate-0 transition-transform duration-300">
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

      <BridgeDivider />

      {/* SERVE SECTION */}
      <section className="py-24 bg-brand-grayLight dark:bg-brand-dark/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="bg-brand-purpleLight dark:bg-brand-purple/10 flex items-center justify-center p-8 rounded-3xl border border-brand-purple/10 md:order-1">
              <div className="relative h-[280px] md:h-[340px] w-full rounded-2xl overflow-hidden shadow-xl border border-white dark:border-brand-dark transform -rotate-3 hover:rotate-0 transition-transform duration-300">
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                {t.about_serve_eyebrow}
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark dark:text-white leading-tight">
                {t.about_serve_heading}
              </h2>
              <p className="text-lg text-brand-gray dark:text-gray-300 leading-relaxed">
                {t.about_serve_p1}
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="px-4 py-2 rounded-full bg-white dark:bg-brand-dark text-sm font-semibold text-brand-dark dark:text-white border border-gray-200 dark:border-gray-800 shadow-sm">
                  {t.about_tag_retail}
                </span>
                <span className="px-4 py-2 rounded-full bg-white dark:bg-brand-dark text-sm font-semibold text-brand-dark dark:text-white border border-gray-200 dark:border-gray-800 shadow-sm">
                  {t.about_tag_restaurant}
                </span>
                <span className="px-4 py-2 rounded-full bg-white dark:bg-brand-dark text-sm font-semibold text-brand-dark dark:text-white border border-gray-200 dark:border-gray-800 shadow-sm">
                  {t.about_tag_real_estate}
                </span>
                <span className="px-4 py-2 rounded-full bg-white dark:bg-brand-dark text-sm font-semibold text-brand-dark dark:text-white border border-gray-200 dark:border-gray-800 shadow-sm">
                  {t.about_tag_services}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BridgeDivider tinted />

      {/* MISSION & PROMISE */}
      <section className="py-24 bg-white dark:bg-brand-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 bg-brand-purpleLight/40 dark:bg-brand-purple/10 rounded-3xl p-8 md:p-12 border border-brand-purple/10 shadow-sm backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-brand-purple/10 blur-xl"></div>
              <div className="space-y-3 relative z-10">
                <h3 className="text-xl md:text-2xl font-heading font-bold text-brand-purple dark:text-brand-light flex items-center gap-2">
                  <span>🎯</span> {t.about_mission_title}
                </h3>
                <p className="text-brand-gray dark:text-gray-200 leading-relaxed text-sm">
                  {t.about_mission_desc}
                </p>
              </div>
              <div className="hidden md:block w-px bg-brand-purple/20 self-stretch my-2"></div>
              <div className="space-y-3 relative z-10">
                <h3 className="text-xl md:text-2xl font-heading font-bold text-brand-purple dark:text-brand-light flex items-center gap-2">
                  <span>🤝</span> {t.about_promise_title}
                </h3>
                <p className="text-brand-gray dark:text-gray-200 leading-relaxed text-sm">
                  {t.about_promise_desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BridgeDivider />

      {/* VALUES */}
      <section className="py-24 bg-brand-grayLight dark:bg-brand-dark/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow={t.about_values_eyebrow} heading={t.about_values_heading} />
          <div className="grid md:grid-cols-3 gap-8">
            {getTranslatedValues().map((val, idx) => (
              <div key={idx} className="bg-white dark:bg-brand-dark/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-800/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-brand-purpleLight dark:bg-brand-purple/10 flex items-center justify-center text-2xl mb-6">
                  {val.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-brand-dark dark:text-white mb-3">{val.title}</h3>
                <p className="text-brand-gray dark:text-gray-400 text-sm leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <StepsSection
        eyebrow={t.about_process_eyebrow}
        heading={t.about_process_heading}
        backgroundColor="transparent"
        steps={getTranslatedSteps()}
      />

      {/* CTA BAND */}
      <CtaBand
        heading={t.about_cta_heading}
        description={t.about_cta_description}
        whatsappMessage={t.btn_free_consultation}
      />
    </PageWrapper>
  );
}
