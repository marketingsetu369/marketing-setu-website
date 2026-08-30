"use client";

import {
  Analytics01Icon,
  ArrowRight01Icon,
  CreditCardIcon,
  Invoice01Icon,
  Logout01Icon,
  Store01Icon,
  UserIcon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, initFromStorage } =
    useAuthStore();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  // If loading authentication state, show a clean skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-brand-main border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-medium text-disabled uppercase tracking-wider">
            Loading portal...
          </p>
        </div>
      </div>
    );
  }

  // If unauthenticated, redirect to login
  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      router.push("/login");
    }
    return null;
  }

  const managementNav = [
    {
      label: "Dashboard",
      href: "/portal",
      icon: Analytics01Icon,
    },
    {
      label: "Business Page",
      href: "/portal/business-page",
      icon: Store01Icon,
    },
    {
      label: "Customer Leads",
      href: "/portal/enquiries",
      icon: UserMultiple02Icon,
    },
    {
      label: "Transactions",
      href: "/portal/transactions",
      icon: Invoice01Icon,
    },
    {
      label: "Plan & Billing",
      href: "/portal/billing",
      icon: CreditCardIcon,
    },
    {
      label: "Profile & Settings",
      href: "/portal/profile",
      icon: UserIcon,
    },
  ];

  const initials = (user?.firstName?.[0] || "U") + (user?.lastName?.[0] || "");

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col min-[991px]:flex-row font-sans antialiased">
      {/* Sidebar - Desktop (>= 991px) */}
      <aside className="hidden min-[991px]:flex min-[991px]:w-64 flex-col justify-between border-r border-dashed border-outline bg-background px-4 py-6 sticky top-0 h-screen flex-shrink-0 z-20">
        <div className="space-y-6">
          {/* Top Logo */}
          <div className="px-2 pt-1 pb-4 border-b border-dashed border-outline">
            <Link href="/portal" className="inline-block">
              <img
                src="/logo.svg"
                alt="MarketingSetu"
                className="h-16 sm:h-17 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {managementNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 overflow-hidden ${
                    active
                      ? "bg-brand-lighter/80 dark:bg-brand-darker/60 text-brand-main"
                      : "text-secondary hover:text-primary hover:bg-neutral"
                  }`}
                >
                  {/* Left Indicator bar */}
                  {active && (
                    <span className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-brand-main rounded-r-md" />
                  )}
                  <span
                    className={`shrink-0 ${
                      active ? "text-brand-main" : "text-disabled"
                    }`}
                  >
                    <HugeiconsIcon icon={item.icon} size={20} />
                  </span>
                  <span className="tracking-tight">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom */}
        <div className="pt-4 border-t border-dashed border-outline space-y-3">
          {/* User Profile Link Pill */}
          <Link
            href="/portal/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-neutral transition-colors group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-brand-lighter dark:bg-brand-darker text-brand-main flex items-center justify-center font-medium text-xs shrink-0 group-hover:scale-105 transition-transform">
              {initials.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-primary truncate leading-tight group-hover:text-brand-main transition-colors">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-secondary truncate capitalize leading-tight mt-0.5 font-normal">
                {user?.plan ? `${user.plan} Plan` : "View Profile"}
              </p>
            </div>
            <span className="text-disabled group-hover:text-brand-main group-hover:translate-x-0.5 transition-all">
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </span>
          </Link>

          {/* Logout Button */}
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium bg-error-lighter/60 hover:bg-error-lighter text-error-main dark:bg-error-darker/30 dark:hover:bg-error-darker/50 transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={Logout01Icon} size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar (Mobile Only) */}
        <header className="min-[991px]:hidden sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-outline px-6 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="p-2 rounded-lg border border-outline text-secondary hover:text-primary cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <Link href="/portal" className="inline-block">
            <img src="/logo.svg" alt="MarketingSetu" className="h-8 w-auto" />
          </Link>
        </header>

        {/* Page View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Drawer (<= 990px) */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 min-[991px]:hidden flex">
          <div
            className="fixed inset-0 bg-grey-900/60 backdrop-blur-xs"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-paper border-r border-dashed border-outline p-5 z-10 justify-between h-full shadow-dialog animate-fade-in-up">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-dashed border-outline pb-4">
                <Link href="/portal" className="inline-block">
                  <img
                    src="/logo.svg"
                    alt="MarketingSetu"
                    className="h-11 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1.5 rounded-lg border border-outline text-secondary hover:text-primary cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <nav className="space-y-1.5">
                {managementNav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={`relative flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium ${
                        active
                          ? "bg-brand-lighter/80 dark:bg-brand-darker/60 text-brand-main"
                          : "text-secondary hover:text-primary hover:bg-neutral"
                      }`}
                    >
                      {active && (
                        <span className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-brand-main rounded-r-md" />
                      )}
                      <span className={active ? "text-brand-main" : "text-disabled"}>
                        <HugeiconsIcon icon={item.icon} size={20} />
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-dashed border-outline space-y-2">
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-medium bg-error-lighter text-error-main cursor-pointer"
              >
                <HugeiconsIcon icon={Logout01Icon} size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
