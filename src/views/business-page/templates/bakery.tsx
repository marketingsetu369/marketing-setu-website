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

export default function BakeryView({ data, businessName }: BusinessViewProps) {
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

  const items = productsList.slice(0, 6);

  return (
    <div
      className="bakery-cozy-wrapper"
      style={{
        "--business-primary": accentColor.primary || "#d97706",
        "--business-primary-rgb": accentColor.primaryRgb || "217, 119, 6",
      } as React.CSSProperties}
    >
      <header className="bakery-header">
        <div className="bakery-branding">
          <BusinessLogo logoUrl={data.logo_url} businessName={data.business_name} />
          <div>
            <p className="bakery-subtitle">Freshly Baked Daily</p>
            <h1>{decodedBusinessName}</h1>
          </div>
        </div>
        <div className="bakery-header-actions">
          <AppButton
            onClick={() => setTheme(theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)}
            className="bakery-theme-btn"
          >
            {mounted && theme === ThemeMode.Light ? "Dark" : "Light"}
          </AppButton>
          <AppButton onClick={handleCopyLink} className="bakery-share-btn">
            {copied ? "Copied" : "Share"}
          </AppButton>
        </div>
      </header>

      <section className="bakery-hero">
        <div className="bakery-hero-content">
          <span className="bakery-badge">Oven Fresh</span>
          <h2>Baked With Love & Finest Ingredients</h2>
          <p>{data.about_us || "We craft artisanal sourdough breads, custom celebration cakes, delicious flaky croissants, and rich dessert pastries every single morning."}</p>
          <div className="bakery-hero-ctas">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="bakery-cta-btn"
                onClick={() => data.slug && trackUniqueAction(data.slug, action.type)}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bakery-products">
        <div className="section-title">
          <span>Our Treats</span>
          <h3>Fresh Sellers Today</h3>
        </div>
        <div className="bakery-grid">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="bakery-product-card">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <div className="bakery-card-footer">
                  <span className="bakery-price">{item.price}</span>
                  <Link href={`https://wa.me/${data.mobile_number}?text=I want to order: ${encodeURIComponent(item.name)}`} className="bakery-order-btn">
                    Order Now
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1/-1", opacity: 0.7 }}>No baked goods listed today.</p>
          )}
        </div>
      </section>

      <section className="bakery-custom-orders">
        <div className="custom-box">
          <h3>Custom Celebration Cakes</h3>
          <p>Birthday, wedding, or anniversary — tell us your dream flavor and design, and we will bake it to perfection.</p>
          <Link href={`https://wa.me/${data.mobile_number}?text=I want to inquire about custom cakes.`} className="bakery-custom-btn">
            Inquire Custom Cake
          </Link>
        </div>
      </section>

      <footer className="bakery-footer">
        <div>
          <h4>Visit Our Bakery</h4>
          <p>{data.location_address || "Open daily 7 AM - 10 PM."}</p>
        </div>
        <div className="bakery-socials">
          {socialsList.map((social) => (
            <SocialLink key={social.id} href={social.href} type={social.type} icon={null} />
          ))}
        </div>
      </footer>
    </div>
  );
}
