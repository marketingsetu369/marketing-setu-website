import React from "react";
import Image from "next/image";
import { ScooterIcon } from "../svg";

interface BusinessLogoProps {
  logoUrl?: string;
  businessName?: string;
  priority?: boolean;
}

export default function BusinessLogo({ logoUrl, businessName, priority = false }: BusinessLogoProps) {
  if (logoUrl) {
    return (
      <Image
        src={logoUrl}
        alt={businessName ?? "Business Logo"}
        width={50}
        height={50}
        className="business-logo-img"
        priority={priority}
      />
    );
  }
  return <ScooterIcon className="icon-business-logo" />;
}
