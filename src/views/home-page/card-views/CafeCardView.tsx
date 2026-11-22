"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingBag01Icon,
  Add01Icon,
  Coffee01Icon,
  TeaIcon,
  CroissantIcon,
  Location01Icon,
  Leaf01Icon,
  Home01Icon,
  Menu01Icon,
  GiftIcon,
  InstagramIcon,
  Mail01Icon,
  GlobalIcon,
  Navigation01Icon,
} from "@hugeicons/core-free-icons";

export default function CafeCardView({ isCenter = true }: { isCenter?: boolean }) {
  const [activeTab, setActiveTab] = useState("home");
  const [cartCount, setCartCount] = useState(1);

  return (
    <div className="w-full h-full bg-[#f8f9fa] text-[#191c1d] font-sans text-left flex flex-col overflow-hidden relative select-none">
      {/* 1. Header */}
      <header className="absolute top-0 left-0 right-0 z-30 bg-[#f8f9fa]/90 backdrop-blur-xl pt-2 pb-2 px-4 shadow-[0_1px_8px_rgba(45,41,38,0.04)] border-b border-[#e1e3e4] shrink-0">
        <div className="h-10 flex items-center justify-between">
          <div className="w-8"></div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-[#181512] text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
              AH
            </div>
            <span className="font-semibold text-xs text-[#181512]">Artisanal Hearth</span>
          </div>
          <button 
            onClick={() => setCartCount((prev) => prev + 1)}
            className="w-7 h-7 rounded-full bg-[#ffdcbd] text-[#2c1600] font-bold text-xs flex items-center justify-center shadow-xs active:scale-95 transition-all relative"
            title="Cart"
          >
            <HugeiconsIcon icon={ShoppingBag01Icon} size={14} className="text-[#2c1600]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#7d562d] text-white text-[8px] font-extrabold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 2. Main Scrollable Container */}
      <div className="flex-1 overflow-hidden relative w-full h-full">
        <main className={`w-full flex flex-col space-y-4 pt-14 pb-20 px-3.5 ${isCenter ? "animate-vertical-scroll" : ""}`}>
        
        {/* Hero Section */}
        <section className="relative w-full rounded-2xl overflow-hidden shadow-sm mt-2">
          <div
            className="w-full h-44 bg-cover bg-center transition-transform duration-500 hover:scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-3.5 flex flex-col gap-1 text-white">
            <span className="text-[8px] font-semibold text-white/80 uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full w-fit backdrop-blur-xs">
              Seasonal Pick
            </span>
            <h2 className="font-bold text-base leading-tight">Maple Pecan Latte</h2>
            <p className="text-[9.5px] text-white/90 line-clamp-2 max-w-[240px]">
              Our signature roast infused with pure maple and topped with toasted pecans.
            </p>
            <button 
              onClick={() => setCartCount((prev) => prev + 1)}
              className="mt-1.5 bg-[#181512] hover:bg-[#2d2926] text-white font-semibold text-[10px] py-1.5 px-4 rounded-full w-fit shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>Order Now</span>
            </button>
          </div>
        </section>

        {/* Quick Order */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xs text-[#191c1d]">Quick Order</h3>
            <button className="text-[9px] text-[#7d562d] font-semibold uppercase tracking-wider hover:underline">
              View All
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {/* Item 1 */}
            <div className="bg-[#edeeef] hover:bg-[#e7e8e9] rounded-2xl p-3 shadow-xs flex gap-3 items-center transition-colors">
              <div 
                className="w-14 h-14 rounded-xl bg-cover bg-center shadow-xs flex-shrink-0"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=300&q=80')"
                }}
              ></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-xs text-[#191c1d] truncate">Iced Oat Latte</h4>
                <p className="text-[9px] text-[#4d4540]">Medium • Less Ice</p>
                <span className="text-[10px] font-bold text-[#4d4540] mt-0.5 block">$5.50</span>
              </div>
              <button 
                onClick={() => setCartCount((prev) => prev + 1)}
                className="w-8 h-8 rounded-full bg-[#e1e3e4] hover:bg-[#ffdcbd] text-[#181512] font-bold text-xs flex items-center justify-center transition-all active:scale-90 shadow-xs"
              >
                <HugeiconsIcon icon={Add01Icon} size={16} />
              </button>
            </div>

            {/* Item 2 */}
            <div className="bg-[#edeeef] hover:bg-[#e7e8e9] rounded-2xl p-3 shadow-xs flex gap-3 items-center transition-colors">
              <div 
                className="w-14 h-14 rounded-xl bg-cover bg-center shadow-xs flex-shrink-0"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80')"
                }}
              ></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-xs text-[#191c1d] truncate">Almond Croissant</h4>
                <p className="text-[9px] text-[#4d4540]">Warmed & Flaky</p>
                <span className="text-[10px] font-bold text-[#4d4540] mt-0.5 block">$4.25</span>
              </div>
              <button 
                onClick={() => setCartCount((prev) => prev + 1)}
                className="w-8 h-8 rounded-full bg-[#e1e3e4] hover:bg-[#ffdcbd] text-[#181512] font-bold text-xs flex items-center justify-center transition-all active:scale-90 shadow-xs"
              >
                <HugeiconsIcon icon={Add01Icon} size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Menu Categories */}
        <section className="flex flex-col gap-2.5">
          <h3 className="font-semibold text-xs text-[#191c1d]">Explore Menu</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center justify-center gap-1.5 bg-[#f3f4f5] hover:bg-[#edeeef] p-3 rounded-2xl shadow-xs transition-colors cursor-pointer text-[#181512]">
              <HugeiconsIcon icon={Coffee01Icon} size={22} className="text-[#7d562d]" />
              <span className="text-[10px] font-semibold text-[#191c1d]">Coffee</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1.5 bg-[#f3f4f5] hover:bg-[#edeeef] p-3 rounded-2xl shadow-xs transition-colors cursor-pointer text-[#181512]">
              <HugeiconsIcon icon={TeaIcon} size={22} className="text-[#7d562d]" />
              <span className="text-[10px] font-semibold text-[#191c1d]">Tea</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1.5 bg-[#f3f4f5] hover:bg-[#edeeef] p-3 rounded-2xl shadow-xs transition-colors cursor-pointer text-[#181512]">
              <HugeiconsIcon icon={CroissantIcon} size={22} className="text-[#7d562d]" />
              <span className="text-[10px] font-semibold text-[#191c1d]">Pastries</span>
            </div>
          </div>
        </section>

        {/* Nearby Hearth */}
        <section className="flex flex-col gap-2.5">
          <h3 className="font-semibold text-xs text-[#191c1d]">Find Us</h3>
          <div className="bg-[#edeeef] rounded-2xl p-3.5 shadow-xs flex flex-col gap-2.5">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0.5">
                <h4 className="font-semibold text-xs text-[#191c1d]">The Pearl District</h4>
                <p className="text-[9px] text-[#7d562d] flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7d562d] block animate-pulse"></span> Open until 6:00 PM
                </p>
              </div>
              <span className="text-[9px] text-[#4d4540] font-medium">0.4 mi</span>
            </div>
            <button className="w-full border border-[#7e756f]/40 text-[#181512] font-semibold text-[10px] py-2 rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#e7e8e9] transition-colors active:scale-95">
              <HugeiconsIcon icon={Navigation01Icon} size={14} className="text-[#7d562d]" /> Directions
            </button>
          </div>
        </section>

        {/* Rewards Card */}
        <section className="bg-[#e7e8e9] rounded-2xl p-3.5 shadow-xs flex items-center justify-between border border-[#cfc4bd]/40">
          <div className="flex flex-col gap-0.5">
            <h3 className="font-semibold text-xs text-[#191c1d]">Your Rewards</h3>
            <p className="text-[9.5px] text-[#4d4540] font-medium flex items-center gap-1">
              <HugeiconsIcon icon={Leaf01Icon} size={14} className="text-[#7d562d]" /> 120 Beans Earned
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#ffdcbd] flex items-center justify-center text-sm shadow-inner text-[#7d562d]">
            <HugeiconsIcon icon={Coffee01Icon} size={18} />
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-2 pb-2 text-center flex flex-col items-center gap-2">
          <div className="flex gap-4 text-[#4d4540]">
            <HugeiconsIcon icon={InstagramIcon} size={16} />
            <HugeiconsIcon icon={Mail01Icon} size={16} />
            <HugeiconsIcon icon={GlobalIcon} size={16} />
          </div>
          <p className="text-[8.5px] text-[#4d4540]">
            Store Hours: Mon-Sun 7am - 6pm<br />
            © 2024 Artisanal Hearth
          </p>
        </footer>
      </main>
      </div>

      {/* 3. Bottom Floating Navigation Bar */}
      <nav className="absolute bottom-0 left-0 right-0 z-30 bg-[#f8f9fa]/90 backdrop-blur-xl border-t border-[#e1e3e4] shadow-[0_-1px_8px_rgba(45,41,38,0.04)]">
        <div className="flex justify-around items-center h-14">
          {[
            { id: "home", label: "HOME", icon: Home01Icon },
            { id: "menu", label: "MENU", icon: Menu01Icon },
            { id: "locations", label: "LOCATIONS", icon: Location01Icon },
            { id: "loyalty", label: "LOYALTY", icon: GiftIcon },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center gap-0.5 transition-all text-[8px] font-bold ${
                activeTab === id ? "text-[#181512] scale-105 font-extrabold" : "text-[#4d4540] opacity-70 hover:opacity-100"
              }`}
            >
              <HugeiconsIcon icon={icon} size={18} />
              <span className="uppercase tracking-wider">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}


