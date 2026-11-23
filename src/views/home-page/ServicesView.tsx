"use client";

import React from "react";
import {
  CtaBand,
  PageHero,
  PageWrapper,
  ServiceBlock,
} from "@/views/home-page/component";
import { getServicesData, translations } from "@/views/home-page/data";
import { useThemeStore } from "@/store/themeStore";

export default function ServicesView() {
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;
  const services = getServicesData(t);

  return (
    <PageWrapper>
      {/* PAGE HERO (Centered with Brand Secondary Accents) */}
      <PageHero
        breadcrumbLabel="Services"
        eyebrow="GROWTH TOOLS • PAN INDIA"
        center
        title={
          <>
            Digital Marketing & <span className="text-brand-secondary">Local Growth Services</span> for Businesses in India
          </>
        }
        lead={
          <>
            Turn local customer calls and walk-ins into repeat business across Pune, Satara, Sangli, Kolhapur, and{" "}
            <span className="text-brand-secondary font-medium">all over India</span> with automated WhatsApp replies, digital business pages, and daily growth tools.
          </>
        }
      />

      {/* SERVICE BLOCKS */}
      {services.map((service, idx) => (
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
