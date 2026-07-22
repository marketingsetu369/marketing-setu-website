"use client";

import React from "react";
import {
  BridgeDivider,
  CtaBand,
  PageHero,
  PageWrapper,
  ServiceBlock,
} from "@/views/home-page/component";
import { servicesData } from "@/views/home-page/data";

export default function ServicesView() {
  return (
    <PageWrapper>
      {/* PAGE HERO */}
      <PageHero
        breadcrumbLabel="Services"
        eyebrow="Our Services"
        title="Marketing tools built for how Indian customers actually communicate"
        lead="From the first missed call to the hundredth WhatsApp broadcast, every MarketingSetu service is designed to turn attention into paying customers — without needing a marketing team of your own."
      />

      {/* SERVICE BLOCKS */}
      {servicesData.map((service, idx) => (
        <React.Fragment key={service.id}>
          <ServiceBlock service={service} />
          {idx < servicesData.length - 1 && <BridgeDivider />}
        </React.Fragment>
      ))}

      <BridgeDivider />

      {/* CTA BAND */}
      <CtaBand
        heading="Not sure which service fits your business?"
        description="Tell us what you sell and who you sell to — we'll recommend the right mix in one WhatsApp chat."
        buttonText="💬 Ask on WhatsApp"
        whatsappMessage="Hi MarketingSetu! I'd like help choosing the right service for my business."
      />
    </PageWrapper>
  );
}
