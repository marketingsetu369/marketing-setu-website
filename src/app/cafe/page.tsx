"use client";

import React from "react";
import BusinessView from "@/views/business-page";
import type { BusinessPageData } from "@/types/businessPage";

export default function CafePreviewPage() {
  const mockCafeData: BusinessPageData = {
    slug: "cafe-preview",
    business_name: "Bean & Brew Café",
    business_category: "cafe coffee shop bakery",
    about_us: "Welcome to Bean & Brew, your neighborhood cozy corner for single-origin espresso, freshly baked artisanal sourdough pastries, and warm conversations.",
    mobile_number: "+91 98765 43210",
    email_address: "hello@beanandbrew.com",
    location_address: "Ground Floor, Sunrise Boulevard, Sector 15",
    logo_url: "",
    theme_color_hex: "#7c4a2f",
    facebook_link: "https://facebook.com",
    instagram_link: "https://instagram.com",
    website_link: "https://beanandbrew.com",
    products: [
      {
        name: "Signature Espresso",
        description: "Our signature blend espresso double shot served with dynamic micro-foam steamed milk.",
        price: 220,
        buttonName: "Send Enquiry",
      },
      {
        name: "Almond Butter Croissant",
        description: "Flaky, multi-layered classic French croissant filled with rich in-house almond frangipane.",
        price: 180,
        buttonName: "Send Enquiry",
      },
      {
        name: "Cold Brew Tonic",
        description: "Slow-steeped 18-hour cold brew coffee concentrate topped over crisp tonic water and lemon slice.",
        price: 240,
        buttonName: "Send Enquiry",
      }
    ],
    gallery_images: []
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <BusinessView data={mockCafeData} businessName="Bean & Brew" />
    </div>
  );
}
