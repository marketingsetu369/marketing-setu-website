"use client";

import { AppButton } from "@/components/library";
import { ThemeMode, TrackAction } from "@/enums";
import type { BusinessPageData } from "@/types/businessPage";
import { trackUniqueAction } from "@/utils";
import Link from "next/link";
import React, { useState } from "react";
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
    ActivityIcon,
    CallIcon,
    Clock01Icon,
    CopyIcon,
    CustomerServiceIcon,
    DoctorIcon,
    HospitalLocationIcon,
    LicenseIcon,
    QrCodeIcon,
    SmartPhoneIcon,
    StarIcon,
    TeacherIcon
} from "@hugeicons/core-free-icons";

// Components
import {
    OfflinePage,
    ProductCard,
    ProductProps,
} from "../component";

// Data helpers
import { formatBusinessName } from "@/utils";

// SVGs used directly in this view
import { CopyIcon as SVGCopyIcon, QrIcon as SVGQrIcon, WhatsAppIcon } from "../svg";

// Single Mock Data Object for Lawyer/Advocate as per html request
const mockLawerData = {
  brandName: "THEMIS LAW AGENCY",
  lawerName: "Adv. Rohan Sharma",
  specialization: "Providing high-yield legal consultancy, litigation support, and strategic legal counsel across corporate and personal sectors.",
  heroTitle: "Aiming To Provide High-Quality Legal Consultancy",
  heroSubtitle: "We approach each problem with three essential elements: strategic thinking, creative solutions, and proven results.",
  experienceYears: "25+",
  phone: "+0123 456 789",
  email: "hello@themis.com",
  opdTiming: "Mon - Fri (8:00 - 20:00)",
  clinicAddress: "123 Legal Avenue, Suite 400, Financial District, NY 10001",
  qualifications: [
    "25+ Years Experience",
    "99% Case Success Rate",
    "Dedicated Legal Team",
    "Client-Centric Strategy"
  ],
  services: [
    {
      id: "s1",
      name: "Bankruptcy",
      description: "Sound legal support and protection of assets through complex bankruptcy litigation and counseling.",
      price: "₹1,500",
      actionType: "enquiry"
    },
    {
      id: "s2",
      name: "Car Accidents",
      description: "Relentless courtroom strategy and advocacy to secure maximum claims in accident damages.",
      price: "₹800",
      actionType: "enquiry"
    },
    {
      id: "s3",
      name: "Capital Market",
      description: "Thorough legal advice, compliance guidelines, and disputes settlement in the capital market.",
      price: "₹1,000",
      actionType: "enquiry"
    }
  ]
};

interface BusinessViewProps {
  data: BusinessPageData | null;
  businessName: string;
}

