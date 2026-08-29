"use client";

import { useThemeStore } from "@/store/themeStore";
import { TranslationDictionary } from "@/translation";
import { InteractiveShowcase, PageWrapper, PricingCard, TestimonialCard, useWhatsApp } from "@/views/home-page/component";
import { getPricingPlans, getTestimonialsData, translations } from "@/views/home-page/data";
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

  const getTranslatedPlans = () => getPricingPlans(t);
  const getTranslatedTestimonials = () => getTestimonialsData(t);

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
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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
              <div className="flex justify-center items-center gap-2.5 mt-6">
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
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-outline/60 overflow-hidden" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Center Aligned Header (Matching Other Sections) */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-paper border border-outline px-3 py-1 rounded-full inline-block mb-4">
                CORE PRODUCTS & ADD-ONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary mb-4">
                Digital Business Cards & Custom Landing Pages
              </h2>
              <p className="text-secondary text-base sm:text-lg">
                Our core digital identity solutions powered by automated WhatsApp messaging and customer growth add-ons.
              </p>
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
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary mb-4">
                {t.home_pricing_heading}
              </h2>
              <p className="text-secondary text-base sm:text-lg">
                {t.home_pricing_subheading || t.home_pricing_subtext}
              </p>
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
