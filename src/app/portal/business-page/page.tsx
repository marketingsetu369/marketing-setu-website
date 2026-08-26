"use client";

import { BusinessPageData, UserDashboardApi } from "@/api/repositories/userDashboardApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BusinessPageEditor() {
  const [activeTab, setActiveTab] = useState<
    "header" | "contact" | "owner" | "social" | "products" | "gallery" | "testimonials"
  >("header");
  const [pageData, setPageData] = useState<BusinessPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingOwnerAvatar, setUploadingOwnerAvatar] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // 1. Header & Branding
  const [businessName, setBusinessName] = useState("");
  const [tagline, setTagline] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [themeColorHex, setThemeColorHex] = useState("#7265E3");
  const [pageLanguage, setPageLanguage] = useState("en");

  // 2. Contact Details
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mapsLink, setMapsLink] = useState("");

  // 3. Owner Profile
  const [ownerName, setOwnerName] = useState("");
  const [ownerTitle, setOwnerTitle] = useState("");
  const [ownerBio, setOwnerBio] = useState("");
  const [ownerAvatarUrl, setOwnerAvatarUrl] = useState("");
  const [happyCustomersCount, setHappyCustomersCount] = useState<number | undefined>(undefined);
  const [experienceYears, setExperienceYears] = useState<number | undefined>(undefined);

  // 4. Social Links
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtubeSocial, setYoutubeSocial] = useState("");
  const [twitter, setTwitter] = useState("");

  // 5. Products & Services
  const [products, setProducts] = useState<
    Array<{ id?: string; name: string; description?: string; price?: number; price_unit?: string; images?: string[]; is_active?: boolean }>
  >([]);

  // 6. Gallery
  const [gallery, setGallery] = useState<string[]>([]);

  // 7. Testimonials
  const [testimonials, setTestimonials] = useState<
    Array<{ id?: string; author_name: string; rating: number; content: string; avatar_url?: string }>
  >([]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await UserDashboardApi.getBusinessPage();
        if (res.data) {
          const bp = res.data;
          setPageData(bp);

          // 1. Header
          setBusinessName(bp.header?.business_name || "");
          setTagline(bp.header?.tagline || "");
          setCategory(bp.header?.business_category || "");
          setDescription(bp.header?.description || "");
          setLogoUrl(bp.header?.logo_url || "");
          setSlug(bp.slug || "");
          setYoutubeUrl(bp.youtube_url || "");
          setThemeColorHex(bp.theme_color_hex || "#7265E3");
          setPageLanguage(bp.language || "en");

          // 2. Contact
          setPhone(bp.contact?.phone || "");
          setWhatsapp(bp.contact?.whatsapp || "");
          setEmail(bp.contact?.email || "");
          setAddress(bp.contact?.address || "");
          setMapsLink(bp.contact?.maps_link || bp.contact?.google_maps_url || "");

          // 3. Owner
          if (bp.owner && bp.owner.length > 0) {
            const o = bp.owner[0];
            setOwnerName(o.name || "");
            setOwnerTitle(o.title || "");
            setOwnerBio(o.bio || "");
            setOwnerAvatarUrl(o.avatar_url || "");
            setHappyCustomersCount(o.happy_customers_count);
            setExperienceYears(o.experience_years);
          }

          // 4. Social
          if (bp.social_links) {
            setFacebook(bp.social_links.facebook || "");
            setInstagram(bp.social_links.instagram || "");
            setYoutubeSocial(bp.social_links.youtube || "");
            setTwitter(bp.social_links.twitter || "");
          }

          // 5. Products, Gallery, Testimonials
          setProducts(bp.products || []);
          setGallery(bp.gallery || []);
          setTestimonials(bp.testimonials || []);
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to load business details");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleFileUpload = async (file: File, type: "logo" | "owner" | "gallery") => {
    try {
      if (type === "logo") setUploadingLogo(true);
      if (type === "owner") setUploadingOwnerAvatar(true);
      if (type === "gallery") setUploadingGallery(true);

      const res = await UserDashboardApi.uploadMedia(file);
      if (res.data?.url) {
        if (type === "logo") setLogoUrl(res.data.url);
        if (type === "owner") setOwnerAvatarUrl(res.data.url);
        if (type === "gallery") setGallery((prev) => [...prev, res.data.url]);
        toast.success("Image uploaded successfully!");
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to upload image");
    } finally {
      if (type === "logo") setUploadingLogo(false);
      if (type === "owner") setUploadingOwnerAvatar(false);
      if (type === "gallery") setUploadingGallery(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const ownerPayload =
        ownerName.trim()
          ? [
              {
                name: ownerName,
                title: ownerTitle,
                bio: ownerBio,
                avatar_url: ownerAvatarUrl,
                happy_customers_count: happyCustomersCount ? Number(happyCustomersCount) : 0,
                experience_years: experienceYears ? Number(experienceYears) : 0,
              },
            ]
          : [];

      const socialPayload: Record<string, string> = {};
      if (facebook.trim()) socialPayload.facebook = facebook.trim();
      if (instagram.trim()) socialPayload.instagram = instagram.trim();
      if (youtubeSocial.trim()) socialPayload.youtube = youtubeSocial.trim();
      if (twitter.trim()) socialPayload.twitter = twitter.trim();

      const payload: Partial<BusinessPageData> = {
        slug: slug || undefined,
        theme_color_hex: themeColorHex,
        youtube_url: youtubeUrl,
        language: pageLanguage,
        header: {
          business_name: businessName,
          tagline,
          business_category: category,
          description,
          logo_url: logoUrl,
        },
        contact: {
          phone,
          whatsapp,
          email,
          address,
          maps_link: mapsLink,
          google_maps_url: mapsLink,
        },
        owner: ownerPayload,
        social_links: socialPayload,
        products,
        gallery,
        testimonials,
      };

      const res = await UserDashboardApi.saveBusinessPage(payload);
      if (res.data) {
        setPageData(res.data);
      }
      toast.success("Business profile saved successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save business page");
    } finally {
      setSaving(false);
    }
  };

  // Completion calculation for the 7 steps (same as Android App)
  const isHeaderFilled = Boolean(logoUrl && businessName && category && slug);
  const isContactFilled = Boolean(phone && email);
  const isOwnerFilled = Boolean(ownerName.trim());
  const isSocialFilled = Boolean(facebook || instagram || youtubeSocial || twitter);
  const isProductsFilled = products.length > 0;
  const isGalleryFilled = gallery.length > 0;
  const isTestimonialsFilled = testimonials.length > 0;

  const stepsList = [
    { id: "header", title: "Header Details", sub: "Logo, Business name & Brand color", filled: isHeaderFilled, count: null },
    { id: "contact", title: "Contact Details", sub: "Phone, Email, Address & Maps", filled: isContactFilled, count: null },
    { id: "owner", title: "Owner Profile", sub: "Avatar, Title, Bio & Experience", filled: isOwnerFilled, count: null },
    { id: "social", title: "Social Links", sub: "Instagram, Facebook, YouTube, Twitter", filled: isSocialFilled, count: null },
    { id: "products", title: "Products & Services", sub: "Showcase items with pricing", filled: isProductsFilled, count: products.length },
    { id: "gallery", title: "Gallery Showcase", sub: "High-resolution photos", filled: isGalleryFilled, count: gallery.length },
    { id: "testimonials", title: "Testimonials", sub: "Customer reviews and ratings", filled: isTestimonialsFilled, count: testimonials.length },
  ];

  const completedSteps = stepsList.filter((s) => s.filled).length;
  const completionPercent = Math.round((completedSteps / stepsList.length) * 100);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-brand-main border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-semibold text-secondary">Loading Profile Setup...</p>
      </div>
    );
  }

  const liveSlug = slug || pageData?.slug || "";

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner (Progress Card from Android App) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-paper border border-outline shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-outline bg-neutral overflow-hidden flex-shrink-0 flex items-center justify-center">
              {logoUrl ? (
                <img src={logoUrl} alt={businessName} className="w-full h-full object-cover" />
              ) : (
                <span className="font-extrabold text-xl text-brand-main">
                  {businessName?.[0] || "M"}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">
                  {businessName || "Your Business Page"}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-lighter text-brand-main text-xs font-bold">
                  {category || "Digital Profile"}
                </span>
              </div>
              <p className="text-xs text-secondary mt-1">
                {tagline || "Configure all 7 sections to maximize customer conversions"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {liveSlug && (
              <Link
                href={`/${liveSlug}`}
                target="_blank"
                className="px-4 py-2.5 rounded-xl border border-outline hover:border-brand-main text-xs font-bold text-primary transition-all inline-flex items-center gap-2 bg-neutral"
              >
                <span>Preview Page</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-brand-main hover:bg-brand-dark text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Progress Bar (Matching Android App) */}
        <div className="space-y-2 pt-2 border-t border-outline">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-secondary">Profile Completion ({completedSteps}/{stepsList.length} Steps)</span>
            <span className="text-brand-main">{completionPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-neutral rounded-full overflow-hidden border border-outline">
            <div
              className="h-full bg-brand-main transition-all duration-500 rounded-full"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Left Step Navigator (Android Style) + Right Editor Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Step Navigator */}
        <div className="lg:col-span-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-secondary px-2 mb-3">
            Configuration Steps
          </p>
          <div className="space-y-2">
            {stepsList.map((step, idx) => {
              const active = activeTab === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveTab(step.id as any)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    active
                      ? "bg-brand-main text-white border-brand-main shadow-md"
                      : "bg-paper text-primary border-outline hover:border-brand-main/50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        active
                          ? "bg-white text-brand-main"
                          : step.filled
                          ? "bg-success-lighter text-success-dark"
                          : "bg-neutral text-secondary"
                      }`}
                    >
                      {step.filled ? "✓" : idx + 1}
                    </div>
                    <div className="truncate">
                      <p className={`font-bold text-sm truncate ${active ? "text-white" : "text-primary"}`}>
                        {step.title}
                        {step.count !== null && <span className="opacity-80 ml-1.5 text-xs">({step.count})</span>}
                      </p>
                      <p className={`text-[11px] truncate mt-0.5 ${active ? "text-white/80" : "text-secondary"}`}>
                        {step.sub}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs ${active ? "text-white" : "text-secondary"}`}>&rarr;</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Editor Panel */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-paper border border-outline shadow-sm space-y-6">
          {/* STEP 1: HEADER & BRANDING */}
          {activeTab === "header" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-primary">Header & Brand Configuration</h2>
                <p className="text-xs text-secondary">Set up your logo, title, slug link, and primary accent theme.</p>
              </div>

              {/* Logo Uploader */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                  Business Logo
                </label>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-outline bg-neutral">
                  <div className="w-16 h-16 rounded-xl border border-outline bg-paper overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-secondary">No Logo</span>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-paper border border-outline hover:border-brand-main text-xs font-bold text-primary cursor-pointer transition-colors">
                      {uploadingLogo ? (
                        <span>Uploading...</span>
                      ) : (
                        <>
                          <svg className="w-4 h-4 text-brand-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>Upload Logo Image</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "logo");
                        }}
                      />
                    </label>
                    <p className="text-[11px] text-secondary">PNG, JPG, or WEBP (Square 500x500 recommended)</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                    Business Name <span className="text-error-main">*</span>
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Royal Bakers & Sweets"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-semibold outline-none focus:border-brand-main"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                    Business Category <span className="text-error-main">*</span>
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Bakery, Cafe, Consultant"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-semibold outline-none focus:border-brand-main"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                  Tagline / Punchline
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Freshly Baked with 100% Love & Purity in Pune"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-medium outline-none focus:border-brand-main"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                  Website URL Slug <span className="text-error-main">*</span>
                </label>
                <div className="flex items-center rounded-xl border border-outline bg-neutral overflow-hidden">
                  <span className="px-3.5 py-2.5 bg-paper border-r border-outline text-xs text-secondary font-medium">
                    marketingsetu.com/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                    placeholder="royal-bakers"
                    className="w-full px-3 py-2.5 bg-transparent text-primary text-sm font-bold outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                  YouTube Video Showcase Link (Optional)
                </label>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-medium outline-none focus:border-brand-main"
                />
              </div>

              {/* Theme Color Selector (Matching Android App) */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                  Page Theme Color Accent
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {["#7265E3", "#673AB7", "#4CAF50", "#2196F3", "#FF5722", "#009688", "#E91E63"].map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => setThemeColorHex(hex)}
                      className={`w-9 h-9 rounded-full transition-transform ${
                        themeColorHex === hex ? "scale-110 ring-2 ring-offset-2 ring-primary" : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Page Language Selector (Matching Android App) */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                  Business Page Language
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { code: "en", label: "English" },
                    { code: "hi", label: "हिंदी (Hindi)" },
                    { code: "mr", label: "मराठी (Marathi)" },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setPageLanguage(lang.code)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        pageLanguage === lang.code
                          ? "bg-brand-main text-white"
                          : "bg-neutral text-secondary border border-outline hover:text-primary"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CONTACT DETAILS */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-primary">Contact & Location Information</h2>
                <p className="text-xs text-secondary">Provide contact channels and exact store/office location.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                    Calling Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-semibold outline-none focus:border-brand-main"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                    WhatsApp Chat Number
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-semibold outline-none focus:border-brand-main"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                  Business Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@mybusiness.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-medium outline-none focus:border-brand-main"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                  Physical Store / Office Address
                </label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Shop No. 4, MG Road, Pune, Maharashtra"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-medium outline-none focus:border-brand-main resize-y"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                  Google Maps Link / Share URL
                </label>
                <input
                  type="url"
                  value={mapsLink}
                  onChange={(e) => setMapsLink(e.target.value)}
                  placeholder="https://maps.app.goo.gl/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-medium outline-none focus:border-brand-main"
                />
              </div>
            </div>
          )}

          {/* STEP 3: OWNER PROFILE (From Android App) */}
          {activeTab === "owner" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-primary">Owner / Founder Profile</h2>
                <p className="text-xs text-secondary">Introduce the face behind your business with trust badges.</p>
              </div>

              {/* Owner Avatar */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                  Owner Photo / Avatar
                </label>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-outline bg-neutral">
                  <div className="w-16 h-16 rounded-full border border-outline bg-paper overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {ownerAvatarUrl ? (
                      <img src={ownerAvatarUrl} alt="Owner" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-secondary">Photo</span>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-paper border border-outline hover:border-brand-main text-xs font-bold text-primary cursor-pointer transition-colors">
                      {uploadingOwnerAvatar ? (
                        <span>Uploading...</span>
                      ) : (
                        <>
                          <svg className="w-4 h-4 text-brand-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>Upload Owner Avatar</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "owner");
                        }}
                      />
                    </label>
                    <p className="text-[11px] text-secondary">Clear portrait photo recommended</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Ramesh Patil"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-semibold outline-none focus:border-brand-main"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    value={ownerTitle}
                    onChange={(e) => setOwnerTitle(e.target.value)}
                    placeholder="e.g. Founder & Master Baker"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-semibold outline-none focus:border-brand-main"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                    Happy Customers Count
                  </label>
                  <input
                    type="number"
                    value={happyCustomersCount ?? ""}
                    onChange={(e) => setHappyCustomersCount(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="e.g. 5000"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-semibold outline-none focus:border-brand-main"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={experienceYears ?? ""}
                    onChange={(e) => setExperienceYears(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="e.g. 12"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-semibold outline-none focus:border-brand-main"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                  Owner Bio & Vision
                </label>
                <textarea
                  rows={3}
                  value={ownerBio}
                  onChange={(e) => setOwnerBio(e.target.value)}
                  placeholder="Share a short bio, experience, and commitment to your clients..."
                  className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-medium outline-none focus:border-brand-main resize-y"
                />
              </div>
            </div>
          )}

          {/* STEP 4: SOCIAL LINKS (From Android App) */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-primary">Social Media Profiles</h2>
                <p className="text-xs text-secondary">Connect your active social channels to gain followers.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                    Instagram Profile Link
                  </label>
                  <input
                    type="url"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://instagram.com/your_handle"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-medium outline-none focus:border-brand-main"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                    Facebook Page Link
                  </label>
                  <input
                    type="url"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder="https://facebook.com/your_page"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-medium outline-none focus:border-brand-main"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                    YouTube Channel Link
                  </label>
                  <input
                    type="url"
                    value={youtubeSocial}
                    onChange={(e) => setYoutubeSocial(e.target.value)}
                    placeholder="https://youtube.com/@channel"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-medium outline-none focus:border-brand-main"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary">
                    Twitter / X Profile Link
                  </label>
                  <input
                    type="url"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="https://x.com/your_handle"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline bg-neutral text-primary text-sm font-medium outline-none focus:border-brand-main"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: PRODUCTS & SERVICES */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-primary">Products & Services Catalog</h2>
                  <p className="text-xs text-secondary">Showcase items with direct inquiry capabilities.</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setProducts([
                      ...products,
                      { name: "New Product / Service", price: 0, price_unit: "unit", description: "" },
                    ])
                  }
                  className="px-4 py-2 rounded-xl bg-brand-lighter text-brand-main font-bold text-xs hover:bg-brand-light/30 transition-colors"
                >
                  + Add Product
                </button>
              </div>

              <div className="space-y-4">
                {products.map((item, index) => (
                  <div key={index} className="p-5 rounded-xl border border-outline bg-neutral space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                        Product #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => setProducts(products.filter((_, i) => i !== index))}
                        className="text-xs font-bold text-error-main hover:underline"
                      >
                        Delete Item
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const updated = [...products];
                            updated[index].name = e.target.value;
                            setProducts(updated);
                          }}
                          placeholder="Item Name"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-outline bg-paper text-primary text-sm font-semibold outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          value={item.price ?? ""}
                          onChange={(e) => {
                            const updated = [...products];
                            updated[index].price = e.target.value ? Number(e.target.value) : undefined;
                            setProducts(updated);
                          }}
                          placeholder="Price (₹)"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-outline bg-paper text-primary text-sm font-semibold outline-none"
                        />
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={item.description || ""}
                      onChange={(e) => {
                        const updated = [...products];
                        updated[index].description = e.target.value;
                        setProducts(updated);
                      }}
                      placeholder="Product details, specs, or warranty info..."
                      className="w-full px-3.5 py-2 rounded-lg border border-outline bg-paper text-primary text-xs outline-none resize-none"
                    />
                  </div>
                ))}

                {products.length === 0 && (
                  <div className="py-16 text-center text-secondary border border-dashed border-outline rounded-2xl">
                    No products added yet. Click &quot;+ Add Product&quot; to begin.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 6: GALLERY SHOWCASE (From Android App) */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-primary">Photo Gallery Showcase</h2>
                  <p className="text-xs text-secondary">Upload storefront, team, and work portfolio pictures.</p>
                </div>
                <label className="px-4 py-2 rounded-xl bg-brand-lighter text-brand-main font-bold text-xs hover:bg-brand-light/30 transition-colors cursor-pointer inline-flex items-center gap-2">
                  {uploadingGallery ? "Uploading..." : "+ Upload Image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "gallery");
                    }}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {gallery.map((url, index) => (
                  <div key={index} className="aspect-square rounded-xl border border-outline overflow-hidden relative group bg-neutral">
                    <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setGallery(gallery.filter((_, i) => i !== index))}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error-main"
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {gallery.length === 0 && (
                  <div className="col-span-full py-16 text-center text-secondary border border-dashed border-outline rounded-2xl">
                    No gallery images added yet. Click &quot;+ Upload Image&quot; to showcase your business.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 7: TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-primary">Customer Reviews & Testimonials</h2>
                  <p className="text-xs text-secondary">Highlight positive customer experiences and ratings.</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setTestimonials([
                      ...testimonials,
                      { author_name: "Customer Name", rating: 5, content: "Outstanding service and quality!" },
                    ])
                  }
                  className="px-4 py-2 rounded-xl bg-brand-lighter text-brand-main font-bold text-xs hover:bg-brand-light/30 transition-colors"
                >
                  + Add Review
                </button>
              </div>

              <div className="space-y-4">
                {testimonials.map((t, index) => (
                  <div key={index} className="p-5 rounded-xl border border-outline bg-neutral space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                        Review #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => setTestimonials(testimonials.filter((_, i) => i !== index))}
                        className="text-xs font-bold text-error-main hover:underline"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={t.author_name}
                          onChange={(e) => {
                            const updated = [...testimonials];
                            updated[index].author_name = e.target.value;
                            setTestimonials(updated);
                          }}
                          placeholder="Client Name"
                          className="w-full px-3.5 py-2 rounded-lg border border-outline bg-paper text-primary text-sm font-semibold outline-none"
                        />
                      </div>
                      <div>
                        <select
                          value={t.rating}
                          onChange={(e) => {
                            const updated = [...testimonials];
                            updated[index].rating = Number(e.target.value);
                            setTestimonials(updated);
                          }}
                          className="w-full px-3.5 py-2 rounded-lg border border-outline bg-paper text-primary text-sm font-semibold outline-none"
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                          <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                          <option value={3}>⭐⭐⭐ (3/5)</option>
                          <option value={2}>⭐⭐ (2/5)</option>
                          <option value={1}>⭐ (1/5)</option>
                        </select>
                      </div>
                    </div>

                    <textarea
                      rows={3}
                      value={t.content}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[index].content = e.target.value;
                        setTestimonials(updated);
                      }}
                      placeholder="What did the client love about your business?..."
                      className="w-full px-3.5 py-2 rounded-lg border border-outline bg-paper text-primary text-xs outline-none resize-none font-normal"
                    />
                  </div>
                ))}

                {testimonials.length === 0 && (
                  <div className="py-16 text-center text-secondary border border-dashed border-outline rounded-2xl">
                    No customer reviews added yet. Click &quot;+ Add Review&quot; to build credibility.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
