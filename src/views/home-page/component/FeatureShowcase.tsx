"use client";

import React, { useState, useEffect } from "react";
import { TranslationDictionary } from "@/translation";
import { useWhatsApp } from "./useWhatsApp";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SmartphoneNfcIcon,
  WhatsappIcon,
  Globe02Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
  PlayIcon,
  PauseIcon,
} from "@hugeicons/core-free-icons";

interface FeatureShowcaseProps {
  t: TranslationDictionary;
}

interface SlideItem {
  id: string;
  badge: { text: string; color: string };
  quote: string;
  avatarText: string;
  title: string;
  body: string;
  category: string;
  accentBg: string;
  preview: {
    title: string;
    subtitle: string;
    tag: string;
    items: { label: string; sub: string; icon: string }[];
    stat: string;
    statLabel: string;
  };
}

export default function FeatureShowcase({ t }: FeatureShowcaseProps) {
  const { openWhatsApp } = useWhatsApp();

  const slides: SlideItem[] = [
    {
      id: "card",
      badge: {
        text: "Digital Identity",
        color: "var(--color-brand-main)",
      },
      quote: "My customers save my card and contact on WhatsApp in seconds!",
      avatarText: "DL",
      title: "Smart Digital Business Card that works on every smartphone.",
      body: "Share your business contact details, services, product catalog, Google map directions, and social handles with one smart link or QR tap. No app installation required for your customers.",
      category: "Digital Business Card",
      accentBg: "var(--color-brand-lighter)",
      preview: {
        title: "MarketingSetu Smart Card",
        subtitle: "India's #1 Digital Identity for Local Businesses",
        tag: "1-Tap Contact Save",
        items: [
          { label: "Direct WhatsApp Inquiries", sub: "Instant chat link with pre-filled message", icon: "💬" },
          { label: "Interactive Product Showcase", sub: "Photos, pricing, and service catalog", icon: "🛍️" },
          { label: "Google Map Directions & Reviews", sub: "Help walk-in customers find your shop", icon: "📍" },
        ],
        stat: "10,000+",
        statLabel: "Smart Cards Active",
      },
    },
    {
      id: "whatsapp",
      badge: {
        text: "Auto Engagement",
        color: "var(--color-brand-secondary)",
      },
      quote: "Never miss a customer inquiry, even during busy shop hours.",
      avatarText: "KM",
      title: "Automate customer follow-ups on missed calls via WhatsApp.",
      body: "When you miss a call or receive a new lead, MarketingSetu instantly sends your digital business card and greeting message on WhatsApp, keeping customers engaged without manual effort.",
      category: "WhatsApp Marketing",
      accentBg: "var(--color-success-lighter)",
      preview: {
        title: "WhatsApp Auto-Reply Engine",
        subtitle: "Instant lead engagement & greeting workflows",
        tag: "Zero Missed Leads",
        items: [
          { label: "Missed Call Auto WhatsApp", sub: "Sends catalog & card immediately", icon: "⚡" },
          { label: "Pre-filled Quick Inquiries", sub: "Customers ask with 1 click", icon: "📲" },
          { label: "Daily Call Logs & Reports", sub: "Track all inquiries inside your Android app", icon: "📊" },
        ],
        stat: "3x",
        statLabel: "Faster Inquiry Response",
      },
    },
    {
      id: "landing",
      badge: {
        text: "Custom Web Presence",
        color: "var(--color-info-dark)",
      },
      quote: "Got a fast, high-converting landing page with our own domain.",
      avatarText: "RK",
      title: "High-converting custom landing pages built for local conversions.",
      body: "Get a dedicated mobile-responsive landing page tailored to your business industry. Packed with call-to-action buttons, Google review standee integration, and direct WhatsApp booking.",
      category: "Custom Landing Pages",
      accentBg: "var(--color-warning-lighter)",
      preview: {
        title: "Mobile Landing Pages",
        subtitle: "Turn social media visitors into paying customers",
        tag: "Custom Domain Ready",
        items: [
          { label: "SEO Optimized for Google Map", sub: "Rank higher in local Pune & Maharashtra search", icon: "🔍" },
          { label: "UPI & Bank Payment Details", sub: "Receive payments directly with zero commission", icon: "₹" },
          { label: "Review & Testimonial Carousel", sub: "Build credibility and trust with real clients", icon: "⭐" },
        ],
        stat: "99.9%",
        statLabel: "Uptime & Blazing Speed",
      },
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-slide timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const current = slides[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="bg-background py-16 lg:py-24 border-t border-outline/50 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Massive Section Title matching xpress.site */}
        <h2 className="text-center font-bold text-4xl sm:text-6xl lg:text-[76px] text-primary tracking-tight leading-none mb-8 sm:mb-12">
          Build Easy.
        </h2>

        {/* Feature Split Container matching xpress.site */}
        <div
          className="rounded-[36px] sm:rounded-[44px] p-4 sm:p-6 lg:p-7 min-h-[560px] lg:min-h-[640px] grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-6 items-stretch transition-colors duration-500 shadow-xl"
          style={{ backgroundColor: current.accentBg }}
        >
          {/* Left Column: White Card with Quote, Title, Description, Progress & Controls */}
          <div className="bg-white dark:bg-gray-900 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 flex flex-col justify-between shadow-md">
            <div>
              {/* Badge + Quote */}
              <div className="relative self-start mb-6 pt-5">
                <div className="absolute left-1 top-0 z-10">
                  <span
                    className="inline-block px-3 py-1 text-white text-[11px] font-semibold tracking-wide uppercase rounded-full shadow-xs"
                    style={{ background: current.badge.color }}
                  >
                    {current.badge.text}
                  </span>
                </div>
                <div className="inline-flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full pl-1.5 pr-5 py-1.5">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-brand-main text-white font-bold text-xs flex items-center justify-center">
                    {current.avatarText}
                  </div>
                  <p className="italic text-xs sm:text-[13px] text-gray-700 dark:text-gray-300 leading-snug">
                    “{current.quote}”
                  </p>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-950 dark:text-white leading-[1.2] tracking-tight mb-4">
                {current.title}
              </h3>

              {/* Body */}
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {current.body}
              </p>
            </div>

            {/* Bottom Controls Bar */}
            <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              {/* Slide Dots / Progress */}
              <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex ? "w-8 bg-black dark:bg-white" : "w-2 bg-gray-400 hover:bg-gray-600"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 ml-1 hover:scale-105 transition-all cursor-pointer"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  <HugeiconsIcon icon={isPlaying ? PauseIcon : PlayIcon} size={12} />
                </button>
              </div>

              {/* Arrows */}
              <div className="inline-flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
                  aria-label="Previous"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
                  aria-label="Next"
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Interactive Live Preview Screen */}
          <div className="bg-white/95 dark:bg-gray-950/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 flex flex-col justify-between shadow-md border border-white/40">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-brand-main text-white text-[11px] font-bold uppercase tracking-wider">
                  {current.preview.tag}
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  {current.category}
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {current.preview.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
                {current.preview.subtitle}
              </p>

              {/* Feature Points */}
              <div className="space-y-3 mb-6">
                {current.preview.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-start gap-3.5"
                  >
                    <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        {item.label}
                      </p>
                      <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Stat & Consultation CTA */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <p className="text-xl sm:text-2xl font-black text-brand-main dark:text-brand-secondary leading-none">
                  {current.preview.stat}
                </p>
                <p className="text-[11px] text-gray-500 font-medium">
                  {current.preview.statLabel}
                </p>
              </div>

              <button
                type="button"
                onClick={() => openWhatsApp(`Hi MarketingSetu! I'd like to get started with ${current.title}.`)}
                className="px-5 py-2.5 bg-primary hover:opacity-90 text-background font-semibold text-xs sm:text-sm rounded-full inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>Free Consultation</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
