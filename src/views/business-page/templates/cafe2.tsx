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
import { SocialLink, OfflinePage, BusinessLogo } from "../component";
import { formatBusinessName } from "@/utils";
import { WhatsAppIcon, CopyIcon } from "../svg";

interface BusinessViewProps {
  data: BusinessPageData | null;
  businessName: string;
}

const COFFEE_EMOJIS = ["☕", "🧁", "🥐", "🍰", "🫖", "🍩"];

export default function Cafe2View({ data, businessName }: BusinessViewProps) {
  const { theme, setTheme, mounted } = useThemeMode();
  const { copied, handleCopyLink } = useCopyLink(data?.slug);
  usePageTracking(data?.slug);

  const { accentColor, quickActions, productsList, socialsList, contactsList } =
    useBusinessPageData(data);

  const [shareUrl, setShareUrl] = React.useState("");
  React.useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const decodedBusinessName = React.useMemo(
    () => formatBusinessName(businessName, data?.business_name),
    [businessName, data?.business_name]
  );

  if (!data || !data.business_name) {
    return <OfflinePage />;
  }

  const cafeData = data.template_data?.cafe;
  const specials = cafeData?.specials ?? [
    "Cardamom Rose Latte",
    "Burnt Honey Croissant",
    "Mushroom Shakshuka Toast",
    "Iced Matcha with Oat Milk",
  ];
  const bakeryItems = cafeData?.bakery_items ?? [
    "Espresso Walnut Brownie",
    "Honey Almond Scone",
    "Cinnamon Knot",
    "Dark Chocolate Tart",
  ];
  const heroTagline = cafeData?.hero_tagline ?? "Warm. Fresh. Inviting.";

  const phone = contactsList.find((c) => c.href?.startsWith("tel:"));
  const location = contactsList.find((c) => c.href?.startsWith("https://maps"));
  const waAction = quickActions.find((a) => a.type === TrackAction.WhatsApp);
  const callAction = quickActions.find((a) => a.type === TrackAction.Call);

  return (
    <div
      className="cv2-root"
      style={
        {
          "--cv2-brand": accentColor.primary || "#7c4a2f",
          "--cv2-brand-rgb": accentColor.primaryRgb || "124, 74, 47",
        } as React.CSSProperties
      }
    >
      {/* ── NAV ──────────────────────────────────────────────────── */}
      <nav className="cv2-nav">
        <div className="cv2-nav-inner">
          <div className="cv2-nav-brand">
            <div className="cv2-nav-logo">
              <BusinessLogo
                logoUrl={data.logo_url}
                businessName={data.business_name}
              />
            </div>
            <div className="cv2-nav-name-block">
              <span className="cv2-nav-eyebrow">
                {data.business_category ?? "Coffee & Bakery"}
              </span>
              <span className="cv2-nav-title">{decodedBusinessName}</span>
            </div>
          </div>

          <div className="cv2-nav-right">
            <AppButton
              className="cv2-theme-btn"
              onClick={() =>
                setTheme(
                  theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light
                )
              }
            >
              {mounted ? (theme === ThemeMode.Light ? "🌙" : "☀️") : "🌙"}
            </AppButton>
            <Link href="#menu" className="cv2-nav-menu-link">
              View Menu ↓
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="cv2-hero">
        <div className="cv2-hero-left">
          <span className="cv2-hero-badge">{heroTagline}</span>
          <h1 className="cv2-hero-heading">
            {decodedBusinessName}
          </h1>
          <p className="cv2-hero-sub">
            {data.about_us ??
              "A neighbourhood café that feels like home — fresh brew, handcrafted bites, and a chalkboard menu that changes with the season."}
          </p>
          <div className="cv2-hero-actions">
            {callAction && (
              <Link
                href={callAction.href}
                className="cv2-btn cv2-btn-primary"
                onClick={() =>
                  data.slug && trackUniqueAction(data.slug, TrackAction.Call)
                }
              >
                📞 Call Now
              </Link>
            )}
            {waAction && (
              <Link
                href={waAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cv2-btn cv2-btn-wa"
                onClick={() =>
                  data.slug &&
                  trackUniqueAction(data.slug, TrackAction.WhatsApp)
                }
              >
                <WhatsAppIcon className="cv2-icon-sm cv2-icon-fill" /> WhatsApp
              </Link>
            )}
          </div>

          {/* Contact strip */}
          {(phone || location) && (
            <div className="cv2-hero-contact-strip">
              {phone && (
                <a href={phone.href} className="cv2-contact-chip">
                  📍 {data.location_address ?? "Visit us"}
                </a>
              )}
              {data.email_address && (
                <a
                  href={`mailto:${data.email_address}`}
                  className="cv2-contact-chip"
                >
                  ✉ {data.email_address}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right panel — animated gradient window */}
        <div className="cv2-hero-right" aria-hidden="true">
          <div className="cv2-hero-art">
            <div className="cv2-art-blob cv2-blob-1" />
            <div className="cv2-art-blob cv2-blob-2" />
            <div className="cv2-art-blob cv2-blob-3" />
            <div className="cv2-art-inner">
              <div className="cv2-art-emoji-grid">
                {COFFEE_EMOJIS.map((e, i) => (
                  <span key={i} className="cv2-art-emoji" style={{ animationDelay: `${i * 0.4}s` }}>
                    {e}
                  </span>
                ))}
              </div>
              <p className="cv2-art-caption">Crafted with love, served daily</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TODAY'S SPECIALS — BENTO BOARD ───────────────────────── */}
      <section className="cv2-bento-section">
        <div className="cv2-bento-inner">
          <div className="cv2-bento-header">
            <span className="cv2-section-tag">✦ Today's Board</span>
            <h2 className="cv2-section-heading">Today's Specials</h2>
            <p className="cv2-section-sub">
              Our kitchen team curates the freshest picks every morning.
            </p>
          </div>

          <div className="cv2-bento-grid">
            {/* Large feature tile */}
            <div className="cv2-bento-tile cv2-tile-featured">
              <div className="cv2-tile-badge">Chef's Pick</div>
              <h3>{specials[0]}</h3>
              <p>A house favourite that returns every season — deeply flavoured, perfectly balanced.</p>
              <span className="cv2-tile-cta">Ask barista →</span>
            </div>

            {/* Small tiles */}
            {specials.slice(1, 4).map((item, i) => (
              <div key={i} className={`cv2-bento-tile cv2-tile-sm cv2-tile-sm-${i + 1}`}>
                <span className="cv2-tile-num">0{i + 2}</span>
                <h4>{item}</h4>
              </div>
            ))}

            {/* Bakery tile */}
            <div className="cv2-bento-tile cv2-tile-bakery">
              <span className="cv2-tile-icon">🥐</span>
              <h3>Fresh from the Oven</h3>
              <p>Pastries, cakes, and bakes — in daily.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MENU ─────────────────────────────────────────────────── */}
      <section id="menu" className="cv2-menu-section">
        <div className="cv2-menu-inner">
          <div className="cv2-menu-header">
            <span className="cv2-section-tag">✦ House Menu</span>
            <h2 className="cv2-section-heading">Our Offerings</h2>
          </div>

          <div className="cv2-menu-rail">
            {productsList.length > 0 ? (
              productsList.map((product) => (
                <div key={product.id} className="cv2-menu-card">
                  <div className="cv2-menu-card-top">
                    <div className="cv2-menu-card-icon">☕</div>
                    <span className="cv2-menu-price">{product.price}</span>
                  </div>
                  <h4 className="cv2-menu-name">{product.name}</h4>
                  <p className="cv2-menu-desc">{product.description}</p>
                  {waAction && (
                    <Link
                      href={`https://api.whatsapp.com/send?phone=${data.mobile_number}&text=${encodeURIComponent(`Hi! I'd like to order: ${product.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv2-menu-order-btn"
                      onClick={() =>
                        data.slug &&
                        trackUniqueAction(data.slug, TrackAction.WhatsApp)
                      }
                    >
                      {product.buttonName ?? "Order Now"}
                    </Link>
                  )}
                </div>
              ))
            ) : (
              <p className="cv2-empty-text">Menu details will be available shortly.</p>
            )}
          </div>
        </div>
      </section>

      {/* ── BAKERY ROW ───────────────────────────────────────────── */}
      <section className="cv2-bakery-section">
        <div className="cv2-bakery-inner">
          <div className="cv2-bakery-left">
            <span className="cv2-section-tag cv2-tag-light">✦ Bakery Counter</span>
            <h2 className="cv2-section-heading cv2-heading-light">
              From the Bakery
            </h2>
            <p className="cv2-bakery-lead">
              Every item baked on-site before sunrise. No preservatives, no shortcuts — just craft.
            </p>
          </div>
          <div className="cv2-bakery-chips">
            {bakeryItems.map((item, i) => (
              <div key={i} className="cv2-bakery-chip">
                <span className="cv2-chip-dot" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL + SHARE FOOTER ────────────────────────────────── */}
      <footer className="cv2-footer">
        <div className="cv2-footer-inner">
          {/* Left — brand recap */}
          <div className="cv2-footer-brand">
            <div className="cv2-footer-logo">
              <BusinessLogo
                logoUrl={data.logo_url}
                businessName={data.business_name}
              />
            </div>
            <div>
              <p className="cv2-footer-name">{decodedBusinessName}</p>
              <p className="cv2-footer-cat">
                {data.business_category ?? "Coffee & Bakery"}
              </p>
              {data.location_address && (
                <p className="cv2-footer-addr">📍 {data.location_address}</p>
              )}
            </div>
          </div>

          {/* Center — socials */}
          {socialsList.length > 0 && (
            <div className="cv2-footer-socials">
              <p className="cv2-footer-socials-label">Follow Along</p>
              <div className="cv2-socials-row">
                {socialsList.map((social) => (
                  <SocialLink
                    key={social.id}
                    href={social.href}
                    type={social.type}
                    icon={null}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Right — share */}
          <div className="cv2-footer-share">
            <p className="cv2-footer-socials-label">Share this page</p>
            <div className="cv2-share-row">
              {shareUrl && (
                <Link
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv2-share-btn cv2-share-wa"
                >
                  <WhatsAppIcon className="cv2-icon-sm cv2-icon-fill" />
                  Share
                </Link>
              )}
              <AppButton
                onClick={handleCopyLink}
                className="cv2-share-btn cv2-share-copy"
              >
                <CopyIcon className="cv2-icon-sm" />
                {copied ? "Copied!" : "Copy Link"}
              </AppButton>
            </div>
          </div>
        </div>

        <div className="cv2-footer-bottom">
          <span>© {new Date().getFullYear()} {decodedBusinessName}. All rights reserved.</span>
          <span className="cv2-footer-powered">Powered by MarketingSetu</span>
        </div>
      </footer>
    </div>
  );
}
