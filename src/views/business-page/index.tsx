"use client";

import { BusinessPageApi } from "@/api/repositories/businessPageApi";
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  CallIcon,
  CheckmarkCircle02Icon,
  FacebookIcon,
  FavouriteIcon,
  InstagramIcon,
  Location01Icon,
  Mail01Icon,
  Message01Icon,
  PlayIcon,
  StarIcon,
  Store01Icon,
  TwitterIcon,
  UserIcon,
  WhatsappIcon,
  YoutubeIcon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";
import { usePageTracking } from "./hooks/usePageTracking";
import { trackUniqueAction } from "@/utils/analytics";
import { TrackAction } from "@/enums";

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
    if (url.startsWith("http") && !url.includes("localhost") && !url.includes("10.0.2.2") && !url.includes("127.0.0.1")) {
      return url;
    }
    const match = url.match(/\/uploads\/(.+)$/);
    if (match && match[1]) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";
      // Remove any trailing slashes from api url
      const cleanApiUrl = apiUrl.replace(/\/$/, "");
      return `${cleanApiUrl}/uploads/${match[1]}`;
    }
    return url;
  };

  // Safe defaults from database
  const header = data?.header || {};
  const contact = data?.contact || {};
  const ownerList = Array.isArray(data?.owner) ? data.owner : [];
  const products = Array.isArray(data?.products) ? data.products : [];
  const gallery = Array.isArray(data?.gallery) ? data.gallery : [];
  const testimonials = Array.isArray(data?.testimonials) ? data.testimonials : [];
  const socialLinks = data?.social_links || {};

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center md:py-0" style={{ fontFamily: FONT_SANS }}>
      {/* Premium Keyframes for Smooth Fade-In entry animations */}
     

      {/* Main wrapper: 100% width on mobile, max-w-[1100px] on desktop, no shadow */}
      <div className="w-full md:max-w-[1100px] bg-white min-h-screen md:min-h-[820px] md:h-[820px] shadow-none relative flex flex-col md:flex-row md:rounded-3xl md:overflow-hidden animate-fade-in-up">
        
        {/* ── LEFT COLUMN: Header & Profile Card ── */}
        <div className="w-full md:w-[42%] bg-white flex flex-col justify-between border-r border-gray-100 relative pb-4 md:pb-0 animate-fade-in-up">
          <div className="md:overflow-y-auto md:max-h-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-6">
            {/* Header Section */}
            <header className="bg-gray-100 pt-10 pb-[90px] px-6 text-center flex flex-col items-center">
              {/* Logo */}
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 mb-4 overflow-hidden p-3">
                {header.logo_url ? (
                  <img
                    src={getImageUrl(header.logo_url)}
                    alt={header.business_name || "Logo"}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div 
                    className="w-full h-full rounded-full flex items-center justify-center border"
                    style={{ backgroundColor: PRIMARY_LIGHT, color: PRIMARY_COLOR, borderColor: PRIMARY_BORDER }}
                  >
                    <HugeiconsIcon icon={Store01Icon} size={32} />
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight" style={{ fontFamily: FONT_HEADER }}>
                  {header.business_name || "MarketingSetu Client"}
                </h1>
                <span style={{ color: PRIMARY_COLOR }}>
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} />
                </span>
              </div>
              
              <p className="text-xs text-gray-500 font-semibold tracking-wide mb-3">
                {header.tagline || "Built on trust"}
              </p>
              
              {/* Badge */}
              {header.business_category && (
                <span 
                  className="text-white text-[10px] font-bold px-4.5 py-1.5 rounded-full tracking-wide uppercase shadow-sm"
                  style={{ backgroundColor: PRIMARY_COLOR, boxShadow: `0 2px 4px ${PRIMARY_COLOR}20` }}
                >
                  {header.business_category}
                </span>
              )}

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-4 w-full mt-8">
                {contact.phone && (
                  <a 
                    href={`tel:${contact.phone}`} 
                    onClick={() => { if (slug) trackUniqueAction(slug, TrackAction.Call); }}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-100 transition-colors">
                      <HugeiconsIcon icon={CallIcon} size={20} />
                    </div>
                    <span className="text-[11px] font-bold text-gray-600">Call</span>
                  </a>
                )}
                
                {contact.whatsapp && (
                  <a 
                    href={`https://wa.me/${contact.whatsapp}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => { if (slug) trackUniqueAction(slug, TrackAction.WhatsApp); }}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-100 transition-colors">
                      <HugeiconsIcon icon={WhatsappIcon} size={20} />
                    </div>
                    <span className="text-[11px] font-bold text-gray-600">WhatsApp</span>
                  </a>
                )}

                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-100 transition-colors">
                      <HugeiconsIcon icon={Mail01Icon} size={20} />
                    </div>
                    <span className="text-[11px] font-bold text-gray-600">Email</span>
                  </a>
                )}

                {contact.maps_link && (
                  <a 
                    href={contact.maps_link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => { if (slug) trackUniqueAction(slug, TrackAction.Directions); }}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-100 transition-colors">
                      <HugeiconsIcon icon={Location01Icon} size={20} />
                    </div>
                    <span className="text-[11px] font-bold text-gray-600">Direction</span>
                  </a>
                )}
              </div>
            </header>

            {/* Owner profile cards overlay */}
            {ownerList.length > 0 && (
              <div className="px-6 -mt-[65px] relative z-10 space-y-4 animate-fade-in-up">
                {ownerList.map((owner: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-3xl p-6 shadow-lg shadow-gray-150/40 border border-gray-100">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden relative border border-gray-100 flex-shrink-0">
                        {owner.avatar_url ? (
                          <img
                            src={getImageUrl(owner.avatar_url)}
                            alt={owner.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div 
                            className="w-full h-full rounded-full flex items-center justify-center"
                            style={{ backgroundColor: PRIMARY_LIGHT, color: PRIMARY_COLOR }}
                          >
                            <HugeiconsIcon icon={UserIcon} size={20} />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-1">
                          <h3 className="font-extrabold text-gray-900 text-base" style={{ fontFamily: FONT_HEADER }}>
                            {owner.name}
                          </h3>
                          <span style={{ color: PRIMARY_COLOR }}>
                            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">{owner.title}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">
                            <HugeiconsIcon icon={StarIcon} size={14} />
                          </span>
                          <span className="text-xs font-bold text-gray-800">{owner.rating || 4.9}</span>
                          <span className="text-[10px] text-gray-400">({owner.reviews_count || 0} Reviews)</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 border-y border-gray-100 py-3.5 my-4.5 text-center">
                      <div>
                        <p className="text-base font-black" style={{ color: PRIMARY_COLOR, fontFamily: FONT_HEADER }}>{owner.sales_count || 0}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Sales</p>
                      </div>
                      <div className="border-x border-gray-100">
                        <p className="text-base font-black" style={{ color: PRIMARY_COLOR, fontFamily: FONT_HEADER }}>{owner.experience_years || 0}+</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Years</p>
                      </div>
                      <div>
                        <p className="text-base font-black" style={{ color: PRIMARY_COLOR, fontFamily: FONT_HEADER }}>{owner.active_listings_count || 0}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Active</p>
                      </div>
                    </div>

                    {/* About Biography */}
                    {owner.bio && (
                      <div>
                        <h4 className="text-sm font-black text-gray-900 mb-1.5" style={{ fontFamily: FONT_HEADER }}>About</h4>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                          {owner.bio}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Only CTA Actions (Relative Flow) */}
          <div className="hidden md:flex relative h-auto mt-6 px-6 pb-6 items-center justify-between z-10">
            <button 
              onClick={() => {
                setIsProductEnquiry(false);
                const element = document.getElementById("clientName");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                  element.focus();
                }
              }}
              className="w-[48%] text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
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
                className="w-[48%] py-3.5 rounded-2xl font-bold text-sm border flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
                style={{ backgroundColor: PRIMARY_LIGHT, color: PRIMARY_COLOR, borderColor: PRIMARY_BORDER }}
              >
                <HugeiconsIcon icon={CallIcon} size={16} /> Call Now
              </button>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Content Sections ── */}
        <div className="w-full md:w-[58%] px-6 pt-8 flex flex-col md:overflow-y-auto md:h-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-32 md:pb-12">
          
          {/* Products or Services Section */}
          {products.length > 0 && (
            <section className="mt-8 pt-8 border-t border-gray-100 first:mt-0 first:pt-0 first:border-0 animate-fade-in-up animation-delay-100">
              <div className="flex justify-between items-center mb-4.5">
                <h2 className="text-base font-black text-gray-900" style={{ fontFamily: FONT_HEADER }}>
                  Product or Services
                </h2>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => scrollProducts("left")}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                  >
                    <HugeiconsIcon icon={ArrowLeft02Icon} size={14} />
                  </button>
                  <button
                    onClick={() => scrollProducts("right")}
                    className="w-7 h-7 rounded-full text-white flex items-center justify-center active:scale-95 transition-all shadow-md cursor-pointer"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  >
                    <HugeiconsIcon icon={ArrowRight02Icon} size={14} />
                  </button>
                </div>
              </div>

              <div
                ref={productContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2"
              >
                {products.map((prod: any, idx: number) => (
                  <div
                    key={idx}
                    className="w-52 flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="h-32 relative bg-gray-100">
                      {(prod.image || prod.imageUrl) && (
                        <img
                          src={getImageUrl(prod.image || prod.imageUrl)}
                          alt={prod.name || prod.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {prod.rating && (
                        <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs">
                          <span className="text-yellow-400">
                            <HugeiconsIcon icon={StarIcon} size={10} />
                          </span>{" "}
                          {prod.rating}
                        </span>
                      )}
                    </div>
                    <div className="p-3.5 flex-grow flex flex-col justify-between">
                      <div>
                        {prod.type && (
                          <span 
                            className="inline-block text-[8px] font-black px-2 py-0.5 rounded-md mb-1.5"
                            style={{ backgroundColor: PRIMARY_LIGHT, color: PRIMARY_COLOR }}
                          >
                            {prod.type}
                          </span>
                        )}
                        <h3 className="font-extrabold text-gray-900 text-xs tracking-tight line-clamp-1">
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
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-[11px] font-black text-gray-900">
                            {prod.price}
                          </p>
                          <span className="text-gray-400 hover:text-red-500 transition-colors">
                            <HugeiconsIcon icon={FavouriteIcon} size={14} />
                          </span>
                        </div>
                        <button 
                          className="w-full text-white py-2 rounded-2xl font-bold text-[10px] uppercase tracking-wider active:scale-95 transition-all shadow-sm"
                          style={{ backgroundColor: PRIMARY_COLOR }}
                        >
                          {prod.buttonName || "Enquire"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Gallery Section */}
          {gallery.length > 0 && (
            <section className="mt-8 pt-8 border-t border-gray-100 first:mt-0 first:pt-0 first:border-0 animate-fade-in-up animation-delay-200">
              <div className="flex justify-between items-center mb-4.5">
                <h2 className="text-base font-black text-gray-900" style={{ fontFamily: FONT_HEADER }}>Gallery</h2>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {gallery.map((item: any, idx: number) => (
                  <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-gray-100 hover:shadow-md relative group transition-shadow cursor-pointer">
                    <img src={getImageUrl(item.url)} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    {item.type === "video" && (
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md text-gray-800">
                          <HugeiconsIcon icon={PlayIcon} size={14} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Testimonials Section */}
          {testimonials.length > 0 && (
            <section className="mt-8 pt-8 border-t border-gray-100 first:mt-0 first:pt-0 first:border-0 text-center flex flex-col items-center animate-fade-in-up animation-delay-300">
              <h2 className="text-xl font-black text-gray-900 mb-2" style={{ fontFamily: FONT_HEADER }}>
                What do they <span className="text-orange-500">say?</span>
              </h2>
              <p className="text-[11px] text-gray-400 font-semibold max-w-[250px] leading-relaxed mb-8">
                This is an honest review from members who have joined us
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
                
                {/* Stars */}
                <div className="flex gap-0.5 mb-3 text-yellow-400">
                  {Array.from({ length: testimonials[activeTestimonial].rating || 5 }).map((_: any, idx: number) => (
                    <HugeiconsIcon key={idx} icon={StarIcon} size={14} />
                  ))}
                </div>

                <h3 className="font-extrabold text-gray-900 text-sm mb-2">{testimonials[activeTestimonial].name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[300px] mb-8 font-medium italic min-h-[48px]">
                  &ldquo;{testimonials[activeTestimonial].comment}&rdquo;
                </p>

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

          {/* Social Links Section */}
          {(socialLinks.instagram || socialLinks.facebook || socialLinks.youtube || socialLinks.twitter) && (
            <section className="mt-8 pt-8 border-t border-gray-100 first:mt-0 first:pt-0 first:border-0 animate-fade-in-up animation-delay-400">
              <h2 className="text-base font-black text-gray-900 mb-4.5" style={{ fontFamily: FONT_HEADER }}>
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
          <section className="mt-8 pt-8 border-t border-gray-100 first:mt-0 first:pt-0 first:border-0 animate-fade-in-up animation-delay-500">
            <div className="bg-gray-50 rounded-3xl p-6">
              <h2 className="text-base font-black text-gray-900 mb-1" style={{ fontFamily: FONT_HEADER }}>
                Send an Enquiry
              </h2>
              <p className="text-[11px] text-gray-400 font-semibold mb-4">Have questions? Fill out the details below to contact us.</p>
              
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div>
                  <label htmlFor="clientName" className="block text-[10px] font-black text-gray-600 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="clientPhone" className="block text-[10px] font-black text-gray-600 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="clientPhone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your mobile number"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="clientMessage" className="block text-[10px] font-black text-gray-600 uppercase tracking-wider mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    id="clientMessage"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter your message"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 transition-all resize-none"
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-4 py-3 rounded-xl font-semibold">
                    Enquiry submitted successfully! We will contact you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl font-semibold">
                    {errorMessage}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ name: "", phone: "", message: "" });
                      setSubmitStatus("idle");
                      setErrorMessage("");
                    }}
                    className="w-[30%] bg-transparent hover:bg-gray-100 text-gray-500 py-3.5 rounded-2xl font-bold text-xs border border-gray-200 active:scale-[0.98] transition-all cursor-pointer text-center"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-[70%] text-white py-3.5 rounded-2xl font-bold text-xs active:scale-[0.98] transition-all cursor-pointer"
                    style={{ backgroundColor: PRIMARY_COLOR, boxShadow: `0 8px 16px ${PRIMARY_COLOR}10` }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </div>
              </form>
            </div>
          </section>

      </div>

      {/* Mobile Only CTA Actions (Fixed at absolute bottom of phone screen viewport, Z-50) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-md border-t border-gray-100 flex items-center justify-between px-6 pb-2 z-50">
        <button 
          onClick={() => {
            setIsProductEnquiry(false);
            const element = document.getElementById("clientName");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
              element.focus();
            }
          }}
          className="w-[48%] text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
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
            className="w-[48%] py-3 rounded-2xl font-bold text-sm border flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
            style={{ backgroundColor: PRIMARY_LIGHT, color: PRIMARY_COLOR, borderColor: PRIMARY_BORDER }}
          >
            <HugeiconsIcon icon={CallIcon} size={16} /> Call Now
          </button>
        )}
      </div>
    </div>
  </div>
);
}