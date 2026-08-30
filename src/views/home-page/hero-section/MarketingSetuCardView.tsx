"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CallIcon,
  WhatsappIcon,
  Mail01Icon,
  Location01Icon,
  UserIcon,
  CheckmarkCircle02Icon,
  Share01Icon,
  StarIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  InstagramIcon,
  YoutubeIcon,
  NewTwitterIcon,
  PlayIcon,
  RupeeIcon,
  DribbbleIcon,
  SmartphoneNfcIcon,
} from "@hugeicons/core-free-icons";

const INDIGO = "#4F46E5";

export default function MarketingSetuCardView({ isCenter = true }: { isCenter?: boolean }) {
  const [testimonialIdx] = useState(0);
  const testimonials = [
    { name: "Ramesh Kumar", text: "Absolutely loved the digital business card! Extremely convenient and professional." },
    { name: "Priya Desai", text: "MarketingSetu helped our salon get 3x more inquiries in the first month!" },
  ];
  const t = testimonials[testimonialIdx % testimonials.length];

  return (
    <div className="w-full h-full bg-[#F8F7FF] text-[#1F2937] font-sans text-left flex flex-col overflow-hidden relative select-none">

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-hidden relative w-full h-full">
        <main className={`w-full flex flex-col pb-16 ${isCenter ? "animate-vertical-scroll" : ""}`}>

          {/* ── HEADER / HERO ── */}
          <header className="pt-6 pb-5 px-4 flex flex-col items-center bg-[#F3F0FF] rounded-b-[28px] relative">
            <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-xs">
              <HugeiconsIcon icon={Share01Icon} size={14} className="text-[#6B7280]" />
            </button>

            {/* Avatar */}
            <div className="w-20 h-20 rounded-full border-2 border-white shadow-md mb-3 bg-white flex items-center justify-center overflow-hidden">
              <HugeiconsIcon icon={UserIcon} size={36} className="text-[#4F46E5]" />
            </div>

            <h1 className="font-extrabold text-sm flex items-center gap-1.5 text-[#1F2937]">
              Dhananjay L
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} className="text-[#4F46E5]" />
            </h1>
            <p className="text-[9px] font-semibold text-[#6B7280] mt-0.5">Founder &amp; CEO</p>
            <span className="mt-2 px-4 py-1 bg-[#4F46E5] text-white text-[9px] font-bold rounded-full">MarketingSetu</span>

            {/* Quick Actions */}
            <div className="flex justify-center gap-5 mt-5 w-full">
              {[
                { icon: CallIcon, label: "Call" },
                { icon: WhatsappIcon, label: "WhatsApp" },
                { icon: Mail01Icon, label: "Email" },
                { icon: Location01Icon, label: "Location" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center">
                    <HugeiconsIcon icon={icon} size={17} className="text-[#374151]" />
                  </div>
                  <span className="text-[8px] font-bold text-[#374151]">{label}</span>
                </div>
              ))}
            </div>
          </header>

          {/* ── USER INFO ── */}
          <div className="px-3.5 mt-4 space-y-4">
            <div className="bg-white rounded-2xl p-3 shadow-xs flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#E5E0FF] flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={UserIcon} size={20} className="text-[#4F46E5]" />
              </div>
              <div>
                <h2 className="font-bold text-[12px] flex items-center gap-1">
                  Dhananjay L
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={12} className="text-green-500" />
                </h2>
                <p className="text-[9px] text-[#6B7280] font-medium">Founder &amp; CEO</p>
              </div>
            </div>

            {/* ── ABOUT ── */}
            <div>
              <h3 className="font-bold text-[12px] mb-1.5">About</h3>
              <p className="text-[9px] text-[#6B7280] leading-relaxed">
                Pioneering advanced marketing tools and custom landing page builders to help local businesses grow their customer base and scale operations with ease.
              </p>
            </div>

            {/* ── STATS ── */}
            <div className="flex bg-white rounded-2xl shadow-xs divide-x divide-gray-100 py-3">
              <div className="flex-1 text-center">
                <div className="font-extrabold text-lg text-[#4F46E5]">140+</div>
                <div className="text-[7.5px] font-bold text-gray-400 uppercase tracking-wider">Happy Customers</div>
              </div>
              <div className="flex-1 text-center">
                <div className="font-extrabold text-lg text-[#4F46E5]">4+</div>
                <div className="text-[7.5px] font-bold text-gray-400 uppercase tracking-wider">Years Exp.</div>
              </div>
            </div>

            {/* ── VIDEO ── */}
            <div className="rounded-2xl overflow-hidden relative shadow-md bg-black h-28">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKcHKkSLvzDF8aPeAfJ2iOUO_M8liE8SE6uboWIfP0MDoa9vnAOfZtWr8lsETEeplxeO1Du9CmJUhmWsI4iI8HB-5GnfgbTj3o40MQAx8Pq8MxzpyaePkhOfgzGdNn3T33aJGo8XZSf7cL_sZs8ndPosyJ05-th8wkUUnfODohq91hW8sfKZ5pCRMOmY-ZyHrtgXCm8skVUgRNnnMX_-5Fd1O0mVBW_IL-gzkGUk29Zlex0BxmBSbbDg"
                alt="Video Thumbnail"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-7 bg-red-600 rounded-lg flex items-center justify-center">
                  <HugeiconsIcon icon={PlayIcon} size={16} className="text-white" />
                </div>
              </div>
            </div>

            {/* ── PRODUCTS & SERVICES ── */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <h3 className="font-bold text-[12px]">Products &amp; Services</h3>
                <span className="text-[#4F46E5] text-[9px] font-bold">See All</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Digital Card Basic", price: "3,499", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqKdfoAXh2ROBWsm23yueaR3bC0ugX20zvK3yzti1EO8VngqewDGYfCb-SQKWVJbeV1rvefqrLmQf6QmdlKa5P_rAH1wXTvD5M9Ae7VOSbSzQs2ARZS_YZOamngfLDs2AmrSHyoYEBe1WuOCDatbQOzzHYXzBkor1l-iZAfOaQ1KO_iCjErdDdAq_FHGEu50Gp75uQqA-O1mlua5FR8k-ohzl6up_UZImHzENUnyT-Le5YtIEjuEy6jA" },
                  { name: "Category Smart Card", price: "7,499", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5gZp3sHJ8g-Bd_TC74TjufS5H_0axHLNK-Qo0_9Fv8v-isqm1i7AdBlGv2UCIV06AIVjaBSqpzlpbbO-9Z-SpF5XYedw8txwDxOvr3R_xA2rDIuzsxf4vpanaWdJ_u3ZFLGSyL_4-wisuq98KOPFkExuGUGIvDLP5uoRoDQ_U3891SZm7KW7KSMNQs1Qw4eW41FVVh-eTlbmr9cudPWe6hCJNfZQgVl1KiceGPO77NFOagMgIW5KQ" },
                ].map(({ name, price, img }) => (
                  <div key={name} className="bg-white rounded-2xl shadow-xs overflow-hidden flex flex-col">
                    <img src={img} alt={name} className="w-full h-24 object-cover" />
                    <div className="p-2 flex flex-col flex-1">
                      <h4 className="font-bold text-[9.5px] mb-0.5 truncate">{name}</h4>
                      <p className="text-[#4F46E5] font-bold text-[9.5px] flex items-center gap-0.5 mb-2">
                        <HugeiconsIcon icon={RupeeIcon} size={10} /> {price}
                      </p>
                      <button className="w-full py-1 border border-[#4F46E5] text-[#4F46E5] font-bold text-[8.5px] rounded-lg">
                        Enquiry
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── TESTIMONIAL ── */}
            <div className="text-center pt-6 pb-2 relative">
              <h3 className="font-bold text-[12px] mb-0.5">What our happy clients say</h3>
              <p className="text-[8px] text-[#6B7280] mb-6">Honest reviews from our members</p>
              <div className="bg-white rounded-2xl shadow-xs p-4 relative mt-8">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-[#E5E0FF] overflow-hidden bg-white">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjUrs_pjWujUhnMgcZe0RTwXoH57cGO4anOTw8iNSRklCLLV1QJFTXno-0GNzrAG145urUGoB5w-GctZxdgm4hIaDfMqaLaJa3eZfukt4KQipsRrmulMG9Miy4WBCyeg6MiL1rCgkqdY0axzzKKY9x6wdTF4W2-1PIG0ATvWhUb7mSyopDIhdtIzN3-srt_ylj227i2hE45VrbEzPXCMsG6SZhPwZpSbGTPoqmNNaPe5SPywAqRuXpXg" alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-center gap-0.5 text-yellow-400 mt-5 mb-1.5">
                  {[...Array(5)].map((_, i) => <HugeiconsIcon key={i} icon={StarIcon} size={11} />)}
                </div>
                <h4 className="font-bold text-[10.5px] mb-1">{t.name}</h4>
                <p className="text-[#6B7280] text-[8.5px] font-normal leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              </div>
              <div className="flex justify-center gap-3 mt-4">
                <button className="w-8 h-8 rounded-full bg-white text-[#6B7280] shadow-xs flex items-center justify-center">
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
                </button>
                <button className="w-8 h-8 rounded-full bg-[#4F46E5] text-white shadow-xs flex items-center justify-center">
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                </button>
              </div>
            </div>

            {/* ── GALLERY ── */}
            <div className="grid grid-cols-2 gap-2">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEmzzqhOlSsep-FK8XZ1Cb3-Qwz_mZdYCW35RnsAqmynziVz7hueWUbCkiXK67nW-PeU5_EMX3raFOz3yALx7c46bj1eYQNthg1ztTdT7SVPa-vL5L1cNQTILtQwtT2hxAf7_Y1G_EJJQ6vCh64ugQVJdhpdPJlnQywThKjqPJQ8ROgC3zkVaXS2Dp695aTpniXyDgMG0K8tbwVqDPMXLQ0oV1vlTq0ggEPemyE30yAWzpmkMQ-UykLw" alt="Gallery 1" className="w-full h-44 object-cover rounded-2xl shadow-xs" />
              <div className="flex flex-col gap-2">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq7aVx93XxdTdcPdZ1jBKEIbQAfD-bmUulBiBAh8vm5qwS9MC10sD336NEVz0ADGwkqjiiEWQyFUAcjaej3_UhYaf88ATUosM3AOQ6txfUG7Eqr2OsJRVqkDrU8WzAc_EkZ_lSwE6ln4pAdjv1nuusakmDNxlD8xxYOeKSG0Ntt0UV6NI6pJh0kKPhmPZpEJeW-RKm35ZVL2K-nJrl0ocrd7dDKwPYFny-Q0cOON0sD7BZWaYi7YjtgQ" alt="Gallery 2" className="w-full h-[84px] object-cover rounded-2xl shadow-xs" />
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGlhb7TE4R6CTo8pFWnIk6GDU6Wg319T2sWTd5wfTtqdB3yzYLDQxoQ5UyD5BoREiY64mU5iW5H45avY3jfWQ-_hv9jJbUA_2V5sGUMoLNuYM8ks6XbllvKWLelWkaD4wTK80-JRuz4gN4s5U4by_2b0dKPp8wnNbx0gB-OeuzwyhIwHpJRyaUZSIgznMuhb-V5xxOSgqyUh6ZhxMzw2YZgntihH3rn16w550bqs7fcZZ3y-_k9lWd1w" alt="Gallery 3" className="w-full h-[84px] object-cover rounded-2xl shadow-xs" />
              </div>
            </div>

            {/* ── SOCIAL LINKS ── */}
            <div>
              <h3 className="font-bold text-[12px] mb-4">Social Links</h3>
              <div className="flex justify-between px-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center shadow-md">
                    <HugeiconsIcon icon={InstagramIcon} size={18} className="text-white" />
                  </div>
                  <span className="text-[8px] font-bold text-[#6B7280]">Instagram</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center shadow-md">
                    <HugeiconsIcon icon={DribbbleIcon} size={18} className="text-white" />
                  </div>
                  <span className="text-[8px] font-bold text-[#6B7280]">Facebook</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center shadow-md">
                    <HugeiconsIcon icon={YoutubeIcon} size={18} className="text-white" />
                  </div>
                  <span className="text-[8px] font-bold text-[#6B7280]">YouTube</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shadow-md">
                    <HugeiconsIcon icon={NewTwitterIcon} size={18} className="text-white" />
                  </div>
                  <span className="text-[8px] font-bold text-[#6B7280]">Twitter</span>
                </div>
              </div>
            </div>

            {/* ── ENQUIRY FORM ── */}
            <div className="bg-white rounded-3xl p-4 shadow-xs">
              <h3 className="font-bold text-[12px] mb-3">Send an Enquiry</h3>
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[9px] font-bold text-[#374151] mb-1">Full Name</label>
                  <input readOnly className="w-full px-3 py-2 rounded-xl border border-gray-200 text-[9px] bg-gray-50 placeholder-gray-400" placeholder="Enter your name" type="text" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[#374151] mb-1">Mobile Number</label>
                  <input readOnly className="w-full px-3 py-2 rounded-xl border border-gray-200 text-[9px] bg-gray-50 placeholder-gray-400" placeholder="Mobile Number" type="tel" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[#374151] mb-1">Message</label>
                  <textarea readOnly className="w-full px-3 py-2 rounded-xl border border-gray-200 text-[9px] bg-gray-50 placeholder-gray-400 resize-none h-14" placeholder="Enter your message" />
                </div>
                <div className="flex gap-2 pt-1">
                  <button className="flex-1 py-2 bg-gray-50 text-[#374151] font-bold text-[9px] rounded-xl">Reset</button>
                  <button className="flex-1 py-2 bg-[#4F46E5] text-white font-bold text-[9px] rounded-xl">Submit</button>
                </div>
              </div>
            </div>

            {/* ── LOCATION ── */}
            <div>
              <h3 className="font-bold text-[12px] mb-1">Our Location</h3>
              <p className="text-[#6B7280] text-[8px] mb-2">Pune, Maharashtra — Find us on the map below.</p>
              <div className="relative w-full h-36 rounded-2xl overflow-hidden shadow-xs">
                <iframe
                  title="MarketingSetu Pune Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242021.29869823853!2d73.6745!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1691234567890!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
                <a
                  href="https://maps.google.com/?q=Pune,Maharashtra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-[#374151] font-bold text-[8px] px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap"
                >
                  <HugeiconsIcon icon={Location01Icon} size={12} className="text-[#4F46E5]" />
                  VIEW ON GOOGLE MAPS
                </a>
              </div>
            </div>

          </div>

          {/* ── FLOATING BAR (static at bottom of scroll) ── */}
          <div className="px-3.5 pt-4 mt-2">
            <div className="flex gap-2 bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-md border border-gray-100">
              <button className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                <HugeiconsIcon icon={SmartphoneNfcIcon} size={16} className="text-white" />
              </button>
              <button className="flex-1 bg-[#4F46E5] text-white rounded-xl font-bold text-[9px] flex items-center justify-center gap-1 shadow-sm">
                <HugeiconsIcon icon={WhatsappIcon} size={15} /> Message
              </button>
              <button className="flex-1 bg-[#F5F3FF] text-[#4F46E5] rounded-xl font-bold text-[9px] flex items-center justify-center gap-1 shadow-sm border border-[#E5E0FF]">
                <HugeiconsIcon icon={CallIcon} size={13} /> Call Now
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
