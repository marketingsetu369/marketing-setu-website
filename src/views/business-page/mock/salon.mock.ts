import type { BusinessPageData } from "@/types/businessPage";

export const salonMock: BusinessPageData = {
  slug: "preview-salon",
  business_name: "Luxe & Shear",
  business_category: "Luxury Unisex Salon & Spa",
  about_us:
    "A sanctuary of style and luxury in the heart of the city. We bring out the absolute best in you with expert stylists, organic products, and a deeply relaxing atmosphere.",
  mobile_number: "919823456789",
  email_address: "hello@luxeandshear.in",
  location_address: "Koregaon Park, Pune – 411001",
  logo_url: "",
  theme_color_hex: "#ec4899",
  facebook_link: "https://facebook.com",
  instagram_link: "https://instagram.com",
  products: [
    { name: "Signature Haircut & Styling", description: "Precision cut tailored to your face shape with premium blowdry finish.",            price: "₹999",   buttonName: "Book Now" },
    { name: "Balayage & Colour",           description: "Freehand colour blending for a natural sun-kissed gradient look.",                   price: "₹3,500", buttonName: "Book Now" },
    { name: "HydraFacial Treatment",       description: "Deep cleanse, exfoliate, and hydrate in one advanced 45-minute facial session.",     price: "₹2,200", buttonName: "Book Now" },
    { name: "Bridal Makeup Package",       description: "HD makeup with airbrush finish, trial session, and saree/lehenga draping included.", price: "₹12,000",buttonName: "Enquiry"  },
    { name: "Deep Tissue Massage",         description: "60-minute therapeutic massage targeting muscle knots and chronic tension.",           price: "₹1,800", buttonName: "Book Now" },
    { name: "Keratin Hair Smoothing",      description: "Brazilian keratin treatment for frizz-free, silky straight hair up to 6 months.",   price: "₹5,500", buttonName: "Enquiry"  },
  ],
  gallery_images: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600",
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600",
    "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=600",
    "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600",
  ],
  template_data: {
    salon: {
      rating_value: "4.9",
      rating_label: "From 320+ verified Google reviews",
      stats: [
        { value: "12+",  label: "Expert Stylists"   },
        { value: "8K+",  label: "Happy Clients"     },
        { value: "4.9★", label: "Google Rating"     },
        { value: "100%", label: "Sanitized Space"   },
      ],
      highlights: [
        { title: "Precision Hair Styling",     desc: "Custom designer cuts, balayage coloring, and advanced keratin treatments by certified stylists.", icon_name: "HairDryerIcon"    },
        { title: "Skin & Makeup Artistry",     desc: "Hydrafacials, organic peel therapy, and flawless HD bridal makeup by our trained beauty artists.", icon_name: "BlushBrush01Icon" },
        { title: "Revitalizing Spa Therapy",   desc: "Deep tissue massage, hot steam sessions, and calming organic wellness wraps to melt stress away.", icon_name: "FlowerIcon"       },
      ],
      timings: [
        { day: "Tuesday – Sunday", time: "10:00 AM – 08:30 PM"  },
        { day: "Monday",           time: "Closed (Weekly Off)"  },
      ],
      testimonials: [
        { text: "Best haircut and balayage I have ever had. The stylist spent an entire hour understanding exactly what I wanted before picking up the scissors.", client: "Aishwarya Sen",   location: "Koregaon Park"  },
        { text: "Impeccable hygiene, warm staff, and the most relaxing HydraFacial I have experienced. I leave feeling like a completely new person every time.", client: "Rohan Joshi",     location: "Kalyani Nagar"  },
        { text: "The bridal makeup package was absolutely worth every rupee. My entire family couldn't stop complimenting the look throughout the wedding day.",  client: "Priya Kulkarni",  location: "Viman Nagar"    },
      ],
    },
  },
};
