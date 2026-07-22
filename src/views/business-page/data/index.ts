// Re-export all shared types from central types file
export type {
  ProductCardItem as ProductData,
  ContactItem as ContactData,
  QuickActionItem as QuickActionData,
  SocialItem as SocialData,
  GalleryItem as GalleryData,
} from "@/types/businessPage";

// Static mock data (used during development / demo)
export const PRODUCTS_MOCK = [
  {
    id: "1",
    name: "Comptech VX1",
    description: "High speed RTO registration scooter with 155km range and fast charging support.",
    price: "₹95,500/-",
    actionType: "buy",
    iconColor: "var(--business-primary)"
  },
  {
    id: "2",
    name: "Comptech EV Pro",
    description: "Premium scooter, 200km range & next-gen fast charging technology.",
    price: "₹1,24,999/-",
    actionType: "enquiry",
    iconColor: "var(--business-primary)"
  },
  {
    id: "3",
    name: "Comptech Lite",
    description: "Perfect for daily city commutes. Lightweight, 85km range, and stylish color options.",
    price: "₹74,500/-",
    actionType: "buy",
    iconColor: "var(--business-primary)"
  },
];

export const GALLERY_MOCK = [
  { id: "1", colorClass: "color-purple", iconType: "scooter" },
  { id: "2", colorClass: "color-teal", iconType: "bolt" },
  { id: "3", colorClass: "color-orange", iconType: "battery" },
  { id: "4", colorClass: "color-pink", iconType: "support" },
  { id: "5", colorClass: "color-blue", iconType: "wrench" },
  { id: "6", colorClass: "color-gradient", iconType: "star" },
];

export const SOCIAL_MOCK = [
  { id: "fb", href: "#", type: "fb" as const },
  { id: "ig", href: "#", type: "ig" as const },
  { id: "web", href: "#", type: "web" as const },
];

export const CONTACT_MOCK = [
  { id: "mobile", label: "Mobile", value: "+91 98765 43210", href: "tel:+919876543210", iconType: "phone" as const },
  { id: "email", label: "Email", value: "info@comptech.in", href: "mailto:info@comptech.in", iconType: "email" as const },
  { id: "location", label: "Location", value: "Nira, Maharashtra", iconType: "location" as const },
];

export const QUICK_ACTIONS_MOCK = [
  { id: "call", label: "Call", href: "tel:+919876543210", type: "call" as const },
  { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/919876543210", type: "whatsapp" as const },
  { id: "directions", label: "Directions", href: "https://maps.google.com", type: "directions" as const },
];

export { renderIcon } from "./renderIcon";
