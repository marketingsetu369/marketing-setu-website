"use client";

import { useThemeStore } from "@/store/themeStore";
import { useWhatsApp, PageWrapper, PricingCard } from "@/views/home-page/component";
import { translations, pricingPlans } from "@/views/home-page/data";
import Link from "next/link";

export default function HomeView() {
  const { openWhatsApp } = useWhatsApp();
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;

  const getTranslatedPlans = () => {
    return pricingPlans.map((plan) => {
      let badge = plan.badge;
      let name = plan.name;
      let price = plan.price;
      let description = plan.description;

      if (plan.id === "quick-connect") {
        badge = t.plan_quick_badge;
        name = t.plan_quick_name;
        price = t.plan_quick_price;
        description = t.plan_quick_desc;
      } else if (plan.id === "smart-connect") {
        badge = t.plan_smart_badge;
        name = t.plan_smart_name;
        price = t.plan_smart_price;
        description = t.plan_smart_desc;
      } else if (plan.id === "power-connect") {
        badge = t.plan_power_badge;
        name = t.plan_power_name;
        price = t.plan_power_price;
        description = t.plan_power_desc;
      }

      const featureMapping: Record<string, { bold: string; desc?: string }> = {
        "Digital Business Card": { bold: t.plan_feat_digital_card },
        "Auto SMS on Missed Call": { bold: t.plan_feat_auto_sms },
        "Auto WhatsApp on Missed Call": { bold: t.plan_feat_auto_wa },
        "Custom Landing Page": { bold: t.plan_feat_landing_page },
        "Festival Social Media Posts": { bold: t.plan_feat_festivals },
        "Everything in Starter": { bold: t.plan_feat_everything_starter },
        "Everything in Growth": { bold: t.plan_feat_everything_growth },
        "Everything in Smart Connect": { bold: t.plan_feat_everything_growth },
        "Custom Landing Page + Domain": { bold: t.plan_feat_domain },
        "Google Business Setup": { bold: t.plan_feat_google },
      };

      const translateFeatures = (featuresList: typeof plan.features) => {
        return featuresList.map((f) => {
          const mapped = featureMapping[f.bold];
          if (mapped) {
            return {
              bold: mapped.bold,
              desc: f.desc ? t.plan_feat_desc_included : undefined,
            };
          }
          return f;
        });
      };

      return {
        ...plan,
        badge,
        name,
        price,
        description,
        features: translateFeatures(plan.features),
        compactFeatures: plan.compactFeatures ? translateFeatures(plan.compactFeatures) : undefined,
      };
    });
  };

  return (
    <PageWrapper>
      <div className="font-sans text-brand-dark bg-white">
        {/* BEGIN: Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden bg-white">
          {/* Decorative subtle grid background */}
          <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Text Content */}
              <div className="max-w-2xl">
                {/* Eyebrow Badge — matches original HTML */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  {t.home_hero_eyebrow}
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
                  {t.home_hero_title_1}<br />
                  <span className="text-gradient">{t.home_hero_title_gradient}</span>
                </h1>

                {/* Subtext Description */}
                <p className="text-lg text-brand-gray mb-8 max-w-lg leading-relaxed">
                  {t.home_hero_lead}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => openWhatsApp()}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-medium transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    {t.btn_whatsapp_chat}
                  </button>
                  <Link
                    href="/services"
                    className="bg-gray-100 hover:bg-gray-200 text-brand-dark px-8 py-4 rounded-full font-medium transition-colors"
                  >
                    {t.nav_explore_services}
                  </Link>
                </div>
              </div>

              {/* Graphic */}
              <div className="relative lg:ml-auto w-full max-w-lg">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Setu - Your Bridge to Customers</div>
                  </div>
                  <div className="relative h-40 mb-6">
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                      <path d="M20,120 Q200,20 380,120" fill="none" stroke="#e5e7eb" strokeDasharray="8 8" strokeWidth="4" />
                      <path d="M20,120 Q200,20 380,120" fill="none" stroke="url(#gradient)" strokeWidth="4">
                        <animate attributeName="stroke-dasharray" dur="3s" repeatCount="indefinite" values="0,1000;1000,0" />
                      </path>
                      <defs>
                        <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                          <stop offset="0%" stopColor="#7265E3" />
                          <stop offset="100%" stopColor="#20B2AA" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-brand-purple rounded-full border-4 border-white shadow-md flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-brand-teal rounded-full border-4 border-white shadow-md flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium">
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                      {t.home_hero_stat_4}
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-bold text-gray-800">{t.home_hero_stat_3}</span>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-brand-purple/20 to-brand-teal/20 blur-3xl -z-10 rounded-full"></div>
              </div>
            </div>

            {/* Stats Bar — below full grid, matches original HTML */}
            <div className="mt-20 pt-10 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-heading font-bold text-brand-purple mb-2">500+</div>
                <div className="text-sm text-gray-500">{t.home_hero_stat_1}</div>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-brand-purple mb-2">98%</div>
                <div className="text-sm text-gray-500">{t.home_hero_stat_2}</div>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-brand-purple mb-2">3x</div>
                <div className="text-sm text-gray-500">{t.home_hero_stat_3}</div>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-brand-purple mb-2">24/7</div>
                <div className="text-sm text-gray-500">{t.home_hero_stat_4}</div>
              </div>
            </div>
          </div>
        </section>
        {/* END: Hero Section */}
        {/* BEGIN: Services Section */}
        <section className="py-24 bg-brand-grayLight" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purpleLight text-brand-purple text-sm font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple"></span>
                {t.home_services_eyebrow}
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">{t.home_services_heading}</h2>
              <p className="text-brand-gray text-lg">{t.home_services_subtext}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1: WhatsApp Marketing (Featured) */}
              <div className="md:col-span-2 lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 card-hover group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="mb-6 inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full w-max">{t.service_badge_popular}</div>
                    <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm rotate-6">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-4">{t.service_wa_title}</h3>
                    <p className="text-brand-gray mb-6 max-w-lg">{t.service_wa_lead}</p>
                  </div>
                  <div className="mt-auto">
                    <Link className="text-brand-purple font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all" href="/services#whatsapp-marketing">
                      Learn more <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Service 2: Landing Pages */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 card-hover flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">{t.service_lp_title}</h3>
                  <p className="text-brand-gray text-sm mb-6 flex-grow">{t.service_lp_lead}</p>
                </div>
                <Link className="text-brand-purple text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all mt-auto" href="/services#landing-pages">View Details →</Link>
              </div>
              {/* Service 3: Missed Call Auto Text */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 card-hover flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-purple-100 text-brand-purple rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">{t.service_mc_title}</h3>
                  <p className="text-brand-gray text-sm mb-6 flex-grow">{t.service_mc_lead}</p>
                </div>
                <Link className="text-brand-purple text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all mt-auto" href="/services#missed-call">View Details →</Link>
              </div>
              {/* Service 4: Auto WhatsApp Message */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 card-hover flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-teal-100 text-brand-teal rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">Auto WhatsApp Message</h3>
                  <p className="text-brand-gray text-sm mb-6 flex-grow">Set up automated WhatsApp responses for common enquiries, booking confirmations, and follow-ups — so your business feels responsive 24 hours a day.</p>
                </div>
                <Link className="text-brand-purple text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all mt-auto" href="/services">View Details →</Link>
              </div>
              {/* Service 5: Google Business Setup */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 card-hover flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-red-100 text-red-500 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">{t.service_gb_title}</h3>
                  <p className="text-brand-gray text-sm mb-6 flex-grow">{t.service_gb_lead}</p>
                </div>
                <Link className="text-brand-purple text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all mt-auto" href="/services#google-business">View Details →</Link>
              </div>
              {/* Service 6: Social Media Ads */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 card-hover flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">Social Media & Ad Posts</h3>
                  <p className="text-brand-gray text-sm mb-6 flex-grow">Instagram and Facebook marketing with eye-catching graphic posts, festival creatives, and targeted ad campaigns that build real local audience growth.</p>
                </div>
                <Link className="text-brand-purple text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all mt-auto" href="/services">View Details →</Link>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-brand-purple hover:bg-opacity-90 shadow-lg shadow-brand-purple/30 transition-all" href="/services">
                {t.btn_see_all_services}
              </Link>
            </div>
          </div>
        </section>
        {/* END: Services Section */}

        {/* BEGIN: Pricing Section */}
        <section className="py-24 bg-white relative" id="pricing">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlN2U1ZTQiLz48L3N2Zz4=')] opacity-50 z-0"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purpleLight text-brand-purple text-sm font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple"></span>
                {t.home_pricing_eyebrow}
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t.home_pricing_heading}</h2>
              <p className="text-brand-gray text-lg">{t.home_pricing_subtext}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              {getTranslatedPlans().map((plan, idx) => (
                <PricingCard
                  key={idx}
                  plan={plan}
                  href="/pricing"
                />
              ))}
            </div>
          </div>
        </section>
        {/* END: Pricing Section */}

        {/* BEGIN: Why Choose Us */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purpleLight text-brand-purple text-sm font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple"></span>
                WHY MARKETINGSETU
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Results-driven. Reliable.<br />Affordable.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold font-heading mb-2">{t.why_us_f1_title}</h4>
                  <p className="text-gray-600 text-sm">{t.why_us_f1_desc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold font-heading mb-2">{t.why_us_f2_title}</h4>
                  <p className="text-gray-600 text-sm">{t.why_us_f2_desc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold font-heading mb-2">{t.why_us_f3_title}</h4>
                  <p className="text-gray-600 text-sm">{t.why_us_f3_desc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold font-heading mb-2">{t.why_us_f4_title}</h4>
                  <p className="text-gray-600 text-sm">{t.why_us_f4_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END: Why Choose Us */}

        {/* BEGIN: CTA Section / Testimonials */}
        <section className="py-24 bg-brand-grayLight" id="reviews">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purpleLight text-brand-purple text-sm font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple"></span>
                TESTIMONIALS
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t.home_testimonials_heading}</h2>
              <p className="text-brand-gray text-lg">Real stories from small businesses across Maharashtra growing with MarketingSetu.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 card-hover flex flex-col justify-between">
                <div>
                  <div className="flex text-brand-purple mb-4">
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                  </div>
                  <p className="text-gray-700 italic mb-8 flex-grow">
                    "{t.testi_1_text}"
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-brand-purpleLight text-brand-purple rounded-full flex items-center justify-center font-bold">RS</div>
                  <div>
                    <h4 className="font-heading font-bold text-brand-dark">Rahul Sharma</h4>
                    <p className="text-xs text-brand-gray">{t.testi_1_role}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 card-hover flex flex-col justify-between">
                <div>
                  <div className="flex text-brand-purple mb-4">
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                  </div>
                  <p className="text-gray-700 italic mb-8 flex-grow">
                    "{t.testi_2_text}"
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-brand-purpleLight text-brand-purple rounded-full flex items-center justify-center font-bold">PM</div>
                  <div>
                    <h4 className="font-heading font-bold text-brand-dark">Priya Mehta</h4>
                    <p className="text-xs text-brand-gray">{t.testi_2_role}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 card-hover flex flex-col justify-between">
                <div>
                  <div className="flex text-brand-purple mb-4">
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                  </div>
                  <p className="text-gray-700 italic mb-8 flex-grow">
                    "{t.testi_3_text}"
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-brand-purpleLight text-brand-purple rounded-full flex items-center justify-center font-bold">AK</div>
                  <div>
                    <h4 className="font-heading font-bold text-brand-dark">Anil Kulkarni</h4>
                    <p className="text-xs text-brand-gray">{t.testi_3_role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BEGIN: CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-brand-purple to-brand-teal rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-black opacity-10 blur-2xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t.home_cta_heading}</h2>
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{t.home_cta_description}</p>
                <button onClick={() => openWhatsApp()} className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-green-500/30 cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                {t.btn_free_consultation}
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* END: CTA Section */}
      </div>
    </PageWrapper>
  );
}
