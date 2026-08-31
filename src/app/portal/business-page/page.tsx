"use client";

import { BusinessPageData, UserDashboardApi } from "@/api/repositories/userDashboardApi";
import {
  AppButton,
  AppCard,
  AppConfirmDialog,
  AppInput,
  AppModal,
  AppTextArea,
} from "@/library/ui";


import Link from "next/link";
import { useEffect, useState } from "react";
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
      price?: any;
      price_unit?: string;
      priceTiers?: Array<{ label: string; price: string }>;
      buttonName?: string;
      showPrice?: boolean;
      image?: string;
      imageUrl?: string;
      images?: string[];
      is_active?: boolean;
    }>
  >([]);

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductIdx, setEditingProductIdx] = useState<number | null>(null);
  const [productForm, setProductForm] = useState<{
    name: string;
    description: string;
    buttonName: string;
    showPrice: boolean;
    priceTiers: Array<{ label: string; price: string }>;
    image: string;
  }>({
    name: "",
    description: "",
    buttonName: "Enquiry",
    showPrice: true,
    priceTiers: [{ label: "", price: "" }],
    image: "",
  });

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

  // Testimonial Modal State
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonialIdx, setEditingTestimonialIdx] = useState<number | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<{
    author_name: string;
    rating: number;
    content: string;
    avatar_url: string;
  }>({
    author_name: "",
    rating: 5,
    content: "",
    avatar_url: "",
  });

  // Common Delete Dialog State
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

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
              bp.products.map((p: any) => {
                let parsedTiers: Array<{ label: string; price: string }> = [];
                let rawPrice = p.price;
                if (p.price && typeof p.price === "string" && p.price.trim().startsWith("[")) {
                  try {
                    const parsed = JSON.parse(p.price.trim());
                    if (Array.isArray(parsed) && parsed.length > 0) {
                      parsedTiers = parsed.map((item: any) => ({
                        label: String(item.label || "").trim(),
                        price: String(item.price || "").trim(),
                      }));
                    }
                  } catch (_) {}
                } else if (p.priceTiers && Array.isArray(p.priceTiers)) {
                  parsedTiers = p.priceTiers;
                }

                if (parsedTiers.length === 0) {
                  parsedTiers = [{ label: "", price: p.price ? String(p.price) : "" }];
                }

                return {
                  id: p.id,
                  name: p.name || p.title || "",
                  description: p.description || p.type || "",
                  price: rawPrice,
                  price_unit: p.price_unit || "unit",
                  priceTiers: parsedTiers,
                  buttonName: p.buttonName ?? "Enquiry",
                  showPrice: p.showPrice !== false,
                  image: resolveImgUrl(p.image || p.imageUrl || (Array.isArray(p.images) ? p.images[0] : "")),
                  imageUrl: resolveImgUrl(p.imageUrl || p.image || (Array.isArray(p.images) ? p.images[0] : "")),
                  images: Array.isArray(p.images)
                    ? p.images.map((img: any) => resolveImgUrl(img)).filter(Boolean)
                    : [],
                  is_active: p.is_active ?? true,
                };
              })
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
        if (type === "product") {
          if (index !== undefined) {
            const updated = [...products];
            updated[index].image = fullUrl;
            updated[index].imageUrl = fullUrl;
            updated[index].images = [fullUrl];
            setProducts(updated);
          } else {
            setProductForm((prev) => ({ ...prev, image: fullUrl }));
          }
        }
        if (type === "testimonial") {
          if (index !== undefined) {
            const updated = [...testimonials];
            updated[index].avatar_url = fullUrl;
            updated[index].avatar = fullUrl;
            setTestimonials(updated);
          } else {
            setTestimonialForm((prev) => ({ ...prev, avatar_url: fullUrl }));
          }
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

  // Open Product Modal
  const openProductModal = (index?: number) => {
    if (index !== undefined) {
      const prod = products[index];
      setEditingProductIdx(index);
      setProductForm({
        name: prod.name || "",
        description: prod.description || "",
        buttonName: prod.buttonName || "Enquiry",
        showPrice: prod.showPrice !== false,
        priceTiers:
          prod.priceTiers && prod.priceTiers.length > 0
            ? [...prod.priceTiers]
            : [{ label: "", price: prod.price ? String(prod.price) : "" }],
        image: prod.image || prod.imageUrl || "",
      });
    } else {
      setEditingProductIdx(null);
      setProductForm({
        name: "",
        description: "",
        buttonName: "Enquiry",
        showPrice: true,
        priceTiers: [{ label: "", price: "" }],
        image: "",
      });
    }
    setIsProductModalOpen(true);
  };

  const saveProductModal = () => {
    if (!productForm.name.trim()) {
      toast.error("Please enter a product name");
      return;
    }

    const newProd = {
      name: productForm.name.trim(),
      description: productForm.description.trim(),
      buttonName: productForm.buttonName.trim() || "Enquiry",
      showPrice: productForm.showPrice,
      priceTiers: productForm.priceTiers,
      price:
        productForm.priceTiers.length === 1 && !productForm.priceTiers[0].label
          ? productForm.priceTiers[0].price
          : "",
      image: productForm.image,
      imageUrl: productForm.image,
      images: productForm.image ? [productForm.image] : [],
      is_active: true,
    };

    if (editingProductIdx !== null) {
      const updated = [...products];
      updated[editingProductIdx] = { ...updated[editingProductIdx], ...newProd };
      setProducts(updated);
      toast.success("Product updated");
    } else {
      setProducts([...products, newProd]);
      toast.success("Product added");
    }

    setIsProductModalOpen(false);
  };

  // Open Testimonial Modal
  const openTestimonialModal = (index?: number) => {
    if (index !== undefined) {
      const t = testimonials[index];
      setEditingTestimonialIdx(index);
      setTestimonialForm({
        author_name: t.author_name || t.name || "",
        rating: Number(t.rating) || 5,
        content: t.content || (t as any).comment || "",
        avatar_url: t.avatar_url || t.avatar || "",
      });
    } else {
      setEditingTestimonialIdx(null);
      setTestimonialForm({
        author_name: "",
        rating: 5,
        content: "",
        avatar_url: "",
      });
    }
    setIsTestimonialModalOpen(true);
  };

  const saveTestimonialModal = () => {
    if (!testimonialForm.author_name.trim()) {
      toast.error("Please enter customer name");
      return;
    }
    if (!testimonialForm.content.trim()) {
      toast.error("Please enter review / comment");
      return;
    }

    const newTestimonial = {
      author_name: testimonialForm.author_name.trim(),
      name: testimonialForm.author_name.trim(),
      rating: Number(testimonialForm.rating) || 5,
      content: testimonialForm.content.trim(),
      comment: testimonialForm.content.trim(),
      avatar_url: testimonialForm.avatar_url,
      avatar: testimonialForm.avatar_url,
    };

    if (editingTestimonialIdx !== null) {
      const updated = [...testimonials];
      updated[editingTestimonialIdx] = { ...updated[editingTestimonialIdx], ...newTestimonial };
      setTestimonials(updated);
      toast.success("Testimonial updated");
    } else {
      setTestimonials([...testimonials, newTestimonial]);
      toast.success("Testimonial added");
    }

    setIsTestimonialModalOpen(false);
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

      // Format products in sync with Flutter App payload format
      const formattedProducts = products.map((prod) => {
        let serializedPrice: any = prod.price;
        if (prod.priceTiers && Array.isArray(prod.priceTiers) && prod.priceTiers.length > 0) {
          const validTiers = prod.priceTiers.filter(
            (t) => (t.price && t.price.trim().length > 0) || (t.label && t.label.trim().length > 0)
          );
          if (validTiers.length === 1 && !validTiers[0].label?.trim()) {
            serializedPrice = validTiers[0].price?.trim() || "";
          } else if (validTiers.length > 0) {
            serializedPrice = JSON.stringify(
              validTiers.map((t) => ({ label: t.label?.trim() || "", price: t.price?.trim() || "" }))
            );
          }
        }

        return {
          id: prod.id,
          name: prod.name || "",
          title: prod.name || "",
          description: prod.description || "",
          type: prod.description || "",
          price: serializedPrice,
          buttonName: prod.buttonName?.trim() || "Enquiry",
          showPrice: prod.showPrice !== false,
          image: prod.image || prod.imageUrl || "",
          imageUrl: prod.imageUrl || prod.image || "",
          images: prod.images || [],
          is_active: prod.is_active ?? true,
        };
      });

      // Format testimonials in sync with Flutter App & Backend Model (name, avatar, rating, comment)
      const formattedTestimonials = testimonials.map((t) => ({
        id: t.id,
        name: (t.author_name || t.name || "").trim(),
        author_name: (t.author_name || t.name || "").trim(),
        avatar: t.avatar || t.avatar_url || "",
        avatar_url: t.avatar_url || t.avatar || "",
        rating: Number(t.rating) || 5,
        comment: (t.content || (t as any).comment || "").trim(),
        content: (t.content || (t as any).comment || "").trim(),
      }));

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
        products: formattedProducts,
        gallery,
        testimonials: testimonials.map((t) => ({
          ...(t.id ? { id: t.id } : {}),
          name: t.author_name || t.name || "",
          author_name: t.author_name || t.name || "",
          rating: Number(t.rating) || 5,
          comment: t.content || (t as any).comment || "",
          content: t.content || (t as any).comment || "",
          text: t.content || (t as any).comment || "",
          avatar: t.avatar_url || t.avatar || "",
          avatar_url: t.avatar_url || t.avatar || "",
        })),
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
      <AppCard elevation="md" className="!p-6 sm:!p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-neutral border border-outline overflow-hidden flex-shrink-0 flex items-center justify-center shadow-z1">
              {logoUrl ? (
                <img src={resolveImgUrl(logoUrl)} alt={businessName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-brand-lighter text-brand-main flex items-center justify-center font-bold text-xl">
                  {businessName ? businessName[0].toUpperCase() : "M"}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary">
                {businessName || "Your Business Profile"}
              </h1>
              <p className="text-xs text-secondary font-medium mt-0.5">
                {category ? `${category} • ` : ""}
                {liveSlug ? `marketingsetu.com/${liveSlug}` : "Set up your slug link below"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {liveSlug && (
              <Link href={`/${liveSlug}`} target="_blank">
                <AppButton variant="outline" size="md">
                  View Live Page ↗
                </AppButton>
              </Link>
            )}
            <AppButton
              type="button"
              onClick={handleSave}
              disabled={saving}
              variant="primary"
              size="md"
            >
              {saving ? "Saving Changes..." : "Save Business Page"}
            </AppButton>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="space-y-2 pt-2 border-t border-outline">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-secondary">Profile Completion ({completedSteps}/{stepsList.length} Sections)</span>
            <span className="text-brand-main font-bold">{completionPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-neutral rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-main to-success-main transition-all duration-500 rounded-full"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </AppCard>

      {/* Main Grid: Left Step Navigator + Right Editor Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Step Navigator */}
        <div className="lg:col-span-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-disabled px-2 mb-3">
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
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                    active
                      ? "bg-brand-main text-white shadow-z8"
                      : "bg-paper text-primary shadow-z1 hover:bg-neutral"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                        active
                          ? "bg-paper text-brand-main shadow-2xs"
                          : step.filled
                          ? "bg-success-lighter text-success-main dark:bg-success-darker/60"
                          : "bg-neutral text-disabled"
                      }`}
                    >
                      {step.filled ? "✓" : idx + 1}
                    </div>
                    <div className="truncate">
                      <p className={`font-semibold text-sm truncate ${active ? "text-white" : "text-primary"}`}>
                        {step.title}
                        {step.count !== null && <span className="opacity-80 ml-1.5 text-xs">({step.count})</span>}
                      </p>
                      <p className={`text-[11px] truncate mt-0.5 ${active ? "text-white/80" : "text-secondary font-medium"}`}>
                        {step.sub}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs ${active ? "text-white" : "text-disabled"}`}>&rarr;</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Editor Panel */}
        <AppCard elevation="md" className="lg:col-span-8 !p-6 sm:!p-8 space-y-6">
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
                <AppInput
                  label="Business Name *"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Royal Bakers & Sweets"
                  required
                />

                <AppInput
                  label="Business Category *"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Bakery, Cafe, Consultant"
                  required
                />
              </div>

              <AppInput
                label="Tagline / Punchline"
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Freshly Baked with 100% Love & Purity in Pune"
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
                  Website URL Slug <span className="text-error-main">*</span>
                </label>
                <div className="flex items-center rounded-lg border border-outline bg-neutral overflow-hidden focus-within:border-brand-main focus-within:ring-1 focus-within:ring-brand-main transition-all">
                  <span className="px-3.5 py-2.5 bg-neutral border-r border-outline text-xs text-secondary font-semibold select-none">
                    marketingsetu.com/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                    placeholder="royal-bakers"
                    className="w-full px-3 py-2.5 bg-transparent text-primary text-sm font-semibold outline-none"
                  />
                </div>
              </div>

              <AppInput
                label="YouTube Video Showcase Link (Optional)"
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />

              {/* Theme Color Selector */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
                    Page Theme Color Accent
                  </label>
                  <span className="text-xs font-mono font-semibold text-primary px-2 py-0.5 rounded bg-neutral border border-outline">
                    {themeColorHex.toUpperCase()}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {["#7265E3", "#673AB7", "#4CAF50", "#2196F3", "#FF5722", "#009688", "#E91E63"].map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => setThemeColorHex(hex)}
                      className={`w-9 h-9 rounded-full transition-transform cursor-pointer ${
                        themeColorHex.toUpperCase() === hex.toUpperCase()
                          ? "scale-110 ring-3 ring-offset-2 ring-brand-main"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}

                  {/* Custom Color Picker Button & Input */}
                  <div className="relative flex items-center gap-2">
                    <label
                      className="w-9 h-9 rounded-full border-2 border-dashed border-outline hover:border-brand-main flex items-center justify-center cursor-pointer transition-all overflow-hidden relative"
                      style={{
                        backgroundColor: !["#7265E3", "#673AB7", "#4CAF50", "#2196F3", "#FF5722", "#009688", "#E91E63"].includes(themeColorHex.toUpperCase())
                          ? themeColorHex
                          : undefined,
                      }}
                      title="Pick custom color"
                    >
                      <input
                        type="color"
                        value={themeColorHex.startsWith("#") && themeColorHex.length === 7 ? themeColorHex : "#7265E3"}
                        onChange={(e) => setThemeColorHex(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {!["#7265E3", "#673AB7", "#4CAF50", "#2196F3", "#FF5722", "#009688", "#E91E63"].includes(themeColorHex.toUpperCase()) ? (
                        <span className="text-[10px] font-bold text-white drop-shadow-md">✓</span>
                      ) : (
                        <span className="text-xs font-bold text-secondary">+</span>
                      )}
                    </label>
                    <div className="w-28">
                      <AppInput
                        type="text"
                        value={themeColorHex}
                        onChange={(e) => {
                          let val = e.target.value;
                          if (!val.startsWith("#") && val.length > 0) val = `#${val}`;
                          setThemeColorHex(val);
                        }}
                        placeholder="#7265E3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Page Language Selector */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
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
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        pageLanguage === lang.code
                          ? "bg-brand-main text-white shadow-z4"
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
                <h2 className="text-lg font-semibold text-primary">Contact & Location Information</h2>
                <p className="text-xs text-secondary font-medium">Provide contact channels and exact store/office location.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AppInput
                  label="Calling Phone Number"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                />

                <AppInput
                  label="WhatsApp Chat Number"
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="e.g. 9876543210"
                />
              </div>

              <AppInput
                label="Business Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@mybusiness.com"
              />

              <AppTextArea
                label="Physical Store / Office Address"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Shop No. 4, MG Road, Pune, Maharashtra"
              />

              <AppInput
                label="Google Maps Link / Share URL"
                type="url"
                value={mapsLink}
                onChange={(e) => setMapsLink(e.target.value)}
                placeholder="https://maps.app.goo.gl/..."
              />
            </div>
          )}

          {/* STEP 3: OWNER PROFILE */}
          {activeTab === "owner" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-primary">Owner / Founder Profile</h2>
                <p className="text-xs text-secondary font-medium">Introduce the face behind your business with trust badges.</p>
              </div>

              {/* Owner Avatar */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
                  Owner Photo / Avatar
                </label>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral border border-outline">
                  <div className="w-16 h-16 rounded-full border border-outline bg-paper overflow-hidden flex-shrink-0 flex items-center justify-center shadow-z4">
                    {ownerAvatarUrl ? (
                      <img src={resolveImgUrl(ownerAvatarUrl)} alt="Owner" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-semibold text-disabled">Photo</span>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-paper border border-outline hover:border-brand-main text-xs font-semibold text-primary cursor-pointer transition-colors shadow-z1">
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
                    <p className="text-[11px] text-disabled font-medium">Clear portrait photo recommended</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AppInput
                  label="Full Name"
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="e.g. Ramesh Patil"
                />

                <AppInput
                  label="Designation / Title"
                  type="text"
                  value={ownerTitle}
                  onChange={(e) => setOwnerTitle(e.target.value)}
                  placeholder="e.g. Founder & Master Baker"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AppInput
                  label="Happy Customers Count"
                  type="number"
                  value={happyCustomersCount ?? ""}
                  onChange={(e) => setHappyCustomersCount(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 5000"
                />

                <AppInput
                  label="Years of Experience"
                  type="number"
                  value={experienceYears ?? ""}
                  onChange={(e) => setExperienceYears(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 12"
                />
              </div>

              <AppTextArea
                label="Owner Bio & Vision"
                rows={3}
                value={ownerBio}
                onChange={(e) => setOwnerBio(e.target.value)}
                placeholder="Share a short bio, experience, and commitment to your clients..."
              />
            </div>
          )}

          {/* STEP 4: SOCIAL LINKS */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-primary">Social Media Profiles</h2>
                <p className="text-xs text-secondary font-medium">Connect your active social channels to gain followers.</p>
              </div>

              <div className="space-y-4">
                <AppInput
                  label="Instagram Profile Link"
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="https://instagram.com/your_handle"
                />

                <AppInput
                  label="Facebook Page Link"
                  type="url"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="https://facebook.com/your_page"
                />

                <AppInput
                  label="YouTube Channel Link"
                  type="url"
                  value={youtubeSocial}
                  onChange={(e) => setYoutubeSocial(e.target.value)}
                  placeholder="https://youtube.com/@channel"
                />

                <AppInput
                  label="Twitter / X Profile Link"
                  type="url"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="https://x.com/your_handle"
                />
              </div>
            </div>
          )}

          {/* STEP 5: PRODUCTS & SERVICES */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-primary">Products & Services Catalog</h2>
                  <p className="text-xs text-secondary font-medium">Showcase items with direct inquiry capabilities and photos.</p>
                </div>
                <AppButton
                  type="button"
                  size="sm"
                  variant="primary"
                  onClick={() => openProductModal()}
                >
                  + Add Product
                </AppButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((item, index) => {
                  const productImg = resolveImgUrl(item.image || item.imageUrl || item.images?.[0]);
                  const tiers = item.priceTiers && item.priceTiers.length > 0 ? item.priceTiers : [];

                  return (
                    <div key={index} className="p-4 rounded-2xl bg-neutral border border-outline space-y-3 shadow-z1 flex flex-col justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 rounded-xl bg-paper border border-outline overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {productImg ? (
                            <img src={productImg} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] text-disabled font-semibold text-center px-1">No Image</span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-sm text-primary truncate">{item.name || "Untitled Product"}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-brand-lighter text-brand-main font-semibold flex-shrink-0">
                              {item.buttonName || "Enquiry"}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-xs text-secondary line-clamp-2 mt-0.5">{item.description}</p>
                          )}
                          {item.showPrice !== false && (
                            <p className="text-xs font-bold text-primary mt-1.5">
                              {tiers.length > 1
                                ? `From ₹${tiers[0].price} (${tiers.length} options)`
                                : tiers.length === 1 && tiers[0].price
                                ? `₹${tiers[0].price} ${tiers[0].label ? `(${tiers[0].label})` : ""}`
                                : item.price
                                ? `₹${item.price}`
                                : "Price on enquiry"}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-disabled font-medium">Item #{index + 1}</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => openProductModal(index)}
                            className="font-semibold text-brand-main hover:text-brand-dark cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteDialog({
                                isOpen: true,
                                title: `Delete "${item.name || `Product #${index + 1}`}"?`,
                                description: "Are you sure you want to remove this product from your catalog?",
                                onConfirm: () => {
                                  setProducts(products.filter((_, i) => i !== index));
                                  setDeleteDialog((d) => ({ ...d, isOpen: false }));
                                  toast.success("Product removed");
                                },
                              })
                            }
                            className="font-semibold text-error-main hover:text-error-dark cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {products.length === 0 && (
                  <div className="col-span-full py-16 text-center text-disabled border-2 border-dashed border-outline rounded-2xl font-medium">
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
                  <h2 className="text-lg font-semibold text-primary">Photo Gallery Showcase</h2>
                  <p className="text-xs text-secondary font-medium">Upload storefront, team, and work portfolio pictures.</p>
                </div>
                <label className="px-4 py-2 rounded-lg bg-brand-main hover:bg-brand-dark text-white font-semibold text-xs shadow-z4 transition-all cursor-pointer inline-flex items-center gap-2">
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
                    <div key={index} className="aspect-square rounded-2xl overflow-hidden relative group bg-neutral border border-outline shadow-z1">
                      {resolved ? (
                        <img src={resolved} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-disabled">
                          Photo {index + 1}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteDialog({
                            isOpen: true,
                            title: "Delete Gallery Image?",
                            description: "Are you sure you want to delete this image from your showcase gallery?",
                            onConfirm: () => {
                              setGallery(gallery.filter((_, i) => i !== index));
                              setDeleteDialog((d) => ({ ...d, isOpen: false }));
                              toast.success("Gallery photo removed");
                            },
                          })
                        }
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error-main cursor-pointer"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}

                {gallery.length === 0 && (
                  <div className="col-span-full py-16 text-center text-disabled border-2 border-dashed border-outline rounded-2xl font-medium">
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
                  <h2 className="text-lg font-semibold text-primary">Customer Reviews & Testimonials</h2>
                  <p className="text-xs text-secondary font-medium">Highlight positive customer experiences and ratings.</p>
                </div>
                <AppButton
                  type="button"
                  size="sm"
                  variant="primary"
                  onClick={() => openTestimonialModal()}
                >
                  + Add Review
                </AppButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((t, index) => {
                  const avatarSrc = resolveImgUrl(t.avatar_url || t.avatar || t.photo || t.image);
                  return (
                    <div key={index} className="p-4 rounded-2xl bg-neutral border border-outline space-y-3 shadow-z1 flex flex-col justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-paper border border-outline overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {avatarSrc ? (
                            <img src={avatarSrc} alt={t.author_name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-brand-lighter text-brand-main flex items-center justify-center font-bold text-xs">
                              {t.author_name ? t.author_name.slice(0, 2).toUpperCase() : "CU"}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-semibold text-sm text-primary truncate">{t.author_name || t.name || "Anonymous Customer"}</h4>
                            <span className="text-xs text-amber-500 font-bold flex items-center gap-0.5">
                              ⭐ {t.rating ?? 5}
                            </span>
                          </div>
                          {t.content && (
                            <p className="text-xs text-secondary line-clamp-3 mt-1 italic">&ldquo;{t.content}&rdquo;</p>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-disabled font-medium">Review #{index + 1}</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => openTestimonialModal(index)}
                            className="font-semibold text-brand-main hover:text-brand-dark cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteDialog({
                                isOpen: true,
                                title: `Delete review from "${t.author_name || t.name || "Customer"}"?`,
                                description: "Are you sure you want to remove this testimonial?",
                                onConfirm: () => {
                                  setTestimonials(testimonials.filter((_, i) => i !== index));
                                  setDeleteDialog((d) => ({ ...d, isOpen: false }));
                                  toast.success("Review removed");
                                },
                              })
                            }
                            className="font-semibold text-error-main hover:text-error-dark cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {testimonials.length === 0 && (
                  <div className="col-span-full py-16 text-center text-disabled border-2 border-dashed border-outline rounded-2xl font-medium">
                    No customer reviews added yet. Click &quot;+ Add Review&quot; to build credibility.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-outline flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-secondary">
              Remember to save your changes to publish them instantly to your live page.
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <AppButton
                type="button"
                onClick={handleSave}
                disabled={saving}
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
              >
                {saving ? "Saving Changes..." : "Save Business Page"}
              </AppButton>
            </div>
          </div>
        </AppCard>
      </div>

      {/* ── PRODUCT MODAL POPUP (AppModal) ── */}
      <AppModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        title={editingProductIdx !== null ? "Edit Product / Service" : "Add Product / Service"}
        subtitle="Configure product details, image, pricing options, and button name"
        maxWidth="lg"
      >
        <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          {/* Photo Upload */}
          <div className="flex items-center gap-4 p-3.5 rounded-xl bg-neutral border border-outline">
            <div className="w-16 h-16 rounded-lg bg-paper border border-outline overflow-hidden flex-shrink-0 flex items-center justify-center relative">
              {productForm.image ? (
                <img src={resolveImgUrl(productForm.image)} alt="Product Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] text-disabled font-semibold text-center px-1">No Image</span>
              )}
            </div>
            <div className="flex-1">
              <span className="text-xs font-semibold text-primary block">Product Image</span>
              <p className="text-[11px] text-secondary">Upload a clear photo for your product or service</p>
              <label className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-lighter text-brand-main font-semibold text-xs hover:bg-brand-lighter/80 cursor-pointer">
                {uploadingProductIdx === -1 ? "Uploading..." : productForm.image ? "Change Image" : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "product");
                  }}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AppInput
              label="Product Name"
              type="text"
              value={productForm.name}
              onChange={(e) => setProductForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Nike Sportswear"
            />
            <AppInput
              label="Button Name (CTA)"
              type="text"
              value={productForm.buttonName}
              onChange={(e) => setProductForm((p) => ({ ...p, buttonName: e.target.value }))}
              placeholder="e.g. Enquiry, बुक करा, Buy Now"
            />
          </div>

          <AppTextArea
            label="Description"
            rows={3}
            value={productForm.description}
            onChange={(e) => setProductForm((p) => ({ ...p, description: e.target.value }))}
            placeholder="Product details, specs, or warranty info..."
          />

          {/* Show Price Switch & Pricing Options */}
          <div className="p-3.5 rounded-xl bg-neutral border border-outline space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-primary">Show Price</span>
                <p className="text-[11px] text-secondary">Display product price on your business page</p>
              </div>
              <input
                type="checkbox"
                checked={productForm.showPrice}
                onChange={(e) => setProductForm((p) => ({ ...p, showPrice: e.target.checked }))}
                className="w-4 h-4 text-brand-main rounded border-outline focus:ring-brand-main cursor-pointer"
              />
            </div>

            {productForm.showPrice && (
              <div className="pt-3 border-t border-outline space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-secondary">
                    Pricing Options (Leave label empty if single price)
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setProductForm((p) => ({
                        ...p,
                        priceTiers: [...p.priceTiers, { label: "", price: "" }],
                      }))
                    }
                    className="text-xs font-semibold text-brand-main hover:text-brand-dark cursor-pointer"
                  >
                    + Add Option
                  </button>
                </div>

                <div className="space-y-2">
                  {productForm.priceTiers.map((tier, tIdx) => (
                    <div key={tIdx} className="flex items-center gap-2">
                      <div className="flex-1">
                        <AppInput
                          type="text"
                          value={tier.label}
                          onChange={(e) => {
                            const updated = [...productForm.priceTiers];
                            updated[tIdx] = { ...updated[tIdx], label: e.target.value };
                            setProductForm((p) => ({ ...p, priceTiers: updated }));
                          }}
                          placeholder="Label (e.g. 1kg / 1unit)"
                        />
                      </div>
                      <div className="flex-1">
                        <AppInput
                          type="text"
                          value={tier.price}
                          onChange={(e) => {
                            const updated = [...productForm.priceTiers];
                            updated[tIdx] = { ...updated[tIdx], price: e.target.value };
                            setProductForm((p) => ({ ...p, priceTiers: updated }));
                          }}
                          placeholder="Price (₹ e.g. 499)"
                        />
                      </div>
                      {productForm.priceTiers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = productForm.priceTiers.filter((_, idx) => idx !== tIdx);
                            setProductForm((p) => ({ ...p, priceTiers: updated }));
                          }}
                          className="p-2 text-error-main hover:text-error-dark text-sm cursor-pointer"
                          title="Remove option"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline">
            <AppButton type="button" variant="outline" size="sm" onClick={() => setIsProductModalOpen(false)}>
              Cancel
            </AppButton>
            <AppButton type="button" variant="primary" size="sm" onClick={saveProductModal}>
              {editingProductIdx !== null ? "Update Product" : "Save Product"}
            </AppButton>
          </div>
        </div>
      </AppModal>

      {/* ── TESTIMONIAL MODAL POPUP (AppModal) ── */}
      <AppModal
        isOpen={isTestimonialModalOpen}
        onClose={() => setIsTestimonialModalOpen(false)}
        title={editingTestimonialIdx !== null ? "Edit Customer Review" : "Add Customer Review"}
        subtitle="Add customer name, feedback, avatar photo, and rating"
        maxWidth="md"
      >
        <div className="space-y-4">
          {/* Avatar Upload */}
          <div className="flex items-center gap-4 p-3.5 rounded-xl bg-neutral border border-outline">
            <div className="w-14 h-14 rounded-full bg-paper border border-outline overflow-hidden flex-shrink-0 flex items-center justify-center">
              {testimonialForm.avatar_url ? (
                <img src={resolveImgUrl(testimonialForm.avatar_url)} alt="Reviewer" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-brand-lighter text-brand-main flex items-center justify-center font-bold text-sm">
                  {testimonialForm.author_name ? testimonialForm.author_name.slice(0, 2).toUpperCase() : "CU"}
                </div>
              )}
            </div>
            <div className="flex-1">
              <span className="text-xs font-semibold text-primary block">Customer Avatar</span>
              <p className="text-[11px] text-secondary">Upload reviewer picture</p>
              <label className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-lighter text-brand-main font-semibold text-xs hover:bg-brand-lighter/80 cursor-pointer">
                {uploadingTestimonialIdx === -1 ? "Uploading..." : testimonialForm.avatar_url ? "Change Photo" : "Upload Photo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "testimonial");
                  }}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AppInput
              label="Customer Name"
              type="text"
              value={testimonialForm.author_name}
              onChange={(e) => setTestimonialForm((t) => ({ ...t, author_name: e.target.value }))}
              placeholder="e.g. Rahul Sharma"
            />
            <AppInput
              label="Rating (1 - 5)"
              type="number"
              step="0.1"
              min={1}
              max={5}
              value={testimonialForm.rating ?? 5}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setTestimonialForm((t) => ({ ...t, rating: isNaN(val) ? 5 : val }));
              }}
              placeholder="e.g. 5 or 4.7"
            />
          </div>

          <AppTextArea
            label="Feedback / Review Comment"
            rows={4}
            value={testimonialForm.content}
            onChange={(e) => setTestimonialForm((t) => ({ ...t, content: e.target.value }))}
            placeholder="What did the client love about your business / service?..."
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline">
            <AppButton type="button" variant="outline" size="sm" onClick={() => setIsTestimonialModalOpen(false)}>
              Cancel
            </AppButton>
            <AppButton type="button" variant="primary" size="sm" onClick={saveTestimonialModal}>
              {editingTestimonialIdx !== null ? "Update Review" : "Save Review"}
            </AppButton>
          </div>
        </div>
      </AppModal>

      {/* ── COMMON DELETE CONFIRMATION DIALOG (AppConfirmDialog) ── */}
      <AppConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog((d) => ({ ...d, isOpen: false }))}
        onConfirm={deleteDialog.onConfirm}
        title={deleteDialog.title}
        description={deleteDialog.description}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}

