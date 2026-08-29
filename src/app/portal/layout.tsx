"use client";

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
  const { user, isAuthenticated, isLoading, logout, initFromStorage } = useAuthStore();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  // If loading authentication state, show a clean skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FD] dark:bg-[#0B0F19]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#6C5CE7] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
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
      icon: (
        <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="4" />
          <path d="M7 16a5 5 0 0 1 10 0" />
          <path d="M12 11v3" />
          <circle cx="8" cy="8" r="0.75" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "Business Page",
      href: "/portal/business-page",
      icon: (
        <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
    },
    {
      label: "Customer Leads",
      href: "/portal/enquiries",
      icon: (
        <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: "Transactions",
      href: "/portal/transactions",
      icon: (
        <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 14l6-6m-6 0h6v6M12 21a9 9 0 100-18 9 9 0 000 18z" />
        </svg>
      ),
    },
    {
      label: "Plan & Billing",
      href: "/portal/billing",
      icon: (
        <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      label: "Profile & Settings",
      href: "/portal/profile",
      icon: (
        <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  const initials = (user?.firstName?.[0] || "U") + (user?.lastName?.[0] || "");

  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-[#0B0F19] text-[#101828] dark:text-slate-100 flex flex-col min-[991px]:flex-row font-sans antialiased">
      {/* Sidebar - Desktop (>= 991px) */}
      <aside className="hidden min-[991px]:flex min-[991px]:w-64 flex-col justify-between border-r border-dashed border-[#DCDFE6] dark:border-slate-800 bg-[#F8F9FD] dark:bg-[#0B0F19] px-4 py-6 sticky top-0 h-screen flex-shrink-0 z-20">
        <div className="space-y-6">
          {/* Top Logo */}
          <div className="px-2 pt-1 pb-1">
            <Link href="/portal" className="inline-block">
              <img src="/logo.svg" alt="MarketingSetu" className="h-16 sm:h-17 w-auto object-contain" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {managementNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-3.5 px-4 py-3 rounded-[12px] text-[15px] font-semibold transition-all duration-150 overflow-hidden ${
                    active
                      ? "bg-[#6C5CE7]/[0.08] text-[#6C5CE7] dark:bg-[#6C5CE7]/20 dark:text-[#A29BFE]"
                      : "text-[#667085] dark:text-slate-400 hover:text-[#344054] dark:hover:text-white hover:bg-white/70 dark:hover:bg-slate-800/60 font-medium"
                  }`}
                >
                  {/* Left Indicator bar */}
                  {active && (
                    <span className="absolute left-0 top-3 bottom-3 w-[5px] bg-[#6C5CE7] rounded-r-md" />
                  )}
                  <span className={`shrink-0 ${active ? "text-[#6C5CE7] dark:text-[#A29BFE]" : "text-[#98A2B3]"}`}>
                    {item.icon}
                  </span>
                  <span className="tracking-tight">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom */}
        <div className="pt-4 border-t border-dashed border-[#DCDFE6] dark:border-slate-800 space-y-3">
          {/* User Profile Link Pill */}
          <Link
            href="/portal/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/80 dark:hover:bg-slate-800/60 transition-colors group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#6C5CE7]/10 dark:bg-[#6C5CE7]/30 text-[#6C5CE7] dark:text-[#A29BFE] flex items-center justify-center font-semibold text-xs shrink-0 group-hover:scale-105 transition-transform">
              {initials.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-[#101828] dark:text-white truncate leading-tight group-hover:text-[#6C5CE7] transition-colors">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-[#667085] truncate capitalize leading-tight mt-0.5">
                {user?.plan ? `${user.plan} Plan` : "View Profile"}
              </p>
            </div>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-[#6C5CE7] group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Logout Button */}
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="w-full flex items-center gap-2.5 px-4 py-3 rounded-[12px] text-sm font-semibold bg-[#FEE4E2]/70 hover:bg-[#FEE4E2] text-[#D92D20] dark:bg-rose-950/30 dark:hover:bg-rose-950/50 dark:text-rose-400 transition-colors cursor-pointer"
          >
            <svg className="w-4.5 h-4.5 text-[#D92D20] dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header (< 991px) */}
      <header className="min-[991px]:hidden flex items-center justify-between px-4 py-3.5 border-b border-dashed border-[#DCDFE6] dark:border-slate-800 bg-[#F8F9FD] dark:bg-slate-900 sticky top-0 z-30 shadow-xs">
        <Link href="/portal" className="inline-block">
          <img src="/logo.svg" alt="MarketingSetu" className="h-11 w-auto object-contain" />
        </Link>
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="p-2 rounded-xl border border-dashed border-[#DCDFE6] dark:border-slate-800 text-[#344054] dark:text-slate-300 hover:bg-white flex items-center gap-2 text-xs font-semibold cursor-pointer"
        >
          <span>Menu</span>
          <svg className="w-5 h-5 text-[#6C5CE7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <div className="min-[991px]:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#F8F9FD] dark:bg-slate-900 border-r border-dashed border-[#DCDFE6] dark:border-slate-800 p-5 z-10 justify-between h-full shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-dashed border-[#DCDFE6] pb-4">
                <Link href="/portal" className="inline-block">
                  <img src="/logo.svg" alt="MarketingSetu" className="h-11 w-auto" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1.5 rounded-lg border border-[#DCDFE6] text-[#667085] cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <nav className="space-y-2">
                {managementNav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={`relative flex items-center gap-3.5 px-4 py-3 rounded-[12px] text-[15px] font-semibold ${
                        active
                          ? "bg-[#6C5CE7]/[0.08] text-[#6C5CE7]"
                          : "text-[#667085] hover:bg-white"
                      }`}
                    >
                      {active && (
                        <span className="absolute left-0 top-3 bottom-3 w-[5px] bg-[#6C5CE7] rounded-r-md" />
                      )}
                      <span className={active ? "text-[#6C5CE7]" : "text-[#98A2B3]"}>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-dashed border-[#DCDFE6] space-y-2">
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] text-sm font-semibold bg-[#FEE4E2] text-[#D92D20] cursor-pointer"
              >
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto p-5 sm:p-7 lg:p-9 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
