"use client";

import { useState } from "react";
import type { TranslationDictionary } from "@/translation";

interface FaqItem {
  question: string;
  answer: string | { intro?: string; items?: string[]; paragraphs?: string[] };
}

interface HomeFaqProps {
  t: TranslationDictionary;
}

export default function HomeFaq({ t }: HomeFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "What exactly is MarketingSetu?",
      answer:
        "MarketingSetu is an all-in-one digital marketing platform designed specifically for Bharat's small businesses. It bridges your business with customers using smart digital business cards, WhatsApp automation engines, custom landing pages, and local marketing tools — without needing technical or design skills.",
    },
    {
      question: "How does the WhatsApp Missed-Call & Auto-Reply Engine work?",
      answer:
        "Whenever a customer calls your business number or inquiries on WhatsApp, our engine instantly sends an interactive WhatsApp greeting with your catalog, services, location, and digital card so you never lose a prospective lead — even when you're busy.",
    },
    {
      question: "Do I need a separate phone number for WhatsApp marketing?",
      answer:
        "No! You can use your existing mobile number. We help you connect your WhatsApp Business account seamlessly so you can engage customers directly without needing complex setup.",
    },
    {
      question: "How fast can I set up my digital presence?",
      answer:
        "In under 5 minutes. Simply fill in your business name, contact information, services or product list, and your digital business card and mini-website are live and shareable right away.",
    },
    {
      question: "Can I manage everything from my phone?",
      answer:
        "Yes! MarketingSetu is built mobile-first. You can download our Android app on Google Play to edit your digital card, view leads, send WhatsApp campaigns, track customer views, and update business details anytime.",
    },
    {
      question: "Is there a free consultation or setup assistance available?",
      answer:
        "Yes! We offer 100% free consultation and onboarding support via WhatsApp and phone to help you choose the best plan and set up your business profile.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-20 lg:py-24 bg-background border-t border-outline/30 scroll-mt-12">
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Massive Headline matching Reference */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight leading-none mb-3 font-sans">
            Frequently Asked
          </h2>
          <p className="text-sm sm:text-base text-secondary font-medium">
            Pricing questions, answered
          </p>
        </div>

        {/* Minimal Accordion Container with clean horizontal borders */}
        <div className="border-t border-outline/50">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border-b border-outline/50">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 lg:py-6 text-left cursor-pointer group"
                >
                  <span className="font-medium text-base sm:text-[17px] text-primary group-hover:text-brand-secondary transition-colors leading-snug">
                    {item.question}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                    className={`shrink-0 text-primary transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M4.5 6.75L9 11.25L13.5 6.75"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0 pb-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-1 text-[14px] sm:text-[15px] text-secondary leading-relaxed font-normal">
                      {typeof item.answer === "string" ? (
                        <p>{item.answer}</p>
                      ) : (
                        <div>
                          {item.answer.intro && <p className="mb-2">{item.answer.intro}</p>}
                          {item.answer.items && (
                            <ul className="list-disc pl-5 space-y-1">
                              {item.answer.items.map((it, i) => (
                                <li key={i}>{it}</li>
                              ))}
                            </ul>
                          )}
                          {item.answer.paragraphs &&
                            item.answer.paragraphs.map((p, i) => (
                              <p key={i} className="mb-2">
                                {p}
                              </p>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
