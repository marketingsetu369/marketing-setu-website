"use client";

import {
  PageHero,
  PageWrapper,
  StatBar,
  TestimonialCard,
  useWhatsApp,
} from "@/views/home-page/component";
import { testimonialsData } from "@/views/home-page/data";
import { AppButton } from "@/components/library";

export default function TestimonialsView() {
  const { openWhatsApp } = useWhatsApp();

  return (
    <PageWrapper>
      {/* PAGE HERO */}
      <PageHero
        breadcrumbLabel="Reviews"
        eyebrow="Client Stories"
        title="Real businesses. Real results. Real stories."
        lead="From dry-cleaners to real estate agents, here's how MarketingSetu has helped small businesses across Maharashtra connect with more customers."
      >
        <StatBar
          stats={[
            { value: "4.9★", label: "Average Rating" },
            { value: "128+", label: "Client Reviews" },
            { value: "500+", label: "Businesses Served" },
          ]}
        />
      </PageHero>

      {/* TESTIMONIALS GRID */}
      <section style={{ paddingTop: "24px" }}>
        <div className="container">
          <div className="grid grid-3">
            {testimonialsData.map((item, idx) => (
              <TestimonialCard key={idx} testimonial={item} />
            ))}
          </div>
        </div>
      </section>

      {/* JOIN THEM SECTION */}
      <section style={{ background: "var(--blue-mist)" }}>
        <div className="container center-text">
          <span className="eyebrow" style={{ display: "inline-flex" }}>Join Them</span>
          <h2>Your business could be our next success story</h2>
          <p style={{ maxWidth: "520px", margin: "0 auto 24px" }}>
            Tell us about your business and we'll show you exactly how our plans would work for you.
          </p>
          <AppButton
            onClick={() => openWhatsApp("Hi MarketingSetu! I'd like to hear more client success stories relevant to my business.")}
            variant="whatsapp"
          >
            💬 Chat on WhatsApp
          </AppButton>
        </div>
      </section>
    </PageWrapper>
  );
}
