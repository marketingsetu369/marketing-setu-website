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

// Components
import { OfflinePage } from "../component";

// Data helpers
import { formatBusinessName } from "@/utils";

// SVGs used directly in this view
import { CopyIcon as SVGCopyIcon, WhatsAppIcon } from "../svg";

// Single Mock Data Object for Café exactly as requested in original HTML
const mockCafeData = {
  cafeName: "The Artisan Roast",
  tagline: "A Delicious Blend of Coffee & Fresh Bakery",
  phone: "+91 98765 43210",
  email: "hello@artisanroast.com",
  timing: "Mon - Sun: 7:00 AM - 10:00 PM",
  categories: [
    { title: "Dessert", desc: "Fresh baked cupcakes & cakes", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=200&q=80" },
    { title: "Coffee", desc: "Artisanal roasted espresso brews", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80" },
    { title: "Pastry", desc: "Crispy croissants & breads", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=200&q=80" }
  ],
  
  // Menu Items with Pricing
  menuItems: [
    { name: "Americano", desc: "Rich espresso diluted with hot water for a smooth finish", price: "₹180", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80" },
    { name: "Espresso", desc: "Concentrated shot of roasted beans with creamy foam", price: "₹140", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=300&q=80" },
    { name: "Cappuccino", desc: "Equal parts espresso, steamed milk, and rich foam", price: "₹220", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=300&q=80" },
    { name: "Cafe Latte", desc: "Espresso with silky micro-foam steamed milk", price: "₹240", image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=300&q=80" },
    { name: "Mocha", desc: "Espresso blended with dark chocolate and steamed milk", price: "₹260", image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=300&q=80" },
    { name: "Hazelnut Cold Coffee", desc: "Chilled blended espresso with roasted hazelnut syrup", price: "₹280", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=300&q=80" }
  ],

  // Retail / Packaged Coffee Beans
  packagedProducts: [
    { name: "Dark Roasted Beans 250g", price: "₹450", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&q=80" },
    { name: "Light Roast Blend 250g", price: "₹480", image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=300&q=80" },
    { name: "Arabica Whole Bean 500g", price: "₹850", image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=300&q=80" },
    { name: "Signature Blend 500g", price: "₹890", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&q=80" }
  ]
};

interface BusinessViewProps {
  data: BusinessPageData | null;
  businessName: string;
}

export default function CafeView({ data, businessName }: BusinessViewProps) {
  const { theme, setTheme, mounted }   = useThemeMode();
  const { copied, handleCopyLink }     = useCopyLink(data?.slug);
  usePageTracking(data?.slug);

  const [shareUrl, setShareUrl] = useState("");
  React.useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const { accentColor, productsList } = useBusinessPageData(data);

  const decodedBusinessName = React.useMemo(
    () => formatBusinessName(businessName, data?.business_name),
    [businessName, data?.business_name]
  );

  if (!data || !data.business_name) {
    return <OfflinePage />;
  }

  // Bind dynamic data / fallbacks to template
  const cafeExtra = data.template_data?.cafe;

  const cafeName = decodedBusinessName || mockCafeData.cafeName;
  const tagline = data.about_us || cafeExtra?.tagline || mockCafeData.tagline;
  const phoneNumber = data.mobile_number || mockCafeData.phone;
  const opdTiming = cafeExtra?.timing || mockCafeData.timing;
  const clinicAddress = data.location_address || "Ground Floor, Sunrise Boulevard, Sector 15";
  const emailAddress = data.email_address || mockCafeData.email;

  const categories = cafeExtra?.categories || mockCafeData.categories;
  const packagedProducts = cafeExtra?.packagedProducts || mockCafeData.packagedProducts;

  const menuListToRender = productsList.length > 0 
    ? productsList.map(p => ({ name: p.name, desc: p.description, price: `₹${p.price}`, image: p.imageUrl }))
    : mockCafeData.menuItems;

  // Contact Form Submission Handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const clientName = formData.get("clientName");
    const clientPhone = formData.get("clientPhone");
    const clientMessage = formData.get("clientMessage");
    alert(`Table reservation request received!\nName: ${clientName}\nPhone: ${clientPhone}\nDetails: ${clientMessage}`);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <div className="cafe-theme-wrapper">
      {/* ==========================================================================
           1. HEADER / NAVBAR
           ========================================================================== */}
      <header className="header">
        <div className="container navbar">
          <a href="#" className="logo">
            <i className="fa-solid fa-mug-hot"></i>
            <span>{cafeName}</span>
          </a>

          <nav>
            <ul className="nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#reservation">Reserve Table</a></li>
              <li><a href="#products">Products</a></li>
            </ul>
          </nav>

          <a href="#reservation" className="btn btn-brown">Book Table</a>
        </div>
      </header>

      {/* ==========================================================================
           2. HERO SECTION
           ========================================================================== */}
      <section id="home" className="hero">
        <div className="container hero-content">
          <h1>{cafeName}</h1>
          <p>{tagline}</p>
          <a href="#menu" className="btn btn-gold">View Full Menu</a>
        </div>
      </section>

      {/* 3 Category Feature Cards Below Hero */}
      <div className="container hero-categories">
        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <div key={idx} className={`cat-card ${idx === 1 ? "active-cat" : ""}`}>
              <img src={cat.img} alt={cat.title} />
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Drip Separator SVG */}
      <div className="drip-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

      {/* ==========================================================================
           3. ABOUT CAFE SECTION
           ========================================================================== */}
      <section id="about" className="about-section">
        <div className="container about-grid">
          <div className="about-text">
            <span>Taste The Difference</span>
            <h2>About Our Cafe</h2>
            <p>We source 100% organic Arabica beans directly from sustainable farms. Every cup is meticulously roasted and brewed by expert baristas to give you an unforgettable coffee experience.</p>
            <a href="#menu" className="btn btn-brown">Explore Menu</a>
          </div>

          <div className="about-img">
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" alt="Coffee Cup" />
          </div>
        </div>
      </section>

      {/* ==========================================================================
           4. DIGITAL MENU SECTION WITH PRICES
           ========================================================================== */}
      <section id="menu" className="menu-section">
        <div className="container">
          <div className="section-title">
            <span>Freshly Brewed</span>
            <h2>Our Popular Menu</h2>
            <p>Choose from our selection of hot espresso, chilled cold coffees, and signature beverages.</p>
          </div>

          <div className="menu-grid">
            {menuListToRender.map((item, idx) => (
              <div key={idx} className="menu-card">
                <img src={item.image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80"} alt={item.name} />
                <h3>{item.name}</h3>
                <p className="desc">{item.desc || "Handcrafted with premium selected espresso beans."}</p>
                <div className="price">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
           5. TABLE RESERVATION SECTION
           ========================================================================== */}
      <section id="reservation" className="reservation-section">
        <div className="container reservation-grid">
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.8rem", marginBottom: "16px" }}>More Than Just Coffee & Tea</h2>
            <p style={{ opacity: 0.9 }}>Reserve a cozy table for your meetings, work sessions, or weekend catch-ups with friends.</p>
          </div>

          <div className="reservation-form-card">
            <h3>Reserve Your Table</h3>
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <input type="text" name="clientName" className="form-control" placeholder="Your Full Name" required />
              </div>
              <div className="form-group">
                <input type="tel" name="clientPhone" className="form-control" placeholder="Phone Number" required />
              </div>
              <div className="form-group">
                <input type="date" className="form-control" required />
              </div>
              <div className="form-group">
                <select className="form-control" name="clientMessage" required>
                  <option value="">Select Guests</option>
                  <option value="1 - 2 People">1 - 2 People</option>
                  <option value="3 - 4 People">3 - 4 People</option>
                  <option value="5+ People Group">5+ People Group</option>
                </select>
              </div>
              <button type="submit" className="btn btn-brown" style={{ width: "100%" }}>Book Table Now</button>
            </form>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           6. PACKAGED PRODUCTS / MERCHANDISE SECTION
           ========================================================================== */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="section-title">
            <span>Take Home The Flavor</span>
            <h2>Coffee Beans & Products</h2>
            <p>Buy our specialty roasted coffee bags to brew your favorite coffee at home.</p>
          </div>

          <div className="products-grid">
            {packagedProducts.map((prod, idx) => (
              <div key={idx} className="product-card">
                <img src={prod.image} alt={prod.name} />
                <h4>{prod.name}</h4>
                <div className="prod-price">{prod.price}</div>
                <button className="btn btn-brown" style={{ padding: "8px 16px", fontSize: "0.85rem" }} onClick={() => alert(`Order inquiry sent for ${prod.name}`)}>Order Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
           7. FOOTER
           ========================================================================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--coffee-gold)" }}>{cafeName}</h3>
              <p>Handcrafted coffees, artisanal pastries, and warm ambiance tailored for every coffee lover.</p>
            </div>

            <div>
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Cafe</a></li>
                <li><a href="#menu">Digital Menu</a></li>
                <li><a href="#reservation">Reserve Table</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Opening Hours</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                {opdTiming}
              </p>
            </div>

            <div>
              <h4 className="footer-title">Contact Us</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                {phoneNumber}<br />
                {emailAddress}
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} {cafeName}. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
