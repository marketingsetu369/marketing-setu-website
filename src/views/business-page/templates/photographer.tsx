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

export default function PhotographerView({ data, businessName }: BusinessViewProps) {
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

  const packages = productsList.slice(0, 4);

  return (
    <div
      className="photographer-minimal-wrapper"
      style={{
        "--business-primary": accentColor.primary || "#18181b",
        "--business-primary-rgb": accentColor.primaryRgb || "24, 24, 27",
      } as React.CSSProperties}
    >
      <header className="photo-header">
        <div className="photo-branding">
          <BusinessLogo logoUrl={data.logo_url} businessName={data.business_name} />
          <div>
            <p className="photo-subtitle">Visual Storyteller</p>
            <h1>{decodedBusinessName}</h1>
          </div>
        </div>
        <div className="photo-header-actions">
          <AppButton
            onClick={() => setTheme(theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)}
            className="photo-theme-btn"
          >
            {mounted && theme === ThemeMode.Light ? "Noir" : "Blanc"}
          </AppButton>
          <AppButton onClick={handleCopyLink} className="photo-share-btn">
            {copied ? "Copied" : "Share"}
          </AppButton>
        </div>
      </header>

      <section className="photo-hero">
        <div className="photo-hero-content">
          <span className="photo-eyebrow">Portfolio</span>
          <h2>Capturing Moments, Defining Memories</h2>
          <p>{data.about_us || "Specializing in timeless wedding documentary, modern editorial fashion, elegant family portraits, and striking product shoots."}</p>
          <div className="photo-hero-ctas">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="photo-cta-btn"
                onClick={() => data.slug && trackUniqueAction(data.slug, action.type)}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="photo-portfolio-section">
        <div className="section-title">
          <span>Categories</span>
          <h3>Our Practice Fields</h3>
        </div>
        <div className="photo-fields-grid">
          <div className="photo-field-card">
            <h4>Wedding & Engagements</h4>
            <p>Romantic editorial documentary style photography.</p>
          </div>
          <div className="photo-field-card">
            <h4>Events & Ceremonies</h4>
            <p>Corporate milestones, birthday celebrations, and live events.</p>
          </div>
          <div className="photo-field-card">
            <h4>Fashion & Editorial</h4>
            <p>Creative portraits, magazine covers, and conceptual shoots.</p>
          </div>
          <div className="photo-field-card">
            <h4>Commercial & Products</h4>
            <p>High-resolution advertising and lifestyle product photography.</p>
          </div>
        </div>
      </section>

      <section className="photo-packages-section">
        <div className="section-title">
          <span>Pricing Packages</span>
          <h3>Session Pricing</h3>
        </div>
        <div className="photo-packages-grid">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <div key={pkg.id} className="photo-package-card">
                <h4>{pkg.name}</h4>
                <p>{pkg.description}</p>
                <span className="photo-price">{pkg.price}</span>
                <div style={{ marginTop: "16px" }}>
                  <Link href={`https://wa.me/${data.mobile_number}?text=I want to enquire about package: ${encodeURIComponent(pkg.name)}`} className="photo-booking-btn">
                    Enquire Package
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1/-1", opacity: 0.7 }}>No custom packages uploaded yet.</p>
          )}
        </div>
      </section>

      <footer className="photo-footer">
        <div>
          <h4>Get in Touch</h4>
          <p>{data.location_address || "Based in city. Available for global travel."}</p>
        </div>
        <div className="photo-socials">
          {socialsList.map((social) => (
            <SocialLink key={social.id} href={social.href} type={social.type} icon={null} />
          ))}
        </div>
      </footer>
    </div>
  );
}
