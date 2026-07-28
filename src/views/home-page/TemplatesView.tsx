"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PageWrapper } from "@/views/home-page/component";
import "./templates.css";

// ── Types ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "All", "Healthcare", "Beauty & Wellness", "Food & Dining",
  "Hospitality", "Fitness", "Real Estate", "Retail", "Nature", "Creative",
] as const;
type Category = (typeof CATEGORIES)[number];

interface TemplateCard {
  id: string;
  name: string;
  slug: string;
  category: Category;
  description: string;
  emoji: string;
  accent: string;
  accentRgb: string;
  tags: string[];
  preview: string;
  isPopular?: boolean;
  isNew?: boolean;
}

// ── Template data ──────────────────────────────────────────────────────────────

const TEMPLATES: TemplateCard[] = [
  {
    id: "doctor",
    name: "Doctor & Clinic",
    slug: "doctor",
    category: "Healthcare",
    description: "Premium portfolio layout for doctors, clinics & specialists. Features hero, stats strip, services, timings, and contact.",
    emoji: "🩺",
    accent: "#0ea5e9",
    accentRgb: "14,165,233",
    tags: ["Clinic", "Hospital", "Dentist", "Physician"],
    preview: "Professional · Stats · Timeline",
    isPopular: true,
  },
  {
    id: "salon",
    name: "Salon & Spa",
    slug: "salon",
    category: "Beauty & Wellness",
    description: "Elegant full-page template for salons, spas, beauty parlours and barbers. Playfair serif headings, gallery & testimonials.",
    emoji: "💇",
    accent: "#ec4899",
    accentRgb: "236,72,153",
    tags: ["Hair Salon", "Spa", "Beauty", "Makeup"],
    preview: "Elegant · Gallery · Reviews",
    isPopular: true,
  },
  {
    id: "hotel",
    name: "Hotel & Resort",
    slug: "hotel",
    category: "Hospitality",
    description: "Bespoke luxury dark-mode hotel layout with hero, suite cards, perks section and booking CTA.",
    emoji: "🏨",
    accent: "#b45309",
    accentRgb: "180,83,9",
    tags: ["Hotel", "Resort", "Inn", "Lodge"],
    preview: "Luxury · Dark Mode · Suites",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    slug: "restaurant",
    category: "Food & Dining",
    description: "Bold & dramatic layout for restaurants with hero section, menu grid, chef's special, and a testimonial strip.",
    emoji: "🍽️",
    accent: "#dc2626",
    accentRgb: "220,38,38",
    tags: ["Restaurant", "Dining", "Bistro", "Bar"],
    preview: "Bold · Menu Grid · Dramatic",
  },
  {
    id: "cafe",
    name: "Café & Coffee",
    slug: "cafe",
    category: "Food & Dining",
    description: "Warm & cosy layout for cafés, coffee shops, and bistros with a menu showcase and ambient vibe.",
    emoji: "☕",
    accent: "#92400e",
    accentRgb: "146,64,14",
    tags: ["Cafe", "Coffee", "Bistro", "Espresso"],
    preview: "Cosy · Menu · Warm tones",
    isNew: true,
  },
  {
    id: "gym",
    name: "Gym & Fitness",
    slug: "gym",
    category: "Fitness",
    description: "High-energy, bold layout for gyms, fitness studios, and personal trainers with membership plans.",
    emoji: "💪",
    accent: "#16a34a",
    accentRgb: "22,163,74",
    tags: ["Gym", "Fitness", "CrossFit", "Studio"],
    preview: "Bold · Energy · Plans",
  },
  {
    id: "realEstate",
    name: "Real Estate",
    slug: "realEstate",
    category: "Real Estate",
    description: "Clean, trust-building layout for property agents, brokers, and real estate firms with listings showcase.",
    emoji: "🏠",
    accent: "#7c3aed",
    accentRgb: "124,58,237",
    tags: ["Property", "Broker", "Realtor", "Housing"],
    preview: "Clean · Listings · Trust",
  },
  {
    id: "jewellery",
    name: "Jewellery Store",
    slug: "jewellery",
    category: "Retail",
    description: "Luxurious, golden-accented layout for jewellery shops, gold & silver stores, and diamond boutiques.",
    emoji: "💍",
    accent: "#d97706",
    accentRgb: "217,119,6",
    tags: ["Jewellery", "Gold", "Diamond", "Silver"],
    preview: "Luxury · Golden · Boutique",
    isNew: true,
  },
  {
    id: "bakery",
    name: "Bakery & Cakes",
    slug: "bakery",
    category: "Food & Dining",
    description: "Sweet & inviting template for bakeries, cake shops, and pastry studios with product showcase.",
    emoji: "🎂",
    accent: "#db2777",
    accentRgb: "219,39,119",
    tags: ["Bakery", "Cake", "Pastry", "Bread"],
    preview: "Sweet · Warm · Showcase",
  },
  {
    id: "nursery",
    name: "Nursery & Garden",
    slug: "nursery",
    category: "Nature",
    description: "Fresh, earthy layout for plant nurseries, garden centres, and flower shops with green aesthetics.",
    emoji: "🌱",
    accent: "#15803d",
    accentRgb: "21,128,61",
    tags: ["Nursery", "Plant", "Garden", "Flower"],
    preview: "Fresh · Green · Earthy",
  },
  {
    id: "travel",
    name: "Travel & Tours",
    slug: "travel",
    category: "Creative",
    description: "Adventure-inspired layout for travel agencies, tour operators, and holiday planners.",
    emoji: "✈️",
    accent: "#0891b2",
    accentRgb: "8,145,178",
    tags: ["Travel", "Tour", "Holiday", "Trip"],
    preview: "Adventure · Bold · Explore",
  },
  {
    id: "photographer",
    name: "Photographer",
    slug: "photographer",
    category: "Creative",
    description: "Dark, dramatic portfolio layout for photographers, videographers, and creative professionals.",
    emoji: "📸",
    accent: "#1e293b",
    accentRgb: "30,41,59",
    tags: ["Photography", "Portfolio", "Camera", "Shoot"],
    preview: "Dark · Portfolio · Cinematic",
  },
  {
    id: "starter",
    name: "General Business",
    slug: "starter",
    category: "Retail",
    description: "Clean two-column starter template for any business — sidebar with quick actions, products grid, gallery, and share.",
    emoji: "🏪",
    accent: "#4f46e5",
    accentRgb: "79,70,229",
    tags: ["Generic", "Store", "Local Business", "Any"],
    preview: "Versatile · Sidebar · Clean",
  },
];

