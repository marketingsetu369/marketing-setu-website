"use client";

import React from "react";
import { PageHero, PageWrapper, CtaBand } from "@/views/home-page/component";
import { IndustryLandingInfo } from "./data/industryLandingData";
import { useWhatsApp } from "@/views/home-page/component";

interface IndustryLandingViewProps {
  info: IndustryLandingInfo;
}

export default function IndustryLandingView({ info }: IndustryLandingViewProps) {
  const { openWhatsApp } = useWhatsApp();

  return (
    <PageWrapper>
      <div className="font-sans text-primary bg-background">
        {/* HERO SECTION */}
        <PageHero
          breadcrumbLabel={info.industryName}
          eyebrow={info.badge}
          title={info.h1}
          lead={info.subtitle}
        />

        {/* BENEFITS SECTION */}
        <section className="py-20 bg-paper border-y border-outline">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-background border border-outline px-3 py-1 rounded-full inline-block mb-3">
                KEY ADVANTAGES
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-primary tracking-tight">
                Why {info.industryName} Choose Marketing Setu
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {info.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-background p-6 rounded-2xl border border-outline shadow-xs hover:border-brand-main/40 transition-all flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-lighter text-brand-dark flex items-center justify-center font-bold text-lg shrink-0">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-1">
                      {benefit}
                    </h3>
                    <p className="text-secondary text-sm leading-relaxed">
                      Customized for {info.industryName} to convert local customer interest into paying clients.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA CALLOUT */}
        <section className="py-16 bg-background text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-lighter/60 border border-brand-light/40 rounded-3xl p-10 shadow-sm">
              <h3 className="text-2xl sm:text-3xl font-semibold text-brand-dark mb-4">
                Ready to Grow Your {info.industryName} Business?
              </h3>
              <p className="text-secondary text-base max-w-xl mx-auto mb-8">
                Get your digital business card and WhatsApp marketing system ready in 15 minutes.
              </p>
              <button
                onClick={() => openWhatsApp()}
                className="inline-flex items-center justify-center gap-2 bg-brand-main hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-xl shadow-z8 transition-all cursor-pointer"
              >
                Get Started on WhatsApp 💬
              </button>
            </div>
          </div>
        </section>

        {/* FAQS SECTION */}
        {info.faqs && info.faqs.length > 0 && (
          <section className="py-20 bg-paper">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-6">
                {info.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-background border border-outline shadow-xs"
                  >
                    <h4 className="text-base font-bold text-primary mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-secondary text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* BOTTOM CTA */}
        <CtaBand
          heading={`Start Growing Your ${info.industryName} Business Today`}
          description="Get your digital card, WhatsApp automation, and Google Business profile set up in 15 minutes."
        />
      </div>
    </PageWrapper>
  );
}
