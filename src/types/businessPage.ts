import {
  ContactIconType,
  ProductActionType,
  SocialType,
  TrackAction,
} from "@/enums";

// ── API Response Shape ─────────────────────────────────────────────────────

export interface ProductItem {
  name?: string;
  description?: string;
  price?: string | number;
  priceSubtext?: string;
  price_subtext?: string;
  buttonName?: string;
  imageUrl?: string;
}

// ── Per-Template Extra Data Interfaces ────────────────────────────────────
// Each template reads its own block from `template_data.<key>`.
// All fields are optional — templates fall back to hardcoded defaults when absent.

export interface TemplateStat {
  value: string;
  label: string;
}

export interface DoctorTemplateData {
  /** e.g. "MBBS, MD, DM (Cardiology)" */
  qualifications?: string;
  /** Shown below name in hero */
  specialty_line?: string;
  hero_title?: string;
  hero_subtitle?: string;
  experience_years?: string;
  opd_timing?: string;
  qualifications_list?: string[];
  stats?: TemplateStat[];
  education_timeline?: Array<{
    period: string;
    title: string;
    institution: string;
  }>;
  clinic_timings?: Array<{
    day: string;
    time: string;
  }>;
  testimonials?: Array<{
    text: string;
    patient: string;
    location: string;
  }>;
}

export interface CafeTemplateData {
  tagline?: string;
  timing?: string;
  categories?: Array<{
    title: string;
    desc: string;
    img: string;
  }>;
  packagedProducts?: Array<{
    name: string;
    price: string;
    image: string;
  }>;
}


/**
 * template_data holds all per-template optional fields.
 * The key matches the template identifier used in index.tsx routing.
 */
export interface TemplateData {
  doctor?: DoctorTemplateData;
  cafe?: CafeTemplateData;
}

export interface BusinessPageData {
  slug: string;
  business_name: string;
  business_category?: string;
  about_us?: string;
  mobile_number?: string;
  email_address?: string;
  location_address?: string;
  logo_url?: string;
  theme_color_hex?: string;
  facebook_link?: string;
  instagram_link?: string;
  website_link?: string;
  products?: ProductItem[];
  gallery_images?: string[];
  /** Template-specific extra data — keyed by template name */
  template_data?: TemplateData;
  template_key?: string;
}

// ── Derived / UI Types ─────────────────────────────────────────────────────

export interface AccentColor {
  primary: string;
  primaryRgb: string;
  primaryHover?: string;
}

/** Typed product card props — maps from raw `ProductItem` */
export interface ProductCardItem {
  id: string;
  name: string;
  description: string;
  price: string;
  priceSubtext?: string;
  actionType: ProductActionType;
  iconColor: string;
  imageUrl?: string;
  buttonName?: string;
}

export interface QuickActionItem {
  id: string;
  label: string;
  href: string;
  type: TrackAction;
}

export interface ContactItem {
  id: string;
  label: string;
  value: string;
  href?: string;
  iconType: ContactIconType;
}

export interface GalleryItem {
  id: string;
  colorClass: string;
  imageUrl: string;
}

export interface SocialItem {
  id: string;
  href: string;
  type: SocialType;
}

// Re-export enums for convenience — consumers can import from "@/types" instead of "@/enums"
export type { TrackActionType } from "@/utils/analytics";
export { ContactIconType, ProductActionType, SocialType, TrackAction };

