"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PaintBrushIcon,
  Home01Icon,
  Building01Icon,
  CheckmarkCircle02Icon,
  ShieldUserIcon,
  StarIcon,
  ThumbsUpIcon,
  CallIcon,
  Mail01Icon,
  Clock01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

export default function PortfolioCardView({ isCenter = true }: { isCenter?: boolean }) {
  return (
    <div className="w-full h-full bg-[#f9f9ff] text-[#141b2b] font-sans text-left flex flex-col overflow-hidden relative select-none">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-30 bg-[#f9f9ff]/90 backdrop-blur-xl pt-2 pb-2 px-3.5 border-b border-[#c4c6cf] shrink-0 shadow-xs">
        <div className="h-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#002046] flex items-center justify-center shadow-xs">
              <HugeiconsIcon icon={PaintBrushIcon} size={13} className="text-white" />
            </div>
            <span className="font-bold text-xs text-[#002046]">Luminous Trades</span>
          </div>
          <span className="text-[8px] font-bold text-[#002046] bg-[#d6e3ff] px-2 py-0.5 rounded-full uppercase">
            Painting Co.
          </span>
        </div>
      </header>

      {/* Main Scroll Content */}
      <div className="flex-1 overflow-hidden relative w-full h-full">
        <main className={`w-full flex flex-col space-y-3.5 pt-14 pb-16 px-3.5 ${isCenter ? "animate-vertical-scroll" : ""}`}>

          {/* Hero Banner */}
          <section className="relative rounded-2xl overflow-hidden shadow-md mt-1 bg-[#002046]">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8rjzslSmHtRMlv0ZOjwPzkurf1AWGGy1xPhg7TZzbbGdxS19zf7WL-pJQX5WgYSEsVzXjFcNV4l9kTi1sMmNOK1kkWwjX7r2mkDqHBY10XsMyd-LcpZiEhFdsV-vm6e2FdTtS6qWQOp8X5cgqmp6ZbB6RrxfK9x0sVHPMylZBJE8TKoMGy8sh7n0PbiPQjEJvgbji8VT6X1_8f4jmclh66W6LG2vaKvCgOgpyVihErFYC-fAx5T5Tkw')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002046] via-[#002046]/70 to-transparent" />
            <div className="relative z-10 p-4 space-y-2">
              <span className="inline-block px-2 py-0.5 rounded-full bg-[#aec7f7]/20 text-[#aec7f7] text-[8px] font-bold uppercase tracking-wider border border-[#aec7f7]/30">
                PROFESSIONAL PAINTING
              </span>
              <h2 className="font-extrabold text-sm text-white leading-snug">
                Transform Your Space
              </h2>
              <p className="text-[9.5px] text-[#aec7f7] leading-relaxed">
                Precision craftsmanship, punctuality & a mess-free experience.
              </p>
              <button className="mt-1 flex items-center gap-1 bg-[#002046] text-white font-bold text-[9.5px] px-3 py-1.5 rounded-xl shadow-sm border border-[#aec7f7]/30 active:scale-95 transition-all">
                <span>Get Free Estimate</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
              </button>
            </div>
          </section>

          {/* Spring Offer Banner */}
          <section className="bg-[#1b365d] rounded-xl p-3 flex gap-2.5 items-start border border-[#2e476f]">
            <div className="w-7 h-7 rounded-full bg-[#d6e3ff] flex items-center justify-center shrink-0">
              <HugeiconsIcon icon={StarIcon} size={14} className="text-[#002046]" />
            </div>
            <div>
              <h3 className="font-bold text-[10.5px] text-white">Spring Refresh Special</h3>
              <p className="text-[8.5px] text-[#aec7f7] leading-snug">Book exterior painting before May 31st — get 10% off total estimate.</p>
            </div>
          </section>

          {/* Services */}
          <section className="space-y-1.5">
            <h3 className="font-bold text-[11px] text-[#141b2b] px-0.5">Our Services</h3>
            <div className="space-y-1.5">
              {[
                { icon: PaintBrushIcon, title: "Interior Painting", items: ["Walls & Ceilings", "Trim & Baseboards", "Cabinet Refinishing"] },
                { icon: Home01Icon, title: "Exterior Painting", items: ["Wood & Vinyl Siding", "Brick & Stucco", "Decks & Fences"] },
                { icon: Building01Icon, title: "Commercial Services", items: ["Office Buildings", "Retail Spaces", "HOA & Multi-Family"] },
              ].map(({ icon, title, items }) => (
                <div key={title} className="p-3 bg-white rounded-xl border border-[#dce2f7] shadow-2xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <HugeiconsIcon icon={icon} size={16} className="text-[#002046]" />
                    <h4 className="font-bold text-[10.5px] text-[#141b2b]">{title}</h4>
                  </div>
                  <div className="space-y-0.5">
                    {items.map((item) => (
                      <div key={item} className="flex items-center gap-1.5">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={11} className="text-[#002046] shrink-0" />
                        <span className="text-[8.5px] text-[#44474e]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Us */}
          <section className="bg-[#002046] text-white rounded-2xl p-3.5 space-y-2.5">
            <h3 className="font-bold text-[11px] text-[#aec7f7]">The Luminous Difference</h3>
            {[
              { icon: ShieldUserIcon, title: "Licensed & Insured", desc: "Fully credentialed for your protection." },
              { icon: StarIcon, title: "10+ Years Experience", desc: "A decade perfecting residential & commercial projects." },
              { icon: ThumbsUpIcon, title: "Quality Guaranteed", desc: "Comprehensive satisfaction guarantee on all work." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-[#1b365d] flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={icon} size={13} className="text-[#aec7f7]" />
                </div>
                <div>
                  <h4 className="font-bold text-[10px] text-white">{title}</h4>
                  <p className="text-[8.5px] text-[#87a0cd] leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Contact Footer */}
          <section className="bg-white rounded-2xl border border-[#dce2f7] p-3 space-y-2 shadow-xs">
            <h3 className="font-bold text-[10.5px] text-[#141b2b]">Request a Quote</h3>
            {[
              { icon: CallIcon, label: "(555) 123-4567" },
              { icon: Mail01Icon, label: "hello@luminoustrades.com" },
              { icon: Clock01Icon, label: "Mon–Fri: 8am – 6pm" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#e1e8fd] flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={icon} size={13} className="text-[#002046]" />
                </div>
                <span className="text-[8.5px] text-[#44474e] font-medium">{label}</span>
              </div>
            ))}
            <button className="w-full bg-[#002046] text-white font-bold text-[9.5px] py-2 rounded-xl mt-1 flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm">
              <span>Submit Request</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
            </button>
          </section>

          {/* Footer */}
          <footer className="text-center text-[8px] text-[#74777f] pb-2">
            © 2024 Luminous Trades • Powered by MarketingSetu
          </footer>
        </main>
      </div>
    </div>
  );
}
