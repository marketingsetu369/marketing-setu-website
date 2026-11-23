"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { PageWrapper, PageHero, CtaBand } from "@/views/home-page/component";
import {
  FormInput,
  FormTextarea,
  FormSelect,
  SectionCard,
  ColorPickerSwatch,
  FeatureCard,
  SectionHeader,
} from "@/components/ui";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  WhatsappIcon,
  Copy01Icon,
  Download01Icon,
  QrCodeIcon,
  Tick01Icon,
  SparklesIcon,
  ArrowRight01Icon,
  InformationCircleIcon,
  Share01Icon,
  SmartPhone01Icon,
  Target02Icon,
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

  // Suggested message templates for quick selection
  const templates = [
    "Hi, I'm interested in your products and would like more details.",
    "Hello! I saw your profile and want to place an order.",
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

      // Generate QR Code with crisp margin
      QRCode.toDataURL(
        link,
        {
          width: 360,
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

  // Shared input styling matching ContactForm ("Send Us a Message") exactly
  const inputBaseClass =
    "w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-grey-900/50 text-primary placeholder:text-secondary/50 font-medium text-sm transition-all duration-300 outline-none focus:border-brand-main";

  return (
    <PageWrapper>
      {/* HERO SECTION */}
      <PageHero
        breadcrumbLabel="Tools"
        eyebrow="100% FREE TOOL • NO SIGNUP REQUIRED"
        center
        title={
          <>
            Free WhatsApp Link & <br className="hidden sm:inline" />
            <span className="text-brand-secondary">QR Code Generator</span>
          </>
        }
        lead={
          <>
            Create instant click-to-chat WhatsApp links (<code className="bg-brand-light px-1.5 py-0.5 rounded text-xs text-brand-secondary font-mono border border-brand-secondary/20">wa.me</code>) and crisp high-resolution QR codes with pre-filled greeting messages for your Instagram bio, Google cards, banners, and ads.
          </>
        }
      />

      {/* GENERATOR INTERACTIVE SECTION */}
      <section className="py-12 md:py-14 bg-background border-t border-outline/40">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Input Form (7 Cols) - Reusable SectionCard */}
            <SectionCard className="lg:col-span-7 space-y-8">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-light text-brand-main dark:text-brand-secondary flex items-center justify-center border border-brand-secondary/20 shrink-0">
                    <HugeiconsIcon icon={WhatsappIcon} size={22} />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
                      Configure WhatsApp Link
                    </h3>
                  </div>
                </div>
                <p className="text-secondary text-sm">
                  Enter your phone number and optional welcome message below to generate instant click-to-chat links.
                </p>
              </div>

              <div className="space-y-6">
                
                {/* Phone Number Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-primary tracking-wide">
                    WhatsApp Phone Number <span className="text-error-main ml-1">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-4">
                      <FormSelect
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        options={[
                          { value: "91", label: "🇮🇳 +91 (India)" },
                          { value: "1", label: "🇺🇸 +1 (USA)" },
                          { value: "44", label: "🇬🇧 +44 (UK)" },
                          { value: "971", label: "🇦🇪 +971 (UAE)" },
                          { value: "65", label: "🇸🇬 +65 (SG)" },
                          { value: "61", label: "🇦🇺 +61 (AU)" },
                          { value: "966", label: "🇸🇦 +966 (KSA)" },
                          { value: "974", label: "🇶🇦 +974 (Qatar)" },
                        ]}
                      />
                    </div>
                    <div className="sm:col-span-8">
                      <FormInput
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="91724 15858"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-secondary mt-0.5 flex items-center gap-1 font-normal">
                    <HugeiconsIcon icon={InformationCircleIcon} size={13} className="shrink-0 text-brand-secondary" />
                    Enter digits only without country code, zero or plus sign.
                  </p>
                </div>

                {/* Custom Pre-filled Message */}
                <FormTextarea
                  label="Pre-filled Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi MarketingSetu! I'd like to get more info about your products and pricing..."
                  rows={4}
                  charCount={message.length}
                />

                {/* Quick Template Chips */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">
                    Suggested Message Templates
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {templates.map((tpl, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setMessage(tpl)}
                        className="text-xs bg-gray-50 dark:bg-grey-900/50 hover:bg-brand-light text-secondary hover:text-brand-main dark:hover:text-brand-secondary px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-brand-main transition-colors text-left truncate max-w-full cursor-pointer"
                      >
                        {tpl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* QR Color Selector */}
                <ColorPickerSwatch
                  label="QR Code Accent Color"
                  colors={[
                    { hex: "#128C7E", name: "WhatsApp Green" },
                    { hex: "#003058", name: "Navy Blue" },
                    { hex: "#089848", name: "Growth Green" },
                    { hex: "#111827", name: "Classic Black" },
                    { hex: "#0284C7", name: "Sky Blue" },
                    { hex: "#E11D48", name: "Crimson Rose" },
                  ]}
                  selectedColor={qrColor}
                  onSelect={setQrColor}
                />

              </div>

            </SectionCard>

            {/* Right: Output Link & Live QR Preview (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Generated Result Card */}
              <div className="bg-paper rounded-3xl p-8 border border-outline shadow-card text-center flex flex-col items-center justify-center">
                
                <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-outline/30">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                    <HugeiconsIcon icon={QrCodeIcon} size={16} className="text-brand-secondary" />
                    Live Output Preview
                  </h3>
                  {generatedLink && (
                    <span className="text-[10px] font-bold text-brand-main dark:text-brand-secondary bg-brand-light px-2.5 py-0.5 rounded-md border border-brand-secondary/20">
                      Ready to Share
                    </span>
                  )}
                </div>

                {qrCodeDataUrl ? (
                  <div className="flex flex-col items-center w-full">
                    
                    {/* QR Code Container with Frame */}
                    <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-md mb-4 group relative transition-transform duration-300 hover:scale-[1.02]">
                      <img
                        src={qrCodeDataUrl}
                        alt="WhatsApp QR Code"
                        className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={handleDownloadQr}
                          className="bg-white text-gray-900 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer hover:bg-gray-100 transition-transform active:scale-95"
                        >
                          <HugeiconsIcon icon={Download01Icon} size={14} /> Download
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-secondary mb-4 leading-normal">
                      Scan with any smartphone camera or WhatsApp scanner to start chatting immediately.
                    </p>

                    {/* Copied URL Preview Box matching form inputs */}
                    <div className="w-full px-3.5 py-3 rounded-xl bg-gray-50 dark:bg-grey-900/50 border border-gray-300 dark:border-gray-700 text-left mb-4 flex items-center justify-between gap-2 overflow-hidden">
                      <span className="text-xs font-mono text-secondary truncate select-all">
                        {generatedLink}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="text-xs font-bold text-brand-main dark:text-brand-secondary hover:underline shrink-0 cursor-pointer"
                      >
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="py-3 px-4 rounded-xl bg-primary text-background font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        <HugeiconsIcon icon={copied ? Tick01Icon : Copy01Icon} size={15} />
                        {copied ? "Copied!" : "Copy Link"}
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadQr}
                        className="py-3 px-4 rounded-xl bg-brand-main dark:bg-brand-secondary hover:opacity-90 text-white dark:text-gray-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        <HugeiconsIcon icon={Download01Icon} size={15} />
                        Download QR
                      </button>
                    </div>

                    {/* Open in WhatsApp Test Button */}
                    <a
                      href={generatedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-3 py-3 px-4 rounded-xl bg-gray-50 dark:bg-grey-900/50 hover:bg-brand-light text-primary font-semibold text-xs flex items-center justify-center gap-1.5 border border-gray-300 dark:border-gray-700 hover:border-brand-main transition-colors"
                    >
                      <span>Open & Test in WhatsApp</span>
                      <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="text-brand-secondary" />
                    </a>
                  </div>
                ) : (
                  <div className="py-12 px-4 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-brand-light text-brand-secondary flex items-center justify-center mb-3 border border-brand-secondary/20">
                      <HugeiconsIcon icon={QrCodeIcon} size={30} />
                    </div>
                    <p className="text-sm font-bold text-primary mb-1">
                      No Phone Number Entered Yet
                    </p>
                    <p className="text-xs text-secondary max-w-xs leading-relaxed">
                      Type your WhatsApp mobile number on the left to instantly see your live link preview and downloadable QR code.
                    </p>
                  </div>
                )}
              </div>

              {/* Upsell Card: MarketingSetu Smart Digital Business Card */}
              <div className="bg-paper rounded-3xl p-6 sm:p-7 border border-outline shadow-card text-left relative overflow-hidden">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-light text-brand-secondary border border-brand-secondary/20 uppercase tracking-wider mb-3">
                  <HugeiconsIcon icon={SparklesIcon} size={11} /> Upgrade Your Business
                </span>
                <h4 className="text-base sm:text-lg font-bold text-primary mb-1.5 leading-snug">
                  Want an all-in-one Smart Digital Business Page?
                </h4>
                <p className="text-secondary text-xs leading-relaxed mb-4 font-normal">
                  MarketingSetu builds complete digital business pages with your logo, catalogue, Google map shop directions & automated WhatsApp follow-ups on missed calls.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-brand-main dark:bg-brand-secondary text-white dark:text-gray-950 px-4 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-xs"
                >
                  <span>Build Digital Visiting Card</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                </Link>
              </div>

            </div>

          </div>

          {/* Educational Content / Use Cases Section using reusable SectionHeader and FeatureCard */}
          <div className="mt-14 pt-12 border-t border-outline/40">
            <SectionHeader
              eyebrow="Best Marketing Practices"
              title="Where to Use Your WhatsApp Link & QR Code"
              description="Multiply your customer inquiries across online and offline touchpoints in seconds."
            />

            <div className="grid sm:grid-cols-3 gap-6">
              <FeatureCard
                icon={<HugeiconsIcon icon={Share01Icon} size={20} />}
                title="Instagram & Social Bios"
                description="Put your wa.me link directly in your Instagram, Facebook, and YouTube channel bio so potential clients message you with 1 tap."
              />
              <FeatureCard
                icon={<HugeiconsIcon icon={SmartPhone01Icon} size={20} />}
                title="Counter QR Displays & Banners"
                description="Print the generated QR code on your billing counter, shop window, packaging boxes, and flyers for fast walk-in inquiries."
              />
              <FeatureCard
                icon={<HugeiconsIcon icon={Target02Icon} size={20} />}
                title="Facebook & Google Click-to-Chat"
                description="Use your link with a pre-filled product campaign message as the destination URL to drive instant, high-intent buyer chats."
              />
            </div>
          </div>

        </div>
      </section>

      {/* BOTTOM CTA BAND */}
      <CtaBand
        heading="Ready to automate WhatsApp inquiries for your local business?"
        description="Join hundreds of businesses across India using MarketingSetu for digital cards, auto missed-call replies, and marketing posters."
        whatsappMessage="Hi MarketingSetu! I tried your WhatsApp link tool and want to explore your business card and automation app."
      />
    </PageWrapper>
  );
}