export default function LawerPortfolioView({ data, businessName }: BusinessViewProps) {
  const { theme, setTheme, mounted }   = useThemeMode();
  const { copied, handleCopyLink }     = useCopyLink(data?.slug);
  usePageTracking(data?.slug);

  const [shareUrl, setShareUrl] = useState("");
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

  // Bind dynamic data / fallbacks to template
  const td = data.template_data?.doctor;
  
  const brandName = data.business_name || mockLawerData.brandName;
  const doctorName = decodedBusinessName ? `Adv. ${decodedBusinessName}` : mockLawerData.lawerName;
  const specialty = data.business_category ?? mockLawerData.specialization;
  const heroTitle = mockLawerData.heroTitle;
  const heroSubtitle = data.about_us ?? mockLawerData.heroSubtitle;
  const experienceYears = mockLawerData.experienceYears;
  const phoneNumber = data.mobile_number || mockLawerData.phone;
  const opdTiming = mockLawerData.opdTiming;
  const clinicAddress = data.location_address || mockLawerData.clinicAddress;
  
  const qualifications = mockLawerData.qualifications;
  const servicesToRender = productsList.length > 0 ? productsList : mockLawerData.services;

  // Contact Form Submission Handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const clientName = formData.get("clientName");
    const clientPhone = formData.get("clientPhone");
    const clientMessage = formData.get("clientMessage");
    alert(`Enquiry submitted successfully!\nName: ${clientName}\nPhone: ${clientPhone}\nMessage: ${clientMessage}`);
    (e.currentTarget as HTMLFormElement).reset();
  };

  const primaryColor = accentColor.primary || "#E5A117";
  const primaryHover = accentColor.primaryHover || "#C98A0C";

  return (
    <div
      className="doctor-portfolio-wrapper"
      style={{
        "--primary-blue": primaryColor,
        "--primary-hover": primaryHover,
      } as React.CSSProperties}
    >
      {/* HEADER / NAVBAR */}
      <header className="doc-header">
        <div className="doc-container doc-navbar">
          <a href="#" className="doc-brand-logo">
            {data.logo_url ? (
              <img src={data.logo_url} alt={brandName} style={{ width: "40px", height: "40px", borderRadius: "8px" }} />
            ) : (
              <HugeiconsIcon icon={ActivityIcon} size={24} style={{ color: "var(--primary-blue)" }} />
            )}
            <span>{brandName}</span>
          </a>
          
          <nav>
            <ul className="doc-nav-links">
              <li><a href="#home" className="active">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#appointment">Enquiry</a></li>
            </ul>
          </nav>

          <div className="doc-nav-auth-btns">
            <AppButton
              onClick={() => setTheme(theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)}
              className="doc-btn doc-btn-outline"
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
            >
              {mounted && theme === ThemeMode.Light ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </AppButton>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="doc-hero-section">
        {/* Background Watermarks (SVG style or Subtle icons) */}
        <HugeiconsIcon icon={ActivityIcon} className="doc-hero-watermark-1" size={48} style={{ color: "rgba(2, 71, 165, 0.08)" }} />
        <HugeiconsIcon icon={DoctorIcon} className="doc-hero-watermark-2" size={96} style={{ color: "rgba(2, 71, 165, 0.05)" }} />

        <div className="doc-container doc-hero-grid">
          {/* Left Column */}
          <div className="doc-hero-text">
            <h1>{heroTitle}</h1>
            <p>{heroSubtitle}</p>
            
            <div className="doc-hero-actions-wrap">
              <a href="#appointment" className="doc-btn doc-btn-primary">Send Enquiry</a>
              <a href="#about" className="doc-btn doc-btn-outline">Learn More</a>
            </div>

            {/* 3 Quick Cards */}
            <div className="doc-hero-quick-cards">
              <div className="doc-quick-card">
                <div className="doc-quick-card-icon">
                  <HugeiconsIcon icon={HospitalLocationIcon} size={20} />
                </div>
                <h4>24/7 Emergency Service</h4>
              </div>

              <div className="doc-quick-card">
                <div className="doc-quick-card-icon">
                  <HugeiconsIcon icon={CustomerServiceIcon} size={20} />
                </div>
                <h4>Online Health Service</h4>
              </div>

              <div className="doc-quick-card">
                <div className="doc-quick-card-icon">
                  <HugeiconsIcon icon={ActivityIcon} size={20} />
                </div>
                <h4>Regular Health Checks</h4>
              </div>
            </div>
          </div>

          {/* Right Column: Dotted Organic Frame */}
          <div className="doc-hero-image-wrapper">
            <div className="doc-dotted-circle-frame">
              <img
                src={data.logo_url || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"}
                alt={doctorName}
                className="doc-hero-doctor-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="doc-section-padding">
        <div className="doc-container">
          <div className="doc-section-header">
            <span>Our Specializations</span>
            <h2>High Quality Legal Services</h2>
          </div>

          {productsList.length > 0 ? (
            <div className="doc-services-grid-new">
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
            <div className="doc-services-grid-new">
              {mockLawerData.services.map((service) => (
                <div key={service.id} className="doc-service-card-new">
                  <div className="doc-service-icon-new">
                    <HugeiconsIcon 
                      icon={service.id === "s1" ? ActivityIcon : service.id === "s2" ? DoctorIcon : SmartPhoneIcon} 
                      size={28} 
                    />
                  </div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ABOUT LAWER */}
      <section id="about" className="doc-section-padding doc-about-section">
        <div className="doc-container doc-about-grid">
          <div className="doc-about-img-box">
            <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80" alt="Chambers" />
            <div className="doc-experience-badge">
              <h3>{experienceYears}</h3>
              <p>Years Experience</p>
            </div>
          </div>

          <div className="doc-about-content">
            <h2>Defending Your Rights With Uncompromising Integrity</h2>
            <p>{specialty}</p>

            <div className="doc-doctor-qualifications">
              {qualifications.map((qual: string, idx: number) => (
                <div key={idx} className="doc-qual-item">
                  <HugeiconsIcon icon={LicenseIcon} size={18} style={{ color: "var(--primary-blue)" }} /> {qual}
                </div>
              ))}
            </div>

            <a href="#appointment" className="doc-btn doc-btn-primary">Send Enquiry</a>
          </div>
        </div>
      </section>

      {/* APPOINTMENT BOOKING SECTION */}
      <section id="appointment" className="doc-container doc-appointment-container">
        <div className="doc-appointment-section">
          <div className="doc-appointment-grid">
            <div>
              <span style={{ color: "var(--primary-blue)", fontWeight: 700, textTransform: "uppercase" }}>Direct Consultation</span>
              <h2 style={{ fontSize: "2.2rem", color: "var(--text-dark)", margin: "10px 0 16px" }}>Send Us Your Enquiry</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>Fill out the form below to send an enquiry. Our legal support team will reach out to you shortly.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <HugeiconsIcon icon={CallIcon} size={20} style={{ color: "var(--primary-blue)" }} />
                  <strong style={{ fontSize: "1.1rem" }}>{phoneNumber}</strong>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <HugeiconsIcon icon={Clock01Icon} size={20} style={{ color: "var(--primary-blue)" }} />
                  <span>{opdTiming}</span>
                </div>
              </div>
            </div>

            <div className="doc-appointment-form">
              <form onSubmit={handleContactSubmit}>
                <div className="doc-form-group">
                  <label>Full Name</label>
                  <input type="text" name="clientName" className="doc-form-control" placeholder="e.g. John Doe" required />
                </div>
                <div className="doc-form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="clientPhone" className="doc-form-control" placeholder="+91 98765 43210" required />
                </div>
                <div className="doc-form-group">
                  <label>Your Message / Requirements</label>
                  <textarea name="clientMessage" className="doc-form-control" placeholder="Describe your case details or legal requirements..." rows={3} required />
                </div>
                <button type="submit" className="doc-btn doc-btn-primary" style={{ width: "100%" }}>Send Enquiry</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SHARE PROFILE / DIGITAL CLINIC CARD */}
      <section className="doc-container doc-share-profile-card">
        <div className="doc-share-profile-box">
          <div className="doc-share-profile-left">
            <h2>Share Digital Profile Card</h2>
            <p>Scan the QR Code or copy the link to share the profile with friends or family.</p>
            <div className="doc-share-profile-actions">
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
                <SVGCopyIcon className="icon-copy-share" /> {copied ? "Copied!" : "Copy Link"}
              </AppButton>
            </div>
          </div>
          <div className="doc-share-qr-wrapper">
            <div className="doc-share-qr-box">
              <HugeiconsIcon icon={QrCodeIcon} className="doc-qr-icon" size={60} style={{ color: "var(--primary-blue)" }} />
            </div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Scan QR Code</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="doc-footer-new">
        <div className="doc-container">
          <div className="doc-footer-grid">
            <div className="doc-footer-about">
              <a href="#" className="doc-brand-logo" style={{ color: "var(--bg-white)" }}>
                {data.logo_url ? (
                  <img src={data.logo_url} alt={brandName} style={{ width: "30px", height: "30px", borderRadius: "6px" }} />
                ) : (
                  <HugeiconsIcon icon={ActivityIcon} size={20} style={{ color: "#fff" }} />
                )}
                <span style={{ color: "white" }}>{brandName}</span>
              </a>
              <p>Providing high-yield legal consultancy, litigation support, and strategic legal counsel across corporate and personal sectors.</p>
            </div>

            <div>
              <h4 className="doc-footer-title">Quick Links</h4>
              <ul className="doc-footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Lawer</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#appointment">Enquiry</a></li>
              </ul>
            </div>

            <div>
              <h4 className="doc-footer-title">Legal Areas</h4>
              <ul className="doc-footer-links">
                <li><a href="#">Bankruptcy</a></li>
                <li><a href="#">Car Accidents</a></li>
                <li><a href="#">Capital Market</a></li>
                <li><a href="#">Family Law</a></li>
              </ul>
            </div>

            <div>
              <h4 className="doc-footer-title">Clinic Address</h4>
              <p style={{ color: "#A0AEC0", fontSize: "0.95rem", lineHeight: 1.6 }}>
                {clinicAddress}
              </p>
            </div>
          </div>

          <div className="doc-footer-bottom">
            <p>&copy; {new Date().getFullYear()} {brandName}. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
