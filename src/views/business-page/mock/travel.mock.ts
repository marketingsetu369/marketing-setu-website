import type { BusinessPageData } from "@/types/businessPage";

export const travelMock: BusinessPageData = {
  slug: "preview-travel",
  business_name: "Wanderlust Holidays",
  business_category: "Tour & Travel Agency",
  about_us: "We craft unforgettable journeys — custom itineraries, private guides, seamless visa assistance, and group tours to destinations that take your breath away.",
  mobile_number: "919777888999",
  email_address: "plan@wanderlustholidays.in",
  location_address: "MG Road, Camp, Pune – 411001",
  logo_url: "",
  theme_color_hex: "#0ea5e9",
  facebook_link: "https://facebook.com",
  instagram_link: "https://instagram.com",
  website_link: "https://wanderlustholidays.in",
  products: [
    { name: "Goa Beach Escape",        description: "4N/5D all-inclusive — beachside resort, water sports, and sunset cruise.",        price: "₹18,999/person", buttonName: "Book Now" },
    { name: "Kerala Backwaters",       description: "5N/6D houseboat stay, Ayurveda spa, and spice plantation tour.",                  price: "₹22,500/person", buttonName: "Book Now" },
    { name: "Bali Honeymoon Special",  description: "7N/8D romantic villa, private beach dinner, Ubud rice terrace trek.",            price: "₹65,000/couple", buttonName: "Enquiry"  },
    { name: "Europe Grand Tour",       description: "14N/15D — Paris, Rome, Amsterdam, Prague with guided tours and flights.",        price: "₹1,85,000/person",buttonName: "Enquiry" },
    { name: "Ladakh Adventure Ride",   description: "8N/9D bike/cab tour — Pangong Lake, Nubra Valley, Khardung La pass.",            price: "₹35,000/person", buttonName: "Book Now" },
    { name: "Maldives Luxury Escape",  description: "5N/6D overwater villa, dolphin cruise, snorkelling with whale sharks.",          price: "₹1,20,000/couple",buttonName: "Enquiry" },
  ],
  template_data: {
    travel: {
      service_tiles: [
        { title: "Domestic Tours",        desc: "Carefully crafted getaways across India's most iconic and hidden destinations."         },
        { title: "International Packages",desc: "Tailored itineraries to 40+ countries with flights, visa, and accommodation handled." },
        { title: "Honeymoon Specials",    desc: "Romantic escapes designed for two — private, luxurious, and stress-free."             },
        { title: "Visa Assistance",       desc: "Expert document guidance for tourist, business, and long-stay visa applications."      },
      ],
    },
  },
};
