import {
  TrackAction,
  SocialType,
  ContactIconType,
  ProductActionType,
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
  showPrice?: boolean;
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
  showPrice?: boolean;
  priceTiers?: { label: string; price: string }[];
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
export { TrackAction, SocialType, ContactIconType, ProductActionType };
export type { TrackActionType } from "@/utils/analytics";
