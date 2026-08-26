"use client";

import { useThemeStore } from "@/store/themeStore";
import { contactInfo, translations } from "@/views/home-page/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const t = translations[language] || translations.en;

  const navLinks = [
    { label: t.nav_home, href: "/" },
    { label: t.nav_services, href: "/services" },
    { label: t.nav_pricing, href: "/pricing" },
    { label: t.nav_about, href: "/about" },
    { label: t.nav_reviews, href: "/testimonials" },
    { label: t.nav_blog, href: "/blog" },
    { label: t.nav_contact, href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-primary bg-background transition-colors duration-300">
      {/* BEGIN: Navigation - Glassmorphism floating header inspired by DigitalBusinessCard.com */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-outline/50 transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 sm:h-20 items-center justify-between">
            {/* Logo (Left side) */}
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <img
                src="/logo.svg"
                alt="MarketingSetu Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                      isActive
                        ? "text-brand-main bg-brand-lighter/60 dark:bg-brand-main/15 dark:text-brand-main font-semibold"
                        : "text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-gray-800/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Header Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language Switcher Pill */}
              {mounted && (
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as "en" | "mr" | "hi")}
                  className="bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 text-gray-800 dark:text-gray-200 text-xs font-semibold rounded-lg px-3 py-2 focus:ring-0 focus:outline-none cursor-pointer"
                >
                  <option value="en" className="dark:bg-brand-dark">EN</option>
                  <option value="mr" className="dark:bg-brand-dark">मराठी</option>
                  <option value="hi" className="dark:bg-brand-dark">हिंदी</option>
                </select>
              )}

              {/* Theme Toggle Button */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer text-xs font-semibold"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? "☀️" : "🌙"}
                </button>
              )}

              {/* Download App Action Button */}
              <Link
                href="/download"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download App
              </Link>

              {/* Primary Action Button */}
              <button
                onClick={() => handleWhatsAppChat()}
                className="bg-gray-950 hover:bg-gray-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer flex items-center gap-2"
              >
                Get Started
              </button>
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
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                    isActive
                      ? "text-brand-main bg-brand-lighter/60 dark:bg-brand-main/15"
                      : "text-brand-gray hover:text-brand-main dark:text-gray-300 dark:hover:text-white"
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
      <footer className="bg-gray-900 pt-16 pb-8 border-t border-gray-800 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <img
                  src="/logo.svg"
                  alt="MarketingSetu Logo"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
              <p className="text-sm leading-relaxed mb-6">
                The bridge between your business and your customers — WhatsApp marketing, landing pages, and local growth tools for Bharat's small businesses.
              </p>
            </div>
            <div>
              <h4 className="text-white font-heading font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link className="hover:text-brand-purple transition-colors" href="/about">About</Link></li>
                <li><Link className="hover:text-brand-purple transition-colors" href="/services">Services</Link></li>
                <li><Link className="hover:text-brand-purple transition-colors" href="/pricing">Pricing</Link></li>
                <li><Link className="hover:text-brand-purple transition-colors" href="/blog">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-heading font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link className="hover:text-brand-purple transition-colors" href="/services#whatsapp-marketing">WhatsApp Marketing</Link></li>
                <li><Link className="hover:text-brand-purple transition-colors" href="/services#landing-pages">Landing Page Design</Link></li>
                <li><Link className="hover:text-brand-purple transition-colors" href="/services#missed-call">Missed Call Auto Text</Link></li>
                <li><Link className="hover:text-brand-purple transition-colors" href="/services#google-business">Google Business Setup</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-heading font-semibold mb-4">Get in Touch</h4>
              <button
                onClick={() => handleWhatsAppChat()}
                className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors mb-4 border border-gray-700 cursor-pointer"
              >
                <span>{contactInfo.phone}</span>
              </button>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                  {contactInfo.email}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                  {contactInfo.location}
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© 2026 MarketingSetu. All rights reserved.</p>
            <div className="flex gap-4">
              <Link className="hover:text-white transition-colors" href="/privacy-policy">Privacy Policy</Link>
              <Link className="hover:text-white transition-colors" href="/terms">Terms of Service</Link>
            </div>
          </div>
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
