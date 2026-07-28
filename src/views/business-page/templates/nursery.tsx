"use client";

import React from "react";
import Link from "next/link";
import "../styles.css";
import { AppButton } from "@/components/library";
import { trackUniqueAction } from "@/utils";
import { TrackAction, ThemeMode } from "@/enums";
import type { BusinessPageData } from "@/types/businessPage";
import {
  useBusinessPageData,
  useThemeMode,
  useCopyLink,
  usePageTracking,
} from "../hooks";
import {
  SocialLink,
  OfflinePage,
  BusinessLogo,
} from "../component";
import { formatBusinessName } from "@/utils";

interface BusinessViewProps {
  data: BusinessPageData | null;
  businessName: string;
}

export default function NurseryView({ data, businessName }: BusinessViewProps) {
  const { theme, setTheme, mounted } = useThemeMode();
  const { copied, handleCopyLink } = useCopyLink(data?.slug);
  usePageTracking(data?.slug);

  const { accentColor, quickActions, productsList, socialsList } =
    useBusinessPageData(data);

  const decodedBusinessName = React.useMemo(
    () => formatBusinessName(businessName, data?.business_name),
    [businessName, data?.business_name]
  );

  if (!data || !data.business_name) {
    return <OfflinePage />;
  }

  const plants = productsList.slice(0, 6);

  return (
    <div
      className="nursery-botanical-wrapper"
      style={{
        "--business-primary": accentColor.primary || "#15803d",
        "--business-primary-rgb": accentColor.primaryRgb || "21, 128, 61",
      } as React.CSSProperties}
    >
      <header className="nursery-header">
        <div className="nursery-branding">
          <BusinessLogo logoUrl={data.logo_url} businessName={data.business_name} />
          <div>
            <p className="nursery-subtitle">Plants & Garden Center</p>
            <h1>{decodedBusinessName}</h1>
          </div>
        </div>
        <div className="nursery-header-actions">
          <AppButton
            onClick={() => setTheme(theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)}
            className="nursery-theme-btn"
          >
            {mounted && theme === ThemeMode.Light ? "Dark" : "Light"}
          </AppButton>
          <AppButton onClick={handleCopyLink} className="nursery-share-btn">
            {copied ? "Copied" : "Share"}
          </AppButton>
        </div>
      </header>

      <section className="nursery-hero">
        <div className="nursery-hero-content">
          <span className="nursery-badge">Grow Green</span>
          <h2>Bring Life & Serenity Into Your Space</h2>
          <p>{data.about_us || "Explore our premium selection of indoor air-purifying plants, exotic outdoor blooms, custom organic fertilizers, designer ceramic pots, and expert landscaping tools."}</p>
          <div className="nursery-hero-ctas">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="nursery-cta-btn"
                onClick={() => data.slug && trackUniqueAction(data.slug, action.type)}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="nursery-plants">
        <div className="section-title">
          <span>Our Collection</span>
          <h3>Popular Plants & Seeds</h3>
        </div>
        <div className="nursery-grid">
          {plants.length > 0 ? (
            plants.map((item) => (
              <div key={item.id} className="nursery-plant-card">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <div className="nursery-card-footer">
                  <span className="nursery-price">{item.price}</span>
                  <Link href={`https://wa.me/${data.mobile_number}?text=I want to buy plant: ${encodeURIComponent(item.name)}`} className="nursery-buy-btn">
                    Buy Plant
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1/-1", opacity: 0.7 }}>No plants listed today.</p>
          )}
        </div>
      </section>

      <section className="nursery-care-tips">
        <div className="care-box">
          <h3>Plant Care Guide</h3>
          <p>Need advice on watering schedules, sunlight requirements, or potting soil mixes? Consult our botanical specialists on WhatsApp.</p>
          <Link href={`https://wa.me/${data.mobile_number}?text=I want plant care tips.`} className="nursery-consult-btn">
            Consult Specialist
          </Link>
        </div>
      </section>

      <footer className="nursery-footer">
        <div>
          <h4>Visit Our Green Center</h4>
          <p>{data.location_address || "Visit our nursery showroom for fresh pickings."}</p>
        </div>
        <div className="nursery-socials">
          {socialsList.map((social) => (
            <SocialLink key={social.id} href={social.href} type={social.type} icon={null} />
          ))}
        </div>
      </footer>
    </div>
  );
}
