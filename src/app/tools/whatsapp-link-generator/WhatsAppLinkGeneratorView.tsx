"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { PageWrapper } from "@/views/home-page/component";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  WhatsappIcon,
  Copy01Icon,
  Download01Icon,
  QrCodeIcon,
  Tick01Icon,
  Share01Icon,
  SparklesIcon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { toast } from "sonner";

export default function WhatsAppLinkGeneratorView() {
  const [countryCode, setCountryCode] = useState("91");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [qrColor, setQrColor] = useState("#128C7E");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Suggested message templates for quick selection
  const templates = [
    "Hi, I'm interested in your products and would like more details.",
    "Hello! I saw your post on Instagram and want to place an order.",
    "Hi, I'd like to book an appointment with your team.",
    "नमस्ते! मुझे आपके उत्पादों के बारे में अधिक जानकारी चाहिए।",
    "नमस्कार! मला तुमच्या सेवांबद्दल अधिक माहिती हवी आहे.",
  ];

  // Recalculate link & QR Code dynamically
  useEffect(() => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length >= 7) {
      const fullNumber = `${countryCode}${cleanPhone}`;
      const encodedMsg = encodeURIComponent(message.trim());
      const link = encodedMsg
        ? `https://wa.me/${fullNumber}?text=${encodedMsg}`
        : `https://wa.me/${fullNumber}`;
      setGeneratedLink(link);

      // Generate QR Code
      QRCode.toDataURL(
        link,
        {
          width: 320,
          margin: 2,
          color: {
            dark: qrColor,
            light: "#FFFFFF",
          },
        },
        (err, url) => {
          if (!err && url) {
            setQrCodeDataUrl(url);
          }
        }
      );
    } else {
      setGeneratedLink("");
      setQrCodeDataUrl("");
    }
  }, [countryCode, phone, message, qrColor]);

  const handleCopyLink = () => {
    if (!generatedLink) {
      toast.error("Please enter a valid phone number first.");
      return;
    }
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast.success("WhatsApp link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQr = () => {
    if (!qrCodeDataUrl) return;
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCodeDataUrl;
    downloadLink.download = `whatsapp-qr-${phone || "marketingsetu"}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    toast.success("QR Code downloaded successfully!");
  };

  return (
    <PageWrapper>
      <div className="pt-28 pb-20 bg-background min-h-screen text-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mb-4 uppercase tracking-wider">
              <HugeiconsIcon icon={SparklesIcon} size={14} />
              100% Free Tool • No Registration Required
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary mb-4 leading-tight">
              Free WhatsApp Link & <br className="hidden sm:inline" />
              <span className="text-[#10C85A]">QR Code Generator</span>
            </h1>
            <p className="text-secondary text-base sm:text-lg leading-relaxed">
              Create instant click-to-chat WhatsApp links (<code className="bg-paper px-1.5 py-0.5 rounded text-xs border border-outline">wa.me</code>) and high-resolution downloadable QR codes with custom pre-filled messages for your business, bio & ads.
            </p>
          </div>

          {/* Interactive Tool Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            
            {/* Left: Input Form (7 Cols) */}
            <div className="lg:col-span-7 bg-paper border border-outline/70 rounded-3xl p-6 sm:p-8 shadow-card">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <HugeiconsIcon icon={WhatsappIcon} size={24} className="text-[#10C85A]" />
                Enter WhatsApp Details
              </h2>

              {/* Phone Number Input */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                  WhatsApp Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="w-28 flex-shrink-0">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-full px-3 py-3 rounded-xl bg-background border border-outline text-primary text-sm font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="91">🇮🇳 +91 (IN)</option>
                      <option value="1">🇺🇸 +1 (US)</option>
                      <option value="44">🇬🇧 +44 (UK)</option>
                      <option value="971">🇦🇪 +971 (UAE)</option>
                      <option value="65">🇸🇬 +65 (SG)</option>
                      <option value="61">🇦🇺 +61 (AU)</option>
                      <option value="966">🇸🇦 +966 (SA)</option>
                      <option value="974">🇶🇦 +974 (QA)</option>
                    </select>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="91724 15858"
                    className="flex-1 px-4 py-3 rounded-xl bg-background border border-outline text-primary text-base font-medium placeholder:text-disabled focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <p className="text-[11px] text-secondary mt-1.5">
                  Enter your number without spaces or leading zero.
                </p>
              </div>

              {/* Custom Pre-filled Message */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                    Pre-filled Message (Optional)
                  </label>
                  <span className="text-[11px] text-secondary">{message.length} chars</span>
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi MarketingSetu! I'd like to get more info about your services..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-outline text-primary text-sm font-medium placeholder:text-disabled focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
                />
              </div>

              {/* Quick Template Chips */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary mb-2">
                  💡 Quick Templates
                </label>
                <div className="flex flex-wrap gap-2">
                  {templates.map((tpl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setMessage(tpl)}
                      className="text-xs bg-neutral hover:bg-neutral/80 text-secondary hover:text-primary px-3 py-1.5 rounded-lg border border-outline/50 transition-colors text-left truncate max-w-full cursor-pointer"
                    >
                      {tpl}
                    </button>
                  ))}
                </div>
              </div>

              {/* QR Color Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary mb-2">
                  🎨 QR Code Accent Color
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { color: "#128C7E", name: "WhatsApp Green" },
                    { color: "#5B3DF5", name: "Setu Purple" },
                    { color: "#000000", name: "Classic Black" },
                    { color: "#1890FF", name: "Ocean Blue" },
                    { color: "#E11D48", name: "Crimson Rose" },
                  ].map((c) => (
                    <button
                      key={c.color}
                      type="button"
                      onClick={() => setQrColor(c.color)}
                      style={{ backgroundColor: c.color }}
                      title={c.name}
                      className={`w-7 h-7 rounded-full transition-transform cursor-pointer ${
                        qrColor === c.color ? "ring-2 ring-offset-2 ring-primary scale-110" : "hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Output Link & Live QR Preview (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Generated Result Card */}
              <div className="bg-paper border border-outline/70 rounded-3xl p-6 sm:p-8 shadow-card text-center flex flex-col items-center justify-center">
                <h3 className="text-sm font-bold uppercase tracking-wider text-secondary mb-4">
                  Live QR Code & Link Preview
                </h3>

                {qrCodeDataUrl ? (
                  <div className="flex flex-col items-center">
                    {/* QR Code Container with Frame */}
                    <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-md mb-4 group relative">
                      <img
                        src={qrCodeDataUrl}
                        alt="WhatsApp QR Code"
                        className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={handleDownloadQr}
                          className="bg-white text-gray-900 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer hover:bg-gray-100"
                        >
                          <HugeiconsIcon icon={Download01Icon} size={14} /> Download
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-secondary mb-5">
                      Scan with any smartphone camera to open WhatsApp directly.
                    </p>

                    {/* Action Buttons */}
                    <div className="w-full flex flex-col sm:flex-row gap-2.5">
                      <button
                        onClick={handleCopyLink}
                        className="flex-1 py-3 px-4 rounded-xl bg-primary text-background font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-sm"
                      >
                        <HugeiconsIcon icon={copied ? Tick01Icon : Copy01Icon} size={16} />
                        {copied ? "Copied!" : "Copy Link"}
                      </button>
                      <button
                        onClick={handleDownloadQr}
                        className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                      >
                        <HugeiconsIcon icon={Download01Icon} size={16} />
                        Download QR
                      </button>
                    </div>

                    {/* Open in WhatsApp Test Button */}
                    <a
                      href={generatedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-3 py-2.5 px-4 rounded-xl bg-neutral hover:bg-neutral/80 text-primary font-semibold text-xs flex items-center justify-center gap-1.5 border border-outline/60 transition-colors"
                    >
                      <span>Test Link in WhatsApp</span>
                      <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                    </a>
                  </div>
                ) : (
                  <div className="py-12 px-4 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-neutral text-disabled flex items-center justify-center mb-3">
                      <HugeiconsIcon icon={QrCodeIcon} size={32} />
                    </div>
                    <p className="text-sm font-semibold text-primary mb-1">
                      No Phone Number Entered
                    </p>
                    <p className="text-xs text-secondary max-w-xs">
                      Enter your phone number on the left to instantly generate your shareable link & custom QR code.
                    </p>
                  </div>
                )}
              </div>

              {/* Upsell to MarketingSetu Digital Business Card */}
              <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-950 rounded-3xl p-6 text-white text-left relative overflow-hidden shadow-card">
                <div className="relative z-10">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white uppercase tracking-wider mb-3 inline-block">
                    Upgrade Your Business
                  </span>
                  <h4 className="text-lg font-bold mb-2">
                    Want a full Digital Visiting Card with your logo, catalogue & map?
                  </h4>
                  <p className="text-gray-300 text-xs leading-relaxed mb-4">
                    MarketingSetu builds complete 1-tap mobile business pages with WhatsApp automated messaging & inquiry capture. Live in 15 mins.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl transition-all shadow-sm"
                  >
                    <span>Create Smart Digital Card</span>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content / SEO Keyword Section */}
          <div className="mt-20 max-w-4xl mx-auto border-t border-outline/50 pt-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
                How to Use Your WhatsApp Link & QR Code
              </h2>
              <p className="text-secondary text-sm">
                Enhance your customer outreach across all your digital and offline marketing channels.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-6 bg-paper border border-outline/60 rounded-2xl">
                <div className="text-2xl mb-3">📱</div>
                <h3 className="font-bold text-base text-primary mb-2">Instagram Bio Link</h3>
                <p className="text-secondary text-xs leading-relaxed">
                  Add your wa.me link directly into your Instagram or Facebook profile so followers can message you with one tap.
                </p>
              </div>

              <div className="p-6 bg-paper border border-outline/60 rounded-2xl">
                <div className="text-2xl mb-3">🪪</div>
                <h3 className="font-bold text-base text-primary mb-2">Printed Business Cards & Posters</h3>
                <p className="text-secondary text-xs leading-relaxed">
                  Download the high-res QR code and print it on banners, flyers, product packaging, and shop counter display stands.
                </p>
              </div>

              <div className="p-6 bg-paper border border-outline/60 rounded-2xl">
                <div className="text-2xl mb-3">🎯</div>
                <h3 className="font-bold text-base text-primary mb-2">Facebook & Google Ads</h3>
                <p className="text-secondary text-xs leading-relaxed">
                  Use the WhatsApp direct link as your ad CTA destination to send high-intent buyers straight to WhatsApp.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
