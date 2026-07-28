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

export default function RestaurantView({ data, businessName }: BusinessViewProps) {
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

  return (
    <div
      className="restaurant-bold-wrapper"
      style={{
        "--business-primary": accentColor.primary || "#7f1d1d",
        "--business-primary-rgb": accentColor.primaryRgb || "127, 29, 29",
      } as React.CSSProperties}
    >
      <header className="resto-header">
        <div className="resto-brand">
          <BusinessLogo logoUrl={data.logo_url} businessName={data.business_name} />
          <div>
            <p className="resto-label">Fine Dining Experience</p>
            <h1>{decodedBusinessName}</h1>
          </div>
        </div>
        <AppButton
          onClick={() => setTheme(theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)}
          className="resto-theme-toggle"
        >
          Menu Mode
        </AppButton>
      </header>

      <section className="resto-hero">
        <div className="resto-hero-copy">
          <p className="resto-tag">Bold Flavours, Dramatic Tables</p>
          <h2>{data.about_us || "A culinary story written in vibrant spice and warm amber tones."}</h2>
          <div className="resto-actions">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="resto-hero-btn"
                target={action.type !== TrackAction.Call ? "_blank" : undefined}
                rel={action.type !== TrackAction.Call ? "noopener noreferrer" : undefined}
                onClick={() => data.slug && trackUniqueAction(data.slug, action.type)}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="resto-hero-panel">
          <div className="resto-highlight-card">
            <span>Chef's Choice</span>
            <h3>Signature Tasting Menu</h3>
            <p>Seven courses designed around seasonal produce and curated cocktails.</p>
          </div>
        </div>
      </section>

      <section className="resto-menu-section">
        <h3>Star Dishes</h3>
        <div className="resto-dish-grid">
          {productsList.slice(0, 4).map((product) => (
            <article key={product.id} className="resto-dish-card">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <span>{product.price}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="resto-testimonial-strip">
        <div>
          <h4>Kitchen Notes</h4>
          <p>Reserve your table for a theatrical dinner that feels intimate and indulgent.</p>
        </div>
        <div className="resto-note-box">
          <p>“The plating and spices made every bite feel like a celebration.”</p>
          <strong>— Guest Review</strong>
        </div>
      </section>

      <footer className="resto-footer">
        <div className="resto-footer-links">
          {socialsList.map((social) => (
            <SocialLink key={social.id} href={social.href} type={social.type} icon={null} />
          ))}
        </div>
        <AppButton onClick={handleCopyLink} className="resto-copy">
          {copied ? "Link Copied" : "Share Page"}
        </AppButton>
      </footer>
    </div>
  );
}
