import type { BusinessPageData } from "@/types/businessPage";

export const photographerMock: BusinessPageData = {
  slug: "preview-photographer",
  business_name: "Lens & Light Studio",
  business_category: "Professional Photography & Videography",
  about_us: "Specialising in timeless wedding documentary, modern editorial fashion, elegant family portraits, and striking product shoots. Every frame tells a story.",
  mobile_number: "919555666777",
  email_address: "bookings@lensandlight.in",
  location_address: "Kalyani Nagar, Pune – 411006",
  logo_url: "",
  theme_color_hex: "#18181b",
  instagram_link: "https://instagram.com",
  website_link: "https://lensandlight.in",
  products: [
    { name: "Wedding Documentary",  description: "Full-day coverage — 2 photographers, drone shots, 500+ edited images, cinematic reel.", price: "₹65,000",  buttonName: "Enquiry"  },
    { name: "Pre-Wedding Shoot",    description: "4-hour outdoor session, 2 locations, 80 retouched images, digital album.",              price: "₹18,000",  buttonName: "Book Now" },
    { name: "Product Photography",  description: "Studio shoot, 20 products, white/lifestyle background, e-commerce ready images.",      price: "₹8,000",   buttonName: "Enquiry"  },
    { name: "Portrait Session",     description: "1-hour studio or outdoor portrait session, 30 edited digital images delivered.",       price: "₹4,500",   buttonName: "Book Now" },
  ],
  gallery_images: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
    "https://images.unsplash.com/photo-1606216794079-73e0a3039090?w=600",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600",
  ],
  template_data: {
    photographer: {
      eyebrow: "Award-Winning Visual Storytelling",
      fields: [
        { title: "Weddings & Engagements",  desc: "Romantic editorial documentary style — from intimate ceremonies to grand ballroom receptions."   },
        { title: "Events & Ceremonies",     desc: "Corporate milestones, birthday celebrations, brand launches, and live performance coverage."      },
        { title: "Fashion & Editorial",     desc: "Creative portraits, lookbook shoots, magazine covers, and conceptual visual campaigns."           },
        { title: "Commercial & Products",   desc: "High-resolution advertising imagery, lifestyle flatlay, and e-commerce catalogue photography."   },
      ],
    },
  },
};
