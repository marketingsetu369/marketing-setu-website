import type { BusinessPageData } from "@/types/businessPage";

export const hotelMock: BusinessPageData = {
  slug: "preview-hotel",
  business_name: "The Grand Meridian",
  business_category: "Luxury Boutique Hotel & Resort",
  about_us:
    "An intimate luxury retreat where world-class hospitality meets breathtaking natural beauty. Every stay is a story worth telling.",
  mobile_number: "912012345678",
  email_address: "reservations@grandmeridian.in",
  location_address: "Lavasa Hill Station, Pune – 412112",
  logo_url: "",
  theme_color_hex: "#f59e0b",
  facebook_link: "https://facebook.com",
  instagram_link: "https://instagram.com",
  website_link: "https://grandmeridian.in",
  products: [
    { name: "Deluxe Room",       description: "King-size bed, valley view balcony, 42-inch TV, minibar, and complimentary breakfast.", price: "₹6,500/night",  buttonName: "Book Now" },
    { name: "Premier Suite",     description: "Spacious living area, private plunge pool, butler service, and panoramic hill views.",  price: "₹12,000/night", buttonName: "Book Now" },
    { name: "Presidential Villa",description: "Private pool villa with personal chef, car service, and exclusive terrace dining.",     price: "₹28,000/night", buttonName: "Enquiry"  },
  ],
  template_data: {
    hotel: {
      hero_tagline: "Where Luxury Meets Serenity",
      checkin: "2:00 PM",
      checkout: "11:00 AM",
      amenities: ["Infinity Pool", "Spa & Wellness", "Fine Dining", "Conference Halls", "Helipad", "24/7 Butler"],
      service_rows: [
        {
          title: "ROOMS & SUITES",
          desc: "Elegantly appointed rooms with handcrafted furnishings, Egyptian cotton linen, and sweeping landscape vistas that make every morning special.",
          image_class: "room-img",
          layout: "left-image",
        },
        {
          title: "SIGNATURE RESTAURANT",
          desc: "Award-winning cuisine crafted from locally sourced seasonal produce. Private dining, rooftop tables, and live kitchen experiences available.",
          image_class: "restaurant-img",
          layout: "right-image",
        },
      ],
    },
  },
};
