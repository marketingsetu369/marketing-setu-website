"use client";

import React from "react";
import { useThemeStore } from "@/store/themeStore";
import {
  BridgeDivider,
  FaqSection,
  PageHero,
  PageWrapper,
  ContactForm,
  useWhatsApp,
} from "@/views/home-page/component";
import { contactFaqs, translations, contactInfo } from "@/views/home-page/data";
import { AppButton } from "@/components/library";

export default function ContactView() {
  const { language } = useThemeStore();
  const { openWhatsApp } = useWhatsApp();
  const t = translations[language] || translations.en;

  const getTranslatedFaqs = () => {
    if (language === "mr") {
      return [
        { question: "साइन अप केल्यानंतर सेटअप व्हायला किती वेळ लागतो?", answer: "मोठ्या प्रमाणावर ५ ते ७ दिवसांत तुमचे लँडिंग पेज आणि व्हॉट्सॲप सेटअप तयार होते." },
        { question: "मला तांत्रिक कामांची माहिती असणे आवश्यक आहे का?", answer: "बिलकुल नाही. आमची टीम सर्व सेटअप, डिझाइन आणि तांत्रिक बाजू स्वतः हाताळते." },
        { question: "मी माझा चालू असलेला मोबाईल नंबर वापरू शकतो का?", answer: "होय, तुम्ही तुमच्या चालू असलेल्या बिझनेस नंबरवर देखील ही सेवा सुरू करू शकता." }
      ];
    } else if (language === "hi") {
      return [
        { question: "साइन अप के बाद काम शुरू होने में कितना समय लगता है?", answer: "आम तौर पर ५ से ७ कार्यदिवसों में आपका लैंडिंग पेज और व्हाट्सएप सिस्टम तैयार हो जाता है।" },
        { question: "क्या मुझे टेक्निकल नॉलेज होना जरूरी है?", answer: "बिल्कुल नहीं। हमारी सपोर्ट टीम पूरा सेटअप, डिज़ाइन और टेक्निकल काम खुद संभालती है।" },
        { question: "क्या मैं अपना मौजूदा मोबाइल नंबर इस्तेमाल कर सकता हूँ?", answer: "हाँ, आप अपने वर्तमान बिजनेस नंबर पर भी व्हाट्सएप ऑटोमेशन एक्टिवेट कर सकते हैं।" }
      ];
    }
    return contactFaqs;
  };

  return (
    <PageWrapper>
      {/* PAGE HERO */}
      <PageHero
        breadcrumbLabel={t.contact_hero_breadcrumb}
        eyebrow={t.contact_hero_eyebrow}
        title={t.contact_hero_title}
        lead={t.contact_hero_lead}
      />

      {/* CONTACT CONTENT */}
      <section style={{ paddingTop: 0 }}>
        <div className="container contact-grid">
          <div className="reveal">
            <h2 style={{ fontSize: "24px" }}>{t.contact_info_title}</h2>
            <p>{t.contact_info_subtitle}</p>
            
            <div className="contact-info-row">
              <div className="icon" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--green-tint)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center" }}>💬</div>
              <div>
                <b>WhatsApp</b><br />
                <button onClick={() => openWhatsApp()} className="bg-transparent border-none p-0 cursor-pointer text-brand-blue font-bold hover:underline">{contactInfo.phone}</button>
              </div>
            </div>

            <div className="contact-info-row">
              <div className="icon" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--green-tint)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center" }}>📧</div>
              <div>
                <b>{language === "mr" ? "ईमेल" : language === "hi" ? "ईमेल" : "Email"}</b><br />
                <a href={`mailto:${contactInfo.email}`} style={{ color: "var(--blue)" }}>{contactInfo.email}</a>
              </div>
            </div>

            <div className="contact-info-row">
              <div className="icon" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--green-tint)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center" }}>📍</div>
              <div>
                <b>{language === "mr" ? "पत्ता" : language === "hi" ? "पता" : "Location"}</b><br />
                {contactInfo.location}
              </div>
            </div>

            <div className="contact-info-row">
              <div className="icon" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--green-tint)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center" }}>🕐</div>
              <div>
                <b>{language === "mr" ? "वेळ" : language === "hi" ? "समय" : "Hours"}</b><br />
                {language === "mr" ? "सोम – शनि, सकाळी ९ ते संध्याकाळी ७" : language === "hi" ? "सोम – शनि, सुबह ९ से शाम ७ बजे" : contactInfo.hours}
              </div>
            </div>

            <AppButton onClick={() => openWhatsApp()} variant="whatsapp" style={{ marginTop: "28px" }}>
              {language === "mr" ? "💬 त्वरित संपर्क करा" : language === "hi" ? "💬 तुरंत व्हाट्सएप करें" : "💬 WhatsApp Us Now"}
            </AppButton>
          </div>

          {/* Renders the unified contact form component */}
          <ContactForm />
        </div>
      </section>

      <BridgeDivider tinted />

      {/* QUICK ANSWERS */}
      <FaqSection
        eyebrow={language === "mr" ? "महत्त्वाची उत्तरे" : language === "hi" ? "त्वरित समाधान" : "Quick Answers"}
        heading={language === "mr" ? "संपर्क साधण्यापूर्वी" : language === "hi" ? "संपर्क करने से पहले" : "Before you reach out"}
        backgroundColor="var(--green-tint)"
        items={getTranslatedFaqs()}
      />
    </PageWrapper>
  );
}
