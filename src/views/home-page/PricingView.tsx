"use client";

import {
  BridgeDivider,
  CompareTable,
  CtaBand,
  FaqSection,
  PageHero,
  PageWrapper,
  PricingCard,
  useWhatsApp,
} from "@/views/home-page/component";
import { pricingPlans, pricingFaqs, translations } from "@/views/home-page/data";
import { useThemeStore } from "@/store/themeStore";

export default function PricingView() {
  const { openWhatsApp } = useWhatsApp();
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;

  const getTranslatedFaqs = () => {
    if (language === "mr") {
      return [
        { question: "काही छुपे शुल्क आहे का?", answer: "नाही. दरवर्षी एकच निश्चित बिल आकारले जाते. सेटअप किंवा ऑनबोर्डिंगसाठी कोणतेही अतिरिक्त पैसे घेतले जात नाहीत." },
        { question: "मी माझा प्लॅन कधीही बदलू शकतो का?", answer: "होय, तुम्ही तुमच्या गरजेनुसार कोणत्याही महिन्याला प्लॅन अपग्रेड किंवा डाउनग्रेड करू शकता. राहिलेली रक्कम ॲडजस्ट केली जाईल." },
        { question: "व्हॉट्सॲपचे अधिकृत नंबर किंवा एपीआय खर्च समाविष्ट आहे का?", answer: "आमच्या प्लॅन्समध्ये प्राथमिक मार्केटिंग मोहीम खर्च समाविष्ट आहे. अत्यंत मोठ्या प्रमाणावर मेसेज असल्यास व्हॉट्सॲपच्या मूळ चार्जेसचे मार्गदर्शन आम्ही करतो." }
      ];
    } else if (language === "hi") {
      return [
        { question: "क्या कोई हिडन चार्ज है?", answer: "बिल्कुल नहीं। हम साल में केवल एक बार निश्चित शुल्क लेते हैं। ऑनबोर्डिंग या सेटअप के लिए कोई अतिरिक्त फीस नहीं ली जाती।" },
        { question: "क्या मैं अपना प्लान कभी भी बदल सकता हूँ?", answer: "हाँ, आप किसी भी समय अपने प्लान को अपग्रेड या डाउनग्रेड कर सकते हैं। बची हुई राशि तदनुसार एडजस्ट की जाएगी।" },
        { question: "क्या इसमें व्हाट्सएप एपीआई की लागत शामिल है?", answer: "हमारे प्लान्स सामान्य उपयोग के लिए पर्याप्त हैं। बहुत बड़े पैमाने पर संदेश भेजने की स्थिति में मामूली व्हाट्सएप चार्जेस की जानकारी आपको पहले ही दी जाएगी।" }
      ];
    }
    return pricingFaqs;
  };

  return (
    <PageWrapper>
      {/* PAGE HERO */}
      <PageHero
        breadcrumbLabel={t.pricing_hero_breadcrumb}
        eyebrow={t.pricing_hero_eyebrow}
        title={t.pricing_hero_title}
        lead={t.pricing_hero_lead}
      />

      {/* PLANS GRID */}
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-3">
            {pricingPlans.map((plan, idx) => {
              const localPlan = { ...plan };
              if (language === "mr") {
                localPlan.name = plan.name === "Starter" ? "स्टार्टर" : plan.name === "Growth" ? "ग्रोथ" : "प्रो";
                localPlan.price = plan.price === "₹4,999" ? "₹४,९९९" : plan.price === "₹9,999" ? "₹९,९९९" : "₹१४,९९९";
                localPlan.description = plan.id === "starter" ? "छोट्या आणि नवीन व्यवसायांसाठी" : plan.id === "growth" ? "वाढणाऱ्या स्थानिक दुकानांसाठी" : "पूर्ण ऑटोमेशन आणि लीड मॅनेजमेंट";
                localPlan.features = plan.features.map(f => ({
                  bold: f.bold === "1 Landing Page" ? "१ लँडिंग पेज" : f.bold === "WhatsApp Broadcasts" ? "व्हॉट्सॲप ब्रॉडकास्ट" : f.bold === "Missed Call Auto Text" ? "मिस्ड कॉल ऑटो एसएमएस" : f.bold === "Google Maps Setup" ? "गुगल मॅप्स सेटअप" : f.bold === "Dedicated Support" ? "वैयक्तिक सपोर्ट" : f.bold,
                  desc: f.desc ? "प्लॅनची वैशिष्ट्ये समाविष्ट आहेत" : undefined
                }));
              } else if (language === "hi") {
                localPlan.name = plan.name === "Starter" ? "स्टार्टर" : plan.name === "Growth" ? "ग्रोथ" : "प्रो";
                localPlan.price = plan.price === "₹4,999" ? "₹४,९९९" : plan.price === "₹9,999" ? "₹९,९९९" : "₹१४,९९९";
                localPlan.description = plan.id === "starter" ? "छोटे और नए व्यवसायों के लिए" : plan.id === "growth" ? "बढ़ते हुए स्थानीय आउटलेट्स के लिए" : "कम्पलीट ऑटोमेशन और लीड मैनेजमेंट";
                localPlan.features = plan.features.map(f => ({
                  bold: f.bold === "1 Landing Page" ? "१ लैंडिंग पेज" : f.bold === "WhatsApp Broadcasts" ? "व्हाट्सएप ब्रॉडकास्ट" : f.bold === "Missed Call Auto Text" ? "मिस्ड कॉल ऑटो एसएमएस" : f.bold === "Google Maps Setup" ? "गूगल मैप्स सेटअप" : f.bold === "Dedicated Support" ? "समर्पित सपोर्ट" : f.bold,
                  desc: f.desc ? "प्लान की सभी सुविधाएं उपलब्ध हैं" : undefined
                }));
              }
              return (
                <PricingCard
                  key={idx}
                  plan={localPlan}
                  onSelect={(msg) => openWhatsApp(msg)}
                />
              );
            })}
          </div>
          <p className="center-text" style={{ marginTop: "28px", fontSize: "14.5px" }}>
            📌 {t.pricing_help_note}{" "}
            <button
              onClick={() => openWhatsApp("Hi MarketingSetu! I'm not sure which plan is right for my business — can you help?")}
              className="bg-transparent border-none p-0 cursor-pointer text-brand-blue font-bold hover:underline"
            >
              {t.pricing_help_btn}
            </button>{" "}
            — {language === "mr" ? "आम्ही मदत करू." : language === "hi" ? "हम मदद करेंगे।" : "we'll help you choose."}
          </p>
        </div>
      </section>

      <BridgeDivider />

      {/* COMPARE TABLE */}
      <CompareTable />

      {/* PRICING FAQ */}
      <FaqSection
        eyebrow={t.pricing_faq_eyebrow}
        heading={t.pricing_faq_heading}
        backgroundColor="var(--blue-mist)"
        items={getTranslatedFaqs()}
      />

      {/* CTA BAND */}
      <CtaBand
        heading={t.pricing_cta_heading}
        description={t.pricing_cta_description}
        whatsappMessage={t.btn_free_consultation}
      />
    </PageWrapper>
  );
}
