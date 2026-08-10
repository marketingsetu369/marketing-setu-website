export interface PlanFeature {
  bold: string;
  desc?: string;
}

export interface PricingPlan {
  id: string;
  badge?: string;
  featured?: boolean;
  name: string;
  description: string;
  price: string;
  features: PlanFeature[];
  compactFeatures?: PlanFeature[];
  whatsappMessage: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "quick-connect",
    badge: "🌿 Starter · Setu Connect",
    name: "Quick Connect",
    description: "Perfect for small businesses starting with a smart digital card.",
    price: "₹1,999",
    whatsappMessage: "Hi MarketingSetu! I'd like to start with the Quick Connect (₹1,999) plan.",
    features: [
      {
        bold: "Digital Business Card",
        desc: "Smart digital card to share your business details instantly."
      },
      {
        bold: "Header & Brand Details",
        desc: "Logo, business name, category, and custom URL slug."
      },
      {
        bold: "Contact & Map Links",
        desc: "Direct phone, WhatsApp messaging, email, and Google Maps location."
      },
      {
        bold: "Owner & Partner Profile",
        desc: "Display business owners, partners, and team members."
      }
    ],
    compactFeatures: [
      { bold: "Digital Business Card" },
      { bold: "Header & Brand Details" },
      { bold: "Contact & Map Links" },
      { bold: "Owner & Partner Profile" }
    ]
  },
  {
    id: "smart-connect",
    badge: "🚀 Growth · Setu Bridge",
    featured: true,
    name: "Smart Connect",
    description: "Ideal for growing businesses expanding their digital showcase.",
    price: "₹5,999",
    whatsappMessage: "Hi MarketingSetu! I'd like to start with the Smart Connect (₹5,999) plan.",
    features: [
      { bold: "Everything in Quick Connect" },
      {
        bold: "Social Links Showcase",
        desc: "Connect your Instagram, Facebook, and social profiles."
      },
      {
        bold: "Products & Services Catalog",
        desc: "Add your items, pricing, photos, and item details."
      },
      {
        bold: "Photo Gallery Showcase",
        desc: "Upload business showcase photos to build trust."
      },
      {
        bold: "Customer Reviews & Testimonials",
        desc: "Highlight customer comments and ratings."
      }
    ],
    compactFeatures: [
      { bold: "Everything in Quick Connect" },
      { bold: "Products & Services Catalog" },
      { bold: "Photo Gallery Showcase" },
      { bold: "Customer Reviews & Testimonials" }
    ]
  },
  {
    id: "power-connect",
    badge: "👑 Pro · Setu Summit",
    name: "Power Connect",
    description: "Full suite for businesses looking to scale their digital presence.",
    price: "₹9,999",
    whatsappMessage: "Hi MarketingSetu! I'd like to start with the Power Connect (₹9,999) plan.",
    features: [
      { bold: "Everything in Smart Connect" },
      {
        bold: "Auto SMS & WhatsApp Automation",
        desc: "Automated instant customer responses and missed-call follow ups."
      },
      {
        bold: "Custom Landing Page & Domain",
        desc: "Dedicated campaign page connected to your custom brand domain."
      },
      {
        bold: "Google Business Optimisation",
        desc: "Optimised Google Maps profile setup for local search ranking."
      }
    ],
    compactFeatures: [
      { bold: "Everything in Smart Connect" },
      { bold: "Auto SMS & WhatsApp Automation" },
      { bold: "Custom Landing Page & Domain" },
      { bold: "Google Business Optimisation" }
    ]
  }
];

export interface CompareRow {
  feature: string;
  /** true = ✓, false = — for each plan [quick, smart, power] */
  plans: [boolean, boolean, boolean];
  /** Optional: override cell with a string (e.g. price) */
  label?: [string, string, string];
}

export const compareRows: CompareRow[] = [
  { feature: "Digital Business Card",      plans: [true,  true,  true]  },
  { feature: "Auto SMS on Missed Call",    plans: [true,  true,  true]  },
  { feature: "Auto WhatsApp on Missed Call", plans: [false, true, true] },
  { feature: "Custom Landing Page",        plans: [false, true,  true]  },
  { feature: "Custom Domain",              plans: [false, false, true]  },
  { feature: "Festival Social Media Posts",plans: [false, true,  true]  },
  { feature: "Google Business Setup",      plans: [false, false, true]  },
  {
    feature: "Price / Year",
    plans:   [false, false, false],
    label:   ["₹1,999", "₹5,999", "₹9,999"],
  },
];
