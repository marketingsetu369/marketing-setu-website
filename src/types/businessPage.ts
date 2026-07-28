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

export interface SalonHighlight {
  title: string;
  desc: string;
  /** HugeIcons icon name string — template resolves to actual icon */
  icon_name?: string;
}

export interface SalonTemplateData {
  stats?: TemplateStat[];
  highlights?: SalonHighlight[];
  testimonials?: Array<{
    text: string;
    client: string;
    location: string;
  }>;
  timings?: Array<{
    day: string;
    time: string;
  }>;
  /** Floating rating card values */
  rating_value?: string;
  rating_label?: string;
}

export interface GymTemplateData {
  stats?: TemplateStat[];
  /** Short tagline shown in focus-rows section */
  programs_intro?: string;
  focus_cards?: Array<{
    title: string;
    desc: string;
    /** "bright" applies the accent highlight style */
    variant?: "default" | "bright";
  }>;
}

export interface HotelTemplateData {
  hero_tagline?: string;
  checkin?: string;
  checkout?: string;
  amenities?: string[];
  /** Asymmetric service rows displayed in main section */
  service_rows?: Array<{
    title: string;
    desc: string;
    /** CSS class for the image box, e.g. "room-img" | "restaurant-img" */
    image_class?: string;
    /** "left-image" | "right-image" */
    layout?: "left-image" | "right-image";
  }>;
}

export interface CafeTemplateData {
  /** Chalkboard "Today's Specials" list */
  specials?: string[];
  bakery_items?: string[];
  /** Tagline shown above about_us in hero */
  hero_tagline?: string;
}

export interface RestaurantTemplateData {
  highlight_card?: {
    label: string;
    title: string;
    desc: string;
  };
  testimonial_note?: {
    heading: string;
    body: string;
    quote: string;
    author: string;
  };
}

export interface GoldRate {
  label: string;
  value: string;
  subtext?: string;
}

export interface JewelleryTemplateData {
  gold_rates?: GoldRate[];
  /** Section tagline e.g. "The Gold Standard" */
  eyebrow?: string;
}

export interface RealEstateTemplateData {
  key_stats?: TemplateStat[];
}

export interface TravelTemplateData {
  service_tiles?: Array<{
    title: string;
    desc: string;
  }>;
}

export interface PhotographerTemplateData {
  fields?: Array<{
    title: string;
    desc: string;
  }>;
  eyebrow?: string;
}

export interface BakeryTemplateData {
  custom_order_cta?: {
    heading: string;
    body: string;
    button_label: string;
    whatsapp_message?: string;
  };
  badge_label?: string;
}

export interface NurseryTemplateData {
  care_tip_cta?: {
    heading: string;
    body: string;
    button_label: string;
    whatsapp_message?: string;
  };
  badge_label?: string;
}

/**
 * template_data holds all per-template optional fields.
 * The key matches the template identifier used in index.tsx routing.
 */
export interface TemplateData {
  doctor?: DoctorTemplateData;
  salon?: SalonTemplateData;
  gym?: GymTemplateData;
  hotel?: HotelTemplateData;
  cafe?: CafeTemplateData;
  restaurant?: RestaurantTemplateData;
  jewellery?: JewelleryTemplateData;
  real_estate?: RealEstateTemplateData;
  travel?: TravelTemplateData;
  photographer?: PhotographerTemplateData;
  bakery?: BakeryTemplateData;
  nursery?: NurseryTemplateData;
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
}

// ── Derived / UI Types ─────────────────────────────────────────────────────

export interface AccentColor {
  primary: string;
  primaryRgb: string;
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

