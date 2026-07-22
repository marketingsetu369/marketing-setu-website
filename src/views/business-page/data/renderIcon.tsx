import React from "react";
import { TrackAction, ContactIconType, SocialType } from "@/enums";
import {
  PhoneIcon,
  WhatsAppIcon,
  DirectionsIcon,
  EmailIcon,
  ScooterIcon,
  BoltIcon,
  BatteryIcon,
  SupportIcon,
  WrenchIcon,
  StarIcon,
  FacebookIcon,
  InstagramIcon,
  WebsiteIcon,
} from "../svg";

type IconType =
  | TrackAction
  | ContactIconType
  | SocialType
  | "scooter" | "bolt" | "battery" | "support" | "wrench" | "star";

interface IconProps {
  className?: string;
  /** @deprecated Use className instead. Kept for one-off overrides only. */
  style?: React.CSSProperties;
}

/** Maps an icon type enum value to its respective SVG component */
export const renderIcon = (type: IconType | string, props: IconProps = {}): React.ReactNode => {
  switch (type) {
    case ContactIconType.Phone:
    case TrackAction.Call:
      return <PhoneIcon {...props} />;
    case TrackAction.WhatsApp:
      return <WhatsAppIcon {...props} />;
    case TrackAction.Directions:
    case ContactIconType.Location:
      return <DirectionsIcon {...props} />;
    case ContactIconType.Email:
      return <EmailIcon {...props} />;
    case SocialType.Facebook:
      return <FacebookIcon {...props} />;
    case SocialType.Instagram:
      return <InstagramIcon {...props} />;
    case SocialType.Website:
      return <WebsiteIcon {...props} />;
    case "scooter":  return <ScooterIcon {...props} />;
    case "bolt":     return <BoltIcon {...props} />;
    case "battery":  return <BatteryIcon {...props} />;
    case "support":  return <SupportIcon {...props} />;
    case "wrench":   return <WrenchIcon {...props} />;
    case "star":     return <StarIcon {...props} />;
    default:         return null;
  }
};
