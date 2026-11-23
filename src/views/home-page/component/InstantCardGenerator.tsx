"use client";

import { TranslationDictionary } from "@/translation";
import { FormInput, SectionCard, ColorPickerSwatch } from "@/components/ui";
import {
  ArrowRight01Icon,
  CallIcon,
  Coffee02Icon,
  Location01Icon,
  Mail01Icon,
  Message01Icon,
  Motorbike02Icon,
  ScissorIcon,
  Share01Icon,
  ShieldCheck,
  ShoppingBag01Icon,
  SparklesIcon,
  StarIcon,
  Sun03Icon,
  WhatsappIcon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
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
        imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Artisan Almond Croissant",
        description: "Flaky butter pastry baked golden with sliced California almonds.",
        price: "₹180",
        imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop&q=80",
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
        imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Gold Hydra Glow Facial",
        description: "Deep cleansing and instant radiance skin rejuvenating therapy.",
        price: "₹2,499",
        imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&auto=format&fit=crop&q=80",
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
        imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "5kW Hybrid Battery System",
        description: "Uninterrupted 24/7 backup power with smart solar inverter.",
        price: "₹2,25,000",
        imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=400&auto=format&fit=crop&q=80",
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
        imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Instant Bike Insurance",
        description: "Comprehensive zero-depreciation insurance issued in 10 mins.",
        price: "₹1,200",
        imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&auto=format&fit=crop&q=80",
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
        imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Standard Business Audit",
        description: "Comprehensive evaluation with growth actionable insights.",
        price: "₹1,999",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80",
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
    <section className="py-20 sm:py-24 bg-background relative overflow-hidden" id="try-card">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-brand-light/10 dark:bg-brand-dark/20 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-light text-brand-main dark:text-brand-secondary border border-outline mb-3 uppercase tracking-wider">
            <HugeiconsIcon icon={SparklesIcon} size={14} />
            {t.generator_badge || "Instant Live Preview • Exact Business Page UI"}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold tracking-tight text-primary mb-3 leading-tight">
            {t.generator_title || "Design Your Digital Business Page"}{" "}
            <br className="hidden sm:inline" />
            <span className="text-brand-secondary">{t.generator_title_highlight || "in 30 Seconds"}</span>
          </h2>
          <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {t.generator_subtitle || "Fill in your actual business details below and test your live mobile-responsive Digital Business Page layout in real time."}
          </p>
        </div>

        {/* 2-Column Realtime Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Styled using reusable SectionCard and FormInput */}
          <SectionCard className="lg:col-span-7 space-y-8">
            
            {/* Header / Preset Chips */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-secondary uppercase tracking-wider block">
                {t.generator_template_label || "Pick a Starting Industry Template"}
              </label>
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
                {PRESET_CATEGORIES.map((preset) => {
                  let localizedName = preset.name.split("/")[0];
                  let PresetIcon = Coffee02Icon;
                  if (preset.id === "cafe") {
                    localizedName = t.generator_tpl_cafe || "Cafe";
                    PresetIcon = Coffee02Icon;
                  }
                  if (preset.id === "beauty") {
                    localizedName = t.generator_tpl_beauty || "Beauty Parlour";
                    PresetIcon = ScissorIcon;
                  }
                  if (preset.id === "solar") {
                    localizedName = t.generator_tpl_solar || "Solar Energy";
                    PresetIcon = Sun03Icon;
                  }
                  if (preset.id === "broker") {
                    localizedName = t.generator_tpl_broker || "Two Wheeler";
                    PresetIcon = Motorbike02Icon;
                  }
                  if (preset.id === "general") {
                    localizedName = t.generator_tpl_retail || "Retail Store";
                    PresetIcon = ShoppingBag01Icon;
                  }

                  const isSelected = selectedTemplate.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 border ${
                        isSelected
                          ? "bg-primary text-background border-primary shadow-sm scale-[1.02]"
                          : "bg-gray-50 dark:bg-grey-900/50 hover:bg-brand-light text-secondary hover:text-brand-main dark:hover:text-brand-secondary border-gray-300 dark:border-gray-700"
                      }`}
                    >
                      <HugeiconsIcon icon={PresetIcon} size={15} className={isSelected ? "text-brand-secondary" : "text-secondary"} />
                      <span>{localizedName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Fields: Reusable FormInput components */}
            <div className="space-y-6">
              {/* Field 1: Business Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormInput
                  label={t.generator_business_name_label || "Business Name"}
                  required
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder={t.generator_business_name_placeholder || "e.g. Artisanal Hearth Cafe"}
                />

                <FormInput
                  label={t.generator_category_chip_label || "Category Chip"}
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder={t.generator_category_chip_placeholder || "e.g. Cafe & Bakery"}
                />
              </div>

              {/* Tagline */}
              <FormInput
                label={t.generator_tagline_label || "Tagline / Slogan"}
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder={t.generator_tagline_placeholder || "e.g. Freshly Roasted Coffee & Handcrafted Bakes"}
              />

              {/* Field 2: Owner Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormInput
                  label={t.generator_owner_name_label || "Owner / Founder Name"}
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder={t.generator_owner_name_placeholder || "e.g. Kabir Mehta"}
                />

                <FormInput
                  label={t.generator_owner_role_label || "Owner Role / Title"}
                  type="text"
                  value={ownerRole}
                  onChange={(e) => setOwnerRole(e.target.value)}
                  placeholder={t.generator_owner_role_placeholder || "e.g. Head Barista & Owner"}
                />
              </div>

              {/* Field 3: Contact & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <FormInput
                  label={t.generator_phone_label || "Phone"}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9172415858"
                />

                <FormInput
                  label={t.generator_email_label || "Email"}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@artisanalhearth.com"
                />

                <FormInput
                  label={t.generator_city_label || "City"}
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={t.generator_city_placeholder || "e.g. Pune, Maharashtra"}
                />
              </div>
            </div>

            {/* Theme Color Picker - Reusable ColorPickerSwatch */}
            <ColorPickerSwatch
              label={t.generator_theme_color_label || "Accent Color Theme"}
              colors={COLOR_PALETTES}
              selectedColor={themeColor}
              onSelect={setThemeColor}
            />

            {/* Action CTA Button */}
            <div className="pt-2">
              <button
                onClick={handleClaimCard}
                className="w-full py-4 px-6 rounded-xl bg-primary hover:opacity-90 text-background font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <HugeiconsIcon icon={WhatsappIcon} size={19} />
                <span>{t.generator_publish_btn || "Publish This Page with MarketingSetu"}</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              </button>
              <p className="text-[11px] text-center text-secondary mt-2.5 font-medium">
                {t.generator_footer_trust || "✓ 15-Minute Onboarding • Custom Domain • WhatsApp Auto-Reply Engine"}
              </p>
            </div>

          </SectionCard>

          {/* Right Column: Exact Business Page Mobile Mockup (Matches [slug] layout) */}
          <div className="lg:col-span-5 flex justify-center sticky top-28">
            
            {/* Phone Outer Shell with rich elevation shadow and ambient glow */}
            <div className="w-[325px] sm:w-[350px] h-[640px] rounded-[48px] bg-gray-950 p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_40px_-10px_rgba(15,44,89,0.15)] border-4 border-gray-800 relative select-none flex flex-col justify-between">
              
              {/* Speaker Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-900 rounded-full z-40 flex items-center justify-center">
                <div className="w-10 h-1.5 bg-gray-700 rounded-full" />
              </div>

              {/* Business Page Viewport (Scrollable inside phone matching [slug] bg-[var(--color-grey-100)] #f4f5f7) */}
              <div className="w-full h-full bg-[#f4f5f7] text-gray-900 rounded-[38px] overflow-hidden flex flex-col relative shadow-inner">
                
                {/* Scroll Area */}
                <div className="flex-1 overflow-y-auto pb-16 scrollbar-none">
                  
                  {/* 1. EXACT BUSINESS HEADER (Matches BusinessHeader.tsx) */}
                  <header
                    className="pt-10 pb-7 px-4 text-center flex flex-col items-center relative rounded-bl-[44px] rounded-br-[44px]"
                    style={{
                      background: `linear-gradient(to bottom, ${themeColor}43 0%, ${themeColor}23 60%, ${themeColor}03 100%)`,
                    }}
                  >
                    {/* Share button */}
                    <div className="absolute top-3.5 right-3.5 z-20">
                      <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-800">
                        <HugeiconsIcon icon={Share01Icon} size={14} />
                      </div>
                    </div>

                    {/* Logo Avatar */}
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-3 border-white mb-3 overflow-hidden p-1">
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
                      <p className="text-[11px] text-gray-600 font-normal mb-2.5 line-clamp-1 max-w-[240px]">
                        {tagline}
                      </p>
                    )}

                    {/* Category Chip */}
                    {categoryName && (
                      <span
                        className="text-white text-[11px] font-semibold px-3.5 py-1 rounded-full tracking-wide shadow-sm"
                        style={{ backgroundColor: themeColor }}
                      >
                        {categoryName}
                      </span>
                    )}

                    {/* Quick 4-Action Grid */}
                    <div className="grid grid-cols-4 gap-2 w-full mt-5 px-1">
                      {/* Call */}
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-700">
                          <HugeiconsIcon icon={CallIcon} size={16} />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-900">Call</span>
                      </div>

                      {/* WhatsApp */}
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#10C85A]">
                          <HugeiconsIcon icon={WhatsappIcon} size={16} />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-900">WhatsApp</span>
                      </div>

                      {/* Email */}
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-700">
                          <HugeiconsIcon icon={Mail01Icon} size={16} />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-900">Email</span>
                      </div>

                      {/* Location */}
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-700">
                          <HugeiconsIcon icon={Location01Icon} size={16} />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-900">Location</span>
                      </div>
                    </div>
                  </header>

                  {/* 2. EXACT OWNER CARD (Matches OwnerCard.tsx shadow-card) */}
                  <div className="px-3.5 mt-3.5">
                    <div className="bg-white rounded-[22px] p-3.5 shadow-card border border-gray-100/60">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-xs"
                          style={{ backgroundColor: primaryLight, color: themeColor }}
                        >
                          {ownerName.charAt(0) || "O"}
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-1">
                            <h3 className="font-bold text-gray-950 text-xs truncate">
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
                  </div>

                  {/* 3. PRODUCTS & SERVICES (Matches [slug] ProductsSection.tsx exactly) */}
                  <div className="bg-white mx-3.5 mt-3.5 rounded-[22px] p-3.5 shadow-card border border-gray-100/60">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h4 className="text-xs font-bold text-gray-950 tracking-tight">
                          {t.bp_products_heading || "Products & Services"}
                        </h4>
                        <p className="text-[9px] text-gray-400 font-medium">Browse & order directly</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: primaryLight, color: themeColor }}>
                        {selectedTemplate.products.length} Items
                      </span>
                    </div>

                    {/* Horizontal scrollable cards with image, price & styled enquiry CTA matching ProductsSection.tsx */}
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
                      {selectedTemplate.products.map((prod, idx) => (
                        <div
                          key={idx}
                          className="w-[172px] flex-shrink-0 bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-0.5 transition-all"
                        >
                          {/* Image Box matching ProductCard aspect-square */}
                          <div className="aspect-[16/10] relative bg-gray-100 overflow-hidden">
                            {prod.imageUrl ? (
                              <img
                                src={prod.imageUrl}
                                alt={prod.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div
                                className="w-full h-full flex items-center justify-center text-2xl"
                                style={{ backgroundColor: primaryLight, color: themeColor }}
                              >
                                {selectedTemplate.avatarIcon}
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="p-3 flex-grow flex flex-col justify-between">
                            <div>
                              <h5 className="font-bold text-gray-950 text-[11px] tracking-tight truncate capitalize">
                                {prod.name}
                              </h5>
                              <p className="text-[9px] text-gray-500 line-clamp-2 mt-0.5 mb-2 font-medium leading-relaxed">
                                {prod.description}
                              </p>
                            </div>

                            <div className="mt-auto pt-2 border-t border-gray-100">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[12px] font-bold text-emerald-600">
                                  {prod.price}
                                </span>
                                <span className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">
                                  In Stock
                                </span>
                              </div>
                              <button
                                onClick={handleClaimCard}
                                className="w-full bg-transparent hover:bg-gray-50 text-[10px] py-1.5 rounded-lg font-bold active:scale-95 transition-all border text-center cursor-pointer"
                                style={{ borderColor: themeColor, color: themeColor }}
                              >
                                Enquire Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. TESTIMONIAL CARD (Matches TestimonialsSection.tsx shadow-card) */}
                  <div className="bg-white mx-3.5 mt-3.5 rounded-[22px] p-3.5 shadow-card border border-gray-100/60 text-center">
                    <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                      {[...Array(selectedTemplate.testimonial.rating)].map((_, i) => (
                        <HugeiconsIcon key={i} icon={StarIcon} size={11} className="fill-current text-amber-400" />
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-700 italic mb-2 line-clamp-2 leading-relaxed">
                      &ldquo;{selectedTemplate.testimonial.comment}&rdquo;
                    </p>
                    <p className="text-[10px] font-bold text-gray-950">
                      {selectedTemplate.testimonial.name}
                    </p>
                    <p className="text-[9px] text-gray-400 font-medium">
                      {selectedTemplate.testimonial.role}
                    </p>
                  </div>

                  {/* 5. LOCATION & MAP (Matches LocationSection.tsx shadow-card) */}
                  <div className="bg-white mx-3.5 mt-3.5 rounded-[22px] p-3 shadow-card border border-gray-100/60 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0 shadow-xs">
                      <HugeiconsIcon icon={Location01Icon} size={15} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold text-gray-950 truncate">{city || "Location"}</p>
                      <p className="text-[9px] text-gray-500">Tap to open in Google Maps</p>
                    </div>
                  </div>

                </div>

                {/* 6. EXACT FLOATING BOTTOM CTA (Matches FloatingCta.tsx) */}
                <div className="p-2.5 bg-white/95 backdrop-blur-md border-t border-gray-100/80 flex items-center justify-between gap-2 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
                  <button
                    onClick={handleClaimCard}
                    className="flex-1 py-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer active:scale-95 transition-transform"
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
