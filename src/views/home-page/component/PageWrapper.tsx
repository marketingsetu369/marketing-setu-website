"use client";

import { useThemeStore } from "@/store/themeStore";
import { WA_DEFAULT_MSG, WA_NUMBER, contactInfo, navLinks, translations } from "@/views/home-page/data";
import { Logo } from "@/views/home-page/svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const { theme, toggleTheme, language, setLanguage } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Sync theme with DOM documentElement
  useEffect(() => {
    setMounted(true);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Setup Intersection Observer for reveal effects
  useEffect(() => {
    if (!mounted) return;
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [mounted, pathname]);

  const handleWhatsAppChat = (message?: string) => {
    const msg = message ?? WA_DEFAULT_MSG;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const t = translations[language] || translations.en;

  // Map static paths to translations keys
  const navLabelKeys: Record<string, keyof typeof t> = {
    "/": "nav_home",
    "/services": "nav_services",
    "/pricing": "nav_pricing",
    "/about": "nav_about",
    "/testimonials": "nav_reviews",
    "/blog": "nav_blog",
    "/contact": "nav_contact",
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* HEADER / NAVIGATION */}
      <header className="site">
        <div className="container nav-wrap">
          <Link href="/" className="logo">
            <Logo />
            Marketing<span className="setu">Setu</span>
          </Link>

          <nav className={`links ${isMobileMenuOpen ? "open" : ""}`} id="navLinks">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const translationKey = navLabelKeys[link.href];
              const labelText = translationKey ? t[translationKey] : link.label;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={isActive ? "active" : ""}
                >
                  {labelText}
                </Link>
              );
            })}

            {/* Mobile-only menu items inside collapsible drawer */}
            {mounted && (
              <div className="mobile-only-controls">
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value as "en" | "mr" | "hi");
                    setIsMobileMenuOpen(false);
                  }}
                  className="lang-select mobile-select"
                  aria-label="Select language"
                >
                  <option value="en">English</option>
                  <option value="mr">मराठी</option>
                  <option value="hi">हिन्दी</option>
                </select>
                <button
                  className="icon-btn mobile-theme-btn"
                  aria-label="Toggle dark mode"
                  type="button"
                  onClick={() => {
                    toggleTheme();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
              </div>
            )}
          </nav>

          <div className="nav-actions">
            {/* Desktop-only controls (hidden on mobile screen) */}
            {mounted && (
              <>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as "en" | "mr" | "hi")}
                  className="lang-select desktop-only"
                  aria-label="Select language"
                >
                  <option value="en">English</option>
                  <option value="mr">मराठी</option>
                  <option value="hi">हिन्दी</option>
                </select>
                <button
                  className="icon-btn desktop-only"
                  id="themeToggle"
                  aria-label="Toggle dark mode"
                  type="button"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? "☀️" : "🌙"}
                </button>
              </>
            )}
            <button
              onClick={() => handleWhatsAppChat()}
              className="btn btn-whatsapp flex items-center gap-2"
            >
              <span>💬</span>
              <span className="long">{t.nav_whatsapp_btn}</span>
            </button>
            <button
              className="icon-btn menu-toggle"
              id="menuToggle"
              aria-label="Open menu"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>
          </div>

        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="site">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">
                <Logo />
                MarketingSetu
              </div>
              <p style={{ color: "rgba(255,255,255,.65)", fontSize: "14px", maxWidth: "280px" }}>
                {t.footer_tagline}
              </p>
            </div>
            <div>
              <h4>{t.footer_company}</h4>
              <ul>
                <li><Link href="/about">{t.nav_about}</Link></li>
                <li><Link href="/services">{t.nav_services}</Link></li>
                <li><Link href="/pricing">{t.nav_pricing}</Link></li>
                <li><Link href="/blog">{t.nav_blog}</Link></li>
              </ul>
            </div>
            <div>
              <h4>{t.footer_services}</h4>
              <ul>
                <li><Link href="/services#whatsapp-marketing">WhatsApp Marketing</Link></li>
                <li><Link href="/services#landing-pages">Landing Page Design</Link></li>
                <li><Link href="/services#missed-call">Missed Call Auto Text</Link></li>
                <li><Link href="/services#google-business">Google Business Setup</Link></li>
              </ul>
            </div>
            <div>
              <h4>{t.footer_get_in_touch}</h4>
              <ul>
                <li>
                  <button
                    onClick={() => handleWhatsAppChat()}
                    className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-left text-inherit"
                    style={{ font: "inherit" }}
                  >
                    💬 {contactInfo.phone}
                  </button>
                </li>
                <li><a href={`mailto:${contactInfo.email}`}>📧 {contactInfo.email}</a></li>
                <li><span>📍 {contactInfo.location}</span></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{t.footer_rights}</span>
            <span>
              <Link href="/privacy-policy">{t.footer_privacy}</Link> &nbsp;·&nbsp; <Link href="/terms">{t.footer_terms}</Link>
            </span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => handleWhatsAppChat()}
        className="wa-float border-none cursor-pointer flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        💬
      </button>
    </div>
  );
}
