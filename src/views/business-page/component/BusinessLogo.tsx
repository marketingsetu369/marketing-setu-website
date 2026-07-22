import React from "react";
import Image from "next/image";
import { ScooterIcon } from "../svg";

interface BusinessLogoProps {
  logoUrl?: string;
  businessName?: string;
}

export default function BusinessLogo({ logoUrl, businessName }: BusinessLogoProps) {
  if (logoUrl) {
    return (
      <Image
        src={logoUrl}
        alt={businessName ?? "Business Logo"}
        width={50}
        height={50}
        className="business-logo-img"
      />
    );
  }
  return <ScooterIcon className="icon-business-logo" />;
}
