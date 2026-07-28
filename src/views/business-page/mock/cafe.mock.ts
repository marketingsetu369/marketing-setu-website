import type { BusinessPageData } from "@/types/businessPage";

export const cafeMock: BusinessPageData = {
  slug: "preview-cafe",
  business_name: "The Brew Nook",
  business_category: "Specialty Coffee & Artisan Bakery",
  about_us: "A neighbourhood café that feels like home — fresh brew, handcrafted bites, and a chalkboard menu that changes with the season.",
  mobile_number: "919765432100",
  email_address: "hello@thebrewnook.in",
  location_address: "FC Road, Shivajinagar, Pune – 411005",
  logo_url: "",
  theme_color_hex: "#7c4a2f",
  instagram_link: "https://instagram.com",
  facebook_link: "https://facebook.com",
  products: [
    { name: "House Drip Coffee",         description: "Single-origin Ethiopian beans slow-dripped to perfection.",             price: "₹180",  buttonName: "Order Now" },
    { name: "Rose Pistachio Croissant",  description: "Flaky buttery pastry layered with house-made rose cream and pistachios.", price: "₹220",  buttonName: "Order Now" },
    { name: "Avocado Toast",             description: "Sourdough with whipped ricotta, cherry tomatoes, and everything seasoning.", price: "₹280", buttonName: "Order Now" },
    { name: "Cold Brew Float",           description: "24-hour cold brew topped with housemade vanilla bean ice cream.",         price: "₹260",  buttonName: "Order Now" },
  ],
  template_data: {
    cafe: {
      hero_tagline: "Warm. Fresh. Inviting.",
      specials: [
        "Cardamom Rose Latte",
        "Burnt Honey Croissant",
        "Mushroom Shakshuka Toast",
        "Iced Matcha with Oat Milk",
      ],
      bakery_items: [
        "Espresso Walnut Brownie",
        "Honey Almond Scone",
        "Cinnamon Knot",
        "Dark Chocolate Tart",
      ],
    },
  },
};
