"use client";

import React from "react";
import {
  CtaBand,
  PageHero,
  PageWrapper,
  ServiceBlock,
} from "@/views/home-page/component";
import { servicesData, translations } from "@/views/home-page/data";
import { useThemeStore } from "@/store/themeStore";

export default function ServicesView() {
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;

  return (
    <PageWrapper>
      {/* PAGE HERO */}
      <PageHero
        breadcrumbLabel={t.services_hero_breadcrumb}
        eyebrow={t.services_hero_eyebrow}
        title={t.services_hero_title}
        lead={t.services_hero_lead}
      />

      {/* SERVICE BLOCKS */}
      {servicesData.map((service, idx) => (
        <ServiceBlock key={service.id} service={service} />
      ))}

      {/* CTA BAND */}
      <CtaBand
        heading={t.services_cta_heading}
        description={t.services_cta_description}
        buttonText={t.btn_ask_whatsapp}
        whatsappMessage="Hi MarketingSetu! I'd like help choosing the right service for my business."
      />
    </PageWrapper>
  );
}
