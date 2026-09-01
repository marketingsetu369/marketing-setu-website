"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { PageWrapper } from "@/views/home-page/component";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PrinterIcon,
  Download01Icon,
  SparklesIcon,
  StarIcon,
  Store01Icon,
  MapsLocation01Icon,
  ShieldCheck,
  Copy01Icon,
  Tick01Icon,
  ArrowRight01Icon,
  FavouriteIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { toast } from "sonner";

export default function GoogleReviewQrView() {
  const [businessName, setBusinessName] = useState("Dr. Kalai's Skin Clinic");
  const [doctorOrOwnerName, setDoctorOrOwnerName] = useState("Dr. E. Kalaivani");
  const [qualifications, setQualifications] = useState("M.D.(DVL), DNB(DVL)");
  const [reviewLinkOrPlaceId, setReviewLinkOrPlaceId] = useState("");
  const [phone, setPhone] = useState("93634 42004");
  const [address, setAddress] = useState("GV Hospital, 5/1, Thiru Vi Ka Road, Gowripuram, Karur, Tamil Nadu 639001");
  const [themeStyle, setThemeStyle] = useState<"vintage-gold" | "royal-blue" | "emerald-green" | "maroon-rose">("vintage-gold");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Compute actual target review link
  const getComputedReviewUrl = () => {
    const raw = reviewLinkOrPlaceId.trim();
    if (!raw) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessName + " " + address)}`;
    }
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      return raw;
    }
    // If user entered Place ID (e.g. ChIJ...)
    if (raw.length > 20 && !raw.includes(" ")) {
      return `https://search.google.com/local/writereview?placeid=${raw}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(raw)}`;
  };

  useEffect(() => {
    const targetUrl = getComputedReviewUrl();
    QRCode.toDataURL(
      targetUrl,
      {
        width: 440,
        margin: 1,
        color: {
          dark: "#1A1A1A",
          light: "#FFFFFF",
        },
      },
      (err, url) => {
        if (!err && url) {
          setQrCodeUrl(url);
        }
      }
    );
  }, [businessName, reviewLinkOrPlaceId, address]);

  const handleCopyLink = () => {
    const link = getComputedReviewUrl();
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Google Review link copied!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Theme color presets
  const themes = {
    "vintage-gold": {
      bannerBg: "linear-gradient(135deg, #CA9E42 0%, #A67C24 100%)",
      bannerText: "#FFFFFF",
      bannerSubText: "#2C2210",
      goldAccent: "#C19232",
      badgeBg: "#F4EBD7",
      footerBg: "linear-gradient(135deg, #CA9E42 0%, #B88B2E 100%)",
      bgColor: "#FCF8F2",
      bracketColor: "#2C2210",
      pillBorder: "#D8BC84",
    },
    "royal-blue": {
      bannerBg: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
      bannerText: "#FFFFFF",
      bannerSubText: "#0F172A",
      goldAccent: "#2563EB",
      badgeBg: "#EFF6FF",
      footerBg: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
      bgColor: "#F8FAFC",
      bracketColor: "#1E3A8A",
      pillBorder: "#93C5FD",
    },
    "emerald-green": {
      bannerBg: "linear-gradient(135deg, #059669 0%, #047857 100%)",
      bannerText: "#FFFFFF",
      bannerSubText: "#064E3B",
      goldAccent: "#059669",
      badgeBg: "#ECFDF5",
      footerBg: "linear-gradient(135deg, #059669 0%, #065F46 100%)",
      bgColor: "#F0FDF4",
      bracketColor: "#064E3B",
      pillBorder: "#6EE7B7",
    },
    "maroon-rose": {
      bannerBg: "linear-gradient(135deg, #BE123C 0%, #9F1239 100%)",
      bannerText: "#FFFFFF",
      bannerSubText: "#4C0519",
      goldAccent: "#BE123C",
      badgeBg: "#FFF1F2",
      footerBg: "linear-gradient(135deg, #BE123C 0%, #881337 100%)",
      bgColor: "#FFF5F5",
      bracketColor: "#881337",
      pillBorder: "#FDA4AF",
    },
  };

  const currentTheme = themes[themeStyle];

  return (
    <PageWrapper>
      {/* Print Specific CSS */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-review-standee, #print-review-standee * {
            visibility: visible;
          }
          #print-review-standee {
            position: fixed;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 10mm;
            background: #FCF8F2 !important;
            color: #2C2210 !important;
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20 mb-4 uppercase tracking-wider">
              <HugeiconsIcon icon={SparklesIcon} size={14} />
              Premium Acrylic Standee & Table Tent Maker
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary mb-4 leading-tight font-serif">
              Doctor & Clinic <br className="hidden sm:inline" />
              <span className="text-[#C19232]">Google Review Standee</span>
            </h1>
            <p className="text-secondary text-base sm:text-lg leading-relaxed">
              Design a luxury gold-framed acrylic counter standee for your clinic, hospital, salon, or premium boutique. Ready for 1-click A4 print or high-res PDF export.
            </p>
          </div>

          {/* Builder Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            
            {/* Left Column: Form Controls (5 Cols) */}
            <div className="lg:col-span-5 bg-paper border border-outline/70 rounded-3xl p-6 sm:p-8 shadow-card no-print">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <HugeiconsIcon icon={Store01Icon} size={22} className="text-[#C19232]" />
                Standee Details
              </h2>

              {/* Theme Palette */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                  🎨 Standee Theme Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "vintage-gold", label: "Vintage Gold", hex: "#C19232" },
                    { id: "royal-blue", label: "Royal Blue", hex: "#2563EB" },
                    { id: "emerald-green", label: "Emerald Green", hex: "#059669" },
                    { id: "maroon-rose", label: "Maroon Rose", hex: "#BE123C" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setThemeStyle(t.id as any)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                        themeStyle === t.id
                          ? "bg-primary text-background border-primary shadow-xs"
                          : "bg-background text-secondary border-outline hover:text-primary"
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: t.hex }} />
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Clinic / Business Name */}
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Clinic / Business Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Dr. Kalai's Skin Clinic"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#C19232]"
                />
              </div>

              {/* Doctor / Owner Name */}
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Doctor / Owner Name
                </label>
                <input
                  type="text"
                  value={doctorOrOwnerName}
                  onChange={(e) => setDoctorOrOwnerName(e.target.value)}
                  placeholder="e.g. Dr. E. Kalaivani"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#C19232]"
                />
              </div>

              {/* Qualifications / Subtitle */}
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Qualifications / Subtitle
                </label>
                <input
                  type="text"
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  placeholder="e.g. M.D.(DVL), DNB(DVL)"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#C19232]"
                />
              </div>

              {/* Google Review URL or Place ID */}
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Google Review Link or Place ID
                </label>
                <input
                  type="text"
                  value={reviewLinkOrPlaceId}
                  onChange={(e) => setReviewLinkOrPlaceId(e.target.value)}
                  placeholder="e.g. https://g.page/r/... or Place ID"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#C19232]"
                />
                <p className="text-[11px] text-secondary mt-1">
                  Leave blank to auto-generate direct search for your clinic name.
                </p>
              </div>

              {/* Phone & Address */}
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 93634 42004"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#C19232]"
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Full Address (Footer)
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. GV Hospital, 5/1, Thiru Vi Ka Road, Gowripuram, Karur, Tamil Nadu 639001"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-[#C19232] resize-none"
                />
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
                <button
                  onClick={handleCopyLink}
                  className="py-3.5 px-4 rounded-xl bg-neutral hover:bg-neutral/80 text-primary font-bold text-sm flex items-center justify-center gap-2 border border-outline/60 cursor-pointer"
                >
                  <HugeiconsIcon icon={copied ? Tick01Icon : Copy01Icon} size={16} />
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

            </div>

            {/* Right Column: Exact Acrylic Standee Frame Preview (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              
              {/* ACRYLIC STAND BASE 3D FRAME SIMULATION */}
              <div className="p-3 sm:p-4 rounded-[28px] bg-gradient-to-b from-gray-200/80 via-gray-300/40 to-gray-400/80 shadow-2xl border border-white/60 relative">
                
                {/* Acrylic Bevel Highlight */}
                <div className="absolute inset-x-4 top-1 h-0.5 bg-white/80 rounded-full blur-[0.5px]" />

                {/* THE ACTUAL STANDEE CARD CONTAINER */}
                <div
                  id="print-review-standee"
                  ref={printRef}
                  className="w-full max-w-[390px] rounded-2xl shadow-xl flex flex-col items-center text-center relative overflow-hidden border border-[#E5D7BE]"
                  style={{
                    backgroundColor: currentTheme.bgColor,
                    color: "#2C2210",
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                  }}
                >
                  
                  {/* Floral Corner Accent Top Left */}
                  <div className="absolute top-2 left-2 z-10 opacity-90 select-none pointer-events-none">
                    <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                      <path d="M10 10 C 30 15, 45 30, 50 50 C 35 45, 15 30, 10 10 Z" fill="#C19232" opacity="0.65" />
                      <circle cx="28" cy="28" r="14" fill="#8C5C28" opacity="0.5" />
                      <circle cx="44" cy="20" r="10" fill="#CA9E42" opacity="0.6" />
                      <path d="M5 25 C 20 20, 25 35, 15 45 Z" fill="#6E441B" opacity="0.4" />
                    </svg>
                  </div>

                  {/* Floral Corner Accent Top Right */}
                  <div className="absolute top-2 right-2 z-10 opacity-90 select-none pointer-events-none transform scale-x-[-1]">
                    <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                      <path d="M10 10 C 30 15, 45 30, 50 50 C 35 45, 15 30, 10 10 Z" fill="#C19232" opacity="0.65" />
                      <circle cx="28" cy="28" r="14" fill="#8C5C28" opacity="0.5" />
                      <circle cx="44" cy="20" r="10" fill="#CA9E42" opacity="0.6" />
                      <path d="M5 25 C 20 20, 25 35, 15 45 Z" fill="#6E441B" opacity="0.4" />
                    </svg>
                  </div>

                  {/* TOP BANNER: EMBLEM + CLINIC NAME */}
                  <div
                    className="w-full pt-8 pb-3 px-6 flex items-center justify-center gap-3 relative shadow-xs"
                    style={{
                      background: currentTheme.bannerBg,
                    }}
                  >
                    {/* Caduceus / Medical / Store Emblem */}
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-black border border-white/40 shadow-sm flex-shrink-0">
                      <span className="text-2xl leading-none">⚕️</span>
                    </div>

                    {/* Business Name Heading */}
                    <h2
                      className="text-lg sm:text-xl font-bold tracking-normal leading-tight text-gray-950 font-serif"
                    >
                      {businessName || "Dr. Kalai's Skin Clinic"}
                    </h2>
                  </div>

                  {/* DOCTOR / OWNER NAME PILL BADGE */}
                  <div className="w-full px-6 pt-5 pb-3 flex justify-center">
                    <div
                      className="px-6 py-2 rounded-xl border flex flex-col items-center justify-center shadow-xs"
                      style={{
                        backgroundColor: currentTheme.badgeBg,
                        borderColor: currentTheme.pillBorder,
                      }}
                    >
                      <h3 className="text-base font-bold text-gray-900 tracking-wide font-serif">
                        {doctorOrOwnerName || "Dr. E. Kalaivani"}
                      </h3>
                      {qualifications && (
                        <p className="text-[10px] font-bold text-gray-700 tracking-wider uppercase mt-0.5">
                          {qualifications}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* QR CODE CONTAINER WITH STYLIZED FOCUS BRACKETS */}
                  <div className="relative my-2 p-5 flex items-center justify-center">
                    
                    {/* Bracket Corners (Just like in the photo) */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ color: currentTheme.bracketColor }}
                    >
                      {/* Top-Left Bracket */}
                      <div className="absolute top-1 left-1 w-8 h-8 border-t-3 border-l-3 rounded-tl-xl border-current" />
                      {/* Top-Right Bracket */}
                      <div className="absolute top-1 right-1 w-8 h-8 border-t-3 border-r-3 rounded-tr-xl border-current" />
                      {/* Bottom-Left Bracket */}
                      <div className="absolute bottom-1 left-1 w-8 h-8 border-b-3 border-l-3 rounded-bl-xl border-current" />
                      {/* Bottom-Right Bracket */}
                      <div className="absolute bottom-1 right-1 w-8 h-8 border-b-3 border-r-3 rounded-br-xl border-current" />
                    </div>

                    {/* QR Code Canvas */}
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                      {qrCodeUrl ? (
                        <img
                          src={qrCodeUrl}
                          alt="Google Review QR Code"
                          className="w-44 h-44 sm:w-48 sm:h-48 object-contain"
                        />
                      ) : (
                        <div className="w-44 h-44 bg-gray-100 flex items-center justify-center text-xs">
                          Generating QR...
                        </div>
                      )}
                    </div>

                  </div>

                  {/* 5-STAR GOLD RATING ICONS */}
                  <div className="flex items-center justify-center gap-1.5 text-amber-500 mb-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <HugeiconsIcon
                        key={i}
                        icon={StarIcon}
                        size={18}
                        className="fill-current text-amber-500"
                      />
                    ))}
                  </div>

                  {/* "Review us on" HEADING */}
                  <h4 className="text-xl font-bold tracking-tight text-gray-900 font-serif mt-0.5">
                    Review us on
                  </h4>

                  {/* GOOGLE MULTI-COLOR LOGO */}
                  <div className="flex items-center justify-center text-2xl font-bold tracking-tight my-1">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </div>

                  {/* "Thank you for your feedback !" */}
                  <p className="text-sm font-bold text-gray-900 tracking-wide font-serif mb-2">
                    Thank you for your feedback !
                  </p>

                  {/* Heart Ribbon Ornament */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-10 h-[1px] bg-gray-400 opacity-60" />
                    <span className="text-rose-500 text-sm">❤️</span>
                    <div className="w-10 h-[1px] bg-gray-400 opacity-60" />
                  </div>

                  {/* Floral Corner Accent Bottom Left */}
                  <div className="absolute bottom-14 left-2 z-10 opacity-90 select-none pointer-events-none">
                    <svg width="70" height="70" viewBox="0 0 100 100" fill="none">
                      <path d="M10 90 C 25 70, 45 60, 65 65 C 55 80, 35 95, 10 90 Z" fill="#8C5C28" opacity="0.65" />
                      <circle cx="35" cy="65" r="16" fill="#CA9E42" opacity="0.6" />
                      <path d="M20 50 C 40 45, 55 60, 45 75 Z" fill="#6E441B" opacity="0.4" />
                    </svg>
                  </div>

                  {/* FOOTER BAR: FULL ADDRESS & PHONE NUMBER */}
                  <div
                    className="w-full py-3 px-4 text-center text-gray-950 font-serif relative z-20 shadow-inner"
                    style={{
                      background: currentTheme.footerBg,
                    }}
                  >
                    <p className="text-[10px] leading-snug font-medium line-clamp-2 mb-0.5">
                      {address}
                    </p>
                    {phone && (
                      <p className="text-[11px] font-bold tracking-wider">
                        Phone: {phone}
                      </p>
                    )}
                  </div>

                </div>

                {/* ACRYLIC STAND SOLID METAL BASE SIMULATION (Golden Plate) */}
                <div className="w-[85%] mx-auto h-4 rounded-b-xl bg-gradient-to-r from-[#A67C24] via-[#F4EBD7] to-[#A67C24] shadow-md border-t border-[#8C5C28] mt-[-2px] relative z-30" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
