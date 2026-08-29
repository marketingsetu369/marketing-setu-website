"use client";

import { BusinessPageData, UserDashboardApi } from "@/api/repositories/userDashboardApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

/** Resolves any image URL, object, or local/prod upload path into a usable https URL */
function resolveImgUrl(input: any): string {
  if (!input) return "";
  let rawUrl = "";
  if (typeof input === "string") {
    rawUrl = input;
  } else if (typeof input === "object") {
    rawUrl =
      input.url ||
      input.imageUrl ||
      input.image_url ||
      input.secure_url ||
      input.src ||
      input.path ||
      input.uri ||
      input.image ||
      input.avatar_url ||
      input.avatar ||
      input.photo ||
      "";
  }

  if (!rawUrl || typeof rawUrl !== "string" || rawUrl === "[object Object]") return "";

  const trimmed = rawUrl.trim();
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "https://api.marketingsetu.com").replace(/\/$/, "");

  // If it's a relative path starting with /uploads
  if (trimmed.startsWith("/uploads/")) {
    return `${apiUrl}${trimmed}`;
  }

  // If it contains /uploads/ (from localhost, emulator 10.0.2.2, 127.0.0.1, or prod)
  const match = trimmed.match(/\/uploads\/(.+)$/);
  if (match && match[1]) {
    if (
      trimmed.includes("localhost") ||
      trimmed.includes("10.0.2.2") ||
      trimmed.includes("127.0.0.1") ||
      trimmed.startsWith("/")
    ) {
      return `${apiUrl}/uploads/${match[1]}`;
    }
    return trimmed;
  }

  // External HTTP/HTTPS URLs
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    if (
      trimmed.includes("localhost") ||
      trimmed.includes("10.0.2.2") ||
      trimmed.includes("127.0.0.1")
    ) {
      const uMatch = trimmed.match(/\/uploads\/(.+)$/);
      if (uMatch && uMatch[1]) {
        return `${apiUrl}/uploads/${uMatch[1]}`;
      }
    }
    return trimmed.replace(/^http:\/\//, "https://");
  }

  // If it's a bare filename or relative path
  if (!trimmed.startsWith("http") && !trimmed.startsWith("/")) {
    return `${apiUrl}/uploads/${trimmed}`;
  }

  return trimmed;
}

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
  const [uploadingProductIdx, setUploadingProductIdx] = useState<number | null>(null);
  const [uploadingTestimonialIdx, setUploadingTestimonialIdx] = useState<number | null>(null);

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
    Array<{
      id?: string;
      name: string;
      description?: string;
      price?: number;
      price_unit?: string;
      image?: string;
      imageUrl?: string;
      images?: string[];
      is_active?: boolean;
    }>
  >([]);

  // 6. Gallery
  const [gallery, setGallery] = useState<string[]>([]);

  // 7. Testimonials
  const [testimonials, setTestimonials] = useState<
    Array<{
      id?: string;
      author_name: string;
      name?: string;
      rating: number;
      content: string;
      avatar_url?: string;
      avatar?: string;
      photo?: string;
      image?: string;
    }>
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
          setLogoUrl(resolveImgUrl(bp.header?.logo_url));
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
            setOwnerAvatarUrl(resolveImgUrl(o.avatar_url));
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

          // 5. Products
          if (Array.isArray(bp.products)) {
            setProducts(
              bp.products.map((p: any) => ({
                id: p.id,
                name: p.name || p.title || "",
                description: p.description || "",
                price: p.price,
                price_unit: p.price_unit || "unit",
                image: resolveImgUrl(p.image || p.imageUrl || (Array.isArray(p.images) ? p.images[0] : "")),
                imageUrl: resolveImgUrl(p.imageUrl || p.image || (Array.isArray(p.images) ? p.images[0] : "")),
                images: Array.isArray(p.images)
                  ? p.images.map((img: any) => resolveImgUrl(img)).filter(Boolean)
                  : [],
                is_active: p.is_active ?? true,
              }))
            );
          }

          // 6. Gallery
          if (Array.isArray(bp.gallery)) {
            setGallery(
              bp.gallery
                .map((g: any) => resolveImgUrl(g))
                .filter(Boolean)
            );
          }

          // 7. Testimonials
          if (Array.isArray(bp.testimonials)) {
            setTestimonials(
              bp.testimonials.map((t: any) => ({
                id: t.id,
                author_name: t.author_name || t.name || "",
                name: t.author_name || t.name || "",
                rating: Number(t.rating) || 5,
                content: t.content || t.comment || t.text || "",
                avatar_url: resolveImgUrl(t.avatar_url || t.avatar || t.photo || t.image),
                avatar: resolveImgUrl(t.avatar || t.avatar_url || t.photo || t.image),
              }))
            );
          }
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to load business details");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleFileUpload = async (
    file: File,
    type: "logo" | "owner" | "gallery" | "product" | "testimonial",
    index?: number
  ) => {
    try {
      if (type === "logo") setUploadingLogo(true);
      if (type === "owner") setUploadingOwnerAvatar(true);
      if (type === "gallery") setUploadingGallery(true);
      if (type === "product" && index !== undefined) setUploadingProductIdx(index);
      if (type === "testimonial" && index !== undefined) setUploadingTestimonialIdx(index);

      const res = await UserDashboardApi.uploadMedia(file);
      if (res.data?.url) {
        const fullUrl = resolveImgUrl(res.data.url);
        if (type === "logo") setLogoUrl(fullUrl);
        if (type === "owner") setOwnerAvatarUrl(fullUrl);
        if (type === "gallery") setGallery((prev) => [...prev, fullUrl]);
        if (type === "product" && index !== undefined) {
          const updated = [...products];
          updated[index].image = fullUrl;
          updated[index].imageUrl = fullUrl;
          updated[index].images = [fullUrl];
          setProducts(updated);
        }
        if (type === "testimonial" && index !== undefined) {
          const updated = [...testimonials];
          updated[index].avatar_url = fullUrl;
          updated[index].avatar = fullUrl;
          setTestimonials(updated);
        }
        toast.success("Image uploaded successfully!");
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to upload image");
    } finally {
      if (type === "logo") setUploadingLogo(false);
      if (type === "owner") setUploadingOwnerAvatar(false);
      if (type === "gallery") setUploadingGallery(false);
      if (type === "product") setUploadingProductIdx(null);
      if (type === "testimonial") setUploadingTestimonialIdx(null);
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

  // Completion calculation for the 7 steps
  const isHeaderFilled = Boolean(logoUrl && businessName && category && slug);
  const isContactFilled = Boolean(phone && email);
  const isOwnerFilled = Boolean(ownerName.trim());
  const isSocialFilled = Boolean(facebook || instagram || youtubeSocial || twitter);
  const isProductsFilled = products.length > 0;
  const isGalleryFilled = gallery.length > 0;
  const isTestimonialsFilled = testimonials.length > 0;

  const stepsList = [
    { id: "header", title: "Header & Branding", sub: "Logo, Business name & Slug", filled: isHeaderFilled, count: null },
    { id: "contact", title: "Contact & Location", sub: "Phone, Email, Address & Maps", filled: isContactFilled, count: null },
    { id: "owner", title: "Owner Profile", sub: "Avatar, Title, Bio & Experience", filled: isOwnerFilled, count: null },
    { id: "social", title: "Social Profiles", sub: "Instagram, Facebook, YouTube, X", filled: isSocialFilled, count: null },
    { id: "products", title: "Products & Services", sub: "Catalog items with pricing & photos", filled: isProductsFilled, count: products.length },
    { id: "gallery", title: "Photo Gallery", sub: "High-resolution pictures", filled: isGalleryFilled, count: gallery.length },
    { id: "testimonials", title: "Testimonials", sub: "Customer reviews and ratings", filled: isTestimonialsFilled, count: testimonials.length },
  ];

  const completedSteps = stepsList.filter((s) => s.filled).length;
  const completionPercent = Math.round((completedSteps / stepsList.length) * 100);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-[#6C5CE7] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Loading Profile Setup...</p>
      </div>
    );
  }

  const liveSlug = slug || pageData?.slug || "";

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-xs">
              {logoUrl ? (
                <img src={resolveImgUrl(logoUrl)} alt={businessName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#EEEAFF] text-[#6C5CE7] flex items-center justify-center font-bold text-xl">
                  {businessName ? businessName[0].toUpperCase() : "M"}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {businessName || "Your Business Profile"}
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {category ? `${category} • ` : ""}
                {liveSlug ? `marketingsetu.com/${liveSlug}` : "Set up your slug link below"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {liveSlug && (
              <Link
                href={`/${liveSlug}`}
                target="_blank"
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:border-slate-300 transition-colors shadow-xs"
              >
                View Live Page ↗
              </Link>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-[#6C5CE7] hover:bg-[#5850EC] text-white text-xs font-bold shadow-xs transition-all disabled:opacity-50"
            >
              {saving ? "Saving Changes..." : "Save Business Page"}
            </button>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="space-y-2 pt-2 border-t border-dashed border-[#DCDFE6] dark:border-slate-800">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-500">Profile Completion ({completedSteps}/{stepsList.length} Sections)</span>
            <span className="text-[#6C5CE7]">{completionPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#6C5CE7] to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Left Step Navigator + Right Editor Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Step Navigator */}
        <div className="lg:col-span-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 mb-3">
            Configuration Sections
          </p>
          <div className="space-y-2">
            {stepsList.map((step, idx) => {
              const active = activeTab === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveTab(step.id as any)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 ${
                    active
                      ? "bg-[#6C5CE7] text-white shadow-md shadow-[#6C5CE7]/20"
                      : "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                        active
                          ? "bg-white text-[#6C5CE7]"
                          : step.filled
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {step.filled ? "✓" : idx + 1}
                    </div>
                    <div className="truncate">
                      <p className={`font-semibold text-sm truncate ${active ? "text-white" : "text-slate-900 dark:text-white"}`}>
                        {step.title}
                        {step.count !== null && <span className="opacity-80 ml-1.5 text-xs">({step.count})</span>}
                      </p>
                      <p className={`text-[11px] truncate mt-0.5 ${active ? "text-white/80" : "text-slate-500 font-medium"}`}>
                        {step.sub}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs ${active ? "text-white" : "text-slate-400"}`}>&rarr;</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Editor Panel */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
          {/* STEP 1: HEADER & BRANDING */}
          {activeTab === "header" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Header & Brand Configuration</h2>
                <p className="text-xs text-slate-500 font-medium">Set up your logo, title, slug link, and primary accent theme.</p>
              </div>

              {/* Logo Uploader */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Business Logo
                </label>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850">
                  <div className="w-16 h-16 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {logoUrl ? (
                      <img src={resolveImgUrl(logoUrl)} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">No Logo</span>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#6C5CE7] text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer transition-colors shadow-xs">
                      {uploadingLogo ? (
                        <span>Uploading...</span>
                      ) : (
                        <>
                          <svg className="w-4 h-4 text-[#6C5CE7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <p className="text-[11px] text-slate-400 font-medium">PNG, JPG, or WEBP (Square 500x500 recommended)</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Business Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Royal Bakers & Sweets"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Business Category <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Bakery, Cafe, Consultant"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Tagline / Punchline
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Freshly Baked with 100% Love & Purity in Pune"
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Website URL Slug <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 overflow-hidden">
                  <span className="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 text-xs text-slate-500 font-semibold">
                    marketingsetu.com/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                    placeholder="royal-bakers"
                    className="w-full px-3 py-2.5 bg-transparent text-slate-900 dark:text-white text-sm font-semibold outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  YouTube Video Showcase Link (Optional)
                </label>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
                />
              </div>

              {/* Theme Color Selector */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Page Theme Color Accent
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {["#7265E3", "#673AB7", "#4CAF50", "#2196F3", "#FF5722", "#009688", "#E91E63"].map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => setThemeColorHex(hex)}
                      className={`w-9 h-9 rounded-full transition-transform ${
                        themeColorHex === hex ? "scale-110 ring-3 ring-offset-2 ring-[#6C5CE7]" : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Page Language Selector */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
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
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        pageLanguage === lang.code
                          ? "bg-[#6C5CE7] text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900"
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
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Contact & Location Information</h2>
                <p className="text-xs text-slate-500 font-medium">Provide contact channels and exact store/office location.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Calling Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    WhatsApp Chat Number
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Business Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@mybusiness.com"
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Physical Store / Office Address
                </label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Shop No. 4, MG Road, Pune, Maharashtra"
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] resize-y"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Google Maps Link / Share URL
                </label>
                <input
                  type="url"
                  value={mapsLink}
                  onChange={(e) => setMapsLink(e.target.value)}
                  placeholder="https://maps.app.goo.gl/..."
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
                />
              </div>
            </div>
          )}

          {/* STEP 3: OWNER PROFILE */}
          {activeTab === "owner" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Owner / Founder Profile</h2>
                <p className="text-xs text-slate-500 font-medium">Introduce the face behind your business with trust badges.</p>
              </div>

              {/* Owner Avatar */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Owner Photo / Avatar
                </label>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850">
                  <div className="w-16 h-16 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-xs">
                    {ownerAvatarUrl ? (
                      <img src={resolveImgUrl(ownerAvatarUrl)} alt="Owner" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">Photo</span>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#6C5CE7] text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer transition-colors shadow-xs">
                      {uploadingOwnerAvatar ? (
                        <span>Uploading...</span>
                      ) : (
                        <>
                          <svg className="w-4 h-4 text-[#6C5CE7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <p className="text-[11px] text-slate-400 font-medium">Clear portrait photo recommended</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Ramesh Patil"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    value={ownerTitle}
                    onChange={(e) => setOwnerTitle(e.target.value)}
                    placeholder="e.g. Founder & Master Baker"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Happy Customers Count
                  </label>
                  <input
                    type="number"
                    value={happyCustomersCount ?? ""}
                    onChange={(e) => setHappyCustomersCount(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="e.g. 5000"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={experienceYears ?? ""}
                    onChange={(e) => setExperienceYears(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="e.g. 12"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Owner Bio & Vision
                </label>
                <textarea
                  rows={3}
                  value={ownerBio}
                  onChange={(e) => setOwnerBio(e.target.value)}
                  placeholder="Share a short bio, experience, and commitment to your clients..."
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] resize-y"
                />
              </div>
            </div>
          )}

          {/* STEP 4: SOCIAL LINKS */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Social Media Profiles</h2>
                <p className="text-xs text-slate-500 font-medium">Connect your active social channels to gain followers.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Instagram Profile Link
                  </label>
                  <input
                    type="url"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://instagram.com/your_handle"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Facebook Page Link
                  </label>
                  <input
                    type="url"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder="https://facebook.com/your_page"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    YouTube Channel Link
                  </label>
                  <input
                    type="url"
                    value={youtubeSocial}
                    onChange={(e) => setYoutubeSocial(e.target.value)}
                    placeholder="https://youtube.com/@channel"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Twitter / X Profile Link
                  </label>
                  <input
                    type="url"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="https://x.com/your_handle"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7]"
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
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Products & Services Catalog</h2>
                  <p className="text-xs text-slate-500 font-medium">Showcase items with direct inquiry capabilities and photos.</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setProducts([
                      ...products,
                      { name: "New Product / Service", price: 0, price_unit: "unit", description: "", image: "", imageUrl: "", images: [] },
                    ])
                  }
                  className="px-4 py-2 rounded-xl bg-[#6C5CE7] hover:bg-[#5850EC] text-white font-semibold text-xs shadow-xs transition-all"
                >
                  + Add Product
                </button>
              </div>

              <div className="space-y-4">
                {products.map((item, index) => {
                  const productImg = resolveImgUrl(item.image || item.imageUrl || item.images?.[0]);
                  return (
                    <div key={index} className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-850 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Item #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => setProducts(products.filter((_, i) => i !== index))}
                          className="text-xs font-semibold text-rose-500 hover:text-rose-600"
                        >
                          Delete Item
                        </button>
                      </div>

                      {/* Product Photo Upload + Fields */}
                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 overflow-hidden flex-shrink-0 relative group flex items-center justify-center">
                          {productImg ? (
                            <img src={productImg} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[11px] text-slate-400 font-semibold text-center px-1">No Image</span>
                          )}
                          <label className="absolute inset-0 bg-black/50 text-white text-[10px] font-semibold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-center p-1">
                            {uploadingProductIdx === index ? "..." : "Change"}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "product", index);
                              }}
                            />
                          </label>
                        </div>

                        <div className="flex-1 w-full space-y-3">
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
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:border-[#6C5CE7]"
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
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:border-[#6C5CE7]"
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
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:border-[#6C5CE7] resize-none font-normal"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {products.length === 0 && (
                  <div className="py-16 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl font-medium">
                    No products added yet. Click &quot;+ Add Product&quot; to begin.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 6: GALLERY SHOWCASE */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Photo Gallery Showcase</h2>
                  <p className="text-xs text-slate-500 font-medium">Upload storefront, team, and work portfolio pictures.</p>
                </div>
                <label className="px-4 py-2 rounded-xl bg-[#6C5CE7] hover:bg-[#5850EC] text-white font-semibold text-xs shadow-xs transition-all cursor-pointer inline-flex items-center gap-2">
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
                {gallery.map((url, index) => {
                  const resolved = resolveImgUrl(url);
                  return (
                    <div key={index} className="aspect-square rounded-2xl overflow-hidden relative group bg-slate-100 dark:bg-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                      {resolved ? (
                        <img src={resolved} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                          Photo {index + 1}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setGallery(gallery.filter((_, i) => i !== index))}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}

                {gallery.length === 0 && (
                  <div className="col-span-full py-16 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl font-medium">
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
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Customer Reviews & Testimonials</h2>
                  <p className="text-xs text-slate-500 font-medium">Highlight positive customer experiences and ratings.</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setTestimonials([
                      ...testimonials,
                      { author_name: "Customer Name", rating: 5, content: "Outstanding service and quality!", avatar_url: "", avatar: "" },
                    ])
                  }
                  className="px-4 py-2 rounded-xl bg-[#6C5CE7] hover:bg-[#5850EC] text-white font-semibold text-xs shadow-xs transition-all"
                >
                  + Add Review
                </button>
              </div>

              <div className="space-y-4">
                {testimonials.map((t, index) => {
                  const avatarSrc = resolveImgUrl(t.avatar_url || t.avatar || t.photo || t.image);
                  return (
                    <div key={index} className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-850 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Review #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => setTestimonials(testimonials.filter((_, i) => i !== index))}
                          className="text-xs font-semibold text-rose-500 hover:text-rose-600"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        {/* Testimonial Avatar */}
                        <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 overflow-hidden flex-shrink-0 relative group flex items-center justify-center">
                          {avatarSrc ? (
                            <img src={avatarSrc} alt={t.author_name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-[#EEEAFF] text-[#6C5CE7] flex items-center justify-center font-bold text-sm">
                              {t.author_name ? t.author_name.slice(0, 2).toUpperCase() : "CU"}
                            </div>
                          )}
                          <label className="absolute inset-0 bg-black/50 text-white text-[9px] font-semibold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-center p-1">
                            {uploadingTestimonialIdx === index ? "..." : "Photo"}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "testimonial", index);
                              }}
                            />
                          </label>
                        </div>

                        <div className="flex-1 w-full space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-2">
                              <input
                                type="text"
                                value={t.author_name}
                                onChange={(e) => {
                                  const updated = [...testimonials];
                                  updated[index].author_name = e.target.value;
                                  updated[index].name = e.target.value;
                                  setTestimonials(updated);
                                }}
                                placeholder="Client Name"
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:border-[#6C5CE7]"
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
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:border-[#6C5CE7]"
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
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:border-[#6C5CE7] resize-none font-normal"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {testimonials.length === 0 && (
                  <div className="py-16 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl font-medium">
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
