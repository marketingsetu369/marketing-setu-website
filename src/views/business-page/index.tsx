"use client";

import React from "react";
import Link from "next/link";
import "./styles.css";
import { AppButton } from "@/components/library";
import { trackUniqueAction } from "@/utils";
import { TrackAction, ThemeMode, ContactIconType } from "@/enums";
import type { BusinessPageData, ContactItem } from "@/types/businessPage";
import {
  useBusinessPageData,
  useThemeMode,
  useCopyLink,
  usePageTracking,
} from "./hooks";

// Components
import {
  ProductCard,
  SidebarInfoItem,
  SocialLink,
  DashboardSection,
  ProfileCard,
  GalleryCard,
  OfflinePage,
  BusinessLogo,
  ProductProps,
} from "./component";

// Data helpers
import { renderIcon } from "./data";
import { formatBusinessName } from "@/utils";

// SVGs used directly in this view
import { WhatsAppIcon, CopyIcon, QrIcon } from "./svg";

interface BusinessViewProps {
  data: BusinessPageData | null;
  businessName: string;
}

export default function BusinessView({ data, businessName }: BusinessViewProps) {
  // ── Hooks ──────────────────────────────────────────────────────
  const { theme, setTheme, mounted }   = useThemeMode();
  const { copied, handleCopyLink }     = useCopyLink(data?.slug);
  usePageTracking(data?.slug);

  const { accentColor, quickActions, contactsList, productsList, galleryList, socialsList } =
    useBusinessPageData(data);

  // ── Derived values ─────────────────────────────────────────────
  const decodedBusinessName = React.useMemo(
    () => formatBusinessName(businessName, data?.business_name),
    [businessName, data?.business_name]
  );

  // ── Offline guard ──────────────────────────────────────────────
  if (!data || !data.business_name) {
    return <OfflinePage />;
  }

  // ── Main Render ────────────────────────────────────────────────
  return (
    <div
      className="business-page-wrapper"
      style={{
        "--business-primary":     accentColor.primary,
        "--business-primary-rgb": accentColor.primaryRgb,
      } as React.CSSProperties}
    >
      <div className="business-container">

        {/* LEFT COLUMN - SIDEBAR */}
        <aside className="business-sidebar">
          <ProfileCard
            businessName={decodedBusinessName}
            category={data.business_category ?? "General Business"}
            description={data.about_us ?? ""}
            logo={<BusinessLogo logoUrl={data.logo_url} businessName={data.business_name} />}
          />

          {/* Theme Mode Switcher */}
          <div className="palette-card">
            <h3 className="palette-title">Page Mode</h3>
            <div className="palette-options">
              {([ThemeMode.Light, ThemeMode.Dark] as const).map((mode) => (
                <AppButton
                  key={mode}
                  onClick={() => setTheme(mode)}
                  className={`action-pill theme-toggle-btn ${mounted && theme === mode ? "call" : "directions"}`}
                  type="button"
                >
                  {mode === ThemeMode.Light ? "☀️ Light" : "🌙 Dark"}
                </AppButton>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-bar">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className={`action-pill ${action.type}`}
                target={action.type !== TrackAction.Call ? "_blank" : undefined}
                rel={action.type !== TrackAction.Call ? "noopener noreferrer" : undefined}
                onClick={() => data.slug && trackUniqueAction(data.slug, action.type)}
              >
                {renderIcon(action.type, {
                  className: `icon-sm${action.type === TrackAction.WhatsApp ? " icon-fill" : ""}`,
                })}
                {action.label}
              </Link>
            ))}
          </div>

          {/* Contact Details */}
          <div className="info-card">
            {contactsList.map((contact: ContactItem) => (
              <SidebarInfoItem
                key={contact.id}
                {...contact}
                icon={renderIcon(contact.iconType, { className: "icon-md" })}
                onClick={() => {
                  if (!data.slug) return;
                  const actionType =
                    contact.iconType === ContactIconType.Phone    ? TrackAction.Call
                    : contact.iconType === ContactIconType.Location ? TrackAction.Directions
                    : null;
                  if (actionType) trackUniqueAction(data.slug, actionType);
                }}
              />
            ))}
          </div>
        </aside>

        {/* RIGHT COLUMN - MAIN CONTENT */}
        <main className="business-main-content">

          {/* Products & Services */}
          <DashboardSection title="Products & Services">
            {productsList.length > 0 ? (
              <div className="products-cards-grid">
                {productsList.map((product: ProductProps) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    mobileNumber={data.mobile_number}
                    businessName={decodedBusinessName}
                    slug={data.slug}
                  />
                ))}
              </div>
            ) : (
              <p className="section-empty-text">No products listed yet.</p>
            )}
          </DashboardSection>

          {/* Gallery */}
          <DashboardSection title="Gallery">
            {galleryList.length > 0 ? (
              <div className="gallery-layout-grid">
                {galleryList.map((gallery) => (
                  <GalleryCard key={gallery.id} colorClass={gallery.colorClass} imageUrl={gallery.imageUrl} icon={null} />
                ))}
              </div>
            ) : (
              <p className="section-empty-text">No gallery photos uploaded yet.</p>
            )}
          </DashboardSection>

          {/* Follow Us */}
          {socialsList.length > 0 && (
            <DashboardSection title="Follow Us">
              <div className="socials-flex-container">
                {socialsList.map((social) => (
                  <SocialLink
                    key={social.id}
                    href={social.href}
                    type={social.type}
                    icon={renderIcon(social.type, {
                      className: `icon-lg${social.type !== "web" ? " icon-fill" : ""}`,
                    })}
                  />
                ))}
              </div>
            </DashboardSection>
          )}

          {/* Share Page */}
          <DashboardSection title="Share Page">
            <div className="share-dashboard-grid">
              <div className="share-left-box">
                <h3 className="share-pill-title">Share this business page</h3>
                <div className="share-action-grid">
                  <Link
                    href={`https://api.whatsapp.com/send?text=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-pill-button"
                    onClick={() => data.slug && trackUniqueAction(data.slug, TrackAction.WhatsApp)}
                  >
                    <WhatsAppIcon className="icon-whatsapp-share" />
                    WhatsApp
                  </Link>
                  <AppButton onClick={handleCopyLink} className="share-pill-button">
                    <CopyIcon className="icon-copy-share" />
                    {copied ? "Copied!" : "Copy Link"}
                  </AppButton>
                </div>
              </div>
              <div className="share-right-box">
                <div className="qr-code-holder">
                  <div className="qr-bordered-pattern">
                    <QrIcon className="icon-qr" />
                  </div>
                </div>
                <span className="qr-holder-caption">QR Code — Scan to visit</span>
              </div>
            </div>
          </DashboardSection>

        </main>
      </div>
    </div>
  );
}
