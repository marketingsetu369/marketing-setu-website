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

export default function HotelView({ data, businessName }: BusinessViewProps) {
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

  const heroTagline = data.business_category || "Luxury Stays & Bespoke Service";

  return (
    <div
      className="hotells-container"
      style={{
        "--hotel-accent": accentColor.primary || "#f59e0b",
        "--hotel-accent-rgb": accentColor.primaryRgb || "245, 158, 11",
      } as React.CSSProperties}
    >
      {/* Top Black Utility Bar */}
      <div className="hotells-top-bar">
        <div className="hotells-top-left">
          <span className="phone-icon">📞</span>
          <span>For Further Inquiries: {data.mobile_number}</span>
        </div>
        <div className="hotells-top-right">
          {socialsList.map((social) => (
            <a key={social.id} href={social.href} target="_blank" rel="noopener noreferrer">
              {social.type === "facebook" ? "f" : social.type === "instagram" ? "📸" : "🔗"}
            </a>
          ))}
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="hotells-header">
        <div className="hotells-brand-center">
          <span className="hotel-nav-icon">✈</span>
          <h1>{decodedBusinessName}</h1>
        </div>
        <nav className="hotells-nav">
          <a href="#home">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#rooms">ROOMS</a>
          <a href="#services">SERVICES</a>
          <a href="#gallery">GALLERY</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <div className="hotells-header-actions">
          <AppButton
            onClick={() => setTheme(theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)}
            className="hotells-theme-toggle"
          >
            {mounted && theme === ThemeMode.Light ? "🌙" : "☀️"}
          </AppButton>
          <a href={`tel:${data.mobile_number}`} className="hotells-book-now-btn">
            BOOK NOW
          </a>
        </div>
      </header>

      {/* Immersive Slider Hero */}
      <section className="hotells-hero" id="home">
        <button className="slider-arrow left">&lt;</button>
        <button className="slider-arrow right">&gt;</button>
        
        <div className="hotells-hero-content">
          <h2 className="hotells-hero-title">Lorem Porta Dolor Ipsum</h2>
          <p className="hotells-hero-desc">
            {data.about_us ||
              "Ac mi duis mollis. Sapiente? Scelerisque quae, penatibus? Suscipit class corporis nostra rem quos voluptatibus habitant? Fames, vivamus minim nemo enim, gravida lobortis quasi, eum."}
          </p>
          <div className="hotells-hero-buttons">
            <Link href="#about" className="btn-learn-more">
              LEARN MORE
            </Link>
            <AppButton
              onClick={() => {
                if (data.slug) trackUniqueAction(data.slug, TrackAction.WhatsApp);
                window.open(`https://wa.me/${data.mobile_number}`, "_blank");
              }}
              className="btn-book-now"
            >
              BOOK NOW
            </AppButton>
          </div>
        </div>

        {/* Bottom slider dots */}
        <div className="slider-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        {/* Floating Availability Bar */}
        <div className="hotells-check-widget">
          <div className="widget-input-group">
            <input type="text" placeholder="mm/dd/yyyy" onFocus={(e) => e.target.type = "date"} />
          </div>
          <div className="widget-input-group">
            <select>
              <option>Guests</option>
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3+ Guests</option>
            </select>
          </div>
          <div className="widget-input-group">
            <select>
              <option>Children</option>
              <option>0 Children</option>
              <option>1 Child</option>
              <option>2+ Children</option>
            </select>
          </div>
          <button className="btn-check-rates">CHECK RATES</button>
        </div>
      </section>

      {/* Services and Rooms Sections */}
      <section id="services" className="hotells-services-section">
        <div className="services-title-wrapper">
          <div className="decorative-accent-line"></div>
          <h3>Best Service for you</h3>
        </div>

        <div className="hotells-asymmetric-grid">
          {/* Row 1: Left Image, Right Text */}
          <div className="asymmetric-row">
            <div className="asymmetric-image-box room-img"></div>
            <div className="asymmetric-text-box">
              <h4>ROOMS & APARTMENTS</h4>
              <p>Abundantly tree made. Days saw thing whales may, creeping after abundantly waters, fourth so were, gathered above cattle lights waters.</p>
              <Link href="#rooms" className="asymmetric-arrow-btn">➔</Link>
            </div>
          </div>

          {/* Row 2: Left Text, Right Image */}
          <div className="asymmetric-row reverse">
            <div className="asymmetric-text-box">
              <h4>RESTAURANT</h4>
              <p>Abundantly tree made. Days saw thing whales may, creeping after abundantly waters, fourth so were, gathered above cattle lights waters.</p>
              <Link href="#rooms" className="asymmetric-arrow-btn">➔</Link>
            </div>
            <div className="asymmetric-image-box restaurant-img"></div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="contact" className="hotells-footer">
        <div className="footer-content">
          <div className="footer-left">
            <h3>{decodedBusinessName}</h3>
            <p>{data.location_address || "Haven Road, Scenic Bay"}</p>
          </div>
          <div className="footer-right">
            <AppButton onClick={handleCopyLink} className="footer-share-pill">
              {copied ? "Link Copied!" : "Share Room Page"}
            </AppButton>
          </div>
        </div>
      </footer>
    </div>
  );
}
