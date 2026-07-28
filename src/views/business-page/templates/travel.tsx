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

export default function TravelView({ data, businessName }: BusinessViewProps) {
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

  const packages = productsList.slice(0, 6);

  return (
    <div
      className="travel-adventure-wrapper"
      style={{
        "--business-primary": accentColor.primary || "#0ea5e9",
        "--business-primary-rgb": accentColor.primaryRgb || "14, 165, 233",
      } as React.CSSProperties}
    >
      <header className="travel-header">
        <div className="travel-branding">
          <BusinessLogo logoUrl={data.logo_url} businessName={data.business_name} />
          <div>
            <p className="travel-tag">Wanderlust & Tours</p>
            <h1>{decodedBusinessName}</h1>
          </div>
        </div>
        <div className="travel-header-actions">
          <AppButton
            onClick={() => setTheme(theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)}
            className="travel-theme-btn"
          >
            {mounted && theme === ThemeMode.Light ? "Dark" : "Light"}
          </AppButton>
          <AppButton onClick={handleCopyLink} className="travel-share-btn">
            {copied ? "Link Copied" : "Share Tour"}
          </AppButton>
        </div>
      </header>

      <section className="travel-hero">
        <div className="travel-hero-copy">
          <span className="travel-badge">Adventure Awaits</span>
          <h2>Explore The World With Handcrafted Itineraries</h2>
          <p>{data.about_us || "We curate the finest travel packages, custom visa assistance, and private guide bookings to make your trips stress-free and unforgettable."}</p>
          <div className="travel-hero-ctas">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="travel-cta-btn"
                onClick={() => data.slug && trackUniqueAction(data.slug, action.type)}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="travel-destinations">
        <div className="section-intro">
          <span>Popular Destinations</span>
          <h3>Trending Tour Packages</h3>
        </div>
        <div className="travel-grid">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <div key={pkg.id} className="travel-package-card">
                <h4>{pkg.name}</h4>
                <p>{pkg.description}</p>
                <div className="pkg-footer">
                  <span className="pkg-price">{pkg.price}</span>
                  <Link href={`https://wa.me/${data.mobile_number}?text=I want to book the tour: ${encodeURIComponent(pkg.name)}`} className="travel-book-now">
                    Book Now
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1/-1", opacity: 0.7 }}>No tour packages uploaded yet.</p>
          )}
        </div>
      </section>

      <section className="travel-services-strip">
        <div className="service-tile">
          <h3>Domestic Tours</h3>
          <p>Explore beautiful retreats in India.</p>
        </div>
        <div className="service-tile">
          <h3>International Tours</h3>
          <p>Custom packages worldwide.</p>
        </div>
        <div className="service-tile">
          <h3>Honeymoon Specials</h3>
          <p>Romantic getaways designed for two.</p>
        </div>
        <div className="service-tile">
          <h3>Visa Services</h3>
          <p>Seamless document processing assistance.</p>
        </div>
      </section>

      <footer className="travel-footer">
        <div>
          <h4>Let's Plan Your Trip</h4>
          <p>{data.location_address || "Visit our office or call to plan custom tours."}</p>
        </div>
        <div className="travel-socials">
          {socialsList.map((social) => (
            <SocialLink key={social.id} href={social.href} type={social.type} icon={null} />
          ))}
        </div>
      </footer>
    </div>
  );
}
