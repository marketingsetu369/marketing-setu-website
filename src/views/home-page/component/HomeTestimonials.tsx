"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon, GoogleIcon } from "@hugeicons/core-free-icons";
import { TranslationDictionary } from "@/translation";

interface HomeTestimonialsProps {
  t: TranslationDictionary;
}

export default function HomeTestimonials({ t }: HomeTestimonialsProps) {
  const testimonials = [
    {
      stars: 5,
      text:
        t.testi_1_text ||
        "MarketingSetu has helped me showcase my fashion designs professionally and connect with more customers. The digital presence and promotional tools have made it much easier to grow Designer Sanu.",
      name: "Sanika Bondre",
      role: t.testi_1_role || "Owner, Designer Sanu",
      image: "/testimonials/sanika-bondre.png",
      tag: "Fashion Boutique",
    },
    {
      stars: 5,
      text:
        t.testi_2_text ||
        "MarketingSetu makes it so easy to promote my beauty parlour and stay connected with customers. Our online visibility has improved, and we are getting more enquiries from local customers.",
      name: "Amruta Agrawal",
      role: t.testi_2_role || "Owner, Amruta Beauty Parlour",
      image: "/testimonials/amruta-agrawal.png",
      tag: "Beauty & Wellness",
    },
    {
      stars: 5,
      text:
        t.testi_3_text ||
        "MarketingSetu has made promoting our latest collections much easier. Customers can quickly discover our offers and products, and we are getting better engagement from our local audience.",
      name: "Swapnil Lakade",
      role: t.testi_3_role || "Owner, VIP Mens Wear",
      image: "/testimonials/swapnil-lakade.png",
      tag: "Retail Menswear",
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-background border-t border-outline/50 relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header matching sober modern layout */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-secondary bg-brand-light border border-brand-secondary/20 px-3.5 py-1 rounded-full inline-block mb-3.5">
            {t.home_testimonials_eyebrow || "CLIENT STORIES"}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold tracking-tight text-primary leading-snug mb-3">
            {t.home_testimonials_heading || "What Our Clients Say"}
          </h2>
          <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
            {t.home_testimonials_subtext || "Hear from local business owners who use MarketingSetu to reach more customers and drive daily inquiries."}
          </p>
        </div>

        {/* 3-Column Card Grid with Darker Dashed Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-paper border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-brand-main dark:hover:border-brand-secondary rounded-[22px] p-6 sm:p-7 shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Stars + Category Chip */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.stars)].map((_, i) => (
                      <HugeiconsIcon key={i} icon={StarIcon} size={15} className="fill-current text-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold text-secondary bg-neutral border border-outline/50 uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-secondary text-xs sm:text-[13px] leading-relaxed line-clamp-4">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3.5 pt-5 mt-6 border-t border-outline/40">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-brand-light flex-shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-primary leading-tight truncate">{item.name}</h4>
                  <span className="text-[11px] text-secondary truncate block mt-0.5">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
