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
  originalPrice?: string;
  monthlyPrice?: string;
  discountBadge?: string;
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
      originalPrice: "₹5,999",
      discountBadge: "41% OFF",
      whatsappMessage: `Hi MarketingSetu! I'd like to get the ${t.plan_quick_name || "Default Digital Card"} plan.`,
      features: [
        {
          bold: t.plan_p1_f1_title || "Digital Business Card",
          desc: t.plan_p1_f1_desc || "Instant automated reply & lead capture on missed calls or inquiries."
        },
        {
          bold: t.plan_p1_f2_title || "Missed Call Auto Text",
          desc: t.plan_p1_f2_desc || "Standard mobile-responsive digital business card template."
        },
        {
          bold: t.plan_p1_f3_title || "Brand & Contact Details",
          desc: t.plan_p1_f3_desc || "Logo, business name, category, phone, email & map location."
        },
        {
          bold: t.plan_p1_f4_title || "Social & Owner Links",
          desc: t.plan_p1_f4_desc || "Direct tap-to-connect links for WhatsApp & social profiles."
        }
      ],
      compactFeatures: [
        { bold: t.plan_p1_f1_title || "Digital Business Card" },
        { bold: t.plan_p1_f2_title || "Missed Call Auto Text" },
        { bold: t.plan_p1_f3_title || "Brand & Contact Details" },
        { bold: t.plan_p1_f4_title || "Social & Owner Links" }
      ]
    },
    {
      id: "category-card",
      badge: t.plan_smart_badge || "🚀 Category Special · Business Template",
      featured: true,
      name: t.plan_smart_name || "Category Smart Card",
      description: t.plan_smart_desc || "Industry-tailored template designed for your specific business category.",
      price: t.plan_smart_price || "₹7,999",
      originalPrice: "₹11,999",
      discountBadge: "MOST POPULAR",
      whatsappMessage: `Hi MarketingSetu! I'd like to get the ${t.plan_smart_name || "Category Smart Card"} plan.`,
      features: [
        {
          bold: t.plan_p2_f1_title || "Everything in Starter",
          desc: t.plan_p2_f1_desc || undefined
        },
        {
          bold: t.plan_p2_f2_title || "WhatsApp Broadcast",
          desc: t.plan_p2_f2_desc || "Customized layout for your business (Cafe, Beauty, Solar, Broker, etc.)."
        },
        {
          bold: t.plan_p2_f3_title || "Festival Social Media Posts",
          desc: t.plan_p2_f3_desc || "Display your items, pricing, photos, and direct WhatsApp inquiry."
        },
        {
          bold: t.plan_p2_f4_title || "Photo Gallery & Reviews",
          desc: t.plan_p2_f4_desc || "High-resolution showcase gallery and customer rating testimonials."
        }
      ],
      compactFeatures: [
        { bold: t.plan_p2_f1_title || "Everything in Starter" },
        { bold: t.plan_p2_f2_title || "WhatsApp Broadcast" },
        { bold: t.plan_p2_f3_title || "Festival Social Media Posts" },
        { bold: t.plan_p2_f4_title || "Photo Gallery & Reviews" }
      ]
    },
    {
      id: "custom-website",
      badge: t.plan_power_badge || "👑 Bespoke · Single Page Site",
      name: t.plan_power_name || "Custom 1-Page Website",
      description: t.plan_power_desc || "Fully custom single-page brand website with custom domain setup.",
      price: t.plan_power_price || "₹11,999",
      originalPrice: "₹15,999",
      discountBadge: "25% OFF",
      whatsappMessage: `Hi MarketingSetu! I'd like to get the ${t.plan_power_name || "Custom 1-Page Website"} plan.`,
      features: [
        {
          bold: t.plan_p3_f1_title || "Everything in Growth",
          desc: t.plan_p3_f1_desc || undefined
        },
        {
          bold: t.plan_p3_f2_title || "1 Landing Page",
          desc: t.plan_p3_f2_desc || "Bespoke UI design built exclusively for your business brand."
        },
        {
          bold: t.plan_p3_f3_title || "Custom Landing Page + Domain",
          desc: t.plan_p3_f3_desc || "Connected to your custom .com or .in domain."
        },
        {
          bold: t.plan_p3_f4_title || "Google Maps Setup",
          desc: t.plan_p3_f4_desc || "Local search map optimization and SEO index setup."
        }
      ],
      compactFeatures: [
        { bold: t.plan_p3_f1_title || "Everything in Growth" },
        { bold: t.plan_p3_f2_title || "1 Landing Page" },
        { bold: t.plan_p3_f3_title || "Custom Landing Page + Domain" },
        { bold: t.plan_p3_f4_title || "Google Maps Setup" }
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
    label: ["₹3,499", "₹7,999", "₹11,999"],
  },
];
