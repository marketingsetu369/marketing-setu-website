import { useMemo } from "react";
import { hexToRgb } from "@/utils";
import { TrackAction, ContactIconType, SocialType, ProductActionType } from "@/enums";
import type {
  BusinessPageData,
  AccentColor,
  ProductCardItem,
  QuickActionItem,
  ContactItem,
  GalleryItem,
  SocialItem,
} from "@/types/businessPage";

const GALLERY_COLOR_CLASSES = [
  "color-purple", "color-teal", "color-orange",
  "color-pink",   "color-blue", "color-gradient",
];

interface UseBusinessPageDataReturn {
  accentColor:  AccentColor;
  quickActions: QuickActionItem[];
  contactsList: ContactItem[];
  productsList: ProductCardItem[];
  galleryList:  GalleryItem[];
  socialsList:  SocialItem[];
}

export function useBusinessPageData(data: BusinessPageData | null): UseBusinessPageDataReturn {

  const accentColor: AccentColor = useMemo(() => {
    if (data?.theme_color_hex) {
      return { primary: data.theme_color_hex, primaryRgb: hexToRgb(data.theme_color_hex) };
    }
    return { primary: "#4f46e5", primaryRgb: "79, 70, 229" };
  }, [data?.theme_color_hex]);

  const quickActions: QuickActionItem[] = useMemo(() => {
    if (!data) return [];
    return [
      { id: "1", label: "Call Us",    href: `tel:${data.mobile_number}`,                                                    type: TrackAction.Call },
      { id: "2", label: "WhatsApp",   href: `https://wa.me/${data.mobile_number}`,                                          type: TrackAction.WhatsApp },
      { id: "3", label: "Directions", href: `https://maps.google.com/?q=${encodeURIComponent(data.location_address ?? "")}`, type: TrackAction.Directions },
    ];
  }, [data?.mobile_number, data?.location_address]);

  const contactsList: ContactItem[] = useMemo(() => {
    if (!data) return [];
    return [
      { id: "1", label: "Mobile Number", value: data.mobile_number    ?? "", href: `tel:${data.mobile_number}`,                                                    iconType: ContactIconType.Phone    },
      { id: "2", label: "Email Address", value: data.email_address    ?? "", href: `mailto:${data.email_address}`,                                                  iconType: ContactIconType.Email    },
      { id: "3", label: "Location",      value: data.location_address ?? "", href: `https://maps.google.com/?q=${encodeURIComponent(data.location_address ?? "")}`, iconType: ContactIconType.Location },
    ];
  }, [data?.mobile_number, data?.email_address, data?.location_address]);

  const productsList: ProductCardItem[] = useMemo(() => {
    return (data?.products ?? []).map((p, idx) => {
      let formattedPrice = "Contact for pricing";
      if (p.price) {
        const trimmed = String(p.price).trim();
        formattedPrice = /^\d+(\.\d+)?$/.test(trimmed) ? `₹${trimmed}` : trimmed;
      }
      const actionType = (p.buttonName ?? "").toLowerCase().includes("buy")
        ? ProductActionType.Buy
        : ProductActionType.Enquiry;

      return {
        id:           String(idx),
        name:         p.name        ?? "",
        description:  p.description ?? "",
        price:        formattedPrice,
        priceSubtext: p.priceSubtext ?? p.price_subtext,
        actionType,
        iconColor:    "var(--business-primary)",
        imageUrl:     p.imageUrl,
      };
    });
  }, [data?.products]);

  const galleryList: GalleryItem[] = useMemo(() => {
    return (data?.gallery_images ?? []).map((imgUrl, idx) => ({
      id:         String(idx),
      colorClass: GALLERY_COLOR_CLASSES[idx % GALLERY_COLOR_CLASSES.length],
      imageUrl:   imgUrl,
    }));
  }, [data?.gallery_images]);

  const socialsList: SocialItem[] = useMemo(() => {
    if (!data) return [];
    const list: SocialItem[] = [];
    if (data.facebook_link)  list.push({ id: SocialType.Facebook,  href: data.facebook_link,  type: SocialType.Facebook  });
    if (data.instagram_link) list.push({ id: SocialType.Instagram, href: data.instagram_link, type: SocialType.Instagram });
    if (data.website_link)   list.push({ id: SocialType.Website,   href: data.website_link,   type: SocialType.Website   });
    return list;
  }, [data?.facebook_link, data?.instagram_link, data?.website_link]);

  return { accentColor, quickActions, contactsList, productsList, galleryList, socialsList };
}
