"use client";

import { UserAuthApi } from "@/api/repositories/userAuthApi";
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
      {/* Left Column: Visual Brand Billboard */}
      <div className="hidden lg:flex lg:col-span-5 bg-grey-900 text-white flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <img src="/logo.svg" alt="MarketingSetu" className="h-10 w-auto" />
            <span className="text-xl font-bold tracking-tight text-white">MarketingSetu</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-brand-light">
            <span className="w-2 h-2 rounded-full bg-success-main animate-pulse" />
            Merchant Web Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Manage your digital presence & leads effortlessly.
          </h1>
          <p className="text-grey-400 text-sm sm:text-base leading-relaxed">
            Update your business landing page, monitor customer calls and WhatsApp inquiries, showcase products, and track real-time visitors.
          </p>

          <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs text-grey-400">
            <div>
              <p className="text-white font-semibold text-base mb-0.5">100% Realtime</p>
              <p>Instant sync with your public digital page</p>
            </div>
            <div>
              <p className="text-white font-semibold text-base mb-0.5">Secure Dual Login</p>
              <p>Web management without interrupting your phone app</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-grey-500">
          &copy; {new Date().getFullYear()} MarketingSetu. All rights reserved.
        </div>
      </div>

      {/* Right Column: Clean Solid Form (No Glassmorphism) */}
      <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <Link href="/" className="lg:hidden inline-flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="MarketingSetu" className="h-8 w-auto" />
              <span className="font-bold text-lg text-primary">MarketingSetu</span>
            </Link>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
              Sign in to Merchant Portal
            </h2>
            <p className="text-secondary text-sm">
              Enter your registered mobile number and password to access your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Number Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                Mobile Number
              </label>
              <div className="rounded-xl border border-outline bg-paper focus-within:border-brand-main focus-within:ring-2 focus-within:ring-brand-main/20 transition-all overflow-hidden">
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full px-4 py-3 bg-transparent text-primary text-sm placeholder:text-disabled outline-none font-medium"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                  Password
                </label>
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-brand-main hover:text-brand-dark transition-colors"
                >
                  Need help?
                </Link>
              </div>
              <div className="relative rounded-xl border border-outline bg-paper focus-within:border-brand-main focus-within:ring-2 focus-within:ring-brand-main/20 transition-all overflow-hidden">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  className="w-full pl-4 pr-12 py-3 bg-transparent text-primary text-sm placeholder:text-disabled outline-none font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-secondary hover:text-primary px-2 py-1"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-brand-main hover:bg-brand-dark text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In to Portal"
              )}
            </button>
          </form>

          {/* Quick Notice Info Box */}
          <div className="p-4 rounded-xl border border-outline bg-neutral space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-primary">
              <svg className="w-4 h-4 text-brand-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Automated WhatsApp Note</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Automated missed call auto-replies run securely on your Android mobile device. Web portal allows you to edit profiles, view customer leads, and review billing.
            </p>
          </div>

          <div className="text-center text-xs text-secondary">
            Don&apos;t have an account yet?{" "}
            <Link href="/pricing" className="font-semibold text-brand-main hover:underline">
              Choose a plan to get started &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
