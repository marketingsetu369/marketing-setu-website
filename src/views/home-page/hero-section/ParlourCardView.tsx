"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Scissor01Icon,
  FlowerIcon,
  HandPointingRight01Icon,
  CallIcon,
  Clock01Icon,
  MapPinIcon,
  Calendar01Icon,
  RupeeIcon,
  StarIcon,
  ArrowRight01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";

const PRIMARY = "#73584d";
const PRIMARY_LIGHT = "#f4d0c1";
const SECONDARY = "#735c00";
const SECONDARY_BG = "#fed65b";

export default function ParlourCardView({ isCenter = true }: { isCenter?: boolean }) {
  return (
    <div className="w-full h-full bg-[#fcf9f8] text-[#1b1c1c] font-sans text-left flex flex-col overflow-hidden relative select-none">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-30 bg-[#fcf9f8]/90 backdrop-blur-xl pt-2 pb-2 px-3.5 border-b border-[#d3c3bd] shrink-0 shadow-xs">
        <div className="h-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#73584d] flex items-center justify-center">
              <HugeiconsIcon icon={Scissor01Icon} size={13} className="text-white" />
            </div>
            <span className="font-bold text-xs text-[#73584d]">Radiance Beauty Studio</span>
          </div>
          <span className="text-[8px] font-bold text-[#73584d] bg-[#f4d0c1] px-2 py-0.5 rounded-full uppercase">
            Beauty &amp; Salon
          </span>
        </div>
      </header>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-hidden w-full h-full">
        <main className={`w-full flex flex-col pb-12 ${isCenter ? "animate-vertical-scroll" : ""}`}>

          {/* Hero Banner */}
          <section className="relative h-36 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1h8bQDoYBSnp0-nYYuikxA4YNvhmZVOT24KHLhtBlJee--SMF4rqcJsyPfnbw_a6CJZk7gtJvWlTXRDzjURdUoA8hln6P0t_oCKKU9h3XiVTX7J401NyS3h_3YlvBWhgAUX1LrG2r5SiCIjbx1TJ2bo3TPBg8v16zysxrlUNLJ1vyDS0O-qi2OkDS1QW4nUZRIWM-Jb8On-3V6nbuhUYRHkDetKsTfu4UfKKHeu0Q1pO-BgeSM-nEAQ')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fcf9f8] via-[#73584d]/30 to-transparent" />
            <div className="absolute bottom-3 left-3.5 right-3.5">
              <p className="text-[8.5px] font-bold uppercase tracking-widest text-[#735c00]">Luxury Beauty Studio</p>
              <h2 className="font-extrabold text-sm text-[#2a170e] leading-snug">Reveal Your Inner Radiance</h2>
            </div>
          </section>

          {/* Tagline + CTA */}
          <section className="px-3.5 pt-3 pb-0 space-y-2.5">
            <p className="text-[8.5px] text-[#4f4440] leading-relaxed">
              Unparalleled artistry in hair, skin &amp; nail care within our tranquil oasis. We believe beauty is a holistic journey.
            </p>
            <button className="flex items-center gap-1.5 bg-[#73584d] text-white font-bold text-[9px] px-4 py-2 rounded-full shadow-sm active:scale-95 transition-all">
              <HugeiconsIcon icon={Calendar01Icon} size={12} />
              Book Appointment
            </button>
          </section>

          {/* Services Menu */}
          <section className="px-3.5 mt-4 space-y-2">
            <div className="text-center mb-2">
              <p className="text-[7.5px] font-bold uppercase tracking-widest text-[#735c00]">Our Expertise</p>
              <h3 className="font-bold text-[11.5px] text-[#73584d]">Services Menu</h3>
            </div>
            {[
              {
                icon: Scissor01Icon,
                title: "Hair",
                items: [
                  { name: "Precision Cut", price: "₹850+" },
                  { name: "Color & Highlights", price: "₹1,500+" },
                  { name: "Bridal Styling", price: "₹1,200+" },
                ],
              },
              {
                icon: FlowerIcon,
                title: "Skin",
                items: [
                  { name: "Signature Facial", price: "₹1,100" },
                  { name: "Chemical Peel", price: "₹1,350" },
                  { name: "Dermaplaning", price: "₹950" },
                ],
              },
              {
                icon: HandPointingRight01Icon,
                title: "Nails",
                items: [
                  { name: "Classic Manicure", price: "₹450" },
                  { name: "Spa Pedicure", price: "₹650" },
                  { name: "Gel Extensions", price: "₹850+" },
                ],
              },
            ].map(({ icon, title, items }) => (
              <div key={title} className="bg-white rounded-xl p-3 shadow-xs border border-[#f4d0c1]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-[#f4d0c1] flex items-center justify-center">
                    <HugeiconsIcon icon={icon} size={14} className="text-[#73584d]" />
                  </div>
                  <h4 className="font-bold text-[11px] text-[#73584d]">{title}</h4>
                </div>
                <div className="space-y-1.5">
                  {items.map(({ name, price }) => (
                    <div key={name} className="flex justify-between items-center border-b border-[#f0eded] pb-1">
                      <span className="text-[8.5px] text-[#1b1c1c]">{name}</span>
                      <span className="text-[8.5px] font-bold text-[#73584d] flex items-center gap-0.5">
                        {price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Meet the Stylist */}
          <section className="mx-3.5 mt-4 bg-[#f6f3f2] rounded-2xl p-3 flex gap-3 items-center">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-md">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUfeo-UVQpKGxVnx7M8Dw1OzQ7_49nmM699jUeQ5jONc2atqGKtSPyX8jX_YjxQj90a6ccIHv__tkMUpfl8xCtyiDfe2oX8OTrZx_Vt3wnZeCwBePlH2dujHZOJ6cc7JXWBeXwys0N9brRECYiXcK4UQNpi3XUCCbeHNmoADkL5Dg-T6qoEj-IkSegzF4rvFwYaZmctZr3YtDThA_7LPGD5yQMMRY1MyaZPK-c2YxmJiC061FBTJCr-g"
                alt="Sarah"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[7.5px] font-bold text-[#735c00] uppercase tracking-wider">Lead Stylist</p>
              <h4 className="font-bold text-[11px] text-[#73584d]">Sarah</h4>
              <p className="text-[8px] text-[#4f4440] leading-snug mt-0.5 line-clamp-2">
                Skincare expert with 10+ years in luxury beauty. Bridal specialist.
              </p>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <HugeiconsIcon key={i} icon={StarIcon} size={9} className="text-yellow-500" />
                ))}
              </div>
            </div>
          </section>

          {/* Studio Gallery */}
          <section className="px-3.5 mt-4">
            <h3 className="font-bold text-[11px] text-[#73584d] mb-2">Our Studio</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                "https://lh3.googleusercontent.com/aida-public/AB6AXuARAcl5L2lpOHYwkOu2QiWFrfTU84R0aXvp114mOyE6bwjqC5zfGvcVqr5Ln6GYeFq-MnGpnvzLmX5ZM6M-_VEpr7Qz7j4Ezn1713xM6NCelwwu9Fsix7AZ1bzOpx7Uvl9NecCO_mhhrraX3IGW_hoJ_Nk0gFY09MnAsTNXX4MVrTMbYhLycUWErpac3Ck2dUjB_1pDKKuKSE-V6jmQaTT0eGsa8D-jYk2UutPq8eT2NNsaKZGtD0Wzug",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuASSuWVph9FMtGEQaoOu1OQi0_9-uAQ6UCkfGsEsguLpdUerSDYztw84EK4P8HVkq1IIYHQo-2jJbaMtIWTXVwW_b6MTICBfeSGW6vhHNNLbIDv-fCqG9-qBGqrnVMy7Ba3Dt8npBI4-PxsgqDEZxZzzrV04xqdKuUv6LoLmQbYe6OpmPs-xB8L_nsvBCLqOiq61v_WaehxWtXyHjP3MBJ8habkLlx75oHwm8U6ys_iyfIfEkYRcx9_Jw",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDSFjGNz3Bc1jMMr6GgtVi9HQbhnrWwKwYofsZ4QT3TOvybJ94Yqz7dPed8r35ANLI532w_v0H5HVmeF6uIvXmJ5mGX-qGZvKdlUYf9NsOINva9JV1MF9feZKoOD4_Ku7Xs_nwuug6HVTpomtZHecxak9hsJWAVVF1SzPDYX2gCRuRgE4pqEA3c98RoNuoiqF5Cc69ukdfVPSd2KuElHlkcJs5FeBuIkjes8GQg-1C1RpFFrFfS8Ck25w",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCqm3Pwd7bU345TBUeIDKJ3BD7aJKQWh5EGjgBOb5NFDxvjquz6BU1rJQP2rW4WoPDpz5rgliTaI9O3IbFFfZA6Ni9TrvdcDfAvi-bD10dGFCuGVyy0GDTFTZ0PRav1Jn3KF_MA1NiUAHlaCzge766k6CEX-hGaM1BlmGa3gPHbMACKPsns24TxPGyRlABlh9DzC5R8R8QKyo4sP3HriSZ9n7Y6ErweYJ6v12xM4qWseoZD5dWsd0ZXPw",
              ].map((src, i) => (
                <img key={i} src={src} alt={`Studio ${i + 1}`} className="w-full h-20 object-cover rounded-xl shadow-xs" />
              ))}
            </div>
          </section>

          {/* Book Form */}
          <section className="mx-3.5 mt-4 bg-white rounded-2xl p-3.5 shadow-xs border border-[#f4d0c1]">
            <h3 className="font-bold text-[11.5px] text-[#73584d] mb-0.5">Reserve Your Time</h3>
            <p className="text-[8px] text-[#4f4440] mb-2.5">We look forward to pampering you.</p>
            <div className="space-y-2">
              <input readOnly className="w-full bg-[#f6f3f2] border-b border-[#d3c3bd] px-3 py-2 rounded-t-lg text-[9px] placeholder-[#81746f] text-[#1b1c1c]" placeholder="Full Name" type="text" />
              <input readOnly className="w-full bg-[#f6f3f2] border-b border-[#d3c3bd] px-3 py-2 rounded-t-lg text-[9px] placeholder-[#81746f] text-[#1b1c1c]" placeholder="Phone Number" type="tel" />
              <div className="grid grid-cols-2 gap-2">
                <input readOnly className="w-full bg-[#f6f3f2] border-b border-[#d3c3bd] px-3 py-2 rounded-t-lg text-[9px] text-[#1b1c1c]" placeholder="Date" type="text" />
                <input readOnly className="w-full bg-[#f6f3f2] border-b border-[#d3c3bd] px-3 py-2 rounded-t-lg text-[9px] text-[#1b1c1c]" placeholder="Time" type="text" />
              </div>
              <button className="w-full bg-[#73584d] text-white py-2 rounded-xl font-bold text-[9.5px] mt-1 shadow-sm active:scale-95 transition-all">
                Request Appointment
              </button>
            </div>
          </section>

          {/* Contact & Location */}
          <section className="mx-3.5 mt-4 bg-[#f6f3f2] rounded-2xl p-3 space-y-2.5 mb-2">
            <h3 className="font-bold text-[11px] text-[#73584d]">Visit Us</h3>
            {[
              { icon: MapPinIcon, label: "123 Luxury Blvd, Suite 200, Radiance City" },
              { icon: Clock01Icon, label: "Tue–Sat: 9 AM–7 PM • Sun–Mon: Closed" },
              { icon: CallIcon, label: "(555) 123-4567  •  hello@radiancestudio.com" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#fed65b] flex items-center justify-center shrink-0 mt-0.5">
                  <HugeiconsIcon icon={icon} size={12} className="text-[#73584d]" />
                </div>
                <span className="text-[8.5px] text-[#4f4440] leading-snug">{label}</span>
              </div>
            ))}
            <button className="flex items-center gap-1.5 border border-[#d3c3bd] text-[#73584d] px-3 py-1.5 rounded-full font-bold text-[8.5px] bg-white active:scale-95 transition-all">
              <HugeiconsIcon icon={MapPinIcon} size={12} /> Find on Map
            </button>
          </section>

        </main>
      </div>
    </div>
  );
}
