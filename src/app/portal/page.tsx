"use client";

import {
  AnalyticsData,
  BusinessPageData,
  EnquiryItem,
  UserDashboardApi,
} from "@/api/repositories/userDashboardApi";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function OverviewPage() {
  const { user } = useAuthStore();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [businessPage, setBusinessPage] = useState<BusinessPageData | null>(null);
  const [recentEnquiries, setRecentEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [analyticsRes, bpRes, enqRes] = await Promise.allSettled([
          UserDashboardApi.getAnalytics(),
          UserDashboardApi.getBusinessPage(),
          UserDashboardApi.getEnquiries({ limit: 10 }),
        ]);

        if (analyticsRes.status === "fulfilled" && analyticsRes.value.data) {
          setAnalytics(analyticsRes.value.data);
        }
        if (bpRes.status === "fulfilled" && bpRes.value.data) {
          setBusinessPage(bpRes.value.data);
        }
        if (enqRes.status === "fulfilled" && enqRes.value.data) {
          const raw = enqRes.value.data;
          if (Array.isArray(raw)) {
            setRecentEnquiries(raw);
          } else if (raw.enquiries) {
            setRecentEnquiries(raw.enquiries || []);
          }
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const businessSlug = businessPage?.slug || "";
  const publicUrl = businessSlug
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/${businessSlug}`
    : "";

  const handleCopyLink = () => {
    if (!publicUrl) return;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    toast.success("Web Page Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Welcome Hero Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Welcome back, {user?.firstName || "Renuka"} ✨
          </h1>
          <p className="text-sm text-[#6B7280] dark:text-slate-400 font-normal max-w-2xl leading-relaxed">
            Track your real-time customer traffic, monitor incoming WhatsApp leads, and manage your digital storefront from one intuitive dashboard.
          </p>
        </div>

        {businessSlug && (
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-[#F8F9FD] text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-[#059669]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <Link
              href={`/${businessSlug}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-[#5850EC] hover:bg-[#4a42dc] text-white text-xs font-semibold shadow-xs transition-all"
            >
              <span>View Live Page</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* 2. Top 4 Metric Cards (Border removed, shadow added) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* CARD 1: Total Page Views */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none flex flex-col justify-between h-[132px]">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
                Total Page Views
              </span>
              <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
                {loading ? "..." : analytics?.totalViews ?? 0}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#EEEBFF] text-[#5850EC] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div className="text-xs font-semibold text-[#5850EC] uppercase flex items-center gap-1">
            <span>↗ Unique page visits</span>
          </div>
        </div>

        {/* CARD 2: WhatsApp Clicks */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none flex flex-col justify-between h-[132px]">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
                WhatsApp Clicks
              </span>
              <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
                {loading ? "..." : analytics?.totalWhatsApp ?? 0}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#E6FAF5] text-[#059669] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
            </div>
          </div>
          <div className="text-xs font-semibold text-[#059669] uppercase flex items-center gap-1">
            <span>↗ Direct WhatsApp chats</span>
          </div>
        </div>

        {/* CARD 3: Call Inquiries */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none flex flex-col justify-between h-[132px]">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
                Call Inquiries
              </span>
              <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
                {loading ? "..." : analytics?.totalCalls ?? 0}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          </div>
          <div className="text-xs font-semibold text-[#D97706] uppercase flex items-center gap-1">
            <span>Direct phone calls</span>
          </div>
        </div>

        {/* CARD 4: Map Directions */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none flex flex-col justify-between h-[132px]">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
                Map Directions
              </span>
              <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
                {loading ? "..." : analytics?.totalDirections ?? 0}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <div className="text-xs font-semibold text-[#E11D48] uppercase flex items-center gap-1">
            <span>Store location taps</span>
          </div>
        </div>
      </div>

      {/* 3. Quick Launchpad Actions (Border removed, shadow added) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#EEEBFF] text-[#5850EC] flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Business Page</h3>
            <p className="text-xs text-[#6B7280] dark:text-slate-400 leading-relaxed">
              Update branding, photos, catalog, pricing, contact details & reviews.
            </p>
          </div>
          <Link
            href="/portal/business-page"
            className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#F8F9FD] dark:bg-slate-800 hover:bg-[#EEEBFF] dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
          >
            <span>Open Profile Editor</span>
            <span>&rarr;</span>
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#E6FAF5] text-[#059669] flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Customer Leads</h3>
            <p className="text-xs text-[#6B7280] dark:text-slate-400 leading-relaxed">
              View customer messages submitted via your digital page and respond directly.
            </p>
          </div>
          <Link
            href="/portal/enquiries"
            className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#F8F9FD] dark:bg-slate-800 hover:bg-[#E6FAF5] dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
          >
            <span>View Inquiries</span>
            <span>&rarr;</span>
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Plan & Features</h3>
            <p className="text-xs text-[#6B7280] dark:text-slate-400 leading-relaxed">
              Check your current subscription tier, validity dates, and plan benefits.
            </p>
          </div>
          <Link
            href="/portal/billing"
            className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#F8F9FD] dark:bg-slate-800 hover:bg-[#FFFBEB] dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
          >
            <span>Manage Subscription</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* 4. Bottom Box: Latest Customer Inquiries (Border removed, shadow added) */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Latest Customer Inquiries
            </h2>
            <p className="text-xs text-[#9CA3AF] font-normal mt-0.5">
              Recent visitor contacts from your business page
            </p>
          </div>
          <Link
            href="/portal/enquiries"
            className="text-xs font-semibold text-[#5850EC] hover:underline inline-flex items-center gap-1"
          >
            <span>View All</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#9CA3AF] font-normal">
            No inquiries received yet.
          </div>
        ) : (
          <div className="divide-y divide-[#F3F4F6] dark:divide-slate-800">
            {recentEnquiries.slice(0, 5).map((item) => {
              const itemInitials = item.name ? item.name.slice(0, 2).toUpperCase() : "CU";
              return (
                <div key={item.id} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#EEEBFF] text-[#5850EC] flex items-center justify-center font-semibold text-xs shrink-0">
                      {itemInitials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#9CA3AF]">{item.phone}</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#9CA3AF]">
                    {new Date(item.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
