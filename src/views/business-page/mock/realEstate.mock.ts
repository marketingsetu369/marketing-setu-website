import type { BusinessPageData } from "@/types/businessPage";

export const realEstateMock: BusinessPageData = {
  slug: "preview-real-estate",
  business_name: "Pinnacle Properties",
  business_category: "Premium Real Estate & Property Advisory",
  about_us: "Curated residences and commercial spaces for discerning investors. We match the right buyers with the right properties through market intelligence and personalised advisory.",
  mobile_number: "919444555666",
  email_address: "deals@pinnacleproperties.in",
  location_address: "Baner Road, Pune – 411045",
  logo_url: "",
  theme_color_hex: "#1f2937",
  facebook_link: "https://facebook.com",
  website_link: "https://pinnacleproperties.in",
  products: [
    { name: "3 BHK — Baner Heights",    description: "Ready possession, 1,450 sq ft, modular kitchen, club amenities. Vastu compliant.",    price: "₹1.2 Cr",  buttonName: "Schedule Visit" },
    { name: "2 BHK — Kharadi Prime",    description: "Under construction, RERA registered, 980 sq ft. Near IT park.",                        price: "₹78 Lakh", buttonName: "Schedule Visit" },
    { name: "Commercial Office Space",  description: "500–2000 sq ft plug-and-play offices in Magarpatta Cybercity.",                         price: "₹85/sq ft",buttonName: "Enquiry"        },
    { name: "Luxury Villa — Lavasa",    description: "4 BHK private villa with pool, garden, and panoramic hill views.",                      price: "₹3.8 Cr",  buttonName: "Enquiry"        },
  ],
  template_data: {
    real_estate: {
      key_stats: [
        { value: "200+",   label: "Properties Sold"     },
        { value: "₹500Cr", label: "Deals Closed"        },
        { value: "12+",    label: "Years Experience"     },
        { value: "98%",    label: "Client Satisfaction"  },
      ],
    },
  },
};
