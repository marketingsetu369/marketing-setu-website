"use client";

import React from "react";
import BusinessView from "@/views/business-page";
import type { BusinessPageData } from "@/types/businessPage";

export default function LawerPreviewPage() {
  const mockLawerData: BusinessPageData = {
    slug: "lawer-preview",
    business_name: "Themis Law Agency",
    business_category: "advocate lawyer legal representation",
    about_us: "We approach each problem with three essential elements: strategic thinking, creative solutions, and proven results.",
    mobile_number: "+0123 456 789",
    email_address: "hello@themis.com",
    location_address: "123 Legal Avenue, Suite 400, Financial District, NY 10001",
    logo_url: "",
    theme_color_hex: "#E5A117",
    facebook_link: "https://facebook.com",
    instagram_link: "https://instagram.com",
    website_link: "https://themis.com",
    products: [
      {
        name: "Bankruptcy",
        description: "Sound legal support and protection of assets through complex bankruptcy litigation and counseling.",
        price: 1500,
        buttonName: "Send Enquiry",
      },
      {
        name: "Car Accidents",
        description: "Relentless courtroom strategy and advocacy to secure maximum claims in accident damages.",
        price: 800,
        buttonName: "Send Enquiry",
      },
      {
        name: "Capital Market",
        description: "Thorough legal advice, compliance guidelines, and disputes settlement in the capital market.",
        price: 1000,
        buttonName: "Send Enquiry",
      }
    ],
    gallery_images: []
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <BusinessView data={mockLawerData} businessName="Themis Law" />
    </div>
  );
}
