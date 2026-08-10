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
    id: "default-card",
    badge: "🌿 Essential · Standard Card",
    name: "Default Digital Card",
    description: "Standard digital card template with automated customer messaging.",
    price: "₹3,499",
    whatsappMessage: "Hi MarketingSetu! I'd like to get the Default Digital Card (₹3,499) plan.",
    features: [
      {
        bold: "Automated Customer Messaging",
        desc: "Instant automated reply & lead capture on missed calls or inquiries."
      },
      {
        bold: "Default Smart Digital Card",
        desc: "Standard mobile-responsive digital business card template."
      },
      {
        bold: "Brand & Contact Details",
        desc: "Logo, business name, category, phone, email & map location."
      },
      {
        bold: "Social & Owner Links",
        desc: "Direct tap-to-connect links for WhatsApp & social profiles."
      }
    ],
    compactFeatures: [
      { bold: "Automated Customer Messaging" },
      { bold: "Default Smart Digital Card" },
      { bold: "Brand & Contact Details" },
      { bold: "Social & Owner Links" }
    ]
  },
  {
    id: "category-card",
    badge: "🚀 Category Special · Business Template",
    featured: true,
    name: "Category Smart Card",
    description: "Industry-tailored template designed for your specific business category.",
    price: "₹7,499",
    whatsappMessage: "Hi MarketingSetu! I'd like to get the Category Smart Card (₹7,499) plan.",
    features: [
      { bold: "Everything in Default Digital Card" },
      {
        bold: "Category Special Generated Template",
        desc: "Customized layout for your business (Cafe, Beauty, Solar, Broker, etc.)."
      },
      {
        bold: "Products & Services Showcase",
        desc: "Display your items, pricing, photos, and direct WhatsApp inquiry."
      },
      {
        bold: "Photo Gallery & Reviews",
        desc: "High-resolution showcase gallery and customer rating testimonials."
      }
    ],
    compactFeatures: [
      { bold: "Everything in Default Digital Card" },
      { bold: "Category Special Generated Template" },
      { bold: "Products & Services Showcase" },
      { bold: "Photo Gallery & Reviews" }
    ]
  },
  {
    id: "custom-website",
    badge: "👑 Bespoke · Single Page Site",
    name: "Custom 1-Page Website",
    description: "Fully custom single-page brand website with custom domain setup.",
    price: "₹12,999",
    whatsappMessage: "Hi MarketingSetu! I'd like to get the Custom 1-Page Website (₹12,999) plan.",
    features: [
      { bold: "Everything in Category Smart Card" },
      {
        bold: "Full Custom Single Page Website",
        desc: "Bespoke UI design built exclusively for your business brand."
      },
      {
        bold: "Custom Domain & Hosting Setup",
        desc: "Connected to your custom .com or .in domain."
      },
      {
        bold: "Google Business & SEO Setup",
        desc: "Local search map optimization and SEO index setup."
      }
    ],
    compactFeatures: [
      { bold: "Everything in Category Smart Card" },
      { bold: "Full Custom Single Page Website" },
      { bold: "Custom Domain & Hosting Setup" },
      { bold: "Google Business & SEO Setup" }
    ]
  }
];

export interface CompareRow {
  feature: string;
  /** true = ✓, false = — for each plan [default, category, custom] */
  plans: [boolean, boolean, boolean];
  /** Optional: override cell with a string (e.g. price) */
  label?: [string, string, string];
}

export const compareRows: CompareRow[] = [
  { feature: "Automated Customer Messaging", plans: [true,  true,  true]  },
  { feature: "Default Digital Card Template", plans: [true,  true,  true]  },
  { feature: "Category Special Generated Template", plans: [false, true, true] },
  { feature: "Products & Services Catalog",    plans: [false, true,  true]  },
  { feature: "Photo Gallery & Reviews",       plans: [false, true,  true]  },
  { feature: "Full Custom Single Page Website", plans: [false, false, true]  },
  { feature: "Custom Domain & Hosting Setup",  plans: [false, false, true]  },
  { feature: "Google Business & SEO Setup",    plans: [false, false, true]  },
  {
    feature: "Price / Year",
    plans:   [false, false, false],
    label:   ["₹3,499", "₹7,499", "₹12,999"],
  },
];
