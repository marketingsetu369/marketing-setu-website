import type { BusinessPageData } from "@/types/businessPage";

export const nurseryMock: BusinessPageData = {
  slug: "preview-nursery",
  business_name: "Green Thumb Nursery",
  business_category: "Plants, Seeds & Garden Center",
  about_us: "Bringing life and serenity into every space — premium indoor air-purifying plants, exotic outdoor blooms, organic fertilisers, designer ceramic pots, and expert landscaping advice.",
  mobile_number: "919222333444",
  email_address: "grow@greenthumb.in",
  location_address: "Hadapsar, Pune – 411028",
  logo_url: "",
  theme_color_hex: "#15803d",
  instagram_link: "https://instagram.com",
  facebook_link: "https://facebook.com",
  products: [
    { name: "Peace Lily",             description: "Air-purifying indoor plant. Thrives in low light. Excellent for bedrooms and offices.",  price: "₹299",   buttonName: "Buy Now" },
    { name: "Monstera Deliciosa",     description: "Iconic tropical split-leaf plant — statement piece for living spaces.",                  price: "₹549",   buttonName: "Buy Now" },
    { name: "Ceramic Planter Set",    description: "Set of 3 minimalist ceramic pots with drainage holes — white, terracotta, sage.",       price: "₹899",   buttonName: "Buy Now" },
    { name: "Organic Compost Mix",    description: "5kg bag of premium compost for vegetables, herbs, and flowering plants.",               price: "₹350",   buttonName: "Buy Now" },
    { name: "Succulent Collection",   description: "Set of 6 assorted succulents in terracotta pots — low maintenance, high charm.",        price: "₹649",   buttonName: "Buy Now" },
    { name: "Vertical Garden Kit",    description: "DIY pocket wall garden kit with 12 pockets, hooks, and growing medium included.",       price: "₹1,299", buttonName: "Enquiry" },
  ],
  template_data: {
    nursery: {
      badge_label: "Grow Green",
      care_tip_cta: {
        heading: "Free Plant Care Consultation",
        body: "Not sure about watering schedules, sunlight needs, or potting soil? Chat with our botanical specialists for personalised guidance.",
        button_label: "Get Free Plant Care Advice",
        whatsapp_message: "Hi! I need help with plant care advice.",
      },
    },
  },
};
