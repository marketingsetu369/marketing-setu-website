"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SparklesIcon,
  WhatsappIcon,
  CallIcon,
  Location01Icon,
  Mail01Icon,
  ShieldCheck,
  Store01Icon,
  UserIcon,
  Share01Icon,
  RupeeIcon,
  Message01Icon,
  ArrowRight01Icon,
  InstagramIcon,
  FacebookIcon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { TranslationDictionary } from "@/translation";
import { useWhatsApp } from "./useWhatsApp";

interface InstantCardGeneratorProps {
  t: TranslationDictionary;
}

interface CategoryTemplate {
  id: string;
  name: string;
  tagline: string;
  avatarIcon: string;
  primaryColor: string;
  products: {
    name: string;
    description: string;
    price: string;
    imageUrl?: string;
  }[];
  testimonial: {
    name: string;
    role: string;
    comment: string;
    rating: number;
  };
}

const PRESET_CATEGORIES: CategoryTemplate[] = [
  {
    id: "cafe",
    name: "Cafe / Bakery",
    tagline: "Freshly Brewed Coffee & Artisanal Bakes",
    avatarIcon: "☕",
    primaryColor: "#7265E3",
    products: [
      {
        name: "Specialty Hazelnut Latte",
        description: "Freshly roasted single-origin espresso with steamed oat milk.",
        price: "₹240",
      },
      {
        name: "Artisan Almond Croissant",
        description: "Flaky butter pastry baked golden with sliced California almonds.",
        price: "₹180",
      },
    ],
    testimonial: {
      name: "Rohit Deshmukh",
      role: "Regular Customer",
      comment: "Best coffee spot in town! Ordering via WhatsApp is super fast.",
      rating: 5,
    },
  },
  {
    id: "beauty",
    name: "Beauty Parlour / Salon",
    tagline: "Radiant Skin, Bridal Makeup & Modern Hair Spa",
    avatarIcon: "💅",
    primaryColor: "#E11D48",
    products: [
      {
        name: "HD Bridal Makeup Package",
        description: "Complete bridal makeover with hairstyling, draping & lashes.",
        price: "₹12,500",
      },
      {
        name: "Gold Hydra Glow Facial",
        description: "Deep cleansing and instant radiance skin rejuvenating therapy.",
        price: "₹2,499",
      },
    ],
    testimonial: {
      name: "Pooja Sharma",
      role: "Happy Bride",
      comment: "Wonderful service and booking appointments directly on card is so easy!",
      rating: 5,
    },
  },
  {
    id: "solar",
    name: "Solar & Energy Solutions",
    tagline: "Turnkey Rooftop Solar Plants & Govt Subsidy Guidance",
    avatarIcon: "☀️",
    primaryColor: "#0D9488",
    products: [
      {
        name: "3kW Residential Solar Plant",
        description: "High-efficiency mono-perc rooftop panels with net metering.",
        price: "₹1,40,000",
      },
      {
        name: "5kW Hybrid Battery System",
        description: "Uninterrupted 24/7 backup power with smart solar inverter.",
        price: "₹2,25,000",
      },
    ],
    testimonial: {
      name: "Anand Kulkarni",
      role: "Bungalow Owner",
      comment: "Zero electricity bill within 2 months of installation. Highly recommended!",
      rating: 5,
    },
  },
  {
    id: "broker",
    name: "Two Wheeler Broker",
    tagline: "Certified Pre-Owned Two Wheelers & Instant Loan Approval",
    avatarIcon: "🏍️",
    primaryColor: "#2563EB",
    products: [
      {
        name: "RTO Transfer & RC Renewal",
        description: "Fast-track RTO name transfer with verified documentation.",
        price: "₹1,800",
      },
      {
        name: "Instant Bike Insurance",
        description: "Comprehensive zero-depreciation insurance issued in 10 mins.",
        price: "₹1,200",
      },
    ],
    testimonial: {
      name: "Vikas Shinde",
      role: "Bike Buyer",
      comment: "Got my vehicle RC transferred smoothly without any hassle.",
      rating: 5,
    },
  },
  {
    id: "general",
    name: "Retail / Business Agency",
    tagline: "Premium Products, Direct Support & Quick Delivery",
    avatarIcon: "🛍️",
    primaryColor: "#7C3AED",
    products: [
      {
        name: "Complete Service Package",
        description: "Full end-to-end digital consultation and priority support.",
        price: "₹4,999",
      },
      {
        name: "Standard Business Audit",
        description: "Comprehensive evaluation with growth actionable insights.",
        price: "₹1,999",
      },
    ],
    testimonial: {
      name: "Amit Joshi",
      role: "Client",
      comment: "Transformed our digital customer reach completely!",
      rating: 5,
    },
  },
];

