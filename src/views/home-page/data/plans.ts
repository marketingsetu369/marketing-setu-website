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
    description: "Perfect for small businesses just getting started with a digital presence.",
    price: "₹1,999",
    whatsappMessage: "Hi MarketingSetu! I'd like to start with the Quick Connect (₹1,999) plan.",
    features: [
      {
        bold: "Digital Business Card",
        desc: "A smart digital card to share your business info instantly."
      },
      {
        bold: "Auto SMS on Missed Call",
        desc: "Never lose a lead — auto-reply via text when you miss a call."
      }
    ],
    compactFeatures: [
      { bold: "Digital Business Card" },
      { bold: "Auto SMS on Missed Call" }
    ]
  },
  {
    id: "smart-connect",
    badge: "🚀 Growth · Setu Bridge",
    featured: true,
    name: "Smart Connect",
    description: "Ideal for growing businesses ready to build a brand online.",
    price: "₹5,999",
    whatsappMessage: "Hi MarketingSetu! I'd like to start with the Smart Connect (₹5,999) plan.",
    features: [
      { bold: "Digital Business Card" },
      { bold: "Auto SMS on Missed Call" },
      {
        bold: "Auto WhatsApp on Missed Call",
        desc: "Instantly send a WhatsApp message when someone calls you."
      },
      {
        bold: "Custom Landing Page",
        desc: "A stunning page built to attract and convert customers."
      },
      {
        bold: "Festival Social Media Posts",
        desc: "Eye-catching branded posts for every festival."
      }
    ],
    compactFeatures: [
      { bold: "Everything in Starter" },
      { bold: "Auto WhatsApp on Missed Call" },
      { bold: "Custom Landing Page" },
      { bold: "Festival Social Media Posts" }
    ]
  },
  {
    id: "power-connect",
    badge: "👑 Pro · Setu Summit",
    name: "Power Connect",
    description: "For businesses serious about dominating their market online.",
    price: "₹9,999",
    whatsappMessage: "Hi MarketingSetu! I'd like to start with the Power Connect (₹9,999) plan.",
    features: [
      { bold: "Everything in Smart Connect" },
      {
        bold: "Custom Landing Page + Domain",
        desc: "A professional website on your own domain name."
      },
      {
        bold: "Google Business Setup",
        desc: "Get found on Google Maps with an optimised profile."
      }
    ],
    compactFeatures: [
      { bold: "Everything in Growth" },
      { bold: "Landing Page + Custom Domain" },
      { bold: "Google Business Setup" }
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
