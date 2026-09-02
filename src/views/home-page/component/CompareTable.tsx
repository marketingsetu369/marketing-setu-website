import React from "react";
import { compareRows, pricingPlans, translations } from "@/views/home-page/data";
import SectionHead from "./SectionHead";
import { useThemeStore } from "@/store/themeStore";
import { TranslationDictionary } from "@/translation";

export default function CompareTable() {
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;

  const translateFeature = (feat: string) => {
    const mapping: Record<string, keyof TranslationDictionary> = {
      "Automated Customer Messaging": "comp_feat_auto_messaging",
      "Default Digital Card Template": "comp_feat_default_template",
      "Category Special Generated Template": "comp_feat_category_template",
      "Products & Services Catalog": "comp_feat_catalog",
      "Photo Gallery & Reviews": "comp_feat_gallery_reviews",
      "Full Custom Single Page Website": "comp_feat_custom_website",
      "Custom Domain & Hosting Setup": "comp_feat_domain_hosting",
      "Google Business & SEO Setup": "comp_feat_google_seo",
      "Price / Year": "comp_feat_price_year",
      "Digital Business Card": "plan_feat_digital_card",
      "Auto SMS on Missed Call": "plan_feat_auto_sms",
      "Auto WhatsApp on Missed Call": "plan_feat_auto_wa",
      "Custom Landing Page": "plan_feat_landing_page",
      "Custom Domain": "comp_feat_domain",
      "Festival Social Media Posts": "plan_feat_festivals",
      "Google Business Setup": "comp_feat_gb",
      "Landing Pages": "comp_feat_lp",
      "WhatsApp Broadcasts": "comp_feat_wa",
      "Missed Call Automation": "comp_feat_mc",
      "Monthly Reports": "comp_feat_reports",
      "Onboarding Call": "comp_feat_call",
      "Support": "comp_feat_support",
    };
    const key = mapping[feat];
    return key ? (t[key] as string) : feat;
  };

  const translateLabel = (lbl: string) => {
    if (lbl.includes("month")) return t.comp_val_month;
    if (lbl.includes("Unlimited")) return t.comp_val_unlimited;
    return lbl;
  };

  return (
    <section className="py-24 bg-white dark:bg-brand-dark/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={t.compare_table_eyebrow} heading={t.compare_table_heading} />
        <div className="mt-12 overflow-x-auto rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <table className="w-full border-collapse text-left bg-white dark:bg-brand-dark/40 backdrop-blur-md">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-brand-dark/60">
                <th className="p-6 text-sm font-bold tracking-wider text-brand-dark dark:text-white uppercase">
                  {t.compare_table_col_feature}
                </th>
                {pricingPlans.map((p) => {
                  const nameKey = p.id === "quick-connect"
                    ? "plan_quick_name"
                    : p.id === "smart-connect"
                      ? "plan_smart_name"
                      : "plan_power_name";
                  const planName = t[nameKey];
                  return (
                    <th key={p.id} className="p-6 text-sm font-bold tracking-wider text-brand-dark dark:text-white uppercase text-center">
                      {planName}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {compareRows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-brand-dark/30 transition-colors">
                  <td className="p-6 text-sm font-semibold text-brand-dark dark:text-gray-200">
                    {translateFeature(row.feature)}
                  </td>
                  {row.plans.map((included, j) => {
                    const hasLabel = row.label !== undefined;
                    const value = hasLabel 
                      ? translateLabel(row.label![j]) 
                      : included ? "✓" : "—";
                    return (
                      <td 
                        key={j} 
                        className={`p-6 text-sm text-center font-medium ${
                          hasLabel 
                            ? "text-brand-dark dark:text-white font-semibold" 
                            : included 
                              ? "text-green-500 font-bold" 
                              : "text-gray-300 dark:text-gray-700"
                        }`}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
