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

export default function RealEstateView({ data, businessName }: BusinessViewProps) {
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
      className="realestate-premium-wrapper"
      style={{
        "--business-primary": accentColor.primary || "#1f2937",
        "--business-primary-rgb": accentColor.primaryRgb || "31, 41, 55",
      } as React.CSSProperties}
    >
      <header className="re-header">
        <div className="re-branding">
          <BusinessLogo logoUrl={data.logo_url} businessName={data.business_name} />
          <div>
            <p className="re-label">Premium Real Estate</p>
            <h1>{decodedBusinessName}</h1>
          </div>
        </div>
        <AppButton
          onClick={() => setTheme(theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)}
          className="re-theme-switch"
        >
          Market View
        </AppButton>
      </header>

      <section className="re-hero">
        <div className="re-hero-copy">
          <span>Luxury Property Advisory</span>
          <h2>{data.about_us || "Curated residences and commercial spaces for discerning investors."}</h2>
          <div className="re-hero-links">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="re-hero-link"
                target={action.type !== TrackAction.Call ? "_blank" : undefined}
                rel={action.type !== TrackAction.Call ? "noopener noreferrer" : undefined}
                onClick={() => data.slug && trackUniqueAction(data.slug, action.type)}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="re-keycards">
          <div>
            <strong>160+</strong>
            <span>Properties Managed</span>
          </div>
          <div>
            <strong>220K sq ft</strong>
            <span>Prime Listings</span>
          </div>
        </div>
      </section>

      <section className="re-listings" id="properties">
        <div className="re-section-head">
          <h3>Featured Properties</h3>
          <p>Browse the latest premium homes and investment opportunities.</p>
        </div>
        <div className="re-listings-grid">
          {productsList.slice(0, 4).map((property) => (
            <article key={property.id} className="re-property-card">
              <div className="re-property-meta">
                <span>{property.price}</span>
                <p>{property.name}</p>
              </div>
              <p>{property.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="re-footer">
        <div className="re-contact-panel">
          <h4>Contact our team</h4>
          <p>Reach out for walkthroughs, valuation advice, and premium listings.</p>
        </div>
        <div className="re-social-group">
          {socialsList.map((social) => (
            <SocialLink key={social.id} href={social.href} type={social.type} icon={null} />
          ))}
          <AppButton onClick={handleCopyLink} className="re-share-btn">
            {copied ? "Copied" : "Share Page"}
          </AppButton>
        </div>
      </footer>
    </div>
  );
}
