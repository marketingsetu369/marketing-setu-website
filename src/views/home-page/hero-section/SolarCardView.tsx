"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Sun01Icon,
  ArrowRight01Icon,
  Task01Icon,
  Analytics01Icon,
  Money01Icon,
  Home01Icon,
  Building01Icon,
  Wrench01Icon,
  BatteryChargingIcon,
  StarIcon,
  CallIcon,
  RupeeIcon,
} from "@hugeicons/core-free-icons";

export default function SolarCardView({ isCenter = true }: { isCenter?: boolean }) {
  const [formData, setFormData] = useState({
    companyName: "",
    licenseType: "",
    zipCode: "",
    email: "",
  });

  return (
    <div className="w-full h-full bg-[#f7f9fb] text-[#191c1e] font-sans text-left flex flex-col overflow-hidden relative select-none">
      {/* Top Header */}
      <header className="absolute top-0 left-0 right-0 z-30 bg-[#f7f9fb]/90 backdrop-blur-xl pt-2 pb-2 px-3.5 shadow-xs border-b border-[#e0e3e5] shrink-0">
        <div className="h-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-800 text-white flex items-center justify-center shadow-xs">
              <HugeiconsIcon icon={Sun01Icon} size={14} className="text-yellow-300" />
            </div>
            <span className="font-bold text-xs text-emerald-950">Solarion Energy</span>
          </div>
          <span className="text-[8px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
            Partner Network
          </span>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-hidden relative w-full h-full">
        <main className={`w-full flex flex-col space-y-4 pt-14 pb-16 px-3.5 ${isCenter ? "animate-vertical-scroll" : ""}`}>
          
          {/* Hero Section */}
          <section className="relative w-full rounded-2xl overflow-hidden shadow-md bg-emerald-900 text-white p-4 space-y-2 mt-1">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-950 opacity-95"></div>
            <div className="relative z-10 space-y-1.5">
              <span className="inline-block px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 text-[8px] font-bold uppercase tracking-wider border border-yellow-300/30">
                PRO INSTALLERS NETWORK
              </span>
              <h2 className="font-extrabold text-sm leading-snug">
                Grow Your Solar Business with <span className="text-yellow-400 underline decoration-yellow-400/50">Solarion</span>
              </h2>
              <p className="text-[9.5px] text-emerald-100/90 leading-relaxed">
                Access exclusive, high-intent leads and streamline installations with India&apos;s top partner network.
              </p>
            </div>
          </section>

          {/* Apply Form Card */}
          <section className="bg-white rounded-2xl p-3.5 shadow-sm border border-emerald-900/10 space-y-3">
            <div className="text-center space-y-0.5">
              <h3 className="font-extrabold text-xs text-emerald-950">Apply to the Network</h3>
              <p className="text-[9px] text-slate-500">Takes less than 2 minutes.</p>
            </div>

            <form className="space-y-2 text-[10px]" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block font-bold text-[9px] text-emerald-900 mb-0.5">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Solar Solutions"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 text-[10px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[9px] text-emerald-900 mb-0.5">License Type</label>
                  <select
                    value={formData.licenseType}
                    onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 text-[9.5px]"
                  >
                    <option value="">Select...</option>
                    <option value="c10">C-10 Electrical</option>
                    <option value="c46">C-46 Solar</option>
                    <option value="general">General B</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[9px] text-emerald-900 mb-0.5">Zip Code</label>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 text-[10px]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[9px] text-emerald-900 mb-0.5">Business Email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 text-[10px]"
                />
              </div>

              <button
                type="button"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-emerald-950 font-black py-2 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 text-[10.5px] cursor-pointer mt-1"
              >
                <span>Check Eligibility</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
              </button>
            </form>
          </section>

          {/* Why Partner With Us */}
          <section className="space-y-2">
            <h3 className="font-extrabold text-xs text-emerald-950 px-0.5">Why Partner With Us?</h3>
            <div className="space-y-2">
              <div className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-xs flex gap-2.5 items-start">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={Task01Icon} size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-[11px] text-emerald-950">Qualified Leads</h4>
                  <p className="text-[9px] text-slate-600 leading-snug">Pre-screened homeowners for credit, roof viability & high intent.</p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-xs flex gap-2.5 items-start">
                <div className="w-8 h-8 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={Analytics01Icon} size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-[11px] text-emerald-950">Real-time Pipeline</h4>
                  <p className="text-[9px] text-slate-600 leading-snug">Manage site surveys and track installation milestones live.</p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-xs flex gap-2.5 items-start">
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={Money01Icon} size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-[11px] text-emerald-950">Fast Payments</h4>
                  <p className="text-[9px] text-slate-600 leading-snug">Get paid reliably upon milestone completion. No net-90 delays.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Services */}
          <section className="space-y-2">
            <h3 className="font-extrabold text-xs text-emerald-950 px-0.5">Our Installation Services</h3>
            <div className="grid grid-cols-2 gap-2 text-[9.5px]">
              <div className="p-2.5 bg-white rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                <HugeiconsIcon icon={Home01Icon} size={18} className="text-emerald-700" />
                <h4 className="font-bold text-[#191c1e] text-[10px]">Residential Solar</h4>
                <p className="text-[8.5px] text-slate-500 leading-tight">Full PV system design for homes.</p>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                <HugeiconsIcon icon={Building01Icon} size={18} className="text-emerald-700" />
                <h4 className="font-bold text-[#191c1e] text-[10px]">Commercial Solar</h4>
                <p className="text-[8.5px] text-slate-500 leading-tight">Scalable industrial energy setups.</p>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                <HugeiconsIcon icon={Wrench01Icon} size={18} className="text-emerald-700" />
                <h4 className="font-bold text-[#191c1e] text-[10px]">Maintenance</h4>
                <p className="text-[8.5px] text-slate-500 leading-tight">System repairs & efficiency tuning.</p>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                <HugeiconsIcon icon={BatteryChargingIcon} size={18} className="text-emerald-700" />
                <h4 className="font-bold text-[#191c1e] text-[10px]">Energy Storage</h4>
                <p className="text-[8.5px] text-slate-500 leading-tight">24/7 battery backup power.</p>
              </div>
            </div>
          </section>

          {/* Social Proof Stats */}
          <section className="bg-emerald-950 text-white rounded-2xl p-3.5 text-center space-y-2 border border-emerald-800">
            <div className="flex justify-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <HugeiconsIcon key={i} icon={StarIcon} size={14} className="fill-current" />
              ))}
            </div>
            <h4 className="font-bold text-xs text-emerald-100">Joined by 500+ Top Rated Installers</h4>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-2 bg-emerald-900/60 rounded-xl border border-emerald-800/80">
                <span className="font-black text-yellow-400 text-sm flex items-center justify-center gap-0.5">
                  <HugeiconsIcon icon={RupeeIcon} size={14} />
                  <span>320 Cr+</span>
                </span>
                <span className="text-[7.5px] uppercase tracking-wider text-emerald-200 font-semibold">PAID TO PARTNERS</span>
              </div>
              <div className="p-2 bg-emerald-900/60 rounded-xl border border-emerald-800/80">
                <span className="block font-black text-yellow-400 text-sm">12,000+</span>
                <span className="text-[7.5px] uppercase tracking-wider text-emerald-200 font-semibold">INSTALLATIONS</span>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-1 pb-2 text-center text-[8.5px] text-slate-400 font-medium space-y-1">
            <div className="flex items-center justify-center gap-1 text-emerald-800 font-bold">
              <HugeiconsIcon icon={CallIcon} size={12} />
              <span>1-800-SOLARION</span>
            </div>
            <p>© 2024 Solarion Energy • Powered by MarketingSetu</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
