import React from "react";
import Link from "next/link";
import { SocialType } from "@/enums";
import type { SocialItem } from "@/types/businessPage";

interface SocialLinkProps extends Pick<SocialItem, "href" | "type"> {
  icon: React.ReactNode;
}

export default function SocialLink({ href, type, icon }: SocialLinkProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={`social-circle-btn ${type}`}>
      {icon}
    </Link>
  );
}

export { SocialType };
