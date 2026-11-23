"use client";

import { useThemeStore } from "@/store/themeStore";
import {
  CafeCardView,
  MarketingSetuCardView,
  ParlourCardView,
  PortfolioCardView,
  SolarCardView,
  TwoWheelerCardView,
} from "@/views/home-page/card-views";
import { FeatureShowcase, HomeFaq, HomeTestimonials, InstantCardGenerator, InteractiveShowcase, PageWrapper, PricingCard, useWhatsApp } from "@/views/home-page/component";
import { getPricingPlans, translations } from "@/views/home-page/data";
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
      title: t.demo_title_cafe || "Cafe",
      category: t.demo_cat_cafe || "Cafe",
      avatar: "☕",
      tagline: "Freshly Roasted Organic Coffee",
      bgClass: "bg-[#2A170A]",
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
      title: t.demo_title_solar || "Solar",
      category: t.demo_cat_solar || "Solar",
      avatar: "☀️",
      tagline: "Zero Electricity Bill Guarantee",
      bgClass: "bg-[#092B2B]",
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
      title: t.demo_title_parlour || "Parlour",
      category: t.demo_cat_parlour || "Parlour",
      avatar: "💅",
      tagline: "Radiant Skin & Modern Hair Styling",
      bgClass: "bg-[#2B0E1D]",
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
      title: t.demo_title_two_wheeler || "Two Wheeler Broker",
      category: t.demo_cat_two_wheeler || "Two Wheeler Broker",
      avatar: "🏍️",
      tagline: "Best Deals on Pre-Owned & New Bikes",
      bgClass: "bg-[#281309]",
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
      title: t.demo_title_portfolio || "Personal Portfolio",
      category: t.demo_cat_portfolio || "Personal Portfolio",
      avatar: "👨‍💻",
      tagline: "Crafting Digital Experiences",
      bgClass: "bg-[#161233]",
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
      title: t.demo_title_default || "Default",
      category: t.demo_cat_default || "Default",
      avatar: "🚀",
      tagline: "Original Smart Business Page",
      bgClass: "bg-[#0B1528]",
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

  const getTranslatedPlans = () => getPricingPlans(t);

  return (
    <PageWrapper>
      <div className="font-sans text-primary bg-background">
        {/* HERO SECTION */}
        <section className="relative pt-26 pb-8 md:pb-8 overflow-hidden bg-background">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            
             {/* Stateful 3D Coverflow Interactive Carousel */}
            <div className="relative max-w-7xl mx-auto pb-18 px-4 overflow-hidden">

              {/* Active Category Name Title Above Slider */}
              <div className="text-center mb-4 transition-all duration-300">
                <span className="inline-block px-3.5 py-1 rounded-full bg-brand-lighter text-brand-dark font-semibold text-xs uppercase tracking-wider border border-brand-light/40 shadow-xs">
                  {carouselCards[activeCardIndex].category}
                </span>
                {carouselCards[activeCardIndex].title !== carouselCards[activeCardIndex].category && (
                  <h3 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight mt-2">
                    {carouselCards[activeCardIndex].title}
                  </h3>
                )}
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
                        className={`absolute w-[265px] sm:w-[285px] h-[490px] rounded-[36px] bg-white text-gray-950 transition-all duration-500 ease-out cursor-pointer select-none overflow-hidden ${isActive
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
              <div className="flex justify-center items-center gap-2.5 mt-8">
                {carouselCards.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCardIndex(idx)}
                    className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${idx === activeCardIndex
                      ? "w-8 bg-brand-main shadow-md"
                      : "w-3 bg-gray-300 hover:bg-gray-400"
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Headline and Get Started CTA */}
            <div className="max-w-2xl mx-auto pt-5 pb-4">
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-primary leading-snug mb-2.5">
                All-in-One Digital Marketing Platform <br />
                <span className="text-brand-secondary font-medium">for Small Businesses</span>
              </h1>
              <p className="text-xs sm:text-sm text-secondary max-w-lg mx-auto mb-7 leading-relaxed font-normal">
                Build your digital presence, connect with customers, manage your marketing, and grow your business — all from one simple platform.
              </p>

              {/* Action Buttons Row: Free Consultation & Google Play Store in one line */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
                {/* Free Consultation CTA Button */}
                <button
                  onClick={() => openWhatsApp()}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:opacity-90 text-background font-semibold text-base rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer h-[52px]"
                >
                  <span>{t.btn_free_consultation || "Free Consultation"}</span>
                  <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <span className="text-xs sm:text-sm text-secondary font-medium uppercase tracking-wider">or</span>

                {/* Android Google Play Store Badge */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.marketingsetu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-2.5 bg-primary text-background rounded-xl border border-outline hover:scale-105 active:scale-95 transition-all shadow-md group h-[52px]"
                >
                  <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M3.6 1.8L13.8 12 3.6 22.2c-.4-.3-.6-.8-.6-1.4V3.2c0-.6.2-1.1.6-1.4z" />
                    <path fill="#34A853" d="M17.2 8.6L13.8 12l3.4 3.4 4-2.3c.7-.4.7-1.7 0-2.2l-4-2.3z" />
                    <path fill="#FBBC04" d="M3.6 1.8l10.2 10.2 3.4-3.4L6.1 1.2c-.8-.5-1.9-.3-2.5.6z" />
                    <path fill="#EA4335" d="M3.6 22.2l13.6-7.8-3.4-3.4L3.6 22.2z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <p className="text-[10px] uppercase tracking-wider opacity-70 font-medium">GET IT ON</p>
                    <p className="text-base font-semibold tracking-wide">Google Play</p>
                  </div>
                </a>
              </div>
            </div>

           
          </div>
        </section>

        {/* XPRESS-STYLE BUILD EASY FEATURE SHOWCASE SECTION */}
        <FeatureShowcase t={t} />

        {/* SERVICES / ALL FEATURES SECTION */}
        <section className="py-14 lg:py-16 bg-background border-y border-outline/50 overflow-hidden" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Center Aligned Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-secondary bg-brand-light border border-brand-secondary/20 px-3.5 py-1 rounded-full inline-block mb-3.5">
                GROWTH PLATFORM
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold tracking-tight text-primary leading-snug mb-3">
                Smart Tools to <span className="text-brand-secondary">Attract, Engage</span> & Grow Customers
              </h2>
              <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
                Powerful WhatsApp automation, interactive business pages, and daily marketing tools — built to turn everyday customer calls into repeat business.
              </p>
            </div>

            <InteractiveShowcase t={t} />
          </div>
        </section>

        {/* INSTANT LIVE CARD BUILDER SIMULATOR (Placed Before Pricing) */}
        <InstantCardGenerator t={t} />

        {/* PRICING SECTION */}
        <section className="py-14 lg:py-16 bg-background relative overflow-hidden" id="pricing">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlN2U1ZTQiLz48L3N2Zz4=')] opacity-30 dark:opacity-[0.07] z-0"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Dashed Border Feature Header Card (Option 3: Value & ROI Focused) */}
            <div className="max-w-5xl mx-auto mb-10 px-6 py-6 sm:px-10 sm:py-8 text-center rounded-[28px] sm:rounded-[36px] border-2 border-dashed border-primary/25 dark:border-white/20 bg-neutral/20 dark:bg-white/[0.02]">
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight text-primary leading-tight mb-2 font-sans">
                Everything you need to grow locally
              </h2>
              <p className="text-secondary text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto">
                Try free for 7 days — WhatsApp auto-replies, smart cards, and local landing pages.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch">
              {getTranslatedPlans().map((plan, idx) => (
                <PricingCard
                  key={idx}
                  plan={plan}
                  href="/pricing"
                  t={t}
                />
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-14 lg:py-16 bg-background border-t border-outline/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-neutral px-3 py-1 rounded-full inline-block mb-3">
                {t.home_why_eyebrow || "WHY MARKETINGSETU"}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-semibold tracking-tight text-primary mb-2">{t.home_why_heading || "Results-driven. Reliable. Affordable."}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

        {/* TESTIMONIALS / WHAT OUR CLIENTS SAY */}
        <HomeTestimonials t={t} />

        {/* FREQUENTLY ASKED SECTION (Matching Reference) */}
        <HomeFaq t={t} />

        {/* BOTTOM CTA BANNER (Matching Reference Layout) */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-[1280px] mx-auto relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#0B1528] dark:bg-[#070D18] border border-white/[0.08] p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
            {/* Subtle Architectural Grid Lines & Glow Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#14B8A6_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" />
            <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-brand-main/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] bg-[#14B8A6]/25 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
              {/* Left Column: Heading, Subtitle & Action Button */}
              <div className="max-w-xl text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight leading-[1.12] text-white mb-3">
                  Ready to build your bridge?
                </h2>
                <p className="text-gray-300 text-sm sm:text-base font-normal mb-8">
                  Get started — for Free
                </p>
                <button
                  onClick={() => openWhatsApp()}
                  className="group inline-flex items-center gap-2 bg-paper text-primary font-semibold rounded-full px-7 py-3.5 text-sm sm:text-base shadow-md hover:bg-neutral hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Free Consultation</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Right Column: Or, get the app & Google Play Store badge */}
              <div className="flex flex-col gap-3 items-start">
                <p className="text-sm font-semibold text-gray-300 tracking-tight">
                  Or, get the app:
                </p>
                <a
                  href="https://play.google.com/store/apps/details?id=com.marketingsetu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-2.5 bg-brand-dark hover:bg-brand-darker text-white rounded-xl border border-white/15 hover:border-white/30 hover:scale-105 active:scale-95 transition-all shadow-md group"
                >
                  <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M3.6 1.8L13.8 12 3.6 22.2c-.4-.3-.6-.8-.6-1.4V3.2c0-.6.2-1.1.6-1.4z" />
                    <path fill="#34A853" d="M17.2 8.6L13.8 12l3.4 3.4 4-2.3c.7-.4.7-1.7 0-2.2l-4-2.3z" />
                    <path fill="#FBBC04" d="M3.6 1.8l10.2 10.2 3.4-3.4L6.1 1.2c-.8-.5-1.9-.3-2.5.6z" />
                    <path fill="#EA4335" d="M3.6 22.2l13.6-7.8-3.4-3.4L3.6 22.2z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">GET IT ON</p>
                    <p className="text-base font-semibold text-white tracking-wide">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
