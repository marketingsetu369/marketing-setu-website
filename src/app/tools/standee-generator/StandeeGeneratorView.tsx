"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { PageWrapper, PageHero, CtaBand } from "@/views/home-page/component";
import {
  FormInput,
  SectionCard,
  ColorPickerSwatch,
  FeatureCard,
  SectionHeader,
} from "@/components/ui";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PrinterIcon,
  SparklesIcon,
  WhatsappIcon,
  Store01Icon,
  ShieldCheck,
  ArrowRight01Icon,
  Share01Icon,
  SmartPhone01Icon,
  Target02Icon,
  StarIcon,
  File01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";

type StandeeType = "counter-a4" | "table-tent" | "review-standee";

export default function StandeeGeneratorView() {
  const [standeeType, setStandeeType] = useState<StandeeType>("counter-a4");
  const [businessName, setBusinessName] = useState("Royal Cafe & Bakes");
  const [tagline, setTagline] = useState("Scan to View Menu, Offers & Chat on WhatsApp");
  const [phone, setPhone] = useState("9172415858");
  const [city, setCity] = useState("Pune, Maharashtra");
  const [upiId, setUpiId] = useState("9172415858@upi");
  const [themeColor, setThemeColor] = useState("#7265E3");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  // Generate QR Code dynamically based on WhatsApp or profile link
  useEffect(() => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const targetLink = cleanPhone.length >= 10
      ? `https://wa.me/91${cleanPhone.slice(-10)}?text=Hi%20${encodeURIComponent(businessName)}!%20I%20scanned%20your%20counter%20QR%20code.`
      : `https://marketingsetu.com`;

    QRCode.toDataURL(
      targetLink,
      {
        width: 400,
        margin: 1,
        color: {
          dark: themeColor,
          light: "#FFFFFF",
        },
      },
      (err, url) => {
        if (!err && url) {
          setQrCodeUrl(url);
        }
      }
    );
  }, [businessName, phone, themeColor]);

  const handlePrint = () => {
    window.print();
  };

  // Shared input styling matching ContactForm ("Send Us a Message") exactly
  const inputBaseClass =
    "w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-grey-900/50 text-primary placeholder:text-secondary/50 font-medium text-sm transition-all duration-300 outline-none focus:border-brand-main";

  return (
    <PageWrapper>
      {/* Print Specific CSS */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #print-standee-container, #print-standee-container * {
            visibility: visible !important;
          }
          #print-standee-container {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 20mm !important;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <PageHero
        breadcrumbLabel="Tools"
        eyebrow="100% FREE TOOL • PRINT-READY DESIGN"
        center
        title={
          <>
            Free Printable QR Standee & <br className="hidden sm:inline" />
            <span className="text-brand-secondary">Counter Flyer Generator</span>
          </>
        }
        lead={
          <>
            Design instant high-resolution counter standees, table tent cards, and A4 QR flyers for your shop counter, clinic, cafe table, or billing desk. Completely free to print and save as PDF.
          </>
        }
      />

      {/* GENERATOR INTERACTIVE SECTION */}
      <section className="py-12 md:py-14 bg-background border-t border-outline/40">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Controls (7 Cols) - Reusable SectionCard and FormInput */}
            <SectionCard className="lg:col-span-7 space-y-8 no-print">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-light text-brand-main dark:text-brand-secondary flex items-center justify-center border border-brand-secondary/20 shrink-0">
                    <HugeiconsIcon icon={Store01Icon} size={22} />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
                      Standee & Flyer Details
                    </h3>
                  </div>
                </div>
                <p className="text-secondary text-sm">
                  Customize your business information and select an accent color to generate a print-ready counter design.
                </p>
              </div>

              <div className="space-y-6">

                {/* Standee Format Selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-primary tracking-wide">
                    Format / Layout Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "counter-a4", label: "A4 Flyer / Poster", icon: File01Icon },
                      { id: "table-tent", label: "Table Tent Card", icon: Store01Icon },
                      { id: "review-standee", label: "Review Standee", icon: StarIcon },
                    ].map((tpl) => {
                      const isSelected = standeeType === tpl.id;
                      const IconComp = tpl.icon;
                      return (
                        <button
                          key={tpl.id}
                          type="button"
                          onClick={() => setStandeeType(tpl.id as StandeeType)}
                          className={`p-3.5 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                            isSelected
                              ? "bg-primary text-background border-primary shadow-xs scale-[1.02]"
                              : "bg-gray-50 dark:bg-grey-900/50 text-secondary border-gray-300 dark:border-gray-700 hover:text-primary hover:border-brand-main"
                          }`}
                        >
                          <HugeiconsIcon icon={IconComp} size={20} className={isSelected ? "text-brand-secondary" : "text-secondary"} />
                          <span className="truncate max-w-full">{tpl.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Business Name */}
                <FormInput
                  label="Business / Store Name"
                  required
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Shreeram Sweets & Bakery"
                />

                {/* Tagline / Action Text */}
                <FormInput
                  label="Header Tagline / Call to Action"
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Scan to View Menu, Offers & Connect"
                />

                {/* Phone & UPI ID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput
                    label="WhatsApp Number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="91724 15858"
                  />
                  <FormInput
                    label="UPI ID"
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. shop@upi"
                  />
                </div>

                {/* Location */}
                <FormInput
                  label="Store City / Location"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Pune, Maharashtra"
                />

                {/* Color Theme */}
                <ColorPickerSwatch
                  label="Standee Accent Color"
                  colors={[
                    { hex: "#003058", name: "Navy Blue" },
                    { hex: "#089848", name: "Growth Green" },
                    { hex: "#7265E3", name: "Setu Purple" },
                    { hex: "#2563EB", name: "Royal Blue" },
                    { hex: "#0D9488", name: "Teal" },
                    { hex: "#E11D48", name: "Rose" },
                    { hex: "#181512", name: "Classic Black" },
                  ]}
                  selectedColor={themeColor}
                  onSelect={setThemeColor}
                />

                {/* Print CTA */}
                <div className="pt-2">
                  <button
                    onClick={handlePrint}
                    className="w-full py-4 px-6 rounded-xl bg-primary hover:opacity-90 text-background font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <HugeiconsIcon icon={PrinterIcon} size={18} />
                    <span>Print Standee / Save as PDF</span>
                  </button>
                </div>

              </div>

            </SectionCard>

            {/* Right Column: Live Print Canvas Preview (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center gap-6">
              
              {/* Standee Container Paper Simulation */}
              <div
                id="print-standee-container"
                ref={printRef}
                className="w-full bg-white text-gray-900 rounded-3xl p-8 border border-gray-200 shadow-card flex flex-col items-center text-center relative overflow-hidden"
              >
                
                {/* Header Curved Banner */}
                <div
                  className="w-full py-6 px-4 rounded-2xl mb-6 text-white text-center flex flex-col items-center"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor} 0%, #181512 100%)`,
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl mb-2">
                    🏪
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-white line-clamp-1">
                    {businessName || "Your Business Name"}
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-300 font-semibold mt-0.5">
                    <HugeiconsIcon icon={ShieldCheck} size={12} />
                    <span>Verified Local Business</span>
                  </div>
                </div>

                {/* Subtitle / Action Prompt */}
                <p className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-4 px-2">
                  {tagline}
                </p>

                {/* Main QR Code with Stylized Border Frame */}
                <div className="p-4 bg-white rounded-2xl border-4 border-gray-100 shadow-md mb-5 inline-block">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt="WhatsApp QR Code"
                      className="w-48 h-48 object-contain"
                    />
                  ) : (
                    <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                      Generating QR...
                    </div>
                  )}
                </div>

                {/* Instruction Pill */}
                <div
                  className="px-4 py-1.5 rounded-full text-xs font-bold mb-6 flex items-center gap-1.5 shadow-xs"
                  style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                >
                  <HugeiconsIcon icon={WhatsappIcon} size={15} />
                  <span>Scan with any Camera / Google Lens</span>
                </div>

                {/* Bottom Store Footer Details */}
                <div className="w-full pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-left">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold">Contact</span>
                    <span className="text-xs font-bold text-gray-800">+91 {phone}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold">Location</span>
                    <span className="text-xs font-bold text-gray-800 truncate">{city}</span>
                  </div>
                  {upiId && (
                    <div className="col-span-2 pt-2 border-t border-gray-100 text-center">
                      <span className="text-[10px] text-gray-500 font-medium">
                        Accepts Payments via UPI: <strong className="text-gray-800 font-bold">{upiId}</strong>
                      </span>
                    </div>
                  )}
                </div>

                {/* Branding Stamp */}
                <div className="mt-5 text-[9px] text-gray-400 font-medium flex items-center gap-1">
                  <span>Powered by</span>
                  <strong className="text-gray-600 font-bold">MarketingSetu.com</strong>
                </div>

              </div>

              {/* Digital Card Upsell Banner */}
              <div className="w-full bg-paper rounded-3xl p-6 sm:p-7 border border-outline shadow-card text-left no-print">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-light text-brand-secondary border border-brand-secondary/20 uppercase tracking-wider mb-3">
                  <HugeiconsIcon icon={SparklesIcon} size={11} /> Upgrade Your Store
                </span>
                <h4 className="text-base sm:text-lg font-bold text-primary mb-1.5 leading-snug">
                  Want Physical NFC Tap-to-Connect Cards?
                </h4>
                <p className="text-secondary text-xs leading-relaxed mb-4 font-normal">
                  MarketingSetu also provides physical Smart NFC Metal & PVC business cards that instantly open your profile on tap with zero app required.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-brand-main dark:bg-brand-secondary text-white dark:text-gray-950 px-4 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-xs"
                >
                  <span>Explore Smart NFC Cards</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                </Link>
              </div>

            </div>

          </div>

          {/* Educational Content / Use Cases Section using reusable SectionHeader and FeatureCard */}
          <div className="mt-14 pt-12 border-t border-outline/40 no-print">
            <SectionHeader
              eyebrow="Placement Ideas"
              title="Where to Place Your Print Standees"
              description="Make it easy for in-store customers to save your number, order on WhatsApp, and leave 5-star Google reviews."
            />

            <div className="grid sm:grid-cols-3 gap-6">
              <FeatureCard
                icon={<HugeiconsIcon icon={Store01Icon} size={20} />}
                title="Billing Counter & Cashier Desk"
                description="Position an acrylic standee near your billing machine so customers scan while their bill is being prepared."
              />
              <FeatureCard
                icon={<HugeiconsIcon icon={SmartPhone01Icon} size={20} />}
                title="Cafe & Restaurant Dining Tables"
                description="Use folded table tent cards so guests can view your menu, today's special dishes, and re-order drinks directly."
              />
              <FeatureCard
                icon={<HugeiconsIcon icon={Target02Icon} size={20} />}
                title="Shop Windows & Delivery Bags"
                description="Insert A4 QR flyers inside parcel boxes and stick them to your entrance door for after-hours inquiries."
              />
            </div>
          </div>

        </div>
      </section>

      {/* BOTTOM CTA BAND */}
      <div className="no-print">
        <CtaBand
          heading="Turn your walk-in visitors into repeat WhatsApp buyers."
          description="MarketingSetu automatically follows up with customers who scan your counter QR codes and contact your store."
          whatsappMessage="Hi MarketingSetu! I'm interested in your printable standees and digital business page for my store."
        />
      </div>
    </PageWrapper>
  );
}
