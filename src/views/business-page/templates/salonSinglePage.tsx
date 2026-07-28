"use client";

import { AppButton } from "@/components/library";
import { ThemeMode, TrackAction } from "@/enums";
import type { BusinessPageData, ContactItem } from "@/types/businessPage";
import { trackUniqueAction } from "@/utils";
import Link from "next/link";
import React from "react";
import {
    useBusinessPageData,
    useCopyLink,
    usePageTracking,
    useThemeMode,
} from "../hooks";
import "../styles.css";

// HugeIcons renderer
import { HugeiconsIcon } from "@hugeicons/react";

// HugeIcons icon definitions
import {
    BlushBrush01Icon,
    CallIcon,
    Clock01Icon,
    CopyIcon,
    FlowerIcon,
    HairDryerIcon,
    InstagramIcon,
    Location01Icon,
    QrCodeIcon,
    SparklesIcon,
    StarIcon
} from "@hugeicons/core-free-icons";

// Components
import {
    BusinessLogo,
    OfflinePage,
    ProductCard,
    ProductProps,
    SocialLink,
} from "../component";

import { formatBusinessName } from "@/utils";

interface BusinessViewProps {
  data: BusinessPageData | null;
  businessName: string;
}

export default function SalonSinglePageView({ data, businessName }: BusinessViewProps) {
  const { theme, setTheme, mounted }   = useThemeMode();
  const { copied, handleCopyLink }     = useCopyLink(data?.slug);
  usePageTracking(data?.slug);

  const { accentColor, quickActions, contactsList, productsList, galleryList, socialsList } =
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

  // ── Read from template_data.salon (no mock fallbacks) ─────────────────
  const td = data.template_data?.salon;

  const salonSpecialty = data.business_category ?? "";

  // Map icon_name string → actual HugeIcon component
  const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    HairDryerIcon,
    BlushBrush01Icon,
    FlowerIcon,
  };

  const stats        = td?.stats       ?? [];
  const clientReviews = td?.testimonials ?? [];
  const salonTimings  = td?.timings      ?? [];
  const ratingValue   = td?.rating_value ?? "";
  const ratingLabel   = td?.rating_label ?? "";

  const highlights = (td?.highlights ?? []).map((h) => ({
    ...h,
    icon: iconMap[h.icon_name ?? ""] ?? FlowerIcon,
  }));

  return (
    <div
      className="salon-single-wrapper"
      style={{
        "--business-primary":     accentColor.primary || "#ec4899",
        "--business-primary-rgb": accentColor.primaryRgb || "236, 72, 153",
      } as React.CSSProperties}
    >
      {/* HEADER / NAVIGATION BAR */}
      <header className="s-nav">
        <div className="s-nav-container">
          <div className="s-logo-section">
            <BusinessLogo logoUrl={data.logo_url} businessName={data.business_name} />
            <span className="s-logo-title">{decodedBusinessName}</span>
          </div>
          
          <nav className="s-nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#testimonials">Reviews</a>
            <a href="#contact">Hours & Location</a>
          </nav>

          <div className="s-nav-actions">
            <AppButton
              onClick={() => setTheme(theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)}
              className="s-theme-toggle"
            >
              {mounted && theme === ThemeMode.Light ? "🌙" : "☀️"}
            </AppButton>
            <a href="#contact" className="s-nav-cta-btn">Book Now</a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="s-hero">
        <div className="s-hero-bg-accent"></div>
        <div className="s-hero-container">
          <div className="s-hero-text">
            <div className="s-badge">
              <HugeiconsIcon icon={SparklesIcon} size={14} className="glow-icon" /> Premium Beauty Experience
            </div>
            <h1 className="s-hero-title">{decodedBusinessName}</h1>
            <p className="s-hero-subtitle">{salonSpecialty}</p>
            <p className="s-hero-lead">
              Step into a sanctuary of style and luxury. We curate custom haircuts, flawless styling, and tranquil spa therapies to celebrate your unique persona.
            </p>
            <div className="s-hero-actions">
              {quickActions.map((action) => (
                <Link
                  key={action.id}
                  href={action.href}
                  className={`s-hero-btn ${action.type}`}
                  target={action.type !== TrackAction.Call ? "_blank" : undefined}
                  rel={action.type !== TrackAction.Call ? "noopener noreferrer" : undefined}
                  onClick={() => data.slug && trackUniqueAction(data.slug, action.type)}
                >
                  {action.type === TrackAction.Call ? (
                    <HugeiconsIcon icon={CallIcon} size={18} />
                  ) : (
                    <HugeiconsIcon icon={HairDryerIcon} size={18} />
                  )}
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="s-hero-visual">
            <div className="s-hero-image-box">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop" 
                alt="Salon Interior" 
                className="s-hero-image"
              />
              {ratingValue && ratingLabel && (
                <div className="s-floating-card">
                  <HugeiconsIcon icon={StarIcon} size={20} className="star-gold" />
                  <div>
                    <h4>{ratingValue} Rating</h4>
                    <p>{ratingLabel}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      {stats.length > 0 && (
        <section className="s-stats-strip">
          <div className="s-stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="s-stat-card">
                <div className="s-stat-val">{stat.value}</div>
                <div className="s-stat-lbl">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ABOUT / OUR USP SECTION */}
      {(data.about_us || highlights.length > 0) && (
        <section id="about" className="s-section s-highlights">
          <div className="s-section-container">
            <h2 className="s-section-title">The Art of Pampering</h2>
            {data.about_us && (
              <p className="s-about-lead-text">{data.about_us}</p>
            )}
            {highlights.length > 0 && (
              <div className="s-highlights-grid">
                {highlights.map((item, idx) => (
                  <div key={idx} className="s-highlight-item">
                    <div className="s-highlight-icon-box">
                      <HugeiconsIcon icon={item.icon} size={24} className="huge-icon-salon" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* SIGNATURE SERVICES */}
      <section id="services" className="s-section s-services">
        <div className="s-section-container">
          <h2 className="s-section-title">Signature Services Menu</h2>
          {productsList.length > 0 ? (
            <div className="s-services-grid">
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
            <p className="s-empty-text">No services listed yet.</p>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      {clientReviews.length > 0 && (
        <section id="testimonials" className="s-section s-testimonials">
          <div className="s-section-container">
            <h2 className="s-section-title">What Clients Say</h2>
            <div className="s-testimonials-grid">
              {clientReviews.map((t, idx) => (
                <div key={idx} className="s-testimonial-card">
                  <p className="s-testimonial-text">&quot;{t.text}&quot;</p>
                  <div className="s-testimonial-author">
                    <strong>{t.client}</strong>
                    <span>{t.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* GALLERY */}
      {galleryList.length > 0 && (
        <section className="s-section s-gallery">
          <div className="s-section-container">
            <h2 className="s-section-title">A Glimpse of Luxe</h2>
            <div className="s-gallery-grid">
              {galleryList.map((photo) => (
                <div key={photo.id} className="s-gallery-item">
                  <img src={photo.imageUrl} alt="Salon Work" className="s-gallery-img" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOURS & LOCATION */}
      {(salonTimings.length > 0 || contactsList.length > 0) && (
        <section id="contact" className="s-section s-timings-contact">
          <div className="s-section-container s-timings-grid-layout">
            {/* Operating Hours */}
            {salonTimings.length > 0 && (
              <div className="s-timings-card">
                <div className="s-card-title-row">
                  <HugeiconsIcon icon={Clock01Icon} size={24} className="primary-tint" />
                  <h3>Operating Hours</h3>
                </div>
                <div className="s-hours-list">
                  {salonTimings.map((time, i) => (
                    <div key={i} className="s-hours-row">
                      <span className="s-day">{time.day}</span>
                      <span className="s-hours-val">{time.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Details */}
            {contactsList.length > 0 && (
              <div className="s-contact-card">
                <div className="s-card-title-row">
                  <HugeiconsIcon icon={Location01Icon} size={24} className="primary-tint" />
                  <h3>Visit Our Salon</h3>
                </div>
                <div className="s-contact-details">
                  {contactsList.map((contact: ContactItem) => (
                    <div key={contact.id} className="s-contact-item">
                      <span className="s-contact-icon">
                        {contact.iconType === "location" ? (
                          <HugeiconsIcon icon={Location01Icon} size={18} />
                        ) : (
                          <HugeiconsIcon icon={CallIcon} size={18} />
                        )}
                      </span>
                      <div>
                        <span className="s-contact-lbl">{contact.label}</span>
                        <p className="s-contact-val">{contact.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SHARE / QR SECTION */}
      <section className="s-section s-share">
        <div className="s-section-container s-share-box">
          <div className="s-share-left">
            <h2>Share Our Salon Experience</h2>
            <p>Scan the digital QR card or copy the profile link to recommend Luxe & Shear to family and friends.</p>
            <div className="s-share-buttons">
              <Link
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="s-share-btn wa"
                onClick={() => data.slug && trackUniqueAction(data.slug, TrackAction.WhatsApp)}
              >
                WhatsApp Profile
              </Link>
              <AppButton onClick={handleCopyLink} className="s-share-btn copy">
                <HugeiconsIcon icon={CopyIcon} size={18} /> {copied ? "Copied!" : "Copy Link"}
              </AppButton>
            </div>
          </div>
          <div className="s-share-right">
            <div className="s-qr-holder">
              <HugeiconsIcon icon={QrCodeIcon} size={72} className="s-qr-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="s-footer">
        <div className="s-footer-container">
          <p>© {new Date().getFullYear()} {decodedBusinessName}. Crafted for Elegance.</p>
          <div className="s-footer-socials">
            {socialsList.map((social) => (
              <SocialLink
                key={social.id}
                href={social.href}
                type={social.type}
                icon={<HugeiconsIcon icon={InstagramIcon} size={18} />}
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
