"use client";

import { useThemeStore } from "@/store/themeStore";
import { contactInfo, translations } from "@/views/home-page/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatedLogo } from "@/components/common";
import { useWhatsApp } from "./useWhatsApp";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const { language, setLanguage, theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Rehydrate persisted zustand store on client after mount
    useThemeStore.persist.rehydrate();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme, mounted]);

  const { openWhatsApp: handleWhatsAppChat } = useWhatsApp();
  // Ensure SSR renders default English consistently to avoid hydration mismatch with localStorage
  const activeLanguage = mounted ? language : "en";
  const t = translations[activeLanguage] || translations.en;

  const navLinks = [
    { label: t.nav_home, href: "/" },
    { label: t.nav_services, href: "/services" },
    { label: t.nav_about, href: "/about" },
    { label: "Tips & Tutorials", href: "https://www.youtube.com/@marketingsetu", isExternal: true },
    { label: t.nav_blog, href: "/blog" },
    { label: t.nav_contact, href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-primary bg-background transition-colors duration-300">
      {/* BEGIN: Navigation - Modern floating header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 sm:h-20 items-center justify-between gap-6">
            {/* Logo (Left side) */}
            <div className="flex items-center gap-12 sm:gap-14 lg:gap-16">
              <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 group">
                <AnimatedLogo className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105" />
                <span className="text-lg sm:text-xl font-bold tracking-tight text-primary font-sans flex items-center">
                  Marketing<span className="text-brand-secondary font-black ml-0.5">Setu</span>
                </span>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                {navLinks.map((link) => {
                  const isActive =
                    !link.isExternal &&
                    (link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href));

                  if (link.isExternal) {
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm py-1 font-semibold transition-colors text-primary hover:text-brand-secondary"
                      >
                        {link.label}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm py-1 font-semibold transition-colors ${
                        isActive
                          ? "text-brand-secondary"
                          : "text-primary hover:text-brand-secondary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="hidden md:flex items-center gap-2.5">
              {/* Language Switcher Pill */}
              {mounted && (
                <div className="relative flex items-center">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as "en" | "mr" | "hi")}
                    className="appearance-none font-sans rounded-full cursor-pointer pl-3 pr-6 py-2 text-[13px] bg-transparent text-primary font-semibold border border-outline hover:bg-neutral/60 transition-colors focus:outline-none"
                  >
                    <option value="en" className="dark:bg-grey-900">EN</option>
                    <option value="mr" className="dark:bg-grey-900">मराठी</option>
                    <option value="hi" className="dark:bg-grey-900">हिंदी</option>
                  </select>
                  <svg className="w-3 h-3 text-secondary pointer-events-none absolute right-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}

              {/* Theme Toggle Button */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="w-9 h-9 rounded-full bg-transparent hover:bg-neutral/60 border border-outline text-secondary hover:text-primary transition-colors cursor-pointer flex items-center justify-center shrink-0"
                  aria-label="Toggle theme"
                  title={theme === "dark" ? "Switch to Light mode" : "Switch to Dark mode"}
                >
                  {theme === "dark" ? (
                    <svg className="w-4 h-4 text-warning-main" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-grey-700 dark:text-grey-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              )}

              {/* Download App Pill Button */}
              <Link
                href="/download"
                className="inline-flex items-center gap-1.5 font-sans rounded-full cursor-pointer px-4 py-2 text-[13px] sm:text-[14px] bg-transparent text-primary font-semibold border border-outline hover:bg-neutral/60 transition-colors"
              >
                <span>Download App</span>
                <svg className="w-4 h-4 text-secondary shrink-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Login Button */}
              <Link
                href="/login"
                className="inline-flex items-center justify-center font-sans rounded-full cursor-pointer px-5 py-2 text-[13px] sm:text-[14px] bg-brand-main hover:bg-brand-dark text-white font-semibold transition-colors shadow-2xs hover:shadow-sm"
              >
                Login
              </Link>
            </div>

            {/* Mobile Actions & Menu Toggle */}
            <div className="md:hidden flex items-center gap-3">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-1 rounded-full text-gray-600 dark:text-gray-300 cursor-pointer"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? "☀️" : "🌙"}
                </button>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-gray dark:text-gray-300 p-2 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Collapse Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-outline px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => {
              const isActive =
                !link.isExternal &&
                (link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href));

              if (link.isExternal) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-semibold py-2 px-3 rounded-lg transition-colors text-primary hover:text-brand-secondary dark:text-gray-300 dark:hover:text-brand-secondary"
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                    isActive
                      ? "text-brand-secondary bg-brand-light dark:bg-brand-secondary/10"
                      : "text-primary hover:text-brand-secondary dark:text-gray-300 dark:hover:text-brand-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              {mounted && (
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value as "en" | "mr" | "hi");
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-transparent border-none text-gray-700 dark:text-gray-200 text-sm font-semibold focus:ring-0 focus:outline-none cursor-pointer py-2"
                >
                  <option value="en" className="dark:bg-brand-dark">English</option>
                  <option value="mr" className="dark:bg-brand-dark">मराठी</option>
                  <option value="hi" className="dark:bg-brand-dark">हिंदी</option>
                </select>
              )}
              <button
                onClick={() => {
                  handleWhatsAppChat();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </button>
            </div>
          </div>
        )}
      </nav>
      {/* END: Navigation */}

      {/* Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* BEGIN: Footer */}
      <footer className="bg-background pt-8 pb-10 sm:pt-10 sm:pb-12 border-t border-outline/40 text-primary">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-y-12 lg:grid lg:grid-cols-[2.2fr_1fr_1fr_1fr_1fr] lg:gap-x-10">
            {/* Column 1: Logo & Tagline */}
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <AnimatedLogo className="h-8 sm:h-9 w-auto object-contain" />
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-primary font-sans flex items-center">
                  Marketing<span className="text-brand-secondary font-black ml-0.5">Setu</span>
                </span>
              </Link>
              <p className="mt-6 max-w-[320px] text-[14px] leading-[1.6] text-secondary font-normal">
                The bridge between your business and your customers — WhatsApp marketing, landing pages, and local growth tools for Bharat&apos;s small businesses.
              </p>
            </div>

            {/* Column 2: Resources */}
            <div>
              <h3 className="font-semibold text-[14px] text-primary tracking-tight">
                Resources
              </h3>
              <div className="mt-5 flex flex-col items-start gap-4">
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector("#faq");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="text-[14px] text-secondary hover:text-primary transition-colors font-normal"
                >
                  Frequently Asked
                </a>
                <Link
                  href="/services"
                  className="text-[14px] text-secondary hover:text-primary transition-colors font-normal"
                >
                  Services
                </Link>
                <Link
                  href="/blog"
                  className="text-[14px] text-secondary hover:text-primary transition-colors font-normal"
                >
                  Tutorials & Blog
                </Link>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-[14px] text-secondary hover:text-primary transition-colors font-normal"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h3 className="font-semibold text-[14px] text-primary tracking-tight">
                Legal
              </h3>
              <div className="mt-5 flex flex-col items-start gap-4">
                <Link
                  href="/terms"
                  className="text-[14px] text-secondary hover:text-primary transition-colors font-normal"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href="/privacy-policy"
                  className="text-[14px] text-secondary hover:text-primary transition-colors font-normal"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/contact"
                  className="text-[14px] text-secondary hover:text-primary transition-colors font-normal"
                >
                  Report Abuse
                </Link>
              </div>
            </div>

            {/* Column 4: Services */}
            <div>
              <h3 className="font-semibold text-[14px] text-primary tracking-tight">
                {t.footer_services || "Services"}
              </h3>
              <div className="mt-5 flex flex-col items-start gap-4">
                <Link
                  href="/services#whatsapp-marketing"
                  className="text-[14px] text-secondary hover:text-primary transition-colors font-normal"
                >
                  {t.service_wa_title || "WhatsApp Marketing"}
                </Link>
                <Link
                  href="/services#landing-pages"
                  className="text-[14px] text-secondary hover:text-primary transition-colors font-normal"
                >
                  {t.service_lp_title || "Landing Page Design"}
                </Link>
                <Link
                  href="/services#missed-call"
                  className="text-[14px] text-secondary hover:text-primary transition-colors font-normal"
                >
                  {t.service_mc_title || "Missed Call Auto Text"}
                </Link>
                <Link
                  href="/services#google-business"
                  className="text-[14px] text-secondary hover:text-primary transition-colors font-normal"
                >
                  {t.service_gb_title || "Google Business Setup"}
                </Link>
                <Link
                  href="/tools/whatsapp-link-generator"
                  className="text-[14px] text-secondary hover:text-primary transition-colors font-normal"
                >
                  WhatsApp Link Generator
                </Link>
                <Link
                  href="/tools/standee-generator"
                  className="text-[14px] text-secondary hover:text-primary transition-colors font-normal"
                >
                  QR Standee & Flyer
                </Link>
              </div>
            </div>

            {/* Column 5: Follow Us */}
            <div>
              <h3 className="font-semibold text-[14px] text-primary tracking-tight">
                Follow Us
              </h3>
              <div className="mt-5 flex items-center gap-3.5 text-primary">
                {/* Instagram */}
                <a
                  href="https://instagram.com/marketingsetu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full border border-outline/70 flex items-center justify-center hover:bg-neutral transition-colors text-primary"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com/marketingsetu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full border border-outline/70 flex items-center justify-center hover:bg-neutral transition-colors text-primary"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/@marketingsetu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full border border-outline/70 flex items-center justify-center hover:bg-neutral transition-colors text-primary"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Line */}
          <p className="mt-16 sm:mt-20 font-sans text-[12px] text-disabled">
            Copyright © {new Date().getFullYear()} MarketingSetu. All Rights Reserved.
          </p>
        </div>
      </footer>
      {/* END: Footer */}

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => handleWhatsAppChat()}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/40 hover:scale-110 transition-transform z-50 border-none cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </button>
    </div>
  );
}
