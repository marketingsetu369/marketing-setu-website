/**
 * Centralized enums for the MarketingSetu web app.
 * Import from "@/enums" throughout the codebase.
 *
 * NOTE: Regular enums are used instead of const enums because
 * Next.js (SWC/Babel) does not support const enum across files.
 */

// ── Analytics ─────────────────────────────────────────────────────────────

/** All trackable user actions on a business page */
export enum TrackAction {
  View      = "view",
  Call      = "call",
  WhatsApp  = "whatsapp",
  CopyLink  = "copy_link",
  Directions = "directions",
}

// ── UI / Theme ─────────────────────────────────────────────────────────────

/** Page color scheme modes */
export enum ThemeMode {
  Light = "light",
  Dark  = "dark",
}

// ── Business Page ──────────────────────────────────────────────────────────

/** Social platform types */
export enum SocialType {
  Facebook  = "fb",
  Instagram = "ig",
  Website   = "web",
}

/** Contact item icon variants */
export enum ContactIconType {
  Phone    = "phone",
  Email    = "email",
  Location = "location",
}

/** Quick action button variants */
export enum QuickActionType {
  Call       = "call",
  WhatsApp   = "whatsapp",
  Directions = "directions",
}

/** Product card action button variants */
export enum ProductActionType {
  Buy     = "buy",
  Enquiry = "enquiry",
}