// ── Sample JSON data shown in the preview drawer ───────────────────────────────

const SAMPLE_JSON = {
  slug: "your-business-name",
  business_name: "Your Business Name",
  business_category: "Doctor / Salon / Hotel …",
  about_us: "A short description about your business, your story, and what makes you special.",
  mobile_number: "+91 98765 43210",
  email_address: "hello@yourbusiness.com",
  location_address: "MG Road, Pune, Maharashtra",
  theme_color_hex: "#0ea5e9",
  logo_url: "https://example.com/logo.png",
  facebook_link: "https://facebook.com/yourbusiness",
  instagram_link: "https://instagram.com/yourbusiness",
  website_link: "https://yourbusiness.com",
  products: [
    { name: "Service / Product 1", description: "Description of the service or product.", price: "₹999" },
    { name: "Service / Product 2", description: "Description of the service or product.", price: "₹1,499" },
  ],
  gallery_images: [
    "https://example.com/photo1.jpg",
    "https://example.com/photo2.jpg",
    "https://example.com/photo3.jpg",
  ],
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function TemplatesView() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateCard | null>(null);
  const [jsonCopied, setJsonCopied] = useState(false);

  const filtered = useMemo(() => {
    let list = TEMPLATES;
    if (activeCategory !== "All") {
      list = list.filter((t) => t.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const handleCopyJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(SAMPLE_JSON, null, 2));
    setJsonCopied(true);
    setTimeout(() => setJsonCopied(false), 2000);
  };

  return (
    <PageWrapper>
      {/* ── HERO ── */}
      <section className="tpl-hero">
        <div className="tpl-hero-bg" />
        <div className="container">
          <div className="tpl-hero-content">
            <span className="eyebrow">13 Ready-Made Templates</span>
            <h1 className="tpl-hero-title">
              Beautiful templates for<br />
              <span className="gradient-text">every business</span>
            </h1>
            <p className="tpl-hero-lead">
              Pick a template, drop in your JSON data, and your business page goes live instantly.
              Each template auto-adapts to your brand color, logo, products, and gallery.
            </p>
            <div className="tpl-hero-actions">
              <button className="btn btn-primary" onClick={() => setPreviewTemplate(TEMPLATES[0])}>
                ✦ See JSON Structure
              </button>
              <Link href="/contact" className="btn btn-ghost">
                Get Your Page Built →
              </Link>
            </div>
          </div>

          {/* floating stat chips */}
          <div className="tpl-hero-chips">
            <div className="tpl-chip">
              <span className="tpl-chip-dot" style={{ background: "#10b981" }} />
              13 Industry Templates
            </div>
            <div className="tpl-chip" style={{ animationDelay: "0.3s" }}>
              <span className="tpl-chip-dot" style={{ background: "#6366f1" }} />
              1 JSON → Any Template
            </div>
            <div className="tpl-chip" style={{ animationDelay: "0.6s" }}>
              <span className="tpl-chip-dot" style={{ background: "#f59e0b" }} />
              Mobile-First Design
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS STRIP ── */}
      <section className="tpl-how-strip">
        <div className="container">
          <div className="tpl-how-grid">
            {[
              { step: "01", icon: "📋", title: "Fill Your JSON Data", desc: "Add your business name, category, contact, products, and gallery links." },
              { step: "02", icon: "🎨", title: "Choose a Template", desc: "Pick from 13 industry-specific templates. The right one auto-selects based on your category." },
              { step: "03", icon: "🚀", title: "Go Live Instantly", desc: "Your branded business page is live at marketingsetu.com/your-business." },
            ].map((item) => (
              <div key={item.step} className="tpl-how-item reveal">
                <div className="tpl-how-number">{item.step}</div>
                <div className="tpl-how-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES GRID ── */}
      <section className="tpl-gallery-section">
        <div className="container">

          {/* Search + Filter bar */}
          <div className="tpl-filter-bar">
            <div className="tpl-search-wrap">
              <span className="tpl-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search templates…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="tpl-search-input"
              />
              {searchQuery && (
                <button className="tpl-search-clear" onClick={() => setSearchQuery("")}>✕</button>
              )}
            </div>
            <div className="tpl-category-pills">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`tpl-cat-pill ${activeCategory === cat ? "active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <p className="tpl-result-count">
            Showing <strong>{filtered.length}</strong> template{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && <> in <em>{activeCategory}</em></>}
          </p>

          {/* Cards grid */}
          {filtered.length > 0 ? (
            <div className="tpl-grid">
              {filtered.map((template, i) => (
                <article
                  key={template.id}
                  className="tpl-card reveal"
                  style={{ "--tpl-accent": template.accent, "--tpl-accent-rgb": template.accentRgb, animationDelay: `${i * 0.06}s` } as React.CSSProperties}
                >
                  {/* Card top preview area */}
                  <div className="tpl-card-preview">
                    <div className="tpl-card-preview-bg" />
                    <div className="tpl-card-browser">
                      <div className="tpl-browser-bar">
                        <span className="tpl-browser-dot" style={{ background: "#ef4444" }} />
                        <span className="tpl-browser-dot" style={{ background: "#f59e0b" }} />
                        <span className="tpl-browser-dot" style={{ background: "#22c55e" }} />
                        <span className="tpl-browser-url">marketingsetu.com/{template.slug}</span>
                      </div>
                      <div className="tpl-browser-body">
                        <div className="tpl-mini-header" style={{ background: template.accent }}>
                          <div className="tpl-mini-logo">{template.emoji}</div>
                          <div className="tpl-mini-lines">
                            <div className="tpl-mini-line wide" />
                            <div className="tpl-mini-line" />
                          </div>
                        </div>
                        <div className="tpl-mini-content">
                          <div className="tpl-mini-block tall" style={{ background: `rgba(${template.accentRgb},0.08)` }} />
                          <div className="tpl-mini-row">
                            <div className="tpl-mini-block" style={{ background: `rgba(${template.accentRgb},0.05)` }} />
                            <div className="tpl-mini-block" style={{ background: `rgba(${template.accentRgb},0.05)` }} />
                            <div className="tpl-mini-block" style={{ background: `rgba(${template.accentRgb},0.05)` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tpl-card-emoji">{template.emoji}</div>
                    {template.isPopular && <span className="tpl-badge popular">⭐ Popular</span>}
                    {template.isNew && <span className="tpl-badge new">✦ New</span>}
                  </div>

                  {/* Card body */}
                  <div className="tpl-card-body">
                    <div className="tpl-card-meta">
                      <span className="tpl-card-cat">{template.category}</span>
                      <span className="tpl-card-preview-label">{template.preview}</span>
                    </div>
                    <h3 className="tpl-card-name">{template.name}</h3>
                    <p className="tpl-card-desc">{template.description}</p>
                    <div className="tpl-card-tags">
                      {template.tags.map((tag) => (
                        <span key={tag} className="tpl-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="tpl-card-actions">
                      <button
                        className="tpl-btn-preview"
                        onClick={() => setPreviewTemplate(template)}
                        style={{ "--tpl-accent": template.accent } as React.CSSProperties}
                      >
                        📋 View JSON Structure
                      </button>
                      <Link
                        href={`/${template.slug}-demo`}
                        className="tpl-btn-live"
                        style={{ background: template.accent } as React.CSSProperties}
                      >
                        Live Preview →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="tpl-empty">
              <div className="tpl-empty-icon">🔍</div>
              <h3>No templates found</h3>
              <p>Try a different search or category filter.</p>
              <button className="btn btn-ghost" onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── JSON STRUCTURE CTA SECTION ── */}
      <section className="tpl-json-section">
        <div className="container">
          <div className="tpl-json-card">
            <div className="tpl-json-left">
              <span className="eyebrow">Data Structure</span>
              <h2>One JSON object, any template</h2>
              <p>
                Every template reads the same JSON shape. Just fill in your details — the right
                template auto-renders based on your <code>business_category</code> field.
              </p>
              <ul className="tpl-json-features">
                {[
                  "Auto-picks the best template for your business type",
                  "Theme color from your hex code — no CSS needed",
                  "Products, gallery images & social links all included",
                  "SEO metadata generated from your data automatically",
                ].map((f) => (
                  <li key={f}>
                    <span className="tpl-check">✓</span> {f}
                  </li>
                ))}
              </ul>
              <div className="tpl-json-actions">
                <button className="btn btn-primary" onClick={() => setPreviewTemplate(TEMPLATES[0])}>
                  View Full JSON Schema
                </button>
                <Link href="/contact" className="btn btn-ghost">Talk to Us →</Link>
              </div>
            </div>
            <div className="tpl-json-right">
              <div className="tpl-json-snippet">
                <div className="tpl-snippet-header">
                  <div className="tpl-snippet-dots">
                    <span /><span /><span />
                  </div>
                  <span className="tpl-snippet-filename">business-data.json</span>
                  <button className="tpl-snippet-copy" onClick={handleCopyJson}>
                    {jsonCopied ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="tpl-snippet-code">{`{
  "business_name": "Dr. Priya Sharma",
  "business_category": "Cardiologist",
  "theme_color_hex": "#0ea5e9",
  "about_us": "15+ years of cardiac care…",
  "mobile_number": "+91 98765 43210",
  "location_address": "Pune, MH",
  "products": [
    {
      "name": "ECG Test",
      "price": "₹500"
    }
  ],
  "gallery_images": [
    "https://…/clinic1.jpg"
  ]
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── JSON DRAWER / MODAL ── */}
      {previewTemplate && (
        <div className="tpl-drawer-overlay" onClick={() => setPreviewTemplate(null)}>
          <div className="tpl-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="tpl-drawer-header" style={{ "--tpl-accent": previewTemplate.accent } as React.CSSProperties}>
              <div className="tpl-drawer-title-row">
                <span className="tpl-drawer-emoji">{previewTemplate.emoji}</span>
                <div>
                  <h3 className="tpl-drawer-name">{previewTemplate.name} Template</h3>
                  <p className="tpl-drawer-sub">JSON data structure to populate this template</p>
                </div>
              </div>
              <button className="tpl-drawer-close" onClick={() => setPreviewTemplate(null)}>✕</button>
            </div>

            <div className="tpl-drawer-body">
              <div className="tpl-drawer-info">
                <p className="tpl-drawer-tip">
                  💡 This template is auto-selected when your <code>business_category</code> includes one of:&nbsp;
                  <strong>{previewTemplate.tags.join(", ")}</strong>
                </p>
              </div>

              <div className="tpl-snippet-header">
                <div className="tpl-snippet-dots">
                  <span /><span /><span />
                </div>
                <span className="tpl-snippet-filename">business-data.json</span>
                <button className="tpl-snippet-copy" onClick={handleCopyJson}>
                  {jsonCopied ? "✓ Copied!" : "📋 Copy JSON"}
                </button>
              </div>
              <pre className="tpl-drawer-code">{JSON.stringify(SAMPLE_JSON, null, 2)}</pre>

              <div className="tpl-drawer-fields">
                <h4>Field Reference</h4>
                <div className="tpl-fields-grid">
                  {[
                    { field: "slug", type: "string", required: true, desc: "URL slug for the page: /your-slug" },
                    { field: "business_name", type: "string", required: true, desc: "Business display name" },
                    { field: "business_category", type: "string", required: true, desc: "Determines which template is used" },
                    { field: "theme_color_hex", type: "string", required: false, desc: "Brand color e.g. #0ea5e9" },
                    { field: "about_us", type: "string", required: false, desc: "Short business description / bio" },
                    { field: "mobile_number", type: "string", required: false, desc: "Primary contact number (used in Call / WhatsApp buttons)" },
                    { field: "email_address", type: "string", required: false, desc: "Contact email" },
                    { field: "location_address", type: "string", required: false, desc: "Physical address for Directions button" },
                    { field: "logo_url", type: "string", required: false, desc: "URL to your logo image" },
                    { field: "products[]", type: "array", required: false, desc: "List of services/products with name, description, price, imageUrl" },
                    { field: "gallery_images[]", type: "array", required: false, desc: "List of image URLs for the gallery section" },
                    { field: "facebook_link", type: "string", required: false, desc: "Facebook page URL" },
                    { field: "instagram_link", type: "string", required: false, desc: "Instagram profile URL" },
                    { field: "website_link", type: "string", required: false, desc: "Your existing website URL" },
                  ].map((row) => (
                    <div key={row.field} className="tpl-field-row">
                      <div className="tpl-field-name-wrap">
                        <code className="tpl-field-code">{row.field}</code>
                        {row.required && <span className="tpl-field-required">required</span>}
                      </div>
                      <span className="tpl-field-type">{row.type}</span>
                      <span className="tpl-field-desc">{row.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="tpl-drawer-footer">
              <Link href="/contact" className="btn btn-primary" onClick={() => setPreviewTemplate(null)}>
                🚀 Get Your Page Built
              </Link>
              <button className="btn btn-ghost" onClick={() => setPreviewTemplate(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
