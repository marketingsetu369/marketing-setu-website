"use client";

import { useThemeStore } from "@/store/themeStore";
import { PageWrapper, PricingCard, useWhatsApp } from "@/views/home-page/component";
import { pricingPlans, translations } from "@/views/home-page/data";
import CafeCardView from "@/views/home-page/hero-section/CafeCardView";
import Link from "next/link";
import { useState } from "react";

export default function HomeView() {
  const { openWhatsApp } = useWhatsApp();
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;
  const [activeCardIndex, setActiveCardIndex] = useState(2);

  const carouselCards = [
    {
      id: "card-1",
      layoutType: "cafe-artisan",
      title: "Artisan Brew Cafe",
      category: "Cafe & Roastery",
      avatar: "☕",
      tagline: "Freshly Roasted Organic Coffee",
      bgClass: "bg-gradient-to-br from-amber-950 via-stone-900 to-amber-950",
      owner: "Kabir Mehta",
      role: "Head Barista & Owner",
      about: "Handcrafted espresso, artisan pastries, specialty cold brews, and cozy workspace ambiance.",
      stat1: "4.9 ★",
      stat1Label: "Coffee Rating",
      stat2: "15k+",
      stat2Label: "Cups Served",
      services: [
        { icon: "☕", name: "Specialty Hazelnut Latte", price: "₹240" },
        { icon: "🥐", name: "Fresh Almond Croissant", price: "₹180" }
      ]
    },
    {
      id: "card-2",
      layoutType: "solar-tech",
      title: "SunPower Solar Systems",
      category: "Solar Energy Seller",
      avatar: "☀️",
      tagline: "Zero Electricity Bill Guarantee",
      bgClass: "bg-gradient-to-br from-cyan-950 via-teal-900 to-slate-950",
      owner: "Siddharth Verma",
      role: "Solar Consultant & Owner",
      about: "Turnkey residential and commercial rooftop solar installations with subsidy guidance and net metering.",
      stat1: "3.2 MW",
      stat1Label: "Solar Installed",
      stat2: "850+",
      stat2Label: "Rooftops Powered",
      services: [
        { icon: "⚡", name: "3kW Home Solar Plant", price: "₹1,40,000" },
        { icon: "🔋", name: "5kW Hybrid Battery System", price: "₹2,25,000" }
      ]
    },
    {
      id: "card-3",
      layoutType: "parlour-beauty",
      title: "Glow & Style Beauty Parlour",
      category: "Beauty Parlour & Salon",
      avatar: "💅",
      tagline: "Radiant Skin & Modern Hair Styling",
      bgClass: "bg-gradient-to-br from-rose-950 via-pink-900 to-slate-950",
      owner: "Neha Kapoor",
      role: "Senior Beauty Artist",
      about: "Bridal makeup, organic facial treatments, hair spa, nail art, and luxury skin care rejuvenation.",
      stat1: "1,400+",
      stat1Label: "Happy Brides",
      stat2: "10 Yrs",
      stat2Label: "Salon Exp.",
      services: [
        { icon: "💄", name: "HD Bridal Makeup", price: "₹12,500" },
        { icon: "✨", name: "Gold Hydra Glow Facial", price: "₹2,499" }
      ]
    },
    {
      id: "card-4",
      layoutType: "two-wheeler-broker",
      title: "SpeedyWheels Bike Broker",
      category: "Two-Wheeler Deals & Insurance",
      avatar: "🏍️",
      tagline: "Best Deals on Pre-Owned & New Bikes",
      bgClass: "bg-gradient-to-br from-red-950 via-orange-900 to-slate-950",
      owner: "Vikram Rathore",
      role: "Automotive Broker",
      about: "Instant buy, sell, loan approval, RTO transfer, and 1-year warranty on verified pre-owned two-wheelers.",
      stat1: "2,100+",
      stat1Label: "Bikes Delivered",
      stat2: "100%",
      stat2Label: "Verified RTO",
      services: [
        { icon: "🛵", name: "RTO Transfer & RC Renewal", price: "₹1,800" },
        { icon: "📑", name: "Instant Bike Insurance", price: "₹1,200" }
      ]
    },
    {
      id: "card-5",
      layoutType: "personal-portfolio",
      title: "Rohan Das Portfolio",
      category: "UI/UX Designer & Creator",
      avatar: "👨‍💻",
      tagline: "Crafting Digital Experiences",
      bgClass: "bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-950",
      owner: "Rohan Das",
      role: "Lead Product Designer",
      about: "Specialized in web application design, mobile UI design systems, interactive prototypes, and design audit.",
      stat1: "60+",
      stat1Label: "Apps Shipped",
      stat2: "7 Yrs",
      stat2Label: "UX Design",
      services: [
        { icon: "🎨", name: "Full App Redesign", price: "₹35,000" },
        { icon: "📱", name: "Figma UI Kit Design", price: "₹18,000" }
      ]
    },
    {
      id: "card-6",
      layoutType: "default-marketing-setu",
      title: "MarketingSetu Smart Card",
      category: "Default Digital Business Card",
      avatar: "🚀",
      tagline: "Original Smart Business Page",
      bgClass: "bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-950",
      owner: "Dhananjay L.",
      role: "Founder & MarketingSetu",
      about: "Share your professional identity, products, contact links, and business details with one smart link.",
      stat1: "10,000+",
      stat1Label: "Cards Created",
      stat2: "#1",
      stat2Label: "India Platform",
      services: [
        { icon: "💳", name: "NFC Smart Business Card", price: "₹999" },
        { icon: "📲", name: "WhatsApp Auto Lead Capture", price: "₹1,999" }
      ]
    }
  ];

  const getTranslatedPlans = () => {
    return pricingPlans.map((plan) => {
      let badge = plan.badge;
      let name = plan.name;
      let price = plan.price;
      let description = plan.description;

      if (plan.id === "quick-connect") {
        badge = t.plan_quick_badge;
        name = t.plan_quick_name;
        price = t.plan_quick_price;
        description = t.plan_quick_desc;
      } else if (plan.id === "smart-connect") {
        badge = t.plan_smart_badge;
        name = t.plan_smart_name;
        price = t.plan_smart_price;
        description = t.plan_smart_desc;
      } else if (plan.id === "power-connect") {
        badge = t.plan_power_badge;
        name = t.plan_power_name;
        price = t.plan_power_price;
        description = t.plan_power_desc;
      }

      const featureMapping: Record<string, { bold: string; desc?: string }> = {
        "Digital Business Card": { bold: t.plan_feat_digital_card },
        "Auto SMS on Missed Call": { bold: t.plan_feat_auto_sms },
        "Auto WhatsApp on Missed Call": { bold: t.plan_feat_auto_wa },
        "Custom Landing Page": { bold: t.plan_feat_landing_page },
        "Festival Social Media Posts": { bold: t.plan_feat_festivals },
        "Everything in Starter": { bold: t.plan_feat_everything_starter },
        "Everything in Growth": { bold: t.plan_feat_everything_growth },
        "Everything in Smart Connect": { bold: t.plan_feat_everything_growth },
        "Custom Landing Page + Domain": { bold: t.plan_feat_domain },
        "Google Business Setup": { bold: t.plan_feat_google },
      };

      const translateFeatures = (featuresList: typeof plan.features) => {
        return featuresList.map((f) => {
          const mapped = featureMapping[f.bold];
          if (mapped) {
            return {
              bold: mapped.bold,
              desc: f.desc ? t.plan_feat_desc_included : undefined,
            };
          }
          return f;
        });
      };

      return {
        ...plan,
        badge,
        name,
        price,
        description,
        features: translateFeatures(plan.features),
        compactFeatures: plan.compactFeatures ? translateFeatures(plan.compactFeatures) : undefined,
      };
    });
  };

  return (
    <PageWrapper>
      <div className="font-sans text-primary bg-background">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Top Rating Badge */}
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-paper border border-outline text-xs sm:text-sm font-medium text-secondary mb-8 shadow-z1">
              <span className="bg-brand-dark text-white px-2 py-0.5 rounded-full text-[11px] font-semibold">#1 Platform</span>
              <span>Digital Marketing & Smart Card Software</span>
              <span className="text-disabled hidden sm:inline">•</span>
              <span className="text-primary font-semibold hidden sm:flex items-center gap-1">
                4.9 
                <svg className="w-3.5 h-3.5 text-warning-main fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-primary max-w-4xl mx-auto leading-[1.1] mb-6">
              Digital Business Card<br />
              <span className="text-brand-main font-medium">The Original. The Best.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Share your professional identity, products, contact links, and business details with one smart link — complete with automated WhatsApp & missed call customer connection.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={() => openWhatsApp()}
                className="w-full sm:w-auto px-8 py-4 bg-brand-main hover:bg-brand-dark text-white font-semibold text-base rounded-xl shadow-z8 hover:shadow-z16 transition-all ease-out flex items-center justify-center gap-2 cursor-pointer"
              >
                Create Digital Business Card
              </button>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-4 bg-paper hover:bg-neutral text-primary font-semibold text-base rounded-xl transition-all border border-outline text-center"
              >
                {t.nav_explore_services}
              </Link>
            </div>

            {/* Stateful 3D Coverflow Interactive Carousel */}
            <div className="relative max-w-7xl mx-auto pt-6 pb-8 px-4 overflow-hidden">
              
              {/* Active Category Name Title Above Slider */}
              <div className="text-center mb-6 transition-all duration-300">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-lighter text-brand-dark font-bold text-xs uppercase tracking-wider mb-2 border border-brand-light/40 shadow-xs">
                  {carouselCards[activeCardIndex].category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  {carouselCards[activeCardIndex].title}
                </h3>
              </div>

              {/* Coverflow Carousel Outer Stage */}
              <div className="relative flex items-center justify-center min-h-[540px] py-4">
                
                {/* Left Carousel Circular Arrow Button */}
                <button
                  onClick={() => setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : carouselCards.length - 1))}
                  className="absolute left-2 sm:left-8 z-40 w-12 h-12 rounded-full bg-white text-emerald-600 shadow-xl border border-gray-100 flex items-center justify-center text-xl font-bold hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  aria-label="Previous Slide"
                >
                  &larr;
                </button>

                {/* Right Carousel Circular Arrow Button */}
                <button
                  onClick={() => setActiveCardIndex((prev) => (prev < carouselCards.length - 1 ? prev + 1 : 0))}
                  className="absolute right-2 sm:right-8 z-40 w-12 h-12 rounded-full bg-white text-emerald-600 shadow-xl border border-gray-100 flex items-center justify-center text-xl font-bold hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  aria-label="Next Slide"
                >
                  &rarr;
                </button>

                {/* 3D Stack Deck Cards */}
                <div className="relative w-full max-w-5xl h-[500px] flex items-center justify-center perspective-[1000px]">
                  {carouselCards.map((card, idx) => {
                    const N = carouselCards.length;
                    // Calculate circular shortest distance offset
                    let rawOffset = idx - activeCardIndex;
                    let offset = ((rawOffset % N) + N) % N;
                    if (offset > N / 2) {
                      offset -= N;
                    }

                    const absOffset = Math.abs(offset);
                    const isActive = offset === 0;

                    // Compute 3D coverflow transforms based on shortest circular offset
                    let transformStyle = "";
                    let zIndex = 30 - absOffset * 5;
                    let opacity = 1;

                    if (isActive) {
                      transformStyle = "translateX(0%) scale(1) translateZ(0px) rotateY(0deg)";
                      opacity = 1;
                    } else if (offset === -1) {
                      transformStyle = "translateX(-65%) scale(0.85) translateZ(-60px) rotateY(12deg)";
                      opacity = 0.85;
                    } else if (offset === 1) {
                      transformStyle = "translateX(65%) scale(0.85) translateZ(-60px) rotateY(-12deg)";
                      opacity = 0.85;
                    } else if (offset === -2) {
                      transformStyle = "translateX(-115%) scale(0.7) translateZ(-120px) rotateY(20deg)";
                      opacity = 0.6;
                    } else if (offset === 2) {
                      transformStyle = "translateX(115%) scale(0.7) translateZ(-120px) rotateY(-20deg)";
                      opacity = 0.6;
                    } else {
                      transformStyle = `translateX(${offset * 75}%) scale(0.5) translateZ(-200px)`;
                      opacity = 0;
                    }

                    return (
                      <div
                        key={card.id}
                        onClick={() => setActiveCardIndex(idx)}
                        style={{
                          transform: transformStyle,
                          zIndex: zIndex,
                          opacity: opacity,
                        }}
                        className={`absolute w-[265px] sm:w-[285px] h-[490px] rounded-[36px] bg-white text-gray-950 transition-all duration-500 ease-out cursor-pointer select-none overflow-hidden ${
                          isActive
                            ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] ring-4 ring-white"
                            : "shadow-xl border border-gray-200/80 hover:opacity-100"
                        }`}
                      >
                        {/* Mobile Screen Shell Frame */}
                        <div className="w-full h-full relative overflow-hidden bg-white text-left">
                          {/* Top Speaker Notch for Mobile Look */}
                          <div className="absolute top-0 left-0 right-0 h-5 bg-white/80 backdrop-blur-xs z-40 flex justify-center items-center">
                            <div className="w-12 h-2 rounded-full bg-gray-200"></div>
                          </div>

                          {card.layoutType === "cafe-artisan" ? (
                            <CafeCardView isCenter={isActive} />
                          ) : (
                            <div className={`w-full flex flex-col space-y-4 pb-12 pt-6 ${isActive ? "animate-vertical-scroll" : ""}`}>
                              {/* SOLAR ENERGY SELLER LAYOUT */}
                              {card.layoutType === "solar-tech" && (
                                <div className="space-y-3 bg-cyan-50/30 pb-4">
                                  <header className="pt-6 pb-6 px-4 text-center bg-gradient-to-b from-cyan-950 via-teal-900 to-slate-950 text-white relative">
                                    <div className="w-16 h-16 rounded-2xl bg-cyan-500 text-slate-950 mx-auto flex items-center justify-center text-3xl mb-2 shadow-lg border-2 border-white">
                                      {card.avatar}
                                    </div>
                                    <span className="text-[8.5px] font-bold tracking-widest text-cyan-300 uppercase">SOLAR POWER SYSTEMS</span>
                                    <h3 className="font-black text-base text-white tracking-tight mt-0.5">{card.title}</h3>
                                    <p className="text-[9.5px] text-cyan-200">{card.tagline}</p>
                                  </header>

                                  <div className="px-4 grid grid-cols-2 gap-2 text-[10px]">
                                    <button className="py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-center shadow-xs">
                                      ⚡ Free Solar Audit
                                    </button>
                                    <button className="py-2.5 rounded-xl bg-white text-cyan-900 border border-cyan-200 font-bold text-center">
                                      💬 Solar WhatsApp
                                    </button>
                                  </div>

                                  <div className="px-4">
                                    <div className="p-3 bg-white rounded-2xl border border-cyan-100 shadow-2xs space-y-1">
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-800 font-bold flex items-center justify-center text-xs">
                                          SV
                                        </div>
                                        <div>
                                          <h4 className="font-bold text-[11px] text-slate-900">{card.owner}</h4>
                                          <p className="text-[8.5px] text-cyan-700 font-semibold">{card.role}</p>
                                        </div>
                                      </div>
                                      <p className="text-[9px] text-slate-600 leading-snug">{card.about}</p>
                                    </div>
                                  </div>

                                  <div className="px-4 grid grid-cols-2 gap-2 text-center text-[9.5px]">
                                    <div className="p-2.5 rounded-xl bg-cyan-100/80 text-cyan-950 font-bold">
                                      <span className="block text-base font-black text-cyan-700">{card.stat1}</span>
                                      <span className="text-[8px] uppercase tracking-wider text-cyan-800">{card.stat1Label}</span>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-teal-100/80 text-teal-950 font-bold">
                                      <span className="block text-base font-black text-teal-700">{card.stat2}</span>
                                      <span className="text-[8px] uppercase tracking-wider text-teal-800">{card.stat2Label}</span>
                                    </div>
                                  </div>

                                  <div className="px-4 space-y-1.5">
                                    <h4 className="font-bold text-[11px] text-slate-900">Rooftop Packages</h4>
                                    {card.services.map((s, idx) => (
                                      <div key={idx} className="p-2.5 bg-white rounded-xl border border-cyan-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                          <span className="text-2xl">{s.icon}</span>
                                          <div>
                                            <p className="font-bold text-[9.5px] text-slate-900 leading-tight">{s.name}</p>
                                            <span className="text-[8px] text-slate-400">Govt Subsidy Eligible</span>
                                          </div>
                                        </div>
                                        <span className="font-black text-cyan-700 text-[10px]">{s.price}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* BEAUTY PARLOUR LAYOUT */}
                              {card.layoutType === "parlour-beauty" && (
                                <div className="space-y-3 bg-pink-50/40 pb-4">
                                  <header className="pt-6 pb-6 px-4 text-center bg-gradient-to-br from-rose-700 via-pink-600 to-rose-800 text-white relative rounded-b-3xl">
                                    <div className="w-16 h-16 rounded-full bg-white text-rose-600 mx-auto flex items-center justify-center text-3xl mb-2 shadow-lg border-2 border-pink-200">
                                      {card.avatar}
                                    </div>
                                    <span className="text-[8.5px] font-bold tracking-widest text-pink-200 uppercase">BEAUTY & SALON STUDIO</span>
                                    <h3 className="font-serif text-base font-bold text-white tracking-wide mt-0.5">{card.title}</h3>
                                    <p className="text-[9.5px] text-pink-100 italic">{card.tagline}</p>
                                  </header>

                                  <div className="px-4 grid grid-cols-2 gap-2 text-[10px]">
                                    <button className="py-2.5 rounded-xl bg-rose-600 text-white font-bold text-center shadow-xs">
                                      💄 Book Appointment
                                    </button>
                                    <button className="py-2.5 rounded-xl bg-white text-rose-800 border border-rose-200 font-bold text-center">
                                      💬 Chat WhatsApp
                                    </button>
                                  </div>

                                  <div className="px-4">
                                    <div className="p-3 bg-white rounded-2xl border border-rose-100 shadow-2xs space-y-1">
                                      <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-[11px] text-rose-950">{card.owner}</h4>
                                        <span className="text-[8px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">{card.role}</span>
                                      </div>
                                      <p className="text-[9px] text-rose-900/80 leading-snug">{card.about}</p>
                                    </div>
                                  </div>

                                  <div className="px-4 grid grid-cols-2 gap-2 text-center text-[9.5px]">
                                    <div className="p-2.5 rounded-xl bg-pink-100 text-rose-900 font-bold">
                                      <span className="block text-base font-black text-rose-700">{card.stat1}</span>
                                      <span className="text-[8px] uppercase text-rose-800">{card.stat1Label}</span>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-pink-100 text-rose-900 font-bold">
                                      <span className="block text-base font-black text-rose-700">{card.stat2}</span>
                                      <span className="text-[8px] uppercase text-rose-800">{card.stat2Label}</span>
                                    </div>
                                  </div>

                                  <div className="px-4 space-y-1.5">
                                    <h4 className="font-serif font-bold text-[11px] text-rose-950">Popular Beauty Services</h4>
                                    {card.services.map((s, idx) => (
                                      <div key={idx} className="p-2.5 bg-white rounded-xl border border-rose-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <span className="text-xl">{s.icon}</span>
                                          <span className="font-bold text-[9.5px] text-rose-950">{s.name}</span>
                                        </div>
                                        <span className="font-extrabold text-rose-600 text-[10px]">{s.price}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* TWO-WHEELER BROKER LAYOUT */}
                              {card.layoutType === "two-wheeler-broker" && (
                                <div className="space-y-3 bg-slate-900 text-white pb-4">
                                  <header className="pt-6 pb-6 px-4 text-center bg-gradient-to-br from-red-900 via-slate-900 to-black text-white relative">
                                    <div className="w-16 h-16 rounded-2xl bg-red-600 text-white mx-auto flex items-center justify-center text-3xl mb-2 shadow-lg border-2 border-red-500/50">
                                      {card.avatar}
                                    </div>
                                    <span className="text-[8.5px] font-black tracking-widest text-red-400 uppercase">BIKE BROKER & AUTOMOTIVE</span>
                                    <h3 className="font-black text-base text-white tracking-tight mt-0.5">{card.title}</h3>
                                    <p className="text-[9.5px] text-slate-300">{card.tagline}</p>
                                  </header>

                                  <div className="px-4 grid grid-cols-2 gap-2 text-[10px]">
                                    <button className="py-2.5 rounded-xl bg-red-600 text-white font-bold text-center shadow-xs">
                                      🏍️ View Bike Inventory
                                    </button>
                                    <button className="py-2.5 rounded-xl bg-slate-800 text-red-300 border border-red-500/30 font-bold text-center">
                                      💬 Instant Deal
                                    </button>
                                  </div>

                                  <div className="px-4">
                                    <div className="p-3 bg-slate-800/80 rounded-2xl border border-red-900/40 space-y-1">
                                      <div className="flex justify-between items-center">
                                        <h4 className="font-bold text-[11px] text-red-400">{card.owner}</h4>
                                        <span className="text-[8px] px-2 py-0.5 rounded-md bg-red-950 text-red-200 border border-red-800">{card.role}</span>
                                      </div>
                                      <p className="text-[9px] text-slate-300 leading-snug">{card.about}</p>
                                    </div>
                                  </div>

                                  <div className="px-4 grid grid-cols-2 gap-2 text-center text-[9.5px]">
                                    <div className="p-2.5 rounded-xl bg-slate-800 border border-red-900/40">
                                      <span className="block font-black text-red-500 text-base">{card.stat1}</span>
                                      <span className="text-[8px] text-slate-400 font-bold uppercase">{card.stat1Label}</span>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-slate-800 border border-red-900/40">
                                      <span className="block font-black text-red-500 text-base">{card.stat2}</span>
                                      <span className="text-[8px] text-slate-400 font-bold uppercase">{card.stat2Label}</span>
                                    </div>
                                  </div>

                                  <div className="px-4 space-y-1.5">
                                    <h4 className="font-bold text-[11px] text-slate-200">Brokerage Services</h4>
                                    {card.services.map((s, idx) => (
                                      <div key={idx} className="p-2.5 bg-slate-800/80 rounded-xl border border-red-900/40 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <span className="text-xl">{s.icon}</span>
                                          <span className="font-bold text-[9.5px] text-slate-200">{s.name}</span>
                                        </div>
                                        <span className="font-extrabold text-red-400 text-[10px]">{s.price}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* PERSONAL PORTFOLIO LAYOUT */}
                              {card.layoutType === "personal-portfolio" && (
                                <div className="space-y-3 bg-purple-50/30 pb-4">
                                  <header className="pt-6 pb-6 px-4 text-center bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-950 text-white relative rounded-b-3xl">
                                    <div className="w-16 h-16 rounded-full bg-indigo-600 text-white mx-auto flex items-center justify-center text-3xl mb-2 shadow-lg border-2 border-purple-300">
                                      {card.avatar}
                                    </div>
                                    <span className="text-[8.5px] font-mono tracking-widest text-purple-300 uppercase">CREATOR & DESIGNER</span>
                                    <h3 className="font-extrabold text-base text-white tracking-tight mt-0.5">{card.title}</h3>
                                    <p className="text-[9.5px] text-purple-200">{card.tagline}</p>
                                  </header>

                                  <div className="px-4 grid grid-cols-2 gap-2 text-[10px]">
                                    <button className="py-2.5 rounded-xl bg-purple-600 text-white font-bold text-center shadow-xs">
                                      📁 View Portfolio
                                    </button>
                                    <button className="py-2.5 rounded-xl bg-white text-purple-900 border border-purple-200 font-bold text-center">
                                      💬 Hire Me
                                    </button>
                                  </div>

                                  <div className="px-4">
                                    <div className="p-3 bg-white rounded-2xl border border-purple-100 shadow-2xs space-y-1">
                                      <div className="flex justify-between items-center">
                                        <h4 className="font-bold text-[11px] text-purple-950">{card.owner}</h4>
                                        <span className="text-[8px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">{card.role}</span>
                                      </div>
                                      <p className="text-[9px] text-slate-600 leading-snug">{card.about}</p>
                                    </div>
                                  </div>

                                  <div className="px-4 grid grid-cols-2 gap-2 text-center text-[9.5px]">
                                    <div className="p-2.5 rounded-xl bg-purple-100/70 text-purple-950 font-bold">
                                      <span className="block text-base font-black text-purple-700">{card.stat1}</span>
                                      <span className="text-[8px] uppercase text-purple-800">{card.stat1Label}</span>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-purple-100/70 text-purple-950 font-bold">
                                      <span className="block text-base font-black text-purple-700">{card.stat2}</span>
                                      <span className="text-[8px] uppercase text-purple-800">{card.stat2Label}</span>
                                    </div>
                                  </div>

                                  <div className="px-4 space-y-1.5">
                                    <h4 className="font-bold text-[11px] text-slate-900">Design Offerings</h4>
                                    {card.services.map((s, idx) => (
                                      <div key={idx} className="p-2.5 bg-white rounded-xl border border-purple-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <span className="text-xl">{s.icon}</span>
                                          <span className="font-bold text-[9.5px] text-slate-900">{s.name}</span>
                                        </div>
                                        <span className="font-extrabold text-purple-700 text-[10px]">{s.price}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* DEFAULT MARKETINGSETU SMART CARD LAYOUT */}
                              {card.layoutType === "default-marketing-setu" && (
                                <div className="space-y-3 bg-blue-50/30 pb-4">
                                  <header className="pt-6 pb-6 px-4 text-center bg-gradient-to-b from-blue-900 via-indigo-900 to-slate-950 text-white relative">
                                    <div className="w-16 h-16 rounded-full bg-brand-main text-white mx-auto flex items-center justify-center text-3xl mb-2 shadow-lg border-2 border-white">
                                      {card.avatar}
                                    </div>
                                    <span className="text-[8.5px] font-bold tracking-widest text-brand-main bg-white px-2 py-0.5 rounded-full uppercase">OFFICIAL SMART CARD</span>
                                    <h3 className="font-black text-base text-white tracking-tight mt-1">{card.title}</h3>
                                    <p className="text-[9.5px] text-blue-200">{card.tagline}</p>
                                  </header>

                                  <div className="px-4 grid grid-cols-2 gap-2 text-[10px]">
                                    <button className="py-2.5 rounded-xl bg-brand-main text-white font-bold text-center shadow-xs">
                                      💳 Get NFC Card
                                    </button>
                                    <button className="py-2.5 rounded-xl bg-white text-brand-main border border-brand-main/20 font-bold text-center">
                                      💬 Chat WhatsApp
                                    </button>
                                  </div>

                                  <div className="px-4">
                                    <div className="p-3 bg-white rounded-2xl border border-blue-100 shadow-2xs space-y-1">
                                      <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-[11px] text-slate-900">{card.owner}</h4>
                                        <span className="text-[8px] px-2 py-0.5 rounded-full bg-brand-lighter text-brand-main font-bold">{card.role}</span>
                                      </div>
                                      <p className="text-[9px] text-slate-600 leading-snug">{card.about}</p>
                                    </div>
                                  </div>

                                  <div className="px-4 grid grid-cols-2 gap-2 text-center text-[9.5px]">
                                    <div className="p-2.5 rounded-xl bg-blue-100/70 text-blue-950 font-bold">
                                      <span className="block text-base font-black text-brand-main">{card.stat1}</span>
                                      <span className="text-[8px] uppercase text-blue-900">{card.stat1Label}</span>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-blue-100/70 text-blue-950 font-bold">
                                      <span className="block text-base font-black text-brand-main">{card.stat2}</span>
                                      <span className="text-[8px] uppercase text-blue-900">{card.stat2Label}</span>
                                    </div>
                                  </div>

                                  <div className="px-4 space-y-1.5">
                                    <h4 className="font-bold text-[11px] text-slate-900">Platform Plans</h4>
                                    {card.services.map((s, idx) => (
                                      <div key={idx} className="p-2.5 bg-white rounded-xl border border-blue-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <span className="text-xl">{s.icon}</span>
                                          <span className="font-bold text-[9.5px] text-slate-900">{s.name}</span>
                                        </div>
                                        <span className="font-extrabold text-brand-main text-[10px]">{s.price}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dots Pagination Below Carousel */}
              <div className="flex justify-center items-center gap-2.5 mt-6">
                {carouselCards.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCardIndex(idx)}
                    className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeCardIndex
                        ? "w-8 bg-brand-main shadow-md"
                        : "w-3 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* HOW IT WORKS SECTION */}
        <section className="py-24 bg-neutral/50 border-b border-outline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-paper border border-outline px-3 py-1 rounded-full inline-block mb-4">
                HOW IT WORKS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary mb-4">Get Your Digital Card in 3 Simple Steps</h2>
              <p className="text-secondary text-base sm:text-lg">Set up your smart business card & automated customer connection in minutes.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="group bg-paper rounded-3xl p-8 shadow-card relative z-10 flex flex-col justify-between hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-main text-white font-bold text-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    01
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Create Your Profile</h3>
                  <p className="text-secondary text-sm leading-relaxed">Add your business name, photo, catalog, contact links, and social profiles.</p>
                </div>
                <div className="mt-8 pt-4 border-t border-outline text-xs font-semibold text-disabled uppercase tracking-wider">
                  Step 1 • Profile Setup
                </div>
              </div>

              {/* Step 2 */}
              <div className="group bg-paper rounded-3xl p-8 shadow-card relative z-10 flex flex-col justify-between hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-light text-white font-bold text-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    02
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Enable WhatsApp Automation</h3>
                  <p className="text-secondary text-sm leading-relaxed">Connect missed-call SMS & auto-WhatsApp messaging add-ons for instant customer response.</p>
                </div>
                <div className="mt-8 pt-4 border-t border-outline text-xs font-semibold text-disabled uppercase tracking-wider">
                  Step 2 • Add-on Features
                </div>
              </div>

              {/* Step 3 */}
              <div className="group bg-paper rounded-3xl p-8 shadow-card relative z-10 flex flex-col justify-between hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-success-main text-white font-bold text-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    03
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Share & Connect</h3>
                  <p className="text-secondary text-sm leading-relaxed">Share your unique link or QR code with customers and track profile views.</p>
                </div>
                <div className="mt-8 pt-4 border-t border-outline text-xs font-semibold text-disabled uppercase tracking-wider">
                  Step 3 • Live & Sharing
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-24 bg-background" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-paper px-3 py-1 rounded-full inline-block mb-4 border border-outline">
                CORE PRODUCTS & ADD-ONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary mb-4">Digital Business Cards & Custom Landing Pages</h2>
              <p className="text-secondary text-base sm:text-lg">Our core digital identity solutions powered by automated WhatsApp and customer growth add-ons.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* PRIMARY FEATURE 1: Digital Business Card */}
              <div className="group bg-gradient-to-br from-brand-dark to-brand-darker text-white rounded-3xl p-8 sm:p-10 shadow-z12 flex flex-col justify-between hover:shadow-z20 hover:-translate-y-1.5 transition-all duration-300">
                <div>
                  <span className="inline-block bg-brand-main text-white text-xs font-semibold px-3 py-1 rounded-full mb-6">MAIN PRODUCT</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Smart Digital Business Card</h3>
                  <p className="text-gray-200 text-base mb-8 leading-relaxed">
                    A modern, mobile-friendly digital business card page featuring your contact details, owner profiles, products/services gallery, bio, location, and social links in one quick shareable link.
                  </p>
                </div>
                <button onClick={() => openWhatsApp()} className="text-brand-light font-semibold inline-flex items-center gap-2 transition-all cursor-pointer">
                  Get Your Digital Business Card <span className="group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
                </button>
              </div>

              {/* PRIMARY FEATURE 2: WhatsApp Automation */}
              <div className="group bg-paper rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-success-lighter text-success-main flex items-center justify-center mb-6 font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                    💬
                  </div>
                  <span className="inline-block bg-success-lighter text-success-dark text-xs font-semibold px-3 py-1 rounded-full mb-4">MAIN PRODUCT</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-4">{t.service_wa_title}</h3>
                  <p className="text-secondary text-base mb-8 leading-relaxed">
                    {t.service_wa_lead}
                  </p>
                </div>
                <button onClick={() => openWhatsApp()} className="text-success-main font-semibold inline-flex items-center gap-2 transition-all cursor-pointer text-left">
                  Get WhatsApp Automation <span className="group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
                </button>
              </div>
            </div>

            {/* SECONDARY ADD-ONS GRID */}
            <div className="mt-12">
              <div className="grid md:grid-cols-3 gap-8">
                {/* SECONDARY FEATURE 1: Custom Landing Pages */}
                <div className="group bg-paper rounded-3xl p-8 shadow-card flex flex-col justify-between hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 bg-brand-lighter text-brand-main rounded-2xl flex items-center justify-center mb-6 font-bold group-hover:scale-110 transition-transform duration-300">LP</div>
                    <span className="text-[10px] font-bold text-brand-dark bg-brand-lighter px-2 py-0.5 rounded-full uppercase tracking-wider">Growth Add-On</span>
                    <h3 className="text-xl font-bold text-primary mt-2 mb-3">{t.service_lp_title}</h3>
                    <p className="text-secondary text-sm mb-6">{t.service_lp_lead}</p>
                  </div>
                  <Link className="text-brand-main font-semibold text-sm inline-flex items-center gap-1 transition-all mt-auto" href="/services#landing-pages">
                    View Details <span className="group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
                  </Link>
                </div>

                {/* SECONDARY FEATURE 2: Missed Call Auto Text */}
                <div className="group bg-paper rounded-3xl p-8 shadow-card flex flex-col justify-between hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 bg-info-lighter text-info-main rounded-2xl flex items-center justify-center mb-6 font-bold group-hover:scale-110 transition-transform duration-300">MC</div>
                    <span className="text-[10px] font-bold text-info-dark bg-info-lighter px-2 py-0.5 rounded-full uppercase tracking-wider">Growth Add-On</span>
                    <h3 className="text-xl font-bold text-primary mt-2 mb-3">{t.service_mc_title}</h3>
                    <p className="text-secondary text-sm mb-6">{t.service_mc_lead}</p>
                  </div>
                  <Link className="text-info-main font-semibold text-sm inline-flex items-center gap-1 transition-all mt-auto" href="/services#missed-call">
                    View Details <span className="group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
                  </Link>
                </div>

                {/* SECONDARY FEATURE 3: Google Business Setup */}
                <div className="group bg-paper rounded-3xl p-8 shadow-card flex flex-col justify-between hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 bg-error-lighter text-error-main rounded-2xl flex items-center justify-center mb-6 font-bold group-hover:scale-110 transition-transform duration-300">GB</div>
                    <span className="text-[10px] font-bold text-error-dark bg-error-lighter px-2 py-0.5 rounded-full uppercase tracking-wider">Growth Add-On</span>
                    <h3 className="text-xl font-bold text-primary mt-2 mb-3">{t.service_gb_title}</h3>
                    <p className="text-secondary text-sm mb-6">{t.service_gb_lead}</p>
                  </div>
                  <Link className="text-error-main font-semibold text-sm inline-flex items-center gap-1 transition-all mt-auto" href="/services#google-business">
                    View Details <span className="group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link className="inline-flex items-center justify-center px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl shadow-z4 hover:shadow-z8 transition-all" href="/services">
                {t.btn_see_all_services}
              </Link>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section className="py-24 bg-white relative border-t border-gray-100 overflow-hidden" id="pricing">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlN2U1ZTQiLz48L3N2Zz4=')] opacity-50 z-0"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full inline-block mb-4">
                {t.home_pricing_eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 mb-4">{t.home_pricing_heading}</h2>
              <p className="text-gray-500 text-base sm:text-lg">{t.home_pricing_subtext}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              {getTranslatedPlans().map((plan, idx) => (
                <PricingCard
                  key={idx}
                  plan={plan}
                  href="/pricing"
                />
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block mb-4">
                WHY MARKETINGSETU
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 mb-4">Results-driven. Reliable.<br />Affordable.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
              <div className="group flex gap-4 p-6 rounded-2xl bg-white shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">⚡</div>
                <div>
                  <h4 className="text-lg font-bold text-gray-950 mb-1">{t.why_us_f1_title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{t.why_us_f1_desc}</p>
                </div>
              </div>
              <div className="group flex gap-4 p-6 rounded-2xl bg-white shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">₹</div>
                <div>
                  <h4 className="text-lg font-bold text-gray-950 mb-1">{t.why_us_f2_title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{t.why_us_f2_desc}</p>
                </div>
              </div>
              <div className="group flex gap-4 p-6 rounded-2xl bg-white shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">✓</div>
                <div>
                  <h4 className="text-lg font-bold text-gray-950 mb-1">{t.why_us_f3_title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{t.why_us_f3_desc}</p>
                </div>
              </div>
              <div className="group flex gap-4 p-6 rounded-2xl bg-white shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">👥</div>
                <div>
                  <h4 className="text-lg font-bold text-gray-950 mb-1">{t.why_us_f4_title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{t.why_us_f4_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-gray-50/60 border-t border-gray-100" id="reviews">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full inline-block mb-4">
                TESTIMONIALS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 mb-4">{t.home_testimonials_heading}</h2>
              <p className="text-gray-500 text-base">Real stories from small businesses across Maharashtra growing with MarketingSetu.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-white p-8 rounded-3xl shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-4 text-base">★★★★★</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 font-normal">"{t.testi_1_text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform duration-300">RS</div>
                  <div>
                    <h4 className="font-bold text-gray-950 text-sm">Rahul Sharma</h4>
                    <p className="text-xs text-gray-400">{t.testi_1_role}</p>
                  </div>
                </div>
              </div>
              <div className="group bg-white p-8 rounded-3xl shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-4 text-base">★★★★★</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 font-normal">"{t.testi_2_text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform duration-300">PM</div>
                  <div>
                    <h4 className="font-bold text-gray-950 text-sm">Priya Mehta</h4>
                    <p className="text-xs text-gray-400">{t.testi_2_role}</p>
                  </div>
                </div>
              </div>
              <div className="group bg-white p-8 rounded-3xl shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-4 text-base">★★★★★</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 font-normal">"{t.testi_3_text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform duration-300">AK</div>
                  <div>
                    <h4 className="font-bold text-gray-950 text-sm">Anil Kulkarni</h4>
                    <p className="text-xs text-gray-400">{t.testi_3_role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-950 rounded-3xl p-10 sm:p-16 text-center text-white shadow-z24 relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">{t.home_cta_heading}</h2>
                <p className="text-gray-400 text-base sm:text-lg mb-8 font-normal">{t.home_cta_description}</p>
                <button
                  onClick={() => openWhatsApp()}
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-z12 hover:shadow-z20 transition-all cursor-pointer"
                >
                  {t.btn_free_consultation}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
