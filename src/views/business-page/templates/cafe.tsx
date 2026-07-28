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

export default function CafeView({ data, businessName }: BusinessViewProps) {
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
      className="cafe-chalkboard-wrapper"
      style={{
        "--business-primary": accentColor.primary || "#7c4a2f",
        "--business-primary-rgb": accentColor.primaryRgb || "124, 74, 47",
      } as React.CSSProperties}
    >
      <header className="cafe-topbar">
        <div className="cafe-logo-area">
          <BusinessLogo logoUrl={data.logo_url} businessName={data.business_name} />
          <div>
            <p className="cafe-subtitle">Coffee & Pastry House</p>
            <h1>{decodedBusinessName}</h1>
          </div>
        </div>
        <div className="cafe-action-set">
          <AppButton
            onClick={() => setTheme(theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)}
            className="cafe-theme-btn"
          >
            {mounted && theme === ThemeMode.Light ? "Cozy" : "Bright"}
          </AppButton>
          <Link href="#menu" className="cafe-cta-link">
            View Menu
          </Link>
        </div>
      </header>

      <section className="cafe-hero">
        <div className="cafe-hero-copy">
          <span className="cafe-tag">Warm. Fresh. Inviting.</span>
          <h2>{data.about_us || "A neighbourhood café that feels like home."}</h2>
          <p>
            Fresh brew, handcrafted bites, and a chalkboard menu that changes with the season.
          </p>
          <div className="cafe-hero-buttons">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="cafe-button"
                target={action.type !== TrackAction.Call ? "_blank" : undefined}
                rel={action.type !== TrackAction.Call ? "noopener noreferrer" : undefined}
                onClick={() => data.slug && trackUniqueAction(data.slug, action.type)}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="cafe-hero-board">
          <div className="cafe-board-head">Today's Specials</div>
          <ul className="cafe-specials-list">
            <li>Roast House Latte with Cardamom</li>
            <li>Rose Pistachio Croissant</li>
            <li>Sourdough Sandwich with Herb Butter</li>
          </ul>
        </div>
      </section>

      <section id="menu" className="cafe-menu-section">
        <h3>House Menu</h3>
        <div className="cafe-menu-grid">
          {productsList.length > 0 ? (
            productsList.slice(0, 4).map((product) => (
              <div key={product.id} className="cafe-menu-card">
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <span>{product.price}</span>
              </div>
            ))
          ) : (
            <p>Menu details will be added shortly.</p>
          )}
        </div>
      </section>

      <section className="cafe-bakery-preview">
        <div>
          <h4>From the Bakery</h4>
          <p>Fresh croissants, layered cakes, and melt-in-your-mouth cookies prepared daily.</p>
        </div>
        <div className="cafe-bakery-grid">
          <div className="cafe-bakery-card">Espresso Brownie</div>
          <div className="cafe-bakery-card">Honey Almond Scone</div>
          <div className="cafe-bakery-card">Cinnamon Latte</div>
        </div>
      </section>

      <footer className="cafe-footer">
        <div>
          <p>Share your café visit:</p>
          <div className="cafe-social-links">
            {socialsList.map((social) => (
              <SocialLink key={social.id} href={social.href} type={social.type} icon={null} />
            ))}
          </div>
        </div>
        <div className="cafe-copy-link">
          <AppButton onClick={handleCopyLink} className="cafe-copy-btn">
            {copied ? "Copied" : "Copy Link"}
          </AppButton>
        </div>
      </footer>
    </div>
  );
}
