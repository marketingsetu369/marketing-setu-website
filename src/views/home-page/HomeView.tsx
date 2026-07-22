"use client";

import { useThemeStore } from "@/store/themeStore";
import {
  BridgeDivider,
  CtaBand,
  FeatureGrid,
  PageWrapper,
  PricingCard,
  SectionHead,
  StatBar,
  StepsSection,
  TestimonialCard,
  useWhatsApp,
} from "@/views/home-page/component";
import {
  homeSteps,
  pricingPlans,
  servicesData,
  testimonialsData,
  translations,
  whyUsFeatures,
} from "@/views/home-page/data";
import { BridgeScene } from "@/views/home-page/svg";
import Image from "next/image";
import Link from "next/link";
import { AppButton } from "@/components/library";

export default function HomeView() {
  const { openWhatsApp } = useWhatsApp();
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;

  // Resolved dynamic services list from translations keys
  const getTranslatedServices = () => {
    return servicesData.map((s) => {
      if (s.id === "whatsapp-marketing") {
        return { ...s, title: t.service_wa_title, lead: t.service_wa_lead };
      }
      if (s.id === "landing-pages") {
        return { ...s, title: t.service_lp_title, lead: t.service_lp_lead };
      }
      if (s.id === "missed-call") {
        return { ...s, title: t.service_mc_title, lead: t.service_mc_lead };
      }
      if (s.id === "google-business") {
        return { ...s, title: t.service_gb_title, lead: t.service_gb_lead };
      }
      return s;
    });
  };

  const getTranslatedPlans = () => {
    return pricingPlans.map((plan) => {
      if (plan.id === "starter") {
        return {
          ...plan,
          name: t.plan_starter_name,
          price: t.plan_starter_price,
          description: t.plan_starter_desc,
        };
      }
      if (plan.id === "growth") {
        return {
          ...plan,
          name: t.plan_growth_name,
          price: t.plan_growth_price,
          description: t.plan_growth_desc,
        };
      }
      if (plan.id === "pro") {
        return {
          ...plan,
          name: t.plan_pro_name,
          price: t.plan_pro_price,
          description: t.plan_pro_desc,
        };
      }
      return plan;
    });
  };

  const getTranslatedWhyFeatures = () => {
    return whyUsFeatures.map((f, i) => {
      const keys = [
        { title: t.why_us_f1_title, desc: t.why_us_f1_desc },
        { title: t.why_us_f2_title, desc: t.why_us_f2_desc },
        { title: t.why_us_f3_title, desc: t.why_us_f3_desc },
        { title: t.why_us_f4_title, desc: t.why_us_f4_desc },
      ];
      return { ...f, title: keys[i].title, description: keys[i].desc };
    });
  };

  const getTranslatedHomeSteps = () => {
    return homeSteps.map((s, i) => {
      const keys = [
        { title: t.how_s1_title, desc: t.how_s1_desc },
        { title: t.how_s2_title, desc: t.how_s2_desc },
        { title: t.how_s3_title, desc: t.how_s3_desc },
      ];
      return { ...s, title: keys[i].title, description: keys[i].desc };
    });
  };

  const getTranslatedTestimonials = () => {
    return testimonialsData.map((item, idx) => {
      const keys = [
        { text: t.testi_1_text, role: t.testi_1_role },
        { text: t.testi_2_text, role: t.testi_2_role },
        { text: t.testi_3_text, role: t.testi_3_role },
        { text: t.testi_4_text, role: t.testi_4_role },
        { text: t.testi_5_text, role: t.testi_5_role },
        { text: t.testi_6_text, role: t.testi_6_role },
      ];
      return { ...item, text: keys[idx].text, role: keys[idx].role };
    });
  };

  const translatedServices = getTranslatedServices();

  return (
    <PageWrapper>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="reveal">
            <span className="eyebrow">{t.home_hero_eyebrow}</span>
            <h1>
              {t.home_hero_title_1}
              <span className="gradient-text">{t.home_hero_title_gradient}</span>
            </h1>
            <p className="lead">{t.home_hero_lead}</p>
            <div className="hero-cta">
              <AppButton onClick={() => openWhatsApp()} variant="whatsapp">
                {t.btn_whatsapp_chat}
              </AppButton>
              <Link className="btn btn-ghost" href="/services">
                {t.nav_explore_services}
              </Link>
            </div>
            <StatBar
              stats={[
                { value: "500+", label: t.home_hero_stat_1 },
                { value: "98%",  label: t.home_hero_stat_2 },
                { value: "3x",   label: t.home_hero_stat_3 },
                { value: "24/7", label: t.home_hero_stat_4 },
              ]}
            />
          </div>
          <div className="hero-art reveal">
            <div className="hero-art-card">
              <BridgeScene />
            </div>
            <div className="floating-chip chip-top">
              <span className="dot"></span> {t.home_hero_stat_3}
            </div>
            <div className="floating-chip chip-bottom">
              💬 {t.home_hero_stat_4}
            </div>
          </div>
        </div>
      </section>

      <BridgeDivider />

      {/* ─── SERVICES BENTO ───────────────────────────────── */}
      <section id="services">
        <div className="container">
          <SectionHead
            eyebrow={t.home_services_eyebrow}
            heading={t.home_services_heading}
            subtext={t.home_services_subtext}
          />
          <div className="bento">
            {translatedServices.slice(0, 2).map((s) => (
              <div key={s.id} className="card feature reveal">
                <div style={{ position: "relative", width: "100%", height: "140px", borderRadius: "12px", overflow: "hidden", marginBottom: "18px" }}>
                  <Image
                    src={s.imageUrl}
                    alt={s.imageAlt || s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                {s.badge && (
                  <span className="badge">
                    {s.badge === "Most Popular" ? t.service_badge_popular : s.badge}
                  </span>
                )}
                <h3>{s.title}</h3>
                <p>{s.lead}</p>
              </div>
            ))}
            {translatedServices.slice(2).map((s) => (
              <div key={s.id} className="card reveal">
                <div className="icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.lead}</p>
              </div>
            ))}
          </div>
          <div className="center-text mt-lg">
            <Link className="btn btn-primary" href="/services">
              {t.btn_see_all_services}
            </Link>
          </div>
        </div>
      </section>

      <BridgeDivider tinted />

      {/* ─── PRICING PLANS ────────────────────────────────── */}
      <section style={{ background: "var(--green-tint)" }}>
        <div className="container">
          <SectionHead
            eyebrow={t.home_pricing_eyebrow}
            heading={t.home_pricing_heading}
            subtext={t.home_pricing_subtext}
          />
          <div className="grid grid-3">
            {getTranslatedPlans().map((plan, idx) => (
              <PricingCard key={idx} plan={plan} href="/pricing" isCompact />
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ────────────────────────────────── */}
      <section>
        <div className="container">
          <SectionHead eyebrow={t.home_why_eyebrow} heading={t.home_why_heading} />
          <FeatureGrid items={getTranslatedWhyFeatures()} columns={2} />
        </div>
      </section>

      <BridgeDivider />

      {/* ─── HOW IT WORKS ─────────────────────────────────── */}
      <StepsSection
        eyebrow={t.home_how_eyebrow}
        heading={t.home_how_heading}
        steps={getTranslatedHomeSteps()}
      />

      {/* ─── TESTIMONIALS ─────────────────────────────────── */}
      <section>
        <div className="container">
          <SectionHead eyebrow={t.home_testimonials_eyebrow} heading={t.home_testimonials_heading} />
          <div className="grid grid-3">
            {getTranslatedTestimonials().map((item, idx) => (
              <TestimonialCard key={idx} testimonial={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <CtaBand
        heading={t.home_cta_heading}
        description={t.home_cta_description}
        whatsappMessage={t.btn_free_consultation}
      />
    </PageWrapper>
  );
}
