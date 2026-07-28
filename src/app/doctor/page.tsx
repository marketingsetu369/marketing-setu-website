"use client";

import React from "react";
import BusinessView from "@/views/business-page";
import type { BusinessPageData } from "@/types/businessPage";

export default function DoctorPreviewPage() {
  const mockDoctorData: BusinessPageData = {
    slug: "doctor-preview",
    business_name: "Aarav Mehta",
    business_category: "Consultant Cardiologist",
    about_us: "Dr. Aarav Mehta is a leading cardiologist with over 15 years of experience in advanced cardiac care, diagnostic cardiology, and personalized heart health treatments.",
    mobile_number: "+91 98765 43210",
    email_address: "contact@draaravmehta.com",
    location_address: "CardioCare Clinic, 102 Health Avenue, Medical Zone, Mumbai, MH",
    logo_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=250&auto=format&fit=crop",
    theme_color_hex: "#008080",
    facebook_link: "https://facebook.com",
    instagram_link: "https://instagram.com",
    website_link: "https://draaravmehta.com",
    products: [
      {
        name: "General Cardiac Consultation",
        description: "Comprehensive cardiovascular evaluation including medical history review and physical examination.",
        price: 1500,
        price_subtext: "per consultation",
        buttonName: "Book Appointment",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Electrocardiogram (ECG)",
        description: "Quick and painless test to record the electrical activity of your heart.",
        price: 800,
        price_subtext: "per test",
        buttonName: "Book Test",
        imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Echocardiogram (Echo)",
        description: "Ultrasound imaging of the heart to evaluate cardiac structure and function.",
        price: 3000,
        price_subtext: "per scan",
        buttonName: "Schedule Scan",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=400&auto=format&fit=crop"
      }
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=300&auto=format&fit=crop"
    ]
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <BusinessView data={mockDoctorData} businessName="Aarav Mehta" />
    </div>
  );
}
