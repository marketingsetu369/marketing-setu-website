"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CallIcon,
  WhatsappIcon,
  RoadIcon,
  BankIcon,
  File01Icon,
  CheckmarkBadge01Icon,
  StarIcon,
  ArrowDataTransferHorizontalIcon,
  ChatIcon,
  ArrowRight01Icon,
  RupeeIcon,
  Message01Icon,
  RepeatIcon,
  Shield01Icon,
  Exchange01Icon,
} from "@hugeicons/core-free-icons";

export default function TwoWheelerCardView({ isCenter = true }: { isCenter?: boolean }) {
  return (
    <div className="w-full h-full bg-[#fbf9f8] text-[#1b1c1c] font-sans text-left flex flex-col overflow-hidden relative select-none">

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-30 bg-[#fbf9f8]/90 backdrop-blur-xl pt-2 pb-2 px-3.5 border-b border-[#c4c7c7] shadow-xs shrink-0">
        <div className="h-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#1a1c1c] flex items-center justify-center">
              <HugeiconsIcon icon={RoadIcon} size={13} className="text-[#d43f00]" />
            </div>
            <span className="font-extrabold text-xs text-[#1a1c1c] tracking-tight uppercase">MotoBroker</span>
          </div>
          <span className="text-[8px] font-bold text-[#d43f00] bg-[#ffdbd0] px-2 py-0.5 rounded-full uppercase">
            Premium Dealership
          </span>
        </div>
      </header>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-hidden w-full h-full">
        <main className={`w-full flex flex-col pb-16 ${isCenter ? "animate-vertical-scroll" : ""}`}>

          {/* Hero Banner */}
          <section className="relative h-40 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHePKkYzF3_drtp2QG-xBYUgmf1lrqioGbEPWBgwzr2n78IHzfiaLexLKY_NioyM45PEiSV2BmP6bYT8-l1gYQDUtBP8OB7P-8kPq__soRVRf8haKOXA_Xn2-UPVAkQT685SpC7LyJcNsg6fyUMvJRPgOLF1iDPMJrW2Cjy8p0KXGVehGV9LKQbBU1KGT7m_K36QbATi3PZBkExrzqGXtggvYfuwLG8STeRf6qDPABDAsoXedeDLgfyQ')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1c] via-[#1a1c1c]/50 to-transparent" />
            <div className="absolute bottom-3 left-3.5 right-3.5 space-y-1">
              <span className="inline-block px-2 py-0.5 bg-white/15 backdrop-blur-md rounded-full text-[7.5px] font-bold text-white uppercase tracking-wider">Premium Dealership</span>
              <h2 className="font-extrabold text-sm text-white uppercase leading-snug">Your Dream Ride, Delivered.</h2>
              <p className="text-[8px] text-[#838484] leading-snug">Best prices · Transparent history · Seamless paperwork.</p>
            </div>
          </section>

          {/* CTA Button */}
          <div className="px-3.5 pt-3">
            <button className="w-full h-10 bg-[#d43f00] text-white font-extrabold text-[9.5px] uppercase flex items-center justify-center gap-1.5 shadow-md shadow-[#d43f00]/30 active:scale-95 transition-all">
              VIEW LATEST STOCK <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
            </button>
          </div>

          {/* Stats Strip */}
          <section className="mx-3.5 mt-3 bg-[#efeded] rounded-xl py-3 flex justify-around items-center">
            {[
              { val: "500+", label: "Bikes Sold" },
              { val: "15m", label: "Approval" },
              { val: "100%", label: "Verified" },
            ].map(({ val, label }, i) => (
              <React.Fragment key={label}>
                {i > 0 && <div className="w-px h-8 bg-[#c4c7c7]/50" />}
                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-extrabold text-sm text-[#1b1c1c]">{val}</span>
                  <span className="text-[7px] font-bold text-[#444748] uppercase">{label}</span>
                </div>
              </React.Fragment>
            ))}
          </section>

          {/* Featured Bikes */}
          <section className="px-3.5 mt-4 space-y-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[7.5px] font-bold text-[#d43f00] uppercase tracking-wider">Top Picks</p>
                <h3 className="font-extrabold text-[11.5px] text-[#1b1c1c] uppercase">Featured Bikes</h3>
              </div>
              <span className="text-[8.5px] font-bold text-[#444748]">See All →</span>
            </div>

            {[
              {
                tag: "In Stock", tagBg: "#1a1c1c", tagColor: "white",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGQ_sCezcLAz6JVhMnXMV7nB44UtdHPXeOv7lw7nnER6qHU7piXRmladiwqqkLpt_5DVaYs9KbEHIXLeaOQrmlb1-6TQQ7rL9KmfmE7nbHqBRgROktJLxNJG5DWhrqRskRpWtij1uwP_KeP7CVH83pDSzXHMIYiSgg1ItX_Fjw6dUry8dJ4tyBIQIsCQPgAZMUGuMxjc6-bwJmWf63scPxNy4VLyW7nG5HiZJ-26JzjImvAhoPwABlyQ",
                name: "Yamaha R15 V4 (2023)", price: "1,85,000",
                specs: [["Engine", "155 CC"], ["Mileage", "5,200 km"], ["Power", "18.4 BHP"], ["Owner", "1st"]],
              },
              {
                tag: "Hot Deal", tagBg: "#d43f00", tagColor: "white",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCK-OK7GtcFyJgNgd3ss6XJmpB9ckupJrz0BPcGdh9JdQPSwUZd8E2IrFWlKzlD1yEzzo6aIhiggMvBvxWgF4pAs6tPQVXyigfWhtsFwdVX70SvmQ4s1Hv7vEq1we9iHQLn-fMxg47E6g5zISU5NUEt1UbU5pab2JmTVNIhGDW1KAq__VTwXwurxjeVIrTcvKCLX2w77iP_k-w9C4vR4LLgu7LX9HgzF80I1zjaOUgE2-yU1PKfO83OgQ",
                name: "RE Classic 350 (2022)", price: "1,65,000",
                specs: [["Engine", "349 CC"], ["Mileage", "12,400 km"], ["Torque", "27 Nm"], ["Owner", "1st"]],
              },
            ].map(({ tag, tagBg, tagColor, img, name, price, specs }) => (
              <div key={name} className="bg-white rounded-xl shadow-xs overflow-hidden border border-[#e4e2e2]">
                <div className="relative">
                  <img src={img} alt={name} className="w-full h-32 object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-sm text-[7.5px] font-bold uppercase" style={{ backgroundColor: tagBg, color: tagColor }}>{tag}</span>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-[10px] text-[#1b1c1c]">{name}</h4>
                    <span className="font-extrabold text-[10px] text-[#d43f00] flex items-center gap-0.5">
                      <HugeiconsIcon icon={RupeeIcon} size={9} />{price}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 pb-2 border-b border-[#e4e2e2]">
                    {specs.map(([key, val]) => (
                      <div key={key}>
                        <p className="text-[7px] font-bold text-[#444748] uppercase">{key}</p>
                        <p className="text-[9px] font-bold text-[#1b1c1c]">{val}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full h-8 border-2 border-[#1a1c1c] text-[#1a1c1c] font-extrabold text-[8.5px] uppercase flex items-center justify-center gap-1">
                    ENQUIRE <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Advantages */}
          <section className="mt-4 bg-[#1a1c1c] py-5 px-3.5 space-y-4">
            <div className="text-center space-y-0.5">
              <p className="text-[7.5px] font-bold text-[#d43f00] uppercase tracking-wider">Why Choose Us</p>
              <h3 className="font-extrabold text-[11.5px] text-white uppercase">The MotoBroker Advantage</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: ArrowDataTransferHorizontalIcon, title: "Buy & Sell", desc: "Instant cash offers or trade-ins." },
                { icon: BankIcon, title: "Easy Finance", desc: "Quick approvals with top banks." },
                { icon: File01Icon, title: "Paperwork", desc: "RTO transfer, insurance & NOCs." },
                { icon: CheckmarkBadge01Icon, title: "Quality Check", desc: "Rigorous 60-point inspection." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="p-3 bg-white/5 rounded-xl border-l-2 border-[#d43f00] space-y-1.5">
                  <HugeiconsIcon icon={icon} size={18} className="text-[#d43f00]" />
                  <h4 className="font-bold text-[9.5px] text-white uppercase">{title}</h4>
                  <p className="text-[8px] text-[#838484] leading-snug">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Meet the Broker */}
          <section className="mx-3.5 mt-4 bg-white rounded-xl shadow-xs overflow-hidden border border-[#e4e2e2]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEDB_zhgUohDqN4UrjrV6-PG2VXQDGeg2ImM6fSycnICIaqSd6kaAO6WFy__Jcb3_fF_0rjySYPe6U352gKXk91c6qpKlU6C54PiRmIwxY8BK_L_1pEs6EN7YRo2ociZyYwMKhV_msoo9m9UNnnX-aEOFVH2QtRDiPqvM1z_AqUqHZPRUwSNXQk1KhOpaaufDrrpH6ypDkGL5kuxp4ffWlmVWOPf7ptuUK9jaaJco9ylJccnBdUj4xug"
              alt="Vikram Singh"
              className="w-full h-32 object-cover object-top"
            />
            <div className="p-3 text-center space-y-1.5">
              <h3 className="font-bold text-[11px] text-[#1b1c1c]">Vikram Singh</h3>
              <p className="text-[8.5px] text-[#444748] leading-snug">
                A decade in two-wheelers. No hidden fees, just straight talk and a passion for riding.
              </p>
              <button className="mt-1 h-8 px-4 border-2 border-[#1a1c1c] text-[#1a1c1c] font-extrabold text-[8.5px] uppercase flex items-center gap-1 mx-auto">
                CONTACT VIKRAM <HugeiconsIcon icon={ChatIcon} size={13} />
              </button>
            </div>
          </section>

          {/* Rider Reviews */}
          <section className="px-3.5 mt-4 space-y-3">
            <h3 className="font-extrabold text-[11.5px] text-[#1b1c1c] uppercase text-center">Rider Reviews</h3>
            {[
              { text: "Got my Duke 390 through MotoBroker. Deal closed in a day, bike in mint condition!", name: "Rahul K." },
              { text: "They handled the sale of my old scooter and got me a great price. Very professional.", name: "Priya S." },
            ].map(({ text, name }) => (
              <div key={name} className="p-3 bg-[#f5f3f3] rounded-xl border-l-4 border-[#d43f00] space-y-1.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <HugeiconsIcon key={i} icon={StarIcon} size={10} className="text-[#d43f00]" />)}
                </div>
                <p className="text-[8.5px] text-[#1b1c1c] font-normal leading-snug">&ldquo;{text}&rdquo;</p>
                <span className="text-[7.5px] font-bold text-[#444748] uppercase">— {name}</span>
              </div>
            ))}
          </section>

          {/* Contact Form */}
          <section className="px-3.5 mt-4 space-y-3">
            <h3 className="font-extrabold text-[11.5px] text-[#1b1c1c] uppercase">Request a Quote</h3>
            <p className="text-[8px] text-[#444748]">Looking to buy or sell? Drop your details below.</p>
            <div className="space-y-2">
              <input readOnly className="w-full bg-transparent border-b border-[#1a1c1c]/30 py-2 text-[9px] text-[#1b1c1c] placeholder-[#444748]/60" placeholder="Full Name" type="text" />
              <input readOnly className="w-full bg-transparent border-b border-[#1a1c1c]/30 py-2 text-[9px] text-[#1b1c1c] placeholder-[#444748]/60" placeholder="Phone Number" type="tel" />
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {[
                  { icon: RoadIcon, label: "Buy" },
                  { icon: RepeatIcon, label: "Sell" },
                  { icon: BankIcon, label: "Finance" },
                  { icon: Shield01Icon, label: "Insurance" },
                  { icon: Exchange01Icon, label: "Transfer" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center justify-center p-1.5 border border-[#c4c7c7] rounded-lg bg-[#fbf9f8] gap-1">
                    <HugeiconsIcon icon={icon} size={14} className="text-[#444748]" />
                    <span className="text-[6.5px] font-bold uppercase text-[#444748] text-center leading-tight">{label}</span>
                  </div>
                ))}
              </div>
              <button className="w-full h-10 bg-[#1a1c1c] text-white font-extrabold text-[9px] uppercase flex items-center justify-center gap-1.5 mt-1 shadow-sm active:scale-95 transition-all">
                SUBMIT DETAILS <HugeiconsIcon icon={Message01Icon} size={13} />
              </button>
            </div>
          </section>

          {/* Footer CTA */}
          <div className="px-3.5 pt-4 mt-2">
            <button className="w-full h-10 bg-[#d43f00] text-white font-extrabold text-[9.5px] uppercase flex items-center justify-center gap-1.5 shadow-md shadow-[#d43f00]/30 active:scale-95 transition-all">
              ENQUIRE NOW <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
            </button>
            <p className="text-center text-[7.5px] text-[#444748] mt-2 font-bold">123 Rev Road, Motor City, Auto District, 400001</p>
          </div>

        </main>
      </div>
    </div>
  );
}
