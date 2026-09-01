"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { PageWrapper } from "@/views/home-page/component";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PrinterIcon,
  Download01Icon,
  SparklesIcon,
  WhatsappIcon,
  Store01Icon,
  ShieldCheck,
  StarIcon,
  ArrowRight01Icon,
  Call02Icon,
  MapsLocation01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { toast } from "sonner";

type StandeeType = "table-tent" | "counter-a4" | "review-standee";

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

  return (
    <PageWrapper>
      {/* Print Specific CSS */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-standee-container, #print-standee-container * {
            visibility: visible;
          }
          #print-standee-container {
            position: fixed;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 20mm;
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

      <div className="pt-28 pb-20 bg-background min-h-screen text-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 no-print">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mb-4 uppercase tracking-wider">
              <HugeiconsIcon icon={SparklesIcon} size={14} />
              100% Free Tool • Print-Ready PDF / A4 Design
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary mb-4 leading-tight">
              Free Printable QR Standee & <br className="hidden sm:inline" />
              <span className="text-[#5B3DF5]">Counter Flyer Generator</span>
            </h1>
            <p className="text-secondary text-base sm:text-lg leading-relaxed">
              Design instant print-ready counter standees, table tent cards, and A4 QR flyers for your shop counter, restaurant table, or reception desk.
            </p>
          </div>

          {/* Builder Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            
            {/* Left Column: Form Controls (6 Cols) */}
            <div className="lg:col-span-6 bg-paper border border-outline/70 rounded-3xl p-6 sm:p-8 shadow-card no-print">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <HugeiconsIcon icon={Store01Icon} size={22} className="text-[#5B3DF5]" />
                Standee Details
              </h2>

              {/* Standee Template Selector */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                  Format / Use Case
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "counter-a4", label: "A4 Flyer / Poster", icon: "📄" },
                    { id: "table-tent", label: "Table Tent Card", icon: "⛺" },
                    { id: "review-standee", label: "Review Standee", icon: "⭐" },
                  ].map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => setStandeeType(tpl.id as StandeeType)}
                      className={`p-3 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        standeeType === tpl.id
                          ? "bg-primary text-background border-primary shadow-xs"
                          : "bg-background text-secondary border-outline hover:text-primary"
                      }`}
                    >
                      <span className="text-lg">{tpl.icon}</span>
                      <span>{tpl.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Name */}
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Business / Store Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Shreeram Sweets & Bakery"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#5B3DF5]"
                />
              </div>

              {/* Tagline / Action Text */}
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Header Tagline / Call to Action
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Scan to View Menu, Offers & Connect"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#5B3DF5]"
                />
              </div>

              {/* Phone & UPI ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="91724 15858"
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#5B3DF5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                    UPI ID / Payee Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. shop@upi"
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#5B3DF5]"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Store City / Location
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Pune, Maharashtra"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#5B3DF5]"
                />
              </div>

              {/* Color Theme */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                  🎨 Standee Accent Color
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { hex: "#7265E3", name: "Purple" },
                    { hex: "#10C85A", name: "Green" },
                    { hex: "#2563EB", name: "Blue" },
                    { hex: "#0D9488", name: "Teal" },
                    { hex: "#E11D48", name: "Rose" },
                    { hex: "#181512", name: "Black" },
                  ].map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setThemeColor(c.hex)}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      className={`w-7 h-7 rounded-full transition-transform cursor-pointer ${
                        themeColor === c.hex ? "ring-2 ring-offset-2 ring-primary scale-110" : "hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-outline/50 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handlePrint}
                  className="flex-1 py-3.5 px-5 rounded-xl bg-primary text-background font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-all cursor-pointer"
                >
                  <HugeiconsIcon icon={PrinterIcon} size={18} />
                  <span>Print Standee / Save PDF</span>
                </button>
              </div>

            </div>

            {/* Right Column: Live Print Canvas Preview (6 Cols) */}
            <div className="lg:col-span-6 flex flex-col items-center">
              
              {/* Standee Container Paper Simulation */}
              <div
                id="print-standee-container"
                ref={printRef}
                className="w-full max-w-[380px] bg-white text-gray-900 rounded-3xl p-8 border border-gray-200 shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
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
                    <div className="col-span-2 pt-2 border-t border-dashed border-gray-100 text-center">
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
              <div className="w-full max-w-[380px] mt-6 p-5 bg-paper border border-outline/70 rounded-2xl shadow-card text-left no-print">
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">
                  Want NFC Tap-to-Connect Cards?
                </h4>
                <p className="text-xs text-secondary leading-relaxed mb-3">
                  MarketingSetu provides physical Smart NFC Metal & PVC cards that open your profile on tap.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#5B3DF5] hover:text-[#4A2FE1]"
                >
                  <span>Order Smart NFC Card</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
