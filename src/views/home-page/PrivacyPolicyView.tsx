"use client";

import { PageHero, PageWrapper, ProseSection } from "@/views/home-page/component";

export default function PrivacyPolicyView() {
  return (
    <PageWrapper>
      <PageHero
        breadcrumbLabel="Privacy Policy"
        title={<span style={{ fontSize: "32px" }}>Privacy Policy</span>}
        lead="Last updated: 16 July 2026"
      />

      <ProseSection>
        <p>MarketingSetu ("we", "us", "our") respects your privacy. This policy explains what information we collect through https://marketingsetu.com and how we use it.</p>
        <h3>Information we collect</h3>
        <p>When you contact us via our form or WhatsApp, we collect your name, phone number, business name, and any message details you choose to share. We do not collect payment information through this website.</p>
        <h3>How we use your information</h3>
        <p>We use the information you share to respond to enquiries, recommend suitable plans, and provide the services you sign up for. We do not sell your information to third parties.</p>
        <h3>WhatsApp communication</h3>
        <p>Messages sent via our WhatsApp links are subject to WhatsApp's own privacy policy in addition to this one.</p>
        <h3>Cookies</h3>
        <p>This site may use minimal local storage to remember your display preferences, such as dark mode. No third-party advertising cookies are used.</p>
        <h3>Contact us</h3>
        <p>For any privacy questions, email us at support@marketingsetu.com.</p>
      </ProseSection>
    </PageWrapper>
  );
}
