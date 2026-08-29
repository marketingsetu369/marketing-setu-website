"use client";

import { EnquiryItem, UserDashboardApi } from "@/api/repositories/userDashboardApi";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type TabType = "all" | "product" | "general";

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const res = await UserDashboardApi.getEnquiries({ limit: 100 });
      if (res.data) {
        if (Array.isArray(res.data)) {
          setEnquiries(res.data);
        } else if (res.data.enquiries) {
          setEnquiries(res.data.enquiries || []);
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await UserDashboardApi.markEnquiryRead(id);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, isRead: true } : e))
      );
      toast.success("Marked as read");
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await UserDashboardApi.deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      toast.success("Enquiry deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete enquiry");
    }
  };

  // Counts for tabs & badges
  const counts = useMemo(() => {
    const totalAll = enquiries.length;
    const totalProduct = enquiries.filter((e) => e.isProduct).length;
    const totalGeneral = enquiries.filter((e) => !e.isProduct).length;

    const unreadAll = enquiries.filter((e) => !e.isRead).length;
    const unreadProduct = enquiries.filter((e) => e.isProduct && !e.isRead).length;
    const unreadGeneral = enquiries.filter((e) => !e.isProduct && !e.isRead).length;

    return {
      all: { total: totalAll, unread: unreadAll },
      product: { total: totalProduct, unread: unreadProduct },
      general: { total: totalGeneral, unread: unreadGeneral },
    };
  }, [enquiries]);

  // Filtered by tab and search
  const filteredEnquiries = useMemo(() => {
    let list = enquiries;

    if (activeTab === "product") {
      list = list.filter((e) => e.isProduct);
    } else if (activeTab === "general") {
      list = list.filter((e) => !e.isProduct);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((e) => {
        const nameMatch = e.name?.toLowerCase().includes(q);
        const phoneMatch = e.phone?.toLowerCase().includes(q);
        const productMatch = e.productName?.toLowerCase().includes(q);
        const messageMatch = e.message?.toLowerCase().includes(q);
        return nameMatch || phoneMatch || productMatch || messageMatch;
      });
    }

    return list;
  }, [enquiries, activeTab, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Customer Leads & Inquiries
          </h1>
          <p className="text-sm text-slate-500 font-medium max-w-2xl">
            Manage incoming product requests and direct messages received from your digital business page.
          </p>
        </div>

        <button
          type="button"
          onClick={loadEnquiries}
          className="px-4 py-2 rounded-xl border border-[#EEF2F6] dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all inline-flex items-center gap-2 self-start sm:self-auto shadow-xs"
        >
          <svg className="w-4 h-4 text-[#6C5CE7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* 3 Metric Cards (Matching Screenshot pastel palette) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {/* CARD 1: Total Leads */}
        <div className="rounded-2xl border border-[#EEF2F6] dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Total Inquiries
            </span>
            <div className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
              {counts.all.total}
            </div>
            <p className="text-xs text-[#6C5CE7] font-semibold">
              {counts.all.unread > 0 ? `${counts.all.unread} unread` : "All caught up"}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#F0EEFF] text-[#6C5CE7] flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
        </div>

        {/* CARD 2: Product Requests */}
        <div className="rounded-2xl border border-[#EEF2F6] dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Product Leads
            </span>
            <div className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
              {counts.product.total}
            </div>
            <p className="text-xs text-[#00B894] font-semibold">
              Specific catalog inquiries
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#E6FAF5] text-[#00B894] flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>

        {/* CARD 3: General Messages */}
        <div className="rounded-2xl border border-[#EEF2F6] dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              General Messages
            </span>
            <div className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
              {counts.general.total}
            </div>
            <p className="text-xs text-[#FFA502] font-semibold">
              Direct contact submissions
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#FFF8E7] text-[#FFA502] flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Segmented Tab Buttons matching screenshot active lavender pill */}
        <div className="inline-flex p-1 rounded-2xl bg-white dark:bg-slate-900 border border-[#EEF2F6] dark:border-slate-800 shadow-xs self-start">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center gap-2 ${
              activeTab === "all"
                ? "bg-[#F0EEFF] text-[#6C5CE7]"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            <span>All</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                activeTab === "all"
                  ? "bg-white text-[#6C5CE7]"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500"
              }`}
            >
              {counts.all.total}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("product")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center gap-2 ${
              activeTab === "product"
                ? "bg-[#E6FAF5] text-[#00B894]"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            <span>Product</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                activeTab === "product"
                  ? "bg-white text-[#00B894]"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500"
              }`}
            >
              {counts.product.total}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center gap-2 ${
              activeTab === "general"
                ? "bg-[#FFF8E7] text-[#FFA502]"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            <span>General</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                activeTab === "general"
                  ? "bg-white text-[#FFA502]"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500"
              }`}
            >
              {counts.general.total}
            </span>
          </button>
        </div>

        {/* Clean Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by name, phone, product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9.5 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-[#EEF2F6] dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#6C5CE7] transition-all shadow-xs"
          />
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Leads List Container */}
      <div className="rounded-2xl border border-[#EEF2F6] dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-[#6C5CE7] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Loading inquiries...</p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="py-16 text-center space-y-3 px-4">
            <div className="w-16 h-16 rounded-full bg-[#EBF8F4] text-[#00B894] flex items-center justify-center mx-auto shadow-xs">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {searchQuery ? "No matching inquiries found" : "All clear!"}
              </h3>
              <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto">
                {searchQuery
                  ? `No inquiries matched "${searchQuery}". Try searching with another keyword.`
                  : "When customers submit an inquiry on your business page, it will appear here."}
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-[#EEF2F6] dark:divide-slate-800">
            {filteredEnquiries.map((item) => {
              const cleanPhone = item.phone ? item.phone.replace(/\D/g, "") : "";
              const waText = item.isProduct && item.productName
                ? `Hello ${item.name}, thank you for your enquiry regarding "${item.productName}" on our digital business page!`
                : `Hello ${item.name}, thank you for contacting us via our digital business page!`;
              const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(waText)}`;
              const callUrl = `tel:${item.phone}`;
              const itemInitials = item.name ? item.name.slice(0, 2).toUpperCase() : "CU";

              return (
                <div
                  key={item.id}
                  className={`p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-colors ${
                    item.isRead ? "bg-white hover:bg-slate-50/70" : "bg-[#F9F8FF] hover:bg-[#F4F1FF]"
                  }`}
                >
                  <div className="flex items-start gap-4 flex-1">
                    {/* Customer Initials Avatar */}
                    <div className="w-10 h-10 rounded-full bg-[#EAE8FE] text-[#6C5CE7] flex items-center justify-center font-semibold text-xs shrink-0 mt-0.5">
                      {itemInitials}
                    </div>

                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white">
                          {item.name}
                        </span>

                        {!item.isRead && (
                          <span className="px-2 py-0.5 rounded-full bg-[#FFF0F0] text-[#FF4757] text-[10px] font-semibold">
                            New
                          </span>
                        )}

                        {item.isProduct ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6FAF5] text-[#00B894] text-[10px] font-semibold">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span>Product: {item.productName || "Item"}</span>
                            {item.productPrice && (
                              <span className="font-semibold">({item.productPrice})</span>
                            )}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF8E7] text-[#FFA502] text-[10px] font-semibold">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>General Inquiry</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                        <a
                          href={callUrl}
                          className="hover:text-[#6C5CE7] transition-colors inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-semibold"
                        >
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{item.phone}</span>
                        </a>
                        <span>•</span>
                        <span>
                          {new Date(item.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>

                      {item.message && (
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-[#EEF2F6] dark:border-slate-700/60 mt-1">
                          <p className="text-xs text-slate-700 dark:text-slate-200 font-normal leading-relaxed">
                            &quot;{item.message}&quot;
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#00B894] hover:bg-[#00a383] text-white font-semibold text-xs shadow-xs transition-all inline-flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                      </svg>
                      <span>WhatsApp</span>
                    </a>

                    {!item.isRead && (
                      <button
                        type="button"
                        onClick={() => handleMarkRead(item.id)}
                        className="px-3.5 py-2 rounded-xl border border-[#EEF2F6] dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#6C5CE7] text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors shadow-xs"
                      >
                        Mark Read
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-xl bg-[#FFF0F0] text-[#FF4757] hover:bg-[#FFE5E5] transition-colors"
                      title="Delete enquiry"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
