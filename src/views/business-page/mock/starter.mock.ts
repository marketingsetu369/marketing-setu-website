import type { BusinessPageData } from "@/types/businessPage";

export const starterMock: BusinessPageData = {
  slug: "preview-starter",
  business_name: "Comptech EV Solutions",
  business_category: "Electric Vehicle Dealership",
  about_us: "Leading the electric revolution with high-performance scooters, fast charging solutions, and unmatched after-sales service across Maharashtra.",
  mobile_number: "919876543210",
  email_address: "info@comptech.in",
  location_address: "Nira, Pune District – 412102",
  logo_url: "",
  theme_color_hex: "#4f46e5",
  facebook_link: "https://facebook.com",
  instagram_link: "https://instagram.com",
  website_link: "https://comptech.in",
  products: [
    { name: "Comptech VX1",   description: "High-speed RTO-registered scooter with 155km range and fast charging.",           price: "₹95,500",   buttonName: "Buy Now"  },
    { name: "Comptech EV Pro",description: "Premium scooter with 200km range, next-gen fast charging, and smart connectivity.", price: "₹1,24,999", buttonName: "Enquiry"  },
    { name: "Comptech Lite",  description: "Perfect for city commutes — lightweight, 85km range, and vibrant colour options.", price: "₹74,500",   buttonName: "Buy Now"  },
  ],
  gallery_images: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600",
    "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600",
  ],
};
