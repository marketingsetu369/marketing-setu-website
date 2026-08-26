"use client";

import { EnquiryItem, UserDashboardApi } from "@/api/repositories/userDashboardApi";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const res = await UserDashboardApi.getEnquiries({ limit: 50 });
      if (res.data) {
        setEnquiries(res.data.enquiries || []);
        setTotal(res.data.total || 0);
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
      setEnquiries(
        enquiries.map((e) => (e.id === id ? { ...e, isRead: true } : e))
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
      setEnquiries(enquiries.filter((e) => e.id !== id));
      setTotal((prev) => Math.max(0, prev - 1));
      toast.success("Enquiry deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete enquiry");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-paper border border-outline shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">
            Customer Leads & Inquiries
          </h1>
          <p className="text-xs text-secondary mt-0.5">
            Total {total} customer messages received via your digital page.
          </p>
        </div>

        <button
          type="button"
          onClick={loadEnquiries}
          className="px-4 py-2 rounded-xl border border-outline hover:border-brand-main text-xs font-semibold text-primary transition-colors inline-flex items-center gap-2"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      {/* Leads Table / Card List */}
      <div className="rounded-2xl bg-paper border border-outline overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-brand-main border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-secondary">Loading inquiries...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-neutral flex items-center justify-center mx-auto text-secondary">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-sm font-bold text-primary">No Customer Inquiries Yet</p>
            <p className="text-xs text-secondary max-w-sm mx-auto">
              When customers fill out the enquiry form on your digital page, their messages will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-outline">
            {enquiries.map((item) => {
              const cleanPhone = item.phone.replace(/\D/g, "");
              const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
                `Hello ${item.name}, thank you for contacting us via our digital business page!`
              )}`;

              return (
                <div
                  key={item.id}
                  className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                    item.isRead ? "bg-paper" : "bg-brand-lighter/20"
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-primary">{item.name}</span>
                      {!item.isRead && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-main text-white text-[10px] font-bold">
                          New
                        </span>
                      )}
                      {item.isProduct && (
                        <span className="px-2 py-0.5 rounded-full bg-info-lighter text-info-main text-[10px] font-bold">
                          Product Enquiry: {item.productName}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-secondary font-medium">{item.phone}</p>
                    {item.message && (
                      <p className="text-xs text-primary/80 pt-1 font-normal italic">
                        &quot;{item.message}&quot;
                      </p>
                    )}
                    <p className="text-[11px] text-disabled">
                      {new Date(item.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-success-main hover:bg-success-dark text-white font-bold text-xs shadow-sm transition-colors inline-flex items-center gap-1.5"
                    >
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
                      title="Delete"
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
