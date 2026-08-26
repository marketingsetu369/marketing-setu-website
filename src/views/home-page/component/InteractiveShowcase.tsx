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
  GridIcon,
  StarIcon,
  CallIcon,
  CompassIcon,
  GlobalIcon,
  SentIcon,
} from "@hugeicons/core-free-icons";

interface InteractiveShowcaseProps {
  t: TranslationDictionary;
}

export default function InteractiveShowcase({ t }: InteractiveShowcaseProps) {
  const { openWhatsApp } = useWhatsApp();
  const [activeTab, setActiveTab] = useState<string>("digital-card");

  const services = [
    {
      id: "digital-card",
      label: "Digital Card",
      category: "MAIN PRODUCT",
      title: "Smart Digital Business Card",
      description: "A modern, mobile-friendly digital business card page featuring your contact details, owner profiles, products/services gallery, bio, location, and social links in one quick shareable link.",
      icon: SmartphoneNfcIcon,
      accentColor: "#7265E3",
      actionLabel: "Get Your Digital Business Card",
      actionLink: "",
    },
    {
      id: "whatsapp-automation",
      label: "WhatsApp",
      category: "GROWTH ADD-ON",
      title: t.service_wa_title || "WhatsApp Marketing",
      description: t.service_wa_lead || "Reach customers where they already spend hours a day. Send bulk promotions, festival offers, and order updates directly to WhatsApp with high delivery and open rates.",
      icon: WhatsappIcon,
      accentColor: "#10C85A",
      actionLabel: "Get WhatsApp Automation",
      actionLink: "",
    },
    {
      id: "landing-page",
      label: "Landing Page",
      category: "MAIN PRODUCT",
      title: t.service_lp_title || "Landing Page Design",
      description: t.service_lp_lead || "A beautiful, fast, single-purpose page built around one campaign goal — whether that's bookings, enquiries, or sign-ups. Mobile-first and built to convert.",
      icon: WebValidationIcon,
      accentColor: "#1890FF",
      actionLabel: "View Landing Pages",
      actionLink: "/services#landing-pages",
    },
    {
      id: "google-business",
      label: "Google Biz",
      category: "GROWTH ADD-ON",
      title: t.service_gb_title || "Google Business Setup",
      description: t.service_gb_lead || "Get found by customers searching for your services in your local area. We optimize your Google Business profile to rank higher in local search maps.",
      icon: MapsLocation01Icon,
      accentColor: "#FF4842",
      actionLabel: "View Google Setup",
      actionLink: "/services#google-business",
    },
    {
      id: "income-tracker",
      label: "Ledger",
      category: "GROWTH ADD-ON",
      title: t.service_ie_title || "Income & Expense Tracker",
      description: t.service_ie_lead || "Manage your daily business cash flows, sales receipts, and operating expenses with simple ledger sheets. Clear visual reports help you track profitability.",
      icon: MoneyBag01Icon,
      accentColor: "#FFC107",
      actionLabel: "View Tracker Details",
      actionLink: "/services#income-expense",
    },
    {
      id: "product-catalog",
      label: "Catalog",
      category: "GROWTH ADD-ON",
      title: t.service_pc_title || "Digital Product Catalog",
      description: t.service_pc_lead || "Showcase your complete collection of products and services on a premium, search-enabled web page. Let customers browse, view prices, and send enquiries.",
      icon: ShoppingBag01Icon,
      accentColor: "#FF8F94",
      actionLabel: "View Catalog Details",
      actionLink: "/services#catalog",
    },
    {
      id: "more-services",
      label: "See All",
      category: "EXPLORE MORE",
      title: "All MarketingSetu Services",
      description: "Explore our full suite of local business growth solutions, custom tools, and automated campaign engines designed for Bharat's shops and agencies.",
      icon: GridIcon,
      accentColor: "#4A3DAB",
      actionLabel: "See All Services",
      actionLink: "/services",
    },
  ];

  const activeService = services.find((s) => s.id === activeTab) || services[0];

  // Helper to render static square card
  const renderSquareCard = (service: typeof services[0]) => {
    const isSelected = activeTab === service.id;
    return (
      <button
        key={service.id}
        onClick={() => setActiveTab(service.id)}
        onMouseEnter={() => setActiveTab(service.id)}
        className={`group flex flex-col items-center justify-center bg-transparent border-0 shadow-none text-center w-24 h-24 cursor-pointer relative z-10 transition-all duration-300 ${
          isSelected ? "scale-105" : "hover:scale-105"
        }`}
      >
        <div 
          className={`w-14 h-14 rounded-[18px] flex items-center justify-center text-white mb-2 transition-all duration-300 select-none ${
            isSelected 
              ? "scale-110 ring-4 ring-offset-2 ring-offset-background" 
              : "group-hover:scale-115"
          }`}
          style={{ 
            backgroundColor: service.accentColor,
            boxShadow: `0 10px 20px -6px ${service.accentColor}88`,
            outlineColor: isSelected ? service.accentColor : 'transparent'
          }}
        >
          <HugeiconsIcon icon={service.icon} size={26} />
        </div>
        <span className={`block text-[10.5px] font-semibold transition-colors truncate max-w-full px-0.5 ${
          isSelected ? "text-primary font-bold" : "text-secondary group-hover:text-primary"
        }`}>
          {service.label}
        </span>
      </button>
    );
  };

  // Helper to render dynamic screens inside the smartphone mockup depending on the active tab
  const renderPhoneScreenContent = () => {
    switch (activeTab) {
      case "digital-card":
        return (
          <div className="w-full h-full relative bg-[#F8F9FD] select-none flex flex-col justify-between p-2 pt-8 text-left">
            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pb-1">
              {/* Form Block Card */}
              <div className="bg-white rounded-lg p-1.5 shadow-sm space-y-1">
                <div className="h-1.5 w-12 bg-gray-100 rounded-sm" />
                <div className="h-3.5 w-full bg-[#F5F6FA] border border-gray-100 rounded-sm" />
                <div className="h-1.5 w-10 bg-gray-100 rounded-sm mt-1" />
                <div className="h-10 w-full bg-[#F5F6FA] border border-gray-100 rounded-sm" />
                
                {/* Reset & Submit Buttons */}
                <div className="flex gap-1 pt-1">
                  <div className="flex-1 h-4 bg-gray-50 border border-gray-100 rounded flex items-center justify-center text-[5px] font-bold text-gray-500">
                    Reset
                  </div>
                  <div className="flex-1 h-4 bg-[#4A3DAB] rounded flex items-center justify-center text-[5px] font-bold text-white">
                    Submit
                  </div>
                </div>
              </div>

              {/* Our Location Section */}
              <div className="space-y-1">
                <div className="text-[7.5px] font-bold text-gray-900 leading-tight">Our Location</div>
                <div className="text-[5px] text-gray-400 leading-none">Pune, Maharashtra — Find us on map</div>
                
                {/* Simulated Map Container */}
                <div className="h-28 w-full bg-[#E5F1EB] rounded-lg relative overflow-hidden flex items-center justify-center border border-gray-100">
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px]" />
                  <div className="w-12 h-12 rounded-full border border-dashed border-red-500/50 bg-red-500/5 absolute" />
                  <div className="z-10 bg-white/95 px-1.5 py-0.5 rounded shadow-sm flex flex-col items-center">
                    <span className="text-[6.5px] font-extrabold text-gray-800 leading-none">Pune</span>
                    <span className="text-[4.5px] text-gray-500 font-bold leading-none mt-0.5">पुणे</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Action Footer Bar */}
            <div className="bg-white/95 border-t border-gray-100 p-1 flex gap-1 z-30 mt-1">
              <div className="w-5 h-5 bg-[#0F172A] rounded flex items-center justify-center text-white">
                <HugeiconsIcon icon={SmartphoneNfcIcon} size={10} />
              </div>
              <div className="flex-1 h-5 bg-[#4A3DAB] rounded flex items-center justify-center gap-0.5 text-white font-bold text-[5.5px]">
                <HugeiconsIcon icon={WhatsappIcon} size={8} /> Message
              </div>
              <div className="flex-1 h-5 bg-[#EEF2F6] border border-slate-100 rounded flex items-center justify-center gap-0.5 text-[#4A3DAB] font-bold text-[5.5px]">
                <HugeiconsIcon icon={ShoppingBag01Icon} size={8} /> Call Now
              </div>
            </div>
          </div>
        );

      case "whatsapp-automation":
        return (
          <div className="w-full h-full relative bg-[#E5DDD5] select-none flex flex-col justify-between overflow-hidden text-left p-0">
            {/* WhatsApp Green Top Header */}
            <div className="bg-[#075E54] text-white p-1.5 pt-8 flex items-center gap-1.5 shadow-sm">
              <div className="w-4.5 h-4.5 bg-white/20 rounded-full flex items-center justify-center text-[7px] font-bold">MS</div>
              <div className="flex-1 leading-tight">
                <div className="text-[7.5px] font-bold">MarketingSetu Bot</div>
                <div className="text-[4.5px] text-[#A5D6A7]">online</div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-2 space-y-2.5 overflow-y-auto no-scrollbar">
              <div className="bg-white p-1.5 rounded-lg text-[6px] text-gray-800 max-w-[85%] shadow-sm leading-normal">
                Hello, I want to create a landing page for my store.
              </div>
              <div className="bg-[#DCF8C6] p-1.5 rounded-lg text-[6px] text-gray-800 max-w-[85%] ml-auto shadow-sm leading-normal">
                Hi! Welcome to MarketingSetu. 🤖 Here is your link to start onboarding: <span className="text-blue-600 underline">marketingsetu.com/start</span>
              </div>
            </div>

            {/* Bottom Type Bar */}
            <div className="bg-white p-1.5 border-t border-slate-100 flex gap-1 items-center mb-1">
              <div className="flex-1 h-4.5 bg-[#F0F2F5] rounded-full px-2 py-0.5 text-[5px] text-gray-400 flex items-center">
                Type message...
              </div>
              <div className="w-4.5 h-4.5 bg-[#075E54] rounded-full flex items-center justify-center text-white">
                <HugeiconsIcon icon={SentIcon} size={6} />
              </div>
            </div>
          </div>
        );

      case "landing-page":
        return (
          <div className="w-full h-full relative bg-white select-none flex flex-col overflow-hidden text-center justify-between p-2 pt-8">
            <div className="space-y-3">
              {/* Image Banner */}
              <div className="w-full h-24 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center text-[#1890FF]">
                <HugeiconsIcon icon={WebValidationIcon} size={32} />
              </div>
              {/* Landing Page Content */}
              <div className="space-y-1 px-1">
                <div className="text-[9px] font-extrabold text-gray-900 leading-tight">Artisan Cakes Stg.</div>
                <div className="text-[6px] text-gray-500 leading-normal">Delicious fresh pastries delivered to your door in Pune. Order now!</div>
              </div>
            </div>

            {/* Call To Action Book/Enquire Card */}
            <div className="bg-[#F8F9FA] border border-gray-100 rounded-lg p-2 space-y-1.5 mb-2">
              <div className="h-2 w-16 bg-gray-200 rounded-sm mx-auto" />
              <div className="h-5 bg-[#1890FF] rounded flex items-center justify-center text-[5.5px] font-bold text-white shadow-sm">
                Enquire on WhatsApp
              </div>
            </div>
          </div>
        );

      case "google-business":
        return (
          <div className="w-full h-full bg-[#F1F3F4] select-none flex flex-col overflow-hidden text-left p-2 pt-8">
            {/* Google Search Bar Mock */}
            <div className="bg-white border border-slate-100 rounded-full h-4.5 px-2 py-0.5 flex items-center gap-1.5 shadow-sm mb-3">
              <span className="text-[6px] font-black text-blue-500 leading-none">G</span>
              <div className="text-[5px] text-gray-400 flex-1">marketing setu reviews</div>
            </div>

            {/* Google Map Listing Card */}
            <div className="bg-white rounded-lg p-2 shadow-sm border border-slate-100 space-y-2">
              <div className="text-[8.5px] font-bold text-gray-900 leading-tight">MarketingSetu Ltd</div>
              
              {/* Stars Review Row */}
              <div className="flex items-center gap-0.5">
                <span className="text-[6px] font-bold text-[#F5A623] leading-none">5.0</span>
                <div className="flex text-[#F5A623]">
                  {[...Array(5)].map((_, idx) => (
                    <HugeiconsIcon key={idx} icon={StarIcon} size={5} />
                  ))}
                </div>
                <span className="text-[5px] text-gray-400 leading-none">(42 reviews)</span>
              </div>

              <div className="text-[5px] text-gray-500">Corporate Office in Pune, Maharashtra</div>

              {/* Action Buttons Row */}
              <div className="flex gap-2 pt-1.5 border-t border-gray-100">
                <div className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-4.5 h-4.5 bg-[#E8F0FE] text-[#1A73E8] rounded-full flex items-center justify-center">
                    <HugeiconsIcon icon={CallIcon} size={6} />
                  </div>
                  <span className="text-[4.5px] text-gray-500">Call</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-4.5 h-4.5 bg-[#E8F0FE] text-[#1A73E8] rounded-full flex items-center justify-center">
                    <HugeiconsIcon icon={CompassIcon} size={6} />
                  </div>
                  <span className="text-[4.5px] text-gray-500">Directions</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-4.5 h-4.5 bg-[#E8F0FE] text-[#1A73E8] rounded-full flex items-center justify-center">
                    <HugeiconsIcon icon={GlobalIcon} size={6} />
                  </div>
                  <span className="text-[4.5px] text-gray-500">Website</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "income-tracker":
        return (
          <div className="w-full h-full bg-[#FAFBFD] select-none flex flex-col overflow-hidden text-left p-2 pt-8">
            <div className="text-[8.5px] font-bold text-gray-900 leading-tight mb-2.5">Daily Cash Ledger</div>

            {/* Income & Expense Summary Cards */}
            <div className="flex gap-1.5 mb-2.5">
              <div className="bg-emerald-50 border border-emerald-500/10 rounded-lg p-1.5 flex-1 text-center">
                <div className="text-[4px] text-emerald-600 font-bold uppercase">Cash In</div>
                <div className="text-[7px] text-emerald-700 font-extrabold mt-0.5">₹42,800</div>
              </div>
              <div className="bg-red-50 border border-red-500/10 rounded-lg p-1.5 flex-1 text-center">
                <div className="text-[4px] text-red-600 font-bold uppercase">Cash Out</div>
                <div className="text-[7px] text-red-700 font-extrabold mt-0.5">₹11,500</div>
              </div>
            </div>

            {/* Ledger Entries List */}
            <div className="bg-white rounded-lg p-1.5 border border-slate-100 space-y-1 flex-1 mb-1">
              <div className="text-[5px] text-gray-400 font-bold uppercase mb-1">Recent Transactions</div>
              
              <div className="flex justify-between items-center text-[5.5px] border-b border-gray-100 pb-0.5">
                <div className="text-gray-800">Enquiry Deal #221</div>
                <div className="text-emerald-600 font-bold">+₹1,500</div>
              </div>
              <div className="flex justify-between items-center text-[5.5px] border-b border-gray-100 pb-0.5">
                <div className="text-gray-800">Internet Bill</div>
                <div className="text-red-600 font-bold">-₹600</div>
              </div>
              <div className="flex justify-between items-center text-[5.5px] border-b border-gray-100 pb-0.5">
                <div className="text-gray-800">Advance Domain</div>
                <div className="text-[#FFC107] font-bold">-₹1,200</div>
              </div>
            </div>
          </div>
        );

      case "product-catalog":
        return (
          <div className="w-full h-full bg-white select-none flex flex-col overflow-hidden text-left p-2 pt-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-1 mb-2.5">
              <div className="text-[8px] font-black text-gray-900 leading-none">Artisan Bakery</div>
              <div className="h-3 w-8 bg-gray-50 border border-slate-100 rounded flex items-center justify-center text-[4px] text-gray-500 font-bold">Search</div>
            </div>

            {/* Mini Products Grid */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="bg-[#FAFBFD] border border-slate-100 rounded-lg p-1 text-center flex flex-col justify-between">
                <div className="h-10 w-full bg-gradient-to-tr from-orange-50 to-orange-100 rounded-sm mb-1" />
                <div className="text-[5.5px] font-bold text-gray-800 truncate">Chocolate Croissant</div>
                <div className="text-[5.5px] text-[#FF8F94] font-extrabold mt-0.5">₹140</div>
              </div>
              <div className="bg-[#FAFBFD] border border-slate-100 rounded-lg p-1 text-center flex flex-col justify-between">
                <div className="h-10 w-full bg-gradient-to-tr from-amber-50 to-amber-100 rounded-sm mb-1" />
                <div className="text-[5.5px] font-bold text-gray-800 truncate">Cold Brew Latte</div>
                <div className="text-[5.5px] text-[#FF8F94] font-extrabold mt-0.5">₹190</div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-[#FAFBFD] select-none flex flex-col justify-center items-center text-center p-3 pt-8 text-primary space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EFEBFF] text-[#4A3DAB] flex items-center justify-center shadow-sm">
              <HugeiconsIcon icon={GridIcon} size={22} />
            </div>
            <div className="space-y-1">
              <div className="text-[8.5px] font-bold text-primary">MarketingSetu Toolbox</div>
              <div className="text-[5px] text-secondary">Integrate digital identity products and automated companion services to skyrocket conversion.</div>
            </div>
            <div className="w-16 h-4 bg-[#4A3DAB] text-white rounded flex items-center justify-center text-[5.5px] font-bold shadow-sm">
              Explore All
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative py-12 select-none overflow-hidden">
      {/* Glow Blur Background Elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-brand-main/5 dark:bg-brand-main/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 dark:bg-emerald-500/3 rounded-full blur-[100px] pointer-events-none" />

      {/* MOBILE TAB NAVIGATOR (Horizontal scroll, visible on mobile/tablet) */}
      <div className="flex md:hidden overflow-x-auto gap-3 pb-4 px-4 no-scrollbar justify-start mb-8 border-b border-outline">
        {services.map((service) => {
          const isSelected = activeTab === service.id;
          return (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-brand-main text-white border-brand-main shadow-sm"
                  : "bg-paper text-secondary border-outline hover:border-brand-main/50"
              }`}
            >
              <span>
                <HugeiconsIcon icon={service.icon} size={14} />
              </span>
              <span>{service.label}</span>
            </button>
          );
        })}
      </div>

      {/* DYNAMIC SHOWCASE CONTAINER */}
      <div className="flex items-center justify-center max-w-5xl mx-auto px-4 relative min-h-[420px]">
        
        {/* RESPONSIVE INTERACTIVE WRAPPER (Centered mockup on mobile, full grid on desktop) */}
        <div className="flex w-full md:w-[760px] h-[420px] relative items-center justify-center md:justify-between z-10">
          
          {/* SVG Connection Lines & Pulsing Laser Dots (Desktop only) */}
          <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Center target is exactly (380, 210) inside the 760x420 box */}
            {[
              { x: 48, y: 88 },   // Card 1 (Digital Card)
              { x: 164, y: 208 }, // Card 2 (WhatsApp)
              { x: 48, y: 328 },  // Card 3 (Landing Page)
              { x: 596, y: 208 }, // Card 4 (Google Biz)
              { x: 712, y: 88 },   // Card 5 (Ledger)
              { x: 596, y: 328 }, // Card 6 (Catalog)
              { x: 712, y: 328 },  // Card 7 (See All)
            ].map((node, i) => {
              const service = services[i];
              return (
                <g key={`line-${service.id}`}>
                  {/* Dashed connector line */}
                  <line
                    x1={380}
                    y1={210}
                    x2={node.x}
                    y2={node.y}
                    stroke="currentColor"
                    className="text-outline/35"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                  />
                  {/* Laser dot traveling along line */}
                  <circle r="3" fill={service.accentColor}>
                    <animateMotion
                      dur="5s"
                      repeatCount="indefinite"
                      path={`M 380 210 L ${node.x} ${node.y}`}
                      begin={`${i * 0.6}s`}
                    />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* LEFT COLUMNS: Staggered Floating Cards (Desktop only) */}
          <div className="hidden md:flex gap-5 z-10">
            {/* Column 1 (Leftmost) */}
            <div className="flex flex-col gap-10 animate-float-1">
              {renderSquareCard(services[0])} {/* Digital Card */}
              {renderSquareCard(services[2])} {/* Landing Page */}
            </div>
            {/* Column 2 (Inner Left - Shifted Downwards) */}
            <div className="flex flex-col gap-6 pt-16 animate-float-2">
              {renderSquareCard(services[1])} {/* WhatsApp */}
            </div>
          </div>

          {/* CENTER Smartphone Device Mockup Frame (White Layout, Soft Light Border, Center aligned on mobile) */}
          <div className="relative flex-shrink-0 w-[210px] h-[400px] bg-white rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.06)] border-[6px] border-slate-100 flex flex-col overflow-hidden z-20 mx-auto md:mx-0">
            {/* Speaker Notch (Soft light pill shape) */}
            <div className="absolute top-0 left-0 right-0 h-5 bg-white z-50 flex justify-center items-center">
              <div className="w-12 h-1.5 rounded-full bg-slate-100 flex items-center justify-center">
                <div className="w-4 h-0.5 bg-slate-200 rounded-full" />
              </div>
            </div>

            {/* Phone Screen Area (High-Fidelity Dynamic Screen contents matching the hovered service card) */}
            <div className="w-full h-full relative overflow-hidden bg-white select-none">
              {renderPhoneScreenContent()}
            </div>

          </div>

          {/* RIGHT COLUMNS: Staggered Floating Cards (Desktop only) */}
          <div className="hidden md:flex gap-5 z-10">
            {/* Column 3 (Inner Right) */}
            <div className="flex flex-col gap-6 pt-16 animate-float-2">
              {renderSquareCard(services[3])} {/* Google Biz */}
              {renderSquareCard(services[5])} {/* Catalog */}
            </div>
            {/* Column 4 (Rightmost) */}
            <div className="flex flex-col gap-10 animate-float-1">
              {renderSquareCard(services[4])} {/* Ledger */}
              {renderSquareCard(services[6])} {/* See All */}
            </div>
          </div>

        </div>

      </div>

      {/* TEXT DETAILS BANNER BELOW */}
      <div className="max-w-3xl mx-auto px-4 text-center mt-12 relative z-10 transition-all duration-300">
        <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-white uppercase mb-3" style={{ backgroundColor: activeService.accentColor }}>
          {activeService.category}
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-primary mb-3 leading-tight transition-colors">
          {activeService.title}
        </h3>
        <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-6">
          {activeService.description}
        </p>
        <div className="flex justify-center">
          {activeService.actionLink ? (
            <Link
              href={activeService.actionLink}
              className="inline-flex items-center gap-1.5 px-6 py-3 border border-outline hover:border-brand-main/50 rounded-xl text-xs font-semibold text-primary bg-paper hover:bg-neutral shadow-sm hover:shadow transition-all"
            >
              <span>{activeService.actionLabel}</span>
              <span>&rarr;</span>
            </Link>
          ) : (
            <button
              onClick={() => openWhatsApp()}
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl text-xs font-bold text-white shadow-z4 hover:shadow-z8 hover:-translate-y-0.5 transition-all cursor-pointer"
              style={{ backgroundColor: activeService.accentColor }}
            >
              <span>{activeService.actionLabel}</span>
              <span>&rarr;</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
