import type { BusinessPageData } from "@/types/businessPage";

export const restaurantMock: BusinessPageData = {
  slug: "preview-restaurant",
  business_name: "Ember & Spice",
  business_category: "Fine Dining Restaurant",
  about_us: "A culinary story written in vibrant spice and warm amber tones — where every plate is theatre and every bite is celebration.",
  mobile_number: "919988776655",
  email_address: "reservations@emberandspice.in",
  location_address: "Koregaon Park Lane 5, Pune – 411001",
  logo_url: "",
  theme_color_hex: "#7f1d1d",
  instagram_link: "https://instagram.com",
  facebook_link: "https://facebook.com",
  products: [
    { name: "Saffron Lamb Rack",      description: "New Zealand lamb with saffron jus, truffle mash, and charred asparagus.",  price: "₹1,850", buttonName: "Reserve" },
    { name: "Butter Garlic Prawns",   description: "Tiger prawns in herb butter with toasted brioche and micro salad.",        price: "₹1,200", buttonName: "Reserve" },
    { name: "Smoked Duck Breast",     description: "Applewood smoked duck, cherry compote, and crispy polenta cake.",         price: "₹1,650", buttonName: "Reserve" },
    { name: "Truffle Mushroom Risotto",description: "Arborio rice with wild mushrooms, truffle oil, and shaved parmesan.",   price: "₹980",   buttonName: "Reserve" },
  ],
  template_data: {
    restaurant: {
      highlight_card: {
        label: "Chef's Recommendation",
        title: "Signature Tasting Menu",
        desc: "Seven curated courses designed around seasonal produce, paired with handcrafted cocktails and sommelier-selected wines.",
      },
      testimonial_note: {
        heading: "A Note from Our Kitchen",
        body: "Reserve your table for a theatrical dinner that feels intimate, indulgent, and unforgettable.",
        quote: "The plating, the aromas, the flavours — every bite felt like a genuine celebration of craft.",
        author: "Verified Guest Review",
      },
    },
  },
};
