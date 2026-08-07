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
  MotorbikeIcon,
  PlayIcon,
  StarIcon,
  TwitterIcon,
  WhatsappIcon,
  YoutubeIcon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";

// Final Brand Color Tokens (matching the mobile app _Palette.brandMain)
const PRIMARY_COLOR = "#7265E3";
const PRIMARY_LIGHT = "#f0effd";
const PRIMARY_BORDER = "#e3e1fc";

interface BusinessViewProps {
  data: any;
  businessName: string;
}

export default function BusinessView({ data, businessName }: BusinessViewProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
      await BusinessPageApi.submitEnquiry(businessName, {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        isProduct: false,
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

  const testimonials = [
    {
      name: "Nany Brugman",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      rating: 5,
      comment: "I am quite satisfied, because the skills I want or dream of can really be mastered."
    },
    {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      rating: 5,
      comment: "Committed to delivering outstanding performance and values. The quality is exceptional!"
    }
  ];

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

  const products = [
    { id: 1, title: "Lavender Manor", type: "Apartment", price: "$1,900", location: "Reykjavik, Iceland", rating: "4.3", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=300" },
    { id: 2, title: "Rosewood Retreat", type: "Apartment", price: "$1,300", location: "Cape Town, South Africa", rating: "4.8", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=300" },
    { id: 3, title: "Enoch Valley Villa", type: "Villa", price: "$4,500", location: "Stowe, Vermont", rating: "4.9", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=300" },
    { id: 4, title: "Maplewood Cottage", type: "Cottage", price: "$1,100", location: "Ontario, Canada", rating: "4.6", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=300" },
    { id: 5, title: "Blue Horizon Condo", type: "Condo", price: "$2,200", location: "Miami, Florida", rating: "4.5", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=300" },
    { id: 6, title: "Pinecrest Cabin", type: "Cabin", price: "$950", location: "Aspen, Colorado", rating: "4.7", image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=300" },
    { id: 7, title: "Urban Oasis Loft", type: "Loft", price: "$2,800", location: "London, UK", rating: "4.4", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=300" },
    { id: 8, title: "Sundance Studio", type: "Studio", price: "$850", location: "Phoenix, Arizona", rating: "4.2", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=300" },
    { id: 9, isShowAll: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center md:py-0">
      {/* Premium Keyframes for Smooth Fade-In entry animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-500 { animation-delay: 500ms; }
      `}} />

      {/* Main wrapper: max-w-md (phone size) on mobile, max-w-5xl (splitscreen) on desktop */}
      <div className="w-full max-w-md md:max-w-[1100px] bg-white min-h-screen md:min-h-[820px] md:h-[820px] md:shadow-none shadow-2xl relative flex flex-col md:flex-row md:rounded-3xl overflow-hidden animate-fade-in-up">
        
        {/* ── LEFT COLUMN: Header & Profile Card ── */}
        <div className="w-full md:w-[42%] bg-white flex flex-col justify-between border-r border-gray-100 relative pb-20 md:pb-0">
          <div>
            {/* Header Section */}
            <header className="bg-gray-100 pt-10 pb-[90px] px-6 text-center flex flex-col items-center">
              {/* Logo */}
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 mb-4 overflow-hidden p-3">
                {data?.logo_url ? (
                  <img
                    src={data.logo_url}
                    alt={data?.business_name || "Logo"}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div 
                    className="w-full h-full rounded-full flex items-center justify-center border"
                    style={{ backgroundColor: PRIMARY_LIGHT, color: PRIMARY_COLOR, borderColor: PRIMARY_BORDER }}
                  >
                    <HugeiconsIcon icon={MotorbikeIcon} size={32} />
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Renuka Motocorp Nira</h1>
                <span style={{ color: PRIMARY_COLOR }}>
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} />
                </span>
              </div>
              
              <p className="text-xs text-gray-500 font-semibold tracking-wide mb-3">Built on trust</p>
              
              {/* Badge */}
              <span 
                className="text-white text-[10px] font-bold px-4.5 py-1.5 rounded-full tracking-wide uppercase shadow-sm"
                style={{ backgroundColor: PRIMARY_COLOR, boxShadow: `0 2px 4px ${PRIMARY_COLOR}20` }}
              >
                Electric Scooter Showroom
              </span>

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-4 w-full mt-8">
                <a href="tel:#" className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-100 transition-colors">
                    <HugeiconsIcon icon={CallIcon} size={20} />
                  </div>
                  <span className="text-[11px] font-bold text-gray-600">Call</span>
                </a>
                
                <a href="https://wa.me/#" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-100 transition-colors">
                    <HugeiconsIcon icon={WhatsappIcon} size={20} />
                  </div>
                  <span className="text-[11px] font-bold text-gray-600">WhatsApp</span>
                </a>

                <a href="mailto:#" className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-100 transition-colors">
                    <HugeiconsIcon icon={Mail01Icon} size={20} />
                  </div>
                  <span className="text-[11px] font-bold text-gray-600">Email</span>
                </a>

                <a href="#" className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-100 transition-colors">
                    <HugeiconsIcon icon={Location01Icon} size={20} />
                  </div>
                  <span className="text-[11px] font-bold text-gray-600">Direction</span>
                </a>
              </div>
            </header>

            {/* Owner profile card overlay */}
            <div className="px-6 -mt-[65px] relative z-10">
              <div className="bg-white rounded-3xl p-6 shadow-lg shadow-gray-150/40 border border-gray-100">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden relative border border-gray-100 flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
                      alt="Owner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-1">
                      <h3 className="font-extrabold text-gray-900 text-base">Mikhaela Brooklyn</h3>
                      <span style={{ color: PRIMARY_COLOR }}>
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-semibold mb-1">Premium Real Estate Agent</p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">
                        <HugeiconsIcon icon={StarIcon} size={14} />
                      </span>
                      <span className="text-xs font-bold text-gray-800">4.9</span>
                      <span className="text-[10px] text-gray-400">(127 Reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 border-y border-gray-100 py-3.5 my-4.5 text-center">
                  <div>
                    <p className="text-base font-black" style={{ color: PRIMARY_COLOR }}>127</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Sales</p>
                  </div>
                  <div className="border-x border-gray-100">
                    <p className="text-base font-black" style={{ color: PRIMARY_COLOR }}>8+</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Years</p>
                  </div>
                  <div>
                    <p className="text-base font-black" style={{ color: PRIMARY_COLOR }}>15</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Active</p>
                  </div>
                </div>

                {/* About Biography */}
                <div>
                  <h4 className="text-sm font-black text-gray-900 mb-1.5">About</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    Experienced real estate agent specializing in luxury properties in Manhattan and Brooklyn. Committed to helping clients find their dream homes with personalized service and market expertise.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky actions at base of Left Column (Desktop) or bottom of view (Mobile) */}
          <div className="fixed md:absolute bottom-0 md:bottom-3 left-0 right-0 h-18 bg-white/90 backdrop-blur-md border-t border-gray-100 flex items-center justify-between px-4 md:pb-4 z-40">
            <button 
              className="w-[48%] text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
              style={{ backgroundColor: PRIMARY_COLOR, boxShadow: `0 8px 16px ${PRIMARY_COLOR}15` }}
            >
              <HugeiconsIcon icon={Message01Icon} size={16} /> Message
            </button>
            <button 
              className="w-[48%] py-3.5 rounded-2xl font-bold text-sm border flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
              style={{ backgroundColor: PRIMARY_LIGHT, color: PRIMARY_COLOR, borderColor: PRIMARY_BORDER }}
            >
              <HugeiconsIcon icon={CallIcon} size={16} /> Call Now
            </button>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Content Sections ── */}
        <div className="w-full md:w-[58%] px-6 py-6 flex flex-col overflow-y-auto md:h-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden space-y-6 pb-32 md:pb-12">
          
          {/* Products or Services Section */}
          <section className="animate-fade-in-up animation-delay-100">
            <div className="flex justify-between items-center mb-4.5">
              <h2 className="text-base font-black text-gray-900">Product or Services</h2>
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
              {products.map((prod) => {
                if (prod.isShowAll) {
                  return (
                    <div
                      key="show-all"
                      className="w-48 flex-shrink-0 rounded-3xl flex flex-col items-center justify-center p-5 border border-dashed text-center cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all min-h-[220px]"
                      style={{ backgroundColor: PRIMARY_LIGHT, borderColor: PRIMARY_BORDER }}
                    >
                      <div 
                        className="w-10 h-10 rounded-full text-white flex items-center justify-center mb-3"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                      >
                        <HugeiconsIcon icon={ArrowRight02Icon} size={18} />
                      </div>
                      <span className="text-sm font-black" style={{ color: PRIMARY_COLOR }}>Show All</span>
                      <span className="text-[10px] font-bold mt-1" style={{ color: PRIMARY_COLOR }}>View 9+ Services</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={prod.id}
                    className="w-48 flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="h-28 relative bg-gray-100">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs">
                        <span className="text-yellow-400">
                          <HugeiconsIcon icon={StarIcon} size={10} />
                        </span>{" "}
                        {prod.rating}
                      </span>
                    </div>
                    <div className="p-3.5 flex-grow flex flex-col justify-between">
                      <div>
                        <span 
                          className="inline-block text-[8px] font-black px-2 py-0.5 rounded-md mb-2"
                          style={{ backgroundColor: PRIMARY_LIGHT, color: PRIMARY_COLOR }}
                        >
                          {prod.type}
                        </span>
                        <h3 className="font-extrabold text-gray-900 text-xs tracking-tight line-clamp-1 mb-1">
                          {prod.title}
                        </h3>
                        <div className="flex items-center gap-0.5 text-gray-400 mb-3">
                          <HugeiconsIcon icon={Location01Icon} size={12} className="flex-shrink-0" />
                          <span className="text-[9px] font-semibold line-clamp-1">{prod.location}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-auto">
                        <p className="text-[11px] font-black text-gray-900">
                          {prod.price} <span className="text-[8px] text-gray-400 font-normal">/month</span>
                        </p>
                        <span className="text-gray-400 hover:text-red-500 transition-colors">
                          <HugeiconsIcon icon={FavouriteIcon} size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Gallery Section */}
          <section className="animate-fade-in-up animation-delay-200">
            <div className="flex justify-between items-center mb-4.5">
              <h2 className="text-base font-black text-gray-900">Gallery</h2>
              <button className="font-bold text-xs" style={{ color: PRIMARY_COLOR }}>See All</button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=180" alt="G1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=180" alt="G2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=180" alt="G3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=180" alt="G4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              
              {/* Gallery item with play button */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative group cursor-pointer hover:shadow-md transition-shadow">
                <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=180" alt="G5" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 animate-pulse" />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md text-gray-800 group-hover:scale-110 transition-transform">
                    <HugeiconsIcon icon={PlayIcon} size={14} />
                  </div>
                </div>
              </div>

              {/* Gallery +More overlay */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative group cursor-pointer hover:shadow-md transition-shadow">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=180" alt="G6" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-extrabold text-sm tracking-wide group-hover:scale-110 transition-transform">+05</span>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="text-center flex flex-col items-center animate-fade-in-up animation-delay-300">
            <h2 className="text-xl font-black text-gray-900 mb-2">
              What do they <span className="text-orange-500">say?</span>
            </h2>
            <p className="text-[11px] text-gray-400 font-semibold max-w-[250px] leading-relaxed mb-8">
              This is an honest review from members who have joined us
            </p>

            {/* Testimonial Active Display */}
            <div className="w-full flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 p-0.5 mb-4 shadow-md transition-all duration-300" style={{ borderColor: PRIMARY_COLOR }}>
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="w-full h-full object-cover rounded-full animate-fade-in-up"
                />
              </div>
              
              {/* Stars */}
              <div className="flex gap-0.5 mb-3 text-yellow-400">
                {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, idx) => (
                  <HugeiconsIcon key={idx} icon={StarIcon} size={14} />
                ))}
              </div>

              <h3 className="font-extrabold text-gray-900 text-sm mb-2">{testimonials[activeTestimonial].name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[300px] mb-8 font-medium italic min-h-[48px]">
                &ldquo;{testimonials[activeTestimonial].comment}&rdquo;
              </p>

              {/* Navigation buttons */}
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
            </div>
          </section>

          {/* Social Links Section */}
          <section className="animate-fade-in-up animation-delay-400">
            <h2 className="text-base font-black text-gray-900 mb-6">Social Links</h2>
            
            <div className="grid grid-cols-4 gap-4 text-center">
              <a href="#" className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                  <HugeiconsIcon icon={InstagramIcon} size={20} />
                </div>
                <span className="text-[10px] font-bold text-gray-500">Instagram</span>
              </a>

              <a href="#" className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                  <HugeiconsIcon icon={FacebookIcon} size={20} />
                </div>
                <span className="text-[10px] font-bold text-gray-500">Facebook</span>
              </a>

              <a href="#" className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                  <HugeiconsIcon icon={YoutubeIcon} size={20} />
                </div>
                <span className="text-[10px] font-bold text-gray-500">Youtube</span>
              </a>

              <a href="#" className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                  <HugeiconsIcon icon={TwitterIcon} size={18} />
                </div>
                <span className="text-[10px] font-bold text-gray-500">Twitter</span>
              </a>
            </div>
          </section>

          {/* Enquiry Form */}
          <section className="bg-gray-50 rounded-3xl p-6 mt-4 animate-fade-in-up animation-delay-500">
            <h2 className="text-base font-black text-gray-900 mb-1">Send an Enquiry</h2>
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
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-4 py-3 rounded-xl font-semibold animate-pulse">
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
          </section>

        </div>

      </div>
    </div>
  );
}