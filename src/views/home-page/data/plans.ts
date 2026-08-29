import { TranslationDictionary } from "@/translation";

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

export function getPricingPlans(t: TranslationDictionary): PricingPlan[] {
  return [
    {
      id: "default-card",
      badge: t.plan_quick_badge || "🌿 Essential · Standard Card",
      name: t.plan_quick_name || "Default Digital Card",
      description: t.plan_quick_desc || "Standard digital card template with automated customer messaging.",
      price: t.plan_quick_price || "₹3,499",
      whatsappMessage: `Hi MarketingSetu! I'd like to get the ${t.plan_quick_name || "Default Digital Card"} plan.`,
      features: [
        {
          bold: t.plan_feat_digital_card || "Automated Customer Messaging",
          desc: "Instant automated reply & lead capture on missed calls or inquiries."
        },
        {
          bold: t.plan_feat_auto_sms || "Smart Digital Business Card",
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
        { bold: t.plan_feat_digital_card || "Automated Customer Messaging" },
        { bold: t.plan_feat_auto_sms || "Smart Digital Business Card" },
        { bold: "Brand & Contact Details" },
        { bold: "Social & Owner Links" }
      ]
    },
    {
      id: "category-card",
      badge: t.plan_smart_badge || "🚀 Category Special · Business Template",
      featured: true,
      name: t.plan_smart_name || "Category Smart Card",
      description: t.plan_smart_desc || "Industry-tailored template designed for your specific business category.",
      price: t.plan_smart_price || "₹7,499",
      whatsappMessage: `Hi MarketingSetu! I'd like to get the ${t.plan_smart_name || "Category Smart Card"} plan.`,
      features: [
        { bold: t.plan_feat_everything_starter || "Everything in Smart Digital Business Card" },
        {
          bold: t.plan_feat_auto_wa || "Category Special Generated Template",
          desc: "Customized layout for your business (Cafe, Beauty, Solar, Broker, etc.)."
        },
        {
          bold: t.plan_feat_festivals || "Products & Services Catalog",
          desc: "Display your items, pricing, photos, and direct WhatsApp inquiry."
        },
        {
          bold: "Photo Gallery & Reviews",
          desc: "High-resolution showcase gallery and customer rating testimonials."
        }
      ],
      compactFeatures: [
        { bold: t.plan_feat_everything_starter || "Everything in Smart Digital Business Card" },
        { bold: t.plan_feat_auto_wa || "Category Special Generated Template" },
        { bold: t.plan_feat_festivals || "Products & Services Catalog" },
        { bold: "Photo Gallery & Reviews" }
      ]
    },
    {
      id: "custom-website",
      badge: t.plan_power_badge || "👑 Bespoke · Single Page Site",
      name: t.plan_power_name || "Custom 1-Page Website",
      description: t.plan_power_desc || "Fully custom single-page brand website with custom domain setup.",
      price: t.plan_power_price || "₹12,999",
      whatsappMessage: `Hi MarketingSetu! I'd like to get the ${t.plan_power_name || "Custom 1-Page Website"} plan.`,
      features: [
        { bold: t.plan_feat_everything_growth || "Everything in Category Smart Card" },
        {
          bold: t.plan_feat_landing_page || "Full Custom Single Page Website",
          desc: "Bespoke UI design built exclusively for your business brand."
        },
        {
          bold: t.plan_feat_domain || "Custom Domain & Hosting Setup",
          desc: "Connected to your custom .com or .in domain."
        },
        {
          bold: t.plan_feat_google || "Google Business & SEO Setup",
          desc: "Local search map optimization and SEO index setup."
        }
      ],
      compactFeatures: [
        { bold: t.plan_feat_everything_growth || "Everything in Category Smart Card" },
        { bold: t.plan_feat_landing_page || "Full Custom Single Page Website" },
        { bold: t.plan_feat_domain || "Custom Domain & Hosting Setup" },
        { bold: t.plan_feat_google || "Google Business & SEO Setup" }
      ]
    }
  ];
}

export const pricingPlans: PricingPlan[] = getPricingPlans({} as any);

export interface CompareRow {
  feature: string;
  /** true = ✓, false = — for each plan [default, category, custom] */
  plans: [boolean, boolean, boolean];
  /** Optional: override cell with a string (e.g. price) */
  label?: [string, string, string];
}

export const compareRows: CompareRow[] = [
  { feature: "Automated Customer Messaging", plans: [true, true, true] },
  { feature: "Default Digital Card Template", plans: [true, true, true] },
  { feature: "Category Special Generated Template", plans: [false, true, true] },
  { feature: "Products & Services Catalog", plans: [false, true, true] },
  { feature: "Photo Gallery & Reviews", plans: [false, true, true] },
  { feature: "Full Custom Single Page Website", plans: [false, false, true] },
  { feature: "Custom Domain & Hosting Setup", plans: [false, false, true] },
  { feature: "Google Business & SEO Setup", plans: [false, false, true] },
  {
    feature: "Price / Year",
    plans: [false, false, false],
    label: ["₹3,499", "₹7,499", "₹12,999"],
  },
];
