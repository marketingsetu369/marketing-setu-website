"use client";

import Image from "next/image";
import {
  BridgeDivider,
  CtaBand,
  FeatureGrid,
  PageHero,
  PageWrapper,
  SectionHead,
  StepsSection,
} from "@/views/home-page/component";
import { aboutValues, aboutSteps, translations } from "@/views/home-page/data";
import { useThemeStore } from "@/store/themeStore";

export default function AboutView() {
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;

  const getTranslatedValues = () => {
    if (language === "mr") {
      return [
        { icon: "🎯", title: "विकासात्मक आणि सोपे", description: "आम्ही तुमच्या विशिष्ट व्यवसायासाठी योग्य असलेलाच सल्ला देतो, फॅन्सी टूल्स नाही." },
        { icon: "🤝", title: "सोप्या भाषेतील सपोर्ट", description: "प्रत्येक ग्राहकाला व्हॉट्सॲपवर त्यांच्या आवडत्या भाषेत थेट सहकार्य मिळते." },
        { icon: "📈", title: "मोजता येणारी वाढ", description: "मिळलेले ग्राहक आणि मेसेजेसचे स्पष्ट मासिक रिपोर्ट — काहीही लपलेले नाही." }
      ];
    } else if (language === "hi") {
      return [
        { icon: "🎯", title: "व्यावहारिक सलाह", description: "हम वही सलाह देते हैं जो आपके व्यवसाय के लिए उपयुक्त हो, न कि कोई मुश्किल टूल्स।" },
        { icon: "🤝", title: "सरल भाषा में सपोर्ट", description: "हर क्लाइंट को व्हाट्सएप पर उनकी सुविधानुसार सरल भाषा में सपोर्ट मिलता है।" },
        { icon: "📈", title: "सच्ची ग्रोथ रिपोर्ट", description: "मंथली लीड्स और मैसेजेस की स्पष्ट रिपोर्ट — कोई दिखावा नहीं।" }
      ];
    }
    return aboutValues;
  };

  const getTranslatedSteps = () => {
    if (language === "mr") {
      return [
        { number: "01", title: "तुमचा व्यवसाय समजून घेणे", description: "तुमचा माल, तुमचे ग्राहक आणि अडथळे जाणून घेण्यासाठी एक लहान व्हॉट्सॲप संवाद." },
        { number: "02", title: "तुमचा सेतू तयार करणे", description: "आम्ही व्हॉट्सॲप ऑटोमेशन, लँडिंग पेज आणि गुगल प्रोफाईल काही दिवसात सेट करतो." },
        { number: "03", title: "मदत आणि वाढ", description: "नियमित सपोर्ट, सणांचे कॅम्पेन आयडिया आणि साधे रिपोर्टिंग जेणेकरून प्रगती कळेल." }
      ];
    } else if (language === "hi") {
      return [
        { number: "01", title: "आपके बिज़नेस को समझना", description: "आपके प्रोडक्ट्स और कस्टमर्स को समझने के लिए एक छोटी व्हाट्सएप कॉल या चैट।" },
        { number: "02", title: "सेतु का निर्माण", description: "हम कुछ ही दिनों में आपके व्हाट्सएप ऑटोमेशन, लैंडिंग पेज और गूगल सेटअप करते हैं।" },
        { number: "03", title: "सपोर्ट और ग्रोथ", description: "लगातार सपोर्ट, ऑफर्स के आइडियाज और सरल रिपोर्ट ताकि आपको पूरा भरोसा रहे।" }
      ];
    }
    return aboutSteps;
  };

  return (
    <PageWrapper>
      {/* PAGE HERO */}
      <PageHero
        breadcrumbLabel={t.about_hero_breadcrumb}
        eyebrow={t.about_hero_eyebrow}
        title={
          language === "mr" ? (
            <>आम्ही पूल — <em style={{ fontStyle: "italic", color: "var(--blue)" }}>सेतू</em> — बांधतो, छोटे व्यवसाय आणि त्यांच्या ग्राहकांमध्ये</>
          ) : language === "hi" ? (
            <>हम सेतु — <em style={{ fontStyle: "italic", color: "var(--blue)" }}>पुल</em> — बनाते हैं, छोटे व्यवसायों और ग्राहकों के बीच</>
          ) : (
            <>We build the bridge — <em style={{ fontStyle: "italic", color: "var(--blue)" }}>setu</em> — between small businesses and the customers looking for them</>
          )
        }
        lead={t.about_hero_lead}
      />

      {/* STORY SECTION */}
      <section>
        <div className="container">
          <div className="grid grid-2 about-visual" style={{ alignItems: "center", gap: "56px" }}>
            <div className="reveal">
              <span className="eyebrow">{t.about_story_eyebrow}</span>
              <h2>{t.about_story_heading}</h2>
              <p>{t.about_story_p1}</p>
              <p>{t.about_story_p2}</p>
            </div>
            <div className="reveal">
              <Image
                src="https://images.unsplash.com/photo-1758873268745-dd2cf0d677b5?auto=format&fit=crop&w=900&q=80"
                alt="MarketingSetu team collaborating on a client's digital marketing strategy"
                width={640}
                height={480}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <BridgeDivider />

      {/* SERVE SECTION */}
      <section style={{ background: "var(--green-tint)" }}>
        <div className="container">
          <div className="grid grid-2 about-visual" style={{ alignItems: "center", gap: "56px" }}>
            <div className="reveal" style={{ order: 2 }}>
              <span className="eyebrow">{t.about_serve_eyebrow}</span>
              <h2>{t.about_serve_heading}</h2>
              <p>{t.about_serve_p1}</p>
              <div className="tag-row">
                <span className="tag">{language === "mr" ? "रिटेल आणि बुटीक" : language === "hi" ? "रिटेल और बुटीक" : "Retail & Boutiques"}</span>
                <span className="tag">{language === "mr" ? "रेस्टॉरंट्स आणि कॅटरिंग" : language === "hi" ? "रेस्टोरेंट और कैटरिंग" : "Restaurants & Catering"}</span>
                <span className="tag">{language === "mr" ? "रिअल इस्टेट" : language === "hi" ? "रियल एस्टेट" : "Real Estate"}</span>
                <span className="tag">{language === "mr" ? "सेवा आणि व्यापारी" : language === "hi" ? "सर्विसेज और ट्रेडर्स" : "Services & Trades"}</span>
              </div>
            </div>
            <div className="reveal" style={{ order: 1 }}>
              <Image
                src="https://images.unsplash.com/photo-1778550579010-cb0d00cd94e6?auto=format&fit=crop&w=900&q=80"
                alt="Small business shopkeeper MarketingSetu serves"
                width={640}
                height={480}
              />
            </div>
          </div>
        </div>
      </section>

      <BridgeDivider tinted />

      {/* MISSION & PROMISE */}
      <section>
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center", gap: "56px" }}>
            <div className="reveal">
              <div className="card" style={{ background: "var(--blue-mist)", borderColor: "var(--blue-light)" }}>
                <h3 style={{ fontSize: "20px" }}>{t.about_mission_title}</h3>
                <p style={{ marginBottom: "20px" }}>{t.about_mission_desc}</p>
                <h3 style={{ fontSize: "20px" }}>{t.about_promise_title}</h3>
                <p style={{ margin: 0 }}>{t.about_promise_desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BridgeDivider />

      {/* VALUES */}
      <section style={{ background: "var(--green-tint)" }}>
        <div className="container">
          <SectionHead eyebrow={t.about_values_eyebrow} heading={t.about_values_heading} />
          <FeatureGrid columns={3} items={getTranslatedValues()} />
        </div>
      </section>

      {/* PROCESS */}
      <StepsSection
        eyebrow={t.about_process_eyebrow}
        heading={t.about_process_heading}
        backgroundColor="transparent"
        steps={getTranslatedSteps()}
      />

      {/* CTA BAND */}
      <CtaBand
        heading={t.about_cta_heading}
        description={t.about_cta_description}
        whatsappMessage={t.btn_free_consultation}
      />
    </PageWrapper>
  );
}
