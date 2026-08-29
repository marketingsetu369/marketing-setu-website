import { TranslationDictionary } from "@/translation";

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export function getWhyUsFeatures(t: TranslationDictionary): FeatureItem[] {
  return [
    {
      icon: "⚡",
      title: t.why_us_f1_title || "Fast Delivery",
      description: t.why_us_f1_desc || "Quick turnaround on campaigns and design, so your business never misses a beat.",
    },
    {
      icon: "🌟",
      title: t.why_us_f2_title || "Proven Results",
      description: t.why_us_f2_desc || "Our clients see real growth in leads, engagement, and conversions within weeks.",
    },
    {
      icon: "💰",
      title: t.why_us_f3_title || "Affordable Pricing",
      description: t.why_us_f3_desc || "Premium digital marketing that fits small and growing business budgets.",
    },
    {
      icon: "👥",
      title: t.why_us_f4_title || "Dedicated Support",
      description: t.why_us_f4_desc || "A personal account manager who understands your business and your goals.",
    },
  ];
}

export function getAboutValues(t: TranslationDictionary): FeatureItem[] {
  return [
    {
      icon: "🎯",
      title: t.about_val_1_title || "Digital Card — your main product",
      description: t.about_val_1_desc || "A stunning, shareable Digital Business Card with your services, photos, contact details, and a direct WhatsApp enquiry button — live in 15 min.",
    },
    {
      icon: "🤝",
      title: t.about_val_2_title || "WhatsApp Auto Messaging — add-on",
      description: t.about_val_2_desc || "Upgrade with WhatsApp Auto Messaging: instant auto-replies, missed call recovery, and customer follow-ups — so every lead gets a response, even at midnight.",
    },
    {
      icon: "📈",
      title: t.about_val_3_title || "Affordable & no lock-in",
      description: t.about_val_3_desc || "Start with just the Digital Card. Add WhatsApp Messaging when you're ready. Simple yearly pricing, support in your language, no hidden fees.",
    },
  ];
}

export const whyUsFeatures: FeatureItem[] = getWhyUsFeatures({} as any);
export const aboutValues: FeatureItem[] = getAboutValues({} as any);
