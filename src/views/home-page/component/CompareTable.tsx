import React from "react";
import { compareRows, pricingPlans, translations } from "@/views/home-page/data";
import SectionHead from "./SectionHead";
import { useThemeStore } from "@/store/themeStore";

export default function CompareTable() {
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;

  const translateFeature = (feat: string) => {
    if (language === "mr") {
      const mapping: Record<string, string> = {
        "Landing Pages": "लँडिंग पेजेस",
        "WhatsApp Broadcasts": "व्हॉट्सॲप ब्रॉडकास्ट",
        "Missed Call Automation": "मिस्ड कॉल ऑटो एसएमएस",
        "Google Business Setup": "गुगल बिझनेस सेटअप",
        "Custom Domain": "कस्टम डोमेन",
        "Monthly Reports": "मासिक रिपोर्ट्स",
        "Onboarding Call": "ऑनबोर्डिंग कॉल",
        "Support": "सपोर्ट",
      };
      return mapping[feat] || feat;
    } else if (language === "hi") {
      const mapping: Record<string, string> = {
        "Landing Pages": "लैंडिंग पेजेस",
        "WhatsApp Broadcasts": "व्हाट्सएप ब्रॉडकास्ट",
        "Missed Call Automation": "मिस्ड कॉल ऑटो एसएमएस",
        "Google Business Setup": "गूगल बिजनेस सेटअप",
        "Custom Domain": "कस्टम डोमेन",
        "Monthly Reports": "मासिक रिपोर्ट्स",
        "Onboarding Call": "ऑनबोर्डिंग कॉल",
        "Support": "सपोर्ट",
      };
      return mapping[feat] || feat;
    }
    return feat;
  };

  const translateLabel = (lbl: string) => {
    if (language === "mr") {
      if (lbl.includes("month")) return "१ / महिना";
      if (lbl.includes("Unlimited")) return "अमर्यादित";
      if (lbl.includes("WhatsApp")) return "व्हॉट्सॲप";
      if (lbl.includes("Email")) return "ईमेल";
    } else if (language === "hi") {
      if (lbl.includes("month")) return "१ / महीना";
      if (lbl.includes("Unlimited")) return "असीमित";
      if (lbl.includes("WhatsApp")) return "व्हाट्सएप";
      if (lbl.includes("Email")) return "ईमेल";
    }
    return lbl;
  };

  return (
    <section>
      <div className="container">
        <SectionHead eyebrow={t.compare_table_eyebrow} heading={t.compare_table_heading} />
        <div style={{ overflowX: "auto" }}>
          <table className="compare-table">
            <thead>
              <tr>
                <th>{t.compare_table_col_feature}</th>
                {pricingPlans.map((p) => {
                  let planName = p.name;
                  if (language === "mr" || language === "hi") {
                    planName = p.name === "Starter" ? "स्टार्टर" : p.name === "Growth" ? "ग्रोथ" : "प्रो";
                  }
                  return <th key={p.id}>{planName}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, i) => (
                <tr key={i}>
                  <td>{translateFeature(row.feature)}</td>
                  {row.plans.map((included, j) => (
                    <td key={j} className={row.label ? "" : included ? "yes" : "no"}>
                      {row.label
                        ? <b>{translateLabel(row.label[j])}</b>
                        : included ? "✓" : "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
