"use client";

import type { BusinessPageData } from "@/types/businessPage";
import MainBusinessView from "@/views/business-page";

export default function HotelPreviewPage() {
  const mockHotelData: BusinessPageData = {
    slug: "grand-palace-hotel",
    business_name: "Grand Palace Hotel",
    business_category: "Luxury Hotel & Spa Resort",
    about_us: "The Grand Palace Hotel offers premium luxury accommodations with signature suites, fine-dining restaurants, temperature-controlled pools, and bespoke concierge services.",
    mobile_number: "+91 99999 88888",
    email_address: "stay@grandpalacehotel.com",
    location_address: "Palace Road, Near Heritage Square, Udaipur, Rajasthan",
    logo_url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=150&auto=format&fit=crop",
    theme_color_hex: "#0f172a",
    facebook_link: "https://facebook.com",
    instagram_link: "https://instagram.com",
    website_link: "https://grandpalacehotel.com",
    products: [
      {
        name: "Presidential Suite",
        description: "Breathtaking panoramic lake views, 24/7 private butler, indoor jacuzzi, and complimentary airport transfers.",
        price: 25000,
        price_subtext: "per night",
        buttonName: "Book Suite",
        imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Heritage Executive Room",
        description: "Elegant blend of royal Rajasthani decor with modern automation, walk-in rain shower, and king bed.",
        price: 12000,
        price_subtext: "per night",
        buttonName: "Book Room",
        imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Wellness Spa Day Package",
        description: "Access to private saunas, signature deep tissue hot-stone massages, and personalized rejuvenation therapy.",
        price: 5500,
        price_subtext: "per guest",
        buttonName: "Book Spa Session",
        imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400&auto=format&fit=crop"
      }
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=300&auto=format&fit=crop"
    ]
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <MainBusinessView data={mockHotelData} businessName="Grand Palace Hotel" />
    </div>
  );
}