const COLOR_PALETTES = [
  { name: "Setu Purple", hex: "#7265E3" },
  { name: "WhatsApp Green", hex: "#10C85A" },
  { name: "Royal Blue", hex: "#2563EB" },
  { name: "Teal Cyan", hex: "#0D9488" },
  { name: "Crimson Rose", hex: "#E11D48" },
  { name: "Amber Gold", hex: "#D97706" },
];

export default function InstantCardGenerator({ t }: InstantCardGeneratorProps) {
  const { openWhatsApp } = useWhatsApp();

  // Business Page Live Form State
  const [businessName, setBusinessName] = useState("Artisanal Hearth Cafe");
  const [tagline, setTagline] = useState("Freshly Roasted Coffee & Handcrafted Bakes");
  const [categoryName, setCategoryName] = useState("Cafe & Bakery");
  const [ownerName, setOwnerName] = useState("Kabir Mehta");
  const [ownerRole, setOwnerRole] = useState("Head Barista & Owner");
  const [phone, setPhone] = useState("9172415858");
  const [email, setEmail] = useState("contact@artisanalhearth.com");
  const [city, setCity] = useState("Pune, Maharashtra");
  const [themeColor, setThemeColor] = useState("#7265E3");
  const [activeTab, setActiveTab] = useState<"header" | "products" | "reviews">("header");
  const [selectedTemplate, setSelectedTemplate] = useState<CategoryTemplate>(PRESET_CATEGORIES[0]);

  // Handle Preset Category Switching
  const handleSelectPreset = (cat: CategoryTemplate) => {
    setSelectedTemplate(cat);
    setCategoryName(cat.name);
    setTagline(cat.tagline);
    setThemeColor(cat.primaryColor);
  };

  const handleClaimCard = () => {
    const msg = `Hi MarketingSetu! I tried the Live Business Page Generator for *${businessName}* (${categoryName}) in *${city}* with color code *${themeColor}*. I would like to create my official Digital Business Page!`;
    openWhatsApp(msg);
  };

  const primaryLight = `${themeColor}12`;
  const primaryBorder = `${themeColor}28`;

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-background via-paper to-background relative overflow-hidden" id="try-card">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-brand-light/10 dark:bg-brand-dark/20 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mb-4 uppercase tracking-wider">
            <HugeiconsIcon icon={SparklesIcon} size={14} />
            {t.generator_badge || "Instant Live Preview • Exact Business Page UI"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-4 leading-tight">
            {t.generator_title || "Design Your Digital Business Page"}{" "}
            <br className="hidden sm:inline" />
            <span className="text-[#5B3DF5]">{t.generator_title_highlight || "in 30 Seconds"}</span>
          </h2>
          <p className="text-secondary text-base sm:text-lg leading-relaxed">
            {t.generator_subtitle || "Fill in your actual business details below and test your live mobile-responsive Digital Business Page layout in real time."}
          </p>
        </div>

        {/* 2-Column Realtime Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Form Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-paper border border-outline/70 rounded-3xl p-6 sm:p-8 shadow-card">
            
            {/* Header / Preset Chips */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-2.5">
                {t.generator_template_label || "⚡ Pick a Starting Industry Template"}
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_CATEGORIES.map((preset) => {
                  let localizedName = preset.name.split("/")[0];
                  if (preset.id === "cafe") localizedName = t.generator_tpl_cafe || "Cafe";
                  if (preset.id === "beauty") localizedName = t.generator_tpl_beauty || "Beauty Parlour";
                  if (preset.id === "solar") localizedName = t.generator_tpl_solar || "Solar & Energy Solutions";
                  if (preset.id === "broker") localizedName = t.generator_tpl_broker || "Two Wheeler Broker";
                  if (preset.id === "general") localizedName = t.generator_tpl_retail || "Retail";

                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                        selectedTemplate.id === preset.id
                          ? "bg-primary text-background border-primary shadow-xs scale-[1.02]"
                          : "bg-background text-secondary border-outline hover:border-outline/80 hover:text-primary"
                      }`}
                    >
                      <span>{preset.avatarIcon}</span>
                      <span>{localizedName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 1: Business Name & Tagline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  {t.generator_business_name_label || "Business Name"} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder={t.generator_business_name_placeholder || "e.g. Artisanal Hearth Cafe"}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#5B3DF5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  {t.generator_category_chip_label || "Category Chip"}
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder={t.generator_category_chip_placeholder || "e.g. Cafe & Bakery"}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#5B3DF5]"
                />
              </div>
            </div>

            {/* Tagline */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                {t.generator_tagline_label || "Tagline / Slogan"}
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder={t.generator_tagline_placeholder || "e.g. Freshly Roasted Coffee & Handcrafted Bakes"}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#5B3DF5]"
              />
            </div>

            {/* Field 2: Owner Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  {t.generator_owner_name_label || "Owner / Founder Name"}
                </label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder={t.generator_owner_name_placeholder || "e.g. Kabir Mehta"}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#5B3DF5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  {t.generator_owner_role_label || "Owner Role / Title"}
                </label>
                <input
                  type="text"
                  value={ownerRole}
                  onChange={(e) => setOwnerRole(e.target.value)}
                  placeholder={t.generator_owner_role_placeholder || "e.g. Head Barista & Owner"}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#5B3DF5]"
                />
              </div>
            </div>

            {/* Field 3: Contact & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  {t.generator_phone_label || "Phone / WhatsApp"}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9172415858"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#5B3DF5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  {t.generator_email_label || "Email"}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@artisanalhearth.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#5B3DF5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  {t.generator_city_label || "City / Location"}
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={t.generator_city_placeholder || "e.g. Pune, Maharashtra"}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#5B3DF5]"
                />
              </div>
            </div>

            {/* Theme Color Picker */}
            <div className="mb-6 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                {t.generator_theme_color_label || "🎨 Business Page Theme Color"}
              </label>
              <div className="flex items-center gap-3">
                {COLOR_PALETTES.map((palette) => (
                  <button
                    key={palette.hex}
                    type="button"
                    onClick={() => setThemeColor(palette.hex)}
                    style={{ backgroundColor: palette.hex }}
                    title={palette.name}
                    className={`w-8 h-8 rounded-full transition-all cursor-pointer ${
                      themeColor === palette.hex ? "ring-2 ring-offset-2 ring-primary scale-110 shadow-sm" : "hover:scale-105 opacity-80 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="pt-4 border-t border-outline/50">
              <button
                onClick={handleClaimCard}
                className="w-full py-4 px-6 rounded-2xl text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-z12 hover:shadow-z20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${themeColor} 0%, #10C85A 100%)`,
                }}
              >
                <HugeiconsIcon icon={WhatsappIcon} size={20} />
                <span>{t.generator_publish_btn || "Publish This Page with MarketingSetu"}</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
              </button>
              <p className="text-[11px] text-center text-secondary mt-2">
                {t.generator_footer_trust || "✓ 15-Minute Onboarding • Customized Domain / Subdomain • WhatsApp Auto-Reply Engine"}
              </p>
            </div>

          </div>

          {/* Right Column: Exact Business Page Mobile Mockup (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center sticky top-28">
            
            {/* Phone Outer Shell */}
            <div className="w-[315px] sm:w-[335px] h-[620px] rounded-[44px] bg-gray-950 p-3 shadow-2xl border-4 border-gray-800 relative select-none flex flex-col justify-between">
              
              {/* Speaker Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-900 rounded-full z-40 flex items-center justify-center">
                <div className="w-10 h-1.5 bg-gray-700 rounded-full" />
              </div>

              {/* Business Page Viewport (Scrollable inside phone) */}
              <div className="w-full h-full bg-[var(--color-grey-100,#f4f5f7)] text-gray-900 rounded-[34px] overflow-hidden flex flex-col relative shadow-inner">
                
                {/* Scroll Area */}
                <div className="flex-1 overflow-y-auto pb-16 scrollbar-none">
                  
                  {/* 1. EXACT BUSINESS HEADER COMPONENT UI */}
                  <header
                    className="pt-10 pb-6 px-4 text-center flex flex-col items-center relative rounded-bl-[36px] rounded-br-[36px]"
                    style={{
                      background: `linear-gradient(to bottom, ${themeColor}43 0%, ${themeColor}23 60%, ${themeColor}03 100%)`,
                    }}
                  >
                    {/* Share button */}
                    <div className="absolute top-3 right-3 z-20">
                      <div className="w-7 h-7 rounded-full bg-white shadow-xs flex items-center justify-center text-gray-800">
                        <HugeiconsIcon icon={Share01Icon} size={13} />
                      </div>
                    </div>

                    {/* Logo Avatar */}
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md border-3 border-white mb-2.5 overflow-hidden p-1">
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center text-2xl border"
                        style={{ backgroundColor: primaryLight, color: themeColor, borderColor: primaryBorder }}
                      >
                        {selectedTemplate.avatarIcon}
                      </div>
                    </div>

                    {/* Business Name with Verified Badge */}
                    <div className="flex items-center gap-1.5 justify-center mb-1 max-w-full px-2">
                      <h1 className="text-base font-bold text-gray-900 tracking-tight truncate min-w-0">
                        {businessName || "Your Business Name"}
                      </h1>
                      <HugeiconsIcon icon={ShieldCheck} size={16} color={themeColor} className="flex-shrink-0" />
                    </div>

                    {/* Tagline */}
                    {tagline && (
                      <p className="text-[11px] text-gray-600 font-normal mb-2.5 line-clamp-1">
                        {tagline}
                      </p>
                    )}

                    {/* Category Chip */}
                    {categoryName && (
                      <span
                        className="text-white text-[11px] font-semibold px-3 py-1 rounded-full tracking-wide shadow-xs"
                        style={{ backgroundColor: themeColor }}
                      >
                        {categoryName}
                      </span>
                    )}

                    {/* Quick 4-Action Grid */}
                    <div className="grid grid-cols-4 gap-2 w-full mt-5 px-1">
                      {/* Call */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center text-gray-700">
                          <HugeiconsIcon icon={CallIcon} size={16} />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-900">Call</span>
                      </div>

                      {/* WhatsApp */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center text-[#10C85A]">
                          <HugeiconsIcon icon={WhatsappIcon} size={16} />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-900">WhatsApp</span>
                      </div>

                      {/* Email */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center text-gray-700">
                          <HugeiconsIcon icon={Mail01Icon} size={16} />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-900">Email</span>
                      </div>

                      {/* Location */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center text-gray-700">
                          <HugeiconsIcon icon={Location01Icon} size={16} />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-900">Location</span>
                      </div>
                    </div>
                  </header>

                  {/* 2. EXACT OWNER CARD COMPONENT UI */}
                  <div className="px-3.5 mt-3.5 space-y-3">
                    <div className="bg-white rounded-[20px] p-3.5 shadow-sm border border-gray-100/80">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                          style={{ backgroundColor: primaryLight, color: themeColor }}
                        >
                          {ownerName.charAt(0) || "O"}
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-1">
                            <h3 className="font-bold text-gray-900 text-xs truncate">
                              {ownerName || "Business Owner"}
                            </h3>
                            <HugeiconsIcon icon={ShieldCheck} size={14} color={themeColor} />
                          </div>
                          <p className="text-[10px] text-gray-500 font-semibold truncate">
                            {ownerRole || "Founder"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 3. EXACT PRODUCTS & SERVICES COMPONENT UI */}
                    <div className="bg-white rounded-[20px] p-3.5 shadow-sm border border-gray-100/80">
                      <div className="flex justify-between items-center mb-2.5">
                        <h4 className="text-xs font-bold text-gray-900">
                          {t.bp_products_heading || "Products & Services"}
                        </h4>
                        <span className="text-[10px] font-bold" style={{ color: themeColor }}>
                          {selectedTemplate.products.length} Items
                        </span>
                      </div>

                      <div className="space-y-2">
                        {selectedTemplate.products.map((prod, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between"
                          >
                            <div className="min-w-0 pr-2">
                              <p className="text-xs font-bold text-gray-900 truncate">
                                {prod.name}
                              </p>
                              <p className="text-[10px] text-gray-500 line-clamp-1">
                                {prod.description}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-emerald-600 flex-shrink-0">
                              {prod.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. EXACT TESTIMONIALS / REVIEWS COMPONENT UI */}
                    <div className="bg-white rounded-[20px] p-3.5 shadow-sm border border-gray-100/80 text-center">
                      <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                        {[...Array(selectedTemplate.testimonial.rating)].map((_, i) => (
                          <HugeiconsIcon key={i} icon={StarIcon} size={12} className="fill-current text-amber-400" />
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-600 italic mb-2 line-clamp-2">
                        &ldquo;{selectedTemplate.testimonial.comment}&rdquo;
                      </p>
                      <p className="text-[10px] font-bold text-gray-900">
                        {selectedTemplate.testimonial.name}
                      </p>
                      <p className="text-[9px] text-gray-400">
                        {selectedTemplate.testimonial.role}
                      </p>
                    </div>

                    {/* 5. LOCATION / MAP CARD UI */}
                    <div className="bg-white rounded-[20px] p-3 shadow-sm border border-gray-100/80 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                        <HugeiconsIcon icon={Location01Icon} size={15} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold text-gray-900 truncate">{city || "Location"}</p>
                        <p className="text-[9px] text-gray-500">Tap to open in Google Maps</p>
                      </div>
                    </div>

                  </div>

                </div>

                {/* 6. EXACT FLOATING BOTTOM CTA UI */}
                <div className="p-2.5 bg-white/95 backdrop-blur-md border-t border-gray-100 flex items-center justify-between gap-2 shadow-lg">
                  <button
                    onClick={handleClaimCard}
                    className="flex-1 py-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-transform"
                    style={{ backgroundColor: themeColor }}
                  >
                    <HugeiconsIcon icon={Message01Icon} size={14} />
                    <span>Enquire Now</span>
                  </button>
                  <button
                    onClick={handleClaimCard}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border cursor-pointer active:scale-95 transition-transform"
                    style={{ backgroundColor: primaryLight, color: themeColor, borderColor: primaryBorder }}
                  >
                    <HugeiconsIcon icon={CallIcon} size={14} />
                    <span>Call Store</span>
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
