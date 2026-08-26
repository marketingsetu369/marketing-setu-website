"use client";

import { useThemeStore } from "@/store/themeStore";
import { TranslationDictionary } from "@/translation";
import { InteractiveShowcase, PageWrapper, PricingCard, TestimonialCard, useWhatsApp } from "@/views/home-page/component";
import { pricingPlans, testimonialsData, translations } from "@/views/home-page/data";
import CafeCardView from "@/views/home-page/hero-section/CafeCardView";
import MarketingSetuCardView from "@/views/home-page/hero-section/MarketingSetuCardView";
import ParlourCardView from "@/views/home-page/hero-section/ParlourCardView";
import PortfolioCardView from "@/views/home-page/hero-section/PortfolioCardView";
import SolarCardView from "@/views/home-page/hero-section/SolarCardView";
import TwoWheelerCardView from "@/views/home-page/hero-section/TwoWheelerCardView";
import Link from "next/link";
import { useState } from "react";

export default function HomeView() {
  const { openWhatsApp } = useWhatsApp();
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;
  const [activeCardIndex, setActiveCardIndex] = useState(5);

  const carouselCards = [
    {
      id: "card-1",
      layoutType: "cafe-artisan",
      title: "Cafe",
      category: "Cafe",
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
      title: "Solar",
      category: "Solar",
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
      title: "Parlour",
      category: "Parlour",
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
      title: "Two Wheeler Broker",
      category: "Two Wheeler Broker",
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
      title: "Personal Portfolio",
      category: "Personal Portfolio",
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
      title: "Default",
      category: "Default",
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

      if (plan.id === "default-card" || plan.id === "quick-connect") {
        badge = t.plan_quick_badge;
        name = t.plan_quick_name;
        price = t.plan_quick_price;
        description = t.plan_quick_desc;
      } else if (plan.id === "category-card" || plan.id === "smart-connect") {
        badge = t.plan_smart_badge;
        name = t.plan_smart_name;
        price = t.plan_smart_price;
        description = t.plan_smart_desc;
      } else if (plan.id === "custom-website" || plan.id === "power-connect") {
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

  const getTranslatedTestimonials = () => {
    return testimonialsData.slice(0, 3).map((tItem, index) => {
      const num = index + 1;
      const textKey = `testi_${num}_text` as keyof TranslationDictionary;
      const roleKey = `testi_${num}_role` as keyof TranslationDictionary;
      return {
        ...tItem,
        text: t[textKey] || tItem.text,
        role: t[roleKey] || tItem.role,
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
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-primary max-w-4xl mx-auto leading-[1.1] mb-6">
              All-in-One Digital Marketing Platform <br />
              <span className="text-brand-main font-medium">for Small Businesses</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Build your digital presence, connect with customers, manage your marketing, and grow your business — all from one simple platform.
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
                <span className="inline-block px-3 py-1 rounded-full bg-brand-lighter text-brand-dark font-semibold text-xs uppercase tracking-wider mb-2 border border-brand-light/40 shadow-xs">
                  {carouselCards[activeCardIndex].category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight">
                  {carouselCards[activeCardIndex].title}
                </h3>
              </div>

              {/* Coverflow Carousel Outer Stage */}
              <div className="relative flex items-center justify-center min-h-[540px] py-4">
                
                {/* Left Carousel Circular Arrow Button */}
                <button
                  onClick={() => setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : carouselCards.length - 1))}
                  className="absolute left-2 sm:left-8 z-40 w-12 h-12 rounded-full bg-white text-emerald-600 shadow-xl border border-gray-100 flex items-center justify-center text-xl font-semibold hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  aria-label="Previous Slide"
                >
                  &larr;
                </button>

                {/* Right Carousel Circular Arrow Button */}
                <button
                  onClick={() => setActiveCardIndex((prev) => (prev < carouselCards.length - 1 ? prev + 1 : 0))}
                  className="absolute right-2 sm:right-8 z-40 w-12 h-12 rounded-full bg-white text-emerald-600 shadow-xl border border-gray-100 flex items-center justify-center text-xl font-semibold hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  aria-label="Next Slide"
                >
                  <span>&rarr;</span>
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
                          ) : card.layoutType === "solar-tech" ? (
                            <SolarCardView isCenter={isActive} />
                          ) : card.layoutType === "personal-portfolio" ? (
                            <PortfolioCardView isCenter={isActive} />
                          ) : card.layoutType === "default-marketing-setu" ? (
                            <MarketingSetuCardView isCenter={isActive} />
                          ) : card.layoutType === "parlour-beauty" ? (
                            <ParlourCardView isCenter={isActive} />
                          ) : card.layoutType === "two-wheeler-broker" ? (
                            <TwoWheelerCardView isCenter={isActive} />
                          ) : (
                            <div className="w-full flex flex-col pb-4 pt-6" />
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


        {/* BRAND & STATISTICS SECTION (REPLACES HOW IT WORKS) */}
        <section className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Background Decorative Waves relative to grid container */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 select-none hidden lg:block">
              <svg className="absolute left-[6%] top-[15%] w-[320px] h-[400px] text-[#5B3DF5]/10" viewBox="0 0 100 100" fill="none">
                <path d="M-10,20 Q15,45 40,25 T90,40" stroke="currentColor" strokeWidth="0.8" fill="none" />
              </svg>
              <svg className="absolute right-[6%] top-[20%] w-[320px] h-[400px] text-[#10C85A]/10" viewBox="0 0 100 100" fill="none">
                <path d="M110,20 Q85,45 60,25 T10,40" stroke="currentColor" strokeWidth="0.8" fill="none" />
              </svg>
            </div>

            {/* Floating Badges relative to grid container */}
            <div className="absolute left-[8%] top-[35%] hidden xl:flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5B3DF5] to-[#7B61FF] text-white shadow-[0_20px_40px_rgba(91,61,245,0.25)] animate-[bounce_5s_infinite_alternate] z-10">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>

            <div className="absolute right-[10%] top-[22%] hidden xl:flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10C85A] to-[#2BE87C] text-white shadow-[0_20px_40px_rgba(16,200,90,0.25)] animate-[bounce_6s_infinite_alternate] z-10">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>

            <div className="absolute right-[8%] top-[60%] hidden xl:flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7B61FF] to-[#9B85FF] text-white shadow-[0_20px_40px_rgba(123,97,255,0.25)] animate-[bounce_4s_infinite_alternate] z-10">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>

            {/* Floating Leaves */}
            <div className="absolute left-[12%] top-[15%] hidden md:block text-2xl animate-pulse select-none pointer-events-none">🍃</div>
            <div className="absolute right-[14%] top-[80%] hidden md:block text-2xl animate-pulse select-none pointer-events-none">🍃</div>

            <div className="relative z-10">
            {/* Centered Brand Logo */}
            <div className="flex justify-center mb-8">
              <img
                src="/logo-vertical.svg"
                alt="MarketingSetu Logo"
                className="h-20 w-auto object-contain"
              />
            </div>

            {/* Smart Marketing Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-primary leading-tight mb-6">
                Smart Marketing for<br />
                <span className="text-[#5B3DF5]">Stronger</span> <span className="text-[#10C85A]">Businesses</span>
              </h2>
              <p className="text-secondary text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-normal">
                All-in-one digital platform to build your brand, connect with customers, and grow faster in the digital world.
              </p>
            </div>

            {/* Stats White Grid Box */}
            <div className="bg-paper rounded-[24px] sm:rounded-[32px] p-5 md:p-6 lg:p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 shadow-card items-center relative z-10">
              {/* Stat Column 1 */}
              <div className="flex items-center gap-3 sm:gap-4 md:justify-center px-2 lg:px-4">
                <div className="w-11 h-11 rounded-full bg-[#EFEBFF] flex items-center justify-center text-[#5B3DF5] flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl lg:text-2xl font-semibold text-primary leading-tight">25,000+</h4>
                  <p className="text-[10px] lg:text-xs text-secondary font-medium tracking-wide mt-0.5">Businesses Trust us</p>
                </div>
              </div>

              {/* Stat Column 2 */}
              <div className="flex items-center gap-3 sm:gap-4 md:justify-center px-2 lg:px-4 py-4 md:py-0">
                <div className="w-11 h-11 rounded-full bg-[#E5F9ED] flex items-center justify-center text-[#10C85A] flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl lg:text-2xl font-semibold text-primary leading-tight">150,000+</h4>
                  <p className="text-[10px] lg:text-xs text-secondary font-medium tracking-wide mt-0.5">Digital Profiles Created</p>
                </div>
              </div>

              {/* Stat Column 3 */}
              <div className="flex items-center gap-3 sm:gap-4 md:justify-center px-2 lg:px-4">
                <div className="w-11 h-11 rounded-full bg-[#EFEBFF] flex items-center justify-center text-[#5B3DF5] flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl lg:text-2xl font-semibold text-primary leading-tight">3M+</h4>
                  <p className="text-[10px] lg:text-xs text-secondary font-medium tracking-wide mt-0.5">Leads Generated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* SERVICES SECTION */}
        <section className="py-24 bg-background overflow-hidden" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-paper px-3 py-1 rounded-full inline-block mb-4 border border-outline">
                CORE PRODUCTS & ADD-ONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary mb-4">Digital Business Cards & Custom Landing Pages</h2>
              <p className="text-secondary text-base sm:text-lg">Our core digital identity solutions powered by automated WhatsApp and customer growth add-ons.</p>
            </div>

            <InteractiveShowcase t={t} />
          </div>
        </section>

        {/* PRICING SECTION */}
        <section className="py-24 bg-background relative overflow-hidden" id="pricing">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlN2U1ZTQiLz48L3N2Zz4=')] opacity-30 dark:opacity-[0.07] z-0"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-background border border-outline px-3 py-1 rounded-full inline-block mb-4">
                {t.home_pricing_eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary mb-4">{t.home_pricing_heading}</h2>
              <p className="text-secondary text-base sm:text-lg">{t.home_pricing_subtext}</p>
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
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-neutral px-3 py-1 rounded-full inline-block mb-4">
                WHY MARKETINGSETU
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary mb-4">Results-driven. Reliable.<br />Affordable.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
              <div className="group flex gap-4 p-6 rounded-2xl bg-paper shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 rounded-xl flex items-center justify-center font-semibold group-hover:scale-110 transition-transform duration-300">⚡</div>
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-1">{t.why_us_f1_title}</h4>
                  <p className="text-secondary text-sm leading-relaxed">{t.why_us_f1_desc}</p>
                </div>
              </div>
              <div className="group flex gap-4 p-6 rounded-2xl bg-paper shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 rounded-xl flex items-center justify-center font-semibold group-hover:scale-110 transition-transform duration-300">₹</div>
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-1">{t.why_us_f2_title}</h4>
                  <p className="text-secondary text-sm leading-relaxed">{t.why_us_f2_desc}</p>
                </div>
              </div>
              <div className="group flex gap-4 p-6 rounded-2xl bg-paper shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 rounded-xl flex items-center justify-center font-semibold group-hover:scale-110 transition-transform duration-300">✓</div>
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-1">{t.why_us_f3_title}</h4>
                  <p className="text-secondary text-sm leading-relaxed">{t.why_us_f3_desc}</p>
                </div>
              </div>
              <div className="group flex gap-4 p-6 rounded-2xl bg-paper shadow-card hover:shadow-z16 hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400 rounded-xl flex items-center justify-center font-semibold group-hover:scale-110 transition-transform duration-300">👥</div>
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-1">{t.why_us_f4_title}</h4>
                  <p className="text-secondary text-sm leading-relaxed">{t.why_us_f4_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-gray-50" id="reviews">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-background border border-outline px-3 py-1 rounded-full inline-block mb-4">
                TESTIMONIALS
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary mb-4">{t.home_testimonials_heading}</h2>
              <p className="text-secondary text-base">Real stories from small businesses across Maharashtra growing with MarketingSetu.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {getTranslatedTestimonials().map((item, idx) => (
                <TestimonialCard key={idx} testimonial={item} />
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="py-20 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-950 rounded-3xl p-10 sm:p-16 text-center text-white shadow-z24 relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">{t.home_cta_heading}</h2>
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
