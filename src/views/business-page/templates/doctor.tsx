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

// Components
import {
    BusinessLogo,
    OfflinePage,
    ProductCard,
    ProductProps,
    SocialLink,
} from "../component";

// Data helpers
import { formatBusinessName } from "@/utils";
import { renderIcon } from "../data";

// SVGs used directly in this view
import { CopyIcon, QrIcon, WhatsAppIcon } from "../svg";

interface BusinessViewProps {
  data: BusinessPageData | null;
  businessName: string;
}

export default function DoctorPortfolioView({ data, businessName }: BusinessViewProps) {
  const { theme, setTheme, mounted }   = useThemeMode();
  const { copied, handleCopyLink }     = useCopyLink(data?.slug);
  usePageTracking(data?.slug);

  const [shareUrl, setShareUrl] = React.useState("");
  React.useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const { accentColor, quickActions, contactsList, productsList, galleryList, socialsList } =
    useBusinessPageData(data);

  const decodedBusinessName = React.useMemo(
    () => formatBusinessName(businessName, data?.business_name),
    [businessName, data?.business_name]
  );

  if (!data || !data.business_name) {
    return <OfflinePage />;
  }

  // ── Doctor template_data with fallbacks ───────────────────────────────
  const td = data.template_data?.doctor;

  const doctorQualifications = td?.qualifications ?? "MBBS, MD, DM (Cardiology)";
  const doctorSpecialty = td?.specialty_line ?? data.business_category ?? "Senior Consultant Cardiologist";

  const stats = td?.stats ?? [
    { value: "15+",  label: "Years Experience" },
    { value: "10K+", label: "Happy Patients"   },
    { value: "25+",  label: "Medical Awards"   },
    { value: "100%", label: "Patient Care"     },
  ];

  const educationTimeline = td?.education_timeline ?? [
    { period: "2015 - Present", title: "Head of Cardiology Department",        institution: "City Heart & Vascular Institute"            },
    { period: "2010 - 2015",    title: "Senior Consultant Cardiologist",        institution: "Apex Multi-Specialty Hospital"              },
    { period: "2005 - 2010",    title: "Doctor of Medicine (DM) in Cardiology", institution: "All India Institute of Medical Sciences"    },
  ];

  const clinicTimings = td?.clinic_timings ?? [
    { day: "Monday - Friday", time: "09:00 AM - 01:00 PM, 04:00 PM - 08:00 PM" },
    { day: "Saturday",        time: "09:00 AM - 02:00 PM"                       },
    { day: "Sunday",          time: "Closed"                                    },
  ];

  const testimonials = td?.testimonials ?? [
    { text: "Dr. Aarav Mehta is exceptional. He patiently explained all aspects of my treatment and offered top-notch support.", patient: "Aditya Sharma", location: "Mumbai" },
    { text: "The clinic has the highest safety and cleanliness standards. Highly recommended cardiologist!",                    patient: "Priya Patel",   location: "Pune"   },
  ];

  return (
    <div
      className="doctor-portfolio-wrapper"
      style={{
        "--business-primary":     accentColor.primary || "#008080",
        "--business-primary-rgb": accentColor.primaryRgb || "0, 128, 128",
      } as React.CSSProperties}
    >
      {/* HEADER NAVBAR */}
      <header className="doc-nav">
        <div className="doc-nav-container">
          <div className="doc-logo-section">
            <BusinessLogo logoUrl={data.logo_url} businessName={data.business_name} />
            <span className="doc-logo-title">Dr. {decodedBusinessName}</span>
          </div>
          <div className="doc-nav-actions">
            <AppButton
              onClick={() => setTheme(theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)}
              className="doc-theme-toggle"
            >
              {mounted && theme === ThemeMode.Light ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </AppButton>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="doc-hero">
        <div className="doc-hero-bg-accent"></div>
        <div className="doc-hero-content">
          <div className="doc-hero-image-wrap">
            <BusinessLogo logoUrl={data.logo_url} businessName={data.business_name} priority={true} />
            <div className="doc-status-badge">Available for Consultation</div>
          </div>
          <h1 className="doc-hero-name">Dr. {decodedBusinessName}</h1>
          <p className="doc-hero-specialty">{doctorSpecialty}</p>
          <p className="doc-hero-credentials">{doctorQualifications}</p>
          
          <div className="doc-hero-actions">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className={`doc-hero-btn ${action.type}`}
                target={action.type !== TrackAction.Call ? "_blank" : undefined}
                rel={action.type !== TrackAction.Call ? "noopener noreferrer" : undefined}
                onClick={() => data.slug && trackUniqueAction(data.slug, action.type)}
              >
                {renderIcon(action.type, { className: "icon-md" })}
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="doc-stats-strip">
        <div className="doc-stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="doc-stat-card">
              <div className="doc-stat-val">{stat.value}</div>
              <div className="doc-stat-lbl">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section className="doc-section doc-about">
        <div className="doc-section-container">
          <h2 className="doc-section-title">About Me & Philosophy</h2>
          <p className="doc-about-text">
            {data.about_us || "Dedicated to providing high-quality medical expertise and patient-centric healthcare services. My clinical philosophy prioritizes transparency, state-of-the-art procedures, and individualized support for every patient."}
          </p>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="doc-section doc-services">
        <div className="doc-section-container">
          <h2 className="doc-section-title">Specialized Services & Treatments</h2>
          {productsList.length > 0 ? (
            <div className="doc-services-grid">
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
            <p className="doc-empty-text">No specialized treatments listed yet.</p>
          )}
        </div>
      </section>

      {/* CLINICAL EXPERIENCE & EDUCATION */}
      <section className="doc-section doc-education">
        <div className="doc-section-container">
          <h2 className="doc-section-title">Education & Career Journey</h2>
          <div className="doc-timeline">
            {educationTimeline.map((item, idx) => (
              <div key={idx} className="doc-timeline-item">
                <div className="doc-timeline-marker"></div>
                <div className="doc-timeline-content">
                  <span className="doc-timeline-period">{item.period}</span>
                  <h3 className="doc-timeline-title">{item.title}</h3>
                  <p className="doc-timeline-inst">{item.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PATIENT FEEDBACK */}
      <section className="doc-section doc-testimonials">
        <div className="doc-section-container">
          <h2 className="doc-section-title">What Patients Say</h2>
          <div className="doc-testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="doc-testimonial-card">
                <div className="doc-quote-icon">“</div>
                <p className="doc-testimonial-text">{t.text}</p>
                <div className="doc-testimonial-author">
                  <strong>{t.patient}</strong>
                  <span>{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      {galleryList.length > 0 && (
        <section className="doc-section doc-gallery">
          <div className="doc-section-container">
            <h2 className="doc-section-title">Clinic Infrastructure</h2>
            <div className="doc-gallery-grid">
              {galleryList.map((photo) => (
                <div key={photo.id} className="doc-gallery-item">
                  <img src={photo.imageUrl} alt="Clinic Area" className="doc-gallery-img" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TIMINGS & CONTACT INFO */}
      <section className="doc-section doc-timings-contact">
        <div className="doc-section-container doc-timings-grid-layout">
          {/* Operating Hours */}
          <div className="doc-timings-card">
            <h3>Consultation Hours</h3>
            <div className="doc-hours-list">
              {clinicTimings.map((time, i) => (
                <div key={i} className="doc-hours-row">
                  <span className="doc-day">{time.day}</span>
                  <span className="doc-hours-val">{time.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="doc-contact-card">
            <h3>Clinic Information</h3>
            <div className="doc-contact-details">
              {contactsList.map((contact: ContactItem) => (
                <div key={contact.id} className="doc-contact-item">
                  <span className="doc-contact-icon">
                    {renderIcon(contact.iconType, { className: "icon-md" })}
                  </span>
                  <div>
                    <span className="doc-contact-lbl">{contact.label}</span>
                    <p className="doc-contact-val">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHARE PROFILE */}
      <section className="doc-section doc-share">
        <div className="doc-section-container doc-share-box">
          <div className="doc-share-left">
            <h2>Share Digital Clinic Card</h2>
            <p>Scan the QR Code or copy the link to share the profile with friends or family.</p>
            <div className="doc-share-buttons">
              <Link
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-share-btn wa"
                onClick={() => data.slug && trackUniqueAction(data.slug, TrackAction.WhatsApp)}
              >
                <WhatsAppIcon className="icon-whatsapp-share" /> WhatsApp
              </Link>
              <AppButton onClick={handleCopyLink} className="doc-share-btn copy">
                <CopyIcon className="icon-copy-share" /> {copied ? "Copied!" : "Copy Link"}
              </AppButton>
            </div>
          </div>
          <div className="doc-share-right">
            <div className="doc-qr-holder">
              <QrIcon className="doc-qr-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="doc-footer">
        <div className="doc-footer-container">
          <p>© {new Date().getFullYear()} Dr. {decodedBusinessName}. All rights reserved.</p>
          <div className="doc-footer-socials">
            {socialsList.map((social) => (
              <SocialLink
                key={social.id}
                href={social.href}
                type={social.type}
                icon={renderIcon(social.type, { className: "icon-md icon-fill" })}
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
