"use client";

import { BusinessPageApi } from "@/api/repositories/businessPageApi";
import { TrackAction } from "@/enums";
import { trackUniqueAction } from "@/utils/analytics";
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  CallIcon,
  Cancel01Icon,
  CheckmarkBadge01Icon,
  FacebookIcon,
  InstagramIcon,
  Location01Icon,
  Mail01Icon,
  Message01Icon,
  RupeeIcon,
  Share01Icon,
  Store01Icon,
  TwitterIcon,
  UserIcon,
  WhatsappIcon,
  YoutubeIcon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";
import { usePageTracking } from "./hooks/usePageTracking";

// Fonts
const FONT_HEADER = "var(--font-poppins)";
const FONT_SANS = "var(--font-inter)";

interface BusinessViewProps {
  data: any;
  slug: string;
}

export default function BusinessView({ data, slug }: BusinessViewProps) {
  // Page View Tracking on Mount
  usePageTracking(slug);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [isProductEnquiry, setIsProductEnquiry] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Styling properties
  const PRIMARY_COLOR = data?.theme_color_hex || "#7265E3";
  const PRIMARY_LIGHT = `${PRIMARY_COLOR}10`; // Approximate tinted background
  const PRIMARY_BORDER = `${PRIMARY_COLOR}25`;

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage("Name and phone number are required.");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      await BusinessPageApi.submitEnquiry(slug, {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        isProduct: isProductEnquiry,
      });
      setSubmitStatus("success");
      setFormData({ name: "", phone: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.response?.data?.message || err?.message || "Failed to submit enquiry. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const productContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollProducts = (direction: "left" | "right") => {
    if (productContainerRef.current) {
      const scrollAmount = 240;
      productContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const getImageUrl = (url?: string) => {
    if (!url) return "";
    const match = url.match(/\/uploads\/(.+)$/);
    if (match && match[1]) {
      return `/uploads/${match[1]}`;
    }
    if (url.startsWith("http") && !url.includes("localhost") && !url.includes("10.0.2.2") && !url.includes("127.0.0.1")) {
      return url;
    }
    return url;
  };

  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    try {
      const cleanUrl = url.trim();
      if (cleanUrl.includes("youtu.be/")) {
        const parts = cleanUrl.split("youtu.be/");
        if (parts[1]) {
          const id = parts[1].split(/[?#]/)[0];
          if (id.length === 11) return id;
        }
      }
      const paths = ["/shorts/", "/live/", "/embed/", "/v/"];
      for (const path of paths) {
        if (cleanUrl.includes(path)) {
          const parts = cleanUrl.split(path);
          if (parts[1]) {
            const id = parts[1].split(/[?#&]/)[0];
            if (id.length === 11) return id;
          }
        }
      }
      if (cleanUrl.includes("watch?v=")) {
        const parts = cleanUrl.split("watch?v=");
        if (parts[1]) {
          const id = parts[1].split(/[?#&]/)[0];
          if (id.length === 11) return id;
        }
      }
      const urlObj = new URL(cleanUrl);
      const v = urlObj.searchParams.get("v");
      if (v && v.length === 11) return v;
    } catch (e) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2] && match[2].length === 11) {
        return match[2];
      }
    }
    return null;
  };

  // Safe defaults from database / Static Mock Data fallback
  const header = {
    business_name: data?.header?.business_name || "",
    tagline: data?.header?.tagline || "",
    business_category: data?.header?.business_category || "",
    logo_url: data?.header?.logo_url || ""
  };

  const contact = {
    phone: data?.contact?.phone || "",
    whatsapp: data?.contact?.whatsapp || "",
    email: data?.contact?.email || "",
    maps_link: data?.contact?.maps_link || "",
    address: data?.contact?.address || ""
  };

  const ownerList = Array.isArray(data?.owner) ? data.owner : [];

  const products = Array.isArray(data?.products) ? data.products : [];

  const gallery = Array.isArray(data?.gallery) ? data.gallery : [];

  const testimonials = Array.isArray(data?.testimonials) ? data.testimonials : [];

  const socialLinks = {
    instagram: data?.social_links?.instagram || "",
    facebook: data?.social_links?.facebook || "",
    youtube: data?.social_links?.youtube || "",
    twitter: data?.social_links?.twitter || ""
  };

  const mainOwner = ownerList[0];

  const showVideo = !!(data?.youtube_url && getYouTubeId(data.youtube_url));

  const showStats = !!mainOwner;

  const visibleStates = [
    showStats,
    showVideo,
    products.length > 0,
    testimonials.length > 0,
    gallery.length > 0,
    !!(socialLinks.instagram || socialLinks.facebook || socialLinks.youtube || socialLinks.twitter),
    true, // Enquiry form is always visible
    !!contact.maps_link,
  ];

  const getSectionStyle = (sectionKey: string) => {
    const keys = ["stats", "video", "products", "testimonials", "gallery", "social", "enquiry", "location"];
    const activeKeys = keys.filter((key, idx) => visibleStates[idx]);
    const index = activeKeys.indexOf(sectionKey);
    if (index === -1) return "bg-white py-12 px-6";

    const productsIndex = activeKeys.indexOf("products");
    const isLightGray = productsIndex !== -1 
      ? Math.abs(index - productsIndex) % 2 === 0
      : index % 2 !== 0;

    const bgClass = isLightGray ? "bg-grey-100" : "bg-white";
    
    const isFirst = index === 0;
    const isLast = index === activeKeys.length - 1;
    
    let paddingClass = "py-12 px-6";
    if (isFirst && isLast) {
      paddingClass = "pt-12 pb-36 md:pb-16 px-6";
    } else if (isFirst) {
      paddingClass = "pt-12 pb-12 px-6";
    } else if (isLast) {
      paddingClass = "pt-12 pb-36 md:pb-16 px-6";
    }
    
    return `${bgClass} ${paddingClass}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start md:items-center py-0 md:py-8" style={{ fontFamily: FONT_SANS }}>
      {/* Container wrapper: responsive split-screen layout max-w-md on mobile, max-w-[1100px] on desktop */}
      <div className="w-full md:max-w-[1100px] bg-white min-h-screen md:min-h-[820px] md:h-[820px] md:shadow-lg relative flex flex-col md:flex-row md:rounded-3xl overflow-hidden animate-fade-in-up">
        
        {/* ── LEFT COLUMN: Header & Profile Card ── */}
        <div className="w-full md:w-[42%] bg-white flex flex-col justify-between border-r border-gray-100 relative md:pb-0">
          <div>
            {/* Soft top-to-bottom gradient background that fades from primary-tint to transparent/white */}
            <header 
              className="pt-14 pb-[90px] px-6 text-center flex flex-col items-center relative"
              style={{ 
                background: `linear-gradient(to bottom, ${PRIMARY_COLOR}35 0%, ${PRIMARY_COLOR}15 50%, ${PRIMARY_COLOR}02 100%)`
              }}
            >
              {/* Share button on top right of the header */}
              <div className="absolute top-4 right-4 z-20">
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: header.business_name || "Business Profile",
                        url: window.location.href
                      }).catch(console.error);
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }
                  }}
                  className="w-9 h-9 rounded-full bg-white shadow-xs flex items-center justify-center text-gray-800 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                >
                  <HugeiconsIcon icon={Share01Icon} size={16} />
                </button>
              </div>

              {/* Logo - Large floating circle with thick white border matching screenshot */}
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-white mb-4.5 overflow-hidden p-1.5">
                {header.logo_url ? (
                  <img
                    src={getImageUrl(header.logo_url)}
                    alt={header.business_name || "Logo"}
                    className="w-full h-full object-contain rounded-full"
                  />
                ) : (
                  <div 
                    className="w-full h-full rounded-full flex items-center justify-center border"
                    style={{ backgroundColor: PRIMARY_LIGHT, color: PRIMARY_COLOR, borderColor: PRIMARY_BORDER }}
                  >
                    <HugeiconsIcon icon={Store01Icon} size={36} />
                  </div>
                )}
              </div>

              {/* Title with Verified Checkmark */}
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <h1 className="text-xl font-semibold text-gray-900 tracking-tight" style={{ fontFamily: FONT_HEADER }}>
                  {header.business_name || ""}
                </h1>
                <span className="text-[#2e7d32] flex items-center justify-center">
                  <HugeiconsIcon icon={CheckmarkBadge01Icon} size={18} />
                </span>
              </div>

              {/* Subtitle text */}
              <p className="text-sm text-gray-600 font-normal mb-3">
                {header.business_category || ""}
              </p>
              
              {/* Tagline pill using theme background color */}
              {header.tagline && (
                <span 
                  className="text-white text-[11px] font-medium px-4.5 py-1.5 rounded-full tracking-wide"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                >
                  {header.tagline}
                </span>
              )}

              {/* Quick Action Icons Row */}
              <div className="grid grid-cols-4 gap-4 w-full mt-7 px-1">
                {contact.phone && (
                  <a 
                    href={`tel:${contact.phone}`} 
                    onClick={() => { if (slug) trackUniqueAction(slug, TrackAction.Call); }}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div className="w-11 h-11 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-gray-50 transition-colors">
                      <HugeiconsIcon icon={CallIcon} size={16} />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-950">Call</span>
                  </a>
                )}
                
                {(contact.whatsapp || contact.phone) && (
                  <a 
                    href={`https://wa.me/${(contact.whatsapp || contact.phone).replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => { if (slug) trackUniqueAction(slug, TrackAction.WhatsApp); }}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div className="w-11 h-11 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-gray-50 transition-colors">
                      <HugeiconsIcon icon={WhatsappIcon} size={16} />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-950">WhatsApp</span>
                  </a>
                )}

                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="flex flex-col items-center gap-1.5 group">
                    <div className="w-11 h-11 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-gray-50 transition-colors">
                      <HugeiconsIcon icon={Mail01Icon} size={16} />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-950">Email</span>
                  </a>
                )}

                {contact.maps_link && (
                  <a 
                    href={contact.maps_link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => { if (slug) trackUniqueAction(slug, TrackAction.Directions); }}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div className="w-11 h-11 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-gray-50 transition-colors">
                      <HugeiconsIcon icon={Location01Icon} size={16} />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-950">Location</span>
                  </a>
                )}
              </div>
            </header>

            {/* Owner profile cards overlay */}
            {ownerList.length > 0 && (
              <div className="px-6 -mt-[65px] relative z-10 space-y-4 animate-fade-in-up">
                {ownerList.map((owner: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-[32px] pt-8 px-8 pb-1">
                    <div className="flex items-center gap-4.5">
                      <div className="w-16 h-16 rounded-3xl overflow-hidden relative border border-gray-100 flex-shrink-0">
                        {owner.avatar_url ? (
                          <img
                            src={getImageUrl(owner.avatar_url)}
                            alt={owner.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div 
                            className="w-full h-full rounded-3xl flex items-center justify-center"
                            style={{ backgroundColor: PRIMARY_LIGHT, color: PRIMARY_COLOR }}
                          >
                            <HugeiconsIcon icon={UserIcon} size={20} />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-semibold text-gray-950 text-lg" style={{ fontFamily: FONT_HEADER }}>
                            {owner.name}
                          </h3>
                          <span className="text-[#2e7d32] flex items-center justify-center">
                            <HugeiconsIcon icon={CheckmarkBadge01Icon} size={18} />
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 font-medium mt-0.5">{owner.title}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-100/80 my-6" />

                    {/* About Biography */}
                    {owner.bio && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-950 mb-3" style={{ fontFamily: FONT_HEADER }}>About</h2>
                        <p className="text-sm text-gray-500 leading-relaxed font-normal">
                          {owner.bio}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Desktop CTA Actions below profile card */}
            <div className="hidden md:flex gap-4 px-6 mt-6">
              <button 
                onClick={() => {
                  setIsProductEnquiry(false);
                  const element = document.getElementById("clientName");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    element.focus();
                  }
                }}
                className="flex-1 text-white py-3.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
                style={{ backgroundColor: PRIMARY_COLOR, boxShadow: `0 8px 16px ${PRIMARY_COLOR}15` }}
              >
                <HugeiconsIcon icon={Message01Icon} size={16} /> Message
              </button>
              {contact.phone && (
                <button 
                  onClick={() => {
                    if (slug) trackUniqueAction(slug, TrackAction.Call);
                    window.location.href = `tel:${contact.phone}`;
                  }}
                  className="flex-1 py-3.5 rounded-lg font-bold text-sm border flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
                  style={{ backgroundColor: PRIMARY_LIGHT, color: PRIMARY_COLOR, borderColor: PRIMARY_BORDER }}
                >
                  <HugeiconsIcon icon={CallIcon} size={16} /> Call Now
                </button>
              )}
            </div>
          </div>
        </div>


        {/* ── CONTENT SECTION: Scrollable Body Card ── */}
        <div className="w-full md:w-[58%] flex flex-col overflow-y-auto md:h-full no-scrollbar bg-white">
          
          {/* Stats Section */}
          {mainOwner && (
            <section className={`grid grid-cols-2 gap-4 text-center animate-fade-in-up ${getSectionStyle("stats")}`}>
              <div>
                <p className="text-2xl font-semibold" style={{ color: PRIMARY_COLOR, fontFamily: FONT_HEADER }}>
                  {mainOwner.happy_customers_count || 140}+
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Happy Customers</p>
              </div>
              <div className="border-l border-gray-100">
                <p className="text-2xl font-semibold" style={{ color: PRIMARY_COLOR, fontFamily: FONT_HEADER }}>
                  {mainOwner.experience_years || 4}+
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Years Exp.</p>
              </div>
            </section>
          )}

          {/* Standalone Video/Promo Section (Visible on both desktop & mobile) */}
          {showVideo && getYouTubeId(data?.youtube_url) && (
            <section className={`animate-fade-in-up ${getSectionStyle("video")}`}>
              <div className="w-full aspect-video rounded-3xl overflow-hidden bg-gray-100 relative group shadow-md">
                <iframe
                  className="w-full h-full border-0"
                  src={`https://www.youtube.com/embed/${getYouTubeId(data.youtube_url)}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}
          
          {/* Products or Services Section */}
          {products.length > 0 && (
            <section className={`animate-fade-in-up animation-delay-100 ${getSectionStyle("products")}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[17px] font-semibold text-gray-950 tracking-tight" style={{ fontFamily: FONT_HEADER }}>
                  Product or Services
                </h2>
                <span className="text-xs font-semibold hover:underline cursor-pointer" style={{ color: PRIMARY_COLOR }}>
                  See All
                </span>
              </div>

              <div
                ref={productContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2 -mx-6 px-6"
              >
                {products.map((prod: any, idx: number) => (
                  <div
                    key={idx}
                    className="w-56 flex-shrink-0 bg-white rounded-2xl overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-all duration-300"
                  >
                      <div className="aspect-square relative bg-gray-100 rounded-t-2xl overflow-hidden">
                        {(prod.image || prod.imageUrl) && (
                          <img
                            src={getImageUrl(prod.image || prod.imageUrl)}
                            alt={prod.name || prod.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    <div className="p-3.5 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-xs tracking-tight line-clamp-1">
                          {prod.name || prod.title}
                        </h3>
                        {prod.description && (
                          <p className="text-[10px] text-gray-500 line-clamp-2 mt-1 mb-2 font-medium leading-normal">
                            {prod.description}
                          </p>
                        )}
                        {prod.location && (
                          <div className="flex items-center gap-0.5 text-gray-400 mt-1 mb-2">
                            <HugeiconsIcon icon={Location01Icon} size={12} className="flex-shrink-0" />
                            <span className="text-[9px] font-semibold line-clamp-1">{prod.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-auto">
                        <div className="mb-3 flex items-center gap-0.5 text-gray-900">
                          <HugeiconsIcon icon={RupeeIcon} size={12} className="flex-shrink-0" />
                          <p className="text-xs font-semibold">
                            {prod.price ? prod.price.replace(/[₹$]/g, "") : ""}
                          </p>
                        </div>
                        <button 
                          className="w-full bg-transparent hover:bg-gray-50 text-xs py-2 rounded-lg font-bold active:scale-95 transition-all border text-center"
                          style={{ borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }}
                        >
                          {prod.buttonName || "Enquiry"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Gallery Section */}
          {/* Testimonials Section */}
          {testimonials.length > 0 && (
            <section className={`text-center flex flex-col items-center animate-fade-in-up animation-delay-300 w-full ${getSectionStyle("testimonials")}`}>
              <h2 className="text-[17px] font-semibold text-gray-950 tracking-tight mb-1" style={{ fontFamily: FONT_HEADER }}>
                What our happy client says
              </h2>
              <p className="text-[11px] text-gray-400 font-semibold max-w-[250px] leading-relaxed mb-8">
                This is an honest review from members
              </p>

              {/* Testimonial Active Display */}
              <div className="w-full flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 p-0.5 mb-4 shadow-md transition-all duration-300" style={{ borderColor: PRIMARY_COLOR }}>
                  <img
                    src={getImageUrl(testimonials[activeTestimonial].avatar)}
                    alt={testimonials[activeTestimonial].name}
                    className="w-full h-full object-cover rounded-full animate-fade-in-up"
                  />
                </div>
                
                {/* Stars with dynamic linear gradient fill based on decimal ratings */}
                <div className="flex gap-0.5 mb-3 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const rating = Number(testimonials[activeTestimonial].rating) || 5;
                    const fillPercent = Math.max(0, Math.min(100, (rating - idx) * 100));
                    const gradId = `star-grad-${idx}-${activeTestimonial}`;
                    return (
                      <svg
                        key={idx}
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill={`url(#${gradId})`}
                      >
                        <defs>
                          <linearGradient id={gradId}>
                            <stop offset={`${fillPercent}%`} stopColor="#facc15" />
                            <stop offset={`${fillPercent}%`} stopColor="#e5e7eb" />
                          </linearGradient>
                        </defs>
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    );
                  })}
                </div>

                <h3 className="font-semibold text-gray-900 text-sm mb-2">{testimonials[activeTestimonial].name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[300px] mb-6 font-medium italic min-h-[48px]">
                  &ldquo;{testimonials[activeTestimonial].comment}&rdquo;
                </p>

                {/* Divider line under comment */}
                <div className="w-24 border-t-2 mb-6" style={{ borderColor: PRIMARY_COLOR }} />

                {/* Navigation buttons */}
                {testimonials.length > 1 && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                    >
                      <HugeiconsIcon icon={ArrowLeft02Icon} size={18} />
                    </button>
                    <button
                      onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                      className="w-10 h-10 rounded-full text-white flex items-center justify-center active:scale-95 transition-all shadow-md cursor-pointer"
                      style={{ backgroundColor: PRIMARY_COLOR, boxShadow: `0 4px 10px ${PRIMARY_COLOR}25` }}
                    >
                      <HugeiconsIcon icon={ArrowRight02Icon} size={18} />
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Gallery Section */}
          {gallery.length > 0 && (
            <section className={`animate-fade-in-up animation-delay-200 ${getSectionStyle("gallery")}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[17px] font-semibold text-gray-950 tracking-tight" style={{ fontFamily: FONT_HEADER }}>Gallery</h2>
                <span className="text-xs font-semibold hover:underline cursor-pointer" style={{ color: PRIMARY_COLOR }}>
                  See All
                </span>
              </div>

              <div className="columns-2 md:columns-3 gap-3 [column-fill:balance] space-y-3">
                {gallery.slice(0, 7).map((item: any, idx: number) => {
                  const isLast = idx === 6 && gallery.length > 7;
                  return (
                    <div 
                      key={idx} 
                      onClick={() => setActiveImageIndex(idx)}
                      className="break-inside-avoid mb-3 rounded-2xl overflow-hidden bg-gray-100 hover:shadow-md relative group transition-shadow cursor-pointer"
                    >
                      <img 
                        src={getImageUrl(item.url)} 
                        alt={`Gallery ${idx}`} 
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 rounded-2xl" 
                      />
                      {isLast && (
                        <div className="absolute inset-0 bg-black/55 flex items-center justify-center text-white font-bold text-lg select-none animate-fade-in">
                          +{(gallery.length - 6).toString().padStart(2, '0')}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Social Links Section */}
          {(socialLinks.instagram || socialLinks.facebook || socialLinks.youtube || socialLinks.twitter) && (
            <section className={`animate-fade-in-up animation-delay-400 ${getSectionStyle("social")}`}>
              <h2 className="text-[17px] font-semibold text-gray-950 tracking-tight mb-4" style={{ fontFamily: FONT_HEADER }}>
                Social Links
              </h2>
              
              <div className="grid grid-cols-4 gap-4 text-center">
                {socialLinks.instagram && (
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                      <HugeiconsIcon icon={InstagramIcon} size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500">Instagram</span>
                  </a>
                )}

                {socialLinks.facebook && (
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                      <HugeiconsIcon icon={FacebookIcon} size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500">Facebook</span>
                  </a>
                )}

                {socialLinks.youtube && (
                  <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                      <HugeiconsIcon icon={YoutubeIcon} size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500">Youtube</span>
                  </a>
                )}

                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                      <HugeiconsIcon icon={TwitterIcon} size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500">Twitter</span>
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Enquiry Form */}
          <section className={`animate-fade-in-up animation-delay-500 ${getSectionStyle("enquiry")}`}>
            <div className="bg-white rounded-3xl p-8">
              <h2 className="text-[17px] font-semibold text-gray-950 tracking-tight mb-5" style={{ fontFamily: FONT_HEADER }}>
                Send an Enquiry
              </h2>
              
              <form onSubmit={handleEnquirySubmit} className="space-y-5">
                <div>
                  <label htmlFor="clientName" className="block text-sm font-semibold text-gray-950 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="clientPhone" className="block text-sm font-semibold text-gray-950 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="clientPhone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Mobile Number"
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="clientMessage" className="block text-sm font-semibold text-gray-950 mb-2">
                    Message
                  </label>
                  <textarea
                    id="clientMessage"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder=""
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 transition-all resize-none"
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-4 py-3 rounded-lg font-semibold animate-fade-in">
                    Enquiry submitted successfully! We will contact you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-lg font-semibold animate-fade-in">
                    {errorMessage}
                  </div>
                )}

                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ name: "", phone: "", message: "" });
                      setSubmitStatus("idle");
                      setErrorMessage("");
                    }}
                    className="flex-1 bg-slate-50 hover:bg-slate-100 text-gray-950 py-3.5 rounded-lg font-bold text-sm active:scale-[0.98] transition-all cursor-pointer text-center"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 text-white py-3.5 rounded-lg font-bold text-sm active:scale-[0.98] transition-all cursor-pointer"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Location Section */}
          {contact.maps_link && (
            <section className={`animate-fade-in-up ${getSectionStyle("location")}`}>
              <div className="bg-white rounded-3xl p-5">
                <h2 className="text-[17px] font-semibold text-gray-950 tracking-tight mb-1" style={{ fontFamily: FONT_HEADER }}>
                  Our Location
                </h2>
                <p className="text-xs text-gray-500 font-semibold mb-4 leading-relaxed">
                  {contact.address || "Find us on the map below for directions and visiting hours."}
                </p>
                <a 
                  href={contact.maps_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full h-44 rounded-2xl overflow-hidden relative border border-gray-100 group active:scale-[0.99] transition-all shadow-xs"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=60" 
                    alt="Map Location" 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div className="bg-white/95 backdrop-blur-xs text-gray-800 text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-full shadow-md flex items-center gap-1.5 group-hover:bg-white transition-colors">
                      <HugeiconsIcon icon={Location01Icon} size={12} style={{ color: PRIMARY_COLOR }} /> View on Google Maps
                    </div>
                  </div>
                </a>
              </div>
            </section>
          )}

      </div>

      {/* Floating CTA Actions (Fixed at absolute bottom of phone screen viewport, Z-50, hidden on desktop) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-20 bg-white/95 backdrop-blur-md border-t border-gray-100 flex items-center justify-between px-6 pb-2 z-50 md:hidden">
        <button 
          onClick={() => {
            setIsProductEnquiry(false);
            const element = document.getElementById("clientName");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
              element.focus();
            }
          }}
          className="w-[48%] text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
          style={{ backgroundColor: PRIMARY_COLOR, boxShadow: `0 8px 16px ${PRIMARY_COLOR}15` }}
        >
          <HugeiconsIcon icon={Message01Icon} size={16} /> Message
        </button>
        {contact.phone && (
          <button 
            onClick={() => {
              if (slug) trackUniqueAction(slug, TrackAction.Call);
              window.location.href = `tel:${contact.phone}`;
            }}
            className="w-[48%] py-3 rounded-lg font-bold text-sm border flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
            style={{ backgroundColor: PRIMARY_LIGHT, color: PRIMARY_COLOR, borderColor: PRIMARY_BORDER }}
          >
            <HugeiconsIcon icon={CallIcon} size={16} /> Call Now
          </button>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          {/* Close button */}
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2.5 cursor-pointer z-50 bg-black/40 rounded-full active:scale-95"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={22} />
          </button>

          {/* Navigation Controls & Main Image */}
          <div className="relative w-full max-w-4xl aspect-video md:aspect-[16/10] flex items-center justify-center">
            {/* Prev button */}
            <button
              onClick={() => setActiveImageIndex((prev) => (prev === null || prev === 0 ? gallery.length - 1 : prev - 1))}
              className="absolute left-2 md:left-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
            </button>

            {/* Main Image */}
            <img
              src={getImageUrl(gallery[activeImageIndex].url)}
              alt={`Gallery Full View ${activeImageIndex}`}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl animate-fade-in-up"
            />

            {/* Next button */}
            <button
              onClick={() => setActiveImageIndex((prev) => (prev === null || prev === gallery.length - 1 ? 0 : prev + 1))}
              className="absolute right-2 md:right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            >
              <HugeiconsIcon icon={ArrowRight02Icon} size={20} />
            </button>
          </div>

          {/* Indicator text */}
          <p className="text-white/60 text-xs font-semibold mt-4">
            {activeImageIndex + 1} / {gallery.length}
          </p>
        </div>
      )}

    </div>
  </div>
  );
}