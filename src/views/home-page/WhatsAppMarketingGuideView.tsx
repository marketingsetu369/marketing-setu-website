"use client";

import { CtaBand, PageHero, PageWrapper, ProseSection } from "@/views/home-page/component";

export default function WhatsAppMarketingGuideView() {
  return (
    <PageWrapper>
      <PageHero
        breadcrumbLabel="WhatsApp Marketing Guide"
        eyebrow="WhatsApp Marketing · 12 Jul 2026"
        title="WhatsApp Marketing for Small Businesses: A Practical Guide"
      />

      <ProseSection>
        <p>For most Indian small businesses, WhatsApp isn't a "nice to have" marketing channel — it's already where customers are having conversations about your business. The question isn't whether to use it, but how to use it well without becoming spam.</p>

        <h2>Start with permission, not blasts</h2>
        <p>The businesses that get the best results build an opt-in list first: customers who've messaged you, scanned a QR code, or ticked a box at checkout. A smaller, permission-based list that actually reads your messages will always outperform a large list that mutes you after one broadcast.</p>

        <h2>Keep broadcasts useful, not just promotional</h2>
        <p>Order updates, appointment reminders, and festival offers tend to get read. Constant discount spam tends to get ignored or blocked. A simple rule that works well: for every promotional message, send at least one useful update.</p>

        <h2>Automate the first reply, not the whole conversation</h2>
        <p>Auto-replies are brilliant for acknowledging an enquiry within seconds — "Thanks for reaching out to [Business], we'll respond shortly" — but customers can tell quickly if every message afterwards is robotic. Use automation to buy time and route the conversation, then bring in a real person for anything beyond the basics.</p>

        <h2>Measure what actually matters</h2>
        <p>Delivery rate and read rate are useful, but the number that matters most is enquiries converted to bookings or sales. Track that weekly, even in a simple notebook or spreadsheet, so you know which campaigns are worth repeating.</p>

        <h2>Where MarketingSetu fits in</h2>
        <p>Our WhatsApp Marketing service handles the broadcast setup, opt-in list building, and first-reply automation, so you can focus on the conversations that need a human touch.</p>
      </ProseSection>

      <CtaBand
        heading="Ready to set up WhatsApp marketing for your business?"
        description="We'll set up your broadcast list and auto-replies in a single onboarding call."
        buttonText="💬 Get Started on WhatsApp"
        whatsappMessage="Hi MarketingSetu! I'd like to set up WhatsApp marketing for my business."
      />
    </PageWrapper>
  );
}
