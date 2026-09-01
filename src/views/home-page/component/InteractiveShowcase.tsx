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
      badge: t.showcase_badge_main || "MAIN PRODUCT",
      title: t.showcase_card_digital_title || "Smart Digital Business Card",
      description: t.showcase_card_digital_desc || "Your professional Digital Business Card — shareable via WhatsApp, QR code, Instagram, and Google in one tap.",
      icon: SmartphoneNfcIcon,
      accentColor: "#7265E3",
      bullets: [
        t.showcase_bullet_digital_1 || "Contact & Profile Links",
        t.showcase_bullet_digital_2 || "WhatsApp Tap-to-Connect",
        t.showcase_bullet_digital_3 || "Instant Shareable QR Link",
      ],
      actionLabel: t.showcase_btn_digital || "Get Digital Card",
      actionLink: "",
    },
    {
      id: "whatsapp-automation",
      badge: t.showcase_badge_growth || "GROWTH ADD-ON",
      title: t.showcase_card_wa_title || "WhatsApp Marketing",
      description: t.showcase_card_wa_desc || "Reach your customers directly where they spend the most time and grow your sales.",
      icon: WhatsappIcon,
      accentColor: "#10C85A",
      bullets: [
        t.showcase_bullet_wa_1 || "Automated Inquiry Reply",
        t.showcase_bullet_wa_2 || "Lead Capture System",
        t.showcase_bullet_wa_3 || "Campaign Broadcast Engine",
      ],
      actionLabel: t.showcase_btn_wa || "Get WhatsApp Automation",
      actionLink: "",
    },
    {
      id: "landing-page",
      badge: t.showcase_badge_main || "MAIN PRODUCT",
      title: t.showcase_card_lp_title || "Landing Page Design",
      description: t.showcase_card_lp_desc || "Fast and attractive mobile-friendly landing pages designed to get more customers for your business.",
      icon: WebValidationIcon,
      accentColor: "#1890FF",
      bullets: [
        t.showcase_bullet_lp_1 || "1 Custom Landing Page",
        t.showcase_bullet_lp_2 || "Custom Domain Connection",
        t.showcase_bullet_lp_3 || "Mobile & SEO Optimized",
      ],
      actionLabel: t.showcase_btn_lp || "View Landing Pages",
      actionLink: "/services#landing-pages",
    },
    {
      id: "google-business",
      badge: t.showcase_badge_growth || "GROWTH ADD-ON",
      title: t.showcase_card_gb_title || "Google Business Setup",
      description: t.showcase_card_gb_desc || "Bring your Google Maps profile to top rankings so local customers can easily discover you.",
      icon: MapsLocation01Icon,
      accentColor: "#FF4842",
      bullets: [
        t.showcase_bullet_gb_1 || "Google Maps Ranking",
        t.showcase_bullet_gb_2 || "Profile Optimization",
        t.showcase_bullet_gb_3 || "Customer Reviews Setup",
      ],
      actionLabel: t.showcase_btn_gb || "View Google Setup",
      actionLink: "/services#google-business",
    },
    {
      id: "income-tracker",
      badge: t.showcase_badge_growth || "GROWTH ADD-ON",
      title: t.showcase_card_ie_title || "Income & Expense Tracker",
      description: t.showcase_card_ie_desc || "Easily track your daily business income and expenses and know your exact profit and loss.",
      icon: MoneyBag01Icon,
      accentColor: "#FFC107",
      bullets: [
        t.showcase_bullet_ie_1 || "Daily Ledger Sheets",
        t.showcase_bullet_ie_2 || "Cash Flow Reports",
        t.showcase_bullet_ie_3 || "Profitability Analytics",
      ],
      actionLabel: t.showcase_btn_ie || "View Tracker Details",
      actionLink: "/services#income-expense",
    },
    {
      id: "product-catalog",
      badge: t.showcase_badge_growth || "GROWTH ADD-ON",
      title: t.showcase_card_pc_title || "Digital Product Catalog",
      description: t.showcase_card_pc_desc || "Showcase all your products and services on an attractive page where customers can enquire directly.",
      icon: ShoppingBag01Icon,
      accentColor: "#FF8F94",
      bullets: [
        t.showcase_bullet_pc_1 || "Unlimited Items Showcase",
        t.showcase_bullet_pc_2 || "Direct WhatsApp Orders",
        t.showcase_bullet_pc_3 || "Photo Gallery & Pricing",
      ],
      actionLabel: t.showcase_btn_pc || "View Catalog Details",
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
