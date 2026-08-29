"use client";

import React, { useState } from "react";
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
  StarIcon,
  CallIcon,
  CompassIcon,
  GlobalIcon,
  SentIcon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

interface InteractiveShowcaseProps {
  t: TranslationDictionary;
}

export default function InteractiveShowcase({ t }: InteractiveShowcaseProps) {
  const { openWhatsApp } = useWhatsApp();
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: t.showcase_filter_all || "All Products" },
    { id: "main", label: t.showcase_filter_main || "Core Products" },
    { id: "growth", label: t.showcase_filter_growth || "Growth Add-ons" },
  ];

  const services = [
    {
      id: "digital-card",
      label: "Digital Card",
      category: "MAIN PRODUCT",
      badge: "MOST POPULAR",
      type: "main",
      title: t.showcase_card_digital_title || "Smart Digital Business Cards & Profiles",
      description: t.showcase_card_digital_desc || "A modern, mobile-friendly digital profile page featuring your contact details, owner info, products gallery, location, and social links in one quick shareable link.",
      icon: SmartphoneNfcIcon,
      accentColor: "#7265E3",
      gradient: "from-[#6C5CE7] via-[#5B3DF5] to-[#4327D0]",
      bullets: [
        t.showcase_bullet_digital_1 || "1-Tap Save Contact & Instant WhatsApp Message",
        t.showcase_bullet_digital_2 || "Interactive Location Map & Business Directions",
        t.showcase_bullet_digital_3 || "Showcase Complete Product Gallery & Bio",
      ],
      actionLabel: t.showcase_btn_digital || "Get Digital Business Card",
      actionLink: "",
      isFeatured: true,
    },
    {
      id: "whatsapp-automation",
      label: "WhatsApp",
      category: "GROWTH ADD-ON",
      badge: "AUTOMATED BOT",
      type: "growth",
      title: t.service_wa_title || "WhatsApp Marketing & Auto-Reply",
      description: t.service_wa_lead || "Reach customers where they already spend hours a day. Send bulk promotions, festival offers, and order updates directly to WhatsApp with delivery and open rates far above SMS or email.",
      icon: WhatsappIcon,
      accentColor: "#10C85A",
      gradient: "from-[#10C85A] via-[#0EAD4E] to-[#0A8E3F]",
      bullets: [
        t.showcase_bullet_wa_1 || "Missed-Call Auto SMS & WhatsApp Greeting Bot",
        t.showcase_bullet_wa_2 || "Bulk Promotional & Festival Offer Broadcasts",
        t.showcase_bullet_wa_3 || "High Delivery Rates & Instant Customer Retention",
      ],
      actionLabel: t.showcase_btn_wa || "Get WhatsApp Automation",
      actionLink: "",
      isFeatured: false,
    },
    {
      id: "landing-page",
      label: "Landing Page",
      category: "MAIN PRODUCT",
      badge: "HIGH CONVERTING",
      type: "main",
      title: t.service_lp_title || "Custom Landing Page Design",
      description: t.service_lp_lead || "A beautiful, fast, single-purpose page built around one campaign goal — whether that's bookings, enquiries, or sign-ups. Mobile-first, lightweight, and built to convert.",
      icon: WebValidationIcon,
      accentColor: "#1890FF",
      gradient: "from-[#1890FF] via-[#096DD9] to-[#0050B3]",
      bullets: [
        t.showcase_bullet_lp_1 || "Single-Purpose Offer & Booking Pages",
        t.showcase_bullet_lp_2 || "Direct WhatsApp Ordering & Enquiry Integration",
        t.showcase_bullet_lp_3 || "Optimized for Instagram & Facebook Ad Campaigns",
      ],
      actionLabel: t.btn_see_all_services || "View Landing Pages",
      actionLink: "/services#landing-pages",
      isFeatured: false,
    },
    {
      id: "google-business",
      label: "Google Biz",
      category: "GROWTH ADD-ON",
      badge: "LOCAL SEO",
      type: "growth",
      title: t.service_gb_title || "Google Business Setup & Map SEO",
      description: t.service_gb_lead || "Get found by customers searching for your services in your local area. We optimize your Google Business profile to rank higher in local search maps.",
      icon: MapsLocation01Icon,
      accentColor: "#FF4842",
      gradient: "from-[#FF4842] via-[#E53935] to-[#C62828]",
      bullets: [
        t.showcase_bullet_gb_1 || "Google Map Listing Verification & Setup",
        t.showcase_bullet_gb_2 || "Local Search Keyword Ranking (Pune, Satara, MH)",
        t.showcase_bullet_gb_3 || "5-Star Customer Review Generation Strategy",
      ],
      actionLabel: t.btn_see_all_services || "View Google Setup",
      actionLink: "/services#google-business",
      isFeatured: false,
    },
    {
      id: "income-tracker",
      label: "Ledger",
      category: "GROWTH ADD-ON",
      badge: "CASH FLOW",
      type: "growth",
      title: t.service_ie_title || "Income & Expense Tracker",
      description: t.service_ie_lead || "Manage your daily business cash flows, sales receipts, and operating expenses with simple ledger sheets. Clear visual reports help you track your profitability directly inside the app.",
      icon: MoneyBag01Icon,
      accentColor: "#FFB000",
      gradient: "from-[#FFA000] via-[#F57C00] to-[#E65100]",
      bullets: [
        t.showcase_bullet_ie_1 || "Daily Cash Sales & Receipt Ledger Sheets",
        t.showcase_bullet_ie_2 || "Expense Tracking & Profitability Reports",
        t.showcase_bullet_ie_3 || "Designed specifically for local shop owners",
      ],
      actionLabel: t.btn_see_all_services || "View Tracker Details",
      actionLink: "/services#income-expense",
      isFeatured: false,
    },
    {
      id: "product-catalog",
      label: "Catalog",
      category: "GROWTH ADD-ON",
      badge: "DIGITAL STORE",
      type: "growth",
      title: t.service_pc_title || "Digital Product Catalog",
      description: t.service_pc_lead || "Showcase your complete collection of products and services on a premium, search-enabled web page. Let customers browse, view prices, and send enquiries directly to your WhatsApp.",
      icon: ShoppingBag01Icon,
      accentColor: "#FF8F94",
      gradient: "from-[#FF8F94] via-[#F55259] to-[#D32F2F]",
      bullets: [
        t.showcase_bullet_pc_1 || "Searchable Digital Catalog Showcase",
        t.showcase_bullet_pc_2 || "Clear Pricing & Item Details Display",
        t.showcase_bullet_pc_3 || "Direct 1-Tap WhatsApp Shopping Checkout",
      ],
      actionLabel: t.btn_see_all_services || "View Catalog Details",
      actionLink: "/services#catalog",
      isFeatured: false,
    },
  ];

  const filteredServices = services.filter((s) => {
    if (filterCategory === "main") return s.type === "main";
    if (filterCategory === "growth") return s.type === "growth";
    return true;
  });

  // Helper to render high-fidelity screen preview inside preview frames
  const renderScreenContent = (id: string) => {
    switch (id) {
      case "digital-card":
        return (
          <div className="w-full h-full relative bg-[#F8F9FD] select-none flex flex-col justify-between p-2.5 pt-6 text-left rounded-xl overflow-hidden">
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pb-1">
              <div className="bg-white rounded-xl p-2.5 shadow-sm space-y-1.5 border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-[#7265E3] text-white flex items-center justify-center text-[8px] font-extrabold">MS</div>
                  <div>
                    <div className="text-[8.5px] font-extrabold text-slate-800 leading-none">MarketingSetu Studio</div>
                    <div className="text-[6px] text-slate-400">Digital Identity Card</div>
                  </div>
                </div>
                <div className="h-1.5 w-20 bg-slate-100 rounded-sm" />
                <div className="h-8 w-full bg-[#F5F6FA] border border-slate-100 rounded p-1 space-y-0.5">
                  <div className="h-1.5 w-full bg-slate-200 rounded-sm" />
                  <div className="h-1.5 w-3/4 bg-slate-200 rounded-sm" />
                </div>
                <div className="flex gap-1 pt-1">
                  <div className="flex-1 h-4.5 bg-slate-100 rounded flex items-center justify-center text-[6px] font-bold text-slate-500">Reset</div>
                  <div className="flex-1 h-4.5 bg-[#5B3DF5] rounded flex items-center justify-center text-[6px] font-bold text-white">Submit</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[8px] font-bold text-slate-900 leading-tight">Our Location</div>
                <div className="h-20 w-full bg-[#E5F1EB] rounded-lg relative overflow-hidden flex items-center justify-center border border-slate-200">
                  <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:8px_8px]" />
                  <div className="z-10 bg-white px-2 py-0.5 rounded shadow-sm flex flex-col items-center">
                    <span className="text-[7px] font-extrabold text-slate-800">Pune, MH</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-t border-slate-100 p-1 flex gap-1 z-30 mt-1 rounded-b-lg">
              <div className="flex-1 h-5.5 bg-[#5B3DF5] rounded flex items-center justify-center gap-1 text-white font-bold text-[6px]">
                <HugeiconsIcon icon={WhatsappIcon} size={9} /> Message
              </div>
              <div className="flex-1 h-5.5 bg-slate-100 rounded flex items-center justify-center gap-1 text-[#5B3DF5] font-bold text-[6px]">
                <HugeiconsIcon icon={ShoppingBag01Icon} size={9} /> Call Now
              </div>
            </div>
          </div>
        );

      case "whatsapp-automation":
        return (
          <div className="w-full h-full relative bg-[#E5DDD5] select-none flex flex-col justify-between overflow-hidden text-left rounded-xl">
            <div className="bg-[#075E54] text-white p-2.5 pt-6 flex items-center gap-1.5 shadow-sm">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[7.5px] font-bold">MS</div>
              <div className="flex-1 leading-tight">
                <div className="text-[8px] font-bold">MarketingSetu Bot</div>
                <div className="text-[5px] text-[#A5D6A7]">online</div>
              </div>
            </div>

            <div className="flex-1 p-2.5 space-y-2 overflow-y-auto no-scrollbar">
              <div className="bg-white p-2 rounded-lg text-[6.5px] text-slate-800 max-w-[85%] shadow-sm leading-normal">
                Hello! I missed a call from your store.
              </div>
              <div className="bg-[#DCF8C6] p-2 rounded-lg text-[6.5px] text-slate-800 max-w-[85%] ml-auto shadow-sm leading-normal">
                Hi! 🤖 Welcome to MarketingSetu. Here is our digital catalog & offer page: <span className="text-blue-600 underline">marketingsetu.com/offers</span>
              </div>
            </div>

            <div className="bg-white p-1.5 border-t border-slate-100 flex gap-1 items-center">
              <div className="flex-1 h-5 bg-[#F0F2F5] rounded-full px-2.5 text-[5.5px] text-slate-400 flex items-center">
                Type message...
              </div>
              <div className="w-5 h-5 bg-[#075E54] rounded-full flex items-center justify-center text-white">
                <HugeiconsIcon icon={SentIcon} size={7} />
              </div>
            </div>
          </div>
        );

      case "landing-page":
        return (
          <div className="w-full h-full relative bg-white select-none flex flex-col overflow-hidden text-center justify-between p-2.5 pt-6 rounded-xl">
            <div className="space-y-2.5">
              <div className="w-full h-24 bg-gradient-to-tr from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center text-[#1890FF]">
                <HugeiconsIcon icon={WebValidationIcon} size={32} />
              </div>
              <div className="space-y-1 px-1">
                <div className="text-[10px] font-extrabold text-slate-900">Artisan Bakery Landing</div>
                <div className="text-[6.5px] text-slate-500">Fresh pastries delivered directly to your door in Pune.</div>
              </div>
            </div>

            <div className="bg-[#F8F9FA] border border-slate-100 rounded-lg p-2 space-y-1 mb-1">
              <div className="h-5 bg-[#1890FF] rounded flex items-center justify-center text-[6px] font-bold text-white shadow-sm">
                Enquire on WhatsApp
              </div>
            </div>
          </div>
        );

      case "google-business":
        return (
          <div className="w-full h-full bg-[#F1F3F4] select-none flex flex-col overflow-hidden text-left p-2.5 pt-6 rounded-xl">
            <div className="bg-white border border-slate-100 rounded-full h-5 px-2.5 py-0.5 flex items-center gap-1 shadow-sm mb-2">
              <span className="text-[7px] font-black text-blue-500">G</span>
              <div className="text-[5.5px] text-slate-400 flex-1">marketing setu satara reviews</div>
            </div>

            <div className="bg-white rounded-lg p-2.5 shadow-sm border border-slate-100 space-y-1.5">
              <div className="text-[9px] font-bold text-slate-900">MarketingSetu Studio</div>
              <div className="flex items-center gap-0.5">
                <span className="text-[6.5px] font-bold text-[#F5A623]">5.0</span>
                <div className="flex text-[#F5A623]">
                  {[...Array(5)].map((_, idx) => (
                    <HugeiconsIcon key={idx} icon={StarIcon} size={6} />
                  ))}
                </div>
                <span className="text-[5.5px] text-slate-400">(42 reviews)</span>
              </div>
              <div className="text-[5.5px] text-slate-500">Marketing Agency in Pune & Satara</div>

              <div className="flex gap-1.5 pt-1.5 border-t border-slate-100">
                <div className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-4.5 h-4.5 bg-[#E8F0FE] text-[#1A73E8] rounded-full flex items-center justify-center">
                    <HugeiconsIcon icon={CallIcon} size={6} />
                  </div>
                  <span className="text-[4.5px] text-slate-500">Call</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-4.5 h-4.5 bg-[#E8F0FE] text-[#1A73E8] rounded-full flex items-center justify-center">
                    <HugeiconsIcon icon={CompassIcon} size={6} />
                  </div>
                  <span className="text-[4.5px] text-slate-500">Directions</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-4.5 h-4.5 bg-[#E8F0FE] text-[#1A73E8] rounded-full flex items-center justify-center">
                    <HugeiconsIcon icon={GlobalIcon} size={6} />
                  </div>
                  <span className="text-[4.5px] text-slate-500">Website</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "income-tracker":
        return (
          <div className="w-full h-full bg-[#FAFBFD] select-none flex flex-col overflow-hidden text-left p-2.5 pt-6 rounded-xl">
            <div className="text-[9px] font-bold text-slate-900 mb-2">Daily Business Cash Ledger</div>

            <div className="flex gap-1.5 mb-2">
              <div className="bg-emerald-50 border border-emerald-500/20 rounded-lg p-1.5 flex-1 text-center">
                <div className="text-[4.5px] text-emerald-600 font-bold uppercase">Cash In</div>
                <div className="text-[7.5px] text-emerald-700 font-extrabold mt-0.5">₹42,800</div>
              </div>
              <div className="bg-red-50 border border-red-500/20 rounded-lg p-1.5 flex-1 text-center">
                <div className="text-[4.5px] text-red-600 font-bold uppercase">Cash Out</div>
                <div className="text-[7.5px] text-red-700 font-extrabold mt-0.5">₹11,500</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-2 border border-slate-100 space-y-1 flex-1">
              <div className="text-[5.5px] text-slate-400 font-bold uppercase mb-0.5">Recent Transactions</div>
              <div className="flex justify-between items-center text-[6px] border-b border-slate-100 pb-0.5">
                <div className="text-slate-800">Card Payment #221</div>
                <div className="text-emerald-600 font-bold">+₹1,500</div>
              </div>
              <div className="flex justify-between items-center text-[6px] border-b border-slate-100 pb-0.5">
                <div className="text-slate-800">Internet & Domain</div>
                <div className="text-red-600 font-bold">-₹600</div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-[#FAFBFD] select-none flex flex-col justify-center items-center text-center p-3 pt-6 text-primary space-y-2 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-[#EFEBFF] text-[#4A3DAB] flex items-center justify-center shadow-sm">
              <HugeiconsIcon icon={ShoppingBag01Icon} size={20} />
            </div>
            <div className="space-y-1">
              <div className="text-[9px] font-bold text-primary">MarketingSetu Catalog</div>
              <div className="text-[6px] text-secondary">Search-enabled product catalog showcase for WhatsApp checkout.</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative select-none max-w-7xl mx-auto px-4">
      {/* Background Accent Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-main/5 dark:bg-brand-main/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* CATEGORY FILTER TAB CHIPS */}
      <div className="flex justify-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-paper border border-outline shadow-sm">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all duration-300 cursor-pointer ${
                filterCategory === tab.id
                  ? "bg-brand-main text-white shadow-md scale-105"
                  : "text-secondary hover:text-primary hover:bg-neutral"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ALL-VISIBLE HOSTINGER-STYLE FEATURE CARDS SHOWCASE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {filteredServices.map((service) => {
          if (service.isFeatured) {
            {/* FEATURED MAIN HERO CARD (Takes 2 Columns on Desktop) */}
            return (
              <div
                key={service.id}
                className={`md:col-span-2 lg:col-span-2 rounded-[32px] p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-white/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-z24 bg-gradient-to-br ${service.gradient} text-white group`}
              >
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/15 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center z-10">
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider text-white bg-white/20 backdrop-blur-md uppercase border border-white/20">
                        {service.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider text-amber-950 bg-amber-300 uppercase shadow-sm flex items-center gap-1">
                        <HugeiconsIcon icon={SparklesIcon} size={11} /> {service.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                      {service.title}
                    </h3>

                    <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-w-xl">
                      {service.description}
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-2 pt-1">
                      {service.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-white/90">
                          <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} className="text-amber-300 flex-shrink-0" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3">
                      <button
                        onClick={() => openWhatsApp()}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-extrabold text-[#0F0826] bg-white hover:bg-slate-100 shadow-xl hover:scale-105 transition-all cursor-pointer"
                      >
                        <span>{service.actionLabel}</span>
                        <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Right Graphic Preview Container */}
                  <div className="md:col-span-5 h-64 sm:h-72 bg-white rounded-2xl p-1.5 shadow-2xl border border-white/40 overflow-hidden">
                    {renderScreenContent(service.id)}
                  </div>
                </div>
              </div>
            );
          }

          {/* SECONDARY SHOWCASE CARD TILES */}
          return (
            <div
              key={service.id}
              className="rounded-[32px] p-6 sm:p-7 bg-paper border border-outline hover:border-brand-main/50 shadow-card hover:shadow-z24 hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundColor: service.accentColor }}
                  >
                    <HugeiconsIcon icon={service.icon} size={22} />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold text-secondary bg-neutral uppercase tracking-wider border border-outline/50">
                    {service.badge}
                  </span>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-brand-main uppercase tracking-wider mb-1">
                    {service.category}
                  </div>
                  <h3 className="text-xl font-extrabold text-primary leading-tight">
                    {service.title}
                  </h3>
                </div>

                <p className="text-secondary text-xs leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                {/* Feature Checkmarks */}
                <div className="space-y-1.5 pt-1">
                  {service.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] font-semibold text-primary/85">
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} className="text-emerald-500 flex-shrink-0" />
                      <span className="truncate">{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Mini Preview Screen */}
                <div className="w-full h-44 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-1 border border-outline/40 overflow-hidden">
                  {renderScreenContent(service.id)}
                </div>
              </div>

              {/* Card Action CTA */}
              <div className="pt-5 border-t border-outline/40 mt-4">
                {service.actionLink ? (
                  <Link
                    href={service.actionLink}
                    className="w-full inline-flex items-center justify-between text-xs font-extrabold text-brand-main hover:text-brand-hover transition-colors"
                  >
                    <span>{service.actionLabel}</span>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <button
                    onClick={() => openWhatsApp()}
                    className="w-full inline-flex items-center justify-between text-xs font-extrabold text-brand-main hover:text-brand-hover transition-colors cursor-pointer"
                  >
                    <span>{service.actionLabel}</span>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
