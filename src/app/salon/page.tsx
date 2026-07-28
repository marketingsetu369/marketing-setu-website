"use client";

import React from "react";
import BusinessView from "@/views/business-page";
import type { BusinessPageData } from "@/types/businessPage";

export default function SalonPreviewPage() {
  const mockSalonData: BusinessPageData = {
    slug: "salon-preview",
    business_name: "Luxe & Shear Salon",
    business_category: "Luxury Unisex Salon & Spa",
    about_us: "Luxe & Shear is a boutique salon committed to delivering bespoke hair, skin, and bridal styling services. Our team of certified expert stylists and therapists customize every service to elevate your natural beauty.",
    mobile_number: "+91 98765 98765",
    email_address: "info@luxeandshear.com",
    location_address: "Suite 404, Golden Crest Plaza, Kalyani Nagar, Pune, MH",
    logo_url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=250&auto=format&fit=crop",
    theme_color_hex: "#d946ef",
    facebook_link: "https://facebook.com",
    instagram_link: "https://instagram.com",
    website_link: "https://luxeandshear.com",
    products: [
      {
        name: "Designer Haircut & Styling",
        description: "Personalized haircut consulting, scalp massage, wash, custom styling cut, and blowout.",
        price: 900,
        price_subtext: "per session",
        buttonName: "Book Appointment",
        imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Hydra-Radiance Facial",
        description: "Multi-stage skin exfoliation and deep hydration therapy for an instant radiant glow.",
        price: 2500,
        price_subtext: "per session",
        buttonName: "Book Facial",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Luxury Pedicure & Manicure",
        description: "Soothing scrub, massage, and complete cuticle care using organic premium creams.",
        price: 1500,
        price_subtext: "per session",
        buttonName: "Schedule Visit",
        imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=400&auto=format&fit=crop"
      }
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=300&auto=format&fit=crop"
    ]
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <BusinessView data={mockSalonData} businessName="Luxe & Shear Salon" />
    </div>
  );
}
