"use client";

import React, { useState } from "react";

export default function CafeCardView() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartCount, setCartCount] = useState(1);

  return (
    <div className="w-full h-full bg-[#161210] text-[#F7F1EB] font-sans text-left flex flex-col overflow-hidden relative select-none">
      {/* Top Ambient Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-56 h-40 bg-amber-600/25 rounded-full blur-3xl pointer-events-none"></div>

      {/* 1. Header Navigation Bar */}
      <header className="px-3.5 pt-7 pb-2.5 flex items-center justify-between z-20 border-b border-white/10 bg-[#161210]/90 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-500 text-white flex items-center justify-center font-sans text-sm font-black shadow-lg shadow-amber-900/40 border border-amber-300/30">
            AH
          </div>
          <div>
            <h1 className="font-sans font-bold text-xs text-amber-100 flex items-center gap-1">
              Artisanal Hearth <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </h1>
            <p className="text-[8px] text-amber-200/60 font-mono">PEARL DISTRICT • OPEN TILL 9 PM</p>
          </div>
        </div>

        <button 
          onClick={() => setCartCount((prev) => prev + 1)}
          className="px-2.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-[#161210] font-extrabold text-[9.5px] shadow-md shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-1"
        >
          <span>🛒</span>
          <span>Cart ({cartCount})</span>
        </button>
      </header>

      {/* 2. Scrollable Body Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3.5 relative z-10 custom-scrollbar pb-10">

        {/* Premium Hero Featured Banner */}
        <section className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/15 group">
          <div
            className="w-full h-40 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#161210] via-[#161210]/60 to-transparent"></div>

          {/* Top Tag Pill */}
          <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#161210]/80 backdrop-blur-md border border-white/15 text-[8px] font-mono text-amber-300 font-bold">
            🔥 CHEF&apos;S PICK
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
            <div className="pr-2">
              <span className="text-[7.5px] font-mono uppercase tracking-widest text-amber-400 font-extrabold">
                SEASONAL BREW
              </span>
              <h2 className="font-sans font-extrabold text-xs text-white leading-tight">
                Maple Pecan Cold Brew
              </h2>
              <p className="text-[8.5px] text-amber-100/70 line-clamp-1">Slow drip 18-hr • Organic maple foam</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-sans font-black text-xs text-amber-300">₹240</span>
                <span className="text-[8px] text-white/50 line-through">₹290</span>
              </div>
            </div>
            <button
              onClick={() => setCartCount((prev) => prev + 1)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#161210] font-black text-[10px] py-1.5 px-3 rounded-xl shadow-lg shadow-amber-500/30 active:scale-95 transition-all whitespace-nowrap"
            >
              + Order Now
            </button>
          </div>
        </section>

        {/* Filter Category Chips */}
        <section className="flex gap-1.5 overflow-x-auto no-scrollbar text-[8.5px] font-bold py-0.5">
          {[
            { id: "all", label: "🔥 All Popular" },
            { id: "coffee", label: "☕ Specialty Coffee" },
            { id: "cold", label: "🧊 Cold Brews" },
            { id: "bakery", label: "🥐 Fresh Bakery" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? "bg-amber-500 text-[#161210] border-amber-400 font-black shadow-md shadow-amber-500/20"
                  : "bg-white/5 text-amber-200/70 border-white/10 hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </section>

        {/* Menu Items Showcase */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-0.5">
            <h3 className="font-sans font-bold text-xs text-amber-100 tracking-wide">Signature Menu</h3>
            <span className="text-[8px] font-mono text-amber-400">TAP + TO ADD</span>
          </div>

          {/* Item 1 */}
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 backdrop-blur-md flex gap-3 items-center transition-all">
            <div
              className="w-14 h-14 rounded-xl bg-cover bg-center flex-shrink-0 shadow-md relative overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=300&q=80')",
              }}
            >
              <span className="absolute top-0.5 left-0.5 px-1 rounded bg-amber-500 text-[#161210] text-[7px] font-black uppercase">
                HOT
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-sans font-bold text-xs text-white truncate">Iced Velvet Latte</h4>
                <span className="text-[8.5px] font-mono text-amber-400 font-bold">★ 4.9</span>
              </div>
              <p className="text-[8.5px] text-amber-200/60 truncate">Double Shot • Creamy Oat Milk</p>
              <span className="text-[10px] font-black text-amber-300 mt-0.5 block">₹220</span>
            </div>
            <button
              onClick={() => setCartCount((prev) => prev + 1)}
              className="w-8 h-8 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-[#161210] font-black text-sm flex items-center justify-center border border-amber-500/40 transition-all active:scale-90 shadow-sm"
            >
              +
            </button>
          </div>

          {/* Item 2 */}
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 backdrop-blur-md flex gap-3 items-center transition-all">
            <div
              className="w-14 h-14 rounded-xl bg-cover bg-center flex-shrink-0 shadow-md relative overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80')",
              }}
            >
              <span className="absolute top-0.5 left-0.5 px-1 rounded bg-rose-500 text-white text-[7px] font-black uppercase">
                FRESH
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-sans font-bold text-xs text-white truncate">Almond Butter Croissant</h4>
                <span className="text-[8.5px] font-mono text-amber-400 font-bold">★ 4.8</span>
              </div>
              <p className="text-[8.5px] text-amber-200/60 truncate">Freshly Baked • Flaky Layered</p>
              <span className="text-[10px] font-black text-amber-300 mt-0.5 block">₹180</span>
            </div>
            <button
              onClick={() => setCartCount((prev) => prev + 1)}
              className="w-8 h-8 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-[#161210] font-black text-sm flex items-center justify-center border border-amber-500/40 transition-all active:scale-90 shadow-sm"
            >
              +
            </button>
          </div>

          {/* Item 3 */}
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 backdrop-blur-md flex gap-3 items-center transition-all">
            <div
              className="w-14 h-14 rounded-xl bg-cover bg-center flex-shrink-0 shadow-md relative overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=300&q=80')",
              }}
            ></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-sans font-bold text-xs text-white truncate">Artisan Cappuccino</h4>
                <span className="text-[8.5px] font-mono text-amber-400 font-bold">★ 4.9</span>
              </div>
              <p className="text-[8.5px] text-amber-200/60 truncate">Rich Espresso • Dense Microfoam</p>
              <span className="text-[10px] font-black text-amber-300 mt-0.5 block">₹190</span>
            </div>
            <button
              onClick={() => setCartCount((prev) => prev + 1)}
              className="w-8 h-8 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-[#161210] font-black text-sm flex items-center justify-center border border-amber-500/40 transition-all active:scale-90 shadow-sm"
            >
              +
            </button>
          </div>
        </section>

        {/* Location & Contact Bar */}
        <section className="p-3 bg-gradient-to-r from-amber-950/40 to-stone-900/60 rounded-2xl border border-amber-500/20 backdrop-blur-md space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[7.5px] font-mono text-amber-400 uppercase tracking-widest font-bold">CAFÉ LOCATION</span>
              <h4 className="font-sans font-bold text-xs text-white">Pearl District Flagship</h4>
              <p className="text-[8.5px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block animate-ping"></span> Open Now • Closes 9:00 PM
              </p>
            </div>
            <span className="text-[8.5px] font-mono text-amber-300/90 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">0.4 km away</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button className="py-2 px-2 bg-amber-500 hover:bg-amber-400 text-[#161210] font-extrabold text-[9.5px] rounded-xl flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all">
              <span>📍 Directions</span>
            </button>
            <button className="py-2 px-2 bg-white/10 hover:bg-white/15 text-amber-200 border border-white/15 font-bold text-[9.5px] rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-all">
              <span>📞 Table Reserve</span>
            </button>
          </div>
        </section>

        {/* Loyalty Beans Widget */}
        <section className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-teal-950/40 border border-emerald-500/30 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[7.5px] font-mono text-emerald-400 uppercase tracking-widest font-bold">LOYALTY PERKS</span>
            <h4 className="font-sans font-bold text-xs text-white">120 Coffee Beans Earned</h4>
            <p className="text-[8.5px] text-emerald-200/70">30 more beans for a free Cold Brew!</p>
          </div>
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-300 font-bold text-lg flex items-center justify-center border border-emerald-400/40 shadow-inner">
            🌱
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-2 pb-4 text-center text-[8px] text-amber-200/40 font-mono space-y-0.5">
          <p>© 2024 Artisanal Hearth • Powered by MarketingSetu</p>
        </footer>

      </div>
    </div>
  );
}
