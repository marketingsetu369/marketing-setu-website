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
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-paper border border-outline shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">
            Customer Leads & Enquiries
          </h1>
          <p className="text-xs text-secondary mt-0.5">
            Manage incoming product requests and general enquiries received via your website.
          </p>
        </div>

        <button
          type="button"
          onClick={loadEnquiries}
          className="px-4 py-2 rounded-xl border border-outline hover:border-brand-main text-xs font-semibold text-primary transition-colors inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      {/* Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Segmented Tab Buttons */}
        <div className="inline-flex p-1 rounded-2xl bg-neutral border border-outline/60 shadow-sm self-start">
          {/* All Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "all"
                ? "bg-paper text-primary shadow-sm"
                : "text-secondary hover:text-primary"
            }`}
          >
            <span>All</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTab === "all"
                  ? "bg-brand-lighter text-brand-main"
                  : "bg-paper/70 text-secondary"
              }`}
            >
              {counts.all.total}
            </span>
            {counts.all.unread > 0 && (
              <span className="w-2 h-2 rounded-full bg-brand-main animate-pulse" />
            )}
          </button>

          {/* Product Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("product")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "product"
                ? "bg-paper text-primary shadow-sm"
                : "text-secondary hover:text-primary"
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Product</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTab === "product"
                  ? "bg-info-lighter text-info-main"
                  : "bg-paper/70 text-secondary"
              }`}
            >
              {counts.product.total}
            </span>
            {counts.product.unread > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-brand-main text-white text-[9px] font-bold">
                {counts.product.unread} new
              </span>
            )}
          </button>

          {/* General Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "general"
                ? "bg-paper text-primary shadow-sm"
                : "text-secondary hover:text-primary"
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>General</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTab === "general"
                  ? "bg-warning-lighter text-warning-dark"
                  : "bg-paper/70 text-secondary"
              }`}
            >
              {counts.general.total}
            </span>
            {counts.general.unread > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-brand-main text-white text-[9px] font-bold">
                {counts.general.unread} new
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search by name, phone, product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-paper border border-outline text-xs text-primary placeholder:text-secondary/60 focus:outline-none focus:border-brand-main transition-colors shadow-sm"
          />
          <svg
            className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Leads Table / Card List */}
      <div className="rounded-2xl bg-paper border border-outline overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-brand-main border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-secondary">Loading enquiries...</p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="py-16 text-center space-y-3 px-4">
            <div className="w-12 h-12 rounded-full bg-neutral flex items-center justify-center mx-auto text-secondary">
              {activeTab === "product" ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              ) : activeTab === "general" ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              )}
            </div>
            <p className="text-sm font-bold text-primary">
              {searchQuery
                ? "No matching enquiries found"
                : activeTab === "product"
                ? "No Product Enquiries Yet"
                : activeTab === "general"
                ? "No General Enquiries Yet"
                : "No Customer Enquiries Yet"}
            </p>
            <p className="text-xs text-secondary max-w-sm mx-auto">
              {searchQuery
                ? `No enquiries matched "${searchQuery}". Try searching with a different term.`
                : activeTab === "product"
                ? "When customers click 'Enquire Now' on your products or services, their requests will appear here."
                : activeTab === "general"
                ? "When customers send a message through the contact/enquiry form on your website, it will appear here."
                : "When customers submit any enquiry on your digital website, it will appear here."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-outline">
            {filteredEnquiries.map((item) => {
              const cleanPhone = item.phone ? item.phone.replace(/\D/g, "") : "";
              const waText = item.isProduct && item.productName
                ? `Hello ${item.name}, thank you for your enquiry regarding "${item.productName}" on our digital business page!`
                : `Hello ${item.name}, thank you for contacting us via our digital business page!`;
              const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(waText)}`;
              const callUrl = `tel:${item.phone}`;

              return (
                <div
                  key={item.id}
                  className={`p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-colors ${
                    item.isRead ? "bg-paper hover:bg-neutral/40" : "bg-brand-lighter/15 hover:bg-brand-lighter/25"
                  }`}
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-sm text-primary">{item.name}</span>

                      {!item.isRead && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-main text-white text-[10px] font-bold">
                          New
                        </span>
                      )}

                      {item.isProduct ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-info-lighter text-info-main text-[10px] font-bold">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          <span>Product: {item.productName || "General Item"}</span>
                          {item.productPrice && (
                            <span className="text-info-dark font-extrabold">({item.productPrice})</span>
                          )}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-warning-lighter text-warning-dark text-[10px] font-bold">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span>General Enquiry</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-secondary font-medium">
                      <a
                        href={callUrl}
                        className="hover:text-brand-main transition-colors inline-flex items-center gap-1 font-semibold"
                      >
                        <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{item.phone}</span>
                      </a>
                      <span>•</span>
                      <span className="text-[11px] text-disabled">
                        {new Date(item.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>

                    {item.message && (
                      <div className="p-3 rounded-xl bg-neutral/80 border border-outline/50 mt-2">
                        <p className="text-xs text-primary font-normal leading-relaxed">
                          &quot;{item.message}&quot;
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-success-main hover:bg-success-dark text-white font-bold text-xs shadow-sm transition-colors inline-flex items-center gap-1.5"
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
                        className="px-3 py-2 rounded-xl border border-outline hover:border-brand-main text-xs font-semibold text-secondary hover:text-primary transition-colors"
                      >
                        Mark Read
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-xl border border-outline text-secondary hover:text-error-main hover:border-error-light transition-colors"
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
