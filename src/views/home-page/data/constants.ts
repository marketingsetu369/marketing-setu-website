/** Shared WhatsApp business number — update here only */
export const WA_NUMBER = "919999999999";

/** Default greeting for general enquiries */
export const WA_DEFAULT_MSG = "Hi MarketingSetu! I'd like a free consultation.";

/** Site navigation links */
export const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing",  href: "/pricing" },
  { label: "About",    href: "/about" },
  { label: "Reviews",  href: "/testimonials" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
] as const;

/** Contact details used in footer and ContactView */
export const contactInfo = {
  phone:    "+91 99999 99999",
  waRaw:    WA_NUMBER,
  email:    "hello@marketingsetu.com",
  location: "Pune, Maharashtra, India",
  hours:    "Mon – Sat, 9am – 7pm IST",
} as const;

