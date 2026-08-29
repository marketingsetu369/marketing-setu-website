"use client";

import React from "react";
import Link from "next/link";
import { TranslationDictionary } from "@/translation";
import { useWhatsApp } from "./useWhatsApp";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SmartphoneNfcIcon,
  WhatsappIcon,
  WebValidationIcon,
  MapsLocation01Icon,
  MoneyBag01Icon,
  ShoppingBag01Icon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

interface InteractiveShowcaseProps {
  t: TranslationDictionary;
}

export default function InteractiveShowcase({ t }: InteractiveShowcaseProps) {
  const { openWhatsApp } = useWhatsApp();

  const services = [
    {
      id: "digital-card",
      badge: "MAIN PRODUCT",
      title: t.service_block_card_title || "Smart Digital Business Card",
      description: t.service_block_card_lead || "Standard mobile-responsive digital card with contact details and automated messaging.",
      icon: SmartphoneNfcIcon,
      accentColor: "#7265E3",
      bullets: ["Contact & Profile Links", "WhatsApp Tap-to-Connect", "Instant Shareable QR Link"],
      actionLabel: "Get Digital Card",
      actionLink: "",
    },
    {
      id: "whatsapp-automation",
      badge: "GROWTH ADD-ON",
      title: t.service_wa_title || "WhatsApp Automation",
      description: t.service_wa_lead || "Send bulk promotions, festival offers, and automated updates directly on WhatsApp.",
      icon: WhatsappIcon,
      accentColor: "#10C85A",
      bullets: ["Automated Inquiry Reply", "Lead Capture System", "Campaign Broadcast Engine"],
      actionLabel: "Get WhatsApp Automation",
      actionLink: "",
    },
    {
      id: "landing-page",
      badge: "MAIN PRODUCT",
      title: t.service_lp_title || "Landing Page Design",
      description: t.service_lp_lead || "High-converting single-page brand site designed for bookings and customer enquiries.",
      icon: WebValidationIcon,
      accentColor: "#1890FF",
      bullets: ["1 Custom Landing Page", "Custom Domain Connection", "Mobile & SEO Optimized"],
      actionLabel: "View Landing Pages",
      actionLink: "/services#landing-pages",
    },
    {
      id: "google-business",
      badge: "GROWTH ADD-ON",
      title: t.service_gb_title || "Google Business Setup",
      description: t.service_gb_lead || "Optimize your Google Business profile to rank higher in local search and maps.",
      icon: MapsLocation01Icon,
      accentColor: "#FF4842",
      bullets: ["Google Maps Ranking", "Profile Optimization", "Customer Reviews Setup"],
      actionLabel: "View Google Setup",
      actionLink: "/services#google-business",
    },
    {
      id: "income-tracker",
      badge: "GROWTH ADD-ON",
      title: t.service_ie_title || "Income & Expense Tracker",
      description: t.service_ie_lead || "Track daily business cash flows, sales receipts, and operating expenses easily.",
      icon: MoneyBag01Icon,
      accentColor: "#FFC107",
      bullets: ["Daily Ledger Sheets", "Cash Flow Reports", "Profitability Analytics"],
      actionLabel: "View Tracker Details",
      actionLink: "/services#income-expense",
    },
    {
      id: "product-catalog",
      badge: "GROWTH ADD-ON",
      title: t.service_pc_title || "Digital Product Catalog",
      description: t.service_pc_lead || "Showcase products and services online with instant WhatsApp inquiry and ordering.",
      icon: ShoppingBag01Icon,
      accentColor: "#FF8F94",
      bullets: ["Unlimited Items Showcase", "Direct WhatsApp Orders", "Photo Gallery & Pricing"],
      actionLabel: "View Catalog Details",
      actionLink: "/services#catalog",
    },
  ];

  return (
    <div className="py-4">
      {/* 3-COLUMN FEATURE CARDS GRID (Matching Reference Image Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="group bg-paper border border-outline/60 hover:border-[#5B3DF5]/40 rounded-[24px] p-8 sm:p-9 shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Top Colored Accent Icon Container */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: service.accentColor }}
                >
                  <HugeiconsIcon icon={service.icon} size={22} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-secondary bg-neutral border border-outline/50 uppercase tracking-wider">
                  {service.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-primary mb-3 leading-tight group-hover:text-[#5B3DF5] transition-colors">
                {service.title}
              </h3>

              {/* Subtitle / Description (Concise 2-liner) */}
              <p className="text-secondary text-sm leading-relaxed mb-6 line-clamp-2 min-h-[40px]">
                {service.description}
              </p>

              {/* Highlights Checkmarks List */}
              <div className="space-y-2 mb-6">
                {service.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-primary/85">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} className="text-emerald-500 flex-shrink-0" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-5 border-t border-outline/40">
              {service.actionLink ? (
                <Link
                  href={service.actionLink}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-[#5B3DF5] hover:text-[#4A2FE1] transition-colors"
                >
                  <span>{service.actionLabel}</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <button
                  onClick={() => openWhatsApp(`Hi MarketingSetu! I'd like to inquire about ${service.title}.`)}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-[#5B3DF5] hover:text-[#4A2FE1] transition-colors cursor-pointer"
                >
                  <span>{service.actionLabel}</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
