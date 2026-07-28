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

export default function JewelleryView({ data, businessName }: BusinessViewProps) {
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

  const collections = productsList.slice(0, 4);

  return (
    <div
      className="jewellery-luxury-wrapper"
      style={{
        "--business-primary": accentColor.primary || "#b45309",
        "--business-primary-rgb": accentColor.primaryRgb || "180, 83, 9",
      } as React.CSSProperties}
    >
      <header className="jewellery-header">
        <div className="jewellery-branding">
          <BusinessLogo logoUrl={data.logo_url} businessName={data.business_name} />
          <div>
            <p className="jewellery-label">Heritage & Luxury</p>
            <h1>{decodedBusinessName}</h1>
          </div>
        </div>
        <div className="jewellery-header-actions">
          <AppButton
            onClick={() => setTheme(theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)}
            className="jewellery-theme-toggle"
          >
            {mounted && theme === ThemeMode.Light ? "Dark" : "Light"}
          </AppButton>
          <AppButton onClick={handleCopyLink} className="jewellery-share-btn">
            {copied ? "Copied" : "Share"}
          </AppButton>
        </div>
      </header>

      <section className="jewellery-hero">
        <div className="jewellery-hero-content">
          <span className="jewellery-eyebrow">The Gold Standard</span>
          <h2>Crafted To Be Passed Down Generations</h2>
          <p>{data.about_us || "Discover our heritage collection of pure gold, pristine diamonds, and exquisite silver ornaments custom crafted by master artisans."}</p>
          <div className="jewellery-hero-actions">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="jewellery-action-btn"
                onClick={() => data.slug && trackUniqueAction(data.slug, action.type)}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="jewellery-gold-rates">
        <div className="rate-card">
          <h4>24K Gold Rate Today</h4>
          <p className="rate-value">₹ 7,450 / gm</p>
          <p className="rate-sub">Refreshed live *</p>
        </div>
        <div className="rate-card">
          <h4>22K Gold Rate Today</h4>
          <p className="rate-value">₹ 6,830 / gm</p>
          <p className="rate-sub">Refreshed live *</p>
        </div>
        <div className="rate-card">
          <h4>Silver Rate Today</h4>
          <p className="rate-value">₹ 92 / gm</p>
          <p className="rate-sub">Refreshed live *</p>
        </div>
      </section>

      <section className="jewellery-collections-section">
        <div className="section-title">
          <span>Our Masterpieces</span>
          <h3>Featured Collections</h3>
        </div>
        <div className="jewellery-collections-grid">
          {collections.length > 0 ? (
            collections.map((item) => (
              <div key={item.id} className="jewellery-item-card">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <span className="jewellery-price">{item.price}</span>
                <div style={{ marginTop: "14px" }}>
                  <Link href={`https://wa.me/${data.mobile_number}?text=I am interested in ${encodeURIComponent(item.name)}`} className="jewellery-enquire-btn">
                    Enquire on WhatsApp
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1/-1", opacity: 0.7 }}>No products or collections uploaded yet.</p>
          )}
        </div>
      </section>

      <footer className="jewellery-footer">
        <div>
          <h4>Get in Touch</h4>
          <p>{data.location_address || "Visit our showroom for custom fittings."}</p>
        </div>
        <div className="jewellery-socials">
          {socialsList.map((social) => (
            <SocialLink key={social.id} href={social.href} type={social.type} icon={null} />
          ))}
        </div>
      </footer>
    </div>
  );
}
