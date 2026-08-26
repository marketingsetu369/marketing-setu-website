"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PortalLayoutProps {
  children: React.ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, initFromStorage, logout } = useAuthStore();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-brand-main border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-secondary">Loading Merchant Portal...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    {
      label: "Overview",
      href: "/portal",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: "Business Page",
      href: "/portal/business-page",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      label: "Customer Inquiries",
      href: "/portal/enquiries",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      label: "Plan & Billing",
      href: "/portal/billing",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col min-[991px]:flex-row">
      {/* Sidebar - Desktop (>= 991px) */}
      <aside className="hidden min-[991px]:flex min-[991px]:w-64 flex-col justify-between border-r border-outline bg-paper p-5 sticky top-0 h-screen flex-shrink-0">
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="MarketingSetu" className="h-8 w-auto" />
              <div>
                <span className="font-extrabold text-base tracking-tight text-primary block leading-none">
                  MarketingSetu
                </span>
                <span className="text-[10px] font-bold text-brand-main uppercase tracking-wider block mt-0.5">
                  Merchant Hub
                </span>
              </div>
            </Link>
          </div>

          {/* User Brief Card */}
          <div className="p-3.5 rounded-xl border border-outline bg-neutral">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-lighter text-brand-main flex items-center justify-center font-bold text-sm uppercase">
                {user?.firstName?.[0] || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-primary truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-secondary truncate font-medium">{user?.phone}</p>
              </div>
            </div>
            {user?.plan && (
              <div className="mt-2.5 pt-2 border-t border-outline flex items-center justify-between text-[11px]">
                <span className="text-secondary font-medium">Active Tier</span>
                <span className="font-bold uppercase text-brand-main px-2 py-0.5 rounded-md bg-brand-lighter/80">
                  {user?.plan}
                </span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-brand-main text-white shadow-sm"
                      : "text-secondary hover:text-primary hover:bg-neutral"
                  }`}
                >
                  <span className={active ? "text-white" : "text-secondary"}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-outline space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-secondary hover:text-primary border border-outline hover:bg-neutral transition-colors"
          >
            <span>Visit Website</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-error-main hover:bg-error-lighter/20 border border-error-light/30 transition-colors"
          >
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Top Header for Mobile/Tablet (< 991px) */}
      <header className="min-[991px]:hidden flex items-center justify-between px-4 py-3.5 border-b border-outline bg-paper sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="MarketingSetu" className="h-7 w-auto" />
          <span className="font-bold text-sm text-primary">MarketingSetu</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="p-2 rounded-xl border border-outline text-primary hover:bg-neutral flex items-center gap-2 text-xs font-semibold"
          aria-label="Open Navigation"
        >
          <span>Menu</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </header>

      {/* Collapsible Mobile/Tablet Drawer & Overlay (< 991px) */}
      {mobileNavOpen && (
        <div className="min-[991px]:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setMobileNavOpen(false)}
          />

          {/* Slide-out Sidebar Drawer */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-paper border-r border-outline p-5 z-10 justify-between h-full shadow-2xl animate-fade-in-right">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-outline pb-4">
                <Link href="/" className="flex items-center gap-2">
                  <img src="/logo.svg" alt="MarketingSetu" className="h-7 w-auto" />
                  <span className="font-bold text-sm text-primary">MarketingSetu</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1.5 rounded-lg border border-outline text-secondary hover:text-primary"
                >
                  ✕
                </button>
              </div>

              {/* User Brief Card in Drawer */}
              <div className="p-3 rounded-xl border border-outline bg-neutral">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-lighter text-brand-main flex items-center justify-center font-bold text-xs uppercase">
                    {user?.firstName?.[0] || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-primary truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-[11px] text-secondary truncate">{user?.phone}</p>
                  </div>
                </div>
              </div>

              {/* Drawer Navigation Links */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        active
                          ? "bg-brand-main text-white shadow-sm"
                          : "text-secondary hover:text-primary hover:bg-neutral"
                      }`}
                    >
                      <span className={active ? "text-white" : "text-secondary"}>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-outline space-y-2">
              <Link
                href="/"
                target="_blank"
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-secondary hover:text-primary border border-outline hover:bg-neutral transition-colors"
              >
                <span>Visit Website</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-error-main hover:bg-error-lighter/20 border border-error-light/30 transition-colors"
              >
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
