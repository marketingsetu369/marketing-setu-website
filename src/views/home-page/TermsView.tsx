"use client";

import { PageHero, PageWrapper, ProseSection } from "@/views/home-page/component";

export default function TermsView() {
  return (
    <PageWrapper>
      <PageHero
        breadcrumbLabel="Terms of Service"
        title={<span style={{ fontSize: "32px" }}>Terms of Service</span>}
        lead="Last updated: 16 July 2026"
      />

      <ProseSection>
        <p>By using https://marketingsetu.com or engaging MarketingSetu's services, you agree to the following terms.</p>
        <h3>Services</h3>
        <p>MarketingSetu provides digital marketing services including WhatsApp marketing, missed-call automation, landing page design, Google Business setup, and social media management, as described on our Services page and agreed in your chosen plan.</p>
        <h3>Billing</h3>
        <p>Plans are billed annually in Indian Rupees as listed on our Pricing page. Prices are inclusive of onboarding support unless stated otherwise.</p>
        <h3>Client responsibilities</h3>
        <p>You are responsible for ensuring the accuracy of business information, offers, and content you provide us to publish or send on your behalf, and for compliance with applicable messaging consent laws for your customer list.</p>
        <h3>Limitation of liability</h3>
        <p>MarketingSetu is not liable for indirect or consequential losses arising from the use of our services, to the fullest extent permitted by law.</p>
        <h3>Contact</h3>
        <p>Questions about these terms can be sent to hello@marketingsetu.com.</p>
      </ProseSection>
    </PageWrapper>
  );
}
