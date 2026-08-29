"use client";

import React, { useState, useEffect, useRef } from "react";
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
  ArrowRight01Icon,
  SparklesIcon,
  UserIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

interface InteractiveShowcaseProps {
  t: TranslationDictionary;
}

export default function InteractiveShowcase({ t }: InteractiveShowcaseProps) {
  const { openWhatsApp } = useWhatsApp();
  const [activeTab, setActiveTab] = useState<string>("digital-card");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      id: "digital-card",
      label: "Digital Card",
      shortName: "Card",
      category: "CORE DIGITAL IDENTITY",
      title: "Smart Digital Business Card",
      description:
        "A modern, mobile-friendly digital identity with your brand logo, tap-to-call, WhatsApp chat, products catalog, owner profiles, and Google Map directions in one quick link.",
      icon: SmartphoneNfcIcon,
      accentColor: "#6C4BFF",
      heightClass: "h-[90%]",
      promptUser: "Create a digital business card for my retail store with product showcase & WhatsApp leads.",
      responseAgent: {
        heading: "Sure thing, here is your generated Digital Card:",
        points: [
          "12 Featured products with price & enquire button",
          "1-Tap WhatsApp chat & tap-to-call buttons",
          "Google Maps store location & directions",
          "Instant QR Code generator for counter stands",
        ],
      },
      badges: ["1-Tap WhatsApp", "Product Catalog", "QR Code", "Google Maps"],
      actionLabel: "Get Your Digital Card",
      actionType: "whatsapp",
      actionLink: "",
    },
    {
      id: "whatsapp-marketing",
      label: "WhatsApp",
      shortName: "WhatsApp",
      category: "AUTOMATION & GROWTH",
      title: t.service_wa_title || "WhatsApp Marketing & Auto-Replies",
      description:
        t.service_wa_lead ||
        "Reach customers where they already spend hours a day. Send bulk promotions, festival greetings, and automate instant replies to customer calls and enquiries.",
      icon: WhatsappIcon,
      accentColor: "#10C85A",
      heightClass: "h-[75%]",
      promptUser: "Send a promotional WhatsApp greeting to all 450 customers for our upcoming festive sale.",
      responseAgent: {
        heading: "Campaign ready for instant dispatch:",
        points: [
          "450 Personalized customer greeting messages",
          "Interactive flyer image + special discount code",
          "24/7 Smart auto-replies to incoming customer replies",
          "Real-time delivery & response tracking",
        ],
      },
      badges: ["24/7 Auto-Reply", "Bulk Broadcasts", "98% Open Rate", "Lead Capture"],
      actionLabel: "Automate WhatsApp",
      actionType: "whatsapp",
      actionLink: "",
    },
    {
      id: "landing-page",
      label: "Landing Page",
      shortName: "Landing Page",
      category: "CONVERSION ENGINE",
      title: t.service_lp_title || "Custom High-Converting Landing Page",
      description:
        t.service_lp_lead ||
        "A beautiful, blazing fast, single-purpose page built around one campaign goal — whether that's bookings, enquiries, or sign-ups. Mobile-first and built to convert.",
      icon: WebValidationIcon,
      accentColor: "#1890FF",
      heightClass: "h-[85%]",
      promptUser: "Build a high-conversion landing page for my clinic appointment bookings.",
      responseAgent: {
        heading: "High-converting page generated:",
        points: [
          "99+ Mobile PageSpeed score & SSL security",
          "Direct appointment booking form with instant SMS",
          "Patient reviews & doctor qualification highlights",
          "Custom SEO meta tags for local search discovery",
        ],
      },
      badges: ["Blazing Fast", "SEO Ready", "Conversion Focused", "Custom Domain"],
      actionLabel: "View Landing Pages",
      actionType: "link",
      actionLink: "/services#landing-pages",
    },
    {
      id: "google-business",
      label: "Google Biz",
      shortName: "Google Biz",
      category: "LOCAL DISCOVERY",
      title: t.service_gb_title || "Google Business & Local Map SEO",
      description:
        t.service_gb_lead ||
        "Get found by customers searching for your services in your local area. We optimize your Google Business profile to rank higher in local search maps.",
      icon: MapsLocation01Icon,
      accentColor: "#FF4842",
      heightClass: "h-[70%]",
      promptUser: "Optimize my Google Business profile to rank in the Top 3 for 'Catering near me'.",
      responseAgent: {
        heading: "Local SEO optimization applied:",
        points: [
          "Optimized service keywords & local category tags",
          "1-Tap Google review collection link with QR code",
          "Verified business profile & high-res photo gallery",
          "3.8x Increase in local Google Map direction clicks",
        ],
      },
      badges: ["Google Maps #1", "Review System", "Local SEO", "High Visibility"],
      actionLabel: "View Google Setup",
      actionType: "link",
      actionLink: "/services#google-business",
    },
    {
      id: "income-tracker",
      label: "Ledger",
      shortName: "Ledger",
      category: "BUSINESS MANAGEMENT",
      title: t.service_ie_title || "Daily Income & Expense Ledger",
      description:
        t.service_ie_lead ||
        "Manage your daily business cash flows, sales receipts, and operating expenses with simple ledger sheets. Clear visual reports help you track profitability.",
      icon: MoneyBag01Icon,
      accentColor: "#FFC107",
      heightClass: "h-[80%]",
      promptUser: "Show my business profit breakdown and expense report for this month.",
      responseAgent: {
        heading: "Monthly financial summary compiled:",
        points: [
          "Total Income: ₹1,42,000 across 86 customer orders",
          "Total Expenses: ₹48,500 (Operations & Supplies)",
          "Net Profit: +₹93,500 (+28% growth vs last month)",
          "1-Click PDF export for accountant & tax filing",
        ],
      },
      badges: ["Cash Flow", "Daily Sales", "Profit Analytics", "Easy Tax Report"],
      actionLabel: "View Tracker Details",
      actionType: "link",
      actionLink: "/services#income-expense",
    },
  ];

  const activeService = services.find((s) => s.id === activeTab) || services[0];

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = services.findIndex((s) => s.id === prev);
        const nextIndex = (currentIndex + 1) % services.length;
        return services[nextIndex].id;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, services]);

  const handleAction = (service: typeof services[0]) => {
    if (service.actionType === "whatsapp" || !service.actionLink) {
      openWhatsApp(`Hi! I'm interested in the ${service.title}. Please provide more details.`);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full rounded-3xl bg-gradient-to-b from-[#1E1145] via-[#140A32] to-[#0A041D] border border-white/10 p-5 sm:p-7 lg:p-9 shadow-2xl overflow-hidden select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#7265E3]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#10C85A]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#5B3DF5]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* MOBILE / SMALL TABLET NAVIGATOR (Horizontal swipe pills) */}
      <div className="flex md:hidden overflow-x-auto gap-2 pb-4 no-scrollbar mb-6 border-b border-white/10 relative z-10">
        {services.map((service) => {
          const isSelected = activeTab === service.id;
          return (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-r from-[#6C4BFF] to-[#5B3DF5] text-white border-white/30 shadow-lg shadow-indigo-950/50"
                  : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              <HugeiconsIcon icon={service.icon} size={15} />
              <span>{service.label}</span>
            </button>
          );
        })}
      </div>

      {/* DESKTOP HOSTINGER-STYLE EXPANDING ACCORDION ROW */}
      <div className="hidden md:flex flex-row items-end gap-3 lg:gap-4 h-[490px] lg:h-[520px] relative z-10">
        {services.map((service) => {
          const isSelected = activeTab === service.id;

          if (isSelected) {
            // EXPANDED ACTIVE CARD (Hostinger style rich gradient canvas)
            return (
              <div
                key={service.id}
                className="flex-[4] lg:flex-[4.5] h-full rounded-2xl bg-gradient-to-br from-[#6C4BFF] via-[#5B3DF5] to-[#4325E0] p-6 lg:p-8 flex flex-col justify-between shadow-2xl shadow-indigo-950/70 border border-white/20 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] relative overflow-hidden"
              >
                {/* Subtle card glow overlay */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Section: Category, Title & Description */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] lg:text-xs font-bold uppercase tracking-wider text-white/75 bg-white/15 px-3 py-1 rounded-full border border-white/20">
                      {service.category}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-white border border-white/20 shadow-sm">
                      <HugeiconsIcon icon={service.icon} size={20} />
                    </div>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-white/80 text-xs lg:text-sm leading-relaxed mt-2.5 max-w-2xl">
                    {service.description}
                  </p>
                </div>

                {/* Middle Section: Hostinger-style Interactive Dialog/Chat Mockup */}
                <div className="my-4 space-y-3 relative z-10">
                  {/* User Request Bubble */}
                  <div className="flex items-start gap-2.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 shadow-sm max-w-xl transition-all duration-300 hover:bg-white/20">
                    <div className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                      <HugeiconsIcon icon={UserIcon} size={14} />
                    </div>
                    <p className="text-xs lg:text-sm text-white font-medium leading-relaxed">
                      {service.promptUser}
                    </p>
                  </div>

                  {/* System Response Bubble */}
                  <div className="flex items-start gap-2.5 bg-[#170E3D]/80 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 shadow-md max-w-xl">
                    <div className="w-7 h-7 rounded-full bg-[#5B3DF5] flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm">
                      <HugeiconsIcon icon={SparklesIcon} size={14} />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <p className="text-xs font-semibold text-white/90">
                        {service.responseAgent.heading}
                      </p>
                      <ul className="space-y-1">
                        {service.responseAgent.points.map((pt, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-[11px] lg:text-xs text-white/80">
                            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13} className="text-[#10C85A] flex-shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Badges & Action CTA */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/15 relative z-10">
                  <div className="flex flex-wrap gap-1.5">
                    {service.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="text-[10.5px] font-semibold text-white/85 bg-white/10 px-2.5 py-0.5 rounded-md border border-white/15"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {service.actionType === "link" && service.actionLink ? (
                    <Link
                      href={service.actionLink}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#4325E0] text-xs font-bold shadow-lg hover:bg-white/90 transition-all cursor-pointer"
                    >
                      <span>{service.actionLabel}</span>
                      <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleAction(service)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#4325E0] text-xs font-bold shadow-lg hover:bg-white/90 transition-all cursor-pointer border-0"
                    >
                      <span>{service.actionLabel}</span>
                      <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          }

          // COLLAPSED INACTIVE CARD (Hostinger style vertical pill card)
          return (
            <div
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              onMouseEnter={() => setActiveTab(service.id)}
              className={`flex-1 ${service.heightClass} rounded-2xl bg-[#1B1042]/90 hover:bg-[#26175C] border border-white/10 hover:border-[#7265E3]/50 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer flex flex-col items-center justify-between p-4 group relative overflow-hidden`}
            >
              {/* Top Title Pill */}
              <div className="w-full text-center pt-2">
                <span className="text-sm lg:text-base font-bold text-white group-hover:text-[#A59DEE] transition-colors tracking-wide block truncate">
                  {service.shortName}
                </span>
              </div>

              {/* Center subtle glow icon */}
              <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#5B3DF5]/30 group-hover:scale-110 flex items-center justify-center text-white/60 group-hover:text-white transition-all duration-300 border border-white/5 group-hover:border-white/20">
                <HugeiconsIcon icon={service.icon} size={20} />
              </div>

              {/* Bottom indicator */}
              <div className="w-6 h-1 rounded-full bg-white/10 group-hover:bg-[#6C4BFF] transition-all duration-300" />
            </div>
          );
        })}
      </div>

      {/* MOBILE EXPANDED CARD VIEW (< 768px) */}
      <div className="block md:hidden">
        <div className="rounded-2xl bg-gradient-to-br from-[#6C4BFF] via-[#5B3DF5] to-[#4325E0] p-5 flex flex-col justify-between shadow-xl border border-white/20">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/75 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
                {activeService.category}
              </span>
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-white">
                <HugeiconsIcon icon={activeService.icon} size={18} />
              </div>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              {activeService.title}
            </h3>

            <p className="text-white/80 text-xs leading-relaxed mt-2">
              {activeService.description}
            </p>

            {/* Mobile Prompts */}
            <div className="my-4 space-y-2.5">
              <div className="flex items-start gap-2 bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/20">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                  <HugeiconsIcon icon={UserIcon} size={12} />
                </div>
                <p className="text-xs text-white font-medium leading-relaxed">
                  {activeService.promptUser}
                </p>
              </div>

              <div className="flex items-start gap-2 bg-[#170E3D]/80 backdrop-blur-md rounded-xl p-3 border border-white/15">
                <div className="w-6 h-6 rounded-full bg-[#5B3DF5] flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                  <HugeiconsIcon icon={SparklesIcon} size={12} />
                </div>
                <div className="space-y-1 flex-1">
                  <p className="text-[11px] font-semibold text-white/90">
                    {activeService.responseAgent.heading}
                  </p>
                  <ul className="space-y-0.5">
                    {activeService.responseAgent.points.map((pt, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[10.5px] text-white/80">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={12} className="text-[#10C85A] flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1">
              {activeService.badges.slice(0, 2).map((badge, idx) => (
                <span
                  key={idx}
                  className="text-[9.5px] font-semibold text-white/85 bg-white/10 px-2 py-0.5 rounded border border-white/15"
                >
                  {badge}
                </span>
              ))}
            </div>

            {activeService.actionType === "link" && activeService.actionLink ? (
              <Link
                href={activeService.actionLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#4325E0] text-[11px] font-bold shadow-md"
              >
                <span>{activeService.actionLabel}</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
              </Link>
            ) : (
              <button
                onClick={() => handleAction(activeService)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#4325E0] text-[11px] font-bold shadow-md border-0"
              >
                <span>{activeService.actionLabel}</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
