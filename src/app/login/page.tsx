"use client";

import { UserAuthApi } from "@/api/repositories/userAuthApi";
import { AppButton, AppCard, AppInput } from "@/library/ui";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    try {
      setLoading(true);
      const cleanPhone = phone.replace(/\D/g, "");
      const res = await UserAuthApi.login(cleanPhone, password);

      if (res.data?.token && res.data?.user) {
        setAuth(res.data.token, res.data.user);
        toast.success(`Welcome back, ${res.data.user.firstName}!`);
        router.push("/portal");
      } else {
        toast.error("Invalid response from server");
      }
    } catch (err: any) {
      toast.error(err.message || "Invalid mobile number or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-12 bg-background text-primary selection:bg-brand-main selection:text-white">
      {/* ─── Left Column: Ambient First Gradient Canvas (No Top Logo Here) ─── */}
      <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 bg-gradient-to-br from-[#0F0E17] via-[#191633] to-[#0A0914] text-white flex-col justify-between p-10 xl:p-14 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full bg-brand-main/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] rounded-full bg-brand-light/15 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Center Main Product Feature Showcase */}
        <div className="relative z-10 space-y-8 my-auto py-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-main/20 border border-brand-light/30 text-xs font-semibold text-brand-light backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-success-main animate-pulse" />
              All-in-One Digital Marketing Platform
            </div>
            <h1 className="text-3xl xl:text-4xl font-bold tracking-tight leading-[1.2] text-white">
              Power your business growth with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light via-white to-brand-main">smart automation.</span>
            </h1>
            <p className="text-grey-400 text-sm leading-relaxed">
              Manage your customized digital business landing page, track caller leads, showcase catalogs, and monitor realtime analytics.
            </p>
          </div>

          {/* Product Highlights Feature Cards */}
          <div className="space-y-3">
            {/* Feature 1: Digital Business Page */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center gap-3.5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-brand-main/20 text-brand-light flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">Smart Business Landing Page</p>
                <p className="text-[11px] text-grey-400 truncate">Instant public page with product catalog & location</p>
              </div>
              <span className="text-[10px] font-bold text-success-light bg-success-main/20 px-2 py-0.5 rounded-full">
                Realtime
              </span>
            </div>

            {/* Feature 2: Lead Tracking & Analytics */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center gap-3.5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#36B37E]/20 text-[#36B37E] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">Lead CRM & Visitor Insights</p>
                <p className="text-[11px] text-grey-400 truncate">Track incoming client enquiries and call logs effortlessly</p>
              </div>
              <span className="text-[10px] font-bold text-brand-light bg-brand-main/20 px-2 py-0.5 rounded-full">
                Auto-Sync
              </span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-grey-400 pt-4 border-t border-white/10">
          <span>&copy; {new Date().getFullYear()} MarketingSetu</span>
          <Link href="/privacy-policy" className="hover:text-white transition-colors">
            Privacy & Terms
          </Link>
        </div>
      </div>

      {/* ─── Right Column: Crisp Modern Login Form with Top SVG Logo ─── */}
      <div className="lg:col-span-7 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 py-12 bg-paper text-primary">
        <div className="max-w-[420px] w-full space-y-8">
          {/* Top SVG Logo placed on Right Side Header (Extra Large) */}
          <div className="flex items-center pb-1">
            <Link href="/" className="inline-block group">
              <img
                src="/logo.svg"
                alt="MarketingSetu"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Login Card Form */}
          <AppCard elevation="none" className="!p-0 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Mobile Phone Field */}
              <AppInput
                label="Mobile Number"
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 10-digit mobile number"
                required
              />

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-secondary">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full px-3.5 pr-11 py-2.5 rounded-lg border border-outline bg-transparent text-primary placeholder:text-disabled text-sm font-medium outline-none transition-all focus:border-brand-main focus:ring-1 focus:ring-brand-main"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-secondary hover:text-primary p-1 cursor-pointer transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <AppButton
                  type="submit"
                  disabled={loading}
                  variant="primary"
                  size="md"
                  fullWidth
                  className="!py-3 text-sm font-bold shadow-z8 hover:shadow-z16 transition-all"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    <span>Sign In to Dashboard &rarr;</span>
                  )}
                </AppButton>
              </div>
            </form>
          </AppCard>

          {/* Bottom Register CTA */}
          <div className="text-center text-xs text-secondary pt-2">
            Don&apos;t have an active plan?{" "}
            <Link href="/contact" className="font-bold text-brand-main hover:underline">
              Get Started with MarketingSetu &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
