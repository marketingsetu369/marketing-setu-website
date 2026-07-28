import type { BusinessPageData } from "@/types/businessPage";

export const bakeryMock: BusinessPageData = {
  slug: "preview-bakery",
  business_name: "Golden Crumb Bakery",
  business_category: "Artisan Bakery & Custom Cakes",
  about_us: "We bake with love and the finest ingredients — artisanal sourdough breads, celebration cakes, flaky croissants, and rich pastries crafted fresh every morning.",
  mobile_number: "919333444555",
  email_address: "order@goldencrumb.in",
  location_address: "Aundh, Pune – 411007",
  logo_url: "",
  theme_color_hex: "#d97706",
  instagram_link: "https://instagram.com",
  facebook_link: "https://facebook.com",
  products: [
    { name: "Classic Sourdough Loaf",    description: "Slow-fermented 72-hour sourdough with a crispy crust and chewy interior.",          price: "₹320",  buttonName: "Order Now" },
    { name: "Chocolate Lava Cake",       description: "Warm molten chocolate centre in a rich cocoa sponge — served with vanilla cream.",  price: "₹280",  buttonName: "Order Now" },
    { name: "Almond Croissant",          description: "Buttery layered croissant filled with almond frangipane, baked golden.",            price: "₹160",  buttonName: "Order Now" },
    { name: "Red Velvet Celebration Cake",description: "3-layer red velvet with cream cheese frosting — available in 500g, 1kg, 2kg.",    price: "₹850",  buttonName: "Order Now" },
    { name: "Banana Walnut Bread",       description: "Moist banana bread loaded with toasted walnuts and a hint of cinnamon.",            price: "₹240",  buttonName: "Order Now" },
    { name: "Matcha White Choc Tart",    description: "Crispy pastry shell with matcha ganache and white chocolate drizzle.",             price: "₹220",  buttonName: "Order Now" },
  ],
  template_data: {
    bakery: {
      badge_label: "Oven Fresh Daily",
      custom_order_cta: {
        heading: "Custom Celebration Cakes",
        body: "Birthday, wedding, or anniversary — tell us your dream flavour, theme, and size. We bake it to perfection with 48-hour advance notice.",
        button_label: "Order Custom Cake on WhatsApp",
        whatsapp_message: "Hi! I want to enquire about a custom cake order.",
      },
    },
  },
};
